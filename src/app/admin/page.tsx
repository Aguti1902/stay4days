import { requireAdmin } from "@/lib/require-admin";
import { getContacts, getPayments, getProperties, getStats, getTickets, getSettings } from "@/lib/store";
import { formatEuro } from "@/lib/utils";
import { isOwnerRezConfigured } from "@/lib/ownerrez";
import { SyncOwnerRezButton } from "@/components/admin/SyncOwnerRezButton";
import {
  Eye,
  Home,
  MessageCircle,
  Ticket,
  Building2,
  UserPlus,
  Wallet,
  TrendingUp,
  Search,
  Users,
} from "lucide-react";

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
  const maxViews = Math.max(...stats.daily.map((d) => d.views), 1);

  const cards = [
    { label: "Visitas web", value: stats.pageViews.toLocaleString("es-ES"), icon: Eye, tone: "bg-sea/10 text-sea" },
    {
      label: "Vistas de propiedades",
      value: stats.propertyViews.toLocaleString("es-ES"),
      icon: Home,
      tone: "bg-[var(--sun)]/15 text-[#b07620]",
    },
    {
      label: "Mensajes chatbot",
      value: stats.chatMessages.toLocaleString("es-ES"),
      icon: MessageCircle,
      tone: "bg-ink/5 text-ink",
    },
    {
      label: "Clics tickets Tiqets",
      value: stats.ticketClicks.toLocaleString("es-ES"),
      icon: Ticket,
      tone: "bg-sea/10 text-sea-deep",
    },
    { label: "Propiedades visibles", value: String(visible), icon: Building2, tone: "bg-sea/10 text-sea" },
    { label: "Contactos nuevos", value: String(newContacts), icon: UserPlus, tone: "bg-[var(--sun)]/15 text-[#b07620]" },
    { label: "Pagos registrados", value: String(payments.length), icon: Wallet, tone: "bg-ink/5 text-ink" },
    { label: "Ingresos (pagados)", value: formatEuro(revenue), icon: TrendingUp, tone: "bg-sea/10 text-sea-deep" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-sea">Dashboard</p>
          <h1 className="mt-1 font-display text-3xl md:text-4xl">Panel Stay4Days</h1>
          <p className="mt-2 max-w-xl text-ink-soft">
            Estadísticas en tiempo real, sincronización OwnerRez y gestión operativa.
          </p>
        </div>
        <SyncOwnerRezButton configured={isOwnerRezConfigured()} lastSync={settings.lastOwnerrezSync} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[0_10px_30px_rgba(11,31,42,0.04)]"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-soft">{card.label}</p>
              <span className={`rounded-xl p-2 ${card.tone}`}>
                <card.icon size={16} />
              </span>
            </div>
            <p className="mt-4 font-display text-3xl tracking-tight">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[0_10px_30px_rgba(11,31,42,0.04)] md:p-6">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl">Actividad (14 días)</h2>
            <p className="mt-1 text-sm text-ink-soft">Visitas diarias en la web pública</p>
          </div>
        </div>
        <div className="flex h-48 items-end gap-2 md:gap-3">
          {stats.daily.map((d) => (
            <div key={d.date} className="group flex flex-1 flex-col items-center gap-2">
              <div className="flex h-40 w-full items-end">
                <div
                  className="w-full rounded-t-xl bg-[linear-gradient(180deg,#14a3ae_0%,#0a5c64_100%)] transition group-hover:opacity-90"
                  style={{ height: `${Math.max(10, (d.views / maxViews) * 100)}%` }}
                  title={`${d.date}: ${d.views} vistas`}
                />
              </div>
              <span className="text-[10px] font-semibold text-ink-soft">{d.date.slice(8)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Tickets activos",
            value: tickets.filter((t) => t.active).length,
            icon: Ticket,
          },
          {
            title: "Búsquedas",
            value: stats.searches.toLocaleString("es-ES"),
            icon: Search,
          },
          {
            title: "Contactos totales",
            value: contacts.length,
            icon: Users,
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-[var(--line)] bg-[linear-gradient(145deg,#0b1f2a_0%,#0f7c86_120%)] p-6 text-white shadow-[0_14px_34px_rgba(11,31,42,0.18)]"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl">{item.title}</h3>
              <item.icon size={18} className="text-[var(--sun)]" />
            </div>
            <p className="mt-4 font-display text-4xl tracking-tight">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
