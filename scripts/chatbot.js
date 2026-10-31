/**
 * CHATBOT VIRTUAL «ELQUI» 🌵
 * Del valle a la mesa, de la mesa a las estrellas
 * 8 preguntas frecuentes canónicas con respuestas preparadas oficiales
 * Honestidad: Guía virtual con respuestas predefinidas (no IA generativa)
 */

(function () {
  'use strict';

  const FAQ_DATA = [
    {
      q: '¿Dónde se realiza?',
      keywords: ['donde', 'lugar', 'ubicacion', 'sector', 'cochiguaz', 'recinto', 'camping', 'rio'],
      a: 'La propuesta se sitúa en el sector de Cochiguaz, Valle del Elqui. El recinto propuesto es Valle Luz Camping (Río Cochiguaz km 3); el recinto y acceso definitivo están por confirmar.'
    },
    {
      q: '¿Cuánto dura?',
      keywords: ['duracion', 'cuanto dura', 'horario', 'horas', 'tiempo', 'jornada'],
      a: 'La jornada de experiencia abarca desde el atardecer hasta la noche estrellada, integrando gastronomía y astroturismo guiado.'
    },
    {
      q: '¿Cuánto cuesta?',
      keywords: ['cuanto cuesta', 'precio', 'tarifa', 'valor', 'cobro', 'costo'],
      a: 'El valor de la experiencia es de $125.000 CLP por persona. Incluye recorrido de sabores del valle, degustaciones, banquete de cuatro tiempos maridado y observación astronómica guiada.'
    },
    {
      q: '¿Cómo puedo reservar?',
      keywords: ['reservar', 'reserva', 'comprar', 'ticket', 'disponibilidad', 'cupo'],
      a: 'Puedes solicitar tu reserva directamente en nuestra sección de Reservas. Selecciona tu fecha, número de personas y requerimientos; nuestro equipo te contactará para coordinar la confirmación.'
    },
    {
      q: '¿Hay opciones alimentarias?',
      keywords: ['opciones alimentarias', 'restricciones', 'vegetariano', 'vegano', 'alergia', 'celiaco', 'lactosa', 'comida'],
      a: 'Sí, adaptamos nuestro banquete para vegetarianos, celíacos y personas con intolerancias alimentarias. Solo indícalo al momento de realizar tu solicitud de reserva.'
    },
    {
      q: '¿Veremos estrellas?',
      keywords: ['estrellas', 'cielo', 'astronomia', 'noche', 'telescopio', 'nublado', 'lluvia'],
      a: 'Cochiguaz cuenta con uno de los cielos más despejados del mundo. En caso excepcional de nubosidad, contamos con una sesión interpretativa audiovisual bajo domo con cata nocturna.'
    },
    {
      q: '¿Cómo obtengo el recetario?',
      keywords: ['recetario', 'recetas', 'premio', 'descargar', 'ganar', 'juego'],
      a: 'Puedes acceder a nuestro Recetario Patrimonial directamente en la sección Recetario o descargarlo gratis en PDF tras jugar la trivia del territorio.'
    },
    {
      q: '¿Qué incluye la experiencia?',
      keywords: ['incluye', 'que incluye', 'servicio', 'menu', 'astroturismo'],
      a: 'Incluye: cóctel de bienvenida, cata sensorial de frutos del Elqui, banquete campesino de 4 tiempos con maridaje, observación astronómica con telescopio y mantas térmicas.'
    }
  ];

  const bubbleBtn = document.getElementById('chatbot-toggle-btn');
  const windowEl = document.getElementById('chatbot-window');
  const closeBtn = document.getElementById('chatbot-close-btn');
  const messagesContainer = document.getElementById('chatbot-messages');
  const pillsContainer = document.getElementById('chatbot-pills');
  const chatForm = document.getElementById('chatbot-input-form');
  const chatInput = document.getElementById('chatbot-text-input');

  let isInitialized = false;

  function initChatbot() {
    if (isInitialized) return;
    isInitialized = true;

    // Mensaje de saludo canónico
    appendMessage('bot', '¡Hola! Soy Elqui 🌵, tu guía virtual. Puedo ayudarte a conocer el recorrido, sus sabores y cómo consultar información. ¿Qué quieres descubrir?');

    // Botones de preguntas frecuentes rápidas
    if (pillsContainer) {
      pillsContainer.innerHTML = '';
      FAQ_DATA.forEach((item, index) => {
        const pill = document.createElement('button');
        pill.className = 'quick-pill';
        pill.type = 'button';
        pill.textContent = item.q;
        pill.addEventListener('click', () => {
          handleQuestion(item.q, item.a);
        });
        pillsContainer.appendChild(pill);
      });
    }
  }

  function appendMessage(sender, text) {
    if (!messagesContainer) return;
    const msg = document.createElement('div');
    msg.className = `chat-msg ${sender}`;
    msg.textContent = text;
    messagesContainer.appendChild(msg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    if (sender === 'bot' && window.announceA11y) {
      window.announceA11y(`Elqui responde: ${text}`);
    }
  }

  function handleQuestion(userQuestion, preparedAnswer) {
    appendMessage('user', userQuestion);
    setTimeout(() => {
      appendMessage('bot', preparedAnswer);
    }, 400);
  }

  function handleFreeInput(userInput) {
    appendMessage('user', userInput);
    const cleaned = userInput.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Buscar coincidencia de palabras clave
    let match = FAQ_DATA.find(item => {
      return item.keywords.some(k => cleaned.includes(k));
    });

    setTimeout(() => {
      if (match) {
        appendMessage('bot', match.a);
      } else {
        appendMessage('bot', 'Disculpa, soy una guía con respuestas predefinidas sobre el proyecto. Puedes pulsar alguna de las preguntas preparadas abajo o consultar por horario, precio, lugar, estrellas o recetario.');
      }
    }, 450);
  }

  // Toggle abrir / cerrar
  if (bubbleBtn) {
    bubbleBtn.addEventListener('click', function () {
      initChatbot();
      const isOpen = windowEl.classList.toggle('is-open');
      windowEl.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      bubbleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (isOpen && chatInput) {
        chatInput.focus();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      if (windowEl) {
        windowEl.classList.remove('is-open');
        windowEl.setAttribute('aria-hidden', 'true');
        if (bubbleBtn) {
          bubbleBtn.setAttribute('aria-expanded', 'false');
          bubbleBtn.focus();
        }
      }
    });
  }

  // Enviar mensaje manual
  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const val = chatInput.value.trim();
      if (!val) return;
      handleFreeInput(val);
      chatInput.value = '';
    });
  }

  // Cierre por teclado (Esc)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && windowEl && windowEl.classList.contains('is-open')) {
      windowEl.classList.remove('is-open');
      windowEl.setAttribute('aria-hidden', 'true');
      if (bubbleBtn) bubbleBtn.focus();
    }
  });

})();
