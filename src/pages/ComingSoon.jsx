import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/ComingSoon.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/pages/ComingSoon.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=fc940917"; const useState = __vite__cjsImport3_react["useState"]; const useRef = __vite__cjsImport3_react["useRef"]; const useCallback = __vite__cjsImport3_react["useCallback"];
import { useNavigate } from "/node_modules/.vite/deps/react-router-dom.js?v=8a08d97a";
import { motion } from "/node_modules/.vite/deps/framer-motion.js?v=fc940917";
import { CalendarClock, Mic } from "/node_modules/.vite/deps/lucide-react.js?v=aefa7968";
export default function ComingSoon() {
  _s();
  const navigate = useNavigate();
  const touchStart = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const [dragStyle, setDragStyle] = useState({});
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
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 60) navigate("/deadlines");
      else if (dx < -60) navigate("/meeting-ai");
    } else {
      if (dy > 60) navigate("/");
      else if (dy < -60) navigate("/");
    }
  }, [navigate]);
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      "data-source-location": "pages/ComingSoon:37:4",
      "data-dynamic-content": "true",
      className: "h-screen w-screen overflow-hidden select-none relative bg-cream",
      onTouchStart: (e) => handlePointerStart(e.touches[0].clientX, e.touches[0].clientY),
      onTouchMove: (e) => handlePointerMove(e.touches[0].clientX, e.touches[0].clientY),
      onTouchEnd: (e) => handlePointerEnd(e.changedTouches[0]?.clientX || touchStart.current.x, e.changedTouches[0]?.clientY || touchStart.current.y),
      onMouseDown: (e) => handlePointerStart(e.clientX, e.clientY),
      onMouseMove: (e) => {
        if (e.buttons === 1) handlePointerMove(e.clientX, e.clientY);
      },
      onMouseUp: (e) => handlePointerEnd(e.clientX, e.clientY),
      children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ComingSoon:46:6", "data-dynamic-content": "true", style: dragStyle, className: "h-full flex relative", children: [
          /* @__PURE__ */ jsxDEV(
            motion.div,
            {
              "data-source-location": "pages/ComingSoon:49:8",
              "data-dynamic-content": "true",
              initial: { opacity: 0, x: -20 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.1, duration: 0.5 },
              onClick: () => navigate("/deadlines"),
              className: "w-1/2 h-full flex flex-col items-center justify-center cursor-pointer relative overflow-hidden",
              children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ComingSoon:56:10", "data-dynamic-content": "true", className: "relative z-10 flex flex-col items-center gap-5 px-5 text-center", children: [
                /* @__PURE__ */ jsxDEV(
                  motion.div,
                  {
                    "data-source-location": "pages/ComingSoon:57:12",
                    "data-dynamic-content": "true",
                    animate: { y: [0, -6, 0] },
                    transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                    className: "w-16 h-16 rounded-[22px] bg-[#E87A5A]/10 border border-[#E87A5A]/20 flex items-center justify-center shadow-md",
                    children: /* @__PURE__ */ jsxDEV(CalendarClock, { "data-source-location": "pages/ComingSoon:62:14", "data-dynamic-content": "false", className: "w-8 h-8 text-[#E87A5A]" }, void 0, false, {
                      fileName: "/app/src/pages/ComingSoon.jsx",
                      lineNumber: 81,
                      columnNumber: 15
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/src/pages/ComingSoon.jsx",
                    lineNumber: 76,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ComingSoon:64:12", "data-dynamic-content": "false", children: [
                  /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/ComingSoon:65:14", "data-dynamic-content": "false", className: "text-foreground font-black text-base leading-tight", children: "Controlo de" }, void 0, false, {
                    fileName: "/app/src/pages/ComingSoon.jsx",
                    lineNumber: 84,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/ComingSoon:66:14", "data-dynamic-content": "false", className: "text-[#E87A5A] font-black text-base leading-tight", children: "Datas" }, void 0, false, {
                    fileName: "/app/src/pages/ComingSoon.jsx",
                    lineNumber: 85,
                    columnNumber: 15
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/ComingSoon.jsx",
                  lineNumber: 83,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDEV(
                  motion.p,
                  {
                    "data-source-location": "pages/ComingSoon:68:12",
                    "data-dynamic-content": "true",
                    animate: { opacity: [0.4, 1, 0.4] },
                    transition: { repeat: Infinity, duration: 2.5 },
                    className: "text-muted-foreground/50 text-[11px]",
                    children: "desliza →"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/src/pages/ComingSoon.jsx",
                    lineNumber: 87,
                    columnNumber: 13
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/src/pages/ComingSoon.jsx",
                lineNumber: 75,
                columnNumber: 11
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/src/pages/ComingSoon.jsx",
              lineNumber: 68,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ComingSoon:79:8", "data-dynamic-content": "false", className: "absolute left-1/2 -translate-x-1/2 inset-y-0 flex items-center z-20 pointer-events-none", children: /* @__PURE__ */ jsxDEV("svg", { "data-source-location": "pages/ComingSoon:80:10", "data-dynamic-content": "false", width: "24", height: "100%", viewBox: "0 0 24 600", preserveAspectRatio: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ jsxDEV("line", { "data-source-location": "pages/ComingSoon:82:12", "data-dynamic-content": "false", x1: "12", y1: "0", x2: "12", y2: "240", stroke: "#E8E0D8", strokeWidth: "1" }, void 0, false, {
              fileName: "/app/src/pages/ComingSoon.jsx",
              lineNumber: 101,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("polygon", { "data-source-location": "pages/ComingSoon:84:12", "data-dynamic-content": "false", points: "12,230 5,310 11,310 4,390 19,290 13,290 20,210", fill: "#E87A5A", opacity: "0.5" }, void 0, false, {
              fileName: "/app/src/pages/ComingSoon.jsx",
              lineNumber: 103,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("line", { "data-source-location": "pages/ComingSoon:86:12", "data-dynamic-content": "false", x1: "12", y1: "370", x2: "12", y2: "600", stroke: "#E8E0D8", strokeWidth: "1" }, void 0, false, {
              fileName: "/app/src/pages/ComingSoon.jsx",
              lineNumber: 105,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/ComingSoon.jsx",
            lineNumber: 99,
            columnNumber: 11
          }, this) }, void 0, false, {
            fileName: "/app/src/pages/ComingSoon.jsx",
            lineNumber: 98,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV(
            motion.div,
            {
              "data-source-location": "pages/ComingSoon:91:8",
              "data-dynamic-content": "true",
              initial: { opacity: 0, x: 20 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.2, duration: 0.5 },
              onClick: () => navigate("/meeting-ai"),
              className: "w-1/2 h-full flex flex-col items-center justify-center cursor-pointer relative overflow-hidden",
              children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ComingSoon:98:10", "data-dynamic-content": "true", className: "relative z-10 flex flex-col items-center gap-5 px-5 text-center", children: [
                /* @__PURE__ */ jsxDEV(
                  motion.div,
                  {
                    "data-source-location": "pages/ComingSoon:99:12",
                    "data-dynamic-content": "true",
                    animate: { y: [0, -6, 0] },
                    transition: { repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 },
                    className: "w-16 h-16 rounded-[22px] bg-[#E87A5A]/10 border border-[#E87A5A]/20 flex items-center justify-center shadow-md",
                    children: /* @__PURE__ */ jsxDEV(Mic, { "data-source-location": "pages/ComingSoon:104:14", "data-dynamic-content": "false", className: "w-8 h-8 text-[#E87A5A]" }, void 0, false, {
                      fileName: "/app/src/pages/ComingSoon.jsx",
                      lineNumber: 123,
                      columnNumber: 15
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/src/pages/ComingSoon.jsx",
                    lineNumber: 118,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ComingSoon:106:12", "data-dynamic-content": "false", children: [
                  /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/ComingSoon:107:14", "data-dynamic-content": "false", className: "text-foreground font-black text-base leading-tight", children: "Resumo de" }, void 0, false, {
                    fileName: "/app/src/pages/ComingSoon.jsx",
                    lineNumber: 126,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/ComingSoon:108:14", "data-dynamic-content": "false", className: "text-[#E87A5A] font-black text-base leading-tight", children: "Reuniões IA" }, void 0, false, {
                    fileName: "/app/src/pages/ComingSoon.jsx",
                    lineNumber: 127,
                    columnNumber: 15
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/ComingSoon.jsx",
                  lineNumber: 125,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDEV(
                  motion.p,
                  {
                    "data-source-location": "pages/ComingSoon:110:12",
                    "data-dynamic-content": "true",
                    animate: { opacity: [0.4, 1, 0.4] },
                    transition: { repeat: Infinity, duration: 2.5, delay: 0.5 },
                    className: "text-muted-foreground/50 text-[11px]",
                    children: "← desliza"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/src/pages/ComingSoon.jsx",
                    lineNumber: 129,
                    columnNumber: 13
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/src/pages/ComingSoon.jsx",
                lineNumber: 117,
                columnNumber: 11
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/src/pages/ComingSoon.jsx",
              lineNumber: 110,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/src/pages/ComingSoon.jsx",
          lineNumber: 65,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ComingSoon:122:6", "data-dynamic-content": "true", className: "absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-20", children: /* @__PURE__ */ jsxDEV(
          motion.p,
          {
            "data-source-location": "pages/ComingSoon:123:8",
            "data-dynamic-content": "true",
            animate: { opacity: [0.3, 0.7, 0.3] },
            transition: { repeat: Infinity, duration: 3 },
            className: "text-muted-foreground/40 text-[10px] text-center",
            children: "↑↓ home"
          },
          void 0,
          false,
          {
            fileName: "/app/src/pages/ComingSoon.jsx",
            lineNumber: 142,
            columnNumber: 9
          },
          this
        ) }, void 0, false, {
          fileName: "/app/src/pages/ComingSoon.jsx",
          lineNumber: 141,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/src/pages/ComingSoon.jsx",
      lineNumber: 56,
      columnNumber: 5
    },
    this
  );
}
_s(ComingSoon, "wi0f+8QROK2HKijGnzm8p6leR9o=", false, function() {
  return [useNavigate];
});
_c = ComingSoon;
var _c;
$RefreshReg$(_c, "ComingSoon");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/pages/ComingSoon.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/pages/ComingSoon.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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LGVBUUE7QUFBQTtBQUFBO0FBQUEsSUE3RkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBOEZBO0FBRUo7QUFBQzFCLEdBL0h1QkQsWUFBVTtBQUFBLFVBQ2ZKLFdBQVc7QUFBQTtBQUFBLEtBRE5JO0FBQVUsSUFBQStCO0FBQUEsYUFBQUEsSUFBQSIsIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlUmVmIiwidXNlQ2FsbGJhY2siLCJ1c2VOYXZpZ2F0ZSIsIm1vdGlvbiIsIkNhbGVuZGFyQ2xvY2siLCJNaWMiLCJDb21pbmdTb29uIiwiX3MiLCJuYXZpZ2F0ZSIsInRvdWNoU3RhcnQiLCJ4IiwieSIsImRyYWdPZmZzZXQiLCJkcmFnU3R5bGUiLCJzZXREcmFnU3R5bGUiLCJoYW5kbGVQb2ludGVyU3RhcnQiLCJjdXJyZW50IiwiaGFuZGxlUG9pbnRlck1vdmUiLCJ0cmFuc2Zvcm0iLCJ0cmFuc2l0aW9uIiwiaGFuZGxlUG9pbnRlckVuZCIsImR4IiwiZHkiLCJNYXRoIiwiYWJzIiwiZSIsInRvdWNoZXMiLCJjbGllbnRYIiwiY2xpZW50WSIsImNoYW5nZWRUb3VjaGVzIiwiYnV0dG9ucyIsIm9wYWNpdHkiLCJkZWxheSIsImR1cmF0aW9uIiwicmVwZWF0IiwiSW5maW5pdHkiLCJlYXNlIiwiX2MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiQ29taW5nU29vbi5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZVJlZiwgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZU5hdmlnYXRlIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcbmltcG9ydCB7IG1vdGlvbiB9IGZyb20gXCJmcmFtZXItbW90aW9uXCI7XG5pbXBvcnQgeyBDYWxlbmRhckNsb2NrLCBNaWMgfSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbWluZ1Nvb24oKSB7XG4gIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcbiAgY29uc3QgdG91Y2hTdGFydCA9IHVzZVJlZih7IHg6IDAsIHk6IDAgfSk7XG4gIGNvbnN0IGRyYWdPZmZzZXQgPSB1c2VSZWYoeyB4OiAwLCB5OiAwIH0pO1xuICBjb25zdCBbZHJhZ1N0eWxlLCBzZXREcmFnU3R5bGVdID0gdXNlU3RhdGUoe30pO1xuXG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJTdGFydCA9IHVzZUNhbGxiYWNrKCh4LCB5KSA9PiB7XG4gICAgdG91Y2hTdGFydC5jdXJyZW50ID0geyB4LCB5IH07XG4gICAgZHJhZ09mZnNldC5jdXJyZW50ID0geyB4OiAwLCB5OiAwIH07XG4gICAgc2V0RHJhZ1N0eWxlKHt9KTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJNb3ZlID0gdXNlQ2FsbGJhY2soKHgsIHkpID0+IHtcbiAgICBkcmFnT2Zmc2V0LmN1cnJlbnQgPSB7IHg6IHggLSB0b3VjaFN0YXJ0LmN1cnJlbnQueCwgeTogeSAtIHRvdWNoU3RhcnQuY3VycmVudC55IH07XG4gICAgc2V0RHJhZ1N0eWxlKHsgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7ZHJhZ09mZnNldC5jdXJyZW50Lnh9cHgsICR7ZHJhZ09mZnNldC5jdXJyZW50Lnl9cHgpYCwgdHJhbnNpdGlvbjogXCJub25lXCIgfSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVQb2ludGVyRW5kID0gdXNlQ2FsbGJhY2soKHgsIHkpID0+IHtcbiAgICBzZXREcmFnU3R5bGUoeyB0cmFuc2Zvcm06IFwidHJhbnNsYXRlKDAsIDApXCIsIHRyYW5zaXRpb246IFwidHJhbnNmb3JtIDAuM3MgZWFzZS1vdXRcIiB9KTtcbiAgICBjb25zdCBkeCA9IHggLSB0b3VjaFN0YXJ0LmN1cnJlbnQueDtcbiAgICBjb25zdCBkeSA9IHkgLSB0b3VjaFN0YXJ0LmN1cnJlbnQueTtcbiAgICBpZiAoTWF0aC5hYnMoZHgpID4gTWF0aC5hYnMoZHkpKSB7XG4gICAgICBpZiAoZHggPiA2MCkgbmF2aWdhdGUoXCIvZGVhZGxpbmVzXCIpO2Vsc2VcbiAgICAgIGlmIChkeCA8IC02MCkgbmF2aWdhdGUoXCIvbWVldGluZy1haVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGR5ID4gNjApIG5hdmlnYXRlKFwiL1wiKTtlbHNlXG4gICAgICBpZiAoZHkgPCAtNjApIG5hdmlnYXRlKFwiL1wiKTtcbiAgICB9XG4gIH0sIFtuYXZpZ2F0ZV0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0NvbWluZ1Nvb246Mzc6NFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgY2xhc3NOYW1lPVwiaC1zY3JlZW4gdy1zY3JlZW4gb3ZlcmZsb3ctaGlkZGVuIHNlbGVjdC1ub25lIHJlbGF0aXZlIGJnLWNyZWFtXCJcbiAgICBvblRvdWNoU3RhcnQ9eyhlKSA9PiBoYW5kbGVQb2ludGVyU3RhcnQoZS50b3VjaGVzWzBdLmNsaWVudFgsIGUudG91Y2hlc1swXS5jbGllbnRZKX1cbiAgICBvblRvdWNoTW92ZT17KGUpID0+IGhhbmRsZVBvaW50ZXJNb3ZlKGUudG91Y2hlc1swXS5jbGllbnRYLCBlLnRvdWNoZXNbMF0uY2xpZW50WSl9XG4gICAgb25Ub3VjaEVuZD17KGUpID0+IGhhbmRsZVBvaW50ZXJFbmQoZS5jaGFuZ2VkVG91Y2hlc1swXT8uY2xpZW50WCB8fCB0b3VjaFN0YXJ0LmN1cnJlbnQueCwgZS5jaGFuZ2VkVG91Y2hlc1swXT8uY2xpZW50WSB8fCB0b3VjaFN0YXJ0LmN1cnJlbnQueSl9XG4gICAgb25Nb3VzZURvd249eyhlKSA9PiBoYW5kbGVQb2ludGVyU3RhcnQoZS5jbGllbnRYLCBlLmNsaWVudFkpfVxuICAgIG9uTW91c2VNb3ZlPXsoZSkgPT4ge2lmIChlLmJ1dHRvbnMgPT09IDEpIGhhbmRsZVBvaW50ZXJNb3ZlKGUuY2xpZW50WCwgZS5jbGllbnRZKTt9fVxuICAgIG9uTW91c2VVcD17KGUpID0+IGhhbmRsZVBvaW50ZXJFbmQoZS5jbGllbnRYLCBlLmNsaWVudFkpfT5cbiAgICAgIFxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0NvbWluZ1Nvb246NDY6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHN0eWxlPXtkcmFnU3R5bGV9IGNsYXNzTmFtZT1cImgtZnVsbCBmbGV4IHJlbGF0aXZlXCI+XG5cbiAgICAgICAgey8qIExlZnQgcGFuZWwg4oCUIERlYWRsaW5lcyAqL31cbiAgICAgICAgPG1vdGlvbi5kaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Db21pbmdTb29uOjQ5OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHg6IC0yMCB9fVxuICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHg6IDAgfX1cbiAgICAgICAgdHJhbnNpdGlvbj17eyBkZWxheTogMC4xLCBkdXJhdGlvbjogMC41IH19XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKFwiL2RlYWRsaW5lc1wiKX1cbiAgICAgICAgY2xhc3NOYW1lPVwidy0xLzIgaC1mdWxsIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGN1cnNvci1wb2ludGVyIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgIFxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Db21pbmdTb29uOjU2OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicmVsYXRpdmUgei0xMCBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBnYXAtNSBweC01IHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICA8bW90aW9uLmRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0NvbWluZ1Nvb246NTc6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgYW5pbWF0ZT17eyB5OiBbMCwgLTYsIDBdIH19XG4gICAgICAgICAgICB0cmFuc2l0aW9uPXt7IHJlcGVhdDogSW5maW5pdHksIGR1cmF0aW9uOiAzLCBlYXNlOiBcImVhc2VJbk91dFwiIH19XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTE2IGgtMTYgcm91bmRlZC1bMjJweF0gYmctWyNFODdBNUFdLzEwIGJvcmRlciBib3JkZXItWyNFODdBNUFdLzIwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNoYWRvdy1tZFwiPlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgPENhbGVuZGFyQ2xvY2sgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Db21pbmdTb29uOjYyOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctOCBoLTggdGV4dC1bI0U4N0E1QV1cIiAvPlxuICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0NvbWluZ1Nvb246NjQ6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCI+XG4gICAgICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvQ29taW5nU29vbjo2NToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LWZvcmVncm91bmQgZm9udC1ibGFjayB0ZXh0LWJhc2UgbGVhZGluZy10aWdodFwiPkNvbnRyb2xvIGRlPC9wPlxuICAgICAgICAgICAgICA8cCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0NvbWluZ1Nvb246NjY6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1bI0U4N0E1QV0gZm9udC1ibGFjayB0ZXh0LWJhc2UgbGVhZGluZy10aWdodFwiPkRhdGFzPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8bW90aW9uLnAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Db21pbmdTb29uOjY4OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogWzAuNCwgMSwgMC40XSB9fVxuICAgICAgICAgICAgdHJhbnNpdGlvbj17eyByZXBlYXQ6IEluZmluaXR5LCBkdXJhdGlvbjogMi41IH19XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LW11dGVkLWZvcmVncm91bmQvNTAgdGV4dC1bMTFweF1cIj5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIGRlc2xpemEg4oaSXG4gICAgICAgICAgICA8L21vdGlvbi5wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L21vdGlvbi5kaXY+XG5cbiAgICAgICAgey8qIExpZ2h0bmluZyBib2x0IGRpdmlkZXIgKi99XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Db21pbmdTb29uOjc5OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiYWJzb2x1dGUgbGVmdC0xLzIgLXRyYW5zbGF0ZS14LTEvMiBpbnNldC15LTAgZmxleCBpdGVtcy1jZW50ZXIgei0yMCBwb2ludGVyLWV2ZW50cy1ub25lXCI+XG4gICAgICAgICAgPHN2ZyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0NvbWluZ1Nvb246ODA6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDI0IDYwMFwiIHByZXNlcnZlQXNwZWN0UmF0aW89XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgey8qIFRoaW4gbGluZSB0b3AgKi99XG4gICAgICAgICAgICA8bGluZSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0NvbWluZ1Nvb246ODI6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgeDE9XCIxMlwiIHkxPVwiMFwiIHgyPVwiMTJcIiB5Mj1cIjI0MFwiIHN0cm9rZT1cIiNFOEUwRDhcIiBzdHJva2VXaWR0aD1cIjFcIiAvPlxuICAgICAgICAgICAgey8qIExpZ2h0bmluZyBib2x0IGluIG1pZGRsZSAqL31cbiAgICAgICAgICAgIDxwb2x5Z29uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvQ29taW5nU29vbjo4NDoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBwb2ludHM9XCIxMiwyMzAgNSwzMTAgMTEsMzEwIDQsMzkwIDE5LDI5MCAxMywyOTAgMjAsMjEwXCIgZmlsbD1cIiNFODdBNUFcIiBvcGFjaXR5PVwiMC41XCIgLz5cbiAgICAgICAgICAgIHsvKiBUaGluIGxpbmUgYm90dG9tICovfVxuICAgICAgICAgICAgPGxpbmUgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Db21pbmdTb29uOjg2OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHgxPVwiMTJcIiB5MT1cIjM3MFwiIHgyPVwiMTJcIiB5Mj1cIjYwMFwiIHN0cm9rZT1cIiNFOEUwRDhcIiBzdHJva2VXaWR0aD1cIjFcIiAvPlxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogUmlnaHQgcGFuZWwg4oCUIE1lZXRpbmcgQUkgKi99XG4gICAgICAgIDxtb3Rpb24uZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvQ29taW5nU29vbjo5MTo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB4OiAyMCB9fVxuICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHg6IDAgfX1cbiAgICAgICAgdHJhbnNpdGlvbj17eyBkZWxheTogMC4yLCBkdXJhdGlvbjogMC41IH19XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKFwiL21lZXRpbmctYWlcIil9XG4gICAgICAgIGNsYXNzTmFtZT1cInctMS8yIGgtZnVsbCBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBjdXJzb3ItcG9pbnRlciByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICBcbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvQ29taW5nU29vbjo5ODoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInJlbGF0aXZlIHotMTAgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgZ2FwLTUgcHgtNSB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgPG1vdGlvbi5kaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Db21pbmdTb29uOjk5OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgIGFuaW1hdGU9e3sgeTogWzAsIC02LCAwXSB9fVxuICAgICAgICAgICAgdHJhbnNpdGlvbj17eyByZXBlYXQ6IEluZmluaXR5LCBkdXJhdGlvbjogMywgZWFzZTogXCJlYXNlSW5PdXRcIiwgZGVsYXk6IDAuNSB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xNiBoLTE2IHJvdW5kZWQtWzIycHhdIGJnLVsjRTg3QTVBXS8xMCBib3JkZXIgYm9yZGVyLVsjRTg3QTVBXS8yMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaGFkb3ctbWRcIj5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxNaWMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Db21pbmdTb29uOjEwNDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTggaC04IHRleHQtWyNFODdBNUFdXCIgLz5cbiAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Db21pbmdTb29uOjEwNjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIj5cbiAgICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Db21pbmdTb29uOjEwNzoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LWZvcmVncm91bmQgZm9udC1ibGFjayB0ZXh0LWJhc2UgbGVhZGluZy10aWdodFwiPlJlc3VtbyBkZTwvcD5cbiAgICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Db21pbmdTb29uOjEwODoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LVsjRTg3QTVBXSBmb250LWJsYWNrIHRleHQtYmFzZSBsZWFkaW5nLXRpZ2h0XCI+UmV1bmnDtWVzIElBPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8bW90aW9uLnAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Db21pbmdTb29uOjExMDoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IFswLjQsIDEsIDAuNF0gfX1cbiAgICAgICAgICAgIHRyYW5zaXRpb249e3sgcmVwZWF0OiBJbmZpbml0eSwgZHVyYXRpb246IDIuNSwgZGVsYXk6IDAuNSB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1tdXRlZC1mb3JlZ3JvdW5kLzUwIHRleHQtWzExcHhdXCI+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICDihpAgZGVzbGl6YVxuICAgICAgICAgICAgPC9tb3Rpb24ucD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBCYWNrIGhpbnQgKi99XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvQ29taW5nU29vbjoxMjI6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS02IGxlZnQtMS8yIC10cmFuc2xhdGUteC0xLzIgcG9pbnRlci1ldmVudHMtbm9uZSB6LTIwXCI+XG4gICAgICAgIDxtb3Rpb24ucCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0NvbWluZ1Nvb246MTIzOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IFswLjMsIDAuNywgMC4zXSB9fVxuICAgICAgICB0cmFuc2l0aW9uPXt7IHJlcGVhdDogSW5maW5pdHksIGR1cmF0aW9uOiAzIH19XG4gICAgICAgIGNsYXNzTmFtZT1cInRleHQtbXV0ZWQtZm9yZWdyb3VuZC80MCB0ZXh0LVsxMHB4XSB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgIFxuICAgICAgICAgIOKGkeKGkyBob21lXG4gICAgICAgIDwvbW90aW9uLnA+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj4pO1xuXG59Il0sImZpbGUiOiIvYXBwL3NyYy9wYWdlcy9Db21pbmdTb29uLmpzeCJ9