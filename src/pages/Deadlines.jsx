import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Plus, X, CalendarClock, MapPin, Globe, Clock, Check, Trash2,
  CalendarRange, Timer, ChevronDown, Bell, Repeat, Paperclip, Loader2
} from "lucide-react";
import { Deadline, Event } from "@/api/entities";
import { Core } from "@/api/integrations";
import { format, differenceInDays, differenceInMinutes, isPast, isToday, addDays, addWeeks, addMonths, addYears } from "date-fns";
import { pt } from "date-fns/locale";
import { useEdgeSwipeNav } from "@/hooks/useEdgeSwipeNav";

const PRESET_COLORS = [
  { key: "blue", hex: "#3B82F6" }, { key: "purple", hex: "#8B5CF6" },
  { key: "emerald", hex: "#10B981" }, { key: "amber", hex: "#F59E0B" },
  { key: "rose", hex: "#F43F5E" }, { key: "cyan", hex: "#06B6D4" },
  { key: "indigo", hex: "#6366F1" }, { key: "pink", hex: "#EC4899" },
  { key: "orange", hex: "#F97316" }, { key: "lime", hex: "#84CC16" },
];

const RECURRENCE_OPTIONS = [
  { key: "none", label: "Sem repetição" },
  { key: "daily", label: "Diariamente" },
  { key: "weekly", label: "Semanalmente" },
  { key: "monthly", label: "Mensalmente" },
  { key: "yearly", label: "Anualmente" },
];

const NOTIFY_OPTIONS = [
  { value: 0, label: "Na hora" },
  { value: 1, label: "1 hora antes" },
  { value: 6, label: "6 horas antes" },
  { value: 24, label: "1 dia antes" },
  { value: 48, label: "2 dias antes" },
  { value: 72, label: "3 dias antes" },
  { value: 168, label: "1 semana antes" },
];

// Given a stored deadline date and recurrence type, compute the next occurrence >= now.
// For 'none', returns the original date unchanged.
function getNextOccurrence(dateStr, recurrence) {
  const base = new Date(dateStr);
  if (!recurrence || recurrence === "none") return base;
  const now = new Date();
  let next = new Date(base);
  const advance = {
    daily: (d) => addDays(d, 1),
    weekly: (d) => addWeeks(d, 1),
    monthly: (d) => addMonths(d, 1),
    yearly: (d) => addYears(d, 1),
  }[recurrence];
  if (!advance) return base;
  while (next < now) next = advance(next);
  return next;
}

// Returns a deadline object with its effective display date resolved for recurrence
function resolveDeadline(dl) {
  if (!dl.recurrence || dl.recurrence === "none") return dl;
  const nextDate = getNextOccurrence(dl.deadline, dl.recurrence);
  return { ...dl, _resolved_date: nextDate.toISOString() };
}

function urgencyInfo(dateStr) {
  const d = new Date(dateStr);
  if (isPast(d) && !isToday(d)) return { label: "Expirado", color: "#9CA3AF" };
  const days = differenceInDays(d, new Date());
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
  if (days > 0) { const rH = hours % 24; return rH > 0 ? `${days}d ${rH}h` : `${days} dia${days > 1 ? "s" : ""}`; }
  return rem > 0 ? `${hours}h ${rem}min` : `${hours}h`;
}

function recurrenceLabel(key) {
  return RECURRENCE_OPTIONS.find((o) => o.key === key)?.label || "";
}

function DeadlineCard({ item, onDelete, index }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const colorHex = PRESET_COLORS.find((c) => c.key === item.color)?.hex || item.color || "#E87A5A";
  const displayDate = item._resolved_date || item.deadline;
  const urgency = urgencyInfo(displayDate);
  const notifyLabel = NOTIFY_OPTIONS.find((o) => o.value === item.notify_before_hours)?.label;
  const isRecurring = item.recurrence && item.recurrence !== "none";

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
      className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
      <div className="h-1" style={{ background: colorHex }} />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: colorHex + "18" }}>
              <CalendarClock className="w-4 h-4" style={{ color: colorHex }} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground leading-tight">{item.name}</h3>
              {isRecurring && (
                <span className="text-[10px] text-muted-foreground flex items-center gap-0.5 mt-0.5">
                  <Repeat className="w-2.5 h-2.5" /> {recurrenceLabel(item.recurrence)}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold text-white" style={{ backgroundColor: urgency.color }}>
              {urgency.label}
            </span>
            <button onClick={() => isRecurring ? setConfirmDelete(true) : onDelete(item.id)}
              className="w-7 h-7 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-rose-500 hover:bg-rose-50 transition-all">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 ml-11">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-secondary text-xs text-muted-foreground">
            <Clock className="w-3 h-3" /> {formatDateTime(displayDate)}
          </div>
          {isRecurring && item._resolved_date && item._resolved_date !== item.deadline && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-medium" style={{ backgroundColor: colorHex + "18", color: colorHex }}>
              <Repeat className="w-3 h-3" /> próxima ocorrência
            </div>
          )}
          {notifyLabel && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-secondary text-xs text-muted-foreground">
              <Bell className="w-3 h-3" /> {notifyLabel}
            </div>
          )}
          {item.location && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-secondary text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span className="truncate max-w-[100px]">{item.location}</span>
            </div>
          )}
          {item.website && (
            <a href={item.website.startsWith("http") ? item.website : `https://${item.website}`}
              target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-secondary text-xs text-muted-foreground hover:text-[#E87A5A] transition-all">
              <Globe className="w-3 h-3" />
              <span className="truncate max-w-[100px]">{item.website.replace(/^https?:\/\//, "")}</span>
            </a>
          )}
          {item.attachment_url && (
            <a href={item.attachment_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-secondary text-xs text-muted-foreground hover:text-[#E87A5A] transition-all">
              <Paperclip className="w-3 h-3" />
              <span className="truncate max-w-[100px]">{item.attachment_name || "Anexo"}</span>
            </a>
          )}
        </div>

        {/* Recurring delete confirmation */}
        <AnimatePresence>
          {confirmDelete && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="mt-3 overflow-hidden">
              <div className="bg-rose-50 border border-rose-100 rounded-2xl p-3">
                <p className="text-xs font-semibold text-rose-700 mb-2">Cancelar prazo recorrente?</p>
                <p className="text-[11px] text-rose-600 mb-3">Este prazo repete-se {recurrenceLabel(item.recurrence).toLowerCase()}. Cancelar irá eliminar todas as ocorrências futuras.</p>
                <div className="flex gap-2">
                  <button onClick={() => setConfirmDelete(false)}
                    className="flex-1 py-1.5 rounded-xl bg-white border border-border text-xs font-medium text-muted-foreground">
                    Manter
                  </button>
                  <button onClick={() => { setConfirmDelete(false); onDelete(item.id); }}
                    className="flex-1 py-1.5 rounded-xl bg-rose-500 text-white text-xs font-semibold">
                    Cancelar tudo
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function EventCard({ item, onDelete, index }) {
  const colorHex = PRESET_COLORS.find((c) => c.key === item.color)?.hex || item.color || "#8B5CF6";
  const duration = eventDuration(item.start_datetime, item.end_datetime);
  const startUrgency = urgencyInfo(item.start_datetime);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
      className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
      <div className="h-1" style={{ background: `linear-gradient(to right, ${colorHex}, ${colorHex}88)` }} />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: colorHex + "18" }}>
              <CalendarRange className="w-4 h-4" style={{ color: colorHex }} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground leading-tight">{item.name}</h3>
              {item.description && <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{item.description}</p>}
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold text-white" style={{ backgroundColor: startUrgency.color }}>
              {startUrgency.label}
            </span>
            <button onClick={() => onDelete(item.id)}
              className="w-7 h-7 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-rose-500 hover:bg-rose-50 transition-all">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 ml-11">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-secondary text-xs text-muted-foreground">
            <Clock className="w-3 h-3" /> {formatDateTime(item.start_datetime)}
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-secondary text-xs text-muted-foreground">
            <ChevronDown className="w-3 h-3" /> {formatDateTime(item.end_datetime)}
          </div>
          {duration && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold text-white" style={{ backgroundColor: colorHex }}>
              <Timer className="w-3 h-3" /> {duration}
            </div>
          )}
          {item.location && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-secondary text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span className="truncate max-w-[100px]">{item.location}</span>
            </div>
          )}
          {item.website && (
            <a href={item.website.startsWith("http") ? item.website : `https://${item.website}`}
              target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-secondary text-xs text-muted-foreground hover:text-[#E87A5A] transition-all">
              <Globe className="w-3 h-3" />
              <span className="truncate max-w-[100px]">{item.website.replace(/^https?:\/\//, "")}</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function AddDeadlineForm({ onSave, onCancel }) {
  const [form, setForm] = useState({
    name: "", color: "orange", location: "", website: "",
    deadline: "", recurrence: "none", notify_before_hours: 24,
    attachment_url: "", attachment_name: ""
  });
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);
  const colorHex = PRESET_COLORS.find((c) => c.key === form.color)?.hex || "#F97316";

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await Core.UploadFile({ file });
      setForm((f) => ({ ...f, attachment_url: file_url, attachment_name: file.name }));
    } catch { }
    setUploading(false);
    e.target.value = "";
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl border border-border shadow-md overflow-hidden mb-2">
      <div className="h-1" style={{ background: colorHex }} />
      <div className="p-4 space-y-3">
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Nome do prazo"
          className="w-full px-4 py-3 rounded-2xl bg-secondary/60 text-sm font-semibold outline-none focus:bg-white transition-all" />

        <div className="grid grid-cols-2 gap-2">
          <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="📍 Local"
            className="px-3 py-2.5 rounded-2xl bg-secondary/60 text-sm outline-none focus:bg-white transition-all" />
          <input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })}
            placeholder="🌐 Website"
            className="px-3 py-2.5 rounded-2xl bg-secondary/60 text-sm outline-none focus:bg-white transition-all" />
        </div>

        <div>
          <label className="text-[11px] text-muted-foreground mb-1 block">Data e hora limite</label>
          <input type="datetime-local" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            className="w-full px-4 py-2.5 rounded-2xl bg-secondary/60 text-sm outline-none focus:bg-white transition-all" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] text-muted-foreground mb-1 block flex items-center gap-1"><Repeat className="w-3 h-3" /> Repetição</label>
            <select value={form.recurrence} onChange={(e) => setForm({ ...form, recurrence: e.target.value })}
              className="w-full px-3 py-2.5 rounded-2xl bg-secondary/60 text-sm outline-none focus:bg-white transition-all">
              {RECURRENCE_OPTIONS.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[11px] text-muted-foreground mb-1 block flex items-center gap-1"><Bell className="w-3 h-3" /> Notificação</label>
            <select value={form.notify_before_hours} onChange={(e) => setForm({ ...form, notify_before_hours: Number(e.target.value) })}
              className="w-full px-3 py-2.5 rounded-2xl bg-secondary/60 text-sm outline-none focus:bg-white transition-all">
              {NOTIFY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Attachment */}
        <div>
          <label className="text-[11px] text-muted-foreground mb-1 block flex items-center gap-1"><Paperclip className="w-3 h-3" /> Anexo</label>
          {form.attachment_url ? (
            <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-secondary/60 text-sm">
              <Paperclip className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="truncate text-xs text-foreground flex-1">{form.attachment_name}</span>
              <button onClick={() => setForm((f) => ({ ...f, attachment_url: "", attachment_name: "" }))}
                className="text-rose-400 hover:text-rose-600 transition-all"><X className="w-3.5 h-3.5" /></button>
            </div>
          ) : (
            <button onClick={() => fileRef.current?.click()} disabled={uploading}
              className="w-full px-3 py-2.5 rounded-2xl bg-secondary/60 text-sm text-muted-foreground flex items-center gap-2 hover:bg-border transition-all disabled:opacity-50">
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Paperclip className="w-4 h-4" />}
              {uploading ? "A carregar..." : "Anexar ficheiro"}
            </button>
          )}
          <input ref={fileRef} type="file" className="hidden" onChange={handleFile} />
        </div>

        <div>
          <p className="text-[11px] text-muted-foreground mb-2">Cor</p>
          <div className="flex gap-2 flex-wrap">
            {PRESET_COLORS.map((c) => (
              <button key={c.key} onClick={() => setForm({ ...form, color: c.key })}
                className={`w-7 h-7 rounded-xl transition-all ${form.color === c.key ? "ring-2 ring-offset-2 scale-110" : "hover:scale-105 opacity-70"}`}
                style={{ backgroundColor: c.hex }} />
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <button onClick={onCancel}
            className="flex-1 py-2.5 rounded-2xl bg-secondary text-muted-foreground text-sm font-semibold hover:bg-border transition-all">
            Cancelar
          </button>
          <button onClick={() => form.name.trim() && form.deadline && onSave(form)}
            disabled={!form.name.trim() || !form.deadline}
            className="flex-1 py-2.5 rounded-2xl text-white text-sm font-bold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 flex items-center justify-center gap-1.5"
            style={{ backgroundColor: colorHex }}>
            <Check className="w-4 h-4" /> Adicionar
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function AddEventForm({ onSave, onCancel }) {
  const [form, setForm] = useState({
    name: "", color: "purple", location: "", website: "", description: "",
    start_datetime: "", end_datetime: ""
  });
  const colorHex = PRESET_COLORS.find((c) => c.key === form.color)?.hex || "#8B5CF6";
  const duration = eventDuration(form.start_datetime, form.end_datetime);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl border border-border shadow-md overflow-hidden mb-2">
      <div className="h-1" style={{ background: `linear-gradient(to right, ${colorHex}, ${colorHex}88)` }} />
      <div className="p-4 space-y-3">
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Nome do evento"
          className="w-full px-4 py-3 rounded-2xl bg-secondary/60 text-sm font-semibold outline-none focus:bg-white transition-all" />
        <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Descrição (opcional)"
          className="w-full px-4 py-2.5 rounded-2xl bg-secondary/60 text-sm outline-none focus:bg-white transition-all" />
        <div className="grid grid-cols-2 gap-2">
          <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="📍 Local"
            className="px-3 py-2.5 rounded-2xl bg-secondary/60 text-sm outline-none focus:bg-white transition-all" />
          <input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })}
            placeholder="🌐 Website"
            className="px-3 py-2.5 rounded-2xl bg-secondary/60 text-sm outline-none focus:bg-white transition-all" />
        </div>
        <div className="space-y-2">
          <div>
            <label className="text-[11px] text-muted-foreground mb-1 block">▶ Início</label>
            <input type="datetime-local" value={form.start_datetime} onChange={(e) => setForm({ ...form, start_datetime: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl bg-secondary/60 text-sm outline-none focus:bg-white transition-all" />
          </div>
          <div>
            <label className="text-[11px] text-muted-foreground mb-1 block">■ Fim</label>
            <input type="datetime-local" value={form.end_datetime} onChange={(e) => setForm({ ...form, end_datetime: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl bg-secondary/60 text-sm outline-none focus:bg-white transition-all" />
          </div>
          {duration && (
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white" style={{ backgroundColor: colorHex }}>
              <Timer className="w-3.5 h-3.5" /> Duração: {duration}
            </div>
          )}
        </div>
        <div>
          <p className="text-[11px] text-muted-foreground mb-2">Cor</p>
          <div className="flex gap-2 flex-wrap">
            {PRESET_COLORS.map((c) => (
              <button key={c.key} onClick={() => setForm({ ...form, color: c.key })}
                className={`w-7 h-7 rounded-xl transition-all ${form.color === c.key ? "ring-2 ring-offset-2 scale-110" : "hover:scale-105 opacity-70"}`}
                style={{ backgroundColor: c.hex }} />
            ))}
          </div>
        </div>
        <div className="flex gap-2 pt-1">
          <button onClick={onCancel}
            className="flex-1 py-2.5 rounded-2xl bg-secondary text-muted-foreground text-sm font-semibold hover:bg-border transition-all">
            Cancelar
          </button>
          <button onClick={() => form.name.trim() && form.start_datetime && form.end_datetime && onSave(form)}
            disabled={!form.name.trim() || !form.start_datetime || !form.end_datetime}
            className="flex-1 py-2.5 rounded-2xl text-white text-sm font-bold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 flex items-center justify-center gap-1.5"
            style={{ backgroundColor: colorHex }}>
            <Check className="w-4 h-4" /> Adicionar
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Schedule browser notification for a deadline
function scheduleNotification(deadline) {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  const deadlineTime = new Date(deadline.deadline).getTime();
  const notifyAt = deadlineTime - (deadline.notify_before_hours || 24) * 60 * 60 * 1000;
  const msUntil = notifyAt - Date.now();
  if (msUntil > 0 && msUntil < 7 * 24 * 60 * 60 * 1000) {
    setTimeout(() => {
      new Notification("FocusGrid — Prazo", {
        body: `"${deadline.name}" termina em ${NOTIFY_OPTIONS.find((o) => o.value === deadline.notify_before_hours)?.label || "breve"}`,
      });
    }, msUntil);
  }
}

export default function Deadlines() {
  const navigate = useNavigate();
  const [deadlines, setDeadlines] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("prazos");
  const [showForm, setShowForm] = useState(false);
  const { swipeHandlers, dragStyle } = useEdgeSwipeNav({ left: "/coming-soon" });

  const refresh = () => {
    Deadline.list("-deadline", 100).then(setDeadlines).catch(() => setDeadlines([]));
    Event.list("-start_datetime", 100).then(setEvents).catch(() => setEvents([]));
  };

  useEffect(() => {
    refresh();
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const addDeadline = async (form) => {
    const dl = await Deadline.create(form);
    if (dl) scheduleNotification(dl);
    setShowForm(false);
    refresh();
  };

  const addEvent = async (form) => {
    await Event.create(form);
    setShowForm(false);
    refresh();
  };

  const deleteDeadline = async (id) => { await Deadline.delete(id); refresh(); };
  const deleteEvent = async (id) => { await Event.delete(id); refresh(); };

  // Resolve each deadline's effective display date (handles recurrence)
  const resolvedDeadlines = deadlines.map(resolveDeadline);

  const upcomingDeadlines = resolvedDeadlines
    .filter((i) => {
      const d = new Date(i._resolved_date || i.deadline);
      return !isPast(d) || isToday(d);
    })
    .sort((a, b) => new Date(a._resolved_date || a.deadline) - new Date(b._resolved_date || b.deadline));

  // Non-recurring expired only (recurring ones always show future next occurrence)
  const expiredDeadlines = resolvedDeadlines
    .filter((i) => {
      if (i.recurrence && i.recurrence !== "none") return false; // recurring never expire in this view
      const d = new Date(i.deadline);
      return isPast(d) && !isToday(d);
    })
    .sort((a, b) => new Date(b.deadline) - new Date(a.deadline))
    .slice(0, 15); // max 15 expired

  const upcomingEvents = events
    .filter((i) => !isPast(new Date(i.end_datetime)))
    .sort((a, b) => new Date(a.start_datetime) - new Date(b.start_datetime));
  const pastEvents = events
    .filter((i) => isPast(new Date(i.end_datetime)))
    .sort((a, b) => new Date(b.start_datetime) - new Date(a.start_datetime));

  const isEmpty = activeTab === "prazos"
    ? upcomingDeadlines.length === 0 && expiredDeadlines.length === 0
    : upcomingEvents.length === 0 && pastEvents.length === 0;

  return (
    <div className="min-h-screen bg-cream flex flex-col select-none" {...swipeHandlers}>
      <div style={dragStyle} className="flex-1 flex flex-col">
        {/* Header */}
        <div className="px-5 pt-12 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/coming-soon")}
              className="w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[#E87A5A]/30 shadow-sm transition-all">
              <ArrowRight className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Controlo de Datas</h1>
              <p className="text-xs text-muted-foreground">
                {activeTab === "prazos"
                  ? `${upcomingDeadlines.length} prazo${upcomingDeadlines.length !== 1 ? "s" : ""}`
                  : `${upcomingEvents.length} evento${upcomingEvents.length !== 1 ? "s" : ""}`}
              </p>
            </div>
          </div>
          <button onClick={() => setShowForm(!showForm)}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all ${showForm ? "bg-muted-foreground" : "bg-[#E87A5A] shadow-[#E87A5A]/25 hover:bg-[#D4694A]"}`}>
            {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </button>
        </div>

        {/* Tabs */}
        <div className="px-5 mb-4">
          <div className="flex bg-white rounded-2xl p-1.5 border border-border shadow-sm gap-1">
            <button onClick={() => { setActiveTab("prazos"); setShowForm(false); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === "prazos" ? "bg-[#E87A5A] text-white shadow-md" : "text-muted-foreground hover:text-foreground"}`}>
              <CalendarClock className="w-4 h-4" /> Prazos
            </button>
            <button onClick={() => { setActiveTab("eventos"); setShowForm(false); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === "eventos" ? "bg-[#8B5CF6] text-white shadow-md" : "text-muted-foreground hover:text-foreground"}`}>
              <CalendarRange className="w-4 h-4" /> Eventos
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-5 pb-10 space-y-3 overflow-auto">
          <AnimatePresence mode="wait">
            {showForm && activeTab === "prazos" && <AddDeadlineForm key="dl-form" onSave={addDeadline} onCancel={() => setShowForm(false)} />}
            {showForm && activeTab === "eventos" && <AddEventForm key="ev-form" onSave={addEvent} onCancel={() => setShowForm(false)} />}
          </AnimatePresence>

          {isEmpty && !showForm && (
            <div className="text-center py-20">
              {activeTab === "prazos"
                ? <CalendarClock className="w-12 h-12 mx-auto mb-3 text-muted-foreground/20" />
                : <CalendarRange className="w-12 h-12 mx-auto mb-3 text-muted-foreground/20" />}
              <p className="text-muted-foreground text-sm font-medium">
                {activeTab === "prazos" ? "Sem prazos" : "Sem eventos"}
              </p>
              <p className="text-muted-foreground/50 text-xs mt-1">Toca no + para adicionar</p>
            </div>
          )}

          {activeTab === "prazos" && (
            <>
              {upcomingDeadlines.map((item, i) => <DeadlineCard key={item.id} item={item} onDelete={deleteDeadline} index={i} />)}
              {expiredDeadlines.length > 0 && (
                <div className="mt-4">
                  <p className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-wider mb-2 px-1">Expirados</p>
                  {expiredDeadlines.map((item, i) => (
                    <div key={item.id} className="opacity-40 mb-2">
                      <DeadlineCard item={item} onDelete={deleteDeadline} index={i} />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === "eventos" && (
            <>
              {upcomingEvents.map((item, i) => <EventCard key={item.id} item={item} onDelete={deleteEvent} index={i} />)}
              {pastEvents.length > 0 && (
                <div className="mt-4">
                  <p className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-wider mb-2 px-1">Passados</p>
                  {pastEvents.map((item, i) => (
                    <div key={item.id} className="opacity-40 mb-2">
                      <EventCard item={item} onDelete={deleteEvent} index={i} />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
