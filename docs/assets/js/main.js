document.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('hero');
  const about = document.getElementById('about');
  const spotlight = document.getElementById('gridSpotlight');
  const form = document.querySelector('.contact-form');

  function createScrollHandler() {
    if (!hero) return null;

    let heroThreshold = hero.offsetHeight * 0.35;
    let aboutThreshold = Infinity;
    let ticking = false;

    function measureThresholds() {
      heroThreshold = hero.offsetHeight * 0.35;
      if (about) {
        const top = about.getBoundingClientRect().top + window.scrollY;
        aboutThreshold = top - window.innerHeight * 0.42;
      }
    }

    function updateBodyClasses() {
      const y = window.scrollY;
      document.body.classList.toggle('scrolled', y > heroThreshold);
      document.body.classList.toggle('at-about', about && y > aboutThreshold);
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateBodyClasses();
          ticking = false;
        });
        ticking = true;
      }
    }

    measureThresholds();
    updateBodyClasses();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      measureThresholds();
      updateBodyClasses();
    });
    window.addEventListener('load', () => {
      measureThresholds();
      updateBodyClasses();
    });

    return onScroll;
  }

  function createSpotlight() {
    if (!hero || !spotlight) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(hover: none)').matches) {
      return;
    }

    let targetX = 50;
    let targetY = -20;
    let curX = 50;
    let curY = -20;
    let active = false;

    function loop() {
      curX += (targetX - curX) * 0.16;
      curY += (targetY - curY) * 0.16;
      document.documentElement.style.setProperty('--mx', curX + '%');
      document.documentElement.style.setProperty('--my', curY + '%');
      window.requestAnimationFrame(loop);
    }

    window.requestAnimationFrame(loop);

    hero.addEventListener('pointermove', (e) => {
      const rect = hero.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 100;
      targetY = ((e.clientY - rect.top) / rect.height) * 100;
      if (!active) {
        active = true;
        spotlight.style.opacity = '1';
      }
    });

    hero.addEventListener('pointerleave', () => {
      active = false;
      spotlight.style.opacity = '0';
    });
  }

  function initContactForm() {
    if (!form) return;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      window.alert("Thank you for reaching out! We'll get back to you shortly.");
    });
  }

  createScrollHandler();
  createSpotlight();
  initContactForm();
});