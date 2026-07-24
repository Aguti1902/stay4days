"use client";

import Link from "next/link";
import Image from "next/image";
import type { Ticket } from "@/lib/types";
import { formatEuro } from "@/lib/utils";
import { ExternalLink, Star } from "lucide-react";

export function TicketCard({ ticket, onBuy }: { ticket: Ticket; onBuy?: () => void }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-white/85">
      <div className="relative aspect-square shrink-0 bg-mist">
        {ticket.image && (
          <Image src={ticket.image} alt={ticket.title} fill className="object-cover" sizes="300px" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-sea">{ticket.type}</p>
        <h3 className="mt-2 line-clamp-2 min-h-[2.75rem] font-display text-lg leading-snug">{ticket.title}</h3>
        <ul className="mt-3 space-y-1 text-sm text-ink-soft">
          {ticket.languages && (
            <li className="line-clamp-1">Idiomas: {ticket.languages}</li>
          )}
          {ticket.duration && <li>Duración: {ticket.duration}</li>}
          {ticket.includes.slice(0, 2).map((item) => (
            <li key={item} className="line-clamp-1">
              • {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          <div className="flex items-center gap-1 text-sm font-semibold">
            <Star size={14} className="fill-sun text-sun" />
            {ticket.rating} ({ticket.reviewCount.toLocaleString("es-ES")} opiniones)
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-[var(--line)] pt-4">
            <p className="font-extrabold">Desde {formatEuro(ticket.priceFrom)}</p>
            <a
              href={ticket.tiqetsUrl}
              target="_blank"
              rel="noreferrer"
              onClick={onBuy}
              className="btn btn-primary !px-4 !py-2 text-sm"
            >
              Comprar <ExternalLink size={14} />
            </a>
          </div>
          <Link href="/tickets" className="mt-3 inline-block text-xs font-semibold text-sea">
            Ver en Stay4Days
          </Link>
        </div>
      </div>
    </article>
  );
}
