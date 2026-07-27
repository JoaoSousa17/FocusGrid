import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, User, Shield, Bell, Clock, Settings, Download,
  ChevronRight, Check, Loader2, QrCode, Key, Trash2, LogOut,
  RefreshCw, CalendarDays, Volume2, Moon, Sun, Globe
} from "lucide-react";
import { auth } from "@/api/auth";
import { supabase } from "@/api/supabaseClient";
import { useLang } from "@/context/LangContext";
import { savePushSubscription, removePushSubscription } from "@/api/integrations";

// ---------- helpers ----------
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

async function enablePush() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;
  const perm = await Notification.requestPermission();
  if (perm !== "granted") return;
  const reg = await navigator.serviceWorker.ready;
  let sub = await reg.pushManager.getSubscription();
  if (!sub) {
    sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_VAPID_PUBLIC_KEY || ""),
    });
  }
  await savePushSubscription(sub.toJSON());
}

async function disablePush() {
  if (!("serviceWorker" in navigator)) return;
  const reg = await navigator.serviceWorker.ready;
  const sub = await reg.pushManager.getSubscription();
  if (sub) {
    await removePushSubscription(sub.endpoint).catch(() => {});
    await sub.unsubscribe();
  }
}

function TabBtn({ active, onClick, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all w-full text-left ${
        active
          ? "bg-[#E87A5A] text-white shadow-md shadow-[#E87A5A]/25"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
      }`}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span>{label}</span>
    </button>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-2 px-1">{title}</p>
      <div className="bg-white rounded-2xl border border-border shadow-sm divide-y divide-border overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function Row({ icon: Icon, label, value, onClick, danger, children }) {
  return (
    <div
      className={`flex items-center justify-between gap-3 px-4 py-3.5 ${onClick ? "cursor-pointer hover:bg-secondary/30 transition-colors" : ""} ${danger ? "text-red-500" : ""}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 min-w-0">
        {Icon && <Icon className={`w-4 h-4 flex-shrink-0 ${danger ? "text-red-500" : "text-muted-foreground"}`} />}
        <span className={`text-sm font-medium truncate ${danger ? "text-red-500" : "text-foreground"}`}>{label}</span>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {value && <span className="text-xs text-muted-foreground">{value}</span>}
        {children}
        {onClick && !children && <ChevronRight className="w-4 h-4 text-muted-foreground/50" />}
      </div>
    </div>
  );
}

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${on ? "bg-[#E87A5A]" : "bg-border"}`}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow"
        style={{ left: on ? "calc(100% - 1.375rem)" : "0.125rem" }}
      />
    </button>
  );
}

function SliderRow({ label, value, onChange, min, max, unit }) {
  return (
    <div className="px-4 py-3">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm font-bold text-[#E87A5A]">{value}{unit}</span>
      </div>
      <input
        type="range" min={min} max={max} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#E87A5A] h-1.5 rounded-full cursor-pointer"
      />
    </div>
  );
}

// ---------- Tabs ----------

function AccountTab({ user }) {
  const [exporting, setExporting] = useState(false);

  const exportData = async () => {
    setExporting(true);
    try {
      const uid = user?.id;
      const tables = ["tasks", "habits", "habit_logs", "deadlines", "focus_sessions", "meeting_recordings", "events"];
      const result = {};
      for (const t of tables) {
        const { data } = await supabase.from(t).select("*").eq("user_id", uid);
        result[t] = data || [];
      }
      result._exported_at = new Date().toISOString();
      result._user = { id: uid, email: user?.email };
      const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `focusgrid-export-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div>
      <Section title="Conta">
        <Row icon={User} label="Email" value={user?.email} />
        <Row icon={User} label="Nome" value={user?.user_metadata?.full_name || "—"} />
      </Section>
      <Section title="Google Calendar">
        <Row icon={CalendarDays} label="Ligar Google Calendar"
          value="Em breve"
        />
        <Row icon={CalendarDays} label="Exportar como .ics (iCal)"
          onClick={async () => {
            const { data } = await supabase.from("events").select("*").eq("user_id", user?.id);
            if (!data?.length) return alert("Sem eventos para exportar.");
            const lines = [
              "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//FocusGrid//EN",
              ...data.map((ev) => [
                "BEGIN:VEVENT",
                `UID:${ev.id}@focusgrid`,
                `SUMMARY:${ev.name || "Evento"}`,
                `DTSTART:${(ev.start_time || ev.date || "").replace(/[-:]/g, "").slice(0, 15)}Z`,
                `DTEND:${(ev.end_time || ev.date || "").replace(/[-:]/g, "").slice(0, 15)}Z`,
                "END:VEVENT"
              ].join("\r\n")),
              "END:VCALENDAR"
            ];
            const blob = new Blob([lines.join("\r\n")], { type: "text/calendar" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url; a.download = "focusgrid.ics"; a.click();
            URL.revokeObjectURL(url);
          }}
        />
      </Section>
      <Section title="Dados">
        <Row
          icon={Download}
          label="Exportar todos os dados (JSON)"
          onClick={exportData}
        >
          {exporting && <Loader2 className="w-4 h-4 animate-spin text-[#E87A5A]" />}
        </Row>
      </Section>
    </div>
  );
}

function SecurityTab() {
  const [factors, setFactors] = useState([]);
  const [enrolling, setEnrolling] = useState(false);
  const [qrUri, setQrUri] = useState(null);
  const [secret, setSecret] = useState(null);
  const [factorId, setFactorId] = useState(null);
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [step, setStep] = useState("idle"); // idle | qr | verify | done
  const [unenrolling, setUnenrolling] = useState(false);
  const [changingPw, setChangingPw] = useState(false);
  const [pwMsg, setPwMsg] = useState("");

  useEffect(() => {
    supabase.auth.mfa.listFactors().then(({ data }) => {
      setFactors(data?.totp || []);
    });
  }, []);

  const startEnroll = async () => {
    setEnrolling(true);
    const { data, error } = await supabase.auth.mfa.enroll({ factorType: "totp" });
    setEnrolling(false);
    if (error) { alert("Erro: " + error.message); return; }
    setQrUri(data.totp.qr_code);
    setSecret(data.totp.secret);
    setFactorId(data.id);
    setStep("qr");
  };

  const verifyCode = async () => {
    setVerifying(true);
    const { data: challengeData, error: cErr } = await supabase.auth.mfa.challenge({ factorId });
    if (cErr) { setVerifying(false); alert("Erro: " + cErr.message); return; }
    const { error: vErr } = await supabase.auth.mfa.verify({
      factorId, challengeId: challengeData.id, code
    });
    setVerifying(false);
    if (vErr) { alert("Código inválido. Tenta novamente."); return; }
    setStep("done");
    setFactors((prev) => [...prev, { id: factorId, status: "verified" }]);
  };

  const unenroll = async (id) => {
    setUnenrolling(true);
    await supabase.auth.mfa.unenroll({ factorId: id });
    setFactors((prev) => prev.filter((f) => f.id !== id));
    setUnenrolling(false);
  };

  const sendResetEmail = async () => {
    setChangingPw(true);
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    setPwMsg("Email enviado! Verifica a tua caixa de entrada.");
    setChangingPw(false);
  };

  const activeFactor = factors.find((f) => f.status === "verified");

  return (
    <div>
      <Section title="Autenticação de 2 fatores (2FA)">
        {activeFactor ? (
          <Row icon={Shield} label="2FA ativo (TOTP)">
            <button
              onClick={() => unenroll(activeFactor.id)}
              disabled={unenrolling}
              className="text-xs text-red-500 font-semibold px-3 py-1 rounded-lg border border-red-200 hover:bg-red-50 transition-all"
            >
              {unenrolling ? "A remover..." : "Desativar"}
            </button>
          </Row>
        ) : (
          <>
            <Row icon={QrCode} label="Ativar 2FA com autenticador"
              onClick={step === "idle" ? startEnroll : undefined}
            >
              {enrolling && <Loader2 className="w-4 h-4 animate-spin" />}
            </Row>
            <AnimatePresence>
              {step === "qr" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="px-4 py-4 bg-secondary/20 overflow-hidden">
                  <p className="text-xs text-muted-foreground mb-3">Lê o QR code com o teu autenticador (Google Authenticator, Authy, etc.)</p>
                  {qrUri && <img src={qrUri} alt="QR Code" className="w-40 h-40 mx-auto rounded-xl mb-3" />}
                  <p className="text-[11px] text-muted-foreground text-center mb-4 font-mono break-all px-4">{secret}</p>
                  <div className="flex gap-2">
                    <input
                      value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="Código de 6 dígitos"
                      className="flex-1 px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:border-[#E87A5A]"
                    />
                    <button onClick={verifyCode} disabled={code.length !== 6 || verifying}
                      className="px-4 py-2 bg-[#E87A5A] text-white text-sm font-semibold rounded-xl disabled:opacity-50 transition-all">
                      {verifying ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verificar"}
                    </button>
                  </div>
                </motion.div>
              )}
              {step === "done" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="px-4 py-3 bg-green-50 flex items-center gap-2 text-green-700 text-sm">
                  <Check className="w-4 h-4" /> 2FA ativado com sucesso!
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </Section>
      <Section title="Palavra-passe">
        <Row icon={Key} label="Alterar palavra-passe" onClick={sendResetEmail}>
          {changingPw && <Loader2 className="w-4 h-4 animate-spin" />}
        </Row>
        {pwMsg && (
          <div className="px-4 py-2.5 text-xs text-green-700 bg-green-50">{pwMsg}</div>
        )}
      </Section>
    </div>
  );
}

function PomodoroTab() {
  const [focusMin, setFocusMin] = useState(25);
  const [shortBreakMin, setShortBreakMin] = useState(5);
  const [longBreakMin, setLongBreakMin] = useState(20);
  const [orangeReset, setOrangeReset] = useState("weekly");
  const [saved, setSaved] = useState(false);

  const RESET_OPTIONS = [
    { key: "weekly", label: "Semanal" },
    { key: "monthly", label: "Mensal" },
    { key: "yearly", label: "Anual" },
    { key: "never", label: "Nunca" },
  ];

  useEffect(() => {
    auth.me().then((u) => {
      const m = u?.user_metadata || {};
      if (m.focus_min) setFocusMin(m.focus_min);
      if (m.short_break_min) setShortBreakMin(m.short_break_min);
      if (m.long_break_min) setLongBreakMin(m.long_break_min);
      if (m.orange_reset) setOrangeReset(m.orange_reset);
    }).catch(() => {});
  }, []);

  const save = async () => {
    await supabase.auth.updateUser({ data: { focus_min: focusMin, short_break_min: shortBreakMin, long_break_min: longBreakMin, orange_reset: orangeReset } });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <Section title="Tempos do Pomodoro">
        <SliderRow label="Foco" value={focusMin} onChange={setFocusMin} min={5} max={120} unit=" min" />
        <SliderRow label="Pausa curta" value={shortBreakMin} onChange={setShortBreakMin} min={1} max={30} unit=" min" />
        <SliderRow label="Pausa longa" value={longBreakMin} onChange={setLongBreakMin} min={5} max={60} unit=" min" />
      </Section>
      <Section title="Reinício das Laranjas">
        <div className="px-4 py-3 flex flex-wrap gap-2">
          {RESET_OPTIONS.map((o) => (
            <button key={o.key} onClick={() => setOrangeReset(o.key)}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-medium border transition-all ${
                orangeReset === o.key
                  ? "bg-[#E87A5A] text-white border-[#E87A5A]"
                  : "bg-white text-muted-foreground border-border hover:border-[#E87A5A]/40"
              }`}>
              {o.label}
            </button>
          ))}
        </div>
      </Section>
      <button onClick={save}
        className="w-full py-3 rounded-2xl bg-[#E87A5A] text-white font-semibold text-sm shadow-md shadow-[#E87A5A]/25 flex items-center justify-center gap-2 transition-all hover:bg-[#D4694A] active:scale-95">
        {saved ? <><Check className="w-4 h-4" /> Guardado!</> : "Guardar"}
      </button>
    </div>
  );
}

function NotificationsTab() {
  const [notifs, setNotifs] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    auth.me().then((u) => {
      const m = u?.user_metadata || {};
      if (m.notifications_enabled !== undefined) setNotifs(m.notifications_enabled);
    }).catch(() => {});
  }, []);

  const toggle = async (val) => {
    setNotifs(val);
    if (val) await enablePush().catch(() => {});
    else await disablePush().catch(() => {});
    await supabase.auth.updateUser({ data: { notifications_enabled: val } });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <Section title="Push Notifications">
        <Row icon={Bell} label="Notificações push">
          <Toggle on={notifs} onChange={toggle} />
        </Row>
        {saved && (
          <div className="px-4 py-2 text-xs text-green-700 bg-green-50 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5" /> Preferências guardadas
          </div>
        )}
      </Section>
      <Section title="Tipos">
        <Row icon={Clock} label="Fim de sessão Pomodoro" value="Sempre ativo" />
        <Row icon={Bell} label="Prazos próximos" value="24h antes" />
      </Section>
    </div>
  );
}

function GeneralTab() {
  const { lang, setLang, t } = useLang();
  const [weekStartsOn, setWeekStartsOn] = useState(1);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    auth.me().then((u) => {
      const m = u?.user_metadata || {};
      if (m.week_starts_on !== undefined) setWeekStartsOn(m.week_starts_on);
    }).catch(() => {});
  }, []);

  const save = async () => {
    await supabase.auth.updateUser({ data: { week_starts_on: weekStartsOn } });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <Section title={t("profile.language")}>
        <div className="px-4 py-3">
          <p className="text-xs text-muted-foreground mb-3">{t("profile.language_sub")}</p>
          <div className="flex gap-2">
            {[{ key: "en", label: "English" }, { key: "pt", label: "Português" }].map((o) => (
              <button key={o.key} onClick={() => setLang(o.key)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${
                  lang === o.key
                    ? "bg-[#E87A5A] text-white border-[#E87A5A]"
                    : "bg-white text-muted-foreground border-border hover:border-[#E87A5A]/40"
                }`}>
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </Section>
      <Section title={t("profile.week_start")}>
        <div className="px-4 py-3">
          <div className="flex gap-2">
            {[{ key: 0, label: t("profile.sunday") }, { key: 1, label: t("profile.monday") }].map((o) => (
              <button key={o.key} onClick={() => setWeekStartsOn(o.key)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${
                  weekStartsOn === o.key
                    ? "bg-[#E87A5A] text-white border-[#E87A5A]"
                    : "bg-white text-muted-foreground border-border hover:border-[#E87A5A]/40"
                }`}>
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </Section>
      <button onClick={save}
        className="w-full py-3 rounded-2xl bg-[#E87A5A] text-white font-semibold text-sm shadow-md shadow-[#E87A5A]/25 flex items-center justify-center gap-2 transition-all hover:bg-[#D4694A] active:scale-95">
        {saved ? <><Check className="w-4 h-4" /> {t("save")}d!</> : t("save")}
      </button>
    </div>
  );
}

// ---------- Main ----------

export default function Profile() {
  const navigate = useNavigate();
  const { t } = useLang();
  const [tab, setTab] = useState("account");
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [exitX, setExitX] = useState(0);
  const swipeStartX = useRef(null);

  const TABS = [
    { key: "account", icon: User, label: t("profile.tab.account") },
    { key: "security", icon: Shield, label: t("profile.tab.security") },
    { key: "pomodoro", icon: Clock, label: t("profile.tab.pomodoro") },
    { key: "notifications", icon: Bell, label: t("profile.tab.notifications") },
    { key: "general", icon: Settings, label: t("profile.tab.general") },
  ];

  useEffect(() => {
    auth.me().then(setUser).catch(() => {});
  }, []);

  const handleSwipeStart = (e) => {
    swipeStartX.current = (e.touches?.[0] ?? e).clientX;
  };
  const handleSwipeEnd = (e) => {
    if (swipeStartX.current === null) return;
    const dx = (e.changedTouches?.[0] ?? e).clientX - swipeStartX.current;
    if (dx > 80) {
      setExitX("100%");
      setTimeout(() => navigate("/"), 240);
    }
    swipeStartX.current = null;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const currentTab = TABS.find((t) => t.key === tab);

  return (
    <motion.div
      className="min-h-screen bg-cream flex flex-col"
      animate={exitX ? { x: exitX, opacity: 0 } : { x: 0, opacity: 1 }}
      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      onTouchStart={handleSwipeStart}
      onTouchEnd={handleSwipeEnd}
      onMouseDown={handleSwipeStart}
      onMouseUp={handleSwipeEnd}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 bg-cream sticky top-0 z-20 border-b border-border/50">
        <button onClick={() => navigate("/")}
          className="w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[#E87A5A]/30 transition-all shadow-sm flex-shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-foreground">{t("profile.title")}</h1>
          <p className="text-xs text-muted-foreground truncate">{user?.email || "..."}</p>
        </div>
        <button onClick={handleLogout}
          className="w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-red-400 hover:text-red-500 hover:border-red-200 transition-all shadow-sm flex-shrink-0">
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-1 max-w-2xl mx-auto w-full">
        {/* Sidebar — desktop */}
        <nav className="hidden sm:flex flex-col gap-1 py-6 px-3 w-44 flex-shrink-0 sticky top-16 self-start">
          {TABS.map((t) => (
            <TabBtn key={t.key} active={tab === t.key} onClick={() => setTab(t.key)} icon={t.icon} label={t.label} />
          ))}
        </nav>

        {/* Main content */}
        <main className="flex-1 px-4 py-5 min-w-0">
          {/* Mobile tab scroller */}
          <div className="flex sm:hidden gap-2 mb-5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
            {TABS.map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all flex-shrink-0 ${
                  tab === t.key
                    ? "bg-[#E87A5A] text-white border-[#E87A5A] shadow-md shadow-[#E87A5A]/25"
                    : "bg-white text-muted-foreground border-border"
                }`}>
                <t.icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            ))}
          </div>

          {/* User avatar section */}
          {tab === "account" && (
            <div className="flex items-center gap-4 bg-white rounded-2xl border border-border shadow-sm p-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E87A5A] to-[#D4694A] flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow-md shadow-[#E87A5A]/25">
                {(user?.user_metadata?.full_name?.[0] || user?.email?.[0] || "?").toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-foreground text-sm truncate">
                  {user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Utilizador"}
                </p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-0.5">
                  Membro desde {user?.created_at ? new Date(user.created_at).toLocaleDateString("pt-PT", { month: "long", year: "numeric" }) : "—"}
                </p>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
              {tab === "account" && <AccountTab user={user} />}
              {tab === "security" && <SecurityTab />}
              {tab === "pomodoro" && <PomodoroTab />}
              {tab === "notifications" && <NotificationsTab />}
              {tab === "general" && <GeneralTab />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </motion.div>
  );
}
