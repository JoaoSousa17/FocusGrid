import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Pin, Lock, Unlock, Palette, Trash2, Code2, Eye,
  Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter,
  AlignRight, AlignJustify, List, ListOrdered, Heading1, Heading2,
  Heading3, Image, Table, Minus, Check, Camera, ZoomIn, ZoomOut,
  Link2, Eraser, Archive, Share2, Tag as TagIcon, MessageCircle, Send, X, Loader2,
  Users, Mail, Shield, UserPlus, Clock, Infinity,
} from "lucide-react";
import { Note, Tag } from "@/api/entities";
import { Core, InvokeLLMChat } from "@/api/integrations";
import { supabase } from "@/api/supabaseClient";
import { usePresence } from "@/hooks/usePresence";
import PresenceAvatars from "@/components/PresenceAvatars";
import { NOTE_COLORS } from "./Notes";
import TagPicker from "@/components/TagPicker";
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

// ─── Share Note Modal ─────────────────────────────────────────────────────────
function ShareNoteModal({ noteId, onClose }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("editor");
  const [weeks, setWeeks] = useState(1);
  const [indefinite, setIndefinite] = useState(true);
  const [shares, setShares] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [lastShared, setLastShared] = useState(null);

  const loadShares = async () => {
    setLoading(true);
    const { data } = await supabase.from("note_shares").select("*")
      .eq("note_id", noteId).order("created_at", { ascending: false });
    setShares(data || []);
    setLoading(false);
  };

  useEffect(() => { loadShares(); }, [noteId]);

  const addShare = async () => {
    if (!email.trim() || !email.includes("@")) { setError("Email inválido."); return; }
    setError(""); setAdding(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setError("Não autenticado."); return; }
      const expiresAt = indefinite ? null : new Date(Date.now() + weeks * 7 * 24 * 60 * 60 * 1000).toISOString();
      const { error: err } = await supabase.from("note_shares").upsert(
        { note_id: noteId, owner_id: user.id, shared_with_email: email.trim().toLowerCase(), role, expires_at: expiresAt },
        { onConflict: "note_id,shared_with_email" }
      );
      if (err) { setError(err.message); return; }
      setLastShared(email.trim().toLowerCase());
      setEmail("");
      await loadShares();
    } finally { setAdding(false); }
  };

  const removeShare = async (id) => {
    await supabase.from("note_shares").delete().eq("id", id);
    setShares((p) => p.filter((s) => s.id !== id));
  };

  const updateRole = async (id, newRole) => {
    await supabase.from("note_shares").update({ role: newRole }).eq("id", id);
    setShares((p) => p.map((s) => s.id === id ? { ...s, role: newRole } : s));
  };

  const formatExpiry = (expiresAt) => {
    if (!expiresAt) return "Sem expiração";
    const diff = Math.ceil((new Date(expiresAt) - new Date()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return "Expirado";
    if (diff === 0) return "Expira hoje";
    if (diff === 1) return "Expira amanhã";
    return `Expira em ${diff} dias`;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-end sm:items-center justify-center"
      onClick={onClose}>
      <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 220 }}
        className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-border">
          <div className="w-9 h-9 rounded-2xl bg-[#E87A5A]/10 flex items-center justify-center flex-shrink-0">
            <Users className="w-4 h-4 text-[#E87A5A]" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-foreground text-base">Partilhar nota</h2>
            <p className="text-[11px] text-muted-foreground">Convida pessoas para ver ou editar esta nota</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-5 max-h-[75vh] overflow-y-auto">

          {/* Invite section */}
          <div className="space-y-3">
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Convidar por email</label>

            {/* Email input */}
            <div className="flex items-center gap-2 border-2 border-border rounded-2xl px-3 py-3 focus-within:border-[#E87A5A]/60 transition-all bg-white">
              <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <input value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); setLastShared(null); }}
                onKeyDown={(e) => e.key === "Enter" && addShare()}
                placeholder="email@exemplo.com" type="email"
                className="flex-1 text-sm outline-none bg-transparent" />
            </div>

            {/* Role selector */}
            <div className="flex gap-2">
              {[
                { key: "viewer", icon: Eye, label: "Visualizador", desc: "Só pode ver" },
                { key: "editor", icon: Shield, label: "Editor", desc: "Lê e edita" },
                { key: "admin",  icon: Share2, label: "Admin", desc: "Edita e partilha" },
              ].map((r) => (
                <button key={r.key} onClick={() => setRole(r.key)}
                  className={`flex-1 flex flex-col items-start gap-1 px-3 py-3 rounded-2xl border-2 text-left transition-all ${
                    role === r.key ? "border-[#E87A5A] bg-[#E87A5A]/5" : "border-border hover:border-[#E87A5A]/40 bg-white"
                  }`}>
                  <div className="flex items-center gap-1.5">
                    <r.icon className={`w-3.5 h-3.5 ${role === r.key ? "text-[#E87A5A]" : "text-muted-foreground"}`} />
                    <span className={`text-xs font-bold ${role === r.key ? "text-[#E87A5A]" : "text-foreground"}`}>{r.label}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{r.desc}</span>
                </button>
              ))}
            </div>

            {/* Duration */}
            <div className="bg-secondary/40 rounded-2xl p-4 border border-border space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#E87A5A]" />
                  <span className="text-sm font-semibold text-foreground">Duração do acesso</span>
                </div>
                <button onClick={() => setIndefinite(!indefinite)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                    indefinite ? "border-[#E87A5A] bg-[#E87A5A] text-white shadow-sm" : "border-border text-muted-foreground bg-white hover:border-[#E87A5A]/40"
                  }`}>
                  <Infinity className="w-3.5 h-3.5" />
                  Indefinido
                </button>
              </div>
              {!indefinite && (
                <div className="flex items-center gap-3">
                  <div className="flex-1 flex items-center gap-2 bg-white rounded-xl border-2 border-border px-3 py-2 focus-within:border-[#E87A5A]/60 transition-all">
                    <input type="number" min={1} max={52} value={weeks}
                      onChange={(e) => setWeeks(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-12 text-2xl font-bold text-foreground outline-none bg-transparent text-center" />
                    <span className="text-sm text-muted-foreground font-medium">semana{weeks !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {[1, 4, 12].map((w) => (
                      <button key={w} onClick={() => setWeeks(w)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                          weeks === w ? "bg-[#E87A5A] text-white" : "bg-white border border-border text-muted-foreground hover:border-[#E87A5A]/40"
                        }`}>
                        {w === 1 ? "1 sem" : w === 4 ? "1 mês" : "3 meses"}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {indefinite && (
                <p className="text-xs text-muted-foreground">O acesso não expira automaticamente. Podes remover a qualquer momento.</p>
              )}
            </div>

            {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}

            {lastShared && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <p className="text-xs font-medium text-emerald-700">Partilhado com {lastShared}</p>
              </div>
            )}

            <button onClick={addShare} disabled={adding || !email.trim()}
              className="w-full py-3 rounded-2xl bg-[#E87A5A] text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#D4694A] transition-all disabled:opacity-50 shadow-lg shadow-[#E87A5A]/20">
              {adding
                ? <><Loader2 className="w-4 h-4 animate-spin" /> A partilhar…</>
                : <><UserPlus className="w-4 h-4" /> Partilhar acesso</>}
            </button>
          </div>

          {/* People with access */}
          {(shares.length > 0 || loading) && (
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Com acesso</label>
              {loading ? (
                <div className="flex justify-center py-4"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>
              ) : shares.map((s) => {
                const expired = s.expires_at && new Date(s.expires_at) < new Date();
                return (
                  <div key={s.id} className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl border ${expired ? "border-rose-100 bg-rose-50/50 opacity-60" : "border-border bg-white"}`}>
                    <div className="w-8 h-8 rounded-full bg-[#E87A5A]/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-[#E87A5A]">
                      {s.shared_with_email[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">{s.shared_with_email}</p>
                      <p className={`text-[10px] ${expired ? "text-rose-500" : "text-muted-foreground"}`}>{formatExpiry(s.expires_at)}</p>
                    </div>
                    <select value={s.role || "editor"} onChange={(e) => updateRole(s.id, e.target.value)}
                      className="text-[10px] font-semibold px-2 py-1 rounded-lg border border-border bg-white focus:outline-none focus:border-[#E87A5A] cursor-pointer">
                      <option value="viewer">Ver</option>
                      <option value="editor">Editar</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button onClick={() => removeShare(s.id)} className="w-7 h-7 rounded-lg hover:bg-rose-50 hover:text-rose-500 flex items-center justify-center transition-all text-muted-foreground">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {!loading && shares.length === 0 && (
            <div className="text-center py-4 text-muted-foreground/60">
              <Users className="w-7 h-7 mx-auto mb-1.5 opacity-40" />
              <p className="text-xs">Ainda não partilhaste esta nota com ninguém</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Text / Highlight color picker ────────────────────────────────────────────
function ColorPickerPopup({ type, onPick, onClose, anchorRect }) {
  const [customHex, setCustomHex] = useState("");
  const FORE_COLORS = ["#1a1a1a","#ef4444","#f97316","#eab308","#22c55e","#3b82f6","#8b5cf6","#ec4899","#14b8a6","#6b7280"];
  const HL_COLORS   = ["#fef08a","#bfdbfe","#bbf7d0","#fce7f3","#ffedd5","#d1fae5","#ede9fe","#fee2e2","#f3f4f6","#fef9c3"];
  const colors = type === "fore" ? FORE_COLORS : HL_COLORS;
  const validHex = /^[0-9a-fA-F]{6}$/.test(customHex);
  const LS_KEY = type === "fore" ? "note_fg_recent" : "note_hl_recent";
  const getRecent = () => { try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); } catch { return []; } };
  const [recentColors, setRecentColors] = useState(getRecent);
  const addRecent = (hex) => {
    const next = [hex, ...getRecent().filter((c) => c !== hex)].slice(0, 6);
    localStorage.setItem(LS_KEY, JSON.stringify(next));
    setRecentColors(next);
  };
  const style = anchorRect ? {
    top: Math.min(anchorRect.bottom + 4, window.innerHeight - 280),
    left: Math.min(anchorRect.left, window.innerWidth - 224),
  } : { top: 160, left: 20 };
  const applyCustom = () => { if (validHex) { const hex = "#" + customHex; addRecent(hex); onPick(hex); onClose(); } };
  return (
    <>
      <div className="fixed inset-0 z-[150]" onMouseDown={(e) => { e.preventDefault(); onClose(); }} />
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
        className="fixed z-[200] bg-white border border-border rounded-2xl shadow-xl p-3 w-56"
        style={style}>
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          {type === "fore" ? "Cor do texto" : "Destaque"}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {colors.map((c) => (
            <button key={c}
              className="w-7 h-7 rounded-full border-2 border-white hover:scale-110 transition-all shadow-sm"
              style={{ backgroundColor: c }}
              onMouseDown={(e) => { e.preventDefault(); onPick(c); onClose(); }}
            />
          ))}
          {type === "fore" && (
            <button
              className="w-7 h-7 rounded-full border-2 border-dashed border-border flex items-center justify-center text-[9px] text-muted-foreground hover:border-foreground transition-all"
              onMouseDown={(e) => { e.preventDefault(); onPick(""); onClose(); }}
              title="Remover cor"
            >✕</button>
          )}
        </div>
        {recentColors.length > 0 && (
          <>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 mt-1">Recentes</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {recentColors.map((c) => (
                <button key={c}
                  className="w-7 h-7 rounded-full border-2 border-white hover:scale-110 transition-all shadow-sm ring-1 ring-border"
                  style={{ backgroundColor: c }}
                  onMouseDown={(e) => { e.preventDefault(); onPick(c); onClose(); }}
                />
              ))}
            </div>
          </>
        )}
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Personalizada</p>
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-1.5 border border-border rounded-xl px-2 py-1.5 focus-within:border-[#E87A5A]/50 transition-all">
            <span className="text-xs text-muted-foreground">#</span>
            <input value={customHex}
              onChange={(e) => setCustomHex(e.target.value.replace(/[^0-9a-fA-F]/g, "").slice(0, 6))}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); applyCustom(); } }}
              placeholder="e5e7eb" maxLength={6}
              className="flex-1 text-xs outline-none font-mono min-w-0 bg-transparent" />
            {validHex && (
              <div className="w-4 h-4 rounded-full border border-border flex-shrink-0"
                style={{ backgroundColor: "#" + customHex }} />
            )}
          </div>
          <button
            onMouseDown={(e) => { e.preventDefault(); applyCustom(); }}
            disabled={!validHex}
            className="px-2.5 py-1.5 rounded-xl bg-[#E87A5A] text-white text-xs font-semibold disabled:opacity-40 transition-all">
            OK
          </button>
        </div>
      </motion.div>
    </>
  );
}

// ─── AI Chat Popup ─────────────────────────────────────────────────────────────
function AIChatPopup({ noteContent, onInsert, onClose }) {
  const [messages, setMessages] = useState([{ role: "assistant", content: "Olá! Posso ajudar com o conteúdo desta nota. O que precisas?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const reply = await InvokeLLMChat({
        messages: [...messages, userMsg],
        system: `És um assistente de escrita. A nota atual contém:\n${noteContent || "(vazia)"}\n\nAjuda o utilizador a melhorar, expandir ou formatar o conteúdo. Responde em português.`,
      });
      const text = typeof reply === "string" ? reply : (reply?.content || reply?.choices?.[0]?.message?.content || "");
      setMessages((p) => [...p, { role: "assistant", content: text }]);
    } catch {
      setMessages((p) => [...p, { role: "assistant", content: "Ocorreu um erro. Tenta novamente." }]);
    }
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 right-4 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden"
      style={{ maxHeight: "60vh" }}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-[#E87A5A]" />
          <span className="font-semibold text-sm text-foreground">IA Assistente</span>
        </div>
        <button onClick={onClose} className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs ${
              m.role === "user" ? "bg-[#E87A5A] text-white rounded-br-sm" : "bg-secondary text-foreground rounded-bl-sm"
            }`}>
              <p className="whitespace-pre-wrap">{m.content}</p>
              {m.role === "assistant" && m !== messages[0] && (
                <button onClick={() => onInsert(m.content)}
                  className="mt-1.5 text-[10px] text-[#E87A5A] hover:underline font-medium">
                  Inserir na nota
                </button>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-secondary px-3 py-2 rounded-2xl rounded-bl-sm">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="flex items-center gap-2 px-3 py-2.5 border-t border-border">
        <input value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Pergunta à IA..."
          className="flex-1 text-sm outline-none bg-transparent text-foreground placeholder:text-muted-foreground/50" />
        <button onClick={send} disabled={loading || !input.trim()}
          className="w-8 h-8 rounded-xl bg-[#E87A5A] text-white flex items-center justify-center disabled:opacity-40 transition-all">
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Action button with label ─────────────────────────────────────────────────
function ActionBtn({ icon: Icon, label, onClick, active, danger, amber }) {
  return (
    <button type="button" onClick={onClick}
      className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all min-w-[44px] flex-shrink-0 ${
        active ? "bg-[#E87A5A]/10 text-[#E87A5A]" :
        amber ? "text-amber-500 hover:bg-amber-50" :
        danger ? "text-rose-500 hover:bg-rose-50" :
        "text-muted-foreground hover:bg-black/5"
      }`}>
      <Icon className="w-4 h-4" />
      <span className="text-[9px] font-medium leading-none whitespace-nowrap">{label}</span>
    </button>
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
  const [customHex, setCustomHex] = useState("");
  const [showTablePicker, setShowTablePicker] = useState(false);
  const [showSetPw, setShowSetPw] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showForeColor, setShowForeColor] = useState(false);
  const [showHighlight, setShowHighlight] = useState(false);
  const [noteTags, setNoteTags] = useState([]);
  const [showTagPicker, setShowTagPicker] = useState(false);
  const [fgRect, setFgRect] = useState(null);
  const [hlRect, setHlRect] = useState(null);

  const lastSaveAt = useRef(0);
  const savedRangeRef = useRef(null);

  const saveEditorSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) savedRangeRef.current = sel.getRangeAt(0).cloneRange();
  };

  const restoreEditorSelection = () => {
    const range = savedRangeRef.current;
    if (!range) return;
    editorRef.current?.focus();
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  };

  // Presence
  const notePresenceChannel = id ? `presence:notes:${id}` : null;
  const notePresences = usePresence(notePresenceChannel);

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

  // Load tags from note
  useEffect(() => {
    if (note) {
      try { setNoteTags(JSON.parse(note.tags_json || "[]")); } catch { setNoteTags([]); }
    }
  }, [note?.id]);

  // Real-time: sync note changes from other users
  useEffect(() => {
    if (!id) return;
    const ch = supabase.channel(`rt:notes:${id}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "notes",
        filter: `id=eq.${id}` }, (payload) => {
        // Ignore echo from own recent save (within 2s)
        if (Date.now() - lastSaveAt.current < 2000) return;
        const n = payload.new;
        setNote((prev) => ({ ...prev, ...n }));
        setTitle(n.title || "");
        titleRef.current = n.title || "";
        if (editorRef.current && modeRef.current === "wysiwyg") {
          editorRef.current.innerHTML = n.content || "";
        }
      })
      .subscribe();
    return () => supabase.removeChannel(ch);
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
      lastSaveAt.current = Date.now();
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

  // ─── Archive ──────────────────────────────────────────────────────────────
  const toggleArchive = async () => {
    const archived = !(note.archived ?? false);
    try { await Note.update(id, { archived }); } catch (e) { console.error("archive error", e); }
    navigate("/notes");
  };

  // ─── Tags ─────────────────────────────────────────────────────────────────
  const handleTagsChange = async (tags) => {
    setNoteTags(tags);
    try { await Note.update(id, { tags_json: JSON.stringify(tags) }); } catch {}
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

  const setCustomColor = async () => {
    const hex = customHex.startsWith("#") ? customHex : "#" + customHex;
    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return;
    await Note.update(id, { color: hex });
    setNote((prev) => ({ ...prev, color: hex }));
    setCustomHex("");
    setShowColorPicker(false);
  };

  const insertLink = () => {
    const url = prompt("URL do link:");
    if (!url) return;
    exec("createLink", url);
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

  const col = (() => {
    if (!note.color) return NOTE_COLORS[0];
    const preset = NOTE_COLORS.find((c) => c.key === note.color);
    if (preset) return preset;
    if (note.color.startsWith("#")) return { key: note.color, bg: note.color, border: note.color + "88", dark: note.color };
    return NOTE_COLORS[0];
  })();
  const showLock = note.locked && !unlocked;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: col.bg }}>
      {/* ── Top bar ── */}
      <div className="sticky top-0 z-20 border-b" style={{ backgroundColor: col.bg, borderColor: col.border }}>
        {/* Single row: back + title + saving + icons on right */}
        <div className="flex items-center gap-1 px-2 pt-2 pb-1">
          <button onClick={() => navigate("/notes")}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-black/5 transition-all flex-shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <input
            value={title}
            onChange={(e) => { setTitle(e.target.value); titleRef.current = e.target.value; scheduleSave(); }}
            placeholder="Título..."
            className="flex-1 min-w-0 text-base font-bold bg-transparent outline-none text-foreground placeholder:text-muted-foreground/40"
          />
          {saving && <div className="w-1.5 h-1.5 rounded-full bg-[#E87A5A] animate-pulse flex-shrink-0" title="A guardar..." />}
          {/* Action icons — scrollable, right-aligned */}
          <div className="flex items-end overflow-x-auto no-scrollbar flex-shrink-0 max-w-[58%] sm:max-w-none">
            <ActionBtn icon={Pin} label={note.pinned ? "Desafixar" : "Afixar"} onClick={togglePin} active={note.pinned} />
            {note.locked
              ? <ActionBtn icon={Unlock} label="Desbloquear" onClick={removeLock} amber />
              : <ActionBtn icon={Lock} label="Proteger" onClick={() => setShowSetPw(true)} />
            }
            <ActionBtn icon={Palette} label="Cor" onClick={() => setShowColorPicker((v) => !v)} active={showColorPicker} />
            <ActionBtn icon={TagIcon} label="Tags" onClick={() => setShowTagPicker(true)} active={noteTags.length > 0} />
            <ActionBtn icon={Share2} label="Partilhar" onClick={() => setShowShare(true)} />
            <ActionBtn icon={Archive} label={note.archived ? "Restaurar" : "Arquivar"} onClick={toggleArchive} />
            <ActionBtn icon={MessageCircle} label="IA" onClick={() => setShowAIChat((v) => !v)} active={showAIChat} />
            <ActionBtn icon={Trash2} label="Apagar" onClick={() => setDeleteConfirm(true)} danger />
          </div>
        </div>

        {/* Presence avatars */}
        {notePresences.length > 0 && (
          <div className="flex items-center gap-1.5 px-3 pb-1">
            <span className="text-[9px] text-muted-foreground">A editar:</span>
            <PresenceAvatars presences={notePresences} />
          </div>
        )}

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

      {/* ── Color picker (fixed so it overlays everything) ── */}
      <AnimatePresence>
        {showColorPicker && (
          <>
            <div className="fixed inset-0 z-[150]" onClick={() => setShowColorPicker(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: -4 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
              className="fixed right-3 top-[110px] bg-white rounded-2xl border border-border shadow-2xl p-3 z-[200] w-64 max-h-[70vh] overflow-y-auto">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Predefinidas</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {NOTE_COLORS.map((c) => (
                  <button key={c.key} onClick={() => setColor(c.key)}
                    className="w-7 h-7 rounded-full border-2 transition-all hover:scale-110 flex items-center justify-center"
                    style={{ backgroundColor: c.bg, borderColor: note.color === c.key ? "#E87A5A" : c.border }}>
                    {note.color === c.key && <Check className="w-3 h-3 text-[#E87A5A]" />}
                  </button>
                ))}
              </div>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Mais cores</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {["#fef2f2","#fff7ed","#fefce8","#f0fdf4","#ecfdf5","#f0f9ff","#eff6ff","#f5f3ff","#fdf4ff",
                  "#fee2e2","#ffedd5","#fef9c3","#dcfce7","#d1fae5","#e0f2fe","#dbeafe","#ede9fe","#fae8ff",
                  "#fca5a5","#fdba74","#fde68a","#86efac","#6ee7b7","#7dd3fc","#93c5fd","#c4b5fd","#e879f9"].map((hex) => (
                  <button key={hex} onClick={() => { Note.update(id, { color: hex }); setNote((p) => ({...p, color: hex})); setShowColorPicker(false); }}
                    className="w-7 h-7 rounded-full border-2 transition-all hover:scale-110 flex items-center justify-center"
                    style={{ backgroundColor: hex, borderColor: note.color === hex ? "#E87A5A" : "#e5e7eb" }}>
                    {note.color === hex && <Check className="w-3 h-3 text-[#E87A5A]" />}
                  </button>
                ))}
              </div>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">Hexadecimal</p>
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 border border-border rounded-xl px-2 py-1.5 focus-within:border-[#E87A5A]/50 transition-all">
                  <span className="text-sm text-muted-foreground">#</span>
                  <input value={customHex.replace("#", "")}
                    onChange={(e) => setCustomHex(e.target.value.replace("#", ""))}
                    onKeyDown={(e) => e.key === "Enter" && setCustomColor()}
                    placeholder="e5e7eb" maxLength={6}
                    className="flex-1 text-sm outline-none font-mono min-w-0" />
                  {/^[0-9a-fA-F]{6}$/.test(customHex.replace("#", "")) && (
                    <div className="w-5 h-5 rounded-full border border-border flex-shrink-0"
                      style={{ backgroundColor: "#" + customHex.replace("#", "") }} />
                  )}
                </div>
                <button onClick={setCustomColor}
                  disabled={!/^[0-9a-fA-F]{6}$/.test(customHex.replace("#", ""))}
                  className="px-3 py-1.5 rounded-xl bg-[#E87A5A] text-white text-xs font-semibold disabled:opacity-40 transition-all">
                  OK
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── ForeColor picker (fixed) ── */}
      <AnimatePresence>
        {showForeColor && (
          <ColorPickerPopup type="fore"
            anchorRect={fgRect}
            onPick={(c) => { restoreEditorSelection(); c ? exec("foreColor", c) : exec("removeFormat"); }}
            onClose={() => setShowForeColor(false)} />
        )}
      </AnimatePresence>

      {/* ── Highlight picker (fixed) ── */}
      <AnimatePresence>
        {showHighlight && (
          <ColorPickerPopup type="highlight"
            anchorRect={hlRect}
            onPick={(c) => { restoreEditorSelection(); exec("hiliteColor", c); }}
            onClose={() => setShowHighlight(false)} />
        )}
      </AnimatePresence>

      {/* ── Lock screen ── */}
      {showLock ? (
        <LockScreen onUnlock={tryUnlock} onCancel={() => navigate("/notes")} />
      ) : (
        <>
          {/* ── Toolbar ── */}
          <div className="sticky z-10 border-b overflow-x-auto"
            style={{ top: "84px", backgroundColor: col.bg, borderColor: col.border }}>
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
                  <TBtn onClick={insertLink} title="Inserir link"><Link2 className="w-4 h-4" /></TBtn>
                  <TBtn onClick={() => insertHtml("<hr style='margin:8px 0;border-color:#e5e7eb'>")} title="Linha divisória"><Minus className="w-4 h-4" /></TBtn>
                  <div className="w-px h-6 bg-border mx-0.5" />
                  <TBtn onClick={() => exec("removeFormat")} title="Remover formatação"><Eraser className="w-4 h-4" /></TBtn>
                  <TBtn onClick={() => exec("undo")} title="Desfazer">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>
                  </TBtn>
                  <TBtn onClick={() => exec("redo")} title="Refazer">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"/></svg>
                  </TBtn>
                  <div className="w-px h-6 bg-border mx-0.5" />
                  <button type="button"
                    onMouseDown={(e) => { e.preventDefault(); saveEditorSelection(); setFgRect(e.currentTarget.getBoundingClientRect()); setShowForeColor((v) => !v); setShowHighlight(false); }}
                    title="Cor do texto"
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all text-muted-foreground hover:bg-secondary">
                    <span className="text-xs font-bold leading-none" style={{ color: "#E87A5A" }}>A</span>
                  </button>
                  <button type="button"
                    onMouseDown={(e) => { e.preventDefault(); saveEditorSelection(); setHlRect(e.currentTarget.getBoundingClientRect()); setShowHighlight((v) => !v); setShowForeColor(false); }}
                    title="Destaque"
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all text-muted-foreground hover:bg-secondary">
                    <span className="text-xs font-bold leading-none px-0.5 rounded" style={{ backgroundColor: "#fef08a" }}>A</span>
                  </button>
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
          <div className="flex-1 px-5 py-4 cursor-text relative"
            onClick={() => {
              if (mode === "wysiwyg") editorRef.current?.focus();
            }}>
            {/* Tags pills — top-right of content area */}
            {noteTags.length > 0 && (
              <div className="absolute top-3 right-3 flex flex-wrap gap-1 justify-end max-w-[45%] pointer-events-none z-10">
                {noteTags.map((tag) => (
                  <span key={tag.id} className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full pointer-events-auto"
                    style={{ backgroundColor: (tag.color || "#E87A5A") + "28", color: tag.color || "#E87A5A", border: `1px solid ${(tag.color || "#E87A5A")}44` }}>
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
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

      {/* Share modal */}
      <AnimatePresence>
        {showShare && <ShareNoteModal noteId={id} onClose={() => setShowShare(false)} />}
      </AnimatePresence>

      {/* Tag picker */}
      <TagPicker
        open={showTagPicker}
        onClose={() => setShowTagPicker(false)}
        multiSelect={true}
        selectedTags={noteTags}
        onMultiSelect={(tags) => handleTagsChange(tags.slice(0, 3))}
      />

      {/* AI chat */}
      <AnimatePresence>
        {showAIChat && (
          <AIChatPopup
            noteContent={editorRef.current?.textContent || ""}
            onInsert={(text) => { insertHtml(text.replace(/\n/g, "<br>")); }}
            onClose={() => setShowAIChat(false)}
          />
        )}
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
