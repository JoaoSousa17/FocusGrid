import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Deadline, Event, FocusSession } from "@/api/entities";
import { auth } from "@/api/auth";
import { startOfWeek, endOfWeek, addWeeks, subWeeks, format, isWithinInterval, parseISO, isBefore, isAfter } from "date-fns";
import { pt } from "date-fns/locale";
import { useEdgeSwipeNav } from "@/hooks/useEdgeSwipeNav";

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const DAY_LABELS_MON = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const DAY_LABELS_SUN = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const TAG_COLORS = {
  blue: { bg: "#DBEAFE", text: "#1D4ED8" }, purple: { bg: "#EDE9FE", text: "#6D28D9" },
  green: { bg: "#D1FAE5", text: "#047857" }, amber: { bg: "#FEF3C7", text: "#B45309" },
  rose: { bg: "#FFE4E6", text: "#BE123C" }, teal: { bg: "#CCFBF1", text: "#0F766E" },
  indigo: { bg: "#E0E7FF", text: "#3730A3" }, pink: { bg: "#FCE7F3", text: "#9D174D" }
};

export default function FocusCalendar() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [sessions, setSessions] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [weekStartsOn, setWeekStartsOn] = useState(1);
  const { swipeHandlers, dragStyle } = useEdgeSwipeNav({ right: "/focus" });

  const weekStart = startOfWeek(currentDate, { weekStartsOn });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn });
  const weekDays = Array.from({ length: 7 }, (_, i) => {const d = new Date(weekStart);d.setDate(d.getDate() + i);return d;});
  const dayLabels = weekStartsOn === 1 ? DAY_LABELS_MON : DAY_LABELS_SUN;

  useEffect(() => {
    auth.me().then((u) => {
      const meta = u?.user_metadata || {};
      if (meta.week_starts_on !== undefined) setWeekStartsOn(meta.week_starts_on);
    }).catch(() => {});
    FocusSession.list("-created_date", 500).then(setSessions).catch(() => setSessions([]));
    Deadline.list("-deadline", 200).then(setDeadlines).catch(() => {});
    Event.list("-start_datetime", 200).then(setEvents).catch(() => {});
  }, []);

  const sessionsInWeek = useMemo(() =>
  sessions.filter((s) => {
    const d = new Date(s.created_date);
    return isWithinInterval(d, { start: weekStart, end: weekEnd }) && s.type === "focus" && s.completed;
  }), [sessions, weekStart, weekEnd]);

  const sessionsByDay = useMemo(() => {
    const map = {};
    weekDays.forEach((d) => {map[format(d, "yyyy-MM-dd")] = [];});
    sessionsInWeek.forEach((s) => {
      const d = new Date(s.created_date);
      const key = format(d, "yyyy-MM-dd");
      if (map[key]) map[key].push(s);
    });
    return map;
  }, [sessionsInWeek, weekDays]);

  // Deadlines that fall within the week
  const deadlinesByDay = useMemo(() => {
    const map = {};
    weekDays.forEach((d) => {map[format(d, "yyyy-MM-dd")] = [];});
    deadlines.forEach((dl) => {
      if (!dl.deadline) return;
      const key = format(new Date(dl.deadline), "yyyy-MM-dd");
      if (map[key]) map[key].push(dl);
    });
    return map;
  }, [deadlines, weekDays]);

  // Events that overlap with the week
  const eventsByDay = useMemo(() => {
    const map = {};
    weekDays.forEach((d) => {map[format(d, "yyyy-MM-dd")] = [];});
    events.forEach((ev) => {
      if (!ev.start_datetime) return;
      // Show event on its start day (if within week)
      const key = format(new Date(ev.start_datetime), "yyyy-MM-dd");
      if (map[key]) map[key].push(ev);
    });
    return map;
  }, [events, weekDays]);

  const prevWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const nextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
  const goToday = () => setCurrentDate(new Date());
  const todayStr = format(new Date(), "yyyy-MM-dd");

  return (
    <div data-source-location="pages/FocusCalendar:105:4" data-dynamic-content="true" className="min-h-screen bg-cream flex flex-col select-none"
    {...swipeHandlers}>
      
      <div data-source-location="pages/FocusCalendar:113:6" data-dynamic-content="true" style={dragStyle} className="flex-1 flex flex-col">
        {/* Header */}
        <div data-source-location="pages/FocusCalendar:115:8" data-dynamic-content="true" className="bg-white border-b border-border px-4 py-3">
          <div data-source-location="pages/FocusCalendar:116:10" data-dynamic-content="true" className="flex items-center justify-between relative">
            <button data-source-location="pages/FocusCalendar:117:12" data-dynamic-content="true" onClick={() => navigate("/focus")} className="w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all z-10">
              <ArrowLeft data-source-location="pages/FocusCalendar:118:14" data-dynamic-content="false" className="w-5 h-5" />
            </button>

            {/* Centered month/year between arrows */}
            <div data-source-location="pages/FocusCalendar:122:12" data-dynamic-content="true" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
              <button data-source-location="pages/FocusCalendar:123:14" data-dynamic-content="true" onClick={prevWeek} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-border transition-all">
                <ChevronLeft data-source-location="pages/FocusCalendar:124:16" data-dynamic-content="false" className="w-4 h-4" />
              </button>
              <h1 data-source-location="pages/FocusCalendar:126:14" data-dynamic-content="true" className="text-base font-bold text-foreground whitespace-nowrap">
                {format(currentDate, "MMMM yyyy", { locale: pt })}
              </h1>
              <button data-source-location="pages/FocusCalendar:129:14" data-dynamic-content="true" onClick={nextWeek} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-border transition-all">
                <ChevronRight data-source-location="pages/FocusCalendar:130:16" data-dynamic-content="false" className="w-4 h-4" />
              </button>
            </div>

            <button data-source-location="pages/FocusCalendar:134:12" data-dynamic-content="true" onClick={goToday} className="px-4 py-2 rounded-full bg-[#E87A5A] text-white text-xs font-semibold hover:bg-[#D4694A] transition-all shadow-sm z-10">
              Hoje
            </button>
          </div>

          {/* Day pills */}
          <div data-source-location="pages/FocusCalendar:140:10" data-dynamic-content="true" className="flex gap-2 mt-4 justify-center">
            {weekDays.map((day, i) => {
              const key = format(day, "yyyy-MM-dd");
              const isToday = key === todayStr;
              const count = sessionsByDay[key]?.length || 0;
              const extraCount = (deadlinesByDay[key]?.length || 0) + (eventsByDay[key]?.length || 0);
              const isSelected = selectedDay === key;
              return (
                <button data-source-location="pages/FocusCalendar:148:16" data-dynamic-content="true" key={key} onClick={() => setSelectedDay(isSelected ? null : key)}
                className={`flex-1 max-w-[70px] flex flex-col items-center py-2.5 px-1 rounded-2xl transition-all text-xs ${
                isSelected ? "bg-[#E87A5A] text-white shadow-md scale-105" :
                isToday ? "bg-[#E87A5A]/10 text-[#E87A5A] ring-1 ring-[#E87A5A]/30" :
                "bg-white border border-border text-muted-foreground hover:border-[#E87A5A]/30 hover:bg-[#E87A5A]/5"}`
                }>
                  <span data-source-location="pages/FocusCalendar:154:18" data-dynamic-content="true" className="font-semibold text-[11px]" data-collection-item-field="i" data-collection-item-id={dayLabels?.id || dayLabels?._id}>{dayLabels[i]}</span>
                  <span data-source-location="pages/FocusCalendar:155:18" data-dynamic-content="true" className={`text-lg font-bold mt-0.5 ${isSelected ? "text-white" : "text-foreground"}`}>{format(day, "d")}</span>
                  {count > 0 && <span data-source-location="pages/FocusCalendar:156:32" data-dynamic-content="true" className={`text-[10px] mt-0.5 font-semibold ${isSelected ? "text-white/80" : "text-[#E87A5A]"}`} data-collection-item-field="count">{count} 🍊</span>}
                  {extraCount > 0 && <span data-source-location="pages/FocusCalendar:157:37" data-dynamic-content="true" className={`text-[9px] font-semibold ${isSelected ? "text-white/70" : "text-purple-500"}`} data-collection-item-field="extraCount">{extraCount} 📅</span>}
                </button>);

            })}
          </div>
        </div>

        {/* Calendar grid - 24h with scroll */}
        <div data-source-location="pages/FocusCalendar:165:8" data-dynamic-content="true" ref={scrollRef} className="flex-1 overflow-auto p-4">
          <div data-source-location="pages/FocusCalendar:166:10" data-dynamic-content="true" className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden min-w-[400px]">
            <div data-source-location="pages/FocusCalendar:167:12" data-dynamic-content="true" className="grid" style={{ gridTemplateColumns: "48px 1fr" }}>
              <div data-source-location="pages/FocusCalendar:168:14" data-dynamic-content="true" className="pt-2">
                {HOURS.map((h) =>
                <div data-source-location="pages/FocusCalendar:170:18" data-dynamic-content="true" key={h} className="h-12 flex items-start justify-end pr-2">
                    <span data-source-location="pages/FocusCalendar:171:20" data-dynamic-content="true" className="text-[10px] text-muted-foreground/50">{String(h).padStart(2, "0")}:00</span>
                  </div>
                )}
              </div>
              <div data-source-location="pages/FocusCalendar:175:14" data-dynamic-content="true" className="grid grid-cols-7">
                {weekDays.map((day) => {
                  const key = format(day, "yyyy-MM-dd");
                  const daySessions = sessionsByDay[key] || [];
                  const dayDeadlines = deadlinesByDay[key] || [];
                  const dayEvents = eventsByDay[key] || [];
                  return (
                    <div data-source-location="pages/FocusCalendar:182:20" data-dynamic-content="true" key={key} className="relative border-l border-border/30">
                      {HOURS.map((h) => <div data-source-location="pages/FocusCalendar:183:39" data-dynamic-content="true" key={h} className="h-12 border-b border-border/20 border-dashed" />)}
                      {daySessions.map((s) => {
                        const date = new Date(s.created_date);
                        const hour = date.getHours();
                        const mins = date.getMinutes();
                        const topPct = (hour + mins / 60) / 24 * 100;
                        const colors = TAG_COLORS[s.tag_color] || TAG_COLORS.blue;
                        return (
                          <div data-source-location="pages/FocusCalendar:191:26" data-dynamic-content="true" key={s.id}
                          className="absolute left-1 right-1 rounded-lg px-1.5 py-1 text-[9px] font-semibold truncate shadow-sm"
                          style={{ top: `${topPct}%`, backgroundColor: colors.bg, color: colors.text, minHeight: "22px", borderLeft: `3px solid ${colors.text}` }} data-collection-item-id={s?.id}>
                            <span data-source-location="pages/FocusCalendar:194:28" data-dynamic-content="true" className="text-[10px]">{s.tag_name || "Foco"}</span>
                            <span data-source-location="pages/FocusCalendar:195:28" data-dynamic-content="true" className="ml-1 opacity-70" data-collection-item-field="duration_minutes" data-collection-item-id={s?.id}>{s.duration_minutes}m</span>
                          </div>);

                      })}
                      {dayDeadlines.map((dl) => {
                        const date = new Date(dl.deadline);
                        const hour = date.getHours();
                        const mins = date.getMinutes();
                        const topPct = (hour + mins / 60) / 24 * 100;
                        const hex = dl.color && dl.color.startsWith("#") ? dl.color : "#E87A5A";
                        return (
                          <div data-source-location="pages/FocusCalendar:206:26" data-dynamic-content="true" key={dl.id}
                          className="absolute left-1 right-1 rounded-lg px-1.5 py-1 text-[9px] font-semibold truncate shadow-sm"
                          style={{ top: `${topPct}%`, backgroundColor: hex + "22", color: hex, minHeight: "20px", borderLeft: `3px solid ${hex}` }} data-collection-item-id={dl?.id} data-collection-item-field="name">
                            ⏰ {dl.name}
                          </div>);

                      })}
                      {dayEvents.map((ev) => {
                        const startDate = new Date(ev.start_datetime);
                        const hour = startDate.getHours();
                        const mins = startDate.getMinutes();
                        const topPct = (hour + mins / 60) / 24 * 100;
                        const hex = ev.color && ev.color.startsWith("#") ? ev.color : "#8B5CF6";
                        // height based on duration
                        let heightPct = 4;
                        if (ev.end_datetime) {
                          const endDate = new Date(ev.end_datetime);
                          const durMins = (endDate - startDate) / 60000;
                          heightPct = Math.max(4, durMins / (24 * 60) * 100);
                        }
                        return (
                          <div data-source-location="pages/FocusCalendar:227:26" data-dynamic-content="true" key={ev.id}
                          className="absolute left-1 right-1 rounded-lg px-1.5 py-1 text-[9px] font-semibold truncate shadow-sm"
                          style={{ top: `${topPct}%`, height: `${Math.min(heightPct, 30)}%`, backgroundColor: hex + "22", color: hex, borderLeft: `3px solid ${hex}`, overflow: "hidden" }} data-collection-item-id={ev?.id} data-collection-item-field="name">
                            📅 {ev.name}
                          </div>);

                      })}
                    </div>);

                })}
              </div>
            </div>
          </div>
        </div>

        {/* Selected day drawer */}
        {selectedDay &&
        <motion.div data-source-location="pages/FocusCalendar:244:10" data-dynamic-content="true" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        className="bg-white border-t border-border rounded-t-2xl p-5 max-h-[220px] overflow-y-auto shadow-xl">
            <h3 data-source-location="pages/FocusCalendar:246:12" data-dynamic-content="true" className="font-semibold text-sm mb-3">{format(parseISO(selectedDay), "EEEE, d 'de' MMMM", { locale: pt })}</h3>
            {(() => {
            const daySess = sessionsByDay[selectedDay] || [];
            const dayDl = deadlinesByDay[selectedDay] || [];
            const dayEv = eventsByDay[selectedDay] || [];
            const total = daySess.length + dayDl.length + dayEv.length;
            if (total === 0) return <p data-source-location="pages/FocusCalendar:252:38" data-dynamic-content="false" className="text-sm text-muted-foreground">Sem entradas neste dia</p>;
            return (
              <div data-source-location="pages/FocusCalendar:254:16" data-dynamic-content="true" className="space-y-2">
                  {daySess.map((s) => {
                  const colors = TAG_COLORS[s.tag_color] || TAG_COLORS.blue;
                  return (
                    <div data-source-location="pages/FocusCalendar:258:22" data-dynamic-content="true" key={s.id} className="flex items-center gap-3 text-sm bg-secondary/50 rounded-xl px-3 py-2" data-collection-item-id={s?.id}>
                        <span data-source-location="pages/FocusCalendar:259:24" data-dynamic-content="true" className="text-xs font-mono text-muted-foreground">{format(new Date(s.created_date), "HH:mm")}</span>
                        <span data-source-location="pages/FocusCalendar:260:24" data-dynamic-content="true" className="px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ backgroundColor: colors.bg, color: colors.text }}>🍊 {s.tag_name || "Foco"}</span>
                        <span data-source-location="pages/FocusCalendar:261:24" data-dynamic-content="true" className="text-xs text-muted-foreground ml-auto" data-collection-item-field="duration_minutes" data-collection-item-id={s?.id}>{s.duration_minutes} min</span>
                      </div>);

                })}
                  {dayDl.map((dl) => {
                  const hex = dl.color && dl.color.startsWith("#") ? dl.color : "#E87A5A";
                  return (
                    <div data-source-location="pages/FocusCalendar:268:22" data-dynamic-content="true" key={dl.id} className="flex items-center gap-3 text-sm rounded-xl px-3 py-2" style={{ backgroundColor: hex + "15" }} data-collection-item-id={dl?.id}>
                        <span data-source-location="pages/FocusCalendar:269:24" data-dynamic-content="true" className="text-xs font-mono text-muted-foreground">{format(new Date(dl.deadline), "HH:mm")}</span>
                        <span data-source-location="pages/FocusCalendar:270:24" data-dynamic-content="true" className="px-2.5 py-1 rounded-lg text-xs font-semibold text-white" style={{ backgroundColor: hex }}>⏰ Prazo</span>
                        <span data-source-location="pages/FocusCalendar:271:24" data-dynamic-content="true" className="text-xs font-medium truncate" style={{ color: hex }} data-collection-item-field="name" data-collection-item-id={dl?.id}>{dl.name}</span>
                      </div>);

                })}
                  {dayEv.map((ev) => {
                  const hex = ev.color && ev.color.startsWith("#") ? ev.color : "#8B5CF6";
                  return (
                    <div data-source-location="pages/FocusCalendar:278:22" data-dynamic-content="true" key={ev.id} className="flex items-center gap-3 text-sm rounded-xl px-3 py-2" style={{ backgroundColor: hex + "15" }} data-collection-item-id={ev?.id}>
                        <span data-source-location="pages/FocusCalendar:279:24" data-dynamic-content="true" className="text-xs font-mono text-muted-foreground">{format(new Date(ev.start_datetime), "HH:mm")}</span>
                        <span data-source-location="pages/FocusCalendar:280:24" data-dynamic-content="true" className="px-2.5 py-1 rounded-lg text-xs font-semibold text-white" style={{ backgroundColor: hex }}>📅 Evento</span>
                        <span data-source-location="pages/FocusCalendar:281:24" data-dynamic-content="true" className="text-xs font-medium truncate" style={{ color: hex }} data-collection-item-field="name" data-collection-item-id={ev?.id}>{ev.name}</span>
                      </div>);

                })}
                </div>);

          })()}
          </motion.div>
        }
      </div>
    </div>);

}