-- Add recurrence, notification, and attachment support to deadlines
alter table public.deadlines
  add column if not exists recurrence text default 'none',        -- 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly'
  add column if not exists notify_before_hours integer default 24, -- hours before deadline to notify
  add column if not exists attachment_url text,                    -- public URL of attached file
  add column if not exists attachment_name text;                   -- original filename of attached file
