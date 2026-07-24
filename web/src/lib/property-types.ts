import type { PropertyType } from "./types";

export const PROPERTY_TYPES: {
  slug: PropertyType;
  label: string;
  ownerrez: string[];
}[] = [
  { slug: "apartment", label: "Apartamento", ownerrez: ["apartment", "Apartment"] },
  {
    slug: "corporate_apartment",
    label: "Apartamento Corporativo",
    ownerrez: ["corporate_apartment", "CorporateApartment"],
  },
  { slug: "house", label: "Casa", ownerrez: ["house", "House", "home", "Home"] },
  {
    slug: "casa_particular",
    label: "Casa Particular",
    ownerrez: ["casa_particular", "private_home", "PrivateHome"],
  },
  { slug: "chalet", label: "Chalet", ownerrez: ["chalet", "Chalet"] },
  { slug: "condo", label: "Condominio", ownerrez: ["condo", "Condo", "condominium"] },
  { slug: "studio", label: "Estudio", ownerrez: ["studio", "Studio"] },
  { slug: "townhome", label: "Townhome", ownerrez: ["townhome", "Townhome", "townhouse"] },
  { slug: "villa", label: "Villa", ownerrez: ["villa", "Villa"] },
];

export function labelForType(type: string): string {
  const found = PROPERTY_TYPES.find((t) => t.slug === type);
  return found?.label ?? type;
}

export function normalizePropertyType(raw?: string | null): PropertyType {
  if (!raw) return "apartment";
  const lower = raw.toLowerCase().replace(/[\s-]/g, "_");
  for (const t of PROPERTY_TYPES) {
    if (t.slug === lower || t.ownerrez.some((o) => o.toLowerCase() === lower || o.toLowerCase() === raw.toLowerCase())) {
      return t.slug;
    }
  }
  if (lower.includes("villa")) return "villa";
  if (lower.includes("chalet")) return "chalet";
  if (lower.includes("studio") || lower.includes("loft")) return "studio";
  if (lower.includes("condo")) return "condo";
  if (lower.includes("town")) return "townhome";
  if (lower.includes("corporate")) return "corporate_apartment";
  if (lower.includes("house") || lower.includes("home") || lower.includes("casa")) return "house";
  return "apartment";
}

export const NEIGHBORHOODS = [
  "La Barceloneta",
  "Barrio Gótico",
  "El Born",
  "Eixample",
  "Gràcia",
  "Badalona",
  "Costa Brava",
];
