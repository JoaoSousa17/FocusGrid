// Edge Function: cria sessão Stripe Checkout para App, Extensão ou Ambos.
// Body: { plan: "app" | "extension" | "both" }
import { createClient } from "jsr:@supabase/supabase-js@2";
import Stripe from "npm:stripe@17";

const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY")!;
const STRIPE_APP_PRICE_ID = Deno.env.get("STRIPE_APP_PRICE_ID")!;
const STRIPE_EXTENSION_PRICE_ID = Deno.env.get("STRIPE_EXTENSION_PRICE_ID")!;
const STRIPE_BOTH_PRICE_ID = Deno.env.get("STRIPE_BOTH_PRICE_ID")!;
const CHECKOUT_SUCCESS_URL = Deno.env.get("CHECKOUT_SUCCESS_URL") ?? "https://focusgrid.app/billing?success=1";
const CHECKOUT_CANCEL_URL = Deno.env.get("CHECKOUT_CANCEL_URL") ?? "https://focusgrid.app/billing";

const PRICE_MAP: Record<string, string> = {
  app: STRIPE_APP_PRICE_ID,
  extension: STRIPE_EXTENSION_PRICE_ID,
  both: STRIPE_BOTH_PRICE_ID,
};

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

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

  const body = await req.json().catch(() => ({}));
  const plan: string = body.plan ?? "both";
  const priceId = PRICE_MAP[plan];
  if (!priceId) return jsonResponse({ error: "invalid_plan" }, 400);

  // Get or create Stripe customer
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  let customerId = sub?.stripe_customer_id;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { supabase_user_id: user.id },
    });
    customerId = customer.id;
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: CHECKOUT_SUCCESS_URL,
    cancel_url: CHECKOUT_CANCEL_URL,
    client_reference_id: user.id,
    subscription_data: { metadata: { supabase_user_id: user.id, plan } },
  });

  return jsonResponse({ url: session.url });
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
