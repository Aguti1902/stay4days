"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  CreditCard,
  Ticket,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Resumen", icon: LayoutDashboard, exact: true },
  { href: "/admin/propiedades", label: "Propiedades", icon: Building2 },
  { href: "/admin/contactos", label: "Contactos", icon: MessageSquare },
  { href: "/admin/pagos", label: "Pagos", icon: CreditCard },
  { href: "/admin/tickets", label: "Tickets", icon: Ticket },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    window.location.href = "/admin/login";
  }

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--sun)] text-[#0b1f2a]">
          <Sparkles size={18} />
        </div>
        <div>
          <p className="font-display text-lg leading-tight text-white">Stay4Days</p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">Admin</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-5">
        {nav.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                active
                  ? "bg-white/12 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                  : "text-white/65 hover:bg-white/6 hover:text-white",
              )}
            >
              <item.icon size={18} className={active ? "text-[var(--sun)]" : "text-white/45"} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-white/10 p-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/65 transition hover:bg-white/6 hover:text-white"
        >
          <ExternalLink size={18} className="text-white/45" />
          Ver web
        </Link>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/65 transition hover:bg-white/6 hover:text-white"
        >
          <LogOut size={18} className="text-white/45" />
          Salir
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#eef3f5] text-ink">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 bg-[linear-gradient(180deg,#0b1f2a_0%,#0a3a42_55%,#0f7c86_140%)] lg:block">
        {sidebar}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/45"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-[min(288px,86vw)] bg-[linear-gradient(180deg,#0b1f2a_0%,#0a3a42_55%,#0f7c86_140%)] shadow-2xl">
            <div className="absolute right-3 top-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/20 p-2 text-white"
                aria-label="Cerrar"
              >
                <X size={16} />
              </button>
            </div>
            {sidebar}
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-white/85 backdrop-blur-md">
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-xl border border-[var(--line)] bg-white p-2 lg:hidden"
                onClick={() => setOpen(true)}
                aria-label="Abrir menú"
              >
                <Menu size={18} />
              </button>
              <div className="relative hidden h-8 w-28 sm:block lg:hidden">
                <Image src="/logo.png" alt="Stay4Days" fill className="object-contain object-left" sizes="112px" />
              </div>
              <p className="text-sm font-semibold text-ink-soft">Panel de control</p>
            </div>
            <Link href="/" className="text-sm font-semibold text-sea hover:underline lg:hidden">
              Ver web
            </Link>
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
