// Helper partilhado: envia uma notificação Web Push usando VAPID.
// Usado por save-push-subscription (teste) e dispatch-notifications.
import webpush from "npm:web-push@3.6.7";

const VAPID_PUBLIC_KEY = Deno.env.get("VAPID_PUBLIC_KEY")!;
const VAPID_PRIVATE_KEY = Deno.env.get("VAPID_PRIVATE_KEY")!;
const VAPID_SUBJECT = Deno.env.get("VAPID_SUBJECT") ?? "mailto:suporte@focusgrid.app";

webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

export interface PushSubscriptionRow {
  endpoint: string;
  p256dh: string;
  auth_key: string;
}

export async function sendPush(
  sub: PushSubscriptionRow,
  payload: Record<string, unknown>
): Promise<{ ok: boolean; statusCode?: number; expired?: boolean }> {
  try {
    await webpush.sendNotification(
      {
        endpoint: sub.endpoint,
        keys: { p256dh: sub.p256dh, auth: sub.auth_key },
      },
      JSON.stringify(payload)
    );
    return { ok: true };
  } catch (err) {
    const statusCode = err?.statusCode;
    // 404/410 = a subscrição expirou ou foi revogada pelo browser.
    const expired = statusCode === 404 || statusCode === 410;
    return { ok: false, statusCode, expired };
  }
}
