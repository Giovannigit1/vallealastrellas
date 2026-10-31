/**
 * SCRIPT PRINCIPAL · INTERACCIONES GENERALES Y SERVICE WORKER
 * Del valle a la mesa, de la mesa a las estrellas
 */

(function () {
  'use strict';

  // 1. REGISTRO DEL SERVICE WORKER (OFFLINE-FIRST)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js')
        .then(function (reg) {
          reg.update();
          console.log('Service Worker registrado con éxito en ámbito:', reg.scope);
        })
        .catch(function (err) {
          console.warn('Fallo en el registro del Service Worker:', err);
        });
    });
  }

  // 2. MENÚ MÓVIL
  const menuToggle = document.getElementById('menu-toggle-btn');
  const navList = document.getElementById('main-nav-list');

  if (menuToggle && navList) {
    menuToggle.addEventListener('click', function () {
      const isOpen = navList.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuToggle.innerHTML = isOpen ? '✕ Cerrar' : '☰ Menú';
    });

    // Cerrar menú al hacer clic en un enlace
    navList.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function () {
        navList.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '☰ Menú';
      });
    });
  }

  // 3. BOTONES "ESCUCHAR ESTA ENTRADA" EN EL BLOG
  const blogListenButtons = document.querySelectorAll('.btn-listen-article');
  blogListenButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const article = this.closest('.blog-card') || this.closest('article');
      if (!article) return;
      const title = article.querySelector('.blog-title') ? article.querySelector('.blog-title').innerText : '';
      const content = article.querySelector('.blog-excerpt') ? article.querySelector('.blog-excerpt').innerText : '';
      const textToRead = `${title}. ${content}`;

      if (window.speakText) {
        window.speakText(textToRead);
        if (window.announceA11y) {
          window.announceA11y(`Leyendo entrada: ${title}`);
        }
      }
    });
  });

  // 4. BOTÓN "VOLVER ARRIBA"
  const backToTopBtn = document.getElementById('btn-back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTopBtn.style.display = 'inline-flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const firstHeading = document.querySelector('h1');
      if (firstHeading) firstHeading.focus();
    });
  }

})();
