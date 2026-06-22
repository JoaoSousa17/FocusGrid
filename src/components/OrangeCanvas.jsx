import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/OrangeCanvas.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/components/OrangeCanvas.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=fc940917"; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"]; const useRef = __vite__cjsImport3_react["useRef"]; const useCallback = __vite__cjsImport3_react["useCallback"];
import { motion } from "/node_modules/.vite/deps/framer-motion.js?v=fc940917";
const ORANGE_IMG = "https://media.base44.com/images/public/6a36e44c52b5b1b814763abc/54c028201_2026-06-21s021603.png";
const GRAVITY = 0.6;
const GROUND_Y = 85;
const BUTTON_TOP = 68;
export default function OrangeCanvas({ oranges, buttonRef, onAllLanded }) {
  _s();
  const [items, setItems] = useState([]);
  const [landed, setLanded] = useState([]);
  const animFrame = useRef();
  const orangeId = useRef(0);
  useEffect(() => {
    if (oranges <= 0) return;
    setItems([]);
    setLanded([]);
    orangeId.current = 0;
    const spawnInterval = setInterval(() => {
      const id = orangeId.current++;
      if (id >= oranges) {
        clearInterval(spawnInterval);
        return;
      }
      const x = 15 + Math.random() * 70;
      setItems((prev) => [...prev, {
        id,
        x,
        y: -10,
        vy: 0,
        rotation: Math.random() * 360,
        size: 28 + Math.random() * 14,
        landed: false
      }]);
    }, 400);
    return () => clearInterval(spawnInterval);
  }, [oranges]);
  useEffect(() => {
    if (items.length === 0) return;
    const animate = () => {
      setItems((prev) => {
        let allDone = true;
        const updated = prev.map((item) => {
          if (item.landed) return item;
          allDone = false;
          let newY = item.y + item.vy;
          let newVy = item.vy + GRAVITY;
          const btnEl = buttonRef?.current;
          let btnBounds = null;
          if (btnEl) {
            const rect = btnEl.getBoundingClientRect();
            btnBounds = {
              left: rect.left / window.innerWidth * 100,
              right: rect.right / window.innerWidth * 100,
              top: rect.top / window.innerHeight * 100
            };
          }
          if (btnBounds) {
            const orangeLeft = item.x - item.size * 0.4;
            const orangeRight = item.x + item.size * 0.4;
            const orangeBottom = newY + item.size * 0.5;
            if (orangeRight > btnBounds.left - 2 && orangeLeft < btnBounds.right + 2 && orangeBottom > btnBounds.top - 5) {
              newY = btnBounds.top - item.size * 0.5 - 2;
              newVy = 0;
              return { ...item, y: newY, vy: newVy, landed: true };
            }
          }
          if (newY >= GROUND_Y) {
            newY = GROUND_Y;
            newVy = 0;
            return { ...item, y: newY, vy: newVy, landed: true };
          }
          return { ...item, y: newY, vy: newVy };
        });
        if (allDone && updated.length > 0) {
          setLanded(updated);
          if (onAllLanded) onAllLanded();
          return prev;
        }
        return updated;
      });
      animFrame.current = requestAnimationFrame(animate);
    };
    animFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame.current);
  }, [items.length]);
  const display = landed.length > 0 ? landed : items;
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/OrangeCanvas:112:4", "data-dynamic-content": "true", className: "fixed inset-0 pointer-events-none z-0 overflow-hidden", children: display.map(
    (item) => /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        "data-source-location": "components/OrangeCanvas:114:8",
        "data-dynamic-content": "true",
        className: "absolute",
        style: {
          left: `${item.x}%`,
          top: `${item.y}%`,
          width: item.size,
          height: item.size,
          transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`
        },
        "data-collection-item-id": item?.id,
        children: /* @__PURE__ */ jsxDEV(
          "img",
          {
            "data-source-location": "components/OrangeCanvas:125:10",
            "data-dynamic-content": "true",
            src: ORANGE_IMG,
            alt: "laranja",
            className: "w-full h-full object-contain",
            style: { filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))" }
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/OrangeCanvas.jsx",
            lineNumber: 144,
            columnNumber: 11
          },
          this
        )
      },
      item.id,
      false,
      {
        fileName: "/app/src/components/OrangeCanvas.jsx",
        lineNumber: 133,
        columnNumber: 7
      },
      this
    )
  ) }, void 0, false, {
    fileName: "/app/src/components/OrangeCanvas.jsx",
    lineNumber: 131,
    columnNumber: 5
  }, this);
}
_s(OrangeCanvas, "mi5DAm8o5DV3KWvzSPulMK02cqU=");
_c = OrangeCanvas;
var _c;
$RefreshReg$(_c, "OrangeCanvas");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/components/OrangeCanvas.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/components/OrangeCanvas.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QUFxQjtBQUFBLFlBQWlDLHdCQUFxQjtBQUFBLFlBQ2xGLEtBQUtsQjtBQUFBQSxZQUNMLEtBQUk7QUFBQSxZQUNKLFdBQVU7QUFBQSxZQUNWLE9BQU8sRUFBRXVELFFBQVEsMENBQTBDO0FBQUE7QUFBQSxVQUp6RDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFJMkQ7QUFBQTtBQUFBLE1BZDFEdEIsS0FBS2Y7QUFBQUEsTUFEVjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBaUJFO0FBQUEsRUFDRixLQXBCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBcUJBO0FBRUo7QUFBQ1YsR0E5SHVCSixjQUFZO0FBQUEsS0FBWkE7QUFBWSxJQUFBb0Q7QUFBQSxhQUFBQSxJQUFBIiwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJ1c2VDYWxsYmFjayIsIm1vdGlvbiIsIk9SQU5HRV9JTUciLCJHUkFWSVRZIiwiR1JPVU5EX1kiLCJCVVRUT05fVE9QIiwiT3JhbmdlQ2FudmFzIiwib3JhbmdlcyIsImJ1dHRvblJlZiIsIm9uQWxsTGFuZGVkIiwiX3MiLCJpdGVtcyIsInNldEl0ZW1zIiwibGFuZGVkIiwic2V0TGFuZGVkIiwiYW5pbUZyYW1lIiwib3JhbmdlSWQiLCJjdXJyZW50Iiwic3Bhd25JbnRlcnZhbCIsInNldEludGVydmFsIiwiaWQiLCJjbGVhckludGVydmFsIiwieCIsIk1hdGgiLCJyYW5kb20iLCJwcmV2IiwieSIsInZ5Iiwicm90YXRpb24iLCJzaXplIiwibGVuZ3RoIiwiYW5pbWF0ZSIsImFsbERvbmUiLCJ1cGRhdGVkIiwibWFwIiwiaXRlbSIsIm5ld1kiLCJuZXdWeSIsImJ0bkVsIiwiYnRuQm91bmRzIiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImxlZnQiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwicmlnaHQiLCJ0b3AiLCJpbm5lckhlaWdodCIsIm9yYW5nZUxlZnQiLCJvcmFuZ2VSaWdodCIsIm9yYW5nZUJvdHRvbSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiZGlzcGxheSIsIndpZHRoIiwiaGVpZ2h0IiwidHJhbnNmb3JtIiwiZmlsdGVyIiwiX2MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiT3JhbmdlQ2FudmFzLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBtb3Rpb24gfSBmcm9tIFwiZnJhbWVyLW1vdGlvblwiO1xuXG5jb25zdCBPUkFOR0VfSU1HID0gXCJodHRwczovL21lZGlhLmJhc2U0NC5jb20vaW1hZ2VzL3B1YmxpYy82YTM2ZTQ0YzUyYjViMWI4MTQ3NjNhYmMvNTRjMDI4MjAxXzIwMjYtMDYtMjFzMDIxNjAzLnBuZ1wiO1xuY29uc3QgR1JBVklUWSA9IDAuNjtcbmNvbnN0IEdST1VORF9ZID0gODU7IC8vICUgZnJvbSB0b3Agd2hlcmUgb3JhbmdlcyBsYW5kXG5jb25zdCBCVVRUT05fVE9QID0gNjg7IC8vICUgZnJvbSB0b3Agd2hlcmUgYnV0dG9uIHN0YXJ0c1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBPcmFuZ2VDYW52YXMoeyBvcmFuZ2VzLCBidXR0b25SZWYsIG9uQWxsTGFuZGVkIH0pIHtcbiAgY29uc3QgW2l0ZW1zLCBzZXRJdGVtc10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtsYW5kZWQsIHNldExhbmRlZF0gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IGFuaW1GcmFtZSA9IHVzZVJlZigpO1xuICBjb25zdCBvcmFuZ2VJZCA9IHVzZVJlZigwKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChvcmFuZ2VzIDw9IDApIHJldHVybjtcbiAgICBzZXRJdGVtcyhbXSk7XG4gICAgc2V0TGFuZGVkKFtdKTtcbiAgICBvcmFuZ2VJZC5jdXJyZW50ID0gMDtcblxuICAgIGNvbnN0IHNwYXduSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBjb25zdCBpZCA9IG9yYW5nZUlkLmN1cnJlbnQrKztcbiAgICAgIGlmIChpZCA+PSBvcmFuZ2VzKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoc3Bhd25JbnRlcnZhbCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHggPSAxNSArIE1hdGgucmFuZG9tKCkgKiA3MDtcbiAgICAgIHNldEl0ZW1zKChwcmV2KSA9PiBbLi4ucHJldiwge1xuICAgICAgICBpZCxcbiAgICAgICAgeCxcbiAgICAgICAgeTogLTEwLFxuICAgICAgICB2eTogMCxcbiAgICAgICAgcm90YXRpb246IE1hdGgucmFuZG9tKCkgKiAzNjAsXG4gICAgICAgIHNpemU6IDI4ICsgTWF0aC5yYW5kb20oKSAqIDE0LFxuICAgICAgICBsYW5kZWQ6IGZhbHNlXG4gICAgICB9XSk7XG4gICAgfSwgNDAwKTtcblxuICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKHNwYXduSW50ZXJ2YWwpO1xuICB9LCBbb3Jhbmdlc10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgY29uc3QgYW5pbWF0ZSA9ICgpID0+IHtcbiAgICAgIHNldEl0ZW1zKChwcmV2KSA9PiB7XG4gICAgICAgIGxldCBhbGxEb25lID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgdXBkYXRlZCA9IHByZXYubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgaWYgKGl0ZW0ubGFuZGVkKSByZXR1cm4gaXRlbTtcbiAgICAgICAgICBhbGxEb25lID0gZmFsc2U7XG5cbiAgICAgICAgICBsZXQgbmV3WSA9IGl0ZW0ueSArIGl0ZW0udnk7XG4gICAgICAgICAgbGV0IG5ld1Z5ID0gaXRlbS52eSArIEdSQVZJVFk7XG5cbiAgICAgICAgICAvLyBHZXQgYnV0dG9uIHJlY3QgZm9yIGNvbGxpc2lvblxuICAgICAgICAgIGNvbnN0IGJ0bkVsID0gYnV0dG9uUmVmPy5jdXJyZW50O1xuICAgICAgICAgIGxldCBidG5Cb3VuZHMgPSBudWxsO1xuICAgICAgICAgIGlmIChidG5FbCkge1xuICAgICAgICAgICAgY29uc3QgcmVjdCA9IGJ0bkVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgYnRuQm91bmRzID0ge1xuICAgICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQgLyB3aW5kb3cuaW5uZXJXaWR0aCAqIDEwMCxcbiAgICAgICAgICAgICAgcmlnaHQ6IHJlY3QucmlnaHQgLyB3aW5kb3cuaW5uZXJXaWR0aCAqIDEwMCxcbiAgICAgICAgICAgICAgdG9wOiByZWN0LnRvcCAvIHdpbmRvdy5pbm5lckhlaWdodCAqIDEwMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBDaGVjayBidXR0b24gY29sbGlzaW9uXG4gICAgICAgICAgaWYgKGJ0bkJvdW5kcykge1xuICAgICAgICAgICAgY29uc3Qgb3JhbmdlTGVmdCA9IGl0ZW0ueCAtIGl0ZW0uc2l6ZSAqIDAuNDtcbiAgICAgICAgICAgIGNvbnN0IG9yYW5nZVJpZ2h0ID0gaXRlbS54ICsgaXRlbS5zaXplICogMC40O1xuICAgICAgICAgICAgY29uc3Qgb3JhbmdlQm90dG9tID0gbmV3WSArIGl0ZW0uc2l6ZSAqIDAuNTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgb3JhbmdlUmlnaHQgPiBidG5Cb3VuZHMubGVmdCAtIDIgJiZcbiAgICAgICAgICAgIG9yYW5nZUxlZnQgPCBidG5Cb3VuZHMucmlnaHQgKyAyICYmXG4gICAgICAgICAgICBvcmFuZ2VCb3R0b20gPiBidG5Cb3VuZHMudG9wIC0gNSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmV3WSA9IGJ0bkJvdW5kcy50b3AgLSBpdGVtLnNpemUgKiAwLjUgLSAyO1xuICAgICAgICAgICAgICBuZXdWeSA9IDA7XG4gICAgICAgICAgICAgIHJldHVybiB7IC4uLml0ZW0sIHk6IG5ld1ksIHZ5OiBuZXdWeSwgbGFuZGVkOiB0cnVlIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gR3JvdW5kIGNvbGxpc2lvblxuICAgICAgICAgIGlmIChuZXdZID49IEdST1VORF9ZKSB7XG4gICAgICAgICAgICBuZXdZID0gR1JPVU5EX1k7XG4gICAgICAgICAgICBuZXdWeSA9IDA7XG4gICAgICAgICAgICByZXR1cm4geyAuLi5pdGVtLCB5OiBuZXdZLCB2eTogbmV3VnksIGxhbmRlZDogdHJ1ZSB9O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7IC4uLml0ZW0sIHk6IG5ld1ksIHZ5OiBuZXdWeSB9O1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoYWxsRG9uZSAmJiB1cGRhdGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBzZXRMYW5kZWQodXBkYXRlZCk7XG4gICAgICAgICAgaWYgKG9uQWxsTGFuZGVkKSBvbkFsbExhbmRlZCgpO1xuICAgICAgICAgIHJldHVybiBwcmV2OyAvLyBzdG9wIGFuaW1hdGluZ1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgICAgfSk7XG5cbiAgICAgIGFuaW1GcmFtZS5jdXJyZW50ID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuICAgIH07XG5cbiAgICBhbmltRnJhbWUuY3VycmVudCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgICByZXR1cm4gKCkgPT4gY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbUZyYW1lLmN1cnJlbnQpO1xuICB9LCBbaXRlbXMubGVuZ3RoXSk7XG5cbiAgY29uc3QgZGlzcGxheSA9IGxhbmRlZC5sZW5ndGggPiAwID8gbGFuZGVkIDogaXRlbXM7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9PcmFuZ2VDYW52YXM6MTEyOjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHBvaW50ZXItZXZlbnRzLW5vbmUgei0wIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAge2Rpc3BsYXkubWFwKChpdGVtKSA9PlxuICAgICAgPG1vdGlvbi5kaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL09yYW5nZUNhbnZhczoxMTQ6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZVwiXG4gICAgICBzdHlsZT17e1xuICAgICAgICBsZWZ0OiBgJHtpdGVtLnh9JWAsXG4gICAgICAgIHRvcDogYCR7aXRlbS55fSVgLFxuICAgICAgICB3aWR0aDogaXRlbS5zaXplLFxuICAgICAgICBoZWlnaHQ6IGl0ZW0uc2l6ZSxcbiAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKC01MCUsIC01MCUpIHJvdGF0ZSgke2l0ZW0ucm90YXRpb259ZGVnKWBcbiAgICAgIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtpdGVtPy5pZH0+XG4gICAgICAgIFxuICAgICAgICAgIDxpbWcgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL09yYW5nZUNhbnZhczoxMjU6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICBzcmM9e09SQU5HRV9JTUd9XG4gICAgICAgIGFsdD1cImxhcmFuamFcIlxuICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIG9iamVjdC1jb250YWluXCJcbiAgICAgICAgc3R5bGU9e3sgZmlsdGVyOiBcImRyb3Atc2hhZG93KDAgNHB4IDhweCByZ2JhKDAsMCwwLDAuMTUpKVwiIH19IC8+XG4gICAgICAgIFxuICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICApfVxuICAgIDwvZGl2Pik7XG5cbn0iXSwiZmlsZSI6Ii9hcHAvc3JjL2NvbXBvbmVudHMvT3JhbmdlQ2FudmFzLmpzeCJ9