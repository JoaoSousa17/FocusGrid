import { motion } from "framer-motion";

export default function FocusTimer({ totalSeconds, remainingSeconds, isRunning, mode, "data-collection-item-id": __dataCollectionItemId }) {
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress = totalSeconds > 0 ? remainingSeconds / totalSeconds : 0;
  const strokeDashoffset = circumference * (1 - progress);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const display = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const isPause = mode === "pause";

  return (
    <div data-source-location="components/FocusTimer:16:4" data-dynamic-content="true" className="relative inline-flex items-center justify-center" data-collection-item-id={__dataCollectionItemId}>
      <svg data-source-location="components/FocusTimer:17:6" data-dynamic-content="true" width="280" height="280" className="-rotate-90">
        <circle data-source-location="components/FocusTimer:18:8" data-dynamic-content="true" cx="140" cy="140" r={radius} fill="none" stroke="#E8E0D8" strokeWidth="6" />
        <motion.circle data-source-location="components/FocusTimer:19:8" data-dynamic-content="true"
        cx="140" cy="140" r={radius} fill="none"
        stroke={isPause ? "#7EB8A0" : "url(#focusGrad)"}
        strokeWidth="6" strokeLinecap="round"
        strokeDasharray={circumference}
        animate={{ strokeDashoffset }}
        transition={{ duration: 1, ease: "linear" }} />
        
        <defs data-source-location="components/FocusTimer:27:8" data-dynamic-content="false">
          <linearGradient data-source-location="components/FocusTimer:28:10" data-dynamic-content="false" id="focusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop data-source-location="components/FocusTimer:29:12" data-dynamic-content="false" offset="0%" stopColor="#E87A5A" />
            <stop data-source-location="components/FocusTimer:30:12" data-dynamic-content="false" offset="100%" stopColor="#F0A080" />
          </linearGradient>
        </defs>
      </svg>
      <div data-source-location="components/FocusTimer:34:6" data-dynamic-content="true" className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span data-source-location="components/FocusTimer:35:8" data-dynamic-content="true"
        key={display}
        initial={{ scale: 1.03, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="text-[3.2rem] font-bold text-[#5C544E] tabular-nums tracking-tight leading-none" data-collection-item-field="display" data-collection-item-id={__dataCollectionItemId}>
          
          {display}
        </motion.span>
        <span data-source-location="components/FocusTimer:44:8" data-dynamic-content="true" className="text-xs text-muted-foreground mt-1.5 tracking-widest uppercase">
          {isRunning ? isPause ? "Pausa..." : "Foco..." : "Pronto"}
        </span>
      </div>
    </div>);

}