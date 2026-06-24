import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUp, TrendingUp, Clock, CheckCircle, Target, Zap } from "lucide-react";
import { FocusSession } from "@/api/entities";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from "recharts";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isWithinInterval, subWeeks } from "date-fns";
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
  const { swipeHandlers, dragStyle } = useEdgeSwipeNav({ down: "/focus" });

  useEffect(() => {
    FocusSession.list("-created_date", 500).then(setSessions).catch(() => setSessions([]));
  }, []);

  const today = new Date();
  const todayStr = format(today, "yyyy-MM-dd");
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

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

  return (
    <div data-source-location="pages/FocusAnalytics:106:4" data-dynamic-content="true" className="min-h-screen bg-cream flex flex-col select-none"
    {...swipeHandlers}>
      
      <div data-source-location="pages/FocusAnalytics:114:6" data-dynamic-content="true" style={dragStyle} className="flex-1 flex flex-col">
        <div data-source-location="pages/FocusAnalytics:115:8" data-dynamic-content="true" className="bg-white border-b border-border px-4 py-3 flex items-center gap-3">
          <button data-source-location="pages/FocusAnalytics:116:10" data-dynamic-content="true" onClick={() => navigate("/focus")} className="w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
            <ArrowUp data-source-location="pages/FocusAnalytics:117:12" data-dynamic-content="false" className="w-5 h-5" />
          </button>
          <div data-source-location="pages/FocusAnalytics:119:10" data-dynamic-content="true">
            <h1 data-source-location="pages/FocusAnalytics:120:12" data-dynamic-content="false" className="text-lg font-bold text-foreground">Analytics</h1>
            <p data-source-location="pages/FocusAnalytics:121:12" data-dynamic-content="true" className="text-[11px] text-muted-foreground">{format(today, "d 'de' MMMM, yyyy", { locale: pt })}</p>
          </div>
        </div>

        <div data-source-location="pages/FocusAnalytics:125:8" data-dynamic-content="true" className="flex-1 overflow-auto p-4 space-y-4">
          {/* Stats cards */}
          <div data-source-location="pages/FocusAnalytics:127:10" data-dynamic-content="true" className="grid grid-cols-2 gap-3">
            {[
            { icon: Target, color: "text-[#E87A5A]", bg: "bg-[#E87A5A]/10", label: "Hoje", value: todayCount, unit: "pomodoros" },
            { icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-100", label: "Semana", value: weekCount, unit: "pomodoros" },
            { icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-100", label: "Total", value: completedFocus.length, unit: "pomodoros" },
            { icon: Clock, color: "text-amber-600", bg: "bg-amber-100", label: "Foco", value: `${totalHours}h ${totalRemainder}m`, unit: "tempo" }].
            map((card, i) =>
            <motion.div data-source-location="pages/FocusAnalytics:134:14" data-dynamic-content="true" key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div data-source-location="pages/FocusAnalytics:136:16" data-dynamic-content="true" className="flex items-center gap-2 mb-2">
                  <div data-source-location="pages/FocusAnalytics:137:18" data-dynamic-content="true" className={`w-9 h-9 rounded-xl ${card.bg} flex items-center justify-center`}>
                    <card.icon data-source-location="pages/FocusAnalytics:138:20" data-dynamic-content="true" className={`w-4 h-4 ${card.color}`} />
                  </div>
                  <span data-source-location="pages/FocusAnalytics:140:18" data-dynamic-content="true" className="text-xs font-semibold text-foreground" data-collection-item-field="label" data-collection-item-id={card?.id || card?._id}>{card.label}</span>
                </div>
                <div data-source-location="pages/FocusAnalytics:142:16" data-dynamic-content="true" className={`text-2xl font-bold ${card.color}`} data-collection-item-field="value" data-collection-item-id={card?.id || card?._id}>{card.value}</div>
                <p data-source-location="pages/FocusAnalytics:143:16" data-dynamic-content="true" className="text-[10px] text-muted-foreground" data-collection-item-field="unit" data-collection-item-id={card?.id || card?._id}>{card.unit}</p>
              </motion.div>
            )}
          </div>

          {/* Streak */}
          {streak > 0 &&
          <div data-source-location="pages/FocusAnalytics:150:12" data-dynamic-content="true" className="bg-white rounded-2xl p-4 border border-border shadow-sm">
              <div data-source-location="pages/FocusAnalytics:151:14" data-dynamic-content="true" className="flex items-center gap-3">
                <div data-source-location="pages/FocusAnalytics:152:16" data-dynamic-content="false" className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl">🔥</div>
                <div data-source-location="pages/FocusAnalytics:153:16" data-dynamic-content="true">
                  <p data-source-location="pages/FocusAnalytics:154:18" data-dynamic-content="true" className="text-sm font-bold text-foreground" data-collection-item-field="streak">Sequência de {streak} dia{streak !== 1 ? "s" : ""}</p>
                  <p data-source-location="pages/FocusAnalytics:155:18" data-dynamic-content="false" className="text-[11px] text-muted-foreground">Dias consecutivos com foco</p>
                </div>
                <div data-source-location="pages/FocusAnalytics:157:16" data-dynamic-content="true" className="ml-auto text-3xl font-bold text-amber-500" data-collection-item-field="streak">{streak}</div>
              </div>
            </div>
          }

          {/* Weekly trend chart */}
          <div data-source-location="pages/FocusAnalytics:163:10" data-dynamic-content="true" className="bg-white rounded-2xl p-5 border border-border shadow-sm">
            <h3 data-source-location="pages/FocusAnalytics:164:12" data-dynamic-content="false" className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Zap data-source-location="pages/FocusAnalytics:165:14" data-dynamic-content="false" className="w-4 h-4 text-[#E87A5A]" /> Tendência Semanal
            </h3>
            <div data-source-location="pages/FocusAnalytics:167:12" data-dynamic-content="true" className="h-[160px]">
              <ResponsiveContainer data-source-location="pages/FocusAnalytics:168:14" data-dynamic-content="true" width="100%" height="100%">
                <AreaChart data-source-location="pages/FocusAnalytics:169:16" data-dynamic-content="true" data={weeklyTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs data-source-location="pages/FocusAnalytics:170:18" data-dynamic-content="false">
                    <linearGradient data-source-location="pages/FocusAnalytics:171:20" data-dynamic-content="false" id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop data-source-location="pages/FocusAnalytics:172:22" data-dynamic-content="false" offset="0%" stopColor="#E87A5A" stopOpacity={0.3} />
                      <stop data-source-location="pages/FocusAnalytics:173:22" data-dynamic-content="false" offset="100%" stopColor="#E87A5A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid data-source-location="pages/FocusAnalytics:176:18" data-dynamic-content="false" strokeDasharray="3 3" stroke="#F0EBE3" />
                  <XAxis data-source-location="pages/FocusAnalytics:177:18" data-dynamic-content="true" dataKey="week" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <YAxis data-source-location="pages/FocusAnalytics:178:18" data-dynamic-content="true" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip data-source-location="pages/FocusAnalytics:179:18" data-dynamic-content="true" contentStyle={{ borderRadius: 12, border: "1px solid #E8E0D8", background: "#fff", fontSize: 12 }} />
                  <Area data-source-location="pages/FocusAnalytics:180:18" data-dynamic-content="false" type="monotone" dataKey="count" stroke="#E87A5A" strokeWidth={2} fill="url(#gradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Daily bar chart */}
          <div data-source-location="pages/FocusAnalytics:187:10" data-dynamic-content="true" className="bg-white rounded-2xl p-5 border border-border shadow-sm">
            <h3 data-source-location="pages/FocusAnalytics:188:12" data-dynamic-content="false" className="text-sm font-semibold text-foreground mb-4">Pomodoros por Dia</h3>
            <div data-source-location="pages/FocusAnalytics:189:12" data-dynamic-content="true" className="h-[180px]">
              <ResponsiveContainer data-source-location="pages/FocusAnalytics:190:14" data-dynamic-content="true" width="100%" height="100%">
                <BarChart data-source-location="pages/FocusAnalytics:191:16" data-dynamic-content="true" data={dailyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid data-source-location="pages/FocusAnalytics:192:18" data-dynamic-content="false" strokeDasharray="3 3" stroke="#F0EBE3" />
                  <XAxis data-source-location="pages/FocusAnalytics:193:18" data-dynamic-content="true" dataKey="day" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <YAxis data-source-location="pages/FocusAnalytics:194:18" data-dynamic-content="true" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip data-source-location="pages/FocusAnalytics:195:18" data-dynamic-content="true" contentStyle={{ borderRadius: 12, border: "1px solid #E8E0D8", background: "#fff", fontSize: 12 }}
                  formatter={(value) => [`${value} 🍊`, "Pomodoros"]}
                  labelFormatter={(label, payload) => payload?.[0]?.payload?.date ? `Dia ${payload[0].payload.date}` : label} />
                  <Bar data-source-location="pages/FocusAnalytics:198:18" data-dynamic-content="true" dataKey="count" radius={[8, 8, 0, 0]} fill="#E87A5A" maxBarSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tag + Hour charts row */}
          <div data-source-location="pages/FocusAnalytics:205:10" data-dynamic-content="true" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tagDistribution.length > 0 &&
            <div data-source-location="pages/FocusAnalytics:207:14" data-dynamic-content="true" className="bg-white rounded-2xl p-5 border border-border shadow-sm">
                <h3 data-source-location="pages/FocusAnalytics:208:16" data-dynamic-content="false" className="text-sm font-semibold text-foreground mb-3">Por Tag</h3>
                <div data-source-location="pages/FocusAnalytics:209:16" data-dynamic-content="true" className="h-[180px]">
                  <ResponsiveContainer data-source-location="pages/FocusAnalytics:210:18" data-dynamic-content="true" width="100%" height="100%">
                    <PieChart data-source-location="pages/FocusAnalytics:211:20" data-dynamic-content="true">
                      <Pie data-source-location="pages/FocusAnalytics:212:22" data-dynamic-content="true" data={tagDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} innerRadius={35} strokeWidth={3} stroke="#fff">
                        {tagDistribution.map((entry, i) => <Cell data-source-location="pages/FocusAnalytics:213:60" data-dynamic-content="true" key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip data-source-location="pages/FocusAnalytics:215:22" data-dynamic-content="true" contentStyle={{ borderRadius: 12, border: "1px solid #E8E0D8", background: "#fff", fontSize: 12 }}
                    formatter={(value) => [`${value} 🍊`, "Pomodoros"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div data-source-location="pages/FocusAnalytics:220:16" data-dynamic-content="true" className="space-y-1 mt-2">
                  {tagDistribution.slice(0, 5).map((entry, i) =>
                <div data-source-location="pages/FocusAnalytics:222:20" data-dynamic-content="true" key={i} className="flex items-center gap-2 text-[10px]">
                      <div data-source-location="pages/FocusAnalytics:223:22" data-dynamic-content="true" className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
                      <span data-source-location="pages/FocusAnalytics:224:22" data-dynamic-content="true" className="text-muted-foreground truncate" data-collection-item-field="name" data-collection-item-id={entry?.id || entry?._id}>{entry.name}</span>
                      <span data-source-location="pages/FocusAnalytics:225:22" data-dynamic-content="true" className="text-foreground font-medium ml-auto" data-collection-item-field="value" data-collection-item-id={entry?.id || entry?._id}>{entry.value}</span>
                    </div>
                )}
                </div>
              </div>
            }

            {hourlyData.length > 0 &&
            <div data-source-location="pages/FocusAnalytics:233:14" data-dynamic-content="true" className="bg-white rounded-2xl p-5 border border-border shadow-sm">
                <h3 data-source-location="pages/FocusAnalytics:234:16" data-dynamic-content="false" className="text-sm font-semibold text-foreground mb-3">Foco por Hora</h3>
                <div data-source-location="pages/FocusAnalytics:235:16" data-dynamic-content="true" className="h-[180px]">
                  <ResponsiveContainer data-source-location="pages/FocusAnalytics:236:18" data-dynamic-content="true" width="100%" height="100%">
                    <BarChart data-source-location="pages/FocusAnalytics:237:20" data-dynamic-content="true" data={hourlyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} layout="vertical">
                      <CartesianGrid data-source-location="pages/FocusAnalytics:238:22" data-dynamic-content="false" strokeDasharray="3 3" stroke="#F0EBE3" horizontal={false} />
                      <XAxis data-source-location="pages/FocusAnalytics:239:22" data-dynamic-content="true" type="number" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} allowDecimals={false} />
                      <YAxis data-source-location="pages/FocusAnalytics:240:22" data-dynamic-content="true" dataKey="hour" type="category" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} width={35} />
                      <Tooltip data-source-location="pages/FocusAnalytics:241:22" data-dynamic-content="true" contentStyle={{ borderRadius: 12, border: "1px solid #E8E0D8", background: "#fff", fontSize: 12 }} />
                      <Bar data-source-location="pages/FocusAnalytics:242:22" data-dynamic-content="true" dataKey="count" radius={[0, 6, 6, 0]} fill="#A78BFA" maxBarSize={14} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            }
          </div>

          {/* Recent sessions */}
          {completedFocus.slice(0, 6).length > 0 &&
          <div data-source-location="pages/FocusAnalytics:252:12" data-dynamic-content="true" className="bg-white rounded-2xl p-5 border border-border shadow-sm">
              <h3 data-source-location="pages/FocusAnalytics:253:14" data-dynamic-content="false" className="text-sm font-semibold text-foreground mb-3">Sessões Recentes</h3>
              <div data-source-location="pages/FocusAnalytics:254:14" data-dynamic-content="true" className="space-y-2">
                {completedFocus.slice(0, 6).map((s) => {
                const cls = {
                  blue: "bg-blue-100 text-blue-700", purple: "bg-purple-100 text-purple-700",
                  green: "bg-emerald-100 text-emerald-700", amber: "bg-amber-100 text-amber-700",
                  rose: "bg-rose-100 text-rose-600", teal: "bg-teal-100 text-teal-700",
                  indigo: "bg-indigo-100 text-indigo-700", pink: "bg-pink-100 text-pink-700"
                }[s.tag_color] || "bg-slate-100 text-slate-700";
                return (
                  <div data-source-location="pages/FocusAnalytics:263:20" data-dynamic-content="true" key={s.id} className="flex items-center gap-2 text-sm" data-collection-item-id={s?.id}>
                      <CheckCircle data-source-location="pages/FocusAnalytics:264:22" data-dynamic-content="false" className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span data-source-location="pages/FocusAnalytics:265:22" data-dynamic-content="true" className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${cls}`}>{s.tag_name || "Foco"}</span>
                      <span data-source-location="pages/FocusAnalytics:266:22" data-dynamic-content="true" className="text-xs text-muted-foreground ml-auto" data-collection-item-field="duration_minutes" data-collection-item-id={s?.id}>{s.duration_minutes}min • {format(new Date(s.created_date), "d MMM", { locale: pt })}</span>
                    </div>);

              })}
              </div>
            </div>
          }
        </div>
      </div>
    </div>);

}