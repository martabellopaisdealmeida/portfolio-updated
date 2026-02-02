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

    // Track mouse movement
    let mouseX = 0;
    let mouseY = 0;

    // Update mouse position and move cursor instantly
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Posiciona sem o translate(-50%, -50%) 
        cursor.style.left = (mouseX - 12.5) + 'px'; // 12.5 = metade de 25px
        cursor.style.top = (mouseY - 12.5) + 'px';
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
                    cursor.classList.add('hover');
                });
                
                element.addEventListener('mouseleave', function() {
                    cursor.classList.remove('hover');
                });
            });
        });
    }

    // Initialize hover effects
    addHoverEffects();

    // Re-initialize hover effects when new content is added (for dynamic content)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
                addHoverEffects();
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