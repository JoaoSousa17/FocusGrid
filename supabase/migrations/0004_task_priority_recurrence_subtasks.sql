-- FocusGrid — Tarefas: prioridade, recorrência e subtarefas/checklist.

alter table public.tasks
  add column if not exists priority text not null default 'medium'
    check (priority in ('low', 'medium', 'high')),
  add column if not exists recurrence text not null default 'none'
    check (recurrence in ('none', 'daily', 'weekly')),
  add column if not exists recurrence_id uuid,
  add column if not exists subtasks_json text not null default '[]';
