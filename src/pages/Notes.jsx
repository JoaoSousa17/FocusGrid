import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Plus, Search, X, Pin, Lock, Grid3x3, List,
  Trash2, MoreHorizontal
} from "lucide-react";
import { Note } from "@/api/entities";
import { supabase } from "@/api/supabaseClient";
import { format, isToday, isYesterday } from "date-fns";
import { pt } from "date-fns/locale";
import { useLang } from "@/context/LangContext";

export const NOTE_COLORS = [
  { key: "default", bg: "#ffffff", border: "#e5e7eb", dark: "#f9fafb" },
  { key: "yellow",  bg: "#fef9c3", border: "#fde68a", dark: "#fef08a" },
  { key: "green",   bg: "#dcfce7", border: "#bbf7d0", dark: "#86efac" },
  { key: "blue",    bg: "#dbeafe", border: "#bfdbfe", dark: "#93c5fd" },
  { key: "pink",    bg: "#fce7f3", border: "#fbcfe8", dark: "#f9a8d4" },
  { key: "purple",  bg: "#ede9fe", border: "#ddd6fe", dark: "#c4b5fd" },
  { key: "orange",  bg: "#ffedd5", border: "#fed7aa", dark: "#fdba74" },
  { key: "teal",    bg: "#ccfbf1", border: "#99f6e4", dark: "#5eead4" },
  { key: "gray",    bg: "#f3f4f6", border: "#e5e7eb", dark: "#d1d5db" },
];

function colorOf(key) {
  if (!key) return NOTE_COLORS[0];
  const preset = NOTE_COLORS.find((c) => c.key === key);
  if (preset) return preset;
  // Support raw hex colors set from the extended palette
  if (key.startsWith("#")) return { key, bg: key, border: key + "88", dark: key };
  return NOTE_COLORS[0];
}

function stripHtml(html) {
  const d = document.createElement("div");
  d.innerHTML = html || "";
  return d.textContent || "";
}

function dateLabel(ts, t) {
  const d = new Date(ts);
  if (isToday(d)) return t ? t("today") : "Today";
  if (isYesterday(d)) return t ? t("yesterday") : "Yesterday";
  return format(d, "d 'de' MMMM", { locale: pt });
}

function NoteCardKeep({ note, onClick, onDelete }) {
  const { t } = useLang();
  const col = colorOf(note.color);
  const hasContent = !!stripHtml(note.content);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onClick={onClick}
      className="rounded-2xl border cursor-pointer hover:shadow-md transition-all group relative overflow-hidden break-inside-avoid mb-3"
      style={{ backgroundColor: col.bg, borderColor: col.border }}
    >
      {note.pinned && (
        <div className="absolute top-2 right-2 text-muted-foreground/50">
          <Pin className="w-3 h-3" />
        </div>
      )}
      {note.locked && (
        <div className="absolute top-2 left-2 text-muted-foreground/50">
          <Lock className="w-3 h-3" />
        </div>
      )}
      <div className="p-3.5 pt-3">
        {note.title && (
          <>
            <p className="text-sm font-semibold text-foreground line-clamp-2 pr-4">{note.title}</p>
            {hasContent && (
              <hr className="my-2" style={{ borderColor: col.border }} />
            )}
          </>
        )}
        {hasContent ? (
          <div
            className="text-xs text-muted-foreground line-clamp-6 note-card-preview pointer-events-none"
            dangerouslySetInnerHTML={{ __html: note.content }}
          />
        ) : !note.title ? (
          <p className="text-xs text-muted-foreground/40 italic">{t("notes.empty_note")}</p>
        ) : null}
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(note); }}
        className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-white/70 border border-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 hover:text-red-500"
      >
        <Trash2 className="w-3 h-3" />
      </button>
    </motion.div>
  );
}

function NoteRowApple({ note, onClick, onDelete }) {
  const { t } = useLang();
  const text = stripHtml(note.content);
  const col = colorOf(note.color);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 12 }}
      onClick={onClick}
      className="flex items-start gap-3 px-4 py-3.5 cursor-pointer hover:bg-secondary/40 transition-colors group relative"
    >
      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: col.border }} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          {note.pinned && <Pin className="w-3 h-3 text-muted-foreground/60 flex-shrink-0" />}
          {note.locked && <Lock className="w-3 h-3 text-muted-foreground/60 flex-shrink-0" />}
          <p className="text-sm font-semibold text-foreground truncate">
            {note.title || <span className="font-normal text-muted-foreground">{t("notes.no_title")}</span>}
          </p>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-1">{text || t("notes.empty_note")}</p>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span className="text-[10px] text-muted-foreground/60">{format(new Date(note.updated_at), "HH:mm")}</span>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(note); }}
          className="w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500 transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

export default function Notes() {
  const navigate = useNavigate();
  const { t } = useLang();
  const [notes, setNotes] = useState([]);
  const [exitX, setExitX] = useState(0);
  const [view, setView] = useState("keep"); // keep | apple
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(null);
  const searchRef = useRef(null);
  const swipeStartX = useRef(null);

  const load = () => Note.list("-updated_at", 200).then(setNotes).catch(() => {});

  useEffect(() => { load(); }, []);

  const createNote = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const n = await Note.create({ title: "", content: "", color: "default", pinned: false, locked: false, user_id: user.id });
      navigate(`/notes/${n.id}`);
    } catch (err) {
      console.error("createNote error:", err);
      alert("Erro ao criar nota: " + (err?.message || "Tenta novamente"));
    }
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    await Note.delete(deleting.id).catch(() => {});
    setDeleting(null);
    load();
  };

  const filtered = notes.filter((n) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return n.title.toLowerCase().includes(q) || stripHtml(n.content).toLowerCase().includes(q);
  });

  const pinned = filtered.filter((n) => n.pinned);
  const rest = filtered.filter((n) => !n.pinned);

  // Group for Apple view
  const grouped = {};
  rest.forEach((n) => {
    const label = dateLabel(n.updated_at, t);
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(n);
  });

  const handleSwipeStart = (e) => {
    swipeStartX.current = (e.touches?.[0] ?? e).clientX;
  };
  const handleSwipeEnd = (e) => {
    if (swipeStartX.current === null) return;
    const dx = (e.changedTouches?.[0] ?? e).clientX - swipeStartX.current;
    if (dx > 80) {
      setExitX("100%");
      setTimeout(() => navigate("/"), 240);
    }
    swipeStartX.current = null;
  };

  return (
    <motion.div
      className="min-h-screen bg-cream flex flex-col"
      animate={exitX ? { x: exitX, opacity: 0 } : { x: 0, opacity: 1 }}
      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      onTouchStart={handleSwipeStart}
      onTouchEnd={handleSwipeEnd}
      onMouseDown={handleSwipeStart}
      onMouseUp={handleSwipeEnd}
    >
      {/* note-card-preview scoped styles */}
      <style>{`
        .note-card-preview { font-size: 11px; line-height: 1.5; }
        .note-card-preview p { margin: 0 0 2px; }
        .note-card-preview h1,.note-card-preview h2,.note-card-preview h3 { font-weight:600; margin:0 0 2px; font-size:12px; }
        .note-card-preview ul,.note-card-preview ol { padding-left:1.1em; margin:0 0 2px; }
        .note-card-preview li { margin:0; }
        .note-card-preview table { border-collapse:collapse; font-size:10px; width:100%; }
        .note-card-preview td,.note-card-preview th { border:1px solid #d1d5db; padding:2px 4px; }
        .note-card-preview img { max-width:100%; border-radius:4px; }
        .note-card-preview code { background:#f3f4f6; border-radius:3px; padding:0 3px; font-size:10px; }
      `}</style>

      {/* Header */}
      <div className="sticky top-0 z-10 bg-cream border-b border-border/50">
        <div className="flex items-center gap-2 px-4 py-3">
          {/* Back */}
          <button onClick={() => navigate("/")}
            className="w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all shadow-sm flex-shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </button>
          {/* Title */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-foreground leading-tight">{t("notes.title")}</h1>
            <p className="text-[11px] text-muted-foreground">{notes.length} {notes.length !== 1 ? t("notes.notes_count_other") : t("notes.notes_count_one")}</p>
          </div>
          {/* Search — ~45% width, inline */}
          <div className="flex items-center gap-1.5 bg-white border border-border rounded-2xl px-3 py-2 shadow-sm focus-within:border-[#E87A5A]/50 transition-all w-[44%] flex-shrink-0">
            <Search className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("notes.search_placeholder")}
              className="flex-1 text-sm outline-none bg-transparent text-foreground placeholder:text-muted-foreground/50 min-w-0"
            />
            {search && (
              <button onClick={() => setSearch("")} className="flex-shrink-0">
                <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground transition-colors" />
              </button>
            )}
          </div>
          {/* View toggle */}
          <div className="flex bg-white border border-border rounded-2xl p-0.5 shadow-sm flex-shrink-0">
            <button onClick={() => setView("keep")}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${view === "keep" ? "bg-[#E87A5A] text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button onClick={() => setView("apple")}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${view === "apple" ? "bg-[#E87A5A] text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto pb-28">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-16 h-16 rounded-3xl bg-white border border-border flex items-center justify-center shadow-sm">
              <span className="text-3xl">📝</span>
            </div>
            <p className="text-sm text-muted-foreground">{search ? t("notes.empty_search") : t("notes.empty")}</p>
          </div>
        )}

        {view === "keep" ? (
          <div className="p-4">
            {pinned.length > 0 && (
              <div className="mb-4">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2 px-1">{t("notes.pinned")}</p>
                <div className="columns-2 sm:columns-3 gap-3">
                  {pinned.map((n) => (
                    <NoteCardKeep key={n.id} note={n} onClick={() => navigate(`/notes/${n.id}`)} onDelete={setDeleting} />
                  ))}
                </div>
              </div>
            )}
            {rest.length > 0 && (
              <div>
                {pinned.length > 0 && <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2 px-1">{t("notes.others")}</p>}
                <div className="columns-2 sm:columns-3 gap-3">
                  {rest.map((n) => (
                    <NoteCardKeep key={n.id} note={n} onClick={() => navigate(`/notes/${n.id}`)} onDelete={setDeleting} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {pinned.length > 0 && (
              <div>
                <div className="px-4 pt-4 pb-1">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Afixadas</p>
                </div>
                <div className="bg-white border-y border-border divide-y divide-border/50">
                  {pinned.map((n) => (
                    <NoteRowApple key={n.id} note={n} onClick={() => navigate(`/notes/${n.id}`)} onDelete={setDeleting} />
                  ))}
                </div>
              </div>
            )}
            {Object.entries(grouped).map(([label, items]) => (
              <div key={label}>
                <div className="px-4 pt-5 pb-1">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">{label}</p>
                </div>
                <div className="bg-white border-y border-border divide-y divide-border/50">
                  {items.map((n) => (
                    <NoteRowApple key={n.id} note={n} onClick={() => navigate(`/notes/${n.id}`)} onDelete={setDeleting} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={createNote}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-2xl bg-[#E87A5A] text-white shadow-xl shadow-[#E87A5A]/30 flex items-center justify-center z-20"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleting && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 flex items-end sm:items-center justify-center"
            onClick={() => setDeleting(null)}>
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm p-5 shadow-xl"
              onClick={(e) => e.stopPropagation()}>
              <h3 className="font-bold text-foreground mb-1">{t("notes.delete_title")}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                "{deleting.title || t("notes.no_title")}" {t("notes.delete_body")}
              </p>
              <div className="flex gap-2">
                <button onClick={() => setDeleting(null)} className="flex-1 py-2.5 rounded-xl bg-secondary text-sm font-medium hover:bg-border transition-all">{t("cancel")}</button>
                <button onClick={confirmDelete} className="flex-1 py-2.5 rounded-xl bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition-all">{t("delete")}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
