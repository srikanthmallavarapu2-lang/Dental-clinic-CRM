/**
 * IVORY Dental Studio — Aurelia Clinical Experience Suite
 * Live Counter Animation, Real-time Clock, Dark/Light Mode, and Interaction Engine
 */

(function () {
  'use strict';

  // --- 1. LIGHT CLINICAL THEME (Zero Dark Mode) ---
  function initTheme() {
    applyTheme('light');
    localStorage.setItem('ivory-theme', 'light');

    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
      themeBtn.style.display = 'none'; // No dark toggle
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', 'light');
    document.body.classList.remove('dark');
  }

  // --- 2. LIVE REAL-TIME CLOCK ---
  function initLiveClock() {
    const clockEl = document.getElementById('liveClock');
    if (!clockEl) return;

    function update() {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
      clockEl.textContent = `Live Clinic Time: ${timeStr} · Open`;
    }
    update();
    setInterval(update, 1000);
  }

  // --- 3. ANIMATED NUMBER COUNTERS ---
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-count'));
          const suffix = el.getAttribute('data-suffix') || '';
          const dec = parseInt(el.getAttribute('data-dec') || '0', 10);
          animateCount(el, target, suffix, dec);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));
  }

  function animateCount(el, target, suffix, dec) {
    let start = 0;
    const duration = 1600;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      const current = start + (target - start) * ease;

      el.textContent = (dec > 0 ? current.toFixed(dec) : Math.round(current)) + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  // --- 4. BACK TO TOP BUTTON ---
  function initBackToTop() {
    const toTopBtn = document.getElementById('toTop');
    if (!toTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        toTopBtn.classList.add('show');
      } else {
        toTopBtn.classList.remove('show');
      }
    });

    toTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 5. MOBILE MENU ---
  function initMobileMenu() {
    const burger = document.getElementById('burger');
    const menu = document.getElementById('mobileMenu');
    const close = document.getElementById('menuClose');

    if (burger && menu) {
      burger.addEventListener('click', () => menu.classList.add('open'));
    }
    if (close && menu) {
      close.addEventListener('click', () => menu.classList.remove('open'));
    }
    if (menu) {
      menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => menu.classList.remove('open'));
      });
    }
  }

  // --- 6. AUTO ROTATE TESTIMONIALS ---
  function initTestimonialsCarousel() {
    const cards = document.querySelectorAll('.aurelia-test-card');
    if (cards.length <= 1) return;

    let index = 0;
    const prevBtn = document.getElementById('tPrev');
    const nextBtn = document.getElementById('tNext');

    function show(i) {
      cards.forEach((c, idx) => {
        c.style.display = (idx === i) ? 'block' : 'none';
      });
    }
    show(0);

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        index = (index + 1) % cards.length;
        show(index);
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        index = (index - 1 + cards.length) % cards.length;
        show(index);
      });
    }

    // Auto rotate every 6 seconds
    setInterval(() => {
      index = (index + 1) % cards.length;
      show(index);
    }, 6000);
  }

  // Initialize all on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initTheme();
      initLiveClock();
      initCounters();
      initBackToTop();
      initMobileMenu();
      initTestimonialsCarousel();
    });
  } else {
    initTheme();
    initLiveClock();
    initCounters();
    initBackToTop();
    initMobileMenu();
    initTestimonialsCarousel();
  }
})();
