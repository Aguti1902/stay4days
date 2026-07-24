import Image from "next/image";
import { requireAdmin } from "@/lib/require-admin";
import { getProperties } from "@/lib/store";
import { labelForType } from "@/lib/property-types";
import { formatEuro } from "@/lib/utils";
import { PropertyAdminActions } from "@/components/admin/PropertyAdminActions";

export default async function AdminPropertiesPage() {
  await requireAdmin();
  const properties = await getProperties();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl">Propiedades</h1>
        <p className="mt-2 text-ink-soft">
          Elimina propiedades de la web (ocultar) o restaura su visibilidad. Usa sincronizar OwnerRez
          en el resumen para importar/actualizar todas.
        </p>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[var(--line)] bg-foam text-xs uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-4 py-3">Propiedad</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => (
              <tr key={p.id} className="border-b border-[var(--line)]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-16 overflow-hidden rounded-lg bg-mist">
                      {p.thumbnail && (
                        <Image src={p.thumbnail} alt="" fill className="object-cover" sizes="64px" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-xs text-ink-soft">
                        #{p.id} · {p.city}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{labelForType(p.type)}</td>
                <td className="px-4 py-3">{formatEuro(p.price)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-bold ${
                      p.visible !== false ? "bg-sea/15 text-sea-deep" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.visible !== false ? "Visible" : "Oculta"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <PropertyAdminActions id={p.id} visible={p.visible !== false} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
