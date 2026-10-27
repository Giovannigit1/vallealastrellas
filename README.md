# Del Valle a la Mesa, de la Mesa a las Estrellas
> **Experiencia Gastronómica & Astroturismo en el Valle del Elqui, Chile**

Sitio web y plataforma de reservas de alta fidelidad, accesible y de alto rendimiento para el encuentro culinario diario de las 17:00 a las 21:00 hrs en el Valle del Elqui.

---

## 🚀 Tecnologías Principales
- **Framework:** [Next.js 16 (App Router)](https://nextjs.org) + React 19 + TypeScript
- **Estilos:** Tailwind CSS v4 + Tokens de diseño personalizados
- **Iconografía & Efectos:** [Lucide React](https://lucide.dev) + Canvas Confetti
- **Validación:** Zod
- **Base de Datos:** Doble adaptador:
  - **Supabase (PostgreSQL):** Cuando las variables están presentes.
  - **Adaptador Local Resiliente:** Si no se configuran variables de entorno o hay fallas de red externa, la demo sigue operando al 100% sin romperse.
- **Notificaciones por Correo:** Resend SDK para avisos privados de suscripciones en el servidor.
- **Pronóstico Meteorológico:** API abierta Open-Meteo para Vicuña con condición astronómica en tiempo real.

---

## 🛠️ Instalación y Ejecución Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env.local
   ```
   Edita `.env.local` según sea necesario (ver sección de variables más abajo).

3. **Ejecutar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

4. **Compilación de producción:**
   ```bash
   npm run build
   npm start
   ```

---

## ⚙️ Variables de Entorno

Configura en tu archivo `.env.local` o en la consola de Vercel:

| Variable | Tipo | Propósito | Ejemplo / Por Defecto |
| :--- | :--- | :--- | :--- |
| `NOTIFY_EMAIL` | Servidor (Privada) | Correo de destino donde el equipo recibe aviso de nuevas suscripciones | `tu-correo@ejemplo.com` |
| `FROM_EMAIL` | Servidor | Remitente verificado en Resend | `onboarding@resend.dev` |
| `RESEND_API_KEY` | Servidor | Clave de API de Resend para despacho de correos | `re_123456789...` |
| `ADMIN_PASSWORD` | Servidor | Contraseña para acceder a `/admin` | `elqui2026` |
| `NEXT_PUBLIC_SUPABASE_URL` | Pública | URL del proyecto Supabase (Opcional) | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Pública | Anon Key de Supabase (Opcional) | `eyJhbGci...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Servidor | Service Role Key con permisos totales RLS (Opcional) | `eyJhbGci...` |

> **Nota de Seguridad:** La variable `NOTIFY_EMAIL` solo vive en el servidor. Jamás se expone en el código cliente, en el DOM ni en las respuestas de la API.

---

## ✏️ Cómo Cambiar Textos, Teléfonos y Datos de Alianzas

Todos los datos institucionales, teléfonos de reserva, correos y restaurantes aliados están centralizados en un único archivo fuente para que modificarlos sea inmediato:

👉 **`src/data/site.ts`**

Para actualizar:
- **Teléfono o WhatsApp:** Modifica `SITE_CONFIG.demo.phone` y `SITE_CONFIG.demo.whatsappNumber`.
- **Correo de contacto:** Modifica `SITE_CONFIG.demo.email`.
- **Cupos diarios y horarios:** Modifica `SITE_CONFIG.experience.maxDailyCapacity` (por defecto 12) y `SITE_CONFIG.experience.startTime` (17:00).
- **Hitos de la línea de tiempo:** Edita el array `TIMELINE_MILESTONES`.
- **Productos del valle:** Edita el array `PRODUCTS_SHOWCASE`.
- **Restaurantes aliados:** Edita el array `ALLIED_RESTAURANTS`.
- **Preguntas de la trivia:** Edita el array `TRIVIA_QUESTIONS`.

---

## ♿ Características de Accesibilidad (WCAG 2.1 AA/AAA)

1. **Barra de Accesibilidad Fija:**
   - **A+ / A-:** Escalado de fuentes persistente en `localStorage`.
   - **🔊 Escuchar / ⏹️ Detener:** Síntesis de voz nativa (Web Speech API) leyendo la sección activa en español chileno (`es-CL`).
   - **🤟 Subtítulos Visuales:** Tarjetas de resumen condensadas para personas sordas o con sobrecarga cognitiva.
   - **Alto Contraste:** Alterna esquema de colores de máxima distinción.
2. **Navegación por Teclado:** Skip-link inicial, foco visual reforzado (`outline: 2px solid #D4AF37`) y soporte `prefers-reduced-motion`.

---

## ☁️ Despliegue en Vercel

Para desplegar o redeployar una nueva versión:

```bash
# Despliegue inicial de prueba
npx vercel

# Despliegue a producción
npx vercel --prod
```

O conectando el repositorio de GitHub directamente en el panel de Vercel.
