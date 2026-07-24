import { isAdminAuthenticated } from "@/lib/auth";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAdminAuthenticated();

  if (!authed) {
    return <div className="min-h-screen bg-[#eef3f5] text-ink">{children}</div>;
  }

  return <AdminShell>{children}</AdminShell>;
}
