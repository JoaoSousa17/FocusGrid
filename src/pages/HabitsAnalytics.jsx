import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, TrendingUp, Star, Medal, BarChart3 } from "lucide-react";
import { Habit, HabitEntry } from "@/api/entities";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { format, startOfWeek, endOfWeek, subWeeks, eachDayOfInterval, isWithinInterval } from "date-fns";
import { pt } from "date-fns/locale";

const PRESET_COLORS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#F43F5E", "#14B8A6", "#6366F1", "#EC4899"];

export default function HabitsAnalytics() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [habits, setHabits] = useState([]);

  const touchStart = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const [dragStyle, setDragStyle] = useState({});

  useEffect(() => {
    HabitEntry.list("-created_date", 500).then(setEntries).catch(() => setEntries([]));
    Habit.list().then(setHabits).catch(() => setHabits([]));
  }, []);

  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  // Daily scores this week
  const dailyScores = useMemo(() => {
    return weekDays.map((d) => {
      const key = format(d, "yyyy-MM-dd");
      const dayEntries = entries.filter((e) => e.date === key);
      return {
        day: format(d, "EEE", { locale: pt }),
        date: format(d, "d"),
        score: dayEntries.reduce((s, e) => s + (e.score || 0), 0),
        count: dayEntries.length
      };
    });
  }, [entries, weekDays]);

  // Habit completion stats
  const habitStats = useMemo(() => {
    const map = {};
    entries.forEach((e) => {
      if (!map[e.habit_id]) map[e.habit_id] = { name: e.habit_name, count: 0, score: 0 };
      map[e.habit_id].count++;
      map[e.habit_id].score += e.score || 0;
    });
    // Also include habits that have never been completed
    habits.forEach((h) => {
      if (!map[h.id]) map[h.id] = { name: h.name, count: 0, score: 0 };
    });
    return Object.values(map).sort((a, b) => b.count - a.count);
  }, [entries, habits]);

  // Weekly trend (last 4 weeks)
  const weeklyTrend = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => {
      const ws = startOfWeek(subWeeks(today, 3 - i), { weekStartsOn: 1 });
      const we = endOfWeek(subWeeks(today, 3 - i), { weekStartsOn: 1 });
      const weekEntries = entries.filter((e) => isWithinInterval(new Date(e.date), { start: ws, end: we }));
      return {
        week: `Sem ${i + 1}`,
        score: weekEntries.reduce((s, e) => s + (e.score || 0), 0),
        count: weekEntries.length
      };
    });
  }, [entries, today]);

  // Top and bottom habits
  const sortedByCount = [...habitStats].sort((a, b) => b.count - a.count);
  const mostDone = sortedByCount.slice(0, 3);
  const leastDone = sortedByCount.filter((h) => h.count === 0).length > 0 ?
  sortedByCount.filter((h) => h.count === 0).slice(0, 3) :
  sortedByCount.slice(-3).reverse();

  const totalScore = entries.reduce((s, e) => s + (e.score || 0), 0);
  const totalCompletions = entries.length;

  const handlePointerStart = useCallback((x, y) => {touchStart.current = { x, y };dragOffset.current = { x: 0, y: 0 };setDragStyle({});}, []);
  const handlePointerMove = useCallback((x, y) => {
    dragOffset.current = { x: x - touchStart.current.x, y: y - touchStart.current.y };
    setDragStyle({ transform: `translate(${dragOffset.current.x}px, ${dragOffset.current.y}px)`, transition: "none" });
  }, []);
  const handlePointerEnd = useCallback((x, y) => {
    setDragStyle({ transform: "translate(0, 0)", transition: "transform 0.3s ease-out" });
    if (x - touchStart.current.x > 60) navigate("/habits");
  }, [navigate]);

  return (
    <div data-source-location="pages/HabitsAnalytics:95:4" data-dynamic-content="true"
    className="min-h-screen bg-cream flex flex-col select-none"
    onTouchStart={(e) => handlePointerStart(e.touches[0].clientX, e.touches[0].clientY)}
    onTouchMove={(e) => handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)}
    onTouchEnd={(e) => handlePointerEnd(e.changedTouches[0]?.clientX || touchStart.current.x, e.changedTouches[0]?.clientY || touchStart.current.y)}
    onMouseDown={(e) => handlePointerStart(e.clientX, e.clientY)}
    onMouseMove={(e) => {if (e.buttons === 1) handlePointerMove(e.clientX, e.clientY);}}
    onMouseUp={(e) => handlePointerEnd(e.clientX, e.clientY)}>
      
      <div data-source-location="pages/HabitsAnalytics:104:6" data-dynamic-content="true" style={dragStyle} className="flex-1 flex flex-col">
        <div data-source-location="pages/HabitsAnalytics:105:8" data-dynamic-content="true" className="bg-white border-b border-border px-4 py-4 flex items-center gap-3">
          <button data-source-location="pages/HabitsAnalytics:106:10" data-dynamic-content="true" onClick={() => navigate("/habits")} className="w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
            <ArrowLeft data-source-location="pages/HabitsAnalytics:107:12" data-dynamic-content="false" className="w-5 h-5" />
          </button>
          <div data-source-location="pages/HabitsAnalytics:109:10" data-dynamic-content="false">
            <h1 data-source-location="pages/HabitsAnalytics:110:12" data-dynamic-content="false" className="text-xl font-bold text-foreground">Analytics</h1>
            <p data-source-location="pages/HabitsAnalytics:111:12" data-dynamic-content="false" className="text-[10px] text-muted-foreground">Hábitos saudáveis</p>
          </div>
        </div>

        <div data-source-location="pages/HabitsAnalytics:115:8" data-dynamic-content="true" className="flex-1 overflow-auto p-4 space-y-4">
          {/* Summary cards */}
          <div data-source-location="pages/HabitsAnalytics:117:10" data-dynamic-content="true" className="grid grid-cols-3 gap-3">
            {[
            { icon: Trophy, label: "Total", value: totalScore, unit: "pts", color: "text-amber-600", bg: "bg-amber-50" },
            { icon: TrendingUp, label: "Feitos", value: totalCompletions, unit: "ações", color: "text-emerald-600", bg: "bg-emerald-50" },
            { icon: Medal, label: "Média/dia", value: totalCompletions > 0 ? Math.round(totalScore / totalCompletions) : 0, unit: "pts", color: "text-indigo-600", bg: "bg-indigo-50" }].
            map((card, i) =>
            <motion.div data-source-location="pages/HabitsAnalytics:123:14" data-dynamic-content="true" key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={`${card.bg} rounded-2xl p-3 border border-border/50`}>
                <div data-source-location="pages/HabitsAnalytics:125:16" data-dynamic-content="true" className="flex items-center gap-2 mb-1">
                  <card.icon data-source-location="pages/HabitsAnalytics:126:18" data-dynamic-content="true" className={`w-4 h-4 ${card.color}`} />
                  <span data-source-location="pages/HabitsAnalytics:127:18" data-dynamic-content="true" className="text-[10px] text-muted-foreground" data-collection-item-field="label" data-collection-item-id={card?.id || card?._id}>{card.label}</span>
                </div>
                <p data-source-location="pages/HabitsAnalytics:129:16" data-dynamic-content="true" className={`text-xl font-bold ${card.color}`} data-collection-item-field="value" data-collection-item-id={card?.id || card?._id}>{card.value}</p>
                <p data-source-location="pages/HabitsAnalytics:130:16" data-dynamic-content="true" className="text-[9px] text-muted-foreground" data-collection-item-field="unit" data-collection-item-id={card?.id || card?._id}>{card.unit}</p>
              </motion.div>
            )}
          </div>

          {/* Daily chart */}
          <div data-source-location="pages/HabitsAnalytics:136:10" data-dynamic-content="true" className="bg-white rounded-2xl p-5 border border-border">
            <h3 data-source-location="pages/HabitsAnalytics:137:12" data-dynamic-content="false" className="text-sm font-bold text-foreground flex items-center gap-2 mb-4">
              <BarChart3 data-source-location="pages/HabitsAnalytics:138:14" data-dynamic-content="false" className="w-4 h-4 text-[#E87A5A]" /> Pontuação Semanal
            </h3>
            <div data-source-location="pages/HabitsAnalytics:140:12" data-dynamic-content="true" className="h-[180px]">
              <ResponsiveContainer data-source-location="pages/HabitsAnalytics:141:14" data-dynamic-content="true" width="100%" height="100%">
                <BarChart data-source-location="pages/HabitsAnalytics:142:16" data-dynamic-content="true" data={dailyScores} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid data-source-location="pages/HabitsAnalytics:143:18" data-dynamic-content="false" strokeDasharray="3 3" stroke="#F0EBE3" />
                  <XAxis data-source-location="pages/HabitsAnalytics:144:18" data-dynamic-content="true" dataKey="day" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <YAxis data-source-location="pages/HabitsAnalytics:145:18" data-dynamic-content="true" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip data-source-location="pages/HabitsAnalytics:146:18" data-dynamic-content="true" contentStyle={{ borderRadius: 12, border: "1px solid #E8E0D8", background: "#fff", fontSize: 12 }}
                  formatter={(value) => [`${value} pts`, "Pontuação"]} />
                  <Bar data-source-location="pages/HabitsAnalytics:148:18" data-dynamic-content="true" dataKey="score" radius={[8, 8, 0, 0]} fill="#E87A5A" maxBarSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly trend */}
          <div data-source-location="pages/HabitsAnalytics:155:10" data-dynamic-content="true" className="bg-white rounded-2xl p-5 border border-border">
            <h3 data-source-location="pages/HabitsAnalytics:156:12" data-dynamic-content="false" className="text-sm font-bold text-foreground flex items-center gap-2 mb-4">
              <TrendingUp data-source-location="pages/HabitsAnalytics:157:14" data-dynamic-content="false" className="w-4 h-4 text-purple-500" /> Tendência Mensal
            </h3>
            <div data-source-location="pages/HabitsAnalytics:159:12" data-dynamic-content="true" className="h-[140px]">
              <ResponsiveContainer data-source-location="pages/HabitsAnalytics:160:14" data-dynamic-content="true" width="100%" height="100%">
                <LineChart data-source-location="pages/HabitsAnalytics:161:16" data-dynamic-content="true" data={weeklyTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid data-source-location="pages/HabitsAnalytics:162:18" data-dynamic-content="false" strokeDasharray="3 3" stroke="#F0EBE3" />
                  <XAxis data-source-location="pages/HabitsAnalytics:163:18" data-dynamic-content="true" dataKey="week" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <YAxis data-source-location="pages/HabitsAnalytics:164:18" data-dynamic-content="true" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip data-source-location="pages/HabitsAnalytics:165:18" data-dynamic-content="true" contentStyle={{ borderRadius: 12, border: "1px solid #E8E0D8", background: "#fff", fontSize: 12 }}
                  formatter={(value) => [`${value} pts`, "Total"]} />
                  <Line data-source-location="pages/HabitsAnalytics:167:18" data-dynamic-content="true" type="monotone" dataKey="score" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: "#8B5CF6", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Most/Least done */}
          <div data-source-location="pages/HabitsAnalytics:174:10" data-dynamic-content="true" className="grid grid-cols-2 gap-4">
            <div data-source-location="pages/HabitsAnalytics:175:12" data-dynamic-content="true" className="bg-white rounded-2xl p-4 border border-border">
              <h3 data-source-location="pages/HabitsAnalytics:176:14" data-dynamic-content="false" className="text-xs font-bold text-foreground mb-3 flex items-center gap-1.5">
                <Trophy data-source-location="pages/HabitsAnalytics:177:16" data-dynamic-content="false" className="w-3.5 h-3.5 text-amber-500" /> Mais feitos
              </h3>
              <div data-source-location="pages/HabitsAnalytics:179:14" data-dynamic-content="true" className="space-y-2">
                {mostDone.filter((h) => h.count > 0).length === 0 && <p data-source-location="pages/HabitsAnalytics:180:67" data-dynamic-content="false" className="text-[10px] text-muted-foreground">Sem dados</p>}
                {mostDone.filter((h) => h.count > 0).map((h, i) =>
                <div data-source-location="pages/HabitsAnalytics:182:18" data-dynamic-content="true" key={i} className="flex items-center gap-2 text-xs">
                    <div data-source-location="pages/HabitsAnalytics:183:20" data-dynamic-content="true" className="w-2 h-2 rounded-full" style={{ backgroundColor: PRESET_COLORS[i % PRESET_COLORS.length] }} />
                    <span data-source-location="pages/HabitsAnalytics:184:20" data-dynamic-content="true" className="text-foreground flex-1 truncate" data-collection-item-field="name" data-collection-item-id={h?.id || h?._id}>{h.name}</span>
                    <span data-source-location="pages/HabitsAnalytics:185:20" data-dynamic-content="true" className="text-muted-foreground font-mono" data-collection-item-field="count" data-collection-item-id={h?.id || h?._id}>{h.count}x</span>
                  </div>
                )}
              </div>
            </div>

            <div data-source-location="pages/HabitsAnalytics:191:12" data-dynamic-content="true" className="bg-white rounded-2xl p-4 border border-border">
              <h3 data-source-location="pages/HabitsAnalytics:192:14" data-dynamic-content="false" className="text-xs font-bold text-foreground mb-3 flex items-center gap-1.5">
                <Medal data-source-location="pages/HabitsAnalytics:193:16" data-dynamic-content="false" className="w-3.5 h-3.5 text-slate-400" /> Menos feitos
              </h3>
              <div data-source-location="pages/HabitsAnalytics:195:14" data-dynamic-content="true" className="space-y-2">
                {leastDone.length === 0 && <p data-source-location="pages/HabitsAnalytics:196:43" data-dynamic-content="false" className="text-[10px] text-muted-foreground">Sem dados</p>}
                {leastDone.map((h, i) =>
                <div data-source-location="pages/HabitsAnalytics:198:18" data-dynamic-content="true" key={i} className="flex items-center gap-2 text-xs">
                    <div data-source-location="pages/HabitsAnalytics:199:20" data-dynamic-content="false" className="w-2 h-2 rounded-full bg-slate-300" />
                    <span data-source-location="pages/HabitsAnalytics:200:20" data-dynamic-content="true" className="text-foreground flex-1 truncate" data-collection-item-field="name" data-collection-item-id={h?.id || h?._id}>{h.name}</span>
                    <span data-source-location="pages/HabitsAnalytics:201:20" data-dynamic-content="true" className="text-muted-foreground font-mono" data-collection-item-field="count" data-collection-item-id={h?.id || h?._id}>{h.count}x</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* All habits ranking */}
          <div data-source-location="pages/HabitsAnalytics:209:10" data-dynamic-content="true" className="bg-white rounded-2xl p-4 border border-border">
            <h3 data-source-location="pages/HabitsAnalytics:210:12" data-dynamic-content="false" className="text-sm font-bold text-foreground mb-3">Ranking de Hábitos</h3>
            <div data-source-location="pages/HabitsAnalytics:211:12" data-dynamic-content="true" className="space-y-1.5">
              {habitStats.map((h, i) =>
              <div data-source-location="pages/HabitsAnalytics:213:16" data-dynamic-content="true" key={i} className="flex items-center gap-3 py-2 px-3 rounded-xl bg-secondary/50 text-sm">
                  <span data-source-location="pages/HabitsAnalytics:214:18" data-dynamic-content="true" className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span>
                  <div data-source-location="pages/HabitsAnalytics:215:18" data-dynamic-content="true" className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: PRESET_COLORS[i % PRESET_COLORS.length] }} />
                  <span data-source-location="pages/HabitsAnalytics:216:18" data-dynamic-content="true" className="flex-1 text-foreground truncate" data-collection-item-field="name" data-collection-item-id={h?.id || h?._id}>{h.name}</span>
                  <span data-source-location="pages/HabitsAnalytics:217:18" data-dynamic-content="true" className="text-xs text-muted-foreground font-mono" data-collection-item-field="count" data-collection-item-id={h?.id || h?._id}>{h.count}x</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>);

}