import { useState } from "react";
import { motion } from "framer-motion";
import { PDF_SECTIONS } from "@/lib/pdfSections";
import { Download, FileText, Code, Server, Database, Shield, Zap, Globe, Layers, GitBranch, Lock, RefreshCw, ChevronDown, ChevronUp, Archive } from "lucide-react";

const SECTIONS = [
{
  id: "overview",
  icon: Layers,
  color: "#E87A5A",
  title: "1. Visão Geral da Arquitetura",
  content: `
O FocusFlow é uma Progressive Web App (PWA) construída sobre o Supabase, que fornece Backend-as-a-Service (BaaS) completo. A aplicação segue uma arquitetura de três camadas:

CAMADA DE APRESENTAÇÃO (Frontend)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Framework: React 18 + Vite
• Styling: Tailwind CSS com design tokens personalizados (CSS variables)
• Animações: Framer Motion para transições fluidas
• Routing: React Router DOM v6 com rotas protegidas
• State Management: React hooks locais + React Query para cache de servidor
• Componentes UI: shadcn/ui (Radix UI base)

CAMADA DE DADOS (Backend-as-a-Service)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Plataforma: Supabase BaaS
• Database: PostgreSQL gerido automaticamente pela Supabase
• Cliente: @supabase/supabase-js
• Autenticação: Supabase Auth (JWT + OAuth)
• File Storage: Supabase Storage (buckets públicos/privados com CDN)

CAMADA DE INTEGRAÇÕES
━━━━━━━━━━━━━━━━━━━━
• LLM (Large Language Models): OpenAI GPT-4o-mini (default), Claude, Gemini
• Transcrição de Áudio: OpenAI Whisper
• Geração de Imagens: DALL-E 3
• Email: Resend (via Supabase Edge Functions)
• Análise Web: Integração com Google Search
`
},
{
  id: "entities",
  icon: Database,
  color: "#8B5CF6",
  title: "2. Entidades e Esquemas de Dados",
  content: `
O sistema utiliza 8 entidades principais, todas com campos built-in automáticos:
• id (UUID v4, auto-gerado)
• created_date (ISO 8601, auto-gerado)
• updated_date (ISO 8601, auto-atualizado)
• created_by_id (ID do utilizador criador)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ENTIDADE: Task
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Representa tarefas semanais no TaskBoard.
• title: string (obrigatório) — título da tarefa
• description: string — notas adicionais
• weekday: enum [monday..sunday, none] — dia da semana
• period: enum [morning, afternoon, evening, null] — período
• tags_json: string — JSON array de tags [{id, name, color}]
• week_start: string (date ISO) — início da semana
• completed: boolean (default: false)
• order: number (default: 0) — ordenação drag-and-drop

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ENTIDADE: Tag
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• name: string (obrigatório)
• color: enum [blue, purple, green, amber, rose, teal, indigo, pink]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ENTIDADE: FocusSession
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Regista sessões Pomodoro completadas.
• tag_id, tag_name, tag_color — referência de tag
• duration_minutes: number
• type: enum [focus, pause]
• completed: boolean (default: true)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ENTIDADE: Habit
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• name: string (obrigatório)
• description: string
• score: number (default: 10) — pontuação por completar
• color: string (hex ou preset key)
• active: boolean (default: true)
• order: number

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ENTIDADE: HabitEntry
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Regista cada vez que um hábito é completado.
• habit_id: string — referência ao Habit
• habit_name, habit_color — snapshot do momento
• score: number — pontuação obtida
• date: string (ISO) — data de completação

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ENTIDADE: Deadline
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Prazos com data/hora limite.
• name: string (obrigatório)
• color: string — cor de apresentação
• location: string — local opcional
• website: string — URL opcional
• deadline: string (ISO datetime) — data e hora limite

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ENTIDADE: Event
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Eventos com duração calculada automaticamente.
• name: string (obrigatório)
• color, location, website, description — metadados
• start_datetime: string (ISO datetime) — obrigatório
• end_datetime: string (ISO datetime) — obrigatório
• DURAÇÃO: calculada no frontend: differenceInMinutes(end, start)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ENTIDADE: MeetingRecording
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Gravações de reuniões com análise IA.
• title: string (obrigatório)
• summary, transcript — texto gerado por IA
• action_items_json: string — JSON array de ações
• deadlines_json: string — JSON array de prazos
• mind_map_json: string — JSON hierárquico do mapa mental
• pdf_url: string — URL do PDF gerado no Storage
• audio_duration_seconds: number
• event_id, event_name — ligação opcional a Event/Deadline
• meeting_date: string (date)
`
},
{
  id: "sdk",
  icon: Code,
  color: "#3B82F6",
  title: "3. Camada de Dados — Wrapper de Entidades sobre Supabase",
  content: `
O cliente Supabase (@supabase/supabase-js) é inicializado em src/api/supabaseClient.js.
Sobre ele, src/api/entities.js expõe um wrapper com a mesma forma de chamadas para todas as entidades.

MÉTODOS CRUD DISPONÍVEIS PARA TODAS AS ENTIDADES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<EntityName>.list(sort?, limit?, skip?)
  → Retorna array de todos os registos (supabase.from(table).select("*"))
  → sort: string ex. "-created_date" (- = descendente)
  → limit: número máximo de resultados (default: 50)
  → Ex: Task.list("-updated_date", 500)

<EntityName>.filter(query, sort?, limit?)
  → Filtra por condições específicas
  → query: objeto {campo: valor} ou operadores tipo MongoDB
  → Ex: Task.filter({completed: false, week_start: "2024-01-01"})
  → Suporta: {$gte, $lte, $gt, $lt, $ne, $in}

<EntityName>.create(data)
  → Cria novo registo, retorna o objeto criado com id
  → Ex: Habit.create({name: "Exercício", score: 15})

<EntityName>.update(id, data)
  → Atualiza campos específicos (merge parcial)
  → Ex: Task.update(taskId, {completed: true})

<EntityName>.delete(id)
  → Remove permanentemente o registo
  → Ex: Deadline.delete(deadlineId)

<EntityName>.bulkCreate(array)
  → Cria múltiplos registos em batch
  → Ex: Tag.bulkCreate([{name:"A"}, {name:"B"}])

SUBSCRIPTIONS EM TEMPO REAL (Supabase Realtime):
━━━━━━━━━━━━━━━━━━━━━━━━━━━
const unsubscribe = Task.subscribe((event) => {
  // event.type: 'create' | 'update' | 'delete'
  // event.id: ID do registo afetado
  // event.data: dados atualizados
});
unsubscribe(); // cleanup

UTILIZADOR (especial):
━━━━━━━━━━━━━━━━━━━━━━━━
auth.me() retorna o utilizador autenticado (Supabase Auth user).
Campos custom usados nesta app são guardados em user.user_metadata:
• focus_min, short_break_min, long_break_min: configurações do timer
• orange_reset: frequência de reset das laranjas
• notifications_enabled: boolean
• notification_sound: string
• week_starts_on: 0 (domingo) ou 1 (segunda)
Estes campos são atualizados via supabase.auth.updateUser({ data: {...} }).
`
},
{
  id: "auth",
  icon: Shield,
  color: "#10B981",
  title: "4. Sistema de Autenticação",
  content: `
A autenticação é gerida inteiramente pelo Supabase Auth, eliminando a necessidade de implementar
lógica de auth no backend.

MÉTODOS DE AUTENTICAÇÃO (src/api/auth.js):
━━━━━━━━━━━━━━━━━━━━━━━
auth.login(email, password)
  → Login com credenciais (supabase.auth.signInWithPassword)
  → Em sucesso: window.location.href = '/' (hard redirect para reinicializar estado)

auth.loginWithGoogle(redirectTo?)
  → OAuth social via Google (supabase.auth.signInWithOAuth)
  → Redireciona para o provider, retorna à app com sessão estabelecida

auth.register(email, password)
  → Regista novo utilizador (supabase.auth.signUp)
  → Envia email de confirmação — requer verificação OTP

auth.verifyOtp(email, token)
  → Verifica o código enviado por email após registo
  → Em sucesso: sessão é guardada automaticamente pelo supabase-js

auth.requestPasswordReset(email) — envio de email de reset (magic link)
auth.resetPassword(newPassword) — reset usando a sessão de recovery já ativa

auth.me() → Promise<User> — dados do utilizador atual (supabase.auth.getUser)
auth.getSession() → Promise<Session> — sessão atual
auth.logout() → termina sessão (supabase.auth.signOut)
auth.onAuthStateChange(callback) → subscreve alterações de sessão

PROTEÇÃO DE ROTAS:
━━━━━━━━━━━━━━━━━
O componente ProtectedRoute (src/components/ProtectedRoute.jsx) usa useAuth()
para verificar autenticação antes de renderizar a rota.
Não autenticado → redireciona para /login
A carga é feita via AuthProvider (src/lib/AuthContext.jsx) que envolve toda a app.

TOKENS JWT:
━━━━━━━━━━
Tokens são gerados e armazenados de forma segura pelo Supabase Auth.
Cada request via supabase-js inclui automaticamente o token no header Authorization.
A renovação automática de tokens é gerida pelo cliente Supabase.

REGRAS DE SEGURANÇA (RLS):
━━━━━━━━━━━━━━━━━━━━━━━━━
Por default, utilizadores apenas acedem aos seus próprios dados (created_by_id = auth.uid()),
via policies de Row-Level Security nativas do PostgreSQL.
Admins podem ter acesso alargado através de policies adicionais baseadas em claims do JWT.
`
},
{
  id: "integrations",
  icon: Zap,
  color: "#F59E0B",
  title: "5. Integrações — Core Package (Supabase Edge Functions)",
  content: `
As integrações são acedidas via Core.<Endpoint>(params), exportado de src/api/integrations.js.
Internamente, cada chamada invoca uma Supabase Edge Function (supabase.functions.invoke)
que faz proxy seguro para a API externa correspondente (OpenAI, Resend, etc.), mantendo
as chaves de API fora do frontend.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
InvokeLLM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Invoca modelos de linguagem para geração de texto ou JSON estruturado.

Parâmetros:
• prompt: string (obrigatório) — instrução para o modelo
• response_json_schema: object — se fornecido, retorna JSON (não string)
• add_context_from_internet: boolean — adiciona contexto via Google Search
• file_urls: string[] — URLs de imagens/ficheiros para contexto visual
• model: string — modelo específico:
  - "automatic" (default) → gpt-4o-mini
  - "gpt_5_mini" → mais económico
  - "gpt_5_4" / "gpt_5_5" → GPT-4o e GPT-4.5
  - "claude_sonnet_4_6" → Claude Sonnet (melhor raciocínio)
  - "claude_opus_4_6/7/8" → Claude Opus (máxima qualidade)
  - "gemini_3_flash" / "gemini_3_1_pro" → Gemini (suportam web search)

USO NA APP:
Analisar transcrições de reuniões → extrai ações, prazos, mapa mental, resumo
Sugestões de hábitos com IA (HabitsManage) → gera lista personalizada de hábitos

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TranscribeAudio
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Transcrição de áudio para texto via OpenAI Whisper.

• audio_url: string — URL do ficheiro carregado via UploadFile
• Formatos: ogg, oga, mp3, wav, webm, m4a, mp4, mpeg, mpga, flac
• Limite: 25MB por ficheiro
• Retorna: string com transcrição completa
• Detecção automática de idioma (suporte multilingue)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
UploadFile
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Upload de ficheiros para um bucket público do Supabase Storage.

• file: Blob/File — ficheiro a carregar
• Retorna: {file_url: string} — URL pública permanente (getPublicUrl)
• CDN da Supabase para distribuição rápida
• Suporta qualquer tipo de ficheiro

USO NA APP: Upload de áudio antes de transcrever,
upload de PDFs gerados para guardar URL permanente.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
UploadPrivateFile + CreateFileSignedUrl
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Para ficheiros privados (não acessíveis publicamente).
• UploadPrivateFile({file}) → {file_uri: string}
• CreateFileSignedUrl({file_uri, expires_in}) → {signed_url: string}
• expires_in: segundos até expiração (default: 300)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SendEmail
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• to: string — destinatário
• subject: string — assunto
• body: string — corpo (HTML ou texto)
• from_name: string (opcional) — nome do remetente

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GenerateImage
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• prompt: string — descrição detalhada
• existing_image_urls: string[] — referências visuais
• Retorna: {url: string} — URL da imagem gerada

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GenerateSpeech
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TTS (Text-to-Speech) com múltiplas vozes.
• text: string (max 5000 chars)
• voice: "river"|"honey"|"sunny"|"storm"|"spark"
• language_code: string (auto-detect se omitido)
• Retorna: {url: string} — MP3 URL

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ExtractDataFromUploadedFile
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Extrai dados estruturados de ficheiros.
• file_url: string — URL do ficheiro (csv, xlsx, json, pdf, imagens)
• json_schema: object — schema dos dados a extrair
• Retorna: {status, output, details}
`
},
{
  id: "routing",
  icon: Globe,
  color: "#06B6D4",
  title: "6. Sistema de Routing e Navegação",
  content: `
ESTRUTURA DE ROTAS (App.jsx):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Rotas Públicas (sem autenticação):
• /login → Login.jsx
• /register → Register.jsx
• /forgot-password → ForgotPassword.jsx
• /reset-password → ResetPassword.jsx (recebe ?token=...)

Rotas Protegidas (requerem autenticação via ProtectedRoute):
• / → Home.jsx — Hub central de navegação gestual
• /focus → FocusPomo.jsx — Timer Pomodoro
• /focus/settings → FocusSettings.jsx — Configurações do timer
• /focus/calendar → FocusCalendar.jsx — Calendário de sessões
• /focus/analytics → FocusAnalytics.jsx — Analytics de produtividade
• /tasks → TaskBoard.jsx — Kanban semanal de tarefas
• /habits → Habits.jsx — Dashboard de hábitos
• /habits/manage → HabitsManage.jsx — CRUD de hábitos
• /habits/analytics → HabitsAnalytics.jsx — Gráficos de hábitos
• /habits/rewards → HabitsRewards.jsx — Gamificação/conquistas
• /coming-soon → ComingSoon.jsx — Hub de módulos avançados
• /deadlines → Deadlines.jsx — Controlo de Datas (prazos + eventos)
• /meeting-ai → MeetingAI.jsx — Reuniões com transcrição IA
• /export → ExportDocs.jsx — Documentação técnica (esta página)

NAVEGAÇÃO GESTUAL:
━━━━━━━━━━━━━━━━━
A app implementa navegação por swipe (touch + mouse), seguindo uma grelha direcional:

          [Explorar /coming-soon]
                   ↑
[Tarefas /tasks] ← [Home /] → [Hábitos /habits]
                   ↓
          [FocusPomo /focus]

No FocusPomo:
← Configurações | → Calendário | ↑ Home | ↓ Analytics

O sistema usa refs para tracking de coordenadas:
touchStart.current = {x, y}
dragOffset.current = {x, y}

Threshold de swipe: 60px mínimo
Feedback visual: dragStyle transforma o container durante o arrasto.
`
},
{
  id: "frontend",
  icon: GitBranch,
  color: "#EC4899",
  title: "7. Arquitetura Frontend — Componentes",
  content: `
ESTRUTURA DE FICHEIROS:
━━━━━━━━━━━━━━━━━━━━━━
src/
├── pages/           — Páginas (rotas)
│   ├── Home.jsx
│   ├── FocusPomo.jsx
│   ├── FocusSettings.jsx
│   ├── FocusCalendar.jsx
│   ├── FocusAnalytics.jsx
│   ├── TaskBoard.jsx
│   ├── Habits.jsx
│   ├── HabitsManage.jsx
│   ├── HabitsAnalytics.jsx
│   ├── HabitsRewards.jsx
│   ├── Deadlines.jsx
│   ├── MeetingAI.jsx
│   ├── ComingSoon.jsx
│   ├── ExportDocs.jsx
│   ├── Login.jsx / Register.jsx
│   ├── ForgotPassword.jsx / ResetPassword.jsx
├── components/      — Componentes reutilizáveis
│   ├── ui/          — shadcn/ui (Button, Input, Select, etc.)
│   ├── FocusTimer.jsx — Timer circular animado SVG
│   ├── OrangeCanvas.jsx — Animação de laranjas a cair
│   ├── TagPicker.jsx — Seletor de tags (single/multi)
│   ├── habits/TetrisGrid.jsx — Grid de hábitos
│   ├── ProtectedRoute.jsx — Wrapper de autenticação
│   ├── ScrollToTop.jsx — Reset scroll em navegação
│   └── UserNotRegisteredError.jsx
├── context/
│   └── FocusTimerContext.jsx — Timer Pomodoro global
├── lib/
│   ├── AuthContext.jsx — Contexto de autenticação
│   ├── query-client.js — React Query config
│   └── utils.js — cn() helper
├── api/
│   ├── supabaseClient.js — Instância do cliente Supabase
│   ├── entities.js — Wrapper CRUD/Realtime por entidade
│   ├── integrations.js — Core.* e InvokeLLM (Edge Functions)
│   └── auth.js — Wrapper de autenticação
├── entities/        — Schemas JSON das entidades
└── App.jsx          — Router principal

DESIGN SYSTEM:
━━━━━━━━━━━━━
index.css define CSS variables (tokens):
• --tomato-orange: #E87A5A — cor primária
• --cream: #FBF7F4 — background principal
• --warm-bg: #F5EFE9 — background secundário
• Fonte: Inter (Google Fonts)
• Border radius: 1rem (--radius)
• Modo escuro: suportado via .dark class

tailwind.config.js mapeia os tokens para classes Tailwind:
• bg-cream, text-primary, border-border, etc.

ESTADO GLOBAL:
━━━━━━━━━━━━━
FocusTimerContext (React Context):
• phase: "focus" | "shortBreak" | "longBreak"
• remainingSeconds, totalSeconds, isRunning
• cycleIndex (0-3), sessionCompleted
• focusMin, shortBreakMin, longBreakMin (do perfil)
• handlePlayPause(), handleSkip(), advancePhase()
• Persiste entre navegações — timer continua em background

React Query (@tanstack/react-query):
• Cache de dados do servidor com invalidação automática
• queryClientInstance em lib/query-client.js
• Usado em TaskBoard para cache de tarefas/tags
`
},
{
  id: "security",
  icon: Lock,
  color: "#EF4444",
  title: "8. Segurança e Regras de Acesso",
  content: `
AUTENTICAÇÃO E AUTORIZAÇÃO:
━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Todos os endpoints requerem autenticação via JWT Bearer token
2. Tokens são gerados pelo Supabase Auth com expiração e rotação automática
3. HTTPS obrigatório — o Supabase não aceita conexões não encriptadas

ROW-LEVEL SECURITY (RLS):
━━━━━━━━━━━━━━━━━━━━━━━━
Via policies de RLS configuradas nas tabelas PostgreSQL, cada utilizador apenas:
• LISTA apenas os registos onde created_by_id = auth.uid()
• CRIA registos com created_by_id = auth.uid() (via policy WITH CHECK)
• ATUALIZA apenas os seus próprios registos
• ELIMINA apenas os seus próprios registos

Exceções:
• Podem definir-se policies adicionais para utilizadores com claim role="admin"

VALIDAÇÃO DE DADOS:
━━━━━━━━━━━━━━━━━━
• Constraints NOT NULL/CHECK são validadas pelo próprio PostgreSQL
• Tipos de coluna garantem o formato correto (text, numeric, boolean, etc.)
• Campos enum são validados via CHECK constraints
• Injeção de SQL não é possível (PostgREST usa queries parametrizadas)

PROTEÇÃO CSRF:
━━━━━━━━━━━━━
• O supabase-js usa Bearer tokens (Authorization header), não cookies de sessão,
  reduzindo a superfície de ataque CSRF tradicional
• Origin validation configurável no projeto Supabase

UPLOAD DE FICHEIROS:
━━━━━━━━━━━━━━━━━━━
• Ficheiros carregados via UploadFile são escaneados
• URLs públicos são permanentes e imutáveis
• Ficheiros privados requerem signed URL com expiração

RATE LIMITING:
━━━━━━━━━━━━━
• A API tem rate limiting por utilizador
• Integrações (LLM, Transcrição) têm créditos mensais por plano
• Créditos de integração são renovados mensalmente

DADOS EM REPOUSO E TRÂNSITO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Todos os dados em repouso são encriptados (AES-256)
• Dados em trânsito: TLS 1.3
• Backups automáticos diários
• Conformidade GDPR — utilizadores podem solicitar eliminação de dados
`
},
{
  id: "pwa",
  icon: RefreshCw,
  color: "#14B8A6",
  title: "9. Progressive Web App (PWA)",
  content: `
O FocusFlow é distribuído como PWA, permitindo instalação em dispositivos móveis
e desktop sem necessidade de app stores.

MANIFEST (public/manifest.json):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{
  "name": "FocusFlow",
  "short_name": "FocusFlow",
  "theme_color": "#E87A5A",
  "background_color": "#FBF7F4",
  "display": "standalone",
  "orientation": "portrait"
}

INSTALAÇÃO:
━━━━━━━━━━
• iOS: Safari → Partilhar → Adicionar ao Ecrã Inicial
• Android: Chrome → Menu → Instalar App
• Desktop: Chrome/Edge → ícone de instalação na barra de endereço

CAPACIDADES OFFLINE:
━━━━━━━━━━━━━━━━━━
• Service Worker para cache de assets estáticos
• A app funciona offline para funcionalidades sem API
• Sincronização automática quando reconecta

NOTIFICAÇÕES PUSH:
━━━━━━━━━━━━━━━━━
Implementadas via Web Notifications API (não push server-side):
• Pedido de permissão na primeira sessão de foco completada
• Notificação quando timer de foco termina
• Notificação quando pausa termina
• Configurável nas definições (ativo/inativo + som)

Sons de notificação: configuração guardada no perfil do utilizador.

GESTOS TOUCH:
━━━━━━━━━━━━
Toda a navegação suporta touch nativo:
• onTouchStart / onTouchMove / onTouchEnd para swipes
• Feedback visual com transform translate durante arrasto
• Threshold de 60px para confirmar swipe
• Compatível com iOS Safari, Android Chrome, Samsung Internet

PERFORMANCE:
━━━━━━━━━━━
• Code splitting automático por rota (Vite lazy loading)
• Imagens otimizadas via CDN
• Fontes carregadas via Google Fonts com preconnect
• Animações em GPU (transform/opacity via Framer Motion)
• React Query evita re-fetches desnecessários
`
},
{
  id: "flows",
  icon: Server,
  color: "#F97316",
  title: "10. Fluxos de Dados Principais",
  content: `
FLUXO 1: Gravação e Análise de Reunião
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Utilizador prime botão → navigator.mediaDevices.getUserMedia({audio: true})
2. MediaRecorder grava chunks de áudio (formato: audio/webm)
3. Utilizador para gravação → Blob criado dos chunks
4. Core.UploadFile({file: audioBlob})
   → Áudio carregado para bucket Storage, retorna file_url
5. Core.TranscribeAudio({audio_url: file_url})
   → Edge Function chama Whisper, retorna string com transcrição
6. InvokeLLM({prompt: ..., response_json_schema: ...})
   → Edge Function chama GPT-4o, retorna {summary, action_items, deadlines, mind_map, title}
7. jsPDF gera PDF com todos os dados da análise
8. Core.UploadFile({file: pdfBlob})
   → PDF carregado para bucket Storage, retorna pdf_url
9. MeetingRecording.create({...análise, pdf_url, audio_duration_seconds})
   → Registo guardado na base de dados

FLUXO 2: Timer Pomodoro
━━━━━━━━━━━━━━━━━━━━━━━
1. FocusTimerContext mantém estado global em React Context
2. handlePlayPause() inicia setInterval de 1 segundo
3. Cada tick: remainingSeconds--
4. Quando remainingSeconds === 0: sessionCompleted = true
5. FocusPomo.jsx deteta sessionCompleted via useEffect
6. FocusSession.create({...}) — sessão registada
7. Notificação push enviada se permitido
8. completedOranges++ → OrangeCanvas anima nova laranja
9. advancePhase() → próxima fase (focus → shortBreak → longBreak)

FLUXO 3: Hábitos e Gamificação
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Habits.jsx carrega Habit.list() e HabitEntry.filter({date: today})
2. TetrisGrid renderiza hábitos como blocos coloridos
3. Utilizador toca num hábito → HabitEntry.create({habit_id, score, date})
4. Score é somado ao total diário
5. HabitsAnalytics agrega HabitEntry.list() por semana/hábito
6. HabitsRewards calcula streak: dias consecutivos com pelo menos 1 entrada
7. Conquistas desbloqueadas baseadas em thresholds de score/streak

FLUXO 4: TaskBoard Kanban
━━━━━━━━━━━━━━━━━━━━━━━━
1. Tarefas filtradas por week_start (formato: "yyyy-MM-dd")
2. Agrupadas por weekday em colunas (monday..sunday, none)
3. @hello-pangea/dnd gere drag-and-drop
4. onDragEnd: Task.update(id, {weekday: newColumn, order: newIndex})
5. Re-ordenação em batch: update order para cada tarefa na coluna
6. Tags guardadas como JSON string em tags_json (array serializado)

FLUXO 5: Controlo de Datas
━━━━━━━━━━━━━━━━━━━━━━━━━
1. Duas tabs: Prazos (Deadline) e Eventos (Event)
2. Prazos: uma data/hora limite — urgência calculada com differenceInDays
3. Eventos: start_datetime + end_datetime
   → Duração calculada: differenceInMinutes(end, start)
   → Formatada: X dias, Xh Ymin, Xmin
4. Filtros: upcoming (futuro/hoje) vs expired/passados
5. Cards com barra de cor no topo (accent visual)
`
},
{
  id: "analytics",
  icon: Layers,
  color: "#84CC16",
  title: "11. Analytics e Métricas",
  content: `
NOTA: a plataforma de backend anterior incluía um serviço de analytics de eventos
personalizados com dashboard próprio integrado. O Supabase não tem um equivalente
nativo direto; esta funcionalidade foi removida nesta migração e pode ser substituída
no futuro por uma ferramenta dedicada (PostHog, Plausible, etc.) caso seja necessário
voltar a rastrear eventos de produto.

FOCO ANALYTICS (FocusAnalytics.jsx):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Dados processados localmente a partir de FocusSession.list():

Métricas calculadas:
• sessionsToday: FocusSessions do dia atual
• sessionsThisWeek: FocusSessions dos últimos 7 dias
• totalHours: sum(duration_minutes) / 60
• currentStreak: dias consecutivos com pelo menos 1 sessão
• dailyData: array [{date, sessions, minutes}] para gráficos
• hourlyDist: distribuição por hora do dia (bar chart)
• tagDist: distribuição por tag/categoria (pie chart)

Bibliotecas de visualização: recharts
• AreaChart: tendência diária de sessões
• BarChart: distribuição por hora
• PieChart: distribuição por tags

HÁBITOS ANALYTICS (HabitsAnalytics.jsx):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Dados de HabitEntry.list():
• weeklyData: agrupado por semana (últimas 8 semanas)
• habitRanking: ordenado por frequência de completação
• totalScore: soma de todos os scores
• avgDailyScore: média diária
• bestHabit / worstHabit: ranking extremos

GAMIFICAÇÃO (HabitsRewards.jsx):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Conquistas com thresholds:
• 🌱 Primeira Semente: 1 hábito completado
• 🔥 Em Chamas: streak de 3 dias
• 💎 Diamante: 100 pontos totais
• 🏆 Campeão: 500 pontos totais
• ⚡ Relâmpago: streak de 7 dias
• 👑 Rei dos Hábitos: streak de 30 dias

Cálculo de streak: itera HabitEntry ordenadas por data,
conta dias consecutivos sem quebra.
`
},
{
  id: "deployment",
  icon: Globe,
  color: "#6366F1",
  title: "12. Deploy, Hosting e Configuração",
  content: `
PLATAFORMA DE HOSTING:
━━━━━━━━━━━━━━━━━━━━━
O backend (base de dados, auth, storage, realtime, edge functions) corre na
infraestrutura gerida da Supabase. O frontend (build estático Vite) pode ser
hospedado em qualquer plataforma de static hosting (Vercel, Netlify, Cloudflare Pages, etc.).

PROCESSO DE DEPLOY:
━━━━━━━━━━━━━━━━━━
1. Projeto Supabase criado/gerido via dashboard ou Supabase CLI
2. Migrations da base de dados aplicadas via SQL editor ou supabase CLI
3. Build do frontend: npm run build (Vite gera ficheiros estáticos em dist/)
4. Deploy do build estático na plataforma de hosting escolhida
5. Domínio personalizado: configurável na plataforma de hosting e/ou no projeto Supabase

VARIÁVEIS DE AMBIENTE:
━━━━━━━━━━━━━━━━━━━━
O cliente Supabase (src/api/supabaseClient.js) é inicializado com:
• VITE_SUPABASE_URL — URL do projeto Supabase
• VITE_SUPABASE_ANON_KEY — chave pública (anon) do projeto
Segredos de Edge Functions (chaves OpenAI, Resend) são geridos como secrets
do projeto Supabase, nunca expostos ao frontend.

BUILD TOOL:
━━━━━━━━━━
• Vite 5 — bundler ultrarrápido
• @vitejs/plugin-react — suporte JSX/Fast Refresh
• Hot Module Replacement (HMR) para desenvolvimento
• Tree-shaking automático
• Code splitting por rota

DEPENDÊNCIAS PRINCIPAIS:
━━━━━━━━━━━━━━━━━━━━━━━
react@18.2.0
react-router-dom@6.26.0
@supabase/supabase-js
@tanstack/react-query@5.84.1
framer-motion@11.16.4
@hello-pangea/dnd@17.0.0
tailwindcss (último)
lucide-react@0.475.0
date-fns@3.6.0
recharts@2.15.4
jspdf@4.2.1
react-markdown@9.0.1

LIMITES E QUOTAS (plano Supabase):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Registos por tabela: ilimitado (sujeito ao plano de base de dados)
• Storage: variável por plano (free tier com limite, planos pagos escaláveis)
• Edge Functions: número de invocações por plano
• Utilizadores de Auth: limite por plano (free tier generoso para projetos pequenos)
• Bandwidth: CDN incluído, com limites por plano

MONITORIZAÇÃO:
━━━━━━━━━━━━━
• Logs de Auth, Database e Edge Functions visíveis no dashboard Supabase
• Métricas de utilização (queries, storage, bandwidth) no dashboard
• Alertas de quota configuráveis por projeto
• Uptime e SLA dependentes do plano Supabase contratado
`
}];


function Section({ section, defaultOpen = false, "data-collection-item-id": __dataCollectionItemId }) {
  const [open, setOpen] = useState(defaultOpen);
  const Icon = section.icon;

  return (
    <div data-source-location="pages/ExportDocs:789:4" data-dynamic-content="true" className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden" data-collection-item-id={__dataCollectionItemId}>
      <button data-source-location="pages/ExportDocs:790:6" data-dynamic-content="true"
      onClick={() => setOpen(!open)}
      className="w-full flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
        
        <div data-source-location="pages/ExportDocs:794:8" data-dynamic-content="true" className="flex items-center gap-3">
          <div data-source-location="pages/ExportDocs:795:10" data-dynamic-content="true" className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: section.color + "15" }}>
            <Icon data-source-location="pages/ExportDocs:796:12" data-dynamic-content="true" className="w-4.5 h-4.5" style={{ color: section.color }} />
          </div>
          <span data-source-location="pages/ExportDocs:798:10" data-dynamic-content="true" className="text-sm font-bold text-foreground text-left" data-collection-item-field="title" data-collection-item-id={section?.id || section?._id}>{section.title}</span>
        </div>
        {open ? <ChevronUp data-source-location="pages/ExportDocs:800:16" data-dynamic-content="false" className="w-4 h-4 text-muted-foreground" /> : <ChevronDown data-source-location="pages/ExportDocs:800:74" data-dynamic-content="false" className="w-4 h-4 text-muted-foreground" />}
      </button>
      {open &&
      <motion.div data-source-location="pages/ExportDocs:803:8" data-dynamic-content="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="px-4 pb-4 border-t border-border">
          <pre data-source-location="pages/ExportDocs:805:10" data-dynamic-content="true" className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap font-mono mt-3 overflow-x-auto" data-collection-item-field="content" data-collection-item-id={section?.id || section?._id}>
            {section.content.trim()}
          </pre>
        </motion.div>
      }
    </div>);

}

export default function ExportDocs() {
  const [downloading, setDownloading] = useState(false);
  const [downloadingZip, setDownloadingZip] = useState(false);

  const downloadZip = async () => {
    setDownloadingZip(true);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();

      // Fetch a file from the Vite dev server and add to zip
      const addFetched = async (zipPath, url) => {
        try {
          const res = await fetch(url);
          if (res.ok) zip.file(zipPath, await res.text());
        } catch {}
      };

      // All source files to include (Vite serves these as raw text)
      const srcFiles = [
      // Root
      ["index.html", "/index.html"],
      ["index.css", "/src/index.css"],
      ["tailwind.config.js", "/tailwind.config.js"],
      ["vite.config.js", "/vite.config.js"],
      ["package.json", "/package.json"],
      // public/
      ["public/manifest.json", "/manifest.json"],
      // src root
      ["src/App.jsx", "/src/App.jsx"],
      ["src/main.jsx", "/src/main.jsx"],
      // src/api
      ["src/api/supabaseClient.js", "/src/api/supabaseClient.js"],
      ["src/api/entities.js", "/src/api/entities.js"],
      ["src/api/integrations.js", "/src/api/integrations.js"],
      ["src/api/auth.js", "/src/api/auth.js"],
      // src/lib
      ["src/lib/AuthContext.jsx", "/src/lib/AuthContext.jsx"],
      ["src/lib/query-client.js", "/src/lib/query-client.js"],
      ["src/lib/utils.js", "/src/lib/utils.js"],
      ["src/lib/pdfSections.js", "/src/lib/pdfSections.js"],
      ["src/lib/PageNotFound.jsx", "/src/lib/PageNotFound.jsx"],
      // src/context
      ["src/context/FocusTimerContext.jsx", "/src/context/FocusTimerContext.jsx"],
      // src/components
      ["src/components/ProtectedRoute.jsx", "/src/components/ProtectedRoute.jsx"],
      ["src/components/ScrollToTop.jsx", "/src/components/ScrollToTop.jsx"],
      ["src/components/FocusTimer.jsx", "/src/components/FocusTimer.jsx"],
      ["src/components/OrangeCanvas.jsx", "/src/components/OrangeCanvas.jsx"],
      ["src/components/TagPicker.jsx", "/src/components/TagPicker.jsx"],
      ["src/components/UserNotRegisteredError.jsx", "/src/components/UserNotRegisteredError.jsx"],
      ["src/components/AuthLayout.jsx", "/src/components/AuthLayout.jsx"],
      ["src/components/GoogleIcon.jsx", "/src/components/GoogleIcon.jsx"],
      ["src/components/habits/TetrisGrid.jsx", "/src/components/habits/TetrisGrid.jsx"],
      // src/pages
      ["src/pages/Home.jsx", "/src/pages/Home.jsx"],
      ["src/pages/Login.jsx", "/src/pages/Login.jsx"],
      ["src/pages/Register.jsx", "/src/pages/Register.jsx"],
      ["src/pages/ForgotPassword.jsx", "/src/pages/ForgotPassword.jsx"],
      ["src/pages/ResetPassword.jsx", "/src/pages/ResetPassword.jsx"],
      ["src/pages/FocusPomo.jsx", "/src/pages/FocusPomo.jsx"],
      ["src/pages/FocusSettings.jsx", "/src/pages/FocusSettings.jsx"],
      ["src/pages/FocusCalendar.jsx", "/src/pages/FocusCalendar.jsx"],
      ["src/pages/FocusAnalytics.jsx", "/src/pages/FocusAnalytics.jsx"],
      ["src/pages/TaskBoard.jsx", "/src/pages/TaskBoard.jsx"],
      ["src/pages/Habits.jsx", "/src/pages/Habits.jsx"],
      ["src/pages/HabitsManage.jsx", "/src/pages/HabitsManage.jsx"],
      ["src/pages/HabitsAnalytics.jsx", "/src/pages/HabitsAnalytics.jsx"],
      ["src/pages/HabitsRewards.jsx", "/src/pages/HabitsRewards.jsx"],
      ["src/pages/Deadlines.jsx", "/src/pages/Deadlines.jsx"],
      ["src/pages/MeetingAI.jsx", "/src/pages/MeetingAI.jsx"],
      ["src/pages/ComingSoon.jsx", "/src/pages/ComingSoon.jsx"],
      ["src/pages/ExportDocs.jsx", "/src/pages/ExportDocs.jsx"]];


      await Promise.all(srcFiles.map(([zipPath, url]) => addFetched(zipPath, url)));

      // ── entities/ — fetch actual JSON files ──────────────────────
      const entityNames = ["Task", "Tag", "FocusSession", "Habit", "HabitEntry", "Deadline", "Event", "MeetingRecording"];
      await Promise.all(entityNames.map((name) =>
      addFetched(`entities/${name}.json`, `/entities/${name}.json`)
      ));

      // ── README ───────────────────────────────────────────────────
      let md = "# FocusFlow — Documentação Técnica\n\n";
      md += `> Gerado em: ${new Date().toLocaleDateString("pt-PT")}\n\n`;
      md += "## Ficheiros incluídos no ZIP\n\n";
      md += "```\nfocusflow/\n├── index.html\n├── index.css\n├── tailwind.config.js\n├── vite.config.js\n├── package.json\n├── public/\n│   └── manifest.json\n├── entities/         # JSON Schemas (8 entidades)\n└── src/\n    ├── App.jsx\n    ├── main.jsx\n    ├── api/\n    ├── lib/\n    ├── context/\n    ├── components/\n    └── pages/         # 20 páginas\n```\n\n";
      SECTIONS.forEach((s) => {
        md += `## ${s.title}\n\n\`\`\`\n${s.content.trim()}\n\`\`\`\n\n---\n\n`;
      });
      zip.file("README.md", md);

      const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "FocusFlow_Source.zip";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
    setDownloadingZip(false);
  };

  const downloadPdf = async () => {
    setDownloading(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      const margin = 15;
      const pageW = 210;
      const pageH = 287;
      const textW = pageW - margin * 2;
      let y = 0;

      const checkPage = (needed = 8) => {
        if (y + needed > pageH - 10) {doc.addPage();y = 20;}
      };

      const addText = (text, size = 9, bold = false, color = [40, 40, 40], lineSpacing = 4.5) => {
        doc.setFontSize(size);
        doc.setFont("helvetica", bold ? "bold" : "normal");
        doc.setTextColor(...color);
        const lines = doc.splitTextToSize(text, textW);
        for (const line of lines) {
          checkPage(lineSpacing + 1);
          doc.text(line, margin, y);
          y += lineSpacing;
        }
      };

      const addSectionHeader = (title, color) => {
        checkPage(16);
        doc.setFillColor(...color);
        doc.rect(0, y - 5, pageW, 12, "F");
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(255, 255, 255);
        doc.text(title, margin, y + 3);
        y += 13;
      };

      const addDivider = () => {
        checkPage(5);
        doc.setDrawColor(220, 210, 200);
        doc.setLineWidth(0.3);
        doc.line(margin, y, pageW - margin, y);
        y += 4;
      };

      // ── CAPA ────────────────────────────────────────────────────
      doc.setFillColor(232, 122, 90);
      doc.rect(0, 0, pageW, 80, "F");
      doc.setFillColor(212, 105, 74);
      doc.rect(0, 70, pageW, 10, "F");

      // Emoji laranja area
      doc.setFillColor(255, 255, 255, 0.15);
      doc.roundedRect(pageW - 55, 15, 40, 40, 8, 8, "F");

      doc.setFontSize(32);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      doc.text("FocusFlow", margin, 35);

      doc.setFontSize(13);
      doc.setFont("helvetica", "normal");
      doc.text("Documentacao Tecnica Completa do Backend", margin, 48);

      doc.setFontSize(9);
      doc.setTextColor(255, 220, 200);
      doc.text("Arquitectura, APIs, Seguranca, Fluxos de Dados e Guia Educativo", margin, 58);
      doc.text("Como implementar o mesmo sistema com tecnologias open-source", margin, 65);

      doc.setFontSize(8);
      doc.setTextColor(255, 200, 180);
      doc.text("Gerado em: " + new Date().toLocaleDateString("pt-PT") + "  |  Versao 2.0  |  16 Seccoes  |  ~25 paginas", margin, 75);

      // Metadata boxes
      y = 95;
      const boxes = [
      { label: "Seccoes", value: String(PDF_SECTIONS.length), color: [232, 122, 90] },
      { label: "Entidades", value: "8", color: [139, 92, 246] },
      { label: "APIs", value: "20+", color: [59, 130, 246] },
      { label: "Paginas", value: "~25", color: [16, 185, 129] }];

      boxes.forEach((b, i) => {
        const bx = margin + i * 44;
        doc.setFillColor(...b.color);
        doc.roundedRect(bx, y, 40, 20, 4, 4, "F");
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(255, 255, 255);
        doc.text(b.value, bx + 20, y + 12, { align: "center" });
        doc.setFontSize(7);
        doc.setFont("helvetica", "normal");
        doc.text(b.label, bx + 20, y + 18, { align: "center" });
      });
      y += 30;
      addDivider();

      // ── INDICE ──────────────────────────────────────────────────
      addText("INDICE", 13, true, [232, 122, 90]);
      y += 2;
      PDF_SECTIONS.forEach((s, i) => {
        checkPage(5);
        const isEdu = s.title.includes("[EDUCATIVO]");
        doc.setFontSize(8);
        doc.setFont("helvetica", isEdu ? "italic" : "normal");
        doc.setTextColor(isEdu ? 20 : 50, isEdu ? 184 : 50, isEdu ? 166 : 50);
        doc.text(`${i + 1}.  ${s.title}`, margin + 3, y);
        y += 5;
      });
      y += 6;
      addDivider();

      // ── CONTEUDO ────────────────────────────────────────────────
      PDF_SECTIONS.forEach((section) => {
        doc.addPage();
        y = 15;
        addSectionHeader(section.title, section.color);
        y += 2;
        const lines = section.content.trim().split("\n");
        for (const line of lines) {
          const trimmed = line.trimEnd();
          if (trimmed === "") {y += 2;continue;}
          // Cabecalhos de subseccao (linhas que terminam em = ou -)
          if (/^[=]{3,}$/.test(trimmed) || /^[-]{3,}$/.test(trimmed)) {addDivider();continue;}
          if (trimmed.endsWith("=") && trimmed.startsWith("=") && trimmed.length > 6) {addDivider();continue;}
          // Linha de titulo (toda maiusculas ou termina com :)
          const isTitle = /^[A-Z][A-Z\s\-\/()]{8,}:?\s*$/.test(trimmed) || /^={2,}/.test(trimmed);
          const isCode = trimmed.startsWith("  ") || trimmed.startsWith("\t");
          const isComment = trimmed.startsWith("//") || trimmed.startsWith("#");

          if (isTitle && !isCode) {
            y += 2;
            addText(trimmed, 9, true, [section.color[0], section.color[1], section.color[2]]);
          } else if (isComment) {
            addText(trimmed, 7.5, false, [120, 140, 120], 4);
          } else if (isCode) {
            doc.setFillColor(248, 244, 240);
            doc.rect(margin, y - 3, textW, 5.5, "F");
            addText(trimmed, 7.5, false, [60, 60, 80], 4.5);
          } else if (trimmed.startsWith("•") || trimmed.startsWith("-") || trimmed.startsWith("*")) {
            addText(trimmed, 8.5, false, [50, 50, 60], 4.5);
          } else {
            addText(trimmed, 8.5, false, [40, 40, 50], 4.5);
          }
        }
      });

      // ── RODAPE EM TODAS AS PAGINAS ───────────────────────────────
      const totalPages = doc.getNumberOfPages();
      for (let p = 1; p <= totalPages; p++) {
        doc.setPage(p);
        doc.setFillColor(248, 244, 240);
        doc.rect(0, pageH - 8, pageW, 9, "F");
        doc.setFontSize(7);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(160, 140, 120);
        doc.text("FocusFlow — Documentacao Tecnica Completa do Backend", margin, pageH - 3);
        doc.text("Pagina " + p + " de " + totalPages, pageW - margin, pageH - 3, { align: "right" });
      }

      doc.save("FocusFlow_Backend_Docs_v2.pdf");
    } catch (e) {
      console.error(e);
    }
    setDownloading(false);
  };

  return (
    <div data-source-location="pages/ExportDocs:1087:4" data-dynamic-content="true" className="min-h-screen bg-cream">
      {/* Header */}
      <div data-source-location="pages/ExportDocs:1089:6" data-dynamic-content="true" className="bg-gradient-to-r from-[#E87A5A] to-[#D4694A] px-5 pt-12 pb-8">
        <div data-source-location="pages/ExportDocs:1090:8" data-dynamic-content="false" className="flex items-center gap-3 mb-4">
          <div data-source-location="pages/ExportDocs:1091:10" data-dynamic-content="false" className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <FileText data-source-location="pages/ExportDocs:1092:12" data-dynamic-content="false" className="w-6 h-6 text-white" />
          </div>
          <div data-source-location="pages/ExportDocs:1094:10" data-dynamic-content="false">
            <h1 data-source-location="pages/ExportDocs:1095:12" data-dynamic-content="false" className="text-2xl font-black text-white">FocusFlow Docs</h1>
            <p data-source-location="pages/ExportDocs:1096:12" data-dynamic-content="false" className="text-white/70 text-sm">Documentação técnica do backend</p>
          </div>
        </div>

        <motion.button data-source-location="pages/ExportDocs:1100:8" data-dynamic-content="true"
        onClick={downloadPdf}
        disabled={downloading}
        whileTap={{ scale: 0.97 }}
        className="w-full py-4 rounded-2xl bg-white text-[#E87A5A] font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-black/10 hover:bg-white/90 transition-all disabled:opacity-70">
          
          {downloading ?
          <>
              <RefreshCw data-source-location="pages/ExportDocs:1108:14" data-dynamic-content="false" className="w-4 h-4 animate-spin" /> A gerar PDF...
            </> :

          <>
              <Download data-source-location="pages/ExportDocs:1112:14" data-dynamic-content="false" className="w-5 h-5" /> Download PDF Completo ({PDF_SECTIONS.length} secções, ~25 pág.)
            </>
          }
        </motion.button>

        <motion.button data-source-location="pages/ExportDocs:1117:8" data-dynamic-content="true"
        onClick={downloadZip}
        disabled={downloadingZip}
        whileTap={{ scale: 0.97 }}
        className="w-full mt-3 py-3 rounded-2xl bg-white/20 text-white font-bold text-sm flex items-center justify-center gap-2 border border-white/30 hover:bg-white/30 transition-all disabled:opacity-70">
          
          {downloadingZip ?
          <><RefreshCw data-source-location="pages/ExportDocs:1124:14" data-dynamic-content="false" className="w-4 h-4 animate-spin" /> A gerar ZIP...</> :

          <><Archive data-source-location="pages/ExportDocs:1126:14" data-dynamic-content="false" className="w-4 h-4" /> Download ZIP (schemas + docs)</>
          }
        </motion.button>

        <p data-source-location="pages/ExportDocs:1130:8" data-dynamic-content="false" className="text-white/50 text-[11px] text-center mt-2">
          PDF detalhado com toda a documentação técnica da arquitetura, APIs e entidades
        </p>
      </div>

      {/* Stats */}
      <div data-source-location="pages/ExportDocs:1136:6" data-dynamic-content="true" className="px-5 py-4">
        <div data-source-location="pages/ExportDocs:1137:8" data-dynamic-content="true" className="grid grid-cols-3 gap-3 mb-4">
          {[
          { label: "Secções", value: PDF_SECTIONS.length, icon: "📖" },
          { label: "Entidades", value: "8", icon: "🗄️" },
          { label: "Páginas", value: "~25", icon: "📄" }].
          map((s) =>
          <div data-source-location="pages/ExportDocs:1143:12" data-dynamic-content="true" key={s.label} className="bg-white rounded-2xl p-3 border border-border text-center shadow-sm">
              <div data-source-location="pages/ExportDocs:1144:14" data-dynamic-content="true" className="text-xl mb-1" data-collection-item-field="icon" data-collection-item-id={s?.id || s?._id}>{s.icon}</div>
              <div data-source-location="pages/ExportDocs:1145:14" data-dynamic-content="true" className="text-lg font-black text-foreground" data-collection-item-field="value" data-collection-item-id={s?.id || s?._id}>{s.value}</div>
              <div data-source-location="pages/ExportDocs:1146:14" data-dynamic-content="true" className="text-[10px] text-muted-foreground" data-collection-item-field="label" data-collection-item-id={s?.id || s?._id}>{s.label}</div>
            </div>
          )}
        </div>
      </div>

      {/* Sections */}
      <div data-source-location="pages/ExportDocs:1153:6" data-dynamic-content="true" className="px-5 pb-12 space-y-2">
        {SECTIONS.map((s, i) =>
        <Section data-source-location="pages/ExportDocs:1155:10" data-dynamic-content="true" key={s.id} section={s} defaultOpen={i === 0} data-collection-item-id={s?.id} />
        )}
      </div>
    </div>);

}