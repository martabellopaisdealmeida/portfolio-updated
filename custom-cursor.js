// Custom Cursor JavaScript
document.addEventListener('DOMContentLoaded', function() {
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

    // Track mouse movement
    let mouseX = 0;
    let mouseY = 0;

    // Update mouse position and move cursor instantly
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Posiciona o cursor
        cursor.style.left = (mouseX - 10) + 'px';
        cursor.style.top = (mouseY - 10) + 'px';
    });
    
    // Define clickable elements
    const clickableSelectors = [
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
    ];

    // Add hover effects
    function addHoverEffects() {
        // Add hover effects
        clickableSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.addEventListener('mouseenter', function() {
                    // Don't add hover class if we're in a nav zone
                    if (!cursor.classList.contains('nav-arrow-left') && 
                        !cursor.classList.contains('nav-arrow-right')) {
                        cursor.classList.add('hover');
                    }
                });
                
                element.addEventListener('mouseleave', function() {
                    cursor.classList.remove('hover');
                });
            });
        });
    }

    // Initialize hover effects
    addHoverEffects();

    // Navigation zones hover effects
    function addNavigationZoneEffects() {
        const navZones = document.querySelectorAll('.nav-hover-zone');
        
        navZones.forEach((zone, index) => {
            const side = zone.classList.contains('left') ? 'left' : 'right';
            
            zone.addEventListener('mouseenter', function() {
                // Remove normal hover state
                cursor.classList.remove('hover');
                
                // Force immediate change - disable transitions temporarily
                cursor.style.transition = 'none';
                
                // Add arrow state based on zone side
                if (zone.classList.contains('left')) {
                    cursor.classList.add('nav-arrow-left');
                    cursor.innerHTML = arrowSVG;
                } else if (zone.classList.contains('right')) {
                    cursor.classList.add('nav-arrow-right');
                    cursor.innerHTML = arrowSVG;
                }
                
                // Force reflow
                cursor.offsetHeight;
                
                // Re-enable transitions for hover effects
                setTimeout(function() {
                    cursor.style.transition = '';
                }, 50);
            });
            
            zone.addEventListener('mouseleave', function() {
                // Force immediate change back
                cursor.style.transition = 'none';
                
                // Remove arrow states
                cursor.classList.remove('nav-arrow-left', 'nav-arrow-right');
                cursor.innerHTML = '';
                
                // Force reflow
                cursor.offsetHeight;
                
                // Re-enable transitions
                setTimeout(function() {
                    cursor.style.transition = '';
                }, 50);
            });
        });
    }

    // Initialize navigation zone effects
    // Try multiple times in case navigation loads after cursor
    let retryCount = 0;
    const maxRetries = 10;
    
    function tryInitNavZones() {
        const zones = document.querySelectorAll('.nav-hover-zone');
        if (zones.length > 0) {
            addNavigationZoneEffects();
        } else if (retryCount < maxRetries) {
            retryCount++;
            setTimeout(tryInitNavZones, 200);
        }
    }
    
    // Start trying to find navigation zones
    setTimeout(tryInitNavZones, 100);
    
    // Make it available globally for project-navigation.js
    window.addNavigationZoneEffects = addNavigationZoneEffects;

    // Re-initialize hover effects when new content is added (for dynamic content)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
                addHoverEffects();
                addNavigationZoneEffects();
            }
        });
    });

    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });

    // Show cursor when entering window
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
    });

    // Handle page visibility changes
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            cursor.style.opacity = '0';
        } else {
            cursor.style.opacity = '1';
        }
    });
});