-- FocusGrid — Subscrição paga da extensão de browser (1,5€/mês, 7 dias de trial).
-- Modelo separado da app web: só desbloqueia a extensão.

create table if not exists public.extension_subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  status text not null default 'trialing'
    check (status in ('trialing', 'active', 'past_due', 'canceled')),
  trial_ends_at timestamptz not null default (now() + interval '7 days'),
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  current_period_end timestamptz,
  created_date timestamptz not null default now(),
  updated_date timestamptz not null default now()
);

alter table public.extension_subscriptions enable row level security;

create policy "extension_subscriptions_select_own" on public.extension_subscriptions
  for select using (user_id = auth.uid());

-- Inserções/atualizações só pela service role (edge functions com webhook do Stripe),
-- exceto a criação inicial da linha de trial no primeiro login da extensão.
create policy "extension_subscriptions_insert_own" on public.extension_subscriptions
  for insert with check (user_id = auth.uid());
