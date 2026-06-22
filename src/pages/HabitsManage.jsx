import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/HabitsManage.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/pages/HabitsManage.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=fc940917"; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"]; const useRef = __vite__cjsImport3_react["useRef"]; const useCallback = __vite__cjsImport3_react["useCallback"];
import { useNavigate } from "/node_modules/.vite/deps/react-router-dom.js?v=8a08d97a";
import { motion, AnimatePresence } from "/node_modules/.vite/deps/framer-motion.js?v=fc940917";
import { ArrowLeft, ArrowRight, Plus, X, Save, Palette, Sparkles, Send, Trash2, Bot, Loader2 } from "/node_modules/.vite/deps/lucide-react.js?v=aefa7968";
import { base44 } from "/src/api/base44Client.js";
const PRESET_COLORS = [
  { key: "blue", hex: "#3B82F6", label: "Azul" },
  { key: "purple", hex: "#8B5CF6", label: "Roxo" },
  { key: "green", hex: "#10B981", label: "Verde" },
  { key: "amber", hex: "#F59E0B", label: "Âmbar" },
  { key: "rose", hex: "#F43F5E", label: "Rosa" },
  { key: "teal", hex: "#14B8A6", label: "Teal" },
  { key: "indigo", hex: "#6366F1", label: "Índigo" },
  { key: "pink", hex: "#EC4899", label: "Pink" }
];
function getNextColor(usedColors) {
  for (const c of PRESET_COLORS) {
    if (!usedColors.has(c.key)) return c.key;
  }
  return PRESET_COLORS[0].key;
}
export default function HabitsManage() {
  _s();
  const navigate = useNavigate();
  const [habits, setHabits] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", score: 10, color: "blue" });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [aiError, setAiError] = useState(null);
  const touchStart = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const [dragStyle, setDragStyle] = useState({});
  const refresh = useCallback(() => {
    base44.entities.Habit.list("order", 100).then(setHabits).catch(() => setHabits([]));
  }, []);
  useEffect(() => {
    refresh();
  }, [refresh]);
  const usedColors = new Set(habits.map((h) => h.color));
  const resetForm = () => {
    setEditingId(null);
    setForm({ name: "", description: "", score: 10, color: getNextColor(usedColors) });
    setShowColorPicker(false);
  };
  const saveHabit = async () => {
    if (!form.name.trim()) return;
    if (editingId) {
      await base44.entities.Habit.update(editingId, form);
    } else {
      const maxOrder = Math.max(...habits.map((h) => h.order || 0), 0);
      await base44.entities.Habit.create({ ...form, order: maxOrder + 1 });
    }
    resetForm();
    refresh();
  };
  const editHabit = (h) => {
    setEditingId(h.id);
    setForm({ name: h.name, description: h.description || "", score: h.score, color: h.color });
  };
  const deleteHabit = async (id) => {
    await base44.entities.Habit.delete(id).catch(() => {
    });
    if (editingId === id) resetForm();
    refresh();
  };
  const toggleActive = async (h) => {
    await base44.entities.Habit.update(h.id, { active: !h.active });
    refresh();
  };
  const handleAISuggest = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    setAiError(null);
    try {
      const res = await base44.integrations.Core.InvokeLLM({
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
      setAiError("Erro ao gerar sugestões. Tenta novamente.");
    }
    setAiLoading(false);
  };
  const adoptAISuggestion = async (habit) => {
    const maxOrder = Math.max(...habits.map((h) => h.order || 0), 0);
    await base44.entities.Habit.create({
      name: habit.name,
      description: habit.description || "",
      score: habit.score || 10,
      color: habit.color || "blue",
      order: maxOrder + 1,
      active: true
    });
    refresh();
  };
  const handlePointerStart = useCallback((x, y) => {
    touchStart.current = { x, y };
    dragOffset.current = { x: 0, y: 0 };
    setDragStyle({});
  }, []);
  const handlePointerMove = useCallback((x, y) => {
    dragOffset.current = { x: x - touchStart.current.x, y: y - touchStart.current.y };
    setDragStyle({ transform: `translate(${dragOffset.current.x}px, ${dragOffset.current.y}px)`, transition: "none" });
  }, []);
  const handlePointerEnd = useCallback((x, y) => {
    setDragStyle({ transform: "translate(0, 0)", transition: "transform 0.3s ease-out" });
    if (x - touchStart.current.x > 60) navigate("/habits");
  }, [navigate]);
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      "data-source-location": "pages/HabitsManage:138:4",
      "data-dynamic-content": "true",
      className: "min-h-screen bg-cream flex flex-col select-none",
      onTouchStart: (e) => handlePointerStart(e.touches[0].clientX, e.touches[0].clientY),
      onTouchMove: (e) => handlePointerMove(e.touches[0].clientX, e.touches[0].clientY),
      onTouchEnd: (e) => handlePointerEnd(e.changedTouches[0]?.clientX || touchStart.current.x, e.changedTouches[0]?.clientY || touchStart.current.y),
      onMouseDown: (e) => handlePointerStart(e.clientX, e.clientY),
      onMouseMove: (e) => {
        if (e.buttons === 1) handlePointerMove(e.clientX, e.clientY);
      },
      onMouseUp: (e) => handlePointerEnd(e.clientX, e.clientY),
      children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsManage:147:6", "data-dynamic-content": "true", style: dragStyle, className: "flex-1 flex flex-col", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsManage:149:8", "data-dynamic-content": "true", className: "bg-white border-b border-border px-4 py-4 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/HabitsManage:150:10", "data-dynamic-content": "true", onClick: () => navigate("/habits"), className: "w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all", children: /* @__PURE__ */ jsxDEV(ArrowLeft, { "data-source-location": "pages/HabitsManage:151:12", "data-dynamic-content": "false", className: "w-5 h-5" }, void 0, false, {
              fileName: "/app/src/pages/HabitsManage.jsx",
              lineNumber: 170,
              columnNumber: 13
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/HabitsManage.jsx",
              lineNumber: 169,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsManage:153:10", "data-dynamic-content": "false", className: "flex-1", children: [
              /* @__PURE__ */ jsxDEV("h1", { "data-source-location": "pages/HabitsManage:154:12", "data-dynamic-content": "false", className: "text-xl font-bold text-foreground", children: "Gerir Hábitos" }, void 0, false, {
                fileName: "/app/src/pages/HabitsManage.jsx",
                lineNumber: 173,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/HabitsManage:155:12", "data-dynamic-content": "false", className: "text-[10px] text-muted-foreground flex items-center gap-1", children: [
                "Swipe direita ",
                /* @__PURE__ */ jsxDEV(ArrowRight, { "data-source-location": "pages/HabitsManage:155:99", "data-dynamic-content": "false", className: "w-3 h-3" }, void 0, false, {
                  fileName: "/app/src/pages/HabitsManage.jsx",
                  lineNumber: 174,
                  columnNumber: 178
                }, this),
                " voltar"
              ] }, void 0, true, {
                fileName: "/app/src/pages/HabitsManage.jsx",
                lineNumber: 174,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/HabitsManage.jsx",
              lineNumber: 172,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/HabitsManage:157:10", "data-dynamic-content": "true", onClick: () => setShowAI(true), className: "px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all", children: [
              /* @__PURE__ */ jsxDEV(Bot, { "data-source-location": "pages/HabitsManage:158:12", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/src/pages/HabitsManage.jsx",
                lineNumber: 177,
                columnNumber: 13
              }, this),
              " IA"
            ] }, void 0, true, {
              fileName: "/app/src/pages/HabitsManage.jsx",
              lineNumber: 176,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/HabitsManage.jsx",
            lineNumber: 168,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsManage:163:8", "data-dynamic-content": "true", className: "p-4", children: /* @__PURE__ */ jsxDEV(
            motion.div,
            {
              "data-source-location": "pages/HabitsManage:164:10",
              "data-dynamic-content": "true",
              layout: true,
              className: "bg-white rounded-3xl border border-border shadow-sm overflow-hidden",
              children: [
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsManage:169:12", "data-dynamic-content": "true", className: "px-5 pt-5 pb-3 border-b border-border/50 flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxDEV(
                    "div",
                    {
                      "data-source-location": "pages/HabitsManage:170:14",
                      "data-dynamic-content": "true",
                      className: "w-9 h-9 rounded-2xl flex items-center justify-center",
                      style: { backgroundColor: `${PRESET_COLORS.find((c) => c.key === form.color)?.hex || "#E87A5A"}20` },
                      children: /* @__PURE__ */ jsxDEV(Plus, { "data-source-location": "pages/HabitsManage:172:16", "data-dynamic-content": "true", className: "w-5 h-5", style: { color: PRESET_COLORS.find((c) => c.key === form.color)?.hex || "#E87A5A" } }, void 0, false, {
                        fileName: "/app/src/pages/HabitsManage.jsx",
                        lineNumber: 191,
                        columnNumber: 17
                      }, this)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/src/pages/HabitsManage.jsx",
                      lineNumber: 189,
                      columnNumber: 15
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV("h2", { "data-source-location": "pages/HabitsManage:174:14", "data-dynamic-content": "true", className: "text-sm font-bold text-foreground", children: editingId ? "Editar hábito" : "Novo hábito" }, void 0, false, {
                    fileName: "/app/src/pages/HabitsManage.jsx",
                    lineNumber: 193,
                    columnNumber: 15
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/HabitsManage.jsx",
                  lineNumber: 188,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsManage:177:12", "data-dynamic-content": "true", className: "p-5 space-y-4", children: [
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsManage:179:14", "data-dynamic-content": "true", children: [
                    /* @__PURE__ */ jsxDEV("label", { "data-source-location": "pages/HabitsManage:180:16", "data-dynamic-content": "false", className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wide", children: "Nome" }, void 0, false, {
                      fileName: "/app/src/pages/HabitsManage.jsx",
                      lineNumber: 199,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV(
                      "input",
                      {
                        "data-source-location": "pages/HabitsManage:181:16",
                        "data-dynamic-content": "true",
                        value: form.name,
                        onChange: (e) => setForm({ ...form, name: e.target.value }),
                        placeholder: "Ex: Meditar 10 minutos",
                        className: "mt-1.5 w-full px-4 py-3 rounded-2xl bg-secondary/50 border border-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground/50 outline-none focus:bg-white focus:border-[#E87A5A]/40 transition-all"
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/src/pages/HabitsManage.jsx",
                        lineNumber: 200,
                        columnNumber: 17
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/HabitsManage.jsx",
                    lineNumber: 198,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsManage:188:14", "data-dynamic-content": "true", children: [
                    /* @__PURE__ */ jsxDEV("label", { "data-source-location": "pages/HabitsManage:189:16", "data-dynamic-content": "false", className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wide", children: [
                      "Descrição ",
                      /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/HabitsManage:189:117", "data-dynamic-content": "false", className: "normal-case font-normal", children: "(opcional)" }, void 0, false, {
                        fileName: "/app/src/pages/HabitsManage.jsx",
                        lineNumber: 208,
                        columnNumber: 196
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/src/pages/HabitsManage.jsx",
                      lineNumber: 208,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV(
                      "input",
                      {
                        "data-source-location": "pages/HabitsManage:190:16",
                        "data-dynamic-content": "true",
                        value: form.description,
                        onChange: (e) => setForm({ ...form, description: e.target.value }),
                        placeholder: "Adiciona uma nota...",
                        className: "mt-1.5 w-full px-4 py-3 rounded-2xl bg-secondary/50 border border-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:bg-white focus:border-[#E87A5A]/40 transition-all"
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/src/pages/HabitsManage.jsx",
                        lineNumber: 209,
                        columnNumber: 17
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/HabitsManage.jsx",
                    lineNumber: 207,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsManage:197:14", "data-dynamic-content": "true", className: "flex gap-4 items-start", children: [
                    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsManage:199:16", "data-dynamic-content": "true", className: "flex-1", children: [
                      /* @__PURE__ */ jsxDEV("label", { "data-source-location": "pages/HabitsManage:200:18", "data-dynamic-content": "false", className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wide", children: "Pontuação" }, void 0, false, {
                        fileName: "/app/src/pages/HabitsManage.jsx",
                        lineNumber: 219,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsManage:201:18", "data-dynamic-content": "true", className: "mt-1.5 bg-secondary/50 rounded-2xl px-4 py-3 flex items-center gap-3", children: [
                        /* @__PURE__ */ jsxDEV(
                          "input",
                          {
                            "data-source-location": "pages/HabitsManage:202:20",
                            "data-dynamic-content": "true",
                            type: "range",
                            min: 1,
                            max: 50,
                            value: form.score,
                            onChange: (e) => setForm({ ...form, score: Number(e.target.value) }),
                            className: "flex-1 h-1.5 rounded-full",
                            style: { accentColor: PRESET_COLORS.find((c) => c.key === form.color)?.hex || "#E87A5A" }
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/src/pages/HabitsManage.jsx",
                            lineNumber: 221,
                            columnNumber: 21
                          },
                          this
                        ),
                        /* @__PURE__ */ jsxDEV("span", { "data-source-location": "pages/HabitsManage:206:20", "data-dynamic-content": "true", className: "text-lg font-black min-w-[2rem] text-right", style: { color: PRESET_COLORS.find((c) => c.key === form.color)?.hex || "#E87A5A" }, "data-collection-item-field": "score", "data-collection-item-id": form?.id || form?._id, children: form.score }, void 0, false, {
                          fileName: "/app/src/pages/HabitsManage.jsx",
                          lineNumber: 225,
                          columnNumber: 21
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/src/pages/HabitsManage.jsx",
                        lineNumber: 220,
                        columnNumber: 19
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/src/pages/HabitsManage.jsx",
                      lineNumber: 218,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsManage:213:16", "data-dynamic-content": "true", className: "relative", children: [
                      /* @__PURE__ */ jsxDEV("label", { "data-source-location": "pages/HabitsManage:214:18", "data-dynamic-content": "false", className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wide", children: "Cor" }, void 0, false, {
                        fileName: "/app/src/pages/HabitsManage.jsx",
                        lineNumber: 233,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ jsxDEV(
                        "button",
                        {
                          "data-source-location": "pages/HabitsManage:215:18",
                          "data-dynamic-content": "true",
                          onClick: () => setShowColorPicker(!showColorPicker),
                          className: "mt-1.5 w-[52px] h-[52px] rounded-2xl border-4 border-white shadow-md transition-all hover:scale-105 active:scale-95",
                          style: { backgroundColor: PRESET_COLORS.find((c) => c.key === form.color)?.hex || form.color }
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/src/pages/HabitsManage.jsx",
                          lineNumber: 234,
                          columnNumber: 19
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV(AnimatePresence, { "data-source-location": "pages/HabitsManage:220:18", "data-dynamic-content": "true", children: showColorPicker && /* @__PURE__ */ jsxDEV(
                        motion.div,
                        {
                          "data-source-location": "pages/HabitsManage:222:22",
                          "data-dynamic-content": "true",
                          initial: { opacity: 0, scale: 0.9, y: 4 },
                          animate: { opacity: 1, scale: 1, y: 0 },
                          exit: { opacity: 0, scale: 0.9, y: 4 },
                          className: "absolute right-0 top-full mt-2 bg-white rounded-2xl border border-border shadow-2xl p-3 z-30 grid grid-cols-4 gap-2 w-[144px]",
                          children: PRESET_COLORS.map(
                            (c, __arrIdx__) => /* @__PURE__ */ jsxDEV(
                              "button",
                              {
                                "data-source-location": "pages/HabitsManage:227:26",
                                "data-dynamic-content": "true",
                                onClick: () => {
                                  setForm({ ...form, color: c.key });
                                  setShowColorPicker(false);
                                },
                                className: `w-8 h-8 rounded-xl transition-all ${form.color === c.key ? "ring-2 ring-offset-2 scale-110 shadow-md" : "hover:scale-105"}`,
                                style: { backgroundColor: c.hex, outlineColor: c.hex },
                                title: c.label,
                                "data-arr-index": __arrIdx__,
                                "data-arr-variable-name": "PRESET_COLORS"
                              },
                              c.key,
                              false,
                              {
                                fileName: "/app/src/pages/HabitsManage.jsx",
                                lineNumber: 246,
                                columnNumber: 23
                              },
                              this
                            )
                          )
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/src/pages/HabitsManage.jsx",
                          lineNumber: 241,
                          columnNumber: 21
                        },
                        this
                      ) }, void 0, false, {
                        fileName: "/app/src/pages/HabitsManage.jsx",
                        lineNumber: 239,
                        columnNumber: 19
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/src/pages/HabitsManage.jsx",
                      lineNumber: 232,
                      columnNumber: 17
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/HabitsManage.jsx",
                    lineNumber: 216,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsManage:241:14", "data-dynamic-content": "true", className: "flex gap-2 pt-1", children: [
                    editingId && /* @__PURE__ */ jsxDEV(
                      "button",
                      {
                        "data-source-location": "pages/HabitsManage:243:18",
                        "data-dynamic-content": "true",
                        onClick: resetForm,
                        className: "flex-1 py-3 rounded-2xl bg-secondary text-muted-foreground text-sm font-semibold hover:bg-border transition-all",
                        children: "Cancelar"
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/src/pages/HabitsManage.jsx",
                        lineNumber: 262,
                        columnNumber: 17
                      },
                      this
                    ),
                    /* @__PURE__ */ jsxDEV(
                      "button",
                      {
                        "data-source-location": "pages/HabitsManage:248:16",
                        "data-dynamic-content": "true",
                        onClick: saveHabit,
                        disabled: !form.name.trim(),
                        className: "flex-1 py-3 rounded-2xl text-white text-sm font-bold shadow-lg transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 flex items-center justify-center gap-2",
                        style: { backgroundColor: PRESET_COLORS.find((c) => c.key === form.color)?.hex || "#E87A5A" },
                        children: editingId ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                          /* @__PURE__ */ jsxDEV(Save, { "data-source-location": "pages/HabitsManage:251:33", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                            fileName: "/app/src/pages/HabitsManage.jsx",
                            lineNumber: 270,
                            columnNumber: 34
                          }, this),
                          " Guardar"
                        ] }, void 0, true, {
                          fileName: "/app/src/pages/HabitsManage.jsx",
                          lineNumber: 270,
                          columnNumber: 32
                        }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                          /* @__PURE__ */ jsxDEV(Plus, { "data-source-location": "pages/HabitsManage:251:77", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                            fileName: "/app/src/pages/HabitsManage.jsx",
                            lineNumber: 270,
                            columnNumber: 156
                          }, this),
                          " Adicionar"
                        ] }, void 0, true, {
                          fileName: "/app/src/pages/HabitsManage.jsx",
                          lineNumber: 270,
                          columnNumber: 154
                        }, this)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/src/pages/HabitsManage.jsx",
                        lineNumber: 267,
                        columnNumber: 17
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/HabitsManage.jsx",
                    lineNumber: 260,
                    columnNumber: 15
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/HabitsManage.jsx",
                  lineNumber: 196,
                  columnNumber: 13
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/src/pages/HabitsManage.jsx",
              lineNumber: 183,
              columnNumber: 11
            },
            this
          ) }, void 0, false, {
            fileName: "/app/src/pages/HabitsManage.jsx",
            lineNumber: 182,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsManage:259:8", "data-dynamic-content": "true", className: "flex-1 overflow-auto px-4 pb-20", children: [
            /* @__PURE__ */ jsxDEV("h2", { "data-source-location": "pages/HabitsManage:260:10", "data-dynamic-content": "true", className: "text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2 px-1", children: [
              habits.length,
              " hábito",
              habits.length !== 1 ? "s" : ""
            ] }, void 0, true, {
              fileName: "/app/src/pages/HabitsManage.jsx",
              lineNumber: 279,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsManage:263:10", "data-dynamic-content": "true", className: "space-y-1.5", children: habits.map((h) => {
              const colorHex = PRESET_COLORS.find((c) => c.key === h.color)?.hex || h.color;
              return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsManage:267:16", "data-dynamic-content": "true", className: `bg-white rounded-xl border p-3 flex items-center gap-3 transition-all ${editingId === h.id ? "border-[#E87A5A] ring-2 ring-[#E87A5A]/20" : "border-border"}`, "data-collection-item-id": h?.id, children: [
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsManage:268:18", "data-dynamic-content": "true", className: "w-3 h-3 rounded-full flex-shrink-0", style: { backgroundColor: colorHex } }, void 0, false, {
                  fileName: "/app/src/pages/HabitsManage.jsx",
                  lineNumber: 287,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsManage:269:18", "data-dynamic-content": "true", className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/HabitsManage:270:20", "data-dynamic-content": "true", className: `text-sm ${h.active === false ? "line-through text-muted-foreground/50" : "text-foreground"}`, "data-collection-item-field": "name", "data-collection-item-id": h?.id, children: h.name }, void 0, false, {
                    fileName: "/app/src/pages/HabitsManage.jsx",
                    lineNumber: 289,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/HabitsManage:271:20", "data-dynamic-content": "true", className: "text-[10px] text-muted-foreground", "data-collection-item-field": "score", "data-collection-item-id": h?.id, children: [
                    h.score,
                    " pts"
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/HabitsManage.jsx",
                    lineNumber: 290,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/HabitsManage.jsx",
                  lineNumber: 288,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/HabitsManage:273:18", "data-dynamic-content": "true", onClick: () => editHabit(h), className: "w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-[#E87A5A] transition-all", children: /* @__PURE__ */ jsxDEV(Sparkles, { "data-source-location": "pages/HabitsManage:274:20", "data-dynamic-content": "false", className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/src/pages/HabitsManage.jsx",
                  lineNumber: 293,
                  columnNumber: 21
                }, this) }, void 0, false, {
                  fileName: "/app/src/pages/HabitsManage.jsx",
                  lineNumber: 292,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    "data-source-location": "pages/HabitsManage:276:18",
                    "data-dynamic-content": "true",
                    onClick: () => toggleActive(h),
                    className: `w-7 h-7 rounded-lg flex items-center justify-center transition-all text-[10px] font-bold ${h.active === false ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-400 hover:text-amber-500"}`,
                    children: h.active === false ? "ON" : "OFF"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/src/pages/HabitsManage.jsx",
                    lineNumber: 295,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/HabitsManage:280:18", "data-dynamic-content": "true", onClick: () => deleteHabit(h.id), className: "w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center text-rose-400 hover:text-rose-600 hover:bg-rose-100 transition-all", children: /* @__PURE__ */ jsxDEV(Trash2, { "data-source-location": "pages/HabitsManage:281:20", "data-dynamic-content": "false", className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/src/pages/HabitsManage.jsx",
                  lineNumber: 300,
                  columnNumber: 21
                }, this) }, void 0, false, {
                  fileName: "/app/src/pages/HabitsManage.jsx",
                  lineNumber: 299,
                  columnNumber: 19
                }, this)
              ] }, h.id, true, {
                fileName: "/app/src/pages/HabitsManage.jsx",
                lineNumber: 286,
                columnNumber: 17
              }, this);
            }) }, void 0, false, {
              fileName: "/app/src/pages/HabitsManage.jsx",
              lineNumber: 282,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/HabitsManage.jsx",
            lineNumber: 278,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/HabitsManage.jsx",
          lineNumber: 166,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV(AnimatePresence, { "data-source-location": "pages/HabitsManage:291:6", "data-dynamic-content": "true", children: showAI && /* @__PURE__ */ jsxDEV(
          motion.div,
          {
            "data-source-location": "pages/HabitsManage:293:10",
            "data-dynamic-content": "true",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "fixed inset-0 z-50 bg-black/30 flex items-end sm:items-center justify-center",
            onClick: () => setShowAI(false),
            children: /* @__PURE__ */ jsxDEV(
              motion.div,
              {
                "data-source-location": "pages/HabitsManage:296:12",
                "data-dynamic-content": "true",
                initial: { y: "100%" },
                animate: { y: 0 },
                exit: { y: "100%" },
                transition: { type: "spring", damping: 25 },
                className: "bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md p-5 max-h-[85vh] overflow-y-auto shadow-xl",
                onClick: (e) => e.stopPropagation(),
                children: [
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsManage:300:14", "data-dynamic-content": "false", className: "flex items-center gap-2 mb-4", children: [
                    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsManage:301:16", "data-dynamic-content": "false", className: "w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV(Bot, { "data-source-location": "pages/HabitsManage:302:18", "data-dynamic-content": "false", className: "w-5 h-5 text-white" }, void 0, false, {
                      fileName: "/app/src/pages/HabitsManage.jsx",
                      lineNumber: 321,
                      columnNumber: 19
                    }, this) }, void 0, false, {
                      fileName: "/app/src/pages/HabitsManage.jsx",
                      lineNumber: 320,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsManage:304:16", "data-dynamic-content": "false", children: [
                      /* @__PURE__ */ jsxDEV("h3", { "data-source-location": "pages/HabitsManage:305:18", "data-dynamic-content": "false", className: "font-bold text-foreground", children: "Sugestões IA" }, void 0, false, {
                        fileName: "/app/src/pages/HabitsManage.jsx",
                        lineNumber: 324,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/HabitsManage:306:18", "data-dynamic-content": "false", className: "text-[10px] text-muted-foreground", children: "Hábitos e pontuações personalizadas" }, void 0, false, {
                        fileName: "/app/src/pages/HabitsManage.jsx",
                        lineNumber: 325,
                        columnNumber: 19
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/src/pages/HabitsManage.jsx",
                      lineNumber: 323,
                      columnNumber: 17
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/HabitsManage.jsx",
                    lineNumber: 319,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsManage:310:14", "data-dynamic-content": "true", className: "flex gap-2 mb-3", children: [
                    /* @__PURE__ */ jsxDEV(
                      "input",
                      {
                        "data-source-location": "pages/HabitsManage:311:16",
                        "data-dynamic-content": "true",
                        value: aiPrompt,
                        onChange: (e) => setAiPrompt(e.target.value),
                        onKeyDown: (e) => e.key === "Enter" && handleAISuggest(),
                        placeholder: "Ex: quero dormir melhor e fazer mais exercício...",
                        className: "flex-1 px-3 py-2.5 rounded-xl border border-border text-sm outline-none focus:border-purple-400 transition-all"
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/src/pages/HabitsManage.jsx",
                        lineNumber: 330,
                        columnNumber: 17
                      },
                      this
                    ),
                    /* @__PURE__ */ jsxDEV(
                      "button",
                      {
                        "data-source-location": "pages/HabitsManage:316:16",
                        "data-dynamic-content": "true",
                        onClick: handleAISuggest,
                        disabled: aiLoading || !aiPrompt.trim(),
                        className: "px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white disabled:opacity-50 transition-all",
                        children: aiLoading ? /* @__PURE__ */ jsxDEV(Loader2, { "data-source-location": "pages/HabitsManage:318:31", "data-dynamic-content": "false", className: "w-4 h-4 animate-spin" }, void 0, false, {
                          fileName: "/app/src/pages/HabitsManage.jsx",
                          lineNumber: 337,
                          columnNumber: 32
                        }, this) : /* @__PURE__ */ jsxDEV(Send, { "data-source-location": "pages/HabitsManage:318:78", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                          fileName: "/app/src/pages/HabitsManage.jsx",
                          lineNumber: 337,
                          columnNumber: 157
                        }, this)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/src/pages/HabitsManage.jsx",
                        lineNumber: 335,
                        columnNumber: 17
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/HabitsManage.jsx",
                    lineNumber: 329,
                    columnNumber: 15
                  }, this),
                  aiError && /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/HabitsManage:322:26", "data-dynamic-content": "true", className: "text-xs text-rose-500 mb-3", "data-collection-item-field": "aiError", children: aiError }, void 0, false, {
                    fileName: "/app/src/pages/HabitsManage.jsx",
                    lineNumber: 341,
                    columnNumber: 27
                  }, this),
                  aiResponse && aiResponse.length > 0 && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsManage:325:16", "data-dynamic-content": "true", className: "space-y-2", children: [
                    /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/HabitsManage:326:18", "data-dynamic-content": "false", className: "text-xs text-muted-foreground", children: "Clique para adicionar:" }, void 0, false, {
                      fileName: "/app/src/pages/HabitsManage.jsx",
                      lineNumber: 345,
                      columnNumber: 19
                    }, this),
                    aiResponse.map((h, i) => {
                      const colorHex = PRESET_COLORS.find((c) => c.key === h.color)?.hex || "#3B82F6";
                      return /* @__PURE__ */ jsxDEV(
                        "button",
                        {
                          "data-source-location": "pages/HabitsManage:330:22",
                          "data-dynamic-content": "true",
                          onClick: () => adoptAISuggestion(h),
                          className: "w-full bg-secondary/50 rounded-xl p-3 flex items-center gap-3 text-left hover:bg-[#E87A5A]/5 hover:border-[#E87A5A]/30 border border-transparent transition-all",
                          children: [
                            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsManage:332:24", "data-dynamic-content": "true", className: "w-8 h-8 rounded-lg flex items-center justify-center text-xs", style: { backgroundColor: `${colorHex}20`, color: colorHex }, "data-collection-item-field": "score", "data-collection-item-id": h?.id || h?._id, children: h.score }, void 0, false, {
                              fileName: "/app/src/pages/HabitsManage.jsx",
                              lineNumber: 351,
                              columnNumber: 25
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/HabitsManage:333:24", "data-dynamic-content": "true", className: "flex-1 min-w-0", children: [
                              /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/HabitsManage:334:26", "data-dynamic-content": "true", className: "text-sm font-medium text-foreground", "data-collection-item-field": "name", "data-collection-item-id": h?.id || h?._id, children: h.name }, void 0, false, {
                                fileName: "/app/src/pages/HabitsManage.jsx",
                                lineNumber: 353,
                                columnNumber: 27
                              }, this),
                              /* @__PURE__ */ jsxDEV("p", { "data-source-location": "pages/HabitsManage:335:26", "data-dynamic-content": "true", className: "text-[10px] text-muted-foreground truncate", "data-collection-item-field": "description", "data-collection-item-id": h?.id || h?._id, children: h.description }, void 0, false, {
                                fileName: "/app/src/pages/HabitsManage.jsx",
                                lineNumber: 354,
                                columnNumber: 27
                              }, this)
                            ] }, void 0, true, {
                              fileName: "/app/src/pages/HabitsManage.jsx",
                              lineNumber: 352,
                              columnNumber: 25
                            }, this),
                            /* @__PURE__ */ jsxDEV(Plus, { "data-source-location": "pages/HabitsManage:337:24", "data-dynamic-content": "false", className: "w-4 h-4 text-[#E87A5A]" }, void 0, false, {
                              fileName: "/app/src/pages/HabitsManage.jsx",
                              lineNumber: 356,
                              columnNumber: 25
                            }, this)
                          ]
                        },
                        i,
                        true,
                        {
                          fileName: "/app/src/pages/HabitsManage.jsx",
                          lineNumber: 349,
                          columnNumber: 19
                        },
                        this
                      );
                    })
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/HabitsManage.jsx",
                    lineNumber: 344,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/HabitsManage:344:14", "data-dynamic-content": "true", onClick: () => setShowAI(false), className: "w-full mt-4 py-2.5 rounded-xl bg-secondary text-sm font-medium hover:bg-border transition-all", children: "Fechar" }, void 0, false, {
                    fileName: "/app/src/pages/HabitsManage.jsx",
                    lineNumber: 363,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/src/pages/HabitsManage.jsx",
                lineNumber: 315,
                columnNumber: 13
              },
              this
            )
          },
          void 0,
          false,
          {
            fileName: "/app/src/pages/HabitsManage.jsx",
            lineNumber: 312,
            columnNumber: 9
          },
          this
        ) }, void 0, false, {
          fileName: "/app/src/pages/HabitsManage.jsx",
          lineNumber: 310,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/src/pages/HabitsManage.jsx",
      lineNumber: 157,
      columnNumber: 5
    },
    this
  );
}
_s(HabitsManage, "VXvUgzB5kBPU41F0OV2rqKaj6hw=", false, function() {
  return [useNavigate];
});
_c = HabitsManage;
var _c;
$RefreshReg$(_c, "HabitsManage");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/pages/HabitsManage.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/pages/HabitsManage.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QUFLLEdBQUcsV0FBVSxpR0FBK0Ysc0JBQS9OO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBRUE7QUFBQTtBQUFBO0FBQUEsY0FsREY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBbURBO0FBQUE7QUFBQSxVQXRESjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUF1REUsS0F6REo7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQTJEQTtBQUFBO0FBQUE7QUFBQSxJQXBORjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFxTkE7QUFFSjtBQUFDZixHQTVVdUJELGNBQVk7QUFBQSxVQUNqQnZCLFdBQVc7QUFBQTtBQUFBLEtBRE51QjtBQUFZLElBQUFnRztBQUFBLGFBQUFBLElBQUEiLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVJlZiIsInVzZUNhbGxiYWNrIiwidXNlTmF2aWdhdGUiLCJtb3Rpb24iLCJBbmltYXRlUHJlc2VuY2UiLCJBcnJvd0xlZnQiLCJBcnJvd1JpZ2h0IiwiUGx1cyIsIlgiLCJTYXZlIiwiUGFsZXR0ZSIsIlNwYXJrbGVzIiwiU2VuZCIsIlRyYXNoMiIsIkJvdCIsIkxvYWRlcjIiLCJiYXNlNDQiLCJQUkVTRVRfQ09MT1JTIiwia2V5IiwiaGV4IiwibGFiZWwiLCJnZXROZXh0Q29sb3IiLCJ1c2VkQ29sb3JzIiwiYyIsImhhcyIsIkhhYml0c01hbmFnZSIsIl9zIiwibmF2aWdhdGUiLCJoYWJpdHMiLCJzZXRIYWJpdHMiLCJlZGl0aW5nSWQiLCJzZXRFZGl0aW5nSWQiLCJmb3JtIiwic2V0Rm9ybSIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsInNjb3JlIiwiY29sb3IiLCJzaG93Q29sb3JQaWNrZXIiLCJzZXRTaG93Q29sb3JQaWNrZXIiLCJzaG93QUkiLCJzZXRTaG93QUkiLCJhaVByb21wdCIsInNldEFpUHJvbXB0IiwiYWlMb2FkaW5nIiwic2V0QWlMb2FkaW5nIiwiYWlSZXNwb25zZSIsInNldEFpUmVzcG9uc2UiLCJhaUVycm9yIiwic2V0QWlFcnJvciIsInRvdWNoU3RhcnQiLCJ4IiwieSIsImRyYWdPZmZzZXQiLCJkcmFnU3R5bGUiLCJzZXREcmFnU3R5bGUiLCJyZWZyZXNoIiwiZW50aXRpZXMiLCJIYWJpdCIsImxpc3QiLCJ0aGVuIiwiY2F0Y2giLCJTZXQiLCJtYXAiLCJoIiwicmVzZXRGb3JtIiwic2F2ZUhhYml0IiwidHJpbSIsInVwZGF0ZSIsIm1heE9yZGVyIiwiTWF0aCIsIm1heCIsIm9yZGVyIiwiY3JlYXRlIiwiZWRpdEhhYml0IiwiaWQiLCJkZWxldGVIYWJpdCIsImRlbGV0ZSIsInRvZ2dsZUFjdGl2ZSIsImFjdGl2ZSIsImhhbmRsZUFJU3VnZ2VzdCIsInJlcyIsImludGVncmF0aW9ucyIsIkNvcmUiLCJJbnZva2VMTE0iLCJwcm9tcHQiLCJyZXNwb25zZV9qc29uX3NjaGVtYSIsInR5cGUiLCJwcm9wZXJ0aWVzIiwiaXRlbXMiLCJlcnIiLCJhZG9wdEFJU3VnZ2VzdGlvbiIsImhhYml0IiwiaGFuZGxlUG9pbnRlclN0YXJ0IiwiY3VycmVudCIsImhhbmRsZVBvaW50ZXJNb3ZlIiwidHJhbnNmb3JtIiwidHJhbnNpdGlvbiIsImhhbmRsZVBvaW50ZXJFbmQiLCJlIiwidG91Y2hlcyIsImNsaWVudFgiLCJjbGllbnRZIiwiY2hhbmdlZFRvdWNoZXMiLCJidXR0b25zIiwiYmFja2dyb3VuZENvbG9yIiwiZmluZCIsInRhcmdldCIsInZhbHVlIiwiTnVtYmVyIiwiYWNjZW50Q29sb3IiLCJfaWQiLCJvcGFjaXR5Iiwic2NhbGUiLCJfX2FycklkeF9fIiwib3V0bGluZUNvbG9yIiwibGVuZ3RoIiwiY29sb3JIZXgiLCJkYW1waW5nIiwic3RvcFByb3BhZ2F0aW9uIiwiaSIsIl9jIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIkhhYml0c01hbmFnZS5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlTmF2aWdhdGUgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuaW1wb3J0IHsgbW90aW9uLCBBbmltYXRlUHJlc2VuY2UgfSBmcm9tIFwiZnJhbWVyLW1vdGlvblwiO1xuaW1wb3J0IHsgQXJyb3dMZWZ0LCBBcnJvd1JpZ2h0LCBQbHVzLCBYLCBTYXZlLCBQYWxldHRlLCBTcGFya2xlcywgU2VuZCwgVHJhc2gyLCBCb3QsIExvYWRlcjIgfSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5pbXBvcnQgeyBiYXNlNDQgfSBmcm9tIFwiQC9hcGkvYmFzZTQ0Q2xpZW50XCI7XG5cbmNvbnN0IFBSRVNFVF9DT0xPUlMgPSBbXG57IGtleTogXCJibHVlXCIsIGhleDogXCIjM0I4MkY2XCIsIGxhYmVsOiBcIkF6dWxcIiB9LCB7IGtleTogXCJwdXJwbGVcIiwgaGV4OiBcIiM4QjVDRjZcIiwgbGFiZWw6IFwiUm94b1wiIH0sXG57IGtleTogXCJncmVlblwiLCBoZXg6IFwiIzEwQjk4MVwiLCBsYWJlbDogXCJWZXJkZVwiIH0sIHsga2V5OiBcImFtYmVyXCIsIGhleDogXCIjRjU5RTBCXCIsIGxhYmVsOiBcIsOCbWJhclwiIH0sXG57IGtleTogXCJyb3NlXCIsIGhleDogXCIjRjQzRjVFXCIsIGxhYmVsOiBcIlJvc2FcIiB9LCB7IGtleTogXCJ0ZWFsXCIsIGhleDogXCIjMTRCOEE2XCIsIGxhYmVsOiBcIlRlYWxcIiB9LFxueyBrZXk6IFwiaW5kaWdvXCIsIGhleDogXCIjNjM2NkYxXCIsIGxhYmVsOiBcIsONbmRpZ29cIiB9LCB7IGtleTogXCJwaW5rXCIsIGhleDogXCIjRUM0ODk5XCIsIGxhYmVsOiBcIlBpbmtcIiB9XTtcblxuXG5mdW5jdGlvbiBnZXROZXh0Q29sb3IodXNlZENvbG9ycykge1xuICBmb3IgKGNvbnN0IGMgb2YgUFJFU0VUX0NPTE9SUykge1xuICAgIGlmICghdXNlZENvbG9ycy5oYXMoYy5rZXkpKSByZXR1cm4gYy5rZXk7XG4gIH1cbiAgcmV0dXJuIFBSRVNFVF9DT0xPUlNbMF0ua2V5O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIYWJpdHNNYW5hZ2UoKSB7XG4gIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcbiAgY29uc3QgW2hhYml0cywgc2V0SGFiaXRzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW2VkaXRpbmdJZCwgc2V0RWRpdGluZ0lkXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbZm9ybSwgc2V0Rm9ybV0gPSB1c2VTdGF0ZSh7IG5hbWU6IFwiXCIsIGRlc2NyaXB0aW9uOiBcIlwiLCBzY29yZTogMTAsIGNvbG9yOiBcImJsdWVcIiB9KTtcbiAgY29uc3QgW3Nob3dDb2xvclBpY2tlciwgc2V0U2hvd0NvbG9yUGlja2VyXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dBSSwgc2V0U2hvd0FJXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2FpUHJvbXB0LCBzZXRBaVByb21wdF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2FpTG9hZGluZywgc2V0QWlMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2FpUmVzcG9uc2UsIHNldEFpUmVzcG9uc2VdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFthaUVycm9yLCBzZXRBaUVycm9yXSA9IHVzZVN0YXRlKG51bGwpO1xuXG4gIC8vIFN3aXBlXG4gIGNvbnN0IHRvdWNoU3RhcnQgPSB1c2VSZWYoeyB4OiAwLCB5OiAwIH0pO1xuICBjb25zdCBkcmFnT2Zmc2V0ID0gdXNlUmVmKHsgeDogMCwgeTogMCB9KTtcbiAgY29uc3QgW2RyYWdTdHlsZSwgc2V0RHJhZ1N0eWxlXSA9IHVzZVN0YXRlKHt9KTtcblxuICBjb25zdCByZWZyZXNoID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGJhc2U0NC5lbnRpdGllcy5IYWJpdC5saXN0KFwib3JkZXJcIiwgMTAwKS50aGVuKHNldEhhYml0cykuY2F0Y2goKCkgPT4gc2V0SGFiaXRzKFtdKSk7XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge3JlZnJlc2goKTt9LCBbcmVmcmVzaF0pO1xuXG4gIGNvbnN0IHVzZWRDb2xvcnMgPSBuZXcgU2V0KGhhYml0cy5tYXAoKGgpID0+IGguY29sb3IpKTtcblxuICBjb25zdCByZXNldEZvcm0gPSAoKSA9PiB7XG4gICAgc2V0RWRpdGluZ0lkKG51bGwpO1xuICAgIHNldEZvcm0oeyBuYW1lOiBcIlwiLCBkZXNjcmlwdGlvbjogXCJcIiwgc2NvcmU6IDEwLCBjb2xvcjogZ2V0TmV4dENvbG9yKHVzZWRDb2xvcnMpIH0pO1xuICAgIHNldFNob3dDb2xvclBpY2tlcihmYWxzZSk7XG4gIH07XG5cbiAgY29uc3Qgc2F2ZUhhYml0ID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghZm9ybS5uYW1lLnRyaW0oKSkgcmV0dXJuO1xuICAgIGlmIChlZGl0aW5nSWQpIHtcbiAgICAgIGF3YWl0IGJhc2U0NC5lbnRpdGllcy5IYWJpdC51cGRhdGUoZWRpdGluZ0lkLCBmb3JtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWF4T3JkZXIgPSBNYXRoLm1heCguLi5oYWJpdHMubWFwKChoKSA9PiBoLm9yZGVyIHx8IDApLCAwKTtcbiAgICAgIGF3YWl0IGJhc2U0NC5lbnRpdGllcy5IYWJpdC5jcmVhdGUoeyAuLi5mb3JtLCBvcmRlcjogbWF4T3JkZXIgKyAxIH0pO1xuICAgIH1cbiAgICByZXNldEZvcm0oKTtcbiAgICByZWZyZXNoKCk7XG4gIH07XG5cbiAgY29uc3QgZWRpdEhhYml0ID0gKGgpID0+IHtcbiAgICBzZXRFZGl0aW5nSWQoaC5pZCk7XG4gICAgc2V0Rm9ybSh7IG5hbWU6IGgubmFtZSwgZGVzY3JpcHRpb246IGguZGVzY3JpcHRpb24gfHwgXCJcIiwgc2NvcmU6IGguc2NvcmUsIGNvbG9yOiBoLmNvbG9yIH0pO1xuICB9O1xuXG4gIGNvbnN0IGRlbGV0ZUhhYml0ID0gYXN5bmMgKGlkKSA9PiB7XG4gICAgYXdhaXQgYmFzZTQ0LmVudGl0aWVzLkhhYml0LmRlbGV0ZShpZCkuY2F0Y2goKCkgPT4ge30pO1xuICAgIGlmIChlZGl0aW5nSWQgPT09IGlkKSByZXNldEZvcm0oKTtcbiAgICByZWZyZXNoKCk7XG4gIH07XG5cbiAgY29uc3QgdG9nZ2xlQWN0aXZlID0gYXN5bmMgKGgpID0+IHtcbiAgICBhd2FpdCBiYXNlNDQuZW50aXRpZXMuSGFiaXQudXBkYXRlKGguaWQsIHsgYWN0aXZlOiAhaC5hY3RpdmUgfSk7XG4gICAgcmVmcmVzaCgpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUFJU3VnZ2VzdCA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoIWFpUHJvbXB0LnRyaW0oKSkgcmV0dXJuO1xuICAgIHNldEFpTG9hZGluZyh0cnVlKTtcbiAgICBzZXRBaUVycm9yKG51bGwpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBiYXNlNDQuaW50ZWdyYXRpb25zLkNvcmUuSW52b2tlTExNKHtcbiAgICAgICAgcHJvbXB0OiBgU3VnZXJlIGjDoWJpdG9zIHNhdWTDoXZlaXMgYmFzZWFkb3MgbmVzdGUgY29udGV4dG86IFwiJHthaVByb21wdH1cIi4gXG5SZXRvcm5hIHVtIEpTT04gY29tIHVtIGFycmF5IFwiaGFiaXRzXCIgZGUgb2JqZXRvcyBjb206IFwibmFtZVwiIChub21lIGN1cnRvLCBlbSBwb3J0dWd1w6pzKSwgXCJkZXNjcmlwdGlvblwiIChicmV2ZSBkZXNjcmnDp8OjbywgZW0gcG9ydHVndcOqcyksIFwic2NvcmVcIiAobsO6bWVybyBlbnRyZSA1IGUgMjUsIHN1Z2VyaWRvIGNvbSBiYXNlIG5hIGRpZmljdWxkYWRlL2ltcGFjdG8gZG8gaMOhYml0byksIFwiY29sb3JcIiAoZXNjb2xoZSBlbnRyZTogYmx1ZSwgcHVycGxlLCBncmVlbiwgYW1iZXIsIHJvc2UsIHRlYWwsIGluZGlnbywgcGluaykuXG5Nw6F4aW1vIDUgaMOhYml0b3MuIFPDqiBjcmlhdGl2byBlIMO6dGlsLiBVc2EgcG9ydHVndcOqcyBkZSBQb3J0dWdhbC5gLFxuICAgICAgICByZXNwb25zZV9qc29uX3NjaGVtYToge1xuICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgaGFiaXRzOiB7XG4gICAgICAgICAgICAgIHR5cGU6IFwiYXJyYXlcIixcbiAgICAgICAgICAgICAgaXRlbXM6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICAgICAgc2NvcmU6IHsgdHlwZTogXCJudW1iZXJcIiB9LFxuICAgICAgICAgICAgICAgICAgY29sb3I6IHsgdHlwZTogXCJzdHJpbmdcIiB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHNldEFpUmVzcG9uc2UocmVzLmhhYml0cyB8fCBbXSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBzZXRBaUVycm9yKFwiRXJybyBhbyBnZXJhciBzdWdlc3TDtWVzLiBUZW50YSBub3ZhbWVudGUuXCIpO1xuICAgIH1cbiAgICBzZXRBaUxvYWRpbmcoZmFsc2UpO1xuICB9O1xuXG4gIGNvbnN0IGFkb3B0QUlTdWdnZXN0aW9uID0gYXN5bmMgKGhhYml0KSA9PiB7XG4gICAgY29uc3QgbWF4T3JkZXIgPSBNYXRoLm1heCguLi5oYWJpdHMubWFwKChoKSA9PiBoLm9yZGVyIHx8IDApLCAwKTtcbiAgICBhd2FpdCBiYXNlNDQuZW50aXRpZXMuSGFiaXQuY3JlYXRlKHtcbiAgICAgIG5hbWU6IGhhYml0Lm5hbWUsXG4gICAgICBkZXNjcmlwdGlvbjogaGFiaXQuZGVzY3JpcHRpb24gfHwgXCJcIixcbiAgICAgIHNjb3JlOiBoYWJpdC5zY29yZSB8fCAxMCxcbiAgICAgIGNvbG9yOiBoYWJpdC5jb2xvciB8fCBcImJsdWVcIixcbiAgICAgIG9yZGVyOiBtYXhPcmRlciArIDEsXG4gICAgICBhY3RpdmU6IHRydWVcbiAgICB9KTtcbiAgICByZWZyZXNoKCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUG9pbnRlclN0YXJ0ID0gdXNlQ2FsbGJhY2soKHgsIHkpID0+IHt0b3VjaFN0YXJ0LmN1cnJlbnQgPSB7IHgsIHkgfTtkcmFnT2Zmc2V0LmN1cnJlbnQgPSB7IHg6IDAsIHk6IDAgfTtzZXREcmFnU3R5bGUoe30pO30sIFtdKTtcbiAgY29uc3QgaGFuZGxlUG9pbnRlck1vdmUgPSB1c2VDYWxsYmFjaygoeCwgeSkgPT4ge1xuICAgIGRyYWdPZmZzZXQuY3VycmVudCA9IHsgeDogeCAtIHRvdWNoU3RhcnQuY3VycmVudC54LCB5OiB5IC0gdG91Y2hTdGFydC5jdXJyZW50LnkgfTtcbiAgICBzZXREcmFnU3R5bGUoeyB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoJHtkcmFnT2Zmc2V0LmN1cnJlbnQueH1weCwgJHtkcmFnT2Zmc2V0LmN1cnJlbnQueX1weClgLCB0cmFuc2l0aW9uOiBcIm5vbmVcIiB9KTtcbiAgfSwgW10pO1xuICBjb25zdCBoYW5kbGVQb2ludGVyRW5kID0gdXNlQ2FsbGJhY2soKHgsIHkpID0+IHtcbiAgICBzZXREcmFnU3R5bGUoeyB0cmFuc2Zvcm06IFwidHJhbnNsYXRlKDAsIDApXCIsIHRyYW5zaXRpb246IFwidHJhbnNmb3JtIDAuM3MgZWFzZS1vdXRcIiB9KTtcbiAgICBpZiAoeCAtIHRvdWNoU3RhcnQuY3VycmVudC54ID4gNjApIG5hdmlnYXRlKFwiL2hhYml0c1wiKTtcbiAgfSwgW25hdmlnYXRlXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjEzODo0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctY3JlYW0gZmxleCBmbGV4LWNvbCBzZWxlY3Qtbm9uZVwiXG4gICAgb25Ub3VjaFN0YXJ0PXsoZSkgPT4gaGFuZGxlUG9pbnRlclN0YXJ0KGUudG91Y2hlc1swXS5jbGllbnRYLCBlLnRvdWNoZXNbMF0uY2xpZW50WSl9XG4gICAgb25Ub3VjaE1vdmU9eyhlKSA9PiBoYW5kbGVQb2ludGVyTW92ZShlLnRvdWNoZXNbMF0uY2xpZW50WCwgZS50b3VjaGVzWzBdLmNsaWVudFkpfVxuICAgIG9uVG91Y2hFbmQ9eyhlKSA9PiBoYW5kbGVQb2ludGVyRW5kKGUuY2hhbmdlZFRvdWNoZXNbMF0/LmNsaWVudFggfHwgdG91Y2hTdGFydC5jdXJyZW50LngsIGUuY2hhbmdlZFRvdWNoZXNbMF0/LmNsaWVudFkgfHwgdG91Y2hTdGFydC5jdXJyZW50LnkpfVxuICAgIG9uTW91c2VEb3duPXsoZSkgPT4gaGFuZGxlUG9pbnRlclN0YXJ0KGUuY2xpZW50WCwgZS5jbGllbnRZKX1cbiAgICBvbk1vdXNlTW92ZT17KGUpID0+IHtpZiAoZS5idXR0b25zID09PSAxKSBoYW5kbGVQb2ludGVyTW92ZShlLmNsaWVudFgsIGUuY2xpZW50WSk7fX1cbiAgICBvbk1vdXNlVXA9eyhlKSA9PiBoYW5kbGVQb2ludGVyRW5kKGUuY2xpZW50WCwgZS5jbGllbnRZKX0+XG4gICAgICBcbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNNYW5hZ2U6MTQ3OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBzdHlsZT17ZHJhZ1N0eWxlfSBjbGFzc05hbWU9XCJmbGV4LTEgZmxleCBmbGV4LWNvbFwiPlxuICAgICAgICB7LyogSGVhZGVyICovfVxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjE0OTo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiYmctd2hpdGUgYm9yZGVyLWIgYm9yZGVyLWJvcmRlciBweC00IHB5LTQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjE1MDoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKFwiL2hhYml0c1wiKX0gY2xhc3NOYW1lPVwidy0xMCBoLTEwIHJvdW5kZWQtMnhsIGJnLXdoaXRlIGJvcmRlciBib3JkZXItYm9yZGVyIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBob3Zlcjp0ZXh0LWZvcmVncm91bmQgdHJhbnNpdGlvbi1hbGxcIj5cbiAgICAgICAgICAgIDxBcnJvd0xlZnQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNNYW5hZ2U6MTUxOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNNYW5hZ2U6MTUzOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZsZXgtMVwiPlxuICAgICAgICAgICAgPGgxIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjE1NDoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LWZvcmVncm91bmRcIj5HZXJpciBIw6FiaXRvczwvaDE+XG4gICAgICAgICAgICA8cCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c01hbmFnZToxNTU6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+U3dpcGUgZGlyZWl0YSA8QXJyb3dSaWdodCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c01hbmFnZToxNTU6OTlcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+IHZvbHRhcjwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjE1NzoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldFNob3dBSSh0cnVlKX0gY2xhc3NOYW1lPVwicHgtNCBweS0yLjUgcm91bmRlZC0yeGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLXB1cnBsZS01MDAgdG8taW5kaWdvLTUwMCB0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1zZW1pYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdy1tZCBob3ZlcjpzaGFkb3ctbGcgdHJhbnNpdGlvbi1hbGxcIj5cbiAgICAgICAgICAgIDxCb3QgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNNYW5hZ2U6MTU4OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPiBJQVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogQWRkL0VkaXQgZm9ybSAqL31cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c01hbmFnZToxNjM6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInAtNFwiPlxuICAgICAgICAgIDxtb3Rpb24uZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjE2NDoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgbGF5b3V0XG4gICAgICAgICAgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC0zeGwgYm9yZGVyIGJvcmRlci1ib3JkZXIgc2hhZG93LXNtIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7LyogRm9ybSBoZWFkZXIgKi99XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjE2OToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInB4LTUgcHQtNSBwYi0zIGJvcmRlci1iIGJvcmRlci1ib3JkZXIvNTAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c01hbmFnZToxNzA6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ3LTkgaC05IHJvdW5kZWQtMnhsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiBgJHtQUkVTRVRfQ09MT1JTLmZpbmQoKGMpID0+IGMua2V5ID09PSBmb3JtLmNvbG9yKT8uaGV4IHx8IFwiI0U4N0E1QVwifTIwYCB9fT5cbiAgICAgICAgICAgICAgICA8UGx1cyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c01hbmFnZToxNzI6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ3LTUgaC01XCIgc3R5bGU9e3sgY29sb3I6IFBSRVNFVF9DT0xPUlMuZmluZCgoYykgPT4gYy5rZXkgPT09IGZvcm0uY29sb3IpPy5oZXggfHwgXCIjRTg3QTVBXCIgfX0gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxoMiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c01hbmFnZToxNzQ6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYm9sZCB0ZXh0LWZvcmVncm91bmRcIj57ZWRpdGluZ0lkID8gXCJFZGl0YXIgaMOhYml0b1wiIDogXCJOb3ZvIGjDoWJpdG9cIn08L2gyPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNNYW5hZ2U6MTc3OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicC01IHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICB7LyogTmFtZSBpbnB1dCAqL31cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c01hbmFnZToxNzk6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNNYW5hZ2U6MTgwOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtc2VtaWJvbGQgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIHVwcGVyY2FzZSB0cmFja2luZy13aWRlXCI+Tm9tZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjE4MToxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e2Zvcm0ubmFtZX0gb25DaGFuZ2U9eyhlKSA9PiBzZXRGb3JtKHsgLi4uZm9ybSwgbmFtZTogZS50YXJnZXQudmFsdWUgfSl9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFeDogTWVkaXRhciAxMCBtaW51dG9zXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtdC0xLjUgdy1mdWxsIHB4LTQgcHktMyByb3VuZGVkLTJ4bCBiZy1zZWNvbmRhcnkvNTAgYm9yZGVyIGJvcmRlci10cmFuc3BhcmVudCB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZm9yZWdyb3VuZCBwbGFjZWhvbGRlcjp0ZXh0LW11dGVkLWZvcmVncm91bmQvNTAgb3V0bGluZS1ub25lIGZvY3VzOmJnLXdoaXRlIGZvY3VzOmJvcmRlci1bI0U4N0E1QV0vNDAgdHJhbnNpdGlvbi1hbGxcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogRGVzY3JpcHRpb24gaW5wdXQgKi99XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNNYW5hZ2U6MTg4OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjE4OToxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LXNlbWlib2xkIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZVwiPkRlc2NyacOnw6NvIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjE4OToxMTdcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwibm9ybWFsLWNhc2UgZm9udC1ub3JtYWxcIj4ob3BjaW9uYWwpPC9zcGFuPjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjE5MDoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e2Zvcm0uZGVzY3JpcHRpb259IG9uQ2hhbmdlPXsoZSkgPT4gc2V0Rm9ybSh7IC4uLmZvcm0sIGRlc2NyaXB0aW9uOiBlLnRhcmdldC52YWx1ZSB9KX1cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkFkaWNpb25hIHVtYSBub3RhLi4uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtdC0xLjUgdy1mdWxsIHB4LTQgcHktMyByb3VuZGVkLTJ4bCBiZy1zZWNvbmRhcnkvNTAgYm9yZGVyIGJvcmRlci10cmFuc3BhcmVudCB0ZXh0LXNtIHRleHQtZm9yZWdyb3VuZCBwbGFjZWhvbGRlcjp0ZXh0LW11dGVkLWZvcmVncm91bmQvNTAgb3V0bGluZS1ub25lIGZvY3VzOmJnLXdoaXRlIGZvY3VzOmJvcmRlci1bI0U4N0E1QV0vNDAgdHJhbnNpdGlvbi1hbGxcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogU2NvcmUgKyBDb2xvciByb3cgKi99XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNNYW5hZ2U6MTk3OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBnYXAtNCBpdGVtcy1zdGFydFwiPlxuICAgICAgICAgICAgICAgIHsvKiBTY29yZSAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjE5OToxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXgtMVwiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjIwMDoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LXNlbWlib2xkIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZVwiPlBvbnR1YcOnw6NvPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNNYW5hZ2U6MjAxOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwibXQtMS41IGJnLXNlY29uZGFyeS81MCByb3VuZGVkLTJ4bCBweC00IHB5LTMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjIwMjoyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHR5cGU9XCJyYW5nZVwiIG1pbj17MX0gbWF4PXs1MH0gdmFsdWU9e2Zvcm0uc2NvcmV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0Rm9ybSh7IC4uLmZvcm0sIHNjb3JlOiBOdW1iZXIoZS50YXJnZXQudmFsdWUpIH0pfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgaC0xLjUgcm91bmRlZC1mdWxsXCJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgYWNjZW50Q29sb3I6IFBSRVNFVF9DT0xPUlMuZmluZCgoYykgPT4gYy5rZXkgPT09IGZvcm0uY29sb3IpPy5oZXggfHwgXCIjRTg3QTVBXCIgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNNYW5hZ2U6MjA2OjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJsYWNrIG1pbi13LVsycmVtXSB0ZXh0LXJpZ2h0XCIgc3R5bGU9e3sgY29sb3I6IFBSRVNFVF9DT0xPUlMuZmluZCgoYykgPT4gYy5rZXkgPT09IGZvcm0uY29sb3IpPy5oZXggfHwgXCIjRTg3QTVBXCIgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJzY29yZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtmb3JtPy5pZCB8fCBmb3JtPy5faWR9PlxuICAgICAgICAgICAgICAgICAgICAgIHtmb3JtLnNjb3JlfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBDb2xvciBwaWNrZXIgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c01hbmFnZToyMTM6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjIxNDoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LXNlbWlib2xkIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZVwiPkNvcjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjIxNToxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93Q29sb3JQaWNrZXIoIXNob3dDb2xvclBpY2tlcil9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtdC0xLjUgdy1bNTJweF0gaC1bNTJweF0gcm91bmRlZC0yeGwgYm9yZGVyLTQgYm9yZGVyLXdoaXRlIHNoYWRvdy1tZCB0cmFuc2l0aW9uLWFsbCBob3ZlcjpzY2FsZS0xMDUgYWN0aXZlOnNjYWxlLTk1XCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogUFJFU0VUX0NPTE9SUy5maW5kKChjKSA9PiBjLmtleSA9PT0gZm9ybS5jb2xvcik/LmhleCB8fCBmb3JtLmNvbG9yIH19IC8+XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIDxBbmltYXRlUHJlc2VuY2UgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNNYW5hZ2U6MjIwOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgIHtzaG93Q29sb3JQaWNrZXIgJiZcbiAgICAgICAgICAgICAgICAgICAgPG1vdGlvbi5kaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNNYW5hZ2U6MjIyOjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCBzY2FsZTogMC45LCB5OiA0IH19IGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgc2NhbGU6IDEsIHk6IDAgfX0gZXhpdD17eyBvcGFjaXR5OiAwLCBzY2FsZTogMC45LCB5OiA0IH19XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHJpZ2h0LTAgdG9wLWZ1bGwgbXQtMiBiZy13aGl0ZSByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLWJvcmRlciBzaGFkb3ctMnhsIHAtMyB6LTMwIGdyaWQgZ3JpZC1jb2xzLTQgZ2FwLTIgdy1bMTQ0cHhdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB7UFJFU0VUX0NPTE9SUy5tYXAoKGMsIF9fYXJySWR4X18pID0+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c01hbmFnZToyMjc6MjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBrZXk9e2Mua2V5fVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtzZXRGb3JtKHsgLi4uZm9ybSwgY29sb3I6IGMua2V5IH0pO3NldFNob3dDb2xvclBpY2tlcihmYWxzZSk7fX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTggaC04IHJvdW5kZWQteGwgdHJhbnNpdGlvbi1hbGwgJHtmb3JtLmNvbG9yID09PSBjLmtleSA/IFwicmluZy0yIHJpbmctb2Zmc2V0LTIgc2NhbGUtMTEwIHNoYWRvdy1tZFwiIDogXCJob3ZlcjpzY2FsZS0xMDVcIn1gfVxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogYy5oZXgsIG91dGxpbmVDb2xvcjogYy5oZXggfX1cbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17Yy5sYWJlbH0gZGF0YS1hcnItaW5kZXg9e19fYXJySWR4X199IGRhdGEtYXJyLXZhcmlhYmxlLW5hbWU9XCJQUkVTRVRfQ09MT1JTXCIgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICA8L0FuaW1hdGVQcmVzZW5jZT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIEFjdGlvbnMgKi99XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNNYW5hZ2U6MjQxOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBnYXAtMiBwdC0xXCI+XG4gICAgICAgICAgICAgICAge2VkaXRpbmdJZCAmJlxuICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNNYW5hZ2U6MjQzOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17cmVzZXRGb3JtfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBweS0zIHJvdW5kZWQtMnhsIGJnLXNlY29uZGFyeSB0ZXh0LW11dGVkLWZvcmVncm91bmQgdGV4dC1zbSBmb250LXNlbWlib2xkIGhvdmVyOmJnLWJvcmRlciB0cmFuc2l0aW9uLWFsbFwiPlxuICAgICAgICAgICAgICAgICAgICBDYW5jZWxhclxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNNYW5hZ2U6MjQ4OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17c2F2ZUhhYml0fSBkaXNhYmxlZD17IWZvcm0ubmFtZS50cmltKCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIHB5LTMgcm91bmRlZC0yeGwgdGV4dC13aGl0ZSB0ZXh0LXNtIGZvbnQtYm9sZCBzaGFkb3ctbGcgdHJhbnNpdGlvbi1hbGwgaG92ZXI6b3BhY2l0eS05MCBhY3RpdmU6c2NhbGUtWzAuOThdIGRpc2FibGVkOm9wYWNpdHktNDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTJcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogUFJFU0VUX0NPTE9SUy5maW5kKChjKSA9PiBjLmtleSA9PT0gZm9ybS5jb2xvcik/LmhleCB8fCBcIiNFODdBNUFcIiB9fT5cbiAgICAgICAgICAgICAgICAgIHtlZGl0aW5nSWQgPyA8PjxTYXZlIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjI1MTozM1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz4gR3VhcmRhcjwvPiA6IDw+PFBsdXMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNNYW5hZ2U6MjUxOjc3XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPiBBZGljaW9uYXI8Lz59XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogSGFiaXQgbGlzdCAqL31cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c01hbmFnZToyNTk6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXgtMSBvdmVyZmxvdy1hdXRvIHB4LTQgcGItMjBcIj5cbiAgICAgICAgICA8aDIgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNNYW5hZ2U6MjYwOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1tdXRlZC1mb3JlZ3JvdW5kIHVwcGVyY2FzZSB0cmFja2luZy13aWRlIG1iLTIgcHgtMVwiPlxuICAgICAgICAgICAge2hhYml0cy5sZW5ndGh9IGjDoWJpdG97aGFiaXRzLmxlbmd0aCAhPT0gMSA/IFwic1wiIDogXCJcIn1cbiAgICAgICAgICA8L2gyPlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNNYW5hZ2U6MjYzOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgIHtoYWJpdHMubWFwKChoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGNvbG9ySGV4ID0gUFJFU0VUX0NPTE9SUy5maW5kKChjKSA9PiBjLmtleSA9PT0gaC5jb2xvcik/LmhleCB8fCBoLmNvbG9yO1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNNYW5hZ2U6MjY3OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtoLmlkfSBjbGFzc05hbWU9e2BiZy13aGl0ZSByb3VuZGVkLXhsIGJvcmRlciBwLTMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdHJhbnNpdGlvbi1hbGwgJHtlZGl0aW5nSWQgPT09IGguaWQgPyBcImJvcmRlci1bI0U4N0E1QV0gcmluZy0yIHJpbmctWyNFODdBNUFdLzIwXCIgOiBcImJvcmRlci1ib3JkZXJcIn1gfSBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aD8uaWR9PlxuICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c01hbmFnZToyNjg6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ3LTMgaC0zIHJvdW5kZWQtZnVsbCBmbGV4LXNocmluay0wXCIgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiBjb2xvckhleCB9fSAvPlxuICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c01hbmFnZToyNjk6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4LTEgbWluLXctMFwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c01hbmFnZToyNzA6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9e2B0ZXh0LXNtICR7aC5hY3RpdmUgPT09IGZhbHNlID8gXCJsaW5lLXRocm91Z2ggdGV4dC1tdXRlZC1mb3JlZ3JvdW5kLzUwXCIgOiBcInRleHQtZm9yZWdyb3VuZFwifWB9IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibmFtZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtoPy5pZH0+e2gubmFtZX08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjI3MToyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwic2NvcmVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aD8uaWR9PntoLnNjb3JlfSBwdHM8L3A+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNNYW5hZ2U6MjczOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gZWRpdEhhYml0KGgpfSBjbGFzc05hbWU9XCJ3LTcgaC03IHJvdW5kZWQtbGcgYmctc2Vjb25kYXJ5IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBob3Zlcjp0ZXh0LVsjRTg3QTVBXSB0cmFuc2l0aW9uLWFsbFwiPlxuICAgICAgICAgICAgICAgICAgICA8U3BhcmtsZXMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNNYW5hZ2U6Mjc0OjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c01hbmFnZToyNzY6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiB0b2dnbGVBY3RpdmUoaCl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTcgaC03IHJvdW5kZWQtbGcgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdHJhbnNpdGlvbi1hbGwgdGV4dC1bMTBweF0gZm9udC1ib2xkICR7aC5hY3RpdmUgPT09IGZhbHNlID8gXCJiZy1hbWJlci0xMDAgdGV4dC1hbWJlci02MDBcIiA6IFwiYmctc2xhdGUtMTAwIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtYW1iZXItNTAwXCJ9YH0+XG4gICAgICAgICAgICAgICAgICAgIHtoLmFjdGl2ZSA9PT0gZmFsc2UgPyBcIk9OXCIgOiBcIk9GRlwifVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjI4MDoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IGRlbGV0ZUhhYml0KGguaWQpfSBjbGFzc05hbWU9XCJ3LTcgaC03IHJvdW5kZWQtbGcgYmctcm9zZS01MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LXJvc2UtNDAwIGhvdmVyOnRleHQtcm9zZS02MDAgaG92ZXI6Ymctcm9zZS0xMDAgdHJhbnNpdGlvbi1hbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgPFRyYXNoMiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c01hbmFnZToyODE6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+KTtcblxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBBSSBDaGF0IHBvcHVwICovfVxuICAgICAgPEFuaW1hdGVQcmVzZW5jZSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c01hbmFnZToyOTE6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiPlxuICAgICAgICB7c2hvd0FJICYmXG4gICAgICAgIDxtb3Rpb24uZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjI5MzoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGluaXRpYWw9e3sgb3BhY2l0eTogMCB9fSBhbmltYXRlPXt7IG9wYWNpdHk6IDEgfX0gZXhpdD17eyBvcGFjaXR5OiAwIH19XG4gICAgICAgIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei01MCBiZy1ibGFjay8zMCBmbGV4IGl0ZW1zLWVuZCBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIlxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93QUkoZmFsc2UpfT5cbiAgICAgICAgICAgIDxtb3Rpb24uZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjI5NjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGluaXRpYWw9e3sgeTogXCIxMDAlXCIgfX0gYW5pbWF0ZT17eyB5OiAwIH19IGV4aXQ9e3sgeTogXCIxMDAlXCIgfX1cbiAgICAgICAgICB0cmFuc2l0aW9uPXt7IHR5cGU6IFwic3ByaW5nXCIsIGRhbXBpbmc6IDI1IH19XG4gICAgICAgICAgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC10LTJ4bCBzbTpyb3VuZGVkLTJ4bCB3LWZ1bGwgc206bWF4LXctbWQgcC01IG1heC1oLVs4NXZoXSBvdmVyZmxvdy15LWF1dG8gc2hhZG93LXhsXCJcbiAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKX0+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNNYW5hZ2U6MzAwOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIG1iLTRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjMwMToxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tcHVycGxlLTUwMCB0by1pbmRpZ28tNTAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICA8Qm90IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjMwMjoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtd2hpdGVcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNNYW5hZ2U6MzA0OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiPlxuICAgICAgICAgICAgICAgICAgPGgzIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjMwNToxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1mb3JlZ3JvdW5kXCI+U3VnZXN0w7VlcyBJQTwvaDM+XG4gICAgICAgICAgICAgICAgICA8cCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c01hbmFnZTozMDY6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCI+SMOhYml0b3MgZSBwb250dWHDp8O1ZXMgcGVyc29uYWxpemFkYXM8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNNYW5hZ2U6MzEwOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBnYXAtMiBtYi0zXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjMxMToxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICAgIHZhbHVlPXthaVByb21wdH0gb25DaGFuZ2U9eyhlKSA9PiBzZXRBaVByb21wdChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgIG9uS2V5RG93bj17KGUpID0+IGUua2V5ID09PSBcIkVudGVyXCIgJiYgaGFuZGxlQUlTdWdnZXN0KCl9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRXg6IHF1ZXJvIGRvcm1pciBtZWxob3IgZSBmYXplciBtYWlzIGV4ZXJjw61jaW8uLi5cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcHgtMyBweS0yLjUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLWJvcmRlciB0ZXh0LXNtIG91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHVycGxlLTQwMCB0cmFuc2l0aW9uLWFsbFwiIC8+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c01hbmFnZTozMTY6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXtoYW5kbGVBSVN1Z2dlc3R9IGRpc2FibGVkPXthaUxvYWRpbmcgfHwgIWFpUHJvbXB0LnRyaW0oKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yLjUgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tcHVycGxlLTUwMCB0by1pbmRpZ28tNTAwIHRleHQtd2hpdGUgZGlzYWJsZWQ6b3BhY2l0eS01MCB0cmFuc2l0aW9uLWFsbFwiPlxuICAgICAgICAgICAgICAgICAge2FpTG9hZGluZyA/IDxMb2FkZXIyIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjMxODozMVwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTQgaC00IGFuaW1hdGUtc3BpblwiIC8+IDogPFNlbmQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNNYW5hZ2U6MzE4Ojc4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPn1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAge2FpRXJyb3IgJiYgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNNYW5hZ2U6MzIyOjI2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXJvc2UtNTAwIG1iLTNcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImFpRXJyb3JcIj57YWlFcnJvcn08L3A+fVxuXG4gICAgICAgICAgICAgIHthaVJlc3BvbnNlICYmIGFpUmVzcG9uc2UubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c01hbmFnZTozMjU6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjMyNjoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiPkNsaXF1ZSBwYXJhIGFkaWNpb25hcjo8L3A+XG4gICAgICAgICAgICAgICAgICB7YWlSZXNwb25zZS5tYXAoKGgsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvckhleCA9IFBSRVNFVF9DT0xPUlMuZmluZCgoYykgPT4gYy5rZXkgPT09IGguY29sb3IpPy5oZXggfHwgXCIjM0I4MkY2XCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9IYWJpdHNNYW5hZ2U6MzMwOjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtpfSBvbkNsaWNrPXsoKSA9PiBhZG9wdEFJU3VnZ2VzdGlvbihoKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zZWNvbmRhcnkvNTAgcm91bmRlZC14bCBwLTMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdGV4dC1sZWZ0IGhvdmVyOmJnLVsjRTg3QTVBXS81IGhvdmVyOmJvcmRlci1bI0U4N0E1QV0vMzAgYm9yZGVyIGJvcmRlci10cmFuc3BhcmVudCB0cmFuc2l0aW9uLWFsbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c01hbmFnZTozMzI6MjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ3LTggaC04IHJvdW5kZWQtbGcgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC14c1wiIHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogYCR7Y29sb3JIZXh9MjBgLCBjb2xvcjogY29sb3JIZXggfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJzY29yZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtoPy5pZCB8fCBoPy5faWR9PntoLnNjb3JlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c01hbmFnZTozMzM6MjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4LTEgbWluLXctMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c01hbmFnZTozMzQ6MjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZm9yZWdyb3VuZFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibmFtZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtoPy5pZCB8fCBoPy5faWR9PntoLm5hbWV9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c01hbmFnZTozMzU6MjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LW11dGVkLWZvcmVncm91bmQgdHJ1bmNhdGVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImRlc2NyaXB0aW9uXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2g/LmlkIHx8IGg/Ll9pZH0+e2guZGVzY3JpcHRpb259PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UGx1cyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0hhYml0c01hbmFnZTozMzc6MjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LVsjRTg3QTVBXVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+KTtcblxuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvSGFiaXRzTWFuYWdlOjM0NDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldFNob3dBSShmYWxzZSl9IGNsYXNzTmFtZT1cInctZnVsbCBtdC00IHB5LTIuNSByb3VuZGVkLXhsIGJnLXNlY29uZGFyeSB0ZXh0LXNtIGZvbnQtbWVkaXVtIGhvdmVyOmJnLWJvcmRlciB0cmFuc2l0aW9uLWFsbFwiPlxuICAgICAgICAgICAgICAgIEZlY2hhclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgIH1cbiAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxuICAgIDwvZGl2Pik7XG5cbn0iXSwiZmlsZSI6Ii9hcHAvc3JjL3BhZ2VzL0hhYml0c01hbmFnZS5qc3gifQ==