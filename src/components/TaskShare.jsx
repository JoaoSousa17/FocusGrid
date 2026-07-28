import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UserPlus, Mail, Shield, Eye, Trash2, Clock, Infinity, Check, Loader2, Users, Copy, Link2, Lock } from "lucide-react";
import { supabase } from "@/api/supabaseClient";
import { useLang } from "@/context/LangContext";

export default function TaskShare({ open, onClose }) {
  const { t } = useLang();
  const [shares, setShares] = useState([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("viewer");
  const [weeks, setWeeks] = useState(1);
  const [indefinite, setIndefinite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [lastShared, setLastShared] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isPro] = useState(true); // TODO: wire to actual subscription check

  useEffect(() => {
    if (open) loadShares();
  }, [open]);

  const loadShares = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("task_shares")
      .select("*")
      .order("created_at", { ascending: false });
    setShares(data || []);
    setLoading(false);
  };

  const addShare = async () => {
    if (!email.trim() || !email.includes("@")) {
      setError("Email inválido.");
      return;
    }
    setError("");
    setAdding(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setError("Não autenticado."); return; }

      const expiresAt = indefinite
        ? null
        : new Date(Date.now() + weeks * 7 * 24 * 60 * 60 * 1000).toISOString();

      const { error: err } = await supabase.from("task_shares").upsert(
        {
          owner_id: user.id,
          shared_with_email: email.trim().toLowerCase(),
          role,
          expires_at: expiresAt,
        },
        { onConflict: "owner_id,shared_with_email" }
      );
      if (err) { setError(err.message); return; }
      setLastShared(email.trim().toLowerCase());
      setEmail("");
      await loadShares();
    } finally {
      setAdding(false);
    }
  };

  const removeShare = async (id) => {
    await supabase.from("task_shares").delete().eq("id", id);
    setShares((prev) => prev.filter((s) => s.id !== id));
  };

  const updateRole = async (id, newRole) => {
    await supabase.from("task_shares").update({ role: newRole }).eq("id", id);
    setShares((prev) => prev.map((s) => s.id === id ? { ...s, role: newRole } : s));
  };

  const copyLink = () => {
    const url = `${window.location.origin}/tasks`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  const formatExpiry = (expiresAt) => {
    if (!expiresAt) return "Sem expiração";
    const d = new Date(expiresAt);
    const now = new Date();
    const diff = Math.ceil((d - now) / (1000 * 60 * 60 * 24));
    if (diff < 0) return "Expirado";
    if (diff === 0) return "Expira hoje";
    if (diff === 1) return "Expira amanhã";
    return `Expira em ${diff} dias`;
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md sm:w-[80%] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-border">
              <div className="w-9 h-9 rounded-2xl bg-[#E87A5A]/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-[#E87A5A]" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-foreground text-base">Partilhar planilha</h2>
                <p className="text-[11px] text-muted-foreground">Convida pessoas para ver ou editar as tuas tarefas</p>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-5 max-h-[75vh] overflow-y-auto">

              {/* Copy link row */}
              <div className="flex items-center gap-2 bg-secondary/50 rounded-2xl px-4 py-3 border border-border">
                <Link2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="flex-1 text-xs text-muted-foreground truncate">Partilha o link direto da app</span>
                <button
                  onClick={copyLink}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-border text-xs font-semibold text-foreground hover:border-[#E87A5A]/40 transition-all"
                >
                  {copiedLink ? <><Check className="w-3 h-3 text-emerald-500" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar link</>}
                </button>
              </div>

              {/* Add person section */}
              <div className="space-y-3">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Convidar por email</label>

                {/* Email input */}
                <div className="flex items-center gap-2 border-2 border-border rounded-2xl px-3 py-3 focus-within:border-[#E87A5A]/60 transition-all bg-white">
                  <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <input
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); setLastShared(null); }}
                    onKeyDown={(e) => e.key === "Enter" && addShare()}
                    placeholder="email@exemplo.com"
                    className="flex-1 text-sm outline-none bg-transparent"
                    type="email"
                  />
                </div>

                {/* Role selector */}
                <div className="flex gap-2">
                  {[
                    { key: "viewer", icon: Eye, label: "Visualizador", desc: "Só pode ver" },
                    { key: "editor", icon: Shield, label: "Editor", desc: "Cria e edita" },
                  ].map((r) => (
                    <button
                      key={r.key}
                      onClick={() => setRole(r.key)}
                      className={`flex-1 flex flex-col items-start gap-1 px-3 py-3 rounded-2xl border-2 text-left transition-all ${
                        role === r.key
                          ? "border-[#E87A5A] bg-[#E87A5A]/5"
                          : "border-border hover:border-[#E87A5A]/40 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <r.icon className={`w-3.5 h-3.5 ${role === r.key ? "text-[#E87A5A]" : "text-muted-foreground"}`} />
                        <span className={`text-xs font-bold ${role === r.key ? "text-[#E87A5A]" : "text-foreground"}`}>{r.label}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">{r.desc}</span>
                    </button>
                  ))}
                </div>

                {/* Duration — prominent card */}
                <div className="bg-secondary/40 rounded-2xl p-4 border border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#E87A5A]" />
                      <span className="text-sm font-semibold text-foreground">Duração do acesso</span>
                    </div>
                    <button
                      onClick={() => setIndefinite(!indefinite)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                        indefinite ? "border-[#E87A5A] bg-[#E87A5A] text-white shadow-sm shadow-[#E87A5A]/30" : "border-border text-muted-foreground bg-white hover:border-[#E87A5A]/40"
                      }`}
                    >
                      <Infinity className="w-3.5 h-3.5" />
                      Indefinido
                    </button>
                  </div>
                  {!indefinite && (
                    <div className="flex items-center gap-3">
                      <div className="flex-1 flex items-center gap-2 bg-white rounded-xl border-2 border-border px-3 py-2 focus-within:border-[#E87A5A]/60 transition-all">
                        <input
                          type="number"
                          min={1}
                          max={52}
                          value={weeks}
                          onChange={(e) => setWeeks(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-14 text-2xl font-bold text-foreground outline-none bg-transparent text-center"
                        />
                        <span className="text-sm text-muted-foreground font-medium">semana{weeks !== 1 ? "s" : ""}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        {[1, 4, 12].map((w) => (
                          <button
                            key={w}
                            onClick={() => setWeeks(w)}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                              weeks === w ? "bg-[#E87A5A] text-white" : "bg-white border border-border text-muted-foreground hover:border-[#E87A5A]/40"
                            }`}
                          >
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

                <button
                  onClick={addShare}
                  disabled={adding || !email.trim()}
                  className="w-full py-3 rounded-2xl bg-[#E87A5A] text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#D4694A] transition-all disabled:opacity-50 shadow-lg shadow-[#E87A5A]/20"
                >
                  {adding
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> A partilhar…</>
                    : <><UserPlus className="w-4 h-4" /> Partilhar acesso</>}
                </button>
              </div>

              {/* Free plan notice */}
              {!isPro && (
                <div className="flex items-start gap-3 px-4 py-3 rounded-2xl bg-amber-50 border border-amber-100">
                  <Lock className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-amber-700">Plano gratuito</p>
                    <p className="text-[11px] text-amber-600 mt-0.5">No plano gratuito só podes aceder a planilhas partilhadas contigo. Para partilhar as tuas tarefas, faz upgrade.</p>
                  </div>
                </div>
              )}

              {/* Existing shares */}
              {(shares.length > 0 || loading) && (
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Com acesso</label>
                  {loading ? (
                    <div className="flex justify-center py-4"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>
                  ) : (
                    shares.map((s) => {
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
                          <select
                            value={s.role}
                            onChange={(e) => updateRole(s.id, e.target.value)}
                            className="text-[10px] font-semibold px-2 py-1 rounded-lg border border-border bg-white focus:outline-none focus:border-[#E87A5A] cursor-pointer"
                          >
                            <option value="viewer">Ver</option>
                            <option value="editor">Editar</option>
                          </select>
                          <button onClick={() => removeShare(s.id)} className="w-7 h-7 rounded-lg hover:bg-rose-50 hover:text-rose-500 flex items-center justify-center transition-all text-muted-foreground">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {!loading && shares.length === 0 && (
                <div className="text-center py-4 text-muted-foreground/60">
                  <Users className="w-7 h-7 mx-auto mb-1.5 opacity-40" />
                  <p className="text-xs">Ainda não partilhaste com ninguém</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
