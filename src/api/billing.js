import { supabase } from "./supabaseClient";

const FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;

async function authHeader() {
  const { data } = await supabase.auth.getSession();
  return { Authorization: `Bearer ${data.session?.access_token}` };
}

export const billing = {
  async createCheckoutSession(plan) {
    const res = await fetch(`${FN_URL}/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(await authHeader()) },
      body: JSON.stringify({ plan }),
    });
    const json = await res.json();
    if (json.error) throw new Error(json.error);
    return json.url;
  },

  async createPortalSession() {
    const res = await fetch(`${FN_URL}/create-portal-session`, {
      method: "POST",
      headers: { ...(await authHeader()) },
    });
    const json = await res.json();
    if (json.error) throw new Error(json.error);
    return json.url;
  },
};
