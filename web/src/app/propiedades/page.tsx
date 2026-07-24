export const dynamic = "force-dynamic";

import { SearchBar } from "@/components/home/SearchBar";
import { PropertiesExplorer } from "@/components/properties/PropertiesExplorer";
import { getVisibleProperties, bumpStat } from "@/lib/store";
import { labelForType } from "@/lib/property-types";
import type { PropertyType } from "@/lib/types";
import { isOwnerRezConfigured, searchAvailablePropertyIds } from "@/lib/ownerrez";

export const metadata = { title: "Propiedades" };

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  await bumpStat("pageViews");
  await bumpStat("searches");
  const params = await searchParams;
  const all = await getVisibleProperties();

  const tipo = params.tipo as PropertyType | undefined;
  const guests = Number(params.huespedes || 0);
  const checkin = params.checkin;
  const checkout = params.checkout;

  let availableIds: number[] | null = null;
  if (checkin && checkout && isOwnerRezConfigured()) {
    try {
      availableIds = await searchAvailablePropertyIds({
        from: checkin,
        to: checkout,
        guests: guests || undefined,
      });
    } catch {
      availableIds = null;
    }
  }

  const filtered = all.filter((p) => {
    if (tipo && p.type !== tipo) return false;
    if (guests && p.guests < guests) return false;
    if (availableIds && !availableIds.includes(p.id)) return false;
    return true;
  });

  return (
    <div className="container-s4d py-12">
      <div className="mb-8 max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-sea">Catálogo</p>
        <h1 className="font-display text-4xl md:text-5xl">Propiedades en Barcelona y alrededores</h1>
        <p className="mt-3 text-ink-soft">
          Explora el listado y el mapa. Filtra por tipo, fechas y huéspedes.
          {tipo ? ` Mostrando: ${labelForType(tipo)}.` : ""}
          {availableIds ? " Disponibilidad consultada en OwnerRez." : ""}
        </p>
      </div>
      <SearchBar compact />
      <PropertiesExplorer properties={filtered} />
      {filtered.length === 0 && (
        <p className="mt-10 rounded-2xl border border-[var(--line)] bg-white/70 p-8 text-ink-soft">
          No hay propiedades con esos filtros. Prueba otras fechas o menos huéspedes.
        </p>
      )}
    </div>
  );
}
