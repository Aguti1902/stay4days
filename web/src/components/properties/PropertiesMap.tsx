"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import type { Property } from "@/lib/types";
import { labelForType } from "@/lib/property-types";
import { formatEuro } from "@/lib/utils";
import "leaflet/dist/leaflet.css";

const markerIcon = L.divIcon({
  className: "",
  html: `<div style="width:18px;height:18px;border-radius:999px;background:linear-gradient(135deg,#0f7c86,#0a5c64);border:2.5px solid white;box-shadow:0 4px 14px rgba(11,31,42,.35)"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const selectedMarkerIcon = L.divIcon({
  className: "",
  html: `<div style="width:22px;height:22px;border-radius:999px;background:linear-gradient(135deg,#e8a54b,#0f7c86);border:3px solid white;box-shadow:0 6px 18px rgba(11,31,42,.4)"></div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (!points.length) return;
    if (points.length === 1) {
      map.setView(points[0], 12);
      return;
    }
    map.fitBounds(points, { padding: [40, 40] });
  }, [map, points]);
  return null;
}

function plural(count: number, one: string, many: string) {
  return `${count} ${count === 1 ? one : many}`;
}

export function PropertiesMap({
  properties,
  selectedId,
  onSelect,
}: {
  properties: Property[];
  selectedId?: number | null;
  onSelect?: (id: number) => void;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const withCoords = useMemo(
    () => properties.filter((p) => typeof p.latitude === "number" && typeof p.longitude === "number"),
    [properties],
  );

  const points = useMemo(
    () => withCoords.map((p) => [p.latitude as number, p.longitude as number] as [number, number]),
    [withCoords],
  );

  if (!ready) {
    return (
      <div className="flex h-full min-h-[420px] items-center justify-center rounded-2xl bg-mist text-sm text-ink-soft">
        Cargando mapa…
      </div>
    );
  }

  if (!withCoords.length) {
    return (
      <div className="flex h-full min-h-[420px] items-center justify-center rounded-2xl border border-[var(--line)] bg-white text-sm text-ink-soft">
        No hay coordenadas para mostrar en el mapa.
      </div>
    );
  }

  const center = points[0] || ([41.3874, 2.1686] as [number, number]);

  return (
    <div className="h-full min-h-[420px] overflow-hidden rounded-2xl border border-[var(--line)]">
      <MapContainer center={center} zoom={10} className="h-full min-h-[420px] w-full" scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds points={points} />
        {withCoords.map((p) => (
          <Marker
            key={p.id}
            position={[p.latitude as number, p.longitude as number]}
            icon={selectedId === p.id ? selectedMarkerIcon : markerIcon}
            eventHandlers={{
              click: () => onSelect?.(p.id),
            }}
          >
            <Popup maxWidth={280} minWidth={260} className="s4d-map-popup">
              <div className="s4d-mini-card">
                <div className="s4d-mini-card__media">
                  {p.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.thumbnail} alt={p.name} />
                  ) : (
                    <div className="s4d-mini-card__placeholder">Sin imagen</div>
                  )}
                  <div className="s4d-mini-card__media-fade" />
                  <span className="s4d-mini-card__type">{labelForType(p.type)}</span>
                  <span className="s4d-mini-card__price">{formatEuro(p.price)}/noche</span>
                </div>

                <div className="s4d-mini-card__body">
                  <p className="s4d-mini-card__city">{p.city}</p>
                  <p className="s4d-mini-card__title" title={p.name}>
                    {p.name}
                  </p>

                  <div className="s4d-mini-card__stats">
                    <span>{plural(p.bedrooms, "hab", "hab")}</span>
                    <span>{plural(p.bathrooms, "baño", "baños")}</span>
                    <span>{plural(p.guests, "huésped", "huéspedes")}</span>
                  </div>

                  <Link href={`/propiedades/${p.id}`} className="s4d-mini-card__cta">
                    Ver alojamiento
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
