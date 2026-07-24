import { NextResponse } from "next/server";
import { getVisibleProperties } from "@/lib/store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tipo = searchParams.get("tipo");
  const guests = Number(searchParams.get("huespedes") || 0);
  let properties = await getVisibleProperties();
  if (tipo) properties = properties.filter((p) => p.type === tipo);
  if (guests) properties = properties.filter((p) => p.guests >= guests);
  return NextResponse.json({ count: properties.length, items: properties });
}
