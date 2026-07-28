import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Tag, Flag, Clock, Repeat, ChevronLeft, ChevronRight, Loader2, Lock } from "lucide-react";
import { supabase } from "@/api/supabaseClient";
import { startOfWeek, endOfWeek, addWeeks, subWeeks, format, eachDayOfInterval, parseISO } from "date-fns";
import { pt } from "date-fns/locale";
import { useLang } from "@/context/LangContext";

const DAY_KEYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday", "none"];
const DAY_COLORS = [
  "bg-blue-100 text-blue-700",
  "bg-indigo-100 text-indigo-700",
  "bg-violet-100 text-violet-700",
  "bg-purple-100 text-purple-700",
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
  "bg-emerald-100 text-emerald-700",
  "bg-slate-100 text-slate-600",
];

const TAG_COLORS = {
  blue: "bg-blue-100 text-blue-700",
  purple: "bg-purple-100 text-purple-700",
  green: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  rose: "bg-rose-100 text-rose-700",
  teal: "bg-teal-100 text-teal-700",
  indigo: "bg-indigo-100 text-indigo-700",
  pink: "bg-pink-100 text-pink-700",
};

function tagClass(color) {
  if (!color) return "bg-secondary text-muted-foreground";
  if (color.startsWith("#")) return "bg-secondary text-foreground";
  return TAG_COLORS[color] || "bg-secondary text-muted-foreground";
}

export default function SharedTasksView() {
  const { ownerId } = useParams();
  const navigate = useNavigate();
  const { lang } = useLang();

  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState([]);
  const [ownerName, setOwnerName] = useState("");
  const [role, setRole] = useState("viewer");
  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState(false);
  const [weekRef, setWeekRef] = useState(new Date());

  const weekStart = startOfWeek(weekRef, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(weekRef, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  useEffect(() => {
    loadData();
  }, [ownerId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/login"); return; }

      // Check share exists and isn't expired
      const { data: share } = await supabase
        .from("task_shares")
        .select("role, expires_at, owner_id")
        .eq("owner_id", ownerId)
        .eq("shared_with_email", user.email)
        .single();

      if (!share) { setDenied(true); setLoading(false); return; }
      if (share.expires_at && new Date(share.expires_at) < new Date()) {
        setDenied(true); setLoading(false); return;
      }
      setRole(share.role);

      // Load owner profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, email")
        .eq("id", ownerId)
        .single();
      setOwnerName(profile?.full_name || profile?.email || "Utilizador");

      // Load owner's tasks (allowed by the shared RLS policy)
      const [{ data: taskData }, { data: tagData }] = await Promise.all([
        supabase.from("tasks").select("*").eq("created_by_id", ownerId).order("created_at", { ascending: false }),
        supabase.from("tags").select("*").eq("created_by_id", ownerId),
      ]);

      setTasks(taskData || []);
      setTags(tagData || []);
    } catch {
      setDenied(true);
    } finally {
      setLoading(false);
    }
  };

  const dayLabel = (dayKey) => {
    const labels = lang === "pt"
      ? ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo", "Sem dia"]
      : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "No day"];
    return labels[DAY_KEYS.indexOf(dayKey)] ?? dayKey;
  };

  const tasksForDay = (dayKey) =>
    tasks.filter((t) => (t.day || "none") === dayKey && !t.completed);

  const getTagsForTask = (task) => {
    const ids = task.tag_ids || (task.tag_id ? [task.tag_id] : []);
    return tags.filter((tag) => ids.includes(tag.id));
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
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#3B82F6] text-white text-sm font-semibold hover:bg-[#2F6FD8] transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar ao início
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-white flex-shrink-0">
        <button
          onClick={() => navigate("/")}
          className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center hover:bg-border transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground">Planilha de</p>
          <p className="font-bold text-foreground text-sm truncate">{ownerName}</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-secondary text-xs font-medium text-muted-foreground">
          {role === "editor" ? (
            <><Flag className="w-3 h-3 text-[#E87A5A]" /> Editor</>
          ) : (
            <><Clock className="w-3 h-3" /> Só leitura</>
          )}
        </div>
      </div>

      {/* Week navigator */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-white flex-shrink-0">
        <button onClick={() => setWeekRef((w) => subWeeks(w, 1))} className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-border transition-all">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <p className="flex-1 text-center text-xs font-semibold text-foreground">
          {format(weekStart, "d MMM", { locale: lang === "pt" ? pt : undefined })} –{" "}
          {format(weekEnd, "d MMM yyyy", { locale: lang === "pt" ? pt : undefined })}
        </p>
        <button onClick={() => setWeekRef((w) => addWeeks(w, 1))} className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-border transition-all">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex gap-3 h-full p-4" style={{ minWidth: `${DAY_KEYS.length * 212}px` }}>
          {DAY_KEYS.map((dayKey, idx) => {
            const dayTasks = tasksForDay(dayKey);
            const matchDay = weekDays[idx];
            const dayOfMonth = matchDay ? format(matchDay, "d") : null;
            return (
              <div key={dayKey} className="flex-shrink-0 w-[200px] flex flex-col">
                {/* Column header */}
                <div className={`rounded-2xl px-3 py-2.5 mb-3 font-semibold text-xs flex items-center justify-between ${DAY_COLORS[idx]}`}>
                  <span>{dayLabel(dayKey)}</span>
                  <div className="flex items-center gap-1.5">
                    {dayOfMonth && <span className="opacity-70 text-[11px]">{dayOfMonth}</span>}
                    <span className="bg-white/20 rounded-full px-1.5 py-0.5 text-[10px]">{dayTasks.length}</span>
                  </div>
                </div>

                {/* Task cards */}
                <div className="flex-1 overflow-y-auto space-y-2 pr-0.5">
                  {dayTasks.map((task) => {
                    const taskTags = getTagsForTask(task);
                    return (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl border border-border p-3 shadow-sm"
                      >
                        <div className="flex items-start gap-2">
                          <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 ${task.completed ? "bg-[#E87A5A] border-[#E87A5A]" : "border-border"}`}>
                            {task.completed && <Check className="w-2.5 h-2.5 text-white m-auto mt-px" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm leading-snug ${task.completed ? "line-through text-muted-foreground/50" : "text-foreground"}`}>
                              {task.title}
                            </p>
                            {taskTags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {taskTags.map((tag) => (
                                  <span key={tag.id} className={`px-1.5 py-0.5 rounded-md text-[9px] font-medium ${tagClass(tag.color)}`}>
                                    {tag.name}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                  {dayTasks.length === 0 && (
                    <p className="text-[11px] text-muted-foreground/40 text-center pt-3">Sem tarefas</p>
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
