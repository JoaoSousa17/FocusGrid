import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/FocusPomo.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/pages/FocusPomo.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=fc940917"; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"]; const useRef = __vite__cjsImport3_react["useRef"]; const useCallback = __vite__cjsImport3_react["useCallback"];
import { useNavigate } from "/node_modules/.vite/deps/react-router-dom.js?v=8a08d97a";
import { motion } from "/node_modules/.vite/deps/framer-motion.js?v=fc940917";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "/node_modules/.vite/deps/lucide-react.js?v=aefa7968";
import { base44 } from "/src/api/base44Client.js";
import { useFocusTimer } from "/src/context/FocusTimerContext.jsx";
import FocusTimer from "/src/components/FocusTimer.jsx";
import TagPicker from "/src/components/TagPicker.jsx";
import OrangeCanvas from "/src/components/OrangeCanvas.jsx";
const TAG_COLORS = {
  blue: "bg-blue-100 text-blue-700",
  purple: "bg-purple-100 text-purple-700",
  green: "bg-green-100 text-green-700",
  amber: "bg-amber-100 text-amber-700",
  rose: "bg-rose-100 text-rose-700",
  teal: "bg-teal-100 text-teal-700",
  indigo: "bg-indigo-100 text-indigo-700",
  pink: "bg-pink-100 text-pink-700"
};
export default function FocusPomo() {
  _s();
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const touchStart = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const [dragStyle, setDragStyle] = useState({});
  const {
    phase,
    cycleIndex,
    totalSeconds,
    remainingSeconds,
    isRunning,
    sessionCompleted,
    focusMin,
    shortBreakMin,
    longBreakMin,
    handlePlayPause,
    handleSkip,
    advancePhase,
    resetSessionCompleted
  } = useFocusTimer();
  const [selectedTag, setSelectedTag] = useState(null);
  const [showTagPicker, setShowTagPicker] = useState(false);
  const [completedOranges, setCompletedOranges] = useState(0);
  const [showOranges, setShowOranges] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  useEffect(() => {
    base44.auth.me().then((u) => {
      if (u?.notifications_enabled !== void 0) setNotificationsEnabled(u.notifications_enabled);
    }).catch(() => {
    });
    base44.entities.Tag.list().then((tags) => {
      if (tags.length > 0) setSelectedTag(tags[0]);
    }).catch(() => {
    });
  }, []);
  useEffect(() => {
    if (sessionCompleted) {
      setCompletedOranges((prev) => prev + 1);
      setShowOranges(true);
      base44.entities.FocusSession.create({
        tag_id: selectedTag?.id || null,
        tag_name: selectedTag?.name || "Estudo",
        tag_color: selectedTag?.color || "blue",
        duration_minutes: focusMin,
        type: "focus",
        completed: true
      }).catch(() => {
      });
      resetSessionCompleted();
      if (notificationsEnabled && "Notification" in window && Notification.permission === "granted") {
        new Notification("FocusFlow", {
          body: "Foco concluído! 🍊 Hora de pausar.",
          icon: "🍊"
        });
      }
      if (notificationsEnabled && "Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
      }
    }
  }, [sessionCompleted]);
  const buttonLabel = () => {
    if (remainingSeconds <= 0 && !isRunning) {
      return phase === "focus" ? "Começar Pausa" : "Começar Foco";
    }
    if (isRunning) return "Pausar";
    if (phase === "focus") return "Start Focus";
    return "Start Pause";
  };
  const skipLabel = () => {
    if (remainingSeconds <= 0) return "";
    if (phase === "focus") return "Skip Focus";
    return "Skip Pause";
  };
  const tagColorClass = selectedTag ? TAG_COLORS[selectedTag.color] || TAG_COLORS.blue : TAG_COLORS.blue;
  const handlePointerStart = useCallback((x, y) => {
    touchStart.current = { x, y };
    dragOffset.current = { x: 0, y: 0 };
    setDragStyle({});
  }, []);
  const handlePointerMove = useCallback((x, y) => {
    dragOffset.current = { x: x - touchStart.current.x, y: y - touchStart.current.y };
    setDragStyle({
      transform: `translate(${dragOffset.current.x}px, ${dragOffset.current.y}px)`,
      transition: "none"
    });
  }, []);
  const handlePointerEnd = useCallback((x, y) => {
    setDragStyle({ transform: "translate(0, 0)", transition: "transform 0.3s ease-out" });
    const dx = x - touchStart.current.x;
    const dy = y - touchStart.current.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    if (absDx < 40 && absDy < 40) return;
    if (absDx > absDy) {
      if (dx < -60) navigate("/focus/calendar");
      else if (dx > 60) navigate("/focus/settings");
    } else {
      if (dy < -60) navigate("/focus/analytics");
      else if (dy > 60) navigate("/");
    }
  }, [navigate]);
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      "data-source-location": "pages/FocusPomo:125:4",
      "data-dynamic-content": "true",
      className: "h-screen w-screen flex flex-col bg-cream overflow-hidden relative select-none",
      onTouchStart: (e) => handlePointerStart(e.touches[0].clientX, e.touches[0].clientY),
      onTouchMove: (e) => handlePointerMove(e.touches[0].clientX, e.touches[0].clientY),
      onTouchEnd: (e) => handlePointerEnd(e.changedTouches[0]?.clientX || touchStart.current.x, e.changedTouches[0]?.clientY || touchStart.current.y),
      onMouseDown: (e) => handlePointerStart(e.clientX, e.clientY),
      onMouseMove: (e) => {
        if (e.buttons === 1) handlePointerMove(e.clientX, e.clientY);
      },
      onMouseUp: (e) => handlePointerEnd(e.clientX, e.clientY),
      style: { background: "linear-gradient(180deg, #FFF5E6 0%, #F5F0E8 100%)" },
      children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusPomo:135:6", "data-dynamic-content": "true", style: dragStyle, className: "flex-1 flex flex-col items-center justify-center", children: [
          /* @__PURE__ */ jsxDEV(OrangeCanvas, { "data-source-location": "pages/FocusPomo:136:8", "data-dynamic-content": "true", oranges: showOranges ? completedOranges : 0, buttonRef }, void 0, false, {
            fileName: "/app/src/pages/FocusPomo.jsx",
            lineNumber: 155,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusPomo:139:8", "data-dynamic-content": "true", className: "absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/FocusPomo:140:10", "data-dynamic-content": "true", onClick: () => navigate("/"), className: "w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-[#E87A5A] shadow-sm hover:bg-[#E87A5A]/5 transition-all", children: /* @__PURE__ */ jsxDEV(ArrowUp, { "data-source-location": "pages/FocusPomo:141:12", "data-dynamic-content": "false", className: "w-3.5 h-3.5" }, void 0, false, {
              fileName: "/app/src/pages/FocusPomo.jsx",
              lineNumber: 160,
              columnNumber: 13
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/FocusPomo.jsx",
              lineNumber: 159,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusPomo:143:10", "data-dynamic-content": "false", className: "text-[10px] text-muted-foreground/50 hidden sm:block", children: "Home" }, void 0, false, {
              fileName: "/app/src/pages/FocusPomo.jsx",
              lineNumber: 162,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/FocusPomo.jsx",
            lineNumber: 158,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusPomo:146:8", "data-dynamic-content": "true", className: "absolute top-1/2 -translate-y-1/2 right-4 z-20 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusPomo:147:10", "data-dynamic-content": "false", className: "text-[10px] text-muted-foreground/50 whitespace-nowrap hidden sm:block", children: "Calendário" }, void 0, false, {
              fileName: "/app/src/pages/FocusPomo.jsx",
              lineNumber: 166,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/FocusPomo:148:10", "data-dynamic-content": "true", onClick: () => navigate("/focus/calendar"), className: "w-9 h-9 rounded-full bg-white border border-border flex items-center justify-center text-muted-foreground shadow-sm hover:text-foreground transition-all", children: /* @__PURE__ */ jsxDEV(ArrowRight, { "data-source-location": "pages/FocusPomo:149:12", "data-dynamic-content": "false", className: "w-3.5 h-3.5" }, void 0, false, {
              fileName: "/app/src/pages/FocusPomo.jsx",
              lineNumber: 168,
              columnNumber: 13
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/FocusPomo.jsx",
              lineNumber: 167,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/FocusPomo.jsx",
            lineNumber: 165,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusPomo:153:8", "data-dynamic-content": "true", className: "absolute top-1/2 -translate-y-1/2 left-4 z-20 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/FocusPomo:154:10", "data-dynamic-content": "true", onClick: () => navigate("/focus/settings"), className: "w-9 h-9 rounded-full bg-white border border-border flex items-center justify-center text-muted-foreground shadow-sm hover:text-foreground transition-all", children: /* @__PURE__ */ jsxDEV(ArrowLeft, { "data-source-location": "pages/FocusPomo:155:12", "data-dynamic-content": "false", className: "w-3.5 h-3.5" }, void 0, false, {
              fileName: "/app/src/pages/FocusPomo.jsx",
              lineNumber: 174,
              columnNumber: 13
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/FocusPomo.jsx",
              lineNumber: 173,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusPomo:157:10", "data-dynamic-content": "false", className: "text-[10px] text-muted-foreground/50 whitespace-nowrap hidden sm:block", children: "Settings" }, void 0, false, {
              fileName: "/app/src/pages/FocusPomo.jsx",
              lineNumber: 176,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/FocusPomo.jsx",
            lineNumber: 172,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusPomo:160:8", "data-dynamic-content": "true", className: "absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1", children: [
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusPomo:161:10", "data-dynamic-content": "false", className: "text-[10px] text-muted-foreground/50 hidden sm:block", children: "Analytics" }, void 0, false, {
              fileName: "/app/src/pages/FocusPomo.jsx",
              lineNumber: 180,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/FocusPomo:162:10", "data-dynamic-content": "true", onClick: () => navigate("/focus/analytics"), className: "w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-muted-foreground shadow-sm hover:text-foreground transition-all", children: /* @__PURE__ */ jsxDEV(ArrowDown, { "data-source-location": "pages/FocusPomo:163:12", "data-dynamic-content": "false", className: "w-3.5 h-3.5" }, void 0, false, {
              fileName: "/app/src/pages/FocusPomo.jsx",
              lineNumber: 182,
              columnNumber: 13
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/FocusPomo.jsx",
              lineNumber: 181,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/FocusPomo.jsx",
            lineNumber: 179,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusPomo:168:8", "data-dynamic-content": "true", className: "flex flex-col items-center gap-6 pt-10", children: [
            /* @__PURE__ */ jsxDEV(FocusTimer, { "data-source-location": "pages/FocusPomo:169:10", "data-dynamic-content": "true", totalSeconds, remainingSeconds, isRunning, mode: phase === "focus" ? "focus" : "pause" }, void 0, false, {
              fileName: "/app/src/pages/FocusPomo.jsx",
              lineNumber: 188,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "pages/FocusPomo:171:10",
                "data-dynamic-content": "true",
                onClick: () => setShowTagPicker(true),
                className: `px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all hover:scale-105 ${tagColorClass}`,
                children: [
                  /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusPomo:175:12", "data-dynamic-content": "true", className: "w-2 h-2 rounded-full", style: { backgroundColor: selectedTag?.color ? ["blue", "purple", "green", "amber", "rose", "teal", "indigo", "pink"].includes(selectedTag.color) ? void 0 : selectedTag.color : "#3B82F6" } }, void 0, false, {
                    fileName: "/app/src/pages/FocusPomo.jsx",
                    lineNumber: 194,
                    columnNumber: 13
                  }, this),
                  selectedTag?.name || "Estudo",
                  /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/FocusPomo:177:12", "data-dynamic-content": "false", className: "text-[10px] opacity-60 ml-0.5", children: "›" }, void 0, false, {
                    fileName: "/app/src/pages/FocusPomo.jsx",
                    lineNumber: 196,
                    columnNumber: 13
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/src/pages/FocusPomo.jsx",
                lineNumber: 190,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusPomo:180:10", "data-dynamic-content": "true", className: "flex flex-col items-center gap-2.5", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "pages/FocusPomo:181:12",
                  "data-dynamic-content": "true",
                  ref: buttonRef,
                  onClick: handlePlayPause,
                  className: "px-20 py-3.5 rounded-full bg-[#5C544E] text-white font-semibold text-sm shadow-lg shadow-black/10 hover:bg-[#4A4340] transition-all active:scale-95 min-w-[260px]",
                  children: buttonLabel()
                },
                void 0,
                false,
                {
                  fileName: "/app/src/pages/FocusPomo.jsx",
                  lineNumber: 200,
                  columnNumber: 13
                },
                this
              ),
              isRunning && /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/FocusPomo:189:14", "data-dynamic-content": "true", onClick: handleSkip, className: "px-8 py-2 rounded-full text-[#E87A5A] text-sm font-medium hover:bg-[#E87A5A]/5 transition-all", children: skipLabel() }, void 0, false, {
                fileName: "/app/src/pages/FocusPomo.jsx",
                lineNumber: 208,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/FocusPomo.jsx",
              lineNumber: 199,
              columnNumber: 11
            }, this),
            sessionCompleted && /* @__PURE__ */ jsxDEV(motion.p, { "data-source-location": "pages/FocusPomo:196:12", "data-dynamic-content": "true", initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: "text-xs text-[#E87A5A] font-medium", "data-collection-item-field": "completedOranges", children: [
              "+1 🍊 ",
              completedOranges,
              " laranja",
              completedOranges !== 1 ? "s" : "",
              " conquistada",
              completedOranges !== 1 ? "s" : ""
            ] }, void 0, true, {
              fileName: "/app/src/pages/FocusPomo.jsx",
              lineNumber: 215,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusPomo:201:10", "data-dynamic-content": "true", className: "flex gap-1.5", children: [0, 1, 2, 3].map(
              (i, __arrIdx__) => /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/FocusPomo:203:14", "data-dynamic-content": "true", className: `w-1.5 h-1.5 rounded-full transition-all ${phase === "focus" && i === cycleIndex ? "bg-[#E87A5A] scale-125" : i < cycleIndex ? "bg-[#E87A5A]/30" : "bg-border"}`, "data-arr-index": __arrIdx__ }, i, false, {
                fileName: "/app/src/pages/FocusPomo.jsx",
                lineNumber: 222,
                columnNumber: 13
              }, this)
            ) }, void 0, false, {
              fileName: "/app/src/pages/FocusPomo.jsx",
              lineNumber: 220,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/FocusPomo.jsx",
            lineNumber: 187,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/FocusPomo.jsx",
          lineNumber: 154,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV(TagPicker, { "data-source-location": "pages/FocusPomo:211:6", "data-dynamic-content": "true", open: showTagPicker, onClose: () => setShowTagPicker(false), selectedTag, onSelect: setSelectedTag }, void 0, false, {
          fileName: "/app/src/pages/FocusPomo.jsx",
          lineNumber: 230,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/src/pages/FocusPomo.jsx",
      lineNumber: 144,
      columnNumber: 5
    },
    this
  );
}
_s(FocusPomo, "Oa1w0XEpr0vpzij58m9bm8gCTlE=", false, function() {
  return [useNavigate, useFocusTimer];
});
_c = FocusPomo;
var _c;
$RefreshReg$(_c, "FocusPomo");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/pages/FocusPomo.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/pages/FocusPomo.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QkFBcUIsMEJBQXlCLHdCQUFxQixRQUFlLFdBQVcsMkNBQ2xHaEYsVUFBVSxXQUFXK0UsTUFBTTlFLGFBQWEsMkJBQTJCOEUsSUFBSTlFLGFBQWEsb0JBQW9CLFdBQVcsSUFDakgsa0JBQWdCK0UsY0FGa0VELEdBQXBGO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBRTZCO0FBQUEsWUFDN0IsS0FMRjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQU1BO0FBQUEsZUF2Q0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkF3Q0E7QUFBQSxhQXpFRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBMEVBO0FBQUEsUUFFQSx1QkFBQyxhQUFVLHdCQUFxQix5QkFBd0Isd0JBQXFCLFFBQU8sTUFBTWhFLGVBQWUsU0FBUyxNQUFNQyxpQkFBaUIsS0FBSyxHQUFHLGFBQTBCLFVBQVVGLGtCQUFyTDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQW9NO0FBQUE7QUFBQTtBQUFBLElBdEZ0TTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUF1RkE7QUFFSjtBQUFDdkIsR0FwTXVCRCxXQUFTO0FBQUEsVUFDZHBCLGFBVWJPLGFBQWE7QUFBQTtBQUFBLEtBWEthO0FBQVMsSUFBQTJGO0FBQUEsYUFBQUEsSUFBQSIsIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlUmVmIiwidXNlQ2FsbGJhY2siLCJ1c2VOYXZpZ2F0ZSIsIm1vdGlvbiIsIkFycm93TGVmdCIsIkFycm93UmlnaHQiLCJBcnJvd1VwIiwiQXJyb3dEb3duIiwiYmFzZTQ0IiwidXNlRm9jdXNUaW1lciIsIkZvY3VzVGltZXIiLCJUYWdQaWNrZXIiLCJPcmFuZ2VDYW52YXMiLCJUQUdfQ09MT1JTIiwiYmx1ZSIsInB1cnBsZSIsImdyZWVuIiwiYW1iZXIiLCJyb3NlIiwidGVhbCIsImluZGlnbyIsInBpbmsiLCJGb2N1c1BvbW8iLCJfcyIsIm5hdmlnYXRlIiwiYnV0dG9uUmVmIiwidG91Y2hTdGFydCIsIngiLCJ5IiwiZHJhZ09mZnNldCIsImRyYWdTdHlsZSIsInNldERyYWdTdHlsZSIsInBoYXNlIiwiY3ljbGVJbmRleCIsInRvdGFsU2Vjb25kcyIsInJlbWFpbmluZ1NlY29uZHMiLCJpc1J1bm5pbmciLCJzZXNzaW9uQ29tcGxldGVkIiwiZm9jdXNNaW4iLCJzaG9ydEJyZWFrTWluIiwibG9uZ0JyZWFrTWluIiwiaGFuZGxlUGxheVBhdXNlIiwiaGFuZGxlU2tpcCIsImFkdmFuY2VQaGFzZSIsInJlc2V0U2Vzc2lvbkNvbXBsZXRlZCIsInNlbGVjdGVkVGFnIiwic2V0U2VsZWN0ZWRUYWciLCJzaG93VGFnUGlja2VyIiwic2V0U2hvd1RhZ1BpY2tlciIsImNvbXBsZXRlZE9yYW5nZXMiLCJzZXRDb21wbGV0ZWRPcmFuZ2VzIiwic2hvd09yYW5nZXMiLCJzZXRTaG93T3JhbmdlcyIsIm5vdGlmaWNhdGlvbnNFbmFibGVkIiwic2V0Tm90aWZpY2F0aW9uc0VuYWJsZWQiLCJhdXRoIiwibWUiLCJ0aGVuIiwidSIsIm5vdGlmaWNhdGlvbnNfZW5hYmxlZCIsInVuZGVmaW5lZCIsImNhdGNoIiwiZW50aXRpZXMiLCJUYWciLCJsaXN0IiwidGFncyIsImxlbmd0aCIsInByZXYiLCJGb2N1c1Nlc3Npb24iLCJjcmVhdGUiLCJ0YWdfaWQiLCJpZCIsInRhZ19uYW1lIiwibmFtZSIsInRhZ19jb2xvciIsImNvbG9yIiwiZHVyYXRpb25fbWludXRlcyIsInR5cGUiLCJjb21wbGV0ZWQiLCJ3aW5kb3ciLCJOb3RpZmljYXRpb24iLCJwZXJtaXNzaW9uIiwiYm9keSIsImljb24iLCJyZXF1ZXN0UGVybWlzc2lvbiIsImJ1dHRvbkxhYmVsIiwic2tpcExhYmVsIiwidGFnQ29sb3JDbGFzcyIsImhhbmRsZVBvaW50ZXJTdGFydCIsImN1cnJlbnQiLCJoYW5kbGVQb2ludGVyTW92ZSIsInRyYW5zZm9ybSIsInRyYW5zaXRpb24iLCJoYW5kbGVQb2ludGVyRW5kIiwiZHgiLCJkeSIsImFic0R4IiwiTWF0aCIsImFicyIsImFic0R5IiwiZSIsInRvdWNoZXMiLCJjbGllbnRYIiwiY2xpZW50WSIsImNoYW5nZWRUb3VjaGVzIiwiYnV0dG9ucyIsImJhY2tncm91bmQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJpbmNsdWRlcyIsIm9wYWNpdHkiLCJtYXAiLCJpIiwiX19hcnJJZHhfXyIsIl9jIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIkZvY3VzUG9tby5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlTmF2aWdhdGUgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuaW1wb3J0IHsgbW90aW9uIH0gZnJvbSBcImZyYW1lci1tb3Rpb25cIjtcbmltcG9ydCB7IEFycm93TGVmdCwgQXJyb3dSaWdodCwgQXJyb3dVcCwgQXJyb3dEb3duIH0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xuaW1wb3J0IHsgYmFzZTQ0IH0gZnJvbSBcIkAvYXBpL2Jhc2U0NENsaWVudFwiO1xuaW1wb3J0IHsgdXNlRm9jdXNUaW1lciB9IGZyb20gXCJAL2NvbnRleHQvRm9jdXNUaW1lckNvbnRleHRcIjtcbmltcG9ydCBGb2N1c1RpbWVyIGZyb20gXCJAL2NvbXBvbmVudHMvRm9jdXNUaW1lclwiO1xuaW1wb3J0IFRhZ1BpY2tlciBmcm9tIFwiQC9jb21wb25lbnRzL1RhZ1BpY2tlclwiO1xuaW1wb3J0IE9yYW5nZUNhbnZhcyBmcm9tIFwiQC9jb21wb25lbnRzL09yYW5nZUNhbnZhc1wiO1xuXG5jb25zdCBUQUdfQ09MT1JTID0ge1xuICBibHVlOiBcImJnLWJsdWUtMTAwIHRleHQtYmx1ZS03MDBcIiwgcHVycGxlOiBcImJnLXB1cnBsZS0xMDAgdGV4dC1wdXJwbGUtNzAwXCIsXG4gIGdyZWVuOiBcImJnLWdyZWVuLTEwMCB0ZXh0LWdyZWVuLTcwMFwiLCBhbWJlcjogXCJiZy1hbWJlci0xMDAgdGV4dC1hbWJlci03MDBcIixcbiAgcm9zZTogXCJiZy1yb3NlLTEwMCB0ZXh0LXJvc2UtNzAwXCIsIHRlYWw6IFwiYmctdGVhbC0xMDAgdGV4dC10ZWFsLTcwMFwiLFxuICBpbmRpZ286IFwiYmctaW5kaWdvLTEwMCB0ZXh0LWluZGlnby03MDBcIiwgcGluazogXCJiZy1waW5rLTEwMCB0ZXh0LXBpbmstNzAwXCJcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEZvY3VzUG9tbygpIHtcbiAgY29uc3QgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpO1xuICBjb25zdCBidXR0b25SZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IHRvdWNoU3RhcnQgPSB1c2VSZWYoeyB4OiAwLCB5OiAwIH0pO1xuICBjb25zdCBkcmFnT2Zmc2V0ID0gdXNlUmVmKHsgeDogMCwgeTogMCB9KTtcbiAgY29uc3QgW2RyYWdTdHlsZSwgc2V0RHJhZ1N0eWxlXSA9IHVzZVN0YXRlKHt9KTtcblxuICBjb25zdCB7XG4gICAgcGhhc2UsIGN5Y2xlSW5kZXgsIHRvdGFsU2Vjb25kcywgcmVtYWluaW5nU2Vjb25kcywgaXNSdW5uaW5nLFxuICAgIHNlc3Npb25Db21wbGV0ZWQsIGZvY3VzTWluLCBzaG9ydEJyZWFrTWluLCBsb25nQnJlYWtNaW4sXG4gICAgaGFuZGxlUGxheVBhdXNlLCBoYW5kbGVTa2lwLCBhZHZhbmNlUGhhc2UsIHJlc2V0U2Vzc2lvbkNvbXBsZXRlZFxuICB9ID0gdXNlRm9jdXNUaW1lcigpO1xuXG4gIGNvbnN0IFtzZWxlY3RlZFRhZywgc2V0U2VsZWN0ZWRUYWddID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtzaG93VGFnUGlja2VyLCBzZXRTaG93VGFnUGlja2VyXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2NvbXBsZXRlZE9yYW5nZXMsIHNldENvbXBsZXRlZE9yYW5nZXNdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtzaG93T3Jhbmdlcywgc2V0U2hvd09yYW5nZXNdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbm90aWZpY2F0aW9uc0VuYWJsZWQsIHNldE5vdGlmaWNhdGlvbnNFbmFibGVkXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgYmFzZTQ0LmF1dGgubWUoKS50aGVuKCh1KSA9PiB7XG4gICAgICBpZiAodT8ubm90aWZpY2F0aW9uc19lbmFibGVkICE9PSB1bmRlZmluZWQpIHNldE5vdGlmaWNhdGlvbnNFbmFibGVkKHUubm90aWZpY2F0aW9uc19lbmFibGVkKTtcbiAgICB9KS5jYXRjaCgoKSA9PiB7fSk7XG4gICAgYmFzZTQ0LmVudGl0aWVzLlRhZy5saXN0KCkudGhlbigodGFncykgPT4ge1xuICAgICAgaWYgKHRhZ3MubGVuZ3RoID4gMCkgc2V0U2VsZWN0ZWRUYWcodGFnc1swXSk7XG4gICAgfSkuY2F0Y2goKCkgPT4ge30pO1xuICB9LCBbXSk7XG5cbiAgLy8gU2F2ZSBzZXNzaW9uIHdoZW4gZm9jdXMgY29tcGxldGVzXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHNlc3Npb25Db21wbGV0ZWQpIHtcbiAgICAgIHNldENvbXBsZXRlZE9yYW5nZXMoKHByZXYpID0+IHByZXYgKyAxKTtcbiAgICAgIHNldFNob3dPcmFuZ2VzKHRydWUpO1xuICAgICAgYmFzZTQ0LmVudGl0aWVzLkZvY3VzU2Vzc2lvbi5jcmVhdGUoe1xuICAgICAgICB0YWdfaWQ6IHNlbGVjdGVkVGFnPy5pZCB8fCBudWxsLFxuICAgICAgICB0YWdfbmFtZTogc2VsZWN0ZWRUYWc/Lm5hbWUgfHwgXCJFc3R1ZG9cIixcbiAgICAgICAgdGFnX2NvbG9yOiBzZWxlY3RlZFRhZz8uY29sb3IgfHwgXCJibHVlXCIsXG4gICAgICAgIGR1cmF0aW9uX21pbnV0ZXM6IGZvY3VzTWluLFxuICAgICAgICB0eXBlOiBcImZvY3VzXCIsXG4gICAgICAgIGNvbXBsZXRlZDogdHJ1ZVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge30pO1xuICAgICAgcmVzZXRTZXNzaW9uQ29tcGxldGVkKCk7XG5cbiAgICAgIC8vIFNlbmQgbm90aWZpY2F0aW9uXG4gICAgICBpZiAobm90aWZpY2F0aW9uc0VuYWJsZWQgJiYgXCJOb3RpZmljYXRpb25cIiBpbiB3aW5kb3cgJiYgTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gPT09IFwiZ3JhbnRlZFwiKSB7XG4gICAgICAgIG5ldyBOb3RpZmljYXRpb24oXCJGb2N1c0Zsb3dcIiwge1xuICAgICAgICAgIGJvZHk6IFwiRm9jbyBjb25jbHXDrWRvISDwn42KIEhvcmEgZGUgcGF1c2FyLlwiLFxuICAgICAgICAgIGljb246IFwi8J+NilwiXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgLy8gUmVxdWVzdCBub3RpZmljYXRpb24gcGVybWlzc2lvblxuICAgICAgaWYgKG5vdGlmaWNhdGlvbnNFbmFibGVkICYmIFwiTm90aWZpY2F0aW9uXCIgaW4gd2luZG93ICYmIE5vdGlmaWNhdGlvbi5wZXJtaXNzaW9uID09PSBcImRlZmF1bHRcIikge1xuICAgICAgICBOb3RpZmljYXRpb24ucmVxdWVzdFBlcm1pc3Npb24oKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIFtzZXNzaW9uQ29tcGxldGVkXSk7XG5cbiAgY29uc3QgYnV0dG9uTGFiZWwgPSAoKSA9PiB7XG4gICAgaWYgKHJlbWFpbmluZ1NlY29uZHMgPD0gMCAmJiAhaXNSdW5uaW5nKSB7XG4gICAgICByZXR1cm4gcGhhc2UgPT09IFwiZm9jdXNcIiA/IFwiQ29tZcOnYXIgUGF1c2FcIiA6IFwiQ29tZcOnYXIgRm9jb1wiO1xuICAgIH1cbiAgICBpZiAoaXNSdW5uaW5nKSByZXR1cm4gXCJQYXVzYXJcIjtcbiAgICBpZiAocGhhc2UgPT09IFwiZm9jdXNcIikgcmV0dXJuIFwiU3RhcnQgRm9jdXNcIjtcbiAgICByZXR1cm4gXCJTdGFydCBQYXVzZVwiO1xuICB9O1xuXG4gIGNvbnN0IHNraXBMYWJlbCA9ICgpID0+IHtcbiAgICBpZiAocmVtYWluaW5nU2Vjb25kcyA8PSAwKSByZXR1cm4gXCJcIjtcbiAgICBpZiAocGhhc2UgPT09IFwiZm9jdXNcIikgcmV0dXJuIFwiU2tpcCBGb2N1c1wiO1xuICAgIHJldHVybiBcIlNraXAgUGF1c2VcIjtcbiAgfTtcblxuICBjb25zdCB0YWdDb2xvckNsYXNzID0gc2VsZWN0ZWRUYWcgPyBUQUdfQ09MT1JTW3NlbGVjdGVkVGFnLmNvbG9yXSB8fCBUQUdfQ09MT1JTLmJsdWUgOiBUQUdfQ09MT1JTLmJsdWU7XG5cbiAgLy8gU3dpcGVcbiAgY29uc3QgaGFuZGxlUG9pbnRlclN0YXJ0ID0gdXNlQ2FsbGJhY2soKHgsIHkpID0+IHtcbiAgICB0b3VjaFN0YXJ0LmN1cnJlbnQgPSB7IHgsIHkgfTtcbiAgICBkcmFnT2Zmc2V0LmN1cnJlbnQgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICBzZXREcmFnU3R5bGUoe30pO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlUG9pbnRlck1vdmUgPSB1c2VDYWxsYmFjaygoeCwgeSkgPT4ge1xuICAgIGRyYWdPZmZzZXQuY3VycmVudCA9IHsgeDogeCAtIHRvdWNoU3RhcnQuY3VycmVudC54LCB5OiB5IC0gdG91Y2hTdGFydC5jdXJyZW50LnkgfTtcbiAgICBzZXREcmFnU3R5bGUoe1xuICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7ZHJhZ09mZnNldC5jdXJyZW50Lnh9cHgsICR7ZHJhZ09mZnNldC5jdXJyZW50Lnl9cHgpYCxcbiAgICAgIHRyYW5zaXRpb246IFwibm9uZVwiXG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVQb2ludGVyRW5kID0gdXNlQ2FsbGJhY2soKHgsIHkpID0+IHtcbiAgICBzZXREcmFnU3R5bGUoeyB0cmFuc2Zvcm06IFwidHJhbnNsYXRlKDAsIDApXCIsIHRyYW5zaXRpb246IFwidHJhbnNmb3JtIDAuM3MgZWFzZS1vdXRcIiB9KTtcbiAgICBjb25zdCBkeCA9IHggLSB0b3VjaFN0YXJ0LmN1cnJlbnQueDtcbiAgICBjb25zdCBkeSA9IHkgLSB0b3VjaFN0YXJ0LmN1cnJlbnQueTtcbiAgICBjb25zdCBhYnNEeCA9IE1hdGguYWJzKGR4KTtcbiAgICBjb25zdCBhYnNEeSA9IE1hdGguYWJzKGR5KTtcbiAgICBpZiAoYWJzRHggPCA0MCAmJiBhYnNEeSA8IDQwKSByZXR1cm47XG5cbiAgICBpZiAoYWJzRHggPiBhYnNEeSkge1xuICAgICAgaWYgKGR4IDwgLTYwKSBuYXZpZ2F0ZShcIi9mb2N1cy9jYWxlbmRhclwiKTtlbHNlXG4gICAgICBpZiAoZHggPiA2MCkgbmF2aWdhdGUoXCIvZm9jdXMvc2V0dGluZ3NcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChkeSA8IC02MCkgbmF2aWdhdGUoXCIvZm9jdXMvYW5hbHl0aWNzXCIpO2Vsc2VcbiAgICAgIGlmIChkeSA+IDYwKSBuYXZpZ2F0ZShcIi9cIik7XG4gICAgfVxuICB9LCBbbmF2aWdhdGVdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1BvbW86MTI1OjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgIGNsYXNzTmFtZT1cImgtc2NyZWVuIHctc2NyZWVuIGZsZXggZmxleC1jb2wgYmctY3JlYW0gb3ZlcmZsb3ctaGlkZGVuIHJlbGF0aXZlIHNlbGVjdC1ub25lXCJcbiAgICBvblRvdWNoU3RhcnQ9eyhlKSA9PiBoYW5kbGVQb2ludGVyU3RhcnQoZS50b3VjaGVzWzBdLmNsaWVudFgsIGUudG91Y2hlc1swXS5jbGllbnRZKX1cbiAgICBvblRvdWNoTW92ZT17KGUpID0+IGhhbmRsZVBvaW50ZXJNb3ZlKGUudG91Y2hlc1swXS5jbGllbnRYLCBlLnRvdWNoZXNbMF0uY2xpZW50WSl9XG4gICAgb25Ub3VjaEVuZD17KGUpID0+IGhhbmRsZVBvaW50ZXJFbmQoZS5jaGFuZ2VkVG91Y2hlc1swXT8uY2xpZW50WCB8fCB0b3VjaFN0YXJ0LmN1cnJlbnQueCwgZS5jaGFuZ2VkVG91Y2hlc1swXT8uY2xpZW50WSB8fCB0b3VjaFN0YXJ0LmN1cnJlbnQueSl9XG4gICAgb25Nb3VzZURvd249eyhlKSA9PiBoYW5kbGVQb2ludGVyU3RhcnQoZS5jbGllbnRYLCBlLmNsaWVudFkpfVxuICAgIG9uTW91c2VNb3ZlPXsoZSkgPT4ge2lmIChlLmJ1dHRvbnMgPT09IDEpIGhhbmRsZVBvaW50ZXJNb3ZlKGUuY2xpZW50WCwgZS5jbGllbnRZKTt9fVxuICAgIG9uTW91c2VVcD17KGUpID0+IGhhbmRsZVBvaW50ZXJFbmQoZS5jbGllbnRYLCBlLmNsaWVudFkpfVxuICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwibGluZWFyLWdyYWRpZW50KDE4MGRlZywgI0ZGRjVFNiAwJSwgI0Y1RjBFOCAxMDAlKVwiIH19PlxuICAgICAgXG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNQb21vOjEzNTo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgc3R5bGU9e2RyYWdTdHlsZX0gY2xhc3NOYW1lPVwiZmxleC0xIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgIDxPcmFuZ2VDYW52YXMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1BvbW86MTM2OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvcmFuZ2VzPXtzaG93T3JhbmdlcyA/IGNvbXBsZXRlZE9yYW5nZXMgOiAwfSBidXR0b25SZWY9e2J1dHRvblJlZn0gLz5cblxuICAgICAgICB7LyogTmF2aWdhdGlvbiBhcnJvd3MgKi99XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1BvbW86MTM5OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtNCBsZWZ0LTEvMiAtdHJhbnNsYXRlLXgtMS8yIHotMjAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNQb21vOjE0MDoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKFwiL1wiKX0gY2xhc3NOYW1lPVwidy04IGgtOCByb3VuZGVkLWZ1bGwgYmctd2hpdGUgYm9yZGVyIGJvcmRlci1ib3JkZXIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1bI0U4N0E1QV0gc2hhZG93LXNtIGhvdmVyOmJnLVsjRTg3QTVBXS81IHRyYW5zaXRpb24tYWxsXCI+XG4gICAgICAgICAgICA8QXJyb3dVcCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzUG9tbzoxNDE6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNQb21vOjE0MzoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LW11dGVkLWZvcmVncm91bmQvNTAgaGlkZGVuIHNtOmJsb2NrXCI+SG9tZTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzUG9tbzoxNDY6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0xLzIgLXRyYW5zbGF0ZS15LTEvMiByaWdodC00IHotMjAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzUG9tbzoxNDc6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kLzUwIHdoaXRlc3BhY2Utbm93cmFwIGhpZGRlbiBzbTpibG9ja1wiPkNhbGVuZMOhcmlvPC9zcGFuPlxuICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1BvbW86MTQ4OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoXCIvZm9jdXMvY2FsZW5kYXJcIil9IGNsYXNzTmFtZT1cInctOSBoLTkgcm91bmRlZC1mdWxsIGJnLXdoaXRlIGJvcmRlciBib3JkZXItYm9yZGVyIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBzaGFkb3ctc20gaG92ZXI6dGV4dC1mb3JlZ3JvdW5kIHRyYW5zaXRpb24tYWxsXCI+XG4gICAgICAgICAgICA8QXJyb3dSaWdodCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzUG9tbzoxNDk6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNQb21vOjE1Mzo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTEvMiAtdHJhbnNsYXRlLXktMS8yIGxlZnQtNCB6LTIwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzUG9tbzoxNTQ6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiBuYXZpZ2F0ZShcIi9mb2N1cy9zZXR0aW5nc1wiKX0gY2xhc3NOYW1lPVwidy05IGgtOSByb3VuZGVkLWZ1bGwgYmctd2hpdGUgYm9yZGVyIGJvcmRlci1ib3JkZXIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIHNoYWRvdy1zbSBob3Zlcjp0ZXh0LWZvcmVncm91bmQgdHJhbnNpdGlvbi1hbGxcIj5cbiAgICAgICAgICAgIDxBcnJvd0xlZnQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1BvbW86MTU1OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzUG9tbzoxNTc6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kLzUwIHdoaXRlc3BhY2Utbm93cmFwIGhpZGRlbiBzbTpibG9ja1wiPlNldHRpbmdzPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNQb21vOjE2MDo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTQgbGVmdC0xLzIgLXRyYW5zbGF0ZS14LTEvMiB6LTIwIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1BvbW86MTYxOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtbXV0ZWQtZm9yZWdyb3VuZC81MCBoaWRkZW4gc206YmxvY2tcIj5BbmFseXRpY3M8L3NwYW4+XG4gICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzUG9tbzoxNjI6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiBuYXZpZ2F0ZShcIi9mb2N1cy9hbmFseXRpY3NcIil9IGNsYXNzTmFtZT1cInctOCBoLTggcm91bmRlZC1mdWxsIGJnLXdoaXRlIGJvcmRlciBib3JkZXItYm9yZGVyIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBzaGFkb3ctc20gaG92ZXI6dGV4dC1mb3JlZ3JvdW5kIHRyYW5zaXRpb24tYWxsXCI+XG4gICAgICAgICAgICA8QXJyb3dEb3duIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNQb21vOjE2MzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBNYWluIGNvbnRlbnQgKi99XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1BvbW86MTY4OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBnYXAtNiBwdC0xMFwiPlxuICAgICAgICAgIDxGb2N1c1RpbWVyIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNQb21vOjE2OToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHRvdGFsU2Vjb25kcz17dG90YWxTZWNvbmRzfSByZW1haW5pbmdTZWNvbmRzPXtyZW1haW5pbmdTZWNvbmRzfSBpc1J1bm5pbmc9e2lzUnVubmluZ30gbW9kZT17cGhhc2UgPT09IFwiZm9jdXNcIiA/IFwiZm9jdXNcIiA6IFwicGF1c2VcIn0gLz5cblxuICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1BvbW86MTcxOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93VGFnUGlja2VyKHRydWUpfVxuICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMiByb3VuZGVkLWZ1bGwgdGV4dC1zbSBmb250LW1lZGl1bSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRyYW5zaXRpb24tYWxsIGhvdmVyOnNjYWxlLTEwNSAke3RhZ0NvbG9yQ2xhc3N9YH0+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNQb21vOjE3NToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInctMiBoLTIgcm91bmRlZC1mdWxsXCIgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiBzZWxlY3RlZFRhZz8uY29sb3IgPyBbXCJibHVlXCIsIFwicHVycGxlXCIsIFwiZ3JlZW5cIiwgXCJhbWJlclwiLCBcInJvc2VcIiwgXCJ0ZWFsXCIsIFwiaW5kaWdvXCIsIFwicGlua1wiXS5pbmNsdWRlcyhzZWxlY3RlZFRhZy5jb2xvcikgPyB1bmRlZmluZWQgOiBzZWxlY3RlZFRhZy5jb2xvciA6IFwiIzNCODJGNlwiIH19IC8+XG4gICAgICAgICAgICB7c2VsZWN0ZWRUYWc/Lm5hbWUgfHwgXCJFc3R1ZG9cIn1cbiAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNQb21vOjE3NzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBvcGFjaXR5LTYwIG1sLTAuNVwiPuKAujwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1BvbW86MTgwOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgZ2FwLTIuNVwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvY3VzUG9tbzoxODE6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgcmVmPXtidXR0b25SZWZ9XG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVQbGF5UGF1c2V9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yMCBweS0zLjUgcm91bmRlZC1mdWxsIGJnLVsjNUM1NDRFXSB0ZXh0LXdoaXRlIGZvbnQtc2VtaWJvbGQgdGV4dC1zbSBzaGFkb3ctbGcgc2hhZG93LWJsYWNrLzEwIGhvdmVyOmJnLVsjNEE0MzQwXSB0cmFuc2l0aW9uLWFsbCBhY3RpdmU6c2NhbGUtOTUgbWluLXctWzI2MHB4XVwiPlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAge2J1dHRvbkxhYmVsKCl9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIHtpc1J1bm5pbmcgJiZcbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1BvbW86MTg5OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17aGFuZGxlU2tpcH0gY2xhc3NOYW1lPVwicHgtOCBweS0yIHJvdW5kZWQtZnVsbCB0ZXh0LVsjRTg3QTVBXSB0ZXh0LXNtIGZvbnQtbWVkaXVtIGhvdmVyOmJnLVsjRTg3QTVBXS81IHRyYW5zaXRpb24tYWxsXCI+XG4gICAgICAgICAgICAgICAge3NraXBMYWJlbCgpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHtzZXNzaW9uQ29tcGxldGVkICYmXG4gICAgICAgICAgPG1vdGlvbi5wIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNQb21vOjE5NjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeTogMTAgfX0gYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB5OiAwIH19IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1bI0U4N0E1QV0gZm9udC1tZWRpdW1cIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImNvbXBsZXRlZE9yYW5nZXNcIj5cbiAgICAgICAgICAgICAgKzEg8J+NiiB7Y29tcGxldGVkT3Jhbmdlc30gbGFyYW5qYXtjb21wbGV0ZWRPcmFuZ2VzICE9PSAxID8gXCJzXCIgOiBcIlwifSBjb25xdWlzdGFkYXtjb21wbGV0ZWRPcmFuZ2VzICE9PSAxID8gXCJzXCIgOiBcIlwifVxuICAgICAgICAgICAgPC9tb3Rpb24ucD5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNQb21vOjIwMToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZ2FwLTEuNVwiPlxuICAgICAgICAgICAge1swLCAxLCAyLCAzXS5tYXAoKGksIF9fYXJySWR4X18pID0+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9jdXNQb21vOjIwMzoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17aX0gY2xhc3NOYW1lPXtgdy0xLjUgaC0xLjUgcm91bmRlZC1mdWxsIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICBwaGFzZSA9PT0gXCJmb2N1c1wiICYmIGkgPT09IGN5Y2xlSW5kZXggPyBcImJnLVsjRTg3QTVBXSBzY2FsZS0xMjVcIiA6IGkgPCBjeWNsZUluZGV4ID8gXCJiZy1bI0U4N0E1QV0vMzBcIiA6IFwiYmctYm9yZGVyXCJ9YFxuICAgICAgICAgICAgfSBkYXRhLWFyci1pbmRleD17X19hcnJJZHhfX30gLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxUYWdQaWNrZXIgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb2N1c1BvbW86MjExOjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvcGVuPXtzaG93VGFnUGlja2VyfSBvbkNsb3NlPXsoKSA9PiBzZXRTaG93VGFnUGlja2VyKGZhbHNlKX0gc2VsZWN0ZWRUYWc9e3NlbGVjdGVkVGFnfSBvblNlbGVjdD17c2V0U2VsZWN0ZWRUYWd9IC8+XG4gICAgPC9kaXY+KTtcblxufSJdLCJmaWxlIjoiL2FwcC9zcmMvcGFnZXMvRm9jdXNQb21vLmpzeCJ9