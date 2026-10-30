const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const recetarioDir = path.join(__dirname, '..', 'recetario');
if (!fs.existsSync(recetarioDir)) {
  fs.mkdirSync(recetarioDir, { recursive: true });
}

const htmlPath = path.join(__dirname, '..', 'recetario.html');
const pdfPath = path.join(recetarioDir, 'Recetario-Elqui.pdf');

// Check browser paths
let browserPath = null;
const candidates = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium'
];

for (const candidate of candidates) {
  if (fs.existsSync(candidate)) {
    browserPath = candidate;
    break;
  }
}

if (!browserPath) {
  if (fs.existsSync(pdfPath)) {
    console.log('Browser not found, but pre-compiled PDF already exists:', pdfPath);
    process.exit(0);
  } else {
    console.warn('Warning: No headless browser found to generate PDF and no PDF exists.');
    process.exit(0);
  }
}

console.log('Using browser at:', browserPath);
console.log('Generating PDF from:', htmlPath);
console.log('Target PDF:', pdfPath);

try {
  execFileSync(browserPath, [
    '--headless',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--print-to-pdf=${pdfPath}`,
    `file://${htmlPath}`
  ]);

  if (fs.existsSync(pdfPath)) {
    const stats = fs.statSync(pdfPath);
    console.log('SUCCESS: PDF generated successfully! Size in bytes:', stats.size);
  } else {
    console.error('ERROR: PDF was not found after execution');
  }
} catch (err) {
  console.error('Error generating PDF:', err);
  if (!fs.existsSync(pdfPath)) {
    process.exit(1);
  }
}
