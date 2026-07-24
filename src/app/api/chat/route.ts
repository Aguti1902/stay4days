import { NextResponse } from "next/server";
import { answerChat } from "@/lib/chat";
import { bumpStat } from "@/lib/store";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const message = String(body.message || "").trim();
  if (!message) {
    return NextResponse.json({ error: "Mensaje vacío" }, { status: 400 });
  }
  await bumpStat("chatMessages");
  const reply = await answerChat(message);
  return NextResponse.json({ reply });
}
