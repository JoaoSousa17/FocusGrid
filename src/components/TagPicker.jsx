import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Check, Trash2 } from "lucide-react";
import { Tag } from "@/api/entities";
import { useLang } from "@/context/LangContext";

const PRESET_COLORS = [
{ key: "blue", hex: "#3B82F6", name: "Azul" },
{ key: "purple", hex: "#8B5CF6", name: "Roxo" },
{ key: "green", hex: "#10B981", name: "Verde" },
{ key: "amber", hex: "#F59E0B", name: "Âmbar" },
{ key: "rose", hex: "#F43F5E", name: "Rosa" },
{ key: "teal", hex: "#14B8A6", name: "Teal" },
{ key: "indigo", hex: "#6366F1", name: "Índigo" },
{ key: "pink", hex: "#EC4899", name: "Pink" }];


const TAG_COLORS_MAP = {
  blue: "bg-blue-100 text-blue-700", purple: "bg-purple-100 text-purple-700",
  green: "bg-emerald-100 text-emerald-700", amber: "bg-amber-100 text-amber-700",
  rose: "bg-rose-100 text-rose-600", teal: "bg-teal-100 text-teal-700",
  indigo: "bg-indigo-100 text-indigo-700", pink: "bg-pink-100 text-pink-700"
};

export default function TagPicker({ open, onClose, selectedTag, onSelect, multiSelect = false, selectedTags = [], onMultiSelect }) {
  const { t } = useLang();
  const [tags, setTags] = useState([]);
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState("blue");
  const [newHex, setNewHex] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    if (open) Tag.list().then(setTags).catch(() => setTags([]));
  }, [open]);

  const deleteTag = async (tag, e) => {
    e.stopPropagation();
    if (!window.confirm(t("tags.delete_confirm", `Delete tag "${tag.name}"?`))) return;
    await Tag.delete(tag.id);
    setTags((prev) => prev.filter((t) => t.id !== tag.id));
    if (onMultiSelect) onMultiSelect(selectedTags.filter((t) => t.id !== tag.id));
    if (selectedTag?.id === tag.id && onSelect) onSelect(null);
  };

  const createTag = async () => {
    if (!newName.trim()) return;
    let color = newColor || "blue";
    const rawHex = newHex.trim();
    const hexNorm = rawHex.startsWith("#") ? rawHex : rawHex ? `#${rawHex}` : "";
    if (hexNorm && /^#[0-9A-Fa-f]{6}$/.test(hexNorm)) {
      color = hexNorm;
    }
    const created = await Tag.create({ name: newName.trim(), color });
    setTags((prev) => [...prev, created]);
    setNewName("");setNewHex("");setNewColor("blue");setShowCreate(false);
    if (onMultiSelect) {
      const updated = [...selectedTags.filter((t) => t.id !== created.id), { id: created.id, name: created.name, color: created.color }];
      onMultiSelect(updated);
      if (!multiSelect) onClose();
    } else if (onSelect) {
      onSelect(created);
      onClose();
    } else {
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

  return (
    <AnimatePresence data-source-location="components/TagPicker:70:4" data-dynamic-content="true">
      {open &&
      <motion.div data-source-location="components/TagPicker:72:8" data-dynamic-content="true"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] flex items-end"
      onClick={onClose}>
        
          <motion.div data-source-location="components/TagPicker:77:10" data-dynamic-content="true"
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full bg-white rounded-t-[28px] p-6 pb-10 max-h-[70vh] overflow-y-auto">
          
            <div data-source-location="components/TagPicker:83:12" data-dynamic-content="true" className="flex items-center justify-between mb-5">
              <h3 data-source-location="components/TagPicker:84:14" data-dynamic-content="true" className="text-lg font-bold text-foreground">
                {multiSelect ? t("tags.choose_multi") : t("tags.choose_one")}
              </h3>
              <button data-source-location="components/TagPicker:87:14" data-dynamic-content="true" onClick={onClose} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <X data-source-location="components/TagPicker:88:16" data-dynamic-content="false" className="w-4 h-4" />
              </button>
            </div>

            {multiSelect && selectedTags.length > 0 &&
          <div data-source-location="components/TagPicker:93:14" data-dynamic-content="true" className="flex flex-wrap gap-1.5 mb-3">
                {selectedTags.map((t) =>
            <span data-source-location="components/TagPicker:95:18" data-dynamic-content="true" key={t.id} className={`px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1 ${TAG_COLORS_MAP[t.color] || "bg-slate-100 text-slate-700"}`} data-collection-item-id={t?.id} data-collection-item-field="name">
                    {t.name}
                    <button data-source-location="components/TagPicker:97:20" data-dynamic-content="true" onClick={() => toggleMultiTag(t)} className="ml-0.5 opacity-60 hover:opacity-100"><X data-source-location="components/TagPicker:97:110" data-dynamic-content="false" className="w-3 h-3" /></button>
                  </span>
            )}
              </div>
          }

            <div data-source-location="components/TagPicker:103:12" data-dynamic-content="true" className="flex flex-wrap gap-2.5 mb-5">
              {!multiSelect &&
            <button data-source-location="components/TagPicker:105:16" data-dynamic-content="true"
            onClick={() => {onSelect(null);onClose();}}
            className={`px-4 py-2.5 rounded-2xl text-sm font-medium border transition-all ${
            !selectedTag ? "border-[#E87A5A] bg-[#E87A5A]/5 text-[#E87A5A]" : "border-border text-muted-foreground"}`
            }>
              
                  {t("tags.none_opt")}
                </button>
            }
              {tags.map((tag) => {
              const isSelected = multiSelect ?
              selectedTags.some((t) => t.id === tag.id) :
              selectedTag?.id === tag.id;
              return (
                <div key={tag.id} className="relative group flex items-center">
                  <button data-source-location="components/TagPicker:119:18" data-dynamic-content="true"
                onClick={() => multiSelect ? toggleMultiTag(tag) : (onSelect(tag), onClose())}
                className={`pl-3 pr-7 py-2.5 rounded-2xl text-sm font-medium border transition-all ${
                isSelected ?
                "border-[#E87A5A] bg-[#E87A5A]/5 text-[#E87A5A] ring-2 ring-[#E87A5A]/20" :
                `${TAG_COLORS_MAP[tag.color] || "bg-slate-100 text-slate-700"} border-transparent`}`
                } data-collection-item-id={tag?.id} data-collection-item-field="name">

                    <span data-source-location="components/TagPicker:128:20" data-dynamic-content="true" className="inline-block w-2.5 h-2.5 rounded-full mr-1.5" style={{ backgroundColor: dotBg(tag.color) }} />
                    {tag.name}
                  </button>
                  <button onClick={(e) => deleteTag(tag, e)} className="absolute right-1.5 w-5 h-5 rounded-full bg-rose-100 text-rose-500 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all hover:bg-rose-200">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>);

            })}
            </div>

            {!showCreate ?
          <button data-source-location="components/TagPicker:136:14" data-dynamic-content="true"
          onClick={() => setShowCreate(true)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-border text-muted-foreground hover:text-[#E87A5A] hover:border-[#E87A5A]/30 transition-all text-sm font-medium">
            
                <Plus data-source-location="components/TagPicker:140:16" data-dynamic-content="false" className="w-4 h-4" /> {t("tags.create")}
              </button> :

          <div data-source-location="components/TagPicker:143:14" data-dynamic-content="true" className="space-y-3">
                <input data-source-location="components/TagPicker:144:16" data-dynamic-content="true"
            value={newName} onChange={(e) => setNewName(e.target.value)}
            placeholder={t("tags.name_placeholder")} autoFocus
            className="w-full px-4 py-3 rounded-2xl border border-border bg-white text-sm focus:outline-none focus:border-[#E87A5A] transition-all" />
            
                <div data-source-location="components/TagPicker:149:16" data-dynamic-content="true" className="flex gap-2 flex-wrap">
                  {PRESET_COLORS.map((c, __arrIdx__) =>
              <button data-source-location="components/TagPicker:151:20" data-dynamic-content="true"
              key={c.key}
              onClick={() => {setNewColor(c.key);setNewHex("");}}
              className={`w-9 h-9 rounded-full transition-all border-2 ${
              newColor === c.key && !newHex ? "border-[#E87A5A] scale-110 shadow-md" : "border-transparent opacity-70 hover:opacity-100"}`
              }
              style={{ backgroundColor: c.hex }}
              title={c.name} data-arr-index={__arrIdx__} data-arr-variable-name="PRESET_COLORS" />

              )}
                </div>
                <div data-source-location="components/TagPicker:162:16" data-dynamic-content="true" className="flex items-center gap-2">
                  <span data-source-location="components/TagPicker:163:18" data-dynamic-content="false" className="text-xs text-muted-foreground">{t("tags.or")}</span>
                  <input data-source-location="components/TagPicker:164:18" data-dynamic-content="true"
              value={newHex} onChange={(e) => { const v = e.target.value; const normalized = v && !v.startsWith("#") && v.length <= 6 ? `#${v}` : v; setNewHex(normalized); if (normalized) setNewColor(""); }}
              placeholder={t("tags.hex_placeholder")} maxLength={7}
              className="flex-1 px-3 py-2 rounded-xl border border-border text-xs font-mono focus:outline-none focus:border-[#E87A5A] transition-all" />
              
                  {newHex && /^#[0-9A-Fa-f]{6}$/.test(newHex) &&
              <div data-source-location="components/TagPicker:170:20" data-dynamic-content="true" className="w-9 h-9 rounded-full border-2 border-[#E87A5A] shadow-md" style={{ backgroundColor: newHex }} />
              }
                </div>
                <div data-source-location="components/TagPicker:173:16" data-dynamic-content="true" className="flex gap-2">
                  <button data-source-location="components/TagPicker:174:18" data-dynamic-content="true" onClick={() => setShowCreate(false)} className="flex-1 py-2.5 rounded-2xl border border-border text-sm text-muted-foreground hover:bg-secondary transition-all">
                    {t("cancel")}
                  </button>
                  <button data-source-location="components/TagPicker:177:18" data-dynamic-content="true" onClick={createTag} disabled={!newName.trim()} className="flex-1 py-2.5 rounded-2xl bg-[#E87A5A] text-white text-sm font-semibold hover:bg-[#D4694A] transition-all disabled:opacity-50 flex items-center justify-center gap-1">
                    <Check data-source-location="components/TagPicker:178:20" data-dynamic-content="false" className="w-4 h-4" /> {t("tags.create_btn")}
                  </button>
                </div>
              </div>
          }

            <button data-source-location="components/TagPicker:184:12" data-dynamic-content="true" onClick={onClose} className="w-full mt-4 py-2.5 rounded-2xl bg-secondary text-sm font-medium text-foreground hover:bg-border transition-all">
              {multiSelect ? t("tags.done") : t("close")}
            </button>
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}