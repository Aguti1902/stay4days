export const dynamic = 'force-dynamic';

import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "@/components/home/SearchBar";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { TicketCard } from "@/components/tickets/TicketCard";
import { getVisibleProperties, getTickets, bumpStat } from "@/lib/store";
import { PROPERTY_TYPES, NEIGHBORHOODS } from "@/lib/property-types";
import { KeyRound, ShieldCheck, CalendarClock, Sparkles, Star } from "lucide-react";

const GUEST_REVIEWS = [
  {
    name: "Laura M.",
    place: "Barcelona · 5 noches",
    text: "Reserva directa, precio claro y check-in con llaves digitales. El apartamento estaba impecable y la atención por WhatsApp fue inmediata.",
  },
  {
    name: "Thomas K.",
    place: "Estancia de 4 meses",
    text: "Necesitábamos un piso amueblado para un proyecto temporal. En Stay4Days encontramos disponibilidad flexible y pudimos pagar online sin complicaciones.",
  },
  {
    name: "Ana y Carlos",
    place: "Badalona · fin de semana",
    text: "Mucho mejor que en otros portales: misma calidad, menos comisión y trato familiar. Volveremos seguro en nuestra próxima visita a Barcelona.",
  },
];

export default async function HomePage() {
  await bumpStat("pageViews");
  const allProperties = await getVisibleProperties();
  const properties = allProperties.slice(0, 6);
  const tickets = (await getTickets()).filter((t) => t.active).slice(0, 3);

  const reviewed = allProperties.filter((p) => (p.reviewCount ?? 0) > 0 && (p.reviewAverage ?? 0) > 0);
  const totalReviews = reviewed.reduce((sum, p) => sum + (p.reviewCount ?? 0), 0);
  const avgRating =
    totalReviews > 0
      ? reviewed.reduce((sum, p) => sum + (p.reviewAverage ?? 0) * (p.reviewCount ?? 0), 0) / totalReviews
      : 0;

  const stayStyles = PROPERTY_TYPES.map((t) => {
    const match = allProperties.find((p) => p.type === t.slug && (p.thumbnail || p.photos[0]?.url));
    return {
      ...t,
      image: match?.thumbnail || match?.photos[0]?.url || "",
      propertyName: match?.name,
    };
  }).filter((t) => t.image);

  return (
    <>
      <section className="hero-grid relative min-h-[88vh] text-white">
        <div className="container-s4d flex min-h-[88vh] flex-col justify-end gap-8 pb-14 pt-24">
          <div className="rise max-w-3xl space-y-5">
            <p className="font-display text-5xl font-semibold leading-[1.05] md:text-7xl">
              Stay<span className="text-[var(--sun)]">4</span>Days
            </p>
            <h1 className="max-w-2xl text-2xl font-medium leading-snug text-white/95 md:text-3xl">
              Reserva un apartamento en Barcelona con total tranquilidad
            </h1>
            <p className="max-w-xl text-base text-white/80 md:text-lg">
              Alquiler por días, semanas o estancias temporales de 1 a 11 meses. Check-in online, llaves
              digitales y atención familiar en 9 idiomas.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/propiedades"
                className="btn bg-white !text-[#0b1f2a] hover:bg-[var(--sun)] hover:!text-[#0b1f2a]"
              >
                Ver apartamentos
              </Link>
              <Link href="/alquiler-temporal" className="btn border border-white/40 text-white hover:bg-white/10">
                Alquiler 1–11 meses
              </Link>
            </div>
          </div>
          <div className="rise" style={{ animationDelay: "120ms" }}>
            <SearchBar />
          </div>
        </div>
      </section>

      <section className="container-s4d -mt-8 grid gap-4 md:grid-cols-4">
        {[
          { icon: KeyRound, title: "Check-in rápido", text: "Accede con smartphone y llaves digitales." },
          { icon: ShieldCheck, title: "Safe Travels", text: "Nuevos estándares de limpieza y seguridad." },
          { icon: CalendarClock, title: "Cancelación flexible", text: "Política clara y pago online seguro." },
          { icon: Sparkles, title: "Oficina 365 días", text: "Atención al cliente en 9 idiomas." },
        ].map((item) => (
          <div key={item.title} className="surface rounded-2xl p-5">
            <item.icon className="text-sea" size={22} />
            <h2 className="mt-3 font-display text-xl">{item.title}</h2>
            <p className="mt-1 text-sm text-ink-soft">{item.text}</p>
          </div>
        ))}
      </section>

      <section className="container-s4d mt-16">
        <div className="grid items-stretch gap-4 md:gap-0 md:overflow-hidden md:rounded-3xl md:border md:border-[var(--line)] md:bg-white/90 md:grid-cols-3">
          {[
            {
              href: "/propiedades",
              title: "Apartamentos turísticos",
              text: "Alquiler por días y semanas",
              image:
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
              alt: "Apartamento turístico luminoso en Barcelona",
            },
            {
              href: "/alquiler-temporal",
              title: "Alquiler temporal · Reserva online",
              text: "Duración flexible: 1-11 meses por motivos temporales",
              image:
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80",
              alt: "Apartamento para estancia temporal de varios meses",
            },
            {
              href: "/contactar",
              title: "Venta de apartamentos",
              text: "Oportunidades de compra y venta",
              image:
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80",
              alt: "Apartamento en venta con vistas a la ciudad",
            },
          ].map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-white/90 transition hover:bg-foam md:rounded-none md:border-0 ${
                index > 0 ? "md:border-l md:border-[var(--line)]" : ""
              }`}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-foam">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col px-6 py-8 text-center md:px-8">
                <h2 className="font-display text-2xl text-ink transition group-hover:text-sea">
                  {item.title}
                </h2>
                <p className="mt-2 min-h-[2.75rem] text-sm leading-relaxed text-ink-soft">{item.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="relative overflow-hidden border-y border-[var(--line)]">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, #0b1f2a 0%, #0a5c64 45%, #0f7c86 70%, #e8a54b 100%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.18), transparent 40%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.12), transparent 35%)",
            }}
          />
          <div className="container-s4d relative flex justify-center py-12 text-center md:py-16">
            <div className="w-full max-w-5xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--sun)]">
                Ahorra reservando aquí
              </p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-white md:text-5xl lg:text-6xl">
                Reserva directa: 25% más barato que en otros sitios web
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base text-white/80 md:text-lg">
                Evita comisiones de intermediarios. Misma vivienda, mejor precio y atención familiar Stay4Days.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-s4d mt-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-sea">Propiedades</p>
            <h2 className="font-display text-4xl text-ink">Alojamientos destacados</h2>
          </div>
          <Link href="/propiedades" className="btn btn-secondary">
            Ver todos
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      <section className="container-s4d mt-20">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-sea">Opiniones</p>
            <h2 className="font-display text-4xl text-ink">Reseñas de clientes</h2>
            <p className="mt-2 max-w-xl text-ink-soft">
              Lo que cuentan quienes ya se alojaron con Stay4Days, en estancias cortas y temporales.
            </p>
          </div>
          {totalReviews > 0 && (
            <div className="shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex text-[var(--sun)]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.round(avgRating) ? "fill-sun text-sun" : "text-[var(--line)]"}
                    />
                  ))}
                </div>
                <p className="font-display text-3xl text-ink">{avgRating.toFixed(1)}</p>
              </div>
              <p className="mt-1 text-sm text-ink-soft">
                Basado en {totalReviews.toLocaleString("es-ES")} valoraciones de nuestras viviendas
              </p>
            </div>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-3 md:gap-0">
          {GUEST_REVIEWS.map((review, index) => (
            <blockquote
              key={review.name}
              className={`flex flex-col md:px-8 ${
                index > 0 ? "border-t border-[var(--line)] pt-8 md:border-t-0 md:border-l md:pt-0" : "md:pl-0"
              }`}
            >
              <div className="flex gap-0.5 text-[var(--sun)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-sun text-sun" />
                ))}
              </div>
              <p className="mt-4 flex-1 font-display text-xl leading-snug text-ink">“{review.text}”</p>
              <footer className="mt-6">
                <p className="font-semibold text-ink">{review.name}</p>
                <p className="text-sm text-ink-soft">{review.place}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="container-s4d mt-20 grid items-center gap-10 lg:grid-cols-2">
        <div className="relative min-h-[420px] overflow-hidden rounded-3xl bg-mist">
          <Image
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=80"
            alt="Vivienda temporal cerca de la costa mediterránea"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
            priority={false}
          />
        </div>
        <div className="space-y-5">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-sea">Alquiler temporal</p>
          <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">
            Alquiler Temporal en Barcelona – Estancias de 1 a 11 Meses
          </h2>
          <p className="text-ink-soft leading-relaxed">
            Nos especializamos en alojamiento temporal totalmente amueblado para profesionales y
            estudiantes que necesitan un hogar flexible entre 1 y 11 meses. Ideal para proyectos de
            trabajo, prácticas o un semestre en el extranjero.
          </p>
          <h3 className="font-display text-2xl">¿Por qué elegir nuestro alojamiento temporal?</h3>
          <ul className="space-y-2 text-ink-soft">
            <li>• Totalmente amueblados y listos para entrar</li>
            <li>• Duraciones flexibles de 1 a 11 meses</li>
            <li>• Ubicaciones: {NEIGHBORHOODS.slice(0, 5).join(", ")}</li>
          </ul>
          <Link href="/alquiler-temporal" className="btn btn-primary">
            Ver Todos Los Apartamentos
          </Link>
        </div>
      </section>

      <section className="container-s4d mt-20">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-sea">Tipos de vivienda</p>
          <h2 className="font-display text-4xl">Elige tu estilo de estancia</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {stayStyles.map((t) => (
            <Link
              key={t.slug}
              href={`/tipo/${t.slug}`}
              className="group overflow-hidden rounded-2xl border border-[var(--line)] bg-white/85 transition hover:border-sea"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                <Image
                  src={t.image}
                  alt={t.propertyName ? `${t.label}: ${t.propertyName}` : t.label}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.05]"
                />
              </div>
              <div className="px-3 py-4 text-center">
                <p className="font-semibold leading-snug transition group-hover:text-sea">{t.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-s4d mt-20 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Descuentos actividades",
            text: "Descuentos en entradas para museos, monumentos y experiencias.",
          },
          {
            title: "Sorteos mensuales",
            text: "Disfruta de entradas y experiencias gratis durante tu estancia.",
          },
          {
            title: "Servicio de concierge",
            text: "Tours privados y experiencias únicas totalmente personalizadas.",
          },
        ].map((s) => (
          <div key={s.title} className="rounded-3xl bg-ink p-7 text-white">
            <h3 className="font-display text-2xl">{s.title}</h3>
            <p className="mt-3 text-sm text-white/75">{s.text}</p>
          </div>
        ))}
      </section>

      <section className="container-s4d mt-20 mb-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-sea">Tickets</p>
            <h2 className="font-display text-4xl">Entradas y experiencias</h2>
            <p className="mt-2 text-ink-soft">La compra se completa en Tiqets, igual que en la web original.</p>
          </div>
          <Link href="/tickets" className="btn btn-secondary">
            Ver todos
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tickets.map((t) => (
            <TicketCard key={t.id} ticket={t} />
          ))}
        </div>
      </section>
    </>
  );
}
