"use client";

import { useRouter } from "next/navigation";

export function ContactAdminActions({
  id,
  status,
}: {
  id: string;
  status: "new" | "contacted" | "closed";
}) {
  const router = useRouter();

  async function setStatus(next: typeof status) {
    await fetch("/api/admin/contacts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: next }),
    });
    router.refresh();
  }

  async function remove() {
    if (!confirm("¿Eliminar contacto?")) return;
    await fetch(`/api/admin/contacts?id=${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="rounded-full bg-foam px-2 py-1 text-xs font-bold uppercase">{status}</span>
      {status !== "contacted" && (
        <button type="button" onClick={() => setStatus("contacted")} className="text-xs font-bold text-sea">
          Marcar contactado
        </button>
      )}
      {status !== "closed" && (
        <button type="button" onClick={() => setStatus("closed")} className="text-xs font-bold text-ink-soft">
          Cerrar
        </button>
      )}
      <button type="button" onClick={remove} className="text-xs font-bold text-red-600">
        Borrar
      </button>
    </div>
  );
}
