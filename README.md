# Del Valle a la Mesa, de la Mesa a las Estrellas
> **Prototipo Académico de Experiencia Gastroturística y Astroturismo · INACAP**  
> **Carrera:** Administración Gastronómica | **Asignatura:** Diseño de experiencias gastroturísticas  
> **Equipo:** Antonia Huerta · Caroline Prado · Paz Bozo | **Docente:** Rubén Tapia  
> **Fecha:** Octubre de 2026 | **URL en Producción:** [https://vallealastrellas.vercel.app/](https://vallealastrellas.vercel.app/)

---

## 📌 1. Resumen y Contexto del Proyecto

Este proyecto es la reconstrucción integral, accesible y fidedigna del blog turístico para la experiencia **«Del valle a la mesa, de la mesa a las estrellas»**.

Se diseñó y programó siguiendo rigurosamente como fuentes oficiales de verdad:
1. **Informe Oficial de Evaluación 2 (`Valle del elqui e2 (1).pdf`)**: Máxima autoridad técnica para horarios, minutajes (690 min), 13 estaciones, cupos (hasta 15 personas), precios ($125.000 referencial), pasaporte gastronómico y medidas de contingencia.
2. **Guía Maestra del Blog (`Guia_Completa_Blog_Valle_del_Elqui.docx`)**: Plan editorial con textos textuales para las 6 entradas del blog, paleta cromática, diseño de juegos, 5 recetas medidas, chatbot y controles de accesibilidad.

---

## 🏛️ 2. Arquitectura del Sistema (Offline-First)

- **Tecnología Base:** HTML5 semántico + Vanilla CSS estructurado + Vanilla JavaScript modular (sin frameworks pesados ni dependencias de CDN en tiempo de ejecución).
- **Tipografía Autoalojada:** **Nunito** en formato WOFF2 local (`fuentes/`), garantizando carga idéntica sin conexión.
- **Service Worker (`sw.js`):** Almacenamiento en caché de toda la aplicación, imágenes, audios y el archivo PDF oficial. Abre instantáneamente en modo avión tras la primera visita.
- **Función Serverless Segura (`/api/subscribe`):** Procesamiento de suscripciones y consultas de reserva en Vercel con validación **Zod**, límite por IP y trampa antispam **honeypot**. El correo privado destinatario se mantiene estrictamente en la variable de entorno de servidor `NOTIFY_EMAIL`.
- **Paquete Offline Autocontenido:** Archivo `Blog_Valle_del_Elqui_v2.zip` listo para descomprimir y navegar en local sin instalar dependencias.

---

## 🎨 3. Paleta Cromática y Dirección de Arte

| Tono | Código HEX | Rol en el Sitio |
|---|---|---|
| **Arena clara** | `#F7EBD5` | Fondo principal diurno y tarjetas suaves |
| **Terracota** | `#BC6949` | Botones primarios, llamados a la acción (CTA) y titulares |
| **Verde cactus** | `#416B52` | Barra de navegación, encabezados y acentos botánicos |
| **Amarillo sol** | `#E9B84B` | Iconos de logros, estrellas del pasaporte y detalles |
| **Papaya** | `#EFAF8C` | Tarjetas sensoriales y acentos frutales suaves |
| **Violeta crepúsculo** | `#685178` | Bloque astronómico y transiciones crepusculares |
| **Azul noche** | `#17253D` | Pie de página, firmamento nocturno y modo alto contraste |
| **Blanco puro** | `#FFFFFF` | Contenedores de tarjetas y textos sobre fondos oscuros |

---

## ♿ 4. Accesibilidad Universal (WCAG 2.1 AA/AAA)

La barra superior accesible está presente de forma permanente y ofrece:
- **🔊 Síntesis de voz (SpeechSynthesis):** Lectura en voz alta en español chileno (`es-CL`) tanto de la página completa como de cada una de las 6 entradas del blog individualmente, con botones para pausar y reanudar.
- **Escala tipográfica (A+ / A−):** Ajuste del tamaño de letra entre 100 % y 160 % mediante variables CSS fluidas sin desbordar tarjetas ni botones.
- **🌓 Alto contraste:** Esquema negro/azul profundo con bordes amarillo sol y textos de máxima legibilidad (contraste > 12:1).
- **🛑 Reducir animaciones:** Conmutador manual y respeto automático a `prefers-reduced-motion`.
- **Navegación 100 % por teclado:** Enlace de salto inicial (*Skip link*), foco visible de alto contraste y juegos accionables mediante teclas y clics directos (sin necesidad de arrastrar elementos).

---

## 📋 5. Datos Canónicos y Reglas de Honestidad

- **Destino y Sector:** Valle del Elqui, Región de Coquimbo. Sector: Cochiguaz. Lugar propuesto: Valle Luz Camping, Río Cochiguaz km 3 (acceso por verificar).
- **Enlace de Ubicación Oficial:** [Google Maps Verificable](https://maps.app.goo.gl/xT1y8TbGECFkq86LA) (sin cartografía inventada).
- **Horario:** 10:00 a 21:30 (11 h 30 min / 690 minutos exactos en 13 estaciones).
- **Temporada:** Diciembre a marzo (verano), sujeta a clima y habilitación.
- **Cupo:** Máximo propuesto de 15 participantes por jornada (capacidad de diseño por validar con el recinto).
- **Precio:** $125.000 CLP por persona (estimación referencial, octubre 2026, no confirmado).
- **Estado:** Proyecto académico; disponibilidad y reservas comerciales **NO habilitadas**; solo formulario de interés.
- **Descuento Promocional:** 10 % de descuento referencial hipotético (simulación académica no canjeable).
- **Exclusiones de imágenes:** `foto_03.jpg` (captura turística) y `foto_19.jpg` (helados comerciales) fueron retiradas de la plataforma pública.
- **Servicios de bienestar:** Tinajas, pozones, masajes y camas de cuarzo se declaran explícitamente como *«sujetos a habilitación y validación del recinto»*.

---

## 🚀 6. Despliegue en Vercel y Variables de Entorno

El proyecto está configurado para desplegarse como sitio estático de alto rendimiento con función serverless en Vercel.

### Variables de Entorno Requeridas (en servidor):
| Variable | Descripción | Dónde configurarla |
|---|---|---|
| `NOTIFY_EMAIL` | Dirección privada donde el equipo recibe alertas de suscriptores y consultas de reserva | Consola Vercel (Production/Preview) |
| `RESEND_API_KEY` | Clave de API de Resend para el despacho de correos | Consola Vercel (Production/Preview) |
| `RESEND_FROM` | Remitente verificado (opcional, default: `onboarding@resend.dev`) | Consola Vercel |
| `SMTP_USER` / `SMTP_PASS` | Alternativa SMTP si no se utiliza Resend | Consola Vercel |

> **IMPORTANTE:** La dirección privada de correo nunca se escribe en el código, repositorios, bundles ni respuestas de red.

---

## 📖 7. Recetario Oficial Descargable

El recetario contiene las 5 piezas gastronómicas con ingredientes medidos, procedimiento paso a paso, porciones y alérgenos:
1. **Dulce tradicional de papaya del Elqui** (4 porciones · 500 g fruta · sin alérgenos).
2. **Postre de papaya con crema tibia artesanal** (4 copas · 300 g dulce · contiene leche).
3. **Preparación salada con queso de cabra y hierbas** (4 porciones · 200 g queso · contiene leche y gluten).
4. **Bebida refrescante de uva sin alcohol** (4 vasos · 400 g uva moscatel · libre de alérgenos).
5. **Ficha botánica y sensorial del Copao** (1 fruto maduro · degustación al natural · libre de alérgenos).

Archivos disponibles:
- `recetario/Recetario-Elqui.pdf` (PDF real de 557 KB, descargable offline).
- `recetario.html` (Vista web con estilos de impresión optimizados).

---

## ⏱️ 8. Guion de Demostración en Vivo (3 Minutos)

Para la exposición frente a la comisión evaluadora de INACAP:

1. **Minuto 1: Identidad y Relato Territorial (Portada + Quiénes Somos)**
   - Abrir el sitio web y mostrar la barra de accesibilidad superior (activar síntesis de voz y modo alto contraste para evidenciar inclusión WCAG).
   - Mostrar la franja con los datos canónicos: 10:00 a 21:30, Cochiguaz, hasta 15 personas.
   - Presentar al equipo de tres estudiantes (Antonia Huerta, Caroline Prado, Paz Bozo) destacando que la gastronomía es el eje central de la vivencia.
2. **Minuto 2: El Guion Técnico y las Entradas del Blog (Experiencia + Blog)**
   - Mostrar las 8 tarjetas resumen de la jornada y desplegar la **tabla técnica de las 13 estaciones (690 minutos exactos)** con sus medidas de contingencia (alternativa de cocción convencional ante falta de sol y charla interpretativa si hay nubes).
   - Recorrer el Blog con sus 6 entradas editoriales, mostrando el botón «🔊 Escuchar esta entrada» y los créditos responsables.
   - Mostrar la sección de Fauna con sus ilustraciones SVG vectoriales propias y normas de observación responsable.
3. **Minuto 3: Gamificación y Recetario Desbloqueable (Juegos + Recetario + Consulta)**
   - Responder la Trivia (avance 1/8 a 8/8) y mostrar la explicación didáctica inmediata.
   - Mostrar el Pasaporte Gastronómico con sus 6 hitos territoriales sellados y la garantía sin alcohol.
   - Abrir el Recetario Oficial desbloqueado y descargar el archivo PDF real de 557 KB.
   - Abrir el asistente virtual flotante «Elqui» y consultar por la duración o el lugar.
   - Concluir mostrando el pie con el enlace verificable de Google Maps y el recordatorio de honestidad académica: *«Proyecto académico. Disponibilidad no habilitada»*.
