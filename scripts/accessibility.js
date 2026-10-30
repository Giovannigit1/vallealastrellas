/**
 * ACCESIBILIDAD UNIVERSAL · WCAG 2.1 AA/AAA
 * Del valle a la mesa, de la mesa a las estrellas
 * SpeechSynthesis (es-CL / es-ES), Escalador de fuentes (100%-160%), Alto Contraste y Reducir Animaciones
 */

(function () {
  'use strict';

  // 1. ESCALADOR DE FUENTES (A+ / A-)
  let currentFontScale = 1.0;
  const MIN_SCALE = 1.0;
  const MAX_SCALE = 1.6;
  const SCALE_STEP = 0.1;

  try {
    const savedScale = localStorage.getItem('elqui_font_scale');
    if (savedScale) {
      currentFontScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, parseFloat(savedScale)));
      applyFontScale(currentFontScale);
    }
  } catch (e) {
    console.warn('localStorage no disponible para tamaño de fuente');
  }

  function applyFontScale(scale) {
    document.documentElement.style.setProperty('--font-scale', scale);
    const indicator = document.getElementById('font-scale-value');
    if (indicator) {
      indicator.textContent = Math.round(scale * 100) + '%';
    }
    try {
      localStorage.setItem('elqui_font_scale', scale.toString());
    } catch (e) {}
  }

  const btnFontIncrease = document.getElementById('btn-font-increase');
  const btnFontDecrease = document.getElementById('btn-font-decrease');

  if (btnFontIncrease) {
    btnFontIncrease.addEventListener('click', function () {
      if (currentFontScale < MAX_SCALE) {
        currentFontScale = Math.min(MAX_SCALE, currentFontScale + SCALE_STEP);
        applyFontScale(currentFontScale);
        announceA11y('Tamaño de letra aumentado al ' + Math.round(currentFontScale * 100) + '%');
      }
    });
  }

  if (btnFontDecrease) {
    btnFontDecrease.addEventListener('click', function () {
      if (currentFontScale > MIN_SCALE) {
        currentFontScale = Math.max(MIN_SCALE, currentFontScale - SCALE_STEP);
        applyFontScale(currentFontScale);
        announceA11y('Tamaño de letra reducido al ' + Math.round(currentFontScale * 100) + '%');
      }
    });
  }

  // 2. MODO ALTO CONTRASTE
  const btnContrast = document.getElementById('btn-contrast');
  let isHighContrast = false;

  try {
    isHighContrast = localStorage.getItem('elqui_high_contrast') === 'true';
    if (isHighContrast) {
      document.body.classList.add('high-contrast');
      if (btnContrast) btnContrast.setAttribute('aria-pressed', 'true');
    }
  } catch (e) {}

  if (btnContrast) {
    btnContrast.addEventListener('click', function () {
      isHighContrast = !isHighContrast;
      document.body.classList.toggle('high-contrast', isHighContrast);
      btnContrast.setAttribute('aria-pressed', isHighContrast ? 'true' : 'false');
      try {
        localStorage.setItem('elqui_high_contrast', isHighContrast.toString());
      } catch (e) {}
      announceA11y(isHighContrast ? 'Modo alto contraste activado' : 'Modo alto contraste desactivado');
    });
  }

  // 3. MODO REDUCIR ANIMACIONES
  const btnReducedMotion = document.getElementById('btn-reduced-motion');
  let isReducedMotion = false;

  try {
    isReducedMotion = localStorage.getItem('elqui_reduced_motion') === 'true';
    if (isReducedMotion) {
      document.body.classList.add('reduced-motion');
      if (btnReducedMotion) btnReducedMotion.setAttribute('aria-pressed', 'true');
    }
  } catch (e) {}

  if (btnReducedMotion) {
    btnReducedMotion.addEventListener('click', function () {
      isReducedMotion = !isReducedMotion;
      document.body.classList.toggle('reduced-motion', isReducedMotion);
      btnReducedMotion.setAttribute('aria-pressed', isReducedMotion ? 'true' : 'false');
      try {
        localStorage.setItem('elqui_reduced_motion', isReducedMotion.toString());
      } catch (e) {}
      announceA11y(isReducedMotion ? 'Animaciones reducidas activadas' : 'Animaciones reducidas desactivadas');
    });
  }

  // 4. LECTURA EN VOZ ALTA (SpeechSynthesis API)
  const synth = window.speechSynthesis;
  let isSpeaking = false;
  let isPaused = false;
  const btnSpeak = document.getElementById('btn-speak-page');
  const btnPause = document.getElementById('btn-pause-speech');

  function getSpanishVoice() {
    if (!synth) return null;
    const voices = synth.getVoices();
    // Prioridad: español de Chile (es-CL), luego cualquier es-*
    const clVoice = voices.find(v => v.lang.toLowerCase() === 'es-cl');
    if (clVoice) return clVoice;
    const anyEsVoice = voices.find(v => v.lang.toLowerCase().startsWith('es'));
    return anyEsVoice || null;
  }

  // Carga asíncrona de voces del navegador
  if (synth && synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getSpanishVoice;
  }

  window.speakText = function (text, onEndCallback) {
    if (!synth) {
      alert('Tu navegador o dispositivo no admite la síntesis de voz (SpeechSynthesis).');
      return;
    }
    synth.cancel(); // Detener cualquier locución previa

    const cleanText = text.replace(/<[^>]*>/g, '').replace(/https?:\/\/\S+/g, 'enlace web').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voice = getSpanishVoice();
    if (voice) {
      utterance.voice = voice;
    }
    utterance.lang = 'es-CL';
    utterance.rate = 0.95; // Ritmo cómodo y pedagógico
    utterance.pitch = 1.0;

    utterance.onstart = function () {
      isSpeaking = true;
      isPaused = false;
      updateSpeechUI();
    };

    utterance.onend = function () {
      isSpeaking = false;
      isPaused = false;
      updateSpeechUI();
      if (onEndCallback) onEndCallback();
    };

    utterance.onerror = function () {
      isSpeaking = false;
      isPaused = false;
      updateSpeechUI();
    };

    synth.speak(utterance);
  };

  function updateSpeechUI() {
    if (btnSpeak) {
      if (isSpeaking) {
        btnSpeak.innerHTML = '⏹️ Detener lectura';
        btnSpeak.setAttribute('aria-pressed', 'true');
      } else {
        btnSpeak.innerHTML = '🔊 Escuchar página';
        btnSpeak.setAttribute('aria-pressed', 'false');
      }
    }
    if (btnPause) {
      btnPause.style.display = isSpeaking ? 'inline-flex' : 'none';
      btnPause.innerHTML = isPaused ? '▶️ Reanudar' : '⏸️ Pausar';
    }
  }

  if (btnSpeak) {
    btnSpeak.addEventListener('click', function () {
      if (!synth) {
        alert('La síntesis de voz no está disponible en este navegador.');
        return;
      }
      if (isSpeaking) {
        synth.cancel();
        isSpeaking = false;
        isPaused = false;
        updateSpeechUI();
        announceA11y('Lectura de página detenida');
      } else {
        const mainContent = document.getElementById('main-content');
        const textToRead = mainContent ? mainContent.innerText : document.body.innerText;
        window.speakText(textToRead);
        announceA11y('Iniciando lectura de la página');
      }
    });
  }

  if (btnPause) {
    btnPause.addEventListener('click', function () {
      if (!synth || !isSpeaking) return;
      if (isPaused) {
        synth.resume();
        isPaused = false;
        btnPause.innerHTML = '⏸️ Pausar';
        announceA11y('Lectura reanudada');
      } else {
        synth.pause();
        isPaused = true;
        btnPause.innerHTML = '▶️ Reanudar';
        announceA11y('Lectura pausada');
      }
    });
  }

  // 5. ANUNCIOS ARIA EN VIVO PARA LECTORES DE PANTALLA
  window.announceA11y = function (message) {
    let liveRegion = document.getElementById('a11y-live-announcer');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'a11y-live-announcer';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.style.position = 'absolute';
      liveRegion.style.left = '-9999px';
      liveRegion.style.width = '1px';
      liveRegion.style.height = '1px';
      liveRegion.style.overflow = 'hidden';
      document.body.appendChild(liveRegion);
    }
    liveRegion.textContent = '';
    setTimeout(function () {
      liveRegion.textContent = message;
    }, 50);
  };

  // 6. BOTÓN AYUDA DE NAVEGACIÓN
  const btnHelp = document.getElementById('btn-help');
  if (btnHelp) {
    btnHelp.addEventListener('click', function () {
      const helpMsg = 'Guía de navegación: Usa las teclas Tab y Shift+Tab para recorrer los botones y enlaces. Con Enter o Espacio activas las opciones. Puedes ajustar el tamaño del texto con A+ y A-, o escuchar el contenido con el botón Escuchar página. En los juegos, no se requiere arrastrar el mouse: todo se responde con clics o pulsando teclas.';
      alert(helpMsg);
      announceA11y(helpMsg);
    });
  }
})();
