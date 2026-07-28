-- Allow editors to update tasks (complete, toggle subtasks, etc.)
create policy "tasks_shared_update" on public.tasks
  for update using (
    exists (
      select 1 from public.task_shares ts
      where ts.owner_id = tasks.created_by_id
        and ts.shared_with_email = auth.email()
        and ts.role = 'editor'
        and (ts.expires_at is null or ts.expires_at > now())
    )
  );

-- Allow editors to insert tasks on behalf of the owner
-- (created_by_id must match the owner who shared with them)
create policy "tasks_shared_insert" on public.tasks
  for insert with check (
    exists (
      select 1 from public.task_shares ts
      where ts.owner_id = created_by_id
        and ts.shared_with_email = auth.email()
        and ts.role = 'editor'
        and (ts.expires_at is null or ts.expires_at > now())
    )
  );
