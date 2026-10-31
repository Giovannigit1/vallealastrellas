const fs = require('fs');
const path = require('path');

const siteJsonPath = path.join(__dirname, '..', 'data', 'site.json');
const siteData = JSON.parse(fs.readFileSync(siteJsonPath, 'utf8'));

// Clean up project
delete siteData.project.academicNotice;
delete siteData.project.institution;
delete siteData.project.course;
delete siteData.project.professor;

siteData.project.tagline = "Una experiencia gastronómica y sensorial exclusiva que incluye un recorrido por los sabores del Valle del Elqui, degustaciones, banquete de cuatro tiempos, maridaje y observación astronómica guiada.";

siteData.project.team = [
  { name: "Antonia Huerta", role: "Co-fundadora & Chef de Experiencia" },
  { name: "Caroline Prado", role: "Co-fundadora & Dirección Gastronómica" },
  { name: "Paz Bozo", role: "Co-fundadora & Hospitalidad y Astroturismo" }
];

// Clean canonical
siteData.canonical.price = "$125.000 CLP por persona";
siteData.canonical.status = "Experiencia exclusiva con cupos limitados por jornada";
siteData.canonical.hours = "17:30 a 22:45 (Atardecer y noche estrellada)";
delete siteData.canonical.discount;

// Clean blog sources
siteData.blogPosts.forEach(post => {
  if (post.source && post.source.includes('INACAP')) {
    post.source = "Investigación botánica y gastronómica regional del Valle del Elqui";
  }
});

// Update FAQ
siteData.faqChatbot = [
  { q: "¿Dónde se realiza?", a: "La experiencia se realiza en Cochiguaz, Valle del Elqui (sector Río Cochiguaz km 3)." },
  { q: "¿Cuánto dura?", a: "La experiencia inicia a las 17:30 con la recepción al atardecer y culmina a las 22:45 tras la observación astronómica." },
  { q: "¿Cuánto cuesta?", a: "El valor de la experiencia es de $125.000 CLP por persona. Incluye recorrido de sabores, degustaciones, banquete de cuatro tiempos, maridaje y observación astronómica guiada." },
  { q: "¿Cómo puedo reservar?", a: "Puedes solicitar tu reserva en el formulario de la sección Reservas, indicando la fecha deseada y la cantidad de personas. El total se calcula automáticamente a $125.000 CLP por persona." },
  { q: "¿Hay opciones para restricciones alimentarias?", a: "Sí, adaptamos el menú para dietas vegetarianas, celiaquía (sin gluten) o intolerancias declaradas previamente en la reserva." },
  { q: "¿Qué sucede si la noche está nublada?", a: "Cochiguaz cuenta con cielos extraordinariamente despejados más de 300 noches al año. En caso de nubosidad imprevista, se realiza una sesión interpretativa guiada con material audiovisual de alta resolución y cata nocturna." },
  { q: "¿Cómo descargo el recetario?", a: "Puedes acceder a nuestro Recetario Patrimonial en la sección Recetario o descargarlo en formato PDF tras jugar la trivia del territorio." },
  { q: "¿Qué incluye la experiencia?", a: "Incluye: cóctel de bienvenida de autor, cata sensorial guiada de frutos del valle (papaya, copao, hierbas), banquete campestre de 4 tiempos con maridaje de altura, y sesión de astroturismo con telescopio y mantas térmicas." }
];

fs.writeFileSync(siteJsonPath, JSON.stringify(siteData, null, 2), 'utf8');
console.log('Successfully updated site.json!');
