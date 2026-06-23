import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "@/api/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.requestPasswordReset(email);
    } catch (err) {

      // always show success
    } finally {setLoading(false);
      setSent(true);
    }
  };

  return (
    <div data-source-location="pages/ForgotPassword:29:4" data-dynamic-content="true" className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div data-source-location="pages/ForgotPassword:30:6" data-dynamic-content="false" className="absolute top-[-120px] right-[-120px] w-[300px] h-[300px] rounded-full bg-[#E87A5A]/10" />
      <div data-source-location="pages/ForgotPassword:31:6" data-dynamic-content="false" className="absolute bottom-[-80px] left-[-80px] w-[220px] h-[220px] rounded-full bg-[#E87A5A]/8" />

      <motion.div data-source-location="pages/ForgotPassword:33:6" data-dynamic-content="true"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-sm relative z-10">
        
        {sent ?
        <div data-source-location="pages/ForgotPassword:40:10" data-dynamic-content="true" className="text-center">
            <motion.div data-source-location="pages/ForgotPassword:41:12" data-dynamic-content="true"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-[28px] bg-green-100 mb-5">
            
              <CheckCircle data-source-location="pages/ForgotPassword:47:14" data-dynamic-content="false" className="w-10 h-10 text-green-600" />
            </motion.div>
            <h1 data-source-location="pages/ForgotPassword:49:12" data-dynamic-content="false" className="text-2xl font-bold text-foreground">Email enviado!</h1>
            <p data-source-location="pages/ForgotPassword:50:12" data-dynamic-content="false" className="text-muted-foreground mt-2 text-sm">
              Se o email existir, receberás um link para redefinir a password.
            </p>
            <Link data-source-location="pages/ForgotPassword:53:12" data-dynamic-content="false" to="/login" className="inline-flex items-center gap-2 mt-6 text-sm text-[#E87A5A] font-semibold hover:underline">
              <ArrowLeft data-source-location="pages/ForgotPassword:54:14" data-dynamic-content="false" className="w-4 h-4" /> Voltar ao login
            </Link>
          </div> :

        <>
            <div data-source-location="pages/ForgotPassword:59:12" data-dynamic-content="false" className="text-center mb-10">
              <div data-source-location="pages/ForgotPassword:60:14" data-dynamic-content="false" className="inline-flex items-center justify-center w-20 h-20 rounded-[28px] bg-[#E87A5A]/10 mb-5">
                <span data-source-location="pages/ForgotPassword:61:16" data-dynamic-content="false" className="text-4xl">🍊</span>
              </div>
              <h1 data-source-location="pages/ForgotPassword:63:14" data-dynamic-content="false" className="text-2xl font-bold text-foreground">Recuperar password</h1>
              <p data-source-location="pages/ForgotPassword:64:14" data-dynamic-content="false" className="text-muted-foreground mt-1.5 text-sm">
                Envia o teu email e recebe um link de recuperação
              </p>
            </div>

            <form data-source-location="pages/ForgotPassword:69:12" data-dynamic-content="true" onSubmit={handleSubmit} className="space-y-4">
              <div data-source-location="pages/ForgotPassword:70:14" data-dynamic-content="true" className="space-y-1.5">
                <Label data-source-location="pages/ForgotPassword:71:16" data-dynamic-content="false" htmlFor="email" className="text-sm font-medium text-foreground/80">Email</Label>
                <div data-source-location="pages/ForgotPassword:72:16" data-dynamic-content="true" className="relative">
                  <Mail data-source-location="pages/ForgotPassword:73:18" data-dynamic-content="false" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input data-source-location="pages/ForgotPassword:74:18" data-dynamic-content="true"
                id="email"
                type="email"
                placeholder="o.teu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 h-12 rounded-2xl border-border bg-white" />
                
                </div>
              </div>

              <Button data-source-location="pages/ForgotPassword:86:14" data-dynamic-content="true"
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-2xl bg-[#E87A5A] hover:bg-[#D4694A] text-white font-semibold text-sm shadow-lg shadow-[#E87A5A]/25 flex items-center gap-2">
              
                {loading ?
              <div data-source-location="pages/ForgotPassword:92:18" data-dynamic-content="false" className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> :

              <>
                    Enviar link <ArrowRight data-source-location="pages/ForgotPassword:95:32" data-dynamic-content="false" className="w-4 h-4" />
                  </>
              }
              </Button>
            </form>

            <p data-source-location="pages/ForgotPassword:101:12" data-dynamic-content="false" className="text-center text-sm text-muted-foreground mt-6">
              <Link data-source-location="pages/ForgotPassword:102:14" data-dynamic-content="false" to="/login" className="text-[#E87A5A] font-semibold hover:underline inline-flex items-center gap-1">
                <ArrowLeft data-source-location="pages/ForgotPassword:103:16" data-dynamic-content="false" className="w-3.5 h-3.5" /> Voltar ao login
              </Link>
            </p>
          </>
        }
      </motion.div>
    </div>);

}