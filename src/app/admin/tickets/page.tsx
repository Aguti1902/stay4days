import Image from "next/image";
import { requireAdmin } from "@/lib/require-admin";
import { getTickets } from "@/lib/store";
import { formatEuro } from "@/lib/utils";
import { TicketAdminPanel } from "@/components/admin/TicketAdminPanel";

export default async function AdminTicketsPage() {
  await requireAdmin();
  const tickets = await getTickets();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl">Tickets y experiencias</h1>
        <p className="mt-2 text-ink-soft">
          Añade o elimina experiencias. El botón Comprar siempre redirige a la URL de Tiqets.
        </p>
      </div>
      <TicketAdminPanel />
      <div className="grid gap-4 md:grid-cols-2">
        {tickets.map((t) => (
          <article key={t.id} className="flex gap-4 rounded-2xl border border-[var(--line)] bg-white p-4">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-mist">
              {t.image && <Image src={t.image} alt="" fill className="object-cover" sizes="96px" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase text-sea">{t.type}</p>
              <h2 className="font-semibold leading-snug">{t.title}</h2>
              <p className="mt-1 text-sm">Desde {formatEuro(t.priceFrom)}</p>
              <a href={t.tiqetsUrl} target="_blank" rel="noreferrer" className="text-xs text-sea break-all">
                {t.tiqetsUrl}
              </a>
              <div className="mt-2">
                <TicketAdminPanel deleteOnlyId={t.id} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
