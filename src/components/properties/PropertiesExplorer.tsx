"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { Property } from "@/lib/types";
import { PropertyCard } from "@/components/properties/PropertyCard";

const PropertiesMap = dynamic(
  () => import("@/components/properties/PropertiesMap").then((m) => m.PropertiesMap),
  { ssr: false, loading: () => <div className="min-h-[70vh] rounded-2xl bg-mist" /> },
);

export function PropertiesExplorer({ properties }: { properties: Property[] }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [view, setView] = useState<"split" | "list" | "map">("split");

  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-ink-soft">{properties.length} resultados</p>
        <div className="inline-flex rounded-full border border-[var(--line)] bg-white p-1 text-sm font-semibold">
          {[
            { id: "split", label: "Lista + mapa" },
            { id: "list", label: "Lista" },
            { id: "map", label: "Mapa" },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setView(opt.id as typeof view)}
              className={`rounded-full px-3 py-1.5 ${view === opt.id ? "bg-ink text-white" : "text-ink-soft"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className={view === "split" ? "grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" : "grid"}>
        {view !== "map" && (
          <div
            className={`grid gap-5 content-start ${
              view === "split" ? "grid-cols-1 xl:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
            } ${view === "split" ? "max-h-[78vh] overflow-y-auto pr-1" : ""}`}
          >
            {properties.map((p) => (
              <div key={p.id} onMouseEnter={() => setSelectedId(p.id)} className="min-w-0">
                <PropertyCard property={p} selected={selectedId === p.id} />
              </div>
            ))}
          </div>
        )}

        {view !== "list" && (
          <div className={`${view === "split" ? "sticky top-24 h-[78vh]" : "h-[70vh]"}`}>
            <PropertiesMap properties={properties} selectedId={selectedId} onSelect={setSelectedId} />
          </div>
        )}
      </div>
    </div>
  );
}
