import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, Trophy, Flame, Star, Zap, Crown } from "lucide-react";
import { HabitEntry } from "@/api/entities";
import { format, eachDayOfInterval, startOfWeek, endOfWeek, subDays } from "date-fns";
import { pt } from "date-fns/locale";
import { useEdgeSwipeNav } from "@/hooks/useEdgeSwipeNav";
import { useLang } from "@/context/LangContext";

const ACHIEVEMENT_DEFS = [
{ key: "first", icon: Star, tLabel: "rewards.a.first.label", tDesc: "rewards.a.first.desc", threshold: 1, color: "text-amber-500", bg: "bg-amber-50" },
{ key: "streak_3", icon: Flame, tLabel: "rewards.a.streak3.label", tDesc: "rewards.a.streak3.desc", threshold: 3, color: "text-orange-500", bg: "bg-orange-50" },
{ key: "streak_7", icon: Zap, tLabel: "rewards.a.streak7.label", tDesc: "rewards.a.streak7.desc", threshold: 7, color: "text-indigo-500", bg: "bg-indigo-50" },
{ key: "streak_14", icon: Crown, tLabel: "rewards.a.streak14.label", tDesc: "rewards.a.streak14.desc", threshold: 14, color: "text-purple-500", bg: "bg-purple-50" },
{ key: "streak_30", icon: Trophy, tLabel: "rewards.a.streak30.label", tDesc: "rewards.a.streak30.desc", threshold: 30, color: "text-rose-500", bg: "bg-rose-50" }];


export default function HabitsRewards() {
  const navigate = useNavigate();
  const { t } = useLang();
  const [entries, setEntries] = useState([]);
  const { swipeHandlers, dragStyle } = useEdgeSwipeNav({ down: "/habits" });

  useEffect(() => {
    HabitEntry.list("-created_date", 500).then(setEntries).catch(() => setEntries([]));
  }, []);

  // Get unique dates with entries
  const activeDates = useMemo(() => {
    const set = new Set();
    entries.forEach((e) => set.add(e.date));
    return set;
  }, [entries]);

  // Calculate current streak
  const currentStreak = useMemo(() => {
    let streak = 0;
    const d = new Date();
    while (true) {
      const key = format(d, "yyyy-MM-dd");
      if (!activeDates.has(key)) break;
      streak++;
      d.setDate(d.getDate() - 1);
    }
    return streak;
  }, [activeDates]);

  // Longest streak
  const longestStreak = useMemo(() => {
    let longest = 0;
    let current = 0;
    const today = new Date();
    // Look back 365 days
    for (let i = 365; i >= 0; i--) {
      const d = subDays(today, i);
      const key = format(d, "yyyy-MM-dd");
      if (activeDates.has(key)) {
        current++;
        if (current > longest) longest = current;
      } else {
        current = 0;
      }
    }
    return longest;
  }, [activeDates]);

  // This week's days colored
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const todayStr = format(new Date(), "yyyy-MM-dd");

  const totalEntries = entries.length;
  const totalScore = entries.reduce((s, e) => s + (e.score || 0), 0);

  return (
    <div data-source-location="pages/HabitsRewards:88:4" data-dynamic-content="true"
    className="min-h-screen bg-cream flex flex-col select-none"
    {...swipeHandlers}>
      
      <div data-source-location="pages/HabitsRewards:97:6" data-dynamic-content="true" style={dragStyle} className="flex-1 flex flex-col">
        <div data-source-location="pages/HabitsRewards:98:8" data-dynamic-content="true" className="bg-white border-b border-border px-4 py-4 flex items-center gap-3">
          <button data-source-location="pages/HabitsRewards:99:10" data-dynamic-content="true" onClick={() => navigate("/habits")} className="w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
            <ArrowUp data-source-location="pages/HabitsRewards:100:12" data-dynamic-content="false" className="w-5 h-5" />
          </button>
          <div data-source-location="pages/HabitsRewards:102:10" data-dynamic-content="false">
            <h1 data-source-location="pages/HabitsRewards:103:12" data-dynamic-content="false" className="text-xl font-bold text-foreground">{t("rewards.title")}</h1>
            <p data-source-location="pages/HabitsRewards:104:12" data-dynamic-content="false" className="text-[10px] text-muted-foreground flex items-center gap-1">
              {t("rewards.swipe_back")} <ArrowDown data-source-location="pages/HabitsRewards:105:26" data-dynamic-content="false" className="w-3 h-3" /> {t("rewards.back_hint")}
            </p>
          </div>
        </div>

        <div data-source-location="pages/HabitsRewards:110:8" data-dynamic-content="true" className="flex-1 overflow-auto p-4 space-y-4">
          {/* Streak highlight */}
          {currentStreak > 0 &&
          <motion.div data-source-location="pages/HabitsRewards:113:12" data-dynamic-content="true" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-5 border border-amber-200 shadow-sm">
              <div data-source-location="pages/HabitsRewards:115:14" data-dynamic-content="true" className="flex items-center gap-3 mb-3">
                <div data-source-location="pages/HabitsRewards:116:16" data-dynamic-content="false" className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-sm">🔥</div>
                <div data-source-location="pages/HabitsRewards:117:16" data-dynamic-content="true">
                  <p data-source-location="pages/HabitsRewards:118:18" data-dynamic-content="false" className="text-sm font-bold text-amber-800">{t("rewards.current_streak")}</p>
                  <p data-source-location="pages/HabitsRewards:119:18" data-dynamic-content="true" className="text-3xl font-black text-amber-600" data-collection-item-field="currentStreak">{currentStreak}</p>
                  <p data-source-location="pages/HabitsRewards:120:18" data-dynamic-content="true" className="text-xs text-amber-600/70">{t("habits.streak")}</p>
                </div>
              </div>
              {/* Week dots */}
              <div data-source-location="pages/HabitsRewards:124:14" data-dynamic-content="true" className="flex gap-2 justify-center">
                {weekDays.map((d, i) => {
                const key = format(d, "yyyy-MM-dd");
                const isActive = activeDates.has(key);
                const isToday = key === todayStr;
                return (
                  <div data-source-location="pages/HabitsRewards:130:20" data-dynamic-content="true" key={i} className="flex flex-col items-center gap-1">
                      <div data-source-location="pages/HabitsRewards:131:22" data-dynamic-content="true" className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                    isActive ? "bg-amber-500 text-white shadow-md" : "bg-slate-200 text-slate-400"} ${
                    isToday ? "ring-2 ring-amber-300 ring-offset-1" : ""}`}>
                        {format(d, "d")}
                      </div>
                      <span data-source-location="pages/HabitsRewards:136:22" data-dynamic-content="true" className="text-[9px] text-muted-foreground">{format(d, "EEE", { locale: pt }).replace(".", "")}</span>
                    </div>);

              })}
              </div>
            </motion.div>
          }

          {/* Stats */}
          <div data-source-location="pages/HabitsRewards:145:10" data-dynamic-content="true" className="grid grid-cols-2 gap-3">
            {[
            { icon: Trophy, label: t("rewards.record"), value: `${longestStreak}`, color: "text-amber-600", bg: "bg-amber-50" },
            { icon: Star, label: t("rewards.total_actions"), value: totalEntries, color: "text-emerald-600", bg: "bg-emerald-50" }].
            map((c, i) =>
            <div data-source-location="pages/HabitsRewards:150:14" data-dynamic-content="true" key={i} className={`${c.bg} rounded-2xl p-4 border border-border/50`}>
                <c.icon data-source-location="pages/HabitsRewards:151:16" data-dynamic-content="true" className={`w-5 h-5 ${c.color} mb-1`} />
                <p data-source-location="pages/HabitsRewards:152:16" data-dynamic-content="true" className="text-lg font-bold text-foreground" data-collection-item-field="value" data-collection-item-id={c?.id || c?._id}>{c.value}</p>
                <p data-source-location="pages/HabitsRewards:153:16" data-dynamic-content="true" className="text-[10px] text-muted-foreground" data-collection-item-field="label" data-collection-item-id={c?.id || c?._id}>{c.label}</p>
              </div>
            )}
          </div>

          {/* Achievements */}
          <div data-source-location="pages/HabitsRewards:159:10" data-dynamic-content="true">
            <h3 data-source-location="pages/HabitsRewards:160:12" data-dynamic-content="false" className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <Crown data-source-location="pages/HabitsRewards:161:14" data-dynamic-content="false" className="w-4 h-4 text-amber-500" /> {t("rewards.achievements")}
            </h3>
            <div data-source-location="pages/HabitsRewards:163:12" data-dynamic-content="true" className="space-y-2">
              {ACHIEVEMENT_DEFS.map((a, __arrIdx__) => {
                const unlocked = currentStreak >= a.threshold || longestStreak >= a.threshold;
                const Icon = a.icon;
                return (
                  <div data-source-location="pages/HabitsRewards:168:18" data-dynamic-content="true" key={a.key} className={`rounded-2xl p-4 border transition-all ${unlocked ? `${a.bg} border-${a.color.split("-")[1]}-200` : "bg-slate-100 border-slate-200 opacity-60"}`} data-arr-index={__arrIdx__} data-arr-variable-name="ACHIEVEMENTS">
                    <div data-source-location="pages/HabitsRewards:169:20" data-dynamic-content="true" className="flex items-center gap-3" data-arr-index={__arrIdx__} data-arr-variable-name="ACHIEVEMENTS">
                      <div data-source-location="pages/HabitsRewards:170:22" data-dynamic-content="true" className={`w-11 h-11 rounded-xl flex items-center justify-center ${unlocked ? "bg-white shadow-sm" : "bg-slate-200"}`} data-arr-index={__arrIdx__} data-arr-variable-name="ACHIEVEMENTS">
                        <Icon data-source-location="pages/HabitsRewards:171:24" data-dynamic-content="true" className={`w-5 h-5 ${unlocked ? a.color : "text-slate-400"}`} data-arr-index={__arrIdx__} data-arr-variable-name="ACHIEVEMENTS" />
                      </div>
                      <div data-source-location="pages/HabitsRewards:173:22" data-dynamic-content="true" data-arr-index={__arrIdx__} data-arr-variable-name="ACHIEVEMENTS">
                        <p data-source-location="pages/HabitsRewards:174:24" data-dynamic-content="true" className={`text-sm font-bold ${unlocked ? "text-foreground" : "text-slate-500"}`}>{t(a.tLabel)}</p>
                        <p data-source-location="pages/HabitsRewards:175:24" data-dynamic-content="true" className="text-[10px] text-muted-foreground">{t(a.tDesc)}</p>
                      </div>
                      <div data-source-location="pages/HabitsRewards:177:22" data-dynamic-content="true" className="ml-auto" data-arr-index={__arrIdx__} data-arr-variable-name="ACHIEVEMENTS">
                        {unlocked ?
                        <div data-source-location="pages/HabitsRewards:179:26" data-dynamic-content="false" className="w-7 h-7 rounded-full bg-white flex items-center justify-center" data-arr-index={__arrIdx__} data-arr-variable-name="ACHIEVEMENTS">
                            <Trophy data-source-location="pages/HabitsRewards:180:28" data-dynamic-content="false" className="w-4 h-4 text-amber-500" />
                          </div> :

                        <div data-source-location="pages/HabitsRewards:183:26" data-dynamic-content="true" className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400" data-arr-index={__arrIdx__} data-arr-variable-name="ACHIEVEMENTS" data-arr-field="threshold">
                            {a.threshold}
                          </div>
                        }
                      </div>
                    </div>
                  </div>);

              })}
            </div>
          </div>
        </div>
      </div>
    </div>);

}