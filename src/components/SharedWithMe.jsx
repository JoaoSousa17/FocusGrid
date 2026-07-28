import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Users, ArrowRight, Eye, Shield, Clock, Loader2, Inbox } from "lucide-react";
import { supabase } from "@/api/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function SharedWithMe({ open, onClose }) {
  const navigate = useNavigate();
  const [shares, setShares] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) load();
  }, [open]);

  const load = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch shares where current user is the recipient
      const { data } = await supabase
        .from("task_shares")
        .select("*")
        .eq("shared_with_email", user.email)
        .order("created_at", { ascending: false });

      if (!data?.length) { setShares([]); return; }

      // Enrich with owner profile info (email only — profiles table has no full_name)
      const ownerIds = [...new Set(data.map((s) => s.owner_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, email")
        .in("id", ownerIds);

      const profileMap = Object.fromEntries((profiles || []).map((p) => [p.id, p]));

      setShares(
        data.map((s) => ({
          ...s,
          ownerName: profileMap[s.owner_id]?.email || s.owner_id,
          ownerEmail: profileMap[s.owner_id]?.email || "",
        }))
      );
    } finally {
      setLoading(false);
    }
  };

  const formatExpiry = (expiresAt) => {
    if (!expiresAt) return null;
    const d = new Date(expiresAt);
    const now = new Date();
    const diff = Math.ceil((d - now) / (1000 * 60 * 60 * 24));
    if (diff < 0) return { label: "Expirado", expired: true };
    if (diff === 0) return { label: "Expira hoje", expired: false };
    if (diff <= 7) return { label: `${diff}d restantes`, expired: false };
    return { label: d.toLocaleDateString("pt-PT", { day: "numeric", month: "short" }), expired: false };
  };

  const openShared = (share) => {
    onClose();
    navigate(`/tasks/shared/${share.owner_id}`);
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
            className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-sm shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-border">
              <div className="w-9 h-9 rounded-2xl bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0">
                <Inbox className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-foreground text-base">Partilhadas comigo</h2>
                <p className="text-[11px] text-muted-foreground">Planilhas de outros utilizadores</p>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 max-h-[65vh] overflow-y-auto">
              {loading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                </div>
              ) : shares.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground/60">
                  <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">Nenhuma planilha partilhada</p>
                  <p className="text-xs mt-1">Quando alguém partilhar contigo, aparece aqui</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {shares.map((s) => {
                    const expiry = formatExpiry(s.expires_at);
                    const expired = expiry?.expired;
                    return (
                      <motion.div
                        key={s.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                          expired
                            ? "border-rose-100 bg-rose-50/40 opacity-60"
                            : "border-border bg-white hover:border-[#3B82F6]/30 hover:bg-[#3B82F6]/3"
                        }`}
                      >
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-2xl bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0 text-base font-bold text-[#3B82F6]">
                          {(s.ownerName || "?")[0].toUpperCase()}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{s.ownerName}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {s.role === "editor" ? (
                              <span className="flex items-center gap-1 text-[10px] text-[#E87A5A] font-medium">
                                <Shield className="w-3 h-3" /> Editor
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                                <Eye className="w-3 h-3" /> Visualizador
                              </span>
                            )}
                            {expiry && (
                              <>
                                <span className="text-muted-foreground/40">·</span>
                                <span className={`flex items-center gap-1 text-[10px] font-medium ${expired ? "text-rose-500" : "text-muted-foreground"}`}>
                                  <Clock className="w-3 h-3" /> {expiry.label}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Access button */}
                        {!expired && (
                          <button
                            onClick={() => openShared(s)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#3B82F6] text-white text-xs font-bold hover:bg-[#2F6FD8] transition-all shadow-sm shadow-[#3B82F6]/20 flex-shrink-0"
                          >
                            Aceder <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
