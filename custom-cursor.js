// Custom Cursor JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Only initialize custom cursor on desktop devices
    if (window.innerWidth <= 768) {
        return; // Exit early on mobile/tablet
    }

    // Create cursor element
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    // SVG da seta para navegação - ORIGINAL com fundo laranja
    const arrowSVG = `<svg width="33" height="24" viewBox="0 0 33 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="33" height="24" fill="#000000"/>
<line x1="4" y1="12" x2="27" y2="12" stroke="white" stroke-width="6" stroke-linecap="round"/>
<line x1="20.0249" y1="7.65836" x2="28.6584" y2="11.9751" stroke="white" stroke-width="6" stroke-linecap="round"/>
<line x1="3" y1="-3" x2="12.6525" y2="-3" transform="matrix(0.894427 -0.447214 -0.447214 -0.894427 16 15)" stroke="white" stroke-width="6" stroke-linecap="round"/>
</svg>`;

    // Track mouse movement (passive — no layout reads, so it stays smooth)
    document.addEventListener('mousemove', function (e) {
        cursor.style.left = (e.clientX - 10) + 'px';
        cursor.style.top = (e.clientY - 10) + 'px';
    }, { passive: true });

    // Elements that should grow the cursor on hover
    const HOVER_SELECTOR = [
        'a',
        'button',
        'input[type="button"]',
        'input[type="submit"]',
        'input[type="reset"]',
        '.hover-target',
        '.search-icon',
        '.hamburger',
        '.grid-item',
        '.close-btn',
        '.nav-project',
        '.back-to-top-btn',
        '.footer-center',
        '.press-item',
        '.fact-item',
        '.suggestion-tag',
        '.search-result-item',
        '.fun-fact-tag',
        '.mobile-nav a',
        '.desktop-nav a',
        'label',
        'select',
        'textarea',
        '[role="button"]',
        '[tabindex="0"]'
    ].join(',');

    function setArrow(side) {
        cursor.classList.remove('hover');
        // Force immediate change - disable transitions temporarily
        cursor.style.transition = 'none';
        cursor.classList.add(side === 'left' ? 'nav-arrow-left' : 'nav-arrow-right');
        cursor.innerHTML = arrowSVG;
        cursor.offsetHeight; // force reflow
        setTimeout(function () { cursor.style.transition = ''; }, 50);
    }

    function clearArrow() {
        cursor.style.transition = 'none';
        cursor.classList.remove('nav-arrow-left', 'nav-arrow-right');
        cursor.innerHTML = '';
        cursor.offsetHeight; // force reflow
        setTimeout(function () { cursor.style.transition = ''; }, 50);
    }

    // Single delegated listener for the whole document. This replaces the old
    // per-element listeners + MutationObserver, which were re-scanning the page
    // (and re-binding handlers) every time the moodboard swapped an image.
    document.addEventListener('mouseover', function (e) {
        const zone = e.target.closest('.nav-hover-zone');
        if (zone) {
            setArrow(zone.classList.contains('left') ? 'left' : 'right');
            return;
        }
        if (e.target.closest(HOVER_SELECTOR)) {
            cursor.classList.add('hover');
        }
    });

    document.addEventListener('mouseout', function (e) {
        const zone = e.target.closest('.nav-hover-zone');
        if (zone && !(e.relatedTarget && zone.contains(e.relatedTarget))) {
            clearArrow();
        }
        const hot = e.target.closest(HOVER_SELECTOR);
        if (hot && !(e.relatedTarget && hot.contains(e.relatedTarget))) {
            cursor.classList.remove('hover');
        }
    });

    // Back-compat: other pages may still call this. Delegation already covers
    // nav zones, so this is now a no-op.
    window.addNavigationZoneEffects = function () {};

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', function () {
        cursor.style.opacity = '0';
    });

    // Show cursor when entering window
    document.addEventListener('mouseenter', function () {
        cursor.style.opacity = '1';
    });

    // Handle page visibility changes
    document.addEventListener('visibilitychange', function () {
        cursor.style.opacity = document.hidden ? '0' : '1';
    });
});