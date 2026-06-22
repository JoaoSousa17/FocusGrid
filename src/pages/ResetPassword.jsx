import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "@/api/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Lock, ArrowRight, CheckCircle } from "lucide-react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

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
      await auth.resetPassword(password);
      setDone(true);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      setError("Erro ao redefinir a password. O link pode ter expirado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-source-location="pages/ResetPassword:48:4" data-dynamic-content="true" className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div data-source-location="pages/ResetPassword:49:6" data-dynamic-content="false" className="absolute top-[-120px] right-[-120px] w-[300px] h-[300px] rounded-full bg-[#E87A5A]/10" />
      <div data-source-location="pages/ResetPassword:50:6" data-dynamic-content="false" className="absolute bottom-[-80px] left-[-80px] w-[220px] h-[220px] rounded-full bg-[#E87A5A]/8" />

      <motion.div data-source-location="pages/ResetPassword:52:6" data-dynamic-content="true"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-sm relative z-10">
        
        {done ?
        <div data-source-location="pages/ResetPassword:59:10" data-dynamic-content="true" className="text-center">
            <motion.div data-source-location="pages/ResetPassword:60:12" data-dynamic-content="true"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-[28px] bg-green-100 mb-5">
            
              <CheckCircle data-source-location="pages/ResetPassword:66:14" data-dynamic-content="false" className="w-10 h-10 text-green-600" />
            </motion.div>
            <h1 data-source-location="pages/ResetPassword:68:12" data-dynamic-content="false" className="text-2xl font-bold text-foreground">Password redefinida!</h1>
            <p data-source-location="pages/ResetPassword:69:12" data-dynamic-content="false" className="text-muted-foreground mt-2 text-sm">Serás redirecionado para o login...</p>
          </div> :

        <>
            <div data-source-location="pages/ResetPassword:73:12" data-dynamic-content="false" className="text-center mb-10">
              <div data-source-location="pages/ResetPassword:74:14" data-dynamic-content="false" className="inline-flex items-center justify-center w-20 h-20 rounded-[28px] bg-[#E87A5A]/10 mb-5">
                <span data-source-location="pages/ResetPassword:75:16" data-dynamic-content="false" className="text-4xl">🔒</span>
              </div>
              <h1 data-source-location="pages/ResetPassword:77:14" data-dynamic-content="false" className="text-2xl font-bold text-foreground">Nova password</h1>
              <p data-source-location="pages/ResetPassword:78:14" data-dynamic-content="false" className="text-muted-foreground mt-1.5 text-sm">Escolhe uma nova password</p>
            </div>

            <form data-source-location="pages/ResetPassword:81:12" data-dynamic-content="true" onSubmit={handleSubmit} className="space-y-4">
              <div data-source-location="pages/ResetPassword:82:14" data-dynamic-content="true" className="space-y-1.5">
                <Label data-source-location="pages/ResetPassword:83:16" data-dynamic-content="false" htmlFor="password" className="text-sm font-medium text-foreground/80">Nova Password</Label>
                <div data-source-location="pages/ResetPassword:84:16" data-dynamic-content="true" className="relative">
                  <Lock data-source-location="pages/ResetPassword:85:18" data-dynamic-content="false" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input data-source-location="pages/ResetPassword:86:18" data-dynamic-content="true" id="password" type="password" placeholder="Mínimo 6 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} required className="pl-10 h-12 rounded-2xl border-border bg-white" />
                </div>
              </div>

              <div data-source-location="pages/ResetPassword:90:14" data-dynamic-content="true" className="space-y-1.5">
                <Label data-source-location="pages/ResetPassword:91:16" data-dynamic-content="false" htmlFor="confirmPassword" className="text-sm font-medium text-foreground/80">Confirmar Password</Label>
                <div data-source-location="pages/ResetPassword:92:16" data-dynamic-content="true" className="relative">
                  <Lock data-source-location="pages/ResetPassword:93:18" data-dynamic-content="false" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input data-source-location="pages/ResetPassword:94:18" data-dynamic-content="true" id="confirmPassword" type="password" placeholder="Repete a password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="pl-10 h-12 rounded-2xl border-border bg-white" />
                </div>
              </div>

              {error &&
            <motion.p data-source-location="pages/ResetPassword:99:16" data-dynamic-content="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive bg-destructive/5 rounded-xl px-4 py-2.5 text-center" data-collection-item-field="error">
                  {error}
                </motion.p>
            }

              <Button data-source-location="pages/ResetPassword:104:14" data-dynamic-content="true" type="submit" disabled={loading} className="w-full h-12 rounded-2xl bg-[#E87A5A] hover:bg-[#D4694A] text-white font-semibold text-sm shadow-lg shadow-[#E87A5A]/25 flex items-center gap-2">
                {loading ?
              <div data-source-location="pages/ResetPassword:106:18" data-dynamic-content="false" className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> :

              <>
                    Redefinir password <ArrowRight data-source-location="pages/ResetPassword:109:39" data-dynamic-content="false" className="w-4 h-4" />
                  </>
              }
              </Button>
            </form>
          </>
        }
      </motion.div>
    </div>);

}