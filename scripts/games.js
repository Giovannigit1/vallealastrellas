/**
 * JUEGOS Y GAMIFICACIÓN DIDÁCTICA
 * 1. Trivia de 8 preguntas exactas (Logro 6/8)
 * 2. Misión: del valle a las estrellas (3 rondas por clic/teclado)
 * 3. Pasaporte Gastronómico del Elqui (6 hitos oficiales, logro 4/6)
 * 4. Desbloqueo automático del Recetario Digital PDF
 */

(function () {
  'use strict';

  // DATOS CANÓNICOS DE LA TRIVIA (Guía Maestra Sección 9)
  const TRIVIA_DATA = [
    {
      q: '1. ¿Qué fruto regional aparece en nuestra propuesta?',
      options: ['A) Papaya', 'B) Piña', 'C) Coco'],
      correct: 0,
      explanation: '¡Correcto! La papaya forma parte de las degustaciones y preparaciones propuestas.'
    },
    {
      q: '2. ¿Qué otro fruto se asocia a una cactácea?',
      options: ['A) Copao', 'B) Manzana', 'C) Pera'],
      correct: 0,
      explanation: '¡Correcto! El copao se vincula con el paisaje semiárido de la región.'
    },
    {
      q: '3. ¿Qué producto se relaciona con oficios caprinos?',
      options: ['A) Queso de cabra', 'B) Chocolate', 'C) Arroz'],
      correct: 0,
      explanation: '¡Correcto! El queso de cabra permite hablar de producción y oficios rurales.'
    },
    {
      q: '4. ¿Qué energía aprovecha la cocina solar?',
      options: ['A) La luz del sol', 'B) El viento', 'C) La marea'],
      correct: 0,
      explanation: '¡Correcto! La actividad muestra el uso del calor solar en la cocina.'
    },
    {
      q: '5. ¿Qué cultivo se vincula a la tradición pisquera?',
      options: ['A) La uva', 'B) El café', 'C) El cacao'],
      correct: 0,
      explanation: '¡Correcto! La vid es parte del patrimonio productivo regional.'
    },
    {
      q: '6. ¿Cómo debe observarse la fauna?',
      options: ['A) Sin alimentarla ni acercarse', 'B) Persiguiéndola', 'C) Dándole comida'],
      correct: 0,
      explanation: '¡Correcto! La observación responsable protege a los animales.'
    },
    {
      q: '7. ¿Qué puede afectar la observación astronómica?',
      options: ['A) La nubosidad', 'B) El color de la ropa', 'C) La hora del almuerzo'],
      correct: 0,
      explanation: '¡Correcto! El cielo despejado es una condición importante.'
    },
    {
      q: '8. ¿Qué caracteriza la propuesta?',
      options: ['A) Aprender y participar', 'B) Solo mirar fotos', 'C) Solo comprar productos'],
      correct: 0,
      explanation: '¡Correcto! La gastronomía participativa es el eje del recorrido.'
    }
  ];

  // ESTADO GLOBAL
  let currentQuestionIndex = 0;
  let correctCount = 0;
  let triviaPassed = false;
  let missionPassed = false;

  // Cargar progreso previo
  try {
    triviaPassed = localStorage.getItem('elqui_trivia_passed') === 'true';
    missionPassed = localStorage.getItem('elqui_mission_passed') === 'true';
  } catch (e) {}

  // 1. TABS DE NAVEGACIÓN DE JUEGOS
  const gameTabs = document.querySelectorAll('.game-tab-btn');
  const gamePanels = document.querySelectorAll('.game-panel');

  gameTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      const targetPanelId = this.getAttribute('aria-controls');
      gameTabs.forEach(t => {
        t.setAttribute('aria-selected', 'false');
        t.classList.remove('active');
      });
      gamePanels.forEach(p => p.classList.remove('is-active'));

      this.setAttribute('aria-selected', 'true');
      this.classList.add('active');
      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) {
        targetPanel.classList.add('is-active');
        const heading = targetPanel.querySelector('h3, h4');
        if (heading) heading.focus();
      }
    });
  });

  // 2. LÓGICA DE LA TRIVIA
  const questionEl = document.getElementById('trivia-question-text');
  const optionsContainer = document.getElementById('trivia-options-container');
  const feedbackEl = document.getElementById('trivia-feedback-box');
  const progressText = document.getElementById('trivia-progress-text');
  const progressBarFill = document.getElementById('trivia-progress-fill');
  const nextBtn = document.getElementById('trivia-next-btn');
  const restartBtn = document.getElementById('trivia-restart-btn');
  const btnReadQuestion = document.getElementById('trivia-read-q');

  function renderTriviaQuestion() {
    if (!questionEl || !optionsContainer) return;
    const currentQ = TRIVIA_DATA[currentQuestionIndex];

    questionEl.textContent = currentQ.q;
    progressText.textContent = `Pregunta ${currentQuestionIndex + 1} de 8`;
    progressBarFill.style.width = `${((currentQuestionIndex + 1) / 8) * 100}%`;

    feedbackEl.className = 'trivia-feedback';
    feedbackEl.style.display = 'none';
    feedbackEl.textContent = '';
    nextBtn.style.display = 'none';

    optionsContainer.innerHTML = '';
    currentQ.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'trivia-option-btn';
      btn.textContent = optText;
      btn.setAttribute('type', 'button');
      btn.setAttribute('aria-label', `Opción ${optText}`);
      btn.addEventListener('click', () => handleTriviaAnswer(idx, btn));
      optionsContainer.appendChild(btn);
    });

    if (window.announceA11y) {
      window.announceA11y(`Pregunta ${currentQuestionIndex + 1}: ${currentQ.q}`);
    }
  }

  function handleTriviaAnswer(selectedIndex, clickedBtn) {
    const currentQ = TRIVIA_DATA[currentQuestionIndex];
    const optionButtons = optionsContainer.querySelectorAll('.trivia-option-btn');

    // Deshabilitar todos los botones para evitar doble clic
    optionButtons.forEach(btn => btn.disabled = true);

    const isCorrect = selectedIndex === currentQ.correct;
    if (isCorrect) {
      correctCount++;
      clickedBtn.classList.add('correct');
      feedbackEl.className = 'trivia-feedback correct is-visible';
      feedbackEl.textContent = currentQ.explanation;
    } else {
      clickedBtn.classList.add('incorrect');
      // Marcar visualmente la correcta
      optionButtons[currentQ.correct].classList.add('correct');
      feedbackEl.className = 'trivia-feedback incorrect is-visible';
      feedbackEl.textContent = `Respuesta incorrecta. ${currentQ.explanation}`;
    }

    if (window.announceA11y) {
      window.announceA11y(feedbackEl.textContent);
    }

    if (currentQuestionIndex < TRIVIA_DATA.length - 1) {
      nextBtn.style.display = 'inline-flex';
      nextBtn.focus();
    } else {
      showTriviaResults();
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      currentQuestionIndex++;
      renderTriviaQuestion();
    });
  }

  if (btnReadQuestion) {
    btnReadQuestion.addEventListener('click', function () {
      const currentQ = TRIVIA_DATA[currentQuestionIndex];
      const readText = `${currentQ.q}. Opciones: ${currentQ.options.join(', ')}`;
      if (window.speakText) {
        window.speakText(readText);
      }
    });
  }

  function showTriviaResults() {
    const isPassed = correctCount >= 6;
    if (isPassed) {
      triviaPassed = true;
      try {
        localStorage.setItem('elqui_trivia_passed', 'true');
      } catch (e) {}
      unlockStamp('papaya');
      unlockStamp('copao');
      checkRecetarioUnlocked();
    }

    optionsContainer.innerHTML = '';
    questionEl.textContent = isPassed ? '¡Felicitaciones! Has completado la trivia' : 'Has finalizado la trivia';

    const resultCard = document.createElement('div');
    resultCard.style.padding = '20px';
    resultCard.style.textAlign = 'center';
    resultCard.innerHTML = `
      <div style="font-size: 48px; margin-bottom: 15px;">${isPassed ? '⭐' : '📖'}</div>
      <p style="font-size: 20px; font-weight: 800; color: var(--color-azul-noche); margin-bottom: 12px;">
        Obtuviste <strong>${correctCount} de 8</strong> respuestas correctas (Mínimo exigido: 6).
      </p>
      <p style="font-size: 15px; color: var(--color-texto-muted); line-height: 1.6; margin-bottom: 20px;">
        ${isPassed 
          ? '¡Excelente trabajo! Has demostrado conocer los tesoros gastronómicos y naturales del Valle del Elqui. Obtienes tu primera estrella y desbloqueas los hitos de Papaya y Copao en tu Pasaporte.' 
          : 'Estuviste cerca. Puedes repasar los contenidos del blog y volver a intentarlo las veces que desees.'}
      </p>
      ${isPassed ? `
        <div style="background-color: #FFF9E6; border: 1px solid var(--color-amarillo-sol); padding: 14px 18px; border-radius: 12px; margin-bottom: 20px; font-size: 14px; text-align: left;">
          <strong>Promoción didáctica:</strong> Has obtenido un <em>10 % de descuento referencial hipotético</em> para una futura experiencia.<br>
          <small style="color: #64748B;">Aviso académico: Esta es una simulación para fines de evaluación; no es un beneficio canjeable ni aplicable a una compra comercial.</small>
        </div>
      ` : ''}
    `;

    optionsContainer.appendChild(resultCard);
    feedbackEl.style.display = 'none';
    nextBtn.style.display = 'none';
    restartBtn.style.display = 'inline-flex';
    restartBtn.focus();

    if (window.announceA11y) {
      window.announceA11y(`Resultado final: ${correctCount} de 8 respuestas correctas. ${isPassed ? 'Trivia aprobada.' : 'No alcanzaste el mínimo, puedes reintentar.'}`);
    }
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', function () {
      currentQuestionIndex = 0;
      correctCount = 0;
      restartBtn.style.display = 'none';
      renderTriviaQuestion();
    });
  }

  // 3. MISIÓN: DEL VALLE A LAS ESTRELLAS (3 RONDAS)
  let currentRound = 1;
  let roundAttempts = { 1: 3, 2: 3, 3: 3 };

  // Ronda 1: Unir productos con descripciones
  const r1Items = [
    { id: 'papaya', name: 'Papaya del Elqui', desc: 'Fruto emblemático de pulpa amarilla, aromatizado tradicionalmente en almíbar' },
    { id: 'copao', name: 'Copao silvestre', desc: 'Fruto de cactácea semiárida con pulpa ácida y alta capacidad hidratante' },
    { id: 'queso', name: 'Queso de cabra', desc: 'Elaboración artesanal asociada a la trashumancia y oficios campesinos rurales' }
  ];

  let selectedProduct = null;
  let selectedDesc = null;
  let r1PairsMatched = 0;

  function initRound1() {
    const prodCol = document.getElementById('mission-r1-products');
    const descCol = document.getElementById('mission-r1-descriptions');
    if (!prodCol || !descCol) return;

    prodCol.innerHTML = '';
    descCol.innerHTML = '';
    selectedProduct = null;
    selectedDesc = null;
    r1PairsMatched = 0;

    // Barajar ligeramente descripciones
    const shuffledDescs = [...r1Items].sort(() => 0.5 - Math.random());

    r1Items.forEach(item => {
      const pBtn = document.createElement('button');
      pBtn.className = 'match-card';
      pBtn.textContent = item.name;
      pBtn.dataset.id = item.id;
      pBtn.addEventListener('click', function () {
        prodCol.querySelectorAll('.match-card').forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
        selectedProduct = item.id;
        checkR1Pair();
      });
      prodCol.appendChild(pBtn);
    });

    shuffledDescs.forEach(item => {
      const dBtn = document.createElement('button');
      dBtn.className = 'match-card';
      dBtn.textContent = item.desc;
      dBtn.dataset.id = item.id;
      dBtn.addEventListener('click', function () {
        descCol.querySelectorAll('.match-card').forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
        selectedDesc = item.id;
        checkR1Pair();
      });
      descCol.appendChild(dBtn);
    });
  }

  function checkR1Pair() {
    if (!selectedProduct || !selectedDesc) return;
    const prodCol = document.getElementById('mission-r1-products');
    const descCol = document.getElementById('mission-r1-descriptions');
    const feedbackBox = document.getElementById('mission-r1-feedback');

    if (selectedProduct === selectedDesc) {
      // Pareja correcta
      const pBtn = prodCol.querySelector(`[data-id="${selectedProduct}"]`);
      const dBtn = descCol.querySelector(`[data-id="${selectedDesc}"]`);
      if (pBtn) { pBtn.classList.remove('selected'); pBtn.classList.add('paired'); pBtn.disabled = true; }
      if (dBtn) { dBtn.classList.remove('selected'); dBtn.classList.add('paired'); dBtn.disabled = true; }

      r1PairsMatched++;
      selectedProduct = null;
      selectedDesc = null;

      if (feedbackBox) {
        feedbackBox.textContent = `¡Correcto! Has emparejado ${r1PairsMatched} de 3 productos.`;
        feedbackBox.className = 'form-feedback success';
        feedbackBox.style.display = 'block';
      }

      if (r1PairsMatched === 3) {
        unlockStamp('queso');
        setTimeout(() => {
          advanceMissionRound(2);
        }, 1200);
      }
    } else {
      // Error
      roundAttempts[1]--;
      if (feedbackBox) {
        feedbackBox.textContent = `No coincide. Te quedan ${roundAttempts[1]} intentos en esta ronda.`;
        feedbackBox.className = 'form-feedback error';
        feedbackBox.style.display = 'block';
      }
      setTimeout(() => {
        prodCol.querySelectorAll('.match-card:not(.paired)').forEach(b => b.classList.remove('selected'));
        descCol.querySelectorAll('.match-card:not(.paired)').forEach(b => b.classList.remove('selected'));
        selectedProduct = null;
        selectedDesc = null;
      }, 800);
    }
  }

  // Ronda 2: Ordenar tradición pisquera
  const r2CorrectOrder = ['vid', 'elaboracion', 'tradicion'];
  let r2CurrentSelection = [];

  function initRound2() {
    const container = document.getElementById('mission-r2-steps');
    if (!container) return;
    container.innerHTML = '';
    r2CurrentSelection = [];

    const steps = [
      { id: 'tradicion', text: '3. Reconocimiento de la denominación y patrimonio pisquero regional' },
      { id: 'vid', text: '1. Cultivo de la vid en laderas asoleadas y cosecha de uva moscatel' },
      { id: 'elaboracion', text: '2. Prensado cuidadoso, fermentación y destilación en alambiques' }
    ];

    steps.forEach(step => {
      const btn = document.createElement('button');
      btn.className = 'match-card';
      btn.style.width = '100%';
      btn.style.marginBottom = '10px';
      btn.textContent = step.text;
      btn.dataset.id = step.id;
      btn.addEventListener('click', function () {
        if (this.classList.contains('selected')) {
          this.classList.remove('selected');
          r2CurrentSelection = r2CurrentSelection.filter(id => id !== step.id);
        } else {
          this.classList.add('selected');
          r2CurrentSelection.push(step.id);
        }
        checkR2Order();
      });
      container.appendChild(btn);
    });
  }

  function checkR2Order() {
    if (r2CurrentSelection.length < 3) return;
    const feedbackBox = document.getElementById('mission-r2-feedback');
    const isCorrect = r2CurrentSelection.every((val, idx) => val === r2CorrectOrder[idx]);

    if (isCorrect) {
      unlockStamp('pisco');
      if (feedbackBox) {
        feedbackBox.textContent = '¡Orden correcto! Has completado el ciclo del patrimonio vitivinícola y pisquero.';
        feedbackBox.className = 'form-feedback success';
        feedbackBox.style.display = 'block';
      }
      setTimeout(() => {
        advanceMissionRound(3);
      }, 1200);
    } else {
      roundAttempts[2]--;
      if (feedbackBox) {
        feedbackBox.textContent = `Secuencia incorrecta. Te quedan ${roundAttempts[2]} intentos. Vuelve a seleccionar en orden 1, 2 y 3.`;
        feedbackBox.className = 'form-feedback error';
        feedbackBox.style.display = 'block';
      }
      setTimeout(() => {
        const container = document.getElementById('mission-r2-steps');
        if (container) {
          container.querySelectorAll('.match-card').forEach(b => b.classList.remove('selected'));
        }
        r2CurrentSelection = [];
      }, 1000);
    }
  }

  // Ronda 3: Conceptos Astronómicos
  const r3Items = [
    { id: 'telescopio', name: '🔭 Telescopio', answer: 'Instrumento óptico para ampliar detalles de la Luna, cúmulos y nebulosas' },
    { id: 'nubes', name: '☁️ Nubosidad', answer: 'Factor meteorológico que puede impedir la observación directa de estrellas' },
    { id: 'constelacion', name: '✨ Constelación', answer: 'Patrón aparente de estrellas (como la Cruz del Sur u Orión) en el cielo nocturno' }
  ];

  function initRound3() {
    const container = document.getElementById('mission-r3-container');
    if (!container) return;
    container.innerHTML = '';

    r3Items.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'summary-card';
      card.style.padding = '18px';
      card.style.marginBottom = '15px';
      card.innerHTML = `
        <h4 style="color: var(--color-terracota); font-size: 18px; margin-bottom: 8px;">${item.name}</h4>
        <p style="font-size: 14px; color: var(--color-texto-muted); margin-bottom: 12px;">¿A qué concepto corresponde?</p>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${r3Items.map(opt => `
            <button type="button" class="match-card r3-opt" data-q="${item.id}" data-val="${opt.id}" style="text-align: left; font-size: 14px;">
              ${opt.answer}
            </button>
          `).join('')}
        </div>
      `;
      container.appendChild(card);
    });

    const r3Buttons = container.querySelectorAll('.r3-opt');
    let r3Answered = 0;
    r3Buttons.forEach(btn => {
      btn.addEventListener('click', function () {
        const qId = this.dataset.q;
        const valId = this.dataset.val;
        const parent = this.parentElement;

        parent.querySelectorAll('.r3-opt').forEach(b => b.disabled = true);
        if (qId === valId) {
          this.classList.add('paired');
          r3Answered++;
          if (r3Answered === 3) {
            completeMission();
          }
        } else {
          this.classList.add('selected');
          setTimeout(() => {
            parent.querySelectorAll('.r3-opt').forEach(b => b.disabled = false);
            this.classList.remove('selected');
          }, 800);
        }
      });
    });
  }

  function advanceMissionRound(nextRoundNum) {
    currentRound = nextRoundNum;
    for (let i = 1; i <= 3; i++) {
      const rEl = document.getElementById(`mission-round-${i}`);
      if (rEl) rEl.style.display = i === nextRoundNum ? 'block' : 'none';
    }
    const indicator = document.getElementById('mission-round-indicator');
    if (indicator) indicator.textContent = `Ronda ${nextRoundNum} de 3`;

    if (nextRoundNum === 2) initRound2();
    if (nextRoundNum === 3) initRound3();
  }

  function completeMission() {
    missionPassed = true;
    try {
      localStorage.setItem('elqui_mission_passed', 'true');
    } catch (e) {}

    unlockStamp('cocina-solar');
    unlockStamp('estrellas');
    checkRecetarioUnlocked();

    const container = document.getElementById('mission-round-3');
    if (container) {
      container.innerHTML = `
        <div style="text-align: center; padding: 30px;">
          <div style="font-size: 52px; margin-bottom: 15px;">🌟🏆</div>
          <h3 style="color: var(--color-verde-cactus); font-size: 26px; margin-bottom: 12px;">¡Misión cumplida: Del valle a las estrellas!</h3>
          <p style="font-size: 17px; max-width: 640px; margin: 0 auto 20px; line-height: 1.6;">
            Has resuelto exitosamente las tres rondas de desafíos sensoriales, tradicionales y astronómicos. Tus sellos de Cocina Solar y Estrellas han sido estampados en tu Pasaporte.
          </p>
          <div style="background-color: #E6F4EA; border: 1px solid #34A853; color: #137333; padding: 14px; border-radius: 12px; font-weight: 700; margin-bottom: 25px;">
            ¡Ya puedes acceder a la descarga de nuestro Recetario Digital Oficial!
          </div>
          <a href="#recetario" class="btn btn-primary" style="text-decoration: none;">Ir al Recetario Desbloqueado ↓</a>
        </div>
      `;
    }
  }

  // Botones de pistas
  const btnClue = document.getElementById('mission-btn-clue');
  if (btnClue) {
    btnClue.addEventListener('click', function () {
      const clueBox = document.getElementById(`mission-r${currentRound}-clue`);
      if (clueBox) {
        clueBox.classList.toggle('is-visible');
      }
    });
  }

  // 4. PASAPORTE GASTRONÓMICO DEL ELQUI (6 HITOS)
  const PASSPORT_HITS = ['papaya', 'copao', 'queso', 'pisco', 'cocina-solar', 'estrellas'];
  let unlockedStamps = [];

  try {
    const savedStamps = localStorage.getItem('elqui_passport_stamps');
    if (savedStamps) {
      unlockedStamps = JSON.parse(savedStamps);
    }
  } catch (e) {}

  function updatePassportUI() {
    PASSPORT_HITS.forEach(hitId => {
      const card = document.getElementById(`stamp-${hitId}`);
      if (!card) return;
      const isUnlocked = unlockedStamps.includes(hitId);
      if (isUnlocked) {
        card.classList.add('unlocked');
        const statusEl = card.querySelector('.stamp-status');
        if (statusEl) statusEl.textContent = '✓ Hito estampado';
      }
    });

    const countEl = document.getElementById('passport-stamps-count');
    if (countEl) countEl.textContent = `${unlockedStamps.length} de 6 sellos`;

    const achievementBadge = document.getElementById('passport-achievement-notice');
    if (achievementBadge) {
      if (unlockedStamps.length >= 4) {
        achievementBadge.style.display = 'block';
      }
    }
  }

  function unlockStamp(stampId) {
    if (!unlockedStamps.includes(stampId)) {
      unlockedStamps.push(stampId);
      try {
        localStorage.setItem('elqui_passport_stamps', JSON.stringify(unlockedStamps));
      } catch (e) {}
      updatePassportUI();
      if (window.announceA11y) {
        window.announceA11y(`¡Nuevo sello desbloqueado en tu Pasaporte: ${stampId}!`);
      }
    }
  }

  // Botón manual para registrar reflexión y vínculo territorial
  const passportForm = document.getElementById('passport-reflection-form');
  if (passportForm) {
    passportForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const text = document.getElementById('passport-reflection-input').value.trim();
      const feedback = document.getElementById('passport-reflection-feedback');
      if (text.length >= 15) {
        try {
          localStorage.setItem('elqui_passport_reflection', text);
        } catch (err) {}
        if (feedback) {
          feedback.textContent = '¡Reflexión territorial registrada con éxito en tu pasaporte!';
          feedback.className = 'form-feedback success';
          feedback.style.display = 'block';
        }
      } else {
        if (feedback) {
          feedback.textContent = 'Por favor describe con al menos 15 caracteres el vínculo entre el producto y el territorio.';
          feedback.className = 'form-feedback error';
          feedback.style.display = 'block';
        }
      }
    });
  }

  // 5. COMPROBACIÓN DE DESBLOQUEO DEL RECETARIO
  function checkRecetarioUnlocked() {
    const isUnlocked = triviaPassed && missionPassed;
    const lockedCard = document.getElementById('recetario-locked-banner');
    const unlockedCard = document.getElementById('recetario-unlocked-banner');

    if (lockedCard && unlockedCard) {
      if (isUnlocked) {
        lockedCard.style.display = 'none';
        unlockedCard.style.display = 'block';
      } else {
        lockedCard.style.display = 'block';
        unlockedCard.style.display = 'none';
      }
    }
  }

  // Inicialización al cargar la página
  document.addEventListener('DOMContentLoaded', function () {
    renderTriviaQuestion();
    initRound1();
    updatePassportUI();
    checkRecetarioUnlocked();
  });

})();
