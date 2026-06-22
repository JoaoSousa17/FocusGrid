import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/Login.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/pages/Login.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=fc940917"; const useState = __vite__cjsImport3_react["useState"];
import { Link } from "/node_modules/.vite/deps/react-router-dom.js?v=8a08d97a";
import { base44 } from "/src/api/base44Client.js";
import { Button } from "/src/components/ui/button.jsx";
import { Input } from "/src/components/ui/input.jsx";
import { Label } from "/src/components/ui/label.jsx";
import { Separator } from "/src/components/ui/separator.jsx";
import { motion } from "/node_modules/.vite/deps/framer-motion.js?v=fc940917";
import { Mail, Lock, LogIn, ArrowRight, Eye, EyeOff } from "/node_modules/.vite/deps/lucide-react.js?v=aefa7968";
export default function Login() {
  _s();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await base44.auth.loginViaEmailPassword(email, password);
      window.location.href = "/";
    } catch (err) {
      setError("Email ou password inválidos.");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
    setError("");
    try {
      await base44.auth.loginWithProvider("google", "/");
    } catch (err) {
      setError("Erro ao iniciar sessão com Google.");
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Login:42:4", "data-dynamic-content": "true", className: "min-h-screen bg-cream flex flex-col items-center justify-center px-6 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Login:44:6", "data-dynamic-content": "false", className: "absolute top-[-120px] right-[-120px] w-[300px] h-[300px] rounded-full bg-[#E87A5A]/10" }, void 0, false, {
      fileName: "/app/src/pages/Login.jsx",
      lineNumber: 63,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Login:45:6", "data-dynamic-content": "false", className: "absolute bottom-[-80px] left-[-80px] w-[220px] h-[220px] rounded-full bg-[#E87A5A]/8" }, void 0, false, {
      fileName: "/app/src/pages/Login.jsx",
      lineNumber: 64,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        "data-source-location": "pages/Login:47:6",
        "data-dynamic-content": "true",
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
        className: "w-full max-w-sm relative z-10",
        children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Login:54:8", "data-dynamic-content": "true", className: "text-center mb-10", children: [
            /* @__PURE__ */ jsxDEV(
              motion.div,
              {
                "data-source-location": "pages/Login:55:10",
                "data-dynamic-content": "true",
                initial: { scale: 0 },
                animate: { scale: 1 },
                transition: { delay: 0.2, type: "spring", stiffness: 150 },
                className: "inline-flex items-center justify-center w-20 h-20 rounded-[28px] bg-[#E87A5A] shadow-lg shadow-[#E87A5A]/25 mb-5",
                children: /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/Login:61:12", "data-dynamic-content": "false", className: "text-4xl", children: "🍊" }, void 0, false, {
                  fileName: "/app/src/pages/Login.jsx",
                  lineNumber: 80,
                  columnNumber: 13
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/src/pages/Login.jsx",
                lineNumber: 74,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("h1", { "data-source-location": "pages/Login:63:10", "data-dynamic-content": "false", className: "text-2xl font-bold text-foreground", children: [
              /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/Login:64:12", "data-dynamic-content": "false", className: "bg-gradient-to-r from-[#E87A5A] to-[#D4694A] bg-clip-text text-transparent", children: "Focus" }, void 0, false, {
                fileName: "/app/src/pages/Login.jsx",
                lineNumber: 83,
                columnNumber: 13
              }, this),
              "Flow"
            ] }, void 0, true, {
              fileName: "/app/src/pages/Login.jsx",
              lineNumber: 82,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/Login:66:10", "data-dynamic-content": "false", className: "text-muted-foreground mt-1.5 text-sm", children: "Produtividade com ritmo" }, void 0, false, {
              fileName: "/app/src/pages/Login.jsx",
              lineNumber: 85,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/Login.jsx",
            lineNumber: 73,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV(
            Button,
            {
              "data-source-location": "pages/Login:70:8",
              "data-dynamic-content": "true",
              onClick: handleGoogleLogin,
              variant: "outline",
              className: "w-full h-12 rounded-2xl border-border bg-white hover:bg-secondary/50 transition-all text-sm font-medium gap-3",
              children: [
                /* @__PURE__ */ jsxDEV("svg", { "data-source-location": "pages/Login:75:10", "data-dynamic-content": "false", className: "w-5 h-5", viewBox: "0 0 24 24", children: [
                  /* @__PURE__ */ jsxDEV("path", { "data-source-location": "pages/Login:76:12", "data-dynamic-content": "false", fill: "#4285F4", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" }, void 0, false, {
                    fileName: "/app/src/pages/Login.jsx",
                    lineNumber: 95,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV("path", { "data-source-location": "pages/Login:77:12", "data-dynamic-content": "false", fill: "#34A853", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }, void 0, false, {
                    fileName: "/app/src/pages/Login.jsx",
                    lineNumber: 96,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV("path", { "data-source-location": "pages/Login:78:12", "data-dynamic-content": "false", fill: "#FBBC05", d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" }, void 0, false, {
                    fileName: "/app/src/pages/Login.jsx",
                    lineNumber: 97,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV("path", { "data-source-location": "pages/Login:79:12", "data-dynamic-content": "false", fill: "#EA4335", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" }, void 0, false, {
                    fileName: "/app/src/pages/Login.jsx",
                    lineNumber: 98,
                    columnNumber: 13
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/Login.jsx",
                  lineNumber: 94,
                  columnNumber: 11
                }, this),
                "Continuar com Google"
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/src/pages/Login.jsx",
              lineNumber: 89,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Login:84:8", "data-dynamic-content": "false", className: "flex items-center gap-3 my-6", children: [
            /* @__PURE__ */ jsxDEV(Separator, { "data-source-location": "pages/Login:85:10", "data-dynamic-content": "false", className: "flex-1 bg-border" }, void 0, false, {
              fileName: "/app/src/pages/Login.jsx",
              lineNumber: 104,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/Login:86:10", "data-dynamic-content": "false", className: "text-xs text-muted-foreground font-medium", children: "ou" }, void 0, false, {
              fileName: "/app/src/pages/Login.jsx",
              lineNumber: 105,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV(Separator, { "data-source-location": "pages/Login:87:10", "data-dynamic-content": "false", className: "flex-1 bg-border" }, void 0, false, {
              fileName: "/app/src/pages/Login.jsx",
              lineNumber: 106,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/Login.jsx",
            lineNumber: 103,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("form", { "data-source-location": "pages/Login:91:8", "data-dynamic-content": "true", onSubmit: handleEmailLogin, className: "space-y-4", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Login:92:10", "data-dynamic-content": "true", className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxDEV(Label, { "data-source-location": "pages/Login:93:12", "data-dynamic-content": "false", htmlFor: "email", className: "text-sm font-medium text-foreground/80", children: "Email" }, void 0, false, {
                fileName: "/app/src/pages/Login.jsx",
                lineNumber: 112,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Login:96:12", "data-dynamic-content": "true", className: "relative", children: [
                /* @__PURE__ */ jsxDEV(Mail, { "data-source-location": "pages/Login:97:14", "data-dynamic-content": "false", className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }, void 0, false, {
                  fileName: "/app/src/pages/Login.jsx",
                  lineNumber: 116,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV(
                  Input,
                  {
                    "data-source-location": "pages/Login:98:14",
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
                    fileName: "/app/src/pages/Login.jsx",
                    lineNumber: 117,
                    columnNumber: 15
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/src/pages/Login.jsx",
                lineNumber: 115,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/Login.jsx",
              lineNumber: 111,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Login:110:10", "data-dynamic-content": "true", className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxDEV(Label, { "data-source-location": "pages/Login:111:12", "data-dynamic-content": "false", htmlFor: "password", className: "text-sm font-medium text-foreground/80", children: "Password" }, void 0, false, {
                fileName: "/app/src/pages/Login.jsx",
                lineNumber: 130,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Login:114:12", "data-dynamic-content": "true", className: "relative", children: [
                /* @__PURE__ */ jsxDEV(Lock, { "data-source-location": "pages/Login:115:14", "data-dynamic-content": "false", className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }, void 0, false, {
                  fileName: "/app/src/pages/Login.jsx",
                  lineNumber: 134,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV(
                  Input,
                  {
                    "data-source-location": "pages/Login:116:14",
                    "data-dynamic-content": "true",
                    id: "password",
                    type: showPassword ? "text" : "password",
                    placeholder: "A tua password",
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                    required: true,
                    className: "pl-10 pr-10 h-12 rounded-2xl border-border bg-white"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/src/pages/Login.jsx",
                    lineNumber: 135,
                    columnNumber: 15
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    "data-source-location": "pages/Login:125:14",
                    "data-dynamic-content": "true",
                    type: "button",
                    onClick: () => setShowPassword(!showPassword),
                    className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground",
                    children: showPassword ? /* @__PURE__ */ jsxDEV(EyeOff, { "data-source-location": "pages/Login:130:32", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                      fileName: "/app/src/pages/Login.jsx",
                      lineNumber: 149,
                      columnNumber: 33
                    }, this) : /* @__PURE__ */ jsxDEV(Eye, { "data-source-location": "pages/Login:130:65", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                      fileName: "/app/src/pages/Login.jsx",
                      lineNumber: 149,
                      columnNumber: 137
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/src/pages/Login.jsx",
                    lineNumber: 144,
                    columnNumber: 15
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/src/pages/Login.jsx",
                lineNumber: 133,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/Login.jsx",
              lineNumber: 129,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Login:135:10", "data-dynamic-content": "false", className: "flex justify-end", children: /* @__PURE__ */ jsxDEV(Link, { "data-source-location": "pages/Login:136:12", "data-dynamic-content": "false", to: "/forgot-password", className: "text-xs text-[#E87A5A] hover:underline font-medium", children: "Esqueceste a password?" }, void 0, false, {
              fileName: "/app/src/pages/Login.jsx",
              lineNumber: 155,
              columnNumber: 13
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/Login.jsx",
              lineNumber: 154,
              columnNumber: 11
            }, this),
            error && /* @__PURE__ */ jsxDEV(
              motion.p,
              {
                "data-source-location": "pages/Login:142:12",
                "data-dynamic-content": "true",
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                className: "text-sm text-destructive bg-destructive/5 rounded-xl px-4 py-2.5 text-center",
                "data-collection-item-field": "error",
                children: error
              },
              void 0,
              false,
              {
                fileName: "/app/src/pages/Login.jsx",
                lineNumber: 161,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              Button,
              {
                "data-source-location": "pages/Login:151:10",
                "data-dynamic-content": "true",
                type: "submit",
                disabled: loading,
                className: "w-full h-12 rounded-2xl bg-[#E87A5A] hover:bg-[#D4694A] text-white font-semibold text-sm shadow-lg shadow-[#E87A5A]/25 transition-all flex items-center gap-2",
                children: loading ? /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Login:157:14", "data-dynamic-content": "false", className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }, void 0, false, {
                  fileName: "/app/src/pages/Login.jsx",
                  lineNumber: 176,
                  columnNumber: 13
                }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                  "Entrar ",
                  /* @__PURE__ */ jsxDEV(ArrowRight, { "data-source-location": "pages/Login:160:23", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/src/pages/Login.jsx",
                    lineNumber: 179,
                    columnNumber: 24
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/Login.jsx",
                  lineNumber: 178,
                  columnNumber: 13
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/src/pages/Login.jsx",
                lineNumber: 170,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/src/pages/Login.jsx",
            lineNumber: 110,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/Login:166:8", "data-dynamic-content": "false", className: "text-center text-sm text-muted-foreground mt-6", children: [
            "Não tens conta?",
            " ",
            /* @__PURE__ */ jsxDEV(Link, { "data-source-location": "pages/Login:168:10", "data-dynamic-content": "false", to: "/register", className: "text-[#E87A5A] font-semibold hover:underline", children: "Criar conta" }, void 0, false, {
              fileName: "/app/src/pages/Login.jsx",
              lineNumber: 187,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/Login.jsx",
            lineNumber: 185,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/src/pages/Login.jsx",
        lineNumber: 66,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/src/pages/Login.jsx",
    lineNumber: 61,
    columnNumber: 5
  }, this);
}
_s(Login, "J4eLZjq4QBJH4I4NYDPF5hwGw7I=");
_c = Login;
var _c;
$RefreshReg$(_c, "Login");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/pages/Login.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/pages/Login.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QUs7QUFBQSxnQkFDTCxVQUFVRTtBQUFBQSxnQkFDVixXQUFVO0FBQUEsZ0JBRVBBLG9CQUNELHVCQUFDLFNBQUksd0JBQXFCLHNCQUFxQix3QkFBcUIsU0FBUSxXQUFVLCtFQUF0RjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUFpSyxJQUVqSztBQUFBO0FBQUEsa0JBQ1csdUJBQUMsY0FBVyx3QkFBcUIsc0JBQXFCLHdCQUFxQixTQUFRLFdBQVUsYUFBN0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBc0c7QUFBQSxxQkFEakg7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFFRTtBQUFBO0FBQUEsY0FWSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFZQTtBQUFBLGVBeEVGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBeUVBO0FBQUEsVUFFQSx1QkFBQyxPQUFFLHdCQUFxQixxQkFBb0Isd0JBQXFCLFNBQVEsV0FBVSxrREFBZ0Q7QUFBQTtBQUFBLFlBQ2pIO0FBQUEsWUFDaEIsdUJBQUMsUUFBSyx3QkFBcUIsc0JBQXFCLHdCQUFxQixTQUFRLElBQUcsYUFBWSxXQUFVLGdEQUE4QywyQkFBcEo7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFQTtBQUFBLGVBSkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFLQTtBQUFBO0FBQUE7QUFBQSxNQTVIRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUE2SEE7QUFBQSxPQWxJRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBbUlBO0FBRUo7QUFBQ1QsR0FwS3VCRCxPQUFLO0FBQUEsS0FBTEE7QUFBSyxJQUFBaUM7QUFBQSxhQUFBQSxJQUFBIiwibmFtZXMiOlsidXNlU3RhdGUiLCJMaW5rIiwiYmFzZTQ0IiwiQnV0dG9uIiwiSW5wdXQiLCJMYWJlbCIsIlNlcGFyYXRvciIsIm1vdGlvbiIsIk1haWwiLCJMb2NrIiwiTG9nSW4iLCJBcnJvd1JpZ2h0IiwiRXllIiwiRXllT2ZmIiwiTG9naW4iLCJfcyIsImVtYWlsIiwic2V0RW1haWwiLCJwYXNzd29yZCIsInNldFBhc3N3b3JkIiwic2hvd1Bhc3N3b3JkIiwic2V0U2hvd1Bhc3N3b3JkIiwiZXJyb3IiLCJzZXRFcnJvciIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiaGFuZGxlRW1haWxMb2dpbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImF1dGgiLCJsb2dpblZpYUVtYWlsUGFzc3dvcmQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJlcnIiLCJoYW5kbGVHb29nbGVMb2dpbiIsImxvZ2luV2l0aFByb3ZpZGVyIiwib3BhY2l0eSIsInkiLCJkdXJhdGlvbiIsImVhc2UiLCJzY2FsZSIsImRlbGF5IiwidHlwZSIsInN0aWZmbmVzcyIsInRhcmdldCIsInZhbHVlIiwiX2MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiTG9naW4uanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcbmltcG9ydCB7IGJhc2U0NCB9IGZyb20gXCJAL2FwaS9iYXNlNDRDbGllbnRcIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvYnV0dG9uXCI7XG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvaW5wdXRcIjtcbmltcG9ydCB7IExhYmVsIH0gZnJvbSBcIkAvY29tcG9uZW50cy91aS9sYWJlbFwiO1xuaW1wb3J0IHsgU2VwYXJhdG9yIH0gZnJvbSBcIkAvY29tcG9uZW50cy91aS9zZXBhcmF0b3JcIjtcbmltcG9ydCB7IG1vdGlvbiB9IGZyb20gXCJmcmFtZXItbW90aW9uXCI7XG5pbXBvcnQgeyBNYWlsLCBMb2NrLCBMb2dJbiwgQXJyb3dSaWdodCwgRXllLCBFeWVPZmYgfSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExvZ2luKCkge1xuICBjb25zdCBbZW1haWwsIHNldEVtYWlsXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbcGFzc3dvcmQsIHNldFBhc3N3b3JkXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbc2hvd1Bhc3N3b3JkLCBzZXRTaG93UGFzc3dvcmRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgaGFuZGxlRW1haWxMb2dpbiA9IGFzeW5jIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHNldEVycm9yKFwiXCIpO1xuICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGJhc2U0NC5hdXRoLmxvZ2luVmlhRW1haWxQYXNzd29yZChlbWFpbCwgcGFzc3dvcmQpO1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9cIjtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHNldEVycm9yKFwiRW1haWwgb3UgcGFzc3dvcmQgaW52w6FsaWRvcy5cIik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVHb29nbGVMb2dpbiA9IGFzeW5jICgpID0+IHtcbiAgICBzZXRFcnJvcihcIlwiKTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgYmFzZTQ0LmF1dGgubG9naW5XaXRoUHJvdmlkZXIoXCJnb29nbGVcIiwgXCIvXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgc2V0RXJyb3IoXCJFcnJvIGFvIGluaWNpYXIgc2Vzc8OjbyBjb20gR29vZ2xlLlwiKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTG9naW46NDI6NFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1jcmVhbSBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBweC02IHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgey8qIEJhY2tncm91bmQgZGVjb3JhdGl2ZSBjaXJjbGVzICovfVxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0xvZ2luOjQ0OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLVstMTIwcHhdIHJpZ2h0LVstMTIwcHhdIHctWzMwMHB4XSBoLVszMDBweF0gcm91bmRlZC1mdWxsIGJnLVsjRTg3QTVBXS8xMFwiIC8+XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTG9naW46NDU6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tWy04MHB4XSBsZWZ0LVstODBweF0gdy1bMjIwcHhdIGgtWzIyMHB4XSByb3VuZGVkLWZ1bGwgYmctWyNFODdBNUFdLzhcIiAvPlxuXG4gICAgICA8bW90aW9uLmRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0xvZ2luOjQ3OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB5OiAzMCB9fVxuICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB5OiAwIH19XG4gICAgICB0cmFuc2l0aW9uPXt7IGR1cmF0aW9uOiAwLjYsIGVhc2U6IFwiZWFzZU91dFwiIH19XG4gICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctc20gcmVsYXRpdmUgei0xMFwiPlxuICAgICAgICBcbiAgICAgICAgey8qIExvZ28gKi99XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Mb2dpbjo1NDo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgbWItMTBcIj5cbiAgICAgICAgICA8bW90aW9uLmRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0xvZ2luOjU1OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICBpbml0aWFsPXt7IHNjYWxlOiAwIH19XG4gICAgICAgICAgYW5pbWF0ZT17eyBzY2FsZTogMSB9fVxuICAgICAgICAgIHRyYW5zaXRpb249e3sgZGVsYXk6IDAuMiwgdHlwZTogXCJzcHJpbmdcIiwgc3RpZmZuZXNzOiAxNTAgfX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdy0yMCBoLTIwIHJvdW5kZWQtWzI4cHhdIGJnLVsjRTg3QTVBXSBzaGFkb3ctbGcgc2hhZG93LVsjRTg3QTVBXS8yNSBtYi01XCI+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTG9naW46NjE6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC00eGxcIj7wn42KPC9zcGFuPlxuICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICA8aDEgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Mb2dpbjo2MzoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1mb3JlZ3JvdW5kXCI+XG4gICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0xvZ2luOjY0OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1bI0U4N0E1QV0gdG8tWyNENDY5NEFdIGJnLWNsaXAtdGV4dCB0ZXh0LXRyYW5zcGFyZW50XCI+Rm9jdXM8L3NwYW4+Rmxvd1xuICAgICAgICAgIDwvaDE+XG4gICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Mb2dpbjo2NjoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LW11dGVkLWZvcmVncm91bmQgbXQtMS41IHRleHQtc21cIj5Qcm9kdXRpdmlkYWRlIGNvbSByaXRtbzwvcD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEdvb2dsZSBsb2dpbiAqL31cbiAgICAgICAgPEJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0xvZ2luOjcwOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICBvbkNsaWNrPXtoYW5kbGVHb29nbGVMb2dpbn1cbiAgICAgICAgdmFyaWFudD1cIm91dGxpbmVcIlxuICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC0xMiByb3VuZGVkLTJ4bCBib3JkZXItYm9yZGVyIGJnLXdoaXRlIGhvdmVyOmJnLXNlY29uZGFyeS81MCB0cmFuc2l0aW9uLWFsbCB0ZXh0LXNtIGZvbnQtbWVkaXVtIGdhcC0zXCI+XG4gICAgICAgICAgXG4gICAgICAgICAgPHN2ZyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0xvZ2luOjc1OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNSBoLTVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XG4gICAgICAgICAgICA8cGF0aCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0xvZ2luOjc2OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGZpbGw9XCIjNDI4NUY0XCIgZD1cIk0yMi41NiAxMi4yNWMwLS43OC0uMDctMS41My0uMi0yLjI1SDEydjQuMjZoNS45MmE1LjA2IDUuMDYgMCAwIDEtMi4yIDMuMzJ2Mi43N2gzLjU3YzIuMDgtMS45MiAzLjI4LTQuNzQgMy4yOC04LjF6XCIgLz5cbiAgICAgICAgICAgIDxwYXRoIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTG9naW46Nzc6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgZmlsbD1cIiMzNEE4NTNcIiBkPVwiTTEyIDIzYzIuOTcgMCA1LjQ2LS45OCA3LjI4LTIuNjZsLTMuNTctMi43N2MtLjk4LjY2LTIuMjMgMS4wNi0zLjcxIDEuMDYtMi44NiAwLTUuMjktMS45My02LjE2LTQuNTNIMi4xOHYyLjg0QzMuOTkgMjAuNTMgNy43IDIzIDEyIDIzelwiIC8+XG4gICAgICAgICAgICA8cGF0aCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0xvZ2luOjc4OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGZpbGw9XCIjRkJCQzA1XCIgZD1cIk01Ljg0IDE0LjA5Yy0uMjItLjY2LS4zNS0xLjM2LS4zNS0yLjA5cy4xMy0xLjQzLjM1LTIuMDlWNy4wN0gyLjE4QzEuNDMgOC41NSAxIDEwLjIyIDEgMTJzLjQzIDMuNDUgMS4xOCA0LjkzbDIuODUtMi4yMi44MS0uNjJ6XCIgLz5cbiAgICAgICAgICAgIDxwYXRoIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTG9naW46Nzk6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgZmlsbD1cIiNFQTQzMzVcIiBkPVwiTTEyIDUuMzhjMS42MiAwIDMuMDYuNTYgNC4yMSAxLjY0bDMuMTUtMy4xNUMxNy40NSAyLjA5IDE0Ljk3IDEgMTIgMSA3LjcgMSAzLjk5IDMuNDcgMi4xOCA3LjA3bDMuNjYgMi44NGMuODctMi42IDMuMy00LjUzIDYuMTYtNC41M3pcIiAvPlxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIENvbnRpbnVhciBjb20gR29vZ2xlXG4gICAgICAgIDwvQnV0dG9uPlxuXG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Mb2dpbjo4NDo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIG15LTZcIj5cbiAgICAgICAgICA8U2VwYXJhdG9yIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTG9naW46ODU6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZmxleC0xIGJnLWJvcmRlclwiIC8+XG4gICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Mb2dpbjo4NjoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBmb250LW1lZGl1bVwiPm91PC9zcGFuPlxuICAgICAgICAgIDxTZXBhcmF0b3IgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Mb2dpbjo4NzoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmbGV4LTEgYmctYm9yZGVyXCIgLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEVtYWlsIGxvZ2luICovfVxuICAgICAgICA8Zm9ybSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0xvZ2luOjkxOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvblN1Ym1pdD17aGFuZGxlRW1haWxMb2dpbn0gY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0xvZ2luOjkyOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgIDxMYWJlbCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0xvZ2luOjkzOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGh0bWxGb3I9XCJlbWFpbFwiIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1mb3JlZ3JvdW5kLzgwXCI+XG4gICAgICAgICAgICAgIEVtYWlsXG4gICAgICAgICAgICA8L0xhYmVsPlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0xvZ2luOjk2OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgICAgICAgPE1haWwgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Mb2dpbjo5NzoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBsZWZ0LTMuNSB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzIgdy00IGgtNCB0ZXh0LW11dGVkLWZvcmVncm91bmRcIiAvPlxuICAgICAgICAgICAgICA8SW5wdXQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Mb2dpbjo5ODoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICAgIGlkPVwiZW1haWxcIlxuICAgICAgICAgICAgICB0eXBlPVwiZW1haWxcIlxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIm8udGV1QGVtYWlsLmNvbVwiXG4gICAgICAgICAgICAgIHZhbHVlPXtlbWFpbH1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRFbWFpbChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInBsLTEwIGgtMTIgcm91bmRlZC0yeGwgYm9yZGVyLWJvcmRlciBiZy13aGl0ZVwiIC8+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTG9naW46MTEwOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgIDxMYWJlbCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0xvZ2luOjExMToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBodG1sRm9yPVwicGFzc3dvcmRcIiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZm9yZWdyb3VuZC84MFwiPlxuICAgICAgICAgICAgICBQYXNzd29yZFxuICAgICAgICAgICAgPC9MYWJlbD5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Mb2dpbjoxMTQ6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICA8TG9jayBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0xvZ2luOjExNToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBsZWZ0LTMuNSB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzIgdy00IGgtNCB0ZXh0LW11dGVkLWZvcmVncm91bmRcIiAvPlxuICAgICAgICAgICAgICA8SW5wdXQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Mb2dpbjoxMTY6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgICBpZD1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgdHlwZT17c2hvd1Bhc3N3b3JkID8gXCJ0ZXh0XCIgOiBcInBhc3N3b3JkXCJ9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiQSB0dWEgcGFzc3dvcmRcIlxuICAgICAgICAgICAgICB2YWx1ZT17cGFzc3dvcmR9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0UGFzc3dvcmQoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwbC0xMCBwci0xMCBoLTEyIHJvdW5kZWQtMnhsIGJvcmRlci1ib3JkZXIgYmctd2hpdGVcIiAvPlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0xvZ2luOjEyNToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93UGFzc3dvcmQoIXNob3dQYXNzd29yZCl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHJpZ2h0LTMuNSB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzIgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCI+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAge3Nob3dQYXNzd29yZCA/IDxFeWVPZmYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Mb2dpbjoxMzA6MzJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+IDogPEV5ZSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0xvZ2luOjEzMDo2NVwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz59XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTG9naW46MTM1OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1lbmRcIj5cbiAgICAgICAgICAgIDxMaW5rIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTG9naW46MTM2OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHRvPVwiL2ZvcmdvdC1wYXNzd29yZFwiIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1bI0U4N0E1QV0gaG92ZXI6dW5kZXJsaW5lIGZvbnQtbWVkaXVtXCI+XG4gICAgICAgICAgICAgIEVzcXVlY2VzdGUgYSBwYXNzd29yZD9cbiAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHtlcnJvciAmJlxuICAgICAgICAgIDxtb3Rpb24ucCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0xvZ2luOjE0MjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwIH19XG4gICAgICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiAxIH19XG4gICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWRlc3RydWN0aXZlIGJnLWRlc3RydWN0aXZlLzUgcm91bmRlZC14bCBweC00IHB5LTIuNSB0ZXh0LWNlbnRlclwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiZXJyb3JcIj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICB7ZXJyb3J9XG4gICAgICAgICAgICA8L21vdGlvbi5wPlxuICAgICAgICAgIH1cblxuICAgICAgICAgIDxCdXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9Mb2dpbjoxNTE6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgIGRpc2FibGVkPXtsb2FkaW5nfVxuICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLTEyIHJvdW5kZWQtMnhsIGJnLVsjRTg3QTVBXSBob3ZlcjpiZy1bI0Q0Njk0QV0gdGV4dC13aGl0ZSBmb250LXNlbWlib2xkIHRleHQtc20gc2hhZG93LWxnIHNoYWRvdy1bI0U4N0E1QV0vMjUgdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAge2xvYWRpbmcgP1xuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0xvZ2luOjE1NzoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTQgaC00IGJvcmRlci0yIGJvcmRlci13aGl0ZS8zMCBib3JkZXItdC13aGl0ZSByb3VuZGVkLWZ1bGwgYW5pbWF0ZS1zcGluXCIgLz4gOlxuXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIEVudHJhciA8QXJyb3dSaWdodCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0xvZ2luOjE2MDoyM1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvZm9ybT5cblxuICAgICAgICA8cCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0xvZ2luOjE2Njo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHRleHQtc20gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIG10LTZcIj5cbiAgICAgICAgICBOw6NvIHRlbnMgY29udGE/e1wiIFwifVxuICAgICAgICAgIDxMaW5rIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTG9naW46MTY4OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHRvPVwiL3JlZ2lzdGVyXCIgY2xhc3NOYW1lPVwidGV4dC1bI0U4N0E1QV0gZm9udC1zZW1pYm9sZCBob3Zlcjp1bmRlcmxpbmVcIj5cbiAgICAgICAgICAgIENyaWFyIGNvbnRhXG4gICAgICAgICAgPC9MaW5rPlxuICAgICAgICA8L3A+XG4gICAgICA8L21vdGlvbi5kaXY+XG4gICAgPC9kaXY+KTtcblxufSJdLCJmaWxlIjoiL2FwcC9zcmMvcGFnZXMvTG9naW4uanN4In0=