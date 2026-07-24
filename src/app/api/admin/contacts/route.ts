import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getContacts, saveContacts } from "@/lib/store";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const items = await getContacts();
  return NextResponse.json({ items, count: items.length });
}

export async function PATCH(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const contacts = await getContacts();
  const next = contacts.map((c) =>
    c.id === body.id ? { ...c, status: body.status ?? c.status } : c,
  );
  await saveContacts(next);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const id = new URL(req.url).searchParams.get("id");
  const contacts = await getContacts();
  await saveContacts(contacts.filter((c) => c.id !== id));
  return NextResponse.json({ ok: true });
}
