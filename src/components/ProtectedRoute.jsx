import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/ProtectedRoute.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/components/ProtectedRoute.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=fc940917"; const useEffect = __vite__cjsImport3_react["useEffect"];
import { Outlet } from "/node_modules/.vite/deps/react-router-dom.js?v=8a08d97a";
import { useAuth } from "/src/lib/AuthContext.jsx";
import UserNotRegisteredError from "/src/components/UserNotRegisteredError.jsx";
const DefaultFallback = () => /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/ProtectedRoute:7:2", "data-dynamic-content": "false", className: "fixed inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/ProtectedRoute:8:4", "data-dynamic-content": "false", className: "w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" }, void 0, false, {
  fileName: "/app/src/components/ProtectedRoute.jsx",
  lineNumber: 27,
  columnNumber: 5
}, this) }, void 0, false, {
  fileName: "/app/src/components/ProtectedRoute.jsx",
  lineNumber: 26,
  columnNumber: 1
}, this);
_c = DefaultFallback;
export default function ProtectedRoute({ fallback = /* @__PURE__ */ jsxDEV(DefaultFallback, { "data-source-location": "components/ProtectedRoute:12:52", "data-dynamic-content": "false" }, void 0, false, {
  fileName: "/app/src/components/ProtectedRoute.jsx",
  lineNumber: 31,
  columnNumber: 53
}, this), unauthenticatedElement }) {
  _s();
  const { isAuthenticated, isLoadingAuth, authChecked, authError, checkUserAuth } = useAuth();
  useEffect(() => {
    if (!authChecked && !isLoadingAuth) {
      checkUserAuth();
    }
  }, [authChecked, isLoadingAuth, checkUserAuth]);
  if (isLoadingAuth || !authChecked) {
    return fallback;
  }
  if (authError) {
    if (authError.type === "user_not_registered") {
      return /* @__PURE__ */ jsxDEV(UserNotRegisteredError, { "data-source-location": "components/ProtectedRoute:27:13", "data-dynamic-content": "false" }, void 0, false, {
        fileName: "/app/src/components/ProtectedRoute.jsx",
        lineNumber: 46,
        columnNumber: 14
      }, this);
    }
    return unauthenticatedElement;
  }
  if (!isAuthenticated) {
    return unauthenticatedElement;
  }
  return /* @__PURE__ */ jsxDEV(Outlet, { "data-source-location": "components/ProtectedRoute:36:9", "data-dynamic-content": "false" }, void 0, false, {
    fileName: "/app/src/components/ProtectedRoute.jsx",
    lineNumber: 55,
    columnNumber: 10
  }, this);
}
_s(ProtectedRoute, "htsdj+VYheCQPT6PRlttCoI9OZQ=", false, function() {
  return [useAuth];
});
_c2 = ProtectedRoute;
var _c, _c2;
$RefreshReg$(_c, "DefaultFallback");
$RefreshReg$(_c2, "ProtectedRoute");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/components/ProtectedRoute.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/components/ProtectedRoute.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBT0k7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUEosU0FBU0EsaUJBQWlCO0FBQzFCLFNBQVNDLGNBQWM7QUFDdkIsU0FBU0MsZUFBZTtBQUN4QixPQUFPQyw0QkFBNEI7QUFFbkMsTUFBTUMsa0JBQWtCQSxNQUN4Qix1QkFBQyxTQUFJLHdCQUFxQixpQ0FBZ0Msd0JBQXFCLFNBQVEsV0FBVSxrREFDN0YsaUNBQUMsU0FBSSx3QkFBcUIsaUNBQWdDLHdCQUFxQixTQUFRLFdBQVUsb0ZBQWpHO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBa0wsS0FEdEw7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUVFO0FBQU9DLEtBSEhEO0FBTU4sd0JBQXdCRSxlQUFlLEVBQUVDLFdBQVcsdUJBQUMsbUJBQWdCLHdCQUFxQixtQ0FBa0Msd0JBQXFCLFdBQTdGO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBb0csR0FBS0MsdUJBQXVCLEdBQUc7QUFBQUMsS0FBQTtBQUNyTCxRQUFNLEVBQUVDLGlCQUFpQkMsZUFBZUMsYUFBYUMsV0FBV0MsY0FBYyxJQUFJWixRQUFRO0FBRTFGRixZQUFVLE1BQU07QUFDZCxRQUFJLENBQUNZLGVBQWUsQ0FBQ0QsZUFBZTtBQUNsQ0csb0JBQWM7QUFBQSxJQUNoQjtBQUFBLEVBQ0YsR0FBRyxDQUFDRixhQUFhRCxlQUFlRyxhQUFhLENBQUM7QUFFOUMsTUFBSUgsaUJBQWlCLENBQUNDLGFBQWE7QUFDakMsV0FBT0w7QUFBQUEsRUFDVDtBQUVBLE1BQUlNLFdBQVc7QUFDYixRQUFJQSxVQUFVRSxTQUFTLHVCQUF1QjtBQUM1QyxhQUFPLHVCQUFDLDBCQUF1Qix3QkFBcUIsbUNBQWtDLHdCQUFxQixXQUFwRztBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQTJHO0FBQUEsSUFDcEg7QUFDQSxXQUFPUDtBQUFBQSxFQUNUO0FBRUEsTUFBSSxDQUFDRSxpQkFBaUI7QUFDcEIsV0FBT0Y7QUFBQUEsRUFDVDtBQUVBLFNBQU8sdUJBQUMsVUFBTyx3QkFBcUIsa0NBQWlDLHdCQUFxQixXQUFuRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQTBGO0FBQ25HO0FBQUNDLEdBekJ1QkgsZ0JBQWM7QUFBQSxVQUM4Q0osT0FBTztBQUFBO0FBQUEsTUFEbkVJO0FBQWMsSUFBQUQsSUFBQVc7QUFBQSxhQUFBWCxJQUFBO0FBQUEsYUFBQVcsS0FBQSIsIm5hbWVzIjpbInVzZUVmZmVjdCIsIk91dGxldCIsInVzZUF1dGgiLCJVc2VyTm90UmVnaXN0ZXJlZEVycm9yIiwiRGVmYXVsdEZhbGxiYWNrIiwiX2MiLCJQcm90ZWN0ZWRSb3V0ZSIsImZhbGxiYWNrIiwidW5hdXRoZW50aWNhdGVkRWxlbWVudCIsIl9zIiwiaXNBdXRoZW50aWNhdGVkIiwiaXNMb2FkaW5nQXV0aCIsImF1dGhDaGVja2VkIiwiYXV0aEVycm9yIiwiY2hlY2tVc2VyQXV0aCIsInR5cGUiLCJfYzIiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiUHJvdGVjdGVkUm91dGUuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE91dGxldCB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IHsgdXNlQXV0aCB9IGZyb20gJ0AvbGliL0F1dGhDb250ZXh0JztcbmltcG9ydCBVc2VyTm90UmVnaXN0ZXJlZEVycm9yIGZyb20gJ0AvY29tcG9uZW50cy9Vc2VyTm90UmVnaXN0ZXJlZEVycm9yJztcblxuY29uc3QgRGVmYXVsdEZhbGxiYWNrID0gKCkgPT5cbjxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL1Byb3RlY3RlZFJvdXRlOjc6MlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvUHJvdGVjdGVkUm91dGU6ODo0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctOCBoLTggYm9yZGVyLTQgYm9yZGVyLXNsYXRlLTIwMCBib3JkZXItdC1zbGF0ZS04MDAgcm91bmRlZC1mdWxsIGFuaW1hdGUtc3BpblwiPjwvZGl2PlxuICA8L2Rpdj47XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUHJvdGVjdGVkUm91dGUoeyBmYWxsYmFjayA9IDxEZWZhdWx0RmFsbGJhY2sgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL1Byb3RlY3RlZFJvdXRlOjEyOjUyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIC8+LCB1bmF1dGhlbnRpY2F0ZWRFbGVtZW50IH0pIHtcbiAgY29uc3QgeyBpc0F1dGhlbnRpY2F0ZWQsIGlzTG9hZGluZ0F1dGgsIGF1dGhDaGVja2VkLCBhdXRoRXJyb3IsIGNoZWNrVXNlckF1dGggfSA9IHVzZUF1dGgoKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghYXV0aENoZWNrZWQgJiYgIWlzTG9hZGluZ0F1dGgpIHtcbiAgICAgIGNoZWNrVXNlckF1dGgoKTtcbiAgICB9XG4gIH0sIFthdXRoQ2hlY2tlZCwgaXNMb2FkaW5nQXV0aCwgY2hlY2tVc2VyQXV0aF0pO1xuXG4gIGlmIChpc0xvYWRpbmdBdXRoIHx8ICFhdXRoQ2hlY2tlZCkge1xuICAgIHJldHVybiBmYWxsYmFjaztcbiAgfVxuXG4gIGlmIChhdXRoRXJyb3IpIHtcbiAgICBpZiAoYXV0aEVycm9yLnR5cGUgPT09ICd1c2VyX25vdF9yZWdpc3RlcmVkJykge1xuICAgICAgcmV0dXJuIDxVc2VyTm90UmVnaXN0ZXJlZEVycm9yIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9Qcm90ZWN0ZWRSb3V0ZToyNzoxM1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiAvPjtcbiAgICB9XG4gICAgcmV0dXJuIHVuYXV0aGVudGljYXRlZEVsZW1lbnQ7XG4gIH1cblxuICBpZiAoIWlzQXV0aGVudGljYXRlZCkge1xuICAgIHJldHVybiB1bmF1dGhlbnRpY2F0ZWRFbGVtZW50O1xuICB9XG5cbiAgcmV0dXJuIDxPdXRsZXQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL1Byb3RlY3RlZFJvdXRlOjM2OjlcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgLz47XG59Il0sImZpbGUiOiIvYXBwL3NyYy9jb21wb25lbnRzL1Byb3RlY3RlZFJvdXRlLmpzeCJ9