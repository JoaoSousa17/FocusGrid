import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/App.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/App.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import { Toaster } from "/src/components/ui/toaster.jsx";
import { QueryClientProvider } from "/node_modules/.vite/deps/@tanstack_react-query.js?v=460512f4";
import { queryClientInstance } from "/src/lib/query-client.js";
import { BrowserRouter as Router, Route, Routes, Navigate } from "/node_modules/.vite/deps/react-router-dom.js?v=8a08d97a";
import PageNotFound from "/src/lib/PageNotFound.jsx";
import { AuthProvider, useAuth } from "/src/lib/AuthContext.jsx";
import UserNotRegisteredError from "/src/components/UserNotRegisteredError.jsx";
import ScrollToTop from "/src/components/ScrollToTop.jsx";
import ProtectedRoute from "/src/components/ProtectedRoute.jsx";
import { FocusTimerProvider } from "/src/context/FocusTimerContext.jsx";
import Login from "/src/pages/Login.jsx";
import Register from "/src/pages/Register.jsx";
import ForgotPassword from "/src/pages/ForgotPassword.jsx";
import ResetPassword from "/src/pages/ResetPassword.jsx";
import Home from "/src/pages/Home.jsx";
import FocusPomo from "/src/pages/FocusPomo.jsx";
import FocusSettings from "/src/pages/FocusSettings.jsx";
import FocusCalendar from "/src/pages/FocusCalendar.jsx";
import FocusAnalytics from "/src/pages/FocusAnalytics.jsx";
import TaskBoard from "/src/pages/TaskBoard.jsx";
import ComingSoon from "/src/pages/ComingSoon.jsx";
import Habits from "/src/pages/Habits.jsx";
import HabitsManage from "/src/pages/HabitsManage.jsx";
import HabitsAnalytics from "/src/pages/HabitsAnalytics.jsx";
import HabitsRewards from "/src/pages/HabitsRewards.jsx";
import Deadlines from "/src/pages/Deadlines.jsx";
import MeetingAI from "/src/pages/MeetingAI.jsx";
import ExportDocs from "/src/pages/ExportDocs.jsx";
const AuthenticatedApp = () => {
  _s();
  const { isLoadingAuth, isLoadingPublicSettings, authError } = useAuth();
  if (isLoadingPublicSettings || isLoadingAuth) {
    return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "App:36:6", "data-dynamic-content": "false", className: "fixed inset-0 flex items-center justify-center bg-cream", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "App:37:8", "data-dynamic-content": "false", className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "App:38:10", "data-dynamic-content": "false", className: "w-14 h-14 rounded-[20px] bg-[#E87A5A] shadow-lg shadow-[#E87A5A]/25 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("span", { "data-source-location": "App:39:12", "data-dynamic-content": "false", className: "text-3xl", children: "🍊" }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 58,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 57,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "App:41:10", "data-dynamic-content": "false", className: "w-6 h-6 border-[3px] border-[#E87A5A]/20 border-t-[#E87A5A] rounded-full animate-spin" }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 60,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/App.jsx",
      lineNumber: 56,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/src/App.jsx",
      lineNumber: 55,
      columnNumber: 7
    }, this);
  }
  if (authError) {
    if (authError.type === "user_not_registered") {
      return /* @__PURE__ */ jsxDEV(UserNotRegisteredError, { "data-source-location": "App:49:13", "data-dynamic-content": "false" }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 68,
        columnNumber: 14
      }, this);
    } else if (authError.type === "auth_required") {
      return /* @__PURE__ */ jsxDEV(Navigate, { "data-source-location": "App:51:13", "data-dynamic-content": "false", to: "/login", replace: true }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 70,
        columnNumber: 14
      }, this);
    }
  }
  return /* @__PURE__ */ jsxDEV(FocusTimerProvider, { "data-source-location": "App:56:4", "data-dynamic-content": "true", children: /* @__PURE__ */ jsxDEV(Routes, { "data-source-location": "App:57:4", "data-dynamic-content": "true", children: [
    /* @__PURE__ */ jsxDEV(Route, { "data-source-location": "App:58:6", "data-dynamic-content": "true", path: "/login", element: /* @__PURE__ */ jsxDEV(Login, { "data-source-location": "App:58:36", "data-dynamic-content": "false" }, void 0, false, {
      fileName: "/app/src/App.jsx",
      lineNumber: 77,
      columnNumber: 97
    }, this) }, void 0, false, {
      fileName: "/app/src/App.jsx",
      lineNumber: 77,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { "data-source-location": "App:59:6", "data-dynamic-content": "true", path: "/register", element: /* @__PURE__ */ jsxDEV(Register, { "data-source-location": "App:59:39", "data-dynamic-content": "false" }, void 0, false, {
      fileName: "/app/src/App.jsx",
      lineNumber: 78,
      columnNumber: 100
    }, this) }, void 0, false, {
      fileName: "/app/src/App.jsx",
      lineNumber: 78,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { "data-source-location": "App:60:6", "data-dynamic-content": "true", path: "/forgot-password", element: /* @__PURE__ */ jsxDEV(ForgotPassword, { "data-source-location": "App:60:46", "data-dynamic-content": "false" }, void 0, false, {
      fileName: "/app/src/App.jsx",
      lineNumber: 79,
      columnNumber: 107
    }, this) }, void 0, false, {
      fileName: "/app/src/App.jsx",
      lineNumber: 79,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { "data-source-location": "App:61:6", "data-dynamic-content": "true", path: "/reset-password", element: /* @__PURE__ */ jsxDEV(ResetPassword, { "data-source-location": "App:61:45", "data-dynamic-content": "false" }, void 0, false, {
      fileName: "/app/src/App.jsx",
      lineNumber: 80,
      columnNumber: 106
    }, this) }, void 0, false, {
      fileName: "/app/src/App.jsx",
      lineNumber: 80,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { "data-source-location": "App:62:6", "data-dynamic-content": "true", element: /* @__PURE__ */ jsxDEV(ProtectedRoute, { "data-source-location": "App:62:22", "data-dynamic-content": "true", unauthenticatedElement: /* @__PURE__ */ jsxDEV(Navigate, { "data-source-location": "App:62:62", "data-dynamic-content": "false", to: "/login", replace: true }, void 0, false, {
      fileName: "/app/src/App.jsx",
      lineNumber: 81,
      columnNumber: 184
    }, this) }, void 0, false, {
      fileName: "/app/src/App.jsx",
      lineNumber: 81,
      columnNumber: 83
    }, this), children: [
      /* @__PURE__ */ jsxDEV(Route, { "data-source-location": "App:63:8", "data-dynamic-content": "true", path: "/", element: /* @__PURE__ */ jsxDEV(Home, { "data-source-location": "App:63:33", "data-dynamic-content": "false" }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 82,
        columnNumber: 94
      }, this) }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 82,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(Route, { "data-source-location": "App:64:8", "data-dynamic-content": "true", path: "/focus", element: /* @__PURE__ */ jsxDEV(FocusPomo, { "data-source-location": "App:64:38", "data-dynamic-content": "false" }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 83,
        columnNumber: 99
      }, this) }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 83,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(Route, { "data-source-location": "App:65:8", "data-dynamic-content": "true", path: "/focus/settings", element: /* @__PURE__ */ jsxDEV(FocusSettings, { "data-source-location": "App:65:47", "data-dynamic-content": "false" }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 84,
        columnNumber: 108
      }, this) }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 84,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(Route, { "data-source-location": "App:66:8", "data-dynamic-content": "true", path: "/focus/calendar", element: /* @__PURE__ */ jsxDEV(FocusCalendar, { "data-source-location": "App:66:47", "data-dynamic-content": "false" }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 85,
        columnNumber: 108
      }, this) }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 85,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(Route, { "data-source-location": "App:67:8", "data-dynamic-content": "true", path: "/focus/analytics", element: /* @__PURE__ */ jsxDEV(FocusAnalytics, { "data-source-location": "App:67:48", "data-dynamic-content": "false" }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 86,
        columnNumber: 109
      }, this) }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 86,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(Route, { "data-source-location": "App:68:8", "data-dynamic-content": "true", path: "/tasks", element: /* @__PURE__ */ jsxDEV(TaskBoard, { "data-source-location": "App:68:38", "data-dynamic-content": "false" }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 87,
        columnNumber: 99
      }, this) }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 87,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(Route, { "data-source-location": "App:69:8", "data-dynamic-content": "true", path: "/habits", element: /* @__PURE__ */ jsxDEV(Habits, { "data-source-location": "App:69:39", "data-dynamic-content": "false" }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 88,
        columnNumber: 100
      }, this) }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 88,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(Route, { "data-source-location": "App:70:8", "data-dynamic-content": "true", path: "/habits/manage", element: /* @__PURE__ */ jsxDEV(HabitsManage, { "data-source-location": "App:70:46", "data-dynamic-content": "false" }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 89,
        columnNumber: 107
      }, this) }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 89,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(Route, { "data-source-location": "App:71:8", "data-dynamic-content": "true", path: "/habits/analytics", element: /* @__PURE__ */ jsxDEV(HabitsAnalytics, { "data-source-location": "App:71:49", "data-dynamic-content": "false" }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 90,
        columnNumber: 110
      }, this) }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 90,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(Route, { "data-source-location": "App:72:8", "data-dynamic-content": "true", path: "/habits/rewards", element: /* @__PURE__ */ jsxDEV(HabitsRewards, { "data-source-location": "App:72:47", "data-dynamic-content": "false" }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 91,
        columnNumber: 108
      }, this) }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 91,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(Route, { "data-source-location": "App:73:8", "data-dynamic-content": "true", path: "/coming-soon", element: /* @__PURE__ */ jsxDEV(ComingSoon, { "data-source-location": "App:73:44", "data-dynamic-content": "false" }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 92,
        columnNumber: 105
      }, this) }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 92,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(Route, { "data-source-location": "App:74:8", "data-dynamic-content": "true", path: "/deadlines", element: /* @__PURE__ */ jsxDEV(Deadlines, { "data-source-location": "App:74:42", "data-dynamic-content": "false" }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 93,
        columnNumber: 103
      }, this) }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 93,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(Route, { "data-source-location": "App:75:8", "data-dynamic-content": "true", path: "/meeting-ai", element: /* @__PURE__ */ jsxDEV(MeetingAI, { "data-source-location": "App:75:43", "data-dynamic-content": "false" }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 94,
        columnNumber: 104
      }, this) }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 94,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(Route, { "data-source-location": "App:76:8", "data-dynamic-content": "true", path: "/export", element: /* @__PURE__ */ jsxDEV(ExportDocs, { "data-source-location": "App:76:39", "data-dynamic-content": "false" }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 95,
        columnNumber: 100
      }, this) }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 95,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/App.jsx",
      lineNumber: 81,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { "data-source-location": "App:78:6", "data-dynamic-content": "true", path: "*", element: /* @__PURE__ */ jsxDEV(PageNotFound, { "data-source-location": "App:78:31", "data-dynamic-content": "false" }, void 0, false, {
      fileName: "/app/src/App.jsx",
      lineNumber: 97,
      columnNumber: 92
    }, this) }, void 0, false, {
      fileName: "/app/src/App.jsx",
      lineNumber: 97,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/App.jsx",
    lineNumber: 76,
    columnNumber: 5
  }, this) }, void 0, false, {
    fileName: "/app/src/App.jsx",
    lineNumber: 75,
    columnNumber: 5
  }, this);
};
_s(AuthenticatedApp, "erwuBDNJdaEA3o/PCq9Qm64uUPg=", false, function() {
  return [useAuth];
});
_c = AuthenticatedApp;
function App() {
  return /* @__PURE__ */ jsxDEV(AuthProvider, { "data-source-location": "App:86:4", "data-dynamic-content": "true", children: /* @__PURE__ */ jsxDEV(QueryClientProvider, { "data-source-location": "App:87:6", "data-dynamic-content": "true", client: queryClientInstance, children: [
    /* @__PURE__ */ jsxDEV(Router, { "data-source-location": "App:88:8", "data-dynamic-content": "false", children: [
      /* @__PURE__ */ jsxDEV(ScrollToTop, { "data-source-location": "App:89:10", "data-dynamic-content": "false" }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 108,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(AuthenticatedApp, { "data-source-location": "App:90:10", "data-dynamic-content": "false" }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 109,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/App.jsx",
      lineNumber: 107,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV(Toaster, { "data-source-location": "App:92:8", "data-dynamic-content": "false" }, void 0, false, {
      fileName: "/app/src/App.jsx",
      lineNumber: 111,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/App.jsx",
    lineNumber: 106,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/src/App.jsx",
    lineNumber: 105,
    columnNumber: 5
  }, this);
}
_c2 = App;
export default App;
var _c, _c2;
$RefreshReg$(_c, "AuthenticatedApp");
$RefreshReg$(_c2, "App");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/App.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/App.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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dFByb3ZpZGVyIiwicXVlcnlDbGllbnRJbnN0YW5jZSIsIkJyb3dzZXJSb3V0ZXIiLCJSb3V0ZXIiLCJSb3V0ZSIsIlJvdXRlcyIsIk5hdmlnYXRlIiwiUGFnZU5vdEZvdW5kIiwiQXV0aFByb3ZpZGVyIiwidXNlQXV0aCIsIlVzZXJOb3RSZWdpc3RlcmVkRXJyb3IiLCJTY3JvbGxUb1RvcCIsIlByb3RlY3RlZFJvdXRlIiwiRm9jdXNUaW1lclByb3ZpZGVyIiwiTG9naW4iLCJSZWdpc3RlciIsIkZvcmdvdFBhc3N3b3JkIiwiUmVzZXRQYXNzd29yZCIsIkhvbWUiLCJGb2N1c1BvbW8iLCJGb2N1c1NldHRpbmdzIiwiRm9jdXNDYWxlbmRhciIsIkZvY3VzQW5hbHl0aWNzIiwiVGFza0JvYXJkIiwiQ29taW5nU29vbiIsIkhhYml0cyIsIkhhYml0c01hbmFnZSIsIkhhYml0c0FuYWx5dGljcyIsIkhhYml0c1Jld2FyZHMiLCJEZWFkbGluZXMiLCJNZWV0aW5nQUkiLCJFeHBvcnREb2NzIiwiQXV0aGVudGljYXRlZEFwcCIsIl9zIiwiaXNMb2FkaW5nQXV0aCIsImlzTG9hZGluZ1B1YmxpY1NldHRpbmdzIiwiYXV0aEVycm9yIiwidHlwZSIsIkFwcCIsIl9jMiIsIl9jIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIkFwcC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVG9hc3RlciB9IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvdG9hc3RlclwiO1xuaW1wb3J0IHsgUXVlcnlDbGllbnRQcm92aWRlciB9IGZyb20gJ0B0YW5zdGFjay9yZWFjdC1xdWVyeSc7XG5pbXBvcnQgeyBxdWVyeUNsaWVudEluc3RhbmNlIH0gZnJvbSAnQC9saWIvcXVlcnktY2xpZW50JztcbmltcG9ydCB7IEJyb3dzZXJSb3V0ZXIgYXMgUm91dGVyLCBSb3V0ZSwgUm91dGVzLCBOYXZpZ2F0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IFBhZ2VOb3RGb3VuZCBmcm9tICcuL2xpYi9QYWdlTm90Rm91bmQnO1xuaW1wb3J0IHsgQXV0aFByb3ZpZGVyLCB1c2VBdXRoIH0gZnJvbSAnQC9saWIvQXV0aENvbnRleHQnO1xuaW1wb3J0IFVzZXJOb3RSZWdpc3RlcmVkRXJyb3IgZnJvbSAnQC9jb21wb25lbnRzL1VzZXJOb3RSZWdpc3RlcmVkRXJyb3InO1xuaW1wb3J0IFNjcm9sbFRvVG9wIGZyb20gJy4vY29tcG9uZW50cy9TY3JvbGxUb1RvcCc7XG5pbXBvcnQgUHJvdGVjdGVkUm91dGUgZnJvbSAnQC9jb21wb25lbnRzL1Byb3RlY3RlZFJvdXRlJztcbmltcG9ydCB7IEZvY3VzVGltZXJQcm92aWRlciB9IGZyb20gJ0AvY29udGV4dC9Gb2N1c1RpbWVyQ29udGV4dCc7XG4vLyBBZGQgcGFnZSBpbXBvcnRzIGhlcmVcbmltcG9ydCBMb2dpbiBmcm9tICdAL3BhZ2VzL0xvZ2luJztcbmltcG9ydCBSZWdpc3RlciBmcm9tICdAL3BhZ2VzL1JlZ2lzdGVyJztcbmltcG9ydCBGb3Jnb3RQYXNzd29yZCBmcm9tICdAL3BhZ2VzL0ZvcmdvdFBhc3N3b3JkJztcbmltcG9ydCBSZXNldFBhc3N3b3JkIGZyb20gJ0AvcGFnZXMvUmVzZXRQYXNzd29yZCc7XG5pbXBvcnQgSG9tZSBmcm9tICdAL3BhZ2VzL0hvbWUnO1xuaW1wb3J0IEZvY3VzUG9tbyBmcm9tICdAL3BhZ2VzL0ZvY3VzUG9tbyc7XG5pbXBvcnQgRm9jdXNTZXR0aW5ncyBmcm9tICdAL3BhZ2VzL0ZvY3VzU2V0dGluZ3MnO1xuaW1wb3J0IEZvY3VzQ2FsZW5kYXIgZnJvbSAnQC9wYWdlcy9Gb2N1c0NhbGVuZGFyJztcbmltcG9ydCBGb2N1c0FuYWx5dGljcyBmcm9tICdAL3BhZ2VzL0ZvY3VzQW5hbHl0aWNzJztcbmltcG9ydCBUYXNrQm9hcmQgZnJvbSAnQC9wYWdlcy9UYXNrQm9hcmQnO1xuaW1wb3J0IENvbWluZ1Nvb24gZnJvbSAnQC9wYWdlcy9Db21pbmdTb29uJztcbmltcG9ydCBIYWJpdHMgZnJvbSAnQC9wYWdlcy9IYWJpdHMnO1xuaW1wb3J0IEhhYml0c01hbmFnZSBmcm9tICdAL3BhZ2VzL0hhYml0c01hbmFnZSc7XG5pbXBvcnQgSGFiaXRzQW5hbHl0aWNzIGZyb20gJ0AvcGFnZXMvSGFiaXRzQW5hbHl0aWNzJztcbmltcG9ydCBIYWJpdHNSZXdhcmRzIGZyb20gJ0AvcGFnZXMvSGFiaXRzUmV3YXJkcyc7XG5pbXBvcnQgRGVhZGxpbmVzIGZyb20gJ0AvcGFnZXMvRGVhZGxpbmVzJztcbmltcG9ydCBNZWV0aW5nQUkgZnJvbSAnQC9wYWdlcy9NZWV0aW5nQUknO1xuaW1wb3J0IEV4cG9ydERvY3MgZnJvbSAnQC9wYWdlcy9FeHBvcnREb2NzJztcblxuY29uc3QgQXV0aGVudGljYXRlZEFwcCA9ICgpID0+IHtcbiAgY29uc3QgeyBpc0xvYWRpbmdBdXRoLCBpc0xvYWRpbmdQdWJsaWNTZXR0aW5ncywgYXV0aEVycm9yIH0gPSB1c2VBdXRoKCk7XG5cbiAgaWYgKGlzTG9hZGluZ1B1YmxpY1NldHRpbmdzIHx8IGlzTG9hZGluZ0F1dGgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIkFwcDozNjo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctY3JlYW1cIj5cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIkFwcDozNzo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGdhcC00XCI+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIkFwcDozODoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTE0IGgtMTQgcm91bmRlZC1bMjBweF0gYmctWyNFODdBNUFdIHNoYWRvdy1sZyBzaGFkb3ctWyNFODdBNUFdLzI1IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIkFwcDozOToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LTN4bFwiPvCfjYo8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIkFwcDo0MToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTYgaC02IGJvcmRlci1bM3B4XSBib3JkZXItWyNFODdBNUFdLzIwIGJvcmRlci10LVsjRTg3QTVBXSByb3VuZGVkLWZ1bGwgYW5pbWF0ZS1zcGluXCIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj4pO1xuXG4gIH1cblxuICBpZiAoYXV0aEVycm9yKSB7XG4gICAgaWYgKGF1dGhFcnJvci50eXBlID09PSAndXNlcl9ub3RfcmVnaXN0ZXJlZCcpIHtcbiAgICAgIHJldHVybiA8VXNlck5vdFJlZ2lzdGVyZWRFcnJvciBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIkFwcDo0OToxM1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiAvPjtcbiAgICB9IGVsc2UgaWYgKGF1dGhFcnJvci50eXBlID09PSAnYXV0aF9yZXF1aXJlZCcpIHtcbiAgICAgIHJldHVybiA8TmF2aWdhdGUgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6NTE6MTNcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgdG89XCIvbG9naW5cIiByZXBsYWNlIC8+O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPEZvY3VzVGltZXJQcm92aWRlciBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIkFwcDo1Njo0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgPFJvdXRlcyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIkFwcDo1Nzo0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICA8Um91dGUgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6NTg6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHBhdGg9XCIvbG9naW5cIiBlbGVtZW50PXs8TG9naW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6NTg6MzZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgLz59IC8+XG4gICAgICA8Um91dGUgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6NTk6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHBhdGg9XCIvcmVnaXN0ZXJcIiBlbGVtZW50PXs8UmVnaXN0ZXIgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6NTk6MzlcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgLz59IC8+XG4gICAgICA8Um91dGUgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6NjA6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHBhdGg9XCIvZm9yZ290LXBhc3N3b3JkXCIgZWxlbWVudD17PEZvcmdvdFBhc3N3b3JkIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiQXBwOjYwOjQ2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIC8+fSAvPlxuICAgICAgPFJvdXRlIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiQXBwOjYxOjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBwYXRoPVwiL3Jlc2V0LXBhc3N3b3JkXCIgZWxlbWVudD17PFJlc2V0UGFzc3dvcmQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6NjE6NDVcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgLz59IC8+XG4gICAgICA8Um91dGUgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6NjI6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGVsZW1lbnQ9ezxQcm90ZWN0ZWRSb3V0ZSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIkFwcDo2MjoyMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHVuYXV0aGVudGljYXRlZEVsZW1lbnQ9ezxOYXZpZ2F0ZSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIkFwcDo2Mjo2MlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiB0bz1cIi9sb2dpblwiIHJlcGxhY2UgLz59IC8+fT5cbiAgICAgICAgPFJvdXRlIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiQXBwOjYzOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBwYXRoPVwiL1wiIGVsZW1lbnQ9ezxIb21lIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiQXBwOjYzOjMzXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIC8+fSAvPlxuICAgICAgICA8Um91dGUgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6NjQ6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHBhdGg9XCIvZm9jdXNcIiBlbGVtZW50PXs8Rm9jdXNQb21vIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiQXBwOjY0OjM4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIC8+fSAvPlxuICAgICAgICA8Um91dGUgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6NjU6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHBhdGg9XCIvZm9jdXMvc2V0dGluZ3NcIiBlbGVtZW50PXs8Rm9jdXNTZXR0aW5ncyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIkFwcDo2NTo0N1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiAvPn0gLz5cbiAgICAgICAgPFJvdXRlIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiQXBwOjY2OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBwYXRoPVwiL2ZvY3VzL2NhbGVuZGFyXCIgZWxlbWVudD17PEZvY3VzQ2FsZW5kYXIgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6NjY6NDdcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgLz59IC8+XG4gICAgICAgIDxSb3V0ZSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIkFwcDo2Nzo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgcGF0aD1cIi9mb2N1cy9hbmFseXRpY3NcIiBlbGVtZW50PXs8Rm9jdXNBbmFseXRpY3MgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6Njc6NDhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgLz59IC8+XG4gICAgICAgIDxSb3V0ZSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIkFwcDo2ODo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgcGF0aD1cIi90YXNrc1wiIGVsZW1lbnQ9ezxUYXNrQm9hcmQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6Njg6MzhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgLz59IC8+XG4gICAgICAgIDxSb3V0ZSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIkFwcDo2OTo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgcGF0aD1cIi9oYWJpdHNcIiBlbGVtZW50PXs8SGFiaXRzIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiQXBwOjY5OjM5XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIC8+fSAvPlxuICAgICAgICA8Um91dGUgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6NzA6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHBhdGg9XCIvaGFiaXRzL21hbmFnZVwiIGVsZW1lbnQ9ezxIYWJpdHNNYW5hZ2UgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6NzA6NDZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgLz59IC8+XG4gICAgICAgIDxSb3V0ZSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIkFwcDo3MTo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgcGF0aD1cIi9oYWJpdHMvYW5hbHl0aWNzXCIgZWxlbWVudD17PEhhYml0c0FuYWx5dGljcyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIkFwcDo3MTo0OVwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiAvPn0gLz5cbiAgICAgICAgPFJvdXRlIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiQXBwOjcyOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBwYXRoPVwiL2hhYml0cy9yZXdhcmRzXCIgZWxlbWVudD17PEhhYml0c1Jld2FyZHMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6NzI6NDdcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgLz59IC8+XG4gICAgICAgIDxSb3V0ZSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIkFwcDo3Mzo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgcGF0aD1cIi9jb21pbmctc29vblwiIGVsZW1lbnQ9ezxDb21pbmdTb29uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiQXBwOjczOjQ0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIC8+fSAvPlxuICAgICAgICA8Um91dGUgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6NzQ6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHBhdGg9XCIvZGVhZGxpbmVzXCIgZWxlbWVudD17PERlYWRsaW5lcyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIkFwcDo3NDo0MlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiAvPn0gLz5cbiAgICAgICAgPFJvdXRlIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiQXBwOjc1OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBwYXRoPVwiL21lZXRpbmctYWlcIiBlbGVtZW50PXs8TWVldGluZ0FJIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiQXBwOjc1OjQzXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIC8+fSAvPlxuICAgICAgICA8Um91dGUgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6NzY6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHBhdGg9XCIvZXhwb3J0XCIgZWxlbWVudD17PEV4cG9ydERvY3MgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6NzY6MzlcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgLz59IC8+XG4gICAgICA8L1JvdXRlPlxuICAgICAgPFJvdXRlIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiQXBwOjc4OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBwYXRoPVwiKlwiIGVsZW1lbnQ9ezxQYWdlTm90Rm91bmQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6Nzg6MzFcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgLz59IC8+XG4gICAgPC9Sb3V0ZXM+XG4gICAgPC9Gb2N1c1RpbWVyUHJvdmlkZXI+KTtcblxufTtcblxuZnVuY3Rpb24gQXBwKCkge1xuICByZXR1cm4gKFxuICAgIDxBdXRoUHJvdmlkZXIgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6ODY6NFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiPlxuICAgICAgPFF1ZXJ5Q2xpZW50UHJvdmlkZXIgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6ODc6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsaWVudD17cXVlcnlDbGllbnRJbnN0YW5jZX0+XG4gICAgICAgIDxSb3V0ZXIgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6ODg6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIj5cbiAgICAgICAgICA8U2Nyb2xsVG9Ub3AgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6ODk6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgLz5cbiAgICAgICAgICA8QXV0aGVudGljYXRlZEFwcCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIkFwcDo5MDoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiAvPlxuICAgICAgICA8L1JvdXRlcj5cbiAgICAgICAgPFRvYXN0ZXIgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6OTI6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiAvPlxuICAgICAgPC9RdWVyeUNsaWVudFByb3ZpZGVyPlxuICAgIDwvQXV0aFByb3ZpZGVyPik7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwOyJdLCJmaWxlIjoiL2FwcC9zcmMvQXBwLmpzeCJ9