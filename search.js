// Portfolio projects data - Aligned with project pages
const portfolioSearchData = [
    {
        title: "A Arte da Mesa",
        description: "Rebranding a book on table etiquette, transforming tradition into a modern, visually engaging experience.",
        services: ["Branding", "Book Design", "Layout", "Print Design", "Editorial", "Graphic Design", "Typography"],
        link: "A-Arte-da-Mesa.html",
        image: "images/01 Homepage/livrofrente_mesa.webp"
    },
    {
        title: "Spread Education, Spread Love",
        description: "Creating a collection that raises awareness for education and love, empowering young students' futures.",
        services: ["Art Direction", "Brand Identity", "Graphic Design", "Illustration", "Print Design", "Digital Design", "Social Media Content", "Social Impact"],
        link: "project.html",
        image: "images/SpreadEducationSpreadLove.gif"
    },
    {
        title: "Mariana & Felipe's Wedding",
        description: "Visual identity for a summer wedding, blending hand-drawn illustrations and soft watercolors to capture intimacy.",
        services: ["Wedding Design", "Brand Identity", "Illustration", "Print Design", "Watercolor", "Graphic Design", "Art Direction"],
        link: "Mariana&Felipe.html",
        image: "images/02 Mariana e Ipy/BenditoMockup-WWW-Wine_Bottle-04 copiar.jpg"
    },
    {
        title: "Underground Magazine",
        description: "Editorial design celebrating British underground designers, with special focus on Peter Saville's iconic work.",
        services: ["Editorial Design", "Layout Design", "Typography", "Magazine", "British Design", "Print Design", "Graphic Design"],
        link: "Underground.html",
        image: "images/05 Underground/Mockup_capa.jpg"
    },
    {
        title: "FALP",
        description: "Visual identity for the Federation of Portuguese Language Lawyers, promoting legal cooperation among Lusophone countries and human rights.",
        services: ["Brand Identity", "Legal", "Federation", "Visual System", "Graphic Design", "Logo Design"],
        link: "falp.html",
        image: "images/06 FALP/Business Card_Mockup.webp"
    },
    {
        title: "MODUS",
        description: "A fictional event for International Design Day that celebrates design as a practical, human-centered discipline, valuing function over form through clarity, humility, and purpose.",
        services: ["Event Design", "Concept", "Branding", "Design Day", "Brand Identity", "Graphic Design"],
        link: "modus.html",
        image: "images/08 MODUS/Banner-gif-1_site.gif"
    },
    {
        title: "PAEZ",
        description: "Winning collection of the PAEZ x Belas-Artes Summer 2026 contest, celebrating a simple, mindful lifestyle connected to the earth through the raw texture and vibrancy of vegetables.",
        services: ["Product Design", "Contest", "Vegetables", "Lifestyle", "Pattern Design", "Surface Design"],
        link: "paez.html",
        image: "images/09 PAEZ/padrão tomate.svg"
    },
    {
        title: "fyted",
        description: "A speculative interactive experience revealing how AI job interviews hide bias behind polite efficiency, exposing the human cost of automated hiring systems.",
        services: ["Interaction Design", "AI", "Bias", "Speculative", "Critical Design", "UX Design", "Interface Design"],
        link: "fyted.html",
        image: "images/10 fyted/TDMovieOut.0.webm"
    }
];

// Create a searchable index of all services
const allServices = [...new Set(portfolioSearchData.flatMap(project => project.services))].sort();

console.log('Available services for search:', allServices);

// Initialize search functionality
function initializeSearch() {
    const searchIcon = document.querySelector('.search-icon');
    const searchText = document.querySelector('.search-text');
    const searchContainer = document.querySelector('.search-container');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchClose = document.querySelector('.search-close');
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');

    if (!searchOverlay) {
        console.warn('Search overlay not found');
        return;
    }

    // Open search overlay - Support both .search-icon and .search-text
    function openSearch() {
        searchOverlay.classList.add('active');
        if (searchInput) {
            searchInput.focus();
        }
        document.body.style.overflow = 'hidden';
        console.log('Search overlay opened');
    }

    if (searchIcon) {
        searchIcon.addEventListener('click', openSearch);
    }
    
    if (searchText) {
        searchText.addEventListener('click', openSearch);
    }

    if (searchContainer) {
        searchContainer.addEventListener('click', openSearch);
    }

    // Close search overlay
    function closeSearch() {
        searchOverlay.classList.remove('active');
        if (searchInput) {
            searchInput.value = '';
        }
        if (searchResults) {
            searchResults.innerHTML = '';
        }
        document.body.style.overflow = '';
        console.log('Search overlay closed');
    }

    if (searchClose) {
        searchClose.addEventListener('click', closeSearch);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            closeSearch();
        }
    });

    // Close when clicking outside search box
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            closeSearch();
        }
    });

    // Enhanced search function with service matching
    function performSearch(query) {
        if (!searchResults) return;

        if (!query.trim()) {
            searchResults.innerHTML = '';
            return;
        }

        const queryLower = query.toLowerCase().trim();
        
        // Search through all project data
        const results = portfolioSearchData.filter(project => {
            // Check title
            if (project.title.toLowerCase().includes(queryLower)) {
                return true;
            }
            
            // Check description
            if (project.description.toLowerCase().includes(queryLower)) {
                return true;
            }
            
            // Check services - exact and partial matches
            const serviceMatch = project.services.some(service => 
                service.toLowerCase().includes(queryLower) || 
                queryLower.includes(service.toLowerCase())
            );
            
            return serviceMatch;
        });

        displayResults(results, query);
    }

    // Display search results with improved layout
    function displayResults(results, query) {
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <p>No results found for "${query}"</p>
                    <p style="margin-top: 10px; font-size: 14px; color: #999;">
                        Try: ${allServices.slice(0, 5).join(', ')}
                    </p>
                </div>
            `;
            return;
        }

        const resultsHTML = results.map(project => {
            // Highlight matching services
            const matchingServices = project.services
                .filter(service => service.toLowerCase().includes(query.toLowerCase()))
                .slice(0, 3)
                .join(', ');

            return `
                <a href="${project.link}" class="search-result-item">
                    <img src="${project.image}" 
                         alt="${project.title}" 
                         class="result-image" 
                         onerror="this.style.display='none'"
                         loading="lazy">
                    <div class="result-content">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        ${matchingServices ? `<p class="result-services">${matchingServices}</p>` : ''}
                    </div>
                </a>
            `;
        }).join('');

        searchResults.innerHTML = resultsHTML;
    }

    // Real-time search with debouncing
    let searchTimeout;
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(e.target.value);
            }, 300);
        });

        // Handle Enter key
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const firstResult = searchResults.querySelector('.search-result-item');
                if (firstResult) {
                    window.location.href = firstResult.href;
                }
            }
        });
    }

    // Suggestion tags - click to search
    suggestionTags.forEach(tag => {
        tag.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = tag.textContent;
                performSearch(tag.textContent);
            }
        });
    });

    console.log('Search initialized successfully');
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSearch);
} else {
    initializeSearch();
}