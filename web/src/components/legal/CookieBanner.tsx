"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { COOKIE_CONSENT_KEY, type CookiePreferences } from "@/lib/legal";

function readConsent(): CookiePreferences | null {
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookiePreferences;
  } catch {
    return null;
  }
}

function saveConsent(prefs: Omit<CookiePreferences, "necessary" | "updatedAt">) {
  const value: CookiePreferences = {
    necessary: true,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("s4d-cookie-consent", { detail: value }));
  return value;
}

export function openCookieSettings() {
  window.dispatchEvent(new Event("s4d-open-cookie-settings"));
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [configure, setConfigure] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) setVisible(true);

    function onOpen() {
      const current = readConsent();
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setConfigure(true);
      setVisible(true);
    }

    window.addEventListener("s4d-open-cookie-settings", onOpen);
    return () => window.removeEventListener("s4d-open-cookie-settings", onOpen);
  }, []);

  function acceptAll() {
    saveConsent({ analytics: true, marketing: true });
    setVisible(false);
    setConfigure(false);
  }

  function rejectOptional() {
    saveConsent({ analytics: false, marketing: false });
    setVisible(false);
    setConfigure(false);
  }

  function saveCustom() {
    saveConsent({ analytics, marketing });
    setVisible(false);
    setConfigure(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 md:p-6">
      <div className="mx-auto max-w-3xl rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[0_20px_50px_rgba(11,31,42,0.18)] md:p-6">
        <p className="font-display text-xl text-ink">Cookies</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Usamos cookies necesarias para el funcionamiento del sitio y, solo si lo aceptas, cookies
          de analítica y marketing. Puedes cambiar tu elección cuando quieras. Más información en la{" "}
          <Link href="/politica-de-cookies" className="font-semibold text-sea hover:underline">
            Política de cookies
          </Link>{" "}
          y la{" "}
          <Link href="/politica-de-privacidad" className="font-semibold text-sea hover:underline">
            Política de privacidad
          </Link>
          .
        </p>

        {configure && (
          <div className="mt-4 space-y-3 rounded-2xl bg-foam p-4 text-sm">
            <label className="flex items-start justify-between gap-4">
              <span>
                <span className="font-semibold text-ink">Necesarias</span>
                <span className="mt-0.5 block text-ink-soft">Siempre activas. Requeridas para el sitio.</span>
              </span>
              <input type="checkbox" checked disabled className="mt-1" />
            </label>
            <label className="flex items-start justify-between gap-4">
              <span>
                <span className="font-semibold text-ink">Analítica</span>
                <span className="mt-0.5 block text-ink-soft">Nos ayudan a mejorar el sitio con datos agregados.</span>
              </span>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="mt-1"
              />
            </label>
            <label className="flex items-start justify-between gap-4">
              <span>
                <span className="font-semibold text-ink">Marketing</span>
                <span className="mt-0.5 block text-ink-soft">Para medir campañas y contenidos relevantes.</span>
              </span>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="mt-1"
              />
            </label>
          </div>
        )}

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          {configure ? (
            <button type="button" onClick={saveCustom} className="btn btn-primary">
              Guardar preferencias
            </button>
          ) : (
            <button type="button" onClick={acceptAll} className="btn btn-primary">
              Aceptar todas
            </button>
          )}
          <button type="button" onClick={rejectOptional} className="btn btn-secondary">
            Rechazar opcionales
          </button>
          {!configure && (
            <button type="button" onClick={() => setConfigure(true)} className="btn btn-secondary">
              Configurar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
