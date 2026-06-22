import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/habits/TetrisGrid.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/components/habits/TetrisGrid.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
import { motion } from "/node_modules/.vite/deps/framer-motion.js?v=fc940917";
import { Check, Star } from "/node_modules/.vite/deps/lucide-react.js?v=aefa7968";
const PRESET_COLORS = [
  { key: "blue", hex: "#3B82F6" },
  { key: "purple", hex: "#8B5CF6" },
  { key: "green", hex: "#10B981" },
  { key: "amber", hex: "#F59E0B" },
  { key: "rose", hex: "#F43F5E" },
  { key: "teal", hex: "#14B8A6" },
  { key: "indigo", hex: "#6366F1" },
  { key: "pink", hex: "#EC4899" }
];
const TILE_SIZES = [
  { col: "col-span-2", height: "h-28" },
  { col: "col-span-1", height: "h-36" },
  { col: "col-span-1", height: "h-24" },
  { col: "col-span-2", height: "h-24" },
  { col: "col-span-1", height: "h-32" },
  { col: "col-span-1", height: "h-28" },
  { col: "col-span-1", height: "h-24" },
  { col: "col-span-2", height: "h-32" },
  { col: "col-span-1", height: "h-36" },
  { col: "col-span-1", height: "h-28" }
];
function HabitTile({ habit, completed, onComplete, onUndo, animating, sizeIndex, "data-collection-item-id": __dataCollectionItemId }) {
  const size = TILE_SIZES[sizeIndex % TILE_SIZES.length];
  const colorHex = PRESET_COLORS.find((c) => c.key === habit.color)?.hex || habit.color || "#3B82F6";
  const isWide = size.col === "col-span-2";
  return /* @__PURE__ */ jsxDEV(
    motion.button,
    {
      "data-source-location": "components/habits/TetrisGrid:31:4",
      "data-dynamic-content": "true",
      layout: true,
      animate: animating ? { scale: [1, 1.06, 1] } : {},
      whileTap: { scale: 0.95 },
      onClick: () => completed ? onUndo(habit) : onComplete(habit),
      className: `${size.col} ${size.height} relative rounded-3xl overflow-hidden text-left transition-all shadow-sm hover:shadow-md active:shadow-inner`,
      style: {
        backgroundColor: completed ? `${colorHex}18` : "#ffffff",
        border: `2px solid ${completed ? colorHex + "60" : "#F0EBE3"}`
      },
      "data-collection-item-id": __dataCollectionItemId,
      children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/habits/TetrisGrid:43:6", "data-dynamic-content": "true", className: "absolute top-0 left-0 right-0 h-1 rounded-t-3xl", style: { backgroundColor: colorHex } }, void 0, false, {
          fileName: "/app/src/components/habits/TetrisGrid.jsx",
          lineNumber: 62,
          columnNumber: 7
        }, this),
        completed && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/habits/TetrisGrid:47:8", "data-dynamic-content": "true", className: "absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center", style: { backgroundColor: colorHex }, children: /* @__PURE__ */ jsxDEV(Check, { "data-source-location": "components/habits/TetrisGrid:48:10", "data-dynamic-content": "false", className: "w-3.5 h-3.5 text-white" }, void 0, false, {
          fileName: "/app/src/components/habits/TetrisGrid.jsx",
          lineNumber: 67,
          columnNumber: 11
        }, this) }, void 0, false, {
          fileName: "/app/src/components/habits/TetrisGrid.jsx",
          lineNumber: 66,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/habits/TetrisGrid:52:6", "data-dynamic-content": "true", className: "p-4 pt-5 h-full flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/habits/TetrisGrid:53:8", "data-dynamic-content": "true", children: [
            /* @__PURE__ */ jsxDEV(
              "div",
              {
                "data-source-location": "components/habits/TetrisGrid:55:10",
                "data-dynamic-content": "true",
                className: "w-9 h-9 rounded-xl flex items-center justify-center mb-2.5",
                style: { backgroundColor: `${colorHex}20` },
                children: /* @__PURE__ */ jsxDEV(Star, { "data-source-location": "components/habits/TetrisGrid:57:12", "data-dynamic-content": "true", className: "w-4 h-4", style: { color: colorHex }, fill: completed ? colorHex : "none" }, void 0, false, {
                  fileName: "/app/src/components/habits/TetrisGrid.jsx",
                  lineNumber: 76,
                  columnNumber: 13
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/src/components/habits/TetrisGrid.jsx",
                lineNumber: 74,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("p", { "data-source-location": "components/habits/TetrisGrid:59:10", "data-dynamic-content": "true", className: `font-bold leading-tight ${completed ? "opacity-60" : "text-foreground"} ${isWide ? "text-sm" : "text-[13px]"}`, "data-collection-item-field": "name", "data-collection-item-id": habit?.id || habit?._id, children: habit.name }, void 0, false, {
              fileName: "/app/src/components/habits/TetrisGrid.jsx",
              lineNumber: 78,
              columnNumber: 11
            }, this),
            habit.description && isWide && /* @__PURE__ */ jsxDEV("p", { "data-source-location": "components/habits/TetrisGrid:63:12", "data-dynamic-content": "true", className: "text-[10px] text-muted-foreground mt-1 line-clamp-2", "data-collection-item-field": "description", "data-collection-item-id": habit?.id || habit?._id, children: habit.description }, void 0, false, {
              fileName: "/app/src/components/habits/TetrisGrid.jsx",
              lineNumber: 82,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/habits/TetrisGrid.jsx",
            lineNumber: 72,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/habits/TetrisGrid:67:8", "data-dynamic-content": "true", className: "flex items-center gap-1 mt-2", children: [
            /* @__PURE__ */ jsxDEV(Star, { "data-source-location": "components/habits/TetrisGrid:68:10", "data-dynamic-content": "false", className: "w-3 h-3 text-amber-400", fill: "currentColor" }, void 0, false, {
              fileName: "/app/src/components/habits/TetrisGrid.jsx",
              lineNumber: 87,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/habits/TetrisGrid:69:10", "data-dynamic-content": "true", className: "text-[11px] font-bold", style: { color: colorHex }, "data-collection-item-field": "score", "data-collection-item-id": habit?.id || habit?._id, children: habit.score }, void 0, false, {
              fileName: "/app/src/components/habits/TetrisGrid.jsx",
              lineNumber: 88,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/habits/TetrisGrid.jsx",
            lineNumber: 86,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/habits/TetrisGrid.jsx",
          lineNumber: 71,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/src/components/habits/TetrisGrid.jsx",
      lineNumber: 50,
      columnNumber: 5
    },
    this
  );
}
_c = HabitTile;
export default function TetrisGrid({ pending, done, onComplete, onUndo, animating }) {
  const allHabits = [...pending, ...done];
  if (allHabits.length === 0) return null;
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/habits/TetrisGrid:82:4", "data-dynamic-content": "true", className: "space-y-6", children: [
    pending.length > 0 && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/habits/TetrisGrid:84:8", "data-dynamic-content": "true", children: [
      /* @__PURE__ */ jsxDEV("p", { "data-source-location": "components/habits/TetrisGrid:85:10", "data-dynamic-content": "false", className: "text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1", children: "Por fazer" }, void 0, false, {
        fileName: "/app/src/components/habits/TetrisGrid.jsx",
        lineNumber: 104,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/habits/TetrisGrid:86:10", "data-dynamic-content": "true", className: "grid grid-cols-2 gap-3", "data-collection-id": "pending", children: pending.map(
        (h, i) => /* @__PURE__ */ jsxDEV(
          HabitTile,
          {
            "data-source-location": "components/habits/TetrisGrid:88:14",
            "data-dynamic-content": "true",
            habit: h,
            completed: false,
            onComplete,
            onUndo,
            animating: animating === h.id,
            sizeIndex: i,
            "data-collection-item-id": h?.id
          },
          h.id,
          false,
          {
            fileName: "/app/src/components/habits/TetrisGrid.jsx",
            lineNumber: 107,
            columnNumber: 11
          },
          this
        )
      ) }, void 0, false, {
        fileName: "/app/src/components/habits/TetrisGrid.jsx",
        lineNumber: 105,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/habits/TetrisGrid.jsx",
      lineNumber: 103,
      columnNumber: 7
    }, this),
    done.length > 0 && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/habits/TetrisGrid:103:8", "data-dynamic-content": "true", children: [
      /* @__PURE__ */ jsxDEV("p", { "data-source-location": "components/habits/TetrisGrid:104:10", "data-dynamic-content": "false", className: "text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1", children: "Feitos" }, void 0, false, {
        fileName: "/app/src/components/habits/TetrisGrid.jsx",
        lineNumber: 123,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/habits/TetrisGrid:105:10", "data-dynamic-content": "true", className: "grid grid-cols-2 gap-3", "data-collection-id": "done", children: done.map(
        (h, i) => /* @__PURE__ */ jsxDEV(
          HabitTile,
          {
            "data-source-location": "components/habits/TetrisGrid:107:14",
            "data-dynamic-content": "true",
            habit: h,
            completed: true,
            onComplete,
            onUndo,
            animating: false,
            sizeIndex: i + pending.length,
            "data-collection-item-id": h?.id
          },
          h.id,
          false,
          {
            fileName: "/app/src/components/habits/TetrisGrid.jsx",
            lineNumber: 126,
            columnNumber: 11
          },
          this
        )
      ) }, void 0, false, {
        fileName: "/app/src/components/habits/TetrisGrid.jsx",
        lineNumber: 124,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/habits/TetrisGrid.jsx",
      lineNumber: 122,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/components/habits/TetrisGrid.jsx",
    lineNumber: 101,
    columnNumber: 5
  }, this);
}
_c2 = TetrisGrid;
var _c, _c2;
$RefreshReg$(_c, "HabitTile");
$RefreshReg$(_c2, "TetrisGrid");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/components/habits/TetrisGrid.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/components/habits/TetrisGrid.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBMENNOzs7Ozs7Ozs7Ozs7Ozs7O0FBMUNOLFNBQVNBLGNBQWM7QUFDdkIsU0FBU0MsT0FBT0MsWUFBWTtBQUU1QixNQUFNQyxnQkFBZ0I7QUFBQSxFQUN0QixFQUFFQyxLQUFLLFFBQVFDLEtBQUssVUFBVTtBQUFBLEVBQUcsRUFBRUQsS0FBSyxVQUFVQyxLQUFLLFVBQVU7QUFBQSxFQUNqRSxFQUFFRCxLQUFLLFNBQVNDLEtBQUssVUFBVTtBQUFBLEVBQUcsRUFBRUQsS0FBSyxTQUFTQyxLQUFLLFVBQVU7QUFBQSxFQUNqRSxFQUFFRCxLQUFLLFFBQVFDLEtBQUssVUFBVTtBQUFBLEVBQUcsRUFBRUQsS0FBSyxRQUFRQyxLQUFLLFVBQVU7QUFBQSxFQUMvRCxFQUFFRCxLQUFLLFVBQVVDLEtBQUssVUFBVTtBQUFBLEVBQUcsRUFBRUQsS0FBSyxRQUFRQyxLQUFLLFVBQVU7QUFBQztBQUlsRSxNQUFNQyxhQUFhO0FBQUEsRUFDbkIsRUFBRUMsS0FBSyxjQUFjQyxRQUFRLE9BQU87QUFBQSxFQUNwQyxFQUFFRCxLQUFLLGNBQWNDLFFBQVEsT0FBTztBQUFBLEVBQ3BDLEVBQUVELEtBQUssY0FBY0MsUUFBUSxPQUFPO0FBQUEsRUFDcEMsRUFBRUQsS0FBSyxjQUFjQyxRQUFRLE9BQU87QUFBQSxFQUNwQyxFQUFFRCxLQUFLLGNBQWNDLFFBQVEsT0FBTztBQUFBLEVBQ3BDLEVBQUVELEtBQUssY0FBY0MsUUFBUSxPQUFPO0FBQUEsRUFDcEMsRUFBRUQsS0FBSyxjQUFjQyxRQUFRLE9BQU87QUFBQSxFQUNwQyxFQUFFRCxLQUFLLGNBQWNDLFFBQVEsT0FBTztBQUFBLEVBQ3BDLEVBQUVELEtBQUssY0FBY0MsUUFBUSxPQUFPO0FBQUEsRUFDcEMsRUFBRUQsS0FBSyxjQUFjQyxRQUFRLE9BQU87QUFBQztBQUdyQyxTQUFTQyxVQUFVLEVBQUVDLE9BQU9DLFdBQVdDLFlBQVlDLFFBQVFDLFdBQVdDLFdBQVcsMkJBQTJCQyx1QkFBdUIsR0FBRztBQUNwSSxRQUFNQyxPQUFPWCxXQUFXUyxZQUFZVCxXQUFXWSxNQUFNO0FBQ3JELFFBQU1DLFdBQVdoQixjQUFjaUIsS0FBSyxDQUFDQyxNQUFNQSxFQUFFakIsUUFBUU0sTUFBTVksS0FBSyxHQUFHakIsT0FBT0ssTUFBTVksU0FBUztBQUN6RixRQUFNQyxTQUFTTixLQUFLVixRQUFRO0FBRTVCLFNBQ0U7QUFBQSxJQUFDLE9BQU87QUFBQSxJQUFQO0FBQUEsTUFBYyx3QkFBcUI7QUFBQSxNQUFvQyx3QkFBcUI7QUFBQSxNQUM3RjtBQUFBLE1BQ0EsU0FBU08sWUFBWSxFQUFFVSxPQUFPLENBQUMsR0FBRyxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUM7QUFBQSxNQUNoRCxVQUFVLEVBQUVBLE9BQU8sS0FBSztBQUFBLE1BQ3hCLFNBQVMsTUFBTWIsWUFBWUUsT0FBT0gsS0FBSyxJQUFJRSxXQUFXRixLQUFLO0FBQUEsTUFDM0QsV0FBVyxHQUFHTyxLQUFLVixHQUFHLElBQUlVLEtBQUtULE1BQU07QUFBQSxNQUNyQyxPQUFPO0FBQUEsUUFDTGlCLGlCQUFpQmQsWUFBWSxHQUFHUSxRQUFRLE9BQU87QUFBQSxRQUMvQ08sUUFBUSxhQUFhZixZQUFZUSxXQUFXLE9BQU8sU0FBUztBQUFBLE1BQzlEO0FBQUEsTUFBRywyQkFBeUJIO0FBQUFBLE1BRzFCO0FBQUEsK0JBQUMsU0FBSSx3QkFBcUIscUNBQW9DLHdCQUFxQixRQUFPLFdBQVUsbURBQWtELE9BQU8sRUFBRVMsaUJBQWlCTixTQUFTLEtBQXpMO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBMkw7QUFBQSxRQUcxTFIsYUFDRCx1QkFBQyxTQUFJLHdCQUFxQixxQ0FBb0Msd0JBQXFCLFFBQU8sV0FBVSxnRkFBK0UsT0FBTyxFQUFFYyxpQkFBaUJOLFNBQVMsR0FDbE4saUNBQUMsU0FBTSx3QkFBcUIsc0NBQXFDLHdCQUFxQixTQUFRLFdBQVUsNEJBQXhHO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBZ0ksS0FEcEk7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUVFO0FBQUEsUUFHRix1QkFBQyxTQUFJLHdCQUFxQixxQ0FBb0Msd0JBQXFCLFFBQU8sV0FBVSxpREFDbEc7QUFBQSxpQ0FBQyxTQUFJLHdCQUFxQixxQ0FBb0Msd0JBQXFCLFFBRWpGO0FBQUE7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFBSSx3QkFBcUI7QUFBQSxnQkFBcUMsd0JBQXFCO0FBQUEsZ0JBQU8sV0FBVTtBQUFBLGdCQUNyRyxPQUFPLEVBQUVNLGlCQUFpQixHQUFHTixRQUFRLEtBQUs7QUFBQSxnQkFDeEMsaUNBQUMsUUFBSyx3QkFBcUIsc0NBQXFDLHdCQUFxQixRQUFPLFdBQVUsV0FBVSxPQUFPLEVBQUVHLE9BQU9ILFNBQVMsR0FBRyxNQUFNUixZQUFZUSxXQUFXLFVBQXpLO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQWdMO0FBQUE7QUFBQSxjQUZsTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFHQTtBQUFBLFlBQ0EsdUJBQUMsT0FBRSx3QkFBcUIsc0NBQXFDLHdCQUFxQixRQUFPLFdBQVcsMkJBQTJCUixZQUFZLGVBQWUsaUJBQWlCLElBQUlZLFNBQVMsWUFBWSxhQUFhLElBQUksOEJBQTJCLFFBQU8sMkJBQXlCYixPQUFPaUIsTUFBTWpCLE9BQU9rQixLQUNqU2xCLGdCQUFNbUIsUUFEVDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVBO0FBQUEsWUFDQ25CLE1BQU1vQixlQUFlUCxVQUN0Qix1QkFBQyxPQUFFLHdCQUFxQixzQ0FBcUMsd0JBQXFCLFFBQU8sV0FBVSx1REFBc0QsOEJBQTJCLGVBQWMsMkJBQXlCYixPQUFPaUIsTUFBTWpCLE9BQU9rQixLQUFNbEIsZ0JBQU1vQixlQUEzUDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUF1UTtBQUFBLGVBVnpRO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBWUE7QUFBQSxVQUVBLHVCQUFDLFNBQUksd0JBQXFCLHFDQUFvQyx3QkFBcUIsUUFBTyxXQUFVLGdDQUNsRztBQUFBLG1DQUFDLFFBQUssd0JBQXFCLHNDQUFxQyx3QkFBcUIsU0FBUSxXQUFVLDBCQUF5QixNQUFLLGtCQUFySTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFtSjtBQUFBLFlBQ25KLHVCQUFDLFVBQUssd0JBQXFCLHNDQUFxQyx3QkFBcUIsUUFBTyxXQUFVLHlCQUF3QixPQUFPLEVBQUVSLE9BQU9ILFNBQVMsR0FBRyw4QkFBMkIsU0FBUSwyQkFBeUJULE9BQU9pQixNQUFNakIsT0FBT2tCLEtBQU1sQixnQkFBTXFCLFNBQXRQO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQTRQO0FBQUEsZUFGOVA7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFHQTtBQUFBLGFBbEJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFtQkE7QUFBQTtBQUFBO0FBQUEsSUF4Q0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBeUNBO0FBRUo7QUFBQ0MsS0FqRFF2QjtBQW1EVCx3QkFBd0J3QixXQUFXLEVBQUVDLFNBQVNDLE1BQU12QixZQUFZQyxRQUFRQyxVQUFVLEdBQUc7QUFDbkYsUUFBTXNCLFlBQVksQ0FBQyxHQUFHRixTQUFTLEdBQUdDLElBQUk7QUFFdEMsTUFBSUMsVUFBVWxCLFdBQVcsRUFBRyxRQUFPO0FBRW5DLFNBQ0UsdUJBQUMsU0FBSSx3QkFBcUIscUNBQW9DLHdCQUFxQixRQUFPLFdBQVUsYUFDakdnQjtBQUFBQSxZQUFRaEIsU0FBUyxLQUNsQix1QkFBQyxTQUFJLHdCQUFxQixxQ0FBb0Msd0JBQXFCLFFBQy9FO0FBQUEsNkJBQUMsT0FBRSx3QkFBcUIsc0NBQXFDLHdCQUFxQixTQUFRLFdBQVUsa0ZBQWlGLHlCQUFyTDtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQThMO0FBQUEsTUFDOUwsdUJBQUMsU0FBSSx3QkFBcUIsc0NBQXFDLHdCQUFxQixRQUFPLFdBQVUsMEJBQXlCLHNCQUFtQixXQUM5SWdCLGtCQUFRRztBQUFBQSxRQUFJLENBQUNDLEdBQUdDLE1BQ25CO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFBVSx3QkFBcUI7QUFBQSxZQUFxQyx3QkFBcUI7QUFBQSxZQUUxRixPQUFPRDtBQUFBQSxZQUNQLFdBQVc7QUFBQSxZQUNYO0FBQUEsWUFDQTtBQUFBLFlBQ0EsV0FBV3hCLGNBQWN3QixFQUFFWDtBQUFBQSxZQUMzQixXQUFXWTtBQUFBQSxZQUFHLDJCQUF5QkQsR0FBR1g7QUFBQUE7QUFBQUEsVUFOckNXLEVBQUVYO0FBQUFBLFVBRFA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQU82QztBQUFBLE1BRTdDLEtBWEE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQVlBO0FBQUEsU0FkSjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBZUU7QUFBQSxJQUdEUSxLQUFLakIsU0FBUyxLQUNmLHVCQUFDLFNBQUksd0JBQXFCLHNDQUFxQyx3QkFBcUIsUUFDaEY7QUFBQSw2QkFBQyxPQUFFLHdCQUFxQix1Q0FBc0Msd0JBQXFCLFNBQVEsV0FBVSxrRkFBaUYsc0JBQXRMO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBNEw7QUFBQSxNQUM1TCx1QkFBQyxTQUFJLHdCQUFxQix1Q0FBc0Msd0JBQXFCLFFBQU8sV0FBVSwwQkFBeUIsc0JBQW1CLFFBQy9JaUIsZUFBS0U7QUFBQUEsUUFBSSxDQUFDQyxHQUFHQyxNQUNoQjtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQVUsd0JBQXFCO0FBQUEsWUFBc0Msd0JBQXFCO0FBQUEsWUFFM0YsT0FBT0Q7QUFBQUEsWUFDUCxXQUFXO0FBQUEsWUFDWDtBQUFBLFlBQ0E7QUFBQSxZQUNBLFdBQVc7QUFBQSxZQUNYLFdBQVdDLElBQUlMLFFBQVFoQjtBQUFBQSxZQUFRLDJCQUF5Qm9CLEdBQUdYO0FBQUFBO0FBQUFBLFVBTnREVyxFQUFFWDtBQUFBQSxVQURQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFPOEQ7QUFBQSxNQUU5RCxLQVhBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFZQTtBQUFBLFNBZEo7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQWVFO0FBQUEsT0FwQ0o7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQXNDQTtBQUVKO0FBQUNhLE1BOUN1QlA7QUFBVSxJQUFBRCxJQUFBUTtBQUFBLGFBQUFSLElBQUE7QUFBQSxhQUFBUSxLQUFBIiwibmFtZXMiOlsibW90aW9uIiwiQ2hlY2siLCJTdGFyIiwiUFJFU0VUX0NPTE9SUyIsImtleSIsImhleCIsIlRJTEVfU0laRVMiLCJjb2wiLCJoZWlnaHQiLCJIYWJpdFRpbGUiLCJoYWJpdCIsImNvbXBsZXRlZCIsIm9uQ29tcGxldGUiLCJvblVuZG8iLCJhbmltYXRpbmciLCJzaXplSW5kZXgiLCJfX2RhdGFDb2xsZWN0aW9uSXRlbUlkIiwic2l6ZSIsImxlbmd0aCIsImNvbG9ySGV4IiwiZmluZCIsImMiLCJjb2xvciIsImlzV2lkZSIsInNjYWxlIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyIiwiaWQiLCJfaWQiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJzY29yZSIsIl9jIiwiVGV0cmlzR3JpZCIsInBlbmRpbmciLCJkb25lIiwiYWxsSGFiaXRzIiwibWFwIiwiaCIsImkiLCJfYzIiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiVGV0cmlzR3JpZC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbW90aW9uIH0gZnJvbSBcImZyYW1lci1tb3Rpb25cIjtcbmltcG9ydCB7IENoZWNrLCBTdGFyIH0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xuXG5jb25zdCBQUkVTRVRfQ09MT1JTID0gW1xueyBrZXk6IFwiYmx1ZVwiLCBoZXg6IFwiIzNCODJGNlwiIH0sIHsga2V5OiBcInB1cnBsZVwiLCBoZXg6IFwiIzhCNUNGNlwiIH0sXG57IGtleTogXCJncmVlblwiLCBoZXg6IFwiIzEwQjk4MVwiIH0sIHsga2V5OiBcImFtYmVyXCIsIGhleDogXCIjRjU5RTBCXCIgfSxcbnsga2V5OiBcInJvc2VcIiwgaGV4OiBcIiNGNDNGNUVcIiB9LCB7IGtleTogXCJ0ZWFsXCIsIGhleDogXCIjMTRCOEE2XCIgfSxcbnsga2V5OiBcImluZGlnb1wiLCBoZXg6IFwiIzYzNjZGMVwiIH0sIHsga2V5OiBcInBpbmtcIiwgaGV4OiBcIiNFQzQ4OTlcIiB9XTtcblxuXG4vLyBUaWxlIHNpemUgcGF0dGVybnMgdGhhdCBjeWNsZSB0byBjcmVhdGUgdmFyaWV0eVxuY29uc3QgVElMRV9TSVpFUyA9IFtcbnsgY29sOiBcImNvbC1zcGFuLTJcIiwgaGVpZ2h0OiBcImgtMjhcIiB9LFxueyBjb2w6IFwiY29sLXNwYW4tMVwiLCBoZWlnaHQ6IFwiaC0zNlwiIH0sXG57IGNvbDogXCJjb2wtc3Bhbi0xXCIsIGhlaWdodDogXCJoLTI0XCIgfSxcbnsgY29sOiBcImNvbC1zcGFuLTJcIiwgaGVpZ2h0OiBcImgtMjRcIiB9LFxueyBjb2w6IFwiY29sLXNwYW4tMVwiLCBoZWlnaHQ6IFwiaC0zMlwiIH0sXG57IGNvbDogXCJjb2wtc3Bhbi0xXCIsIGhlaWdodDogXCJoLTI4XCIgfSxcbnsgY29sOiBcImNvbC1zcGFuLTFcIiwgaGVpZ2h0OiBcImgtMjRcIiB9LFxueyBjb2w6IFwiY29sLXNwYW4tMlwiLCBoZWlnaHQ6IFwiaC0zMlwiIH0sXG57IGNvbDogXCJjb2wtc3Bhbi0xXCIsIGhlaWdodDogXCJoLTM2XCIgfSxcbnsgY29sOiBcImNvbC1zcGFuLTFcIiwgaGVpZ2h0OiBcImgtMjhcIiB9XTtcblxuXG5mdW5jdGlvbiBIYWJpdFRpbGUoeyBoYWJpdCwgY29tcGxldGVkLCBvbkNvbXBsZXRlLCBvblVuZG8sIGFuaW1hdGluZywgc2l6ZUluZGV4LCBcImRhdGEtY29sbGVjdGlvbi1pdGVtLWlkXCI6IF9fZGF0YUNvbGxlY3Rpb25JdGVtSWQgfSkge1xuICBjb25zdCBzaXplID0gVElMRV9TSVpFU1tzaXplSW5kZXggJSBUSUxFX1NJWkVTLmxlbmd0aF07XG4gIGNvbnN0IGNvbG9ySGV4ID0gUFJFU0VUX0NPTE9SUy5maW5kKChjKSA9PiBjLmtleSA9PT0gaGFiaXQuY29sb3IpPy5oZXggfHwgaGFiaXQuY29sb3IgfHwgXCIjM0I4MkY2XCI7XG4gIGNvbnN0IGlzV2lkZSA9IHNpemUuY29sID09PSBcImNvbC1zcGFuLTJcIjtcblxuICByZXR1cm4gKFxuICAgIDxtb3Rpb24uYnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9oYWJpdHMvVGV0cmlzR3JpZDozMTo0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICBsYXlvdXRcbiAgICBhbmltYXRlPXthbmltYXRpbmcgPyB7IHNjYWxlOiBbMSwgMS4wNiwgMV0gfSA6IHt9fVxuICAgIHdoaWxlVGFwPXt7IHNjYWxlOiAwLjk1IH19XG4gICAgb25DbGljaz17KCkgPT4gY29tcGxldGVkID8gb25VbmRvKGhhYml0KSA6IG9uQ29tcGxldGUoaGFiaXQpfVxuICAgIGNsYXNzTmFtZT17YCR7c2l6ZS5jb2x9ICR7c2l6ZS5oZWlnaHR9IHJlbGF0aXZlIHJvdW5kZWQtM3hsIG92ZXJmbG93LWhpZGRlbiB0ZXh0LWxlZnQgdHJhbnNpdGlvbi1hbGwgc2hhZG93LXNtIGhvdmVyOnNoYWRvdy1tZCBhY3RpdmU6c2hhZG93LWlubmVyYH1cbiAgICBzdHlsZT17e1xuICAgICAgYmFja2dyb3VuZENvbG9yOiBjb21wbGV0ZWQgPyBgJHtjb2xvckhleH0xOGAgOiBcIiNmZmZmZmZcIixcbiAgICAgIGJvcmRlcjogYDJweCBzb2xpZCAke2NvbXBsZXRlZCA/IGNvbG9ySGV4ICsgXCI2MFwiIDogXCIjRjBFQkUzXCJ9YFxuICAgIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtfX2RhdGFDb2xsZWN0aW9uSXRlbUlkfT5cbiAgICAgIFxuICAgICAgey8qIENvbG9yIGFjY2VudCBiYXIgKi99XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9oYWJpdHMvVGV0cmlzR3JpZDo0Mzo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgbGVmdC0wIHJpZ2h0LTAgaC0xIHJvdW5kZWQtdC0zeGxcIiBzdHlsZT17eyBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9ySGV4IH19IC8+XG5cbiAgICAgIHsvKiBDaGVjayBvdmVybGF5IHdoZW4gZG9uZSAqL31cbiAgICAgIHtjb21wbGV0ZWQgJiZcbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2hhYml0cy9UZXRyaXNHcmlkOjQ3OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMyByaWdodC0zIHctNiBoLTYgcm91bmRlZC1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCIgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiBjb2xvckhleCB9fT5cbiAgICAgICAgICA8Q2hlY2sgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2hhYml0cy9UZXRyaXNHcmlkOjQ4OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtd2hpdGVcIiAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIH1cblxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvaGFiaXRzL1RldHJpc0dyaWQ6NTI6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInAtNCBwdC01IGgtZnVsbCBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9oYWJpdHMvVGV0cmlzR3JpZDo1Mzo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgICAgey8qIEljb24gY2lyY2xlICovfVxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2hhYml0cy9UZXRyaXNHcmlkOjU1OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidy05IGgtOSByb3VuZGVkLXhsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG1iLTIuNVwiXG4gICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiBgJHtjb2xvckhleH0yMGAgfX0+XG4gICAgICAgICAgICA8U3RhciBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvaGFiaXRzL1RldHJpc0dyaWQ6NTc6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgc3R5bGU9e3sgY29sb3I6IGNvbG9ySGV4IH19IGZpbGw9e2NvbXBsZXRlZCA/IGNvbG9ySGV4IDogXCJub25lXCJ9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2hhYml0cy9UZXRyaXNHcmlkOjU5OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPXtgZm9udC1ib2xkIGxlYWRpbmctdGlnaHQgJHtjb21wbGV0ZWQgPyBcIm9wYWNpdHktNjBcIiA6IFwidGV4dC1mb3JlZ3JvdW5kXCJ9ICR7aXNXaWRlID8gXCJ0ZXh0LXNtXCIgOiBcInRleHQtWzEzcHhdXCJ9YH0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJuYW1lXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2hhYml0Py5pZCB8fCBoYWJpdD8uX2lkfT5cbiAgICAgICAgICAgIHtoYWJpdC5uYW1lfVxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICB7aGFiaXQuZGVzY3JpcHRpb24gJiYgaXNXaWRlICYmXG4gICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2hhYml0cy9UZXRyaXNHcmlkOjYzOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIG10LTEgbGluZS1jbGFtcC0yXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJkZXNjcmlwdGlvblwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtoYWJpdD8uaWQgfHwgaGFiaXQ/Ll9pZH0+e2hhYml0LmRlc2NyaXB0aW9ufTwvcD5cbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2hhYml0cy9UZXRyaXNHcmlkOjY3OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBtdC0yXCI+XG4gICAgICAgICAgPFN0YXIgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2hhYml0cy9UZXRyaXNHcmlkOjY4OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1hbWJlci00MDBcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgLz5cbiAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvaGFiaXRzL1RldHJpc0dyaWQ6Njk6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LWJvbGRcIiBzdHlsZT17eyBjb2xvcjogY29sb3JIZXggfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJzY29yZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtoYWJpdD8uaWQgfHwgaGFiaXQ/Ll9pZH0+e2hhYml0LnNjb3JlfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L21vdGlvbi5idXR0b24+KTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBUZXRyaXNHcmlkKHsgcGVuZGluZywgZG9uZSwgb25Db21wbGV0ZSwgb25VbmRvLCBhbmltYXRpbmcgfSkge1xuICBjb25zdCBhbGxIYWJpdHMgPSBbLi4ucGVuZGluZywgLi4uZG9uZV07XG5cbiAgaWYgKGFsbEhhYml0cy5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvaGFiaXRzL1RldHJpc0dyaWQ6ODI6NFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAge3BlbmRpbmcubGVuZ3RoID4gMCAmJlxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvaGFiaXRzL1RldHJpc0dyaWQ6ODQ6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiPlxuICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9oYWJpdHMvVGV0cmlzR3JpZDo4NToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LWJvbGQgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBtYi0zIHB4LTFcIj5Qb3IgZmF6ZXI8L3A+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvaGFiaXRzL1RldHJpc0dyaWQ6ODY6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0zXCIgZGF0YS1jb2xsZWN0aW9uLWlkPVwicGVuZGluZ1wiPlxuICAgICAgICAgICAge3BlbmRpbmcubWFwKChoLCBpKSA9PlxuICAgICAgICAgIDxIYWJpdFRpbGUgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2hhYml0cy9UZXRyaXNHcmlkOjg4OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICBrZXk9e2guaWR9XG4gICAgICAgICAgaGFiaXQ9e2h9XG4gICAgICAgICAgY29tcGxldGVkPXtmYWxzZX1cbiAgICAgICAgICBvbkNvbXBsZXRlPXtvbkNvbXBsZXRlfVxuICAgICAgICAgIG9uVW5kbz17b25VbmRvfVxuICAgICAgICAgIGFuaW1hdGluZz17YW5pbWF0aW5nID09PSBoLmlkfVxuICAgICAgICAgIHNpemVJbmRleD17aX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2g/LmlkfSAvPlxuXG4gICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICB9XG5cbiAgICAgIHtkb25lLmxlbmd0aCA+IDAgJiZcbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2hhYml0cy9UZXRyaXNHcmlkOjEwMzo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2hhYml0cy9UZXRyaXNHcmlkOjEwNDoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LWJvbGQgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBtYi0zIHB4LTFcIj5GZWl0b3M8L3A+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvaGFiaXRzL1RldHJpc0dyaWQ6MTA1OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtM1wiIGRhdGEtY29sbGVjdGlvbi1pZD1cImRvbmVcIj5cbiAgICAgICAgICAgIHtkb25lLm1hcCgoaCwgaSkgPT5cbiAgICAgICAgICA8SGFiaXRUaWxlIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9oYWJpdHMvVGV0cmlzR3JpZDoxMDc6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgIGtleT17aC5pZH1cbiAgICAgICAgICBoYWJpdD17aH1cbiAgICAgICAgICBjb21wbGV0ZWQ9e3RydWV9XG4gICAgICAgICAgb25Db21wbGV0ZT17b25Db21wbGV0ZX1cbiAgICAgICAgICBvblVuZG89e29uVW5kb31cbiAgICAgICAgICBhbmltYXRpbmc9e2ZhbHNlfVxuICAgICAgICAgIHNpemVJbmRleD17aSArIHBlbmRpbmcubGVuZ3RofSBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aD8uaWR9IC8+XG5cbiAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIH1cbiAgICA8L2Rpdj4pO1xuXG59Il0sImZpbGUiOiIvYXBwL3NyYy9jb21wb25lbnRzL2hhYml0cy9UZXRyaXNHcmlkLmpzeCJ9