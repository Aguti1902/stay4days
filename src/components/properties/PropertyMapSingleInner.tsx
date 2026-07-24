"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = L.divIcon({
  className: "",
  html: `<div style="width:16px;height:16px;border-radius:999px;background:#0f7c86;border:2px solid white;box-shadow:0 2px 8px rgba(11,31,42,.35)"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

export function PropertyMapSingleInner({
  latitude,
  longitude,
  name,
}: {
  latitude: number;
  longitude: number;
  name: string;
}) {
  return (
    <div className="h-full overflow-hidden rounded-2xl border border-[var(--line)]">
      <MapContainer center={[latitude, longitude]} zoom={13} className="h-full w-full" scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]} icon={markerIcon}>
          <Popup>{name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
