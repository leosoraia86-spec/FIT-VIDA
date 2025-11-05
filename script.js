// Funções de navegação e interatividade
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Modal Premium Functions
function showPremiumModal() {
    const modal = document.getElementById('premiumModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Adicionar animação de entrada
    setTimeout(() => {
        modal.querySelector('.modal-content').style.animation = 'modalSlideIn 0.3s ease-out';
    }, 10);
}

function closePremiumModal() {
    const modal = document.getElementById('premiumModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function confirmPremium() {
    const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
    
    // Simular processo de assinatura
    const confirmButton = document.querySelector('.confirm-button');
    const originalText = confirmButton.textContent;
    
    confirmButton.textContent = 'Processando...';
    confirmButton.disabled = true;
    
    setTimeout(() => {
        alert(`✅ Assinatura Premium confirmada!\n\nMétodo de pagamento: ${getPaymentMethodName(selectedPayment)}\n\n⚠️ Importante: Este é um protótipo. O sistema de pagamento será implementado em breve.`);
        closePremiumModal();
        
        // Restaurar botão
        confirmButton.textContent = originalText;
        confirmButton.disabled = false;
        
        // Simular upgrade para premium
        upgradeToPremium();
    }, 2000);
}

function getPaymentMethodName(method) {
    const methods = {
        'pix': 'PIX',
        'card': 'Cartão de Crédito',
        'boleto': 'Boleto Bancário'
    };
    return methods[method] || method;
}

function upgradeToPremium() {
    // Remover badges de premium e destravar conteúdo
    const premiumCards = document.querySelectorAll('.premium-preview');
    premiumCards.forEach(card => {
        card.classList.remove('premium-preview');
        card.classList.add('premium-unlocked');
        
        // Remover cadeados dos itens
        const lockedItems = card.querySelectorAll('li');
        lockedItems.forEach(item => {
            if (item.textContent.includes('🔒')) {
                item.textContent = item.textContent.replace('🔒 ', '✅ ');
            }
        });
        
        // Substituir botão de desbloquear
        const unlockButton = card.querySelector('.unlock-button');
        if (unlockButton) {
            unlockButton.textContent = '✅ Conteúdo Premium';
            unlockButton.disabled = true;
            unlockButton.style.background = '#28a745';
            unlockButton.style.cursor = 'default';
        }
    });
    
    // Adicionar indicador de usuário premium
    addPremiumUserIndicator();
    
    // Mostrar mensagem de boas-vindas
    showWelcomePremiumMessage();
}

function addPremiumUserIndicator() {
    const navContainer = document.querySelector('.nav-container');
    const existingIndicator = document.querySelector('.premium-user-indicator');
    
    if (!existingIndicator) {
        const indicator = document.createElement('div');
        indicator.className = 'premium-user-indicator';
        indicator.innerHTML = '⭐ Usuário Premium';
        indicator.style.cssText = `
            background: linear-gradient(45deg, #ffd700, #ffed4e);
            color: #333;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: bold;
            margin-left: auto;
            margin-right: 20px;
            animation: fadeInUp 0.5s ease-out;
        `;
        navContainer.appendChild(indicator);
    }
}

function showWelcomePremiumMessage() {
    // Criar mensagem de boas-vindas
    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'welcome-premium-message';
    welcomeDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            max-width: 300px;
            z-index: 1500;
            animation: slideInRight 0.5s ease-out;
        ">
            <h4 style="margin-bottom: 10px;">🎉 Bem-vindo ao Premium!</h4>
            <p style="margin: 0; font-size: 0.9rem;">Você agora tem acesso completo a todo o conteúdo exclusivo do FitLife!</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                position: absolute;
                top: 10px;
                right: 10px;
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
            ">×</button>
        </div>
    `;
    
    document.body.appendChild(welcomeDiv);
    
    // Remover mensagem após 5 segundos
    setTimeout(() => {
        if (welcomeDiv.parentElement) {
            welcomeDiv.remove();
        }
    }, 5000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('premiumModal');
        if (event.target === modal) {
            closePremiumModal();
        }
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closePremiumModal();
        }
    });
    
    // Adicionar animação de scroll suave aos links do menu
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                scrollToSection(targetId);
            }
        });
    });
    
    // Adicionar animação de entrada aos cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observar todos os cards
    const cards = document.querySelectorAll('.about-card, .content-card, .premium-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
    
    // Adicionar efeito de contador animado no preço
    animatePriceCounter();
});

function animatePriceCounter() {
    const priceElement = document.querySelector('.amount');
    if (priceElement) {
        const finalValue = 20;
        let currentValue = 0;
        const increment = finalValue / 20;
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(counter);
            }
            priceElement.textContent = Math.floor(currentValue);
        }, 50);
    }
}

// Adicionar animação de slide da direita
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);