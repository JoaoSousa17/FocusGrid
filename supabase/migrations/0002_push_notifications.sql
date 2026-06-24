-- FocusGrid — Web Push: subscrições, agendamento de pomodoro e registo de envios diários.
-- Corre depois de 0001_init.sql.

-- ---------------------------------------------------------------------------
-- PUSH SUBSCRIPTIONS — uma subscrição Web Push por dispositivo/browser
-- ---------------------------------------------------------------------------
create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  endpoint text not null unique,
  p256dh text not null,
  auth_key text not null,
  created_date timestamptz not null default now()
);

alter table public.push_subscriptions enable row level security;

create policy "push_subscriptions_select_own" on public.push_subscriptions
  for select using (user_id = auth.uid());

create policy "push_subscriptions_insert_own" on public.push_subscriptions
  for insert with check (user_id = auth.uid());

create policy "push_subscriptions_delete_own" on public.push_subscriptions
  for delete using (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- POMODORO SCHEDULES — uma linha = "avisa-me quando esta fase do pomodoro acabar"
-- O cliente substitui a linha pendente sempre que inicia/pausa/salta uma fase.
-- ---------------------------------------------------------------------------
create table if not exists public.pomodoro_schedules (
  user_id uuid primary key references auth.users(id) on delete cascade,
  fires_at timestamptz not null,
  phase text not null check (phase in ('focus','pause')),
  title text not null,
  body text not null,
  updated_date timestamptz not null default now()
);

alter table public.pomodoro_schedules enable row level security;

create policy "pomodoro_schedules_all_own" on public.pomodoro_schedules
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- NOTIFY LOG — evita duplicar a notificação diária de tarefas/hábitos
-- ---------------------------------------------------------------------------
create table if not exists public.notification_log (
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('daily_tasks','evening_habits')),
  sent_date date not null,
  primary key (user_id, kind, sent_date)
);

alter table public.notification_log enable row level security;

create policy "notification_log_select_own" on public.notification_log
  for select using (user_id = auth.uid());

-- Estas tabelas só são escritas pela service role (Edge Functions com cron),
-- por isso não têm policies de insert/update para utilizadores normais.

-- ---------------------------------------------------------------------------
-- Agendamento: chama a Edge Function "dispatch-notifications" a cada minuto.
-- Substitui <PROJECT_REF>, <ANON_KEY> e <CRON_SECRET> pelos valores do teu
-- projeto (Project Settings → API) e pelo segredo que definires para a
-- função (supabase secrets set CRON_SECRET=...) antes de correr esta secção.
-- O CRON_SECRET impede que outras pessoas disparem a função só com a anon key.
-- ---------------------------------------------------------------------------
create extension if not exists pg_cron;
create extension if not exists pg_net;

select cron.schedule(
  'dispatch-notifications-every-minute',
  '* * * * *',
  $$
  select net.http_post(
    url := 'https://<PROJECT_REF>.supabase.co/functions/v1/dispatch-notifications',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer <ANON_KEY>',
      'x-cron-secret', '<CRON_SECRET>'
    ),
    body := '{}'::jsonb
  );
  $$
);
