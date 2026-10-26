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
- `RESEND_API_KEY` (emails)
- `EMAIL_FROM` (ej. `Stay4Days <hola@tudominio.com>`)
- `CONTACT_EMAIL` (formulario de contacto → `nati2525@hotmail.com`)
- `EMAIL_TO` (opcional: avisos de reserva/pago)
- `NEXT_PUBLIC_SITE_URL` (enlaces en correos)

## Emails

Con Resend se envían automáticamente:

1. **Contacto** → acuse al usuario + aviso a `CONTACT_EMAIL` (`nati2525@hotmail.com`)
2. **Reserva iniciada** → enlace de pago al huésped + aviso opcional a `EMAIL_TO`
3. **Pago (admin)** → confirmación / pendiente / reembolso al huésped

## Funcionalidades

1. Web pública (propiedades, alquiler temporal 1–11 meses, tipos de vivienda, tickets → Tiqets)
2. Chatbot IA de consultas
3. Panel admin (propiedades, estadísticas, contactos, pagos, tickets)
4. Importación de propiedades vía **API OwnerRez**
5. Flujo de correos (contacto, reserva y pagos)
