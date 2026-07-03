-- FocusGrid — Tarefas: opções extra de recorrência (quinzenal, mensal, anual).

alter table public.tasks drop constraint if exists tasks_recurrence_check;
alter table public.tasks add constraint tasks_recurrence_check
  check (recurrence in ('none', 'daily', 'weekly', 'biweekly', 'monthly', 'yearly'));
