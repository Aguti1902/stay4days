import { NextResponse } from "next/server";
import { bumpStat, getStats } from "@/lib/store";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  return NextResponse.json(await getStats());
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const key = body.key as
    | "pageViews"
    | "propertyViews"
    | "searches"
    | "chatMessages"
    | "contacts"
    | "ticketClicks"
    | undefined;
  if (!key) return NextResponse.json({ error: "key requerida" }, { status: 400 });
  // Public bump for analytics events (ticket clicks, etc.)
  const stats = await bumpStat(key);
  return NextResponse.json({ ok: true, stats });
}
