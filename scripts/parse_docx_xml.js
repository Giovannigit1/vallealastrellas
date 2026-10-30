const fs = require('fs');
const path = require('path');

const xmlPath = path.join(__dirname, '..', 'extracted_docx', 'word', 'document.xml');
const xml = fs.readFileSync(xmlPath, 'utf8');

// Simple regex parser for OpenXML word/document.xml
// Paragraphs <w:p>, runs <w:r>, text <w:t>, table rows <w:tr>, table cells <w:tc>

let textOutput = [];

// Split by paragraphs and table rows
const pMatches = xml.split(/<\/w:p>/);

for (const p of pMatches) {
  // Check if paragraph contains headings or bold
  const isHeading1 = /<w:pStyle w:val="(?:Heading1|Ttulo1|Title)"/i.test(p);
  const isHeading2 = /<w:pStyle w:val="(?:Heading2|Ttulo2|Subtitle)"/i.test(p);
  const isHeading3 = /<w:pStyle w:val="(?:Heading3|Ttulo3)"/i.test(p);
  
  // Extract all <w:t> or <w:t xml:space="preserve">
  const tMatches = [...p.matchAll(/<w:t(?:[^>]*)>([\s\S]*?)<\/w:t>/g)];
  if (tMatches.length > 0) {
    let line = tMatches.map(m => m[1]).join('');
    // Decode basic XML entities
    line = line.replace(/&amp;/g, '&')
               .replace(/&lt;/g, '<')
               .replace(/&gt;/g, '>')
               .replace(/&quot;/g, '"')
               .replace(/&apos;/g, "'");
    
    if (line.trim()) {
      if (isHeading1) textOutput.push('\n# ' + line.trim() + '\n');
      else if (isHeading2) textOutput.push('\n## ' + line.trim() + '\n');
      else if (isHeading3) textOutput.push('\n### ' + line.trim() + '\n');
      else textOutput.push(line.trim());
    }
  }
}

const outDir = path.join(__dirname, '..', 'docs');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'Guia_Completa_Texto.md'), textOutput.join('\n'), 'utf8');
console.log('Successfully wrote docs/Guia_Completa_Texto.md, lines:', textOutput.length);
