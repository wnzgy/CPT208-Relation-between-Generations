/**
 * TimeLens — Scroll Animations
 * Adds Apple-style reveal-on-scroll and parallax effects.
 * All animations respect prefers-reduced-motion.
 */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Reveal on scroll ─────────────────────────────────────────── */
  function initReveal() {
    if (prefersReduced) {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('revealed');
      });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) {
      io.observe(el);
    });
  }

  /* ── Staggered children ────────────────────────────────────────── */
  function initStagger() {
    document.querySelectorAll('.stagger-children').forEach(function (parent) {
      Array.from(parent.children).forEach(function (child, i) {
        child.style.transitionDelay = (i * 80) + 'ms';
        child.classList.add('reveal');
      });
    });
  }

  /* ── Nav scroll state ──────────────────────────────────────────── */
  function initNavScroll() {
    var nav = document.querySelector('nav');
    if (!nav) return;
    var tick = false;
    function update() {
      if (window.scrollY > 48) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
      tick = false;
    }
    window.addEventListener('scroll', function () {
      if (!tick) { requestAnimationFrame(update); tick = true; }
    }, { passive: true });
    update();
  }

  /* ── Subtle parallax on hero image ────────────────────────────── */
  function initParallax() {
    if (prefersReduced) return;
    var heroFrame = document.querySelector('.hero-photo-frame');
    if (!heroFrame) return;
    var tick = false;
    window.addEventListener('scroll', function () {
      if (!tick) {
        requestAnimationFrame(function () {
          var scrollY = window.scrollY;
          var img = heroFrame.querySelector('img');
          if (img) {
            img.style.transform = 'scale(1.06) translateY(' + (scrollY * 0.18) + 'px)';
          }
          tick = false;
        });
        tick = true;
      }
    }, { passive: true });
  }

  /* ── Number counter animation ──────────────────────────────────── */
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-target') || el.textContent);
    var suffix = el.getAttribute('data-suffix') || '';
    var decimals = (String(target).split('.')[1] || '').length;
    var start = 0;
    var duration = 1200;
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = start + (target - start) * eased;
      el.textContent = current.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    if (prefersReduced) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.kpi-value[data-target]').forEach(function (el) {
      io.observe(el);
    });
  }

  /* ── Smooth Anchor Scroll (for cross-page #hash) ───────────── */
  function initSmoothScrollLinks() {
    document.querySelectorAll('a[href^="#"], a[href^="index.html#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        var targetId = href.split('#')[1];
        if (targetId) {
          var targetElem = document.getElementById(targetId);
          if (targetElem) {
            e.preventDefault();
            history.pushState(null, null, '#' + targetId);
            targetElem.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  /* ── Active Nav Item by Scroll Position ──────────────────────── */
  function initNavHighlights() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-links a');
    if (sections.length === 0 || navLinks.length === 0) return;

    var tick = false;
    window.addEventListener('scroll', function() {
      if (!tick) {
        requestAnimationFrame(function() {
          var scrollY = window.scrollY;
          var currentId = '';
          var detectionOffset = 200; 
          
          sections.forEach(function(sec) {
            if (scrollY >= sec.offsetTop - detectionOffset) {
              currentId = sec.getAttribute('id');
            }
          });

          // Only apply dynamic highlighting if on index.html
          if (window.location.pathname.indexOf('index.html') !== -1 || window.location.pathname.endsWith('/portfolio/')) {
            navLinks.forEach(function(link) {
              var href = link.getAttribute('href');
              link.classList.remove('active');
              
              if (currentId && href.indexOf('#' + currentId) !== -1) {
                link.classList.add('active');
              } else if (!currentId && (href === 'index.html' || href === '#' || href === '')) {
                link.classList.add('active');
              }
            });
          }
          tick = false;
        });
        tick = true;
      }
    }, { passive: true });
  }

  /* ── Init ──────────────────────────────────────────────────────── */
  function init() {
    initStagger();
    initReveal();
    initNavScroll();
    initParallax();
    initCounters();
    initSmoothScrollLinks();
    initNavHighlights();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
