import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/Home.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/pages/Home.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=fc940917"; const useRef = __vite__cjsImport3_react["useRef"]; const useCallback = __vite__cjsImport3_react["useCallback"]; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"];
import { useNavigate } from "/node_modules/.vite/deps/react-router-dom.js?v=8a08d97a";
import { motion } from "/node_modules/.vite/deps/framer-motion.js?v=fc940917";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, ListTodo, Heart, Timer, LayoutGrid } from "/node_modules/.vite/deps/lucide-react.js?v=aefa7968";
import { base44 } from "/src/api/base44Client.js";
function FloatingOrbs() {
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Home:9:4", "data-dynamic-content": "true", className: "fixed inset-0 pointer-events-none z-0 overflow-hidden", children: [...Array(8)].map(
    (_, i) => /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        "data-source-location": "pages/Home:11:8",
        "data-dynamic-content": "true",
        className: "absolute rounded-full bg-[#E87A5A]/8",
        style: {
          width: 60 + Math.random() * 180,
          height: 60 + Math.random() * 180,
          left: `${Math.random() * 90}%`,
          top: `${Math.random() * 90}%`
        },
        animate: {
          y: [0, -30 - Math.random() * 40, 0],
          x: [0, 15 + Math.random() * 20, 0],
          scale: [1, 1.05 + Math.random() * 0.1, 1],
          opacity: [0.3, 0.6, 0.3]
        },
        transition: {
          duration: 5 + Math.random() * 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 3
        },
        "data-arr-index": i
      },
      i,
      false,
      {
        fileName: "/app/src/pages/Home.jsx",
        lineNumber: 30,
        columnNumber: 7
      },
      this
    )
  ) }, void 0, false, {
    fileName: "/app/src/pages/Home.jsx",
    lineNumber: 28,
    columnNumber: 5
  }, this);
}
_c = FloatingOrbs;
function DirectionalArrow({ direction, label, onClick, icon: Icon, color, "data-collection-item-id": __dataCollectionItemId }) {
  const positions = {
    up: "top-6 left-1/2 -translate-x-1/2 flex-col",
    down: "bottom-6 left-1/2 -translate-x-1/2 flex-col",
    left: "left-6 top-1/2 -translate-y-1/2 flex-row",
    right: "right-6 top-1/2 -translate-y-1/2 flex-row-reverse"
  };
  const isHorizontal = direction === "left" || direction === "right";
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Home:49:4", "data-dynamic-content": "true", className: `absolute ${positions[direction]} z-20 flex items-center gap-3`, "data-collection-item-id": __dataCollectionItemId, children: [
    /* @__PURE__ */ jsxDEV(
      motion.button,
      {
        "data-source-location": "pages/Home:50:6",
        "data-dynamic-content": "true",
        onClick,
        whileHover: { scale: 1.1 },
        whileTap: { scale: 0.95 },
        className: `w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all ${color}`,
        children: /* @__PURE__ */ jsxDEV(Icon, { "data-source-location": "pages/Home:56:8", "data-dynamic-content": "false", className: "w-5 h-5" }, void 0, false, {
          fileName: "/app/src/pages/Home.jsx",
          lineNumber: 75,
          columnNumber: 9
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/app/src/pages/Home.jsx",
        lineNumber: 69,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      motion.span,
      {
        "data-source-location": "pages/Home:58:6",
        "data-dynamic-content": "true",
        animate: isHorizontal ? { x: [0, 5, 0] } : { y: [0, 5, 0] },
        transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
        className: `text-xs font-semibold text-foreground/70 whitespace-nowrap ${isHorizontal ? "hidden sm:block" : ""}`,
        "data-collection-item-field": "label",
        "data-collection-item-id": __dataCollectionItemId,
        children: label
      },
      void 0,
      false,
      {
        fileName: "/app/src/pages/Home.jsx",
        lineNumber: 77,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/src/pages/Home.jsx",
    lineNumber: 68,
    columnNumber: 5
  }, this);
}
_c2 = DirectionalArrow;
export default function Home() {
  _s();
  const navigate = useNavigate();
  const touchStart = useRef({ x: 0, y: 0 });
  const [swipeHint, setSwipeHint] = useState(null);
  const [user, setUser] = useState(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [dragStyle, setDragStyle] = useState({});
  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {
    });
  }, []);
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
      if (dx < -60) navigate("/habits");
      else if (dx > 60) navigate("/tasks");
    } else {
      if (dy < -60) navigate("/focus");
      else if (dy > 60) navigate("/coming-soon");
    }
  }, [navigate]);
  const handleTouchStart = useCallback((e) => {
    handlePointerStart(e.touches[0].clientX, e.touches[0].clientY);
  }, [handlePointerStart]);
  const handleTouchMove = useCallback((e) => {
    handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
  }, [handlePointerMove]);
  const handleTouchEnd = useCallback((e) => {
    handlePointerEnd(e.changedTouches[0]?.clientX || touchStart.current.x, e.changedTouches[0]?.clientY || touchStart.current.y);
  }, [handlePointerEnd]);
  const handleMouseDown = useCallback((e) => {
    handlePointerStart(e.clientX, e.clientY);
  }, [handlePointerStart]);
  const handleMouseMove = useCallback((e) => {
    if (e.buttons === 1) handlePointerMove(e.clientX, e.clientY);
  }, [handlePointerMove]);
  const handleMouseUp = useCallback((e) => {
    handlePointerEnd(e.clientX, e.clientY);
  }, [handlePointerEnd]);
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      "data-source-location": "pages/Home:138:4",
      "data-dynamic-content": "true",
      className: "h-screen w-screen flex items-center justify-center bg-cream overflow-hidden relative select-none",
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Home:147:6", "data-dynamic-content": "true", style: dragStyle, className: "flex-1 flex items-center justify-center w-full h-full", children: [
        /* @__PURE__ */ jsxDEV(FloatingOrbs, { "data-source-location": "pages/Home:148:6", "data-dynamic-content": "false" }, void 0, false, {
          fileName: "/app/src/pages/Home.jsx",
          lineNumber: 167,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV(
          DirectionalArrow,
          {
            "data-source-location": "pages/Home:151:6",
            "data-dynamic-content": "true",
            direction: "up",
            label: "Explorar",
            icon: LayoutGrid,
            onClick: () => navigate("/coming-soon"),
            color: "bg-white border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
          },
          void 0,
          false,
          {
            fileName: "/app/src/pages/Home.jsx",
            lineNumber: 170,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          DirectionalArrow,
          {
            "data-source-location": "pages/Home:156:6",
            "data-dynamic-content": "true",
            direction: "down",
            label: "FocusPomo",
            icon: Timer,
            onClick: () => navigate("/focus"),
            color: "bg-[#E87A5A] text-white hover:bg-[#D4694A] shadow-[#E87A5A]/30"
          },
          void 0,
          false,
          {
            fileName: "/app/src/pages/Home.jsx",
            lineNumber: 175,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          DirectionalArrow,
          {
            "data-source-location": "pages/Home:161:6",
            "data-dynamic-content": "true",
            direction: "left",
            label: "Tarefas",
            icon: ListTodo,
            onClick: () => navigate("/tasks"),
            color: "bg-white border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
          },
          void 0,
          false,
          {
            fileName: "/app/src/pages/Home.jsx",
            lineNumber: 180,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          DirectionalArrow,
          {
            "data-source-location": "pages/Home:166:6",
            "data-dynamic-content": "true",
            direction: "right",
            label: "Hábitos",
            icon: Heart,
            onClick: () => navigate("/habits"),
            color: "bg-white border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
          },
          void 0,
          false,
          {
            fileName: "/app/src/pages/Home.jsx",
            lineNumber: 185,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          motion.div,
          {
            "data-source-location": "pages/Home:173:6",
            "data-dynamic-content": "true",
            initial: { scale: 0, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            transition: { delay: 0.3, type: "spring", stiffness: 100, damping: 12 },
            className: "flex flex-col items-center z-10",
            children: [
              /* @__PURE__ */ jsxDEV(
                motion.div,
                {
                  "data-source-location": "pages/Home:179:8",
                  "data-dynamic-content": "true",
                  animate: { y: [0, -8, 0] },
                  transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                  className: "w-32 h-32 rounded-[40px] bg-gradient-to-br from-[#E87A5A] via-[#F0A080] to-[#F5C0A0] shadow-2xl shadow-[#E87A5A]/30 flex items-center justify-center mb-5 relative overflow-hidden",
                  children: [
                    /* @__PURE__ */ jsxDEV(
                      motion.div,
                      {
                        "data-source-location": "pages/Home:184:10",
                        "data-dynamic-content": "true",
                        className: "absolute inset-0 bg-white/20",
                        animate: { rotate: [0, 360], scale: [1, 1.5, 1] },
                        transition: { repeat: Infinity, duration: 8, ease: "linear" },
                        style: { borderRadius: "40%", width: "50%", height: "50%", top: "-20%", left: "-20%" }
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/src/pages/Home.jsx",
                        lineNumber: 203,
                        columnNumber: 11
                      },
                      this
                    ),
                    /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/Home:190:10", "data-dynamic-content": "false", className: "text-6xl relative z-10 drop-shadow-sm", children: "🍊" }, void 0, false, {
                      fileName: "/app/src/pages/Home.jsx",
                      lineNumber: 209,
                      columnNumber: 11
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/src/pages/Home.jsx",
                  lineNumber: 198,
                  columnNumber: 9
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                motion.h1,
                {
                  "data-source-location": "pages/Home:193:8",
                  "data-dynamic-content": "true",
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.6, duration: 0.6 },
                  className: "text-4xl font-extrabold tracking-tight",
                  children: [
                    /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/Home:199:10", "data-dynamic-content": "false", className: "bg-gradient-to-r from-[#E87A5A] to-[#D4694A] bg-clip-text text-transparent", children: "Focus" }, void 0, false, {
                      fileName: "/app/src/pages/Home.jsx",
                      lineNumber: 218,
                      columnNumber: 11
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/Home:202:10", "data-dynamic-content": "false", className: "text-foreground", children: "Flow" }, void 0, false, {
                      fileName: "/app/src/pages/Home.jsx",
                      lineNumber: 221,
                      columnNumber: 11
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/src/pages/Home.jsx",
                  lineNumber: 212,
                  columnNumber: 9
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                motion.p,
                {
                  "data-source-location": "pages/Home:205:8",
                  "data-dynamic-content": "true",
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.8, duration: 0.5 },
                  className: "text-sm text-muted-foreground mt-1.5",
                  children: "Produtividade com ritmo"
                },
                void 0,
                false,
                {
                  fileName: "/app/src/pages/Home.jsx",
                  lineNumber: 224,
                  columnNumber: 9
                },
                this
              )
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/src/pages/Home.jsx",
            lineNumber: 192,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Home:216:6", "data-dynamic-content": "true", className: "absolute bottom-28 left-1/2 -translate-x-1/2 flex items-center gap-8 z-10", children: [
          /* @__PURE__ */ jsxDEV(
            motion.span,
            {
              "data-source-location": "pages/Home:217:8",
              "data-dynamic-content": "true",
              animate: { opacity: [0.4, 1, 0.4] },
              transition: { repeat: Infinity, duration: 3 },
              className: "text-[10px] text-muted-foreground/60 hidden sm:block",
              children: "← Tarefas"
            },
            void 0,
            false,
            {
              fileName: "/app/src/pages/Home.jsx",
              lineNumber: 236,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            motion.span,
            {
              "data-source-location": "pages/Home:224:8",
              "data-dynamic-content": "true",
              animate: { opacity: [0.4, 1, 0.4] },
              transition: { repeat: Infinity, duration: 3, delay: 0.5 },
              className: "text-[10px] text-muted-foreground/60",
              children: "Desliza para navegar"
            },
            void 0,
            false,
            {
              fileName: "/app/src/pages/Home.jsx",
              lineNumber: 243,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            motion.span,
            {
              "data-source-location": "pages/Home:231:8",
              "data-dynamic-content": "true",
              animate: { opacity: [0.4, 1, 0.4] },
              transition: { repeat: Infinity, duration: 3, delay: 1 },
              className: "text-[10px] text-muted-foreground/60 hidden sm:block",
              children: "Hábitos →"
            },
            void 0,
            false,
            {
              fileName: "/app/src/pages/Home.jsx",
              lineNumber: 250,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/src/pages/Home.jsx",
          lineNumber: 235,
          columnNumber: 7
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/pages/Home.jsx",
        lineNumber: 166,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/app/src/pages/Home.jsx",
      lineNumber: 157,
      columnNumber: 5
    },
    this
  );
}
_s(Home, "ITJ3wLuKhr8vGgSKlWPt/nIXm5g=", false, function() {
  return [useNavigate];
});
_c3 = Home;
var _c, _c2, _c3;
$RefreshReg$(_c, "FloatingOrbs");
$RefreshReg$(_c2, "DirectionalArrow");
$RefreshReg$(_c3, "Home");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/pages/Home.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/pages/Home.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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LEVBQUVFLFFBQVFDLFVBQVVGLFVBQVUsR0FBR0ksT0FBTyxFQUFFO0FBQUEsY0FDdEQsV0FBVTtBQUFBLGNBQXNEO0FBQUE7QUFBQSxZQUhsRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFNQTtBQUFBLGFBckJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFzQkE7QUFBQSxXQTNGQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBNEZBO0FBQUE7QUFBQSxJQXJHRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFzR0E7QUFFSjtBQUFDaUIsR0E3S3VCRCxNQUFJO0FBQUEsVUFDVDlDLFdBQVc7QUFBQTtBQUFBLE1BRE44QztBQUFJLElBQUFmLElBQUFjLEtBQUE0QztBQUFBLGFBQUExRCxJQUFBO0FBQUEsYUFBQWMsS0FBQTtBQUFBLGFBQUE0QyxLQUFBIiwibmFtZXMiOlsidXNlUmVmIiwidXNlQ2FsbGJhY2siLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZU5hdmlnYXRlIiwibW90aW9uIiwiQXJyb3dMZWZ0IiwiQXJyb3dSaWdodCIsIkFycm93VXAiLCJBcnJvd0Rvd24iLCJMaXN0VG9kbyIsIkhlYXJ0IiwiVGltZXIiLCJMYXlvdXRHcmlkIiwiYmFzZTQ0IiwiRmxvYXRpbmdPcmJzIiwiQXJyYXkiLCJtYXAiLCJfIiwiaSIsIndpZHRoIiwiTWF0aCIsInJhbmRvbSIsImhlaWdodCIsImxlZnQiLCJ0b3AiLCJ5IiwieCIsInNjYWxlIiwib3BhY2l0eSIsImR1cmF0aW9uIiwicmVwZWF0IiwiSW5maW5pdHkiLCJlYXNlIiwiZGVsYXkiLCJfYyIsIkRpcmVjdGlvbmFsQXJyb3ciLCJkaXJlY3Rpb24iLCJsYWJlbCIsIm9uQ2xpY2siLCJpY29uIiwiSWNvbiIsImNvbG9yIiwiX19kYXRhQ29sbGVjdGlvbkl0ZW1JZCIsInBvc2l0aW9ucyIsInVwIiwiZG93biIsInJpZ2h0IiwiaXNIb3Jpem9udGFsIiwiX2MyIiwiSG9tZSIsIl9zIiwibmF2aWdhdGUiLCJ0b3VjaFN0YXJ0Iiwic3dpcGVIaW50Iiwic2V0U3dpcGVIaW50IiwidXNlciIsInNldFVzZXIiLCJkcmFnT2Zmc2V0IiwiZHJhZ1N0eWxlIiwic2V0RHJhZ1N0eWxlIiwiYXV0aCIsIm1lIiwidGhlbiIsImNhdGNoIiwiaGFuZGxlUG9pbnRlclN0YXJ0IiwiY3VycmVudCIsImhhbmRsZVBvaW50ZXJNb3ZlIiwidHJhbnNmb3JtIiwidHJhbnNpdGlvbiIsImhhbmRsZVBvaW50ZXJFbmQiLCJkeCIsImR5IiwiYWJzRHgiLCJhYnMiLCJhYnNEeSIsImhhbmRsZVRvdWNoU3RhcnQiLCJlIiwidG91Y2hlcyIsImNsaWVudFgiLCJjbGllbnRZIiwiaGFuZGxlVG91Y2hNb3ZlIiwiaGFuZGxlVG91Y2hFbmQiLCJjaGFuZ2VkVG91Y2hlcyIsImhhbmRsZU1vdXNlRG93biIsImhhbmRsZU1vdXNlTW92ZSIsImJ1dHRvbnMiLCJoYW5kbGVNb3VzZVVwIiwidHlwZSIsInN0aWZmbmVzcyIsImRhbXBpbmciLCJyb3RhdGUiLCJib3JkZXJSYWRpdXMiLCJfYzMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiSG9tZS5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlUmVmLCB1c2VDYWxsYmFjaywgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlTmF2aWdhdGUgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuaW1wb3J0IHsgbW90aW9uIH0gZnJvbSBcImZyYW1lci1tb3Rpb25cIjtcbmltcG9ydCB7IEFycm93TGVmdCwgQXJyb3dSaWdodCwgQXJyb3dVcCwgQXJyb3dEb3duLCBMaXN0VG9kbywgSGVhcnQsIFRpbWVyLCBMYXlvdXRHcmlkIH0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xuaW1wb3J0IHsgYmFzZTQ0IH0gZnJvbSBcIkAvYXBpL2Jhc2U0NENsaWVudFwiO1xuXG5mdW5jdGlvbiBGbG9hdGluZ09yYnMoKSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hvbWU6OTo0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCBwb2ludGVyLWV2ZW50cy1ub25lIHotMCBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgIHtbLi4uQXJyYXkoOCldLm1hcCgoXywgaSkgPT5cbiAgICAgIDxtb3Rpb24uZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSG9tZToxMTo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgIGtleT17aX1cbiAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHJvdW5kZWQtZnVsbCBiZy1bI0U4N0E1QV0vOFwiXG4gICAgICBzdHlsZT17e1xuICAgICAgICB3aWR0aDogNjAgKyBNYXRoLnJhbmRvbSgpICogMTgwLFxuICAgICAgICBoZWlnaHQ6IDYwICsgTWF0aC5yYW5kb20oKSAqIDE4MCxcbiAgICAgICAgbGVmdDogYCR7TWF0aC5yYW5kb20oKSAqIDkwfSVgLFxuICAgICAgICB0b3A6IGAke01hdGgucmFuZG9tKCkgKiA5MH0lYFxuICAgICAgfX1cbiAgICAgIGFuaW1hdGU9e3tcbiAgICAgICAgeTogWzAsIC0zMCAtIE1hdGgucmFuZG9tKCkgKiA0MCwgMF0sXG4gICAgICAgIHg6IFswLCAxNSArIE1hdGgucmFuZG9tKCkgKiAyMCwgMF0sXG4gICAgICAgIHNjYWxlOiBbMSwgMS4wNSArIE1hdGgucmFuZG9tKCkgKiAwLjEsIDFdLFxuICAgICAgICBvcGFjaXR5OiBbMC4zLCAwLjYsIDAuM11cbiAgICAgIH19XG4gICAgICB0cmFuc2l0aW9uPXt7XG4gICAgICAgIGR1cmF0aW9uOiA1ICsgTWF0aC5yYW5kb20oKSAqIDYsXG4gICAgICAgIHJlcGVhdDogSW5maW5pdHksXG4gICAgICAgIGVhc2U6IFwiZWFzZUluT3V0XCIsXG4gICAgICAgIGRlbGF5OiBNYXRoLnJhbmRvbSgpICogM1xuICAgICAgfX0gZGF0YS1hcnItaW5kZXg9e2l9IC8+XG5cbiAgICAgICl9XG4gICAgPC9kaXY+KTtcblxufVxuXG5mdW5jdGlvbiBEaXJlY3Rpb25hbEFycm93KHsgZGlyZWN0aW9uLCBsYWJlbCwgb25DbGljaywgaWNvbjogSWNvbiwgY29sb3IsIFwiZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWRcIjogX19kYXRhQ29sbGVjdGlvbkl0ZW1JZCB9KSB7XG4gIGNvbnN0IHBvc2l0aW9ucyA9IHtcbiAgICB1cDogXCJ0b3AtNiBsZWZ0LTEvMiAtdHJhbnNsYXRlLXgtMS8yIGZsZXgtY29sXCIsXG4gICAgZG93bjogXCJib3R0b20tNiBsZWZ0LTEvMiAtdHJhbnNsYXRlLXgtMS8yIGZsZXgtY29sXCIsXG4gICAgbGVmdDogXCJsZWZ0LTYgdG9wLTEvMiAtdHJhbnNsYXRlLXktMS8yIGZsZXgtcm93XCIsXG4gICAgcmlnaHQ6IFwicmlnaHQtNiB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzIgZmxleC1yb3ctcmV2ZXJzZVwiXG4gIH07XG5cbiAgY29uc3QgaXNIb3Jpem9udGFsID0gZGlyZWN0aW9uID09PSBcImxlZnRcIiB8fCBkaXJlY3Rpb24gPT09IFwicmlnaHRcIjtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Ib21lOjQ5OjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9e2BhYnNvbHV0ZSAke3Bvc2l0aW9uc1tkaXJlY3Rpb25dfSB6LTIwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0zYH0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e19fZGF0YUNvbGxlY3Rpb25JdGVtSWR9PlxuICAgICAgPG1vdGlvbi5idXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Ib21lOjUwOjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgIHdoaWxlSG92ZXI9e3sgc2NhbGU6IDEuMSB9fVxuICAgICAgd2hpbGVUYXA9e3sgc2NhbGU6IDAuOTUgfX1cbiAgICAgIGNsYXNzTmFtZT17YHctMTIgaC0xMiByb3VuZGVkLTJ4bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaGFkb3ctbGcgdHJhbnNpdGlvbi1hbGwgJHtjb2xvcn1gfT5cbiAgICAgICAgXG4gICAgICAgIDxJY29uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSG9tZTo1Njo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgPC9tb3Rpb24uYnV0dG9uPlxuICAgICAgPG1vdGlvbi5zcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSG9tZTo1ODo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgIGFuaW1hdGU9e2lzSG9yaXpvbnRhbCA/IHsgeDogWzAsIDUsIDBdIH0gOiB7IHk6IFswLCA1LCAwXSB9fVxuICAgICAgdHJhbnNpdGlvbj17eyByZXBlYXQ6IEluZmluaXR5LCBkdXJhdGlvbjogMi41LCBlYXNlOiBcImVhc2VJbk91dFwiIH19XG4gICAgICBjbGFzc05hbWU9e2B0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1mb3JlZ3JvdW5kLzcwIHdoaXRlc3BhY2Utbm93cmFwICR7aXNIb3Jpem9udGFsID8gXCJoaWRkZW4gc206YmxvY2tcIiA6IFwiXCJ9YH0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJsYWJlbFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtfX2RhdGFDb2xsZWN0aW9uSXRlbUlkfT5cbiAgICAgICAgXG4gICAgICAgIHtsYWJlbH1cbiAgICAgIDwvbW90aW9uLnNwYW4+XG4gICAgPC9kaXY+KTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKCkge1xuICBjb25zdCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XG4gIGNvbnN0IHRvdWNoU3RhcnQgPSB1c2VSZWYoeyB4OiAwLCB5OiAwIH0pO1xuICBjb25zdCBbc3dpcGVIaW50LCBzZXRTd2lwZUhpbnRdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFt1c2VyLCBzZXRVc2VyXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBkcmFnT2Zmc2V0ID0gdXNlUmVmKHsgeDogMCwgeTogMCB9KTtcbiAgY29uc3QgW2RyYWdTdHlsZSwgc2V0RHJhZ1N0eWxlXSA9IHVzZVN0YXRlKHt9KTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGJhc2U0NC5hdXRoLm1lKCkudGhlbihzZXRVc2VyKS5jYXRjaCgoKSA9PiB7fSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVQb2ludGVyU3RhcnQgPSB1c2VDYWxsYmFjaygoeCwgeSkgPT4ge1xuICAgIHRvdWNoU3RhcnQuY3VycmVudCA9IHsgeCwgeSB9O1xuICAgIGRyYWdPZmZzZXQuY3VycmVudCA9IHsgeDogMCwgeTogMCB9O1xuICAgIHNldERyYWdTdHlsZSh7fSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVQb2ludGVyTW92ZSA9IHVzZUNhbGxiYWNrKCh4LCB5KSA9PiB7XG4gICAgZHJhZ09mZnNldC5jdXJyZW50ID0geyB4OiB4IC0gdG91Y2hTdGFydC5jdXJyZW50LngsIHk6IHkgLSB0b3VjaFN0YXJ0LmN1cnJlbnQueSB9O1xuICAgIHNldERyYWdTdHlsZSh7XG4gICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoJHtkcmFnT2Zmc2V0LmN1cnJlbnQueH1weCwgJHtkcmFnT2Zmc2V0LmN1cnJlbnQueX1weClgLFxuICAgICAgdHJhbnNpdGlvbjogXCJub25lXCJcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJFbmQgPSB1c2VDYWxsYmFjaygoeCwgeSkgPT4ge1xuICAgIHNldERyYWdTdHlsZSh7IHRyYW5zZm9ybTogXCJ0cmFuc2xhdGUoMCwgMClcIiwgdHJhbnNpdGlvbjogXCJ0cmFuc2Zvcm0gMC4zcyBlYXNlLW91dFwiIH0pO1xuICAgIGNvbnN0IGR4ID0geCAtIHRvdWNoU3RhcnQuY3VycmVudC54O1xuICAgIGNvbnN0IGR5ID0geSAtIHRvdWNoU3RhcnQuY3VycmVudC55O1xuICAgIGNvbnN0IGFic0R4ID0gTWF0aC5hYnMoZHgpO1xuICAgIGNvbnN0IGFic0R5ID0gTWF0aC5hYnMoZHkpO1xuXG4gICAgaWYgKGFic0R4IDwgNDAgJiYgYWJzRHkgPCA0MCkgcmV0dXJuO1xuXG4gICAgaWYgKGFic0R4ID4gYWJzRHkpIHtcbiAgICAgIGlmIChkeCA8IC02MCkgbmF2aWdhdGUoXCIvaGFiaXRzXCIpO2Vsc2VcbiAgICAgIGlmIChkeCA+IDYwKSBuYXZpZ2F0ZShcIi90YXNrc1wiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGR5IDwgLTYwKSBuYXZpZ2F0ZShcIi9mb2N1c1wiKTtlbHNlXG4gICAgICBpZiAoZHkgPiA2MCkgbmF2aWdhdGUoXCIvY29taW5nLXNvb25cIik7XG4gICAgfVxuICB9LCBbbmF2aWdhdGVdKTtcblxuICBjb25zdCBoYW5kbGVUb3VjaFN0YXJ0ID0gdXNlQ2FsbGJhY2soKGUpID0+IHtcbiAgICBoYW5kbGVQb2ludGVyU3RhcnQoZS50b3VjaGVzWzBdLmNsaWVudFgsIGUudG91Y2hlc1swXS5jbGllbnRZKTtcbiAgfSwgW2hhbmRsZVBvaW50ZXJTdGFydF0pO1xuXG4gIGNvbnN0IGhhbmRsZVRvdWNoTW92ZSA9IHVzZUNhbGxiYWNrKChlKSA9PiB7XG4gICAgaGFuZGxlUG9pbnRlck1vdmUoZS50b3VjaGVzWzBdLmNsaWVudFgsIGUudG91Y2hlc1swXS5jbGllbnRZKTtcbiAgfSwgW2hhbmRsZVBvaW50ZXJNb3ZlXSk7XG5cbiAgY29uc3QgaGFuZGxlVG91Y2hFbmQgPSB1c2VDYWxsYmFjaygoZSkgPT4ge1xuICAgIGhhbmRsZVBvaW50ZXJFbmQoZS5jaGFuZ2VkVG91Y2hlc1swXT8uY2xpZW50WCB8fCB0b3VjaFN0YXJ0LmN1cnJlbnQueCwgZS5jaGFuZ2VkVG91Y2hlc1swXT8uY2xpZW50WSB8fCB0b3VjaFN0YXJ0LmN1cnJlbnQueSk7XG4gIH0sIFtoYW5kbGVQb2ludGVyRW5kXSk7XG5cbiAgY29uc3QgaGFuZGxlTW91c2VEb3duID0gdXNlQ2FsbGJhY2soKGUpID0+IHtcbiAgICBoYW5kbGVQb2ludGVyU3RhcnQoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xuICB9LCBbaGFuZGxlUG9pbnRlclN0YXJ0XSk7XG5cbiAgY29uc3QgaGFuZGxlTW91c2VNb3ZlID0gdXNlQ2FsbGJhY2soKGUpID0+IHtcbiAgICBpZiAoZS5idXR0b25zID09PSAxKSBoYW5kbGVQb2ludGVyTW92ZShlLmNsaWVudFgsIGUuY2xpZW50WSk7XG4gIH0sIFtoYW5kbGVQb2ludGVyTW92ZV0pO1xuXG4gIGNvbnN0IGhhbmRsZU1vdXNlVXAgPSB1c2VDYWxsYmFjaygoZSkgPT4ge1xuICAgIGhhbmRsZVBvaW50ZXJFbmQoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xuICB9LCBbaGFuZGxlUG9pbnRlckVuZF0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hvbWU6MTM4OjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgIGNsYXNzTmFtZT1cImgtc2NyZWVuIHctc2NyZWVuIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWNyZWFtIG92ZXJmbG93LWhpZGRlbiByZWxhdGl2ZSBzZWxlY3Qtbm9uZVwiXG4gICAgb25Ub3VjaFN0YXJ0PXtoYW5kbGVUb3VjaFN0YXJ0fVxuICAgIG9uVG91Y2hNb3ZlPXtoYW5kbGVUb3VjaE1vdmV9XG4gICAgb25Ub3VjaEVuZD17aGFuZGxlVG91Y2hFbmR9XG4gICAgb25Nb3VzZURvd249e2hhbmRsZU1vdXNlRG93bn1cbiAgICBvbk1vdXNlTW92ZT17aGFuZGxlTW91c2VNb3ZlfVxuICAgIG9uTW91c2VVcD17aGFuZGxlTW91c2VVcH0+XG4gICAgICBcbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Ib21lOjE0Nzo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgc3R5bGU9e2RyYWdTdHlsZX0gY2xhc3NOYW1lPVwiZmxleC0xIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHctZnVsbCBoLWZ1bGxcIj5cbiAgICAgIDxGbG9hdGluZ09yYnMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Ib21lOjE0ODo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIC8+XG5cbiAgICAgIHsvKiBEaXJlY3Rpb25hbCBhcnJvd3MgKi99XG4gICAgICA8RGlyZWN0aW9uYWxBcnJvdyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hvbWU6MTUxOjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICBkaXJlY3Rpb249XCJ1cFwiIGxhYmVsPVwiRXhwbG9yYXJcIiBpY29uPXtMYXlvdXRHcmlkfVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBuYXZpZ2F0ZShcIi9jb21pbmctc29vblwiKX1cbiAgICAgICAgY29sb3I9XCJiZy13aGl0ZSBib3JkZXIgYm9yZGVyLWJvcmRlciB0ZXh0LW11dGVkLWZvcmVncm91bmQgaG92ZXI6dGV4dC1mb3JlZ3JvdW5kIGhvdmVyOmJvcmRlci1mb3JlZ3JvdW5kLzIwXCIgLz5cbiAgICAgICAgXG4gICAgICA8RGlyZWN0aW9uYWxBcnJvdyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hvbWU6MTU2OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICBkaXJlY3Rpb249XCJkb3duXCIgbGFiZWw9XCJGb2N1c1BvbW9cIiBpY29uPXtUaW1lcn1cbiAgICAgICAgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoXCIvZm9jdXNcIil9XG4gICAgICAgIGNvbG9yPVwiYmctWyNFODdBNUFdIHRleHQtd2hpdGUgaG92ZXI6YmctWyNENDY5NEFdIHNoYWRvdy1bI0U4N0E1QV0vMzBcIiAvPlxuICAgICAgICBcbiAgICAgIDxEaXJlY3Rpb25hbEFycm93IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSG9tZToxNjE6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgIGRpcmVjdGlvbj1cImxlZnRcIiBsYWJlbD1cIlRhcmVmYXNcIiBpY29uPXtMaXN0VG9kb31cbiAgICAgICAgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoXCIvdGFza3NcIil9XG4gICAgICAgIGNvbG9yPVwiYmctd2hpdGUgYm9yZGVyIGJvcmRlci1ib3JkZXIgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGhvdmVyOnRleHQtZm9yZWdyb3VuZCBob3Zlcjpib3JkZXItZm9yZWdyb3VuZC8yMFwiIC8+XG4gICAgICAgIFxuICAgICAgPERpcmVjdGlvbmFsQXJyb3cgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Ib21lOjE2Njo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgZGlyZWN0aW9uPVwicmlnaHRcIiBsYWJlbD1cIkjDoWJpdG9zXCIgaWNvbj17SGVhcnR9XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKFwiL2hhYml0c1wiKX1cbiAgICAgICAgY29sb3I9XCJiZy13aGl0ZSBib3JkZXIgYm9yZGVyLWJvcmRlciB0ZXh0LW11dGVkLWZvcmVncm91bmQgaG92ZXI6dGV4dC1mb3JlZ3JvdW5kIGhvdmVyOmJvcmRlci1mb3JlZ3JvdW5kLzIwXCIgLz5cbiAgICAgICAgXG5cbiAgICAgIHsvKiBDZW50ZXIgbG9nbyAqL31cbiAgICAgIDxtb3Rpb24uZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSG9tZToxNzM6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgIGluaXRpYWw9e3sgc2NhbGU6IDAsIG9wYWNpdHk6IDAgfX1cbiAgICAgICAgYW5pbWF0ZT17eyBzY2FsZTogMSwgb3BhY2l0eTogMSB9fVxuICAgICAgICB0cmFuc2l0aW9uPXt7IGRlbGF5OiAwLjMsIHR5cGU6IFwic3ByaW5nXCIsIHN0aWZmbmVzczogMTAwLCBkYW1waW5nOiAxMiB9fVxuICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciB6LTEwXCI+XG4gICAgICAgICAgXG4gICAgICAgIDxtb3Rpb24uZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSG9tZToxNzk6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgYW5pbWF0ZT17eyB5OiBbMCwgLTgsIDBdIH19XG4gICAgICAgICAgdHJhbnNpdGlvbj17eyByZXBlYXQ6IEluZmluaXR5LCBkdXJhdGlvbjogMywgZWFzZTogXCJlYXNlSW5PdXRcIiB9fVxuICAgICAgICAgIGNsYXNzTmFtZT1cInctMzIgaC0zMiByb3VuZGVkLVs0MHB4XSBiZy1ncmFkaWVudC10by1iciBmcm9tLVsjRTg3QTVBXSB2aWEtWyNGMEEwODBdIHRvLVsjRjVDMEEwXSBzaGFkb3ctMnhsIHNoYWRvdy1bI0U4N0E1QV0vMzAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbWItNSByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICAgIFxuICAgICAgICAgIDxtb3Rpb24uZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSG9tZToxODQ6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy13aGl0ZS8yMFwiXG4gICAgICAgICAgICBhbmltYXRlPXt7IHJvdGF0ZTogWzAsIDM2MF0sIHNjYWxlOiBbMSwgMS41LCAxXSB9fVxuICAgICAgICAgICAgdHJhbnNpdGlvbj17eyByZXBlYXQ6IEluZmluaXR5LCBkdXJhdGlvbjogOCwgZWFzZTogXCJsaW5lYXJcIiB9fVxuICAgICAgICAgICAgc3R5bGU9e3sgYm9yZGVyUmFkaXVzOiBcIjQwJVwiLCB3aWR0aDogXCI1MCVcIiwgaGVpZ2h0OiBcIjUwJVwiLCB0b3A6IFwiLTIwJVwiLCBsZWZ0OiBcIi0yMCVcIiB9fSAvPlxuICAgICAgICAgICAgXG4gICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Ib21lOjE5MDoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LTZ4bCByZWxhdGl2ZSB6LTEwIGRyb3Atc2hhZG93LXNtXCI+8J+Nijwvc3Bhbj5cbiAgICAgICAgPC9tb3Rpb24uZGl2PlxuXG4gICAgICAgIDxtb3Rpb24uaDEgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Ib21lOjE5Mzo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHk6IDIwIH19XG4gICAgICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB5OiAwIH19XG4gICAgICAgICAgdHJhbnNpdGlvbj17eyBkZWxheTogMC42LCBkdXJhdGlvbjogMC42IH19XG4gICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC00eGwgZm9udC1leHRyYWJvbGQgdHJhY2tpbmctdGlnaHRcIj5cbiAgICAgICAgICAgIFxuICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSG9tZToxOTk6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLVsjRTg3QTVBXSB0by1bI0Q0Njk0QV0gYmctY2xpcC10ZXh0IHRleHQtdHJhbnNwYXJlbnRcIj5cbiAgICAgICAgICAgIEZvY3VzXG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSG9tZToyMDI6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1mb3JlZ3JvdW5kXCI+Rmxvdzwvc3Bhbj5cbiAgICAgICAgPC9tb3Rpb24uaDE+XG5cbiAgICAgICAgPG1vdGlvbi5wIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSG9tZToyMDU6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB5OiAxMCB9fVxuICAgICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgeTogMCB9fVxuICAgICAgICAgIHRyYW5zaXRpb249e3sgZGVsYXk6IDAuOCwgZHVyYXRpb246IDAuNSB9fVxuICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIG10LTEuNVwiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgUHJvZHV0aXZpZGFkZSBjb20gcml0bW9cbiAgICAgICAgPC9tb3Rpb24ucD5cbiAgICAgIDwvbW90aW9uLmRpdj5cblxuICAgICAgey8qIFN3aXBlIGhpbnRzICovfVxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hvbWU6MjE2OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMjggbGVmdC0xLzIgLXRyYW5zbGF0ZS14LTEvMiBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtOCB6LTEwXCI+XG4gICAgICAgIDxtb3Rpb24uc3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hvbWU6MjE3OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogWzAuNCwgMSwgMC40XSB9fVxuICAgICAgICAgIHRyYW5zaXRpb249e3sgcmVwZWF0OiBJbmZpbml0eSwgZHVyYXRpb246IDMgfX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LW11dGVkLWZvcmVncm91bmQvNjAgaGlkZGVuIHNtOmJsb2NrXCI+XG4gICAgICAgICAgICBcbiAgICAgICAgICDihpAgVGFyZWZhc1xuICAgICAgICA8L21vdGlvbi5zcGFuPlxuICAgICAgICA8bW90aW9uLnNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Ib21lOjIyNDo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IFswLjQsIDEsIDAuNF0gfX1cbiAgICAgICAgICB0cmFuc2l0aW9uPXt7IHJlcGVhdDogSW5maW5pdHksIGR1cmF0aW9uOiAzLCBkZWxheTogMC41IH19XG4gICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kLzYwXCI+XG4gICAgICAgICAgICBcbiAgICAgICAgICBEZXNsaXphIHBhcmEgbmF2ZWdhclxuICAgICAgICA8L21vdGlvbi5zcGFuPlxuICAgICAgICA8bW90aW9uLnNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Ib21lOjIzMTo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IFswLjQsIDEsIDAuNF0gfX1cbiAgICAgICAgICB0cmFuc2l0aW9uPXt7IHJlcGVhdDogSW5maW5pdHksIGR1cmF0aW9uOiAzLCBkZWxheTogMSB9fVxuICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtbXV0ZWQtZm9yZWdyb3VuZC82MCBoaWRkZW4gc206YmxvY2tcIj5cbiAgICAgICAgICAgIFxuICAgICAgICAgIEjDoWJpdG9zIOKGklxuICAgICAgICA8L21vdGlvbi5zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj4pO1xuXG59Il0sImZpbGUiOiIvYXBwL3NyYy9wYWdlcy9Ib21lLmpzeCJ9