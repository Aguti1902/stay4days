"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PROPERTY_TYPES } from "@/lib/property-types";
import { Search } from "lucide-react";

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [type, setType] = useState("");
  const [guests, setGuests] = useState("2");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (type) params.set("tipo", type);
    if (guests) params.set("huespedes", guests);
    if (checkIn) params.set("checkin", checkIn);
    if (checkOut) params.set("checkout", checkOut);
    return params.toString();
  }, [type, guests, checkIn, checkOut]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    router.push(`/propiedades${query ? `?${query}` : ""}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`surface grid gap-3 rounded-2xl p-3 shadow-[0_20px_50px_rgba(11,31,42,0.12)] md:grid-cols-[1.3fr_1fr_1fr_0.8fr_auto] ${
        compact ? "" : "md:p-4"
      }`}
    >
      <label className="grid gap-1 px-2 text-xs font-bold uppercase tracking-[0.08em] text-ink-soft">
        Tipos de vivienda
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-xl border border-[var(--line)] bg-white px-3 py-2.5 text-sm font-semibold text-ink"
        >
          <option value="">Seleccionar</option>
          {PROPERTY_TYPES.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.label}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 px-2 text-xs font-bold uppercase tracking-[0.08em] text-ink-soft">
        Check in
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="rounded-xl border border-[var(--line)] bg-white px-3 py-2.5 text-sm font-semibold"
        />
      </label>
      <label className="grid gap-1 px-2 text-xs font-bold uppercase tracking-[0.08em] text-ink-soft">
        Check out
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="rounded-xl border border-[var(--line)] bg-white px-3 py-2.5 text-sm font-semibold"
        />
      </label>
      <label className="grid gap-1 px-2 text-xs font-bold uppercase tracking-[0.08em] text-ink-soft">
        Personas
        <input
          type="number"
          min={1}
          max={20}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="rounded-xl border border-[var(--line)] bg-white px-3 py-2.5 text-sm font-semibold"
        />
      </label>
      <button type="submit" className="btn btn-primary h-[58px] self-end md:min-w-[120px]">
        <Search size={16} /> Buscar
      </button>
    </form>
  );
}
