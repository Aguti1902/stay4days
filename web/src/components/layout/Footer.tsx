"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { openCookieSettings } from "@/components/legal/CookieBanner";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="mt-20 border-t border-[var(--line)] bg-[rgba(11,31,42,0.96)] text-white">
      <div className="container-s4d grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="relative block h-12 w-[200px]">
            <Image
              src="/logo-white.png"
              alt="Stay4Days"
              fill
              className="object-contain object-left"
              sizes="200px"
            />
          </Link>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">
            Agencia familiar con más de 8 años en el sector turístico. Apartamentos y casas en Barcelona
            y alrededores para días, semanas o estancias temporales de 1 a 11 meses.
          </p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-white/50">Explorar</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-white/85">
            <Link href="/propiedades">Propiedades</Link>
            <Link href="/alquiler-temporal">Alquiler temporal</Link>
            <Link href="/tickets">Tickets y experiencias</Link>
            <Link href="/contactar">Contactar</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-white/50">Legal</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-white/85">
            <Link href="/aviso-legal">Aviso legal</Link>
            <Link href="/politica-de-privacidad">Política de privacidad</Link>
            <Link href="/politica-de-cookies">Política de cookies</Link>
            <Link href="/condiciones-de-reserva">Condiciones de reserva</Link>
            <button
              type="button"
              onClick={() => openCookieSettings()}
              className="text-left text-white/85 hover:text-white"
            >
              Configurar cookies
            </button>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-white/50">Contacto</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-white/85">
            <a href="tel:+34636042534">+34 636 042 534</a>
            <a href="mailto:stayfourdays@gmail.com">stayfourdays@gmail.com</a>
            <a href="https://wa.me/34636042534" target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a href="https://www.instagram.com/stay4days/?hl=es" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <Link href="/contactar">Formulario de contacto</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-s4d py-5 text-xs text-white/45">
          <span>© {new Date().getFullYear()} Stay4Days. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
