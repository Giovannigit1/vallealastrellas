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
      a: 'La jornada propuesta va de 10:00 a 21:30: 11 horas y 30 minutos (690 minutos de guion técnico).'
    },
    {
      q: '¿Cuánto cuesta?',
      keywords: ['cuanto cuesta', 'precio', 'tarifa', 'valor', 'cobro', 'costo'],
      a: 'El valor referencial del informe es $125.000 CLP por persona, todavía no confirmado comercialmente.'
    },
    {
      q: '¿Puedo reservar?',
      keywords: ['reservar', 'reserva', 'comprar', 'ticket', 'disponibilidad', 'cupo'],
      a: 'Por ahora no: es una propuesta académica de INACAP. Las reservas no están habilitadas. Puedes dejar una consulta demostrativa de interés en el formulario.'
    },
    {
      q: '¿Hay opciones alimentarias?',
      keywords: ['opciones alimentarias', 'restricciones', 'vegetariano', 'vegano', 'alergia', 'celiaco', 'lactosa', 'comida'],
      a: 'Se contempla consultar restricciones y alergias antes de participar; la disponibilidad de alternativas específicas debe confirmarse con el recinto.'
    },
    {
      q: '¿Veremos estrellas?',
      keywords: ['estrellas', 'cielo', 'astronomia', 'noche', 'telescopio', 'nublado', 'lluvia'],
      a: 'Depende de las condiciones del cielo. Si no son adecuadas por nubosidad o viento, se ofrecerá una actividad interpretativa alternativa bajo techo sin prometer observación efectiva.'
    },
    {
      q: '¿Cómo gano el recetario?',
      keywords: ['recetario', 'recetas', 'premio', 'descargar', 'ganar', 'juego'],
      a: 'Completa la trivia de 8 preguntas (al menos 6 correctas) y la misión de tres desafíos; se habilitará la descarga gratuita e inmediata en PDF.'
    },
    {
      q: '¿Hay descuento?',
      keywords: ['descuento', 'promocion', 'cupon', '10%', 'rebaja'],
      a: 'Se presenta un 10 % promocional referencial hipotético al jugar la trivia, como una simulación académica sin validez comercial mientras el proyecto no opere.'
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
