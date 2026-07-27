import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Pin, Lock, Unlock, Palette, Trash2, Code2, Eye,
  Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter,
  AlignRight, AlignJustify, List, ListOrdered, Heading1, Heading2,
  Heading3, Image, Table, Minus, Check, Camera, ZoomIn, ZoomOut,
} from "lucide-react";
import { Note } from "@/api/entities";
import { Core } from "@/api/integrations";
import { NOTE_COLORS } from "./Notes";
import { sha256, htmlToMarkdown, markdownToHtml } from "@/lib/noteUtils";

// ─── CSS injected once ────────────────────────────────────────────────────────
const EDITOR_STYLE = `
.note-editor {
  outline: none;
  min-height: 300px;
  font-size: 15px;
  line-height: 1.7;
  color: #1a1a1a;
  word-break: break-word;
  caret-color: #E87A5A;
}
.note-editor:empty:before {
  content: attr(data-placeholder);
  color: #9ca3af;
  pointer-events: none;
  display: block;
}
.note-editor p { text-align: justify; margin: 0 0 0.5em; }
.note-editor h1 { font-size: 1.75em; font-weight: 700; margin: 0.5em 0; }
.note-editor h2 { font-size: 1.4em; font-weight: 700; margin: 0.4em 0; }
.note-editor h3 { font-size: 1.15em; font-weight: 600; margin: 0.4em 0; }
.note-editor ul { list-style: disc; padding-left: 1.4em; margin: 0.4em 0; }
.note-editor ol { list-style: decimal; padding-left: 1.4em; margin: 0.4em 0; }
.note-editor li { margin: 0.1em 0; }
.note-editor table { border-collapse: collapse; width: 100%; margin: 0.5em 0; }
.note-editor td, .note-editor th {
  border: 1px solid #d1d5db; padding: 6px 10px; text-align: left; min-width: 60px;
}
.note-editor th { background: #f9fafb; font-weight: 600; }
.note-editor img { max-width: 100%; border-radius: 8px; margin: 4px 0; }
.note-editor a { color: #E87A5A; text-decoration: underline; }
.note-editor code { background: #f3f4f6; border-radius: 4px; padding: 1px 4px; font-family: monospace; font-size: 0.9em; }
`;

// ─── Table picker ─────────────────────────────────────────────────────────────
function TablePicker({ onInsert, onClose }) {
  const [hover, setHover] = useState({ r: 0, c: 0 });
  const MAX = 8;
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
      className="absolute z-50 bg-white border border-border rounded-2xl shadow-xl p-3 top-10 left-0">
      <p className="text-[10px] text-muted-foreground text-center mb-2">
        {hover.r > 0 ? `${hover.r} × ${hover.c}` : "Seleciona dimensão"}
      </p>
      <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${MAX}, 1.5rem)` }}>
        {Array.from({ length: MAX * MAX }, (_, i) => {
          const r = Math.floor(i / MAX) + 1;
          const c = (i % MAX) + 1;
          const active = r <= hover.r && c <= hover.c;
          return (
            <div key={i}
              className={`w-6 h-6 rounded border transition-all cursor-pointer ${active ? "bg-[#E87A5A]/20 border-[#E87A5A]/50" : "bg-secondary border-border hover:bg-[#E87A5A]/10"}`}
              onMouseEnter={() => setHover({ r, c })}
              onClick={() => { onInsert(r, c); onClose(); }}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── Lock screen ────────────────────────────────────────────────────────────
function LockScreen({ onUnlock, onCancel }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const submit = async () => {
    if (!pin || loading) return;
    setLoading(true);
    const hash = await sha256(pin);
    const ok = await onUnlock(hash);
    if (!ok) {
      setError(true);
      setPin("");
    }
    setLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-5 px-8">
      <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center">
        <Lock className="w-6 h-6 text-muted-foreground" />
      </div>
      <div className="text-center">
        <p className="font-bold text-foreground">Nota protegida</p>
        <p className="text-sm text-muted-foreground mt-1">Introduz a palavra-passe para aceder</p>
      </div>
      <div className="w-full max-w-xs">
        <input ref={inputRef} type="password" value={pin}
          onChange={(e) => { setPin(e.target.value); setError(false); }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Palavra-passe..."
          className={`w-full px-4 py-3 rounded-2xl border text-sm outline-none text-center transition-all ${error ? "border-rose-300 bg-rose-50" : "border-border focus:border-[#E87A5A]/50"}`} />
        {error && <p className="text-xs text-rose-500 text-center mt-1.5">Palavra-passe incorreta</p>}
      </div>
      <div className="flex gap-2 w-full max-w-xs">
        <button onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl bg-secondary text-sm font-medium hover:bg-border transition-all">
          Voltar
        </button>
        <button onClick={submit} disabled={!pin || loading}
          className="flex-1 py-2.5 rounded-xl bg-[#E87A5A] text-white text-sm font-semibold hover:bg-[#D4694A] transition-all disabled:opacity-50">
          {loading ? "..." : "Desbloquear"}
        </button>
      </div>
    </div>
  );
}

// ─── Set password modal ────────────────────────────────────────────────────────
function SetPasswordModal({ onSet, onClose }) {
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");

  const submit = async () => {
    if (pw !== pw2 || !pw) return;
    const hash = await sha256(pw);
    onSet(hash);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/30 flex items-end sm:items-center justify-center"
      onClick={onClose}>
      <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}>
        <h3 className="font-bold text-foreground mb-1">Proteger nota</h3>
        <p className="text-xs text-muted-foreground mb-4">Define uma palavra-passe. Não existe recuperação.</p>
        <div className="space-y-2">
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)}
            placeholder="Palavra-passe"
            className="w-full px-3 py-2.5 rounded-xl border border-border text-sm outline-none focus:border-[#E87A5A]/50 transition-all" />
          <input type="password" value={pw2} onChange={(e) => setPw2(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Confirmar"
            className="w-full px-3 py-2.5 rounded-xl border border-border text-sm outline-none focus:border-[#E87A5A]/50 transition-all" />
          {pw && pw2 && pw !== pw2 && <p className="text-xs text-rose-500">As palavras-passe não coincidem</p>}
        </div>
        <div className="flex gap-2 mt-4">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-secondary text-sm font-medium hover:bg-border transition-all">Cancelar</button>
          <button onClick={submit} disabled={!pw || pw !== pw2}
            className="flex-1 py-2.5 rounded-xl bg-[#E87A5A] text-white text-sm font-semibold hover:bg-[#D4694A] transition-all disabled:opacity-50">
            Definir
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Toolbar button ───────────────────────────────────────────────────────────
function TBtn({ onClick, active, title, children, danger }) {
  return (
    <button type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      title={title}
      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
        active ? "bg-[#E87A5A] text-white" :
        danger ? "text-rose-500 hover:bg-rose-50" :
        "text-muted-foreground hover:bg-secondary hover:text-foreground"
      }`}>
      {children}
    </button>
  );
}

// ─── Main editor ─────────────────────────────────────────────────────────────
export default function NoteEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const saveTimer = useRef(null);
  const contentRef = useRef(""); // always-current shadow for save closure

  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const titleRef = useRef("");
  const [mode, setMode] = useState("wysiwyg");
  const [mdSource, setMdSource] = useState("");
  const mdSourceRef = useRef("");
  const modeRef = useRef("wysiwyg");
  const [fontSize, setFontSize] = useState(15);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showTablePicker, setShowTablePicker] = useState(false);
  const [showSetPw, setShowSetPw] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  // Keep refs in sync
  useEffect(() => { titleRef.current = title; }, [title]);
  useEffect(() => { mdSourceRef.current = mdSource; }, [mdSource]);
  useEffect(() => { modeRef.current = mode; }, [mode]);

  // Inject editor CSS once
  useEffect(() => {
    if (!document.getElementById("note-editor-style")) {
      const s = document.createElement("style");
      s.id = "note-editor-style";
      s.textContent = EDITOR_STYLE;
      document.head.appendChild(s);
    }
  }, []);

  // Load note
  useEffect(() => {
    Note.get(id)
      .then((n) => {
        setNote(n);
        setTitle(n.title || "");
        titleRef.current = n.title || "";
        contentRef.current = n.content || "";
        const cached = sessionStorage.getItem(`note_unlocked_${n.id}`);
        if (!n.locked || cached === "true") {
          setUnlocked(true);
        }
      })
      .catch(() => navigate("/notes"));
  }, [id]);

  // Populate editor after note loads and unlocked and DOM is ready
  useEffect(() => {
    if (!note || !unlocked) return;
    // Use rAF to ensure the editor div is in the DOM after render
    const raf = requestAnimationFrame(() => {
      if (editorRef.current) {
        editorRef.current.innerHTML = note.content || "";
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [note?.id, unlocked]);

  // ─── Save (uses refs so closure is always fresh) ─────────────────────────
  const scheduleSave = useCallback(() => {
    clearTimeout(saveTimer.current);
    setSaving(true);
    saveTimer.current = setTimeout(async () => {
      const content = modeRef.current === "wysiwyg"
        ? (editorRef.current?.innerHTML || "")
        : markdownToHtml(mdSourceRef.current);
      await Note.update(id, { title: titleRef.current, content }).catch(() => {});
      setSaving(false);
    }, 800);
  }, [id]);

  // ─── execCommand helpers ───────────────────────────────────────────────────
  const exec = (cmd, val = null) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val);
    scheduleSave();
  };

  const queryActive = (cmd) => {
    try { return document.queryCommandState(cmd); } catch { return false; }
  };

  const insertHtml = (html) => {
    editorRef.current?.focus();
    document.execCommand("insertHTML", false, html);
    scheduleSave();
  };

  const wrapBlock = (tag) => {
    editorRef.current?.focus();
    document.execCommand("formatBlock", false, tag);
    scheduleSave();
  };

  // ─── Markdown helpers ──────────────────────────────────────────────────────
  const mdWrap = (prefix, suffix = "") => {
    const ta = document.querySelector(".note-md-textarea");
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const sel = mdSource.slice(start, end);
    const newMd = mdSource.slice(0, start) + prefix + sel + suffix + mdSource.slice(end);
    setMdSource(newMd);
    mdSourceRef.current = newMd;
    setTimeout(() => {
      ta.selectionStart = start + prefix.length;
      ta.selectionEnd = end + prefix.length;
      ta.focus();
    }, 0);
    scheduleSave();
  };

  const mdInsertLine = (prefix) => {
    const ta = document.querySelector(".note-md-textarea");
    if (!ta) return;
    const pos = ta.selectionStart;
    const before = mdSource.slice(0, pos);
    const after = mdSource.slice(pos);
    const newline = (before.endsWith("\n") || before === "") ? "" : "\n";
    const newMd = before + newline + prefix + after;
    setMdSource(newMd);
    mdSourceRef.current = newMd;
    scheduleSave();
  };

  // ─── Mode switch ───────────────────────────────────────────────────────────
  const switchToMarkdown = () => {
    const html = editorRef.current?.innerHTML || "";
    const md = htmlToMarkdown(html);
    setMdSource(md);
    mdSourceRef.current = md;
    setMode("markdown");
    modeRef.current = "markdown";
  };

  const switchToWysiwyg = () => {
    const html = markdownToHtml(mdSourceRef.current);
    setMode("wysiwyg");
    modeRef.current = "wysiwyg";
    requestAnimationFrame(() => {
      if (editorRef.current) editorRef.current.innerHTML = html;
    });
    scheduleSave();
  };

  // ─── Image upload ──────────────────────────────────────────────────────────
  const handleImageFile = async (file) => {
    if (!file) return;
    try {
      const { file_url } = await Core.UploadFile({ file });
      insertHtml(`<img src="${file_url}" alt="${file.name}" style="max-width:100%;border-radius:8px">`);
    } catch (e) {
      alert("Erro ao fazer upload: " + e.message);
    }
  };

  // ─── Table ────────────────────────────────────────────────────────────────
  const insertTable = (rows, cols) => {
    const header = "<tr>" + Array(cols).fill("<th>Coluna</th>").join("") + "</tr>";
    const bodyRow = "<tr>" + Array(cols).fill("<td></td>").join("") + "</tr>";
    const body = Array(Math.max(rows - 1, 1)).fill(bodyRow).join("");
    insertHtml(`<br><table><thead>${header}</thead><tbody>${body}</tbody></table><br>`);
  };

  // ─── Lock ─────────────────────────────────────────────────────────────────
  const tryUnlock = async (hash) => {
    if (hash === note.password_hash) {
      sessionStorage.setItem(`note_unlocked_${note.id}`, "true");
      setUnlocked(true);
      return true;
    }
    return false;
  };

  const handleSetPassword = async (hash) => {
    await Note.update(id, { locked: true, password_hash: hash });
    setNote((prev) => ({ ...prev, locked: true, password_hash: hash }));
    sessionStorage.setItem(`note_unlocked_${id}`, "true");
    setUnlocked(true);
    setShowSetPw(false);
  };

  const removeLock = async () => {
    await Note.update(id, { locked: false, password_hash: null });
    setNote((prev) => ({ ...prev, locked: false, password_hash: null }));
    sessionStorage.removeItem(`note_unlocked_${id}`);
  };

  // ─── Pin ──────────────────────────────────────────────────────────────────
  const togglePin = async () => {
    const pinned = !note.pinned;
    await Note.update(id, { pinned });
    setNote((prev) => ({ ...prev, pinned }));
  };

  // ─── Color ────────────────────────────────────────────────────────────────
  const setColor = async (key) => {
    await Note.update(id, { color: key });
    setNote((prev) => ({ ...prev, color: key }));
    setShowColorPicker(false);
  };

  // ─── Delete ───────────────────────────────────────────────────────────────
  const deleteNote = async () => {
    await Note.delete(id).catch(() => {});
    navigate("/notes");
  };

  // ─── Keyboard ─────────────────────────────────────────────────────────────
  const handleEditorKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      insertHtml("&nbsp;&nbsp;&nbsp;&nbsp;");
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  if (!note) return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#E87A5A]/30 border-t-[#E87A5A] rounded-full animate-spin" />
    </div>
  );

  const col = NOTE_COLORS.find((c) => c.key === note.color) || NOTE_COLORS[0];
  const showLock = note.locked && !unlocked;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: col.bg }}>
      {/* ── Top bar ── */}
      <div className="sticky top-0 z-20 border-b" style={{ backgroundColor: col.bg, borderColor: col.border }}>
        <div className="flex items-center gap-2 px-3 py-2.5">
          <button onClick={() => navigate("/notes")}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-black/5 transition-all flex-shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </button>

          <input
            value={title}
            onChange={(e) => { setTitle(e.target.value); titleRef.current = e.target.value; scheduleSave(); }}
            placeholder="Título..."
            className="flex-1 text-lg font-bold bg-transparent outline-none text-foreground placeholder:text-muted-foreground/40 min-w-0"
          />

          <div className="flex items-center gap-1 flex-shrink-0">
            {saving && <div className="w-1.5 h-1.5 rounded-full bg-[#E87A5A] animate-pulse" title="A guardar..." />}

            <button onClick={togglePin} title={note.pinned ? "Desafixar" : "Afixar"}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${note.pinned ? "text-[#E87A5A]" : "text-muted-foreground hover:bg-black/5"}`}>
              <Pin className="w-4 h-4" />
            </button>

            {note.locked ? (
              <button onClick={removeLock} title="Remover proteção"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-amber-500 hover:bg-black/5 transition-all">
                <Unlock className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={() => setShowSetPw(true)} title="Proteger nota"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-black/5 transition-all">
                <Lock className="w-4 h-4" />
              </button>
            )}

            <div className="relative">
              <button onClick={() => setShowColorPicker(!showColorPicker)} title="Cor"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-black/5 transition-all">
                <Palette className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {showColorPicker && (
                  <motion.div initial={{ opacity: 0, scale: 0.9, y: -4 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute right-0 top-10 bg-white rounded-2xl border border-border shadow-xl p-3 z-50 flex flex-wrap gap-1.5 w-44">
                    {NOTE_COLORS.map((c) => (
                      <button key={c.key} onClick={() => setColor(c.key)}
                        className="w-7 h-7 rounded-full border-2 transition-all hover:scale-110 flex items-center justify-center"
                        style={{ backgroundColor: c.bg, borderColor: note.color === c.key ? "#E87A5A" : c.border }}>
                        {note.color === c.key && <Check className="w-3 h-3 text-[#E87A5A]" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={() => setDeleteConfirm(true)} title="Apagar"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-rose-500 hover:bg-rose-50 transition-all">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mode toggle + font size */}
        <div className="flex items-center gap-1 px-3 pb-2">
          <div className="flex bg-black/5 rounded-xl p-0.5 mr-1">
            <button
              onClick={() => mode === "markdown" ? switchToWysiwyg() : null}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${mode === "wysiwyg" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}>
              <Eye className="w-3.5 h-3.5 inline mr-1" />Rich
            </button>
            <button
              onClick={() => mode === "wysiwyg" ? switchToMarkdown() : null}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${mode === "markdown" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}>
              <Code2 className="w-3.5 h-3.5 inline mr-1" />MD
            </button>
          </div>

          <button onMouseDown={(e) => { e.preventDefault(); setFontSize((s) => Math.max(10, s - 1)); }}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-black/5 transition-all">
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs text-muted-foreground w-7 text-center">{fontSize}</span>
          <button onMouseDown={(e) => { e.preventDefault(); setFontSize((s) => Math.min(32, s + 1)); }}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-black/5 transition-all">
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── Lock screen ── */}
      {showLock ? (
        <LockScreen onUnlock={tryUnlock} onCancel={() => navigate("/notes")} />
      ) : (
        <>
          {/* ── Toolbar ── */}
          <div className="sticky z-10 border-b overflow-x-auto"
            style={{ top: "97px", backgroundColor: col.bg, borderColor: col.border }}>
            <div className="flex items-center gap-0.5 px-3 py-1.5 min-w-max">
              {mode === "wysiwyg" ? (
                <>
                  <TBtn onClick={() => exec("bold")} active={queryActive("bold")} title="Negrito"><Bold className="w-4 h-4" /></TBtn>
                  <TBtn onClick={() => exec("italic")} active={queryActive("italic")} title="Itálico"><Italic className="w-4 h-4" /></TBtn>
                  <TBtn onClick={() => exec("underline")} active={queryActive("underline")} title="Sublinhado"><Underline className="w-4 h-4" /></TBtn>
                  <TBtn onClick={() => exec("strikeThrough")} active={queryActive("strikeThrough")} title="Rasurado"><Strikethrough className="w-4 h-4" /></TBtn>
                  <div className="w-px h-6 bg-border mx-0.5" />
                  <TBtn onClick={() => wrapBlock("h1")} title="Título 1"><Heading1 className="w-4 h-4" /></TBtn>
                  <TBtn onClick={() => wrapBlock("h2")} title="Título 2"><Heading2 className="w-4 h-4" /></TBtn>
                  <TBtn onClick={() => wrapBlock("h3")} title="Título 3"><Heading3 className="w-4 h-4" /></TBtn>
                  <div className="w-px h-6 bg-border mx-0.5" />
                  <TBtn onClick={() => exec("justifyLeft")} title="Esquerda"><AlignLeft className="w-4 h-4" /></TBtn>
                  <TBtn onClick={() => exec("justifyCenter")} title="Centrar"><AlignCenter className="w-4 h-4" /></TBtn>
                  <TBtn onClick={() => exec("justifyRight")} title="Direita"><AlignRight className="w-4 h-4" /></TBtn>
                  <TBtn onClick={() => exec("justifyFull")} title="Justificar"><AlignJustify className="w-4 h-4" /></TBtn>
                  <div className="w-px h-6 bg-border mx-0.5" />
                  <TBtn onClick={() => exec("insertUnorderedList")} title="Lista pontos"><List className="w-4 h-4" /></TBtn>
                  <TBtn onClick={() => exec("insertOrderedList")} title="Lista numerada"><ListOrdered className="w-4 h-4" /></TBtn>
                  <div className="w-px h-6 bg-border mx-0.5" />
                  <div className="relative">
                    <TBtn onClick={() => setShowTablePicker((v) => !v)} title="Tabela"><Table className="w-4 h-4" /></TBtn>
                    <AnimatePresence>
                      {showTablePicker && (
                        <TablePicker onInsert={insertTable} onClose={() => setShowTablePicker(false)} />
                      )}
                    </AnimatePresence>
                  </div>
                  <TBtn onClick={() => fileInputRef.current?.click()} title="Imagem"><Image className="w-4 h-4" /></TBtn>
                  <TBtn onClick={() => cameraInputRef.current?.click()} title="Câmara"><Camera className="w-4 h-4" /></TBtn>
                  <TBtn onClick={() => insertHtml("<hr style='margin:8px 0;border-color:#e5e7eb'>")} title="Linha"><Minus className="w-4 h-4" /></TBtn>
                </>
              ) : (
                <>
                  <TBtn onClick={() => mdWrap("**", "**")} title="Negrito"><Bold className="w-4 h-4" /></TBtn>
                  <TBtn onClick={() => mdWrap("*", "*")} title="Itálico"><Italic className="w-4 h-4" /></TBtn>
                  <TBtn onClick={() => mdWrap("__", "__")} title="Sublinhado"><Underline className="w-4 h-4" /></TBtn>
                  <TBtn onClick={() => mdWrap("~~", "~~")} title="Rasurado"><Strikethrough className="w-4 h-4" /></TBtn>
                  <div className="w-px h-6 bg-border mx-0.5" />
                  <TBtn onClick={() => mdInsertLine("# ")} title="H1"><Heading1 className="w-4 h-4" /></TBtn>
                  <TBtn onClick={() => mdInsertLine("## ")} title="H2"><Heading2 className="w-4 h-4" /></TBtn>
                  <TBtn onClick={() => mdInsertLine("### ")} title="H3"><Heading3 className="w-4 h-4" /></TBtn>
                  <div className="w-px h-6 bg-border mx-0.5" />
                  <TBtn onClick={() => mdInsertLine("- ")} title="Lista"><List className="w-4 h-4" /></TBtn>
                  <TBtn onClick={() => mdInsertLine("1. ")} title="Lista num."><ListOrdered className="w-4 h-4" /></TBtn>
                  <div className="w-px h-6 bg-border mx-0.5" />
                  <TBtn onClick={() => mdInsertLine("| Col1 | Col2 | Col3 |\n| --- | --- | --- |\n| | | |")} title="Tabela"><Table className="w-4 h-4" /></TBtn>
                  <TBtn onClick={() => fileInputRef.current?.click()} title="Imagem"><Image className="w-4 h-4" /></TBtn>
                  <TBtn onClick={() => cameraInputRef.current?.click()} title="Câmara"><Camera className="w-4 h-4" /></TBtn>
                  <TBtn onClick={() => mdInsertLine("---")} title="Linha"><Minus className="w-4 h-4" /></TBtn>
                </>
              )}
            </div>
          </div>

          {/* ── Editor area ── */}
          <div className="flex-1 px-5 py-4 cursor-text"
            onClick={() => {
              if (mode === "wysiwyg") editorRef.current?.focus();
            }}>
            {mode === "wysiwyg" ? (
              <div
                ref={editorRef}
                contentEditable="true"
                suppressContentEditableWarning
                className="note-editor"
                style={{ fontSize: `${fontSize}px` }}
                onInput={scheduleSave}
                onKeyDown={handleEditorKeyDown}
                data-placeholder="Começa a escrever..."
              />
            ) : (
              <textarea
                className="note-md-textarea w-full min-h-[60vh] bg-transparent outline-none resize-none font-mono text-foreground/90 placeholder:text-muted-foreground/40"
                style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}
                value={mdSource}
                onChange={(e) => {
                  setMdSource(e.target.value);
                  mdSourceRef.current = e.target.value;
                  scheduleSave();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Tab") {
                    e.preventDefault();
                    const s = e.target.selectionStart;
                    const v = mdSource.slice(0, s) + "    " + mdSource.slice(s);
                    setMdSource(v);
                    mdSourceRef.current = v;
                    setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = s + 4; }, 0);
                  }
                }}
                placeholder="Escreve Markdown aqui..."
              />
            )}
          </div>
        </>
      )}

      {/* Hidden file inputs */}
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => { handleImageFile(e.target.files?.[0]); e.target.value = ""; }} />
      <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden"
        onChange={(e) => { handleImageFile(e.target.files?.[0]); e.target.value = ""; }} />

      {/* Set password modal */}
      <AnimatePresence>
        {showSetPw && <SetPasswordModal onSet={handleSetPassword} onClose={() => setShowSetPw(false)} />}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 flex items-end sm:items-center justify-center"
            onClick={() => setDeleteConfirm(false)}>
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm p-5 shadow-xl"
              onClick={(e) => e.stopPropagation()}>
              <h3 className="font-bold text-foreground mb-1">Apagar nota</h3>
              <p className="text-sm text-muted-foreground mb-4">Esta ação é irreversível.</p>
              <div className="flex gap-2">
                <button onClick={() => setDeleteConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl bg-secondary text-sm font-medium hover:bg-border transition-all">
                  Cancelar
                </button>
                <button onClick={deleteNote}
                  className="flex-1 py-2.5 rounded-xl bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition-all">
                  Apagar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
