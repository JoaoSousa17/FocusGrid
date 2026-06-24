import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { auth } from "@/api/auth";
import { schedulePomodoroNotification, clearPomodoroNotification } from "@/api/integrations";

const FocusTimerContext = createContext(null);
const STORAGE_KEY = "focusgrid_pomodoro_state";

function loadStoredState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveStoredState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

const PHASE_TITLES = {
  focus: "Foco terminado!",
  pause: "Pausa terminada!",
};
const PHASE_BODIES = {
  focus: "Hora de fazer uma pausa.",
  pause: "Hora de voltar ao foco.",
};

export function FocusTimerProvider({ children, focusMin: initialFocus, shortBreakMin: initialShort, longBreakMin: initialLong }) {
  const stored = loadStoredState();

  const [phase, setPhase] = useState(stored?.phase || "focus");
  const [cycleIndex, setCycleIndex] = useState(stored?.cycleIndex ?? 0);
  const [focusMin, setFocusMin] = useState(initialFocus || 25);
  const [shortBreakMin, setShortBreakMin] = useState(initialShort || 5);
  const [longBreakMin, setLongBreakMin] = useState(initialLong || 20);
  const [totalSeconds, setTotalSeconds] = useState(stored?.totalSeconds || (initialFocus || 25) * 60);

  const computeRemaining = (s) => {
    if (!s) return (initialFocus || 25) * 60;
    if (s.isRunning && s.phaseEndAt) {
      return Math.max(0, Math.round((s.phaseEndAt - Date.now()) / 1000));
    }
    return s.remainingSeconds ?? s.totalSeconds;
  };

  const [remainingSeconds, setRemainingSeconds] = useState(computeRemaining(stored));
  const [isRunning, setIsRunning] = useState(() => {
    if (!stored?.isRunning) return false;
    return computeRemaining(stored) > 0;
  });
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const intervalRef = useRef(null);
  const phaseEndAtRef = useRef(stored?.isRunning ? stored.phaseEndAt : null);

  // Load settings
  useEffect(() => {
    auth.me().then((u) => {
      const meta = u?.user_metadata || {};
      if (meta.focus_min) setFocusMin(meta.focus_min);
      if (meta.short_break_min) setShortBreakMin(meta.short_break_min);
      if (meta.long_break_min) setLongBreakMin(meta.long_break_min);
    }).catch(() => {});
  }, []);

  // Persist state on every relevant change
  useEffect(() => {
    saveStoredState({
      phase,
      cycleIndex,
      totalSeconds,
      remainingSeconds,
      isRunning,
      phaseEndAt: phaseEndAtRef.current,
    });
  }, [phase, cycleIndex, totalSeconds, remainingSeconds, isRunning]);

  // Timer interval: recompute from wall-clock time, not decrement-by-1
  useEffect(() => {
    if (!isRunning) {
      clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      const remaining = Math.max(0, Math.round((phaseEndAtRef.current - Date.now()) / 1000));
      setRemainingSeconds(remaining);
      if (remaining <= 0) {
        setIsRunning(false);
      }
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // Recompute remaining immediately when tab regains focus/visibility
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible" && isRunning && phaseEndAtRef.current) {
        const remaining = Math.max(0, Math.round((phaseEndAtRef.current - Date.now()) / 1000));
        setRemainingSeconds(remaining);
        if (remaining <= 0) setIsRunning(false);
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onVisible);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onVisible);
    };
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
    phaseEndAtRef.current = null;
  }, [phase, cycleIndex, focusMin, shortBreakMin, longBreakMin]);

  const handlePlayPause = useCallback(() => {
    if (remainingSeconds <= 0 && !isRunning) {
      advancePhase();
    }
    setIsRunning((prev) => {
      const next = !prev;
      if (next) {
        const secs = remainingSeconds <= 0 ? totalSeconds : remainingSeconds;
        const endAt = Date.now() + secs * 1000;
        phaseEndAtRef.current = endAt;
        const nextPhase = remainingSeconds <= 0 ? (phase === "focus" ? "pause" : "focus") : phase;
        schedulePomodoroNotification({
          firesAt: new Date(endAt).toISOString(),
          phase: nextPhase,
          title: PHASE_TITLES[nextPhase] || "FocusGrid",
          body: PHASE_BODIES[nextPhase] || "",
        });
      } else {
        phaseEndAtRef.current = null;
        clearPomodoroNotification();
      }
      return next;
    });
  }, [remainingSeconds, isRunning, advancePhase, totalSeconds, phase]);

  const handleSkip = useCallback(() => {
    setIsRunning(false);
    phaseEndAtRef.current = null;
    clearPomodoroNotification();
    advancePhase();
  }, [advancePhase]);

  const updateSettings = useCallback(({ focus, shortBreak, longBreak }) => {
    if (focus !== undefined) setFocusMin(focus);
    if (shortBreak !== undefined) setShortBreakMin(shortBreak);
    if (longBreak !== undefined) setLongBreakMin(longBreak);
  }, []);

  const resetSessionCompleted = useCallback(() => setSessionCompleted(false), []);

  // Listen for actions triggered from a push notification (Service Worker
  // postMessage, or ?pomodoro_action=pause|skip when a new window had to be opened).
  useEffect(() => {
    const applyAction = (action) => {
      if (action === "pause") {
        setIsRunning(false);
        phaseEndAtRef.current = null;
        clearPomodoroNotification();
      } else if (action === "skip") {
        handleSkip();
      }
    };

    const params = new URLSearchParams(window.location.search);
    const action = params.get("pomodoro_action");
    if (action) {
      applyAction(action);
      params.delete("pomodoro_action");
      const newSearch = params.toString();
      const newUrl = window.location.pathname + (newSearch ? `?${newSearch}` : "") + window.location.hash;
      window.history.replaceState({}, "", newUrl);
    }

    const onMessage = (event) => {
      if (event.data?.type === "pomodoro_action") applyAction(event.data.action);
    };
    navigator.serviceWorker?.addEventListener?.("message", onMessage);
    return () => navigator.serviceWorker?.removeEventListener?.("message", onMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
