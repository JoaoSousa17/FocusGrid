import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mic, MicOff, Loader2, Clock, Brain, X, SquareCheckBig, Sparkles, Upload, FileText, Download, CalendarRange, Link2, Check, ChevronDown } from "lucide-react";
import { Deadline, Event, MeetingRecording } from "@/api/entities";
import { Core, InvokeLLM } from "@/api/integrations";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

function MindMapNode({ node, depth = 0, "data-collection-item-id": __dataCollectionItemId }) {
  const colors = ["#E87A5A", "#8B5CF6", "#3B82F6", "#10B981", "#F59E0B"];
  const color = colors[depth % colors.length];
  return (
    <div data-source-location="pages/MeetingAI:13:4" data-dynamic-content="true" className={`flex flex-col items-start ${depth > 0 ? "ml-5 border-l-2 pl-3" : ""}`}
    style={{ borderColor: depth > 0 ? color + "40" : "transparent" }} data-collection-id="node" data-collection-item-id={__dataCollectionItemId}>
      <div data-source-location="pages/MeetingAI:15:6" data-dynamic-content="true" className="px-3 py-1.5 rounded-xl text-xs font-semibold mb-1.5 text-white shadow-sm"
      style={{ backgroundColor: color + (depth === 0 ? "ee" : "99") }} data-collection-item-field="label" data-collection-item-id={node?.id || node?._id}>
        {node.label}
      </div>
      {node.children?.map((child, i) => <MindMapNode data-source-location="pages/MeetingAI:19:40" data-dynamic-content="true" key={i} node={child} depth={depth + 1} />)}
    </div>);

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

  const linkEvent = async (eventId) => {
    const ev = events.find((e) => e.id === eventId);
    await MeetingRecording.update(rec.id, {
      event_id: eventId,
      event_name: ev?.name || ""
    });
    setLinking(false);
    setSelectedEvent(eventId);
  };

  const linkedEvent = events.find((e) => e.id === (selectedEvent || rec.event_id));

  return (
    <motion.div data-source-location="pages/MeetingAI:49:4" data-dynamic-content="true" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
      <div data-source-location="pages/MeetingAI:51:6" data-dynamic-content="false" className="h-0.5 bg-gradient-to-r from-[#E87A5A] to-[#8B5CF6]" />
      <div data-source-location="pages/MeetingAI:52:6" data-dynamic-content="true" className="p-4" data-collection-item-field="summary" data-collection-item-id={rec?.id || rec?._id}>
        <div data-source-location="pages/MeetingAI:53:8" data-dynamic-content="true" className="flex items-start justify-between gap-2">
          <div data-source-location="pages/MeetingAI:54:10" data-dynamic-content="true" className="flex-1">
            <h3 data-source-location="pages/MeetingAI:55:12" data-dynamic-content="true" className="text-sm font-bold text-foreground leading-tight" data-collection-item-field="title" data-collection-item-id={rec?.id || rec?._id}>{rec.title}</h3>
            <div data-source-location="pages/MeetingAI:56:12" data-dynamic-content="true" className="flex flex-wrap gap-1.5 mt-1.5" data-collection-item-field="meeting_date" data-collection-item-id={rec?.id || rec?._id}>
              {rec.meeting_date &&
              <span data-source-location="pages/MeetingAI:58:16" data-dynamic-content="true" className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-secondary text-[11px] text-muted-foreground">
                  <Clock data-source-location="pages/MeetingAI:59:18" data-dynamic-content="false" className="w-3 h-3" />
                  {format(new Date(rec.meeting_date), "d MMM yyyy", { locale: pt })}
                </span>
              }
              {rec.audio_duration_seconds > 0 &&
              <span data-source-location="pages/MeetingAI:64:16" data-dynamic-content="true" className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-secondary text-[11px] text-muted-foreground">
                  <Mic data-source-location="pages/MeetingAI:65:18" data-dynamic-content="false" className="w-3 h-3" /> {formatDuration(rec.audio_duration_seconds)}
                </span>
              }
              {linkedEvent &&
              <span data-source-location="pages/MeetingAI:69:16" data-dynamic-content="true" className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-purple-50 text-[11px] text-purple-600 font-medium" data-collection-item-field="name" data-collection-item-id={linkedEvent?.id || linkedEvent?._id}>
                  <CalendarRange data-source-location="pages/MeetingAI:70:18" data-dynamic-content="false" className="w-3 h-3" /> {linkedEvent.name}
                </span>
              }
            </div>
          </div>
          <div data-source-location="pages/MeetingAI:75:10" data-dynamic-content="true" className="flex items-center gap-1.5 flex-shrink-0" data-collection-item-field="pdf_url" data-collection-item-id={rec?.id || rec?._id}>
            {rec.pdf_url &&
            <a data-source-location="pages/MeetingAI:77:14" data-dynamic-content="true" href={rec.pdf_url} target="_blank" rel="noopener noreferrer"
            className="w-8 h-8 rounded-xl bg-[#E87A5A]/10 flex items-center justify-center text-[#E87A5A] hover:bg-[#E87A5A]/20 transition-all"
            title="Download PDF">
                <Download data-source-location="pages/MeetingAI:80:16" data-dynamic-content="false" className="w-3.5 h-3.5" />
              </a>
            }
            <button data-source-location="pages/MeetingAI:83:12" data-dynamic-content="true" onClick={() => setLinking(!linking)}
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
            linking ? "bg-purple-100 text-purple-600" : "bg-secondary text-muted-foreground hover:text-purple-500"}`
            } title="Associar evento">
              <Link2 data-source-location="pages/MeetingAI:87:14" data-dynamic-content="false" className="w-3.5 h-3.5" />
            </button>
            <button data-source-location="pages/MeetingAI:89:12" data-dynamic-content="true" onClick={() => setExpanded(!expanded)}
            className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
              <ChevronDown data-source-location="pages/MeetingAI:91:14" data-dynamic-content="true" className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
            </button>
            <button data-source-location="pages/MeetingAI:93:12" data-dynamic-content="true" onClick={() => onDelete(rec.id)}
            className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-rose-500 hover:bg-rose-50 transition-all">
              <X data-source-location="pages/MeetingAI:95:14" data-dynamic-content="false" className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Link event picker */}
        <AnimatePresence data-source-location="pages/MeetingAI:101:8" data-dynamic-content="true">
          {linking &&
          <motion.div data-source-location="pages/MeetingAI:103:12" data-dynamic-content="true" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
          className="mt-3 overflow-hidden">
              <p data-source-location="pages/MeetingAI:105:14" data-dynamic-content="false" className="text-[11px] text-muted-foreground mb-2 font-medium">Associar a evento:</p>
              <div data-source-location="pages/MeetingAI:106:14" data-dynamic-content="true" className="flex flex-wrap gap-1.5" data-collection-id="events">
                <button data-source-location="pages/MeetingAI:107:16" data-dynamic-content="true" onClick={() => linkEvent("")}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              !selectedEvent ? "bg-secondary text-foreground" : "bg-secondary/50 text-muted-foreground hover:bg-secondary"}`
              }>
                  Nenhum
                </button>
                {events.map((ev) =>
              <button data-source-location="pages/MeetingAI:114:18" data-dynamic-content="true" key={ev.id} onClick={() => linkEvent(ev.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedEvent === ev.id ? "bg-purple-100 text-purple-700" : "bg-secondary/50 text-muted-foreground hover:bg-secondary"}`
              } data-collection-item-id={ev?.id} data-collection-item-field="name">
                    {ev.name}
                  </button>
              )}
              </div>
            </motion.div>
          }
        </AnimatePresence>

        {/* Summary */}
        {rec.summary &&
        <p data-source-location="pages/MeetingAI:128:10" data-dynamic-content="true" className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-2" data-collection-item-field="summary" data-collection-item-id={rec?.id || rec?._id}>{rec.summary}</p>
        }

        {/* Expanded details */}
        <AnimatePresence data-source-location="pages/MeetingAI:132:8" data-dynamic-content="true">
          {expanded &&
          <motion.div data-source-location="pages/MeetingAI:134:12" data-dynamic-content="true" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
          className="mt-3 overflow-hidden space-y-2" data-collection-item-field="transcript" data-collection-item-id={rec?.id || rec?._id}>
              {(() => {
              let actionItems = [];
              try {actionItems = JSON.parse(rec.action_items_json || "[]");} catch {}
              return actionItems.length > 0 &&
              <div data-source-location="pages/MeetingAI:140:18" data-dynamic-content="true" className="bg-secondary/50 rounded-xl p-3">
                    <p data-source-location="pages/MeetingAI:141:20" data-dynamic-content="false" className="text-[10px] font-bold uppercase text-muted-foreground/60 mb-2">Ações</p>
                    {actionItems.map((a, i) =>
                <div data-source-location="pages/MeetingAI:143:22" data-dynamic-content="true" key={i} className="flex items-start gap-2 text-xs text-foreground mb-1" data-arr-index={i} data-arr-variable-name="actionItems">
                        <span data-source-location="pages/MeetingAI:144:24" data-dynamic-content="true" className="w-4 h-4 rounded bg-[#E87A5A]/10 text-[#E87A5A] flex items-center justify-center text-[9px] font-black flex-shrink-0" data-arr-index={i} data-arr-variable-name="actionItems">{i + 1}</span>
                        {a}
                      </div>
                )}
                  </div>;

            })()}
              {rec.transcript &&
            <div data-source-location="pages/MeetingAI:152:16" data-dynamic-content="true" className="bg-secondary/50 rounded-xl p-3">
                  <p data-source-location="pages/MeetingAI:153:18" data-dynamic-content="false" className="text-[10px] font-bold uppercase text-muted-foreground/60 mb-1">Transcrição</p>
                  <p data-source-location="pages/MeetingAI:154:18" data-dynamic-content="true" className="text-xs text-muted-foreground leading-relaxed max-h-28 overflow-y-auto" data-collection-item-field="transcript" data-collection-item-id={rec?.id || rec?._id}>{rec.transcript}</p>
                </div>
            }
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </motion.div>);

}

export default function MeetingAI() {
  const navigate = useNavigate();
  const [recording, setRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [recordings, setRecordings] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeSection, setActiveSection] = useState("record");
  const [savingTitle, setSavingTitle] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [lastDuration, setLastDuration] = useState(0);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const timerRef = useRef(null);
  const touchStart = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const [dragStyle, setDragStyle] = useState({});

  const refreshRecordings = () => {
    MeetingRecording.list("-created_date", 50).then(setRecordings).catch(() => {});
  };

  useEffect(() => {
    refreshRecordings();
    // Load all events and deadlines for linking
    Promise.all([
    Event.list("-start_datetime", 100),
    Deadline.list("-deadline", 100)]
    ).then(([evts, dls]) => {
      setEvents([
      ...evts.map((e) => ({ ...e, _type: "event" })),
      ...dls.map((d) => ({ ...d, _type: "deadline", start_datetime: d.deadline }))]
      );
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
    const { file_url } = await Core.UploadFile({ file: audioBlob });
    const transcript = await Core.TranscribeAudio({ audio_url: file_url });

    const analysis = await InvokeLLM({
      prompt: `Analisa esta transcrição de reunião/brainstorm e extrai:
1. action_items: lista de tarefas/ações concretas mencionadas (máx 8)
2. deadlines: datas ou prazos mencionados (máx 5)
3. mind_map: mapa mental hierárquico dos temas principais
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
              children: { type: "array", items: {
                  type: "object",
                  properties: {
                    label: { type: "string" },
                    children: { type: "array", items: { type: "object", properties: { label: { type: "string" } } } }
                  }
                } }
            }
          }
        }
      }
    });
    setResult({ ...analysis, transcript, audio_duration_seconds: durationSecs || lastDuration });
    setSavingTitle(analysis.title || "Nova Reunião");
    setProcessing(false);
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
    setProcessing(true);
    await processAudio(file, 0);
  };

  const generateAndSavePdf = async () => {
    if (!result) return;
    // Generate PDF content as text-based download
    const content = `REUNIÃO IA - ${savingTitle}
Data: ${new Date().toLocaleDateString("pt-PT")}
Duração: ${formatDuration(result.audio_duration_seconds)}

═══════════════════════════════
RESUMO
═══════════════════════════════
${result.summary}

═══════════════════════════════
AÇÕES A TOMAR
═══════════════════════════════
${(result.action_items || []).map((a, i) => `${i + 1}. ${a}`).join("\n")}

═══════════════════════════════
PRAZOS MENCIONADOS
═══════════════════════════════
${(result.deadlines || []).join("\n") || "Nenhum"}

═══════════════════════════════
TRANSCRIÇÃO COMPLETA
═══════════════════════════════
${result.transcript}
`;

    // Save as a blob URL for download - use jspdf if available, otherwise text
    let pdfUrl = null;
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      const lines = doc.splitTextToSize(content, 180);
      let y = 15;
      doc.setFontSize(10);
      lines.forEach((line) => {
        if (y > 280) {doc.addPage();y = 15;}
        doc.text(line, 15, y);
        y += 6;
      });
      const blob = doc.output("blob");
      const { file_url } = await Core.UploadFile({ file: blob });
      pdfUrl = file_url;
    } catch {

      // fallback: store as text
    }
    // Save to entity
    await MeetingRecording.create({
      title: savingTitle,
      summary: result.summary,
      transcript: result.transcript,
      action_items_json: JSON.stringify(result.action_items || []),
      deadlines_json: JSON.stringify(result.deadlines || []),
      mind_map_json: JSON.stringify(result.mind_map || {}),
      pdf_url: pdfUrl,
      audio_duration_seconds: result.audio_duration_seconds || 0,
      meeting_date: new Date().toISOString().split("T")[0]
    });

    setResult(null);
    setShowSaveModal(false);
    refreshRecordings();
    setActiveSection("recordings");
  };

  const deleteRecording = async (id) => {
    await MeetingRecording.delete(id).catch(() => {});
    refreshRecordings();
  };

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const handlePointerStart = useCallback((x, y) => {touchStart.current = { x, y };dragOffset.current = { x: 0, y: 0 };setDragStyle({});}, []);
  const handlePointerMove = useCallback((x, y) => {
    dragOffset.current = { x: x - touchStart.current.x, y: y - touchStart.current.y };
    setDragStyle({ transform: `translate(${dragOffset.current.x}px, ${dragOffset.current.y}px)`, transition: "none" });
  }, []);
  const handlePointerEnd = useCallback((x, y) => {
    setDragStyle({ transform: "translate(0, 0)", transition: "transform 0.3s ease-out" });
    const dx = x - touchStart.current.x;
    if (Math.abs(dx) > 60 && dx > 0) navigate("/coming-soon");
  }, [navigate]);

  return (
    <div data-source-location="pages/MeetingAI:370:4" data-dynamic-content="true" className="min-h-screen bg-cream flex flex-col select-none"
    onTouchStart={(e) => handlePointerStart(e.touches[0].clientX, e.touches[0].clientY)}
    onTouchMove={(e) => handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)}
    onTouchEnd={(e) => handlePointerEnd(e.changedTouches[0]?.clientX || touchStart.current.x, e.changedTouches[0]?.clientY || touchStart.current.y)}
    onMouseDown={(e) => handlePointerStart(e.clientX, e.clientY)}
    onMouseMove={(e) => {if (e.buttons === 1) handlePointerMove(e.clientX, e.clientY);}}
    onMouseUp={(e) => handlePointerEnd(e.clientX, e.clientY)}>
      
      <div data-source-location="pages/MeetingAI:378:6" data-dynamic-content="true" style={dragStyle} className="flex-1 flex flex-col">
        {/* Header */}
        <div data-source-location="pages/MeetingAI:380:8" data-dynamic-content="true" className="px-5 pt-12 pb-4 flex items-center justify-between">
          <div data-source-location="pages/MeetingAI:381:10" data-dynamic-content="true" className="flex items-center gap-3">
            <button data-source-location="pages/MeetingAI:382:12" data-dynamic-content="true" onClick={() => navigate("/coming-soon")}
            className="w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[#E87A5A]/30 shadow-sm transition-all">
              <ArrowRight data-source-location="pages/MeetingAI:384:14" data-dynamic-content="false" className="w-5 h-5" />
            </button>
            <div data-source-location="pages/MeetingAI:386:12" data-dynamic-content="false">
              <h1 data-source-location="pages/MeetingAI:387:14" data-dynamic-content="false" className="text-xl font-bold text-foreground">Reuniões IA</h1>
              <p data-source-location="pages/MeetingAI:388:14" data-dynamic-content="false" className="text-xs text-muted-foreground">Grava e obtém resumo automático</p>
            </div>
          </div>
          {activeSection === "record" &&
          <label data-source-location="pages/MeetingAI:392:12" data-dynamic-content="true" className="w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-[#E87A5A] hover:border-[#E87A5A]/30 shadow-sm transition-all cursor-pointer">
              <Upload data-source-location="pages/MeetingAI:393:14" data-dynamic-content="false" className="w-4 h-4" />
              <input data-source-location="pages/MeetingAI:394:14" data-dynamic-content="true" type="file" accept="audio/*" className="hidden" onChange={handleUpload} />
            </label>
          }
        </div>

        {/* Section tabs */}
        <div data-source-location="pages/MeetingAI:400:8" data-dynamic-content="true" className="px-5 mb-4">
          <div data-source-location="pages/MeetingAI:401:10" data-dynamic-content="true" className="flex bg-white rounded-2xl p-1.5 border border-border shadow-sm gap-1">
            <button data-source-location="pages/MeetingAI:402:12" data-dynamic-content="true" onClick={() => setActiveSection("record")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeSection === "record" ? "bg-[#E87A5A] text-white shadow-md" : "text-muted-foreground hover:text-foreground"}`
            }>
              <Mic data-source-location="pages/MeetingAI:406:14" data-dynamic-content="false" className="w-4 h-4" /> Gravar
            </button>
            <button data-source-location="pages/MeetingAI:408:12" data-dynamic-content="true" onClick={() => setActiveSection("recordings")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeSection === "recordings" ? "bg-[#E87A5A] text-white shadow-md" : "text-muted-foreground hover:text-foreground"}`
            }>
              <FileText data-source-location="pages/MeetingAI:412:14" data-dynamic-content="false" className="w-4 h-4" /> Gravações
              {recordings.length > 0 &&
              <span data-source-location="pages/MeetingAI:414:16" data-dynamic-content="true" className="bg-white/20 rounded-full px-1.5 text-xs">{recordings.length}</span>
              }
            </button>
          </div>
        </div>

        {/* Content */}
        <div data-source-location="pages/MeetingAI:421:8" data-dynamic-content="true" className="flex-1 px-5 pb-10 overflow-auto">
          {activeSection === "record" &&
          <>
              {!result && !processing &&
            <div data-source-location="pages/MeetingAI:425:16" data-dynamic-content="true" className="flex flex-col items-center py-14 gap-6">
                  <motion.button data-source-location="pages/MeetingAI:426:18" data-dynamic-content="true"
              onClick={handleToggleRecord}
              whileTap={{ scale: 0.95 }}
              animate={recording ? { scale: [1, 1.06, 1] } : {}}
              transition={recording ? { repeat: Infinity, duration: 1.2 } : {}}
              className={`w-28 h-28 rounded-full flex items-center justify-center shadow-xl transition-all ${
              recording ? "bg-rose-500 shadow-rose-500/30" : "bg-[#E87A5A] shadow-[#E87A5A]/30 hover:bg-[#D4694A]"}`
              }>
                    {recording ? <MicOff data-source-location="pages/MeetingAI:434:33" data-dynamic-content="false" className="w-12 h-12 text-white" /> : <Mic data-source-location="pages/MeetingAI:434:79" data-dynamic-content="false" className="w-12 h-12 text-white" />}
                  </motion.button>

                  {recording ?
              <motion.div data-source-location="pages/MeetingAI:438:20" data-dynamic-content="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-2">
                      <div data-source-location="pages/MeetingAI:439:22" data-dynamic-content="true" className="flex gap-1 items-end h-8">
                        {[...Array(5)].map((_, i) =>
                  <motion.div data-source-location="pages/MeetingAI:441:26" data-dynamic-content="true" key={i}
                  animate={{ scaleY: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.15 }}
                  className="w-1.5 rounded-full bg-[#E87A5A] origin-bottom"
                  style={{ height: 24 }} data-arr-index={i} />
                  )}
                      </div>
                      <span data-source-location="pages/MeetingAI:448:22" data-dynamic-content="true" className="text-foreground text-sm font-mono font-bold">{formatTime(elapsed)}</span>
                      <p data-source-location="pages/MeetingAI:449:22" data-dynamic-content="false" className="text-xs text-muted-foreground">Toca para parar e analisar</p>
                    </motion.div> :

              <div data-source-location="pages/MeetingAI:452:20" data-dynamic-content="false" className="text-center">
                      <p data-source-location="pages/MeetingAI:453:22" data-dynamic-content="false" className="text-sm font-semibold text-foreground">Toca para gravar</p>
                      <p data-source-location="pages/MeetingAI:454:22" data-dynamic-content="false" className="text-xs text-muted-foreground mt-1">ou usa o 📎 para carregar ficheiro</p>
                    </div>
              }
                </div>
            }

              {processing &&
            <div data-source-location="pages/MeetingAI:461:16" data-dynamic-content="false" className="flex flex-col items-center py-16 gap-4">
                  <div data-source-location="pages/MeetingAI:462:18" data-dynamic-content="false" className="w-20 h-20 rounded-[28px] bg-[#E87A5A]/10 flex items-center justify-center">
                    <Loader2 data-source-location="pages/MeetingAI:463:20" data-dynamic-content="false" className="w-10 h-10 text-[#E87A5A] animate-spin" />
                  </div>
                  <p data-source-location="pages/MeetingAI:465:18" data-dynamic-content="false" className="text-sm font-semibold text-foreground">A analisar com IA...</p>
                  <p data-source-location="pages/MeetingAI:466:18" data-dynamic-content="false" className="text-xs text-muted-foreground">A extrair ações, prazos e mapa mental</p>
                </div>
            }

              {result &&
            <motion.div data-source-location="pages/MeetingAI:471:16" data-dynamic-content="true" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 pt-2" data-collection-item-field="mind_map" data-collection-item-id={result?.id || result?._id}>
                  <div data-source-location="pages/MeetingAI:472:18" data-dynamic-content="true" className="flex items-center justify-between mb-1">
                    <h2 data-source-location="pages/MeetingAI:473:20" data-dynamic-content="false" className="text-base font-black text-foreground flex items-center gap-2">
                      <Sparkles data-source-location="pages/MeetingAI:474:22" data-dynamic-content="false" className="w-4 h-4 text-[#E87A5A]" /> Análise Completa
                    </h2>
                    <button data-source-location="pages/MeetingAI:476:20" data-dynamic-content="true" onClick={() => setResult(null)}
                className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-rose-500 transition-all">
                      <X data-source-location="pages/MeetingAI:478:22" data-dynamic-content="false" className="w-4 h-4" />
                    </button>
                  </div>

                  <div data-source-location="pages/MeetingAI:482:18" data-dynamic-content="true" className="bg-white rounded-2xl p-4 border border-border shadow-sm">
                    <p data-source-location="pages/MeetingAI:483:20" data-dynamic-content="false" className="text-[11px] font-bold text-[#E87A5A] uppercase tracking-wide mb-2">Resumo</p>
                    <p data-source-location="pages/MeetingAI:484:20" data-dynamic-content="true" className="text-sm text-foreground leading-relaxed" data-collection-item-field="summary" data-collection-item-id={result?.id || result?._id}>{result.summary}</p>
                  </div>

                  {result.action_items?.length > 0 &&
              <div data-source-location="pages/MeetingAI:488:20" data-dynamic-content="true" className="bg-white rounded-2xl p-4 border border-border shadow-sm">
                      <p data-source-location="pages/MeetingAI:489:22" data-dynamic-content="false" className="text-[11px] font-bold text-foreground uppercase tracking-wide mb-3 flex items-center gap-1.5">
                        <SquareCheckBig data-source-location="pages/MeetingAI:490:24" data-dynamic-content="false" className="w-3.5 h-3.5 text-emerald-500" /> Ações
                      </p>
                      <div data-source-location="pages/MeetingAI:492:22" data-dynamic-content="true" className="space-y-2" data-collection-item-field="action_items" data-collection-item-id={result?.id || result?._id}>
                        {result.action_items.map((item, i) =>
                  <div data-source-location="pages/MeetingAI:494:26" data-dynamic-content="true" key={i} className="flex items-start gap-2.5 text-sm">
                            <div data-source-location="pages/MeetingAI:495:28" data-dynamic-content="true" className="w-5 h-5 rounded-lg bg-[#E87A5A]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span data-source-location="pages/MeetingAI:496:30" data-dynamic-content="true" className="text-[10px] font-black text-[#E87A5A]">{i + 1}</span>
                            </div>
                            <span data-source-location="pages/MeetingAI:498:28" data-dynamic-content="true" className="text-foreground leading-snug" data-collection-item-field="item">{item}</span>
                          </div>
                  )}
                      </div>
                    </div>
              }

                  {result.deadlines?.length > 0 &&
              <div data-source-location="pages/MeetingAI:506:20" data-dynamic-content="true" className="bg-white rounded-2xl p-4 border border-border shadow-sm">
                      <p data-source-location="pages/MeetingAI:507:22" data-dynamic-content="false" className="text-[11px] font-bold text-foreground uppercase tracking-wide mb-3 flex items-center gap-1.5">
                        <Clock data-source-location="pages/MeetingAI:508:24" data-dynamic-content="false" className="w-3.5 h-3.5 text-amber-500" /> Prazos Mencionados
                      </p>
                      <div data-source-location="pages/MeetingAI:510:22" data-dynamic-content="true" className="flex flex-wrap gap-2" data-collection-item-field="deadlines" data-collection-item-id={result?.id || result?._id}>
                        {result.deadlines.map((d, i) =>
                  <span data-source-location="pages/MeetingAI:512:26" data-dynamic-content="true" key={i} className="px-3 py-1.5 rounded-2xl bg-secondary text-xs font-medium text-foreground border border-border" data-collection-item-field="d">{d}</span>
                  )}
                      </div>
                    </div>
              }

                  {result.mind_map &&
              <div data-source-location="pages/MeetingAI:519:20" data-dynamic-content="true" className="bg-white rounded-2xl p-4 border border-border shadow-sm">
                      <p data-source-location="pages/MeetingAI:520:22" data-dynamic-content="false" className="text-[11px] font-bold text-foreground uppercase tracking-wide mb-3 flex items-center gap-1.5">
                        <Brain data-source-location="pages/MeetingAI:521:24" data-dynamic-content="false" className="w-3.5 h-3.5 text-[#E87A5A]" /> Mapa Mental
                      </p>
                      <div data-source-location="pages/MeetingAI:523:22" data-dynamic-content="true" className="overflow-auto">
                        <MindMapNode data-source-location="pages/MeetingAI:524:24" data-dynamic-content="true" node={result.mind_map} />
                      </div>
                    </div>
              }

                  {/* Save section */}
                  <div data-source-location="pages/MeetingAI:530:18" data-dynamic-content="true" className="bg-white rounded-2xl p-4 border border-[#E87A5A]/20 shadow-sm">
                    <p data-source-location="pages/MeetingAI:531:20" data-dynamic-content="false" className="text-[11px] font-bold text-[#E87A5A] uppercase tracking-wide mb-3">Guardar Gravação</p>
                    <input data-source-location="pages/MeetingAI:532:20" data-dynamic-content="true" value={savingTitle} onChange={(e) => setSavingTitle(e.target.value)}
                placeholder="Título da reunião..."
                className="w-full px-3 py-2.5 rounded-xl bg-secondary/60 text-sm font-medium outline-none focus:bg-white transition-all mb-3" />
                    <button data-source-location="pages/MeetingAI:535:20" data-dynamic-content="true" onClick={generateAndSavePdf}
                className="w-full py-3 rounded-2xl bg-[#E87A5A] text-white text-sm font-bold hover:bg-[#D4694A] shadow-lg shadow-[#E87A5A]/25 transition-all flex items-center justify-center gap-2">
                      <FileText data-source-location="pages/MeetingAI:537:22" data-dynamic-content="false" className="w-4 h-4" /> Guardar + Gerar PDF
                    </button>
                  </div>

                  <button data-source-location="pages/MeetingAI:541:18" data-dynamic-content="true" onClick={() => setResult(null)}
              className="w-full py-3 rounded-2xl bg-secondary text-muted-foreground text-sm font-medium hover:bg-border transition-all flex items-center justify-center gap-2">
                    <X data-source-location="pages/MeetingAI:543:20" data-dynamic-content="false" className="w-4 h-4" /> Descartar
                  </button>
                </motion.div>
            }
            </>
          }

          {activeSection === "recordings" &&
          <div data-source-location="pages/MeetingAI:551:12" data-dynamic-content="true" className="space-y-3" data-collection-id="MeetingRecording">
              {recordings.length === 0 ?
            <div data-source-location="pages/MeetingAI:553:16" data-dynamic-content="false" className="text-center py-20">
                  <FileText data-source-location="pages/MeetingAI:554:18" data-dynamic-content="false" className="w-12 h-12 mx-auto mb-3 text-muted-foreground/20" />
                  <p data-source-location="pages/MeetingAI:555:18" data-dynamic-content="false" className="text-muted-foreground text-sm font-medium">Sem gravações guardadas</p>
                  <p data-source-location="pages/MeetingAI:556:18" data-dynamic-content="false" className="text-muted-foreground/50 text-xs mt-1">Grava uma reunião para começar</p>
                </div> :

            recordings.map((rec) =>
            <RecordingCard data-source-location="pages/MeetingAI:560:18" data-dynamic-content="true" key={rec.id} rec={rec} events={events} onDelete={deleteRecording} data-collection-item-id={rec?.id} />
            )
            }
            </div>
          }
        </div>
      </div>
    </div>);

}