import Link from "next/link";
import Image from "next/image";
import type { Property } from "@/lib/types";
import { labelForType } from "@/lib/property-types";
import { formatEuro } from "@/lib/utils";
import { Bath, BedDouble, Users } from "lucide-react";

function plural(count: number, one: string, many: string) {
  return `${count} ${count === 1 ? one : many}`;
}

export function PropertyCard({
  property,
  selected = false,
}: {
  property: Property;
  selected?: boolean;
}) {
  return (
    <Link
      href={`/propiedades/${property.id}`}
      className={`group block overflow-hidden rounded-2xl border bg-white shadow-[0_10px_30px_rgba(11,31,42,0.05)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(11,31,42,0.12)] ${
        selected ? "border-sea ring-2 ring-sea/30" : "border-[var(--line)]"
      }`}
    >
      <div className="relative h-48 overflow-hidden bg-mist sm:h-52">
        {property.thumbnail ? (
          <Image
            src={property.thumbnail}
            alt={property.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-ink-soft">Sin imagen</div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-ink shadow-sm">
          {labelForType(property.type)}
        </span>
      </div>

      <div className="space-y-3 p-4">
        <div>
          <p className="text-sm font-semibold text-sea">{property.city}</p>
          <h3 className="mt-0.5 font-display text-lg leading-snug text-ink line-clamp-2" title={property.name}>
            {property.name}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-semibold text-ink-soft">
          <span className="inline-flex items-center gap-1 rounded-full bg-foam px-2.5 py-1">
            <BedDouble size={13} /> {plural(property.bedrooms, "hab", "hab")}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-foam px-2.5 py-1">
            <Bath size={13} /> {plural(property.bathrooms, "baño", "baños")}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-foam px-2.5 py-1">
            <Users size={13} /> {plural(property.guests, "huésped", "huéspedes")}
          </span>
        </div>

        <p className="text-lg font-extrabold text-ink">
          Desde {formatEuro(property.price)}
          <span className="text-sm font-semibold text-ink-soft"> / noche</span>
        </p>
      </div>
    </Link>
  );
}
