-- Ensure notes columns exist (in case migration 0015 didn't run)
alter table public.notes
  add column if not exists archived boolean not null default false,
  add column if not exists tags_json text not null default '[]';

-- Create note_shares with full schema (safe if already exists)
create table if not exists public.note_shares (
  id uuid primary key default gen_random_uuid(),
  note_id uuid not null references public.notes(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  shared_with_email text not null,
  role text not null default 'editor',
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  unique(note_id, shared_with_email)
);

-- Add new columns if table already existed from migration 0015
alter table public.note_shares
  add column if not exists role text not null default 'editor',
  add column if not exists expires_at timestamptz;

alter table public.note_shares enable row level security;

-- Recreate all policies cleanly
drop policy if exists "note_shares_owner" on public.note_shares;
drop policy if exists "note_shares_recipient_read" on public.note_shares;
drop policy if exists "notes_shared_read" on public.notes;

create policy "note_shares_owner" on public.note_shares
  for all using (owner_id = auth.uid());

create policy "note_shares_recipient_read" on public.note_shares
  for select using (shared_with_email = auth.email());

create policy "notes_shared_read" on public.notes
  for select using (
    exists (
      select 1 from public.note_shares ns
      where ns.note_id = notes.id
        and ns.shared_with_email = auth.email()
    )
  );
