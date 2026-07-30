import { useState, useEffect } from "react";
import { supabase } from "@/api/supabaseClient";
import { useAuth } from "@/lib/AuthContext";

export function usePlan() {
  const { user } = useAuth();
  const [data, setData] = useState({ plan: "free", lifetime: false, status: "active", current_period_end: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }

    const load = async () => {
      const { data: row } = await supabase
        .from("subscriptions")
        .select("plan, lifetime, status, current_period_end")
        .eq("user_id", user.id)
        .maybeSingle();

      if (row) {
        const active = row.lifetime || row.status === "active" || row.status === "trialing";
        setData({ ...row, plan: active ? row.plan : "free" });
      }
      setLoading(false);
    };

    load();

    const ch = supabase.channel(`plan:${user.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "subscriptions", filter: `user_id=eq.${user.id}` }, load)
      .subscribe();

    return () => supabase.removeChannel(ch);
  }, [user]);

  const hasApp = data.plan === "app" || data.plan === "both";
  const hasExtension = data.plan === "extension" || data.plan === "both";
  const isPaid = data.plan !== "free";

  return { ...data, loading, hasApp, hasExtension, isPaid };
}
