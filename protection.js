// ============================================
// WEBSITE PROTECTION SCRIPT
// Dificulta (não previne 100%) roubo de código
// ============================================

(function() {
  'use strict';

  // ============================================
  // 1. DISABLE RIGHT-CLICK
  // ============================================
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  }, false);

  // ============================================
  // 2. DISABLE KEYBOARD SHORTCUTS
  // ============================================
  document.addEventListener('keydown', function(e) {
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    if (
      e.keyCode === 123 || // F12
      (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
      (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
      (e.ctrlKey && e.shiftKey && e.keyCode === 67) || // Ctrl+Shift+C
      (e.ctrlKey && e.keyCode === 85) || // Ctrl+U
      (e.metaKey && e.altKey && e.keyCode === 73) || // Cmd+Option+I (Mac)
      (e.metaKey && e.altKey && e.keyCode === 74) || // Cmd+Option+J (Mac)
      (e.metaKey && e.altKey && e.keyCode === 67) || // Cmd+Option+C (Mac)
      (e.metaKey && e.keyCode === 85) // Cmd+U (Mac)
    ) {
      e.preventDefault();
      return false;
    }
  }, false);

  // ============================================
  // 3. DISABLE TEXT SELECTION (backup CSS)
  // ============================================
  document.onselectstart = function() {
    return false;
  };

  // ============================================
  // 4. DISABLE DRAG & DROP IMAGES
  // ============================================
  document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
      return false;
    }
  }, false);

  // ============================================
  // 5. PROTECT IMAGES FROM SAVE
  // ============================================
  const images = document.querySelectorAll('img');
  images.forEach(function(img) {
    // Disable right-click on images
    img.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      return false;
    });
    
    // Add unselectable attribute
    img.setAttribute('draggable', 'false');
    img.style.pointerEvents = 'none';
    img.style.userSelect = 'none';
  });

  // ============================================
  // 6. DETECT DEVTOOLS OPEN
  // ============================================
  let devtoolsOpen = false;
  const threshold = 160;

  const detectDevTools = function() {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    if (widthThreshold || heightThreshold) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
        // Opcional: redirecionar ou mostrar mensagem
        // window.location.href = 'about:blank';
        console.clear();
        console.log('%c⚠️ Developer Tools Detected', 'color: red; font-size: 20px; font-weight: bold;');
        console.log('%cThis portfolio is protected. Please respect the creator\'s work.', 'color: orange; font-size: 14px;');
      }
    } else {
      devtoolsOpen = false;
    }
  };

  // Check periodically
  setInterval(detectDevTools, 500);

  // ============================================
  // 7. CLEAR CONSOLE PERIODICALLY
  // ============================================
  setInterval(function() {
    console.clear();
  }, 2000);

  // ============================================
  // 8. DISABLE COPY/PASTE
  // ============================================
  document.addEventListener('copy', function(e) {
    e.preventDefault();
    e.clipboardData.setData('text/plain', '© Marta Bello Pais de Almeida - All rights reserved');
    return false;
  });

  document.addEventListener('cut', function(e) {
    e.preventDefault();
    return false;
  });

  // ============================================
  // 9. CUSTOM CONSOLE MESSAGE
  // ============================================
  console.log('%c👋 Hey there!', 'color: #ED6D2E; font-size: 24px; font-weight: bold;');
  console.log('%cI see you\'re curious about how this portfolio works!', 'color: #333; font-size: 14px;');
  console.log('%c🚫 Please respect the work and time that went into creating this.', 'color: #999; font-size: 12px;');
  console.log('%c📧 If you want to hire me or collaborate: martinhabpa@gmail.com', 'color: #ED6D2E; font-size: 12px; font-weight: bold;');

  // ============================================
  // 10. WATERMARK OVERLAY (opcional)
  // ============================================
  function addWatermark() {
    const watermark = document.createElement('div');
    watermark.style.cssText = `
      position: fixed;
      bottom: 10px;
      right: 10px;
      font-size: 10px;
      color: rgba(0,0,0,0.3);
      pointer-events: none;
      z-index: 10000;
      user-select: none;
    `;
    watermark.textContent = '© Marta Bello Pais de Almeida 2025';
    document.body.appendChild(watermark);
  }

  // Add watermark when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addWatermark);
  } else {
    addWatermark();
  }

  // ============================================
  // 11. PREVENT IFRAME EMBEDDING
  // ============================================
  if (window.top !== window.self) {
    window.top.location = window.self.location;
  }

  // ============================================
  // 12. OBFUSCATE SOURCE ON INSPECT
  // ============================================
  // Re-apply image protection for dynamically loaded content
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.tagName === 'IMG') {
          node.setAttribute('draggable', 'false');
          node.style.pointerEvents = 'none';
          node.style.userSelect = 'none';
          node.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
          });
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();

// ============================================
// COPYRIGHT NOTICE
// ============================================
/*
 * © 2025 Marta Bello Pais de Almeida
 * All rights reserved.
 * 
 * This code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution
 * is strictly prohibited.
 * 
 * Contact: martinhabpa@gmail.com
 */