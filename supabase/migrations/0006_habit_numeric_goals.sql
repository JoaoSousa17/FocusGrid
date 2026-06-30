-- FocusGrid — Hábitos: metas numéricas com pontuação percentual.

alter table public.habits
  add column if not exists goal_type text not null default 'boolean'
    check (goal_type in ('boolean', 'numeric')),
  add column if not exists goal_target numeric,
  add column if not exists goal_unit text,
  add column if not exists goal_direction text not null default 'at_least'
    check (goal_direction in ('at_least', 'at_most'));

alter table public.habit_entries
  add column if not exists goal_value numeric;
