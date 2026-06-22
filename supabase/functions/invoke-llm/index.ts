// Edge Function: proxy seguro para o LLM (OpenAI gpt-4o-mini por default).
// Recebe { prompt, response_json_schema? } e devolve texto ou JSON estruturado.
import { createClient } from "jsr:@supabase/supabase-js@2";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY")!;

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

  const { prompt, response_json_schema, model = "gpt-4o-mini" } = await req.json();
  if (!prompt) return jsonResponse({ error: "missing_prompt" }, 400);

  let finalPrompt = prompt;
  if (response_json_schema) {
    finalPrompt += `\n\nResponde APENAS com JSON válido seguindo este schema: ${JSON.stringify(response_json_schema)}`;
  }

  const completionRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: finalPrompt }],
      response_format: response_json_schema ? { type: "json_object" } : undefined,
    }),
  });

  if (!completionRes.ok) {
    const errText = await completionRes.text();
    return jsonResponse({ error: "llm_failed", details: errText }, 502);
  }

  const data = await completionRes.json();
  const content = data.choices[0].message.content;
  return jsonResponse(response_json_schema ? JSON.parse(content) : { result: content });
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
