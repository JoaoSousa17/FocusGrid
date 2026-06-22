import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/MeetingAI.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/pages/MeetingAI.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=fc940917"; const useState = __vite__cjsImport3_react["useState"]; const useRef = __vite__cjsImport3_react["useRef"]; const useCallback = __vite__cjsImport3_react["useCallback"]; const useEffect = __vite__cjsImport3_react["useEffect"];
import { useNavigate } from "/node_modules/.vite/deps/react-router-dom.js?v=8a08d97a";
import { motion, AnimatePresence } from "/node_modules/.vite/deps/framer-motion.js?v=fc940917";
import { ArrowRight, Mic, MicOff, Loader2, Clock, Brain, X, SquareCheckBig, Sparkles, Upload, FileText, Download, CalendarRange, Link2, Check, ChevronDown } from "/node_modules/.vite/deps/lucide-react.js?v=aefa7968";
import { base44 } from "/src/api/base44Client.js";
import { format } from "/node_modules/.vite/deps/date-fns.js?v=a1580542";
import { pt } from "/node_modules/.vite/deps/date-fns_locale.js?v=45b313c9";
function MindMapNode({ node, depth = 0, "data-collection-item-id": __dataCollectionItemId }) {
  const colors = ["#E87A5A", "#8B5CF6", "#3B82F6", "#10B981", "#F59E0B"];
  const color = colors[depth % colors.length];
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      "data-source-location": "pages/MeetingAI:13:4",
      "data-dynamic-content": "true",
      className: `flex flex-col items-start ${depth > 0 ? "ml-5 border-l-2 pl-3" : ""}`,
      style: { borderColor: depth > 0 ? color + "40" : "transparent" },
      "data-collection-id": "node",
      "data-collection-item-id": __dataCollectionItemId,
      children: [
        /* @__PURE__ */ jsxDEV(
          "div",
          {
            "data-source-location": "pages/MeetingAI:15:6",
            "data-dynamic-content": "true",
            className: "px-3 py-1.5 rounded-xl text-xs font-semibold mb-1.5 text-white shadow-sm",
            style: { backgroundColor: color + (depth === 0 ? "ee" : "99") },
            "data-collection-item-field": "label",
            "data-collection-item-id": node?.id || node?._id,
            children: node.label
          },
          void 0,
          false,
          {
            fileName: "/app/src/pages/MeetingAI.jsx",
            lineNumber: 34,
            columnNumber: 7
          },
          this
        ),
        node.children?.map((child, i) => /* @__PURE__ */ jsxDEV(MindMapNode, { "data-source-location": "pages/MeetingAI:19:40", "data-dynamic-content": "true", node: child, depth: depth + 1 }, i, false, {
          fileName: "/app/src/pages/MeetingAI.jsx",
          lineNumber: 38,
          columnNumber: 41
        }, this))
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/src/pages/MeetingAI.jsx",
      lineNumber: 32,
      columnNumber: 5
    },
    this
  );
}
_c = MindMapNode;
function formatDuration(seconds) {
  if (!seconds) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}min ${s}s` : `${s}s`;
}
function RecordingCard({ rec, events, onDelete }) {
  _s();
  const [expanded, setExpanded] = useState(false);
  const [linking, setLinking] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(rec.event_id || "");
  const linkEvent = async (eventId) => {
    const ev = events.find((e) => e.id === eventId);
    await base44.entities.MeetingRecording.update(rec.id, {
      event_id: eventId,
      event_name: ev?.name || ""
    });
    setLinking(false);
    setSelectedEvent(eventId);
  };
  const linkedEvent = events.find((e) => e.id === (selectedEvent || rec.event_id));
  return /* @__PURE__ */ jsxDEV(
    motion.div,
    {
      "data-source-location": "pages/MeetingAI:49:4",
      "data-dynamic-content": "true",
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      className: "bg-white rounded-2xl border border-border shadow-sm overflow-hidden",
      children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:51:6", "data-dynamic-content": "false", className: "h-0.5 bg-gradient-to-r from-[#E87A5A] to-[#8B5CF6]" }, void 0, false, {
          fileName: "/app/src/pages/MeetingAI.jsx",
          lineNumber: 70,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:52:6", "data-dynamic-content": "true", className: "p-4", "data-collection-item-field": "summary", "data-collection-item-id": rec?.id || rec?._id, children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:53:8", "data-dynamic-content": "true", className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:54:10", "data-dynamic-content": "true", className: "flex-1", children: [
              /* @__PURE__ */ jsxDEV("h3", { "data-source-location": "pages/MeetingAI:55:12", "data-dynamic-content": "true", className: "text-sm font-bold text-foreground leading-tight", "data-collection-item-field": "title", "data-collection-item-id": rec?.id || rec?._id, children: rec.title }, void 0, false, {
                fileName: "/app/src/pages/MeetingAI.jsx",
                lineNumber: 74,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:56:12", "data-dynamic-content": "true", className: "flex flex-wrap gap-1.5 mt-1.5", "data-collection-item-field": "meeting_date", "data-collection-item-id": rec?.id || rec?._id, children: [
                rec.meeting_date && /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/MeetingAI:58:16", "data-dynamic-content": "true", className: "flex items-center gap-1 px-2 py-0.5 rounded-lg bg-secondary text-[11px] text-muted-foreground", children: [
                  /* @__PURE__ */ jsxDEV(Clock, { "data-source-location": "pages/MeetingAI:59:18", "data-dynamic-content": "false", className: "w-3 h-3" }, void 0, false, {
                    fileName: "/app/src/pages/MeetingAI.jsx",
                    lineNumber: 78,
                    columnNumber: 19
                  }, this),
                  format(new Date(rec.meeting_date), "d MMM yyyy", { locale: pt })
                ] }, void 0, true, {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 77,
                  columnNumber: 15
                }, this),
                rec.audio_duration_seconds > 0 && /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/MeetingAI:64:16", "data-dynamic-content": "true", className: "flex items-center gap-1 px-2 py-0.5 rounded-lg bg-secondary text-[11px] text-muted-foreground", children: [
                  /* @__PURE__ */ jsxDEV(Mic, { "data-source-location": "pages/MeetingAI:65:18", "data-dynamic-content": "false", className: "w-3 h-3" }, void 0, false, {
                    fileName: "/app/src/pages/MeetingAI.jsx",
                    lineNumber: 84,
                    columnNumber: 19
                  }, this),
                  " ",
                  formatDuration(rec.audio_duration_seconds)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 83,
                  columnNumber: 15
                }, this),
                linkedEvent && /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/MeetingAI:69:16", "data-dynamic-content": "true", className: "flex items-center gap-1 px-2 py-0.5 rounded-lg bg-purple-50 text-[11px] text-purple-600 font-medium", "data-collection-item-field": "name", "data-collection-item-id": linkedEvent?.id || linkedEvent?._id, children: [
                  /* @__PURE__ */ jsxDEV(CalendarRange, { "data-source-location": "pages/MeetingAI:70:18", "data-dynamic-content": "false", className: "w-3 h-3" }, void 0, false, {
                    fileName: "/app/src/pages/MeetingAI.jsx",
                    lineNumber: 89,
                    columnNumber: 19
                  }, this),
                  " ",
                  linkedEvent.name
                ] }, void 0, true, {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 88,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/MeetingAI.jsx",
                lineNumber: 75,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/MeetingAI.jsx",
              lineNumber: 73,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:75:10", "data-dynamic-content": "true", className: "flex items-center gap-1.5 flex-shrink-0", "data-collection-item-field": "pdf_url", "data-collection-item-id": rec?.id || rec?._id, children: [
              rec.pdf_url && /* @__PURE__ */ jsxDEV(
                "a",
                {
                  "data-source-location": "pages/MeetingAI:77:14",
                  "data-dynamic-content": "true",
                  href: rec.pdf_url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "w-8 h-8 rounded-xl bg-[#E87A5A]/10 flex items-center justify-center text-[#E87A5A] hover:bg-[#E87A5A]/20 transition-all",
                  title: "Download PDF",
                  children: /* @__PURE__ */ jsxDEV(Download, { "data-source-location": "pages/MeetingAI:80:16", "data-dynamic-content": "false", className: "w-3.5 h-3.5" }, void 0, false, {
                    fileName: "/app/src/pages/MeetingAI.jsx",
                    lineNumber: 99,
                    columnNumber: 17
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 96,
                  columnNumber: 13
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "pages/MeetingAI:83:12",
                  "data-dynamic-content": "true",
                  onClick: () => setLinking(!linking),
                  className: `w-8 h-8 rounded-xl flex items-center justify-center transition-all ${linking ? "bg-purple-100 text-purple-600" : "bg-secondary text-muted-foreground hover:text-purple-500"}`,
                  title: "Associar evento",
                  children: /* @__PURE__ */ jsxDEV(Link2, { "data-source-location": "pages/MeetingAI:87:14", "data-dynamic-content": "false", className: "w-3.5 h-3.5" }, void 0, false, {
                    fileName: "/app/src/pages/MeetingAI.jsx",
                    lineNumber: 106,
                    columnNumber: 15
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 102,
                  columnNumber: 13
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "pages/MeetingAI:89:12",
                  "data-dynamic-content": "true",
                  onClick: () => setExpanded(!expanded),
                  className: "w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-all",
                  children: /* @__PURE__ */ jsxDEV(ChevronDown, { "data-source-location": "pages/MeetingAI:91:14", "data-dynamic-content": "true", className: `w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}` }, void 0, false, {
                    fileName: "/app/src/pages/MeetingAI.jsx",
                    lineNumber: 110,
                    columnNumber: 15
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 108,
                  columnNumber: 13
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "pages/MeetingAI:93:12",
                  "data-dynamic-content": "true",
                  onClick: () => onDelete(rec.id),
                  className: "w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-rose-500 hover:bg-rose-50 transition-all",
                  children: /* @__PURE__ */ jsxDEV(X, { "data-source-location": "pages/MeetingAI:95:14", "data-dynamic-content": "false", className: "w-3.5 h-3.5" }, void 0, false, {
                    fileName: "/app/src/pages/MeetingAI.jsx",
                    lineNumber: 114,
                    columnNumber: 15
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 112,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/src/pages/MeetingAI.jsx",
              lineNumber: 94,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/MeetingAI.jsx",
            lineNumber: 72,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV(AnimatePresence, { "data-source-location": "pages/MeetingAI:101:8", "data-dynamic-content": "true", children: linking && /* @__PURE__ */ jsxDEV(
            motion.div,
            {
              "data-source-location": "pages/MeetingAI:103:12",
              "data-dynamic-content": "true",
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              exit: { opacity: 0, height: 0 },
              className: "mt-3 overflow-hidden",
              children: [
                /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/MeetingAI:105:14", "data-dynamic-content": "false", className: "text-[11px] text-muted-foreground mb-2 font-medium", children: "Associar a evento:" }, void 0, false, {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 124,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:106:14", "data-dynamic-content": "true", className: "flex flex-wrap gap-1.5", "data-collection-id": "events", children: [
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      "data-source-location": "pages/MeetingAI:107:16",
                      "data-dynamic-content": "true",
                      onClick: () => linkEvent(""),
                      className: `px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${!selectedEvent ? "bg-secondary text-foreground" : "bg-secondary/50 text-muted-foreground hover:bg-secondary"}`,
                      children: "Nenhum"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/src/pages/MeetingAI.jsx",
                      lineNumber: 126,
                      columnNumber: 17
                    },
                    this
                  ),
                  events.map(
                    (ev) => /* @__PURE__ */ jsxDEV(
                      "button",
                      {
                        "data-source-location": "pages/MeetingAI:114:18",
                        "data-dynamic-content": "true",
                        onClick: () => linkEvent(ev.id),
                        className: `px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${selectedEvent === ev.id ? "bg-purple-100 text-purple-700" : "bg-secondary/50 text-muted-foreground hover:bg-secondary"}`,
                        "data-collection-item-id": ev?.id,
                        "data-collection-item-field": "name",
                        children: ev.name
                      },
                      ev.id,
                      false,
                      {
                        fileName: "/app/src/pages/MeetingAI.jsx",
                        lineNumber: 133,
                        columnNumber: 15
                      },
                      this
                    )
                  )
                ] }, void 0, true, {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 125,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/src/pages/MeetingAI.jsx",
              lineNumber: 122,
              columnNumber: 11
            },
            this
          ) }, void 0, false, {
            fileName: "/app/src/pages/MeetingAI.jsx",
            lineNumber: 120,
            columnNumber: 9
          }, this),
          rec.summary && /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/MeetingAI:128:10", "data-dynamic-content": "true", className: "text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-2", "data-collection-item-field": "summary", "data-collection-item-id": rec?.id || rec?._id, children: rec.summary }, void 0, false, {
            fileName: "/app/src/pages/MeetingAI.jsx",
            lineNumber: 147,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV(AnimatePresence, { "data-source-location": "pages/MeetingAI:132:8", "data-dynamic-content": "true", children: expanded && /* @__PURE__ */ jsxDEV(
            motion.div,
            {
              "data-source-location": "pages/MeetingAI:134:12",
              "data-dynamic-content": "true",
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              exit: { opacity: 0, height: 0 },
              className: "mt-3 overflow-hidden space-y-2",
              "data-collection-item-field": "transcript",
              "data-collection-item-id": rec?.id || rec?._id,
              children: [
                (() => {
                  let actionItems = [];
                  try {
                    actionItems = JSON.parse(rec.action_items_json || "[]");
                  } catch {
                  }
                  return actionItems.length > 0 && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:140:18", "data-dynamic-content": "true", className: "bg-secondary/50 rounded-xl p-3", children: [
                    /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/MeetingAI:141:20", "data-dynamic-content": "false", className: "text-[10px] font-bold uppercase text-muted-foreground/60 mb-2", children: "Ações" }, void 0, false, {
                      fileName: "/app/src/pages/MeetingAI.jsx",
                      lineNumber: 160,
                      columnNumber: 21
                    }, this),
                    actionItems.map(
                      (a, i) => /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:143:22", "data-dynamic-content": "true", className: "flex items-start gap-2 text-xs text-foreground mb-1", "data-arr-index": i, "data-arr-variable-name": "actionItems", children: [
                        /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/MeetingAI:144:24", "data-dynamic-content": "true", className: "w-4 h-4 rounded bg-[#E87A5A]/10 text-[#E87A5A] flex items-center justify-center text-[9px] font-black flex-shrink-0", "data-arr-index": i, "data-arr-variable-name": "actionItems", children: i + 1 }, void 0, false, {
                          fileName: "/app/src/pages/MeetingAI.jsx",
                          lineNumber: 163,
                          columnNumber: 25
                        }, this),
                        a
                      ] }, i, true, {
                        fileName: "/app/src/pages/MeetingAI.jsx",
                        lineNumber: 162,
                        columnNumber: 17
                      }, this)
                    )
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/MeetingAI.jsx",
                    lineNumber: 159,
                    columnNumber: 15
                  }, this);
                })(),
                rec.transcript && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:152:16", "data-dynamic-content": "true", className: "bg-secondary/50 rounded-xl p-3", children: [
                  /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/MeetingAI:153:18", "data-dynamic-content": "false", className: "text-[10px] font-bold uppercase text-muted-foreground/60 mb-1", children: "Transcrição" }, void 0, false, {
                    fileName: "/app/src/pages/MeetingAI.jsx",
                    lineNumber: 172,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/MeetingAI:154:18", "data-dynamic-content": "true", className: "text-xs text-muted-foreground leading-relaxed max-h-28 overflow-y-auto", "data-collection-item-field": "transcript", "data-collection-item-id": rec?.id || rec?._id, children: rec.transcript }, void 0, false, {
                    fileName: "/app/src/pages/MeetingAI.jsx",
                    lineNumber: 173,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 171,
                  columnNumber: 13
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/src/pages/MeetingAI.jsx",
              lineNumber: 153,
              columnNumber: 11
            },
            this
          ) }, void 0, false, {
            fileName: "/app/src/pages/MeetingAI.jsx",
            lineNumber: 151,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/MeetingAI.jsx",
          lineNumber: 71,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/src/pages/MeetingAI.jsx",
      lineNumber: 68,
      columnNumber: 5
    },
    this
  );
}
_s(RecordingCard, "PSq3naXe2o0hYpKYTFiPfqJyuj4=");
_c2 = RecordingCard;
export default function MeetingAI() {
  _s2();
  const navigate = useNavigate();
  const [recording, setRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [recordings, setRecordings] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeSection, setActiveSection] = useState("record");
  const [savingTitle, setSavingTitle] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [lastDuration, setLastDuration] = useState(0);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const timerRef = useRef(null);
  const touchStart = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const [dragStyle, setDragStyle] = useState({});
  const refreshRecordings = () => {
    base44.entities.MeetingRecording.list("-created_date", 50).then(setRecordings).catch(() => {
    });
  };
  useEffect(() => {
    refreshRecordings();
    Promise.all(
      [
        base44.entities.Event.list("-start_datetime", 100),
        base44.entities.Deadline.list("-deadline", 100)
      ]
    ).then(([evts, dls]) => {
      setEvents(
        [
          ...evts.map((e) => ({ ...e, _type: "event" })),
          ...dls.map((d) => ({ ...d, _type: "deadline", start_datetime: d.deadline }))
        ]
      );
    }).catch(() => {
    });
  }, []);
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    chunks.current = [];
    mediaRecorder.current.ondataavailable = (e) => chunks.current.push(e.data);
    mediaRecorder.current.start();
    setRecording(true);
    setElapsed(0);
    timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1e3);
  };
  const stopRecording = () => {
    clearInterval(timerRef.current);
    setLastDuration(elapsed);
    return new Promise((resolve) => {
      mediaRecorder.current.onstop = () => resolve(new Blob(chunks.current, { type: "audio/webm" }));
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach((t) => t.stop());
      setRecording(false);
    });
  };
  const processAudio = async (audioBlob, durationSecs) => {
    setProcessing(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file: audioBlob });
    const transcript = await base44.integrations.Core.TranscribeAudio({ audio_url: file_url });
    const analysis = await base44.integrations.Core.InvokeLLM({
      prompt: `Analisa esta transcrição de reunião/brainstorm e extrai:
1. action_items: lista de tarefas/ações concretas mencionadas (máx 8)
2. deadlines: datas ou prazos mencionados (máx 5)
3. mind_map: mapa mental hierárquico dos temas principais
4. summary: resumo em 2-3 frases
5. title: título curto e descritivo para esta reunião (máx 6 palavras)

Transcrição: """${transcript}"""

Responde em português de Portugal.`,
      response_json_schema: {
        type: "object",
        properties: {
          title: { type: "string" },
          summary: { type: "string" },
          action_items: { type: "array", items: { type: "string" } },
          deadlines: { type: "array", items: { type: "string" } },
          mind_map: {
            type: "object",
            properties: {
              label: { type: "string" },
              children: { type: "array", items: {
                type: "object",
                properties: {
                  label: { type: "string" },
                  children: { type: "array", items: { type: "object", properties: { label: { type: "string" } } } }
                }
              } }
            }
          }
        }
      }
    });
    setResult({ ...analysis, transcript, audio_duration_seconds: durationSecs || lastDuration });
    setSavingTitle(analysis.title || "Nova Reunião");
    setProcessing(false);
  };
  const handleToggleRecord = async () => {
    if (recording) {
      const blob = await stopRecording();
      await processAudio(blob, elapsed);
    } else {
      await startRecording();
    }
  };
  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProcessing(true);
    await processAudio(file, 0);
  };
  const generateAndSavePdf = async () => {
    if (!result) return;
    const content = `REUNIÃO IA - ${savingTitle}
Data: ${(/* @__PURE__ */ new Date()).toLocaleDateString("pt-PT")}
Duração: ${formatDuration(result.audio_duration_seconds)}

═══════════════════════════════
RESUMO
═══════════════════════════════
${result.summary}

═══════════════════════════════
AÇÕES A TOMAR
═══════════════════════════════
${(result.action_items || []).map((a, i) => `${i + 1}. ${a}`).join("\n")}

═══════════════════════════════
PRAZOS MENCIONADOS
═══════════════════════════════
${(result.deadlines || []).join("\n") || "Nenhum"}

═══════════════════════════════
TRANSCRIÇÃO COMPLETA
═══════════════════════════════
${result.transcript}
`;
    let pdfUrl = null;
    try {
      const { jsPDF } = await import("/node_modules/.vite/deps/jspdf.js?v=954d0f89");
      const doc = new jsPDF();
      const lines = doc.splitTextToSize(content, 180);
      let y = 15;
      doc.setFontSize(10);
      lines.forEach((line) => {
        if (y > 280) {
          doc.addPage();
          y = 15;
        }
        doc.text(line, 15, y);
        y += 6;
      });
      const blob = doc.output("blob");
      const { file_url } = await base44.integrations.Core.UploadFile({ file: blob });
      pdfUrl = file_url;
    } catch {
    }
    await base44.entities.MeetingRecording.create({
      title: savingTitle,
      summary: result.summary,
      transcript: result.transcript,
      action_items_json: JSON.stringify(result.action_items || []),
      deadlines_json: JSON.stringify(result.deadlines || []),
      mind_map_json: JSON.stringify(result.mind_map || {}),
      pdf_url: pdfUrl,
      audio_duration_seconds: result.audio_duration_seconds || 0,
      meeting_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    });
    setResult(null);
    setShowSaveModal(false);
    refreshRecordings();
    setActiveSection("recordings");
  };
  const deleteRecording = async (id) => {
    await base44.entities.MeetingRecording.delete(id).catch(() => {
    });
    refreshRecordings();
  };
  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
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
    if (Math.abs(dx) > 60 && dx > 0) navigate("/coming-soon");
  }, [navigate]);
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      "data-source-location": "pages/MeetingAI:370:4",
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
      children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:378:6", "data-dynamic-content": "true", style: dragStyle, className: "flex-1 flex flex-col", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:380:8", "data-dynamic-content": "true", className: "px-5 pt-12 pb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:381:10", "data-dynamic-content": "true", className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "pages/MeetingAI:382:12",
                "data-dynamic-content": "true",
                onClick: () => navigate("/coming-soon"),
                className: "w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[#E87A5A]/30 shadow-sm transition-all",
                children: /* @__PURE__ */ jsxDEV(ArrowRight, { "data-source-location": "pages/MeetingAI:384:14", "data-dynamic-content": "false", className: "w-5 h-5" }, void 0, false, {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 403,
                  columnNumber: 15
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/src/pages/MeetingAI.jsx",
                lineNumber: 401,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:386:12", "data-dynamic-content": "false", children: [
              /* @__PURE__ */ jsxDEV("h1", { "data-source-location": "pages/MeetingAI:387:14", "data-dynamic-content": "false", className: "text-xl font-bold text-foreground", children: "Reuniões IA" }, void 0, false, {
                fileName: "/app/src/pages/MeetingAI.jsx",
                lineNumber: 406,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/MeetingAI:388:14", "data-dynamic-content": "false", className: "text-xs text-muted-foreground", children: "Grava e obtém resumo automático" }, void 0, false, {
                fileName: "/app/src/pages/MeetingAI.jsx",
                lineNumber: 407,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/MeetingAI.jsx",
              lineNumber: 405,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/MeetingAI.jsx",
            lineNumber: 400,
            columnNumber: 11
          }, this),
          activeSection === "record" && /* @__PURE__ */ jsxDEV("label", { "data-source-location": "pages/MeetingAI:392:12", "data-dynamic-content": "true", className: "w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-[#E87A5A] hover:border-[#E87A5A]/30 shadow-sm transition-all cursor-pointer", children: [
            /* @__PURE__ */ jsxDEV(Upload, { "data-source-location": "pages/MeetingAI:393:14", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/src/pages/MeetingAI.jsx",
              lineNumber: 412,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("input", { "data-source-location": "pages/MeetingAI:394:14", "data-dynamic-content": "true", type: "file", accept: "audio/*", className: "hidden", onChange: handleUpload }, void 0, false, {
              fileName: "/app/src/pages/MeetingAI.jsx",
              lineNumber: 413,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/MeetingAI.jsx",
            lineNumber: 411,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/MeetingAI.jsx",
          lineNumber: 399,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:400:8", "data-dynamic-content": "true", className: "px-5 mb-4", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:401:10", "data-dynamic-content": "true", className: "flex bg-white rounded-2xl p-1.5 border border-border shadow-sm gap-1", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              "data-source-location": "pages/MeetingAI:402:12",
              "data-dynamic-content": "true",
              onClick: () => setActiveSection("record"),
              className: `flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeSection === "record" ? "bg-[#E87A5A] text-white shadow-md" : "text-muted-foreground hover:text-foreground"}`,
              children: [
                /* @__PURE__ */ jsxDEV(Mic, { "data-source-location": "pages/MeetingAI:406:14", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 425,
                  columnNumber: 15
                }, this),
                " Gravar"
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/src/pages/MeetingAI.jsx",
              lineNumber: 421,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              "data-source-location": "pages/MeetingAI:408:12",
              "data-dynamic-content": "true",
              onClick: () => setActiveSection("recordings"),
              className: `flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeSection === "recordings" ? "bg-[#E87A5A] text-white shadow-md" : "text-muted-foreground hover:text-foreground"}`,
              children: [
                /* @__PURE__ */ jsxDEV(FileText, { "data-source-location": "pages/MeetingAI:412:14", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 431,
                  columnNumber: 15
                }, this),
                " Gravações",
                recordings.length > 0 && /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/MeetingAI:414:16", "data-dynamic-content": "true", className: "bg-white/20 rounded-full px-1.5 text-xs", children: recordings.length }, void 0, false, {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 433,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/src/pages/MeetingAI.jsx",
              lineNumber: 427,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/src/pages/MeetingAI.jsx",
          lineNumber: 420,
          columnNumber: 11
        }, this) }, void 0, false, {
          fileName: "/app/src/pages/MeetingAI.jsx",
          lineNumber: 419,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:421:8", "data-dynamic-content": "true", className: "flex-1 px-5 pb-10 overflow-auto", children: [
          activeSection === "record" && /* @__PURE__ */ jsxDEV(Fragment, { children: [
            !result && !processing && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:425:16", "data-dynamic-content": "true", className: "flex flex-col items-center py-14 gap-6", children: [
              /* @__PURE__ */ jsxDEV(
                motion.button,
                {
                  "data-source-location": "pages/MeetingAI:426:18",
                  "data-dynamic-content": "true",
                  onClick: handleToggleRecord,
                  whileTap: { scale: 0.95 },
                  animate: recording ? { scale: [1, 1.06, 1] } : {},
                  transition: recording ? { repeat: Infinity, duration: 1.2 } : {},
                  className: `w-28 h-28 rounded-full flex items-center justify-center shadow-xl transition-all ${recording ? "bg-rose-500 shadow-rose-500/30" : "bg-[#E87A5A] shadow-[#E87A5A]/30 hover:bg-[#D4694A]"}`,
                  children: recording ? /* @__PURE__ */ jsxDEV(MicOff, { "data-source-location": "pages/MeetingAI:434:33", "data-dynamic-content": "false", className: "w-12 h-12 text-white" }, void 0, false, {
                    fileName: "/app/src/pages/MeetingAI.jsx",
                    lineNumber: 453,
                    columnNumber: 34
                  }, this) : /* @__PURE__ */ jsxDEV(Mic, { "data-source-location": "pages/MeetingAI:434:79", "data-dynamic-content": "false", className: "w-12 h-12 text-white" }, void 0, false, {
                    fileName: "/app/src/pages/MeetingAI.jsx",
                    lineNumber: 453,
                    columnNumber: 155
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 445,
                  columnNumber: 19
                },
                this
              ),
              recording ? /* @__PURE__ */ jsxDEV(motion.div, { "data-source-location": "pages/MeetingAI:438:20", "data-dynamic-content": "true", initial: { opacity: 0 }, animate: { opacity: 1 }, className: "flex flex-col items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:439:22", "data-dynamic-content": "true", className: "flex gap-1 items-end h-8", children: [...Array(5)].map(
                  (_, i) => /* @__PURE__ */ jsxDEV(
                    motion.div,
                    {
                      "data-source-location": "pages/MeetingAI:441:26",
                      "data-dynamic-content": "true",
                      animate: { scaleY: [0.3, 1, 0.3] },
                      transition: { repeat: Infinity, duration: 0.9, delay: i * 0.15 },
                      className: "w-1.5 rounded-full bg-[#E87A5A] origin-bottom",
                      style: { height: 24 },
                      "data-arr-index": i
                    },
                    i,
                    false,
                    {
                      fileName: "/app/src/pages/MeetingAI.jsx",
                      lineNumber: 460,
                      columnNumber: 19
                    },
                    this
                  )
                ) }, void 0, false, {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 458,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/MeetingAI:448:22", "data-dynamic-content": "true", className: "text-foreground text-sm font-mono font-bold", children: formatTime(elapsed) }, void 0, false, {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 467,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/MeetingAI:449:22", "data-dynamic-content": "false", className: "text-xs text-muted-foreground", children: "Toca para parar e analisar" }, void 0, false, {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 468,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/MeetingAI.jsx",
                lineNumber: 457,
                columnNumber: 15
              }, this) : /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:452:20", "data-dynamic-content": "false", className: "text-center", children: [
                /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/MeetingAI:453:22", "data-dynamic-content": "false", className: "text-sm font-semibold text-foreground", children: "Toca para gravar" }, void 0, false, {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 472,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/MeetingAI:454:22", "data-dynamic-content": "false", className: "text-xs text-muted-foreground mt-1", children: "ou usa o 📎 para carregar ficheiro" }, void 0, false, {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 473,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/MeetingAI.jsx",
                lineNumber: 471,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/MeetingAI.jsx",
              lineNumber: 444,
              columnNumber: 13
            }, this),
            processing && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:461:16", "data-dynamic-content": "false", className: "flex flex-col items-center py-16 gap-4", children: [
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:462:18", "data-dynamic-content": "false", className: "w-20 h-20 rounded-[28px] bg-[#E87A5A]/10 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV(Loader2, { "data-source-location": "pages/MeetingAI:463:20", "data-dynamic-content": "false", className: "w-10 h-10 text-[#E87A5A] animate-spin" }, void 0, false, {
                fileName: "/app/src/pages/MeetingAI.jsx",
                lineNumber: 482,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "/app/src/pages/MeetingAI.jsx",
                lineNumber: 481,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/MeetingAI:465:18", "data-dynamic-content": "false", className: "text-sm font-semibold text-foreground", children: "A analisar com IA..." }, void 0, false, {
                fileName: "/app/src/pages/MeetingAI.jsx",
                lineNumber: 484,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/MeetingAI:466:18", "data-dynamic-content": "false", className: "text-xs text-muted-foreground", children: "A extrair ações, prazos e mapa mental" }, void 0, false, {
                fileName: "/app/src/pages/MeetingAI.jsx",
                lineNumber: 485,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/MeetingAI.jsx",
              lineNumber: 480,
              columnNumber: 13
            }, this),
            result && /* @__PURE__ */ jsxDEV(motion.div, { "data-source-location": "pages/MeetingAI:471:16", "data-dynamic-content": "true", initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: "space-y-3 pt-2", "data-collection-item-field": "mind_map", "data-collection-item-id": result?.id || result?._id, children: [
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:472:18", "data-dynamic-content": "true", className: "flex items-center justify-between mb-1", children: [
                /* @__PURE__ */ jsxDEV("h2", { "data-source-location": "pages/MeetingAI:473:20", "data-dynamic-content": "false", className: "text-base font-black text-foreground flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxDEV(Sparkles, { "data-source-location": "pages/MeetingAI:474:22", "data-dynamic-content": "false", className: "w-4 h-4 text-[#E87A5A]" }, void 0, false, {
                    fileName: "/app/src/pages/MeetingAI.jsx",
                    lineNumber: 493,
                    columnNumber: 23
                  }, this),
                  " Análise Completa"
                ] }, void 0, true, {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 492,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    "data-source-location": "pages/MeetingAI:476:20",
                    "data-dynamic-content": "true",
                    onClick: () => setResult(null),
                    className: "w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-rose-500 transition-all",
                    children: /* @__PURE__ */ jsxDEV(X, { "data-source-location": "pages/MeetingAI:478:22", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                      fileName: "/app/src/pages/MeetingAI.jsx",
                      lineNumber: 497,
                      columnNumber: 23
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/src/pages/MeetingAI.jsx",
                    lineNumber: 495,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/src/pages/MeetingAI.jsx",
                lineNumber: 491,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:482:18", "data-dynamic-content": "true", className: "bg-white rounded-2xl p-4 border border-border shadow-sm", children: [
                /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/MeetingAI:483:20", "data-dynamic-content": "false", className: "text-[11px] font-bold text-[#E87A5A] uppercase tracking-wide mb-2", children: "Resumo" }, void 0, false, {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 502,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/MeetingAI:484:20", "data-dynamic-content": "true", className: "text-sm text-foreground leading-relaxed", "data-collection-item-field": "summary", "data-collection-item-id": result?.id || result?._id, children: result.summary }, void 0, false, {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 503,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/MeetingAI.jsx",
                lineNumber: 501,
                columnNumber: 19
              }, this),
              result.action_items?.length > 0 && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:488:20", "data-dynamic-content": "true", className: "bg-white rounded-2xl p-4 border border-border shadow-sm", children: [
                /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/MeetingAI:489:22", "data-dynamic-content": "false", className: "text-[11px] font-bold text-foreground uppercase tracking-wide mb-3 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxDEV(SquareCheckBig, { "data-source-location": "pages/MeetingAI:490:24", "data-dynamic-content": "false", className: "w-3.5 h-3.5 text-emerald-500" }, void 0, false, {
                    fileName: "/app/src/pages/MeetingAI.jsx",
                    lineNumber: 509,
                    columnNumber: 25
                  }, this),
                  " Ações"
                ] }, void 0, true, {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 508,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:492:22", "data-dynamic-content": "true", className: "space-y-2", "data-collection-item-field": "action_items", "data-collection-item-id": result?.id || result?._id, children: result.action_items.map(
                  (item, i) => /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:494:26", "data-dynamic-content": "true", className: "flex items-start gap-2.5 text-sm", children: [
                    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:495:28", "data-dynamic-content": "true", className: "w-5 h-5 rounded-lg bg-[#E87A5A]/10 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/MeetingAI:496:30", "data-dynamic-content": "true", className: "text-[10px] font-black text-[#E87A5A]", children: i + 1 }, void 0, false, {
                      fileName: "/app/src/pages/MeetingAI.jsx",
                      lineNumber: 515,
                      columnNumber: 31
                    }, this) }, void 0, false, {
                      fileName: "/app/src/pages/MeetingAI.jsx",
                      lineNumber: 514,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/MeetingAI:498:28", "data-dynamic-content": "true", className: "text-foreground leading-snug", "data-collection-item-field": "item", children: item }, void 0, false, {
                      fileName: "/app/src/pages/MeetingAI.jsx",
                      lineNumber: 517,
                      columnNumber: 29
                    }, this)
                  ] }, i, true, {
                    fileName: "/app/src/pages/MeetingAI.jsx",
                    lineNumber: 513,
                    columnNumber: 19
                  }, this)
                ) }, void 0, false, {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 511,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/MeetingAI.jsx",
                lineNumber: 507,
                columnNumber: 15
              }, this),
              result.deadlines?.length > 0 && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:506:20", "data-dynamic-content": "true", className: "bg-white rounded-2xl p-4 border border-border shadow-sm", children: [
                /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/MeetingAI:507:22", "data-dynamic-content": "false", className: "text-[11px] font-bold text-foreground uppercase tracking-wide mb-3 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxDEV(Clock, { "data-source-location": "pages/MeetingAI:508:24", "data-dynamic-content": "false", className: "w-3.5 h-3.5 text-amber-500" }, void 0, false, {
                    fileName: "/app/src/pages/MeetingAI.jsx",
                    lineNumber: 527,
                    columnNumber: 25
                  }, this),
                  " Prazos Mencionados"
                ] }, void 0, true, {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 526,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:510:22", "data-dynamic-content": "true", className: "flex flex-wrap gap-2", "data-collection-item-field": "deadlines", "data-collection-item-id": result?.id || result?._id, children: result.deadlines.map(
                  (d, i) => /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/MeetingAI:512:26", "data-dynamic-content": "true", className: "px-3 py-1.5 rounded-2xl bg-secondary text-xs font-medium text-foreground border border-border", "data-collection-item-field": "d", children: d }, i, false, {
                    fileName: "/app/src/pages/MeetingAI.jsx",
                    lineNumber: 531,
                    columnNumber: 19
                  }, this)
                ) }, void 0, false, {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 529,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/MeetingAI.jsx",
                lineNumber: 525,
                columnNumber: 15
              }, this),
              result.mind_map && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:519:20", "data-dynamic-content": "true", className: "bg-white rounded-2xl p-4 border border-border shadow-sm", children: [
                /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/MeetingAI:520:22", "data-dynamic-content": "false", className: "text-[11px] font-bold text-foreground uppercase tracking-wide mb-3 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxDEV(Brain, { "data-source-location": "pages/MeetingAI:521:24", "data-dynamic-content": "false", className: "w-3.5 h-3.5 text-[#E87A5A]" }, void 0, false, {
                    fileName: "/app/src/pages/MeetingAI.jsx",
                    lineNumber: 540,
                    columnNumber: 25
                  }, this),
                  " Mapa Mental"
                ] }, void 0, true, {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 539,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:523:22", "data-dynamic-content": "true", className: "overflow-auto", children: /* @__PURE__ */ jsxDEV(MindMapNode, { "data-source-location": "pages/MeetingAI:524:24", "data-dynamic-content": "true", node: result.mind_map }, void 0, false, {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 543,
                  columnNumber: 25
                }, this) }, void 0, false, {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 542,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/MeetingAI.jsx",
                lineNumber: 538,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:530:18", "data-dynamic-content": "true", className: "bg-white rounded-2xl p-4 border border-[#E87A5A]/20 shadow-sm", children: [
                /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/MeetingAI:531:20", "data-dynamic-content": "false", className: "text-[11px] font-bold text-[#E87A5A] uppercase tracking-wide mb-3", children: "Guardar Gravação" }, void 0, false, {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 550,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    "data-source-location": "pages/MeetingAI:532:20",
                    "data-dynamic-content": "true",
                    value: savingTitle,
                    onChange: (e) => setSavingTitle(e.target.value),
                    placeholder: "Título da reunião...",
                    className: "w-full px-3 py-2.5 rounded-xl bg-secondary/60 text-sm font-medium outline-none focus:bg-white transition-all mb-3"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/src/pages/MeetingAI.jsx",
                    lineNumber: 551,
                    columnNumber: 21
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    "data-source-location": "pages/MeetingAI:535:20",
                    "data-dynamic-content": "true",
                    onClick: generateAndSavePdf,
                    className: "w-full py-3 rounded-2xl bg-[#E87A5A] text-white text-sm font-bold hover:bg-[#D4694A] shadow-lg shadow-[#E87A5A]/25 transition-all flex items-center justify-center gap-2",
                    children: [
                      /* @__PURE__ */ jsxDEV(FileText, { "data-source-location": "pages/MeetingAI:537:22", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                        fileName: "/app/src/pages/MeetingAI.jsx",
                        lineNumber: 556,
                        columnNumber: 23
                      }, this),
                      " Guardar + Gerar PDF"
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/src/pages/MeetingAI.jsx",
                    lineNumber: 554,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/src/pages/MeetingAI.jsx",
                lineNumber: 549,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "pages/MeetingAI:541:18",
                  "data-dynamic-content": "true",
                  onClick: () => setResult(null),
                  className: "w-full py-3 rounded-2xl bg-secondary text-muted-foreground text-sm font-medium hover:bg-border transition-all flex items-center justify-center gap-2",
                  children: [
                    /* @__PURE__ */ jsxDEV(X, { "data-source-location": "pages/MeetingAI:543:20", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                      fileName: "/app/src/pages/MeetingAI.jsx",
                      lineNumber: 562,
                      columnNumber: 21
                    }, this),
                    " Descartar"
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/src/pages/MeetingAI.jsx",
                  lineNumber: 560,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/src/pages/MeetingAI.jsx",
              lineNumber: 490,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/MeetingAI.jsx",
            lineNumber: 442,
            columnNumber: 11
          }, this),
          activeSection === "recordings" && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:551:12", "data-dynamic-content": "true", className: "space-y-3", "data-collection-id": "MeetingRecording", children: recordings.length === 0 ? /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/MeetingAI:553:16", "data-dynamic-content": "false", className: "text-center py-20", children: [
            /* @__PURE__ */ jsxDEV(FileText, { "data-source-location": "pages/MeetingAI:554:18", "data-dynamic-content": "false", className: "w-12 h-12 mx-auto mb-3 text-muted-foreground/20" }, void 0, false, {
              fileName: "/app/src/pages/MeetingAI.jsx",
              lineNumber: 573,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/MeetingAI:555:18", "data-dynamic-content": "false", className: "text-muted-foreground text-sm font-medium", children: "Sem gravações guardadas" }, void 0, false, {
              fileName: "/app/src/pages/MeetingAI.jsx",
              lineNumber: 574,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/MeetingAI:556:18", "data-dynamic-content": "false", className: "text-muted-foreground/50 text-xs mt-1", children: "Grava uma reunião para começar" }, void 0, false, {
              fileName: "/app/src/pages/MeetingAI.jsx",
              lineNumber: 575,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/MeetingAI.jsx",
            lineNumber: 572,
            columnNumber: 13
          }, this) : recordings.map(
            (rec) => /* @__PURE__ */ jsxDEV(RecordingCard, { "data-source-location": "pages/MeetingAI:560:18", "data-dynamic-content": "true", rec, events, onDelete: deleteRecording, "data-collection-item-id": rec?.id }, rec.id, false, {
              fileName: "/app/src/pages/MeetingAI.jsx",
              lineNumber: 579,
              columnNumber: 13
            }, this)
          ) }, void 0, false, {
            fileName: "/app/src/pages/MeetingAI.jsx",
            lineNumber: 570,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/MeetingAI.jsx",
          lineNumber: 440,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/pages/MeetingAI.jsx",
        lineNumber: 397,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/app/src/pages/MeetingAI.jsx",
      lineNumber: 389,
      columnNumber: 5
    },
    this
  );
}
_s2(MeetingAI, "Jyz4tzD9n54GzWUkr6dXD8wdzQw=", false, function() {
  return [useNavigate];
});
_c3 = MeetingAI;
var _c, _c2, _c3;
$RefreshReg$(_c, "MindMapNode");
$RefreshReg$(_c2, "RecordingCard");
$RefreshReg$(_c3, "MeetingAI");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/pages/MeetingAI.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/pages/MeetingAI.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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LElBcFp1QkQsV0FBUztBQUFBLFVBQ2RwRixXQUFXO0FBQUE7QUFBQSxNQUROb0Y7QUFBUyxJQUFBOUMsSUFBQXdMLEtBQUFDO0FBQUEsYUFBQXpMLElBQUE7QUFBQSxhQUFBd0wsS0FBQTtBQUFBLGFBQUFDLEtBQUEiLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZVJlZiIsInVzZUNhbGxiYWNrIiwidXNlRWZmZWN0IiwidXNlTmF2aWdhdGUiLCJtb3Rpb24iLCJBbmltYXRlUHJlc2VuY2UiLCJBcnJvd1JpZ2h0IiwiTWljIiwiTWljT2ZmIiwiTG9hZGVyMiIsIkNsb2NrIiwiQnJhaW4iLCJYIiwiU3F1YXJlQ2hlY2tCaWciLCJTcGFya2xlcyIsIlVwbG9hZCIsIkZpbGVUZXh0IiwiRG93bmxvYWQiLCJDYWxlbmRhclJhbmdlIiwiTGluazIiLCJDaGVjayIsIkNoZXZyb25Eb3duIiwiYmFzZTQ0IiwiZm9ybWF0IiwicHQiLCJNaW5kTWFwTm9kZSIsIm5vZGUiLCJkZXB0aCIsIl9fZGF0YUNvbGxlY3Rpb25JdGVtSWQiLCJjb2xvcnMiLCJjb2xvciIsImxlbmd0aCIsImJvcmRlckNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwiaWQiLCJfaWQiLCJsYWJlbCIsImNoaWxkcmVuIiwibWFwIiwiY2hpbGQiLCJpIiwiX2MiLCJmb3JtYXREdXJhdGlvbiIsInNlY29uZHMiLCJtIiwiTWF0aCIsImZsb29yIiwicyIsIlJlY29yZGluZ0NhcmQiLCJyZWMiLCJldmVudHMiLCJvbkRlbGV0ZSIsIl9zIiwiZXhwYW5kZWQiLCJzZXRFeHBhbmRlZCIsImxpbmtpbmciLCJzZXRMaW5raW5nIiwic2VsZWN0ZWRFdmVudCIsInNldFNlbGVjdGVkRXZlbnQiLCJldmVudF9pZCIsImxpbmtFdmVudCIsImV2ZW50SWQiLCJldiIsImZpbmQiLCJlIiwiZW50aXRpZXMiLCJNZWV0aW5nUmVjb3JkaW5nIiwidXBkYXRlIiwiZXZlbnRfbmFtZSIsIm5hbWUiLCJsaW5rZWRFdmVudCIsIm9wYWNpdHkiLCJ5IiwidGl0bGUiLCJtZWV0aW5nX2RhdGUiLCJEYXRlIiwibG9jYWxlIiwiYXVkaW9fZHVyYXRpb25fc2Vjb25kcyIsInBkZl91cmwiLCJoZWlnaHQiLCJzdW1tYXJ5IiwiYWN0aW9uSXRlbXMiLCJKU09OIiwicGFyc2UiLCJhY3Rpb25faXRlbXNfanNvbiIsImEiLCJ0cmFuc2NyaXB0IiwiTWVldGluZ0FJIiwiX3MyIiwibmF2aWdhdGUiLCJyZWNvcmRpbmciLCJzZXRSZWNvcmRpbmciLCJwcm9jZXNzaW5nIiwic2V0UHJvY2Vzc2luZyIsInJlc3VsdCIsInNldFJlc3VsdCIsImVsYXBzZWQiLCJzZXRFbGFwc2VkIiwicmVjb3JkaW5ncyIsInNldFJlY29yZGluZ3MiLCJzZXRFdmVudHMiLCJhY3RpdmVTZWN0aW9uIiwic2V0QWN0aXZlU2VjdGlvbiIsInNhdmluZ1RpdGxlIiwic2V0U2F2aW5nVGl0bGUiLCJzaG93U2F2ZU1vZGFsIiwic2V0U2hvd1NhdmVNb2RhbCIsImxhc3REdXJhdGlvbiIsInNldExhc3REdXJhdGlvbiIsIm1lZGlhUmVjb3JkZXIiLCJjaHVua3MiLCJ0aW1lclJlZiIsInRvdWNoU3RhcnQiLCJ4IiwiZHJhZ09mZnNldCIsImRyYWdTdHlsZSIsInNldERyYWdTdHlsZSIsInJlZnJlc2hSZWNvcmRpbmdzIiwibGlzdCIsInRoZW4iLCJjYXRjaCIsIlByb21pc2UiLCJhbGwiLCJFdmVudCIsIkRlYWRsaW5lIiwiZXZ0cyIsImRscyIsIl90eXBlIiwiZCIsInN0YXJ0X2RhdGV0aW1lIiwiZGVhZGxpbmUiLCJzdGFydFJlY29yZGluZyIsInN0cmVhbSIsIm5hdmlnYXRvciIsIm1lZGlhRGV2aWNlcyIsImdldFVzZXJNZWRpYSIsImF1ZGlvIiwiY3VycmVudCIsIk1lZGlhUmVjb3JkZXIiLCJvbmRhdGFhdmFpbGFibGUiLCJwdXNoIiwiZGF0YSIsInN0YXJ0Iiwic2V0SW50ZXJ2YWwiLCJzdG9wUmVjb3JkaW5nIiwiY2xlYXJJbnRlcnZhbCIsInJlc29sdmUiLCJvbnN0b3AiLCJCbG9iIiwidHlwZSIsInN0b3AiLCJnZXRUcmFja3MiLCJmb3JFYWNoIiwidCIsInByb2Nlc3NBdWRpbyIsImF1ZGlvQmxvYiIsImR1cmF0aW9uU2VjcyIsImZpbGVfdXJsIiwiaW50ZWdyYXRpb25zIiwiQ29yZSIsIlVwbG9hZEZpbGUiLCJmaWxlIiwiVHJhbnNjcmliZUF1ZGlvIiwiYXVkaW9fdXJsIiwiYW5hbHlzaXMiLCJJbnZva2VMTE0iLCJwcm9tcHQiLCJyZXNwb25zZV9qc29uX3NjaGVtYSIsInByb3BlcnRpZXMiLCJhY3Rpb25faXRlbXMiLCJpdGVtcyIsImRlYWRsaW5lcyIsIm1pbmRfbWFwIiwiaGFuZGxlVG9nZ2xlUmVjb3JkIiwiYmxvYiIsImhhbmRsZVVwbG9hZCIsInRhcmdldCIsImZpbGVzIiwiZ2VuZXJhdGVBbmRTYXZlUGRmIiwiY29udGVudCIsInRvTG9jYWxlRGF0ZVN0cmluZyIsImpvaW4iLCJwZGZVcmwiLCJqc1BERiIsImRvYyIsImxpbmVzIiwic3BsaXRUZXh0VG9TaXplIiwic2V0Rm9udFNpemUiLCJsaW5lIiwiYWRkUGFnZSIsInRleHQiLCJvdXRwdXQiLCJjcmVhdGUiLCJzdHJpbmdpZnkiLCJkZWFkbGluZXNfanNvbiIsIm1pbmRfbWFwX2pzb24iLCJ0b0lTT1N0cmluZyIsInNwbGl0IiwiZGVsZXRlUmVjb3JkaW5nIiwiZGVsZXRlIiwiZm9ybWF0VGltZSIsIlN0cmluZyIsInBhZFN0YXJ0IiwiaGFuZGxlUG9pbnRlclN0YXJ0IiwiaGFuZGxlUG9pbnRlck1vdmUiLCJ0cmFuc2Zvcm0iLCJ0cmFuc2l0aW9uIiwiaGFuZGxlUG9pbnRlckVuZCIsImR4IiwiYWJzIiwidG91Y2hlcyIsImNsaWVudFgiLCJjbGllbnRZIiwiY2hhbmdlZFRvdWNoZXMiLCJidXR0b25zIiwic2NhbGUiLCJyZXBlYXQiLCJJbmZpbml0eSIsImR1cmF0aW9uIiwiQXJyYXkiLCJfIiwic2NhbGVZIiwiZGVsYXkiLCJpdGVtIiwidmFsdWUiLCJfYzIiLCJfYzMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiTWVldGluZ0FJLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlUmVmLCB1c2VDYWxsYmFjaywgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VOYXZpZ2F0ZSB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5pbXBvcnQgeyBtb3Rpb24sIEFuaW1hdGVQcmVzZW5jZSB9IGZyb20gXCJmcmFtZXItbW90aW9uXCI7XG5pbXBvcnQgeyBBcnJvd1JpZ2h0LCBNaWMsIE1pY09mZiwgTG9hZGVyMiwgQ2xvY2ssIEJyYWluLCBYLCBTcXVhcmVDaGVja0JpZywgU3BhcmtsZXMsIFVwbG9hZCwgRmlsZVRleHQsIERvd25sb2FkLCBDYWxlbmRhclJhbmdlLCBMaW5rMiwgQ2hlY2ssIENoZXZyb25Eb3duIH0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xuaW1wb3J0IHsgYmFzZTQ0IH0gZnJvbSBcIkAvYXBpL2Jhc2U0NENsaWVudFwiO1xuaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSBcImRhdGUtZm5zXCI7XG5pbXBvcnQgeyBwdCB9IGZyb20gXCJkYXRlLWZucy9sb2NhbGVcIjtcblxuZnVuY3Rpb24gTWluZE1hcE5vZGUoeyBub2RlLCBkZXB0aCA9IDAsIFwiZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWRcIjogX19kYXRhQ29sbGVjdGlvbkl0ZW1JZCB9KSB7XG4gIGNvbnN0IGNvbG9ycyA9IFtcIiNFODdBNUFcIiwgXCIjOEI1Q0Y2XCIsIFwiIzNCODJGNlwiLCBcIiMxMEI5ODFcIiwgXCIjRjU5RTBCXCJdO1xuICBjb25zdCBjb2xvciA9IGNvbG9yc1tkZXB0aCAlIGNvbG9ycy5sZW5ndGhdO1xuICByZXR1cm4gKFxuICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6MTM6NFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT17YGZsZXggZmxleC1jb2wgaXRlbXMtc3RhcnQgJHtkZXB0aCA+IDAgPyBcIm1sLTUgYm9yZGVyLWwtMiBwbC0zXCIgOiBcIlwifWB9XG4gICAgc3R5bGU9e3sgYm9yZGVyQ29sb3I6IGRlcHRoID4gMCA/IGNvbG9yICsgXCI0MFwiIDogXCJ0cmFuc3BhcmVudFwiIH19IGRhdGEtY29sbGVjdGlvbi1pZD1cIm5vZGVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17X19kYXRhQ29sbGVjdGlvbkl0ZW1JZH0+XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjE1OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLXhsIHRleHQteHMgZm9udC1zZW1pYm9sZCBtYi0xLjUgdGV4dC13aGl0ZSBzaGFkb3ctc21cIlxuICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiBjb2xvciArIChkZXB0aCA9PT0gMCA/IFwiZWVcIiA6IFwiOTlcIikgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJsYWJlbFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtub2RlPy5pZCB8fCBub2RlPy5faWR9PlxuICAgICAgICB7bm9kZS5sYWJlbH1cbiAgICAgIDwvZGl2PlxuICAgICAge25vZGUuY2hpbGRyZW4/Lm1hcCgoY2hpbGQsIGkpID0+IDxNaW5kTWFwTm9kZSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSToxOTo0MFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17aX0gbm9kZT17Y2hpbGR9IGRlcHRoPXtkZXB0aCArIDF9IC8+KX1cbiAgICA8L2Rpdj4pO1xuXG59XG5cbmZ1bmN0aW9uIGZvcm1hdER1cmF0aW9uKHNlY29uZHMpIHtcbiAgaWYgKCFzZWNvbmRzKSByZXR1cm4gXCLigJRcIjtcbiAgY29uc3QgbSA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDYwKTtcbiAgY29uc3QgcyA9IHNlY29uZHMgJSA2MDtcbiAgcmV0dXJuIG0gPiAwID8gYCR7bX1taW4gJHtzfXNgIDogYCR7c31zYDtcbn1cblxuZnVuY3Rpb24gUmVjb3JkaW5nQ2FyZCh7IHJlYywgZXZlbnRzLCBvbkRlbGV0ZSB9KSB7XG4gIGNvbnN0IFtleHBhbmRlZCwgc2V0RXhwYW5kZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbGlua2luZywgc2V0TGlua2luZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzZWxlY3RlZEV2ZW50LCBzZXRTZWxlY3RlZEV2ZW50XSA9IHVzZVN0YXRlKHJlYy5ldmVudF9pZCB8fCBcIlwiKTtcblxuICBjb25zdCBsaW5rRXZlbnQgPSBhc3luYyAoZXZlbnRJZCkgPT4ge1xuICAgIGNvbnN0IGV2ID0gZXZlbnRzLmZpbmQoKGUpID0+IGUuaWQgPT09IGV2ZW50SWQpO1xuICAgIGF3YWl0IGJhc2U0NC5lbnRpdGllcy5NZWV0aW5nUmVjb3JkaW5nLnVwZGF0ZShyZWMuaWQsIHtcbiAgICAgIGV2ZW50X2lkOiBldmVudElkLFxuICAgICAgZXZlbnRfbmFtZTogZXY/Lm5hbWUgfHwgXCJcIlxuICAgIH0pO1xuICAgIHNldExpbmtpbmcoZmFsc2UpO1xuICAgIHNldFNlbGVjdGVkRXZlbnQoZXZlbnRJZCk7XG4gIH07XG5cbiAgY29uc3QgbGlua2VkRXZlbnQgPSBldmVudHMuZmluZCgoZSkgPT4gZS5pZCA9PT0gKHNlbGVjdGVkRXZlbnQgfHwgcmVjLmV2ZW50X2lkKSk7XG5cbiAgcmV0dXJuIChcbiAgICA8bW90aW9uLmRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo0OTo0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB5OiAxMiB9fSBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHk6IDAgfX1cbiAgICBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLWJvcmRlciBzaGFkb3ctc20gb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjUxOjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiaC0wLjUgYmctZ3JhZGllbnQtdG8tciBmcm9tLVsjRTg3QTVBXSB0by1bIzhCNUNGNl1cIiAvPlxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo1Mjo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicC00XCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJzdW1tYXJ5XCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e3JlYz8uaWQgfHwgcmVjPy5faWR9PlxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjUzOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IGp1c3RpZnktYmV0d2VlbiBnYXAtMlwiPlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6NTQ6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4LTFcIj5cbiAgICAgICAgICAgIDxoMyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo1NToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtZm9yZWdyb3VuZCBsZWFkaW5nLXRpZ2h0XCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJ0aXRsZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtyZWM/LmlkIHx8IHJlYz8uX2lkfT57cmVjLnRpdGxlfTwvaDM+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjU2OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTEuNSBtdC0xLjVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cIm1lZXRpbmdfZGF0ZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtyZWM/LmlkIHx8IHJlYz8uX2lkfT5cbiAgICAgICAgICAgICAge3JlYy5tZWV0aW5nX2RhdGUgJiZcbiAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6NTg6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBweC0yIHB5LTAuNSByb3VuZGVkLWxnIGJnLXNlY29uZGFyeSB0ZXh0LVsxMXB4XSB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj5cbiAgICAgICAgICAgICAgICAgIDxDbG9jayBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo1OToxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgICAgIHtmb3JtYXQobmV3IERhdGUocmVjLm1lZXRpbmdfZGF0ZSksIFwiZCBNTU0geXl5eVwiLCB7IGxvY2FsZTogcHQgfSl9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHtyZWMuYXVkaW9fZHVyYXRpb25fc2Vjb25kcyA+IDAgJiZcbiAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6NjQ6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBweC0yIHB5LTAuNSByb3VuZGVkLWxnIGJnLXNlY29uZGFyeSB0ZXh0LVsxMXB4XSB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj5cbiAgICAgICAgICAgICAgICAgIDxNaWMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6NjU6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+IHtmb3JtYXREdXJhdGlvbihyZWMuYXVkaW9fZHVyYXRpb25fc2Vjb25kcyl9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHtsaW5rZWRFdmVudCAmJlxuICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo2OToxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHB4LTIgcHktMC41IHJvdW5kZWQtbGcgYmctcHVycGxlLTUwIHRleHQtWzExcHhdIHRleHQtcHVycGxlLTYwMCBmb250LW1lZGl1bVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibmFtZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtsaW5rZWRFdmVudD8uaWQgfHwgbGlua2VkRXZlbnQ/Ll9pZH0+XG4gICAgICAgICAgICAgICAgICA8Q2FsZW5kYXJSYW5nZSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo3MDoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz4ge2xpbmtlZEV2ZW50Lm5hbWV9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjc1OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBmbGV4LXNocmluay0wXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJwZGZfdXJsXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e3JlYz8uaWQgfHwgcmVjPy5faWR9PlxuICAgICAgICAgICAge3JlYy5wZGZfdXJsICYmXG4gICAgICAgICAgICA8YSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo3NzoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGhyZWY9e3JlYy5wZGZfdXJsfSB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctOCBoLTggcm91bmRlZC14bCBiZy1bI0U4N0E1QV0vMTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1bI0U4N0E1QV0gaG92ZXI6YmctWyNFODdBNUFdLzIwIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgIHRpdGxlPVwiRG93bmxvYWQgUERGXCI+XG4gICAgICAgICAgICAgICAgPERvd25sb2FkIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjgwOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo4MzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldExpbmtpbmcoIWxpbmtpbmcpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy04IGgtOCByb3VuZGVkLXhsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICBsaW5raW5nID8gXCJiZy1wdXJwbGUtMTAwIHRleHQtcHVycGxlLTYwMFwiIDogXCJiZy1zZWNvbmRhcnkgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGhvdmVyOnRleHQtcHVycGxlLTUwMFwifWBcbiAgICAgICAgICAgIH0gdGl0bGU9XCJBc3NvY2lhciBldmVudG9cIj5cbiAgICAgICAgICAgICAgPExpbmsyIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjg3OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo4OToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldEV4cGFuZGVkKCFleHBhbmRlZCl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTggaC04IHJvdW5kZWQteGwgYmctc2Vjb25kYXJ5IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBob3Zlcjp0ZXh0LWZvcmVncm91bmQgdHJhbnNpdGlvbi1hbGxcIj5cbiAgICAgICAgICAgICAgPENoZXZyb25Eb3duIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjkxOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPXtgdy0zLjUgaC0zLjUgdHJhbnNpdGlvbi10cmFuc2Zvcm0gJHtleHBhbmRlZCA/IFwicm90YXRlLTE4MFwiIDogXCJcIn1gfSAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjkzOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gb25EZWxldGUocmVjLmlkKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctOCBoLTggcm91bmRlZC14bCBiZy1zZWNvbmRhcnkgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGhvdmVyOnRleHQtcm9zZS01MDAgaG92ZXI6Ymctcm9zZS01MCB0cmFuc2l0aW9uLWFsbFwiPlxuICAgICAgICAgICAgICA8WCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo5NToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIExpbmsgZXZlbnQgcGlja2VyICovfVxuICAgICAgICA8QW5pbWF0ZVByZXNlbmNlIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjEwMTo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgICAge2xpbmtpbmcgJiZcbiAgICAgICAgICA8bW90aW9uLmRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSToxMDM6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIGhlaWdodDogMCB9fSBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIGhlaWdodDogXCJhdXRvXCIgfX0gZXhpdD17eyBvcGFjaXR5OiAwLCBoZWlnaHQ6IDAgfX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJtdC0zIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgICAgICA8cCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSToxMDU6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIG1iLTIgZm9udC1tZWRpdW1cIj5Bc3NvY2lhciBhIGV2ZW50bzo8L3A+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6MTA2OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTEuNVwiIGRhdGEtY29sbGVjdGlvbi1pZD1cImV2ZW50c1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6MTA3OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gbGlua0V2ZW50KFwiXCIpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTEuNSByb3VuZGVkLXhsIHRleHQteHMgZm9udC1tZWRpdW0gdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgIXNlbGVjdGVkRXZlbnQgPyBcImJnLXNlY29uZGFyeSB0ZXh0LWZvcmVncm91bmRcIiA6IFwiYmctc2Vjb25kYXJ5LzUwIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBob3ZlcjpiZy1zZWNvbmRhcnlcIn1gXG4gICAgICAgICAgICAgIH0+XG4gICAgICAgICAgICAgICAgICBOZW5odW1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICB7ZXZlbnRzLm1hcCgoZXYpID0+XG4gICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6MTE0OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtldi5pZH0gb25DbGljaz17KCkgPT4gbGlua0V2ZW50KGV2LmlkKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgIHNlbGVjdGVkRXZlbnQgPT09IGV2LmlkID8gXCJiZy1wdXJwbGUtMTAwIHRleHQtcHVycGxlLTcwMFwiIDogXCJiZy1zZWNvbmRhcnkvNTAgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGhvdmVyOmJnLXNlY29uZGFyeVwifWBcbiAgICAgICAgICAgICAgfSBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17ZXY/LmlkfSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cIm5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAge2V2Lm5hbWV9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICAgfVxuICAgICAgICA8L0FuaW1hdGVQcmVzZW5jZT5cblxuICAgICAgICB7LyogU3VtbWFyeSAqL31cbiAgICAgICAge3JlYy5zdW1tYXJ5ICYmXG4gICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjEyODoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIG10LTIgbGVhZGluZy1yZWxheGVkIGxpbmUtY2xhbXAtMlwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwic3VtbWFyeVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtyZWM/LmlkIHx8IHJlYz8uX2lkfT57cmVjLnN1bW1hcnl9PC9wPlxuICAgICAgICB9XG5cbiAgICAgICAgey8qIEV4cGFuZGVkIGRldGFpbHMgKi99XG4gICAgICAgIDxBbmltYXRlUHJlc2VuY2UgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6MTMyOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIj5cbiAgICAgICAgICB7ZXhwYW5kZWQgJiZcbiAgICAgICAgICA8bW90aW9uLmRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSToxMzQ6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIGhlaWdodDogMCB9fSBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIGhlaWdodDogXCJhdXRvXCIgfX0gZXhpdD17eyBvcGFjaXR5OiAwLCBoZWlnaHQ6IDAgfX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJtdC0zIG92ZXJmbG93LWhpZGRlbiBzcGFjZS15LTJcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cInRyYW5zY3JpcHRcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17cmVjPy5pZCB8fCByZWM/Ll9pZH0+XG4gICAgICAgICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgICAgICBsZXQgYWN0aW9uSXRlbXMgPSBbXTtcbiAgICAgICAgICAgICAgdHJ5IHthY3Rpb25JdGVtcyA9IEpTT04ucGFyc2UocmVjLmFjdGlvbl9pdGVtc19qc29uIHx8IFwiW11cIik7fSBjYXRjaCB7fVxuICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uSXRlbXMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjE0MDoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImJnLXNlY29uZGFyeS81MCByb3VuZGVkLXhsIHAtM1wiPlxuICAgICAgICAgICAgICAgICAgICA8cCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSToxNDE6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1ib2xkIHVwcGVyY2FzZSB0ZXh0LW11dGVkLWZvcmVncm91bmQvNjAgbWItMlwiPkHDp8O1ZXM8L3A+XG4gICAgICAgICAgICAgICAgICAgIHthY3Rpb25JdGVtcy5tYXAoKGEsIGkpID0+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSToxNDM6MjJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBrZXk9e2l9IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQgZ2FwLTIgdGV4dC14cyB0ZXh0LWZvcmVncm91bmQgbWItMVwiIGRhdGEtYXJyLWluZGV4PXtpfSBkYXRhLWFyci12YXJpYWJsZS1uYW1lPVwiYWN0aW9uSXRlbXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjE0NDoyNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInctNCBoLTQgcm91bmRlZCBiZy1bI0U4N0E1QV0vMTAgdGV4dC1bI0U4N0E1QV0gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1bOXB4XSBmb250LWJsYWNrIGZsZXgtc2hyaW5rLTBcIiBkYXRhLWFyci1pbmRleD17aX0gZGF0YS1hcnItdmFyaWFibGUtbmFtZT1cImFjdGlvbkl0ZW1zXCI+e2kgKyAxfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHthfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj47XG5cbiAgICAgICAgICAgIH0pKCl9XG4gICAgICAgICAgICAgIHtyZWMudHJhbnNjcmlwdCAmJlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSToxNTI6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJiZy1zZWNvbmRhcnkvNTAgcm91bmRlZC14bCBwLTNcIj5cbiAgICAgICAgICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjE1MzoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LWJvbGQgdXBwZXJjYXNlIHRleHQtbXV0ZWQtZm9yZWdyb3VuZC82MCBtYi0xXCI+VHJhbnNjcmnDp8OjbzwvcD5cbiAgICAgICAgICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjE1NDoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGxlYWRpbmctcmVsYXhlZCBtYXgtaC0yOCBvdmVyZmxvdy15LWF1dG9cIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cInRyYW5zY3JpcHRcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17cmVjPy5pZCB8fCByZWM/Ll9pZH0+e3JlYy50cmFuc2NyaXB0fTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICB9XG4gICAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxuICAgICAgPC9kaXY+XG4gICAgPC9tb3Rpb24uZGl2Pik7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTWVldGluZ0FJKCkge1xuICBjb25zdCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XG4gIGNvbnN0IFtyZWNvcmRpbmcsIHNldFJlY29yZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwcm9jZXNzaW5nLCBzZXRQcm9jZXNzaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Jlc3VsdCwgc2V0UmVzdWx0XSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbZWxhcHNlZCwgc2V0RWxhcHNlZF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW3JlY29yZGluZ3MsIHNldFJlY29yZGluZ3NdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbZXZlbnRzLCBzZXRFdmVudHNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbYWN0aXZlU2VjdGlvbiwgc2V0QWN0aXZlU2VjdGlvbl0gPSB1c2VTdGF0ZShcInJlY29yZFwiKTtcbiAgY29uc3QgW3NhdmluZ1RpdGxlLCBzZXRTYXZpbmdUaXRsZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3Nob3dTYXZlTW9kYWwsIHNldFNob3dTYXZlTW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbGFzdER1cmF0aW9uLCBzZXRMYXN0RHVyYXRpb25dID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IG1lZGlhUmVjb3JkZXIgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IGNodW5rcyA9IHVzZVJlZihbXSk7XG4gIGNvbnN0IHRpbWVyUmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCB0b3VjaFN0YXJ0ID0gdXNlUmVmKHsgeDogMCwgeTogMCB9KTtcbiAgY29uc3QgZHJhZ09mZnNldCA9IHVzZVJlZih7IHg6IDAsIHk6IDAgfSk7XG4gIGNvbnN0IFtkcmFnU3R5bGUsIHNldERyYWdTdHlsZV0gPSB1c2VTdGF0ZSh7fSk7XG5cbiAgY29uc3QgcmVmcmVzaFJlY29yZGluZ3MgPSAoKSA9PiB7XG4gICAgYmFzZTQ0LmVudGl0aWVzLk1lZXRpbmdSZWNvcmRpbmcubGlzdChcIi1jcmVhdGVkX2RhdGVcIiwgNTApLnRoZW4oc2V0UmVjb3JkaW5ncykuY2F0Y2goKCkgPT4ge30pO1xuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmVmcmVzaFJlY29yZGluZ3MoKTtcbiAgICAvLyBMb2FkIGFsbCBldmVudHMgYW5kIGRlYWRsaW5lcyBmb3IgbGlua2luZ1xuICAgIFByb21pc2UuYWxsKFtcbiAgICBiYXNlNDQuZW50aXRpZXMuRXZlbnQubGlzdChcIi1zdGFydF9kYXRldGltZVwiLCAxMDApLFxuICAgIGJhc2U0NC5lbnRpdGllcy5EZWFkbGluZS5saXN0KFwiLWRlYWRsaW5lXCIsIDEwMCldXG4gICAgKS50aGVuKChbZXZ0cywgZGxzXSkgPT4ge1xuICAgICAgc2V0RXZlbnRzKFtcbiAgICAgIC4uLmV2dHMubWFwKChlKSA9PiAoeyAuLi5lLCBfdHlwZTogXCJldmVudFwiIH0pKSxcbiAgICAgIC4uLmRscy5tYXAoKGQpID0+ICh7IC4uLmQsIF90eXBlOiBcImRlYWRsaW5lXCIsIHN0YXJ0X2RhdGV0aW1lOiBkLmRlYWRsaW5lIH0pKV1cbiAgICAgICk7XG4gICAgfSkuY2F0Y2goKCkgPT4ge30pO1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgc3RhcnRSZWNvcmRpbmcgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3Qgc3RyZWFtID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoeyBhdWRpbzogdHJ1ZSB9KTtcbiAgICBtZWRpYVJlY29yZGVyLmN1cnJlbnQgPSBuZXcgTWVkaWFSZWNvcmRlcihzdHJlYW0pO1xuICAgIGNodW5rcy5jdXJyZW50ID0gW107XG4gICAgbWVkaWFSZWNvcmRlci5jdXJyZW50Lm9uZGF0YWF2YWlsYWJsZSA9IChlKSA9PiBjaHVua3MuY3VycmVudC5wdXNoKGUuZGF0YSk7XG4gICAgbWVkaWFSZWNvcmRlci5jdXJyZW50LnN0YXJ0KCk7XG4gICAgc2V0UmVjb3JkaW5nKHRydWUpO1xuICAgIHNldEVsYXBzZWQoMCk7XG4gICAgdGltZXJSZWYuY3VycmVudCA9IHNldEludGVydmFsKCgpID0+IHNldEVsYXBzZWQoKHMpID0+IHMgKyAxKSwgMTAwMCk7XG4gIH07XG5cbiAgY29uc3Qgc3RvcFJlY29yZGluZyA9ICgpID0+IHtcbiAgICBjbGVhckludGVydmFsKHRpbWVyUmVmLmN1cnJlbnQpO1xuICAgIHNldExhc3REdXJhdGlvbihlbGFwc2VkKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIG1lZGlhUmVjb3JkZXIuY3VycmVudC5vbnN0b3AgPSAoKSA9PiByZXNvbHZlKG5ldyBCbG9iKGNodW5rcy5jdXJyZW50LCB7IHR5cGU6IFwiYXVkaW8vd2VibVwiIH0pKTtcbiAgICAgIG1lZGlhUmVjb3JkZXIuY3VycmVudC5zdG9wKCk7XG4gICAgICBtZWRpYVJlY29yZGVyLmN1cnJlbnQuc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goKHQpID0+IHQuc3RvcCgpKTtcbiAgICAgIHNldFJlY29yZGluZyhmYWxzZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgcHJvY2Vzc0F1ZGlvID0gYXN5bmMgKGF1ZGlvQmxvYiwgZHVyYXRpb25TZWNzKSA9PiB7XG4gICAgc2V0UHJvY2Vzc2luZyh0cnVlKTtcbiAgICBjb25zdCB7IGZpbGVfdXJsIH0gPSBhd2FpdCBiYXNlNDQuaW50ZWdyYXRpb25zLkNvcmUuVXBsb2FkRmlsZSh7IGZpbGU6IGF1ZGlvQmxvYiB9KTtcbiAgICBjb25zdCB0cmFuc2NyaXB0ID0gYXdhaXQgYmFzZTQ0LmludGVncmF0aW9ucy5Db3JlLlRyYW5zY3JpYmVBdWRpbyh7IGF1ZGlvX3VybDogZmlsZV91cmwgfSk7XG5cbiAgICBjb25zdCBhbmFseXNpcyA9IGF3YWl0IGJhc2U0NC5pbnRlZ3JhdGlvbnMuQ29yZS5JbnZva2VMTE0oe1xuICAgICAgcHJvbXB0OiBgQW5hbGlzYSBlc3RhIHRyYW5zY3Jpw6fDo28gZGUgcmV1bmnDo28vYnJhaW5zdG9ybSBlIGV4dHJhaTpcbjEuIGFjdGlvbl9pdGVtczogbGlzdGEgZGUgdGFyZWZhcy9hw6fDtWVzIGNvbmNyZXRhcyBtZW5jaW9uYWRhcyAobcOheCA4KVxuMi4gZGVhZGxpbmVzOiBkYXRhcyBvdSBwcmF6b3MgbWVuY2lvbmFkb3MgKG3DoXggNSlcbjMuIG1pbmRfbWFwOiBtYXBhIG1lbnRhbCBoaWVyw6FycXVpY28gZG9zIHRlbWFzIHByaW5jaXBhaXNcbjQuIHN1bW1hcnk6IHJlc3VtbyBlbSAyLTMgZnJhc2VzXG41LiB0aXRsZTogdMOtdHVsbyBjdXJ0byBlIGRlc2NyaXRpdm8gcGFyYSBlc3RhIHJldW5pw6NvIChtw6F4IDYgcGFsYXZyYXMpXG5cblRyYW5zY3Jpw6fDo286IFwiXCJcIiR7dHJhbnNjcmlwdH1cIlwiXCJcblxuUmVzcG9uZGUgZW0gcG9ydHVndcOqcyBkZSBQb3J0dWdhbC5gLFxuICAgICAgcmVzcG9uc2VfanNvbl9zY2hlbWE6IHtcbiAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIHRpdGxlOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICBzdW1tYXJ5OiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICBhY3Rpb25faXRlbXM6IHsgdHlwZTogXCJhcnJheVwiLCBpdGVtczogeyB0eXBlOiBcInN0cmluZ1wiIH0gfSxcbiAgICAgICAgICBkZWFkbGluZXM6IHsgdHlwZTogXCJhcnJheVwiLCBpdGVtczogeyB0eXBlOiBcInN0cmluZ1wiIH0gfSxcbiAgICAgICAgICBtaW5kX21hcDoge1xuICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgbGFiZWw6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICBjaGlsZHJlbjogeyB0eXBlOiBcImFycmF5XCIsIGl0ZW1zOiB7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiB7IHR5cGU6IFwiYXJyYXlcIiwgaXRlbXM6IHsgdHlwZTogXCJvYmplY3RcIiwgcHJvcGVydGllczogeyBsYWJlbDogeyB0eXBlOiBcInN0cmluZ1wiIH0gfSB9IH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBzZXRSZXN1bHQoeyAuLi5hbmFseXNpcywgdHJhbnNjcmlwdCwgYXVkaW9fZHVyYXRpb25fc2Vjb25kczogZHVyYXRpb25TZWNzIHx8IGxhc3REdXJhdGlvbiB9KTtcbiAgICBzZXRTYXZpbmdUaXRsZShhbmFseXNpcy50aXRsZSB8fCBcIk5vdmEgUmV1bmnDo29cIik7XG4gICAgc2V0UHJvY2Vzc2luZyhmYWxzZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVG9nZ2xlUmVjb3JkID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmIChyZWNvcmRpbmcpIHtcbiAgICAgIGNvbnN0IGJsb2IgPSBhd2FpdCBzdG9wUmVjb3JkaW5nKCk7XG4gICAgICBhd2FpdCBwcm9jZXNzQXVkaW8oYmxvYiwgZWxhcHNlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IHN0YXJ0UmVjb3JkaW5nKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVVwbG9hZCA9IGFzeW5jIChlKSA9PiB7XG4gICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzPy5bMF07XG4gICAgaWYgKCFmaWxlKSByZXR1cm47XG4gICAgc2V0UHJvY2Vzc2luZyh0cnVlKTtcbiAgICBhd2FpdCBwcm9jZXNzQXVkaW8oZmlsZSwgMCk7XG4gIH07XG5cbiAgY29uc3QgZ2VuZXJhdGVBbmRTYXZlUGRmID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghcmVzdWx0KSByZXR1cm47XG4gICAgLy8gR2VuZXJhdGUgUERGIGNvbnRlbnQgYXMgdGV4dC1iYXNlZCBkb3dubG9hZFxuICAgIGNvbnN0IGNvbnRlbnQgPSBgUkVVTknDg08gSUEgLSAke3NhdmluZ1RpdGxlfVxuRGF0YTogJHtuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZyhcInB0LVBUXCIpfVxuRHVyYcOnw6NvOiAke2Zvcm1hdER1cmF0aW9uKHJlc3VsdC5hdWRpb19kdXJhdGlvbl9zZWNvbmRzKX1cblxu4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQXG5SRVNVTU9cbuKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkFxuJHtyZXN1bHQuc3VtbWFyeX1cblxu4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQXG5Bw4fDlUVTIEEgVE9NQVJcbuKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkFxuJHsocmVzdWx0LmFjdGlvbl9pdGVtcyB8fCBbXSkubWFwKChhLCBpKSA9PiBgJHtpICsgMX0uICR7YX1gKS5qb2luKFwiXFxuXCIpfVxuXG7ilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZBcblBSQVpPUyBNRU5DSU9OQURPU1xu4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQXG4keyhyZXN1bHQuZGVhZGxpbmVzIHx8IFtdKS5qb2luKFwiXFxuXCIpIHx8IFwiTmVuaHVtXCJ9XG5cbuKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkFxuVFJBTlNDUknDh8ODTyBDT01QTEVUQVxu4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQXG4ke3Jlc3VsdC50cmFuc2NyaXB0fVxuYDtcblxuICAgIC8vIFNhdmUgYXMgYSBibG9iIFVSTCBmb3IgZG93bmxvYWQgLSB1c2UganNwZGYgaWYgYXZhaWxhYmxlLCBvdGhlcndpc2UgdGV4dFxuICAgIGxldCBwZGZVcmwgPSBudWxsO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGpzUERGIH0gPSBhd2FpdCBpbXBvcnQoXCJqc3BkZlwiKTtcbiAgICAgIGNvbnN0IGRvYyA9IG5ldyBqc1BERigpO1xuICAgICAgY29uc3QgbGluZXMgPSBkb2Muc3BsaXRUZXh0VG9TaXplKGNvbnRlbnQsIDE4MCk7XG4gICAgICBsZXQgeSA9IDE1O1xuICAgICAgZG9jLnNldEZvbnRTaXplKDEwKTtcbiAgICAgIGxpbmVzLmZvckVhY2goKGxpbmUpID0+IHtcbiAgICAgICAgaWYgKHkgPiAyODApIHtkb2MuYWRkUGFnZSgpO3kgPSAxNTt9XG4gICAgICAgIGRvYy50ZXh0KGxpbmUsIDE1LCB5KTtcbiAgICAgICAgeSArPSA2O1xuICAgICAgfSk7XG4gICAgICBjb25zdCBibG9iID0gZG9jLm91dHB1dChcImJsb2JcIik7XG4gICAgICBjb25zdCB7IGZpbGVfdXJsIH0gPSBhd2FpdCBiYXNlNDQuaW50ZWdyYXRpb25zLkNvcmUuVXBsb2FkRmlsZSh7IGZpbGU6IGJsb2IgfSk7XG4gICAgICBwZGZVcmwgPSBmaWxlX3VybDtcbiAgICB9IGNhdGNoIHtcblxuICAgICAgLy8gZmFsbGJhY2s6IHN0b3JlIGFzIHRleHRcbiAgICB9XG4gICAgLy8gU2F2ZSB0byBlbnRpdHlcbiAgICBhd2FpdCBiYXNlNDQuZW50aXRpZXMuTWVldGluZ1JlY29yZGluZy5jcmVhdGUoe1xuICAgICAgdGl0bGU6IHNhdmluZ1RpdGxlLFxuICAgICAgc3VtbWFyeTogcmVzdWx0LnN1bW1hcnksXG4gICAgICB0cmFuc2NyaXB0OiByZXN1bHQudHJhbnNjcmlwdCxcbiAgICAgIGFjdGlvbl9pdGVtc19qc29uOiBKU09OLnN0cmluZ2lmeShyZXN1bHQuYWN0aW9uX2l0ZW1zIHx8IFtdKSxcbiAgICAgIGRlYWRsaW5lc19qc29uOiBKU09OLnN0cmluZ2lmeShyZXN1bHQuZGVhZGxpbmVzIHx8IFtdKSxcbiAgICAgIG1pbmRfbWFwX2pzb246IEpTT04uc3RyaW5naWZ5KHJlc3VsdC5taW5kX21hcCB8fCB7fSksXG4gICAgICBwZGZfdXJsOiBwZGZVcmwsXG4gICAgICBhdWRpb19kdXJhdGlvbl9zZWNvbmRzOiByZXN1bHQuYXVkaW9fZHVyYXRpb25fc2Vjb25kcyB8fCAwLFxuICAgICAgbWVldGluZ19kYXRlOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoXCJUXCIpWzBdXG4gICAgfSk7XG5cbiAgICBzZXRSZXN1bHQobnVsbCk7XG4gICAgc2V0U2hvd1NhdmVNb2RhbChmYWxzZSk7XG4gICAgcmVmcmVzaFJlY29yZGluZ3MoKTtcbiAgICBzZXRBY3RpdmVTZWN0aW9uKFwicmVjb3JkaW5nc1wiKTtcbiAgfTtcblxuICBjb25zdCBkZWxldGVSZWNvcmRpbmcgPSBhc3luYyAoaWQpID0+IHtcbiAgICBhd2FpdCBiYXNlNDQuZW50aXRpZXMuTWVldGluZ1JlY29yZGluZy5kZWxldGUoaWQpLmNhdGNoKCgpID0+IHt9KTtcbiAgICByZWZyZXNoUmVjb3JkaW5ncygpO1xuICB9O1xuXG4gIGNvbnN0IGZvcm1hdFRpbWUgPSAocykgPT4gYCR7U3RyaW5nKE1hdGguZmxvb3IocyAvIDYwKSkucGFkU3RhcnQoMiwgXCIwXCIpfToke1N0cmluZyhzICUgNjApLnBhZFN0YXJ0KDIsIFwiMFwiKX1gO1xuXG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJTdGFydCA9IHVzZUNhbGxiYWNrKCh4LCB5KSA9PiB7dG91Y2hTdGFydC5jdXJyZW50ID0geyB4LCB5IH07ZHJhZ09mZnNldC5jdXJyZW50ID0geyB4OiAwLCB5OiAwIH07c2V0RHJhZ1N0eWxlKHt9KTt9LCBbXSk7XG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJNb3ZlID0gdXNlQ2FsbGJhY2soKHgsIHkpID0+IHtcbiAgICBkcmFnT2Zmc2V0LmN1cnJlbnQgPSB7IHg6IHggLSB0b3VjaFN0YXJ0LmN1cnJlbnQueCwgeTogeSAtIHRvdWNoU3RhcnQuY3VycmVudC55IH07XG4gICAgc2V0RHJhZ1N0eWxlKHsgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7ZHJhZ09mZnNldC5jdXJyZW50Lnh9cHgsICR7ZHJhZ09mZnNldC5jdXJyZW50Lnl9cHgpYCwgdHJhbnNpdGlvbjogXCJub25lXCIgfSk7XG4gIH0sIFtdKTtcbiAgY29uc3QgaGFuZGxlUG9pbnRlckVuZCA9IHVzZUNhbGxiYWNrKCh4LCB5KSA9PiB7XG4gICAgc2V0RHJhZ1N0eWxlKHsgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZSgwLCAwKVwiLCB0cmFuc2l0aW9uOiBcInRyYW5zZm9ybSAwLjNzIGVhc2Utb3V0XCIgfSk7XG4gICAgY29uc3QgZHggPSB4IC0gdG91Y2hTdGFydC5jdXJyZW50Lng7XG4gICAgaWYgKE1hdGguYWJzKGR4KSA+IDYwICYmIGR4ID4gMCkgbmF2aWdhdGUoXCIvY29taW5nLXNvb25cIik7XG4gIH0sIFtuYXZpZ2F0ZV0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTozNzA6NFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1jcmVhbSBmbGV4IGZsZXgtY29sIHNlbGVjdC1ub25lXCJcbiAgICBvblRvdWNoU3RhcnQ9eyhlKSA9PiBoYW5kbGVQb2ludGVyU3RhcnQoZS50b3VjaGVzWzBdLmNsaWVudFgsIGUudG91Y2hlc1swXS5jbGllbnRZKX1cbiAgICBvblRvdWNoTW92ZT17KGUpID0+IGhhbmRsZVBvaW50ZXJNb3ZlKGUudG91Y2hlc1swXS5jbGllbnRYLCBlLnRvdWNoZXNbMF0uY2xpZW50WSl9XG4gICAgb25Ub3VjaEVuZD17KGUpID0+IGhhbmRsZVBvaW50ZXJFbmQoZS5jaGFuZ2VkVG91Y2hlc1swXT8uY2xpZW50WCB8fCB0b3VjaFN0YXJ0LmN1cnJlbnQueCwgZS5jaGFuZ2VkVG91Y2hlc1swXT8uY2xpZW50WSB8fCB0b3VjaFN0YXJ0LmN1cnJlbnQueSl9XG4gICAgb25Nb3VzZURvd249eyhlKSA9PiBoYW5kbGVQb2ludGVyU3RhcnQoZS5jbGllbnRYLCBlLmNsaWVudFkpfVxuICAgIG9uTW91c2VNb3ZlPXsoZSkgPT4ge2lmIChlLmJ1dHRvbnMgPT09IDEpIGhhbmRsZVBvaW50ZXJNb3ZlKGUuY2xpZW50WCwgZS5jbGllbnRZKTt9fVxuICAgIG9uTW91c2VVcD17KGUpID0+IGhhbmRsZVBvaW50ZXJFbmQoZS5jbGllbnRYLCBlLmNsaWVudFkpfT5cbiAgICAgIFxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTozNzg6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHN0eWxlPXtkcmFnU3R5bGV9IGNsYXNzTmFtZT1cImZsZXgtMSBmbGV4IGZsZXgtY29sXCI+XG4gICAgICAgIHsvKiBIZWFkZXIgKi99XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6MzgwOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJweC01IHB0LTEyIHBiLTQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTozODE6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTozODI6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiBuYXZpZ2F0ZShcIi9jb21pbmctc29vblwiKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMTAgaC0xMCByb3VuZGVkLTJ4bCBiZy13aGl0ZSBib3JkZXIgYm9yZGVyLWJvcmRlciBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LW11dGVkLWZvcmVncm91bmQgaG92ZXI6dGV4dC1mb3JlZ3JvdW5kIGhvdmVyOmJvcmRlci1bI0U4N0E1QV0vMzAgc2hhZG93LXNtIHRyYW5zaXRpb24tYWxsXCI+XG4gICAgICAgICAgICAgIDxBcnJvd1JpZ2h0IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjM4NDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTozODY6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCI+XG4gICAgICAgICAgICAgIDxoMSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTozODc6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdGV4dC1mb3JlZ3JvdW5kXCI+UmV1bmnDtWVzIElBPC9oMT5cbiAgICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6Mzg4OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCI+R3JhdmEgZSBvYnTDqW0gcmVzdW1vIGF1dG9tw6F0aWNvPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge2FjdGl2ZVNlY3Rpb24gPT09IFwicmVjb3JkXCIgJiZcbiAgICAgICAgICA8bGFiZWwgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6MzkyOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidy0xMCBoLTEwIHJvdW5kZWQtMnhsIGJnLXdoaXRlIGJvcmRlciBib3JkZXItYm9yZGVyIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBob3Zlcjp0ZXh0LVsjRTg3QTVBXSBob3Zlcjpib3JkZXItWyNFODdBNUFdLzMwIHNoYWRvdy1zbSB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiPlxuICAgICAgICAgICAgICA8VXBsb2FkIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjM5MzoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgPGlucHV0IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjM5NDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHR5cGU9XCJmaWxlXCIgYWNjZXB0PVwiYXVkaW8vKlwiIGNsYXNzTmFtZT1cImhpZGRlblwiIG9uQ2hhbmdlPXtoYW5kbGVVcGxvYWR9IC8+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFNlY3Rpb24gdGFicyAqL31cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo0MDA6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInB4LTUgbWItNFwiPlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6NDAxOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBiZy13aGl0ZSByb3VuZGVkLTJ4bCBwLTEuNSBib3JkZXIgYm9yZGVyLWJvcmRlciBzaGFkb3ctc20gZ2FwLTFcIj5cbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6NDAyOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlU2VjdGlvbihcInJlY29yZFwiKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXgtMSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBweS0yLjUgcm91bmRlZC14bCB0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgIGFjdGl2ZVNlY3Rpb24gPT09IFwicmVjb3JkXCIgPyBcImJnLVsjRTg3QTVBXSB0ZXh0LXdoaXRlIHNoYWRvdy1tZFwiIDogXCJ0ZXh0LW11dGVkLWZvcmVncm91bmQgaG92ZXI6dGV4dC1mb3JlZ3JvdW5kXCJ9YFxuICAgICAgICAgICAgfT5cbiAgICAgICAgICAgICAgPE1pYyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo0MDY6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+IEdyYXZhclxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjQwODoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVNlY3Rpb24oXCJyZWNvcmRpbmdzXCIpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleC0xIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yIHB5LTIuNSByb3VuZGVkLXhsIHRleHQtc20gZm9udC1zZW1pYm9sZCB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgYWN0aXZlU2VjdGlvbiA9PT0gXCJyZWNvcmRpbmdzXCIgPyBcImJnLVsjRTg3QTVBXSB0ZXh0LXdoaXRlIHNoYWRvdy1tZFwiIDogXCJ0ZXh0LW11dGVkLWZvcmVncm91bmQgaG92ZXI6dGV4dC1mb3JlZ3JvdW5kXCJ9YFxuICAgICAgICAgICAgfT5cbiAgICAgICAgICAgICAgPEZpbGVUZXh0IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjQxMjoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz4gR3JhdmHDp8O1ZXNcbiAgICAgICAgICAgICAge3JlY29yZGluZ3MubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo0MTQ6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJiZy13aGl0ZS8yMCByb3VuZGVkLWZ1bGwgcHgtMS41IHRleHQteHNcIj57cmVjb3JkaW5ncy5sZW5ndGh9PC9zcGFuPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIENvbnRlbnQgKi99XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6NDIxOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4LTEgcHgtNSBwYi0xMCBvdmVyZmxvdy1hdXRvXCI+XG4gICAgICAgICAge2FjdGl2ZVNlY3Rpb24gPT09IFwicmVjb3JkXCIgJiZcbiAgICAgICAgICA8PlxuICAgICAgICAgICAgICB7IXJlc3VsdCAmJiAhcHJvY2Vzc2luZyAmJlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo0MjU6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBweS0xNCBnYXAtNlwiPlxuICAgICAgICAgICAgICAgICAgPG1vdGlvbi5idXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6NDI2OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlVG9nZ2xlUmVjb3JkfVxuICAgICAgICAgICAgICB3aGlsZVRhcD17eyBzY2FsZTogMC45NSB9fVxuICAgICAgICAgICAgICBhbmltYXRlPXtyZWNvcmRpbmcgPyB7IHNjYWxlOiBbMSwgMS4wNiwgMV0gfSA6IHt9fVxuICAgICAgICAgICAgICB0cmFuc2l0aW9uPXtyZWNvcmRpbmcgPyB7IHJlcGVhdDogSW5maW5pdHksIGR1cmF0aW9uOiAxLjIgfSA6IHt9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTI4IGgtMjggcm91bmRlZC1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNoYWRvdy14bCB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICByZWNvcmRpbmcgPyBcImJnLXJvc2UtNTAwIHNoYWRvdy1yb3NlLTUwMC8zMFwiIDogXCJiZy1bI0U4N0E1QV0gc2hhZG93LVsjRTg3QTVBXS8zMCBob3ZlcjpiZy1bI0Q0Njk0QV1cIn1gXG4gICAgICAgICAgICAgIH0+XG4gICAgICAgICAgICAgICAgICAgIHtyZWNvcmRpbmcgPyA8TWljT2ZmIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjQzNDozM1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTEyIGgtMTIgdGV4dC13aGl0ZVwiIC8+IDogPE1pYyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo0MzQ6NzlcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy0xMiBoLTEyIHRleHQtd2hpdGVcIiAvPn1cbiAgICAgICAgICAgICAgICAgIDwvbW90aW9uLmJ1dHRvbj5cblxuICAgICAgICAgICAgICAgICAge3JlY29yZGluZyA/XG4gICAgICAgICAgICAgIDxtb3Rpb24uZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjQzODoyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGluaXRpYWw9e3sgb3BhY2l0eTogMCB9fSBhbmltYXRlPXt7IG9wYWNpdHk6IDEgfX0gY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjQzOToyMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZ2FwLTEgaXRlbXMtZW5kIGgtOFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge1suLi5BcnJheSg1KV0ubWFwKChfLCBpKSA9PlxuICAgICAgICAgICAgICAgICAgPG1vdGlvbi5kaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6NDQxOjI2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtpfVxuICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17eyBzY2FsZVk6IFswLjMsIDEsIDAuM10gfX1cbiAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb249e3sgcmVwZWF0OiBJbmZpbml0eSwgZHVyYXRpb246IDAuOSwgZGVsYXk6IGkgKiAwLjE1IH19XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTEuNSByb3VuZGVkLWZ1bGwgYmctWyNFODdBNUFdIG9yaWdpbi1ib3R0b21cIlxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgaGVpZ2h0OiAyNCB9fSBkYXRhLWFyci1pbmRleD17aX0gLz5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6NDQ4OjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1mb3JlZ3JvdW5kIHRleHQtc20gZm9udC1tb25vIGZvbnQtYm9sZFwiPntmb3JtYXRUaW1lKGVsYXBzZWQpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8cCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo0NDk6MjJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj5Ub2NhIHBhcmEgcGFyYXIgZSBhbmFsaXNhcjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9tb3Rpb24uZGl2PiA6XG5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo0NTI6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8cCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo0NTM6MjJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtZm9yZWdyb3VuZFwiPlRvY2EgcGFyYSBncmF2YXI8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6NDU0OjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIG10LTFcIj5vdSB1c2EgbyDwn5OOIHBhcmEgY2FycmVnYXIgZmljaGVpcm88L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAge3Byb2Nlc3NpbmcgJiZcbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6NDYxOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIHB5LTE2IGdhcC00XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjQ2MjoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTIwIGgtMjAgcm91bmRlZC1bMjhweF0gYmctWyNFODdBNUFdLzEwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxMb2FkZXIyIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjQ2MzoyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgdGV4dC1bI0U4N0E1QV0gYW5pbWF0ZS1zcGluXCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6NDY1OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LWZvcmVncm91bmRcIj5BIGFuYWxpc2FyIGNvbSBJQS4uLjwvcD5cbiAgICAgICAgICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjQ2NjoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiPkEgZXh0cmFpciBhw6fDtWVzLCBwcmF6b3MgZSBtYXBhIG1lbnRhbDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB7cmVzdWx0ICYmXG4gICAgICAgICAgICA8bW90aW9uLmRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo0NzE6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHk6IDEwIH19IGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgeTogMCB9fSBjbGFzc05hbWU9XCJzcGFjZS15LTMgcHQtMlwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibWluZF9tYXBcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17cmVzdWx0Py5pZCB8fCByZXN1bHQ/Ll9pZH0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjQ3MjoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo0NzM6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYmxhY2sgdGV4dC1mb3JlZ3JvdW5kIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPFNwYXJrbGVzIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjQ3NDoyMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtWyNFODdBNUFdXCIgLz4gQW7DoWxpc2UgQ29tcGxldGFcbiAgICAgICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo0NzY6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiBzZXRSZXN1bHQobnVsbCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy04IGgtOCByb3VuZGVkLXhsIGJnLXNlY29uZGFyeSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LW11dGVkLWZvcmVncm91bmQgaG92ZXI6dGV4dC1yb3NlLTUwMCB0cmFuc2l0aW9uLWFsbFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxYIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjQ3ODoyMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo0ODI6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCBwLTQgYm9yZGVyIGJvcmRlci1ib3JkZXIgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjQ4MzoyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LWJvbGQgdGV4dC1bI0U4N0E1QV0gdXBwZXJjYXNlIHRyYWNraW5nLXdpZGUgbWItMlwiPlJlc3VtbzwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6NDg0OjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWZvcmVncm91bmQgbGVhZGluZy1yZWxheGVkXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJzdW1tYXJ5XCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e3Jlc3VsdD8uaWQgfHwgcmVzdWx0Py5faWR9PntyZXN1bHQuc3VtbWFyeX08L3A+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAge3Jlc3VsdC5hY3Rpb25faXRlbXM/Lmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo0ODg6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCBwLTQgYm9yZGVyIGJvcmRlci1ib3JkZXIgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6NDg5OjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtYm9sZCB0ZXh0LWZvcmVncm91bmQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGUgbWItMyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U3F1YXJlQ2hlY2tCaWcgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6NDkwOjI0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC01MDBcIiAvPiBBw6fDtWVzXG4gICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6NDkyOjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwic3BhY2UteS0yXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJhY3Rpb25faXRlbXNcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17cmVzdWx0Py5pZCB8fCByZXN1bHQ/Ll9pZH0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cmVzdWx0LmFjdGlvbl9pdGVtcy5tYXAoKGl0ZW0sIGkpID0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjQ5NDoyNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17aX0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBnYXAtMi41IHRleHQtc21cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjQ5NToyOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInctNSBoLTUgcm91bmRlZC1sZyBiZy1bI0U4N0E1QV0vMTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZmxleC1zaHJpbmstMCBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjQ5NjozMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtYmxhY2sgdGV4dC1bI0U4N0E1QV1cIj57aSArIDF9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjQ5ODoyOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQtZm9yZWdyb3VuZCBsZWFkaW5nLXNudWdcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cIml0ZW1cIj57aXRlbX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAge3Jlc3VsdC5kZWFkbGluZXM/Lmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo1MDY6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCBwLTQgYm9yZGVyIGJvcmRlci1ib3JkZXIgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6NTA3OjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtYm9sZCB0ZXh0LWZvcmVncm91bmQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGUgbWItMyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q2xvY2sgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6NTA4OjI0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYW1iZXItNTAwXCIgLz4gUHJhem9zIE1lbmNpb25hZG9zXG4gICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6NTEwOjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTJcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImRlYWRsaW5lc1wiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtyZXN1bHQ/LmlkIHx8IHJlc3VsdD8uX2lkfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtyZXN1bHQuZGVhZGxpbmVzLm1hcCgoZCwgaSkgPT5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjUxMjoyNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17aX0gY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgcm91bmRlZC0yeGwgYmctc2Vjb25kYXJ5IHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1mb3JlZ3JvdW5kIGJvcmRlciBib3JkZXItYm9yZGVyXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJkXCI+e2R9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAge3Jlc3VsdC5taW5kX21hcCAmJlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjUxOToyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtMnhsIHAtNCBib3JkZXIgYm9yZGVyLWJvcmRlciBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8cCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo1MjA6MjJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1ib2xkIHRleHQtZm9yZWdyb3VuZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZSBtYi0zIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCcmFpbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo1MjE6MjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1bI0U4N0E1QV1cIiAvPiBNYXBhIE1lbnRhbFxuICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjUyMzoyMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cIm92ZXJmbG93LWF1dG9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxNaW5kTWFwTm9kZSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo1MjQ6MjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBub2RlPXtyZXN1bHQubWluZF9tYXB9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBTYXZlIHNlY3Rpb24gKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjUzMDoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtMnhsIHAtNCBib3JkZXIgYm9yZGVyLVsjRTg3QTVBXS8yMCBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6NTMxOjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtYm9sZCB0ZXh0LVsjRTg3QTVBXSB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZSBtYi0zXCI+R3VhcmRhciBHcmF2YcOnw6NvPC9wPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6NTMyOjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgdmFsdWU9e3NhdmluZ1RpdGxlfSBvbkNoYW5nZT17KGUpID0+IHNldFNhdmluZ1RpdGxlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlTDrXR1bG8gZGEgcmV1bmnDo28uLi5cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zIHB5LTIuNSByb3VuZGVkLXhsIGJnLXNlY29uZGFyeS82MCB0ZXh0LXNtIGZvbnQtbWVkaXVtIG91dGxpbmUtbm9uZSBmb2N1czpiZy13aGl0ZSB0cmFuc2l0aW9uLWFsbCBtYi0zXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo1MzU6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXtnZW5lcmF0ZUFuZFNhdmVQZGZ9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTMgcm91bmRlZC0yeGwgYmctWyNFODdBNUFdIHRleHQtd2hpdGUgdGV4dC1zbSBmb250LWJvbGQgaG92ZXI6YmctWyNENDY5NEFdIHNoYWRvdy1sZyBzaGFkb3ctWyNFODdBNUFdLzI1IHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPEZpbGVUZXh0IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjUzNzoyMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz4gR3VhcmRhciArIEdlcmFyIFBERlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjU0MToxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldFJlc3VsdChudWxsKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTMgcm91bmRlZC0yeGwgYmctc2Vjb25kYXJ5IHRleHQtbXV0ZWQtZm9yZWdyb3VuZCB0ZXh0LXNtIGZvbnQtbWVkaXVtIGhvdmVyOmJnLWJvcmRlciB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8WCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo1NDM6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+IERlc2NhcnRhclxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgfVxuXG4gICAgICAgICAge2FjdGl2ZVNlY3Rpb24gPT09IFwicmVjb3JkaW5nc1wiICYmXG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo1NTE6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIiBkYXRhLWNvbGxlY3Rpb24taWQ9XCJNZWV0aW5nUmVjb3JkaW5nXCI+XG4gICAgICAgICAgICAgIHtyZWNvcmRpbmdzLmxlbmd0aCA9PT0gMCA/XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjU1MzoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBweS0yMFwiPlxuICAgICAgICAgICAgICAgICAgPEZpbGVUZXh0IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvTWVldGluZ0FJOjU1NDoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTEyIGgtMTIgbXgtYXV0byBtYi0zIHRleHQtbXV0ZWQtZm9yZWdyb3VuZC8yMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8cCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL01lZXRpbmdBSTo1NTU6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1tdXRlZC1mb3JlZ3JvdW5kIHRleHQtc20gZm9udC1tZWRpdW1cIj5TZW0gZ3JhdmHDp8O1ZXMgZ3VhcmRhZGFzPC9wPlxuICAgICAgICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6NTU2OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtbXV0ZWQtZm9yZWdyb3VuZC81MCB0ZXh0LXhzIG10LTFcIj5HcmF2YSB1bWEgcmV1bmnDo28gcGFyYSBjb21lw6dhcjwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj4gOlxuXG4gICAgICAgICAgICByZWNvcmRpbmdzLm1hcCgocmVjKSA9PlxuICAgICAgICAgICAgPFJlY29yZGluZ0NhcmQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9NZWV0aW5nQUk6NTYwOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtyZWMuaWR9IHJlYz17cmVjfSBldmVudHM9e2V2ZW50c30gb25EZWxldGU9e2RlbGV0ZVJlY29yZGluZ30gZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e3JlYz8uaWR9IC8+XG4gICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+KTtcblxufSJdLCJmaWxlIjoiL2FwcC9zcmMvcGFnZXMvTWVldGluZ0FJLmpzeCJ9