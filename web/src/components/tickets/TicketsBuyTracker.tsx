"use client";

import { useEffect } from "react";

/** Registra clics a Tiqets desde las tarjetas vía event delegation */
export function TicketsBuyTracker() {
  useEffect(() => {
    async function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const link = target?.closest("a[href*='tiqets.com']") as HTMLAnchorElement | null;
      if (!link) return;
      try {
        await fetch("/api/admin/stats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "ticketClicks" }),
        });
      } catch {
        // ignore
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
