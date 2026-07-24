export type AmenityCategoryId =
  | "rules"
  | "rooms"
  | "bathrooms"
  | "kitchen"
  | "comfort"
  | "entertainment"
  | "outdoor"
  | "safety"
  | "location"
  | "activities"
  | "other";

export const AMENITY_CATEGORY_LABELS: Record<AmenityCategoryId, string> = {
  rules: "Normas y acceso",
  rooms: "Dormitorios y camas",
  bathrooms: "Baños",
  kitchen: "Cocina",
  comfort: "Confort y servicios",
  entertainment: "Entretenimiento",
  outdoor: "Exterior",
  safety: "Seguridad",
  location: "Ubicación y vistas",
  activities: "Actividades cercanas",
  other: "Otros",
};

const EXACT: Record<string, string> = {
  Internet: "Internet",
  "Internet / Wifi": "Internet / WiFi",
  "Air Conditioning": "Aire acondicionado",
  "Central Heating": "Calefacción central",
  "Ceiling Fans": "Ventiladores de techo",
  Fireplace: "Chimenea",
  "Wood Stove": "Estufa de leña",
  "Hot Water": "Agua caliente",
  "Washing Machine": "Lavadora",
  "Clothes Dryer": "Secadora",
  "Clothes Drying Rack": "Tendedero",
  "Linens Provided": "Ropa de cama incluida",
  "Towels Provided": "Toallas incluidas",
  "Extra Pillows & Blankets": "Almohadas y mantas extra",
  "Hair Dryer": "Secador de pelo",
  "Iron & Board": "Plancha y tabla",
  Hangers: "Perchas",
  "Body Soap": "Jabón corporal",
  "Shower Gel": "Gel de ducha",
  Shampoo: "Champú",
  "Basic Soaps": "Jabones básicos",
  "Toilet Paper": "Papel higiénico",
  "Paper Towels": "Papel de cocina",
  "Cleaning Products": "Productos de limpieza",
  "Laptop Friendly Workspace": "Zona de trabajo",
  Desk: "Escritorio",
  "Desk Chair": "Silla de escritorio",
  Kitchen: "Cocina",
  Kitchenette: "Kitchenette",
  "Kitchen Island": "Isla de cocina",
  Refrigerator: "Nevera",
  Freezer: "Congelador",
  Stove: "Cocina / fogones",
  Oven: "Horno",
  Microwave: "Microondas",
  Dishwasher: "Lavavajillas",
  "Dishes & Utensils": "Vajilla y utensilios",
  "Coffee Maker": "Cafetera",
  Kettle: "Hervidor",
  Toaster: "Tostadora",
  "Pots & Pans": "Ollas y sartenes",
  "Dining Table": "Mesa de comedor",
  "Baking Sheet": "Bandeja de horno",
  "Wine Glasses": "Copas de vino",
  "Spices/Pantry Items": "Especias y despensa",
  Television: "Televisión",
  "Sound System": "Equipo de sonido",
  Books: "Libros",
  "Games/Board Games": "Juegos de mesa",
  Foosball: "Futbolín",
  "Game Room": "Sala de juegos",
  Playroom: "Sala de juegos infantiles",
  Toys: "Juguetes",
  "Children's Books & Toys": "Libros y juguetes infantiles",
  "Children's Dinnerware": "Vajilla infantil",
  "Child's Highchair": "Trona",
  "Pack N Play/Travel Crib": "Cuna de viaje",
  "Changing Table": "Cambiado",
  "Babysitter Recommendations": "Recomendaciones de canguro",
  Pool: "Piscina",
  "Private Pool": "Piscina privada",
  "Communal Pool": "Piscina comunitaria",
  "Pool View": "Vistas a la piscina",
  "Outdoor Grill": "Barbacoa",
  "Barbeque/Grill Utensils": "Utensilios de barbacoa",
  "Outdoor Dining": "Comedor exterior",
  "Outdoor Seating": "Asientos exteriores",
  "Outdoor Shower": "Ducha exterior",
  "Deck/Patio (uncovered)": "Terraza / patio descubierto",
  "Balcony/Terrace": "Balcón / terraza",
  "Sunroof/Roof Terrace": "Azotea / terraza en cubierta",
  "Lanai/Gazebo (covered)": "Porche / gazebo cubierto",
  "Lawn/Garden": "Jardín",
  "Private Yard": "Jardín privado",
  "Fenced Yard": "Jardín vallado",
  Hammock: "Hamaca",
  "Sun Loungers": "Tumbonas",
  "Play Area": "Zona de juegos",
  Playground: "Parque infantil",
  Beach: "Playa",
  Beachfront: "Primera línea de playa",
  "Beach View": "Vistas a la playa",
  "Beach Essentials": "Esenciales de playa",
  "Shared Beach Access": "Acceso compartido a la playa",
  "Water View": "Vistas al agua",
  Waterfront: "Frente al agua",
  Oceanfront: "Frente al mar",
  "Sea View": "Vistas al mar",
  "Mountain View": "Vistas a la montaña",
  "Garden View": "Vistas al jardín",
  "Courtyard View": "Vistas al patio",
  "City Skyline View": "Vistas a la ciudad",
  "Resort View": "Vistas al resort",
  City: "Ciudad",
  Downtown: "Centro ciudad",
  Town: "Pueblo",
  Village: "Pueblo",
  Rural: "Entorno rural",
  Mountain: "Montaña",
  Resort: "Resort",
  Marina: "Puerto deportivo",
  "Tourist Attractions": "Atracciones turísticas",
  Historic: "Zona histórica",
  Family: "Familiar",
  Romantic: "Romántico",
  Adventure: "Aventura",
  "Allows pets": "Se admiten mascotas",
  "Pets welcome": "Mascotas bienvenidas",
  "Pets not allowed": "No se admiten mascotas",
  "Children welcome": "Niños bienvenidos",
  "Infants welcome": "Bebés bienvenidos",
  "Not suitable for children": "No apto para niños",
  "Smoking allowed": "Se permite fumar",
  "Smoking not allowed": "No se permite fumar",
  "Entire Home": "Alojamiento completo",
  Accessible: "Accesible",
  "Wheelchair accessible": "Accesible en silla de ruedas",
  "Wheelchair inaccessible": "No accesible en silla de ruedas",
  "Home Step Free Access": "Acceso sin escalones",
  "Home Wide Doorway": "Puertas anchas",
  "Requires Stairs": "Requiere escaleras",
  "Disabled Parking Spot": "Plaza de aparcamiento adaptada",
  "Free Parking": "Aparcamiento gratuito",
  "Paid Parking": "Aparcamiento de pago",
  "Street Parking": "Aparcamiento en calle",
  "Limited Parking": "Aparcamiento limitado",
  Garage: "Garaje",
  "Private Entrance": "Entrada privada",
  "Private Living Room": "Salón privado",
  "Shared Spaces": "Espacios compartidos",
  Lockbox: "Caja de llaves",
  "Deadbolt Lock": "Cerradura de seguridad",
  "Lock On Bedroom Door": "Cerradura en dormitorio",
  Safe: "Caja fuerte",
  "Carbon Monoxide Detector": "Detector de monóxido de carbono",
  "Smoke Detector": "Detector de humo",
  "First Aid Kit": "Botiquín",
  "Cameras/Surveillance": "Cámaras / vigilancia",
  "Exterior Lighting": "Iluminación exterior",
  "Window Guards": "Protecciones en ventanas",
  "Path To Entrance Lit At Night": "Camino de entrada iluminado",
  "Room Darkening Shades": "Cortinas opacas",
  "Clothing Storage (closet orwardrobe)": "Armario / almacenamiento de ropa",
  "Host greets you": "El anfitrión te recibe",
  "Someone is available 24 hours a day to let guests in": "Disponibilidad 24h para entrega de llaves",
  "Cleaning Before Checkout": "Limpieza antes de la salida",
  "Cleaning Disinfection": "Limpieza y desinfección",
  "Enhanced Cleaning Practices": "Protocolos de limpieza reforzados",
  "Common Surface Disinfectant Cleaned": "Superficies comunes desinfectadas",
  "Linens High Temp Wash": "Ropa de cama lavada a alta temperatura",
  "Return Keys": "Devolver llaves",
  "Throw Away Trash": "Tirar la basura",
  "Turn Things Off": "Apagar dispositivos",
  "Coin Laundry": "Lavandería de monedas",
  Laundromat: "Lavandería",
  Hospital: "Hospital cercano",
  Shopping: "Zona comercial",
  Museums: "Museos",
  Zoo: "Zoo",
  "Water Parks": "Parques acuáticos",
  "Fitness Center": "Gimnasio",
  "Basketball Court": "Pista de baloncesto",
  Golf: "Golf",
  Cycling: "Ciclismo",
  Hiking: "Senderismo",
  Swimming: "Natación",
  Surfing: "Surf",
  Kayaking: "Kayak",
  "Kayak/Canoe": "Kayak / canoa",
  Boating: "Paseos en barco",
  Sailing: "Vela",
  Fishing: "Pesca",
  "Pier Fishing": "Pesca desde muelle",
  "Surf Fishing": "Pesca desde orilla",
  "Deepsea Fishing": "Pesca en alta mar",
  "Fly Fishing": "Pesca con mosca",
  "Water Skiing": "Esquí acuático",
  "Jet Skiing": "Moto de agua",
  "Water Sports": "Deportes acuáticos",
  "Wind Surfing": "Windsurf",
  Parasailing: "Parasailing",
  Snorkeling: "Snorkel",
  "Snorkeling/Diving": "Snorkel / buceo",
  "Scuba Diving/Snorkeling": "Buceo / snorkel",
  "Mountain Biking": "Bici de montaña",
  "Mountain Climbing": "Escalada",
  Mountaineering: "Alpinismo",
  "Rock Climbing": "Escalada en roca",
  "Horseback Riding": "Equitación",
  "Bird Watching": "Observación de aves",
  "Wildlife Viewing": "Observación de fauna",
  Antiquing: "Antigüedades",
  "Eco Tourism": "Ecoturismo",
  "Winery Tours": "Visitas a bodegas",
  "Gambling/Casinos": "Casinos",
  Bicycles: "Bicicletas",
  "Life Size Games": "Juegos a tamaño real",
  "Theme Room": "Habitación temática",
  "Single Level Home": "Vivienda de una sola planta",
  Apartment: "Apartamento",
  House: "Casa",
  Villa: "Villa",
  Chalet: "Chalet",
  Condo: "Condominio",
  Townhome: "Townhome",
  "Casa Particular": "Casa particular",
  "Corporate Apartment": "Apartamento corporativo",
  "Townhome in a casa particular": "Townhome en casa particular",
};

const CATEGORY_KEYWORDS: { id: AmenityCategoryId; tests: RegExp[] }[] = [
  {
    id: "rules",
    tests: [
      /mascotas|pets|niños|children|bebés|infants|fumar|smoking|ocupaci[oó]n|maximum occupancy|minimum age|edad m[ií]nima|apto para|not suitable|permite|admiten|welcome|allowed|not allowed/i,
    ],
  },
  {
    id: "rooms",
    tests: [/dormitorio|habitaci[oó]n|bedroom|bed |beds|cama|sofa|mattress|bunk|king|queen|twin|doble|estudio|principal|sleeps/i],
  },
  {
    id: "bathrooms",
    tests: [/ba[nñ]o|bathroom|aseo|shower|toilet|tub|bidet|half bath/i],
  },
  {
    id: "kitchen",
    tests: [
      /cocina|kitchen|nevera|refrigerator|freezer|horno|oven|microondas|microwave|lavavajillas|dishwasher|cafetera|coffee|tostadora|toaster|hervidor|kettle|vajilla|dishes|ollas|pots|especias|spices|comedor|dining|baking|wine glasses|fogones|stove/i,
    ],
  },
  {
    id: "comfort",
    tests: [
      /wifi|internet|aire|air conditioning|calefacci[oó]n|heating|ventilador|fan|chimenea|fireplace|agua caliente|hot water|lavadora|washing|secadora|dryer|ropa de cama|linens|toallas|towels|secador|hair dryer|plancha|iron|perchas|hangers|jab[oó]n|soap|champ[uú]|shampoo|gel|papel|toilet paper|entrada privada|private entrance|aparcamiento|parking|garaje|garage|escritorio|desk|trabajo|workspace|armario|clothing storage|cortinas|shades|almohadas|pillows/i,
    ],
  },
  {
    id: "entertainment",
    tests: [/televisi[oó]n|television|tv|sonido|sound|libros|books|juegos|games|futbol[ií]n|foosball|toys|juguetes|sala de juegos|game room|playroom/i],
  },
  {
    id: "outdoor",
    tests: [
      /piscina|pool|terraza|balcony|patio|deck|jard[ií]n|garden|yard|barbacoa|grill|barbeque|exterior|outdoor|tumbonas|hammock|azotea|sunroof|porche|lanai|gazebo|ducha exterior|play area|playground/i,
    ],
  },
  {
    id: "safety",
    tests: [
      /detector|smoke|mon[oó]xido|carbon|c[aá]maras|surveillance|botiqu[ií]n|first aid|cerradura|lock|caja de llaves|lockbox|caja fuerte|safe|seguridad|window guards|iluminaci[oó]n exterior|exterior lighting|desinfecci[oó]n|cleaning|protocolos/i,
    ],
  },
  {
    id: "location",
    tests: [
      /vista|view|playa|beach|mar|sea|ocean|waterfront|water view|monta[nñ]a|mountain|ciudad|city|pueblo|town|village|rural|centro|downtown|resort|puerto|marina|hist[oó]ric|atracciones|tourist|frente/i,
    ],
  },
  {
    id: "activities",
    tests: [
      /ciclismo|cycling|senderismo|hiking|surf|kayak|pesca|fishing|vela|sailing|buceo|snorkel|ski|golf|equitaci[oó]n|horse|museos|zoo|parques|shopping|aventura|adventure|deportes|sports|boating|climbing|windsurf|parasailing/i,
    ],
  },
];

function decodeHtml(value: string) {
  return value
    .replace(/&ndash;/g, "–")
    .replace(/&amp;/g, "&")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&ntilde;/gi, "ñ")
    .replace(/&aacute;/gi, "á")
    .replace(/&eacute;/gi, "é")
    .replace(/&iacute;/gi, "í")
    .replace(/&oacute;/gi, "ó")
    .replace(/&uacute;/gi, "ú")
    .trim();
}

function translatePatterns(raw: string): string | null {
  const value = decodeHtml(raw);

  const occ = value.match(/^Maximum occupancy:\s*(\d+)$/i);
  if (occ) return `Ocupación máxima: ${occ[1]}`;

  const age = value.match(/^Minimum age of primary renter:\s*(\d+)$/i);
  if (age) return `Edad mínima del titular: ${age[1]} años`;

  const baths = value.match(/^(\d+)\s+Bathrooms?(?:,\s*(\d+)\s+Half bath)?$/i);
  if (baths) {
    const half = baths[2] ? `, ${baths[2]} aseo` : "";
    return `${baths[1]} baño${baths[1] === "1" ? "" : "s"}${half}`;
  }

  const oneBath = value.match(/^1 Bathroom$/i);
  if (oneBath) return "1 baño";

  const beds = value.match(/^(\d+)\s+Bedrooms?,\s*sleeps\s*([\d-]+)$/i);
  if (beds) return `${beds[1]} dormitorio${beds[1] === "1" ? "" : "s"}, capacidad ${beds[2]}`;

  const oneBed = value.match(/^1 Bedroom(?:,\s*sleeps\s*([\d-]+))?$/i);
  if (oneBed) return oneBed[1] ? `1 dormitorio, capacidad ${oneBed[1]}` : "1 dormitorio";

  const floor = value.match(/^(Apartment|Studio) in a building on the (\d+)(?:st|nd|rd|th) floor$/i);
  if (floor) {
    const type = floor[1].toLowerCase() === "studio" ? "Estudio" : "Apartamento";
    return `${type} en edificio, planta ${floor[2]}`;
  }

  // Room detail lines like "– 1 Double Bed"
  const detail = value.match(/^[–\-]\s*(.+)$/);
  if (detail) {
    const inner = translatePatterns(detail[1]) || translateExact(detail[1]) || detail[1];
    return `– ${inner}`;
  }

  const bedCount = value.match(/^(\d+)\s+(Double Bed|Twin Beds?|King Bed|Queen Bed|Sleeper Sofa|Floor Mattress|Bunk Bed)s?$/i);
  if (bedCount) {
    const map: Record<string, string> = {
      "double bed": "cama de matrimonio",
      "twin bed": "cama individual",
      "twin beds": "camas individuales",
      "king bed": "cama king",
      "queen bed": "cama queen",
      "sleeper sofa": "sofá cama",
      "floor mattress": "colchón en el suelo",
      "bunk bed": "litera",
    };
    const key = bedCount[2].toLowerCase().replace(/s$/, bedCount[2].toLowerCase().endsWith("beds") ? "s" : "");
    const normalized = bedCount[2].toLowerCase();
    const label =
      map[normalized] ||
      map[normalized.replace(/s$/, "")] ||
      (normalized.includes("twin")
        ? Number(bedCount[1]) > 1
          ? "camas individuales"
          : "cama individual"
        : normalized.includes("double")
          ? "cama de matrimonio"
          : normalized.includes("king")
            ? "cama king"
            : normalized.includes("queen")
              ? "cama queen"
              : normalized.includes("sofa")
                ? "sofá cama"
                : normalized.includes("mattress")
                  ? "colchón en el suelo"
                  : normalized.includes("bunk")
                    ? "litera"
                    : bedCount[2]);
    return `${bedCount[1]} ${label}`;
  }

  return null;
}

function translateExact(value: string) {
  if (EXACT[value]) return EXACT[value];
  const decoded = decodeHtml(value);
  if (EXACT[decoded]) return EXACT[decoded];
  // case-insensitive fallback
  const found = Object.entries(EXACT).find(([k]) => k.toLowerCase() === decoded.toLowerCase());
  return found?.[1];
}

function translateFragments(value: string) {
  let out = decodeHtml(value);
  const replacements: [RegExp, string][] = [
    [/Combination Tub\/Shower/gi, "Bañera/ducha combinada"],
    [/Shower/gi, "Ducha"],
    [/Toilet/gi, "Inodoro"],
    [/Tub/gi, "Bañera"],
    [/Bidet/gi, "Bidé"],
    [/King Bed/gi, "cama king"],
    [/Queen Bed/gi, "cama queen"],
    [/Double Bed/gi, "cama de matrimonio"],
    [/Twin Beds?/gi, "cama(s) individual(es)"],
    [/Sleeper Sofa/gi, "sofá cama"],
    [/Floor Mattress/gi, "colchón en el suelo"],
    [/Bunk Bed/gi, "litera"],
    [/closet orwardrobe/gi, "armario"],
    [/uncovered/gi, "descubierto"],
    [/covered/gi, "cubierto"],
  ];
  for (const [re, rep] of replacements) out = out.replace(re, rep);
  return out;
}

export function translateAmenity(raw: string): string {
  const value = decodeHtml(String(raw || "")).replace(/\s+/g, " ").trim();
  if (!value) return "";
  return translatePatterns(value) || translateExact(value) || translateFragments(value);
}

export function categorizeAmenity(label: string): AmenityCategoryId {
  for (const cat of CATEGORY_KEYWORDS) {
    if (cat.tests.some((re) => re.test(label))) return cat.id;
  }
  return "other";
}

export function groupAmenities(amenities: unknown[]) {
  const grouped = new Map<AmenityCategoryId, string[]>();
  const seen = new Set<string>();

  for (const item of amenities) {
    const raw =
      typeof item === "string"
        ? item
        : ((item as { text?: string; title?: string; name?: string })?.text ||
            (item as { title?: string })?.title ||
            (item as { name?: string })?.name ||
            "");
    const label = translateAmenity(raw);
    if (!label) continue;
    // skip ultra-noisy bathroom composition duplicates that are almost empty
    if (/^–\s*$/.test(label)) continue;
    const key = label.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    const category = categorizeAmenity(`${raw} ${label}`);
    const list = grouped.get(category) || [];
    list.push(label);
    grouped.set(category, list);
  }

  const order: AmenityCategoryId[] = [
    "rules",
    "comfort",
    "kitchen",
    "rooms",
    "bathrooms",
    "outdoor",
    "entertainment",
    "safety",
    "location",
    "activities",
    "other",
  ];

  return order
    .filter((id) => (grouped.get(id) || []).length > 0)
    .map((id) => ({
      id,
      label: AMENITY_CATEGORY_LABELS[id],
      items: grouped.get(id) || [],
    }));
}

export function translateChargeDescription(description?: string, type?: string): string {
  const raw = (description || "").trim();
  if (!raw) {
    if (type === "rent") return "Alojamiento";
    if (type === "surcharge") return "Suplemento";
    if (type === "tax") return "Impuesto";
    return "Concepto";
  }

  const nights = raw.match(/^(\d+)\s+nights?$/i);
  if (nights) return `${nights[1]} noche${nights[1] === "1" ? "" : "s"}`;

  const cleaning = raw.match(/^Cleaning based on\s+(.+)\s+per stay$/i);
  if (cleaning) return `Limpieza (${cleaning[1]} por estancia)`;

  const management = raw.match(/^Management based on\s+(.+)\s+per stay$/i);
  if (management) return `Gestión (${management[1]} por estancia)`;

  const basedOn = raw.match(/^(.+?)\s+based on\s+(.+)$/i);
  if (basedOn) {
    const titleMap: Record<string, string> = {
      Cleaning: "Limpieza",
      Management: "Gestión",
      Rent: "Alojamiento",
      Tax: "Impuesto",
      "Service fee": "Gastos de gestión",
    };
    const name = titleMap[basedOn[1]] || basedOn[1];
    return `${name} (según ${basedOn[2]})`;
  }

  const map: Record<string, string> = {
    Cleaning: "Limpieza",
    Management: "Gestión",
    Rent: "Alojamiento",
    Tax: "Impuesto",
    "Tourist tax": "Tasa turística",
    "Service fee": "Gastos de gestión",
  };
  if (map[raw]) return map[raw];

  return raw
    .replace(/Cleaning/gi, "Limpieza")
    .replace(/Management/gi, "Gestión")
    .replace(/\bnights\b/gi, "noches")
    .replace(/\bnight\b/gi, "noche")
    .replace(/per stay/gi, "por estancia")
    .replace(/based on/gi, "según");
}
