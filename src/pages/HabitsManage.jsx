import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUp, Plus, X, Save, Palette, Sparkles, Send, Trash2, Bot, Loader2 } from "lucide-react";
import { Habit } from "@/api/entities";
import { InvokeLLM } from "@/api/integrations";
import { useEdgeSwipeNav } from "@/hooks/useEdgeSwipeNav";

const PRESET_COLORS = [
{ key: "blue", hex: "#3B82F6", label: "Azul" }, { key: "purple", hex: "#8B5CF6", label: "Roxo" },
{ key: "green", hex: "#10B981", label: "Verde" }, { key: "amber", hex: "#F59E0B", label: "Âmbar" },
{ key: "rose", hex: "#F43F5E", label: "Rosa" }, { key: "teal", hex: "#14B8A6", label: "Teal" },
{ key: "indigo", hex: "#6366F1", label: "Índigo" }, { key: "pink", hex: "#EC4899", label: "Pink" }];


function getNextColor(usedColors) {
  for (const c of PRESET_COLORS) {
    if (!usedColors.has(c.key)) return c.key;
  }
  return PRESET_COLORS[0].key;
}

export default function HabitsManage() {
  const navigate = useNavigate();
  const [habits, setHabits] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", score: 10, color: "blue", goal_type: "boolean", goal_target: 1, goal_unit: "", goal_direction: "at_least" });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [aiError, setAiError] = useState(null);

  // Swipe
  const { swipeHandlers, dragStyle } = useEdgeSwipeNav({ up: "/habits" });

  const refresh = useCallback(() => {
    Habit.list("order", 100).then(setHabits).catch(() => setHabits([]));
  }, []);

  useEffect(() => {refresh();}, [refresh]);

  const usedColors = new Set(habits.map((h) => h.color));

  const resetForm = () => {
    setEditingId(null);
    setForm({ name: "", description: "", score: 10, color: getNextColor(usedColors), goal_type: "boolean", goal_target: 1, goal_unit: "", goal_direction: "at_least" });
    setShowColorPicker(false);
  };

  const saveHabit = async () => {
    if (!form.name.trim()) return;
    if (editingId) {
      await Habit.update(editingId, form);
    } else {
      const maxOrder = Math.max(...habits.map((h) => h.order || 0), 0);
      await Habit.create({ ...form, order: maxOrder + 1 });
    }
    resetForm();
    refresh();
  };

  const editHabit = (h) => {
    setEditingId(h.id);
    setForm({
      name: h.name, description: h.description || "", score: h.score, color: h.color,
      goal_type: h.goal_type || "boolean", goal_target: h.goal_target || 1,
      goal_unit: h.goal_unit || "", goal_direction: h.goal_direction || "at_least"
    });
  };

  const deleteHabit = async (id) => {
    await Habit.delete(id).catch(() => {});
    if (editingId === id) resetForm();
    refresh();
  };

  const toggleActive = async (h) => {
    await Habit.update(h.id, { active: !h.active });
    refresh();
  };

  const handleAISuggest = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    setAiError(null);
    try {
      const res = await InvokeLLM({
        prompt: `Sugere hábitos saudáveis baseados neste contexto: "${aiPrompt}". 
Retorna um JSON com um array "habits" de objetos com: "name" (nome curto, em português), "description" (breve descrição, em português), "score" (número entre 5 e 25, sugerido com base na dificuldade/impacto do hábito), "color" (escolhe entre: blue, purple, green, amber, rose, teal, indigo, pink).
Máximo 5 hábitos. Sê criativo e útil. Usa português de Portugal.`,
        response_json_schema: {
          type: "object",
          properties: {
            habits: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                  score: { type: "number" },
                  color: { type: "string" }
                }
              }
            }
          }
        }
      });
      setAiResponse(res.habits || []);
    } catch (err) {
      console.error("AI suggest error:", err);
      setAiError("Erro: " + (err?.message || "Tenta novamente."));
    }
    setAiLoading(false);
  };

  const adoptAISuggestion = async (habit) => {
    const maxOrder = Math.max(...habits.map((h) => h.order || 0), 0);
    await Habit.create({
      name: habit.name,
      description: habit.description || "",
      score: habit.score || 10,
      color: habit.color || "blue",
      order: maxOrder + 1,
      active: true
    });
    refresh();
  };

  return (
    <div data-source-location="pages/HabitsManage:138:4" data-dynamic-content="true"
    className="min-h-screen bg-cream flex flex-col select-none"
    {...swipeHandlers}>
      
      <div data-source-location="pages/HabitsManage:147:6" data-dynamic-content="true" style={dragStyle} className="flex-1 flex flex-col">
        {/* Header */}
        <div data-source-location="pages/HabitsManage:149:8" data-dynamic-content="true" className="bg-white border-b border-border px-4 py-4 flex items-center gap-3">
          <button data-source-location="pages/HabitsManage:150:10" data-dynamic-content="true" onClick={() => navigate("/habits")} className="w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
            <ArrowDown data-source-location="pages/HabitsManage:151:12" data-dynamic-content="false" className="w-5 h-5" />
          </button>
          <div data-source-location="pages/HabitsManage:153:10" data-dynamic-content="false" className="flex-1">
            <h1 data-source-location="pages/HabitsManage:154:12" data-dynamic-content="false" className="text-xl font-bold text-foreground">Gerir Hábitos</h1>
            <p data-source-location="pages/HabitsManage:155:12" data-dynamic-content="false" className="text-[10px] text-muted-foreground flex items-center gap-1">Swipe para cima <ArrowUp data-source-location="pages/HabitsManage:155:99" data-dynamic-content="false" className="w-3 h-3" /> voltar</p>
          </div>
          <button data-source-location="pages/HabitsManage:157:10" data-dynamic-content="true" onClick={() => setShowAI(true)} className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all">
            <Bot data-source-location="pages/HabitsManage:158:12" data-dynamic-content="false" className="w-4 h-4" /> IA
          </button>
        </div>

        {/* Add/Edit form */}
        <div data-source-location="pages/HabitsManage:163:8" data-dynamic-content="true" className="p-4">
          <motion.div data-source-location="pages/HabitsManage:164:10" data-dynamic-content="true"
          layout
          className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
            
            {/* Form header */}
            <div data-source-location="pages/HabitsManage:169:12" data-dynamic-content="true" className="px-5 pt-5 pb-3 border-b border-border/50 flex items-center gap-3">
              <div data-source-location="pages/HabitsManage:170:14" data-dynamic-content="true" className="w-9 h-9 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${PRESET_COLORS.find((c) => c.key === form.color)?.hex || "#E87A5A"}20` }}>
                <Plus data-source-location="pages/HabitsManage:172:16" data-dynamic-content="true" className="w-5 h-5" style={{ color: PRESET_COLORS.find((c) => c.key === form.color)?.hex || "#E87A5A" }} />
              </div>
              <h2 data-source-location="pages/HabitsManage:174:14" data-dynamic-content="true" className="text-sm font-bold text-foreground">{editingId ? "Editar hábito" : "Novo hábito"}</h2>
            </div>

            <div data-source-location="pages/HabitsManage:177:12" data-dynamic-content="true" className="p-5 space-y-4">
              {/* Name input */}
              <div data-source-location="pages/HabitsManage:179:14" data-dynamic-content="true">
                <label data-source-location="pages/HabitsManage:180:16" data-dynamic-content="false" className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Nome</label>
                <input data-source-location="pages/HabitsManage:181:16" data-dynamic-content="true"
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ex: Meditar 10 minutos"
                className="mt-1.5 w-full px-4 py-3 rounded-2xl bg-secondary/50 border border-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground/50 outline-none focus:bg-white focus:border-[#E87A5A]/40 transition-all" />
              </div>

              {/* Description input */}
              <div data-source-location="pages/HabitsManage:188:14" data-dynamic-content="true">
                <label data-source-location="pages/HabitsManage:189:16" data-dynamic-content="false" className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Descrição <span data-source-location="pages/HabitsManage:189:117" data-dynamic-content="false" className="normal-case font-normal">(opcional)</span></label>
                <input data-source-location="pages/HabitsManage:190:16" data-dynamic-content="true"
                value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Adiciona uma nota..."
                className="mt-1.5 w-full px-4 py-3 rounded-2xl bg-secondary/50 border border-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:bg-white focus:border-[#E87A5A]/40 transition-all" />
              </div>

              {/* Score + Color row */}
              <div data-source-location="pages/HabitsManage:197:14" data-dynamic-content="true" className="flex gap-4 items-start">
                {/* Score */}
                <div data-source-location="pages/HabitsManage:199:16" data-dynamic-content="true" className="flex-1">
                  <label data-source-location="pages/HabitsManage:200:18" data-dynamic-content="false" className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Pontuação</label>
                  <div data-source-location="pages/HabitsManage:201:18" data-dynamic-content="true" className="mt-1.5 bg-secondary/50 rounded-2xl px-4 py-3 flex items-center gap-3">
                    <input data-source-location="pages/HabitsManage:202:20" data-dynamic-content="true" type="range" min={1} max={50} value={form.score}
                    onChange={(e) => setForm({ ...form, score: Number(e.target.value) })}
                    className="flex-1 h-1.5 rounded-full"
                    style={{ accentColor: PRESET_COLORS.find((c) => c.key === form.color)?.hex || "#E87A5A" }} />
                    <span data-source-location="pages/HabitsManage:206:20" data-dynamic-content="true" className="text-lg font-black min-w-[2rem] text-right" style={{ color: PRESET_COLORS.find((c) => c.key === form.color)?.hex || "#E87A5A" }} data-collection-item-field="score" data-collection-item-id={form?.id || form?._id}>
                      {form.score}
                    </span>
                  </div>
                </div>

                {/* Color picker */}
                <div data-source-location="pages/HabitsManage:213:16" data-dynamic-content="true" className="relative">
                  <label data-source-location="pages/HabitsManage:214:18" data-dynamic-content="false" className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Cor</label>
                  <button data-source-location="pages/HabitsManage:215:18" data-dynamic-content="true"
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className="mt-1.5 w-[52px] h-[52px] rounded-2xl border-4 border-white shadow-md transition-all hover:scale-105 active:scale-95"
                  style={{ backgroundColor: PRESET_COLORS.find((c) => c.key === form.color)?.hex || form.color }} />
                  
                  <AnimatePresence data-source-location="pages/HabitsManage:220:18" data-dynamic-content="true">
                    {showColorPicker &&
                    <motion.div data-source-location="pages/HabitsManage:222:22" data-dynamic-content="true"
                    initial={{ opacity: 0, scale: 0.9, y: 4 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 4 }}
                    className="absolute right-0 top-full mt-2 bg-white rounded-2xl border border-border shadow-2xl p-3 z-30 grid grid-cols-4 gap-2 w-[144px]">
                      
                        {PRESET_COLORS.map((c, __arrIdx__) =>
                      <button data-source-location="pages/HabitsManage:227:26" data-dynamic-content="true" key={c.key}
                      onClick={() => {setForm({ ...form, color: c.key });setShowColorPicker(false);}}
                      className={`w-8 h-8 rounded-xl transition-all ${form.color === c.key ? "ring-2 ring-offset-2 scale-110 shadow-md" : "hover:scale-105"}`}
                      style={{ backgroundColor: c.hex, outlineColor: c.hex }}
                      title={c.label} data-arr-index={__arrIdx__} data-arr-variable-name="PRESET_COLORS" />

                      )}
                      </motion.div>
                    }
                  </AnimatePresence>
                </div>
              </div>

              {/* Goal type */}
              <div>
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Tipo de meta</label>
                <div className="mt-1.5 flex gap-2">
                  <button type="button" onClick={() => setForm({ ...form, goal_type: "boolean" })}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${form.goal_type === "boolean" ? "bg-[#E87A5A] text-white" : "bg-secondary/50 text-muted-foreground hover:bg-secondary"}`}>
                    Sim / Não
                  </button>
                  <button type="button" onClick={() => setForm({ ...form, goal_type: "numeric" })}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${form.goal_type === "numeric" ? "bg-[#E87A5A] text-white" : "bg-secondary/50 text-muted-foreground hover:bg-secondary"}`}>
                    Numérico (%)
                  </button>
                </div>
              </div>

              {form.goal_type === "numeric" &&
              <div className="bg-secondary/30 rounded-2xl p-3.5 space-y-3">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Meta</label>
                    <input type="number" min={0} step="any" value={form.goal_target}
                    onChange={(e) => setForm({ ...form, goal_target: Number(e.target.value) })}
                    className="mt-1 w-full px-3 py-2 rounded-xl bg-white border border-border text-sm outline-none focus:border-[#E87A5A]/40 transition-all" />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Unidade</label>
                    <input value={form.goal_unit} onChange={(e) => setForm({ ...form, goal_unit: e.target.value })}
                    placeholder="ex: L, cigarros, min"
                    className="mt-1 w-full px-3 py-2 rounded-xl bg-white border border-border text-sm outline-none focus:border-[#E87A5A]/40 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Direção</label>
                  <div className="mt-1 flex gap-2">
                    <button type="button" onClick={() => setForm({ ...form, goal_direction: "at_least" })}
                    className={`flex-1 py-2 rounded-xl text-[11px] font-medium transition-all ${form.goal_direction === "at_least" ? "bg-emerald-500 text-white" : "bg-white text-muted-foreground border border-border"}`}>
                      Atingir pelo menos
                    </button>
                    <button type="button" onClick={() => setForm({ ...form, goal_direction: "at_most" })}
                    className={`flex-1 py-2 rounded-xl text-[11px] font-medium transition-all ${form.goal_direction === "at_most" ? "bg-rose-500 text-white" : "bg-white text-muted-foreground border border-border"}`}>
                      Não ultrapassar
                    </button>
                  </div>
                  <p className="text-[9px] text-muted-foreground mt-1.5">
                    {form.goal_direction === "at_least" ?
                    "Ex: meta 2L água — bebes 1L, ganhas 50% dos pontos." :
                    "Ex: meta 4 cigarros (nível atual) — fumas 2, ganhas 50% dos pontos."}
                  </p>
                </div>
              </div>
              }

              {/* Actions */}
              <div data-source-location="pages/HabitsManage:241:14" data-dynamic-content="true" className="flex gap-2 pt-1">
                {editingId &&
                <button data-source-location="pages/HabitsManage:243:18" data-dynamic-content="true" onClick={resetForm}
                className="flex-1 py-3 rounded-2xl bg-secondary text-muted-foreground text-sm font-semibold hover:bg-border transition-all">
                    Cancelar
                  </button>
                }
                <button data-source-location="pages/HabitsManage:248:16" data-dynamic-content="true" onClick={saveHabit} disabled={!form.name.trim()}
                className="flex-1 py-3 rounded-2xl text-white text-sm font-bold shadow-lg transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 flex items-center justify-center gap-2"
                style={{ backgroundColor: PRESET_COLORS.find((c) => c.key === form.color)?.hex || "#E87A5A" }}>
                  {editingId ? <><Save data-source-location="pages/HabitsManage:251:33" data-dynamic-content="false" className="w-4 h-4" /> Guardar</> : <><Plus data-source-location="pages/HabitsManage:251:77" data-dynamic-content="false" className="w-4 h-4" /> Adicionar</>}
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Habit list */}
        <div data-source-location="pages/HabitsManage:259:8" data-dynamic-content="true" className="flex-1 overflow-auto px-4 pb-20">
          <h2 data-source-location="pages/HabitsManage:260:10" data-dynamic-content="true" className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2 px-1">
            {habits.length} hábito{habits.length !== 1 ? "s" : ""}
          </h2>
          <div data-source-location="pages/HabitsManage:263:10" data-dynamic-content="true" className="space-y-1.5">
            {habits.map((h) => {
              const colorHex = PRESET_COLORS.find((c) => c.key === h.color)?.hex || h.color;
              return (
                <div data-source-location="pages/HabitsManage:267:16" data-dynamic-content="true" key={h.id} className={`bg-white rounded-xl border p-3 flex items-center gap-3 transition-all ${editingId === h.id ? "border-[#E87A5A] ring-2 ring-[#E87A5A]/20" : "border-border"}`} data-collection-item-id={h?.id}>
                  <div data-source-location="pages/HabitsManage:268:18" data-dynamic-content="true" className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: colorHex }} />
                  <div data-source-location="pages/HabitsManage:269:18" data-dynamic-content="true" className="flex-1 min-w-0">
                    <p data-source-location="pages/HabitsManage:270:20" data-dynamic-content="true" className={`text-sm ${h.active === false ? "line-through text-muted-foreground/50" : "text-foreground"}`} data-collection-item-field="name" data-collection-item-id={h?.id}>{h.name}</p>
                    <p data-source-location="pages/HabitsManage:271:20" data-dynamic-content="true" className="text-[10px] text-muted-foreground" data-collection-item-field="score" data-collection-item-id={h?.id}>
                      {h.score} pts{h.goal_type === "numeric" && h.goal_target ? ` · meta ${h.goal_target}${h.goal_unit ? " " + h.goal_unit : ""}` : ""}
                    </p>
                  </div>
                  <button data-source-location="pages/HabitsManage:273:18" data-dynamic-content="true" onClick={() => editHabit(h)} className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-[#E87A5A] transition-all">
                    <Sparkles data-source-location="pages/HabitsManage:274:20" data-dynamic-content="false" className="w-3.5 h-3.5" />
                  </button>
                  <button data-source-location="pages/HabitsManage:276:18" data-dynamic-content="true" onClick={() => toggleActive(h)}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all text-[10px] font-bold ${h.active === false ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-400 hover:text-amber-500"}`}>
                    {h.active === false ? "ON" : "OFF"}
                  </button>
                  <button data-source-location="pages/HabitsManage:280:18" data-dynamic-content="true" onClick={() => deleteHabit(h.id)} className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center text-rose-400 hover:text-rose-600 hover:bg-rose-100 transition-all">
                    <Trash2 data-source-location="pages/HabitsManage:281:20" data-dynamic-content="false" className="w-3.5 h-3.5" />
                  </button>
                </div>);

            })}
          </div>
        </div>
      </div>

      {/* AI Chat popup */}
      <AnimatePresence data-source-location="pages/HabitsManage:291:6" data-dynamic-content="true">
        {showAI &&
        <motion.div data-source-location="pages/HabitsManage:293:10" data-dynamic-content="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/30 flex items-end sm:items-center justify-center"
        onClick={() => setShowAI(false)}>
            <motion.div data-source-location="pages/HabitsManage:296:12" data-dynamic-content="true" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md p-5 max-h-[85vh] overflow-y-auto shadow-xl"
          onClick={(e) => e.stopPropagation()}>
              <div data-source-location="pages/HabitsManage:300:14" data-dynamic-content="false" className="flex items-center gap-2 mb-4">
                <div data-source-location="pages/HabitsManage:301:16" data-dynamic-content="false" className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                  <Bot data-source-location="pages/HabitsManage:302:18" data-dynamic-content="false" className="w-5 h-5 text-white" />
                </div>
                <div data-source-location="pages/HabitsManage:304:16" data-dynamic-content="false">
                  <h3 data-source-location="pages/HabitsManage:305:18" data-dynamic-content="false" className="font-bold text-foreground">Sugestões IA</h3>
                  <p data-source-location="pages/HabitsManage:306:18" data-dynamic-content="false" className="text-[10px] text-muted-foreground">Hábitos e pontuações personalizadas</p>
                </div>
              </div>

              <div data-source-location="pages/HabitsManage:310:14" data-dynamic-content="true" className="flex gap-2 mb-3">
                <input data-source-location="pages/HabitsManage:311:16" data-dynamic-content="true"
              value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAISuggest()}
              placeholder="Ex: quero dormir melhor e fazer mais exercício..."
              className="flex-1 px-3 py-2.5 rounded-xl border border-border text-sm outline-none focus:border-purple-400 transition-all" />
                <button data-source-location="pages/HabitsManage:316:16" data-dynamic-content="true" onClick={handleAISuggest} disabled={aiLoading || !aiPrompt.trim()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white disabled:opacity-50 transition-all">
                  {aiLoading ? <Loader2 data-source-location="pages/HabitsManage:318:31" data-dynamic-content="false" className="w-4 h-4 animate-spin" /> : <Send data-source-location="pages/HabitsManage:318:78" data-dynamic-content="false" className="w-4 h-4" />}
                </button>
              </div>

              {aiError && <p data-source-location="pages/HabitsManage:322:26" data-dynamic-content="true" className="text-xs text-rose-500 mb-3" data-collection-item-field="aiError">{aiError}</p>}

              {aiResponse && aiResponse.length > 0 &&
            <div data-source-location="pages/HabitsManage:325:16" data-dynamic-content="true" className="space-y-2">
                  <p data-source-location="pages/HabitsManage:326:18" data-dynamic-content="false" className="text-xs text-muted-foreground">Clique para adicionar:</p>
                  {aiResponse.map((h, i) => {
                const colorHex = PRESET_COLORS.find((c) => c.key === h.color)?.hex || "#3B82F6";
                return (
                  <button data-source-location="pages/HabitsManage:330:22" data-dynamic-content="true" key={i} onClick={() => adoptAISuggestion(h)}
                  className="w-full bg-secondary/50 rounded-xl p-3 flex items-center gap-3 text-left hover:bg-[#E87A5A]/5 hover:border-[#E87A5A]/30 border border-transparent transition-all">
                        <div data-source-location="pages/HabitsManage:332:24" data-dynamic-content="true" className="w-8 h-8 rounded-lg flex items-center justify-center text-xs" style={{ backgroundColor: `${colorHex}20`, color: colorHex }} data-collection-item-field="score" data-collection-item-id={h?.id || h?._id}>{h.score}</div>
                        <div data-source-location="pages/HabitsManage:333:24" data-dynamic-content="true" className="flex-1 min-w-0">
                          <p data-source-location="pages/HabitsManage:334:26" data-dynamic-content="true" className="text-sm font-medium text-foreground" data-collection-item-field="name" data-collection-item-id={h?.id || h?._id}>{h.name}</p>
                          <p data-source-location="pages/HabitsManage:335:26" data-dynamic-content="true" className="text-[10px] text-muted-foreground truncate" data-collection-item-field="description" data-collection-item-id={h?.id || h?._id}>{h.description}</p>
                        </div>
                        <Plus data-source-location="pages/HabitsManage:337:24" data-dynamic-content="false" className="w-4 h-4 text-[#E87A5A]" />
                      </button>);

              })}
                </div>
            }

              <button data-source-location="pages/HabitsManage:344:14" data-dynamic-content="true" onClick={() => setShowAI(false)} className="w-full mt-4 py-2.5 rounded-xl bg-secondary text-sm font-medium hover:bg-border transition-all">
                Fechar
              </button>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}