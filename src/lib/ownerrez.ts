import type { Property, PropertyPhoto } from "./types";
import { normalizePropertyType } from "./property-types";

const BASE = "https://api.ownerrez.com";

export class OwnerRezError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function getCredentials() {
  const email = process.env.OWNERREZ_EMAIL;
  const token = process.env.OWNERREZ_TOKEN;
  if (!email || !token) {
    throw new OwnerRezError(
      "Faltan OWNERREZ_EMAIL y OWNERREZ_TOKEN en las variables de entorno.",
      401,
    );
  }
  return { email, token };
}

function authHeader(email: string, token: string) {
  const basic = Buffer.from(`${email}:${token}`).toString("base64");
  return {
    Authorization: `Basic ${basic}`,
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent": "Stay4Days-Web/1.0",
  };
}

async function ownerrezFetch<T>(
  pathname: string,
  query: Record<string, string | number | boolean | Array<string | number> | undefined> = {},
) {
  const { email, token } = getCredentials();
  const url = new URL(`${BASE}${pathname}`);
  Object.entries(query).forEach(([k, v]) => {
    if (v === undefined || v === "") return;
    if (Array.isArray(v)) {
      v.forEach((item) => url.searchParams.append(k, String(item)));
      return;
    }
    url.searchParams.set(k, String(v));
  });

  const res = await fetch(url.toString(), {
    headers: authHeader(email, token),
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text();
    throw new OwnerRezError(`OwnerRez ${res.status}: ${body.slice(0, 300)}`, res.status);
  }

  return (await res.json()) as T;
}

async function ownerrezSend<T>(
  method: "POST" | "PATCH" | "DELETE",
  pathname: string,
  body?: Record<string, unknown>,
): Promise<T> {
  const { email, token } = getCredentials();
  const res = await fetch(`${BASE}${pathname}`, {
    method,
    headers: authHeader(email, token),
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    let message = text.slice(0, 400);
    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed.messages)) message = parsed.messages.join(" · ");
      else if (parsed.Error?.Message) message = parsed.Error.Message;
    } catch {
      // keep raw
    }
    throw new OwnerRezError(message, res.status);
  }

  if (res.status === 204) return {} as T;
  return (await res.json()) as T;
}

export interface QuoteCharge {
  amount: number;
  description?: string;
  type?: string;
}

export interface QuoteResult {
  id: number;
  key: string;
  propertyId: number;
  arrival: string;
  departure: string;
  adults: number;
  children: number;
  pets: number;
  charges: QuoteCharge[];
  total: number;
  paymentUrl: string;
  expiresUtc?: string;
}

function sumCharges(charges?: QuoteCharge[]) {
  return (charges || []).reduce((s, c) => s + (Number(c.amount) || 0), 0);
}

function paymentUrlFromQuote(quote: { key?: string; payment_form?: string; paymentForm?: string }) {
  if (quote.payment_form) return quote.payment_form;
  if (quote.paymentForm) return quote.paymentForm;
  if (quote.key) return `https://booking.ownerrez.com/${quote.key}/confirm`;
  throw new OwnerRezError("La cotización no devolvió enlace de pago.", 502);
}

export async function createGuest(input: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}) {
  const payload: Record<string, unknown> = {
    first_name: input.firstName,
    last_name: input.lastName,
    email_addresses: [{ address: input.email, is_default: true }],
  };
  if (input.phone) {
    payload.phones = [{ number: input.phone, is_default: true, type: "mobile" }];
  }
  return ownerrezSend<{ id: number }>("POST", "/v2/guests", payload);
}

export async function previewQuote(input: {
  propertyId: number;
  arrival: string;
  departure: string;
  adults: number;
  children?: number;
  pets?: number;
}): Promise<Omit<QuoteResult, "id" | "key" | "paymentUrl"> & { id?: number; key?: string }> {
  const quote = await ownerrezSend<{
    id?: number;
    key?: string;
    property_id: number;
    arrival: string;
    departure: string;
    adults: number;
    children: number;
    pets: number;
    charges?: QuoteCharge[];
    expires_utc?: string;
  }>("POST", "/v2/quotes", {
    property_id: input.propertyId,
    arrival: input.arrival,
    departure: input.departure,
    adults: input.adults,
    children: input.children ?? 0,
    pets: input.pets ?? 0,
    generate_charges: true,
    validate_rules: true,
    test: true,
    hold_dates: false,
  });

  return {
    id: quote.id,
    key: quote.key,
    propertyId: quote.property_id || input.propertyId,
    arrival: quote.arrival || input.arrival,
    departure: quote.departure || input.departure,
    adults: quote.adults ?? input.adults,
    children: quote.children ?? input.children ?? 0,
    pets: quote.pets ?? input.pets ?? 0,
    charges: quote.charges || [],
    total: sumCharges(quote.charges),
    expiresUtc: quote.expires_utc,
  };
}

export async function createBookableQuote(input: {
  propertyId: number;
  arrival: string;
  departure: string;
  adults: number;
  children?: number;
  pets?: number;
  guestId: number;
  notes?: string;
  redirectAfterBookingUrl?: string;
}): Promise<QuoteResult> {
  // Prefer v1 for PaymentForm field, fallback to v2 + booking.ownerrez.com confirm URL
  const { email, token } = getCredentials();
  const basic = Buffer.from(`${email}:${token}`).toString("base64");

  const v1Res = await fetch("https://api.ownerrez.com/v1/quotes", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "Stay4Days-Web/1.0",
    },
    body: JSON.stringify({
      guestId: input.guestId,
      propertyId: input.propertyId,
      arrival: input.arrival,
      departure: input.departure,
      adults: input.adults,
      children: input.children ?? 0,
      pets: input.pets ?? 0,
      redirectAfterBookingUrl: input.redirectAfterBookingUrl,
    }),
    cache: "no-store",
  });

  if (v1Res.ok) {
    const quote = (await v1Res.json()) as {
      id?: number;
      key?: string;
      paymentForm?: string;
      PaymentForm?: string;
      charges?: QuoteCharge[];
      arrival?: string;
      departure?: string;
      adults?: number;
      children?: number;
      pets?: number;
      expiresUtc?: string;
    };

    // v1 may not include charges; fetch from v2 if we have id/key later
    let charges = quote.charges || [];
    if (!charges.length && quote.key) {
      try {
        const preview = await previewQuote(input);
        charges = preview.charges;
      } catch {
        // ignore
      }
    }

    return {
      id: quote.id || 0,
      key: quote.key || "",
      propertyId: input.propertyId,
      arrival: quote.arrival || input.arrival,
      departure: quote.departure || input.departure,
      adults: quote.adults ?? input.adults,
      children: quote.children ?? input.children ?? 0,
      pets: quote.pets ?? input.pets ?? 0,
      charges,
      total: sumCharges(charges),
      paymentUrl: paymentUrlFromQuote({
        key: quote.key,
        payment_form: quote.paymentForm || quote.PaymentForm,
      }),
      expiresUtc: quote.expiresUtc,
    };
  }

  const quote = await ownerrezSend<{
    id: number;
    key: string;
    property_id: number;
    arrival: string;
    departure: string;
    adults: number;
    children: number;
    pets: number;
    charges?: QuoteCharge[];
    expires_utc?: string;
    payment_form?: string;
  }>("POST", "/v2/quotes", {
    guest_id: input.guestId,
    property_id: input.propertyId,
    arrival: input.arrival,
    departure: input.departure,
    adults: input.adults,
    children: input.children ?? 0,
    pets: input.pets ?? 0,
    generate_charges: true,
    validate_rules: true,
    hold_dates: false,
    notes: input.notes,
  });

  return {
    id: quote.id,
    key: quote.key,
    propertyId: quote.property_id,
    arrival: quote.arrival,
    departure: quote.departure,
    adults: quote.adults,
    children: quote.children,
    pets: quote.pets,
    charges: quote.charges || [],
    total: sumCharges(quote.charges),
    paymentUrl: paymentUrlFromQuote(quote),
    expiresUtc: quote.expires_utc,
  };
}

export async function searchAvailablePropertyIds(input: {
  from: string;
  to: string;
  guests?: number;
}): Promise<number[]> {
  const page = await ownerrezFetch<{ items?: { id?: number; property_id?: number }[] }>(
    "/v2/propertysearch",
    {
      available_from: input.from,
      available_to: input.to,
      guests_min: input.guests,
      limit: 100,
    },
  );
  return (page.items || [])
    .map((i) => i.id || i.property_id)
    .filter((id): id is number => typeof id === "number");
}

interface Pageable<T> {
  items: T[];
  count?: number;
  limit?: number;
  offset?: number;
  next_page_url?: string | null;
}

interface OwnerRezProperty {
  id: number;
  active?: boolean;
  name?: string;
  external_name?: string;
  property_type?: string;
  bedrooms?: number;
  bathrooms?: number;
  bathrooms_full?: number;
  max_guests?: number;
  living_area?: number;
  latitude?: number;
  longitude?: number;
  check_in?: string;
  check_out?: string;
  currency_code?: string;
  max_pets?: number;
  public_url?: string;
  thumbnail_url?: string;
  thumbnail_url_large?: string;
  thumbnail_url_medium?: string;
  tags?: string[];
  is_snoozed?: boolean;
  address?: {
    city?: string;
    province?: string;
    country?: string;
    street1?: string;
    street2?: string;
    postal_code?: string;
    is_default?: boolean;
  };
}

interface OwnerRezListing {
  property_id: number;
  descriptions?:
    | {
        description?: string;
        headline?: string;
        short_description?: string;
        unique_benefits?: string;
      }
    | { type?: string; text?: string; language?: string }[];
  photos?: {
    url?: string;
    caption?: string;
    display_order?: number;
    cropped_url?: string;
    large_url?: string;
    original_url?: string;
  }[];
  amenity_categories?: { name?: string; amenities?: { name?: string }[] | string[] }[];
  amenity_call_outs?: Array<string | { icon?: string; text?: string; title?: string; name?: string }>;
  bedroom_count?: number;
  bathroom_count?: number;
  occupancy_max?: number;
  nightly_rate_min?: number;
  nightly_rate_max?: number;
  review_average?: number;
  review_count?: number;
  sleeps_max?: number;
}

export async function fetchAllProperties(): Promise<OwnerRezProperty[]> {
  const all: OwnerRezProperty[] = [];
  let offset = 0;
  const limit = 100;
  while (true) {
    const page = await ownerrezFetch<Pageable<OwnerRezProperty>>("/v2/properties", {
      active: true,
      include_tags: true,
      include_fields: true,
      limit,
      offset,
    });
    all.push(...(page.items || []));
    if (!page.items?.length || page.items.length < limit || !page.next_page_url) break;
    offset += limit;
  }
  return all;
}

export async function fetchAllListings(): Promise<OwnerRezListing[]> {
  const all: OwnerRezListing[] = [];
  let offset = 0;
  const limit = 100;
  while (true) {
    const page = await ownerrezFetch<Pageable<OwnerRezListing>>("/v2/listings", {
      limit,
      offset,
      includeImages: true,
      includeDescriptions: "html",
      includeAmenities: true,
      includeRooms: true,
      includeBathrooms: true,
    });
    all.push(...(page.items || []));
    if (!page.items?.length || page.items.length < limit || !page.next_page_url) break;
    offset += limit;
  }
  return all;
}

export async function fetchProperty(id: number) {
  return ownerrezFetch<OwnerRezProperty>(`/v2/properties/${id}`);
}

export async function fetchListing(id: number) {
  return ownerrezFetch<OwnerRezListing>(`/v2/listings/${id}`);
}

export async function fetchBookings(limit = 50) {
  return ownerrezFetch<Pageable<Record<string, unknown>>>("/v2/bookings", { limit });
}

export async function fetchPayments(limit = 50) {
  return ownerrezFetch<Pageable<Record<string, unknown>>>("/v2/payments", { limit });
}

export async function fetchInquiries(limit = 50) {
  return ownerrezFetch<Pageable<Record<string, unknown>>>("/v2/inquiries", { limit });
}

function stripHtml(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function pickDescription(listing?: OwnerRezListing) {
  const descriptions = listing?.descriptions;
  if (!descriptions) return "";

  if (Array.isArray(descriptions)) {
    const preferred =
      descriptions.find((d) => d.type?.toLowerCase().includes("summary")) ||
      descriptions.find((d) => d.language?.toLowerCase().startsWith("es")) ||
      descriptions[0];
    return preferred?.text ? stripHtml(preferred.text) : "";
  }

  const text =
    descriptions.description ||
    descriptions.short_description ||
    descriptions.unique_benefits ||
    descriptions.headline ||
    "";
  return text ? stripHtml(text) : "";
}

function amenityLabel(value: unknown): string | null {
  if (!value) return null;
  if (typeof value === "string") return value.trim() || null;
  if (typeof value === "object") {
    const obj = value as { text?: string; title?: string; name?: string; label?: string };
    const label = obj.text || obj.title || obj.name || obj.label;
    return label?.trim() || null;
  }
  return String(value);
}

function extractAmenities(listing?: OwnerRezListing): string[] {
  const set = new Set<string>();
  (listing?.amenity_call_outs || []).forEach((a) => {
    const label = amenityLabel(a);
    if (label) set.add(label);
  });
  (listing?.amenity_categories || []).forEach((cat) => {
    (cat.amenities || []).forEach((a) => {
      const label = amenityLabel(typeof a === "string" ? a : a?.name ?? a);
      if (label) set.add(label);
    });
  });
  return Array.from(set);
}

function extractPhotos(listing: OwnerRezListing | undefined, property: OwnerRezProperty): PropertyPhoto[] {
  const photos: PropertyPhoto[] = (listing?.photos || [])
    .map((p, index): PropertyPhoto | null => {
      const url = p.large_url || p.original_url || p.url || p.cropped_url;
      if (!url) return null;
      return {
        url,
        caption: p.caption,
        sortOrder: p.display_order ?? index,
      };
    })
    .filter((p): p is PropertyPhoto => p !== null)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  if (photos.length) return photos;
  const thumb =
    property.thumbnail_url_large || property.thumbnail_url_medium || property.thumbnail_url;
  return thumb ? [{ url: thumb }] : [];
}

export function mapOwnerRezToProperty(
  property: OwnerRezProperty,
  listing?: OwnerRezListing,
  previous?: Property,
): Property {
  const photos = extractPhotos(listing, property);
  const thumbnail =
    photos[0]?.url ||
    property.thumbnail_url_large ||
    property.thumbnail_url_medium ||
    property.thumbnail_url ||
    previous?.thumbnail ||
    "";

  const price =
    listing?.nightly_rate_min ??
    previous?.price ??
    0;

  const temporaryTag = true;

  const headline =
    listing?.descriptions && !Array.isArray(listing.descriptions)
      ? listing.descriptions.headline
      : undefined;

  return {
    id: property.id,
    ownerrezId: property.id,
    name:
      headline ||
      property.external_name ||
      property.name ||
      previous?.name ||
      `Propiedad ${property.id}`,
    externalName: property.external_name,
    description: pickDescription(listing) || previous?.description || "",
    city: property.address?.city || previous?.city || "Barcelona",
    province: property.address?.province || previous?.province,
    country: property.address?.country || previous?.country || "SPAIN",
    address: [property.address?.street1, property.address?.street2].filter(Boolean).join(", ") || previous?.address,
    postalCode: property.address?.postal_code,
    latitude: property.latitude,
    longitude: property.longitude,
    price,
    currency: property.currency_code || "EUR",
    bedrooms: listing?.bedroom_count ?? property.bedrooms ?? previous?.bedrooms ?? 1,
    bathrooms: listing?.bathroom_count ?? property.bathrooms ?? property.bathrooms_full ?? previous?.bathrooms ?? 1,
    guests: listing?.occupancy_max ?? listing?.sleeps_max ?? property.max_guests ?? previous?.guests ?? 2,
    livingArea: property.living_area,
    type: normalizePropertyType(property.property_type),
    thumbnail,
    photos,
    amenities: extractAmenities(listing),
    tags: property.tags || [],
    temporary: temporaryTag,
    active: property.active !== false && !property.is_snoozed,
    visible: previous?.visible !== false,
    checkIn: property.check_in || previous?.checkIn || "16:00",
    checkOut: property.check_out || previous?.checkOut || "10:00",
    maxPets: property.max_pets,
    nightlyRateMin: listing?.nightly_rate_min,
    nightlyRateMax: listing?.nightly_rate_max,
    reviewAverage: listing?.review_average,
    reviewCount: listing?.review_count,
    publicUrl: property.public_url,
    syncedAt: new Date().toISOString(),
  };
}

export async function syncAllProperties(existing: Property[]): Promise<{
  properties: Property[];
  imported: number;
  updated: number;
}> {
  const [apiProperties, apiListings] = await Promise.all([
    fetchAllProperties(),
    fetchAllListings(),
  ]);

  const listingByProperty = new Map<number, OwnerRezListing>();
  for (const listing of apiListings) {
    if (listing.property_id) listingByProperty.set(listing.property_id, listing);
  }

  const existingById = new Map(existing.map((p) => [p.id, p]));
  let imported = 0;
  let updated = 0;

  const mapped = apiProperties.map((prop) => {
    const prev = existingById.get(prop.id);
    if (prev) updated += 1;
    else imported += 1;
    return mapOwnerRezToProperty(prop, listingByProperty.get(prop.id), prev);
  });

  // Keep manually hidden flags from settings via previous visible
  return { properties: mapped, imported, updated };
}

export function isOwnerRezConfigured() {
  return Boolean(process.env.OWNERREZ_EMAIL && process.env.OWNERREZ_TOKEN);
}

export interface BlockedRange {
  from: string;
  to: string;
  status?: string;
  isBlock?: boolean;
}

/** Noches ocupadas: arrival inclusive, departure exclusive */
export async function fetchPropertyBlockedRanges(
  propertyId: number,
  from: string,
  to: string,
): Promise<BlockedRange[]> {
  const page = await ownerrezFetch<{
    items?: {
      arrival?: string;
      departure?: string;
      status?: string;
      is_block?: boolean;
    }[];
  }>("/v2/bookings", {
    property_ids: [propertyId],
    from,
    to,
    limit: 100,
  });

  return (page.items || [])
    .filter((b) => b.arrival && b.departure)
    .filter((b) => {
      const status = (b.status || "").toLowerCase();
      return status !== "canceled" && status !== "cancelled";
    })
    .map((b) => ({
      from: String(b.arrival).slice(0, 10),
      to: String(b.departure).slice(0, 10),
      status: b.status,
      isBlock: Boolean(b.is_block),
    }));
}

export function translateOwnerRezMessage(message: string) {
  const lower = message.toLowerCase();
  if (lower.includes("conflict with existing bookings") || lower.includes("date conflict")) {
    return "Esas fechas no están disponibles porque se solapan con otra reserva. Elige otras fechas en el calendario.";
  }
  if (lower.includes("minimum stay") || lower.includes("min stay")) {
    return "No se cumple la estancia mínima de esta propiedad para esas fechas.";
  }
  if (lower.includes("maximum stay") || lower.includes("max stay")) {
    return "Se supera la estancia máxima permitida para esta propiedad.";
  }
  if (lower.includes("not available") || lower.includes("unavailable")) {
    return "La propiedad no está disponible en esas fechas.";
  }
  if (lower.includes("guests") && lower.includes("max")) {
    return "El número de huéspedes supera el máximo permitido.";
  }
  return message;
}
