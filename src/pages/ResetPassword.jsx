import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/ResetPassword.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/pages/ResetPassword.jsx");
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
import { Lock, ArrowRight, CheckCircle } from "/node_modules/.vite/deps/lucide-react.js?v=aefa7968";
export default function ResetPassword() {
  _s();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const resetToken = urlParams.get("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("As passwords não coincidem.");
      return;
    }
    if (password.length < 6) {
      setError("A password deve ter pelo menos 6 caracteres.");
      return;
    }
    setLoading(true);
    try {
      await base44.auth.resetPassword({ resetToken, newPassword: password });
      setDone(true);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2e3);
    } catch (err) {
      setError("Erro ao redefinir a password. O link pode ter expirado.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ResetPassword:48:4", "data-dynamic-content": "true", className: "min-h-screen bg-cream flex flex-col items-center justify-center px-6 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ResetPassword:49:6", "data-dynamic-content": "false", className: "absolute top-[-120px] right-[-120px] w-[300px] h-[300px] rounded-full bg-[#E87A5A]/10" }, void 0, false, {
      fileName: "/app/src/pages/ResetPassword.jsx",
      lineNumber: 68,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ResetPassword:50:6", "data-dynamic-content": "false", className: "absolute bottom-[-80px] left-[-80px] w-[220px] h-[220px] rounded-full bg-[#E87A5A]/8" }, void 0, false, {
      fileName: "/app/src/pages/ResetPassword.jsx",
      lineNumber: 69,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        "data-source-location": "pages/ResetPassword:52:6",
        "data-dynamic-content": "true",
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
        className: "w-full max-w-sm relative z-10",
        children: done ? /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ResetPassword:59:10", "data-dynamic-content": "true", className: "text-center", children: [
          /* @__PURE__ */ jsxDEV(
            motion.div,
            {
              "data-source-location": "pages/ResetPassword:60:12",
              "data-dynamic-content": "true",
              initial: { scale: 0 },
              animate: { scale: 1 },
              transition: { type: "spring", stiffness: 150 },
              className: "inline-flex items-center justify-center w-20 h-20 rounded-[28px] bg-green-100 mb-5",
              children: /* @__PURE__ */ jsxDEV(CheckCircle, { "data-source-location": "pages/ResetPassword:66:14", "data-dynamic-content": "false", className: "w-10 h-10 text-green-600" }, void 0, false, {
                fileName: "/app/src/pages/ResetPassword.jsx",
                lineNumber: 85,
                columnNumber: 15
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/src/pages/ResetPassword.jsx",
              lineNumber: 79,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("h1", { "data-source-location": "pages/ResetPassword:68:12", "data-dynamic-content": "false", className: "text-2xl font-bold text-foreground", children: "Password redefinida!" }, void 0, false, {
            fileName: "/app/src/pages/ResetPassword.jsx",
            lineNumber: 87,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/ResetPassword:69:12", "data-dynamic-content": "false", className: "text-muted-foreground mt-2 text-sm", children: "Serás redirecionado para o login..." }, void 0, false, {
            fileName: "/app/src/pages/ResetPassword.jsx",
            lineNumber: 88,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/ResetPassword.jsx",
          lineNumber: 78,
          columnNumber: 9
        }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ResetPassword:73:12", "data-dynamic-content": "false", className: "text-center mb-10", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ResetPassword:74:14", "data-dynamic-content": "false", className: "inline-flex items-center justify-center w-20 h-20 rounded-[28px] bg-[#E87A5A]/10 mb-5", children: /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/ResetPassword:75:16", "data-dynamic-content": "false", className: "text-4xl", children: "🔒" }, void 0, false, {
              fileName: "/app/src/pages/ResetPassword.jsx",
              lineNumber: 94,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/ResetPassword.jsx",
              lineNumber: 93,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("h1", { "data-source-location": "pages/ResetPassword:77:14", "data-dynamic-content": "false", className: "text-2xl font-bold text-foreground", children: "Nova password" }, void 0, false, {
              fileName: "/app/src/pages/ResetPassword.jsx",
              lineNumber: 96,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/ResetPassword:78:14", "data-dynamic-content": "false", className: "text-muted-foreground mt-1.5 text-sm", children: "Escolhe uma nova password" }, void 0, false, {
              fileName: "/app/src/pages/ResetPassword.jsx",
              lineNumber: 97,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/ResetPassword.jsx",
            lineNumber: 92,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("form", { "data-source-location": "pages/ResetPassword:81:12", "data-dynamic-content": "true", onSubmit: handleSubmit, className: "space-y-4", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ResetPassword:82:14", "data-dynamic-content": "true", className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxDEV(Label, { "data-source-location": "pages/ResetPassword:83:16", "data-dynamic-content": "false", htmlFor: "password", className: "text-sm font-medium text-foreground/80", children: "Nova Password" }, void 0, false, {
                fileName: "/app/src/pages/ResetPassword.jsx",
                lineNumber: 102,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ResetPassword:84:16", "data-dynamic-content": "true", className: "relative", children: [
                /* @__PURE__ */ jsxDEV(Lock, { "data-source-location": "pages/ResetPassword:85:18", "data-dynamic-content": "false", className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }, void 0, false, {
                  fileName: "/app/src/pages/ResetPassword.jsx",
                  lineNumber: 104,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV(Input, { "data-source-location": "pages/ResetPassword:86:18", "data-dynamic-content": "true", id: "password", type: "password", placeholder: "Mínimo 6 caracteres", value: password, onChange: (e) => setPassword(e.target.value), required: true, className: "pl-10 h-12 rounded-2xl border-border bg-white" }, void 0, false, {
                  fileName: "/app/src/pages/ResetPassword.jsx",
                  lineNumber: 105,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/ResetPassword.jsx",
                lineNumber: 103,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/ResetPassword.jsx",
              lineNumber: 101,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ResetPassword:90:14", "data-dynamic-content": "true", className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxDEV(Label, { "data-source-location": "pages/ResetPassword:91:16", "data-dynamic-content": "false", htmlFor: "confirmPassword", className: "text-sm font-medium text-foreground/80", children: "Confirmar Password" }, void 0, false, {
                fileName: "/app/src/pages/ResetPassword.jsx",
                lineNumber: 110,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ResetPassword:92:16", "data-dynamic-content": "true", className: "relative", children: [
                /* @__PURE__ */ jsxDEV(Lock, { "data-source-location": "pages/ResetPassword:93:18", "data-dynamic-content": "false", className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }, void 0, false, {
                  fileName: "/app/src/pages/ResetPassword.jsx",
                  lineNumber: 112,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV(Input, { "data-source-location": "pages/ResetPassword:94:18", "data-dynamic-content": "true", id: "confirmPassword", type: "password", placeholder: "Repete a password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), required: true, className: "pl-10 h-12 rounded-2xl border-border bg-white" }, void 0, false, {
                  fileName: "/app/src/pages/ResetPassword.jsx",
                  lineNumber: 113,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/ResetPassword.jsx",
                lineNumber: 111,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/ResetPassword.jsx",
              lineNumber: 109,
              columnNumber: 15
            }, this),
            error && /* @__PURE__ */ jsxDEV(motion.p, { "data-source-location": "pages/ResetPassword:99:16", "data-dynamic-content": "true", initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-sm text-destructive bg-destructive/5 rounded-xl px-4 py-2.5 text-center", "data-collection-item-field": "error", children: error }, void 0, false, {
              fileName: "/app/src/pages/ResetPassword.jsx",
              lineNumber: 118,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV(Button, { "data-source-location": "pages/ResetPassword:104:14", "data-dynamic-content": "true", type: "submit", disabled: loading, className: "w-full h-12 rounded-2xl bg-[#E87A5A] hover:bg-[#D4694A] text-white font-semibold text-sm shadow-lg shadow-[#E87A5A]/25 flex items-center gap-2", children: loading ? /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/ResetPassword:106:18", "data-dynamic-content": "false", className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }, void 0, false, {
              fileName: "/app/src/pages/ResetPassword.jsx",
              lineNumber: 125,
              columnNumber: 15
            }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
              "Redefinir password ",
              /* @__PURE__ */ jsxDEV(ArrowRight, { "data-source-location": "pages/ResetPassword:109:39", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/src/pages/ResetPassword.jsx",
                lineNumber: 128,
                columnNumber: 40
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/ResetPassword.jsx",
              lineNumber: 127,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/ResetPassword.jsx",
              lineNumber: 123,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/ResetPassword.jsx",
            lineNumber: 100,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/ResetPassword.jsx",
          lineNumber: 91,
          columnNumber: 9
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/app/src/pages/ResetPassword.jsx",
        lineNumber: 71,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/src/pages/ResetPassword.jsx",
    lineNumber: 67,
    columnNumber: 5
  }, this);
}
_s(ResetPassword, "qoZ3C6hE6pnAK8euEFGSKbvAYjM=");
_c = ResetPassword;
var _c;
$RefreshReg$(_c, "ResetPassword");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/pages/ResetPassword.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/pages/ResetPassword.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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b24iLCJJbnB1dCIsIkxhYmVsIiwibW90aW9uIiwiTG9jayIsIkFycm93UmlnaHQiLCJDaGVja0NpcmNsZSIsIlJlc2V0UGFzc3dvcmQiLCJfcyIsInBhc3N3b3JkIiwic2V0UGFzc3dvcmQiLCJjb25maXJtUGFzc3dvcmQiLCJzZXRDb25maXJtUGFzc3dvcmQiLCJlcnJvciIsInNldEVycm9yIiwibG9hZGluZyIsInNldExvYWRpbmciLCJkb25lIiwic2V0RG9uZSIsInVybFBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsIndpbmRvdyIsImxvY2F0aW9uIiwic2VhcmNoIiwicmVzZXRUb2tlbiIsImdldCIsImhhbmRsZVN1Ym1pdCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImxlbmd0aCIsImF1dGgiLCJyZXNldFBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJzZXRUaW1lb3V0IiwiaHJlZiIsImVyciIsIm9wYWNpdHkiLCJ5IiwiZHVyYXRpb24iLCJlYXNlIiwic2NhbGUiLCJ0eXBlIiwic3RpZmZuZXNzIiwidGFyZ2V0IiwidmFsdWUiLCJfYyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJSZXNldFBhc3N3b3JkLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgTGluayB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5pbXBvcnQgeyBiYXNlNDQgfSBmcm9tIFwiQC9hcGkvYmFzZTQ0Q2xpZW50XCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL2J1dHRvblwiO1xuaW1wb3J0IHsgSW5wdXQgfSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL2lucHV0XCI7XG5pbXBvcnQgeyBMYWJlbCB9IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvbGFiZWxcIjtcbmltcG9ydCB7IG1vdGlvbiB9IGZyb20gXCJmcmFtZXItbW90aW9uXCI7XG5pbXBvcnQgeyBMb2NrLCBBcnJvd1JpZ2h0LCBDaGVja0NpcmNsZSB9IGZyb20gXCJsdWNpZGUtcmVhY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmVzZXRQYXNzd29yZCgpIHtcbiAgY29uc3QgW3Bhc3N3b3JkLCBzZXRQYXNzd29yZF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2NvbmZpcm1QYXNzd29yZCwgc2V0Q29uZmlybVBhc3N3b3JkXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtkb25lLCBzZXREb25lXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICBjb25zdCByZXNldFRva2VuID0gdXJsUGFyYW1zLmdldChcInRva2VuXCIpO1xuXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHNldEVycm9yKFwiXCIpO1xuXG4gICAgaWYgKHBhc3N3b3JkICE9PSBjb25maXJtUGFzc3dvcmQpIHtcbiAgICAgIHNldEVycm9yKFwiQXMgcGFzc3dvcmRzIG7Do28gY29pbmNpZGVtLlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHBhc3N3b3JkLmxlbmd0aCA8IDYpIHtcbiAgICAgIHNldEVycm9yKFwiQSBwYXNzd29yZCBkZXZlIHRlciBwZWxvIG1lbm9zIDYgY2FyYWN0ZXJlcy5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgYmFzZTQ0LmF1dGgucmVzZXRQYXNzd29yZCh7IHJlc2V0VG9rZW4sIG5ld1Bhc3N3b3JkOiBwYXNzd29yZCB9KTtcbiAgICAgIHNldERvbmUodHJ1ZSk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9sb2dpblwiO1xuICAgICAgfSwgMjAwMCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBzZXRFcnJvcihcIkVycm8gYW8gcmVkZWZpbmlyIGEgcGFzc3dvcmQuIE8gbGluayBwb2RlIHRlciBleHBpcmFkby5cIik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZXNldFBhc3N3b3JkOjQ4OjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctY3JlYW0gZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcHgtNiByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZXNldFBhc3N3b3JkOjQ5OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLVstMTIwcHhdIHJpZ2h0LVstMTIwcHhdIHctWzMwMHB4XSBoLVszMDBweF0gcm91bmRlZC1mdWxsIGJnLVsjRTg3QTVBXS8xMFwiIC8+XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVzZXRQYXNzd29yZDo1MDo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS1bLTgwcHhdIGxlZnQtWy04MHB4XSB3LVsyMjBweF0gaC1bMjIwcHhdIHJvdW5kZWQtZnVsbCBiZy1bI0U4N0E1QV0vOFwiIC8+XG5cbiAgICAgIDxtb3Rpb24uZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVzZXRQYXNzd29yZDo1Mjo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeTogMzAgfX1cbiAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgeTogMCB9fVxuICAgICAgdHJhbnNpdGlvbj17eyBkdXJhdGlvbjogMC42LCBlYXNlOiBcImVhc2VPdXRcIiB9fVxuICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LXNtIHJlbGF0aXZlIHotMTBcIj5cbiAgICAgICAgXG4gICAgICAgIHtkb25lID9cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Jlc2V0UGFzc3dvcmQ6NTk6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgPG1vdGlvbi5kaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZXNldFBhc3N3b3JkOjYwOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICBpbml0aWFsPXt7IHNjYWxlOiAwIH19XG4gICAgICAgICAgYW5pbWF0ZT17eyBzY2FsZTogMSB9fVxuICAgICAgICAgIHRyYW5zaXRpb249e3sgdHlwZTogXCJzcHJpbmdcIiwgc3RpZmZuZXNzOiAxNTAgfX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdy0yMCBoLTIwIHJvdW5kZWQtWzI4cHhdIGJnLWdyZWVuLTEwMCBtYi01XCI+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgPENoZWNrQ2lyY2xlIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVzZXRQYXNzd29yZDo2NjoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgdGV4dC1ncmVlbi02MDBcIiAvPlxuICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgICAgPGgxIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVzZXRQYXNzd29yZDo2ODoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1mb3JlZ3JvdW5kXCI+UGFzc3dvcmQgcmVkZWZpbmlkYSE8L2gxPlxuICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZXNldFBhc3N3b3JkOjY5OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtbXV0ZWQtZm9yZWdyb3VuZCBtdC0yIHRleHQtc21cIj5TZXLDoXMgcmVkaXJlY2lvbmFkbyBwYXJhIG8gbG9naW4uLi48L3A+XG4gICAgICAgICAgPC9kaXY+IDpcblxuICAgICAgICA8PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Jlc2V0UGFzc3dvcmQ6NzM6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgbWItMTBcIj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Jlc2V0UGFzc3dvcmQ6NzQ6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHctMjAgaC0yMCByb3VuZGVkLVsyOHB4XSBiZy1bI0U4N0E1QV0vMTAgbWItNVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVzZXRQYXNzd29yZDo3NToxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LTR4bFwiPvCflJI8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8aDEgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZXNldFBhc3N3b3JkOjc3OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWZvcmVncm91bmRcIj5Ob3ZhIHBhc3N3b3JkPC9oMT5cbiAgICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZXNldFBhc3N3b3JkOjc4OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtbXV0ZWQtZm9yZWdyb3VuZCBtdC0xLjUgdGV4dC1zbVwiPkVzY29saGUgdW1hIG5vdmEgcGFzc3dvcmQ8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGZvcm0gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZXNldFBhc3N3b3JkOjgxOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0gY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZXNldFBhc3N3b3JkOjgyOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgICA8TGFiZWwgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZXNldFBhc3N3b3JkOjgzOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGh0bWxGb3I9XCJwYXNzd29yZFwiIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1mb3JlZ3JvdW5kLzgwXCI+Tm92YSBQYXNzd29yZDwvTGFiZWw+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Jlc2V0UGFzc3dvcmQ6ODQ6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgPExvY2sgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZXNldFBhc3N3b3JkOjg1OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImFic29sdXRlIGxlZnQtMy41IHRvcC0xLzIgLXRyYW5zbGF0ZS15LTEvMiB3LTQgaC00IHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiIC8+XG4gICAgICAgICAgICAgICAgICA8SW5wdXQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZXNldFBhc3N3b3JkOjg2OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgaWQ9XCJwYXNzd29yZFwiIHR5cGU9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwiTcOtbmltbyA2IGNhcmFjdGVyZXNcIiB2YWx1ZT17cGFzc3dvcmR9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0UGFzc3dvcmQoZS50YXJnZXQudmFsdWUpfSByZXF1aXJlZCBjbGFzc05hbWU9XCJwbC0xMCBoLTEyIHJvdW5kZWQtMnhsIGJvcmRlci1ib3JkZXIgYmctd2hpdGVcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVzZXRQYXNzd29yZDo5MDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICAgICAgPExhYmVsIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVzZXRQYXNzd29yZDo5MToxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBodG1sRm9yPVwiY29uZmlybVBhc3N3b3JkXCIgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWZvcmVncm91bmQvODBcIj5Db25maXJtYXIgUGFzc3dvcmQ8L0xhYmVsPlxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZXNldFBhc3N3b3JkOjkyOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgICAgICAgICAgIDxMb2NrIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVzZXRQYXNzd29yZDo5MzoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBsZWZ0LTMuNSB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzIgdy00IGgtNCB0ZXh0LW11dGVkLWZvcmVncm91bmRcIiAvPlxuICAgICAgICAgICAgICAgICAgPElucHV0IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVzZXRQYXNzd29yZDo5NDoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGlkPVwiY29uZmlybVBhc3N3b3JkXCIgdHlwZT1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCJSZXBldGUgYSBwYXNzd29yZFwiIHZhbHVlPXtjb25maXJtUGFzc3dvcmR9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0Q29uZmlybVBhc3N3b3JkKGUudGFyZ2V0LnZhbHVlKX0gcmVxdWlyZWQgY2xhc3NOYW1lPVwicGwtMTAgaC0xMiByb3VuZGVkLTJ4bCBib3JkZXItYm9yZGVyIGJnLXdoaXRlXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAge2Vycm9yICYmXG4gICAgICAgICAgICA8bW90aW9uLnAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZXNldFBhc3N3b3JkOjk5OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgaW5pdGlhbD17eyBvcGFjaXR5OiAwIH19IGFuaW1hdGU9e3sgb3BhY2l0eTogMSB9fSBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtZGVzdHJ1Y3RpdmUgYmctZGVzdHJ1Y3RpdmUvNSByb3VuZGVkLXhsIHB4LTQgcHktMi41IHRleHQtY2VudGVyXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJlcnJvclwiPlxuICAgICAgICAgICAgICAgICAge2Vycm9yfVxuICAgICAgICAgICAgICAgIDwvbW90aW9uLnA+XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgPEJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Jlc2V0UGFzc3dvcmQ6MTA0OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgdHlwZT1cInN1Ym1pdFwiIGRpc2FibGVkPXtsb2FkaW5nfSBjbGFzc05hbWU9XCJ3LWZ1bGwgaC0xMiByb3VuZGVkLTJ4bCBiZy1bI0U4N0E1QV0gaG92ZXI6YmctWyNENDY5NEFdIHRleHQtd2hpdGUgZm9udC1zZW1pYm9sZCB0ZXh0LXNtIHNoYWRvdy1sZyBzaGFkb3ctWyNFODdBNUFdLzI1IGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAge2xvYWRpbmcgP1xuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVzZXRQYXNzd29yZDoxMDY6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy00IGgtNCBib3JkZXItMiBib3JkZXItd2hpdGUvMzAgYm9yZGVyLXQtd2hpdGUgcm91bmRlZC1mdWxsIGFuaW1hdGUtc3BpblwiIC8+IDpcblxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICBSZWRlZmluaXIgcGFzc3dvcmQgPEFycm93UmlnaHQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZXNldFBhc3N3b3JkOjEwOTozOVwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgIDwvPlxuICAgICAgICB9XG4gICAgICA8L21vdGlvbi5kaXY+XG4gICAgPC9kaXY+KTtcblxufSJdLCJmaWxlIjoiL2FwcC9zcmMvcGFnZXMvUmVzZXRQYXNzd29yZC5qc3gifQ==