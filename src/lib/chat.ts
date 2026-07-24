import { getVisibleProperties, getTickets } from "./store";

export async function answerChat(message: string): Promise<string> {
  const key = process.env.OPENAI_API_KEY;
  const lower = message.toLowerCase();
  const properties = await getVisibleProperties();
  const tickets = (await getTickets()).filter((t) => t.active);

  if (key) {
    try {
      const catalog = properties
        .slice(0, 25)
        .map(
          (p) =>
            `- ${p.name} (${p.type}) en ${p.city}: desde ${p.price}€/noche, ${p.bedrooms} hab, ${p.guests} huéspedes, temporal=${p.temporary}`,
        )
        .join("\n");
      const ticketList = tickets
        .slice(0, 12)
        .map((t) => `- ${t.title}: desde ${t.priceFrom}€ → ${t.tiqetsUrl}`)
        .join("\n");

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-4o-mini",
          temperature: 0.4,
          messages: [
            {
              role: "system",
              content: `Eres el asistente de Stay4Days, agencia familiar de alquileres turísticos y temporales (1-11 meses) en Barcelona y alrededores. Responde en español, breve y útil. Teléfono/WhatsApp: +34 636 042 534. Email: stayfourdays@gmail.com. Reserva directa ~25% más barata. Oficina 365 días, atención en 9 idiomas. Tipos: Apartamento, Apartamento Corporativo, Casa, Casa Particular, Chalet, Condominio, Estudio, Townhome, Villa. Tickets/experiencias se compran en Tiqets. Propiedades:\n${catalog}\n\nTickets:\n${ticketList}`,
            },
            { role: "user", content: message },
          ],
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const text = data.choices?.[0]?.message?.content?.trim();
        if (text) return text;
      }
    } catch {
      // fallback below
    }
  }

  if (/hola|buenas|hey|hello/.test(lower)) {
    return "¡Hola! Soy el asistente de Stay4Days. Puedo ayudarte con apartamentos turísticos, alquileres temporales de 1 a 11 meses, tipos de vivienda, tickets y experiencias. ¿Qué necesitas?";
  }

  if (/temporal|meses|mes |1 a 11|estudiantes|prácticas/.test(lower)) {
    const temps = properties.slice(0, 4);
    return `Todas nuestras viviendas admiten alquiler temporal de 1 a 11 meses, con reserva y pago online. Ejemplos:\n${temps
      .map((p) => `• ${p.name} (${p.city}) desde ${p.price}€/noche`)
      .join("\n")}\n\nPuedes ver más en /alquiler-temporal o reservar desde la ficha de cada propiedad.`;
  }

  if (/ticket|experiencia|sagrada|tiqets|museo|entrada/.test(lower)) {
    const top = tickets.slice(0, 3);
    return `Tenemos entradas y experiencias con compra en Tiqets. Destacados:\n${top
      .map((t) => `• ${t.title} desde ${t.priceFrom}€`)
      .join("\n")}\n\nExplora todas en /tickets.`;
  }

  if (/tipo|vivienda|apartamento|chalet|villa|estudio|townhome|condo/.test(lower)) {
    return "Tipos de vivienda disponibles: Apartamento, Apartamento Corporativo, Casa, Casa Particular, Chalet, Condominio, Estudio, Townhome y Villa. Filtra en /propiedades.";
  }

  if (/precio|barato|descuento|25%/.test(lower)) {
    return "Reservando directo en Stay4Days suele salir ~25% más barato que en otros portales. También hay descuentos en actividades y sorteos mensuales de entradas.";
  }

  if (/contacto|whatsapp|teléfono|email|llamar/.test(lower)) {
    return "Puedes contactarnos por WhatsApp/teléfono en +34 636 042 534 o por el formulario de /contactar. Oficina abierta 365 días al año, atención en 9 idiomas.";
  }

  if (/concierge|tour|servicio/.test(lower)) {
    return "Nuestro concierge organiza tours privados y experiencias personalizadas. También ofrecemos check-in online, llaves digitales y cancelación flexible.";
  }

  const match = properties.find((p) => lower.includes(p.city.toLowerCase()) || lower.includes(p.name.toLowerCase().slice(0, 12)));
  if (match) {
    return `${match.name} está en ${match.city}, tipo ${match.type}, hasta ${match.guests} huéspedes, desde ${match.price}€/noche. Ver ficha: /propiedades/${match.id}`;
  }

  return `Puedo ayudarte a encontrar alojamiento en Barcelona (días/semanas o 1-11 meses), ver tickets o dejar tus datos de contacto. Ahora mismo tenemos ${properties.length} propiedades publicadas. ¿Buscas fechas concretas, zona o tipo de vivienda?`;
}
