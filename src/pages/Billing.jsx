import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, X, Crown, Zap, ExternalLink, ArrowLeft, Infinity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlan } from "@/hooks/usePlan";
import { billing } from "@/api/billing";

const PLANS = [
  {
    id: "app",
    name: "App",
    price: "3€",
    period: "/mês",
    color: "#E87A5A",
    accent: "bg-[#E87A5A]/10",
    border: "border-[#E87A5A]/30",
    features: [
      "Task Board semanal com partilha",
      "Focus Pomodoro + Analytics",
      "Hábitos, Recompensas & Streaks",
      "Notas com IA e colaboração",
      "Date Control + Calendário",
    ],
    notIncluded: ["Extensão de browser", "Captura rápida"],
  },
  {
    id: "extension",
    name: "Extensão",
    price: "2€",
    period: "/mês",
    color: "#3B82F6",
    accent: "bg-blue-50",
    border: "border-blue-200",
    features: [
      "Captura rápida de tarefas no browser",
      "Meeting AI Summary (brevemente)",
      "Sync automático com a App",
    ],
    notIncluded: ["App completa", "Hábitos & Pomodoro"],
  },
  {
    id: "both",
    name: "Ambos",
    price: "4€",
    period: "/mês",
    color: "#8B5CF6",
    accent: "bg-violet-50",
    border: "border-violet-300",
    highlight: true,
    badge: "Melhor valor",
    features: [
      "Tudo da App",
      "Tudo da Extensão",
      "Captura rápida no browser",
      "Meeting AI Summary",
      "Suporte prioritário",
    ],
    notIncluded: [],
  },
];

const PLAN_LABELS = { free: "Grátis", app: "App", extension: "Extensão", both: "Ambos" };
const PLAN_COLORS = { free: "#6B7280", app: "#E87A5A", extension: "#3B82F6", both: "#8B5CF6" };

function PlanBadge({ plan, lifetime }) {
  const color = PLAN_COLORS[plan] ?? "#6B7280";
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white"
      style={{ backgroundColor: color }}>
      {lifetime ? <Infinity className="w-3 h-3" /> : <Crown className="w-3 h-3" />}
      {PLAN_LABELS[plan] ?? plan}
      {lifetime && " · Vitalício"}
    </span>
  );
}

export default function Billing() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success") === "1";
  const { plan, lifetime, loading, current_period_end } = usePlan();
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpgrade = async (planId) => {
    setError("");
    setLoadingPlan(planId);
    try {
      const url = await billing.createCheckoutSession(planId);
      window.location.href = url;
    } catch (e) {
      setError(e.message);
      setLoadingPlan(null);
    }
  };

  const handlePortal = async () => {
    setError("");
    setPortalLoading(true);
    try {
      const url = await billing.createPortalSession();
      window.open(url, "_blank");
    } catch (e) {
      setError("Não foi possível abrir o portal de faturação.");
    } finally {
      setPortalLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream px-4 py-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Plano & Faturação</h1>
        <p className="text-sm text-muted-foreground mt-1">Gere a tua subscrição do FocusGrid</p>
      </div>

      {/* Success banner */}
      {success && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
            <Check className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-800">Subscrição ativada com sucesso!</p>
            <p className="text-xs text-emerald-600">A tua conta foi atualizada. Aproveita todas as funcionalidades.</p>
          </div>
        </motion.div>
      )}

      {/* Current plan card */}
      {!loading && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-white rounded-3xl border border-border p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-2">Plano atual</p>
              <PlanBadge plan={plan} lifetime={lifetime} />
              {!lifetime && current_period_end && plan !== "free" && (
                <p className="text-xs text-muted-foreground mt-2">
                  Renova em {new Date(current_period_end).toLocaleDateString("pt-PT")}
                </p>
              )}
              {lifetime && (
                <p className="text-xs text-emerald-600 mt-2 font-medium">Acesso vitalício — sem renovações</p>
              )}
              {plan === "free" && (
                <p className="text-xs text-muted-foreground mt-2">Subscreve para desbloquear todas as funcionalidades</p>
              )}
            </div>
            {plan !== "free" && !lifetime && (
              <Button variant="outline" size="sm" onClick={handlePortal} disabled={portalLoading}
                className="rounded-xl gap-1.5 text-xs">
                {portalLoading ? <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" /> : <ExternalLink className="w-3 h-3" />}
                Gerir faturação
              </Button>
            )}
          </div>
        </motion.div>
      )}

      {error && (
        <p className="mb-6 text-sm text-destructive bg-destructive/5 rounded-xl px-4 py-2.5">{error}</p>
      )}

      {/* Upgrade plans — only show if not on lifetime both */}
      {!(lifetime && plan === "both") && (
        <>
          <h2 className="text-base font-semibold text-foreground mb-4">
            {plan === "free" ? "Escolhe um plano" : "Mudar de plano"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PLANS.map((p, i) => {
              const isCurrent = p.id === plan;
              return (
                <motion.div key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`relative flex flex-col rounded-3xl border-2 p-5 bg-white ${p.border} ${p.highlight ? "shadow-xl shadow-violet-100" : "shadow-sm"}`}>
                  {p.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold text-white"
                      style={{ background: `linear-gradient(90deg, ${p.color}, #A78BFA)` }}>
                      {p.badge}
                    </div>
                  )}

                  <div className={`w-9 h-9 rounded-2xl flex items-center justify-center mb-3 ${p.accent}`}>
                    <Zap className="w-4 h-4" style={{ color: p.color }} />
                  </div>

                  <p className="text-xs font-semibold text-muted-foreground mb-0.5">{p.name}</p>
                  <div className="flex items-end gap-1 mb-4">
                    <span className="text-3xl font-extrabold" style={{ color: p.color }}>{p.price}</span>
                    <span className="text-xs text-muted-foreground mb-1">{p.period}</span>
                  </div>

                  <ul className="space-y-2 flex-1 mb-5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-foreground/80">
                        <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: p.color }} />
                        {f}
                      </li>
                    ))}
                    {p.notIncluded.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground/50 line-through">
                        <X className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-slate-300" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleUpgrade(p.id)}
                    disabled={isCurrent || loadingPlan === p.id}
                    className="w-full rounded-2xl text-xs font-semibold h-10"
                    style={p.highlight && !isCurrent
                      ? { background: `linear-gradient(90deg, ${p.color}, #A78BFA)`, color: "white" }
                      : {}
                    }
                    variant={isCurrent ? "outline" : p.highlight ? "default" : "outline"}>
                    {loadingPlan === p.id
                      ? <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                      : isCurrent ? "Plano atual" : `Subscrever ${p.name}`}
                  </Button>
                </motion.div>
              );
            })}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Pagamento seguro via Stripe · Cancela quando quiseres
          </p>
        </>
      )}

      {lifetime && plan === "both" && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[20px] bg-violet-100 mb-4">
            <Infinity className="w-8 h-8 text-violet-600" />
          </div>
          <p className="font-bold text-foreground text-lg">Acesso completo vitalício</p>
          <p className="text-sm text-muted-foreground mt-1">Tens todas as funcionalidades da App e da Extensão para sempre.</p>
        </div>
      )}
    </div>
  );
}
