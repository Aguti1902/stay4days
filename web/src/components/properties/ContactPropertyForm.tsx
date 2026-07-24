"use client";

import { FormEvent, useState } from "react";

export function ContactPropertyForm({
  propertyId,
  propertyName,
}: {
  propertyId: number;
  propertyName: string;
}) {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
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
          propertyId,
          propertyName,
          source: "property",
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
    <form onSubmit={onSubmit} className="space-y-3">
      <input name="name" required placeholder="Nombre" className="w-full rounded-xl border border-[var(--line)] px-3 py-2.5 text-sm" />
      <input name="email" type="email" required placeholder="Email" className="w-full rounded-xl border border-[var(--line)] px-3 py-2.5 text-sm" />
      <input name="phone" placeholder="Teléfono / WhatsApp" className="w-full rounded-xl border border-[var(--line)] px-3 py-2.5 text-sm" />
      <textarea
        name="message"
        required
        rows={4}
        defaultValue={`Hola, me interesa ${propertyName}. ¿Tenéis disponibilidad?`}
        className="w-full rounded-xl border border-[var(--line)] px-3 py-2.5 text-sm"
      />
      <button type="submit" disabled={loading} className="btn btn-primary w-full">
        {loading ? "Enviando…" : "Solicitar reserva"}
      </button>
      {status === "ok" && <p className="text-sm text-sea">Consulta enviada. Te responderemos pronto.</p>}
      {status === "error" && <p className="text-sm text-red-600">No se pudo enviar. Prueba de nuevo.</p>}
    </form>
  );
}
