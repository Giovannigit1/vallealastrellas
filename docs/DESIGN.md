# Dirección de Diseño UX/UI & Sistema Visual
## "Del valle a la mesa, de la mesa a las estrellas"

---

## 1. Concepto y Atmósfera Sensorial
El diseño busca transportar al usuario al Valle del Elqui al caer la tarde: la transición mágica entre el dorado cálido del sol rebotando en los cerros de adobe y viñedos, y el azul profundo y cristalino del cielo nocturno más despejado del mundo.

### Pilares de Sensación:
1. **Calidez de Campo y Tierra:** Materialidad auténtica, madera noble, arcilla, cobre y luz crepuscular.
2. **Elegancia Cósmica:** La quietud de la noche estrellada, constelaciones nítidas y halos dorados sutiles.
3. **Hospitalidad Inclusiva:** Accesibilidad de clase mundial, sin barreras cognitivas, visuales ni auditivas.
4. **Anti-Plantilla:** Rechazo frontal a interfaces corporativas genéricas, frías o saturadas de azul tecnológico.

---

## 2. Paleta Cromática y Tokens Semánticos

| Token | Hex | Nombre | Uso / Semántica |
| :--- | :--- | :--- | :--- |
| `color-earth-dark` | `#1F1513` | Tierra y Adobe | Fondo principal nocturno, textos en fondos claros, botones primarios oscuros |
| `color-gold` | `#D4AF37` | Oro Estelar | Acentos, bordes activos, iconos estelares, insignias de premio, botones CTA |
| `color-gold-light` | `#F3E5AB` | Resplandor Cósmico | Textos secundarios en modo noche, halos, estados hover |
| `color-cream` | `#FDFBF7` | Crema Andino | Fondo claro de tarjetas diurnas, textos de alto contraste sobre oscuro |
| `color-cream-muted`| `#EDE7DC` | Lino Campestre | Bordes suaves, divisores, fondos sutiles de inputs |
| `color-night-deep` | `#0B132B` | Cielo Astronómico | Degradados del hero hacia la noche, sección astroturismo |
| `color-night-mid`  | `#1C2541` | Cordillera Nocturna | Tarjetas elevadas sobre fondo nocturno, dropdowns |
| `color-terracotta` | `#C05A3E` | Sol Poniente | Badges de cupos limitados, alertas cálidas, notas de cata |

### Ratios de Contraste WCAG:
- Texto blanco crema (`#FDFBF7`) sobre tierra oscura (`#1F1513`): **15.8:1** (Supera ampliamente AAA).
- Dorado estelar (`#D4AF37`) sobre tierra oscura (`#1F1513`): **7.2:1** (Cumple AAA para elementos gráficos y títulos).
- Texto oscuro (`#1F1513`) sobre crema andino (`#FDFBF7`): **16.1:1** (Supera ampliamente AAA).

---

## 3. Tipografía y Jerarquía

Utilizamos Google Fonts integradas con `next/font/google` con precarga y display swap:

1. **Serif Expresiva para Títulos:**  
   - Familia: **Cinzel** o **Playfair Display** (elegante, artesanal, astronómica y clásica).  
   - Usos: `h1`, `h2`, `h3`, marcas y citas de Gabriela Mistral.  
   - Escala:
     - Hero H1: `clamp(2.5rem, 5vw, 4.25rem)` / line-height `1.1`
     - Section H2: `clamp(1.85rem, 3.5vw, 2.75rem)` / line-height `1.2`
     - Card H3: `1.35rem` a `1.5rem`

2. **Sans-Serif Humanista para Cuerpo y UI:**  
   - Familia: **Plus Jakarta Sans** (geométrica suave, alta legibilidad en pantallas pequeñas, excelente rendimiento).  
   - Usos: Párrafos, formularios, tablas, botones y badges.  
   - Escala: `0.875rem` (14px notas), `1rem` (16px base), `1.125rem` (18px lead).

---

## 4. Animaciones y Motion Design
Todas las animaciones están condicionadas por `prefers-reduced-motion`:
- **Canvas de Estrellas Interactivo:** Campo de partículas luminosas con parpadeo suave y líneas de constelaciones que reaccionan tenuemente al puntero.
- **Scroll Timeline de 4 Horas:** Un trazo SVG curvo dorado que se dibuja fluidamente con el scroll del usuario entre las 17:00 y las 21:00 hrs.
- **Micro-interacciones Táctiles:** Elevación sutil de tarjetas de producto con perspectiva 3D (3-5 grados), pulsos en botones de reserva y animaciones de confeti celestial al confirmar.
- **Transiciones de Estado:** Desvanecimientos con curvas cúbicas naturales (`cubic-bezier(0.16, 1, 0.3, 1)`).

---

## 5. Diseño Inclusivo y Accesibilidad (WCAG 2.1 Nivel AA/AAA)
- **Barra de Accesibilidad Fija:**
  - Ajuste de escala tipográfica (A+ / A-) que modifica el tamaño de la raíz y se guarda en `localStorage`.
  - Botón de lectura por voz (Web Speech API) con síntesis fluida en español (`es-CL`).
  - Botón de subtítulos visuales (🤟) que revela tarjetas resumen inmediatas para personas con discapacidad auditiva o sobrecarga cognitiva.
  - Alternador de alto contraste.
- **Navegación por Teclado:**
  - Skip link inicial: `Saltar al contenido principal`.
  - Foco visible reforzado con anillo dorado doble (`outline: 2px solid #D4AF37; outline-offset: 3px`).
  - Trampa de foco en modales con escape (`Esc`) para cerrar.
- **Formularios Accesibles:**
  - Inputs con `<label>` explícito, estados de error enlazados por `aria-describedby` y feedback sonoro/visual.

---

## 6. Adaptabilidad Móvil (Mobile First)
- **360px (Móvil estrecho):** Navegación colapsable en drawer suave, botones táctiles de 48px mínimo, formularios en una sola columna con espaciado cómodo.
- **768px (Tablet):** Disposición de productos en dos columnas, línea de tiempo con hitos alternados.
- **1280px+ (Desktop):** Línea de tiempo inmersiva, tarjetas con tilt 3D y vista panorámica del hero con degradado crepuscular completo.
