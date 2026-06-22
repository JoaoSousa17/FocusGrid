import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/Habits.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/pages/Habits.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=fc940917"; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"]; const useRef = __vite__cjsImport3_react["useRef"]; const useCallback = __vite__cjsImport3_react["useCallback"]; const useMemo = __vite__cjsImport3_react["useMemo"];
import { useNavigate } from "/node_modules/.vite/deps/react-router-dom.js?v=8a08d97a";
import { motion, AnimatePresence } from "/node_modules/.vite/deps/framer-motion.js?v=fc940917";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Sparkles, Trophy } from "/node_modules/.vite/deps/lucide-react.js?v=aefa7968";
import TetrisGrid from "/src/components/habits/TetrisGrid.jsx";
import { base44 } from "/src/api/base44Client.js";
import { format, startOfWeek, isToday as isTodayFn } from "/node_modules/.vite/deps/date-fns.js?v=a1580542";
import { pt } from "/node_modules/.vite/deps/date-fns_locale.js?v=45b313c9";
const PRESET_COLORS = [
  { key: "blue", hex: "#3B82F6" },
  { key: "purple", hex: "#8B5CF6" },
  { key: "green", hex: "#10B981" },
  { key: "amber", hex: "#F59E0B" },
  { key: "rose", hex: "#F43F5E" },
  { key: "teal", hex: "#14B8A6" },
  { key: "indigo", hex: "#6366F1" },
  { key: "pink", hex: "#EC4899" }
];
export default function Habits() {
  _s();
  const navigate = useNavigate();
  const [habits, setHabits] = useState([]);
  const [entries, setEntries] = useState([]);
  const touchStart = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const [dragStyle, setDragStyle] = useState({});
  const [animating, setAnimating] = useState(null);
  const todayStr = format(/* @__PURE__ */ new Date(), "yyyy-MM-dd");
  const refreshData = useCallback(() => {
    base44.entities.Habit.list("order", 100).then(setHabits).catch(() => setHabits([]));
    base44.entities.HabitEntry.list("-created_date", 500).then(setEntries).catch(() => setEntries([]));
  }, []);
  useEffect(() => {
    refreshData();
  }, [refreshData]);
  const todayEntries = useMemo(() => entries.filter((e) => e.date === todayStr), [entries, todayStr]);
  const completedIds = useMemo(() => new Set(todayEntries.map((e) => e.habit_id)), [todayEntries]);
  const todayScore = useMemo(() => todayEntries.reduce((sum, e) => sum + (e.score || 0), 0), [todayEntries]);
  const activeHabits = useMemo(() => habits.filter((h) => h.active !== false), [habits]);
  const pendingHabits = useMemo(() => activeHabits.filter((h) => !completedIds.has(h.id)), [activeHabits, completedIds]);
  const doneHabits = useMemo(() => activeHabits.filter((h) => completedIds.has(h.id)), [activeHabits, completedIds]);
  const completeHabit = async (habit) => {
    setAnimating(habit.id);
    const colorHex = PRESET_COLORS.find((c) => c.key === habit.color)?.hex || habit.color;
    await base44.entities.HabitEntry.create({
      habit_id: habit.id,
      habit_name: habit.name,
      habit_color: colorHex,
      score: habit.score,
      date: todayStr
    });
    refreshData();
    setTimeout(() => setAnimating(null), 300);
  };
  const undoHabit = async (habit) => {
    const entry = todayEntries.find((e) => e.habit_id === habit.id);
    if (entry) {
      await base44.entities.HabitEntry.delete(entry.id).catch(() => {
      });
      refreshData();
    }
  };
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
    const dx = x - touchStart.current.x;
    const dy = y - touchStart.current.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    if (absDx < 40 && absDy < 40) return;
    if (absDx > absDy) {
      if (dx < -60) navigate("/habits/analytics");
      else if (dx > 60) navigate("/");
    } else {
      if (dy > 60) navigate("/habits/manage");
      else if (dy < -60) navigate("/habits/rewards");
    }
  }, [navigate]);
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      "data-source-location": "pages/Habits:89:4",
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
      children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Habits:98:6", "data-dynamic-content": "true", style: dragStyle, className: "flex-1 flex flex-col", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Habits:100:8", "data-dynamic-content": "true", className: "bg-white border-b border-border px-4 py-4", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Habits:101:10", "data-dynamic-content": "true", className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Habits:102:12", "data-dynamic-content": "true", className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/Habits:103:14", "data-dynamic-content": "true", onClick: () => navigate("/"), className: "w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all", children: /* @__PURE__ */ jsxDEV(ArrowLeft, { "data-source-location": "pages/Habits:104:16", "data-dynamic-content": "false", className: "w-5 h-5" }, void 0, false, {
                fileName: "/app/src/pages/Habits.jsx",
                lineNumber: 123,
                columnNumber: 17
              }, this) }, void 0, false, {
                fileName: "/app/src/pages/Habits.jsx",
                lineNumber: 122,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("h1", { "data-source-location": "pages/Habits:106:14", "data-dynamic-content": "false", className: "text-xl font-bold text-foreground", children: "Hábitos" }, void 0, false, {
                fileName: "/app/src/pages/Habits.jsx",
                lineNumber: 125,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/Habits.jsx",
              lineNumber: 121,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV(
              motion.div,
              {
                "data-source-location": "pages/Habits:108:12",
                "data-dynamic-content": "true",
                initial: { scale: 1.2 },
                animate: { scale: 1 },
                className: "bg-amber-50 border border-amber-200 rounded-2xl px-4 py-2 flex items-center gap-2 shadow-sm",
                children: [
                  /* @__PURE__ */ jsxDEV(Trophy, { "data-source-location": "pages/Habits:114:14", "data-dynamic-content": "false", className: "w-5 h-5 text-amber-500" }, void 0, false, {
                    fileName: "/app/src/pages/Habits.jsx",
                    lineNumber: 133,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Habits:115:14", "data-dynamic-content": "true", children: [
                    /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/Habits:116:16", "data-dynamic-content": "false", className: "text-[10px] text-amber-600 font-medium", children: "Hoje" }, void 0, false, {
                      fileName: "/app/src/pages/Habits.jsx",
                      lineNumber: 135,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/Habits:117:16", "data-dynamic-content": "true", className: "text-lg font-bold text-amber-700", "data-collection-item-field": "todayScore", children: [
                      todayScore,
                      " pts"
                    ] }, void 0, true, {
                      fileName: "/app/src/pages/Habits.jsx",
                      lineNumber: 136,
                      columnNumber: 17
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/Habits.jsx",
                    lineNumber: 134,
                    columnNumber: 15
                  }, this)
                ]
              },
              todayScore,
              true,
              {
                fileName: "/app/src/pages/Habits.jsx",
                lineNumber: 127,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/src/pages/Habits.jsx",
            lineNumber: 120,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Habits:123:10", "data-dynamic-content": "false", className: "flex justify-between items-center px-2", children: [
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/Habits:124:12", "data-dynamic-content": "false", className: "text-[10px] text-muted-foreground/50 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxDEV(ArrowUp, { "data-source-location": "pages/Habits:125:14", "data-dynamic-content": "false", className: "w-3 h-3" }, void 0, false, {
                fileName: "/app/src/pages/Habits.jsx",
                lineNumber: 144,
                columnNumber: 15
              }, this),
              " Conquistas"
            ] }, void 0, true, {
              fileName: "/app/src/pages/Habits.jsx",
              lineNumber: 143,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/Habits:127:12", "data-dynamic-content": "false", className: "text-[10px] text-muted-foreground/50 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxDEV(ArrowDown, { "data-source-location": "pages/Habits:128:14", "data-dynamic-content": "false", className: "w-3 h-3" }, void 0, false, {
                fileName: "/app/src/pages/Habits.jsx",
                lineNumber: 147,
                columnNumber: 15
              }, this),
              " Gerir"
            ] }, void 0, true, {
              fileName: "/app/src/pages/Habits.jsx",
              lineNumber: 146,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/Habits:130:12", "data-dynamic-content": "false", className: "text-[10px] text-muted-foreground/50 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxDEV(ArrowLeft, { "data-source-location": "pages/Habits:131:14", "data-dynamic-content": "false", className: "w-3 h-3" }, void 0, false, {
                fileName: "/app/src/pages/Habits.jsx",
                lineNumber: 150,
                columnNumber: 15
              }, this),
              " Analytics"
            ] }, void 0, true, {
              fileName: "/app/src/pages/Habits.jsx",
              lineNumber: 149,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/Habits:133:12", "data-dynamic-content": "false", className: "text-[10px] text-muted-foreground/50 flex items-center gap-1", children: [
              "Home ",
              /* @__PURE__ */ jsxDEV(ArrowRight, { "data-source-location": "pages/Habits:134:19", "data-dynamic-content": "false", className: "w-3 h-3" }, void 0, false, {
                fileName: "/app/src/pages/Habits.jsx",
                lineNumber: 153,
                columnNumber: 20
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/Habits.jsx",
              lineNumber: 152,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/Habits.jsx",
            lineNumber: 142,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/Habits.jsx",
          lineNumber: 119,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Habits:140:8", "data-dynamic-content": "true", className: "flex-1 overflow-auto p-4", children: [
          pendingHabits.length === 0 && doneHabits.length === 0 && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Habits:142:12", "data-dynamic-content": "false", className: "text-center py-16 text-muted-foreground text-sm", children: [
            /* @__PURE__ */ jsxDEV(Sparkles, { "data-source-location": "pages/Habits:143:14", "data-dynamic-content": "false", className: "w-8 h-8 mx-auto mb-2 opacity-30" }, void 0, false, {
              fileName: "/app/src/pages/Habits.jsx",
              lineNumber: 162,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/Habits:144:14", "data-dynamic-content": "false", children: "Sem hábitos ainda" }, void 0, false, {
              fileName: "/app/src/pages/Habits.jsx",
              lineNumber: 163,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/Habits:145:14", "data-dynamic-content": "false", className: "text-[10px] mt-1", children: "Swipe baixo para gerir" }, void 0, false, {
              fileName: "/app/src/pages/Habits.jsx",
              lineNumber: 164,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/Habits.jsx",
            lineNumber: 161,
            columnNumber: 11
          }, this),
          pendingHabits.length === 0 && doneHabits.length > 0 && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Habits:150:12", "data-dynamic-content": "false", className: "text-center py-6 text-muted-foreground text-sm mb-4", children: [
            /* @__PURE__ */ jsxDEV(Sparkles, { "data-source-location": "pages/Habits:151:14", "data-dynamic-content": "false", className: "w-8 h-8 mx-auto mb-2 text-[#E87A5A] opacity-60" }, void 0, false, {
              fileName: "/app/src/pages/Habits.jsx",
              lineNumber: 170,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/Habits:152:14", "data-dynamic-content": "false", className: "font-semibold text-foreground", children: "Tudo feito hoje! 🎉" }, void 0, false, {
              fileName: "/app/src/pages/Habits.jsx",
              lineNumber: 171,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/Habits.jsx",
            lineNumber: 169,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV(
            TetrisGrid,
            {
              "data-source-location": "pages/Habits:157:10",
              "data-dynamic-content": "true",
              pending: pendingHabits,
              done: doneHabits,
              onComplete: completeHabit,
              onUndo: undoHabit,
              animating
            },
            void 0,
            false,
            {
              fileName: "/app/src/pages/Habits.jsx",
              lineNumber: 176,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/src/pages/Habits.jsx",
          lineNumber: 159,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/pages/Habits.jsx",
        lineNumber: 117,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/app/src/pages/Habits.jsx",
      lineNumber: 108,
      columnNumber: 5
    },
    this
  );
}
_s(Habits, "9zrXJ7FJ+XVj2EEtuiBmu8xmrBk=", false, function() {
  return [useNavigate];
});
_c = Habits;
var _c;
$RefreshReg$(_c, "Habits");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/pages/Habits.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/pages/Habits.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QTtBQUFBLGFBbUVBO0FBQUE7QUFBQSxJQTVFRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUE2RUE7QUFFSjtBQUFDckQsR0FySnVCRCxRQUFNO0FBQUEsVUFDWG5CLFdBQVc7QUFBQTtBQUFBLEtBRE5tQjtBQUFNLElBQUE0RTtBQUFBLGFBQUFBLElBQUEiLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVJlZiIsInVzZUNhbGxiYWNrIiwidXNlTWVtbyIsInVzZU5hdmlnYXRlIiwibW90aW9uIiwiQW5pbWF0ZVByZXNlbmNlIiwiQXJyb3dMZWZ0IiwiQXJyb3dSaWdodCIsIkFycm93VXAiLCJBcnJvd0Rvd24iLCJTcGFya2xlcyIsIlRyb3BoeSIsIlRldHJpc0dyaWQiLCJiYXNlNDQiLCJmb3JtYXQiLCJzdGFydE9mV2VlayIsImlzVG9kYXkiLCJpc1RvZGF5Rm4iLCJwdCIsIlBSRVNFVF9DT0xPUlMiLCJrZXkiLCJoZXgiLCJIYWJpdHMiLCJfcyIsIm5hdmlnYXRlIiwiaGFiaXRzIiwic2V0SGFiaXRzIiwiZW50cmllcyIsInNldEVudHJpZXMiLCJ0b3VjaFN0YXJ0IiwieCIsInkiLCJkcmFnT2Zmc2V0IiwiZHJhZ1N0eWxlIiwic2V0RHJhZ1N0eWxlIiwiYW5pbWF0aW5nIiwic2V0QW5pbWF0aW5nIiwidG9kYXlTdHIiLCJEYXRlIiwicmVmcmVzaERhdGEiLCJlbnRpdGllcyIsIkhhYml0IiwibGlzdCIsInRoZW4iLCJjYXRjaCIsIkhhYml0RW50cnkiLCJ0b2RheUVudHJpZXMiLCJmaWx0ZXIiLCJlIiwiZGF0ZSIsImNvbXBsZXRlZElkcyIsIlNldCIsIm1hcCIsImhhYml0X2lkIiwidG9kYXlTY29yZSIsInJlZHVjZSIsInN1bSIsInNjb3JlIiwiYWN0aXZlSGFiaXRzIiwiaCIsImFjdGl2ZSIsInBlbmRpbmdIYWJpdHMiLCJoYXMiLCJpZCIsImRvbmVIYWJpdHMiLCJjb21wbGV0ZUhhYml0IiwiaGFiaXQiLCJjb2xvckhleCIsImZpbmQiLCJjIiwiY29sb3IiLCJjcmVhdGUiLCJoYWJpdF9uYW1lIiwibmFtZSIsImhhYml0X2NvbG9yIiwic2V0VGltZW91dCIsInVuZG9IYWJpdCIsImVudHJ5IiwiZGVsZXRlIiwiaGFuZGxlUG9pbnRlclN0YXJ0IiwiY3VycmVudCIsImhhbmRsZVBvaW50ZXJNb3ZlIiwidHJhbnNmb3JtIiwidHJhbnNpdGlvbiIsImhhbmRsZVBvaW50ZXJFbmQiLCJkeCIsImR5IiwiYWJzRHgiLCJNYXRoIiwiYWJzIiwiYWJzRHkiLCJ0b3VjaGVzIiwiY2xpZW50WCIsImNsaWVudFkiLCJjaGFuZ2VkVG91Y2hlcyIsImJ1dHRvbnMiLCJzY2FsZSIsImxlbmd0aCIsIl9jIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIkhhYml0cy5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VDYWxsYmFjaywgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlTmF2aWdhdGUgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuaW1wb3J0IHsgbW90aW9uLCBBbmltYXRlUHJlc2VuY2UgfSBmcm9tIFwiZnJhbWVyLW1vdGlvblwiO1xuaW1wb3J0IHsgQXJyb3dMZWZ0LCBBcnJvd1JpZ2h0LCBBcnJvd1VwLCBBcnJvd0Rvd24sIFNwYXJrbGVzLCBUcm9waHkgfSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5pbXBvcnQgVGV0cmlzR3JpZCBmcm9tIFwiQC9jb21wb25lbnRzL2hhYml0cy9UZXRyaXNHcmlkXCI7XG5pbXBvcnQgeyBiYXNlNDQgfSBmcm9tIFwiQC9hcGkvYmFzZTQ0Q2xpZW50XCI7XG5pbXBvcnQgeyBmb3JtYXQsIHN0YXJ0T2ZXZWVrLCBpc1RvZGF5IGFzIGlzVG9kYXlGbiB9IGZyb20gXCJkYXRlLWZuc1wiO1xuaW1wb3J0IHsgcHQgfSBmcm9tIFwiZGF0ZS1mbnMvbG9jYWxlXCI7XG5cbmNvbnN0IFBSRVNFVF9DT0xPUlMgPSBbXG57IGtleTogXCJibHVlXCIsIGhleDogXCIjM0I4MkY2XCIgfSwgeyBrZXk6IFwicHVycGxlXCIsIGhleDogXCIjOEI1Q0Y2XCIgfSxcbnsga2V5OiBcImdyZWVuXCIsIGhleDogXCIjMTBCOTgxXCIgfSwgeyBrZXk6IFwiYW1iZXJcIiwgaGV4OiBcIiNGNTlFMEJcIiB9LFxueyBrZXk6IFwicm9zZVwiLCBoZXg6IFwiI0Y0M0Y1RVwiIH0sIHsga2V5OiBcInRlYWxcIiwgaGV4OiBcIiMxNEI4QTZcIiB9LFxueyBrZXk6IFwiaW5kaWdvXCIsIGhleDogXCIjNjM2NkYxXCIgfSwgeyBrZXk6IFwicGlua1wiLCBoZXg6IFwiI0VDNDg5OVwiIH1dO1xuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIYWJpdHMoKSB7XG4gIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcbiAgY29uc3QgW2hhYml0cywgc2V0SGFiaXRzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW2VudHJpZXMsIHNldEVudHJpZXNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCB0b3VjaFN0YXJ0ID0gdXNlUmVmKHsgeDogMCwgeTogMCB9KTtcbiAgY29uc3QgZHJhZ09mZnNldCA9IHVzZVJlZih7IHg6IDAsIHk6IDAgfSk7XG4gIGNvbnN0IFtkcmFnU3R5bGUsIHNldERyYWdTdHlsZV0gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFthbmltYXRpbmcsIHNldEFuaW1hdGluZ10gPSB1c2VTdGF0ZShudWxsKTtcblxuICBjb25zdCB0b2RheVN0ciA9IGZvcm1hdChuZXcgRGF0ZSgpLCBcInl5eXktTU0tZGRcIik7XG5cbiAgY29uc3QgcmVmcmVzaERhdGEgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgYmFzZTQ0LmVudGl0aWVzLkhhYml0Lmxpc3QoXCJvcmRlclwiLCAxMDApLnRoZW4oc2V0SGFiaXRzKS5jYXRjaCgoKSA9PiBzZXRIYWJpdHMoW10pKTtcbiAgICBiYXNlNDQuZW50aXRpZXMuSGFiaXRFbnRyeS5saXN0KFwiLWNyZWF0ZWRfZGF0ZVwiLCA1MDApLnRoZW4oc2V0RW50cmllcykuY2F0Y2goKCkgPT4gc2V0RW50cmllcyhbXSkpO1xuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtyZWZyZXNoRGF0YSgpO30sIFtyZWZyZXNoRGF0YV0pO1xuXG4gIGNvbnN0IHRvZGF5RW50cmllcyA9IHVzZU1lbW8oKCkgPT4gZW50cmllcy5maWx0ZXIoKGUpID0+IGUuZGF0ZSA9PT0gdG9kYXlTdHIpLCBbZW50cmllcywgdG9kYXlTdHJdKTtcbiAgY29uc3QgY29tcGxldGVkSWRzID0gdXNlTWVtbygoKSA9PiBuZXcgU2V0KHRvZGF5RW50cmllcy5tYXAoKGUpID0+IGUuaGFiaXRfaWQpKSwgW3RvZGF5RW50cmllc10pO1xuICBjb25zdCB0b2RheVNjb3JlID0gdXNlTWVtbygoKSA9PiB0b2RheUVudHJpZXMucmVkdWNlKChzdW0sIGUpID0+IHN1bSArIChlLnNjb3JlIHx8IDApLCAwKSwgW3RvZGF5RW50cmllc10pO1xuXG4gIGNvbnN0IGFjdGl2ZUhhYml0cyA9IHVzZU1lbW8oKCkgPT4gaGFiaXRzLmZpbHRlcigoaCkgPT4gaC5hY3RpdmUgIT09IGZhbHNlKSwgW2hhYml0c10pO1xuXG4gIGNvbnN0IHBlbmRpbmdIYWJpdHMgPSB1c2VNZW1vKCgpID0+IGFjdGl2ZUhhYml0cy5maWx0ZXIoKGgpID0+ICFjb21wbGV0ZWRJZHMuaGFzKGguaWQpKSwgW2FjdGl2ZUhhYml0cywgY29tcGxldGVkSWRzXSk7XG4gIGNvbnN0IGRvbmVIYWJpdHMgPSB1c2VNZW1vKCgpID0+IGFjdGl2ZUhhYml0cy5maWx0ZXIoKGgpID0+IGNvbXBsZXRlZElkcy5oYXMoaC5pZCkpLCBbYWN0aXZlSGFiaXRzLCBjb21wbGV0ZWRJZHNdKTtcblxuICBjb25zdCBjb21wbGV0ZUhhYml0ID0gYXN5bmMgKGhhYml0KSA9PiB7XG4gICAgc2V0QW5pbWF0aW5nKGhhYml0LmlkKTtcbiAgICBjb25zdCBjb2xvckhleCA9IFBSRVNFVF9DT0xPUlMuZmluZCgoYykgPT4gYy5rZXkgPT09IGhhYml0LmNvbG9yKT8uaGV4IHx8IGhhYml0LmNvbG9yO1xuICAgIGF3YWl0IGJhc2U0NC5lbnRpdGllcy5IYWJpdEVudHJ5LmNyZWF0ZSh7XG4gICAgICBoYWJpdF9pZDogaGFiaXQuaWQsIGhhYml0X25hbWU6IGhhYml0Lm5hbWUsXG4gICAgICBoYWJpdF9jb2xvcjogY29sb3JIZXgsIHNjb3JlOiBoYWJpdC5zY29yZSxcbiAgICAgIGRhdGU6IHRvZGF5U3RyXG4gICAgfSk7XG4gICAgcmVmcmVzaERhdGEoKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNldEFuaW1hdGluZyhudWxsKSwgMzAwKTtcbiAgfTtcblxuICBjb25zdCB1bmRvSGFiaXQgPSBhc3luYyAoaGFiaXQpID0+IHtcbiAgICBjb25zdCBlbnRyeSA9IHRvZGF5RW50cmllcy5maW5kKChlKSA9PiBlLmhhYml0X2lkID09PSBoYWJpdC5pZCk7XG4gICAgaWYgKGVudHJ5KSB7XG4gICAgICBhd2FpdCBiYXNlNDQuZW50aXRpZXMuSGFiaXRFbnRyeS5kZWxldGUoZW50cnkuaWQpLmNhdGNoKCgpID0+IHt9KTtcbiAgICAgIHJlZnJlc2hEYXRhKCk7XG4gICAgfVxuICB9O1xuXG4gIC8vIFN3aXBlIG5hdmlnYXRpb25cbiAgY29uc3QgaGFuZGxlUG9pbnRlclN0YXJ0ID0gdXNlQ2FsbGJhY2soKHgsIHkpID0+IHt0b3VjaFN0YXJ0LmN1cnJlbnQgPSB7IHgsIHkgfTtkcmFnT2Zmc2V0LmN1cnJlbnQgPSB7IHg6IDAsIHk6IDAgfTtzZXREcmFnU3R5bGUoe30pO30sIFtdKTtcbiAgY29uc3QgaGFuZGxlUG9pbnRlck1vdmUgPSB1c2VDYWxsYmFjaygoeCwgeSkgPT4ge1xuICAgIGRyYWdPZmZzZXQuY3VycmVudCA9IHsgeDogeCAtIHRvdWNoU3RhcnQuY3VycmVudC54LCB5OiB5IC0gdG91Y2hTdGFydC5jdXJyZW50LnkgfTtcbiAgICBzZXREcmFnU3R5bGUoeyB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoJHtkcmFnT2Zmc2V0LmN1cnJlbnQueH1weCwgJHtkcmFnT2Zmc2V0LmN1cnJlbnQueX1weClgLCB0cmFuc2l0aW9uOiBcIm5vbmVcIiB9KTtcbiAgfSwgW10pO1xuICBjb25zdCBoYW5kbGVQb2ludGVyRW5kID0gdXNlQ2FsbGJhY2soKHgsIHkpID0+IHtcbiAgICBzZXREcmFnU3R5bGUoeyB0cmFuc2Zvcm06IFwidHJhbnNsYXRlKDAsIDApXCIsIHRyYW5zaXRpb246IFwidHJhbnNmb3JtIDAuM3MgZWFzZS1vdXRcIiB9KTtcbiAgICBjb25zdCBkeCA9IHggLSB0b3VjaFN0YXJ0LmN1cnJlbnQueDtcbiAgICBjb25zdCBkeSA9IHkgLSB0b3VjaFN0YXJ0LmN1cnJlbnQueTtcbiAgICBjb25zdCBhYnNEeCA9IE1hdGguYWJzKGR4KTtcbiAgICBjb25zdCBhYnNEeSA9IE1hdGguYWJzKGR5KTtcbiAgICBpZiAoYWJzRHggPCA0MCAmJiBhYnNEeSA8IDQwKSByZXR1cm47XG4gICAgaWYgKGFic0R4ID4gYWJzRHkpIHtcbiAgICAgIGlmIChkeCA8IC02MCkgbmF2aWdhdGUoXCIvaGFiaXRzL2FuYWx5dGljc1wiKTtlbHNlXG4gICAgICBpZiAoZHggPiA2MCkgbmF2aWdhdGUoXCIvXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZHkgPiA2MCkgbmF2aWdhdGUoXCIvaGFiaXRzL21hbmFnZVwiKTtlbHNlXG4gICAgICBpZiAoZHkgPCAtNjApIG5hdmlnYXRlKFwiL2hhYml0cy9yZXdhcmRzXCIpO1xuICAgIH1cbiAgfSwgW25hdmlnYXRlXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzOjg5OjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgIGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1jcmVhbSBmbGV4IGZsZXgtY29sIHNlbGVjdC1ub25lXCJcbiAgICBvblRvdWNoU3RhcnQ9eyhlKSA9PiBoYW5kbGVQb2ludGVyU3RhcnQoZS50b3VjaGVzWzBdLmNsaWVudFgsIGUudG91Y2hlc1swXS5jbGllbnRZKX1cbiAgICBvblRvdWNoTW92ZT17KGUpID0+IGhhbmRsZVBvaW50ZXJNb3ZlKGUudG91Y2hlc1swXS5jbGllbnRYLCBlLnRvdWNoZXNbMF0uY2xpZW50WSl9XG4gICAgb25Ub3VjaEVuZD17KGUpID0+IGhhbmRsZVBvaW50ZXJFbmQoZS5jaGFuZ2VkVG91Y2hlc1swXT8uY2xpZW50WCB8fCB0b3VjaFN0YXJ0LmN1cnJlbnQueCwgZS5jaGFuZ2VkVG91Y2hlc1swXT8uY2xpZW50WSB8fCB0b3VjaFN0YXJ0LmN1cnJlbnQueSl9XG4gICAgb25Nb3VzZURvd249eyhlKSA9PiBoYW5kbGVQb2ludGVyU3RhcnQoZS5jbGllbnRYLCBlLmNsaWVudFkpfVxuICAgIG9uTW91c2VNb3ZlPXsoZSkgPT4ge2lmIChlLmJ1dHRvbnMgPT09IDEpIGhhbmRsZVBvaW50ZXJNb3ZlKGUuY2xpZW50WCwgZS5jbGllbnRZKTt9fVxuICAgIG9uTW91c2VVcD17KGUpID0+IGhhbmRsZVBvaW50ZXJFbmQoZS5jbGllbnRYLCBlLmNsaWVudFkpfT5cbiAgICAgIFxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0czo5ODo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgc3R5bGU9e2RyYWdTdHlsZX0gY2xhc3NOYW1lPVwiZmxleC0xIGZsZXggZmxleC1jb2xcIj5cbiAgICAgICAgey8qIEhlYWRlciB3aXRoIHNjb3JlICovfVxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzOjEwMDo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiYmctd2hpdGUgYm9yZGVyLWIgYm9yZGVyLWJvcmRlciBweC00IHB5LTRcIj5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzOjEwMToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtYi0zXCI+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzOjEwMjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHM6MTAzOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoXCIvXCIpfSBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgcm91bmRlZC0yeGwgYmctd2hpdGUgYm9yZGVyIGJvcmRlci1ib3JkZXIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGhvdmVyOnRleHQtZm9yZWdyb3VuZCB0cmFuc2l0aW9uLWFsbFwiPlxuICAgICAgICAgICAgICAgIDxBcnJvd0xlZnQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHM6MTA0OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGgxIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzOjEwNjoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LWZvcmVncm91bmRcIj5Iw6FiaXRvczwvaDE+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxtb3Rpb24uZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzOjEwODoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICBrZXk9e3RvZGF5U2NvcmV9XG4gICAgICAgICAgICBpbml0aWFsPXt7IHNjYWxlOiAxLjIgfX1cbiAgICAgICAgICAgIGFuaW1hdGU9e3sgc2NhbGU6IDEgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLWFtYmVyLTUwIGJvcmRlciBib3JkZXItYW1iZXItMjAwIHJvdW5kZWQtMnhsIHB4LTQgcHktMiBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxUcm9waHkgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHM6MTE0OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1hbWJlci01MDBcIiAvPlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzOjExNToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzOjExNjoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWFtYmVyLTYwMCBmb250LW1lZGl1bVwiPkhvamU8L3A+XG4gICAgICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHM6MTE3OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJvbGQgdGV4dC1hbWJlci03MDBcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cInRvZGF5U2NvcmVcIj57dG9kYXlTY29yZX0gcHRzPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBOYXZpZ2F0aW9uIGFycm93cyAqL31cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzOjEyMzoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgcHgtMlwiPlxuICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHM6MTI0OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtbXV0ZWQtZm9yZWdyb3VuZC81MCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICA8QXJyb3dVcCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0czoxMjU6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+IENvbnF1aXN0YXNcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzOjEyNzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LW11dGVkLWZvcmVncm91bmQvNTAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgPEFycm93RG93biBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0czoxMjg6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+IEdlcmlyXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0czoxMzA6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kLzUwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgIDxBcnJvd0xlZnQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHM6MTMxOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPiBBbmFseXRpY3NcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzOjEzMzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LW11dGVkLWZvcmVncm91bmQvNTAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgSG9tZSA8QXJyb3dSaWdodCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0czoxMzQ6MTlcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBNYWluIGNvbnRlbnQgLSBUZXRyaXMgbGF5b3V0ICovfVxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzOjE0MDo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleC0xIG92ZXJmbG93LWF1dG8gcC00XCI+XG4gICAgICAgICAge3BlbmRpbmdIYWJpdHMubGVuZ3RoID09PSAwICYmIGRvbmVIYWJpdHMubGVuZ3RoID09PSAwICYmXG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0czoxNDI6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgcHktMTYgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIHRleHQtc21cIj5cbiAgICAgICAgICAgICAgPFNwYXJrbGVzIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzOjE0MzoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTggaC04IG14LWF1dG8gbWItMiBvcGFjaXR5LTMwXCIgLz5cbiAgICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHM6MTQ0OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiPlNlbSBow6FiaXRvcyBhaW5kYTwvcD5cbiAgICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHM6MTQ1OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIG10LTFcIj5Td2lwZSBiYWl4byBwYXJhIGdlcmlyPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgfVxuXG4gICAgICAgICAge3BlbmRpbmdIYWJpdHMubGVuZ3RoID09PSAwICYmIGRvbmVIYWJpdHMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHM6MTUwOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHB5LTYgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIHRleHQtc20gbWItNFwiPlxuICAgICAgICAgICAgICA8U3BhcmtsZXMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHM6MTUxOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctOCBoLTggbXgtYXV0byBtYi0yIHRleHQtWyNFODdBNUFdIG9wYWNpdHktNjBcIiAvPlxuICAgICAgICAgICAgICA8cCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0czoxNTI6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LWZvcmVncm91bmRcIj5UdWRvIGZlaXRvIGhvamUhIPCfjok8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB7LyogVGV0cmlzIGdyaWQgKi99XG4gICAgICAgICAgPFRldHJpc0dyaWQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHM6MTU3OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICBwZW5kaW5nPXtwZW5kaW5nSGFiaXRzfVxuICAgICAgICAgIGRvbmU9e2RvbmVIYWJpdHN9XG4gICAgICAgICAgb25Db21wbGV0ZT17Y29tcGxldGVIYWJpdH1cbiAgICAgICAgICBvblVuZG89e3VuZG9IYWJpdH1cbiAgICAgICAgICBhbmltYXRpbmc9e2FuaW1hdGluZ30gLz5cbiAgICAgICAgICBcbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj4pO1xuXG59Il0sImZpbGUiOiIvYXBwL3NyYy9wYWdlcy9IYWJpdHMuanN4In0=