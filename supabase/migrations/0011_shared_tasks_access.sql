-- Allow recipients to query shares where their email is listed
create policy "shares_recipient_read" on public.task_shares
  for select using (
    shared_with_email = (
      select email from auth.users where id = auth.uid()
    )
  );

-- Allow reading another user's tasks when the current user has a valid (non-expired) share
create policy "tasks_shared_read" on public.tasks
  for select using (
    exists (
      select 1 from public.task_shares ts
      where ts.owner_id = tasks.user_id
        and ts.shared_with_email = (
          select email from auth.users where id = auth.uid()
        )
        and (ts.expires_at is null or ts.expires_at > now())
    )
  );
