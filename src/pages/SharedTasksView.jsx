import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, Lock, ArrowLeft } from "lucide-react";
import { supabase } from "@/api/supabaseClient";
import TaskBoard from "./TaskBoard";

export default function SharedTasksView() {
  const { ownerId } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState("loading"); // "loading" | "denied" | "ok"
  const [role, setRole] = useState("viewer");
  const [ownerName, setOwnerName] = useState("");

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/"); return; }

      const { data: share, error } = await supabase
        .from("task_shares")
        .select("role, expires_at, owner_email")
        .eq("owner_id", ownerId)
        .eq("shared_with_email", user.email)
        .single();

      if (error || !share) { setState("denied"); return; }
      if (share.expires_at && new Date(share.expires_at) < new Date()) { setState("denied"); return; }

      setRole(share.role);
      setOwnerName(share.owner_email || ownerId);
      setState("ok");
    })();
  }, [ownerId]);

  if (state === "loading") {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (state === "denied") {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center gap-4 bg-background px-6">
        <div className="w-14 h-14 rounded-3xl bg-rose-50 flex items-center justify-center">
          <Lock className="w-6 h-6 text-rose-500" />
        </div>
        <div className="text-center">
          <p className="font-bold text-foreground text-lg">Acesso negado</p>
          <p className="text-sm text-muted-foreground mt-1">Esta planilha não está partilhada contigo ou o acesso expirou.</p>
        </div>
        <button onClick={() => navigate("/")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#3B82F6] text-white text-sm font-semibold hover:bg-[#2F6FD8] transition-all">
          <ArrowLeft className="w-4 h-4" /> Voltar ao início
        </button>
      </div>
    );
  }

  return (
    <TaskBoard
      sharedOwnerId={ownerId}
      sharedRole={role}
      sharedOwnerName={ownerName}
    />
  );
}
