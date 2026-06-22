import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/Register.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/pages/Register.jsx");
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
import { Mail, Lock, UserPlus, ArrowRight, Eye, EyeOff, Check } from "/node_modules/.vite/deps/lucide-react.js?v=aefa7968";
export default function Register() {
  _s();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("register");
  const [otp, setOtp] = useState("");
  const handleRegister = async (e) => {
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
      await base44.auth.register({ email, password });
      setStep("otp");
    } catch (err) {
      setError("Erro ao criar conta. Verifica o email.");
    } finally {
      setLoading(false);
    }
  };
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await base44.auth.verifyOtp({ email, otpCode: otp });
      await base44.auth.setToken(result.access_token);
      window.location.href = "/";
    } catch (err) {
      setError("Código inválido. Tenta novamente.");
    } finally {
      setLoading(false);
    }
  };
  const handleResendOtp = async () => {
    try {
      await base44.auth.resendOtp(email);
    } catch (err) {
    }
  };
  const handleGoogleLogin = async () => {
    try {
      await base44.auth.loginWithProvider("google", "/");
    } catch (err) {
      setError("Erro ao iniciar sessão com Google.");
    }
  };
  if (step === "otp") {
    return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Register:78:6", "data-dynamic-content": "true", className: "min-h-screen bg-cream flex flex-col items-center justify-center px-6 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Register:79:8", "data-dynamic-content": "false", className: "absolute top-[-120px] right-[-120px] w-[300px] h-[300px] rounded-full bg-[#E87A5A]/10" }, void 0, false, {
        fileName: "/app/src/pages/Register.jsx",
        lineNumber: 98,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Register:80:8", "data-dynamic-content": "false", className: "absolute bottom-[-80px] left-[-80px] w-[220px] h-[220px] rounded-full bg-[#E87A5A]/8" }, void 0, false, {
        fileName: "/app/src/pages/Register.jsx",
        lineNumber: 99,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          "data-source-location": "pages/Register:82:8",
          "data-dynamic-content": "true",
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          className: "w-full max-w-sm relative z-10",
          children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Register:87:10", "data-dynamic-content": "true", className: "text-center mb-10", children: [
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Register:88:12", "data-dynamic-content": "false", className: "inline-flex items-center justify-center w-20 h-20 rounded-[28px] bg-[#E87A5A] shadow-lg shadow-[#E87A5A]/25 mb-5", children: /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/Register:89:14", "data-dynamic-content": "false", className: "text-4xl", children: "📬" }, void 0, false, {
                fileName: "/app/src/pages/Register.jsx",
                lineNumber: 108,
                columnNumber: 15
              }, this) }, void 0, false, {
                fileName: "/app/src/pages/Register.jsx",
                lineNumber: 107,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("h1", { "data-source-location": "pages/Register:91:12", "data-dynamic-content": "false", className: "text-2xl font-bold text-foreground", children: "Verifica o email" }, void 0, false, {
                fileName: "/app/src/pages/Register.jsx",
                lineNumber: 110,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/Register:92:12", "data-dynamic-content": "false", className: "text-muted-foreground mt-1.5 text-sm", children: "FocusFlow" }, void 0, false, {
                fileName: "/app/src/pages/Register.jsx",
                lineNumber: 111,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/Register:93:12", "data-dynamic-content": "true", className: "text-muted-foreground mt-1.5 text-sm", children: [
                "Enviámos um código para ",
                /* @__PURE__ */ jsxDEV("strong", { "data-source-location": "pages/Register:94:38", "data-dynamic-content": "true", "data-collection-item-field": "email", children: email }, void 0, false, {
                  fileName: "/app/src/pages/Register.jsx",
                  lineNumber: 113,
                  columnNumber: 39
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/Register.jsx",
                lineNumber: 112,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/Register.jsx",
              lineNumber: 106,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("form", { "data-source-location": "pages/Register:98:10", "data-dynamic-content": "true", onSubmit: handleVerifyOtp, className: "space-y-4", children: [
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Register:99:12", "data-dynamic-content": "true", className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxDEV(Label, { "data-source-location": "pages/Register:100:14", "data-dynamic-content": "false", className: "text-sm font-medium text-foreground/80", children: "Código OTP" }, void 0, false, {
                  fileName: "/app/src/pages/Register.jsx",
                  lineNumber: 119,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV(
                  Input,
                  {
                    "data-source-location": "pages/Register:101:14",
                    "data-dynamic-content": "true",
                    type: "text",
                    placeholder: "000000",
                    value: otp,
                    onChange: (e) => setOtp(e.target.value),
                    required: true,
                    maxLength: 6,
                    className: "h-12 rounded-2xl border-border bg-white text-center text-lg tracking-[0.3em]"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/src/pages/Register.jsx",
                    lineNumber: 120,
                    columnNumber: 15
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/src/pages/Register.jsx",
                lineNumber: 118,
                columnNumber: 13
              }, this),
              error && /* @__PURE__ */ jsxDEV(motion.p, { "data-source-location": "pages/Register:113:14", "data-dynamic-content": "true", initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-sm text-destructive bg-destructive/5 rounded-xl px-4 py-2.5 text-center", "data-collection-item-field": "error", children: error }, void 0, false, {
                fileName: "/app/src/pages/Register.jsx",
                lineNumber: 132,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV(
                Button,
                {
                  "data-source-location": "pages/Register:118:12",
                  "data-dynamic-content": "true",
                  type: "submit",
                  disabled: loading || otp.length < 6,
                  className: "w-full h-12 rounded-2xl bg-[#E87A5A] hover:bg-[#D4694A] text-white font-semibold text-sm shadow-lg shadow-[#E87A5A]/25 flex items-center gap-2",
                  children: loading ? /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Register:124:16", "data-dynamic-content": "false", className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }, void 0, false, {
                    fileName: "/app/src/pages/Register.jsx",
                    lineNumber: 143,
                    columnNumber: 15
                  }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                    "Verificar ",
                    /* @__PURE__ */ jsxDEV(Check, { "data-source-location": "pages/Register:127:28", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                      fileName: "/app/src/pages/Register.jsx",
                      lineNumber: 146,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/Register.jsx",
                    lineNumber: 145,
                    columnNumber: 15
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/src/pages/Register.jsx",
                  lineNumber: 137,
                  columnNumber: 13
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/Register:132:12", "data-dynamic-content": "true", type: "button", onClick: handleResendOtp, className: "w-full text-center text-sm text-[#E87A5A] hover:underline font-medium", children: "Reenviar código" }, void 0, false, {
                fileName: "/app/src/pages/Register.jsx",
                lineNumber: 151,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/Register.jsx",
              lineNumber: 117,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/src/pages/Register.jsx",
          lineNumber: 101,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/src/pages/Register.jsx",
      lineNumber: 97,
      columnNumber: 7
    }, this);
  }
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Register:142:4", "data-dynamic-content": "true", className: "min-h-screen bg-cream flex flex-col items-center justify-center px-6 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Register:143:6", "data-dynamic-content": "false", className: "absolute top-[-120px] right-[-120px] w-[300px] h-[300px] rounded-full bg-[#E87A5A]/10" }, void 0, false, {
      fileName: "/app/src/pages/Register.jsx",
      lineNumber: 162,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Register:144:6", "data-dynamic-content": "false", className: "absolute bottom-[-80px] left-[-80px] w-[220px] h-[220px] rounded-full bg-[#E87A5A]/8" }, void 0, false, {
      fileName: "/app/src/pages/Register.jsx",
      lineNumber: 163,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        "data-source-location": "pages/Register:146:6",
        "data-dynamic-content": "true",
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
        className: "w-full max-w-sm relative z-10",
        children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Register:152:8", "data-dynamic-content": "true", className: "text-center mb-10", children: [
            /* @__PURE__ */ jsxDEV(
              motion.div,
              {
                "data-source-location": "pages/Register:153:10",
                "data-dynamic-content": "true",
                initial: { scale: 0 },
                animate: { scale: 1 },
                transition: { delay: 0.2, type: "spring", stiffness: 150 },
                className: "inline-flex items-center justify-center w-20 h-20 rounded-[28px] bg-[#E87A5A] shadow-lg shadow-[#E87A5A]/25 mb-5",
                children: /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/Register:159:12", "data-dynamic-content": "false", className: "text-4xl", children: "🍊" }, void 0, false, {
                  fileName: "/app/src/pages/Register.jsx",
                  lineNumber: 178,
                  columnNumber: 13
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/src/pages/Register.jsx",
                lineNumber: 172,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("h1", { "data-source-location": "pages/Register:161:10", "data-dynamic-content": "false", className: "text-2xl font-bold text-foreground", children: "Criar conta" }, void 0, false, {
              fileName: "/app/src/pages/Register.jsx",
              lineNumber: 180,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/Register:162:10", "data-dynamic-content": "false", className: "text-muted-foreground mt-1.5 text-sm", children: "Começa a tua jornada no FocusFlow" }, void 0, false, {
              fileName: "/app/src/pages/Register.jsx",
              lineNumber: 181,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/Register.jsx",
            lineNumber: 171,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV(
            Button,
            {
              "data-source-location": "pages/Register:165:8",
              "data-dynamic-content": "true",
              onClick: handleGoogleLogin,
              variant: "outline",
              className: "w-full h-12 rounded-2xl border-border bg-white hover:bg-secondary/50 transition-all text-sm font-medium gap-3",
              children: [
                /* @__PURE__ */ jsxDEV("svg", { "data-source-location": "pages/Register:170:10", "data-dynamic-content": "false", className: "w-5 h-5", viewBox: "0 0 24 24", children: [
                  /* @__PURE__ */ jsxDEV("path", { "data-source-location": "pages/Register:171:12", "data-dynamic-content": "false", fill: "#4285F4", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" }, void 0, false, {
                    fileName: "/app/src/pages/Register.jsx",
                    lineNumber: 190,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV("path", { "data-source-location": "pages/Register:172:12", "data-dynamic-content": "false", fill: "#34A853", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }, void 0, false, {
                    fileName: "/app/src/pages/Register.jsx",
                    lineNumber: 191,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV("path", { "data-source-location": "pages/Register:173:12", "data-dynamic-content": "false", fill: "#FBBC05", d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" }, void 0, false, {
                    fileName: "/app/src/pages/Register.jsx",
                    lineNumber: 192,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV("path", { "data-source-location": "pages/Register:174:12", "data-dynamic-content": "false", fill: "#EA4335", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" }, void 0, false, {
                    fileName: "/app/src/pages/Register.jsx",
                    lineNumber: 193,
                    columnNumber: 13
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/Register.jsx",
                  lineNumber: 189,
                  columnNumber: 11
                }, this),
                "Continuar com Google"
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/src/pages/Register.jsx",
              lineNumber: 184,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Register:179:8", "data-dynamic-content": "false", className: "flex items-center gap-3 my-6", children: [
            /* @__PURE__ */ jsxDEV(Separator, { "data-source-location": "pages/Register:180:10", "data-dynamic-content": "false", className: "flex-1 bg-border" }, void 0, false, {
              fileName: "/app/src/pages/Register.jsx",
              lineNumber: 199,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/Register:181:10", "data-dynamic-content": "false", className: "text-xs text-muted-foreground font-medium", children: "ou" }, void 0, false, {
              fileName: "/app/src/pages/Register.jsx",
              lineNumber: 200,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV(Separator, { "data-source-location": "pages/Register:182:10", "data-dynamic-content": "false", className: "flex-1 bg-border" }, void 0, false, {
              fileName: "/app/src/pages/Register.jsx",
              lineNumber: 201,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/Register.jsx",
            lineNumber: 198,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("form", { "data-source-location": "pages/Register:185:8", "data-dynamic-content": "true", onSubmit: handleRegister, className: "space-y-4", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Register:186:10", "data-dynamic-content": "true", className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxDEV(Label, { "data-source-location": "pages/Register:187:12", "data-dynamic-content": "false", htmlFor: "email", className: "text-sm font-medium text-foreground/80", children: "Email" }, void 0, false, {
                fileName: "/app/src/pages/Register.jsx",
                lineNumber: 206,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Register:188:12", "data-dynamic-content": "true", className: "relative", children: [
                /* @__PURE__ */ jsxDEV(Mail, { "data-source-location": "pages/Register:189:14", "data-dynamic-content": "false", className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }, void 0, false, {
                  fileName: "/app/src/pages/Register.jsx",
                  lineNumber: 208,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV(Input, { "data-source-location": "pages/Register:190:14", "data-dynamic-content": "true", id: "email", type: "email", placeholder: "o.teu@email.com", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "pl-10 h-12 rounded-2xl border-border bg-white" }, void 0, false, {
                  fileName: "/app/src/pages/Register.jsx",
                  lineNumber: 209,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/Register.jsx",
                lineNumber: 207,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/Register.jsx",
              lineNumber: 205,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Register:194:10", "data-dynamic-content": "true", className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxDEV(Label, { "data-source-location": "pages/Register:195:12", "data-dynamic-content": "false", htmlFor: "password", className: "text-sm font-medium text-foreground/80", children: "Password" }, void 0, false, {
                fileName: "/app/src/pages/Register.jsx",
                lineNumber: 214,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Register:196:12", "data-dynamic-content": "true", className: "relative", children: [
                /* @__PURE__ */ jsxDEV(Lock, { "data-source-location": "pages/Register:197:14", "data-dynamic-content": "false", className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }, void 0, false, {
                  fileName: "/app/src/pages/Register.jsx",
                  lineNumber: 216,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV(Input, { "data-source-location": "pages/Register:198:14", "data-dynamic-content": "true", id: "password", type: showPassword ? "text" : "password", placeholder: "Mínimo 6 caracteres", value: password, onChange: (e) => setPassword(e.target.value), required: true, className: "pl-10 pr-10 h-12 rounded-2xl border-border bg-white" }, void 0, false, {
                  fileName: "/app/src/pages/Register.jsx",
                  lineNumber: 217,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/Register:199:14", "data-dynamic-content": "true", type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground", children: showPassword ? /* @__PURE__ */ jsxDEV(EyeOff, { "data-source-location": "pages/Register:200:32", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/src/pages/Register.jsx",
                  lineNumber: 219,
                  columnNumber: 33
                }, this) : /* @__PURE__ */ jsxDEV(Eye, { "data-source-location": "pages/Register:200:65", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/src/pages/Register.jsx",
                  lineNumber: 219,
                  columnNumber: 140
                }, this) }, void 0, false, {
                  fileName: "/app/src/pages/Register.jsx",
                  lineNumber: 218,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/Register.jsx",
                lineNumber: 215,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/Register.jsx",
              lineNumber: 213,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Register:205:10", "data-dynamic-content": "true", className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxDEV(Label, { "data-source-location": "pages/Register:206:12", "data-dynamic-content": "false", htmlFor: "confirmPassword", className: "text-sm font-medium text-foreground/80", children: "Confirmar Password" }, void 0, false, {
                fileName: "/app/src/pages/Register.jsx",
                lineNumber: 225,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Register:207:12", "data-dynamic-content": "true", className: "relative", children: [
                /* @__PURE__ */ jsxDEV(Lock, { "data-source-location": "pages/Register:208:14", "data-dynamic-content": "false", className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }, void 0, false, {
                  fileName: "/app/src/pages/Register.jsx",
                  lineNumber: 227,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV(Input, { "data-source-location": "pages/Register:209:14", "data-dynamic-content": "true", id: "confirmPassword", type: showPassword ? "text" : "password", placeholder: "Repete a password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), required: true, className: "pl-10 h-12 rounded-2xl border-border bg-white" }, void 0, false, {
                  fileName: "/app/src/pages/Register.jsx",
                  lineNumber: 228,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/Register.jsx",
                lineNumber: 226,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/Register.jsx",
              lineNumber: 224,
              columnNumber: 11
            }, this),
            error && /* @__PURE__ */ jsxDEV(motion.p, { "data-source-location": "pages/Register:214:12", "data-dynamic-content": "true", initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-sm text-destructive bg-destructive/5 rounded-xl px-4 py-2.5 text-center", "data-collection-item-field": "error", children: error }, void 0, false, {
              fileName: "/app/src/pages/Register.jsx",
              lineNumber: 233,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV(Button, { "data-source-location": "pages/Register:219:10", "data-dynamic-content": "true", type: "submit", disabled: loading, className: "w-full h-12 rounded-2xl bg-[#E87A5A] hover:bg-[#D4694A] text-white font-semibold text-sm shadow-lg shadow-[#E87A5A]/25 flex items-center gap-2", children: loading ? /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Register:221:14", "data-dynamic-content": "false", className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }, void 0, false, {
              fileName: "/app/src/pages/Register.jsx",
              lineNumber: 240,
              columnNumber: 13
            }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
              "Criar conta ",
              /* @__PURE__ */ jsxDEV(ArrowRight, { "data-source-location": "pages/Register:224:28", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/src/pages/Register.jsx",
                lineNumber: 243,
                columnNumber: 29
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/Register.jsx",
              lineNumber: 242,
              columnNumber: 13
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/Register.jsx",
              lineNumber: 238,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/Register.jsx",
            lineNumber: 204,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/Register:230:8", "data-dynamic-content": "false", className: "text-center text-sm text-muted-foreground mt-6", children: [
            "Já tens conta?",
            " ",
            /* @__PURE__ */ jsxDEV(Link, { "data-source-location": "pages/Register:232:10", "data-dynamic-content": "false", to: "/login", className: "text-[#E87A5A] font-semibold hover:underline", children: "Entrar" }, void 0, false, {
              fileName: "/app/src/pages/Register.jsx",
              lineNumber: 251,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/Register.jsx",
            lineNumber: 249,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/src/pages/Register.jsx",
        lineNumber: 165,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/src/pages/Register.jsx",
    lineNumber: 161,
    columnNumber: 5
  }, this);
}
_s(Register, "LPrkyuNDiWwO+6qFnoAd4A7IC8k=");
_c = Register;
var _c;
$RefreshReg$(_c, "Register");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/pages/Register.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/pages/Register.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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RjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUtBO0FBQUE7QUFBQTtBQUFBLE1BekZGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQTBGQTtBQUFBLE9BOUZGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0ErRkE7QUFFSjtBQUFDWCxHQXBPdUJELFVBQVE7QUFBQSxLQUFSQTtBQUFRLElBQUFnRDtBQUFBLGFBQUFBLElBQUEiLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsIkxpbmsiLCJiYXNlNDQiLCJCdXR0b24iLCJJbnB1dCIsIkxhYmVsIiwiU2VwYXJhdG9yIiwibW90aW9uIiwiTWFpbCIsIkxvY2siLCJVc2VyUGx1cyIsIkFycm93UmlnaHQiLCJFeWUiLCJFeWVPZmYiLCJDaGVjayIsIlJlZ2lzdGVyIiwiX3MiLCJlbWFpbCIsInNldEVtYWlsIiwicGFzc3dvcmQiLCJzZXRQYXNzd29yZCIsImNvbmZpcm1QYXNzd29yZCIsInNldENvbmZpcm1QYXNzd29yZCIsInNob3dQYXNzd29yZCIsInNldFNob3dQYXNzd29yZCIsImVycm9yIiwic2V0RXJyb3IiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsInN0ZXAiLCJzZXRTdGVwIiwib3RwIiwic2V0T3RwIiwiaGFuZGxlUmVnaXN0ZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJsZW5ndGgiLCJhdXRoIiwicmVnaXN0ZXIiLCJlcnIiLCJoYW5kbGVWZXJpZnlPdHAiLCJyZXN1bHQiLCJ2ZXJpZnlPdHAiLCJvdHBDb2RlIiwic2V0VG9rZW4iLCJhY2Nlc3NfdG9rZW4iLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJoYW5kbGVSZXNlbmRPdHAiLCJyZXNlbmRPdHAiLCJoYW5kbGVHb29nbGVMb2dpbiIsImxvZ2luV2l0aFByb3ZpZGVyIiwib3BhY2l0eSIsInkiLCJ0YXJnZXQiLCJ2YWx1ZSIsImR1cmF0aW9uIiwiZWFzZSIsInNjYWxlIiwiZGVsYXkiLCJ0eXBlIiwic3RpZmZuZXNzIiwiX2MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiUmVnaXN0ZXIuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcbmltcG9ydCB7IGJhc2U0NCB9IGZyb20gXCJAL2FwaS9iYXNlNDRDbGllbnRcIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvYnV0dG9uXCI7XG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvaW5wdXRcIjtcbmltcG9ydCB7IExhYmVsIH0gZnJvbSBcIkAvY29tcG9uZW50cy91aS9sYWJlbFwiO1xuaW1wb3J0IHsgU2VwYXJhdG9yIH0gZnJvbSBcIkAvY29tcG9uZW50cy91aS9zZXBhcmF0b3JcIjtcbmltcG9ydCB7IG1vdGlvbiB9IGZyb20gXCJmcmFtZXItbW90aW9uXCI7XG5pbXBvcnQgeyBNYWlsLCBMb2NrLCBVc2VyUGx1cywgQXJyb3dSaWdodCwgRXllLCBFeWVPZmYsIENoZWNrIH0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZWdpc3RlcigpIHtcbiAgY29uc3QgW2VtYWlsLCBzZXRFbWFpbF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3Bhc3N3b3JkLCBzZXRQYXNzd29yZF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2NvbmZpcm1QYXNzd29yZCwgc2V0Q29uZmlybVBhc3N3b3JkXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbc2hvd1Bhc3N3b3JkLCBzZXRTaG93UGFzc3dvcmRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzdGVwLCBzZXRTdGVwXSA9IHVzZVN0YXRlKFwicmVnaXN0ZXJcIik7XG4gIGNvbnN0IFtvdHAsIHNldE90cF0gPSB1c2VTdGF0ZShcIlwiKTtcblxuICBjb25zdCBoYW5kbGVSZWdpc3RlciA9IGFzeW5jIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHNldEVycm9yKFwiXCIpO1xuXG4gICAgaWYgKHBhc3N3b3JkICE9PSBjb25maXJtUGFzc3dvcmQpIHtcbiAgICAgIHNldEVycm9yKFwiQXMgcGFzc3dvcmRzIG7Do28gY29pbmNpZGVtLlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHBhc3N3b3JkLmxlbmd0aCA8IDYpIHtcbiAgICAgIHNldEVycm9yKFwiQSBwYXNzd29yZCBkZXZlIHRlciBwZWxvIG1lbm9zIDYgY2FyYWN0ZXJlcy5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgYmFzZTQ0LmF1dGgucmVnaXN0ZXIoeyBlbWFpbCwgcGFzc3dvcmQgfSk7XG4gICAgICBzZXRTdGVwKFwib3RwXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgc2V0RXJyb3IoXCJFcnJvIGFvIGNyaWFyIGNvbnRhLiBWZXJpZmljYSBvIGVtYWlsLlwiKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVZlcmlmeU90cCA9IGFzeW5jIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHNldEVycm9yKFwiXCIpO1xuICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGJhc2U0NC5hdXRoLnZlcmlmeU90cCh7IGVtYWlsLCBvdHBDb2RlOiBvdHAgfSk7XG4gICAgICBhd2FpdCBiYXNlNDQuYXV0aC5zZXRUb2tlbihyZXN1bHQuYWNjZXNzX3Rva2VuKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvXCI7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBzZXRFcnJvcihcIkPDs2RpZ28gaW52w6FsaWRvLiBUZW50YSBub3ZhbWVudGUuXCIpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUmVzZW5kT3RwID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBiYXNlNDQuYXV0aC5yZXNlbmRPdHAoZW1haWwpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuXG4gICAgICAvLyBpZ25vcmVcbiAgICB9fTtcblxuICBjb25zdCBoYW5kbGVHb29nbGVMb2dpbiA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgYmFzZTQ0LmF1dGgubG9naW5XaXRoUHJvdmlkZXIoXCJnb29nbGVcIiwgXCIvXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgc2V0RXJyb3IoXCJFcnJvIGFvIGluaWNpYXIgc2Vzc8OjbyBjb20gR29vZ2xlLlwiKTtcbiAgICB9XG4gIH07XG5cbiAgaWYgKHN0ZXAgPT09IFwib3RwXCIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1JlZ2lzdGVyOjc4OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctY3JlYW0gZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcHgtNiByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1JlZ2lzdGVyOjc5OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLVstMTIwcHhdIHJpZ2h0LVstMTIwcHhdIHctWzMwMHB4XSBoLVszMDBweF0gcm91bmRlZC1mdWxsIGJnLVsjRTg3QTVBXS8xMFwiIC8+XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZWdpc3Rlcjo4MDo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS1bLTgwcHhdIGxlZnQtWy04MHB4XSB3LVsyMjBweF0gaC1bMjIwcHhdIHJvdW5kZWQtZnVsbCBiZy1bI0U4N0E1QV0vOFwiIC8+XG5cbiAgICAgICAgPG1vdGlvbi5kaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZWdpc3Rlcjo4Mjo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB5OiAzMCB9fVxuICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHk6IDAgfX1cbiAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LXNtIHJlbGF0aXZlIHotMTBcIj5cbiAgICAgICAgICBcbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVnaXN0ZXI6ODc6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBtYi0xMFwiPlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1JlZ2lzdGVyOjg4OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB3LTIwIGgtMjAgcm91bmRlZC1bMjhweF0gYmctWyNFODdBNUFdIHNoYWRvdy1sZyBzaGFkb3ctWyNFODdBNUFdLzI1IG1iLTVcIj5cbiAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZWdpc3Rlcjo4OToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LTR4bFwiPvCfk6w8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxoMSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1JlZ2lzdGVyOjkxOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWZvcmVncm91bmRcIj5WZXJpZmljYSBvIGVtYWlsPC9oMT5cbiAgICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVnaXN0ZXI6OTI6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1tdXRlZC1mb3JlZ3JvdW5kIG10LTEuNSB0ZXh0LXNtXCI+Rm9jdXNGbG93PC9wPlxuICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZWdpc3Rlcjo5MzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQtbXV0ZWQtZm9yZWdyb3VuZCBtdC0xLjUgdGV4dC1zbVwiPlxuICAgICAgICAgICAgICBFbnZpw6Ftb3MgdW0gY8OzZGlnbyBwYXJhIDxzdHJvbmcgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZWdpc3Rlcjo5NDozOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiZW1haWxcIj57ZW1haWx9PC9zdHJvbmc+XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8Zm9ybSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1JlZ2lzdGVyOjk4OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25TdWJtaXQ9e2hhbmRsZVZlcmlmeU90cH0gY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVnaXN0ZXI6OTk6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICA8TGFiZWwgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZWdpc3RlcjoxMDA6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWZvcmVncm91bmQvODBcIj5Dw7NkaWdvIE9UUDwvTGFiZWw+XG4gICAgICAgICAgICAgIDxJbnB1dCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1JlZ2lzdGVyOjEwMToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCIwMDAwMDBcIlxuICAgICAgICAgICAgICB2YWx1ZT17b3RwfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldE90cChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgIG1heExlbmd0aD17Nn1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC0xMiByb3VuZGVkLTJ4bCBib3JkZXItYm9yZGVyIGJnLXdoaXRlIHRleHQtY2VudGVyIHRleHQtbGcgdHJhY2tpbmctWzAuM2VtXVwiIC8+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHtlcnJvciAmJlxuICAgICAgICAgICAgPG1vdGlvbi5wIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVnaXN0ZXI6MTEzOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgaW5pdGlhbD17eyBvcGFjaXR5OiAwIH19IGFuaW1hdGU9e3sgb3BhY2l0eTogMSB9fSBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtZGVzdHJ1Y3RpdmUgYmctZGVzdHJ1Y3RpdmUvNSByb3VuZGVkLXhsIHB4LTQgcHktMi41IHRleHQtY2VudGVyXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJlcnJvclwiPlxuICAgICAgICAgICAgICAgIHtlcnJvcn1cbiAgICAgICAgICAgICAgPC9tb3Rpb24ucD5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPEJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1JlZ2lzdGVyOjExODoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgIGRpc2FibGVkPXtsb2FkaW5nIHx8IG90cC5sZW5ndGggPCA2fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGgtMTIgcm91bmRlZC0yeGwgYmctWyNFODdBNUFdIGhvdmVyOmJnLVsjRDQ2OTRBXSB0ZXh0LXdoaXRlIGZvbnQtc2VtaWJvbGQgdGV4dC1zbSBzaGFkb3ctbGcgc2hhZG93LVsjRTg3QTVBXS8yNSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAge2xvYWRpbmcgP1xuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVnaXN0ZXI6MTI0OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNCBoLTQgYm9yZGVyLTIgYm9yZGVyLXdoaXRlLzMwIGJvcmRlci10LXdoaXRlIHJvdW5kZWQtZnVsbCBhbmltYXRlLXNwaW5cIiAvPiA6XG5cbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIFZlcmlmaWNhciA8Q2hlY2sgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZWdpc3RlcjoxMjc6MjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuXG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVnaXN0ZXI6MTMyOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e2hhbmRsZVJlc2VuZE90cH0gY2xhc3NOYW1lPVwidy1mdWxsIHRleHQtY2VudGVyIHRleHQtc20gdGV4dC1bI0U4N0E1QV0gaG92ZXI6dW5kZXJsaW5lIGZvbnQtbWVkaXVtXCI+XG4gICAgICAgICAgICAgIFJlZW52aWFyIGPDs2RpZ29cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgPC9kaXY+KTtcblxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVnaXN0ZXI6MTQyOjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctY3JlYW0gZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcHgtNiByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZWdpc3RlcjoxNDM6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtWy0xMjBweF0gcmlnaHQtWy0xMjBweF0gdy1bMzAwcHhdIGgtWzMwMHB4XSByb3VuZGVkLWZ1bGwgYmctWyNFODdBNUFdLzEwXCIgLz5cbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZWdpc3RlcjoxNDQ6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tWy04MHB4XSBsZWZ0LVstODBweF0gdy1bMjIwcHhdIGgtWzIyMHB4XSByb3VuZGVkLWZ1bGwgYmctWyNFODdBNUFdLzhcIiAvPlxuXG4gICAgICA8bW90aW9uLmRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1JlZ2lzdGVyOjE0Njo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeTogMzAgfX1cbiAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgeTogMCB9fVxuICAgICAgdHJhbnNpdGlvbj17eyBkdXJhdGlvbjogMC42LCBlYXNlOiBcImVhc2VPdXRcIiB9fVxuICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LXNtIHJlbGF0aXZlIHotMTBcIj5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZWdpc3RlcjoxNTI6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQtY2VudGVyIG1iLTEwXCI+XG4gICAgICAgICAgPG1vdGlvbi5kaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZWdpc3RlcjoxNTM6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgIGluaXRpYWw9e3sgc2NhbGU6IDAgfX1cbiAgICAgICAgICBhbmltYXRlPXt7IHNjYWxlOiAxIH19XG4gICAgICAgICAgdHJhbnNpdGlvbj17eyBkZWxheTogMC4yLCB0eXBlOiBcInNwcmluZ1wiLCBzdGlmZm5lc3M6IDE1MCB9fVxuICAgICAgICAgIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB3LTIwIGgtMjAgcm91bmRlZC1bMjhweF0gYmctWyNFODdBNUFdIHNoYWRvdy1sZyBzaGFkb3ctWyNFODdBNUFdLzI1IG1iLTVcIj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZWdpc3RlcjoxNTk6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC00eGxcIj7wn42KPC9zcGFuPlxuICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICA8aDEgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZWdpc3RlcjoxNjE6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtZm9yZWdyb3VuZFwiPkNyaWFyIGNvbnRhPC9oMT5cbiAgICAgICAgICA8cCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1JlZ2lzdGVyOjE2MjoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LW11dGVkLWZvcmVncm91bmQgbXQtMS41IHRleHQtc21cIj5Db21lw6dhIGEgdHVhIGpvcm5hZGEgbm8gRm9jdXNGbG93PC9wPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8QnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVnaXN0ZXI6MTY1OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICBvbkNsaWNrPXtoYW5kbGVHb29nbGVMb2dpbn1cbiAgICAgICAgdmFyaWFudD1cIm91dGxpbmVcIlxuICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC0xMiByb3VuZGVkLTJ4bCBib3JkZXItYm9yZGVyIGJnLXdoaXRlIGhvdmVyOmJnLXNlY29uZGFyeS81MCB0cmFuc2l0aW9uLWFsbCB0ZXh0LXNtIGZvbnQtbWVkaXVtIGdhcC0zXCI+XG4gICAgICAgICAgXG4gICAgICAgICAgPHN2ZyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1JlZ2lzdGVyOjE3MDoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTUgaC01XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxuICAgICAgICAgICAgPHBhdGggZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZWdpc3RlcjoxNzE6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgZmlsbD1cIiM0Mjg1RjRcIiBkPVwiTTIyLjU2IDEyLjI1YzAtLjc4LS4wNy0xLjUzLS4yLTIuMjVIMTJ2NC4yNmg1LjkyYTUuMDYgNS4wNiAwIDAgMS0yLjIgMy4zMnYyLjc3aDMuNTdjMi4wOC0xLjkyIDMuMjgtNC43NCAzLjI4LTguMXpcIiAvPlxuICAgICAgICAgICAgPHBhdGggZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZWdpc3RlcjoxNzI6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgZmlsbD1cIiMzNEE4NTNcIiBkPVwiTTEyIDIzYzIuOTcgMCA1LjQ2LS45OCA3LjI4LTIuNjZsLTMuNTctMi43N2MtLjk4LjY2LTIuMjMgMS4wNi0zLjcxIDEuMDYtMi44NiAwLTUuMjktMS45My02LjE2LTQuNTNIMi4xOHYyLjg0QzMuOTkgMjAuNTMgNy43IDIzIDEyIDIzelwiIC8+XG4gICAgICAgICAgICA8cGF0aCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1JlZ2lzdGVyOjE3MzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBmaWxsPVwiI0ZCQkMwNVwiIGQ9XCJNNS44NCAxNC4wOWMtLjIyLS42Ni0uMzUtMS4zNi0uMzUtMi4wOXMuMTMtMS40My4zNS0yLjA5VjcuMDdIMi4xOEMxLjQzIDguNTUgMSAxMC4yMiAxIDEycy40MyAzLjQ1IDEuMTggNC45M2wyLjg1LTIuMjIuODEtLjYyelwiIC8+XG4gICAgICAgICAgICA8cGF0aCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1JlZ2lzdGVyOjE3NDoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBmaWxsPVwiI0VBNDMzNVwiIGQ9XCJNMTIgNS4zOGMxLjYyIDAgMy4wNi41NiA0LjIxIDEuNjRsMy4xNS0zLjE1QzE3LjQ1IDIuMDkgMTQuOTcgMSAxMiAxIDcuNyAxIDMuOTkgMy40NyAyLjE4IDcuMDdsMy42NiAyLjg0Yy44Ny0yLjYgMy4zLTQuNTMgNi4xNi00LjUzelwiIC8+XG4gICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgQ29udGludWFyIGNvbSBHb29nbGVcbiAgICAgICAgPC9CdXR0b24+XG5cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1JlZ2lzdGVyOjE3OTo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIG15LTZcIj5cbiAgICAgICAgICA8U2VwYXJhdG9yIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVnaXN0ZXI6MTgwOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZsZXgtMSBiZy1ib3JkZXJcIiAvPlxuICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVnaXN0ZXI6MTgxOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGZvbnQtbWVkaXVtXCI+b3U8L3NwYW4+XG4gICAgICAgICAgPFNlcGFyYXRvciBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1JlZ2lzdGVyOjE4MjoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmbGV4LTEgYmctYm9yZGVyXCIgLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGZvcm0gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZWdpc3RlcjoxODU6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uU3VibWl0PXtoYW5kbGVSZWdpc3Rlcn0gY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1JlZ2lzdGVyOjE4NjoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICA8TGFiZWwgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZWdpc3RlcjoxODc6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgaHRtbEZvcj1cImVtYWlsXCIgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWZvcmVncm91bmQvODBcIj5FbWFpbDwvTGFiZWw+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVnaXN0ZXI6MTg4OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgICAgICAgPE1haWwgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZWdpc3RlcjoxODk6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiYWJzb2x1dGUgbGVmdC0zLjUgdG9wLTEvMiAtdHJhbnNsYXRlLXktMS8yIHctNCBoLTQgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCIgLz5cbiAgICAgICAgICAgICAgPElucHV0IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVnaXN0ZXI6MTkwOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgaWQ9XCJlbWFpbFwiIHR5cGU9XCJlbWFpbFwiIHBsYWNlaG9sZGVyPVwiby50ZXVAZW1haWwuY29tXCIgdmFsdWU9e2VtYWlsfSBvbkNoYW5nZT17KGUpID0+IHNldEVtYWlsKGUudGFyZ2V0LnZhbHVlKX0gcmVxdWlyZWQgY2xhc3NOYW1lPVwicGwtMTAgaC0xMiByb3VuZGVkLTJ4bCBib3JkZXItYm9yZGVyIGJnLXdoaXRlXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1JlZ2lzdGVyOjE5NDoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICA8TGFiZWwgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZWdpc3RlcjoxOTU6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgaHRtbEZvcj1cInBhc3N3b3JkXCIgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWZvcmVncm91bmQvODBcIj5QYXNzd29yZDwvTGFiZWw+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVnaXN0ZXI6MTk2OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgICAgICAgPExvY2sgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZWdpc3RlcjoxOTc6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiYWJzb2x1dGUgbGVmdC0zLjUgdG9wLTEvMiAtdHJhbnNsYXRlLXktMS8yIHctNCBoLTQgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCIgLz5cbiAgICAgICAgICAgICAgPElucHV0IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVnaXN0ZXI6MTk4OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgaWQ9XCJwYXNzd29yZFwiIHR5cGU9e3Nob3dQYXNzd29yZCA/IFwidGV4dFwiIDogXCJwYXNzd29yZFwifSBwbGFjZWhvbGRlcj1cIk3DrW5pbW8gNiBjYXJhY3RlcmVzXCIgdmFsdWU9e3Bhc3N3b3JkfSBvbkNoYW5nZT17KGUpID0+IHNldFBhc3N3b3JkKGUudGFyZ2V0LnZhbHVlKX0gcmVxdWlyZWQgY2xhc3NOYW1lPVwicGwtMTAgcHItMTAgaC0xMiByb3VuZGVkLTJ4bCBib3JkZXItYm9yZGVyIGJnLXdoaXRlXCIgLz5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1JlZ2lzdGVyOjE5OToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiBzZXRTaG93UGFzc3dvcmQoIXNob3dQYXNzd29yZCl9IGNsYXNzTmFtZT1cImFic29sdXRlIHJpZ2h0LTMuNSB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzIgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCI+XG4gICAgICAgICAgICAgICAge3Nob3dQYXNzd29yZCA/IDxFeWVPZmYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZWdpc3RlcjoyMDA6MzJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+IDogPEV5ZSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1JlZ2lzdGVyOjIwMDo2NVwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz59XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVnaXN0ZXI6MjA1OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgIDxMYWJlbCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1JlZ2lzdGVyOjIwNjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBodG1sRm9yPVwiY29uZmlybVBhc3N3b3JkXCIgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWZvcmVncm91bmQvODBcIj5Db25maXJtYXIgUGFzc3dvcmQ8L0xhYmVsPlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1JlZ2lzdGVyOjIwNzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgIDxMb2NrIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVnaXN0ZXI6MjA4OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImFic29sdXRlIGxlZnQtMy41IHRvcC0xLzIgLXRyYW5zbGF0ZS15LTEvMiB3LTQgaC00IHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiIC8+XG4gICAgICAgICAgICAgIDxJbnB1dCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1JlZ2lzdGVyOjIwOToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGlkPVwiY29uZmlybVBhc3N3b3JkXCIgdHlwZT17c2hvd1Bhc3N3b3JkID8gXCJ0ZXh0XCIgOiBcInBhc3N3b3JkXCJ9IHBsYWNlaG9sZGVyPVwiUmVwZXRlIGEgcGFzc3dvcmRcIiB2YWx1ZT17Y29uZmlybVBhc3N3b3JkfSBvbkNoYW5nZT17KGUpID0+IHNldENvbmZpcm1QYXNzd29yZChlLnRhcmdldC52YWx1ZSl9IHJlcXVpcmVkIGNsYXNzTmFtZT1cInBsLTEwIGgtMTIgcm91bmRlZC0yeGwgYm9yZGVyLWJvcmRlciBiZy13aGl0ZVwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHtlcnJvciAmJlxuICAgICAgICAgIDxtb3Rpb24ucCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1JlZ2lzdGVyOjIxNDoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGluaXRpYWw9e3sgb3BhY2l0eTogMCB9fSBhbmltYXRlPXt7IG9wYWNpdHk6IDEgfX0gY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWRlc3RydWN0aXZlIGJnLWRlc3RydWN0aXZlLzUgcm91bmRlZC14bCBweC00IHB5LTIuNSB0ZXh0LWNlbnRlclwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiZXJyb3JcIj5cbiAgICAgICAgICAgICAge2Vycm9yfVxuICAgICAgICAgICAgPC9tb3Rpb24ucD5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICA8QnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVnaXN0ZXI6MjE5OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgdHlwZT1cInN1Ym1pdFwiIGRpc2FibGVkPXtsb2FkaW5nfSBjbGFzc05hbWU9XCJ3LWZ1bGwgaC0xMiByb3VuZGVkLTJ4bCBiZy1bI0U4N0E1QV0gaG92ZXI6YmctWyNENDY5NEFdIHRleHQtd2hpdGUgZm9udC1zZW1pYm9sZCB0ZXh0LXNtIHNoYWRvdy1sZyBzaGFkb3ctWyNFODdBNUFdLzI1IGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICB7bG9hZGluZyA/XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVnaXN0ZXI6MjIxOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNCBoLTQgYm9yZGVyLTIgYm9yZGVyLXdoaXRlLzMwIGJvcmRlci10LXdoaXRlIHJvdW5kZWQtZnVsbCBhbmltYXRlLXNwaW5cIiAvPiA6XG5cbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgQ3JpYXIgY29udGEgPEFycm93UmlnaHQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZWdpc3RlcjoyMjQ6MjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L2Zvcm0+XG5cbiAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9SZWdpc3RlcjoyMzA6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciB0ZXh0LXNtIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBtdC02XCI+XG4gICAgICAgICAgSsOhIHRlbnMgY29udGE/e1wiIFwifVxuICAgICAgICAgIDxMaW5rIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvUmVnaXN0ZXI6MjMyOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHRvPVwiL2xvZ2luXCIgY2xhc3NOYW1lPVwidGV4dC1bI0U4N0E1QV0gZm9udC1zZW1pYm9sZCBob3Zlcjp1bmRlcmxpbmVcIj5cbiAgICAgICAgICAgIEVudHJhclxuICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgPC9wPlxuICAgICAgPC9tb3Rpb24uZGl2PlxuICAgIDwvZGl2Pik7XG5cbn0iXSwiZmlsZSI6Ii9hcHAvc3JjL3BhZ2VzL1JlZ2lzdGVyLmpzeCJ9