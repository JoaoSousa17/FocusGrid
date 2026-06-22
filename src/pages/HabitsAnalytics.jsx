import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/HabitsAnalytics.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/pages/HabitsAnalytics.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=fc940917"; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"]; const useMemo = __vite__cjsImport3_react["useMemo"]; const useRef = __vite__cjsImport3_react["useRef"]; const useCallback = __vite__cjsImport3_react["useCallback"];
import { useNavigate } from "/node_modules/.vite/deps/react-router-dom.js?v=8a08d97a";
import { motion } from "/node_modules/.vite/deps/framer-motion.js?v=fc940917";
import { ArrowLeft, Trophy, TrendingUp, Star, Medal, BarChart3 } from "/node_modules/.vite/deps/lucide-react.js?v=aefa7968";
import { base44 } from "/src/api/base44Client.js";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "/node_modules/.vite/deps/recharts.js?v=e48649fe";
import { format, startOfWeek, endOfWeek, subWeeks, eachDayOfInterval, isWithinInterval } from "/node_modules/.vite/deps/date-fns.js?v=a1580542";
import { pt } from "/node_modules/.vite/deps/date-fns_locale.js?v=45b313c9";
const PRESET_COLORS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#F43F5E", "#14B8A6", "#6366F1", "#EC4899"];
export default function HabitsAnalytics() {
  _s();
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [habits, setHabits] = useState([]);
  const touchStart = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const [dragStyle, setDragStyle] = useState({});
  useEffect(() => {
    base44.entities.HabitEntry.list("-created_date", 500).then(setEntries).catch(() => setEntries([]));
    base44.entities.Habit.list().then(setHabits).catch(() => setHabits([]));
  }, []);
  const today = /* @__PURE__ */ new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const dailyScores = useMemo(() => {
    return weekDays.map((d) => {
      const key = format(d, "yyyy-MM-dd");
      const dayEntries = entries.filter((e) => e.date === key);
      return {
        day: format(d, "EEE", { locale: pt }),
        date: format(d, "d"),
        score: dayEntries.reduce((s, e) => s + (e.score || 0), 0),
        count: dayEntries.length
      };
    });
  }, [entries, weekDays]);
  const habitStats = useMemo(() => {
    const map = {};
    entries.forEach((e) => {
      if (!map[e.habit_id]) map[e.habit_id] = { name: e.habit_name, count: 0, score: 0 };
      map[e.habit_id].count++;
      map[e.habit_id].score += e.score || 0;
    });
    habits.forEach((h) => {
      if (!map[h.id]) map[h.id] = { name: h.name, count: 0, score: 0 };
    });
    return Object.values(map).sort((a, b) => b.count - a.count);
  }, [entries, habits]);
  const weeklyTrend = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => {
      const ws = startOfWeek(subWeeks(today, 3 - i), { weekStartsOn: 1 });
      const we = endOfWeek(subWeeks(today, 3 - i), { weekStartsOn: 1 });
      const weekEntries = entries.filter((e) => isWithinInterval(new Date(e.date), { start: ws, end: we }));
      return {
        week: `Sem ${i + 1}`,
        score: weekEntries.reduce((s, e) => s + (e.score || 0), 0),
        count: weekEntries.length
      };
    });
  }, [entries, today]);
  const sortedByCount = [...habitStats].sort((a, b) => b.count - a.count);
  const mostDone = sortedByCount.slice(0, 3);
  const leastDone = sortedByCount.filter((h) => h.count === 0).length > 0 ? sortedByCount.filter((h) => h.count === 0).slice(0, 3) : sortedByCount.slice(-3).reverse();
  const totalScore = entries.reduce((s, e) => s + (e.score || 0), 0);
  const totalCompletions = entries.length;
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
    if (x - touchStart.current.x < -60) navigate("/habits");
  }, [navigate]);
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      "data-source-location": "pages/HabitsAnalytics:95:4",
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
      children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsAnalytics:104:6", "data-dynamic-content": "true", style: dragStyle, className: "flex-1 flex flex-col", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsAnalytics:105:8", "data-dynamic-content": "true", className: "bg-white border-b border-border px-4 py-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/HabitsAnalytics:106:10", "data-dynamic-content": "true", onClick: () => navigate("/habits"), className: "w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all", children: /* @__PURE__ */ jsxDEV(ArrowLeft, { "data-source-location": "pages/HabitsAnalytics:107:12", "data-dynamic-content": "false", className: "w-5 h-5" }, void 0, false, {
            fileName: "/app/src/pages/HabitsAnalytics.jsx",
            lineNumber: 126,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "/app/src/pages/HabitsAnalytics.jsx",
            lineNumber: 125,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsAnalytics:109:10", "data-dynamic-content": "false", children: [
            /* @__PURE__ */ jsxDEV("h1", { "data-source-location": "pages/HabitsAnalytics:110:12", "data-dynamic-content": "false", className: "text-xl font-bold text-foreground", children: "Analytics" }, void 0, false, {
              fileName: "/app/src/pages/HabitsAnalytics.jsx",
              lineNumber: 129,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/HabitsAnalytics:111:12", "data-dynamic-content": "false", className: "text-[10px] text-muted-foreground", children: "Hábitos saudáveis" }, void 0, false, {
              fileName: "/app/src/pages/HabitsAnalytics.jsx",
              lineNumber: 130,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/HabitsAnalytics.jsx",
            lineNumber: 128,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/HabitsAnalytics.jsx",
          lineNumber: 124,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsAnalytics:115:8", "data-dynamic-content": "true", className: "flex-1 overflow-auto p-4 space-y-4", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsAnalytics:117:10", "data-dynamic-content": "true", className: "grid grid-cols-3 gap-3", children: [
            { icon: Trophy, label: "Total", value: totalScore, unit: "pts", color: "text-amber-600", bg: "bg-amber-50" },
            { icon: TrendingUp, label: "Feitos", value: totalCompletions, unit: "ações", color: "text-emerald-600", bg: "bg-emerald-50" },
            { icon: Medal, label: "Média/dia", value: totalCompletions > 0 ? Math.round(totalScore / totalCompletions) : 0, unit: "pts", color: "text-indigo-600", bg: "bg-indigo-50" }
          ].map(
            (card, i) => /* @__PURE__ */ jsxDEV(
              motion.div,
              {
                "data-source-location": "pages/HabitsAnalytics:123:14",
                "data-dynamic-content": "true",
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: i * 0.05 },
                className: `${card.bg} rounded-2xl p-3 border border-border/50`,
                children: [
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsAnalytics:125:16", "data-dynamic-content": "true", className: "flex items-center gap-2 mb-1", children: [
                    /* @__PURE__ */ jsxDEV(card.icon, { "data-source-location": "pages/HabitsAnalytics:126:18", "data-dynamic-content": "true", className: `w-4 h-4 ${card.color}` }, void 0, false, {
                      fileName: "/app/src/pages/HabitsAnalytics.jsx",
                      lineNumber: 145,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/HabitsAnalytics:127:18", "data-dynamic-content": "true", className: "text-[10px] text-muted-foreground", "data-collection-item-field": "label", "data-collection-item-id": card?.id || card?._id, children: card.label }, void 0, false, {
                      fileName: "/app/src/pages/HabitsAnalytics.jsx",
                      lineNumber: 146,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/HabitsAnalytics.jsx",
                    lineNumber: 144,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/HabitsAnalytics:129:16", "data-dynamic-content": "true", className: `text-xl font-bold ${card.color}`, "data-collection-item-field": "value", "data-collection-item-id": card?.id || card?._id, children: card.value }, void 0, false, {
                    fileName: "/app/src/pages/HabitsAnalytics.jsx",
                    lineNumber: 148,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/HabitsAnalytics:130:16", "data-dynamic-content": "true", className: "text-[9px] text-muted-foreground", "data-collection-item-field": "unit", "data-collection-item-id": card?.id || card?._id, children: card.unit }, void 0, false, {
                    fileName: "/app/src/pages/HabitsAnalytics.jsx",
                    lineNumber: 149,
                    columnNumber: 17
                  }, this)
                ]
              },
              i,
              true,
              {
                fileName: "/app/src/pages/HabitsAnalytics.jsx",
                lineNumber: 142,
                columnNumber: 13
              },
              this
            )
          ) }, void 0, false, {
            fileName: "/app/src/pages/HabitsAnalytics.jsx",
            lineNumber: 136,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsAnalytics:136:10", "data-dynamic-content": "true", className: "bg-white rounded-2xl p-5 border border-border", children: [
            /* @__PURE__ */ jsxDEV("h3", { "data-source-location": "pages/HabitsAnalytics:137:12", "data-dynamic-content": "false", className: "text-sm font-bold text-foreground flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxDEV(BarChart3, { "data-source-location": "pages/HabitsAnalytics:138:14", "data-dynamic-content": "false", className: "w-4 h-4 text-[#E87A5A]" }, void 0, false, {
                fileName: "/app/src/pages/HabitsAnalytics.jsx",
                lineNumber: 157,
                columnNumber: 15
              }, this),
              " Pontuação Semanal"
            ] }, void 0, true, {
              fileName: "/app/src/pages/HabitsAnalytics.jsx",
              lineNumber: 156,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsAnalytics:140:12", "data-dynamic-content": "true", className: "h-[180px]", children: /* @__PURE__ */ jsxDEV(ResponsiveContainer, { "data-source-location": "pages/HabitsAnalytics:141:14", "data-dynamic-content": "true", width: "100%", height: "100%", children: /* @__PURE__ */ jsxDEV(BarChart, { "data-source-location": "pages/HabitsAnalytics:142:16", "data-dynamic-content": "true", data: dailyScores, margin: { top: 5, right: 5, left: -20, bottom: 0 }, children: [
              /* @__PURE__ */ jsxDEV(CartesianGrid, { "data-source-location": "pages/HabitsAnalytics:143:18", "data-dynamic-content": "false", strokeDasharray: "3 3", stroke: "#F0EBE3" }, void 0, false, {
                fileName: "/app/src/pages/HabitsAnalytics.jsx",
                lineNumber: 162,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(XAxis, { "data-source-location": "pages/HabitsAnalytics:144:18", "data-dynamic-content": "true", dataKey: "day", tick: { fontSize: 10, fill: "#9CA3AF" }, axisLine: false, tickLine: false }, void 0, false, {
                fileName: "/app/src/pages/HabitsAnalytics.jsx",
                lineNumber: 163,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(YAxis, { "data-source-location": "pages/HabitsAnalytics:145:18", "data-dynamic-content": "true", tick: { fontSize: 10, fill: "#9CA3AF" }, axisLine: false, tickLine: false }, void 0, false, {
                fileName: "/app/src/pages/HabitsAnalytics.jsx",
                lineNumber: 164,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                Tooltip,
                {
                  "data-source-location": "pages/HabitsAnalytics:146:18",
                  "data-dynamic-content": "true",
                  contentStyle: { borderRadius: 12, border: "1px solid #E8E0D8", background: "#fff", fontSize: 12 },
                  formatter: (value) => [`${value} pts`, "Pontuação"]
                },
                void 0,
                false,
                {
                  fileName: "/app/src/pages/HabitsAnalytics.jsx",
                  lineNumber: 165,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(Bar, { "data-source-location": "pages/HabitsAnalytics:148:18", "data-dynamic-content": "true", dataKey: "score", radius: [8, 8, 0, 0], fill: "#E87A5A", maxBarSize: 36 }, void 0, false, {
                fileName: "/app/src/pages/HabitsAnalytics.jsx",
                lineNumber: 167,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/HabitsAnalytics.jsx",
              lineNumber: 161,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/HabitsAnalytics.jsx",
              lineNumber: 160,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/HabitsAnalytics.jsx",
              lineNumber: 159,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/HabitsAnalytics.jsx",
            lineNumber: 155,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsAnalytics:155:10", "data-dynamic-content": "true", className: "bg-white rounded-2xl p-5 border border-border", children: [
            /* @__PURE__ */ jsxDEV("h3", { "data-source-location": "pages/HabitsAnalytics:156:12", "data-dynamic-content": "false", className: "text-sm font-bold text-foreground flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxDEV(TrendingUp, { "data-source-location": "pages/HabitsAnalytics:157:14", "data-dynamic-content": "false", className: "w-4 h-4 text-purple-500" }, void 0, false, {
                fileName: "/app/src/pages/HabitsAnalytics.jsx",
                lineNumber: 176,
                columnNumber: 15
              }, this),
              " Tendência Mensal"
            ] }, void 0, true, {
              fileName: "/app/src/pages/HabitsAnalytics.jsx",
              lineNumber: 175,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsAnalytics:159:12", "data-dynamic-content": "true", className: "h-[140px]", children: /* @__PURE__ */ jsxDEV(ResponsiveContainer, { "data-source-location": "pages/HabitsAnalytics:160:14", "data-dynamic-content": "true", width: "100%", height: "100%", children: /* @__PURE__ */ jsxDEV(LineChart, { "data-source-location": "pages/HabitsAnalytics:161:16", "data-dynamic-content": "true", data: weeklyTrend, margin: { top: 5, right: 5, left: -20, bottom: 0 }, children: [
              /* @__PURE__ */ jsxDEV(CartesianGrid, { "data-source-location": "pages/HabitsAnalytics:162:18", "data-dynamic-content": "false", strokeDasharray: "3 3", stroke: "#F0EBE3" }, void 0, false, {
                fileName: "/app/src/pages/HabitsAnalytics.jsx",
                lineNumber: 181,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(XAxis, { "data-source-location": "pages/HabitsAnalytics:163:18", "data-dynamic-content": "true", dataKey: "week", tick: { fontSize: 10, fill: "#9CA3AF" }, axisLine: false, tickLine: false }, void 0, false, {
                fileName: "/app/src/pages/HabitsAnalytics.jsx",
                lineNumber: 182,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(YAxis, { "data-source-location": "pages/HabitsAnalytics:164:18", "data-dynamic-content": "true", tick: { fontSize: 10, fill: "#9CA3AF" }, axisLine: false, tickLine: false }, void 0, false, {
                fileName: "/app/src/pages/HabitsAnalytics.jsx",
                lineNumber: 183,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                Tooltip,
                {
                  "data-source-location": "pages/HabitsAnalytics:165:18",
                  "data-dynamic-content": "true",
                  contentStyle: { borderRadius: 12, border: "1px solid #E8E0D8", background: "#fff", fontSize: 12 },
                  formatter: (value) => [`${value} pts`, "Total"]
                },
                void 0,
                false,
                {
                  fileName: "/app/src/pages/HabitsAnalytics.jsx",
                  lineNumber: 184,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(Line, { "data-source-location": "pages/HabitsAnalytics:167:18", "data-dynamic-content": "true", type: "monotone", dataKey: "score", stroke: "#8B5CF6", strokeWidth: 2, dot: { fill: "#8B5CF6", r: 4 } }, void 0, false, {
                fileName: "/app/src/pages/HabitsAnalytics.jsx",
                lineNumber: 186,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/HabitsAnalytics.jsx",
              lineNumber: 180,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/HabitsAnalytics.jsx",
              lineNumber: 179,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/HabitsAnalytics.jsx",
              lineNumber: 178,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/HabitsAnalytics.jsx",
            lineNumber: 174,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsAnalytics:174:10", "data-dynamic-content": "true", className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsAnalytics:175:12", "data-dynamic-content": "true", className: "bg-white rounded-2xl p-4 border border-border", children: [
              /* @__PURE__ */ jsxDEV("h3", { "data-source-location": "pages/HabitsAnalytics:176:14", "data-dynamic-content": "false", className: "text-xs font-bold text-foreground mb-3 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDEV(Trophy, { "data-source-location": "pages/HabitsAnalytics:177:16", "data-dynamic-content": "false", className: "w-3.5 h-3.5 text-amber-500" }, void 0, false, {
                  fileName: "/app/src/pages/HabitsAnalytics.jsx",
                  lineNumber: 196,
                  columnNumber: 17
                }, this),
                " Mais feitos"
              ] }, void 0, true, {
                fileName: "/app/src/pages/HabitsAnalytics.jsx",
                lineNumber: 195,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsAnalytics:179:14", "data-dynamic-content": "true", className: "space-y-2", children: [
                mostDone.filter((h) => h.count > 0).length === 0 && /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/HabitsAnalytics:180:67", "data-dynamic-content": "false", className: "text-[10px] text-muted-foreground", children: "Sem dados" }, void 0, false, {
                  fileName: "/app/src/pages/HabitsAnalytics.jsx",
                  lineNumber: 199,
                  columnNumber: 70
                }, this),
                mostDone.filter((h) => h.count > 0).map(
                  (h, i) => /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsAnalytics:182:18", "data-dynamic-content": "true", className: "flex items-center gap-2 text-xs", children: [
                    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsAnalytics:183:20", "data-dynamic-content": "true", className: "w-2 h-2 rounded-full", style: { backgroundColor: PRESET_COLORS[i % PRESET_COLORS.length] } }, void 0, false, {
                      fileName: "/app/src/pages/HabitsAnalytics.jsx",
                      lineNumber: 202,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/HabitsAnalytics:184:20", "data-dynamic-content": "true", className: "text-foreground flex-1 truncate", "data-collection-item-field": "name", "data-collection-item-id": h?.id || h?._id, children: h.name }, void 0, false, {
                      fileName: "/app/src/pages/HabitsAnalytics.jsx",
                      lineNumber: 203,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/HabitsAnalytics:185:20", "data-dynamic-content": "true", className: "text-muted-foreground font-mono", "data-collection-item-field": "count", "data-collection-item-id": h?.id || h?._id, children: [
                      h.count,
                      "x"
                    ] }, void 0, true, {
                      fileName: "/app/src/pages/HabitsAnalytics.jsx",
                      lineNumber: 204,
                      columnNumber: 21
                    }, this)
                  ] }, i, true, {
                    fileName: "/app/src/pages/HabitsAnalytics.jsx",
                    lineNumber: 201,
                    columnNumber: 17
                  }, this)
                )
              ] }, void 0, true, {
                fileName: "/app/src/pages/HabitsAnalytics.jsx",
                lineNumber: 198,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/HabitsAnalytics.jsx",
              lineNumber: 194,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsAnalytics:191:12", "data-dynamic-content": "true", className: "bg-white rounded-2xl p-4 border border-border", children: [
              /* @__PURE__ */ jsxDEV("h3", { "data-source-location": "pages/HabitsAnalytics:192:14", "data-dynamic-content": "false", className: "text-xs font-bold text-foreground mb-3 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDEV(Medal, { "data-source-location": "pages/HabitsAnalytics:193:16", "data-dynamic-content": "false", className: "w-3.5 h-3.5 text-slate-400" }, void 0, false, {
                  fileName: "/app/src/pages/HabitsAnalytics.jsx",
                  lineNumber: 212,
                  columnNumber: 17
                }, this),
                " Menos feitos"
              ] }, void 0, true, {
                fileName: "/app/src/pages/HabitsAnalytics.jsx",
                lineNumber: 211,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsAnalytics:195:14", "data-dynamic-content": "true", className: "space-y-2", children: [
                leastDone.length === 0 && /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/HabitsAnalytics:196:43", "data-dynamic-content": "false", className: "text-[10px] text-muted-foreground", children: "Sem dados" }, void 0, false, {
                  fileName: "/app/src/pages/HabitsAnalytics.jsx",
                  lineNumber: 215,
                  columnNumber: 44
                }, this),
                leastDone.map(
                  (h, i) => /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsAnalytics:198:18", "data-dynamic-content": "true", className: "flex items-center gap-2 text-xs", children: [
                    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsAnalytics:199:20", "data-dynamic-content": "false", className: "w-2 h-2 rounded-full bg-slate-300" }, void 0, false, {
                      fileName: "/app/src/pages/HabitsAnalytics.jsx",
                      lineNumber: 218,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/HabitsAnalytics:200:20", "data-dynamic-content": "true", className: "text-foreground flex-1 truncate", "data-collection-item-field": "name", "data-collection-item-id": h?.id || h?._id, children: h.name }, void 0, false, {
                      fileName: "/app/src/pages/HabitsAnalytics.jsx",
                      lineNumber: 219,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/HabitsAnalytics:201:20", "data-dynamic-content": "true", className: "text-muted-foreground font-mono", "data-collection-item-field": "count", "data-collection-item-id": h?.id || h?._id, children: [
                      h.count,
                      "x"
                    ] }, void 0, true, {
                      fileName: "/app/src/pages/HabitsAnalytics.jsx",
                      lineNumber: 220,
                      columnNumber: 21
                    }, this)
                  ] }, i, true, {
                    fileName: "/app/src/pages/HabitsAnalytics.jsx",
                    lineNumber: 217,
                    columnNumber: 17
                  }, this)
                )
              ] }, void 0, true, {
                fileName: "/app/src/pages/HabitsAnalytics.jsx",
                lineNumber: 214,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/HabitsAnalytics.jsx",
              lineNumber: 210,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/HabitsAnalytics.jsx",
            lineNumber: 193,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsAnalytics:209:10", "data-dynamic-content": "true", className: "bg-white rounded-2xl p-4 border border-border", children: [
            /* @__PURE__ */ jsxDEV("h3", { "data-source-location": "pages/HabitsAnalytics:210:12", "data-dynamic-content": "false", className: "text-sm font-bold text-foreground mb-3", children: "Ranking de Hábitos" }, void 0, false, {
              fileName: "/app/src/pages/HabitsAnalytics.jsx",
              lineNumber: 229,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsAnalytics:211:12", "data-dynamic-content": "true", className: "space-y-1.5", children: habitStats.map(
              (h, i) => /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsAnalytics:213:16", "data-dynamic-content": "true", className: "flex items-center gap-3 py-2 px-3 rounded-xl bg-secondary/50 text-sm", children: [
                /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/HabitsAnalytics:214:18", "data-dynamic-content": "true", className: "text-xs font-bold text-muted-foreground w-5", children: i + 1 }, void 0, false, {
                  fileName: "/app/src/pages/HabitsAnalytics.jsx",
                  lineNumber: 233,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsAnalytics:215:18", "data-dynamic-content": "true", className: "w-2.5 h-2.5 rounded-full flex-shrink-0", style: { backgroundColor: PRESET_COLORS[i % PRESET_COLORS.length] } }, void 0, false, {
                  fileName: "/app/src/pages/HabitsAnalytics.jsx",
                  lineNumber: 234,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/HabitsAnalytics:216:18", "data-dynamic-content": "true", className: "flex-1 text-foreground truncate", "data-collection-item-field": "name", "data-collection-item-id": h?.id || h?._id, children: h.name }, void 0, false, {
                  fileName: "/app/src/pages/HabitsAnalytics.jsx",
                  lineNumber: 235,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/HabitsAnalytics:217:18", "data-dynamic-content": "true", className: "text-xs text-muted-foreground font-mono", "data-collection-item-field": "count", "data-collection-item-id": h?.id || h?._id, children: [
                  h.count,
                  "x"
                ] }, void 0, true, {
                  fileName: "/app/src/pages/HabitsAnalytics.jsx",
                  lineNumber: 236,
                  columnNumber: 19
                }, this)
              ] }, i, true, {
                fileName: "/app/src/pages/HabitsAnalytics.jsx",
                lineNumber: 232,
                columnNumber: 15
              }, this)
            ) }, void 0, false, {
              fileName: "/app/src/pages/HabitsAnalytics.jsx",
              lineNumber: 230,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/HabitsAnalytics.jsx",
            lineNumber: 228,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/HabitsAnalytics.jsx",
          lineNumber: 134,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/pages/HabitsAnalytics.jsx",
        lineNumber: 123,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/app/src/pages/HabitsAnalytics.jsx",
      lineNumber: 114,
      columnNumber: 5
    },
    this
  );
}
_s(HabitsAnalytics, "hnmxQasHAqz3oM7BnaTm1HMPZ1s=", false, function() {
  return [useNavigate];
});
_c = HabitsAnalytics;
var _c;
$RefreshReg$(_c, "HabitsAnalytics");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/pages/HabitsAnalytics.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/pages/HabitsAnalytics.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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SUE7QUFFSjtBQUFDekQsR0F0TnVCRCxpQkFBZTtBQUFBLFVBQ3BCN0IsV0FBVztBQUFBO0FBQUEsS0FETjZCO0FBQWUsSUFBQXdHO0FBQUEsYUFBQUEsSUFBQSIsIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlTWVtbyIsInVzZVJlZiIsInVzZUNhbGxiYWNrIiwidXNlTmF2aWdhdGUiLCJtb3Rpb24iLCJBcnJvd0xlZnQiLCJUcm9waHkiLCJUcmVuZGluZ1VwIiwiU3RhciIsIk1lZGFsIiwiQmFyQ2hhcnQzIiwiYmFzZTQ0IiwiQmFyQ2hhcnQiLCJCYXIiLCJYQXhpcyIsIllBeGlzIiwiQ2FydGVzaWFuR3JpZCIsIlRvb2x0aXAiLCJSZXNwb25zaXZlQ29udGFpbmVyIiwiUGllQ2hhcnQiLCJQaWUiLCJDZWxsIiwiTGluZUNoYXJ0IiwiTGluZSIsImZvcm1hdCIsInN0YXJ0T2ZXZWVrIiwiZW5kT2ZXZWVrIiwic3ViV2Vla3MiLCJlYWNoRGF5T2ZJbnRlcnZhbCIsImlzV2l0aGluSW50ZXJ2YWwiLCJwdCIsIlBSRVNFVF9DT0xPUlMiLCJIYWJpdHNBbmFseXRpY3MiLCJfcyIsIm5hdmlnYXRlIiwiZW50cmllcyIsInNldEVudHJpZXMiLCJoYWJpdHMiLCJzZXRIYWJpdHMiLCJ0b3VjaFN0YXJ0IiwieCIsInkiLCJkcmFnT2Zmc2V0IiwiZHJhZ1N0eWxlIiwic2V0RHJhZ1N0eWxlIiwiZW50aXRpZXMiLCJIYWJpdEVudHJ5IiwibGlzdCIsInRoZW4iLCJjYXRjaCIsIkhhYml0IiwidG9kYXkiLCJEYXRlIiwid2Vla1N0YXJ0Iiwid2Vla1N0YXJ0c09uIiwid2Vla0VuZCIsIndlZWtEYXlzIiwic3RhcnQiLCJlbmQiLCJkYWlseVNjb3JlcyIsIm1hcCIsImQiLCJrZXkiLCJkYXlFbnRyaWVzIiwiZmlsdGVyIiwiZSIsImRhdGUiLCJkYXkiLCJsb2NhbGUiLCJzY29yZSIsInJlZHVjZSIsInMiLCJjb3VudCIsImxlbmd0aCIsImhhYml0U3RhdHMiLCJmb3JFYWNoIiwiaGFiaXRfaWQiLCJuYW1lIiwiaGFiaXRfbmFtZSIsImgiLCJpZCIsIk9iamVjdCIsInZhbHVlcyIsInNvcnQiLCJhIiwiYiIsIndlZWtseVRyZW5kIiwiQXJyYXkiLCJmcm9tIiwiXyIsImkiLCJ3cyIsIndlIiwid2Vla0VudHJpZXMiLCJ3ZWVrIiwic29ydGVkQnlDb3VudCIsIm1vc3REb25lIiwic2xpY2UiLCJsZWFzdERvbmUiLCJyZXZlcnNlIiwidG90YWxTY29yZSIsInRvdGFsQ29tcGxldGlvbnMiLCJoYW5kbGVQb2ludGVyU3RhcnQiLCJjdXJyZW50IiwiaGFuZGxlUG9pbnRlck1vdmUiLCJ0cmFuc2Zvcm0iLCJ0cmFuc2l0aW9uIiwiaGFuZGxlUG9pbnRlckVuZCIsInRvdWNoZXMiLCJjbGllbnRYIiwiY2xpZW50WSIsImNoYW5nZWRUb3VjaGVzIiwiYnV0dG9ucyIsImljb24iLCJsYWJlbCIsInZhbHVlIiwidW5pdCIsImNvbG9yIiwiYmciLCJNYXRoIiwicm91bmQiLCJjYXJkIiwib3BhY2l0eSIsImRlbGF5IiwiX2lkIiwidG9wIiwicmlnaHQiLCJsZWZ0IiwiYm90dG9tIiwiZm9udFNpemUiLCJmaWxsIiwiYm9yZGVyUmFkaXVzIiwiYm9yZGVyIiwiYmFja2dyb3VuZCIsInIiLCJiYWNrZ3JvdW5kQ29sb3IiLCJfYyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJIYWJpdHNBbmFseXRpY3MuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZU5hdmlnYXRlIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcbmltcG9ydCB7IG1vdGlvbiB9IGZyb20gXCJmcmFtZXItbW90aW9uXCI7XG5pbXBvcnQgeyBBcnJvd0xlZnQsIFRyb3BoeSwgVHJlbmRpbmdVcCwgU3RhciwgTWVkYWwsIEJhckNoYXJ0MyB9IGZyb20gXCJsdWNpZGUtcmVhY3RcIjtcbmltcG9ydCB7IGJhc2U0NCB9IGZyb20gXCJAL2FwaS9iYXNlNDRDbGllbnRcIjtcbmltcG9ydCB7IEJhckNoYXJ0LCBCYXIsIFhBeGlzLCBZQXhpcywgQ2FydGVzaWFuR3JpZCwgVG9vbHRpcCwgUmVzcG9uc2l2ZUNvbnRhaW5lciwgUGllQ2hhcnQsIFBpZSwgQ2VsbCwgTGluZUNoYXJ0LCBMaW5lIH0gZnJvbSBcInJlY2hhcnRzXCI7XG5pbXBvcnQgeyBmb3JtYXQsIHN0YXJ0T2ZXZWVrLCBlbmRPZldlZWssIHN1YldlZWtzLCBlYWNoRGF5T2ZJbnRlcnZhbCwgaXNXaXRoaW5JbnRlcnZhbCB9IGZyb20gXCJkYXRlLWZuc1wiO1xuaW1wb3J0IHsgcHQgfSBmcm9tIFwiZGF0ZS1mbnMvbG9jYWxlXCI7XG5cbmNvbnN0IFBSRVNFVF9DT0xPUlMgPSBbXCIjM0I4MkY2XCIsIFwiIzhCNUNGNlwiLCBcIiMxMEI5ODFcIiwgXCIjRjU5RTBCXCIsIFwiI0Y0M0Y1RVwiLCBcIiMxNEI4QTZcIiwgXCIjNjM2NkYxXCIsIFwiI0VDNDg5OVwiXTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSGFiaXRzQW5hbHl0aWNzKCkge1xuICBjb25zdCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XG4gIGNvbnN0IFtlbnRyaWVzLCBzZXRFbnRyaWVzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW2hhYml0cywgc2V0SGFiaXRzXSA9IHVzZVN0YXRlKFtdKTtcblxuICBjb25zdCB0b3VjaFN0YXJ0ID0gdXNlUmVmKHsgeDogMCwgeTogMCB9KTtcbiAgY29uc3QgZHJhZ09mZnNldCA9IHVzZVJlZih7IHg6IDAsIHk6IDAgfSk7XG4gIGNvbnN0IFtkcmFnU3R5bGUsIHNldERyYWdTdHlsZV0gPSB1c2VTdGF0ZSh7fSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBiYXNlNDQuZW50aXRpZXMuSGFiaXRFbnRyeS5saXN0KFwiLWNyZWF0ZWRfZGF0ZVwiLCA1MDApLnRoZW4oc2V0RW50cmllcykuY2F0Y2goKCkgPT4gc2V0RW50cmllcyhbXSkpO1xuICAgIGJhc2U0NC5lbnRpdGllcy5IYWJpdC5saXN0KCkudGhlbihzZXRIYWJpdHMpLmNhdGNoKCgpID0+IHNldEhhYml0cyhbXSkpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCB3ZWVrU3RhcnQgPSBzdGFydE9mV2Vlayh0b2RheSwgeyB3ZWVrU3RhcnRzT246IDEgfSk7XG4gIGNvbnN0IHdlZWtFbmQgPSBlbmRPZldlZWsodG9kYXksIHsgd2Vla1N0YXJ0c09uOiAxIH0pO1xuICBjb25zdCB3ZWVrRGF5cyA9IGVhY2hEYXlPZkludGVydmFsKHsgc3RhcnQ6IHdlZWtTdGFydCwgZW5kOiB3ZWVrRW5kIH0pO1xuXG4gIC8vIERhaWx5IHNjb3JlcyB0aGlzIHdlZWtcbiAgY29uc3QgZGFpbHlTY29yZXMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gd2Vla0RheXMubWFwKChkKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSBmb3JtYXQoZCwgXCJ5eXl5LU1NLWRkXCIpO1xuICAgICAgY29uc3QgZGF5RW50cmllcyA9IGVudHJpZXMuZmlsdGVyKChlKSA9PiBlLmRhdGUgPT09IGtleSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkYXk6IGZvcm1hdChkLCBcIkVFRVwiLCB7IGxvY2FsZTogcHQgfSksXG4gICAgICAgIGRhdGU6IGZvcm1hdChkLCBcImRcIiksXG4gICAgICAgIHNjb3JlOiBkYXlFbnRyaWVzLnJlZHVjZSgocywgZSkgPT4gcyArIChlLnNjb3JlIHx8IDApLCAwKSxcbiAgICAgICAgY291bnQ6IGRheUVudHJpZXMubGVuZ3RoXG4gICAgICB9O1xuICAgIH0pO1xuICB9LCBbZW50cmllcywgd2Vla0RheXNdKTtcblxuICAvLyBIYWJpdCBjb21wbGV0aW9uIHN0YXRzXG4gIGNvbnN0IGhhYml0U3RhdHMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBtYXAgPSB7fTtcbiAgICBlbnRyaWVzLmZvckVhY2goKGUpID0+IHtcbiAgICAgIGlmICghbWFwW2UuaGFiaXRfaWRdKSBtYXBbZS5oYWJpdF9pZF0gPSB7IG5hbWU6IGUuaGFiaXRfbmFtZSwgY291bnQ6IDAsIHNjb3JlOiAwIH07XG4gICAgICBtYXBbZS5oYWJpdF9pZF0uY291bnQrKztcbiAgICAgIG1hcFtlLmhhYml0X2lkXS5zY29yZSArPSBlLnNjb3JlIHx8IDA7XG4gICAgfSk7XG4gICAgLy8gQWxzbyBpbmNsdWRlIGhhYml0cyB0aGF0IGhhdmUgbmV2ZXIgYmVlbiBjb21wbGV0ZWRcbiAgICBoYWJpdHMuZm9yRWFjaCgoaCkgPT4ge1xuICAgICAgaWYgKCFtYXBbaC5pZF0pIG1hcFtoLmlkXSA9IHsgbmFtZTogaC5uYW1lLCBjb3VudDogMCwgc2NvcmU6IDAgfTtcbiAgICB9KTtcbiAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyhtYXApLnNvcnQoKGEsIGIpID0+IGIuY291bnQgLSBhLmNvdW50KTtcbiAgfSwgW2VudHJpZXMsIGhhYml0c10pO1xuXG4gIC8vIFdlZWtseSB0cmVuZCAobGFzdCA0IHdlZWtzKVxuICBjb25zdCB3ZWVrbHlUcmVuZCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiA0IH0sIChfLCBpKSA9PiB7XG4gICAgICBjb25zdCB3cyA9IHN0YXJ0T2ZXZWVrKHN1YldlZWtzKHRvZGF5LCAzIC0gaSksIHsgd2Vla1N0YXJ0c09uOiAxIH0pO1xuICAgICAgY29uc3Qgd2UgPSBlbmRPZldlZWsoc3ViV2Vla3ModG9kYXksIDMgLSBpKSwgeyB3ZWVrU3RhcnRzT246IDEgfSk7XG4gICAgICBjb25zdCB3ZWVrRW50cmllcyA9IGVudHJpZXMuZmlsdGVyKChlKSA9PiBpc1dpdGhpbkludGVydmFsKG5ldyBEYXRlKGUuZGF0ZSksIHsgc3RhcnQ6IHdzLCBlbmQ6IHdlIH0pKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdlZWs6IGBTZW0gJHtpICsgMX1gLFxuICAgICAgICBzY29yZTogd2Vla0VudHJpZXMucmVkdWNlKChzLCBlKSA9PiBzICsgKGUuc2NvcmUgfHwgMCksIDApLFxuICAgICAgICBjb3VudDogd2Vla0VudHJpZXMubGVuZ3RoXG4gICAgICB9O1xuICAgIH0pO1xuICB9LCBbZW50cmllcywgdG9kYXldKTtcblxuICAvLyBUb3AgYW5kIGJvdHRvbSBoYWJpdHNcbiAgY29uc3Qgc29ydGVkQnlDb3VudCA9IFsuLi5oYWJpdFN0YXRzXS5zb3J0KChhLCBiKSA9PiBiLmNvdW50IC0gYS5jb3VudCk7XG4gIGNvbnN0IG1vc3REb25lID0gc29ydGVkQnlDb3VudC5zbGljZSgwLCAzKTtcbiAgY29uc3QgbGVhc3REb25lID0gc29ydGVkQnlDb3VudC5maWx0ZXIoKGgpID0+IGguY291bnQgPT09IDApLmxlbmd0aCA+IDAgP1xuICBzb3J0ZWRCeUNvdW50LmZpbHRlcigoaCkgPT4gaC5jb3VudCA9PT0gMCkuc2xpY2UoMCwgMykgOlxuICBzb3J0ZWRCeUNvdW50LnNsaWNlKC0zKS5yZXZlcnNlKCk7XG5cbiAgY29uc3QgdG90YWxTY29yZSA9IGVudHJpZXMucmVkdWNlKChzLCBlKSA9PiBzICsgKGUuc2NvcmUgfHwgMCksIDApO1xuICBjb25zdCB0b3RhbENvbXBsZXRpb25zID0gZW50cmllcy5sZW5ndGg7XG5cbiAgY29uc3QgaGFuZGxlUG9pbnRlclN0YXJ0ID0gdXNlQ2FsbGJhY2soKHgsIHkpID0+IHt0b3VjaFN0YXJ0LmN1cnJlbnQgPSB7IHgsIHkgfTtkcmFnT2Zmc2V0LmN1cnJlbnQgPSB7IHg6IDAsIHk6IDAgfTtzZXREcmFnU3R5bGUoe30pO30sIFtdKTtcbiAgY29uc3QgaGFuZGxlUG9pbnRlck1vdmUgPSB1c2VDYWxsYmFjaygoeCwgeSkgPT4ge1xuICAgIGRyYWdPZmZzZXQuY3VycmVudCA9IHsgeDogeCAtIHRvdWNoU3RhcnQuY3VycmVudC54LCB5OiB5IC0gdG91Y2hTdGFydC5jdXJyZW50LnkgfTtcbiAgICBzZXREcmFnU3R5bGUoeyB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoJHtkcmFnT2Zmc2V0LmN1cnJlbnQueH1weCwgJHtkcmFnT2Zmc2V0LmN1cnJlbnQueX1weClgLCB0cmFuc2l0aW9uOiBcIm5vbmVcIiB9KTtcbiAgfSwgW10pO1xuICBjb25zdCBoYW5kbGVQb2ludGVyRW5kID0gdXNlQ2FsbGJhY2soKHgsIHkpID0+IHtcbiAgICBzZXREcmFnU3R5bGUoeyB0cmFuc2Zvcm06IFwidHJhbnNsYXRlKDAsIDApXCIsIHRyYW5zaXRpb246IFwidHJhbnNmb3JtIDAuM3MgZWFzZS1vdXRcIiB9KTtcbiAgICBpZiAoeCAtIHRvdWNoU3RhcnQuY3VycmVudC54IDwgLTYwKSBuYXZpZ2F0ZShcIi9oYWJpdHNcIik7XG4gIH0sIFtuYXZpZ2F0ZV0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c0FuYWx5dGljczo5NTo0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctY3JlYW0gZmxleCBmbGV4LWNvbCBzZWxlY3Qtbm9uZVwiXG4gICAgb25Ub3VjaFN0YXJ0PXsoZSkgPT4gaGFuZGxlUG9pbnRlclN0YXJ0KGUudG91Y2hlc1swXS5jbGllbnRYLCBlLnRvdWNoZXNbMF0uY2xpZW50WSl9XG4gICAgb25Ub3VjaE1vdmU9eyhlKSA9PiBoYW5kbGVQb2ludGVyTW92ZShlLnRvdWNoZXNbMF0uY2xpZW50WCwgZS50b3VjaGVzWzBdLmNsaWVudFkpfVxuICAgIG9uVG91Y2hFbmQ9eyhlKSA9PiBoYW5kbGVQb2ludGVyRW5kKGUuY2hhbmdlZFRvdWNoZXNbMF0/LmNsaWVudFggfHwgdG91Y2hTdGFydC5jdXJyZW50LngsIGUuY2hhbmdlZFRvdWNoZXNbMF0/LmNsaWVudFkgfHwgdG91Y2hTdGFydC5jdXJyZW50LnkpfVxuICAgIG9uTW91c2VEb3duPXsoZSkgPT4gaGFuZGxlUG9pbnRlclN0YXJ0KGUuY2xpZW50WCwgZS5jbGllbnRZKX1cbiAgICBvbk1vdXNlTW92ZT17KGUpID0+IHtpZiAoZS5idXR0b25zID09PSAxKSBoYW5kbGVQb2ludGVyTW92ZShlLmNsaWVudFgsIGUuY2xpZW50WSk7fX1cbiAgICBvbk1vdXNlVXA9eyhlKSA9PiBoYW5kbGVQb2ludGVyRW5kKGUuY2xpZW50WCwgZS5jbGllbnRZKX0+XG4gICAgICBcbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNBbmFseXRpY3M6MTA0OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBzdHlsZT17ZHJhZ1N0eWxlfSBjbGFzc05hbWU9XCJmbGV4LTEgZmxleCBmbGV4LWNvbFwiPlxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzQW5hbHl0aWNzOjEwNTo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiYmctd2hpdGUgYm9yZGVyLWIgYm9yZGVyLWJvcmRlciBweC00IHB5LTQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzQW5hbHl0aWNzOjEwNjoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKFwiL2hhYml0c1wiKX0gY2xhc3NOYW1lPVwidy0xMCBoLTEwIHJvdW5kZWQtMnhsIGJnLXdoaXRlIGJvcmRlciBib3JkZXItYm9yZGVyIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBob3Zlcjp0ZXh0LWZvcmVncm91bmQgdHJhbnNpdGlvbi1hbGxcIj5cbiAgICAgICAgICAgIDxBcnJvd0xlZnQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNBbmFseXRpY3M6MTA3OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNBbmFseXRpY3M6MTA5OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiPlxuICAgICAgICAgICAgPGgxIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzQW5hbHl0aWNzOjExMDoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LWZvcmVncm91bmRcIj5BbmFseXRpY3M8L2gxPlxuICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNBbmFseXRpY3M6MTExOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiPkjDoWJpdG9zIHNhdWTDoXZlaXM8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNBbmFseXRpY3M6MTE1OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4LTEgb3ZlcmZsb3ctYXV0byBwLTQgc3BhY2UteS00XCI+XG4gICAgICAgICAgey8qIFN1bW1hcnkgY2FyZHMgKi99XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c0FuYWx5dGljczoxMTc6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0zIGdhcC0zXCI+XG4gICAgICAgICAgICB7W1xuICAgICAgICAgICAgeyBpY29uOiBUcm9waHksIGxhYmVsOiBcIlRvdGFsXCIsIHZhbHVlOiB0b3RhbFNjb3JlLCB1bml0OiBcInB0c1wiLCBjb2xvcjogXCJ0ZXh0LWFtYmVyLTYwMFwiLCBiZzogXCJiZy1hbWJlci01MFwiIH0sXG4gICAgICAgICAgICB7IGljb246IFRyZW5kaW5nVXAsIGxhYmVsOiBcIkZlaXRvc1wiLCB2YWx1ZTogdG90YWxDb21wbGV0aW9ucywgdW5pdDogXCJhw6fDtWVzXCIsIGNvbG9yOiBcInRleHQtZW1lcmFsZC02MDBcIiwgYmc6IFwiYmctZW1lcmFsZC01MFwiIH0sXG4gICAgICAgICAgICB7IGljb246IE1lZGFsLCBsYWJlbDogXCJNw6lkaWEvZGlhXCIsIHZhbHVlOiB0b3RhbENvbXBsZXRpb25zID4gMCA/IE1hdGgucm91bmQodG90YWxTY29yZSAvIHRvdGFsQ29tcGxldGlvbnMpIDogMCwgdW5pdDogXCJwdHNcIiwgY29sb3I6IFwidGV4dC1pbmRpZ28tNjAwXCIsIGJnOiBcImJnLWluZGlnby01MFwiIH1dLlxuICAgICAgICAgICAgbWFwKChjYXJkLCBpKSA9PlxuICAgICAgICAgICAgPG1vdGlvbi5kaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNBbmFseXRpY3M6MTIzOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtpfSBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHk6IDggfX0gYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB5OiAwIH19IHRyYW5zaXRpb249e3sgZGVsYXk6IGkgKiAwLjA1IH19XG4gICAgICAgICAgICBjbGFzc05hbWU9e2Ake2NhcmQuYmd9IHJvdW5kZWQtMnhsIHAtMyBib3JkZXIgYm9yZGVyLWJvcmRlci81MGB9PlxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNBbmFseXRpY3M6MTI1OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgPGNhcmQuaWNvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c0FuYWx5dGljczoxMjY6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9e2B3LTQgaC00ICR7Y2FyZC5jb2xvcn1gfSAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNBbmFseXRpY3M6MTI3OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJsYWJlbFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtjYXJkPy5pZCB8fCBjYXJkPy5faWR9PntjYXJkLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8cCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c0FuYWx5dGljczoxMjk6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9e2B0ZXh0LXhsIGZvbnQtYm9sZCAke2NhcmQuY29sb3J9YH0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJ2YWx1ZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtjYXJkPy5pZCB8fCBjYXJkPy5faWR9PntjYXJkLnZhbHVlfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c0FuYWx5dGljczoxMzA6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwidW5pdFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtjYXJkPy5pZCB8fCBjYXJkPy5faWR9PntjYXJkLnVuaXR9PC9wPlxuICAgICAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIERhaWx5IGNoYXJ0ICovfVxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNBbmFseXRpY3M6MTM2OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC0yeGwgcC01IGJvcmRlciBib3JkZXItYm9yZGVyXCI+XG4gICAgICAgICAgICA8aDMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNBbmFseXRpY3M6MTM3OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtZm9yZWdyb3VuZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBtYi00XCI+XG4gICAgICAgICAgICAgIDxCYXJDaGFydDMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNBbmFseXRpY3M6MTM4OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1bI0U4N0E1QV1cIiAvPiBQb250dWHDp8OjbyBTZW1hbmFsXG4gICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c0FuYWx5dGljczoxNDA6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJoLVsxODBweF1cIj5cbiAgICAgICAgICAgICAgPFJlc3BvbnNpdmVDb250YWluZXIgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNBbmFseXRpY3M6MTQxOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPlxuICAgICAgICAgICAgICAgIDxCYXJDaGFydCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c0FuYWx5dGljczoxNDI6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBkYXRhPXtkYWlseVNjb3Jlc30gbWFyZ2luPXt7IHRvcDogNSwgcmlnaHQ6IDUsIGxlZnQ6IC0yMCwgYm90dG9tOiAwIH19PlxuICAgICAgICAgICAgICAgICAgPENhcnRlc2lhbkdyaWQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNBbmFseXRpY3M6MTQzOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHN0cm9rZURhc2hhcnJheT1cIjMgM1wiIHN0cm9rZT1cIiNGMEVCRTNcIiAvPlxuICAgICAgICAgICAgICAgICAgPFhBeGlzIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzQW5hbHl0aWNzOjE0NDoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGRhdGFLZXk9XCJkYXlcIiB0aWNrPXt7IGZvbnRTaXplOiAxMCwgZmlsbDogXCIjOUNBM0FGXCIgfX0gYXhpc0xpbmU9e2ZhbHNlfSB0aWNrTGluZT17ZmFsc2V9IC8+XG4gICAgICAgICAgICAgICAgICA8WUF4aXMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNBbmFseXRpY3M6MTQ1OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgdGljaz17eyBmb250U2l6ZTogMTAsIGZpbGw6IFwiIzlDQTNBRlwiIH19IGF4aXNMaW5lPXtmYWxzZX0gdGlja0xpbmU9e2ZhbHNlfSAvPlxuICAgICAgICAgICAgICAgICAgPFRvb2x0aXAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNBbmFseXRpY3M6MTQ2OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY29udGVudFN0eWxlPXt7IGJvcmRlclJhZGl1czogMTIsIGJvcmRlcjogXCIxcHggc29saWQgI0U4RTBEOFwiLCBiYWNrZ3JvdW5kOiBcIiNmZmZcIiwgZm9udFNpemU6IDEyIH19XG4gICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI9eyh2YWx1ZSkgPT4gW2Ake3ZhbHVlfSBwdHNgLCBcIlBvbnR1YcOnw6NvXCJdfSAvPlxuICAgICAgICAgICAgICAgICAgPEJhciBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c0FuYWx5dGljczoxNDg6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBkYXRhS2V5PVwic2NvcmVcIiByYWRpdXM9e1s4LCA4LCAwLCAwXX0gZmlsbD1cIiNFODdBNUFcIiBtYXhCYXJTaXplPXszNn0gLz5cbiAgICAgICAgICAgICAgICA8L0JhckNoYXJ0PlxuICAgICAgICAgICAgICA8L1Jlc3BvbnNpdmVDb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBXZWVrbHkgdHJlbmQgKi99XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c0FuYWx5dGljczoxNTU6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCBwLTUgYm9yZGVyIGJvcmRlci1ib3JkZXJcIj5cbiAgICAgICAgICAgIDxoMyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c0FuYWx5dGljczoxNTY6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC1mb3JlZ3JvdW5kIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIG1iLTRcIj5cbiAgICAgICAgICAgICAgPFRyZW5kaW5nVXAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNBbmFseXRpY3M6MTU3OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1wdXJwbGUtNTAwXCIgLz4gVGVuZMOqbmNpYSBNZW5zYWxcbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzQW5hbHl0aWNzOjE1OToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImgtWzE0MHB4XVwiPlxuICAgICAgICAgICAgICA8UmVzcG9uc2l2ZUNvbnRhaW5lciBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c0FuYWx5dGljczoxNjA6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+XG4gICAgICAgICAgICAgICAgPExpbmVDaGFydCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c0FuYWx5dGljczoxNjE6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBkYXRhPXt3ZWVrbHlUcmVuZH0gbWFyZ2luPXt7IHRvcDogNSwgcmlnaHQ6IDUsIGxlZnQ6IC0yMCwgYm90dG9tOiAwIH19PlxuICAgICAgICAgICAgICAgICAgPENhcnRlc2lhbkdyaWQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNBbmFseXRpY3M6MTYyOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHN0cm9rZURhc2hhcnJheT1cIjMgM1wiIHN0cm9rZT1cIiNGMEVCRTNcIiAvPlxuICAgICAgICAgICAgICAgICAgPFhBeGlzIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzQW5hbHl0aWNzOjE2MzoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGRhdGFLZXk9XCJ3ZWVrXCIgdGljaz17eyBmb250U2l6ZTogMTAsIGZpbGw6IFwiIzlDQTNBRlwiIH19IGF4aXNMaW5lPXtmYWxzZX0gdGlja0xpbmU9e2ZhbHNlfSAvPlxuICAgICAgICAgICAgICAgICAgPFlBeGlzIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzQW5hbHl0aWNzOjE2NDoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHRpY2s9e3sgZm9udFNpemU6IDEwLCBmaWxsOiBcIiM5Q0EzQUZcIiB9fSBheGlzTGluZT17ZmFsc2V9IHRpY2tMaW5lPXtmYWxzZX0gLz5cbiAgICAgICAgICAgICAgICAgIDxUb29sdGlwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzQW5hbHl0aWNzOjE2NToxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNvbnRlbnRTdHlsZT17eyBib3JkZXJSYWRpdXM6IDEyLCBib3JkZXI6IFwiMXB4IHNvbGlkICNFOEUwRDhcIiwgYmFja2dyb3VuZDogXCIjZmZmXCIsIGZvbnRTaXplOiAxMiB9fVxuICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyPXsodmFsdWUpID0+IFtgJHt2YWx1ZX0gcHRzYCwgXCJUb3RhbFwiXX0gLz5cbiAgICAgICAgICAgICAgICAgIDxMaW5lIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzQW5hbHl0aWNzOjE2NzoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHR5cGU9XCJtb25vdG9uZVwiIGRhdGFLZXk9XCJzY29yZVwiIHN0cm9rZT1cIiM4QjVDRjZcIiBzdHJva2VXaWR0aD17Mn0gZG90PXt7IGZpbGw6IFwiIzhCNUNGNlwiLCByOiA0IH19IC8+XG4gICAgICAgICAgICAgICAgPC9MaW5lQ2hhcnQ+XG4gICAgICAgICAgICAgIDwvUmVzcG9uc2l2ZUNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIE1vc3QvTGVhc3QgZG9uZSAqL31cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzQW5hbHl0aWNzOjE3NDoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNBbmFseXRpY3M6MTc1OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC0yeGwgcC00IGJvcmRlciBib3JkZXItYm9yZGVyXCI+XG4gICAgICAgICAgICAgIDxoMyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c0FuYWx5dGljczoxNzY6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1mb3JlZ3JvdW5kIG1iLTMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgIDxUcm9waHkgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNBbmFseXRpY3M6MTc3OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYW1iZXItNTAwXCIgLz4gTWFpcyBmZWl0b3NcbiAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c0FuYWx5dGljczoxNzk6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICB7bW9zdERvbmUuZmlsdGVyKChoKSA9PiBoLmNvdW50ID4gMCkubGVuZ3RoID09PSAwICYmIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzQW5hbHl0aWNzOjE4MDo2N1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj5TZW0gZGFkb3M8L3A+fVxuICAgICAgICAgICAgICAgIHttb3N0RG9uZS5maWx0ZXIoKGgpID0+IGguY291bnQgPiAwKS5tYXAoKGgsIGkpID0+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c0FuYWx5dGljczoxODI6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBrZXk9e2l9IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c0FuYWx5dGljczoxODM6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQtZnVsbFwiIHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogUFJFU0VUX0NPTE9SU1tpICUgUFJFU0VUX0NPTE9SUy5sZW5ndGhdIH19IC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzQW5hbHl0aWNzOjE4NDoyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQtZm9yZWdyb3VuZCBmbGV4LTEgdHJ1bmNhdGVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cIm5hbWVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aD8uaWQgfHwgaD8uX2lkfT57aC5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNBbmFseXRpY3M6MTg1OjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGZvbnQtbW9ub1wiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiY291bnRcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aD8uaWQgfHwgaD8uX2lkfT57aC5jb3VudH14PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c0FuYWx5dGljczoxOTE6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCBwLTQgYm9yZGVyIGJvcmRlci1ib3JkZXJcIj5cbiAgICAgICAgICAgICAgPGgzIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzQW5hbHl0aWNzOjE5MjoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LWZvcmVncm91bmQgbWItMyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgPE1lZGFsIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzQW5hbHl0aWNzOjE5MzoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXNsYXRlLTQwMFwiIC8+IE1lbm9zIGZlaXRvc1xuICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzQW5hbHl0aWNzOjE5NToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgIHtsZWFzdERvbmUubGVuZ3RoID09PSAwICYmIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzQW5hbHl0aWNzOjE5Njo0M1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj5TZW0gZGFkb3M8L3A+fVxuICAgICAgICAgICAgICAgIHtsZWFzdERvbmUubWFwKChoLCBpKSA9PlxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNBbmFseXRpY3M6MTk4OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtpfSBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNBbmFseXRpY3M6MTk5OjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctMiBoLTIgcm91bmRlZC1mdWxsIGJnLXNsYXRlLTMwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzQW5hbHl0aWNzOjIwMDoyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQtZm9yZWdyb3VuZCBmbGV4LTEgdHJ1bmNhdGVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cIm5hbWVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aD8uaWQgfHwgaD8uX2lkfT57aC5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNBbmFseXRpY3M6MjAxOjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGZvbnQtbW9ub1wiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiY291bnRcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aD8uaWQgfHwgaD8uX2lkfT57aC5jb3VudH14PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBBbGwgaGFiaXRzIHJhbmtpbmcgKi99XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c0FuYWx5dGljczoyMDk6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCBwLTQgYm9yZGVyIGJvcmRlci1ib3JkZXJcIj5cbiAgICAgICAgICAgIDxoMyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c0FuYWx5dGljczoyMTA6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC1mb3JlZ3JvdW5kIG1iLTNcIj5SYW5raW5nIGRlIEjDoWJpdG9zPC9oMz5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNBbmFseXRpY3M6MjExOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAge2hhYml0U3RhdHMubWFwKChoLCBpKSA9PlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzQW5hbHl0aWNzOjIxMzoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17aX0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgcHktMiBweC0zIHJvdW5kZWQteGwgYmctc2Vjb25kYXJ5LzUwIHRleHQtc21cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzQW5hbHl0aWNzOjIxNDoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCB3LTVcIj57aSArIDF9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c0FuYWx5dGljczoyMTU6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNSByb3VuZGVkLWZ1bGwgZmxleC1zaHJpbmstMFwiIHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogUFJFU0VUX0NPTE9SU1tpICUgUFJFU0VUX0NPTE9SUy5sZW5ndGhdIH19IC8+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c0FuYWx5dGljczoyMTY6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4LTEgdGV4dC1mb3JlZ3JvdW5kIHRydW5jYXRlXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJuYW1lXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2g/LmlkIHx8IGg/Ll9pZH0+e2gubmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c0FuYWx5dGljczoyMTc6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBmb250LW1vbm9cIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImNvdW50XCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2g/LmlkIHx8IGg/Ll9pZH0+e2guY291bnR9eDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2Pik7XG5cbn0iXSwiZmlsZSI6Ii9hcHAvc3JjL3BhZ2VzL0hhYml0c0FuYWx5dGljcy5qc3gifQ==