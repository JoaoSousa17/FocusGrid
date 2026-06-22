-- FocusFlow — schema completo para Supabase
-- Corre este ficheiro no SQL Editor do Supabase (ou via `supabase db push`)

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- PERFIS (role para RLS tipo admin; auth.users já tem id/email)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'user',
  created_date timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own_or_admin" on public.profiles
  for select using (
    id = auth.uid()
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "profiles_update_own" on public.profiles
  for update using (id = auth.uid());

-- cria automaticamente um profile quando um utilizador se regista
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- helper: utilizador autenticado é admin?
create or replace function public.is_admin()
returns boolean as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$ language sql security definer stable;

-- trigger genérico para updated_date
create or replace function public.set_updated_date()
returns trigger as $$
begin
  new.updated_date = now();
  return new;
end;
$$ language plpgsql;

-- ---------------------------------------------------------------------------
-- macro: cria tabela de entidade com campos automáticos + RLS padrão
-- (escrito por extenso por tabela, Postgres não tem macros de DDL nativas)
-- ---------------------------------------------------------------------------

-- TASK -----------------------------------------------------------------
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  created_by_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  created_date timestamptz not null default now(),
  updated_date timestamptz not null default now(),
  title text not null,
  description text,
  weekday text not null default 'none' check (weekday in ('monday','tuesday','wednesday','thursday','friday','saturday','sunday','none')),
  period text check (period in ('morning','afternoon','evening') or period is null),
  tags_json text,
  week_start date,
  completed boolean not null default false,
  "order" int not null default 0
);

-- TAG --------------------------------------------------------------------
create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  created_by_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  created_date timestamptz not null default now(),
  updated_date timestamptz not null default now(),
  name text not null,
  color text not null check (color in ('blue','purple','green','amber','rose','teal','indigo','pink'))
);

-- FOCUS SESSION ------------------------------------------------------------
create table if not exists public.focus_sessions (
  id uuid primary key default gen_random_uuid(),
  created_by_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  created_date timestamptz not null default now(),
  updated_date timestamptz not null default now(),
  tag_id uuid,
  tag_name text,
  tag_color text,
  duration_minutes int not null,
  type text not null check (type in ('focus','pause')),
  completed boolean not null default true
);

-- HABIT --------------------------------------------------------------------
create table if not exists public.habits (
  id uuid primary key default gen_random_uuid(),
  created_by_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  created_date timestamptz not null default now(),
  updated_date timestamptz not null default now(),
  name text not null,
  description text,
  score int not null default 10,
  color text not null default '#FF5733',
  active boolean not null default true,
  "order" int not null default 0
);

-- HABIT ENTRY ----------------------------------------------------------
create table if not exists public.habit_entries (
  id uuid primary key default gen_random_uuid(),
  created_by_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  created_date timestamptz not null default now(),
  updated_date timestamptz not null default now(),
  habit_id uuid not null,
  habit_name text,
  habit_color text,
  score int not null,
  date date not null
);

-- DEADLINE -------------------------------------------------------------
create table if not exists public.deadlines (
  id uuid primary key default gen_random_uuid(),
  created_by_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  created_date timestamptz not null default now(),
  updated_date timestamptz not null default now(),
  name text not null,
  color text,
  location text,
  website text,
  deadline timestamptz not null
);

-- EVENT ------------------------------------------------------------------
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  created_by_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  created_date timestamptz not null default now(),
  updated_date timestamptz not null default now(),
  name text not null,
  color text,
  location text,
  website text,
  description text,
  start_datetime timestamptz not null,
  end_datetime timestamptz not null
);

-- MEETING RECORDING ------------------------------------------------------
create table if not exists public.meeting_recordings (
  id uuid primary key default gen_random_uuid(),
  created_by_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  created_date timestamptz not null default now(),
  updated_date timestamptz not null default now(),
  title text not null,
  summary text,
  transcript text,
  action_items_json text,
  deadlines_json text,
  mind_map_json text,
  pdf_url text,
  audio_duration_seconds int,
  event_id uuid,
  event_name text,
  meeting_date date
);

-- ---------------------------------------------------------------------------
-- Triggers updated_date para todas as tabelas
-- ---------------------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array['tasks','tags','focus_sessions','habits','habit_entries','deadlines','events','meeting_recordings']
  loop
    execute format('drop trigger if exists set_updated_date on public.%I', t);
    execute format('create trigger set_updated_date before update on public.%I for each row execute procedure public.set_updated_date()', t);
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- RLS: cada utilizador só vê/edita os seus próprios registos; admin vê tudo
-- ---------------------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array['tasks','tags','focus_sessions','habits','habit_entries','deadlines','events','meeting_recordings']
  loop
    execute format('alter table public.%I enable row level security', t);

    execute format($f$
      create policy "%1$s_select" on public.%1$I for select
        using (created_by_id = auth.uid() or public.is_admin())
    $f$, t);

    execute format($f$
      create policy "%1$s_insert" on public.%1$I for insert
        with check (created_by_id = auth.uid())
    $f$, t);

    execute format($f$
      create policy "%1$s_update" on public.%1$I for update
        using (created_by_id = auth.uid() or public.is_admin())
    $f$, t);

    execute format($f$
      create policy "%1$s_delete" on public.%1$I for delete
        using (created_by_id = auth.uid() or public.is_admin())
    $f$, t);
  end loop;
end $$;

-- impede que o cliente altere id / created_by_id / created_date depois de criado
do $$
declare t text;
begin
  foreach t in array array['tasks','tags','focus_sessions','habits','habit_entries','deadlines','events','meeting_recordings']
  loop
    execute format($f$
      create or replace function public.protect_immutable_%1$s()
      returns trigger as $b$
      begin
        new.id = old.id;
        new.created_by_id = old.created_by_id;
        new.created_date = old.created_date;
        return new;
      end;
      $b$ language plpgsql
    $f$, t);
    execute format('drop trigger if exists protect_immutable on public.%I', t);
    execute format('create trigger protect_immutable before update on public.%I for each row execute procedure public.protect_immutable_%I()', t, t);
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- Realtime: publicar as tabelas para subscriptions (postgres_changes)
-- ---------------------------------------------------------------------------
alter publication supabase_realtime add table
  public.tasks, public.tags, public.focus_sessions, public.habits,
  public.habit_entries, public.deadlines, public.events, public.meeting_recordings;

-- ---------------------------------------------------------------------------
-- Storage: buckets público (CDN) e privado (signed URLs)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('public-files', 'public-files', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('private-files', 'private-files', false)
on conflict (id) do nothing;

create policy "public_files_read" on storage.objects
  for select using (bucket_id = 'public-files');

create policy "public_files_write_own" on storage.objects
  for insert with check (bucket_id = 'public-files' and auth.uid() is not null);

create policy "private_files_owner_only" on storage.objects
  for all using (bucket_id = 'private-files' and owner = auth.uid())
  with check (bucket_id = 'private-files' and owner = auth.uid());
