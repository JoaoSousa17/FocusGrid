create table if not exists public.notes (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users(id) on delete cascade not null,
  title         text not null default '',
  content       text not null default '',
  color         text not null default 'default',
  pinned        boolean not null default false,
  locked        boolean not null default false,
  password_hash text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table public.notes enable row level security;

create policy "Users manage own notes"
  on public.notes for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger notes_updated_at
  before update on public.notes
  for each row execute function public.set_updated_at();
