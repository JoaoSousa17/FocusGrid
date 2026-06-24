// FocusGrid — PDF Backend Documentation — Full Content (~25 pages)
// Para fins educativos: secções 13-16 explicam como implementar
// o mesmo backend sem BaaS, usando APIs e tecnologias standard.

export const PDF_SECTIONS = [
{
  title: "1. Visao Geral da Arquitectura do Sistema",
  color: [232, 122, 90],
  content: `O FocusGrid e uma Progressive Web App (PWA) de produtividade pessoal construida com React 18 + Vite no frontend e suportada por um Backend-as-a-Service (BaaS) completo (Supabase). A arquitectura segue o padrao de tres camadas desacopladas:

CAMADA 1 - APRESENTACAO (Client-Side React)
==========================================
Framework: React 18 com hooks funcionais (useState, useEffect, useContext, useRef, useCallback, useMemo)
Build Tool: Vite 5 com HMR (Hot Module Replacement)
Routing: React Router DOM v6 - BrowserRouter com rotas protegidas via ProtectedRoute
State Management: React Context API (timer global) + @tanstack/react-query (server cache)
Styling: Tailwind CSS v3 com design tokens em CSS custom properties
Animacoes: Framer Motion v11 - transicoes de pagina, gestos, animacoes de estado
Componentes UI: shadcn/ui (construido sobre Radix UI) - acessibilidade ARIA completa
Drag & Drop: @hello-pangea/dnd (fork do react-beautiful-dnd)
Graficos: recharts v2 - AreaChart, BarChart, PieChart
PDF Client-Side: jsPDF v4 - geracao de PDF directamente no browser
ZIP Client-Side: JSZip v3 - compressao e download de arquivos no browser
Datas: date-fns v3 - parsing, formatacao, aritmetica de datas sem mutacao

CAMADA 2 - BACKEND (Supabase)
========================================
Plataforma: Supabase (Backend-as-a-Service) com API REST/RPC auto-gerada + Realtime via WebSocket
Autenticacao: Supabase Auth - JWT com refresh automatico, OTP por email, OAuth (Google)
Base de Dados: PostgreSQL gerido pela Supabase, acedido via PostgREST
Cliente: @supabase/supabase-js - cliente JS tipado para queries, auth, storage e functions
Storage: Supabase Storage - buckets publicos (CDN) e privados (signed URLs)
Seguranca: Row-Level Security (RLS) nativa do PostgreSQL, por utilizador

CAMADA 3 - INTEGRACOES EXTERNAS (via Supabase Edge Functions)
================================
LLM: OpenAI GPT-4o-mini / Claude / Gemini - analise de texto e geracao estruturada
Speech-to-Text: OpenAI Whisper - transcricao de audio multilingue
Email: Resend - envio transaccional via API REST
Storage CDN: Distribuicao global de ficheiros estaticos via Supabase Storage

FLUXO DE DADOS GERAL:
Browser -> supabase-js (fetch + WebSocket) -> PostgREST / GoTrue (Auth) -> RLS -> PostgreSQL
                                            -> Edge Functions -> OpenAI / Whisper / Resend`
},
{
  title: "2. Modelo de Dados - Entidades e Tabelas PostgreSQL",
  color: [139, 92, 246],
  content: `Todas as entidades correspondem a tabelas PostgreSQL geridas pela Supabase.
Cada registo possui campos automaticos injectados pelo servidor/triggers:
  id: UUID v4 (default gen_random_uuid(), imutavel)
  created_date: timestamp ISO 8601 (default now())
  updated_date: timestamp ISO 8601 (actualizado por trigger em cada UPDATE)
  created_by_id: UUID do utilizador criador (auth.uid(), para RLS)

ENTIDADE: Task (tabela "tasks" - Tarefas semanais Kanban)
========================================
  title: string (required) - titulo da tarefa
  description: string | null - notas adicionais
  weekday: enum monday|tuesday|wednesday|thursday|friday|saturday|sunday|none
  period: enum morning|afternoon|evening|null
  tags_json: string - JSON serializado: [{id,name,color}]
  week_start: string (date: yyyy-MM-dd)
  completed: boolean (default: false)
  order: number (default: 0) - posicao para drag-and-drop

ENTIDADE: Tag (tabela "tags" - Etiquetas coloridas)
====================================
  name: string (required)
  color: enum blue|purple|green|amber|rose|teal|indigo|pink

ENTIDADE: FocusSession (tabela "focus_sessions" - Sessoes Pomodoro)
==========================================
  tag_id: string | null - referencia a Tag
  tag_name: string | null - snapshot do nome no momento
  tag_color: string | null - snapshot da cor
  duration_minutes: number (required)
  type: enum focus|pause (required)
  completed: boolean (default: true)
  NOTA: tag_name/color sao snapshots - se a tag for editada, historico nao muda.

ENTIDADE: Habit (tabela "habits" - Definicao de habitos)
========================================
  name: string (required)
  description: string | null
  score: number (default: 10) - pontos por completar
  color: string - hex (#FF5733) ou preset key
  active: boolean (default: true) - visivel na lista diaria
  order: number (default: 0)

ENTIDADE: HabitEntry (tabela "habit_entries" - Registo diario)
======================================
  habit_id: string (required) - FK -> habits.id
  habit_name: string - snapshot do nome
  habit_color: string - snapshot da cor
  score: number (required)
  date: string (date: yyyy-MM-dd, required)

ENTIDADE: Deadline (tabela "deadlines" - Prazos com timestamp)
==========================================
  name: string (required)
  color: string - hex de apresentacao
  location: string | null
  website: string | null - URL
  deadline: string (ISO datetime, required) ex: "2024-06-15T23:59:00"

ENTIDADE: Event (tabela "events" - Eventos com duracao)
======================================
  name: string (required)
  color: string | null
  location: string | null
  website: string | null
  description: string | null
  start_datetime: string (ISO datetime, required)
  end_datetime: string (ISO datetime, required)
  CALCULO DURACAO (frontend): differenceInMinutes(parseISO(end), parseISO(start))

ENTIDADE: MeetingRecording (tabela "meeting_recordings" - Reunioes IA)
=========================================
  title: string (required)
  summary: string | null - gerado por LLM
  transcript: string | null - gerado por Whisper
  action_items_json: string | null - JSON: string[]
  deadlines_json: string | null - JSON: {text, date}[]
  mind_map_json: string | null - JSON: {topic, subtopics:[]}
  pdf_url: string | null - URL do bucket Storage do PDF gerado
  audio_duration_seconds: number | null
  event_id: string | null - FK opcional para Event/Deadline
  event_name: string | null
  meeting_date: string (date) | null`
},
{
  title: "3. API de Dados - PostgREST e supabase-js",
  color: [59, 130, 246],
  content: `A Supabase expoe automaticamente uma API REST sobre PostgreSQL via PostgREST,
mas no FocusGrid as chamadas sao feitas atraves do cliente @supabase/supabase-js,
que envia o JWT da sessao em cada request e aplica os filtros via query builder.
Internamente cada metodo de entidade (src/api/entities.js) usa este client.

LISTAR REGISTOS
===============
supabase.from(table).select("*").order(field, { ascending }).range(skip, skip+limit-1)

Exemplo com o wrapper de entidades:
  Task.list("-updated_date", 200)
  -> SELECT * FROM tasks ORDER BY updated_date DESC LIMIT 200

FILTRAR REGISTOS
================
supabase.from(table).select("*").eq(field, value) / .gte/.lte/.gt/.lt/.neq/.in(...)
  Operadores suportados (mapeados a partir do objecto de filtros):
    { "$gte": value }  ->  .gte(field, value)
    { "$lte": value }  ->  .lte(field, value)
    { "$gt": value }   ->  .gt(field, value)
    { "$lt": value }   ->  .lt(field, value)
    { "$ne": value }   ->  .neq(field, value)
    { "$in": [a,b,c] } ->  .in(field, [a,b,c])

Exemplos:
  HabitEntry.filter({ date: "2024-06-15" })
  Task.filter({ completed: false, week_start: "2024-06-10" })
  FocusSession.filter({ created_date: { "$gte": "2024-06-01" } })

CRIAR REGISTO
=============
supabase.from(table).insert(fields).select().single()
  Nota: created_by_id e injectado automaticamente via RLS policy / default da coluna

Exemplo:
  FocusSession.create({
    tag_id: "abc123", tag_name: "Estudo", tag_color: "blue",
    duration_minutes: 25, type: "focus", completed: true
  })

ACTUALIZAR REGISTO (merge parcial)
====================================
supabase.from(table).update(safeFields).eq("id", id).select().single()
  Nota: id, created_by_id e created_date sao removidos do body antes do update
  Nota: updated_date e actualizado automaticamente por trigger

Exemplo:
  Task.update(taskId, { completed: true, order: 3 })

ELIMINAR REGISTO
================
supabase.from(table).delete().eq("id", id)
  Nota: operacao permanente, sem soft-delete por default

CRIACAO EM LOTE (Bulk)
======================
supabase.from(table).insert(items).select()

Exemplo:
  Tag.bulkCreate([
    { name: "Estudo", color: "blue" },
    { name: "Trabalho", color: "purple" }
  ])`
},
{
  title: "4. Autenticacao - Supabase Auth, OAuth e Fluxos Completos",
  color: [16, 185, 129],
  content: `ARQUITECTURA DE AUTENTICACAO (Supabase Auth / GoTrue):
JWT (JSON Web Token) com dois tokens:
  access_token: curta duracao, enviado em cada request
  refresh_token: longa duracao, usado para renovar o access_token automaticamente
Armazenamento: gerido internamente pelo supabase-js (localStorage) com refresh automatico.

FLUXO 1: REGISTO COM EMAIL + OTP
==================================
1. supabase.auth.signUp({ email, password })
   -> Cria utilizador com status nao confirmado
   -> Envia email com link/codigo de confirmacao via Supabase Auth (Resend/SMTP configuravel)
   -> Resposta: { user, session } (session pode ser null se confirmacao for obrigatoria)

2. supabase.auth.verifyOtp({ email, token, type: "signup" })
   -> Valida o codigo OTP enviado por email
   -> Resposta: { session: { access_token, refresh_token }, user }

3. O supabase-js guarda a sessao automaticamente (sem necessidade de setToken manual)
4. window.location.href = '/' -> hard redirect (reinicializa estado React)

VALIDACOES NO REGISTO:
  Email: formato valido, normalizado pelo Supabase
  Password: minimo configuravel (por default 6+ caracteres no projecto)
  OTP: codigo numerico enviado por email, com expiracao curta

FLUXO 2: LOGIN COM EMAIL + PASSWORD
=====================================
supabase.auth.signInWithPassword({ email, password })
  -> Valida credenciais no servidor de Auth da Supabase
  -> Sucesso: { data: { session, user } }
  -> Falha: { error: { message: "Invalid login credentials" } }

Apos login: window.location.href = '/'  (hard redirect para reinicializar o AuthProvider)

FLUXO 3: GOOGLE OAUTH (Social Login)
======================================
1. Frontend: supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo } })
2. Supabase: redirect -> ecrã de consentimento Google (scopes: openid, email, profile)
3. Google: callback -> Supabase Auth troca o code por tokens e obtem email + nome
4. Supabase cria ou associa o utilizador existente por email
5. Redireciona de volta para a app com a sessao ja estabelecida (via redirectTo)
6. O supabase-js detecta a sessao automaticamente atraves de onAuthStateChange

FLUXO 4: RESET DE PASSWORD
============================
1. supabase.auth.resetPasswordForEmail(email, { redirectTo: origin + "/reset-password" })
   -> Envia email com link de recuperacao (magic link)
   -> Resposta: sempre sem erro visivel ao utilizador (nao revela se o email existe)

2. O utilizador clica no link -> Supabase estabelece uma sessao de "recovery" automaticamente
   e redireciona para /reset-password com a sessao ja activa (sem token na query string)

3. supabase.auth.updateUser({ password: newPassword })
   -> Actualiza a password usando a sessao de recovery activa
   -> Resposta: { user } actualizado

RENOVACAO AUTOMATICA DE TOKEN:
  O supabase-js gere a renovacao de access_token de forma transparente:
  1. Antes de expirar, usa o refresh_token para obter um novo access_token
  2. onAuthStateChange notifica os listeners da app com a nova sessao
  3. Se o refresh falhar (refresh_token invalido/expirado): sessao termina, listeners recebem null`
},
{
  title: "5. Row-Level Security (RLS) - Isolamento de Dados",
  color: [239, 68, 68],
  content: `O RLS garante que cada utilizador so acede aos seus proprios dados,
implementado nativamente no PostgreSQL com policies aplicadas antes de qualquer query.

REGRA BASE (aplicada a todas as tabelas, via policy SQL):
=========================================================
LIST/FILTER:  USING (created_by_id = auth.uid())  -- policy SELECT
CREATE:       WITH CHECK (created_by_id = auth.uid())  -- policy INSERT
UPDATE:       USING (created_by_id = auth.uid())  -- policy UPDATE
DELETE:       USING (created_by_id = auth.uid())  -- policy DELETE

EXEMPLO DE POLICY SQL (tabela tasks):
  ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

  CREATE POLICY "select_own_tasks" ON tasks
    FOR SELECT USING (created_by_id = auth.uid());

  CREATE POLICY "insert_own_tasks" ON tasks
    FOR INSERT WITH CHECK (created_by_id = auth.uid());

  CREATE POLICY "update_own_tasks" ON tasks
    FOR UPDATE USING (created_by_id = auth.uid());

  CREATE POLICY "delete_own_tasks" ON tasks
    FOR DELETE USING (created_by_id = auth.uid());

EXCEPCAO - ADMINS:
  Pode ser implementada com uma policy adicional que verifica um claim/role
  no JWT (ex: auth.jwt() ->> 'role' = 'admin') para conceder acesso total.
  Usado tipicamente para dashboards de administracao e suporte.

VALIDACAO DE DADOS:
==============================================
A validacao de tipos e constraints e feita pelo proprio schema PostgreSQL:
  NOT NULL: campos obrigatorios
  CHECK: validacao de enums e ranges (ex: CHECK (weekday IN ('monday', ...)))
  Tipos de coluna: text/numeric/boolean/timestamp validados pelo Postgres

Em caso de violacao de constraint, o cliente recebe um erro do PostgREST
(ex: 23502 not_null_violation, 23514 check_violation) que e propagado
pelo wrapper de entidades como um throw do metodo create/update.

CAMPOS PROTEGIDOS (imutaveis apos criacao):
  id, created_date, created_by_id sao removidos do body pelo wrapper de
  entidades antes de qualquer UPDATE (ver src/api/entities.js), garantindo
  que o cliente nao os pode alterar mesmo que o body os inclua.`
},
{
  title: "6. Integracao OpenAI - LLM e Whisper via Edge Functions",
  color: [245, 158, 11],
  content: `A integracao com OpenAI e feita atraves de Supabase Edge Functions (Deno),
invocadas via supabase.functions.invoke(...). A chave da OpenAI fica apenas
nas variaveis de ambiente da function, nunca exposta ao frontend.

TRANSCRICAO DE AUDIO (Whisper)
================================
Edge Function: "transcribe-audio"
  Chamada cliente: Core.TranscribeAudio({ audio_url })
  -> supabase.functions.invoke("transcribe-audio", { body: { audio_url } })
  A function descarrega o ficheiro do Storage e chama a API Whisper da OpenAI:
    POST https://api.openai.com/v1/audio/transcriptions  (model: whisper-1)
  Formatos suportados: mp3, mp4, mpeg, mpga, m4a, wav, webm, ogg, flac
  Max size: 25MB

Fluxo completo na app:
1. MediaRecorder API captura audio em chunks (audio/webm;codecs=opus):
   const chunks = [];
   mediaRecorder.ondataavailable = e => chunks.push(e.data);
   mediaRecorder.onstop = () => {
     const blob = new Blob(chunks, { type: "audio/webm" });
   };

2. Upload do blob para o bucket publico:
   const { file_url } = await Core.UploadFile({ file: audioBlob });

3. Transcricao via Edge Function:
   const transcript = await Core.TranscribeAudio({ audio_url: file_url });

Custo: aproximadamente $0.006 por minuto de audio (whisper-1)

ANALISE DE REUNIAO (GPT-4o)
==============================
Edge Function: "invoke-llm"
  Chamada cliente: InvokeLLM({ prompt, response_json_schema })
  -> supabase.functions.invoke("invoke-llm", { body: { prompt, response_json_schema, model } })
  Modelo usado na function: gpt-4o-mini (default) ou gpt-4o / claude-3-5-sonnet

Prompt estruturado enviado ao LLM:
  "Analisa a seguinte transcricao de reuniao e extrai:
   1. Titulo conciso (max 60 chars)
   2. Resumo executivo (2-3 paragrafos)
   3. Lista de action items com responsavel e prazo se mencionado
   4. Prazos e datas criticas mencionados
   5. Mapa mental hierarquico dos temas principais"

Response JSON Schema forcado (structured output):
{
  "title": "string",
  "summary": "string",
  "action_items": ["string"],
  "deadlines": [{ "text": "string", "date": "string" }],
  "mind_map": {
    "topic": "string",
    "subtopics": [{ "topic": "string", "subtopics": [] }]
  }
}

A Edge Function configura response_format: { type: "json_object" } para garantir JSON valido.

SUGESTOES DE HABITOS COM IA
==============================
Usado em HabitsManage.jsx para gerar sugestoes personalizadas:
  Prompt: "Cria 5 habitos diarios de [TEMA] para uma pessoa produtiva.
           Para cada habito: nome curto, descricao motivacional, pontuacao 5-20."
  Response: array JSON com { name, description, score, color }
  Model: gpt-4o-mini (economico para esta tarefa simples)

MODELOS DISPONIVEIS E CUSTOS:
  gpt-4o-mini:       $0.00015/1K tokens input   <- default, mais economico
  gpt-4o:            $0.005/1K tokens input      <- melhor qualidade
  claude-3-5-sonnet: $0.003/1K tokens input      <- excelente raciocinio
  gemini-1.5-flash:  $0.000075/1K tokens input   <- mais barato com web search`
},
{
  title: "7. File Storage - Buckets, CDN e Ficheiros Privados",
  color: [6, 182, 212],
  content: `O Supabase Storage suporta dois tipos de bucket: publico (CDN) e privado (signed URLs).

UPLOAD PUBLICO
===============
supabase.storage.from("public-files").upload(path, file, { contentType, upsert: false })
seguido de supabase.storage.from("public-files").getPublicUrl(path)
  Response: { file_url: "<supabase_project_url>/storage/v1/object/public/public-files/<path>" }

Caracteristicas:
  URL publica e estavel enquanto o ficheiro existir no bucket
  Distribuicao via CDN da Supabase
  Sem expiracao - URL valida enquanto o objecto nao for apagado
  Acesso publico sem autenticacao (bucket marcado como publico)
  Max size: configuravel por bucket/plano
  Tipos aceites: qualquer MIME type

Uso na app:
  1. AUDIO: upload antes de transcrever
     const { file_url } = await Core.UploadFile({ file: audioBlob });
     // Depois: Core.TranscribeAudio({ audio_url: file_url })

  2. PDF: upload apos geracao client-side
     const pdfBlob = doc.output("blob");
     const { file_url: pdf_url } = await Core.UploadFile({ file: pdfBlob });
     // Depois: MeetingRecording.update(id, { pdf_url })

UPLOAD PRIVADO
===============
supabase.storage.from("private-files").upload(path, file, {...})
  Response: { file_uri: path }  -- caminho interno no bucket privado

NOTA: file_uri NAO e uma URL HTTP publica - e o caminho do objecto no bucket.
Para aceder ao ficheiro, gerar signed URL:

supabase.storage.from("private-files").createSignedUrl(file_uri, expires_in)
  Response: { signed_url: "<supabase_project_url>/storage/v1/object/sign/private-files/<path>?token=..." }

  expires_in: segundos (default: 300 = 5min)
  O signed_url expira automaticamente apos o tempo configurado

GERACAO DE PDF CLIENT-SIDE (jsPDF)
=====================================
A geracao de PDF ocorre inteiramente no browser (sem servidor):
  import { jsPDF } from "jspdf";
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  // Pagina A4: 210mm x 297mm, area util com margin 15mm:
  // Largura texto: 180mm, Altura texto: 267mm

  doc.setFillColor(r, g, b);           // cor de fundo (rectangulos)
  doc.rect(x, y, w, h, "F");          // rectangulo preenchido
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(r, g, b);
  doc.text("string", x, y);
  doc.splitTextToSize("long text", maxWidth); // wrap automatico
  doc.addPage();                       // nova pagina
  doc.getNumberOfPages();              // total de paginas
  doc.setPage(n);                      // ir para pagina n
  doc.save("filename.pdf");            // download directo
  doc.output("blob");                  // obter como Blob (para upload)`
},
{
  title: "8. Tempo Real - Supabase Realtime (postgres_changes)",
  color: [236, 72, 153],
  content: `O sistema suporta actualizacoes em tempo real via Supabase Realtime, que escuta
directamente as alteracoes na replicacao logica do PostgreSQL e reenvia-as por WebSocket.

CANAL DE SUBSCRIPTION:
============================
supabase.channel("realtime:" + table)
  .on("postgres_changes", { event: "*", schema: "public", table }, callback)
  .subscribe()

EVENTOS RECEBIDOS (mapeados pelo wrapper de entidades):
  payload.eventType === "INSERT" -> { type: "create", id: payload.new.id, data: payload.new }
  payload.eventType === "UPDATE" -> { type: "update", id: payload.new.id, data: payload.new }
  payload.eventType === "DELETE" -> { type: "delete", id: payload.old.id, data: null }

FILTRAGEM SERVER-SIDE:
  As RLS policies da tabela aplicam-se tambem aos eventos Realtime.
  O utilizador so recebe eventos dos registos que conseguiria ler via SELECT.

WRAPPER DE ENTIDADES (src/api/entities.js):
=============================================
const unsubscribe = Task.subscribe((event) => {
  if (event.type === "create") setTasks(prev => [...prev, event.data]);
  if (event.type === "update") setTasks(prev =>
    prev.map(t => t.id === event.id ? event.data : t));
  if (event.type === "delete") setTasks(prev =>
    prev.filter(t => t.id !== event.id));
});

// Cleanup (chamar no return do useEffect):
return () => unsubscribe();

RECONEXAO AUTOMATICA:
  O cliente Realtime da Supabase implementa reconexao automatica com backoff
  e re-subscreve automaticamente todos os canais activos apos reconectar.

USO NA APP (TaskBoard com React Query):
  useEffect(() => {
    const unsub = Task.subscribe((event) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    });
    return unsub;
  }, []);`
},
{
  title: "9. Email Transaccional - Resend via Edge Function",
  color: [132, 204, 22],
  content: `O envio de email e feito server-side via uma Supabase Edge Function que chama
o Resend (https://resend.com). A API key Resend fica apenas nas env vars da function,
nunca exposta ao cliente.

EDGE FUNCTION "send-email":
============
Chamada cliente: Core.SendEmail({ to, subject, body, from_name })
-> supabase.functions.invoke("send-email", { body: { to, subject, body, from_name } })

A function chama internamente:
POST https://api.resend.com/emails
  Headers: Authorization: Bearer re_xxxxx (API key Resend, guardada como secret da function)
  Body:
    from: "FocusGrid <noreply@focusgrid.app>"
    to: ["user@example.com"]
    subject: "Assunto"
    html: "<corpo do email>"
  Response 200: { id: "email_uuid" }

EMAILS ENVIADOS NA APP:
========================
1. VERIFICACAO DE CONTA:
   Gerido directamente pelo Supabase Auth apos signUp() - nao passa pela Edge Function

2. RESET DE PASSWORD:
   Gerido directamente pelo Supabase Auth via resetPasswordForEmail() - magic link

3. EMAIL PERSONALIZADO (via Core.SendEmail):
   await Core.SendEmail({
     to: "utilizador@email.com",
     subject: "Assunto",
     body: "<html>corpo</html>",
     from_name: "FocusGrid"  // opcional
   })

SEGURANCA NO ENVIO:
  SPF record configurado no DNS do dominio
  DKIM signature em todos os emails
  DMARC policy: quarantine
  Unsubscribe header em emails de marketing (exigido por GDPR/CAN-SPAM)

TEMPLATES DE EMAIL (boas praticas):
  Design responsivo com inline CSS (compativel com Gmail, Outlook, Apple Mail)
  Cores da marca: #E87A5A (laranja) em headers e CTAs
  Fallback texto simples para clientes que nao renderizam HTML
  Tamanho maximo recomendado: 100KB (incluindo imagens inline)`
},
{
  title: "10. Fluxos de Dados Detalhados",
  color: [249, 115, 22],
  content: `FLUXO A: GRAVACAO E ANALISE DE REUNIAO (9 passos)
===================================================
Browser                    Supabase              OpenAI        Storage
   |                          |                     |           |
   |-- getUserMedia() -------> (browser API)         |           |
   |<- MediaStream             |                     |           |
   |                           |                     |           |
   |-- [gravacao em chunks]    |                     |           |
   |-- new Blob(chunks)        |                     |           |
   |                           |                     |           |
   |-- UploadFile(blob) -----> |                     |           |
   |                           |-- storage.upload -> bucket armazena|
   |                           |<- file_url -----    |           |
   |<- { file_url }            |                     |           |
   |                           |                     |           |
   |-- TranscribeAudio(url) -> |                     |           |
   |                           |-- Edge Function --> Whisper API |
   |                           |<- transcript ---     |           |
   |<- transcript              |                     |           |
   |                           |                     |           |
   |-- InvokeLLM(prompt) ----> |                     |           |
   |                           |-- Edge Function --> ChatCompletion|
   |                           |<- JSON analysis      |           |
   |<- {summary,actions,...}   |                     |           |
   |                           |                     |           |
   |-- [jsPDF gera PDF no browser]                   |           |
   |-- UploadFile(pdfBlob) --> |                     |           |
   |                           |-- storage.upload -> bucket      |
   |                           |<- pdf_url -----     |           |
   |<- { pdf_url }             |                     |           |
   |                           |                     |           |
   |-- MeetingRecording.create({...dados, pdf_url})  |           |
   |                           |-- INSERT (RLS)      |           |
   |<- { id, ...record }       |                     |           |

FLUXO B: TIMER POMODORO (estado local + persistencia)
=======================================================
FocusTimerContext (React Context - persiste entre navegacoes):
  Estado: phase, remainingSeconds, isRunning, cycleIndex

  handlePlayPause() chamado:
    if remainingSeconds <= 0: advancePhase() muda fase
    setIsRunning(prev => !prev)

  useEffect([isRunning]):
    if isRunning: intervalRef = setInterval(tick, 1000)
    return () => clearInterval(intervalRef)

  tick():
    setRemainingSeconds(prev => {
      if (prev <= 1): setIsRunning(false); return 0
      return prev - 1
    })

  useEffect([remainingSeconds, isRunning]):
    if remainingSeconds === 0 && !isRunning && phase === "focus":
      setSessionCompleted(true)  // trigger para FocusPomo.jsx

  FocusPomo.jsx useEffect([sessionCompleted]):
    if sessionCompleted:
      FocusSession.create({ duration_minutes: focusMin, type: "focus" })
      if (Notification.permission === "granted") new Notification(...)
      setCompletedOranges(n+1)
      resetSessionCompleted()

FLUXO C: DRAG AND DROP KANBAN
================================
onDragEnd(result):
  const { source, destination, draggableId } = result;
  if (!destination) return;  // drop fora da area

  const srcCol = source.droppableId;      // ex: "monday"
  const dstCol = destination.droppableId; // ex: "tuesday"

  // Mover entre colunas:
  if (srcCol !== dstCol):
    Task.update(draggableId, { weekday: dstCol, order: destination.index })

  // Reordenar na mesma coluna:
  else:
    // Recalcular order de TODAS as tarefas da coluna
    const reordered = reorder(colTasks, source.index, destination.index);
    reordered.forEach((task, i) => Task.update(task.id, { order: i }));

  // Actualizacao optimista no estado local (sem esperar API):
  setTasks(prev => applyReorder(prev, result));`
},
{
  title: "11. Analytics, Metricas e Calculos de Performance",
  color: [99, 102, 241],
  content: `ANALYTICS DE FOCO (FocusAnalytics.jsx):
=========================================
Todos os calculos sao feitos client-side com useMemo para evitar re-calculos.

// Carregar todas as sessoes (max 500):
const sessions = await FocusSession.list("-created_date", 500);
const focusSessions = sessions.filter(s => s.type === "focus" && s.completed);

// Sessoes de hoje:
const todayStr = format(new Date(), "yyyy-MM-dd");
const sessionsToday = focusSessions.filter(s =>
  format(new Date(s.created_date), "yyyy-MM-dd") === todayStr);

// Streak de dias consecutivos:
const getDayKey = s => format(new Date(s.created_date), "yyyy-MM-dd");
const uniqueDays = [...new Set(focusSessions.map(getDayKey))].sort().reverse();
let streak = 0;
let checkDay = new Date();
for (const day of uniqueDays) {
  if (day === format(checkDay, "yyyy-MM-dd")) {
    streak++;
    checkDay = subDays(checkDay, 1);
  } else break;
}

// Dados diarios para grafico (ultimos 30 dias):
const dailyData = Array.from({ length: 30 }, (_, i) => {
  const date = subDays(new Date(), 29 - i);
  const dateStr = format(date, "yyyy-MM-dd");
  const daySessions = focusSessions.filter(s =>
    format(new Date(s.created_date), "yyyy-MM-dd") === dateStr);
  return {
    date: format(date, "dd/MM"),
    sessions: daySessions.length,
    minutes: daySessions.reduce((acc, s) => acc + s.duration_minutes, 0)
  };
});

// Distribuicao por hora (para bar chart):
const hourlyDist = Array.from({ length: 24 }, (_, h) => ({
  hour: h,
  count: focusSessions.filter(s => new Date(s.created_date).getHours() === h).length
}));

ANALYTICS DE HABITOS:
=======================
// Dados semanais (ultimas 8 semanas):
const weeklyData = Array.from({ length: 8 }, (_, i) => {
  const weekStart = startOfWeek(subWeeks(new Date(), 7 - i));
  const weekEnd = endOfWeek(weekStart);
  const weekEntries = entries.filter(e =>
    isWithinInterval(parseISO(e.date), { start: weekStart, end: weekEnd }));
  return {
    week: format(weekStart, "dd/MM"),
    completions: weekEntries.length,
    score: weekEntries.reduce((acc, e) => acc + e.score, 0)
  };
});

GAMIFICACAO - CALCULO DE CONQUISTAS:
======================================
const totalScore = entries.reduce((acc, e) => acc + e.score, 0);
const totalCompletions = entries.length;

// Streak: dias consecutivos com pelo menos 1 entrada
const sortedDates = [...new Set(entries.map(e => e.date))].sort().reverse();
let streak = 0;
let checkDate = format(new Date(), "yyyy-MM-dd");
for (const date of sortedDates) {
  if (date === checkDate) {
    streak++;
    checkDate = format(subDays(parseISO(checkDate), 1), "yyyy-MM-dd");
  } else break;
}

Conquistas com thresholds:
  "Primeira Semente": completions >= 1
  "Em Chamas":        streak >= 3
  "Diamante":         totalScore >= 100
  "Campiao":          totalScore >= 500
  "Relampago":        streak >= 7
  "Rei dos Habitos":  streak >= 30`
},
{
  title: "12. Seguranca - OWASP, CSRF, XSS, Injeccao",
  color: [220, 38, 38],
  content: `OWASP TOP 10 - COBERTURA:
==========================
A1 - Broken Access Control:
  RLS em todas as tabelas (policies created_by_id = auth.uid())
  JWT assinado pela Supabase Auth (GoTrue), verificado pelo PostgREST/Postgres
  Verificacao de ownership em UPDATE/DELETE garantida pelas policies RLS

A2 - Cryptographic Failures:
  Passwords: hashing seguro gerido internamente pelo Supabase Auth (nunca MD5/SHA1)
  Tokens de recovery: gerados e geridos pelo Supabase Auth, com expiracao curta
  TLS 1.3 obrigatorio em todas as ligacoes ao projecto Supabase
  Dados em repouso: encriptados pela infraestrutura subjacente da Supabase

A3 - Injection:
  PostgREST usa queries parametrizadas (nunca concatenacao de SQL)
  Constraints e tipos de coluna validados pelo proprio Postgres
  Sanitizacao de inputs string no frontend (trim, limite de comprimento)

A5 - Security Misconfiguration:
  CORS: configuravel no projecto Supabase (apenas origens aprovadas)
  Headers de seguranca recomendados no proxy/CDN do frontend:
    X-Content-Type-Options: nosniff
    X-Frame-Options: DENY
    Content-Security-Policy: default-src 'self'
    Referrer-Policy: strict-origin-when-cross-origin

A7 - Cross-Site Scripting (XSS):
  React escapa automaticamente JSX (innerHTML nunca usado)
  dangerouslySetInnerHTML: nao usado na app
  Content-Security-Policy bloqueia scripts inline

CSRF PROTECTION:
  O supabase-js usa Bearer tokens (Authorization header) em vez de cookies
  de sessao para autenticar requests, o que reduz significativamente a
  superficie de ataque CSRF tradicional (baseada em cookies).

RATE LIMITING:
  Gerido pela infraestrutura da Supabase Auth para endpoints sensiveis:
    Login / signUp: limitado por IP/utilizador para mitigar brute-force
    Edge Functions: podem implementar rate limiting adicional (ex: via Redis/Upstash)

  Resposta tipica em caso de limite excedido: 429 Too Many Requests

DADOS PESSOAIS (GDPR):
  Direito ao esquecimento: eliminacao da conta via Supabase Auth + CASCADE nas tabelas
  Portabilidade: exportacao dos registos via queries diretas as tabelas do utilizador
  Conformidade: encriptacao em transito (TLS) e em repouso, geridas pela Supabase`
},
{
  title: "13. [EDUCATIVO] Stack Backend Recomendada do Zero",
  color: [20, 184, 166],
  content: `NOTA EDUCATIVA: Esta seccao explica como implementar um backend equivalente
sem qualquer BaaS, usando tecnologias open-source standard de producao.

STACK TECNOLOGICA RECOMENDADA:
================================
Runtime:    Node.js 20 LTS (com suporte nativo TypeScript via tsx)
Framework:  Express.js 4 ou Fastify 4 (melhor performance +40%)
Database:   PostgreSQL 16 (ACID compliant, suporta JSONB, full-text search)
ORM:        Prisma 5 (type-safe, migrations automaticas, Prisma Studio UI)
Auth JWT:   jose (JWT RS256) + bcrypt (password hashing)
Cache:      Redis 7 (sessions, rate limiting, pub/sub para real-time)
Storage:    Cloudflare R2 (compativel S3, sem egress fees) ou AWS S3
Email:      Resend (https://resend.com) - API key necessaria
LLM:        OpenAI SDK v4 (API key necessaria)
Realtime:   socket.io v4 ou ws package
Deploy:     Docker + docker-compose / Railway / Render / Fly.io (mais baratos)

ESTRUTURA DE PASTAS:
=====================
backend/
  src/
    app.ts              - Express setup, middleware global
    server.ts           - HTTP + WebSocket server
    routes/
      auth.ts           - /auth/register, /auth/login, /auth/verify-otp, etc.
      entities.ts       - /entities/:name (CRUD generico com RLS)
      integrations.ts   - /integrations/upload, /integrations/llm, etc.
    middleware/
      auth.ts           - JWT verification (bearer token)
      rls.ts            - Row-Level Security por utilizador
      rateLimit.ts      - Redis-based rate limiting
      validate.ts       - JSON Schema validation
    services/
      openai.ts         - LLM + Whisper (server-side, chave protegida)
      storage.ts        - S3/R2 upload e signed URLs
      email.ts          - Resend email sending
    lib/
      jwt.ts            - sign/verify tokens (jose)
      db.ts             - Prisma client singleton
      redis.ts          - Redis client singleton
  prisma/
    schema.prisma       - modelos da base de dados
  Dockerfile
  docker-compose.yml
  package.json

SCHEMA PRISMA (modelos principais):
=====================================
generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql"; url = env("DATABASE_URL") }

model User {
  id           String    @id @default(uuid())
  email        String    @unique
  passwordHash String?   @map("password_hash")
  fullName     String?   @map("full_name")
  role         String    @default("user")
  verified     Boolean   @default(false)
  otpCode      String?   @map("otp_code")
  otpExpiry    DateTime? @map("otp_expiry")
  createdDate  DateTime  @default(now()) @map("created_date")
  updatedDate  DateTime  @updatedAt @map("updated_date")
  tasks        Task[]
  habits       Habit[]
  @@map("users")
}

model Task {
  id          String   @id @default(uuid())
  createdById String   @map("created_by_id")
  createdDate DateTime @default(now()) @map("created_date")
  updatedDate DateTime @updatedAt @map("updated_date")
  title       String
  description String?
  weekday     String   @default("none")
  period      String?
  tagsJson    String?  @map("tags_json")
  weekStart   String?  @map("week_start")
  completed   Boolean  @default(false)
  order       Int      @default(0)
  user        User     @relation(fields: [createdById], references: [id], onDelete: Cascade)
  @@map("tasks")
}

// Adicionar modelos similares para: Habit, HabitEntry, FocusSession,
// Deadline, Event, MeetingRecording, Tag (com mesmo padrao de campos auto)

INICIAR PROJECTO:
  npm create vite@latest backend -- --template vanilla-ts
  cd backend && npm install express prisma @prisma/client jose bcrypt
  npm install redis socket.io @aws-sdk/client-s3 resend openai multer
  npm install -D @types/express @types/bcrypt tsx nodemon
  npx prisma init  // cria prisma/schema.prisma e .env`
},
{
  title: "14. [EDUCATIVO] Implementacao do Servidor Express",
  color: [20, 184, 166],
  content: `SETUP DO SERVIDOR EXPRESS (src/app.ts):
=========================================
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { authRouter } from "./routes/auth";
import { entitiesRouter } from "./routes/entities";
import { integrationsRouter } from "./routes/integrations";
import { authMiddleware } from "./middleware/auth";

const app = express();

// Seguranca: headers HTTP seguros automaticos
app.use(helmet());

// CORS: apenas origens aprovadas
app.use(cors({
  origin: ["https://focusgrid.app", "http://localhost:5173"],
  credentials: true  // necessario para cookies httpOnly
}));

// Body parsing
app.use(express.json({ limit: "10mb" }));

// Rotas publicas (sem autenticacao):
app.use("/auth", authRouter);

// Rotas protegidas (requerem JWT valido):
app.use("/entities", authMiddleware, entitiesRouter);
app.use("/integrations", authMiddleware, integrationsRouter);

export default app;

MIDDLEWARE DE AUTENTICACAO JWT (src/middleware/auth.ts):
=========================================================
import { jwtVerify, importSPKI } from "jose";

const publicKeyPem = process.env.JWT_PUBLIC_KEY!;
const PUBLIC_KEY = await importSPKI(publicKeyPem, "RS256");

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "missing_token" });
  }
  const token = authHeader.slice(7);
  try {
    const { payload } = await jwtVerify(token, PUBLIC_KEY);
    req.user = { id: payload.sub, role: payload.role, email: payload.email };
    next();
  } catch (err) {
    return res.status(401).json({ error: "invalid_token" });
  }
}

ROUTER DE ENTIDADES CRUD GENERICO (src/routes/entities.ts):
=============================================================
import { prisma } from "../lib/db";

// Mapeamento nome da entidade -> modelo Prisma
const ENTITY_MAP: Record<string, string> = {
  Task: "task", Habit: "habit", Tag: "tag",
  FocusSession: "focusSession", HabitEntry: "habitEntry",
  Deadline: "deadline", Event: "event", MeetingRecording: "meetingRecording"
};

// Aplicar RLS
function getRLSFilter(user: { id: string; role: string }) {
  if (user.role === "admin") return {};
  return { createdById: user.id };
}

// GET /entities/:entity -> listar
router.get("/:entity", async (req, res) => {
  const model = ENTITY_MAP[req.params.entity];
  if (!model) return res.status(404).json({ error: "entity_not_found" });

  const { sort = "-createdDate", limit = "50", skip = "0" } = req.query;
  const sortField = String(sort).replace("-", "");
  const sortDir = String(sort).startsWith("-") ? "desc" : "asc";

  const records = await prisma[model].findMany({
    where: getRLSFilter(req.user),
    orderBy: { [sortField]: sortDir },
    take: Math.min(parseInt(String(limit)), 500),
    skip: parseInt(String(skip))
  });
  res.json(records);
});

// POST /entities/:entity -> criar
router.post("/:entity", async (req, res) => {
  const model = ENTITY_MAP[req.params.entity];
  if (!model) return res.status(404).json({ error: "entity_not_found" });

  const record = await prisma[model].create({
    data: { ...req.body, createdById: req.user.id }
  });

  // Emitir evento realtime para subscriptions WebSocket:
  emitEntityEvent(req.user.id, req.params.entity, "create", record);

  res.status(201).json(record);
});

// PATCH /entities/:entity/:id -> actualizar
router.patch("/:entity/:id", async (req, res) => {
  const model = ENTITY_MAP[req.params.entity];
  const where = { id: req.params.id, ...getRLSFilter(req.user) };
  const existing = await prisma[model].findFirst({ where });
  if (!existing) return res.status(404).json({ error: "not_found" });

  // Remover campos imutaveis do body:
  const { id, createdById, createdDate, ...safeData } = req.body;
  const updated = await prisma[model].update({ where: { id: req.params.id }, data: safeData });

  emitEntityEvent(req.user.id, req.params.entity, "update", updated);
  res.json(updated);
});

// DELETE /entities/:entity/:id -> eliminar
router.delete("/:entity/:id", async (req, res) => {
  const model = ENTITY_MAP[req.params.entity];
  const where = { id: req.params.id, ...getRLSFilter(req.user) };
  const existing = await prisma[model].findFirst({ where });
  if (!existing) return res.status(404).json({ error: "not_found" });

  await prisma[model].delete({ where: { id: req.params.id } });
  emitEntityEvent(req.user.id, req.params.entity, "delete", null);
  res.status(204).send();
});`
},
{
  title: "15. [EDUCATIVO] Autenticacao do Zero - JWT, bcrypt, OAuth",
  color: [20, 184, 166],
  content: `GERACAO DE TOKENS JWT (src/lib/jwt.ts):
=========================================
import { SignJWT, jwtVerify, generateKeyPair, exportPKCS8, exportSPKI } from "jose";

// Gerar par de chaves RSA-256 (fazer 1x no setup, guardar em env vars):
const { privateKey, publicKey } = await generateKeyPair("RS256");
const privateKeyPem = await exportPKCS8(privateKey);   // -> JWT_PRIVATE_KEY env var
const publicKeyPem = await exportSPKI(publicKey);       // -> JWT_PUBLIC_KEY env var

export async function signAccessToken(userId: string, role: string) {
  return new SignJWT({ sub: userId, role, email: userEmail })
    .setProtectedHeader({ alg: "RS256" })
    .setIssuedAt()
    .setExpirationTime("15m")  // 15 minutos
    .sign(privateKey);
}

export async function signRefreshToken(userId: string) {
  return new SignJWT({ sub: userId, type: "refresh" })
    .setProtectedHeader({ alg: "RS256" })
    .setIssuedAt()
    .setExpirationTime("7d")  // 7 dias
    .sign(privateKey);
}

ENDPOINT DE REGISTO (src/routes/auth.ts):
==========================================
import bcrypt from "bcrypt";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || password.length < 8)
    return res.status(400).json({ error: "invalid_input" });

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(409).json({ error: "email_taken" });

  // Hash (custo 12 = ~250ms, dificulta brute-force)
  const passwordHash = await bcrypt.hash(password, 12);

  // OTP de 6 digitos
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

  await prisma.user.create({
    data: { email, passwordHash, verified: false, otpCode, otpExpiry }
  });

  await resend.emails.send({
    from: "FocusGrid <noreply@focusgrid.app>",
    to: [email], subject: "Verifica o teu email",
    html: "<h2>Codigo: <strong>" + otpCode + "</strong></h2><p>Expira em 15min.</p>"
  });

  res.json({ message: "otp_sent" });
});

ENDPOINT VERIFY OTP:
=====================
router.post("/verify-otp", async (req, res) => {
  const { email, otpCode } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.otpCode !== otpCode || new Date() > user.otpExpiry)
    return res.status(400).json({ error: "invalid_otp" });

  await prisma.user.update({
    where: { id: user.id },
    data: { verified: true, otpCode: null, otpExpiry: null }
  });

  const access_token = await signAccessToken(user.id, user.role);
  const refresh_token = await signRefreshToken(user.id);

  await prisma.refreshToken.create({
    data: { token: await bcrypt.hash(refresh_token, 10), userId: user.id }
  });

  res.json({ access_token, refresh_token, user: { id: user.id, email } });
});

ENDPOINT LOGIN:
================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  // Comparar sempre (mesmo que user nao exista) para evitar timing attacks
  const valid = user && await bcrypt.compare(password, user.passwordHash || "");
  if (!valid || !user?.verified)
    return res.status(401).json({ error: "invalid_credentials" });

  const access_token = await signAccessToken(user.id, user.role);
  const refresh_token = await signRefreshToken(user.id);

  res.json({ access_token, refresh_token, user: { id: user.id, email: user.email } });
});

ENDPOINT RESET PASSWORD:
=========================
import crypto from "crypto";

router.post("/reset-password-request", async (req, res) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  // Sempre responder com sucesso (nao revelar se email existe)
  if (user) {
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 60 * 60 * 1000);  // 1 hora

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken: token, resetTokenExpiry: expiry }
    });

    const resetUrl = "https://focusgrid.app/reset-password?token=" + token;
    await resend.emails.send({
      from: "FocusGrid <noreply@focusgrid.app>",
      to: [email], subject: "Reset de password",
      html: "<p>Clica no link para redefinir: <a href='" + resetUrl + "'>Reset Password</a></p>"
    });
  }
  res.json({ message: "if_email_exists_reset_sent" });
});`
},
{
  title: "16. [EDUCATIVO] WebSockets, Storage S3/R2 e Deploy Docker",
  color: [20, 184, 166],
  content: `WEBSOCKETS COM socket.io (src/server.ts):
==========================================
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "https://focusgrid.app", credentials: true },
  pingTimeout: 60000, pingInterval: 25000
});

// Autenticar conexao WebSocket via JWT:
io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const { payload } = await jwtVerify(token, PUBLIC_KEY);
    socket.data.userId = payload.sub;
    socket.data.role = payload.role;
    next();
  } catch { next(new Error("unauthorized")); }
});

io.on("connection", (socket) => {
  // Join room pessoal do utilizador:
  socket.join("user:" + socket.data.userId);

  socket.on("subscribe", ({ entity }) => {
    socket.join("entity:" + entity + ":" + socket.data.userId);
  });

  socket.on("unsubscribe", ({ entity }) => {
    socket.leave("entity:" + entity + ":" + socket.data.userId);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.data.userId);
  });
});

// Emitir eventos apos operacoes CRUD (chamado nos routers):
export function emitEntityEvent(userId: string, entity: string, type: string, data: any) {
  io.to("entity:" + entity + ":" + userId)
    .emit("entity_event", { type, entity, id: data?.id, data });
}

// Iniciar servidor (HTTP + WebSocket no mesmo porto):
httpServer.listen(3000, () => console.log("Server running on port 3000"));

STORAGE COM CLOUDFLARE R2 (src/services/storage.ts):
======================================================
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createHash } from "crypto";

// R2 e 100% compativel com a API S3
const s3 = new S3Client({
  region: "auto",
  endpoint: "https://[ACCOUNT_ID].r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY!,
    secretAccessKey: process.env.R2_SECRET_KEY!
  }
});

export async function uploadPublicFile(buffer: Buffer, mimeType: string): Promise<string> {
  const hash = createHash("sha256").update(buffer).digest("hex");
  const key = "files/" + hash;

  await s3.send(new PutObjectCommand({
    Bucket: "focusgrid-storage", Key: key,
    Body: buffer, ContentType: mimeType
  }));

  // URL publica com dominio personalizado (configurado no R2 dashboard):
  return "https://cdn.focusgrid.app/" + key;
}

export async function createSignedUrl(key: string, expiresIn = 300): Promise<string> {
  const command = new GetObjectCommand({ Bucket: "focusgrid-storage", Key: key });
  return getSignedUrl(s3, command, { expiresIn });
}

INTEGRACAO OPENAI SERVER-SIDE (src/services/openai.ts):
========================================================
import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function transcribeAudio(fileUrl: string): Promise<string> {
  const response = await fetch(fileUrl);
  const buffer = Buffer.from(await response.arrayBuffer());
  const file = new File([buffer], "audio.webm", { type: "audio/webm" });

  const transcription = await client.audio.transcriptions.create({
    model: "whisper-1", file, response_format: "text"
  });
  return transcription as string;
}

export async function invokeLLM(prompt: string, jsonSchema?: object): Promise<any> {
  const messages = [{ role: "user" as const, content: prompt }];
  if (jsonSchema) {
    messages[0].content += "\\n\\nResponde APENAS com JSON valido seguindo este schema: " + JSON.stringify(jsonSchema);
  }
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    response_format: jsonSchema ? { type: "json_object" } : undefined
  });
  const content = response.choices[0].message.content!;
  return jsonSchema ? JSON.parse(content) : content;
}

DEPLOY COM DOCKER:
===================
# Dockerfile (multi-stage build)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate && npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD ["node", "dist/server.js"]

# docker-compose.yml (desenvolvimento local)
version: "3.9"
services:
  api:
    build: .
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgresql://focusgrid:secret@db:5432/focusgrid
      REDIS_URL: redis://redis:6379
      OPENAI_API_KEY: sk-...
      RESEND_API_KEY: re_...
      JWT_PRIVATE_KEY: "-----BEGIN PRIVATE KEY-----..."
      JWT_PUBLIC_KEY: "-----BEGIN PUBLIC KEY-----..."
    depends_on: [db, redis]
  db:
    image: postgres:16-alpine
    environment: { POSTGRES_DB: focusgrid, POSTGRES_USER: focusgrid, POSTGRES_PASSWORD: secret }
    volumes: ["pgdata:/var/lib/postgresql/data"]
  redis:
    image: redis:7-alpine
    volumes: ["redisdata:/data"]
volumes:
  pgdata:
  redisdata:

CUSTO ESTIMADO (producao pequena):
  Railway/Render (API): $5-10/mes
  Supabase (PostgreSQL gerido): free tier ou $25/mes
  Cloudflare R2 (Storage): $0.015/GB/mes (primeiros 10GB gratis)
  Resend (Email): 3000 emails/mes gratis, depois $20/mes
  OpenAI: pay-as-you-go (~$5-20/mes em uso normal)
  Total estimado: $30-55/mes para app com 100-500 utilizadores activos`
}];
