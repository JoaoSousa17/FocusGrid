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
