import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/context/FocusTimerContext.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/context/FocusTimerContext.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=fc940917"; const createContext = __vite__cjsImport3_react["createContext"]; const useContext = __vite__cjsImport3_react["useContext"]; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"]; const useRef = __vite__cjsImport3_react["useRef"]; const useCallback = __vite__cjsImport3_react["useCallback"];
import { base44 } from "/src/api/base44Client.js";
const FocusTimerContext = createContext(null);
export function FocusTimerProvider({ children, focusMin: initialFocus, shortBreakMin: initialShort, longBreakMin: initialLong }) {
  _s();
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
  useEffect(() => {
    base44.auth.me().then((u) => {
      if (u?.focus_min) setFocusMin(u.focus_min);
      if (u?.short_break_min) setShortBreakMin(u.short_break_min);
      if (u?.long_break_min) setLongBreakMin(u.long_break_min);
    }).catch(() => {
    });
  }, []);
  const getPhaseSeconds = useCallback(() => {
    return phase === "focus" ? focusMin * 60 : cycleIndex < 3 ? shortBreakMin * 60 : longBreakMin * 60;
  }, [phase, cycleIndex, focusMin, shortBreakMin, longBreakMin]);
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
      }, 1e3);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);
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
    if (focus !== void 0) setFocusMin(focus);
    if (shortBreak !== void 0) setShortBreakMin(shortBreak);
    if (longBreak !== void 0) setLongBreakMin(longBreak);
  }, []);
  const resetSessionCompleted = useCallback(() => setSessionCompleted(false), []);
  return /* @__PURE__ */ jsxDEV(FocusTimerContext.Provider, { "data-source-location": "FocusTimerContext:95:4", "data-dynamic-content": "true", value: {
    phase,
    cycleIndex,
    totalSeconds,
    remainingSeconds,
    isRunning,
    sessionCompleted,
    focusMin,
    shortBreakMin,
    longBreakMin,
    handlePlayPause,
    handleSkip,
    advancePhase,
    updateSettings,
    resetSessionCompleted
  }, children }, void 0, false, {
    fileName: "/app/src/context/FocusTimerContext.jsx",
    lineNumber: 114,
    columnNumber: 5
  }, this);
}
_s(FocusTimerProvider, "JW+nJwZoO48kxQ31vXGSkjNhcws=");
_c = FocusTimerProvider;
export function useFocusTimer() {
  _s2();
  const ctx = useContext(FocusTimerContext);
  if (!ctx) throw new Error("useFocusTimer must be used within FocusTimerProvider");
  return ctx;
}
_s2(useFocusTimer, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
$RefreshReg$(_c, "FocusTimerProvider");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/context/FocusTimerContext.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/context/FocusTimerContext.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBOEZJOzs7Ozs7Ozs7Ozs7Ozs7OztBQTlGSixTQUFTQSxlQUFlQyxZQUFZQyxVQUFVQyxXQUFXQyxRQUFRQyxtQkFBbUI7QUFDcEYsU0FBU0MsY0FBYztBQUV2QixNQUFNQyxvQkFBb0JQLGNBQWMsSUFBSTtBQUVyQyxnQkFBU1EsbUJBQW1CLEVBQUVDLFVBQVVDLFVBQVVDLGNBQWNDLGVBQWVDLGNBQWNDLGNBQWNDLFlBQVksR0FBRztBQUFBQyxLQUFBO0FBQy9ILFFBQU0sQ0FBQ0MsT0FBT0MsUUFBUSxJQUFJaEIsU0FBUyxPQUFPO0FBQzFDLFFBQU0sQ0FBQ2lCLFlBQVlDLGFBQWEsSUFBSWxCLFNBQVMsQ0FBQztBQUM5QyxRQUFNLENBQUNRLFVBQVVXLFdBQVcsSUFBSW5CLFNBQVNTLGdCQUFnQixFQUFFO0FBQzNELFFBQU0sQ0FBQ0MsZUFBZVUsZ0JBQWdCLElBQUlwQixTQUFTVyxnQkFBZ0IsQ0FBQztBQUNwRSxRQUFNLENBQUNDLGNBQWNTLGVBQWUsSUFBSXJCLFNBQVNhLGVBQWUsRUFBRTtBQUNsRSxRQUFNLENBQUNTLGNBQWNDLGVBQWUsSUFBSXZCLFVBQVVTLGdCQUFnQixNQUFNLEVBQUU7QUFDMUUsUUFBTSxDQUFDZSxrQkFBa0JDLG1CQUFtQixJQUFJekIsVUFBVVMsZ0JBQWdCLE1BQU0sRUFBRTtBQUNsRixRQUFNLENBQUNpQixXQUFXQyxZQUFZLElBQUkzQixTQUFTLEtBQUs7QUFDaEQsUUFBTSxDQUFDNEIsa0JBQWtCQyxtQkFBbUIsSUFBSTdCLFNBQVMsS0FBSztBQUM5RCxRQUFNOEIsY0FBYzVCLE9BQU8sSUFBSTtBQUcvQkQsWUFBVSxNQUFNO0FBQ2RHLFdBQU8yQixLQUFLQyxHQUFHLEVBQUVDLEtBQUssQ0FBQ0MsTUFBTTtBQUMzQixVQUFJQSxHQUFHQyxVQUFXaEIsYUFBWWUsRUFBRUMsU0FBUztBQUN6QyxVQUFJRCxHQUFHRSxnQkFBaUJoQixrQkFBaUJjLEVBQUVFLGVBQWU7QUFDMUQsVUFBSUYsR0FBR0csZUFBZ0JoQixpQkFBZ0JhLEVBQUVHLGNBQWM7QUFBQSxJQUN6RCxDQUFDLEVBQUVDLE1BQU0sTUFBTTtBQUFBLElBQUMsQ0FBQztBQUFBLEVBQ25CLEdBQUcsRUFBRTtBQUdMLFFBQU1DLGtCQUFrQnBDLFlBQVksTUFBTTtBQUN4QyxXQUFPWSxVQUFVLFVBQVVQLFdBQVcsS0FBS1MsYUFBYSxJQUFJUCxnQkFBZ0IsS0FBS0UsZUFBZTtBQUFBLEVBQ2xHLEdBQUcsQ0FBQ0csT0FBT0UsWUFBWVQsVUFBVUUsZUFBZUUsWUFBWSxDQUFDO0FBRzdEWCxZQUFVLE1BQU07QUFDZCxRQUFJeUIsYUFBYUYsbUJBQW1CLEdBQUc7QUFDckNNLGtCQUFZVSxVQUFVQyxZQUFZLE1BQU07QUFDdENoQiw0QkFBb0IsQ0FBQ2lCLFNBQVM7QUFDNUIsY0FBSUEsUUFBUSxHQUFHO0FBQ2JmLHlCQUFhLEtBQUs7QUFDbEIsbUJBQU87QUFBQSxVQUNUO0FBQ0EsaUJBQU9lLE9BQU87QUFBQSxRQUNoQixDQUFDO0FBQUEsTUFDSCxHQUFHLEdBQUk7QUFBQSxJQUNUO0FBQ0EsV0FBTyxNQUFNQyxjQUFjYixZQUFZVSxPQUFPO0FBQUEsRUFDaEQsR0FBRyxDQUFDZCxTQUFTLENBQUM7QUFHZHpCLFlBQVUsTUFBTTtBQUNkLFFBQUl1QixxQkFBcUIsS0FBSyxDQUFDRSxhQUFhSixlQUFlLEdBQUc7QUFDNUQsVUFBSVAsVUFBVSxTQUFTO0FBQ3JCYyw0QkFBb0IsSUFBSTtBQUFBLE1BQzFCO0FBQUEsSUFDRjtBQUFBLEVBQ0YsR0FBRyxDQUFDTCxrQkFBa0JFLFdBQVdYLEtBQUssQ0FBQztBQUV2QyxRQUFNNkIsZUFBZXpDLFlBQVksTUFBTTtBQUNyQyxRQUFJWSxVQUFVLFNBQVM7QUFDckJDLGVBQVMsT0FBTztBQUNoQixZQUFNNkIsT0FBTzVCLGFBQWEsSUFBSVAsZ0JBQWdCRTtBQUM5Q1csc0JBQWdCc0IsT0FBTyxFQUFFO0FBQ3pCcEIsMEJBQW9Cb0IsT0FBTyxFQUFFO0FBQzdCaEIsMEJBQW9CLEtBQUs7QUFBQSxJQUMzQixPQUFPO0FBQ0wsWUFBTWlCLFlBQVk3QixjQUFjLElBQUksSUFBSUEsYUFBYTtBQUNyREMsb0JBQWM0QixTQUFTO0FBQ3ZCOUIsZUFBUyxPQUFPO0FBQ2hCTyxzQkFBZ0JmLFdBQVcsRUFBRTtBQUM3QmlCLDBCQUFvQmpCLFdBQVcsRUFBRTtBQUNqQ3FCLDBCQUFvQixLQUFLO0FBQUEsSUFDM0I7QUFBQSxFQUNGLEdBQUcsQ0FBQ2QsT0FBT0UsWUFBWVQsVUFBVUUsZUFBZUUsWUFBWSxDQUFDO0FBRTdELFFBQU1tQyxrQkFBa0I1QyxZQUFZLE1BQU07QUFDeEMsUUFBSXFCLG9CQUFvQixLQUFLLENBQUNFLFdBQVc7QUFDdkNrQixtQkFBYTtBQUFBLElBQ2Y7QUFDQWpCLGlCQUFhLENBQUNlLFNBQVMsQ0FBQ0EsSUFBSTtBQUFBLEVBQzlCLEdBQUcsQ0FBQ2xCLGtCQUFrQkUsV0FBV2tCLFlBQVksQ0FBQztBQUU5QyxRQUFNSSxhQUFhN0MsWUFBWSxNQUFNO0FBQ25Dd0IsaUJBQWEsS0FBSztBQUNsQmlCLGlCQUFhO0FBQUEsRUFDZixHQUFHLENBQUNBLFlBQVksQ0FBQztBQUVqQixRQUFNSyxpQkFBaUI5QyxZQUFZLENBQUMsRUFBRStDLE9BQU9DLFlBQVlDLFVBQVUsTUFBTTtBQUN2RSxRQUFJRixVQUFVRyxPQUFXbEMsYUFBWStCLEtBQUs7QUFDMUMsUUFBSUMsZUFBZUUsT0FBV2pDLGtCQUFpQitCLFVBQVU7QUFDekQsUUFBSUMsY0FBY0MsT0FBV2hDLGlCQUFnQitCLFNBQVM7QUFBQSxFQUN4RCxHQUFHLEVBQUU7QUFFTCxRQUFNRSx3QkFBd0JuRCxZQUFZLE1BQU0wQixvQkFBb0IsS0FBSyxHQUFHLEVBQUU7QUFFOUUsU0FDRSx1QkFBQyxrQkFBa0IsVUFBbEIsRUFBMkIsd0JBQXFCLDBCQUF5Qix3QkFBcUIsUUFBTyxPQUFPO0FBQUEsSUFDM0dkO0FBQUFBLElBQU9FO0FBQUFBLElBQVlLO0FBQUFBLElBQWNFO0FBQUFBLElBQWtCRTtBQUFBQSxJQUNuREU7QUFBQUEsSUFBa0JwQjtBQUFBQSxJQUFVRTtBQUFBQSxJQUFlRTtBQUFBQSxJQUMzQ21DO0FBQUFBLElBQWlCQztBQUFBQSxJQUFZSjtBQUFBQSxJQUM3Qks7QUFBQUEsSUFBZ0JLO0FBQUFBLEVBQ2xCLEdBQ0cvQyxZQU5IO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FPQTtBQUVKO0FBQUNPLEdBbEdlUixvQkFBa0I7QUFBQSxLQUFsQkE7QUFvR1QsZ0JBQVNpRCxnQkFBZ0I7QUFBQUMsTUFBQTtBQUM5QixRQUFNQyxNQUFNMUQsV0FBV00saUJBQWlCO0FBQ3hDLE1BQUksQ0FBQ29ELElBQUssT0FBTSxJQUFJQyxNQUFNLHNEQUFzRDtBQUNoRixTQUFPRDtBQUNUO0FBQUNELElBSmVELGVBQWE7QUFBQSxJQUFBSTtBQUFBLGFBQUFBLElBQUEiLCJuYW1lcyI6WyJjcmVhdGVDb250ZXh0IiwidXNlQ29udGV4dCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlUmVmIiwidXNlQ2FsbGJhY2siLCJiYXNlNDQiLCJGb2N1c1RpbWVyQ29udGV4dCIsIkZvY3VzVGltZXJQcm92aWRlciIsImNoaWxkcmVuIiwiZm9jdXNNaW4iLCJpbml0aWFsRm9jdXMiLCJzaG9ydEJyZWFrTWluIiwiaW5pdGlhbFNob3J0IiwibG9uZ0JyZWFrTWluIiwiaW5pdGlhbExvbmciLCJfcyIsInBoYXNlIiwic2V0UGhhc2UiLCJjeWNsZUluZGV4Iiwic2V0Q3ljbGVJbmRleCIsInNldEZvY3VzTWluIiwic2V0U2hvcnRCcmVha01pbiIsInNldExvbmdCcmVha01pbiIsInRvdGFsU2Vjb25kcyIsInNldFRvdGFsU2Vjb25kcyIsInJlbWFpbmluZ1NlY29uZHMiLCJzZXRSZW1haW5pbmdTZWNvbmRzIiwiaXNSdW5uaW5nIiwic2V0SXNSdW5uaW5nIiwic2Vzc2lvbkNvbXBsZXRlZCIsInNldFNlc3Npb25Db21wbGV0ZWQiLCJpbnRlcnZhbFJlZiIsImF1dGgiLCJtZSIsInRoZW4iLCJ1IiwiZm9jdXNfbWluIiwic2hvcnRfYnJlYWtfbWluIiwibG9uZ19icmVha19taW4iLCJjYXRjaCIsImdldFBoYXNlU2Vjb25kcyIsImN1cnJlbnQiLCJzZXRJbnRlcnZhbCIsInByZXYiLCJjbGVhckludGVydmFsIiwiYWR2YW5jZVBoYXNlIiwibWlucyIsIm5leHRDeWNsZSIsImhhbmRsZVBsYXlQYXVzZSIsImhhbmRsZVNraXAiLCJ1cGRhdGVTZXR0aW5ncyIsImZvY3VzIiwic2hvcnRCcmVhayIsImxvbmdCcmVhayIsInVuZGVmaW5lZCIsInJlc2V0U2Vzc2lvbkNvbXBsZXRlZCIsInVzZUZvY3VzVGltZXIiLCJfczIiLCJjdHgiLCJFcnJvciIsIl9jIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIkZvY3VzVGltZXJDb250ZXh0LmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBiYXNlNDQgfSBmcm9tIFwiQC9hcGkvYmFzZTQ0Q2xpZW50XCI7XG5cbmNvbnN0IEZvY3VzVGltZXJDb250ZXh0ID0gY3JlYXRlQ29udGV4dChudWxsKTtcblxuZXhwb3J0IGZ1bmN0aW9uIEZvY3VzVGltZXJQcm92aWRlcih7IGNoaWxkcmVuLCBmb2N1c01pbjogaW5pdGlhbEZvY3VzLCBzaG9ydEJyZWFrTWluOiBpbml0aWFsU2hvcnQsIGxvbmdCcmVha01pbjogaW5pdGlhbExvbmcgfSkge1xuICBjb25zdCBbcGhhc2UsIHNldFBoYXNlXSA9IHVzZVN0YXRlKFwiZm9jdXNcIik7XG4gIGNvbnN0IFtjeWNsZUluZGV4LCBzZXRDeWNsZUluZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbZm9jdXNNaW4sIHNldEZvY3VzTWluXSA9IHVzZVN0YXRlKGluaXRpYWxGb2N1cyB8fCAyNSk7XG4gIGNvbnN0IFtzaG9ydEJyZWFrTWluLCBzZXRTaG9ydEJyZWFrTWluXSA9IHVzZVN0YXRlKGluaXRpYWxTaG9ydCB8fCA1KTtcbiAgY29uc3QgW2xvbmdCcmVha01pbiwgc2V0TG9uZ0JyZWFrTWluXSA9IHVzZVN0YXRlKGluaXRpYWxMb25nIHx8IDIwKTtcbiAgY29uc3QgW3RvdGFsU2Vjb25kcywgc2V0VG90YWxTZWNvbmRzXSA9IHVzZVN0YXRlKChpbml0aWFsRm9jdXMgfHwgMjUpICogNjApO1xuICBjb25zdCBbcmVtYWluaW5nU2Vjb25kcywgc2V0UmVtYWluaW5nU2Vjb25kc10gPSB1c2VTdGF0ZSgoaW5pdGlhbEZvY3VzIHx8IDI1KSAqIDYwKTtcbiAgY29uc3QgW2lzUnVubmluZywgc2V0SXNSdW5uaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nlc3Npb25Db21wbGV0ZWQsIHNldFNlc3Npb25Db21wbGV0ZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBpbnRlcnZhbFJlZiA9IHVzZVJlZihudWxsKTtcblxuICAvLyBMb2FkIHNldHRpbmdzXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgYmFzZTQ0LmF1dGgubWUoKS50aGVuKCh1KSA9PiB7XG4gICAgICBpZiAodT8uZm9jdXNfbWluKSBzZXRGb2N1c01pbih1LmZvY3VzX21pbik7XG4gICAgICBpZiAodT8uc2hvcnRfYnJlYWtfbWluKSBzZXRTaG9ydEJyZWFrTWluKHUuc2hvcnRfYnJlYWtfbWluKTtcbiAgICAgIGlmICh1Py5sb25nX2JyZWFrX21pbikgc2V0TG9uZ0JyZWFrTWluKHUubG9uZ19icmVha19taW4pO1xuICAgIH0pLmNhdGNoKCgpID0+IHt9KTtcbiAgfSwgW10pO1xuXG4gIC8vIENvbXB1dGUgdG90YWwgc2Vjb25kcyBmb3IgY3VycmVudCBwaGFzZVxuICBjb25zdCBnZXRQaGFzZVNlY29uZHMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgcmV0dXJuIHBoYXNlID09PSBcImZvY3VzXCIgPyBmb2N1c01pbiAqIDYwIDogY3ljbGVJbmRleCA8IDMgPyBzaG9ydEJyZWFrTWluICogNjAgOiBsb25nQnJlYWtNaW4gKiA2MDtcbiAgfSwgW3BoYXNlLCBjeWNsZUluZGV4LCBmb2N1c01pbiwgc2hvcnRCcmVha01pbiwgbG9uZ0JyZWFrTWluXSk7XG5cbiAgLy8gVGltZXIgaW50ZXJ2YWxcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNSdW5uaW5nICYmIHJlbWFpbmluZ1NlY29uZHMgPiAwKSB7XG4gICAgICBpbnRlcnZhbFJlZi5jdXJyZW50ID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBzZXRSZW1haW5pbmdTZWNvbmRzKChwcmV2KSA9PiB7XG4gICAgICAgICAgaWYgKHByZXYgPD0gMSkge1xuICAgICAgICAgICAgc2V0SXNSdW5uaW5nKGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcHJldiAtIDE7XG4gICAgICAgIH0pO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfVxuICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKGludGVydmFsUmVmLmN1cnJlbnQpO1xuICB9LCBbaXNSdW5uaW5nXSk7XG5cbiAgLy8gSGFuZGxlIHRpbWVyIGNvbXBsZXRpb25cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAocmVtYWluaW5nU2Vjb25kcyA9PT0gMCAmJiAhaXNSdW5uaW5nICYmIHRvdGFsU2Vjb25kcyA+IDApIHtcbiAgICAgIGlmIChwaGFzZSA9PT0gXCJmb2N1c1wiKSB7XG4gICAgICAgIHNldFNlc3Npb25Db21wbGV0ZWQodHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9LCBbcmVtYWluaW5nU2Vjb25kcywgaXNSdW5uaW5nLCBwaGFzZV0pO1xuXG4gIGNvbnN0IGFkdmFuY2VQaGFzZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAocGhhc2UgPT09IFwiZm9jdXNcIikge1xuICAgICAgc2V0UGhhc2UoXCJwYXVzZVwiKTtcbiAgICAgIGNvbnN0IG1pbnMgPSBjeWNsZUluZGV4IDwgMyA/IHNob3J0QnJlYWtNaW4gOiBsb25nQnJlYWtNaW47XG4gICAgICBzZXRUb3RhbFNlY29uZHMobWlucyAqIDYwKTtcbiAgICAgIHNldFJlbWFpbmluZ1NlY29uZHMobWlucyAqIDYwKTtcbiAgICAgIHNldFNlc3Npb25Db21wbGV0ZWQoZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuZXh0Q3ljbGUgPSBjeWNsZUluZGV4ID49IDMgPyAwIDogY3ljbGVJbmRleCArIDE7XG4gICAgICBzZXRDeWNsZUluZGV4KG5leHRDeWNsZSk7XG4gICAgICBzZXRQaGFzZShcImZvY3VzXCIpO1xuICAgICAgc2V0VG90YWxTZWNvbmRzKGZvY3VzTWluICogNjApO1xuICAgICAgc2V0UmVtYWluaW5nU2Vjb25kcyhmb2N1c01pbiAqIDYwKTtcbiAgICAgIHNldFNlc3Npb25Db21wbGV0ZWQoZmFsc2UpO1xuICAgIH1cbiAgfSwgW3BoYXNlLCBjeWNsZUluZGV4LCBmb2N1c01pbiwgc2hvcnRCcmVha01pbiwgbG9uZ0JyZWFrTWluXSk7XG5cbiAgY29uc3QgaGFuZGxlUGxheVBhdXNlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChyZW1haW5pbmdTZWNvbmRzIDw9IDAgJiYgIWlzUnVubmluZykge1xuICAgICAgYWR2YW5jZVBoYXNlKCk7XG4gICAgfVxuICAgIHNldElzUnVubmluZygocHJldikgPT4gIXByZXYpO1xuICB9LCBbcmVtYWluaW5nU2Vjb25kcywgaXNSdW5uaW5nLCBhZHZhbmNlUGhhc2VdKTtcblxuICBjb25zdCBoYW5kbGVTa2lwID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldElzUnVubmluZyhmYWxzZSk7XG4gICAgYWR2YW5jZVBoYXNlKCk7XG4gIH0sIFthZHZhbmNlUGhhc2VdKTtcblxuICBjb25zdCB1cGRhdGVTZXR0aW5ncyA9IHVzZUNhbGxiYWNrKCh7IGZvY3VzLCBzaG9ydEJyZWFrLCBsb25nQnJlYWsgfSkgPT4ge1xuICAgIGlmIChmb2N1cyAhPT0gdW5kZWZpbmVkKSBzZXRGb2N1c01pbihmb2N1cyk7XG4gICAgaWYgKHNob3J0QnJlYWsgIT09IHVuZGVmaW5lZCkgc2V0U2hvcnRCcmVha01pbihzaG9ydEJyZWFrKTtcbiAgICBpZiAobG9uZ0JyZWFrICE9PSB1bmRlZmluZWQpIHNldExvbmdCcmVha01pbihsb25nQnJlYWspO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgcmVzZXRTZXNzaW9uQ29tcGxldGVkID0gdXNlQ2FsbGJhY2soKCkgPT4gc2V0U2Vzc2lvbkNvbXBsZXRlZChmYWxzZSksIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxGb2N1c1RpbWVyQ29udGV4dC5Qcm92aWRlciBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIkZvY3VzVGltZXJDb250ZXh0Ojk1OjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiB2YWx1ZT17e1xuICAgICAgcGhhc2UsIGN5Y2xlSW5kZXgsIHRvdGFsU2Vjb25kcywgcmVtYWluaW5nU2Vjb25kcywgaXNSdW5uaW5nLFxuICAgICAgc2Vzc2lvbkNvbXBsZXRlZCwgZm9jdXNNaW4sIHNob3J0QnJlYWtNaW4sIGxvbmdCcmVha01pbixcbiAgICAgIGhhbmRsZVBsYXlQYXVzZSwgaGFuZGxlU2tpcCwgYWR2YW5jZVBoYXNlLFxuICAgICAgdXBkYXRlU2V0dGluZ3MsIHJlc2V0U2Vzc2lvbkNvbXBsZXRlZFxuICAgIH19PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvRm9jdXNUaW1lckNvbnRleHQuUHJvdmlkZXI+KTtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlRm9jdXNUaW1lcigpIHtcbiAgY29uc3QgY3R4ID0gdXNlQ29udGV4dChGb2N1c1RpbWVyQ29udGV4dCk7XG4gIGlmICghY3R4KSB0aHJvdyBuZXcgRXJyb3IoXCJ1c2VGb2N1c1RpbWVyIG11c3QgYmUgdXNlZCB3aXRoaW4gRm9jdXNUaW1lclByb3ZpZGVyXCIpO1xuICByZXR1cm4gY3R4O1xufSJdLCJmaWxlIjoiL2FwcC9zcmMvY29udGV4dC9Gb2N1c1RpbWVyQ29udGV4dC5qc3gifQ==