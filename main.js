/* ═══════════════════════════════════════════════════════════════════
   Positive Misfits — main.js
   Handles: Lucide icons, AOS, dark mode, nav scroll, mobile menu,
            smooth-scroll, footer year
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 1. Lucide icons ─────────────────────────────────────────── */
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* ── 2. AOS — Animate on Scroll ─────────────────────────────── */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 650,
      once: true,
      offset: 60,
      easing: 'ease-out-cubic',
    });
  }

  /* ── 3. Dark Mode ────────────────────────────────────────────── */
  const html        = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');

  /**
   * Resolve initial theme:
   *  1. User's last saved preference (localStorage)
   *  2. OS/browser preference (prefers-color-scheme)
   *  3. Default: dark
   */
  function getInitialTheme() {
    const saved = localStorage.getItem('pm-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    return 'dark';
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('pm-theme', theme);
  }

  // Apply on load (before first paint to avoid flash)
  applyTheme(getInitialTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = html.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ── 4. Navbar scroll shadow ─────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  function onScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ── 5. Mobile menu ──────────────────────────────────────────── */
  const hamburger  = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay    = document.getElementById('mobile-menu-overlay');
  const closeBtn   = document.getElementById('mobile-menu-close');

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    overlay.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    overlay.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (hamburger)  hamburger.addEventListener('click', openMobileMenu);
  if (closeBtn)   closeBtn.addEventListener('click', closeMobileMenu);
  if (overlay)    overlay.addEventListener('click', closeMobileMenu);

  // Close mobile menu when any nav link is clicked
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  /* ── 6. Smooth scroll for in-page anchor links ───────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = navbar ? navbar.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ── 7. Footer year ──────────────────────────────────────────── */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
