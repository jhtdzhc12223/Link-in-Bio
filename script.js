// Função para alternar a seção de contato
function toggleContactSection() {
    const contactSection = document.getElementById('contactSection');
    const chevron = document.querySelector('.contact-chevron');
    const linkButton = document.querySelector('.comercial');
    
    contactSection.classList.toggle('hidden');
    linkButton.classList.toggle('active');
    
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
    
    // Animação suave
    if (!pixSection.classList.contains('hidden')) {
        pixSection.style.animation = 'slideDown 0.4s ease';
    }
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
