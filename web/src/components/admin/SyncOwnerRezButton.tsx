"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SyncOwnerRezButton({
  configured,
  lastSync,
}: {
  configured: boolean;
  lastSync?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function sync() {
    setLoading(true);
    setMessage("");
    const res = await fetch("/api/ownerrez/sync", { method: "POST" });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setMessage(data.error || "Error de sincronización");
      return;
    }
    setMessage(`Importadas ${data.total} propiedades (${data.imported} nuevas, ${data.updated} actualizadas).`);
    router.refresh();
  }

  return (
    <div className="text-right">
      <button type="button" onClick={sync} disabled={loading} className="btn btn-primary">
        {loading ? "Sincronizando…" : "Sincronizar OwnerRez"}
      </button>
      <p className="mt-2 text-xs text-ink-soft">
        {configured
          ? `API configurada${lastSync ? ` · última sync ${new Date(lastSync).toLocaleString("es-ES")}` : ""}`
          : "Falta .env.local con OWNERREZ_EMAIL y OWNERREZ_TOKEN"}
      </p>
      {message && <p className="mt-1 max-w-sm text-xs text-sea">{message}</p>}
    </div>
  );
}
