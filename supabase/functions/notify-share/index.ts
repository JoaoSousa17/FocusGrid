// Edge Function: sends an email to a newly added share recipient.
// Called from the client after a successful task_shares upsert.
// Requires: RESEND_API_KEY set as a Supabase secret (supabase secrets set RESEND_API_KEY=re_...)
// Also uses SUPABASE_URL for the app link.
import { createClient } from "jsr:@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const SUPABASE_URL   = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY    = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// The "from" address must be a verified domain in your Resend account.
// Default uses Resend's sandbox address for testing.
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "FocusGrid <noreply@focusgrid.app>";
const APP_URL    = Deno.env.get("APP_URL")    || "https://focusgrid.app";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return corsResponse();
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  // Auth: only authenticated users can trigger this
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return json({ error: "Unauthorized" }, 401);

  const admin = createClient(SUPABASE_URL, SERVICE_KEY);
  const anonClient = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY") || "", {
    global: { headers: { Authorization: authHeader } },
  });

  const { data: { user } } = await anonClient.auth.getUser();
  if (!user) return json({ error: "Unauthorized" }, 401);

  const body = await req.json().catch(() => ({}));
  const { shared_with_email, role, expires_at } = body;

  if (!shared_with_email || !role) return json({ error: "Missing fields" }, 400);

  // Build expiry text
  let expiryText = "sem data de expiração (acesso indefinido).";
  if (expires_at) {
    const d = new Date(expires_at);
    expiryText = `até ${d.toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" })}.`;
  }

  const roleLabel = role === "editor" ? "Editor (pode criar e editar tarefas)" : "Visualizador (pode ver as tarefas)";
  const ownerName = user.user_metadata?.full_name || user.email || "Alguém";
  const tasksUrl  = `${APP_URL}/tasks`;

  const html = `
<!DOCTYPE html>
<html lang="pt">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8f7f4;font-family:system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7f4;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" style="max-width:520px;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);">
        <!-- Header -->
        <tr>
          <td style="background:#E87A5A;padding:32px 40px;text-align:center;">
            <p style="margin:0;font-size:28px;font-weight:800;color:#fff;letter-spacing:-0.5px;">FocusGrid</p>
            <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,.8);">A tua produtividade com ritmo</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#1a1a1a;">Tens acesso à planilha 🎉</p>
            <p style="margin:0 0 24px;font-size:15px;color:#6b7280;line-height:1.6;">
              <strong style="color:#1a1a1a;">${ownerName}</strong> partilhou a planilha de tarefas contigo no FocusGrid.
            </p>

            <!-- Info card -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7f4;border-radius:12px;margin-bottom:28px;">
              <tr><td style="padding:20px 24px;">
                <table width="100%" cellpadding="0" cellspacing="4">
                  <tr>
                    <td style="font-size:12px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:.6px;padding-bottom:4px;">Função</td>
                    <td style="font-size:14px;color:#1a1a1a;font-weight:600;text-align:right;">${roleLabel}</td>
                  </tr>
                  <tr><td colspan="2" style="border-top:1px solid #e5e7eb;padding:8px 0;"></td></tr>
                  <tr>
                    <td style="font-size:12px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:.6px;">Acesso válido</td>
                    <td style="font-size:14px;color:#1a1a1a;font-weight:600;text-align:right;">${expiryText}</td>
                  </tr>
                </table>
              </td></tr>
            </table>

            <!-- CTA button -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td align="center">
                <a href="${tasksUrl}" style="display:inline-block;background:#E87A5A;color:#fff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:14px;letter-spacing:.2px;">
                  Abrir planilha →
                </a>
              </td></tr>
            </table>

            <p style="margin:28px 0 0;font-size:12px;color:#9ca3af;text-align:center;line-height:1.6;">
              Se não tens conta no FocusGrid, regista-te gratuitamente em<br>
              <a href="${APP_URL}" style="color:#E87A5A;text-decoration:none;font-weight:600;">${APP_URL}</a>
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f8f7f4;padding:20px 40px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:11px;color:#d1d5db;">© FocusGrid · Este email foi enviado porque alguém partilhou uma planilha contigo.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const textBody = `${ownerName} partilhou a planilha de tarefas contigo no FocusGrid.\n\nFunção: ${roleLabel}\nAcesso válido: ${expiryText}\n\nAcede aqui: ${tasksUrl}\n\nSe não tens conta, regista-te em ${APP_URL}`;

  if (!RESEND_API_KEY) {
    // If no Resend key configured, log and return success so the share still works
    console.warn("RESEND_API_KEY not set — email not sent to", shared_with_email);
    return json({ ok: true, sent: false, reason: "no_api_key" });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [shared_with_email],
      subject: `${ownerName} partilhou uma planilha contigo no FocusGrid`,
      html,
      text: textBody,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", err);
    return json({ ok: false, error: err }, 500);
  }

  return json({ ok: true, sent: true });
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}

function corsResponse() {
  return new Response("ok", {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "authorization, content-type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    },
  });
}
