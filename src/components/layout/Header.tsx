"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/propiedades", label: "Propiedades" },
  { href: "/alquiler-temporal", label: "Alquiler temporal" },
  { href: "/tickets", label: "Tickets" },
  { href: "/contactar", label: "Contactar" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[rgba(247,251,252,0.85)] backdrop-blur-md">
        <div className="container-s4d flex h-16 items-center justify-between gap-4">
          <Link href="/" className="relative flex h-10 w-[160px] shrink-0 items-center md:h-11 md:w-[180px]">
            <Image
              src="/logo.png"
              alt="Stay4Days"
              fill
              className="object-contain object-left"
              sizes="180px"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-sm font-semibold transition-colors",
                  pathname === l.href ? "text-sea" : "text-ink-soft hover:text-sea",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a href="tel:+34636042534" className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft">
              <Phone size={16} /> +34 636 042 534
            </a>
            <Link href="/propiedades" className="btn btn-primary !py-2.5 !px-4 text-sm">
              Reservar
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden rounded-full border border-[var(--line)] bg-white/90 p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[var(--ink)] text-white md:hidden">
          <div className="container-s4d flex h-16 items-center justify-between">
            <Link href="/" className="relative block h-10 w-[160px]" onClick={() => setOpen(false)}>
              <Image
                src="/logo-white.png"
                alt="Stay4Days"
                fill
                className="object-contain object-left"
                sizes="160px"
              />
            </Link>
            <button
              type="button"
              className="rounded-full border border-white/25 p-2"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="container-s4d flex flex-1 flex-col justify-center gap-2 pb-10">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-4 font-display text-3xl transition hover:text-[var(--sun)]"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="tel:+34636042534"
              className="mt-8 inline-flex items-center gap-3 text-lg font-semibold text-white/85"
            >
              <Phone size={18} /> +34 636 042 534
            </a>
            <Link
              href="/propiedades"
              onClick={() => setOpen(false)}
              className="btn mt-6 w-fit bg-white !text-[#0b1f2a] hover:bg-[var(--sun)]"
            >
              Reservar ahora
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
