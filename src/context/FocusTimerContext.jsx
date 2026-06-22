import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { auth } from "@/api/auth";

const FocusTimerContext = createContext(null);

export function FocusTimerProvider({ children, focusMin: initialFocus, shortBreakMin: initialShort, longBreakMin: initialLong }) {
  const [phase, setPhase] = useState("focus");
  const [cycleIndex, setCycleIndex] = useState(0);
  const [focusMin, setFocusMin] = useState(initialFocus || 25);
  const [shortBreakMin, setShortBreakMin] = useState(initialShort || 5);
  const [longBreakMin, setLongBreakMin] = useState(initialLong || 20);
  const [totalSeconds, setTotalSeconds] = useState((initialFocus || 25) * 60);
  const [remainingSeconds, setRemainingSeconds] = useState((initialFocus || 25) * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const intervalRef = useRef(null);

  // Load settings
  useEffect(() => {
    auth.me().then((u) => {
      const meta = u?.user_metadata || {};
      if (meta.focus_min) setFocusMin(meta.focus_min);
      if (meta.short_break_min) setShortBreakMin(meta.short_break_min);
      if (meta.long_break_min) setLongBreakMin(meta.long_break_min);
    }).catch(() => {});
  }, []);

  // Compute total seconds for current phase
  const getPhaseSeconds = useCallback(() => {
    return phase === "focus" ? focusMin * 60 : cycleIndex < 3 ? shortBreakMin * 60 : longBreakMin * 60;
  }, [phase, cycleIndex, focusMin, shortBreakMin, longBreakMin]);

  // Timer interval
  useEffect(() => {
    if (isRunning && remainingSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // Handle timer completion
  useEffect(() => {
    if (remainingSeconds === 0 && !isRunning && totalSeconds > 0) {
      if (phase === "focus") {
        setSessionCompleted(true);
      }
    }
  }, [remainingSeconds, isRunning, phase]);

  const advancePhase = useCallback(() => {
    if (phase === "focus") {
      setPhase("pause");
      const mins = cycleIndex < 3 ? shortBreakMin : longBreakMin;
      setTotalSeconds(mins * 60);
      setRemainingSeconds(mins * 60);
      setSessionCompleted(false);
    } else {
      const nextCycle = cycleIndex >= 3 ? 0 : cycleIndex + 1;
      setCycleIndex(nextCycle);
      setPhase("focus");
      setTotalSeconds(focusMin * 60);
      setRemainingSeconds(focusMin * 60);
      setSessionCompleted(false);
    }
  }, [phase, cycleIndex, focusMin, shortBreakMin, longBreakMin]);

  const handlePlayPause = useCallback(() => {
    if (remainingSeconds <= 0 && !isRunning) {
      advancePhase();
    }
    setIsRunning((prev) => !prev);
  }, [remainingSeconds, isRunning, advancePhase]);

  const handleSkip = useCallback(() => {
    setIsRunning(false);
    advancePhase();
  }, [advancePhase]);

  const updateSettings = useCallback(({ focus, shortBreak, longBreak }) => {
    if (focus !== undefined) setFocusMin(focus);
    if (shortBreak !== undefined) setShortBreakMin(shortBreak);
    if (longBreak !== undefined) setLongBreakMin(longBreak);
  }, []);

  const resetSessionCompleted = useCallback(() => setSessionCompleted(false), []);

  return (
    <FocusTimerContext.Provider data-source-location="FocusTimerContext:95:4" data-dynamic-content="true" value={{
      phase, cycleIndex, totalSeconds, remainingSeconds, isRunning,
      sessionCompleted, focusMin, shortBreakMin, longBreakMin,
      handlePlayPause, handleSkip, advancePhase,
      updateSettings, resetSessionCompleted
    }}>
      {children}
    </FocusTimerContext.Provider>);

}

export function useFocusTimer() {
  const ctx = useContext(FocusTimerContext);
  if (!ctx) throw new Error("useFocusTimer must be used within FocusTimerProvider");
  return ctx;
}