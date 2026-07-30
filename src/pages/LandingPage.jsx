import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── Platform tags ────────────────────────────────────────────────────────────
function Tag({ type }) {
  const cfg = {
    app: { label: "App", bg: "bg-[#E87A5A]/12 text-[#E87A5A] border-[#E87A5A]/30" },
    ext: { label: "Extensão", bg: "bg-blue-50 text-blue-600 border-blue-200" },
  };
  const { label, bg } = cfg[type];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border tracking-wide ${bg}`}>
      {label}
    </span>
  );
}

// ─── Feature data ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    platforms: ["app"],
    emoji: "📋",
    title: "Task Board Semanal",
    desc: "Organiza a tua semana com um quadro de tarefas visual. Drag & drop entre dias, prioridades, períodos do dia (manhã, tarde, noite), subtarefas, recorrências e partilha em tempo real.",
    color: "#E87A5A",
    gradient: "from-[#E87A5A]/8 to-[#F97316]/5",
    details: ["Subtarefas com pinagem", "Tarefas recorrentes (diária, semanal, mensal…)", "Filtros por período, estado e subtarefas", "Colaboração em tempo real com avatares de presença"],
  },
  {
    platforms: ["app"],
    emoji: "🍊",
    title: "Focus Pomodoro",
    desc: "Temporizador Pomodoro com física realista — por cada sessão concluída uma laranja cai do topo, bate no botão Start e acumula-se no fundo. Analytics de produtividade e calendário de foco.",
    color: "#F97316",
    gradient: "from-[#F97316]/8 to-[#FB923C]/5",
    details: ["Animação de laranjas com colisão e gravidade", "Notificações no fim de cada sessão", "Calendário de foco semanal e mensal", "Análise de produtividade por tag"],
  },
  {
    platforms: ["app"],
    emoji: "✅",
    title: "Hábitos & Recompensas",
    desc: "Regista hábitos diários, acompanha streaks e desbloqueia recompensas. Visualiza o teu progresso com gráficos de calor e mantém a consistência ao longo do tempo.",
    color: "#10B981",
    gradient: "from-emerald-50 to-teal-50/50",
    details: ["Streak tracking com quebras e recuperações", "Sistema de recompensas desbloqueáveis", "Heatmap semanal e analíticas mensais", "Hábitos com frequência personalizada"],
  },
  {
    platforms: ["app"],
    emoji: "📝",
    title: "Notas Inteligentes",
    desc: "Editor rico com formatação completa, tags, cor de fundo, proteção por password, arquivo e partilha por email com roles. IA integrada para ajudar a elaborar ou resumir conteúdo.",
    color: "#8B5CF6",
    gradient: "from-violet-50 to-purple-50/50",
    details: ["Editor WYSIWYG + Markdown", "Tags coloridas (até 3 por nota)", "Partilha com roles (viewer/editor/admin)", "Chat com IA sobre o conteúdo da nota"],
  },
  {
    platforms: ["app"],
    emoji: "⏰",
    title: "Date Control",
    desc: "Centraliza todos os teus prazos e eventos num único lugar. Adiciona ficheiros anexos, define recorrências, configura notificações antecipadas e vê tudo no calendário Pomodoro.",
    color: "#EF4444",
    gradient: "from-rose-50 to-red-50/50",
    details: ["Prazos com recorrência e notificações", "Eventos com duração e localização", "Sincronização com calendário iCal", "Integração automática no calendário de foco"],
  },
  {
    platforms: ["app", "ext"],
    emoji: "🏷️",
    title: "Sistema de Tags",
    desc: "Tags com cores em toda a app — tasks, notas, sessões de foco, hábitos. Filtra, agrupa e personaliza com cores hex livres ou entre 8 cores predefinidas.",
    color: "#F59E0B",
    gradient: "from-amber-50 to-yellow-50/50",
    details: ["Cores hex personalizadas", "Filtros por tag em tasks e notas", "Tags partilhadas entre colaboradores", "Cor no calendário e analytics"],
  },
  {
    platforms: ["app"],
    emoji: "👥",
    title: "Colaboração em Tempo Real",
    desc: "Convida colaboradores para tasks e notas. Vê em tempo real quem está a trabalhar na mesma página com avatares de presença, e as alterações sincronizam em menos de 1 segundo.",
    color: "#06B6D4",
    gradient: "from-cyan-50 to-sky-50/50",
    details: ["Avatares de presença com iniciais e cor única", "Sync instantâneo via Supabase Realtime", "Roles: viewer, editor, admin", "Expiração de acesso configurável"],
  },
  {
    platforms: ["ext"],
    emoji: "⚡",
    title: "Captura Rápida de Tarefas",
    desc: "Adiciona tarefas ao teu Task Board diretamente da barra de ferramentas do browser, sem sair da página onde estás. Nunca percas uma ideia ou To-Do.",
    color: "#3B82F6",
    gradient: "from-blue-50 to-indigo-50/50",
    details: ["Popup de captura em 1 clique", "Seleciona o dia e período", "Sync automático com a app", "Atalho de teclado configurável"],
  },
  {
    platforms: ["ext"],
    emoji: "🤖",
    title: "Meeting AI Summary",
    desc: "Resumo automático de reuniões por IA diretamente no browser. Em desenvolvimento — brevemente disponível para todos os utilizadores premium.",
    color: "#F59E0B",
    gradient: "from-amber-50 to-orange-50/50",
    badge: "Em breve",
    details: ["Transcrição automática", "Resumo com pontos de ação", "Exportação para Notas", "Integração com Google Meet e Teams"],
  },
];

// ─── Parallax feature section ─────────────────────────────────────────────────
function FeatureSection({ feature, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const isEven = index % 2 === 0;

  return (
    <section ref={ref} className="relative py-20 px-6 overflow-hidden">
      {/* Parallax background blob */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.07] ${isEven ? "-right-32 top-0" : "-left-32 bottom-0"}`}
          style={{ backgroundColor: feature.color }}
        />
      </motion.div>

      <motion.div style={{ opacity }} className="max-w-5xl mx-auto">
        <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12`}>
          {/* Text */}
          <div className="flex-1 space-y-5">
            <div className="flex items-center gap-2 flex-wrap">
              {feature.platforms.map((p) => <Tag key={p} type={p} />)}
              {feature.badge && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700 border border-amber-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  {feature.badge}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-5xl">{feature.emoji}</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">{feature.title}</h2>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">{feature.desc}</p>
            <ul className="space-y-2">
              {feature.details.map((d, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                  <span className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: feature.color + "22" }}>
                    <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke={feature.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual card */}
          <div className="flex-1 w-full max-w-md">
            <motion.div
              whileHover={{ scale: 1.02, rotate: isEven ? 1 : -1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className={`rounded-3xl p-8 bg-gradient-to-br ${feature.gradient} border border-white/60 shadow-xl shadow-black/5 backdrop-blur-sm min-h-[220px] flex flex-col items-center justify-center gap-4`}
            >
              <span className="text-7xl drop-shadow-sm">{feature.emoji}</span>
              <div className="text-center">
                <p className="font-bold text-foreground text-lg">{feature.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{feature.platforms.map(p => p === "app" ? "App" : "Extensão").join(" · ")}</p>
              </div>
              <div className="flex gap-1.5 flex-wrap justify-center">
                {feature.details.slice(0, 2).map((d, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-white/70 text-foreground/70 border border-white/50">
                    {d.split(" ").slice(0, 3).join(" ")}…
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
const PLANS = [
  {
    name: "Grátis",
    price: "0€",
    period: "",
    color: "#6B7280",
    accent: "bg-slate-100",
    border: "border-slate-200",
    highlight: false,
    features: [
      { text: "Acesso a conteúdo partilhado por utilizadores premium", ok: true },
      { text: "Ver tasks e notas partilhadas contigo", ok: true },
      { text: "App completa", ok: false },
      { text: "Extensão de browser", ok: false },
      { text: "Colaboração ativa", ok: false },
    ],
    cta: "Começar grátis",
    href: "/register",
  },
  {
    name: "App",
    price: "3€",
    period: "/mês",
    color: "#E87A5A",
    accent: "bg-[#E87A5A]/8",
    border: "border-[#E87A5A]/30",
    highlight: false,
    features: [
      { text: "Task Board semanal com partilha", ok: true },
      { text: "Focus Pomodoro + Analytics", ok: true },
      { text: "Hábitos, Recompensas & Streaks", ok: true },
      { text: "Notas com IA e colaboração", ok: true },
      { text: "Date Control + Calendário", ok: true },
      { text: "Extensão de browser", ok: false },
    ],
    cta: "Subscrever App",
    href: "/register",
  },
  {
    name: "Extensão",
    price: "2€",
    period: "/mês",
    color: "#3B82F6",
    accent: "bg-blue-50",
    border: "border-blue-200",
    highlight: false,
    features: [
      { text: "Captura rápida de tarefas", ok: true },
      { text: "Meeting AI Summary (brevemente)", ok: true },
      { text: "Sync com a App (requer conta)", ok: true },
      { text: "App completa", ok: false },
      { text: "Hábitos & Pomodoro", ok: false },
    ],
    cta: "Subscrever Extensão",
    href: "/register",
  },
  {
    name: "Ambos",
    price: "4€",
    period: "/mês",
    color: "#8B5CF6",
    accent: "bg-violet-50",
    border: "border-violet-300",
    highlight: true,
    badge: "Melhor valor",
    features: [
      { text: "Tudo da App", ok: true },
      { text: "Tudo da Extensão", ok: true },
      { text: "Captura rápida no browser", ok: true },
      { text: "Meeting AI Summary", ok: true },
      { text: "Suporte prioritário", ok: true },
    ],
    cta: "Subscrever Ambos",
    href: "/register",
  },
];

function PricingCard({ plan, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`relative flex flex-col rounded-3xl border-2 p-6 ${plan.border} ${plan.highlight ? "shadow-2xl shadow-violet-200/50 scale-[1.03]" : "shadow-md shadow-black/5"} bg-white`}
    >
      {plan.highlight && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold text-white shadow-lg"
          style={{ background: `linear-gradient(90deg, ${plan.color}, #A78BFA)` }}>
          {plan.badge}
        </div>
      )}

      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 ${plan.accent}`}>
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: plan.color }} />
      </div>

      <p className="text-sm font-semibold text-muted-foreground mb-1">{plan.name}</p>
      <div className="flex items-end gap-1 mb-5">
        <span className="text-4xl font-extrabold text-foreground" style={{ color: plan.color }}>{plan.price}</span>
        {plan.period && <span className="text-sm text-muted-foreground mb-1.5">{plan.period}</span>}
      </div>

      <ul className="space-y-3 flex-1 mb-6">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            {f.ok ? (
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="8" fill={plan.color} fillOpacity="0.12" />
                <path d="M5 8l2 2 4-4" stroke={plan.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="8" fill="#f3f4f6" />
                <path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
            <span className={f.ok ? "text-foreground/80" : "text-muted-foreground/60 line-through"}>{f.text}</span>
          </li>
        ))}
      </ul>

      <Link to={plan.href}
        className="w-full py-3 rounded-2xl text-sm font-semibold text-center transition-all hover:opacity-90 active:scale-95"
        style={plan.highlight
          ? { background: `linear-gradient(90deg, ${plan.color}, #A78BFA)`, color: "white", boxShadow: `0 8px 24px ${plan.color}44` }
          : { backgroundColor: plan.color + "15", color: plan.color }}>
        {plan.cta}
      </Link>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 120]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen bg-[#FDF8F4] text-foreground overflow-x-hidden">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDF8F4]/80 backdrop-blur-lg border-b border-[#E87A5A]/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="FocusGrid" className="w-9 h-9 rounded-xl shadow-sm" />
            <span className="text-lg font-bold">
              <span className="text-[#E87A5A]">Focus</span>Grid
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-xl hover:bg-black/5">
              Entrar
            </Link>
            <Link to="/register"
              className="text-sm font-semibold px-5 py-2 rounded-xl bg-[#E87A5A] text-white shadow-lg shadow-[#E87A5A]/25 hover:bg-[#D4694A] transition-all hover:scale-105 active:scale-95">
              Começar grátis
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 overflow-hidden">
        {/* Background parallax blobs */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-24 right-[-80px] w-[400px] h-[400px] rounded-full bg-[#E87A5A]/10 blur-3xl" />
          <div className="absolute bottom-24 left-[-80px] w-[320px] h-[320px] rounded-full bg-violet-200/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#F97316]/5 blur-3xl" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 text-center max-w-3xl">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
            className="inline-flex mb-8">
            <img src="/logo.png" alt="FocusGrid" className="w-24 h-24 rounded-[28px] shadow-2xl shadow-[#E87A5A]/25" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="text-5xl sm:text-6xl font-extrabold leading-tight mb-5">
            A tua produtividade,{" "}
            <span className="bg-gradient-to-r from-[#E87A5A] to-[#F97316] bg-clip-text text-transparent">
              finalmente organizada
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
            Tasks, Pomodoro, Hábitos, Notas e muito mais — tudo sincronizado entre a app e a extensão de browser, com colaboração em tempo real.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register"
              className="px-8 py-4 rounded-2xl bg-[#E87A5A] text-white font-bold text-base shadow-2xl shadow-[#E87A5A]/30 hover:bg-[#D4694A] transition-all hover:scale-105 active:scale-95">
              Começar grátis 🚀
            </Link>
            <a href="#features"
              className="px-8 py-4 rounded-2xl border border-border bg-white/70 text-foreground font-semibold text-base hover:bg-white transition-all hover:shadow-md">
              Ver funcionalidades
            </a>
          </motion.div>

          {/* Social proof pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-3 mt-10 flex-wrap">
            {["🍊 Focus Pomodoro", "📋 Task Board", "✅ Hábitos", "📝 Notas com IA"].map((label) => (
              <span key={label} className="px-3 py-1.5 rounded-full bg-white border border-border text-xs font-medium text-foreground/70 shadow-sm">
                {label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-[#E87A5A]/30 flex items-start justify-center pt-2">
            <div className="w-1 h-2.5 rounded-full bg-[#E87A5A]/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Platform overview ── */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">Uma plataforma, duas experiências</h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">A App vai contigo em qualquer lugar. A Extensão integra-se no browser onde trabalhas.</p>
        </div>
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { emoji: "📱", label: "App", color: "#E87A5A", tag: "app", desc: "Task Board, Pomodoro, Hábitos, Notas, Prazos, Calendário, IA e colaboração em tempo real." },
            { emoji: "🔌", label: "Extensão", color: "#3B82F6", tag: "ext", desc: "Captura rápida de tarefas no browser, Meeting AI Summary e sync automático com a App." },
          ].map((p) => (
            <motion.div
              key={p.label}
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-border bg-white p-8 shadow-md shadow-black/5 text-center">
              <span className="text-5xl mb-4 block">{p.emoji}</span>
              <Tag type={p.tag} />
              <h3 className="text-xl font-bold text-foreground mt-3 mb-2">FocusGrid {p.label}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features parallax ── */}
      <section id="features" className="pt-8">
        <div className="text-center py-16 px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Tudo o que precisas
          </motion.h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Cada funcionalidade foi desenhada para encaixar no teu fluxo de trabalho, não o contrário.</p>
        </div>
        {FEATURES.map((f, i) => <FeatureSection key={f.title} feature={f} index={i} />)}
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 px-6 bg-white/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Preços simples e transparentes
            </motion.h2>
            <p className="text-muted-foreground max-w-md mx-auto">Começa grátis a receber conteúdo partilhado. Subscreve quando quiseres criar e colaborar.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
            {PLANS.map((plan, i) => <PricingCard key={plan.name} plan={plan} index={i} />)}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xs text-muted-foreground mt-8">
            Sem contratos. Cancela quando quiseres. IVA não incluído.
          </motion.p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#E87A5A]/8 blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-xl mx-auto space-y-6">
          <span className="text-6xl">🍊</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">Pronto para focar?</h2>
          <p className="text-muted-foreground text-lg">Junta-te a quem já transforma sessões de foco em laranjas. Começa hoje, é grátis.</p>
          <Link to="/register"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-[#E87A5A] text-white font-bold text-base shadow-2xl shadow-[#E87A5A]/30 hover:bg-[#D4694A] transition-all hover:scale-105 active:scale-95">
            Criar conta grátis
          </Link>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-border py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="FocusGrid" className="w-8 h-8 rounded-xl" />
              <span className="font-bold text-base">
                <span className="text-[#E87A5A]">Focus</span>Grid
              </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm text-muted-foreground flex-wrap justify-center">
              <a href="#features" className="hover:text-foreground transition-colors">Funcionalidades</a>
              <a href="#pricing" className="hover:text-foreground transition-colors">Preços</a>
              <Link to="/login" className="hover:text-foreground transition-colors">Entrar</Link>
              <Link to="/register" className="hover:text-foreground transition-colors">Criar conta</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">Termos</Link>
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacidade</Link>
            </nav>
          </div>
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} FocusGrid. Todos os direitos reservados.</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Todos os serviços operacionais</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
