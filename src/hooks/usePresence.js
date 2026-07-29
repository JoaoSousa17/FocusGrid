import { useEffect, useState, useRef } from "react";
import { supabase } from "@/api/supabaseClient";

function randomHex() {
  const chars = "0123456789abcdef";
  let c = "#";
  for (let i = 0; i < 6; i++) c += chars[Math.floor(Math.random() * 16)];
  return c;
}

function initials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Returns list of OTHER users currently present on the channel.
// channelName must be stable (don't build inline) — use useMemo or a constant.
export function usePresence(channelName) {
  const [presences, setPresences] = useState([]);
  const myColor = useRef(randomHex());
  const channelRef = useRef(null);

  useEffect(() => {
    if (!channelName) return;
    let mounted = true;

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!mounted || !user) return;

      const myId = user.id;
      const name = user.user_metadata?.full_name || user.email?.split("@")[0] || "?";
      const myInitials = initials(name);
      const color = myColor.current;

      const ch = supabase.channel(channelName, {
        config: { presence: { key: myId } },
      });

      ch.on("presence", { event: "sync" }, () => {
        const state = ch.presenceState();
        const others = Object.entries(state)
          .filter(([key]) => key !== myId)
          .flatMap(([, arr]) => arr)
          .filter(Boolean);
        setPresences(others);
      });

      ch.subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await ch.track({ user_id: myId, name, initials: myInitials, color });
        }
      });

      channelRef.current = ch;
    });

    return () => {
      mounted = false;
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [channelName]);

  return presences;
}
