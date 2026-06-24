# FocusGrid — Documentação Técnica

> Gerado em: 22/06/2026

## Ficheiros incluídos no ZIP

```
focusgrid/
├── index.html
├── index.css
├── tailwind.config.js
├── vite.config.js
├── package.json
├── public/
│   └── manifest.json
├── entities/         # JSON Schemas (8 entidades)
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── api/
    ├── lib/
    ├── context/
    ├── components/
    └── pages/         # 20 páginas
```

## 1. Visão Geral da Arquitetura

```
O FocusGrid é uma Progressive Web App (PWA) construída sobre a plataforma Base44, que fornece Backend-as-a-Service (BaaS) completo. A aplicação segue uma arquitetura de três camadas:

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
• Plataforma: Base44 BaaS
• Database: Gerida automaticamente pela Base44
• ORM: SDK Base44 (@base44/sdk)
• Autenticação: Base44 Auth (JWT + OAuth)
• File Storage: Base44 Storage (CDN global)

CAMADA DE INTEGRAÇÕES
━━━━━━━━━━━━━━━━━━━━
• LLM (Large Language Models): OpenAI GPT-4o-mini (default), Claude, Gemini
• Transcrição de Áudio: OpenAI Whisper
• Geração de Imagens: DALL-E 3
• Email: Resend (via Base44)
• Análise Web: Integração com Google Search
```

---

## 2. Entidades e Esquemas de Dados

```
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
```

---

## 3. SDK Base44 — API de Entidades

```
O SDK Base44 (@base44/sdk) é inicializado em src/api/base44Client.js e exporta o objeto 'base44'.

MÉTODOS CRUD DISPONÍVEIS PARA TODAS AS ENTIDADES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

base44.entities.<EntityName>.list(sort?, limit?)
  → Retorna array de todos os registos
  → sort: string ex. "-created_date" (- = descendente)
  → limit: número máximo de resultados (default: 50)
  → Ex: base44.entities.Task.list("-updated_date", 500)

base44.entities.<EntityName>.filter(query, sort?, limit?)
  → Filtra por condições específicas
  → query: objeto {campo: valor} ou operadores MongoDB-like
  → Ex: base44.entities.Task.filter({completed: false, week_start: "2024-01-01"})
  → Suporta: {$gte, $lte, $gt, $lt, $ne, $in}

base44.entities.<EntityName>.create(data)
  → Cria novo registo, retorna o objeto criado com id
  → Ex: base44.entities.Habit.create({name: "Exercício", score: 15})

base44.entities.<EntityName>.update(id, data)
  → Atualiza campos específicos (merge parcial)
  → Ex: base44.entities.Task.update(taskId, {completed: true})

base44.entities.<EntityName>.delete(id)
  → Remove permanentemente o registo
  → Ex: base44.entities.Deadline.delete(deadlineId)

base44.entities.<EntityName>.bulkCreate(array)
  → Cria múltiplos registos em batch
  → Ex: base44.entities.Tag.bulkCreate([{name:"A"}, {name:"B"}])

base44.entities.<EntityName>.schema()
  → Retorna o JSON Schema da entidade (sem campos built-in)

SUBSCRIPTIONS EM TEMPO REAL:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
const unsubscribe = base44.entities.Task.subscribe((event) => {
  // event.type: 'create' | 'update' | 'delete'
  // event.id: ID do registo afetado
  // event.data: dados atualizados
});
unsubscribe(); // cleanup

ENTIDADE USER (especial):
━━━━━━━━━━━━━━━━━━━━━━━━
A entidade User tem campos read-only: id, created_date, full_name, email
Campos editáveis incluem: role, e qualquer campo custom adicionado ao schema.
Campos custom usados nesta app:
• focus_min, short_break_min, long_break_min: configurações do timer
• orange_reset: frequência de reset das laranjas
• notifications_enabled: boolean
• notification_sound: string
• week_starts_on: 0 (domingo) ou 1 (segunda)
```

---

## 4. Sistema de Autenticação

```
A autenticação é gerida inteiramente pela Base44, eliminando a necessidade de implementar
lógica de auth no backend.

MÉTODOS DE AUTENTICAÇÃO:
━━━━━━━━━━━━━━━━━━━━━━━
base44.auth.loginViaEmailPassword(email, password)
  → Login com credenciais, auto-guarda JWT token
  → Em sucesso: window.location.href = '/' (hard redirect para reinicializar estado)

base44.auth.loginWithProvider(provider, fromUrl)
  → OAuth social: "google", "facebook", "microsoft", "apple"
  → Redireciona para o provider, retorna à app com token

base44.auth.register({email, password})
  → Regista novo utilizador, retorna pendente de verificação
  → NÃO faz login automático — requer verificação OTP

base44.auth.verifyOtp({email, otpCode})
  → Verifica email após registo
  → Em sucesso: chamar base44.auth.setToken(access_token), depois hard redirect

base44.auth.resendOtp(email) — reenvio do código

base44.auth.resetPasswordRequest(email) — envio de email de reset
base44.auth.resetPassword({resetToken, newPassword}) — reset com token do email

base44.auth.me() → Promise<User> — dados do utilizador atual
base44.auth.updateMe(data) → atualiza perfil do utilizador
base44.auth.isAuthenticated() → Promise<boolean>
base44.auth.logout(redirectUrl?) → termina sessão

PROTEÇÃO DE ROTAS:
━━━━━━━━━━━━━━━━━
O componente ProtectedRoute (src/components/ProtectedRoute.jsx) usa useAuth()
para verificar autenticação antes de renderizar a rota.
Não autenticado → redireciona para /login
A carga é feita via AuthProvider (src/lib/AuthContext.jsx) que envolve toda a app.

TOKENS JWT:
━━━━━━━━━━
Tokens são armazenados de forma segura pela plataforma.
Cada request ao SDK inclui automaticamente o token no header Authorization.
A renovação automática de tokens é gerida pelo SDK.

REGRAS DE SEGURANÇA (RLS):
━━━━━━━━━━━━━━━━━━━━━━━━━
Por default, utilizadores apenas acedem aos seus próprios dados (created_by_id = user.id).
Admins podem aceder a todos os dados.
A entidade User tem regras especiais: admin pode listar/editar todos os users,
user regular apenas vê e edita o próprio perfil.
```

---

## 5. Integrações — Core Package

```
As integrações são acedidas via base44.integrations.Core.<Endpoint>(params).
Todas as chamadas são autenticadas e faturadas em créditos de integração.

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
Upload de ficheiros para o storage da Base44.

• file: Blob/File — ficheiro a carregar
• Retorna: {file_url: string} — URL público permanente
• CDN global para distribuição rápida
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
```

---

## 6. Sistema de Routing e Navegação

```
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
```

---

## 7. Arquitetura Frontend — Componentes

```
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
│   └── base44Client.js — Instância SDK
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
```

---

## 8. Segurança e Regras de Acesso

```
AUTENTICAÇÃO E AUTORIZAÇÃO:
━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Todos os endpoints da API requerem autenticação via JWT Bearer token
2. Tokens são gerados pela Base44 com expiração e rotação automática
3. HTTPS obrigatório — a plataforma não aceita conexões não encriptadas

ROW-LEVEL SECURITY (RLS):
━━━━━━━━━━━━━━━━━━━━━━━━
Por default (sem configuração manual), cada utilizador apenas:
• LISTA apenas os registos onde created_by_id = user.id
• CRIA registos com created_by_id = user.id automaticamente
• ATUALIZA apenas os seus próprios registos
• ELIMINA apenas os seus próprios registos

Exceções:
• Utilizadores com role="admin" têm acesso a TODOS os registos
• A entidade User tem RLS especial: admin acessa todos, user apenas o próprio

VALIDAÇÃO DE DADOS:
━━━━━━━━━━━━━━━━━━
• Campos "required" no JSON Schema são validados no servidor
• Tipos de dados são verificados (string, number, boolean, etc.)
• Campos enum são validados contra os valores permitidos
• Injeção de SQL não é possível (ORM gerido pela Base44)

PROTEÇÃO CSRF:
━━━━━━━━━━━━━
• Tokens CSRF são geridos automaticamente pelo SDK
• SameSite cookies com flag Secure
• Origin validation nos requests

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
```

---

## 9. Progressive Web App (PWA)

```
O FocusGrid é distribuído como PWA, permitindo instalação em dispositivos móveis
e desktop sem necessidade de app stores.

MANIFEST (public/manifest.json):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{
  "name": "FocusGrid",
  "short_name": "FocusGrid",
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
```

---

## 10. Fluxos de Dados Principais

```
FLUXO 1: Gravação e Análise de Reunião
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Utilizador prime botão → navigator.mediaDevices.getUserMedia({audio: true})
2. MediaRecorder grava chunks de áudio (formato: audio/webm)
3. Utilizador para gravação → Blob criado dos chunks
4. base44.integrations.Core.UploadFile({file: audioBlob})
   → Áudio carregado para CDN, retorna file_url
5. base44.integrations.Core.TranscribeAudio({audio_url: file_url})
   → Whisper processa áudio, retorna string com transcrição
6. base44.integrations.Core.InvokeLLM({prompt: ..., response_json_schema: ...})
   → GPT-4o analisa transcrição, retorna {summary, action_items, deadlines, mind_map, title}
7. jsPDF gera PDF com todos os dados da análise
8. base44.integrations.Core.UploadFile({file: pdfBlob})
   → PDF carregado para CDN, retorna pdf_url
9. base44.entities.MeetingRecording.create({...análise, pdf_url, audio_duration_seconds})
   → Registo guardado na base de dados

FLUXO 2: Timer Pomodoro
━━━━━━━━━━━━━━━━━━━━━━━
1. FocusTimerContext mantém estado global em React Context
2. handlePlayPause() inicia setInterval de 1 segundo
3. Cada tick: remainingSeconds--
4. Quando remainingSeconds === 0: sessionCompleted = true
5. FocusPomo.jsx deteta sessionCompleted via useEffect
6. base44.entities.FocusSession.create({...}) — sessão registada
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
```

---

## 11. Analytics e Métricas

```
ANALYTICS INTEGRADO (Base44):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
A app usa base44.analytics.track() para rastrear eventos personalizados.
Os dados são visíveis no dashboard da Base44.

API:
base44.analytics.track({
  eventName: string,
  properties?: Record<string, string | number | boolean | null>
})

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
```

---

## 12. Deploy, Hosting e Configuração

```
PLATAFORMA DE HOSTING:
━━━━━━━━━━━━━━━━━━━━━
O FocusGrid é hospedado inteiramente na infraestrutura Base44.
Não requer configuração de servidores, CI/CD, ou gestão de infraestrutura.

PROCESSO DE DEPLOY:
━━━━━━━━━━━━━━━━━━
1. Código editado no editor Base44 (browser-based)
2. Build automático via Vite ao guardar alterações
3. Preview em tempo real no painel direito
4. Publicação: um clique no dashboard Base44
5. URL automático: *.base44.app
6. Domínio personalizado: configurável nas definições da app

VARIÁVEIS DE AMBIENTE:
━━━━━━━━━━━━━━━━━━━━
Não são necessárias variáveis de ambiente manuais.
O SDK Base44 é configurado automaticamente com as credenciais da app.
Segredos são geridos pela plataforma (Secrets Manager integrado).

BUILD TOOL:
━━━━━━━━━━
• Vite 5 — bundler ultrarrápido
• @base44/vite-plugin — integração com o runtime Base44
• Hot Module Replacement (HMR) para desenvolvimento
• Tree-shaking automático
• Code splitting por rota

DEPENDÊNCIAS PRINCIPAIS:
━━━━━━━━━━━━━━━━━━━━━━━
react@18.2.0
react-router-dom@6.26.0
@tanstack/react-query@5.84.1
framer-motion@11.16.4
@hello-pangea/dnd@17.0.0
tailwindcss (último)
lucide-react@0.475.0
date-fns@3.6.0
recharts@2.15.4
jspdf@4.2.1
react-markdown@9.0.1

LIMITES E QUOTAS (plano Base44):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Registos por entidade: ilimitado (plano pago)
• Storage: variável por plano
• Créditos de integração: renovados mensalmente
• Utilizadores simultâneos: sem limite
• Bandwidth: CDN global sem limite no plano pago

MONITORIZAÇÃO:
━━━━━━━━━━━━━
• Logs de erro visíveis no dashboard Base44
• Analytics de utilização integrado
• Alertas de quota de créditos configuráveis
• Uptime garantido pelo SLA Base44 (99.9%)
```

---

