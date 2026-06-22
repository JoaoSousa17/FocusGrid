import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

const PRESET_COLORS = [
{ key: "blue", hex: "#3B82F6" }, { key: "purple", hex: "#8B5CF6" },
{ key: "green", hex: "#10B981" }, { key: "amber", hex: "#F59E0B" },
{ key: "rose", hex: "#F43F5E" }, { key: "teal", hex: "#14B8A6" },
{ key: "indigo", hex: "#6366F1" }, { key: "pink", hex: "#EC4899" }];


// Tile size patterns that cycle to create variety
const TILE_SIZES = [
{ col: "col-span-2", height: "h-28" },
{ col: "col-span-1", height: "h-36" },
{ col: "col-span-1", height: "h-24" },
{ col: "col-span-2", height: "h-24" },
{ col: "col-span-1", height: "h-32" },
{ col: "col-span-1", height: "h-28" },
{ col: "col-span-1", height: "h-24" },
{ col: "col-span-2", height: "h-32" },
{ col: "col-span-1", height: "h-36" },
{ col: "col-span-1", height: "h-28" }];


function HabitTile({ habit, completed, onComplete, onUndo, animating, sizeIndex, "data-collection-item-id": __dataCollectionItemId }) {
  const size = TILE_SIZES[sizeIndex % TILE_SIZES.length];
  const colorHex = PRESET_COLORS.find((c) => c.key === habit.color)?.hex || habit.color || "#3B82F6";
  const isWide = size.col === "col-span-2";

  return (
    <motion.button data-source-location="components/habits/TetrisGrid:31:4" data-dynamic-content="true"
    layout
    animate={animating ? { scale: [1, 1.06, 1] } : {}}
    whileTap={{ scale: 0.95 }}
    onClick={() => completed ? onUndo(habit) : onComplete(habit)}
    className={`${size.col} ${size.height} relative rounded-3xl overflow-hidden text-left transition-all shadow-sm hover:shadow-md active:shadow-inner`}
    style={{
      backgroundColor: completed ? `${colorHex}18` : "#ffffff",
      border: `2px solid ${completed ? colorHex + "60" : "#F0EBE3"}`
    }} data-collection-item-id={__dataCollectionItemId}>
      
      {/* Color accent bar */}
      <div data-source-location="components/habits/TetrisGrid:43:6" data-dynamic-content="true" className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ backgroundColor: colorHex }} />

      {/* Check overlay when done */}
      {completed &&
      <div data-source-location="components/habits/TetrisGrid:47:8" data-dynamic-content="true" className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: colorHex }}>
          <Check data-source-location="components/habits/TetrisGrid:48:10" data-dynamic-content="false" className="w-3.5 h-3.5 text-white" />
        </div>
      }

      <div data-source-location="components/habits/TetrisGrid:52:6" data-dynamic-content="true" className="p-4 pt-5 h-full flex flex-col justify-between">
        <div data-source-location="components/habits/TetrisGrid:53:8" data-dynamic-content="true">
          {/* Icon circle */}
          <div data-source-location="components/habits/TetrisGrid:55:10" data-dynamic-content="true" className="w-9 h-9 rounded-xl flex items-center justify-center mb-2.5"
          style={{ backgroundColor: `${colorHex}20` }}>
            <Star data-source-location="components/habits/TetrisGrid:57:12" data-dynamic-content="true" className="w-4 h-4" style={{ color: colorHex }} fill={completed ? colorHex : "none"} />
          </div>
          <p data-source-location="components/habits/TetrisGrid:59:10" data-dynamic-content="true" className={`font-bold leading-tight ${completed ? "opacity-60" : "text-foreground"} ${isWide ? "text-sm" : "text-[13px]"}`} data-collection-item-field="name" data-collection-item-id={habit?.id || habit?._id}>
            {habit.name}
          </p>
          {habit.description && isWide &&
          <p data-source-location="components/habits/TetrisGrid:63:12" data-dynamic-content="true" className="text-[10px] text-muted-foreground mt-1 line-clamp-2" data-collection-item-field="description" data-collection-item-id={habit?.id || habit?._id}>{habit.description}</p>
          }
        </div>

        <div data-source-location="components/habits/TetrisGrid:67:8" data-dynamic-content="true" className="flex items-center gap-1 mt-2">
          <Star data-source-location="components/habits/TetrisGrid:68:10" data-dynamic-content="false" className="w-3 h-3 text-amber-400" fill="currentColor" />
          <span data-source-location="components/habits/TetrisGrid:69:10" data-dynamic-content="true" className="text-[11px] font-bold" style={{ color: colorHex }} data-collection-item-field="score" data-collection-item-id={habit?.id || habit?._id}>{habit.score}</span>
        </div>
      </div>
    </motion.button>);

}

export default function TetrisGrid({ pending, done, onComplete, onUndo, animating }) {
  const allHabits = [...pending, ...done];

  if (allHabits.length === 0) return null;

  return (
    <div data-source-location="components/habits/TetrisGrid:82:4" data-dynamic-content="true" className="space-y-6">
      {pending.length > 0 &&
      <div data-source-location="components/habits/TetrisGrid:84:8" data-dynamic-content="true">
          <p data-source-location="components/habits/TetrisGrid:85:10" data-dynamic-content="false" className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">Por fazer</p>
          <div data-source-location="components/habits/TetrisGrid:86:10" data-dynamic-content="true" className="grid grid-cols-2 gap-3" data-collection-id="pending">
            {pending.map((h, i) =>
          <HabitTile data-source-location="components/habits/TetrisGrid:88:14" data-dynamic-content="true"
          key={h.id}
          habit={h}
          completed={false}
          onComplete={onComplete}
          onUndo={onUndo}
          animating={animating === h.id}
          sizeIndex={i} data-collection-item-id={h?.id} />

          )}
          </div>
        </div>
      }

      {done.length > 0 &&
      <div data-source-location="components/habits/TetrisGrid:103:8" data-dynamic-content="true">
          <p data-source-location="components/habits/TetrisGrid:104:10" data-dynamic-content="false" className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">Feitos</p>
          <div data-source-location="components/habits/TetrisGrid:105:10" data-dynamic-content="true" className="grid grid-cols-2 gap-3" data-collection-id="done">
            {done.map((h, i) =>
          <HabitTile data-source-location="components/habits/TetrisGrid:107:14" data-dynamic-content="true"
          key={h.id}
          habit={h}
          completed={true}
          onComplete={onComplete}
          onUndo={onUndo}
          animating={false}
          sizeIndex={i + pending.length} data-collection-item-id={h?.id} />

          )}
          </div>
        </div>
      }
    </div>);

}