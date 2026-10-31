const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'recetario.html'),
  path.join(__dirname, '..', 'recetario', 'index.html')
];

files.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');

  // Replace title & description
  html = html.replace(
    'Recetario Oficial del Valle del Elqui | Del valle a la mesa',
    'Recetario Patrimonial del Valle del Elqui | Del valle a la mesa'
  );

  // Replace badge
  html = html.replace(
    '<div class="badge">Gastronomía & Territorio · INACAP</div>',
    '<div class="badge">Gastronomía & Territorio · Valle del Elqui</div>'
  );

  // Replace academic box
  const oldBox = `<div class="academic-box">
        <strong>Proyecto Académico de Evaluación 2:</strong> Diseño de Experiencias Gastroturísticas.<br>
        <strong>Equipo:</strong> Antonia Huerta · Caroline Prado · Paz Bozo | <strong>Docente:</strong> Rubén Tapia.<br>
        <em>Estas preparaciones domésticas son propuestas educativas inspiradas en productos regionales; no representan un menú comercial confirmado.</em>
      </div>`;

  const newBox = `<div class="boutique-box" style="background-color: var(--arena-soft); border-left: 4px solid var(--verde-cactus); padding: 16px 20px; border-radius: 8px; margin: 20px auto; max-width: 720px; font-size: 14px; text-align: left; color: var(--azul-noche);">
        <strong>Recetario Patrimonial Oficial:</strong> Selección exclusiva de preparaciones tradicionales y contemporáneas del Valle del Elqui.<br>
        <strong>Creadoras y anfitrionas:</strong> Antonia Huerta · Caroline Prado · Paz Bozo.<br>
        <em>Preparaciones culinarias inspiradas en los sabores emblemáticos de Cochiguaz y el territorio elquino.</em>
      </div>`;

  html = html.replace(oldBox, newBox);

  // Replace footer
  html = html.replace(
    '<p>«Del valle a la mesa, de la mesa a las estrellas» · INACAP Evaluación 2</p>',
    '<p>«Del valle a la mesa, de la mesa a las estrellas» · Valle del Elqui, Chile</p>'
  );

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Updated:', filePath);
});
