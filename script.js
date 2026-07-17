
// Inspo Page Script - Following homepage-script.js structure

document.addEventListener("DOMContentLoaded", function () {
  console.log("Inspo page script loading...")

  // Mobile menu functionality - COMMENTED OUT
  /*
  const hamburger = document.querySelector(".hamburger")
  const mobileNav = document.querySelector(".mobile-nav")
  const closeBtn = document.querySelector(".close-btn")

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.add("active")
      mobileNav.classList.add("active")
      document.body.style.overflow = "hidden"
    })
  }

  if (closeBtn && mobileNav) {
    closeBtn.addEventListener("click", function () {
      hamburger.classList.remove("active")
      mobileNav.classList.remove("active")
      document.body.style.overflow = ""
    })
  }

  // Close mobile menu when clicking outside
  if (mobileNav) {
    mobileNav.addEventListener("click", function (e) {
      if (e.target === mobileNav) {
        hamburger.classList.remove("active")
        mobileNav.classList.remove("active")
        document.body.style.overflow = ""
      }
    })
  }
  */

  // Search functionality - Adapter for new design
  // The search.js looks for .search-icon, but inspo design uses .search-text
  // So we add listeners here for both opening and closing
  const searchContainer = document.querySelector(".search-container")
  const searchOverlay = document.querySelector(".search-overlay")
  const searchClose = document.querySelector(".search-close")
  const searchInput = document.querySelector(".search-input")
  
  // Open search overlay
  if (searchContainer && searchOverlay) {
    searchContainer.addEventListener("click", function () {
      searchOverlay.classList.add("active")
      if (searchInput) {
        searchInput.focus()
      }
      document.body.style.overflow = "hidden"
    })
  }

  // Close search overlay
  function closeSearchOverlay() {
    if (searchOverlay) {
      searchOverlay.classList.remove("active")
      if (searchInput) {
        searchInput.value = ""
      }
      const searchResults = document.querySelector(".search-results")
      if (searchResults) {
        searchResults.innerHTML = ""
      }
      document.body.style.overflow = ""
    }
  }

  // Close button
  if (searchClose) {
    searchClose.addEventListener("click", closeSearchOverlay)
  }

  // Close with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && searchOverlay && searchOverlay.classList.contains("active")) {
      closeSearchOverlay()
    }
  })

  // Close when clicking outside
  if (searchOverlay) {
    searchOverlay.addEventListener("click", function (e) {
      if (e.target === searchOverlay) {
        closeSearchOverlay()
      }
    })
  }

  // Custom cursor hover effect for search-text
  // Since custom-cursor.js doesn't include .search-text in its selectors
  const searchText = document.querySelector(".search-text")
  const customCursor = document.querySelector(".custom-cursor")
  
  if (searchText && customCursor) {
    searchText.addEventListener("mouseenter", function () {
      customCursor.classList.add("hover")
    })
    
    searchText.addEventListener("mouseleave", function () {
      customCursor.classList.remove("hover")
    })
  }

  // Dark Mode Toggle Functionality
  const toggleSwitch = document.querySelector(".tomato-toggle")
  const body = document.body
  

  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem("theme") || "light"
  
  // Apply saved theme
  if (currentTheme === "dark") {
    body.classList.add("dark-mode")
  }

  // Toggle theme on click
  if (toggleSwitch) {
    toggleSwitch.addEventListener("click", function () {
      body.classList.toggle("dark-mode")
      
      // Save preference
      const theme = body.classList.contains("dark-mode") ? "dark" : "light"
      localStorage.setItem("theme", theme)
    })
  }

  // Grid/Images animations - ONLY if GSAP is loaded
  function initializeAnimations({ skip = false }) {
    if (!skip && typeof gsap !== "undefined" && gsap.from) {
      try {
        gsap.from(".inspo-item", {
          duration: 0.4,
          y: 50,
          opacity: 0,
          stagger: 0.1,
          ease: "power2.out",
        })
        gsap.to(".inspo-item", {
          duration: 0.4,
          y: -50,
          opacity: 1,
          stagger: 0.1,
          ease: "power2.out",
        })
        console.log("GSAP animations initialized for inspo items")
      } catch (error) {
        console.log("GSAP animation failed, using fallback:", error)
        fallbackAnimation()
      }
    } else {
      console.log("GSAP not available, using fallback animation")
      fallbackAnimation()
    }
  }

  // Fallback animation without GSAP
  function fallbackAnimation() {
    // Simple fade-in could be added here if needed
    // For now, keeping it minimal like homepage-script.js
  }

  // Initialize animations after a short delay
  setTimeout(
    () =>
      initializeAnimations({
        skip: true, // Set to false if you want GSAP animations
      }),
    100
  )

  console.log("Inspo page script loaded successfully")
})

// Note: Search functionality (open/close/escape) is handled above
// Note: Search results/suggestions are handled by search.js
// Note: Custom cursor is handled by custom-cursor.js
// Note: Dark mode toggle is handled above

/* ============================================================
   Mobile video autoplay nudge
   Some mobile browsers refuse the initial muted autoplay. We
   re-assert muted + playsinline and call play() on load and on
   the first user gesture so hero/grid videos actually animate.
   ============================================================ */
(function () {
  function kickVideos() {
    document.querySelectorAll("video").forEach(function (v) {
      v.muted = true;
      v.setAttribute("muted", "");
      v.playsInline = true;
      v.setAttribute("playsinline", "");
      var p = v.play();
      if (p && typeof p.catch === "function") p.catch(function () {});
    });
  }
  document.addEventListener("DOMContentLoaded", kickVideos);
  window.addEventListener("load", kickVideos);
  ["touchstart", "pointerdown", "click", "scroll"].forEach(function (ev) {
    window.addEventListener(ev, kickVideos, { once: true, passive: true });
  });
})();

/* ============================================================
   Project image gallery / lightbox
   Click any project image (or video) to open it full-screen,
   with prev/next navigation. Auto-enabled on every project page.
   ============================================================ */
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var selector =
      ".project-container .grid-item img, .project-container .grid-item video, .project-hero img, .project-hero video";
    var nodes = Array.prototype.slice.call(document.querySelectorAll(selector));
    if (!nodes.length) return;

    function mediaSrc(el) {
      if (el.tagName === "IMG") return el.currentSrc || el.src;
      if (el.tagName === "VIDEO") {
        if (el.currentSrc) return el.currentSrc;
        if (el.src) return el.src;
        var s = el.querySelector("source");
        return s ? s.src : "";
      }
      return "";
    }

    var items = [];
    nodes.forEach(function (el) {
      var src = mediaSrc(el);
      if (!src) return;
      items.push({ type: el.tagName === "VIDEO" ? "video" : "image", src: src });
      el.style.cursor = "zoom-in";
      el.dataset.lbIndex = String(items.length - 1);
      el.addEventListener("click", function () {
        open(parseInt(el.dataset.lbIndex, 10));
      });
    });
    if (!items.length) return;

    // ---- build overlay ----
    var style = document.createElement("style");
    style.textContent =
      ".mbpa-lb{position:fixed;inset:0;z-index:99999;display:none;align-items:center;justify-content:center;" +
      "background:rgba(0,0,0,.92);opacity:0;transition:opacity .25s ease;}" +
      ".mbpa-lb.open{display:flex;opacity:1;}" +
      ".mbpa-lb .mbpa-media{max-width:92vw;max-height:88vh;display:block;object-fit:contain;" +
      "box-shadow:0 10px 60px rgba(0,0,0,.5);}" +
      ".mbpa-lb button{position:absolute;background:none;border:none;color:#fff;cursor:pointer;" +
      "font-family:sans-serif;line-height:1;-webkit-tap-highlight-color:transparent;}" +
      ".mbpa-lb .mbpa-close{top:18px;right:24px;font-size:34px;}" +
      ".mbpa-lb .mbpa-nav{top:50%;transform:translateY(-50%);font-size:48px;padding:12px 18px;opacity:.75;}" +
      ".mbpa-lb .mbpa-nav:hover{opacity:1;}" +
      ".mbpa-lb .mbpa-prev{left:12px;} .mbpa-lb .mbpa-next{right:12px;}" +
      ".mbpa-lb .mbpa-count{position:absolute;bottom:20px;left:0;right:0;text-align:center;color:#fff;" +
      "font-family:'ABCDiatypeMono',monospace;font-size:12px;opacity:.7;}" +
      "@media(max-width:768px){.mbpa-lb .mbpa-nav{font-size:34px;padding:8px 10px;}.mbpa-lb .mbpa-close{font-size:30px;top:14px;right:16px;}}";
    document.head.appendChild(style);

    var overlay = document.createElement("div");
    overlay.className = "mbpa-lb";
    overlay.setAttribute("role", "dialog");
    overlay.innerHTML =
      '<button class="mbpa-close" aria-label="Close">&times;</button>' +
      '<button class="mbpa-nav mbpa-prev" aria-label="Previous">&#8249;</button>' +
      '<button class="mbpa-nav mbpa-next" aria-label="Next">&#8250;</button>' +
      '<div class="mbpa-stage"></div>' +
      '<div class="mbpa-count"></div>';
    document.body.appendChild(overlay);

    var stage = overlay.querySelector(".mbpa-stage");
    var count = overlay.querySelector(".mbpa-count");
    var current = 0;
    var single = items.length < 2;
    if (single) {
      overlay.querySelector(".mbpa-prev").style.display = "none";
      overlay.querySelector(".mbpa-next").style.display = "none";
    }

    function render() {
      var it = items[current];
      stage.innerHTML = "";
      var node;
      if (it.type === "video") {
        node = document.createElement("video");
        node.src = it.src;
        node.controls = true;
        node.autoplay = true;
        node.muted = true;
        node.loop = true;
        node.playsInline = true;
      } else {
        node = document.createElement("img");
        node.src = it.src;
        node.alt = "";
      }
      node.className = "mbpa-media";
      stage.appendChild(node);
      count.textContent = single ? "" : current + 1 + " / " + items.length;
    }

    function open(i) {
      current = i;
      render();
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function close() {
      overlay.classList.remove("open");
      stage.innerHTML = "";
      document.body.style.overflow = "";
    }
    function go(dir) {
      current = (current + dir + items.length) % items.length;
      render();
    }

    overlay.querySelector(".mbpa-close").addEventListener("click", close);
    overlay.querySelector(".mbpa-prev").addEventListener("click", function (e) {
      e.stopPropagation();
      go(-1);
    });
    overlay.querySelector(".mbpa-next").addEventListener("click", function (e) {
      e.stopPropagation();
      go(1);
    });
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay || e.target === stage) close();
    });
    document.addEventListener("keydown", function (e) {
      if (!overlay.classList.contains("open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft" && !single) go(-1);
      else if (e.key === "ArrowRight" && !single) go(1);
    });

    // Swipe navigation on touch devices
    var touchX = null;
    overlay.addEventListener("touchstart", function (e) {
      touchX = e.changedTouches[0].clientX;
    }, { passive: true });
    overlay.addEventListener("touchend", function (e) {
      if (touchX === null || single) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
      touchX = null;
    }, { passive: true });
  });
})();