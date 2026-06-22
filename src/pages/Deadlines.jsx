import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/Deadlines.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/pages/Deadlines.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=fc940917"; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"]; const useRef = __vite__cjsImport3_react["useRef"]; const useCallback = __vite__cjsImport3_react["useCallback"];
import { useNavigate } from "/node_modules/.vite/deps/react-router-dom.js?v=8a08d97a";
import { motion, AnimatePresence } from "/node_modules/.vite/deps/framer-motion.js?v=fc940917";
import { ArrowLeft, Plus, X, CalendarClock, MapPin, Globe, Clock, Check, Trash2, CalendarRange, Timer, ChevronDown, ChevronUp } from "/node_modules/.vite/deps/lucide-react.js?v=aefa7968";
import { base44 } from "/src/api/base44Client.js";
import { format, differenceInDays, differenceInMinutes, differenceInHours, isPast, isToday, parseISO } from "/node_modules/.vite/deps/date-fns.js?v=a1580542";
import { pt } from "/node_modules/.vite/deps/date-fns_locale.js?v=45b313c9";
const PRESET_COLORS = [
  { key: "blue", hex: "#3B82F6" },
  { key: "purple", hex: "#8B5CF6" },
  { key: "emerald", hex: "#10B981" },
  { key: "amber", hex: "#F59E0B" },
  { key: "rose", hex: "#F43F5E" },
  { key: "cyan", hex: "#06B6D4" },
  { key: "indigo", hex: "#6366F1" },
  { key: "pink", hex: "#EC4899" },
  { key: "orange", hex: "#F97316" },
  { key: "lime", hex: "#84CC16" }
];
function urgencyInfo(dateStr) {
  const d = new Date(dateStr);
  if (isPast(d) && !isToday(d)) return { label: "Expirado", color: "#9CA3AF" };
  const days = differenceInDays(d, /* @__PURE__ */ new Date());
  if (days === 0) return { label: "Hoje!", color: "#EF4444" };
  if (days === 1) return { label: "Amanhã", color: "#F97316" };
  if (days <= 3) return { label: `${days} dias`, color: "#F59E0B" };
  if (days <= 7) return { label: `${days} dias`, color: "#10B981" };
  return { label: `${days} dias`, color: "#6B7280" };
}
function formatDateTime(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const hasTime = dateStr.includes("T") && !dateStr.endsWith("T00:00");
  if (hasTime) return format(d, "d MMM yyyy HH:mm", { locale: pt });
  return format(d, "d MMM yyyy", { locale: pt });
}
function eventDuration(start, end) {
  if (!start || !end) return null;
  const s = new Date(start);
  const e = new Date(end);
  const mins = differenceInMinutes(e, s);
  if (mins < 0) return null;
  if (mins < 60) return `${mins}min`;
  const hours = Math.floor(mins / 60);
  const rem = mins % 60;
  const days = Math.floor(hours / 24);
  if (days > 0) {
    const remHours = hours % 24;
    return remHours > 0 ? `${days}d ${remHours}h` : `${days} dia${days > 1 ? "s" : ""}`;
  }
  return rem > 0 ? `${hours}h ${rem}min` : `${hours}h`;
}
function DeadlineCard({ item, onDelete, index, "data-collection-item-id": __dataCollectionItemId }) {
  const colorHex = PRESET_COLORS.find((c) => c.key === item.color)?.hex || item.color || "#E87A5A";
  const urgency = urgencyInfo(item.deadline);
  return /* @__PURE__ */ jsxDEV(
    motion.div,
    {
      "data-source-location": "pages/Deadlines:58:4",
      "data-dynamic-content": "true",
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.05 },
      className: "bg-white rounded-3xl border border-border shadow-sm overflow-hidden",
      "data-collection-item-id": __dataCollectionItemId,
      children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:64:6", "data-dynamic-content": "true", className: "h-1", style: { background: colorHex } }, void 0, false, {
          fileName: "/app/src/pages/Deadlines.jsx",
          lineNumber: 83,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:65:6", "data-dynamic-content": "true", className: "p-4", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:66:8", "data-dynamic-content": "true", className: "flex items-start justify-between gap-2 mb-3", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:67:10", "data-dynamic-content": "true", className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:68:12", "data-dynamic-content": "true", className: "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", style: { backgroundColor: colorHex + "18" }, children: /* @__PURE__ */ jsxDEV(CalendarClock, { "data-source-location": "pages/Deadlines:69:14", "data-dynamic-content": "true", className: "w-4 h-4", style: { color: colorHex } }, void 0, false, {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 88,
                columnNumber: 15
              }, this) }, void 0, false, {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 87,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("h3", { "data-source-location": "pages/Deadlines:71:12", "data-dynamic-content": "true", className: "text-sm font-bold text-foreground leading-tight", "data-collection-item-field": "name", "data-collection-item-id": item?.id || item?._id, children: item.name }, void 0, false, {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 90,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 86,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:73:10", "data-dynamic-content": "true", className: "flex items-center gap-1.5 flex-shrink-0", children: [
              /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/Deadlines:74:12", "data-dynamic-content": "true", className: "px-2.5 py-1 rounded-full text-[11px] font-bold text-white", style: { backgroundColor: urgency.color }, "data-collection-item-field": "label", "data-collection-item-id": urgency?.id || urgency?._id, children: urgency.label }, void 0, false, {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 93,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "pages/Deadlines:77:12",
                  "data-dynamic-content": "true",
                  onClick: () => onDelete(item.id),
                  className: "w-7 h-7 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-rose-500 hover:bg-rose-50 transition-all",
                  children: /* @__PURE__ */ jsxDEV(Trash2, { "data-source-location": "pages/Deadlines:79:14", "data-dynamic-content": "false", className: "w-3.5 h-3.5" }, void 0, false, {
                    fileName: "/app/src/pages/Deadlines.jsx",
                    lineNumber: 98,
                    columnNumber: 15
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/src/pages/Deadlines.jsx",
                  lineNumber: 96,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 92,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/Deadlines.jsx",
            lineNumber: 85,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:84:8", "data-dynamic-content": "true", className: "flex flex-wrap gap-1.5 ml-11", "data-collection-item-field": "location", "data-collection-item-id": item?.id || item?._id, children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:85:10", "data-dynamic-content": "true", className: "flex items-center gap-1 px-2.5 py-1 rounded-xl bg-secondary text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxDEV(Clock, { "data-source-location": "pages/Deadlines:86:12", "data-dynamic-content": "false", className: "w-3 h-3" }, void 0, false, {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 105,
                columnNumber: 13
              }, this),
              " ",
              formatDateTime(item.deadline)
            ] }, void 0, true, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 104,
              columnNumber: 11
            }, this),
            item.location && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:89:12", "data-dynamic-content": "true", className: "flex items-center gap-1 px-2.5 py-1 rounded-xl bg-secondary text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxDEV(MapPin, { "data-source-location": "pages/Deadlines:90:14", "data-dynamic-content": "false", className: "w-3 h-3" }, void 0, false, {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 109,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/Deadlines:91:14", "data-dynamic-content": "true", className: "truncate max-w-[100px]", "data-collection-item-field": "location", "data-collection-item-id": item?.id || item?._id, children: item.location }, void 0, false, {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 110,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 108,
              columnNumber: 11
            }, this),
            item.website && /* @__PURE__ */ jsxDEV(
              "a",
              {
                "data-source-location": "pages/Deadlines:95:12",
                "data-dynamic-content": "true",
                href: item.website.startsWith("http") ? item.website : `https://${item.website}`,
                target: "_blank",
                rel: "noopener noreferrer",
                onClick: (e) => e.stopPropagation(),
                className: "flex items-center gap-1 px-2.5 py-1 rounded-xl bg-secondary text-xs text-muted-foreground hover:text-[#E87A5A] transition-all",
                children: [
                  /* @__PURE__ */ jsxDEV(Globe, { "data-source-location": "pages/Deadlines:98:14", "data-dynamic-content": "false", className: "w-3 h-3" }, void 0, false, {
                    fileName: "/app/src/pages/Deadlines.jsx",
                    lineNumber: 117,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/Deadlines:99:14", "data-dynamic-content": "true", className: "truncate max-w-[100px]", "data-collection-item-field": "website", "data-collection-item-id": item?.id || item?._id, children: item.website.replace(/^https?:\/\//, "") }, void 0, false, {
                    fileName: "/app/src/pages/Deadlines.jsx",
                    lineNumber: 118,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 114,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/src/pages/Deadlines.jsx",
            lineNumber: 103,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/Deadlines.jsx",
          lineNumber: 84,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/src/pages/Deadlines.jsx",
      lineNumber: 77,
      columnNumber: 5
    },
    this
  );
}
_c = DeadlineCard;
function EventCard({ item, onDelete, index, "data-collection-item-id": __dataCollectionItemId }) {
  const colorHex = PRESET_COLORS.find((c) => c.key === item.color)?.hex || item.color || "#8B5CF6";
  const duration = eventDuration(item.start_datetime, item.end_datetime);
  const startUrgency = urgencyInfo(item.start_datetime);
  return /* @__PURE__ */ jsxDEV(
    motion.div,
    {
      "data-source-location": "pages/Deadlines:114:4",
      "data-dynamic-content": "true",
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.05 },
      className: "bg-white rounded-3xl border border-border shadow-sm overflow-hidden",
      "data-collection-item-id": __dataCollectionItemId,
      children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:120:6", "data-dynamic-content": "true", className: "h-1", style: { background: `linear-gradient(to right, ${colorHex}, ${colorHex}88)` } }, void 0, false, {
          fileName: "/app/src/pages/Deadlines.jsx",
          lineNumber: 139,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:121:6", "data-dynamic-content": "true", className: "p-4", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:122:8", "data-dynamic-content": "true", className: "flex items-start justify-between gap-2 mb-3", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:123:10", "data-dynamic-content": "true", className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:124:12", "data-dynamic-content": "true", className: "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", style: { backgroundColor: colorHex + "18" }, children: /* @__PURE__ */ jsxDEV(CalendarRange, { "data-source-location": "pages/Deadlines:125:14", "data-dynamic-content": "true", className: "w-4 h-4", style: { color: colorHex } }, void 0, false, {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 144,
                columnNumber: 15
              }, this) }, void 0, false, {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 143,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:127:12", "data-dynamic-content": "true", "data-collection-item-field": "description", "data-collection-item-id": item?.id || item?._id, children: [
                /* @__PURE__ */ jsxDEV("h3", { "data-source-location": "pages/Deadlines:128:14", "data-dynamic-content": "true", className: "text-sm font-bold text-foreground leading-tight", "data-collection-item-field": "name", "data-collection-item-id": item?.id || item?._id, children: item.name }, void 0, false, {
                  fileName: "/app/src/pages/Deadlines.jsx",
                  lineNumber: 147,
                  columnNumber: 15
                }, this),
                item.description && /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/Deadlines:129:35", "data-dynamic-content": "true", className: "text-[11px] text-muted-foreground mt-0.5 leading-snug", "data-collection-item-field": "description", "data-collection-item-id": item?.id || item?._id, children: item.description }, void 0, false, {
                  fileName: "/app/src/pages/Deadlines.jsx",
                  lineNumber: 148,
                  columnNumber: 36
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 146,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 142,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:132:10", "data-dynamic-content": "true", className: "flex items-center gap-1.5 flex-shrink-0", children: [
              /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/Deadlines:133:12", "data-dynamic-content": "true", className: "px-2.5 py-1 rounded-full text-[11px] font-bold text-white", style: { backgroundColor: startUrgency.color }, "data-collection-item-field": "label", "data-collection-item-id": startUrgency?.id || startUrgency?._id, children: startUrgency.label }, void 0, false, {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 152,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "pages/Deadlines:136:12",
                  "data-dynamic-content": "true",
                  onClick: () => onDelete(item.id),
                  className: "w-7 h-7 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-rose-500 hover:bg-rose-50 transition-all",
                  children: /* @__PURE__ */ jsxDEV(Trash2, { "data-source-location": "pages/Deadlines:138:14", "data-dynamic-content": "false", className: "w-3.5 h-3.5" }, void 0, false, {
                    fileName: "/app/src/pages/Deadlines.jsx",
                    lineNumber: 157,
                    columnNumber: 15
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/src/pages/Deadlines.jsx",
                  lineNumber: 155,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 151,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/Deadlines.jsx",
            lineNumber: 141,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:143:8", "data-dynamic-content": "true", className: "flex flex-wrap gap-1.5 ml-11", "data-collection-item-field": "location", "data-collection-item-id": item?.id || item?._id, children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:144:10", "data-dynamic-content": "true", className: "flex items-center gap-1 px-2.5 py-1 rounded-xl bg-secondary text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxDEV(Clock, { "data-source-location": "pages/Deadlines:145:12", "data-dynamic-content": "false", className: "w-3 h-3" }, void 0, false, {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 164,
                columnNumber: 13
              }, this),
              " ",
              formatDateTime(item.start_datetime)
            ] }, void 0, true, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 163,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:147:10", "data-dynamic-content": "true", className: "flex items-center gap-1 px-2.5 py-1 rounded-xl bg-secondary text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxDEV(ChevronDown, { "data-source-location": "pages/Deadlines:148:12", "data-dynamic-content": "false", className: "w-3 h-3" }, void 0, false, {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 167,
                columnNumber: 13
              }, this),
              " ",
              formatDateTime(item.end_datetime)
            ] }, void 0, true, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 166,
              columnNumber: 11
            }, this),
            duration && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:151:12", "data-dynamic-content": "true", className: "flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold text-white", style: { backgroundColor: colorHex }, "data-collection-item-field": "duration", "data-collection-item-id": __dataCollectionItemId, children: [
              /* @__PURE__ */ jsxDEV(Timer, { "data-source-location": "pages/Deadlines:152:14", "data-dynamic-content": "false", className: "w-3 h-3" }, void 0, false, {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 171,
                columnNumber: 15
              }, this),
              " ",
              duration
            ] }, void 0, true, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 170,
              columnNumber: 11
            }, this),
            item.location && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:156:12", "data-dynamic-content": "true", className: "flex items-center gap-1 px-2.5 py-1 rounded-xl bg-secondary text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxDEV(MapPin, { "data-source-location": "pages/Deadlines:157:14", "data-dynamic-content": "false", className: "w-3 h-3" }, void 0, false, {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 176,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/Deadlines:158:14", "data-dynamic-content": "true", className: "truncate max-w-[100px]", "data-collection-item-field": "location", "data-collection-item-id": item?.id || item?._id, children: item.location }, void 0, false, {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 177,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 175,
              columnNumber: 11
            }, this),
            item.website && /* @__PURE__ */ jsxDEV(
              "a",
              {
                "data-source-location": "pages/Deadlines:162:12",
                "data-dynamic-content": "true",
                href: item.website.startsWith("http") ? item.website : `https://${item.website}`,
                target: "_blank",
                rel: "noopener noreferrer",
                onClick: (e) => e.stopPropagation(),
                className: "flex items-center gap-1 px-2.5 py-1 rounded-xl bg-secondary text-xs text-muted-foreground hover:text-[#E87A5A] transition-all",
                children: [
                  /* @__PURE__ */ jsxDEV(Globe, { "data-source-location": "pages/Deadlines:165:14", "data-dynamic-content": "false", className: "w-3 h-3" }, void 0, false, {
                    fileName: "/app/src/pages/Deadlines.jsx",
                    lineNumber: 184,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/Deadlines:166:14", "data-dynamic-content": "true", className: "truncate max-w-[100px]", "data-collection-item-field": "website", "data-collection-item-id": item?.id || item?._id, children: item.website.replace(/^https?:\/\//, "") }, void 0, false, {
                    fileName: "/app/src/pages/Deadlines.jsx",
                    lineNumber: 185,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 181,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/src/pages/Deadlines.jsx",
            lineNumber: 162,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/Deadlines.jsx",
          lineNumber: 140,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/src/pages/Deadlines.jsx",
      lineNumber: 133,
      columnNumber: 5
    },
    this
  );
}
_c2 = EventCard;
function AddDeadlineForm({ onSave, onCancel }) {
  _s();
  const [form, setForm] = useState({ name: "", color: "orange", location: "", website: "", deadline: "" });
  const colorHex = PRESET_COLORS.find((c) => c.key === form.color)?.hex || "#F97316";
  return /* @__PURE__ */ jsxDEV(
    motion.div,
    {
      "data-source-location": "pages/Deadlines:180:4",
      "data-dynamic-content": "true",
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      className: "bg-white rounded-3xl border border-border shadow-md overflow-hidden mb-2",
      children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:182:6", "data-dynamic-content": "true", className: "h-1", style: { background: colorHex } }, void 0, false, {
          fileName: "/app/src/pages/Deadlines.jsx",
          lineNumber: 201,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:183:6", "data-dynamic-content": "true", className: "p-4 space-y-3", children: [
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              "data-source-location": "pages/Deadlines:184:8",
              "data-dynamic-content": "true",
              value: form.name,
              onChange: (e) => setForm({ ...form, name: e.target.value }),
              placeholder: "Nome do prazo",
              className: "w-full px-4 py-3 rounded-2xl bg-secondary/60 text-sm font-semibold outline-none focus:bg-white transition-all"
            },
            void 0,
            false,
            {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 203,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:187:8", "data-dynamic-content": "true", className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                "data-source-location": "pages/Deadlines:188:10",
                "data-dynamic-content": "true",
                value: form.location,
                onChange: (e) => setForm({ ...form, location: e.target.value }),
                placeholder: "📍 Local",
                className: "px-3 py-2.5 rounded-2xl bg-secondary/60 text-sm outline-none focus:bg-white transition-all"
              },
              void 0,
              false,
              {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 207,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                "data-source-location": "pages/Deadlines:191:10",
                "data-dynamic-content": "true",
                value: form.website,
                onChange: (e) => setForm({ ...form, website: e.target.value }),
                placeholder: "🌐 Website",
                className: "px-3 py-2.5 rounded-2xl bg-secondary/60 text-sm outline-none focus:bg-white transition-all"
              },
              void 0,
              false,
              {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 210,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/src/pages/Deadlines.jsx",
            lineNumber: 206,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:195:8", "data-dynamic-content": "true", children: [
            /* @__PURE__ */ jsxDEV("label", { "data-source-location": "pages/Deadlines:196:10", "data-dynamic-content": "false", className: "text-[11px] text-muted-foreground mb-1 block", children: "Data e hora limite" }, void 0, false, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 215,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                "data-source-location": "pages/Deadlines:197:10",
                "data-dynamic-content": "true",
                type: "datetime-local",
                value: form.deadline,
                onChange: (e) => setForm({ ...form, deadline: e.target.value }),
                className: "w-full px-4 py-2.5 rounded-2xl bg-secondary/60 text-sm outline-none focus:bg-white transition-all"
              },
              void 0,
              false,
              {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 216,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/src/pages/Deadlines.jsx",
            lineNumber: 214,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:200:8", "data-dynamic-content": "true", children: [
            /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/Deadlines:201:10", "data-dynamic-content": "false", className: "text-[11px] text-muted-foreground mb-2", children: "Cor" }, void 0, false, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 220,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:202:10", "data-dynamic-content": "true", className: "flex gap-2 flex-wrap", children: PRESET_COLORS.map(
              (c, __arrIdx__) => /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "pages/Deadlines:204:14",
                  "data-dynamic-content": "true",
                  onClick: () => setForm({ ...form, color: c.key }),
                  className: `w-7 h-7 rounded-xl transition-all ${form.color === c.key ? "ring-2 ring-offset-2 scale-110" : "hover:scale-105 opacity-70"}`,
                  style: { backgroundColor: c.hex },
                  "data-arr-index": __arrIdx__,
                  "data-arr-variable-name": "PRESET_COLORS"
                },
                c.key,
                false,
                {
                  fileName: "/app/src/pages/Deadlines.jsx",
                  lineNumber: 223,
                  columnNumber: 13
                },
                this
              )
            ) }, void 0, false, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 221,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/Deadlines.jsx",
            lineNumber: 219,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:210:8", "data-dynamic-content": "true", className: "flex gap-2 pt-1", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "pages/Deadlines:211:10",
                "data-dynamic-content": "true",
                onClick: onCancel,
                className: "flex-1 py-2.5 rounded-2xl bg-secondary text-muted-foreground text-sm font-semibold hover:bg-border transition-all",
                children: "Cancelar"
              },
              void 0,
              false,
              {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 230,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "pages/Deadlines:215:10",
                "data-dynamic-content": "true",
                onClick: () => form.name.trim() && form.deadline && onSave(form),
                disabled: !form.name.trim() || !form.deadline,
                className: "flex-1 py-2.5 rounded-2xl text-white text-sm font-bold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 flex items-center justify-center gap-1.5",
                style: { backgroundColor: colorHex },
                children: [
                  /* @__PURE__ */ jsxDEV(Check, { "data-source-location": "pages/Deadlines:219:12", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/src/pages/Deadlines.jsx",
                    lineNumber: 238,
                    columnNumber: 13
                  }, this),
                  " Adicionar"
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 234,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/src/pages/Deadlines.jsx",
            lineNumber: 229,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/Deadlines.jsx",
          lineNumber: 202,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/src/pages/Deadlines.jsx",
      lineNumber: 199,
      columnNumber: 5
    },
    this
  );
}
_s(AddDeadlineForm, "3+CvMLnj/xb+HI8z9nSjizw3wao=");
_c3 = AddDeadlineForm;
function AddEventForm({ onSave, onCancel, id }) {
  _s2();
  const [form, setForm] = useState({ name: "", color: "purple", location: "", website: "", description: "", start_datetime: "", end_datetime: "" });
  const colorHex = PRESET_COLORS.find((c) => c.key === form.color)?.hex || "#8B5CF6";
  const duration = eventDuration(form.start_datetime, form.end_datetime);
  return /* @__PURE__ */ jsxDEV(
    motion.div,
    {
      "data-source-location": "pages/Deadlines:233:4",
      "data-dynamic-content": "true",
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      className: "bg-white rounded-3xl border border-border shadow-md overflow-hidden mb-2",
      children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:235:6", "data-dynamic-content": "true", className: "h-1", style: { background: `linear-gradient(to right, ${colorHex}, ${colorHex}88)` } }, void 0, false, {
          fileName: "/app/src/pages/Deadlines.jsx",
          lineNumber: 254,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:236:6", "data-dynamic-content": "true", className: "p-4 space-y-3", children: [
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              "data-source-location": "pages/Deadlines:237:8",
              "data-dynamic-content": "true",
              value: form.name,
              onChange: (e) => setForm({ ...form, name: e.target.value }),
              placeholder: "Nome do evento",
              className: "w-full px-4 py-3 rounded-2xl bg-secondary/60 text-sm font-semibold outline-none focus:bg-white transition-all"
            },
            void 0,
            false,
            {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 256,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              "data-source-location": "pages/Deadlines:240:8",
              "data-dynamic-content": "true",
              value: form.description,
              onChange: (e) => setForm({ ...form, description: e.target.value }),
              placeholder: "Descrição (opcional)",
              className: "w-full px-4 py-2.5 rounded-2xl bg-secondary/60 text-sm outline-none focus:bg-white transition-all"
            },
            void 0,
            false,
            {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 259,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:243:8", "data-dynamic-content": "true", className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                "data-source-location": "pages/Deadlines:244:10",
                "data-dynamic-content": "true",
                value: form.location,
                onChange: (e) => setForm({ ...form, location: e.target.value }),
                placeholder: "📍 Local",
                className: "px-3 py-2.5 rounded-2xl bg-secondary/60 text-sm outline-none focus:bg-white transition-all"
              },
              void 0,
              false,
              {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 263,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                "data-source-location": "pages/Deadlines:247:10",
                "data-dynamic-content": "true",
                value: form.website,
                onChange: (e) => setForm({ ...form, website: e.target.value }),
                placeholder: "🌐 Website",
                className: "px-3 py-2.5 rounded-2xl bg-secondary/60 text-sm outline-none focus:bg-white transition-all"
              },
              void 0,
              false,
              {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 266,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/src/pages/Deadlines.jsx",
            lineNumber: 262,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:251:8", "data-dynamic-content": "true", className: "space-y-2", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:252:10", "data-dynamic-content": "true", children: [
              /* @__PURE__ */ jsxDEV("label", { "data-source-location": "pages/Deadlines:253:12", "data-dynamic-content": "false", className: "text-[11px] text-muted-foreground mb-1 block", children: "▶ Início" }, void 0, false, {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 272,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  "data-source-location": "pages/Deadlines:254:12",
                  "data-dynamic-content": "true",
                  type: "datetime-local",
                  value: form.start_datetime,
                  onChange: (e) => setForm({ ...form, start_datetime: e.target.value }),
                  className: "w-full px-4 py-2.5 rounded-2xl bg-secondary/60 text-sm outline-none focus:bg-white transition-all"
                },
                void 0,
                false,
                {
                  fileName: "/app/src/pages/Deadlines.jsx",
                  lineNumber: 273,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 271,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:257:10", "data-dynamic-content": "true", children: [
              /* @__PURE__ */ jsxDEV("label", { "data-source-location": "pages/Deadlines:258:12", "data-dynamic-content": "false", className: "text-[11px] text-muted-foreground mb-1 block", children: "■ Fim" }, void 0, false, {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 277,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  "data-source-location": "pages/Deadlines:259:12",
                  "data-dynamic-content": "true",
                  type: "datetime-local",
                  value: form.end_datetime,
                  onChange: (e) => setForm({ ...form, end_datetime: e.target.value }),
                  className: "w-full px-4 py-2.5 rounded-2xl bg-secondary/60 text-sm outline-none focus:bg-white transition-all"
                },
                void 0,
                false,
                {
                  fileName: "/app/src/pages/Deadlines.jsx",
                  lineNumber: 278,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 276,
              columnNumber: 11
            }, this),
            duration && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:263:12", "data-dynamic-content": "true", className: "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white", style: { backgroundColor: colorHex }, "data-collection-item-field": "duration", "data-collection-item-id": id, children: [
              /* @__PURE__ */ jsxDEV(Timer, { "data-source-location": "pages/Deadlines:264:14", "data-dynamic-content": "false", className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 283,
                columnNumber: 15
              }, this),
              " Duração: ",
              duration
            ] }, void 0, true, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 282,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/Deadlines.jsx",
            lineNumber: 270,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:268:8", "data-dynamic-content": "true", children: [
            /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/Deadlines:269:10", "data-dynamic-content": "false", className: "text-[11px] text-muted-foreground mb-2", children: "Cor" }, void 0, false, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 288,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:270:10", "data-dynamic-content": "true", className: "flex gap-2 flex-wrap", children: PRESET_COLORS.map(
              (c, __arrIdx__) => /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "pages/Deadlines:272:14",
                  "data-dynamic-content": "true",
                  onClick: () => setForm({ ...form, color: c.key }),
                  className: `w-7 h-7 rounded-xl transition-all ${form.color === c.key ? "ring-2 ring-offset-2 scale-110" : "hover:scale-105 opacity-70"}`,
                  style: { backgroundColor: c.hex },
                  "data-arr-index": __arrIdx__,
                  "data-arr-variable-name": "PRESET_COLORS"
                },
                c.key,
                false,
                {
                  fileName: "/app/src/pages/Deadlines.jsx",
                  lineNumber: 291,
                  columnNumber: 13
                },
                this
              )
            ) }, void 0, false, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 289,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/Deadlines.jsx",
            lineNumber: 287,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:278:8", "data-dynamic-content": "true", className: "flex gap-2 pt-1", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "pages/Deadlines:279:10",
                "data-dynamic-content": "true",
                onClick: onCancel,
                className: "flex-1 py-2.5 rounded-2xl bg-secondary text-muted-foreground text-sm font-semibold hover:bg-border transition-all",
                children: "Cancelar"
              },
              void 0,
              false,
              {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 298,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "pages/Deadlines:283:10",
                "data-dynamic-content": "true",
                onClick: () => form.name.trim() && form.start_datetime && form.end_datetime && onSave(form),
                disabled: !form.name.trim() || !form.start_datetime || !form.end_datetime,
                className: "flex-1 py-2.5 rounded-2xl text-white text-sm font-bold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 flex items-center justify-center gap-1.5",
                style: { backgroundColor: colorHex },
                children: [
                  /* @__PURE__ */ jsxDEV(Check, { "data-source-location": "pages/Deadlines:287:12", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/src/pages/Deadlines.jsx",
                    lineNumber: 306,
                    columnNumber: 13
                  }, this),
                  " Adicionar"
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 302,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/src/pages/Deadlines.jsx",
            lineNumber: 297,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/Deadlines.jsx",
          lineNumber: 255,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/src/pages/Deadlines.jsx",
      lineNumber: 252,
      columnNumber: 5
    },
    this
  );
}
_s2(AddEventForm, "F2XhHozkfVljXG0j+9EWb0r7bwQ=");
_c4 = AddEventForm;
export default function Deadlines() {
  _s3();
  const navigate = useNavigate();
  const [deadlines, setDeadlines] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("prazos");
  const [showForm, setShowForm] = useState(false);
  const touchStart = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const [dragStyle, setDragStyle] = useState({});
  const refresh = () => {
    base44.entities.Deadline.list("-deadline", 100).then(setDeadlines).catch(() => setDeadlines([]));
    base44.entities.Event.list("-start_datetime", 100).then(setEvents).catch(() => setEvents([]));
  };
  useEffect(() => {
    refresh();
  }, []);
  const addDeadline = async (form) => {
    await base44.entities.Deadline.create(form);
    setShowForm(false);
    refresh();
  };
  const addEvent = async (form) => {
    await base44.entities.Event.create(form);
    setShowForm(false);
    refresh();
  };
  const deleteDeadline = async (id) => {
    await base44.entities.Deadline.delete(id);
    refresh();
  };
  const deleteEvent = async (id) => {
    await base44.entities.Event.delete(id);
    refresh();
  };
  const upcomingDeadlines = deadlines.filter((i) => !isPast(new Date(i.deadline)) || isToday(new Date(i.deadline))).sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  const expiredDeadlines = deadlines.filter((i) => isPast(new Date(i.deadline)) && !isToday(new Date(i.deadline))).sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
  const upcomingEvents = events.filter((i) => !isPast(new Date(i.end_datetime))).sort((a, b) => new Date(a.start_datetime) - new Date(b.start_datetime));
  const pastEvents = events.filter((i) => isPast(new Date(i.end_datetime))).sort((a, b) => new Date(b.start_datetime) - new Date(a.start_datetime));
  const handlePointerStart = useCallback((x, y) => {
    touchStart.current = { x, y };
    dragOffset.current = { x: 0, y: 0 };
    setDragStyle({});
  }, []);
  const handlePointerMove = useCallback((x, y) => {
    dragOffset.current = { x: x - touchStart.current.x, y: y - touchStart.current.y };
    setDragStyle({ transform: `translate(${dragOffset.current.x}px, ${dragOffset.current.y}px)`, transition: "none" });
  }, []);
  const handlePointerEnd = useCallback((x, y) => {
    setDragStyle({ transform: "translate(0, 0)", transition: "transform 0.3s ease-out" });
    const dx = x - touchStart.current.x;
    if (Math.abs(dx) > 60 && dx < 0) navigate("/coming-soon");
  }, [navigate]);
  const isEmpty = activeTab === "prazos" ? upcomingDeadlines.length === 0 && expiredDeadlines.length === 0 : upcomingEvents.length === 0 && pastEvents.length === 0;
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      "data-source-location": "pages/Deadlines:360:4",
      "data-dynamic-content": "true",
      className: "min-h-screen bg-cream flex flex-col select-none",
      onTouchStart: (e) => handlePointerStart(e.touches[0].clientX, e.touches[0].clientY),
      onTouchMove: (e) => handlePointerMove(e.touches[0].clientX, e.touches[0].clientY),
      onTouchEnd: (e) => handlePointerEnd(e.changedTouches[0]?.clientX || touchStart.current.x, e.changedTouches[0]?.clientY || touchStart.current.y),
      onMouseDown: (e) => handlePointerStart(e.clientX, e.clientY),
      onMouseMove: (e) => {
        if (e.buttons === 1) handlePointerMove(e.clientX, e.clientY);
      },
      onMouseUp: (e) => handlePointerEnd(e.clientX, e.clientY),
      children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:368:6", "data-dynamic-content": "true", style: dragStyle, className: "flex-1 flex flex-col", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:370:8", "data-dynamic-content": "true", className: "px-5 pt-12 pb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:371:10", "data-dynamic-content": "true", className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "pages/Deadlines:372:12",
                "data-dynamic-content": "true",
                onClick: () => navigate("/coming-soon"),
                className: "w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[#E87A5A]/30 shadow-sm transition-all",
                children: /* @__PURE__ */ jsxDEV(ArrowLeft, { "data-source-location": "pages/Deadlines:374:14", "data-dynamic-content": "false", className: "w-5 h-5" }, void 0, false, {
                  fileName: "/app/src/pages/Deadlines.jsx",
                  lineNumber: 393,
                  columnNumber: 15
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 391,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:376:12", "data-dynamic-content": "true", children: [
              /* @__PURE__ */ jsxDEV("h1", { "data-source-location": "pages/Deadlines:377:14", "data-dynamic-content": "false", className: "text-xl font-bold text-foreground", children: "Controlo de Datas" }, void 0, false, {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 396,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/Deadlines:378:14", "data-dynamic-content": "true", className: "text-xs text-muted-foreground", children: activeTab === "prazos" ? `${upcomingDeadlines.length} prazo${upcomingDeadlines.length !== 1 ? "s" : ""}` : `${upcomingEvents.length} evento${upcomingEvents.length !== 1 ? "s" : ""}` }, void 0, false, {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 397,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 395,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/Deadlines.jsx",
            lineNumber: 390,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              "data-source-location": "pages/Deadlines:383:10",
              "data-dynamic-content": "true",
              onClick: () => setShowForm(!showForm),
              className: `w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all ${showForm ? "bg-muted-foreground" : "bg-[#E87A5A] shadow-[#E87A5A]/25 hover:bg-[#D4694A]"}`,
              children: showForm ? /* @__PURE__ */ jsxDEV(X, { "data-source-location": "pages/Deadlines:387:24", "data-dynamic-content": "false", className: "w-5 h-5" }, void 0, false, {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 406,
                columnNumber: 25
              }, this) : /* @__PURE__ */ jsxDEV(Plus, { "data-source-location": "pages/Deadlines:387:52", "data-dynamic-content": "false", className: "w-5 h-5" }, void 0, false, {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 406,
                columnNumber: 128
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 402,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/src/pages/Deadlines.jsx",
          lineNumber: 389,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:392:8", "data-dynamic-content": "true", className: "px-5 mb-4", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:393:10", "data-dynamic-content": "true", className: "flex bg-white rounded-2xl p-1.5 border border-border shadow-sm gap-1", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              "data-source-location": "pages/Deadlines:394:12",
              "data-dynamic-content": "true",
              onClick: () => {
                setActiveTab("prazos");
                setShowForm(false);
              },
              className: `flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === "prazos" ? "bg-[#E87A5A] text-white shadow-md" : "text-muted-foreground hover:text-foreground"}`,
              children: [
                /* @__PURE__ */ jsxDEV(CalendarClock, { "data-source-location": "pages/Deadlines:398:14", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/src/pages/Deadlines.jsx",
                  lineNumber: 417,
                  columnNumber: 15
                }, this),
                " Prazos"
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 413,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              "data-source-location": "pages/Deadlines:400:12",
              "data-dynamic-content": "true",
              onClick: () => {
                setActiveTab("eventos");
                setShowForm(false);
              },
              className: `flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === "eventos" ? "bg-[#8B5CF6] text-white shadow-md" : "text-muted-foreground hover:text-foreground"}`,
              children: [
                /* @__PURE__ */ jsxDEV(CalendarRange, { "data-source-location": "pages/Deadlines:404:14", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/src/pages/Deadlines.jsx",
                  lineNumber: 423,
                  columnNumber: 15
                }, this),
                " Eventos"
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 419,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/src/pages/Deadlines.jsx",
          lineNumber: 412,
          columnNumber: 11
        }, this) }, void 0, false, {
          fileName: "/app/src/pages/Deadlines.jsx",
          lineNumber: 411,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:410:8", "data-dynamic-content": "true", className: "flex-1 px-5 pb-10 space-y-3 overflow-auto", children: [
          /* @__PURE__ */ jsxDEV(AnimatePresence, { "data-source-location": "pages/Deadlines:411:10", "data-dynamic-content": "true", mode: "wait", children: [
            showForm && activeTab === "prazos" && /* @__PURE__ */ jsxDEV(AddDeadlineForm, { "data-source-location": "pages/Deadlines:412:51", "data-dynamic-content": "true", onSave: addDeadline, onCancel: () => setShowForm(false) }, "dl-form", false, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 431,
              columnNumber: 52
            }, this),
            showForm && activeTab === "eventos" && /* @__PURE__ */ jsxDEV(AddEventForm, { "data-source-location": "pages/Deadlines:413:52", "data-dynamic-content": "true", onSave: addEvent, onCancel: () => setShowForm(false) }, "ev-form", false, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 432,
              columnNumber: 53
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/Deadlines.jsx",
            lineNumber: 430,
            columnNumber: 11
          }, this),
          isEmpty && !showForm && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:417:12", "data-dynamic-content": "true", className: "text-center py-20", children: [
            activeTab === "prazos" ? /* @__PURE__ */ jsxDEV(CalendarClock, { "data-source-location": "pages/Deadlines:419:18", "data-dynamic-content": "false", className: "w-12 h-12 mx-auto mb-3 text-muted-foreground/20" }, void 0, false, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 438,
              columnNumber: 13
            }, this) : /* @__PURE__ */ jsxDEV(CalendarRange, { "data-source-location": "pages/Deadlines:420:18", "data-dynamic-content": "false", className: "w-12 h-12 mx-auto mb-3 text-muted-foreground/20" }, void 0, false, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 439,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/Deadlines:421:14", "data-dynamic-content": "true", className: "text-muted-foreground text-sm font-medium", children: activeTab === "prazos" ? "Sem prazos" : "Sem eventos" }, void 0, false, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 440,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/Deadlines:424:14", "data-dynamic-content": "false", className: "text-muted-foreground/50 text-xs mt-1", children: "Toca no + para adicionar" }, void 0, false, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 443,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/Deadlines.jsx",
            lineNumber: 436,
            columnNumber: 11
          }, this),
          activeTab === "prazos" && /* @__PURE__ */ jsxDEV(Fragment, { children: [
            upcomingDeadlines.map((item, i) => /* @__PURE__ */ jsxDEV(DeadlineCard, { "data-source-location": "pages/Deadlines:430:50", "data-dynamic-content": "true", item, onDelete: deleteDeadline, index: i, "data-collection-item-id": item?.id }, item.id, false, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 449,
              columnNumber: 51
            }, this)),
            expiredDeadlines.length > 0 && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:432:16", "data-dynamic-content": "true", className: "mt-4", children: [
              /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/Deadlines:433:18", "data-dynamic-content": "false", className: "text-[11px] font-bold text-muted-foreground/40 uppercase tracking-wider mb-2 px-1", children: "Expirados" }, void 0, false, {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 452,
                columnNumber: 19
              }, this),
              expiredDeadlines.map(
                (item, i) => /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:435:20", "data-dynamic-content": "true", className: "opacity-40 mb-2", "data-collection-item-id": item?.id, children: /* @__PURE__ */ jsxDEV(DeadlineCard, { "data-source-location": "pages/Deadlines:436:22", "data-dynamic-content": "true", item, onDelete: deleteDeadline, index: i }, void 0, false, {
                  fileName: "/app/src/pages/Deadlines.jsx",
                  lineNumber: 455,
                  columnNumber: 23
                }, this) }, item.id, false, {
                  fileName: "/app/src/pages/Deadlines.jsx",
                  lineNumber: 454,
                  columnNumber: 15
                }, this)
              )
            ] }, void 0, true, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 451,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/Deadlines.jsx",
            lineNumber: 448,
            columnNumber: 11
          }, this),
          activeTab === "eventos" && /* @__PURE__ */ jsxDEV(Fragment, { children: [
            upcomingEvents.map((item, i) => /* @__PURE__ */ jsxDEV(EventCard, { "data-source-location": "pages/Deadlines:446:47", "data-dynamic-content": "true", item, onDelete: deleteEvent, index: i, "data-collection-item-id": item?.id }, item.id, false, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 465,
              columnNumber: 48
            }, this)),
            pastEvents.length > 0 && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:448:16", "data-dynamic-content": "true", className: "mt-4", children: [
              /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/Deadlines:449:18", "data-dynamic-content": "false", className: "text-[11px] font-bold text-muted-foreground/40 uppercase tracking-wider mb-2 px-1", children: "Passados" }, void 0, false, {
                fileName: "/app/src/pages/Deadlines.jsx",
                lineNumber: 468,
                columnNumber: 19
              }, this),
              pastEvents.map(
                (item, i) => /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Deadlines:451:20", "data-dynamic-content": "true", className: "opacity-40 mb-2", "data-collection-item-id": item?.id, children: /* @__PURE__ */ jsxDEV(EventCard, { "data-source-location": "pages/Deadlines:452:22", "data-dynamic-content": "true", item, onDelete: deleteEvent, index: i }, void 0, false, {
                  fileName: "/app/src/pages/Deadlines.jsx",
                  lineNumber: 471,
                  columnNumber: 23
                }, this) }, item.id, false, {
                  fileName: "/app/src/pages/Deadlines.jsx",
                  lineNumber: 470,
                  columnNumber: 15
                }, this)
              )
            ] }, void 0, true, {
              fileName: "/app/src/pages/Deadlines.jsx",
              lineNumber: 467,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/Deadlines.jsx",
            lineNumber: 464,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/Deadlines.jsx",
          lineNumber: 429,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/pages/Deadlines.jsx",
        lineNumber: 387,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/app/src/pages/Deadlines.jsx",
      lineNumber: 379,
      columnNumber: 5
    },
    this
  );
}
_s3(Deadlines, "9Ce84SeWVv+qAvJ05QEMBWWpWMI=", false, function() {
  return [useNavigate];
});
_c5 = Deadlines;
var _c, _c2, _c3, _c4, _c5;
$RefreshReg$(_c, "DeadlineCard");
$RefreshReg$(_c2, "EventCard");
$RefreshReg$(_c3, "AddDeadlineForm");
$RefreshReg$(_c4, "AddEventForm");
$RefreshReg$(_c5, "Deadlines");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/pages/Deadlines.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/pages/Deadlines.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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eUIsd0JBQXFCLFFBQU8sV0FBVSxRQUNuRjtBQUFBLHFDQUFDLE9BQUUsd0JBQXFCLDBCQUF5Qix3QkFBcUIsU0FBUSxXQUFVLHFGQUFvRix3QkFBNUs7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBb0w7QUFBQSxjQUNuTFYsV0FBVzFDO0FBQUFBLGdCQUFJLENBQUN0QyxNQUFNMEUsTUFDM0IsdUJBQUMsU0FBSSx3QkFBcUIsMEJBQXlCLHdCQUFxQixRQUFxQixXQUFVLG1CQUFrQiwyQkFBeUIxRSxNQUFNYyxJQUNoSixpQ0FBQyxhQUFVLHdCQUFxQiwwQkFBeUIsd0JBQXFCLFFBQU8sTUFBWSxVQUFVeUQsYUFBYSxPQUFPRyxLQUEvSDtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUFpSSxLQURyRDFFLEtBQUtjLElBQXpGO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBRU07QUFBQSxjQUNOO0FBQUEsaUJBTkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFPSTtBQUFBLGVBVk47QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFZRTtBQUFBLGFBL0NKO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFpREE7QUFBQSxXQTNGRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBNEZBO0FBQUE7QUFBQSxJQXBHRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFxR0E7QUFFSjtBQUFDOEIsSUF4S3VCRCxXQUFTO0FBQUEsVUFDZC9GLFdBQVc7QUFBQTtBQUFBLE1BRE4rRjtBQUFTLElBQUFyQixJQUFBTyxLQUFBbUUsS0FBQUMsS0FBQUM7QUFBQSxhQUFBNUUsSUFBQTtBQUFBLGFBQUFPLEtBQUE7QUFBQSxhQUFBbUUsS0FBQTtBQUFBLGFBQUFDLEtBQUE7QUFBQSxhQUFBQyxLQUFBIiwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJ1c2VDYWxsYmFjayIsInVzZU5hdmlnYXRlIiwibW90aW9uIiwiQW5pbWF0ZVByZXNlbmNlIiwiQXJyb3dMZWZ0IiwiUGx1cyIsIlgiLCJDYWxlbmRhckNsb2NrIiwiTWFwUGluIiwiR2xvYmUiLCJDbG9jayIsIkNoZWNrIiwiVHJhc2gyIiwiQ2FsZW5kYXJSYW5nZSIsIlRpbWVyIiwiQ2hldnJvbkRvd24iLCJDaGV2cm9uVXAiLCJiYXNlNDQiLCJmb3JtYXQiLCJkaWZmZXJlbmNlSW5EYXlzIiwiZGlmZmVyZW5jZUluTWludXRlcyIsImRpZmZlcmVuY2VJbkhvdXJzIiwiaXNQYXN0IiwiaXNUb2RheSIsInBhcnNlSVNPIiwicHQiLCJQUkVTRVRfQ09MT1JTIiwia2V5IiwiaGV4IiwidXJnZW5jeUluZm8iLCJkYXRlU3RyIiwiZCIsIkRhdGUiLCJsYWJlbCIsImNvbG9yIiwiZGF5cyIsImZvcm1hdERhdGVUaW1lIiwiaGFzVGltZSIsImluY2x1ZGVzIiwiZW5kc1dpdGgiLCJsb2NhbGUiLCJldmVudER1cmF0aW9uIiwic3RhcnQiLCJlbmQiLCJzIiwiZSIsIm1pbnMiLCJob3VycyIsIk1hdGgiLCJmbG9vciIsInJlbSIsInJlbUhvdXJzIiwiRGVhZGxpbmVDYXJkIiwiaXRlbSIsIm9uRGVsZXRlIiwiaW5kZXgiLCJfX2RhdGFDb2xsZWN0aW9uSXRlbUlkIiwiY29sb3JIZXgiLCJmaW5kIiwiYyIsInVyZ2VuY3kiLCJkZWFkbGluZSIsIm9wYWNpdHkiLCJ5IiwiZGVsYXkiLCJiYWNrZ3JvdW5kIiwiYmFja2dyb3VuZENvbG9yIiwiaWQiLCJfaWQiLCJuYW1lIiwibG9jYXRpb24iLCJ3ZWJzaXRlIiwic3RhcnRzV2l0aCIsInN0b3BQcm9wYWdhdGlvbiIsInJlcGxhY2UiLCJfYyIsIkV2ZW50Q2FyZCIsImR1cmF0aW9uIiwic3RhcnRfZGF0ZXRpbWUiLCJlbmRfZGF0ZXRpbWUiLCJzdGFydFVyZ2VuY3kiLCJkZXNjcmlwdGlvbiIsIl9jMiIsIkFkZERlYWRsaW5lRm9ybSIsIm9uU2F2ZSIsIm9uQ2FuY2VsIiwiX3MiLCJmb3JtIiwic2V0Rm9ybSIsInRhcmdldCIsInZhbHVlIiwibWFwIiwiX19hcnJJZHhfXyIsInRyaW0iLCJBZGRFdmVudEZvcm0iLCJfczIiLCJEZWFkbGluZXMiLCJfczMiLCJuYXZpZ2F0ZSIsImRlYWRsaW5lcyIsInNldERlYWRsaW5lcyIsImV2ZW50cyIsInNldEV2ZW50cyIsImFjdGl2ZVRhYiIsInNldEFjdGl2ZVRhYiIsInNob3dGb3JtIiwic2V0U2hvd0Zvcm0iLCJ0b3VjaFN0YXJ0IiwieCIsImRyYWdPZmZzZXQiLCJkcmFnU3R5bGUiLCJzZXREcmFnU3R5bGUiLCJyZWZyZXNoIiwiZW50aXRpZXMiLCJEZWFkbGluZSIsImxpc3QiLCJ0aGVuIiwiY2F0Y2giLCJFdmVudCIsImFkZERlYWRsaW5lIiwiY3JlYXRlIiwiYWRkRXZlbnQiLCJkZWxldGVEZWFkbGluZSIsImRlbGV0ZSIsImRlbGV0ZUV2ZW50IiwidXBjb21pbmdEZWFkbGluZXMiLCJmaWx0ZXIiLCJpIiwic29ydCIsImEiLCJiIiwiZXhwaXJlZERlYWRsaW5lcyIsInVwY29taW5nRXZlbnRzIiwicGFzdEV2ZW50cyIsImhhbmRsZVBvaW50ZXJTdGFydCIsImN1cnJlbnQiLCJoYW5kbGVQb2ludGVyTW92ZSIsInRyYW5zZm9ybSIsInRyYW5zaXRpb24iLCJoYW5kbGVQb2ludGVyRW5kIiwiZHgiLCJhYnMiLCJpc0VtcHR5IiwibGVuZ3RoIiwidG91Y2hlcyIsImNsaWVudFgiLCJjbGllbnRZIiwiY2hhbmdlZFRvdWNoZXMiLCJidXR0b25zIiwiX2MzIiwiX2M0IiwiX2M1Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIkRlYWRsaW5lcy5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlTmF2aWdhdGUgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuaW1wb3J0IHsgbW90aW9uLCBBbmltYXRlUHJlc2VuY2UgfSBmcm9tIFwiZnJhbWVyLW1vdGlvblwiO1xuaW1wb3J0IHsgQXJyb3dMZWZ0LCBQbHVzLCBYLCBDYWxlbmRhckNsb2NrLCBNYXBQaW4sIEdsb2JlLCBDbG9jaywgQ2hlY2ssIFRyYXNoMiwgQ2FsZW5kYXJSYW5nZSwgVGltZXIsIENoZXZyb25Eb3duLCBDaGV2cm9uVXAgfSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5pbXBvcnQgeyBiYXNlNDQgfSBmcm9tIFwiQC9hcGkvYmFzZTQ0Q2xpZW50XCI7XG5pbXBvcnQgeyBmb3JtYXQsIGRpZmZlcmVuY2VJbkRheXMsIGRpZmZlcmVuY2VJbk1pbnV0ZXMsIGRpZmZlcmVuY2VJbkhvdXJzLCBpc1Bhc3QsIGlzVG9kYXksIHBhcnNlSVNPIH0gZnJvbSBcImRhdGUtZm5zXCI7XG5pbXBvcnQgeyBwdCB9IGZyb20gXCJkYXRlLWZucy9sb2NhbGVcIjtcblxuY29uc3QgUFJFU0VUX0NPTE9SUyA9IFtcbnsga2V5OiBcImJsdWVcIiwgaGV4OiBcIiMzQjgyRjZcIiB9LCB7IGtleTogXCJwdXJwbGVcIiwgaGV4OiBcIiM4QjVDRjZcIiB9LFxueyBrZXk6IFwiZW1lcmFsZFwiLCBoZXg6IFwiIzEwQjk4MVwiIH0sIHsga2V5OiBcImFtYmVyXCIsIGhleDogXCIjRjU5RTBCXCIgfSxcbnsga2V5OiBcInJvc2VcIiwgaGV4OiBcIiNGNDNGNUVcIiB9LCB7IGtleTogXCJjeWFuXCIsIGhleDogXCIjMDZCNkQ0XCIgfSxcbnsga2V5OiBcImluZGlnb1wiLCBoZXg6IFwiIzYzNjZGMVwiIH0sIHsga2V5OiBcInBpbmtcIiwgaGV4OiBcIiNFQzQ4OTlcIiB9LFxueyBrZXk6IFwib3JhbmdlXCIsIGhleDogXCIjRjk3MzE2XCIgfSwgeyBrZXk6IFwibGltZVwiLCBoZXg6IFwiIzg0Q0MxNlwiIH1dO1xuXG5cbmZ1bmN0aW9uIHVyZ2VuY3lJbmZvKGRhdGVTdHIpIHtcbiAgY29uc3QgZCA9IG5ldyBEYXRlKGRhdGVTdHIpO1xuICBpZiAoaXNQYXN0KGQpICYmICFpc1RvZGF5KGQpKSByZXR1cm4geyBsYWJlbDogXCJFeHBpcmFkb1wiLCBjb2xvcjogXCIjOUNBM0FGXCIgfTtcbiAgY29uc3QgZGF5cyA9IGRpZmZlcmVuY2VJbkRheXMoZCwgbmV3IERhdGUoKSk7XG4gIGlmIChkYXlzID09PSAwKSByZXR1cm4geyBsYWJlbDogXCJIb2plIVwiLCBjb2xvcjogXCIjRUY0NDQ0XCIgfTtcbiAgaWYgKGRheXMgPT09IDEpIHJldHVybiB7IGxhYmVsOiBcIkFtYW5ow6NcIiwgY29sb3I6IFwiI0Y5NzMxNlwiIH07XG4gIGlmIChkYXlzIDw9IDMpIHJldHVybiB7IGxhYmVsOiBgJHtkYXlzfSBkaWFzYCwgY29sb3I6IFwiI0Y1OUUwQlwiIH07XG4gIGlmIChkYXlzIDw9IDcpIHJldHVybiB7IGxhYmVsOiBgJHtkYXlzfSBkaWFzYCwgY29sb3I6IFwiIzEwQjk4MVwiIH07XG4gIHJldHVybiB7IGxhYmVsOiBgJHtkYXlzfSBkaWFzYCwgY29sb3I6IFwiIzZCNzI4MFwiIH07XG59XG5cbmZ1bmN0aW9uIGZvcm1hdERhdGVUaW1lKGRhdGVTdHIpIHtcbiAgaWYgKCFkYXRlU3RyKSByZXR1cm4gXCJcIjtcbiAgY29uc3QgZCA9IG5ldyBEYXRlKGRhdGVTdHIpO1xuICBjb25zdCBoYXNUaW1lID0gZGF0ZVN0ci5pbmNsdWRlcyhcIlRcIikgJiYgIWRhdGVTdHIuZW5kc1dpdGgoXCJUMDA6MDBcIik7XG4gIGlmIChoYXNUaW1lKSByZXR1cm4gZm9ybWF0KGQsIFwiZCBNTU0geXl5eSBISDptbVwiLCB7IGxvY2FsZTogcHQgfSk7XG4gIHJldHVybiBmb3JtYXQoZCwgXCJkIE1NTSB5eXl5XCIsIHsgbG9jYWxlOiBwdCB9KTtcbn1cblxuZnVuY3Rpb24gZXZlbnREdXJhdGlvbihzdGFydCwgZW5kKSB7XG4gIGlmICghc3RhcnQgfHwgIWVuZCkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHMgPSBuZXcgRGF0ZShzdGFydCk7XG4gIGNvbnN0IGUgPSBuZXcgRGF0ZShlbmQpO1xuICBjb25zdCBtaW5zID0gZGlmZmVyZW5jZUluTWludXRlcyhlLCBzKTtcbiAgaWYgKG1pbnMgPCAwKSByZXR1cm4gbnVsbDtcbiAgaWYgKG1pbnMgPCA2MCkgcmV0dXJuIGAke21pbnN9bWluYDtcbiAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKG1pbnMgLyA2MCk7XG4gIGNvbnN0IHJlbSA9IG1pbnMgJSA2MDtcbiAgY29uc3QgZGF5cyA9IE1hdGguZmxvb3IoaG91cnMgLyAyNCk7XG4gIGlmIChkYXlzID4gMCkge1xuICAgIGNvbnN0IHJlbUhvdXJzID0gaG91cnMgJSAyNDtcbiAgICByZXR1cm4gcmVtSG91cnMgPiAwID8gYCR7ZGF5c31kICR7cmVtSG91cnN9aGAgOiBgJHtkYXlzfSBkaWEke2RheXMgPiAxID8gXCJzXCIgOiBcIlwifWA7XG4gIH1cbiAgcmV0dXJuIHJlbSA+IDAgPyBgJHtob3Vyc31oICR7cmVtfW1pbmAgOiBgJHtob3Vyc31oYDtcbn1cblxuZnVuY3Rpb24gRGVhZGxpbmVDYXJkKHsgaXRlbSwgb25EZWxldGUsIGluZGV4LCBcImRhdGEtY29sbGVjdGlvbi1pdGVtLWlkXCI6IF9fZGF0YUNvbGxlY3Rpb25JdGVtSWQgfSkge1xuICBjb25zdCBjb2xvckhleCA9IFBSRVNFVF9DT0xPUlMuZmluZCgoYykgPT4gYy5rZXkgPT09IGl0ZW0uY29sb3IpPy5oZXggfHwgaXRlbS5jb2xvciB8fCBcIiNFODdBNUFcIjtcbiAgY29uc3QgdXJnZW5jeSA9IHVyZ2VuY3lJbmZvKGl0ZW0uZGVhZGxpbmUpO1xuXG4gIHJldHVybiAoXG4gICAgPG1vdGlvbi5kaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6NTg6NFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB5OiAxNiB9fVxuICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgeTogMCB9fVxuICAgIHRyYW5zaXRpb249e3sgZGVsYXk6IGluZGV4ICogMC4wNSB9fVxuICAgIGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtM3hsIGJvcmRlciBib3JkZXItYm9yZGVyIHNoYWRvdy1zbSBvdmVyZmxvdy1oaWRkZW5cIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17X19kYXRhQ29sbGVjdGlvbkl0ZW1JZH0+XG4gICAgICBcbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6NjQ6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImgtMVwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IGNvbG9ySGV4IH19IC8+XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjY1OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJwLTRcIj5cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczo2Njo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgbWItM1wiPlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6Njc6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMi41XCI+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjY4OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidy05IGgtOSByb3VuZGVkLXhsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGZsZXgtc2hyaW5rLTBcIiBzdHlsZT17eyBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9ySGV4ICsgXCIxOFwiIH19PlxuICAgICAgICAgICAgICA8Q2FsZW5kYXJDbG9jayBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczo2OToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInctNCBoLTRcIiBzdHlsZT17eyBjb2xvcjogY29sb3JIZXggfX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGgzIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjcxOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC1mb3JlZ3JvdW5kIGxlYWRpbmctdGlnaHRcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cIm5hbWVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aXRlbT8uaWQgfHwgaXRlbT8uX2lkfT57aXRlbS5uYW1lfTwvaDM+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczo3MzoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgZmxleC1zaHJpbmstMFwiPlxuICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6NzQ6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJweC0yLjUgcHktMSByb3VuZGVkLWZ1bGwgdGV4dC1bMTFweF0gZm9udC1ib2xkIHRleHQtd2hpdGVcIiBzdHlsZT17eyBiYWNrZ3JvdW5kQ29sb3I6IHVyZ2VuY3kuY29sb3IgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJsYWJlbFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXt1cmdlbmN5Py5pZCB8fCB1cmdlbmN5Py5faWR9PlxuICAgICAgICAgICAgICB7dXJnZW5jeS5sYWJlbH1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6Nzc6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiBvbkRlbGV0ZShpdGVtLmlkKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNyBoLTcgcm91bmRlZC14bCBiZy1zZWNvbmRhcnkgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGhvdmVyOnRleHQtcm9zZS01MDAgaG92ZXI6Ymctcm9zZS01MCB0cmFuc2l0aW9uLWFsbFwiPlxuICAgICAgICAgICAgICA8VHJhc2gyIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjc5OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjg0OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBnYXAtMS41IG1sLTExXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJsb2NhdGlvblwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtpdGVtPy5pZCB8fCBpdGVtPy5faWR9PlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6ODU6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBweC0yLjUgcHktMSByb3VuZGVkLXhsIGJnLXNlY29uZGFyeSB0ZXh0LXhzIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiPlxuICAgICAgICAgICAgPENsb2NrIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjg2OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPiB7Zm9ybWF0RGF0ZVRpbWUoaXRlbS5kZWFkbGluZSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge2l0ZW0ubG9jYXRpb24gJiZcbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjg5OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcHgtMi41IHB5LTEgcm91bmRlZC14bCBiZy1zZWNvbmRhcnkgdGV4dC14cyB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj5cbiAgICAgICAgICAgICAgPE1hcFBpbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczo5MDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6OTE6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0cnVuY2F0ZSBtYXgtdy1bMTAwcHhdXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJsb2NhdGlvblwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtpdGVtPy5pZCB8fCBpdGVtPy5faWR9PntpdGVtLmxvY2F0aW9ufTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIH1cbiAgICAgICAgICB7aXRlbS53ZWJzaXRlICYmXG4gICAgICAgICAgPGEgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6OTU6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBocmVmPXtpdGVtLndlYnNpdGUuc3RhcnRzV2l0aChcImh0dHBcIikgPyBpdGVtLndlYnNpdGUgOiBgaHR0cHM6Ly8ke2l0ZW0ud2Vic2l0ZX1gfVxuICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIiBvbkNsaWNrPXsoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBweC0yLjUgcHktMSByb3VuZGVkLXhsIGJnLXNlY29uZGFyeSB0ZXh0LXhzIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBob3Zlcjp0ZXh0LVsjRTg3QTVBXSB0cmFuc2l0aW9uLWFsbFwiPlxuICAgICAgICAgICAgICA8R2xvYmUgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6OTg6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+XG4gICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjk5OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidHJ1bmNhdGUgbWF4LXctWzEwMHB4XVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwid2Vic2l0ZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtpdGVtPy5pZCB8fCBpdGVtPy5faWR9PntpdGVtLndlYnNpdGUucmVwbGFjZSgvXmh0dHBzPzpcXC9cXC8vLCBcIlwiKX08L3NwYW4+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbW90aW9uLmRpdj4pO1xuXG59XG5cbmZ1bmN0aW9uIEV2ZW50Q2FyZCh7IGl0ZW0sIG9uRGVsZXRlLCBpbmRleCwgXCJkYXRhLWNvbGxlY3Rpb24taXRlbS1pZFwiOiBfX2RhdGFDb2xsZWN0aW9uSXRlbUlkIH0pIHtcbiAgY29uc3QgY29sb3JIZXggPSBQUkVTRVRfQ09MT1JTLmZpbmQoKGMpID0+IGMua2V5ID09PSBpdGVtLmNvbG9yKT8uaGV4IHx8IGl0ZW0uY29sb3IgfHwgXCIjOEI1Q0Y2XCI7XG4gIGNvbnN0IGR1cmF0aW9uID0gZXZlbnREdXJhdGlvbihpdGVtLnN0YXJ0X2RhdGV0aW1lLCBpdGVtLmVuZF9kYXRldGltZSk7XG4gIGNvbnN0IHN0YXJ0VXJnZW5jeSA9IHVyZ2VuY3lJbmZvKGl0ZW0uc3RhcnRfZGF0ZXRpbWUpO1xuXG4gIHJldHVybiAoXG4gICAgPG1vdGlvbi5kaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MTE0OjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeTogMTYgfX1cbiAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHk6IDAgfX1cbiAgICB0cmFuc2l0aW9uPXt7IGRlbGF5OiBpbmRleCAqIDAuMDUgfX1cbiAgICBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTN4bCBib3JkZXIgYm9yZGVyLWJvcmRlciBzaGFkb3ctc20gb3ZlcmZsb3ctaGlkZGVuXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e19fZGF0YUNvbGxlY3Rpb25JdGVtSWR9PlxuICAgICAgXG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjEyMDo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiaC0xXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogYGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgJHtjb2xvckhleH0sICR7Y29sb3JIZXh9ODgpYCB9fSAvPlxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczoxMjE6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInAtNFwiPlxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjEyMjo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgbWItM1wiPlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MTIzOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNVwiPlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczoxMjQ6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ3LTkgaC05IHJvdW5kZWQteGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZmxleC1zaHJpbmstMFwiIHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogY29sb3JIZXggKyBcIjE4XCIgfX0+XG4gICAgICAgICAgICAgIDxDYWxlbmRhclJhbmdlIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjEyNToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInctNCBoLTRcIiBzdHlsZT17eyBjb2xvcjogY29sb3JIZXggfX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczoxMjc6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImRlc2NyaXB0aW9uXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2l0ZW0/LmlkIHx8IGl0ZW0/Ll9pZH0+XG4gICAgICAgICAgICAgIDxoMyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczoxMjg6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYm9sZCB0ZXh0LWZvcmVncm91bmQgbGVhZGluZy10aWdodFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibmFtZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtpdGVtPy5pZCB8fCBpdGVtPy5faWR9PntpdGVtLm5hbWV9PC9oMz5cbiAgICAgICAgICAgICAge2l0ZW0uZGVzY3JpcHRpb24gJiYgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MTI5OjM1XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIG10LTAuNSBsZWFkaW5nLXNudWdcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImRlc2NyaXB0aW9uXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2l0ZW0/LmlkIHx8IGl0ZW0/Ll9pZH0+e2l0ZW0uZGVzY3JpcHRpb259PC9wPn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MTMyOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBmbGV4LXNocmluay0wXCI+XG4gICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczoxMzM6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJweC0yLjUgcHktMSByb3VuZGVkLWZ1bGwgdGV4dC1bMTFweF0gZm9udC1ib2xkIHRleHQtd2hpdGVcIiBzdHlsZT17eyBiYWNrZ3JvdW5kQ29sb3I6IHN0YXJ0VXJnZW5jeS5jb2xvciB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImxhYmVsXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e3N0YXJ0VXJnZW5jeT8uaWQgfHwgc3RhcnRVcmdlbmN5Py5faWR9PlxuICAgICAgICAgICAgICB7c3RhcnRVcmdlbmN5LmxhYmVsfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczoxMzY6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiBvbkRlbGV0ZShpdGVtLmlkKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNyBoLTcgcm91bmRlZC14bCBiZy1zZWNvbmRhcnkgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGhvdmVyOnRleHQtcm9zZS01MDAgaG92ZXI6Ymctcm9zZS01MCB0cmFuc2l0aW9uLWFsbFwiPlxuICAgICAgICAgICAgICA8VHJhc2gyIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjEzODoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczoxNDM6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGdhcC0xLjUgbWwtMTFcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImxvY2F0aW9uXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2l0ZW0/LmlkIHx8IGl0ZW0/Ll9pZH0+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczoxNDQ6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBweC0yLjUgcHktMSByb3VuZGVkLXhsIGJnLXNlY29uZGFyeSB0ZXh0LXhzIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiPlxuICAgICAgICAgICAgPENsb2NrIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjE0NToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz4ge2Zvcm1hdERhdGVUaW1lKGl0ZW0uc3RhcnRfZGF0ZXRpbWUpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MTQ3OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcHgtMi41IHB5LTEgcm91bmRlZC14bCBiZy1zZWNvbmRhcnkgdGV4dC14cyB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj5cbiAgICAgICAgICAgIDxDaGV2cm9uRG93biBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczoxNDg6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+IHtmb3JtYXREYXRlVGltZShpdGVtLmVuZF9kYXRldGltZSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge2R1cmF0aW9uICYmXG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczoxNTE6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBweC0yLjUgcHktMSByb3VuZGVkLXhsIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlXCIgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiBjb2xvckhleCB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImR1cmF0aW9uXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e19fZGF0YUNvbGxlY3Rpb25JdGVtSWR9PlxuICAgICAgICAgICAgICA8VGltZXIgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MTUyOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPiB7ZHVyYXRpb259XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB9XG4gICAgICAgICAge2l0ZW0ubG9jYXRpb24gJiZcbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjE1NjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHB4LTIuNSBweS0xIHJvdW5kZWQteGwgYmctc2Vjb25kYXJ5IHRleHQteHMgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCI+XG4gICAgICAgICAgICAgIDxNYXBQaW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MTU3OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczoxNTg6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0cnVuY2F0ZSBtYXgtdy1bMTAwcHhdXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJsb2NhdGlvblwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtpdGVtPy5pZCB8fCBpdGVtPy5faWR9PntpdGVtLmxvY2F0aW9ufTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIH1cbiAgICAgICAgICB7aXRlbS53ZWJzaXRlICYmXG4gICAgICAgICAgPGEgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MTYyOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgaHJlZj17aXRlbS53ZWJzaXRlLnN0YXJ0c1dpdGgoXCJodHRwXCIpID8gaXRlbS53ZWJzaXRlIDogYGh0dHBzOi8vJHtpdGVtLndlYnNpdGV9YH1cbiAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCIgb25DbGljaz17KGUpID0+IGUuc3RvcFByb3BhZ2F0aW9uKCl9XG4gICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcHgtMi41IHB5LTEgcm91bmRlZC14bCBiZy1zZWNvbmRhcnkgdGV4dC14cyB0ZXh0LW11dGVkLWZvcmVncm91bmQgaG92ZXI6dGV4dC1bI0U4N0E1QV0gdHJhbnNpdGlvbi1hbGxcIj5cbiAgICAgICAgICAgICAgPEdsb2JlIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjE2NToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MTY2OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidHJ1bmNhdGUgbWF4LXctWzEwMHB4XVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwid2Vic2l0ZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtpdGVtPy5pZCB8fCBpdGVtPy5faWR9PntpdGVtLndlYnNpdGUucmVwbGFjZSgvXmh0dHBzPzpcXC9cXC8vLCBcIlwiKX08L3NwYW4+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbW90aW9uLmRpdj4pO1xuXG59XG5cbmZ1bmN0aW9uIEFkZERlYWRsaW5lRm9ybSh7IG9uU2F2ZSwgb25DYW5jZWwgfSkge1xuICBjb25zdCBbZm9ybSwgc2V0Rm9ybV0gPSB1c2VTdGF0ZSh7IG5hbWU6IFwiXCIsIGNvbG9yOiBcIm9yYW5nZVwiLCBsb2NhdGlvbjogXCJcIiwgd2Vic2l0ZTogXCJcIiwgZGVhZGxpbmU6IFwiXCIgfSk7XG4gIGNvbnN0IGNvbG9ySGV4ID0gUFJFU0VUX0NPTE9SUy5maW5kKChjKSA9PiBjLmtleSA9PT0gZm9ybS5jb2xvcik/LmhleCB8fCBcIiNGOTczMTZcIjtcblxuICByZXR1cm4gKFxuICAgIDxtb3Rpb24uZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjE4MDo0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB5OiAyMCB9fSBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHk6IDAgfX1cbiAgICBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTN4bCBib3JkZXIgYm9yZGVyLWJvcmRlciBzaGFkb3ctbWQgb3ZlcmZsb3ctaGlkZGVuIG1iLTJcIj5cbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MTgyOjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJoLTFcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBjb2xvckhleCB9fSAvPlxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczoxODM6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInAtNCBzcGFjZS15LTNcIj5cbiAgICAgICAgPGlucHV0IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjE4NDo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgdmFsdWU9e2Zvcm0ubmFtZX0gb25DaGFuZ2U9eyhlKSA9PiBzZXRGb3JtKHsgLi4uZm9ybSwgbmFtZTogZS50YXJnZXQudmFsdWUgfSl9XG4gICAgICAgIHBsYWNlaG9sZGVyPVwiTm9tZSBkbyBwcmF6b1wiXG4gICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC00IHB5LTMgcm91bmRlZC0yeGwgYmctc2Vjb25kYXJ5LzYwIHRleHQtc20gZm9udC1zZW1pYm9sZCBvdXRsaW5lLW5vbmUgZm9jdXM6Ymctd2hpdGUgdHJhbnNpdGlvbi1hbGxcIiAvPlxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjE4Nzo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMlwiPlxuICAgICAgICAgIDxpbnB1dCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczoxODg6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiB2YWx1ZT17Zm9ybS5sb2NhdGlvbn0gb25DaGFuZ2U9eyhlKSA9PiBzZXRGb3JtKHsgLi4uZm9ybSwgbG9jYXRpb246IGUudGFyZ2V0LnZhbHVlIH0pfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwi8J+TjSBMb2NhbFwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0yLjUgcm91bmRlZC0yeGwgYmctc2Vjb25kYXJ5LzYwIHRleHQtc20gb3V0bGluZS1ub25lIGZvY3VzOmJnLXdoaXRlIHRyYW5zaXRpb24tYWxsXCIgLz5cbiAgICAgICAgICA8aW5wdXQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MTkxOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgdmFsdWU9e2Zvcm0ud2Vic2l0ZX0gb25DaGFuZ2U9eyhlKSA9PiBzZXRGb3JtKHsgLi4uZm9ybSwgd2Vic2l0ZTogZS50YXJnZXQudmFsdWUgfSl9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCLwn4yQIFdlYnNpdGVcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMi41IHJvdW5kZWQtMnhsIGJnLXNlY29uZGFyeS82MCB0ZXh0LXNtIG91dGxpbmUtbm9uZSBmb2N1czpiZy13aGl0ZSB0cmFuc2l0aW9uLWFsbFwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjE5NTo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgICAgPGxhYmVsIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjE5NjoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LW11dGVkLWZvcmVncm91bmQgbWItMSBibG9ja1wiPkRhdGEgZSBob3JhIGxpbWl0ZTwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjE5NzoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHR5cGU9XCJkYXRldGltZS1sb2NhbFwiIHZhbHVlPXtmb3JtLmRlYWRsaW5lfSBvbkNoYW5nZT17KGUpID0+IHNldEZvcm0oeyAuLi5mb3JtLCBkZWFkbGluZTogZS50YXJnZXQudmFsdWUgfSl9XG4gICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTQgcHktMi41IHJvdW5kZWQtMnhsIGJnLXNlY29uZGFyeS82MCB0ZXh0LXNtIG91dGxpbmUtbm9uZSBmb2N1czpiZy13aGl0ZSB0cmFuc2l0aW9uLWFsbFwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjIwMDo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MjAxOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBtYi0yXCI+Q29yPC9wPlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MjAyOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBnYXAtMiBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgIHtQUkVTRVRfQ09MT1JTLm1hcCgoYywgX19hcnJJZHhfXykgPT5cbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MjA0OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtjLmtleX0gb25DbGljaz17KCkgPT4gc2V0Rm9ybSh7IC4uLmZvcm0sIGNvbG9yOiBjLmtleSB9KX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHctNyBoLTcgcm91bmRlZC14bCB0cmFuc2l0aW9uLWFsbCAke2Zvcm0uY29sb3IgPT09IGMua2V5ID8gXCJyaW5nLTIgcmluZy1vZmZzZXQtMiBzY2FsZS0xMTBcIiA6IFwiaG92ZXI6c2NhbGUtMTA1IG9wYWNpdHktNzBcIn1gfVxuICAgICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiBjLmhleCB9fSBkYXRhLWFyci1pbmRleD17X19hcnJJZHhfX30gZGF0YS1hcnItdmFyaWFibGUtbmFtZT1cIlBSRVNFVF9DT0xPUlNcIiAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MjEwOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yIHB0LTFcIj5cbiAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjIxMToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9e29uQ2FuY2VsfVxuICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBweS0yLjUgcm91bmRlZC0yeGwgYmctc2Vjb25kYXJ5IHRleHQtbXV0ZWQtZm9yZWdyb3VuZCB0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgaG92ZXI6YmctYm9yZGVyIHRyYW5zaXRpb24tYWxsXCI+XG4gICAgICAgICAgICBDYW5jZWxhclxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MjE1OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gZm9ybS5uYW1lLnRyaW0oKSAmJiBmb3JtLmRlYWRsaW5lICYmIG9uU2F2ZShmb3JtKX1cbiAgICAgICAgICBkaXNhYmxlZD17IWZvcm0ubmFtZS50cmltKCkgfHwgIWZvcm0uZGVhZGxpbmV9XG4gICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIHB5LTIuNSByb3VuZGVkLTJ4bCB0ZXh0LXdoaXRlIHRleHQtc20gZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsIGhvdmVyOm9wYWNpdHktOTAgYWN0aXZlOnNjYWxlLVswLjk4XSBkaXNhYmxlZDpvcGFjaXR5LTQwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xLjVcIlxuICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogY29sb3JIZXggfX0+XG4gICAgICAgICAgICA8Q2hlY2sgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MjE5OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPiBBZGljaW9uYXJcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L21vdGlvbi5kaXY+KTtcblxufVxuXG5mdW5jdGlvbiBBZGRFdmVudEZvcm0oeyBvblNhdmUsIG9uQ2FuY2VsLCBpZCB9KSB7XG4gIGNvbnN0IFtmb3JtLCBzZXRGb3JtXSA9IHVzZVN0YXRlKHsgbmFtZTogXCJcIiwgY29sb3I6IFwicHVycGxlXCIsIGxvY2F0aW9uOiBcIlwiLCB3ZWJzaXRlOiBcIlwiLCBkZXNjcmlwdGlvbjogXCJcIiwgc3RhcnRfZGF0ZXRpbWU6IFwiXCIsIGVuZF9kYXRldGltZTogXCJcIiB9KTtcbiAgY29uc3QgY29sb3JIZXggPSBQUkVTRVRfQ09MT1JTLmZpbmQoKGMpID0+IGMua2V5ID09PSBmb3JtLmNvbG9yKT8uaGV4IHx8IFwiIzhCNUNGNlwiO1xuICBjb25zdCBkdXJhdGlvbiA9IGV2ZW50RHVyYXRpb24oZm9ybS5zdGFydF9kYXRldGltZSwgZm9ybS5lbmRfZGF0ZXRpbWUpO1xuXG4gIHJldHVybiAoXG4gICAgPG1vdGlvbi5kaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MjMzOjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHk6IDIwIH19IGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgeTogMCB9fVxuICAgIGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtM3hsIGJvcmRlciBib3JkZXItYm9yZGVyIHNoYWRvdy1tZCBvdmVyZmxvdy1oaWRkZW4gbWItMlwiPlxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczoyMzU6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImgtMVwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IGBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICR7Y29sb3JIZXh9LCAke2NvbG9ySGV4fTg4KWAgfX0gLz5cbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MjM2OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJwLTQgc3BhY2UteS0zXCI+XG4gICAgICAgIDxpbnB1dCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczoyMzc6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHZhbHVlPXtmb3JtLm5hbWV9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0Rm9ybSh7IC4uLmZvcm0sIG5hbWU6IGUudGFyZ2V0LnZhbHVlIH0pfVxuICAgICAgICBwbGFjZWhvbGRlcj1cIk5vbWUgZG8gZXZlbnRvXCJcbiAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTQgcHktMyByb3VuZGVkLTJ4bCBiZy1zZWNvbmRhcnkvNjAgdGV4dC1zbSBmb250LXNlbWlib2xkIG91dGxpbmUtbm9uZSBmb2N1czpiZy13aGl0ZSB0cmFuc2l0aW9uLWFsbFwiIC8+XG4gICAgICAgIDxpbnB1dCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczoyNDA6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHZhbHVlPXtmb3JtLmRlc2NyaXB0aW9ufSBvbkNoYW5nZT17KGUpID0+IHNldEZvcm0oeyAuLi5mb3JtLCBkZXNjcmlwdGlvbjogZS50YXJnZXQudmFsdWUgfSl9XG4gICAgICAgIHBsYWNlaG9sZGVyPVwiRGVzY3Jpw6fDo28gKG9wY2lvbmFsKVwiXG4gICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC00IHB5LTIuNSByb3VuZGVkLTJ4bCBiZy1zZWNvbmRhcnkvNjAgdGV4dC1zbSBvdXRsaW5lLW5vbmUgZm9jdXM6Ymctd2hpdGUgdHJhbnNpdGlvbi1hbGxcIiAvPlxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjI0Mzo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMlwiPlxuICAgICAgICAgIDxpbnB1dCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczoyNDQ6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiB2YWx1ZT17Zm9ybS5sb2NhdGlvbn0gb25DaGFuZ2U9eyhlKSA9PiBzZXRGb3JtKHsgLi4uZm9ybSwgbG9jYXRpb246IGUudGFyZ2V0LnZhbHVlIH0pfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwi8J+TjSBMb2NhbFwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0yLjUgcm91bmRlZC0yeGwgYmctc2Vjb25kYXJ5LzYwIHRleHQtc20gb3V0bGluZS1ub25lIGZvY3VzOmJnLXdoaXRlIHRyYW5zaXRpb24tYWxsXCIgLz5cbiAgICAgICAgICA8aW5wdXQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MjQ3OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgdmFsdWU9e2Zvcm0ud2Vic2l0ZX0gb25DaGFuZ2U9eyhlKSA9PiBzZXRGb3JtKHsgLi4uZm9ybSwgd2Vic2l0ZTogZS50YXJnZXQudmFsdWUgfSl9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCLwn4yQIFdlYnNpdGVcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMi41IHJvdW5kZWQtMnhsIGJnLXNlY29uZGFyeS82MCB0ZXh0LXNtIG91dGxpbmUtbm9uZSBmb2N1czpiZy13aGl0ZSB0cmFuc2l0aW9uLWFsbFwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjI1MTo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczoyNTI6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIj5cbiAgICAgICAgICAgIDxsYWJlbCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczoyNTM6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIG1iLTEgYmxvY2tcIj7ilrYgSW7DrWNpbzwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MjU0OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCIgdmFsdWU9e2Zvcm0uc3RhcnRfZGF0ZXRpbWV9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0Rm9ybSh7IC4uLmZvcm0sIHN0YXJ0X2RhdGV0aW1lOiBlLnRhcmdldC52YWx1ZSB9KX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC00IHB5LTIuNSByb3VuZGVkLTJ4bCBiZy1zZWNvbmRhcnkvNjAgdGV4dC1zbSBvdXRsaW5lLW5vbmUgZm9jdXM6Ymctd2hpdGUgdHJhbnNpdGlvbi1hbGxcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MjU3OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgICAgICA8bGFiZWwgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MjU4OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBtYi0xIGJsb2NrXCI+4pagIEZpbTwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MjU5OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCIgdmFsdWU9e2Zvcm0uZW5kX2RhdGV0aW1lfSBvbkNoYW5nZT17KGUpID0+IHNldEZvcm0oeyAuLi5mb3JtLCBlbmRfZGF0ZXRpbWU6IGUudGFyZ2V0LnZhbHVlIH0pfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTQgcHktMi41IHJvdW5kZWQtMnhsIGJnLXNlY29uZGFyeS82MCB0ZXh0LXNtIG91dGxpbmUtbm9uZSBmb2N1czpiZy13aGl0ZSB0cmFuc2l0aW9uLWFsbFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge2R1cmF0aW9uICYmXG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczoyNjM6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMgcHktMiByb3VuZGVkLXhsIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlXCIgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiBjb2xvckhleCB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImR1cmF0aW9uXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2lkfT5cbiAgICAgICAgICAgICAgPFRpbWVyIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjI2NDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+IER1cmHDp8Ojbzoge2R1cmF0aW9ufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczoyNjg6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiPlxuICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjI2OToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LW11dGVkLWZvcmVncm91bmQgbWItMlwiPkNvcjwvcD5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjI3MDoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZ2FwLTIgZmxleC13cmFwXCI+XG4gICAgICAgICAgICB7UFJFU0VUX0NPTE9SUy5tYXAoKGMsIF9fYXJySWR4X18pID0+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjI3MjoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17Yy5rZXl9IG9uQ2xpY2s9eygpID0+IHNldEZvcm0oeyAuLi5mb3JtLCBjb2xvcjogYy5rZXkgfSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2B3LTcgaC03IHJvdW5kZWQteGwgdHJhbnNpdGlvbi1hbGwgJHtmb3JtLmNvbG9yID09PSBjLmtleSA/IFwicmluZy0yIHJpbmctb2Zmc2V0LTIgc2NhbGUtMTEwXCIgOiBcImhvdmVyOnNjYWxlLTEwNSBvcGFjaXR5LTcwXCJ9YH1cbiAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogYy5oZXggfX0gZGF0YS1hcnItaW5kZXg9e19fYXJySWR4X199IGRhdGEtYXJyLXZhcmlhYmxlLW5hbWU9XCJQUkVTRVRfQ09MT1JTXCIgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjI3ODo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBnYXAtMiBwdC0xXCI+XG4gICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczoyNzk6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXtvbkNhbmNlbH1cbiAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcHktMi41IHJvdW5kZWQtMnhsIGJnLXNlY29uZGFyeSB0ZXh0LW11dGVkLWZvcmVncm91bmQgdGV4dC1zbSBmb250LXNlbWlib2xkIGhvdmVyOmJnLWJvcmRlciB0cmFuc2l0aW9uLWFsbFwiPlxuICAgICAgICAgICAgQ2FuY2VsYXJcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjI4MzoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IGZvcm0ubmFtZS50cmltKCkgJiYgZm9ybS5zdGFydF9kYXRldGltZSAmJiBmb3JtLmVuZF9kYXRldGltZSAmJiBvblNhdmUoZm9ybSl9XG4gICAgICAgICAgZGlzYWJsZWQ9eyFmb3JtLm5hbWUudHJpbSgpIHx8ICFmb3JtLnN0YXJ0X2RhdGV0aW1lIHx8ICFmb3JtLmVuZF9kYXRldGltZX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcHktMi41IHJvdW5kZWQtMnhsIHRleHQtd2hpdGUgdGV4dC1zbSBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgaG92ZXI6b3BhY2l0eS05MCBhY3RpdmU6c2NhbGUtWzAuOThdIGRpc2FibGVkOm9wYWNpdHktNDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEuNVwiXG4gICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiBjb2xvckhleCB9fT5cbiAgICAgICAgICAgIDxDaGVjayBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczoyODc6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+IEFkaWNpb25hclxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbW90aW9uLmRpdj4pO1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERlYWRsaW5lcygpIHtcbiAgY29uc3QgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpO1xuICBjb25zdCBbZGVhZGxpbmVzLCBzZXREZWFkbGluZXNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbZXZlbnRzLCBzZXRFdmVudHNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gdXNlU3RhdGUoXCJwcmF6b3NcIik7XG4gIGNvbnN0IFtzaG93Rm9ybSwgc2V0U2hvd0Zvcm1dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCB0b3VjaFN0YXJ0ID0gdXNlUmVmKHsgeDogMCwgeTogMCB9KTtcbiAgY29uc3QgZHJhZ09mZnNldCA9IHVzZVJlZih7IHg6IDAsIHk6IDAgfSk7XG4gIGNvbnN0IFtkcmFnU3R5bGUsIHNldERyYWdTdHlsZV0gPSB1c2VTdGF0ZSh7fSk7XG5cbiAgY29uc3QgcmVmcmVzaCA9ICgpID0+IHtcbiAgICBiYXNlNDQuZW50aXRpZXMuRGVhZGxpbmUubGlzdChcIi1kZWFkbGluZVwiLCAxMDApLnRoZW4oc2V0RGVhZGxpbmVzKS5jYXRjaCgoKSA9PiBzZXREZWFkbGluZXMoW10pKTtcbiAgICBiYXNlNDQuZW50aXRpZXMuRXZlbnQubGlzdChcIi1zdGFydF9kYXRldGltZVwiLCAxMDApLnRoZW4oc2V0RXZlbnRzKS5jYXRjaCgoKSA9PiBzZXRFdmVudHMoW10pKTtcbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge3JlZnJlc2goKTt9LCBbXSk7XG5cbiAgY29uc3QgYWRkRGVhZGxpbmUgPSBhc3luYyAoZm9ybSkgPT4ge1xuICAgIGF3YWl0IGJhc2U0NC5lbnRpdGllcy5EZWFkbGluZS5jcmVhdGUoZm9ybSk7XG4gICAgc2V0U2hvd0Zvcm0oZmFsc2UpO1xuICAgIHJlZnJlc2goKTtcbiAgfTtcblxuICBjb25zdCBhZGRFdmVudCA9IGFzeW5jIChmb3JtKSA9PiB7XG4gICAgYXdhaXQgYmFzZTQ0LmVudGl0aWVzLkV2ZW50LmNyZWF0ZShmb3JtKTtcbiAgICBzZXRTaG93Rm9ybShmYWxzZSk7XG4gICAgcmVmcmVzaCgpO1xuICB9O1xuXG4gIGNvbnN0IGRlbGV0ZURlYWRsaW5lID0gYXN5bmMgKGlkKSA9PiB7XG4gICAgYXdhaXQgYmFzZTQ0LmVudGl0aWVzLkRlYWRsaW5lLmRlbGV0ZShpZCk7XG4gICAgcmVmcmVzaCgpO1xuICB9O1xuXG4gIGNvbnN0IGRlbGV0ZUV2ZW50ID0gYXN5bmMgKGlkKSA9PiB7XG4gICAgYXdhaXQgYmFzZTQ0LmVudGl0aWVzLkV2ZW50LmRlbGV0ZShpZCk7XG4gICAgcmVmcmVzaCgpO1xuICB9O1xuXG4gIGNvbnN0IHVwY29taW5nRGVhZGxpbmVzID0gZGVhZGxpbmVzLmZpbHRlcigoaSkgPT4gIWlzUGFzdChuZXcgRGF0ZShpLmRlYWRsaW5lKSkgfHwgaXNUb2RheShuZXcgRGF0ZShpLmRlYWRsaW5lKSkpLlxuICBzb3J0KChhLCBiKSA9PiBuZXcgRGF0ZShhLmRlYWRsaW5lKSAtIG5ldyBEYXRlKGIuZGVhZGxpbmUpKTtcbiAgY29uc3QgZXhwaXJlZERlYWRsaW5lcyA9IGRlYWRsaW5lcy5maWx0ZXIoKGkpID0+IGlzUGFzdChuZXcgRGF0ZShpLmRlYWRsaW5lKSkgJiYgIWlzVG9kYXkobmV3IERhdGUoaS5kZWFkbGluZSkpKS5cbiAgc29ydCgoYSwgYikgPT4gbmV3IERhdGUoYi5kZWFkbGluZSkgLSBuZXcgRGF0ZShhLmRlYWRsaW5lKSk7XG5cbiAgY29uc3QgdXBjb21pbmdFdmVudHMgPSBldmVudHMuZmlsdGVyKChpKSA9PiAhaXNQYXN0KG5ldyBEYXRlKGkuZW5kX2RhdGV0aW1lKSkpLlxuICBzb3J0KChhLCBiKSA9PiBuZXcgRGF0ZShhLnN0YXJ0X2RhdGV0aW1lKSAtIG5ldyBEYXRlKGIuc3RhcnRfZGF0ZXRpbWUpKTtcbiAgY29uc3QgcGFzdEV2ZW50cyA9IGV2ZW50cy5maWx0ZXIoKGkpID0+IGlzUGFzdChuZXcgRGF0ZShpLmVuZF9kYXRldGltZSkpKS5cbiAgc29ydCgoYSwgYikgPT4gbmV3IERhdGUoYi5zdGFydF9kYXRldGltZSkgLSBuZXcgRGF0ZShhLnN0YXJ0X2RhdGV0aW1lKSk7XG5cbiAgY29uc3QgaGFuZGxlUG9pbnRlclN0YXJ0ID0gdXNlQ2FsbGJhY2soKHgsIHkpID0+IHt0b3VjaFN0YXJ0LmN1cnJlbnQgPSB7IHgsIHkgfTtkcmFnT2Zmc2V0LmN1cnJlbnQgPSB7IHg6IDAsIHk6IDAgfTtzZXREcmFnU3R5bGUoe30pO30sIFtdKTtcbiAgY29uc3QgaGFuZGxlUG9pbnRlck1vdmUgPSB1c2VDYWxsYmFjaygoeCwgeSkgPT4ge1xuICAgIGRyYWdPZmZzZXQuY3VycmVudCA9IHsgeDogeCAtIHRvdWNoU3RhcnQuY3VycmVudC54LCB5OiB5IC0gdG91Y2hTdGFydC5jdXJyZW50LnkgfTtcbiAgICBzZXREcmFnU3R5bGUoeyB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoJHtkcmFnT2Zmc2V0LmN1cnJlbnQueH1weCwgJHtkcmFnT2Zmc2V0LmN1cnJlbnQueX1weClgLCB0cmFuc2l0aW9uOiBcIm5vbmVcIiB9KTtcbiAgfSwgW10pO1xuICBjb25zdCBoYW5kbGVQb2ludGVyRW5kID0gdXNlQ2FsbGJhY2soKHgsIHkpID0+IHtcbiAgICBzZXREcmFnU3R5bGUoeyB0cmFuc2Zvcm06IFwidHJhbnNsYXRlKDAsIDApXCIsIHRyYW5zaXRpb246IFwidHJhbnNmb3JtIDAuM3MgZWFzZS1vdXRcIiB9KTtcbiAgICBjb25zdCBkeCA9IHggLSB0b3VjaFN0YXJ0LmN1cnJlbnQueDtcbiAgICBpZiAoTWF0aC5hYnMoZHgpID4gNjAgJiYgZHggPCAwKSBuYXZpZ2F0ZShcIi9jb21pbmctc29vblwiKTtcbiAgfSwgW25hdmlnYXRlXSk7XG5cbiAgY29uc3QgaXNFbXB0eSA9IGFjdGl2ZVRhYiA9PT0gXCJwcmF6b3NcIiA/XG4gIHVwY29taW5nRGVhZGxpbmVzLmxlbmd0aCA9PT0gMCAmJiBleHBpcmVkRGVhZGxpbmVzLmxlbmd0aCA9PT0gMCA6XG4gIHVwY29taW5nRXZlbnRzLmxlbmd0aCA9PT0gMCAmJiBwYXN0RXZlbnRzLmxlbmd0aCA9PT0gMDtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MzYwOjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctY3JlYW0gZmxleCBmbGV4LWNvbCBzZWxlY3Qtbm9uZVwiXG4gICAgb25Ub3VjaFN0YXJ0PXsoZSkgPT4gaGFuZGxlUG9pbnRlclN0YXJ0KGUudG91Y2hlc1swXS5jbGllbnRYLCBlLnRvdWNoZXNbMF0uY2xpZW50WSl9XG4gICAgb25Ub3VjaE1vdmU9eyhlKSA9PiBoYW5kbGVQb2ludGVyTW92ZShlLnRvdWNoZXNbMF0uY2xpZW50WCwgZS50b3VjaGVzWzBdLmNsaWVudFkpfVxuICAgIG9uVG91Y2hFbmQ9eyhlKSA9PiBoYW5kbGVQb2ludGVyRW5kKGUuY2hhbmdlZFRvdWNoZXNbMF0/LmNsaWVudFggfHwgdG91Y2hTdGFydC5jdXJyZW50LngsIGUuY2hhbmdlZFRvdWNoZXNbMF0/LmNsaWVudFkgfHwgdG91Y2hTdGFydC5jdXJyZW50LnkpfVxuICAgIG9uTW91c2VEb3duPXsoZSkgPT4gaGFuZGxlUG9pbnRlclN0YXJ0KGUuY2xpZW50WCwgZS5jbGllbnRZKX1cbiAgICBvbk1vdXNlTW92ZT17KGUpID0+IHtpZiAoZS5idXR0b25zID09PSAxKSBoYW5kbGVQb2ludGVyTW92ZShlLmNsaWVudFgsIGUuY2xpZW50WSk7fX1cbiAgICBvbk1vdXNlVXA9eyhlKSA9PiBoYW5kbGVQb2ludGVyRW5kKGUuY2xpZW50WCwgZS5jbGllbnRZKX0+XG4gICAgICBcbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MzY4OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBzdHlsZT17ZHJhZ1N0eWxlfSBjbGFzc05hbWU9XCJmbGV4LTEgZmxleCBmbGV4LWNvbFwiPlxuICAgICAgICB7LyogSGVhZGVyICovfVxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjM3MDo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicHgtNSBwdC0xMiBwYi00IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MzcxOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MzcyOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoXCIvY29taW5nLXNvb25cIil9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgcm91bmRlZC0yeGwgYmctd2hpdGUgYm9yZGVyIGJvcmRlci1ib3JkZXIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGhvdmVyOnRleHQtZm9yZWdyb3VuZCBob3Zlcjpib3JkZXItWyNFODdBNUFdLzMwIHNoYWRvdy1zbSB0cmFuc2l0aW9uLWFsbFwiPlxuICAgICAgICAgICAgICA8QXJyb3dMZWZ0IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjM3NDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczozNzY6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIj5cbiAgICAgICAgICAgICAgPGgxIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjM3NzoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LWZvcmVncm91bmRcIj5Db250cm9sbyBkZSBEYXRhczwvaDE+XG4gICAgICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjM3ODoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCI+XG4gICAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gXCJwcmF6b3NcIiA/IGAke3VwY29taW5nRGVhZGxpbmVzLmxlbmd0aH0gcHJhem8ke3VwY29taW5nRGVhZGxpbmVzLmxlbmd0aCAhPT0gMSA/IFwic1wiIDogXCJcIn1gIDogYCR7dXBjb21pbmdFdmVudHMubGVuZ3RofSBldmVudG8ke3VwY29taW5nRXZlbnRzLmxlbmd0aCAhPT0gMSA/IFwic1wiIDogXCJcIn1gfVxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjM4MzoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldFNob3dGb3JtKCFzaG93Rm9ybSl9XG4gICAgICAgICAgY2xhc3NOYW1lPXtgdy0xMCBoLTEwIHJvdW5kZWQtMnhsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtd2hpdGUgc2hhZG93LWxnIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgc2hvd0Zvcm0gPyBcImJnLW11dGVkLWZvcmVncm91bmRcIiA6IFwiYmctWyNFODdBNUFdIHNoYWRvdy1bI0U4N0E1QV0vMjUgaG92ZXI6YmctWyNENDY5NEFdXCJ9YFxuICAgICAgICAgIH0+XG4gICAgICAgICAgICB7c2hvd0Zvcm0gPyA8WCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczozODc6MjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy01IGgtNVwiIC8+IDogPFBsdXMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6Mzg3OjUyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPn1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFRhYnMgKi99XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6MzkyOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJweC01IG1iLTRcIj5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjM5MzoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggYmctd2hpdGUgcm91bmRlZC0yeGwgcC0xLjUgYm9yZGVyIGJvcmRlci1ib3JkZXIgc2hhZG93LXNtIGdhcC0xXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjM5NDoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHtzZXRBY3RpdmVUYWIoXCJwcmF6b3NcIik7c2V0U2hvd0Zvcm0oZmFsc2UpO319XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4LTEgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgcHktMi41IHJvdW5kZWQteGwgdGV4dC1zbSBmb250LXNlbWlib2xkIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICBhY3RpdmVUYWIgPT09IFwicHJhem9zXCIgPyBcImJnLVsjRTg3QTVBXSB0ZXh0LXdoaXRlIHNoYWRvdy1tZFwiIDogXCJ0ZXh0LW11dGVkLWZvcmVncm91bmQgaG92ZXI6dGV4dC1mb3JlZ3JvdW5kXCJ9YFxuICAgICAgICAgICAgfT5cbiAgICAgICAgICAgICAgPENhbGVuZGFyQ2xvY2sgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6Mzk4OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPiBQcmF6b3NcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczo0MDA6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiB7c2V0QWN0aXZlVGFiKFwiZXZlbnRvc1wiKTtzZXRTaG93Rm9ybShmYWxzZSk7fX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXgtMSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBweS0yLjUgcm91bmRlZC14bCB0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gXCJldmVudG9zXCIgPyBcImJnLVsjOEI1Q0Y2XSB0ZXh0LXdoaXRlIHNoYWRvdy1tZFwiIDogXCJ0ZXh0LW11dGVkLWZvcmVncm91bmQgaG92ZXI6dGV4dC1mb3JlZ3JvdW5kXCJ9YFxuICAgICAgICAgICAgfT5cbiAgICAgICAgICAgICAgPENhbGVuZGFyUmFuZ2UgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6NDA0OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPiBFdmVudG9zXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIENvbnRlbnQgKi99XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6NDEwOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4LTEgcHgtNSBwYi0xMCBzcGFjZS15LTMgb3ZlcmZsb3ctYXV0b1wiPlxuICAgICAgICAgIDxBbmltYXRlUHJlc2VuY2UgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6NDExOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgbW9kZT1cIndhaXRcIj5cbiAgICAgICAgICAgIHtzaG93Rm9ybSAmJiBhY3RpdmVUYWIgPT09IFwicHJhem9zXCIgJiYgPEFkZERlYWRsaW5lRm9ybSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczo0MTI6NTFcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBrZXk9XCJkbC1mb3JtXCIgb25TYXZlPXthZGREZWFkbGluZX0gb25DYW5jZWw9eygpID0+IHNldFNob3dGb3JtKGZhbHNlKX0gLz59XG4gICAgICAgICAgICB7c2hvd0Zvcm0gJiYgYWN0aXZlVGFiID09PSBcImV2ZW50b3NcIiAmJiA8QWRkRXZlbnRGb3JtIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjQxMzo1MlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT1cImV2LWZvcm1cIiBvblNhdmU9e2FkZEV2ZW50fSBvbkNhbmNlbD17KCkgPT4gc2V0U2hvd0Zvcm0oZmFsc2UpfSAvPn1cbiAgICAgICAgICA8L0FuaW1hdGVQcmVzZW5jZT5cblxuICAgICAgICAgIHtpc0VtcHR5ICYmICFzaG93Rm9ybSAmJlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6NDE3OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgcHktMjBcIj5cbiAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gXCJwcmF6b3NcIiA/XG4gICAgICAgICAgICA8Q2FsZW5kYXJDbG9jayBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczo0MTk6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy0xMiBoLTEyIG14LWF1dG8gbWItMyB0ZXh0LW11dGVkLWZvcmVncm91bmQvMjBcIiAvPiA6XG4gICAgICAgICAgICA8Q2FsZW5kYXJSYW5nZSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczo0MjA6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy0xMiBoLTEyIG14LWF1dG8gbWItMyB0ZXh0LW11dGVkLWZvcmVncm91bmQvMjBcIiAvPn1cbiAgICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6NDIxOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1tdXRlZC1mb3JlZ3JvdW5kIHRleHQtc20gZm9udC1tZWRpdW1cIj5cbiAgICAgICAgICAgICAgICB7YWN0aXZlVGFiID09PSBcInByYXpvc1wiID8gXCJTZW0gcHJhem9zXCIgOiBcIlNlbSBldmVudG9zXCJ9XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6NDI0OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtbXV0ZWQtZm9yZWdyb3VuZC81MCB0ZXh0LXhzIG10LTFcIj5Ub2NhIG5vICsgcGFyYSBhZGljaW9uYXI8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSBcInByYXpvc1wiICYmXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgICAge3VwY29taW5nRGVhZGxpbmVzLm1hcCgoaXRlbSwgaSkgPT4gPERlYWRsaW5lQ2FyZCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczo0MzA6NTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBrZXk9e2l0ZW0uaWR9IGl0ZW09e2l0ZW19IG9uRGVsZXRlPXtkZWxldGVEZWFkbGluZX0gaW5kZXg9e2l9IGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtpdGVtPy5pZH0gLz4pfVxuICAgICAgICAgICAgICB7ZXhwaXJlZERlYWRsaW5lcy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjQzMjoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cIm10LTRcIj5cbiAgICAgICAgICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvRGVhZGxpbmVzOjQzMzoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LWJvbGQgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kLzQwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBtYi0yIHB4LTFcIj5FeHBpcmFkb3M8L3A+XG4gICAgICAgICAgICAgICAgICB7ZXhwaXJlZERlYWRsaW5lcy5tYXAoKGl0ZW0sIGkpID0+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6NDM1OjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtpdGVtLmlkfSBjbGFzc05hbWU9XCJvcGFjaXR5LTQwIG1iLTJcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aXRlbT8uaWR9PlxuICAgICAgICAgICAgICAgICAgICAgIDxEZWFkbGluZUNhcmQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6NDM2OjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgaXRlbT17aXRlbX0gb25EZWxldGU9e2RlbGV0ZURlYWRsaW5lfSBpbmRleD17aX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSBcImV2ZW50b3NcIiAmJlxuICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIHt1cGNvbWluZ0V2ZW50cy5tYXAoKGl0ZW0sIGkpID0+IDxFdmVudENhcmQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6NDQ2OjQ3XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtpdGVtLmlkfSBpdGVtPXtpdGVtfSBvbkRlbGV0ZT17ZGVsZXRlRXZlbnR9IGluZGV4PXtpfSBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aXRlbT8uaWR9IC8+KX1cbiAgICAgICAgICAgICAge3Bhc3RFdmVudHMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczo0NDg6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJtdC00XCI+XG4gICAgICAgICAgICAgICAgICA8cCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0RlYWRsaW5lczo0NDk6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1ib2xkIHRleHQtbXV0ZWQtZm9yZWdyb3VuZC80MCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgbWItMiBweC0xXCI+UGFzc2Fkb3M8L3A+XG4gICAgICAgICAgICAgICAgICB7cGFzdEV2ZW50cy5tYXAoKGl0ZW0sIGkpID0+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6NDUxOjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtpdGVtLmlkfSBjbGFzc05hbWU9XCJvcGFjaXR5LTQwIG1iLTJcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aXRlbT8uaWR9PlxuICAgICAgICAgICAgICAgICAgICAgIDxFdmVudENhcmQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9EZWFkbGluZXM6NDUyOjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgaXRlbT17aXRlbX0gb25EZWxldGU9e2RlbGV0ZUV2ZW50fSBpbmRleD17aX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+KTtcblxufSJdLCJmaWxlIjoiL2FwcC9zcmMvcGFnZXMvRGVhZGxpbmVzLmpzeCJ9