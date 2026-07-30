// Edge Function: webhook do Stripe — atualiza subscriptions conforme eventos.
// Chamado pelo Stripe (sem auth de utilizador), usa service role key.
import { createClient } from "jsr:@supabase/supabase-js@2";
import Stripe from "npm:stripe@17";

const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY")!;
const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

Deno.serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  if (!signature) return new Response("missing_signature", { status: 400 });

  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return new Response(`invalid_signature: ${(err as Error).message}`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id ?? session.metadata?.supabase_user_id;
      if (userId && session.subscription) {
        await upsertSubscription(userId, session.customer as string, session.subscription as string);
      }
      break;
    }
    case "customer.subscription.updated":
    case "customer.subscription.created": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.supabase_user_id;
      if (userId) {
        const plan = subscription.metadata?.plan ?? "both";
        await supabase.from("subscriptions").upsert({
          user_id: userId,
          plan,
          lifetime: false,
          status: mapStripeStatus(subscription.status),
          stripe_subscription_id: subscription.id,
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        }, { onConflict: "user_id" });
      }
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.supabase_user_id;
      if (userId) {
        await supabase.from("subscriptions")
          .update({ status: "canceled", plan: "free", updated_at: new Date().toISOString() })
          .eq("user_id", userId)
          .eq("lifetime", false);
      }
      break;
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
  });
});

async function upsertSubscription(userId: string, customerId: string, subscriptionId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const plan = subscription.metadata?.plan ?? "both";
  await supabase.from("subscriptions").upsert({
    user_id: userId,
    plan,
    lifetime: false,
    status: mapStripeStatus(subscription.status),
    stripe_customer_id: customerId,
    stripe_subscription_id: subscriptionId,
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  }, { onConflict: "user_id" });
}

function mapStripeStatus(stripeStatus: Stripe.Subscription.Status): string {
  if (stripeStatus === "active" || stripeStatus === "trialing") return stripeStatus;
  if (stripeStatus === "past_due" || stripeStatus === "unpaid") return "past_due";
  return "canceled";
}
