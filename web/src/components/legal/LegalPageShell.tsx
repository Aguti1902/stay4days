import type { ReactNode } from "react";
import Link from "next/link";

export function LegalPageShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="container-s4d py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-sea">{eyebrow}</p>
        <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl">{title}</h1>
        <div className="prose-legal mt-10 space-y-8 text-[15px] leading-relaxed text-ink-soft">
          {children}
        </div>
        <div className="mt-12 flex flex-wrap gap-4 border-t border-[var(--line)] pt-8 text-sm font-semibold">
          <Link href="/aviso-legal" className="text-sea hover:underline">
            Aviso legal
          </Link>
          <Link href="/politica-de-privacidad" className="text-sea hover:underline">
            Privacidad
          </Link>
          <Link href="/politica-de-cookies" className="text-sea hover:underline">
            Cookies
          </Link>
          <Link href="/condiciones-de-reserva" className="text-sea hover:underline">
            Condiciones de reserva
          </Link>
        </div>
      </div>
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl text-ink">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
