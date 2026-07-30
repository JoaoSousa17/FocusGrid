import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, CalendarDays, Clock, Download, Upload, Plus, X } from "lucide-react";
import { Deadline, Event, FocusSession } from "@/api/entities";
import { auth } from "@/api/auth";
import {
  startOfWeek, endOfWeek, startOfMonth, endOfMonth, addWeeks, subWeeks,
  addMonths, subMonths, format, isWithinInterval, parseISO, eachDayOfInterval, isSameMonth
} from "date-fns";
import { pt, enUS } from "date-fns/locale";
import { useEdgeSwipeNav } from "@/hooks/useEdgeSwipeNav";
import { useLang } from "@/context/LangContext";
import { supabase } from "@/api/supabaseClient";

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const DAY_LABELS_MON_PT = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const DAY_LABELS_SUN_PT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const DAY_LABELS_MON_EN = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAY_LABELS_SUN_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TAG_COLORS = {
  blue: { bg: "#DBEAFE", text: "#1D4ED8" }, purple: { bg: "#EDE9FE", text: "#6D28D9" },
  green: { bg: "#D1FAE5", text: "#047857" }, amber: { bg: "#FEF3C7", text: "#B45309" },
  rose: { bg: "#FFE4E6", text: "#BE123C" }, teal: { bg: "#CCFBF1", text: "#0F766E" },
  indigo: { bg: "#E0E7FF", text: "#3730A3" }, pink: { bg: "#FCE7F3", text: "#9D174D" }
};

// ICS export/import helpers
function escapeICS(str) { return (str || "").replace(/\n/g, "\\n").replace(/,/g, "\\,"); }
function toICSDate(dt) { return format(new Date(dt), "yyyyMMdd'T'HHmmss"); }

function generateICS(events, deadlines) {
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//FocusGrid//PT"];
  events.forEach((ev) => {
    if (!ev.start_datetime) return;
    lines.push("BEGIN:VEVENT",
      `UID:ev-${ev.id}@focusgrid`,
      `DTSTART:${toICSDate(ev.start_datetime)}`,
      `DTEND:${toICSDate(ev.end_datetime || ev.start_datetime)}`,
      `SUMMARY:${escapeICS(ev.name)}`,
      "END:VEVENT");
  });
  deadlines.forEach((dl) => {
    if (!dl.deadline) return;
    lines.push("BEGIN:VEVENT",
      `UID:dl-${dl.id}@focusgrid`,
      `DTSTART:${toICSDate(dl.deadline)}`,
      `DTEND:${toICSDate(dl.deadline)}`,
      `SUMMARY:⏰ ${escapeICS(dl.name)}`,
      "END:VEVENT");
  });
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

function parseICS(text) {
  const events = [];
  const blocks = text.split("BEGIN:VEVENT").slice(1);
  blocks.forEach((block) => {
    const get = (key) => {
      const m = block.match(new RegExp(`${key}[^:]*:([^\r\n]+)`));
      return m ? m[1].replace(/\\n/g, "\n").replace(/\\,/g, ",") : "";
    };
    const summary = get("SUMMARY");
    const dtstart = get("DTSTART");
    const dtend = get("DTEND");
    if (!summary || !dtstart) return;
    const parseDate = (s) => {
      const clean = s.replace(/[TZ]/g, " ").replace(/ +/g, " ").trim();
      const [d, t = "000000"] = clean.split(" ");
      return new Date(`${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)}T${t.slice(0,2)}:${t.slice(2,4)}:${t.slice(4,6)}`).toISOString();
    };
    events.push({ name: summary, start_datetime: parseDate(dtstart), end_datetime: dtend ? parseDate(dtend) : parseDate(dtstart), color: "#8B5CF6" });
  });
  return events;
}

export default function FocusCalendar() {
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const dateFnsLocale = lang === "pt" ? pt : enUS;
  const scrollRef = useRef(null);
  const gridRef = useRef(null);
  const icsInputRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("week"); // "week" | "month"
  const [sessions, setSessions] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [weekStartsOn, setWeekStartsOn] = useState(1);
  const [icsExportEnabled, setIcsExportEnabled] = useState(false);
  const { swipeHandlers, dragStyle } = useEdgeSwipeNav({ right: "/focus" });

  // Drag-to-create state
  const [drag, setDrag] = useState(null); // { dayKey, startHour, endHour }
  const [createModal, setCreateModal] = useState(null); // { dayKey, startHour, endHour }
  const [newEventName, setNewEventName] = useState("");
  const [newEventColor, setNewEventColor] = useState("#E87A5A");

  const weekStart = startOfWeek(currentDate, { weekStartsOn });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn });
  const weekDays = Array.from({ length: 7 }, (_, i) => { const d = new Date(weekStart); d.setDate(d.getDate() + i); return d; });
  const dayLabels = lang === "pt"
    ? (weekStartsOn === 1 ? DAY_LABELS_MON_PT : DAY_LABELS_SUN_PT)
    : (weekStartsOn === 1 ? DAY_LABELS_MON_EN : DAY_LABELS_SUN_EN);

  // Month view
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calStart = startOfWeek(monthStart, { weekStartsOn });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn });
  const calDays = eachDayOfInterval({ start: calStart, end: calEnd });

  const loadData = useCallback(() => {
    FocusSession.list("-created_date", 500).then(setSessions).catch(() => setSessions([]));
    Deadline.list("-deadline", 200).then(setDeadlines).catch((e) => { console.error("deadline load:", e); setDeadlines([]); });
    Event.list("-start_datetime", 200).then(setEvents).catch((e) => { console.error("event load:", e); setEvents([]); });
  }, []);

  useEffect(() => {
    auth.me().then((u) => {
      const meta = u?.user_metadata || {};
      if (meta.week_starts_on !== undefined) setWeekStartsOn(meta.week_starts_on);
      if (meta.ics_export_enabled !== undefined) setIcsExportEnabled(meta.ics_export_enabled);
    }).catch(() => {});
    loadData();
  }, [loadData]);

  // Real-time: reload when deadlines or events change
  useEffect(() => {
    const ch = supabase.channel("rt:calendar:deadlines_events")
      .on("postgres_changes", { event: "*", schema: "public", table: "deadlines" }, loadData)
      .on("postgres_changes", { event: "*", schema: "public", table: "events" }, loadData)
      .subscribe();
    return () => supabase.removeChannel(ch);
  }, [loadData]);

  // Reload when page becomes visible (user switches tab / comes back)
  useEffect(() => {
    const onVisible = () => { if (document.visibilityState === "visible") loadData(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [loadData]);

  const sessionsInWeek = useMemo(() =>
    sessions.filter((s) => {
      const d = new Date(s.created_date);
      return isWithinInterval(d, { start: weekStart, end: weekEnd }) && s.type === "focus" && s.completed;
    }), [sessions, weekStart, weekEnd]);

  const byDay = useMemo(() => {
    const map = {};
    weekDays.forEach((d) => { map[format(d, "yyyy-MM-dd")] = { sessions: [], deadlines: [], events: [] }; });
    sessionsInWeek.forEach((s) => { const k = format(new Date(s.created_date), "yyyy-MM-dd"); if (map[k]) map[k].sessions.push(s); });
    deadlines.forEach((dl) => { if (!dl.deadline) return; const k = format(new Date(dl.deadline), "yyyy-MM-dd"); if (map[k]) map[k].deadlines.push(dl); });
    events.forEach((ev) => { if (!ev.start_datetime) return; const k = format(new Date(ev.start_datetime), "yyyy-MM-dd"); if (map[k]) map[k].events.push(ev); });
    return map;
  }, [sessionsInWeek, deadlines, events, weekDays]);

  const allByDay = useMemo(() => {
    const map = {};
    sessions.filter((s) => s.type === "focus" && s.completed).forEach((s) => {
      const k = format(new Date(s.created_date), "yyyy-MM-dd");
      if (!map[k]) map[k] = { sessions: [], deadlines: [], events: [] };
      map[k].sessions.push(s);
    });
    deadlines.forEach((dl) => { if (!dl.deadline) return; const k = format(new Date(dl.deadline), "yyyy-MM-dd"); if (!map[k]) map[k] = { sessions: [], deadlines: [], events: [] }; map[k].deadlines.push(dl); });
    events.forEach((ev) => { if (!ev.start_datetime) return; const k = format(new Date(ev.start_datetime), "yyyy-MM-dd"); if (!map[k]) map[k] = { sessions: [], deadlines: [], events: [] }; map[k].events.push(ev); });
    return map;
  }, [sessions, deadlines, events]);

  const prevPeriod = () => viewMode === "month" ? setCurrentDate(subMonths(currentDate, 1)) : setCurrentDate(subWeeks(currentDate, 1));
  const nextPeriod = () => viewMode === "month" ? setCurrentDate(addMonths(currentDate, 1)) : setCurrentDate(addWeeks(currentDate, 1));
  const goToday = () => setCurrentDate(new Date());
  const todayStr = format(new Date(), "yyyy-MM-dd");

  // Export ICS
  const exportICS = () => {
    const content = generateICS(events, deadlines);
    const blob = new Blob([content], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "focusgrid-calendario.ics"; a.click();
    URL.revokeObjectURL(url);
  };

  // Import ICS
  const importICS = async (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    const text = await file.text();
    const parsed = parseICS(text);
    await Promise.all(parsed.map((ev) => Event.create(ev).catch(() => {})));
    loadData();
    e.target.value = "";
  };

  // Drag to create — hour from Y using fixed 48px-per-hour row height
  const HOUR_PX = 48;
  const hourFromY = (el, clientY) => {
    const rect = el.getBoundingClientRect();
    const relativeY = clientY - rect.top;
    const frac = Math.max(0, Math.min(0.9999, relativeY / (HOUR_PX * 24)));
    return Math.floor(frac * 24);
  };

  const dragRef = useRef(null);

  const onGridMouseDown = (e, dayKey) => {
    const startHour = hourFromY(e.currentTarget.closest(".day-col-grid"), e.clientY);
    dragRef.current = { dayKey, startHour, endHour: startHour };
    setDrag({ dayKey, startHour, endHour: startHour });
    e.preventDefault();
  };

  const onGridMouseMove = useCallback((e) => {
    if (!dragRef.current) return;
    const gridEl = e.currentTarget;
    const endHour = hourFromY(gridEl, e.clientY);
    dragRef.current = { ...dragRef.current, endHour };
    setDrag({ ...dragRef.current });
  }, []);

  const onGridMouseUp = useCallback((e) => {
    if (!dragRef.current) return;
    const { dayKey, startHour, endHour } = dragRef.current;
    dragRef.current = null;
    setDrag(null);
    const s = Math.min(startHour, endHour);
    const end = Math.max(startHour, endHour) + 1;
    if (end - s >= 1) {
      setCreateModal({ dayKey, startHour: s, endHour: end });
      setNewEventName("");
    }
  }, []);

  const confirmCreateEvent = async () => {
    if (!createModal || !newEventName.trim()) return;
    const { dayKey, startHour, endHour } = createModal;
    const start = new Date(`${dayKey}T${String(startHour).padStart(2,"0")}:00:00`);
    const end = new Date(`${dayKey}T${String(Math.min(endHour, 23)).padStart(2,"0")}:59:00`);
    await Event.create({ name: newEventName.trim(), start_datetime: start.toISOString(), end_datetime: end.toISOString(), color: newEventColor }).catch(() => {});
    setCreateModal(null);
    loadData();
  };

  const COLOR_OPTIONS = ["#E87A5A", "#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#F43F5E", "#14B8A6", "#EC4899"];

  return (
    <div className="min-h-screen bg-cream flex flex-col select-none" {...swipeHandlers}>
      <div style={dragStyle} className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-border px-4 py-3">
          <div className="flex items-center justify-between relative">
            <button onClick={() => navigate("/focus")} className="w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all z-10">
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
              <button onClick={prevPeriod} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-border transition-all">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <h1 className="text-base font-bold text-foreground whitespace-nowrap">
                {viewMode === "week"
                  ? `${format(weekStart, "d MMM", { locale: dateFnsLocale })} – ${format(weekEnd, "d MMM yyyy", { locale: dateFnsLocale })}`
                  : format(currentDate, "MMMM yyyy", { locale: dateFnsLocale })}
              </h1>
              <button onClick={nextPeriod} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-border transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 z-10">
              <button onClick={goToday} className="px-3 py-1.5 rounded-full bg-[#E87A5A] text-white text-xs font-semibold hover:bg-[#D4694A] transition-all shadow-sm">{t("cal.today_btn")}</button>
            </div>
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between mt-3">
            {/* View toggle */}
            <div className="flex bg-secondary rounded-xl p-1 gap-1">
              {[{ key: "week", icon: Clock, label: t("cal.week") }, { key: "month", icon: CalendarDays, label: t("cal.month") }].map((v) => (
                <button key={v.key} onClick={() => setViewMode(v.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === v.key ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  <v.icon className="w-3.5 h-3.5" /> {v.label}
                </button>
              ))}
            </div>
            {/* ICS buttons */}
            <div className="flex gap-1.5">
              {icsExportEnabled && (
                <button onClick={exportICS} className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-secondary text-xs font-medium text-muted-foreground hover:bg-border transition-all">
                  <Download className="w-3.5 h-3.5" /> .ics
                </button>
              )}
              <button onClick={() => icsInputRef.current?.click()} className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-secondary text-xs font-medium text-muted-foreground hover:bg-border transition-all">
                <Upload className="w-3.5 h-3.5" /> {t("cal.import")}
              </button>
              <input ref={icsInputRef} type="file" accept=".ics,text/calendar" className="hidden" onChange={importICS} />
            </div>
          </div>

          {/* Week day pills */}
          {viewMode === "week" && (
            <div className="flex gap-2 mt-3 justify-center">
              {weekDays.map((day, i) => {
                const key = format(day, "yyyy-MM-dd");
                const isToday = key === todayStr;
                const d = byDay[key] || {};
                const count = (d.sessions?.length || 0);
                const extra = (d.deadlines?.length || 0) + (d.events?.length || 0);
                const isSelected = selectedDay === key;
                return (
                  <button key={key} onClick={() => setSelectedDay(isSelected ? null : key)}
                    className={`flex-1 max-w-[70px] flex flex-col items-center py-2.5 px-1 rounded-2xl transition-all text-xs ${
                      isSelected ? "bg-[#E87A5A] text-white shadow-md scale-105" :
                      isToday ? "bg-[#E87A5A]/10 text-[#E87A5A] ring-1 ring-[#E87A5A]/30" :
                      "bg-white border border-border text-muted-foreground hover:border-[#E87A5A]/30 hover:bg-[#E87A5A]/5"}`}>
                    <span className="font-semibold text-[11px]">{dayLabels[i]}</span>
                    <span className={`text-lg font-bold mt-0.5 ${isSelected ? "text-white" : "text-foreground"}`}>{format(day, "d")}</span>
                    {count > 0 && <span className={`text-[10px] mt-0.5 font-semibold ${isSelected ? "text-white/80" : "text-[#E87A5A]"}`}>{count} 🍊</span>}
                    {extra > 0 && <span className={`text-[9px] font-semibold ${isSelected ? "text-white/70" : "text-purple-500"}`}>{extra} 📅</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Month view */}
        {viewMode === "month" && (
          <div className="flex-1 overflow-auto p-4">
            <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="grid grid-cols-7 border-b border-border/30">
                {dayLabels.map((l) => (
                  <div key={l} className="py-2 text-center text-[11px] font-bold text-muted-foreground">{l}</div>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {calDays.map((day) => {
                  const key = format(day, "yyyy-MM-dd");
                  const isToday = key === todayStr;
                  const inMonth = isSameMonth(day, currentDate);
                  const d = allByDay[key];
                  const total = (d?.sessions?.length || 0) + (d?.deadlines?.length || 0) + (d?.events?.length || 0);
                  return (
                    <button key={key} onClick={() => setSelectedDay(selectedDay === key ? null : key)}
                      className={`min-h-[60px] p-1.5 border-b border-r border-border/20 flex flex-col items-start hover:bg-[#E87A5A]/5 transition-all ${!inMonth ? "opacity-30" : ""}`}>
                      <span className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center mb-1 ${isToday ? "bg-[#E87A5A] text-white" : "text-foreground"}`}>
                        {format(day, "d")}
                      </span>
                      {d?.sessions?.slice(0, 1).map((s, i) => (
                        <div key={i} className="text-[9px] font-medium bg-[#E87A5A]/15 text-[#E87A5A] rounded px-1 py-0.5 truncate w-full mb-0.5">🍊 {s.tag_name || t("cal.focus_label")}</div>
                      ))}
                      {d?.events?.slice(0, 1).map((ev, i) => (
                        <div key={i} className="text-[9px] font-medium rounded px-1 py-0.5 truncate w-full mb-0.5" style={{ backgroundColor: (ev.color || "#8B5CF6") + "22", color: ev.color || "#8B5CF6" }}>📅 {ev.name}</div>
                      ))}
                      {total > 2 && <div className="text-[9px] text-muted-foreground">+{total - 2}</div>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Week 24h grid */}
        {viewMode === "week" && (
          <div ref={scrollRef} className="flex-1 overflow-auto p-4">
            <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden min-w-[400px]">
              <div className="grid" style={{ gridTemplateColumns: "48px 1fr" }}>
                <div className="pt-2">
                  {HOURS.map((h) => (
                    <div key={h} className="h-12 flex items-start justify-end pr-2">
                      <span className="text-[10px] text-muted-foreground/50">{String(h).padStart(2, "0")}:00</span>
                    </div>
                  ))}
                </div>
                <div
                  ref={gridRef}
                  className="grid grid-cols-7 select-none"
                  onMouseMove={onGridMouseMove}
                  onMouseUp={onGridMouseUp}
                  onMouseLeave={() => { if (dragRef.current) { dragRef.current = null; setDrag(null); } }}
                >
                  {weekDays.map((day) => {
                    const key = format(day, "yyyy-MM-dd");
                    const d = byDay[key] || {};
                    const isDragDay = drag?.dayKey === key;
                    const dragMin = isDragDay ? Math.min(drag.startHour, drag.endHour) : -1;
                    const dragMax = isDragDay ? Math.max(drag.startHour, drag.endHour) : -1;
                    return (
                      <div key={key} className="relative border-l border-border/30 day-col-grid"
                        onMouseDown={(e) => onGridMouseDown(e, key)}>
                        {HOURS.map((h) => (
                          <div key={h} className={`h-12 border-b border-border/20 border-dashed ${isDragDay && h >= dragMin && h <= dragMax ? "bg-[#E87A5A]/15" : ""}`} />
                        ))}
                        {/* Drag ghost */}
                        {isDragDay && dragMin >= 0 && (
                          <div className="absolute left-1 right-1 rounded-lg bg-[#E87A5A]/30 border border-[#E87A5A]/50 pointer-events-none flex items-center justify-center z-10"
                            style={{ top: dragMin * 48, height: (dragMax - dragMin + 1) * 48, minHeight: 24 }}>
                            <span className="text-[9px] font-semibold text-[#E87A5A]">{dragMin}h–{dragMax + 1}h</span>
                          </div>
                        )}
                        {(d.sessions || []).map((s) => {
                          const date = new Date(s.created_date);
                          const topPx = (date.getHours() + date.getMinutes() / 60) * 48;
                          const heightPx = Math.max(22, (s.duration_minutes || 25) / 60 * 48);
                          const colors = TAG_COLORS[s.tag_color] || TAG_COLORS.blue;
                          return (
                            <div key={s.id} className="absolute left-1 right-1 rounded-lg px-1.5 py-1 text-[9px] font-semibold shadow-sm overflow-hidden"
                              style={{ top: topPx, height: heightPx, backgroundColor: colors.bg, color: colors.text, borderLeft: `3px solid ${colors.text}` }}>
                              <span className="text-[10px]">{s.tag_name || "Foco"}</span>
                              <span className="ml-1 opacity-70">{s.duration_minutes}m</span>
                            </div>
                          );
                        })}
                        {(d.deadlines || []).map((dl) => {
                          const date = new Date(dl.deadline);
                          const topPx = (date.getHours() + date.getMinutes() / 60) * 48;
                          const hex = dl.color && dl.color.startsWith("#") ? dl.color : "#E87A5A";
                          return (
                            <div key={dl.id} className="absolute left-1 right-1 rounded-lg px-1.5 py-1 text-[9px] font-semibold truncate shadow-sm"
                              style={{ top: topPx, minHeight: 20, backgroundColor: hex + "22", color: hex, borderLeft: `3px solid ${hex}` }}>
                              ⏰ {dl.name}
                            </div>
                          );
                        })}
                        {(d.events || []).map((ev) => {
                          const startDate = new Date(ev.start_datetime);
                          const topPx = (startDate.getHours() + startDate.getMinutes() / 60) * 48;
                          const hex = ev.color && ev.color.startsWith("#") ? ev.color : "#8B5CF6";
                          const durMins = ev.end_datetime ? (new Date(ev.end_datetime) - startDate) / 60000 : 60;
                          const heightPx = Math.max(20, durMins / 60 * 48);
                          return (
                            <div key={ev.id} className="absolute left-1 right-1 rounded-lg px-1.5 py-1 text-[9px] font-semibold shadow-sm overflow-hidden"
                              style={{ top: topPx, height: heightPx, backgroundColor: hex + "22", color: hex, borderLeft: `3px solid ${hex}` }}>
                              📅 {ev.name}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Selected day drawer */}
        {selectedDay && (
          <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            className="bg-white border-t border-border rounded-t-2xl p-5 max-h-[220px] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">{format(parseISO(selectedDay), lang === "pt" ? "EEEE, d 'de' MMMM" : "EEEE, MMMM d", { locale: dateFnsLocale })}</h3>
              <button onClick={() => setSelectedDay(null)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
            </div>
            {(() => {
              const key = selectedDay;
              const d = allByDay[key] || {};
              const total = (d.sessions?.length || 0) + (d.deadlines?.length || 0) + (d.events?.length || 0);
              if (total === 0) return <p className="text-sm text-muted-foreground">{t("cal.no_entries")}</p>;
              return (
                <div className="space-y-2">
                  {(d.sessions || []).map((s) => {
                    const colors = TAG_COLORS[s.tag_color] || TAG_COLORS.blue;
                    return (
                      <div key={s.id} className="flex items-center gap-3 text-sm bg-secondary/50 rounded-xl px-3 py-2">
                        <span className="text-xs font-mono text-muted-foreground">{format(new Date(s.created_date), "HH:mm")}</span>
                        <span className="px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ backgroundColor: colors.bg, color: colors.text }}>🍊 {s.tag_name || t("cal.focus_label")}</span>
                        <span className="text-xs text-muted-foreground ml-auto">{s.duration_minutes} min</span>
                      </div>
                    );
                  })}
                  {(d.deadlines || []).map((dl) => {
                    const hex = dl.color && dl.color.startsWith("#") ? dl.color : "#E87A5A";
                    return (
                      <div key={dl.id} className="flex items-center gap-3 text-sm rounded-xl px-3 py-2" style={{ backgroundColor: hex + "15" }}>
                        <span className="text-xs font-mono text-muted-foreground">{format(new Date(dl.deadline), "HH:mm")}</span>
                        <span className="px-2.5 py-1 rounded-lg text-xs font-semibold text-white" style={{ backgroundColor: hex }}>⏰ {t("cal.deadline_label")}</span>
                        <span className="text-xs font-medium truncate" style={{ color: hex }}>{dl.name}</span>
                      </div>
                    );
                  })}
                  {(d.events || []).map((ev) => {
                    const hex = ev.color && ev.color.startsWith("#") ? ev.color : "#8B5CF6";
                    return (
                      <div key={ev.id} className="flex items-center gap-3 text-sm rounded-xl px-3 py-2" style={{ backgroundColor: hex + "15" }}>
                        <span className="text-xs font-mono text-muted-foreground">{format(new Date(ev.start_datetime), "HH:mm")}</span>
                        <span className="px-2.5 py-1 rounded-lg text-xs font-semibold text-white" style={{ backgroundColor: hex }}>📅 {t("cal.event_label")}</span>
                        <span className="text-xs font-medium truncate" style={{ color: hex }}>{ev.name}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </motion.div>
        )}
      </div>

      {/* Create event modal (drag result) */}
      <AnimatePresence>
        {createModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 flex items-end sm:items-center justify-center"
            onClick={() => setCreateModal(null)}>
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm p-5 shadow-xl"
              onClick={(e) => e.stopPropagation()}>
              <h3 className="font-bold text-foreground mb-1">{t("cal.new_event")}</h3>
              <p className="text-xs text-muted-foreground mb-4">
                {format(parseISO(createModal.dayKey), "EEEE d MMM", { locale: dateFnsLocale })} · {createModal.startHour}h–{createModal.endHour}h
              </p>
              <input autoFocus value={newEventName} onChange={(e) => setNewEventName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && confirmCreateEvent()}
                placeholder={t("cal.event_name_placeholder")}
                className="w-full px-3 py-2.5 rounded-xl border border-border text-sm outline-none focus:border-[#E87A5A]/50 mb-3 transition-all" />
              <div className="flex gap-2 flex-wrap mb-4">
                {COLOR_OPTIONS.map((c) => (
                  <button key={c} onClick={() => setNewEventColor(c)}
                    className={`w-7 h-7 rounded-full transition-all ${newEventColor === c ? "ring-2 ring-offset-1 ring-current scale-110" : ""}`}
                    style={{ backgroundColor: c, color: c }} />
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setCreateModal(null)} className="flex-1 py-2.5 rounded-xl bg-secondary text-sm font-medium text-muted-foreground hover:bg-border transition-all">{t("cancel")}</button>
                <button onClick={confirmCreateEvent} disabled={!newEventName.trim()}
                  className="flex-1 py-2.5 rounded-xl bg-[#E87A5A] text-white text-sm font-medium hover:bg-[#D4694A] disabled:opacity-40 transition-all">{t("create")}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
