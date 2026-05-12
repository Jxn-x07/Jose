// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255,255,255,0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
    } else {
        navbar.style.background = 'rgba(255,255,255,0.96)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.03)';
    }
});

// FILTROS DE PRODUCTOS
const filterButtons = document.querySelectorAll('.filter-btn');
const products = document.querySelectorAll('.product-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        products.forEach(product => {
            if (filterValue === 'all' || product.getAttribute('data-category') === filterValue) {
                product.style.display = 'block';
                setTimeout(() => {
                    product.style.opacity = '1';
                    product.style.transform = 'scale(1)';
                }, 50);
            } else {
                product.style.opacity = '0';
                product.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    product.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Animación de entrada
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
    card.style.transitionDelay = `${index * 0.03}s`;
    observer.observe(card);
});

// Smooth scroll para el indicador
document.querySelector('.hero-scroll-indicator')?.addEventListener('click', () => {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
});

// ===== FLIP 3D EN MÓVIL (AL TOCAR) =====
// Mismo efecto que en desktop pero con click/tap

function setupMobileFlip() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Remover event listener previo si existe
        if (card.clickHandler) {
            card.removeEventListener('click', card.clickHandler);
        }
        
        // Crear nuevo handler
        card.clickHandler = function(e) {
            // Evitar que se active al hacer clic en el botón de WhatsApp
            if (e.target.closest('.wa-btn-card')) return;
            
            // Cerrar otras tarjetas abiertas (solo en móvil)
            if (window.innerWidth <= 768) {
                productCards.forEach(other => {
                    if (other !== this && other.classList.contains('flipped')) {
                        other.classList.remove('flipped');
                    }
                });
            }
            
            // Toggle el flip de la tarjeta actual
            this.classList.toggle('flipped');
        };
        
        card.addEventListener('click', card.clickHandler);
    });
}

// Inicializar el flip para todos los dispositivos
// En desktop: hover funciona, pero también permitimos click para móviles táctiles
setupMobileFlip();

// En desktop, también permitir que al hacer click fuera se cierre la tarjeta (opcional)
document.addEventListener('click', function(e) {
    // Solo para móvil y si hay una tarjeta abierta
    if (window.innerWidth <= 768) {
        const isProductCard = e.target.closest('.product-card');
        if (!isProductCard) {
            // Cerrar todas las tarjetas abiertas
            document.querySelectorAll('.product-card.flipped').forEach(card => {
                card.classList.remove('flipped');
            });
        }
    }
});

// Re-verificar al cambiar tamaño de pantalla
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Si cambia a desktop, asegurar que no hay tarjetas flipeadas
        if (window.innerWidth > 768) {
            document.querySelectorAll('.product-card.flipped').forEach(card => {
                card.classList.remove('flipped');
            });
        }
        setupMobileFlip();
    }, 250);
});

console.log('Catálogo - Flip 3D: Desktop (hover) | Móvil (tap)');