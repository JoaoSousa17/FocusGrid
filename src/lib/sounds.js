// Web Audio API — biblioteca de 10 sons para as fases do Pomodoro

function makeCtx() {
  return new (window.AudioContext || window.webkitAudioContext)();
}

function playTone(ac, freq, type, start, duration, vol = 0.5) {
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.connect(gain);
  gain.connect(ac.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(vol, start);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
  osc.start(start);
  osc.stop(start + duration);
}

export const SOUND_LIBRARY = [
  { key: "bell",    label: "Sino",      icon: "🔔" },
  { key: "chime",   label: "Carrilhão", icon: "🎵" },
  { key: "gong",    label: "Gongo",     icon: "🥁" },
  { key: "piano",   label: "Piano",     icon: "🎹" },
  { key: "success", label: "Sucesso",   icon: "✨" },
  { key: "alert",   label: "Alerta",    icon: "⚡" },
  { key: "digital", label: "Digital",   icon: "💻" },
  { key: "pop",     label: "Pop",       icon: "💬" },
  { key: "soft",    label: "Suave",     icon: "🌸" },
  { key: "none",    label: "Sem som",   icon: "🔇" },
];

export function playSound(soundKey) {
  if (!soundKey || soundKey === "none") return;
  if (soundKey.startsWith("http")) {
    try { new Audio(soundKey).play(); } catch {}
    return;
  }
  try {
    const ac = makeCtx();
    const t = ac.currentTime;
    switch (soundKey) {
      case "bell":
        playTone(ac, 880, "sine", t, 1.6, 0.6);
        playTone(ac, 1760, "sine", t, 0.4, 0.15);
        break;
      case "chime":
        playTone(ac, 523, "sine", t, 0.8, 0.5);
        playTone(ac, 784, "sine", t + 0.3, 0.8, 0.5);
        playTone(ac, 1046, "sine", t + 0.6, 1.0, 0.5);
        break;
      case "gong":
        playTone(ac, 110, "sine", t, 3.0, 0.7);
        playTone(ac, 165, "sine", t + 0.05, 2.0, 0.3);
        break;
      case "piano":
        [261, 329, 392].forEach((f, i) => playTone(ac, f, "triangle", t + i * 0.1, 1.4, 0.4));
        break;
      case "success":
        [523, 659, 784, 1046].forEach((f, i) => playTone(ac, f, "sine", t + i * 0.12, 0.7, 0.45));
        break;
      case "alert":
        playTone(ac, 440, "square", t, 0.15, 0.3);
        playTone(ac, 660, "square", t + 0.2, 0.15, 0.3);
        playTone(ac, 880, "square", t + 0.4, 0.3, 0.3);
        break;
      case "digital":
        [0, 0.2, 0.4].forEach((d) => playTone(ac, 800, "square", t + d, 0.12, 0.25));
        break;
      case "pop":
        playTone(ac, 500, "sine", t, 0.08, 0.6);
        playTone(ac, 200, "sine", t + 0.03, 0.12, 0.3);
        break;
      case "soft":
        playTone(ac, 528, "sine", t, 2.5, 0.35);
        playTone(ac, 792, "sine", t + 0.5, 1.5, 0.15);
        break;
      default:
        break;
    }
    setTimeout(() => ac.close().catch(() => {}), 4000);
  } catch {}
}
