const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imgDir = path.join(__dirname, '..', 'imagenes');
const files = fs.readdirSync(imgDir);

async function convertAll() {
  console.log('Iniciando conversión y optimización de imágenes a WebP...');
  let count = 0;

  for (const file of files) {
    if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')) {
      const inputPath = path.join(imgDir, file);
      const baseName = path.parse(file).name;
      const outputPath = path.join(imgDir, `${baseName}.webp`);

      try {
        await sharp(inputPath)
          .webp({ quality: 82, effort: 4 })
          .toFile(outputPath);
        
        const origSize = fs.statSync(inputPath).size;
        const webpSize = fs.statSync(outputPath).size;
        const savings = Math.round((1 - webpSize / origSize) * 100);

        console.log(`✓ ${file} (${Math.round(origSize / 1024)} KB) -> ${baseName}.webp (${Math.round(webpSize / 1024)} KB) [${savings}% de ahorro]`);
        count++;
      } catch (err) {
        console.error(`Error convirtiendo ${file}:`, err);
      }
    }
  }

  console.log(`\nConversión finalizada: ${count} imágenes optimizadas a WebP.`);
}

convertAll();
