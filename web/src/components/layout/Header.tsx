"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
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

  if (pathname?.startsWith("/admin")) return null;

  return (
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
          className="md:hidden rounded-full border border-[var(--line)] p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--line)] bg-white md:hidden">
          <div className="container-s4d flex flex-col gap-3 py-4">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-semibold">
                {l.label}
              </Link>
            ))}
            <a href="tel:+34636042534" className="font-semibold text-sea">
              +34 636 042 534
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
