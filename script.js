document.addEventListener('DOMContentLoaded', () => {
    // Loading screen
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        initAnimations();
    }, 2200);

    createParticles();
    initScrollReveal();
    initNavbar();
    initAccordions();
    initPrintButton();
    initChannelNav();
    initScrollProgress();
    initMinimap();
    initPartnerStagger();
});

// ===== SCROLL PROGRESS BAR =====
function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / docHeight) * 100;
        bar.style.width = progress + '%';
    }, { passive: true });
}

// ===== MINIMAP NAVIGATION =====
function initMinimap() {
    const sectionData = [
        { id: 'hero', label: 'פתיח' },
        { id: 'problem', label: 'הבעיה' },
        { id: 'context', label: 'הקשר' },
        { id: 'solution', label: 'הפתרון' },
        { id: 'channel1', label: 'מסלול א׳' },
        { id: 'channel2', label: 'מסלול ב׳' },
        { id: 'channel3', label: 'מסלול ג׳' },
        { id: 'budget', label: 'תקציב' },
        { id: 'timeline', label: 'לו״ז' },
        { id: 'partners', label: 'שותפים' },
        { id: 'cta', label: 'החלטות' }
    ];

    const minimap = document.createElement('nav');
    minimap.className = 'minimap';
    minimap.setAttribute('aria-label', 'ניווט מהיר');

    sectionData.forEach(s => {
        const dot = document.createElement('a');
        dot.className = 'minimap-dot';
        dot.href = '#' + s.id;
        dot.setAttribute('data-label', s.label);
        dot.setAttribute('data-section', s.id);
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
        });
        minimap.appendChild(dot);
    });

    document.body.appendChild(minimap);

    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        const heroH = document.getElementById('hero')?.offsetHeight || 0;
        if (window.scrollY > heroH * 0.6) {
            minimap.classList.add('visible');
        } else {
            minimap.classList.remove('visible');
        }
    }, { passive: true });
}

function updateMinimap() {
    const dots = document.querySelectorAll('.minimap-dot');
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach(section => {
        const top = section.offsetTop - 150;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });

    dots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-section') === current) {
            dot.classList.add('active');
        }
    });
}

// ===== PARTNER STAGGER =====
function initPartnerStagger() {
    document.querySelectorAll('.partner-logo-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.08}s`;
        card.classList.add('reveal');
    });
}

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    let lastScroll = 0;

    // Show navbar after scrolling past hero
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroH = document.getElementById('hero').offsetHeight;

        if (scrollY > heroH * 0.6) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
        lastScroll = scrollY;

        // Update active nav link + minimap
        updateActiveNav();
        updateMinimap();
    }, { passive: true });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(section => {
        const top = section.offsetTop - 100;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// ===== ACCORDIONS =====
function initAccordions() {
    document.querySelectorAll('.accordion-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const content = document.getElementById(targetId);
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                content.classList.add('collapsed');
                btn.setAttribute('aria-expanded', 'false');
            } else {
                content.classList.remove('collapsed');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// ===== PRINT / PDF =====
function initPrintButton() {
    document.getElementById('printBtn').addEventListener('click', () => {
        // Expand all accordions before printing
        document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('collapsed'));
        document.querySelectorAll('.accordion-toggle').forEach(b => b.setAttribute('aria-expanded', 'true'));
        // Make all reveals visible
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
        setTimeout(() => window.print(), 300);
    });
}

// ===== CHANNEL NAV =====
function initChannelNav() {
    document.querySelectorAll('.model-channel').forEach(ch => {
        ch.addEventListener('click', () => {
            const id = ch.getAttribute('data-channel');
            const target = document.getElementById('channel' + id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ===== PARTICLES =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 60; i++) {
        const p = document.createElement('div');
        p.style.cssText = `
            position:absolute;
            width:${Math.random()*4+1}px; height:${Math.random()*4+1}px;
            background:rgba(255,255,255,${Math.random()*0.3+0.05});
            border-radius:50%;
            left:${Math.random()*100}%; top:${Math.random()*100}%;
            animation:float ${Math.random()*15+10}s linear infinite;
            animation-delay:${Math.random()*10}s;
        `;
        container.appendChild(p);
    }
    const s = document.createElement('style');
    s.textContent = `
        @keyframes float {
            0% { transform:translateY(0) translateX(0); opacity:0; }
            10% { opacity:1; }
            90% { opacity:1; }
            100% { transform:translateY(-100vh) translateX(${Math.random()>0.5?'':'-'}50px); opacity:0; }
        }
    `;
    document.head.appendChild(s);
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const selectors = [
        '.story-grid', '.problem-stats', '.visual-card',
        '.context-bottom-line',
        '.model-visual', '.model-channel',
        '.channel-deep-header', '.pilot-overview', '.kpi-bar',
        '.budget-grid', '.budget-total', '.budget-card', '.budget-visual',
        '.timeline-card', '.roi-card',
        '.partner-card', '.cta-item',
        '.context-grid', '.partners-logo-wall', '.cta-items',
        '.urgency-section'
    ];

    selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Animate KPI values
                entry.target.querySelectorAll('.kpi-value').forEach(el => animateKPI(el));
                // Animate hero numbers
                entry.target.querySelectorAll('.hero-stat-number[data-target]').forEach(el => animateNumber(el));
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ===== ANIMATE KPI VALUES =====
function animateKPI(el) {
    if (el.dataset.animated) return;
    el.dataset.animated = 'true';

    const text = el.textContent.trim();
    // Extract number and surrounding text
    const match = text.match(/^([^\d]*)([\d.,:]+)(.*)$/);
    if (!match) {
        // No number found (e.g. "לאומי"), just pop in
        el.style.opacity = '0';
        el.style.transform = 'scale(0.5)';
        setTimeout(() => {
            el.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            el.style.opacity = '1';
            el.style.transform = 'scale(1)';
        }, 100);
        return;
    }

    const prefix = match[1];
    const numStr = match[2].replace(/,/g, '');
    const suffix = match[3];
    const target = parseFloat(numStr);
    const isDecimal = numStr.includes('.');
    const duration = 1500;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        let current = target * eased;
        if (isDecimal) {
            current = current.toFixed(1);
        } else {
            current = Math.round(current);
        }
        el.textContent = prefix + current + suffix;
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = text; // restore original
        }
    }
    requestAnimationFrame(update);
}

// ===== ANIMATE HERO NUMBERS =====
function animateNumber(el) {
    if (el.dataset.animated) return;
    el.dataset.animated = 'true';

    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = target + suffix;
        }
    }
    requestAnimationFrame(update);
}

// ===== INIT ANIMATIONS =====
function initAnimations() {
    document.querySelectorAll('.hero-stat-number[data-target]').forEach(el => animateNumber(el));

    document.querySelectorAll('.model-channel').forEach((ch, i) => {
        ch.style.transitionDelay = `${i * 0.15}s`;
    });

    // Stagger timeline cards
    document.querySelectorAll('.timeline-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.12}s`;
    });

    // Stagger budget cards
    document.querySelectorAll('.budget-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.1}s`;
    });

    // Stagger partner cards
    document.querySelectorAll('.partner-logo-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.08}s`;
    });

    // Stagger CTA items
    document.querySelectorAll('.cta-item').forEach((item, i) => {
        item.style.transitionDelay = `${i * 0.15}s`;
    });

    // Stagger context cards
    document.querySelectorAll('.context-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.12}s`;
    });
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    const sections = ['hero','problem','context','solution','channel1','channel2','channel3','budget','timeline','partners','cta'];
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        navigateSection(sections, 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        navigateSection(sections, -1);
    }
});

function navigateSection(sections, direction) {
    const scrollY = window.scrollY;
    for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i]);
        if (!el) continue;
        if (direction > 0 && el.offsetTop > scrollY + 100) {
            el.scrollIntoView({ behavior: 'smooth' });
            return;
        }
        if (direction < 0 && el.offsetTop < scrollY - 100) {
            document.getElementById(sections[i]).scrollIntoView({ behavior: 'smooth' });
        }
    }
    if (direction < 0) {
        document.getElementById(sections[0]).scrollIntoView({ behavior: 'smooth' });
    }
}

console.log('🚀 המקפצה — מערכת הצגה לוועדת ההיגוי מוכנה | גרסה משודרגת');
