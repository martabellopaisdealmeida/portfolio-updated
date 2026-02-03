// Logo Font Randomizer - LIGHT VERSION
// Only thicker font variations: from -30 (closest to -50) to 100

document.addEventListener('DOMContentLoaded', function() {
  const logoText = document.querySelector('.logo-text');
  
  if (!logoText) return;

  // Only thicker Exposure variations: -30, 0, 30, 70, 100
  const fontVariations = [
    'exposure-30',
    'exposure0',
    'exposure30',
    'exposure70',
    'exposure100'
  ];

  // Store current class to remove it later
  let currentClass = 'exposure-30'; // Default is -30
  let fontsLoaded = false;

  // Wait for fonts to load before enabling animation
  document.fonts.ready.then(function() {
    fontsLoaded = true;
    console.log('Exposure fonts loaded (thicker version) - animation ready');
    
    // Apply default class immediately after fonts load
    logoText.classList.add(currentClass);
  });

  // Function to get random variation
  function getRandomVariation() {
    const randomIndex = Math.floor(Math.random() * fontVariations.length);
    return fontVariations[randomIndex];
  }

  // On hover: apply random font variation
  logoText.addEventListener('mouseenter', function() {
    if (!fontsLoaded) return; // Don't animate if fonts not loaded yet
    
    // Remove current class
    logoText.classList.remove(currentClass);
    
    // Get and apply new random variation immediately
    currentClass = getRandomVariation();
    logoText.classList.add(currentClass);
  });

  // On mouse leave: return to default (-30) immediately
  logoText.addEventListener('mouseleave', function() {
    if (!fontsLoaded) return; // Don't animate if fonts not loaded yet
    
    // Remove current class
    logoText.classList.remove(currentClass);
    
    // Return to default immediately
    currentClass = 'exposure-30';
    logoText.classList.add(currentClass);
  });

  console.log('Logo font randomizer initialized (thicker variations: -30 to 100)');
});