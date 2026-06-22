import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/ScrollToTop.jsx");import * as RefreshRuntime from "/@react-refresh";
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/components/ScrollToTop.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport2_react from "/node_modules/.vite/deps/react.js?v=fc940917"; const useEffect = __vite__cjsImport2_react["useEffect"];
import { useLocation, useNavigationType } from "/node_modules/.vite/deps/react-router-dom.js?v=8a08d97a";
const getHashId = (hash) => {
  const rawId = hash.slice(1);
  try {
    return decodeURIComponent(rawId);
  } catch {
    return rawId;
  }
};
export default function ScrollToTop() {
  _s();
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();
  useEffect(() => {
    if (navigationType === "POP") return;
    if (hash) {
      const id = getHashId(hash);
      const timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash, navigationType]);
  return null;
}
_s(ScrollToTop, "ah7NLVUtoiFScKaEOs34KR3n9pE=", false, function() {
  return [useLocation, useNavigationType];
});
_c = ScrollToTop;
var _c;
$RefreshReg$(_c, "ScrollToTop");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/components/ScrollToTop.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/components/ScrollToTop.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLGlCQUFpQjtBQUMxQixTQUFTQyxhQUFhQyx5QkFBeUI7QUFFL0MsTUFBTUMsWUFBWUEsQ0FBQ0MsU0FBUztBQUMxQixRQUFNQyxRQUFRRCxLQUFLRSxNQUFNLENBQUM7QUFFMUIsTUFBSTtBQUNGLFdBQU9DLG1CQUFtQkYsS0FBSztBQUFBLEVBQ2pDLFFBQVE7QUFDTixXQUFPQTtBQUFBQSxFQUNUO0FBQ0Y7QUFFQSx3QkFBd0JHLGNBQWM7QUFBQUMsS0FBQTtBQUNwQyxRQUFNLEVBQUVDLFVBQVVOLEtBQUssSUFBSUgsWUFBWTtBQUN2QyxRQUFNVSxpQkFBaUJULGtCQUFrQjtBQUV6Q0YsWUFBVSxNQUFNO0FBQ2QsUUFBSVcsbUJBQW1CLE1BQU87QUFFOUIsUUFBSVAsTUFBTTtBQUNSLFlBQU1RLEtBQUtULFVBQVVDLElBQUk7QUFDekIsWUFBTVMsUUFBUUMsT0FBT0MsV0FBVyxNQUFNO0FBQ3BDQyxpQkFBU0MsZUFBZUwsRUFBRSxHQUFHTSxlQUFlLEVBQUVDLFVBQVUsU0FBUyxDQUFDO0FBQUEsTUFDcEUsR0FBRyxFQUFFO0FBQ0wsYUFBTyxNQUFNTCxPQUFPTSxhQUFhUCxLQUFLO0FBQUEsSUFDeEM7QUFFQUMsV0FBT08sU0FBUyxFQUFFQyxLQUFLLEdBQUdDLE1BQU0sR0FBR0osVUFBVSxVQUFVLENBQUM7QUFBQSxFQUMxRCxHQUFHLENBQUNULFVBQVVOLE1BQU1PLGNBQWMsQ0FBQztBQUVuQyxTQUFPO0FBQ1Q7QUFBQ0YsR0FuQnVCRCxhQUFXO0FBQUEsVUFDTlAsYUFDSkMsaUJBQWlCO0FBQUE7QUFBQSxLQUZsQk07QUFBVyxJQUFBZ0I7QUFBQSxhQUFBQSxJQUFBIiwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlTG9jYXRpb24iLCJ1c2VOYXZpZ2F0aW9uVHlwZSIsImdldEhhc2hJZCIsImhhc2giLCJyYXdJZCIsInNsaWNlIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiU2Nyb2xsVG9Ub3AiLCJfcyIsInBhdGhuYW1lIiwibmF2aWdhdGlvblR5cGUiLCJpZCIsInRpbWVyIiwid2luZG93Iiwic2V0VGltZW91dCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzY3JvbGxJbnRvVmlldyIsImJlaGF2aW9yIiwiY2xlYXJUaW1lb3V0Iiwic2Nyb2xsVG8iLCJ0b3AiLCJsZWZ0IiwiX2MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiU2Nyb2xsVG9Ub3AuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlTG9jYXRpb24sIHVzZU5hdmlnYXRpb25UeXBlIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcblxuY29uc3QgZ2V0SGFzaElkID0gKGhhc2gpID0+IHtcbiAgY29uc3QgcmF3SWQgPSBoYXNoLnNsaWNlKDEpO1xuXG4gIHRyeSB7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChyYXdJZCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiByYXdJZDtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2Nyb2xsVG9Ub3AoKSB7XG4gIGNvbnN0IHsgcGF0aG5hbWUsIGhhc2ggfSA9IHVzZUxvY2F0aW9uKCk7XG4gIGNvbnN0IG5hdmlnYXRpb25UeXBlID0gdXNlTmF2aWdhdGlvblR5cGUoKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChuYXZpZ2F0aW9uVHlwZSA9PT0gXCJQT1BcIikgcmV0dXJuO1xuXG4gICAgaWYgKGhhc2gpIHtcbiAgICAgIGNvbnN0IGlkID0gZ2V0SGFzaElkKGhhc2gpO1xuICAgICAgY29uc3QgdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKT8uc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcbiAgICAgIH0sIDUwKTtcbiAgICAgIHJldHVybiAoKSA9PiB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICB9XG5cbiAgICB3aW5kb3cuc2Nyb2xsVG8oeyB0b3A6IDAsIGxlZnQ6IDAsIGJlaGF2aW9yOiBcImluc3RhbnRcIiB9KTtcbiAgfSwgW3BhdGhuYW1lLCBoYXNoLCBuYXZpZ2F0aW9uVHlwZV0pO1xuXG4gIHJldHVybiBudWxsO1xufSJdLCJmaWxlIjoiL2FwcC9zcmMvY29tcG9uZW50cy9TY3JvbGxUb1RvcC5qc3gifQ==