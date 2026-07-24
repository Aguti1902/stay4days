import { NextResponse } from "next/server";
import { fetchPropertyBlockedRanges, isOwnerRezConfigured, OwnerRezError } from "@/lib/ownerrez";

export async function GET(req: Request) {
  if (!isOwnerRezConfigured()) {
    return NextResponse.json({ error: "OwnerRez no configurado" }, { status: 400 });
  }

  const { searchParams } = new URL(req.url);
  const propertyId = Number(searchParams.get("propertyId"));
  if (!propertyId) {
    return NextResponse.json({ error: "propertyId requerido" }, { status: 400 });
  }

  const from =
    searchParams.get("from") ||
    new Date().toISOString().slice(0, 10);
  const toDate = new Date();
  toDate.setMonth(toDate.getMonth() + 12);
  const to = searchParams.get("to") || toDate.toISOString().slice(0, 10);

  try {
    const blocked = await fetchPropertyBlockedRanges(propertyId, from, to);
    const unavailableDates = expandBlockedNights(blocked);
    return NextResponse.json({ propertyId, from, to, blocked, unavailableDates });
  } catch (err) {
    const message = err instanceof OwnerRezError ? err.message : "No se pudo cargar disponibilidad";
    const status = err instanceof OwnerRezError ? err.status : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

function expandBlockedNights(blocked: { from: string; to: string }[]) {
  const set = new Set<string>();
  for (const range of blocked) {
    const [fy, fm, fd] = range.from.split("-").map(Number);
    const [ty, tm, td] = range.to.split("-").map(Number);
    const start = new Date(fy, fm - 1, fd);
    const end = new Date(ty, tm - 1, td);
    for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      set.add(`${y}-${m}-${day}`);
    }
  }
  return Array.from(set).sort();
}
