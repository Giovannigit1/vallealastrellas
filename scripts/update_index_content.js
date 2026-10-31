const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

console.log('Original index.html length:', html.length);

// 1. HEAD & META REPLACEMENTS
html = html.replace(
  '<title>Del valle a la mesa, de la mesa a las estrellas | Blog Turístico del Valle del Elqui</title>',
  '<title>Del valle a la mesa, de la mesa a las estrellas | Experiencia Gastronómica & Astroturismo · Valle del Elqui</title>'
);

html = html.replace(
  '<meta name="description" content="Descubre el Valle del Elqui a través de sus sabores, paisajes y cielos. Propuesta gastroturística académica de INACAP en Cochiguaz: cocina solar, astronomía y productos locales.">',
  '<meta name="description" content="Una experiencia gastronómica y sensorial exclusiva que incluye un recorrido por los sabores del Valle del Elqui, degustaciones, banquete de cuatro tiempos, maridaje y observación astronómica guiada en Cochiguaz. Valor: $125.000 por persona.">'
);

html = html.replace(
  '<meta property="og:description" content="Una jornada participativa de verano en Cochiguaz que une gastronomía territorial, taller de cocina solar y astroturismo.">',
  '<meta property="og:description" content="Una experiencia gastronómica y sensorial exclusiva que incluye un recorrido por los sabores del Valle del Elqui, degustaciones, banquete de cuatro tiempos, maridaje y observación astronómica guiada en Cochiguaz.">'
);

// Schema JSON-LD
const oldSchema = `  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": "Del valle a la mesa, de la mesa a las estrellas",
    "description": "Propuesta académica de experiencia gastroturística participativa de jornada completa en Cochiguaz, Valle del Elqui.",
    "touristType": "Gastronómico y Cultural",
    "offers": {
      "@type": "Offer",
      "price": "125000",
      "priceCurrency": "CLP",
      "availability": "https://schema.org/PreOrder",
      "description": "Tarifa referencial de estimación académica a octubre de 2026; disponibilidad no habilitada comercialmente."
    },`;

const newSchema = `  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": "Del valle a la mesa, de la mesa a las estrellas",
    "description": "Una experiencia gastronómica y sensorial exclusiva que incluye un recorrido por los sabores del Valle del Elqui, degustaciones, banquete de cuatro tiempos, maridaje y observación astronómica guiada en Cochiguaz.",
    "touristType": "Experiencia Gastronómica Boutique y Astroturismo",
    "offers": {
      "@type": "Offer",
      "price": "125000",
      "priceCurrency": "CLP",
      "availability": "https://schema.org/InStock",
      "description": "Valor de la experiencia: $125.000 por persona."
    },`;

html = html.replace(oldSchema, newSchema);

// 2. HERO SECTION
const oldHeroPill = `<div class="academic-pill">
          <span>🎓 INACAP · Prototipo Académico de Evaluación 2</span>
        </div>`;

const newHeroPill = `<div class="boutique-pill" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(8px); border: 1px solid rgba(246, 186, 78, 0.5); color: var(--color-amarillo-sol); padding: 6px 18px; border-radius: var(--radius-full); font-size: 13px; font-weight: 700; margin-bottom: 16px; letter-spacing: 0.5px;">
          <span>✨ Experiencia Gastronómica & Astroturismo Exclusiva · Cochiguaz</span>
        </div>`;

html = html.replace(oldHeroPill, newHeroPill);

// Hero subtitle & price
const oldHeroSubtitle = `<p class="hero-subtitle">
          Descubre el Valle del Elqui a través de sus sabores, paisajes y cielos. Una experiencia participativa que une cocina regional, cultura local, naturaleza viva y astronomía.
        </p>`;

const newHeroSubtitle = `<p class="hero-subtitle" style="font-size: 19px; max-width: 820px; line-height: 1.6; margin: 0 auto 18px;">
          Una experiencia gastronómica y sensorial exclusiva que incluye un recorrido por los sabores del Valle del Elqui, degustaciones, banquete de cuatro tiempos, maridaje y observación astronómica guiada.
        </p>
        <div style="display: inline-block; background: rgba(23, 37, 61, 0.75); backdrop-filter: blur(8px); border: 2px solid var(--color-amarillo-sol); border-radius: var(--radius-full); padding: 8px 24px; margin-bottom: 24px; color: var(--color-amarillo-sol); font-size: 18px; font-weight: 800;">
          Valor de la experiencia: $125.000 por persona
        </div>`;

html = html.replace(oldHeroSubtitle, newHeroSubtitle);

// Hero CTA buttons
html = html.replace(
  '<a href="#reservas" class="btn btn-outline">Consultar reserva</a>',
  '<a href="#reservas" class="btn btn-sol" style="color: var(--color-azul-noche); font-weight: 800;">Reservar experiencia</a>'
);

// Hero Cards
const oldHeroCards = `        <!-- Tres tarjetas destacadas de inicio -->
        <div class="hero-cards-grid">
          <article class="hero-card">
            <div class="hero-card-icon" aria-hidden="true">🍈</div>
            <h2 class="hero-card-title">Saborea el territorio</h2>
            <p class="hero-card-text">Papaya aromática, copao silvestre y queso de cabra artesanal elaborados con identidad local.</p>
          </article>
          <article class="hero-card">
            <div class="hero-card-icon" aria-hidden="true">☀️</div>
            <h2 class="hero-card-title">Aprende haciendo</h2>
            <p class="hero-card-text">Taller participativo de cocina solar y demostraciones culinarias guiadas por estudiantes de gastronomía.</p>
          </article>
          <article class="hero-card">
            <div class="hero-card-icon" aria-hidden="true">✨</div>
            <h2 class="hero-card-title">Contempla las estrellas</h2>
            <p class="hero-card-text">Interpretación del firmamento nocturno en los cielos limpios y protegidos de Cochiguaz.</p>
          </article>
        </div>`;

const newHeroCards = `        <!-- Tres tarjetas destacadas de inicio -->
        <div class="hero-cards-grid">
          <article class="hero-card">
            <div class="hero-card-icon" aria-hidden="true">🍈</div>
            <h2 class="hero-card-title">Saborea el territorio</h2>
            <p class="hero-card-text">Papaya aromática, copao silvestre y quesos de cabra elaborados con identidad local por productores del valle.</p>
          </article>
          <article class="hero-card">
            <div class="hero-card-icon" aria-hidden="true">🍽️</div>
            <h2 class="hero-card-title">Banquete de cuatro tiempos</h2>
            <p class="hero-card-text">Cocina de autor territorial, maridaje selecto de vinos de altura y elíxires botánicos campesinos.</p>
          </article>
          <article class="hero-card">
            <div class="hero-card-icon" aria-hidden="true">🔭</div>
            <h2 class="hero-card-title">Bautismo de estrellas</h2>
            <p class="hero-card-text">Interpretación astronómica y observación guiada con telescopio en los cielos protegidos de Cochiguaz.</p>
          </article>
        </div>`;

html = html.replace(oldHeroCards, newHeroCards);

// 3. CANONICAL RIBBON
const oldRibbon = `<section class="canonical-ribbon" aria-label="Ficha rápida de la experiencia">
      <div class="container">
        <div class="ribbon-items">
          <div class="ribbon-item">
            <span class="icon" aria-hidden="true">📅</span>
            <span>Una jornada de verano (diciembre a marzo)</span>
          </div>
          <div class="ribbon-item">
            <span class="icon" aria-hidden="true">⏰</span>
            <span>10:00 a 21:30 (11 h 30 min)</span>
          </div>
          <div class="ribbon-item">
            <span class="icon" aria-hidden="true">👥</span>
            <span>Hasta 15 participantes</span>
          </div>
          <div class="ribbon-item">
            <span class="icon" aria-hidden="true">📍</span>
            <span>Cochiguaz, Río Cochiguaz km 3</span>
          </div>
        </div>
      </div>
    </section>`;

const newRibbon = `<section class="canonical-ribbon" aria-label="Ficha rápida de la experiencia">
      <div class="container">
        <div class="ribbon-items">
          <div class="ribbon-item">
            <span class="icon" aria-hidden="true">📅</span>
            <span>Temporada de verano y cielos despejados</span>
          </div>
          <div class="ribbon-item">
            <span class="icon" aria-hidden="true">⏰</span>
            <span>17:30 a 22:45 (Atardecer y noche)</span>
          </div>
          <div class="ribbon-item">
            <span class="icon" aria-hidden="true">👥</span>
            <span>Grupos reducidos (hasta 15 personas)</span>
          </div>
          <div class="ribbon-item">
            <span class="icon" aria-hidden="true">📍</span>
            <span>Cochiguaz, Río Cochiguaz km 3</span>
          </div>
          <div class="ribbon-item" style="color: var(--color-amarillo-sol); font-weight: 800;">
            <span class="icon" aria-hidden="true">💎</span>
            <span>$125.000 CLP por persona</span>
          </div>
        </div>
      </div>
    </section>`;

html = html.replace(oldRibbon, newRibbon);

// 4. QUIÉNES SOMOS SECTION
const oldQuienes = `<section id="quienes-somos" class="section-padding" style="background-color: var(--color-arena-soft);" aria-labelledby="quienes-title">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Equipo del Proyecto</span>
          <h2 id="quienes-title" class="section-title">Tres estudiantes, una misma pasión: la gastronomía y nuestras raíces</h2>
          <p class="section-intro">
            Somos Antonia Huerta, Caroline Prado y Paz Bozo, estudiantes de Administración Gastronómica en INACAP, unidas por nuestro interés en la cocina, la cultura y las tradiciones de Chile.
          </p>
        </div>

        <div class="about-grid">
          <div class="about-image-card">
            <picture>
              <source srcset="imagenes/equipo_estudiantes.webp" type="image/webp">
              <img src="imagenes/equipo_estudiantes.jpg" alt="Antonia Huerta, Caroline Prado y Paz Bozo, estudiantes de Administración Gastronómica en INACAP" class="about-img" loading="lazy">
            </picture>
            <p class="img-caption">Antonia Huerta, Caroline Prado y Paz Bozo · Estudiantes autoras del proyecto (INACAP)</p>
          </div>
          <div class="about-text">
            <h3>Nuestra mirada formativa</h3>
            <p>
              Nuestro proyecto nace del deseo de dar a conocer la riqueza del Valle del Elqui: sus paisajes, sus historias y los productos que forman parte de su identidad gastronómica.
            </p>
            <p>
              Creemos que la gastronomía es mucho más que preparar alimentos. También permite descubrir lugares, valorar el trabajo de sus productores y acercarnos a las tradiciones de una comunidad. Por eso creamos «Del valle a la mesa, de la mesa a las estrellas», una propuesta que invita a conocer ingredientes del territorio, participar en actividades culinarias y finalizar el día contemplando el cielo.
            </p>
            <div style="margin-top: 25px;">
              <a href="#experiencia" class="btn btn-secondary">Conoce nuestra experiencia →</a>
            </div>
          </div>
        </div>

        <!-- Tarjetas formativas de las estudiantes del equipo -->
        <div class="team-cards-grid">
          <article class="team-card">
            <div class="team-avatar-icon" aria-hidden="true">👩‍🍳</div>
            <h3 class="team-name">Antonia Huerta</h3>
            <p class="team-role">Administración Gastronómica</p>
            <p class="team-detail">Co-diseño de experiencias gastroturísticas y propuesta culinaria territorial.</p>
          </article>
          <article class="team-card">
            <div class="team-avatar-icon" aria-hidden="true">👩‍🍳</div>
            <h3 class="team-name">Caroline Prado</h3>
            <p class="team-role">Administración Gastronómica</p>
            <p class="team-detail">Desarrollo de guion técnico, trazabilidad de insumos y cocina solar.</p>
          </article>
          <article class="team-card">
            <div class="team-avatar-icon" aria-hidden="true">👩‍🍳</div>
            <h3 class="team-name">Paz Bozo</h3>
            <p class="team-role">Administración Gastronómica</p>
            <p class="team-detail">Relato territorial, vinculación comunitaria y montaje de la experiencia.</p>
          </article>
        </div>`;

const newQuienes = `<section id="quienes-somos" class="section-padding" style="background-color: var(--color-arena-soft);" aria-labelledby="quienes-title">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Nuestras Anfitrionas</span>
          <h2 id="quienes-title" class="section-title">Tres apasionadas creadoras: gastronomía territorial y cosmos</h2>
          <p class="section-intro">
            Somos Antonia Huerta, Caroline Prado y Paz Bozo, co-fundadoras y anfitrionas gastronómicas de «Del valle a la mesa, de la mesa a las estrellas», unidas por nuestra devoción hacia la cocina, la cultura territorial y las tradiciones del Valle del Elqui.
          </p>
        </div>

        <div class="about-grid">
          <div class="about-image-card">
            <picture>
              <source srcset="imagenes/equipo_estudiantes.webp" type="image/webp">
              <img src="imagenes/equipo_estudiantes.jpg" alt="Antonia Huerta, Caroline Prado y Paz Bozo · Co-fundadoras y anfitrionas gastronómicas" class="about-img" loading="lazy">
            </picture>
            <p class="img-caption">Antonia Huerta, Caroline Prado y Paz Bozo · Co-fundadoras y anfitrionas de la experiencia</p>
          </div>
          <div class="about-text">
            <h3>Nuestra propuesta territorial</h3>
            <p>
              Nuestro emprendimiento nace del profundo deseo de compartir la riqueza del Valle del Elqui: sus paisajes sobrecogedores, sus memorias ancestrales y los productos nobles que otorgan identidad a nuestra mesa.
            </p>
            <p>
              Creemos que la gastronomía es un puente sagrado entre el comensal y la tierra. Permite descubrir rincones únicos, enaltecer el oficio de campesinos, crianceros y artesanos, y conectarnos con el legado de nuestras comunidades. Por eso concebimos «Del valle a la mesa, de la mesa a las estrellas», una experiencia íntima que invita a degustar los frutos del territorio al atardecer, disfrutar de un banquete de cuatro tiempos y culminar bajo el manto estrellado de Cochiguaz.
            </p>
            <div style="margin-top: 25px;">
              <a href="#experiencia" class="btn btn-secondary">Conoce el itinerario de la experiencia →</a>
            </div>
          </div>
        </div>

        <!-- Tarjetas de las creadoras del equipo -->
        <div class="team-cards-grid">
          <article class="team-card">
            <div class="team-avatar-icon" aria-hidden="true">👩‍🍳</div>
            <h3 class="team-name">Antonia Huerta</h3>
            <p class="team-role">Co-fundadora & Chef de Experiencia</p>
            <p class="team-detail">Diseño de propuesta culinaria territorial, rescate de sabores y maridaje elquino.</p>
          </article>
          <article class="team-card">
            <div class="team-avatar-icon" aria-hidden="true">👩‍🍳</div>
            <h3 class="team-name">Caroline Prado</h3>
            <p class="team-role">Co-fundadora & Dirección Gastronómica</p>
            <p class="team-detail">Selección y trazabilidad de insumos agroecológicos, taller sensorial y banquete campestre.</p>
          </article>
          <article class="team-card">
            <div class="team-avatar-icon" aria-hidden="true">👩‍🍳</div>
            <h3 class="team-name">Paz Bozo</h3>
            <p class="team-role">Co-fundadora & Hospitalidad y Astroturismo</p>
            <p class="team-detail">Curaduría del relato territorial, experiencia sensorial crepuscular y vínculo astronómico.</p>
          </article>
        </div>`;

html = html.replace(oldQuienes, newQuienes);

// 5. ITINERARIO & EXPERIENCIA SECTION (4 ETAPAS PRINCIPALES + PRECIO $125.000)
const oldExpSectionStart = `<section id="experiencia" class="section-padding" aria-labelledby="exp-title">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Itinerario de la Jornada</span>
          <h2 id="exp-title" class="section-title">Un día para descubrir el valle con todos tus sentidos</h2>
          <p class="section-intro">
            Desde el primer encuentro con los productos regionales hasta la contemplación del cielo nocturno, cada momento busca conectar los sabores con la historia y la naturaleza del Valle del Elqui.
          </p>
        </div>`;

const newExpSectionStart = `<section id="experiencia" class="section-padding" aria-labelledby="exp-title">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Itinerario Exclusivo</span>
          <h2 id="exp-title" class="section-title">Cuatro etapas para conectar los sabores del valle con el firmamento</h2>
          <p class="section-intro">
            Desde el primer brindis al atardecer hasta la contemplación del cosmos, cada momento ha sido cuidadosamente concebido para deleitar tus sentidos en un entorno natural privilegiado en Cochiguaz.
          </p>
        </div>

        <!-- BANNER DE PRECIO DESTACADO DE LA EXPERIENCIA -->
        <div class="experience-price-banner">
          <div class="price-banner-text">
            <h3>Valor de la experiencia: $125.000 por persona</h3>
            <p>
              Una experiencia gastronómica y sensorial exclusiva que incluye un recorrido por los sabores del Valle del Elqui, degustaciones, banquete de cuatro tiempos, maridaje y observación astronómica guiada.
            </p>
          </div>
          <div class="price-banner-action">
            <a href="#reservas" class="btn btn-sol" style="color: var(--color-azul-noche); font-weight: 800; font-size: 16px; padding: 14px 28px;">
              Reservar tu cupo →
            </a>
          </div>
        </div>

        <!-- LAS CUATRO ETAPAS PRINCIPALES DE LA EXPERIENCIA -->
        <h3 style="font-size: 24px; color: var(--color-verde-cactus); margin-bottom: 25px; font-weight: 800;">
          Las cuatro etapas de la experiencia
        </h3>
        <div class="itinerary-stages-grid">
          <!-- Etapa 1 -->
          <article class="stage-card">
            <div class="stage-media">
              <img src="imagenes/foto_16.jpg" alt="Vista panorámica de Cochiguaz y los cerros cordilleranos al atardecer" class="stage-img" loading="lazy">
            </div>
            <div class="stage-content">
              <div class="stage-badge-row">
                <span class="stage-number">Etapa 1</span>
                <span class="stage-time-badge">17:30 – 18:30</span>
              </div>
              <h4 class="stage-title">Recepción y brindis al atardecer</h4>
              <p class="stage-desc">
                Bienvenida panorámica en el corazón de Cochiguaz mientras los cerros se tiñen de tonos ocres y dorados. Brindis con cóctel de autor elaborado con destilado artesanal de uva pisquera infusionado con hierbas aromáticas locales o elixir botánico refrescante sin alcohol, acompañado de panes rústicos campesinos al rescoldo y degustación de aceites aromatizados.
              </p>
              <div class="stage-includes-box">
                <strong>Incluye:</strong> Cóctel de bienvenida de autor (con o sin alcohol), bocados campesinos tibios de cortesía, ambientación musical acústica y presentación del territorio elquino.
              </div>
            </div>
          </article>

          <!-- Etapa 2 -->
          <article class="stage-card">
            <div class="stage-media">
              <img src="imagenes/foto_21.jpg" alt="Papayas frescas amarillas y frutos representativos del Valle del Elqui" class="stage-img" loading="lazy">
            </div>
            <div class="stage-content">
              <div class="stage-badge-row">
                <span class="stage-number">Etapa 2</span>
                <span class="stage-time-badge">18:30 – 19:45</span>
              </div>
              <h4 class="stage-title">Taller sensorial de frutos del valle</h4>
              <p class="stage-desc">
                Un recorrido interactivo guiado por nuestras anfitrionas para tocar, oler y saborear la despensa viva del Elqui. Cata comparativa de papaya elquina fresca en texturas, copao silvestre recolectado de cactáceas cordilleranas y hierbas aromáticas de altura (rica-rica, chañar y menta elquina).
              </p>
              <div class="stage-includes-box">
                <strong>Incluye:</strong> Mesa de cata con frutos frescos y macerados, elaboración interactiva de aderezos botánicos, guía de notas sensoriales y relato del origen de los ingredientes.
              </div>
            </div>
          </article>

          <!-- Etapa 3 -->
          <article class="stage-card">
            <div class="stage-media">
              <img src="imagenes/foto_18.jpg" alt="Banquete campestre con quesos de cabra artesanales e ingredientes del valle" class="stage-img" loading="lazy">
            </div>
            <div class="stage-content">
              <div class="stage-badge-row">
                <span class="stage-number">Etapa 3</span>
                <span class="stage-time-badge">19:45 – 21:15</span>
              </div>
              <h4 class="stage-title">Banquete campestre de cuatro tiempos</h4>
              <p class="stage-desc">
                Cena exclusiva de autor servida al aire libre en mesa vestida con elementos naturales del valle. Cada tiempo rinde homenaje a un pilar del territorio: las huertas agroecológicas, los crianceros de cabra cordilleranos, la cocción pausada tradicional y la dulzura de nuestras frutas patrimoniales.
              </p>
              <div class="stage-includes-box">
                <strong>Incluye:</strong> Menú completo de 4 tiempos (Entrada: degustación de quesos de cabra curados con chutney de papaya; Plato principal: cocción criolla a baja temperatura con vegetales de estación; Postre: texturas heladas de copao y frutos secos confitados; Maridaje: selección de vinos de altura del Valle del Elqui o mocktails artesanales).
              </div>
            </div>
          </article>

          <!-- Etapa 4 -->
          <article class="stage-card">
            <div class="stage-media">
              <img src="imagenes/foto_05.jpg" alt="Cielo nocturno estrellado y Vía Láctea en Cochiguaz" class="stage-img" loading="lazy">
            </div>
            <div class="stage-content">
              <div class="stage-badge-row">
                <span class="stage-number">Etapa 4</span>
                <span class="stage-time-badge">21:15 – 22:45</span>
              </div>
              <h4 class="stage-title">Bautismo de estrellas y astroturismo</h4>
              <p class="stage-desc">
                Apagado de luces para dar inicio a una sesión de astronomía guiada bajo uno de los cielos más puros y transparentes del mundo. Con puntero láser verde identificaremos constelaciones andinas, la Vía Láctea y planetas visibles, complementado con observación detallada en telescopio astronómico.
              </p>
              <div class="stage-includes-box">
                <strong>Incluye:</strong> Telescopio de alta precisión, puntero láser verde astronómico, guía divulgador astronómico, mantas térmicas confortables, infusión caliente de hierbas digestivas del valle y entrega del pasaporte conmemorativo.
              </div>
            </div>
          </article>
        </div>`;

html = html.replace(oldExpSectionStart, newExpSectionStart);

// Transform the 13 technical stations table into a collapsible accordion
const oldTechnicalTable = `<div class="technical-table-wrapper">
          <div class="technical-table-header">
            <h3 class="technical-table-title">
              📋 Guion Técnico Oficial de la Jornada (13 Estaciones · 690 minutos = 11 h 30 min)
            </h3>
            <p class="technical-notice">
              <strong>Aviso de rigor metodológico:</strong> Las 8 tarjetas anteriores son un resumen didáctico. La tabla que se presenta a continuación contiene los horarios y minutajes exactos del informe oficial de evaluación. El acceso a pozones, tinajas, masajes y servicios de bienestar no está confirmado y se encuentra estrictamente sujeto a convenios y habilitación del recinto.
            </p>
          </div>`;

const newTechnicalTable = `<div class="technical-table-wrapper" style="margin-top: 35px;">
          <details style="background: var(--color-blanco); border-radius: var(--radius-md); padding: 18px 24px; border: 1px solid var(--color-borde); cursor: pointer;">
            <summary style="font-weight: 800; font-size: 17px; color: var(--color-verde-cactus);">
              📋 Ver desglose técnico detallado de las 13 estaciones del guion
            </summary>
            <div style="margin-top: 20px;">
              <p class="technical-notice" style="margin-bottom: 20px;">
                <strong>Detalle técnico de la ruta:</strong> Presentación minuto a minuto de cada estación interpretativa, dinámicas sensoriales y medidas de resguardo y contingencia en Cochiguaz.
              </p>`;

html = html.replace(oldTechnicalTable, newTechnicalTable);

// Close the details element where the table wrapper ends
const oldTechnicalEnd = `          <div style="margin-top: 25px; text-align: center;">
            <a href="#reservas" class="btn btn-primary">Consulta cómo participar en esta propuesta →</a>
          </div>
        </div>`;

const newTechnicalEnd = `            </div>
          </details>
          <div style="margin-top: 25px; text-align: center;">
            <a href="#reservas" class="btn btn-primary">Reservar tu experiencia ($125.000 por persona) →</a>
          </div>
        </div>`;

html = html.replace(oldTechnicalEnd, newTechnicalEnd);

// Also remove the "8 Tarjetas de resumen didáctico según la Guía Maestra" block if present, since we now have the 4 stages
// Let's replace the 8 summary cards with a clean separator if desired, or keep them as moments
html = html.replace('Resumen visual de los 8 momentos principales', 'Momentos destacados del territorio');

// 6. BLOG SECTION: Remove "Evaluación INACAP 2026"
html = html.replace(
  '<strong>Fuente verificada:</strong> Investigación botánica y gastronómica regional, Evaluación INACAP 2026.<br>',
  '<strong>Fuente verificada:</strong> Investigación botánica y gastronómica regional del Valle del Elqui.<br>'
);

// 7. SECCIÓN FAUNA COMPLETA (REVISTA DE NATURALEZA Y TURISMO CON LAS 8 ESPECIES REALES)
const oldFaunaSection = `    <!-- SECCIÓN 5: FAUNA DEL VALLE (ILUSTRACIONES SVG PROPIAS Y OBSERVACIÓN RESPONSABLE) -->
    <section id="fauna" class="section-padding" aria-labelledby="fauna-title">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Biodiversidad Nativa</span>
          <h2 id="fauna-title" class="section-title">Fichas educativas de fauna y observación responsable</h2>
          <p class="section-intro">
            Aprender a coexistir con la fauna nativa protege los ciclos ecológicos del Valle del Elqui. Estas especies forman parte del patrimonio natural; no se garantiza su avistamiento durante el recorrido.
          </p>
        </div>

        <div class="fauna-grid">
          <!-- Zorro Culpeo -->
          <article class="fauna-card">
            <div class="fauna-media">
              <img src="imagenes/zorro-culpeo.svg" alt="Ilustración referencial de un zorro culpeo en el entorno andino" width="400" height="300">
            </div>
            <div class="fauna-body">
              <h3 class="fauna-name">Zorro culpeo (Lycalopex culpaeus)</h3>
              <p class="fauna-desc">
                Cánido nativo de pelaje rojizo y cola espesa de punta negra. Habita laderas pedregosas y matorrales. Cumple un rol fundamental como dispersor de semillas de frutos nativos y controlador biológico de roedores.
              </p>
              <div class="fauna-rules">
                <strong>Norma responsable:</strong> No intentar acercarse ni alimentar bajo ninguna circunstancia. La entrega de comida humana altera su conducta silvestre.
              </div>
              <p class="fauna-status">Ilustración referencial propia · Presencia en el ecosistema</p>
            </div>
          </article>

          <!-- Cóndor Andino -->
          <article class="fauna-card">
            <div class="fauna-media">
              <img src="imagenes/condor-andino.svg" alt="Ilustración referencial de un cóndor andino planeando sobre las cumbres" width="400" height="300">
            </div>
            <div class="fauna-body">
              <h3 class="fauna-name">Cóndor andino (Vultur gryphus)</h3>
              <p class="fauna-desc">
                Una de las aves voladoras más grandes del planeta. Aprovecha las corrientes térmicas ascendentes que se generan en las laderas cordilleranas del Elqui para sobrevolar grandes extensiones sin batir sus alas.
              </p>
              <div class="fauna-rules">
                <strong>Norma responsable:</strong> Observar en silencio con binoculares. No usar drones ni generar ruidos molestos en zonas de riscos altos.
              </div>
              <p class="fauna-status">Ilustración referencial propia · Especie protegida</p>
            </div>
          </article>

          <!-- Lagartija Nativa -->
          <article class="fauna-card">
            <div class="fauna-media">
              <img src="imagenes/lagartija-nativo.svg" alt="Ilustración referencial de una lagartija nativa tomando sol sobre una roca" width="400" height="300">
            </div>
            <div class="fauna-body">
              <h3 class="fauna-name">Lagartijas nativas (Liolaemus spp.)</h3>
              <p class="fauna-desc">
                Pequeños reptiles extraordinariamente adaptados a la radiación solar y la aridez. Se alimentan de insectos y buscan refugio en grietas de pircas y rocas calientes durante el día para regular su temperatura.
              </p>
              <div class="fauna-rules">
                <strong>Norma responsable:</strong> Caminar solo por senderos delimitados. No mover piedras ni pircas, ya que constituyen su refugio vital frente al frío nocturno.
              </div>
              <p class="fauna-status">Ilustración referencial propia · Fauna endémica observable</p>
            </div>
          </article>
        </div>

        <div style="background-color: var(--color-arena-soft); border-left: 4px solid var(--color-verde-cactus); padding: 20px; border-radius: 0 var(--radius-md) var(--radius-md) 0; margin-top: 20px;">
          <h4 style="color: var(--color-verde-cactus); font-size: 18px; margin-bottom: 8px;">Compromiso de Turismo Responsable</h4>
          <p style="font-size: 15px; color: var(--color-azul-noche); line-height: 1.6;">
            «El paisaje del valle no es solo un escenario turístico, sino un ecosistema compartido. Al visitarlo nos comprometemos a no dejar rastro, retornar con todos nuestros residuos y respetar el silencio de las quebradas».
          </p>
        </div>
      </div>
    </section>`;

const newFaunaSection = `    <!-- SECCIÓN 5: FAUNA DEL VALLE (REVISTA DE NATURALEZA Y TURISMO - FOTOGRAFÍAS REALES) -->
    <section id="fauna" class="section-padding" aria-labelledby="fauna-title">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Biodiversidad & Naturaleza</span>
          <h2 id="fauna-title" class="section-title">La vida silvestre del Valle del Elqui</h2>
          <p class="section-intro" style="font-size: 18px; max-width: 820px; line-height: 1.6;">
            Entre montañas, quebradas y cielos despejados, el Valle del Elqui alberga una diversidad de fauna que forma parte de su riqueza natural. Descubre algunas de las especies que habitan los paisajes de este territorio.
          </p>
        </div>

        <!-- AVISO DE CONSERVACIÓN Y DISTRIBUCIÓN ÉTICA -->
        <div style="background-color: #FAF6EF; border: 1px solid #E2D7C5; border-left: 4px solid var(--color-verde-cactus); padding: 18px 22px; border-radius: var(--radius-md); margin-bottom: 35px; font-size: 14.5px; color: #4A5568; line-height: 1.6;">
          <strong style="color: var(--color-verde-cactus);">Fauna representativa regional:</strong> Las especies exhibidas forman parte de la biodiversidad característica del Valle del Elqui y sus estribaciones andinas. No se afirma que todas estas especies se encuentren dentro del recinto de la experiencia ni que necesariamente se observarán durante la jornada. Promovemos su valoración patrimonial, la preservación de sus ecosistemas y la observación responsable sin alterar su hábitat.
        </div>

        <!-- CATEGORÍA 1: MAMÍFEROS -->
        <h3 class="fauna-category-title">
          <span>🐾 Mamíferos del territorio andino</span>
        </h3>
        <div class="fauna-magazine-grid">
          <!-- 1. Zorro culpeo -->
          <article class="fauna-magazine-card">
            <div class="fauna-photo-wrapper">
              <span class="fauna-badge-pill">Mamífero</span>
              <picture>
                <source srcset="imagenes/fauna/zorro-culpeo.webp" type="image/webp">
                <img src="imagenes/fauna/zorro-culpeo.jpg" alt="Fotografía real de un Zorro culpeo (Lycalopex culpaeus)" class="fauna-photo-img" loading="lazy" width="800" height="533">
              </picture>
            </div>
            <div class="fauna-card-content">
              <h4 class="fauna-common-name">Zorro culpeo</h4>
              <p class="fauna-scientific-name">Lycalopex culpaeus</p>
              <p class="fauna-description-text">
                Uno de los zorros más representativos de los ambientes cordilleranos de Chile. Se caracteriza por su tamaño, pelaje rojizo y comportamiento adaptable.
              </p>
              <div class="fauna-photo-attribution">
                Fotografía real · MasterCold9 (Wikimedia Commons, CC BY-SA 4.0)
              </div>
            </div>
          </article>

          <!-- 2. Vizcacha -->
          <article class="fauna-magazine-card">
            <div class="fauna-photo-wrapper">
              <span class="fauna-badge-pill">Mamífero</span>
              <picture>
                <source srcset="imagenes/fauna/vizcacha.webp" type="image/webp">
                <img src="imagenes/fauna/vizcacha.jpg" alt="Fotografía real de una Vizcacha (Lagidium viscacia)" class="fauna-photo-img" loading="lazy" width="800" height="533">
              </picture>
            </div>
            <div class="fauna-card-content">
              <h4 class="fauna-common-name">Vizcacha</h4>
              <p class="fauna-scientific-name">Lagidium viscacia</p>
              <p class="fauna-description-text">
                Roedor de ambientes rocosos y cordilleranos. Destaca por sus grandes orejas, cola larga y habilidad para desplazarse entre las rocas.
              </p>
              <div class="fauna-photo-attribution">
                Fotografía real · Diego Delso (Wikimedia Commons, CC BY-SA 4.0)
              </div>
            </div>
          </article>

          <!-- 3. Guanaco -->
          <article class="fauna-magazine-card">
            <div class="fauna-photo-wrapper">
              <span class="fauna-badge-pill">Mamífero</span>
              <picture>
                <source srcset="imagenes/fauna/guanaco.webp" type="image/webp">
                <img src="imagenes/fauna/guanaco.jpg" alt="Fotografía real de un Guanaco (Lama guanicoe)" class="fauna-photo-img" loading="lazy" width="800" height="533">
              </picture>
            </div>
            <div class="fauna-card-content">
              <h4 class="fauna-common-name">Guanaco</h4>
              <p class="fauna-scientific-name">Lama guanicoe</p>
              <p class="fauna-description-text">
                Camélido silvestre sudamericano que habita ambientes abiertos y cordilleranos. Es una especie emblemática de los paisajes andinos.
              </p>
              <div class="fauna-photo-attribution">
                Fotografía real · Charles J. Sharp (Wikimedia Commons, CC BY-SA 4.0)
              </div>
            </div>
          </article>

          <!-- 4. Puma -->
          <article class="fauna-magazine-card">
            <div class="fauna-photo-wrapper">
              <span class="fauna-badge-pill">Mamífero</span>
              <picture>
                <source srcset="imagenes/fauna/puma.webp" type="image/webp">
                <img src="imagenes/fauna/puma.jpg" alt="Fotografía real de un Puma (Puma concolor)" class="fauna-photo-img" loading="lazy" width="800" height="533">
              </picture>
            </div>
            <div class="fauna-card-content">
              <h4 class="fauna-common-name">Puma</h4>
              <p class="fauna-scientific-name">Puma concolor</p>
              <p class="fauna-description-text">
                Gran felino nativo de América. Es un depredador importante para el equilibrio de los ecosistemas naturales.
              </p>
              <div class="fauna-photo-attribution">
                Fotografía real · Charles J. Sharp (Wikimedia Commons, CC BY-SA 4.0)
              </div>
            </div>
          </article>
        </div>

        <!-- CATEGORÍA 2: AVES -->
        <h3 class="fauna-category-title">
          <span>🦅 Aves de los cielos y quebradas</span>
        </h3>
        <div class="fauna-magazine-grid">
          <!-- 5. Cóndor andino -->
          <article class="fauna-magazine-card">
            <div class="fauna-photo-wrapper">
              <span class="fauna-badge-pill" style="color: var(--color-terracota);">Ave</span>
              <picture>
                <source srcset="imagenes/fauna/condor-andino.webp" type="image/webp">
                <img src="imagenes/fauna/condor-andino.jpg" alt="Fotografía real de un Cóndor andino (Vultur gryphus)" class="fauna-photo-img" loading="lazy" width="800" height="533">
              </picture>
            </div>
            <div class="fauna-card-content">
              <h4 class="fauna-common-name">Cóndor andino</h4>
              <p class="fauna-scientific-name">Vultur gryphus</p>
              <p class="fauna-description-text">
                Una de las aves voladoras más grandes del mundo. Habita zonas cordilleranas y se reconoce por su gran envergadura.
              </p>
              <div class="fauna-photo-attribution">
                Fotografía real · Charles J. Sharp (Wikimedia Commons, CC BY-SA 4.0)
              </div>
            </div>
          </article>

          <!-- 6. Águila mora -->
          <article class="fauna-magazine-card">
            <div class="fauna-photo-wrapper">
              <span class="fauna-badge-pill" style="color: var(--color-terracota);">Ave</span>
              <picture>
                <source srcset="imagenes/fauna/aguila-mora.webp" type="image/webp">
                <img src="imagenes/fauna/aguila-mora.jpg" alt="Fotografía real de un Águila mora (Geranoaetus melanoleucus)" class="fauna-photo-img" loading="lazy" width="800" height="533">
              </picture>
            </div>
            <div class="fauna-card-content">
              <h4 class="fauna-common-name">Águila mora</h4>
              <p class="fauna-scientific-name">Geranoaetus melanoleucus</p>
              <p class="fauna-description-text">
                Ave rapaz que habita diferentes ambientes de Chile. Destaca por su vuelo planeado y su capacidad de caza.
              </p>
              <div class="fauna-photo-attribution">
                Fotografía real · Charles J. Sharp (Wikimedia Commons, CC BY-SA 4.0)
              </div>
            </div>
          </article>

          <!-- 7. Loro tricahue -->
          <article class="fauna-magazine-card">
            <div class="fauna-photo-wrapper">
              <span class="fauna-badge-pill" style="color: var(--color-terracota);">Ave</span>
              <picture>
                <source srcset="imagenes/fauna/loro-tricahue.webp" type="image/webp">
                <img src="imagenes/fauna/loro-tricahue.jpg" alt="Fotografía real de un Loro tricahue (Cyanoliseus patagonus)" class="fauna-photo-img" loading="lazy" width="800" height="533">
              </picture>
            </div>
            <div class="fauna-card-content">
              <h4 class="fauna-common-name">Loro tricahue</h4>
              <p class="fauna-scientific-name">Cyanoliseus patagonus</p>
              <p class="fauna-description-text">
                Loro nativo de Chile que se caracteriza por su plumaje colorido y comportamiento gregario. Tiene poblaciones importantes en la Región de Coquimbo.
              </p>
              <div class="fauna-photo-attribution">
                Fotografía real · Lip Kee Yap (Limarí, Chile · CC BY 2.0)
              </div>
            </div>
          </article>

          <!-- 8. Picaflor cordillerano -->
          <article class="fauna-magazine-card">
            <div class="fauna-photo-wrapper">
              <span class="fauna-badge-pill" style="color: var(--color-terracota);">Ave</span>
              <picture>
                <source srcset="imagenes/fauna/picaflor-cordillerano.webp" type="image/webp">
                <img src="imagenes/fauna/picaflor-cordillerano.jpg" alt="Fotografía real de un Picaflor cordillerano (Oreotrochilus leucopleurus)" class="fauna-photo-img" loading="lazy" width="800" height="533">
              </picture>
            </div>
            <div class="fauna-card-content">
              <h4 class="fauna-common-name">Picaflor cordillerano</h4>
              <p class="fauna-scientific-name">Oreotrochilus leucopleurus</p>
              <p class="fauna-description-text">
                Pequeña ave adaptada a ambientes de altura. Destaca por su capacidad de vuelo y por alimentarse del néctar de las flores.
              </p>
              <div class="fauna-photo-attribution">
                Fotografía real · dfaulders (Wikimedia Commons, CC BY 2.0)
              </div>
            </div>
          </article>
        </div>

        <div style="background-color: var(--color-arena-soft); border-left: 4px solid var(--color-verde-cactus); padding: 20px; border-radius: 0 var(--radius-md) var(--radius-md) 0; margin-top: 20px;">
          <h4 style="color: var(--color-verde-cactus); font-size: 18px; margin-bottom: 8px;">Compromiso de Turismo Responsable</h4>
          <p style="font-size: 15px; color: var(--color-azul-noche); line-height: 1.6;">
            «El paisaje del valle no es solo un escenario turístico, sino un ecosistema compartido. Al visitarlo nos comprometemos a no dejar rastro, retornar con todos nuestros residuos y respetar el silencio de las quebradas».
          </p>
        </div>
      </div>
    </section>`;

html = html.replace(oldFaunaSection, newFaunaSection);

// 8. SECTION RESERVAS: DYNAMIC CALCULATION, NUMERIC GUESTS, AND COMMERCIAL COPY
const oldReservasContent = `<div class="form-group">
                  <label for="inq-date" class="form-label">Fecha deseada:</label>
                  <input type="date" id="inq-date" class="form-input">
                </div>
                <div class="form-group">
                  <label for="inq-guests" class="form-label">Cantidad de personas:</label>
                  <select id="inq-guests" class="form-select">
                    <option value="1">1 persona</option>
                    <option value="2" selected>2 personas</option>
                    <option value="3-5">3 a 5 personas</option>
                    <option value="6+">Grupo pequeño (hasta 15)</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="inq-dietary" class="form-label">Requerimientos alimentarios (opcional):</label>
                <input type="text" id="inq-dietary" class="form-input" placeholder="Vegetariano, intolerancia a lactosa, celiaquía...">
              </div>

              <div class="form-group">
                <label for="inq-message" class="form-label">Mensaje o consulta:</label>
                <textarea id="inq-message" class="form-textarea" rows="2" placeholder="Cuéntanos tus dudas sobre el itinerario o logística..."></textarea>
              </div>

              <div class="form-group">
                <label class="form-checkbox-label" for="inq-consent">
                  <input type="checkbox" id="inq-consent" name="consent" required>
                  <span>Entiendo que este es un proyecto académico de INACAP y que el envío de este formulario es una consulta de interés demostrativa, no una reserva.</span>
                </label>
              </div>

              <button type="submit" class="btn btn-secondary" style="width: 100%;">
                Enviar consulta
              </button>`;

const newReservasContent = `<div class="form-group">
                  <label for="inq-date" class="form-label">Fecha de la experiencia <span style="color: #C5221F;">*</span>:</label>
                  <input type="date" id="inq-date" class="form-input" required>
                </div>
                <div class="form-group">
                  <label for="inq-guests" class="form-label">Cantidad de personas <span style="color: #C5221F;">*</span>:</label>
                  <select id="inq-guests" class="form-select" required>
                    <option value="1">1 persona ($125.000)</option>
                    <option value="2" selected>2 personas ($250.000)</option>
                    <option value="3">3 personas ($375.000)</option>
                    <option value="4">4 personas ($500.000)</option>
                    <option value="5">5 personas ($625.000)</option>
                    <option value="6">6 personas ($750.000)</option>
                    <option value="7">7 personas ($875.000)</option>
                    <option value="8">8 personas ($1.000.000)</option>
                    <option value="9">9 personas ($1.125.000)</option>
                    <option value="10">10 personas ($1.250.000)</option>
                    <option value="12">12 personas ($1.500.000)</option>
                    <option value="15">Grupo exclusivo 15 personas ($1.875.000)</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="inq-dietary" class="form-label">Requerimientos alimentarios o preferencias (opcional):</label>
                <input type="text" id="inq-dietary" class="form-input" placeholder="Menú vegetariano, vegano, sin gluten (celiaquía), sin lactosa...">
              </div>

              <div class="form-group">
                <label for="inq-message" class="form-label">Comentarios o solicitudes especiales:</label>
                <textarea id="inq-message" class="form-textarea" rows="2" placeholder="Celebración especial, traslados o detalles que debamos considerar..."></textarea>
              </div>

              <!-- RESUMEN DINÁMICO DE COMPRA -->
              <div id="booking-price-summary" class="booking-calc-box">
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 14px; color: var(--color-texto-muted);">
                  <span>Valor por persona:</span>
                  <strong>$125.000 CLP</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; color: var(--color-texto-muted);">
                  <span>Cantidad de personas:</span>
                  <strong>2 viajeros</strong>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed rgba(65, 107, 82, 0.3); padding-top: 8px; font-size: 17px; font-weight: 800; color: var(--color-verde-cactus);">
                  <span>Total estimado de la experiencia:</span>
                  <span style="font-size: 20px; color: var(--color-terracota);">$250.000 CLP</span>
                </div>
              </div>

              <div class="form-group">
                <label class="form-checkbox-label" for="inq-consent">
                  <input type="checkbox" id="inq-consent" name="consent" required>
                  <span>He leído los detalles de la experiencia y solicito la reserva para la fecha seleccionada. Entiendo que los cupos son exclusivos y limitados por jornada.</span>
                </label>
              </div>

              <button type="submit" id="btn-submit-inquiry" class="btn btn-secondary" style="width: 100%; font-size: 16px; font-weight: 800; padding: 14px 20px;">
                Solicitar reserva · $250.000 CLP
              </button>`;

html = html.replace(oldReservasContent, newReservasContent);

// In Reservations text header:
html = html.replace(
  'Consulta de interés sobre la experiencia',
  'Reserva tu experiencia gastronómica y astroturismo'
);
html = html.replace(
  '¿Te gustaría ser parte de esta propuesta?',
  'Asegura tu lugar en una jornada inolvidable en Cochiguaz'
);
html = html.replace(
  'Puedes registrar tu correo y preferencias en nuestro formulario de consulta demostrativo.',
  'Una experiencia gastronómica y sensorial exclusiva que incluye un recorrido por los sabores del Valle del Elqui, degustaciones, banquete de cuatro tiempos, maridaje y observación astronómica guiada. Valor: $125.000 por persona.'
);

// 9. FOOTER CLEANUP
const oldFooterCol = `        <div class="footer-col">
          <h4>Equipo Académico</h4>
          <p><strong>Estudiantes:</strong> Antonia Huerta · Caroline Prado · Paz Bozo</p>
          <p><strong>Carrera:</strong> Administración Gastronómica</p>
          <p><strong>Institución:</strong> INACAP</p>
          <p><strong>Profesor guía:</strong> Rubén Tapia</p>
          <p><strong>Fecha de entrega:</strong> Octubre de 2026</p>
        </div>`;

const newFooterCol = `        <div class="footer-col">
          <h4>Anfitrionas</h4>
          <p><strong>Fundadoras:</strong> Antonia Huerta · Caroline Prado · Paz Bozo</p>
          <p><strong>Especialidad:</strong> Gastronomía Territorial & Astroturismo</p>
          <p><strong>Ubicación:</strong> Cochiguaz, Valle del Elqui, Chile</p>
          <p><strong>Experiencia:</strong> $125.000 CLP por persona</p>
        </div>`;

html = html.replace(oldFooterCol, newFooterCol);

html = html.replace(
  `<div class="footer-academic-alert">
            Proyecto académico. Disponibilidad no habilitada.
          </div>`,
  `<div class="footer-boutique-badge" style="display: inline-block; background: rgba(246, 186, 78, 0.15); border: 1px solid var(--color-amarillo-sol); color: var(--color-amarillo-sol); padding: 6px 14px; border-radius: var(--radius-sm); font-size: 12px; font-weight: 700; margin-top: 10px;">
            🌟 Experiencia Boutique en Cochiguaz · Cupos Limitados
          </div>`
);

html = html.replace(
  '<p>© 2026 Del valle a la mesa, de la mesa a las estrellas · Evaluación 2 INACAP.</p>',
  '<p>© 2026 Del valle a la mesa, de la mesa a las estrellas. Todos los derechos reservados.</p>'
);

html = html.replace(
  'Créditos de imagen: Archivo entregado por el equipo; autor y licencia por confirmar. No atribuye autoría no acreditada.',
  'Del valle a la mesa, de la mesa a las estrellas · Experiencia Gastronómica & Astroturismo en Cochiguaz, Valle del Elqui.'
);

// Write updated index.html
fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully updated index.html! New length:', html.length);
