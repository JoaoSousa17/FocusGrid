# FocusGrid — Análise de Funcionalidades (estado atual)

> Gerado a 2026-06-30 a partir de leitura direta do código (`src/pages`, `src/api`,
> `supabase/migrations`, `supabase/functions`, `public/sw.js`).

Legenda: ✅ funcional · ⚠️ parcial/com lacunas · ❌ placeholder/não implementado

---

## 1. Tarefas (`/tasks` — TaskBoard.jsx)
**✅ Funcional.** CRUD completo de tarefas via entidade `Task` (Supabase), drag-and-drop
para reordenar, períodos (manhã/tarde/noite), tags (`Tag` entity), filtro por
semana/concluídas, pesquisa. Tabela `tasks` com RLS.

**Melhorias possíveis:**
- Subtarefas / checklist dentro de uma tarefa.
- Tarefas recorrentes (hoje é preciso recriar manualmente todas as semanas).
- Atribuir prioridade (alta/média/baixa) — atualmente só existe período.

## 2. Hábitos (`/habits`, `/habits/manage`, `/habits/analytics`, `/habits/rewards`)
**✅ Funcional.** Grid estilo Tetris para marcar hábitos do dia, sugestões de hábitos
via IA (Groq), analytics com gráficos diários/semanais (recharts), sistema de
streaks e badges (1/3/7/14/30 dias). Tabelas `habits` + `habit_entries`.

**Melhorias possíveis:**
- Hábitos com meta numérica (ex: "beber 2L água") em vez de só sim/não.
- Lembretes específicos por hábito (hoje só existe o lembrete genérico noturno).
- Partilha de progresso / comparação social (opcional, fora do core).

## 3. Pomodoro / Foco (`/focus`)
**✅ Funcional, é a feature mais madura.** Timer 25/5/20 min configurável,
persistência em localStorage (sobrevive a fechar o separador), ciclos de
4 focos + pausa longa, sessões gravadas em `focus_sessions`, Web Push com
ações de Pausar/Saltar diretamente da notificação (via Service Worker +
edge functions `schedule-pomodoro-notification` e `dispatch-notifications`
com `pg_cron`).

**Melhorias possíveis:**
- Modo "foco automático" que liga sozinho ao abrir uma tarefa.
- Integração com o Calendário para bloquear automaticamente sessões futuras.
- Som personalizável por tipo de fase (atualmente só on/off).

## 4. Calendário de Foco (`/focus/calendar`)
**✅ Funcional.** Grelha semanal de 24h, mostra sessões de foco (coloridas por tag),
prazos e eventos. Navegação por semana + botão "Hoje".

**Melhorias possíveis:**
- Vista mensal (só existe vista semanal).
- Drag-to-create de eventos diretamente na grelha.
- Sincronização com Google Calendar (import/export de eventos reais).

## 5. Analytics de Foco (`/focus/analytics`)
**✅ Funcional.** Contagem de sessões (hoje/semana/total), gráfico de barras 7 dias,
distribuição por tag (pizza), tendência 4 semanas, heatmap por hora, cálculo de streak.

**Melhorias possíveis:**
- Exportar os próprios dados de analytics (CSV/PDF) — hoje só a doc técnica é exportável.
- Comparação mês-a-mês.

## 6. Prazos / Deadlines (`/deadlines`)
**✅ Funcional.** CRUD de prazos e eventos, cor por categoria, badges de urgência
(vermelho hoje, laranja <3 dias), filtra futuros vs. expirados.

**Melhorias possíveis:**
- Repetição de prazos (ex: pagamento mensal).
- Anexar ficheiros/links além do campo "website".
- Notificação configurável (ex: avisar 1 dia antes) — hoje a lógica de aviso parece fixa.

## 7. Meeting AI (`/meeting-ai`)
**⚠️ Parcial — funciona mas com UI incompleta.**
O que funciona: upload de áudio (`<input type="file" accept="audio/*">`),
transcrição via Whisper (Groq, edge function `transcribe-audio`), resumo /
mapa mental / itens de ação / prazos extraídos via LLM (`invoke-llm`),
gravação guardada em `meeting_recordings`.
O que falta/está incompleto:
- O mapa mental (`MindMapNode`) gerado pela IA não tem visualização gráfica
  completa no cartão da gravação — fica como dados, não como diagrama interativo.
- Criação automática de prazos/eventos a partir da reunião não está ligada de
  volta às tabelas `deadlines`/`events` (fica só no resumo).

**Melhorias possíveis:**
- Ligar "ações detetadas pela IA" diretamente a criação de tarefas/prazos com 1 clique.
- Suporte para upload de vídeo (extrair só o áudio).
- Diagrama do mapa mental renderizado (ex: com `react-flow`).

## 8. Exportar Documentação (`/export`)
**✅ Funcional** (ao contrário do que poderia parecer à primeira vista).
Gera PDF real via `jsPDF` (`downloadPdf`) e ZIP do código-fonte (`downloadZip`).
Serve sobretudo como documentação técnica do projeto, não como exportação de
dados pessoais do utilizador.

**Melhoria possível:**
- Adicionar exportação dos *dados do utilizador* (tarefas, hábitos, sessões) em
  CSV/JSON — hoje só exporta a documentação do código, não os dados pessoais
  (relevante para GDPR / portabilidade).

## 9. Autenticação (`/login`, `/register`, `/forgot-password`, `/reset-password`)
**✅ Funcional.** Email/password + Google OAuth, verificação por OTP no registo,
fluxo de reset de password completo via Supabase Auth.

**Melhorias possíveis:**
- 2FA opcional.
- Login com Apple (útil se houver app iOS no futuro).

## 10. Notificações Push / PWA
**✅ Funcional para o que existe, mas só push — sem modo offline.**
`public/sw.js` trata eventos push e cliques de notificação, regista
`push_subscriptions`, `dispatch-notifications` corre a cada minuto via
`pg_cron`/`pg_net` para lembretes diários de tarefas/hábitos e fases do pomodoro.

**Melhorias possíveis:**
- Cache de assets (Workbox) para funcionar offline — hoje sem rede a app não abre.
- Sincronização em background (Background Sync API) para ações feitas offline.

## 11. Extensão de Browser + Subscrição Stripe (fora do repo principal, mas ligado)
**✅ Funcional, acabado de implementar.** Login Google via `chrome.identity`,
trial de 7 dias automático, paywall com Stripe Checkout (1,5€/mês),
webhook do Stripe a atualizar `extension_subscriptions`.

**Por fazer (depende de ti):**
- Criar a conta/produto Stripe e configurar os segredos (`docs/stripe-extension-setup.md`).
- Publicar a extensão nas lojas (Chrome Web Store, Firefox Add-ons).
- Faturação da app web (modelo separado, ainda não desenhado: ideia inicial era 2€/mês trial 7 dias / 3€ via Google Play).

## 12. Página "Coming Soon" (`/coming-soon`)
**⚠️ É só um hub de navegação**, não uma feature em si — dois painéis que
redirecionam para Deadlines e Meeting AI. Não há nada "a chegar" de facto
escondido atrás dela; é navegação, não placeholder.

---

## Resumo executivo

| Área | Estado |
|---|---|
| Tarefas | ✅ |
| Hábitos | ✅ |
| Pomodoro/Foco | ✅ (mais madura) |
| Calendário de Foco | ✅ |
| Analytics de Foco | ✅ |
| Prazos | ✅ |
| Meeting AI | ⚠️ parcial (mapa mental e ligação a prazos por terminar) |
| Exportar Docs | ✅ |
| Autenticação | ✅ |
| Notificações/PWA | ✅ push, ❌ offline |
| Extensão + Stripe | ✅ código pronto, falta configurar conta Stripe e publicar |

## Top 5 melhorias com melhor relação esforço/impacto

1. **Tarefas recorrentes** — elimina trabalho manual semanal repetitivo (Tasks).
2. **Ligar itens de ação do Meeting AI a Tarefas/Prazos com 1 clique** — fecha o
   ciclo da feature mais incompleta.
3. **Exportação de dados pessoais (CSV/JSON)** — baixo esforço, valor real para
   GDPR e confiança do utilizador.
4. **Cache offline básica (Workbox)** — a app já é PWA instalável, falta só
   funcionar sem rede.
5. **Vista mensal no Calendário de Foco** — complementa a vista semanal já existente.
