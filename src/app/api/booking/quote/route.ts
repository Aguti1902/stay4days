import { NextResponse } from "next/server";
import {
  OwnerRezError,
  createBookableQuote,
  createGuest,
  isOwnerRezConfigured,
  previewQuote,
  translateOwnerRezMessage,
} from "@/lib/ownerrez";
import { getPayments, getPropertyById, savePayments } from "@/lib/store";
import { uid } from "@/lib/utils";

export async function POST(req: Request) {
  if (!isOwnerRezConfigured()) {
    return NextResponse.json(
      { error: "OwnerRez no está configurado. Añade OWNERREZ_EMAIL y OWNERREZ_TOKEN." },
      { status: 400 },
    );
  }

  const body = await req.json().catch(() => ({}));
  const mode = body.mode === "book" ? "book" : "preview";
  const propertyId = Number(body.propertyId);
  const arrival = String(body.arrival || "");
  const departure = String(body.departure || "");
  const adults = Math.max(1, Number(body.adults || 1));
  const children = Math.max(0, Number(body.children || 0));
  const pets = Math.max(0, Number(body.pets || 0));

  if (!propertyId || !arrival || !departure) {
    return NextResponse.json({ error: "Faltan propiedad o fechas." }, { status: 400 });
  }
  if (new Date(departure) <= new Date(arrival)) {
    return NextResponse.json({ error: "La salida debe ser posterior a la llegada." }, { status: 400 });
  }

  const property = await getPropertyById(propertyId);
  if (!property || property.visible === false) {
    return NextResponse.json({ error: "Propiedad no encontrada." }, { status: 404 });
  }

  try {
    if (mode === "preview") {
      const quote = await previewQuote({ propertyId, arrival, departure, adults, children, pets });
      return NextResponse.json({ ok: true, mode, quote });
    }

    const firstName = String(body.firstName || "").trim();
    const lastName = String(body.lastName || "").trim() || "Huésped";
    const email = String(body.email || "").trim();
    const phone = body.phone ? String(body.phone).trim() : undefined;

    if (!firstName || !email) {
      return NextResponse.json({ error: "Nombre y email son obligatorios para reservar." }, { status: 400 });
    }

    const guest = await createGuest({ firstName, lastName, email, phone });
    const origin = new URL(req.url).origin;
    const quote = await createBookableQuote({
      propertyId,
      arrival,
      departure,
      adults,
      children,
      pets,
      guestId: guest.id,
      notes: `Reserva web Stay4Days · ${property.name}`,
      redirectAfterBookingUrl: `${origin}/propiedades/${propertyId}?reserva=ok`,
    });

    const payments = await getPayments();
    payments.unshift({
      id: uid("pay"),
      guestName: `${firstName} ${lastName}`.trim(),
      email,
      propertyId,
      propertyName: property.name,
      amount: quote.total,
      currency: property.currency || "EUR",
      status: "pending",
      checkIn: arrival,
      checkOut: departure,
      createdAt: new Date().toISOString(),
      notes: `OwnerRez quote #${quote.id || quote.key} · pago en ${quote.paymentUrl}`,
    });
    await savePayments(payments);

    return NextResponse.json({
      ok: true,
      mode,
      quote,
      paymentUrl: quote.paymentUrl,
    });
  } catch (err) {
    const raw = err instanceof OwnerRezError ? err.message : "No se pudo crear la cotización.";
    const message = translateOwnerRezMessage(raw);
    const status = err instanceof OwnerRezError ? err.status : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
