// Project Navigation System - Enhanced Version with SVG
document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // CONFIGURAÇÃO - Atualiza com os teus projetos
  // ============================================
  const projects = [
    { name: 'A Arte da Mesa', url: 'A-Arte-da-Mesa.html' },
    { name: 'Spread Education, Spread Love', url: 'project.html' },
    { name: 'Mariana & Felipe', url: 'Mariana&Felipe.html' },
    { name: 'Underground', url: 'Underground.html' },
    { name: 'FALP', url: 'falp.html' },
    { name: 'MODUS', url: 'modus.html' },
    { name: 'PAEZ', url: 'paez.html' },
    { name: 'fyted', url: 'fyted.html' }
  ];

  // ============================================
  // DETECÇÃO DO PROJETO ATUAL
  // ============================================
  const currentUrl = window.location.pathname.split('/').pop();
  const currentIndex = projects.findIndex(p => p.url === currentUrl);

  // Só ativa navegação se estivermos numa página de projeto
  if (currentIndex === -1) {
    return;
  }

  // ============================================
  // CÁLCULO DOS PROJETOS ANTERIOR E SEGUINTE
  // ============================================
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1;
  const nextIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;
  const prevProject = projects[prevIndex];
  const nextProject = projects[nextIndex];

  // ============================================
  // SCROLL DETECTION - Hide when at top
  // ============================================
  function checkScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop < 100) {
      document.body.classList.add('at-top');
    } else {
      document.body.classList.remove('at-top');
    }
  }

  // Check on load and scroll
  checkScroll();
  window.addEventListener('scroll', checkScroll);

  // ============================================
  // CRIAR ELEMENTOS DE NAVEGAÇÃO
  // ============================================
  createProjectNavigation(prevProject, nextProject);

  function createProjectNavigation(prev, next) {
    // Criar zona de hover esquerda (projeto anterior)
    if (prev) {
      const leftZone = document.createElement('div');
      leftZone.className = 'nav-hover-zone left';
      leftZone.setAttribute('aria-label', 'Clique para navegar para: ' + prev.name);
      leftZone.setAttribute('data-project-name', prev.name);
      document.body.appendChild(leftZone);

      // Click na zona navega
      leftZone.addEventListener('click', function() {
        navigateToProject(prev.url);
      });
    }

    // Criar zona de hover direita (projeto seguinte)
    if (next) {
      const rightZone = document.createElement('div');
      rightZone.className = 'nav-hover-zone right';
      rightZone.setAttribute('aria-label', 'Clique para navegar para: ' + next.name);
      rightZone.setAttribute('data-project-name', next.name);
      document.body.appendChild(rightZone);

      // Click na zona navega
      rightZone.addEventListener('click', function() {
        navigateToProject(next.url);
      });
    }

    // Notify custom cursor to add navigation zone effects
    if (typeof window.addNavigationZoneEffects === 'function') {
      window.addNavigationZoneEffects();
    }
  }

  // ============================================
  // NAVEGAÇÃO POR TECLADO
  // ============================================
  document.addEventListener('keydown', function(e) {
    // Ignorar se o utilizador estiver a escrever num input/textarea
    if (e.target.tagName === 'INPUT' || 
        e.target.tagName === 'TEXTAREA' || 
        e.target.isContentEditable) {
      return;
    }

    // Seta esquerda - projeto anterior
    if (e.key === 'ArrowLeft' && prevProject) {
      e.preventDefault();
      navigateToProject(prevProject.url);
    }
    
    // Seta direita - projeto seguinte
    if (e.key === 'ArrowRight' && nextProject) {
      e.preventDefault();
      navigateToProject(nextProject.url);
    }
  });

  // ============================================
  // FUNÇÃO DE NAVEGAÇÃO COM TRANSIÇÃO SUAVE
  // ============================================
  function navigateToProject(url) {
    // Adicionar classe para transição
    document.body.classList.add('page-transition');
    
    // Navegar após breve delay para animação
    setTimeout(function() {
      window.location.href = url;
    }, 300);
  }
});