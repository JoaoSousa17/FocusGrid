import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/TaskBoard.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/pages/TaskBoard.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=fc940917"; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"]; const useMemo = __vite__cjsImport3_react["useMemo"]; const useCallback = __vite__cjsImport3_react["useCallback"]; const useRef = __vite__cjsImport3_react["useRef"];
import { useNavigate } from "/node_modules/.vite/deps/react-router-dom.js?v=8a08d97a";
import { motion, AnimatePresence } from "/node_modules/.vite/deps/framer-motion.js?v=fc940917";
import { ArrowLeft, Plus, Check, X, Search, Filter, Trash2, Tags, ChevronLeft, ChevronRight, GripVertical } from "/node_modules/.vite/deps/lucide-react.js?v=aefa7968";
import { DragDropContext, Droppable, Draggable } from "/node_modules/.vite/deps/@hello-pangea_dnd.js?v=8c648cdf";
import { base44 } from "/src/api/base44Client.js";
import { startOfWeek, endOfWeek, addWeeks, subWeeks, format, eachDayOfInterval } from "/node_modules/.vite/deps/date-fns.js?v=a1580542";
import { pt } from "/node_modules/.vite/deps/date-fns_locale.js?v=45b313c9";
import TagPicker from "/src/components/TagPicker.jsx";
const DAY_LABELS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
const DAY_KEYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const DAY_COLORS = [
  "bg-[#E87A5A]/10 text-[#E87A5A]",
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-600",
  "bg-purple-100 text-purple-700",
  "bg-teal-100 text-teal-700"
];
const DAY_HEX = ["#E87A5A", "#3B82F6", "#10B981", "#F59E0B", "#F43F5E", "#8B5CF6", "#14B8A6"];
const PERIOD_CONFIG = { morning: { label: "Manhã", emoji: "🌅" }, afternoon: { label: "Tarde", emoji: "☀️" }, evening: { label: "Noite", emoji: "🌙" } };
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
const TAG_CLASS_MAP = {
  blue: "bg-blue-100 text-blue-700",
  purple: "bg-purple-100 text-purple-700",
  green: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  rose: "bg-rose-100 text-rose-600",
  teal: "bg-teal-100 text-teal-700",
  indigo: "bg-indigo-100 text-indigo-700",
  pink: "bg-pink-100 text-pink-700"
};
function tagClass(color) {
  return TAG_CLASS_MAP[color] || "bg-slate-100 text-slate-700";
}
function PeriodIcon({ period, color, "data-collection-item-id": __dataCollectionItemId }) {
  if (!period) return null;
  if (period === "morning") return /* @__PURE__ */ jsxDEV("svg", { "data-source-location": "pages/TaskBoard:44:4", "data-dynamic-content": "true", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", "data-collection-item-id": __dataCollectionItemId, children: [
    /* @__PURE__ */ jsxDEV("circle", { "data-source-location": "pages/TaskBoard:45:6", "data-dynamic-content": "false", cx: "12", cy: "12", r: "4" }, void 0, false, {
      fileName: "/app/src/pages/TaskBoard.jsx",
      lineNumber: 64,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("path", { "data-source-location": "pages/TaskBoard:45:37", "data-dynamic-content": "false", d: "M12 2v2" }, void 0, false, {
      fileName: "/app/src/pages/TaskBoard.jsx",
      lineNumber: 64,
      columnNumber: 112
    }, this),
    /* @__PURE__ */ jsxDEV("path", { "data-source-location": "pages/TaskBoard:45:56", "data-dynamic-content": "false", d: "M12 20v2" }, void 0, false, {
      fileName: "/app/src/pages/TaskBoard.jsx",
      lineNumber: 64,
      columnNumber: 206
    }, this),
    /* @__PURE__ */ jsxDEV("path", { "data-source-location": "pages/TaskBoard:45:76", "data-dynamic-content": "false", d: "m4.93 4.93 1.41 1.41" }, void 0, false, {
      fileName: "/app/src/pages/TaskBoard.jsx",
      lineNumber: 64,
      columnNumber: 301
    }, this),
    /* @__PURE__ */ jsxDEV("path", { "data-source-location": "pages/TaskBoard:45:108", "data-dynamic-content": "false", d: "m17.66 17.66 1.41 1.41" }, void 0, false, {
      fileName: "/app/src/pages/TaskBoard.jsx",
      lineNumber: 64,
      columnNumber: 408
    }, this),
    /* @__PURE__ */ jsxDEV("path", { "data-source-location": "pages/TaskBoard:45:142", "data-dynamic-content": "false", d: "M2 12h2" }, void 0, false, {
      fileName: "/app/src/pages/TaskBoard.jsx",
      lineNumber: 64,
      columnNumber: 518
    }, this),
    /* @__PURE__ */ jsxDEV("path", { "data-source-location": "pages/TaskBoard:45:161", "data-dynamic-content": "false", d: "M20 12h2" }, void 0, false, {
      fileName: "/app/src/pages/TaskBoard.jsx",
      lineNumber: 64,
      columnNumber: 613
    }, this),
    /* @__PURE__ */ jsxDEV("path", { "data-source-location": "pages/TaskBoard:45:181", "data-dynamic-content": "false", d: "m6.34 17.66-1.41 1.41" }, void 0, false, {
      fileName: "/app/src/pages/TaskBoard.jsx",
      lineNumber: 64,
      columnNumber: 709
    }, this),
    /* @__PURE__ */ jsxDEV("path", { "data-source-location": "pages/TaskBoard:45:214", "data-dynamic-content": "false", d: "m19.07 4.93-1.41 1.41" }, void 0, false, {
      fileName: "/app/src/pages/TaskBoard.jsx",
      lineNumber: 64,
      columnNumber: 818
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/pages/TaskBoard.jsx",
    lineNumber: 63,
    columnNumber: 5
  }, this);
  if (period === "afternoon") return /* @__PURE__ */ jsxDEV("svg", { "data-source-location": "pages/TaskBoard:49:4", "data-dynamic-content": "true", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", "data-collection-item-id": __dataCollectionItemId, children: [
    /* @__PURE__ */ jsxDEV("circle", { "data-source-location": "pages/TaskBoard:50:6", "data-dynamic-content": "false", cx: "12", cy: "12", r: "4" }, void 0, false, {
      fileName: "/app/src/pages/TaskBoard.jsx",
      lineNumber: 69,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("path", { "data-source-location": "pages/TaskBoard:50:37", "data-dynamic-content": "false", d: "M12 2v2" }, void 0, false, {
      fileName: "/app/src/pages/TaskBoard.jsx",
      lineNumber: 69,
      columnNumber: 112
    }, this),
    /* @__PURE__ */ jsxDEV("path", { "data-source-location": "pages/TaskBoard:50:56", "data-dynamic-content": "false", d: "M12 20v2" }, void 0, false, {
      fileName: "/app/src/pages/TaskBoard.jsx",
      lineNumber: 69,
      columnNumber: 206
    }, this),
    /* @__PURE__ */ jsxDEV("path", { "data-source-location": "pages/TaskBoard:50:76", "data-dynamic-content": "false", d: "m19.07 4.93-1.41 1.41" }, void 0, false, {
      fileName: "/app/src/pages/TaskBoard.jsx",
      lineNumber: 69,
      columnNumber: 301
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/pages/TaskBoard.jsx",
    lineNumber: 68,
    columnNumber: 5
  }, this);
  return /* @__PURE__ */ jsxDEV("svg", { "data-source-location": "pages/TaskBoard:54:4", "data-dynamic-content": "true", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", "data-collection-item-id": __dataCollectionItemId, children: /* @__PURE__ */ jsxDEV("path", { "data-source-location": "pages/TaskBoard:55:6", "data-dynamic-content": "false", d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" }, void 0, false, {
    fileName: "/app/src/pages/TaskBoard.jsx",
    lineNumber: 74,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/src/pages/TaskBoard.jsx",
    lineNumber: 73,
    columnNumber: 5
  }, this);
}
_c = PeriodIcon;
const PERIOD_ORDER = { none: 0, morning: 1, afternoon: 2, evening: 3 };
function sortDayTasks(tasks) {
  return [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    const ap = PERIOD_ORDER[a.period || "none"] ?? 0;
    const bp = PERIOD_ORDER[b.period || "none"] ?? 0;
    if (ap !== bp) return ap - bp;
    return (a.order || 0) - (b.order || 0);
  });
}
function parseTags(task) {
  try {
    return JSON.parse(task.tags_json || "[]");
  } catch {
    return [];
  }
}
export default function TaskBoard() {
  _s();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [currentDate, setCurrentDate] = useState(/* @__PURE__ */ new Date());
  const [newTasks, setNewTasks] = useState({});
  const [addingTo, setAddingTo] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [showTagManager, setShowTagManager] = useState(false);
  const [showTagPickerFor, setShowTagPickerFor] = useState(null);
  const [showEditTagPicker, setShowEditTagPicker] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("blue");
  const [newTagHex, setNewTagHex] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPeriod, setFilterPeriod] = useState(null);
  const [filterCompleted, setFilterCompleted] = useState(null);
  const touchStart = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const [dragStyle, setDragStyle] = useState({});
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const weekKey = format(weekStart, "yyyy-MM-dd");
  const refreshData = () => {
    base44.entities.Task.list("order", 500).then(setTasks).catch(() => setTasks([]));
    base44.entities.Tag.list().then(setAllTags).catch(() => setAllTags([]));
  };
  useEffect(() => {
    refreshData();
  }, []);
  const tasksByKey = useMemo(() => {
    const map = {};
    ["none", ...DAY_KEYS].forEach((k) => {
      map[k] = [];
    });
    tasks.forEach((t) => {
      if (t.week_start !== weekKey) return;
      const k = t.weekday || "none";
      if (map[k]) map[k].push(t);
      else
        map[k] = [t];
    });
    Object.keys(map).forEach((k) => {
      map[k] = sortDayTasks(map[k]);
    });
    return map;
  }, [tasks, weekKey]);
  const addTask = async (key) => {
    const data = newTasks[key];
    if (!data?.title?.trim()) return;
    const existing = tasksByKey[key] || [];
    const maxOrder = Math.max(...existing.map((t) => t.order || 0), 0);
    const tags = data.tags || [];
    await base44.entities.Task.create({
      title: data.title.trim(),
      weekday: key === "none" ? "none" : key,
      completed: false,
      order: maxOrder + 1,
      week_start: weekKey,
      period: data.period || null,
      description: "",
      tags_json: JSON.stringify(tags)
    });
    setNewTasks((prev) => ({ ...prev, [key]: null }));
    setAddingTo(null);
    refreshData();
  };
  const toggleTask = async (task) => {
    await base44.entities.Task.update(task.id, { completed: !task.completed });
    refreshData();
  };
  const setPeriod = async (task, period) => {
    await base44.entities.Task.update(task.id, { period: task.period === period ? null : period });
    refreshData();
  };
  const deleteTask = async (taskId) => {
    await base44.entities.Task.delete(taskId).catch(() => {
    });
    refreshData();
  };
  const updateTaskDetails = async () => {
    if (!editingTask) return;
    const tags = editingTask._tags || [];
    await base44.entities.Task.update(editingTask.id, {
      description: editingTask.description || "",
      tags_json: JSON.stringify(tags),
      period: editingTask._period !== void 0 ? editingTask._period : editingTask.period
    });
    setEditingTask(null);
    refreshData();
  };
  const clearWeek = async () => {
    const weekTasks = tasks.filter((t) => t.week_start === weekKey);
    for (const t of weekTasks) await base44.entities.Task.delete(t.id).catch(() => {
    });
    refreshData();
  };
  const createTag = async () => {
    const name = newTagName.trim();
    if (!name) return;
    let color = newTagColor;
    if (newTagHex.trim() && /^#[0-9A-Fa-f]{6}$/.test(newTagHex.trim())) color = newTagHex.trim();
    await base44.entities.Tag.create({ name, color });
    setNewTagName("");
    setNewTagHex("");
    setNewTagColor("blue");
    base44.entities.Tag.list().then(setAllTags).catch(() => {
    });
  };
  const deleteTagFromManager = async (tag) => {
    await base44.entities.Tag.delete(tag.id).catch(() => {
    });
    setAllTags((prev) => prev.filter((t) => t.id !== tag.id));
  };
  const setNewTaskField = (key, field, value) => {
    const current = newTasks[key] || { title: "", period: null, tags: [] };
    setNewTasks({ ...newTasks, [key]: { ...current, [field]: value } });
  };
  const filteredTasks = useMemo(() => {
    let result = tasks.filter((t) => t.week_start === weekKey);
    if (searchQuery.trim()) result = result.filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
    if (filterPeriod) result = result.filter((t) => t.period === filterPeriod);
    if (filterCompleted !== null) result = result.filter((t) => t.completed === filterCompleted);
    return result;
  }, [tasks, weekKey, searchQuery, filterPeriod, filterCompleted]);
  const prevWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const nextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
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
    if (Math.abs(dx) > 40 && dx < -60) navigate("/");
  }, [navigate]);
  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    const newWeekday = destination.droppableId;
    await base44.entities.Task.update(draggableId, { weekday: newWeekday === "none" ? "none" : newWeekday });
    const colTasks = tasksByKey[newWeekday] || [];
    if (source.droppableId === destination.droppableId) {
      const moved = colTasks[source.index];
      if (!moved) return refreshData();
      const reordered = [...colTasks];
      reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, moved);
      for (let i = 0; i < reordered.length; i++) {
        await base44.entities.Task.update(reordered[i].id, { order: i }).catch(() => {
        });
      }
    } else {
      const srcCol = tasksByKey[source.droppableId] || [];
      const dstCol = [...tasksByKey[newWeekday] || []];
      const moved = srcCol[source.index];
      if (!moved) return refreshData();
      dstCol.splice(destination.index, 0, moved);
      for (let i = 0; i < dstCol.length; i++) {
        await base44.entities.Task.update(dstCol[i].id, { order: i }).catch(() => {
        });
      }
      const newSrc = srcCol.filter((t) => t.id !== moved.id);
      for (let i = 0; i < newSrc.length; i++) {
        await base44.entities.Task.update(newSrc[i].id, { order: i }).catch(() => {
        });
      }
    }
    refreshData();
  };
  const renderTaskCard = (task, idx, dayIdx) => {
    const tags = parseTags(task);
    const dayColor = DAY_HEX[dayIdx] || DAY_HEX[0];
    const isCompleted = task.completed;
    return /* @__PURE__ */ jsxDEV(Draggable, { "data-source-location": "pages/TaskBoard:259:6", "data-dynamic-content": "true", draggableId: task.id, index: idx, "data-collection-item-id": task?.id, children: (provided, snapshot) => /* @__PURE__ */ jsxDEV(
      "div",
      {
        "data-source-location": "pages/TaskBoard:261:10",
        "data-dynamic-content": "true",
        ref: provided.innerRef,
        ...provided.draggableProps,
        ...provided.dragHandleProps,
        className: `bg-white rounded-xl shadow-sm border transition-all group relative overflow-hidden ${snapshot.isDragging ? "shadow-xl ring-2 ring-[#E87A5A]/30 scale-[1.02]" : "border-border hover:shadow-md"}`,
        children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:269:12", "data-dynamic-content": "true", className: "p-3 cursor-pointer", onClick: () => setEditingTask({ ...task, _tags: tags, _period: task.period }), "data-collection-item-field": "period", "data-collection-item-id": task?.id, children: [
          task.period && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:272:16", "data-dynamic-content": "true", className: "absolute top-2 right-2 opacity-60", children: /* @__PURE__ */ jsxDEV(PeriodIcon, { "data-source-location": "pages/TaskBoard:273:18", "data-dynamic-content": "true", period: task.period, color: dayColor }, void 0, false, {
            fileName: "/app/src/pages/TaskBoard.jsx",
            lineNumber: 292,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/app/src/pages/TaskBoard.jsx",
            lineNumber: 291,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              "data-source-location": "pages/TaskBoard:277:14",
              "data-dynamic-content": "true",
              onClick: (e) => {
                e.stopPropagation();
                deleteTask(task.id);
              },
              className: "absolute top-2 right-2 w-6 h-6 rounded-full bg-white border border-border shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-50 hover:border-rose-200 hover:text-rose-500 z-10",
              style: task.period ? { right: "28px" } : {},
              children: /* @__PURE__ */ jsxDEV(Trash2, { "data-source-location": "pages/TaskBoard:282:16", "data-dynamic-content": "false", className: "w-3 h-3" }, void 0, false, {
                fileName: "/app/src/pages/TaskBoard.jsx",
                lineNumber: 301,
                columnNumber: 17
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/src/pages/TaskBoard.jsx",
              lineNumber: 296,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:286:14", "data-dynamic-content": "false", className: "absolute top-2 left-2 opacity-0 group-hover:opacity-40 transition-opacity", children: /* @__PURE__ */ jsxDEV(GripVertical, { "data-source-location": "pages/TaskBoard:287:16", "data-dynamic-content": "false", className: "w-3 h-3 text-muted-foreground" }, void 0, false, {
            fileName: "/app/src/pages/TaskBoard.jsx",
            lineNumber: 306,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/src/pages/TaskBoard.jsx",
            lineNumber: 305,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:290:14", "data-dynamic-content": "true", className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "pages/TaskBoard:291:16",
                "data-dynamic-content": "true",
                onClick: (e) => {
                  e.stopPropagation();
                  toggleTask(task);
                },
                className: `mt-0.5 w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${isCompleted ? "bg-blue-500 border-blue-500" : "border-slate-300 hover:border-blue-400"}`,
                children: isCompleted && /* @__PURE__ */ jsxDEV(Check, { "data-source-location": "pages/TaskBoard:293:34", "data-dynamic-content": "false", className: "w-2.5 h-2.5 text-white" }, void 0, false, {
                  fileName: "/app/src/pages/TaskBoard.jsx",
                  lineNumber: 312,
                  columnNumber: 35
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/src/pages/TaskBoard.jsx",
                lineNumber: 310,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:295:16", "data-dynamic-content": "true", className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/TaskBoard:296:18", "data-dynamic-content": "true", className: `text-sm ${isCompleted ? "line-through text-muted-foreground/50" : "text-foreground"}`, "data-collection-item-field": "title", "data-collection-item-id": task?.id, children: task.title }, void 0, false, {
                fileName: "/app/src/pages/TaskBoard.jsx",
                lineNumber: 315,
                columnNumber: 19
              }, this),
              tags.length > 0 && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:300:20", "data-dynamic-content": "true", className: "flex flex-wrap gap-1 mt-1.5", children: tags.slice(0, 3).map(
                (tag, i) => /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/TaskBoard:302:24", "data-dynamic-content": "true", className: `px-1.5 py-0.5 rounded-md text-[9px] font-medium ${tagClass(tag.color)}`, "data-collection-item-field": "name", "data-collection-item-id": tag?.id, children: tag.name }, i, false, {
                  fileName: "/app/src/pages/TaskBoard.jsx",
                  lineNumber: 321,
                  columnNumber: 19
                }, this)
              ) }, void 0, false, {
                fileName: "/app/src/pages/TaskBoard.jsx",
                lineNumber: 319,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/TaskBoard.jsx",
              lineNumber: 314,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/TaskBoard.jsx",
            lineNumber: 309,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/TaskBoard.jsx",
          lineNumber: 288,
          columnNumber: 13
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/app/src/pages/TaskBoard.jsx",
        lineNumber: 280,
        columnNumber: 9
      },
      this
    ) }, task.id, false, {
      fileName: "/app/src/pages/TaskBoard.jsx",
      lineNumber: 278,
      columnNumber: 7
    }, this);
  };
  const renderMiniForm = (key) => {
    const current = newTasks[key] || { title: "", period: null, tags: [] };
    return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:318:6", "data-dynamic-content": "true", className: "bg-white rounded-xl p-3 shadow-sm border border-[#E87A5A]/30 space-y-2", children: [
      /* @__PURE__ */ jsxDEV(
        "input",
        {
          "data-source-location": "pages/TaskBoard:319:8",
          "data-dynamic-content": "true",
          autoFocus: true,
          value: current.title,
          onChange: (e) => setNewTaskField(key, "title", e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter") addTask(key);
            if (e.key === "Escape") setAddingTo(null);
          },
          placeholder: "Nova tarefa...",
          className: "w-full text-sm bg-transparent outline-none"
        },
        void 0,
        false,
        {
          fileName: "/app/src/pages/TaskBoard.jsx",
          lineNumber: 338,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:323:8", "data-dynamic-content": "true", className: "flex gap-1", children: Object.entries(PERIOD_CONFIG).map(
        ([p, cfg]) => /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "pages/TaskBoard:325:12",
            "data-dynamic-content": "true",
            onClick: () => setNewTaskField(key, "period", current.period === p ? null : p),
            className: `flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all ${current.period === p ? "bg-[#E87A5A] text-white" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`,
            "data-collection-item-field": "emoji",
            "data-collection-item-id": cfg?.id || cfg?._id,
            children: cfg.emoji
          },
          p,
          false,
          {
            fileName: "/app/src/pages/TaskBoard.jsx",
            lineNumber: 344,
            columnNumber: 11
          },
          this
        )
      ) }, void 0, false, {
        fileName: "/app/src/pages/TaskBoard.jsx",
        lineNumber: 342,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:331:8", "data-dynamic-content": "true", className: "flex flex-wrap gap-1", "data-collection-item-field": "tags", "data-collection-item-id": current?.id || current?._id, children: [
        current.tags.map(
          (tag, i) => /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/TaskBoard:333:12", "data-dynamic-content": "true", className: `px-2 py-0.5 rounded-full text-[9px] font-medium flex items-center gap-0.5 ${tagClass(tag.color)}`, "data-collection-item-field": "name", "data-collection-item-id": tag?.id || tag?._id, children: [
            tag.name,
            /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/TaskBoard:335:14", "data-dynamic-content": "true", onClick: () => {
              const u = current.tags.filter((_, j) => j !== i);
              setNewTaskField(key, "tags", u);
            }, children: /* @__PURE__ */ jsxDEV(X, { "data-source-location": "pages/TaskBoard:336:16", "data-dynamic-content": "false", className: "w-2.5 h-2.5" }, void 0, false, {
              fileName: "/app/src/pages/TaskBoard.jsx",
              lineNumber: 355,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/TaskBoard.jsx",
              lineNumber: 354,
              columnNumber: 15
            }, this)
          ] }, i, true, {
            fileName: "/app/src/pages/TaskBoard.jsx",
            lineNumber: 352,
            columnNumber: 11
          }, this)
        ),
        current.tags.length < 3 && /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "pages/TaskBoard:341:12",
            "data-dynamic-content": "true",
            onClick: () => setShowTagPickerFor(key),
            className: "px-2 py-0.5 rounded-full text-[9px] text-muted-foreground border border-dashed border-border hover:border-[#E87A5A]/50 hover:text-[#E87A5A] transition-all",
            children: "+ tag"
          },
          void 0,
          false,
          {
            fileName: "/app/src/pages/TaskBoard.jsx",
            lineNumber: 360,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/src/pages/TaskBoard.jsx",
        lineNumber: 350,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:347:8", "data-dynamic-content": "true", className: "flex gap-2", children: [
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/TaskBoard:348:10", "data-dynamic-content": "true", onClick: () => addTask(key), className: "flex-1 py-1.5 rounded-lg bg-[#E87A5A] text-white text-xs font-medium hover:bg-[#D4694A] transition-all", children: "Adicionar" }, void 0, false, {
          fileName: "/app/src/pages/TaskBoard.jsx",
          lineNumber: 367,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/TaskBoard:349:10", "data-dynamic-content": "true", onClick: () => setAddingTo(null), className: "px-3 py-1.5 rounded-lg bg-secondary text-muted-foreground text-xs", children: /* @__PURE__ */ jsxDEV(X, { "data-source-location": "pages/TaskBoard:349:130", "data-dynamic-content": "false", className: "w-3 h-3" }, void 0, false, {
          fileName: "/app/src/pages/TaskBoard.jsx",
          lineNumber: 368,
          columnNumber: 205
        }, this) }, void 0, false, {
          fileName: "/app/src/pages/TaskBoard.jsx",
          lineNumber: 368,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/pages/TaskBoard.jsx",
        lineNumber: 366,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/pages/TaskBoard.jsx",
      lineNumber: 337,
      columnNumber: 7
    }, this);
  };
  const renderColumn = (key, label, dayIdx) => {
    const dayTasks = tasksByKey[key] || [];
    const isAdding = addingTo === key;
    const dayInfo = weekDays[dayIdx];
    const dayOfMonth = dayInfo ? format(dayInfo, "d") : key === "none" ? "" : "";
    return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:362:6", "data-dynamic-content": "true", className: "flex-shrink-0 w-[200px] flex flex-col", "data-collection-item-id": key?.["data-collection-item-id"], children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:363:8", "data-dynamic-content": "true", className: `rounded-2xl px-3 py-2.5 mb-3 font-semibold text-xs flex items-center justify-between ${key === "none" ? "bg-slate-100 text-slate-600" : DAY_COLORS[dayIdx]}`, children: [
        /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/TaskBoard:364:10", "data-dynamic-content": "true", "data-collection-item-field": "label", children: label }, void 0, false, {
          fileName: "/app/src/pages/TaskBoard.jsx",
          lineNumber: 383,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/TaskBoard:365:10", "data-dynamic-content": "true", className: "flex items-center gap-1.5", children: [
          dayOfMonth && /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/TaskBoard:366:27", "data-dynamic-content": "true", className: "opacity-70 text-[11px]", "data-collection-item-field": "dayOfMonth", children: dayOfMonth }, void 0, false, {
            fileName: "/app/src/pages/TaskBoard.jsx",
            lineNumber: 385,
            columnNumber: 28
          }, this),
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/TaskBoard:367:12", "data-dynamic-content": "true", className: "bg-white/20 rounded-full px-1.5 py-0.5 text-[10px]", children: dayTasks.length }, void 0, false, {
            fileName: "/app/src/pages/TaskBoard.jsx",
            lineNumber: 386,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/TaskBoard.jsx",
          lineNumber: 384,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/pages/TaskBoard.jsx",
        lineNumber: 382,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(Droppable, { "data-source-location": "pages/TaskBoard:371:8", "data-dynamic-content": "true", droppableId: key, type: "TASK", children: (provided, snapshot) => /* @__PURE__ */ jsxDEV(
        "div",
        {
          "data-source-location": "pages/TaskBoard:373:12",
          "data-dynamic-content": "true",
          ref: provided.innerRef,
          ...provided.droppableProps,
          className: `flex-1 space-y-2 rounded-xl p-1 transition-colors ${snapshot.isDraggingOver ? "bg-[#E87A5A]/5" : ""}`,
          "data-collection-item-field": "placeholder",
          "data-collection-item-id": provided?.id || provided?._id,
          children: [
            dayTasks.map((task, idx) => renderTaskCard(task, idx, dayIdx)),
            provided.placeholder,
            isAdding ? renderMiniForm(key) : /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/TaskBoard:382:16", "data-dynamic-content": "true", onClick: () => {
              setNewTasks({ ...newTasks, [key]: { title: "", period: null, tags: [] } });
              setAddingTo(key);
            }, className: "w-full flex items-center justify-center gap-1 py-3 rounded-xl border-2 border-dashed border-border text-muted-foreground/60 hover:text-[#E87A5A] hover:border-[#E87A5A]/30 transition-all text-xs", children: [
              /* @__PURE__ */ jsxDEV(Plus, { "data-source-location": "pages/TaskBoard:386:18", "data-dynamic-content": "false", className: "w-3 h-3" }, void 0, false, {
                fileName: "/app/src/pages/TaskBoard.jsx",
                lineNumber: 405,
                columnNumber: 19
              }, this),
              " Nova tarefa"
            ] }, void 0, true, {
              fileName: "/app/src/pages/TaskBoard.jsx",
              lineNumber: 401,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/src/pages/TaskBoard.jsx",
          lineNumber: 392,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "/app/src/pages/TaskBoard.jsx",
        lineNumber: 390,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/pages/TaskBoard.jsx",
      lineNumber: 381,
      columnNumber: 7
    }, this);
  };
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      "data-source-location": "pages/TaskBoard:397:4",
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
      children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:406:6", "data-dynamic-content": "true", style: dragStyle, className: "flex-1 flex flex-col", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:408:8", "data-dynamic-content": "true", className: "bg-white border-b border-border px-4 py-3", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:409:10", "data-dynamic-content": "true", className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:410:12", "data-dynamic-content": "true", className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/TaskBoard:411:14", "data-dynamic-content": "true", onClick: () => navigate("/"), className: "w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all", children: /* @__PURE__ */ jsxDEV(ArrowLeft, { "data-source-location": "pages/TaskBoard:412:16", "data-dynamic-content": "false", className: "w-5 h-5" }, void 0, false, {
                  fileName: "/app/src/pages/TaskBoard.jsx",
                  lineNumber: 431,
                  columnNumber: 17
                }, this) }, void 0, false, {
                  fileName: "/app/src/pages/TaskBoard.jsx",
                  lineNumber: 430,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:414:14", "data-dynamic-content": "true", children: [
                  /* @__PURE__ */ jsxDEV("h1", { "data-source-location": "pages/TaskBoard:415:16", "data-dynamic-content": "false", className: "text-lg font-bold text-foreground", children: "Tarefas" }, void 0, false, {
                    fileName: "/app/src/pages/TaskBoard.jsx",
                    lineNumber: 434,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/TaskBoard:416:16", "data-dynamic-content": "true", className: "text-[11px] text-muted-foreground", children: [
                    format(weekStart, "d", { locale: pt }),
                    " - ",
                    format(weekEnd, "d 'de' MMM", { locale: pt })
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/TaskBoard.jsx",
                    lineNumber: 435,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/TaskBoard.jsx",
                  lineNumber: 433,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/TaskBoard.jsx",
                lineNumber: 429,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:421:12", "data-dynamic-content": "true", className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/TaskBoard:422:14", "data-dynamic-content": "true", onClick: prevWeek, className: "w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-border transition-all", children: /* @__PURE__ */ jsxDEV(ChevronLeft, { "data-source-location": "pages/TaskBoard:423:16", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/src/pages/TaskBoard.jsx",
                  lineNumber: 442,
                  columnNumber: 17
                }, this) }, void 0, false, {
                  fileName: "/app/src/pages/TaskBoard.jsx",
                  lineNumber: 441,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/TaskBoard:425:14", "data-dynamic-content": "true", className: "text-xs font-semibold text-foreground min-w-[60px] text-center", children: format(weekStart, "MMM", { locale: pt }) }, void 0, false, {
                  fileName: "/app/src/pages/TaskBoard.jsx",
                  lineNumber: 444,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/TaskBoard:426:14", "data-dynamic-content": "true", onClick: nextWeek, className: "w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-border transition-all", children: /* @__PURE__ */ jsxDEV(ChevronRight, { "data-source-location": "pages/TaskBoard:427:16", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/src/pages/TaskBoard.jsx",
                  lineNumber: 446,
                  columnNumber: 17
                }, this) }, void 0, false, {
                  fileName: "/app/src/pages/TaskBoard.jsx",
                  lineNumber: 445,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/TaskBoard.jsx",
                lineNumber: 440,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/TaskBoard.jsx",
              lineNumber: 428,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:431:10", "data-dynamic-content": "true", className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/TaskBoard:432:12", "data-dynamic-content": "true", onClick: () => setShowSearch(true), className: "py-2 px-3 rounded-xl bg-secondary text-xs font-medium text-muted-foreground flex items-center gap-1 hover:bg-border transition-all", children: [
                /* @__PURE__ */ jsxDEV(Search, { "data-source-location": "pages/TaskBoard:433:14", "data-dynamic-content": "false", className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/src/pages/TaskBoard.jsx",
                  lineNumber: 452,
                  columnNumber: 15
                }, this),
                " Pesquisar"
              ] }, void 0, true, {
                fileName: "/app/src/pages/TaskBoard.jsx",
                lineNumber: 451,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/TaskBoard:435:12", "data-dynamic-content": "true", onClick: () => setFilterPeriod(filterPeriod ? null : "morning"), className: `py-2 px-3 rounded-xl text-xs font-medium flex items-center gap-1 transition-all ${filterPeriod ? "bg-[#E87A5A] text-white" : "bg-secondary text-muted-foreground hover:bg-border"}`, children: [
                /* @__PURE__ */ jsxDEV(Filter, { "data-source-location": "pages/TaskBoard:436:14", "data-dynamic-content": "false", className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/src/pages/TaskBoard.jsx",
                  lineNumber: 455,
                  columnNumber: 15
                }, this),
                " ",
                filterPeriod ? PERIOD_CONFIG[filterPeriod]?.emoji : "Período"
              ] }, void 0, true, {
                fileName: "/app/src/pages/TaskBoard.jsx",
                lineNumber: 454,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "pages/TaskBoard:438:12",
                  "data-dynamic-content": "true",
                  onClick: () => setFilterCompleted(filterCompleted === null ? false : filterCompleted === false ? true : null),
                  className: `py-2 px-3 rounded-xl text-xs font-medium flex items-center gap-1 transition-all ${filterCompleted !== null ? "bg-[#E87A5A] text-white" : "bg-secondary text-muted-foreground hover:bg-border"}`,
                  children: [
                    /* @__PURE__ */ jsxDEV(Check, { "data-source-location": "pages/TaskBoard:440:14", "data-dynamic-content": "false", className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "/app/src/pages/TaskBoard.jsx",
                      lineNumber: 459,
                      columnNumber: 15
                    }, this),
                    filterCompleted === null ? "Todas" : filterCompleted ? "Concluídas" : "Por fazer"
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/src/pages/TaskBoard.jsx",
                  lineNumber: 457,
                  columnNumber: 13
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/TaskBoard:443:12", "data-dynamic-content": "true", onClick: () => setShowTagManager(true), className: "py-2 px-3 rounded-xl bg-secondary text-xs font-medium text-muted-foreground flex items-center gap-1 hover:bg-border transition-all", children: [
                /* @__PURE__ */ jsxDEV(Tags, { "data-source-location": "pages/TaskBoard:444:14", "data-dynamic-content": "false", className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/src/pages/TaskBoard.jsx",
                  lineNumber: 463,
                  columnNumber: 15
                }, this),
                " ",
                /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/TaskBoard:444:47", "data-dynamic-content": "false", className: "hidden sm:inline", children: "Tags" }, void 0, false, {
                  fileName: "/app/src/pages/TaskBoard.jsx",
                  lineNumber: 463,
                  columnNumber: 123
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/TaskBoard.jsx",
                lineNumber: 462,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/TaskBoard:446:12", "data-dynamic-content": "true", onClick: clearWeek, className: "py-2 px-3 rounded-xl bg-rose-50 text-rose-600 text-xs font-medium flex items-center gap-1 hover:bg-rose-100 transition-all", children: /* @__PURE__ */ jsxDEV(Trash2, { "data-source-location": "pages/TaskBoard:447:14", "data-dynamic-content": "false", className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/src/pages/TaskBoard.jsx",
                lineNumber: 466,
                columnNumber: 15
              }, this) }, void 0, false, {
                fileName: "/app/src/pages/TaskBoard.jsx",
                lineNumber: 465,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/TaskBoard.jsx",
              lineNumber: 450,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/TaskBoard.jsx",
            lineNumber: 427,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV(AnimatePresence, { "data-source-location": "pages/TaskBoard:453:8", "data-dynamic-content": "true", children: filterPeriod && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:455:12", "data-dynamic-content": "true", className: "flex gap-2 px-4 py-2 bg-white border-b border-border", children: Object.entries(PERIOD_CONFIG).map(
            ([p, cfg]) => /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "pages/TaskBoard:457:16",
                "data-dynamic-content": "true",
                onClick: () => setFilterPeriod(p === filterPeriod ? null : p),
                className: `flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${p === filterPeriod ? "bg-[#E87A5A] text-white" : "bg-secondary text-muted-foreground"}`,
                "data-collection-item-field": "emoji",
                "data-collection-item-id": cfg?.id || cfg?._id,
                children: [
                  cfg.emoji,
                  " ",
                  cfg.label
                ]
              },
              p,
              true,
              {
                fileName: "/app/src/pages/TaskBoard.jsx",
                lineNumber: 476,
                columnNumber: 13
              },
              this
            )
          ) }, void 0, false, {
            fileName: "/app/src/pages/TaskBoard.jsx",
            lineNumber: 474,
            columnNumber: 11
          }, this) }, void 0, false, {
            fileName: "/app/src/pages/TaskBoard.jsx",
            lineNumber: 472,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV(AnimatePresence, { "data-source-location": "pages/TaskBoard:467:8", "data-dynamic-content": "true", children: showSearch && /* @__PURE__ */ jsxDEV(
            motion.div,
            {
              "data-source-location": "pages/TaskBoard:469:12",
              "data-dynamic-content": "true",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              className: "fixed inset-0 z-50 bg-black/20 flex items-end sm:items-center justify-center",
              onClick: () => setShowSearch(false),
              children: /* @__PURE__ */ jsxDEV(
                motion.div,
                {
                  "data-source-location": "pages/TaskBoard:472:14",
                  "data-dynamic-content": "true",
                  initial: { y: "100%" },
                  animate: { y: 0 },
                  exit: { y: "100%" },
                  className: "bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm p-5 shadow-xl",
                  onClick: (e) => e.stopPropagation(),
                  children: [
                    /* @__PURE__ */ jsxDEV("h3", { "data-source-location": "pages/TaskBoard:474:16", "data-dynamic-content": "false", className: "font-bold text-foreground mb-3", children: "Pesquisar Tarefas" }, void 0, false, {
                      fileName: "/app/src/pages/TaskBoard.jsx",
                      lineNumber: 493,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV(
                      "input",
                      {
                        "data-source-location": "pages/TaskBoard:475:16",
                        "data-dynamic-content": "true",
                        value: searchQuery,
                        onChange: (e) => setSearchQuery(e.target.value),
                        placeholder: "Escreve para pesquisar...",
                        autoFocus: true,
                        className: "w-full px-4 py-3 rounded-xl border border-border text-sm outline-none focus:border-[#E87A5A]/50 transition-all"
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/src/pages/TaskBoard.jsx",
                        lineNumber: 494,
                        columnNumber: 17
                      },
                      this
                    ),
                    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:477:16", "data-dynamic-content": "true", className: "flex gap-2 mt-3 flex-wrap", children: [
                      /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/TaskBoard:478:18", "data-dynamic-content": "true", onClick: () => {
                        setFilterPeriod(null);
                        setFilterCompleted(null);
                      }, className: `py-1.5 px-3 rounded-lg text-xs font-medium ${filterPeriod === null && filterCompleted === null ? "bg-[#E87A5A] text-white" : "bg-secondary"}`, children: "Todos" }, void 0, false, {
                        fileName: "/app/src/pages/TaskBoard.jsx",
                        lineNumber: 497,
                        columnNumber: 19
                      }, this),
                      Object.entries(PERIOD_CONFIG).map(
                        ([p, cfg]) => /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/TaskBoard:480:20", "data-dynamic-content": "true", onClick: () => setFilterPeriod(p === filterPeriod ? null : p), className: `py-1.5 px-3 rounded-lg text-xs font-medium ${filterPeriod === p ? "bg-[#E87A5A] text-white" : "bg-secondary"}`, "data-collection-item-field": "emoji", "data-collection-item-id": cfg?.id || cfg?._id, children: [
                          cfg.emoji,
                          " ",
                          cfg.label
                        ] }, p, true, {
                          fileName: "/app/src/pages/TaskBoard.jsx",
                          lineNumber: 499,
                          columnNumber: 17
                        }, this)
                      ),
                      /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/TaskBoard:482:18", "data-dynamic-content": "true", onClick: () => setFilterCompleted(filterCompleted === null ? false : null), className: `py-1.5 px-3 rounded-lg text-xs font-medium ${filterCompleted === false ? "bg-[#E87A5A] text-white" : "bg-secondary"}`, children: "Por fazer" }, void 0, false, {
                        fileName: "/app/src/pages/TaskBoard.jsx",
                        lineNumber: 501,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/TaskBoard:483:18", "data-dynamic-content": "true", onClick: () => setFilterCompleted(filterCompleted === null ? true : null), className: `py-1.5 px-3 rounded-lg text-xs font-medium ${filterCompleted === true ? "bg-[#E87A5A] text-white" : "bg-secondary"}`, children: "Concluídas" }, void 0, false, {
                        fileName: "/app/src/pages/TaskBoard.jsx",
                        lineNumber: 502,
                        columnNumber: 19
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/src/pages/TaskBoard.jsx",
                      lineNumber: 496,
                      columnNumber: 17
                    }, this),
                    searchQuery && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:486:18", "data-dynamic-content": "true", className: "mt-3 space-y-1 max-h-[200px] overflow-y-auto", children: filteredTasks.slice(0, 10).map(
                      (t) => /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:488:22", "data-dynamic-content": "true", className: "text-xs px-3 py-2 rounded-lg bg-secondary/50 text-foreground", "data-collection-item-id": t?.id, "data-collection-item-field": "title", children: t.title }, t.id, false, {
                        fileName: "/app/src/pages/TaskBoard.jsx",
                        lineNumber: 507,
                        columnNumber: 17
                      }, this)
                    ) }, void 0, false, {
                      fileName: "/app/src/pages/TaskBoard.jsx",
                      lineNumber: 505,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/TaskBoard:492:16", "data-dynamic-content": "true", onClick: () => setShowSearch(false), className: "w-full mt-4 py-2.5 rounded-xl bg-secondary text-sm font-medium hover:bg-border transition-all", children: "Fechar" }, void 0, false, {
                      fileName: "/app/src/pages/TaskBoard.jsx",
                      lineNumber: 511,
                      columnNumber: 17
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/src/pages/TaskBoard.jsx",
                  lineNumber: 491,
                  columnNumber: 15
                },
                this
              )
            },
            void 0,
            false,
            {
              fileName: "/app/src/pages/TaskBoard.jsx",
              lineNumber: 488,
              columnNumber: 11
            },
            this
          ) }, void 0, false, {
            fileName: "/app/src/pages/TaskBoard.jsx",
            lineNumber: 486,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV(DragDropContext, { "data-source-location": "pages/TaskBoard:499:8", "data-dynamic-content": "true", onDragEnd, children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:500:10", "data-dynamic-content": "true", className: "flex-1 overflow-auto", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:501:12", "data-dynamic-content": "true", className: "flex gap-3 p-4 min-h-full", style: { minWidth: `${(DAY_KEYS.length + 1) * 225}px` }, children: [
            DAY_KEYS.map((key, idx) => renderColumn(key, DAY_LABELS[idx].substring(0, 3), idx)),
            renderColumn("none", "Sem dia", 0)
          ] }, void 0, true, {
            fileName: "/app/src/pages/TaskBoard.jsx",
            lineNumber: 520,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "/app/src/pages/TaskBoard.jsx",
            lineNumber: 519,
            columnNumber: 11
          }, this) }, void 0, false, {
            fileName: "/app/src/pages/TaskBoard.jsx",
            lineNumber: 518,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/TaskBoard.jsx",
          lineNumber: 425,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV(
          TagPicker,
          {
            "data-source-location": "pages/TaskBoard:512:6",
            "data-dynamic-content": "true",
            open: !!showTagPickerFor,
            onClose: () => setShowTagPickerFor(null),
            multiSelect: true,
            selectedTags: showTagPickerFor && newTasks[showTagPickerFor] ? newTasks[showTagPickerFor].tags || [] : [],
            onMultiSelect: (tags) => {
              if (showTagPickerFor) setNewTaskField(showTagPickerFor, "tags", tags);
            }
          },
          void 0,
          false,
          {
            fileName: "/app/src/pages/TaskBoard.jsx",
            lineNumber: 531,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          TagPicker,
          {
            "data-source-location": "pages/TaskBoard:523:6",
            "data-dynamic-content": "true",
            open: showEditTagPicker,
            onClose: () => setShowEditTagPicker(false),
            multiSelect: true,
            selectedTags: editingTask?._tags || [],
            onMultiSelect: (tags) => {
              if (editingTask) setEditingTask({ ...editingTask, _tags: tags });
            }
          },
          void 0,
          false,
          {
            fileName: "/app/src/pages/TaskBoard.jsx",
            lineNumber: 542,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(AnimatePresence, { "data-source-location": "pages/TaskBoard:534:6", "data-dynamic-content": "true", children: editingTask && /* @__PURE__ */ jsxDEV(
          motion.div,
          {
            "data-source-location": "pages/TaskBoard:536:10",
            "data-dynamic-content": "true",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "fixed inset-0 z-50 bg-black/30 flex items-end sm:items-center justify-center",
            onClick: () => setEditingTask(null),
            children: /* @__PURE__ */ jsxDEV(
              motion.div,
              {
                "data-source-location": "pages/TaskBoard:539:12",
                "data-dynamic-content": "true",
                initial: { y: "100%" },
                animate: { y: 0 },
                exit: { y: "100%" },
                transition: { type: "spring", damping: 25 },
                className: "bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md p-5 max-h-[80vh] overflow-y-auto shadow-xl",
                onClick: (e) => e.stopPropagation(),
                children: [
                  /* @__PURE__ */ jsxDEV("h3", { "data-source-location": "pages/TaskBoard:543:14", "data-dynamic-content": "false", className: "font-bold text-foreground mb-4", children: "Editar Tarefa" }, void 0, false, {
                    fileName: "/app/src/pages/TaskBoard.jsx",
                    lineNumber: 562,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:544:14", "data-dynamic-content": "true", className: "space-y-3", children: [
                    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:545:16", "data-dynamic-content": "true", children: [
                      /* @__PURE__ */ jsxDEV("label", { "data-source-location": "pages/TaskBoard:546:18", "data-dynamic-content": "false", className: "text-xs font-medium text-muted-foreground", children: "Nome" }, void 0, false, {
                        fileName: "/app/src/pages/TaskBoard.jsx",
                        lineNumber: 565,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/TaskBoard:547:18", "data-dynamic-content": "true", className: "text-sm font-semibold text-foreground mt-0.5", "data-collection-item-field": "title", "data-collection-item-id": editingTask?.id || editingTask?._id, children: editingTask.title }, void 0, false, {
                        fileName: "/app/src/pages/TaskBoard.jsx",
                        lineNumber: 566,
                        columnNumber: 19
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/src/pages/TaskBoard.jsx",
                      lineNumber: 564,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:549:16", "data-dynamic-content": "true", children: [
                      /* @__PURE__ */ jsxDEV("label", { "data-source-location": "pages/TaskBoard:550:18", "data-dynamic-content": "false", className: "text-xs font-medium text-muted-foreground", children: "Período do dia" }, void 0, false, {
                        fileName: "/app/src/pages/TaskBoard.jsx",
                        lineNumber: 569,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:551:18", "data-dynamic-content": "true", className: "flex gap-2 mt-1", children: Object.entries(PERIOD_CONFIG).map(
                        ([p, cfg]) => /* @__PURE__ */ jsxDEV(
                          "button",
                          {
                            "data-source-location": "pages/TaskBoard:553:22",
                            "data-dynamic-content": "true",
                            onClick: () => setEditingTask({ ...editingTask, _period: editingTask._period === p ? null : p }),
                            className: `flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${(editingTask._period ?? editingTask.period) === p ? "bg-[#E87A5A] text-white shadow-md" : "bg-secondary text-muted-foreground hover:bg-border"}`,
                            "data-collection-item-field": "emoji",
                            "data-collection-item-id": cfg?.id || cfg?._id,
                            children: [
                              cfg.emoji,
                              " ",
                              cfg.label
                            ]
                          },
                          p,
                          true,
                          {
                            fileName: "/app/src/pages/TaskBoard.jsx",
                            lineNumber: 572,
                            columnNumber: 19
                          },
                          this
                        )
                      ) }, void 0, false, {
                        fileName: "/app/src/pages/TaskBoard.jsx",
                        lineNumber: 570,
                        columnNumber: 19
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/src/pages/TaskBoard.jsx",
                      lineNumber: 568,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:564:16", "data-dynamic-content": "true", children: [
                      /* @__PURE__ */ jsxDEV("label", { "data-source-location": "pages/TaskBoard:565:18", "data-dynamic-content": "false", className: "text-xs font-medium text-muted-foreground", children: "Descrição / Nota" }, void 0, false, {
                        fileName: "/app/src/pages/TaskBoard.jsx",
                        lineNumber: 584,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ jsxDEV(
                        "textarea",
                        {
                          "data-source-location": "pages/TaskBoard:566:18",
                          "data-dynamic-content": "true",
                          value: editingTask.description || "",
                          onChange: (e) => setEditingTask({ ...editingTask, description: e.target.value }),
                          placeholder: "Adiciona uma nota...",
                          className: "w-full mt-1 px-3 py-2 rounded-xl border border-border bg-secondary/50 text-sm resize-none h-20 outline-none focus:border-[#E87A5A]/50 transition-all"
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/src/pages/TaskBoard.jsx",
                          lineNumber: 585,
                          columnNumber: 19
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/src/pages/TaskBoard.jsx",
                      lineNumber: 583,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:571:16", "data-dynamic-content": "true", children: [
                      /* @__PURE__ */ jsxDEV("label", { "data-source-location": "pages/TaskBoard:572:18", "data-dynamic-content": "false", className: "text-xs font-medium text-muted-foreground", children: "Tags (até 3)" }, void 0, false, {
                        fileName: "/app/src/pages/TaskBoard.jsx",
                        lineNumber: 591,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:573:18", "data-dynamic-content": "true", className: "flex flex-wrap gap-1.5 mt-1", children: [
                        (editingTask._tags || []).map(
                          (tag, i) => /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/TaskBoard:575:22", "data-dynamic-content": "true", className: `px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${tagClass(tag.color)}`, "data-collection-item-field": "name", "data-collection-item-id": tag?.id || tag?._id, children: [
                            tag.name,
                            /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/TaskBoard:577:24", "data-dynamic-content": "true", onClick: () => {
                              const updated = [...editingTask._tags];
                              updated.splice(i, 1);
                              setEditingTask({ ...editingTask, _tags: updated });
                            }, children: /* @__PURE__ */ jsxDEV(X, { "data-source-location": "pages/TaskBoard:581:27", "data-dynamic-content": "false", className: "w-3 h-3" }, void 0, false, {
                              fileName: "/app/src/pages/TaskBoard.jsx",
                              lineNumber: 600,
                              columnNumber: 24
                            }, this) }, void 0, false, {
                              fileName: "/app/src/pages/TaskBoard.jsx",
                              lineNumber: 596,
                              columnNumber: 25
                            }, this)
                          ] }, i, true, {
                            fileName: "/app/src/pages/TaskBoard.jsx",
                            lineNumber: 594,
                            columnNumber: 19
                          }, this)
                        ),
                        (!editingTask._tags || editingTask._tags.length < 3) && /* @__PURE__ */ jsxDEV(
                          "button",
                          {
                            "data-source-location": "pages/TaskBoard:585:22",
                            "data-dynamic-content": "true",
                            onClick: () => setShowEditTagPicker(true),
                            className: "px-3 py-1 rounded-full text-xs border border-dashed border-border text-muted-foreground hover:border-[#E87A5A]/50 transition-all",
                            children: "+ tag"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/src/pages/TaskBoard.jsx",
                            lineNumber: 604,
                            columnNumber: 19
                          },
                          this
                        )
                      ] }, void 0, true, {
                        fileName: "/app/src/pages/TaskBoard.jsx",
                        lineNumber: 592,
                        columnNumber: 19
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/src/pages/TaskBoard.jsx",
                      lineNumber: 590,
                      columnNumber: 17
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/TaskBoard.jsx",
                    lineNumber: 563,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:593:14", "data-dynamic-content": "true", className: "flex gap-2 mt-5", children: [
                    /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/TaskBoard:594:16", "data-dynamic-content": "true", onClick: () => setEditingTask(null), className: "flex-1 py-2.5 rounded-xl bg-secondary text-sm font-medium text-muted-foreground hover:bg-border transition-all", children: "Cancelar" }, void 0, false, {
                      fileName: "/app/src/pages/TaskBoard.jsx",
                      lineNumber: 613,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/TaskBoard:595:16", "data-dynamic-content": "true", onClick: updateTaskDetails, className: "flex-1 py-2.5 rounded-xl bg-[#E87A5A] text-white text-sm font-medium hover:bg-[#D4694A] transition-all", children: "Guardar" }, void 0, false, {
                      fileName: "/app/src/pages/TaskBoard.jsx",
                      lineNumber: 614,
                      columnNumber: 17
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/TaskBoard.jsx",
                    lineNumber: 612,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/src/pages/TaskBoard.jsx",
                lineNumber: 558,
                columnNumber: 13
              },
              this
            )
          },
          void 0,
          false,
          {
            fileName: "/app/src/pages/TaskBoard.jsx",
            lineNumber: 555,
            columnNumber: 9
          },
          this
        ) }, void 0, false, {
          fileName: "/app/src/pages/TaskBoard.jsx",
          lineNumber: 553,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV(AnimatePresence, { "data-source-location": "pages/TaskBoard:603:6", "data-dynamic-content": "true", children: showTagManager && /* @__PURE__ */ jsxDEV(
          motion.div,
          {
            "data-source-location": "pages/TaskBoard:605:10",
            "data-dynamic-content": "true",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "fixed inset-0 z-50 bg-black/30 flex items-end sm:items-center justify-center",
            onClick: () => setShowTagManager(false),
            children: /* @__PURE__ */ jsxDEV(
              motion.div,
              {
                "data-source-location": "pages/TaskBoard:608:12",
                "data-dynamic-content": "true",
                initial: { y: "100%" },
                animate: { y: 0 },
                exit: { y: "100%" },
                className: "bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm p-5 shadow-xl",
                onClick: (e) => e.stopPropagation(),
                children: [
                  /* @__PURE__ */ jsxDEV("h3", { "data-source-location": "pages/TaskBoard:611:14", "data-dynamic-content": "false", className: "font-bold text-foreground mb-4 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxDEV(Tags, { "data-source-location": "pages/TaskBoard:611:85", "data-dynamic-content": "false", className: "w-4 h-4 text-[#E87A5A]" }, void 0, false, {
                      fileName: "/app/src/pages/TaskBoard.jsx",
                      lineNumber: 630,
                      columnNumber: 161
                    }, this),
                    " Gerir Tags"
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/TaskBoard.jsx",
                    lineNumber: 630,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:612:14", "data-dynamic-content": "true", className: "flex gap-2 mb-2", children: [
                    /* @__PURE__ */ jsxDEV(
                      "input",
                      {
                        "data-source-location": "pages/TaskBoard:613:16",
                        "data-dynamic-content": "true",
                        value: newTagName,
                        onChange: (e) => setNewTagName(e.target.value),
                        onKeyDown: (e) => e.key === "Enter" && createTag(),
                        placeholder: "Nova tag...",
                        className: "flex-1 px-3 py-2 rounded-xl border border-border text-sm outline-none focus:border-[#E87A5A]/50 transition-all"
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/src/pages/TaskBoard.jsx",
                        lineNumber: 632,
                        columnNumber: 17
                      },
                      this
                    ),
                    /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/TaskBoard:616:16", "data-dynamic-content": "true", onClick: createTag, className: "px-4 py-2 rounded-xl bg-[#E87A5A] text-white text-sm font-medium hover:bg-[#D4694A] transition-all", children: /* @__PURE__ */ jsxDEV(Plus, { "data-source-location": "pages/TaskBoard:616:155", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                      fileName: "/app/src/pages/TaskBoard.jsx",
                      lineNumber: 635,
                      columnNumber: 230
                    }, this) }, void 0, false, {
                      fileName: "/app/src/pages/TaskBoard.jsx",
                      lineNumber: 635,
                      columnNumber: 17
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/TaskBoard.jsx",
                    lineNumber: 631,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:618:14", "data-dynamic-content": "true", className: "flex gap-1.5 mb-3 flex-wrap", children: [
                    PRESET_COLORS.map(
                      (c, __arrIdx__) => /* @__PURE__ */ jsxDEV(
                        "button",
                        {
                          "data-source-location": "pages/TaskBoard:620:18",
                          "data-dynamic-content": "true",
                          onClick: () => {
                            setNewTagColor(c.key);
                            setNewTagHex("");
                          },
                          className: `w-7 h-7 rounded-full border-2 transition-all ${newTagColor === c.key && !newTagHex ? "border-[#E87A5A] scale-110 shadow-md" : "border-transparent opacity-70 hover:opacity-100"}`,
                          style: { backgroundColor: c.hex },
                          title: c.key,
                          "data-arr-index": __arrIdx__,
                          "data-arr-variable-name": "PRESET_COLORS"
                        },
                        c.key,
                        false,
                        {
                          fileName: "/app/src/pages/TaskBoard.jsx",
                          lineNumber: 639,
                          columnNumber: 15
                        },
                        this
                      )
                    ),
                    /* @__PURE__ */ jsxDEV(
                      "input",
                      {
                        "data-source-location": "pages/TaskBoard:624:16",
                        "data-dynamic-content": "true",
                        value: newTagHex,
                        onChange: (e) => {
                          setNewTagHex(e.target.value);
                          if (e.target.value) setNewTagColor("");
                        },
                        placeholder: "#hex",
                        maxLength: 7,
                        className: "w-16 px-2 py-1 rounded-lg border border-border text-[10px] font-mono outline-none"
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/src/pages/TaskBoard.jsx",
                        lineNumber: 643,
                        columnNumber: 17
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/TaskBoard.jsx",
                    lineNumber: 637,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:628:14", "data-dynamic-content": "true", className: "space-y-1.5 max-h-[180px] overflow-y-auto", children: [
                    allTags.length === 0 && /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/TaskBoard:629:41", "data-dynamic-content": "false", className: "text-sm text-muted-foreground text-center py-4", children: "Nenhuma tag" }, void 0, false, {
                      fileName: "/app/src/pages/TaskBoard.jsx",
                      lineNumber: 648,
                      columnNumber: 42
                    }, this),
                    allTags.map(
                      (tag) => /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:631:18", "data-dynamic-content": "true", className: "flex items-center justify-between px-3 py-2 rounded-xl bg-secondary/50 text-sm", "data-collection-item-id": tag?.id, children: [
                        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:632:20", "data-dynamic-content": "true", className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/TaskBoard:633:22", "data-dynamic-content": "true", className: "w-3 h-3 rounded-full", style: { backgroundColor: PRESET_COLORS.find((c) => c.key === tag.color)?.hex || tag.color } }, void 0, false, {
                            fileName: "/app/src/pages/TaskBoard.jsx",
                            lineNumber: 652,
                            columnNumber: 23
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/TaskBoard:634:22", "data-dynamic-content": "true", className: "text-foreground", "data-collection-item-field": "name", "data-collection-item-id": tag?.id, children: tag.name }, void 0, false, {
                            fileName: "/app/src/pages/TaskBoard.jsx",
                            lineNumber: 653,
                            columnNumber: 23
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/src/pages/TaskBoard.jsx",
                          lineNumber: 651,
                          columnNumber: 21
                        }, this),
                        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/TaskBoard:636:20", "data-dynamic-content": "true", onClick: () => deleteTagFromManager(tag), className: "text-muted-foreground hover:text-rose-500 transition-all", children: /* @__PURE__ */ jsxDEV(X, { "data-source-location": "pages/TaskBoard:636:139", "data-dynamic-content": "false", className: "w-3.5 h-3.5" }, void 0, false, {
                          fileName: "/app/src/pages/TaskBoard.jsx",
                          lineNumber: 655,
                          columnNumber: 214
                        }, this) }, void 0, false, {
                          fileName: "/app/src/pages/TaskBoard.jsx",
                          lineNumber: 655,
                          columnNumber: 21
                        }, this)
                      ] }, tag.id, true, {
                        fileName: "/app/src/pages/TaskBoard.jsx",
                        lineNumber: 650,
                        columnNumber: 15
                      }, this)
                    )
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/TaskBoard.jsx",
                    lineNumber: 647,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/TaskBoard:640:14", "data-dynamic-content": "true", onClick: () => setShowTagManager(false), className: "w-full mt-4 py-2.5 rounded-xl bg-secondary text-sm font-medium hover:bg-border transition-all", children: "Fechar" }, void 0, false, {
                    fileName: "/app/src/pages/TaskBoard.jsx",
                    lineNumber: 659,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/src/pages/TaskBoard.jsx",
                lineNumber: 627,
                columnNumber: 13
              },
              this
            )
          },
          void 0,
          false,
          {
            fileName: "/app/src/pages/TaskBoard.jsx",
            lineNumber: 624,
            columnNumber: 9
          },
          this
        ) }, void 0, false, {
          fileName: "/app/src/pages/TaskBoard.jsx",
          lineNumber: 622,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/src/pages/TaskBoard.jsx",
      lineNumber: 416,
      columnNumber: 5
    },
    this
  );
}
_s(TaskBoard, "F02PqgP0pU4OE7utkwbQeSbIi2c=", false, function() {
  return [useNavigate];
});
_c2 = TaskBoard;
var _c, _c2;
$RefreshReg$(_c, "PeriodIcon");
$RefreshReg$(_c2, "TaskBoard");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/pages/TaskBoard.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/pages/TaskBoard.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QUEiLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZU1lbW8iLCJ1c2VDYWxsYmFjayIsInVzZVJlZiIsInVzZU5hdmlnYXRlIiwibW90aW9uIiwiQW5pbWF0ZVByZXNlbmNlIiwiQXJyb3dMZWZ0IiwiUGx1cyIsIkNoZWNrIiwiWCIsIlNlYXJjaCIsIkZpbHRlciIsIlRyYXNoMiIsIlRhZ3MiLCJDaGV2cm9uTGVmdCIsIkNoZXZyb25SaWdodCIsIkdyaXBWZXJ0aWNhbCIsIkRyYWdEcm9wQ29udGV4dCIsIkRyb3BwYWJsZSIsIkRyYWdnYWJsZSIsImJhc2U0NCIsInN0YXJ0T2ZXZWVrIiwiZW5kT2ZXZWVrIiwiYWRkV2Vla3MiLCJzdWJXZWVrcyIsImZvcm1hdCIsImVhY2hEYXlPZkludGVydmFsIiwicHQiLCJUYWdQaWNrZXIiLCJEQVlfTEFCRUxTIiwiREFZX0tFWVMiLCJEQVlfQ09MT1JTIiwiREFZX0hFWCIsIlBFUklPRF9DT05GSUciLCJtb3JuaW5nIiwibGFiZWwiLCJlbW9qaSIsImFmdGVybm9vbiIsImV2ZW5pbmciLCJQUkVTRVRfQ09MT1JTIiwia2V5IiwiaGV4IiwiVEFHX0NMQVNTX01BUCIsImJsdWUiLCJwdXJwbGUiLCJncmVlbiIsImFtYmVyIiwicm9zZSIsInRlYWwiLCJpbmRpZ28iLCJwaW5rIiwidGFnQ2xhc3MiLCJjb2xvciIsIlBlcmlvZEljb24iLCJwZXJpb2QiLCJfX2RhdGFDb2xsZWN0aW9uSXRlbUlkIiwiX2MiLCJQRVJJT0RfT1JERVIiLCJub25lIiwic29ydERheVRhc2tzIiwidGFza3MiLCJzb3J0IiwiYSIsImIiLCJjb21wbGV0ZWQiLCJhcCIsImJwIiwib3JkZXIiLCJwYXJzZVRhZ3MiLCJ0YXNrIiwiSlNPTiIsInBhcnNlIiwidGFnc19qc29uIiwiVGFza0JvYXJkIiwiX3MiLCJuYXZpZ2F0ZSIsInNldFRhc2tzIiwiYWxsVGFncyIsInNldEFsbFRhZ3MiLCJjdXJyZW50RGF0ZSIsInNldEN1cnJlbnREYXRlIiwiRGF0ZSIsIm5ld1Rhc2tzIiwic2V0TmV3VGFza3MiLCJhZGRpbmdUbyIsInNldEFkZGluZ1RvIiwiZWRpdGluZ1Rhc2siLCJzZXRFZGl0aW5nVGFzayIsInNob3dUYWdNYW5hZ2VyIiwic2V0U2hvd1RhZ01hbmFnZXIiLCJzaG93VGFnUGlja2VyRm9yIiwic2V0U2hvd1RhZ1BpY2tlckZvciIsInNob3dFZGl0VGFnUGlja2VyIiwic2V0U2hvd0VkaXRUYWdQaWNrZXIiLCJuZXdUYWdOYW1lIiwic2V0TmV3VGFnTmFtZSIsIm5ld1RhZ0NvbG9yIiwic2V0TmV3VGFnQ29sb3IiLCJuZXdUYWdIZXgiLCJzZXROZXdUYWdIZXgiLCJzaG93U2VhcmNoIiwic2V0U2hvd1NlYXJjaCIsInNlYXJjaFF1ZXJ5Iiwic2V0U2VhcmNoUXVlcnkiLCJmaWx0ZXJQZXJpb2QiLCJzZXRGaWx0ZXJQZXJpb2QiLCJmaWx0ZXJDb21wbGV0ZWQiLCJzZXRGaWx0ZXJDb21wbGV0ZWQiLCJ0b3VjaFN0YXJ0IiwieCIsInkiLCJkcmFnT2Zmc2V0IiwiZHJhZ1N0eWxlIiwic2V0RHJhZ1N0eWxlIiwid2Vla1N0YXJ0Iiwid2Vla1N0YXJ0c09uIiwid2Vla0VuZCIsIndlZWtEYXlzIiwic3RhcnQiLCJlbmQiLCJ3ZWVrS2V5IiwicmVmcmVzaERhdGEiLCJlbnRpdGllcyIsIlRhc2siLCJsaXN0IiwidGhlbiIsImNhdGNoIiwiVGFnIiwidGFza3NCeUtleSIsIm1hcCIsImZvckVhY2giLCJrIiwidCIsIndlZWtfc3RhcnQiLCJ3ZWVrZGF5IiwicHVzaCIsIk9iamVjdCIsImtleXMiLCJhZGRUYXNrIiwiZGF0YSIsInRpdGxlIiwidHJpbSIsImV4aXN0aW5nIiwibWF4T3JkZXIiLCJNYXRoIiwibWF4IiwidGFncyIsImNyZWF0ZSIsImRlc2NyaXB0aW9uIiwic3RyaW5naWZ5IiwicHJldiIsInRvZ2dsZVRhc2siLCJ1cGRhdGUiLCJpZCIsInNldFBlcmlvZCIsImRlbGV0ZVRhc2siLCJ0YXNrSWQiLCJkZWxldGUiLCJ1cGRhdGVUYXNrRGV0YWlscyIsIl90YWdzIiwiX3BlcmlvZCIsInVuZGVmaW5lZCIsImNsZWFyV2VlayIsIndlZWtUYXNrcyIsImZpbHRlciIsImNyZWF0ZVRhZyIsIm5hbWUiLCJ0ZXN0IiwiZGVsZXRlVGFnRnJvbU1hbmFnZXIiLCJ0YWciLCJzZXROZXdUYXNrRmllbGQiLCJmaWVsZCIsInZhbHVlIiwiY3VycmVudCIsImZpbHRlcmVkVGFza3MiLCJyZXN1bHQiLCJ0b0xvd2VyQ2FzZSIsImluY2x1ZGVzIiwicHJldldlZWsiLCJuZXh0V2VlayIsImhhbmRsZVBvaW50ZXJTdGFydCIsImhhbmRsZVBvaW50ZXJNb3ZlIiwidHJhbnNmb3JtIiwidHJhbnNpdGlvbiIsImhhbmRsZVBvaW50ZXJFbmQiLCJkeCIsImFicyIsIm9uRHJhZ0VuZCIsInNvdXJjZSIsImRlc3RpbmF0aW9uIiwiZHJhZ2dhYmxlSWQiLCJkcm9wcGFibGVJZCIsImluZGV4IiwibmV3V2Vla2RheSIsImNvbFRhc2tzIiwibW92ZWQiLCJyZW9yZGVyZWQiLCJzcGxpY2UiLCJpIiwibGVuZ3RoIiwic3JjQ29sIiwiZHN0Q29sIiwibmV3U3JjIiwicmVuZGVyVGFza0NhcmQiLCJpZHgiLCJkYXlJZHgiLCJkYXlDb2xvciIsImlzQ29tcGxldGVkIiwicHJvdmlkZWQiLCJzbmFwc2hvdCIsImlubmVyUmVmIiwiZHJhZ2dhYmxlUHJvcHMiLCJkcmFnSGFuZGxlUHJvcHMiLCJpc0RyYWdnaW5nIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsInJpZ2h0Iiwic2xpY2UiLCJyZW5kZXJNaW5pRm9ybSIsInRhcmdldCIsImVudHJpZXMiLCJwIiwiY2ZnIiwiX2lkIiwidSIsIl8iLCJqIiwicmVuZGVyQ29sdW1uIiwiZGF5VGFza3MiLCJpc0FkZGluZyIsImRheUluZm8iLCJkYXlPZk1vbnRoIiwiZHJvcHBhYmxlUHJvcHMiLCJpc0RyYWdnaW5nT3ZlciIsInBsYWNlaG9sZGVyIiwidG91Y2hlcyIsImNsaWVudFgiLCJjbGllbnRZIiwiY2hhbmdlZFRvdWNoZXMiLCJidXR0b25zIiwibG9jYWxlIiwib3BhY2l0eSIsIm1pbldpZHRoIiwic3Vic3RyaW5nIiwidHlwZSIsImRhbXBpbmciLCJ1cGRhdGVkIiwiYyIsIl9fYXJySWR4X18iLCJiYWNrZ3JvdW5kQ29sb3IiLCJmaW5kIiwiX2MyIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIlRhc2tCb2FyZC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlQ2FsbGJhY2ssIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlTmF2aWdhdGUgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuaW1wb3J0IHsgbW90aW9uLCBBbmltYXRlUHJlc2VuY2UgfSBmcm9tIFwiZnJhbWVyLW1vdGlvblwiO1xuaW1wb3J0IHsgQXJyb3dMZWZ0LCBQbHVzLCBDaGVjaywgWCwgU2VhcmNoLCBGaWx0ZXIsIFRyYXNoMiwgVGFncywgQ2hldnJvbkxlZnQsIENoZXZyb25SaWdodCwgR3JpcFZlcnRpY2FsIH0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xuaW1wb3J0IHsgRHJhZ0Ryb3BDb250ZXh0LCBEcm9wcGFibGUsIERyYWdnYWJsZSB9IGZyb20gXCJAaGVsbG8tcGFuZ2VhL2RuZFwiO1xuaW1wb3J0IHsgYmFzZTQ0IH0gZnJvbSBcIkAvYXBpL2Jhc2U0NENsaWVudFwiO1xuaW1wb3J0IHsgc3RhcnRPZldlZWssIGVuZE9mV2VlaywgYWRkV2Vla3MsIHN1YldlZWtzLCBmb3JtYXQsIGVhY2hEYXlPZkludGVydmFsIH0gZnJvbSBcImRhdGUtZm5zXCI7XG5pbXBvcnQgeyBwdCB9IGZyb20gXCJkYXRlLWZucy9sb2NhbGVcIjtcbmltcG9ydCBUYWdQaWNrZXIgZnJvbSBcIkAvY29tcG9uZW50cy9UYWdQaWNrZXJcIjtcblxuY29uc3QgREFZX0xBQkVMUyA9IFtcIlNlZ3VuZGFcIiwgXCJUZXLDp2FcIiwgXCJRdWFydGFcIiwgXCJRdWludGFcIiwgXCJTZXh0YVwiLCBcIlPDoWJhZG9cIiwgXCJEb21pbmdvXCJdO1xuY29uc3QgREFZX0tFWVMgPSBbXCJtb25kYXlcIiwgXCJ0dWVzZGF5XCIsIFwid2VkbmVzZGF5XCIsIFwidGh1cnNkYXlcIiwgXCJmcmlkYXlcIiwgXCJzYXR1cmRheVwiLCBcInN1bmRheVwiXTtcblxuY29uc3QgREFZX0NPTE9SUyA9IFtcblwiYmctWyNFODdBNUFdLzEwIHRleHQtWyNFODdBNUFdXCIsIFwiYmctYmx1ZS0xMDAgdGV4dC1ibHVlLTcwMFwiLFxuXCJiZy1lbWVyYWxkLTEwMCB0ZXh0LWVtZXJhbGQtNzAwXCIsIFwiYmctYW1iZXItMTAwIHRleHQtYW1iZXItNzAwXCIsXG5cImJnLXJvc2UtMTAwIHRleHQtcm9zZS02MDBcIiwgXCJiZy1wdXJwbGUtMTAwIHRleHQtcHVycGxlLTcwMFwiLFxuXCJiZy10ZWFsLTEwMCB0ZXh0LXRlYWwtNzAwXCJdO1xuXG5cbmNvbnN0IERBWV9IRVggPSBbXCIjRTg3QTVBXCIsIFwiIzNCODJGNlwiLCBcIiMxMEI5ODFcIiwgXCIjRjU5RTBCXCIsIFwiI0Y0M0Y1RVwiLCBcIiM4QjVDRjZcIiwgXCIjMTRCOEE2XCJdO1xuXG5jb25zdCBQRVJJT0RfQ09ORklHID0geyBtb3JuaW5nOiB7IGxhYmVsOiBcIk1hbmjDo1wiLCBlbW9qaTogXCLwn4yFXCIgfSwgYWZ0ZXJub29uOiB7IGxhYmVsOiBcIlRhcmRlXCIsIGVtb2ppOiBcIuKYgO+4j1wiIH0sIGV2ZW5pbmc6IHsgbGFiZWw6IFwiTm9pdGVcIiwgZW1vamk6IFwi8J+MmVwiIH0gfTtcblxuY29uc3QgUFJFU0VUX0NPTE9SUyA9IFtcbnsga2V5OiBcImJsdWVcIiwgaGV4OiBcIiMzQjgyRjZcIiB9LCB7IGtleTogXCJwdXJwbGVcIiwgaGV4OiBcIiM4QjVDRjZcIiB9LFxueyBrZXk6IFwiZ3JlZW5cIiwgaGV4OiBcIiMxMEI5ODFcIiB9LCB7IGtleTogXCJhbWJlclwiLCBoZXg6IFwiI0Y1OUUwQlwiIH0sXG57IGtleTogXCJyb3NlXCIsIGhleDogXCIjRjQzRjVFXCIgfSwgeyBrZXk6IFwidGVhbFwiLCBoZXg6IFwiIzE0QjhBNlwiIH0sXG57IGtleTogXCJpbmRpZ29cIiwgaGV4OiBcIiM2MzY2RjFcIiB9LCB7IGtleTogXCJwaW5rXCIsIGhleDogXCIjRUM0ODk5XCIgfV07XG5cblxuY29uc3QgVEFHX0NMQVNTX01BUCA9IHtcbiAgYmx1ZTogXCJiZy1ibHVlLTEwMCB0ZXh0LWJsdWUtNzAwXCIsIHB1cnBsZTogXCJiZy1wdXJwbGUtMTAwIHRleHQtcHVycGxlLTcwMFwiLFxuICBncmVlbjogXCJiZy1lbWVyYWxkLTEwMCB0ZXh0LWVtZXJhbGQtNzAwXCIsIGFtYmVyOiBcImJnLWFtYmVyLTEwMCB0ZXh0LWFtYmVyLTcwMFwiLFxuICByb3NlOiBcImJnLXJvc2UtMTAwIHRleHQtcm9zZS02MDBcIiwgdGVhbDogXCJiZy10ZWFsLTEwMCB0ZXh0LXRlYWwtNzAwXCIsXG4gIGluZGlnbzogXCJiZy1pbmRpZ28tMTAwIHRleHQtaW5kaWdvLTcwMFwiLCBwaW5rOiBcImJnLXBpbmstMTAwIHRleHQtcGluay03MDBcIlxufTtcblxuZnVuY3Rpb24gdGFnQ2xhc3MoY29sb3IpIHtyZXR1cm4gVEFHX0NMQVNTX01BUFtjb2xvcl0gfHwgXCJiZy1zbGF0ZS0xMDAgdGV4dC1zbGF0ZS03MDBcIjt9XG5cbmZ1bmN0aW9uIFBlcmlvZEljb24oeyBwZXJpb2QsIGNvbG9yLCBcImRhdGEtY29sbGVjdGlvbi1pdGVtLWlkXCI6IF9fZGF0YUNvbGxlY3Rpb25JdGVtSWQgfSkge1xuICBpZiAoIXBlcmlvZCkgcmV0dXJuIG51bGw7XG4gIGlmIChwZXJpb2QgPT09IFwibW9ybmluZ1wiKSByZXR1cm4gKFxuICAgIDxzdmcgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NDQ6NFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHdpZHRoPVwiMTRcIiBoZWlnaHQ9XCIxNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT17Y29sb3J9IHN0cm9rZVdpZHRoPVwiMS41XCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtfX2RhdGFDb2xsZWN0aW9uSXRlbUlkfT5cbiAgICAgIDxjaXJjbGUgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NDU6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjeD1cIjEyXCIgY3k9XCIxMlwiIHI9XCI0XCIgLz48cGF0aCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo0NTozN1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBkPVwiTTEyIDJ2MlwiIC8+PHBhdGggZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NDU6NTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgZD1cIk0xMiAyMHYyXCIgLz48cGF0aCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo0NTo3NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBkPVwibTQuOTMgNC45MyAxLjQxIDEuNDFcIiAvPjxwYXRoIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjQ1OjEwOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBkPVwibTE3LjY2IDE3LjY2IDEuNDEgMS40MVwiIC8+PHBhdGggZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NDU6MTQyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGQ9XCJNMiAxMmgyXCIgLz48cGF0aCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo0NToxNjFcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgZD1cIk0yMCAxMmgyXCIgLz48cGF0aCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo0NToxODFcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgZD1cIm02LjM0IDE3LjY2LTEuNDEgMS40MVwiIC8+PHBhdGggZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NDU6MjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGQ9XCJtMTkuMDcgNC45My0xLjQxIDEuNDFcIiAvPlxuICAgIDwvc3ZnPik7XG5cbiAgaWYgKHBlcmlvZCA9PT0gXCJhZnRlcm5vb25cIikgcmV0dXJuIChcbiAgICA8c3ZnIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjQ5OjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiB3aWR0aD1cIjE0XCIgaGVpZ2h0PVwiMTRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9e2NvbG9yfSBzdHJva2VXaWR0aD1cIjEuNVwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17X19kYXRhQ29sbGVjdGlvbkl0ZW1JZH0+XG4gICAgICA8Y2lyY2xlIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjUwOjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY3g9XCIxMlwiIGN5PVwiMTJcIiByPVwiNFwiIC8+PHBhdGggZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NTA6MzdcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgZD1cIk0xMiAydjJcIiAvPjxwYXRoIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjUwOjU2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGQ9XCJNMTIgMjB2MlwiIC8+PHBhdGggZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NTA6NzZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgZD1cIm0xOS4wNyA0LjkzLTEuNDEgMS40MVwiIC8+XG4gICAgPC9zdmc+KTtcblxuICByZXR1cm4gKFxuICAgIDxzdmcgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NTQ6NFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHdpZHRoPVwiMTRcIiBoZWlnaHQ9XCIxNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT17Y29sb3J9IHN0cm9rZVdpZHRoPVwiMS41XCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtfX2RhdGFDb2xsZWN0aW9uSXRlbUlkfT5cbiAgICAgIDxwYXRoIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjU1OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgZD1cIk0yMSAxMi43OUE5IDkgMCAxIDEgMTEuMjEgMyA3IDcgMCAwIDAgMjEgMTIuNzl6XCIgLz5cbiAgICA8L3N2Zz4pO1xuXG59XG5cbmNvbnN0IFBFUklPRF9PUkRFUiA9IHsgbm9uZTogMCwgbW9ybmluZzogMSwgYWZ0ZXJub29uOiAyLCBldmVuaW5nOiAzIH07XG5cbmZ1bmN0aW9uIHNvcnREYXlUYXNrcyh0YXNrcykge1xuICByZXR1cm4gWy4uLnRhc2tzXS5zb3J0KChhLCBiKSA9PiB7XG4gICAgaWYgKGEuY29tcGxldGVkICE9PSBiLmNvbXBsZXRlZCkgcmV0dXJuIGEuY29tcGxldGVkID8gMSA6IC0xO1xuICAgIGNvbnN0IGFwID0gUEVSSU9EX09SREVSW2EucGVyaW9kIHx8IFwibm9uZVwiXSA/PyAwO1xuICAgIGNvbnN0IGJwID0gUEVSSU9EX09SREVSW2IucGVyaW9kIHx8IFwibm9uZVwiXSA/PyAwO1xuICAgIGlmIChhcCAhPT0gYnApIHJldHVybiBhcCAtIGJwO1xuICAgIHJldHVybiAoYS5vcmRlciB8fCAwKSAtIChiLm9yZGVyIHx8IDApO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcGFyc2VUYWdzKHRhc2spIHtcbiAgdHJ5IHtyZXR1cm4gSlNPTi5wYXJzZSh0YXNrLnRhZ3NfanNvbiB8fCBcIltdXCIpO30gY2F0Y2gge3JldHVybiBbXTt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFRhc2tCb2FyZCgpIHtcbiAgY29uc3QgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpO1xuICBjb25zdCBbdGFza3MsIHNldFRhc2tzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW2FsbFRhZ3MsIHNldEFsbFRhZ3NdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbY3VycmVudERhdGUsIHNldEN1cnJlbnREYXRlXSA9IHVzZVN0YXRlKG5ldyBEYXRlKCkpO1xuICBjb25zdCBbbmV3VGFza3MsIHNldE5ld1Rhc2tzXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW2FkZGluZ1RvLCBzZXRBZGRpbmdUb10gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2VkaXRpbmdUYXNrLCBzZXRFZGl0aW5nVGFza10gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3Nob3dUYWdNYW5hZ2VyLCBzZXRTaG93VGFnTWFuYWdlcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaG93VGFnUGlja2VyRm9yLCBzZXRTaG93VGFnUGlja2VyRm9yXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbc2hvd0VkaXRUYWdQaWNrZXIsIHNldFNob3dFZGl0VGFnUGlja2VyXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW25ld1RhZ05hbWUsIHNldE5ld1RhZ05hbWVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtuZXdUYWdDb2xvciwgc2V0TmV3VGFnQ29sb3JdID0gdXNlU3RhdGUoXCJibHVlXCIpO1xuICBjb25zdCBbbmV3VGFnSGV4LCBzZXROZXdUYWdIZXhdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtzaG93U2VhcmNoLCBzZXRTaG93U2VhcmNoXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3NlYXJjaFF1ZXJ5LCBzZXRTZWFyY2hRdWVyeV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2ZpbHRlclBlcmlvZCwgc2V0RmlsdGVyUGVyaW9kXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbZmlsdGVyQ29tcGxldGVkLCBzZXRGaWx0ZXJDb21wbGV0ZWRdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IHRvdWNoU3RhcnQgPSB1c2VSZWYoeyB4OiAwLCB5OiAwIH0pO1xuICBjb25zdCBkcmFnT2Zmc2V0ID0gdXNlUmVmKHsgeDogMCwgeTogMCB9KTtcbiAgY29uc3QgW2RyYWdTdHlsZSwgc2V0RHJhZ1N0eWxlXSA9IHVzZVN0YXRlKHt9KTtcblxuICBjb25zdCB3ZWVrU3RhcnQgPSBzdGFydE9mV2VlayhjdXJyZW50RGF0ZSwgeyB3ZWVrU3RhcnRzT246IDEgfSk7XG4gIGNvbnN0IHdlZWtFbmQgPSBlbmRPZldlZWsoY3VycmVudERhdGUsIHsgd2Vla1N0YXJ0c09uOiAxIH0pO1xuICBjb25zdCB3ZWVrRGF5cyA9IGVhY2hEYXlPZkludGVydmFsKHsgc3RhcnQ6IHdlZWtTdGFydCwgZW5kOiB3ZWVrRW5kIH0pO1xuICBjb25zdCB3ZWVrS2V5ID0gZm9ybWF0KHdlZWtTdGFydCwgXCJ5eXl5LU1NLWRkXCIpO1xuXG4gIGNvbnN0IHJlZnJlc2hEYXRhID0gKCkgPT4ge1xuICAgIGJhc2U0NC5lbnRpdGllcy5UYXNrLmxpc3QoXCJvcmRlclwiLCA1MDApLnRoZW4oc2V0VGFza3MpLmNhdGNoKCgpID0+IHNldFRhc2tzKFtdKSk7XG4gICAgYmFzZTQ0LmVudGl0aWVzLlRhZy5saXN0KCkudGhlbihzZXRBbGxUYWdzKS5jYXRjaCgoKSA9PiBzZXRBbGxUYWdzKFtdKSk7XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtyZWZyZXNoRGF0YSgpO30sIFtdKTtcblxuICBjb25zdCB0YXNrc0J5S2V5ID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgbWFwID0ge307XG4gICAgW1wibm9uZVwiLCAuLi5EQVlfS0VZU10uZm9yRWFjaCgoaykgPT4ge21hcFtrXSA9IFtdO30pO1xuICAgIHRhc2tzLmZvckVhY2goKHQpID0+IHtcbiAgICAgIGlmICh0LndlZWtfc3RhcnQgIT09IHdlZWtLZXkpIHJldHVybjtcbiAgICAgIGNvbnN0IGsgPSB0LndlZWtkYXkgfHwgXCJub25lXCI7XG4gICAgICBpZiAobWFwW2tdKSBtYXBba10ucHVzaCh0KTtlbHNlXG4gICAgICBtYXBba10gPSBbdF07XG4gICAgfSk7XG4gICAgT2JqZWN0LmtleXMobWFwKS5mb3JFYWNoKChrKSA9PiB7bWFwW2tdID0gc29ydERheVRhc2tzKG1hcFtrXSk7fSk7XG4gICAgcmV0dXJuIG1hcDtcbiAgfSwgW3Rhc2tzLCB3ZWVrS2V5XSk7XG5cbiAgY29uc3QgYWRkVGFzayA9IGFzeW5jIChrZXkpID0+IHtcbiAgICBjb25zdCBkYXRhID0gbmV3VGFza3Nba2V5XTtcbiAgICBpZiAoIWRhdGE/LnRpdGxlPy50cmltKCkpIHJldHVybjtcbiAgICBjb25zdCBleGlzdGluZyA9IHRhc2tzQnlLZXlba2V5XSB8fCBbXTtcbiAgICBjb25zdCBtYXhPcmRlciA9IE1hdGgubWF4KC4uLmV4aXN0aW5nLm1hcCgodCkgPT4gdC5vcmRlciB8fCAwKSwgMCk7XG4gICAgY29uc3QgdGFncyA9IGRhdGEudGFncyB8fCBbXTtcbiAgICBhd2FpdCBiYXNlNDQuZW50aXRpZXMuVGFzay5jcmVhdGUoe1xuICAgICAgdGl0bGU6IGRhdGEudGl0bGUudHJpbSgpLCB3ZWVrZGF5OiBrZXkgPT09IFwibm9uZVwiID8gXCJub25lXCIgOiBrZXksXG4gICAgICBjb21wbGV0ZWQ6IGZhbHNlLCBvcmRlcjogbWF4T3JkZXIgKyAxLFxuICAgICAgd2Vla19zdGFydDogd2Vla0tleSwgcGVyaW9kOiBkYXRhLnBlcmlvZCB8fCBudWxsLCBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgIHRhZ3NfanNvbjogSlNPTi5zdHJpbmdpZnkodGFncylcbiAgICB9KTtcbiAgICBzZXROZXdUYXNrcygocHJldikgPT4gKHsgLi4ucHJldiwgW2tleV06IG51bGwgfSkpO1xuICAgIHNldEFkZGluZ1RvKG51bGwpO1xuICAgIHJlZnJlc2hEYXRhKCk7XG4gIH07XG5cbiAgY29uc3QgdG9nZ2xlVGFzayA9IGFzeW5jICh0YXNrKSA9PiB7XG4gICAgYXdhaXQgYmFzZTQ0LmVudGl0aWVzLlRhc2sudXBkYXRlKHRhc2suaWQsIHsgY29tcGxldGVkOiAhdGFzay5jb21wbGV0ZWQgfSk7XG4gICAgcmVmcmVzaERhdGEoKTtcbiAgfTtcblxuICBjb25zdCBzZXRQZXJpb2QgPSBhc3luYyAodGFzaywgcGVyaW9kKSA9PiB7XG4gICAgYXdhaXQgYmFzZTQ0LmVudGl0aWVzLlRhc2sudXBkYXRlKHRhc2suaWQsIHsgcGVyaW9kOiB0YXNrLnBlcmlvZCA9PT0gcGVyaW9kID8gbnVsbCA6IHBlcmlvZCB9KTtcbiAgICByZWZyZXNoRGF0YSgpO1xuICB9O1xuXG4gIGNvbnN0IGRlbGV0ZVRhc2sgPSBhc3luYyAodGFza0lkKSA9PiB7XG4gICAgYXdhaXQgYmFzZTQ0LmVudGl0aWVzLlRhc2suZGVsZXRlKHRhc2tJZCkuY2F0Y2goKCkgPT4ge30pO1xuICAgIHJlZnJlc2hEYXRhKCk7XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlVGFza0RldGFpbHMgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKCFlZGl0aW5nVGFzaykgcmV0dXJuO1xuICAgIGNvbnN0IHRhZ3MgPSBlZGl0aW5nVGFzay5fdGFncyB8fCBbXTtcbiAgICBhd2FpdCBiYXNlNDQuZW50aXRpZXMuVGFzay51cGRhdGUoZWRpdGluZ1Rhc2suaWQsIHtcbiAgICAgIGRlc2NyaXB0aW9uOiBlZGl0aW5nVGFzay5kZXNjcmlwdGlvbiB8fCBcIlwiLFxuICAgICAgdGFnc19qc29uOiBKU09OLnN0cmluZ2lmeSh0YWdzKSxcbiAgICAgIHBlcmlvZDogZWRpdGluZ1Rhc2suX3BlcmlvZCAhPT0gdW5kZWZpbmVkID8gZWRpdGluZ1Rhc2suX3BlcmlvZCA6IGVkaXRpbmdUYXNrLnBlcmlvZFxuICAgIH0pO1xuICAgIHNldEVkaXRpbmdUYXNrKG51bGwpO1xuICAgIHJlZnJlc2hEYXRhKCk7XG4gIH07XG5cbiAgY29uc3QgY2xlYXJXZWVrID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHdlZWtUYXNrcyA9IHRhc2tzLmZpbHRlcigodCkgPT4gdC53ZWVrX3N0YXJ0ID09PSB3ZWVrS2V5KTtcbiAgICBmb3IgKGNvbnN0IHQgb2Ygd2Vla1Rhc2tzKSBhd2FpdCBiYXNlNDQuZW50aXRpZXMuVGFzay5kZWxldGUodC5pZCkuY2F0Y2goKCkgPT4ge30pO1xuICAgIHJlZnJlc2hEYXRhKCk7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlVGFnID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IG5hbWUgPSBuZXdUYWdOYW1lLnRyaW0oKTtcbiAgICBpZiAoIW5hbWUpIHJldHVybjtcbiAgICBsZXQgY29sb3IgPSBuZXdUYWdDb2xvcjtcbiAgICBpZiAobmV3VGFnSGV4LnRyaW0oKSAmJiAvXiNbMC05QS1GYS1mXXs2fSQvLnRlc3QobmV3VGFnSGV4LnRyaW0oKSkpIGNvbG9yID0gbmV3VGFnSGV4LnRyaW0oKTtcbiAgICBhd2FpdCBiYXNlNDQuZW50aXRpZXMuVGFnLmNyZWF0ZSh7IG5hbWUsIGNvbG9yIH0pO1xuICAgIHNldE5ld1RhZ05hbWUoXCJcIik7c2V0TmV3VGFnSGV4KFwiXCIpO3NldE5ld1RhZ0NvbG9yKFwiYmx1ZVwiKTtcbiAgICBiYXNlNDQuZW50aXRpZXMuVGFnLmxpc3QoKS50aGVuKHNldEFsbFRhZ3MpLmNhdGNoKCgpID0+IHt9KTtcbiAgfTtcblxuICBjb25zdCBkZWxldGVUYWdGcm9tTWFuYWdlciA9IGFzeW5jICh0YWcpID0+IHtcbiAgICBhd2FpdCBiYXNlNDQuZW50aXRpZXMuVGFnLmRlbGV0ZSh0YWcuaWQpLmNhdGNoKCgpID0+IHt9KTtcbiAgICBzZXRBbGxUYWdzKChwcmV2KSA9PiBwcmV2LmZpbHRlcigodCkgPT4gdC5pZCAhPT0gdGFnLmlkKSk7XG4gIH07XG5cbiAgY29uc3Qgc2V0TmV3VGFza0ZpZWxkID0gKGtleSwgZmllbGQsIHZhbHVlKSA9PiB7XG4gICAgY29uc3QgY3VycmVudCA9IG5ld1Rhc2tzW2tleV0gfHwgeyB0aXRsZTogXCJcIiwgcGVyaW9kOiBudWxsLCB0YWdzOiBbXSB9O1xuICAgIHNldE5ld1Rhc2tzKHsgLi4ubmV3VGFza3MsIFtrZXldOiB7IC4uLmN1cnJlbnQsIFtmaWVsZF06IHZhbHVlIH0gfSk7XG4gIH07XG5cbiAgY29uc3QgZmlsdGVyZWRUYXNrcyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGxldCByZXN1bHQgPSB0YXNrcy5maWx0ZXIoKHQpID0+IHQud2Vla19zdGFydCA9PT0gd2Vla0tleSk7XG4gICAgaWYgKHNlYXJjaFF1ZXJ5LnRyaW0oKSkgcmVzdWx0ID0gcmVzdWx0LmZpbHRlcigodCkgPT4gdC50aXRsZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFF1ZXJ5LnRvTG93ZXJDYXNlKCkpKTtcbiAgICBpZiAoZmlsdGVyUGVyaW9kKSByZXN1bHQgPSByZXN1bHQuZmlsdGVyKCh0KSA9PiB0LnBlcmlvZCA9PT0gZmlsdGVyUGVyaW9kKTtcbiAgICBpZiAoZmlsdGVyQ29tcGxldGVkICE9PSBudWxsKSByZXN1bHQgPSByZXN1bHQuZmlsdGVyKCh0KSA9PiB0LmNvbXBsZXRlZCA9PT0gZmlsdGVyQ29tcGxldGVkKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LCBbdGFza3MsIHdlZWtLZXksIHNlYXJjaFF1ZXJ5LCBmaWx0ZXJQZXJpb2QsIGZpbHRlckNvbXBsZXRlZF0pO1xuXG4gIGNvbnN0IHByZXZXZWVrID0gKCkgPT4gc2V0Q3VycmVudERhdGUoc3ViV2Vla3MoY3VycmVudERhdGUsIDEpKTtcbiAgY29uc3QgbmV4dFdlZWsgPSAoKSA9PiBzZXRDdXJyZW50RGF0ZShhZGRXZWVrcyhjdXJyZW50RGF0ZSwgMSkpO1xuXG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJTdGFydCA9IHVzZUNhbGxiYWNrKCh4LCB5KSA9PiB7dG91Y2hTdGFydC5jdXJyZW50ID0geyB4LCB5IH07ZHJhZ09mZnNldC5jdXJyZW50ID0geyB4OiAwLCB5OiAwIH07c2V0RHJhZ1N0eWxlKHt9KTt9LCBbXSk7XG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJNb3ZlID0gdXNlQ2FsbGJhY2soKHgsIHkpID0+IHtcbiAgICBkcmFnT2Zmc2V0LmN1cnJlbnQgPSB7IHg6IHggLSB0b3VjaFN0YXJ0LmN1cnJlbnQueCwgeTogeSAtIHRvdWNoU3RhcnQuY3VycmVudC55IH07XG4gICAgc2V0RHJhZ1N0eWxlKHsgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7ZHJhZ09mZnNldC5jdXJyZW50Lnh9cHgsICR7ZHJhZ09mZnNldC5jdXJyZW50Lnl9cHgpYCwgdHJhbnNpdGlvbjogXCJub25lXCIgfSk7XG4gIH0sIFtdKTtcbiAgY29uc3QgaGFuZGxlUG9pbnRlckVuZCA9IHVzZUNhbGxiYWNrKCh4LCB5KSA9PiB7XG4gICAgc2V0RHJhZ1N0eWxlKHsgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZSgwLCAwKVwiLCB0cmFuc2l0aW9uOiBcInRyYW5zZm9ybSAwLjNzIGVhc2Utb3V0XCIgfSk7XG4gICAgY29uc3QgZHggPSB4IC0gdG91Y2hTdGFydC5jdXJyZW50Lng7XG4gICAgaWYgKE1hdGguYWJzKGR4KSA+IDQwICYmIGR4IDwgLTYwKSBuYXZpZ2F0ZShcIi9cIik7XG4gIH0sIFtuYXZpZ2F0ZV0pO1xuXG4gIGNvbnN0IG9uRHJhZ0VuZCA9IGFzeW5jIChyZXN1bHQpID0+IHtcbiAgICBjb25zdCB7IHNvdXJjZSwgZGVzdGluYXRpb24sIGRyYWdnYWJsZUlkIH0gPSByZXN1bHQ7XG4gICAgaWYgKCFkZXN0aW5hdGlvbikgcmV0dXJuO1xuICAgIGlmIChzb3VyY2UuZHJvcHBhYmxlSWQgPT09IGRlc3RpbmF0aW9uLmRyb3BwYWJsZUlkICYmIHNvdXJjZS5pbmRleCA9PT0gZGVzdGluYXRpb24uaW5kZXgpIHJldHVybjtcblxuICAgIGNvbnN0IG5ld1dlZWtkYXkgPSBkZXN0aW5hdGlvbi5kcm9wcGFibGVJZDtcbiAgICBhd2FpdCBiYXNlNDQuZW50aXRpZXMuVGFzay51cGRhdGUoZHJhZ2dhYmxlSWQsIHsgd2Vla2RheTogbmV3V2Vla2RheSA9PT0gXCJub25lXCIgPyBcIm5vbmVcIiA6IG5ld1dlZWtkYXkgfSk7XG5cbiAgICAvLyBSZW9yZGVyIHdpdGhpbiBzYW1lIGNvbHVtblxuICAgIGNvbnN0IGNvbFRhc2tzID0gdGFza3NCeUtleVtuZXdXZWVrZGF5XSB8fCBbXTtcbiAgICBpZiAoc291cmNlLmRyb3BwYWJsZUlkID09PSBkZXN0aW5hdGlvbi5kcm9wcGFibGVJZCkge1xuICAgICAgY29uc3QgbW92ZWQgPSBjb2xUYXNrc1tzb3VyY2UuaW5kZXhdO1xuICAgICAgaWYgKCFtb3ZlZCkgcmV0dXJuIHJlZnJlc2hEYXRhKCk7XG4gICAgICBjb25zdCByZW9yZGVyZWQgPSBbLi4uY29sVGFza3NdO1xuICAgICAgcmVvcmRlcmVkLnNwbGljZShzb3VyY2UuaW5kZXgsIDEpO1xuICAgICAgcmVvcmRlcmVkLnNwbGljZShkZXN0aW5hdGlvbi5pbmRleCwgMCwgbW92ZWQpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZW9yZGVyZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYXdhaXQgYmFzZTQ0LmVudGl0aWVzLlRhc2sudXBkYXRlKHJlb3JkZXJlZFtpXS5pZCwgeyBvcmRlcjogaSB9KS5jYXRjaCgoKSA9PiB7fSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFVwZGF0ZSBvcmRlciBpbiBib3RoIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gY29sdW1ucyAgXG4gICAgICBjb25zdCBzcmNDb2wgPSB0YXNrc0J5S2V5W3NvdXJjZS5kcm9wcGFibGVJZF0gfHwgW107XG4gICAgICBjb25zdCBkc3RDb2wgPSBbLi4uKHRhc2tzQnlLZXlbbmV3V2Vla2RheV0gfHwgW10pXTtcbiAgICAgIGNvbnN0IG1vdmVkID0gc3JjQ29sW3NvdXJjZS5pbmRleF07XG4gICAgICBpZiAoIW1vdmVkKSByZXR1cm4gcmVmcmVzaERhdGEoKTtcbiAgICAgIGRzdENvbC5zcGxpY2UoZGVzdGluYXRpb24uaW5kZXgsIDAsIG1vdmVkKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZHN0Q29sLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGF3YWl0IGJhc2U0NC5lbnRpdGllcy5UYXNrLnVwZGF0ZShkc3RDb2xbaV0uaWQsIHsgb3JkZXI6IGkgfSkuY2F0Y2goKCkgPT4ge30pO1xuICAgICAgfVxuICAgICAgLy8gVXBkYXRlIHNvdXJjZSBjb2x1bW4gb3JkZXJcbiAgICAgIGNvbnN0IG5ld1NyYyA9IHNyY0NvbC5maWx0ZXIoKHQpID0+IHQuaWQgIT09IG1vdmVkLmlkKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3U3JjLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGF3YWl0IGJhc2U0NC5lbnRpdGllcy5UYXNrLnVwZGF0ZShuZXdTcmNbaV0uaWQsIHsgb3JkZXI6IGkgfSkuY2F0Y2goKCkgPT4ge30pO1xuICAgICAgfVxuICAgIH1cbiAgICByZWZyZXNoRGF0YSgpO1xuICB9O1xuXG4gIGNvbnN0IHJlbmRlclRhc2tDYXJkID0gKHRhc2ssIGlkeCwgZGF5SWR4KSA9PiB7XG4gICAgY29uc3QgdGFncyA9IHBhcnNlVGFncyh0YXNrKTtcbiAgICBjb25zdCBkYXlDb2xvciA9IERBWV9IRVhbZGF5SWR4XSB8fCBEQVlfSEVYWzBdO1xuICAgIGNvbnN0IGlzQ29tcGxldGVkID0gdGFzay5jb21wbGV0ZWQ7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPERyYWdnYWJsZSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDoyNTk6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17dGFzay5pZH0gZHJhZ2dhYmxlSWQ9e3Rhc2suaWR9IGluZGV4PXtpZHh9IGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXt0YXNrPy5pZH0+XG4gICAgICAgIHsocHJvdmlkZWQsIHNuYXBzaG90KSA9PlxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjI2MToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgIHJlZj17cHJvdmlkZWQuaW5uZXJSZWZ9XG4gICAgICAgIHsuLi5wcm92aWRlZC5kcmFnZ2FibGVQcm9wc31cbiAgICAgICAgey4uLnByb3ZpZGVkLmRyYWdIYW5kbGVQcm9wc31cbiAgICAgICAgY2xhc3NOYW1lPXtgYmctd2hpdGUgcm91bmRlZC14bCBzaGFkb3ctc20gYm9yZGVyIHRyYW5zaXRpb24tYWxsIGdyb3VwIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbiAke1xuICAgICAgICBzbmFwc2hvdC5pc0RyYWdnaW5nID8gXCJzaGFkb3cteGwgcmluZy0yIHJpbmctWyNFODdBNUFdLzMwIHNjYWxlLVsxLjAyXVwiIDogXCJib3JkZXItYm9yZGVyIGhvdmVyOnNoYWRvdy1tZFwifWBcbiAgICAgICAgfT5cbiAgICAgICAgICBcbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6MjY5OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicC0zIGN1cnNvci1wb2ludGVyXCIgb25DbGljaz17KCkgPT4gc2V0RWRpdGluZ1Rhc2soeyAuLi50YXNrLCBfdGFnczogdGFncywgX3BlcmlvZDogdGFzay5wZXJpb2QgfSl9IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwicGVyaW9kXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e3Rhc2s/LmlkfT5cbiAgICAgICAgICAgICAgey8qIFBlcmlvZCBpY29uIHRvcC1yaWdodCAqL31cbiAgICAgICAgICAgICAge3Rhc2sucGVyaW9kICYmXG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjI3MjoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0yIHJpZ2h0LTIgb3BhY2l0eS02MFwiPlxuICAgICAgICAgICAgICAgICAgPFBlcmlvZEljb24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6MjczOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgcGVyaW9kPXt0YXNrLnBlcmlvZH0gY29sb3I9e2RheUNvbG9yfSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB7LyogVHJhc2ggaWNvbiBvbiBob3ZlciAqL31cbiAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDoyNzc6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtlLnN0b3BQcm9wYWdhdGlvbigpO2RlbGV0ZVRhc2sodGFzay5pZCk7fX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0yIHJpZ2h0LTIgdy02IGgtNiByb3VuZGVkLWZ1bGwgYmctd2hpdGUgYm9yZGVyIGJvcmRlci1ib3JkZXIgc2hhZG93LXNtIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG9wYWNpdHktMCBncm91cC1ob3ZlcjpvcGFjaXR5LTEwMCB0cmFuc2l0aW9uLWFsbCBob3ZlcjpiZy1yb3NlLTUwIGhvdmVyOmJvcmRlci1yb3NlLTIwMCBob3Zlcjp0ZXh0LXJvc2UtNTAwIHotMTBcIlxuICAgICAgICAgICAgc3R5bGU9e3Rhc2sucGVyaW9kID8geyByaWdodDogXCIyOHB4XCIgfSA6IHt9fT5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPFRyYXNoMiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDoyODI6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgIHsvKiBHcmlwIGljb24gdG9wLWxlZnQgb24gaG92ZXIgKi99XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6Mjg2OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0yIGxlZnQtMiBvcGFjaXR5LTAgZ3JvdXAtaG92ZXI6b3BhY2l0eS00MCB0cmFuc2l0aW9uLW9wYWNpdHlcIj5cbiAgICAgICAgICAgICAgICA8R3JpcFZlcnRpY2FsIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjI4NzoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6MjkwOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6MjkxOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KGUpID0+IHtlLnN0b3BQcm9wYWdhdGlvbigpO3RvZ2dsZVRhc2sodGFzayk7fX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgbXQtMC41IHctNCBoLTQgcm91bmRlZCBib3JkZXItMiBmbGV4LXNocmluay0wIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRyYW5zaXRpb24tYWxsICR7aXNDb21wbGV0ZWQgPyBcImJnLWJsdWUtNTAwIGJvcmRlci1ibHVlLTUwMFwiIDogXCJib3JkZXItc2xhdGUtMzAwIGhvdmVyOmJvcmRlci1ibHVlLTQwMFwifWB9PlxuICAgICAgICAgICAgICAgICAge2lzQ29tcGxldGVkICYmIDxDaGVjayBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDoyOTM6MzRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy0yLjUgaC0yLjUgdGV4dC13aGl0ZVwiIC8+fVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6Mjk1OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleC0xIG1pbi13LTBcIj5cbiAgICAgICAgICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjI5NjoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT17YHRleHQtc20gJHtpc0NvbXBsZXRlZCA/IFwibGluZS10aHJvdWdoIHRleHQtbXV0ZWQtZm9yZWdyb3VuZC81MFwiIDogXCJ0ZXh0LWZvcmVncm91bmRcIn1gfSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cInRpdGxlXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e3Rhc2s/LmlkfT5cbiAgICAgICAgICAgICAgICAgICAge3Rhc2sudGl0bGV9XG4gICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICB7dGFncy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDozMDA6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBnYXAtMSBtdC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7dGFncy5zbGljZSgwLCAzKS5tYXAoKHRhZywgaSkgPT5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjMwMjoyNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17aX0gY2xhc3NOYW1lPXtgcHgtMS41IHB5LTAuNSByb3VuZGVkLW1kIHRleHQtWzlweF0gZm9udC1tZWRpdW0gJHt0YWdDbGFzcyh0YWcuY29sb3IpfWB9IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibmFtZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXt0YWc/LmlkfT57dGFnLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICA8L0RyYWdnYWJsZT4pO1xuXG4gIH07XG5cbiAgY29uc3QgcmVuZGVyTWluaUZvcm0gPSAoa2V5KSA9PiB7XG4gICAgY29uc3QgY3VycmVudCA9IG5ld1Rhc2tzW2tleV0gfHwgeyB0aXRsZTogXCJcIiwgcGVyaW9kOiBudWxsLCB0YWdzOiBbXSB9O1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjMxODo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC14bCBwLTMgc2hhZG93LXNtIGJvcmRlciBib3JkZXItWyNFODdBNUFdLzMwIHNwYWNlLXktMlwiPlxuICAgICAgICA8aW5wdXQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6MzE5OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBhdXRvRm9jdXMgdmFsdWU9e2N1cnJlbnQudGl0bGV9XG4gICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3VGFza0ZpZWxkKGtleSwgXCJ0aXRsZVwiLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgIG9uS2V5RG93bj17KGUpID0+IHtpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikgYWRkVGFzayhrZXkpO2lmIChlLmtleSA9PT0gXCJFc2NhcGVcIikgc2V0QWRkaW5nVG8obnVsbCk7fX1cbiAgICAgICAgcGxhY2Vob2xkZXI9XCJOb3ZhIHRhcmVmYS4uLlwiIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LXNtIGJnLXRyYW5zcGFyZW50IG91dGxpbmUtbm9uZVwiIC8+XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6MzIzOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGdhcC0xXCI+XG4gICAgICAgICAge09iamVjdC5lbnRyaWVzKFBFUklPRF9DT05GSUcpLm1hcCgoW3AsIGNmZ10pID0+XG4gICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDozMjU6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBrZXk9e3B9IG9uQ2xpY2s9eygpID0+IHNldE5ld1Rhc2tGaWVsZChrZXksIFwicGVyaW9kXCIsIGN1cnJlbnQucGVyaW9kID09PSBwID8gbnVsbCA6IHApfVxuICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXgtMSBweS0xLjUgcm91bmRlZC1sZyB0ZXh0LVsxMHB4XSBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWFsbCAke2N1cnJlbnQucGVyaW9kID09PSBwID8gXCJiZy1bI0U4N0E1QV0gdGV4dC13aGl0ZVwiIDogXCJiZy1zbGF0ZS0xMDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6Ymctc2xhdGUtMjAwXCJ9YH0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJlbW9qaVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtjZmc/LmlkIHx8IGNmZz8uX2lkfT5cbiAgICAgICAgICAgICAge2NmZy5lbW9qaX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjMzMTo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTFcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cInRhZ3NcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17Y3VycmVudD8uaWQgfHwgY3VycmVudD8uX2lkfT5cbiAgICAgICAgICB7Y3VycmVudC50YWdzLm1hcCgodGFnLCBpKSA9PlxuICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjMzMzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17aX0gY2xhc3NOYW1lPXtgcHgtMiBweS0wLjUgcm91bmRlZC1mdWxsIHRleHQtWzlweF0gZm9udC1tZWRpdW0gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTAuNSAke3RhZ0NsYXNzKHRhZy5jb2xvcil9YH0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJuYW1lXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e3RhZz8uaWQgfHwgdGFnPy5faWR9PlxuICAgICAgICAgICAgICB7dGFnLm5hbWV9XG4gICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6MzM1OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4ge2NvbnN0IHUgPSBjdXJyZW50LnRhZ3MuZmlsdGVyKChfLCBqKSA9PiBqICE9PSBpKTtzZXROZXdUYXNrRmllbGQoa2V5LCBcInRhZ3NcIiwgdSk7fX0+XG4gICAgICAgICAgICAgICAgPFggZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6MzM2OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctMi41IGgtMi41XCIgLz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7Y3VycmVudC50YWdzLmxlbmd0aCA8IDMgJiZcbiAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjM0MToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldFNob3dUYWdQaWNrZXJGb3Ioa2V5KX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgdGV4dC1bOXB4XSB0ZXh0LW11dGVkLWZvcmVncm91bmQgYm9yZGVyIGJvcmRlci1kYXNoZWQgYm9yZGVyLWJvcmRlciBob3Zlcjpib3JkZXItWyNFODdBNUFdLzUwIGhvdmVyOnRleHQtWyNFODdBNUFdIHRyYW5zaXRpb24tYWxsXCI+XG4gICAgICAgICAgICAgICsgdGFnXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjM0Nzo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBnYXAtMlwiPlxuICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6MzQ4OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gYWRkVGFzayhrZXkpfSBjbGFzc05hbWU9XCJmbGV4LTEgcHktMS41IHJvdW5kZWQtbGcgYmctWyNFODdBNUFdIHRleHQtd2hpdGUgdGV4dC14cyBmb250LW1lZGl1bSBob3ZlcjpiZy1bI0Q0Njk0QV0gdHJhbnNpdGlvbi1hbGxcIj5BZGljaW9uYXI8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjM0OToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldEFkZGluZ1RvKG51bGwpfSBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLWxnIGJnLXNlY29uZGFyeSB0ZXh0LW11dGVkLWZvcmVncm91bmQgdGV4dC14c1wiPjxYIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjM0OToxMzBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+KTtcblxuICB9O1xuXG4gIGNvbnN0IHJlbmRlckNvbHVtbiA9IChrZXksIGxhYmVsLCBkYXlJZHgpID0+IHtcbiAgICBjb25zdCBkYXlUYXNrcyA9IHRhc2tzQnlLZXlba2V5XSB8fCBbXTtcbiAgICBjb25zdCBpc0FkZGluZyA9IGFkZGluZ1RvID09PSBrZXk7XG4gICAgY29uc3QgZGF5SW5mbyA9IHdlZWtEYXlzW2RheUlkeF07XG4gICAgY29uc3QgZGF5T2ZNb250aCA9IGRheUluZm8gPyBmb3JtYXQoZGF5SW5mbywgXCJkXCIpIDoga2V5ID09PSBcIm5vbmVcIiA/IFwiXCIgOiBcIlwiO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6MzYyOjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4LXNocmluay0wIHctWzIwMHB4XSBmbGV4IGZsZXgtY29sXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2tleT8uW1wiZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWRcIl19PlxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjM2Mzo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPXtgcm91bmRlZC0yeGwgcHgtMyBweS0yLjUgbWItMyBmb250LXNlbWlib2xkIHRleHQteHMgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuICR7a2V5ID09PSBcIm5vbmVcIiA/IFwiYmctc2xhdGUtMTAwIHRleHQtc2xhdGUtNjAwXCIgOiBEQVlfQ09MT1JTW2RheUlkeF19YH0+XG4gICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6MzY0OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJsYWJlbFwiPntsYWJlbH08L3NwYW4+XG4gICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6MzY1OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAge2RheU9mTW9udGggJiYgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6MzY2OjI3XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwib3BhY2l0eS03MCB0ZXh0LVsxMXB4XVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiZGF5T2ZNb250aFwiPntkYXlPZk1vbnRofTwvc3Bhbj59XG4gICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDozNjc6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJiZy13aGl0ZS8yMCByb3VuZGVkLWZ1bGwgcHgtMS41IHB5LTAuNSB0ZXh0LVsxMHB4XVwiPntkYXlUYXNrcy5sZW5ndGh9PC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPERyb3BwYWJsZSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDozNzE6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGRyb3BwYWJsZUlkPXtrZXl9IHR5cGU9XCJUQVNLXCI+XG4gICAgICAgICAgeyhwcm92aWRlZCwgc25hcHNob3QpID0+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDozNzM6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgIHJlZj17cHJvdmlkZWQuaW5uZXJSZWZ9XG4gICAgICAgICAgey4uLnByb3ZpZGVkLmRyb3BwYWJsZVByb3BzfVxuICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXgtMSBzcGFjZS15LTIgcm91bmRlZC14bCBwLTEgdHJhbnNpdGlvbi1jb2xvcnMgJHtzbmFwc2hvdC5pc0RyYWdnaW5nT3ZlciA/IFwiYmctWyNFODdBNUFdLzVcIiA6IFwiXCJ9YH0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJwbGFjZWhvbGRlclwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtwcm92aWRlZD8uaWQgfHwgcHJvdmlkZWQ/Ll9pZH0+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAge2RheVRhc2tzLm1hcCgodGFzaywgaWR4KSA9PiByZW5kZXJUYXNrQ2FyZCh0YXNrLCBpZHgsIGRheUlkeCkpfVxuICAgICAgICAgICAgICB7cHJvdmlkZWQucGxhY2Vob2xkZXJ9XG5cbiAgICAgICAgICAgICAge2lzQWRkaW5nID8gcmVuZGVyTWluaUZvcm0oa2V5KSA6XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjM4MjoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgc2V0TmV3VGFza3MoeyAuLi5uZXdUYXNrcywgW2tleV06IHsgdGl0bGU6IFwiXCIsIHBlcmlvZDogbnVsbCwgdGFnczogW10gfSB9KTtcbiAgICAgICAgICAgICAgc2V0QWRkaW5nVG8oa2V5KTtcbiAgICAgICAgICAgIH19IGNsYXNzTmFtZT1cInctZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMSBweS0zIHJvdW5kZWQteGwgYm9yZGVyLTIgYm9yZGVyLWRhc2hlZCBib3JkZXItYm9yZGVyIHRleHQtbXV0ZWQtZm9yZWdyb3VuZC82MCBob3Zlcjp0ZXh0LVsjRTg3QTVBXSBob3Zlcjpib3JkZXItWyNFODdBNUFdLzMwIHRyYW5zaXRpb24tYWxsIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgIDxQbHVzIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjM4NjoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz4gTm92YSB0YXJlZmFcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIH1cbiAgICAgICAgPC9Ecm9wcGFibGU+XG4gICAgICA8L2Rpdj4pO1xuXG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjM5Nzo0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctY3JlYW0gZmxleCBmbGV4LWNvbCBzZWxlY3Qtbm9uZVwiXG4gICAgb25Ub3VjaFN0YXJ0PXsoZSkgPT4gaGFuZGxlUG9pbnRlclN0YXJ0KGUudG91Y2hlc1swXS5jbGllbnRYLCBlLnRvdWNoZXNbMF0uY2xpZW50WSl9XG4gICAgb25Ub3VjaE1vdmU9eyhlKSA9PiBoYW5kbGVQb2ludGVyTW92ZShlLnRvdWNoZXNbMF0uY2xpZW50WCwgZS50b3VjaGVzWzBdLmNsaWVudFkpfVxuICAgIG9uVG91Y2hFbmQ9eyhlKSA9PiBoYW5kbGVQb2ludGVyRW5kKGUuY2hhbmdlZFRvdWNoZXNbMF0/LmNsaWVudFggfHwgdG91Y2hTdGFydC5jdXJyZW50LngsIGUuY2hhbmdlZFRvdWNoZXNbMF0/LmNsaWVudFkgfHwgdG91Y2hTdGFydC5jdXJyZW50LnkpfVxuICAgIG9uTW91c2VEb3duPXsoZSkgPT4gaGFuZGxlUG9pbnRlclN0YXJ0KGUuY2xpZW50WCwgZS5jbGllbnRZKX1cbiAgICBvbk1vdXNlTW92ZT17KGUpID0+IHtpZiAoZS5idXR0b25zID09PSAxKSBoYW5kbGVQb2ludGVyTW92ZShlLmNsaWVudFgsIGUuY2xpZW50WSk7fX1cbiAgICBvbk1vdXNlVXA9eyhlKSA9PiBoYW5kbGVQb2ludGVyRW5kKGUuY2xpZW50WCwgZS5jbGllbnRZKX0+XG4gICAgICBcbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NDA2OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBzdHlsZT17ZHJhZ1N0eWxlfSBjbGFzc05hbWU9XCJmbGV4LTEgZmxleCBmbGV4LWNvbFwiPlxuICAgICAgICB7LyogSGVhZGVyICovfVxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjQwODo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiYmctd2hpdGUgYm9yZGVyLWIgYm9yZGVyLWJvcmRlciBweC00IHB5LTNcIj5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjQwOToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtYi0zXCI+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjQxMDoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NDExOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoXCIvXCIpfSBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgcm91bmRlZC0yeGwgYmctd2hpdGUgYm9yZGVyIGJvcmRlci1ib3JkZXIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGhvdmVyOnRleHQtZm9yZWdyb3VuZCB0cmFuc2l0aW9uLWFsbFwiPlxuICAgICAgICAgICAgICAgIDxBcnJvd0xlZnQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NDEyOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo0MTQ6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIj5cbiAgICAgICAgICAgICAgICA8aDEgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NDE1OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkIHRleHQtZm9yZWdyb3VuZFwiPlRhcmVmYXM8L2gxPlxuICAgICAgICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjQxNjoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiPlxuICAgICAgICAgICAgICAgICAge2Zvcm1hdCh3ZWVrU3RhcnQsIFwiZFwiLCB7IGxvY2FsZTogcHQgfSl9IC0ge2Zvcm1hdCh3ZWVrRW5kLCBcImQgJ2RlJyBNTU1cIiwgeyBsb2NhbGU6IHB0IH0pfVxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NDIxOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo0MjI6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXtwcmV2V2Vla30gY2xhc3NOYW1lPVwidy04IGgtOCByb3VuZGVkLWZ1bGwgYmctc2Vjb25kYXJ5IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGhvdmVyOmJnLWJvcmRlciB0cmFuc2l0aW9uLWFsbFwiPlxuICAgICAgICAgICAgICAgIDxDaGV2cm9uTGVmdCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo0MjM6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo0MjU6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1mb3JlZ3JvdW5kIG1pbi13LVs2MHB4XSB0ZXh0LWNlbnRlclwiPntmb3JtYXQod2Vla1N0YXJ0LCBcIk1NTVwiLCB7IGxvY2FsZTogcHQgfSl9PC9zcGFuPlxuICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjQyNjoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9e25leHRXZWVrfSBjbGFzc05hbWU9XCJ3LTggaC04IHJvdW5kZWQtZnVsbCBiZy1zZWNvbmRhcnkgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgaG92ZXI6YmctYm9yZGVyIHRyYW5zaXRpb24tYWxsXCI+XG4gICAgICAgICAgICAgICAgPENoZXZyb25SaWdodCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo0Mjc6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo0MzE6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NDMyOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gc2V0U2hvd1NlYXJjaCh0cnVlKX0gY2xhc3NOYW1lPVwicHktMiBweC0zIHJvdW5kZWQteGwgYmctc2Vjb25kYXJ5IHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGhvdmVyOmJnLWJvcmRlciB0cmFuc2l0aW9uLWFsbFwiPlxuICAgICAgICAgICAgICA8U2VhcmNoIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjQzMzoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+IFBlc3F1aXNhclxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjQzNToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldEZpbHRlclBlcmlvZChmaWx0ZXJQZXJpb2QgPyBudWxsIDogXCJtb3JuaW5nXCIpfSBjbGFzc05hbWU9e2BweS0yIHB4LTMgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtbWVkaXVtIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRyYW5zaXRpb24tYWxsICR7ZmlsdGVyUGVyaW9kID8gXCJiZy1bI0U4N0E1QV0gdGV4dC13aGl0ZVwiIDogXCJiZy1zZWNvbmRhcnkgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGhvdmVyOmJnLWJvcmRlclwifWB9PlxuICAgICAgICAgICAgICA8RmlsdGVyIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjQzNjoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+IHtmaWx0ZXJQZXJpb2QgPyBQRVJJT0RfQ09ORklHW2ZpbHRlclBlcmlvZF0/LmVtb2ppIDogXCJQZXLDrW9kb1wifVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjQzODoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldEZpbHRlckNvbXBsZXRlZChmaWx0ZXJDb21wbGV0ZWQgPT09IG51bGwgPyBmYWxzZSA6IGZpbHRlckNvbXBsZXRlZCA9PT0gZmFsc2UgPyB0cnVlIDogbnVsbCl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweS0yIHB4LTMgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtbWVkaXVtIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRyYW5zaXRpb24tYWxsICR7ZmlsdGVyQ29tcGxldGVkICE9PSBudWxsID8gXCJiZy1bI0U4N0E1QV0gdGV4dC13aGl0ZVwiIDogXCJiZy1zZWNvbmRhcnkgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGhvdmVyOmJnLWJvcmRlclwifWB9PlxuICAgICAgICAgICAgICA8Q2hlY2sgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NDQwOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAge2ZpbHRlckNvbXBsZXRlZCA9PT0gbnVsbCA/IFwiVG9kYXNcIiA6IGZpbHRlckNvbXBsZXRlZCA/IFwiQ29uY2x1w61kYXNcIiA6IFwiUG9yIGZhemVyXCJ9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NDQzOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gc2V0U2hvd1RhZ01hbmFnZXIodHJ1ZSl9IGNsYXNzTmFtZT1cInB5LTIgcHgtMyByb3VuZGVkLXhsIGJnLXNlY29uZGFyeSB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBob3ZlcjpiZy1ib3JkZXIgdHJhbnNpdGlvbi1hbGxcIj5cbiAgICAgICAgICAgICAgPFRhZ3MgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NDQ0OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz4gPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NDQ0OjQ3XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImhpZGRlbiBzbTppbmxpbmVcIj5UYWdzPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjQ0NjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9e2NsZWFyV2Vla30gY2xhc3NOYW1lPVwicHktMiBweC0zIHJvdW5kZWQteGwgYmctcm9zZS01MCB0ZXh0LXJvc2UtNjAwIHRleHQteHMgZm9udC1tZWRpdW0gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgaG92ZXI6Ymctcm9zZS0xMDAgdHJhbnNpdGlvbi1hbGxcIj5cbiAgICAgICAgICAgICAgPFRyYXNoMiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo0NDc6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBGaWx0ZXIgcGVyaW9kIHN1Yi1zZWxlY3RvciAqL31cbiAgICAgICAgPEFuaW1hdGVQcmVzZW5jZSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo0NTM6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiPlxuICAgICAgICAgIHtmaWx0ZXJQZXJpb2QgJiZcbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjQ1NToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZ2FwLTIgcHgtNCBweS0yIGJnLXdoaXRlIGJvcmRlci1iIGJvcmRlci1ib3JkZXJcIj5cbiAgICAgICAgICAgICAge09iamVjdC5lbnRyaWVzKFBFUklPRF9DT05GSUcpLm1hcCgoW3AsIGNmZ10pID0+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjQ1NzoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17cH0gb25DbGljaz17KCkgPT4gc2V0RmlsdGVyUGVyaW9kKHAgPT09IGZpbHRlclBlcmlvZCA/IG51bGwgOiBwKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXgtMSBweS0xLjUgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tYWxsICR7cCA9PT0gZmlsdGVyUGVyaW9kID8gXCJiZy1bI0U4N0E1QV0gdGV4dC13aGl0ZVwiIDogXCJiZy1zZWNvbmRhcnkgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCJ9YH0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJlbW9qaVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtjZmc/LmlkIHx8IGNmZz8uX2lkfT5cbiAgICAgICAgICAgICAgICAgIHtjZmcuZW1vaml9IHtjZmcubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgfVxuICAgICAgICA8L0FuaW1hdGVQcmVzZW5jZT5cblxuICAgICAgICB7LyogU2VhcmNoIHBvcHVwICovfVxuICAgICAgICA8QW5pbWF0ZVByZXNlbmNlIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjQ2Nzo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgICAge3Nob3dTZWFyY2ggJiZcbiAgICAgICAgICA8bW90aW9uLmRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo0Njk6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBpbml0aWFsPXt7IG9wYWNpdHk6IDAgfX0gYW5pbWF0ZT17eyBvcGFjaXR5OiAxIH19IGV4aXQ9e3sgb3BhY2l0eTogMCB9fVxuICAgICAgICAgIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei01MCBiZy1ibGFjay8yMCBmbGV4IGl0ZW1zLWVuZCBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIlxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dTZWFyY2goZmFsc2UpfT5cbiAgICAgICAgICAgICAgPG1vdGlvbi5kaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NDcyOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgaW5pdGlhbD17eyB5OiBcIjEwMCVcIiB9fSBhbmltYXRlPXt7IHk6IDAgfX0gZXhpdD17eyB5OiBcIjEwMCVcIiB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC10LTJ4bCBzbTpyb3VuZGVkLTJ4bCB3LWZ1bGwgc206bWF4LXctc20gcC01IHNoYWRvdy14bFwiIG9uQ2xpY2s9eyhlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfT5cbiAgICAgICAgICAgICAgICA8aDMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NDc0OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LWZvcmVncm91bmQgbWItM1wiPlBlc3F1aXNhciBUYXJlZmFzPC9oMz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NDc1OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgdmFsdWU9e3NlYXJjaFF1ZXJ5fSBvbkNoYW5nZT17KGUpID0+IHNldFNlYXJjaFF1ZXJ5KGUudGFyZ2V0LnZhbHVlKX0gcGxhY2Vob2xkZXI9XCJFc2NyZXZlIHBhcmEgcGVzcXVpc2FyLi4uXCIgYXV0b0ZvY3VzXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC00IHB5LTMgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLWJvcmRlciB0ZXh0LXNtIG91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItWyNFODdBNUFdLzUwIHRyYW5zaXRpb24tYWxsXCIgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjQ3NzoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZ2FwLTIgbXQtMyBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NDc4OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4ge3NldEZpbHRlclBlcmlvZChudWxsKTtzZXRGaWx0ZXJDb21wbGV0ZWQobnVsbCk7fX0gY2xhc3NOYW1lPXtgcHktMS41IHB4LTMgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtbWVkaXVtICR7ZmlsdGVyUGVyaW9kID09PSBudWxsICYmIGZpbHRlckNvbXBsZXRlZCA9PT0gbnVsbCA/IFwiYmctWyNFODdBNUFdIHRleHQtd2hpdGVcIiA6IFwiYmctc2Vjb25kYXJ5XCJ9YH0+VG9kb3M8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIHtPYmplY3QuZW50cmllcyhQRVJJT0RfQ09ORklHKS5tYXAoKFtwLCBjZmddKSA9PlxuICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NDgwOjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtwfSBvbkNsaWNrPXsoKSA9PiBzZXRGaWx0ZXJQZXJpb2QocCA9PT0gZmlsdGVyUGVyaW9kID8gbnVsbCA6IHApfSBjbGFzc05hbWU9e2BweS0xLjUgcHgtMyByb3VuZGVkLWxnIHRleHQteHMgZm9udC1tZWRpdW0gJHtmaWx0ZXJQZXJpb2QgPT09IHAgPyBcImJnLVsjRTg3QTVBXSB0ZXh0LXdoaXRlXCIgOiBcImJnLXNlY29uZGFyeVwifWB9IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiZW1vamlcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17Y2ZnPy5pZCB8fCBjZmc/Ll9pZH0+e2NmZy5lbW9qaX0ge2NmZy5sYWJlbH08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo0ODI6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiBzZXRGaWx0ZXJDb21wbGV0ZWQoZmlsdGVyQ29tcGxldGVkID09PSBudWxsID8gZmFsc2UgOiBudWxsKX0gY2xhc3NOYW1lPXtgcHktMS41IHB4LTMgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtbWVkaXVtICR7ZmlsdGVyQ29tcGxldGVkID09PSBmYWxzZSA/IFwiYmctWyNFODdBNUFdIHRleHQtd2hpdGVcIiA6IFwiYmctc2Vjb25kYXJ5XCJ9YH0+UG9yIGZhemVyPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjQ4MzoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldEZpbHRlckNvbXBsZXRlZChmaWx0ZXJDb21wbGV0ZWQgPT09IG51bGwgPyB0cnVlIDogbnVsbCl9IGNsYXNzTmFtZT17YHB5LTEuNSBweC0zIHJvdW5kZWQtbGcgdGV4dC14cyBmb250LW1lZGl1bSAke2ZpbHRlckNvbXBsZXRlZCA9PT0gdHJ1ZSA/IFwiYmctWyNFODdBNUFdIHRleHQtd2hpdGVcIiA6IFwiYmctc2Vjb25kYXJ5XCJ9YH0+Q29uY2x1w61kYXM8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7c2VhcmNoUXVlcnkgJiZcbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo0ODY6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJtdC0zIHNwYWNlLXktMSBtYXgtaC1bMjAwcHhdIG92ZXJmbG93LXktYXV0b1wiPlxuICAgICAgICAgICAgICAgICAgICB7ZmlsdGVyZWRUYXNrcy5zbGljZSgwLCAxMCkubWFwKCh0KSA9PlxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NDg4OjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXt0LmlkfSBjbGFzc05hbWU9XCJ0ZXh0LXhzIHB4LTMgcHktMiByb3VuZGVkLWxnIGJnLXNlY29uZGFyeS81MCB0ZXh0LWZvcmVncm91bmRcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17dD8uaWR9IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwidGl0bGVcIj57dC50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjQ5MjoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldFNob3dTZWFyY2goZmFsc2UpfSBjbGFzc05hbWU9XCJ3LWZ1bGwgbXQtNCBweS0yLjUgcm91bmRlZC14bCBiZy1zZWNvbmRhcnkgdGV4dC1zbSBmb250LW1lZGl1bSBob3ZlcjpiZy1ib3JkZXIgdHJhbnNpdGlvbi1hbGxcIj5GZWNoYXI8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgIH1cbiAgICAgICAgPC9BbmltYXRlUHJlc2VuY2U+XG5cbiAgICAgICAgey8qIEthbmJhbiBjb2x1bW5zIHdpdGggZHJhZyBhbmQgZHJvcCAqL31cbiAgICAgICAgPERyYWdEcm9wQ29udGV4dCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo0OTk6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uRHJhZ0VuZD17b25EcmFnRW5kfT5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjUwMDoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXgtMSBvdmVyZmxvdy1hdXRvXCI+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjUwMToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZ2FwLTMgcC00IG1pbi1oLWZ1bGxcIiBzdHlsZT17eyBtaW5XaWR0aDogYCR7KERBWV9LRVlTLmxlbmd0aCArIDEpICogMjI1fXB4YCB9fT5cbiAgICAgICAgICAgICAgey8qIE1vbmRheSB0byBTdW5kYXkgKi99XG4gICAgICAgICAgICAgIHtEQVlfS0VZUy5tYXAoKGtleSwgaWR4KSA9PiByZW5kZXJDb2x1bW4oa2V5LCBEQVlfTEFCRUxTW2lkeF0uc3Vic3RyaW5nKDAsIDMpLCBpZHgpKX1cbiAgICAgICAgICAgICAgey8qIFwiU2VtIGRpYVwiIGFmdGVyIFN1bmRheSAqL31cbiAgICAgICAgICAgICAge3JlbmRlckNvbHVtbihcIm5vbmVcIiwgXCJTZW0gZGlhXCIsIDApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvRHJhZ0Ryb3BDb250ZXh0PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBUYWdQaWNrZXIgZm9yIG1pbmkgZm9ybSAqL31cbiAgICAgIDxUYWdQaWNrZXIgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NTEyOjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgb3Blbj17ISFzaG93VGFnUGlja2VyRm9yfVxuICAgICAgb25DbG9zZT17KCkgPT4gc2V0U2hvd1RhZ1BpY2tlckZvcihudWxsKX1cbiAgICAgIG11bHRpU2VsZWN0PXt0cnVlfVxuICAgICAgc2VsZWN0ZWRUYWdzPXtzaG93VGFnUGlja2VyRm9yICYmIG5ld1Rhc2tzW3Nob3dUYWdQaWNrZXJGb3JdID8gbmV3VGFza3Nbc2hvd1RhZ1BpY2tlckZvcl0udGFncyB8fCBbXSA6IFtdfVxuICAgICAgb25NdWx0aVNlbGVjdD17KHRhZ3MpID0+IHtcbiAgICAgICAgaWYgKHNob3dUYWdQaWNrZXJGb3IpIHNldE5ld1Rhc2tGaWVsZChzaG93VGFnUGlja2VyRm9yLCBcInRhZ3NcIiwgdGFncyk7XG4gICAgICB9fSAvPlxuICAgICAgXG5cbiAgICAgIHsvKiBUYWdQaWNrZXIgZm9yIGVkaXQgbW9kYWwgKi99XG4gICAgICA8VGFnUGlja2VyIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjUyMzo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgIG9wZW49e3Nob3dFZGl0VGFnUGlja2VyfVxuICAgICAgb25DbG9zZT17KCkgPT4gc2V0U2hvd0VkaXRUYWdQaWNrZXIoZmFsc2UpfVxuICAgICAgbXVsdGlTZWxlY3Q9e3RydWV9XG4gICAgICBzZWxlY3RlZFRhZ3M9e2VkaXRpbmdUYXNrPy5fdGFncyB8fCBbXX1cbiAgICAgIG9uTXVsdGlTZWxlY3Q9eyh0YWdzKSA9PiB7XG4gICAgICAgIGlmIChlZGl0aW5nVGFzaykgc2V0RWRpdGluZ1Rhc2soeyAuLi5lZGl0aW5nVGFzaywgX3RhZ3M6IHRhZ3MgfSk7XG4gICAgICB9fSAvPlxuICAgICAgXG5cbiAgICAgIHsvKiBFZGl0IHRhc2sgbW9kYWwgKi99XG4gICAgICA8QW5pbWF0ZVByZXNlbmNlIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjUzNDo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgIHtlZGl0aW5nVGFzayAmJlxuICAgICAgICA8bW90aW9uLmRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo1MzY6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBpbml0aWFsPXt7IG9wYWNpdHk6IDAgfX0gYW5pbWF0ZT17eyBvcGFjaXR5OiAxIH19IGV4aXQ9e3sgb3BhY2l0eTogMCB9fVxuICAgICAgICBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNTAgYmctYmxhY2svMzAgZmxleCBpdGVtcy1lbmQgc206aXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCJcbiAgICAgICAgb25DbGljaz17KCkgPT4gc2V0RWRpdGluZ1Rhc2sobnVsbCl9PlxuICAgICAgICAgICAgPG1vdGlvbi5kaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NTM5OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgaW5pdGlhbD17eyB5OiBcIjEwMCVcIiB9fSBhbmltYXRlPXt7IHk6IDAgfX0gZXhpdD17eyB5OiBcIjEwMCVcIiB9fVxuICAgICAgICAgIHRyYW5zaXRpb249e3sgdHlwZTogXCJzcHJpbmdcIiwgZGFtcGluZzogMjUgfX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLXQtMnhsIHNtOnJvdW5kZWQtMnhsIHctZnVsbCBzbTptYXgtdy1tZCBwLTUgbWF4LWgtWzgwdmhdIG92ZXJmbG93LXktYXV0byBzaGFkb3cteGxcIlxuICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfT5cbiAgICAgICAgICAgICAgPGgzIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjU0MzoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1mb3JlZ3JvdW5kIG1iLTRcIj5FZGl0YXIgVGFyZWZhPC9oMz5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo1NDQ6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjU0NToxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjU0NjoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiPk5vbWU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NTQ3OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtZm9yZWdyb3VuZCBtdC0wLjVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cInRpdGxlXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2VkaXRpbmdUYXNrPy5pZCB8fCBlZGl0aW5nVGFzaz8uX2lkfT57ZWRpdGluZ1Rhc2sudGl0bGV9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NTQ5OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NTUwOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCI+UGVyw61vZG8gZG8gZGlhPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NTUxOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBnYXAtMiBtdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIHtPYmplY3QuZW50cmllcyhQRVJJT0RfQ09ORklHKS5tYXAoKFtwLCBjZmddKSA9PlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo1NTM6MjJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBrZXk9e3B9IG9uQ2xpY2s9eygpID0+IHNldEVkaXRpbmdUYXNrKHsgLi4uZWRpdGluZ1Rhc2ssIF9wZXJpb2Q6IGVkaXRpbmdUYXNrLl9wZXJpb2QgPT09IHAgPyBudWxsIDogcCB9KX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXgtMSBweS0yLjUgcm91bmRlZC14bCB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICAoZWRpdGluZ1Rhc2suX3BlcmlvZCA/PyBlZGl0aW5nVGFzay5wZXJpb2QpID09PSBwID9cbiAgICAgICAgICAgICAgICAgIFwiYmctWyNFODdBNUFdIHRleHQtd2hpdGUgc2hhZG93LW1kXCIgOlxuICAgICAgICAgICAgICAgICAgXCJiZy1zZWNvbmRhcnkgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGhvdmVyOmJnLWJvcmRlclwifWBcbiAgICAgICAgICAgICAgICAgIH0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJlbW9qaVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtjZmc/LmlkIHx8IGNmZz8uX2lkfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtjZmcuZW1vaml9IHtjZmcubGFiZWx9XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo1NjQ6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo1NjU6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj5EZXNjcmnDp8OjbyAvIE5vdGE8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjU2NjoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHZhbHVlPXtlZGl0aW5nVGFzay5kZXNjcmlwdGlvbiB8fCBcIlwifVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0RWRpdGluZ1Rhc2soeyAuLi5lZGl0aW5nVGFzaywgZGVzY3JpcHRpb246IGUudGFyZ2V0LnZhbHVlIH0pfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiQWRpY2lvbmEgdW1hIG5vdGEuLi5cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBtdC0xIHB4LTMgcHktMiByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItYm9yZGVyIGJnLXNlY29uZGFyeS81MCB0ZXh0LXNtIHJlc2l6ZS1ub25lIGgtMjAgb3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1bI0U4N0E1QV0vNTAgdHJhbnNpdGlvbi1hbGxcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NTcxOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NTcyOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCI+VGFncyAoYXTDqSAzKTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjU3MzoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGdhcC0xLjUgbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgICB7KGVkaXRpbmdUYXNrLl90YWdzIHx8IFtdKS5tYXAoKHRhZywgaSkgPT5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjU3NToyMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17aX0gY2xhc3NOYW1lPXtgcHgtMi41IHB5LTEgcm91bmRlZC1mdWxsIHRleHQteHMgZm9udC1tZWRpdW0gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgJHt0YWdDbGFzcyh0YWcuY29sb3IpfWB9IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibmFtZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXt0YWc/LmlkIHx8IHRhZz8uX2lkfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0YWcubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NTc3OjI0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWQgPSBbLi4uZWRpdGluZ1Rhc2suX3RhZ3NdO1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWQuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgIHNldEVkaXRpbmdUYXNrKHsgLi4uZWRpdGluZ1Rhc2ssIF90YWdzOiB1cGRhdGVkIH0pO1xuICAgICAgICAgICAgICAgICAgICB9fT48WCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo1ODE6MjdcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgeyghZWRpdGluZ1Rhc2suX3RhZ3MgfHwgZWRpdGluZ1Rhc2suX3RhZ3MubGVuZ3RoIDwgMykgJiZcbiAgICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NTg1OjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gc2V0U2hvd0VkaXRUYWdQaWNrZXIodHJ1ZSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEgcm91bmRlZC1mdWxsIHRleHQteHMgYm9yZGVyIGJvcmRlci1kYXNoZWQgYm9yZGVyLWJvcmRlciB0ZXh0LW11dGVkLWZvcmVncm91bmQgaG92ZXI6Ym9yZGVyLVsjRTg3QTVBXS81MCB0cmFuc2l0aW9uLWFsbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgKyB0YWdcbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo1OTM6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yIG10LTVcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjU5NDoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldEVkaXRpbmdUYXNrKG51bGwpfSBjbGFzc05hbWU9XCJmbGV4LTEgcHktMi41IHJvdW5kZWQteGwgYmctc2Vjb25kYXJ5IHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGhvdmVyOmJnLWJvcmRlciB0cmFuc2l0aW9uLWFsbFwiPkNhbmNlbGFyPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo1OTU6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXt1cGRhdGVUYXNrRGV0YWlsc30gY2xhc3NOYW1lPVwiZmxleC0xIHB5LTIuNSByb3VuZGVkLXhsIGJnLVsjRTg3QTVBXSB0ZXh0LXdoaXRlIHRleHQtc20gZm9udC1tZWRpdW0gaG92ZXI6YmctWyNENDY5NEFdIHRyYW5zaXRpb24tYWxsXCI+R3VhcmRhcjwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgIH1cbiAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxuXG4gICAgICB7LyogVGFnIG1hbmFnZXIgbW9kYWwgKi99XG4gICAgICA8QW5pbWF0ZVByZXNlbmNlIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjYwMzo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgIHtzaG93VGFnTWFuYWdlciAmJlxuICAgICAgICA8bW90aW9uLmRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo2MDU6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBpbml0aWFsPXt7IG9wYWNpdHk6IDAgfX0gYW5pbWF0ZT17eyBvcGFjaXR5OiAxIH19IGV4aXQ9e3sgb3BhY2l0eTogMCB9fVxuICAgICAgICBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNTAgYmctYmxhY2svMzAgZmxleCBpdGVtcy1lbmQgc206aXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCJcbiAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd1RhZ01hbmFnZXIoZmFsc2UpfT5cbiAgICAgICAgICAgIDxtb3Rpb24uZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjYwODoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGluaXRpYWw9e3sgeTogXCIxMDAlXCIgfX0gYW5pbWF0ZT17eyB5OiAwIH19IGV4aXQ9e3sgeTogXCIxMDAlXCIgfX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLXQtMnhsIHNtOnJvdW5kZWQtMnhsIHctZnVsbCBzbTptYXgtdy1zbSBwLTUgc2hhZG93LXhsXCJcbiAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKX0+XG4gICAgICAgICAgICAgIDxoMyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo2MTE6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtZm9yZWdyb3VuZCBtYi00IGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+PFRhZ3MgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NjExOjg1XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1bI0U4N0E1QV1cIiAvPiBHZXJpciBUYWdzPC9oMz5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo2MTI6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yIG1iLTJcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NjEzOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgdmFsdWU9e25ld1RhZ05hbWV9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3VGFnTmFtZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgIG9uS2V5RG93bj17KGUpID0+IGUua2V5ID09PSBcIkVudGVyXCIgJiYgY3JlYXRlVGFnKCl9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTm92YSB0YWcuLi5cIiBjbGFzc05hbWU9XCJmbGV4LTEgcHgtMyBweS0yIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1ib3JkZXIgdGV4dC1zbSBvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLVsjRTg3QTVBXS81MCB0cmFuc2l0aW9uLWFsbFwiIC8+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo2MTY6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXtjcmVhdGVUYWd9IGNsYXNzTmFtZT1cInB4LTQgcHktMiByb3VuZGVkLXhsIGJnLVsjRTg3QTVBXSB0ZXh0LXdoaXRlIHRleHQtc20gZm9udC1tZWRpdW0gaG92ZXI6YmctWyNENDY5NEFdIHRyYW5zaXRpb24tYWxsXCI+PFBsdXMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NjE2OjE1NVwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz48L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9UYXNrQm9hcmQ6NjE4OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBnYXAtMS41IG1iLTMgZmxleC13cmFwXCI+XG4gICAgICAgICAgICAgICAge1BSRVNFVF9DT0xPUlMubWFwKChjLCBfX2FycklkeF9fKSA9PlxuICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjYyMDoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17Yy5rZXl9IG9uQ2xpY2s9eygpID0+IHtzZXROZXdUYWdDb2xvcihjLmtleSk7c2V0TmV3VGFnSGV4KFwiXCIpO319XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctNyBoLTcgcm91bmRlZC1mdWxsIGJvcmRlci0yIHRyYW5zaXRpb24tYWxsICR7bmV3VGFnQ29sb3IgPT09IGMua2V5ICYmICFuZXdUYWdIZXggPyBcImJvcmRlci1bI0U4N0E1QV0gc2NhbGUtMTEwIHNoYWRvdy1tZFwiIDogXCJib3JkZXItdHJhbnNwYXJlbnQgb3BhY2l0eS03MCBob3ZlcjpvcGFjaXR5LTEwMFwifWB9XG4gICAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogYy5oZXggfX0gdGl0bGU9e2Mua2V5fSBkYXRhLWFyci1pbmRleD17X19hcnJJZHhfX30gZGF0YS1hcnItdmFyaWFibGUtbmFtZT1cIlBSRVNFVF9DT0xPUlNcIiAvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDxpbnB1dCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo2MjQ6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiB2YWx1ZT17bmV3VGFnSGV4fSBvbkNoYW5nZT17KGUpID0+IHtzZXROZXdUYWdIZXgoZS50YXJnZXQudmFsdWUpO2lmIChlLnRhcmdldC52YWx1ZSkgc2V0TmV3VGFnQ29sb3IoXCJcIik7fX1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCIjaGV4XCIgbWF4TGVuZ3RoPXs3fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTE2IHB4LTIgcHktMSByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItYm9yZGVyIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBvdXRsaW5lLW5vbmVcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo2Mjg6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNSBtYXgtaC1bMTgwcHhdIG92ZXJmbG93LXktYXV0b1wiPlxuICAgICAgICAgICAgICAgIHthbGxUYWdzLmxlbmd0aCA9PT0gMCAmJiA8cCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo2Mjk6NDFcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LW11dGVkLWZvcmVncm91bmQgdGV4dC1jZW50ZXIgcHktNFwiPk5lbmh1bWEgdGFnPC9wPn1cbiAgICAgICAgICAgICAgICB7YWxsVGFncy5tYXAoKHRhZykgPT5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo2MzE6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBrZXk9e3RhZy5pZH0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHB4LTMgcHktMiByb3VuZGVkLXhsIGJnLXNlY29uZGFyeS81MCB0ZXh0LXNtXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e3RhZz8uaWR9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjYzMjoyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo2MzM6MjJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ3LTMgaC0zIHJvdW5kZWQtZnVsbFwiIHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogUFJFU0VUX0NPTE9SUy5maW5kKChjKSA9PiBjLmtleSA9PT0gdGFnLmNvbG9yKT8uaGV4IHx8IHRhZy5jb2xvciB9fSAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjYzNDoyMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQtZm9yZWdyb3VuZFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibmFtZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXt0YWc/LmlkfT57dGFnLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL1Rhc2tCb2FyZDo2MzY6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiBkZWxldGVUYWdGcm9tTWFuYWdlcih0YWcpfSBjbGFzc05hbWU9XCJ0ZXh0LW11dGVkLWZvcmVncm91bmQgaG92ZXI6dGV4dC1yb3NlLTUwMCB0cmFuc2l0aW9uLWFsbFwiPjxYIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjYzNjoxMzlcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvVGFza0JvYXJkOjY0MDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldFNob3dUYWdNYW5hZ2VyKGZhbHNlKX0gY2xhc3NOYW1lPVwidy1mdWxsIG10LTQgcHktMi41IHJvdW5kZWQteGwgYmctc2Vjb25kYXJ5IHRleHQtc20gZm9udC1tZWRpdW0gaG92ZXI6YmctYm9yZGVyIHRyYW5zaXRpb24tYWxsXCI+RmVjaGFyPC9idXR0b24+XG4gICAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICB9XG4gICAgICA8L0FuaW1hdGVQcmVzZW5jZT5cbiAgICA8L2Rpdj4pO1xuXG59Il0sImZpbGUiOiIvYXBwL3NyYy9wYWdlcy9UYXNrQm9hcmQuanN4In0=