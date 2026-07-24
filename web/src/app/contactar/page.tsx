"use client";

import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          message: form.get("message"),
          source: form.get("intent") === "temporal" ? "temporary" : "contact",
        }),
      });
      setStatus(res.ok ? "ok" : "error");
      if (res.ok) e.currentTarget.reset();
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-s4d grid gap-10 py-14 lg:grid-cols-2">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-sea">Contactar</p>
        <h1 className="font-display text-4xl md:text-5xl">Hablemos de tu estancia</h1>
        <p className="mt-4 text-ink-soft leading-relaxed">
          Somos una agencia familiar con más de 8 años en el sector turístico. Oficina abierta 365
          días al año y atención en 9 idiomas.
        </p>
        <div className="mt-8 space-y-3 text-sm font-semibold">
          <p>
            Teléfono / WhatsApp:{" "}
            <a className="text-sea" href="tel:+34636042534">
              +34 636 042 534
            </a>
          </p>
          <p>
            Email:{" "}
            <a className="text-sea" href="mailto:stayfourdays@gmail.com">
              stayfourdays@gmail.com
            </a>
          </p>
          <p>
            Instagram:{" "}
            <a
              className="text-sea"
              href="https://www.instagram.com/stay4days/?hl=es"
              target="_blank"
              rel="noreferrer"
            >
              @stay4days
            </a>
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="surface space-y-4 rounded-3xl p-6 md:p-8">
        <label className="grid gap-1 text-sm font-semibold">
          Nombre
          <input name="name" required className="rounded-xl border border-[var(--line)] px-3 py-2.5" />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Email
          <input name="email" type="email" required className="rounded-xl border border-[var(--line)] px-3 py-2.5" />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Teléfono
          <input name="phone" className="rounded-xl border border-[var(--line)] px-3 py-2.5" />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Interés
          <select name="intent" className="rounded-xl border border-[var(--line)] px-3 py-2.5">
            <option value="tourist">Alquiler turístico (días/semanas)</option>
            <option value="temporal">Alquiler temporal 1–11 meses</option>
            <option value="tickets">Tickets / experiencias</option>
            <option value="other">Otro</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Mensaje
          <textarea name="message" required rows={5} className="rounded-xl border border-[var(--line)] px-3 py-2.5" />
        </label>
        <label className="flex items-start gap-3 text-sm font-medium text-ink-soft">
          <input name="privacy" type="checkbox" required className="mt-1" />
          <span>
            He leído y acepto la{" "}
            <a href="/politica-de-privacidad" className="font-semibold text-sea hover:underline">
              Política de privacidad
            </a>{" "}
            y el{" "}
            <a href="/aviso-legal" className="font-semibold text-sea hover:underline">
              Aviso legal
            </a>
            .
          </span>
        </label>
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? "Enviando…" : "Enviar consulta"}
        </button>
        {status === "ok" && <p className="text-sm text-sea">Mensaje recibido. Gracias.</p>}
        {status === "error" && <p className="text-sm text-red-600">Error al enviar.</p>}
      </form>
    </div>
  );
}
