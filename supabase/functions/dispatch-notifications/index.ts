// Edge Function: chamada pelo pg_cron a cada minuto (ver migration 0002).
// Trata 3 tipos de notificação:
//   1. Pomodoro: fases agendadas em pomodoro_schedules cujo fires_at já passou.
//   2. Tarefas de hoje: às 00:00 (Europe/Lisbon), uma vez por utilizador/dia.
//   3. Preencher hábitos: às 22:00 (Europe/Lisbon), uma vez por utilizador/dia,
//      só se existirem hábitos ativos ainda não preenchidos hoje.
import { createClient } from "jsr:@supabase/supabase-js@2";
import { sendPush } from "../_shared/push.ts";

const CRON_SECRET = Deno.env.get("CRON_SECRET");

Deno.serve(async (req) => {
  if (CRON_SECRET) {
    const got = req.headers.get("x-cron-secret");
    if (got !== CRON_SECRET) return jsonResponse({ error: "forbidden" }, 403);
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const results = { pomodoro: 0, daily_tasks: 0, evening_habits: 0 };

  // -------------------------------------------------------------------
  // 1. Pomodoro — fases agendadas que já chegaram à hora.
  // -------------------------------------------------------------------
  const { data: dueSchedules } = await supabase
    .from("pomodoro_schedules")
    .select("user_id, phase, title, body")
    .lte("fires_at", new Date().toISOString());

  for (const sched of dueSchedules ?? []) {
    const sent = await sendToUser(supabase, sched.user_id, {
      title: sched.title,
      body: sched.body,
      tag: "pomodoro",
      data: { kind: "pomodoro", phase: sched.phase },
    });
    if (sent) results.pomodoro++;
    await supabase.from("pomodoro_schedules").delete().eq("user_id", sched.user_id);
  }

  // -------------------------------------------------------------------
  // 2 & 3. Notificações diárias, sincronizadas com a hora de Lisboa.
  // -------------------------------------------------------------------
  const { hour, minute, weekday, dateStr } = getLisbonNow();

  if (hour === 0 && minute === 0) {
    results.daily_tasks = await dispatchDailyTasks(supabase, weekday, dateStr);
  }
  if (hour === 22 && minute === 0) {
    results.evening_habits = await dispatchEveningHabits(supabase, dateStr);
  }

  return jsonResponse({ ok: true, results });
});

async function dispatchDailyTasks(supabase, weekday: string, dateStr: string) {
  const { data: tasks } = await supabase
    .from("tasks")
    .select("created_by_id")
    .eq("weekday", weekday)
    .eq("completed", false);

  const byUser = new Map<string, number>();
  for (const t of tasks ?? []) byUser.set(t.created_by_id, (byUser.get(t.created_by_id) ?? 0) + 1);

  let sentCount = 0;
  for (const [userId, count] of byUser) {
    const { data: already } = await supabase
      .from("notification_log")
      .select("user_id")
      .eq("user_id", userId).eq("kind", "daily_tasks").eq("sent_date", dateStr)
      .maybeSingle();
    if (already) continue;

    const ok = await sendToUser(supabase, userId, {
      title: "FocusGrid",
      body: count === 1 ? "Tens 1 tarefa para hoje." : `Tens ${count} tarefas para hoje.`,
      tag: "daily-tasks",
      data: { kind: "daily_tasks" },
    });
    await supabase.from("notification_log").insert({ user_id: userId, kind: "daily_tasks", sent_date: dateStr });
    if (ok) sentCount++;
  }
  return sentCount;
}

async function dispatchEveningHabits(supabase, dateStr: string) {
  const { data: habits } = await supabase
    .from("habits")
    .select("id, created_by_id")
    .eq("active", true);

  const habitsByUser = new Map<string, string[]>();
  for (const h of habits ?? []) {
    const list = habitsByUser.get(h.created_by_id) ?? [];
    list.push(h.id);
    habitsByUser.set(h.created_by_id, list);
  }

  const { data: doneToday } = await supabase
    .from("habit_entries")
    .select("created_by_id, habit_id")
    .eq("date", dateStr);
  const doneByUser = new Map<string, Set<string>>();
  for (const e of doneToday ?? []) {
    const set = doneByUser.get(e.created_by_id) ?? new Set();
    set.add(e.habit_id);
    doneByUser.set(e.created_by_id, set);
  }

  let sentCount = 0;
  for (const [userId, habitIds] of habitsByUser) {
    const done = doneByUser.get(userId) ?? new Set();
    const pending = habitIds.filter((id) => !done.has(id)).length;
    if (pending === 0) continue;

    const { data: already } = await supabase
      .from("notification_log")
      .select("user_id")
      .eq("user_id", userId).eq("kind", "evening_habits").eq("sent_date", dateStr)
      .maybeSingle();
    if (already) continue;

    const ok = await sendToUser(supabase, userId, {
      title: "FocusGrid",
      body: pending === 1 ? "Ainda tens 1 hábito por preencher hoje." : `Ainda tens ${pending} hábitos por preencher hoje.`,
      tag: "evening-habits",
      data: { kind: "evening_habits" },
    });
    await supabase.from("notification_log").insert({ user_id: userId, kind: "evening_habits", sent_date: dateStr });
    if (ok) sentCount++;
  }
  return sentCount;
}

async function sendToUser(supabase, userId: string, payload: Record<string, unknown>) {
  const { data: subs } = await supabase
    .from("push_subscriptions")
    .select("id, endpoint, p256dh, auth_key")
    .eq("user_id", userId);

  let anySent = false;
  for (const sub of subs ?? []) {
    const result = await sendPush(sub, payload);
    if (result.ok) anySent = true;
    if (result.expired) await supabase.from("push_subscriptions").delete().eq("id", sub.id);
  }
  return anySent;
}

function getLisbonNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Lisbon",
    hour: "2-digit", minute: "2-digit", hour12: false,
    weekday: "long", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    hour: Number(get("hour")),
    minute: Number(get("minute")),
    weekday: get("weekday").toLowerCase(),
    dateStr: `${get("year")}-${get("month")}-${get("day")}`,
  };
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
