"use client";

export function AdminLogoutButton() {
  return (
    <button
      type="button"
      className="rounded-full border border-[var(--line)] px-3 py-1.5 text-sm font-semibold"
      onClick={async () => {
        await fetch("/api/admin/auth", { method: "DELETE" });
        window.location.href = "/admin/login";
      }}
    >
      Salir
    </button>
  );
}
