import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/AuthContext.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/lib/AuthContext.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=fc940917"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const createContext = __vite__cjsImport3_react["createContext"]; const useState = __vite__cjsImport3_react["useState"]; const useContext = __vite__cjsImport3_react["useContext"]; const useEffect = __vite__cjsImport3_react["useEffect"];
import { base44 } from "/src/api/base44Client.js";
import { appParams } from "/src/lib/app-params.js";
import { createAxiosClient } from "/node_modules/.vite/deps/@base44_sdk_dist_utils_axios-client.js?v=706632d4";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  _s();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [appPublicSettings, setAppPublicSettings] = useState(null);
  useEffect(() => {
    checkAppState();
  }, []);
  const checkAppState = async () => {
    try {
      setIsLoadingPublicSettings(true);
      setAuthError(null);
      const appClient = createAxiosClient({
        baseURL: `/api/apps/public`,
        headers: {
          "X-App-Id": appParams.appId
        },
        token: appParams.token,
        // Include token if available
        interceptResponses: true
      });
      try {
        const publicSettings = await appClient.get(`/prod/public-settings/by-id/${appParams.appId}`);
        setAppPublicSettings(publicSettings);
        if (appParams.token) {
          await checkUserAuth();
        } else {
          setIsLoadingAuth(false);
          setIsAuthenticated(false);
          setAuthChecked(true);
        }
        setIsLoadingPublicSettings(false);
      } catch (appError) {
        console.error("App state check failed:", appError);
        if (appError.status === 403 && appError.data?.extra_data?.reason) {
          const reason = appError.data.extra_data.reason;
          if (reason === "auth_required") {
            setAuthError({
              type: "auth_required",
              message: "Authentication required"
            });
          } else if (reason === "user_not_registered") {
            setAuthError({
              type: "user_not_registered",
              message: "User not registered for this app"
            });
          } else {
            setAuthError({
              type: reason,
              message: appError.message
            });
          }
        } else {
          setAuthError({
            type: "unknown",
            message: appError.message || "Failed to load app"
          });
        }
        setIsLoadingPublicSettings(false);
        setIsLoadingAuth(false);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setAuthError({
        type: "unknown",
        message: error.message || "An unexpected error occurred"
      });
      setIsLoadingPublicSettings(false);
      setIsLoadingAuth(false);
    }
  };
  const checkUserAuth = async () => {
    try {
      setIsLoadingAuth(true);
      const currentUser = await base44.auth.me();
      setUser(currentUser);
      setIsAuthenticated(true);
      setIsLoadingAuth(false);
      setAuthChecked(true);
    } catch (error) {
      console.error("User auth check failed:", error);
      setIsLoadingAuth(false);
      setIsAuthenticated(false);
      setAuthChecked(true);
      if (error.status === 401 || error.status === 403) {
        setAuthError({
          type: "auth_required",
          message: "Authentication required"
        });
      }
    }
  };
  const logout = (shouldRedirect = true) => {
    setUser(null);
    setIsAuthenticated(false);
    if (shouldRedirect) {
      base44.auth.logout(window.location.href);
    } else {
      base44.auth.logout();
    }
  };
  const navigateToLogin = () => {
    base44.auth.redirectToLogin(window.location.href);
  };
  return /* @__PURE__ */ jsxDEV(AuthContext.Provider, { "data-source-location": "AuthContext:136:4", "data-dynamic-content": "true", value: {
    user,
    isAuthenticated,
    isLoadingAuth,
    isLoadingPublicSettings,
    authError,
    appPublicSettings,
    authChecked,
    logout,
    navigateToLogin,
    checkUserAuth,
    checkAppState
  }, children }, void 0, false, {
    fileName: "/app/src/lib/AuthContext.jsx",
    lineNumber: 155,
    columnNumber: 5
  }, this);
};
_s(AuthProvider, "QtPtYtqasalRfiS8YcNNPyOe4PY=");
_c = AuthProvider;
export const useAuth = () => {
  _s2();
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
_s2(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
$RefreshReg$(_c, "AuthProvider");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/lib/AuthContext.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/lib/AuthContext.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QjtBQUFBQSxJQUNBVDtBQUFBQSxFQUNGLEdBQ0doQixZQWJIO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FjQTtBQUVKO0FBQUVDLEdBaEpXRixjQUFZO0FBQUEsS0FBWkE7QUFrSk4sYUFBTThDLFVBQVVBLE1BQU07QUFBQUMsTUFBQTtBQUMzQixRQUFNQyxVQUFVdEQsV0FBV0ssV0FBVztBQUN0QyxNQUFJLENBQUNpRCxTQUFTO0FBQ1osVUFBTSxJQUFJQyxNQUFNLDZDQUE2QztBQUFBLEVBQy9EO0FBQ0EsU0FBT0Q7QUFDVDtBQUFFRCxJQU5XRCxTQUFPO0FBQUEsSUFBQUk7QUFBQSxhQUFBQSxJQUFBIiwibmFtZXMiOlsiUmVhY3QiLCJjcmVhdGVDb250ZXh0IiwidXNlU3RhdGUiLCJ1c2VDb250ZXh0IiwidXNlRWZmZWN0IiwiYmFzZTQ0IiwiYXBwUGFyYW1zIiwiY3JlYXRlQXhpb3NDbGllbnQiLCJBdXRoQ29udGV4dCIsIkF1dGhQcm92aWRlciIsImNoaWxkcmVuIiwiX3MiLCJ1c2VyIiwic2V0VXNlciIsImlzQXV0aGVudGljYXRlZCIsInNldElzQXV0aGVudGljYXRlZCIsImlzTG9hZGluZ0F1dGgiLCJzZXRJc0xvYWRpbmdBdXRoIiwiaXNMb2FkaW5nUHVibGljU2V0dGluZ3MiLCJzZXRJc0xvYWRpbmdQdWJsaWNTZXR0aW5ncyIsImF1dGhFcnJvciIsInNldEF1dGhFcnJvciIsImF1dGhDaGVja2VkIiwic2V0QXV0aENoZWNrZWQiLCJhcHBQdWJsaWNTZXR0aW5ncyIsInNldEFwcFB1YmxpY1NldHRpbmdzIiwiY2hlY2tBcHBTdGF0ZSIsImFwcENsaWVudCIsImJhc2VVUkwiLCJoZWFkZXJzIiwiYXBwSWQiLCJ0b2tlbiIsImludGVyY2VwdFJlc3BvbnNlcyIsInB1YmxpY1NldHRpbmdzIiwiZ2V0IiwiY2hlY2tVc2VyQXV0aCIsImFwcEVycm9yIiwiY29uc29sZSIsImVycm9yIiwic3RhdHVzIiwiZGF0YSIsImV4dHJhX2RhdGEiLCJyZWFzb24iLCJ0eXBlIiwibWVzc2FnZSIsImN1cnJlbnRVc2VyIiwiYXV0aCIsIm1lIiwibG9nb3V0Iiwic2hvdWxkUmVkaXJlY3QiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJuYXZpZ2F0ZVRvTG9naW4iLCJyZWRpcmVjdFRvTG9naW4iLCJ1c2VBdXRoIiwiX3MyIiwiY29udGV4dCIsIkVycm9yIiwiX2MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiQXV0aENvbnRleHQuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBjcmVhdGVDb250ZXh0LCB1c2VTdGF0ZSwgdXNlQ29udGV4dCwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYmFzZTQ0IH0gZnJvbSAnQC9hcGkvYmFzZTQ0Q2xpZW50JztcbmltcG9ydCB7IGFwcFBhcmFtcyB9IGZyb20gJ0AvbGliL2FwcC1wYXJhbXMnO1xuaW1wb3J0IHsgY3JlYXRlQXhpb3NDbGllbnQgfSBmcm9tICdAYmFzZTQ0L3Nkay9kaXN0L3V0aWxzL2F4aW9zLWNsaWVudCc7XG5cbmNvbnN0IEF1dGhDb250ZXh0ID0gY3JlYXRlQ29udGV4dCgpO1xuXG5leHBvcnQgY29uc3QgQXV0aFByb3ZpZGVyID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICBjb25zdCBbdXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2lzQXV0aGVudGljYXRlZCwgc2V0SXNBdXRoZW50aWNhdGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzTG9hZGluZ0F1dGgsIHNldElzTG9hZGluZ0F1dGhdID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtpc0xvYWRpbmdQdWJsaWNTZXR0aW5ncywgc2V0SXNMb2FkaW5nUHVibGljU2V0dGluZ3NdID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFthdXRoRXJyb3IsIHNldEF1dGhFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2F1dGhDaGVja2VkLCBzZXRBdXRoQ2hlY2tlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFthcHBQdWJsaWNTZXR0aW5ncywgc2V0QXBwUHVibGljU2V0dGluZ3NdID0gdXNlU3RhdGUobnVsbCk7IC8vIENvbnRhaW5zIG9ubHkgeyBpZCwgcHVibGljX3NldHRpbmdzIH1cblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNoZWNrQXBwU3RhdGUoKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNoZWNrQXBwU3RhdGUgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHNldElzTG9hZGluZ1B1YmxpY1NldHRpbmdzKHRydWUpO1xuICAgICAgc2V0QXV0aEVycm9yKG51bGwpO1xuXG4gICAgICAvLyBGaXJzdCwgY2hlY2sgYXBwIHB1YmxpYyBzZXR0aW5ncyAod2l0aCB0b2tlbiBpZiBhdmFpbGFibGUpXG4gICAgICAvLyBUaGlzIHdpbGwgdGVsbCB1cyBpZiBhdXRoIGlzIHJlcXVpcmVkLCB1c2VyIG5vdCByZWdpc3RlcmVkLCBldGMuXG4gICAgICBjb25zdCBhcHBDbGllbnQgPSBjcmVhdGVBeGlvc0NsaWVudCh7XG4gICAgICAgIGJhc2VVUkw6IGAvYXBpL2FwcHMvcHVibGljYCxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdYLUFwcC1JZCc6IGFwcFBhcmFtcy5hcHBJZFxuICAgICAgICB9LFxuICAgICAgICB0b2tlbjogYXBwUGFyYW1zLnRva2VuLCAvLyBJbmNsdWRlIHRva2VuIGlmIGF2YWlsYWJsZVxuICAgICAgICBpbnRlcmNlcHRSZXNwb25zZXM6IHRydWVcbiAgICAgIH0pO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBwdWJsaWNTZXR0aW5ncyA9IGF3YWl0IGFwcENsaWVudC5nZXQoYC9wcm9kL3B1YmxpYy1zZXR0aW5ncy9ieS1pZC8ke2FwcFBhcmFtcy5hcHBJZH1gKTtcbiAgICAgICAgc2V0QXBwUHVibGljU2V0dGluZ3MocHVibGljU2V0dGluZ3MpO1xuXG4gICAgICAgIC8vIElmIHdlIGdvdCB0aGUgYXBwIHB1YmxpYyBzZXR0aW5ncyBzdWNjZXNzZnVsbHksIGNoZWNrIGlmIHVzZXIgaXMgYXV0aGVudGljYXRlZFxuICAgICAgICBpZiAoYXBwUGFyYW1zLnRva2VuKSB7XG4gICAgICAgICAgYXdhaXQgY2hlY2tVc2VyQXV0aCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldElzTG9hZGluZ0F1dGgoZmFsc2UpO1xuICAgICAgICAgIHNldElzQXV0aGVudGljYXRlZChmYWxzZSk7XG4gICAgICAgICAgc2V0QXV0aENoZWNrZWQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0SXNMb2FkaW5nUHVibGljU2V0dGluZ3MoZmFsc2UpO1xuICAgICAgfSBjYXRjaCAoYXBwRXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignQXBwIHN0YXRlIGNoZWNrIGZhaWxlZDonLCBhcHBFcnJvcik7XG5cbiAgICAgICAgLy8gSGFuZGxlIGFwcC1sZXZlbCBlcnJvcnNcbiAgICAgICAgaWYgKGFwcEVycm9yLnN0YXR1cyA9PT0gNDAzICYmIGFwcEVycm9yLmRhdGE/LmV4dHJhX2RhdGE/LnJlYXNvbikge1xuICAgICAgICAgIGNvbnN0IHJlYXNvbiA9IGFwcEVycm9yLmRhdGEuZXh0cmFfZGF0YS5yZWFzb247XG4gICAgICAgICAgaWYgKHJlYXNvbiA9PT0gJ2F1dGhfcmVxdWlyZWQnKSB7XG4gICAgICAgICAgICBzZXRBdXRoRXJyb3Ioe1xuICAgICAgICAgICAgICB0eXBlOiAnYXV0aF9yZXF1aXJlZCcsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6ICdBdXRoZW50aWNhdGlvbiByZXF1aXJlZCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVhc29uID09PSAndXNlcl9ub3RfcmVnaXN0ZXJlZCcpIHtcbiAgICAgICAgICAgIHNldEF1dGhFcnJvcih7XG4gICAgICAgICAgICAgIHR5cGU6ICd1c2VyX25vdF9yZWdpc3RlcmVkJyxcbiAgICAgICAgICAgICAgbWVzc2FnZTogJ1VzZXIgbm90IHJlZ2lzdGVyZWQgZm9yIHRoaXMgYXBwJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldEF1dGhFcnJvcih7XG4gICAgICAgICAgICAgIHR5cGU6IHJlYXNvbixcbiAgICAgICAgICAgICAgbWVzc2FnZTogYXBwRXJyb3IubWVzc2FnZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldEF1dGhFcnJvcih7XG4gICAgICAgICAgICB0eXBlOiAndW5rbm93bicsXG4gICAgICAgICAgICBtZXNzYWdlOiBhcHBFcnJvci5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gbG9hZCBhcHAnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0SXNMb2FkaW5nUHVibGljU2V0dGluZ3MoZmFsc2UpO1xuICAgICAgICBzZXRJc0xvYWRpbmdBdXRoKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignVW5leHBlY3RlZCBlcnJvcjonLCBlcnJvcik7XG4gICAgICBzZXRBdXRoRXJyb3Ioe1xuICAgICAgICB0eXBlOiAndW5rbm93bicsXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfHwgJ0FuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJyZWQnXG4gICAgICB9KTtcbiAgICAgIHNldElzTG9hZGluZ1B1YmxpY1NldHRpbmdzKGZhbHNlKTtcbiAgICAgIHNldElzTG9hZGluZ0F1dGgoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjaGVja1VzZXJBdXRoID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBOb3cgY2hlY2sgaWYgdGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZFxuICAgICAgc2V0SXNMb2FkaW5nQXV0aCh0cnVlKTtcbiAgICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gYXdhaXQgYmFzZTQ0LmF1dGgubWUoKTtcbiAgICAgIHNldFVzZXIoY3VycmVudFVzZXIpO1xuICAgICAgc2V0SXNBdXRoZW50aWNhdGVkKHRydWUpO1xuICAgICAgc2V0SXNMb2FkaW5nQXV0aChmYWxzZSk7XG4gICAgICBzZXRBdXRoQ2hlY2tlZCh0cnVlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignVXNlciBhdXRoIGNoZWNrIGZhaWxlZDonLCBlcnJvcik7XG4gICAgICBzZXRJc0xvYWRpbmdBdXRoKGZhbHNlKTtcbiAgICAgIHNldElzQXV0aGVudGljYXRlZChmYWxzZSk7XG4gICAgICBzZXRBdXRoQ2hlY2tlZCh0cnVlKTtcblxuICAgICAgLy8gSWYgdXNlciBhdXRoIGZhaWxzLCBpdCBtaWdodCBiZSBhbiBleHBpcmVkIHRva2VuXG4gICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MDEgfHwgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgc2V0QXV0aEVycm9yKHtcbiAgICAgICAgICB0eXBlOiAnYXV0aF9yZXF1aXJlZCcsXG4gICAgICAgICAgbWVzc2FnZTogJ0F1dGhlbnRpY2F0aW9uIHJlcXVpcmVkJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgbG9nb3V0ID0gKHNob3VsZFJlZGlyZWN0ID0gdHJ1ZSkgPT4ge1xuICAgIHNldFVzZXIobnVsbCk7XG4gICAgc2V0SXNBdXRoZW50aWNhdGVkKGZhbHNlKTtcblxuICAgIGlmIChzaG91bGRSZWRpcmVjdCkge1xuICAgICAgLy8gVXNlIHRoZSBTREsncyBsb2dvdXQgbWV0aG9kIHdoaWNoIGhhbmRsZXMgdG9rZW4gY2xlYW51cCBhbmQgcmVkaXJlY3RcbiAgICAgIGJhc2U0NC5hdXRoLmxvZ291dCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEp1c3QgcmVtb3ZlIHRoZSB0b2tlbiB3aXRob3V0IHJlZGlyZWN0XG4gICAgICBiYXNlNDQuYXV0aC5sb2dvdXQoKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgbmF2aWdhdGVUb0xvZ2luID0gKCkgPT4ge1xuICAgIC8vIFVzZSB0aGUgU0RLJ3MgcmVkaXJlY3RUb0xvZ2luIG1ldGhvZFxuICAgIGJhc2U0NC5hdXRoLnJlZGlyZWN0VG9Mb2dpbih3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8QXV0aENvbnRleHQuUHJvdmlkZXIgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBdXRoQ29udGV4dDoxMzY6NFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHZhbHVlPXt7XG4gICAgICB1c2VyLFxuICAgICAgaXNBdXRoZW50aWNhdGVkLFxuICAgICAgaXNMb2FkaW5nQXV0aCxcbiAgICAgIGlzTG9hZGluZ1B1YmxpY1NldHRpbmdzLFxuICAgICAgYXV0aEVycm9yLFxuICAgICAgYXBwUHVibGljU2V0dGluZ3MsXG4gICAgICBhdXRoQ2hlY2tlZCxcbiAgICAgIGxvZ291dCxcbiAgICAgIG5hdmlnYXRlVG9Mb2dpbixcbiAgICAgIGNoZWNrVXNlckF1dGgsXG4gICAgICBjaGVja0FwcFN0YXRlXG4gICAgfX0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9BdXRoQ29udGV4dC5Qcm92aWRlcj4pO1xuXG59O1xuXG5leHBvcnQgY29uc3QgdXNlQXV0aCA9ICgpID0+IHtcbiAgY29uc3QgY29udGV4dCA9IHVzZUNvbnRleHQoQXV0aENvbnRleHQpO1xuICBpZiAoIWNvbnRleHQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZUF1dGggbXVzdCBiZSB1c2VkIHdpdGhpbiBhbiBBdXRoUHJvdmlkZXInKTtcbiAgfVxuICByZXR1cm4gY29udGV4dDtcbn07Il0sImZpbGUiOiIvYXBwL3NyYy9saWIvQXV0aENvbnRleHQuanN4In0=