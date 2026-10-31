const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.join(__dirname, '..');
const tempDir = path.join(rootDir, 'temp_offline_bundle');
const zipFile = path.join(rootDir, 'Blog_Valle_del_Elqui_v2.zip');

console.log('Preparando paquete offline para Blog_Valle_del_Elqui_v2.zip...');

if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
if (fs.existsSync(zipFile)) {
  fs.rmSync(zipFile, { force: true });
}

fs.mkdirSync(tempDir, { recursive: true });

// Copiar archivos raíz
const rootFiles = ['index.html', 'recetario.html', 'sw.js'];
rootFiles.forEach(f => {
  fs.copyFileSync(path.join(rootDir, f), path.join(tempDir, f));
});

// Crear LEEME.txt explicativo para el ZIP offline
const leemeContent = `========================================================================
DEL VALLE A LA MESA, DE LA MESA A LAS ESTRELLAS
Experiencia Gastronómica & Astroturismo · Cochiguaz, Valle del Elqui
Anfitrionas: Antonia Huerta · Caroline Prado · Paz Bozo
========================================================================

INSTRUCCIONES DE APERTURA SIN INTERNET (OFFLINE):
1. Descomprime este archivo ZIP completo en una carpeta local de tu computador.
2. Abre "index.html" con cualquier navegador moderno (Google Chrome, Microsoft Edge, Mozilla Firefox o Safari).
3. ¡No se requiere conexión a internet!
   - Todas las imágenes, estilos, tipografías y códigos están autocontenidos en rutas relativas locales.
   - El Recetario Oficial en PDF ("recetario/Recetario-Elqui.pdf") se encuentra listo para descargar y consultar sin conexión.
   - El juego de Trivia, la Misión interactiva, el Pasaporte Gastronómico y el asistente virtual "Elqui" funcionan al 100% desconectados en modo avión.
   - La lectura de voz en voz alta utiliza la síntesis nativa del navegador.

ACERCA DE LOS FORMULARIOS EN MODO OFFLINE:
- Suscripción y Consulta: Requieren internet para enviar el correo a través de la función serverless conectada en la nube. En modo offline, el sitio detecta la falta de red y avisa amigablemente que se requiere internet para el despacho.
- Comentarios y Pasaporte: Se guardan localmente en el navegador (localStorage) para demostración en vivo.

REGLAS DE HONESTIDAD ACADÉMICA:
- Proyecto académico: disponibilidad y reservas comerciales no habilitadas.
- Crédito de imágenes: archivo entregado por el equipo; autor y licencia por confirmar.
- Servicios de bienestar, tinajas y pozones sujetos a habilitación y convenio.
- 10% de descuento es una simulación didáctica no canjeable.
`;

fs.writeFileSync(path.join(tempDir, 'LEEME.txt'), leemeContent, 'utf8');

// Copiar carpetas recursivamente
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(path.join(rootDir, 'estilos'), path.join(tempDir, 'estilos'));
copyDir(path.join(rootDir, 'scripts'), path.join(tempDir, 'scripts'));
copyDir(path.join(rootDir, 'fuentes'), path.join(tempDir, 'fuentes'));
copyDir(path.join(rootDir, 'imagenes'), path.join(tempDir, 'imagenes'));
copyDir(path.join(rootDir, 'recetario'), path.join(tempDir, 'recetario'));
copyDir(path.join(rootDir, 'data'), path.join(tempDir, 'data'));

console.log('Comprimiendo carpeta temporal en Blog_Valle_del_Elqui_v2.zip...');
// Usar powershell Compress-Archive
try {
  execSync(`powershell -Command "Compress-Archive -Path '${tempDir}\\*' -DestinationPath '${zipFile}' -Force"`);
  if (fs.existsSync(zipFile)) {
    const sizeMB = (fs.statSync(zipFile).size / (1024 * 1024)).toFixed(2);
    console.log(`✅ ÉXITO: Blog_Valle_del_Elqui_v2.zip generado correctamente (${sizeMB} MB).`);
  }
  // Limpiar temporal
  fs.rmSync(tempDir, { recursive: true, force: true });
} catch (e) {
  console.error('Error al comprimir zip:', e);
}
