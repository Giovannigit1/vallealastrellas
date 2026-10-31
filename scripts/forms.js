/**
 * GESTIÓN DE FORMULARIOS: SUSCRIPCIÓN, CONSULTA Y COMENTARIOS
 * Del valle a la mesa, de la mesa a las estrellas
 * Conexión segura a /api/subscribe con detección offline y honeypot
 */

(function () {
  'use strict';

  // 1. FORMULARIO DE SUSCRIPCIÓN (REAL)
  const subscribeForm = document.getElementById('newsletter-form');
  const subscribeFeedback = document.getElementById('subscribe-feedback');

  if (subscribeForm) {
    subscribeForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Validación de honeypot
      const honeypot = document.getElementById('sub-website-field');
      if (honeypot && honeypot.value.trim() !== '') {
        console.warn('Bot detectado por honeypot');
        return;
      }

      const emailInput = document.getElementById('sub-email');
      const nameInput = document.getElementById('sub-name');
      const consentCheckbox = document.getElementById('sub-consent');

      if (!consentCheckbox.checked) {
        showFeedback(subscribeFeedback, 'Debes aceptar los términos y el consentimiento para suscribirte.', 'error');
        return;
      }

      const email = emailInput.value.trim();
      const name = nameInput ? nameInput.value.trim() : '';

      // Detección offline estricta
      if (!navigator.onLine) {
        showFeedback(subscribeFeedback, 'Sin conexión: tu suscripción no se pudo enviar, inténtalo de nuevo cuando vuelva internet.', 'error');
        return;
      }

      const submitBtn = subscribeForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
      }

      try {
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'subscription',
            email: email,
            name: name,
            consent: true
          })
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok && data.success) {
          showFeedback(subscribeFeedback, '¡Gracias por acompañarnos!', 'success');
          subscribeForm.reset();
        } else {
          // Si el servidor falla o no está configurado, informar honestamente
          showFeedback(subscribeFeedback, data.message || 'No se pudo procesar tu suscripción en este momento. Inténtalo más tarde.', 'error');
        }
      } catch (err) {
        showFeedback(subscribeFeedback, 'Sin conexión: tu suscripción no se pudo enviar, inténtalo de nuevo cuando vuelva internet.', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Quiero suscribirme';
        }
      }
    });
  }

  // 2. FORMULARIO OFICIAL DE SOLICITUD DE RESERVA
  const inquiryForm = document.getElementById('inquiry-form');
  const inquiryFeedback = document.getElementById('inquiry-feedback');
  const guestsSelect = document.getElementById('inq-guests');
  const pricePerPerson = 125000;

  function updatePriceCalculation() {
    if (!guestsSelect) return;
    const count = parseInt(guestsSelect.value, 10) || 1;
    const total = count * pricePerPerson;
    const formattedTotal = '$' + total.toLocaleString('es-CL');
    const summaryEl = document.getElementById('booking-price-summary');
    const submitBtn = inquiryForm ? inquiryForm.querySelector('button[type="submit"]') : null;

    if (summaryEl) {
      summaryEl.innerHTML = `
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 14px; color: var(--color-texto-muted);">
          <span>Valor por persona:</span>
          <strong>$125.000 CLP</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; color: var(--color-texto-muted);">
          <span>Cantidad de personas:</span>
          <strong>${count} ${count === 1 ? 'viajero' : 'viajeros'}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed rgba(65, 107, 82, 0.3); padding-top: 8px; font-size: 17px; font-weight: 800; color: var(--color-verde-cactus);">
          <span>Total de la experiencia:</span>
          <span style="font-size: 20px; color: var(--color-terracota);">${formattedTotal} CLP</span>
        </div>
      `;
    }

    if (submitBtn) {
      submitBtn.textContent = `Solicitar reserva · ${formattedTotal} CLP`;
    }
  }

  if (guestsSelect) {
    guestsSelect.addEventListener('change', updatePriceCalculation);
    updatePriceCalculation();
  }

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Validación de honeypot
      const honeypot = document.getElementById('inq-website-field');
      if (honeypot && honeypot.value.trim() !== '') {
        console.warn('Bot detectado por honeypot');
        return;
      }

      const name = document.getElementById('inq-name').value.trim();
      const email = document.getElementById('inq-email').value.trim();
      const date = document.getElementById('inq-date').value;
      const guests = document.getElementById('inq-guests').value;
      const dietary = document.getElementById('inq-dietary').value.trim();
      const message = document.getElementById('inq-message').value.trim();
      const consent = document.getElementById('inq-consent').checked;

      if (!consent) {
        showFeedback(inquiryFeedback, 'Debes aceptar las condiciones para solicitar tu reserva.', 'error');
        return;
      }

      // Detección offline
      if (!navigator.onLine) {
        showFeedback(inquiryFeedback, 'Sin conexión: tu solicitud no se pudo enviar, inténtalo de nuevo cuando vuelva internet.', 'error');
        return;
      }

      const submitBtn = inquiryForm.querySelector('button[type="submit"]');
      const count = parseInt(guests, 10) || 1;
      const totalFormatted = '$' + (count * pricePerPerson).toLocaleString('es-CL');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando solicitud...';
      }

      try {
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'inquiry',
            name: name,
            email: email,
            date: date,
            guests: `${guests} personas (${totalFormatted} CLP)`,
            dietary: dietary,
            message: message,
            consent: true
          })
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok && data.success) {
          showFeedback(inquiryFeedback, '¡Solicitud recibida con éxito! Nos pondremos en contacto contigo a la brevedad para coordinar y confirmar tu experiencia.', 'success');
          inquiryForm.reset();
          updatePriceCalculation();
        } else {
          showFeedback(inquiryFeedback, data.message || 'No fue posible enviar la solicitud en este momento.', 'error');
        }
      } catch (err) {
        showFeedback(inquiryFeedback, 'Sin conexión: tu solicitud no se pudo enviar, inténtalo de nuevo cuando vuelva internet.', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          updatePriceCalculation();
        }
      }
    });
  }

  // 3. COMENTARIOS DE LA COMUNIDAD (LOCALSTORAGE DEMOSTRATIVO)
  const commentForm = document.getElementById('community-comment-form');
  const commentFeedback = document.getElementById('comment-feedback');
  const commentsList = document.getElementById('community-comments-list');

  // Comentarios iniciales ilustrativos
  const defaultComments = [
    { alias: 'Camila R.', comment: 'Me encantó la propuesta de cocina solar y rescate de la papaya. Es una gran iniciativa para Cochiguaz.', date: '28 de octubre de 2026' },
    { alias: 'Felipe M.', comment: 'Excelente que consideren opciones sin alcohol para la tradición pisquera y alternativas para celíacos.', date: '29 de octubre de 2026' }
  ];

  function renderComments() {
    if (!commentsList) return;
    let saved = [];
    try {
      const stored = localStorage.getItem('elqui_comments');
      if (stored) saved = JSON.parse(stored);
    } catch (e) {}

    const allComments = [...defaultComments, ...saved];
    commentsList.innerHTML = '';

    allComments.forEach(c => {
      const el = document.createElement('div');
      el.className = 'summary-card';
      el.style.padding = '18px';
      el.style.marginBottom = '14px';
      el.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <strong style="color: var(--color-verde-cactus);">${escapeHtml(c.alias)}</strong>
          <small style="color: #64748B;">${escapeHtml(c.date)}</small>
        </div>
        <p style="font-size: 15px; color: var(--color-azul-noche); line-height: 1.5;">${escapeHtml(c.comment)}</p>
      `;
      commentsList.appendChild(el);
    });
  }

  if (commentForm) {
    commentForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const alias = document.getElementById('comment-alias').value.trim();
      const text = document.getElementById('comment-text').value.trim();
      const consent = document.getElementById('comment-consent').checked;

      if (!consent) {
        showFeedback(commentFeedback, 'Debes autorizar la moderación de tu comentario.', 'error');
        return;
      }

      if (alias && text) {
        const newC = {
          alias: alias,
          comment: text,
          date: 'Hoy (demostración local)'
        };
        try {
          const current = JSON.parse(localStorage.getItem('elqui_comments') || '[]');
          current.push(newC);
          localStorage.setItem('elqui_comments', JSON.stringify(current));
        } catch (e) {}

        showFeedback(commentFeedback, '¡Gracias por tu comentario! Se ha guardado localmente en este dispositivo bajo aviso de moderación.', 'success');
        commentForm.reset();
        renderComments();
      }
    });
  }

  function showFeedback(el, text, type) {
    if (!el) return;
    el.textContent = text;
    el.className = `form-feedback ${type}`;
    el.style.display = 'block';
    if (window.announceA11y) {
      window.announceA11y(text);
    }
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderComments();
  });

})();
