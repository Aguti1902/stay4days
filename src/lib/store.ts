import { promises as fs } from "fs";
import path from "path";
import type {
  AppSettings,
  ContactLead,
  PaymentRecord,
  Property,
  SiteStats,
  Ticket,
} from "./types";
import { SEED_CONTACTS, SEED_PAYMENTS, SEED_TICKETS } from "./seed-data";

/** Bundled seed/data shipped with the deploy (read-only on Vercel). */
const SEED_DIR = path.join(process.cwd(), "src", "data");
/** Writable store: /tmp on Vercel, local data dir otherwise. */
const DATA_DIR = process.env.VERCEL
  ? path.join("/tmp", "stay4days-data")
  : SEED_DIR;

async function readSeedFile(file: string): Promise<string | null> {
  try {
    return await fs.readFile(path.join(SEED_DIR, file), "utf8");
  } catch {
    return null;
  }
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  const writablePath = path.join(DATA_DIR, file);
  try {
    const raw = await fs.readFile(writablePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    // fall through to seed
  }

  const seedRaw = await readSeedFile(file);
  if (seedRaw) {
    try {
      return JSON.parse(seedRaw) as T;
    } catch {
      // ignore parse errors
    }
  }

  return fallback;
}

async function writeJson<T>(file: string, data: T) {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(path.join(DATA_DIR, file), JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    // Vercel/serverless may reject writes; never crash the page for persistence.
    console.warn(`[store] write failed for ${file}:`, err instanceof Error ? err.message : err);
  }
}

const defaultStats = (): SiteStats => ({
  pageViews: 12480,
  propertyViews: 6320,
  searches: 2140,
  chatMessages: 890,
  contacts: 0,
  ticketClicks: 340,
  lastUpdated: new Date().toISOString(),
  daily: Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    return {
      date: d.toISOString().slice(0, 10),
      views: 600 + Math.round(Math.random() * 400),
      contacts: Math.round(Math.random() * 8),
      chats: 20 + Math.round(Math.random() * 40),
    };
  }),
});

export async function getProperties(): Promise<Property[]> {
  const props = await readJson<Property[]>("properties.json", []);
  const settings = await getSettings();
  return props.map((p) => ({
    ...p,
    photos: p.photos ?? (p.thumbnail ? [{ url: p.thumbnail }] : []),
    amenities: p.amenities ?? [],
    tags: p.tags ?? [],
    visible: settings.hiddenPropertyIds.includes(p.id) ? false : p.visible !== false,
  }));
}

export async function getVisibleProperties(): Promise<Property[]> {
  const props = await getProperties();
  return props.filter((p) => p.active !== false && p.visible !== false);
}

export async function getPropertyById(id: number): Promise<Property | undefined> {
  const props = await getProperties();
  return props.find((p) => p.id === id);
}

export async function saveProperties(properties: Property[]) {
  await writeJson("properties.json", properties);
}

export async function getTickets(): Promise<Ticket[]> {
  return readJson<Ticket[]>("tickets.json", SEED_TICKETS);
}

export async function saveTickets(tickets: Ticket[]) {
  await writeJson("tickets.json", tickets);
}

export async function getContacts(): Promise<ContactLead[]> {
  return readJson<ContactLead[]>("contacts.json", SEED_CONTACTS);
}

export async function saveContacts(contacts: ContactLead[]) {
  await writeJson("contacts.json", contacts);
}

export async function getPayments(): Promise<PaymentRecord[]> {
  return readJson<PaymentRecord[]>("payments.json", SEED_PAYMENTS);
}

export async function savePayments(payments: PaymentRecord[]) {
  await writeJson("payments.json", payments);
}

export async function getStats(): Promise<SiteStats> {
  return readJson<SiteStats>("stats.json", defaultStats());
}

export async function saveStats(stats: SiteStats) {
  await writeJson("stats.json", stats);
}

export async function bumpStat(
  key: keyof Pick<
    SiteStats,
    "pageViews" | "propertyViews" | "searches" | "chatMessages" | "contacts" | "ticketClicks"
  >,
  amount = 1,
) {
  const stats = await getStats();
  stats[key] = (stats[key] as number) + amount;
  stats.lastUpdated = new Date().toISOString();
  const today = new Date().toISOString().slice(0, 10);
  const day = stats.daily.find((d) => d.date === today);
  if (day) {
    if (key === "pageViews" || key === "propertyViews") day.views += amount;
    if (key === "contacts") day.contacts += amount;
    if (key === "chatMessages") day.chats += amount;
  }
  await saveStats(stats);
  return stats;
}

export async function getSettings(): Promise<AppSettings> {
  return readJson<AppSettings>("settings.json", { hiddenPropertyIds: [] });
}

export async function saveSettings(settings: AppSettings) {
  await writeJson("settings.json", settings);
}
