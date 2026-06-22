import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/ExportDocs.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/pages/ExportDocs.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=fc940917"; const useState = __vite__cjsImport3_react["useState"];
import { motion } from "/node_modules/.vite/deps/framer-motion.js?v=fc940917";
import { PDF_SECTIONS } from "/src/lib/pdfSections.js";
import { Download, FileText, Code, Server, Database, Shield, Zap, Globe, Layers, GitBranch, Lock, RefreshCw, ChevronDown, ChevronUp, Archive } from "/node_modules/.vite/deps/lucide-react.js?v=aefa7968";
const SECTIONS = [
  {
    id: "overview",
    icon: Layers,
    color: "#E87A5A",
    title: "1. Visão Geral da Arquitetura",
    content: `
O FocusFlow é uma Progressive Web App (PWA) construída sobre a plataforma Base44, que fornece Backend-as-a-Service (BaaS) completo. A aplicação segue uma arquitetura de três camadas:

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
    title: "3. SDK Base44 — API de Entidades",
    content: `
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
`
  },
  {
    id: "auth",
    icon: Shield,
    color: "#10B981",
    title: "4. Sistema de Autenticação",
    content: `
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
`
  },
  {
    id: "integrations",
    icon: Zap,
    color: "#F59E0B",
    title: "5. Integrações — Core Package",
    content: `
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
`
  },
  {
    id: "analytics",
    icon: Layers,
    color: "#84CC16",
    title: "11. Analytics e Métricas",
    content: `
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
O FocusFlow é hospedado inteiramente na infraestrutura Base44.
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
`
  }
];
function Section({ section, defaultOpen = false, "data-collection-item-id": __dataCollectionItemId }) {
  _s();
  const [open, setOpen] = useState(defaultOpen);
  const Icon = section.icon;
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ExportDocs:789:4", "data-dynamic-content": "true", className: "bg-white rounded-2xl border border-border shadow-sm overflow-hidden", "data-collection-item-id": __dataCollectionItemId, children: [
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        "data-source-location": "pages/ExportDocs:790:6",
        "data-dynamic-content": "true",
        onClick: () => setOpen(!open),
        className: "w-full flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors",
        children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ExportDocs:794:8", "data-dynamic-content": "true", className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ExportDocs:795:10", "data-dynamic-content": "true", className: "w-9 h-9 rounded-xl flex items-center justify-center", style: { backgroundColor: section.color + "15" }, children: /* @__PURE__ */ jsxDEV(Icon, { "data-source-location": "pages/ExportDocs:796:12", "data-dynamic-content": "true", className: "w-4.5 h-4.5", style: { color: section.color } }, void 0, false, {
              fileName: "/app/src/pages/ExportDocs.jsx",
              lineNumber: 815,
              columnNumber: 13
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/ExportDocs.jsx",
              lineNumber: 814,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/ExportDocs:798:10", "data-dynamic-content": "true", className: "text-sm font-bold text-foreground text-left", "data-collection-item-field": "title", "data-collection-item-id": section?.id || section?._id, children: section.title }, void 0, false, {
              fileName: "/app/src/pages/ExportDocs.jsx",
              lineNumber: 817,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/ExportDocs.jsx",
            lineNumber: 813,
            columnNumber: 9
          }, this),
          open ? /* @__PURE__ */ jsxDEV(ChevronUp, { "data-source-location": "pages/ExportDocs:800:16", "data-dynamic-content": "false", className: "w-4 h-4 text-muted-foreground" }, void 0, false, {
            fileName: "/app/src/pages/ExportDocs.jsx",
            lineNumber: 819,
            columnNumber: 17
          }, this) : /* @__PURE__ */ jsxDEV(ChevronDown, { "data-source-location": "pages/ExportDocs:800:74", "data-dynamic-content": "false", className: "w-4 h-4 text-muted-foreground" }, void 0, false, {
            fileName: "/app/src/pages/ExportDocs.jsx",
            lineNumber: 819,
            columnNumber: 151
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/src/pages/ExportDocs.jsx",
        lineNumber: 809,
        columnNumber: 7
      },
      this
    ),
    open && /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        "data-source-location": "pages/ExportDocs:803:8",
        "data-dynamic-content": "true",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "px-4 pb-4 border-t border-border",
        children: /* @__PURE__ */ jsxDEV("pre", { "data-source-location": "pages/ExportDocs:805:10", "data-dynamic-content": "true", className: "text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap font-mono mt-3 overflow-x-auto", "data-collection-item-field": "content", "data-collection-item-id": section?.id || section?._id, children: section.content.trim() }, void 0, false, {
          fileName: "/app/src/pages/ExportDocs.jsx",
          lineNumber: 824,
          columnNumber: 11
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/app/src/pages/ExportDocs.jsx",
        lineNumber: 822,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/src/pages/ExportDocs.jsx",
    lineNumber: 808,
    columnNumber: 5
  }, this);
}
_s(Section, "pG0khZI24VrkSmCZcWM9qqrVMh4=");
_c = Section;
export default function ExportDocs() {
  _s2();
  const [downloading, setDownloading] = useState(false);
  const [downloadingZip, setDownloadingZip] = useState(false);
  const downloadZip = async () => {
    setDownloadingZip(true);
    try {
      const JSZip = (await import('/node_modules/.vite/deps/jszip.js?v=cf31348d').then(m => ((m) => m?.__esModule ? m : { ...typeof m === "object" && !Array.isArray(m) || typeof m === "function" ? m : {}, default: m })(m.default))).default;
      const zip = new JSZip();
      const addFetched = async (zipPath, url2) => {
        try {
          const res = await fetch(url2);
          if (res.ok) zip.file(zipPath, await res.text());
        } catch {
        }
      };
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
        ["src/api/base44Client.js", "/src/api/base44Client.js"],
        // src/lib
        ["src/lib/AuthContext.jsx", "/src/lib/AuthContext.jsx"],
        ["src/lib/query-client.js", "/src/lib/query-client.js"],
        ["src/lib/utils.js", "/src/lib/utils.js"],
        ["src/lib/pdfSections.js", "/src/lib/pdfSections.js"],
        ["src/lib/app-params.js", "/src/lib/app-params.js"],
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
        ["src/pages/ExportDocs.jsx", "/src/pages/ExportDocs.jsx"]
      ];
      await Promise.all(srcFiles.map(([zipPath, url2]) => addFetched(zipPath, url2)));
      const entityNames = ["Task", "Tag", "FocusSession", "Habit", "HabitEntry", "Deadline", "Event", "MeetingRecording"];
      await Promise.all(entityNames.map(
        (name) => addFetched(`entities/${name}.json`, `/entities/${name}.json`)
      ));
      let md = "# FocusFlow — Documentação Técnica\n\n";
      md += `> Gerado em: ${(/* @__PURE__ */ new Date()).toLocaleDateString("pt-PT")}

`;
      md += "## Ficheiros incluídos no ZIP\n\n";
      md += "```\nfocusflow/\n├── index.html\n├── index.css\n├── tailwind.config.js\n├── vite.config.js\n├── package.json\n├── public/\n│   └── manifest.json\n├── entities/         # JSON Schemas (8 entidades)\n└── src/\n    ├── App.jsx\n    ├── main.jsx\n    ├── api/\n    ├── lib/\n    ├── context/\n    ├── components/\n    └── pages/         # 20 páginas\n```\n\n";
      SECTIONS.forEach((s) => {
        md += `## ${s.title}

\`\`\`
${s.content.trim()}
\`\`\`

---

`;
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
      const { jsPDF } = await import("/node_modules/.vite/deps/jspdf.js?v=954d0f89");
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const margin = 15;
      const pageW = 210;
      const pageH = 287;
      const textW = pageW - margin * 2;
      let y = 0;
      const checkPage = (needed = 8) => {
        if (y + needed > pageH - 10) {
          doc.addPage();
          y = 20;
        }
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
      doc.setFillColor(232, 122, 90);
      doc.rect(0, 0, pageW, 80, "F");
      doc.setFillColor(212, 105, 74);
      doc.rect(0, 70, pageW, 10, "F");
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
      doc.text("Gerado em: " + (/* @__PURE__ */ new Date()).toLocaleDateString("pt-PT") + "  |  Versao 2.0  |  16 Seccoes  |  ~25 paginas", margin, 75);
      y = 95;
      const boxes = [
        { label: "Seccoes", value: String(PDF_SECTIONS.length), color: [232, 122, 90] },
        { label: "Entidades", value: "8", color: [139, 92, 246] },
        { label: "APIs", value: "20+", color: [59, 130, 246] },
        { label: "Paginas", value: "~25", color: [16, 185, 129] }
      ];
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
      PDF_SECTIONS.forEach((section) => {
        doc.addPage();
        y = 15;
        addSectionHeader(section.title, section.color);
        y += 2;
        const lines = section.content.trim().split("\n");
        for (const line of lines) {
          const trimmed = line.trimEnd();
          if (trimmed === "") {
            y += 2;
            continue;
          }
          if (/^[=]{3,}$/.test(trimmed) || /^[-]{3,}$/.test(trimmed)) {
            addDivider();
            continue;
          }
          if (trimmed.endsWith("=") && trimmed.startsWith("=") && trimmed.length > 6) {
            addDivider();
            continue;
          }
          const isTitle = /^[A-Z][A-Z\s\-\/()]{8,}:?\s*$/.test(trimmed) || /^={2,}/.test(trimmed);
          const isCode = trimmed.startsWith("  ") || trimmed.startsWith("	");
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
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ExportDocs:1087:4", "data-dynamic-content": "true", className: "min-h-screen bg-cream", children: [
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ExportDocs:1089:6", "data-dynamic-content": "true", className: "bg-gradient-to-r from-[#E87A5A] to-[#D4694A] px-5 pt-12 pb-8", children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ExportDocs:1090:8", "data-dynamic-content": "false", className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ExportDocs:1091:10", "data-dynamic-content": "false", className: "w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV(FileText, { "data-source-location": "pages/ExportDocs:1092:12", "data-dynamic-content": "false", className: "w-6 h-6 text-white" }, void 0, false, {
          fileName: "/app/src/pages/ExportDocs.jsx",
          lineNumber: 1111,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/src/pages/ExportDocs.jsx",
          lineNumber: 1110,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ExportDocs:1094:10", "data-dynamic-content": "false", children: [
          /* @__PURE__ */ jsxDEV("h1", { "data-source-location": "pages/ExportDocs:1095:12", "data-dynamic-content": "false", className: "text-2xl font-black text-white", children: "FocusFlow Docs" }, void 0, false, {
            fileName: "/app/src/pages/ExportDocs.jsx",
            lineNumber: 1114,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/ExportDocs:1096:12", "data-dynamic-content": "false", className: "text-white/70 text-sm", children: "Documentação técnica do backend" }, void 0, false, {
            fileName: "/app/src/pages/ExportDocs.jsx",
            lineNumber: 1115,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/ExportDocs.jsx",
          lineNumber: 1113,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/pages/ExportDocs.jsx",
        lineNumber: 1109,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(
        motion.button,
        {
          "data-source-location": "pages/ExportDocs:1100:8",
          "data-dynamic-content": "true",
          onClick: downloadPdf,
          disabled: downloading,
          whileTap: { scale: 0.97 },
          className: "w-full py-4 rounded-2xl bg-white text-[#E87A5A] font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-black/10 hover:bg-white/90 transition-all disabled:opacity-70",
          children: downloading ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
            /* @__PURE__ */ jsxDEV(RefreshCw, { "data-source-location": "pages/ExportDocs:1108:14", "data-dynamic-content": "false", className: "w-4 h-4 animate-spin" }, void 0, false, {
              fileName: "/app/src/pages/ExportDocs.jsx",
              lineNumber: 1127,
              columnNumber: 15
            }, this),
            " A gerar PDF..."
          ] }, void 0, true, {
            fileName: "/app/src/pages/ExportDocs.jsx",
            lineNumber: 1126,
            columnNumber: 11
          }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
            /* @__PURE__ */ jsxDEV(Download, { "data-source-location": "pages/ExportDocs:1112:14", "data-dynamic-content": "false", className: "w-5 h-5" }, void 0, false, {
              fileName: "/app/src/pages/ExportDocs.jsx",
              lineNumber: 1131,
              columnNumber: 15
            }, this),
            " Download PDF Completo (",
            PDF_SECTIONS.length,
            " secções, ~25 pág.)"
          ] }, void 0, true, {
            fileName: "/app/src/pages/ExportDocs.jsx",
            lineNumber: 1130,
            columnNumber: 11
          }, this)
        },
        void 0,
        false,
        {
          fileName: "/app/src/pages/ExportDocs.jsx",
          lineNumber: 1119,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        motion.button,
        {
          "data-source-location": "pages/ExportDocs:1117:8",
          "data-dynamic-content": "true",
          onClick: downloadZip,
          disabled: downloadingZip,
          whileTap: { scale: 0.97 },
          className: "w-full mt-3 py-3 rounded-2xl bg-white/20 text-white font-bold text-sm flex items-center justify-center gap-2 border border-white/30 hover:bg-white/30 transition-all disabled:opacity-70",
          children: downloadingZip ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
            /* @__PURE__ */ jsxDEV(RefreshCw, { "data-source-location": "pages/ExportDocs:1124:14", "data-dynamic-content": "false", className: "w-4 h-4 animate-spin" }, void 0, false, {
              fileName: "/app/src/pages/ExportDocs.jsx",
              lineNumber: 1143,
              columnNumber: 13
            }, this),
            " A gerar ZIP..."
          ] }, void 0, true, {
            fileName: "/app/src/pages/ExportDocs.jsx",
            lineNumber: 1143,
            columnNumber: 11
          }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
            /* @__PURE__ */ jsxDEV(Archive, { "data-source-location": "pages/ExportDocs:1126:14", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/src/pages/ExportDocs.jsx",
              lineNumber: 1145,
              columnNumber: 13
            }, this),
            " Download ZIP (schemas + docs)"
          ] }, void 0, true, {
            fileName: "/app/src/pages/ExportDocs.jsx",
            lineNumber: 1145,
            columnNumber: 11
          }, this)
        },
        void 0,
        false,
        {
          fileName: "/app/src/pages/ExportDocs.jsx",
          lineNumber: 1136,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/ExportDocs:1130:8", "data-dynamic-content": "false", className: "text-white/50 text-[11px] text-center mt-2", children: "PDF detalhado com toda a documentação técnica da arquitetura, APIs e entidades" }, void 0, false, {
        fileName: "/app/src/pages/ExportDocs.jsx",
        lineNumber: 1149,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/pages/ExportDocs.jsx",
      lineNumber: 1108,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ExportDocs:1136:6", "data-dynamic-content": "true", className: "px-5 py-4", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ExportDocs:1137:8", "data-dynamic-content": "true", className: "grid grid-cols-3 gap-3 mb-4", children: [
      { label: "Secções", value: PDF_SECTIONS.length, icon: "📖" },
      { label: "Entidades", value: "8", icon: "🗄️" },
      { label: "Páginas", value: "~25", icon: "📄" }
    ].map(
      (s) => /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ExportDocs:1143:12", "data-dynamic-content": "true", className: "bg-white rounded-2xl p-3 border border-border text-center shadow-sm", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ExportDocs:1144:14", "data-dynamic-content": "true", className: "text-xl mb-1", "data-collection-item-field": "icon", "data-collection-item-id": s?.id || s?._id, children: s.icon }, void 0, false, {
          fileName: "/app/src/pages/ExportDocs.jsx",
          lineNumber: 1163,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ExportDocs:1145:14", "data-dynamic-content": "true", className: "text-lg font-black text-foreground", "data-collection-item-field": "value", "data-collection-item-id": s?.id || s?._id, children: s.value }, void 0, false, {
          fileName: "/app/src/pages/ExportDocs.jsx",
          lineNumber: 1164,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ExportDocs:1146:14", "data-dynamic-content": "true", className: "text-[10px] text-muted-foreground", "data-collection-item-field": "label", "data-collection-item-id": s?.id || s?._id, children: s.label }, void 0, false, {
          fileName: "/app/src/pages/ExportDocs.jsx",
          lineNumber: 1165,
          columnNumber: 15
        }, this)
      ] }, s.label, true, {
        fileName: "/app/src/pages/ExportDocs.jsx",
        lineNumber: 1162,
        columnNumber: 11
      }, this)
    ) }, void 0, false, {
      fileName: "/app/src/pages/ExportDocs.jsx",
      lineNumber: 1156,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/src/pages/ExportDocs.jsx",
      lineNumber: 1155,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ExportDocs:1153:6", "data-dynamic-content": "true", className: "px-5 pb-12 space-y-2", children: SECTIONS.map(
      (s, i) => /* @__PURE__ */ jsxDEV(Section, { "data-source-location": "pages/ExportDocs:1155:10", "data-dynamic-content": "true", section: s, defaultOpen: i === 0, "data-collection-item-id": s?.id }, s.id, false, {
        fileName: "/app/src/pages/ExportDocs.jsx",
        lineNumber: 1174,
        columnNumber: 9
      }, this)
    ) }, void 0, false, {
      fileName: "/app/src/pages/ExportDocs.jsx",
      lineNumber: 1172,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/pages/ExportDocs.jsx",
    lineNumber: 1106,
    columnNumber: 5
  }, this);
}
_s2(ExportDocs, "Dkyta805sgwYoOaqI4lRxxaLtO0=");
_c2 = ExportDocs;
var _c, _c2;
$RefreshReg$(_c, "Section");
$RefreshReg$(_c2, "ExportDocs");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/pages/ExportDocs.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/pages/ExportDocs.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QSxJQUNOWSxPQUFPO0FBQUEsSUFDUEMsT0FBTztBQUFBLElBQ1BDLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUEwRlg7QUFBQSxFQUNBO0FBQUEsSUFDRUosSUFBSTtBQUFBLElBQ0pDLE1BQU1WO0FBQUFBLElBQ05XLE9BQU87QUFBQSxJQUNQQyxPQUFPO0FBQUEsSUFDUEMsU0FBUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBOENYO0FBQUEsRUFDQTtBQUFBLElBQ0VKLElBQUk7QUFBQSxJQUNKQyxNQUFNUjtBQUFBQSxJQUNOUyxPQUFPO0FBQUEsSUFDUEMsT0FBTztBQUFBLElBQ1BDLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFxRVg7QUFBQSxFQUNBO0FBQUEsSUFDRUosSUFBSTtBQUFBLElBQ0pDLE1BQU1QO0FBQUFBLElBQ05RLE9BQU87QUFBQSxJQUNQQyxPQUFPO0FBQUEsSUFDUEMsU0FBUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQW1EWDtBQUFBLEVBQ0E7QUFBQSxJQUNFSixJQUFJO0FBQUEsSUFDSkMsTUFBTU47QUFBQUEsSUFDTk8sT0FBTztBQUFBLElBQ1BDLE9BQU87QUFBQSxJQUNQQyxTQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQXFEWDtBQUFBLEVBQ0E7QUFBQSxJQUNFSixJQUFJO0FBQUEsSUFDSkMsTUFBTWQ7QUFBQUEsSUFDTmUsT0FBTztBQUFBLElBQ1BDLE9BQU87QUFBQSxJQUNQQyxTQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQTJEWDtBQUFBLEVBQ0E7QUFBQSxJQUNFSixJQUFJO0FBQUEsSUFDSkMsTUFBTVQ7QUFBQUEsSUFDTlUsT0FBTztBQUFBLElBQ1BDLE9BQU87QUFBQSxJQUNQQyxTQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FB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T0F0RUY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQXVFQTtBQUVKO0FBQUNrQixJQTFWdUJELFlBQVU7QUFBQSxNQUFWQTtBQUFVLElBQUF3RyxJQUFBQztBQUFBLGFBQUFELElBQUE7QUFBQSxhQUFBQyxLQUFBIiwibmFtZXMiOlsidXNlU3RhdGUiLCJtb3Rpb24iLCJQREZfU0VDVElPTlMiLCJEb3dubG9hZCIsIkZpbGVUZXh0IiwiQ29kZSIsIlNlcnZlciIsIkRhdGFiYXNlIiwiU2hpZWxkIiwiWmFwIiwiR2xvYmUiLCJMYXllcnMiLCJHaXRCcmFuY2giLCJMb2NrIiwiUmVmcmVzaEN3IiwiQ2hldnJvbkRvd24iLCJDaGV2cm9uVXAiLCJBcmNoaXZlIiwiU0VDVElPTlMiLCJpZCIsImljb24iLCJjb2xvciIsInRpdGxlIiwiY29udGVudCIsIlNlY3Rpb24iLCJzZWN0aW9uIiwiZGVmYXVsdE9wZW4iLCJfX2RhdGFDb2xsZWN0aW9uSXRlbUlkIiwiX3MiLCJvcGVuIiwic2V0T3BlbiIsIkljb24iLCJiYWNrZ3JvdW5kQ29sb3IiLCJfaWQiLCJvcGFjaXR5IiwidHJpbSIsIkV4cG9ydERvY3MiLCJfczIiLCJkb3dubG9hZGluZyIsInNldERvd25sb2FkaW5nIiwiZG93bmxvYWRpbmdaaXAiLCJzZXREb3dubG9hZGluZ1ppcCIsImRvd25sb2FkWmlwIiwiSlNaaXAiLCJkZWZhdWx0IiwiemlwIiwiYWRkRmV0Y2hlZCIsInppcFBhdGgiLCJ1cmwiLCJyZXMiLCJmZXRjaCIsIm9rIiwiZmlsZSIsInRleHQiLCJzcmNGaWxlcyIsIlByb21pc2UiLCJhbGwiLCJtYXAiLCJlbnRpdHlOYW1lcyIsIm5hbWUiLCJtZCIsIkRhdGUiLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJmb3JFYWNoIiwicyIsImJsb2IiLCJnZW5lcmF0ZUFzeW5jIiwidHlwZSIsImNvbXByZXNzaW9uIiwiY29tcHJlc3Npb25PcHRpb25zIiwibGV2ZWwiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJhIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaHJlZiIsImRvd25sb2FkIiwiY2xpY2siLCJyZXZva2VPYmplY3RVUkwiLCJlIiwiY29uc29sZSIsImVycm9yIiwiZG93bmxvYWRQZGYiLCJqc1BERiIsImRvYyIsIm9yaWVudGF0aW9uIiwidW5pdCIsImZvcm1hdCIsIm1hcmdpbiIsInBhZ2VXIiwicGFnZUgiLCJ0ZXh0VyIsInkiLCJjaGVja1BhZ2UiLCJuZWVkZWQiLCJhZGRQYWdlIiwiYWRkVGV4dCIsInNpemUiLCJib2xkIiwibGluZVNwYWNpbmciLCJzZXRGb250U2l6ZSIsInNldEZvbnQiLCJzZXRUZXh0Q29sb3IiLCJsaW5lcyIsInNwbGl0VGV4dFRvU2l6ZSIsImxpbmUiLCJhZGRTZWN0aW9uSGVhZGVyIiwic2V0RmlsbENvbG9yIiwicmVjdCIsImFkZERpdmlkZXIiLCJzZXREcmF3Q29sb3IiLCJzZXRMaW5lV2lkdGgiLCJyb3VuZGVkUmVjdCIsImJveGVzIiwibGFiZWwiLCJ2YWx1ZSIsIlN0cmluZyIsImxlbmd0aCIsImIiLCJpIiwiYngiLCJhbGlnbiIsImlzRWR1IiwiaW5jbHVkZXMiLCJzcGxpdCIsInRyaW1tZWQiLCJ0cmltRW5kIiwidGVzdCIsImVuZHNXaXRoIiwic3RhcnRzV2l0aCIsImlzVGl0bGUiLCJpc0NvZGUiLCJpc0NvbW1lbnQiLCJ0b3RhbFBhZ2VzIiwiZ2V0TnVtYmVyT2ZQYWdlcyIsInAiLCJzZXRQYWdlIiwic2F2ZSIsInNjYWxlIiwiX2MiLCJfYzIiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiRXhwb3J0RG9jcy5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IG1vdGlvbiB9IGZyb20gXCJmcmFtZXItbW90aW9uXCI7XG5pbXBvcnQgeyBQREZfU0VDVElPTlMgfSBmcm9tIFwiQC9saWIvcGRmU2VjdGlvbnNcIjtcbmltcG9ydCB7IERvd25sb2FkLCBGaWxlVGV4dCwgQ29kZSwgU2VydmVyLCBEYXRhYmFzZSwgU2hpZWxkLCBaYXAsIEdsb2JlLCBMYXllcnMsIEdpdEJyYW5jaCwgTG9jaywgUmVmcmVzaEN3LCBDaGV2cm9uRG93biwgQ2hldnJvblVwLCBBcmNoaXZlIH0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xuXG5jb25zdCBTRUNUSU9OUyA9IFtcbntcbiAgaWQ6IFwib3ZlcnZpZXdcIixcbiAgaWNvbjogTGF5ZXJzLFxuICBjb2xvcjogXCIjRTg3QTVBXCIsXG4gIHRpdGxlOiBcIjEuIFZpc8OjbyBHZXJhbCBkYSBBcnF1aXRldHVyYVwiLFxuICBjb250ZW50OiBgXG5PIEZvY3VzRmxvdyDDqSB1bWEgUHJvZ3Jlc3NpdmUgV2ViIEFwcCAoUFdBKSBjb25zdHJ1w61kYSBzb2JyZSBhIHBsYXRhZm9ybWEgQmFzZTQ0LCBxdWUgZm9ybmVjZSBCYWNrZW5kLWFzLWEtU2VydmljZSAoQmFhUykgY29tcGxldG8uIEEgYXBsaWNhw6fDo28gc2VndWUgdW1hIGFycXVpdGV0dXJhIGRlIHRyw6pzIGNhbWFkYXM6XG5cbkNBTUFEQSBERSBBUFJFU0VOVEHDh8ODTyAoRnJvbnRlbmQpXG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcbuKAoiBGcmFtZXdvcms6IFJlYWN0IDE4ICsgVml0ZVxu4oCiIFN0eWxpbmc6IFRhaWx3aW5kIENTUyBjb20gZGVzaWduIHRva2VucyBwZXJzb25hbGl6YWRvcyAoQ1NTIHZhcmlhYmxlcylcbuKAoiBBbmltYcOnw7VlczogRnJhbWVyIE1vdGlvbiBwYXJhIHRyYW5zacOnw7VlcyBmbHVpZGFzXG7igKIgUm91dGluZzogUmVhY3QgUm91dGVyIERPTSB2NiBjb20gcm90YXMgcHJvdGVnaWRhc1xu4oCiIFN0YXRlIE1hbmFnZW1lbnQ6IFJlYWN0IGhvb2tzIGxvY2FpcyArIFJlYWN0IFF1ZXJ5IHBhcmEgY2FjaGUgZGUgc2Vydmlkb3JcbuKAoiBDb21wb25lbnRlcyBVSTogc2hhZGNuL3VpIChSYWRpeCBVSSBiYXNlKVxuXG5DQU1BREEgREUgREFET1MgKEJhY2tlbmQtYXMtYS1TZXJ2aWNlKVxu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG7igKIgUGxhdGFmb3JtYTogQmFzZTQ0IEJhYVNcbuKAoiBEYXRhYmFzZTogR2VyaWRhIGF1dG9tYXRpY2FtZW50ZSBwZWxhIEJhc2U0NFxu4oCiIE9STTogU0RLIEJhc2U0NCAoQGJhc2U0NC9zZGspXG7igKIgQXV0ZW50aWNhw6fDo286IEJhc2U0NCBBdXRoIChKV1QgKyBPQXV0aClcbuKAoiBGaWxlIFN0b3JhZ2U6IEJhc2U0NCBTdG9yYWdlIChDRE4gZ2xvYmFsKVxuXG5DQU1BREEgREUgSU5URUdSQcOHw5VFU1xu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG7igKIgTExNIChMYXJnZSBMYW5ndWFnZSBNb2RlbHMpOiBPcGVuQUkgR1BULTRvLW1pbmkgKGRlZmF1bHQpLCBDbGF1ZGUsIEdlbWluaVxu4oCiIFRyYW5zY3Jpw6fDo28gZGUgw4F1ZGlvOiBPcGVuQUkgV2hpc3Blclxu4oCiIEdlcmHDp8OjbyBkZSBJbWFnZW5zOiBEQUxMLUUgM1xu4oCiIEVtYWlsOiBSZXNlbmQgKHZpYSBCYXNlNDQpXG7igKIgQW7DoWxpc2UgV2ViOiBJbnRlZ3Jhw6fDo28gY29tIEdvb2dsZSBTZWFyY2hcbmBcbn0sXG57XG4gIGlkOiBcImVudGl0aWVzXCIsXG4gIGljb246IERhdGFiYXNlLFxuICBjb2xvcjogXCIjOEI1Q0Y2XCIsXG4gIHRpdGxlOiBcIjIuIEVudGlkYWRlcyBlIEVzcXVlbWFzIGRlIERhZG9zXCIsXG4gIGNvbnRlbnQ6IGBcbk8gc2lzdGVtYSB1dGlsaXphIDggZW50aWRhZGVzIHByaW5jaXBhaXMsIHRvZGFzIGNvbSBjYW1wb3MgYnVpbHQtaW4gYXV0b23DoXRpY29zOlxu4oCiIGlkIChVVUlEIHY0LCBhdXRvLWdlcmFkbylcbuKAoiBjcmVhdGVkX2RhdGUgKElTTyA4NjAxLCBhdXRvLWdlcmFkbylcbuKAoiB1cGRhdGVkX2RhdGUgKElTTyA4NjAxLCBhdXRvLWF0dWFsaXphZG8pXG7igKIgY3JlYXRlZF9ieV9pZCAoSUQgZG8gdXRpbGl6YWRvciBjcmlhZG9yKVxuXG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcbkVOVElEQURFOiBUYXNrXG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcblJlcHJlc2VudGEgdGFyZWZhcyBzZW1hbmFpcyBubyBUYXNrQm9hcmQuXG7igKIgdGl0bGU6IHN0cmluZyAob2JyaWdhdMOzcmlvKSDigJQgdMOtdHVsbyBkYSB0YXJlZmFcbuKAoiBkZXNjcmlwdGlvbjogc3RyaW5nIOKAlCBub3RhcyBhZGljaW9uYWlzXG7igKIgd2Vla2RheTogZW51bSBbbW9uZGF5Li5zdW5kYXksIG5vbmVdIOKAlCBkaWEgZGEgc2VtYW5hXG7igKIgcGVyaW9kOiBlbnVtIFttb3JuaW5nLCBhZnRlcm5vb24sIGV2ZW5pbmcsIG51bGxdIOKAlCBwZXLDrW9kb1xu4oCiIHRhZ3NfanNvbjogc3RyaW5nIOKAlCBKU09OIGFycmF5IGRlIHRhZ3MgW3tpZCwgbmFtZSwgY29sb3J9XVxu4oCiIHdlZWtfc3RhcnQ6IHN0cmluZyAoZGF0ZSBJU08pIOKAlCBpbsOtY2lvIGRhIHNlbWFuYVxu4oCiIGNvbXBsZXRlZDogYm9vbGVhbiAoZGVmYXVsdDogZmFsc2UpXG7igKIgb3JkZXI6IG51bWJlciAoZGVmYXVsdDogMCkg4oCUIG9yZGVuYcOnw6NvIGRyYWctYW5kLWRyb3Bcblxu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG5FTlRJREFERTogVGFnXG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcbuKAoiBuYW1lOiBzdHJpbmcgKG9icmlnYXTDs3JpbylcbuKAoiBjb2xvcjogZW51bSBbYmx1ZSwgcHVycGxlLCBncmVlbiwgYW1iZXIsIHJvc2UsIHRlYWwsIGluZGlnbywgcGlua11cblxu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG5FTlRJREFERTogRm9jdXNTZXNzaW9uXG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcblJlZ2lzdGEgc2Vzc8O1ZXMgUG9tb2Rvcm8gY29tcGxldGFkYXMuXG7igKIgdGFnX2lkLCB0YWdfbmFtZSwgdGFnX2NvbG9yIOKAlCByZWZlcsOqbmNpYSBkZSB0YWdcbuKAoiBkdXJhdGlvbl9taW51dGVzOiBudW1iZXJcbuKAoiB0eXBlOiBlbnVtIFtmb2N1cywgcGF1c2VdXG7igKIgY29tcGxldGVkOiBib29sZWFuIChkZWZhdWx0OiB0cnVlKVxuXG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcbkVOVElEQURFOiBIYWJpdFxu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG7igKIgbmFtZTogc3RyaW5nIChvYnJpZ2F0w7NyaW8pXG7igKIgZGVzY3JpcHRpb246IHN0cmluZ1xu4oCiIHNjb3JlOiBudW1iZXIgKGRlZmF1bHQ6IDEwKSDigJQgcG9udHVhw6fDo28gcG9yIGNvbXBsZXRhclxu4oCiIGNvbG9yOiBzdHJpbmcgKGhleCBvdSBwcmVzZXQga2V5KVxu4oCiIGFjdGl2ZTogYm9vbGVhbiAoZGVmYXVsdDogdHJ1ZSlcbuKAoiBvcmRlcjogbnVtYmVyXG5cbuKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgVxuRU5USURBREU6IEhhYml0RW50cnlcbuKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgVxuUmVnaXN0YSBjYWRhIHZleiBxdWUgdW0gaMOhYml0byDDqSBjb21wbGV0YWRvLlxu4oCiIGhhYml0X2lkOiBzdHJpbmcg4oCUIHJlZmVyw6puY2lhIGFvIEhhYml0XG7igKIgaGFiaXRfbmFtZSwgaGFiaXRfY29sb3Ig4oCUIHNuYXBzaG90IGRvIG1vbWVudG9cbuKAoiBzY29yZTogbnVtYmVyIOKAlCBwb250dWHDp8OjbyBvYnRpZGFcbuKAoiBkYXRlOiBzdHJpbmcgKElTTykg4oCUIGRhdGEgZGUgY29tcGxldGHDp8Ojb1xuXG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcbkVOVElEQURFOiBEZWFkbGluZVxu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG5QcmF6b3MgY29tIGRhdGEvaG9yYSBsaW1pdGUuXG7igKIgbmFtZTogc3RyaW5nIChvYnJpZ2F0w7NyaW8pXG7igKIgY29sb3I6IHN0cmluZyDigJQgY29yIGRlIGFwcmVzZW50YcOnw6NvXG7igKIgbG9jYXRpb246IHN0cmluZyDigJQgbG9jYWwgb3BjaW9uYWxcbuKAoiB3ZWJzaXRlOiBzdHJpbmcg4oCUIFVSTCBvcGNpb25hbFxu4oCiIGRlYWRsaW5lOiBzdHJpbmcgKElTTyBkYXRldGltZSkg4oCUIGRhdGEgZSBob3JhIGxpbWl0ZVxuXG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcbkVOVElEQURFOiBFdmVudFxu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG5FdmVudG9zIGNvbSBkdXJhw6fDo28gY2FsY3VsYWRhIGF1dG9tYXRpY2FtZW50ZS5cbuKAoiBuYW1lOiBzdHJpbmcgKG9icmlnYXTDs3JpbylcbuKAoiBjb2xvciwgbG9jYXRpb24sIHdlYnNpdGUsIGRlc2NyaXB0aW9uIOKAlCBtZXRhZGFkb3NcbuKAoiBzdGFydF9kYXRldGltZTogc3RyaW5nIChJU08gZGF0ZXRpbWUpIOKAlCBvYnJpZ2F0w7NyaW9cbuKAoiBlbmRfZGF0ZXRpbWU6IHN0cmluZyAoSVNPIGRhdGV0aW1lKSDigJQgb2JyaWdhdMOzcmlvXG7igKIgRFVSQcOHw4NPOiBjYWxjdWxhZGEgbm8gZnJvbnRlbmQ6IGRpZmZlcmVuY2VJbk1pbnV0ZXMoZW5kLCBzdGFydClcblxu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG5FTlRJREFERTogTWVldGluZ1JlY29yZGluZ1xu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG5HcmF2YcOnw7VlcyBkZSByZXVuacO1ZXMgY29tIGFuw6FsaXNlIElBLlxu4oCiIHRpdGxlOiBzdHJpbmcgKG9icmlnYXTDs3JpbylcbuKAoiBzdW1tYXJ5LCB0cmFuc2NyaXB0IOKAlCB0ZXh0byBnZXJhZG8gcG9yIElBXG7igKIgYWN0aW9uX2l0ZW1zX2pzb246IHN0cmluZyDigJQgSlNPTiBhcnJheSBkZSBhw6fDtWVzXG7igKIgZGVhZGxpbmVzX2pzb246IHN0cmluZyDigJQgSlNPTiBhcnJheSBkZSBwcmF6b3NcbuKAoiBtaW5kX21hcF9qc29uOiBzdHJpbmcg4oCUIEpTT04gaGllcsOhcnF1aWNvIGRvIG1hcGEgbWVudGFsXG7igKIgcGRmX3VybDogc3RyaW5nIOKAlCBVUkwgZG8gUERGIGdlcmFkbyBubyBTdG9yYWdlXG7igKIgYXVkaW9fZHVyYXRpb25fc2Vjb25kczogbnVtYmVyXG7igKIgZXZlbnRfaWQsIGV2ZW50X25hbWUg4oCUIGxpZ2HDp8OjbyBvcGNpb25hbCBhIEV2ZW50L0RlYWRsaW5lXG7igKIgbWVldGluZ19kYXRlOiBzdHJpbmcgKGRhdGUpXG5gXG59LFxue1xuICBpZDogXCJzZGtcIixcbiAgaWNvbjogQ29kZSxcbiAgY29sb3I6IFwiIzNCODJGNlwiLFxuICB0aXRsZTogXCIzLiBTREsgQmFzZTQ0IOKAlCBBUEkgZGUgRW50aWRhZGVzXCIsXG4gIGNvbnRlbnQ6IGBcbk8gU0RLIEJhc2U0NCAoQGJhc2U0NC9zZGspIMOpIGluaWNpYWxpemFkbyBlbSBzcmMvYXBpL2Jhc2U0NENsaWVudC5qcyBlIGV4cG9ydGEgbyBvYmpldG8gJ2Jhc2U0NCcuXG5cbk3DiVRPRE9TIENSVUQgRElTUE9Ow41WRUlTIFBBUkEgVE9EQVMgQVMgRU5USURBREVTOlxu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG5cbmJhc2U0NC5lbnRpdGllcy48RW50aXR5TmFtZT4ubGlzdChzb3J0PywgbGltaXQ/KVxuICDihpIgUmV0b3JuYSBhcnJheSBkZSB0b2RvcyBvcyByZWdpc3Rvc1xuICDihpIgc29ydDogc3RyaW5nIGV4LiBcIi1jcmVhdGVkX2RhdGVcIiAoLSA9IGRlc2NlbmRlbnRlKVxuICDihpIgbGltaXQ6IG7Dum1lcm8gbcOheGltbyBkZSByZXN1bHRhZG9zIChkZWZhdWx0OiA1MClcbiAg4oaSIEV4OiBiYXNlNDQuZW50aXRpZXMuVGFzay5saXN0KFwiLXVwZGF0ZWRfZGF0ZVwiLCA1MDApXG5cbmJhc2U0NC5lbnRpdGllcy48RW50aXR5TmFtZT4uZmlsdGVyKHF1ZXJ5LCBzb3J0PywgbGltaXQ/KVxuICDihpIgRmlsdHJhIHBvciBjb25kacOnw7VlcyBlc3BlY8OtZmljYXNcbiAg4oaSIHF1ZXJ5OiBvYmpldG8ge2NhbXBvOiB2YWxvcn0gb3Ugb3BlcmFkb3JlcyBNb25nb0RCLWxpa2VcbiAg4oaSIEV4OiBiYXNlNDQuZW50aXRpZXMuVGFzay5maWx0ZXIoe2NvbXBsZXRlZDogZmFsc2UsIHdlZWtfc3RhcnQ6IFwiMjAyNC0wMS0wMVwifSlcbiAg4oaSIFN1cG9ydGE6IHskZ3RlLCAkbHRlLCAkZ3QsICRsdCwgJG5lLCAkaW59XG5cbmJhc2U0NC5lbnRpdGllcy48RW50aXR5TmFtZT4uY3JlYXRlKGRhdGEpXG4gIOKGkiBDcmlhIG5vdm8gcmVnaXN0bywgcmV0b3JuYSBvIG9iamV0byBjcmlhZG8gY29tIGlkXG4gIOKGkiBFeDogYmFzZTQ0LmVudGl0aWVzLkhhYml0LmNyZWF0ZSh7bmFtZTogXCJFeGVyY8OtY2lvXCIsIHNjb3JlOiAxNX0pXG5cbmJhc2U0NC5lbnRpdGllcy48RW50aXR5TmFtZT4udXBkYXRlKGlkLCBkYXRhKVxuICDihpIgQXR1YWxpemEgY2FtcG9zIGVzcGVjw61maWNvcyAobWVyZ2UgcGFyY2lhbClcbiAg4oaSIEV4OiBiYXNlNDQuZW50aXRpZXMuVGFzay51cGRhdGUodGFza0lkLCB7Y29tcGxldGVkOiB0cnVlfSlcblxuYmFzZTQ0LmVudGl0aWVzLjxFbnRpdHlOYW1lPi5kZWxldGUoaWQpXG4gIOKGkiBSZW1vdmUgcGVybWFuZW50ZW1lbnRlIG8gcmVnaXN0b1xuICDihpIgRXg6IGJhc2U0NC5lbnRpdGllcy5EZWFkbGluZS5kZWxldGUoZGVhZGxpbmVJZClcblxuYmFzZTQ0LmVudGl0aWVzLjxFbnRpdHlOYW1lPi5idWxrQ3JlYXRlKGFycmF5KVxuICDihpIgQ3JpYSBtw7psdGlwbG9zIHJlZ2lzdG9zIGVtIGJhdGNoXG4gIOKGkiBFeDogYmFzZTQ0LmVudGl0aWVzLlRhZy5idWxrQ3JlYXRlKFt7bmFtZTpcIkFcIn0sIHtuYW1lOlwiQlwifV0pXG5cbmJhc2U0NC5lbnRpdGllcy48RW50aXR5TmFtZT4uc2NoZW1hKClcbiAg4oaSIFJldG9ybmEgbyBKU09OIFNjaGVtYSBkYSBlbnRpZGFkZSAoc2VtIGNhbXBvcyBidWlsdC1pbilcblxuU1VCU0NSSVBUSU9OUyBFTSBURU1QTyBSRUFMOlxu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG5jb25zdCB1bnN1YnNjcmliZSA9IGJhc2U0NC5lbnRpdGllcy5UYXNrLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgLy8gZXZlbnQudHlwZTogJ2NyZWF0ZScgfCAndXBkYXRlJyB8ICdkZWxldGUnXG4gIC8vIGV2ZW50LmlkOiBJRCBkbyByZWdpc3RvIGFmZXRhZG9cbiAgLy8gZXZlbnQuZGF0YTogZGFkb3MgYXR1YWxpemFkb3Ncbn0pO1xudW5zdWJzY3JpYmUoKTsgLy8gY2xlYW51cFxuXG5FTlRJREFERSBVU0VSIChlc3BlY2lhbCk6XG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcbkEgZW50aWRhZGUgVXNlciB0ZW0gY2FtcG9zIHJlYWQtb25seTogaWQsIGNyZWF0ZWRfZGF0ZSwgZnVsbF9uYW1lLCBlbWFpbFxuQ2FtcG9zIGVkaXTDoXZlaXMgaW5jbHVlbTogcm9sZSwgZSBxdWFscXVlciBjYW1wbyBjdXN0b20gYWRpY2lvbmFkbyBhbyBzY2hlbWEuXG5DYW1wb3MgY3VzdG9tIHVzYWRvcyBuZXN0YSBhcHA6XG7igKIgZm9jdXNfbWluLCBzaG9ydF9icmVha19taW4sIGxvbmdfYnJlYWtfbWluOiBjb25maWd1cmHDp8O1ZXMgZG8gdGltZXJcbuKAoiBvcmFuZ2VfcmVzZXQ6IGZyZXF1w6puY2lhIGRlIHJlc2V0IGRhcyBsYXJhbmphc1xu4oCiIG5vdGlmaWNhdGlvbnNfZW5hYmxlZDogYm9vbGVhblxu4oCiIG5vdGlmaWNhdGlvbl9zb3VuZDogc3RyaW5nXG7igKIgd2Vla19zdGFydHNfb246IDAgKGRvbWluZ28pIG91IDEgKHNlZ3VuZGEpXG5gXG59LFxue1xuICBpZDogXCJhdXRoXCIsXG4gIGljb246IFNoaWVsZCxcbiAgY29sb3I6IFwiIzEwQjk4MVwiLFxuICB0aXRsZTogXCI0LiBTaXN0ZW1hIGRlIEF1dGVudGljYcOnw6NvXCIsXG4gIGNvbnRlbnQ6IGBcbkEgYXV0ZW50aWNhw6fDo28gw6kgZ2VyaWRhIGludGVpcmFtZW50ZSBwZWxhIEJhc2U0NCwgZWxpbWluYW5kbyBhIG5lY2Vzc2lkYWRlIGRlIGltcGxlbWVudGFyXG5sw7NnaWNhIGRlIGF1dGggbm8gYmFja2VuZC5cblxuTcOJVE9ET1MgREUgQVVURU5USUNBw4fDg086XG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcbmJhc2U0NC5hdXRoLmxvZ2luVmlhRW1haWxQYXNzd29yZChlbWFpbCwgcGFzc3dvcmQpXG4gIOKGkiBMb2dpbiBjb20gY3JlZGVuY2lhaXMsIGF1dG8tZ3VhcmRhIEpXVCB0b2tlblxuICDihpIgRW0gc3VjZXNzbzogd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnLycgKGhhcmQgcmVkaXJlY3QgcGFyYSByZWluaWNpYWxpemFyIGVzdGFkbylcblxuYmFzZTQ0LmF1dGgubG9naW5XaXRoUHJvdmlkZXIocHJvdmlkZXIsIGZyb21VcmwpXG4gIOKGkiBPQXV0aCBzb2NpYWw6IFwiZ29vZ2xlXCIsIFwiZmFjZWJvb2tcIiwgXCJtaWNyb3NvZnRcIiwgXCJhcHBsZVwiXG4gIOKGkiBSZWRpcmVjaW9uYSBwYXJhIG8gcHJvdmlkZXIsIHJldG9ybmEgw6AgYXBwIGNvbSB0b2tlblxuXG5iYXNlNDQuYXV0aC5yZWdpc3Rlcih7ZW1haWwsIHBhc3N3b3JkfSlcbiAg4oaSIFJlZ2lzdGEgbm92byB1dGlsaXphZG9yLCByZXRvcm5hIHBlbmRlbnRlIGRlIHZlcmlmaWNhw6fDo29cbiAg4oaSIE7Dg08gZmF6IGxvZ2luIGF1dG9tw6F0aWNvIOKAlCByZXF1ZXIgdmVyaWZpY2HDp8OjbyBPVFBcblxuYmFzZTQ0LmF1dGgudmVyaWZ5T3RwKHtlbWFpbCwgb3RwQ29kZX0pXG4gIOKGkiBWZXJpZmljYSBlbWFpbCBhcMOzcyByZWdpc3RvXG4gIOKGkiBFbSBzdWNlc3NvOiBjaGFtYXIgYmFzZTQ0LmF1dGguc2V0VG9rZW4oYWNjZXNzX3Rva2VuKSwgZGVwb2lzIGhhcmQgcmVkaXJlY3RcblxuYmFzZTQ0LmF1dGgucmVzZW5kT3RwKGVtYWlsKSDigJQgcmVlbnZpbyBkbyBjw7NkaWdvXG5cbmJhc2U0NC5hdXRoLnJlc2V0UGFzc3dvcmRSZXF1ZXN0KGVtYWlsKSDigJQgZW52aW8gZGUgZW1haWwgZGUgcmVzZXRcbmJhc2U0NC5hdXRoLnJlc2V0UGFzc3dvcmQoe3Jlc2V0VG9rZW4sIG5ld1Bhc3N3b3JkfSkg4oCUIHJlc2V0IGNvbSB0b2tlbiBkbyBlbWFpbFxuXG5iYXNlNDQuYXV0aC5tZSgpIOKGkiBQcm9taXNlPFVzZXI+IOKAlCBkYWRvcyBkbyB1dGlsaXphZG9yIGF0dWFsXG5iYXNlNDQuYXV0aC51cGRhdGVNZShkYXRhKSDihpIgYXR1YWxpemEgcGVyZmlsIGRvIHV0aWxpemFkb3JcbmJhc2U0NC5hdXRoLmlzQXV0aGVudGljYXRlZCgpIOKGkiBQcm9taXNlPGJvb2xlYW4+XG5iYXNlNDQuYXV0aC5sb2dvdXQocmVkaXJlY3RVcmw/KSDihpIgdGVybWluYSBzZXNzw6NvXG5cblBST1RFw4fDg08gREUgUk9UQVM6XG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcbk8gY29tcG9uZW50ZSBQcm90ZWN0ZWRSb3V0ZSAoc3JjL2NvbXBvbmVudHMvUHJvdGVjdGVkUm91dGUuanN4KSB1c2EgdXNlQXV0aCgpXG5wYXJhIHZlcmlmaWNhciBhdXRlbnRpY2HDp8OjbyBhbnRlcyBkZSByZW5kZXJpemFyIGEgcm90YS5cbk7Do28gYXV0ZW50aWNhZG8g4oaSIHJlZGlyZWNpb25hIHBhcmEgL2xvZ2luXG5BIGNhcmdhIMOpIGZlaXRhIHZpYSBBdXRoUHJvdmlkZXIgKHNyYy9saWIvQXV0aENvbnRleHQuanN4KSBxdWUgZW52b2x2ZSB0b2RhIGEgYXBwLlxuXG5UT0tFTlMgSldUOlxu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG5Ub2tlbnMgc8OjbyBhcm1hemVuYWRvcyBkZSBmb3JtYSBzZWd1cmEgcGVsYSBwbGF0YWZvcm1hLlxuQ2FkYSByZXF1ZXN0IGFvIFNESyBpbmNsdWkgYXV0b21hdGljYW1lbnRlIG8gdG9rZW4gbm8gaGVhZGVyIEF1dGhvcml6YXRpb24uXG5BIHJlbm92YcOnw6NvIGF1dG9tw6F0aWNhIGRlIHRva2VucyDDqSBnZXJpZGEgcGVsbyBTREsuXG5cblJFR1JBUyBERSBTRUdVUkFOw4dBIChSTFMpOlxu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG5Qb3IgZGVmYXVsdCwgdXRpbGl6YWRvcmVzIGFwZW5hcyBhY2VkZW0gYW9zIHNldXMgcHLDs3ByaW9zIGRhZG9zIChjcmVhdGVkX2J5X2lkID0gdXNlci5pZCkuXG5BZG1pbnMgcG9kZW0gYWNlZGVyIGEgdG9kb3Mgb3MgZGFkb3MuXG5BIGVudGlkYWRlIFVzZXIgdGVtIHJlZ3JhcyBlc3BlY2lhaXM6IGFkbWluIHBvZGUgbGlzdGFyL2VkaXRhciB0b2RvcyBvcyB1c2VycyxcbnVzZXIgcmVndWxhciBhcGVuYXMgdsOqIGUgZWRpdGEgbyBwcsOzcHJpbyBwZXJmaWwuXG5gXG59LFxue1xuICBpZDogXCJpbnRlZ3JhdGlvbnNcIixcbiAgaWNvbjogWmFwLFxuICBjb2xvcjogXCIjRjU5RTBCXCIsXG4gIHRpdGxlOiBcIjUuIEludGVncmHDp8O1ZXMg4oCUIENvcmUgUGFja2FnZVwiLFxuICBjb250ZW50OiBgXG5BcyBpbnRlZ3Jhw6fDtWVzIHPDo28gYWNlZGlkYXMgdmlhIGJhc2U0NC5pbnRlZ3JhdGlvbnMuQ29yZS48RW5kcG9pbnQ+KHBhcmFtcykuXG5Ub2RhcyBhcyBjaGFtYWRhcyBzw6NvIGF1dGVudGljYWRhcyBlIGZhdHVyYWRhcyBlbSBjcsOpZGl0b3MgZGUgaW50ZWdyYcOnw6NvLlxuXG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcbkludm9rZUxMTVxu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG5JbnZvY2EgbW9kZWxvcyBkZSBsaW5ndWFnZW0gcGFyYSBnZXJhw6fDo28gZGUgdGV4dG8gb3UgSlNPTiBlc3RydXR1cmFkby5cblxuUGFyw6JtZXRyb3M6XG7igKIgcHJvbXB0OiBzdHJpbmcgKG9icmlnYXTDs3Jpbykg4oCUIGluc3RydcOnw6NvIHBhcmEgbyBtb2RlbG9cbuKAoiByZXNwb25zZV9qc29uX3NjaGVtYTogb2JqZWN0IOKAlCBzZSBmb3JuZWNpZG8sIHJldG9ybmEgSlNPTiAobsOjbyBzdHJpbmcpXG7igKIgYWRkX2NvbnRleHRfZnJvbV9pbnRlcm5ldDogYm9vbGVhbiDigJQgYWRpY2lvbmEgY29udGV4dG8gdmlhIEdvb2dsZSBTZWFyY2hcbuKAoiBmaWxlX3VybHM6IHN0cmluZ1tdIOKAlCBVUkxzIGRlIGltYWdlbnMvZmljaGVpcm9zIHBhcmEgY29udGV4dG8gdmlzdWFsXG7igKIgbW9kZWw6IHN0cmluZyDigJQgbW9kZWxvIGVzcGVjw61maWNvOlxuICAtIFwiYXV0b21hdGljXCIgKGRlZmF1bHQpIOKGkiBncHQtNG8tbWluaVxuICAtIFwiZ3B0XzVfbWluaVwiIOKGkiBtYWlzIGVjb27Ds21pY29cbiAgLSBcImdwdF81XzRcIiAvIFwiZ3B0XzVfNVwiIOKGkiBHUFQtNG8gZSBHUFQtNC41XG4gIC0gXCJjbGF1ZGVfc29ubmV0XzRfNlwiIOKGkiBDbGF1ZGUgU29ubmV0IChtZWxob3IgcmFjaW9jw61uaW8pXG4gIC0gXCJjbGF1ZGVfb3B1c180XzYvNy84XCIg4oaSIENsYXVkZSBPcHVzIChtw6F4aW1hIHF1YWxpZGFkZSlcbiAgLSBcImdlbWluaV8zX2ZsYXNoXCIgLyBcImdlbWluaV8zXzFfcHJvXCIg4oaSIEdlbWluaSAoc3Vwb3J0YW0gd2ViIHNlYXJjaClcblxuVVNPIE5BIEFQUDpcbkFuYWxpc2FyIHRyYW5zY3Jpw6fDtWVzIGRlIHJldW5pw7VlcyDihpIgZXh0cmFpIGHDp8O1ZXMsIHByYXpvcywgbWFwYSBtZW50YWwsIHJlc3Vtb1xuU3VnZXN0w7VlcyBkZSBow6FiaXRvcyBjb20gSUEgKEhhYml0c01hbmFnZSkg4oaSIGdlcmEgbGlzdGEgcGVyc29uYWxpemFkYSBkZSBow6FiaXRvc1xuXG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcblRyYW5zY3JpYmVBdWRpb1xu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG5UcmFuc2NyacOnw6NvIGRlIMOhdWRpbyBwYXJhIHRleHRvIHZpYSBPcGVuQUkgV2hpc3Blci5cblxu4oCiIGF1ZGlvX3VybDogc3RyaW5nIOKAlCBVUkwgZG8gZmljaGVpcm8gY2FycmVnYWRvIHZpYSBVcGxvYWRGaWxlXG7igKIgRm9ybWF0b3M6IG9nZywgb2dhLCBtcDMsIHdhdiwgd2VibSwgbTRhLCBtcDQsIG1wZWcsIG1wZ2EsIGZsYWNcbuKAoiBMaW1pdGU6IDI1TUIgcG9yIGZpY2hlaXJvXG7igKIgUmV0b3JuYTogc3RyaW5nIGNvbSB0cmFuc2NyacOnw6NvIGNvbXBsZXRhXG7igKIgRGV0ZWPDp8OjbyBhdXRvbcOhdGljYSBkZSBpZGlvbWEgKHN1cG9ydGUgbXVsdGlsaW5ndWUpXG5cbuKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgVxuVXBsb2FkRmlsZVxu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG5VcGxvYWQgZGUgZmljaGVpcm9zIHBhcmEgbyBzdG9yYWdlIGRhIEJhc2U0NC5cblxu4oCiIGZpbGU6IEJsb2IvRmlsZSDigJQgZmljaGVpcm8gYSBjYXJyZWdhclxu4oCiIFJldG9ybmE6IHtmaWxlX3VybDogc3RyaW5nfSDigJQgVVJMIHDDumJsaWNvIHBlcm1hbmVudGVcbuKAoiBDRE4gZ2xvYmFsIHBhcmEgZGlzdHJpYnVpw6fDo28gcsOhcGlkYVxu4oCiIFN1cG9ydGEgcXVhbHF1ZXIgdGlwbyBkZSBmaWNoZWlyb1xuXG5VU08gTkEgQVBQOiBVcGxvYWQgZGUgw6F1ZGlvIGFudGVzIGRlIHRyYW5zY3JldmVyLFxudXBsb2FkIGRlIFBERnMgZ2VyYWRvcyBwYXJhIGd1YXJkYXIgVVJMIHBlcm1hbmVudGUuXG5cbuKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgVxuVXBsb2FkUHJpdmF0ZUZpbGUgKyBDcmVhdGVGaWxlU2lnbmVkVXJsXG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcblBhcmEgZmljaGVpcm9zIHByaXZhZG9zIChuw6NvIGFjZXNzw612ZWlzIHB1YmxpY2FtZW50ZSkuXG7igKIgVXBsb2FkUHJpdmF0ZUZpbGUoe2ZpbGV9KSDihpIge2ZpbGVfdXJpOiBzdHJpbmd9XG7igKIgQ3JlYXRlRmlsZVNpZ25lZFVybCh7ZmlsZV91cmksIGV4cGlyZXNfaW59KSDihpIge3NpZ25lZF91cmw6IHN0cmluZ31cbuKAoiBleHBpcmVzX2luOiBzZWd1bmRvcyBhdMOpIGV4cGlyYcOnw6NvIChkZWZhdWx0OiAzMDApXG5cbuKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgVxuU2VuZEVtYWlsXG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcbuKAoiB0bzogc3RyaW5nIOKAlCBkZXN0aW5hdMOhcmlvXG7igKIgc3ViamVjdDogc3RyaW5nIOKAlCBhc3N1bnRvXG7igKIgYm9keTogc3RyaW5nIOKAlCBjb3JwbyAoSFRNTCBvdSB0ZXh0bylcbuKAoiBmcm9tX25hbWU6IHN0cmluZyAob3BjaW9uYWwpIOKAlCBub21lIGRvIHJlbWV0ZW50ZVxuXG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcbkdlbmVyYXRlSW1hZ2VcbuKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgVxu4oCiIHByb21wdDogc3RyaW5nIOKAlCBkZXNjcmnDp8OjbyBkZXRhbGhhZGFcbuKAoiBleGlzdGluZ19pbWFnZV91cmxzOiBzdHJpbmdbXSDigJQgcmVmZXLDqm5jaWFzIHZpc3VhaXNcbuKAoiBSZXRvcm5hOiB7dXJsOiBzdHJpbmd9IOKAlCBVUkwgZGEgaW1hZ2VtIGdlcmFkYVxuXG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcbkdlbmVyYXRlU3BlZWNoXG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcblRUUyAoVGV4dC10by1TcGVlY2gpIGNvbSBtw7psdGlwbGFzIHZvemVzLlxu4oCiIHRleHQ6IHN0cmluZyAobWF4IDUwMDAgY2hhcnMpXG7igKIgdm9pY2U6IFwicml2ZXJcInxcImhvbmV5XCJ8XCJzdW5ueVwifFwic3Rvcm1cInxcInNwYXJrXCJcbuKAoiBsYW5ndWFnZV9jb2RlOiBzdHJpbmcgKGF1dG8tZGV0ZWN0IHNlIG9taXRpZG8pXG7igKIgUmV0b3JuYToge3VybDogc3RyaW5nfSDigJQgTVAzIFVSTFxuXG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcbkV4dHJhY3REYXRhRnJvbVVwbG9hZGVkRmlsZVxu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG5FeHRyYWkgZGFkb3MgZXN0cnV0dXJhZG9zIGRlIGZpY2hlaXJvcy5cbuKAoiBmaWxlX3VybDogc3RyaW5nIOKAlCBVUkwgZG8gZmljaGVpcm8gKGNzdiwgeGxzeCwganNvbiwgcGRmLCBpbWFnZW5zKVxu4oCiIGpzb25fc2NoZW1hOiBvYmplY3Qg4oCUIHNjaGVtYSBkb3MgZGFkb3MgYSBleHRyYWlyXG7igKIgUmV0b3JuYToge3N0YXR1cywgb3V0cHV0LCBkZXRhaWxzfVxuYFxufSxcbntcbiAgaWQ6IFwicm91dGluZ1wiLFxuICBpY29uOiBHbG9iZSxcbiAgY29sb3I6IFwiIzA2QjZENFwiLFxuICB0aXRsZTogXCI2LiBTaXN0ZW1hIGRlIFJvdXRpbmcgZSBOYXZlZ2HDp8Ojb1wiLFxuICBjb250ZW50OiBgXG5FU1RSVVRVUkEgREUgUk9UQVMgKEFwcC5qc3gpOlxu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG5cblJvdGFzIFDDumJsaWNhcyAoc2VtIGF1dGVudGljYcOnw6NvKTpcbuKAoiAvbG9naW4g4oaSIExvZ2luLmpzeFxu4oCiIC9yZWdpc3RlciDihpIgUmVnaXN0ZXIuanN4XG7igKIgL2ZvcmdvdC1wYXNzd29yZCDihpIgRm9yZ290UGFzc3dvcmQuanN4XG7igKIgL3Jlc2V0LXBhc3N3b3JkIOKGkiBSZXNldFBhc3N3b3JkLmpzeCAocmVjZWJlID90b2tlbj0uLi4pXG5cblJvdGFzIFByb3RlZ2lkYXMgKHJlcXVlcmVtIGF1dGVudGljYcOnw6NvIHZpYSBQcm90ZWN0ZWRSb3V0ZSk6XG7igKIgLyDihpIgSG9tZS5qc3gg4oCUIEh1YiBjZW50cmFsIGRlIG5hdmVnYcOnw6NvIGdlc3R1YWxcbuKAoiAvZm9jdXMg4oaSIEZvY3VzUG9tby5qc3gg4oCUIFRpbWVyIFBvbW9kb3JvXG7igKIgL2ZvY3VzL3NldHRpbmdzIOKGkiBGb2N1c1NldHRpbmdzLmpzeCDigJQgQ29uZmlndXJhw6fDtWVzIGRvIHRpbWVyXG7igKIgL2ZvY3VzL2NhbGVuZGFyIOKGkiBGb2N1c0NhbGVuZGFyLmpzeCDigJQgQ2FsZW5kw6FyaW8gZGUgc2Vzc8O1ZXNcbuKAoiAvZm9jdXMvYW5hbHl0aWNzIOKGkiBGb2N1c0FuYWx5dGljcy5qc3gg4oCUIEFuYWx5dGljcyBkZSBwcm9kdXRpdmlkYWRlXG7igKIgL3Rhc2tzIOKGkiBUYXNrQm9hcmQuanN4IOKAlCBLYW5iYW4gc2VtYW5hbCBkZSB0YXJlZmFzXG7igKIgL2hhYml0cyDihpIgSGFiaXRzLmpzeCDigJQgRGFzaGJvYXJkIGRlIGjDoWJpdG9zXG7igKIgL2hhYml0cy9tYW5hZ2Ug4oaSIEhhYml0c01hbmFnZS5qc3gg4oCUIENSVUQgZGUgaMOhYml0b3NcbuKAoiAvaGFiaXRzL2FuYWx5dGljcyDihpIgSGFiaXRzQW5hbHl0aWNzLmpzeCDigJQgR3LDoWZpY29zIGRlIGjDoWJpdG9zXG7igKIgL2hhYml0cy9yZXdhcmRzIOKGkiBIYWJpdHNSZXdhcmRzLmpzeCDigJQgR2FtaWZpY2HDp8Ojby9jb25xdWlzdGFzXG7igKIgL2NvbWluZy1zb29uIOKGkiBDb21pbmdTb29uLmpzeCDigJQgSHViIGRlIG3Ds2R1bG9zIGF2YW7Dp2Fkb3NcbuKAoiAvZGVhZGxpbmVzIOKGkiBEZWFkbGluZXMuanN4IOKAlCBDb250cm9sbyBkZSBEYXRhcyAocHJhem9zICsgZXZlbnRvcylcbuKAoiAvbWVldGluZy1haSDihpIgTWVldGluZ0FJLmpzeCDigJQgUmV1bmnDtWVzIGNvbSB0cmFuc2NyacOnw6NvIElBXG7igKIgL2V4cG9ydCDihpIgRXhwb3J0RG9jcy5qc3gg4oCUIERvY3VtZW50YcOnw6NvIHTDqWNuaWNhIChlc3RhIHDDoWdpbmEpXG5cbk5BVkVHQcOHw4NPIEdFU1RVQUw6XG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcbkEgYXBwIGltcGxlbWVudGEgbmF2ZWdhw6fDo28gcG9yIHN3aXBlICh0b3VjaCArIG1vdXNlKSwgc2VndWluZG8gdW1hIGdyZWxoYSBkaXJlY2lvbmFsOlxuXG4gICAgICAgICAgW0V4cGxvcmFyIC9jb21pbmctc29vbl1cbiAgICAgICAgICAgICAgICAgICDihpFcbltUYXJlZmFzIC90YXNrc10g4oaQIFtIb21lIC9dIOKGkiBbSMOhYml0b3MgL2hhYml0c11cbiAgICAgICAgICAgICAgICAgICDihpNcbiAgICAgICAgICBbRm9jdXNQb21vIC9mb2N1c11cblxuTm8gRm9jdXNQb21vOlxu4oaQIENvbmZpZ3VyYcOnw7VlcyB8IOKGkiBDYWxlbmTDoXJpbyB8IOKGkSBIb21lIHwg4oaTIEFuYWx5dGljc1xuXG5PIHNpc3RlbWEgdXNhIHJlZnMgcGFyYSB0cmFja2luZyBkZSBjb29yZGVuYWRhczpcbnRvdWNoU3RhcnQuY3VycmVudCA9IHt4LCB5fVxuZHJhZ09mZnNldC5jdXJyZW50ID0ge3gsIHl9XG5cblRocmVzaG9sZCBkZSBzd2lwZTogNjBweCBtw61uaW1vXG5GZWVkYmFjayB2aXN1YWw6IGRyYWdTdHlsZSB0cmFuc2Zvcm1hIG8gY29udGFpbmVyIGR1cmFudGUgbyBhcnJhc3RvLlxuYFxufSxcbntcbiAgaWQ6IFwiZnJvbnRlbmRcIixcbiAgaWNvbjogR2l0QnJhbmNoLFxuICBjb2xvcjogXCIjRUM0ODk5XCIsXG4gIHRpdGxlOiBcIjcuIEFycXVpdGV0dXJhIEZyb250ZW5kIOKAlCBDb21wb25lbnRlc1wiLFxuICBjb250ZW50OiBgXG5FU1RSVVRVUkEgREUgRklDSEVJUk9TOlxu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG5zcmMvXG7ilJzilIDilIAgcGFnZXMvICAgICAgICAgICDigJQgUMOhZ2luYXMgKHJvdGFzKVxu4pSCICAg4pSc4pSA4pSAIEhvbWUuanN4XG7ilIIgICDilJzilIDilIAgRm9jdXNQb21vLmpzeFxu4pSCICAg4pSc4pSA4pSAIEZvY3VzU2V0dGluZ3MuanN4XG7ilIIgICDilJzilIDilIAgRm9jdXNDYWxlbmRhci5qc3hcbuKUgiAgIOKUnOKUgOKUgCBGb2N1c0FuYWx5dGljcy5qc3hcbuKUgiAgIOKUnOKUgOKUgCBUYXNrQm9hcmQuanN4XG7ilIIgICDilJzilIDilIAgSGFiaXRzLmpzeFxu4pSCICAg4pSc4pSA4pSAIEhhYml0c01hbmFnZS5qc3hcbuKUgiAgIOKUnOKUgOKUgCBIYWJpdHNBbmFseXRpY3MuanN4XG7ilIIgICDilJzilIDilIAgSGFiaXRzUmV3YXJkcy5qc3hcbuKUgiAgIOKUnOKUgOKUgCBEZWFkbGluZXMuanN4XG7ilIIgICDilJzilIDilIAgTWVldGluZ0FJLmpzeFxu4pSCICAg4pSc4pSA4pSAIENvbWluZ1Nvb24uanN4XG7ilIIgICDilJzilIDilIAgRXhwb3J0RG9jcy5qc3hcbuKUgiAgIOKUnOKUgOKUgCBMb2dpbi5qc3ggLyBSZWdpc3Rlci5qc3hcbuKUgiAgIOKUnOKUgOKUgCBGb3Jnb3RQYXNzd29yZC5qc3ggLyBSZXNldFBhc3N3b3JkLmpzeFxu4pSc4pSA4pSAIGNvbXBvbmVudHMvICAgICAg4oCUIENvbXBvbmVudGVzIHJldXRpbGl6w6F2ZWlzXG7ilIIgICDilJzilIDilIAgdWkvICAgICAgICAgIOKAlCBzaGFkY24vdWkgKEJ1dHRvbiwgSW5wdXQsIFNlbGVjdCwgZXRjLilcbuKUgiAgIOKUnOKUgOKUgCBGb2N1c1RpbWVyLmpzeCDigJQgVGltZXIgY2lyY3VsYXIgYW5pbWFkbyBTVkdcbuKUgiAgIOKUnOKUgOKUgCBPcmFuZ2VDYW52YXMuanN4IOKAlCBBbmltYcOnw6NvIGRlIGxhcmFuamFzIGEgY2Fpclxu4pSCICAg4pSc4pSA4pSAIFRhZ1BpY2tlci5qc3gg4oCUIFNlbGV0b3IgZGUgdGFncyAoc2luZ2xlL211bHRpKVxu4pSCICAg4pSc4pSA4pSAIGhhYml0cy9UZXRyaXNHcmlkLmpzeCDigJQgR3JpZCBkZSBow6FiaXRvc1xu4pSCICAg4pSc4pSA4pSAIFByb3RlY3RlZFJvdXRlLmpzeCDigJQgV3JhcHBlciBkZSBhdXRlbnRpY2HDp8Ojb1xu4pSCICAg4pSc4pSA4pSAIFNjcm9sbFRvVG9wLmpzeCDigJQgUmVzZXQgc2Nyb2xsIGVtIG5hdmVnYcOnw6NvXG7ilIIgICDilJTilIDilIAgVXNlck5vdFJlZ2lzdGVyZWRFcnJvci5qc3hcbuKUnOKUgOKUgCBjb250ZXh0L1xu4pSCICAg4pSU4pSA4pSAIEZvY3VzVGltZXJDb250ZXh0LmpzeCDigJQgVGltZXIgUG9tb2Rvcm8gZ2xvYmFsXG7ilJzilIDilIAgbGliL1xu4pSCICAg4pSc4pSA4pSAIEF1dGhDb250ZXh0LmpzeCDigJQgQ29udGV4dG8gZGUgYXV0ZW50aWNhw6fDo29cbuKUgiAgIOKUnOKUgOKUgCBxdWVyeS1jbGllbnQuanMg4oCUIFJlYWN0IFF1ZXJ5IGNvbmZpZ1xu4pSCICAg4pSU4pSA4pSAIHV0aWxzLmpzIOKAlCBjbigpIGhlbHBlclxu4pSc4pSA4pSAIGFwaS9cbuKUgiAgIOKUlOKUgOKUgCBiYXNlNDRDbGllbnQuanMg4oCUIEluc3TDom5jaWEgU0RLXG7ilJzilIDilIAgZW50aXRpZXMvICAgICAgICDigJQgU2NoZW1hcyBKU09OIGRhcyBlbnRpZGFkZXNcbuKUlOKUgOKUgCBBcHAuanN4ICAgICAgICAgIOKAlCBSb3V0ZXIgcHJpbmNpcGFsXG5cbkRFU0lHTiBTWVNURU06XG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcbmluZGV4LmNzcyBkZWZpbmUgQ1NTIHZhcmlhYmxlcyAodG9rZW5zKTpcbuKAoiAtLXRvbWF0by1vcmFuZ2U6ICNFODdBNUEg4oCUIGNvciBwcmltw6FyaWFcbuKAoiAtLWNyZWFtOiAjRkJGN0Y0IOKAlCBiYWNrZ3JvdW5kIHByaW5jaXBhbFxu4oCiIC0td2FybS1iZzogI0Y1RUZFOSDigJQgYmFja2dyb3VuZCBzZWN1bmTDoXJpb1xu4oCiIEZvbnRlOiBJbnRlciAoR29vZ2xlIEZvbnRzKVxu4oCiIEJvcmRlciByYWRpdXM6IDFyZW0gKC0tcmFkaXVzKVxu4oCiIE1vZG8gZXNjdXJvOiBzdXBvcnRhZG8gdmlhIC5kYXJrIGNsYXNzXG5cbnRhaWx3aW5kLmNvbmZpZy5qcyBtYXBlaWEgb3MgdG9rZW5zIHBhcmEgY2xhc3NlcyBUYWlsd2luZDpcbuKAoiBiZy1jcmVhbSwgdGV4dC1wcmltYXJ5LCBib3JkZXItYm9yZGVyLCBldGMuXG5cbkVTVEFETyBHTE9CQUw6XG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcbkZvY3VzVGltZXJDb250ZXh0IChSZWFjdCBDb250ZXh0KTpcbuKAoiBwaGFzZTogXCJmb2N1c1wiIHwgXCJzaG9ydEJyZWFrXCIgfCBcImxvbmdCcmVha1wiXG7igKIgcmVtYWluaW5nU2Vjb25kcywgdG90YWxTZWNvbmRzLCBpc1J1bm5pbmdcbuKAoiBjeWNsZUluZGV4ICgwLTMpLCBzZXNzaW9uQ29tcGxldGVkXG7igKIgZm9jdXNNaW4sIHNob3J0QnJlYWtNaW4sIGxvbmdCcmVha01pbiAoZG8gcGVyZmlsKVxu4oCiIGhhbmRsZVBsYXlQYXVzZSgpLCBoYW5kbGVTa2lwKCksIGFkdmFuY2VQaGFzZSgpXG7igKIgUGVyc2lzdGUgZW50cmUgbmF2ZWdhw6fDtWVzIOKAlCB0aW1lciBjb250aW51YSBlbSBiYWNrZ3JvdW5kXG5cblJlYWN0IFF1ZXJ5IChAdGFuc3RhY2svcmVhY3QtcXVlcnkpOlxu4oCiIENhY2hlIGRlIGRhZG9zIGRvIHNlcnZpZG9yIGNvbSBpbnZhbGlkYcOnw6NvIGF1dG9tw6F0aWNhXG7igKIgcXVlcnlDbGllbnRJbnN0YW5jZSBlbSBsaWIvcXVlcnktY2xpZW50LmpzXG7igKIgVXNhZG8gZW0gVGFza0JvYXJkIHBhcmEgY2FjaGUgZGUgdGFyZWZhcy90YWdzXG5gXG59LFxue1xuICBpZDogXCJzZWN1cml0eVwiLFxuICBpY29uOiBMb2NrLFxuICBjb2xvcjogXCIjRUY0NDQ0XCIsXG4gIHRpdGxlOiBcIjguIFNlZ3VyYW7Dp2EgZSBSZWdyYXMgZGUgQWNlc3NvXCIsXG4gIGNvbnRlbnQ6IGBcbkFVVEVOVElDQcOHw4NPIEUgQVVUT1JJWkHDh8ODTzpcbuKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgVxuMS4gVG9kb3Mgb3MgZW5kcG9pbnRzIGRhIEFQSSByZXF1ZXJlbSBhdXRlbnRpY2HDp8OjbyB2aWEgSldUIEJlYXJlciB0b2tlblxuMi4gVG9rZW5zIHPDo28gZ2VyYWRvcyBwZWxhIEJhc2U0NCBjb20gZXhwaXJhw6fDo28gZSByb3Rhw6fDo28gYXV0b23DoXRpY2FcbjMuIEhUVFBTIG9icmlnYXTDs3JpbyDigJQgYSBwbGF0YWZvcm1hIG7Do28gYWNlaXRhIGNvbmV4w7VlcyBuw6NvIGVuY3JpcHRhZGFzXG5cblJPVy1MRVZFTCBTRUNVUklUWSAoUkxTKTpcbuKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgVxuUG9yIGRlZmF1bHQgKHNlbSBjb25maWd1cmHDp8OjbyBtYW51YWwpLCBjYWRhIHV0aWxpemFkb3IgYXBlbmFzOlxu4oCiIExJU1RBIGFwZW5hcyBvcyByZWdpc3RvcyBvbmRlIGNyZWF0ZWRfYnlfaWQgPSB1c2VyLmlkXG7igKIgQ1JJQSByZWdpc3RvcyBjb20gY3JlYXRlZF9ieV9pZCA9IHVzZXIuaWQgYXV0b21hdGljYW1lbnRlXG7igKIgQVRVQUxJWkEgYXBlbmFzIG9zIHNldXMgcHLDs3ByaW9zIHJlZ2lzdG9zXG7igKIgRUxJTUlOQSBhcGVuYXMgb3Mgc2V1cyBwcsOzcHJpb3MgcmVnaXN0b3NcblxuRXhjZcOnw7VlczpcbuKAoiBVdGlsaXphZG9yZXMgY29tIHJvbGU9XCJhZG1pblwiIHTDqm0gYWNlc3NvIGEgVE9ET1Mgb3MgcmVnaXN0b3NcbuKAoiBBIGVudGlkYWRlIFVzZXIgdGVtIFJMUyBlc3BlY2lhbDogYWRtaW4gYWNlc3NhIHRvZG9zLCB1c2VyIGFwZW5hcyBvIHByw7NwcmlvXG5cblZBTElEQcOHw4NPIERFIERBRE9TOlxu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG7igKIgQ2FtcG9zIFwicmVxdWlyZWRcIiBubyBKU09OIFNjaGVtYSBzw6NvIHZhbGlkYWRvcyBubyBzZXJ2aWRvclxu4oCiIFRpcG9zIGRlIGRhZG9zIHPDo28gdmVyaWZpY2Fkb3MgKHN0cmluZywgbnVtYmVyLCBib29sZWFuLCBldGMuKVxu4oCiIENhbXBvcyBlbnVtIHPDo28gdmFsaWRhZG9zIGNvbnRyYSBvcyB2YWxvcmVzIHBlcm1pdGlkb3NcbuKAoiBJbmplw6fDo28gZGUgU1FMIG7Do28gw6kgcG9zc8OtdmVsIChPUk0gZ2VyaWRvIHBlbGEgQmFzZTQ0KVxuXG5QUk9URcOHw4NPIENTUkY6XG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcbuKAoiBUb2tlbnMgQ1NSRiBzw6NvIGdlcmlkb3MgYXV0b21hdGljYW1lbnRlIHBlbG8gU0RLXG7igKIgU2FtZVNpdGUgY29va2llcyBjb20gZmxhZyBTZWN1cmVcbuKAoiBPcmlnaW4gdmFsaWRhdGlvbiBub3MgcmVxdWVzdHNcblxuVVBMT0FEIERFIEZJQ0hFSVJPUzpcbuKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgVxu4oCiIEZpY2hlaXJvcyBjYXJyZWdhZG9zIHZpYSBVcGxvYWRGaWxlIHPDo28gZXNjYW5lYWRvc1xu4oCiIFVSTHMgcMO6YmxpY29zIHPDo28gcGVybWFuZW50ZXMgZSBpbXV0w6F2ZWlzXG7igKIgRmljaGVpcm9zIHByaXZhZG9zIHJlcXVlcmVtIHNpZ25lZCBVUkwgY29tIGV4cGlyYcOnw6NvXG5cblJBVEUgTElNSVRJTkc6XG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcbuKAoiBBIEFQSSB0ZW0gcmF0ZSBsaW1pdGluZyBwb3IgdXRpbGl6YWRvclxu4oCiIEludGVncmHDp8O1ZXMgKExMTSwgVHJhbnNjcmnDp8OjbykgdMOqbSBjcsOpZGl0b3MgbWVuc2FpcyBwb3IgcGxhbm9cbuKAoiBDcsOpZGl0b3MgZGUgaW50ZWdyYcOnw6NvIHPDo28gcmVub3ZhZG9zIG1lbnNhbG1lbnRlXG5cbkRBRE9TIEVNIFJFUE9VU08gRSBUUsOCTlNJVE86XG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcbuKAoiBUb2RvcyBvcyBkYWRvcyBlbSByZXBvdXNvIHPDo28gZW5jcmlwdGFkb3MgKEFFUy0yNTYpXG7igKIgRGFkb3MgZW0gdHLDom5zaXRvOiBUTFMgMS4zXG7igKIgQmFja3VwcyBhdXRvbcOhdGljb3MgZGnDoXJpb3NcbuKAoiBDb25mb3JtaWRhZGUgR0RQUiDigJQgdXRpbGl6YWRvcmVzIHBvZGVtIHNvbGljaXRhciBlbGltaW5hw6fDo28gZGUgZGFkb3NcbmBcbn0sXG57XG4gIGlkOiBcInB3YVwiLFxuICBpY29uOiBSZWZyZXNoQ3csXG4gIGNvbG9yOiBcIiMxNEI4QTZcIixcbiAgdGl0bGU6IFwiOS4gUHJvZ3Jlc3NpdmUgV2ViIEFwcCAoUFdBKVwiLFxuICBjb250ZW50OiBgXG5PIEZvY3VzRmxvdyDDqSBkaXN0cmlidcOtZG8gY29tbyBQV0EsIHBlcm1pdGluZG8gaW5zdGFsYcOnw6NvIGVtIGRpc3Bvc2l0aXZvcyBtw7N2ZWlzXG5lIGRlc2t0b3Agc2VtIG5lY2Vzc2lkYWRlIGRlIGFwcCBzdG9yZXMuXG5cbk1BTklGRVNUIChwdWJsaWMvbWFuaWZlc3QuanNvbik6XG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcbntcbiAgXCJuYW1lXCI6IFwiRm9jdXNGbG93XCIsXG4gIFwic2hvcnRfbmFtZVwiOiBcIkZvY3VzRmxvd1wiLFxuICBcInRoZW1lX2NvbG9yXCI6IFwiI0U4N0E1QVwiLFxuICBcImJhY2tncm91bmRfY29sb3JcIjogXCIjRkJGN0Y0XCIsXG4gIFwiZGlzcGxheVwiOiBcInN0YW5kYWxvbmVcIixcbiAgXCJvcmllbnRhdGlvblwiOiBcInBvcnRyYWl0XCJcbn1cblxuSU5TVEFMQcOHw4NPOlxu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG7igKIgaU9TOiBTYWZhcmkg4oaSIFBhcnRpbGhhciDihpIgQWRpY2lvbmFyIGFvIEVjcsOjIEluaWNpYWxcbuKAoiBBbmRyb2lkOiBDaHJvbWUg4oaSIE1lbnUg4oaSIEluc3RhbGFyIEFwcFxu4oCiIERlc2t0b3A6IENocm9tZS9FZGdlIOKGkiDDrWNvbmUgZGUgaW5zdGFsYcOnw6NvIG5hIGJhcnJhIGRlIGVuZGVyZcOnb1xuXG5DQVBBQ0lEQURFUyBPRkZMSU5FOlxu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG7igKIgU2VydmljZSBXb3JrZXIgcGFyYSBjYWNoZSBkZSBhc3NldHMgZXN0w6F0aWNvc1xu4oCiIEEgYXBwIGZ1bmNpb25hIG9mZmxpbmUgcGFyYSBmdW5jaW9uYWxpZGFkZXMgc2VtIEFQSVxu4oCiIFNpbmNyb25pemHDp8OjbyBhdXRvbcOhdGljYSBxdWFuZG8gcmVjb25lY3RhXG5cbk5PVElGSUNBw4fDlUVTIFBVU0g6XG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcbkltcGxlbWVudGFkYXMgdmlhIFdlYiBOb3RpZmljYXRpb25zIEFQSSAobsOjbyBwdXNoIHNlcnZlci1zaWRlKTpcbuKAoiBQZWRpZG8gZGUgcGVybWlzc8OjbyBuYSBwcmltZWlyYSBzZXNzw6NvIGRlIGZvY28gY29tcGxldGFkYVxu4oCiIE5vdGlmaWNhw6fDo28gcXVhbmRvIHRpbWVyIGRlIGZvY28gdGVybWluYVxu4oCiIE5vdGlmaWNhw6fDo28gcXVhbmRvIHBhdXNhIHRlcm1pbmFcbuKAoiBDb25maWd1csOhdmVsIG5hcyBkZWZpbmnDp8O1ZXMgKGF0aXZvL2luYXRpdm8gKyBzb20pXG5cblNvbnMgZGUgbm90aWZpY2HDp8OjbzogY29uZmlndXJhw6fDo28gZ3VhcmRhZGEgbm8gcGVyZmlsIGRvIHV0aWxpemFkb3IuXG5cbkdFU1RPUyBUT1VDSDpcbuKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgVxuVG9kYSBhIG5hdmVnYcOnw6NvIHN1cG9ydGEgdG91Y2ggbmF0aXZvOlxu4oCiIG9uVG91Y2hTdGFydCAvIG9uVG91Y2hNb3ZlIC8gb25Ub3VjaEVuZCBwYXJhIHN3aXBlc1xu4oCiIEZlZWRiYWNrIHZpc3VhbCBjb20gdHJhbnNmb3JtIHRyYW5zbGF0ZSBkdXJhbnRlIGFycmFzdG9cbuKAoiBUaHJlc2hvbGQgZGUgNjBweCBwYXJhIGNvbmZpcm1hciBzd2lwZVxu4oCiIENvbXBhdMOtdmVsIGNvbSBpT1MgU2FmYXJpLCBBbmRyb2lkIENocm9tZSwgU2Ftc3VuZyBJbnRlcm5ldFxuXG5QRVJGT1JNQU5DRTpcbuKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgVxu4oCiIENvZGUgc3BsaXR0aW5nIGF1dG9tw6F0aWNvIHBvciByb3RhIChWaXRlIGxhenkgbG9hZGluZylcbuKAoiBJbWFnZW5zIG90aW1pemFkYXMgdmlhIENETlxu4oCiIEZvbnRlcyBjYXJyZWdhZGFzIHZpYSBHb29nbGUgRm9udHMgY29tIHByZWNvbm5lY3RcbuKAoiBBbmltYcOnw7VlcyBlbSBHUFUgKHRyYW5zZm9ybS9vcGFjaXR5IHZpYSBGcmFtZXIgTW90aW9uKVxu4oCiIFJlYWN0IFF1ZXJ5IGV2aXRhIHJlLWZldGNoZXMgZGVzbmVjZXNzw6FyaW9zXG5gXG59LFxue1xuICBpZDogXCJmbG93c1wiLFxuICBpY29uOiBTZXJ2ZXIsXG4gIGNvbG9yOiBcIiNGOTczMTZcIixcbiAgdGl0bGU6IFwiMTAuIEZsdXhvcyBkZSBEYWRvcyBQcmluY2lwYWlzXCIsXG4gIGNvbnRlbnQ6IGBcbkZMVVhPIDE6IEdyYXZhw6fDo28gZSBBbsOhbGlzZSBkZSBSZXVuacOjb1xu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG4xLiBVdGlsaXphZG9yIHByaW1lIGJvdMOjbyDihpIgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoe2F1ZGlvOiB0cnVlfSlcbjIuIE1lZGlhUmVjb3JkZXIgZ3JhdmEgY2h1bmtzIGRlIMOhdWRpbyAoZm9ybWF0bzogYXVkaW8vd2VibSlcbjMuIFV0aWxpemFkb3IgcGFyYSBncmF2YcOnw6NvIOKGkiBCbG9iIGNyaWFkbyBkb3MgY2h1bmtzXG40LiBiYXNlNDQuaW50ZWdyYXRpb25zLkNvcmUuVXBsb2FkRmlsZSh7ZmlsZTogYXVkaW9CbG9ifSlcbiAgIOKGkiDDgXVkaW8gY2FycmVnYWRvIHBhcmEgQ0ROLCByZXRvcm5hIGZpbGVfdXJsXG41LiBiYXNlNDQuaW50ZWdyYXRpb25zLkNvcmUuVHJhbnNjcmliZUF1ZGlvKHthdWRpb191cmw6IGZpbGVfdXJsfSlcbiAgIOKGkiBXaGlzcGVyIHByb2Nlc3NhIMOhdWRpbywgcmV0b3JuYSBzdHJpbmcgY29tIHRyYW5zY3Jpw6fDo29cbjYuIGJhc2U0NC5pbnRlZ3JhdGlvbnMuQ29yZS5JbnZva2VMTE0oe3Byb21wdDogLi4uLCByZXNwb25zZV9qc29uX3NjaGVtYTogLi4ufSlcbiAgIOKGkiBHUFQtNG8gYW5hbGlzYSB0cmFuc2NyacOnw6NvLCByZXRvcm5hIHtzdW1tYXJ5LCBhY3Rpb25faXRlbXMsIGRlYWRsaW5lcywgbWluZF9tYXAsIHRpdGxlfVxuNy4ganNQREYgZ2VyYSBQREYgY29tIHRvZG9zIG9zIGRhZG9zIGRhIGFuw6FsaXNlXG44LiBiYXNlNDQuaW50ZWdyYXRpb25zLkNvcmUuVXBsb2FkRmlsZSh7ZmlsZTogcGRmQmxvYn0pXG4gICDihpIgUERGIGNhcnJlZ2FkbyBwYXJhIENETiwgcmV0b3JuYSBwZGZfdXJsXG45LiBiYXNlNDQuZW50aXRpZXMuTWVldGluZ1JlY29yZGluZy5jcmVhdGUoey4uLmFuw6FsaXNlLCBwZGZfdXJsLCBhdWRpb19kdXJhdGlvbl9zZWNvbmRzfSlcbiAgIOKGkiBSZWdpc3RvIGd1YXJkYWRvIG5hIGJhc2UgZGUgZGFkb3NcblxuRkxVWE8gMjogVGltZXIgUG9tb2Rvcm9cbuKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgVxuMS4gRm9jdXNUaW1lckNvbnRleHQgbWFudMOpbSBlc3RhZG8gZ2xvYmFsIGVtIFJlYWN0IENvbnRleHRcbjIuIGhhbmRsZVBsYXlQYXVzZSgpIGluaWNpYSBzZXRJbnRlcnZhbCBkZSAxIHNlZ3VuZG9cbjMuIENhZGEgdGljazogcmVtYWluaW5nU2Vjb25kcy0tXG40LiBRdWFuZG8gcmVtYWluaW5nU2Vjb25kcyA9PT0gMDogc2Vzc2lvbkNvbXBsZXRlZCA9IHRydWVcbjUuIEZvY3VzUG9tby5qc3ggZGV0ZXRhIHNlc3Npb25Db21wbGV0ZWQgdmlhIHVzZUVmZmVjdFxuNi4gYmFzZTQ0LmVudGl0aWVzLkZvY3VzU2Vzc2lvbi5jcmVhdGUoey4uLn0pIOKAlCBzZXNzw6NvIHJlZ2lzdGFkYVxuNy4gTm90aWZpY2HDp8OjbyBwdXNoIGVudmlhZGEgc2UgcGVybWl0aWRvXG44LiBjb21wbGV0ZWRPcmFuZ2VzKysg4oaSIE9yYW5nZUNhbnZhcyBhbmltYSBub3ZhIGxhcmFuamFcbjkuIGFkdmFuY2VQaGFzZSgpIOKGkiBwcsOzeGltYSBmYXNlIChmb2N1cyDihpIgc2hvcnRCcmVhayDihpIgbG9uZ0JyZWFrKVxuXG5GTFVYTyAzOiBIw6FiaXRvcyBlIEdhbWlmaWNhw6fDo29cbuKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgVxuMS4gSGFiaXRzLmpzeCBjYXJyZWdhIEhhYml0Lmxpc3QoKSBlIEhhYml0RW50cnkuZmlsdGVyKHtkYXRlOiB0b2RheX0pXG4yLiBUZXRyaXNHcmlkIHJlbmRlcml6YSBow6FiaXRvcyBjb21vIGJsb2NvcyBjb2xvcmlkb3NcbjMuIFV0aWxpemFkb3IgdG9jYSBudW0gaMOhYml0byDihpIgSGFiaXRFbnRyeS5jcmVhdGUoe2hhYml0X2lkLCBzY29yZSwgZGF0ZX0pXG40LiBTY29yZSDDqSBzb21hZG8gYW8gdG90YWwgZGnDoXJpb1xuNS4gSGFiaXRzQW5hbHl0aWNzIGFncmVnYSBIYWJpdEVudHJ5Lmxpc3QoKSBwb3Igc2VtYW5hL2jDoWJpdG9cbjYuIEhhYml0c1Jld2FyZHMgY2FsY3VsYSBzdHJlYWs6IGRpYXMgY29uc2VjdXRpdm9zIGNvbSBwZWxvIG1lbm9zIDEgZW50cmFkYVxuNy4gQ29ucXVpc3RhcyBkZXNibG9xdWVhZGFzIGJhc2VhZGFzIGVtIHRocmVzaG9sZHMgZGUgc2NvcmUvc3RyZWFrXG5cbkZMVVhPIDQ6IFRhc2tCb2FyZCBLYW5iYW5cbuKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgVxuMS4gVGFyZWZhcyBmaWx0cmFkYXMgcG9yIHdlZWtfc3RhcnQgKGZvcm1hdG86IFwieXl5eS1NTS1kZFwiKVxuMi4gQWdydXBhZGFzIHBvciB3ZWVrZGF5IGVtIGNvbHVuYXMgKG1vbmRheS4uc3VuZGF5LCBub25lKVxuMy4gQGhlbGxvLXBhbmdlYS9kbmQgZ2VyZSBkcmFnLWFuZC1kcm9wXG40LiBvbkRyYWdFbmQ6IFRhc2sudXBkYXRlKGlkLCB7d2Vla2RheTogbmV3Q29sdW1uLCBvcmRlcjogbmV3SW5kZXh9KVxuNS4gUmUtb3JkZW5hw6fDo28gZW0gYmF0Y2g6IHVwZGF0ZSBvcmRlciBwYXJhIGNhZGEgdGFyZWZhIG5hIGNvbHVuYVxuNi4gVGFncyBndWFyZGFkYXMgY29tbyBKU09OIHN0cmluZyBlbSB0YWdzX2pzb24gKGFycmF5IHNlcmlhbGl6YWRvKVxuXG5GTFVYTyA1OiBDb250cm9sbyBkZSBEYXRhc1xu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG4xLiBEdWFzIHRhYnM6IFByYXpvcyAoRGVhZGxpbmUpIGUgRXZlbnRvcyAoRXZlbnQpXG4yLiBQcmF6b3M6IHVtYSBkYXRhL2hvcmEgbGltaXRlIOKAlCB1cmfDqm5jaWEgY2FsY3VsYWRhIGNvbSBkaWZmZXJlbmNlSW5EYXlzXG4zLiBFdmVudG9zOiBzdGFydF9kYXRldGltZSArIGVuZF9kYXRldGltZVxuICAg4oaSIER1cmHDp8OjbyBjYWxjdWxhZGE6IGRpZmZlcmVuY2VJbk1pbnV0ZXMoZW5kLCBzdGFydClcbiAgIOKGkiBGb3JtYXRhZGE6IFggZGlhcywgWGggWW1pbiwgWG1pblxuNC4gRmlsdHJvczogdXBjb21pbmcgKGZ1dHVyby9ob2plKSB2cyBleHBpcmVkL3Bhc3NhZG9zXG41LiBDYXJkcyBjb20gYmFycmEgZGUgY29yIG5vIHRvcG8gKGFjY2VudCB2aXN1YWwpXG5gXG59LFxue1xuICBpZDogXCJhbmFseXRpY3NcIixcbiAgaWNvbjogTGF5ZXJzLFxuICBjb2xvcjogXCIjODRDQzE2XCIsXG4gIHRpdGxlOiBcIjExLiBBbmFseXRpY3MgZSBNw6l0cmljYXNcIixcbiAgY29udGVudDogYFxuQU5BTFlUSUNTIElOVEVHUkFETyAoQmFzZTQ0KTpcbuKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgVxuQSBhcHAgdXNhIGJhc2U0NC5hbmFseXRpY3MudHJhY2soKSBwYXJhIHJhc3RyZWFyIGV2ZW50b3MgcGVyc29uYWxpemFkb3MuXG5PcyBkYWRvcyBzw6NvIHZpc8OtdmVpcyBubyBkYXNoYm9hcmQgZGEgQmFzZTQ0LlxuXG5BUEk6XG5iYXNlNDQuYW5hbHl0aWNzLnRyYWNrKHtcbiAgZXZlbnROYW1lOiBzdHJpbmcsXG4gIHByb3BlcnRpZXM/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuIHwgbnVsbD5cbn0pXG5cbkZPQ08gQU5BTFlUSUNTIChGb2N1c0FuYWx5dGljcy5qc3gpOlxu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG5EYWRvcyBwcm9jZXNzYWRvcyBsb2NhbG1lbnRlIGEgcGFydGlyIGRlIEZvY3VzU2Vzc2lvbi5saXN0KCk6XG5cbk3DqXRyaWNhcyBjYWxjdWxhZGFzOlxu4oCiIHNlc3Npb25zVG9kYXk6IEZvY3VzU2Vzc2lvbnMgZG8gZGlhIGF0dWFsXG7igKIgc2Vzc2lvbnNUaGlzV2VlazogRm9jdXNTZXNzaW9ucyBkb3Mgw7psdGltb3MgNyBkaWFzXG7igKIgdG90YWxIb3Vyczogc3VtKGR1cmF0aW9uX21pbnV0ZXMpIC8gNjBcbuKAoiBjdXJyZW50U3RyZWFrOiBkaWFzIGNvbnNlY3V0aXZvcyBjb20gcGVsbyBtZW5vcyAxIHNlc3PDo29cbuKAoiBkYWlseURhdGE6IGFycmF5IFt7ZGF0ZSwgc2Vzc2lvbnMsIG1pbnV0ZXN9XSBwYXJhIGdyw6FmaWNvc1xu4oCiIGhvdXJseURpc3Q6IGRpc3RyaWJ1acOnw6NvIHBvciBob3JhIGRvIGRpYSAoYmFyIGNoYXJ0KVxu4oCiIHRhZ0Rpc3Q6IGRpc3RyaWJ1acOnw6NvIHBvciB0YWcvY2F0ZWdvcmlhIChwaWUgY2hhcnQpXG5cbkJpYmxpb3RlY2FzIGRlIHZpc3VhbGl6YcOnw6NvOiByZWNoYXJ0c1xu4oCiIEFyZWFDaGFydDogdGVuZMOqbmNpYSBkacOhcmlhIGRlIHNlc3PDtWVzXG7igKIgQmFyQ2hhcnQ6IGRpc3RyaWJ1acOnw6NvIHBvciBob3JhXG7igKIgUGllQ2hhcnQ6IGRpc3RyaWJ1acOnw6NvIHBvciB0YWdzXG5cbkjDgUJJVE9TIEFOQUxZVElDUyAoSGFiaXRzQW5hbHl0aWNzLmpzeCk6XG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcbkRhZG9zIGRlIEhhYml0RW50cnkubGlzdCgpOlxu4oCiIHdlZWtseURhdGE6IGFncnVwYWRvIHBvciBzZW1hbmEgKMO6bHRpbWFzIDggc2VtYW5hcylcbuKAoiBoYWJpdFJhbmtpbmc6IG9yZGVuYWRvIHBvciBmcmVxdcOqbmNpYSBkZSBjb21wbGV0YcOnw6NvXG7igKIgdG90YWxTY29yZTogc29tYSBkZSB0b2RvcyBvcyBzY29yZXNcbuKAoiBhdmdEYWlseVNjb3JlOiBtw6lkaWEgZGnDoXJpYVxu4oCiIGJlc3RIYWJpdCAvIHdvcnN0SGFiaXQ6IHJhbmtpbmcgZXh0cmVtb3NcblxuR0FNSUZJQ0HDh8ODTyAoSGFiaXRzUmV3YXJkcy5qc3gpOlxu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG5Db25xdWlzdGFzIGNvbSB0aHJlc2hvbGRzOlxu4oCiIPCfjLEgUHJpbWVpcmEgU2VtZW50ZTogMSBow6FiaXRvIGNvbXBsZXRhZG9cbuKAoiDwn5SlIEVtIENoYW1hczogc3RyZWFrIGRlIDMgZGlhc1xu4oCiIPCfko4gRGlhbWFudGU6IDEwMCBwb250b3MgdG90YWlzXG7igKIg8J+PhiBDYW1wZcOjbzogNTAwIHBvbnRvcyB0b3RhaXNcbuKAoiDimqEgUmVsw6JtcGFnbzogc3RyZWFrIGRlIDcgZGlhc1xu4oCiIPCfkZEgUmVpIGRvcyBIw6FiaXRvczogc3RyZWFrIGRlIDMwIGRpYXNcblxuQ8OhbGN1bG8gZGUgc3RyZWFrOiBpdGVyYSBIYWJpdEVudHJ5IG9yZGVuYWRhcyBwb3IgZGF0YSxcbmNvbnRhIGRpYXMgY29uc2VjdXRpdm9zIHNlbSBxdWVicmEuXG5gXG59LFxue1xuICBpZDogXCJkZXBsb3ltZW50XCIsXG4gIGljb246IEdsb2JlLFxuICBjb2xvcjogXCIjNjM2NkYxXCIsXG4gIHRpdGxlOiBcIjEyLiBEZXBsb3ksIEhvc3RpbmcgZSBDb25maWd1cmHDp8Ojb1wiLFxuICBjb250ZW50OiBgXG5QTEFUQUZPUk1BIERFIEhPU1RJTkc6XG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcbk8gRm9jdXNGbG93IMOpIGhvc3BlZGFkbyBpbnRlaXJhbWVudGUgbmEgaW5mcmFlc3RydXR1cmEgQmFzZTQ0LlxuTsOjbyByZXF1ZXIgY29uZmlndXJhw6fDo28gZGUgc2Vydmlkb3JlcywgQ0kvQ0QsIG91IGdlc3TDo28gZGUgaW5mcmFlc3RydXR1cmEuXG5cblBST0NFU1NPIERFIERFUExPWTpcbuKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgVxuMS4gQ8OzZGlnbyBlZGl0YWRvIG5vIGVkaXRvciBCYXNlNDQgKGJyb3dzZXItYmFzZWQpXG4yLiBCdWlsZCBhdXRvbcOhdGljbyB2aWEgVml0ZSBhbyBndWFyZGFyIGFsdGVyYcOnw7Vlc1xuMy4gUHJldmlldyBlbSB0ZW1wbyByZWFsIG5vIHBhaW5lbCBkaXJlaXRvXG40LiBQdWJsaWNhw6fDo286IHVtIGNsaXF1ZSBubyBkYXNoYm9hcmQgQmFzZTQ0XG41LiBVUkwgYXV0b23DoXRpY286ICouYmFzZTQ0LmFwcFxuNi4gRG9tw61uaW8gcGVyc29uYWxpemFkbzogY29uZmlndXLDoXZlbCBuYXMgZGVmaW5pw6fDtWVzIGRhIGFwcFxuXG5WQVJJw4FWRUlTIERFIEFNQklFTlRFOlxu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG5Ow6NvIHPDo28gbmVjZXNzw6FyaWFzIHZhcmnDoXZlaXMgZGUgYW1iaWVudGUgbWFudWFpcy5cbk8gU0RLIEJhc2U0NCDDqSBjb25maWd1cmFkbyBhdXRvbWF0aWNhbWVudGUgY29tIGFzIGNyZWRlbmNpYWlzIGRhIGFwcC5cblNlZ3JlZG9zIHPDo28gZ2VyaWRvcyBwZWxhIHBsYXRhZm9ybWEgKFNlY3JldHMgTWFuYWdlciBpbnRlZ3JhZG8pLlxuXG5CVUlMRCBUT09MOlxu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG7igKIgVml0ZSA1IOKAlCBidW5kbGVyIHVsdHJhcnLDoXBpZG9cbuKAoiBAYmFzZTQ0L3ZpdGUtcGx1Z2luIOKAlCBpbnRlZ3Jhw6fDo28gY29tIG8gcnVudGltZSBCYXNlNDRcbuKAoiBIb3QgTW9kdWxlIFJlcGxhY2VtZW50IChITVIpIHBhcmEgZGVzZW52b2x2aW1lbnRvXG7igKIgVHJlZS1zaGFraW5nIGF1dG9tw6F0aWNvXG7igKIgQ29kZSBzcGxpdHRpbmcgcG9yIHJvdGFcblxuREVQRU5Ew4pOQ0lBUyBQUklOQ0lQQUlTOlxu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG5yZWFjdEAxOC4yLjBcbnJlYWN0LXJvdXRlci1kb21ANi4yNi4wXG5AdGFuc3RhY2svcmVhY3QtcXVlcnlANS44NC4xXG5mcmFtZXItbW90aW9uQDExLjE2LjRcbkBoZWxsby1wYW5nZWEvZG5kQDE3LjAuMFxudGFpbHdpbmRjc3MgKMO6bHRpbW8pXG5sdWNpZGUtcmVhY3RAMC40NzUuMFxuZGF0ZS1mbnNAMy42LjBcbnJlY2hhcnRzQDIuMTUuNFxuanNwZGZANC4yLjFcbnJlYWN0LW1hcmtkb3duQDkuMC4xXG5cbkxJTUlURVMgRSBRVU9UQVMgKHBsYW5vIEJhc2U0NCk6XG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcbuKAoiBSZWdpc3RvcyBwb3IgZW50aWRhZGU6IGlsaW1pdGFkbyAocGxhbm8gcGFnbylcbuKAoiBTdG9yYWdlOiB2YXJpw6F2ZWwgcG9yIHBsYW5vXG7igKIgQ3LDqWRpdG9zIGRlIGludGVncmHDp8OjbzogcmVub3ZhZG9zIG1lbnNhbG1lbnRlXG7igKIgVXRpbGl6YWRvcmVzIHNpbXVsdMOibmVvczogc2VtIGxpbWl0ZVxu4oCiIEJhbmR3aWR0aDogQ0ROIGdsb2JhbCBzZW0gbGltaXRlIG5vIHBsYW5vIHBhZ29cblxuTU9OSVRPUklaQcOHw4NPOlxu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG7igKIgTG9ncyBkZSBlcnJvIHZpc8OtdmVpcyBubyBkYXNoYm9hcmQgQmFzZTQ0XG7igKIgQW5hbHl0aWNzIGRlIHV0aWxpemHDp8OjbyBpbnRlZ3JhZG9cbuKAoiBBbGVydGFzIGRlIHF1b3RhIGRlIGNyw6lkaXRvcyBjb25maWd1csOhdmVpc1xu4oCiIFVwdGltZSBnYXJhbnRpZG8gcGVsbyBTTEEgQmFzZTQ0ICg5OS45JSlcbmBcbn1dO1xuXG5cbmZ1bmN0aW9uIFNlY3Rpb24oeyBzZWN0aW9uLCBkZWZhdWx0T3BlbiA9IGZhbHNlLCBcImRhdGEtY29sbGVjdGlvbi1pdGVtLWlkXCI6IF9fZGF0YUNvbGxlY3Rpb25JdGVtSWQgfSkge1xuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShkZWZhdWx0T3Blbik7XG4gIGNvbnN0IEljb24gPSBzZWN0aW9uLmljb247XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRXhwb3J0RG9jczo3ODk6NFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItYm9yZGVyIHNoYWRvdy1zbSBvdmVyZmxvdy1oaWRkZW5cIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17X19kYXRhQ29sbGVjdGlvbkl0ZW1JZH0+XG4gICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRXhwb3J0RG9jczo3OTA6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICBvbkNsaWNrPXsoKSA9PiBzZXRPcGVuKCFvcGVuKX1cbiAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcC00IGhvdmVyOmJnLXNlY29uZGFyeS8zMCB0cmFuc2l0aW9uLWNvbG9yc1wiPlxuICAgICAgICBcbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0V4cG9ydERvY3M6Nzk0OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9FeHBvcnREb2NzOjc5NToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInctOSBoLTkgcm91bmRlZC14bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiIHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogc2VjdGlvbi5jb2xvciArIFwiMTVcIiB9fT5cbiAgICAgICAgICAgIDxJY29uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRXhwb3J0RG9jczo3OTY6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ3LTQuNSBoLTQuNVwiIHN0eWxlPXt7IGNvbG9yOiBzZWN0aW9uLmNvbG9yIH19IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9FeHBvcnREb2NzOjc5ODoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtZm9yZWdyb3VuZCB0ZXh0LWxlZnRcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cInRpdGxlXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e3NlY3Rpb24/LmlkIHx8IHNlY3Rpb24/Ll9pZH0+e3NlY3Rpb24udGl0bGV9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge29wZW4gPyA8Q2hldnJvblVwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRXhwb3J0RG9jczo4MDA6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LW11dGVkLWZvcmVncm91bmRcIiAvPiA6IDxDaGV2cm9uRG93biBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0V4cG9ydERvY3M6ODAwOjc0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCIgLz59XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIHtvcGVuICYmXG4gICAgICA8bW90aW9uLmRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0V4cG9ydERvY3M6ODAzOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBpbml0aWFsPXt7IG9wYWNpdHk6IDAgfX0gYW5pbWF0ZT17eyBvcGFjaXR5OiAxIH19XG4gICAgICBjbGFzc05hbWU9XCJweC00IHBiLTQgYm9yZGVyLXQgYm9yZGVyLWJvcmRlclwiPlxuICAgICAgICAgIDxwcmUgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9FeHBvcnREb2NzOjgwNToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGxlYWRpbmctcmVsYXhlZCB3aGl0ZXNwYWNlLXByZS13cmFwIGZvbnQtbW9ubyBtdC0zIG92ZXJmbG93LXgtYXV0b1wiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiY29udGVudFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtzZWN0aW9uPy5pZCB8fCBzZWN0aW9uPy5faWR9PlxuICAgICAgICAgICAge3NlY3Rpb24uY29udGVudC50cmltKCl9XG4gICAgICAgICAgPC9wcmU+XG4gICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgIH1cbiAgICA8L2Rpdj4pO1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEV4cG9ydERvY3MoKSB7XG4gIGNvbnN0IFtkb3dubG9hZGluZywgc2V0RG93bmxvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZG93bmxvYWRpbmdaaXAsIHNldERvd25sb2FkaW5nWmlwXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBkb3dubG9hZFppcCA9IGFzeW5jICgpID0+IHtcbiAgICBzZXREb3dubG9hZGluZ1ppcCh0cnVlKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgSlNaaXAgPSAoYXdhaXQgaW1wb3J0KFwianN6aXBcIikpLmRlZmF1bHQ7XG4gICAgICBjb25zdCB6aXAgPSBuZXcgSlNaaXAoKTtcblxuICAgICAgLy8gRmV0Y2ggYSBmaWxlIGZyb20gdGhlIFZpdGUgZGV2IHNlcnZlciBhbmQgYWRkIHRvIHppcFxuICAgICAgY29uc3QgYWRkRmV0Y2hlZCA9IGFzeW5jICh6aXBQYXRoLCB1cmwpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwpO1xuICAgICAgICAgIGlmIChyZXMub2spIHppcC5maWxlKHppcFBhdGgsIGF3YWl0IHJlcy50ZXh0KCkpO1xuICAgICAgICB9IGNhdGNoIHt9XG4gICAgICB9O1xuXG4gICAgICAvLyBBbGwgc291cmNlIGZpbGVzIHRvIGluY2x1ZGUgKFZpdGUgc2VydmVzIHRoZXNlIGFzIHJhdyB0ZXh0KVxuICAgICAgY29uc3Qgc3JjRmlsZXMgPSBbXG4gICAgICAvLyBSb290XG4gICAgICBbXCJpbmRleC5odG1sXCIsIFwiL2luZGV4Lmh0bWxcIl0sXG4gICAgICBbXCJpbmRleC5jc3NcIiwgXCIvc3JjL2luZGV4LmNzc1wiXSxcbiAgICAgIFtcInRhaWx3aW5kLmNvbmZpZy5qc1wiLCBcIi90YWlsd2luZC5jb25maWcuanNcIl0sXG4gICAgICBbXCJ2aXRlLmNvbmZpZy5qc1wiLCBcIi92aXRlLmNvbmZpZy5qc1wiXSxcbiAgICAgIFtcInBhY2thZ2UuanNvblwiLCBcIi9wYWNrYWdlLmpzb25cIl0sXG4gICAgICAvLyBwdWJsaWMvXG4gICAgICBbXCJwdWJsaWMvbWFuaWZlc3QuanNvblwiLCBcIi9tYW5pZmVzdC5qc29uXCJdLFxuICAgICAgLy8gc3JjIHJvb3RcbiAgICAgIFtcInNyYy9BcHAuanN4XCIsIFwiL3NyYy9BcHAuanN4XCJdLFxuICAgICAgW1wic3JjL21haW4uanN4XCIsIFwiL3NyYy9tYWluLmpzeFwiXSxcbiAgICAgIC8vIHNyYy9hcGlcbiAgICAgIFtcInNyYy9hcGkvYmFzZTQ0Q2xpZW50LmpzXCIsIFwiL3NyYy9hcGkvYmFzZTQ0Q2xpZW50LmpzXCJdLFxuICAgICAgLy8gc3JjL2xpYlxuICAgICAgW1wic3JjL2xpYi9BdXRoQ29udGV4dC5qc3hcIiwgXCIvc3JjL2xpYi9BdXRoQ29udGV4dC5qc3hcIl0sXG4gICAgICBbXCJzcmMvbGliL3F1ZXJ5LWNsaWVudC5qc1wiLCBcIi9zcmMvbGliL3F1ZXJ5LWNsaWVudC5qc1wiXSxcbiAgICAgIFtcInNyYy9saWIvdXRpbHMuanNcIiwgXCIvc3JjL2xpYi91dGlscy5qc1wiXSxcbiAgICAgIFtcInNyYy9saWIvcGRmU2VjdGlvbnMuanNcIiwgXCIvc3JjL2xpYi9wZGZTZWN0aW9ucy5qc1wiXSxcbiAgICAgIFtcInNyYy9saWIvYXBwLXBhcmFtcy5qc1wiLCBcIi9zcmMvbGliL2FwcC1wYXJhbXMuanNcIl0sXG4gICAgICBbXCJzcmMvbGliL1BhZ2VOb3RGb3VuZC5qc3hcIiwgXCIvc3JjL2xpYi9QYWdlTm90Rm91bmQuanN4XCJdLFxuICAgICAgLy8gc3JjL2NvbnRleHRcbiAgICAgIFtcInNyYy9jb250ZXh0L0ZvY3VzVGltZXJDb250ZXh0LmpzeFwiLCBcIi9zcmMvY29udGV4dC9Gb2N1c1RpbWVyQ29udGV4dC5qc3hcIl0sXG4gICAgICAvLyBzcmMvY29tcG9uZW50c1xuICAgICAgW1wic3JjL2NvbXBvbmVudHMvUHJvdGVjdGVkUm91dGUuanN4XCIsIFwiL3NyYy9jb21wb25lbnRzL1Byb3RlY3RlZFJvdXRlLmpzeFwiXSxcbiAgICAgIFtcInNyYy9jb21wb25lbnRzL1Njcm9sbFRvVG9wLmpzeFwiLCBcIi9zcmMvY29tcG9uZW50cy9TY3JvbGxUb1RvcC5qc3hcIl0sXG4gICAgICBbXCJzcmMvY29tcG9uZW50cy9Gb2N1c1RpbWVyLmpzeFwiLCBcIi9zcmMvY29tcG9uZW50cy9Gb2N1c1RpbWVyLmpzeFwiXSxcbiAgICAgIFtcInNyYy9jb21wb25lbnRzL09yYW5nZUNhbnZhcy5qc3hcIiwgXCIvc3JjL2NvbXBvbmVudHMvT3JhbmdlQ2FudmFzLmpzeFwiXSxcbiAgICAgIFtcInNyYy9jb21wb25lbnRzL1RhZ1BpY2tlci5qc3hcIiwgXCIvc3JjL2NvbXBvbmVudHMvVGFnUGlja2VyLmpzeFwiXSxcbiAgICAgIFtcInNyYy9jb21wb25lbnRzL1VzZXJOb3RSZWdpc3RlcmVkRXJyb3IuanN4XCIsIFwiL3NyYy9jb21wb25lbnRzL1VzZXJOb3RSZWdpc3RlcmVkRXJyb3IuanN4XCJdLFxuICAgICAgW1wic3JjL2NvbXBvbmVudHMvQXV0aExheW91dC5qc3hcIiwgXCIvc3JjL2NvbXBvbmVudHMvQXV0aExheW91dC5qc3hcIl0sXG4gICAgICBbXCJzcmMvY29tcG9uZW50cy9Hb29nbGVJY29uLmpzeFwiLCBcIi9zcmMvY29tcG9uZW50cy9Hb29nbGVJY29uLmpzeFwiXSxcbiAgICAgIFtcInNyYy9jb21wb25lbnRzL2hhYml0cy9UZXRyaXNHcmlkLmpzeFwiLCBcIi9zcmMvY29tcG9uZW50cy9oYWJpdHMvVGV0cmlzR3JpZC5qc3hcIl0sXG4gICAgICAvLyBzcmMvcGFnZXNcbiAgICAgIFtcInNyYy9wYWdlcy9Ib21lLmpzeFwiLCBcIi9zcmMvcGFnZXMvSG9tZS5qc3hcIl0sXG4gICAgICBbXCJzcmMvcGFnZXMvTG9naW4uanN4XCIsIFwiL3NyYy9wYWdlcy9Mb2dpbi5qc3hcIl0sXG4gICAgICBbXCJzcmMvcGFnZXMvUmVnaXN0ZXIuanN4XCIsIFwiL3NyYy9wYWdlcy9SZWdpc3Rlci5qc3hcIl0sXG4gICAgICBbXCJzcmMvcGFnZXMvRm9yZ290UGFzc3dvcmQuanN4XCIsIFwiL3NyYy9wYWdlcy9Gb3Jnb3RQYXNzd29yZC5qc3hcIl0sXG4gICAgICBbXCJzcmMvcGFnZXMvUmVzZXRQYXNzd29yZC5qc3hcIiwgXCIvc3JjL3BhZ2VzL1Jlc2V0UGFzc3dvcmQuanN4XCJdLFxuICAgICAgW1wic3JjL3BhZ2VzL0ZvY3VzUG9tby5qc3hcIiwgXCIvc3JjL3BhZ2VzL0ZvY3VzUG9tby5qc3hcIl0sXG4gICAgICBbXCJzcmMvcGFnZXMvRm9jdXNTZXR0aW5ncy5qc3hcIiwgXCIvc3JjL3BhZ2VzL0ZvY3VzU2V0dGluZ3MuanN4XCJdLFxuICAgICAgW1wic3JjL3BhZ2VzL0ZvY3VzQ2FsZW5kYXIuanN4XCIsIFwiL3NyYy9wYWdlcy9Gb2N1c0NhbGVuZGFyLmpzeFwiXSxcbiAgICAgIFtcInNyYy9wYWdlcy9Gb2N1c0FuYWx5dGljcy5qc3hcIiwgXCIvc3JjL3BhZ2VzL0ZvY3VzQW5hbHl0aWNzLmpzeFwiXSxcbiAgICAgIFtcInNyYy9wYWdlcy9UYXNrQm9hcmQuanN4XCIsIFwiL3NyYy9wYWdlcy9UYXNrQm9hcmQuanN4XCJdLFxuICAgICAgW1wic3JjL3BhZ2VzL0hhYml0cy5qc3hcIiwgXCIvc3JjL3BhZ2VzL0hhYml0cy5qc3hcIl0sXG4gICAgICBbXCJzcmMvcGFnZXMvSGFiaXRzTWFuYWdlLmpzeFwiLCBcIi9zcmMvcGFnZXMvSGFiaXRzTWFuYWdlLmpzeFwiXSxcbiAgICAgIFtcInNyYy9wYWdlcy9IYWJpdHNBbmFseXRpY3MuanN4XCIsIFwiL3NyYy9wYWdlcy9IYWJpdHNBbmFseXRpY3MuanN4XCJdLFxuICAgICAgW1wic3JjL3BhZ2VzL0hhYml0c1Jld2FyZHMuanN4XCIsIFwiL3NyYy9wYWdlcy9IYWJpdHNSZXdhcmRzLmpzeFwiXSxcbiAgICAgIFtcInNyYy9wYWdlcy9EZWFkbGluZXMuanN4XCIsIFwiL3NyYy9wYWdlcy9EZWFkbGluZXMuanN4XCJdLFxuICAgICAgW1wic3JjL3BhZ2VzL01lZXRpbmdBSS5qc3hcIiwgXCIvc3JjL3BhZ2VzL01lZXRpbmdBSS5qc3hcIl0sXG4gICAgICBbXCJzcmMvcGFnZXMvQ29taW5nU29vbi5qc3hcIiwgXCIvc3JjL3BhZ2VzL0NvbWluZ1Nvb24uanN4XCJdLFxuICAgICAgW1wic3JjL3BhZ2VzL0V4cG9ydERvY3MuanN4XCIsIFwiL3NyYy9wYWdlcy9FeHBvcnREb2NzLmpzeFwiXV07XG5cblxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoc3JjRmlsZXMubWFwKChbemlwUGF0aCwgdXJsXSkgPT4gYWRkRmV0Y2hlZCh6aXBQYXRoLCB1cmwpKSk7XG5cbiAgICAgIC8vIOKUgOKUgCBlbnRpdGllcy8g4oCUIGZldGNoIGFjdHVhbCBKU09OIGZpbGVzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuICAgICAgY29uc3QgZW50aXR5TmFtZXMgPSBbXCJUYXNrXCIsIFwiVGFnXCIsIFwiRm9jdXNTZXNzaW9uXCIsIFwiSGFiaXRcIiwgXCJIYWJpdEVudHJ5XCIsIFwiRGVhZGxpbmVcIiwgXCJFdmVudFwiLCBcIk1lZXRpbmdSZWNvcmRpbmdcIl07XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChlbnRpdHlOYW1lcy5tYXAoKG5hbWUpID0+XG4gICAgICBhZGRGZXRjaGVkKGBlbnRpdGllcy8ke25hbWV9Lmpzb25gLCBgL2VudGl0aWVzLyR7bmFtZX0uanNvbmApXG4gICAgICApKTtcblxuICAgICAgLy8g4pSA4pSAIFJFQURNRSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbiAgICAgIGxldCBtZCA9IFwiIyBGb2N1c0Zsb3cg4oCUIERvY3VtZW50YcOnw6NvIFTDqWNuaWNhXFxuXFxuXCI7XG4gICAgICBtZCArPSBgPiBHZXJhZG8gZW06ICR7bmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoXCJwdC1QVFwiKX1cXG5cXG5gO1xuICAgICAgbWQgKz0gXCIjIyBGaWNoZWlyb3MgaW5jbHXDrWRvcyBubyBaSVBcXG5cXG5cIjtcbiAgICAgIG1kICs9IFwiYGBgXFxuZm9jdXNmbG93L1xcbuKUnOKUgOKUgCBpbmRleC5odG1sXFxu4pSc4pSA4pSAIGluZGV4LmNzc1xcbuKUnOKUgOKUgCB0YWlsd2luZC5jb25maWcuanNcXG7ilJzilIDilIAgdml0ZS5jb25maWcuanNcXG7ilJzilIDilIAgcGFja2FnZS5qc29uXFxu4pSc4pSA4pSAIHB1YmxpYy9cXG7ilIIgICDilJTilIDilIAgbWFuaWZlc3QuanNvblxcbuKUnOKUgOKUgCBlbnRpdGllcy8gICAgICAgICAjIEpTT04gU2NoZW1hcyAoOCBlbnRpZGFkZXMpXFxu4pSU4pSA4pSAIHNyYy9cXG4gICAg4pSc4pSA4pSAIEFwcC5qc3hcXG4gICAg4pSc4pSA4pSAIG1haW4uanN4XFxuICAgIOKUnOKUgOKUgCBhcGkvXFxuICAgIOKUnOKUgOKUgCBsaWIvXFxuICAgIOKUnOKUgOKUgCBjb250ZXh0L1xcbiAgICDilJzilIDilIAgY29tcG9uZW50cy9cXG4gICAg4pSU4pSA4pSAIHBhZ2VzLyAgICAgICAgICMgMjAgcMOhZ2luYXNcXG5gYGBcXG5cXG5cIjtcbiAgICAgIFNFQ1RJT05TLmZvckVhY2goKHMpID0+IHtcbiAgICAgICAgbWQgKz0gYCMjICR7cy50aXRsZX1cXG5cXG5cXGBcXGBcXGBcXG4ke3MuY29udGVudC50cmltKCl9XFxuXFxgXFxgXFxgXFxuXFxuLS0tXFxuXFxuYDtcbiAgICAgIH0pO1xuICAgICAgemlwLmZpbGUoXCJSRUFETUUubWRcIiwgbWQpO1xuXG4gICAgICBjb25zdCBibG9iID0gYXdhaXQgemlwLmdlbmVyYXRlQXN5bmMoeyB0eXBlOiBcImJsb2JcIiwgY29tcHJlc3Npb246IFwiREVGTEFURVwiLCBjb21wcmVzc2lvbk9wdGlvbnM6IHsgbGV2ZWw6IDYgfSB9KTtcbiAgICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICBhLmhyZWYgPSB1cmw7XG4gICAgICBhLmRvd25sb2FkID0gXCJGb2N1c0Zsb3dfU291cmNlLnppcFwiO1xuICAgICAgYS5jbGljaygpO1xuICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgfVxuICAgIHNldERvd25sb2FkaW5nWmlwKGZhbHNlKTtcbiAgfTtcblxuICBjb25zdCBkb3dubG9hZFBkZiA9IGFzeW5jICgpID0+IHtcbiAgICBzZXREb3dubG9hZGluZyh0cnVlKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBqc1BERiB9ID0gYXdhaXQgaW1wb3J0KFwianNwZGZcIik7XG4gICAgICBjb25zdCBkb2MgPSBuZXcganNQREYoeyBvcmllbnRhdGlvbjogXCJwb3J0cmFpdFwiLCB1bml0OiBcIm1tXCIsIGZvcm1hdDogXCJhNFwiIH0pO1xuXG4gICAgICBjb25zdCBtYXJnaW4gPSAxNTtcbiAgICAgIGNvbnN0IHBhZ2VXID0gMjEwO1xuICAgICAgY29uc3QgcGFnZUggPSAyODc7XG4gICAgICBjb25zdCB0ZXh0VyA9IHBhZ2VXIC0gbWFyZ2luICogMjtcbiAgICAgIGxldCB5ID0gMDtcblxuICAgICAgY29uc3QgY2hlY2tQYWdlID0gKG5lZWRlZCA9IDgpID0+IHtcbiAgICAgICAgaWYgKHkgKyBuZWVkZWQgPiBwYWdlSCAtIDEwKSB7ZG9jLmFkZFBhZ2UoKTt5ID0gMjA7fVxuICAgICAgfTtcblxuICAgICAgY29uc3QgYWRkVGV4dCA9ICh0ZXh0LCBzaXplID0gOSwgYm9sZCA9IGZhbHNlLCBjb2xvciA9IFs0MCwgNDAsIDQwXSwgbGluZVNwYWNpbmcgPSA0LjUpID0+IHtcbiAgICAgICAgZG9jLnNldEZvbnRTaXplKHNpemUpO1xuICAgICAgICBkb2Muc2V0Rm9udChcImhlbHZldGljYVwiLCBib2xkID8gXCJib2xkXCIgOiBcIm5vcm1hbFwiKTtcbiAgICAgICAgZG9jLnNldFRleHRDb2xvciguLi5jb2xvcik7XG4gICAgICAgIGNvbnN0IGxpbmVzID0gZG9jLnNwbGl0VGV4dFRvU2l6ZSh0ZXh0LCB0ZXh0Vyk7XG4gICAgICAgIGZvciAoY29uc3QgbGluZSBvZiBsaW5lcykge1xuICAgICAgICAgIGNoZWNrUGFnZShsaW5lU3BhY2luZyArIDEpO1xuICAgICAgICAgIGRvYy50ZXh0KGxpbmUsIG1hcmdpbiwgeSk7XG4gICAgICAgICAgeSArPSBsaW5lU3BhY2luZztcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3QgYWRkU2VjdGlvbkhlYWRlciA9ICh0aXRsZSwgY29sb3IpID0+IHtcbiAgICAgICAgY2hlY2tQYWdlKDE2KTtcbiAgICAgICAgZG9jLnNldEZpbGxDb2xvciguLi5jb2xvcik7XG4gICAgICAgIGRvYy5yZWN0KDAsIHkgLSA1LCBwYWdlVywgMTIsIFwiRlwiKTtcbiAgICAgICAgZG9jLnNldEZvbnRTaXplKDExKTtcbiAgICAgICAgZG9jLnNldEZvbnQoXCJoZWx2ZXRpY2FcIiwgXCJib2xkXCIpO1xuICAgICAgICBkb2Muc2V0VGV4dENvbG9yKDI1NSwgMjU1LCAyNTUpO1xuICAgICAgICBkb2MudGV4dCh0aXRsZSwgbWFyZ2luLCB5ICsgMyk7XG4gICAgICAgIHkgKz0gMTM7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBhZGREaXZpZGVyID0gKCkgPT4ge1xuICAgICAgICBjaGVja1BhZ2UoNSk7XG4gICAgICAgIGRvYy5zZXREcmF3Q29sb3IoMjIwLCAyMTAsIDIwMCk7XG4gICAgICAgIGRvYy5zZXRMaW5lV2lkdGgoMC4zKTtcbiAgICAgICAgZG9jLmxpbmUobWFyZ2luLCB5LCBwYWdlVyAtIG1hcmdpbiwgeSk7XG4gICAgICAgIHkgKz0gNDtcbiAgICAgIH07XG5cbiAgICAgIC8vIOKUgOKUgCBDQVBBIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuICAgICAgZG9jLnNldEZpbGxDb2xvcigyMzIsIDEyMiwgOTApO1xuICAgICAgZG9jLnJlY3QoMCwgMCwgcGFnZVcsIDgwLCBcIkZcIik7XG4gICAgICBkb2Muc2V0RmlsbENvbG9yKDIxMiwgMTA1LCA3NCk7XG4gICAgICBkb2MucmVjdCgwLCA3MCwgcGFnZVcsIDEwLCBcIkZcIik7XG5cbiAgICAgIC8vIEVtb2ppIGxhcmFuamEgYXJlYVxuICAgICAgZG9jLnNldEZpbGxDb2xvcigyNTUsIDI1NSwgMjU1LCAwLjE1KTtcbiAgICAgIGRvYy5yb3VuZGVkUmVjdChwYWdlVyAtIDU1LCAxNSwgNDAsIDQwLCA4LCA4LCBcIkZcIik7XG5cbiAgICAgIGRvYy5zZXRGb250U2l6ZSgzMik7XG4gICAgICBkb2Muc2V0Rm9udChcImhlbHZldGljYVwiLCBcImJvbGRcIik7XG4gICAgICBkb2Muc2V0VGV4dENvbG9yKDI1NSwgMjU1LCAyNTUpO1xuICAgICAgZG9jLnRleHQoXCJGb2N1c0Zsb3dcIiwgbWFyZ2luLCAzNSk7XG5cbiAgICAgIGRvYy5zZXRGb250U2l6ZSgxMyk7XG4gICAgICBkb2Muc2V0Rm9udChcImhlbHZldGljYVwiLCBcIm5vcm1hbFwiKTtcbiAgICAgIGRvYy50ZXh0KFwiRG9jdW1lbnRhY2FvIFRlY25pY2EgQ29tcGxldGEgZG8gQmFja2VuZFwiLCBtYXJnaW4sIDQ4KTtcblxuICAgICAgZG9jLnNldEZvbnRTaXplKDkpO1xuICAgICAgZG9jLnNldFRleHRDb2xvcigyNTUsIDIyMCwgMjAwKTtcbiAgICAgIGRvYy50ZXh0KFwiQXJxdWl0ZWN0dXJhLCBBUElzLCBTZWd1cmFuY2EsIEZsdXhvcyBkZSBEYWRvcyBlIEd1aWEgRWR1Y2F0aXZvXCIsIG1hcmdpbiwgNTgpO1xuICAgICAgZG9jLnRleHQoXCJDb21vIGltcGxlbWVudGFyIG8gbWVzbW8gc2lzdGVtYSBjb20gdGVjbm9sb2dpYXMgb3Blbi1zb3VyY2VcIiwgbWFyZ2luLCA2NSk7XG5cbiAgICAgIGRvYy5zZXRGb250U2l6ZSg4KTtcbiAgICAgIGRvYy5zZXRUZXh0Q29sb3IoMjU1LCAyMDAsIDE4MCk7XG4gICAgICBkb2MudGV4dChcIkdlcmFkbyBlbTogXCIgKyBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZyhcInB0LVBUXCIpICsgXCIgIHwgIFZlcnNhbyAyLjAgIHwgIDE2IFNlY2NvZXMgIHwgIH4yNSBwYWdpbmFzXCIsIG1hcmdpbiwgNzUpO1xuXG4gICAgICAvLyBNZXRhZGF0YSBib3hlc1xuICAgICAgeSA9IDk1O1xuICAgICAgY29uc3QgYm94ZXMgPSBbXG4gICAgICB7IGxhYmVsOiBcIlNlY2NvZXNcIiwgdmFsdWU6IFN0cmluZyhQREZfU0VDVElPTlMubGVuZ3RoKSwgY29sb3I6IFsyMzIsIDEyMiwgOTBdIH0sXG4gICAgICB7IGxhYmVsOiBcIkVudGlkYWRlc1wiLCB2YWx1ZTogXCI4XCIsIGNvbG9yOiBbMTM5LCA5MiwgMjQ2XSB9LFxuICAgICAgeyBsYWJlbDogXCJBUElzXCIsIHZhbHVlOiBcIjIwK1wiLCBjb2xvcjogWzU5LCAxMzAsIDI0Nl0gfSxcbiAgICAgIHsgbGFiZWw6IFwiUGFnaW5hc1wiLCB2YWx1ZTogXCJ+MjVcIiwgY29sb3I6IFsxNiwgMTg1LCAxMjldIH1dO1xuXG4gICAgICBib3hlcy5mb3JFYWNoKChiLCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IGJ4ID0gbWFyZ2luICsgaSAqIDQ0O1xuICAgICAgICBkb2Muc2V0RmlsbENvbG9yKC4uLmIuY29sb3IpO1xuICAgICAgICBkb2Mucm91bmRlZFJlY3QoYngsIHksIDQwLCAyMCwgNCwgNCwgXCJGXCIpO1xuICAgICAgICBkb2Muc2V0Rm9udFNpemUoMTYpO1xuICAgICAgICBkb2Muc2V0Rm9udChcImhlbHZldGljYVwiLCBcImJvbGRcIik7XG4gICAgICAgIGRvYy5zZXRUZXh0Q29sb3IoMjU1LCAyNTUsIDI1NSk7XG4gICAgICAgIGRvYy50ZXh0KGIudmFsdWUsIGJ4ICsgMjAsIHkgKyAxMiwgeyBhbGlnbjogXCJjZW50ZXJcIiB9KTtcbiAgICAgICAgZG9jLnNldEZvbnRTaXplKDcpO1xuICAgICAgICBkb2Muc2V0Rm9udChcImhlbHZldGljYVwiLCBcIm5vcm1hbFwiKTtcbiAgICAgICAgZG9jLnRleHQoYi5sYWJlbCwgYnggKyAyMCwgeSArIDE4LCB7IGFsaWduOiBcImNlbnRlclwiIH0pO1xuICAgICAgfSk7XG4gICAgICB5ICs9IDMwO1xuICAgICAgYWRkRGl2aWRlcigpO1xuXG4gICAgICAvLyDilIDilIAgSU5ESUNFIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuICAgICAgYWRkVGV4dChcIklORElDRVwiLCAxMywgdHJ1ZSwgWzIzMiwgMTIyLCA5MF0pO1xuICAgICAgeSArPSAyO1xuICAgICAgUERGX1NFQ1RJT05TLmZvckVhY2goKHMsIGkpID0+IHtcbiAgICAgICAgY2hlY2tQYWdlKDUpO1xuICAgICAgICBjb25zdCBpc0VkdSA9IHMudGl0bGUuaW5jbHVkZXMoXCJbRURVQ0FUSVZPXVwiKTtcbiAgICAgICAgZG9jLnNldEZvbnRTaXplKDgpO1xuICAgICAgICBkb2Muc2V0Rm9udChcImhlbHZldGljYVwiLCBpc0VkdSA/IFwiaXRhbGljXCIgOiBcIm5vcm1hbFwiKTtcbiAgICAgICAgZG9jLnNldFRleHRDb2xvcihpc0VkdSA/IDIwIDogNTAsIGlzRWR1ID8gMTg0IDogNTAsIGlzRWR1ID8gMTY2IDogNTApO1xuICAgICAgICBkb2MudGV4dChgJHtpICsgMX0uICAke3MudGl0bGV9YCwgbWFyZ2luICsgMywgeSk7XG4gICAgICAgIHkgKz0gNTtcbiAgICAgIH0pO1xuICAgICAgeSArPSA2O1xuICAgICAgYWRkRGl2aWRlcigpO1xuXG4gICAgICAvLyDilIDilIAgQ09OVEVVRE8g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4gICAgICBQREZfU0VDVElPTlMuZm9yRWFjaCgoc2VjdGlvbikgPT4ge1xuICAgICAgICBkb2MuYWRkUGFnZSgpO1xuICAgICAgICB5ID0gMTU7XG4gICAgICAgIGFkZFNlY3Rpb25IZWFkZXIoc2VjdGlvbi50aXRsZSwgc2VjdGlvbi5jb2xvcik7XG4gICAgICAgIHkgKz0gMjtcbiAgICAgICAgY29uc3QgbGluZXMgPSBzZWN0aW9uLmNvbnRlbnQudHJpbSgpLnNwbGl0KFwiXFxuXCIpO1xuICAgICAgICBmb3IgKGNvbnN0IGxpbmUgb2YgbGluZXMpIHtcbiAgICAgICAgICBjb25zdCB0cmltbWVkID0gbGluZS50cmltRW5kKCk7XG4gICAgICAgICAgaWYgKHRyaW1tZWQgPT09IFwiXCIpIHt5ICs9IDI7Y29udGludWU7fVxuICAgICAgICAgIC8vIENhYmVjYWxob3MgZGUgc3Vic2VjY2FvIChsaW5oYXMgcXVlIHRlcm1pbmFtIGVtID0gb3UgLSlcbiAgICAgICAgICBpZiAoL15bPV17Myx9JC8udGVzdCh0cmltbWVkKSB8fCAvXlstXXszLH0kLy50ZXN0KHRyaW1tZWQpKSB7YWRkRGl2aWRlcigpO2NvbnRpbnVlO31cbiAgICAgICAgICBpZiAodHJpbW1lZC5lbmRzV2l0aChcIj1cIikgJiYgdHJpbW1lZC5zdGFydHNXaXRoKFwiPVwiKSAmJiB0cmltbWVkLmxlbmd0aCA+IDYpIHthZGREaXZpZGVyKCk7Y29udGludWU7fVxuICAgICAgICAgIC8vIExpbmhhIGRlIHRpdHVsbyAodG9kYSBtYWl1c2N1bGFzIG91IHRlcm1pbmEgY29tIDopXG4gICAgICAgICAgY29uc3QgaXNUaXRsZSA9IC9eW0EtWl1bQS1aXFxzXFwtXFwvKCldezgsfTo/XFxzKiQvLnRlc3QodHJpbW1lZCkgfHwgL149ezIsfS8udGVzdCh0cmltbWVkKTtcbiAgICAgICAgICBjb25zdCBpc0NvZGUgPSB0cmltbWVkLnN0YXJ0c1dpdGgoXCIgIFwiKSB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoXCJcXHRcIik7XG4gICAgICAgICAgY29uc3QgaXNDb21tZW50ID0gdHJpbW1lZC5zdGFydHNXaXRoKFwiLy9cIikgfHwgdHJpbW1lZC5zdGFydHNXaXRoKFwiI1wiKTtcblxuICAgICAgICAgIGlmIChpc1RpdGxlICYmICFpc0NvZGUpIHtcbiAgICAgICAgICAgIHkgKz0gMjtcbiAgICAgICAgICAgIGFkZFRleHQodHJpbW1lZCwgOSwgdHJ1ZSwgW3NlY3Rpb24uY29sb3JbMF0sIHNlY3Rpb24uY29sb3JbMV0sIHNlY3Rpb24uY29sb3JbMl1dKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzQ29tbWVudCkge1xuICAgICAgICAgICAgYWRkVGV4dCh0cmltbWVkLCA3LjUsIGZhbHNlLCBbMTIwLCAxNDAsIDEyMF0sIDQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaXNDb2RlKSB7XG4gICAgICAgICAgICBkb2Muc2V0RmlsbENvbG9yKDI0OCwgMjQ0LCAyNDApO1xuICAgICAgICAgICAgZG9jLnJlY3QobWFyZ2luLCB5IC0gMywgdGV4dFcsIDUuNSwgXCJGXCIpO1xuICAgICAgICAgICAgYWRkVGV4dCh0cmltbWVkLCA3LjUsIGZhbHNlLCBbNjAsIDYwLCA4MF0sIDQuNSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0cmltbWVkLnN0YXJ0c1dpdGgoXCLigKJcIikgfHwgdHJpbW1lZC5zdGFydHNXaXRoKFwiLVwiKSB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoXCIqXCIpKSB7XG4gICAgICAgICAgICBhZGRUZXh0KHRyaW1tZWQsIDguNSwgZmFsc2UsIFs1MCwgNTAsIDYwXSwgNC41KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkVGV4dCh0cmltbWVkLCA4LjUsIGZhbHNlLCBbNDAsIDQwLCA1MF0sIDQuNSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8g4pSA4pSAIFJPREFQRSBFTSBUT0RBUyBBUyBQQUdJTkFTIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuICAgICAgY29uc3QgdG90YWxQYWdlcyA9IGRvYy5nZXROdW1iZXJPZlBhZ2VzKCk7XG4gICAgICBmb3IgKGxldCBwID0gMTsgcCA8PSB0b3RhbFBhZ2VzOyBwKyspIHtcbiAgICAgICAgZG9jLnNldFBhZ2UocCk7XG4gICAgICAgIGRvYy5zZXRGaWxsQ29sb3IoMjQ4LCAyNDQsIDI0MCk7XG4gICAgICAgIGRvYy5yZWN0KDAsIHBhZ2VIIC0gOCwgcGFnZVcsIDksIFwiRlwiKTtcbiAgICAgICAgZG9jLnNldEZvbnRTaXplKDcpO1xuICAgICAgICBkb2Muc2V0Rm9udChcImhlbHZldGljYVwiLCBcIm5vcm1hbFwiKTtcbiAgICAgICAgZG9jLnNldFRleHRDb2xvcigxNjAsIDE0MCwgMTIwKTtcbiAgICAgICAgZG9jLnRleHQoXCJGb2N1c0Zsb3cg4oCUIERvY3VtZW50YWNhbyBUZWNuaWNhIENvbXBsZXRhIGRvIEJhY2tlbmRcIiwgbWFyZ2luLCBwYWdlSCAtIDMpO1xuICAgICAgICBkb2MudGV4dChcIlBhZ2luYSBcIiArIHAgKyBcIiBkZSBcIiArIHRvdGFsUGFnZXMsIHBhZ2VXIC0gbWFyZ2luLCBwYWdlSCAtIDMsIHsgYWxpZ246IFwicmlnaHRcIiB9KTtcbiAgICAgIH1cblxuICAgICAgZG9jLnNhdmUoXCJGb2N1c0Zsb3dfQmFja2VuZF9Eb2NzX3YyLnBkZlwiKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgIH1cbiAgICBzZXREb3dubG9hZGluZyhmYWxzZSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRXhwb3J0RG9jczoxMDg3OjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctY3JlYW1cIj5cbiAgICAgIHsvKiBIZWFkZXIgKi99XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRXhwb3J0RG9jczoxMDg5OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tWyNFODdBNUFdIHRvLVsjRDQ2OTRBXSBweC01IHB0LTEyIHBiLThcIj5cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0V4cG9ydERvY3M6MTA5MDo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIG1iLTRcIj5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRXhwb3J0RG9jczoxMDkxOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctMTIgaC0xMiByb3VuZGVkLTJ4bCBiZy13aGl0ZS8yMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgPEZpbGVUZXh0IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRXhwb3J0RG9jczoxMDkyOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNiBoLTYgdGV4dC13aGl0ZVwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0V4cG9ydERvY3M6MTA5NDoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIj5cbiAgICAgICAgICAgIDxoMSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0V4cG9ydERvY3M6MTA5NToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJsYWNrIHRleHQtd2hpdGVcIj5Gb2N1c0Zsb3cgRG9jczwvaDE+XG4gICAgICAgICAgICA8cCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0V4cG9ydERvY3M6MTA5NjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlLzcwIHRleHQtc21cIj5Eb2N1bWVudGHDp8OjbyB0w6ljbmljYSBkbyBiYWNrZW5kPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8bW90aW9uLmJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0V4cG9ydERvY3M6MTEwMDo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgb25DbGljaz17ZG93bmxvYWRQZGZ9XG4gICAgICAgIGRpc2FibGVkPXtkb3dubG9hZGluZ31cbiAgICAgICAgd2hpbGVUYXA9e3sgc2NhbGU6IDAuOTcgfX1cbiAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTQgcm91bmRlZC0yeGwgYmctd2hpdGUgdGV4dC1bI0U4N0E1QV0gZm9udC1ibGFjayB0ZXh0LXNtIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yIHNoYWRvdy1sZyBzaGFkb3ctYmxhY2svMTAgaG92ZXI6Ymctd2hpdGUvOTAgdHJhbnNpdGlvbi1hbGwgZGlzYWJsZWQ6b3BhY2l0eS03MFwiPlxuICAgICAgICAgIFxuICAgICAgICAgIHtkb3dubG9hZGluZyA/XG4gICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPFJlZnJlc2hDdyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0V4cG9ydERvY3M6MTEwODoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTQgaC00IGFuaW1hdGUtc3BpblwiIC8+IEEgZ2VyYXIgUERGLi4uXG4gICAgICAgICAgICA8Lz4gOlxuXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPERvd25sb2FkIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRXhwb3J0RG9jczoxMTEyOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPiBEb3dubG9hZCBQREYgQ29tcGxldG8gKHtQREZfU0VDVElPTlMubGVuZ3RofSBzZWPDp8O1ZXMsIH4yNSBww6FnLilcbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9tb3Rpb24uYnV0dG9uPlxuXG4gICAgICAgIDxtb3Rpb24uYnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRXhwb3J0RG9jczoxMTE3OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICBvbkNsaWNrPXtkb3dubG9hZFppcH1cbiAgICAgICAgZGlzYWJsZWQ9e2Rvd25sb2FkaW5nWmlwfVxuICAgICAgICB3aGlsZVRhcD17eyBzY2FsZTogMC45NyB9fVxuICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgbXQtMyBweS0zIHJvdW5kZWQtMnhsIGJnLXdoaXRlLzIwIHRleHQtd2hpdGUgZm9udC1ib2xkIHRleHQtc20gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgYm9yZGVyIGJvcmRlci13aGl0ZS8zMCBob3ZlcjpiZy13aGl0ZS8zMCB0cmFuc2l0aW9uLWFsbCBkaXNhYmxlZDpvcGFjaXR5LTcwXCI+XG4gICAgICAgICAgXG4gICAgICAgICAge2Rvd25sb2FkaW5nWmlwID9cbiAgICAgICAgICA8PjxSZWZyZXNoQ3cgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9FeHBvcnREb2NzOjExMjQ6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy00IGgtNCBhbmltYXRlLXNwaW5cIiAvPiBBIGdlcmFyIFpJUC4uLjwvPiA6XG5cbiAgICAgICAgICA8PjxBcmNoaXZlIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRXhwb3J0RG9jczoxMTI2OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPiBEb3dubG9hZCBaSVAgKHNjaGVtYXMgKyBkb2NzKTwvPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9tb3Rpb24uYnV0dG9uPlxuXG4gICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRXhwb3J0RG9jczoxMTMwOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC13aGl0ZS81MCB0ZXh0LVsxMXB4XSB0ZXh0LWNlbnRlciBtdC0yXCI+XG4gICAgICAgICAgUERGIGRldGFsaGFkbyBjb20gdG9kYSBhIGRvY3VtZW50YcOnw6NvIHTDqWNuaWNhIGRhIGFycXVpdGV0dXJhLCBBUElzIGUgZW50aWRhZGVzXG4gICAgICAgIDwvcD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogU3RhdHMgKi99XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRXhwb3J0RG9jczoxMTM2OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJweC01IHB5LTRcIj5cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0V4cG9ydERvY3M6MTEzNzo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMyBnYXAtMyBtYi00XCI+XG4gICAgICAgICAge1tcbiAgICAgICAgICB7IGxhYmVsOiBcIlNlY8Onw7Vlc1wiLCB2YWx1ZTogUERGX1NFQ1RJT05TLmxlbmd0aCwgaWNvbjogXCLwn5OWXCIgfSxcbiAgICAgICAgICB7IGxhYmVsOiBcIkVudGlkYWRlc1wiLCB2YWx1ZTogXCI4XCIsIGljb246IFwi8J+XhO+4j1wiIH0sXG4gICAgICAgICAgeyBsYWJlbDogXCJQw6FnaW5hc1wiLCB2YWx1ZTogXCJ+MjVcIiwgaWNvbjogXCLwn5OEXCIgfV0uXG4gICAgICAgICAgbWFwKChzKSA9PlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9FeHBvcnREb2NzOjExNDM6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBrZXk9e3MubGFiZWx9IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtMnhsIHAtMyBib3JkZXIgYm9yZGVyLWJvcmRlciB0ZXh0LWNlbnRlciBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0V4cG9ydERvY3M6MTE0NDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQteGwgbWItMVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiaWNvblwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtzPy5pZCB8fCBzPy5faWR9PntzLmljb259PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9FeHBvcnREb2NzOjExNDU6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYmxhY2sgdGV4dC1mb3JlZ3JvdW5kXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJ2YWx1ZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtzPy5pZCB8fCBzPy5faWR9PntzLnZhbHVlfTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRXhwb3J0RG9jczoxMTQ2OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJsYWJlbFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtzPy5pZCB8fCBzPy5faWR9PntzLmxhYmVsfTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFNlY3Rpb25zICovfVxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0V4cG9ydERvY3M6MTE1Mzo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicHgtNSBwYi0xMiBzcGFjZS15LTJcIj5cbiAgICAgICAge1NFQ1RJT05TLm1hcCgocywgaSkgPT5cbiAgICAgICAgPFNlY3Rpb24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9FeHBvcnREb2NzOjExNTU6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBrZXk9e3MuaWR9IHNlY3Rpb249e3N9IGRlZmF1bHRPcGVuPXtpID09PSAwfSBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17cz8uaWR9IC8+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj4pO1xuXG59Il0sImZpbGUiOiIvYXBwL3NyYy9wYWdlcy9FeHBvcnREb2NzLmpzeCJ9