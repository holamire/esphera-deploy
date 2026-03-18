// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ========== MOBILE MENU ==========
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        // Scroll to target after menu transition completes
        if (href && href.startsWith('#') && href !== '#') {
            e.preventDefault();
            e.stopImmediatePropagation();
            const target = document.querySelector(href);
            if (target) {
                setTimeout(() => {
                    const top = target.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top, behavior: 'smooth' });
                }, 300);
            }
        }
    });
});

// ========== FAQ ACCORDION ==========
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});

// ========== ANIMATED COUNTERS ==========
function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const duration = 2000;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current = Math.round(target * eased);
        el.textContent = prefix + current;
        if (progress < 1) {
        requestAnimationFrame(update);
    } else {
        el.classList.add('counted');
    }
    }
    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.impact-number').forEach(el => counterObserver.observe(el));

// ========== SCROLL ANIMATIONS ==========
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
    '.step-card, .solution-row, .testimonial-card, .faq-item, .impact-card'
).forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
    observer.observe(el);
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const top = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ========== DEMO FORM ==========
const demoTitle = document.getElementById('demoTitle');
const demoSubtitle = document.getElementById('demoSubtitle');
const demoBadge = document.getElementById('demoBadge');
const genericTypeSelect = document.getElementById('genericTypeSelect');

// Handle demo type buttons from solutions section
document.querySelectorAll('[data-demo-type]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const type = btn.dataset.demoType;
        if (genericTypeSelect) genericTypeSelect.value = type;
        if (type === 'empresa') {
            demoTitle.innerHTML = 'Demo para<br>empresas';
            demoSubtitle.textContent = 'Te enseñamos cómo Esphera automatiza la contabilidad de tu departamento financiero.';
        } else if (type === 'gestoria') {
            demoTitle.innerHTML = 'Demo para<br>gestorías';
            demoSubtitle.textContent = 'Te enseñamos cómo gestionar más clientes sin ampliar equipo con Esphera.';
        }
        const target = document.getElementById('demo');
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// Form submit
const demoForm = document.getElementById('demoForm');
if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = demoForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '¡Enviado! Te contactamos pronto ✓';
        btn.style.background = '#5A9484';
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
            demoForm.reset();
            demoTitle.innerHTML = '¿Listo para dejar de<br>procesar facturas a mano?';
            demoSubtitle.textContent = 'Agenda una demo de 15 minutos. Te enseñamos cómo tu equipo puede ahorrarse horas cada semana.';
        }, 3000);
    });
}
