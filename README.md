# Stay4Days

Nueva web de Stay4Days en **React + Next.js**.

## Inicio rápido

```bash
cd web
cp .env.example .env.local
npm install
npm run dev
```

- Web: http://localhost:3000
- Admin: http://localhost:3000/admin (password: `stay4days-admin`)

Documentación completa: [web/README.md](web/README.md)

## Funcionalidades

1. Web pública mejorada (propiedades, alquiler temporal 1–11 meses, tipos de vivienda, tickets → Tiqets)
2. Chatbot IA de consultas
3. Panel admin (propiedades, estadísticas, contactos, pagos, tickets)
4. Importación de propiedades vía **API OwnerRez** (`GET /v2/properties` + `GET /v2/listings`)
