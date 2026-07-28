import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Check, Lock, Loader2, ChevronLeft, ChevronRight,
  Plus, X, GripVertical, Eye, Shield,
} from "lucide-react";
import { supabase } from "@/api/supabaseClient";
import {
  startOfWeek, endOfWeek, addWeeks, subWeeks, format, eachDayOfInterval,
} from "date-fns";
import { pt } from "date-fns/locale";
import { useLang } from "@/context/LangContext";

// ─── Constants (mirrors TaskBoard) ──────────────────────────────────────────
const DAY_KEYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday", "none"];
const DAY_LABELS_PT = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo", "Sem dia"];
const DAY_LABELS_EN = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "No day"];
const DAY_HEX = ["#3B82F6","#6366F1","#8B5CF6","#A855F7","#EC4899","#F59E0B","#10B981","#94A3B8"];

const PRIORITY_DOT = { low: "#94A3B8", medium: "#F59E0B", high: "#EF4444" };

function parseTags(task) {
  try { return JSON.parse(task.tags_json || "[]"); } catch { return []; }
}
function parseSubtasks(task) {
  try { return JSON.parse(task.subtasks_json || "[]"); } catch { return []; }
}
function tagStyle(color) {
  if (!color) return { className: "bg-secondary text-muted-foreground" };
  if (color.startsWith("#")) return { className: "bg-secondary text-foreground", style: { borderLeft: `3px solid ${color}` } };
  const MAP = {
    blue: "bg-blue-100 text-blue-700", purple: "bg-purple-100 text-purple-700",
    green: "bg-emerald-100 text-emerald-700", amber: "bg-amber-100 text-amber-700",
    rose: "bg-rose-100 text-rose-700", teal: "bg-teal-100 text-teal-700",
    indigo: "bg-indigo-100 text-indigo-700", pink: "bg-pink-100 text-pink-700",
  };
  return { className: MAP[color] || "bg-secondary text-muted-foreground" };
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function SharedTasksView() {
  const { ownerId } = useParams();
  const navigate = useNavigate();
  const { lang } = useLang();

  const [tasks, setTasks] = useState([]);
  const [ownerName, setOwnerName] = useState("");
  const [role, setRole] = useState("viewer");
  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [addingTo, setAddingTo] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [expandedTask, setExpandedTask] = useState(null);

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const weekKey = format(weekStart, "yyyy-MM-dd");
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const dayLabel = (i) => (lang === "pt" ? DAY_LABELS_PT : DAY_LABELS_EN)[i];

  useEffect(() => { loadData(); }, [ownerId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/"); return; }

      const { data: share, error: shareErr } = await supabase
        .from("task_shares")
        .select("role, expires_at, owner_id, owner_email")
        .eq("owner_id", ownerId)
        .eq("shared_with_email", user.email)
        .single();

      if (shareErr || !share) { setDenied(true); setLoading(false); return; }
      if (share.expires_at && new Date(share.expires_at) < new Date()) { setDenied(true); setLoading(false); return; }

      setRole(share.role);
      setOwnerName(share.owner_email || ownerId);

      await fetchTasks();
    } catch (e) {
      console.error("SharedTasksView error:", e);
      setDenied(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("created_by_id", ownerId)
      .order("order", { ascending: true });
    if (!error) setTasks(data || []);
    else console.error("tasks fetch error:", error);
  };

  const weekTasks = useMemo(
    () => tasks.filter((t) => t.week_start === weekKey),
    [tasks, weekKey]
  );

  const tasksByDay = useMemo(() => {
    const map = {};
    for (const k of DAY_KEYS) map[k] = [];
    for (const t of weekTasks) {
      const k = t.weekday || "none";
      if (map[k]) map[k].push(t);
    }
    return map;
  }, [weekTasks]);

  const toggleTask = async (task) => {
    if (role !== "editor") return;
    const { error } = await supabase
      .from("tasks")
      .update({ completed: !task.completed })
      .eq("id", task.id);
    if (!error) setTasks((prev) => prev.map((t) => t.id === task.id ? { ...t, completed: !t.completed } : t));
  };

  const toggleSubtask = async (task, subtaskId) => {
    if (role !== "editor") return;
    const subtasks = parseSubtasks(task).map((s) => s.id === subtaskId ? { ...s, completed: !s.completed } : s);
    const { error } = await supabase
      .from("tasks")
      .update({ subtasks_json: JSON.stringify(subtasks) })
      .eq("id", task.id);
    if (!error) setTasks((prev) => prev.map((t) => t.id === task.id ? { ...t, subtasks_json: JSON.stringify(subtasks) } : t));
  };

  const addTask = async (dayKey) => {
    if (!newTitle.trim() || role !== "editor") return;
    const { data, error } = await supabase
      .from("tasks")
      .insert({
        created_by_id: ownerId,
        title: newTitle.trim(),
        weekday: dayKey,
        week_start: weekKey,
        completed: false,
        order: (tasksByDay[dayKey]?.length || 0),
        subtasks_json: "[]",
        tags_json: "[]",
        priority: "medium",
        recurrence: "none",
      })
      .select()
      .single();
    if (!error && data) {
      setTasks((prev) => [...prev, data]);
      setNewTitle("");
      setAddingTo(null);
    } else {
      console.error("add task error:", error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (denied) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center gap-4 bg-background px-6">
        <div className="w-14 h-14 rounded-3xl bg-rose-50 flex items-center justify-center">
          <Lock className="w-6 h-6 text-rose-500" />
        </div>
        <div className="text-center">
          <p className="font-bold text-foreground text-lg">Acesso negado</p>
          <p className="text-sm text-muted-foreground mt-1">Esta planilha não está partilhada contigo ou o acesso expirou.</p>
        </div>
        <button onClick={() => navigate("/")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#3B82F6] text-white text-sm font-semibold hover:bg-[#2F6FD8] transition-all">
          <ArrowLeft className="w-4 h-4" /> Voltar ao início
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-white flex-shrink-0">
        <button onClick={() => navigate("/")}
          className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center hover:bg-border transition-all">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-muted-foreground">Planilha de</p>
          <p className="font-bold text-foreground text-sm truncate">{ownerName}</p>
        </div>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-medium ${
          role === "editor" ? "bg-[#E87A5A]/10 text-[#E87A5A]" : "bg-secondary text-muted-foreground"
        }`}>
          {role === "editor"
            ? <><Shield className="w-3 h-3" /> Editor</>
            : <><Eye className="w-3 h-3" /> Só leitura</>}
        </div>
      </div>

      {/* Week navigator */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-white flex-shrink-0">
        <button onClick={() => setCurrentDate((d) => subWeeks(d, 1))}
          className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-border transition-all">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <p className="flex-1 text-center text-xs font-semibold text-foreground">
          {format(weekStart, "d MMM", { locale: lang === "pt" ? pt : undefined })}
          {" – "}
          {format(weekEnd, "d MMM yyyy", { locale: lang === "pt" ? pt : undefined })}
        </p>
        <button onClick={() => setCurrentDate((d) => addWeeks(d, 1))}
          className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-border transition-all">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex gap-3 h-full p-4" style={{ minWidth: `${DAY_KEYS.length * 212}px` }}>
          {DAY_KEYS.map((dayKey, idx) => {
            const dayTasks = tasksByDay[dayKey] || [];
            const hex = DAY_HEX[idx];
            const matchDay = weekDays[idx];
            const dayOfMonth = matchDay ? format(matchDay, "d") : null;
            const isAdding = addingTo === dayKey;

            return (
              <div key={dayKey} className="flex-shrink-0 w-[200px] flex flex-col">
                {/* Column header */}
                <div className="rounded-2xl px-3 py-2.5 mb-3 font-semibold text-xs flex items-center justify-between"
                  style={{ backgroundColor: `${hex}18`, color: hex }}>
                  <span>{dayLabel(idx)}</span>
                  <div className="flex items-center gap-1.5">
                    {dayOfMonth && <span className="opacity-70 text-[11px]">{dayOfMonth}</span>}
                    <span className="rounded-full px-1.5 py-0.5 text-[10px]"
                      style={{ backgroundColor: `${hex}30` }}>{dayTasks.length}</span>
                  </div>
                </div>

                {/* Tasks */}
                <div className="flex-1 overflow-y-auto space-y-2 pr-0.5">
                  {dayTasks.map((task) => {
                    const tags = parseTags(task);
                    const subtasks = parseSubtasks(task);
                    const subtasksDone = subtasks.filter((s) => s.completed).length;
                    const expanded = expandedTask === task.id;

                    return (
                      <motion.div key={task.id}
                        initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl border border-border shadow-sm relative overflow-hidden group">
                        <div className="p-3 cursor-pointer" onClick={() => setExpandedTask(expanded ? null : task.id)}>
                          <div className="flex items-start gap-2">
                            <button type="button"
                              onClick={(e) => { e.stopPropagation(); toggleTask(task); }}
                              disabled={role !== "editor"}
                              className={`mt-0.5 w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                                task.completed ? "bg-blue-500 border-blue-500" : "border-slate-300 hover:border-blue-400"
                              } ${role !== "editor" ? "cursor-default" : ""}`}>
                              {task.completed && <Check className="w-2.5 h-2.5 text-white" />}
                            </button>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm ${task.completed ? "line-through text-muted-foreground/50" : "text-foreground"}`}>
                                {task.title}
                              </p>
                              {tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1.5">
                                  {tags.slice(0, 3).map((tag, i) => {
                                    const { className, style } = tagStyle(tag.color);
                                    return (
                                      <span key={i} className={`px-1.5 py-0.5 rounded-md text-[9px] font-medium ${className}`} style={style}>
                                        {tag.name}
                                      </span>
                                    );
                                  })}
                                </div>
                              )}
                              {subtasks.length > 0 && (
                                <p className="text-[10px] text-muted-foreground/60 mt-1">
                                  {subtasksDone}/{subtasks.length} subtarefas
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Subtasks expanded */}
                          <AnimatePresence>
                            {expanded && subtasks.length > 0 && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }} className="mt-2 pl-6 space-y-1 overflow-hidden">
                                {subtasks.map((s) => (
                                  <button key={s.id} type="button"
                                    onClick={(e) => { e.stopPropagation(); toggleSubtask(task, s.id); }}
                                    disabled={role !== "editor"}
                                    className="flex items-center gap-1.5 w-full text-left">
                                    <span className={`w-3 h-3 rounded border flex-shrink-0 flex items-center justify-center transition-all ${
                                      s.completed ? "bg-blue-500 border-blue-500" : "border-slate-300"
                                    }`}>
                                      {s.completed && <Check className="w-2 h-2 text-white" />}
                                    </span>
                                    <span className={`text-[10px] ${s.completed ? "line-through text-muted-foreground/50" : "text-muted-foreground"}`}>
                                      {s.title}
                                    </span>
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        {/* Priority dot */}
                        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: PRIORITY_DOT[task.priority || "medium"] }} />
                      </motion.div>
                    );
                  })}

                  {dayTasks.length === 0 && !isAdding && (
                    <p className="text-[11px] text-muted-foreground/40 text-center pt-3">Sem tarefas</p>
                  )}

                  {/* Add task inline (editor only) */}
                  <AnimatePresence>
                    {isAdding && (
                      <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                        className="bg-white rounded-xl p-3 shadow-sm border border-[#E87A5A]/30 space-y-2">
                        <input autoFocus value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter") addTask(dayKey); if (e.key === "Escape") setAddingTo(null); }}
                          placeholder="Nova tarefa..."
                          className="w-full text-sm bg-slate-50 rounded-lg px-2.5 py-2 outline-none focus:ring-1 focus:ring-[#E87A5A]/40 transition-all" />
                        <div className="flex gap-2">
                          <button onClick={() => addTask(dayKey)}
                            className="flex-1 py-1.5 rounded-lg bg-[#E87A5A] text-white text-xs font-medium hover:bg-[#D4694A] transition-all">
                            Adicionar
                          </button>
                          <button onClick={() => { setAddingTo(null); setNewTitle(""); }}
                            className="px-3 py-1.5 rounded-lg bg-secondary text-muted-foreground text-xs">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Add button (editor only) */}
                  {role === "editor" && !isAdding && (
                    <button onClick={() => { setAddingTo(dayKey); setNewTitle(""); }}
                      className="w-full py-2 rounded-xl border border-dashed border-border text-xs text-muted-foreground/60 hover:border-[#E87A5A]/40 hover:text-[#E87A5A] flex items-center justify-center gap-1 transition-all">
                      <Plus className="w-3 h-3" /> Adicionar
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
