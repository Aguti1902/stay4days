import { requireAdmin } from "@/lib/require-admin";
import { getContacts, getPayments, getProperties, getStats, getTickets, getSettings } from "@/lib/store";
import { isOwnerRezConfigured } from "@/lib/ownerrez";
import { DashboardOverview } from "@/components/admin/DashboardOverview";

export default async function AdminDashboard() {
  await requireAdmin();
  const [stats, properties, contacts, payments, tickets, settings] = await Promise.all([
    getStats(),
    getProperties(),
    getContacts(),
    getPayments(),
    getTickets(),
    getSettings(),
  ]);

  return (
    <DashboardOverview
      stats={stats}
      properties={properties}
      contacts={contacts}
      payments={payments}
      tickets={tickets}
      ownerrezConfigured={isOwnerRezConfigured()}
      lastSync={settings.lastOwnerrezSync}
    />
  );
}
