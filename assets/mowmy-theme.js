class MowmyTheme {
  constructor() {
    this.body = document.body;
    this.bindDrawers();
    this.bindAccordions();
    this.bindQuantity();
    this.bindQuickAdd();
    this.bindProductGallery();
    this.bindHeroSliders();
    this.bindReveals();
    this.bindCollectionControls();
  }

  openDrawer(drawer) {
    if (!drawer) return;
    drawer.hidden = false;
    requestAnimationFrame(() => drawer.classList.add('is-open'));
    this.body.classList.add('drawer-open');
    drawer.querySelector('button, input, a')?.focus();
  }

  closeDrawer(drawer) {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    this.body.classList.remove('drawer-open');
    setTimeout(() => { drawer.hidden = true; }, 280);
  }

  bindDrawers() {
    document.addEventListener('click', (event) => {
      const opener = event.target.closest('[data-drawer-open]');
      const closer = event.target.closest('[data-drawer-close]');
      if (opener) {
        event.preventDefault();
        this.openDrawer(document.getElementById(opener.dataset.drawerOpen));
      }
      if (closer) this.closeDrawer(closer.closest('.mt-drawer'));
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') document.querySelectorAll('.mt-drawer.is-open').forEach((drawer) => this.closeDrawer(drawer));
    });
  }

  bindAccordions() {
    document.querySelectorAll('.mt-accordion details').forEach((details) => {
      details.addEventListener('toggle', () => {
        if (!details.open) return;
        details.parentElement.querySelectorAll('details[open]').forEach((item) => {
          if (item !== details) item.open = false;
        });
      });
    });
  }

  bindQuantity() {
    document.addEventListener('click', (event) => {
      const button = event.target.closest('[data-quantity-change]');
      if (!button) return;
      const input = button.parentElement.querySelector('input[type="number"]');
      if (!input) return;
      const step = Number(button.dataset.quantityChange);
      input.value = Math.max(Number(input.min || 0), Number(input.value || 0) + step);
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  bindQuickAdd() {
    document.addEventListener('submit', async (event) => {
      const form = event.target.closest('[data-ajax-cart-form]');
      if (!form) return;
      event.preventDefault();
      const button = form.querySelector('[type="submit"]');
      button?.setAttribute('aria-busy', 'true');
      try {
        const response = await fetch('/cart/add.js', { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
        if (!response.ok) throw new Error('Unable to add this item.');
        const cart = await fetch('/cart.js').then((result) => result.json());
        document.querySelectorAll('[data-cart-count]').forEach((count) => { count.textContent = cart.item_count; count.hidden = false; });
        this.showToast('Added to your bag');
        window.setTimeout(() => window.location.assign('/cart'), 700);
      } catch (error) {
        this.showToast(error.message);
      } finally {
        button?.removeAttribute('aria-busy');
      }
    });
  }

  bindProductGallery() {
    document.addEventListener('click', (event) => {
      const thumb = event.target.closest('[data-gallery-thumb]');
      if (!thumb) return;
      const gallery = thumb.closest('[data-product-gallery]');
      gallery.querySelectorAll('[data-gallery-image]').forEach((image) => image.hidden = image.dataset.galleryImage !== thumb.dataset.galleryThumb);
      gallery.querySelectorAll('[data-gallery-thumb]').forEach((item) => item.classList.toggle('is-active', item === thumb));
    });
  }

  bindHeroSliders() {
    document.querySelectorAll('[data-hero-slider]').forEach((slider) => {
      const slides = [...slider.querySelectorAll('[data-hero-slide]')];
      if (slides.length < 2) return;
      const controls = slider.closest('[data-hero-section]') || slider;
      let index = 0;
      const show = (next) => {
        index = (next + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === index));
        controls.querySelectorAll('[data-slide-dot]').forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === index));
      };
      controls.querySelectorAll('[data-slide-dot]').forEach((dot, dotIndex) => dot.addEventListener('click', () => show(dotIndex)));
      window.setInterval(() => show(index + 1), 5200);
    });
  }

  bindReveals() {
    const items = document.querySelectorAll('.mt-reveal');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08, rootMargin: '0px 0px -40px' });
    items.forEach((item) => observer.observe(item));
  }

  bindCollectionControls() {
    document.querySelectorAll('[data-auto-submit]').forEach((input) => input.addEventListener('change', () => input.form.submit()));
  }

  showToast(message) {
    const toast = document.querySelector('[data-toast]');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    setTimeout(() => toast.classList.remove('is-visible'), 2600);
  }
}

document.addEventListener('DOMContentLoaded', () => new MowmyTheme());
