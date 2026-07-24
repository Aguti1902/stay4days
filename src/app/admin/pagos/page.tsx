import { requireAdmin } from "@/lib/require-admin";
import { getPayments, getVisibleProperties } from "@/lib/store";
import { PaymentAdminPanel } from "@/components/admin/PaymentAdminPanel";
import { PaymentsTableWithFilters } from "@/components/admin/PaymentsTableWithFilters";

export default async function AdminPaymentsPage() {
  await requireAdmin();
  const [payments, properties] = await Promise.all([getPayments(), getVisibleProperties()]);

  const propertyOptions = Array.from(
    new Set([
      ...payments.map((p) => p.propertyName).filter(Boolean),
      ...properties.map((p) => p.name),
    ]),
  ).sort((a, b) => a.localeCompare(b, "es"));

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-sea">Gestión</p>
        <h1 className="mt-1 font-display text-3xl md:text-4xl">Pagos / reservas</h1>
        <p className="mt-2 text-ink-soft">
          Filtra por fechas, vivienda o estado, y registra nuevos pagos manualmente.
        </p>
      </div>
      <PaymentAdminPanel />
      <PaymentsTableWithFilters payments={payments} propertyOptions={propertyOptions} />
    </div>
  );
}
