import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/FocusCalendar.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/pages/FocusCalendar.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=fc940917"; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"]; const useMemo = __vite__cjsImport3_react["useMemo"]; const useCallback = __vite__cjsImport3_react["useCallback"]; const useRef = __vite__cjsImport3_react["useRef"];
import { useNavigate } from "/node_modules/.vite/deps/react-router-dom.js?v=8a08d97a";
import { motion } from "/node_modules/.vite/deps/framer-motion.js?v=fc940917";
import { ArrowLeft, ChevronLeft, ChevronRight } from "/node_modules/.vite/deps/lucide-react.js?v=aefa7968";
import { base44 } from "/src/api/base44Client.js";
import { startOfWeek, endOfWeek, addWeeks, subWeeks, format, isWithinInterval, parseISO, isBefore, isAfter } from "/node_modules/.vite/deps/date-fns.js?v=a1580542";
import { pt } from "/node_modules/.vite/deps/date-fns_locale.js?v=45b313c9";
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const DAY_LABELS_MON = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const DAY_LABELS_SUN = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const TAG_COLORS = {
  blue: { bg: "#DBEAFE", text: "#1D4ED8" },
  purple: { bg: "#EDE9FE", text: "#6D28D9" },
  green: { bg: "#D1FAE5", text: "#047857" },
  amber: { bg: "#FEF3C7", text: "#B45309" },
  rose: { bg: "#FFE4E6", text: "#BE123C" },
  teal: { bg: "#CCFBF1", text: "#0F766E" },
  indigo: { bg: "#E0E7FF", text: "#3730A3" },
  pink: { bg: "#FCE7F3", text: "#9D174D" }
};
export default function FocusCalendar() {
  _s();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(/* @__PURE__ */ new Date());
  const [sessions, setSessions] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [weekStartsOn, setWeekStartsOn] = useState(1);
  const touchStart = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const [dragStyle, setDragStyle] = useState({});
  const weekStart = startOfWeek(currentDate, { weekStartsOn });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn });
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });
  const dayLabels = weekStartsOn === 1 ? DAY_LABELS_MON : DAY_LABELS_SUN;
  useEffect(() => {
    base44.auth.me().then((u) => {
      if (u?.week_starts_on !== void 0) setWeekStartsOn(u.week_starts_on);
    }).catch(() => {
    });
    base44.entities.FocusSession.list("-created_date", 500).then(setSessions).catch(() => setSessions([]));
    base44.entities.Deadline.list("-deadline", 200).then(setDeadlines).catch(() => {
    });
    base44.entities.Event.list("-start_datetime", 200).then(setEvents).catch(() => {
    });
  }, []);
  const sessionsInWeek = useMemo(() => sessions.filter((s) => {
    const d = new Date(s.created_date);
    return isWithinInterval(d, { start: weekStart, end: weekEnd }) && s.type === "focus" && s.completed;
  }), [sessions, weekStart, weekEnd]);
  const sessionsByDay = useMemo(() => {
    const map = {};
    weekDays.forEach((d) => {
      map[format(d, "yyyy-MM-dd")] = [];
    });
    sessionsInWeek.forEach((s) => {
      const d = new Date(s.created_date);
      const key = format(d, "yyyy-MM-dd");
      if (map[key]) map[key].push(s);
    });
    return map;
  }, [sessionsInWeek, weekDays]);
  const deadlinesByDay = useMemo(() => {
    const map = {};
    weekDays.forEach((d) => {
      map[format(d, "yyyy-MM-dd")] = [];
    });
    deadlines.forEach((dl) => {
      if (!dl.deadline) return;
      const key = format(new Date(dl.deadline), "yyyy-MM-dd");
      if (map[key]) map[key].push(dl);
    });
    return map;
  }, [deadlines, weekDays]);
  const eventsByDay = useMemo(() => {
    const map = {};
    weekDays.forEach((d) => {
      map[format(d, "yyyy-MM-dd")] = [];
    });
    events.forEach((ev) => {
      if (!ev.start_datetime) return;
      const key = format(new Date(ev.start_datetime), "yyyy-MM-dd");
      if (map[key]) map[key].push(ev);
    });
    return map;
  }, [events, weekDays]);
  const prevWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const nextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
  const goToday = () => setCurrentDate(/* @__PURE__ */ new Date());
  const todayStr = format(/* @__PURE__ */ new Date(), "yyyy-MM-dd");
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
    if (x - touchStart.current.x > 60) navigate("/focus");
  }, [navigate]);
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      "data-source-location": "pages/FocusCalendar:105:4",
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
      children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusCalendar:113:6", "data-dynamic-content": "true", style: dragStyle, className: "flex-1 flex flex-col", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusCalendar:115:8", "data-dynamic-content": "true", className: "bg-white border-b border-border px-4 py-3", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusCalendar:116:10", "data-dynamic-content": "true", className: "flex items-center justify-between relative", children: [
            /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/FocusCalendar:117:12", "data-dynamic-content": "true", onClick: () => navigate("/focus"), className: "w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all z-10", children: /* @__PURE__ */ jsxDEV(ArrowLeft, { "data-source-location": "pages/FocusCalendar:118:14", "data-dynamic-content": "false", className: "w-5 h-5" }, void 0, false, {
              fileName: "/app/src/pages/FocusCalendar.jsx",
              lineNumber: 137,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/FocusCalendar.jsx",
              lineNumber: 136,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusCalendar:122:12", "data-dynamic-content": "true", className: "absolute left-1/2 -translate-x-1/2 flex items-center gap-3", children: [
              /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/FocusCalendar:123:14", "data-dynamic-content": "true", onClick: prevWeek, className: "w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-border transition-all", children: /* @__PURE__ */ jsxDEV(ChevronLeft, { "data-source-location": "pages/FocusCalendar:124:16", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/src/pages/FocusCalendar.jsx",
                lineNumber: 143,
                columnNumber: 17
              }, this) }, void 0, false, {
                fileName: "/app/src/pages/FocusCalendar.jsx",
                lineNumber: 142,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("h1", { "data-source-location": "pages/FocusCalendar:126:14", "data-dynamic-content": "true", className: "text-base font-bold text-foreground whitespace-nowrap", children: format(currentDate, "MMMM yyyy", { locale: pt }) }, void 0, false, {
                fileName: "/app/src/pages/FocusCalendar.jsx",
                lineNumber: 145,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/FocusCalendar:129:14", "data-dynamic-content": "true", onClick: nextWeek, className: "w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-border transition-all", children: /* @__PURE__ */ jsxDEV(ChevronRight, { "data-source-location": "pages/FocusCalendar:130:16", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/src/pages/FocusCalendar.jsx",
                lineNumber: 149,
                columnNumber: 17
              }, this) }, void 0, false, {
                fileName: "/app/src/pages/FocusCalendar.jsx",
                lineNumber: 148,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/FocusCalendar.jsx",
              lineNumber: 141,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/FocusCalendar:134:12", "data-dynamic-content": "true", onClick: goToday, className: "px-4 py-2 rounded-full bg-[#E87A5A] text-white text-xs font-semibold hover:bg-[#D4694A] transition-all shadow-sm z-10", children: "Hoje" }, void 0, false, {
              fileName: "/app/src/pages/FocusCalendar.jsx",
              lineNumber: 153,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/FocusCalendar.jsx",
            lineNumber: 135,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusCalendar:140:10", "data-dynamic-content": "true", className: "flex gap-2 mt-4 justify-center", children: weekDays.map((day, i) => {
            const key = format(day, "yyyy-MM-dd");
            const isToday = key === todayStr;
            const count = sessionsByDay[key]?.length || 0;
            const extraCount = (deadlinesByDay[key]?.length || 0) + (eventsByDay[key]?.length || 0);
            const isSelected = selectedDay === key;
            return /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "pages/FocusCalendar:148:16",
                "data-dynamic-content": "true",
                onClick: () => setSelectedDay(isSelected ? null : key),
                className: `flex-1 max-w-[70px] flex flex-col items-center py-2.5 px-1 rounded-2xl transition-all text-xs ${isSelected ? "bg-[#E87A5A] text-white shadow-md scale-105" : isToday ? "bg-[#E87A5A]/10 text-[#E87A5A] ring-1 ring-[#E87A5A]/30" : "bg-white border border-border text-muted-foreground hover:border-[#E87A5A]/30 hover:bg-[#E87A5A]/5"}`,
                children: [
                  /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusCalendar:154:18", "data-dynamic-content": "true", className: "font-semibold text-[11px]", "data-collection-item-field": "i", "data-collection-item-id": dayLabels?.id || dayLabels?._id, children: dayLabels[i] }, void 0, false, {
                    fileName: "/app/src/pages/FocusCalendar.jsx",
                    lineNumber: 173,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusCalendar:155:18", "data-dynamic-content": "true", className: `text-lg font-bold mt-0.5 ${isSelected ? "text-white" : "text-foreground"}`, children: format(day, "d") }, void 0, false, {
                    fileName: "/app/src/pages/FocusCalendar.jsx",
                    lineNumber: 174,
                    columnNumber: 19
                  }, this),
                  count > 0 && /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusCalendar:156:32", "data-dynamic-content": "true", className: `text-[10px] mt-0.5 font-semibold ${isSelected ? "text-white/80" : "text-[#E87A5A]"}`, "data-collection-item-field": "count", children: [
                    count,
                    " 🍊"
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/FocusCalendar.jsx",
                    lineNumber: 175,
                    columnNumber: 33
                  }, this),
                  extraCount > 0 && /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusCalendar:157:37", "data-dynamic-content": "true", className: `text-[9px] font-semibold ${isSelected ? "text-white/70" : "text-purple-500"}`, "data-collection-item-field": "extraCount", children: [
                    extraCount,
                    " 📅"
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/FocusCalendar.jsx",
                    lineNumber: 176,
                    columnNumber: 38
                  }, this)
                ]
              },
              key,
              true,
              {
                fileName: "/app/src/pages/FocusCalendar.jsx",
                lineNumber: 167,
                columnNumber: 17
              },
              this
            );
          }) }, void 0, false, {
            fileName: "/app/src/pages/FocusCalendar.jsx",
            lineNumber: 159,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/FocusCalendar.jsx",
          lineNumber: 134,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusCalendar:165:8", "data-dynamic-content": "true", ref: scrollRef, className: "flex-1 overflow-auto p-4", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusCalendar:166:10", "data-dynamic-content": "true", className: "bg-white rounded-2xl border border-border shadow-sm overflow-hidden min-w-[400px]", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusCalendar:167:12", "data-dynamic-content": "true", className: "grid", style: { gridTemplateColumns: "48px 1fr" }, children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusCalendar:168:14", "data-dynamic-content": "true", className: "pt-2", children: HOURS.map(
            (h) => /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusCalendar:170:18", "data-dynamic-content": "true", className: "h-12 flex items-start justify-end pr-2", children: /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusCalendar:171:20", "data-dynamic-content": "true", className: "text-[10px] text-muted-foreground/50", children: [
              String(h).padStart(2, "0"),
              ":00"
            ] }, void 0, true, {
              fileName: "/app/src/pages/FocusCalendar.jsx",
              lineNumber: 190,
              columnNumber: 21
            }, this) }, h, false, {
              fileName: "/app/src/pages/FocusCalendar.jsx",
              lineNumber: 189,
              columnNumber: 17
            }, this)
          ) }, void 0, false, {
            fileName: "/app/src/pages/FocusCalendar.jsx",
            lineNumber: 187,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusCalendar:175:14", "data-dynamic-content": "true", className: "grid grid-cols-7", children: weekDays.map((day) => {
            const key = format(day, "yyyy-MM-dd");
            const daySessions = sessionsByDay[key] || [];
            const dayDeadlines = deadlinesByDay[key] || [];
            const dayEvents = eventsByDay[key] || [];
            return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusCalendar:182:20", "data-dynamic-content": "true", className: "relative border-l border-border/30", children: [
              HOURS.map((h) => /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusCalendar:183:39", "data-dynamic-content": "true", className: "h-12 border-b border-border/20 border-dashed" }, h, false, {
                fileName: "/app/src/pages/FocusCalendar.jsx",
                lineNumber: 202,
                columnNumber: 41
              }, this)),
              daySessions.map((s) => {
                const date = new Date(s.created_date);
                const hour = date.getHours();
                const mins = date.getMinutes();
                const topPct = (hour + mins / 60) / 24 * 100;
                const colors = TAG_COLORS[s.tag_color] || TAG_COLORS.blue;
                return /* @__PURE__ */ jsxDEV(
                  "div",
                  {
                    "data-source-location": "pages/FocusCalendar:191:26",
                    "data-dynamic-content": "true",
                    className: "absolute left-1 right-1 rounded-lg px-1.5 py-1 text-[9px] font-semibold truncate shadow-sm",
                    style: { top: `${topPct}%`, backgroundColor: colors.bg, color: colors.text, minHeight: "22px", borderLeft: `3px solid ${colors.text}` },
                    "data-collection-item-id": s?.id,
                    children: [
                      /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusCalendar:194:28", "data-dynamic-content": "true", className: "text-[10px]", children: s.tag_name || "Foco" }, void 0, false, {
                        fileName: "/app/src/pages/FocusCalendar.jsx",
                        lineNumber: 213,
                        columnNumber: 29
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusCalendar:195:28", "data-dynamic-content": "true", className: "ml-1 opacity-70", "data-collection-item-field": "duration_minutes", "data-collection-item-id": s?.id, children: [
                        s.duration_minutes,
                        "m"
                      ] }, void 0, true, {
                        fileName: "/app/src/pages/FocusCalendar.jsx",
                        lineNumber: 214,
                        columnNumber: 29
                      }, this)
                    ]
                  },
                  s.id,
                  true,
                  {
                    fileName: "/app/src/pages/FocusCalendar.jsx",
                    lineNumber: 210,
                    columnNumber: 27
                  },
                  this
                );
              }),
              dayDeadlines.map((dl) => {
                const date = new Date(dl.deadline);
                const hour = date.getHours();
                const mins = date.getMinutes();
                const topPct = (hour + mins / 60) / 24 * 100;
                const hex = dl.color && dl.color.startsWith("#") ? dl.color : "#E87A5A";
                return /* @__PURE__ */ jsxDEV(
                  "div",
                  {
                    "data-source-location": "pages/FocusCalendar:206:26",
                    "data-dynamic-content": "true",
                    className: "absolute left-1 right-1 rounded-lg px-1.5 py-1 text-[9px] font-semibold truncate shadow-sm",
                    style: { top: `${topPct}%`, backgroundColor: hex + "22", color: hex, minHeight: "20px", borderLeft: `3px solid ${hex}` },
                    "data-collection-item-id": dl?.id,
                    "data-collection-item-field": "name",
                    children: [
                      "⏰ ",
                      dl.name
                    ]
                  },
                  dl.id,
                  true,
                  {
                    fileName: "/app/src/pages/FocusCalendar.jsx",
                    lineNumber: 225,
                    columnNumber: 27
                  },
                  this
                );
              }),
              dayEvents.map((ev) => {
                const startDate = new Date(ev.start_datetime);
                const hour = startDate.getHours();
                const mins = startDate.getMinutes();
                const topPct = (hour + mins / 60) / 24 * 100;
                const hex = ev.color && ev.color.startsWith("#") ? ev.color : "#8B5CF6";
                let heightPct = 4;
                if (ev.end_datetime) {
                  const endDate = new Date(ev.end_datetime);
                  const durMins = (endDate - startDate) / 6e4;
                  heightPct = Math.max(4, durMins / (24 * 60) * 100);
                }
                return /* @__PURE__ */ jsxDEV(
                  "div",
                  {
                    "data-source-location": "pages/FocusCalendar:227:26",
                    "data-dynamic-content": "true",
                    className: "absolute left-1 right-1 rounded-lg px-1.5 py-1 text-[9px] font-semibold truncate shadow-sm",
                    style: { top: `${topPct}%`, height: `${Math.min(heightPct, 30)}%`, backgroundColor: hex + "22", color: hex, borderLeft: `3px solid ${hex}`, overflow: "hidden" },
                    "data-collection-item-id": ev?.id,
                    "data-collection-item-field": "name",
                    children: [
                      "📅 ",
                      ev.name
                    ]
                  },
                  ev.id,
                  true,
                  {
                    fileName: "/app/src/pages/FocusCalendar.jsx",
                    lineNumber: 246,
                    columnNumber: 27
                  },
                  this
                );
              })
            ] }, key, true, {
              fileName: "/app/src/pages/FocusCalendar.jsx",
              lineNumber: 201,
              columnNumber: 21
            }, this);
          }) }, void 0, false, {
            fileName: "/app/src/pages/FocusCalendar.jsx",
            lineNumber: 194,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/FocusCalendar.jsx",
          lineNumber: 186,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/src/pages/FocusCalendar.jsx",
          lineNumber: 185,
          columnNumber: 11
        }, this) }, void 0, false, {
          fileName: "/app/src/pages/FocusCalendar.jsx",
          lineNumber: 184,
          columnNumber: 9
        }, this),
        selectedDay && /* @__PURE__ */ jsxDEV(
          motion.div,
          {
            "data-source-location": "pages/FocusCalendar:244:10",
            "data-dynamic-content": "true",
            initial: { y: "100%" },
            animate: { y: 0 },
            exit: { y: "100%" },
            className: "bg-white border-t border-border rounded-t-2xl p-5 max-h-[220px] overflow-y-auto shadow-xl",
            children: [
              /* @__PURE__ */ jsxDEV("h3", { "data-source-location": "pages/FocusCalendar:246:12", "data-dynamic-content": "true", className: "font-semibold text-sm mb-3", children: format(parseISO(selectedDay), "EEEE, d 'de' MMMM", { locale: pt }) }, void 0, false, {
                fileName: "/app/src/pages/FocusCalendar.jsx",
                lineNumber: 265,
                columnNumber: 13
              }, this),
              (() => {
                const daySess = sessionsByDay[selectedDay] || [];
                const dayDl = deadlinesByDay[selectedDay] || [];
                const dayEv = eventsByDay[selectedDay] || [];
                const total = daySess.length + dayDl.length + dayEv.length;
                if (total === 0) return /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/FocusCalendar:252:38", "data-dynamic-content": "false", className: "text-sm text-muted-foreground", children: "Sem entradas neste dia" }, void 0, false, {
                  fileName: "/app/src/pages/FocusCalendar.jsx",
                  lineNumber: 271,
                  columnNumber: 37
                }, this);
                return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusCalendar:254:16", "data-dynamic-content": "true", className: "space-y-2", children: [
                  daySess.map((s) => {
                    const colors = TAG_COLORS[s.tag_color] || TAG_COLORS.blue;
                    return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusCalendar:258:22", "data-dynamic-content": "true", className: "flex items-center gap-3 text-sm bg-secondary/50 rounded-xl px-3 py-2", "data-collection-item-id": s?.id, children: [
                      /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusCalendar:259:24", "data-dynamic-content": "true", className: "text-xs font-mono text-muted-foreground", children: format(new Date(s.created_date), "HH:mm") }, void 0, false, {
                        fileName: "/app/src/pages/FocusCalendar.jsx",
                        lineNumber: 278,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusCalendar:260:24", "data-dynamic-content": "true", className: "px-2.5 py-1 rounded-lg text-xs font-semibold", style: { backgroundColor: colors.bg, color: colors.text }, children: [
                        "🍊 ",
                        s.tag_name || "Foco"
                      ] }, void 0, true, {
                        fileName: "/app/src/pages/FocusCalendar.jsx",
                        lineNumber: 279,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusCalendar:261:24", "data-dynamic-content": "true", className: "text-xs text-muted-foreground ml-auto", "data-collection-item-field": "duration_minutes", "data-collection-item-id": s?.id, children: [
                        s.duration_minutes,
                        " min"
                      ] }, void 0, true, {
                        fileName: "/app/src/pages/FocusCalendar.jsx",
                        lineNumber: 280,
                        columnNumber: 25
                      }, this)
                    ] }, s.id, true, {
                      fileName: "/app/src/pages/FocusCalendar.jsx",
                      lineNumber: 277,
                      columnNumber: 21
                    }, this);
                  }),
                  dayDl.map((dl) => {
                    const hex = dl.color && dl.color.startsWith("#") ? dl.color : "#E87A5A";
                    return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusCalendar:268:22", "data-dynamic-content": "true", className: "flex items-center gap-3 text-sm rounded-xl px-3 py-2", style: { backgroundColor: hex + "15" }, "data-collection-item-id": dl?.id, children: [
                      /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusCalendar:269:24", "data-dynamic-content": "true", className: "text-xs font-mono text-muted-foreground", children: format(new Date(dl.deadline), "HH:mm") }, void 0, false, {
                        fileName: "/app/src/pages/FocusCalendar.jsx",
                        lineNumber: 288,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusCalendar:270:24", "data-dynamic-content": "true", className: "px-2.5 py-1 rounded-lg text-xs font-semibold text-white", style: { backgroundColor: hex }, children: "⏰ Prazo" }, void 0, false, {
                        fileName: "/app/src/pages/FocusCalendar.jsx",
                        lineNumber: 289,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusCalendar:271:24", "data-dynamic-content": "true", className: "text-xs font-medium truncate", style: { color: hex }, "data-collection-item-field": "name", "data-collection-item-id": dl?.id, children: dl.name }, void 0, false, {
                        fileName: "/app/src/pages/FocusCalendar.jsx",
                        lineNumber: 290,
                        columnNumber: 25
                      }, this)
                    ] }, dl.id, true, {
                      fileName: "/app/src/pages/FocusCalendar.jsx",
                      lineNumber: 287,
                      columnNumber: 21
                    }, this);
                  }),
                  dayEv.map((ev) => {
                    const hex = ev.color && ev.color.startsWith("#") ? ev.color : "#8B5CF6";
                    return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusCalendar:278:22", "data-dynamic-content": "true", className: "flex items-center gap-3 text-sm rounded-xl px-3 py-2", style: { backgroundColor: hex + "15" }, "data-collection-item-id": ev?.id, children: [
                      /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusCalendar:279:24", "data-dynamic-content": "true", className: "text-xs font-mono text-muted-foreground", children: format(new Date(ev.start_datetime), "HH:mm") }, void 0, false, {
                        fileName: "/app/src/pages/FocusCalendar.jsx",
                        lineNumber: 298,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusCalendar:280:24", "data-dynamic-content": "true", className: "px-2.5 py-1 rounded-lg text-xs font-semibold text-white", style: { backgroundColor: hex }, children: "📅 Evento" }, void 0, false, {
                        fileName: "/app/src/pages/FocusCalendar.jsx",
                        lineNumber: 299,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusCalendar:281:24", "data-dynamic-content": "true", className: "text-xs font-medium truncate", style: { color: hex }, "data-collection-item-field": "name", "data-collection-item-id": ev?.id, children: ev.name }, void 0, false, {
                        fileName: "/app/src/pages/FocusCalendar.jsx",
                        lineNumber: 300,
                        columnNumber: 25
                      }, this)
                    ] }, ev.id, true, {
                      fileName: "/app/src/pages/FocusCalendar.jsx",
                      lineNumber: 297,
                      columnNumber: 21
                    }, this);
                  })
                ] }, void 0, true, {
                  fileName: "/app/src/pages/FocusCalendar.jsx",
                  lineNumber: 273,
                  columnNumber: 15
                }, this);
              })()
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/src/pages/FocusCalendar.jsx",
            lineNumber: 263,
            columnNumber: 9
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/src/pages/FocusCalendar.jsx",
        lineNumber: 132,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/app/src/pages/FocusCalendar.jsx",
      lineNumber: 124,
      columnNumber: 5
    },
    this
  );
}
_s(FocusCalendar, "uHDLDPwKQwsgf2WIr03SxTSgZ6I=", false, function() {
  return [useNavigate];
});
_c = FocusCalendar;
var _c;
$RefreshReg$(_c, "FocusCalendar");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/pages/FocusCalendar.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/pages/FocusCalendar.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBcUhjOzs7Ozs7Ozs7Ozs7Ozs7OztBQXJIZCxTQUFTQSxVQUFVQyxXQUFXQyxTQUFTQyxhQUFhQyxjQUFjO0FBQ2xFLFNBQVNDLG1CQUFtQjtBQUM1QixTQUFTQyxjQUFjO0FBQ3ZCLFNBQVNDLFdBQVdDLGFBQWFDLG9CQUFvQjtBQUNyRCxTQUFTQyxjQUFjO0FBQ3ZCLFNBQVNDLGFBQWFDLFdBQVdDLFVBQVVDLFVBQVVDLFFBQVFDLGtCQUFrQkMsVUFBVUMsVUFBVUMsZUFBZTtBQUNsSCxTQUFTQyxVQUFVO0FBRW5CLE1BQU1DLFFBQVFDLE1BQU1DLEtBQUssRUFBRUMsUUFBUSxHQUFHLEdBQUcsQ0FBQ0MsR0FBR0MsTUFBTUEsQ0FBQztBQUNwRCxNQUFNQyxpQkFBaUIsQ0FBQyxPQUFPLE9BQU8sT0FBTyxPQUFPLE9BQU8sT0FBTyxLQUFLO0FBQ3ZFLE1BQU1DLGlCQUFpQixDQUFDLE9BQU8sT0FBTyxPQUFPLE9BQU8sT0FBTyxPQUFPLEtBQUs7QUFFdkUsTUFBTUMsYUFBYTtBQUFBLEVBQ2pCQyxNQUFNLEVBQUVDLElBQUksV0FBV0MsTUFBTSxVQUFVO0FBQUEsRUFBR0MsUUFBUSxFQUFFRixJQUFJLFdBQVdDLE1BQU0sVUFBVTtBQUFBLEVBQ25GRSxPQUFPLEVBQUVILElBQUksV0FBV0MsTUFBTSxVQUFVO0FBQUEsRUFBR0csT0FBTyxFQUFFSixJQUFJLFdBQVdDLE1BQU0sVUFBVTtBQUFBLEVBQ25GSSxNQUFNLEVBQUVMLElBQUksV0FBV0MsTUFBTSxVQUFVO0FBQUEsRUFBR0ssTUFBTSxFQUFFTixJQUFJLFdBQVdDLE1BQU0sVUFBVTtBQUFBLEVBQ2pGTSxRQUFRLEVBQUVQLElBQUksV0FBV0MsTUFBTSxVQUFVO0FBQUEsRUFBR08sTUFBTSxFQUFFUixJQUFJLFdBQVdDLE1BQU0sVUFBVTtBQUNyRjtBQUVBLHdCQUF3QlEsZ0JBQWdCO0FBQUFDLEtBQUE7QUFDdEMsUUFBTUMsV0FBV3JDLFlBQVk7QUFDN0IsUUFBTXNDLFlBQVl2QyxPQUFPLElBQUk7QUFDN0IsUUFBTSxDQUFDd0MsYUFBYUMsY0FBYyxJQUFJN0MsU0FBUyxvQkFBSThDLEtBQUssQ0FBQztBQUN6RCxRQUFNLENBQUNDLFVBQVVDLFdBQVcsSUFBSWhELFNBQVMsRUFBRTtBQUMzQyxRQUFNLENBQUNpRCxXQUFXQyxZQUFZLElBQUlsRCxTQUFTLEVBQUU7QUFDN0MsUUFBTSxDQUFDbUQsUUFBUUMsU0FBUyxJQUFJcEQsU0FBUyxFQUFFO0FBQ3ZDLFFBQU0sQ0FBQ3FELGFBQWFDLGNBQWMsSUFBSXRELFNBQVMsSUFBSTtBQUNuRCxRQUFNLENBQUN1RCxjQUFjQyxlQUFlLElBQUl4RCxTQUFTLENBQUM7QUFDbEQsUUFBTXlELGFBQWFyRCxPQUFPLEVBQUVzRCxHQUFHLEdBQUdDLEdBQUcsRUFBRSxDQUFDO0FBQ3hDLFFBQU1DLGFBQWF4RCxPQUFPLEVBQUVzRCxHQUFHLEdBQUdDLEdBQUcsRUFBRSxDQUFDO0FBQ3hDLFFBQU0sQ0FBQ0UsV0FBV0MsWUFBWSxJQUFJOUQsU0FBUyxDQUFDLENBQUM7QUFFN0MsUUFBTStELFlBQVlwRCxZQUFZaUMsYUFBYSxFQUFFVyxhQUFhLENBQUM7QUFDM0QsUUFBTVMsVUFBVXBELFVBQVVnQyxhQUFhLEVBQUVXLGFBQWEsQ0FBQztBQUN2RCxRQUFNVSxXQUFXM0MsTUFBTUMsS0FBSyxFQUFFQyxRQUFRLEVBQUUsR0FBRyxDQUFDQyxHQUFHQyxNQUFNO0FBQUMsVUFBTXdDLElBQUksSUFBSXBCLEtBQUtpQixTQUFTO0FBQUVHLE1BQUVDLFFBQVFELEVBQUVFLFFBQVEsSUFBSTFDLENBQUM7QUFBRSxXQUFPd0M7QUFBQUEsRUFBRSxDQUFDO0FBQ3pILFFBQU1HLFlBQVlkLGlCQUFpQixJQUFJNUIsaUJBQWlCQztBQUV4RDNCLFlBQVUsTUFBTTtBQUNkUyxXQUFPNEQsS0FBS0MsR0FBRyxFQUFFQyxLQUFLLENBQUNDLE1BQU07QUFDM0IsVUFBSUEsR0FBR0MsbUJBQW1CQyxPQUFXbkIsaUJBQWdCaUIsRUFBRUMsY0FBYztBQUFBLElBQ3ZFLENBQUMsRUFBRUUsTUFBTSxNQUFNO0FBQUEsSUFBQyxDQUFDO0FBQ2pCbEUsV0FBT21FLFNBQVNDLGFBQWFDLEtBQUssaUJBQWlCLEdBQUcsRUFBRVAsS0FBS3hCLFdBQVcsRUFBRTRCLE1BQU0sTUFBTTVCLFlBQVksRUFBRSxDQUFDO0FBQ3JHdEMsV0FBT21FLFNBQVNHLFNBQVNELEtBQUssYUFBYSxHQUFHLEVBQUVQLEtBQUt0QixZQUFZLEVBQUUwQixNQUFNLE1BQU07QUFBQSxJQUFDLENBQUM7QUFDakZsRSxXQUFPbUUsU0FBU0ksTUFBTUYsS0FBSyxtQkFBbUIsR0FBRyxFQUFFUCxLQUFLcEIsU0FBUyxFQUFFd0IsTUFBTSxNQUFNO0FBQUEsSUFBQyxDQUFDO0FBQUEsRUFDbkYsR0FBRyxFQUFFO0FBRUwsUUFBTU0saUJBQWlCaEYsUUFBUSxNQUMvQjZDLFNBQVNvQyxPQUFPLENBQUNDLE1BQU07QUFDckIsVUFBTWxCLElBQUksSUFBSXBCLEtBQUtzQyxFQUFFQyxZQUFZO0FBQ2pDLFdBQU9yRSxpQkFBaUJrRCxHQUFHLEVBQUVvQixPQUFPdkIsV0FBV3dCLEtBQUt2QixRQUFRLENBQUMsS0FBS29CLEVBQUVJLFNBQVMsV0FBV0osRUFBRUs7QUFBQUEsRUFDNUYsQ0FBQyxHQUFHLENBQUMxQyxVQUFVZ0IsV0FBV0MsT0FBTyxDQUFDO0FBRWxDLFFBQU0wQixnQkFBZ0J4RixRQUFRLE1BQU07QUFDbEMsVUFBTXlGLE1BQU0sQ0FBQztBQUNiMUIsYUFBUzJCLFFBQVEsQ0FBQzFCLE1BQU07QUFBQ3lCLFVBQUk1RSxPQUFPbUQsR0FBRyxZQUFZLENBQUMsSUFBSTtBQUFBLElBQUcsQ0FBQztBQUM1RGdCLG1CQUFlVSxRQUFRLENBQUNSLE1BQU07QUFDNUIsWUFBTWxCLElBQUksSUFBSXBCLEtBQUtzQyxFQUFFQyxZQUFZO0FBQ2pDLFlBQU1RLE1BQU05RSxPQUFPbUQsR0FBRyxZQUFZO0FBQ2xDLFVBQUl5QixJQUFJRSxHQUFHLEVBQUdGLEtBQUlFLEdBQUcsRUFBRUMsS0FBS1YsQ0FBQztBQUFBLElBQy9CLENBQUM7QUFDRCxXQUFPTztBQUFBQSxFQUNULEdBQUcsQ0FBQ1QsZ0JBQWdCakIsUUFBUSxDQUFDO0FBRzdCLFFBQU04QixpQkFBaUI3RixRQUFRLE1BQU07QUFDbkMsVUFBTXlGLE1BQU0sQ0FBQztBQUNiMUIsYUFBUzJCLFFBQVEsQ0FBQzFCLE1BQU07QUFBQ3lCLFVBQUk1RSxPQUFPbUQsR0FBRyxZQUFZLENBQUMsSUFBSTtBQUFBLElBQUcsQ0FBQztBQUM1RGpCLGNBQVUyQyxRQUFRLENBQUNJLE9BQU87QUFDeEIsVUFBSSxDQUFDQSxHQUFHQyxTQUFVO0FBQ2xCLFlBQU1KLE1BQU05RSxPQUFPLElBQUkrQixLQUFLa0QsR0FBR0MsUUFBUSxHQUFHLFlBQVk7QUFDdEQsVUFBSU4sSUFBSUUsR0FBRyxFQUFHRixLQUFJRSxHQUFHLEVBQUVDLEtBQUtFLEVBQUU7QUFBQSxJQUNoQyxDQUFDO0FBQ0QsV0FBT0w7QUFBQUEsRUFDVCxHQUFHLENBQUMxQyxXQUFXZ0IsUUFBUSxDQUFDO0FBR3hCLFFBQU1pQyxjQUFjaEcsUUFBUSxNQUFNO0FBQ2hDLFVBQU15RixNQUFNLENBQUM7QUFDYjFCLGFBQVMyQixRQUFRLENBQUMxQixNQUFNO0FBQUN5QixVQUFJNUUsT0FBT21ELEdBQUcsWUFBWSxDQUFDLElBQUk7QUFBQSxJQUFHLENBQUM7QUFDNURmLFdBQU95QyxRQUFRLENBQUNPLE9BQU87QUFDckIsVUFBSSxDQUFDQSxHQUFHQyxlQUFnQjtBQUV4QixZQUFNUCxNQUFNOUUsT0FBTyxJQUFJK0IsS0FBS3FELEdBQUdDLGNBQWMsR0FBRyxZQUFZO0FBQzVELFVBQUlULElBQUlFLEdBQUcsRUFBR0YsS0FBSUUsR0FBRyxFQUFFQyxLQUFLSyxFQUFFO0FBQUEsSUFDaEMsQ0FBQztBQUNELFdBQU9SO0FBQUFBLEVBQ1QsR0FBRyxDQUFDeEMsUUFBUWMsUUFBUSxDQUFDO0FBRXJCLFFBQU1vQyxXQUFXQSxNQUFNeEQsZUFBZS9CLFNBQVM4QixhQUFhLENBQUMsQ0FBQztBQUM5RCxRQUFNMEQsV0FBV0EsTUFBTXpELGVBQWVoQyxTQUFTK0IsYUFBYSxDQUFDLENBQUM7QUFDOUQsUUFBTTJELFVBQVVBLE1BQU0xRCxlQUFlLG9CQUFJQyxLQUFLLENBQUM7QUFDL0MsUUFBTTBELFdBQVd6RixPQUFPLG9CQUFJK0IsS0FBSyxHQUFHLFlBQVk7QUFFaEQsUUFBTTJELHFCQUFxQnRHLFlBQVksQ0FBQ3VELEdBQUdDLE1BQU07QUFBQ0YsZUFBV2lELFVBQVUsRUFBRWhELEdBQUdDLEVBQUU7QUFBRUMsZUFBVzhDLFVBQVUsRUFBRWhELEdBQUcsR0FBR0MsR0FBRyxFQUFFO0FBQUVHLGlCQUFhLENBQUMsQ0FBQztBQUFBLEVBQUUsR0FBRyxFQUFFO0FBQzFJLFFBQU02QyxvQkFBb0J4RyxZQUFZLENBQUN1RCxHQUFHQyxNQUFNO0FBQzlDQyxlQUFXOEMsVUFBVSxFQUFFaEQsR0FBR0EsSUFBSUQsV0FBV2lELFFBQVFoRCxHQUFHQyxHQUFHQSxJQUFJRixXQUFXaUQsUUFBUS9DLEVBQUU7QUFDaEZHLGlCQUFhLEVBQUU4QyxXQUFXLGFBQWFoRCxXQUFXOEMsUUFBUWhELENBQUMsT0FBT0UsV0FBVzhDLFFBQVEvQyxDQUFDLE9BQU9rRCxZQUFZLE9BQU8sQ0FBQztBQUFBLEVBQ25ILEdBQUcsRUFBRTtBQUNMLFFBQU1DLG1CQUFtQjNHLFlBQVksQ0FBQ3VELEdBQUdDLE1BQU07QUFDN0NHLGlCQUFhLEVBQUU4QyxXQUFXLG1CQUFtQkMsWUFBWSwwQkFBMEIsQ0FBQztBQUNwRixRQUFJbkQsSUFBSUQsV0FBV2lELFFBQVFoRCxJQUFJLEdBQUloQixVQUFTLFFBQVE7QUFBQSxFQUN0RCxHQUFHLENBQUNBLFFBQVEsQ0FBQztBQUViLFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUFJLHdCQUFxQjtBQUFBLE1BQTRCLHdCQUFxQjtBQUFBLE1BQU8sV0FBVTtBQUFBLE1BQzVGLGNBQWMsQ0FBQ3FFLE1BQU1OLG1CQUFtQk0sRUFBRUMsUUFBUSxDQUFDLEVBQUVDLFNBQVNGLEVBQUVDLFFBQVEsQ0FBQyxFQUFFRSxPQUFPO0FBQUEsTUFDbEYsYUFBYSxDQUFDSCxNQUFNSixrQkFBa0JJLEVBQUVDLFFBQVEsQ0FBQyxFQUFFQyxTQUFTRixFQUFFQyxRQUFRLENBQUMsRUFBRUUsT0FBTztBQUFBLE1BQ2hGLFlBQVksQ0FBQ0gsTUFBTUQsaUJBQWlCQyxFQUFFSSxlQUFlLENBQUMsR0FBR0YsV0FBV3hELFdBQVdpRCxRQUFRaEQsR0FBR3FELEVBQUVJLGVBQWUsQ0FBQyxHQUFHRCxXQUFXekQsV0FBV2lELFFBQVEvQyxDQUFDO0FBQUEsTUFDOUksYUFBYSxDQUFDb0QsTUFBTU4sbUJBQW1CTSxFQUFFRSxTQUFTRixFQUFFRyxPQUFPO0FBQUEsTUFDM0QsYUFBYSxDQUFDSCxNQUFNO0FBQUMsWUFBSUEsRUFBRUssWUFBWSxFQUFHVCxtQkFBa0JJLEVBQUVFLFNBQVNGLEVBQUVHLE9BQU87QUFBQSxNQUFFO0FBQUEsTUFDbEYsV0FBVyxDQUFDSCxNQUFNRCxpQkFBaUJDLEVBQUVFLFNBQVNGLEVBQUVHLE9BQU87QUFBQSxNQUVyRCxpQ0FBQyxTQUFJLHdCQUFxQiw2QkFBNEIsd0JBQXFCLFFBQU8sT0FBT3JELFdBQVcsV0FBVSx3QkFFNUc7QUFBQSwrQkFBQyxTQUFJLHdCQUFxQiw2QkFBNEIsd0JBQXFCLFFBQU8sV0FBVSw2Q0FDMUY7QUFBQSxpQ0FBQyxTQUFJLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sV0FBVSw4Q0FDM0Y7QUFBQSxtQ0FBQyxZQUFPLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sU0FBUyxNQUFNbkIsU0FBUyxRQUFRLEdBQUcsV0FBVSx3SkFDakksaUNBQUMsYUFBVSx3QkFBcUIsOEJBQTZCLHdCQUFxQixTQUFRLFdBQVUsYUFBcEc7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBNkcsS0FEL0c7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFQTtBQUFBLFlBR0EsdUJBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFdBQVUsOERBQzNGO0FBQUEscUNBQUMsWUFBTyx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFNBQVMyRCxVQUFVLFdBQVUscUdBQ2pILGlDQUFDLGVBQVksd0JBQXFCLDhCQUE2Qix3QkFBcUIsU0FBUSxXQUFVLGFBQXRHO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQStHLEtBRGpIO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBRUE7QUFBQSxjQUNBLHVCQUFDLFFBQUcsd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFVLHlEQUN6RnRGLGlCQUFPNkIsYUFBYSxhQUFhLEVBQUV5RSxRQUFRakcsR0FBRyxDQUFDLEtBRGxEO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBRUE7QUFBQSxjQUNBLHVCQUFDLFlBQU8sd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxTQUFTa0YsVUFBVSxXQUFVLHFHQUNqSCxpQ0FBQyxnQkFBYSx3QkFBcUIsOEJBQTZCLHdCQUFxQixTQUFRLFdBQVUsYUFBdkc7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBZ0gsS0FEbEg7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFFQTtBQUFBLGlCQVRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBVUE7QUFBQSxZQUVBLHVCQUFDLFlBQU8sd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxTQUFTQyxTQUFTLFdBQVUseUhBQXVILG9CQUF6TztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVBO0FBQUEsZUFwQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFxQkE7QUFBQSxVQUdBLHVCQUFDLFNBQUksd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFVLGtDQUMxRnRDLG1CQUFTMEIsSUFBSSxDQUFDMkIsS0FBSzVGLE1BQU07QUFDeEIsa0JBQU1tRSxNQUFNOUUsT0FBT3VHLEtBQUssWUFBWTtBQUNwQyxrQkFBTUMsVUFBVTFCLFFBQVFXO0FBQ3hCLGtCQUFNZ0IsUUFBUTlCLGNBQWNHLEdBQUcsR0FBR3JFLFVBQVU7QUFDNUMsa0JBQU1pRyxjQUFjMUIsZUFBZUYsR0FBRyxHQUFHckUsVUFBVSxNQUFNMEUsWUFBWUwsR0FBRyxHQUFHckUsVUFBVTtBQUNyRixrQkFBTWtHLGFBQWFyRSxnQkFBZ0J3QztBQUNuQyxtQkFDRTtBQUFBLGNBQUM7QUFBQTtBQUFBLGdCQUFPLHdCQUFxQjtBQUFBLGdCQUE2Qix3QkFBcUI7QUFBQSxnQkFBaUIsU0FBUyxNQUFNdkMsZUFBZW9FLGFBQWEsT0FBTzdCLEdBQUc7QUFBQSxnQkFDckosV0FBVyxpR0FDWDZCLGFBQWEsZ0RBQ2JILFVBQVUsNERBQ1Ysb0dBQW9HO0FBQUEsZ0JBRWxHO0FBQUEseUNBQUMsVUFBSyx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFdBQVUsNkJBQTRCLDhCQUEyQixLQUFJLDJCQUF5QmxELFdBQVdzRCxNQUFNdEQsV0FBV3VELEtBQU12RCxvQkFBVTNDLENBQUMsS0FBL047QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBaU87QUFBQSxrQkFDak8sdUJBQUMsVUFBSyx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFdBQVcsNEJBQTRCZ0csYUFBYSxlQUFlLGlCQUFpQixJQUFLM0csaUJBQU91RyxLQUFLLEdBQUcsS0FBNUw7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBOEw7QUFBQSxrQkFDN0xFLFFBQVEsS0FBSyx1QkFBQyxVQUFLLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sV0FBVyxvQ0FBb0NFLGFBQWEsa0JBQWtCLGdCQUFnQixJQUFJLDhCQUEyQixTQUFTRjtBQUFBQTtBQUFBQSxvQkFBTTtBQUFBLHVCQUFoTztBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUFtTztBQUFBLGtCQUNoUEMsYUFBYSxLQUFLLHVCQUFDLFVBQUssd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFXLDRCQUE0QkMsYUFBYSxrQkFBa0IsaUJBQWlCLElBQUksOEJBQTJCLGNBQWNEO0FBQUFBO0FBQUFBLG9CQUFXO0FBQUEsdUJBQW5PO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQXNPO0FBQUE7QUFBQTtBQUFBLGNBVGhLNUI7QUFBQUEsY0FBM0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQVVBO0FBQUEsVUFFSixDQUFDLEtBcEJIO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBcUJBO0FBQUEsYUE5Q0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQStDQTtBQUFBLFFBR0EsdUJBQUMsU0FBSSx3QkFBcUIsNkJBQTRCLHdCQUFxQixRQUFPLEtBQUtsRCxXQUFXLFdBQVUsNEJBQzFHLGlDQUFDLFNBQUksd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFVLHFGQUMzRixpQ0FBQyxTQUFJLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sV0FBVSxRQUFPLE9BQU8sRUFBRWtGLHFCQUFxQixXQUFXLEdBQzNJO0FBQUEsaUNBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFdBQVUsUUFDMUZ4RyxnQkFBTXNFO0FBQUFBLFlBQUksQ0FBQ21DLE1BQ1osdUJBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFlLFdBQVUsMENBQ2pHLGlDQUFDLFVBQUssd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFVLHdDQUF3Q0M7QUFBQUEscUJBQU9ELENBQUMsRUFBRUUsU0FBUyxHQUFHLEdBQUc7QUFBQSxjQUFFO0FBQUEsaUJBQWpLO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQW9LLEtBRGhGRixHQUF4RjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVFO0FBQUEsVUFDRixLQUxGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBTUE7QUFBQSxVQUNBLHVCQUFDLFNBQUksd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFVLG9CQUMxRjdELG1CQUFTMEIsSUFBSSxDQUFDMkIsUUFBUTtBQUNyQixrQkFBTXpCLE1BQU05RSxPQUFPdUcsS0FBSyxZQUFZO0FBQ3BDLGtCQUFNVyxjQUFjdkMsY0FBY0csR0FBRyxLQUFLO0FBQzFDLGtCQUFNcUMsZUFBZW5DLGVBQWVGLEdBQUcsS0FBSztBQUM1QyxrQkFBTXNDLFlBQVlqQyxZQUFZTCxHQUFHLEtBQUs7QUFDdEMsbUJBQ0UsdUJBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFpQixXQUFVLHNDQUNwR3hFO0FBQUFBLG9CQUFNc0UsSUFBSSxDQUFDbUMsTUFBTSx1QkFBQyxTQUFJLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQWUsV0FBVSxrREFBYkEsR0FBeEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBbUosQ0FBRztBQUFBLGNBQ3ZLRyxZQUFZdEMsSUFBSSxDQUFDUCxNQUFNO0FBQ3RCLHNCQUFNZ0QsT0FBTyxJQUFJdEYsS0FBS3NDLEVBQUVDLFlBQVk7QUFDcEMsc0JBQU1nRCxPQUFPRCxLQUFLRSxTQUFTO0FBQzNCLHNCQUFNQyxPQUFPSCxLQUFLSSxXQUFXO0FBQzdCLHNCQUFNQyxVQUFVSixPQUFPRSxPQUFPLE1BQU0sS0FBSztBQUN6QyxzQkFBTUcsU0FBUzdHLFdBQVd1RCxFQUFFdUQsU0FBUyxLQUFLOUcsV0FBV0M7QUFDckQsdUJBQ0U7QUFBQSxrQkFBQztBQUFBO0FBQUEsb0JBQUksd0JBQXFCO0FBQUEsb0JBQTZCLHdCQUFxQjtBQUFBLG9CQUM1RSxXQUFVO0FBQUEsb0JBQ1YsT0FBTyxFQUFFOEcsS0FBSyxHQUFHSCxNQUFNLEtBQUtJLGlCQUFpQkgsT0FBTzNHLElBQUkrRyxPQUFPSixPQUFPMUcsTUFBTStHLFdBQVcsUUFBUUMsWUFBWSxhQUFhTixPQUFPMUcsSUFBSSxHQUFHO0FBQUEsb0JBQUcsMkJBQXlCb0QsR0FBR3VDO0FBQUFBLG9CQUNuSztBQUFBLDZDQUFDLFVBQUssd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFVLGVBQWV2QyxZQUFFNkQsWUFBWSxVQUEzSDtBQUFBO0FBQUE7QUFBQTtBQUFBLDZCQUFrSTtBQUFBLHNCQUNsSSx1QkFBQyxVQUFLLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sV0FBVSxtQkFBa0IsOEJBQTJCLG9CQUFtQiwyQkFBeUI3RCxHQUFHdUMsSUFBS3ZDO0FBQUFBLDBCQUFFOEQ7QUFBQUEsd0JBQWlCO0FBQUEsMkJBQWxOO0FBQUE7QUFBQTtBQUFBO0FBQUEsNkJBQW1OO0FBQUE7QUFBQTtBQUFBLGtCQUo3SDlELEVBQUV1QztBQUFBQSxrQkFBMUY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFLQTtBQUFBLGNBRUosQ0FBQztBQUFBLGNBQ0FPLGFBQWF2QyxJQUFJLENBQUNLLE9BQU87QUFDeEIsc0JBQU1vQyxPQUFPLElBQUl0RixLQUFLa0QsR0FBR0MsUUFBUTtBQUNqQyxzQkFBTW9DLE9BQU9ELEtBQUtFLFNBQVM7QUFDM0Isc0JBQU1DLE9BQU9ILEtBQUtJLFdBQVc7QUFDN0Isc0JBQU1DLFVBQVVKLE9BQU9FLE9BQU8sTUFBTSxLQUFLO0FBQ3pDLHNCQUFNWSxNQUFNbkQsR0FBRzhDLFNBQVM5QyxHQUFHOEMsTUFBTU0sV0FBVyxHQUFHLElBQUlwRCxHQUFHOEMsUUFBUTtBQUM5RCx1QkFDRTtBQUFBLGtCQUFDO0FBQUE7QUFBQSxvQkFBSSx3QkFBcUI7QUFBQSxvQkFBNkIsd0JBQXFCO0FBQUEsb0JBQzVFLFdBQVU7QUFBQSxvQkFDVixPQUFPLEVBQUVGLEtBQUssR0FBR0gsTUFBTSxLQUFLSSxpQkFBaUJNLE1BQU0sTUFBTUwsT0FBT0ssS0FBS0osV0FBVyxRQUFRQyxZQUFZLGFBQWFHLEdBQUcsR0FBRztBQUFBLG9CQUFHLDJCQUF5Qm5ELElBQUkyQjtBQUFBQSxvQkFBSSw4QkFBMkI7QUFBQSxvQkFBTTtBQUFBO0FBQUEsc0JBQ3ZMM0IsR0FBR3FEO0FBQUFBO0FBQUFBO0FBQUFBLGtCQUhnRnJELEdBQUcyQjtBQUFBQSxrQkFBM0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFJQTtBQUFBLGNBRUosQ0FBQztBQUFBLGNBQ0FRLFVBQVV4QyxJQUFJLENBQUNRLE9BQU87QUFDckIsc0JBQU1tRCxZQUFZLElBQUl4RyxLQUFLcUQsR0FBR0MsY0FBYztBQUM1QyxzQkFBTWlDLE9BQU9pQixVQUFVaEIsU0FBUztBQUNoQyxzQkFBTUMsT0FBT2UsVUFBVWQsV0FBVztBQUNsQyxzQkFBTUMsVUFBVUosT0FBT0UsT0FBTyxNQUFNLEtBQUs7QUFDekMsc0JBQU1ZLE1BQU1oRCxHQUFHMkMsU0FBUzNDLEdBQUcyQyxNQUFNTSxXQUFXLEdBQUcsSUFBSWpELEdBQUcyQyxRQUFRO0FBRTlELG9CQUFJUyxZQUFZO0FBQ2hCLG9CQUFJcEQsR0FBR3FELGNBQWM7QUFDbkIsd0JBQU1DLFVBQVUsSUFBSTNHLEtBQUtxRCxHQUFHcUQsWUFBWTtBQUN4Qyx3QkFBTUUsV0FBV0QsVUFBVUgsYUFBYTtBQUN4Q0MsOEJBQVlJLEtBQUtDLElBQUksR0FBR0YsV0FBVyxLQUFLLE1BQU0sR0FBRztBQUFBLGdCQUNuRDtBQUNBLHVCQUNFO0FBQUEsa0JBQUM7QUFBQTtBQUFBLG9CQUFJLHdCQUFxQjtBQUFBLG9CQUE2Qix3QkFBcUI7QUFBQSxvQkFDNUUsV0FBVTtBQUFBLG9CQUNWLE9BQU8sRUFBRWQsS0FBSyxHQUFHSCxNQUFNLEtBQUtvQixRQUFRLEdBQUdGLEtBQUtHLElBQUlQLFdBQVcsRUFBRSxDQUFDLEtBQUtWLGlCQUFpQk0sTUFBTSxNQUFNTCxPQUFPSyxLQUFLSCxZQUFZLGFBQWFHLEdBQUcsSUFBSVksVUFBVSxTQUFTO0FBQUEsb0JBQUcsMkJBQXlCNUQsSUFBSXdCO0FBQUFBLG9CQUFJLDhCQUEyQjtBQUFBLG9CQUFNO0FBQUE7QUFBQSxzQkFDOU54QixHQUFHa0Q7QUFBQUE7QUFBQUE7QUFBQUEsa0JBSCtFbEQsR0FBR3dCO0FBQUFBLGtCQUEzRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQUlBO0FBQUEsY0FFSixDQUFDO0FBQUEsaUJBbkRxRjlCLEtBQXhGO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBb0RBO0FBQUEsVUFFSixDQUFDLEtBN0RIO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBOERBO0FBQUEsYUF0RUY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQXVFQSxLQXhFRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBeUVBLEtBMUVGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUEyRUE7QUFBQSxRQUdDeEMsZUFDRDtBQUFBLFVBQUMsT0FBTztBQUFBLFVBQVA7QUFBQSxZQUFXLHdCQUFxQjtBQUFBLFlBQTZCLHdCQUFxQjtBQUFBLFlBQU8sU0FBUyxFQUFFTSxHQUFHLE9BQU87QUFBQSxZQUFHLFNBQVMsRUFBRUEsR0FBRyxFQUFFO0FBQUEsWUFBRyxNQUFNLEVBQUVBLEdBQUcsT0FBTztBQUFBLFlBQ3ZKLFdBQVU7QUFBQSxZQUNOO0FBQUEscUNBQUMsUUFBRyx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFdBQVUsOEJBQThCNUMsaUJBQU9FLFNBQVNvQyxXQUFXLEdBQUcscUJBQXFCLEVBQUVnRSxRQUFRakcsR0FBRyxDQUFDLEtBQTNMO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQTZMO0FBQUEsZUFDM0wsTUFBTTtBQUNSLHNCQUFNNEksVUFBVXRFLGNBQWNyQyxXQUFXLEtBQUs7QUFDOUMsc0JBQU00RyxRQUFRbEUsZUFBZTFDLFdBQVcsS0FBSztBQUM3QyxzQkFBTTZHLFFBQVFoRSxZQUFZN0MsV0FBVyxLQUFLO0FBQzFDLHNCQUFNOEcsUUFBUUgsUUFBUXhJLFNBQVN5SSxNQUFNekksU0FBUzBJLE1BQU0xSTtBQUNwRCxvQkFBSTJJLFVBQVUsRUFBRyxRQUFPLHVCQUFDLE9BQUUsd0JBQXFCLDhCQUE2Qix3QkFBcUIsU0FBUSxXQUFVLGlDQUFnQyxzQ0FBNUg7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBa0o7QUFDMUssdUJBQ0UsdUJBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFdBQVUsYUFDeEZIO0FBQUFBLDBCQUFRckUsSUFBSSxDQUFDUCxNQUFNO0FBQ3BCLDBCQUFNc0QsU0FBUzdHLFdBQVd1RCxFQUFFdUQsU0FBUyxLQUFLOUcsV0FBV0M7QUFDckQsMkJBQ0UsdUJBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFrQixXQUFVLHdFQUF1RSwyQkFBeUJzRCxHQUFHdUMsSUFDdk07QUFBQSw2Q0FBQyxVQUFLLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sV0FBVSwyQ0FBMkM1RyxpQkFBTyxJQUFJK0IsS0FBS3NDLEVBQUVDLFlBQVksR0FBRyxPQUFPLEtBQWpMO0FBQUE7QUFBQTtBQUFBO0FBQUEsNkJBQW1MO0FBQUEsc0JBQ25MLHVCQUFDLFVBQUssd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFVLGdEQUErQyxPQUFPLEVBQUV3RCxpQkFBaUJILE9BQU8zRyxJQUFJK0csT0FBT0osT0FBTzFHLEtBQUssR0FBRztBQUFBO0FBQUEsd0JBQUlvRCxFQUFFNkQsWUFBWTtBQUFBLDJCQUExTjtBQUFBO0FBQUE7QUFBQTtBQUFBLDZCQUFpTztBQUFBLHNCQUNqTyx1QkFBQyxVQUFLLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sV0FBVSx5Q0FBd0MsOEJBQTJCLG9CQUFtQiwyQkFBeUI3RCxHQUFHdUMsSUFBS3ZDO0FBQUFBLDBCQUFFOEQ7QUFBQUEsd0JBQWlCO0FBQUEsMkJBQXhPO0FBQUE7QUFBQTtBQUFBO0FBQUEsNkJBQTRPO0FBQUEseUJBSHhKOUQsRUFBRXVDLElBQTFGO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkJBSUU7QUFBQSxrQkFFTixDQUFDO0FBQUEsa0JBQ0VzQyxNQUFNdEUsSUFBSSxDQUFDSyxPQUFPO0FBQ25CLDBCQUFNbUQsTUFBTW5ELEdBQUc4QyxTQUFTOUMsR0FBRzhDLE1BQU1NLFdBQVcsR0FBRyxJQUFJcEQsR0FBRzhDLFFBQVE7QUFDOUQsMkJBQ0UsdUJBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFtQixXQUFVLHdEQUF1RCxPQUFPLEVBQUVELGlCQUFpQk0sTUFBTSxLQUFLLEdBQUcsMkJBQXlCbkQsSUFBSTJCLElBQ2pPO0FBQUEsNkNBQUMsVUFBSyx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFdBQVUsMkNBQTJDNUcsaUJBQU8sSUFBSStCLEtBQUtrRCxHQUFHQyxRQUFRLEdBQUcsT0FBTyxLQUE5SztBQUFBO0FBQUE7QUFBQTtBQUFBLDZCQUFnTDtBQUFBLHNCQUNoTCx1QkFBQyxVQUFLLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sV0FBVSwyREFBMEQsT0FBTyxFQUFFNEMsaUJBQWlCTSxJQUFJLEdBQUcsdUJBQXpMO0FBQUE7QUFBQTtBQUFBO0FBQUEsNkJBQWdNO0FBQUEsc0JBQ2hNLHVCQUFDLFVBQUssd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFVLGdDQUErQixPQUFPLEVBQUVMLE9BQU9LLElBQUksR0FBRyw4QkFBMkIsUUFBTywyQkFBeUJuRCxJQUFJMkIsSUFBSzNCLGFBQUdxRCxRQUEzTjtBQUFBO0FBQUE7QUFBQTtBQUFBLDZCQUFnTztBQUFBLHlCQUg1SXJELEdBQUcyQixJQUEzRjtBQUFBO0FBQUE7QUFBQTtBQUFBLDJCQUlFO0FBQUEsa0JBRU4sQ0FBQztBQUFBLGtCQUNFdUMsTUFBTXZFLElBQUksQ0FBQ1EsT0FBTztBQUNuQiwwQkFBTWdELE1BQU1oRCxHQUFHMkMsU0FBUzNDLEdBQUcyQyxNQUFNTSxXQUFXLEdBQUcsSUFBSWpELEdBQUcyQyxRQUFRO0FBQzlELDJCQUNFLHVCQUFDLFNBQUksd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBbUIsV0FBVSx3REFBdUQsT0FBTyxFQUFFRCxpQkFBaUJNLE1BQU0sS0FBSyxHQUFHLDJCQUF5QmhELElBQUl3QixJQUNqTztBQUFBLDZDQUFDLFVBQUssd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFVLDJDQUEyQzVHLGlCQUFPLElBQUkrQixLQUFLcUQsR0FBR0MsY0FBYyxHQUFHLE9BQU8sS0FBcEw7QUFBQTtBQUFBO0FBQUE7QUFBQSw2QkFBc0w7QUFBQSxzQkFDdEwsdUJBQUMsVUFBSyx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFdBQVUsMkRBQTBELE9BQU8sRUFBRXlDLGlCQUFpQk0sSUFBSSxHQUFHLHlCQUF6TDtBQUFBO0FBQUE7QUFBQTtBQUFBLDZCQUFrTTtBQUFBLHNCQUNsTSx1QkFBQyxVQUFLLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sV0FBVSxnQ0FBK0IsT0FBTyxFQUFFTCxPQUFPSyxJQUFJLEdBQUcsOEJBQTJCLFFBQU8sMkJBQXlCaEQsSUFBSXdCLElBQUt4QixhQUFHa0QsUUFBM047QUFBQTtBQUFBO0FBQUE7QUFBQSw2QkFBZ087QUFBQSx5QkFINUlsRCxHQUFHd0IsSUFBM0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSwyQkFJRTtBQUFBLGtCQUVOLENBQUM7QUFBQSxxQkE5Qkg7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkErQkU7QUFBQSxjQUVOLEdBQUc7QUFBQTtBQUFBO0FBQUEsVUEzQ0w7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBNENFO0FBQUEsV0EvS0o7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQWlMQTtBQUFBO0FBQUEsSUF6TEY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBMExBO0FBRUo7QUFBQ2xGLEdBalJ1QkQsZUFBYTtBQUFBLFVBQ2xCbkMsV0FBVztBQUFBO0FBQUEsS0FETm1DO0FBQWEsSUFBQTRIO0FBQUEsYUFBQUEsSUFBQSIsIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlTWVtbyIsInVzZUNhbGxiYWNrIiwidXNlUmVmIiwidXNlTmF2aWdhdGUiLCJtb3Rpb24iLCJBcnJvd0xlZnQiLCJDaGV2cm9uTGVmdCIsIkNoZXZyb25SaWdodCIsImJhc2U0NCIsInN0YXJ0T2ZXZWVrIiwiZW5kT2ZXZWVrIiwiYWRkV2Vla3MiLCJzdWJXZWVrcyIsImZvcm1hdCIsImlzV2l0aGluSW50ZXJ2YWwiLCJwYXJzZUlTTyIsImlzQmVmb3JlIiwiaXNBZnRlciIsInB0IiwiSE9VUlMiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJfIiwiaSIsIkRBWV9MQUJFTFNfTU9OIiwiREFZX0xBQkVMU19TVU4iLCJUQUdfQ09MT1JTIiwiYmx1ZSIsImJnIiwidGV4dCIsInB1cnBsZSIsImdyZWVuIiwiYW1iZXIiLCJyb3NlIiwidGVhbCIsImluZGlnbyIsInBpbmsiLCJGb2N1c0NhbGVuZGFyIiwiX3MiLCJuYXZpZ2F0ZSIsInNjcm9sbFJlZiIsImN1cnJlbnREYXRlIiwic2V0Q3VycmVudERhdGUiLCJEYXRlIiwic2Vzc2lvbnMiLCJzZXRTZXNzaW9ucyIsImRlYWRsaW5lcyIsInNldERlYWRsaW5lcyIsImV2ZW50cyIsInNldEV2ZW50cyIsInNlbGVjdGVkRGF5Iiwic2V0U2VsZWN0ZWREYXkiLCJ3ZWVrU3RhcnRzT24iLCJzZXRXZWVrU3RhcnRzT24iLCJ0b3VjaFN0YXJ0IiwieCIsInkiLCJkcmFnT2Zmc2V0IiwiZHJhZ1N0eWxlIiwic2V0RHJhZ1N0eWxlIiwid2Vla1N0YXJ0Iiwid2Vla0VuZCIsIndlZWtEYXlzIiwiZCIsInNldERhdGUiLCJnZXREYXRlIiwiZGF5TGFiZWxzIiwiYXV0aCIsIm1lIiwidGhlbiIsInUiLCJ3ZWVrX3N0YXJ0c19vbiIsInVuZGVmaW5lZCIsImNhdGNoIiwiZW50aXRpZXMiLCJGb2N1c1Nlc3Npb24iLCJsaXN0IiwiRGVhZGxpbmUiLCJFdmVudCIsInNlc3Npb25zSW5XZWVrIiwiZmlsdGVyIiwicyIsImNyZWF0ZWRfZGF0ZSIsInN0YXJ0IiwiZW5kIiwidHlwZSIsImNvbXBsZXRlZCIsInNlc3Npb25zQnlEYXkiLCJtYXAiLCJmb3JFYWNoIiwia2V5IiwicHVzaCIsImRlYWRsaW5lc0J5RGF5IiwiZGwiLCJkZWFkbGluZSIsImV2ZW50c0J5RGF5IiwiZXYiLCJzdGFydF9kYXRldGltZSIsInByZXZXZWVrIiwibmV4dFdlZWsiLCJnb1RvZGF5IiwidG9kYXlTdHIiLCJoYW5kbGVQb2ludGVyU3RhcnQiLCJjdXJyZW50IiwiaGFuZGxlUG9pbnRlck1vdmUiLCJ0cmFuc2Zvcm0iLCJ0cmFuc2l0aW9uIiwiaGFuZGxlUG9pbnRlckVuZCIsImUiLCJ0b3VjaGVzIiwiY2xpZW50WCIsImNsaWVudFkiLCJjaGFuZ2VkVG91Y2hlcyIsImJ1dHRvbnMiLCJsb2NhbGUiLCJkYXkiLCJpc1RvZGF5IiwiY291bnQiLCJleHRyYUNvdW50IiwiaXNTZWxlY3RlZCIsImlkIiwiX2lkIiwiZ3JpZFRlbXBsYXRlQ29sdW1ucyIsImgiLCJTdHJpbmciLCJwYWRTdGFydCIsImRheVNlc3Npb25zIiwiZGF5RGVhZGxpbmVzIiwiZGF5RXZlbnRzIiwiZGF0ZSIsImhvdXIiLCJnZXRIb3VycyIsIm1pbnMiLCJnZXRNaW51dGVzIiwidG9wUGN0IiwiY29sb3JzIiwidGFnX2NvbG9yIiwidG9wIiwiYmFja2dyb3VuZENvbG9yIiwiY29sb3IiLCJtaW5IZWlnaHQiLCJib3JkZXJMZWZ0IiwidGFnX25hbWUiLCJkdXJhdGlvbl9taW51dGVzIiwiaGV4Iiwic3RhcnRzV2l0aCIsIm5hbWUiLCJzdGFydERhdGUiLCJoZWlnaHRQY3QiLCJlbmRfZGF0ZXRpbWUiLCJlbmREYXRlIiwiZHVyTWlucyIsIk1hdGgiLCJtYXgiLCJoZWlnaHQiLCJtaW4iLCJvdmVyZmxvdyIsImRheVNlc3MiLCJkYXlEbCIsImRheUV2IiwidG90YWwiLCJfYyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJGb2N1c0NhbGVuZGFyLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VDYWxsYmFjaywgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VOYXZpZ2F0ZSB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5pbXBvcnQgeyBtb3Rpb24gfSBmcm9tIFwiZnJhbWVyLW1vdGlvblwiO1xuaW1wb3J0IHsgQXJyb3dMZWZ0LCBDaGV2cm9uTGVmdCwgQ2hldnJvblJpZ2h0IH0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xuaW1wb3J0IHsgYmFzZTQ0IH0gZnJvbSBcIkAvYXBpL2Jhc2U0NENsaWVudFwiO1xuaW1wb3J0IHsgc3RhcnRPZldlZWssIGVuZE9mV2VlaywgYWRkV2Vla3MsIHN1YldlZWtzLCBmb3JtYXQsIGlzV2l0aGluSW50ZXJ2YWwsIHBhcnNlSVNPLCBpc0JlZm9yZSwgaXNBZnRlciB9IGZyb20gXCJkYXRlLWZuc1wiO1xuaW1wb3J0IHsgcHQgfSBmcm9tIFwiZGF0ZS1mbnMvbG9jYWxlXCI7XG5cbmNvbnN0IEhPVVJTID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMjQgfSwgKF8sIGkpID0+IGkpO1xuY29uc3QgREFZX0xBQkVMU19NT04gPSBbXCJTZWdcIiwgXCJUZXJcIiwgXCJRdWFcIiwgXCJRdWlcIiwgXCJTZXhcIiwgXCJTw6FiXCIsIFwiRG9tXCJdO1xuY29uc3QgREFZX0xBQkVMU19TVU4gPSBbXCJEb21cIiwgXCJTZWdcIiwgXCJUZXJcIiwgXCJRdWFcIiwgXCJRdWlcIiwgXCJTZXhcIiwgXCJTw6FiXCJdO1xuXG5jb25zdCBUQUdfQ09MT1JTID0ge1xuICBibHVlOiB7IGJnOiBcIiNEQkVBRkVcIiwgdGV4dDogXCIjMUQ0RUQ4XCIgfSwgcHVycGxlOiB7IGJnOiBcIiNFREU5RkVcIiwgdGV4dDogXCIjNkQyOEQ5XCIgfSxcbiAgZ3JlZW46IHsgYmc6IFwiI0QxRkFFNVwiLCB0ZXh0OiBcIiMwNDc4NTdcIiB9LCBhbWJlcjogeyBiZzogXCIjRkVGM0M3XCIsIHRleHQ6IFwiI0I0NTMwOVwiIH0sXG4gIHJvc2U6IHsgYmc6IFwiI0ZGRTRFNlwiLCB0ZXh0OiBcIiNCRTEyM0NcIiB9LCB0ZWFsOiB7IGJnOiBcIiNDQ0ZCRjFcIiwgdGV4dDogXCIjMEY3NjZFXCIgfSxcbiAgaW5kaWdvOiB7IGJnOiBcIiNFMEU3RkZcIiwgdGV4dDogXCIjMzczMEEzXCIgfSwgcGluazogeyBiZzogXCIjRkNFN0YzXCIsIHRleHQ6IFwiIzlEMTc0RFwiIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEZvY3VzQ2FsZW5kYXIoKSB7XG4gIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcbiAgY29uc3Qgc2Nyb2xsUmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBbY3VycmVudERhdGUsIHNldEN1cnJlbnREYXRlXSA9IHVzZVN0YXRlKG5ldyBEYXRlKCkpO1xuICBjb25zdCBbc2Vzc2lvbnMsIHNldFNlc3Npb25zXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW2RlYWRsaW5lcywgc2V0RGVhZGxpbmVzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW2V2ZW50cywgc2V0RXZlbnRzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW3NlbGVjdGVkRGF5LCBzZXRTZWxlY3RlZERheV0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3dlZWtTdGFydHNPbiwgc2V0V2Vla1N0YXJ0c09uXSA9IHVzZVN0YXRlKDEpO1xuICBjb25zdCB0b3VjaFN0YXJ0ID0gdXNlUmVmKHsgeDogMCwgeTogMCB9KTtcbiAgY29uc3QgZHJhZ09mZnNldCA9IHVzZVJlZih7IHg6IDAsIHk6IDAgfSk7XG4gIGNvbnN0IFtkcmFnU3R5bGUsIHNldERyYWdTdHlsZV0gPSB1c2VTdGF0ZSh7fSk7XG5cbiAgY29uc3Qgd2Vla1N0YXJ0ID0gc3RhcnRPZldlZWsoY3VycmVudERhdGUsIHsgd2Vla1N0YXJ0c09uIH0pO1xuICBjb25zdCB3ZWVrRW5kID0gZW5kT2ZXZWVrKGN1cnJlbnREYXRlLCB7IHdlZWtTdGFydHNPbiB9KTtcbiAgY29uc3Qgd2Vla0RheXMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiA3IH0sIChfLCBpKSA9PiB7Y29uc3QgZCA9IG5ldyBEYXRlKHdlZWtTdGFydCk7ZC5zZXREYXRlKGQuZ2V0RGF0ZSgpICsgaSk7cmV0dXJuIGQ7fSk7XG4gIGNvbnN0IGRheUxhYmVscyA9IHdlZWtTdGFydHNPbiA9PT0gMSA/IERBWV9MQUJFTFNfTU9OIDogREFZX0xBQkVMU19TVU47XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBiYXNlNDQuYXV0aC5tZSgpLnRoZW4oKHUpID0+IHtcbiAgICAgIGlmICh1Py53ZWVrX3N0YXJ0c19vbiAhPT0gdW5kZWZpbmVkKSBzZXRXZWVrU3RhcnRzT24odS53ZWVrX3N0YXJ0c19vbik7XG4gICAgfSkuY2F0Y2goKCkgPT4ge30pO1xuICAgIGJhc2U0NC5lbnRpdGllcy5Gb2N1c1Nlc3Npb24ubGlzdChcIi1jcmVhdGVkX2RhdGVcIiwgNTAwKS50aGVuKHNldFNlc3Npb25zKS5jYXRjaCgoKSA9PiBzZXRTZXNzaW9ucyhbXSkpO1xuICAgIGJhc2U0NC5lbnRpdGllcy5EZWFkbGluZS5saXN0KFwiLWRlYWRsaW5lXCIsIDIwMCkudGhlbihzZXREZWFkbGluZXMpLmNhdGNoKCgpID0+IHt9KTtcbiAgICBiYXNlNDQuZW50aXRpZXMuRXZlbnQubGlzdChcIi1zdGFydF9kYXRldGltZVwiLCAyMDApLnRoZW4oc2V0RXZlbnRzKS5jYXRjaCgoKSA9PiB7fSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBzZXNzaW9uc0luV2VlayA9IHVzZU1lbW8oKCkgPT5cbiAgc2Vzc2lvbnMuZmlsdGVyKChzKSA9PiB7XG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKHMuY3JlYXRlZF9kYXRlKTtcbiAgICByZXR1cm4gaXNXaXRoaW5JbnRlcnZhbChkLCB7IHN0YXJ0OiB3ZWVrU3RhcnQsIGVuZDogd2Vla0VuZCB9KSAmJiBzLnR5cGUgPT09IFwiZm9jdXNcIiAmJiBzLmNvbXBsZXRlZDtcbiAgfSksIFtzZXNzaW9ucywgd2Vla1N0YXJ0LCB3ZWVrRW5kXSk7XG5cbiAgY29uc3Qgc2Vzc2lvbnNCeURheSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IG1hcCA9IHt9O1xuICAgIHdlZWtEYXlzLmZvckVhY2goKGQpID0+IHttYXBbZm9ybWF0KGQsIFwieXl5eS1NTS1kZFwiKV0gPSBbXTt9KTtcbiAgICBzZXNzaW9uc0luV2Vlay5mb3JFYWNoKChzKSA9PiB7XG4gICAgICBjb25zdCBkID0gbmV3IERhdGUocy5jcmVhdGVkX2RhdGUpO1xuICAgICAgY29uc3Qga2V5ID0gZm9ybWF0KGQsIFwieXl5eS1NTS1kZFwiKTtcbiAgICAgIGlmIChtYXBba2V5XSkgbWFwW2tleV0ucHVzaChzKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbWFwO1xuICB9LCBbc2Vzc2lvbnNJbldlZWssIHdlZWtEYXlzXSk7XG5cbiAgLy8gRGVhZGxpbmVzIHRoYXQgZmFsbCB3aXRoaW4gdGhlIHdlZWtcbiAgY29uc3QgZGVhZGxpbmVzQnlEYXkgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBtYXAgPSB7fTtcbiAgICB3ZWVrRGF5cy5mb3JFYWNoKChkKSA9PiB7bWFwW2Zvcm1hdChkLCBcInl5eXktTU0tZGRcIildID0gW107fSk7XG4gICAgZGVhZGxpbmVzLmZvckVhY2goKGRsKSA9PiB7XG4gICAgICBpZiAoIWRsLmRlYWRsaW5lKSByZXR1cm47XG4gICAgICBjb25zdCBrZXkgPSBmb3JtYXQobmV3IERhdGUoZGwuZGVhZGxpbmUpLCBcInl5eXktTU0tZGRcIik7XG4gICAgICBpZiAobWFwW2tleV0pIG1hcFtrZXldLnB1c2goZGwpO1xuICAgIH0pO1xuICAgIHJldHVybiBtYXA7XG4gIH0sIFtkZWFkbGluZXMsIHdlZWtEYXlzXSk7XG5cbiAgLy8gRXZlbnRzIHRoYXQgb3ZlcmxhcCB3aXRoIHRoZSB3ZWVrXG4gIGNvbnN0IGV2ZW50c0J5RGF5ID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgbWFwID0ge307XG4gICAgd2Vla0RheXMuZm9yRWFjaCgoZCkgPT4ge21hcFtmb3JtYXQoZCwgXCJ5eXl5LU1NLWRkXCIpXSA9IFtdO30pO1xuICAgIGV2ZW50cy5mb3JFYWNoKChldikgPT4ge1xuICAgICAgaWYgKCFldi5zdGFydF9kYXRldGltZSkgcmV0dXJuO1xuICAgICAgLy8gU2hvdyBldmVudCBvbiBpdHMgc3RhcnQgZGF5IChpZiB3aXRoaW4gd2VlaylcbiAgICAgIGNvbnN0IGtleSA9IGZvcm1hdChuZXcgRGF0ZShldi5zdGFydF9kYXRldGltZSksIFwieXl5eS1NTS1kZFwiKTtcbiAgICAgIGlmIChtYXBba2V5XSkgbWFwW2tleV0ucHVzaChldik7XG4gICAgfSk7XG4gICAgcmV0dXJuIG1hcDtcbiAgfSwgW2V2ZW50cywgd2Vla0RheXNdKTtcblxuICBjb25zdCBwcmV2V2VlayA9ICgpID0+IHNldEN1cnJlbnREYXRlKHN1YldlZWtzKGN1cnJlbnREYXRlLCAxKSk7XG4gIGNvbnN0IG5leHRXZWVrID0gKCkgPT4gc2V0Q3VycmVudERhdGUoYWRkV2Vla3MoY3VycmVudERhdGUsIDEpKTtcbiAgY29uc3QgZ29Ub2RheSA9ICgpID0+IHNldEN1cnJlbnREYXRlKG5ldyBEYXRlKCkpO1xuICBjb25zdCB0b2RheVN0ciA9IGZvcm1hdChuZXcgRGF0ZSgpLCBcInl5eXktTU0tZGRcIik7XG5cbiAgY29uc3QgaGFuZGxlUG9pbnRlclN0YXJ0ID0gdXNlQ2FsbGJhY2soKHgsIHkpID0+IHt0b3VjaFN0YXJ0LmN1cnJlbnQgPSB7IHgsIHkgfTtkcmFnT2Zmc2V0LmN1cnJlbnQgPSB7IHg6IDAsIHk6IDAgfTtzZXREcmFnU3R5bGUoe30pO30sIFtdKTtcbiAgY29uc3QgaGFuZGxlUG9pbnRlck1vdmUgPSB1c2VDYWxsYmFjaygoeCwgeSkgPT4ge1xuICAgIGRyYWdPZmZzZXQuY3VycmVudCA9IHsgeDogeCAtIHRvdWNoU3RhcnQuY3VycmVudC54LCB5OiB5IC0gdG91Y2hTdGFydC5jdXJyZW50LnkgfTtcbiAgICBzZXREcmFnU3R5bGUoeyB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoJHtkcmFnT2Zmc2V0LmN1cnJlbnQueH1weCwgJHtkcmFnT2Zmc2V0LmN1cnJlbnQueX1weClgLCB0cmFuc2l0aW9uOiBcIm5vbmVcIiB9KTtcbiAgfSwgW10pO1xuICBjb25zdCBoYW5kbGVQb2ludGVyRW5kID0gdXNlQ2FsbGJhY2soKHgsIHkpID0+IHtcbiAgICBzZXREcmFnU3R5bGUoeyB0cmFuc2Zvcm06IFwidHJhbnNsYXRlKDAsIDApXCIsIHRyYW5zaXRpb246IFwidHJhbnNmb3JtIDAuM3MgZWFzZS1vdXRcIiB9KTtcbiAgICBpZiAoeCAtIHRvdWNoU3RhcnQuY3VycmVudC54ID4gNjApIG5hdmlnYXRlKFwiL2ZvY3VzXCIpO1xuICB9LCBbbmF2aWdhdGVdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0NhbGVuZGFyOjEwNTo0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIGJnLWNyZWFtIGZsZXggZmxleC1jb2wgc2VsZWN0LW5vbmVcIlxuICAgIG9uVG91Y2hTdGFydD17KGUpID0+IGhhbmRsZVBvaW50ZXJTdGFydChlLnRvdWNoZXNbMF0uY2xpZW50WCwgZS50b3VjaGVzWzBdLmNsaWVudFkpfVxuICAgIG9uVG91Y2hNb3ZlPXsoZSkgPT4gaGFuZGxlUG9pbnRlck1vdmUoZS50b3VjaGVzWzBdLmNsaWVudFgsIGUudG91Y2hlc1swXS5jbGllbnRZKX1cbiAgICBvblRvdWNoRW5kPXsoZSkgPT4gaGFuZGxlUG9pbnRlckVuZChlLmNoYW5nZWRUb3VjaGVzWzBdPy5jbGllbnRYIHx8IHRvdWNoU3RhcnQuY3VycmVudC54LCBlLmNoYW5nZWRUb3VjaGVzWzBdPy5jbGllbnRZIHx8IHRvdWNoU3RhcnQuY3VycmVudC55KX1cbiAgICBvbk1vdXNlRG93bj17KGUpID0+IGhhbmRsZVBvaW50ZXJTdGFydChlLmNsaWVudFgsIGUuY2xpZW50WSl9XG4gICAgb25Nb3VzZU1vdmU9eyhlKSA9PiB7aWYgKGUuYnV0dG9ucyA9PT0gMSkgaGFuZGxlUG9pbnRlck1vdmUoZS5jbGllbnRYLCBlLmNsaWVudFkpO319XG4gICAgb25Nb3VzZVVwPXsoZSkgPT4gaGFuZGxlUG9pbnRlckVuZChlLmNsaWVudFgsIGUuY2xpZW50WSl9PlxuICAgICAgXG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNDYWxlbmRhcjoxMTM6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHN0eWxlPXtkcmFnU3R5bGV9IGNsYXNzTmFtZT1cImZsZXgtMSBmbGV4IGZsZXgtY29sXCI+XG4gICAgICAgIHsvKiBIZWFkZXIgKi99XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0NhbGVuZGFyOjExNTo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiYmctd2hpdGUgYm9yZGVyLWIgYm9yZGVyLWJvcmRlciBweC00IHB5LTNcIj5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNDYWxlbmRhcjoxMTY6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcmVsYXRpdmVcIj5cbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0NhbGVuZGFyOjExNzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKFwiL2ZvY3VzXCIpfSBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgcm91bmRlZC0yeGwgYmctd2hpdGUgYm9yZGVyIGJvcmRlci1ib3JkZXIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGhvdmVyOnRleHQtZm9yZWdyb3VuZCB0cmFuc2l0aW9uLWFsbCB6LTEwXCI+XG4gICAgICAgICAgICAgIDxBcnJvd0xlZnQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0NhbGVuZGFyOjExODoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICB7LyogQ2VudGVyZWQgbW9udGgveWVhciBiZXR3ZWVuIGFycm93cyAqL31cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0NhbGVuZGFyOjEyMjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImFic29sdXRlIGxlZnQtMS8yIC10cmFuc2xhdGUteC0xLzIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQ2FsZW5kYXI6MTIzOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17cHJldldlZWt9IGNsYXNzTmFtZT1cInctOCBoLTggcm91bmRlZC1mdWxsIGJnLXNlY29uZGFyeSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBob3ZlcjpiZy1ib3JkZXIgdHJhbnNpdGlvbi1hbGxcIj5cbiAgICAgICAgICAgICAgICA8Q2hldnJvbkxlZnQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0NhbGVuZGFyOjEyNDoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxoMSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQ2FsZW5kYXI6MTI2OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYm9sZCB0ZXh0LWZvcmVncm91bmQgd2hpdGVzcGFjZS1ub3dyYXBcIj5cbiAgICAgICAgICAgICAgICB7Zm9ybWF0KGN1cnJlbnREYXRlLCBcIk1NTU0geXl5eVwiLCB7IGxvY2FsZTogcHQgfSl9XG4gICAgICAgICAgICAgIDwvaDE+XG4gICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0NhbGVuZGFyOjEyOToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9e25leHRXZWVrfSBjbGFzc05hbWU9XCJ3LTggaC04IHJvdW5kZWQtZnVsbCBiZy1zZWNvbmRhcnkgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgaG92ZXI6YmctYm9yZGVyIHRyYW5zaXRpb24tYWxsXCI+XG4gICAgICAgICAgICAgICAgPENoZXZyb25SaWdodCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQ2FsZW5kYXI6MTMwOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNDYWxlbmRhcjoxMzQ6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXtnb1RvZGF5fSBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZC1mdWxsIGJnLVsjRTg3QTVBXSB0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1zZW1pYm9sZCBob3ZlcjpiZy1bI0Q0Njk0QV0gdHJhbnNpdGlvbi1hbGwgc2hhZG93LXNtIHotMTBcIj5cbiAgICAgICAgICAgICAgSG9qZVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogRGF5IHBpbGxzICovfVxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0NhbGVuZGFyOjE0MDoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZ2FwLTIgbXQtNCBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAge3dlZWtEYXlzLm1hcCgoZGF5LCBpKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGtleSA9IGZvcm1hdChkYXksIFwieXl5eS1NTS1kZFwiKTtcbiAgICAgICAgICAgICAgY29uc3QgaXNUb2RheSA9IGtleSA9PT0gdG9kYXlTdHI7XG4gICAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gc2Vzc2lvbnNCeURheVtrZXldPy5sZW5ndGggfHwgMDtcbiAgICAgICAgICAgICAgY29uc3QgZXh0cmFDb3VudCA9IChkZWFkbGluZXNCeURheVtrZXldPy5sZW5ndGggfHwgMCkgKyAoZXZlbnRzQnlEYXlba2V5XT8ubGVuZ3RoIHx8IDApO1xuICAgICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gc2VsZWN0ZWREYXkgPT09IGtleTtcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNDYWxlbmRhcjoxNDg6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBrZXk9e2tleX0gb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWREYXkoaXNTZWxlY3RlZCA/IG51bGwgOiBrZXkpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXgtMSBtYXgtdy1bNzBweF0gZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgcHktMi41IHB4LTEgcm91bmRlZC0yeGwgdHJhbnNpdGlvbi1hbGwgdGV4dC14cyAke1xuICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQgPyBcImJnLVsjRTg3QTVBXSB0ZXh0LXdoaXRlIHNoYWRvdy1tZCBzY2FsZS0xMDVcIiA6XG4gICAgICAgICAgICAgICAgaXNUb2RheSA/IFwiYmctWyNFODdBNUFdLzEwIHRleHQtWyNFODdBNUFdIHJpbmctMSByaW5nLVsjRTg3QTVBXS8zMFwiIDpcbiAgICAgICAgICAgICAgICBcImJnLXdoaXRlIGJvcmRlciBib3JkZXItYm9yZGVyIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBob3Zlcjpib3JkZXItWyNFODdBNUFdLzMwIGhvdmVyOmJnLVsjRTg3QTVBXS81XCJ9YFxuICAgICAgICAgICAgICAgIH0+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQ2FsZW5kYXI6MTU0OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LVsxMXB4XVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiaVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtkYXlMYWJlbHM/LmlkIHx8IGRheUxhYmVscz8uX2lkfT57ZGF5TGFiZWxzW2ldfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNDYWxlbmRhcjoxNTU6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9e2B0ZXh0LWxnIGZvbnQtYm9sZCBtdC0wLjUgJHtpc1NlbGVjdGVkID8gXCJ0ZXh0LXdoaXRlXCIgOiBcInRleHQtZm9yZWdyb3VuZFwifWB9Pntmb3JtYXQoZGF5LCBcImRcIil9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAge2NvdW50ID4gMCAmJiA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQ2FsZW5kYXI6MTU2OjMyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPXtgdGV4dC1bMTBweF0gbXQtMC41IGZvbnQtc2VtaWJvbGQgJHtpc1NlbGVjdGVkID8gXCJ0ZXh0LXdoaXRlLzgwXCIgOiBcInRleHQtWyNFODdBNUFdXCJ9YH0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJjb3VudFwiPntjb3VudH0g8J+Nijwvc3Bhbj59XG4gICAgICAgICAgICAgICAgICB7ZXh0cmFDb3VudCA+IDAgJiYgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0NhbGVuZGFyOjE1NzozN1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT17YHRleHQtWzlweF0gZm9udC1zZW1pYm9sZCAke2lzU2VsZWN0ZWQgPyBcInRleHQtd2hpdGUvNzBcIiA6IFwidGV4dC1wdXJwbGUtNTAwXCJ9YH0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJleHRyYUNvdW50XCI+e2V4dHJhQ291bnR9IPCfk4U8L3NwYW4+fVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPik7XG5cbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogQ2FsZW5kYXIgZ3JpZCAtIDI0aCB3aXRoIHNjcm9sbCAqL31cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQ2FsZW5kYXI6MTY1OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiByZWY9e3Njcm9sbFJlZn0gY2xhc3NOYW1lPVwiZmxleC0xIG92ZXJmbG93LWF1dG8gcC00XCI+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQ2FsZW5kYXI6MTY2OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1ib3JkZXIgc2hhZG93LXNtIG92ZXJmbG93LWhpZGRlbiBtaW4tdy1bNDAwcHhdXCI+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNDYWxlbmRhcjoxNjc6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJncmlkXCIgc3R5bGU9e3sgZ3JpZFRlbXBsYXRlQ29sdW1uczogXCI0OHB4IDFmclwiIH19PlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNDYWxlbmRhcjoxNjg6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJwdC0yXCI+XG4gICAgICAgICAgICAgICAge0hPVVJTLm1hcCgoaCkgPT5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNDYWxlbmRhcjoxNzA6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBrZXk9e2h9IGNsYXNzTmFtZT1cImgtMTIgZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWVuZCBwci0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNDYWxlbmRhcjoxNzE6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LW11dGVkLWZvcmVncm91bmQvNTBcIj57U3RyaW5nKGgpLnBhZFN0YXJ0KDIsIFwiMFwiKX06MDA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQ2FsZW5kYXI6MTc1OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtN1wiPlxuICAgICAgICAgICAgICAgIHt3ZWVrRGF5cy5tYXAoKGRheSkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gZm9ybWF0KGRheSwgXCJ5eXl5LU1NLWRkXCIpO1xuICAgICAgICAgICAgICAgICAgY29uc3QgZGF5U2Vzc2lvbnMgPSBzZXNzaW9uc0J5RGF5W2tleV0gfHwgW107XG4gICAgICAgICAgICAgICAgICBjb25zdCBkYXlEZWFkbGluZXMgPSBkZWFkbGluZXNCeURheVtrZXldIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgY29uc3QgZGF5RXZlbnRzID0gZXZlbnRzQnlEYXlba2V5XSB8fCBbXTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0NhbGVuZGFyOjE4MjoyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17a2V5fSBjbGFzc05hbWU9XCJyZWxhdGl2ZSBib3JkZXItbCBib3JkZXItYm9yZGVyLzMwXCI+XG4gICAgICAgICAgICAgICAgICAgICAge0hPVVJTLm1hcCgoaCkgPT4gPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQ2FsZW5kYXI6MTgzOjM5XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtofSBjbGFzc05hbWU9XCJoLTEyIGJvcmRlci1iIGJvcmRlci1ib3JkZXIvMjAgYm9yZGVyLWRhc2hlZFwiIC8+KX1cbiAgICAgICAgICAgICAgICAgICAgICB7ZGF5U2Vzc2lvbnMubWFwKChzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUocy5jcmVhdGVkX2RhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaG91ciA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1pbnMgPSBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvcFBjdCA9IChob3VyICsgbWlucyAvIDYwKSAvIDI0ICogMTAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sb3JzID0gVEFHX0NPTE9SU1tzLnRhZ19jb2xvcl0gfHwgVEFHX0NPTE9SUy5ibHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQ2FsZW5kYXI6MTkxOjI2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtzLmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBsZWZ0LTEgcmlnaHQtMSByb3VuZGVkLWxnIHB4LTEuNSBweS0xIHRleHQtWzlweF0gZm9udC1zZW1pYm9sZCB0cnVuY2F0ZSBzaGFkb3ctc21cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyB0b3A6IGAke3RvcFBjdH0lYCwgYmFja2dyb3VuZENvbG9yOiBjb2xvcnMuYmcsIGNvbG9yOiBjb2xvcnMudGV4dCwgbWluSGVpZ2h0OiBcIjIycHhcIiwgYm9yZGVyTGVmdDogYDNweCBzb2xpZCAke2NvbG9ycy50ZXh0fWAgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e3M/LmlkfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQ2FsZW5kYXI6MTk0OjI4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1bMTBweF1cIj57cy50YWdfbmFtZSB8fCBcIkZvY29cIn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0NhbGVuZGFyOjE5NToyOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cIm1sLTEgb3BhY2l0eS03MFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiZHVyYXRpb25fbWludXRlc1wiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtzPy5pZH0+e3MuZHVyYXRpb25fbWludXRlc31tPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAge2RheURlYWRsaW5lcy5tYXAoKGRsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoZGwuZGVhZGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaG91ciA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1pbnMgPSBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvcFBjdCA9IChob3VyICsgbWlucyAvIDYwKSAvIDI0ICogMTAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGV4ID0gZGwuY29sb3IgJiYgZGwuY29sb3Iuc3RhcnRzV2l0aChcIiNcIikgPyBkbC5jb2xvciA6IFwiI0U4N0E1QVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQ2FsZW5kYXI6MjA2OjI2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtkbC5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgbGVmdC0xIHJpZ2h0LTEgcm91bmRlZC1sZyBweC0xLjUgcHktMSB0ZXh0LVs5cHhdIGZvbnQtc2VtaWJvbGQgdHJ1bmNhdGUgc2hhZG93LXNtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgdG9wOiBgJHt0b3BQY3R9JWAsIGJhY2tncm91bmRDb2xvcjogaGV4ICsgXCIyMlwiLCBjb2xvcjogaGV4LCBtaW5IZWlnaHQ6IFwiMjBweFwiLCBib3JkZXJMZWZ0OiBgM3B4IHNvbGlkICR7aGV4fWAgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2RsPy5pZH0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJuYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg4o+wIHtkbC5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAge2RheUV2ZW50cy5tYXAoKGV2KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydERhdGUgPSBuZXcgRGF0ZShldi5zdGFydF9kYXRldGltZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBob3VyID0gc3RhcnREYXRlLmdldEhvdXJzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtaW5zID0gc3RhcnREYXRlLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvcFBjdCA9IChob3VyICsgbWlucyAvIDYwKSAvIDI0ICogMTAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGV4ID0gZXYuY29sb3IgJiYgZXYuY29sb3Iuc3RhcnRzV2l0aChcIiNcIikgPyBldi5jb2xvciA6IFwiIzhCNUNGNlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaGVpZ2h0IGJhc2VkIG9uIGR1cmF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVpZ2h0UGN0ID0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldi5lbmRfZGF0ZXRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZW5kRGF0ZSA9IG5ldyBEYXRlKGV2LmVuZF9kYXRldGltZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGR1ck1pbnMgPSAoZW5kRGF0ZSAtIHN0YXJ0RGF0ZSkgLyA2MDAwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0UGN0ID0gTWF0aC5tYXgoNCwgZHVyTWlucyAvICgyNCAqIDYwKSAqIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNDYWxlbmRhcjoyMjc6MjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBrZXk9e2V2LmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBsZWZ0LTEgcmlnaHQtMSByb3VuZGVkLWxnIHB4LTEuNSBweS0xIHRleHQtWzlweF0gZm9udC1zZW1pYm9sZCB0cnVuY2F0ZSBzaGFkb3ctc21cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyB0b3A6IGAke3RvcFBjdH0lYCwgaGVpZ2h0OiBgJHtNYXRoLm1pbihoZWlnaHRQY3QsIDMwKX0lYCwgYmFja2dyb3VuZENvbG9yOiBoZXggKyBcIjIyXCIsIGNvbG9yOiBoZXgsIGJvcmRlckxlZnQ6IGAzcHggc29saWQgJHtoZXh9YCwgb3ZlcmZsb3c6IFwiaGlkZGVuXCIgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2V2Py5pZH0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJuYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg8J+ThSB7ZXYubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+KTtcblxuICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4pO1xuXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBTZWxlY3RlZCBkYXkgZHJhd2VyICovfVxuICAgICAgICB7c2VsZWN0ZWREYXkgJiZcbiAgICAgICAgPG1vdGlvbi5kaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0NhbGVuZGFyOjI0NDoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGluaXRpYWw9e3sgeTogXCIxMDAlXCIgfX0gYW5pbWF0ZT17eyB5OiAwIH19IGV4aXQ9e3sgeTogXCIxMDAlXCIgfX1cbiAgICAgICAgY2xhc3NOYW1lPVwiYmctd2hpdGUgYm9yZGVyLXQgYm9yZGVyLWJvcmRlciByb3VuZGVkLXQtMnhsIHAtNSBtYXgtaC1bMjIwcHhdIG92ZXJmbG93LXktYXV0byBzaGFkb3cteGxcIj5cbiAgICAgICAgICAgIDxoMyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQ2FsZW5kYXI6MjQ2OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXNtIG1iLTNcIj57Zm9ybWF0KHBhcnNlSVNPKHNlbGVjdGVkRGF5KSwgXCJFRUVFLCBkICdkZScgTU1NTVwiLCB7IGxvY2FsZTogcHQgfSl9PC9oMz5cbiAgICAgICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGF5U2VzcyA9IHNlc3Npb25zQnlEYXlbc2VsZWN0ZWREYXldIHx8IFtdO1xuICAgICAgICAgICAgY29uc3QgZGF5RGwgPSBkZWFkbGluZXNCeURheVtzZWxlY3RlZERheV0gfHwgW107XG4gICAgICAgICAgICBjb25zdCBkYXlFdiA9IGV2ZW50c0J5RGF5W3NlbGVjdGVkRGF5XSB8fCBbXTtcbiAgICAgICAgICAgIGNvbnN0IHRvdGFsID0gZGF5U2Vzcy5sZW5ndGggKyBkYXlEbC5sZW5ndGggKyBkYXlFdi5sZW5ndGg7XG4gICAgICAgICAgICBpZiAodG90YWwgPT09IDApIHJldHVybiA8cCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQ2FsZW5kYXI6MjUyOjM4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCI+U2VtIGVudHJhZGFzIG5lc3RlIGRpYTwvcD47XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNDYWxlbmRhcjoyNTQ6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICAgIHtkYXlTZXNzLm1hcCgocykgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgY29sb3JzID0gVEFHX0NPTE9SU1tzLnRhZ19jb2xvcl0gfHwgVEFHX0NPTE9SUy5ibHVlO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQ2FsZW5kYXI6MjU4OjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtzLmlkfSBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyB0ZXh0LXNtIGJnLXNlY29uZGFyeS81MCByb3VuZGVkLXhsIHB4LTMgcHktMlwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtzPy5pZH0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQ2FsZW5kYXI6MjU5OjI0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCI+e2Zvcm1hdChuZXcgRGF0ZShzLmNyZWF0ZWRfZGF0ZSksIFwiSEg6bW1cIil9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0NhbGVuZGFyOjI2MDoyNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIHJvdW5kZWQtbGcgdGV4dC14cyBmb250LXNlbWlib2xkXCIgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiBjb2xvcnMuYmcsIGNvbG9yOiBjb2xvcnMudGV4dCB9fT7wn42KIHtzLnRhZ19uYW1lIHx8IFwiRm9jb1wifTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNDYWxlbmRhcjoyNjE6MjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBtbC1hdXRvXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJkdXJhdGlvbl9taW51dGVzXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e3M/LmlkfT57cy5kdXJhdGlvbl9taW51dGVzfSBtaW48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+KTtcblxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAge2RheURsLm1hcCgoZGwpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGhleCA9IGRsLmNvbG9yICYmIGRsLmNvbG9yLnN0YXJ0c1dpdGgoXCIjXCIpID8gZGwuY29sb3IgOiBcIiNFODdBNUFcIjtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0NhbGVuZGFyOjI2ODoyMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17ZGwuaWR9IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHRleHQtc20gcm91bmRlZC14bCBweC0zIHB5LTJcIiBzdHlsZT17eyBiYWNrZ3JvdW5kQ29sb3I6IGhleCArIFwiMTVcIiB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17ZGw/LmlkfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNDYWxlbmRhcjoyNjk6MjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj57Zm9ybWF0KG5ldyBEYXRlKGRsLmRlYWRsaW5lKSwgXCJISDptbVwiKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQ2FsZW5kYXI6MjcwOjI0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZVwiIHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogaGV4IH19PuKPsCBQcmF6bzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNDYWxlbmRhcjoyNzE6MjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbWVkaXVtIHRydW5jYXRlXCIgc3R5bGU9e3sgY29sb3I6IGhleCB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cIm5hbWVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17ZGw/LmlkfT57ZGwubmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+KTtcblxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAge2RheUV2Lm1hcCgoZXYpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGhleCA9IGV2LmNvbG9yICYmIGV2LmNvbG9yLnN0YXJ0c1dpdGgoXCIjXCIpID8gZXYuY29sb3IgOiBcIiM4QjVDRjZcIjtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0NhbGVuZGFyOjI3ODoyMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17ZXYuaWR9IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHRleHQtc20gcm91bmRlZC14bCBweC0zIHB5LTJcIiBzdHlsZT17eyBiYWNrZ3JvdW5kQ29sb3I6IGhleCArIFwiMTVcIiB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17ZXY/LmlkfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNDYWxlbmRhcjoyNzk6MjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj57Zm9ybWF0KG5ldyBEYXRlKGV2LnN0YXJ0X2RhdGV0aW1lKSwgXCJISDptbVwiKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzQ2FsZW5kYXI6MjgwOjI0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZVwiIHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogaGV4IH19PvCfk4UgRXZlbnRvPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c0NhbGVuZGFyOjI4MToyNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tZWRpdW0gdHJ1bmNhdGVcIiBzdHlsZT17eyBjb2xvcjogaGV4IH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibmFtZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtldj8uaWR9Pntldi5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4pO1xuXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+KTtcblxuICAgICAgICAgIH0pKCl9XG4gICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj4pO1xuXG59Il0sImZpbGUiOiIvYXBwL3NyYy9wYWdlcy9Gb2N1c0NhbGVuZGFyLmpzeCJ9