export type PropertyType =
  | "apartment"
  | "corporate_apartment"
  | "house"
  | "casa_particular"
  | "chalet"
  | "condo"
  | "studio"
  | "townhome"
  | "villa";

export interface PropertyPhoto {
  url: string;
  caption?: string;
  sortOrder?: number;
}

export interface Property {
  id: number;
  ownerrezId?: number;
  name: string;
  externalName?: string;
  description?: string;
  city: string;
  province?: string;
  country: string;
  address?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  price: number;
  currency?: string;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  beds?: number;
  livingArea?: number;
  type: PropertyType;
  thumbnail: string;
  photos: PropertyPhoto[];
  amenities: string[];
  tags: string[];
  temporary: boolean;
  active: boolean;
  visible: boolean;
  checkIn?: string;
  checkOut?: string;
  maxPets?: number;
  nightlyRateMin?: number;
  nightlyRateMax?: number;
  reviewAverage?: number;
  reviewCount?: number;
  publicUrl?: string;
  syncedAt?: string;
  raw?: Record<string, unknown>;
}

export interface Ticket {
  id: string;
  title: string;
  type: string;
  languages?: string;
  duration?: string;
  availability?: string;
  includes: string[];
  priceFrom: number;
  currency: string;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  tiqetsUrl: string;
  active: boolean;
  createdAt: string;
}

export interface ContactLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  propertyId?: number;
  propertyName?: string;
  source: "contact" | "chat" | "property" | "temporary";
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

export interface PaymentRecord {
  id: string;
  guestName: string;
  email: string;
  propertyId?: number;
  propertyName: string;
  amount: number;
  currency: string;
  status: "paid" | "pending" | "refunded";
  checkIn?: string;
  checkOut?: string;
  createdAt: string;
  notes?: string;
}

export interface SiteStats {
  pageViews: number;
  propertyViews: number;
  searches: number;
  chatMessages: number;
  contacts: number;
  ticketClicks: number;
  lastUpdated: string;
  daily: { date: string; views: number; contacts: number; chats: number }[];
}

export interface AppSettings {
  lastOwnerrezSync?: string;
  hiddenPropertyIds: number[];
}
