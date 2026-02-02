// Project Page - Dynamic Content Loading

document.addEventListener('DOMContentLoaded', function() {
  // Get project ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');

  // Project data structure
  const projects = {
    '1': {
      title: 'ARRIVEDERCI E GRAZIE',
      description: `
        <p>ARRIVEDERCI E GRAZIE é um progetto editoriale in due volumi che esplora la soggettività della percezione e il potenziale nascosto degli oggetti quotidiani. Partendo da scontri termici bruciati con comuni utensili domestici, genera forme astratte e inattese che innescano la pareidolia.</p>
        <p>Il progetto si inserisce in una linea storica che mette in discussione i confini tra arte e quotidianità. Marcel Duchamp, con il suo ready-made Fountain (1917), elevò un orinale prodotto in serie a opera d'arte semplicemente cambiandone il contesto.</p>
      `,
      hero: 'images/inspo/inspo-1.jpg',
      heroType: 'image', // 'image' or 'video'
      client: 'ISIA Urbino',
      year: '2023',
      products: '2 editoriais<br>Lettering<br>Piattaforma online',
      services: 'Direzione creativa<br>Fotografia',
      images: [
        {
          layout: 'two-col',
          images: ['images/inspo/inspo-2.jpg', 'images/inspo/inspo-3.jpg']
        },
        {
          layout: 'full-width',
          images: ['images/inspo/inspo-1.jpg']
        },
        {
          layout: 'three-col',
          images: ['images/inspo/inspo-2.jpg', 'images/inspo/inspo-3.jpg', 'images/inspo/inspo-1.jpg']
        }
      ]
    },
    '2': {
      title: 'Project Two',
      description: '<p>Description for project two. Add your project details here.</p>',
      hero: 'images/inspo/inspo-2.jpg',
      heroType: 'image',
      client: 'Client Name',
      year: '2024',
      products: 'Product 1<br>Product 2',
      services: 'Service 1<br>Service 2',
      images: [
        {
          layout: 'full-width',
          images: ['images/inspo/inspo-2.jpg']
        }
      ]
    },
    '3': {
      title: 'Project Three',
      description: '<p>Description for project three. Add your project details here.</p>',
      hero: 'images/inspo/inspo-3.jpg',
      heroType: 'image',
      client: 'Client Name',
      year: '2024',
      products: 'Product 1<br>Product 2',
      services: 'Service 1<br>Service 2',
      images: [
        {
          layout: 'two-col',
          images: ['images/inspo/inspo-3.jpg', 'images/inspo/inspo-1.jpg']
        }
      ]
    }
  };

  // Load project content
  if (projectId && projects[projectId]) {
    const project = projects[projectId];
    
    // Update title
    document.getElementById('project-title').textContent = project.title;
    document.title = `MARTA - ${project.title}`;
    
    // Update description
    document.getElementById('project-description').innerHTML = project.description;
    
    // Update hero
    const heroContainer = document.getElementById('project-hero');
    const heroMedia = document.getElementById('hero-media');
    
    if (project.heroType === 'video') {
      // Replace img with video
      const videoElement = document.createElement('video');
      videoElement.src = project.hero;
      videoElement.autoplay = true;
      videoElement.muted = true;
      videoElement.loop = true;
      videoElement.playsInline = true;
      videoElement.id = 'hero-media';
      heroMedia.replaceWith(videoElement);
    } else {
      // Update image src
      heroMedia.src = project.hero;
      heroMedia.alt = project.title;
    }
    
    // Update meta information
    document.getElementById('client').innerHTML = project.client;
    document.getElementById('year').innerHTML = project.year;
    document.getElementById('products').innerHTML = project.products;
    document.getElementById('services').innerHTML = project.services;
    
    // Update images grid
    const imagesContainer = document.getElementById('project-images');
    imagesContainer.innerHTML = '';
    
    project.images.forEach(row => {
      const rowDiv = document.createElement('div');
      rowDiv.className = `image-row ${row.layout}`;
      
      row.images.forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = project.title;
        img.loading = 'lazy';
        rowDiv.appendChild(img);
      });
      
      imagesContainer.appendChild(rowDiv);
    });
    
    console.log(`Project loaded: ${project.title}`);
  } else {
    // No valid project ID - redirect to home or show error
    console.error('Project not found');
    document.getElementById('project-title').textContent = 'Project Not Found';
    document.getElementById('project-description').innerHTML = '<p>This project doesn\'t exist. <a href="index.html">Return to homepage</a></p>';
  }
});