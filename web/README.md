# Stay4Days — Web Next.js

Recreación mejorada de [stay4days.com](https://stay4days.com/) con React + Next.js, integración OwnerRez, chatbot IA y panel de administración.

## Arranque

```bash
cd web
cp .env.example .env.local
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Qué incluye

### Web pública
- Home con búsqueda por **tipos de vivienda**, fechas y huéspedes
- Catálogo de propiedades y ficha detallada
- **Alquiler temporal 1–11 meses**
- Tipos: Apartamento, Apartamento Corporativo, Casa, Casa Particular, Chalet, Condominio, Estudio, Townhome, Villa
- **Tickets y experiencias** (mismos productos que la web original; Comprar → Tiqets)
- Contacto + chatbot IA flotante

### Panel admin (`/admin`)
- Contraseña por defecto: `stay4days-admin` (cámbiala con `ADMIN_PASSWORD`)
- Estadísticas de la web
- Propiedades: ocultar/eliminar de la web
- Contactos (formulario, ficha, chat)
- Pagos / personas que han pagado
- Añadir y borrar tickets/experiencias
- **Sincronizar OwnerRez** (importa todas las propiedades + listings)

## OwnerRez

1. En OwnerRez: Settings → Advanced Tools → Developer/API Settings
2. Crea un Personal Access Token (`pt_…`)
3. En `.env.local`:

```
OWNERREZ_EMAIL=tu-email@ownerrez.com
OWNERREZ_TOKEN=pt_...
```

4. Entra en `/admin` y pulsa **Sincronizar OwnerRez**

La sync usa:
- `GET /v2/properties` (paginado)
- `GET /v2/listings` (fotos, descripciones, amenities, tarifas, reviews)

Sin credenciales, la web usa un catálogo seed basado en las propiedades públicas de Stay4Days.

## Chatbot

Con `OPENAI_API_KEY` responde con GPT usando el catálogo real. Sin clave, usa un asistente local con reglas sobre alquiler temporal, tipos, tickets y contacto.

## Scripts

```bash
npm run dev
npm run build
npm start
```
