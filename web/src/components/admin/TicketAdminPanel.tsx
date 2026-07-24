"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function TicketAdminPanel({ deleteOnlyId }: { deleteOnlyId?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (deleteOnlyId) {
    return (
      <button
        type="button"
        className="text-xs font-bold text-red-600"
        onClick={async () => {
          if (!confirm("¿Eliminar ticket/experiencia?")) return;
          await fetch(`/api/admin/tickets?id=${deleteOnlyId}`, { method: "DELETE" });
          router.refresh();
        }}
      >
        Eliminar
      </button>
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    await fetch("/api/admin/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.get("title"),
        type: form.get("type"),
        languages: form.get("languages"),
        duration: form.get("duration"),
        priceFrom: form.get("priceFrom"),
        rating: form.get("rating"),
        reviewCount: form.get("reviewCount"),
        image: form.get("image"),
        tiqetsUrl: form.get("tiqetsUrl"),
        includes: form.get("includes"),
      }),
    });
    setLoading(false);
    e.currentTarget.reset();
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 rounded-2xl border border-[var(--line)] bg-white p-5 md:grid-cols-2">
      <input name="title" required placeholder="Título" className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm md:col-span-2" />
      <input name="type" placeholder="Tipo (Tour, Entrada…)" className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm" />
      <input name="priceFrom" type="number" step="0.01" required placeholder="Precio desde €" className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm" />
      <input name="languages" placeholder="Idiomas" className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm" />
      <input name="duration" placeholder="Duración" className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm" />
      <input name="rating" type="number" step="0.1" placeholder="Rating" className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm" />
      <input name="reviewCount" type="number" placeholder="Nº opiniones" className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm" />
      <input name="image" placeholder="URL imagen" className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm md:col-span-2" />
      <input name="tiqetsUrl" required placeholder="URL Tiqets (compra)" className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm md:col-span-2" />
      <textarea name="includes" placeholder="Incluye (una línea por ítem)" rows={3} className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm md:col-span-2" />
      <button type="submit" disabled={loading} className="btn btn-primary md:col-span-2">
        {loading ? "Guardando…" : "Añadir ticket / experiencia"}
      </button>
    </form>
  );
}
