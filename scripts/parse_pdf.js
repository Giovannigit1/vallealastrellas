const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

const pdfPath = path.join(__dirname, '..', 'Documentos', 'Valle del elqui e2 (1).pdf');
const dataBuffer = fs.readFileSync(pdfPath);

async function run() {
  const parser = new PDFParse({ data: dataBuffer });
  await parser.load();
  const textResult = await parser.getText();
  const outPath = path.join(__dirname, '..', 'docs', 'Informe_Oficial_Texto.md');
  const fullText = typeof textResult === 'string' ? textResult : (textResult.text || JSON.stringify(textResult, null, 2));
  fs.writeFileSync(outPath, fullText, 'utf8');
  console.log('PDF extracted successfully. Length:', fullText.length);
  await parser.destroy();
}

run().catch(console.error);

