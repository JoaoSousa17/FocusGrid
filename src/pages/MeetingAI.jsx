import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Mic, MicOff, Loader2, Clock, Brain, X, SquareCheckBig, Sparkles,
  Upload, FileText, Download, CalendarRange, Link2, ChevronDown, Plus, Check, CheckCircle2
} from "lucide-react";
import { Deadline, Event, MeetingRecording, Task } from "@/api/entities";
import { Core, InvokeLLM } from "@/api/integrations";
import { format, addDays } from "date-fns";
import { pt } from "date-fns/locale";
import { useEdgeSwipeNav } from "@/hooks/useEdgeSwipeNav";

function MindMapNode({ node, depth = 0 }) {
  const colors = ["#E87A5A", "#8B5CF6", "#3B82F6", "#10B981", "#F59E0B"];
  const color = colors[depth % colors.length];
  const [open, setOpen] = useState(depth < 2);
  const hasChildren = node.children?.length > 0;

  return (
    <div className={`${depth > 0 ? "ml-4 border-l-2 pl-3 mt-1" : ""}`}
      style={{ borderColor: depth > 0 ? color + "50" : "transparent" }}>
      <div className="flex items-center gap-1.5 mb-1">
        <div className="px-2.5 py-1 rounded-xl text-[11px] font-semibold text-white flex-shrink-0 shadow-sm"
          style={{ backgroundColor: color + (depth === 0 ? "ee" : depth === 1 ? "cc" : "99") }}>
          {node.label}
        </div>
        {hasChildren && (
          <button onClick={() => setOpen(!open)} className="w-4 h-4 rounded-full bg-border flex items-center justify-center flex-shrink-0 hover:bg-border/80 transition-all">
            <span className="text-[8px] font-black text-muted-foreground">{open ? "−" : "+"}</span>
          </button>
        )}
      </div>
      {open && node.children?.map((child, i) => <MindMapNode key={i} node={child} depth={depth + 1} />)}
    </div>
  );
}

function formatDuration(seconds) {
  if (!seconds) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}min ${s}s` : `${s}s`;
}

function RecordingCard({ rec, events, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [linking, setLinking] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(rec.event_id || "");
  const [createdTasks, setCreatedTasks] = useState({});

  const linkEvent = async (eventId) => {
    const ev = events.find((e) => e.id === eventId);
    await MeetingRecording.update(rec.id, { event_id: eventId, event_name: ev?.name || "" });
    setLinking(false);
    setSelectedEvent(eventId);
  };

  const createTaskFromAction = async (action, idx) => {
    await Task.create({ title: action, status: "todo" }).catch(() => {});
    setCreatedTasks((prev) => ({ ...prev, [idx]: true }));
  };

  const linkedEvent = events.find((e) => e.id === (selectedEvent || rec.event_id));
  let actionItems = [];
  try { actionItems = JSON.parse(rec.action_items_json || "[]"); } catch {}
  let mindMap = null;
  try { mindMap = JSON.parse(rec.mind_map_json || "null"); } catch {}

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="h-0.5 bg-gradient-to-r from-[#E87A5A] to-[#8B5CF6]" />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-sm font-bold text-foreground leading-tight">{rec.title}</h3>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {rec.meeting_date && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-secondary text-[11px] text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {format(new Date(rec.meeting_date), "d MMM yyyy", { locale: pt })}
                </span>
              )}
              {rec.audio_duration_seconds > 0 && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-secondary text-[11px] text-muted-foreground">
                  <Mic className="w-3 h-3" /> {formatDuration(rec.audio_duration_seconds)}
                </span>
              )}
              {linkedEvent && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-purple-50 text-[11px] text-purple-600 font-medium">
                  <CalendarRange className="w-3 h-3" /> {linkedEvent.name}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {rec.pdf_url && (
              <a href={rec.pdf_url} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-[#E87A5A]/10 flex items-center justify-center text-[#E87A5A] hover:bg-[#E87A5A]/20 transition-all">
                <Download className="w-3.5 h-3.5" />
              </a>
            )}
            <button onClick={() => setLinking(!linking)}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${linking ? "bg-purple-100 text-purple-600" : "bg-secondary text-muted-foreground hover:text-purple-500"}`}>
              <Link2 className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setExpanded(!expanded)}
              className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
            </button>
            <button onClick={() => onDelete(rec.id)}
              className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-rose-500 hover:bg-rose-50 transition-all">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {linking && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-3 overflow-hidden">
              <p className="text-[11px] text-muted-foreground mb-2 font-medium">Associar a evento:</p>
              <div className="flex flex-wrap gap-1.5">
                <button onClick={() => linkEvent("")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${!selectedEvent ? "bg-secondary text-foreground" : "bg-secondary/50 text-muted-foreground hover:bg-secondary"}`}>
                  Nenhum
                </button>
                {events.map((ev) => (
                  <button key={ev.id} onClick={() => linkEvent(ev.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${selectedEvent === ev.id ? "bg-purple-100 text-purple-700" : "bg-secondary/50 text-muted-foreground hover:bg-secondary"}`}>
                    {ev.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {rec.summary && <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-2">{rec.summary}</p>}

        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-3 overflow-hidden space-y-2">
              {actionItems.length > 0 && (
                <div className="bg-secondary/50 rounded-xl p-3">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground/60 mb-2">Ações</p>
                  {actionItems.map((a, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-foreground mb-1.5">
                      <span className="w-4 h-4 rounded bg-[#E87A5A]/10 text-[#E87A5A] flex items-center justify-center text-[9px] font-black flex-shrink-0 mt-0.5">{i + 1}</span>
                      <span className="flex-1 leading-snug">{a}</span>
                      <button onClick={() => createTaskFromAction(a, i)}
                        className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-all ${createdTasks[i] ? "bg-emerald-100 text-emerald-600" : "bg-[#E87A5A]/10 text-[#E87A5A] hover:bg-[#E87A5A]/20"}`}
                        title="Criar tarefa">
                        {createdTasks[i] ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {rec.transcript && (
                <div className="bg-secondary/50 rounded-xl p-3">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground/60 mb-1">Transcrição</p>
                  <p className="text-xs text-muted-foreground leading-relaxed max-h-28 overflow-y-auto">{rec.transcript}</p>
                </div>
              )}
              {mindMap && mindMap.label && (
                <div className="bg-secondary/50 rounded-xl p-3">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground/60 mb-2">Mapa Mental</p>
                  <MindMapNode node={mindMap} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function MeetingAI() {
  const navigate = useNavigate();
  const [recording, setRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");
  const [result, setResult] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [recordings, setRecordings] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeSection, setActiveSection] = useState("record");
  const [savingTitle, setSavingTitle] = useState("");
  const [createdItems, setCreatedItems] = useState({});
  const [lastDuration, setLastDuration] = useState(0);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const timerRef = useRef(null);
  const { swipeHandlers, dragStyle } = useEdgeSwipeNav({ right: "/coming-soon" });

  const refreshRecordings = () => {
    MeetingRecording.list("-created_date", 50).then(setRecordings).catch(() => {});
  };

  useEffect(() => {
    refreshRecordings();
    Promise.all([Event.list("-start_datetime", 100), Deadline.list("-deadline", 100)]).then(([evts, dls]) => {
      setEvents([
        ...evts.map((e) => ({ ...e, _type: "event" })),
        ...dls.map((d) => ({ ...d, _type: "deadline", start_datetime: d.deadline })),
      ]);
    }).catch(() => {});
  }, []);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    chunks.current = [];
    mediaRecorder.current.ondataavailable = (e) => chunks.current.push(e.data);
    mediaRecorder.current.start();
    setRecording(true);
    setElapsed(0);
    timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
  };

  const stopRecording = () => {
    clearInterval(timerRef.current);
    setLastDuration(elapsed);
    return new Promise((resolve) => {
      mediaRecorder.current.onstop = () => resolve(new Blob(chunks.current, { type: "audio/webm" }));
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach((t) => t.stop());
      setRecording(false);
    });
  };

  const processAudio = async (audioBlob, durationSecs) => {
    setProcessing(true);
    try {
    setProcessingStep("A transcrever áudio...");
    const { file_url } = await Core.UploadFile({ file: audioBlob });
    const transcript = await Core.TranscribeAudio({ audio_url: file_url });

    setProcessingStep("A analisar com IA (Groq)...");
    const analysis = await InvokeLLM({
      prompt: `Analisa esta transcrição de reunião/brainstorm e extrai:
1. action_items: lista de tarefas/ações concretas mencionadas (máx 8)
2. deadlines: datas ou prazos mencionados, em texto (máx 5)
3. mind_map: mapa mental hierárquico dos temas principais (até 3 níveis)
4. summary: resumo em 2-3 frases
5. title: título curto e descritivo para esta reunião (máx 6 palavras)

Transcrição: """${transcript}"""

Responde em português de Portugal.`,
      response_json_schema: {
        type: "object",
        properties: {
          title: { type: "string" },
          summary: { type: "string" },
          action_items: { type: "array", items: { type: "string" } },
          deadlines: { type: "array", items: { type: "string" } },
          mind_map: {
            type: "object",
            properties: {
              label: { type: "string" },
              children: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    label: { type: "string" },
                    children: { type: "array", items: { type: "object", properties: { label: { type: "string" } } } }
                  }
                }
              }
            }
          }
        }
      }
    });
    setResult({ ...analysis, transcript, audio_duration_seconds: durationSecs || lastDuration });
    setSavingTitle(analysis.title || "Nova Reunião");
    } catch (err) {
      console.error("processAudio error:", err);
      setProcessingStep("Erro: " + (err.message || "Tenta novamente"));
      setTimeout(() => setProcessingStep(""), 4000);
    } finally {
      setProcessing(false);
    }
  };

  const handleToggleRecord = async () => {
    if (recording) {
      const blob = await stopRecording();
      await processAudio(blob, elapsed);
    } else {
      await startRecording();
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processAudio(file, 0);
    e.target.value = "";
  };

  const createActionTask = async (action, idx) => {
    await Task.create({ title: action, status: "todo" }).catch(() => {});
    setCreatedItems((prev) => ({ ...prev, [`task-${idx}`]: true }));
  };

  const createDeadlineFromText = async (text, idx) => {
    // Create with deadline 7 days from now by default (no natural-language parsing needed)
    const deadline = addDays(new Date(), 7);
    await Deadline.create({
      name: text,
      color: "amber",
      deadline: deadline.toISOString(),
      recurrence: "none",
      notify_before_hours: 24,
    }).catch(() => {});
    setCreatedItems((prev) => ({ ...prev, [`dl-${idx}`]: true }));
  };

  const saveRecording = async () => {
    if (!result) return;
    const content = `REUNIÃO IA - ${savingTitle}\nData: ${new Date().toLocaleDateString("pt-PT")}\n\nRESUMO\n${result.summary}\n\nAÇÕES\n${(result.action_items || []).map((a, i) => `${i + 1}. ${a}`).join("\n")}\n\nPRAZOS\n${(result.deadlines || []).join("\n") || "Nenhum"}\n\nTRANSCRIÇÃO\n${result.transcript}`;
    let pdfUrl = null;
    try {
      const { default: jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      const lines = doc.splitTextToSize(content, 180);
      let y = 15;
      doc.setFontSize(10);
      lines.forEach((line) => { if (y > 280) { doc.addPage(); y = 15; } doc.text(line, 15, y); y += 6; });
      const blob = doc.output("blob");
      const { file_url } = await Core.UploadFile({ file: blob });
      pdfUrl = file_url;
    } catch {}

    await MeetingRecording.create({
      title: savingTitle,
      summary: result.summary,
      transcript: result.transcript,
      action_items_json: JSON.stringify(result.action_items || []),
      deadlines_json: JSON.stringify(result.deadlines || []),
      mind_map_json: JSON.stringify(result.mind_map || {}),
      pdf_url: pdfUrl,
      audio_duration_seconds: result.audio_duration_seconds || 0,
      meeting_date: new Date().toISOString().split("T")[0],
    });

    setResult(null);
    setCreatedItems({});
    refreshRecordings();
    setActiveSection("recordings");
  };

  const deleteRecording = async (id) => {
    await MeetingRecording.delete(id).catch(() => {});
    refreshRecordings();
  };

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-cream flex flex-col select-none" {...swipeHandlers}>
      <div style={dragStyle} className="flex-1 flex flex-col">
        {/* Header */}
        <div className="px-5 pt-12 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/coming-soon")}
              className="w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[#E87A5A]/30 shadow-sm transition-all">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Reuniões IA</h1>
              <p className="text-xs text-muted-foreground">Groq · Whisper + Llama 3.3</p>
            </div>
          </div>
          {activeSection === "record" && (
            <label className="w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-[#E87A5A] hover:border-[#E87A5A]/30 shadow-sm transition-all cursor-pointer">
              <Upload className="w-4 h-4" />
              <input type="file" accept="audio/*,video/*" className="hidden" onChange={handleUpload} />
            </label>
          )}
        </div>

        {/* Tabs */}
        <div className="px-5 mb-4">
          <div className="flex bg-white rounded-2xl p-1.5 border border-border shadow-sm gap-1">
            <button onClick={() => setActiveSection("record")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeSection === "record" ? "bg-[#E87A5A] text-white shadow-md" : "text-muted-foreground hover:text-foreground"}`}>
              <Mic className="w-4 h-4" /> Gravar
            </button>
            <button onClick={() => setActiveSection("recordings")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeSection === "recordings" ? "bg-[#E87A5A] text-white shadow-md" : "text-muted-foreground hover:text-foreground"}`}>
              <FileText className="w-4 h-4" /> Gravações
              {recordings.length > 0 && <span className="bg-white/20 rounded-full px-1.5 text-xs">{recordings.length}</span>}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-5 pb-10 overflow-auto">
          {activeSection === "record" && (
            <>
              {!result && !processing && (
                <div className="flex flex-col items-center py-14 gap-6">
                  <motion.button onClick={handleToggleRecord} whileTap={{ scale: 0.95 }}
                    animate={recording ? { scale: [1, 1.06, 1] } : {}}
                    transition={recording ? { repeat: Infinity, duration: 1.2 } : {}}
                    className={`w-28 h-28 rounded-full flex items-center justify-center shadow-xl transition-all ${recording ? "bg-rose-500 shadow-rose-500/30" : "bg-[#E87A5A] shadow-[#E87A5A]/30 hover:bg-[#D4694A]"}`}>
                    {recording ? <MicOff className="w-12 h-12 text-white" /> : <Mic className="w-12 h-12 text-white" />}
                  </motion.button>

                  {recording ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-2">
                      <div className="flex gap-1 items-end h-8">
                        {[...Array(5)].map((_, i) => (
                          <motion.div key={i} animate={{ scaleY: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.15 }}
                            className="w-1.5 rounded-full bg-[#E87A5A] origin-bottom" style={{ height: 24 }} />
                        ))}
                      </div>
                      <span className="text-foreground text-sm font-mono font-bold">{formatTime(elapsed)}</span>
                      <p className="text-xs text-muted-foreground">Toca para parar e analisar</p>
                    </motion.div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm font-semibold text-foreground">Toca para gravar</p>
                      <p className="text-xs text-muted-foreground mt-1">ou usa o 📎 para carregar ficheiro (áudio ou vídeo)</p>
                    </div>
                  )}
                </div>
              )}

              {processing && (
                <div className="flex flex-col items-center py-16 gap-4">
                  <div className="w-20 h-20 rounded-[28px] bg-[#E87A5A]/10 flex items-center justify-center">
                    <Loader2 className="w-10 h-10 text-[#E87A5A] animate-spin" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">A analisar com IA...</p>
                  <p className="text-xs text-muted-foreground">{processingStep || "A extrair ações, prazos e mapa mental"}</p>
                </div>
              )}

              {result && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 pt-2">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-base font-black text-foreground flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#E87A5A]" /> Análise Completa
                    </h2>
                    <button onClick={() => setResult(null)}
                      className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-rose-500 transition-all">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Summary */}
                  <div className="bg-white rounded-2xl p-4 border border-border shadow-sm">
                    <p className="text-[11px] font-bold text-[#E87A5A] uppercase tracking-wide mb-2">Resumo</p>
                    <p className="text-sm text-foreground leading-relaxed">{result.summary}</p>
                  </div>

                  {/* Action items */}
                  {result.action_items?.length > 0 && (
                    <div className="bg-white rounded-2xl p-4 border border-border shadow-sm">
                      <p className="text-[11px] font-bold text-foreground uppercase tracking-wide mb-3 flex items-center gap-1.5">
                        <SquareCheckBig className="w-3.5 h-3.5 text-emerald-500" /> Ações
                        <span className="text-[10px] text-muted-foreground font-normal normal-case ml-1">· toca + para criar tarefa</span>
                      </p>
                      <div className="space-y-2">
                        {result.action_items.map((item, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-sm">
                            <div className="w-5 h-5 rounded-lg bg-[#E87A5A]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-[10px] font-black text-[#E87A5A]">{i + 1}</span>
                            </div>
                            <span className="text-foreground leading-snug flex-1">{item}</span>
                            <button onClick={() => createActionTask(item, i)}
                              className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-all ${createdItems[`task-${i}`] ? "bg-emerald-100 text-emerald-600" : "bg-secondary text-muted-foreground hover:bg-emerald-50 hover:text-emerald-600"}`}>
                              {createdItems[`task-${i}`] ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Deadlines */}
                  {result.deadlines?.length > 0 && (
                    <div className="bg-white rounded-2xl p-4 border border-border shadow-sm">
                      <p className="text-[11px] font-bold text-foreground uppercase tracking-wide mb-3 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-500" /> Prazos Mencionados
                        <span className="text-[10px] text-muted-foreground font-normal normal-case ml-1">· toca + para criar prazo (7 dias)</span>
                      </p>
                      <div className="space-y-2">
                        {result.deadlines.map((d, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="flex-1 px-3 py-1.5 rounded-2xl bg-secondary text-xs font-medium text-foreground border border-border">{d}</span>
                            <button onClick={() => createDeadlineFromText(d, i)}
                              className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${createdItems[`dl-${i}`] ? "bg-emerald-100 text-emerald-600" : "bg-secondary text-muted-foreground hover:bg-amber-50 hover:text-amber-600"}`}>
                              {createdItems[`dl-${i}`] ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mind map */}
                  {result.mind_map?.label && (
                    <div className="bg-white rounded-2xl p-4 border border-border shadow-sm">
                      <p className="text-[11px] font-bold text-foreground uppercase tracking-wide mb-3 flex items-center gap-1.5">
                        <Brain className="w-3.5 h-3.5 text-[#E87A5A]" /> Mapa Mental
                      </p>
                      <div className="overflow-auto">
                        <MindMapNode node={result.mind_map} />
                      </div>
                    </div>
                  )}

                  {/* Save */}
                  <div className="bg-white rounded-2xl p-4 border border-[#E87A5A]/20 shadow-sm">
                    <p className="text-[11px] font-bold text-[#E87A5A] uppercase tracking-wide mb-3">Guardar Gravação</p>
                    <input value={savingTitle} onChange={(e) => setSavingTitle(e.target.value)}
                      placeholder="Título da reunião..."
                      className="w-full px-3 py-2.5 rounded-xl bg-secondary/60 text-sm font-medium outline-none focus:bg-white transition-all mb-3" />
                    <button onClick={saveRecording}
                      className="w-full py-3 rounded-2xl bg-[#E87A5A] text-white text-sm font-bold hover:bg-[#D4694A] shadow-lg shadow-[#E87A5A]/25 transition-all flex items-center justify-center gap-2">
                      <FileText className="w-4 h-4" /> Guardar + Gerar PDF
                    </button>
                  </div>

                  <button onClick={() => setResult(null)}
                    className="w-full py-3 rounded-2xl bg-secondary text-muted-foreground text-sm font-medium hover:bg-border transition-all flex items-center justify-center gap-2">
                    <X className="w-4 h-4" /> Descartar
                  </button>
                </motion.div>
              )}
            </>
          )}

          {activeSection === "recordings" && (
            <div className="space-y-3">
              {recordings.length === 0 ? (
                <div className="text-center py-20">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground/20" />
                  <p className="text-muted-foreground text-sm font-medium">Sem gravações guardadas</p>
                  <p className="text-muted-foreground/50 text-xs mt-1">Grava uma reunião para começar</p>
                </div>
              ) : (
                recordings.map((rec) => <RecordingCard key={rec.id} rec={rec} events={events} onDelete={deleteRecording} />)
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
