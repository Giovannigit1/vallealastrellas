const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
const recetarioHtml = fs.readFileSync(path.join(rootDir, 'recetario.html'), 'utf8');

console.log('=== VERIFICADOR DE INTEGRIDAD Y REGLAS DE HONESTIDAD ===');

// 1. Prohibited terms check
const prohibitedTerms = [
  'reserva confirmada',
  'cupón',
  'cupon',
  'pagar',
  '+56 9 1234 5678',
  'contacto@vallealastrellas.cl',
  'foto_03.jpg',
  'foto_19.jpg'
];

let prohibitedFound = 0;
for (const term of prohibitedTerms) {
  const indexMatches = indexHtml.toLowerCase().split(term.toLowerCase()).length - 1;
  const recetarioMatches = recetarioHtml.toLowerCase().split(term.toLowerCase()).length - 1;
  if (indexMatches > 0 || recetarioMatches > 0) {
    console.error(`ALERTA: Término prohibido detectado "${term}": index(${indexMatches}), recetario(${recetarioMatches})`);
    prohibitedFound++;
  } else {
    console.log(`✓ Término "${term}": 0 apariciones (Limpio)`);
  }
}

// 2. Check local file references (images, css, js, fonts, pdf)
const fileRefRegex = /(?:src|href)=["']([^"':#]+)["']/g;
let match;
const referencedFiles = new Set();

while ((match = fileRefRegex.exec(indexHtml)) !== null) {
  const ref = match[1].split('?')[0].split('#')[0];
  if (ref && !ref.startsWith('data:') && !ref.startsWith('http') && !ref.startsWith('mailto:')) {
    referencedFiles.add(ref);
  }
}

while ((match = fileRefRegex.exec(recetarioHtml)) !== null) {
  const ref = match[1].split('?')[0].split('#')[0];
  if (ref && !ref.startsWith('data:') && !ref.startsWith('http') && !ref.startsWith('mailto:')) {
    referencedFiles.add(ref);
  }
}

console.log('\n=== COMPROBACIÓN DE ARCHIVOS REFERENCIADOS ===');
let missingFiles = 0;
for (const relPath of referencedFiles) {
  const fullPath = path.join(rootDir, relPath);
  if (fs.existsSync(fullPath)) {
    console.log(`✓ Existe: ${relPath}`);
  } else {
    console.error(`❌ FALTA ARCHIVO: ${relPath} (Ruta: ${fullPath})`);
    missingFiles++;
  }
}

// 3. Anchor tags internal consistency check
const anchorRegex = /href=["']#([^"']+)["']/g;
const validIds = new Set();
const idRegex = /id=["']([^"']+)["']/g;

while ((match = idRegex.exec(indexHtml)) !== null) {
  validIds.add(match[1]);
}

console.log('\n=== COMPROBACIÓN DE ANCLAS INTERNAS (#id) ===');
let brokenAnchors = 0;
while ((match = anchorRegex.exec(indexHtml)) !== null) {
  const anchorId = match[1];
  if (validIds.has(anchorId)) {
    // console.log(`✓ Ancla válida: #${anchorId}`);
  } else {
    console.error(`❌ ANCLA ROTA: #${anchorId}`);
    brokenAnchors++;
  }
}

console.log('\n=== RESUMEN DE INTEGRIDAD ===');
console.log(`Términos prohibidos encontrados: ${prohibitedFound}`);
console.log(`Archivos faltantes: ${missingFiles}`);
console.log(`Anclas rotas: ${brokenAnchors}`);

if (prohibitedFound === 0 && missingFiles === 0 && brokenAnchors === 0) {
  console.log('✅ TODAS LAS PRUEBAS DE INTEGRIDAD Y REGLAS DE HONESTIDAD PASARON PERFECTAMENTE.');
} else {
  process.exit(1);
}
