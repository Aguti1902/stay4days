import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPropertyById, getVisibleProperties, bumpStat } from "@/lib/store";
import { labelForType } from "@/lib/property-types";
import { Bath, BedDouble, MapPin, Users, Clock } from "lucide-react";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { ContactPropertyForm } from "@/components/properties/ContactPropertyForm";
import { BookingWidget } from "@/components/properties/BookingWidget";
import { PropertyMapSingle } from "@/components/properties/PropertyMapSingle";
import { AmenitiesSection } from "@/components/properties/AmenitiesSection";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await getPropertyById(Number(id));
  return { title: property?.name || "Propiedad" };
}

export default async function PropertyDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const property = await getPropertyById(Number(id));
  if (!property || property.visible === false) notFound();
  await bumpStat("propertyViews");

  const related = (await getVisibleProperties())
    .filter((p) => p.id !== property.id && (p.type === property.type || p.city === property.city))
    .slice(0, 3);

  const photos = property.photos?.length ? property.photos : property.thumbnail ? [{ url: property.thumbnail }] : [];

  return (
    <div className="container-s4d py-10">
      <div className="mb-6 text-sm text-ink-soft">
        <Link href="/propiedades" className="hover:text-sea">
          Propiedades
        </Link>{" "}
        / {property.name}
      </div>

      {query.reserva === "ok" && (
        <div className="mb-6 rounded-2xl border border-sea/30 bg-sea/10 px-4 py-3 text-sm font-semibold text-sea-deep">
          Gracias. Si completaste el pago en OwnerRez, tu reserva está en proceso de confirmación.
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        <div className="relative min-h-[320px] overflow-hidden rounded-3xl bg-mist md:min-h-[480px]">
          {photos[0] && (
            <Image src={photos[0].url} alt={property.name} fill className="object-cover" priority sizes="50vw" />
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {photos.slice(1, 5).map((ph, i) => (
            <div key={i} className="relative min-h-[150px] overflow-hidden rounded-2xl bg-mist md:min-h-[230px]">
              <Image src={ph.url} alt="" fill className="object-cover" sizes="25vw" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-sea">
              {labelForType(property.type)} · {property.city}
            </p>
            <h1 className="font-display text-4xl md:text-5xl">{property.name}</h1>
            <p className="mt-3 inline-flex items-center gap-2 text-ink-soft">
              <MapPin size={16} /> {property.address ? `${property.address}, ` : ""}
              {property.city}
              {property.postalCode ? `, ${property.postalCode}` : ""} , {property.country}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm font-semibold">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 border border-[var(--line)]">
              <BedDouble size={16} /> {property.bedrooms} habitaciones
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 border border-[var(--line)]">
              <Bath size={16} /> {property.bathrooms} baños
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 border border-[var(--line)]">
              <Users size={16} /> {property.guests} huéspedes
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 border border-[var(--line)]">
              <Clock size={16} /> In {property.checkIn} · Out {property.checkOut}
            </span>
          </div>

          <div className="prose max-w-none text-ink-soft leading-relaxed whitespace-pre-wrap">
            {property.description}
          </div>

          <div className="rounded-2xl border border-sea/30 bg-sea/5 p-5">
            <p className="font-display text-xl text-ink">Disponible para alquiler temporal (1–11 meses)</p>
            <p className="mt-2 text-sm text-ink-soft">
              Ideal para profesionales y estudiantes. Elige tus fechas, consulta el precio y paga online
              de forma segura desde esta ficha.
            </p>
          </div>

          {property.amenities?.length > 0 && <AmenitiesSection amenities={property.amenities} />}

          {typeof property.latitude === "number" && typeof property.longitude === "number" && (
            <div>
              <h2 className="font-display text-2xl">Ubicación</h2>
              <div className="mt-4 h-[320px]">
                <PropertyMapSingle
                  latitude={property.latitude}
                  longitude={property.longitude}
                  name={property.name}
                />
              </div>
            </div>
          )}
        </div>

        <aside className="h-fit space-y-5 rounded-3xl border border-[var(--line)] bg-white/85 p-6 shadow-[0_16px_40px_rgba(11,31,42,0.08)] lg:sticky lg:top-24">
          <BookingWidget
            propertyId={property.id}
            propertyName={property.name}
            nightlyFrom={property.price}
            maxGuests={property.guests}
          />
          <div className="border-t border-[var(--line)] pt-4">
            <p className="mb-3 text-sm font-semibold text-ink-soft">¿Prefieres que te contactemos?</p>
            <ContactPropertyForm propertyId={property.id} propertyName={property.name} />
          </div>
          <a href="https://wa.me/34636042534" target="_blank" rel="noreferrer" className="btn btn-secondary w-full">
            WhatsApp
          </a>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-3xl">También te puede interesar</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
