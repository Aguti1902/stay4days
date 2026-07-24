import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = { title: "Condiciones de reserva" };

export default function CondicionesReservaPage() {
  return (
    <LegalPageShell eyebrow="Reservas" title="Condiciones de reserva">
      <p>
        Estas condiciones regulan la solicitud y formalización de reservas de alojamiento a través
        del sitio web de {LEGAL.brand}, incluidas estancias por días/semanas y alquiler temporal de 1
        a 11 meses con pago online.
      </p>
      <p className="text-sm">Última actualización: {LEGAL.lastUpdated}.</p>

      <LegalSection title="1. Ámbito">
        <p>
          Al iniciar una reserva o solicitar un presupuesto online, el usuario acepta estas
          condiciones junto con el{" "}
          <Link href="/aviso-legal" className="text-sea hover:underline">
            Aviso legal
          </Link>{" "}
          y la{" "}
          <Link href="/politica-de-privacidad" className="text-sea hover:underline">
            Política de privacidad
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Proceso de reserva y pago">
        <ol className="list-decimal space-y-2 pl-5">
          <li>Seleccione la vivienda y las fechas de entrada y salida.</li>
          <li>Consulte el precio estimado (puede incluir tasas o cargos adicionales).</li>
          <li>Facilite sus datos de contacto y, si procede, complete el pago online.</li>
          <li>
            El cobro y la confirmación pueden gestionarse a través de OwnerRez y su pasarela de pago
            segura. La reserva se considera formalizada cuando el sistema confirme el pago o cuando{" "}
            {LEGAL.brand} le envíe confirmación escrita.
          </li>
        </ol>
        <p>
          Los precios mostrados «desde» son orientativos por noche; el total definitivo depende de
          fechas, ocupación, temporada y cargos aplicables.
        </p>
      </LegalSection>

      <LegalSection title="3. Alquiler temporal (1–11 meses)">
        <p>
          Todas las viviendas publicadas pueden solicitarse para estancias temporales de 1 a 11 meses.
          La disponibilidad, precio total y condiciones específicas (entrada, fianza, suministros,
          etc.) se confirman en la cotización o contrato correspondiente. El pago online está
          disponible según las opciones activas en cada momento.
        </p>
      </LegalSection>

      <LegalSection title="4. Cancelaciones y modificaciones">
        <p>
          La política de cancelación aplicable se indicará en la cotización o confirmación de cada
          reserva. Las modificaciones de fechas están sujetas a disponibilidad y posible ajuste de
          precio. Para cambios urgentes contacte en {LEGAL.phone} o {LEGAL.email}.
        </p>
      </LegalSection>

      <LegalSection title="5. Obligaciones del huésped">
        <ul className="list-disc space-y-1 pl-5">
          <li>Facilitar datos veraces y un medio de contacto operativo.</li>
          <li>Respetar las normas de la vivienda, vecinos y normativa local.</li>
          <li>Hacer un uso diligente del alojamiento y devolverlo en buen estado.</li>
          <li>Informar de incidencias lo antes posible durante la estancia.</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Tickets y experiencias">
        <p>
          Las entradas y experiencias enlazadas desde {LEGAL.brand} se adquieren en plataformas de
          terceros (p. ej. Tiqets). Su compra, pago, cancelación y atención postventa se rigen por
          las condiciones de ese proveedor.
        </p>
      </LegalSection>

      <LegalSection title="7. Responsabilidad">
        <p>
          {LEGAL.brand} actúa como intermediario/gestor de alojamientos según cada caso. No responde
          de circunstancias de fuerza mayor, retrasos de transporte del huésped o daños causados por
          un uso indebido del inmueble. Cualquier reclamación debe comunicarse por escrito a{" "}
          {LEGAL.email}.
        </p>
      </LegalSection>

      <LegalSection title="8. Contacto">
        <p>
          WhatsApp / teléfono:{" "}
          <a href={LEGAL.phoneHref} className="text-sea hover:underline">
            {LEGAL.phone}
          </a>
          . Email:{" "}
          <a href={`mailto:${LEGAL.email}`} className="text-sea hover:underline">
            {LEGAL.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
