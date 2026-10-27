# Plan de Arquitectura, Modelo de Datos y Ejecución
## "Del valle a la mesa, de la mesa a las estrellas"

---

## 1. Arquitectura del Sistema

```
[ Cliente / Navegador ]
       │
       ▼
[ Next.js 15+ App Router ] (TypeScript + Tailwind CSS + Motion)
       ├── Rutas de Páginas
       │     ├── /                 (Landing principal con las 8 secciones y chatbot)
       │     ├── /reservar         (Flujo dedicado de reservas)
       │     ├── /admin            (Panel de control protegido por contraseña)
       │     └── /recetario        (Recetario digital descargable / imprimible)
       │
       ├── Server Actions / Route Handlers
       │     ├── acciones de reserva (validación Zod + cálculo de cupos)
       │     ├── acciones de suscripción (honeypot + generación de cupón)
       │     ├── api/weather (Open-Meteo proxy para Vicuña con fallback local)
       │     └── servicio de correos privados (Resend / Nodemailer)
       │
       ▼
[ Capa de Persistencia con Adaptador Dual ]
       ├── Driver 1: Supabase PostgreSQL (cuando las variables existan)
       └── Driver 2: Adaptador Local Resiliente (archivos JSON en memoria/servidor)
           ==> GARANTÍA: La demo NUNCA falla por falta de credenciales o red externa.
```

---

## 2. Rutas y Componentes Clave

| Ruta | Propósito | Componentes Clave |
| :--- | :--- | :--- |
| `/` | Landing page principal | `AccessibilityBar`, `Navbar`, `HeroSection`, `TimelineSection`, `ProductsSection`, `AboutSection`, `TerritorySection`, `RestaurantsSection`, `SubscriptionSection`, `TriviaSection`, `ContactSection`, `ChatbotModal` |
| `/reservar` | Flujo de reservas completo | `ReservationForm`, `DateCapacityPicker`, `DietaryNeedsChecklist`, `CouponApplier`, `BookingConfirmationCard`, `WhatsAppBookingButton` |
| `/admin` | Panel de control interno | `AdminAuthGuard`, `ReservationsTable`, `SubscribersTable`, `StorageStatusBadge`, `ExportDataButton` |
| `/recetario` | Recetario digital descargable | `RecipeViewer`, `PrintRecipeButton`, `DownloadPdfTrigger` |

---

## 3. Modelo de Datos (TypeScript & SQL)

### Reservas (`reservations`)
- `id`: `string` (UUID o identificador único)
- `code`: `string` (Código público, ej. `ELQ-2026-A8F2`)
- `date`: `string` (Formato ISO `YYYY-MM-DD`, la experiencia es a las 17:00 hrs)
- `guests`: `number` (1 a 12 comensales)
- `companion_type`: `string` ("pareja", "familia", "amigos", "solo", "corporativo")
- `dietary_needs`: `string[]` (alérgicos, celíacos, diabéticos, movilidad reducida, niños)
- `name`: `string`
- `email`: `string`
- `phone`: `string`
- `comments`: `string?`
- `discount_code`: `string?`
- `status`: `'confirmed' | 'cancelled' | 'pending'`
- `created_at`: `string` (ISO timestamp)

### Suscriptores (`subscribers`)
- `id`: `string`
- `name`: `string`
- `email`: `string`
- `companion_type`: `string`
- `coupon_code`: `string` (ej. `ELQUI-15-XXXX`)
- `notified`: `boolean` (indica si el correo privado al administrador fue despachado)
- `created_at`: `string` (ISO timestamp)

---

## 4. Política de Fallback Obligatorio (Infallible Demo)
1. **Detección Automática de Entorno:**
   - Si `NEXT_PUBLIC_SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` están presentes y válidos: se conecta a PostgreSQL en Supabase.
   - Si falta cualquiera de las variables de entorno o si Supabase responde con error: conmuta automáticamente al **Adaptador Local Resiliente** (`src/lib/storage-local.ts`).
2. **Persistencia Local:**
   - Almacena en la memoria del servidor o en un archivo JSON en disco seguro (`.data/` o directorio temporal).
   - Siempre devuelve estado de éxito (`success: true`) para garantizar que la presentación en vivo fluya con total tranquilidad.

---

## 5. Notificación Privada de Suscripciones (Seguridad Estricta)
- **Variable de Entorno:** `NOTIFY_EMAIL` (solo accesible en servidor, sin prefijo `NEXT_PUBLIC_`).
- **Garantía de Confidencialidad:**
  - Prohibido imprimirla en logs, respuestas de red o el DOM.
  - El cliente solo recibe `{ success: true, coupon: 'ELQUI-15-XXXX' }`.
- **Proveedor:**
  - Intento principal con SDK oficial de Resend (`RESEND_API_KEY`).
  - Fallback a Nodemailer con variables SMTP si están configuradas.
  - Si no hay credenciales de correo o el envío falla: se registra en el log del servidor y la suscripción se guarda con `notified: false` sin arrojar error al usuario.
- **Honeypot & Rate Limiting:**
  - Campo falso oculto `website_url` que si viene lleno descarta silenciosamente al bot.
  - Límite de 5 envíos por hora por IP para prevenir abuso.

---

## 6. Lista de Tareas y Cronograma de Ejecución
1. [x] **Fase 0:** Instalación y verificación de las 7 skills del proyecto.
2. [x] **Fase 1:** Redacción de `docs/CONTENIDO.md`, `docs/DESIGN.md` y `docs/PLAN.md`.
3. [ ] **Fase 2:** Inicialización de Next.js, TypeScript, Tailwind CSS, fuentes e iconos.
4. [ ] **Fase 3:** Implementación de datos base (`src/data/site.ts`), adaptadores de almacenamiento y tipos.
5. [ ] **Fase 4:** Construcción de la Barra de Accesibilidad (Voz, A+/A-, Subtítulos para personas sordas, Contraste).
6. [ ] **Fase 5:** Desarrollo del Hero interactivo con Canvas de Estrellas y degradado crepuscular.
7. [ ] **Fase 6:** Línea de tiempo animada de 4 horas (17:00 a 21:00 hrs) y secciones de productos, nosotros y territorio.
8. [ ] **Fase 7:** Sistema de Reservas (`/reservar`), cálculo de cupos (12/día), generación de código y WhatsApp.
9. [ ] **Fase 8:** Suscripción, recetario digital y despacho seguro de correo a `NOTIFY_EMAIL`.
10. [ ] **Fase 9:** Trivia interactiva accesible con anuncios aria-live y Chatbot flotante con clima en vivo.
11. [ ] **Fase 10:** Panel administrativo `/admin` protegido con credencial demo y cambio de modo de almacenamiento.
12. [ ] **Fase 11:** Esquema SQL de Supabase (`supabase/schema.sql`) con políticas RLS.
13. [ ] **Fase 12:** Auditoría de compilación (`npm run build`), linting, accesibilidad y SEO.
14. [ ] **Fase 13:** Despliegue en Vercel, verificación en navegador real con subagente y entrega final con guion de demo.
