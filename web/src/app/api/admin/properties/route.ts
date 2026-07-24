import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getProperties, getSettings, saveProperties, saveSettings } from "@/lib/store";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const properties = await getProperties();
  return NextResponse.json({ items: properties, count: properties.length });
}

export async function DELETE(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "ID requerido" }, { status: 400 });

  const mode = searchParams.get("mode") || "hide";
  const properties = await getProperties();

  if (mode === "hard") {
    await saveProperties(properties.filter((p) => p.id !== id));
  } else {
    const settings = await getSettings();
    if (!settings.hiddenPropertyIds.includes(id)) {
      settings.hiddenPropertyIds.push(id);
      await saveSettings(settings);
    }
    await saveProperties(
      properties.map((p) => (p.id === id ? { ...p, visible: false, active: false } : p)),
    );
  }

  return NextResponse.json({ ok: true });
}

export async function PATCH(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const id = Number(body.id);
  if (!id) return NextResponse.json({ error: "ID requerido" }, { status: 400 });

  const properties = await getProperties();
  const settings = await getSettings();
  const next = properties.map((p) => {
    if (p.id !== id) return p;
    return {
      ...p,
      visible: body.visible ?? p.visible,
      active: body.active ?? p.active,
      temporary: body.temporary ?? p.temporary,
    };
  });

  if (body.visible === true) {
    settings.hiddenPropertyIds = settings.hiddenPropertyIds.filter((x) => x !== id);
  } else if (body.visible === false && !settings.hiddenPropertyIds.includes(id)) {
    settings.hiddenPropertyIds.push(id);
  }
  await saveSettings(settings);
  await saveProperties(next);
  return NextResponse.json({ ok: true });
}
