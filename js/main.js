/* ============================================
   PORTFOLIO — Brian Van Bellinghen
   JavaScript: Interactions & Animations
   ============================================ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ===== Typing Effect ===== */
const typedText = document.getElementById('typed');
const phrases = [
    'whoami',
    'cat skills.json',
    'ls -la projects/',
    'echo "Hello World"',
    'sudo deploy --prod'
];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;

function typeEffect() {
    const current = phrases[phraseIdx];

    if (!isDeleting) {
        typedText.textContent = current.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
        setTimeout(typeEffect, 80 + Math.random() * 40);
    } else {
        typedText.textContent = current.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            setTimeout(typeEffect, 400);
            return;
        }
        setTimeout(typeEffect, 40);
    }
}
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typedText.textContent = phrases[0];
} else {
    typedText.textContent = '';
    typeEffect();
}

/* ===== Navbar Scroll ===== */
const navbar = document.getElementById('navbar');

/* ===== Active Nav Link on Scroll ===== */
const sections = document.querySelectorAll('section, header');
const navItems = document.querySelectorAll('.nav-link');

let scrollTicking = false;
window.addEventListener('scroll', () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        navbar.classList.toggle('scrolled', scrollY > 50);

        let current = '';
        sections.forEach(section => {
            if (scrollY >= section.offsetTop - 120) {
                current = section.getAttribute('id');
            }
        });
        navItems.forEach(item => {
            if (item.getAttribute('href') === `#${current}`) {
                item.style.color = 'var(--accent)';
            } else {
                item.style.color = '';
            }
        });

        scrollTicking = false;
    });
});

/* ===== Mobile Menu ===== */
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
const isMobile = () => window.getComputedStyle(burger).display !== 'none';

function closeMenu() {
    burger.classList.remove('active');
    navLinks.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
    if (isMobile()) navLinks.setAttribute('aria-hidden', 'true');
}

burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('active');
    navLinks.classList.toggle('active', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    if (isMobile()) navLinks.setAttribute('aria-hidden', String(!isOpen));
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMenu();
        burger.focus();
    }
});

/* ===== Scroll Reveal ===== */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Stagger child reveals within grids
            const siblings = entry.target.parentElement?.querySelectorAll('.reveal');
            if (siblings && siblings.length > 1) {
                const idx = Array.from(siblings).indexOf(entry.target);
                entry.target.style.transitionDelay = `${idx * 0.08}s`;
            }
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ===== Counter Animation ===== */
const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count, 10);
            if (prefersReducedMotion) {
                el.textContent = target;
                counterObserver.unobserve(el);
                return;
            }
            el.textContent = '0';
            let current = 0;
            const increment = target / 40;
            const update = () => {
                current += increment;
                if (current < target) {
                    el.textContent = Math.floor(current);
                    requestAnimationFrame(update);
                } else {
                    el.textContent = target;
                }
            };
            update();
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

/* ===== Particle Background ===== */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };
let animId = null;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.4 + 0.1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        // Mouse interaction
        if (mouse.x) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                const force = (120 - dist) / 120;
                this.x -= dx * force * 0.02;
                this.y -= dy * force * 0.02;
            }
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(88, 230, 196, ${this.opacity})`;
        ctx.fill();
    }
}

function initParticles() {
    const count = Math.min(80, Math.floor(window.innerWidth / 18));
    particles = [];
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}
initParticles();
window.addEventListener('resize', initParticles);

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 130) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(88, 230, 196, ${0.08 * (1 - dist / 130)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    animId = requestAnimationFrame(animateParticles);
}
if (!prefersReducedMotion) {
    animateParticles();
}

/* ===== Pause Particles on Tab Hidden ===== */
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (animId) { cancelAnimationFrame(animId); animId = null; }
    } else if (!prefersReducedMotion && !animId) {
        animateParticles();
    }
});
