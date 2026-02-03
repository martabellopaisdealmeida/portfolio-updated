// Inspo Page Script - Following homepage-script.js structure

document.addEventListener("DOMContentLoaded", function () {
  console.log("Inspo page script loading...")

  // Dark Mode Toggle
  const themeToggle = document.querySelector(".theme-toggle")
  const body = document.body
  
  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem("theme") || "light"
  body.classList.add(currentTheme + "-mode")
  
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      if (body.classList.contains("light-mode")) {
        body.classList.remove("light-mode")
        body.classList.add("dark-mode")
        localStorage.setItem("theme", "dark")
      } else {
        body.classList.remove("dark-mode")
        body.classList.add("light-mode")
        localStorage.setItem("theme", "light")
      }
    })
  }

  // Mobile menu functionality - Same logic as homepage-script.js
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