import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, Check, X, Search, Filter, Trash2, Tags, ChevronLeft, ChevronRight, GripVertical } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Tag, Task } from "@/api/entities";
import { startOfWeek, endOfWeek, addWeeks, subWeeks, format, eachDayOfInterval } from "date-fns";
import { pt } from "date-fns/locale";
import TagPicker from "@/components/TagPicker";

const DAY_LABELS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
const DAY_KEYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const DAY_COLORS = [
"bg-[#E87A5A]/10 text-[#E87A5A]", "bg-blue-100 text-blue-700",
"bg-emerald-100 text-emerald-700", "bg-amber-100 text-amber-700",
"bg-rose-100 text-rose-600", "bg-purple-100 text-purple-700",
"bg-teal-100 text-teal-700"];


const DAY_HEX = ["#E87A5A", "#3B82F6", "#10B981", "#F59E0B", "#F43F5E", "#8B5CF6", "#14B8A6"];

const PERIOD_CONFIG = { morning: { label: "Manhã", emoji: "🌅" }, afternoon: { label: "Tarde", emoji: "☀️" }, evening: { label: "Noite", emoji: "🌙" } };

const PRESET_COLORS = [
{ key: "blue", hex: "#3B82F6" }, { key: "purple", hex: "#8B5CF6" },
{ key: "green", hex: "#10B981" }, { key: "amber", hex: "#F59E0B" },
{ key: "rose", hex: "#F43F5E" }, { key: "teal", hex: "#14B8A6" },
{ key: "indigo", hex: "#6366F1" }, { key: "pink", hex: "#EC4899" }];


const TAG_CLASS_MAP = {
  blue: "bg-blue-100 text-blue-700", purple: "bg-purple-100 text-purple-700",
  green: "bg-emerald-100 text-emerald-700", amber: "bg-amber-100 text-amber-700",
  rose: "bg-rose-100 text-rose-600", teal: "bg-teal-100 text-teal-700",
  indigo: "bg-indigo-100 text-indigo-700", pink: "bg-pink-100 text-pink-700"
};

function tagClass(color) {return TAG_CLASS_MAP[color] || "bg-slate-100 text-slate-700";}

function PeriodIcon({ period, color, "data-collection-item-id": __dataCollectionItemId }) {
  if (!period) return null;
  if (period === "morning") return (
    <svg data-source-location="pages/TaskBoard:44:4" data-dynamic-content="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" data-collection-item-id={__dataCollectionItemId}>
      <circle data-source-location="pages/TaskBoard:45:6" data-dynamic-content="false" cx="12" cy="12" r="4" /><path data-source-location="pages/TaskBoard:45:37" data-dynamic-content="false" d="M12 2v2" /><path data-source-location="pages/TaskBoard:45:56" data-dynamic-content="false" d="M12 20v2" /><path data-source-location="pages/TaskBoard:45:76" data-dynamic-content="false" d="m4.93 4.93 1.41 1.41" /><path data-source-location="pages/TaskBoard:45:108" data-dynamic-content="false" d="m17.66 17.66 1.41 1.41" /><path data-source-location="pages/TaskBoard:45:142" data-dynamic-content="false" d="M2 12h2" /><path data-source-location="pages/TaskBoard:45:161" data-dynamic-content="false" d="M20 12h2" /><path data-source-location="pages/TaskBoard:45:181" data-dynamic-content="false" d="m6.34 17.66-1.41 1.41" /><path data-source-location="pages/TaskBoard:45:214" data-dynamic-content="false" d="m19.07 4.93-1.41 1.41" />
    </svg>);

  if (period === "afternoon") return (
    <svg data-source-location="pages/TaskBoard:49:4" data-dynamic-content="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" data-collection-item-id={__dataCollectionItemId}>
      <circle data-source-location="pages/TaskBoard:50:6" data-dynamic-content="false" cx="12" cy="12" r="4" /><path data-source-location="pages/TaskBoard:50:37" data-dynamic-content="false" d="M12 2v2" /><path data-source-location="pages/TaskBoard:50:56" data-dynamic-content="false" d="M12 20v2" /><path data-source-location="pages/TaskBoard:50:76" data-dynamic-content="false" d="m19.07 4.93-1.41 1.41" />
    </svg>);

  return (
    <svg data-source-location="pages/TaskBoard:54:4" data-dynamic-content="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" data-collection-item-id={__dataCollectionItemId}>
      <path data-source-location="pages/TaskBoard:55:6" data-dynamic-content="false" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>);

}

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
  try {return JSON.parse(task.tags_json || "[]");} catch {return [];}
}

export default function TaskBoard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
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
    Task.list("order", 500).then(setTasks).catch(() => setTasks([]));
    Tag.list().then(setAllTags).catch(() => setAllTags([]));
  };

  useEffect(() => {refreshData();}, []);

  const tasksByKey = useMemo(() => {
    const map = {};
    ["none", ...DAY_KEYS].forEach((k) => {map[k] = [];});
    tasks.forEach((t) => {
      if (t.week_start !== weekKey) return;
      const k = t.weekday || "none";
      if (map[k]) map[k].push(t);else
      map[k] = [t];
    });
    Object.keys(map).forEach((k) => {map[k] = sortDayTasks(map[k]);});
    return map;
  }, [tasks, weekKey]);

  const addTask = async (key) => {
    const data = newTasks[key];
    if (!data?.title?.trim()) return;
    const existing = tasksByKey[key] || [];
    const maxOrder = Math.max(...existing.map((t) => t.order || 0), 0);
    const tags = data.tags || [];
    await Task.create({
      title: data.title.trim(), weekday: key === "none" ? "none" : key,
      completed: false, order: maxOrder + 1,
      week_start: weekKey, period: data.period || null, description: "",
      tags_json: JSON.stringify(tags)
    });
    setNewTasks((prev) => ({ ...prev, [key]: null }));
    setAddingTo(null);
    refreshData();
  };

  const toggleTask = async (task) => {
    await Task.update(task.id, { completed: !task.completed });
    refreshData();
  };

  const setPeriod = async (task, period) => {
    await Task.update(task.id, { period: task.period === period ? null : period });
    refreshData();
  };

  const deleteTask = async (taskId) => {
    await Task.delete(taskId).catch(() => {});
    refreshData();
  };

  const updateTaskDetails = async () => {
    if (!editingTask) return;
    const tags = editingTask._tags || [];
    await Task.update(editingTask.id, {
      description: editingTask.description || "",
      tags_json: JSON.stringify(tags),
      period: editingTask._period !== undefined ? editingTask._period : editingTask.period
    });
    setEditingTask(null);
    refreshData();
  };

  const clearWeek = async () => {
    const weekTasks = tasks.filter((t) => t.week_start === weekKey);
    for (const t of weekTasks) await Task.delete(t.id).catch(() => {});
    refreshData();
  };

  const createTag = async () => {
    const name = newTagName.trim();
    if (!name) return;
    let color = newTagColor;
    if (newTagHex.trim() && /^#[0-9A-Fa-f]{6}$/.test(newTagHex.trim())) color = newTagHex.trim();
    await Tag.create({ name, color });
    setNewTagName("");setNewTagHex("");setNewTagColor("blue");
    Tag.list().then(setAllTags).catch(() => {});
  };

  const deleteTagFromManager = async (tag) => {
    await Tag.delete(tag.id).catch(() => {});
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

  const handlePointerStart = useCallback((x, y) => {touchStart.current = { x, y };dragOffset.current = { x: 0, y: 0 };setDragStyle({});}, []);
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
    await Task.update(draggableId, { weekday: newWeekday === "none" ? "none" : newWeekday });

    // Reorder within same column
    const colTasks = tasksByKey[newWeekday] || [];
    if (source.droppableId === destination.droppableId) {
      const moved = colTasks[source.index];
      if (!moved) return refreshData();
      const reordered = [...colTasks];
      reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, moved);
      for (let i = 0; i < reordered.length; i++) {
        await Task.update(reordered[i].id, { order: i }).catch(() => {});
      }
    } else {
      // Update order in both source and destination columns  
      const srcCol = tasksByKey[source.droppableId] || [];
      const dstCol = [...(tasksByKey[newWeekday] || [])];
      const moved = srcCol[source.index];
      if (!moved) return refreshData();
      dstCol.splice(destination.index, 0, moved);
      for (let i = 0; i < dstCol.length; i++) {
        await Task.update(dstCol[i].id, { order: i }).catch(() => {});
      }
      // Update source column order
      const newSrc = srcCol.filter((t) => t.id !== moved.id);
      for (let i = 0; i < newSrc.length; i++) {
        await Task.update(newSrc[i].id, { order: i }).catch(() => {});
      }
    }
    refreshData();
  };

  const renderTaskCard = (task, idx, dayIdx) => {
    const tags = parseTags(task);
    const dayColor = DAY_HEX[dayIdx] || DAY_HEX[0];
    const isCompleted = task.completed;

    return (
      <Draggable data-source-location="pages/TaskBoard:259:6" data-dynamic-content="true" key={task.id} draggableId={task.id} index={idx} data-collection-item-id={task?.id}>
        {(provided, snapshot) =>
        <div data-source-location="pages/TaskBoard:261:10" data-dynamic-content="true"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={`bg-white rounded-xl shadow-sm border transition-all group relative overflow-hidden ${
        snapshot.isDragging ? "shadow-xl ring-2 ring-[#E87A5A]/30 scale-[1.02]" : "border-border hover:shadow-md"}`
        }>
          
            <div data-source-location="pages/TaskBoard:269:12" data-dynamic-content="true" className="p-3 cursor-pointer" onClick={() => setEditingTask({ ...task, _tags: tags, _period: task.period })} data-collection-item-field="period" data-collection-item-id={task?.id}>
              {/* Period icon top-right */}
              {task.period &&
            <div data-source-location="pages/TaskBoard:272:16" data-dynamic-content="true" className="absolute top-2 right-2 opacity-60">
                  <PeriodIcon data-source-location="pages/TaskBoard:273:18" data-dynamic-content="true" period={task.period} color={dayColor} />
                </div>
            }
              {/* Trash icon on hover */}
              <button data-source-location="pages/TaskBoard:277:14" data-dynamic-content="true"
            onClick={(e) => {e.stopPropagation();deleteTask(task.id);}}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white border border-border shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-50 hover:border-rose-200 hover:text-rose-500 z-10"
            style={task.period ? { right: "28px" } : {}}>
              
                <Trash2 data-source-location="pages/TaskBoard:282:16" data-dynamic-content="false" className="w-3 h-3" />
              </button>

              {/* Grip icon top-left on hover */}
              <div data-source-location="pages/TaskBoard:286:14" data-dynamic-content="false" className="absolute top-2 left-2 opacity-0 group-hover:opacity-40 transition-opacity">
                <GripVertical data-source-location="pages/TaskBoard:287:16" data-dynamic-content="false" className="w-3 h-3 text-muted-foreground" />
              </div>

              <div data-source-location="pages/TaskBoard:290:14" data-dynamic-content="true" className="flex items-start gap-2">
                <button data-source-location="pages/TaskBoard:291:16" data-dynamic-content="true" onClick={(e) => {e.stopPropagation();toggleTask(task);}}
              className={`mt-0.5 w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${isCompleted ? "bg-blue-500 border-blue-500" : "border-slate-300 hover:border-blue-400"}`}>
                  {isCompleted && <Check data-source-location="pages/TaskBoard:293:34" data-dynamic-content="false" className="w-2.5 h-2.5 text-white" />}
                </button>
                <div data-source-location="pages/TaskBoard:295:16" data-dynamic-content="true" className="flex-1 min-w-0">
                  <p data-source-location="pages/TaskBoard:296:18" data-dynamic-content="true" className={`text-sm ${isCompleted ? "line-through text-muted-foreground/50" : "text-foreground"}`} data-collection-item-field="title" data-collection-item-id={task?.id}>
                    {task.title}
                  </p>
                  {tags.length > 0 &&
                <div data-source-location="pages/TaskBoard:300:20" data-dynamic-content="true" className="flex flex-wrap gap-1 mt-1.5">
                      {tags.slice(0, 3).map((tag, i) =>
                  <span data-source-location="pages/TaskBoard:302:24" data-dynamic-content="true" key={i} className={`px-1.5 py-0.5 rounded-md text-[9px] font-medium ${tagClass(tag.color)}`} data-collection-item-field="name" data-collection-item-id={tag?.id}>{tag.name}</span>
                  )}
                    </div>
                }
                </div>
              </div>
            </div>
          </div>
        }
      </Draggable>);

  };

  const renderMiniForm = (key) => {
    const current = newTasks[key] || { title: "", period: null, tags: [] };
    return (
      <div data-source-location="pages/TaskBoard:318:6" data-dynamic-content="true" className="bg-white rounded-xl p-3 shadow-sm border border-[#E87A5A]/30 space-y-2">
        <input data-source-location="pages/TaskBoard:319:8" data-dynamic-content="true" autoFocus value={current.title}
        onChange={(e) => setNewTaskField(key, "title", e.target.value)}
        onKeyDown={(e) => {if (e.key === "Enter") addTask(key);if (e.key === "Escape") setAddingTo(null);}}
        placeholder="Nova tarefa..." className="w-full text-sm bg-transparent outline-none" />
        <div data-source-location="pages/TaskBoard:323:8" data-dynamic-content="true" className="flex gap-1">
          {Object.entries(PERIOD_CONFIG).map(([p, cfg]) =>
          <button data-source-location="pages/TaskBoard:325:12" data-dynamic-content="true" key={p} onClick={() => setNewTaskField(key, "period", current.period === p ? null : p)}
          className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all ${current.period === p ? "bg-[#E87A5A] text-white" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`} data-collection-item-field="emoji" data-collection-item-id={cfg?.id || cfg?._id}>
              {cfg.emoji}
            </button>
          )}
        </div>
        <div data-source-location="pages/TaskBoard:331:8" data-dynamic-content="true" className="flex flex-wrap gap-1" data-collection-item-field="tags" data-collection-item-id={current?.id || current?._id}>
          {current.tags.map((tag, i) =>
          <span data-source-location="pages/TaskBoard:333:12" data-dynamic-content="true" key={i} className={`px-2 py-0.5 rounded-full text-[9px] font-medium flex items-center gap-0.5 ${tagClass(tag.color)}`} data-collection-item-field="name" data-collection-item-id={tag?.id || tag?._id}>
              {tag.name}
              <button data-source-location="pages/TaskBoard:335:14" data-dynamic-content="true" onClick={() => {const u = current.tags.filter((_, j) => j !== i);setNewTaskField(key, "tags", u);}}>
                <X data-source-location="pages/TaskBoard:336:16" data-dynamic-content="false" className="w-2.5 h-2.5" />
              </button>
            </span>
          )}
          {current.tags.length < 3 &&
          <button data-source-location="pages/TaskBoard:341:12" data-dynamic-content="true" onClick={() => setShowTagPickerFor(key)}
          className="px-2 py-0.5 rounded-full text-[9px] text-muted-foreground border border-dashed border-border hover:border-[#E87A5A]/50 hover:text-[#E87A5A] transition-all">
              + tag
            </button>
          }
        </div>
        <div data-source-location="pages/TaskBoard:347:8" data-dynamic-content="true" className="flex gap-2">
          <button data-source-location="pages/TaskBoard:348:10" data-dynamic-content="true" onClick={() => addTask(key)} className="flex-1 py-1.5 rounded-lg bg-[#E87A5A] text-white text-xs font-medium hover:bg-[#D4694A] transition-all">Adicionar</button>
          <button data-source-location="pages/TaskBoard:349:10" data-dynamic-content="true" onClick={() => setAddingTo(null)} className="px-3 py-1.5 rounded-lg bg-secondary text-muted-foreground text-xs"><X data-source-location="pages/TaskBoard:349:130" data-dynamic-content="false" className="w-3 h-3" /></button>
        </div>
      </div>);

  };

  const renderColumn = (key, label, dayIdx) => {
    const dayTasks = tasksByKey[key] || [];
    const isAdding = addingTo === key;
    const dayInfo = weekDays[dayIdx];
    const dayOfMonth = dayInfo ? format(dayInfo, "d") : key === "none" ? "" : "";

    return (
      <div data-source-location="pages/TaskBoard:362:6" data-dynamic-content="true" className="flex-shrink-0 w-[200px] flex flex-col" data-collection-item-id={key?.["data-collection-item-id"]}>
        <div data-source-location="pages/TaskBoard:363:8" data-dynamic-content="true" className={`rounded-2xl px-3 py-2.5 mb-3 font-semibold text-xs flex items-center justify-between ${key === "none" ? "bg-slate-100 text-slate-600" : DAY_COLORS[dayIdx]}`}>
          <span data-source-location="pages/TaskBoard:364:10" data-dynamic-content="true" data-collection-item-field="label">{label}</span>
          <span data-source-location="pages/TaskBoard:365:10" data-dynamic-content="true" className="flex items-center gap-1.5">
            {dayOfMonth && <span data-source-location="pages/TaskBoard:366:27" data-dynamic-content="true" className="opacity-70 text-[11px]" data-collection-item-field="dayOfMonth">{dayOfMonth}</span>}
            <span data-source-location="pages/TaskBoard:367:12" data-dynamic-content="true" className="bg-white/20 rounded-full px-1.5 py-0.5 text-[10px]">{dayTasks.length}</span>
          </span>
        </div>

        <Droppable data-source-location="pages/TaskBoard:371:8" data-dynamic-content="true" droppableId={key} type="TASK">
          {(provided, snapshot) =>
          <div data-source-location="pages/TaskBoard:373:12" data-dynamic-content="true"
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`flex-1 space-y-2 rounded-xl p-1 transition-colors ${snapshot.isDraggingOver ? "bg-[#E87A5A]/5" : ""}`} data-collection-item-field="placeholder" data-collection-item-id={provided?.id || provided?._id}>
            
              {dayTasks.map((task, idx) => renderTaskCard(task, idx, dayIdx))}
              {provided.placeholder}

              {isAdding ? renderMiniForm(key) :
            <button data-source-location="pages/TaskBoard:382:16" data-dynamic-content="true" onClick={() => {
              setNewTasks({ ...newTasks, [key]: { title: "", period: null, tags: [] } });
              setAddingTo(key);
            }} className="w-full flex items-center justify-center gap-1 py-3 rounded-xl border-2 border-dashed border-border text-muted-foreground/60 hover:text-[#E87A5A] hover:border-[#E87A5A]/30 transition-all text-xs">
                  <Plus data-source-location="pages/TaskBoard:386:18" data-dynamic-content="false" className="w-3 h-3" /> Nova tarefa
                </button>
            }
            </div>
          }
        </Droppable>
      </div>);

  };

  return (
    <div data-source-location="pages/TaskBoard:397:4" data-dynamic-content="true"
    className="min-h-screen bg-cream flex flex-col select-none"
    onTouchStart={(e) => handlePointerStart(e.touches[0].clientX, e.touches[0].clientY)}
    onTouchMove={(e) => handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)}
    onTouchEnd={(e) => handlePointerEnd(e.changedTouches[0]?.clientX || touchStart.current.x, e.changedTouches[0]?.clientY || touchStart.current.y)}
    onMouseDown={(e) => handlePointerStart(e.clientX, e.clientY)}
    onMouseMove={(e) => {if (e.buttons === 1) handlePointerMove(e.clientX, e.clientY);}}
    onMouseUp={(e) => handlePointerEnd(e.clientX, e.clientY)}>
      
      <div data-source-location="pages/TaskBoard:406:6" data-dynamic-content="true" style={dragStyle} className="flex-1 flex flex-col">
        {/* Header */}
        <div data-source-location="pages/TaskBoard:408:8" data-dynamic-content="true" className="bg-white border-b border-border px-4 py-3">
          <div data-source-location="pages/TaskBoard:409:10" data-dynamic-content="true" className="flex items-center justify-between mb-3">
            <div data-source-location="pages/TaskBoard:410:12" data-dynamic-content="true" className="flex items-center gap-3">
              <button data-source-location="pages/TaskBoard:411:14" data-dynamic-content="true" onClick={() => navigate("/")} className="w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
                <ArrowRight data-source-location="pages/TaskBoard:412:16" data-dynamic-content="false" className="w-5 h-5" />
              </button>
              <div data-source-location="pages/TaskBoard:414:14" data-dynamic-content="true">
                <h1 data-source-location="pages/TaskBoard:415:16" data-dynamic-content="false" className="text-lg font-bold text-foreground">Tarefas</h1>
                <p data-source-location="pages/TaskBoard:416:16" data-dynamic-content="true" className="text-[11px] text-muted-foreground">
                  {format(weekStart, "d", { locale: pt })} - {format(weekEnd, "d 'de' MMM", { locale: pt })}
                </p>
              </div>
            </div>
            <div data-source-location="pages/TaskBoard:421:12" data-dynamic-content="true" className="flex items-center gap-2">
              <button data-source-location="pages/TaskBoard:422:14" data-dynamic-content="true" onClick={prevWeek} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-border transition-all">
                <ChevronLeft data-source-location="pages/TaskBoard:423:16" data-dynamic-content="false" className="w-4 h-4" />
              </button>
              <span data-source-location="pages/TaskBoard:425:14" data-dynamic-content="true" className="text-xs font-semibold text-foreground min-w-[60px] text-center">{format(weekStart, "MMM", { locale: pt })}</span>
              <button data-source-location="pages/TaskBoard:426:14" data-dynamic-content="true" onClick={nextWeek} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-border transition-all">
                <ChevronRight data-source-location="pages/TaskBoard:427:16" data-dynamic-content="false" className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div data-source-location="pages/TaskBoard:431:10" data-dynamic-content="true" className="flex items-center gap-2 flex-wrap">
            <button data-source-location="pages/TaskBoard:432:12" data-dynamic-content="true" onClick={() => setShowSearch(true)} className="py-2 px-3 rounded-xl bg-secondary text-xs font-medium text-muted-foreground flex items-center gap-1 hover:bg-border transition-all">
              <Search data-source-location="pages/TaskBoard:433:14" data-dynamic-content="false" className="w-3.5 h-3.5" /> Pesquisar
            </button>
            <button data-source-location="pages/TaskBoard:435:12" data-dynamic-content="true" onClick={() => setFilterPeriod(filterPeriod ? null : "morning")} className={`py-2 px-3 rounded-xl text-xs font-medium flex items-center gap-1 transition-all ${filterPeriod ? "bg-[#E87A5A] text-white" : "bg-secondary text-muted-foreground hover:bg-border"}`}>
              <Filter data-source-location="pages/TaskBoard:436:14" data-dynamic-content="false" className="w-3.5 h-3.5" /> {filterPeriod ? PERIOD_CONFIG[filterPeriod]?.emoji : "Período"}
            </button>
            <button data-source-location="pages/TaskBoard:438:12" data-dynamic-content="true" onClick={() => setFilterCompleted(filterCompleted === null ? false : filterCompleted === false ? true : null)}
            className={`py-2 px-3 rounded-xl text-xs font-medium flex items-center gap-1 transition-all ${filterCompleted !== null ? "bg-[#E87A5A] text-white" : "bg-secondary text-muted-foreground hover:bg-border"}`}>
              <Check data-source-location="pages/TaskBoard:440:14" data-dynamic-content="false" className="w-3.5 h-3.5" />
              {filterCompleted === null ? "Todas" : filterCompleted ? "Concluídas" : "Por fazer"}
            </button>
            <button data-source-location="pages/TaskBoard:443:12" data-dynamic-content="true" onClick={() => setShowTagManager(true)} className="py-2 px-3 rounded-xl bg-secondary text-xs font-medium text-muted-foreground flex items-center gap-1 hover:bg-border transition-all">
              <Tags data-source-location="pages/TaskBoard:444:14" data-dynamic-content="false" className="w-3.5 h-3.5" /> <span data-source-location="pages/TaskBoard:444:47" data-dynamic-content="false" className="hidden sm:inline">Tags</span>
            </button>
            <button data-source-location="pages/TaskBoard:446:12" data-dynamic-content="true" onClick={clearWeek} className="py-2 px-3 rounded-xl bg-rose-50 text-rose-600 text-xs font-medium flex items-center gap-1 hover:bg-rose-100 transition-all">
              <Trash2 data-source-location="pages/TaskBoard:447:14" data-dynamic-content="false" className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter period sub-selector */}
        <AnimatePresence data-source-location="pages/TaskBoard:453:8" data-dynamic-content="true">
          {filterPeriod &&
          <div data-source-location="pages/TaskBoard:455:12" data-dynamic-content="true" className="flex gap-2 px-4 py-2 bg-white border-b border-border">
              {Object.entries(PERIOD_CONFIG).map(([p, cfg]) =>
            <button data-source-location="pages/TaskBoard:457:16" data-dynamic-content="true" key={p} onClick={() => setFilterPeriod(p === filterPeriod ? null : p)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${p === filterPeriod ? "bg-[#E87A5A] text-white" : "bg-secondary text-muted-foreground"}`} data-collection-item-field="emoji" data-collection-item-id={cfg?.id || cfg?._id}>
                  {cfg.emoji} {cfg.label}
                </button>
            )}
            </div>
          }
        </AnimatePresence>

        {/* Search popup */}
        <AnimatePresence data-source-location="pages/TaskBoard:467:8" data-dynamic-content="true">
          {showSearch &&
          <motion.div data-source-location="pages/TaskBoard:469:12" data-dynamic-content="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/20 flex items-end sm:items-center justify-center"
          onClick={() => setShowSearch(false)}>
              <motion.div data-source-location="pages/TaskBoard:472:14" data-dynamic-content="true" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
                <h3 data-source-location="pages/TaskBoard:474:16" data-dynamic-content="false" className="font-bold text-foreground mb-3">Pesquisar Tarefas</h3>
                <input data-source-location="pages/TaskBoard:475:16" data-dynamic-content="true" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Escreve para pesquisar..." autoFocus
              className="w-full px-4 py-3 rounded-xl border border-border text-sm outline-none focus:border-[#E87A5A]/50 transition-all" />
                <div data-source-location="pages/TaskBoard:477:16" data-dynamic-content="true" className="flex gap-2 mt-3 flex-wrap">
                  <button data-source-location="pages/TaskBoard:478:18" data-dynamic-content="true" onClick={() => {setFilterPeriod(null);setFilterCompleted(null);}} className={`py-1.5 px-3 rounded-lg text-xs font-medium ${filterPeriod === null && filterCompleted === null ? "bg-[#E87A5A] text-white" : "bg-secondary"}`}>Todos</button>
                  {Object.entries(PERIOD_CONFIG).map(([p, cfg]) =>
                <button data-source-location="pages/TaskBoard:480:20" data-dynamic-content="true" key={p} onClick={() => setFilterPeriod(p === filterPeriod ? null : p)} className={`py-1.5 px-3 rounded-lg text-xs font-medium ${filterPeriod === p ? "bg-[#E87A5A] text-white" : "bg-secondary"}`} data-collection-item-field="emoji" data-collection-item-id={cfg?.id || cfg?._id}>{cfg.emoji} {cfg.label}</button>
                )}
                  <button data-source-location="pages/TaskBoard:482:18" data-dynamic-content="true" onClick={() => setFilterCompleted(filterCompleted === null ? false : null)} className={`py-1.5 px-3 rounded-lg text-xs font-medium ${filterCompleted === false ? "bg-[#E87A5A] text-white" : "bg-secondary"}`}>Por fazer</button>
                  <button data-source-location="pages/TaskBoard:483:18" data-dynamic-content="true" onClick={() => setFilterCompleted(filterCompleted === null ? true : null)} className={`py-1.5 px-3 rounded-lg text-xs font-medium ${filterCompleted === true ? "bg-[#E87A5A] text-white" : "bg-secondary"}`}>Concluídas</button>
                </div>
                {searchQuery &&
              <div data-source-location="pages/TaskBoard:486:18" data-dynamic-content="true" className="mt-3 space-y-1 max-h-[200px] overflow-y-auto">
                    {filteredTasks.slice(0, 10).map((t) =>
                <div data-source-location="pages/TaskBoard:488:22" data-dynamic-content="true" key={t.id} className="text-xs px-3 py-2 rounded-lg bg-secondary/50 text-foreground" data-collection-item-id={t?.id} data-collection-item-field="title">{t.title}</div>
                )}
                  </div>
              }
                <button data-source-location="pages/TaskBoard:492:16" data-dynamic-content="true" onClick={() => setShowSearch(false)} className="w-full mt-4 py-2.5 rounded-xl bg-secondary text-sm font-medium hover:bg-border transition-all">Fechar</button>
              </motion.div>
            </motion.div>
          }
        </AnimatePresence>

        {/* Kanban columns with drag and drop */}
        <DragDropContext data-source-location="pages/TaskBoard:499:8" data-dynamic-content="true" onDragEnd={onDragEnd}>
          <div data-source-location="pages/TaskBoard:500:10" data-dynamic-content="true" className="flex-1 overflow-auto">
            <div data-source-location="pages/TaskBoard:501:12" data-dynamic-content="true" className="flex gap-3 p-4 min-h-full" style={{ minWidth: `${(DAY_KEYS.length + 1) * 225}px` }}>
              {/* Monday to Sunday */}
              {DAY_KEYS.map((key, idx) => renderColumn(key, DAY_LABELS[idx].substring(0, 3), idx))}
              {/* "Sem dia" after Sunday */}
              {renderColumn("none", "Sem dia", 0)}
            </div>
          </div>
        </DragDropContext>
      </div>

      {/* TagPicker for mini form */}
      <TagPicker data-source-location="pages/TaskBoard:512:6" data-dynamic-content="true"
      open={!!showTagPickerFor}
      onClose={() => setShowTagPickerFor(null)}
      multiSelect={true}
      selectedTags={showTagPickerFor && newTasks[showTagPickerFor] ? newTasks[showTagPickerFor].tags || [] : []}
      onMultiSelect={(tags) => {
        if (showTagPickerFor) setNewTaskField(showTagPickerFor, "tags", tags);
      }} />
      

      {/* TagPicker for edit modal */}
      <TagPicker data-source-location="pages/TaskBoard:523:6" data-dynamic-content="true"
      open={showEditTagPicker}
      onClose={() => setShowEditTagPicker(false)}
      multiSelect={true}
      selectedTags={editingTask?._tags || []}
      onMultiSelect={(tags) => {
        if (editingTask) setEditingTask({ ...editingTask, _tags: tags });
      }} />
      

      {/* Edit task modal */}
      <AnimatePresence data-source-location="pages/TaskBoard:534:6" data-dynamic-content="true">
        {editingTask &&
        <motion.div data-source-location="pages/TaskBoard:536:10" data-dynamic-content="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/30 flex items-end sm:items-center justify-center"
        onClick={() => setEditingTask(null)}>
            <motion.div data-source-location="pages/TaskBoard:539:12" data-dynamic-content="true" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md p-5 max-h-[80vh] overflow-y-auto shadow-xl"
          onClick={(e) => e.stopPropagation()}>
              <h3 data-source-location="pages/TaskBoard:543:14" data-dynamic-content="false" className="font-bold text-foreground mb-4">Editar Tarefa</h3>
              <div data-source-location="pages/TaskBoard:544:14" data-dynamic-content="true" className="space-y-3">
                <div data-source-location="pages/TaskBoard:545:16" data-dynamic-content="true">
                  <label data-source-location="pages/TaskBoard:546:18" data-dynamic-content="false" className="text-xs font-medium text-muted-foreground">Nome</label>
                  <p data-source-location="pages/TaskBoard:547:18" data-dynamic-content="true" className="text-sm font-semibold text-foreground mt-0.5" data-collection-item-field="title" data-collection-item-id={editingTask?.id || editingTask?._id}>{editingTask.title}</p>
                </div>
                <div data-source-location="pages/TaskBoard:549:16" data-dynamic-content="true">
                  <label data-source-location="pages/TaskBoard:550:18" data-dynamic-content="false" className="text-xs font-medium text-muted-foreground">Período do dia</label>
                  <div data-source-location="pages/TaskBoard:551:18" data-dynamic-content="true" className="flex gap-2 mt-1">
                    {Object.entries(PERIOD_CONFIG).map(([p, cfg]) =>
                  <button data-source-location="pages/TaskBoard:553:22" data-dynamic-content="true" key={p} onClick={() => setEditingTask({ ...editingTask, _period: editingTask._period === p ? null : p })}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  (editingTask._period ?? editingTask.period) === p ?
                  "bg-[#E87A5A] text-white shadow-md" :
                  "bg-secondary text-muted-foreground hover:bg-border"}`
                  } data-collection-item-field="emoji" data-collection-item-id={cfg?.id || cfg?._id}>
                        {cfg.emoji} {cfg.label}
                      </button>
                  )}
                  </div>
                </div>
                <div data-source-location="pages/TaskBoard:564:16" data-dynamic-content="true">
                  <label data-source-location="pages/TaskBoard:565:18" data-dynamic-content="false" className="text-xs font-medium text-muted-foreground">Descrição / Nota</label>
                  <textarea data-source-location="pages/TaskBoard:566:18" data-dynamic-content="true" value={editingTask.description || ""}
                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                placeholder="Adiciona uma nota..."
                className="w-full mt-1 px-3 py-2 rounded-xl border border-border bg-secondary/50 text-sm resize-none h-20 outline-none focus:border-[#E87A5A]/50 transition-all" />
                </div>
                <div data-source-location="pages/TaskBoard:571:16" data-dynamic-content="true">
                  <label data-source-location="pages/TaskBoard:572:18" data-dynamic-content="false" className="text-xs font-medium text-muted-foreground">Tags (até 3)</label>
                  <div data-source-location="pages/TaskBoard:573:18" data-dynamic-content="true" className="flex flex-wrap gap-1.5 mt-1">
                    {(editingTask._tags || []).map((tag, i) =>
                  <span data-source-location="pages/TaskBoard:575:22" data-dynamic-content="true" key={i} className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${tagClass(tag.color)}`} data-collection-item-field="name" data-collection-item-id={tag?.id || tag?._id}>
                        {tag.name}
                        <button data-source-location="pages/TaskBoard:577:24" data-dynamic-content="true" onClick={() => {
                      const updated = [...editingTask._tags];
                      updated.splice(i, 1);
                      setEditingTask({ ...editingTask, _tags: updated });
                    }}><X data-source-location="pages/TaskBoard:581:27" data-dynamic-content="false" className="w-3 h-3" /></button>
                      </span>
                  )}
                    {(!editingTask._tags || editingTask._tags.length < 3) &&
                  <button data-source-location="pages/TaskBoard:585:22" data-dynamic-content="true" onClick={() => setShowEditTagPicker(true)}
                  className="px-3 py-1 rounded-full text-xs border border-dashed border-border text-muted-foreground hover:border-[#E87A5A]/50 transition-all">
                        + tag
                      </button>
                  }
                  </div>
                </div>
              </div>
              <div data-source-location="pages/TaskBoard:593:14" data-dynamic-content="true" className="flex gap-2 mt-5">
                <button data-source-location="pages/TaskBoard:594:16" data-dynamic-content="true" onClick={() => setEditingTask(null)} className="flex-1 py-2.5 rounded-xl bg-secondary text-sm font-medium text-muted-foreground hover:bg-border transition-all">Cancelar</button>
                <button data-source-location="pages/TaskBoard:595:16" data-dynamic-content="true" onClick={updateTaskDetails} className="flex-1 py-2.5 rounded-xl bg-[#E87A5A] text-white text-sm font-medium hover:bg-[#D4694A] transition-all">Guardar</button>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Tag manager modal */}
      <AnimatePresence data-source-location="pages/TaskBoard:603:6" data-dynamic-content="true">
        {showTagManager &&
        <motion.div data-source-location="pages/TaskBoard:605:10" data-dynamic-content="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/30 flex items-end sm:items-center justify-center"
        onClick={() => setShowTagManager(false)}>
            <motion.div data-source-location="pages/TaskBoard:608:12" data-dynamic-content="true" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
          className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm p-5 shadow-xl"
          onClick={(e) => e.stopPropagation()}>
              <h3 data-source-location="pages/TaskBoard:611:14" data-dynamic-content="false" className="font-bold text-foreground mb-4 flex items-center gap-2"><Tags data-source-location="pages/TaskBoard:611:85" data-dynamic-content="false" className="w-4 h-4 text-[#E87A5A]" /> Gerir Tags</h3>
              <div data-source-location="pages/TaskBoard:612:14" data-dynamic-content="true" className="flex gap-2 mb-2">
                <input data-source-location="pages/TaskBoard:613:16" data-dynamic-content="true" value={newTagName} onChange={(e) => setNewTagName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createTag()}
              placeholder="Nova tag..." className="flex-1 px-3 py-2 rounded-xl border border-border text-sm outline-none focus:border-[#E87A5A]/50 transition-all" />
                <button data-source-location="pages/TaskBoard:616:16" data-dynamic-content="true" onClick={createTag} className="px-4 py-2 rounded-xl bg-[#E87A5A] text-white text-sm font-medium hover:bg-[#D4694A] transition-all"><Plus data-source-location="pages/TaskBoard:616:155" data-dynamic-content="false" className="w-4 h-4" /></button>
              </div>
              <div data-source-location="pages/TaskBoard:618:14" data-dynamic-content="true" className="flex gap-1.5 mb-3 flex-wrap">
                {PRESET_COLORS.map((c, __arrIdx__) =>
              <button data-source-location="pages/TaskBoard:620:18" data-dynamic-content="true" key={c.key} onClick={() => {setNewTagColor(c.key);setNewTagHex("");}}
              className={`w-7 h-7 rounded-full border-2 transition-all ${newTagColor === c.key && !newTagHex ? "border-[#E87A5A] scale-110 shadow-md" : "border-transparent opacity-70 hover:opacity-100"}`}
              style={{ backgroundColor: c.hex }} title={c.key} data-arr-index={__arrIdx__} data-arr-variable-name="PRESET_COLORS" />
              )}
                <input data-source-location="pages/TaskBoard:624:16" data-dynamic-content="true" value={newTagHex} onChange={(e) => {setNewTagHex(e.target.value);if (e.target.value) setNewTagColor("");}}
              placeholder="#hex" maxLength={7}
              className="w-16 px-2 py-1 rounded-lg border border-border text-[10px] font-mono outline-none" />
              </div>
              <div data-source-location="pages/TaskBoard:628:14" data-dynamic-content="true" className="space-y-1.5 max-h-[180px] overflow-y-auto">
                {allTags.length === 0 && <p data-source-location="pages/TaskBoard:629:41" data-dynamic-content="false" className="text-sm text-muted-foreground text-center py-4">Nenhuma tag</p>}
                {allTags.map((tag) =>
              <div data-source-location="pages/TaskBoard:631:18" data-dynamic-content="true" key={tag.id} className="flex items-center justify-between px-3 py-2 rounded-xl bg-secondary/50 text-sm" data-collection-item-id={tag?.id}>
                    <div data-source-location="pages/TaskBoard:632:20" data-dynamic-content="true" className="flex items-center gap-2">
                      <div data-source-location="pages/TaskBoard:633:22" data-dynamic-content="true" className="w-3 h-3 rounded-full" style={{ backgroundColor: PRESET_COLORS.find((c) => c.key === tag.color)?.hex || tag.color }} />
                      <span data-source-location="pages/TaskBoard:634:22" data-dynamic-content="true" className="text-foreground" data-collection-item-field="name" data-collection-item-id={tag?.id}>{tag.name}</span>
                    </div>
                    <button data-source-location="pages/TaskBoard:636:20" data-dynamic-content="true" onClick={() => deleteTagFromManager(tag)} className="text-muted-foreground hover:text-rose-500 transition-all"><X data-source-location="pages/TaskBoard:636:139" data-dynamic-content="false" className="w-3.5 h-3.5" /></button>
                  </div>
              )}
              </div>
              <button data-source-location="pages/TaskBoard:640:14" data-dynamic-content="true" onClick={() => setShowTagManager(false)} className="w-full mt-4 py-2.5 rounded-xl bg-secondary text-sm font-medium hover:bg-border transition-all">Fechar</button>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}