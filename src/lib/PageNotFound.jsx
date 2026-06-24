import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Compass } from 'lucide-react';

export default function PageNotFound() {
  const navigate = useNavigate();
  const location = useLocation();
  const pageName = location.pathname.substring(1);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-cream relative overflow-hidden px-6">
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-[-100px] right-[-100px] w-[280px] h-[280px] rounded-full bg-[#E87A5A]/10" />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="absolute bottom-[-90px] left-[-90px] w-[220px] h-[220px] rounded-full bg-[#E87A5A]/8" />

      <div className="max-w-md w-full text-center relative z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 12, delay: 0.1 }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-[28px] bg-white shadow-xl shadow-[#E87A5A]/15 mb-6 relative">
          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
            <Compass className="w-11 h-11 text-[#E87A5A]" strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-7xl font-extrabold tracking-tight bg-gradient-to-r from-[#E87A5A] to-[#D4694A] bg-clip-text text-transparent">
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl font-bold text-foreground mt-2">
          Página não encontrada
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-sm text-muted-foreground mt-2 leading-relaxed">
          {pageName ?
          <>A página <span className="font-medium text-foreground/80">"/{pageName}"</span> não existe ou foi movida.</> :
          <>Esta página não existe ou foi movida.</>}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="mt-8">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#E87A5A] hover:bg-[#D4694A] text-white text-sm font-semibold shadow-lg shadow-[#E87A5A]/25 transition-all active:scale-95">
            <Home className="w-4 h-4" />
            Voltar ao início
          </button>
        </motion.div>
      </div>
    </div>);
}
