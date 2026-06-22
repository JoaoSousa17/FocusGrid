import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/ForgotPassword.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/pages/ForgotPassword.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=fc940917"; const useState = __vite__cjsImport3_react["useState"];
import { Link } from "/node_modules/.vite/deps/react-router-dom.js?v=8a08d97a";
import { base44 } from "/src/api/base44Client.js";
import { Button } from "/src/components/ui/button.jsx";
import { Input } from "/src/components/ui/input.jsx";
import { Label } from "/src/components/ui/label.jsx";
import { motion } from "/node_modules/.vite/deps/framer-motion.js?v=fc940917";
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from "/node_modules/.vite/deps/lucide-react.js?v=aefa7968";
export default function ForgotPassword() {
  _s();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await base44.auth.resetPasswordRequest(email);
    } catch (err) {
    } finally {
      setLoading(false);
      setSent(true);
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ForgotPassword:29:4", "data-dynamic-content": "true", className: "min-h-screen bg-cream flex flex-col items-center justify-center px-6 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ForgotPassword:30:6", "data-dynamic-content": "false", className: "absolute top-[-120px] right-[-120px] w-[300px] h-[300px] rounded-full bg-[#E87A5A]/10" }, void 0, false, {
      fileName: "/app/src/pages/ForgotPassword.jsx",
      lineNumber: 49,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ForgotPassword:31:6", "data-dynamic-content": "false", className: "absolute bottom-[-80px] left-[-80px] w-[220px] h-[220px] rounded-full bg-[#E87A5A]/8" }, void 0, false, {
      fileName: "/app/src/pages/ForgotPassword.jsx",
      lineNumber: 50,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        "data-source-location": "pages/ForgotPassword:33:6",
        "data-dynamic-content": "true",
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
        className: "w-full max-w-sm relative z-10",
        children: sent ? /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ForgotPassword:40:10", "data-dynamic-content": "true", className: "text-center", children: [
          /* @__PURE__ */ jsxDEV(
            motion.div,
            {
              "data-source-location": "pages/ForgotPassword:41:12",
              "data-dynamic-content": "true",
              initial: { scale: 0 },
              animate: { scale: 1 },
              transition: { type: "spring", stiffness: 150 },
              className: "inline-flex items-center justify-center w-20 h-20 rounded-[28px] bg-green-100 mb-5",
              children: /* @__PURE__ */ jsxDEV(CheckCircle, { "data-source-location": "pages/ForgotPassword:47:14", "data-dynamic-content": "false", className: "w-10 h-10 text-green-600" }, void 0, false, {
                fileName: "/app/src/pages/ForgotPassword.jsx",
                lineNumber: 66,
                columnNumber: 15
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/src/pages/ForgotPassword.jsx",
              lineNumber: 60,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("h1", { "data-source-location": "pages/ForgotPassword:49:12", "data-dynamic-content": "false", className: "text-2xl font-bold text-foreground", children: "Email enviado!" }, void 0, false, {
            fileName: "/app/src/pages/ForgotPassword.jsx",
            lineNumber: 68,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/ForgotPassword:50:12", "data-dynamic-content": "false", className: "text-muted-foreground mt-2 text-sm", children: "Se o email existir, receberás um link para redefinir a password." }, void 0, false, {
            fileName: "/app/src/pages/ForgotPassword.jsx",
            lineNumber: 69,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(Link, { "data-source-location": "pages/ForgotPassword:53:12", "data-dynamic-content": "false", to: "/login", className: "inline-flex items-center gap-2 mt-6 text-sm text-[#E87A5A] font-semibold hover:underline", children: [
            /* @__PURE__ */ jsxDEV(ArrowLeft, { "data-source-location": "pages/ForgotPassword:54:14", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/src/pages/ForgotPassword.jsx",
              lineNumber: 73,
              columnNumber: 15
            }, this),
            " Voltar ao login"
          ] }, void 0, true, {
            fileName: "/app/src/pages/ForgotPassword.jsx",
            lineNumber: 72,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/ForgotPassword.jsx",
          lineNumber: 59,
          columnNumber: 9
        }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ForgotPassword:59:12", "data-dynamic-content": "false", className: "text-center mb-10", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ForgotPassword:60:14", "data-dynamic-content": "false", className: "inline-flex items-center justify-center w-20 h-20 rounded-[28px] bg-[#E87A5A]/10 mb-5", children: /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/ForgotPassword:61:16", "data-dynamic-content": "false", className: "text-4xl", children: "🍊" }, void 0, false, {
              fileName: "/app/src/pages/ForgotPassword.jsx",
              lineNumber: 80,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/ForgotPassword.jsx",
              lineNumber: 79,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("h1", { "data-source-location": "pages/ForgotPassword:63:14", "data-dynamic-content": "false", className: "text-2xl font-bold text-foreground", children: "Recuperar password" }, void 0, false, {
              fileName: "/app/src/pages/ForgotPassword.jsx",
              lineNumber: 82,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/ForgotPassword:64:14", "data-dynamic-content": "false", className: "text-muted-foreground mt-1.5 text-sm", children: "Envia o teu email e recebe um link de recuperação" }, void 0, false, {
              fileName: "/app/src/pages/ForgotPassword.jsx",
              lineNumber: 83,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/ForgotPassword.jsx",
            lineNumber: 78,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("form", { "data-source-location": "pages/ForgotPassword:69:12", "data-dynamic-content": "true", onSubmit: handleSubmit, className: "space-y-4", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ForgotPassword:70:14", "data-dynamic-content": "true", className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxDEV(Label, { "data-source-location": "pages/ForgotPassword:71:16", "data-dynamic-content": "false", htmlFor: "email", className: "text-sm font-medium text-foreground/80", children: "Email" }, void 0, false, {
                fileName: "/app/src/pages/ForgotPassword.jsx",
                lineNumber: 90,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ForgotPassword:72:16", "data-dynamic-content": "true", className: "relative", children: [
                /* @__PURE__ */ jsxDEV(Mail, { "data-source-location": "pages/ForgotPassword:73:18", "data-dynamic-content": "false", className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }, void 0, false, {
                  fileName: "/app/src/pages/ForgotPassword.jsx",
                  lineNumber: 92,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV(
                  Input,
                  {
                    "data-source-location": "pages/ForgotPassword:74:18",
                    "data-dynamic-content": "true",
                    id: "email",
                    type: "email",
                    placeholder: "o.teu@email.com",
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                    required: true,
                    className: "pl-10 h-12 rounded-2xl border-border bg-white"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/src/pages/ForgotPassword.jsx",
                    lineNumber: 93,
                    columnNumber: 19
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/src/pages/ForgotPassword.jsx",
                lineNumber: 91,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/ForgotPassword.jsx",
              lineNumber: 89,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              Button,
              {
                "data-source-location": "pages/ForgotPassword:86:14",
                "data-dynamic-content": "true",
                type: "submit",
                disabled: loading,
                className: "w-full h-12 rounded-2xl bg-[#E87A5A] hover:bg-[#D4694A] text-white font-semibold text-sm shadow-lg shadow-[#E87A5A]/25 flex items-center gap-2",
                children: loading ? /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ForgotPassword:92:18", "data-dynamic-content": "false", className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }, void 0, false, {
                  fileName: "/app/src/pages/ForgotPassword.jsx",
                  lineNumber: 111,
                  columnNumber: 15
                }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                  "Enviar link ",
                  /* @__PURE__ */ jsxDEV(ArrowRight, { "data-source-location": "pages/ForgotPassword:95:32", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/src/pages/ForgotPassword.jsx",
                    lineNumber: 114,
                    columnNumber: 33
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/ForgotPassword.jsx",
                  lineNumber: 113,
                  columnNumber: 15
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/src/pages/ForgotPassword.jsx",
                lineNumber: 105,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/src/pages/ForgotPassword.jsx",
            lineNumber: 88,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/ForgotPassword:101:12", "data-dynamic-content": "false", className: "text-center text-sm text-muted-foreground mt-6", children: /* @__PURE__ */ jsxDEV(Link, { "data-source-location": "pages/ForgotPassword:102:14", "data-dynamic-content": "false", to: "/login", className: "text-[#E87A5A] font-semibold hover:underline inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxDEV(ArrowLeft, { "data-source-location": "pages/ForgotPassword:103:16", "data-dynamic-content": "false", className: "w-3.5 h-3.5" }, void 0, false, {
              fileName: "/app/src/pages/ForgotPassword.jsx",
              lineNumber: 122,
              columnNumber: 17
            }, this),
            " Voltar ao login"
          ] }, void 0, true, {
            fileName: "/app/src/pages/ForgotPassword.jsx",
            lineNumber: 121,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/src/pages/ForgotPassword.jsx",
            lineNumber: 120,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/ForgotPassword.jsx",
          lineNumber: 77,
          columnNumber: 9
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/app/src/pages/ForgotPassword.jsx",
        lineNumber: 52,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/src/pages/ForgotPassword.jsx",
    lineNumber: 48,
    columnNumber: 5
  }, this);
}
_s(ForgotPassword, "Jlj0Wl4UOGUNjwcMXPUJZWCOfmk=");
_c = ForgotPassword;
var _c;
$RefreshReg$(_c, "ForgotPassword");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/pages/ForgotPassword.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/pages/ForgotPassword.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QkFBcUIsU0FBUSxXQUFVLGlCQUFyRztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFrSDtBQUFBLFlBQUc7QUFBQSxlQUR2SDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBLEtBSEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFJQTtBQUFBLGFBL0NKO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFnREU7QUFBQTtBQUFBLE1BekVKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQTJFQTtBQUFBLE9BL0VGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FnRkE7QUFFSjtBQUFDTCxHQXJHdUJELGdCQUFjO0FBQUEsS0FBZEE7QUFBYyxJQUFBdUI7QUFBQSxhQUFBQSxJQUFBIiwibmFtZXMiOlsidXNlU3RhdGUiLCJMaW5rIiwiYmFzZTQ0IiwiQnV0dG9uIiwiSW5wdXQiLCJMYWJlbCIsIm1vdGlvbiIsIk1haWwiLCJBcnJvd1JpZ2h0IiwiQXJyb3dMZWZ0IiwiQ2hlY2tDaXJjbGUiLCJGb3Jnb3RQYXNzd29yZCIsIl9zIiwiZW1haWwiLCJzZXRFbWFpbCIsInNlbnQiLCJzZXRTZW50IiwibG9hZGluZyIsInNldExvYWRpbmciLCJoYW5kbGVTdWJtaXQiLCJlIiwicHJldmVudERlZmF1bHQiLCJhdXRoIiwicmVzZXRQYXNzd29yZFJlcXVlc3QiLCJlcnIiLCJvcGFjaXR5IiwieSIsImR1cmF0aW9uIiwiZWFzZSIsInNjYWxlIiwidHlwZSIsInN0aWZmbmVzcyIsInRhcmdldCIsInZhbHVlIiwiX2MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiRm9yZ290UGFzc3dvcmQuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcbmltcG9ydCB7IGJhc2U0NCB9IGZyb20gXCJAL2FwaS9iYXNlNDRDbGllbnRcIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvYnV0dG9uXCI7XG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvaW5wdXRcIjtcbmltcG9ydCB7IExhYmVsIH0gZnJvbSBcIkAvY29tcG9uZW50cy91aS9sYWJlbFwiO1xuaW1wb3J0IHsgbW90aW9uIH0gZnJvbSBcImZyYW1lci1tb3Rpb25cIjtcbmltcG9ydCB7IE1haWwsIEFycm93UmlnaHQsIEFycm93TGVmdCwgQ2hlY2tDaXJjbGUgfSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEZvcmdvdFBhc3N3b3JkKCkge1xuICBjb25zdCBbZW1haWwsIHNldEVtYWlsXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbc2VudCwgc2V0U2VudF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBiYXNlNDQuYXV0aC5yZXNldFBhc3N3b3JkUmVxdWVzdChlbWFpbCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG5cbiAgICAgIC8vIGFsd2F5cyBzaG93IHN1Y2Nlc3NcbiAgICB9IGZpbmFsbHkge3NldExvYWRpbmcoZmFsc2UpO1xuICAgICAgc2V0U2VudCh0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9yZ290UGFzc3dvcmQ6Mjk6NFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1jcmVhbSBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBweC02IHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvcmdvdFBhc3N3b3JkOjMwOjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLVstMTIwcHhdIHJpZ2h0LVstMTIwcHhdIHctWzMwMHB4XSBoLVszMDBweF0gcm91bmRlZC1mdWxsIGJnLVsjRTg3QTVBXS8xMFwiIC8+XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9yZ290UGFzc3dvcmQ6MzE6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tWy04MHB4XSBsZWZ0LVstODBweF0gdy1bMjIwcHhdIGgtWzIyMHB4XSByb3VuZGVkLWZ1bGwgYmctWyNFODdBNUFdLzhcIiAvPlxuXG4gICAgICA8bW90aW9uLmRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvcmdvdFBhc3N3b3JkOjMzOjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB5OiAzMCB9fVxuICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB5OiAwIH19XG4gICAgICB0cmFuc2l0aW9uPXt7IGR1cmF0aW9uOiAwLjYsIGVhc2U6IFwiZWFzZU91dFwiIH19XG4gICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctc20gcmVsYXRpdmUgei0xMFwiPlxuICAgICAgICBcbiAgICAgICAge3NlbnQgP1xuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9yZ290UGFzc3dvcmQ6NDA6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgPG1vdGlvbi5kaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb3Jnb3RQYXNzd29yZDo0MToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgaW5pdGlhbD17eyBzY2FsZTogMCB9fVxuICAgICAgICAgIGFuaW1hdGU9e3sgc2NhbGU6IDEgfX1cbiAgICAgICAgICB0cmFuc2l0aW9uPXt7IHR5cGU6IFwic3ByaW5nXCIsIHN0aWZmbmVzczogMTUwIH19XG4gICAgICAgICAgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHctMjAgaC0yMCByb3VuZGVkLVsyOHB4XSBiZy1ncmVlbi0xMDAgbWItNVwiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxDaGVja0NpcmNsZSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvcmdvdFBhc3N3b3JkOjQ3OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctMTAgaC0xMCB0ZXh0LWdyZWVuLTYwMFwiIC8+XG4gICAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICAgICA8aDEgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb3Jnb3RQYXNzd29yZDo0OToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1mb3JlZ3JvdW5kXCI+RW1haWwgZW52aWFkbyE8L2gxPlxuICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb3Jnb3RQYXNzd29yZDo1MDoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LW11dGVkLWZvcmVncm91bmQgbXQtMiB0ZXh0LXNtXCI+XG4gICAgICAgICAgICAgIFNlIG8gZW1haWwgZXhpc3RpciwgcmVjZWJlcsOhcyB1bSBsaW5rIHBhcmEgcmVkZWZpbmlyIGEgcGFzc3dvcmQuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8TGluayBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvcmdvdFBhc3N3b3JkOjUzOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHRvPVwiL2xvZ2luXCIgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0yIG10LTYgdGV4dC1zbSB0ZXh0LVsjRTg3QTVBXSBmb250LXNlbWlib2xkIGhvdmVyOnVuZGVybGluZVwiPlxuICAgICAgICAgICAgICA8QXJyb3dMZWZ0IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9yZ290UGFzc3dvcmQ6NTQ6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+IFZvbHRhciBhbyBsb2dpblxuICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgIDwvZGl2PiA6XG5cbiAgICAgICAgPD5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb3Jnb3RQYXNzd29yZDo1OToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBtYi0xMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9yZ290UGFzc3dvcmQ6NjA6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHctMjAgaC0yMCByb3VuZGVkLVsyOHB4XSBiZy1bI0U4N0E1QV0vMTAgbWItNVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9yZ290UGFzc3dvcmQ6NjE6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC00eGxcIj7wn42KPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGgxIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9yZ290UGFzc3dvcmQ6NjM6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtZm9yZWdyb3VuZFwiPlJlY3VwZXJhciBwYXNzd29yZDwvaDE+XG4gICAgICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9yZ290UGFzc3dvcmQ6NjQ6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1tdXRlZC1mb3JlZ3JvdW5kIG10LTEuNSB0ZXh0LXNtXCI+XG4gICAgICAgICAgICAgICAgRW52aWEgbyB0ZXUgZW1haWwgZSByZWNlYmUgdW0gbGluayBkZSByZWN1cGVyYcOnw6NvXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8Zm9ybSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvcmdvdFBhc3N3b3JkOjY5OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0gY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb3Jnb3RQYXNzd29yZDo3MDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICAgICAgPExhYmVsIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9yZ290UGFzc3dvcmQ6NzE6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgaHRtbEZvcj1cImVtYWlsXCIgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWZvcmVncm91bmQvODBcIj5FbWFpbDwvTGFiZWw+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvcmdvdFBhc3N3b3JkOjcyOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgICAgICAgICAgIDxNYWlsIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9yZ290UGFzc3dvcmQ6NzM6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiYWJzb2x1dGUgbGVmdC0zLjUgdG9wLTEvMiAtdHJhbnNsYXRlLXktMS8yIHctNCBoLTQgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxJbnB1dCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvcmdvdFBhc3N3b3JkOjc0OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICBpZD1cImVtYWlsXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwiZW1haWxcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiby50ZXVAZW1haWwuY29tXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17ZW1haWx9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRFbWFpbChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwbC0xMCBoLTEyIHJvdW5kZWQtMnhsIGJvcmRlci1ib3JkZXIgYmctd2hpdGVcIiAvPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8QnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9yZ290UGFzc3dvcmQ6ODY6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICBkaXNhYmxlZD17bG9hZGluZ31cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLTEyIHJvdW5kZWQtMnhsIGJnLVsjRTg3QTVBXSBob3ZlcjpiZy1bI0Q0Njk0QV0gdGV4dC13aGl0ZSBmb250LXNlbWlib2xkIHRleHQtc20gc2hhZG93LWxnIHNoYWRvdy1bI0U4N0E1QV0vMjUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAge2xvYWRpbmcgP1xuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9yZ290UGFzc3dvcmQ6OTI6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy00IGgtNCBib3JkZXItMiBib3JkZXItd2hpdGUvMzAgYm9yZGVyLXQtd2hpdGUgcm91bmRlZC1mdWxsIGFuaW1hdGUtc3BpblwiIC8+IDpcblxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICBFbnZpYXIgbGluayA8QXJyb3dSaWdodCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0ZvcmdvdFBhc3N3b3JkOjk1OjMyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8L2Zvcm0+XG5cbiAgICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9yZ290UGFzc3dvcmQ6MTAxOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHRleHQtc20gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIG10LTZcIj5cbiAgICAgICAgICAgICAgPExpbmsgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Gb3Jnb3RQYXNzd29yZDoxMDI6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgdG89XCIvbG9naW5cIiBjbGFzc05hbWU9XCJ0ZXh0LVsjRTg3QTVBXSBmb250LXNlbWlib2xkIGhvdmVyOnVuZGVybGluZSBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICA8QXJyb3dMZWZ0IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRm9yZ290UGFzc3dvcmQ6MTAzOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz4gVm9sdGFyIGFvIGxvZ2luXG4gICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8Lz5cbiAgICAgICAgfVxuICAgICAgPC9tb3Rpb24uZGl2PlxuICAgIDwvZGl2Pik7XG5cbn0iXSwiZmlsZSI6Ii9hcHAvc3JjL3BhZ2VzL0ZvcmdvdFBhc3N3b3JkLmpzeCJ9