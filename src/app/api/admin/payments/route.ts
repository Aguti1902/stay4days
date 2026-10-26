import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { notifyPaymentStatusEmail } from "@/lib/email/notify";
import { getPayments, savePayments } from "@/lib/store";
import { uid } from "@/lib/utils";
import type { PaymentRecord } from "@/lib/types";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const items = await getPayments();
  return NextResponse.json({ items, count: items.length });
}

export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const notify = body.notify !== false;
  const payment: PaymentRecord = {
    id: uid("pay"),
    guestName: String(body.guestName || ""),
    email: String(body.email || ""),
    propertyId: body.propertyId ? Number(body.propertyId) : undefined,
    propertyName: String(body.propertyName || ""),
    amount: Number(body.amount || 0),
    currency: String(body.currency || "EUR"),
    status: (body.status as PaymentRecord["status"]) || "paid",
    checkIn: body.checkIn || undefined,
    checkOut: body.checkOut || undefined,
    createdAt: new Date().toISOString(),
    notes: body.notes ? String(body.notes) : undefined,
  };
  const items = await getPayments();
  items.unshift(payment);
  await savePayments(items);

  const emails =
    notify && payment.email
      ? await notifyPaymentStatusEmail(payment).catch((err) => {
          console.error("[payments] email notify failed", err);
          return null;
        })
      : null;

  return NextResponse.json({ ok: true, item: payment, emails });
}

export async function PATCH(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const id = String(body.id || "");
  const status = body.status as PaymentRecord["status"] | undefined;
  const notify = body.notify !== false;

  if (!id || !status || !["paid", "pending", "refunded"].includes(status)) {
    return NextResponse.json({ error: "id y status válidos son obligatorios" }, { status: 400 });
  }

  const items = await getPayments();
  const index = items.findIndex((p) => p.id === id);
  if (index < 0) {
    return NextResponse.json({ error: "Pago no encontrado" }, { status: 404 });
  }

  const previous = items[index];
  const payment: PaymentRecord = { ...previous, status };
  items[index] = payment;
  await savePayments(items);

  const emails =
    notify && previous.status !== status && payment.email
      ? await notifyPaymentStatusEmail(payment).catch((err) => {
          console.error("[payments] email notify failed", err);
          return null;
        })
      : null;

  return NextResponse.json({ ok: true, item: payment, emails });
}

export async function DELETE(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const id = new URL(req.url).searchParams.get("id");
  const items = await getPayments();
  await savePayments(items.filter((p) => p.id !== id));
  return NextResponse.json({ ok: true });
}
