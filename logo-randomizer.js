// Logo Font Weight Change - Direct transition from -50 to 100
// On hover: goes directly to boldest weight (100)
// On leave: returns to default (-50)

document.addEventListener('DOMContentLoaded', function() {
  const logoText = document.querySelector('.logo-text');
  
  if (!logoText) return;

  // Default weight: -50
  const defaultClass = 'exposure-50';
  // Hover weight: 100 (boldest)
  const hoverClass = 'exposure100';
  
  let fontsLoaded = false;

  // Wait for fonts to load before enabling animation
  document.fonts.ready.then(function() {
    fontsLoaded = true;
    console.log('Exposure fonts loaded - direct transition ready (-50 → 100)');
    
    // Apply default class immediately after fonts load
    logoText.classList.add(defaultClass);
  });

  // On hover: go directly to boldest weight
  logoText.addEventListener('mouseenter', function() {
    if (!fontsLoaded) return; // Don't animate if fonts not loaded yet
    
    // Remove default and add bold
    logoText.classList.remove(defaultClass);
    logoText.classList.add(hoverClass);
  });

  // On mouse leave: return to default weight
  logoText.addEventListener('mouseleave', function() {
    if (!fontsLoaded) return; // Don't animate if fonts not loaded yet
    
    // Remove bold and return to default
    logoText.classList.remove(hoverClass);
    logoText.classList.add(defaultClass);
  });

  console.log('Logo font weight change initialized: -50 → 100 on hover');
});