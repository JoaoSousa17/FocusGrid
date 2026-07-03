import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUp, TrendingUp, Clock, CheckCircle, Target, Zap, Download, FileText, Loader2 } from "lucide-react";
import { FocusSession } from "@/api/entities";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, isWithinInterval, subWeeks, subMonths } from "date-fns";
import { pt } from "date-fns/locale";
import { useEdgeSwipeNav } from "@/hooks/useEdgeSwipeNav";

const DAY_LABELS_SHORT = ["S", "T", "Q", "Q", "S", "S", "D"];

const TAG_COLORS_CHART = {
  blue: "#3B82F6", purple: "#8B5CF6", green: "#10B981",
  amber: "#F59E0B", rose: "#F43F5E", teal: "#14B8A6",
  indigo: "#6366F1", pink: "#EC4899"
};

export default function FocusAnalytics() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [exportingCsv, setExportingCsv] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);
  const analyticsRef = useRef(null);
  const { swipeHandlers, dragStyle } = useEdgeSwipeNav({ down: "/focus" });

  useEffect(() => {
    FocusSession.list("-created_date", 500).then(setSessions).catch(() => setSessions([]));
  }, []);

  const today = new Date();
  const todayStr = format(today, "yyyy-MM-dd");
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const thisMonthStart = startOfMonth(today);
  const thisMonthEnd = endOfMonth(today);
  const prevMonthStart = startOfMonth(subMonths(today, 1));
  const prevMonthEnd = endOfMonth(subMonths(today, 1));

  const completedFocus = useMemo(() =>
    sessions.filter((s) => s.type === "focus" && s.completed), [sessions]);

  const todayCount = completedFocus.filter((s) => format(new Date(s.created_date), "yyyy-MM-dd") === todayStr).length;
  const weekCount = completedFocus.filter((s) => isWithinInterval(new Date(s.created_date), { start: weekStart, end: weekEnd })).length;
  const totalFocusMin = completedFocus.reduce((sum, s) => sum + (s.duration_minutes || 0), 0);
  const totalHours = Math.floor(totalFocusMin / 60);
  const totalRemainder = totalFocusMin % 60;

  // Daily bar chart data
  const dailyData = weekDays.map((d, i) => {
    const key = format(d, "yyyy-MM-dd");
    const count = completedFocus.filter((s) => format(new Date(s.created_date), "yyyy-MM-dd") === key).length;
    return { day: DAY_LABELS_SHORT[i], count, date: format(d, "d") };
  });

  // Tag distribution
  const tagDistribution = useMemo(() => {
    const map = {};
    completedFocus.forEach((s) => {
      const name = s.tag_name || "Sem tag";
      map[name] = (map[name] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({
      name, value,
      color: TAG_COLORS_CHART[completedFocus.find((s) => (s.tag_name || "Sem tag") === name)?.tag_color] || "#94A3B8"
    }));
  }, [completedFocus]);

  // Weekly trend (last 4 weeks)
  const weeklyTrend = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => {
      const ws = startOfWeek(subWeeks(today, 3 - i), { weekStartsOn: 1 });
      const we = endOfWeek(subWeeks(today, 3 - i), { weekStartsOn: 1 });
      const count = completedFocus.filter((s) => isWithinInterval(new Date(s.created_date), { start: ws, end: we })).length;
      return { week: `Sem ${i + 1}`, count };
    });
  }, [completedFocus, today]);

  // Focus by hour
  const hourlyData = useMemo(() => {
    const hours = Array.from({ length: 24 }, (_, i) => ({ hour: `${i}h`, count: 0 }));
    completedFocus.forEach((s) => {
      const d = new Date(s.created_date);
      hours[d.getHours()].count++;
    });
    return hours.filter((h) => h.count > 0);
  }, [completedFocus]);

  // Streak
  const streak = useMemo(() => {
    let s = 0;
    const d = new Date(today);
    while (true) {
      const key = format(d, "yyyy-MM-dd");
      const count = completedFocus.filter((s) => format(new Date(s.created_date), "yyyy-MM-dd") === key).length;
      if (count === 0) break;
      s++;
      d.setDate(d.getDate() - 1);
    }
    return s;
  }, [completedFocus, today]);

  // Month comparison
  const thisMonthSessions = useMemo(() =>
    completedFocus.filter((s) => isWithinInterval(new Date(s.created_date), { start: thisMonthStart, end: thisMonthEnd })),
    [completedFocus, thisMonthStart, thisMonthEnd]);

  const prevMonthSessions = useMemo(() =>
    completedFocus.filter((s) => isWithinInterval(new Date(s.created_date), { start: prevMonthStart, end: prevMonthEnd })),
    [completedFocus, prevMonthStart, prevMonthEnd]);

  const thisMonthMin = thisMonthSessions.reduce((sum, s) => sum + (s.duration_minutes || 0), 0);
  const prevMonthMin = prevMonthSessions.reduce((sum, s) => sum + (s.duration_minutes || 0), 0);
  const monthDiff = thisMonthSessions.length - prevMonthSessions.length;
  const monthDiffPct = prevMonthSessions.length > 0
    ? Math.round(((thisMonthSessions.length - prevMonthSessions.length) / prevMonthSessions.length) * 100)
    : null;

  // Month comparison chart — daily pomodoros for current vs prev month
  const monthComparisonData = useMemo(() => {
    const days = Math.max(
      eachDayOfInterval({ start: thisMonthStart, end: thisMonthEnd }).length,
      eachDayOfInterval({ start: prevMonthStart, end: prevMonthEnd }).length
    );
    return Array.from({ length: days }, (_, i) => {
      const thisDay = new Date(thisMonthStart); thisDay.setDate(i + 1);
      const prevDay = new Date(prevMonthStart); prevDay.setDate(i + 1);
      const thisKey = format(thisDay, "yyyy-MM-dd");
      const prevKey = format(prevDay, "yyyy-MM-dd");
      const thisCnt = thisDay <= thisMonthEnd ? completedFocus.filter((s) => format(new Date(s.created_date), "yyyy-MM-dd") === thisKey).length : undefined;
      const prevCnt = prevDay <= prevMonthEnd ? completedFocus.filter((s) => format(new Date(s.created_date), "yyyy-MM-dd") === prevKey).length : undefined;
      return { day: i + 1, atual: thisCnt, anterior: prevCnt };
    });
  }, [completedFocus, thisMonthStart, thisMonthEnd, prevMonthStart, prevMonthEnd]);

  // CSV export
  const exportCsv = useCallback(() => {
    setExportingCsv(true);
    const rows = [
      ["Data", "Hora", "Tag", "Cor", "Duração (min)", "Tipo"],
      ...completedFocus.map((s) => {
        const d = new Date(s.created_date);
        return [
          format(d, "yyyy-MM-dd"),
          format(d, "HH:mm"),
          s.tag_name || "Sem tag",
          s.tag_color || "",
          s.duration_minutes || "",
          s.type || "focus",
        ];
      })
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `focusgrid-sessoes-${format(today, "yyyy-MM-dd")}.csv`; a.click();
    URL.revokeObjectURL(url);
    setExportingCsv(false);
  }, [completedFocus, today]);

  // PDF export
  const exportPdf = useCallback(async () => {
    setExportingPdf(true);
    try {
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import("jspdf"),
        import("html2canvas"),
      ]);
      const el = analyticsRef.current;
      if (!el) return;
      const canvas = await html2canvas(el, { scale: 2, backgroundColor: "#FFF5E6", useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const W = 210; const H = (canvas.height / canvas.width) * W;
      const pageH = 297;
      let yPos = 0;
      while (yPos < H) {
        if (yPos > 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, -yPos, W, H);
        yPos += pageH;
      }
      pdf.save(`focusgrid-analytics-${format(today, "yyyy-MM-dd")}.pdf`);
    } catch (e) {
      console.error(e);
    }
    setExportingPdf(false);
  }, [today]);

  return (
    <div className="min-h-screen bg-cream flex flex-col select-none" {...swipeHandlers}>
      <div style={dragStyle} className="flex-1 flex flex-col">
        <div className="bg-white border-b border-border px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate("/focus")} className="w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
            <ArrowUp className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">Analytics</h1>
            <p className="text-[11px] text-muted-foreground">{format(today, "d 'de' MMMM, yyyy", { locale: pt })}</p>
          </div>
          <div className="flex gap-1.5">
            <button onClick={exportCsv} disabled={exportingCsv || completedFocus.length === 0}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-secondary text-xs font-medium text-muted-foreground hover:bg-border transition-all disabled:opacity-40">
              {exportingCsv ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5" />} CSV
            </button>
            <button onClick={exportPdf} disabled={exportingPdf || completedFocus.length === 0}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-secondary text-xs font-medium text-muted-foreground hover:bg-border transition-all disabled:opacity-40">
              {exportingPdf ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />} PDF
            </button>
          </div>
        </div>

        <div ref={analyticsRef} className="flex-1 overflow-auto p-4 space-y-4">
          {/* Stats cards */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Target, color: "text-[#E87A5A]", bg: "bg-[#E87A5A]/10", label: "Hoje", value: todayCount, unit: "pomodoros" },
              { icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-100", label: "Semana", value: weekCount, unit: "pomodoros" },
              { icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-100", label: "Total", value: completedFocus.length, unit: "pomodoros" },
              { icon: Clock, color: "text-amber-600", bg: "bg-amber-100", label: "Foco", value: `${totalHours}h ${totalRemainder}m`, unit: "tempo" }
            ].map((card, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-9 h-9 rounded-xl ${card.bg} flex items-center justify-center`}>
                    <card.icon className={`w-4 h-4 ${card.color}`} />
                  </div>
                  <span className="text-xs font-semibold text-foreground">{card.label}</span>
                </div>
                <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
                <p className="text-[10px] text-muted-foreground">{card.unit}</p>
              </motion.div>
            ))}
          </div>

          {/* Streak */}
          {streak > 0 && (
            <div className="bg-white rounded-2xl p-4 border border-border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl">🔥</div>
                <div>
                  <p className="text-sm font-bold text-foreground">Sequência de {streak} dia{streak !== 1 ? "s" : ""}</p>
                  <p className="text-[11px] text-muted-foreground">Dias consecutivos com foco</p>
                </div>
                <div className="ml-auto text-3xl font-bold text-amber-500">{streak}</div>
              </div>
            </div>
          )}

          {/* Month comparison */}
          <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-500" /> Comparação Mensal
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#E87A5A]/8 rounded-xl p-3">
                <p className="text-[10px] text-muted-foreground mb-1">{format(thisMonthStart, "MMMM", { locale: pt })}</p>
                <p className="text-xl font-bold text-[#E87A5A]">{thisMonthSessions.length}</p>
                <p className="text-[10px] text-muted-foreground">{Math.floor(thisMonthMin / 60)}h {thisMonthMin % 60}m foco</p>
              </div>
              <div className="bg-secondary rounded-xl p-3">
                <p className="text-[10px] text-muted-foreground mb-1">{format(prevMonthStart, "MMMM", { locale: pt })}</p>
                <p className="text-xl font-bold text-muted-foreground">{prevMonthSessions.length}</p>
                <p className="text-[10px] text-muted-foreground">{Math.floor(prevMonthMin / 60)}h {prevMonthMin % 60}m foco</p>
              </div>
            </div>
            {monthDiffPct !== null && (
              <div className={`text-xs font-semibold px-3 py-1.5 rounded-xl inline-flex items-center gap-1 ${monthDiff >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                {monthDiff >= 0 ? "▲" : "▼"} {Math.abs(monthDiffPct)}% vs mês anterior
              </div>
            )}
            <div className="h-[120px] mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthComparisonData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradAtual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#E87A5A" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#E87A5A" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradAnterior" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} interval={4} />
                  <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E8E0D8", background: "#fff", fontSize: 12 }} />
                  <Area type="monotone" dataKey="anterior" stroke="#8B5CF6" strokeWidth={1.5} strokeDasharray="4 2" fill="url(#gradAnterior)" name="Mês anterior" connectNulls />
                  <Area type="monotone" dataKey="atual" stroke="#E87A5A" strokeWidth={2} fill="url(#gradAtual)" name="Este mês" connectNulls />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly trend chart */}
          <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#E87A5A]" /> Tendência Semanal
            </h3>
            <div className="h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#E87A5A" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#E87A5A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0EBE3" />
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E8E0D8", background: "#fff", fontSize: 12 }} />
                  <Area type="monotone" dataKey="count" stroke="#E87A5A" strokeWidth={2} fill="url(#gradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Daily bar chart */}
          <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
            <h3 className="text-sm font-semibold text-foreground mb-4">Pomodoros por Dia</h3>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0EBE3" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E8E0D8", background: "#fff", fontSize: 12 }}
                    formatter={(value) => [`${value} 🍊`, "Pomodoros"]}
                    labelFormatter={(label, payload) => payload?.[0]?.payload?.date ? `Dia ${payload[0].payload.date}` : label} />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#E87A5A" maxBarSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tag + Hour charts row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tagDistribution.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
                <h3 className="text-sm font-semibold text-foreground mb-3">Por Tag</h3>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={tagDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} innerRadius={35} strokeWidth={3} stroke="#fff">
                        {tagDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E8E0D8", background: "#fff", fontSize: 12 }}
                        formatter={(value) => [`${value} 🍊`, "Pomodoros"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-1 mt-2">
                  {tagDistribution.slice(0, 5).map((entry, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px]">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
                      <span className="text-muted-foreground truncate">{entry.name}</span>
                      <span className="text-foreground font-medium ml-auto">{entry.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hourlyData.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
                <h3 className="text-sm font-semibold text-foreground mb-3">Foco por Hora</h3>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hourlyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#F0EBE3" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} allowDecimals={false} />
                      <YAxis dataKey="hour" type="category" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} width={35} />
                      <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E8E0D8", background: "#fff", fontSize: 12 }} />
                      <Bar dataKey="count" radius={[0, 6, 6, 0]} fill="#A78BFA" maxBarSize={14} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>

          {/* Recent sessions */}
          {completedFocus.slice(0, 6).length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
              <h3 className="text-sm font-semibold text-foreground mb-3">Sessões Recentes</h3>
              <div className="space-y-2">
                {completedFocus.slice(0, 6).map((s) => {
                  const cls = {
                    blue: "bg-blue-100 text-blue-700", purple: "bg-purple-100 text-purple-700",
                    green: "bg-emerald-100 text-emerald-700", amber: "bg-amber-100 text-amber-700",
                    rose: "bg-rose-100 text-rose-600", teal: "bg-teal-100 text-teal-700",
                    indigo: "bg-indigo-100 text-indigo-700", pink: "bg-pink-100 text-pink-700"
                  }[s.tag_color] || "bg-slate-100 text-slate-700";
                  return (
                    <div key={s.id} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${cls}`}>{s.tag_name || "Foco"}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{s.duration_minutes}min • {format(new Date(s.created_date), "d MMM", { locale: pt })}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
