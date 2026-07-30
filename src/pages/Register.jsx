import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "@/api/auth";
import { supabase } from "@/api/supabaseClient";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Mail, Lock, UserPlus, ArrowRight, Eye, EyeOff, Check } from "lucide-react";

export default function Register() {
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
      await auth.register(email, password);
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
      await auth.verifyOtp(email, otp);
      window.location.href = "/";
    } catch (err) {
      setError("Código inválido. Tenta novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await supabase.auth.resend({ type: "signup", email });
    } catch (err) {

      // ignore
    }};

  const handleGoogleLogin = async () => {
    try {
      await auth.loginWithGoogle();
    } catch (err) {
      setError("Erro ao iniciar sessão com Google.");
    }
  };

  const handleMetaLogin = async () => {
    try {
      await auth.loginWithMeta();
    } catch (err) {
      setError("Erro ao iniciar sessão com Meta.");
    }
  };

  if (step === "otp") {
    return (
      <div data-source-location="pages/Register:78:6" data-dynamic-content="true" className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <div data-source-location="pages/Register:79:8" data-dynamic-content="false" className="absolute top-[-120px] right-[-120px] w-[300px] h-[300px] rounded-full bg-[#E87A5A]/10" />
        <div data-source-location="pages/Register:80:8" data-dynamic-content="false" className="absolute bottom-[-80px] left-[-80px] w-[220px] h-[220px] rounded-full bg-[#E87A5A]/8" />

        <motion.div data-source-location="pages/Register:82:8" data-dynamic-content="true"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm relative z-10">
          
          <div data-source-location="pages/Register:87:10" data-dynamic-content="true" className="text-center mb-10">
            <div data-source-location="pages/Register:88:12" data-dynamic-content="false" className="inline-flex items-center justify-center w-20 h-20 rounded-[28px] bg-[#E87A5A] shadow-lg shadow-[#E87A5A]/25 mb-5">
              <span data-source-location="pages/Register:89:14" data-dynamic-content="false" className="text-4xl">📬</span>
            </div>
            <h1 data-source-location="pages/Register:91:12" data-dynamic-content="false" className="text-2xl font-bold text-foreground">Verifica o email</h1>
            <p data-source-location="pages/Register:92:12" data-dynamic-content="false" className="text-muted-foreground mt-1.5 text-sm">FocusGrid</p>
            <p data-source-location="pages/Register:93:12" data-dynamic-content="true" className="text-muted-foreground mt-1.5 text-sm">
              Enviámos um código para <strong data-source-location="pages/Register:94:38" data-dynamic-content="true" data-collection-item-field="email">{email}</strong>
            </p>
          </div>

          <form data-source-location="pages/Register:98:10" data-dynamic-content="true" onSubmit={handleVerifyOtp} className="space-y-4">
            <div data-source-location="pages/Register:99:12" data-dynamic-content="true" className="space-y-1.5">
              <Label data-source-location="pages/Register:100:14" data-dynamic-content="false" className="text-sm font-medium text-foreground/80">Código OTP</Label>
              <Input data-source-location="pages/Register:101:14" data-dynamic-content="true"
              type="text"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
              className="h-12 rounded-2xl border-border bg-white text-center text-lg tracking-[0.3em]" />
              
            </div>

            {error &&
            <motion.p data-source-location="pages/Register:113:14" data-dynamic-content="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive bg-destructive/5 rounded-xl px-4 py-2.5 text-center" data-collection-item-field="error">
                {error}
              </motion.p>
            }

            <Button data-source-location="pages/Register:118:12" data-dynamic-content="true"
            type="submit"
            disabled={loading || otp.length < 6}
            className="w-full h-12 rounded-2xl bg-[#E87A5A] hover:bg-[#D4694A] text-white font-semibold text-sm shadow-lg shadow-[#E87A5A]/25 flex items-center gap-2">
              
              {loading ?
              <div data-source-location="pages/Register:124:16" data-dynamic-content="false" className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> :

              <>
                  Verificar <Check data-source-location="pages/Register:127:28" data-dynamic-content="false" className="w-4 h-4" />
                </>
              }
            </Button>

            <button data-source-location="pages/Register:132:12" data-dynamic-content="true" type="button" onClick={handleResendOtp} className="w-full text-center text-sm text-[#E87A5A] hover:underline font-medium">
              Reenviar código
            </button>
          </form>
        </motion.div>
      </div>);

  }

  return (
    <div data-source-location="pages/Register:142:4" data-dynamic-content="true" className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div data-source-location="pages/Register:143:6" data-dynamic-content="false" className="absolute top-[-120px] right-[-120px] w-[300px] h-[300px] rounded-full bg-[#E87A5A]/10" />
      <div data-source-location="pages/Register:144:6" data-dynamic-content="false" className="absolute bottom-[-80px] left-[-80px] w-[220px] h-[220px] rounded-full bg-[#E87A5A]/8" />

      <motion.div data-source-location="pages/Register:146:6" data-dynamic-content="true"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-sm relative z-10">
        
        <div data-source-location="pages/Register:152:8" data-dynamic-content="true" className="text-center mb-10">
          <motion.div data-source-location="pages/Register:153:10" data-dynamic-content="true"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-[28px] shadow-lg shadow-[#E87A5A]/25 mb-5 overflow-hidden">

            <img data-source-location="pages/Register:159:12" src="/logo.png" alt="FocusGrid" className="w-full h-full object-cover" />
          </motion.div>
          <h1 data-source-location="pages/Register:161:10" data-dynamic-content="false" className="text-2xl font-bold text-foreground">Criar conta</h1>
          <p data-source-location="pages/Register:162:10" data-dynamic-content="false" className="text-muted-foreground mt-1.5 text-sm">Começa a tua jornada no FocusGrid</p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="flex-1 h-12 rounded-2xl border-border bg-white hover:bg-secondary/50 transition-all text-sm font-medium gap-2">
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </Button>
          <Button
            onClick={handleMetaLogin}
            variant="outline"
            className="flex-1 h-12 rounded-2xl border-border bg-white hover:bg-secondary/50 transition-all text-sm font-medium gap-2">
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Meta
          </Button>
        </div>

        <div data-source-location="pages/Register:179:8" data-dynamic-content="false" className="flex items-center gap-3 my-6">
          <Separator data-source-location="pages/Register:180:10" data-dynamic-content="false" className="flex-1 bg-border" />
          <span data-source-location="pages/Register:181:10" data-dynamic-content="false" className="text-xs text-muted-foreground font-medium">ou</span>
          <Separator data-source-location="pages/Register:182:10" data-dynamic-content="false" className="flex-1 bg-border" />
        </div>

        <form data-source-location="pages/Register:185:8" data-dynamic-content="true" onSubmit={handleRegister} className="space-y-4">
          <div data-source-location="pages/Register:186:10" data-dynamic-content="true" className="space-y-1.5">
            <Label data-source-location="pages/Register:187:12" data-dynamic-content="false" htmlFor="email" className="text-sm font-medium text-foreground/80">Email</Label>
            <div data-source-location="pages/Register:188:12" data-dynamic-content="true" className="relative">
              <Mail data-source-location="pages/Register:189:14" data-dynamic-content="false" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input data-source-location="pages/Register:190:14" data-dynamic-content="true" id="email" type="email" placeholder="o.teu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="pl-10 h-12 rounded-2xl border-border bg-white" />
            </div>
          </div>

          <div data-source-location="pages/Register:194:10" data-dynamic-content="true" className="space-y-1.5">
            <Label data-source-location="pages/Register:195:12" data-dynamic-content="false" htmlFor="password" className="text-sm font-medium text-foreground/80">Password</Label>
            <div data-source-location="pages/Register:196:12" data-dynamic-content="true" className="relative">
              <Lock data-source-location="pages/Register:197:14" data-dynamic-content="false" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input data-source-location="pages/Register:198:14" data-dynamic-content="true" id="password" type={showPassword ? "text" : "password"} placeholder="Mínimo 6 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} required className="pl-10 pr-10 h-12 rounded-2xl border-border bg-white" />
              <button data-source-location="pages/Register:199:14" data-dynamic-content="true" type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff data-source-location="pages/Register:200:32" data-dynamic-content="false" className="w-4 h-4" /> : <Eye data-source-location="pages/Register:200:65" data-dynamic-content="false" className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div data-source-location="pages/Register:205:10" data-dynamic-content="true" className="space-y-1.5">
            <Label data-source-location="pages/Register:206:12" data-dynamic-content="false" htmlFor="confirmPassword" className="text-sm font-medium text-foreground/80">Confirmar Password</Label>
            <div data-source-location="pages/Register:207:12" data-dynamic-content="true" className="relative">
              <Lock data-source-location="pages/Register:208:14" data-dynamic-content="false" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input data-source-location="pages/Register:209:14" data-dynamic-content="true" id="confirmPassword" type={showPassword ? "text" : "password"} placeholder="Repete a password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="pl-10 h-12 rounded-2xl border-border bg-white" />
            </div>
          </div>

          {error &&
          <motion.p data-source-location="pages/Register:214:12" data-dynamic-content="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive bg-destructive/5 rounded-xl px-4 py-2.5 text-center" data-collection-item-field="error">
              {error}
            </motion.p>
          }

          <Button data-source-location="pages/Register:219:10" data-dynamic-content="true" type="submit" disabled={loading} className="w-full h-12 rounded-2xl bg-[#E87A5A] hover:bg-[#D4694A] text-white font-semibold text-sm shadow-lg shadow-[#E87A5A]/25 flex items-center gap-2">
            {loading ?
            <div data-source-location="pages/Register:221:14" data-dynamic-content="false" className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> :

            <>
                Criar conta <ArrowRight data-source-location="pages/Register:224:28" data-dynamic-content="false" className="w-4 h-4" />
              </>
            }
          </Button>
        </form>

        <p data-source-location="pages/Register:230:8" data-dynamic-content="false" className="text-center text-sm text-muted-foreground mt-6">
          Já tens conta?{" "}
          <Link data-source-location="pages/Register:232:10" data-dynamic-content="false" to="/login" className="text-[#E87A5A] font-semibold hover:underline">
            Entrar
          </Link>
        </p>
      </motion.div>
    </div>);

}