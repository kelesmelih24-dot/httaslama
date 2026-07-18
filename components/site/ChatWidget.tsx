"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Bot, Loader2, Send, X } from "lucide-react";
import { sendChatMessage } from "@/lib/actions/chat";
import type { ChatMessage } from "@/lib/groq";

type DisplayMessage = ChatMessage & { id: string };

const MAX_USER_MESSAGES = 20; // bir oturumda gönderilebilecek azami mesaj sayısı (maliyet koruması)

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<DisplayMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Merhaba! HT Makina Taşlama yapay zeka asistanıyım. Hizmetlerimiz, çalışma saatlerimiz veya süreç hakkında sorularınızı yanıtlayabilirim.",
    },
  ]);
  const [input, setInput] = useState("");
  const [pending, startTransition] = useTransition();
  const [userMessageCount, setUserMessageCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  function handleSend() {
    const text = input.trim();
    if (!text || pending) return;
    if (userMessageCount >= MAX_USER_MESSAGES) {
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Bu oturumda mesaj sınırına ulaştınız. Daha fazla sorunuz için lütfen bizi arayın veya teklif formunu kullanın.",
        },
      ]);
      return;
    }

    const userMsg: DisplayMessage = { id: crypto.randomUUID(), role: "user", content: text };
    const history: ChatMessage[] = messages
      .filter((m) => m.id !== "welcome")
      .map(({ role, content }) => ({ role, content }));

    setMessages((m) => [...m, userMsg]);
    setInput("");
    setUserMessageCount((c) => c + 1);

    startTransition(async () => {
      const res = await sendChatMessage(history, text);
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: res.ok ? res.reply : `⚠️ ${res.error}`,
        },
      ]);
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Yapay zeka asistanını aç/kapat"
        className="bg-spark-gradient fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-black/40 transition hover:scale-105"
      >
        {open ? <X className="text-white" size={22} /> : <Bot className="text-white" size={24} />}
      </button>

      {open && (
        <div className="fixed bottom-40 right-6 z-50 flex h-[28rem] w-[22rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-sm border border-steel2 bg-steel shadow-2xl">
          <div className="flex items-center gap-2 border-b border-steel2 bg-graphite px-4 py-3">
            <Bot className="text-spark" size={18} />
            <p className="font-display text-xs font-semibold uppercase tracking-wider text-metal">
              HT Asistan
            </p>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[85%] rounded-sm px-3 py-2 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-spark-gradient text-white"
                    : "bg-graphite text-metalDim"
                }`}
              >
                {m.content}
              </div>
            ))}
            {pending && (
              <div className="flex items-center gap-2 text-xs text-metalDim">
                <Loader2 className="animate-spin" size={14} /> Yazıyor...
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 border-t border-steel2 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder="Bir soru yazın..."
              disabled={pending}
              className="input flex-1"
            />
            <button
              onClick={handleSend}
              disabled={pending || !input.trim()}
              aria-label="Gönder"
              className="bg-spark-gradient flex h-9 w-9 shrink-0 items-center justify-center rounded-sm text-white disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
