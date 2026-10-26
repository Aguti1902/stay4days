"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PaymentRecord } from "@/lib/types";

const OPTIONS: { value: PaymentRecord["status"]; label: string }[] = [
  { value: "pending", label: "Pendiente" },
  { value: "paid", label: "Pagado" },
  { value: "refunded", label: "Reembolsado" },
];

export function PaymentStatusActions({
  id,
  status,
}: {
  id: string;
  status: PaymentRecord["status"];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function updateStatus(next: PaymentRecord["status"]) {
    if (next === status) return;

    const sendMail = window.confirm(
      `¿Cambiar a "${OPTIONS.find((o) => o.value === next)?.label}" y enviar email al huésped?`,
    );
    if (!sendMail) {
      const withoutMail = window.confirm("¿Cambiar el estado sin enviar email?");
      if (!withoutMail) return;
    }

    setLoading(true);
    await fetch("/api/admin/payments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: next, notify: sendMail }),
    });
    setLoading(false);
    router.refresh();
  }

  return (
    <select
      disabled={loading}
      value={status}
      onChange={(e) => updateStatus(e.target.value as PaymentRecord["status"])}
      className="max-w-[140px] rounded-lg border border-[var(--line)] px-2 py-1.5 text-xs font-semibold"
      aria-label="Cambiar estado de pago"
    >
      {OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
