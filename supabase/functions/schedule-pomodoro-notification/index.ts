// Edge Function: agenda (ou cancela) o aviso de fim de fase do Pomodoro.
// Chamado pelo cliente sempre que o timer arranca, pausa ou salta de fase.
// Recebe { action: "set", fires_at, phase, title, body } ou { action: "clear" }.
import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return corsResponse();

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return jsonResponse({ error: "missing_token" }, 401);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } }
  );
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return jsonResponse({ error: "invalid_token" }, 401);

  const body = await req.json();

  if (body.action === "clear") {
    await supabase.from("pomodoro_schedules").delete().eq("user_id", user.id);
    return jsonResponse({ ok: true });
  }

  const { fires_at, phase, title, body: message } = body;
  if (!fires_at || !phase || !title || !message) return jsonResponse({ error: "missing_fields" }, 400);

  const { error } = await supabase.from("pomodoro_schedules").upsert({
    user_id: user.id,
    fires_at,
    phase,
    title,
    body: message,
    updated_date: new Date().toISOString(),
  }, { onConflict: "user_id" });

  if (error) return jsonResponse({ error: "save_failed", details: error.message }, 500);
  return jsonResponse({ ok: true });
});

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders() },
  });
}
function corsResponse() {
  return new Response("ok", { headers: corsHeaders() });
}
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}
