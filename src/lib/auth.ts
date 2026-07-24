import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "crypto";

const COOKIE = "s4d_admin";

function hash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "stay4days-admin";
}

export function createSessionToken() {
  return hash(`${getAdminPassword()}:stay4days-session-v1`);
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return false;
  const expected = createSessionToken();
  try {
    return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}

export { COOKIE as ADMIN_COOKIE };
