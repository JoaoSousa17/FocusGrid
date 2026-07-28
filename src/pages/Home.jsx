import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, ListTodo, Heart, Timer, LayoutGrid, MessageCircle, UserCircle2, PenLine } from "lucide-react";
import { auth } from "@/api/auth";
import { useEdgeSwipeNav } from "@/hooks/useEdgeSwipeNav";
import { useLang } from "@/context/LangContext";

function FloatingOrbs() {
  return (
    <div data-source-location="pages/Home:9:4" data-dynamic-content="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(8)].map((_, i) =>
      <motion.div data-source-location="pages/Home:11:8" data-dynamic-content="true"
      key={i}
      className="absolute rounded-full bg-[#E87A5A]/8"
      style={{
        width: 60 + Math.random() * 180,
        height: 60 + Math.random() * 180,
        left: `${Math.random() * 90}%`,
        top: `${Math.random() * 90}%`
      }}
      animate={{
        y: [0, -30 - Math.random() * 40, 0],
        x: [0, 15 + Math.random() * 20, 0],
        scale: [1, 1.05 + Math.random() * 0.1, 1],
        opacity: [0.3, 0.6, 0.3]
      }}
      transition={{
        duration: 5 + Math.random() * 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 3
      }} data-arr-index={i} />

      )}
    </div>);

}

function DirectionalArrow({ direction, label, onClick, icon: Icon, color, "data-collection-item-id": __dataCollectionItemId }) {
  const positions = {
    up: "top-6 left-1/2 -translate-x-1/2 flex-col",
    down: "bottom-6 left-1/2 -translate-x-1/2 flex-col",
    left: "left-6 top-1/2 -translate-y-1/2 flex-row",
    right: "right-6 top-1/2 -translate-y-1/2 flex-row-reverse"
  };

  const isHorizontal = direction === "left" || direction === "right";

  return (
    <div data-source-location="pages/Home:49:4" data-dynamic-content="true" className={`absolute ${positions[direction]} z-20 flex items-center gap-3`} data-collection-item-id={__dataCollectionItemId}>
      <motion.button data-source-location="pages/Home:50:6" data-dynamic-content="true"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all ${color}`}>
        
        <Icon data-source-location="pages/Home:56:8" data-dynamic-content="false" className="w-5 h-5" />
      </motion.button>
      <motion.span data-source-location="pages/Home:58:6" data-dynamic-content="true"
      animate={isHorizontal ? { x: [0, 5, 0] } : { y: [0, 5, 0] }}
      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      className={`text-xs font-semibold text-foreground/70 whitespace-nowrap ${isHorizontal ? "hidden sm:block" : ""}`} data-collection-item-field="label" data-collection-item-id={__dataCollectionItemId}>
        
        {label}
      </motion.span>
    </div>);

}

export default function Home() {
  const navigate = useNavigate();
  const { t } = useLang();
  const [swipeHint, setSwipeHint] = useState(null);
  const [user, setUser] = useState(null);
  const [diagExit, setDiagExit] = useState(null); // { x, y } fractions for exit anim
  const { swipeHandlers, dragStyle } = useEdgeSwipeNav({ left: "/habits", right: "/tasks", up: "/focus", down: "/coming-soon" });
  const diagRef = useRef({ startX: 0, startY: 0, type: null });

  useEffect(() => {
    auth.me().then(setUser).catch(() => {});
  }, []);

  const handleDiagStart = (e) => {
    const t = e.touches?.[0] || e;
    const w = window.innerWidth, h = window.innerHeight;
    let type = null;
    if (t.clientX > w * 0.65 && t.clientY > h * 0.65) type = "notes";    // bottom-right → /notes
    else if (t.clientX > w * 0.65 && t.clientY < h * 0.35) type = "profile"; // top-right → /profile
    diagRef.current = { startX: t.clientX, startY: t.clientY, type };
  };
  const handleDiagEnd = (e) => {
    const { type, startX, startY } = diagRef.current;
    if (!type) return;
    const t = e.changedTouches?.[0] || e;
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;
    if (type === "notes" && dx < -60 && dy < -60) {
      setDiagExit({ x: "-60%", y: "-60%" });
      setTimeout(() => navigate("/notes"), 230);
    }
    if (type === "profile" && dx < -60 && dy > 60) {
      setDiagExit({ x: "-60%", y: "60%" });
      setTimeout(() => navigate("/profile"), 230);
    }
  };

  return (
    <div data-source-location="pages/Home:138:4" data-dynamic-content="true"
    className="h-screen w-screen flex items-center justify-center bg-cream overflow-hidden relative select-none"
    {...swipeHandlers}
    onTouchStart={(e) => { swipeHandlers.onTouchStart?.(e); handleDiagStart(e); }}
    onTouchEnd={(e) => { swipeHandlers.onTouchEnd?.(e); handleDiagEnd(e); }}
    onMouseDown={(e) => { swipeHandlers.onMouseDown?.(e); handleDiagStart(e); }}
    onMouseUp={(e) => { swipeHandlers.onMouseUp?.(e); handleDiagEnd(e); }}>
      
      <motion.div
        data-source-location="pages/Home:147:6"
        style={dragStyle}
        className="flex-1 flex items-center justify-center w-full h-full"
        animate={diagExit ? { x: diagExit.x, y: diagExit.y, opacity: 0, scale: 0.92 } : { x: 0, y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.23, ease: [0.4, 0, 0.2, 1] }}
      >
      <FloatingOrbs data-source-location="pages/Home:148:6" data-dynamic-content="false" />

      {/* Directional arrows */}
      <DirectionalArrow direction="up" label={t("home.label.explore")} icon={LayoutGrid}
        onClick={() => navigate("/coming-soon")}
        color="bg-[#F87171] text-white hover:bg-[#F25C5C] shadow-[#F87171]/30" />
      <DirectionalArrow direction="down" label={t("home.label.focus")} icon={Timer}
        onClick={() => navigate("/focus")}
        color="bg-[#E87A5A] text-white hover:bg-[#D4694A] shadow-[#E87A5A]/30" />
      <DirectionalArrow direction="left" label={t("home.label.tasks")} icon={ListTodo}
        onClick={() => navigate("/tasks")}
        color="bg-[#3B82F6] text-white hover:bg-[#2F6FD8] shadow-[#3B82F6]/30" />
      <DirectionalArrow direction="right" label={t("home.label.habits")} icon={Heart}
        onClick={() => navigate("/habits")}
        color="bg-[#8B5CF6] text-white hover:bg-[#7A4CE0] shadow-[#8B5CF6]/30" />
        

      {/* Center logo */}
      <motion.div data-source-location="pages/Home:173:6" data-dynamic-content="true"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 100, damping: 12 }}
        className="flex flex-col items-center z-10">
          
        <motion.div data-source-location="pages/Home:179:8" data-dynamic-content="true"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="w-32 h-32 rounded-[40px] shadow-2xl shadow-[#E87A5A]/30 flex items-center justify-center mb-5 relative overflow-hidden">

          <img data-source-location="pages/Home:190:10" src="/logo.png" alt="FocusGrid" className="w-full h-full object-cover" />
        </motion.div>

        <motion.h1 data-source-location="pages/Home:193:8" data-dynamic-content="true"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-4xl font-extrabold tracking-tight">
            
          <span data-source-location="pages/Home:199:10" data-dynamic-content="false" className="bg-gradient-to-r from-[#E87A5A] to-[#D4694A] bg-clip-text text-transparent">
            Focus
          </span>
          <span data-source-location="pages/Home:202:10" data-dynamic-content="false" className="text-foreground">Grid</span>
        </motion.h1>

        <motion.p data-source-location="pages/Home:205:8" data-dynamic-content="true"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-sm text-muted-foreground mt-1.5">
            
          {t("home.tagline")}
        </motion.p>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0 }}
          onClick={() => navigate("/chat")}
          className="mt-4 flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-border shadow-sm text-sm font-medium text-foreground hover:border-[#E87A5A]/40 hover:bg-[#E87A5A]/5 transition-all">
          <MessageCircle className="w-4 h-4 text-[#E87A5A]" />
          {t("home.ai_btn")}
        </motion.button>
      </motion.div>

      {/* Notes button — bottom-right, diagonal swipe target */}
      <div className="absolute bottom-6 right-6 z-20 flex flex-col items-center gap-3">
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="text-xs font-semibold text-foreground/70 whitespace-nowrap hidden sm:block">
          {t("home.label.notes")}
        </motion.span>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/notes")}
          className="w-12 h-12 rounded-2xl bg-[#14B8A6] text-white shadow-lg shadow-[#14B8A6]/30 flex items-center justify-center hover:bg-[#0D9488] transition-all">
          <PenLine className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Profile button */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="text-xs font-semibold text-foreground/70 whitespace-nowrap hidden sm:block">
          {t("home.label.profile")}
        </motion.span>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/profile")}
          className="w-12 h-12 rounded-2xl bg-[#6366F1] text-white shadow-lg shadow-[#6366F1]/30 flex items-center justify-center hover:bg-[#4F52D4] transition-all">
          <UserCircle2 className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Swipe hints */}
      <div data-source-location="pages/Home:216:6" data-dynamic-content="true" className="absolute bottom-28 left-1/2 -translate-x-1/2 flex items-center gap-8 z-10">
        <motion.span data-source-location="pages/Home:217:8" data-dynamic-content="true"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-[10px] text-muted-foreground/60 hidden sm:block">
            
          ← {t("home.label.tasks")}
        </motion.span>
        <motion.span data-source-location="pages/Home:224:8" data-dynamic-content="true"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
          className="text-[10px] text-muted-foreground/60">

          {t("home.swipe_hint")}
        </motion.span>
        <motion.span data-source-location="pages/Home:231:8" data-dynamic-content="true"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 3, delay: 1 }}
          className="text-[10px] text-muted-foreground/60 hidden sm:block">
            
          {t("home.label.habits")} →
        </motion.span>
      </div>
      </motion.div>
    </div>);

}