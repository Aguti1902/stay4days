import { groupAmenities } from "@/lib/i18n-es";

export function AmenitiesSection({ amenities }: { amenities: unknown[] }) {
  const groups = groupAmenities(amenities);
  if (!groups.length) return null;

  return (
    <div>
      <h2 className="font-display text-2xl">Instalaciones</h2>
      <div className="mt-5 space-y-6">
        {groups.map((group) => (
          <div key={group.id}>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-sea">{group.label}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={`${group.id}-${item}`}
                  className="rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-sm text-ink"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
