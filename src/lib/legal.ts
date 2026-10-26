export const LEGAL = {
  brand: "Stay4Days",
  titular: "Stay4Days",
  /** Destinatario interno del formulario de contacto (no se muestra en la web). */
  contactInbox: "nati2525@hotmail.com",
  phone: "+34 636 042 534",
  phoneHref: "tel:+34636042534",
  whatsappNumber: "34638939458",
  whatsapp:
    "https://wa.me/34638939458?text=" +
    encodeURIComponent("Hola, me interesa una vivienda de Stay4Days."),
  site: "https://stay4days.com",
  contactPath: "/contactar",
  domicilio: "Barcelona y área metropolitana, España",
  authority: "Agencia Española de Protección de Datos (AEPD)",
  authorityUrl: "https://www.aepd.es",
  lastUpdated: "24 de julio de 2026",
} as const;

export const COOKIE_CONSENT_KEY = "s4d-cookie-consent";

export type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};
