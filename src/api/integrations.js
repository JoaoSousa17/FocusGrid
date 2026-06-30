import { supabase } from "./supabaseClient";

function randomFileName(file) {
  const ext = file?.name?.includes(".") ? file.name.split(".").pop() : "bin";
  return `${crypto.randomUUID()}.${ext}`;
}

export const Core = {
  // Upload público — devolve URL CDN permanente (equivalente ao base44 UploadFile).
  async UploadFile({ file }) {
    const path = randomFileName(file);
    const { error } = await supabase.storage.from("public-files").upload(path, file, {
      contentType: file.type,
      upsert: false,
    });
    if (error) throw error;
    const { data } = supabase.storage.from("public-files").getPublicUrl(path);
    return { file_url: data.publicUrl };
  },

  // Upload privado — devolve um identificador interno (file_uri = path no bucket privado).
  async UploadPrivateFile({ file }) {
    const path = randomFileName(file);
    const { error } = await supabase.storage.from("private-files").upload(path, file, {
      contentType: file.type,
      upsert: false,
    });
    if (error) throw error;
    return { file_uri: path };
  },

  async CreateSignedUrl({ file_uri, expires_in = 300 }) {
    const { data, error } = await supabase.storage
      .from("private-files")
      .createSignedUrl(file_uri, expires_in);
    if (error) throw error;
    return { signed_url: data.signedUrl };
  },

  // Transcrição de áudio via Edge Function (proxy seguro para o Whisper).
  async TranscribeAudio({ audio_url }) {
    const { data, error } = await supabase.functions.invoke("transcribe-audio", {
      body: { audio_url },
    });
    if (error) throw error;
    return data.transcript;
  },

  // Email transaccional via Edge Function (proxy seguro para o Resend).
  async SendEmail({ to, subject, body, from_name }) {
    const { data, error } = await supabase.functions.invoke("send-email", {
      body: { to, subject, body, from_name },
    });
    if (error) throw error;
    return data;
  },
};

// Análise/geração de texto estruturado via LLM (proxy seguro server-side).
export async function InvokeLLM({ prompt, response_json_schema, model }) {
  const { data, error } = await supabase.functions.invoke("invoke-llm", {
    body: { prompt, response_json_schema, model },
  });
  if (error) throw error;
  return response_json_schema ? data : data.result;
}

// Web Push: guarda/remove a subscrição do dispositivo atual.
export async function savePushSubscription(subscription) {
  const { error } = await supabase.functions.invoke("save-push-subscription", {
    body: { action: "subscribe", subscription },
  });
  if (error) throw error;
}

export async function removePushSubscription(endpoint) {
  await supabase.functions.invoke("save-push-subscription", {
    body: { action: "unsubscribe", endpoint },
  }).catch(() => {});
}

// Agenda (ou cancela) o aviso de fim de fase do Pomodoro no servidor, para
// chegar como notificação mesmo que a app esteja fechada/em segundo plano.
export async function schedulePomodoroNotification({ firesAt, phase, title, body }) {
  await supabase.functions.invoke("schedule-pomodoro-notification", {
    body: { action: "set", fires_at: firesAt, phase, title, body },
  }).catch(() => {});
}

export async function clearPomodoroNotification() {
  await supabase.functions.invoke("schedule-pomodoro-notification", {
    body: { action: "clear" },
  }).catch(() => {});
}

// Chat multi-turn via Groq — chama a API diretamente do browser (CORS suportado)
export async function InvokeLLMChat({ messages, system, model = "llama-3.3-70b-versatile" }) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) throw new Error("VITE_GROQ_API_KEY não definido no .env");
  const finalMessages = system
    ? [{ role: "system", content: system }, ...messages.filter((m) => m.role !== "system")]
    : messages;
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model, messages: finalMessages }),
  });
  if (!res.ok) throw new Error(`Groq API error: ${res.status}`);
  const json = await res.json();
  return json.choices?.[0]?.message?.content ?? "";
}
