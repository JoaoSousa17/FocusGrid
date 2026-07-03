// Edge Function: proxy seguro para o LLM (Groq, free tier — llama-3.3-70b-versatile por default).
// Recebe { prompt, response_json_schema? } e devolve texto ou JSON estruturado.
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

  const { prompt, messages, system, response_json_schema, model = "llama-3.3-70b-versatile" } = await req.json();
  if (!prompt && !messages) return jsonResponse({ error: "missing_prompt" }, 400);

  let finalMessages: { role: string; content: string }[];
  if (messages && Array.isArray(messages)) {
    finalMessages = messages;
    if (response_json_schema) {
      const last = finalMessages[finalMessages.length - 1];
      finalMessages = [...finalMessages.slice(0, -1), {
        ...last,
        content: last.content + `\n\nResponde APENAS com JSON válido seguindo este schema: ${JSON.stringify(response_json_schema)}`,
      }];
    }
  } else {
    let finalPrompt = prompt;
    if (response_json_schema) {
      finalPrompt += `\n\nResponde APENAS com JSON válido seguindo este schema: ${JSON.stringify(response_json_schema)}`;
    }
    finalMessages = [{ role: "user", content: finalPrompt }];
  }
  if (system) finalMessages = [{ role: "system", content: system }, ...finalMessages.filter(m => m.role !== "system")];

  const completionRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: finalMessages,
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
