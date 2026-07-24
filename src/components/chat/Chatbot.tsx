"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, Send, X } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

export function Chatbot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "¡Hola! Soy el asistente de Stay4Days. Pregúntame por apartamentos, alquiler temporal (1-11 meses), tipos de vivienda o tickets.",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply || "No he podido responder ahora." }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Hay un problema de conexión. Escríbenos al +34 636 042 534." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {open && (
        <div className="flex h-[min(520px,calc(100dvh-6rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-[0_20px_60px_rgba(11,31,42,0.25)]">
          <div className="flex items-center justify-between bg-ink px-4 py-3 text-white">
            <div>
              <p className="font-display text-lg">Asistente Stay4Days</p>
              <p className="text-xs text-white/70">Consultas de alojamiento y experiencias</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar chat">
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto bg-foam p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                  m.role === "user" ? "ml-auto bg-sea text-white" : "bg-white text-ink border border-[var(--line)]"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && <p className="text-xs text-ink-soft">Escribiendo…</p>}
            <div ref={endRef} />
          </div>
          <form onSubmit={onSubmit} className="flex gap-2 border-t border-[var(--line)] p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="¿Apartamento en Gràcia 3 meses?"
              className="flex-1 rounded-full border border-[var(--line)] px-4 py-2 text-sm outline-none focus:border-sea"
            />
            <button type="submit" className="btn btn-primary !px-3 !py-2" disabled={loading}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="floaty btn btn-primary shadow-[0_12px_30px_rgba(11,31,42,0.3)]"
        >
          <MessageCircle size={18} />
          Consultar
        </button>
      )}
    </div>
  );
}
