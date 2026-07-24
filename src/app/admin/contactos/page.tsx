import { requireAdmin } from "@/lib/require-admin";
import { getContacts } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { ContactAdminActions } from "@/components/admin/ContactAdminActions";

export default async function AdminContactsPage() {
  await requireAdmin();
  const contacts = await getContacts();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl">Personas que han contactado</h1>
        <p className="mt-2 text-ink-soft">Consultas del formulario, fichas de propiedad y chatbot.</p>
      </div>
      <div className="space-y-3">
        {contacts.map((c) => (
          <article key={c.id} className="rounded-2xl border border-[var(--line)] bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold text-lg">{c.name}</h2>
                <p className="text-sm text-ink-soft">
                  {c.email}
                  {c.phone ? ` · ${c.phone}` : ""} · {formatDate(c.createdAt)} · origen {c.source}
                </p>
                {c.propertyName && (
                  <p className="mt-1 text-sm font-semibold text-sea">Propiedad: {c.propertyName}</p>
                )}
              </div>
              <ContactAdminActions id={c.id} status={c.status} />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft whitespace-pre-wrap">{c.message}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
