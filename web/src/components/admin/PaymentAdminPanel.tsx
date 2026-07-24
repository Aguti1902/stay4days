"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function PaymentAdminPanel({ deleteOnlyId }: { deleteOnlyId?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (deleteOnlyId) {
    return (
      <button
        type="button"
        className="text-xs font-bold text-red-600"
        onClick={async () => {
          if (!confirm("¿Eliminar pago?")) return;
          await fetch(`/api/admin/payments?id=${deleteOnlyId}`, { method: "DELETE" });
          router.refresh();
        }}
      >
        Borrar
      </button>
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    await fetch("/api/admin/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guestName: form.get("guestName"),
        email: form.get("email"),
        propertyName: form.get("propertyName"),
        amount: form.get("amount"),
        status: form.get("status"),
        checkIn: form.get("checkIn"),
        checkOut: form.get("checkOut"),
        notes: form.get("notes"),
      }),
    });
    setLoading(false);
    e.currentTarget.reset();
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 rounded-2xl border border-[var(--line)] bg-white p-5 md:grid-cols-3">
      <input name="guestName" required placeholder="Nombre huésped" className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm" />
      <input name="email" type="email" required placeholder="Email" className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm" />
      <input name="propertyName" required placeholder="Propiedad" className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm" />
      <input name="amount" type="number" step="0.01" required placeholder="Importe €" className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm" />
      <select name="status" className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm">
        <option value="paid">Pagado</option>
        <option value="pending">Pendiente</option>
        <option value="refunded">Reembolsado</option>
      </select>
      <input name="checkIn" type="date" className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm" />
      <input name="checkOut" type="date" className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm" />
      <input name="notes" placeholder="Notas" className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm md:col-span-2" />
      <button type="submit" disabled={loading} className="btn btn-primary">
        {loading ? "Guardando…" : "Añadir pago"}
      </button>
    </form>
  );
}

export function PaymentDeleteButton({ id }: { id: string }) {
  return <PaymentAdminPanel deleteOnlyId={id} />;
}
