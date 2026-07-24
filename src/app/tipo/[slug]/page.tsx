export const dynamic = 'force-dynamic';

import { PropertyCard } from "@/components/properties/PropertyCard";
import { getVisibleProperties, bumpStat } from "@/lib/store";
import { labelForType, PROPERTY_TYPES } from "@/lib/property-types";
import type { PropertyType } from "@/lib/types";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return PROPERTY_TYPES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: labelForType(slug) };
}

export default async function TypePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const valid = PROPERTY_TYPES.some((t) => t.slug === slug);
  if (!valid) notFound();
  await bumpStat("pageViews");
  const properties = (await getVisibleProperties()).filter((p) => p.type === (slug as PropertyType));

  return (
    <div className="container-s4d py-12">
      <h1 className="font-display text-4xl md:text-5xl">{labelForType(slug)}</h1>
      <p className="mt-3 text-ink-soft">{properties.length} propiedades de este tipo.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </div>
  );
}
