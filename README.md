# Stay4Days

Nueva web de Stay4Days en **React + Next.js**.

## Inicio rápido

```bash
cp .env.example .env.local
npm install
npm run dev
```

- Web: http://localhost:3000
- Admin: http://localhost:3000/admin

## Vercel

Root Directory: `.` (raíz del repo). Añade en Environment Variables:

- `OWNERREZ_EMAIL`
- `OWNERREZ_TOKEN`
- `ADMIN_PASSWORD`
- `OPENAI_API_KEY` (opcional)

## Funcionalidades

1. Web pública (propiedades, alquiler temporal 1–11 meses, tipos de vivienda, tickets → Tiqets)
2. Chatbot IA de consultas
3. Panel admin (propiedades, estadísticas, contactos, pagos, tickets)
4. Importación de propiedades vía **API OwnerRez**
