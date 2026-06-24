import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";
import { FocusSession, Tag } from "@/api/entities";
import { auth } from "@/api/auth";
import { useFocusTimer } from "@/context/FocusTimerContext";
import FocusTimer from "@/components/FocusTimer";
import TagPicker from "@/components/TagPicker";
import OrangeCanvas from "@/components/OrangeCanvas";

const TAG_COLORS = {
  blue: "bg-blue-100 text-blue-700", purple: "bg-purple-100 text-purple-700",
  green: "bg-green-100 text-green-700", amber: "bg-amber-100 text-amber-700",
  rose: "bg-rose-100 text-rose-700", teal: "bg-teal-100 text-teal-700",
  indigo: "bg-indigo-100 text-indigo-700", pink: "bg-pink-100 text-pink-700"
};

export default function FocusPomo() {
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const touchStart = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const [dragStyle, setDragStyle] = useState({});

  const {
    phase, cycleIndex, totalSeconds, remainingSeconds, isRunning,
    sessionCompleted, focusMin, shortBreakMin, longBreakMin,
    handlePlayPause, handleSkip, advancePhase, resetSessionCompleted
  } = useFocusTimer();

  const [selectedTag, setSelectedTag] = useState(null);
  const [showTagPicker, setShowTagPicker] = useState(false);
  const [completedOranges, setCompletedOranges] = useState(0);
  const [showOranges, setShowOranges] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    auth.me().then((u) => {
      const meta = u?.user_metadata || {};
      if (meta.notifications_enabled !== undefined) setNotificationsEnabled(meta.notifications_enabled);
    }).catch(() => {});
    Tag.list().then((tags) => {
      if (tags.length > 0) setSelectedTag(tags[0]);
    }).catch(() => {});
  }, []);

  // Save session when focus completes
  useEffect(() => {
    if (sessionCompleted) {
      setCompletedOranges((prev) => prev + 1);
      setShowOranges(true);
      FocusSession.create({
        tag_id: selectedTag?.id || null,
        tag_name: selectedTag?.name || "Estudo",
        tag_color: selectedTag?.color || "blue",
        duration_minutes: focusMin,
        type: "focus",
        completed: true
      }).catch(() => {});
      resetSessionCompleted();

      // Send notification
      if (notificationsEnabled && "Notification" in window && Notification.permission === "granted") {
        new Notification("FocusGrid", {
          body: "Foco concluído! 🍊 Hora de pausar.",
          icon: "🍊"
        });
      }
      // Request notification permission
      if (notificationsEnabled && "Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
      }
    }
  }, [sessionCompleted]);

  const buttonLabel = () => {
    if (remainingSeconds <= 0 && !isRunning) {
      return phase === "focus" ? "Começar Pausa" : "Começar Foco";
    }
    if (isRunning) return "Pausar";
    if (phase === "focus") return "Start Focus";
    return "Start Pause";
  };

  const skipLabel = () => {
    if (remainingSeconds <= 0) return "";
    if (phase === "focus") return "Skip Focus";
    return "Skip Pause";
  };

  const tagColorClass = selectedTag ? TAG_COLORS[selectedTag.color] || TAG_COLORS.blue : TAG_COLORS.blue;

  // Swipe
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
      if (dx < -60) navigate("/focus/calendar");else
      if (dx > 60) navigate("/focus/settings");
    } else {
      if (dy < -60) navigate("/focus/analytics");else
      if (dy > 60) navigate("/");
    }
  }, [navigate]);

  return (
    <div data-source-location="pages/FocusPomo:125:4" data-dynamic-content="true"
    className="h-screen w-screen flex flex-col bg-cream overflow-hidden relative select-none"
    onTouchStart={(e) => handlePointerStart(e.touches[0].clientX, e.touches[0].clientY)}
    onTouchMove={(e) => handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)}
    onTouchEnd={(e) => handlePointerEnd(e.changedTouches[0]?.clientX || touchStart.current.x, e.changedTouches[0]?.clientY || touchStart.current.y)}
    onMouseDown={(e) => handlePointerStart(e.clientX, e.clientY)}
    onMouseMove={(e) => {if (e.buttons === 1) handlePointerMove(e.clientX, e.clientY);}}
    onMouseUp={(e) => handlePointerEnd(e.clientX, e.clientY)}
    style={{ background: "linear-gradient(180deg, #FFF5E6 0%, #F5F0E8 100%)" }}>
      
      <div data-source-location="pages/FocusPomo:135:6" data-dynamic-content="true" style={dragStyle} className="flex-1 flex flex-col items-center justify-center">
        <OrangeCanvas data-source-location="pages/FocusPomo:136:8" data-dynamic-content="true" oranges={showOranges ? completedOranges : 0} buttonRef={buttonRef} />

        {/* Navigation arrows */}
        <div data-source-location="pages/FocusPomo:139:8" data-dynamic-content="true" className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          <button data-source-location="pages/FocusPomo:140:10" data-dynamic-content="true" onClick={() => navigate("/")} className="w-9 h-9 rounded-2xl bg-white border border-border flex items-center justify-center text-[#E87A5A] shadow-sm hover:bg-[#E87A5A]/5 transition-all">
            <ArrowUp data-source-location="pages/FocusPomo:141:12" data-dynamic-content="false" className="w-4 h-4" />
          </button>
          <span data-source-location="pages/FocusPomo:143:10" data-dynamic-content="false" className="text-[10px] text-muted-foreground/50 hidden sm:block">Home</span>
        </div>

        <div data-source-location="pages/FocusPomo:146:8" data-dynamic-content="true" className="absolute top-1/2 -translate-y-1/2 right-4 z-20 flex items-center gap-2">
          <span data-source-location="pages/FocusPomo:147:10" data-dynamic-content="false" className="text-[10px] text-muted-foreground/50 whitespace-nowrap hidden sm:block">Calendário</span>
          <button data-source-location="pages/FocusPomo:148:10" data-dynamic-content="true" onClick={() => navigate("/focus/calendar")} className="w-9 h-9 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground shadow-sm hover:text-foreground transition-all">
            <ArrowRight data-source-location="pages/FocusPomo:149:12" data-dynamic-content="false" className="w-4 h-4" />
          </button>
        </div>

        <div data-source-location="pages/FocusPomo:153:8" data-dynamic-content="true" className="absolute top-1/2 -translate-y-1/2 left-4 z-20 flex items-center gap-2">
          <button data-source-location="pages/FocusPomo:154:10" data-dynamic-content="true" onClick={() => navigate("/focus/settings")} className="w-9 h-9 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground shadow-sm hover:text-foreground transition-all">
            <ArrowLeft data-source-location="pages/FocusPomo:155:12" data-dynamic-content="false" className="w-4 h-4" />
          </button>
          <span data-source-location="pages/FocusPomo:157:10" data-dynamic-content="false" className="text-[10px] text-muted-foreground/50 whitespace-nowrap hidden sm:block">Settings</span>
        </div>

        <div data-source-location="pages/FocusPomo:160:8" data-dynamic-content="true" className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1">
          <span data-source-location="pages/FocusPomo:161:10" data-dynamic-content="false" className="text-[10px] text-muted-foreground/50 hidden sm:block">Analytics</span>
          <button data-source-location="pages/FocusPomo:162:10" data-dynamic-content="true" onClick={() => navigate("/focus/analytics")} className="w-9 h-9 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground shadow-sm hover:text-foreground transition-all">
            <ArrowDown data-source-location="pages/FocusPomo:163:12" data-dynamic-content="false" className="w-4 h-4" />
          </button>
        </div>

        {/* Main content */}
        <div data-source-location="pages/FocusPomo:168:8" data-dynamic-content="true" className="flex flex-col items-center gap-6 pt-10">
          <FocusTimer data-source-location="pages/FocusPomo:169:10" data-dynamic-content="true" totalSeconds={totalSeconds} remainingSeconds={remainingSeconds} isRunning={isRunning} mode={phase === "focus" ? "focus" : "pause"} />

          <button data-source-location="pages/FocusPomo:171:10" data-dynamic-content="true"
          onClick={() => setShowTagPicker(true)}
          className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all hover:scale-105 ${tagColorClass}`}>
            
            <span data-source-location="pages/FocusPomo:175:12" data-dynamic-content="true" className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedTag?.color ? ["blue", "purple", "green", "amber", "rose", "teal", "indigo", "pink"].includes(selectedTag.color) ? undefined : selectedTag.color : "#3B82F6" }} />
            {selectedTag?.name || "Estudo"}
            <span data-source-location="pages/FocusPomo:177:12" data-dynamic-content="false" className="text-[10px] opacity-60 ml-0.5">›</span>
          </button>

          <div data-source-location="pages/FocusPomo:180:10" data-dynamic-content="true" className="flex flex-col items-center gap-2.5">
            <button data-source-location="pages/FocusPomo:181:12" data-dynamic-content="true"
            ref={buttonRef}
            onClick={handlePlayPause}
            className="px-20 py-3.5 rounded-full bg-[#5C544E] text-white font-semibold text-sm shadow-lg shadow-black/10 hover:bg-[#4A4340] transition-all active:scale-95 min-w-[260px]">
              
              {buttonLabel()}
            </button>
            {isRunning &&
            <button data-source-location="pages/FocusPomo:189:14" data-dynamic-content="true" onClick={handleSkip} className="px-8 py-2 rounded-full text-[#E87A5A] text-sm font-medium hover:bg-[#E87A5A]/5 transition-all">
                {skipLabel()}
              </button>
            }
          </div>

          {sessionCompleted &&
          <motion.p data-source-location="pages/FocusPomo:196:12" data-dynamic-content="true" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-[#E87A5A] font-medium" data-collection-item-field="completedOranges">
              +1 🍊 {completedOranges} laranja{completedOranges !== 1 ? "s" : ""} conquistada{completedOranges !== 1 ? "s" : ""}
            </motion.p>
          }

          <div data-source-location="pages/FocusPomo:201:10" data-dynamic-content="true" className="flex gap-1.5">
            {[0, 1, 2, 3].map((i, __arrIdx__) =>
            <div data-source-location="pages/FocusPomo:203:14" data-dynamic-content="true" key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${
            phase === "focus" && i === cycleIndex ? "bg-[#E87A5A] scale-125" : i < cycleIndex ? "bg-[#E87A5A]/30" : "bg-border"}`
            } data-arr-index={__arrIdx__} />
            )}
          </div>
        </div>
      </div>

      <TagPicker data-source-location="pages/FocusPomo:211:6" data-dynamic-content="true" open={showTagPicker} onClose={() => setShowTagPicker(false)} selectedTag={selectedTag} onSelect={setSelectedTag} />
    </div>);

}