/* ============================================================
   gallery.js
   1) Robust mobile video autoplay (iOS/Android often block
      inline <video autoplay> — force play + retry on interaction)
   2) Click-to-zoom lightbox gallery for project images
   ============================================================ */

(function () {
  'use strict';

  /* ---------------- 1. VIDEO AUTOPLAY ---------------- */

  function primeVideos() {
    var videos = document.querySelectorAll('video[autoplay]');
    videos.forEach(function (v) {
      // Attributes required for inline autoplay on mobile browsers
      v.muted = true;
      v.defaultMuted = true;
      v.setAttribute('muted', '');
      v.setAttribute('playsinline', '');
      v.setAttribute('webkit-playsinline', '');
      var attempt = v.play();
      if (attempt && typeof attempt.catch === 'function') {
        attempt.catch(function () { /* will retry on interaction / visibility */ });
      }
    });
  }

  function retryPlay() {
    document.querySelectorAll('video[autoplay]').forEach(function (v) {
      if (v.paused) {
        var p = v.play();
        if (p && typeof p.catch === 'function') p.catch(function () {});
      }
    });
  }

  function initVideoAutoplay() {
    primeVideos();

    // Retry once media data is available
    document.querySelectorAll('video[autoplay]').forEach(function (v) {
      v.addEventListener('loadeddata', function () { retryPlay(); });
    });

    // Retry on first user interaction (covers browsers that gate autoplay)
    ['touchstart', 'pointerdown', 'click', 'scroll'].forEach(function (evt) {
      window.addEventListener(evt, retryPlay, { once: true, passive: true });
    });

    // Play only when visible (saves battery, and re-triggers if it stalled)
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var v = entry.target;
          if (entry.isIntersecting) {
            if (v.paused) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
          }
        });
      }, { threshold: 0.1 });
      document.querySelectorAll('video[autoplay]').forEach(function (v) { io.observe(v); });
    }
  }

  /* ---------------- 2. LIGHTBOX ---------------- */

  var overlay, figureImg, counterEl;
  var items = [];      // array of {src, alt}
  var current = 0;

  function collectItems() {
    var nodeList = document.querySelectorAll(
      '.photo-grid .grid-item img, .grid-item.capa img, .project-hero img'
    );
    items = [];
    nodeList.forEach(function (img) {
      // Skip logos / title marks inside the header
      if (img.closest('.project-header')) return;
      items.push(img);
    });
  }

  function buildOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML =
      '<button class="lightbox-btn lightbox-close" aria-label="Close">\u2715</button>' +
      '<button class="lightbox-btn lightbox-prev" aria-label="Previous">\u2039</button>' +
      '<button class="lightbox-btn lightbox-next" aria-label="Next">\u203A</button>' +
      '<figure class="lightbox-figure"><img alt=""></figure>' +
      '<div class="lightbox-counter"></div>';
    document.body.appendChild(overlay);

    figureImg = overlay.querySelector('.lightbox-figure img');
    counterEl = overlay.querySelector('.lightbox-counter');

    // Neutralise protection.js (which sets pointer-events:none on <img>)
    figureImg.style.pointerEvents = 'none';

    overlay.addEventListener('click', function (e) {
      if (e.target.closest('.lightbox-next')) { e.stopPropagation(); show(current + 1); return; }
      if (e.target.closest('.lightbox-prev')) { e.stopPropagation(); show(current - 1); return; }
      // Any other click (backdrop, close button, image area) closes
      close();
    });

    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') show(current + 1);
      else if (e.key === 'ArrowLeft') show(current - 1);
    });
  }

  function show(index) {
    if (!items.length) return;
    current = (index + items.length) % items.length;
    var img = items[current];
    figureImg.src = img.currentSrc || img.src;
    figureImg.alt = img.alt || '';
    counterEl.textContent = (current + 1) + ' / ' + items.length;
    var multiple = items.length > 1;
    overlay.querySelector('.lightbox-prev').style.display = multiple ? '' : 'none';
    overlay.querySelector('.lightbox-next').style.display = multiple ? '' : 'none';
    counterEl.style.display = multiple ? '' : 'none';
  }

  function open(img) {
    collectItems();
    var idx = items.indexOf(img);
    if (idx === -1) return;
    show(idx);
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function initLightbox() {
    // Nothing to zoom on pages without project media
    if (!document.querySelector('.photo-grid, .project-hero, .grid-item.capa')) return;

    buildOverlay();

    // Delegate clicks. Images have pointer-events:none on protected pages,
    // so we resolve the image from the clicked cell instead.
    document.addEventListener('click', function (e) {
      if (overlay.classList.contains('open')) return;
      var cell = e.target.closest('.grid-item, .project-hero');
      if (!cell) return;
      // Ignore cells that are actually links (e.g. work grid) or contain iframes/videos only
      if (cell.closest('a')) return;
      var img = cell.tagName === 'IMG' ? cell : cell.querySelector('img');
      if (!img) return;
      if (img.closest('.project-header')) return;
      open(img);
    });
  }

  /* ---------------- INIT ---------------- */

  function init() {
    initVideoAutoplay();
    initLightbox();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
