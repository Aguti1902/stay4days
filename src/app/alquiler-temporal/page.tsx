export const dynamic = 'force-dynamic';

import Image from "next/image";
import Link from "next/link";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { getVisibleProperties, bumpStat } from "@/lib/store";
import { NEIGHBORHOODS } from "@/lib/property-types";

export const metadata = { title: "Alquiler temporal 1–11 meses" };

export default async function TemporaryPage() {
  await bumpStat("pageViews");
  const properties = await getVisibleProperties();

  return (
    <div>
      <section className="relative overflow-hidden border-b border-[var(--line)]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=2000&q=80"
            alt="Barcelona"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,31,42,0.82),rgba(11,31,42,0.35))]" />
        </div>
        <div className="container-s4d relative py-24 text-white">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--sun)]">Estancias medias</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight md:text-6xl">
            Alquiler Temporal en Barcelona – Estancias de 1 a 11 Meses
          </h1>
          <p className="mt-5 max-w-2xl text-white/80">
            Viviendas amuebladas para profesionales y estudiantes. Sin compromiso a largo plazo, con
            ubicaciones privilegiadas y gestión familiar Stay4Days.
          </p>
        </div>
      </section>

      <section className="container-s4d grid items-start gap-10 py-16 lg:grid-cols-2">
        <div className="relative min-h-[360px] overflow-hidden rounded-3xl">
          <Image
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=80"
            alt="Vivienda temporal"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-5">
          <h2 className="font-display text-3xl">¿Por qué elegir nuestro alojamiento temporal en Barcelona?</h2>
          <ul className="space-y-3 text-ink-soft">
            <li>• Totalmente amueblados: solo necesitas tu maleta</li>
            <li>• Duraciones flexibles desde 1 hasta 11 meses</li>
            <li>• Reserva y pago online en todas las viviendas</li>
            <li>• Zonas: {NEIGHBORHOODS.join(", ")}</li>
            <li>• Atención 365 días y soporte en 9 idiomas</li>
            <li>• Ideal para trabajo temporal, prácticas o semestre académico</li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link href="#disponibles" className="btn btn-primary">
              Ver viviendas y reservar online
            </Link>
            <Link href="/contactar" className="btn btn-secondary">
              Pedir presupuesto mensual
            </Link>
          </div>
        </div>
      </section>

      <section id="disponibles" className="container-s4d pb-16">
        <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-4xl">Todas las viviendas disponibles</h2>
            <p className="mt-2 text-ink-soft">
              Elige fechas de 1 a 11 meses, consulta el precio y paga online de forma segura.
            </p>
          </div>
          <Link href="/propiedades" className="btn btn-secondary">
            Ver Todos Los Apartamentos
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
