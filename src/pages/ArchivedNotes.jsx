import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Archive, Trash2, RotateCcw } from "lucide-react";
import { Note } from "@/api/entities";
import { colorOf } from "./Notes";
import { format } from "date-fns";

function stripHtml(html) {
  const d = document.createElement("div");
  d.innerHTML = html || "";
  return d.textContent || "";
}

export default function ArchivedNotes() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [deleting, setDeleting] = useState(null);

  const load = () => Note.list("-updated_at", 200).then((all) => setNotes((all || []).filter((n) => n.archived))).catch(() => {});

  useEffect(() => { load(); }, []);

  const unarchive = async (note) => {
    await Note.update(note.id, { archived: false }).catch(() => {});
    load();
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    await Note.delete(deleting.id).catch(() => {});
    setDeleting(null);
    load();
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-cream border-b border-border/50">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate("/notes")}
            className="w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all shadow-sm flex-shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-foreground leading-tight">Arquivo</h1>
            <p className="text-[11px] text-muted-foreground">{notes.length} nota{notes.length !== 1 ? "s" : ""}</p>
          </div>
          <Archive className="w-5 h-5 text-muted-foreground/50" />
        </div>
      </div>

      <div className="flex-1 overflow-auto pb-8">
        {notes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-16 h-16 rounded-3xl bg-white border border-border flex items-center justify-center shadow-sm">
              <Archive className="w-8 h-8 text-muted-foreground/40" />
            </div>
            <p className="text-sm text-muted-foreground">Nenhuma nota arquivada</p>
          </div>
        )}
        {notes.map((note) => {
          const col = colorOf(note.color);
          const text = stripHtml(note.content);
          return (
            <div key={note.id}
              className="flex items-start gap-3 px-4 py-3.5 border-b border-border/50 group"
            >
              <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: col.border }} />
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => navigate(`/notes/${note.id}`)}>
                <p className="text-sm font-semibold text-foreground truncate">{note.title || <span className="font-normal text-muted-foreground">Sem título</span>}</p>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{text || "Nota vazia"}</p>
                <p className="text-[10px] text-muted-foreground/50 mt-0.5">{format(new Date(note.updated_at), "d MMM yyyy")}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => unarchive(note)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-[#E87A5A] hover:bg-[#E87A5A]/10 transition-all"
                  title="Restaurar">
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setDeleting(note)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-rose-500 hover:bg-rose-50 transition-all"
                  title="Apagar">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {deleting && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 flex items-end sm:items-center justify-center"
            onClick={() => setDeleting(null)}>
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm p-5 shadow-xl"
              onClick={(e) => e.stopPropagation()}>
              <h3 className="font-bold text-foreground mb-1">Apagar nota</h3>
              <p className="text-sm text-muted-foreground mb-4">Esta ação é irreversível.</p>
              <div className="flex gap-2">
                <button onClick={() => setDeleting(null)} className="flex-1 py-2.5 rounded-xl bg-secondary text-sm font-medium hover:bg-border transition-all">Cancelar</button>
                <button onClick={confirmDelete} className="flex-1 py-2.5 rounded-xl bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition-all">Apagar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
