import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, X, CalendarClock, MapPin, Globe, Clock, Check, Trash2, CalendarRange, Timer, ChevronDown, ChevronUp } from "lucide-react";
import { Deadline, Event } from "@/api/entities";
import { format, differenceInDays, differenceInMinutes, differenceInHours, isPast, isToday, parseISO } from "date-fns";
import { pt } from "date-fns/locale";

const PRESET_COLORS = [
{ key: "blue", hex: "#3B82F6" }, { key: "purple", hex: "#8B5CF6" },
{ key: "emerald", hex: "#10B981" }, { key: "amber", hex: "#F59E0B" },
{ key: "rose", hex: "#F43F5E" }, { key: "cyan", hex: "#06B6D4" },
{ key: "indigo", hex: "#6366F1" }, { key: "pink", hex: "#EC4899" },
{ key: "orange", hex: "#F97316" }, { key: "lime", hex: "#84CC16" }];


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
  if (days > 0) {
    const remHours = hours % 24;
    return remHours > 0 ? `${days}d ${remHours}h` : `${days} dia${days > 1 ? "s" : ""}`;
  }
  return rem > 0 ? `${hours}h ${rem}min` : `${hours}h`;
}

function DeadlineCard({ item, onDelete, index, "data-collection-item-id": __dataCollectionItemId }) {
  const colorHex = PRESET_COLORS.find((c) => c.key === item.color)?.hex || item.color || "#E87A5A";
  const urgency = urgencyInfo(item.deadline);

  return (
    <motion.div data-source-location="pages/Deadlines:58:4" data-dynamic-content="true"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden" data-collection-item-id={__dataCollectionItemId}>
      
      <div data-source-location="pages/Deadlines:64:6" data-dynamic-content="true" className="h-1" style={{ background: colorHex }} />
      <div data-source-location="pages/Deadlines:65:6" data-dynamic-content="true" className="p-4">
        <div data-source-location="pages/Deadlines:66:8" data-dynamic-content="true" className="flex items-start justify-between gap-2 mb-3">
          <div data-source-location="pages/Deadlines:67:10" data-dynamic-content="true" className="flex items-center gap-2.5">
            <div data-source-location="pages/Deadlines:68:12" data-dynamic-content="true" className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: colorHex + "18" }}>
              <CalendarClock data-source-location="pages/Deadlines:69:14" data-dynamic-content="true" className="w-4 h-4" style={{ color: colorHex }} />
            </div>
            <h3 data-source-location="pages/Deadlines:71:12" data-dynamic-content="true" className="text-sm font-bold text-foreground leading-tight" data-collection-item-field="name" data-collection-item-id={item?.id || item?._id}>{item.name}</h3>
          </div>
          <div data-source-location="pages/Deadlines:73:10" data-dynamic-content="true" className="flex items-center gap-1.5 flex-shrink-0">
            <span data-source-location="pages/Deadlines:74:12" data-dynamic-content="true" className="px-2.5 py-1 rounded-full text-[11px] font-bold text-white" style={{ backgroundColor: urgency.color }} data-collection-item-field="label" data-collection-item-id={urgency?.id || urgency?._id}>
              {urgency.label}
            </span>
            <button data-source-location="pages/Deadlines:77:12" data-dynamic-content="true" onClick={() => onDelete(item.id)}
            className="w-7 h-7 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-rose-500 hover:bg-rose-50 transition-all">
              <Trash2 data-source-location="pages/Deadlines:79:14" data-dynamic-content="false" className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div data-source-location="pages/Deadlines:84:8" data-dynamic-content="true" className="flex flex-wrap gap-1.5 ml-11" data-collection-item-field="location" data-collection-item-id={item?.id || item?._id}>
          <div data-source-location="pages/Deadlines:85:10" data-dynamic-content="true" className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-secondary text-xs text-muted-foreground">
            <Clock data-source-location="pages/Deadlines:86:12" data-dynamic-content="false" className="w-3 h-3" /> {formatDateTime(item.deadline)}
          </div>
          {item.location &&
          <div data-source-location="pages/Deadlines:89:12" data-dynamic-content="true" className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-secondary text-xs text-muted-foreground">
              <MapPin data-source-location="pages/Deadlines:90:14" data-dynamic-content="false" className="w-3 h-3" />
              <span data-source-location="pages/Deadlines:91:14" data-dynamic-content="true" className="truncate max-w-[100px]" data-collection-item-field="location" data-collection-item-id={item?.id || item?._id}>{item.location}</span>
            </div>
          }
          {item.website &&
          <a data-source-location="pages/Deadlines:95:12" data-dynamic-content="true" href={item.website.startsWith("http") ? item.website : `https://${item.website}`}
          target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-secondary text-xs text-muted-foreground hover:text-[#E87A5A] transition-all">
              <Globe data-source-location="pages/Deadlines:98:14" data-dynamic-content="false" className="w-3 h-3" />
              <span data-source-location="pages/Deadlines:99:14" data-dynamic-content="true" className="truncate max-w-[100px]" data-collection-item-field="website" data-collection-item-id={item?.id || item?._id}>{item.website.replace(/^https?:\/\//, "")}</span>
            </a>
          }
        </div>
      </div>
    </motion.div>);

}

function EventCard({ item, onDelete, index, "data-collection-item-id": __dataCollectionItemId }) {
  const colorHex = PRESET_COLORS.find((c) => c.key === item.color)?.hex || item.color || "#8B5CF6";
  const duration = eventDuration(item.start_datetime, item.end_datetime);
  const startUrgency = urgencyInfo(item.start_datetime);

  return (
    <motion.div data-source-location="pages/Deadlines:114:4" data-dynamic-content="true"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden" data-collection-item-id={__dataCollectionItemId}>
      
      <div data-source-location="pages/Deadlines:120:6" data-dynamic-content="true" className="h-1" style={{ background: `linear-gradient(to right, ${colorHex}, ${colorHex}88)` }} />
      <div data-source-location="pages/Deadlines:121:6" data-dynamic-content="true" className="p-4">
        <div data-source-location="pages/Deadlines:122:8" data-dynamic-content="true" className="flex items-start justify-between gap-2 mb-3">
          <div data-source-location="pages/Deadlines:123:10" data-dynamic-content="true" className="flex items-center gap-2.5">
            <div data-source-location="pages/Deadlines:124:12" data-dynamic-content="true" className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: colorHex + "18" }}>
              <CalendarRange data-source-location="pages/Deadlines:125:14" data-dynamic-content="true" className="w-4 h-4" style={{ color: colorHex }} />
            </div>
            <div data-source-location="pages/Deadlines:127:12" data-dynamic-content="true" data-collection-item-field="description" data-collection-item-id={item?.id || item?._id}>
              <h3 data-source-location="pages/Deadlines:128:14" data-dynamic-content="true" className="text-sm font-bold text-foreground leading-tight" data-collection-item-field="name" data-collection-item-id={item?.id || item?._id}>{item.name}</h3>
              {item.description && <p data-source-location="pages/Deadlines:129:35" data-dynamic-content="true" className="text-[11px] text-muted-foreground mt-0.5 leading-snug" data-collection-item-field="description" data-collection-item-id={item?.id || item?._id}>{item.description}</p>}
            </div>
          </div>
          <div data-source-location="pages/Deadlines:132:10" data-dynamic-content="true" className="flex items-center gap-1.5 flex-shrink-0">
            <span data-source-location="pages/Deadlines:133:12" data-dynamic-content="true" className="px-2.5 py-1 rounded-full text-[11px] font-bold text-white" style={{ backgroundColor: startUrgency.color }} data-collection-item-field="label" data-collection-item-id={startUrgency?.id || startUrgency?._id}>
              {startUrgency.label}
            </span>
            <button data-source-location="pages/Deadlines:136:12" data-dynamic-content="true" onClick={() => onDelete(item.id)}
            className="w-7 h-7 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-rose-500 hover:bg-rose-50 transition-all">
              <Trash2 data-source-location="pages/Deadlines:138:14" data-dynamic-content="false" className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div data-source-location="pages/Deadlines:143:8" data-dynamic-content="true" className="flex flex-wrap gap-1.5 ml-11" data-collection-item-field="location" data-collection-item-id={item?.id || item?._id}>
          <div data-source-location="pages/Deadlines:144:10" data-dynamic-content="true" className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-secondary text-xs text-muted-foreground">
            <Clock data-source-location="pages/Deadlines:145:12" data-dynamic-content="false" className="w-3 h-3" /> {formatDateTime(item.start_datetime)}
          </div>
          <div data-source-location="pages/Deadlines:147:10" data-dynamic-content="true" className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-secondary text-xs text-muted-foreground">
            <ChevronDown data-source-location="pages/Deadlines:148:12" data-dynamic-content="false" className="w-3 h-3" /> {formatDateTime(item.end_datetime)}
          </div>
          {duration &&
          <div data-source-location="pages/Deadlines:151:12" data-dynamic-content="true" className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold text-white" style={{ backgroundColor: colorHex }} data-collection-item-field="duration" data-collection-item-id={__dataCollectionItemId}>
              <Timer data-source-location="pages/Deadlines:152:14" data-dynamic-content="false" className="w-3 h-3" /> {duration}
            </div>
          }
          {item.location &&
          <div data-source-location="pages/Deadlines:156:12" data-dynamic-content="true" className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-secondary text-xs text-muted-foreground">
              <MapPin data-source-location="pages/Deadlines:157:14" data-dynamic-content="false" className="w-3 h-3" />
              <span data-source-location="pages/Deadlines:158:14" data-dynamic-content="true" className="truncate max-w-[100px]" data-collection-item-field="location" data-collection-item-id={item?.id || item?._id}>{item.location}</span>
            </div>
          }
          {item.website &&
          <a data-source-location="pages/Deadlines:162:12" data-dynamic-content="true" href={item.website.startsWith("http") ? item.website : `https://${item.website}`}
          target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-secondary text-xs text-muted-foreground hover:text-[#E87A5A] transition-all">
              <Globe data-source-location="pages/Deadlines:165:14" data-dynamic-content="false" className="w-3 h-3" />
              <span data-source-location="pages/Deadlines:166:14" data-dynamic-content="true" className="truncate max-w-[100px]" data-collection-item-field="website" data-collection-item-id={item?.id || item?._id}>{item.website.replace(/^https?:\/\//, "")}</span>
            </a>
          }
        </div>
      </div>
    </motion.div>);

}

function AddDeadlineForm({ onSave, onCancel }) {
  const [form, setForm] = useState({ name: "", color: "orange", location: "", website: "", deadline: "" });
  const colorHex = PRESET_COLORS.find((c) => c.key === form.color)?.hex || "#F97316";

  return (
    <motion.div data-source-location="pages/Deadlines:180:4" data-dynamic-content="true" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-3xl border border-border shadow-md overflow-hidden mb-2">
      <div data-source-location="pages/Deadlines:182:6" data-dynamic-content="true" className="h-1" style={{ background: colorHex }} />
      <div data-source-location="pages/Deadlines:183:6" data-dynamic-content="true" className="p-4 space-y-3">
        <input data-source-location="pages/Deadlines:184:8" data-dynamic-content="true" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Nome do prazo"
        className="w-full px-4 py-3 rounded-2xl bg-secondary/60 text-sm font-semibold outline-none focus:bg-white transition-all" />
        <div data-source-location="pages/Deadlines:187:8" data-dynamic-content="true" className="grid grid-cols-2 gap-2">
          <input data-source-location="pages/Deadlines:188:10" data-dynamic-content="true" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
          placeholder="📍 Local"
          className="px-3 py-2.5 rounded-2xl bg-secondary/60 text-sm outline-none focus:bg-white transition-all" />
          <input data-source-location="pages/Deadlines:191:10" data-dynamic-content="true" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })}
          placeholder="🌐 Website"
          className="px-3 py-2.5 rounded-2xl bg-secondary/60 text-sm outline-none focus:bg-white transition-all" />
        </div>
        <div data-source-location="pages/Deadlines:195:8" data-dynamic-content="true">
          <label data-source-location="pages/Deadlines:196:10" data-dynamic-content="false" className="text-[11px] text-muted-foreground mb-1 block">Data e hora limite</label>
          <input data-source-location="pages/Deadlines:197:10" data-dynamic-content="true" type="datetime-local" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          className="w-full px-4 py-2.5 rounded-2xl bg-secondary/60 text-sm outline-none focus:bg-white transition-all" />
        </div>
        <div data-source-location="pages/Deadlines:200:8" data-dynamic-content="true">
          <p data-source-location="pages/Deadlines:201:10" data-dynamic-content="false" className="text-[11px] text-muted-foreground mb-2">Cor</p>
          <div data-source-location="pages/Deadlines:202:10" data-dynamic-content="true" className="flex gap-2 flex-wrap">
            {PRESET_COLORS.map((c, __arrIdx__) =>
            <button data-source-location="pages/Deadlines:204:14" data-dynamic-content="true" key={c.key} onClick={() => setForm({ ...form, color: c.key })}
            className={`w-7 h-7 rounded-xl transition-all ${form.color === c.key ? "ring-2 ring-offset-2 scale-110" : "hover:scale-105 opacity-70"}`}
            style={{ backgroundColor: c.hex }} data-arr-index={__arrIdx__} data-arr-variable-name="PRESET_COLORS" />
            )}
          </div>
        </div>
        <div data-source-location="pages/Deadlines:210:8" data-dynamic-content="true" className="flex gap-2 pt-1">
          <button data-source-location="pages/Deadlines:211:10" data-dynamic-content="true" onClick={onCancel}
          className="flex-1 py-2.5 rounded-2xl bg-secondary text-muted-foreground text-sm font-semibold hover:bg-border transition-all">
            Cancelar
          </button>
          <button data-source-location="pages/Deadlines:215:10" data-dynamic-content="true" onClick={() => form.name.trim() && form.deadline && onSave(form)}
          disabled={!form.name.trim() || !form.deadline}
          className="flex-1 py-2.5 rounded-2xl text-white text-sm font-bold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 flex items-center justify-center gap-1.5"
          style={{ backgroundColor: colorHex }}>
            <Check data-source-location="pages/Deadlines:219:12" data-dynamic-content="false" className="w-4 h-4" /> Adicionar
          </button>
        </div>
      </div>
    </motion.div>);

}

function AddEventForm({ onSave, onCancel, id }) {
  const [form, setForm] = useState({ name: "", color: "purple", location: "", website: "", description: "", start_datetime: "", end_datetime: "" });
  const colorHex = PRESET_COLORS.find((c) => c.key === form.color)?.hex || "#8B5CF6";
  const duration = eventDuration(form.start_datetime, form.end_datetime);

  return (
    <motion.div data-source-location="pages/Deadlines:233:4" data-dynamic-content="true" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-3xl border border-border shadow-md overflow-hidden mb-2">
      <div data-source-location="pages/Deadlines:235:6" data-dynamic-content="true" className="h-1" style={{ background: `linear-gradient(to right, ${colorHex}, ${colorHex}88)` }} />
      <div data-source-location="pages/Deadlines:236:6" data-dynamic-content="true" className="p-4 space-y-3">
        <input data-source-location="pages/Deadlines:237:8" data-dynamic-content="true" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Nome do evento"
        className="w-full px-4 py-3 rounded-2xl bg-secondary/60 text-sm font-semibold outline-none focus:bg-white transition-all" />
        <input data-source-location="pages/Deadlines:240:8" data-dynamic-content="true" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="Descrição (opcional)"
        className="w-full px-4 py-2.5 rounded-2xl bg-secondary/60 text-sm outline-none focus:bg-white transition-all" />
        <div data-source-location="pages/Deadlines:243:8" data-dynamic-content="true" className="grid grid-cols-2 gap-2">
          <input data-source-location="pages/Deadlines:244:10" data-dynamic-content="true" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
          placeholder="📍 Local"
          className="px-3 py-2.5 rounded-2xl bg-secondary/60 text-sm outline-none focus:bg-white transition-all" />
          <input data-source-location="pages/Deadlines:247:10" data-dynamic-content="true" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })}
          placeholder="🌐 Website"
          className="px-3 py-2.5 rounded-2xl bg-secondary/60 text-sm outline-none focus:bg-white transition-all" />
        </div>
        <div data-source-location="pages/Deadlines:251:8" data-dynamic-content="true" className="space-y-2">
          <div data-source-location="pages/Deadlines:252:10" data-dynamic-content="true">
            <label data-source-location="pages/Deadlines:253:12" data-dynamic-content="false" className="text-[11px] text-muted-foreground mb-1 block">▶ Início</label>
            <input data-source-location="pages/Deadlines:254:12" data-dynamic-content="true" type="datetime-local" value={form.start_datetime} onChange={(e) => setForm({ ...form, start_datetime: e.target.value })}
            className="w-full px-4 py-2.5 rounded-2xl bg-secondary/60 text-sm outline-none focus:bg-white transition-all" />
          </div>
          <div data-source-location="pages/Deadlines:257:10" data-dynamic-content="true">
            <label data-source-location="pages/Deadlines:258:12" data-dynamic-content="false" className="text-[11px] text-muted-foreground mb-1 block">■ Fim</label>
            <input data-source-location="pages/Deadlines:259:12" data-dynamic-content="true" type="datetime-local" value={form.end_datetime} onChange={(e) => setForm({ ...form, end_datetime: e.target.value })}
            className="w-full px-4 py-2.5 rounded-2xl bg-secondary/60 text-sm outline-none focus:bg-white transition-all" />
          </div>
          {duration &&
          <div data-source-location="pages/Deadlines:263:12" data-dynamic-content="true" className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white" style={{ backgroundColor: colorHex }} data-collection-item-field="duration" data-collection-item-id={id}>
              <Timer data-source-location="pages/Deadlines:264:14" data-dynamic-content="false" className="w-3.5 h-3.5" /> Duração: {duration}
            </div>
          }
        </div>
        <div data-source-location="pages/Deadlines:268:8" data-dynamic-content="true">
          <p data-source-location="pages/Deadlines:269:10" data-dynamic-content="false" className="text-[11px] text-muted-foreground mb-2">Cor</p>
          <div data-source-location="pages/Deadlines:270:10" data-dynamic-content="true" className="flex gap-2 flex-wrap">
            {PRESET_COLORS.map((c, __arrIdx__) =>
            <button data-source-location="pages/Deadlines:272:14" data-dynamic-content="true" key={c.key} onClick={() => setForm({ ...form, color: c.key })}
            className={`w-7 h-7 rounded-xl transition-all ${form.color === c.key ? "ring-2 ring-offset-2 scale-110" : "hover:scale-105 opacity-70"}`}
            style={{ backgroundColor: c.hex }} data-arr-index={__arrIdx__} data-arr-variable-name="PRESET_COLORS" />
            )}
          </div>
        </div>
        <div data-source-location="pages/Deadlines:278:8" data-dynamic-content="true" className="flex gap-2 pt-1">
          <button data-source-location="pages/Deadlines:279:10" data-dynamic-content="true" onClick={onCancel}
          className="flex-1 py-2.5 rounded-2xl bg-secondary text-muted-foreground text-sm font-semibold hover:bg-border transition-all">
            Cancelar
          </button>
          <button data-source-location="pages/Deadlines:283:10" data-dynamic-content="true" onClick={() => form.name.trim() && form.start_datetime && form.end_datetime && onSave(form)}
          disabled={!form.name.trim() || !form.start_datetime || !form.end_datetime}
          className="flex-1 py-2.5 rounded-2xl text-white text-sm font-bold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 flex items-center justify-center gap-1.5"
          style={{ backgroundColor: colorHex }}>
            <Check data-source-location="pages/Deadlines:287:12" data-dynamic-content="false" className="w-4 h-4" /> Adicionar
          </button>
        </div>
      </div>
    </motion.div>);

}

export default function Deadlines() {
  const navigate = useNavigate();
  const [deadlines, setDeadlines] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("prazos");
  const [showForm, setShowForm] = useState(false);
  const touchStart = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const [dragStyle, setDragStyle] = useState({});

  const refresh = () => {
    Deadline.list("-deadline", 100).then(setDeadlines).catch(() => setDeadlines([]));
    Event.list("-start_datetime", 100).then(setEvents).catch(() => setEvents([]));
  };

  useEffect(() => {refresh();}, []);

  const addDeadline = async (form) => {
    await Deadline.create(form);
    setShowForm(false);
    refresh();
  };

  const addEvent = async (form) => {
    await Event.create(form);
    setShowForm(false);
    refresh();
  };

  const deleteDeadline = async (id) => {
    await Deadline.delete(id);
    refresh();
  };

  const deleteEvent = async (id) => {
    await Event.delete(id);
    refresh();
  };

  const upcomingDeadlines = deadlines.filter((i) => !isPast(new Date(i.deadline)) || isToday(new Date(i.deadline))).
  sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  const expiredDeadlines = deadlines.filter((i) => isPast(new Date(i.deadline)) && !isToday(new Date(i.deadline))).
  sort((a, b) => new Date(b.deadline) - new Date(a.deadline));

  const upcomingEvents = events.filter((i) => !isPast(new Date(i.end_datetime))).
  sort((a, b) => new Date(a.start_datetime) - new Date(b.start_datetime));
  const pastEvents = events.filter((i) => isPast(new Date(i.end_datetime))).
  sort((a, b) => new Date(b.start_datetime) - new Date(a.start_datetime));

  const handlePointerStart = useCallback((x, y) => {touchStart.current = { x, y };dragOffset.current = { x: 0, y: 0 };setDragStyle({});}, []);
  const handlePointerMove = useCallback((x, y) => {
    dragOffset.current = { x: x - touchStart.current.x, y: y - touchStart.current.y };
    setDragStyle({ transform: `translate(${dragOffset.current.x}px, ${dragOffset.current.y}px)`, transition: "none" });
  }, []);
  const handlePointerEnd = useCallback((x, y) => {
    setDragStyle({ transform: "translate(0, 0)", transition: "transform 0.3s ease-out" });
    const dx = x - touchStart.current.x;
    if (Math.abs(dx) > 60 && dx < 0) navigate("/coming-soon");
  }, [navigate]);

  const isEmpty = activeTab === "prazos" ?
  upcomingDeadlines.length === 0 && expiredDeadlines.length === 0 :
  upcomingEvents.length === 0 && pastEvents.length === 0;

  return (
    <div data-source-location="pages/Deadlines:360:4" data-dynamic-content="true" className="min-h-screen bg-cream flex flex-col select-none"
    onTouchStart={(e) => handlePointerStart(e.touches[0].clientX, e.touches[0].clientY)}
    onTouchMove={(e) => handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)}
    onTouchEnd={(e) => handlePointerEnd(e.changedTouches[0]?.clientX || touchStart.current.x, e.changedTouches[0]?.clientY || touchStart.current.y)}
    onMouseDown={(e) => handlePointerStart(e.clientX, e.clientY)}
    onMouseMove={(e) => {if (e.buttons === 1) handlePointerMove(e.clientX, e.clientY);}}
    onMouseUp={(e) => handlePointerEnd(e.clientX, e.clientY)}>
      
      <div data-source-location="pages/Deadlines:368:6" data-dynamic-content="true" style={dragStyle} className="flex-1 flex flex-col">
        {/* Header */}
        <div data-source-location="pages/Deadlines:370:8" data-dynamic-content="true" className="px-5 pt-12 pb-4 flex items-center justify-between">
          <div data-source-location="pages/Deadlines:371:10" data-dynamic-content="true" className="flex items-center gap-3">
            <button data-source-location="pages/Deadlines:372:12" data-dynamic-content="true" onClick={() => navigate("/coming-soon")}
            className="w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[#E87A5A]/30 shadow-sm transition-all">
              <ArrowLeft data-source-location="pages/Deadlines:374:14" data-dynamic-content="false" className="w-5 h-5" />
            </button>
            <div data-source-location="pages/Deadlines:376:12" data-dynamic-content="true">
              <h1 data-source-location="pages/Deadlines:377:14" data-dynamic-content="false" className="text-xl font-bold text-foreground">Controlo de Datas</h1>
              <p data-source-location="pages/Deadlines:378:14" data-dynamic-content="true" className="text-xs text-muted-foreground">
                {activeTab === "prazos" ? `${upcomingDeadlines.length} prazo${upcomingDeadlines.length !== 1 ? "s" : ""}` : `${upcomingEvents.length} evento${upcomingEvents.length !== 1 ? "s" : ""}`}
              </p>
            </div>
          </div>
          <button data-source-location="pages/Deadlines:383:10" data-dynamic-content="true" onClick={() => setShowForm(!showForm)}
          className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all ${
          showForm ? "bg-muted-foreground" : "bg-[#E87A5A] shadow-[#E87A5A]/25 hover:bg-[#D4694A]"}`
          }>
            {showForm ? <X data-source-location="pages/Deadlines:387:24" data-dynamic-content="false" className="w-5 h-5" /> : <Plus data-source-location="pages/Deadlines:387:52" data-dynamic-content="false" className="w-5 h-5" />}
          </button>
        </div>

        {/* Tabs */}
        <div data-source-location="pages/Deadlines:392:8" data-dynamic-content="true" className="px-5 mb-4">
          <div data-source-location="pages/Deadlines:393:10" data-dynamic-content="true" className="flex bg-white rounded-2xl p-1.5 border border-border shadow-sm gap-1">
            <button data-source-location="pages/Deadlines:394:12" data-dynamic-content="true" onClick={() => {setActiveTab("prazos");setShowForm(false);}}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "prazos" ? "bg-[#E87A5A] text-white shadow-md" : "text-muted-foreground hover:text-foreground"}`
            }>
              <CalendarClock data-source-location="pages/Deadlines:398:14" data-dynamic-content="false" className="w-4 h-4" /> Prazos
            </button>
            <button data-source-location="pages/Deadlines:400:12" data-dynamic-content="true" onClick={() => {setActiveTab("eventos");setShowForm(false);}}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "eventos" ? "bg-[#8B5CF6] text-white shadow-md" : "text-muted-foreground hover:text-foreground"}`
            }>
              <CalendarRange data-source-location="pages/Deadlines:404:14" data-dynamic-content="false" className="w-4 h-4" /> Eventos
            </button>
          </div>
        </div>

        {/* Content */}
        <div data-source-location="pages/Deadlines:410:8" data-dynamic-content="true" className="flex-1 px-5 pb-10 space-y-3 overflow-auto">
          <AnimatePresence data-source-location="pages/Deadlines:411:10" data-dynamic-content="true" mode="wait">
            {showForm && activeTab === "prazos" && <AddDeadlineForm data-source-location="pages/Deadlines:412:51" data-dynamic-content="true" key="dl-form" onSave={addDeadline} onCancel={() => setShowForm(false)} />}
            {showForm && activeTab === "eventos" && <AddEventForm data-source-location="pages/Deadlines:413:52" data-dynamic-content="true" key="ev-form" onSave={addEvent} onCancel={() => setShowForm(false)} />}
          </AnimatePresence>

          {isEmpty && !showForm &&
          <div data-source-location="pages/Deadlines:417:12" data-dynamic-content="true" className="text-center py-20">
              {activeTab === "prazos" ?
            <CalendarClock data-source-location="pages/Deadlines:419:18" data-dynamic-content="false" className="w-12 h-12 mx-auto mb-3 text-muted-foreground/20" /> :
            <CalendarRange data-source-location="pages/Deadlines:420:18" data-dynamic-content="false" className="w-12 h-12 mx-auto mb-3 text-muted-foreground/20" />}
              <p data-source-location="pages/Deadlines:421:14" data-dynamic-content="true" className="text-muted-foreground text-sm font-medium">
                {activeTab === "prazos" ? "Sem prazos" : "Sem eventos"}
              </p>
              <p data-source-location="pages/Deadlines:424:14" data-dynamic-content="false" className="text-muted-foreground/50 text-xs mt-1">Toca no + para adicionar</p>
            </div>
          }

          {activeTab === "prazos" &&
          <>
              {upcomingDeadlines.map((item, i) => <DeadlineCard data-source-location="pages/Deadlines:430:50" data-dynamic-content="true" key={item.id} item={item} onDelete={deleteDeadline} index={i} data-collection-item-id={item?.id} />)}
              {expiredDeadlines.length > 0 &&
            <div data-source-location="pages/Deadlines:432:16" data-dynamic-content="true" className="mt-4">
                  <p data-source-location="pages/Deadlines:433:18" data-dynamic-content="false" className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-wider mb-2 px-1">Expirados</p>
                  {expiredDeadlines.map((item, i) =>
              <div data-source-location="pages/Deadlines:435:20" data-dynamic-content="true" key={item.id} className="opacity-40 mb-2" data-collection-item-id={item?.id}>
                      <DeadlineCard data-source-location="pages/Deadlines:436:22" data-dynamic-content="true" item={item} onDelete={deleteDeadline} index={i} />
                    </div>
              )}
                </div>
            }
            </>
          }

          {activeTab === "eventos" &&
          <>
              {upcomingEvents.map((item, i) => <EventCard data-source-location="pages/Deadlines:446:47" data-dynamic-content="true" key={item.id} item={item} onDelete={deleteEvent} index={i} data-collection-item-id={item?.id} />)}
              {pastEvents.length > 0 &&
            <div data-source-location="pages/Deadlines:448:16" data-dynamic-content="true" className="mt-4">
                  <p data-source-location="pages/Deadlines:449:18" data-dynamic-content="false" className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-wider mb-2 px-1">Passados</p>
                  {pastEvents.map((item, i) =>
              <div data-source-location="pages/Deadlines:451:20" data-dynamic-content="true" key={item.id} className="opacity-40 mb-2" data-collection-item-id={item?.id}>
                      <EventCard data-source-location="pages/Deadlines:452:22" data-dynamic-content="true" item={item} onDelete={deleteEvent} index={i} />
                    </div>
              )}
                </div>
            }
            </>
          }
        </div>
      </div>
    </div>);

}