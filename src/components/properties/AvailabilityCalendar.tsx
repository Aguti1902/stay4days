"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function toKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function overlapsUnavailable(arrival: string, departure: string, unavailable: Set<string>) {
  const [ay, am, ad] = arrival.split("-").map(Number);
  const [by, bm, bd] = departure.split("-").map(Number);
  const start = new Date(ay, am - 1, ad);
  const end = new Date(by, bm - 1, bd);
  for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
    if (unavailable.has(toKey(d))) return true;
  }
  return false;
}

export function AvailabilityCalendar({
  propertyId,
  arrival,
  departure,
  onChange,
}: {
  propertyId: number;
  arrival: string;
  departure: string;
  onChange: (next: { arrival: string; departure: string }) => void;
}) {
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const [unavailable, setUnavailable] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [selecting, setSelecting] = useState<"arrival" | "departure">("arrival");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/booking/availability?propertyId=${propertyId}`);
        const data = await res.json();
        if (!cancelled && res.ok) {
          setUnavailable(new Set(data.unavailableDates || []));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [propertyId]);

  const days = useMemo(() => {
    const first = startOfMonth(month);
    const startWeekday = (first.getDay() + 6) % 7; // Monday first
    const gridStart = addDays(first, -startWeekday);
    return Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));
  }, [month]);

  const todayKey = toKey(new Date());

  function onDayClick(day: Date) {
    const key = toKey(day);
    if (key < todayKey || unavailable.has(key)) return;

    if (selecting === "arrival" || !arrival || (arrival && departure)) {
      onChange({ arrival: key, departure: "" });
      setSelecting("departure");
      return;
    }

    if (key <= arrival) {
      onChange({ arrival: key, departure: "" });
      setSelecting("departure");
      return;
    }

    const nextDeparture = key;
    // departure day itself can be a blocked night start, but nights before must be free
    if (overlapsUnavailable(arrival, nextDeparture, unavailable)) {
      onChange({ arrival: key, departure: "" });
      setSelecting("departure");
      return;
    }

    onChange({ arrival, departure: nextDeparture });
    setSelecting("arrival");
  }

  const monthLabel = month.toLocaleDateString("es-ES", { month: "long", year: "numeric" });

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-white p-3">
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          className="rounded-full p-1 hover:bg-foam"
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
          aria-label="Mes anterior"
        >
          <ChevronLeft size={16} />
        </button>
        <p className="text-sm font-bold capitalize">{monthLabel}</p>
        <button
          type="button"
          className="rounded-full p-1 hover:bg-foam"
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
          aria-label="Mes siguiente"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase text-ink-soft">
        {["L", "M", "X", "J", "V", "S", "D"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const key = toKey(day);
          const inMonth = day.getMonth() === month.getMonth();
          const isUnavailable = unavailable.has(key) || key < todayKey;
          const isArrival = arrival === key;
          const isDeparture = departure === key;
          const inRange =
            arrival && departure && key > arrival && key < departure
              ? true
              : false;

          return (
            <button
              key={key}
              type="button"
              disabled={isUnavailable}
              onClick={() => onDayClick(day)}
              className={[
                "aspect-square rounded-lg text-xs font-semibold transition",
                !inMonth ? "opacity-40" : "",
                isUnavailable
                  ? "cursor-not-allowed bg-[#f4c7c3] text-[#8a2f28] line-through decoration-[#8a2f28]/40"
                  : "text-ink hover:bg-sea/10",
                isArrival || isDeparture ? "!bg-ink !text-white !no-underline hover:!bg-ink" : "",
                inRange && !isUnavailable ? "bg-sea/15" : "",
              ].join(" ")}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-ink-soft">
        <span className="inline-flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-sm bg-ink" /> Seleccionado
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#f4c7c3]" /> Ocupado / no disponible
        </span>
        <span>Calendario Stay4Days</span>
      </div>
      <p className="mt-2 text-xs text-ink-soft">
        {loading
          ? "Cargando disponibilidad…"
          : selecting === "arrival"
            ? "Selecciona la fecha de entrada"
            : "Selecciona la fecha de salida"}
        {arrival ? ` · Entrada ${arrival}` : ""}
        {departure ? ` · Salida ${departure}` : ""}
      </p>
    </div>
  );
}
