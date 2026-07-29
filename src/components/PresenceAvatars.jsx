export default function PresenceAvatars({ presences, className = "" }) {
  if (!presences || presences.length === 0) return null;
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {presences.map((p) => (
        <div
          key={p.user_id}
          title={p.name}
          className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white select-none flex-shrink-0"
          style={{
            background: p.color,
            border: `2.5px solid ${p.color}`,
            boxShadow: `0 0 0 2px white, 0 0 0 3.5px ${p.color}44`,
          }}
        >
          {p.initials}
        </div>
      ))}
    </div>
  );
}
