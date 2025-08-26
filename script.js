// FUNCTIONS UTEIS
const CookieManager = {
    set: (name, value, days) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    },
    
    get: (name) => {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    
    exists: (name) => {
        return document.cookie.split(';').some((item) => item.trim().startsWith(`${name}=`));
    }
};

const ThemeManager = {
    init: () => {
        document.body.className = 'light-theme';
    }
};

const AnimationManager = {
    observeCards: () => {
        const cards = document.querySelectorAll('.card');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            },
            { 
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        cards.forEach(card => observer.observe(card));
    }
};

// DADOS DOS CARDS PRINCIPAIS
const PortalData = [
    {
        id: 'ambiental',
        title: 'Vigilância Ambiental',
        description: 'PAINEL EM DESENVOLVIMENTO/CONSTRUÇÃO.',
        url: '/pages/ambiental/index.html', // ATUALIZADO
        gradient: 'ambiental'
    },
    {
        id: 'epidemiologica',
        title: 'Vigilância Epidemiológica',
        description: 'PAINEL EM DESENVOLVIMENTO/CONSTRUÇÃO.',
        url: '/pages/epidemio/index.html',
        gradient: 'epidemiologica'
    },
    {
        id: 'sanitaria',
        title: 'Vigilância Sanitária',
        description: 'PAINEL EM DESENVOLVIMENTO/CONSTRUÇÃO.',
        url: '/pages/sanitaria/index.html', // ATUALIZADO
        gradient: 'sanitaria'
    },
    {
        id: 'trabalhador',
        title: 'Saúde do Trabalhador',
        description: 'PAINEL EM DESENVOLVIMENTO/CONSTRUÇÃO.',
        url: '/pages/trabalhador/index.html', // ATUALIZADO
        gradient: 'trabalhador'
    }
];

// SVG Icon mapping for Lucide icons
const IconMap = {
    'external-link': `<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>`
};

const getIconSvg = (name) => {
    const iconData = IconMap[name];
    if (!iconData) return '';
    return `<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="32" width="32" xmlns="http://www.w3.org/2000/svg">${iconData}</svg>`;
};

// Main Rendering Function
const renderCards = () => {
    const cardsGrid = document.getElementById('cards-grid');
    if (!cardsGrid) return;
    
    let cardsHtml = '';
    PortalData.forEach((panel) => {
        cardsHtml += `
            <a href="${panel.url}" class="card ${panel.gradient}" aria-label="Abrir seção ${panel.title}" role="button" tabindex="0">
                <div class="card-gradient"></div>
                <h3 class="card-title">${panel.title}</h3>
                <p class="card-description">${panel.description}</p>
                <div class="external-link-icon">${getIconSvg('external-link')}</div>
            </a>
        `;
    });
    
    cardsGrid.innerHTML = cardsHtml;
};

// Render Cookie Consent
const renderCookieConsent = () => {
    const consentContainer = document.getElementById('cookie-consent-container');
    if (CookieManager.exists('cookie_consent')) {
        if (consentContainer) consentContainer.innerHTML = '';
        return;
    }
    
    const cookieHtml = `
        <div class="cookie-consent show">
            <div class="cookie-content">
                <p class="cookie-text">
                    Utilizamos cookies para melhorar a sua experiência em nosso site. Ao continuar navegando, você concorda com a nossa Política de Privacidade.
                </p>
                <button id="cookie-button" class="cookie-button">
                    Entendi e fechar
                </button>
            </div>
        </div>
    `;
    if (consentContainer) {
        consentContainer.innerHTML = cookieHtml;
        document.getElementById('cookie-button').addEventListener('click', () => {
            CookieManager.set('cookie_consent', 'true', 365);
            document.querySelector('.cookie-consent').classList.remove('show');
        });
    }
};

// função principal de renderização
const init = () => {
    ThemeManager.init();
    renderCards();
    setTimeout(() => {
        AnimationManager.observeCards();
    }, 100);
    setTimeout(() => {
        renderCookieConsent();
    }, 1000);
    
    // Event listeners
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.querySelector('.cookie-consent.show')) {
            CookieManager.set('cookie_consent', 'true', 365);
            document.querySelector('.cookie-consent').classList.remove('show');
        }
    });

    // Scroll smooth
    document.documentElement.style.scrollBehavior = 'smooth';
};

// Inicialização do DOM
document.addEventListener('DOMContentLoaded', init);