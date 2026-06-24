// Edge Function: transcreve áudio com Groq Whisper (whisper-large-v3-turbo, free tier).
// Recebe { audio_url } e devolve { transcript }.
// A GROQ_API_KEY vive só aqui no servidor — nunca no frontend.
import { createClient } from "jsr:@supabase/supabase-js@2";

const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY")!;

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

  const { audio_url } = await req.json();
  if (!audio_url) return jsonResponse({ error: "missing_audio_url" }, 400);

  const audioRes = await fetch(audio_url);
  if (!audioRes.ok) return jsonResponse({ error: "audio_fetch_failed" }, 502);
  const audioBlob = await audioRes.blob();

  const form = new FormData();
  form.append("file", audioBlob, "audio.webm");
  form.append("model", "whisper-large-v3-turbo");

  const whisperRes = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${GROQ_API_KEY}` },
    body: form,
  });

  if (!whisperRes.ok) {
    const errText = await whisperRes.text();
    return jsonResponse({ error: "whisper_failed", details: errText }, 502);
  }

  const { text } = await whisperRes.json();
  return jsonResponse({ transcript: text });
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
