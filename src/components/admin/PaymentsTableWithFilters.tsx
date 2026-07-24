"use client";

import { useMemo, useState } from "react";
import type { PaymentRecord } from "@/lib/types";
import { formatDate, formatEuro } from "@/lib/utils";
import { PaymentDeleteButton } from "@/components/admin/PaymentAdminPanel";
import { Filter, Search, X } from "lucide-react";

const STATUS_LABEL: Record<PaymentRecord["status"], string> = {
  paid: "Pagado",
  pending: "Pendiente",
  refunded: "Reembolsado",
};

export function PaymentsTableWithFilters({
  payments,
  propertyOptions,
}: {
  payments: PaymentRecord[];
  propertyOptions: string[];
}) {
  const [query, setQuery] = useState("");
  const [property, setProperty] = useState("all");
  const [status, setStatus] = useState<"all" | PaymentRecord["status"]>("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [dateField, setDateField] = useState<"checkIn" | "createdAt">("checkIn");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return payments.filter((p) => {
      if (property !== "all" && p.propertyName !== property) return false;
      if (status !== "all" && p.status !== status) return false;

      if (q) {
        const hay = `${p.guestName} ${p.email} ${p.propertyName} ${p.notes || ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      const rawDate = dateField === "checkIn" ? p.checkIn : p.createdAt?.slice(0, 10);
      if (from && (!rawDate || rawDate < from)) return false;
      if (to && (!rawDate || rawDate > to)) return false;

      return true;
    });
  }, [payments, query, property, status, from, to, dateField]);

  const totals = useMemo(() => {
    const paid = filtered.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0);
    const pending = filtered.filter((p) => p.status === "pending").reduce((s, p) => s + p.amount, 0);
    return { paid, pending, count: filtered.length };
  }, [filtered]);

  function clearFilters() {
    setQuery("");
    setProperty("all");
    setStatus("all");
    setFrom("");
    setTo("");
    setDateField("checkIn");
  }

  const hasFilters = query || property !== "all" || status !== "all" || from || to;

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[0_10px_30px_rgba(11,31,42,0.04)]">
        <div className="mb-4 flex items-center gap-2">
          <Filter size={16} className="text-sea" />
          <h2 className="font-display text-xl">Filtros</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <label className="grid min-w-0 gap-1 text-xs font-bold uppercase tracking-[0.08em] text-ink-soft">
            Buscar
            <div className="relative min-w-0">
              <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Huésped, email, propiedad…"
                className="w-full min-w-0 rounded-xl border border-[var(--line)] py-2.5 pl-9 pr-3 text-sm font-semibold normal-case tracking-normal"
              />
            </div>
          </label>

          <label className="grid min-w-0 gap-1 text-xs font-bold uppercase tracking-[0.08em] text-ink-soft">
            Vivienda
            <select
              value={property}
              onChange={(e) => setProperty(e.target.value)}
              className="w-full min-w-0 max-w-full truncate rounded-xl border border-[var(--line)] px-3 py-2.5 text-sm font-semibold normal-case tracking-normal"
            >
              <option value="all">Todas</option>
              {propertyOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          <label className="grid min-w-0 gap-1 text-xs font-bold uppercase tracking-[0.08em] text-ink-soft">
            Estado
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as typeof status)}
              className="w-full min-w-0 max-w-full rounded-xl border border-[var(--line)] px-3 py-2.5 text-sm font-semibold normal-case tracking-normal"
            >
              <option value="all">Todos</option>
              <option value="paid">Pagado</option>
              <option value="pending">Pendiente</option>
              <option value="refunded">Reembolsado</option>
            </select>
          </label>

          <label className="grid min-w-0 gap-1 text-xs font-bold uppercase tracking-[0.08em] text-ink-soft">
            Filtrar por
            <select
              value={dateField}
              onChange={(e) => setDateField(e.target.value as typeof dateField)}
              className="w-full min-w-0 rounded-xl border border-[var(--line)] px-3 py-2.5 text-sm font-semibold normal-case tracking-normal"
            >
              <option value="checkIn">Fecha de entrada</option>
              <option value="createdAt">Fecha de registro</option>
            </select>
          </label>

          <label className="grid min-w-0 gap-1 text-xs font-bold uppercase tracking-[0.08em] text-ink-soft">
            Desde
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full min-w-0 rounded-xl border border-[var(--line)] px-3 py-2.5 text-sm font-semibold normal-case tracking-normal"
            />
          </label>

          <label className="grid min-w-0 gap-1 text-xs font-bold uppercase tracking-[0.08em] text-ink-soft">
            Hasta
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full min-w-0 rounded-xl border border-[var(--line)] px-3 py-2.5 text-sm font-semibold normal-case tracking-normal"
            />
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink-soft">
            {totals.count} resultado{totals.count === 1 ? "" : "s"} · Pagado {formatEuro(totals.paid)} · Pendiente{" "}
            {formatEuro(totals.pending)}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 rounded-full border border-[var(--line)] px-3 py-1.5 text-xs font-bold text-ink-soft hover:border-sea hover:text-sea"
            >
              <X size={12} /> Limpiar filtros
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-[var(--line)] bg-white shadow-[0_10px_30px_rgba(11,31,42,0.04)]">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[var(--line)] bg-foam text-xs uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-4 py-3">Huésped</th>
              <th className="px-4 py-3">Propiedad</th>
              <th className="px-4 py-3">Importe</th>
              <th className="px-4 py-3">Fechas</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-ink-soft">
                  No hay pagos con estos filtros.
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id} className="border-b border-[var(--line)]">
                  <td className="px-4 py-3">
                    <p className="font-semibold">{p.guestName}</p>
                    <p className="text-xs text-ink-soft">{p.email}</p>
                  </td>
                  <td className="px-4 py-3">{p.propertyName}</td>
                  <td className="px-4 py-3 font-bold">{formatEuro(p.amount, p.currency)}</td>
                  <td className="px-4 py-3 text-xs">
                    {p.checkIn || "—"} → {p.checkOut || "—"}
                    <div className="text-ink-soft">{formatDate(p.createdAt)}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase ${
                        p.status === "paid"
                          ? "bg-sea/10 text-sea-deep"
                          : p.status === "pending"
                            ? "bg-[var(--sun)]/15 text-[#b07620]"
                            : "bg-ink/5 text-ink-soft"
                      }`}
                    >
                      {STATUS_LABEL[p.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <PaymentDeleteButton id={p.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
