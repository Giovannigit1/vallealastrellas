# Plan Maestro de Reconstrucción y Despliegue
## Proyecto: «Del valle a la mesa, de la mesa a las estrellas»
**Prototipo Académico de Evaluación 2 — INACAP**  
**Equipo:** Antonia Huerta, Caroline Prado, Paz Bozo  
**Asignatura:** Diseño de experiencias gastroturísticas  
**Profesor:** Rubén Tapia | **Fecha:** Octubre de 2026  

---

## 1. Arquitectura del Sistema (Offline-First + Vercel Serverless)

### 1.1 Principios de Ingeniería
- **Offline-First Absoluto**: El sitio debe ejecutarse al 100 % de manera local sin conexión a internet (modo avión), pudiendo entregarse en un archivo ZIP autocontenido (`Blog_Valle_del_Elqui_v2.zip`).
- **Cero dependencias CDN en runtime**: Todas las tipografías (Nunito / Aptos) están autoalojadas localmente en WOFF2. Todos los estilos y scripts son propios y locales. No hay llamadas a CDNs externas que bloqueen o fallen sin red.
- **Service Worker (`sw.js`)**: Caché pre-cargado de assets críticos (`index.html`, CSS, JS, fuentes, imágenes, PDF de recetario) para navegación instantánea sin internet tras la primera carga.
- **Función Serverless Segura (`/api/subscribe`)**: Único endpoint en la nube (Vercel Serverless Function en Node.js) para despachar correos de suscripción y consulta de reserva cuando hay conexión disponible.
  - Validación con **Zod**.
  - Protección con campo oculto **honeypot** antispam y limitador por IP.
  - El correo destinatario vive estrictamente en la variable de entorno privada de servidor `NOTIFY_EMAIL` (nunca expuesta en frontend, repositorio, `.env.example`, bundles ni logs).
  - Proveedor transaccional: **Resend** (vía `RESEND_API_KEY`) con fallback seguro a **Nodemailer SMTP** (`SMTP_USER`, `SMTP_PASS`).
  - Detección offline en frontend: Si `navigator.onLine === false` o la petición falla por red, se informa al usuario amigablemente que no hay conexión y que debe reintentar con internet. Nunca se simula un envío que no se ejecutó.

---

## 2. Mapa Integral de Secciones

| Sección | Elemento Principal | Activos / Interacciones | Accesibilidad / Honestidad |
|---|---|---|---|
| **Barra Superior Fija** | Logo «Del valle a la mesa», enlaces a secciones y botón hamburguesa móvil. | Enlaces suaves (`#seccion`), botón de menú móvil de toque amplio. | Botones accesibles fijos: «🔊 Escuchar», «A+», «A−», «Contraste», «Reducir animaciones», «Ayuda». |
| **1. Portada / Inicio** | Hero fotográfico (`foto_16.jpg`) con transición al atardecer (`foto_05.jpg`). | Franja con datos canónicos: 10:00 a 21:30 \| Hasta 15 personas \| Cochiguaz. Botones «Descubre la experiencia» y «Consultar reserva». | Pie permanente: «Proyecto académico. Disponibilidad no habilitada». |
| **2. Quiénes Somos** | Presentación de Antonia Huerta, Caroline Prado y Paz Bozo. | 3 tarjetas con nombres y roles formativos, misión, visión y frase de cierre. | Sin retratos inventados; fotografía de paisaje oficial (`foto_16.jpg`). |
| **3. Vive la Experiencia** | Itinerario integral: 8 tarjetas de resumen visual + Tabla técnica oficial de las **13 estaciones (690 minutos)**. | Línea de tiempo interactiva con tiempos, momentos, emociones y sentidos. | Aviso visible: las tarjetas son un resumen didáctico; el guion oficial es la tabla técnica de 13 estaciones. Indicación de servicios sujetos a habilitación. |
| **4. Blog Territorial** | 6 entradas editoriales completas (7.1 a 7.6): Sabores, Papaya/Copao, Cocina Solar, Uva y Pisco, Astronomía, Naturaleza y Fauna. | Botón individual «🔊 Escuchar esta entrada» (SpeechSynthesis), fecha canónica 30/10/2026, fotos con crédito oficial, fuentes verificables y CTA de navegación. | Cada entrada con ancla y transcripción audible. Advertencias de contingencia para sol y estrellas. |
| **5. Fauna del Valle** | Fichas educativas de zorro culpeo, cóndor andino y lagartijas nativas. | Ilustraciones vectoriales SVG propias optimizadas. Reglas de observación responsable (no alimentar, no perturbar). | Etiqueta expresa: «Ilustración referencial; no se garantiza avistamiento durante el recorrido». |
| **6. Galería Fotográfica** | Mosaico interactivo con filtros: «Paisajes», «Sabores», «Cocina solar», «Bienestar», «Estrellas». | Modal visor ampliado con descripción, autoría y cierre por tecla Esc o botón táctil. | Exclusión de `foto_03` (captura turística) y `foto_19` (helados comerciales). `foto_17` reservada solo a pisco con advertencia de marca. |
| **7. Juegos y Gamificación** | a) Trivia de 8 preguntas exactas con avance 1/8..8/8 y retroalimentación inmediata (logro 6/8).<br>b) «Misión: del valle a las estrellas» de 3 rondas por clic/teclado.<br>c) Pasaporte gastronómico con 6 hitos territoriales. | Almacenamiento en `localStorage` con bloque `try/catch`. Animaciones discretas, alternativa de lectura y audio. | 100 % operable por teclado. Alternativa sin alcohol que garantiza el sello pisquero sin discriminación. |
| **8. Recetario Digital** | 5 piezas completas de la guía maestra: Dulce de papaya, Postre de papaya con crema, Preparación salada con queso de cabra, Bebida sin alcohol de uva, Ficha educativa del copao. | Desbloqueo automático al lograr trivia + misión. Botón de descarga de PDF real offline (`recetario/Recetario-Elqui.pdf`) y vista HTML imprimible. | No condicionado a pagos, reservas ni entrega de datos personales. Ingredientes medidos, porciones, procedimiento y matriz de alérgenos. |
| **9. Suscripción y Descuento** | Formulario real de newsletter con nombre opcional, correo y casilla sin marcar. | Despacho por `/api/subscribe` a `NOTIFY_EMAIL`. Explicación del «10 % de descuento referencial hipotético» como simulación académica no canjeable. | Separación visual estricta entre el recetario gratuito por jugar y la simulación del descuento. |
| **10. Reservas y Ficha Práctica** | Tabla comparativa de la ficha comercial y formulario demostrativo de consulta de interés. | Datos canónicos (horario, cupo, lugar, precio $125.000 referencial). | Etiqueta visible: «Consulta de interés. No confirma reserva ni disponibilidad comercial». |
| **11. Comentarios de la Comunidad** | Formulario de retroalimentación (alias, comentario, consentimiento). | Guardado en `localStorage` demostrativo con aviso de moderación y privacidad. | No se transmiten datos sensibles a terceros ni se publican sin control editorial. |
| **12. Chatbot «Elqui, tu guía virtual»** | Asistente virtual flotante con burbuja «¿Necesitas ayuda?». | 8 preguntas canónicas con respuestas instantáneas y botones de sugerencia rápida. | Aclaración de honestidad: asistente predefinido con respuestas preparadas, no inteligencia artificial generativa. |
| **13. Pie y Contacto** | Resumen institucional, créditos, mapa geográfico verificable y enlaces. | Enlace oficial a Google Maps (Río Cochiguaz km 3). Sin teléfonos ni correos inventados. | Aviso legal canónico: «Proyecto académico. Disponibilidad no habilitada». |

---

## 3. Plan de Tareas de Implementación

1. **Fase 0 — Documentación Base y Auditoría de Activos**:
   - `docs/DISCREPANCIAS.md` (completado).
   - `docs/PLAN.md` (este documento).
   - `docs/DESIGN.md` (especificación visual y paleta oficial).
   - `docs/IMAGENES.md` (auditoría de las 23 fotos, alts, créditos y exclusiones).
   - `docs/COHERENCIA.md` (tabla de coherencia contra informe).
   - `src/data/site.ts` y `data/site.json` (centralización de datos canónicos).
2. **Fase 1 — Activos, Tipografía e Ilustraciones SVG**:
   - Extraer y copiar imágenes a `imagenes/` excluyendo las vetadas para uso público (`foto_03`, `foto_19`).
   - Crear versiones WebP y optimizar JPGs.
   - Generar ilustraciones SVG vectoriales propias para fauna (zorro culpeo, cóndor, lagartijas) e iconografía (sol, cactus, constelaciones).
   - Autoalojar tipografía Nunito en WOFF2 local en `fuentes/`.
3. **Fase 2 — Maquetación HTML Semántica y Accesible (`index.html`)**:
   - Estructurar el documento con HTML5 semántico (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`, `<aside>`).
   - Skip links para lectores de pantalla.
   - Regiones `aria-live` para anuncios dinámicos.
4. **Fase 3 — Sistema de Diseño CSS Vanilla (`estilos/main.css`)**:
   - Variables CSS para la paleta oficial (arena `#F7EBD5`, terracota `#BC6949`, verde cactus `#416B52`, etc.).
   - Modos: estándar, alto contraste (`body.high-contrast`), animaciones reducidas (`body.reduced-motion`), escalas de fuente A+/A- (100% a 160%).
   - Diseño responsivo mobile-first probado en 360px, 768px y 1280px.
5. **Fase 4 — Lógica e Interactividad Vanilla (`scripts/`)**:
   - `scripts/accessibility.js`: SpeechSynthesis en español, selector de tamaño de fuente, alto contraste, modo reducir movimiento.
   - `scripts/games.js`: Trivia de 8 preguntas con explicación, Misión de 3 rondas con teclado/pistas, Pasaporte de 6 hitos con persistencia en `localStorage`.
   - `scripts/gallery.js`: Filtros de mosaico y lightbox modal accesible con tecla Esc.
   - `scripts/chatbot.js`: Guía virtual «Elqui» con las 8 preguntas oficiales.
   - `scripts/forms.js`: Manejo de suscripción, consulta de reservas y comentarios locales.
6. **Fase 5 — Recetario Digital y Generación del PDF Real**:
   - Crear `recetario.html` con las 5 recetas medidas, porciones y alérgenos.
   - Generar el archivo PDF vectorial descargable `recetario/Recetario-Elqui.pdf`.
7. **Fase 6 — Service Worker Offline (`sw.js`)**:
   - Registro de Service Worker que cachea todo el sitio y assets.
   - Validación de funcionamiento completo en modo desconectado.
8. **Fase 7 — Función Serverless `/api/subscribe.js` y `vercel.json`**:
   - Endpoint compatible con Vercel Functions para procesar suscripción y consultas.
   - Soporte para Resend y Nodemailer usando `NOTIFY_EMAIL` estrictamente privado.
9. **Fase 8 — Pruebas de Calidad, Empaquetado ZIP y Despliegue en Vercel**:
   - Ejecutar script de verificación de enlaces y consola.
   - Generar `Blog_Valle_del_Elqui_v2.zip`.
   - Solicitar credenciales necesarias al usuario, configurar en Vercel y desplegar `vercel --prod`.
   - Verificar la URL pública activa: `https://vallealastrellas.vercel.app/`.
