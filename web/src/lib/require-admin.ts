import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "./auth";

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
}
