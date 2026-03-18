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
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ========== TEXT REVEAL ON SCROLL ==========
const revealContainer = document.getElementById('revealText');
if (revealContainer) {
    const paragraph = revealContainer.querySelector('p');
    const text = paragraph.textContent;
    paragraph.innerHTML = text.split(' ').map(word =>
        `<span class="reveal-word">${word}</span>`
    ).join(' ');

    const words = revealContainer.querySelectorAll('.reveal-word');
    const thresholds = Array.from({ length: 100 }, (_, i) => i / 100);

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const ratio = entry.intersectionRatio;
                const wordsToLight = Math.ceil(ratio * words.length);
                words.forEach((word, i) => {
                    word.classList.toggle('lit', i < wordsToLight);
                });
            }
        });
    }, { threshold: thresholds, rootMargin: '0px 0px -10% 0px' });

    revealObserver.observe(revealContainer);
}

// ========== ANIMATED COUNTERS ==========
function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const duration = 2000;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * eased);
        el.textContent = prefix + current;
        if (progress < 1) {
            requestAnimationFrame(update);
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

document.querySelectorAll('.cred-number[data-target]').forEach(el => counterObserver.observe(el));

// ========== SCROLL ANIMATIONS (STAGGER FADE-IN) ==========
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
    '.origin-block, .bento-card, .cred-item'
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
        }, 3000);
    });
}
