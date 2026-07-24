import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = { title: "Política de cookies" };

export default function CookiesPage() {
  return (
    <LegalPageShell eyebrow="Cookies" title="Política de cookies">
      <p>
        Esta política informa sobre el uso de cookies y tecnologías similares en el sitio web de{" "}
        {LEGAL.brand}, de acuerdo con la LSSI-CE y las directrices de la AEPD.
      </p>
      <p className="text-sm">Última actualización: {LEGAL.lastUpdated}.</p>

      <LegalSection title="1. ¿Qué son las cookies?">
        <p>
          Las cookies son pequeños archivos que se almacenan en su dispositivo al visitar un sitio
          web. Permiten recordar preferencias, mantener sesiones o medir el uso del sitio.
        </p>
      </LegalSection>

      <LegalSection title="2. Tipos de cookies que utilizamos">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Cookies técnicas o necesarias:</strong> imprescindibles para el funcionamiento
            básico (navegación, seguridad, recuerdo de preferencias de cookies, proceso de reserva).
            No requieren consentimiento.
          </li>
          <li>
            <strong>Cookies de preferencias:</strong> recuerdan opciones como el idioma o la
            configuración del banner de cookies.
          </li>
          <li>
            <strong>Cookies analíticas:</strong> nos ayudan a entender cómo se usa el sitio (páginas
            vistas, origen del tráfico). Solo se activan si usted las acepta.
          </li>
          <li>
            <strong>Cookies de marketing:</strong> se usarían, en su caso, para medir campañas o
            mostrar contenidos personalizados. Solo con su consentimiento.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Cookies concretas">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--line)] text-ink">
                <th className="py-2 pr-3 font-semibold">Cookie / clave</th>
                <th className="py-2 pr-3 font-semibold">Finalidad</th>
                <th className="py-2 pr-3 font-semibold">Tipo</th>
                <th className="py-2 font-semibold">Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--line)]">
                <td className="py-2 pr-3">s4d-cookie-consent</td>
                <td className="py-2 pr-3">Guardar su elección de cookies</td>
                <td className="py-2 pr-3">Necesaria</td>
                <td className="py-2">12 meses</td>
              </tr>
              <tr className="border-b border-[var(--line)]">
                <td className="py-2 pr-3">Sesión de reserva / formularios</td>
                <td className="py-2 pr-3">Mantener el flujo de consulta y reserva</td>
                <td className="py-2 pr-3">Necesaria</td>
                <td className="py-2">Sesión</td>
              </tr>
              <tr className="border-b border-[var(--line)]">
                <td className="py-2 pr-3">Analítica (si se activa)</td>
                <td className="py-2 pr-3">Estadísticas de uso agregadas</td>
                <td className="py-2 pr-3">Analítica</td>
                <td className="py-2">Según proveedor</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Además, al usar mapas, pagos (OwnerRez) o compras en Tiqets, esos terceros pueden instalar
          sus propias cookies bajo sus políticas.
        </p>
      </LegalSection>

      <LegalSection title="4. Cómo gestionar el consentimiento">
        <p>
          Al entrar en el sitio verá un banner de cookies donde puede aceptar todas, rechazar las no
          esenciales o configurar preferencias. Puede cambiar su decisión en cualquier momento desde
          el enlace «Configurar cookies» del pie de página.
        </p>
        <p>
          También puede eliminar o bloquear cookies desde la configuración de su navegador. Si bloquea
          las necesarias, algunas funciones del sitio pueden no estar disponibles.
        </p>
      </LegalSection>

      <LegalSection title="5. Más información">
        <p>
          Para el tratamiento de datos personales asociados a cookies, consulte la{" "}
          <Link href="/politica-de-privacidad" className="text-sea hover:underline">
            Política de Privacidad
          </Link>
          . Contacto:{" "}
          <a href={`mailto:${LEGAL.email}`} className="text-sea hover:underline">
            {LEGAL.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
