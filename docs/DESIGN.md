# Decisiones de Diseño y Dirección de Arte
## Proyecto: «Del valle a la mesa, de la mesa a las estrellas»

**Fuente de referencia:** `Guia_Completa_Blog_Valle_del_Elqui.docx` (Secciones 2 y 16) e informe técnico `Valle_del_elqui_e2__1_.pdf`.

---

## 1. Paleta Cromática Canónica

La paleta se inspira directamente en los tonos minerales, vegetales, frutales y celestes del Valle del Elqui y Cochiguaz. Se define en variables CSS (`:root`):

| Nombre | Valor HEX | Uso Canónico | Contraste y Accesibilidad |
|---|---|---|---|
| **Arena clara** | `#F7EBD5` | Fondo general de páginas, tarjetas suaves y secciones diurnas. | Ratio > 7:1 contra Azul noche y Verde cactus oscuro. |
| **Terracota** | `#BC6949` | Botones primarios, llamados a la acción (CTA) y acentos de titulares. | Cumple AA en titulares y botones con texto blanco `#FFFFFF`. |
| **Verde cactus** | `#416B52` | Barra de navegación superior, cabeceras, bordes y etiquetas temáticas. | Ratio > 4.8:1 con texto blanco; excelente contraste de lectura. |
| **Amarillo sol** | `#E9B84B` | Iconos de logros, estrellas del pasaporte, insignias de trivia y detalles. | Usado sobre fondos oscuros o como acento gráfico, nunca texto sobre blanco. |
| **Papaya** | `#EFAF8C` | Fondos de tarjetas sensoriales, bordes suaves y avisos informativos. | Evoca la pulpa de la fruta regional sin saturar la vista. |
| **Violeta crepúsculo** | `#685178` | Bloque temático astronómico, tarjetas del atardecer y transiciones. | Conexión visual armónica entre el atardecer y la noche profunda. |
| **Azul noche** | `#17253D` | Pie de página, bloque de astronomía profunda, modo alto contraste y texto principal. | Proporciona máxima legibilidad (AAA) sobre fondos arena. |
| **Blanco puro** | `#FFFFFF` | Tarjetas contenedoras diurnas, campos de formulario y texto sobre fondo oscuro. | Limpieza visual y delimitación precisa de componentes. |

---

## 2. Tipografía y Escala Visual

- **Familia tipográfica principal:** **Nunito** (autoalojada localmente en formato WOFF2 en `fuentes/`).
  - *Justificación:* Gran altura de la x, formas redondeadas y orgánicas que armonizan con la gastronomía artesanal, alta legibilidad en pantallas pequeñas y caracteres diacríticos españoles completos.
- **Escalas fluidas (mediante `clamp()`):**
  - **Títulos principales (`h1`):** `clamp(1.75rem, 4vw, 2.75rem)` (28px en móvil a 44px en escritorio).
  - **Títulos de sección (`h2`):** `clamp(1.4rem, 3vw, 2.1rem)` (22px a 34px).
  - **Subtítulos y tarjetas (`h3`):** `clamp(1.2rem, 2vw, 1.6rem)` (19px a 26px).
  - **Texto de lectura (`p`, `li`):** `clamp(1.05rem, 1.2vw, 1.25rem)` (17px a 20px) con interlineado generoso `line-height: 1.65`.
- **Regla de legibilidad:** Prohibido ubicar párrafos largos directamente sobre fotografías. Todos los textos van dentro de tarjetas con fondo sólido o translúcido de alto contraste.

---

## 3. Estilo Visual y Componentes

- **Imágenes:** Formato a pantalla ancha o mosaico ordenado, esquinas suavemente redondeadas (`border-radius: 16px` a `24px`), sombras sutiles que generan profundidad sin ruido (`box-shadow: 0 8px 24px rgba(23, 37, 61, 0.08)`).
- **Ilustraciones:** SVGs vectoriales propios creados exclusivamente para el proyecto:
  - Sol radiante geométrico para la cocina solar.
  - Cactus candelabro autóctono del valle.
  - Constelaciones australes (Cruz del Sur, Orión) para la sección astronómica.
  - Fichas ilustradas de fauna nativa (Zorro culpeo, Cóndor andino, Lagartija nítida) identificadas con la leyenda: *«Ilustración referencial»*.
- **Botones e interacciones:**
  - Áreas táctiles generosas (mínimo 48px x 48px).
  - Todos los botones cuentan con texto descriptivo visible (nunca iconos aislados sin etiqueta).
  - Microinteracciones de elevación (`transform: translateY(-2px)`) y brillo en hover, con retroalimentación táctil activa (`transform: translateY(0)`).

---

## 4. Animaciones y Movimiento Responsable

- **Criterio de sobriedad:** Animaciones discretas, fluidas y no esenciales para comprender el contenido.
- **Efectos implementados:**
  - Desvanecimiento y elevación suave al hacer scroll (`fade-in-up`) utilizando `IntersectionObserver`.
  - Línea de tiempo animada que revela las estaciones a medida que el usuario se desplaza.
  - Cielo estrellado sutil mediante CSS en la sección astronómica.
- **Accesibilidad al movimiento:**
  - Soporte automático para `@media (prefers-reduced-motion: reduce)`.
  - Botón accesible manual en la barra fija: «Reducir animaciones», que conmuta la clase `body.reduced-motion` e inhabilita inmediatamente todas las transiciones y efectos cinéticos.

---

## 5. Accesibilidad Universal (WCAG 2.1 AA / AAA)

- **Modo Alto Contraste:** Conmutable desde la barra superior; aplica fondos negros/azules profundos (`#0A1118`) con textos blanco nieve (`#FFFFFF`) y bordes amarillos sol (`#E9B84B`), garantizando ratios superiores a 12:1.
- **Escalador de Texto (A+ / A−):** Ajusta el tamaño de fuente base entre el 100 % y el 160 % mediante variable CSS, sin romper la diagramación de tarjetas, navegación ni formularios.
- **Lector de Pantalla y Síntesis de Voz:** Botón general «🔊 Escuchar página» y botones específicos en cada entrada de blog («🔊 Escuchar esta entrada») que invocan la Web Speech API (`SpeechSynthesis`) en español (`es-CL` o `es-ES`), con fallback informativo si el navegador no cuenta con soporte.
- **Navegación por Teclado:**
  - Indicador de foco visible de alto contraste (`outline: 3px solid #BC6949; outline-offset: 3px`).
  - Enlace de salto inicial (*Skip link*): «Saltar al contenido principal».
  - Módulos de juegos (Trivia y Misión) 100 % operables mediante teclado (`Enter`, `Espacio`, teclas numéricas), sin requerir arrastre con mouse.
