"use client";

import { useMemo, useState } from "react";
import type { ContactLead, PaymentRecord, Property, SiteStats, Ticket } from "@/lib/types";
import { formatEuro } from "@/lib/utils";
import { SyncOwnerRezButton } from "@/components/admin/SyncOwnerRezButton";
import {
  Eye,
  Home,
  MessageCircle,
  Ticket as TicketIcon,
  Building2,
  UserPlus,
  Wallet,
  TrendingUp,
  Search,
  Users,
  Filter,
  X,
} from "lucide-react";

type Props = {
  stats: SiteStats;
  properties: Property[];
  contacts: ContactLead[];
  payments: PaymentRecord[];
  tickets: Ticket[];
  ownerrezConfigured: boolean;
  lastSync?: string;
};

function inRange(dateStr: string | undefined, from: string, to: string) {
  if (!dateStr) return !from && !to;
  const day = dateStr.slice(0, 10);
  if (from && day < from) return false;
  if (to && day > to) return false;
  return true;
}

export function DashboardOverview({
  stats,
  properties,
  contacts,
  payments,
  tickets,
  ownerrezConfigured,
  lastSync,
}: Props) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [property, setProperty] = useState("all");
  const [paymentStatus, setPaymentStatus] = useState<"all" | PaymentRecord["status"]>("all");

  const propertyOptions = useMemo(
    () =>
      Array.from(new Set(properties.map((p) => p.name).filter(Boolean))).sort((a, b) =>
        a.localeCompare(b, "es"),
      ),
    [properties],
  );

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      if (property !== "all" && p.propertyName !== property) return false;
      if (paymentStatus !== "all" && p.status !== paymentStatus) return false;
      const dateRef = p.checkIn || p.createdAt;
      if (!inRange(dateRef, from, to)) return false;
      return true;
    });
  }, [payments, property, paymentStatus, from, to]);

  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      if (property !== "all" && c.propertyName !== property) return false;
      if (!inRange(c.createdAt, from, to)) return false;
      return true;
    });
  }, [contacts, property, from, to]);

  const filteredDaily = useMemo(() => {
    return stats.daily.filter((d) => inRange(d.date, from, to));
  }, [stats.daily, from, to]);

  const visibleProperties = useMemo(() => {
    const list = properties.filter((p) => p.visible !== false);
    if (property === "all") return list;
    return list.filter((p) => p.name === property);
  }, [properties, property]);

  const paidRevenue = filteredPayments
    .filter((p) => p.status === "paid")
    .reduce((s, p) => s + p.amount, 0);
  const pendingRevenue = filteredPayments
    .filter((p) => p.status === "pending")
    .reduce((s, p) => s + p.amount, 0);
  const newContacts = filteredContacts.filter((c) => c.status === "new").length;
  const chartDays = filteredDaily.length ? filteredDaily : stats.daily;
  const maxViews = Math.max(...chartDays.map((d) => d.views), 1);
  const periodViews = chartDays.reduce((s, d) => s + d.views, 0);
  const periodChats = chartDays.reduce((s, d) => s + d.chats, 0);
  const periodContactsChart = chartDays.reduce((s, d) => s + d.contacts, 0);

  const hasFilters = from || to || property !== "all" || paymentStatus !== "all";

  const cards = [
    {
      label: hasFilters ? "Visitas (periodo)" : "Visitas web",
      value: (hasFilters ? periodViews : stats.pageViews).toLocaleString("es-ES"),
      icon: Eye,
      tone: "bg-sea/10 text-sea",
    },
    {
      label: "Vistas de propiedades",
      value: stats.propertyViews.toLocaleString("es-ES"),
      icon: Home,
      tone: "bg-[var(--sun)]/15 text-[#b07620]",
    },
    {
      label: hasFilters ? "Chats (periodo)" : "Mensajes chatbot",
      value: (hasFilters ? periodChats : stats.chatMessages).toLocaleString("es-ES"),
      icon: MessageCircle,
      tone: "bg-ink/5 text-ink",
    },
    {
      label: "Clics tickets Tiqets",
      value: stats.ticketClicks.toLocaleString("es-ES"),
      icon: TicketIcon,
      tone: "bg-sea/10 text-sea-deep",
    },
    {
      label: property === "all" ? "Propiedades visibles" : "Propiedad filtrada",
      value: String(visibleProperties.length),
      icon: Building2,
      tone: "bg-sea/10 text-sea",
    },
    {
      label: "Contactos nuevos",
      value: String(newContacts),
      icon: UserPlus,
      tone: "bg-[var(--sun)]/15 text-[#b07620]",
    },
    {
      label: "Pagos (filtrados)",
      value: String(filteredPayments.length),
      icon: Wallet,
      tone: "bg-ink/5 text-ink",
    },
    {
      label: "Ingresos pagados",
      value: formatEuro(paidRevenue),
      icon: TrendingUp,
      tone: "bg-sea/10 text-sea-deep",
    },
  ];

  function clearFilters() {
    setFrom("");
    setTo("");
    setProperty("all");
    setPaymentStatus("all");
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-sea">Dashboard</p>
          <h1 className="mt-1 font-display text-3xl md:text-4xl">Panel Stay4Days</h1>
          <p className="mt-2 max-w-xl text-ink-soft">
            Filtra por fechas, vivienda o estado de pago para ver el resumen operativo.
          </p>
        </div>
        <SyncOwnerRezButton configured={ownerrezConfigured} lastSync={lastSync} />
      </div>

      <div className="rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[0_10px_30px_rgba(11,31,42,0.04)]">
        <div className="mb-4 flex items-center gap-2">
          <Filter size={16} className="text-sea" />
          <h2 className="font-display text-xl">Filtros del dashboard</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
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
            Estado de pago
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value as typeof paymentStatus)}
              className="w-full min-w-0 max-w-full rounded-xl border border-[var(--line)] px-3 py-2.5 text-sm font-semibold normal-case tracking-normal"
            >
              <option value="all">Todos</option>
              <option value="paid">Pagado</option>
              <option value="pending">Pendiente</option>
              <option value="refunded">Reembolsado</option>
            </select>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink-soft">
            Pendiente filtrado: {formatEuro(pendingRevenue)} · Contactos en rango: {filteredContacts.length}
            {hasFilters ? ` · Contactos del gráfico: ${periodContactsChart}` : ""}
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
        <div className="mb-6">
          <h2 className="font-display text-2xl">
            Actividad{hasFilters && (from || to) ? " (filtrada)" : " (14 días)"}
          </h2>
          <p className="mt-1 text-sm text-ink-soft">Visitas diarias en la web pública</p>
        </div>
        <div className="flex h-48 items-end gap-2 md:gap-3">
          {chartDays.map((d) => (
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
            icon: TicketIcon,
          },
          {
            title: "Búsquedas",
            value: stats.searches.toLocaleString("es-ES"),
            icon: Search,
          },
          {
            title: "Contactos (filtro)",
            value: filteredContacts.length,
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
