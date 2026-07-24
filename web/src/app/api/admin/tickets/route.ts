import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getTickets, saveTickets } from "@/lib/store";
import { uid } from "@/lib/utils";
import type { Ticket } from "@/lib/types";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const items = await getTickets();
  return NextResponse.json({ items, count: items.length });
}

export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const ticket: Ticket = {
    id: uid("ticket"),
    title: String(body.title || "Nuevo ticket"),
    type: String(body.type || "Experiencia"),
    languages: body.languages,
    duration: body.duration,
    availability: body.availability,
    includes: Array.isArray(body.includes)
      ? body.includes.map(String)
      : String(body.includes || "")
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
    priceFrom: Number(body.priceFrom || 0),
    currency: "EUR",
    rating: Number(body.rating || 0),
    reviewCount: Number(body.reviewCount || 0),
    image: String(body.image || ""),
    images: [],
    tiqetsUrl: String(body.tiqetsUrl || "https://www.tiqets.com/"),
    active: body.active !== false,
    createdAt: new Date().toISOString(),
  };
  const items = await getTickets();
  items.unshift(ticket);
  await saveTickets(items);
  return NextResponse.json({ ok: true, item: ticket });
}

export async function DELETE(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const id = new URL(req.url).searchParams.get("id");
  const items = await getTickets();
  await saveTickets(items.filter((t) => t.id !== id));
  return NextResponse.json({ ok: true });
}
