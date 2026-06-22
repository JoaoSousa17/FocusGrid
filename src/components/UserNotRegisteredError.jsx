import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/UserNotRegisteredError.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/components/UserNotRegisteredError.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=fc940917"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react;
const UserNotRegisteredError = () => {
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/UserNotRegisteredError:5:4", "data-dynamic-content": "false", className: "flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-slate-50", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/UserNotRegisteredError:6:6", "data-dynamic-content": "false", className: "max-w-md w-full p-8 bg-white rounded-lg shadow-lg border border-slate-100", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/UserNotRegisteredError:7:8", "data-dynamic-content": "false", className: "text-center", children: [
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/UserNotRegisteredError:8:10", "data-dynamic-content": "false", className: "inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-orange-100", children: /* @__PURE__ */ jsxDEV("svg", { "data-source-location": "components/UserNotRegisteredError:9:12", "data-dynamic-content": "false", className: "w-8 h-8 text-orange-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDEV("path", { "data-source-location": "components/UserNotRegisteredError:10:14", "data-dynamic-content": "false", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }, void 0, false, {
      fileName: "/app/src/components/UserNotRegisteredError.jsx",
      lineNumber: 29,
      columnNumber: 15
    }, this) }, void 0, false, {
      fileName: "/app/src/components/UserNotRegisteredError.jsx",
      lineNumber: 28,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "/app/src/components/UserNotRegisteredError.jsx",
      lineNumber: 27,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV("h1", { "data-source-location": "components/UserNotRegisteredError:13:10", "data-dynamic-content": "false", className: "text-3xl font-bold text-slate-900 mb-4", children: "Access Restricted" }, void 0, false, {
      fileName: "/app/src/components/UserNotRegisteredError.jsx",
      lineNumber: 32,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV("p", { "data-source-location": "components/UserNotRegisteredError:14:10", "data-dynamic-content": "false", className: "text-slate-600 mb-8", children: "You are not registered to use this application. Please contact the app administrator to request access." }, void 0, false, {
      fileName: "/app/src/components/UserNotRegisteredError.jsx",
      lineNumber: 33,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/UserNotRegisteredError:17:10", "data-dynamic-content": "false", className: "p-4 bg-slate-50 rounded-md text-sm text-slate-600", children: [
      /* @__PURE__ */ jsxDEV("p", { "data-source-location": "components/UserNotRegisteredError:18:12", "data-dynamic-content": "false", children: "If you believe this is an error, you can:" }, void 0, false, {
        fileName: "/app/src/components/UserNotRegisteredError.jsx",
        lineNumber: 37,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("ul", { "data-source-location": "components/UserNotRegisteredError:19:12", "data-dynamic-content": "false", className: "list-disc list-inside mt-2 space-y-1", children: [
        /* @__PURE__ */ jsxDEV("li", { "data-source-location": "components/UserNotRegisteredError:20:14", "data-dynamic-content": "false", children: "Verify you are logged in with the correct account" }, void 0, false, {
          fileName: "/app/src/components/UserNotRegisteredError.jsx",
          lineNumber: 39,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("li", { "data-source-location": "components/UserNotRegisteredError:21:14", "data-dynamic-content": "false", children: "Contact the app administrator for access" }, void 0, false, {
          fileName: "/app/src/components/UserNotRegisteredError.jsx",
          lineNumber: 40,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("li", { "data-source-location": "components/UserNotRegisteredError:22:14", "data-dynamic-content": "false", children: "Try logging out and back in again" }, void 0, false, {
          fileName: "/app/src/components/UserNotRegisteredError.jsx",
          lineNumber: 41,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/UserNotRegisteredError.jsx",
        lineNumber: 38,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/UserNotRegisteredError.jsx",
      lineNumber: 36,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/components/UserNotRegisteredError.jsx",
    lineNumber: 26,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "/app/src/components/UserNotRegisteredError.jsx",
    lineNumber: 25,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/src/components/UserNotRegisteredError.jsx",
    lineNumber: 24,
    columnNumber: 5
  }, this);
};
_c = UserNotRegisteredError;
export default UserNotRegisteredError;
var _c;
$RefreshReg$(_c, "UserNotRegisteredError");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/components/UserNotRegisteredError.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/components/UserNotRegisteredError.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBU2M7Ozs7Ozs7Ozs7Ozs7Ozs7QUFUZCxPQUFPQSxXQUFXO0FBRWxCLE1BQU1DLHlCQUF5QkEsTUFBTTtBQUNuQyxTQUNFLHVCQUFDLFNBQUksd0JBQXFCLHlDQUF3Qyx3QkFBcUIsU0FBUSxXQUFVLGtHQUN2RyxpQ0FBQyxTQUFJLHdCQUFxQix5Q0FBd0Msd0JBQXFCLFNBQVEsV0FBVSw2RUFDdkcsaUNBQUMsU0FBSSx3QkFBcUIseUNBQXdDLHdCQUFxQixTQUFRLFdBQVUsZUFDdkc7QUFBQSwyQkFBQyxTQUFJLHdCQUFxQiwwQ0FBeUMsd0JBQXFCLFNBQVEsV0FBVSxxRkFDeEcsaUNBQUMsU0FBSSx3QkFBcUIsMENBQXlDLHdCQUFxQixTQUFRLFdBQVUsMkJBQTBCLE1BQUssUUFBTyxRQUFPLGdCQUFlLFNBQVEsYUFDNUssaUNBQUMsVUFBSyx3QkFBcUIsMkNBQTBDLHdCQUFxQixTQUFRLGVBQWMsU0FBUSxnQkFBZSxTQUFRLGFBQVksS0FBSSxHQUFFLDBJQUFqSztBQUFBO0FBQUE7QUFBQTtBQUFBLFdBQXVTLEtBRHpTO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FFQSxLQUhGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FJQTtBQUFBLElBQ0EsdUJBQUMsUUFBRyx3QkFBcUIsMkNBQTBDLHdCQUFxQixTQUFRLFdBQVUsMENBQXlDLGlDQUFuSjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBQW9LO0FBQUEsSUFDcEssdUJBQUMsT0FBRSx3QkFBcUIsMkNBQTBDLHdCQUFxQixTQUFRLFdBQVUsdUJBQXFCLHVIQUE5SDtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBRUE7QUFBQSxJQUNBLHVCQUFDLFNBQUksd0JBQXFCLDJDQUEwQyx3QkFBcUIsU0FBUSxXQUFVLHFEQUN6RztBQUFBLDZCQUFDLE9BQUUsd0JBQXFCLDJDQUEwQyx3QkFBcUIsU0FBUSx5REFBL0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUF3STtBQUFBLE1BQ3hJLHVCQUFDLFFBQUcsd0JBQXFCLDJDQUEwQyx3QkFBcUIsU0FBUSxXQUFVLHdDQUN4RztBQUFBLCtCQUFDLFFBQUcsd0JBQXFCLDJDQUEwQyx3QkFBcUIsU0FBUSxpRUFBaEc7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFpSjtBQUFBLFFBQ2pKLHVCQUFDLFFBQUcsd0JBQXFCLDJDQUEwQyx3QkFBcUIsU0FBUSx3REFBaEc7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUF3STtBQUFBLFFBQ3hJLHVCQUFDLFFBQUcsd0JBQXFCLDJDQUEwQyx3QkFBcUIsU0FBUSxpREFBaEc7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFpSTtBQUFBLFdBSG5JO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFJQTtBQUFBLFNBTkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQU9BO0FBQUEsT0FqQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQWtCQSxLQW5CRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBb0JBLEtBckJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FzQkE7QUFFSjtBQUFFQyxLQTFCSUQ7QUE0Qk4sZUFBZUE7QUFBdUIsSUFBQUM7QUFBQSxhQUFBQSxJQUFBIiwibmFtZXMiOlsiUmVhY3QiLCJVc2VyTm90UmVnaXN0ZXJlZEVycm9yIiwiX2MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiVXNlck5vdFJlZ2lzdGVyZWRFcnJvci5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgVXNlck5vdFJlZ2lzdGVyZWRFcnJvciA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9Vc2VyTm90UmVnaXN0ZXJlZEVycm9yOjU6NFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBtaW4taC1zY3JlZW4gYmctZ3JhZGllbnQtdG8tYiBmcm9tLXdoaXRlIHRvLXNsYXRlLTUwXCI+XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9Vc2VyTm90UmVnaXN0ZXJlZEVycm9yOjY6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJtYXgtdy1tZCB3LWZ1bGwgcC04IGJnLXdoaXRlIHJvdW5kZWQtbGcgc2hhZG93LWxnIGJvcmRlciBib3JkZXItc2xhdGUtMTAwXCI+XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL1VzZXJOb3RSZWdpc3RlcmVkRXJyb3I6Nzo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvVXNlck5vdFJlZ2lzdGVyZWRFcnJvcjo4OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB3LTE2IGgtMTYgbWItNiByb3VuZGVkLWZ1bGwgYmctb3JhbmdlLTEwMFwiPlxuICAgICAgICAgICAgPHN2ZyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvVXNlck5vdFJlZ2lzdGVyZWRFcnJvcjo5OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctOCBoLTggdGV4dC1vcmFuZ2UtNjAwXCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XG4gICAgICAgICAgICAgIDxwYXRoIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9Vc2VyTm90UmVnaXN0ZXJlZEVycm9yOjEwOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHJva2VXaWR0aD1cIjJcIiBkPVwiTTEyIDl2Mm0wIDRoLjAxbS02LjkzOCA0aDEzLjg1NmMxLjU0IDAgMi41MDItMS42NjcgMS43MzItM0wxMy43MzIgNGMtLjc3LTEuMzMzLTIuNjk0LTEuMzMzLTMuNDY0IDBMMy4zNCAxNmMtLjc3IDEuMzMzLjE5MiAzIDEuNzMyIDN6XCIgLz5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxoMSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvVXNlck5vdFJlZ2lzdGVyZWRFcnJvcjoxMzoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBmb250LWJvbGQgdGV4dC1zbGF0ZS05MDAgbWItNFwiPkFjY2VzcyBSZXN0cmljdGVkPC9oMT5cbiAgICAgICAgICA8cCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvVXNlck5vdFJlZ2lzdGVyZWRFcnJvcjoxNDoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTYwMCBtYi04XCI+XG4gICAgICAgICAgICBZb3UgYXJlIG5vdCByZWdpc3RlcmVkIHRvIHVzZSB0aGlzIGFwcGxpY2F0aW9uLiBQbGVhc2UgY29udGFjdCB0aGUgYXBwIGFkbWluaXN0cmF0b3IgdG8gcmVxdWVzdCBhY2Nlc3MuXG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL1VzZXJOb3RSZWdpc3RlcmVkRXJyb3I6MTc6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwicC00IGJnLXNsYXRlLTUwIHJvdW5kZWQtbWQgdGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPlxuICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL1VzZXJOb3RSZWdpc3RlcmVkRXJyb3I6MTg6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCI+SWYgeW91IGJlbGlldmUgdGhpcyBpcyBhbiBlcnJvciwgeW91IGNhbjo8L3A+XG4gICAgICAgICAgICA8dWwgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL1VzZXJOb3RSZWdpc3RlcmVkRXJyb3I6MTk6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwibGlzdC1kaXNjIGxpc3QtaW5zaWRlIG10LTIgc3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgIDxsaSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvVXNlck5vdFJlZ2lzdGVyZWRFcnJvcjoyMDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIj5WZXJpZnkgeW91IGFyZSBsb2dnZWQgaW4gd2l0aCB0aGUgY29ycmVjdCBhY2NvdW50PC9saT5cbiAgICAgICAgICAgICAgPGxpIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9Vc2VyTm90UmVnaXN0ZXJlZEVycm9yOjIxOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiPkNvbnRhY3QgdGhlIGFwcCBhZG1pbmlzdHJhdG9yIGZvciBhY2Nlc3M8L2xpPlxuICAgICAgICAgICAgICA8bGkgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL1VzZXJOb3RSZWdpc3RlcmVkRXJyb3I6MjI6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCI+VHJ5IGxvZ2dpbmcgb3V0IGFuZCBiYWNrIGluIGFnYWluPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgVXNlck5vdFJlZ2lzdGVyZWRFcnJvcjsiXSwiZmlsZSI6Ii9hcHAvc3JjL2NvbXBvbmVudHMvVXNlck5vdFJlZ2lzdGVyZWRFcnJvci5qc3gifQ==