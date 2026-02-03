// Logo Font Weight Animation - Smooth transition from -50 to 100
// On hover: animates smoothly through font weights to 100
// On leave: animates smoothly back to -50

document.addEventListener('DOMContentLoaded', function() {
  const logoText = document.querySelector('.logo-text');
  
  if (!logoText) return;

  // Font weight sequence for smooth animation
  // Using available weights: -70, -30, 0, 30, 70, 100
  const weightSequence = [
    'exposure-70',   // closest to -50 (default)
    'exposure-30',
    'exposure0',
    'exposure30',
    'exposure70',
    'exposure100'    // boldest
  ];

  let currentIndex = 0;  // Start at -70 (closest to -50)
  let targetIndex = 0;   // Target index to animate to
  let isAnimating = false;
  let animationFrame = null;
  let fontsLoaded = false;

  // Wait for fonts to load
  document.fonts.ready.then(function() {
    fontsLoaded = true;
    console.log('Exposure fonts loaded - smooth animation ready');
    
    // Apply default weight
    logoText.classList.add(weightSequence[currentIndex]);
  });

  // Animation function - steps through weights smoothly
  function animateWeight() {
    if (currentIndex === targetIndex) {
      isAnimating = false;
      return;
    }

    // Remove current class
    logoText.classList.remove(weightSequence[currentIndex]);

    // Move towards target (forward or backward)
    if (currentIndex < targetIndex) {
      currentIndex++;
    } else {
      currentIndex--;
    }

    // Add new class
    logoText.classList.add(weightSequence[currentIndex]);

    // Continue animation
    animationFrame = setTimeout(() => {
      requestAnimationFrame(animateWeight);
    }, 60); // ~60ms between steps = smooth animation
  }

  // Start animation to target index
  function startAnimation(newTargetIndex) {
    if (!fontsLoaded) return;
    
    // Cancel any ongoing animation
    if (animationFrame) {
      clearTimeout(animationFrame);
    }

    targetIndex = newTargetIndex;
    
    if (currentIndex !== targetIndex) {
      isAnimating = true;
      animateWeight();
    }
  }

  // On hover: animate to boldest (index 5 = 100)
  logoText.addEventListener('mouseenter', function() {
    startAnimation(weightSequence.length - 1);
  });

  // On mouse leave: animate back to default (index 0 = -70)
  logoText.addEventListener('mouseleave', function() {
    startAnimation(0);
  });

  console.log('Logo smooth animation initialized: -70 ↔ 100');
});