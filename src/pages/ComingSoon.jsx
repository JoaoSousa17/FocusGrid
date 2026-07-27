import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarClock, Mic } from "lucide-react";
import { useEdgeSwipeNav } from "@/hooks/useEdgeSwipeNav";
import { useLang } from "@/context/LangContext";

export default function ComingSoon() {
  const navigate = useNavigate();
  const { t } = useLang();
  const { swipeHandlers, dragStyle } = useEdgeSwipeNav({ right: "/deadlines", left: "/meeting-ai", up: "/", down: "/" });

  return (
    <div data-source-location="pages/ComingSoon:37:4" data-dynamic-content="true"
    className="h-screen w-screen overflow-hidden select-none relative bg-cream"
    {...swipeHandlers}>
      
      <div data-source-location="pages/ComingSoon:46:6" data-dynamic-content="true" style={dragStyle} className="h-full flex relative">

        {/* Left panel — Deadlines */}
        <motion.div data-source-location="pages/ComingSoon:49:8" data-dynamic-content="true"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        onClick={() => navigate("/deadlines")}
        className="w-1/2 h-full flex flex-col items-center justify-center cursor-pointer relative overflow-hidden">
          
          <div data-source-location="pages/ComingSoon:56:10" data-dynamic-content="true" className="relative z-10 flex flex-col items-center gap-5 px-5 text-center">
            <motion.div data-source-location="pages/ComingSoon:57:12" data-dynamic-content="true"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="w-16 h-16 rounded-[22px] bg-[#E87A5A]/10 border border-[#E87A5A]/20 flex items-center justify-center shadow-md">
              
              <CalendarClock data-source-location="pages/ComingSoon:62:14" data-dynamic-content="false" className="w-8 h-8 text-[#E87A5A]" />
            </motion.div>
            <div data-source-location="pages/ComingSoon:64:12" data-dynamic-content="false">
              <p data-source-location="pages/ComingSoon:65:14" data-dynamic-content="false" className="text-foreground font-black text-base leading-tight">{t("explore.dates_title")}</p>
              <p data-source-location="pages/ComingSoon:66:14" data-dynamic-content="false" className="text-[#E87A5A] font-black text-base leading-tight">{t("explore.dates_sub")}</p>
            </div>
            <motion.p data-source-location="pages/ComingSoon:68:12" data-dynamic-content="true"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="text-muted-foreground/50 text-[11px]">
              
              {t("explore.swipe_right")}
            </motion.p>
          </div>
        </motion.div>

        {/* Lightning bolt divider */}
        <div data-source-location="pages/ComingSoon:79:8" data-dynamic-content="false" className="absolute left-1/2 -translate-x-1/2 inset-y-0 flex items-center z-20 pointer-events-none">
          <svg data-source-location="pages/ComingSoon:80:10" data-dynamic-content="false" width="24" height="100%" viewBox="0 0 24 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            {/* Thin line top */}
            <line data-source-location="pages/ComingSoon:82:12" data-dynamic-content="false" x1="12" y1="0" x2="12" y2="240" stroke="#E8E0D8" strokeWidth="1" />
            {/* Lightning bolt in middle */}
            <polygon data-source-location="pages/ComingSoon:84:12" data-dynamic-content="false" points="12,230 5,310 11,310 4,390 19,290 13,290 20,210" fill="#E87A5A" opacity="0.5" />
            {/* Thin line bottom */}
            <line data-source-location="pages/ComingSoon:86:12" data-dynamic-content="false" x1="12" y1="370" x2="12" y2="600" stroke="#E8E0D8" strokeWidth="1" />
          </svg>
        </div>

        {/* Right panel — Meeting AI */}
        <motion.div data-source-location="pages/ComingSoon:91:8" data-dynamic-content="true"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        onClick={() => navigate("/meeting-ai")}
        className="w-1/2 h-full flex flex-col items-center justify-center cursor-pointer relative overflow-hidden">
          
          <div data-source-location="pages/ComingSoon:98:10" data-dynamic-content="true" className="relative z-10 flex flex-col items-center gap-5 px-5 text-center">
            <motion.div data-source-location="pages/ComingSoon:99:12" data-dynamic-content="true"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
            className="w-16 h-16 rounded-[22px] bg-[#E87A5A]/10 border border-[#E87A5A]/20 flex items-center justify-center shadow-md">
              
              <Mic data-source-location="pages/ComingSoon:104:14" data-dynamic-content="false" className="w-8 h-8 text-[#E87A5A]" />
            </motion.div>
            <div data-source-location="pages/ComingSoon:106:12" data-dynamic-content="false">
              <p data-source-location="pages/ComingSoon:107:14" data-dynamic-content="false" className="text-foreground font-black text-base leading-tight">{t("explore.meetings_title")}</p>
              <p data-source-location="pages/ComingSoon:108:14" data-dynamic-content="false" className="text-[#E87A5A] font-black text-base leading-tight">{t("explore.meetings_sub")}</p>
            </div>
            <motion.p data-source-location="pages/ComingSoon:110:12" data-dynamic-content="true"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
            className="text-muted-foreground/50 text-[11px]">
              
              {t("explore.swipe_left")}
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Back hint */}
      <div data-source-location="pages/ComingSoon:122:6" data-dynamic-content="true" className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-20">
        <motion.p data-source-location="pages/ComingSoon:123:8" data-dynamic-content="true"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="text-muted-foreground/40 text-[10px] text-center">
          
          {t("explore.hint")}
        </motion.p>
      </div>
    </div>);

}