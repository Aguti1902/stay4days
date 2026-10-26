import { Resend } from "resend";
import { LEGAL } from "@/lib/legal";

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

export type SendEmailResult =
  | { ok: true; id?: string; skipped?: false }
  | { ok: true; skipped: true; reason: string }
  | { ok: false; error: string };

function getResend() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

export function getEmailFrom() {
  return (
    process.env.EMAIL_FROM?.trim() ||
    `${LEGAL.brand} <onboarding@resend.dev>`
  );
}

/** Bandeja para reservas/pagos (opcional vía EMAIL_TO). */
export function getAdminInbox() {
  return process.env.EMAIL_TO?.trim() || LEGAL.contactInbox;
}

/** Solo formularios de contacto → nati2525@hotmail.com (o CONTACT_EMAIL). */
export function getContactInbox() {
  return process.env.CONTACT_EMAIL?.trim() || LEGAL.contactInbox;
}

export function getSiteOrigin(reqUrl?: string) {
  if (process.env.NEXT_PUBLIC_SITE_URL?.trim()) {
    return process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, "")}`;
  }
  if (reqUrl) {
    try {
      return new URL(reqUrl).origin;
    } catch {
      /* ignore */
    }
  }
  return LEGAL.site;
}

export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const resend = getResend();
  if (!resend) {
    console.warn("[email] RESEND_API_KEY no configurada; se omite el envío.");
    return { ok: true, skipped: true, reason: "RESEND_API_KEY missing" };
  }

  const to = Array.isArray(input.to) ? input.to : [input.to];
  const filtered = to.map((v) => v.trim()).filter(Boolean);
  if (!filtered.length) {
    return { ok: false, error: "Destinatario vacío" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: getEmailFrom(),
      to: filtered,
      subject: input.subject,
      html: input.html,
      replyTo: input.replyTo || getAdminInbox(),
    });

    if (error) {
      console.error("[email] Resend error:", error);
      return { ok: false, error: error.message };
    }

    return { ok: true, id: data?.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error enviando email";
    console.error("[email] Unexpected error:", message);
    return { ok: false, error: message };
  }
}

export async function sendEmails(jobs: SendEmailInput[]) {
  const results = await Promise.all(jobs.map((job) => sendEmail(job)));
  return results;
}
