-- Add 'admin' as a valid role in task_shares
-- admin = full access including the share button (can share with others)
alter table public.task_shares
  drop constraint if exists task_shares_role_check;

alter table public.task_shares
  add constraint task_shares_role_check
  check (role in ('viewer', 'editor', 'admin'));

-- Update insert policy to allow admin writes too (admin ⊇ editor)
drop policy if exists "tasks_shared_insert" on public.tasks;
create policy "tasks_shared_insert" on public.tasks
  for insert with check (
    exists (
      select 1 from public.task_shares ts
      where ts.owner_id = created_by_id
        and ts.shared_with_email = auth.email()
        and ts.role in ('editor', 'admin')
        and (ts.expires_at is null or ts.expires_at > now())
    )
  );

drop policy if exists "tasks_shared_update" on public.tasks;
create policy "tasks_shared_update" on public.tasks
  for update using (
    exists (
      select 1 from public.task_shares ts
      where ts.owner_id = tasks.created_by_id
        and ts.shared_with_email = auth.email()
        and ts.role in ('editor', 'admin')
        and (ts.expires_at is null or ts.expires_at > now())
    )
  );
