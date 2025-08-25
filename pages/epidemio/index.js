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
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'translateY(2)';
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

const LinkManager = {
    openExternal: (url) => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    }
};

// SEÇÃO DE PAINÉIS
const PanelData = [
    {
        //card dengue
        id: 'dengue',
        title: 'Dengue',
        description: 'Dados sobre a Dengue no município.',
        url: 'https://lookerstudio.google.com/reporting/3c304ce9-c20f-4901-993c-02a6c3b21c00',
        icon: 'activity',
        gradient: 'dengue'
    },
    {
        // card dados vitais - nascidos vivos + óbitos
        id: 'vitais',
        title: 'Dados Vitais',
        description: 'Dados referentes aos nascimentos e óbitos do município.',
        url: 'https://lookerstudio.google.com/reporting/0901413f-71d9-4742-84a3-e91ea4ea6768',
        icon: 'heart',
        gradient: 'vitais'
    },
    {
        // card vacina de rotina - esperar glaucio fazer o painel para colocar link certo !!!
        id: 'vacinacao',
        title: 'Vacinação de Rotina',
        description: 'Cobertura vacinal e dados sobre vacinação de rotina no município.',
        url: 'https://docs.google.com/spreadsheets/d/1ByzyHrbe6Dwx6FrUUvXYZnz9f4LVciBRZm2uUQE8o_0/edit?gid=0#gid=0', // provisório, link do Google Sheets para apresentação 22/08
        icon: 'shield',
        gradient: 'vacinacao'
    },
    {
        // card notificações compulsorias - esperar NOTION respondido pra montar o painel das doenças escolhidas
        id: 'doencas',
        title: 'Doenças e Agravos',
        description: 'Doenças e agravos de notificação compulsória no município.',
        url: 'https://www.google.com', // CRIAR UMA PÁGINA COM CARDS QUE REDIRECIONAM PARA O PAINEL DE CADA AGRAVO ? CASO A SE PENSAR
        icon: 'alert-triangle',
        gradient: 'doencas'
    },
    {
        // card campanha anual de influenza - REVER SE REALMENTE HÁ NECESSIDADE DE UM PAINEL OU INCLUI NA ROTINA
        id: 'influenza',
        title: 'Vacinação contra Influenza',
        description: 'Informações sobre a vacinação anual contra Influenza no município.',
        url: 'https://infoms.saude.gov.br/extensions/SEIDIGI_DEMAS_VACINACAO_CALENDARIO_NACIONAL_COBERTURA_RESIDENCIA/SEIDIGI_DEMAS_VACINACAO_CALENDARIO_NACIONAL_COBERTURA_RESIDENCIA.html',
        icon: 'syringe',
        gradient: 'influenza'
    },
    {
        // card sifilis - por enquanto usar 2022 - 2023 para a CERTIFICAÇÃO DA SES 
        id: 'sifilis',
        title: 'Sífilis',
        description: 'Informações sobre os casos de Sífilis do município.',
        url: 'https://lookerstudio.google.com/reporting/6321dc57-070e-4ad1-b97b-13be9876187d', //USANDO SIFILIS 22-23 PARA CERTIFICAÇÃO
        icon: 'users',
        gradient: 'sifilis'
    }
];

// SEÇÃO DE MATERIAL DE APOIO
const SupportData = [
    {
        // drive do vivver com TODO material de Epidemio
        id: 'notificacoes',
        title: 'Notificações e Agravos',
        description: 'Fichas de notificação, notas técnicas e documentos de apoio.',
        url: 'https://drive.google.com/drive/u/2/folders/1KgI3OpPhtj7YCCHBxwIwqWfRGzXGTbSL', // Link para o drive
        icon: 'alert-triangle',
        gradient: 'notificacoes'
    },
    {
        // drive do vivver com TODO material de imunização (incluisiv POP's)
        id: 'imunizacao',
        title: 'Imunização',
        description: 'Calendários, informes técnicos e materiais sobre imunização.',
        url: 'https://drive.google.com/drive/u/3/folders/1-Y7q9O24UTOM0szrNH0cawv2YlE20-X0', // Link para o drive
        icon: 'shield',
        gradient: 'imunizacao'
    }
];


// SVG Icon mapping for Lucide icons
const IconMap = {
    'activity': `<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>`,
    'heart': `<path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0L12 6.36l-1.77-1.77a5.4 5.4 0 0 0-7.65 0c-2.4 2.4-2.4 6.4 0 8.8l7.15 7.15a1.5 1.5 0 0 0 2.12 0l7.15-7.15c2.4-2.4 2.4-6.4 0-8.8z"/>`,
    'shield': `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
    'alert-triangle': `<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12" y2="17"/>`,
    'syringe': `<path d="m14 14 5-5m-1-5 5 5m-11 5-5 5m-1-5 5 5m-1.5-12.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM12 2h3a2 2 0 0 1 2 2v2l-5 5-4-4 5-5zm-2 5-2 2-4-4 2-2z"/>`,
    'users': `<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/>`,
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
    PanelData.forEach((panel) => {
        cardsHtml += `
            <a href="${panel.url}" class="card ${panel.gradient}" target="_blank" rel="noopener noreferrer" aria-label="Abrir painel ${panel.title}" role="button" tabindex="0">
                <div class="card-gradient"></div>
                <h3 class="card-title">${panel.title}</h3>
                <p class="card-description">${panel.description}</p>
                <div class="external-link-icon">${getIconSvg('external-link')}</div>
            </a>
        `;
    });
    
    cardsGrid.innerHTML = cardsHtml;
};

// Render Support Cards
const renderSupportCards = () => {
    const cardsGrid = document.getElementById('support-cards-grid');
    if (!cardsGrid) return;

    let cardsHtml = '';
    SupportData.forEach((panel) => {
        cardsHtml += `
            <a href="${panel.url}" class="card ${panel.gradient}" target="_blank" rel="noopener noreferrer" aria-label="Abrir painel ${panel.title}" role="button" tabindex="0">
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
    renderSupportCards(); // Chama a nova função para renderizar os cards de apoio
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