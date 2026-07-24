import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/auth";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";

const nav = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/propiedades", label: "Propiedades" },
  { href: "/admin/contactos", label: "Contactos" },
  { href: "/admin/pagos", label: "Pagos" },
  { href: "/admin/tickets", label: "Tickets" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAdminAuthenticated();

  return (
    <div className="min-h-screen bg-[#f2f5f6] text-ink">
      {authed && (
        <header className="border-b border-[var(--line)] bg-white">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
            <div className="flex items-center gap-6">
              <Link href="/admin" className="font-display text-xl font-semibold">
                Stay4Days Admin
              </Link>
              <nav className="flex flex-wrap gap-3 text-sm font-semibold">
                {nav.map((n) => (
                  <Link key={n.href} href={n.href} className="text-ink-soft hover:text-sea">
                    {n.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/" className="text-sm font-semibold text-sea">
                Ver web
              </Link>
              <AdminLogoutButton />
            </div>
          </div>
        </header>
      )}
      <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
    </div>
  );
}
