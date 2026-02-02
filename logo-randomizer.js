// Logo Font Randomizer - Changes Exposure font variation on each hover

document.addEventListener('DOMContentLoaded', function() {
  const logoText = document.querySelector('.logo-text');
  
  if (!logoText) return;

  // All 21 Exposure variations from -100 to +100 (steps of 10)
  const fontVariations = [
    'exposure-100', 'exposure-90', 'exposure-80', 'exposure-70', 'exposure-60',
    'exposure-50', 'exposure-40', 'exposure-30', 'exposure-20', 'exposure-10',
    'exposure0',
    'exposure10', 'exposure20', 'exposure30', 'exposure40', 'exposure50',
    'exposure60', 'exposure70', 'exposure80', 'exposure90', 'exposure100'
  ];

  // Store current class to remove it later
  let currentClass = 'exposure-50'; // Default is -50

  // Function to get random variation
  function getRandomVariation() {
    const randomIndex = Math.floor(Math.random() * fontVariations.length);
    return fontVariations[randomIndex];
  }

  // On hover: apply random font variation
  logoText.addEventListener('mouseenter', function() {
    // Remove current class
    logoText.classList.remove(currentClass);
    
    // Get and apply new random variation
    currentClass = getRandomVariation();
    logoText.classList.add(currentClass);
  });

  // On mouse leave: return to default (-50)
  logoText.addEventListener('mouseleave', function() {
    // Remove current class
    logoText.classList.remove(currentClass);
    
    // Return to default
    currentClass = 'exposure-50';
    logoText.classList.add(currentClass);
  });

  console.log('Logo font randomizer initialized with 21 variations');
});