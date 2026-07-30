-- Unified subscriptions table replacing the narrow extension_subscriptions.
-- Plans: free | app | extension | both
-- lifetime flag = never expires, used for grandfathered accounts.

create table if not exists public.subscriptions (
  user_id             uuid primary key references auth.users(id) on delete cascade,
  plan                text not null default 'free'
                        check (plan in ('free', 'app', 'extension', 'both')),
  lifetime            boolean not null default false,
  status              text not null default 'active'
                        check (status in ('active', 'trialing', 'past_due', 'canceled')),
  stripe_customer_id  text unique,
  stripe_subscription_id text unique,
  current_period_end  timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

alter table public.subscriptions enable row level security;

create policy "subscriptions_select_own" on public.subscriptions
  for select using (user_id = auth.uid());

-- Service role (edge functions) can upsert
create policy "subscriptions_service_upsert" on public.subscriptions
  for all using (true) with check (true);

-- Grant all existing users a lifetime 'both' plan
insert into public.subscriptions (user_id, plan, lifetime, status)
select id, 'both', true, 'active'
from auth.users
on conflict (user_id) do update
  set plan = 'both', lifetime = true, status = 'active', updated_at = now();
