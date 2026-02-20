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

// Seção dos cards de painéis
const PanelData = [
    {
        id: 'dengue',
        title: 'Dengue',
        description: 'Dados sobre a Dengue no município no atual ano.',
        url: 'https://lookerstudio.google.com/reporting/12a22ae1-495b-42fe-9b00-f39c19a24564',
        icon: 'activity',
        gradient: 'dengue'
    },
    {
        id: 'vitais',
        title: 'Dados Vitais',
        description: 'Dados referentes aos nascimentos e óbitos do município.',
        url: 'https://lookerstudio.google.com/reporting/0901413f-71d9-4742-84a3-e91ea4ea6768',
        icon: 'heart',
        gradient: 'vitais'
    },
    {
        id: 'vacinacao',
        title: 'Vacinação de Rotina',
        description: 'Cobertura vacinal e dados sobre vacinação no município.',
        url: 'https://lookerstudio.google.com/reporting/3cd61315-9ae1-4038-b944-ef2403c06aec/page/p_1t0d3dkovd',
        icon: 'shield',
        gradient: 'vacinacao'
    },
    // {
    //     id: 'doencas',
    //     title: 'Doenças e Agravos',
    //     description: 'Doenças e agravos de notificação compulsória no município.',
    //     url: 'https://www.google.com',
    //     icon: 'alert-triangle',
    //     gradient: 'doencas'
    // },
    {
        id: 'influenza',
        title: 'Vacinação contra Influenza',
        description: 'Informações sobre a vacinação anual contra Influenza no município.',
        url: 'https://infoms.saude.gov.br/extensions/SEIDIGI_DEMAS_INFLUENZA_2025_RESIDENCIA/SEIDIGI_DEMAS_INFLUENZA_2025_RESIDENCIA.html',
        icon: 'syringe',
        gradient: 'influenza'
    },
    {
        id: 'sifilis',
        title: 'Sífilis',
        description: 'Informações sobre os casos de Sífilis em Gestantes, Congênita e Adquirida no município.',
        url: 'https://lookerstudio.google.com/reporting/6321dc57-070e-4ad1-b97b-13be9876187d',
        icon: 'users',
        gradient: 'sifilis'
    },
    {
        id: 'srag',
        title: 'Síndrome Respiratória Aguda Grave (SRAG)',
        description: 'Dados sobre internações por Síndrome Respiratória Aguda Grave (SRAG).',
        url: 'https://lookerstudio.google.com/reporting/a5f3aed4-4daa-4899-a264-cea143a098d6', 
        icon: 'users',
        gradient: 'srag'
    },
    {
        id: 'esavi',
        title: 'ESAVI',
        description: 'Dados sobre Eventos Supostamente Atribuídos à Vacinação e Imunização no município.',
        url: 'https://lookerstudio.google.com/reporting/e0807fe7-6338-47c4-8364-6e3c2fada085',
        icon: 'users',
        gradient: 'esavi'
    },
    {
        id: 'material-biologico',
        title: 'Material Biológico',
        description: 'Dados sobre Acidentes com Material Biológico no município.',
        url: 'https://lookerstudio.google.com/reporting/6e28181c-2143-482d-88ff-87abe07b6a83',
        icon: 'users',
        gradient: 'mat-bio'
    }
];

// CARDS DE MATERIAL DE APOIO
const SupportData = [
        {
        id: 'ia-imunizavr',
        title: 'IA ImunizaVR',
        description: 'Inteligência Artificial desenvolvida com intuito de sanar dúvidas relacionadas à Imunização no município.<br/>OBS: Para acessar é necessário possuir uma conta ativa no chatGPT. ',
        url: 'https://abre.ai/ia-imunizavr',
        icon: 'shield',
        gradient: 'ia-imunizavr'
    },
    {
        id: 'notificacoes',
        title: 'Notificações e Agravos',
        description: 'Fichas de notificação, notas técnicas e documentos de apoio.',
        url: 'https://drive.google.com/drive/u/2/folders/1KgI3OpPhtj7YCCHBxwIwqWfRGzXGTbSL',
        icon: 'alert-triangle',
        gradient: 'notificacoes'
    },
    {
        id: 'imunizacao',
        title: 'Documentos de Imunização',
        description: 'Documentos, calendários, informes técnicos e materiais sobre imunização.',
        url: 'https://drive.google.com/drive/u/3/folders/1-Y7q9O24UTOM0szrNH0cawv2YlE20-X0',
        icon: 'shield',
        gradient: 'imunizacao'
    },

    {
        id: 'tuberculose',
        title: 'Protocolo de Tuberculose',
        description: 'Normativa de ações para o enfrentamento à Tuberculose no Município.',
        url: 'https://drive.google.com/drive/folders/1ziumkVf4l4_8051uI8J050yicEf5sqX-?usp=sharing',
        icon: 'shield',
        gradient: 'tb'
    }
];

// Função de renderização principal - cards
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
            </a>
        `;
    });

    cardsGrid.innerHTML = cardsHtml;
};

// Render Cookie Consentimento
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
    renderSupportCards();
    setTimeout(() => {
        AnimationManager.observeCards();
    }, 100);
    setTimeout(() => {
        renderCookieConsent();
    }, 1000);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.querySelector('.cookie-consent.show')) {
            CookieManager.set('cookie_consent', 'true', 365);
            document.querySelector('.cookie-consent').classList.remove('show');
        }
    });

    document.documentElement.style.scrollBehavior = 'smooth';
};

document.addEventListener('DOMContentLoaded', init);