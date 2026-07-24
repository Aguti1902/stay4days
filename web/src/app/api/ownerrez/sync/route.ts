import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getProperties, getSettings, saveProperties, saveSettings } from "@/lib/store";
import { isOwnerRezConfigured, OwnerRezError, syncAllProperties } from "@/lib/ownerrez";

export async function POST() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (!isOwnerRezConfigured()) {
    return NextResponse.json(
      {
        error:
          "Configura OWNERREZ_EMAIL y OWNERREZ_TOKEN en .env.local para importar propiedades reales.",
      },
      { status: 400 },
    );
  }

  try {
    const existing = await getProperties();
    const { properties, imported, updated } = await syncAllProperties(existing);
    await saveProperties(properties);
    const settings = await getSettings();
    settings.lastOwnerrezSync = new Date().toISOString();
    await saveSettings(settings);
    return NextResponse.json({
      ok: true,
      total: properties.length,
      imported,
      updated,
      syncedAt: settings.lastOwnerrezSync,
    });
  } catch (err) {
    const message = err instanceof OwnerRezError ? err.message : "Error sincronizando OwnerRez";
    const status = err instanceof OwnerRezError ? err.status : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
