import { useRef, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, ListTodo, Heart, Timer, LayoutGrid } from "lucide-react";
import { auth } from "@/api/auth";

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
  const touchStart = useRef({ x: 0, y: 0 });
  const [swipeHint, setSwipeHint] = useState(null);
  const [user, setUser] = useState(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [dragStyle, setDragStyle] = useState({});

  useEffect(() => {
    auth.me().then(setUser).catch(() => {});
  }, []);

  const handlePointerStart = useCallback((x, y) => {
    touchStart.current = { x, y };
    dragOffset.current = { x: 0, y: 0 };
    setDragStyle({});
  }, []);

  const handlePointerMove = useCallback((x, y) => {
    dragOffset.current = { x: x - touchStart.current.x, y: y - touchStart.current.y };
    setDragStyle({
      transform: `translate(${dragOffset.current.x}px, ${dragOffset.current.y}px)`,
      transition: "none"
    });
  }, []);

  const handlePointerEnd = useCallback((x, y) => {
    setDragStyle({ transform: "translate(0, 0)", transition: "transform 0.3s ease-out" });
    const dx = x - touchStart.current.x;
    const dy = y - touchStart.current.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (absDx < 40 && absDy < 40) return;

    if (absDx > absDy) {
      if (dx < -60) navigate("/habits");else
      if (dx > 60) navigate("/tasks");
    } else {
      if (dy < -60) navigate("/focus");else
      if (dy > 60) navigate("/coming-soon");
    }
  }, [navigate]);

  const handleTouchStart = useCallback((e) => {
    handlePointerStart(e.touches[0].clientX, e.touches[0].clientY);
  }, [handlePointerStart]);

  const handleTouchMove = useCallback((e) => {
    handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
  }, [handlePointerMove]);

  const handleTouchEnd = useCallback((e) => {
    handlePointerEnd(e.changedTouches[0]?.clientX || touchStart.current.x, e.changedTouches[0]?.clientY || touchStart.current.y);
  }, [handlePointerEnd]);

  const handleMouseDown = useCallback((e) => {
    handlePointerStart(e.clientX, e.clientY);
  }, [handlePointerStart]);

  const handleMouseMove = useCallback((e) => {
    if (e.buttons === 1) handlePointerMove(e.clientX, e.clientY);
  }, [handlePointerMove]);

  const handleMouseUp = useCallback((e) => {
    handlePointerEnd(e.clientX, e.clientY);
  }, [handlePointerEnd]);

  return (
    <div data-source-location="pages/Home:138:4" data-dynamic-content="true"
    className="h-screen w-screen flex items-center justify-center bg-cream overflow-hidden relative select-none"
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    onTouchEnd={handleTouchEnd}
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}>
      
      <div data-source-location="pages/Home:147:6" data-dynamic-content="true" style={dragStyle} className="flex-1 flex items-center justify-center w-full h-full">
      <FloatingOrbs data-source-location="pages/Home:148:6" data-dynamic-content="false" />

      {/* Directional arrows */}
      <DirectionalArrow data-source-location="pages/Home:151:6" data-dynamic-content="true"
        direction="up" label="Explorar" icon={LayoutGrid}
        onClick={() => navigate("/coming-soon")}
        color="bg-white border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20" />
        
      <DirectionalArrow data-source-location="pages/Home:156:6" data-dynamic-content="true"
        direction="down" label="FocusPomo" icon={Timer}
        onClick={() => navigate("/focus")}
        color="bg-[#E87A5A] text-white hover:bg-[#D4694A] shadow-[#E87A5A]/30" />
        
      <DirectionalArrow data-source-location="pages/Home:161:6" data-dynamic-content="true"
        direction="left" label="Tarefas" icon={ListTodo}
        onClick={() => navigate("/tasks")}
        color="bg-white border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20" />
        
      <DirectionalArrow data-source-location="pages/Home:166:6" data-dynamic-content="true"
        direction="right" label="Hábitos" icon={Heart}
        onClick={() => navigate("/habits")}
        color="bg-white border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20" />
        

      {/* Center logo */}
      <motion.div data-source-location="pages/Home:173:6" data-dynamic-content="true"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 100, damping: 12 }}
        className="flex flex-col items-center z-10">
          
        <motion.div data-source-location="pages/Home:179:8" data-dynamic-content="true"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="w-32 h-32 rounded-[40px] bg-gradient-to-br from-[#E87A5A] via-[#F0A080] to-[#F5C0A0] shadow-2xl shadow-[#E87A5A]/30 flex items-center justify-center mb-5 relative overflow-hidden">
            
          <motion.div data-source-location="pages/Home:184:10" data-dynamic-content="true"
            className="absolute inset-0 bg-white/20"
            animate={{ rotate: [0, 360], scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            style={{ borderRadius: "40%", width: "50%", height: "50%", top: "-20%", left: "-20%" }} />
            
          <span data-source-location="pages/Home:190:10" data-dynamic-content="false" className="text-6xl relative z-10 drop-shadow-sm">🍊</span>
        </motion.div>

        <motion.h1 data-source-location="pages/Home:193:8" data-dynamic-content="true"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-4xl font-extrabold tracking-tight">
            
          <span data-source-location="pages/Home:199:10" data-dynamic-content="false" className="bg-gradient-to-r from-[#E87A5A] to-[#D4694A] bg-clip-text text-transparent">
            Focus
          </span>
          <span data-source-location="pages/Home:202:10" data-dynamic-content="false" className="text-foreground">Flow</span>
        </motion.h1>

        <motion.p data-source-location="pages/Home:205:8" data-dynamic-content="true"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-sm text-muted-foreground mt-1.5">
            
          Produtividade com ritmo
        </motion.p>
      </motion.div>

      {/* Swipe hints */}
      <div data-source-location="pages/Home:216:6" data-dynamic-content="true" className="absolute bottom-28 left-1/2 -translate-x-1/2 flex items-center gap-8 z-10">
        <motion.span data-source-location="pages/Home:217:8" data-dynamic-content="true"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-[10px] text-muted-foreground/60 hidden sm:block">
            
          ← Tarefas
        </motion.span>
        <motion.span data-source-location="pages/Home:224:8" data-dynamic-content="true"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
          className="text-[10px] text-muted-foreground/60">
            
          Desliza para navegar
        </motion.span>
        <motion.span data-source-location="pages/Home:231:8" data-dynamic-content="true"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 3, delay: 1 }}
          className="text-[10px] text-muted-foreground/60 hidden sm:block">
            
          Hábitos →
        </motion.span>
      </div>
      </div>
    </div>);

}