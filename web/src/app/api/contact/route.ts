import { NextResponse } from "next/server";
import { bumpStat, getContacts, saveContacts } from "@/lib/store";
import { uid } from "@/lib/utils";
import type { ContactLead } from "@/lib/types";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
  }

  const lead: ContactLead = {
    id: uid("contact"),
    name,
    email,
    phone: body.phone ? String(body.phone) : undefined,
    message,
    propertyId: body.propertyId ? Number(body.propertyId) : undefined,
    propertyName: body.propertyName ? String(body.propertyName) : undefined,
    source: (body.source as ContactLead["source"]) || "contact",
    status: "new",
    createdAt: new Date().toISOString(),
  };

  const contacts = await getContacts();
  contacts.unshift(lead);
  await saveContacts(contacts);
  await bumpStat("contacts");

  return NextResponse.json({ ok: true, id: lead.id });
}
