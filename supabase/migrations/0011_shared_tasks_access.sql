-- Allow recipients to query shares where their email is listed
create policy "shares_recipient_read" on public.task_shares
  for select using (
    shared_with_email = (
      select email from auth.users where id = auth.uid()
    )
  );

-- Allow recipients to read the profile of users who shared with them
-- (so SharedWithMe popup can show the owner's name/email)
create policy "profiles_shared_with_me" on public.profiles
  for select using (
    exists (
      select 1 from public.task_shares ts
      where ts.owner_id = id
        and ts.shared_with_email = (
          select email from auth.users where id = auth.uid()
        )
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

-- Allow reading another user's tags when the current user has a valid share
create policy "tags_shared_read" on public.tags
  for select using (
    exists (
      select 1 from public.task_shares ts
      where ts.owner_id = tags.user_id
        and ts.shared_with_email = (
          select email from auth.users where id = auth.uid()
        )
        and (ts.expires_at is null or ts.expires_at > now())
    )
  );
