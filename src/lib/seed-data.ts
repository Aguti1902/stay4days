import type { ContactLead, PaymentRecord } from "./types";
import { SEED_TICKETS } from "./seed-tickets";

export const SEED_CONTACTS: ContactLead[] = [
  {
    id: "c1",
    name: "Laura Martínez",
    email: "laura.m@example.com",
    phone: "+34 612 345 678",
    message: "Busco apartamento en Eixample para 3 meses (septiembre-noviembre).",
    propertyName: "Apartamento lujo & piscina junto Barcelona Centro",
    propertyId: 314887,
    source: "temporary",
    status: "new",
    createdAt: "2026-07-20T09:12:00.000Z",
  },
  {
    id: "c2",
    name: "James Wilson",
    email: "james.w@example.com",
    phone: "+44 7700 900123",
    message: "Interested in Casa Nina for 10 guests in August.",
    propertyId: 425059,
    propertyName: "Casa Nina junto Barcelona Centro y playa",
    source: "property",
    status: "contacted",
    createdAt: "2026-07-18T16:40:00.000Z",
  },
  {
    id: "c3",
    name: "Sophie Dubois",
    email: "sophie.d@example.com",
    message: "Consulta por alquiler temporal cerca de Gràcia, 2 personas, 6 meses.",
    source: "chat",
    status: "new",
    createdAt: "2026-07-22T11:05:00.000Z",
  },
];

export const SEED_PAYMENTS: PaymentRecord[] = [
  {
    id: "p1",
    guestName: "Carlos Ruiz",
    email: "carlos.ruiz@example.com",
    propertyId: 314883,
    propertyName: "Apartamento con encanto en Barcelona&Playa",
    amount: 1140,
    currency: "EUR",
    status: "paid",
    checkIn: "2026-07-10",
    checkOut: "2026-07-16",
    createdAt: "2026-07-02T14:20:00.000Z",
  },
  {
    id: "p2",
    guestName: "Emma Rossi",
    email: "emma.rossi@example.com",
    propertyId: 314886,
    propertyName: "Casa Luna, junto playa y Barcelona Centro",
    amount: 2900,
    currency: "EUR",
    status: "paid",
    checkIn: "2026-08-01",
    checkOut: "2026-08-20",
    createdAt: "2026-07-15T10:00:00.000Z",
  },
  {
    id: "p3",
    guestName: "Miguel Santos",
    email: "miguel.santos@example.com",
    propertyId: 314879,
    propertyName: "Apartamento y piscina cerca de Barcelona",
    amount: 4350,
    currency: "EUR",
    status: "pending",
    checkIn: "2026-09-01",
    checkOut: "2026-11-30",
    createdAt: "2026-07-21T18:30:00.000Z",
    notes: "Alquiler temporal 3 meses",
  },
];

export { SEED_TICKETS };
