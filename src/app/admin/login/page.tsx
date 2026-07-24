"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const password = new FormData(e.currentTarget).get("password");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Contraseña incorrecta");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto mt-16 max-w-md rounded-3xl border border-[var(--line)] bg-white p-8 shadow-sm">
      <h1 className="font-display text-3xl">Acceso admin</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Gestiona propiedades, contactos, pagos y tickets. Por defecto la contraseña es{" "}
        <code>stay4days-admin</code> (cámbiala con ADMIN_PASSWORD).
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input
          name="password"
          type="password"
          required
          placeholder="Contraseña"
          className="w-full rounded-xl border border-[var(--line)] px-3 py-2.5"
        />
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? "Entrando…" : "Entrar"}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
    </div>
  );
}
