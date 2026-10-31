const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'estilos', 'main.css');
let css = fs.readFileSync(cssPath, 'utf8');

const target = '/* 13. SECCIÓN FAUNA Y NATURALEZA */';
const endMarker = '/* 14. GALERÍA FOTOGRÁFICA INTERACTIVA */';

const newStyles = `/* 11. LAS 4 ETAPAS PRINCIPALES DEL ITINERARIO */
.itinerary-stages-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  margin-bottom: 40px;
}
.stage-card {
  background-color: var(--color-blanco);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(23, 37, 61, 0.08);
  border: 1px solid var(--color-borde);
  display: grid;
  grid-template-columns: 360px 1fr;
  transition: transform var(--trans-fast), box-shadow var(--trans-fast);
}
@media (max-width: 900px) {
  .stage-card {
    grid-template-columns: 1fr;
  }
}
.stage-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(23, 37, 61, 0.14);
}
.stage-media {
  position: relative;
  min-height: 260px;
  overflow: hidden;
}
.stage-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.stage-content {
  padding: 30px;
  display: flex;
  flex-direction: column;
}
.stage-badge-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.stage-time-badge {
  background-color: var(--color-papaya-soft);
  color: var(--color-terracota-dark);
  font-size: 13px;
  font-weight: 800;
  padding: 4px 12px;
  border-radius: var(--radius-full);
}
.stage-number {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-verde-cactus);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.stage-title {
  font-size: 24px;
  font-weight: 800;
  color: var(--color-azul-noche);
  margin-bottom: 12px;
  line-height: 1.3;
}
.stage-desc {
  font-size: 16px;
  color: var(--color-azul-noche);
  line-height: 1.6;
  margin-bottom: 18px;
}
.stage-includes-box {
  background-color: #FAF6EF;
  border: 1px solid #EBE0D2;
  border-radius: var(--radius-sm);
  padding: 14px 18px;
  font-size: 14px;
  color: #4A5568;
  margin-top: auto;
}
.stage-includes-box strong {
  color: var(--color-verde-cactus);
}

/* BANNER DE PRECIO DESTACADO DE LA EXPERIENCIA */
.experience-price-banner {
  background: linear-gradient(135deg, var(--color-azul-noche) 0%, #1A3152 100%);
  color: var(--color-blanco);
  border-radius: var(--radius-lg);
  padding: 36px 40px;
  box-shadow: 0 12px 30px rgba(23, 37, 61, 0.25);
  border: 2px solid var(--color-amarillo-sol);
  margin: 40px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
}
.price-banner-text h3 {
  font-size: 28px;
  font-weight: 800;
  color: var(--color-amarillo-sol);
  margin-bottom: 10px;
}
.price-banner-text p {
  font-size: 17px;
  line-height: 1.6;
  max-width: 680px;
  color: #E2E8F0;
}
.price-banner-action {
  flex-shrink: 0;
}

/* CAJA DE CÁLCULO DINÁMICO DE RESERVA */
.booking-calc-box {
  background-color: var(--color-arena-soft);
  border: 2px solid rgba(65, 107, 82, 0.3);
  border-radius: var(--radius-md);
  padding: 18px 20px;
  margin: 18px 0;
}

/* 13. SECCIÓN FAUNA Y NATURALEZA (REVISTA EDITORIAL) */
.fauna-category-title {
  font-size: 24px;
  font-weight: 800;
  color: var(--color-verde-cactus);
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 40px 0 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--color-arena-dark);
}
.fauna-magazine-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 28px;
  margin-bottom: 35px;
}
.fauna-magazine-card {
  background-color: var(--color-blanco);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(23, 37, 61, 0.06);
  border: 1px solid var(--color-borde);
  display: flex;
  flex-direction: column;
  transition: transform var(--trans-fast), box-shadow var(--trans-fast);
}
.fauna-magazine-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(23, 37, 61, 0.12);
  border-color: var(--color-verde-cactus);
}
.fauna-photo-wrapper {
  position: relative;
  height: 230px;
  overflow: hidden;
  background-color: var(--color-arena-soft);
}
.fauna-photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
  display: block;
}
.fauna-magazine-card:hover .fauna-photo-img {
  transform: scale(1.05);
}
.fauna-badge-pill {
  position: absolute;
  top: 14px;
  left: 14px;
  background-color: rgba(23, 37, 61, 0.85);
  backdrop-filter: blur(8px);
  color: var(--color-amarillo-sol);
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border: 1px solid rgba(233, 184, 75, 0.4);
}
.fauna-card-content {
  padding: 22px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.fauna-common-name {
  font-size: 21px;
  font-weight: 800;
  color: var(--color-verde-cactus);
  margin-bottom: 4px;
  line-height: 1.25;
}
.fauna-scientific-name {
  font-size: 14px;
  font-style: italic;
  font-weight: 600;
  color: var(--color-terracota);
  margin-bottom: 12px;
  display: block;
}
.fauna-brief-desc {
  font-size: 14px;
  color: var(--color-azul-noche);
  line-height: 1.6;
  margin-bottom: 16px;
  flex-grow: 1;
}
.fauna-photo-credit {
  font-size: 11px;
  color: #718096;
  border-top: 1px solid #EDF2F7;
  padding-top: 10px;
  margin-top: auto;
  font-style: italic;
}
.fauna-disclaimer-box {
  background-color: var(--color-arena-soft);
  border: 1px solid var(--color-arena-dark);
  border-left: 4px solid var(--color-verde-cactus);
  padding: 20px 24px;
  border-radius: var(--radius-md);
  margin-top: 30px;
  font-size: 14px;
  color: var(--color-texto-muted);
  line-height: 1.6;
}
`;

const startIdx = css.indexOf(target);
const endIdx = css.indexOf(endMarker);

if (startIdx !== -1 && endIdx !== -1) {
  css = css.slice(0, startIdx) + newStyles + '\n' + css.slice(endIdx);
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('Successfully updated main.css');
} else {
  console.error('Markers not found in main.css:', { startIdx, endIdx });
}
