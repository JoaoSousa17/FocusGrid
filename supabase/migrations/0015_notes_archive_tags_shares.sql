-- Add archived and tags_json to notes
alter table public.notes
  add column if not exists archived boolean not null default false,
  add column if not exists tags_json text not null default '[]';

-- note_shares: share a note by email
create table if not exists public.note_shares (
  id uuid primary key default gen_random_uuid(),
  note_id uuid not null references public.notes(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  shared_with_email text not null,
  created_at timestamptz not null default now(),
  unique(note_id, shared_with_email)
);

alter table public.note_shares enable row level security;

-- Owner can manage their note shares
create policy "note_shares_owner" on public.note_shares
  for all using (owner_id = auth.uid());

-- Recipient can read shares where their email matches
create policy "note_shares_recipient_read" on public.note_shares
  for select using (shared_with_email = auth.email());

-- Shared notes: recipients can read the notes shared with them
drop policy if exists "notes_shared_read" on public.notes;
create policy "notes_shared_read" on public.notes
  for select using (
    exists (
      select 1 from public.note_shares ns
      where ns.note_id = notes.id
        and ns.shared_with_email = auth.email()
    )
  );
