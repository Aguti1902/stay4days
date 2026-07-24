import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = { title: "Política de privacidad" };

export default function PrivacidadPage() {
  return (
    <LegalPageShell eyebrow="Protección de datos" title="Política de privacidad">
      <p>
        En {LEGAL.brand} nos comprometemos a proteger los datos personales de nuestros usuarios y
        clientes, de conformidad con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018
        (LOPDGDD), así como la LSSI-CE.
      </p>
      <p className="text-sm">Última actualización: {LEGAL.lastUpdated}.</p>

      <LegalSection title="1. Responsable del tratamiento">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Responsable:</strong> {LEGAL.titular}
          </li>
          <li>
            <strong>Domicilio:</strong> {LEGAL.domicilio}
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${LEGAL.email}`} className="text-sea hover:underline">
              {LEGAL.email}
            </a>
          </li>
          <li>
            <strong>Teléfono:</strong> {LEGAL.phone}
          </li>
          <li>
            <strong>Web:</strong> {LEGAL.site}
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="2. Datos que tratamos">
        <p>Podemos tratar las siguientes categorías de datos:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Identificativos y de contacto:</strong> nombre, apellidos, email, teléfono.
          </li>
          <li>
            <strong>Datos de reserva:</strong> fechas de estancia, número de huéspedes, preferencias,
            mensajes y observaciones.
          </li>
          <li>
            <strong>Datos de navegación:</strong> IP, dispositivo, páginas visitadas y cookies (según
            su consentimiento).
          </li>
          <li>
            <strong>Datos de comunicación:</strong> contenidos enviados por formulario, chat o
            WhatsApp.
          </li>
        </ul>
        <p>No tratamos categorías especiales de datos (salud, ideología, etc.) de forma intencionada.</p>
      </LegalSection>

      <LegalSection title="3. Finalidades y base jurídica">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Gestionar consultas y contacto</strong> (formulario, email, teléfono, chat):
            consentimiento y/o medidas precontractuales (art. 6.1.a y 6.1.b RGPD).
          </li>
          <li>
            <strong>Gestionar reservas y pagos</strong> de alojamiento (incluidas estancias de 1 a 11
            meses): ejecución de contrato / medidas precontractuales (art. 6.1.b RGPD).
          </li>
          <li>
            <strong>Atención al cliente y seguimiento</strong> de la estancia: interés legítimo y/o
            contrato (art. 6.1.b y 6.1.f RGPD).
          </li>
          <li>
            <strong>Cumplir obligaciones legales</strong> fiscales, de consumo o de alojamiento
            turístico: obligación legal (art. 6.1.c RGPD).
          </li>
          <li>
            <strong>Analítica web</strong> (si la acepta en el banner de cookies): consentimiento
            (art. 6.1.a RGPD).
          </li>
          <li>
            <strong>Redes sociales</strong> si interactúa con nuestros perfiles: interés legítimo y
            condiciones de cada red.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Destinatarios y encargados">
        <p>Sus datos pueden comunicarse a:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>OwnerRez</strong> y pasarelas de pago asociadas, para cotizar, reservar y cobrar
            alojamientos.
          </li>
          <li>
            <strong>Tiqets u otros proveedores de experiencias</strong>, solo cuando usted decide
            comprar entradas en su plataforma (se aplicará su propia política).
          </li>
          <li>
            <strong>Proveedores tecnológicos</strong> de hosting, email, mensajería o analítica, en
            calidad de encargados del tratamiento.
          </li>
          <li>
            <strong>Administraciones públicas</strong> cuando exista obligación legal.
          </li>
        </ul>
        <p>
          No vendemos sus datos personales. Las transferencias internacionales, si las hubiera (por
          ejemplo, herramientas en EE. UU.), se realizarán con las garantías previstas en el RGPD
          (cláusulas contractuales tipo u otras medidas adecuadas).
        </p>
      </LegalSection>

      <LegalSection title="5. Conservación">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Consultas y leads de contacto: mientras dure la gestión y, como máximo, el plazo necesario
            para atender posibles reclamaciones.
          </li>
          <li>
            Datos de reserva y facturación: durante la relación contractual y los plazos legales
            aplicables (mercantiles/fiscales).
          </li>
          <li>Cookies: según los plazos indicados en la Política de Cookies.</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Derechos de las personas interesadas">
        <p>Puede ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad, así como retirar el consentimiento cuando este sea la base del tratamiento, escribiendo a{" "}
          <a href={`mailto:${LEGAL.email}`} className="text-sea hover:underline">
            {LEGAL.email}
          </a>{" "}
          e identificándose de forma adecuada.
        </p>
        <p>
          También puede presentar una reclamación ante la{" "}
          <a href={LEGAL.authorityUrl} target="_blank" rel="noreferrer" className="text-sea hover:underline">
            {LEGAL.authority}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="7. Menores">
        <p>
          Los servicios de este sitio no están dirigidos a menores de 14 años. Si detectamos datos de
          un menor sin legitimación adecuada, procederemos a su eliminación.
        </p>
      </LegalSection>

      <LegalSection title="8. Seguridad">
        <p>
          Aplicamos medidas técnicas y organizativas razonables para proteger los datos frente a
          accesos no autorizados, pérdida o alteración. Ningún sistema es 100 % seguro; le
          recomendamos proteger sus credenciales y dispositivos.
        </p>
      </LegalSection>

      <LegalSection title="9. Cookies">
        <p>
          El uso de cookies se detalla en la{" "}
          <Link href="/politica-de-cookies" className="text-sea hover:underline">
            Política de Cookies
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="10. Cambios">
        <p>
          Podemos actualizar esta política para adaptarla a cambios legales o del servicio. La
          versión vigente será la publicada en esta página.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
