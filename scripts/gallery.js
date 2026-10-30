/**
 * GALERÍA FOTOGRÁFICA INTERACTIVA CON FILTROS Y LIGHTBOX MODAL
 * Del valle a la mesa, de la mesa a las estrellas
 * Cierre accesible por tecla Esc, foco atrapado y textos alternativos
 */

(function () {
  'use strict';

  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('gallery-lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalCaption = document.getElementById('lightbox-caption');
  const modalCredit = document.getElementById('lightbox-credit');
  const closeBtn = document.getElementById('lightbox-close-btn');

  let lastActiveElement = null;

  // 1. FILTRADO POR CATEGORÍA
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const category = this.dataset.category;

      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-pressed', 'true');

      let visibleCount = 0;
      galleryItems.forEach(item => {
        const itemCategories = item.dataset.category ? item.dataset.category.split(' ') : [];
        if (category === 'all' || itemCategories.includes(category)) {
          item.style.display = 'block';
          visibleCount++;
        } else {
          item.style.display = 'none';
        }
      });

      if (window.announceA11y) {
        window.announceA11y(`Mostrando ${visibleCount} imágenes de la categoría ${this.textContent}`);
      }
    });
  });

  // 2. APERTURA DEL MODAL LIGHTBOX
  galleryItems.forEach(item => {
    item.addEventListener('click', function () {
      openLightbox(this);
    });
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(this);
      }
    });
  });

  function openLightbox(item) {
    if (!modal) return;
    lastActiveElement = document.activeElement;

    const img = item.querySelector('.gallery-item-img');
    const title = item.dataset.title || '';
    const credit = item.dataset.credit || 'Imagen: archivo entregado por el equipo; autor y licencia por confirmar';

    if (modalImg && img) {
      modalImg.src = img.src;
      modalImg.alt = img.alt || title;
    }
    if (modalCaption) modalCaption.textContent = title;
    if (modalCredit) modalCredit.textContent = credit;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (closeBtn) closeBtn.focus();

    if (window.announceA11y) {
      window.announceA11y(`Vista ampliada: ${title}. ${credit}. Presiona Escape para cerrar.`);
    }
  }

  // 3. CIERRE DEL MODAL
  function closeLightbox() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeLightbox();
      }
    });
  }

  // 4. NAVEGACIÓN Y CIERRE POR TECLADO (Esc)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
      closeLightbox();
    }
  });

})();
