import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/HabitsRewards.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/pages/HabitsRewards.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=fc940917"; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"]; const useRef = __vite__cjsImport3_react["useRef"]; const useCallback = __vite__cjsImport3_react["useCallback"]; const useMemo = __vite__cjsImport3_react["useMemo"];
import { useNavigate } from "/node_modules/.vite/deps/react-router-dom.js?v=8a08d97a";
import { motion } from "/node_modules/.vite/deps/framer-motion.js?v=fc940917";
import { ArrowLeft, ArrowDown, Trophy, Flame, Star, Zap, Crown } from "/node_modules/.vite/deps/lucide-react.js?v=aefa7968";
import { base44 } from "/src/api/base44Client.js";
import { format, eachDayOfInterval, startOfWeek, endOfWeek, subDays } from "/node_modules/.vite/deps/date-fns.js?v=a1580542";
import { pt } from "/node_modules/.vite/deps/date-fns_locale.js?v=45b313c9";
const ACHIEVEMENTS = [
  { key: "first", icon: Star, label: "Primeiro Passo", desc: "Completar o primeiro hábito", threshold: 1, color: "text-amber-500", bg: "bg-amber-50" },
  { key: "streak_3", icon: Flame, label: "Em Chamas", desc: "3 dias seguidos com hábitos", threshold: 3, color: "text-orange-500", bg: "bg-orange-50" },
  { key: "streak_7", icon: Zap, label: "Foco Total", desc: "7 dias seguidos com hábitos", threshold: 7, color: "text-indigo-500", bg: "bg-indigo-50" },
  { key: "streak_14", icon: Crown, label: "Disciplina Real", desc: "14 dias seguidos", threshold: 14, color: "text-purple-500", bg: "bg-purple-50" },
  { key: "streak_30", icon: Trophy, label: "Lenda da Rotina", desc: "30 dias seguidos", threshold: 30, color: "text-rose-500", bg: "bg-rose-50" }
];
export default function HabitsRewards() {
  _s();
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const touchStart = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const [dragStyle, setDragStyle] = useState({});
  useEffect(() => {
    base44.entities.HabitEntry.list("-created_date", 500).then(setEntries).catch(() => setEntries([]));
  }, []);
  const activeDates = useMemo(() => {
    const set = /* @__PURE__ */ new Set();
    entries.forEach((e) => set.add(e.date));
    return set;
  }, [entries]);
  const currentStreak = useMemo(() => {
    let streak = 0;
    const d = /* @__PURE__ */ new Date();
    while (true) {
      const key = format(d, "yyyy-MM-dd");
      if (!activeDates.has(key)) break;
      streak++;
      d.setDate(d.getDate() - 1);
    }
    return streak;
  }, [activeDates]);
  const longestStreak = useMemo(() => {
    let longest = 0;
    let current = 0;
    const today = /* @__PURE__ */ new Date();
    for (let i = 365; i >= 0; i--) {
      const d = subDays(today, i);
      const key = format(d, "yyyy-MM-dd");
      if (activeDates.has(key)) {
        current++;
        if (current > longest) longest = current;
      } else {
        current = 0;
      }
    }
    return longest;
  }, [activeDates]);
  const weekStart = startOfWeek(/* @__PURE__ */ new Date(), { weekStartsOn: 1 });
  const weekEnd = endOfWeek(/* @__PURE__ */ new Date(), { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const todayStr = format(/* @__PURE__ */ new Date(), "yyyy-MM-dd");
  const totalEntries = entries.length;
  const totalScore = entries.reduce((s, e) => s + (e.score || 0), 0);
  const handlePointerStart = useCallback((x, y) => {
    touchStart.current = { x, y };
    dragOffset.current = { x: 0, y: 0 };
    setDragStyle({});
  }, []);
  const handlePointerMove = useCallback((x, y) => {
    dragOffset.current = { x: x - touchStart.current.x, y: y - touchStart.current.y };
    setDragStyle({ transform: `translate(${dragOffset.current.x}px, ${dragOffset.current.y}px)`, transition: "none" });
  }, []);
  const handlePointerEnd = useCallback((x, y) => {
    setDragStyle({ transform: "translate(0, 0)", transition: "transform 0.3s ease-out" });
    if (y - touchStart.current.y > 60) navigate("/habits");
  }, [navigate]);
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      "data-source-location": "pages/HabitsRewards:88:4",
      "data-dynamic-content": "true",
      className: "min-h-screen bg-cream flex flex-col select-none",
      onTouchStart: (e) => handlePointerStart(e.touches[0].clientX, e.touches[0].clientY),
      onTouchMove: (e) => handlePointerMove(e.touches[0].clientX, e.touches[0].clientY),
      onTouchEnd: (e) => handlePointerEnd(e.changedTouches[0]?.clientX || touchStart.current.x, e.changedTouches[0]?.clientY || touchStart.current.y),
      onMouseDown: (e) => handlePointerStart(e.clientX, e.clientY),
      onMouseMove: (e) => {
        if (e.buttons === 1) handlePointerMove(e.clientX, e.clientY);
      },
      onMouseUp: (e) => handlePointerEnd(e.clientX, e.clientY),
      children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsRewards:97:6", "data-dynamic-content": "true", style: dragStyle, className: "flex-1 flex flex-col", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsRewards:98:8", "data-dynamic-content": "true", className: "bg-white border-b border-border px-4 py-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/HabitsRewards:99:10", "data-dynamic-content": "true", onClick: () => navigate("/habits"), className: "w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all", children: /* @__PURE__ */ jsxDEV(ArrowLeft, { "data-source-location": "pages/HabitsRewards:100:12", "data-dynamic-content": "false", className: "w-5 h-5" }, void 0, false, {
            fileName: "/app/src/pages/HabitsRewards.jsx",
            lineNumber: 119,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "/app/src/pages/HabitsRewards.jsx",
            lineNumber: 118,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsRewards:102:10", "data-dynamic-content": "false", children: [
            /* @__PURE__ */ jsxDEV("h1", { "data-source-location": "pages/HabitsRewards:103:12", "data-dynamic-content": "false", className: "text-xl font-bold text-foreground", children: "Conquistas" }, void 0, false, {
              fileName: "/app/src/pages/HabitsRewards.jsx",
              lineNumber: 122,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/HabitsRewards:104:12", "data-dynamic-content": "false", className: "text-[10px] text-muted-foreground flex items-center gap-1", children: [
              "Swipe baixo ",
              /* @__PURE__ */ jsxDEV(ArrowDown, { "data-source-location": "pages/HabitsRewards:105:26", "data-dynamic-content": "false", className: "w-3 h-3" }, void 0, false, {
                fileName: "/app/src/pages/HabitsRewards.jsx",
                lineNumber: 124,
                columnNumber: 27
              }, this),
              " voltar"
            ] }, void 0, true, {
              fileName: "/app/src/pages/HabitsRewards.jsx",
              lineNumber: 123,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/HabitsRewards.jsx",
            lineNumber: 121,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/HabitsRewards.jsx",
          lineNumber: 117,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsRewards:110:8", "data-dynamic-content": "true", className: "flex-1 overflow-auto p-4 space-y-4", children: [
          currentStreak > 0 && /* @__PURE__ */ jsxDEV(
            motion.div,
            {
              "data-source-location": "pages/HabitsRewards:113:12",
              "data-dynamic-content": "true",
              initial: { opacity: 0, y: -10 },
              animate: { opacity: 1, y: 0 },
              className: "bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-5 border border-amber-200 shadow-sm",
              children: [
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsRewards:115:14", "data-dynamic-content": "true", className: "flex items-center gap-3 mb-3", children: [
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsRewards:116:16", "data-dynamic-content": "false", className: "w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-sm", children: "🔥" }, void 0, false, {
                    fileName: "/app/src/pages/HabitsRewards.jsx",
                    lineNumber: 135,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsRewards:117:16", "data-dynamic-content": "true", children: [
                    /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/HabitsRewards:118:18", "data-dynamic-content": "false", className: "text-sm font-bold text-amber-800", children: "Sequência atual" }, void 0, false, {
                      fileName: "/app/src/pages/HabitsRewards.jsx",
                      lineNumber: 137,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/HabitsRewards:119:18", "data-dynamic-content": "true", className: "text-3xl font-black text-amber-600", "data-collection-item-field": "currentStreak", children: currentStreak }, void 0, false, {
                      fileName: "/app/src/pages/HabitsRewards.jsx",
                      lineNumber: 138,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/HabitsRewards:120:18", "data-dynamic-content": "true", className: "text-xs text-amber-600/70", children: [
                      "dia",
                      currentStreak !== 1 ? "s" : "",
                      " consecutivo",
                      currentStreak !== 1 ? "s" : ""
                    ] }, void 0, true, {
                      fileName: "/app/src/pages/HabitsRewards.jsx",
                      lineNumber: 139,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/HabitsRewards.jsx",
                    lineNumber: 136,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/HabitsRewards.jsx",
                  lineNumber: 134,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsRewards:124:14", "data-dynamic-content": "true", className: "flex gap-2 justify-center", children: weekDays.map((d, i) => {
                  const key = format(d, "yyyy-MM-dd");
                  const isActive = activeDates.has(key);
                  const isToday = key === todayStr;
                  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsRewards:130:20", "data-dynamic-content": "true", className: "flex flex-col items-center gap-1", children: [
                    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsRewards:131:22", "data-dynamic-content": "true", className: `w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${isActive ? "bg-amber-500 text-white shadow-md" : "bg-slate-200 text-slate-400"} ${isToday ? "ring-2 ring-amber-300 ring-offset-1" : ""}`, children: format(d, "d") }, void 0, false, {
                      fileName: "/app/src/pages/HabitsRewards.jsx",
                      lineNumber: 150,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/HabitsRewards:136:22", "data-dynamic-content": "true", className: "text-[9px] text-muted-foreground", children: format(d, "EEE", { locale: pt }).replace(".", "") }, void 0, false, {
                      fileName: "/app/src/pages/HabitsRewards.jsx",
                      lineNumber: 155,
                      columnNumber: 23
                    }, this)
                  ] }, i, true, {
                    fileName: "/app/src/pages/HabitsRewards.jsx",
                    lineNumber: 149,
                    columnNumber: 19
                  }, this);
                }) }, void 0, false, {
                  fileName: "/app/src/pages/HabitsRewards.jsx",
                  lineNumber: 143,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/src/pages/HabitsRewards.jsx",
              lineNumber: 132,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsRewards:145:10", "data-dynamic-content": "true", className: "grid grid-cols-2 gap-3", children: [
            { icon: Trophy, label: "Recorde", value: `${longestStreak} dias`, color: "text-amber-600", bg: "bg-amber-50" },
            { icon: Star, label: "Total ações", value: totalEntries, color: "text-emerald-600", bg: "bg-emerald-50" }
          ].map(
            (c, i) => /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsRewards:150:14", "data-dynamic-content": "true", className: `${c.bg} rounded-2xl p-4 border border-border/50`, children: [
              /* @__PURE__ */ jsxDEV(c.icon, { "data-source-location": "pages/HabitsRewards:151:16", "data-dynamic-content": "true", className: `w-5 h-5 ${c.color} mb-1` }, void 0, false, {
                fileName: "/app/src/pages/HabitsRewards.jsx",
                lineNumber: 170,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/HabitsRewards:152:16", "data-dynamic-content": "true", className: "text-lg font-bold text-foreground", "data-collection-item-field": "value", "data-collection-item-id": c?.id || c?._id, children: c.value }, void 0, false, {
                fileName: "/app/src/pages/HabitsRewards.jsx",
                lineNumber: 171,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/HabitsRewards:153:16", "data-dynamic-content": "true", className: "text-[10px] text-muted-foreground", "data-collection-item-field": "label", "data-collection-item-id": c?.id || c?._id, children: c.label }, void 0, false, {
                fileName: "/app/src/pages/HabitsRewards.jsx",
                lineNumber: 172,
                columnNumber: 17
              }, this)
            ] }, i, true, {
              fileName: "/app/src/pages/HabitsRewards.jsx",
              lineNumber: 169,
              columnNumber: 13
            }, this)
          ) }, void 0, false, {
            fileName: "/app/src/pages/HabitsRewards.jsx",
            lineNumber: 164,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsRewards:159:10", "data-dynamic-content": "true", children: [
            /* @__PURE__ */ jsxDEV("h3", { "data-source-location": "pages/HabitsRewards:160:12", "data-dynamic-content": "false", className: "text-sm font-bold text-foreground mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV(Crown, { "data-source-location": "pages/HabitsRewards:161:14", "data-dynamic-content": "false", className: "w-4 h-4 text-amber-500" }, void 0, false, {
                fileName: "/app/src/pages/HabitsRewards.jsx",
                lineNumber: 180,
                columnNumber: 15
              }, this),
              " Conquistas"
            ] }, void 0, true, {
              fileName: "/app/src/pages/HabitsRewards.jsx",
              lineNumber: 179,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsRewards:163:12", "data-dynamic-content": "true", className: "space-y-2", children: ACHIEVEMENTS.map((a, __arrIdx__) => {
              const unlocked = currentStreak >= a.threshold || longestStreak >= a.threshold;
              const Icon = a.icon;
              return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsRewards:168:18", "data-dynamic-content": "true", className: `rounded-2xl p-4 border transition-all ${unlocked ? `${a.bg} border-${a.color.split("-")[1]}-200` : "bg-slate-100 border-slate-200 opacity-60"}`, "data-arr-index": __arrIdx__, "data-arr-variable-name": "ACHIEVEMENTS", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsRewards:169:20", "data-dynamic-content": "true", className: "flex items-center gap-3", "data-arr-index": __arrIdx__, "data-arr-variable-name": "ACHIEVEMENTS", children: [
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsRewards:170:22", "data-dynamic-content": "true", className: `w-11 h-11 rounded-xl flex items-center justify-center ${unlocked ? "bg-white shadow-sm" : "bg-slate-200"}`, "data-arr-index": __arrIdx__, "data-arr-variable-name": "ACHIEVEMENTS", children: /* @__PURE__ */ jsxDEV(Icon, { "data-source-location": "pages/HabitsRewards:171:24", "data-dynamic-content": "true", className: `w-5 h-5 ${unlocked ? a.color : "text-slate-400"}`, "data-arr-index": __arrIdx__, "data-arr-variable-name": "ACHIEVEMENTS" }, void 0, false, {
                  fileName: "/app/src/pages/HabitsRewards.jsx",
                  lineNumber: 190,
                  columnNumber: 25
                }, this) }, void 0, false, {
                  fileName: "/app/src/pages/HabitsRewards.jsx",
                  lineNumber: 189,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsRewards:173:22", "data-dynamic-content": "true", "data-arr-index": __arrIdx__, "data-arr-variable-name": "ACHIEVEMENTS", children: [
                  /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/HabitsRewards:174:24", "data-dynamic-content": "true", className: `text-sm font-bold ${unlocked ? "text-foreground" : "text-slate-500"}`, "data-arr-index": __arrIdx__, "data-arr-variable-name": "ACHIEVEMENTS", "data-arr-field": "label", children: a.label }, void 0, false, {
                    fileName: "/app/src/pages/HabitsRewards.jsx",
                    lineNumber: 193,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/HabitsRewards:175:24", "data-dynamic-content": "true", className: "text-[10px] text-muted-foreground", "data-arr-index": __arrIdx__, "data-arr-variable-name": "ACHIEVEMENTS", "data-arr-field": "desc", children: a.desc }, void 0, false, {
                    fileName: "/app/src/pages/HabitsRewards.jsx",
                    lineNumber: 194,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/HabitsRewards.jsx",
                  lineNumber: 192,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsRewards:177:22", "data-dynamic-content": "true", className: "ml-auto", "data-arr-index": __arrIdx__, "data-arr-variable-name": "ACHIEVEMENTS", children: unlocked ? /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsRewards:179:26", "data-dynamic-content": "false", className: "w-7 h-7 rounded-full bg-white flex items-center justify-center", "data-arr-index": __arrIdx__, "data-arr-variable-name": "ACHIEVEMENTS", children: /* @__PURE__ */ jsxDEV(Trophy, { "data-source-location": "pages/HabitsRewards:180:28", "data-dynamic-content": "false", className: "w-4 h-4 text-amber-500" }, void 0, false, {
                  fileName: "/app/src/pages/HabitsRewards.jsx",
                  lineNumber: 199,
                  columnNumber: 29
                }, this) }, void 0, false, {
                  fileName: "/app/src/pages/HabitsRewards.jsx",
                  lineNumber: 198,
                  columnNumber: 25
                }, this) : /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsRewards:183:26", "data-dynamic-content": "true", className: "w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400", "data-arr-index": __arrIdx__, "data-arr-variable-name": "ACHIEVEMENTS", "data-arr-field": "threshold", children: a.threshold }, void 0, false, {
                  fileName: "/app/src/pages/HabitsRewards.jsx",
                  lineNumber: 202,
                  columnNumber: 25
                }, this) }, void 0, false, {
                  fileName: "/app/src/pages/HabitsRewards.jsx",
                  lineNumber: 196,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/HabitsRewards.jsx",
                lineNumber: 188,
                columnNumber: 21
              }, this) }, a.key, false, {
                fileName: "/app/src/pages/HabitsRewards.jsx",
                lineNumber: 187,
                columnNumber: 19
              }, this);
            }) }, void 0, false, {
              fileName: "/app/src/pages/HabitsRewards.jsx",
              lineNumber: 182,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/HabitsRewards.jsx",
            lineNumber: 178,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/HabitsRewards.jsx",
          lineNumber: 129,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/pages/HabitsRewards.jsx",
        lineNumber: 116,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/app/src/pages/HabitsRewards.jsx",
      lineNumber: 107,
      columnNumber: 5
    },
    this
  );
}
_s(HabitsRewards, "9Q0qwf1e7pKDvsGoctCD6MVwsfI=", false, function() {
  return [useNavigate];
});
_c = HabitsRewards;
var _c;
$RefreshReg$(_c, "HabitsRewards");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/pages/HabitsRewards.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/pages/HabitsRewards.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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LFFBQU8sV0FBVSxXQUFVLGtCQUFnQnlFLFlBQVksMEJBQXVCLGdCQUN2SkMscUJBQ0QsdUJBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixTQUFRLFdBQVUsa0VBQWlFLGtCQUFnQkQsWUFBWSwwQkFBdUIsZ0JBQzlNLGlDQUFDLFVBQU8sd0JBQXFCLDhCQUE2Qix3QkFBcUIsU0FBUSxXQUFVLDRCQUFqRztBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUF5SCxLQUQ3SDtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUVFLElBRUYsdUJBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFdBQVUsMkdBQTBHLGtCQUFnQkEsWUFBWSwwQkFBdUIsZ0JBQWUsa0JBQWUsYUFDblJELFlBQUV2RSxhQURQO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBRUUsS0FSSjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQVVBO0FBQUEsbUJBbEJGO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBbUJBLEtBcEJzRnVFLEVBQUUzRSxLQUExRjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQXFCQTtBQUFBLFlBRUosQ0FBQyxLQTVCSDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQTZCQTtBQUFBLGVBakNGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBa0NBO0FBQUEsYUFuRkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQW9GQTtBQUFBLFdBakdGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFrR0E7QUFBQTtBQUFBLElBM0dGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQTRHQTtBQUVKO0FBQUNRLEdBckx1QkQsZUFBYTtBQUFBLFVBQ2xCeEIsV0FBVztBQUFBO0FBQUEsS0FETndCO0FBQWEsSUFBQXlFO0FBQUEsYUFBQUEsSUFBQSIsIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlUmVmIiwidXNlQ2FsbGJhY2siLCJ1c2VNZW1vIiwidXNlTmF2aWdhdGUiLCJtb3Rpb24iLCJBcnJvd0xlZnQiLCJBcnJvd0Rvd24iLCJUcm9waHkiLCJGbGFtZSIsIlN0YXIiLCJaYXAiLCJDcm93biIsImJhc2U0NCIsImZvcm1hdCIsImVhY2hEYXlPZkludGVydmFsIiwic3RhcnRPZldlZWsiLCJlbmRPZldlZWsiLCJzdWJEYXlzIiwicHQiLCJBQ0hJRVZFTUVOVFMiLCJrZXkiLCJpY29uIiwibGFiZWwiLCJkZXNjIiwidGhyZXNob2xkIiwiY29sb3IiLCJiZyIsIkhhYml0c1Jld2FyZHMiLCJfcyIsIm5hdmlnYXRlIiwiZW50cmllcyIsInNldEVudHJpZXMiLCJ0b3VjaFN0YXJ0IiwieCIsInkiLCJkcmFnT2Zmc2V0IiwiZHJhZ1N0eWxlIiwic2V0RHJhZ1N0eWxlIiwiZW50aXRpZXMiLCJIYWJpdEVudHJ5IiwibGlzdCIsInRoZW4iLCJjYXRjaCIsImFjdGl2ZURhdGVzIiwic2V0IiwiU2V0IiwiZm9yRWFjaCIsImUiLCJhZGQiLCJkYXRlIiwiY3VycmVudFN0cmVhayIsInN0cmVhayIsImQiLCJEYXRlIiwiaGFzIiwic2V0RGF0ZSIsImdldERhdGUiLCJsb25nZXN0U3RyZWFrIiwibG9uZ2VzdCIsImN1cnJlbnQiLCJ0b2RheSIsImkiLCJ3ZWVrU3RhcnQiLCJ3ZWVrU3RhcnRzT24iLCJ3ZWVrRW5kIiwid2Vla0RheXMiLCJzdGFydCIsImVuZCIsInRvZGF5U3RyIiwidG90YWxFbnRyaWVzIiwibGVuZ3RoIiwidG90YWxTY29yZSIsInJlZHVjZSIsInMiLCJzY29yZSIsImhhbmRsZVBvaW50ZXJTdGFydCIsImhhbmRsZVBvaW50ZXJNb3ZlIiwidHJhbnNmb3JtIiwidHJhbnNpdGlvbiIsImhhbmRsZVBvaW50ZXJFbmQiLCJ0b3VjaGVzIiwiY2xpZW50WCIsImNsaWVudFkiLCJjaGFuZ2VkVG91Y2hlcyIsImJ1dHRvbnMiLCJvcGFjaXR5IiwibWFwIiwiaXNBY3RpdmUiLCJpc1RvZGF5IiwibG9jYWxlIiwicmVwbGFjZSIsInZhbHVlIiwiYyIsImlkIiwiX2lkIiwiYSIsIl9fYXJySWR4X18iLCJ1bmxvY2tlZCIsIkljb24iLCJzcGxpdCIsIl9jIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIkhhYml0c1Jld2FyZHMuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlQ2FsbGJhY2ssIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZU5hdmlnYXRlIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcbmltcG9ydCB7IG1vdGlvbiB9IGZyb20gXCJmcmFtZXItbW90aW9uXCI7XG5pbXBvcnQgeyBBcnJvd0xlZnQsIEFycm93RG93biwgVHJvcGh5LCBGbGFtZSwgU3RhciwgWmFwLCBDcm93biB9IGZyb20gXCJsdWNpZGUtcmVhY3RcIjtcbmltcG9ydCB7IGJhc2U0NCB9IGZyb20gXCJAL2FwaS9iYXNlNDRDbGllbnRcIjtcbmltcG9ydCB7IGZvcm1hdCwgZWFjaERheU9mSW50ZXJ2YWwsIHN0YXJ0T2ZXZWVrLCBlbmRPZldlZWssIHN1YkRheXMgfSBmcm9tIFwiZGF0ZS1mbnNcIjtcbmltcG9ydCB7IHB0IH0gZnJvbSBcImRhdGUtZm5zL2xvY2FsZVwiO1xuXG5jb25zdCBBQ0hJRVZFTUVOVFMgPSBbXG57IGtleTogXCJmaXJzdFwiLCBpY29uOiBTdGFyLCBsYWJlbDogXCJQcmltZWlybyBQYXNzb1wiLCBkZXNjOiBcIkNvbXBsZXRhciBvIHByaW1laXJvIGjDoWJpdG9cIiwgdGhyZXNob2xkOiAxLCBjb2xvcjogXCJ0ZXh0LWFtYmVyLTUwMFwiLCBiZzogXCJiZy1hbWJlci01MFwiIH0sXG57IGtleTogXCJzdHJlYWtfM1wiLCBpY29uOiBGbGFtZSwgbGFiZWw6IFwiRW0gQ2hhbWFzXCIsIGRlc2M6IFwiMyBkaWFzIHNlZ3VpZG9zIGNvbSBow6FiaXRvc1wiLCB0aHJlc2hvbGQ6IDMsIGNvbG9yOiBcInRleHQtb3JhbmdlLTUwMFwiLCBiZzogXCJiZy1vcmFuZ2UtNTBcIiB9LFxueyBrZXk6IFwic3RyZWFrXzdcIiwgaWNvbjogWmFwLCBsYWJlbDogXCJGb2NvIFRvdGFsXCIsIGRlc2M6IFwiNyBkaWFzIHNlZ3VpZG9zIGNvbSBow6FiaXRvc1wiLCB0aHJlc2hvbGQ6IDcsIGNvbG9yOiBcInRleHQtaW5kaWdvLTUwMFwiLCBiZzogXCJiZy1pbmRpZ28tNTBcIiB9LFxueyBrZXk6IFwic3RyZWFrXzE0XCIsIGljb246IENyb3duLCBsYWJlbDogXCJEaXNjaXBsaW5hIFJlYWxcIiwgZGVzYzogXCIxNCBkaWFzIHNlZ3VpZG9zXCIsIHRocmVzaG9sZDogMTQsIGNvbG9yOiBcInRleHQtcHVycGxlLTUwMFwiLCBiZzogXCJiZy1wdXJwbGUtNTBcIiB9LFxueyBrZXk6IFwic3RyZWFrXzMwXCIsIGljb246IFRyb3BoeSwgbGFiZWw6IFwiTGVuZGEgZGEgUm90aW5hXCIsIGRlc2M6IFwiMzAgZGlhcyBzZWd1aWRvc1wiLCB0aHJlc2hvbGQ6IDMwLCBjb2xvcjogXCJ0ZXh0LXJvc2UtNTAwXCIsIGJnOiBcImJnLXJvc2UtNTBcIiB9XTtcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIYWJpdHNSZXdhcmRzKCkge1xuICBjb25zdCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XG4gIGNvbnN0IFtlbnRyaWVzLCBzZXRFbnRyaWVzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgdG91Y2hTdGFydCA9IHVzZVJlZih7IHg6IDAsIHk6IDAgfSk7XG4gIGNvbnN0IGRyYWdPZmZzZXQgPSB1c2VSZWYoeyB4OiAwLCB5OiAwIH0pO1xuICBjb25zdCBbZHJhZ1N0eWxlLCBzZXREcmFnU3R5bGVdID0gdXNlU3RhdGUoe30pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgYmFzZTQ0LmVudGl0aWVzLkhhYml0RW50cnkubGlzdChcIi1jcmVhdGVkX2RhdGVcIiwgNTAwKS50aGVuKHNldEVudHJpZXMpLmNhdGNoKCgpID0+IHNldEVudHJpZXMoW10pKTtcbiAgfSwgW10pO1xuXG4gIC8vIEdldCB1bmlxdWUgZGF0ZXMgd2l0aCBlbnRyaWVzXG4gIGNvbnN0IGFjdGl2ZURhdGVzID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3Qgc2V0ID0gbmV3IFNldCgpO1xuICAgIGVudHJpZXMuZm9yRWFjaCgoZSkgPT4gc2V0LmFkZChlLmRhdGUpKTtcbiAgICByZXR1cm4gc2V0O1xuICB9LCBbZW50cmllc10pO1xuXG4gIC8vIENhbGN1bGF0ZSBjdXJyZW50IHN0cmVha1xuICBjb25zdCBjdXJyZW50U3RyZWFrID0gdXNlTWVtbygoKSA9PiB7XG4gICAgbGV0IHN0cmVhayA9IDA7XG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKCk7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGNvbnN0IGtleSA9IGZvcm1hdChkLCBcInl5eXktTU0tZGRcIik7XG4gICAgICBpZiAoIWFjdGl2ZURhdGVzLmhhcyhrZXkpKSBicmVhaztcbiAgICAgIHN0cmVhaysrO1xuICAgICAgZC5zZXREYXRlKGQuZ2V0RGF0ZSgpIC0gMSk7XG4gICAgfVxuICAgIHJldHVybiBzdHJlYWs7XG4gIH0sIFthY3RpdmVEYXRlc10pO1xuXG4gIC8vIExvbmdlc3Qgc3RyZWFrXG4gIGNvbnN0IGxvbmdlc3RTdHJlYWsgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBsZXQgbG9uZ2VzdCA9IDA7XG4gICAgbGV0IGN1cnJlbnQgPSAwO1xuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAvLyBMb29rIGJhY2sgMzY1IGRheXNcbiAgICBmb3IgKGxldCBpID0gMzY1OyBpID49IDA7IGktLSkge1xuICAgICAgY29uc3QgZCA9IHN1YkRheXModG9kYXksIGkpO1xuICAgICAgY29uc3Qga2V5ID0gZm9ybWF0KGQsIFwieXl5eS1NTS1kZFwiKTtcbiAgICAgIGlmIChhY3RpdmVEYXRlcy5oYXMoa2V5KSkge1xuICAgICAgICBjdXJyZW50Kys7XG4gICAgICAgIGlmIChjdXJyZW50ID4gbG9uZ2VzdCkgbG9uZ2VzdCA9IGN1cnJlbnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXJyZW50ID0gMDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxvbmdlc3Q7XG4gIH0sIFthY3RpdmVEYXRlc10pO1xuXG4gIC8vIFRoaXMgd2VlaydzIGRheXMgY29sb3JlZFxuICBjb25zdCB3ZWVrU3RhcnQgPSBzdGFydE9mV2VlayhuZXcgRGF0ZSgpLCB7IHdlZWtTdGFydHNPbjogMSB9KTtcbiAgY29uc3Qgd2Vla0VuZCA9IGVuZE9mV2VlayhuZXcgRGF0ZSgpLCB7IHdlZWtTdGFydHNPbjogMSB9KTtcbiAgY29uc3Qgd2Vla0RheXMgPSBlYWNoRGF5T2ZJbnRlcnZhbCh7IHN0YXJ0OiB3ZWVrU3RhcnQsIGVuZDogd2Vla0VuZCB9KTtcbiAgY29uc3QgdG9kYXlTdHIgPSBmb3JtYXQobmV3IERhdGUoKSwgXCJ5eXl5LU1NLWRkXCIpO1xuXG4gIGNvbnN0IHRvdGFsRW50cmllcyA9IGVudHJpZXMubGVuZ3RoO1xuICBjb25zdCB0b3RhbFNjb3JlID0gZW50cmllcy5yZWR1Y2UoKHMsIGUpID0+IHMgKyAoZS5zY29yZSB8fCAwKSwgMCk7XG5cbiAgLy8gU3dpcGVcbiAgY29uc3QgaGFuZGxlUG9pbnRlclN0YXJ0ID0gdXNlQ2FsbGJhY2soKHgsIHkpID0+IHt0b3VjaFN0YXJ0LmN1cnJlbnQgPSB7IHgsIHkgfTtkcmFnT2Zmc2V0LmN1cnJlbnQgPSB7IHg6IDAsIHk6IDAgfTtzZXREcmFnU3R5bGUoe30pO30sIFtdKTtcbiAgY29uc3QgaGFuZGxlUG9pbnRlck1vdmUgPSB1c2VDYWxsYmFjaygoeCwgeSkgPT4ge1xuICAgIGRyYWdPZmZzZXQuY3VycmVudCA9IHsgeDogeCAtIHRvdWNoU3RhcnQuY3VycmVudC54LCB5OiB5IC0gdG91Y2hTdGFydC5jdXJyZW50LnkgfTtcbiAgICBzZXREcmFnU3R5bGUoeyB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoJHtkcmFnT2Zmc2V0LmN1cnJlbnQueH1weCwgJHtkcmFnT2Zmc2V0LmN1cnJlbnQueX1weClgLCB0cmFuc2l0aW9uOiBcIm5vbmVcIiB9KTtcbiAgfSwgW10pO1xuICBjb25zdCBoYW5kbGVQb2ludGVyRW5kID0gdXNlQ2FsbGJhY2soKHgsIHkpID0+IHtcbiAgICBzZXREcmFnU3R5bGUoeyB0cmFuc2Zvcm06IFwidHJhbnNsYXRlKDAsIDApXCIsIHRyYW5zaXRpb246IFwidHJhbnNmb3JtIDAuM3MgZWFzZS1vdXRcIiB9KTtcbiAgICBpZiAoeSAtIHRvdWNoU3RhcnQuY3VycmVudC55ID4gNjApIG5hdmlnYXRlKFwiL2hhYml0c1wiKTtcbiAgfSwgW25hdmlnYXRlXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzUmV3YXJkczo4ODo0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctY3JlYW0gZmxleCBmbGV4LWNvbCBzZWxlY3Qtbm9uZVwiXG4gICAgb25Ub3VjaFN0YXJ0PXsoZSkgPT4gaGFuZGxlUG9pbnRlclN0YXJ0KGUudG91Y2hlc1swXS5jbGllbnRYLCBlLnRvdWNoZXNbMF0uY2xpZW50WSl9XG4gICAgb25Ub3VjaE1vdmU9eyhlKSA9PiBoYW5kbGVQb2ludGVyTW92ZShlLnRvdWNoZXNbMF0uY2xpZW50WCwgZS50b3VjaGVzWzBdLmNsaWVudFkpfVxuICAgIG9uVG91Y2hFbmQ9eyhlKSA9PiBoYW5kbGVQb2ludGVyRW5kKGUuY2hhbmdlZFRvdWNoZXNbMF0/LmNsaWVudFggfHwgdG91Y2hTdGFydC5jdXJyZW50LngsIGUuY2hhbmdlZFRvdWNoZXNbMF0/LmNsaWVudFkgfHwgdG91Y2hTdGFydC5jdXJyZW50LnkpfVxuICAgIG9uTW91c2VEb3duPXsoZSkgPT4gaGFuZGxlUG9pbnRlclN0YXJ0KGUuY2xpZW50WCwgZS5jbGllbnRZKX1cbiAgICBvbk1vdXNlTW92ZT17KGUpID0+IHtpZiAoZS5idXR0b25zID09PSAxKSBoYW5kbGVQb2ludGVyTW92ZShlLmNsaWVudFgsIGUuY2xpZW50WSk7fX1cbiAgICBvbk1vdXNlVXA9eyhlKSA9PiBoYW5kbGVQb2ludGVyRW5kKGUuY2xpZW50WCwgZS5jbGllbnRZKX0+XG4gICAgICBcbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNSZXdhcmRzOjk3OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBzdHlsZT17ZHJhZ1N0eWxlfSBjbGFzc05hbWU9XCJmbGV4LTEgZmxleCBmbGV4LWNvbFwiPlxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzUmV3YXJkczo5ODo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiYmctd2hpdGUgYm9yZGVyLWIgYm9yZGVyLWJvcmRlciBweC00IHB5LTQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzUmV3YXJkczo5OToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKFwiL2hhYml0c1wiKX0gY2xhc3NOYW1lPVwidy0xMCBoLTEwIHJvdW5kZWQtMnhsIGJnLXdoaXRlIGJvcmRlciBib3JkZXItYm9yZGVyIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBob3Zlcjp0ZXh0LWZvcmVncm91bmQgdHJhbnNpdGlvbi1hbGxcIj5cbiAgICAgICAgICAgIDxBcnJvd0xlZnQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNSZXdhcmRzOjEwMDoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzUmV3YXJkczoxMDI6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCI+XG4gICAgICAgICAgICA8aDEgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNSZXdhcmRzOjEwMzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LWZvcmVncm91bmRcIj5Db25xdWlzdGFzPC9oMT5cbiAgICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzUmV3YXJkczoxMDQ6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgIFN3aXBlIGJhaXhvIDxBcnJvd0Rvd24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNSZXdhcmRzOjEwNToyNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz4gdm9sdGFyXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNSZXdhcmRzOjExMDo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleC0xIG92ZXJmbG93LWF1dG8gcC00IHNwYWNlLXktNFwiPlxuICAgICAgICAgIHsvKiBTdHJlYWsgaGlnaGxpZ2h0ICovfVxuICAgICAgICAgIHtjdXJyZW50U3RyZWFrID4gMCAmJlxuICAgICAgICAgIDxtb3Rpb24uZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzUmV3YXJkczoxMTM6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHk6IC0xMCB9fSBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHk6IDAgfX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1iciBmcm9tLWFtYmVyLTEwMCB0by1vcmFuZ2UtMTAwIHJvdW5kZWQtMnhsIHAtNSBib3JkZXIgYm9yZGVyLWFtYmVyLTIwMCBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c1Jld2FyZHM6MTE1OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgbWItM1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNSZXdhcmRzOjExNjoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTE0IGgtMTQgcm91bmRlZC0yeGwgYmctd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC0zeGwgc2hhZG93LXNtXCI+8J+UpTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNSZXdhcmRzOjExNzoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNSZXdhcmRzOjExODoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYm9sZCB0ZXh0LWFtYmVyLTgwMFwiPlNlcXXDqm5jaWEgYXR1YWw8L3A+XG4gICAgICAgICAgICAgICAgICA8cCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c1Jld2FyZHM6MTE5OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC0zeGwgZm9udC1ibGFjayB0ZXh0LWFtYmVyLTYwMFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiY3VycmVudFN0cmVha1wiPntjdXJyZW50U3RyZWFrfTwvcD5cbiAgICAgICAgICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzUmV3YXJkczoxMjA6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtYW1iZXItNjAwLzcwXCI+ZGlhe2N1cnJlbnRTdHJlYWsgIT09IDEgPyBcInNcIiA6IFwiXCJ9IGNvbnNlY3V0aXZve2N1cnJlbnRTdHJlYWsgIT09IDEgPyBcInNcIiA6IFwiXCJ9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgey8qIFdlZWsgZG90cyAqL31cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c1Jld2FyZHM6MTI0OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBnYXAtMiBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIHt3ZWVrRGF5cy5tYXAoKGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBmb3JtYXQoZCwgXCJ5eXl5LU1NLWRkXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gYWN0aXZlRGF0ZXMuaGFzKGtleSk7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNUb2RheSA9IGtleSA9PT0gdG9kYXlTdHI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNSZXdhcmRzOjEzMDoyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17aX0gY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzUmV3YXJkczoxMzE6MjJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9e2B3LTkgaC05IHJvdW5kZWQteGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC14cyBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPyBcImJnLWFtYmVyLTUwMCB0ZXh0LXdoaXRlIHNoYWRvdy1tZFwiIDogXCJiZy1zbGF0ZS0yMDAgdGV4dC1zbGF0ZS00MDBcIn0gJHtcbiAgICAgICAgICAgICAgICAgICAgaXNUb2RheSA/IFwicmluZy0yIHJpbmctYW1iZXItMzAwIHJpbmctb2Zmc2V0LTFcIiA6IFwiXCJ9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Zm9ybWF0KGQsIFwiZFwiKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c1Jld2FyZHM6MTM2OjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj57Zm9ybWF0KGQsIFwiRUVFXCIsIHsgbG9jYWxlOiBwdCB9KS5yZXBsYWNlKFwiLlwiLCBcIlwiKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2Pik7XG5cbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgIH1cblxuICAgICAgICAgIHsvKiBTdGF0cyAqL31cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzUmV3YXJkczoxNDU6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0zXCI+XG4gICAgICAgICAgICB7W1xuICAgICAgICAgICAgeyBpY29uOiBUcm9waHksIGxhYmVsOiBcIlJlY29yZGVcIiwgdmFsdWU6IGAke2xvbmdlc3RTdHJlYWt9IGRpYXNgLCBjb2xvcjogXCJ0ZXh0LWFtYmVyLTYwMFwiLCBiZzogXCJiZy1hbWJlci01MFwiIH0sXG4gICAgICAgICAgICB7IGljb246IFN0YXIsIGxhYmVsOiBcIlRvdGFsIGHDp8O1ZXNcIiwgdmFsdWU6IHRvdGFsRW50cmllcywgY29sb3I6IFwidGV4dC1lbWVyYWxkLTYwMFwiLCBiZzogXCJiZy1lbWVyYWxkLTUwXCIgfV0uXG4gICAgICAgICAgICBtYXAoKGMsIGkpID0+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzUmV3YXJkczoxNTA6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBrZXk9e2l9IGNsYXNzTmFtZT17YCR7Yy5iZ30gcm91bmRlZC0yeGwgcC00IGJvcmRlciBib3JkZXItYm9yZGVyLzUwYH0+XG4gICAgICAgICAgICAgICAgPGMuaWNvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c1Jld2FyZHM6MTUxOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPXtgdy01IGgtNSAke2MuY29sb3J9IG1iLTFgfSAvPlxuICAgICAgICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzUmV3YXJkczoxNTI6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYm9sZCB0ZXh0LWZvcmVncm91bmRcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cInZhbHVlXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2M/LmlkIHx8IGM/Ll9pZH0+e2MudmFsdWV9PC9wPlxuICAgICAgICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzUmV3YXJkczoxNTM6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LW11dGVkLWZvcmVncm91bmRcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImxhYmVsXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2M/LmlkIHx8IGM/Ll9pZH0+e2MubGFiZWx9PC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogQWNoaWV2ZW1lbnRzICovfVxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNSZXdhcmRzOjE1OToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiPlxuICAgICAgICAgICAgPGgzIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzUmV3YXJkczoxNjA6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC1mb3JlZ3JvdW5kIG1iLTMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPENyb3duIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzUmV3YXJkczoxNjE6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWFtYmVyLTUwMFwiIC8+IENvbnF1aXN0YXNcbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzUmV3YXJkczoxNjM6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAge0FDSElFVkVNRU5UUy5tYXAoKGEsIF9fYXJySWR4X18pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB1bmxvY2tlZCA9IGN1cnJlbnRTdHJlYWsgPj0gYS50aHJlc2hvbGQgfHwgbG9uZ2VzdFN0cmVhayA+PSBhLnRocmVzaG9sZDtcbiAgICAgICAgICAgICAgICBjb25zdCBJY29uID0gYS5pY29uO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzUmV3YXJkczoxNjg6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBrZXk9e2Eua2V5fSBjbGFzc05hbWU9e2Byb3VuZGVkLTJ4bCBwLTQgYm9yZGVyIHRyYW5zaXRpb24tYWxsICR7dW5sb2NrZWQgPyBgJHthLmJnfSBib3JkZXItJHthLmNvbG9yLnNwbGl0KFwiLVwiKVsxXX0tMjAwYCA6IFwiYmctc2xhdGUtMTAwIGJvcmRlci1zbGF0ZS0yMDAgb3BhY2l0eS02MFwifWB9IGRhdGEtYXJyLWluZGV4PXtfX2FycklkeF9ffSBkYXRhLWFyci12YXJpYWJsZS1uYW1lPVwiQUNISUVWRU1FTlRTXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNSZXdhcmRzOjE2OToyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCIgZGF0YS1hcnItaW5kZXg9e19fYXJySWR4X199IGRhdGEtYXJyLXZhcmlhYmxlLW5hbWU9XCJBQ0hJRVZFTUVOVFNcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzUmV3YXJkczoxNzA6MjJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9e2B3LTExIGgtMTEgcm91bmRlZC14bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciAke3VubG9ja2VkID8gXCJiZy13aGl0ZSBzaGFkb3ctc21cIiA6IFwiYmctc2xhdGUtMjAwXCJ9YH0gZGF0YS1hcnItaW5kZXg9e19fYXJySWR4X199IGRhdGEtYXJyLXZhcmlhYmxlLW5hbWU9XCJBQ0hJRVZFTUVOVFNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzUmV3YXJkczoxNzE6MjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9e2B3LTUgaC01ICR7dW5sb2NrZWQgPyBhLmNvbG9yIDogXCJ0ZXh0LXNsYXRlLTQwMFwifWB9IGRhdGEtYXJyLWluZGV4PXtfX2FycklkeF9ffSBkYXRhLWFyci12YXJpYWJsZS1uYW1lPVwiQUNISUVWRU1FTlRTXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzUmV3YXJkczoxNzM6MjJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBkYXRhLWFyci1pbmRleD17X19hcnJJZHhfX30gZGF0YS1hcnItdmFyaWFibGUtbmFtZT1cIkFDSElFVkVNRU5UU1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNSZXdhcmRzOjE3NDoyNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT17YHRleHQtc20gZm9udC1ib2xkICR7dW5sb2NrZWQgPyBcInRleHQtZm9yZWdyb3VuZFwiIDogXCJ0ZXh0LXNsYXRlLTUwMFwifWB9IGRhdGEtYXJyLWluZGV4PXtfX2FycklkeF9ffSBkYXRhLWFyci12YXJpYWJsZS1uYW1lPVwiQUNISUVWRU1FTlRTXCIgZGF0YS1hcnItZmllbGQ9XCJsYWJlbFwiPnthLmxhYmVsfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzUmV3YXJkczoxNzU6MjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LW11dGVkLWZvcmVncm91bmRcIiBkYXRhLWFyci1pbmRleD17X19hcnJJZHhfX30gZGF0YS1hcnItdmFyaWFibGUtbmFtZT1cIkFDSElFVkVNRU5UU1wiIGRhdGEtYXJyLWZpZWxkPVwiZGVzY1wiPnthLmRlc2N9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNSZXdhcmRzOjE3NzoyMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cIm1sLWF1dG9cIiBkYXRhLWFyci1pbmRleD17X19hcnJJZHhfX30gZGF0YS1hcnItdmFyaWFibGUtbmFtZT1cIkFDSElFVkVNRU5UU1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3VubG9ja2VkID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNSZXdhcmRzOjE3OToyNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTcgaC03IHJvdW5kZWQtZnVsbCBiZy13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiIGRhdGEtYXJyLWluZGV4PXtfX2FycklkeF9ffSBkYXRhLWFyci12YXJpYWJsZS1uYW1lPVwiQUNISUVWRU1FTlRTXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRyb3BoeSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c1Jld2FyZHM6MTgwOjI4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1hbWJlci01MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzUmV3YXJkczoxODM6MjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ3LTcgaC03IHJvdW5kZWQtZnVsbCBiZy1zbGF0ZS0yMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1bMTBweF0gZm9udC1ib2xkIHRleHQtc2xhdGUtNDAwXCIgZGF0YS1hcnItaW5kZXg9e19fYXJySWR4X199IGRhdGEtYXJyLXZhcmlhYmxlLW5hbWU9XCJBQ0hJRVZFTUVOVFNcIiBkYXRhLWFyci1maWVsZD1cInRocmVzaG9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthLnRocmVzaG9sZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+KTtcblxuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2Pik7XG5cbn0iXSwiZmlsZSI6Ii9hcHAvc3JjL3BhZ2VzL0hhYml0c1Jld2FyZHMuanN4In0=