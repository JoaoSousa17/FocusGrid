import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/FocusTimer.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/components/FocusTimer.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
import { motion } from "/node_modules/.vite/deps/framer-motion.js?v=fc940917";
export default function FocusTimer({ totalSeconds, remainingSeconds, isRunning, mode, "data-collection-item-id": __dataCollectionItemId }) {
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress = totalSeconds > 0 ? remainingSeconds / totalSeconds : 0;
  const strokeDashoffset = circumference * (1 - progress);
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const display = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const isPause = mode === "pause";
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/FocusTimer:16:4", "data-dynamic-content": "true", className: "relative inline-flex items-center justify-center", "data-collection-item-id": __dataCollectionItemId, children: [
    /* @__PURE__ */ jsxDEV("svg", { "data-source-location": "components/FocusTimer:17:6", "data-dynamic-content": "true", width: "280", height: "280", className: "-rotate-90", children: [
      /* @__PURE__ */ jsxDEV("circle", { "data-source-location": "components/FocusTimer:18:8", "data-dynamic-content": "true", cx: "140", cy: "140", r: radius, fill: "none", stroke: "#E8E0D8", strokeWidth: "6" }, void 0, false, {
        fileName: "/app/src/components/FocusTimer.jsx",
        lineNumber: 37,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(
        motion.circle,
        {
          "data-source-location": "components/FocusTimer:19:8",
          "data-dynamic-content": "true",
          cx: "140",
          cy: "140",
          r: radius,
          fill: "none",
          stroke: isPause ? "#7EB8A0" : "url(#focusGrad)",
          strokeWidth: "6",
          strokeLinecap: "round",
          strokeDasharray: circumference,
          animate: { strokeDashoffset },
          transition: { duration: 1, ease: "linear" }
        },
        void 0,
        false,
        {
          fileName: "/app/src/components/FocusTimer.jsx",
          lineNumber: 38,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("defs", { "data-source-location": "components/FocusTimer:27:8", "data-dynamic-content": "false", children: /* @__PURE__ */ jsxDEV("linearGradient", { "data-source-location": "components/FocusTimer:28:10", "data-dynamic-content": "false", id: "focusGrad", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        /* @__PURE__ */ jsxDEV("stop", { "data-source-location": "components/FocusTimer:29:12", "data-dynamic-content": "false", offset: "0%", stopColor: "#E87A5A" }, void 0, false, {
          fileName: "/app/src/components/FocusTimer.jsx",
          lineNumber: 48,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("stop", { "data-source-location": "components/FocusTimer:30:12", "data-dynamic-content": "false", offset: "100%", stopColor: "#F0A080" }, void 0, false, {
          fileName: "/app/src/components/FocusTimer.jsx",
          lineNumber: 49,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/FocusTimer.jsx",
        lineNumber: 47,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/src/components/FocusTimer.jsx",
        lineNumber: 46,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/FocusTimer.jsx",
      lineNumber: 36,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/FocusTimer:34:6", "data-dynamic-content": "true", className: "absolute inset-0 flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsxDEV(
        motion.span,
        {
          "data-source-location": "components/FocusTimer:35:8",
          "data-dynamic-content": "true",
          initial: { scale: 1.03, opacity: 0.6 },
          animate: { scale: 1, opacity: 1 },
          transition: { duration: 0.2 },
          className: "text-[3.2rem] font-bold text-[#5C544E] tabular-nums tracking-tight leading-none",
          "data-collection-item-field": "display",
          "data-collection-item-id": __dataCollectionItemId,
          children: display
        },
        display,
        false,
        {
          fileName: "/app/src/components/FocusTimer.jsx",
          lineNumber: 54,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/FocusTimer:44:8", "data-dynamic-content": "true", className: "text-xs text-muted-foreground mt-1.5 tracking-widest uppercase", children: isRunning ? isPause ? "Pausa..." : "Foco..." : "Pronto" }, void 0, false, {
        fileName: "/app/src/components/FocusTimer.jsx",
        lineNumber: 63,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/FocusTimer.jsx",
      lineNumber: 53,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/components/FocusTimer.jsx",
    lineNumber: 35,
    columnNumber: 5
  }, this);
}
_c = FocusTimer;
var _c;
$RefreshReg$(_c, "FocusTimer");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/components/FocusTimer.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/components/FocusTimer.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBaUJROzs7Ozs7Ozs7Ozs7Ozs7O0FBakJSLFNBQVNBLGNBQWM7QUFFdkIsd0JBQXdCQyxXQUFXLEVBQUVDLGNBQWNDLGtCQUFrQkMsV0FBV0MsTUFBTSwyQkFBMkJDLHVCQUF1QixHQUFHO0FBQ3pJLFFBQU1DLFNBQVM7QUFDZixRQUFNQyxnQkFBZ0IsSUFBSUMsS0FBS0MsS0FBS0g7QUFDcEMsUUFBTUksV0FBV1QsZUFBZSxJQUFJQyxtQkFBbUJELGVBQWU7QUFDdEUsUUFBTVUsbUJBQW1CSixpQkFBaUIsSUFBSUc7QUFFOUMsUUFBTUUsVUFBVUosS0FBS0ssTUFBTVgsbUJBQW1CLEVBQUU7QUFDaEQsUUFBTVksVUFBVVosbUJBQW1CO0FBQ25DLFFBQU1hLFVBQVUsR0FBR0MsT0FBT0osT0FBTyxFQUFFSyxTQUFTLEdBQUcsR0FBRyxDQUFDLElBQUlELE9BQU9GLE9BQU8sRUFBRUcsU0FBUyxHQUFHLEdBQUcsQ0FBQztBQUV2RixRQUFNQyxVQUFVZCxTQUFTO0FBRXpCLFNBQ0UsdUJBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFdBQVUsb0RBQW1ELDJCQUF5QkMsd0JBQ3ZLO0FBQUEsMkJBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLE9BQU0sT0FBTSxRQUFPLE9BQU0sV0FBVSxjQUNwSDtBQUFBLDZCQUFDLFlBQU8sd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxJQUFHLE9BQU0sSUFBRyxPQUFNLEdBQUdDLFFBQVEsTUFBSyxRQUFPLFFBQU8sV0FBVSxhQUFZLE9BQTVKO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBK0o7QUFBQSxNQUMvSjtBQUFBLFFBQUMsT0FBTztBQUFBLFFBQVA7QUFBQSxVQUFjLHdCQUFxQjtBQUFBLFVBQTZCLHdCQUFxQjtBQUFBLFVBQ3RGLElBQUc7QUFBQSxVQUFNLElBQUc7QUFBQSxVQUFNLEdBQUdBO0FBQUFBLFVBQVEsTUFBSztBQUFBLFVBQ2xDLFFBQVFZLFVBQVUsWUFBWTtBQUFBLFVBQzlCLGFBQVk7QUFBQSxVQUFJLGVBQWM7QUFBQSxVQUM5QixpQkFBaUJYO0FBQUFBLFVBQ2pCLFNBQVMsRUFBRUksaUJBQWlCO0FBQUEsVUFDNUIsWUFBWSxFQUFFUSxVQUFVLEdBQUdDLE1BQU0sU0FBUztBQUFBO0FBQUEsUUFOMUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BTTRDO0FBQUEsTUFFNUMsdUJBQUMsVUFBSyx3QkFBcUIsOEJBQTZCLHdCQUFxQixTQUMzRSxpQ0FBQyxvQkFBZSx3QkFBcUIsK0JBQThCLHdCQUFxQixTQUFRLElBQUcsYUFBWSxJQUFHLE1BQUssSUFBRyxNQUFLLElBQUcsUUFBTyxJQUFHLFFBQzFJO0FBQUEsK0JBQUMsVUFBSyx3QkFBcUIsK0JBQThCLHdCQUFxQixTQUFRLFFBQU8sTUFBSyxXQUFVLGFBQTVHO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBcUg7QUFBQSxRQUNySCx1QkFBQyxVQUFLLHdCQUFxQiwrQkFBOEIsd0JBQXFCLFNBQVEsUUFBTyxRQUFPLFdBQVUsYUFBOUc7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUF1SDtBQUFBLFdBRnpIO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFHQSxLQUpGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFLQTtBQUFBLFNBZkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQWdCQTtBQUFBLElBQ0EsdUJBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFdBQVUsOERBQzNGO0FBQUE7QUFBQSxRQUFDLE9BQU87QUFBQSxRQUFQO0FBQUEsVUFBWSx3QkFBcUI7QUFBQSxVQUE2Qix3QkFBcUI7QUFBQSxVQUVwRixTQUFTLEVBQUVDLE9BQU8sTUFBTUMsU0FBUyxJQUFJO0FBQUEsVUFDckMsU0FBUyxFQUFFRCxPQUFPLEdBQUdDLFNBQVMsRUFBRTtBQUFBLFVBQ2hDLFlBQVksRUFBRUgsVUFBVSxJQUFJO0FBQUEsVUFDNUIsV0FBVTtBQUFBLFVBQWtGLDhCQUEyQjtBQUFBLFVBQVUsMkJBQXlCZDtBQUFBQSxVQUV2SlU7QUFBQUE7QUFBQUEsUUFORUE7QUFBQUEsUUFETDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BUUE7QUFBQSxNQUNBLHVCQUFDLFVBQUssd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFVLGtFQUMzRlosc0JBQVllLFVBQVUsYUFBYSxZQUFZLFlBRGxEO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFFQTtBQUFBLFNBWkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQWFBO0FBQUEsT0EvQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQWdDQTtBQUVKO0FBQUNLLEtBL0N1QnZCO0FBQVUsSUFBQXVCO0FBQUEsYUFBQUEsSUFBQSIsIm5hbWVzIjpbIm1vdGlvbiIsIkZvY3VzVGltZXIiLCJ0b3RhbFNlY29uZHMiLCJyZW1haW5pbmdTZWNvbmRzIiwiaXNSdW5uaW5nIiwibW9kZSIsIl9fZGF0YUNvbGxlY3Rpb25JdGVtSWQiLCJyYWRpdXMiLCJjaXJjdW1mZXJlbmNlIiwiTWF0aCIsIlBJIiwicHJvZ3Jlc3MiLCJzdHJva2VEYXNob2Zmc2V0IiwibWludXRlcyIsImZsb29yIiwic2Vjb25kcyIsImRpc3BsYXkiLCJTdHJpbmciLCJwYWRTdGFydCIsImlzUGF1c2UiLCJkdXJhdGlvbiIsImVhc2UiLCJzY2FsZSIsIm9wYWNpdHkiLCJfYyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJGb2N1c1RpbWVyLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBtb3Rpb24gfSBmcm9tIFwiZnJhbWVyLW1vdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBGb2N1c1RpbWVyKHsgdG90YWxTZWNvbmRzLCByZW1haW5pbmdTZWNvbmRzLCBpc1J1bm5pbmcsIG1vZGUsIFwiZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWRcIjogX19kYXRhQ29sbGVjdGlvbkl0ZW1JZCB9KSB7XG4gIGNvbnN0IHJhZGl1cyA9IDEyMDtcbiAgY29uc3QgY2lyY3VtZmVyZW5jZSA9IDIgKiBNYXRoLlBJICogcmFkaXVzO1xuICBjb25zdCBwcm9ncmVzcyA9IHRvdGFsU2Vjb25kcyA+IDAgPyByZW1haW5pbmdTZWNvbmRzIC8gdG90YWxTZWNvbmRzIDogMDtcbiAgY29uc3Qgc3Ryb2tlRGFzaG9mZnNldCA9IGNpcmN1bWZlcmVuY2UgKiAoMSAtIHByb2dyZXNzKTtcblxuICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcihyZW1haW5pbmdTZWNvbmRzIC8gNjApO1xuICBjb25zdCBzZWNvbmRzID0gcmVtYWluaW5nU2Vjb25kcyAlIDYwO1xuICBjb25zdCBkaXNwbGF5ID0gYCR7U3RyaW5nKG1pbnV0ZXMpLnBhZFN0YXJ0KDIsIFwiMFwiKX06JHtTdHJpbmcoc2Vjb25kcykucGFkU3RhcnQoMiwgXCIwXCIpfWA7XG5cbiAgY29uc3QgaXNQYXVzZSA9IG1vZGUgPT09IFwicGF1c2VcIjtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL0ZvY3VzVGltZXI6MTY6NFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInJlbGF0aXZlIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtfX2RhdGFDb2xsZWN0aW9uSXRlbUlkfT5cbiAgICAgIDxzdmcgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL0ZvY3VzVGltZXI6MTc6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHdpZHRoPVwiMjgwXCIgaGVpZ2h0PVwiMjgwXCIgY2xhc3NOYW1lPVwiLXJvdGF0ZS05MFwiPlxuICAgICAgICA8Y2lyY2xlIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9Gb2N1c1RpbWVyOjE4OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjeD1cIjE0MFwiIGN5PVwiMTQwXCIgcj17cmFkaXVzfSBmaWxsPVwibm9uZVwiIHN0cm9rZT1cIiNFOEUwRDhcIiBzdHJva2VXaWR0aD1cIjZcIiAvPlxuICAgICAgICA8bW90aW9uLmNpcmNsZSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvRm9jdXNUaW1lcjoxOTo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgY3g9XCIxNDBcIiBjeT1cIjE0MFwiIHI9e3JhZGl1c30gZmlsbD1cIm5vbmVcIlxuICAgICAgICBzdHJva2U9e2lzUGF1c2UgPyBcIiM3RUI4QTBcIiA6IFwidXJsKCNmb2N1c0dyYWQpXCJ9XG4gICAgICAgIHN0cm9rZVdpZHRoPVwiNlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXG4gICAgICAgIHN0cm9rZURhc2hhcnJheT17Y2lyY3VtZmVyZW5jZX1cbiAgICAgICAgYW5pbWF0ZT17eyBzdHJva2VEYXNob2Zmc2V0IH19XG4gICAgICAgIHRyYW5zaXRpb249e3sgZHVyYXRpb246IDEsIGVhc2U6IFwibGluZWFyXCIgfX0gLz5cbiAgICAgICAgXG4gICAgICAgIDxkZWZzIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9Gb2N1c1RpbWVyOjI3OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCI+XG4gICAgICAgICAgPGxpbmVhckdyYWRpZW50IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9Gb2N1c1RpbWVyOjI4OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGlkPVwiZm9jdXNHcmFkXCIgeDE9XCIwJVwiIHkxPVwiMCVcIiB4Mj1cIjEwMCVcIiB5Mj1cIjEwMCVcIj5cbiAgICAgICAgICAgIDxzdG9wIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9Gb2N1c1RpbWVyOjI5OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIG9mZnNldD1cIjAlXCIgc3RvcENvbG9yPVwiI0U4N0E1QVwiIC8+XG4gICAgICAgICAgICA8c3RvcCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvRm9jdXNUaW1lcjozMDoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBvZmZzZXQ9XCIxMDAlXCIgc3RvcENvbG9yPVwiI0YwQTA4MFwiIC8+XG4gICAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgPC9kZWZzPlxuICAgICAgPC9zdmc+XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9Gb2N1c1RpbWVyOjM0OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgIDxtb3Rpb24uc3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvRm9jdXNUaW1lcjozNTo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAga2V5PXtkaXNwbGF5fVxuICAgICAgICBpbml0aWFsPXt7IHNjYWxlOiAxLjAzLCBvcGFjaXR5OiAwLjYgfX1cbiAgICAgICAgYW5pbWF0ZT17eyBzY2FsZTogMSwgb3BhY2l0eTogMSB9fVxuICAgICAgICB0cmFuc2l0aW9uPXt7IGR1cmF0aW9uOiAwLjIgfX1cbiAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1bMy4ycmVtXSBmb250LWJvbGQgdGV4dC1bIzVDNTQ0RV0gdGFidWxhci1udW1zIHRyYWNraW5nLXRpZ2h0IGxlYWRpbmctbm9uZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiZGlzcGxheVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtfX2RhdGFDb2xsZWN0aW9uSXRlbUlkfT5cbiAgICAgICAgICBcbiAgICAgICAgICB7ZGlzcGxheX1cbiAgICAgICAgPC9tb3Rpb24uc3Bhbj5cbiAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL0ZvY3VzVGltZXI6NDQ6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIG10LTEuNSB0cmFja2luZy13aWRlc3QgdXBwZXJjYXNlXCI+XG4gICAgICAgICAge2lzUnVubmluZyA/IGlzUGF1c2UgPyBcIlBhdXNhLi4uXCIgOiBcIkZvY28uLi5cIiA6IFwiUHJvbnRvXCJ9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2Pik7XG5cbn0iXSwiZmlsZSI6Ii9hcHAvc3JjL2NvbXBvbmVudHMvRm9jdXNUaW1lci5qc3gifQ==