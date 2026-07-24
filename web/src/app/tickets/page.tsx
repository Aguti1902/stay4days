export const dynamic = 'force-dynamic';

import { TicketCard } from "@/components/tickets/TicketCard";
import { getTickets, bumpStat } from "@/lib/store";
import { TicketsBuyTracker } from "@/components/tickets/TicketsBuyTracker";

export const metadata = { title: "Tickets y experiencias" };

export default async function TicketsPage() {
  await bumpStat("pageViews");
  const tickets = (await getTickets()).filter((t) => t.active);

  return (
    <div className="container-s4d py-12">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-sea">Cultura y ocio</p>
        <h1 className="font-display text-4xl md:text-5xl">Más formas de descubrir la cultura</h1>
        <p className="mt-3 text-ink-soft">
          Monumentos, atracciones y experiencias. Al pulsar Comprar te redirigimos a Tiqets para
          completar la reserva, igual que en stay4days.com.
        </p>
      </div>
      <TicketsBuyTracker />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tickets.map((t) => (
          <TicketCard key={t.id} ticket={t} />
        ))}
      </div>
    </div>
  );
}
