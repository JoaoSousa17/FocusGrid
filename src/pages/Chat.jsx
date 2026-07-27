import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Loader2, Trash2, Bot, User } from "lucide-react";
import { InvokeLLMChat } from "@/api/integrations";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { useLang } from "@/context/LangContext";

const SYSTEM_PROMPT = `You are the FocusGrid productivity assistant — an app for focus, habits and task management.
Help the user be more productive, organize tasks, maintain healthy habits, and manage time with the Pomodoro method.
Respond in the user's language. Be concise, practical and motivating. Use emojis sparingly.
You know techniques like: Pomodoro method, GTD (Getting Things Done), time-blocking, habit stacking, deep work, and the 2-minute rule.`;

function MessageBubble({ msg }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} items-end`}
    >
      <div className={`w-8 h-8 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-sm ${isUser ? "bg-[#E87A5A]" : "bg-white border border-border"}`}>
        {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-[#E87A5A]" />}
      </div>
      <div className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
        isUser
          ? "bg-[#E87A5A] text-white rounded-br-sm"
          : "bg-white border border-border text-foreground rounded-bl-sm"
      }`}>
        {msg.content.split("\n").map((line, i) => (
          <span key={i}>{line}{i < msg.content.split("\n").length - 1 && <br />}</span>
        ))}
        <div className={`text-[9px] mt-1.5 ${isUser ? "text-white/60 text-right" : "text-muted-foreground"}`}>
          {format(new Date(msg.ts), "HH:mm")}
        </div>
      </div>
    </motion.div>
  );
}

export default function Chat() {
  const navigate = useNavigate();
  const { t } = useLang();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = useCallback(async (text) => {
    const content = (text || input).trim();
    if (!content || loading) return;
    setInput("");

    const userMsg = { role: "user", content, ts: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const history = [...messages, userMsg].map(({ role, content }) => ({ role, content }));
      const reply = await InvokeLLMChat({ messages: history, system: SYSTEM_PROMPT });
      setMessages((prev) => [...prev, { role: "assistant", content: reply, ts: Date.now() }]);
    } catch (err) {
      console.error("Chat error:", err);
      const isKeyMissing = err?.message?.includes("not set in .env");
      const errMsg = isKeyMissing
        ? "API key not found. Add VITE_GROQ_API_KEY (or VITE_GROK_API_KEY) to .env and restart Vite."
        : `Error: ${err?.message || "Unknown error. Check console."}`;
      setMessages((prev) => [...prev, { role: "assistant", content: errMsg, ts: Date.now() }]);
    }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [input, messages, loading]);

  return (
    <div className="min-h-screen bg-cream flex flex-col select-none">
      {/* Header */}
      <div className="bg-white border-b border-border px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => navigate("/")} className="w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-base font-bold text-foreground flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-[#E87A5A]/15 flex items-center justify-center">
              <Bot className="w-4 h-4 text-[#E87A5A]" />
            </span>
            {t("chat.title")}
          </h1>
          <p className="text-[10px] text-muted-foreground">{t("chat.powered")}</p>
        </div>
        {messages.length > 0 && (
          <button onClick={() => setMessages([])} className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-rose-500 transition-all">
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-16 h-16 rounded-3xl bg-[#E87A5A]/10 flex items-center justify-center mb-4 border border-[#E87A5A]/20">
              <Bot className="w-8 h-8 text-[#E87A5A]" />
            </div>
            <h2 className="font-bold text-foreground mb-1">{t("chat.greeting")}</h2>
            <p className="text-sm text-muted-foreground mb-6">{t("chat.greeting_sub")}</p>
            <div className="grid grid-cols-1 gap-2 w-full max-w-sm">
              {[t("chat.s1"), t("chat.s2"), t("chat.s3"), t("chat.s4")].map((s, i) => (
                <button key={i} onClick={() => sendMessage(s)}
                  className="text-left px-4 py-3 rounded-2xl bg-white border border-border text-sm text-foreground hover:border-[#E87A5A]/40 hover:bg-[#E87A5A]/5 transition-all shadow-sm">
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}
        </AnimatePresence>

        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 items-end">
            <div className="w-8 h-8 rounded-2xl bg-white border border-border flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-[#E87A5A]" />
            </div>
            <div className="bg-white border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1.5 items-center">
                {[0, 1, 2].map((i) => (
                  <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                    className="w-2 h-2 rounded-full bg-[#E87A5A]/50" />
                ))}
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-gradient-to-t from-cream via-cream to-transparent pt-4 pb-6 px-4">
        <div className="flex gap-2 bg-white border border-border rounded-2xl shadow-lg p-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
            placeholder={t("chat.placeholder")}
            className="flex-1 px-3 py-2 text-sm outline-none bg-transparent text-foreground placeholder:text-muted-foreground/50"
            disabled={loading}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="w-10 h-10 rounded-xl bg-[#E87A5A] text-white flex items-center justify-center hover:bg-[#D4694A] disabled:opacity-40 transition-all flex-shrink-0"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
