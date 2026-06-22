import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/FocusSettings.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/pages/FocusSettings.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=fc940917"; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"]; const useCallback = __vite__cjsImport3_react["useCallback"]; const useRef = __vite__cjsImport3_react["useRef"];
import { useNavigate } from "/node_modules/.vite/deps/react-router-dom.js?v=8a08d97a";
import { motion } from "/node_modules/.vite/deps/framer-motion.js?v=fc940917";
import { ArrowLeft, Bell, Clock, RefreshCw, Volume2, Check, Zap, CalendarDays } from "/node_modules/.vite/deps/lucide-react.js?v=aefa7968";
import { base44 } from "/src/api/base44Client.js";
const SOUNDS = [
  { key: "default", label: "Padrão", icon: "🔔" },
  { key: "bell", label: "Sino", icon: "🛎️" },
  { key: "chime", label: "Toque suave", icon: "🎵" },
  { key: "digital", label: "Digital", icon: "💻" },
  { key: "nature", label: "Natureza", icon: "🌿" }
];
const RESET_OPTIONS = [
  { key: "weekly", label: "Semanal", icon: "📅" },
  { key: "monthly", label: "Mensal", icon: "🗓️" },
  { key: "yearly", label: "Anual", icon: "🎯" },
  { key: "never", label: "Nunca", icon: "♾️" }
];
export default function FocusSettings() {
  _s();
  const navigate = useNavigate();
  const [tab, setTab] = useState("notifications");
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState("default");
  const [focusMin, setFocusMin] = useState(25);
  const [shortBreakMin, setShortBreakMin] = useState(5);
  const [longBreakMin, setLongBreakMin] = useState(20);
  const [orangeReset, setOrangeReset] = useState("weekly");
  const [weekStartsOn, setWeekStartsOn] = useState(1);
  const [saved, setSaved] = useState(false);
  const touchStart = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const [dragStyle, setDragStyle] = useState({});
  const ignoreSwipe = useRef(false);
  useEffect(() => {
    base44.auth.me().then((u) => {
      if (u?.focus_min) setFocusMin(u.focus_min);
      if (u?.short_break_min) setShortBreakMin(u.short_break_min);
      if (u?.long_break_min) setLongBreakMin(u.long_break_min);
      if (u?.orange_reset) setOrangeReset(u.orange_reset);
      if (u?.notifications_enabled !== void 0) setNotifications(u.notifications_enabled);
      if (u?.notification_sound) setSound(u.notification_sound);
      if (u?.week_starts_on !== void 0) setWeekStartsOn(u.week_starts_on);
    }).catch(() => {
    });
  }, []);
  const save = async () => {
    await base44.auth.updateMe({
      focus_min: focusMin,
      short_break_min: shortBreakMin,
      long_break_min: longBreakMin,
      orange_reset: orangeReset,
      notifications_enabled: notifications,
      notification_sound: sound,
      week_starts_on: weekStartsOn
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2e3);
  };
  const handlePointerStart = useCallback((x, y, target) => {
    if (target && target.tagName === "INPUT" && target.type === "range") {
      ignoreSwipe.current = true;
      return;
    }
    ignoreSwipe.current = false;
    touchStart.current = { x, y };
    dragOffset.current = { x: 0, y: 0 };
    setDragStyle({});
  }, []);
  const handlePointerMove = useCallback((x, y) => {
    if (ignoreSwipe.current) return;
    dragOffset.current = { x: x - touchStart.current.x, y: y - touchStart.current.y };
    setDragStyle({ transform: `translate(${dragOffset.current.x}px, ${dragOffset.current.y}px)`, transition: "none" });
  }, []);
  const handlePointerEnd = useCallback((x, y) => {
    if (ignoreSwipe.current) {
      ignoreSwipe.current = false;
      return;
    }
    setDragStyle({ transform: "translate(0, 0)", transition: "transform 0.3s ease-out" });
    if (x - touchStart.current.x < -60) navigate("/focus");
  }, [navigate]);
  const tabs = [
    { key: "notifications", icon: Bell, label: "Notificações" },
    { key: "timer", icon: Clock, label: "Tempos" },
    { key: "oranges", icon: RefreshCw, label: "Laranjas" },
    { key: "general", icon: CalendarDays, label: "Geral" }
  ];
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      "data-source-location": "pages/FocusSettings:89:4",
      "data-dynamic-content": "true",
      className: "min-h-screen bg-cream flex flex-col select-none",
      onTouchStart: (e) => handlePointerStart(e.touches[0].clientX, e.touches[0].clientY, e.target),
      onTouchMove: (e) => handlePointerMove(e.touches[0].clientX, e.touches[0].clientY),
      onTouchEnd: (e) => handlePointerEnd(e.changedTouches[0]?.clientX || touchStart.current.x, e.changedTouches[0]?.clientY || touchStart.current.y),
      onMouseDown: (e) => handlePointerStart(e.clientX, e.clientY, e.target),
      onMouseMove: (e) => {
        if (e.buttons === 1) handlePointerMove(e.clientX, e.clientY);
      },
      onMouseUp: (e) => handlePointerEnd(e.clientX, e.clientY),
      children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusSettings:97:6", "data-dynamic-content": "true", style: dragStyle, className: "flex-1 flex flex-col", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusSettings:98:8", "data-dynamic-content": "true", className: "flex items-center gap-4 px-5 py-4", children: [
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/FocusSettings:99:10", "data-dynamic-content": "true", onClick: () => navigate("/focus"), className: "w-11 h-11 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[#E87A5A]/30 transition-all shadow-sm", children: /* @__PURE__ */ jsxDEV(ArrowLeft, { "data-source-location": "pages/FocusSettings:100:12", "data-dynamic-content": "false", className: "w-5 h-5" }, void 0, false, {
            fileName: "/app/src/pages/FocusSettings.jsx",
            lineNumber: 119,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "/app/src/pages/FocusSettings.jsx",
            lineNumber: 118,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusSettings:102:10", "data-dynamic-content": "false", children: [
            /* @__PURE__ */ jsxDEV("h1", { "data-source-location": "pages/FocusSettings:103:12", "data-dynamic-content": "false", className: "text-xl font-bold text-foreground", children: "Definições" }, void 0, false, {
              fileName: "/app/src/pages/FocusSettings.jsx",
              lineNumber: 122,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/FocusSettings:104:12", "data-dynamic-content": "false", className: "text-xs text-muted-foreground", children: "Personaliza a tua experiência" }, void 0, false, {
              fileName: "/app/src/pages/FocusSettings.jsx",
              lineNumber: 123,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/FocusSettings.jsx",
            lineNumber: 121,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/FocusSettings.jsx",
          lineNumber: 117,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusSettings:109:8", "data-dynamic-content": "true", className: "px-5 mb-4", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusSettings:110:10", "data-dynamic-content": "true", className: "flex bg-white rounded-2xl p-1.5 border border-border shadow-sm gap-1", children: tabs.map(
          (t, __arrIdx__) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              "data-source-location": "pages/FocusSettings:112:14",
              "data-dynamic-content": "true",
              onClick: () => setTab(t.key),
              className: `flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${tab === t.key ? "bg-[#E87A5A] text-white shadow-md shadow-[#E87A5A]/25" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`,
              "data-arr-index": __arrIdx__,
              "data-arr-variable-name": "tabs",
              children: [
                /* @__PURE__ */ jsxDEV(t.icon, { "data-source-location": "pages/FocusSettings:116:16", "data-dynamic-content": "false", className: "w-4 h-4", "data-arr-index": __arrIdx__, "data-arr-variable-name": "tabs" }, void 0, false, {
                  fileName: "/app/src/pages/FocusSettings.jsx",
                  lineNumber: 135,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusSettings:117:16", "data-dynamic-content": "true", className: "hidden sm:inline", "data-arr-index": __arrIdx__, "data-arr-variable-name": "tabs", "data-arr-field": "label", children: t.label }, void 0, false, {
                  fileName: "/app/src/pages/FocusSettings.jsx",
                  lineNumber: 136,
                  columnNumber: 17
                }, this)
              ]
            },
            t.key,
            true,
            {
              fileName: "/app/src/pages/FocusSettings.jsx",
              lineNumber: 131,
              columnNumber: 13
            },
            this
          )
        ) }, void 0, false, {
          fileName: "/app/src/pages/FocusSettings.jsx",
          lineNumber: 129,
          columnNumber: 11
        }, this) }, void 0, false, {
          fileName: "/app/src/pages/FocusSettings.jsx",
          lineNumber: 128,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusSettings:123:8", "data-dynamic-content": "true", className: "flex-1 px-5 pb-24 space-y-3 overflow-auto", children: [
          tab === "notifications" && /* @__PURE__ */ jsxDEV(motion.div, { "data-source-location": "pages/FocusSettings:125:12", "data-dynamic-content": "true", initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, className: "space-y-3", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusSettings:126:14", "data-dynamic-content": "true", className: "bg-white rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusSettings:127:16", "data-dynamic-content": "true", className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusSettings:128:18", "data-dynamic-content": "false", children: [
                /* @__PURE__ */ jsxDEV("h3", { "data-source-location": "pages/FocusSettings:129:20", "data-dynamic-content": "false", className: "font-semibold text-sm text-foreground flex items-center gap-2", children: "🔔 Alertas do Timer" }, void 0, false, {
                  fileName: "/app/src/pages/FocusSettings.jsx",
                  lineNumber: 148,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/FocusSettings:130:20", "data-dynamic-content": "false", className: "text-xs text-muted-foreground mt-1", children: "Notificações quando o foco ou pausa terminar" }, void 0, false, {
                  fileName: "/app/src/pages/FocusSettings.jsx",
                  lineNumber: 149,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/FocusSettings.jsx",
                lineNumber: 147,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "pages/FocusSettings:132:18",
                  "data-dynamic-content": "true",
                  onClick: () => setNotifications(!notifications),
                  className: `relative w-14 h-8 rounded-full transition-all duration-300 ${notifications ? "bg-[#E87A5A] shadow-md shadow-[#E87A5A]/30" : "bg-slate-300"}`,
                  children: /* @__PURE__ */ jsxDEV(
                    motion.div,
                    {
                      "data-source-location": "pages/FocusSettings:134:20",
                      "data-dynamic-content": "true",
                      animate: { x: notifications ? 26 : 2 },
                      transition: { type: "spring", stiffness: 500, damping: 30 },
                      className: "absolute top-1 w-6 h-6 rounded-full bg-white shadow-md"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/src/pages/FocusSettings.jsx",
                      lineNumber: 153,
                      columnNumber: 21
                    },
                    this
                  )
                },
                void 0,
                false,
                {
                  fileName: "/app/src/pages/FocusSettings.jsx",
                  lineNumber: 151,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/src/pages/FocusSettings.jsx",
              lineNumber: 146,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/FocusSettings.jsx",
              lineNumber: 145,
              columnNumber: 15
            }, this),
            notifications && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusSettings:141:16", "data-dynamic-content": "true", className: "bg-white rounded-2xl p-5 border border-border shadow-sm", children: [
              /* @__PURE__ */ jsxDEV("h3", { "data-source-location": "pages/FocusSettings:142:18", "data-dynamic-content": "false", className: "font-semibold text-sm text-foreground mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusSettings:143:20", "data-dynamic-content": "false", className: "w-8 h-8 rounded-xl bg-[#E87A5A]/10 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV(Volume2, { "data-source-location": "pages/FocusSettings:143:106", "data-dynamic-content": "false", className: "w-4 h-4 text-[#E87A5A]" }, void 0, false, {
                  fileName: "/app/src/pages/FocusSettings.jsx",
                  lineNumber: 162,
                  columnNumber: 186
                }, this) }, void 0, false, {
                  fileName: "/app/src/pages/FocusSettings.jsx",
                  lineNumber: 162,
                  columnNumber: 21
                }, this),
                "Som da notificação"
              ] }, void 0, true, {
                fileName: "/app/src/pages/FocusSettings.jsx",
                lineNumber: 161,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusSettings:146:18", "data-dynamic-content": "true", className: "grid grid-cols-2 gap-2", children: SOUNDS.map(
                (s, __arrIdx__) => /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    "data-source-location": "pages/FocusSettings:148:22",
                    "data-dynamic-content": "true",
                    onClick: () => setSound(s.key),
                    className: `relative px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${sound === s.key ? "bg-[#E87A5A] text-white shadow-md" : "bg-secondary text-muted-foreground hover:bg-[#E8E0D8]"}`,
                    "data-arr-index": __arrIdx__,
                    "data-arr-variable-name": "SOUNDS",
                    "data-arr-field": "label",
                    children: [
                      /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusSettings:152:24", "data-dynamic-content": "true", className: "mr-1.5", "data-arr-index": __arrIdx__, "data-arr-variable-name": "SOUNDS", "data-arr-field": "icon", children: s.icon }, void 0, false, {
                        fileName: "/app/src/pages/FocusSettings.jsx",
                        lineNumber: 171,
                        columnNumber: 25
                      }, this),
                      " ",
                      s.label,
                      sound === s.key && /* @__PURE__ */ jsxDEV(Check, { "data-source-location": "pages/FocusSettings:153:44", "data-dynamic-content": "false", className: "absolute top-2 right-2 w-3.5 h-3.5", "data-arr-index": __arrIdx__, "data-arr-variable-name": "SOUNDS" }, void 0, false, {
                        fileName: "/app/src/pages/FocusSettings.jsx",
                        lineNumber: 172,
                        columnNumber: 45
                      }, this)
                    ]
                  },
                  s.key,
                  true,
                  {
                    fileName: "/app/src/pages/FocusSettings.jsx",
                    lineNumber: 167,
                    columnNumber: 17
                  },
                  this
                )
              ) }, void 0, false, {
                fileName: "/app/src/pages/FocusSettings.jsx",
                lineNumber: 165,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/FocusSettings.jsx",
              lineNumber: 160,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/FocusSettings.jsx",
            lineNumber: 144,
            columnNumber: 11
          }, this),
          tab === "timer" && /* @__PURE__ */ jsxDEV(motion.div, { "data-source-location": "pages/FocusSettings:163:12", "data-dynamic-content": "true", initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, className: "space-y-3", children: [
            { label: "Foco", value: focusMin, setter: setFocusMin, min: 5, max: 90, color: "#E87A5A", icon: "🔥", step: 5 },
            { label: "Pausa Curta", value: shortBreakMin, setter: setShortBreakMin, min: 1, max: 30, color: "#7EB8A0", icon: "☕", step: 1 },
            { label: "Pausa Longa", value: longBreakMin, setter: setLongBreakMin, min: 5, max: 60, color: "#A78BFA", icon: "🌿", step: 5 }
          ].map(
            (item) => /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusSettings:169:16", "data-dynamic-content": "true", className: "bg-white rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow", children: [
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusSettings:170:18", "data-dynamic-content": "true", className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsxDEV("h3", { "data-source-location": "pages/FocusSettings:171:20", "data-dynamic-content": "true", className: "font-semibold text-sm text-foreground flex items-center gap-2", "data-collection-item-field": "label", "data-collection-item-id": item?.id || item?._id, children: [
                  /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusSettings:172:22", "data-dynamic-content": "true", className: "text-lg", "data-collection-item-field": "icon", "data-collection-item-id": item?.id || item?._id, children: item.icon }, void 0, false, {
                    fileName: "/app/src/pages/FocusSettings.jsx",
                    lineNumber: 191,
                    columnNumber: 23
                  }, this),
                  " ",
                  item.label
                ] }, void 0, true, {
                  fileName: "/app/src/pages/FocusSettings.jsx",
                  lineNumber: 190,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  motion.span,
                  {
                    "data-source-location": "pages/FocusSettings:174:20",
                    "data-dynamic-content": "true",
                    initial: { scale: 1.2 },
                    animate: { scale: 1 },
                    className: "text-2xl font-bold",
                    style: { color: item.color },
                    "data-collection-item-field": "value",
                    "data-collection-item-id": item?.id || item?._id,
                    children: [
                      item.value,
                      /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusSettings:176:34", "data-dynamic-content": "false", className: "text-sm font-medium ml-0.5", children: "min" }, void 0, false, {
                        fileName: "/app/src/pages/FocusSettings.jsx",
                        lineNumber: 195,
                        columnNumber: 35
                      }, this)
                    ]
                  },
                  item.value,
                  true,
                  {
                    fileName: "/app/src/pages/FocusSettings.jsx",
                    lineNumber: 193,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/src/pages/FocusSettings.jsx",
                lineNumber: 189,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusSettings:179:18", "data-dynamic-content": "true", className: "relative", children: [
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    "data-source-location": "pages/FocusSettings:180:20",
                    "data-dynamic-content": "true",
                    type: "range",
                    min: item.min,
                    max: item.max,
                    step: item.step,
                    value: item.value,
                    onChange: (e) => item.setter(Number(e.target.value)),
                    className: "w-full h-2 rounded-full appearance-none cursor-pointer",
                    style: { accentColor: item.color, background: `linear-gradient(to right, ${item.color} 0%, ${item.color} ${(item.value - item.min) / (item.max - item.min) * 100}%, #E8E0D8 ${(item.value - item.min) / (item.max - item.min) * 100}%, #E8E0D8 100%)` }
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/src/pages/FocusSettings.jsx",
                    lineNumber: 199,
                    columnNumber: 21
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusSettings:184:20", "data-dynamic-content": "true", className: "flex justify-between text-[10px] text-muted-foreground mt-1.5", children: [
                  /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusSettings:185:22", "data-dynamic-content": "true", "data-collection-item-field": "min", "data-collection-item-id": item?.id || item?._id, children: [
                    item.min,
                    "m"
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/FocusSettings.jsx",
                    lineNumber: 204,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusSettings:186:22", "data-dynamic-content": "true", "data-collection-item-field": "max", "data-collection-item-id": item?.id || item?._id, children: [
                    item.max,
                    "m"
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/FocusSettings.jsx",
                    lineNumber: 205,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/FocusSettings.jsx",
                  lineNumber: 203,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/FocusSettings.jsx",
                lineNumber: 198,
                columnNumber: 19
              }, this)
            ] }, item.label, true, {
              fileName: "/app/src/pages/FocusSettings.jsx",
              lineNumber: 188,
              columnNumber: 13
            }, this)
          ) }, void 0, false, {
            fileName: "/app/src/pages/FocusSettings.jsx",
            lineNumber: 182,
            columnNumber: 11
          }, this),
          tab === "oranges" && /* @__PURE__ */ jsxDEV(motion.div, { "data-source-location": "pages/FocusSettings:195:12", "data-dynamic-content": "true", initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, className: "space-y-3", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusSettings:196:14", "data-dynamic-content": "true", className: "bg-white rounded-2xl p-5 border border-border shadow-sm", children: [
            /* @__PURE__ */ jsxDEV("h3", { "data-source-location": "pages/FocusSettings:197:16", "data-dynamic-content": "false", className: "font-semibold text-sm text-foreground mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusSettings:198:18", "data-dynamic-content": "false", className: "w-8 h-8 rounded-xl bg-[#E87A5A]/10 flex items-center justify-center text-lg", children: "🍊" }, void 0, false, {
                fileName: "/app/src/pages/FocusSettings.jsx",
                lineNumber: 217,
                columnNumber: 19
              }, this),
              "Reset das Laranjas"
            ] }, void 0, true, {
              fileName: "/app/src/pages/FocusSettings.jsx",
              lineNumber: 216,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusSettings:201:16", "data-dynamic-content": "true", className: "grid grid-cols-2 gap-2", children: RESET_OPTIONS.map(
              (o, __arrIdx__) => /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "pages/FocusSettings:203:20",
                  "data-dynamic-content": "true",
                  onClick: () => setOrangeReset(o.key),
                  className: `px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${orangeReset === o.key ? "bg-[#E87A5A] text-white shadow-md" : "bg-secondary text-muted-foreground hover:bg-[#E8E0D8]"}`,
                  "data-arr-index": __arrIdx__,
                  "data-arr-variable-name": "RESET_OPTIONS",
                  "data-arr-field": "label",
                  children: [
                    /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusSettings:207:22", "data-dynamic-content": "true", "data-arr-index": __arrIdx__, "data-arr-variable-name": "RESET_OPTIONS", "data-arr-field": "icon", children: o.icon }, void 0, false, {
                      fileName: "/app/src/pages/FocusSettings.jsx",
                      lineNumber: 226,
                      columnNumber: 23
                    }, this),
                    " ",
                    o.label
                  ]
                },
                o.key,
                true,
                {
                  fileName: "/app/src/pages/FocusSettings.jsx",
                  lineNumber: 222,
                  columnNumber: 17
                },
                this
              )
            ) }, void 0, false, {
              fileName: "/app/src/pages/FocusSettings.jsx",
              lineNumber: 220,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/FocusSettings.jsx",
            lineNumber: 215,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/src/pages/FocusSettings.jsx",
            lineNumber: 214,
            columnNumber: 11
          }, this),
          tab === "general" && /* @__PURE__ */ jsxDEV(motion.div, { "data-source-location": "pages/FocusSettings:216:12", "data-dynamic-content": "true", initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, className: "space-y-3", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusSettings:217:14", "data-dynamic-content": "true", className: "bg-white rounded-2xl p-5 border border-border shadow-sm", children: [
            /* @__PURE__ */ jsxDEV("h3", { "data-source-location": "pages/FocusSettings:218:16", "data-dynamic-content": "false", className: "font-semibold text-sm text-foreground mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusSettings:219:18", "data-dynamic-content": "false", className: "w-8 h-8 rounded-xl bg-[#E87A5A]/10 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV(CalendarDays, { "data-source-location": "pages/FocusSettings:219:104", "data-dynamic-content": "false", className: "w-4 h-4 text-[#E87A5A]" }, void 0, false, {
                fileName: "/app/src/pages/FocusSettings.jsx",
                lineNumber: 238,
                columnNumber: 184
              }, this) }, void 0, false, {
                fileName: "/app/src/pages/FocusSettings.jsx",
                lineNumber: 238,
                columnNumber: 19
              }, this),
              "Primeiro dia da semana"
            ] }, void 0, true, {
              fileName: "/app/src/pages/FocusSettings.jsx",
              lineNumber: 237,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/FocusSettings:222:16", "data-dynamic-content": "false", className: "text-xs text-muted-foreground mb-3", children: "Define qual o primeiro dia da semana no calendário" }, void 0, false, {
              fileName: "/app/src/pages/FocusSettings.jsx",
              lineNumber: 241,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusSettings:223:16", "data-dynamic-content": "true", className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "pages/FocusSettings:224:18",
                  "data-dynamic-content": "true",
                  onClick: () => setWeekStartsOn(1),
                  className: `px-4 py-3 rounded-xl text-sm font-medium transition-all ${weekStartsOn === 1 ? "bg-[#E87A5A] text-white shadow-md" : "bg-secondary text-muted-foreground hover:bg-[#E8E0D8]"}`,
                  children: "📅 Segunda-feira"
                },
                void 0,
                false,
                {
                  fileName: "/app/src/pages/FocusSettings.jsx",
                  lineNumber: 243,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "pages/FocusSettings:230:18",
                  "data-dynamic-content": "true",
                  onClick: () => setWeekStartsOn(0),
                  className: `px-4 py-3 rounded-xl text-sm font-medium transition-all ${weekStartsOn === 0 ? "bg-[#E87A5A] text-white shadow-md" : "bg-secondary text-muted-foreground hover:bg-[#E8E0D8]"}`,
                  children: "☀️ Domingo"
                },
                void 0,
                false,
                {
                  fileName: "/app/src/pages/FocusSettings.jsx",
                  lineNumber: 249,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/src/pages/FocusSettings.jsx",
              lineNumber: 242,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/FocusSettings.jsx",
            lineNumber: 236,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/src/pages/FocusSettings.jsx",
            lineNumber: 235,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/FocusSettings.jsx",
          lineNumber: 142,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusSettings:242:8", "data-dynamic-content": "true", className: "fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-cream via-cream to-transparent z-10", children: /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "pages/FocusSettings:243:10",
            "data-dynamic-content": "true",
            onClick: save,
            className: `w-full py-4 rounded-2xl font-semibold text-sm transition-all duration-300 shadow-lg active:scale-[0.98] ${saved ? "bg-emerald-500 text-white shadow-emerald-500/25" : "bg-[#E87A5A] text-white hover:bg-[#D4694A] shadow-[#E87A5A]/25"}`,
            children: /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusSettings:247:12", "data-dynamic-content": "true", className: "flex items-center justify-center gap-2", children: saved ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
              /* @__PURE__ */ jsxDEV(Check, { "data-source-location": "pages/FocusSettings:248:25", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/src/pages/FocusSettings.jsx",
                lineNumber: 267,
                columnNumber: 26
              }, this),
              " Guardado!"
            ] }, void 0, true, {
              fileName: "/app/src/pages/FocusSettings.jsx",
              lineNumber: 267,
              columnNumber: 24
            }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
              /* @__PURE__ */ jsxDEV(Zap, { "data-source-location": "pages/FocusSettings:248:72", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/src/pages/FocusSettings.jsx",
                lineNumber: 267,
                columnNumber: 152
              }, this),
              " Guardar Definições"
            ] }, void 0, true, {
              fileName: "/app/src/pages/FocusSettings.jsx",
              lineNumber: 267,
              columnNumber: 150
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/FocusSettings.jsx",
              lineNumber: 266,
              columnNumber: 13
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/src/pages/FocusSettings.jsx",
            lineNumber: 262,
            columnNumber: 11
          },
          this
        ) }, void 0, false, {
          fileName: "/app/src/pages/FocusSettings.jsx",
          lineNumber: 261,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/pages/FocusSettings.jsx",
        lineNumber: 116,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/app/src/pages/FocusSettings.jsx",
      lineNumber: 108,
      columnNumber: 5
    },
    this
  );
}
_s(FocusSettings, "s6EoKyIRnJSf1wv5WU3wY/dfKjw=", false, function() {
  return [useNavigate];
});
_c = FocusSettings;
var _c;
$RefreshReg$(_c, "FocusSettings");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/pages/FocusSettings.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/pages/FocusSettings.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBbUdZLFNBb0pXLFVBcEpYOzs7Ozs7Ozs7Ozs7Ozs7OztBQW5HWixTQUFTQSxVQUFVQyxXQUFXQyxhQUFhQyxjQUFjO0FBQ3pELFNBQVNDLG1CQUFtQjtBQUM1QixTQUFTQyxjQUFjO0FBQ3ZCLFNBQVNDLFdBQVdDLE1BQU1DLE9BQU9DLFdBQVdDLFNBQVNDLE9BQU9DLEtBQUtDLG9CQUFvQjtBQUNyRixTQUFTQyxjQUFjO0FBRXZCLE1BQU1DLFNBQVM7QUFBQSxFQUNmLEVBQUVDLEtBQUssV0FBV0MsT0FBTyxVQUFVQyxNQUFNLEtBQUs7QUFBQSxFQUM5QyxFQUFFRixLQUFLLFFBQVFDLE9BQU8sUUFBUUMsTUFBTSxNQUFNO0FBQUEsRUFDMUMsRUFBRUYsS0FBSyxTQUFTQyxPQUFPLGVBQWVDLE1BQU0sS0FBSztBQUFBLEVBQ2pELEVBQUVGLEtBQUssV0FBV0MsT0FBTyxXQUFXQyxNQUFNLEtBQUs7QUFBQSxFQUMvQyxFQUFFRixLQUFLLFVBQVVDLE9BQU8sWUFBWUMsTUFBTSxLQUFLO0FBQUM7QUFHaEQsTUFBTUMsZ0JBQWdCO0FBQUEsRUFDdEIsRUFBRUgsS0FBSyxVQUFVQyxPQUFPLFdBQVdDLE1BQU0sS0FBSztBQUFBLEVBQzlDLEVBQUVGLEtBQUssV0FBV0MsT0FBTyxVQUFVQyxNQUFNLE1BQU07QUFBQSxFQUMvQyxFQUFFRixLQUFLLFVBQVVDLE9BQU8sU0FBU0MsTUFBTSxLQUFLO0FBQUEsRUFDNUMsRUFBRUYsS0FBSyxTQUFTQyxPQUFPLFNBQVNDLE1BQU0sS0FBSztBQUFDO0FBRzVDLHdCQUF3QkUsZ0JBQWdCO0FBQUFDLEtBQUE7QUFDdEMsUUFBTUMsV0FBV2xCLFlBQVk7QUFDN0IsUUFBTSxDQUFDbUIsS0FBS0MsTUFBTSxJQUFJeEIsU0FBUyxlQUFlO0FBQzlDLFFBQU0sQ0FBQ3lCLGVBQWVDLGdCQUFnQixJQUFJMUIsU0FBUyxJQUFJO0FBQ3ZELFFBQU0sQ0FBQzJCLE9BQU9DLFFBQVEsSUFBSTVCLFNBQVMsU0FBUztBQUM1QyxRQUFNLENBQUM2QixVQUFVQyxXQUFXLElBQUk5QixTQUFTLEVBQUU7QUFDM0MsUUFBTSxDQUFDK0IsZUFBZUMsZ0JBQWdCLElBQUloQyxTQUFTLENBQUM7QUFDcEQsUUFBTSxDQUFDaUMsY0FBY0MsZUFBZSxJQUFJbEMsU0FBUyxFQUFFO0FBQ25ELFFBQU0sQ0FBQ21DLGFBQWFDLGNBQWMsSUFBSXBDLFNBQVMsUUFBUTtBQUN2RCxRQUFNLENBQUNxQyxjQUFjQyxlQUFlLElBQUl0QyxTQUFTLENBQUM7QUFDbEQsUUFBTSxDQUFDdUMsT0FBT0MsUUFBUSxJQUFJeEMsU0FBUyxLQUFLO0FBQ3hDLFFBQU15QyxhQUFhdEMsT0FBTyxFQUFFdUMsR0FBRyxHQUFHQyxHQUFHLEVBQUUsQ0FBQztBQUN4QyxRQUFNQyxhQUFhekMsT0FBTyxFQUFFdUMsR0FBRyxHQUFHQyxHQUFHLEVBQUUsQ0FBQztBQUN4QyxRQUFNLENBQUNFLFdBQVdDLFlBQVksSUFBSTlDLFNBQVMsQ0FBQyxDQUFDO0FBQzdDLFFBQU0rQyxjQUFjNUMsT0FBTyxLQUFLO0FBRWhDRixZQUFVLE1BQU07QUFDZGEsV0FBT2tDLEtBQUtDLEdBQUcsRUFBRUMsS0FBSyxDQUFDQyxNQUFNO0FBQzNCLFVBQUlBLEdBQUdDLFVBQVd0QixhQUFZcUIsRUFBRUMsU0FBUztBQUN6QyxVQUFJRCxHQUFHRSxnQkFBaUJyQixrQkFBaUJtQixFQUFFRSxlQUFlO0FBQzFELFVBQUlGLEdBQUdHLGVBQWdCcEIsaUJBQWdCaUIsRUFBRUcsY0FBYztBQUN2RCxVQUFJSCxHQUFHSSxhQUFjbkIsZ0JBQWVlLEVBQUVJLFlBQVk7QUFDbEQsVUFBSUosR0FBR0ssMEJBQTBCQyxPQUFXL0Isa0JBQWlCeUIsRUFBRUsscUJBQXFCO0FBQ3BGLFVBQUlMLEdBQUdPLG1CQUFvQjlCLFVBQVN1QixFQUFFTyxrQkFBa0I7QUFDeEQsVUFBSVAsR0FBR1EsbUJBQW1CRixPQUFXbkIsaUJBQWdCYSxFQUFFUSxjQUFjO0FBQUEsSUFDdkUsQ0FBQyxFQUFFQyxNQUFNLE1BQU07QUFBQSxJQUFDLENBQUM7QUFBQSxFQUNuQixHQUFHLEVBQUU7QUFFTCxRQUFNQyxPQUFPLFlBQVk7QUFDdkIsVUFBTS9DLE9BQU9rQyxLQUFLYyxTQUFTO0FBQUEsTUFDekJWLFdBQVd2QjtBQUFBQSxNQUFVd0IsaUJBQWlCdEI7QUFBQUEsTUFBZXVCLGdCQUFnQnJCO0FBQUFBLE1BQ3JFc0IsY0FBY3BCO0FBQUFBLE1BQWFxQix1QkFBdUIvQjtBQUFBQSxNQUNsRGlDLG9CQUFvQi9CO0FBQUFBLE1BQU9nQyxnQkFBZ0J0QjtBQUFBQSxJQUM3QyxDQUFDO0FBQ0RHLGFBQVMsSUFBSTtBQUNidUIsZUFBVyxNQUFNdkIsU0FBUyxLQUFLLEdBQUcsR0FBSTtBQUFBLEVBQ3hDO0FBRUEsUUFBTXdCLHFCQUFxQjlELFlBQVksQ0FBQ3dDLEdBQUdDLEdBQUdzQixXQUFXO0FBQ3ZELFFBQUlBLFVBQVVBLE9BQU9DLFlBQVksV0FBV0QsT0FBT0UsU0FBUyxTQUFTO0FBQ25FcEIsa0JBQVlxQixVQUFVO0FBQ3RCO0FBQUEsSUFDRjtBQUNBckIsZ0JBQVlxQixVQUFVO0FBQ3RCM0IsZUFBVzJCLFVBQVUsRUFBRTFCLEdBQUdDLEVBQUU7QUFDNUJDLGVBQVd3QixVQUFVLEVBQUUxQixHQUFHLEdBQUdDLEdBQUcsRUFBRTtBQUNsQ0csaUJBQWEsQ0FBQyxDQUFDO0FBQUEsRUFDakIsR0FBRyxFQUFFO0FBQ0wsUUFBTXVCLG9CQUFvQm5FLFlBQVksQ0FBQ3dDLEdBQUdDLE1BQU07QUFDOUMsUUFBSUksWUFBWXFCLFFBQVM7QUFDekJ4QixlQUFXd0IsVUFBVSxFQUFFMUIsR0FBR0EsSUFBSUQsV0FBVzJCLFFBQVExQixHQUFHQyxHQUFHQSxJQUFJRixXQUFXMkIsUUFBUXpCLEVBQUU7QUFDaEZHLGlCQUFhLEVBQUV3QixXQUFXLGFBQWExQixXQUFXd0IsUUFBUTFCLENBQUMsT0FBT0UsV0FBV3dCLFFBQVF6QixDQUFDLE9BQU80QixZQUFZLE9BQU8sQ0FBQztBQUFBLEVBQ25ILEdBQUcsRUFBRTtBQUNMLFFBQU1DLG1CQUFtQnRFLFlBQVksQ0FBQ3dDLEdBQUdDLE1BQU07QUFDN0MsUUFBSUksWUFBWXFCLFNBQVM7QUFBQ3JCLGtCQUFZcUIsVUFBVTtBQUFNO0FBQUEsSUFBTztBQUM3RHRCLGlCQUFhLEVBQUV3QixXQUFXLG1CQUFtQkMsWUFBWSwwQkFBMEIsQ0FBQztBQUNwRixRQUFJN0IsSUFBSUQsV0FBVzJCLFFBQVExQixJQUFJLElBQUtwQixVQUFTLFFBQVE7QUFBQSxFQUN2RCxHQUFHLENBQUNBLFFBQVEsQ0FBQztBQUViLFFBQU1tRCxPQUFPO0FBQUEsSUFDYixFQUFFekQsS0FBSyxpQkFBaUJFLE1BQU1YLE1BQU1VLE9BQU8sZUFBZTtBQUFBLElBQzFELEVBQUVELEtBQUssU0FBU0UsTUFBTVYsT0FBT1MsT0FBTyxTQUFTO0FBQUEsSUFDN0MsRUFBRUQsS0FBSyxXQUFXRSxNQUFNVCxXQUFXUSxPQUFPLFdBQVc7QUFBQSxJQUNyRCxFQUFFRCxLQUFLLFdBQVdFLE1BQU1MLGNBQWNJLE9BQU8sUUFBUTtBQUFBLEVBQUM7QUFHdEQsU0FDRTtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQUksd0JBQXFCO0FBQUEsTUFBMkIsd0JBQXFCO0FBQUEsTUFBTyxXQUFVO0FBQUEsTUFDM0YsY0FBYyxDQUFDeUQsTUFBTVYsbUJBQW1CVSxFQUFFQyxRQUFRLENBQUMsRUFBRUMsU0FBU0YsRUFBRUMsUUFBUSxDQUFDLEVBQUVFLFNBQVNILEVBQUVULE1BQU07QUFBQSxNQUM1RixhQUFhLENBQUNTLE1BQU1MLGtCQUFrQkssRUFBRUMsUUFBUSxDQUFDLEVBQUVDLFNBQVNGLEVBQUVDLFFBQVEsQ0FBQyxFQUFFRSxPQUFPO0FBQUEsTUFDaEYsWUFBWSxDQUFDSCxNQUFNRixpQkFBaUJFLEVBQUVJLGVBQWUsQ0FBQyxHQUFHRixXQUFXbkMsV0FBVzJCLFFBQVExQixHQUFHZ0MsRUFBRUksZUFBZSxDQUFDLEdBQUdELFdBQVdwQyxXQUFXMkIsUUFBUXpCLENBQUM7QUFBQSxNQUM5SSxhQUFhLENBQUMrQixNQUFNVixtQkFBbUJVLEVBQUVFLFNBQVNGLEVBQUVHLFNBQVNILEVBQUVULE1BQU07QUFBQSxNQUNyRSxhQUFhLENBQUNTLE1BQU07QUFBQyxZQUFJQSxFQUFFSyxZQUFZLEVBQUdWLG1CQUFrQkssRUFBRUUsU0FBU0YsRUFBRUcsT0FBTztBQUFBLE1BQUU7QUFBQSxNQUNsRixXQUFXLENBQUNILE1BQU1GLGlCQUFpQkUsRUFBRUUsU0FBU0YsRUFBRUcsT0FBTztBQUFBLE1BRXJELGlDQUFDLFNBQUksd0JBQXFCLDRCQUEyQix3QkFBcUIsUUFBTyxPQUFPaEMsV0FBVyxXQUFVLHdCQUMzRztBQUFBLCtCQUFDLFNBQUksd0JBQXFCLDRCQUEyQix3QkFBcUIsUUFBTyxXQUFVLHFDQUN6RjtBQUFBLGlDQUFDLFlBQU8sd0JBQXFCLDZCQUE0Qix3QkFBcUIsUUFBTyxTQUFTLE1BQU12QixTQUFTLFFBQVEsR0FBRyxXQUFVLHVMQUNoSSxpQ0FBQyxhQUFVLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFNBQVEsV0FBVSxhQUFwRztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUE2RyxLQUQvRztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsVUFDQSx1QkFBQyxTQUFJLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFNBQzFFO0FBQUEsbUNBQUMsUUFBRyx3QkFBcUIsOEJBQTZCLHdCQUFxQixTQUFRLFdBQVUscUNBQW9DLDBCQUFqSTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUEySTtBQUFBLFlBQzNJLHVCQUFDLE9BQUUsd0JBQXFCLDhCQUE2Qix3QkFBcUIsU0FBUSxXQUFVLGlDQUFnQyw2Q0FBNUg7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBeUo7QUFBQSxlQUYzSjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUdBO0FBQUEsYUFQRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBUUE7QUFBQSxRQUdBLHVCQUFDLFNBQUksd0JBQXFCLDZCQUE0Qix3QkFBcUIsUUFBTyxXQUFVLGFBQzFGLGlDQUFDLFNBQUksd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFVLHdFQUMxRm1ELGVBQUtPO0FBQUFBLFVBQUksQ0FBQ0MsR0FBR0MsZUFDZDtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQU8sd0JBQXFCO0FBQUEsY0FBNkIsd0JBQXFCO0FBQUEsY0FBbUIsU0FBUyxNQUFNMUQsT0FBT3lELEVBQUVqRSxHQUFHO0FBQUEsY0FDN0gsV0FBVyxtSEFDWE8sUUFBUTBELEVBQUVqRSxNQUFNLDBEQUEwRCxtRUFBbUU7QUFBQSxjQUMzSSxrQkFBZ0JrRTtBQUFBQSxjQUFZLDBCQUF1QjtBQUFBLGNBQ2pEO0FBQUEsdUNBQUMsRUFBRSxNQUFGLEVBQU8sd0JBQXFCLDhCQUE2Qix3QkFBcUIsU0FBUSxXQUFVLFdBQVUsa0JBQWdCQSxZQUFZLDBCQUF1QixVQUE5SjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUFvSztBQUFBLGdCQUNwSyx1QkFBQyxVQUFLLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sV0FBVSxvQkFBbUIsa0JBQWdCQSxZQUFZLDBCQUF1QixRQUFPLGtCQUFlLFNBQVNELFlBQUVoRSxTQUFyTTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUEyTTtBQUFBO0FBQUE7QUFBQSxZQUxwSGdFLEVBQUVqRTtBQUFBQSxZQUE3RjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBTUU7QUFBQSxRQUNGLEtBVEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQVVBLEtBWEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQVlBO0FBQUEsUUFFQSx1QkFBQyxTQUFJLHdCQUFxQiw2QkFBNEIsd0JBQXFCLFFBQU8sV0FBVSw2Q0FDekZPO0FBQUFBLGtCQUFRLG1CQUNULHVCQUFDLE9BQU8sS0FBUCxFQUFXLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sU0FBUyxFQUFFNEQsU0FBUyxHQUFHeEMsR0FBRyxFQUFFLEdBQUcsU0FBUyxFQUFFd0MsU0FBUyxHQUFHeEMsR0FBRyxFQUFFLEdBQUcsV0FBVSxhQUM5SjtBQUFBLG1DQUFDLFNBQUksd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFVLDZGQUMzRixpQ0FBQyxTQUFJLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sV0FBVSxxQ0FDM0Y7QUFBQSxxQ0FBQyxTQUFJLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFNBQzFFO0FBQUEsdUNBQUMsUUFBRyx3QkFBcUIsOEJBQTZCLHdCQUFxQixTQUFRLFdBQVUsaUVBQWdFLG1DQUE3SjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUFnTDtBQUFBLGdCQUNoTCx1QkFBQyxPQUFFLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFNBQVEsV0FBVSxzQ0FBcUMsNERBQWpJO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQTZLO0FBQUEsbUJBRi9LO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBR0E7QUFBQSxjQUNBO0FBQUEsZ0JBQUM7QUFBQTtBQUFBLGtCQUFPLHdCQUFxQjtBQUFBLGtCQUE2Qix3QkFBcUI7QUFBQSxrQkFBTyxTQUFTLE1BQU1qQixpQkFBaUIsQ0FBQ0QsYUFBYTtBQUFBLGtCQUN0SSxXQUFXLDhEQUE4REEsZ0JBQWdCLCtDQUErQyxjQUFjO0FBQUEsa0JBQ2xKO0FBQUEsb0JBQUMsT0FBTztBQUFBLG9CQUFQO0FBQUEsc0JBQVcsd0JBQXFCO0FBQUEsc0JBQTZCLHdCQUFxQjtBQUFBLHNCQUFPLFNBQVMsRUFBRWlCLEdBQUdqQixnQkFBZ0IsS0FBSyxFQUFFO0FBQUEsc0JBQUcsWUFBWSxFQUFFMEMsTUFBTSxVQUFVaUIsV0FBVyxLQUFLQyxTQUFTLEdBQUc7QUFBQSxzQkFDOUwsV0FBVTtBQUFBO0FBQUEsb0JBRFI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQUNnRTtBQUFBO0FBQUEsZ0JBSGxFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQUlBO0FBQUEsaUJBVEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFVQSxLQVhGO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBWUE7QUFBQSxZQUVDNUQsaUJBQ0gsdUJBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFdBQVUsMkRBQ3ZGO0FBQUEscUNBQUMsUUFBRyx3QkFBcUIsOEJBQTZCLHdCQUFxQixTQUFRLFdBQVUsc0VBQzNGO0FBQUEsdUNBQUMsVUFBSyx3QkFBcUIsOEJBQTZCLHdCQUFxQixTQUFRLFdBQVUsdUVBQXNFLGlDQUFDLFdBQVEsd0JBQXFCLCtCQUE4Qix3QkFBcUIsU0FBUSxXQUFVLDRCQUFuRztBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUEySCxLQUFoUztBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUFtUztBQUFBLGdCQUFNO0FBQUEsbUJBRDNTO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBR0E7QUFBQSxjQUNBLHVCQUFDLFNBQUksd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFVLDBCQUMxRlYsaUJBQU9pRTtBQUFBQSxnQkFBSSxDQUFDTSxHQUFHSixlQUNwQjtBQUFBLGtCQUFDO0FBQUE7QUFBQSxvQkFBTyx3QkFBcUI7QUFBQSxvQkFBNkIsd0JBQXFCO0FBQUEsb0JBQW1CLFNBQVMsTUFBTXRELFNBQVMwRCxFQUFFdEUsR0FBRztBQUFBLG9CQUMvSCxXQUFXLDhFQUNYVyxVQUFVMkQsRUFBRXRFLE1BQU0sc0NBQXNDLHVEQUF1RDtBQUFBLG9CQUM3RyxrQkFBZ0JrRTtBQUFBQSxvQkFBWSwwQkFBdUI7QUFBQSxvQkFBUyxrQkFBZTtBQUFBLG9CQUNyRTtBQUFBLDZDQUFDLFVBQUssd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFVLFVBQVMsa0JBQWdCQSxZQUFZLDBCQUF1QixVQUFTLGtCQUFlLFFBQVFJLFlBQUVwRSxRQUE1TDtBQUFBO0FBQUE7QUFBQTtBQUFBLDZCQUFpTTtBQUFBLHNCQUFPO0FBQUEsc0JBQUVvRSxFQUFFckU7QUFBQUEsc0JBQzNNVSxVQUFVMkQsRUFBRXRFLE9BQU8sdUJBQUMsU0FBTSx3QkFBcUIsOEJBQTZCLHdCQUFxQixTQUFRLFdBQVUsc0NBQXFDLGtCQUFnQmtFLFlBQVksMEJBQXVCLFlBQXhMO0FBQUE7QUFBQTtBQUFBO0FBQUEsNkJBQWdNO0FBQUE7QUFBQTtBQUFBLGtCQUxqSUksRUFBRXRFO0FBQUFBLGtCQUE3RjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQU1NO0FBQUEsY0FDTixLQVRFO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBVUE7QUFBQSxpQkFmTjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQWdCSTtBQUFBLGVBaENOO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBa0NFO0FBQUEsVUFHRE8sUUFBUSxXQUNULHVCQUFDLE9BQU8sS0FBUCxFQUFXLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sU0FBUyxFQUFFNEQsU0FBUyxHQUFHeEMsR0FBRyxFQUFFLEdBQUcsU0FBUyxFQUFFd0MsU0FBUyxHQUFHeEMsR0FBRyxFQUFFLEdBQUcsV0FBVSxhQUM3SjtBQUFBLFlBQ0gsRUFBRTFCLE9BQU8sUUFBUXNFLE9BQU8xRCxVQUFVMkQsUUFBUTFELGFBQWEyRCxLQUFLLEdBQUdDLEtBQUssSUFBSUMsT0FBTyxXQUFXekUsTUFBTSxNQUFNMEUsTUFBTSxFQUFFO0FBQUEsWUFDOUcsRUFBRTNFLE9BQU8sZUFBZXNFLE9BQU94RCxlQUFleUQsUUFBUXhELGtCQUFrQnlELEtBQUssR0FBR0MsS0FBSyxJQUFJQyxPQUFPLFdBQVd6RSxNQUFNLEtBQUswRSxNQUFNLEVBQUU7QUFBQSxZQUM5SCxFQUFFM0UsT0FBTyxlQUFlc0UsT0FBT3RELGNBQWN1RCxRQUFRdEQsaUJBQWlCdUQsS0FBSyxHQUFHQyxLQUFLLElBQUlDLE9BQU8sV0FBV3pFLE1BQU0sTUFBTTBFLE1BQU0sRUFBRTtBQUFBLFVBQUMsRUFDOUhaO0FBQUFBLFlBQUksQ0FBQ2EsU0FDTCx1QkFBQyxTQUFJLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQXdCLFdBQVUsNkZBQ3hHO0FBQUEscUNBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFdBQVUsMENBQzNGO0FBQUEsdUNBQUMsUUFBRyx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFdBQVUsaUVBQWdFLDhCQUEyQixTQUFRLDJCQUF5QkEsTUFBTUMsTUFBTUQsTUFBTUUsS0FDeE87QUFBQSx5Q0FBQyxVQUFLLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sV0FBVSxXQUFVLDhCQUEyQixRQUFPLDJCQUF5QkYsTUFBTUMsTUFBTUQsTUFBTUUsS0FBTUYsZUFBSzNFLFFBQWhNO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQXFNO0FBQUEsa0JBQU87QUFBQSxrQkFBRTJFLEtBQUs1RTtBQUFBQSxxQkFEck47QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFFQTtBQUFBLGdCQUNBO0FBQUEsa0JBQUMsT0FBTztBQUFBLGtCQUFQO0FBQUEsb0JBQVksd0JBQXFCO0FBQUEsb0JBQTZCLHdCQUFxQjtBQUFBLG9CQUF3QixTQUFTLEVBQUUrRSxPQUFPLElBQUk7QUFBQSxvQkFBRyxTQUFTLEVBQUVBLE9BQU8sRUFBRTtBQUFBLG9CQUM3SixXQUFVO0FBQUEsb0JBQXFCLE9BQU8sRUFBRUwsT0FBT0UsS0FBS0YsTUFBTTtBQUFBLG9CQUFHLDhCQUEyQjtBQUFBLG9CQUFRLDJCQUF5QkUsTUFBTUMsTUFBTUQsTUFBTUU7QUFBQUEsb0JBQ3BJRjtBQUFBQSwyQkFBS047QUFBQUEsc0JBQU0sdUJBQUMsVUFBSyx3QkFBcUIsOEJBQTZCLHdCQUFxQixTQUFRLFdBQVUsOEJBQTZCLG1CQUE1SDtBQUFBO0FBQUE7QUFBQTtBQUFBLDZCQUErSDtBQUFBO0FBQUE7QUFBQSxrQkFGN0NNLEtBQUtOO0FBQUFBLGtCQUFyRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQUdBO0FBQUEsbUJBUEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFRQTtBQUFBLGNBQ0EsdUJBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFdBQVUsWUFDM0Y7QUFBQTtBQUFBLGtCQUFDO0FBQUE7QUFBQSxvQkFBTSx3QkFBcUI7QUFBQSxvQkFBNkIsd0JBQXFCO0FBQUEsb0JBQU8sTUFBSztBQUFBLG9CQUFRLEtBQUtNLEtBQUtKO0FBQUFBLG9CQUFLLEtBQUtJLEtBQUtIO0FBQUFBLG9CQUFLLE1BQU1HLEtBQUtEO0FBQUFBLG9CQUFNLE9BQU9DLEtBQUtOO0FBQUFBLG9CQUNqSyxVQUFVLENBQUNiLE1BQU1tQixLQUFLTCxPQUFPUyxPQUFPdkIsRUFBRVQsT0FBT3NCLEtBQUssQ0FBQztBQUFBLG9CQUNuRCxXQUFVO0FBQUEsb0JBQ1YsT0FBTyxFQUFFVyxhQUFhTCxLQUFLRixPQUFPUSxZQUFZLDZCQUE2Qk4sS0FBS0YsS0FBSyxRQUFRRSxLQUFLRixLQUFLLEtBQUtFLEtBQUtOLFFBQVFNLEtBQUtKLFFBQVFJLEtBQUtILE1BQU1HLEtBQUtKLE9BQU8sR0FBRyxlQUFlSSxLQUFLTixRQUFRTSxLQUFLSixRQUFRSSxLQUFLSCxNQUFNRyxLQUFLSixPQUFPLEdBQUcsbUJBQW1CO0FBQUE7QUFBQSxrQkFIbFA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQUdvUDtBQUFBLGdCQUNwUCx1QkFBQyxTQUFJLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sV0FBVSxpRUFDM0Y7QUFBQSx5Q0FBQyxVQUFLLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sOEJBQTJCLE9BQU0sMkJBQXlCSSxNQUFNQyxNQUFNRCxNQUFNRSxLQUFNRjtBQUFBQSx5QkFBS0o7QUFBQUEsb0JBQUk7QUFBQSx1QkFBL0s7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBZ0w7QUFBQSxrQkFDaEwsdUJBQUMsVUFBSyx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLDhCQUEyQixPQUFNLDJCQUF5QkksTUFBTUMsTUFBTUQsTUFBTUUsS0FBTUY7QUFBQUEseUJBQUtIO0FBQUFBLG9CQUFJO0FBQUEsdUJBQS9LO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQWdMO0FBQUEscUJBRmxMO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBR0E7QUFBQSxtQkFSRjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQVNBO0FBQUEsaUJBbkJrRkcsS0FBSzVFLE9BQTdGO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBb0JJO0FBQUEsVUFDSixLQTNCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQTRCRTtBQUFBLFVBR0RNLFFBQVEsYUFDVCx1QkFBQyxPQUFPLEtBQVAsRUFBVyx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFNBQVMsRUFBRTRELFNBQVMsR0FBR3hDLEdBQUcsRUFBRSxHQUFHLFNBQVMsRUFBRXdDLFNBQVMsR0FBR3hDLEdBQUcsRUFBRSxHQUFHLFdBQVUsYUFDOUosaUNBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFdBQVUsMkRBQzNGO0FBQUEsbUNBQUMsUUFBRyx3QkFBcUIsOEJBQTZCLHdCQUFxQixTQUFRLFdBQVUsc0VBQzNGO0FBQUEscUNBQUMsVUFBSyx3QkFBcUIsOEJBQTZCLHdCQUFxQixTQUFRLFdBQVUsK0VBQThFLGtCQUE3SztBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUErSztBQUFBLGNBQU07QUFBQSxpQkFEdkw7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFHQTtBQUFBLFlBQ0EsdUJBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFdBQVUsMEJBQzFGeEIsd0JBQWM2RDtBQUFBQSxjQUFJLENBQUNvQixHQUFHbEIsZUFDekI7QUFBQSxnQkFBQztBQUFBO0FBQUEsa0JBQU8sd0JBQXFCO0FBQUEsa0JBQTZCLHdCQUFxQjtBQUFBLGtCQUFtQixTQUFTLE1BQU05QyxlQUFlZ0UsRUFBRXBGLEdBQUc7QUFBQSxrQkFDckksV0FBVyxtRkFDWG1CLGdCQUFnQmlFLEVBQUVwRixNQUFNLHNDQUFzQyx1REFBdUQ7QUFBQSxrQkFDbkgsa0JBQWdCa0U7QUFBQUEsa0JBQVksMEJBQXVCO0FBQUEsa0JBQWdCLGtCQUFlO0FBQUEsa0JBQzlFO0FBQUEsMkNBQUMsVUFBSyx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLGtCQUFnQkEsWUFBWSwwQkFBdUIsaUJBQWdCLGtCQUFlLFFBQVFrQixZQUFFbEYsUUFBaEw7QUFBQTtBQUFBO0FBQUE7QUFBQSwyQkFBcUw7QUFBQSxvQkFBTztBQUFBLG9CQUFFa0YsRUFBRW5GO0FBQUFBO0FBQUFBO0FBQUFBLGdCQUozR21GLEVBQUVwRjtBQUFBQSxnQkFBN0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQUtJO0FBQUEsWUFDSixLQVJBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBU0E7QUFBQSxlQWRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBZUEsS0FoQko7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFpQkU7QUFBQSxVQUdETyxRQUFRLGFBQ1QsdUJBQUMsT0FBTyxLQUFQLEVBQVcsd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxTQUFTLEVBQUU0RCxTQUFTLEdBQUd4QyxHQUFHLEVBQUUsR0FBRyxTQUFTLEVBQUV3QyxTQUFTLEdBQUd4QyxHQUFHLEVBQUUsR0FBRyxXQUFVLGFBQzlKLGlDQUFDLFNBQUksd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFVLDJEQUMzRjtBQUFBLG1DQUFDLFFBQUcsd0JBQXFCLDhCQUE2Qix3QkFBcUIsU0FBUSxXQUFVLHNFQUMzRjtBQUFBLHFDQUFDLFVBQUssd0JBQXFCLDhCQUE2Qix3QkFBcUIsU0FBUSxXQUFVLHVFQUFzRSxpQ0FBQyxnQkFBYSx3QkFBcUIsK0JBQThCLHdCQUFxQixTQUFRLFdBQVUsNEJBQXhHO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQWdJLEtBQXJTO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQXdTO0FBQUEsY0FBTTtBQUFBLGlCQURoVDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUdBO0FBQUEsWUFDQSx1QkFBQyxPQUFFLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFNBQVEsV0FBVSxzQ0FBcUMsa0VBQWpJO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQW1MO0FBQUEsWUFDbkwsdUJBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFdBQVUsMEJBQzNGO0FBQUE7QUFBQSxnQkFBQztBQUFBO0FBQUEsa0JBQU8sd0JBQXFCO0FBQUEsa0JBQTZCLHdCQUFxQjtBQUFBLGtCQUFPLFNBQVMsTUFBTUwsZ0JBQWdCLENBQUM7QUFBQSxrQkFDeEgsV0FBVywyREFDWEQsaUJBQWlCLElBQUksc0NBQXNDLHVEQUF1RDtBQUFBLGtCQUNqSDtBQUFBO0FBQUEsZ0JBSEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBS0E7QUFBQSxjQUNBO0FBQUEsZ0JBQUM7QUFBQTtBQUFBLGtCQUFPLHdCQUFxQjtBQUFBLGtCQUE2Qix3QkFBcUI7QUFBQSxrQkFBTyxTQUFTLE1BQU1DLGdCQUFnQixDQUFDO0FBQUEsa0JBQ3hILFdBQVcsMkRBQ1hELGlCQUFpQixJQUFJLHNDQUFzQyx1REFBdUQ7QUFBQSxrQkFDakg7QUFBQTtBQUFBLGdCQUhDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQUtBO0FBQUEsaUJBWkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFhQTtBQUFBLGVBbkJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBb0JBLEtBckJKO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBc0JFO0FBQUEsYUFuSEo7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQXFIQTtBQUFBLFFBRUEsdUJBQUMsU0FBSSx3QkFBcUIsNkJBQTRCLHdCQUFxQixRQUFPLFdBQVUsK0ZBQzFGO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFBTyx3QkFBcUI7QUFBQSxZQUE2Qix3QkFBcUI7QUFBQSxZQUFPLFNBQVN3QjtBQUFBQSxZQUMvRixXQUFXLDJHQUNYdEIsUUFBUSxvREFBb0QsZ0VBQWdFO0FBQUEsWUFFMUgsaUNBQUMsVUFBSyx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFdBQVUsMENBQzNGQSxrQkFBUSxtQ0FBRTtBQUFBLHFDQUFDLFNBQU0sd0JBQXFCLDhCQUE2Qix3QkFBcUIsU0FBUSxXQUFVLGFBQWhHO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQXlHO0FBQUEsY0FBRztBQUFBLGlCQUE5RztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUF3SCxJQUFNLG1DQUFFO0FBQUEscUNBQUMsT0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixTQUFRLFdBQVUsYUFBOUY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBdUc7QUFBQSxjQUFHO0FBQUEsaUJBQTVHO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQStILEtBRHhRO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUE7QUFBQTtBQUFBLFVBTkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBT0EsS0FSRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBU0E7QUFBQSxXQTFKRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBMkpBO0FBQUE7QUFBQSxJQW5LRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFvS0E7QUFFSjtBQUFDbEIsR0F6T3VCRCxlQUFhO0FBQUEsVUFDbEJoQixXQUFXO0FBQUE7QUFBQSxLQUROZ0I7QUFBYSxJQUFBaUY7QUFBQSxhQUFBQSxJQUFBIiwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VDYWxsYmFjayIsInVzZVJlZiIsInVzZU5hdmlnYXRlIiwibW90aW9uIiwiQXJyb3dMZWZ0IiwiQmVsbCIsIkNsb2NrIiwiUmVmcmVzaEN3IiwiVm9sdW1lMiIsIkNoZWNrIiwiWmFwIiwiQ2FsZW5kYXJEYXlzIiwiYmFzZTQ0IiwiU09VTkRTIiwia2V5IiwibGFiZWwiLCJpY29uIiwiUkVTRVRfT1BUSU9OUyIsIkZvY3VzU2V0dGluZ3MiLCJfcyIsIm5hdmlnYXRlIiwidGFiIiwic2V0VGFiIiwibm90aWZpY2F0aW9ucyIsInNldE5vdGlmaWNhdGlvbnMiLCJzb3VuZCIsInNldFNvdW5kIiwiZm9jdXNNaW4iLCJzZXRGb2N1c01pbiIsInNob3J0QnJlYWtNaW4iLCJzZXRTaG9ydEJyZWFrTWluIiwibG9uZ0JyZWFrTWluIiwic2V0TG9uZ0JyZWFrTWluIiwib3JhbmdlUmVzZXQiLCJzZXRPcmFuZ2VSZXNldCIsIndlZWtTdGFydHNPbiIsInNldFdlZWtTdGFydHNPbiIsInNhdmVkIiwic2V0U2F2ZWQiLCJ0b3VjaFN0YXJ0IiwieCIsInkiLCJkcmFnT2Zmc2V0IiwiZHJhZ1N0eWxlIiwic2V0RHJhZ1N0eWxlIiwiaWdub3JlU3dpcGUiLCJhdXRoIiwibWUiLCJ0aGVuIiwidSIsImZvY3VzX21pbiIsInNob3J0X2JyZWFrX21pbiIsImxvbmdfYnJlYWtfbWluIiwib3JhbmdlX3Jlc2V0Iiwibm90aWZpY2F0aW9uc19lbmFibGVkIiwidW5kZWZpbmVkIiwibm90aWZpY2F0aW9uX3NvdW5kIiwid2Vla19zdGFydHNfb24iLCJjYXRjaCIsInNhdmUiLCJ1cGRhdGVNZSIsInNldFRpbWVvdXQiLCJoYW5kbGVQb2ludGVyU3RhcnQiLCJ0YXJnZXQiLCJ0YWdOYW1lIiwidHlwZSIsImN1cnJlbnQiLCJoYW5kbGVQb2ludGVyTW92ZSIsInRyYW5zZm9ybSIsInRyYW5zaXRpb24iLCJoYW5kbGVQb2ludGVyRW5kIiwidGFicyIsImUiLCJ0b3VjaGVzIiwiY2xpZW50WCIsImNsaWVudFkiLCJjaGFuZ2VkVG91Y2hlcyIsImJ1dHRvbnMiLCJtYXAiLCJ0IiwiX19hcnJJZHhfXyIsIm9wYWNpdHkiLCJzdGlmZm5lc3MiLCJkYW1waW5nIiwicyIsInZhbHVlIiwic2V0dGVyIiwibWluIiwibWF4IiwiY29sb3IiLCJzdGVwIiwiaXRlbSIsImlkIiwiX2lkIiwic2NhbGUiLCJOdW1iZXIiLCJhY2NlbnRDb2xvciIsImJhY2tncm91bmQiLCJvIiwiX2MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiRm9jdXNTZXR0aW5ncy5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlQ2FsbGJhY2ssIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlTmF2aWdhdGUgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuaW1wb3J0IHsgbW90aW9uIH0gZnJvbSBcImZyYW1lci1tb3Rpb25cIjtcbmltcG9ydCB7IEFycm93TGVmdCwgQmVsbCwgQ2xvY2ssIFJlZnJlc2hDdywgVm9sdW1lMiwgQ2hlY2ssIFphcCwgQ2FsZW5kYXJEYXlzIH0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xuaW1wb3J0IHsgYmFzZTQ0IH0gZnJvbSBcIkAvYXBpL2Jhc2U0NENsaWVudFwiO1xuXG5jb25zdCBTT1VORFMgPSBbXG57IGtleTogXCJkZWZhdWx0XCIsIGxhYmVsOiBcIlBhZHLDo29cIiwgaWNvbjogXCLwn5SUXCIgfSxcbnsga2V5OiBcImJlbGxcIiwgbGFiZWw6IFwiU2lub1wiLCBpY29uOiBcIvCfm47vuI9cIiB9LFxueyBrZXk6IFwiY2hpbWVcIiwgbGFiZWw6IFwiVG9xdWUgc3VhdmVcIiwgaWNvbjogXCLwn461XCIgfSxcbnsga2V5OiBcImRpZ2l0YWxcIiwgbGFiZWw6IFwiRGlnaXRhbFwiLCBpY29uOiBcIvCfkrtcIiB9LFxueyBrZXk6IFwibmF0dXJlXCIsIGxhYmVsOiBcIk5hdHVyZXphXCIsIGljb246IFwi8J+Mv1wiIH1dO1xuXG5cbmNvbnN0IFJFU0VUX09QVElPTlMgPSBbXG57IGtleTogXCJ3ZWVrbHlcIiwgbGFiZWw6IFwiU2VtYW5hbFwiLCBpY29uOiBcIvCfk4VcIiB9LFxueyBrZXk6IFwibW9udGhseVwiLCBsYWJlbDogXCJNZW5zYWxcIiwgaWNvbjogXCLwn5eT77iPXCIgfSxcbnsga2V5OiBcInllYXJseVwiLCBsYWJlbDogXCJBbnVhbFwiLCBpY29uOiBcIvCfjq9cIiB9LFxueyBrZXk6IFwibmV2ZXJcIiwgbGFiZWw6IFwiTnVuY2FcIiwgaWNvbjogXCLimb7vuI9cIiB9XTtcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBGb2N1c1NldHRpbmdzKCkge1xuICBjb25zdCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XG4gIGNvbnN0IFt0YWIsIHNldFRhYl0gPSB1c2VTdGF0ZShcIm5vdGlmaWNhdGlvbnNcIik7XG4gIGNvbnN0IFtub3RpZmljYXRpb25zLCBzZXROb3RpZmljYXRpb25zXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbc291bmQsIHNldFNvdW5kXSA9IHVzZVN0YXRlKFwiZGVmYXVsdFwiKTtcbiAgY29uc3QgW2ZvY3VzTWluLCBzZXRGb2N1c01pbl0gPSB1c2VTdGF0ZSgyNSk7XG4gIGNvbnN0IFtzaG9ydEJyZWFrTWluLCBzZXRTaG9ydEJyZWFrTWluXSA9IHVzZVN0YXRlKDUpO1xuICBjb25zdCBbbG9uZ0JyZWFrTWluLCBzZXRMb25nQnJlYWtNaW5dID0gdXNlU3RhdGUoMjApO1xuICBjb25zdCBbb3JhbmdlUmVzZXQsIHNldE9yYW5nZVJlc2V0XSA9IHVzZVN0YXRlKFwid2Vla2x5XCIpO1xuICBjb25zdCBbd2Vla1N0YXJ0c09uLCBzZXRXZWVrU3RhcnRzT25dID0gdXNlU3RhdGUoMSk7XG4gIGNvbnN0IFtzYXZlZCwgc2V0U2F2ZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCB0b3VjaFN0YXJ0ID0gdXNlUmVmKHsgeDogMCwgeTogMCB9KTtcbiAgY29uc3QgZHJhZ09mZnNldCA9IHVzZVJlZih7IHg6IDAsIHk6IDAgfSk7XG4gIGNvbnN0IFtkcmFnU3R5bGUsIHNldERyYWdTdHlsZV0gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IGlnbm9yZVN3aXBlID0gdXNlUmVmKGZhbHNlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGJhc2U0NC5hdXRoLm1lKCkudGhlbigodSkgPT4ge1xuICAgICAgaWYgKHU/LmZvY3VzX21pbikgc2V0Rm9jdXNNaW4odS5mb2N1c19taW4pO1xuICAgICAgaWYgKHU/LnNob3J0X2JyZWFrX21pbikgc2V0U2hvcnRCcmVha01pbih1LnNob3J0X2JyZWFrX21pbik7XG4gICAgICBpZiAodT8ubG9uZ19icmVha19taW4pIHNldExvbmdCcmVha01pbih1LmxvbmdfYnJlYWtfbWluKTtcbiAgICAgIGlmICh1Py5vcmFuZ2VfcmVzZXQpIHNldE9yYW5nZVJlc2V0KHUub3JhbmdlX3Jlc2V0KTtcbiAgICAgIGlmICh1Py5ub3RpZmljYXRpb25zX2VuYWJsZWQgIT09IHVuZGVmaW5lZCkgc2V0Tm90aWZpY2F0aW9ucyh1Lm5vdGlmaWNhdGlvbnNfZW5hYmxlZCk7XG4gICAgICBpZiAodT8ubm90aWZpY2F0aW9uX3NvdW5kKSBzZXRTb3VuZCh1Lm5vdGlmaWNhdGlvbl9zb3VuZCk7XG4gICAgICBpZiAodT8ud2Vla19zdGFydHNfb24gIT09IHVuZGVmaW5lZCkgc2V0V2Vla1N0YXJ0c09uKHUud2Vla19zdGFydHNfb24pO1xuICAgIH0pLmNhdGNoKCgpID0+IHt9KTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHNhdmUgPSBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgYmFzZTQ0LmF1dGgudXBkYXRlTWUoe1xuICAgICAgZm9jdXNfbWluOiBmb2N1c01pbiwgc2hvcnRfYnJlYWtfbWluOiBzaG9ydEJyZWFrTWluLCBsb25nX2JyZWFrX21pbjogbG9uZ0JyZWFrTWluLFxuICAgICAgb3JhbmdlX3Jlc2V0OiBvcmFuZ2VSZXNldCwgbm90aWZpY2F0aW9uc19lbmFibGVkOiBub3RpZmljYXRpb25zLFxuICAgICAgbm90aWZpY2F0aW9uX3NvdW5kOiBzb3VuZCwgd2Vla19zdGFydHNfb246IHdlZWtTdGFydHNPblxuICAgIH0pO1xuICAgIHNldFNhdmVkKHRydWUpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0U2F2ZWQoZmFsc2UpLCAyMDAwKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVQb2ludGVyU3RhcnQgPSB1c2VDYWxsYmFjaygoeCwgeSwgdGFyZ2V0KSA9PiB7XG4gICAgaWYgKHRhcmdldCAmJiB0YXJnZXQudGFnTmFtZSA9PT0gXCJJTlBVVFwiICYmIHRhcmdldC50eXBlID09PSBcInJhbmdlXCIpIHtcbiAgICAgIGlnbm9yZVN3aXBlLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZ25vcmVTd2lwZS5jdXJyZW50ID0gZmFsc2U7XG4gICAgdG91Y2hTdGFydC5jdXJyZW50ID0geyB4LCB5IH07XG4gICAgZHJhZ09mZnNldC5jdXJyZW50ID0geyB4OiAwLCB5OiAwIH07XG4gICAgc2V0RHJhZ1N0eWxlKHt9KTtcbiAgfSwgW10pO1xuICBjb25zdCBoYW5kbGVQb2ludGVyTW92ZSA9IHVzZUNhbGxiYWNrKCh4LCB5KSA9PiB7XG4gICAgaWYgKGlnbm9yZVN3aXBlLmN1cnJlbnQpIHJldHVybjtcbiAgICBkcmFnT2Zmc2V0LmN1cnJlbnQgPSB7IHg6IHggLSB0b3VjaFN0YXJ0LmN1cnJlbnQueCwgeTogeSAtIHRvdWNoU3RhcnQuY3VycmVudC55IH07XG4gICAgc2V0RHJhZ1N0eWxlKHsgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7ZHJhZ09mZnNldC5jdXJyZW50Lnh9cHgsICR7ZHJhZ09mZnNldC5jdXJyZW50Lnl9cHgpYCwgdHJhbnNpdGlvbjogXCJub25lXCIgfSk7XG4gIH0sIFtdKTtcbiAgY29uc3QgaGFuZGxlUG9pbnRlckVuZCA9IHVzZUNhbGxiYWNrKCh4LCB5KSA9PiB7XG4gICAgaWYgKGlnbm9yZVN3aXBlLmN1cnJlbnQpIHtpZ25vcmVTd2lwZS5jdXJyZW50ID0gZmFsc2U7cmV0dXJuO31cbiAgICBzZXREcmFnU3R5bGUoeyB0cmFuc2Zvcm06IFwidHJhbnNsYXRlKDAsIDApXCIsIHRyYW5zaXRpb246IFwidHJhbnNmb3JtIDAuM3MgZWFzZS1vdXRcIiB9KTtcbiAgICBpZiAoeCAtIHRvdWNoU3RhcnQuY3VycmVudC54IDwgLTYwKSBuYXZpZ2F0ZShcIi9mb2N1c1wiKTtcbiAgfSwgW25hdmlnYXRlXSk7XG5cbiAgY29uc3QgdGFicyA9IFtcbiAgeyBrZXk6IFwibm90aWZpY2F0aW9uc1wiLCBpY29uOiBCZWxsLCBsYWJlbDogXCJOb3RpZmljYcOnw7Vlc1wiIH0sXG4gIHsga2V5OiBcInRpbWVyXCIsIGljb246IENsb2NrLCBsYWJlbDogXCJUZW1wb3NcIiB9LFxuICB7IGtleTogXCJvcmFuZ2VzXCIsIGljb246IFJlZnJlc2hDdywgbGFiZWw6IFwiTGFyYW5qYXNcIiB9LFxuICB7IGtleTogXCJnZW5lcmFsXCIsIGljb246IENhbGVuZGFyRGF5cywgbGFiZWw6IFwiR2VyYWxcIiB9XTtcblxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzU2V0dGluZ3M6ODk6NFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1jcmVhbSBmbGV4IGZsZXgtY29sIHNlbGVjdC1ub25lXCJcbiAgICBvblRvdWNoU3RhcnQ9eyhlKSA9PiBoYW5kbGVQb2ludGVyU3RhcnQoZS50b3VjaGVzWzBdLmNsaWVudFgsIGUudG91Y2hlc1swXS5jbGllbnRZLCBlLnRhcmdldCl9XG4gICAgb25Ub3VjaE1vdmU9eyhlKSA9PiBoYW5kbGVQb2ludGVyTW92ZShlLnRvdWNoZXNbMF0uY2xpZW50WCwgZS50b3VjaGVzWzBdLmNsaWVudFkpfVxuICAgIG9uVG91Y2hFbmQ9eyhlKSA9PiBoYW5kbGVQb2ludGVyRW5kKGUuY2hhbmdlZFRvdWNoZXNbMF0/LmNsaWVudFggfHwgdG91Y2hTdGFydC5jdXJyZW50LngsIGUuY2hhbmdlZFRvdWNoZXNbMF0/LmNsaWVudFkgfHwgdG91Y2hTdGFydC5jdXJyZW50LnkpfVxuICAgIG9uTW91c2VEb3duPXsoZSkgPT4gaGFuZGxlUG9pbnRlclN0YXJ0KGUuY2xpZW50WCwgZS5jbGllbnRZLCBlLnRhcmdldCl9XG4gICAgb25Nb3VzZU1vdmU9eyhlKSA9PiB7aWYgKGUuYnV0dG9ucyA9PT0gMSkgaGFuZGxlUG9pbnRlck1vdmUoZS5jbGllbnRYLCBlLmNsaWVudFkpO319XG4gICAgb25Nb3VzZVVwPXsoZSkgPT4gaGFuZGxlUG9pbnRlckVuZChlLmNsaWVudFgsIGUuY2xpZW50WSl9PlxuICAgICAgXG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNTZXR0aW5nczo5Nzo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgc3R5bGU9e2RyYWdTdHlsZX0gY2xhc3NOYW1lPVwiZmxleC0xIGZsZXggZmxleC1jb2xcIj5cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzU2V0dGluZ3M6OTg6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC00IHB4LTUgcHktNFwiPlxuICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1NldHRpbmdzOjk5OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoXCIvZm9jdXNcIil9IGNsYXNzTmFtZT1cInctMTEgaC0xMSByb3VuZGVkLTJ4bCBiZy13aGl0ZSBib3JkZXIgYm9yZGVyLWJvcmRlciBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LW11dGVkLWZvcmVncm91bmQgaG92ZXI6dGV4dC1mb3JlZ3JvdW5kIGhvdmVyOmJvcmRlci1bI0U4N0E1QV0vMzAgdHJhbnNpdGlvbi1hbGwgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICA8QXJyb3dMZWZ0IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNTZXR0aW5nczoxMDA6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy01IGgtNVwiIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzU2V0dGluZ3M6MTAyOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiPlxuICAgICAgICAgICAgPGgxIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNTZXR0aW5nczoxMDM6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdGV4dC1mb3JlZ3JvdW5kXCI+RGVmaW5pw6fDtWVzPC9oMT5cbiAgICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNTZXR0aW5nczoxMDQ6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj5QZXJzb25hbGl6YSBhIHR1YSBleHBlcmnDqm5jaWE8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBUYWJzICovfVxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNTZXR0aW5nczoxMDk6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInB4LTUgbWItNFwiPlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1NldHRpbmdzOjExMDoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggYmctd2hpdGUgcm91bmRlZC0yeGwgcC0xLjUgYm9yZGVyIGJvcmRlci1ib3JkZXIgc2hhZG93LXNtIGdhcC0xXCI+XG4gICAgICAgICAgICB7dGFicy5tYXAoKHQsIF9fYXJySWR4X18pID0+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNTZXR0aW5nczoxMTI6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBrZXk9e3Qua2V5fSBvbkNsaWNrPXsoKSA9PiBzZXRUYWIodC5rZXkpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleC0xIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yIHB5LTIuNSByb3VuZGVkLXhsIHRleHQtc20gZm9udC1tZWRpdW0gdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMjAwICR7XG4gICAgICAgICAgICB0YWIgPT09IHQua2V5ID8gXCJiZy1bI0U4N0E1QV0gdGV4dC13aGl0ZSBzaGFkb3ctbWQgc2hhZG93LVsjRTg3QTVBXS8yNVwiIDogXCJ0ZXh0LW11dGVkLWZvcmVncm91bmQgaG92ZXI6dGV4dC1mb3JlZ3JvdW5kIGhvdmVyOmJnLXNlY29uZGFyeS81MFwifWBcbiAgICAgICAgICAgIH0gZGF0YS1hcnItaW5kZXg9e19fYXJySWR4X199IGRhdGEtYXJyLXZhcmlhYmxlLW5hbWU9XCJ0YWJzXCI+XG4gICAgICAgICAgICAgICAgPHQuaWNvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzU2V0dGluZ3M6MTE2OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNCBoLTRcIiBkYXRhLWFyci1pbmRleD17X19hcnJJZHhfX30gZGF0YS1hcnItdmFyaWFibGUtbmFtZT1cInRhYnNcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNTZXR0aW5nczoxMTc6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJoaWRkZW4gc206aW5saW5lXCIgZGF0YS1hcnItaW5kZXg9e19fYXJySWR4X199IGRhdGEtYXJyLXZhcmlhYmxlLW5hbWU9XCJ0YWJzXCIgZGF0YS1hcnItZmllbGQ9XCJsYWJlbFwiPnt0LmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNTZXR0aW5nczoxMjM6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXgtMSBweC01IHBiLTI0IHNwYWNlLXktMyBvdmVyZmxvdy1hdXRvXCI+XG4gICAgICAgICAge3RhYiA9PT0gXCJub3RpZmljYXRpb25zXCIgJiZcbiAgICAgICAgICA8bW90aW9uLmRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzU2V0dGluZ3M6MTI1OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB5OiA4IH19IGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgeTogMCB9fSBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzU2V0dGluZ3M6MTI2OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC0yeGwgcC01IGJvcmRlciBib3JkZXItYm9yZGVyIHNoYWRvdy1zbSBob3ZlcjpzaGFkb3ctbWQgdHJhbnNpdGlvbi1zaGFkb3dcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNTZXR0aW5nczoxMjc6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1NldHRpbmdzOjEyODoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgzIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNTZXR0aW5nczoxMjk6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXNtIHRleHQtZm9yZWdyb3VuZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPvCflJQgQWxlcnRhcyBkbyBUaW1lcjwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNTZXR0aW5nczoxMzA6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LW11dGVkLWZvcmVncm91bmQgbXQtMVwiPk5vdGlmaWNhw6fDtWVzIHF1YW5kbyBvIGZvY28gb3UgcGF1c2EgdGVybWluYXI8L3A+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1NldHRpbmdzOjEzMjoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldE5vdGlmaWNhdGlvbnMoIW5vdGlmaWNhdGlvbnMpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHJlbGF0aXZlIHctMTQgaC04IHJvdW5kZWQtZnVsbCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgJHtub3RpZmljYXRpb25zID8gXCJiZy1bI0U4N0E1QV0gc2hhZG93LW1kIHNoYWRvdy1bI0U4N0E1QV0vMzBcIiA6IFwiYmctc2xhdGUtMzAwXCJ9YH0+XG4gICAgICAgICAgICAgICAgICAgIDxtb3Rpb24uZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNTZXR0aW5nczoxMzQ6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBhbmltYXRlPXt7IHg6IG5vdGlmaWNhdGlvbnMgPyAyNiA6IDIgfX0gdHJhbnNpdGlvbj17eyB0eXBlOiBcInNwcmluZ1wiLCBzdGlmZm5lc3M6IDUwMCwgZGFtcGluZzogMzAgfX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0xIHctNiBoLTYgcm91bmRlZC1mdWxsIGJnLXdoaXRlIHNoYWRvdy1tZFwiIC8+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAge25vdGlmaWNhdGlvbnMgJiZcbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1NldHRpbmdzOjE0MToxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtMnhsIHAtNSBib3JkZXIgYm9yZGVyLWJvcmRlciBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICAgIDxoMyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzU2V0dGluZ3M6MTQyOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1zbSB0ZXh0LWZvcmVncm91bmQgbWItMyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzU2V0dGluZ3M6MTQzOjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctOCBoLTggcm91bmRlZC14bCBiZy1bI0U4N0E1QV0vMTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj48Vm9sdW1lMiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzU2V0dGluZ3M6MTQzOjEwNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtWyNFODdBNUFdXCIgLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIFNvbSBkYSBub3RpZmljYcOnw6NvXG4gICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzU2V0dGluZ3M6MTQ2OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICB7U09VTkRTLm1hcCgocywgX19hcnJJZHhfXykgPT5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNTZXR0aW5nczoxNDg6MjJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBrZXk9e3Mua2V5fSBvbkNsaWNrPXsoKSA9PiBzZXRTb3VuZChzLmtleSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcmVsYXRpdmUgcHgtNCBweS0zIHJvdW5kZWQteGwgdGV4dC1zbSBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWFsbCB0ZXh0LWxlZnQgJHtcbiAgICAgICAgICAgICAgICBzb3VuZCA9PT0gcy5rZXkgPyBcImJnLVsjRTg3QTVBXSB0ZXh0LXdoaXRlIHNoYWRvdy1tZFwiIDogXCJiZy1zZWNvbmRhcnkgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGhvdmVyOmJnLVsjRThFMEQ4XVwifWBcbiAgICAgICAgICAgICAgICB9IGRhdGEtYXJyLWluZGV4PXtfX2FycklkeF9ffSBkYXRhLWFyci12YXJpYWJsZS1uYW1lPVwiU09VTkRTXCIgZGF0YS1hcnItZmllbGQ9XCJsYWJlbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1NldHRpbmdzOjE1MjoyNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cIm1yLTEuNVwiIGRhdGEtYXJyLWluZGV4PXtfX2FycklkeF9ffSBkYXRhLWFyci12YXJpYWJsZS1uYW1lPVwiU09VTkRTXCIgZGF0YS1hcnItZmllbGQ9XCJpY29uXCI+e3MuaWNvbn08L3NwYW4+IHtzLmxhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgICAge3NvdW5kID09PSBzLmtleSAmJiA8Q2hlY2sgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1NldHRpbmdzOjE1Mzo0NFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMiByaWdodC0yIHctMy41IGgtMy41XCIgZGF0YS1hcnItaW5kZXg9e19fYXJySWR4X199IGRhdGEtYXJyLXZhcmlhYmxlLW5hbWU9XCJTT1VORFNcIiAvPn1cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICAgfVxuXG4gICAgICAgICAge3RhYiA9PT0gXCJ0aW1lclwiICYmXG4gICAgICAgICAgPG1vdGlvbi5kaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1NldHRpbmdzOjE2MzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeTogOCB9fSBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHk6IDAgfX0gY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgIHtbXG4gICAgICAgICAgICB7IGxhYmVsOiBcIkZvY29cIiwgdmFsdWU6IGZvY3VzTWluLCBzZXR0ZXI6IHNldEZvY3VzTWluLCBtaW46IDUsIG1heDogOTAsIGNvbG9yOiBcIiNFODdBNUFcIiwgaWNvbjogXCLwn5SlXCIsIHN0ZXA6IDUgfSxcbiAgICAgICAgICAgIHsgbGFiZWw6IFwiUGF1c2EgQ3VydGFcIiwgdmFsdWU6IHNob3J0QnJlYWtNaW4sIHNldHRlcjogc2V0U2hvcnRCcmVha01pbiwgbWluOiAxLCBtYXg6IDMwLCBjb2xvcjogXCIjN0VCOEEwXCIsIGljb246IFwi4piVXCIsIHN0ZXA6IDEgfSxcbiAgICAgICAgICAgIHsgbGFiZWw6IFwiUGF1c2EgTG9uZ2FcIiwgdmFsdWU6IGxvbmdCcmVha01pbiwgc2V0dGVyOiBzZXRMb25nQnJlYWtNaW4sIG1pbjogNSwgbWF4OiA2MCwgY29sb3I6IFwiI0E3OEJGQVwiLCBpY29uOiBcIvCfjL9cIiwgc3RlcDogNSB9XS5cbiAgICAgICAgICAgIG1hcCgoaXRlbSkgPT5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1NldHRpbmdzOjE2OToxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17aXRlbS5sYWJlbH0gY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC0yeGwgcC01IGJvcmRlciBib3JkZXItYm9yZGVyIHNoYWRvdy1zbSBob3ZlcjpzaGFkb3ctbWQgdHJhbnNpdGlvbi1zaGFkb3dcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1NldHRpbmdzOjE3MDoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtYi00XCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzU2V0dGluZ3M6MTcxOjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXNtIHRleHQtZm9yZWdyb3VuZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibGFiZWxcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aXRlbT8uaWQgfHwgaXRlbT8uX2lkfT5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzU2V0dGluZ3M6MTcyOjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1sZ1wiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiaWNvblwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtpdGVtPy5pZCB8fCBpdGVtPy5faWR9PntpdGVtLmljb259PC9zcGFuPiB7aXRlbS5sYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPG1vdGlvbi5zcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNTZXR0aW5nczoxNzQ6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBrZXk9e2l0ZW0udmFsdWV9IGluaXRpYWw9e3sgc2NhbGU6IDEuMiB9fSBhbmltYXRlPXt7IHNjYWxlOiAxIH19XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkXCIgc3R5bGU9e3sgY29sb3I6IGl0ZW0uY29sb3IgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJ2YWx1ZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtpdGVtPy5pZCB8fCBpdGVtPy5faWR9PlxuICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLnZhbHVlfTxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNTZXR0aW5nczoxNzY6MzRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1lZGl1bSBtbC0wLjVcIj5taW48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvbW90aW9uLnNwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1NldHRpbmdzOjE3OToxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzU2V0dGluZ3M6MTgwOjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgdHlwZT1cInJhbmdlXCIgbWluPXtpdGVtLm1pbn0gbWF4PXtpdGVtLm1heH0gc3RlcD17aXRlbS5zdGVwfSB2YWx1ZT17aXRlbS52YWx1ZX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGl0ZW0uc2V0dGVyKE51bWJlcihlLnRhcmdldC52YWx1ZSkpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLTIgcm91bmRlZC1mdWxsIGFwcGVhcmFuY2Utbm9uZSBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgYWNjZW50Q29sb3I6IGl0ZW0uY29sb3IsIGJhY2tncm91bmQ6IGBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICR7aXRlbS5jb2xvcn0gMCUsICR7aXRlbS5jb2xvcn0gJHsoaXRlbS52YWx1ZSAtIGl0ZW0ubWluKSAvIChpdGVtLm1heCAtIGl0ZW0ubWluKSAqIDEwMH0lLCAjRThFMEQ4ICR7KGl0ZW0udmFsdWUgLSBpdGVtLm1pbikgLyAoaXRlbS5tYXggLSBpdGVtLm1pbikgKiAxMDB9JSwgI0U4RTBEOCAxMDAlKWAgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzU2V0dGluZ3M6MTg0OjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTBweF0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIG10LTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNTZXR0aW5nczoxODU6MjJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cIm1pblwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtpdGVtPy5pZCB8fCBpdGVtPy5faWR9PntpdGVtLm1pbn1tPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNTZXR0aW5nczoxODY6MjJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cIm1heFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtpdGVtPy5pZCB8fCBpdGVtPy5faWR9PntpdGVtLm1heH1tPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB7dGFiID09PSBcIm9yYW5nZXNcIiAmJlxuICAgICAgICAgIDxtb3Rpb24uZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNTZXR0aW5nczoxOTU6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHk6IDggfX0gYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB5OiAwIH19IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNTZXR0aW5nczoxOTY6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCBwLTUgYm9yZGVyIGJvcmRlci1ib3JkZXIgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgPGgzIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNTZXR0aW5nczoxOTc6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXNtIHRleHQtZm9yZWdyb3VuZCBtYi00IGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzU2V0dGluZ3M6MTk4OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctOCBoLTggcm91bmRlZC14bCBiZy1bI0U4N0E1QV0vMTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1sZ1wiPvCfjYo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICBSZXNldCBkYXMgTGFyYW5qYXNcbiAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1NldHRpbmdzOjIwMToxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIHtSRVNFVF9PUFRJT05TLm1hcCgobywgX19hcnJJZHhfXykgPT5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNTZXR0aW5nczoyMDM6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBrZXk9e28ua2V5fSBvbkNsaWNrPXsoKSA9PiBzZXRPcmFuZ2VSZXNldChvLmtleSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS0zIHJvdW5kZWQteGwgdGV4dC1zbSBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiAke1xuICAgICAgICAgICAgICAgIG9yYW5nZVJlc2V0ID09PSBvLmtleSA/IFwiYmctWyNFODdBNUFdIHRleHQtd2hpdGUgc2hhZG93LW1kXCIgOiBcImJnLXNlY29uZGFyeSB0ZXh0LW11dGVkLWZvcmVncm91bmQgaG92ZXI6YmctWyNFOEUwRDhdXCJ9YFxuICAgICAgICAgICAgICAgIH0gZGF0YS1hcnItaW5kZXg9e19fYXJySWR4X199IGRhdGEtYXJyLXZhcmlhYmxlLW5hbWU9XCJSRVNFVF9PUFRJT05TXCIgZGF0YS1hcnItZmllbGQ9XCJsYWJlbFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNTZXR0aW5nczoyMDc6MjJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBkYXRhLWFyci1pbmRleD17X19hcnJJZHhfX30gZGF0YS1hcnItdmFyaWFibGUtbmFtZT1cIlJFU0VUX09QVElPTlNcIiBkYXRhLWFyci1maWVsZD1cImljb25cIj57by5pY29ufTwvc3Bhbj4ge28ubGFiZWx9XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgIH1cblxuICAgICAgICAgIHt0YWIgPT09IFwiZ2VuZXJhbFwiICYmXG4gICAgICAgICAgPG1vdGlvbi5kaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1NldHRpbmdzOjIxNjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeTogOCB9fSBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHk6IDAgfX0gY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1NldHRpbmdzOjIxNzoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtMnhsIHAtNSBib3JkZXIgYm9yZGVyLWJvcmRlciBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICA8aDMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1NldHRpbmdzOjIxODoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtc20gdGV4dC1mb3JlZ3JvdW5kIG1iLTQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNTZXR0aW5nczoyMTk6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy04IGgtOCByb3VuZGVkLXhsIGJnLVsjRTg3QTVBXS8xMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPjxDYWxlbmRhckRheXMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1NldHRpbmdzOjIxOToxMDRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LVsjRTg3QTVBXVwiIC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgUHJpbWVpcm8gZGlhIGRhIHNlbWFuYVxuICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1NldHRpbmdzOjIyMjoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBtYi0zXCI+RGVmaW5lIHF1YWwgbyBwcmltZWlybyBkaWEgZGEgc2VtYW5hIG5vIGNhbGVuZMOhcmlvPC9wPlxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1NldHRpbmdzOjIyMzoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1NldHRpbmdzOjIyNDoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldFdlZWtTdGFydHNPbigxKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTMgcm91bmRlZC14bCB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgd2Vla1N0YXJ0c09uID09PSAxID8gXCJiZy1bI0U4N0E1QV0gdGV4dC13aGl0ZSBzaGFkb3ctbWRcIiA6IFwiYmctc2Vjb25kYXJ5IHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBob3ZlcjpiZy1bI0U4RTBEOF1cIn1gXG4gICAgICAgICAgICAgICAgfT5cbiAgICAgICAgICAgICAgICAgICAg8J+ThSBTZWd1bmRhLWZlaXJhXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1NldHRpbmdzOjIzMDoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldFdlZWtTdGFydHNPbigwKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTMgcm91bmRlZC14bCB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgd2Vla1N0YXJ0c09uID09PSAwID8gXCJiZy1bI0U4N0E1QV0gdGV4dC13aGl0ZSBzaGFkb3ctbWRcIiA6IFwiYmctc2Vjb25kYXJ5IHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBob3ZlcjpiZy1bI0U4RTBEOF1cIn1gXG4gICAgICAgICAgICAgICAgfT5cbiAgICAgICAgICAgICAgICAgICAg4piA77iPIERvbWluZ29cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1NldHRpbmdzOjI0Mjo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZml4ZWQgYm90dG9tLTAgbGVmdC0wIHJpZ2h0LTAgcC01IGJnLWdyYWRpZW50LXRvLXQgZnJvbS1jcmVhbSB2aWEtY3JlYW0gdG8tdHJhbnNwYXJlbnQgei0xMFwiPlxuICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1NldHRpbmdzOjI0MzoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9e3NhdmV9XG4gICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIHB5LTQgcm91bmRlZC0yeGwgZm9udC1zZW1pYm9sZCB0ZXh0LXNtIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBzaGFkb3ctbGcgYWN0aXZlOnNjYWxlLVswLjk4XSAke1xuICAgICAgICAgIHNhdmVkID8gXCJiZy1lbWVyYWxkLTUwMCB0ZXh0LXdoaXRlIHNoYWRvdy1lbWVyYWxkLTUwMC8yNVwiIDogXCJiZy1bI0U4N0E1QV0gdGV4dC13aGl0ZSBob3ZlcjpiZy1bI0Q0Njk0QV0gc2hhZG93LVsjRTg3QTVBXS8yNVwifWBcbiAgICAgICAgICB9PlxuICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1NldHRpbmdzOjI0NzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgIHtzYXZlZCA/IDw+PENoZWNrIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNTZXR0aW5nczoyNDg6MjVcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+IEd1YXJkYWRvITwvPiA6IDw+PFphcCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzU2V0dGluZ3M6MjQ4OjcyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPiBHdWFyZGFyIERlZmluacOnw7VlczwvPn1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj4pO1xuXG59Il0sImZpbGUiOiIvYXBwL3NyYy9wYWdlcy9Gb2N1c1NldHRpbmdzLmpzeCJ9