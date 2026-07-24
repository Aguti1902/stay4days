import { requireAdmin } from "@/lib/require-admin";
import { getPayments } from "@/lib/store";
import { formatDate, formatEuro } from "@/lib/utils";
import { PaymentAdminPanel, PaymentDeleteButton } from "@/components/admin/PaymentAdminPanel";

export default async function AdminPaymentsPage() {
  await requireAdmin();
  const payments = await getPayments();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl">Pagos / reservas</h1>
        <p className="mt-2 text-ink-soft">
          Personas que han pagado o tienen pago pendiente por una vivienda.
        </p>
      </div>
      <PaymentAdminPanel />
      <div className="overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
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
            {payments.map((p) => (
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
                  <span className="rounded-full bg-foam px-2 py-1 text-xs font-bold uppercase">{p.status}</span>
                </td>
                <td className="px-4 py-3">
                  <PaymentDeleteButton id={p.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
