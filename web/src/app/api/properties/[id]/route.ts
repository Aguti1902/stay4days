import { NextResponse } from "next/server";
import { getPropertyById } from "@/lib/store";

export async function GET(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const property = await getPropertyById(Number(id));
  if (!property || property.visible === false) {
    return NextResponse.json({ error: "No encontrada" }, { status: 404 });
  }
  return NextResponse.json(property);
}
