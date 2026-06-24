// Edge Function: envia email transaccional via Resend.
// Recebe { to, subject, body, from_name? }.
import { createClient } from "jsr:@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const FROM_DOMAIN = Deno.env.get("EMAIL_FROM") ?? "FocusGrid <noreply@focusgrid.app>";

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

  const { to, subject, body, from_name } = await req.json();
  if (!to || !subject || !body) return jsonResponse({ error: "missing_fields" }, 400);

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: from_name ? `${from_name} <noreply@focusgrid.app>` : FROM_DOMAIN,
      to: Array.isArray(to) ? to : [to],
      subject,
      html: body,
    }),
  });

  if (!resendRes.ok) {
    const errText = await resendRes.text();
    return jsonResponse({ error: "resend_failed", details: errText }, 502);
  }

  const data = await resendRes.json();
  return jsonResponse(data);
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
