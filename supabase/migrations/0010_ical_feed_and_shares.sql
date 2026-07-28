-- iCal feed tokens (one per user, public lookup by token only)
create table if not exists public.ical_tokens (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  token      uuid not null default gen_random_uuid(),
  created_at timestamptz default now(),
  unique(user_id),
  unique(token)
);
alter table public.ical_tokens enable row level security;
-- Owner can read/delete their own token
create policy "ical_owner" on public.ical_tokens
  for all using (auth.uid() = user_id);

-- Task shares
create table if not exists public.task_shares (
  id                 uuid primary key default gen_random_uuid(),
  owner_id           uuid not null references auth.users(id) on delete cascade,
  shared_with_email  text not null,
  role               text not null default 'viewer' check (role in ('viewer', 'editor')),
  expires_at         timestamptz,   -- NULL = indefinite
  created_at         timestamptz default now(),
  unique(owner_id, shared_with_email)
);
alter table public.task_shares enable row level security;
-- Only the owner can manage their shares
create policy "shares_owner" on public.task_shares
  for all using (auth.uid() = owner_id);

-- Allow the ical edge function (called with service role) to look up tokens
-- No additional policy needed; service role bypasses RLS.
