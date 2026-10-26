import { getAdminInbox, getContactInbox, getSiteOrigin, sendEmails } from "@/lib/email/send";
import {
  bookingAdminEmail,
  bookingGuestEmail,
  contactAdminEmail,
  contactGuestEmail,
  paymentStatusGuestEmail,
} from "@/lib/email/templates";
import type { ContactLead, PaymentRecord } from "@/lib/types";

export async function notifyContactEmails(lead: ContactLead, reqUrl?: string) {
  const origin = getSiteOrigin(reqUrl);
  const contactInbox = getContactInbox();
  const guest = contactGuestEmail({
    name: lead.name,
    message: lead.message,
    propertyName: lead.propertyName,
  });
  const admin = contactAdminEmail({
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    message: lead.message,
    propertyName: lead.propertyName,
    source: lead.source,
    adminUrl: `${origin}/admin/contactos`,
  });

  return sendEmails([
    {
      to: lead.email,
      subject: guest.subject,
      html: guest.html,
      replyTo: contactInbox,
    },
    {
      to: contactInbox,
      subject: admin.subject,
      html: admin.html,
      replyTo: lead.email,
    },
  ]);
}

export async function notifyBookingEmails(input: {
  guestName: string;
  email: string;
  phone?: string;
  propertyId: number;
  propertyName: string;
  checkIn: string;
  checkOut: string;
  amount: number;
  currency: string;
  paymentUrl: string;
  reqUrl?: string;
}) {
  const origin = getSiteOrigin(input.reqUrl);
  const guest = bookingGuestEmail({
    guestName: input.guestName,
    propertyName: input.propertyName,
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    amount: input.amount,
    currency: input.currency,
    paymentUrl: input.paymentUrl,
    siteUrl: `${origin}/propiedades/${input.propertyId}`,
  });
  const admin = bookingAdminEmail({
    guestName: input.guestName,
    email: input.email,
    phone: input.phone,
    propertyName: input.propertyName,
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    amount: input.amount,
    currency: input.currency,
    paymentUrl: input.paymentUrl,
    adminUrl: `${origin}/admin/pagos`,
  });

  return sendEmails([
    {
      to: input.email,
      subject: guest.subject,
      html: guest.html,
      replyTo: getAdminInbox(),
    },
    {
      to: getAdminInbox(),
      subject: admin.subject,
      html: admin.html,
      replyTo: input.email,
    },
  ]);
}

export async function notifyPaymentStatusEmail(payment: PaymentRecord) {
  const mail = paymentStatusGuestEmail({
    guestName: payment.guestName,
    propertyName: payment.propertyName,
    amount: payment.amount,
    currency: payment.currency,
    status: payment.status,
    checkIn: payment.checkIn,
    checkOut: payment.checkOut,
  });

  return sendEmails([
    {
      to: payment.email,
      subject: mail.subject,
      html: mail.html,
      replyTo: getAdminInbox(),
    },
  ]);
}
