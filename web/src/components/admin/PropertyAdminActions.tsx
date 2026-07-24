"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function PropertyAdminActions({ id, visible }: { id: number; visible: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function hide() {
    if (!confirm("¿Eliminar esta propiedad de la web pública?")) return;
    setLoading(true);
    await fetch(`/api/admin/properties?id=${id}&mode=hide`, { method: "DELETE" });
    setLoading(false);
    router.refresh();
  }

  async function restore() {
    setLoading(true);
    await fetch("/api/admin/properties", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, visible: true, active: true }),
    });
    setLoading(false);
    router.refresh();
  }

  async function hardDelete() {
    if (!confirm("¿Borrar definitivamente del almacén local? (se puede reimportar con OwnerRez)")) return;
    setLoading(true);
    await fetch(`/api/admin/properties?id=${id}&mode=hard`, { method: "DELETE" });
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="flex flex-wrap gap-2">
      {visible ? (
        <button type="button" disabled={loading} onClick={hide} className="rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-white">
          Eliminar de la web
        </button>
      ) : (
        <button type="button" disabled={loading} onClick={restore} className="rounded-full bg-sea px-3 py-1.5 text-xs font-bold text-white">
          Restaurar
        </button>
      )}
      <button type="button" disabled={loading} onClick={hardDelete} className="rounded-full border border-[var(--line)] px-3 py-1.5 text-xs font-bold">
        Borrar
      </button>
    </div>
  );
}
