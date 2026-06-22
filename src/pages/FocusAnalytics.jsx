import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/FocusAnalytics.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/pages/FocusAnalytics.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=fc940917"; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"]; const useMemo = __vite__cjsImport3_react["useMemo"]; const useCallback = __vite__cjsImport3_react["useCallback"]; const useRef = __vite__cjsImport3_react["useRef"];
import { useNavigate } from "/node_modules/.vite/deps/react-router-dom.js?v=8a08d97a";
import { motion } from "/node_modules/.vite/deps/framer-motion.js?v=fc940917";
import { ArrowLeft, TrendingUp, Clock, CheckCircle, Target, Zap } from "/node_modules/.vite/deps/lucide-react.js?v=aefa7968";
import { base44 } from "/src/api/base44Client.js";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from "/node_modules/.vite/deps/recharts.js?v=e48649fe";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isWithinInterval, subWeeks } from "/node_modules/.vite/deps/date-fns.js?v=a1580542";
import { pt } from "/node_modules/.vite/deps/date-fns_locale.js?v=45b313c9";
const DAY_LABELS_SHORT = ["S", "T", "Q", "Q", "S", "S", "D"];
const TAG_COLORS_CHART = {
  blue: "#3B82F6",
  purple: "#8B5CF6",
  green: "#10B981",
  amber: "#F59E0B",
  rose: "#F43F5E",
  teal: "#14B8A6",
  indigo: "#6366F1",
  pink: "#EC4899"
};
export default function FocusAnalytics() {
  _s();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const touchStart = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const [dragStyle, setDragStyle] = useState({});
  useEffect(() => {
    base44.entities.FocusSession.list("-created_date", 500).then(setSessions).catch(() => setSessions([]));
  }, []);
  const today = /* @__PURE__ */ new Date();
  const todayStr = format(today, "yyyy-MM-dd");
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const completedFocus = useMemo(() => sessions.filter((s) => s.type === "focus" && s.completed), [sessions]);
  const todayCount = completedFocus.filter((s) => format(new Date(s.created_date), "yyyy-MM-dd") === todayStr).length;
  const weekCount = completedFocus.filter((s) => isWithinInterval(new Date(s.created_date), { start: weekStart, end: weekEnd })).length;
  const totalFocusMin = completedFocus.reduce((sum, s) => sum + (s.duration_minutes || 0), 0);
  const totalHours = Math.floor(totalFocusMin / 60);
  const totalRemainder = totalFocusMin % 60;
  const dailyData = weekDays.map((d, i) => {
    const key = format(d, "yyyy-MM-dd");
    const count = completedFocus.filter((s) => format(new Date(s.created_date), "yyyy-MM-dd") === key).length;
    return { day: DAY_LABELS_SHORT[i], count, date: format(d, "d") };
  });
  const tagDistribution = useMemo(() => {
    const map = {};
    completedFocus.forEach((s) => {
      const name = s.tag_name || "Sem tag";
      map[name] = (map[name] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({
      name,
      value,
      color: TAG_COLORS_CHART[completedFocus.find((s) => (s.tag_name || "Sem tag") === name)?.tag_color] || "#94A3B8"
    }));
  }, [completedFocus]);
  const weeklyTrend = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => {
      const ws = startOfWeek(subWeeks(today, 3 - i), { weekStartsOn: 1 });
      const we = endOfWeek(subWeeks(today, 3 - i), { weekStartsOn: 1 });
      const count = completedFocus.filter((s) => isWithinInterval(new Date(s.created_date), { start: ws, end: we })).length;
      return { week: `Sem ${i + 1}`, count };
    });
  }, [completedFocus, today]);
  const hourlyData = useMemo(() => {
    const hours = Array.from({ length: 24 }, (_, i) => ({ hour: `${i}h`, count: 0 }));
    completedFocus.forEach((s) => {
      const d = new Date(s.created_date);
      hours[d.getHours()].count++;
    });
    return hours.filter((h) => h.count > 0);
  }, [completedFocus]);
  const streak = useMemo(() => {
    let s = 0;
    const d = new Date(today);
    while (true) {
      const key = format(d, "yyyy-MM-dd");
      const count = completedFocus.filter((s2) => format(new Date(s2.created_date), "yyyy-MM-dd") === key).length;
      if (count === 0) break;
      s++;
      d.setDate(d.getDate() - 1);
    }
    return s;
  }, [completedFocus, today]);
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
    if (y - touchStart.current.y < -60) navigate("/focus");
  }, [navigate]);
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      "data-source-location": "pages/FocusAnalytics:106:4",
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
      children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:114:6", "data-dynamic-content": "true", style: dragStyle, className: "flex-1 flex flex-col", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:115:8", "data-dynamic-content": "true", className: "bg-white border-b border-border px-4 py-3 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/FocusAnalytics:116:10", "data-dynamic-content": "true", onClick: () => navigate("/focus"), className: "w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all", children: /* @__PURE__ */ jsxDEV(ArrowLeft, { "data-source-location": "pages/FocusAnalytics:117:12", "data-dynamic-content": "false", className: "w-5 h-5" }, void 0, false, {
            fileName: "/app/src/pages/FocusAnalytics.jsx",
            lineNumber: 136,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "/app/src/pages/FocusAnalytics.jsx",
            lineNumber: 135,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:119:10", "data-dynamic-content": "true", children: [
            /* @__PURE__ */ jsxDEV("h1", { "data-source-location": "pages/FocusAnalytics:120:12", "data-dynamic-content": "false", className: "text-lg font-bold text-foreground", children: "Analytics" }, void 0, false, {
              fileName: "/app/src/pages/FocusAnalytics.jsx",
              lineNumber: 139,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/FocusAnalytics:121:12", "data-dynamic-content": "true", className: "text-[11px] text-muted-foreground", children: format(today, "d 'de' MMMM, yyyy", { locale: pt }) }, void 0, false, {
              fileName: "/app/src/pages/FocusAnalytics.jsx",
              lineNumber: 140,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/FocusAnalytics.jsx",
            lineNumber: 138,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/FocusAnalytics.jsx",
          lineNumber: 134,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:125:8", "data-dynamic-content": "true", className: "flex-1 overflow-auto p-4 space-y-4", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:127:10", "data-dynamic-content": "true", className: "grid grid-cols-2 gap-3", children: [
            { icon: Target, color: "text-[#E87A5A]", bg: "bg-[#E87A5A]/10", label: "Hoje", value: todayCount, unit: "pomodoros" },
            { icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-100", label: "Semana", value: weekCount, unit: "pomodoros" },
            { icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-100", label: "Total", value: completedFocus.length, unit: "pomodoros" },
            { icon: Clock, color: "text-amber-600", bg: "bg-amber-100", label: "Foco", value: `${totalHours}h ${totalRemainder}m`, unit: "tempo" }
          ].map(
            (card, i) => /* @__PURE__ */ jsxDEV(
              motion.div,
              {
                "data-source-location": "pages/FocusAnalytics:134:14",
                "data-dynamic-content": "true",
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: i * 0.05 },
                className: "bg-white rounded-2xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow",
                children: [
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:136:16", "data-dynamic-content": "true", className: "flex items-center gap-2 mb-2", children: [
                    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:137:18", "data-dynamic-content": "true", className: `w-9 h-9 rounded-xl ${card.bg} flex items-center justify-center`, children: /* @__PURE__ */ jsxDEV(card.icon, { "data-source-location": "pages/FocusAnalytics:138:20", "data-dynamic-content": "true", className: `w-4 h-4 ${card.color}` }, void 0, false, {
                      fileName: "/app/src/pages/FocusAnalytics.jsx",
                      lineNumber: 157,
                      columnNumber: 21
                    }, this) }, void 0, false, {
                      fileName: "/app/src/pages/FocusAnalytics.jsx",
                      lineNumber: 156,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusAnalytics:140:18", "data-dynamic-content": "true", className: "text-xs font-semibold text-foreground", "data-collection-item-field": "label", "data-collection-item-id": card?.id || card?._id, children: card.label }, void 0, false, {
                      fileName: "/app/src/pages/FocusAnalytics.jsx",
                      lineNumber: 159,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/FocusAnalytics.jsx",
                    lineNumber: 155,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:142:16", "data-dynamic-content": "true", className: `text-2xl font-bold ${card.color}`, "data-collection-item-field": "value", "data-collection-item-id": card?.id || card?._id, children: card.value }, void 0, false, {
                    fileName: "/app/src/pages/FocusAnalytics.jsx",
                    lineNumber: 161,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/FocusAnalytics:143:16", "data-dynamic-content": "true", className: "text-[10px] text-muted-foreground", "data-collection-item-field": "unit", "data-collection-item-id": card?.id || card?._id, children: card.unit }, void 0, false, {
                    fileName: "/app/src/pages/FocusAnalytics.jsx",
                    lineNumber: 162,
                    columnNumber: 17
                  }, this)
                ]
              },
              i,
              true,
              {
                fileName: "/app/src/pages/FocusAnalytics.jsx",
                lineNumber: 153,
                columnNumber: 13
              },
              this
            )
          ) }, void 0, false, {
            fileName: "/app/src/pages/FocusAnalytics.jsx",
            lineNumber: 146,
            columnNumber: 11
          }, this),
          streak > 0 && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:150:12", "data-dynamic-content": "true", className: "bg-white rounded-2xl p-4 border border-border shadow-sm", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:151:14", "data-dynamic-content": "true", className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:152:16", "data-dynamic-content": "false", className: "w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl", children: "🔥" }, void 0, false, {
              fileName: "/app/src/pages/FocusAnalytics.jsx",
              lineNumber: 171,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:153:16", "data-dynamic-content": "true", children: [
              /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/FocusAnalytics:154:18", "data-dynamic-content": "true", className: "text-sm font-bold text-foreground", "data-collection-item-field": "streak", children: [
                "Sequência de ",
                streak,
                " dia",
                streak !== 1 ? "s" : ""
              ] }, void 0, true, {
                fileName: "/app/src/pages/FocusAnalytics.jsx",
                lineNumber: 173,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/FocusAnalytics:155:18", "data-dynamic-content": "false", className: "text-[11px] text-muted-foreground", children: "Dias consecutivos com foco" }, void 0, false, {
                fileName: "/app/src/pages/FocusAnalytics.jsx",
                lineNumber: 174,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/FocusAnalytics.jsx",
              lineNumber: 172,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:157:16", "data-dynamic-content": "true", className: "ml-auto text-3xl font-bold text-amber-500", "data-collection-item-field": "streak", children: streak }, void 0, false, {
              fileName: "/app/src/pages/FocusAnalytics.jsx",
              lineNumber: 176,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/FocusAnalytics.jsx",
            lineNumber: 170,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/src/pages/FocusAnalytics.jsx",
            lineNumber: 169,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:163:10", "data-dynamic-content": "true", className: "bg-white rounded-2xl p-5 border border-border shadow-sm", children: [
            /* @__PURE__ */ jsxDEV("h3", { "data-source-location": "pages/FocusAnalytics:164:12", "data-dynamic-content": "false", className: "text-sm font-semibold text-foreground mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV(Zap, { "data-source-location": "pages/FocusAnalytics:165:14", "data-dynamic-content": "false", className: "w-4 h-4 text-[#E87A5A]" }, void 0, false, {
                fileName: "/app/src/pages/FocusAnalytics.jsx",
                lineNumber: 184,
                columnNumber: 15
              }, this),
              " Tendência Semanal"
            ] }, void 0, true, {
              fileName: "/app/src/pages/FocusAnalytics.jsx",
              lineNumber: 183,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:167:12", "data-dynamic-content": "true", className: "h-[160px]", children: /* @__PURE__ */ jsxDEV(ResponsiveContainer, { "data-source-location": "pages/FocusAnalytics:168:14", "data-dynamic-content": "true", width: "100%", height: "100%", children: /* @__PURE__ */ jsxDEV(AreaChart, { "data-source-location": "pages/FocusAnalytics:169:16", "data-dynamic-content": "true", data: weeklyTrend, margin: { top: 5, right: 5, left: -20, bottom: 0 }, children: [
              /* @__PURE__ */ jsxDEV("defs", { "data-source-location": "pages/FocusAnalytics:170:18", "data-dynamic-content": "false", children: /* @__PURE__ */ jsxDEV("linearGradient", { "data-source-location": "pages/FocusAnalytics:171:20", "data-dynamic-content": "false", id: "gradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsxDEV("stop", { "data-source-location": "pages/FocusAnalytics:172:22", "data-dynamic-content": "false", offset: "0%", stopColor: "#E87A5A", stopOpacity: 0.3 }, void 0, false, {
                  fileName: "/app/src/pages/FocusAnalytics.jsx",
                  lineNumber: 191,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("stop", { "data-source-location": "pages/FocusAnalytics:173:22", "data-dynamic-content": "false", offset: "100%", stopColor: "#E87A5A", stopOpacity: 0 }, void 0, false, {
                  fileName: "/app/src/pages/FocusAnalytics.jsx",
                  lineNumber: 192,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/FocusAnalytics.jsx",
                lineNumber: 190,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "/app/src/pages/FocusAnalytics.jsx",
                lineNumber: 189,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(CartesianGrid, { "data-source-location": "pages/FocusAnalytics:176:18", "data-dynamic-content": "false", strokeDasharray: "3 3", stroke: "#F0EBE3" }, void 0, false, {
                fileName: "/app/src/pages/FocusAnalytics.jsx",
                lineNumber: 195,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(XAxis, { "data-source-location": "pages/FocusAnalytics:177:18", "data-dynamic-content": "true", dataKey: "week", tick: { fontSize: 11, fill: "#9CA3AF" }, axisLine: false, tickLine: false }, void 0, false, {
                fileName: "/app/src/pages/FocusAnalytics.jsx",
                lineNumber: 196,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(YAxis, { "data-source-location": "pages/FocusAnalytics:178:18", "data-dynamic-content": "true", tick: { fontSize: 11, fill: "#9CA3AF" }, axisLine: false, tickLine: false, allowDecimals: false }, void 0, false, {
                fileName: "/app/src/pages/FocusAnalytics.jsx",
                lineNumber: 197,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(Tooltip, { "data-source-location": "pages/FocusAnalytics:179:18", "data-dynamic-content": "true", contentStyle: { borderRadius: 12, border: "1px solid #E8E0D8", background: "#fff", fontSize: 12 } }, void 0, false, {
                fileName: "/app/src/pages/FocusAnalytics.jsx",
                lineNumber: 198,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(Area, { "data-source-location": "pages/FocusAnalytics:180:18", "data-dynamic-content": "false", type: "monotone", dataKey: "count", stroke: "#E87A5A", strokeWidth: 2, fill: "url(#gradient)" }, void 0, false, {
                fileName: "/app/src/pages/FocusAnalytics.jsx",
                lineNumber: 199,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/FocusAnalytics.jsx",
              lineNumber: 188,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/FocusAnalytics.jsx",
              lineNumber: 187,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/FocusAnalytics.jsx",
              lineNumber: 186,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/FocusAnalytics.jsx",
            lineNumber: 182,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:187:10", "data-dynamic-content": "true", className: "bg-white rounded-2xl p-5 border border-border shadow-sm", children: [
            /* @__PURE__ */ jsxDEV("h3", { "data-source-location": "pages/FocusAnalytics:188:12", "data-dynamic-content": "false", className: "text-sm font-semibold text-foreground mb-4", children: "Pomodoros por Dia" }, void 0, false, {
              fileName: "/app/src/pages/FocusAnalytics.jsx",
              lineNumber: 207,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:189:12", "data-dynamic-content": "true", className: "h-[180px]", children: /* @__PURE__ */ jsxDEV(ResponsiveContainer, { "data-source-location": "pages/FocusAnalytics:190:14", "data-dynamic-content": "true", width: "100%", height: "100%", children: /* @__PURE__ */ jsxDEV(BarChart, { "data-source-location": "pages/FocusAnalytics:191:16", "data-dynamic-content": "true", data: dailyData, margin: { top: 5, right: 5, left: -20, bottom: 0 }, children: [
              /* @__PURE__ */ jsxDEV(CartesianGrid, { "data-source-location": "pages/FocusAnalytics:192:18", "data-dynamic-content": "false", strokeDasharray: "3 3", stroke: "#F0EBE3" }, void 0, false, {
                fileName: "/app/src/pages/FocusAnalytics.jsx",
                lineNumber: 211,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(XAxis, { "data-source-location": "pages/FocusAnalytics:193:18", "data-dynamic-content": "true", dataKey: "day", tick: { fontSize: 11, fill: "#9CA3AF" }, axisLine: false, tickLine: false }, void 0, false, {
                fileName: "/app/src/pages/FocusAnalytics.jsx",
                lineNumber: 212,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(YAxis, { "data-source-location": "pages/FocusAnalytics:194:18", "data-dynamic-content": "true", tick: { fontSize: 11, fill: "#9CA3AF" }, axisLine: false, tickLine: false, allowDecimals: false }, void 0, false, {
                fileName: "/app/src/pages/FocusAnalytics.jsx",
                lineNumber: 213,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                Tooltip,
                {
                  "data-source-location": "pages/FocusAnalytics:195:18",
                  "data-dynamic-content": "true",
                  contentStyle: { borderRadius: 12, border: "1px solid #E8E0D8", background: "#fff", fontSize: 12 },
                  formatter: (value) => [`${value} 🍊`, "Pomodoros"],
                  labelFormatter: (label, payload) => payload?.[0]?.payload?.date ? `Dia ${payload[0].payload.date}` : label
                },
                void 0,
                false,
                {
                  fileName: "/app/src/pages/FocusAnalytics.jsx",
                  lineNumber: 214,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(Bar, { "data-source-location": "pages/FocusAnalytics:198:18", "data-dynamic-content": "true", dataKey: "count", radius: [8, 8, 0, 0], fill: "#E87A5A", maxBarSize: 36 }, void 0, false, {
                fileName: "/app/src/pages/FocusAnalytics.jsx",
                lineNumber: 217,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/FocusAnalytics.jsx",
              lineNumber: 210,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/FocusAnalytics.jsx",
              lineNumber: 209,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/FocusAnalytics.jsx",
              lineNumber: 208,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/FocusAnalytics.jsx",
            lineNumber: 206,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:205:10", "data-dynamic-content": "true", className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            tagDistribution.length > 0 && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:207:14", "data-dynamic-content": "true", className: "bg-white rounded-2xl p-5 border border-border shadow-sm", children: [
              /* @__PURE__ */ jsxDEV("h3", { "data-source-location": "pages/FocusAnalytics:208:16", "data-dynamic-content": "false", className: "text-sm font-semibold text-foreground mb-3", children: "Por Tag" }, void 0, false, {
                fileName: "/app/src/pages/FocusAnalytics.jsx",
                lineNumber: 227,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:209:16", "data-dynamic-content": "true", className: "h-[180px]", children: /* @__PURE__ */ jsxDEV(ResponsiveContainer, { "data-source-location": "pages/FocusAnalytics:210:18", "data-dynamic-content": "true", width: "100%", height: "100%", children: /* @__PURE__ */ jsxDEV(PieChart, { "data-source-location": "pages/FocusAnalytics:211:20", "data-dynamic-content": "true", children: [
                /* @__PURE__ */ jsxDEV(Pie, { "data-source-location": "pages/FocusAnalytics:212:22", "data-dynamic-content": "true", data: tagDistribution, dataKey: "value", nameKey: "name", cx: "50%", cy: "50%", outerRadius: 60, innerRadius: 35, strokeWidth: 3, stroke: "#fff", children: tagDistribution.map((entry, i) => /* @__PURE__ */ jsxDEV(Cell, { "data-source-location": "pages/FocusAnalytics:213:60", "data-dynamic-content": "true", fill: entry.color }, i, false, {
                  fileName: "/app/src/pages/FocusAnalytics.jsx",
                  lineNumber: 232,
                  columnNumber: 60
                }, this)) }, void 0, false, {
                  fileName: "/app/src/pages/FocusAnalytics.jsx",
                  lineNumber: 231,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV(
                  Tooltip,
                  {
                    "data-source-location": "pages/FocusAnalytics:215:22",
                    "data-dynamic-content": "true",
                    contentStyle: { borderRadius: 12, border: "1px solid #E8E0D8", background: "#fff", fontSize: 12 },
                    formatter: (value) => [`${value} 🍊`, "Pomodoros"]
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/src/pages/FocusAnalytics.jsx",
                    lineNumber: 234,
                    columnNumber: 23
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/src/pages/FocusAnalytics.jsx",
                lineNumber: 230,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "/app/src/pages/FocusAnalytics.jsx",
                lineNumber: 229,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/src/pages/FocusAnalytics.jsx",
                lineNumber: 228,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:220:16", "data-dynamic-content": "true", className: "space-y-1 mt-2", children: tagDistribution.slice(0, 5).map(
                (entry, i) => /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:222:20", "data-dynamic-content": "true", className: "flex items-center gap-2 text-[10px]", children: [
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:223:22", "data-dynamic-content": "true", className: "w-2.5 h-2.5 rounded-full flex-shrink-0", style: { backgroundColor: entry.color } }, void 0, false, {
                    fileName: "/app/src/pages/FocusAnalytics.jsx",
                    lineNumber: 242,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusAnalytics:224:22", "data-dynamic-content": "true", className: "text-muted-foreground truncate", "data-collection-item-field": "name", "data-collection-item-id": entry?.id || entry?._id, children: entry.name }, void 0, false, {
                    fileName: "/app/src/pages/FocusAnalytics.jsx",
                    lineNumber: 243,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusAnalytics:225:22", "data-dynamic-content": "true", className: "text-foreground font-medium ml-auto", "data-collection-item-field": "value", "data-collection-item-id": entry?.id || entry?._id, children: entry.value }, void 0, false, {
                    fileName: "/app/src/pages/FocusAnalytics.jsx",
                    lineNumber: 244,
                    columnNumber: 23
                  }, this)
                ] }, i, true, {
                  fileName: "/app/src/pages/FocusAnalytics.jsx",
                  lineNumber: 241,
                  columnNumber: 17
                }, this)
              ) }, void 0, false, {
                fileName: "/app/src/pages/FocusAnalytics.jsx",
                lineNumber: 239,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/FocusAnalytics.jsx",
              lineNumber: 226,
              columnNumber: 13
            }, this),
            hourlyData.length > 0 && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:233:14", "data-dynamic-content": "true", className: "bg-white rounded-2xl p-5 border border-border shadow-sm", children: [
              /* @__PURE__ */ jsxDEV("h3", { "data-source-location": "pages/FocusAnalytics:234:16", "data-dynamic-content": "false", className: "text-sm font-semibold text-foreground mb-3", children: "Foco por Hora" }, void 0, false, {
                fileName: "/app/src/pages/FocusAnalytics.jsx",
                lineNumber: 253,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:235:16", "data-dynamic-content": "true", className: "h-[180px]", children: /* @__PURE__ */ jsxDEV(ResponsiveContainer, { "data-source-location": "pages/FocusAnalytics:236:18", "data-dynamic-content": "true", width: "100%", height: "100%", children: /* @__PURE__ */ jsxDEV(BarChart, { "data-source-location": "pages/FocusAnalytics:237:20", "data-dynamic-content": "true", data: hourlyData, margin: { top: 5, right: 5, left: -20, bottom: 0 }, layout: "vertical", children: [
                /* @__PURE__ */ jsxDEV(CartesianGrid, { "data-source-location": "pages/FocusAnalytics:238:22", "data-dynamic-content": "false", strokeDasharray: "3 3", stroke: "#F0EBE3", horizontal: false }, void 0, false, {
                  fileName: "/app/src/pages/FocusAnalytics.jsx",
                  lineNumber: 257,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV(XAxis, { "data-source-location": "pages/FocusAnalytics:239:22", "data-dynamic-content": "true", type: "number", tick: { fontSize: 10, fill: "#9CA3AF" }, axisLine: false, tickLine: false, allowDecimals: false }, void 0, false, {
                  fileName: "/app/src/pages/FocusAnalytics.jsx",
                  lineNumber: 258,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV(YAxis, { "data-source-location": "pages/FocusAnalytics:240:22", "data-dynamic-content": "true", dataKey: "hour", type: "category", tick: { fontSize: 10, fill: "#9CA3AF" }, axisLine: false, tickLine: false, width: 35 }, void 0, false, {
                  fileName: "/app/src/pages/FocusAnalytics.jsx",
                  lineNumber: 259,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV(Tooltip, { "data-source-location": "pages/FocusAnalytics:241:22", "data-dynamic-content": "true", contentStyle: { borderRadius: 12, border: "1px solid #E8E0D8", background: "#fff", fontSize: 12 } }, void 0, false, {
                  fileName: "/app/src/pages/FocusAnalytics.jsx",
                  lineNumber: 260,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV(Bar, { "data-source-location": "pages/FocusAnalytics:242:22", "data-dynamic-content": "true", dataKey: "count", radius: [0, 6, 6, 0], fill: "#A78BFA", maxBarSize: 14 }, void 0, false, {
                  fileName: "/app/src/pages/FocusAnalytics.jsx",
                  lineNumber: 261,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/FocusAnalytics.jsx",
                lineNumber: 256,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "/app/src/pages/FocusAnalytics.jsx",
                lineNumber: 255,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/src/pages/FocusAnalytics.jsx",
                lineNumber: 254,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/FocusAnalytics.jsx",
              lineNumber: 252,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/FocusAnalytics.jsx",
            lineNumber: 224,
            columnNumber: 11
          }, this),
          completedFocus.slice(0, 6).length > 0 && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:252:12", "data-dynamic-content": "true", className: "bg-white rounded-2xl p-5 border border-border shadow-sm", children: [
            /* @__PURE__ */ jsxDEV("h3", { "data-source-location": "pages/FocusAnalytics:253:14", "data-dynamic-content": "false", className: "text-sm font-semibold text-foreground mb-3", children: "Sessões Recentes" }, void 0, false, {
              fileName: "/app/src/pages/FocusAnalytics.jsx",
              lineNumber: 272,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:254:14", "data-dynamic-content": "true", className: "space-y-2", children: completedFocus.slice(0, 6).map((s) => {
              const cls = {
                blue: "bg-blue-100 text-blue-700",
                purple: "bg-purple-100 text-purple-700",
                green: "bg-emerald-100 text-emerald-700",
                amber: "bg-amber-100 text-amber-700",
                rose: "bg-rose-100 text-rose-600",
                teal: "bg-teal-100 text-teal-700",
                indigo: "bg-indigo-100 text-indigo-700",
                pink: "bg-pink-100 text-pink-700"
              }[s.tag_color] || "bg-slate-100 text-slate-700";
              return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusAnalytics:263:20", "data-dynamic-content": "true", className: "flex items-center gap-2 text-sm", "data-collection-item-id": s?.id, children: [
                /* @__PURE__ */ jsxDEV(CheckCircle, { "data-source-location": "pages/FocusAnalytics:264:22", "data-dynamic-content": "false", className: "w-4 h-4 text-emerald-500 flex-shrink-0" }, void 0, false, {
                  fileName: "/app/src/pages/FocusAnalytics.jsx",
                  lineNumber: 283,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusAnalytics:265:22", "data-dynamic-content": "true", className: `px-2 py-0.5 rounded-md text-[11px] font-medium ${cls}`, children: s.tag_name || "Foco" }, void 0, false, {
                  fileName: "/app/src/pages/FocusAnalytics.jsx",
                  lineNumber: 284,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusAnalytics:266:22", "data-dynamic-content": "true", className: "text-xs text-muted-foreground ml-auto", "data-collection-item-field": "duration_minutes", "data-collection-item-id": s?.id, children: [
                  s.duration_minutes,
                  "min • ",
                  format(new Date(s.created_date), "d MMM", { locale: pt })
                ] }, void 0, true, {
                  fileName: "/app/src/pages/FocusAnalytics.jsx",
                  lineNumber: 285,
                  columnNumber: 23
                }, this)
              ] }, s.id, true, {
                fileName: "/app/src/pages/FocusAnalytics.jsx",
                lineNumber: 282,
                columnNumber: 19
              }, this);
            }) }, void 0, false, {
              fileName: "/app/src/pages/FocusAnalytics.jsx",
              lineNumber: 273,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/FocusAnalytics.jsx",
            lineNumber: 271,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/FocusAnalytics.jsx",
          lineNumber: 144,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/pages/FocusAnalytics.jsx",
        lineNumber: 133,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/app/src/pages/FocusAnalytics.jsx",
      lineNumber: 125,
      columnNumber: 5
    },
    this
  );
}
_s(FocusAnalytics, "w89ruyXKKLSoOZw5QWTkjcN6J+w=", false, function() {
  return [useNavigate];
});
_c = FocusAnalytics;
var _c;
$RefreshReg$(_c, "FocusAnalytics");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/pages/FocusAnalytics.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/pages/FocusAnalytics.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBb0hZOzs7Ozs7Ozs7Ozs7Ozs7OztBQXBIWixTQUFTQSxVQUFVQyxXQUFXQyxTQUFTQyxhQUFhQyxjQUFjO0FBQ2xFLFNBQVNDLG1CQUFtQjtBQUM1QixTQUFTQyxjQUFjO0FBQ3ZCLFNBQVNDLFdBQVdDLFlBQVlDLE9BQU9DLGFBQWFDLFFBQVFDLFdBQVc7QUFDdkUsU0FBU0MsY0FBYztBQUN2QixTQUFTQyxVQUFVQyxLQUFLQyxPQUFPQyxPQUFPQyxlQUFlQyxTQUFTQyxxQkFBcUJDLFVBQVVDLEtBQUtDLE1BQU1DLFdBQVdDLE1BQU1DLE1BQU1DLGlCQUFpQjtBQUNoSixTQUFTQyxRQUFRQyxhQUFhQyxXQUFXQyxtQkFBbUJDLGtCQUFrQkMsZ0JBQWdCO0FBQzlGLFNBQVNDLFVBQVU7QUFFbkIsTUFBTUMsbUJBQW1CLENBQUMsS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssR0FBRztBQUUzRCxNQUFNQyxtQkFBbUI7QUFBQSxFQUN2QkMsTUFBTTtBQUFBLEVBQVdDLFFBQVE7QUFBQSxFQUFXQyxPQUFPO0FBQUEsRUFDM0NDLE9BQU87QUFBQSxFQUFXQyxNQUFNO0FBQUEsRUFBV0MsTUFBTTtBQUFBLEVBQ3pDQyxRQUFRO0FBQUEsRUFBV0MsTUFBTTtBQUMzQjtBQUVBLHdCQUF3QkMsaUJBQWlCO0FBQUFDLEtBQUE7QUFDdkMsUUFBTUMsV0FBVzFDLFlBQVk7QUFDN0IsUUFBTSxDQUFDMkMsVUFBVUMsV0FBVyxJQUFJakQsU0FBUyxFQUFFO0FBQzNDLFFBQU1rRCxhQUFhOUMsT0FBTyxFQUFFK0MsR0FBRyxHQUFHQyxHQUFHLEVBQUUsQ0FBQztBQUN4QyxRQUFNQyxhQUFhakQsT0FBTyxFQUFFK0MsR0FBRyxHQUFHQyxHQUFHLEVBQUUsQ0FBQztBQUN4QyxRQUFNLENBQUNFLFdBQVdDLFlBQVksSUFBSXZELFNBQVMsQ0FBQyxDQUFDO0FBRTdDQyxZQUFVLE1BQU07QUFDZFksV0FBTzJDLFNBQVNDLGFBQWFDLEtBQUssaUJBQWlCLEdBQUcsRUFBRUMsS0FBS1YsV0FBVyxFQUFFVyxNQUFNLE1BQU1YLFlBQVksRUFBRSxDQUFDO0FBQUEsRUFDdkcsR0FBRyxFQUFFO0FBRUwsUUFBTVksUUFBUSxvQkFBSUMsS0FBSztBQUN2QixRQUFNQyxXQUFXbkMsT0FBT2lDLE9BQU8sWUFBWTtBQUMzQyxRQUFNRyxZQUFZbkMsWUFBWWdDLE9BQU8sRUFBRUksY0FBYyxFQUFFLENBQUM7QUFDeEQsUUFBTUMsVUFBVXBDLFVBQVUrQixPQUFPLEVBQUVJLGNBQWMsRUFBRSxDQUFDO0FBQ3BELFFBQU1FLFdBQVdwQyxrQkFBa0IsRUFBRXFDLE9BQU9KLFdBQVdLLEtBQUtILFFBQVEsQ0FBQztBQUVyRSxRQUFNSSxpQkFBaUJwRSxRQUFRLE1BQy9COEMsU0FBU3VCLE9BQU8sQ0FBQ0MsTUFBTUEsRUFBRUMsU0FBUyxXQUFXRCxFQUFFRSxTQUFTLEdBQUcsQ0FBQzFCLFFBQVEsQ0FBQztBQUVyRSxRQUFNMkIsYUFBYUwsZUFBZUMsT0FBTyxDQUFDQyxNQUFNNUMsT0FBTyxJQUFJa0MsS0FBS1UsRUFBRUksWUFBWSxHQUFHLFlBQVksTUFBTWIsUUFBUSxFQUFFYztBQUM3RyxRQUFNQyxZQUFZUixlQUFlQyxPQUFPLENBQUNDLE1BQU14QyxpQkFBaUIsSUFBSThCLEtBQUtVLEVBQUVJLFlBQVksR0FBRyxFQUFFUixPQUFPSixXQUFXSyxLQUFLSCxRQUFRLENBQUMsQ0FBQyxFQUFFVztBQUMvSCxRQUFNRSxnQkFBZ0JULGVBQWVVLE9BQU8sQ0FBQ0MsS0FBS1QsTUFBTVMsT0FBT1QsRUFBRVUsb0JBQW9CLElBQUksQ0FBQztBQUMxRixRQUFNQyxhQUFhQyxLQUFLQyxNQUFNTixnQkFBZ0IsRUFBRTtBQUNoRCxRQUFNTyxpQkFBaUJQLGdCQUFnQjtBQUd2QyxRQUFNUSxZQUFZcEIsU0FBU3FCLElBQUksQ0FBQ0MsR0FBR0MsTUFBTTtBQUN2QyxVQUFNQyxNQUFNL0QsT0FBTzZELEdBQUcsWUFBWTtBQUNsQyxVQUFNRyxRQUFRdEIsZUFBZUMsT0FBTyxDQUFDQyxNQUFNNUMsT0FBTyxJQUFJa0MsS0FBS1UsRUFBRUksWUFBWSxHQUFHLFlBQVksTUFBTWUsR0FBRyxFQUFFZDtBQUNuRyxXQUFPLEVBQUVnQixLQUFLMUQsaUJBQWlCdUQsQ0FBQyxHQUFHRSxPQUFPRSxNQUFNbEUsT0FBTzZELEdBQUcsR0FBRyxFQUFFO0FBQUEsRUFDakUsQ0FBQztBQUdELFFBQU1NLGtCQUFrQjdGLFFBQVEsTUFBTTtBQUNwQyxVQUFNc0YsTUFBTSxDQUFDO0FBQ2JsQixtQkFBZTBCLFFBQVEsQ0FBQ3hCLE1BQU07QUFDNUIsWUFBTXlCLE9BQU96QixFQUFFMEIsWUFBWTtBQUMzQlYsVUFBSVMsSUFBSSxLQUFLVCxJQUFJUyxJQUFJLEtBQUssS0FBSztBQUFBLElBQ2pDLENBQUM7QUFDRCxXQUFPRSxPQUFPQyxRQUFRWixHQUFHLEVBQUVBLElBQUksQ0FBQyxDQUFDUyxNQUFNSSxLQUFLLE9BQU87QUFBQSxNQUNqREo7QUFBQUEsTUFBTUk7QUFBQUEsTUFDTkMsT0FBT2xFLGlCQUFpQmtDLGVBQWVpQyxLQUFLLENBQUMvQixPQUFPQSxFQUFFMEIsWUFBWSxlQUFlRCxJQUFJLEdBQUdPLFNBQVMsS0FBSztBQUFBLElBQ3hHLEVBQUU7QUFBQSxFQUNKLEdBQUcsQ0FBQ2xDLGNBQWMsQ0FBQztBQUduQixRQUFNbUMsY0FBY3ZHLFFBQVEsTUFBTTtBQUNoQyxXQUFPd0csTUFBTUMsS0FBSyxFQUFFOUIsUUFBUSxFQUFFLEdBQUcsQ0FBQytCLEdBQUdsQixNQUFNO0FBQ3pDLFlBQU1tQixLQUFLaEYsWUFBWUksU0FBUzRCLE9BQU8sSUFBSTZCLENBQUMsR0FBRyxFQUFFekIsY0FBYyxFQUFFLENBQUM7QUFDbEUsWUFBTTZDLEtBQUtoRixVQUFVRyxTQUFTNEIsT0FBTyxJQUFJNkIsQ0FBQyxHQUFHLEVBQUV6QixjQUFjLEVBQUUsQ0FBQztBQUNoRSxZQUFNMkIsUUFBUXRCLGVBQWVDLE9BQU8sQ0FBQ0MsTUFBTXhDLGlCQUFpQixJQUFJOEIsS0FBS1UsRUFBRUksWUFBWSxHQUFHLEVBQUVSLE9BQU95QyxJQUFJeEMsS0FBS3lDLEdBQUcsQ0FBQyxDQUFDLEVBQUVqQztBQUMvRyxhQUFPLEVBQUVrQyxNQUFNLE9BQU9yQixJQUFJLENBQUMsSUFBSUUsTUFBTTtBQUFBLElBQ3ZDLENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQ3RCLGdCQUFnQlQsS0FBSyxDQUFDO0FBRzFCLFFBQU1tRCxhQUFhOUcsUUFBUSxNQUFNO0FBQy9CLFVBQU0rRyxRQUFRUCxNQUFNQyxLQUFLLEVBQUU5QixRQUFRLEdBQUcsR0FBRyxDQUFDK0IsR0FBR2xCLE9BQU8sRUFBRXdCLE1BQU0sR0FBR3hCLENBQUMsS0FBS0UsT0FBTyxFQUFFLEVBQUU7QUFDaEZ0QixtQkFBZTBCLFFBQVEsQ0FBQ3hCLE1BQU07QUFDNUIsWUFBTWlCLElBQUksSUFBSTNCLEtBQUtVLEVBQUVJLFlBQVk7QUFDakNxQyxZQUFNeEIsRUFBRTBCLFNBQVMsQ0FBQyxFQUFFdkI7QUFBQUEsSUFDdEIsQ0FBQztBQUNELFdBQU9xQixNQUFNMUMsT0FBTyxDQUFDNkMsTUFBTUEsRUFBRXhCLFFBQVEsQ0FBQztBQUFBLEVBQ3hDLEdBQUcsQ0FBQ3RCLGNBQWMsQ0FBQztBQUduQixRQUFNK0MsU0FBU25ILFFBQVEsTUFBTTtBQUMzQixRQUFJc0UsSUFBSTtBQUNSLFVBQU1pQixJQUFJLElBQUkzQixLQUFLRCxLQUFLO0FBQ3hCLFdBQU8sTUFBTTtBQUNYLFlBQU04QixNQUFNL0QsT0FBTzZELEdBQUcsWUFBWTtBQUNsQyxZQUFNRyxRQUFRdEIsZUFBZUMsT0FBTyxDQUFDQyxPQUFNNUMsT0FBTyxJQUFJa0MsS0FBS1UsR0FBRUksWUFBWSxHQUFHLFlBQVksTUFBTWUsR0FBRyxFQUFFZDtBQUNuRyxVQUFJZSxVQUFVLEVBQUc7QUFDakJwQjtBQUNBaUIsUUFBRTZCLFFBQVE3QixFQUFFOEIsUUFBUSxJQUFJLENBQUM7QUFBQSxJQUMzQjtBQUNBLFdBQU8vQztBQUFBQSxFQUNULEdBQUcsQ0FBQ0YsZ0JBQWdCVCxLQUFLLENBQUM7QUFFMUIsUUFBTTJELHFCQUFxQnJILFlBQVksQ0FBQ2dELEdBQUdDLE1BQU07QUFBQ0YsZUFBV3VFLFVBQVUsRUFBRXRFLEdBQUdDLEVBQUU7QUFBRUMsZUFBV29FLFVBQVUsRUFBRXRFLEdBQUcsR0FBR0MsR0FBRyxFQUFFO0FBQUVHLGlCQUFhLENBQUMsQ0FBQztBQUFBLEVBQUUsR0FBRyxFQUFFO0FBQzFJLFFBQU1tRSxvQkFBb0J2SCxZQUFZLENBQUNnRCxHQUFHQyxNQUFNO0FBQUNDLGVBQVdvRSxVQUFVLEVBQUV0RSxHQUFHQSxJQUFJRCxXQUFXdUUsUUFBUXRFLEdBQUdDLEdBQUdBLElBQUlGLFdBQVd1RSxRQUFRckUsRUFBRTtBQUFFRyxpQkFBYSxFQUFFb0UsV0FBVyxhQUFhdEUsV0FBV29FLFFBQVF0RSxDQUFDLE9BQU9FLFdBQVdvRSxRQUFRckUsQ0FBQyxPQUFPd0UsWUFBWSxPQUFPLENBQUM7QUFBQSxFQUFFLEdBQUcsRUFBRTtBQUMzUCxRQUFNQyxtQkFBbUIxSCxZQUFZLENBQUNnRCxHQUFHQyxNQUFNO0FBQzdDRyxpQkFBYSxFQUFFb0UsV0FBVyxtQkFBbUJDLFlBQVksMEJBQTBCLENBQUM7QUFDcEYsUUFBSXhFLElBQUlGLFdBQVd1RSxRQUFRckUsSUFBSSxJQUFLTCxVQUFTLFFBQVE7QUFBQSxFQUN2RCxHQUFHLENBQUNBLFFBQVEsQ0FBQztBQUViLFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUFJLHdCQUFxQjtBQUFBLE1BQTZCLHdCQUFxQjtBQUFBLE1BQU8sV0FBVTtBQUFBLE1BQzdGLGNBQWMsQ0FBQytFLE1BQU1OLG1CQUFtQk0sRUFBRUMsUUFBUSxDQUFDLEVBQUVDLFNBQVNGLEVBQUVDLFFBQVEsQ0FBQyxFQUFFRSxPQUFPO0FBQUEsTUFDbEYsYUFBYSxDQUFDSCxNQUFNSixrQkFBa0JJLEVBQUVDLFFBQVEsQ0FBQyxFQUFFQyxTQUFTRixFQUFFQyxRQUFRLENBQUMsRUFBRUUsT0FBTztBQUFBLE1BQ2hGLFlBQVksQ0FBQ0gsTUFBTUQsaUJBQWlCQyxFQUFFSSxlQUFlLENBQUMsR0FBR0YsV0FBVzlFLFdBQVd1RSxRQUFRdEUsR0FBRzJFLEVBQUVJLGVBQWUsQ0FBQyxHQUFHRCxXQUFXL0UsV0FBV3VFLFFBQVFyRSxDQUFDO0FBQUEsTUFDOUksYUFBYSxDQUFDMEUsTUFBTU4sbUJBQW1CTSxFQUFFRSxTQUFTRixFQUFFRyxPQUFPO0FBQUEsTUFDM0QsYUFBYSxDQUFDSCxNQUFNO0FBQUMsWUFBSUEsRUFBRUssWUFBWSxFQUFHVCxtQkFBa0JJLEVBQUVFLFNBQVNGLEVBQUVHLE9BQU87QUFBQSxNQUFFO0FBQUEsTUFDbEYsV0FBVyxDQUFDSCxNQUFNRCxpQkFBaUJDLEVBQUVFLFNBQVNGLEVBQUVHLE9BQU87QUFBQSxNQUVyRCxpQ0FBQyxTQUFJLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sT0FBTzNFLFdBQVcsV0FBVSx3QkFDN0c7QUFBQSwrQkFBQyxTQUFJLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sV0FBVSxxRUFDM0Y7QUFBQSxpQ0FBQyxZQUFPLHdCQUFxQiwrQkFBOEIsd0JBQXFCLFFBQU8sU0FBUyxNQUFNUCxTQUFTLFFBQVEsR0FBRyxXQUFVLG1KQUNsSSxpQ0FBQyxhQUFVLHdCQUFxQiwrQkFBOEIsd0JBQXFCLFNBQVEsV0FBVSxhQUFyRztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUE4RyxLQURoSDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsVUFDQSx1QkFBQyxTQUFJLHdCQUFxQiwrQkFBOEIsd0JBQXFCLFFBQzNFO0FBQUEsbUNBQUMsUUFBRyx3QkFBcUIsK0JBQThCLHdCQUFxQixTQUFRLFdBQVUscUNBQW9DLHlCQUFsSTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUEySTtBQUFBLFlBQzNJLHVCQUFDLE9BQUUsd0JBQXFCLCtCQUE4Qix3QkFBcUIsUUFBTyxXQUFVLHFDQUFxQ25CLGlCQUFPaUMsT0FBTyxxQkFBcUIsRUFBRXVFLFFBQVFsRyxHQUFHLENBQUMsS0FBbEw7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBb0w7QUFBQSxlQUZ0TDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUdBO0FBQUEsYUFQRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBUUE7QUFBQSxRQUVBLHVCQUFDLFNBQUksd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFVLHNDQUUzRjtBQUFBLGlDQUFDLFNBQUksd0JBQXFCLCtCQUE4Qix3QkFBcUIsUUFBTyxXQUFVLDBCQUMzRjtBQUFBLFlBQ0QsRUFBRW1HLE1BQU0xSCxRQUFRMkYsT0FBTyxrQkFBa0JnQyxJQUFJLG1CQUFtQkMsT0FBTyxRQUFRbEMsT0FBTzFCLFlBQVk2RCxNQUFNLFlBQVk7QUFBQSxZQUNwSCxFQUFFSCxNQUFNN0gsWUFBWThGLE9BQU8sbUJBQW1CZ0MsSUFBSSxpQkFBaUJDLE9BQU8sVUFBVWxDLE9BQU92QixXQUFXMEQsTUFBTSxZQUFZO0FBQUEsWUFDeEgsRUFBRUgsTUFBTTNILGFBQWE0RixPQUFPLG9CQUFvQmdDLElBQUksa0JBQWtCQyxPQUFPLFNBQVNsQyxPQUFPL0IsZUFBZU8sUUFBUTJELE1BQU0sWUFBWTtBQUFBLFlBQ3RJLEVBQUVILE1BQU01SCxPQUFPNkYsT0FBTyxrQkFBa0JnQyxJQUFJLGdCQUFnQkMsT0FBTyxRQUFRbEMsT0FBTyxHQUFHbEIsVUFBVSxLQUFLRyxjQUFjLEtBQUtrRCxNQUFNLFFBQVE7QUFBQSxVQUFDLEVBQ3RJaEQ7QUFBQUEsWUFBSSxDQUFDaUQsTUFBTS9DLE1BQ1g7QUFBQSxjQUFDLE9BQU87QUFBQSxjQUFQO0FBQUEsZ0JBQVcsd0JBQXFCO0FBQUEsZ0JBQThCLHdCQUFxQjtBQUFBLGdCQUFlLFNBQVMsRUFBRWdELFNBQVMsR0FBR3RGLEdBQUcsR0FBRztBQUFBLGdCQUFHLFNBQVMsRUFBRXNGLFNBQVMsR0FBR3RGLEdBQUcsRUFBRTtBQUFBLGdCQUFHLFlBQVksRUFBRXVGLE9BQU9qRCxJQUFJLEtBQUs7QUFBQSxnQkFDaE0sV0FBVTtBQUFBLGdCQUNOO0FBQUEseUNBQUMsU0FBSSx3QkFBcUIsK0JBQThCLHdCQUFxQixRQUFPLFdBQVUsZ0NBQzVGO0FBQUEsMkNBQUMsU0FBSSx3QkFBcUIsK0JBQThCLHdCQUFxQixRQUFPLFdBQVcsc0JBQXNCK0MsS0FBS0gsRUFBRSxxQ0FDMUgsaUNBQUMsS0FBSyxNQUFMLEVBQVUsd0JBQXFCLCtCQUE4Qix3QkFBcUIsUUFBTyxXQUFXLFdBQVdHLEtBQUtuQyxLQUFLLE1BQTFIO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkJBQTZILEtBRC9IO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkJBRUE7QUFBQSxvQkFDQSx1QkFBQyxVQUFLLHdCQUFxQiwrQkFBOEIsd0JBQXFCLFFBQU8sV0FBVSx5Q0FBd0MsOEJBQTJCLFNBQVEsMkJBQXlCbUMsTUFBTUcsTUFBTUgsTUFBTUksS0FBTUosZUFBS0YsU0FBaE87QUFBQTtBQUFBO0FBQUE7QUFBQSwyQkFBc087QUFBQSx1QkFKeE87QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFLQTtBQUFBLGtCQUNBLHVCQUFDLFNBQUksd0JBQXFCLCtCQUE4Qix3QkFBcUIsUUFBTyxXQUFXLHNCQUFzQkUsS0FBS25DLEtBQUssSUFBSSw4QkFBMkIsU0FBUSwyQkFBeUJtQyxNQUFNRyxNQUFNSCxNQUFNSSxLQUFNSixlQUFLcEMsU0FBNU47QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBa087QUFBQSxrQkFDbE8sdUJBQUMsT0FBRSx3QkFBcUIsK0JBQThCLHdCQUFxQixRQUFPLFdBQVUscUNBQW9DLDhCQUEyQixRQUFPLDJCQUF5Qm9DLE1BQU1HLE1BQU1ILE1BQU1JLEtBQU1KLGVBQUtELFFBQXhOO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQTZOO0FBQUE7QUFBQTtBQUFBLGNBVGpJOUM7QUFBQUEsY0FBaEc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQVVFO0FBQUEsVUFDRixLQWxCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQW1CQTtBQUFBLFVBR0MyQixTQUFTLEtBQ1YsdUJBQUMsU0FBSSx3QkFBcUIsK0JBQThCLHdCQUFxQixRQUFPLFdBQVUsMkRBQzFGLGlDQUFDLFNBQUksd0JBQXFCLCtCQUE4Qix3QkFBcUIsUUFBTyxXQUFVLDJCQUM1RjtBQUFBLG1DQUFDLFNBQUksd0JBQXFCLCtCQUE4Qix3QkFBcUIsU0FBUSxXQUFVLGdGQUErRSxrQkFBOUs7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBZ0w7QUFBQSxZQUNoTCx1QkFBQyxTQUFJLHdCQUFxQiwrQkFBOEIsd0JBQXFCLFFBQzNFO0FBQUEscUNBQUMsT0FBRSx3QkFBcUIsK0JBQThCLHdCQUFxQixRQUFPLFdBQVUscUNBQW9DLDhCQUEyQixVQUFTO0FBQUE7QUFBQSxnQkFBY0E7QUFBQUEsZ0JBQU87QUFBQSxnQkFBS0EsV0FBVyxJQUFJLE1BQU07QUFBQSxtQkFBbk47QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBc047QUFBQSxjQUN0Tix1QkFBQyxPQUFFLHdCQUFxQiwrQkFBOEIsd0JBQXFCLFNBQVEsV0FBVSxxQ0FBb0MsMENBQWpJO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQTJKO0FBQUEsaUJBRjdKO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBR0E7QUFBQSxZQUNBLHVCQUFDLFNBQUksd0JBQXFCLCtCQUE4Qix3QkFBcUIsUUFBTyxXQUFVLDZDQUE0Qyw4QkFBMkIsVUFBVUEsb0JBQS9LO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQXNMO0FBQUEsZUFOeEw7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFPQSxLQVJKO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBU0U7QUFBQSxVQUlGLHVCQUFDLFNBQUksd0JBQXFCLCtCQUE4Qix3QkFBcUIsUUFBTyxXQUFVLDJEQUM1RjtBQUFBLG1DQUFDLFFBQUcsd0JBQXFCLCtCQUE4Qix3QkFBcUIsU0FBUSxXQUFVLHNFQUM1RjtBQUFBLHFDQUFDLE9BQUksd0JBQXFCLCtCQUE4Qix3QkFBcUIsU0FBUSxXQUFVLDRCQUEvRjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUF1SDtBQUFBLGNBQUc7QUFBQSxpQkFENUg7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFQTtBQUFBLFlBQ0EsdUJBQUMsU0FBSSx3QkFBcUIsK0JBQThCLHdCQUFxQixRQUFPLFdBQVUsYUFDNUYsaUNBQUMsdUJBQW9CLHdCQUFxQiwrQkFBOEIsd0JBQXFCLFFBQU8sT0FBTSxRQUFPLFFBQU8sUUFDdEgsaUNBQUMsYUFBVSx3QkFBcUIsK0JBQThCLHdCQUFxQixRQUFPLE1BQU1aLGFBQWEsUUFBUSxFQUFFcUMsS0FBSyxHQUFHQyxPQUFPLEdBQUdDLE1BQU0sS0FBS0MsUUFBUSxFQUFFLEdBQzVKO0FBQUEscUNBQUMsVUFBSyx3QkFBcUIsK0JBQThCLHdCQUFxQixTQUM1RSxpQ0FBQyxvQkFBZSx3QkFBcUIsK0JBQThCLHdCQUFxQixTQUFRLElBQUcsWUFBVyxJQUFHLEtBQUksSUFBRyxLQUFJLElBQUcsS0FBSSxJQUFHLEtBQ3BJO0FBQUEsdUNBQUMsVUFBSyx3QkFBcUIsK0JBQThCLHdCQUFxQixTQUFRLFFBQU8sTUFBSyxXQUFVLFdBQVUsYUFBYSxPQUFuSTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUF1STtBQUFBLGdCQUN2SSx1QkFBQyxVQUFLLHdCQUFxQiwrQkFBOEIsd0JBQXFCLFNBQVEsUUFBTyxRQUFPLFdBQVUsV0FBVSxhQUFhLEtBQXJJO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQXVJO0FBQUEsbUJBRnpJO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBR0EsS0FKRjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUtBO0FBQUEsY0FDQSx1QkFBQyxpQkFBYyx3QkFBcUIsK0JBQThCLHdCQUFxQixTQUFRLGlCQUFnQixPQUFNLFFBQU8sYUFBNUg7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBcUk7QUFBQSxjQUNySSx1QkFBQyxTQUFNLHdCQUFxQiwrQkFBOEIsd0JBQXFCLFFBQU8sU0FBUSxRQUFPLE1BQU0sRUFBRUMsVUFBVSxJQUFJQyxNQUFNLFVBQVUsR0FBRyxVQUFVLE9BQU8sVUFBVSxTQUF6SztBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUErSztBQUFBLGNBQy9LLHVCQUFDLFNBQU0sd0JBQXFCLCtCQUE4Qix3QkFBcUIsUUFBTyxNQUFNLEVBQUVELFVBQVUsSUFBSUMsTUFBTSxVQUFVLEdBQUcsVUFBVSxPQUFPLFVBQVUsT0FBTyxlQUFlLFNBQWhMO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQXNMO0FBQUEsY0FDdEwsdUJBQUMsV0FBUSx3QkFBcUIsK0JBQThCLHdCQUFxQixRQUFPLGNBQWMsRUFBRUMsY0FBYyxJQUFJQyxRQUFRLHFCQUFxQkMsWUFBWSxRQUFRSixVQUFVLEdBQUcsS0FBeEw7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBMEw7QUFBQSxjQUMxTCx1QkFBQyxRQUFLLHdCQUFxQiwrQkFBOEIsd0JBQXFCLFNBQVEsTUFBSyxZQUFXLFNBQVEsU0FBUSxRQUFPLFdBQVUsYUFBYSxHQUFHLE1BQUssb0JBQTVKO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQTRLO0FBQUEsaUJBWDlLO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBWUEsS0FiRjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQWNBLEtBZkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFnQkE7QUFBQSxlQXBCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQXFCQTtBQUFBLFVBR0EsdUJBQUMsU0FBSSx3QkFBcUIsK0JBQThCLHdCQUFxQixRQUFPLFdBQVUsMkRBQzVGO0FBQUEsbUNBQUMsUUFBRyx3QkFBcUIsK0JBQThCLHdCQUFxQixTQUFRLFdBQVUsOENBQTZDLGlDQUEzSTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUE0SjtBQUFBLFlBQzVKLHVCQUFDLFNBQUksd0JBQXFCLCtCQUE4Qix3QkFBcUIsUUFBTyxXQUFVLGFBQzVGLGlDQUFDLHVCQUFvQix3QkFBcUIsK0JBQThCLHdCQUFxQixRQUFPLE9BQU0sUUFBTyxRQUFPLFFBQ3RILGlDQUFDLFlBQVMsd0JBQXFCLCtCQUE4Qix3QkFBcUIsUUFBTyxNQUFNM0QsV0FBVyxRQUFRLEVBQUV1RCxLQUFLLEdBQUdDLE9BQU8sR0FBR0MsTUFBTSxLQUFLQyxRQUFRLEVBQUUsR0FDeko7QUFBQSxxQ0FBQyxpQkFBYyx3QkFBcUIsK0JBQThCLHdCQUFxQixTQUFRLGlCQUFnQixPQUFNLFFBQU8sYUFBNUg7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBcUk7QUFBQSxjQUNySSx1QkFBQyxTQUFNLHdCQUFxQiwrQkFBOEIsd0JBQXFCLFFBQU8sU0FBUSxPQUFNLE1BQU0sRUFBRUMsVUFBVSxJQUFJQyxNQUFNLFVBQVUsR0FBRyxVQUFVLE9BQU8sVUFBVSxTQUF4SztBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUE4SztBQUFBLGNBQzlLLHVCQUFDLFNBQU0sd0JBQXFCLCtCQUE4Qix3QkFBcUIsUUFBTyxNQUFNLEVBQUVELFVBQVUsSUFBSUMsTUFBTSxVQUFVLEdBQUcsVUFBVSxPQUFPLFVBQVUsT0FBTyxlQUFlLFNBQWhMO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQXNMO0FBQUEsY0FDdEw7QUFBQSxnQkFBQztBQUFBO0FBQUEsa0JBQVEsd0JBQXFCO0FBQUEsa0JBQThCLHdCQUFxQjtBQUFBLGtCQUFPLGNBQWMsRUFBRUMsY0FBYyxJQUFJQyxRQUFRLHFCQUFxQkMsWUFBWSxRQUFRSixVQUFVLEdBQUc7QUFBQSxrQkFDeEwsV0FBVyxDQUFDN0MsVUFBVSxDQUFDLEdBQUdBLEtBQUssT0FBTyxXQUFXO0FBQUEsa0JBQ2pELGdCQUFnQixDQUFDa0MsT0FBT2dCLFlBQVlBLFVBQVUsQ0FBQyxHQUFHQSxTQUFTekQsT0FBTyxPQUFPeUQsUUFBUSxDQUFDLEVBQUVBLFFBQVF6RCxJQUFJLEtBQUt5QztBQUFBQTtBQUFBQSxnQkFGckc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBRTJHO0FBQUEsY0FDM0csdUJBQUMsT0FBSSx3QkFBcUIsK0JBQThCLHdCQUFxQixRQUFPLFNBQVEsU0FBUSxRQUFRLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLE1BQUssV0FBVSxZQUFZLE1BQXJKO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQXdKO0FBQUEsaUJBUDFKO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBUUEsS0FURjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQVVBLEtBWEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFZQTtBQUFBLGVBZEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFlQTtBQUFBLFVBR0EsdUJBQUMsU0FBSSx3QkFBcUIsK0JBQThCLHdCQUFxQixRQUFPLFdBQVUseUNBQzNGeEM7QUFBQUEsNEJBQWdCbEIsU0FBUyxLQUMxQix1QkFBQyxTQUFJLHdCQUFxQiwrQkFBOEIsd0JBQXFCLFFBQU8sV0FBVSwyREFDMUY7QUFBQSxxQ0FBQyxRQUFHLHdCQUFxQiwrQkFBOEIsd0JBQXFCLFNBQVEsV0FBVSw4Q0FBNkMsdUJBQTNJO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQWtKO0FBQUEsY0FDbEosdUJBQUMsU0FBSSx3QkFBcUIsK0JBQThCLHdCQUFxQixRQUFPLFdBQVUsYUFDNUYsaUNBQUMsdUJBQW9CLHdCQUFxQiwrQkFBOEIsd0JBQXFCLFFBQU8sT0FBTSxRQUFPLFFBQU8sUUFDdEgsaUNBQUMsWUFBUyx3QkFBcUIsK0JBQThCLHdCQUFxQixRQUNoRjtBQUFBLHVDQUFDLE9BQUksd0JBQXFCLCtCQUE4Qix3QkFBcUIsUUFBTyxNQUFNa0IsaUJBQWlCLFNBQVEsU0FBUSxTQUFRLFFBQU8sSUFBRyxPQUFNLElBQUcsT0FBTSxhQUFhLElBQUksYUFBYSxJQUFJLGFBQWEsR0FBRyxRQUFPLFFBQ2xOQSwwQkFBZ0JQLElBQUksQ0FBQ2dFLE9BQU85RCxNQUFNLHVCQUFDLFFBQUssd0JBQXFCLCtCQUE4Qix3QkFBcUIsUUFBZSxNQUFNOEQsTUFBTWxELFNBQWZaLEdBQTFGO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQStHLENBQUcsS0FEdko7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFFQTtBQUFBLGdCQUNBO0FBQUEsa0JBQUM7QUFBQTtBQUFBLG9CQUFRLHdCQUFxQjtBQUFBLG9CQUE4Qix3QkFBcUI7QUFBQSxvQkFBTyxjQUFjLEVBQUUwRCxjQUFjLElBQUlDLFFBQVEscUJBQXFCQyxZQUFZLFFBQVFKLFVBQVUsR0FBRztBQUFBLG9CQUMxTCxXQUFXLENBQUM3QyxVQUFVLENBQUMsR0FBR0EsS0FBSyxPQUFPLFdBQVc7QUFBQTtBQUFBLGtCQUQvQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBQ2lEO0FBQUEsbUJBTG5EO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBTUEsS0FQRjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQVFBLEtBVEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFVQTtBQUFBLGNBQ0EsdUJBQUMsU0FBSSx3QkFBcUIsK0JBQThCLHdCQUFxQixRQUFPLFdBQVUsa0JBQzNGTiwwQkFBZ0IwRCxNQUFNLEdBQUcsQ0FBQyxFQUFFakU7QUFBQUEsZ0JBQUksQ0FBQ2dFLE9BQU85RCxNQUMzQyx1QkFBQyxTQUFJLHdCQUFxQiwrQkFBOEIsd0JBQXFCLFFBQWUsV0FBVSx1Q0FDaEc7QUFBQSx5Q0FBQyxTQUFJLHdCQUFxQiwrQkFBOEIsd0JBQXFCLFFBQU8sV0FBVSwwQ0FBeUMsT0FBTyxFQUFFZ0UsaUJBQWlCRixNQUFNbEQsTUFBTSxLQUE3SztBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUErSztBQUFBLGtCQUMvSyx1QkFBQyxVQUFLLHdCQUFxQiwrQkFBOEIsd0JBQXFCLFFBQU8sV0FBVSxrQ0FBaUMsOEJBQTJCLFFBQU8sMkJBQXlCa0QsT0FBT1osTUFBTVksT0FBT1gsS0FBTVcsZ0JBQU12RCxRQUEzTjtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUFnTztBQUFBLGtCQUNoTyx1QkFBQyxVQUFLLHdCQUFxQiwrQkFBOEIsd0JBQXFCLFFBQU8sV0FBVSx1Q0FBc0MsOEJBQTJCLFNBQVEsMkJBQXlCdUQsT0FBT1osTUFBTVksT0FBT1gsS0FBTVcsZ0JBQU1uRCxTQUFqTztBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUF1TztBQUFBLHFCQUhwSlgsR0FBekY7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFJSTtBQUFBLGNBQ0osS0FQQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQVFBO0FBQUEsaUJBckJKO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBc0JFO0FBQUEsWUFHRHNCLFdBQVduQyxTQUFTLEtBQ3JCLHVCQUFDLFNBQUksd0JBQXFCLCtCQUE4Qix3QkFBcUIsUUFBTyxXQUFVLDJEQUMxRjtBQUFBLHFDQUFDLFFBQUcsd0JBQXFCLCtCQUE4Qix3QkFBcUIsU0FBUSxXQUFVLDhDQUE2Qyw2QkFBM0k7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBd0o7QUFBQSxjQUN4Six1QkFBQyxTQUFJLHdCQUFxQiwrQkFBOEIsd0JBQXFCLFFBQU8sV0FBVSxhQUM1RixpQ0FBQyx1QkFBb0Isd0JBQXFCLCtCQUE4Qix3QkFBcUIsUUFBTyxPQUFNLFFBQU8sUUFBTyxRQUN0SCxpQ0FBQyxZQUFTLHdCQUFxQiwrQkFBOEIsd0JBQXFCLFFBQU8sTUFBTW1DLFlBQVksUUFBUSxFQUFFOEIsS0FBSyxHQUFHQyxPQUFPLEdBQUdDLE1BQU0sS0FBS0MsUUFBUSxFQUFFLEdBQUcsUUFBTyxZQUNwSztBQUFBLHVDQUFDLGlCQUFjLHdCQUFxQiwrQkFBOEIsd0JBQXFCLFNBQVEsaUJBQWdCLE9BQU0sUUFBTyxXQUFVLFlBQVksU0FBbEo7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBd0o7QUFBQSxnQkFDeEosdUJBQUMsU0FBTSx3QkFBcUIsK0JBQThCLHdCQUFxQixRQUFPLE1BQUssVUFBUyxNQUFNLEVBQUVDLFVBQVUsSUFBSUMsTUFBTSxVQUFVLEdBQUcsVUFBVSxPQUFPLFVBQVUsT0FBTyxlQUFlLFNBQTlMO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQW9NO0FBQUEsZ0JBQ3BNLHVCQUFDLFNBQU0sd0JBQXFCLCtCQUE4Qix3QkFBcUIsUUFBTyxTQUFRLFFBQU8sTUFBSyxZQUFXLE1BQU0sRUFBRUQsVUFBVSxJQUFJQyxNQUFNLFVBQVUsR0FBRyxVQUFVLE9BQU8sVUFBVSxPQUFPLE9BQU8sTUFBdk07QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBME07QUFBQSxnQkFDMU0sdUJBQUMsV0FBUSx3QkFBcUIsK0JBQThCLHdCQUFxQixRQUFPLGNBQWMsRUFBRUMsY0FBYyxJQUFJQyxRQUFRLHFCQUFxQkMsWUFBWSxRQUFRSixVQUFVLEdBQUcsS0FBeEw7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBMEw7QUFBQSxnQkFDMUwsdUJBQUMsT0FBSSx3QkFBcUIsK0JBQThCLHdCQUFxQixRQUFPLFNBQVEsU0FBUSxRQUFRLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLE1BQUssV0FBVSxZQUFZLE1BQXJKO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQXdKO0FBQUEsbUJBTDFKO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBTUEsS0FQRjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQVFBLEtBVEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFVQTtBQUFBLGlCQVpKO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBYUU7QUFBQSxlQXpDSjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQTJDQTtBQUFBLFVBR0M1RSxlQUFlbUYsTUFBTSxHQUFHLENBQUMsRUFBRTVFLFNBQVMsS0FDckMsdUJBQUMsU0FBSSx3QkFBcUIsK0JBQThCLHdCQUFxQixRQUFPLFdBQVUsMkRBQzFGO0FBQUEsbUNBQUMsUUFBRyx3QkFBcUIsK0JBQThCLHdCQUFxQixTQUFRLFdBQVUsOENBQTZDLGdDQUEzSTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUEySjtBQUFBLFlBQzNKLHVCQUFDLFNBQUksd0JBQXFCLCtCQUE4Qix3QkFBcUIsUUFBTyxXQUFVLGFBQzNGUCx5QkFBZW1GLE1BQU0sR0FBRyxDQUFDLEVBQUVqRSxJQUFJLENBQUNoQixNQUFNO0FBQ3ZDLG9CQUFNbUYsTUFBTTtBQUFBLGdCQUNWdEgsTUFBTTtBQUFBLGdCQUE2QkMsUUFBUTtBQUFBLGdCQUMzQ0MsT0FBTztBQUFBLGdCQUFtQ0MsT0FBTztBQUFBLGdCQUNqREMsTUFBTTtBQUFBLGdCQUE2QkMsTUFBTTtBQUFBLGdCQUN6Q0MsUUFBUTtBQUFBLGdCQUFpQ0MsTUFBTTtBQUFBLGNBQ2pELEVBQUU0QixFQUFFZ0MsU0FBUyxLQUFLO0FBQ2xCLHFCQUNFLHVCQUFDLFNBQUksd0JBQXFCLCtCQUE4Qix3QkFBcUIsUUFBa0IsV0FBVSxtQ0FBa0MsMkJBQXlCaEMsR0FBR29FLElBQ25LO0FBQUEsdUNBQUMsZUFBWSx3QkFBcUIsK0JBQThCLHdCQUFxQixTQUFRLFdBQVUsNENBQXZHO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQStJO0FBQUEsZ0JBQy9JLHVCQUFDLFVBQUssd0JBQXFCLCtCQUE4Qix3QkFBcUIsUUFBTyxXQUFXLGtEQUFrRGUsR0FBRyxJQUFLbkYsWUFBRTBCLFlBQVksVUFBeEs7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBK0s7QUFBQSxnQkFDL0ssdUJBQUMsVUFBSyx3QkFBcUIsK0JBQThCLHdCQUFxQixRQUFPLFdBQVUseUNBQXdDLDhCQUEyQixvQkFBbUIsMkJBQXlCMUIsR0FBR29FLElBQUtwRTtBQUFBQSxvQkFBRVU7QUFBQUEsa0JBQWlCO0FBQUEsa0JBQU90RCxPQUFPLElBQUlrQyxLQUFLVSxFQUFFSSxZQUFZLEdBQUcsU0FBUyxFQUFFd0QsUUFBUWxHLEdBQUcsQ0FBQztBQUFBLHFCQUF4UztBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUEwUztBQUFBLG1CQUhyTnNDLEVBQUVvRSxJQUEzRjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUlFO0FBQUEsWUFFTixDQUFDLEtBZkQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFnQkE7QUFBQSxlQWxCSjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQW1CRTtBQUFBLGFBbEpKO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFvSkE7QUFBQSxXQS9KRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBZ0tBO0FBQUE7QUFBQSxJQXhLRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUF5S0E7QUFFSjtBQUFDOUYsR0FuUXVCRCxnQkFBYztBQUFBLFVBQ25CeEMsV0FBVztBQUFBO0FBQUEsS0FETndDO0FBQWMsSUFBQStHO0FBQUEsYUFBQUEsSUFBQSIsIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlTWVtbyIsInVzZUNhbGxiYWNrIiwidXNlUmVmIiwidXNlTmF2aWdhdGUiLCJtb3Rpb24iLCJBcnJvd0xlZnQiLCJUcmVuZGluZ1VwIiwiQ2xvY2siLCJDaGVja0NpcmNsZSIsIlRhcmdldCIsIlphcCIsImJhc2U0NCIsIkJhckNoYXJ0IiwiQmFyIiwiWEF4aXMiLCJZQXhpcyIsIkNhcnRlc2lhbkdyaWQiLCJUb29sdGlwIiwiUmVzcG9uc2l2ZUNvbnRhaW5lciIsIlBpZUNoYXJ0IiwiUGllIiwiQ2VsbCIsIkxpbmVDaGFydCIsIkxpbmUiLCJBcmVhIiwiQXJlYUNoYXJ0IiwiZm9ybWF0Iiwic3RhcnRPZldlZWsiLCJlbmRPZldlZWsiLCJlYWNoRGF5T2ZJbnRlcnZhbCIsImlzV2l0aGluSW50ZXJ2YWwiLCJzdWJXZWVrcyIsInB0IiwiREFZX0xBQkVMU19TSE9SVCIsIlRBR19DT0xPUlNfQ0hBUlQiLCJibHVlIiwicHVycGxlIiwiZ3JlZW4iLCJhbWJlciIsInJvc2UiLCJ0ZWFsIiwiaW5kaWdvIiwicGluayIsIkZvY3VzQW5hbHl0aWNzIiwiX3MiLCJuYXZpZ2F0ZSIsInNlc3Npb25zIiwic2V0U2Vzc2lvbnMiLCJ0b3VjaFN0YXJ0IiwieCIsInkiLCJkcmFnT2Zmc2V0IiwiZHJhZ1N0eWxlIiwic2V0RHJhZ1N0eWxlIiwiZW50aXRpZXMiLCJGb2N1c1Nlc3Npb24iLCJsaXN0IiwidGhlbiIsImNhdGNoIiwidG9kYXkiLCJEYXRlIiwidG9kYXlTdHIiLCJ3ZWVrU3RhcnQiLCJ3ZWVrU3RhcnRzT24iLCJ3ZWVrRW5kIiwid2Vla0RheXMiLCJzdGFydCIsImVuZCIsImNvbXBsZXRlZEZvY3VzIiwiZmlsdGVyIiwicyIsInR5cGUiLCJjb21wbGV0ZWQiLCJ0b2RheUNvdW50IiwiY3JlYXRlZF9kYXRlIiwibGVuZ3RoIiwid2Vla0NvdW50IiwidG90YWxGb2N1c01pbiIsInJlZHVjZSIsInN1bSIsImR1cmF0aW9uX21pbnV0ZXMiLCJ0b3RhbEhvdXJzIiwiTWF0aCIsImZsb29yIiwidG90YWxSZW1haW5kZXIiLCJkYWlseURhdGEiLCJtYXAiLCJkIiwiaSIsImtleSIsImNvdW50IiwiZGF5IiwiZGF0ZSIsInRhZ0Rpc3RyaWJ1dGlvbiIsImZvckVhY2giLCJuYW1lIiwidGFnX25hbWUiLCJPYmplY3QiLCJlbnRyaWVzIiwidmFsdWUiLCJjb2xvciIsImZpbmQiLCJ0YWdfY29sb3IiLCJ3ZWVrbHlUcmVuZCIsIkFycmF5IiwiZnJvbSIsIl8iLCJ3cyIsIndlIiwid2VlayIsImhvdXJseURhdGEiLCJob3VycyIsImhvdXIiLCJnZXRIb3VycyIsImgiLCJzdHJlYWsiLCJzZXREYXRlIiwiZ2V0RGF0ZSIsImhhbmRsZVBvaW50ZXJTdGFydCIsImN1cnJlbnQiLCJoYW5kbGVQb2ludGVyTW92ZSIsInRyYW5zZm9ybSIsInRyYW5zaXRpb24iLCJoYW5kbGVQb2ludGVyRW5kIiwiZSIsInRvdWNoZXMiLCJjbGllbnRYIiwiY2xpZW50WSIsImNoYW5nZWRUb3VjaGVzIiwiYnV0dG9ucyIsImxvY2FsZSIsImljb24iLCJiZyIsImxhYmVsIiwidW5pdCIsImNhcmQiLCJvcGFjaXR5IiwiZGVsYXkiLCJpZCIsIl9pZCIsInRvcCIsInJpZ2h0IiwibGVmdCIsImJvdHRvbSIsImZvbnRTaXplIiwiZmlsbCIsImJvcmRlclJhZGl1cyIsImJvcmRlciIsImJhY2tncm91bmQiLCJwYXlsb2FkIiwiZW50cnkiLCJzbGljZSIsImJhY2tncm91bmRDb2xvciIsImNscyIsIl9jIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIkZvY3VzQW5hbHl0aWNzLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VDYWxsYmFjaywgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VOYXZpZ2F0ZSB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5pbXBvcnQgeyBtb3Rpb24gfSBmcm9tIFwiZnJhbWVyLW1vdGlvblwiO1xuaW1wb3J0IHsgQXJyb3dMZWZ0LCBUcmVuZGluZ1VwLCBDbG9jaywgQ2hlY2tDaXJjbGUsIFRhcmdldCwgWmFwIH0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xuaW1wb3J0IHsgYmFzZTQ0IH0gZnJvbSBcIkAvYXBpL2Jhc2U0NENsaWVudFwiO1xuaW1wb3J0IHsgQmFyQ2hhcnQsIEJhciwgWEF4aXMsIFlBeGlzLCBDYXJ0ZXNpYW5HcmlkLCBUb29sdGlwLCBSZXNwb25zaXZlQ29udGFpbmVyLCBQaWVDaGFydCwgUGllLCBDZWxsLCBMaW5lQ2hhcnQsIExpbmUsIEFyZWEsIEFyZWFDaGFydCB9IGZyb20gXCJyZWNoYXJ0c1wiO1xuaW1wb3J0IHsgZm9ybWF0LCBzdGFydE9mV2VlaywgZW5kT2ZXZWVrLCBlYWNoRGF5T2ZJbnRlcnZhbCwgaXNXaXRoaW5JbnRlcnZhbCwgc3ViV2Vla3MgfSBmcm9tIFwiZGF0ZS1mbnNcIjtcbmltcG9ydCB7IHB0IH0gZnJvbSBcImRhdGUtZm5zL2xvY2FsZVwiO1xuXG5jb25zdCBEQVlfTEFCRUxTX1NIT1JUID0gW1wiU1wiLCBcIlRcIiwgXCJRXCIsIFwiUVwiLCBcIlNcIiwgXCJTXCIsIFwiRFwiXTtcblxuY29uc3QgVEFHX0NPTE9SU19DSEFSVCA9IHtcbiAgYmx1ZTogXCIjM0I4MkY2XCIsIHB1cnBsZTogXCIjOEI1Q0Y2XCIsIGdyZWVuOiBcIiMxMEI5ODFcIixcbiAgYW1iZXI6IFwiI0Y1OUUwQlwiLCByb3NlOiBcIiNGNDNGNUVcIiwgdGVhbDogXCIjMTRCOEE2XCIsXG4gIGluZGlnbzogXCIjNjM2NkYxXCIsIHBpbms6IFwiI0VDNDg5OVwiXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBGb2N1c0FuYWx5dGljcygpIHtcbiAgY29uc3QgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpO1xuICBjb25zdCBbc2Vzc2lvbnMsIHNldFNlc3Npb25zXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgdG91Y2hTdGFydCA9IHVzZVJlZih7IHg6IDAsIHk6IDAgfSk7XG4gIGNvbnN0IGRyYWdPZmZzZXQgPSB1c2VSZWYoeyB4OiAwLCB5OiAwIH0pO1xuICBjb25zdCBbZHJhZ1N0eWxlLCBzZXREcmFnU3R5bGVdID0gdXNlU3RhdGUoe30pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgYmFzZTQ0LmVudGl0aWVzLkZvY3VzU2Vzc2lvbi5saXN0KFwiLWNyZWF0ZWRfZGF0ZVwiLCA1MDApLnRoZW4oc2V0U2Vzc2lvbnMpLmNhdGNoKCgpID0+IHNldFNlc3Npb25zKFtdKSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gIGNvbnN0IHRvZGF5U3RyID0gZm9ybWF0KHRvZGF5LCBcInl5eXktTU0tZGRcIik7XG4gIGNvbnN0IHdlZWtTdGFydCA9IHN0YXJ0T2ZXZWVrKHRvZGF5LCB7IHdlZWtTdGFydHNPbjogMSB9KTtcbiAgY29uc3Qgd2Vla0VuZCA9IGVuZE9mV2Vlayh0b2RheSwgeyB3ZWVrU3RhcnRzT246IDEgfSk7XG4gIGNvbnN0IHdlZWtEYXlzID0gZWFjaERheU9mSW50ZXJ2YWwoeyBzdGFydDogd2Vla1N0YXJ0LCBlbmQ6IHdlZWtFbmQgfSk7XG5cbiAgY29uc3QgY29tcGxldGVkRm9jdXMgPSB1c2VNZW1vKCgpID0+XG4gIHNlc3Npb25zLmZpbHRlcigocykgPT4gcy50eXBlID09PSBcImZvY3VzXCIgJiYgcy5jb21wbGV0ZWQpLCBbc2Vzc2lvbnNdKTtcblxuICBjb25zdCB0b2RheUNvdW50ID0gY29tcGxldGVkRm9jdXMuZmlsdGVyKChzKSA9PiBmb3JtYXQobmV3IERhdGUocy5jcmVhdGVkX2RhdGUpLCBcInl5eXktTU0tZGRcIikgPT09IHRvZGF5U3RyKS5sZW5ndGg7XG4gIGNvbnN0IHdlZWtDb3VudCA9IGNvbXBsZXRlZEZvY3VzLmZpbHRlcigocykgPT4gaXNXaXRoaW5JbnRlcnZhbChuZXcgRGF0ZShzLmNyZWF0ZWRfZGF0ZSksIHsgc3RhcnQ6IHdlZWtTdGFydCwgZW5kOiB3ZWVrRW5kIH0pKS5sZW5ndGg7XG4gIGNvbnN0IHRvdGFsRm9jdXNNaW4gPSBjb21wbGV0ZWRGb2N1cy5yZWR1Y2UoKHN1bSwgcykgPT4gc3VtICsgKHMuZHVyYXRpb25fbWludXRlcyB8fCAwKSwgMCk7XG4gIGNvbnN0IHRvdGFsSG91cnMgPSBNYXRoLmZsb29yKHRvdGFsRm9jdXNNaW4gLyA2MCk7XG4gIGNvbnN0IHRvdGFsUmVtYWluZGVyID0gdG90YWxGb2N1c01pbiAlIDYwO1xuXG4gIC8vIERhaWx5IGJhciBjaGFydCBkYXRhXG4gIGNvbnN0IGRhaWx5RGF0YSA9IHdlZWtEYXlzLm1hcCgoZCwgaSkgPT4ge1xuICAgIGNvbnN0IGtleSA9IGZvcm1hdChkLCBcInl5eXktTU0tZGRcIik7XG4gICAgY29uc3QgY291bnQgPSBjb21wbGV0ZWRGb2N1cy5maWx0ZXIoKHMpID0+IGZvcm1hdChuZXcgRGF0ZShzLmNyZWF0ZWRfZGF0ZSksIFwieXl5eS1NTS1kZFwiKSA9PT0ga2V5KS5sZW5ndGg7XG4gICAgcmV0dXJuIHsgZGF5OiBEQVlfTEFCRUxTX1NIT1JUW2ldLCBjb3VudCwgZGF0ZTogZm9ybWF0KGQsIFwiZFwiKSB9O1xuICB9KTtcblxuICAvLyBUYWcgZGlzdHJpYnV0aW9uXG4gIGNvbnN0IHRhZ0Rpc3RyaWJ1dGlvbiA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IG1hcCA9IHt9O1xuICAgIGNvbXBsZXRlZEZvY3VzLmZvckVhY2goKHMpID0+IHtcbiAgICAgIGNvbnN0IG5hbWUgPSBzLnRhZ19uYW1lIHx8IFwiU2VtIHRhZ1wiO1xuICAgICAgbWFwW25hbWVdID0gKG1hcFtuYW1lXSB8fCAwKSArIDE7XG4gICAgfSk7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKG1hcCkubWFwKChbbmFtZSwgdmFsdWVdKSA9PiAoe1xuICAgICAgbmFtZSwgdmFsdWUsXG4gICAgICBjb2xvcjogVEFHX0NPTE9SU19DSEFSVFtjb21wbGV0ZWRGb2N1cy5maW5kKChzKSA9PiAocy50YWdfbmFtZSB8fCBcIlNlbSB0YWdcIikgPT09IG5hbWUpPy50YWdfY29sb3JdIHx8IFwiIzk0QTNCOFwiXG4gICAgfSkpO1xuICB9LCBbY29tcGxldGVkRm9jdXNdKTtcblxuICAvLyBXZWVrbHkgdHJlbmQgKGxhc3QgNCB3ZWVrcylcbiAgY29uc3Qgd2Vla2x5VHJlbmQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogNCB9LCAoXywgaSkgPT4ge1xuICAgICAgY29uc3Qgd3MgPSBzdGFydE9mV2VlayhzdWJXZWVrcyh0b2RheSwgMyAtIGkpLCB7IHdlZWtTdGFydHNPbjogMSB9KTtcbiAgICAgIGNvbnN0IHdlID0gZW5kT2ZXZWVrKHN1YldlZWtzKHRvZGF5LCAzIC0gaSksIHsgd2Vla1N0YXJ0c09uOiAxIH0pO1xuICAgICAgY29uc3QgY291bnQgPSBjb21wbGV0ZWRGb2N1cy5maWx0ZXIoKHMpID0+IGlzV2l0aGluSW50ZXJ2YWwobmV3IERhdGUocy5jcmVhdGVkX2RhdGUpLCB7IHN0YXJ0OiB3cywgZW5kOiB3ZSB9KSkubGVuZ3RoO1xuICAgICAgcmV0dXJuIHsgd2VlazogYFNlbSAke2kgKyAxfWAsIGNvdW50IH07XG4gICAgfSk7XG4gIH0sIFtjb21wbGV0ZWRGb2N1cywgdG9kYXldKTtcblxuICAvLyBGb2N1cyBieSBob3VyXG4gIGNvbnN0IGhvdXJseURhdGEgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBob3VycyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDI0IH0sIChfLCBpKSA9PiAoeyBob3VyOiBgJHtpfWhgLCBjb3VudDogMCB9KSk7XG4gICAgY29tcGxldGVkRm9jdXMuZm9yRWFjaCgocykgPT4ge1xuICAgICAgY29uc3QgZCA9IG5ldyBEYXRlKHMuY3JlYXRlZF9kYXRlKTtcbiAgICAgIGhvdXJzW2QuZ2V0SG91cnMoKV0uY291bnQrKztcbiAgICB9KTtcbiAgICByZXR1cm4gaG91cnMuZmlsdGVyKChoKSA9PiBoLmNvdW50ID4gMCk7XG4gIH0sIFtjb21wbGV0ZWRGb2N1c10pO1xuXG4gIC8vIFN0cmVha1xuICBjb25zdCBzdHJlYWsgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBsZXQgcyA9IDA7XG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgY29uc3Qga2V5ID0gZm9ybWF0KGQsIFwieXl5eS1NTS1kZFwiKTtcbiAgICAgIGNvbnN0IGNvdW50ID0gY29tcGxldGVkRm9jdXMuZmlsdGVyKChzKSA9PiBmb3JtYXQobmV3IERhdGUocy5jcmVhdGVkX2RhdGUpLCBcInl5eXktTU0tZGRcIikgPT09IGtleSkubGVuZ3RoO1xuICAgICAgaWYgKGNvdW50ID09PSAwKSBicmVhaztcbiAgICAgIHMrKztcbiAgICAgIGQuc2V0RGF0ZShkLmdldERhdGUoKSAtIDEpO1xuICAgIH1cbiAgICByZXR1cm4gcztcbiAgfSwgW2NvbXBsZXRlZEZvY3VzLCB0b2RheV0pO1xuXG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJTdGFydCA9IHVzZUNhbGxiYWNrKCh4LCB5KSA9PiB7dG91Y2hTdGFydC5jdXJyZW50ID0geyB4LCB5IH07ZHJhZ09mZnNldC5jdXJyZW50ID0geyB4OiAwLCB5OiAwIH07c2V0RHJhZ1N0eWxlKHt9KTt9LCBbXSk7XG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJNb3ZlID0gdXNlQ2FsbGJhY2soKHgsIHkpID0+IHtkcmFnT2Zmc2V0LmN1cnJlbnQgPSB7IHg6IHggLSB0b3VjaFN0YXJ0LmN1cnJlbnQueCwgeTogeSAtIHRvdWNoU3RhcnQuY3VycmVudC55IH07c2V0RHJhZ1N0eWxlKHsgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7ZHJhZ09mZnNldC5jdXJyZW50Lnh9cHgsICR7ZHJhZ09mZnNldC5jdXJyZW50Lnl9cHgpYCwgdHJhbnNpdGlvbjogXCJub25lXCIgfSk7fSwgW10pO1xuICBjb25zdCBoYW5kbGVQb2ludGVyRW5kID0gdXNlQ2FsbGJhY2soKHgsIHkpID0+IHtcbiAgICBzZXREcmFnU3R5bGUoeyB0cmFuc2Zvcm06IFwidHJhbnNsYXRlKDAsIDApXCIsIHRyYW5zaXRpb246IFwidHJhbnNmb3JtIDAuM3MgZWFzZS1vdXRcIiB9KTtcbiAgICBpZiAoeSAtIHRvdWNoU3RhcnQuY3VycmVudC55IDwgLTYwKSBuYXZpZ2F0ZShcIi9mb2N1c1wiKTtcbiAgfSwgW25hdmlnYXRlXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNBbmFseXRpY3M6MTA2OjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctY3JlYW0gZmxleCBmbGV4LWNvbCBzZWxlY3Qtbm9uZVwiXG4gICAgb25Ub3VjaFN0YXJ0PXsoZSkgPT4gaGFuZGxlUG9pbnRlclN0YXJ0KGUudG91Y2hlc1swXS5jbGllbnRYLCBlLnRvdWNoZXNbMF0uY2xpZW50WSl9XG4gICAgb25Ub3VjaE1vdmU9eyhlKSA9PiBoYW5kbGVQb2ludGVyTW92ZShlLnRvdWNoZXNbMF0uY2xpZW50WCwgZS50b3VjaGVzWzBdLmNsaWVudFkpfVxuICAgIG9uVG91Y2hFbmQ9eyhlKSA9PiBoYW5kbGVQb2ludGVyRW5kKGUuY2hhbmdlZFRvdWNoZXNbMF0/LmNsaWVudFggfHwgdG91Y2hTdGFydC5jdXJyZW50LngsIGUuY2hhbmdlZFRvdWNoZXNbMF0/LmNsaWVudFkgfHwgdG91Y2hTdGFydC5jdXJyZW50LnkpfVxuICAgIG9uTW91c2VEb3duPXsoZSkgPT4gaGFuZGxlUG9pbnRlclN0YXJ0KGUuY2xpZW50WCwgZS5jbGllbnRZKX1cbiAgICBvbk1vdXNlTW92ZT17KGUpID0+IHtpZiAoZS5idXR0b25zID09PSAxKSBoYW5kbGVQb2ludGVyTW92ZShlLmNsaWVudFgsIGUuY2xpZW50WSk7fX1cbiAgICBvbk1vdXNlVXA9eyhlKSA9PiBoYW5kbGVQb2ludGVyRW5kKGUuY2xpZW50WCwgZS5jbGllbnRZKX0+XG4gICAgICBcbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0FuYWx5dGljczoxMTQ6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHN0eWxlPXtkcmFnU3R5bGV9IGNsYXNzTmFtZT1cImZsZXgtMSBmbGV4IGZsZXgtY29sXCI+XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0FuYWx5dGljczoxMTU6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImJnLXdoaXRlIGJvcmRlci1iIGJvcmRlci1ib3JkZXIgcHgtNCBweS0zIGZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjExNjoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKFwiL2ZvY3VzXCIpfSBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgcm91bmRlZC0yeGwgYmctd2hpdGUgYm9yZGVyIGJvcmRlci1ib3JkZXIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGhvdmVyOnRleHQtZm9yZWdyb3VuZCB0cmFuc2l0aW9uLWFsbFwiPlxuICAgICAgICAgICAgPEFycm93TGVmdCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjExNzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNBbmFseXRpY3M6MTE5OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgICAgICA8aDEgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0FuYWx5dGljczoxMjA6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJvbGQgdGV4dC1mb3JlZ3JvdW5kXCI+QW5hbHl0aWNzPC9oMT5cbiAgICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNBbmFseXRpY3M6MTIxOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCI+e2Zvcm1hdCh0b2RheSwgXCJkICdkZScgTU1NTSwgeXl5eVwiLCB7IGxvY2FsZTogcHQgfSl9PC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNBbmFseXRpY3M6MTI1OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4LTEgb3ZlcmZsb3ctYXV0byBwLTQgc3BhY2UteS00XCI+XG4gICAgICAgICAgey8qIFN0YXRzIGNhcmRzICovfVxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0FuYWx5dGljczoxMjc6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0zXCI+XG4gICAgICAgICAgICB7W1xuICAgICAgICAgICAgeyBpY29uOiBUYXJnZXQsIGNvbG9yOiBcInRleHQtWyNFODdBNUFdXCIsIGJnOiBcImJnLVsjRTg3QTVBXS8xMFwiLCBsYWJlbDogXCJIb2plXCIsIHZhbHVlOiB0b2RheUNvdW50LCB1bml0OiBcInBvbW9kb3Jvc1wiIH0sXG4gICAgICAgICAgICB7IGljb246IFRyZW5kaW5nVXAsIGNvbG9yOiBcInRleHQtcHVycGxlLTYwMFwiLCBiZzogXCJiZy1wdXJwbGUtMTAwXCIsIGxhYmVsOiBcIlNlbWFuYVwiLCB2YWx1ZTogd2Vla0NvdW50LCB1bml0OiBcInBvbW9kb3Jvc1wiIH0sXG4gICAgICAgICAgICB7IGljb246IENoZWNrQ2lyY2xlLCBjb2xvcjogXCJ0ZXh0LWVtZXJhbGQtNjAwXCIsIGJnOiBcImJnLWVtZXJhbGQtMTAwXCIsIGxhYmVsOiBcIlRvdGFsXCIsIHZhbHVlOiBjb21wbGV0ZWRGb2N1cy5sZW5ndGgsIHVuaXQ6IFwicG9tb2Rvcm9zXCIgfSxcbiAgICAgICAgICAgIHsgaWNvbjogQ2xvY2ssIGNvbG9yOiBcInRleHQtYW1iZXItNjAwXCIsIGJnOiBcImJnLWFtYmVyLTEwMFwiLCBsYWJlbDogXCJGb2NvXCIsIHZhbHVlOiBgJHt0b3RhbEhvdXJzfWggJHt0b3RhbFJlbWFpbmRlcn1tYCwgdW5pdDogXCJ0ZW1wb1wiIH1dLlxuICAgICAgICAgICAgbWFwKChjYXJkLCBpKSA9PlxuICAgICAgICAgICAgPG1vdGlvbi5kaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0FuYWx5dGljczoxMzQ6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBrZXk9e2l9IGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeTogMTAgfX0gYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB5OiAwIH19IHRyYW5zaXRpb249e3sgZGVsYXk6IGkgKiAwLjA1IH19XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCBwLTQgYm9yZGVyIGJvcmRlci1ib3JkZXIgc2hhZG93LXNtIGhvdmVyOnNoYWRvdy1tZCB0cmFuc2l0aW9uLXNoYWRvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0FuYWx5dGljczoxMzY6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNBbmFseXRpY3M6MTM3OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPXtgdy05IGgtOSByb3VuZGVkLXhsICR7Y2FyZC5iZ30gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJgfT5cbiAgICAgICAgICAgICAgICAgICAgPGNhcmQuaWNvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjEzODoyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT17YHctNCBoLTQgJHtjYXJkLmNvbG9yfWB9IC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNBbmFseXRpY3M6MTQwOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtZm9yZWdyb3VuZFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibGFiZWxcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17Y2FyZD8uaWQgfHwgY2FyZD8uX2lkfT57Y2FyZC5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjE0MjoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT17YHRleHQtMnhsIGZvbnQtYm9sZCAke2NhcmQuY29sb3J9YH0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJ2YWx1ZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtjYXJkPy5pZCB8fCBjYXJkPy5faWR9PntjYXJkLnZhbHVlfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNBbmFseXRpY3M6MTQzOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJ1bml0XCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2NhcmQ/LmlkIHx8IGNhcmQ/Ll9pZH0+e2NhcmQudW5pdH08L3A+XG4gICAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogU3RyZWFrICovfVxuICAgICAgICAgIHtzdHJlYWsgPiAwICYmXG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjE1MDoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtMnhsIHAtNCBib3JkZXIgYm9yZGVyLWJvcmRlciBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjE1MToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjE1MjoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTEyIGgtMTIgcm91bmRlZC0yeGwgYmctYW1iZXItMTAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtMnhsXCI+8J+UpTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0FuYWx5dGljczoxNTM6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNBbmFseXRpY3M6MTU0OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC1mb3JlZ3JvdW5kXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJzdHJlYWtcIj5TZXF1w6puY2lhIGRlIHtzdHJlYWt9IGRpYXtzdHJlYWsgIT09IDEgPyBcInNcIiA6IFwiXCJ9PC9wPlxuICAgICAgICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0FuYWx5dGljczoxNTU6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCI+RGlhcyBjb25zZWN1dGl2b3MgY29tIGZvY288L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjE1NzoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cIm1sLWF1dG8gdGV4dC0zeGwgZm9udC1ib2xkIHRleHQtYW1iZXItNTAwXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJzdHJlYWtcIj57c3RyZWFrfTwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIH1cblxuICAgICAgICAgIHsvKiBXZWVrbHkgdHJlbmQgY2hhcnQgKi99XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjE2MzoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtMnhsIHAtNSBib3JkZXIgYm9yZGVyLWJvcmRlciBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgIDxoMyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjE2NDoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC1mb3JlZ3JvdW5kIG1iLTQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPFphcCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjE2NToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtWyNFODdBNUFdXCIgLz4gVGVuZMOqbmNpYSBTZW1hbmFsXG4gICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjE2NzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImgtWzE2MHB4XVwiPlxuICAgICAgICAgICAgICA8UmVzcG9uc2l2ZUNvbnRhaW5lciBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjE2ODoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICA8QXJlYUNoYXJ0IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNBbmFseXRpY3M6MTY5OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgZGF0YT17d2Vla2x5VHJlbmR9IG1hcmdpbj17eyB0b3A6IDUsIHJpZ2h0OiA1LCBsZWZ0OiAtMjAsIGJvdHRvbTogMCB9fT5cbiAgICAgICAgICAgICAgICAgIDxkZWZzIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNBbmFseXRpY3M6MTcwOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bGluZWFyR3JhZGllbnQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0FuYWx5dGljczoxNzE6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgaWQ9XCJncmFkaWVudFwiIHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiMFwiIHkyPVwiMVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzdG9wIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNBbmFseXRpY3M6MTcyOjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIG9mZnNldD1cIjAlXCIgc3RvcENvbG9yPVwiI0U4N0E1QVwiIHN0b3BPcGFjaXR5PXswLjN9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHN0b3AgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0FuYWx5dGljczoxNzM6MjJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgb2Zmc2V0PVwiMTAwJVwiIHN0b3BDb2xvcj1cIiNFODdBNUFcIiBzdG9wT3BhY2l0eT17MH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgICAgICAgICAgIDwvZGVmcz5cbiAgICAgICAgICAgICAgICAgIDxDYXJ0ZXNpYW5HcmlkIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNBbmFseXRpY3M6MTc2OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHN0cm9rZURhc2hhcnJheT1cIjMgM1wiIHN0cm9rZT1cIiNGMEVCRTNcIiAvPlxuICAgICAgICAgICAgICAgICAgPFhBeGlzIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNBbmFseXRpY3M6MTc3OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgZGF0YUtleT1cIndlZWtcIiB0aWNrPXt7IGZvbnRTaXplOiAxMSwgZmlsbDogXCIjOUNBM0FGXCIgfX0gYXhpc0xpbmU9e2ZhbHNlfSB0aWNrTGluZT17ZmFsc2V9IC8+XG4gICAgICAgICAgICAgICAgICA8WUF4aXMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0FuYWx5dGljczoxNzg6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiB0aWNrPXt7IGZvbnRTaXplOiAxMSwgZmlsbDogXCIjOUNBM0FGXCIgfX0gYXhpc0xpbmU9e2ZhbHNlfSB0aWNrTGluZT17ZmFsc2V9IGFsbG93RGVjaW1hbHM9e2ZhbHNlfSAvPlxuICAgICAgICAgICAgICAgICAgPFRvb2x0aXAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0FuYWx5dGljczoxNzk6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjb250ZW50U3R5bGU9e3sgYm9yZGVyUmFkaXVzOiAxMiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjRThFMEQ4XCIsIGJhY2tncm91bmQ6IFwiI2ZmZlwiLCBmb250U2l6ZTogMTIgfX0gLz5cbiAgICAgICAgICAgICAgICAgIDxBcmVhIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNBbmFseXRpY3M6MTgwOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHR5cGU9XCJtb25vdG9uZVwiIGRhdGFLZXk9XCJjb3VudFwiIHN0cm9rZT1cIiNFODdBNUFcIiBzdHJva2VXaWR0aD17Mn0gZmlsbD1cInVybCgjZ3JhZGllbnQpXCIgLz5cbiAgICAgICAgICAgICAgICA8L0FyZWFDaGFydD5cbiAgICAgICAgICAgICAgPC9SZXNwb25zaXZlQ29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogRGFpbHkgYmFyIGNoYXJ0ICovfVxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0FuYWx5dGljczoxODc6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCBwLTUgYm9yZGVyIGJvcmRlci1ib3JkZXIgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICA8aDMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0FuYWx5dGljczoxODg6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtZm9yZWdyb3VuZCBtYi00XCI+UG9tb2Rvcm9zIHBvciBEaWE8L2gzPlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjE4OToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImgtWzE4MHB4XVwiPlxuICAgICAgICAgICAgICA8UmVzcG9uc2l2ZUNvbnRhaW5lciBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjE5MDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICA8QmFyQ2hhcnQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0FuYWx5dGljczoxOTE6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBkYXRhPXtkYWlseURhdGF9IG1hcmdpbj17eyB0b3A6IDUsIHJpZ2h0OiA1LCBsZWZ0OiAtMjAsIGJvdHRvbTogMCB9fT5cbiAgICAgICAgICAgICAgICAgIDxDYXJ0ZXNpYW5HcmlkIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNBbmFseXRpY3M6MTkyOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHN0cm9rZURhc2hhcnJheT1cIjMgM1wiIHN0cm9rZT1cIiNGMEVCRTNcIiAvPlxuICAgICAgICAgICAgICAgICAgPFhBeGlzIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNBbmFseXRpY3M6MTkzOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgZGF0YUtleT1cImRheVwiIHRpY2s9e3sgZm9udFNpemU6IDExLCBmaWxsOiBcIiM5Q0EzQUZcIiB9fSBheGlzTGluZT17ZmFsc2V9IHRpY2tMaW5lPXtmYWxzZX0gLz5cbiAgICAgICAgICAgICAgICAgIDxZQXhpcyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjE5NDoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHRpY2s9e3sgZm9udFNpemU6IDExLCBmaWxsOiBcIiM5Q0EzQUZcIiB9fSBheGlzTGluZT17ZmFsc2V9IHRpY2tMaW5lPXtmYWxzZX0gYWxsb3dEZWNpbWFscz17ZmFsc2V9IC8+XG4gICAgICAgICAgICAgICAgICA8VG9vbHRpcCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjE5NToxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNvbnRlbnRTdHlsZT17eyBib3JkZXJSYWRpdXM6IDEyLCBib3JkZXI6IFwiMXB4IHNvbGlkICNFOEUwRDhcIiwgYmFja2dyb3VuZDogXCIjZmZmXCIsIGZvbnRTaXplOiAxMiB9fVxuICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyPXsodmFsdWUpID0+IFtgJHt2YWx1ZX0g8J+NimAsIFwiUG9tb2Rvcm9zXCJdfVxuICAgICAgICAgICAgICAgICAgbGFiZWxGb3JtYXR0ZXI9eyhsYWJlbCwgcGF5bG9hZCkgPT4gcGF5bG9hZD8uWzBdPy5wYXlsb2FkPy5kYXRlID8gYERpYSAke3BheWxvYWRbMF0ucGF5bG9hZC5kYXRlfWAgOiBsYWJlbH0gLz5cbiAgICAgICAgICAgICAgICAgIDxCYXIgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0FuYWx5dGljczoxOTg6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBkYXRhS2V5PVwiY291bnRcIiByYWRpdXM9e1s4LCA4LCAwLCAwXX0gZmlsbD1cIiNFODdBNUFcIiBtYXhCYXJTaXplPXszNn0gLz5cbiAgICAgICAgICAgICAgICA8L0JhckNoYXJ0PlxuICAgICAgICAgICAgICA8L1Jlc3BvbnNpdmVDb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBUYWcgKyBIb3VyIGNoYXJ0cyByb3cgKi99XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjIwNToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgICAgIHt0YWdEaXN0cmlidXRpb24ubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjIwNzoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtMnhsIHAtNSBib3JkZXIgYm9yZGVyLWJvcmRlciBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICA8aDMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0FuYWx5dGljczoyMDg6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtZm9yZWdyb3VuZCBtYi0zXCI+UG9yIFRhZzwvaDM+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjIwOToxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImgtWzE4MHB4XVwiPlxuICAgICAgICAgICAgICAgICAgPFJlc3BvbnNpdmVDb250YWluZXIgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0FuYWx5dGljczoyMTA6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxQaWVDaGFydCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjIxMToyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxQaWUgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0FuYWx5dGljczoyMTI6MjJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBkYXRhPXt0YWdEaXN0cmlidXRpb259IGRhdGFLZXk9XCJ2YWx1ZVwiIG5hbWVLZXk9XCJuYW1lXCIgY3g9XCI1MCVcIiBjeT1cIjUwJVwiIG91dGVyUmFkaXVzPXs2MH0gaW5uZXJSYWRpdXM9ezM1fSBzdHJva2VXaWR0aD17M30gc3Ryb2tlPVwiI2ZmZlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3RhZ0Rpc3RyaWJ1dGlvbi5tYXAoKGVudHJ5LCBpKSA9PiA8Q2VsbCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjIxMzo2MFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17aX0gZmlsbD17ZW50cnkuY29sb3J9IC8+KX1cbiAgICAgICAgICAgICAgICAgICAgICA8L1BpZT5cbiAgICAgICAgICAgICAgICAgICAgICA8VG9vbHRpcCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjIxNToyMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNvbnRlbnRTdHlsZT17eyBib3JkZXJSYWRpdXM6IDEyLCBib3JkZXI6IFwiMXB4IHNvbGlkICNFOEUwRDhcIiwgYmFja2dyb3VuZDogXCIjZmZmXCIsIGZvbnRTaXplOiAxMiB9fVxuICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI9eyh2YWx1ZSkgPT4gW2Ake3ZhbHVlfSDwn42KYCwgXCJQb21vZG9yb3NcIl19IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvUGllQ2hhcnQ+XG4gICAgICAgICAgICAgICAgICA8L1Jlc3BvbnNpdmVDb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjIyMDoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInNwYWNlLXktMSBtdC0yXCI+XG4gICAgICAgICAgICAgICAgICB7dGFnRGlzdHJpYnV0aW9uLnNsaWNlKDAsIDUpLm1hcCgoZW50cnksIGkpID0+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjIyMjoyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17aX0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1bMTBweF1cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNBbmFseXRpY3M6MjIzOjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidy0yLjUgaC0yLjUgcm91bmRlZC1mdWxsIGZsZXgtc2hyaW5rLTBcIiBzdHlsZT17eyBiYWNrZ3JvdW5kQ29sb3I6IGVudHJ5LmNvbG9yIH19IC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0FuYWx5dGljczoyMjQ6MjJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LW11dGVkLWZvcmVncm91bmQgdHJ1bmNhdGVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cIm5hbWVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17ZW50cnk/LmlkIHx8IGVudHJ5Py5faWR9PntlbnRyeS5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjIyNToyMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQtZm9yZWdyb3VuZCBmb250LW1lZGl1bSBtbC1hdXRvXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJ2YWx1ZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtlbnRyeT8uaWQgfHwgZW50cnk/Ll9pZH0+e2VudHJ5LnZhbHVlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHtob3VybHlEYXRhLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0FuYWx5dGljczoyMzM6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCBwLTUgYm9yZGVyIGJvcmRlci1ib3JkZXIgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgPGgzIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNBbmFseXRpY3M6MjM0OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LWZvcmVncm91bmQgbWItM1wiPkZvY28gcG9yIEhvcmE8L2gzPlxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0FuYWx5dGljczoyMzU6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJoLVsxODBweF1cIj5cbiAgICAgICAgICAgICAgICAgIDxSZXNwb25zaXZlQ29udGFpbmVyIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNBbmFseXRpY3M6MjM2OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPlxuICAgICAgICAgICAgICAgICAgICA8QmFyQ2hhcnQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0FuYWx5dGljczoyMzc6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBkYXRhPXtob3VybHlEYXRhfSBtYXJnaW49e3sgdG9wOiA1LCByaWdodDogNSwgbGVmdDogLTIwLCBib3R0b206IDAgfX0gbGF5b3V0PVwidmVydGljYWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8Q2FydGVzaWFuR3JpZCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjIzODoyMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBzdHJva2VEYXNoYXJyYXk9XCIzIDNcIiBzdHJva2U9XCIjRjBFQkUzXCIgaG9yaXpvbnRhbD17ZmFsc2V9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgPFhBeGlzIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNBbmFseXRpY3M6MjM5OjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgdHlwZT1cIm51bWJlclwiIHRpY2s9e3sgZm9udFNpemU6IDEwLCBmaWxsOiBcIiM5Q0EzQUZcIiB9fSBheGlzTGluZT17ZmFsc2V9IHRpY2tMaW5lPXtmYWxzZX0gYWxsb3dEZWNpbWFscz17ZmFsc2V9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgPFlBeGlzIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNBbmFseXRpY3M6MjQwOjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgZGF0YUtleT1cImhvdXJcIiB0eXBlPVwiY2F0ZWdvcnlcIiB0aWNrPXt7IGZvbnRTaXplOiAxMCwgZmlsbDogXCIjOUNBM0FGXCIgfX0gYXhpc0xpbmU9e2ZhbHNlfSB0aWNrTGluZT17ZmFsc2V9IHdpZHRoPXszNX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICA8VG9vbHRpcCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjI0MToyMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNvbnRlbnRTdHlsZT17eyBib3JkZXJSYWRpdXM6IDEyLCBib3JkZXI6IFwiMXB4IHNvbGlkICNFOEUwRDhcIiwgYmFja2dyb3VuZDogXCIjZmZmXCIsIGZvbnRTaXplOiAxMiB9fSAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxCYXIgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0FuYWx5dGljczoyNDI6MjJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBkYXRhS2V5PVwiY291bnRcIiByYWRpdXM9e1swLCA2LCA2LCAwXX0gZmlsbD1cIiNBNzhCRkFcIiBtYXhCYXJTaXplPXsxNH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9CYXJDaGFydD5cbiAgICAgICAgICAgICAgICAgIDwvUmVzcG9uc2l2ZUNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogUmVjZW50IHNlc3Npb25zICovfVxuICAgICAgICAgIHtjb21wbGV0ZWRGb2N1cy5zbGljZSgwLCA2KS5sZW5ndGggPiAwICYmXG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjI1MjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtMnhsIHAtNSBib3JkZXIgYm9yZGVyLWJvcmRlciBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgPGgzIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNBbmFseXRpY3M6MjUzOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LWZvcmVncm91bmQgbWItM1wiPlNlc3PDtWVzIFJlY2VudGVzPC9oMz5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjI1NDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgIHtjb21wbGV0ZWRGb2N1cy5zbGljZSgwLCA2KS5tYXAoKHMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjbHMgPSB7XG4gICAgICAgICAgICAgICAgICBibHVlOiBcImJnLWJsdWUtMTAwIHRleHQtYmx1ZS03MDBcIiwgcHVycGxlOiBcImJnLXB1cnBsZS0xMDAgdGV4dC1wdXJwbGUtNzAwXCIsXG4gICAgICAgICAgICAgICAgICBncmVlbjogXCJiZy1lbWVyYWxkLTEwMCB0ZXh0LWVtZXJhbGQtNzAwXCIsIGFtYmVyOiBcImJnLWFtYmVyLTEwMCB0ZXh0LWFtYmVyLTcwMFwiLFxuICAgICAgICAgICAgICAgICAgcm9zZTogXCJiZy1yb3NlLTEwMCB0ZXh0LXJvc2UtNjAwXCIsIHRlYWw6IFwiYmctdGVhbC0xMDAgdGV4dC10ZWFsLTcwMFwiLFxuICAgICAgICAgICAgICAgICAgaW5kaWdvOiBcImJnLWluZGlnby0xMDAgdGV4dC1pbmRpZ28tNzAwXCIsIHBpbms6IFwiYmctcGluay0xMDAgdGV4dC1waW5rLTcwMFwiXG4gICAgICAgICAgICAgICAgfVtzLnRhZ19jb2xvcl0gfHwgXCJiZy1zbGF0ZS0xMDAgdGV4dC1zbGF0ZS03MDBcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjI2MzoyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17cy5pZH0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtzPy5pZH0+XG4gICAgICAgICAgICAgICAgICAgICAgPENoZWNrQ2lyY2xlIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNBbmFseXRpY3M6MjY0OjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTUwMCBmbGV4LXNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQW5hbHl0aWNzOjI2NToyMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT17YHB4LTIgcHktMC41IHJvdW5kZWQtbWQgdGV4dC1bMTFweF0gZm9udC1tZWRpdW0gJHtjbHN9YH0+e3MudGFnX25hbWUgfHwgXCJGb2NvXCJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNBbmFseXRpY3M6MjY2OjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LW11dGVkLWZvcmVncm91bmQgbWwtYXV0b1wiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiZHVyYXRpb25fbWludXRlc1wiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtzPy5pZH0+e3MuZHVyYXRpb25fbWludXRlc31taW4g4oCiIHtmb3JtYXQobmV3IERhdGUocy5jcmVhdGVkX2RhdGUpLCBcImQgTU1NXCIsIHsgbG9jYWxlOiBwdCB9KX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2Pik7XG5cbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2Pik7XG5cbn0iXSwiZmlsZSI6Ii9hcHAvc3JjL3BhZ2VzL0ZvY3VzQW5hbHl0aWNzLmpzeCJ9