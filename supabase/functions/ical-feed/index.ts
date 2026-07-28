// Edge Function: generates a live iCal (.ics) feed for a user.
// URL: /functions/v1/ical-feed?token=USER_TOKEN
// Cache: 30 minutes (clients/calendar apps re-fetch on their own schedule).
//
// Feed includes:
//  - Focus sessions (as VEVENT at their actual times, with tag in summary)
//  - Calendar events (VEVENT at scheduled times)
//  - Deadlines (VEVENT 00:15–00:30 on their due date, prefixed with ⏰)
import { createClient } from "jsr:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return corsResponse();

  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  if (!token) return textResponse("Missing token", 400);

  // Service role client — bypasses RLS to look up token
  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  // Resolve token → user_id
  const { data: tokenRow } = await admin
    .from("ical_tokens")
    .select("user_id")
    .eq("token", token)
    .single();

  if (!tokenRow) return textResponse("Invalid token", 404);
  const userId = tokenRow.user_id;

  // Fetch all data in parallel
  const [sessionsRes, eventsRes, deadlinesRes] = await Promise.all([
    admin.from("focus_sessions").select("*").eq("user_id", userId),
    admin.from("events").select("*").eq("user_id", userId),
    admin.from("deadlines").select("*").eq("user_id", userId),
  ]);

  const sessions: any[]  = sessionsRes.data  || [];
  const events: any[]    = eventsRes.data    || [];
  const deadlines: any[] = deadlinesRes.data || [];

  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//FocusGrid//iCal Feed//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:FocusGrid",
    "X-WR-TIMEZONE:UTC",
    "REFRESH-INTERVAL;VALUE=DURATION:PT30M",
    "X-PUBLISHED-TTL:PT30M",
  ];

  const stamp = formatDT(new Date());

  // ── Focus sessions ────────────────────────────────────────────────────────
  for (const s of sessions) {
    const start = s.started_at || s.created_date;
    const end   = s.ended_at   || s.finished_at;
    if (!start) continue;
    const startDT = new Date(start);
    const endDT   = end ? new Date(end) : new Date(startDT.getTime() + (s.duration_min || 25) * 60_000);
    const tag     = s.tag_name || s.tag || "";
    const summary = tag ? `🍊 Foco – ${escICS(tag)}` : "🍊 Sessão Pomodoro";
    lines.push(
      "BEGIN:VEVENT",
      `UID:focus-${s.id}@focusgrid`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${formatDT(startDT)}`,
      `DTEND:${formatDT(endDT)}`,
      `SUMMARY:${summary}`,
      "CATEGORIES:FocusGrid,Pomodoro",
      "END:VEVENT"
    );
  }

  // ── Calendar events ───────────────────────────────────────────────────────
  for (const ev of events) {
    const date = ev.date || ev.start_time;
    if (!date) continue;
    const startDT = new Date(ev.start_time || date);
    const endDT   = ev.end_time
      ? new Date(ev.end_time)
      : new Date(startDT.getTime() + 60 * 60_000);
    const summary = escICS(ev.name || ev.title || "Evento");
    lines.push(
      "BEGIN:VEVENT",
      `UID:event-${ev.id}@focusgrid`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${formatDT(startDT)}`,
      `DTEND:${formatDT(endDT)}`,
      `SUMMARY:${summary}`,
      ev.description ? `DESCRIPTION:${escICS(ev.description)}` : "",
      "CATEGORIES:FocusGrid,Evento",
      "END:VEVENT"
    );
  }

  // ── Deadlines — 00:15–00:30 on their due date ─────────────────────────────
  for (const d of deadlines) {
    const due = d.due_date || d.date;
    if (!due) continue;
    const day = due.slice(0, 10); // YYYY-MM-DD
    const startDT = new Date(`${day}T00:15:00Z`);
    const endDT   = new Date(`${day}T00:30:00Z`);
    const summary = `⏰ ${escICS(d.title || d.name || "Prazo")}`;
    lines.push(
      "BEGIN:VEVENT",
      `UID:deadline-${d.id}@focusgrid`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${formatDT(startDT)}`,
      `DTEND:${formatDT(endDT)}`,
      `SUMMARY:${summary}`,
      d.description ? `DESCRIPTION:${escICS(d.description)}` : "",
      "CATEGORIES:FocusGrid,Prazo",
      "END:VEVENT"
    );
  }

  lines.push("END:VCALENDAR");

  const body = lines.filter(Boolean).join("\r\n");

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="focusgrid.ics"',
      "Cache-Control": "public, max-age=1800",
      "Access-Control-Allow-Origin": "*",
    },
  });
});

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDT(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function escICS(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function textResponse(msg: string, status = 200) {
  return new Response(msg, {
    status,
    headers: { "Content-Type": "text/plain", "Access-Control-Allow-Origin": "*" },
  });
}

function corsResponse() {
  return new Response("ok", {
    headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, content-type" },
  });
}
