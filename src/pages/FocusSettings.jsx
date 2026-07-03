import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Bell, Clock, RefreshCw, Volume2, Check, Zap, CalendarDays, Upload, Play } from "lucide-react";
import { auth } from "@/api/auth";
import { supabase } from "@/api/supabaseClient";
import { useEdgeSwipeNav } from "@/hooks/useEdgeSwipeNav";
import { savePushSubscription, removePushSubscription, Core } from "@/api/integrations";
import { SOUND_LIBRARY, playSound } from "@/lib/sounds";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

async function enablePushNotifications() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;
  const permission = await Notification.requestPermission();
  if (permission !== "granted") return;

  const registration = await navigator.serviceWorker.ready;
  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_VAPID_PUBLIC_KEY),
    });
  }
  await savePushSubscription(subscription.toJSON());
}

async function disablePushNotifications() {
  if (!("serviceWorker" in navigator)) return;
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  if (subscription) {
    await removePushSubscription(subscription.endpoint);
    await subscription.unsubscribe();
  }
}

const SOUNDS = [
{ key: "default", label: "Padrão", icon: "🔔" },
{ key: "bell", label: "Sino", icon: "🛎️" },
{ key: "chime", label: "Toque suave", icon: "🎵" },
{ key: "digital", label: "Digital", icon: "💻" },
{ key: "nature", label: "Natureza", icon: "🌿" }];


const RESET_OPTIONS = [
{ key: "weekly", label: "Semanal", icon: "📅" },
{ key: "monthly", label: "Mensal", icon: "🗓️" },
{ key: "yearly", label: "Anual", icon: "🎯" },
{ key: "never", label: "Nunca", icon: "♾️" }];


export default function FocusSettings() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("notifications");
  const [notifications, setNotifications] = useState(true);
  const [focusSound, setFocusSound] = useState("bell");
  const [shortBreakSound, setShortBreakSound] = useState("chime");
  const [longBreakSound, setLongBreakSound] = useState("gong");
  const [uploadingSound, setUploadingSound] = useState(false);
  const [customSoundUrl, setCustomSoundUrl] = useState("");
  const soundFileRef = useRef(null);
  const [focusMin, setFocusMin] = useState(25);
  const [shortBreakMin, setShortBreakMin] = useState(5);
  const [longBreakMin, setLongBreakMin] = useState(20);
  const [orangeReset, setOrangeReset] = useState("weekly");
  const [weekStartsOn, setWeekStartsOn] = useState(1);
  const [saved, setSaved] = useState(false);
  const { swipeHandlers, dragStyle } = useEdgeSwipeNav(
    { left: "/focus" },
    { ignoreTarget: (target) => target.tagName === "INPUT" && target.type === "range" }
  );

  useEffect(() => {
    auth.me().then((u) => {
      const meta = u?.user_metadata || {};
      if (meta.focus_min) setFocusMin(meta.focus_min);
      if (meta.short_break_min) setShortBreakMin(meta.short_break_min);
      if (meta.long_break_min) setLongBreakMin(meta.long_break_min);
      if (meta.orange_reset) setOrangeReset(meta.orange_reset);
      if (meta.notifications_enabled !== undefined) setNotifications(meta.notifications_enabled);
      if (meta.focus_sound) setFocusSound(meta.focus_sound);
      if (meta.short_break_sound) setShortBreakSound(meta.short_break_sound);
      if (meta.long_break_sound) setLongBreakSound(meta.long_break_sound);
      if (meta.custom_sound_url) setCustomSoundUrl(meta.custom_sound_url);
      if (meta.week_starts_on !== undefined) setWeekStartsOn(meta.week_starts_on);
    }).catch(() => {});
  }, []);

  const toggleNotifications = (next) => {
    setNotifications(next);
    if (next) {
      enablePushNotifications().catch(() => {});
    } else {
      disablePushNotifications().catch(() => {});
    }
  };

  const save = async () => {
    await supabase.auth.updateUser({
      data: {
        focus_min: focusMin, short_break_min: shortBreakMin, long_break_min: longBreakMin,
        orange_reset: orangeReset, notifications_enabled: notifications,
        focus_sound: focusSound, short_break_sound: shortBreakSound, long_break_sound: longBreakSound,
        custom_sound_url: customSoundUrl, week_starts_on: weekStartsOn
      }
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
  { key: "notifications", icon: Bell, label: "Notificações" },
  { key: "timer", icon: Clock, label: "Tempos" },
  { key: "oranges", icon: RefreshCw, label: "Laranjas" },
  { key: "general", icon: CalendarDays, label: "Geral" }];


  return (
    <div data-source-location="pages/FocusSettings:89:4" data-dynamic-content="true" className="min-h-screen bg-cream flex flex-col select-none"
    {...swipeHandlers}>
      
      <div data-source-location="pages/FocusSettings:97:6" data-dynamic-content="true" style={dragStyle} className="flex-1 flex flex-col">
        <div data-source-location="pages/FocusSettings:98:8" data-dynamic-content="true" className="flex items-center gap-4 px-5 py-4">
          <button data-source-location="pages/FocusSettings:99:10" data-dynamic-content="true" onClick={() => navigate("/focus")} className="w-11 h-11 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[#E87A5A]/30 transition-all shadow-sm">
            <ArrowRight data-source-location="pages/FocusSettings:100:12" data-dynamic-content="false" className="w-5 h-5" />
          </button>
          <div data-source-location="pages/FocusSettings:102:10" data-dynamic-content="false">
            <h1 data-source-location="pages/FocusSettings:103:12" data-dynamic-content="false" className="text-xl font-bold text-foreground">Definições</h1>
            <p data-source-location="pages/FocusSettings:104:12" data-dynamic-content="false" className="text-xs text-muted-foreground">Personaliza a tua experiência</p>
          </div>
        </div>

        {/* Tabs */}
        <div data-source-location="pages/FocusSettings:109:8" data-dynamic-content="true" className="px-5 mb-4">
          <div data-source-location="pages/FocusSettings:110:10" data-dynamic-content="true" className="flex bg-white rounded-2xl p-1.5 border border-border shadow-sm gap-1">
            {tabs.map((t, __arrIdx__) =>
            <button data-source-location="pages/FocusSettings:112:14" data-dynamic-content="true" key={t.key} onClick={() => setTab(t.key)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
            tab === t.key ? "bg-[#E87A5A] text-white shadow-md shadow-[#E87A5A]/25" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`
            } data-arr-index={__arrIdx__} data-arr-variable-name="tabs">
                <t.icon data-source-location="pages/FocusSettings:116:16" data-dynamic-content="false" className="w-4 h-4" data-arr-index={__arrIdx__} data-arr-variable-name="tabs" />
                <span data-source-location="pages/FocusSettings:117:16" data-dynamic-content="true" className="hidden sm:inline" data-arr-index={__arrIdx__} data-arr-variable-name="tabs" data-arr-field="label">{t.label}</span>
              </button>
            )}
          </div>
        </div>

        <div data-source-location="pages/FocusSettings:123:8" data-dynamic-content="true" className="flex-1 px-5 pb-24 space-y-3 overflow-auto">
          {tab === "notifications" &&
          <motion.div data-source-location="pages/FocusSettings:125:12" data-dynamic-content="true" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div data-source-location="pages/FocusSettings:126:14" data-dynamic-content="true" className="bg-white rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div data-source-location="pages/FocusSettings:127:16" data-dynamic-content="true" className="flex items-center justify-between">
                  <div data-source-location="pages/FocusSettings:128:18" data-dynamic-content="false">
                    <h3 data-source-location="pages/FocusSettings:129:20" data-dynamic-content="false" className="font-semibold text-sm text-foreground flex items-center gap-2">🔔 Alertas do Timer</h3>
                    <p data-source-location="pages/FocusSettings:130:20" data-dynamic-content="false" className="text-xs text-muted-foreground mt-1">Notificações quando o foco ou pausa terminar</p>
                  </div>
                  <button data-source-location="pages/FocusSettings:132:18" data-dynamic-content="true" onClick={() => toggleNotifications(!notifications)}
                className={`relative w-14 h-8 rounded-full transition-all duration-300 ${notifications ? "bg-[#E87A5A] shadow-md shadow-[#E87A5A]/30" : "bg-slate-300"}`}>
                    <motion.div data-source-location="pages/FocusSettings:134:20" data-dynamic-content="true" animate={{ x: notifications ? 26 : 2 }} transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-md" />
                  </button>
                </div>
              </div>

              {notifications &&
            <div className="space-y-3">
                {[
                  { label: "🔥 Foco", value: focusSound, set: setFocusSound, color: "#E87A5A" },
                  { label: "☕ Pausa Curta", value: shortBreakSound, set: setShortBreakSound, color: "#7EB8A0" },
                  { label: "🌿 Pausa Longa", value: longBreakSound, set: setLongBreakSound, color: "#A78BFA" },
                ].map((phase) => (
                  <div key={phase.label} className="bg-white rounded-2xl p-4 border border-border shadow-sm">
                    <h4 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: phase.color + "22" }}>
                        <Volume2 className="w-3.5 h-3.5" style={{ color: phase.color }} />
                      </span>
                      {phase.label}
                    </h4>
                    <div className="grid grid-cols-2 gap-1.5">
                      {SOUND_LIBRARY.map((s) => (
                        <button key={s.key} onClick={() => { phase.set(s.key); playSound(s.key === "none" ? "none" : s.key); }}
                        className={`relative px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                          phase.value === s.key ? "text-white shadow-md" : "bg-secondary text-muted-foreground hover:bg-[#E8E0D8]"
                        }`} style={phase.value === s.key ? { backgroundColor: phase.color } : {}}>
                          <span className="mr-1">{s.icon}</span> {s.label}
                          {phase.value === s.key && <Check className="absolute top-1.5 right-1.5 w-3 h-3" />}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="bg-white rounded-2xl p-4 border border-border shadow-sm">
                  <h4 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-[#E87A5A]" /> Som personalizado
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">Máx. 10 seg. Formatos: mp3, wav, ogg.</p>
                  {customSoundUrl && (
                    <div className="flex items-center gap-2 mb-3">
                      <button onClick={() => playSound(customSoundUrl)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E87A5A]/10 text-[#E87A5A] text-xs font-medium hover:bg-[#E87A5A]/20 transition-all">
                        <Play className="w-3 h-3" /> Testar som
                      </button>
                      <button onClick={() => { [setFocusSound, setShortBreakSound, setLongBreakSound].forEach(fn => fn(customSoundUrl)); }}
                        className="px-3 py-1.5 rounded-xl bg-secondary text-xs font-medium text-muted-foreground hover:bg-border transition-all">
                        Aplicar a todas as fases
                      </button>
                    </div>
                  )}
                  <input ref={soundFileRef} type="file" accept="audio/mp3,audio/wav,audio/ogg,audio/*" className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setUploadingSound(true);
                      try {
                        const { file_url } = await Core.UploadFile({ file });
                        setCustomSoundUrl(file_url);
                      } catch {}
                      setUploadingSound(false);
                    }} />
                  <button onClick={() => soundFileRef.current?.click()} disabled={uploadingSound}
                    className="w-full py-2.5 rounded-xl border-2 border-dashed border-border text-sm text-muted-foreground hover:border-[#E87A5A]/40 hover:text-[#E87A5A] transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                    {uploadingSound ? "A enviar..." : <><Upload className="w-4 h-4" /> Carregar ficheiro de áudio</>}
                  </button>
                </div>
              </div>
            }
            </motion.div>
          }

          {tab === "timer" &&
          <motion.div data-source-location="pages/FocusSettings:163:12" data-dynamic-content="true" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              {[
            { label: "Foco", value: focusMin, setter: setFocusMin, min: 5, max: 90, color: "#E87A5A", icon: "🔥", step: 5 },
            { label: "Pausa Curta", value: shortBreakMin, setter: setShortBreakMin, min: 1, max: 30, color: "#7EB8A0", icon: "☕", step: 1 },
            { label: "Pausa Longa", value: longBreakMin, setter: setLongBreakMin, min: 5, max: 60, color: "#A78BFA", icon: "🌿", step: 5 }].
            map((item) =>
            <div data-source-location="pages/FocusSettings:169:16" data-dynamic-content="true" key={item.label} className="bg-white rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
                  <div data-source-location="pages/FocusSettings:170:18" data-dynamic-content="true" className="flex items-center justify-between mb-4">
                    <h3 data-source-location="pages/FocusSettings:171:20" data-dynamic-content="true" className="font-semibold text-sm text-foreground flex items-center gap-2" data-collection-item-field="label" data-collection-item-id={item?.id || item?._id}>
                      <span data-source-location="pages/FocusSettings:172:22" data-dynamic-content="true" className="text-lg" data-collection-item-field="icon" data-collection-item-id={item?.id || item?._id}>{item.icon}</span> {item.label}
                    </h3>
                    <motion.span data-source-location="pages/FocusSettings:174:20" data-dynamic-content="true" key={item.value} initial={{ scale: 1.2 }} animate={{ scale: 1 }}
                className="text-2xl font-bold" style={{ color: item.color }} data-collection-item-field="value" data-collection-item-id={item?.id || item?._id}>
                      {item.value}<span data-source-location="pages/FocusSettings:176:34" data-dynamic-content="false" className="text-sm font-medium ml-0.5">min</span>
                    </motion.span>
                  </div>
                  <div data-source-location="pages/FocusSettings:179:18" data-dynamic-content="true" className="relative">
                    <input data-source-location="pages/FocusSettings:180:20" data-dynamic-content="true" type="range" min={item.min} max={item.max} step={item.step} value={item.value}
                onChange={(e) => item.setter(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: item.color, background: `linear-gradient(to right, ${item.color} 0%, ${item.color} ${(item.value - item.min) / (item.max - item.min) * 100}%, #E8E0D8 ${(item.value - item.min) / (item.max - item.min) * 100}%, #E8E0D8 100%)` }} />
                    <div data-source-location="pages/FocusSettings:184:20" data-dynamic-content="true" className="flex justify-between text-[10px] text-muted-foreground mt-1.5">
                      <span data-source-location="pages/FocusSettings:185:22" data-dynamic-content="true" data-collection-item-field="min" data-collection-item-id={item?.id || item?._id}>{item.min}m</span>
                      <span data-source-location="pages/FocusSettings:186:22" data-dynamic-content="true" data-collection-item-field="max" data-collection-item-id={item?.id || item?._id}>{item.max}m</span>
                    </div>
                  </div>
                </div>
            )}
            </motion.div>
          }

          {tab === "oranges" &&
          <motion.div data-source-location="pages/FocusSettings:195:12" data-dynamic-content="true" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div data-source-location="pages/FocusSettings:196:14" data-dynamic-content="true" className="bg-white rounded-2xl p-5 border border-border shadow-sm">
                <h3 data-source-location="pages/FocusSettings:197:16" data-dynamic-content="false" className="font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
                  <span data-source-location="pages/FocusSettings:198:18" data-dynamic-content="false" className="w-8 h-8 rounded-xl bg-[#E87A5A]/10 flex items-center justify-center text-lg">🍊</span>
                  Reset das Laranjas
                </h3>
                <div data-source-location="pages/FocusSettings:201:16" data-dynamic-content="true" className="grid grid-cols-2 gap-2">
                  {RESET_OPTIONS.map((o, __arrIdx__) =>
                <button data-source-location="pages/FocusSettings:203:20" data-dynamic-content="true" key={o.key} onClick={() => setOrangeReset(o.key)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                orangeReset === o.key ? "bg-[#E87A5A] text-white shadow-md" : "bg-secondary text-muted-foreground hover:bg-[#E8E0D8]"}`
                } data-arr-index={__arrIdx__} data-arr-variable-name="RESET_OPTIONS" data-arr-field="label">
                      <span data-source-location="pages/FocusSettings:207:22" data-dynamic-content="true" data-arr-index={__arrIdx__} data-arr-variable-name="RESET_OPTIONS" data-arr-field="icon">{o.icon}</span> {o.label}
                    </button>
                )}
                </div>
              </div>
            </motion.div>
          }

          {tab === "general" &&
          <motion.div data-source-location="pages/FocusSettings:216:12" data-dynamic-content="true" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div data-source-location="pages/FocusSettings:217:14" data-dynamic-content="true" className="bg-white rounded-2xl p-5 border border-border shadow-sm">
                <h3 data-source-location="pages/FocusSettings:218:16" data-dynamic-content="false" className="font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
                  <span data-source-location="pages/FocusSettings:219:18" data-dynamic-content="false" className="w-8 h-8 rounded-xl bg-[#E87A5A]/10 flex items-center justify-center"><CalendarDays data-source-location="pages/FocusSettings:219:104" data-dynamic-content="false" className="w-4 h-4 text-[#E87A5A]" /></span>
                  Primeiro dia da semana
                </h3>
                <p data-source-location="pages/FocusSettings:222:16" data-dynamic-content="false" className="text-xs text-muted-foreground mb-3">Define qual o primeiro dia da semana no calendário</p>
                <div data-source-location="pages/FocusSettings:223:16" data-dynamic-content="true" className="grid grid-cols-2 gap-2">
                  <button data-source-location="pages/FocusSettings:224:18" data-dynamic-content="true" onClick={() => setWeekStartsOn(1)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                weekStartsOn === 1 ? "bg-[#E87A5A] text-white shadow-md" : "bg-secondary text-muted-foreground hover:bg-[#E8E0D8]"}`
                }>
                    📅 Segunda-feira
                  </button>
                  <button data-source-location="pages/FocusSettings:230:18" data-dynamic-content="true" onClick={() => setWeekStartsOn(0)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                weekStartsOn === 0 ? "bg-[#E87A5A] text-white shadow-md" : "bg-secondary text-muted-foreground hover:bg-[#E8E0D8]"}`
                }>
                    ☀️ Domingo
                  </button>
                </div>
              </div>
            </motion.div>
          }
        </div>

        <div data-source-location="pages/FocusSettings:242:8" data-dynamic-content="true" className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-cream via-cream to-transparent z-10">
          <button data-source-location="pages/FocusSettings:243:10" data-dynamic-content="true" onClick={save}
          className={`w-full py-4 rounded-2xl font-semibold text-sm transition-all duration-300 shadow-lg active:scale-[0.98] ${
          saved ? "bg-emerald-500 text-white shadow-emerald-500/25" : "bg-[#E87A5A] text-white hover:bg-[#D4694A] shadow-[#E87A5A]/25"}`
          }>
            <span data-source-location="pages/FocusSettings:247:12" data-dynamic-content="true" className="flex items-center justify-center gap-2">
              {saved ? <><Check data-source-location="pages/FocusSettings:248:25" data-dynamic-content="false" className="w-4 h-4" /> Guardado!</> : <><Zap data-source-location="pages/FocusSettings:248:72" data-dynamic-content="false" className="w-4 h-4" /> Guardar Definições</>}
            </span>
          </button>
        </div>
      </div>
    </div>);

}