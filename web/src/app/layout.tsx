import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Chatbot } from "@/components/chat/Chatbot";
import { CookieBanner } from "@/components/legal/CookieBanner";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Stay4Days | Apartamentos y alquiler temporal en Barcelona",
    template: "%s | Stay4Days",
  },
  description:
    "Alquiler turístico y temporal (1-11 meses) en Barcelona. Reserva directa, concierge, tickets y experiencias. Propiedades sincronizadas con OwnerRez.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Chatbot />
        <CookieBanner />
      </body>
    </html>
  );
}
