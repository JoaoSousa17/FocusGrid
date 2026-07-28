-- Add owner_email to task_shares so recipients can display who shared with them
-- without needing to read the profiles table (avoids separate RLS policy)
alter table public.task_shares
  add column if not exists owner_email text;
