// Project Navigation System - Enhanced Version
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
    console.log('Navigation: Not on a project page');
    return;
  }

  // ============================================
  // CÁLCULO DOS PROJETOS ANTERIOR E SEGUINTE
  // ============================================
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1;
  const nextIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;
  const prevProject = projects[prevIndex];
  const nextProject = projects[nextIndex];

  console.log('Navigation initialized:');
  console.log('← Previous:', prevProject.name);
  console.log('→ Next:', nextProject.name);

  // ============================================
  // CRIAR ELEMENTOS DE NAVEGAÇÃO
  // ============================================
  createProjectNavigation(prevProject, nextProject);

  function createProjectNavigation(prev, next) {
    // Criar seta esquerda (projeto anterior)
    if (prev) {
      const leftArrow = document.createElement('a');
      leftArrow.href = prev.url;
      leftArrow.className = 'project-nav-arrow left';
      leftArrow.setAttribute('aria-label', 'Projeto anterior: ' + prev.name);
      leftArrow.innerHTML = `
        <span class="arrow-icon">←</span>
        <div class="project-nav-tooltip">${prev.name}</div>
      `;
      document.body.appendChild(leftArrow);

      // Criar zona de hover esquerda
      const leftZone = document.createElement('div');
      leftZone.className = 'nav-hover-zone left';
      leftZone.setAttribute('aria-label', 'Hover para navegar para o projeto anterior');
      document.body.appendChild(leftZone);

      // Event listeners para mostrar/esconder seta
      leftZone.addEventListener('mouseenter', function() {
        leftArrow.classList.add('visible');
      });

      leftZone.addEventListener('mouseleave', function() {
        leftArrow.classList.remove('visible');
      });

      // Click na zona também navega
      leftZone.addEventListener('click', function() {
        navigateToProject(prev.url);
      });
    }

    // Criar seta direita (projeto seguinte)
    if (next) {
      const rightArrow = document.createElement('a');
      rightArrow.href = next.url;
      rightArrow.className = 'project-nav-arrow right';
      rightArrow.setAttribute('aria-label', 'Próximo projeto: ' + next.name);
      rightArrow.innerHTML = `
        <span class="arrow-icon">→</span>
        <div class="project-nav-tooltip">${next.name}</div>
      `;
      document.body.appendChild(rightArrow);

      // Criar zona de hover direita
      const rightZone = document.createElement('div');
      rightZone.className = 'nav-hover-zone right';
      rightZone.setAttribute('aria-label', 'Hover para navegar para o próximo projeto');
      document.body.appendChild(rightZone);

      // Event listeners para mostrar/esconder seta
      rightZone.addEventListener('mouseenter', function() {
        rightArrow.classList.add('visible');
      });

      rightZone.addEventListener('mouseleave', function() {
        rightArrow.classList.remove('visible');
      });

      // Click na zona também navega
      rightZone.addEventListener('click', function() {
        navigateToProject(next.url);
      });
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

  // ============================================
  // INTEGRAÇÃO COM CUSTOM CURSOR
  // ============================================
  // Garantir que o custom cursor reage às hover zones
  const customCursor = document.querySelector('.custom-cursor');
  if (customCursor) {
    const hoverZones = document.querySelectorAll('.nav-hover-zone, .project-nav-arrow');
    hoverZones.forEach(function(zone) {
      zone.addEventListener('mouseenter', function() {
        customCursor.classList.add('hover');
      });
      zone.addEventListener('mouseleave', function() {
        customCursor.classList.remove('hover');
      });
    });
  }
});