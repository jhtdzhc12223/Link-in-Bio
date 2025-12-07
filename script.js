// Função para alternar a seção de contato
function toggleContactSection() {
    const contactSection = document.getElementById('contactSection');
    const chevron = document.querySelector('.contact-chevron');
    const linkButton = document.querySelector('.comercial');
    
    contactSection.classList.toggle('hidden');
    linkButton.classList.toggle('active');
    
    // Fechar outras seções se estiverem abertas
    closeOtherSections('contactSection');
    
    // Animação suave
    if (!contactSection.classList.contains('hidden')) {
        contactSection.style.animation = 'slideDown 0.4s ease';
    }
}

// Função para alternar a seção PIX
function togglePixSection() {
    const pixSection = document.getElementById('pixSection');
    const chevron = document.querySelector('.pix-chevron');
    const linkButton = document.querySelector('.treinos');
    
    pixSection.classList.toggle('hidden');
    linkButton.classList.toggle('active');
    
    // Fechar outras seções se estiverem abertas
    closeOtherSections('pixSection');
    
    // Animação suave
    if (!pixSection.classList.contains('hidden')) {
        pixSection.style.animation = 'slideDown 0.4s ease';
    }
}

// Função para alternar a seção de projetos
function toggleProjectsSection() {
    const projectsSection = document.getElementById('projectsSection');
    const chevron = document.querySelector('.projects-chevron');
    const linkButton = document.querySelector('.projetos');
    
    projectsSection.classList.toggle('hidden');
    linkButton.classList.toggle('active');
    
    // Fechar outras seções se estiverem abertas
    closeOtherSections('projectsSection');
    
    // Animação suave
    if (!projectsSection.classList.contains('hidden')) {
        projectsSection.style.animation = 'slideDown 0.4s ease';
    }
}

// Fechar outras seções quando uma for aberta
function closeOtherSections(currentSectionId) {
    const sections = ['contactSection', 'pixSection', 'projectsSection'];
    const buttons = ['.comercial', '.treinos', '.projetos'];
    
    sections.forEach((sectionId, index) => {
        if (sectionId !== currentSectionId) {
            const section = document.getElementById(sectionId);
            const button = document.querySelector(buttons[index]);
            
            if (section && !section.classList.contains('hidden')) {
                section.classList.add('hidden');
                if (button) button.classList.remove('active');
            }
        }
    });
}

// Função para copiar o código PIX
function copyPixCode() {
    const pixCode = document.getElementById('pixCode').textContent;
    const notification = document.getElementById('copyNotification');
    
    // Usando a API moderna de clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(pixCode).then(() => {
            showNotification(notification);
        }).catch(err => {
            fallbackCopy(pixCode, notification);
        });
    } else {
        fallbackCopy(pixCode, notification);
    }
}

// Fallback para navegadores mais antigos
function fallbackCopy(text, notification) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification(notification);
    } catch (err) {
        console.error('Falha ao copiar: ', err);
        alert('Não foi possível copiar. Copie manualmente: ' + text);
    }
    
    document.body.removeChild(textArea);
}

// Mostrar notificação
function showNotification(notification) {
    notification.classList.add('show');
    
    // Esconder notificação após 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Função para adicionar novo projeto
function addNewProject() {
    const modal = document.getElementById('addProjectModal');
    modal.classList.remove('hidden');
}

// Função para fechar modal
function closeAddProjectModal() {
    const modal = document.getElementById('addProjectModal');
    modal.classList.add('hidden');
}

// Fechar modal ao clicar fora
window.addEventListener('click', function(event) {
    const modal = document.getElementById('addProjectModal');
    if (event.target === modal) {
        closeAddProjectModal();
    }
});

// Adicionar evento de clique no código PIX para copiar também
document.addEventListener('DOMContentLoaded', function() {
    const pixCodeElement = document.getElementById('pixCode');
    if (pixCodeElement) {
        pixCodeElement.addEventListener('click', copyPixCode);
        pixCodeElement.title = "Clique para copiar";
        pixCodeElement.style.cursor = 'pointer';
    }
    
    // Efeito de hover nos botões de link
    const linkButtons = document.querySelectorAll('.link-button[href]');
    linkButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Adicionar tooltip ao código PIX
    if (pixCodeElement) {
        pixCodeElement.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(51, 204, 51, 0.2)';
        });
        
        pixCodeElement.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'var(--preto)';
        });
    }
    
    // Efeito nos cards de projeto
    const projectCards = document.querySelectorAll('.project-card:not(.add-project)');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Card para adicionar novo projeto
    const addProjectCard = document.querySelector('.add-project');
    if (addProjectCard) {
        addProjectCard.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--verde)';
            this.style.boxShadow = '0 10px 25px var(--sombra-verde)';
        });
        
        addProjectCard.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--cinza)';
            this.style.boxShadow = 'none';
        });
    }
});

// Efeito de digitação no título (opcional)
function typeWriterEffect() {
    const title = document.querySelector('.profile-name');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }
        
        // Iniciar após 1 segundo
        setTimeout(type, 1000);
    }
}

// Iniciar efeito de digitação quando a página carregar
window.addEventListener('load', typeWriterEffect);

// Fechar seções ao clicar em qualquer lugar (opcional)
document.addEventListener('click', function(event) {
    const sections = ['contactSection', 'pixSection', 'projectsSection'];
    const buttons = ['.comercial', '.treinos', '.projetos'];
    
    // Verificar se o clique foi fora dos botões e seções
    const isClickInsideButton = Array.from(document.querySelectorAll('.link-button')).some(button => 
        button.contains(event.target)
    );
    
    const isClickInsideSection = sections.some(sectionId => {
        const section = document.getElementById(sectionId);
        return section && section.contains(event.target);
    });
    
    // Se não foi clique dentro, fechar todas as seções
    if (!isClickInsideButton && !isClickInsideSection) {
        sections.forEach((sectionId, index) => {
            const section = document.getElementById(sectionId);
            const button = document.querySelector(buttons[index]);
            
            if (section && !section.classList.contains('hidden')) {
                section.classList.add('hidden');
                if (button) button.classList.remove('active');
            }
        });
    }
});
