import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "@/api/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function Login() {
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
      await auth.login(email, password);
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
      await auth.loginWithGoogle();
    } catch (err) {
      setError("Erro ao iniciar sessão com Google.");
    }
  };

  return (
    <div data-source-location="pages/Login:42:4" data-dynamic-content="true" className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background decorative circles */}
      <div data-source-location="pages/Login:44:6" data-dynamic-content="false" className="absolute top-[-120px] right-[-120px] w-[300px] h-[300px] rounded-full bg-[#E87A5A]/10" />
      <div data-source-location="pages/Login:45:6" data-dynamic-content="false" className="absolute bottom-[-80px] left-[-80px] w-[220px] h-[220px] rounded-full bg-[#E87A5A]/8" />

      <motion.div data-source-location="pages/Login:47:6" data-dynamic-content="true"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-sm relative z-10">
        
        {/* Logo */}
        <div data-source-location="pages/Login:54:8" data-dynamic-content="true" className="text-center mb-10">
          <motion.div data-source-location="pages/Login:55:10" data-dynamic-content="true"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-[28px] bg-[#E87A5A] shadow-lg shadow-[#E87A5A]/25 mb-5">
            
            <span data-source-location="pages/Login:61:12" data-dynamic-content="false" className="text-4xl">🍊</span>
          </motion.div>
          <h1 data-source-location="pages/Login:63:10" data-dynamic-content="false" className="text-2xl font-bold text-foreground">
            <span data-source-location="pages/Login:64:12" data-dynamic-content="false" className="bg-gradient-to-r from-[#E87A5A] to-[#D4694A] bg-clip-text text-transparent">Focus</span>Flow
          </h1>
          <p data-source-location="pages/Login:66:10" data-dynamic-content="false" className="text-muted-foreground mt-1.5 text-sm">Produtividade com ritmo</p>
        </div>

        {/* Google login */}
        <Button data-source-location="pages/Login:70:8" data-dynamic-content="true"
        onClick={handleGoogleLogin}
        variant="outline"
        className="w-full h-12 rounded-2xl border-border bg-white hover:bg-secondary/50 transition-all text-sm font-medium gap-3">
          
          <svg data-source-location="pages/Login:75:10" data-dynamic-content="false" className="w-5 h-5" viewBox="0 0 24 24">
            <path data-source-location="pages/Login:76:12" data-dynamic-content="false" fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path data-source-location="pages/Login:77:12" data-dynamic-content="false" fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path data-source-location="pages/Login:78:12" data-dynamic-content="false" fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path data-source-location="pages/Login:79:12" data-dynamic-content="false" fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continuar com Google
        </Button>

        <div data-source-location="pages/Login:84:8" data-dynamic-content="false" className="flex items-center gap-3 my-6">
          <Separator data-source-location="pages/Login:85:10" data-dynamic-content="false" className="flex-1 bg-border" />
          <span data-source-location="pages/Login:86:10" data-dynamic-content="false" className="text-xs text-muted-foreground font-medium">ou</span>
          <Separator data-source-location="pages/Login:87:10" data-dynamic-content="false" className="flex-1 bg-border" />
        </div>

        {/* Email login */}
        <form data-source-location="pages/Login:91:8" data-dynamic-content="true" onSubmit={handleEmailLogin} className="space-y-4">
          <div data-source-location="pages/Login:92:10" data-dynamic-content="true" className="space-y-1.5">
            <Label data-source-location="pages/Login:93:12" data-dynamic-content="false" htmlFor="email" className="text-sm font-medium text-foreground/80">
              Email
            </Label>
            <div data-source-location="pages/Login:96:12" data-dynamic-content="true" className="relative">
              <Mail data-source-location="pages/Login:97:14" data-dynamic-content="false" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input data-source-location="pages/Login:98:14" data-dynamic-content="true"
              id="email"
              type="email"
              placeholder="o.teu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 h-12 rounded-2xl border-border bg-white" />
              
            </div>
          </div>

          <div data-source-location="pages/Login:110:10" data-dynamic-content="true" className="space-y-1.5">
            <Label data-source-location="pages/Login:111:12" data-dynamic-content="false" htmlFor="password" className="text-sm font-medium text-foreground/80">
              Password
            </Label>
            <div data-source-location="pages/Login:114:12" data-dynamic-content="true" className="relative">
              <Lock data-source-location="pages/Login:115:14" data-dynamic-content="false" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input data-source-location="pages/Login:116:14" data-dynamic-content="true"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="A tua password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10 pr-10 h-12 rounded-2xl border-border bg-white" />
              
              <button data-source-location="pages/Login:125:14" data-dynamic-content="true"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                
                {showPassword ? <EyeOff data-source-location="pages/Login:130:32" data-dynamic-content="false" className="w-4 h-4" /> : <Eye data-source-location="pages/Login:130:65" data-dynamic-content="false" className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div data-source-location="pages/Login:135:10" data-dynamic-content="false" className="flex justify-end">
            <Link data-source-location="pages/Login:136:12" data-dynamic-content="false" to="/forgot-password" className="text-xs text-[#E87A5A] hover:underline font-medium">
              Esqueceste a password?
            </Link>
          </div>

          {error &&
          <motion.p data-source-location="pages/Login:142:12" data-dynamic-content="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-destructive bg-destructive/5 rounded-xl px-4 py-2.5 text-center" data-collection-item-field="error">
            
              {error}
            </motion.p>
          }

          <Button data-source-location="pages/Login:151:10" data-dynamic-content="true"
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-2xl bg-[#E87A5A] hover:bg-[#D4694A] text-white font-semibold text-sm shadow-lg shadow-[#E87A5A]/25 transition-all flex items-center gap-2">
            
            {loading ?
            <div data-source-location="pages/Login:157:14" data-dynamic-content="false" className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> :

            <>
                Entrar <ArrowRight data-source-location="pages/Login:160:23" data-dynamic-content="false" className="w-4 h-4" />
              </>
            }
          </Button>
        </form>

        <p data-source-location="pages/Login:166:8" data-dynamic-content="false" className="text-center text-sm text-muted-foreground mt-6">
          Não tens conta?{" "}
          <Link data-source-location="pages/Login:168:10" data-dynamic-content="false" to="/register" className="text-[#E87A5A] font-semibold hover:underline">
            Criar conta
          </Link>
        </p>
      </motion.div>
    </div>);

}