import type { Metadata } from "next";
import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell";
import { LEGAL } from "@/lib/legal";
import Link from "next/link";

export const metadata: Metadata = { title: "Aviso legal" };

export default function AvisoLegalPage() {
  return (
    <LegalPageShell eyebrow="Información legal" title="Aviso legal">
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad
        de la Información y de Comercio Electrónico (LSSI-CE), se informa a los usuarios de los datos
        identificativos del titular del sitio web {LEGAL.site}.
      </p>
      <p className="text-sm">Última actualización: {LEGAL.lastUpdated}.</p>

      <LegalSection title="1. Identificación del titular">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Titular / marca comercial:</strong> {LEGAL.titular}
          </li>
          <li>
            <strong>Domicilio:</strong> {LEGAL.domicilio}
          </li>
          <li>
            <strong>Correo electrónico:</strong>{" "}
            <a href={`mailto:${LEGAL.email}`} className="text-sea hover:underline">
              {LEGAL.email}
            </a>
          </li>
          <li>
            <strong>Teléfono / WhatsApp:</strong>{" "}
            <a href={LEGAL.phoneHref} className="text-sea hover:underline">
              {LEGAL.phone}
            </a>
          </li>
          <li>
            <strong>Sitio web:</strong> {LEGAL.site}
          </li>
        </ul>
        <p>
          Para ejercer derechos o realizar reclamaciones relacionadas con este sitio web, puede
          contactar a través de los medios indicados.
        </p>
      </LegalSection>

      <LegalSection title="2. Objeto">
        <p>
          El presente aviso legal regula el acceso, navegación y uso del sitio web de {LEGAL.brand},
          así como las responsabilidades derivadas de la utilización de sus contenidos, incluyendo
          información sobre alojamientos, alquiler temporal, reserva online y experiencias turísticas.
        </p>
        <p>
          El acceso al sitio web atribuye la condición de usuario e implica la aceptación íntegra de
          este Aviso Legal, la{" "}
          <Link href="/politica-de-privacidad" className="text-sea hover:underline">
            Política de Privacidad
          </Link>
          , la{" "}
          <Link href="/politica-de-cookies" className="text-sea hover:underline">
            Política de Cookies
          </Link>{" "}
          y las{" "}
          <Link href="/condiciones-de-reserva" className="text-sea hover:underline">
            Condiciones de reserva
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="3. Condiciones de uso">
        <p>El usuario se compromete a:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Utilizar el sitio de forma lícita, diligente y conforme a la buena fe.</li>
          <li>No introducir virus, malware ni realizar acciones que dañen o sobrecarguen el servicio.</li>
          <li>
            No utilizar los contenidos con fines comerciales no autorizados ni vulnerar derechos de
            terceros.
          </li>
          <li>Facilitar información veraz en formularios, reservas y comunicaciones.</li>
        </ul>
        <p>
          El acceso al sitio no implica por sí solo el inicio de una relación comercial, salvo cuando
          el usuario formalice una reserva o solicite un servicio concreto.
        </p>
      </LegalSection>

      <LegalSection title="4. Servicios ofrecidos">
        <p>{LEGAL.brand} ofrece, entre otros:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Información y reserva de alojamientos turísticos por días o semanas.</li>
          <li>Alquiler temporal amueblado de 1 a 11 meses, con posibilidad de pago online.</li>
          <li>
            Enlace a la compra de entradas y experiencias a través de terceros (por ejemplo, Tiqets).
          </li>
          <li>Atención al cliente por teléfono, WhatsApp, formulario y asistente virtual.</li>
        </ul>
        <p>
          La gestión de disponibilidad, cotizaciones y pagos de alojamiento puede realizarse mediante
          la plataforma OwnerRez u otros proveedores de pago autorizados. Las entradas y experiencias
          se completan en la plataforma del proveedor externo correspondiente.
        </p>
      </LegalSection>

      <LegalSection title="5. Propiedad intelectual e industrial">
        <p>
          Todos los contenidos del sitio (textos, imágenes, logotipos, diseño, código y bases de datos)
          están protegidos por la normativa de propiedad intelectual e industrial. Queda prohibida su
          reproducción, distribución o comunicación pública sin autorización previa y por escrito de{" "}
          {LEGAL.brand}, salvo usos permitidos por ley.
        </p>
        <p>
          Las fotografías de las viviendas pertenecen a {LEGAL.brand} o se utilizan con autorización
          de sus titulares / proveedores (incluido OwnerRez).
        </p>
      </LegalSection>

      <LegalSection title="6. Exención de responsabilidad">
        <p>
          {LEGAL.brand} procura que la información del sitio sea exacta y actualizada, pero no
          garantiza la ausencia total de errores, interrupciones o inexactitudes tipográficas. Las
          tarifas, disponibilidad y condiciones concretas se confirman en el proceso de reserva.
        </p>
        <p>
          No se responsabiliza de daños derivados del uso indebido del sitio, fallos de red ajenos,
          virus introducidos por terceros o contenidos de sitios enlazados (Tiqets, redes sociales,
          mapas, etc.).
        </p>
      </LegalSection>

      <LegalSection title="7. Enlaces">
        <p>
          El sitio puede incluir enlaces a terceros con finalidad informativa o para completar un
          servicio (pago, tickets, mapas). Dichos sitios tienen sus propias políticas; {LEGAL.brand}{" "}
          no controla ni asume responsabilidad por sus contenidos o prácticas.
        </p>
      </LegalSection>

      <LegalSection title="8. Protección de datos">
        <p>
          El tratamiento de datos personales se rige por la{" "}
          <Link href="/politica-de-privacidad" className="text-sea hover:underline">
            Política de Privacidad
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="9. Legislación y jurisdicción">
        <p>
          Este aviso se rige por la legislación española. Para cualquier controversia, las partes se
          someten a los juzgados y tribunales del domicilio del usuario consumidor cuando proceda
          conforme a la normativa de consumo, o a los de Barcelona en los demás casos.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
