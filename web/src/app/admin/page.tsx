import { requireAdmin } from "@/lib/require-admin";
import { getContacts, getPayments, getProperties, getStats, getTickets, getSettings } from "@/lib/store";
import { formatEuro } from "@/lib/utils";
import { isOwnerRezConfigured } from "@/lib/ownerrez";
import { SyncOwnerRezButton } from "@/components/admin/SyncOwnerRezButton";

export default async function AdminDashboard() {
  await requireAdmin();
  const [stats, properties, contacts, payments, tickets, settings] = await Promise.all([
    getStats(),
    getProperties(),
    getContacts(),
    getPayments(),
    getTickets(),
    getSettings(),
  ]);

  const visible = properties.filter((p) => p.visible !== false).length;
  const paid = payments.filter((p) => p.status === "paid");
  const revenue = paid.reduce((s, p) => s + p.amount, 0);
  const newContacts = contacts.filter((c) => c.status === "new").length;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl">Panel Stay4Days</h1>
          <p className="mt-2 text-ink-soft">
            Estadísticas, importación OwnerRez y gestión operativa.
          </p>
        </div>
        <SyncOwnerRezButton configured={isOwnerRezConfigured()} lastSync={settings.lastOwnerrezSync} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Visitas web", value: stats.pageViews.toLocaleString("es-ES") },
          { label: "Vistas de propiedades", value: stats.propertyViews.toLocaleString("es-ES") },
          { label: "Mensajes chatbot", value: stats.chatMessages.toLocaleString("es-ES") },
          { label: "Clics tickets Tiqets", value: stats.ticketClicks.toLocaleString("es-ES") },
          { label: "Propiedades visibles", value: String(visible) },
          { label: "Contactos nuevos", value: String(newContacts) },
          { label: "Pagos registrados", value: String(payments.length) },
          { label: "Ingresos (pagados)", value: formatEuro(revenue) },
        ].map((card) => (
          <div key={card.label} className="rounded-2xl border border-[var(--line)] bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-soft">{card.label}</p>
            <p className="mt-2 font-display text-3xl">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-[var(--line)] bg-white p-5">
        <h2 className="font-display text-2xl">Actividad (14 días)</h2>
        <div className="mt-4 flex h-40 items-end gap-2">
          {stats.daily.map((d) => (
            <div key={d.date} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md bg-sea/80"
                style={{ height: `${Math.max(8, (d.views / 1200) * 100)}%` }}
                title={`${d.date}: ${d.views} vistas`}
              />
              <span className="text-[10px] text-ink-soft">{d.date.slice(8)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[var(--line)] bg-white p-5">
          <h3 className="font-display text-xl">Tickets activos</h3>
          <p className="mt-2 text-3xl font-bold">{tickets.filter((t) => t.active).length}</p>
        </div>
        <div className="rounded-2xl border border-[var(--line)] bg-white p-5">
          <h3 className="font-display text-xl">Búsquedas</h3>
          <p className="mt-2 text-3xl font-bold">{stats.searches.toLocaleString("es-ES")}</p>
        </div>
        <div className="rounded-2xl border border-[var(--line)] bg-white p-5">
          <h3 className="font-display text-xl">Contactos totales</h3>
          <p className="mt-2 text-3xl font-bold">{contacts.length}</p>
        </div>
      </div>
    </div>
  );
}
