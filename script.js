// CONFIGURAÇÕES GLOBAIS
const CONFIG = {
    loadingDuration: 2000,
    tiktokLaunch: '2024-12-01T00:00:00', // Data futura
    stats: {
        projects: 100,
        years: 5,
        clients: 50
    }
};

// VARIÁVEIS GLOBAIS
let locomotiveScroll;
let particlesLoaded = false;

// INICIALIZAÇÃO SIMPLIFICADA
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, iniciando aplicação...');
    
    // Iniciar loading e depois tudo
    initLoadingScreen();
});

// LOADING SCREEN - CORRIGIDO
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.querySelector('.progress-bar');
    
    if (!loadingScreen) {
        console.log('Loading screen não encontrada, continuando...');
        initEverything();
        return;
    }
    
    console.log('Iniciando loading screen...');
    
    // Garantir que o body esteja visível
    document.body.style.overflow = 'hidden';
    
    // Simular progresso do carregamento
    let progress = 0;
    const targetProgress = 100;
    const increment = 2; // Mais rápido
    const interval = 50; // Mais frequente
    
    const progressInterval = setInterval(() => {
        progress += increment;
        if (progress > targetProgress) progress = targetProgress;
        
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        
        if (progress >= targetProgress) {
            clearInterval(progressInterval);
            
            // Pequeno delay para mostrar 100%
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'auto';
                console.log('Loading screen finalizada');
                
                // Iniciar tudo depois do loading
                initEverything();
            }, 300);
        }
    }, interval);
}

// INICIALIZAR TUDO DEPOIS DO LOADING
function initEverything() {
    console.log('Iniciando todos os componentes...');
    
    // Iniciar na ordem correta
    setTimeout(() => {
        initParticles();
        initLocomotiveScroll();
        initTypingEffect();
        initNavigation();
        initStatsCounter();
        initCountdown();
        initSkillsAnimation();
        initEventListeners();
        initTheme();
        
        console.log('Todos os componentes inicializados com sucesso!');
    }, 100);
}

// PARTICLES.JS - SIMPLIFICADO
function initParticles() {
    if (typeof particlesJS === 'undefined') {
        console.log('Particles.js não carregado, pulando...');
        return;
    }
    
    try {
        particlesJS('particles-js', {
            particles: {
                number: { value: 50, density: { enable: true, value_area: 800 } },
                color: { value: "#00ff88" },
                shape: { type: "circle" },
                opacity: { value: 0.3, random: true },
                size: { value: 2, random: true },
                line_linked: {
                    enable: true,
                    distance: 100,
                    color: "#00ff88",
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: false },
                    onclick: { enable: false },
                    resize: true
                }
            },
            retina_detect: true
        });
        particlesLoaded = true;
        console.log('Particles.js inicializado');
    } catch (error) {
        console.error('Erro ao inicializar particles.js:', error);
    }
}

// LOCOMOTIVE SCROLL - COM FALLBACK
function initLocomotiveScroll() {
    if (typeof LocomotiveScroll === 'undefined') {
        console.log('Locomotive Scroll não carregado, usando scroll nativo');
        return;
    }
    
    try {
        locomotiveScroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            multiplier: 0.8,
            smartphone: { smooth: false }, // Desabilitar no mobile para performance
            tablet: { smooth: false }
        });
        
        console.log('Locomotive Scroll inicializado');
        
        // Atualizar no resize
        window.addEventListener('resize', () => {
            if (locomotiveScroll) locomotiveScroll.update();
        });
    } catch (error) {
        console.error('Erro ao inicializar Locomotive Scroll:', error);
    }
}

// TYPING EFFECT - SIMPLIFICADO
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    try {
        const words = JSON.parse(typingElement.getAttribute('data-words') || '["CODE • STRENGTH • EVOLUTION"]');
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(type, 1500);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? 50 : 100);
            }
        }
        
        // Começar depois de um delay
        setTimeout(type, 1000);
        console.log('Typing effect inicializado');
    } catch (error) {
        console.error('Erro no typing effect:', error);
    }
}

// NAVEGAÇÃO - SIMPLIFICADA
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const indicator = document.querySelector('.nav-indicator');
    
    if (!navItems.length || !indicator) return;
    
    function updateIndicator(activeItem) {
        if (!activeItem) return;
        
        const itemRect = activeItem.getBoundingClientRect();
        const containerRect = activeItem.parentElement.getBoundingClientRect();
        
        indicator.style.width = `${itemRect.width}px`;
        indicator.style.transform = `translateX(${itemRect.left - containerRect.left}px)`;
    }
    
    function showSection(sectionId) {
        // Esconder todas as seções
        document.querySelectorAll('.active-section, .projects-section, .contact-section').forEach(section => {
            section.classList.add('hidden');
            section.classList.remove('active-section');
        });
        
        // Mostrar seção selecionada
        const section = document.getElementById(`${sectionId}Section`);
        if (section) {
            section.classList.remove('hidden');
            section.classList.add('active-section');
        }
        
        // Atualizar navegação
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === sectionId) {
                item.classList.add('active');
                updateIndicator(item);
            }
        });
    }
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });
    
    // Inicializar com a primeira seção ativa
    const activeItem = document.querySelector('.nav-item.active');
    updateIndicator(activeItem);
    
    console.log('Navegação inicializada');
}

// CONTADOR DE ESTATÍSTICAS
function initStatsCounter() {
    const statValues = document.querySelectorAll('.stat-value[data-count]');
    if (!statValues.length) return;
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 1500;
        const start = 0;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(progress * target);
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }
        
        requestAnimationFrame(update);
    }
    
    // Observar quando os elementos entram na viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    statValues.forEach(value => observer.observe(value));
    console.log('Contador de estatísticas inicializado');
}

// COUNTDOWN TIMER - CORRIGIDO
function initCountdown() {
    const launchDate = new Date(CONFIG.tiktokLaunch).getTime();
    const now = new Date().getTime();
    
    if (launchDate <= now) {
        console.log('Data do TikTok já passou');
        return;
    }
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = launchDate - now;
        
        if (distance < 0) {
            document.querySelectorAll('.countdown-value').forEach(el => {
                el.textContent = '00';
            });
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Atualizar elementos se existirem
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const modalDays = document.getElementById('modal-days');
        const modalHours = document.getElementById('modal-hours');
        const modalMinutes = document.getElementById('modal-minutes');
        const modalSeconds = document.getElementById('modal-seconds');
        
        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (modalDays) modalDays.textContent = days.toString().padStart(2, '0');
        if (modalHours) modalHours.textContent = hours.toString().padStart(2, '0');
        if (modalMinutes) modalMinutes.textContent = minutes.toString().padStart(2, '0');
        if (modalSeconds) modalSeconds.textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
    console.log('Countdown inicializado');
}

// ANIMAÇÃO DE HABILIDADES
function initSkillsAnimation() {
    const skillLevels = document.querySelectorAll('.skill-level');
    if (!skillLevels.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level') || '0';
                entry.target.style.width = `${level}%`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    skillLevels.forEach(level => observer.observe(level));
    console.log('Animações de habilidades inicializadas');
}

// EVENT LISTENERS - SIMPLIFICADO
function initEventListeners() {
    // Copiar PIX
    const pixCode = document.getElementById('pixCode');
    if (pixCode) {
        pixCode.addEventListener('click', copyPixCode);
    }
    
    // Toggle sections
    document.querySelector('.treinos')?.addEventListener('click', togglePixSection);
    document.querySelector('.projetos')?.addEventListener('click', toggleProjectsSection);
    
    // Modais
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.add('hidden');
        });
    });
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.classList.add('hidden');
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.add('hidden');
            });
        }
    });
    
    console.log('Event listeners inicializados');
}

// THEME MANAGER
function initTheme() {
    // Por enquanto apenas dark theme
    document.documentElement.classList.add('dark-theme');
    console.log('Tema inicializado');
}

// FUNÇÕES DE TOGGLE - SIMPLIFICADAS
function togglePixSection() {
    const section = document.getElementById('pixSection');
    const chevron = document.querySelector('.pix-chevron');
    
    if (!section) return;
    
    section.classList.toggle('hidden');
    if (chevron) {
        chevron.classList.toggle('rotated');
    }
    
    // Atualizar scroll se necessário
    if (!section.classList.contains('hidden') && locomotiveScroll) {
        setTimeout(() => locomotiveScroll.update(), 300);
    }
}

function toggleProjectsSection() {
    const section = document.getElementById('projectsSection');
    const chevron = document.querySelector('.projects-chevron');
    
    if (!section) return;
    
    section.classList.toggle('hidden');
    if (chevron) {
        chevron.classList.toggle('rotated');
    }
    
    if (!section.classList.contains('hidden')) {
        // Mostrar seção de projetos na navegação
        showSection('projects');
        
        // Atualizar scroll
        if (locomotiveScroll) {
            setTimeout(() => locomotiveScroll.update(), 300);
        }
    }
}

// FUNÇÃO PARA MOSTRAR SEÇÃO (usada no footer)
function showSection(sectionId) {
    const navItem = document.querySelector(`.nav-item[data-section="${sectionId}"]`);
    if (navItem) {
        navItem.click();
    }
}

// FUNÇÕES DE MODAL
function showLaunchCountdown() {
    const modal = document.getElementById('countdownModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeCountdownModal() {
    const modal = document.getElementById('countdownModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function notifyMe() {
    const modal = document.getElementById('notificationModal');
    if (!modal) return;
    
    modal.classList.remove('hidden');
    
    // Simular notificação
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 3000);
}

function closeNotificationModal() {
    const modal = document.getElementById('notificationModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function showContactModal() {
    // Mostrar seção de contato
    showSection('contact');
}

// COPIAR PIX - SIMPLIFICADO
function copyPixCode() {
    const pixCode = "125.119.579-22";
    
    function showCopyNotification() {
        // Criar notificação simples
        const notification = document.createElement('div');
        notification.textContent = 'Chave PIX copiada!';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--gradient-primary);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        // Adicionar estilo de animação
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
                style.remove();
            }, 300);
        }, 3000);
    }
    
    // Tentar usar a API moderna
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(pixCode).then(() => {
            showCopyNotification();
        }).catch(err => {
            fallbackCopy(pixCode, showCopyNotification);
        });
    } else {
        fallbackCopy(pixCode, showCopyNotification);
    }
}

function fallbackCopy(text, onSuccess) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        if (onSuccess) onSuccess();
    } catch (err) {
        console.error('Falha ao copiar:', err);
        alert('Não foi possível copiar. Copie manualmente: ' + text);
    }
    
    document.body.removeChild(textArea);
}

// EXPORTAR FUNÇÕES GLOBAIS
window.togglePixSection = togglePixSection;
window.toggleProjectsSection = toggleProjectsSection;
window.copyPixCode = copyPixCode;
window.showLaunchCountdown = showLaunchCountdown;
window.notifyMe = notifyMe;
window.closeCountdownModal = closeCountdownModal;
window.closeNotificationModal = closeNotificationModal;
window.showContactModal = showContactModal;
window.showSection = showSection;

console.log('Script.js carregado com sucesso!');
