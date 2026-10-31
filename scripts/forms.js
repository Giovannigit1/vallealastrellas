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
      const phoneInput = document.getElementById('inq-phone');
      const phone = phoneInput ? phoneInput.value.trim() : '';
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
            phone: phone,
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

  // 3. COMENTARIOS DE LA COMUNIDAD (BASE DE DATOS SUPABASE + MODERACIÓN)
  const commentForm = document.getElementById('community-comment-form');
  const commentFeedback = document.getElementById('comment-feedback');
  const commentsList = document.getElementById('community-comments-list');

  // Comentarios iniciales destacados
  const defaultComments = [
    { alias: 'Camila R.', comment: 'Me encantó la propuesta de cocina solar y rescate de la papaya. Es una gran iniciativa para Cochiguaz.', date: '28 de octubre de 2026' },
    { alias: 'Felipe M.', comment: 'Excelente que consideren opciones sin alcohol para la tradición pisquera y alternativas para celíacos.', date: '29 de octubre de 2026' }
  ];

  async function renderPublicComments() {
    if (!commentsList) return;

    let dbComments = [];
    try {
      const res = await fetch('/api/subscribe', { method: 'GET' });
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.success && Array.isArray(data.comments)) {
          dbComments = data.comments;
        }
      }
    } catch (e) {
      // Modo offline o sin conexión: se mantendrán los comentarios iniciales
    }

    const allComments = [...defaultComments, ...dbComments];
    commentsList.innerHTML = '';

    allComments.forEach(c => {
      const el = document.createElement('div');
      el.className = 'summary-card';
      el.style.padding = '18px';
      el.style.marginBottom = '14px';
      el.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <strong style="color: var(--color-verde-cactus);">${escapeHtml(c.alias || c.name || 'Visitante')}</strong>
          <small style="color: #64748B;">${escapeHtml(c.date || 'Reciente')}</small>
        </div>
        <p style="font-size: 15px; color: var(--color-azul-noche); line-height: 1.5; margin: 0;">${escapeHtml(c.comment || c.comments || '')}</p>
      `;
      commentsList.appendChild(el);
    });
  }

  if (commentForm) {
    commentForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const alias = document.getElementById('comment-alias').value.trim();
      const text = document.getElementById('comment-text').value.trim();
      const consent = document.getElementById('comment-consent').checked;

      if (!consent) {
        showFeedback(commentFeedback, 'Debes autorizar la revisión de tu comentario.', 'error');
        return;
      }

      if (!alias || !text) {
        showFeedback(commentFeedback, 'Por favor completa tu nombre y comentario.', 'error');
        return;
      }

      // Detección offline
      if (!navigator.onLine) {
        showFeedback(commentFeedback, 'Sin conexión: tu comentario no se pudo enviar, inténtalo de nuevo cuando vuelva tu señal de internet.', 'error');
        return;
      }

      const submitBtn = commentForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando comentario...';
      }

      try {
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'comment',
            alias: alias,
            comment: text,
            consent: true
          })
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok && data.success) {
          showFeedback(commentFeedback, '¡Gracias por tu comentario! Ha sido enviado exitosamente al equipo para su revisión y aprobación.', 'success');
          commentForm.reset();
        } else {
          showFeedback(commentFeedback, data.message || 'No fue posible registrar tu comentario en este momento.', 'error');
        }
      } catch (err) {
        showFeedback(commentFeedback, 'Sin conexión: no se pudo enviar el comentario al servidor.', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Enviar comentario al equipo';
        }
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
    renderPublicComments();
  });

})();
