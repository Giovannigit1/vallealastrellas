# Del Valle a la Mesa, de la Mesa a las Estrellas
## Guía Oficial de Contenido, Secciones y Narrativa de Experiencia

> **Ubicación:** Valle del Elqui, Región de Coquimbo, Chile  
> **Concepto:** Encuentro gastronómico de campo, producto con identidad territorial y astroturismo bajo los cielos más limpios del planeta.  
> **Idioma oficial:** Español de Chile (cálido, evocador, hospitalario y elegante).

---

## 1. Identidad Visual y Paleta de Colores
- **Marrón Tierra Profunda:** `#1F1513` (Suelo andino, madera de barrica, hornos de barro).
- **Dorado Estelar del Sol Elquino:** `#D4AF37` / `#F3E5AB` (Uvas moscatel maduras, sol del valle, estrellas).
- **Crema Cálido y Lino:** `#FDFBF7` / `#FAF6F0` (Atmósfera acogedora, mantelería de campo, legibilidad óptima).
- **Azul Noche Astronómico:** `#0B132B` / `#1C2541` (Cielo nocturno de alta montaña, constelaciones, misterio cósmico).
- **Terracota / Ámbar Atardecer:** `#C05A3E` (Puesta de sol sobre los cerros cordilleranos).

---

## 2. Estructura de Navegación Fija
1. **Inicio** (Hero sensorial con atardecer y manto de estrellas)
2. **Productos** (Ingredientes emblemáticos con denominación de origen e identidad)
3. **Sobre Nosotros** (Historia de los agricultores, crianceros y astrónomos del valle)
4. **Vinculación Territorial** (Alianzas con productores, artesanos y comunidades diaguitas)
5. **Restaurantes Aliados** (Red gastronómica del Elqui en Vicuña, Paihuano y Pisco Elqui)
6. **Suscripción** (Comunidad elquina con 15% de descuento y recetario digital descargable)
7. **Trivia** (Desafío interactivo y accesible sobre el patrimonio del Elqui)
8. **Contacto** (Canales de atención, ubicación y reservas directas)
- **Botón Destacado:** `Reservar Experiencia` (Conduce a `/reservar`)

---

## 3. Barra de Accesibilidad Universal (Persistente y Visible)
- **Escala de Texto (A+ / A-):** Control de tamaño de fuente guardado en `localStorage`.
- **Lector de Voz (🔊 Escuchar / ⏹️ Detener):** Integración con Web Speech API (`es-CL` o `es-ES`), leyendo el contenido sintetizado de la sección activa.
- **Subtítulos para Personas Sordas (🤟):** Alterna cajas de resumen visual con síntesis directa, iconos claros y puntos clave en cada sección.
- **Alto Contraste:** Alterna esquema de colores de máxima distinción visual para personas con baja visión.

---

## 4. Experiencia Gastronómica: Línea de Tiempo de 4 Horas (17:00 a 21:00 hrs)
- **17:00 — Recepción & Brindis Dorado:**  
  Llegada al atardecer frente a los parronales. Cóctel de bienvenida con pisco sour de chañar y bocados tibios de queso de cabra asado con hierbas locales.
- **18:00 — Recorrido Sensorial de los Frutos del Valle:**  
  Paseo guiado entre huertos de papayos y algarrobos. Cata a ciegas de mieles silvestres, infusiones de rica-rica y aceites de oliva prensados en frío.
- **19:30 — Banquete Campestre al Crepúsculo:**  
  Cena rústica a fuego vivo maridada en 4 tiempos con vinos de altura y piscos artesanales de doble destilación, iluminada por antorchas y velas de cera de abeja.
- **20:30 — Astroturismo & Bautismo de Estrellas:**  
  El valle se apaga y el cielo cobra protagonismo. Observación con telescopios de gran apertura guiada por astrónomos locales, desgranando constelaciones del hemisferio sur y mitología diaguita.

---

## 5. Productos Típicos del Valle (Tarjetas con Relato Sensorial)
1. **Papaya Elquina & Miel de Chañar:**  
   *Descripción:* Fruto dorado icónico del Valle del Elqui confitado lentamente en pailas de cobre, bañado con reducción de chañar recolectado a mano en los bosques nativos de Paihuano.  
   *Nota de cata:* Dulzor cítrico vibrante, notas tostadas y final caramelizado.
2. **Queso de Cabra Curado con Hierbas Cordilleranas:**  
   *Descripción:* Elaboración artesanal de pequeños crianceros de quebrada con leche cruda de pastoreo libre, madurado durante 60 días con rica-rica y romero del valle.  
   *Nota de cata:* Textura mantecosa, acidez sutil, retrogusto herbáceo y mineral.
3. **Pisco D.O. de Autor Infusionado:**  
   *Descripción:* Destilado en alambiques de cobre a partir de uvas moscatel de Alejandría cosechadas a 1.800 metros sobre el nivel del mar, infusionado con botánicos andinos.  
   *Nota de cata:* Aromas florales penetrantes, notas de durazno deshidratado y final aterciopelado.

---

## 6. Sistema de Reservas (`/reservar`)
- **Horario:** Diaria y exclusiva, a las 17:00 hrs (finaliza a las 21:00 hrs).
- **Capacidad:** Máximo 12 comensales por día para garantizar intimidad y calidad astronómica.
- **Campos del formulario:**
  - Fecha de reserva (con selector de calendario y cupos dinámicos en tiempo real).
  - Número de personas (1 a 12 comensales).
  - ¿Con quién nos visitas? (En pareja, Familia con niños, Grupo de amigos, En solitario, Celebración especial).
  - Requerimientos dietéticos e inclusivos (Checklist):
    - Menú para personas alérgicas o celíacas (sin gluten).
    - Menú para personas diabéticas (sin azúcares añadidos).
    - Adulto mayor o persona con movilidad reducida (asiento preferencial y accesibilidad).
    - Menú infantil para niños.
  - Datos de contacto: Nombre completo, correo electrónico, teléfono/WhatsApp, notas adicionales.
  - Código promocional de descuento del 15% (código suscriptor o `VALLE15`).
  - Código de reserva generado: `ELQ-2026-XXXX`.
  - Acción complementaria: Botón "Reservar por WhatsApp" con mensaje directo preformateado.

---

## 7. Suscripción y Recetario Digital
- Formulario ágil: Nombre, correo, "¿con quién nos visitas?" + honeypot anti-spam.
- Recompensa inmediata: Cupón personal del 15% para reservar.
- Recetario digital descargable en PDF y visualizable en pantalla con 3 recetas exclusivas:
  1. *Tartaleta tibia de papayas elquinas al almíbar de chañar.*
  2. *Queso de cabra elquino sellado a la plancha con compota de higos y reducción de mistela.*
  3. *Garrón de cordero braseado al pisco moscatel con puré rústico aromatizado a la rica-rica.*

---

## 8. Trivia Accesible del Valle del Elqui (6 Preguntas)
1. **¿Por qué el Valle del Elqui cuenta con uno de los mejores cielos del mundo para la astronomía?**  
   - *Opciones:* A) Por tener más de 300 noches despejadas al año y baja humedad ambiental. B) Por estar al nivel del mar. C) Por la lluvia constante.  
   - *Correcta:* A (La cordillera frena las nubes costeras y el aire seco otorga una transparencia inigualable).
2. **¿De qué árbol nativo del norte chico chileno se obtiene la tradicional miel de chañar?**  
   - *Opciones:* A) Geoffroea decorticans (Chañar) B) Araucaria araucana C) Boldo  
   - *Correcta:* A (El chañar es una leguminosa leñosa típica de oasis y quebradas andinas).
3. **¿Qué poetisa chilena galardonada con el Premio Nobel de Literatura pasó su infancia en el Valle del Elqui?**  
   - *Opciones:* A) Gabriela Mistral B) Marcela Paz C) María Luisa Bombal  
   - *Correcta:* A (Lucila Godoy Alcayaga nació en Vicuña y creció en Montegrande).
4. **¿Cuál es la Denominación de Origen (D.O.) vitivinícola más antigua de América del Sur que protege este valle?**  
   - *Opciones:* A) Pisco de Chile (1931) B) Tequila C) Ron de Caña  
   - *Correcta:* A (Establecida legalmente en mayo de 1931 para las regiones de Atacama y Coquimbo).
5. **¿Qué variedad de uva aromática es la principal protagonista en la destilación del pisco tradicional elquino?**  
   - *Opciones:* A) Uva Moscatel de Alejandría y Rosada B) Cabernet Sauvignon C) Chardonnay  
   - *Correcta:* A (Aporta las inconfundibles notas cítricas y florales del destilado).
6. **¿Qué cultura originaria habitó el valle y plasmó su arte geométrico en cerámicas ceremoniales?**  
   - *Opciones:* A) Cultura Diaguita B) Selk'nam C) Rapa Nui  
   - *Correcta:* A (Los diaguitas fueron maestros alfareros y astrónomos precordilleranos).

---

## 9. Chatbot Flotante "Chani" (Guía Virtual del Valle)
- Botón negro mate con ribete dorado y micro-animación de constelación.
- Menú predefinido de 3 consultas rápidas:
  1. *¿Cuáles son los horarios y cómo llegar a la experiencia?*  
     (Respuesta clara: Inicio diario a las 17:00 hrs, punto de encuentro en Vicuña con transporte coordinado o llegada directa).
  2. *¿Qué vestimenta se recomienda para el valle y la noche estrellada?*  
     (Respuesta: Vestimenta por capas; las tardes son cálidas (26°C-30°C) y la noche baja a 10°C-12°C con brisa fresca de montaña).
  3. *¿Cuál es el estado del tiempo y visibilidad del cielo hoy en Vicuña?*  
     (Conexión en vivo con la API abierta Open-Meteo para coordenadas de Vicuña: temperatura actual, velocidad de viento y nubosidad, con aviso de valor referencial).

---

## 10. Centralización de Datos de Demostración (`src/data/site.ts`)
Para facilitar la adaptación tras la demo en vivo, los siguientes datos se definen exclusivamente en `src/data/site.ts`:
- Teléfono de reservas: `+56 9 8765 4321` (Demo)
- Correo de contacto: `experiencia@vallealasestrellas.cl` (Demo)
- Ubicación: Camino a Montegrande Km 14, Valle del Elqui, Coquimbo, Chile.
- Espacios y restaurantes aliados:
  - *Restaurante Solar Los Olivos* (Vicuña)
  - *Fogón Elquino & Destilería Artesanal* (Pisco Elqui)
  - *Rincón Diaguita & Sabores de Altura* (Paihuano)
  - *Terraza Astronómica Mamalluca* (Vicuña)

---

## 11. Seguridad y Notificación Privada de Suscripciones
- Cada suscripción dispara un correo de notificación exclusivamente a `NOTIFY_EMAIL` (variable de entorno de servidor).
- La dirección `NOTIFY_EMAIL` nunca viaja al navegador, nunca se imprime en consola, ni en logs públicos, ni en respuestas JSON.
- Si el servicio de correo (Resend / SMTP) experimenta latencia o falla, la suscripción se almacena con éxito en la base de datos o almacenamiento local de respaldo con `notificado: false`.
