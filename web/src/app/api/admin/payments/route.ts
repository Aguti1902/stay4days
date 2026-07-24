import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
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
  const payment: PaymentRecord = {
    id: uid("pay"),
    guestName: String(body.guestName || ""),
    email: String(body.email || ""),
    propertyId: body.propertyId ? Number(body.propertyId) : undefined,
    propertyName: String(body.propertyName || ""),
    amount: Number(body.amount || 0),
    currency: String(body.currency || "EUR"),
    status: (body.status as PaymentRecord["status"]) || "paid",
    checkIn: body.checkIn,
    checkOut: body.checkOut,
    createdAt: new Date().toISOString(),
    notes: body.notes,
  };
  const items = await getPayments();
  items.unshift(payment);
  await savePayments(items);
  return NextResponse.json({ ok: true, item: payment });
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
