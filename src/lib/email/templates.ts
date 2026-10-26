import { LEGAL } from "@/lib/legal";

const brand = {
  ink: "#0b1f2a",
  sea: "#0f7c86",
  seaDeep: "#0a5c64",
  sand: "#c9b59a",
  soft: "#1c3644",
  line: "#d7e0e4",
  bg: "#f4f7f8",
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function layout(title: string, body: string) {
  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background:${brand.bg};font-family:Georgia,'Times New Roman',serif;color:${brand.ink};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.bg};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid ${brand.line};border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background:${brand.ink};padding:24px 28px;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:${brand.sand};">Family rental homes</p>
                <p style="margin:8px 0 0;font-size:28px;line-height:1.1;color:#ffffff;">${escapeHtml(LEGAL.brand)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                ${body}
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 28px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:${brand.soft};">
                <p style="margin:0;">Teléfono: ${escapeHtml(LEGAL.phone)}</p>
                <p style="margin:4px 0 0;"><a href="${escapeHtml(LEGAL.whatsapp)}" style="color:${brand.sea};text-decoration:none;">WhatsApp</a></p>
                <p style="margin:4px 0 0;"><a href="${escapeHtml(LEGAL.site)}" style="color:${brand.sea};text-decoration:none;">${escapeHtml(LEGAL.site)}</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function button(href: string, label: string) {
  return `<p style="margin:24px 0 0;">
    <a href="${escapeHtml(href)}" style="display:inline-block;background:${brand.seaDeep};color:#ffffff;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;padding:12px 18px;border-radius:999px;">
      ${escapeHtml(label)}
    </a>
  </p>`;
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:8px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${brand.soft};width:140px;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:8px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${brand.ink};">${value}</td>
  </tr>`;
}

export function contactGuestEmail(input: {
  name: string;
  message: string;
  propertyName?: string;
}) {
  const subject = `Hemos recibido tu consulta · ${LEGAL.brand}`;
  const html = layout(
    subject,
    `
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:${brand.sea};">Consulta recibida</p>
      <h1 style="margin:10px 0 0;font-size:28px;line-height:1.2;">Hola ${escapeHtml(input.name)}</h1>
      <p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:${brand.soft};">
        Gracias por escribirnos. Nuestro equipo revisará tu mensaje y te responderá lo antes posible.
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;border-top:1px solid ${brand.line};">
        ${input.propertyName ? row("Propiedad", escapeHtml(input.propertyName)) : ""}
        ${row("Tu mensaje", `<span style="white-space:pre-wrap;">${escapeHtml(input.message)}</span>`)}
      </table>
    `,
  );
  return { subject, html };
}

export function contactAdminEmail(input: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  propertyName?: string;
  source: string;
  adminUrl: string;
}) {
  const subject = `Nuevo contacto: ${input.name}${input.propertyName ? ` · ${input.propertyName}` : ""}`;
  const html = layout(
    subject,
    `
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:${brand.sea};">Panel admin</p>
      <h1 style="margin:10px 0 0;font-size:28px;line-height:1.2;">Nueva consulta web</h1>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;border-top:1px solid ${brand.line};">
        ${row("Nombre", escapeHtml(input.name))}
        ${row("Email", `<a href="mailto:${escapeHtml(input.email)}" style="color:${brand.sea};">${escapeHtml(input.email)}</a>`)}
        ${input.phone ? row("Teléfono", escapeHtml(input.phone)) : ""}
        ${row("Origen", escapeHtml(input.source))}
        ${input.propertyName ? row("Propiedad", escapeHtml(input.propertyName)) : ""}
        ${row("Mensaje", `<span style="white-space:pre-wrap;">${escapeHtml(input.message)}</span>`)}
      </table>
      ${button(input.adminUrl, "Ver contactos")}
    `,
  );
  return { subject, html };
}

export function bookingGuestEmail(input: {
  guestName: string;
  propertyName: string;
  checkIn: string;
  checkOut: string;
  amount: number;
  currency: string;
  paymentUrl: string;
  siteUrl: string;
}) {
  const money = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: input.currency || "EUR",
  }).format(input.amount);
  const subject = `Completa tu reserva · ${input.propertyName}`;
  const html = layout(
    subject,
    `
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:${brand.sea};">Reserva pendiente de pago</p>
      <h1 style="margin:10px 0 0;font-size:28px;line-height:1.2;">Hola ${escapeHtml(input.guestName)}</h1>
      <p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:${brand.soft};">
        Hemos preparado tu reserva en ${escapeHtml(input.propertyName)}. Para confirmarla, completa el pago seguro en el siguiente enlace.
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;border-top:1px solid ${brand.line};">
        ${row("Propiedad", escapeHtml(input.propertyName))}
        ${row("Entrada", escapeHtml(input.checkIn))}
        ${row("Salida", escapeHtml(input.checkOut))}
        ${row("Total", `<strong>${escapeHtml(money)}</strong>`)}
      </table>
      ${button(input.paymentUrl, "Pagar y confirmar reserva")}
      <p style="margin:18px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:${brand.soft};">
        Si el botón no funciona, copia este enlace:<br />
        <a href="${escapeHtml(input.paymentUrl)}" style="color:${brand.sea};word-break:break-all;">${escapeHtml(input.paymentUrl)}</a>
      </p>
      <p style="margin:18px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:${brand.soft};">
        También puedes volver a la ficha: <a href="${escapeHtml(input.siteUrl)}" style="color:${brand.sea};">${escapeHtml(input.siteUrl)}</a>
      </p>
    `,
  );
  return { subject, html };
}

export function bookingAdminEmail(input: {
  guestName: string;
  email: string;
  phone?: string;
  propertyName: string;
  checkIn: string;
  checkOut: string;
  amount: number;
  currency: string;
  paymentUrl: string;
  adminUrl: string;
}) {
  const money = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: input.currency || "EUR",
  }).format(input.amount);
  const subject = `Nueva reserva pendiente · ${input.propertyName}`;
  const html = layout(
    subject,
    `
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:${brand.sea};">Panel admin</p>
      <h1 style="margin:10px 0 0;font-size:28px;line-height:1.2;">Reserva iniciada en la web</h1>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;border-top:1px solid ${brand.line};">
        ${row("Huésped", escapeHtml(input.guestName))}
        ${row("Email", `<a href="mailto:${escapeHtml(input.email)}" style="color:${brand.sea};">${escapeHtml(input.email)}</a>`)}
        ${input.phone ? row("Teléfono", escapeHtml(input.phone)) : ""}
        ${row("Propiedad", escapeHtml(input.propertyName))}
        ${row("Entrada", escapeHtml(input.checkIn))}
        ${row("Salida", escapeHtml(input.checkOut))}
        ${row("Total", `<strong>${escapeHtml(money)}</strong>`)}
        ${row("Pago", `<a href="${escapeHtml(input.paymentUrl)}" style="color:${brand.sea};">Enlace OwnerRez</a>`)}
      </table>
      ${button(input.adminUrl, "Ver pagos")}
    `,
  );
  return { subject, html };
}

export function paymentConfirmationGuestEmail(input: {
  guestName: string;
  propertyName: string;
  amount: number;
  currency: string;
  checkIn?: string;
  checkOut?: string;
  notes?: string;
}) {
  const money = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: input.currency || "EUR",
  }).format(input.amount);
  const subject = `Pago confirmado · ${input.propertyName}`;
  const html = layout(
    subject,
    `
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:${brand.sea};">Confirmación de pago</p>
      <h1 style="margin:10px 0 0;font-size:28px;line-height:1.2;">Gracias, ${escapeHtml(input.guestName)}</h1>
      <p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:${brand.soft};">
        Hemos registrado tu pago. Si necesitas cualquier ayuda con el check-in o la estancia, escríbenos.
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;border-top:1px solid ${brand.line};">
        ${row("Propiedad", escapeHtml(input.propertyName))}
        ${input.checkIn ? row("Entrada", escapeHtml(input.checkIn)) : ""}
        ${input.checkOut ? row("Salida", escapeHtml(input.checkOut)) : ""}
        ${row("Importe", `<strong>${escapeHtml(money)}</strong>`)}
        ${input.notes ? row("Notas", escapeHtml(input.notes)) : ""}
      </table>
    `,
  );
  return { subject, html };
}

export function paymentStatusGuestEmail(input: {
  guestName: string;
  propertyName: string;
  amount: number;
  currency: string;
  status: "paid" | "pending" | "refunded";
  checkIn?: string;
  checkOut?: string;
}) {
  if (input.status === "paid") {
    return paymentConfirmationGuestEmail(input);
  }

  const money = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: input.currency || "EUR",
  }).format(input.amount);

  const copy =
    input.status === "refunded"
      ? {
          eyebrow: "Reembolso",
          title: `Hola ${input.guestName}`,
          body: "Hemos procesado el reembolso asociado a tu reserva. Si tienes dudas, contacta con nosotros.",
          subject: `Reembolso registrado · ${input.propertyName}`,
        }
      : {
          eyebrow: "Pago pendiente",
          title: `Hola ${input.guestName}`,
          body: "Tu reserva sigue pendiente de pago. Si ya has pagado, ignora este mensaje; si no, responde a este correo y te ayudamos.",
          subject: `Pago pendiente · ${input.propertyName}`,
        };

  const html = layout(
    copy.subject,
    `
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:${brand.sea};">${escapeHtml(copy.eyebrow)}</p>
      <h1 style="margin:10px 0 0;font-size:28px;line-height:1.2;">${escapeHtml(copy.title)}</h1>
      <p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:${brand.soft};">${escapeHtml(copy.body)}</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;border-top:1px solid ${brand.line};">
        ${row("Propiedad", escapeHtml(input.propertyName))}
        ${input.checkIn ? row("Entrada", escapeHtml(input.checkIn)) : ""}
        ${input.checkOut ? row("Salida", escapeHtml(input.checkOut)) : ""}
        ${row("Importe", `<strong>${escapeHtml(money)}</strong>`)}
      </table>
    `,
  );
  return { subject: copy.subject, html };
}
