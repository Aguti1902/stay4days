"use client";

import { FormEvent, useMemo, useState } from "react";
import { formatEuro } from "@/lib/utils";
import { translateChargeDescription } from "@/lib/i18n-es";
import { AvailabilityCalendar } from "@/components/properties/AvailabilityCalendar";

type Charge = { amount: number; description?: string; type?: string };

type PreviewQuote = {
  total: number;
  charges: Charge[];
  arrival: string;
  departure: string;
};

export function BookingWidget({
  propertyId,
  propertyName,
  nightlyFrom,
  maxGuests,
}: {
  propertyId: number;
  propertyName: string;
  nightlyFrom: number;
  maxGuests: number;
}) {
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preview, setPreview] = useState<PreviewQuote | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<"preview" | "book" | null>(null);

  const nights = useMemo(() => {
    if (!arrival || !departure) return 0;
    const a = new Date(arrival).getTime();
    const d = new Date(departure).getTime();
    return Math.max(0, Math.round((d - a) / 86400000));
  }, [arrival, departure]);

  async function run(mode: "preview" | "book") {
    setError("");
    setPreview(null);
    if (!arrival || !departure) {
      setError("Selecciona entrada y salida en el calendario.");
      return;
    }
    setLoading(mode);
    try {
      const res = await fetch("/api/booking/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          propertyId,
          arrival,
          departure,
          adults,
          children,
          firstName,
          lastName,
          email,
          phone,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error de reserva");

      if (mode === "preview") {
        setPreview(data.quote);
      } else if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de reserva");
    } finally {
      setLoading(null);
    }
  }

  function onPreview(e: FormEvent) {
    e.preventDefault();
    void run("preview");
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-[var(--sun)] px-4 py-3 text-ink">
        <p className="font-display text-xl font-semibold tracking-tight">
          Stay<span className="text-ink">4</span>Days
        </p>
        <p className="font-display text-2xl font-semibold">
          Desde {formatEuro(nightlyFrom)}
          <span className="text-base font-semibold"> / noche</span>
        </p>
        <p className="mt-1 text-sm font-medium text-ink/80">
          También para estancias de 1–11 meses · Pago online
        </p>
      </div>

      <AvailabilityCalendar
        propertyId={propertyId}
        arrival={arrival}
        departure={departure}
        onChange={({ arrival: a, departure: d }) => {
          setArrival(a);
          setDeparture(d);
          setPreview(null);
          setError("");
        }}
      />

      <form onSubmit={onPreview} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.08em] text-ink-soft">
            Adultos
            <input
              type="number"
              min={1}
              max={maxGuests}
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="rounded-xl border border-[var(--line)] px-3 py-2.5 text-sm font-semibold normal-case tracking-normal"
            />
          </label>
          <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.08em] text-ink-soft">
            Niños
            <input
              type="number"
              min={0}
              max={maxGuests}
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className="rounded-xl border border-[var(--line)] px-3 py-2.5 text-sm font-semibold normal-case tracking-normal"
            />
          </label>
        </div>

        {nights > 0 && (
          <p className="text-sm text-ink-soft">
            {nights} noche{nights === 1 ? "" : "s"} en {propertyName}
          </p>
        )}

        <button type="submit" disabled={loading !== null || !arrival || !departure} className="btn btn-secondary w-full">
          {loading === "preview" ? "Calculando…" : "Ver precio"}
        </button>
      </form>

      {preview && (
        <div className="space-y-2 rounded-2xl border border-[var(--line)] bg-foam p-4">
          <p className="font-display text-xl">Total estimado: {formatEuro(preview.total)}</p>
          <ul className="space-y-1 text-sm text-ink-soft">
            {preview.charges.map((c, i) => (
              <li key={i} className="flex justify-between gap-3">
                <span>{translateChargeDescription(c.description, c.type)}</span>
                <span className="font-semibold text-ink">{formatEuro(c.amount)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-3 border-t border-[var(--line)] pt-4">
        <p className="text-sm font-semibold text-ink">Datos para completar la reserva</p>
        <div className="grid grid-cols-2 gap-3">
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Nombre"
            className="rounded-xl border border-[var(--line)] px-3 py-2.5 text-sm"
          />
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Apellidos"
            className="rounded-xl border border-[var(--line)] px-3 py-2.5 text-sm"
          />
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full rounded-xl border border-[var(--line)] px-3 py-2.5 text-sm"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Teléfono (opcional)"
          className="w-full rounded-xl border border-[var(--line)] px-3 py-2.5 text-sm"
        />
        <button
          type="button"
          disabled={loading !== null || !arrival || !departure || !firstName || !email}
          onClick={() => void run("book")}
          className="btn btn-primary w-full"
        >
          {loading === "book" ? "Creando reserva…" : "Reservar y pagar"}
        </button>
        <p className="text-xs text-ink-soft">
          Te redirigimos al pago seguro para completar la reserva con tarjeta.
        </p>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
