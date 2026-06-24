import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Sparkles, Trophy } from "lucide-react";
import TetrisGrid from "@/components/habits/TetrisGrid";
import { Habit, HabitEntry } from "@/api/entities";
import { format, startOfWeek, isToday as isTodayFn } from "date-fns";
import { pt } from "date-fns/locale";
import { useEdgeSwipeNav } from "@/hooks/useEdgeSwipeNav";

const PRESET_COLORS = [
{ key: "blue", hex: "#3B82F6" }, { key: "purple", hex: "#8B5CF6" },
{ key: "green", hex: "#10B981" }, { key: "amber", hex: "#F59E0B" },
{ key: "rose", hex: "#F43F5E" }, { key: "teal", hex: "#14B8A6" },
{ key: "indigo", hex: "#6366F1" }, { key: "pink", hex: "#EC4899" }];




export default function Habits() {
  const navigate = useNavigate();
  const [habits, setHabits] = useState([]);
  const [entries, setEntries] = useState([]);
  const { swipeHandlers, dragStyle } = useEdgeSwipeNav({ left: "/habits/analytics", right: "/", down: "/habits/manage", up: "/habits/rewards" });
  const [animating, setAnimating] = useState(null);

  const todayStr = format(new Date(), "yyyy-MM-dd");

  const refreshData = useCallback(() => {
    Habit.list("order", 100).then(setHabits).catch(() => setHabits([]));
    HabitEntry.list("-created_date", 500).then(setEntries).catch(() => setEntries([]));
  }, []);

  useEffect(() => {refreshData();}, [refreshData]);

  const todayEntries = useMemo(() => entries.filter((e) => e.date === todayStr), [entries, todayStr]);
  const completedIds = useMemo(() => new Set(todayEntries.map((e) => e.habit_id)), [todayEntries]);
  const todayScore = useMemo(() => todayEntries.reduce((sum, e) => sum + (e.score || 0), 0), [todayEntries]);

  const activeHabits = useMemo(() => habits.filter((h) => h.active !== false), [habits]);

  const pendingHabits = useMemo(() => activeHabits.filter((h) => !completedIds.has(h.id)), [activeHabits, completedIds]);
  const doneHabits = useMemo(() => activeHabits.filter((h) => completedIds.has(h.id)), [activeHabits, completedIds]);

  const completeHabit = async (habit) => {
    setAnimating(habit.id);
    const colorHex = PRESET_COLORS.find((c) => c.key === habit.color)?.hex || habit.color;
    await HabitEntry.create({
      habit_id: habit.id, habit_name: habit.name,
      habit_color: colorHex, score: habit.score,
      date: todayStr
    });
    refreshData();
    setTimeout(() => setAnimating(null), 300);
  };

  const undoHabit = async (habit) => {
    const entry = todayEntries.find((e) => e.habit_id === habit.id);
    if (entry) {
      await HabitEntry.delete(entry.id).catch(() => {});
      refreshData();
    }
  };

  return (
    <div data-source-location="pages/Habits:89:4" data-dynamic-content="true"
    className="min-h-screen bg-cream flex flex-col select-none"
    {...swipeHandlers}>
      
      <div data-source-location="pages/Habits:98:6" data-dynamic-content="true" style={dragStyle} className="flex-1 flex flex-col">
        {/* Header with score */}
        <div data-source-location="pages/Habits:100:8" data-dynamic-content="true" className="bg-white border-b border-border px-4 py-4">
          <div data-source-location="pages/Habits:101:10" data-dynamic-content="true" className="flex items-center justify-between mb-3">
            <div data-source-location="pages/Habits:102:12" data-dynamic-content="true" className="flex items-center gap-3">
              <button data-source-location="pages/Habits:103:14" data-dynamic-content="true" onClick={() => navigate("/")} className="w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
                <ArrowLeft data-source-location="pages/Habits:104:16" data-dynamic-content="false" className="w-5 h-5" />
              </button>
              <h1 data-source-location="pages/Habits:106:14" data-dynamic-content="false" className="text-xl font-bold text-foreground">Hábitos</h1>
            </div>
            <motion.div data-source-location="pages/Habits:108:12" data-dynamic-content="true"
            key={todayScore}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-2 flex items-center gap-2 shadow-sm">
              
              <Trophy data-source-location="pages/Habits:114:14" data-dynamic-content="false" className="w-5 h-5 text-amber-500" />
              <div data-source-location="pages/Habits:115:14" data-dynamic-content="true">
                <p data-source-location="pages/Habits:116:16" data-dynamic-content="false" className="text-[10px] text-amber-600 font-medium">Hoje</p>
                <p data-source-location="pages/Habits:117:16" data-dynamic-content="true" className="text-lg font-bold text-amber-700" data-collection-item-field="todayScore">{todayScore} pts</p>
              </div>
            </motion.div>
          </div>

          {/* Navigation arrows */}
          <div data-source-location="pages/Habits:123:10" data-dynamic-content="false" className="flex justify-between items-center px-2">
            <span data-source-location="pages/Habits:124:12" data-dynamic-content="false" className="text-[10px] text-muted-foreground/50 flex items-center gap-1">
              <ArrowUp data-source-location="pages/Habits:125:14" data-dynamic-content="false" className="w-3 h-3" /> Conquistas
            </span>
            <span data-source-location="pages/Habits:127:12" data-dynamic-content="false" className="text-[10px] text-muted-foreground/50 flex items-center gap-1">
              <ArrowDown data-source-location="pages/Habits:128:14" data-dynamic-content="false" className="w-3 h-3" /> Gerir
            </span>
            <span data-source-location="pages/Habits:130:12" data-dynamic-content="false" className="text-[10px] text-muted-foreground/50 flex items-center gap-1">
              <ArrowLeft data-source-location="pages/Habits:131:14" data-dynamic-content="false" className="w-3 h-3" /> Analytics
            </span>
            <span data-source-location="pages/Habits:133:12" data-dynamic-content="false" className="text-[10px] text-muted-foreground/50 flex items-center gap-1">
              Home <ArrowRight data-source-location="pages/Habits:134:19" data-dynamic-content="false" className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Main content - Tetris layout */}
        <div data-source-location="pages/Habits:140:8" data-dynamic-content="true" className="flex-1 overflow-auto p-4">
          {pendingHabits.length === 0 && doneHabits.length === 0 &&
          <div data-source-location="pages/Habits:142:12" data-dynamic-content="false" className="text-center py-16 text-muted-foreground text-sm">
              <Sparkles data-source-location="pages/Habits:143:14" data-dynamic-content="false" className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p data-source-location="pages/Habits:144:14" data-dynamic-content="false">Sem hábitos ainda</p>
              <p data-source-location="pages/Habits:145:14" data-dynamic-content="false" className="text-[10px] mt-1">Swipe baixo para gerir</p>
            </div>
          }

          {pendingHabits.length === 0 && doneHabits.length > 0 &&
          <div data-source-location="pages/Habits:150:12" data-dynamic-content="false" className="text-center py-6 text-muted-foreground text-sm mb-4">
              <Sparkles data-source-location="pages/Habits:151:14" data-dynamic-content="false" className="w-8 h-8 mx-auto mb-2 text-[#E87A5A] opacity-60" />
              <p data-source-location="pages/Habits:152:14" data-dynamic-content="false" className="font-semibold text-foreground">Tudo feito hoje! 🎉</p>
            </div>
          }

          {/* Tetris grid */}
          <TetrisGrid data-source-location="pages/Habits:157:10" data-dynamic-content="true"
          pending={pendingHabits}
          done={doneHabits}
          onComplete={completeHabit}
          onUndo={undoHabit}
          animating={animating} />
          
        </div>
      </div>
    </div>);

}