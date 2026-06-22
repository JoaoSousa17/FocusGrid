import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/TagPicker.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fc940917"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/components/TagPicker.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=fc940917"; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"];
import { motion, AnimatePresence } from "/node_modules/.vite/deps/framer-motion.js?v=fc940917";
import { X, Plus, Check } from "/node_modules/.vite/deps/lucide-react.js?v=aefa7968";
import { base44 } from "/src/api/base44Client.js";
const PRESET_COLORS = [
  { key: "blue", hex: "#3B82F6", name: "Azul" },
  { key: "purple", hex: "#8B5CF6", name: "Roxo" },
  { key: "green", hex: "#10B981", name: "Verde" },
  { key: "amber", hex: "#F59E0B", name: "Âmbar" },
  { key: "rose", hex: "#F43F5E", name: "Rosa" },
  { key: "teal", hex: "#14B8A6", name: "Teal" },
  { key: "indigo", hex: "#6366F1", name: "Índigo" },
  { key: "pink", hex: "#EC4899", name: "Pink" }
];
const TAG_COLORS_MAP = {
  blue: "bg-blue-100 text-blue-700",
  purple: "bg-purple-100 text-purple-700",
  green: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  rose: "bg-rose-100 text-rose-600",
  teal: "bg-teal-100 text-teal-700",
  indigo: "bg-indigo-100 text-indigo-700",
  pink: "bg-pink-100 text-pink-700"
};
export default function TagPicker({ open, onClose, selectedTag, onSelect, multiSelect = false, selectedTags = [], onMultiSelect }) {
  _s();
  const [tags, setTags] = useState([]);
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState("blue");
  const [newHex, setNewHex] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  useEffect(() => {
    if (open) base44.entities.Tag.list().then(setTags).catch(() => setTags([]));
  }, [open]);
  const createTag = async () => {
    if (!newName.trim()) return;
    let color = newColor;
    if (newHex.trim() && /^#[0-9A-Fa-f]{6}$/.test(newHex.trim())) {
      color = newHex.trim();
    }
    const created = await base44.entities.Tag.create({ name: newName.trim(), color });
    setTags((prev) => [...prev, created]);
    setNewName("");
    setNewHex("");
    setShowCreate(false);
    if (multiSelect && onMultiSelect) {
      const updated = [...selectedTags.filter((t) => t.id !== created.id), { id: created.id, name: created.name, color: created.color }];
      onMultiSelect(updated);
    } else {
      onSelect(created);
      onClose();
    }
  };
  const toggleMultiTag = (tag) => {
    if (!onMultiSelect) return;
    const exists = selectedTags.find((t) => t.id === tag.id);
    if (exists) {
      onMultiSelect(selectedTags.filter((t) => t.id !== tag.id));
    } else {
      if (selectedTags.length >= 3) return;
      onMultiSelect([...selectedTags, { id: tag.id, name: tag.name, color: tag.color }]);
    }
  };
  const dotBg = (colorKey) => {
    const preset = PRESET_COLORS.find((c) => c.key === colorKey);
    return preset ? preset.hex : colorKey;
  };
  return /* @__PURE__ */ jsxDEV(AnimatePresence, { "data-source-location": "components/TagPicker:70:4", "data-dynamic-content": "true", children: open && /* @__PURE__ */ jsxDEV(
    motion.div,
    {
      "data-source-location": "components/TagPicker:72:8",
      "data-dynamic-content": "true",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-end",
      onClick: onClose,
      children: /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          "data-source-location": "components/TagPicker:77:10",
          "data-dynamic-content": "true",
          initial: { y: "100%" },
          animate: { y: 0 },
          exit: { y: "100%" },
          transition: { type: "spring", damping: 25, stiffness: 200 },
          onClick: (e) => e.stopPropagation(),
          className: "w-full bg-white rounded-t-[28px] p-6 pb-10 max-h-[70vh] overflow-y-auto",
          children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/TagPicker:83:12", "data-dynamic-content": "true", className: "flex items-center justify-between mb-5", children: [
              /* @__PURE__ */ jsxDEV("h3", { "data-source-location": "components/TagPicker:84:14", "data-dynamic-content": "true", className: "text-lg font-bold text-foreground", children: multiSelect ? "Escolhe até 3 tags" : "Escolhe uma tag" }, void 0, false, {
                fileName: "/app/src/components/TagPicker.jsx",
                lineNumber: 103,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/TagPicker:87:14", "data-dynamic-content": "true", onClick: onClose, className: "w-8 h-8 rounded-full bg-secondary flex items-center justify-center", children: /* @__PURE__ */ jsxDEV(X, { "data-source-location": "components/TagPicker:88:16", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/src/components/TagPicker.jsx",
                lineNumber: 107,
                columnNumber: 17
              }, this) }, void 0, false, {
                fileName: "/app/src/components/TagPicker.jsx",
                lineNumber: 106,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/components/TagPicker.jsx",
              lineNumber: 102,
              columnNumber: 13
            }, this),
            multiSelect && selectedTags.length > 0 && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/TagPicker:93:14", "data-dynamic-content": "true", className: "flex flex-wrap gap-1.5 mb-3", children: selectedTags.map(
              (t) => /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/TagPicker:95:18", "data-dynamic-content": "true", className: `px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1 ${TAG_COLORS_MAP[t.color] || "bg-slate-100 text-slate-700"}`, "data-collection-item-id": t?.id, "data-collection-item-field": "name", children: [
                t.name,
                /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/TagPicker:97:20", "data-dynamic-content": "true", onClick: () => toggleMultiTag(t), className: "ml-0.5 opacity-60 hover:opacity-100", children: /* @__PURE__ */ jsxDEV(X, { "data-source-location": "components/TagPicker:97:110", "data-dynamic-content": "false", className: "w-3 h-3" }, void 0, false, {
                  fileName: "/app/src/components/TagPicker.jsx",
                  lineNumber: 116,
                  columnNumber: 189
                }, this) }, void 0, false, {
                  fileName: "/app/src/components/TagPicker.jsx",
                  lineNumber: 116,
                  columnNumber: 21
                }, this)
              ] }, t.id, true, {
                fileName: "/app/src/components/TagPicker.jsx",
                lineNumber: 114,
                columnNumber: 13
              }, this)
            ) }, void 0, false, {
              fileName: "/app/src/components/TagPicker.jsx",
              lineNumber: 112,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/TagPicker:103:12", "data-dynamic-content": "true", className: "flex flex-wrap gap-2.5 mb-5", children: [
              !multiSelect && /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "components/TagPicker:105:16",
                  "data-dynamic-content": "true",
                  onClick: () => {
                    onSelect(null);
                    onClose();
                  },
                  className: `px-4 py-2.5 rounded-2xl text-sm font-medium border transition-all ${!selectedTag ? "border-[#E87A5A] bg-[#E87A5A]/5 text-[#E87A5A]" : "border-border text-muted-foreground"}`,
                  children: "Nenhuma"
                },
                void 0,
                false,
                {
                  fileName: "/app/src/components/TagPicker.jsx",
                  lineNumber: 124,
                  columnNumber: 13
                },
                this
              ),
              tags.map((tag) => {
                const isSelected = multiSelect ? selectedTags.some((t) => t.id === tag.id) : selectedTag?.id === tag.id;
                return /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    "data-source-location": "components/TagPicker:119:18",
                    "data-dynamic-content": "true",
                    onClick: () => multiSelect ? toggleMultiTag(tag) : (onSelect(tag), onClose()),
                    className: `px-4 py-2.5 rounded-2xl text-sm font-medium border transition-all ${isSelected ? "border-[#E87A5A] bg-[#E87A5A]/5 text-[#E87A5A] ring-2 ring-[#E87A5A]/20" : `${TAG_COLORS_MAP[tag.color] || "bg-slate-100 text-slate-700"} border-transparent`}`,
                    "data-collection-item-id": tag?.id,
                    "data-collection-item-field": "name",
                    children: [
                      /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/TagPicker:128:20", "data-dynamic-content": "true", className: "inline-block w-2.5 h-2.5 rounded-full mr-1.5", style: { backgroundColor: dotBg(tag.color) } }, void 0, false, {
                        fileName: "/app/src/components/TagPicker.jsx",
                        lineNumber: 147,
                        columnNumber: 21
                      }, this),
                      tag.name
                    ]
                  },
                  tag.id,
                  true,
                  {
                    fileName: "/app/src/components/TagPicker.jsx",
                    lineNumber: 138,
                    columnNumber: 17
                  },
                  this
                );
              })
            ] }, void 0, true, {
              fileName: "/app/src/components/TagPicker.jsx",
              lineNumber: 122,
              columnNumber: 13
            }, this),
            !showCreate ? /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "components/TagPicker:136:14",
                "data-dynamic-content": "true",
                onClick: () => setShowCreate(true),
                className: "w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-border text-muted-foreground hover:text-[#E87A5A] hover:border-[#E87A5A]/30 transition-all text-sm font-medium",
                children: [
                  /* @__PURE__ */ jsxDEV(Plus, { "data-source-location": "components/TagPicker:140:16", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/src/components/TagPicker.jsx",
                    lineNumber: 159,
                    columnNumber: 17
                  }, this),
                  " Criar nova tag"
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/src/components/TagPicker.jsx",
                lineNumber: 155,
                columnNumber: 11
              },
              this
            ) : /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/TagPicker:143:14", "data-dynamic-content": "true", className: "space-y-3", children: [
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  "data-source-location": "components/TagPicker:144:16",
                  "data-dynamic-content": "true",
                  value: newName,
                  onChange: (e) => setNewName(e.target.value),
                  placeholder: "Nome da tag...",
                  autoFocus: true,
                  className: "w-full px-4 py-3 rounded-2xl border border-border bg-white text-sm focus:outline-none focus:border-[#E87A5A] transition-all"
                },
                void 0,
                false,
                {
                  fileName: "/app/src/components/TagPicker.jsx",
                  lineNumber: 163,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/TagPicker:149:16", "data-dynamic-content": "true", className: "flex gap-2 flex-wrap", children: PRESET_COLORS.map(
                (c, __arrIdx__) => /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    "data-source-location": "components/TagPicker:151:20",
                    "data-dynamic-content": "true",
                    onClick: () => {
                      setNewColor(c.key);
                      setNewHex("");
                    },
                    className: `w-9 h-9 rounded-full transition-all border-2 ${newColor === c.key && !newHex ? "border-[#E87A5A] scale-110 shadow-md" : "border-transparent opacity-70 hover:opacity-100"}`,
                    style: { backgroundColor: c.hex },
                    title: c.name,
                    "data-arr-index": __arrIdx__,
                    "data-arr-variable-name": "PRESET_COLORS"
                  },
                  c.key,
                  false,
                  {
                    fileName: "/app/src/components/TagPicker.jsx",
                    lineNumber: 170,
                    columnNumber: 15
                  },
                  this
                )
              ) }, void 0, false, {
                fileName: "/app/src/components/TagPicker.jsx",
                lineNumber: 168,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/TagPicker:162:16", "data-dynamic-content": "true", className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/TagPicker:163:18", "data-dynamic-content": "false", className: "text-xs text-muted-foreground", children: "ou" }, void 0, false, {
                  fileName: "/app/src/components/TagPicker.jsx",
                  lineNumber: 182,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    "data-source-location": "components/TagPicker:164:18",
                    "data-dynamic-content": "true",
                    value: newHex,
                    onChange: (e) => {
                      setNewHex(e.target.value);
                      if (e.target.value) setNewColor("");
                    },
                    placeholder: "#ff6600",
                    maxLength: 7,
                    className: "flex-1 px-3 py-2 rounded-xl border border-border text-xs font-mono focus:outline-none focus:border-[#E87A5A] transition-all"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/src/components/TagPicker.jsx",
                    lineNumber: 183,
                    columnNumber: 19
                  },
                  this
                ),
                newHex && /^#[0-9A-Fa-f]{6}$/.test(newHex) && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/TagPicker:170:20", "data-dynamic-content": "true", className: "w-9 h-9 rounded-full border-2 border-[#E87A5A] shadow-md", style: { backgroundColor: newHex } }, void 0, false, {
                  fileName: "/app/src/components/TagPicker.jsx",
                  lineNumber: 189,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/components/TagPicker.jsx",
                lineNumber: 181,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/TagPicker:173:16", "data-dynamic-content": "true", className: "flex gap-2", children: [
                /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/TagPicker:174:18", "data-dynamic-content": "true", onClick: () => setShowCreate(false), className: "flex-1 py-2.5 rounded-2xl border border-border text-sm text-muted-foreground hover:bg-secondary transition-all", children: "Cancelar" }, void 0, false, {
                  fileName: "/app/src/components/TagPicker.jsx",
                  lineNumber: 193,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/TagPicker:177:18", "data-dynamic-content": "true", onClick: createTag, disabled: !newName.trim(), className: "flex-1 py-2.5 rounded-2xl bg-[#E87A5A] text-white text-sm font-semibold hover:bg-[#D4694A] transition-all disabled:opacity-50 flex items-center justify-center gap-1", children: [
                  /* @__PURE__ */ jsxDEV(Check, { "data-source-location": "components/TagPicker:178:20", "data-dynamic-content": "false", className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/src/components/TagPicker.jsx",
                    lineNumber: 197,
                    columnNumber: 21
                  }, this),
                  " Criar"
                ] }, void 0, true, {
                  fileName: "/app/src/components/TagPicker.jsx",
                  lineNumber: 196,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/components/TagPicker.jsx",
                lineNumber: 192,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/components/TagPicker.jsx",
              lineNumber: 162,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/TagPicker:184:12", "data-dynamic-content": "true", onClick: onClose, className: "w-full mt-4 py-2.5 rounded-2xl bg-secondary text-sm font-medium text-foreground hover:bg-border transition-all", children: multiSelect ? "Concluído" : "Fechar" }, void 0, false, {
              fileName: "/app/src/components/TagPicker.jsx",
              lineNumber: 203,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/src/components/TagPicker.jsx",
          lineNumber: 96,
          columnNumber: 11
        },
        this
      )
    },
    void 0,
    false,
    {
      fileName: "/app/src/components/TagPicker.jsx",
      lineNumber: 91,
      columnNumber: 7
    },
    this
  ) }, void 0, false, {
    fileName: "/app/src/components/TagPicker.jsx",
    lineNumber: 89,
    columnNumber: 5
  }, this);
}
_s(TagPicker, "QrNWnvyOvi2ktSq2kp+4id0/Pzo=");
_c = TagPicker;
var _c;
$RefreshReg$(_c, "TagPicker");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/components/TagPicker.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/components/TagPicker.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBb0hFLEtBdEhKO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0F3SEE7QUFFSjtBQUFDRyxHQXhLdUJSLFdBQVM7QUFBQSxLQUFUQTtBQUFTLElBQUEwRDtBQUFBLGFBQUFBLElBQUEiLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIm1vdGlvbiIsIkFuaW1hdGVQcmVzZW5jZSIsIlgiLCJQbHVzIiwiQ2hlY2siLCJiYXNlNDQiLCJQUkVTRVRfQ09MT1JTIiwia2V5IiwiaGV4IiwibmFtZSIsIlRBR19DT0xPUlNfTUFQIiwiYmx1ZSIsInB1cnBsZSIsImdyZWVuIiwiYW1iZXIiLCJyb3NlIiwidGVhbCIsImluZGlnbyIsInBpbmsiLCJUYWdQaWNrZXIiLCJvcGVuIiwib25DbG9zZSIsInNlbGVjdGVkVGFnIiwib25TZWxlY3QiLCJtdWx0aVNlbGVjdCIsInNlbGVjdGVkVGFncyIsIm9uTXVsdGlTZWxlY3QiLCJfcyIsInRhZ3MiLCJzZXRUYWdzIiwibmV3TmFtZSIsInNldE5ld05hbWUiLCJuZXdDb2xvciIsInNldE5ld0NvbG9yIiwibmV3SGV4Iiwic2V0TmV3SGV4Iiwic2hvd0NyZWF0ZSIsInNldFNob3dDcmVhdGUiLCJlbnRpdGllcyIsIlRhZyIsImxpc3QiLCJ0aGVuIiwiY2F0Y2giLCJjcmVhdGVUYWciLCJ0cmltIiwiY29sb3IiLCJ0ZXN0IiwiY3JlYXRlZCIsImNyZWF0ZSIsInByZXYiLCJ1cGRhdGVkIiwiZmlsdGVyIiwidCIsImlkIiwidG9nZ2xlTXVsdGlUYWciLCJ0YWciLCJleGlzdHMiLCJmaW5kIiwibGVuZ3RoIiwiZG90QmciLCJjb2xvcktleSIsInByZXNldCIsImMiLCJvcGFjaXR5IiwieSIsInR5cGUiLCJkYW1waW5nIiwic3RpZmZuZXNzIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsIm1hcCIsImlzU2VsZWN0ZWQiLCJzb21lIiwiYmFja2dyb3VuZENvbG9yIiwidGFyZ2V0IiwidmFsdWUiLCJfX2FycklkeF9fIiwiX2MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiVGFnUGlja2VyLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBtb3Rpb24sIEFuaW1hdGVQcmVzZW5jZSB9IGZyb20gXCJmcmFtZXItbW90aW9uXCI7XG5pbXBvcnQgeyBYLCBQbHVzLCBDaGVjayB9IGZyb20gXCJsdWNpZGUtcmVhY3RcIjtcbmltcG9ydCB7IGJhc2U0NCB9IGZyb20gXCJAL2FwaS9iYXNlNDRDbGllbnRcIjtcblxuY29uc3QgUFJFU0VUX0NPTE9SUyA9IFtcbnsga2V5OiBcImJsdWVcIiwgaGV4OiBcIiMzQjgyRjZcIiwgbmFtZTogXCJBenVsXCIgfSxcbnsga2V5OiBcInB1cnBsZVwiLCBoZXg6IFwiIzhCNUNGNlwiLCBuYW1lOiBcIlJveG9cIiB9LFxueyBrZXk6IFwiZ3JlZW5cIiwgaGV4OiBcIiMxMEI5ODFcIiwgbmFtZTogXCJWZXJkZVwiIH0sXG57IGtleTogXCJhbWJlclwiLCBoZXg6IFwiI0Y1OUUwQlwiLCBuYW1lOiBcIsOCbWJhclwiIH0sXG57IGtleTogXCJyb3NlXCIsIGhleDogXCIjRjQzRjVFXCIsIG5hbWU6IFwiUm9zYVwiIH0sXG57IGtleTogXCJ0ZWFsXCIsIGhleDogXCIjMTRCOEE2XCIsIG5hbWU6IFwiVGVhbFwiIH0sXG57IGtleTogXCJpbmRpZ29cIiwgaGV4OiBcIiM2MzY2RjFcIiwgbmFtZTogXCLDjW5kaWdvXCIgfSxcbnsga2V5OiBcInBpbmtcIiwgaGV4OiBcIiNFQzQ4OTlcIiwgbmFtZTogXCJQaW5rXCIgfV07XG5cblxuY29uc3QgVEFHX0NPTE9SU19NQVAgPSB7XG4gIGJsdWU6IFwiYmctYmx1ZS0xMDAgdGV4dC1ibHVlLTcwMFwiLCBwdXJwbGU6IFwiYmctcHVycGxlLTEwMCB0ZXh0LXB1cnBsZS03MDBcIixcbiAgZ3JlZW46IFwiYmctZW1lcmFsZC0xMDAgdGV4dC1lbWVyYWxkLTcwMFwiLCBhbWJlcjogXCJiZy1hbWJlci0xMDAgdGV4dC1hbWJlci03MDBcIixcbiAgcm9zZTogXCJiZy1yb3NlLTEwMCB0ZXh0LXJvc2UtNjAwXCIsIHRlYWw6IFwiYmctdGVhbC0xMDAgdGV4dC10ZWFsLTcwMFwiLFxuICBpbmRpZ286IFwiYmctaW5kaWdvLTEwMCB0ZXh0LWluZGlnby03MDBcIiwgcGluazogXCJiZy1waW5rLTEwMCB0ZXh0LXBpbmstNzAwXCJcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFRhZ1BpY2tlcih7IG9wZW4sIG9uQ2xvc2UsIHNlbGVjdGVkVGFnLCBvblNlbGVjdCwgbXVsdGlTZWxlY3QgPSBmYWxzZSwgc2VsZWN0ZWRUYWdzID0gW10sIG9uTXVsdGlTZWxlY3QgfSkge1xuICBjb25zdCBbdGFncywgc2V0VGFnc10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtuZXdOYW1lLCBzZXROZXdOYW1lXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbmV3Q29sb3IsIHNldE5ld0NvbG9yXSA9IHVzZVN0YXRlKFwiYmx1ZVwiKTtcbiAgY29uc3QgW25ld0hleCwgc2V0TmV3SGV4XSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbc2hvd0NyZWF0ZSwgc2V0U2hvd0NyZWF0ZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAob3BlbikgYmFzZTQ0LmVudGl0aWVzLlRhZy5saXN0KCkudGhlbihzZXRUYWdzKS5jYXRjaCgoKSA9PiBzZXRUYWdzKFtdKSk7XG4gIH0sIFtvcGVuXSk7XG5cbiAgY29uc3QgY3JlYXRlVGFnID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghbmV3TmFtZS50cmltKCkpIHJldHVybjtcbiAgICBsZXQgY29sb3IgPSBuZXdDb2xvcjtcbiAgICBpZiAobmV3SGV4LnRyaW0oKSAmJiAvXiNbMC05QS1GYS1mXXs2fSQvLnRlc3QobmV3SGV4LnRyaW0oKSkpIHtcbiAgICAgIGNvbG9yID0gbmV3SGV4LnRyaW0oKTtcbiAgICB9XG4gICAgY29uc3QgY3JlYXRlZCA9IGF3YWl0IGJhc2U0NC5lbnRpdGllcy5UYWcuY3JlYXRlKHsgbmFtZTogbmV3TmFtZS50cmltKCksIGNvbG9yIH0pO1xuICAgIHNldFRhZ3MoKHByZXYpID0+IFsuLi5wcmV2LCBjcmVhdGVkXSk7XG4gICAgc2V0TmV3TmFtZShcIlwiKTtzZXROZXdIZXgoXCJcIik7c2V0U2hvd0NyZWF0ZShmYWxzZSk7XG4gICAgaWYgKG11bHRpU2VsZWN0ICYmIG9uTXVsdGlTZWxlY3QpIHtcbiAgICAgIGNvbnN0IHVwZGF0ZWQgPSBbLi4uc2VsZWN0ZWRUYWdzLmZpbHRlcigodCkgPT4gdC5pZCAhPT0gY3JlYXRlZC5pZCksIHsgaWQ6IGNyZWF0ZWQuaWQsIG5hbWU6IGNyZWF0ZWQubmFtZSwgY29sb3I6IGNyZWF0ZWQuY29sb3IgfV07XG4gICAgICBvbk11bHRpU2VsZWN0KHVwZGF0ZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvblNlbGVjdChjcmVhdGVkKTtcbiAgICAgIG9uQ2xvc2UoKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdG9nZ2xlTXVsdGlUYWcgPSAodGFnKSA9PiB7XG4gICAgaWYgKCFvbk11bHRpU2VsZWN0KSByZXR1cm47XG4gICAgY29uc3QgZXhpc3RzID0gc2VsZWN0ZWRUYWdzLmZpbmQoKHQpID0+IHQuaWQgPT09IHRhZy5pZCk7XG4gICAgaWYgKGV4aXN0cykge1xuICAgICAgb25NdWx0aVNlbGVjdChzZWxlY3RlZFRhZ3MuZmlsdGVyKCh0KSA9PiB0LmlkICE9PSB0YWcuaWQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHNlbGVjdGVkVGFncy5sZW5ndGggPj0gMykgcmV0dXJuO1xuICAgICAgb25NdWx0aVNlbGVjdChbLi4uc2VsZWN0ZWRUYWdzLCB7IGlkOiB0YWcuaWQsIG5hbWU6IHRhZy5uYW1lLCBjb2xvcjogdGFnLmNvbG9yIH1dKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZG90QmcgPSAoY29sb3JLZXkpID0+IHtcbiAgICBjb25zdCBwcmVzZXQgPSBQUkVTRVRfQ09MT1JTLmZpbmQoKGMpID0+IGMua2V5ID09PSBjb2xvcktleSk7XG4gICAgcmV0dXJuIHByZXNldCA/IHByZXNldC5oZXggOiBjb2xvcktleTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxBbmltYXRlUHJlc2VuY2UgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL1RhZ1BpY2tlcjo3MDo0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICB7b3BlbiAmJlxuICAgICAgPG1vdGlvbi5kaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL1RhZ1BpY2tlcjo3Mjo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCB9fSBhbmltYXRlPXt7IG9wYWNpdHk6IDEgfX0gZXhpdD17eyBvcGFjaXR5OiAwIH19XG4gICAgICBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIGJnLWJsYWNrLzIwIGJhY2tkcm9wLWJsdXItc20gei01MCBmbGV4IGl0ZW1zLWVuZFwiXG4gICAgICBvbkNsaWNrPXtvbkNsb3NlfT5cbiAgICAgICAgXG4gICAgICAgICAgPG1vdGlvbi5kaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL1RhZ1BpY2tlcjo3NzoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgIGluaXRpYWw9e3sgeTogXCIxMDAlXCIgfX0gYW5pbWF0ZT17eyB5OiAwIH19IGV4aXQ9e3sgeTogXCIxMDAlXCIgfX1cbiAgICAgICAgdHJhbnNpdGlvbj17eyB0eXBlOiBcInNwcmluZ1wiLCBkYW1waW5nOiAyNSwgc3RpZmZuZXNzOiAyMDAgfX1cbiAgICAgICAgb25DbGljaz17KGUpID0+IGUuc3RvcFByb3BhZ2F0aW9uKCl9XG4gICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy13aGl0ZSByb3VuZGVkLXQtWzI4cHhdIHAtNiBwYi0xMCBtYXgtaC1bNzB2aF0gb3ZlcmZsb3cteS1hdXRvXCI+XG4gICAgICAgICAgXG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9UYWdQaWNrZXI6ODM6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItNVwiPlxuICAgICAgICAgICAgICA8aDMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL1RhZ1BpY2tlcjo4NDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkIHRleHQtZm9yZWdyb3VuZFwiPlxuICAgICAgICAgICAgICAgIHttdWx0aVNlbGVjdCA/IFwiRXNjb2xoZSBhdMOpIDMgdGFnc1wiIDogXCJFc2NvbGhlIHVtYSB0YWdcIn1cbiAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvVGFnUGlja2VyOjg3OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17b25DbG9zZX0gY2xhc3NOYW1lPVwidy04IGgtOCByb3VuZGVkLWZ1bGwgYmctc2Vjb25kYXJ5IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPFggZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL1RhZ1BpY2tlcjo4ODoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAge211bHRpU2VsZWN0ICYmIHNlbGVjdGVkVGFncy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvVGFnUGlja2VyOjkzOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTEuNSBtYi0zXCI+XG4gICAgICAgICAgICAgICAge3NlbGVjdGVkVGFncy5tYXAoKHQpID0+XG4gICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvVGFnUGlja2VyOjk1OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXt0LmlkfSBjbGFzc05hbWU9e2BweC0yLjUgcHktMSByb3VuZGVkLWZ1bGwgdGV4dC1bMTFweF0gZm9udC1tZWRpdW0gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgJHtUQUdfQ09MT1JTX01BUFt0LmNvbG9yXSB8fCBcImJnLXNsYXRlLTEwMCB0ZXh0LXNsYXRlLTcwMFwifWB9IGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXt0Py5pZH0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJuYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIHt0Lm5hbWV9XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL1RhZ1BpY2tlcjo5NzoyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHRvZ2dsZU11bHRpVGFnKHQpfSBjbGFzc05hbWU9XCJtbC0wLjUgb3BhY2l0eS02MCBob3ZlcjpvcGFjaXR5LTEwMFwiPjxYIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9UYWdQaWNrZXI6OTc6MTEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9UYWdQaWNrZXI6MTAzOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTIuNSBtYi01XCI+XG4gICAgICAgICAgICAgIHshbXVsdGlTZWxlY3QgJiZcbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL1RhZ1BpY2tlcjoxMDU6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge29uU2VsZWN0KG51bGwpO29uQ2xvc2UoKTt9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS0yLjUgcm91bmRlZC0yeGwgdGV4dC1zbSBmb250LW1lZGl1bSBib3JkZXIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICFzZWxlY3RlZFRhZyA/IFwiYm9yZGVyLVsjRTg3QTVBXSBiZy1bI0U4N0E1QV0vNSB0ZXh0LVsjRTg3QTVBXVwiIDogXCJib3JkZXItYm9yZGVyIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwifWBcbiAgICAgICAgICAgIH0+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgTmVuaHVtYVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB7dGFncy5tYXAoKHRhZykgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gbXVsdGlTZWxlY3QgP1xuICAgICAgICAgICAgICBzZWxlY3RlZFRhZ3Muc29tZSgodCkgPT4gdC5pZCA9PT0gdGFnLmlkKSA6XG4gICAgICAgICAgICAgIHNlbGVjdGVkVGFnPy5pZCA9PT0gdGFnLmlkO1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL1RhZ1BpY2tlcjoxMTk6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgICAgIGtleT17dGFnLmlkfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG11bHRpU2VsZWN0ID8gdG9nZ2xlTXVsdGlUYWcodGFnKSA6IChvblNlbGVjdCh0YWcpLCBvbkNsb3NlKCkpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMi41IHJvdW5kZWQtMnhsIHRleHQtc20gZm9udC1tZWRpdW0gYm9yZGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgaXNTZWxlY3RlZCA/XG4gICAgICAgICAgICAgICAgXCJib3JkZXItWyNFODdBNUFdIGJnLVsjRTg3QTVBXS81IHRleHQtWyNFODdBNUFdIHJpbmctMiByaW5nLVsjRTg3QTVBXS8yMFwiIDpcbiAgICAgICAgICAgICAgICBgJHtUQUdfQ09MT1JTX01BUFt0YWcuY29sb3JdIHx8IFwiYmctc2xhdGUtMTAwIHRleHQtc2xhdGUtNzAwXCJ9IGJvcmRlci10cmFuc3BhcmVudGB9YFxuICAgICAgICAgICAgICAgIH0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e3RhZz8uaWR9IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibmFtZVwiPlxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9UYWdQaWNrZXI6MTI4OjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiaW5saW5lLWJsb2NrIHctMi41IGgtMi41IHJvdW5kZWQtZnVsbCBtci0xLjVcIiBzdHlsZT17eyBiYWNrZ3JvdW5kQ29sb3I6IGRvdEJnKHRhZy5jb2xvcikgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAge3RhZy5uYW1lfVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+KTtcblxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgeyFzaG93Q3JlYXRlID9cbiAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9UYWdQaWNrZXI6MTM2OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93Q3JlYXRlKHRydWUpfVxuICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBweS0zIHJvdW5kZWQtMnhsIGJvcmRlci0yIGJvcmRlci1kYXNoZWQgYm9yZGVyLWJvcmRlciB0ZXh0LW11dGVkLWZvcmVncm91bmQgaG92ZXI6dGV4dC1bI0U4N0E1QV0gaG92ZXI6Ym9yZGVyLVsjRTg3QTVBXS8zMCB0cmFuc2l0aW9uLWFsbCB0ZXh0LXNtIGZvbnQtbWVkaXVtXCI+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8UGx1cyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvVGFnUGlja2VyOjE0MDoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz4gQ3JpYXIgbm92YSB0YWdcbiAgICAgICAgICAgICAgPC9idXR0b24+IDpcblxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL1RhZ1BpY2tlcjoxNDM6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL1RhZ1BpY2tlcjoxNDQ6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgdmFsdWU9e25ld05hbWV9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3TmFtZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIk5vbWUgZGEgdGFnLi4uXCIgYXV0b0ZvY3VzXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtNCBweS0zIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItYm9yZGVyIGJnLXdoaXRlIHRleHQtc20gZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1bI0U4N0E1QV0gdHJhbnNpdGlvbi1hbGxcIiAvPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvVGFnUGlja2VyOjE0OToxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZ2FwLTIgZmxleC13cmFwXCI+XG4gICAgICAgICAgICAgICAgICB7UFJFU0VUX0NPTE9SUy5tYXAoKGMsIF9fYXJySWR4X18pID0+XG4gICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL1RhZ1BpY2tlcjoxNTE6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgICBrZXk9e2Mua2V5fVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7c2V0TmV3Q29sb3IoYy5rZXkpO3NldE5ld0hleChcIlwiKTt9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTkgaC05IHJvdW5kZWQtZnVsbCB0cmFuc2l0aW9uLWFsbCBib3JkZXItMiAke1xuICAgICAgICAgICAgICBuZXdDb2xvciA9PT0gYy5rZXkgJiYgIW5ld0hleCA/IFwiYm9yZGVyLVsjRTg3QTVBXSBzY2FsZS0xMTAgc2hhZG93LW1kXCIgOiBcImJvcmRlci10cmFuc3BhcmVudCBvcGFjaXR5LTcwIGhvdmVyOm9wYWNpdHktMTAwXCJ9YFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogYy5oZXggfX1cbiAgICAgICAgICAgICAgdGl0bGU9e2MubmFtZX0gZGF0YS1hcnItaW5kZXg9e19fYXJySWR4X199IGRhdGEtYXJyLXZhcmlhYmxlLW5hbWU9XCJQUkVTRVRfQ09MT1JTXCIgLz5cblxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL1RhZ1BpY2tlcjoxNjI6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL1RhZ1BpY2tlcjoxNjM6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj5vdTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvVGFnUGlja2VyOjE2NDoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICAgIHZhbHVlPXtuZXdIZXh9IG9uQ2hhbmdlPXsoZSkgPT4ge3NldE5ld0hleChlLnRhcmdldC52YWx1ZSk7aWYgKGUudGFyZ2V0LnZhbHVlKSBzZXROZXdDb2xvcihcIlwiKTt9fVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIiNmZjY2MDBcIiBtYXhMZW5ndGg9ezd9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBweC0zIHB5LTIgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLWJvcmRlciB0ZXh0LXhzIGZvbnQtbW9ubyBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLVsjRTg3QTVBXSB0cmFuc2l0aW9uLWFsbFwiIC8+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAge25ld0hleCAmJiAvXiNbMC05QS1GYS1mXXs2fSQvLnRlc3QobmV3SGV4KSAmJlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9UYWdQaWNrZXI6MTcwOjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidy05IGgtOSByb3VuZGVkLWZ1bGwgYm9yZGVyLTIgYm9yZGVyLVsjRTg3QTVBXSBzaGFkb3ctbWRcIiBzdHlsZT17eyBiYWNrZ3JvdW5kQ29sb3I6IG5ld0hleCB9fSAvPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvVGFnUGlja2VyOjE3MzoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL1RhZ1BpY2tlcjoxNzQ6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiBzZXRTaG93Q3JlYXRlKGZhbHNlKX0gY2xhc3NOYW1lPVwiZmxleC0xIHB5LTIuNSByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLWJvcmRlciB0ZXh0LXNtIHRleHQtbXV0ZWQtZm9yZWdyb3VuZCBob3ZlcjpiZy1zZWNvbmRhcnkgdHJhbnNpdGlvbi1hbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgQ2FuY2VsYXJcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvVGFnUGlja2VyOjE3NzoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9e2NyZWF0ZVRhZ30gZGlzYWJsZWQ9eyFuZXdOYW1lLnRyaW0oKX0gY2xhc3NOYW1lPVwiZmxleC0xIHB5LTIuNSByb3VuZGVkLTJ4bCBiZy1bI0U4N0E1QV0gdGV4dC13aGl0ZSB0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgaG92ZXI6YmctWyNENDY5NEFdIHRyYW5zaXRpb24tYWxsIGRpc2FibGVkOm9wYWNpdHktNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgPENoZWNrIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9UYWdQaWNrZXI6MTc4OjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPiBDcmlhclxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIH1cblxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvVGFnUGlja2VyOjE4NDoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9e29uQ2xvc2V9IGNsYXNzTmFtZT1cInctZnVsbCBtdC00IHB5LTIuNSByb3VuZGVkLTJ4bCBiZy1zZWNvbmRhcnkgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWZvcmVncm91bmQgaG92ZXI6YmctYm9yZGVyIHRyYW5zaXRpb24tYWxsXCI+XG4gICAgICAgICAgICAgIHttdWx0aVNlbGVjdCA/IFwiQ29uY2x1w61kb1wiIDogXCJGZWNoYXJcIn1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgfVxuICAgIDwvQW5pbWF0ZVByZXNlbmNlPik7XG5cbn0iXSwiZmlsZSI6Ii9hcHAvc3JjL2NvbXBvbmVudHMvVGFnUGlja2VyLmpzeCJ9