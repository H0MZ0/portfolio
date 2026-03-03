/* =============================================
   Mobile Navigation Toggle
   ============================================= */
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
    const expanded = navToggle.classList.contains('active');
    navToggle.setAttribute('aria-expanded', expanded);
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});


/* =============================================
   Navbar Scroll Effect
   ============================================= */
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.97)';
        navbar.style.boxShadow  = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.9)';
        navbar.style.boxShadow  = 'none';
    }
}, { passive: true });


/* =============================================
   Scroll Progress Bar
   ============================================= */
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress  = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = `${progress}%`;
}, { passive: true });


/* =============================================
   Back to Top Button
   ============================================= */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}, { passive: true });

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* =============================================
   Active Navigation Highlighting
   ============================================= */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    let current = '';

    // If at the bottom of the page, force the last section active
    const atBottom = window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 10;
    if (atBottom) {
        current = sections[sections.length - 1].getAttribute('id');
    } else {
        sections.forEach(section => {
            const sectionTop    = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
    }

    navAnchors.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Run immediately on load so the first section is highlighted
updateActiveNav();
window.addEventListener('scroll', updateActiveNav, { passive: true });


/* =============================================
   Scroll-triggered Animations (IntersectionObserver)
   ============================================= */
const animateEls = document.querySelectorAll(
    'section, .project-card, .skill-category, .stat-card, .contact-card, .timeline-item'
);

animateEls.forEach(el => el.classList.add('js-animate'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

animateEls.forEach(el => observer.observe(el));


/* =============================================
   Animated Counters for Stat Cards
   ============================================= */
function animateCounter(el, duration = 1800) {
    const target     = parseFloat(el.dataset.target);
    const hasPlus    = el.dataset.hasPlus === 'true';
    let startTime    = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current  = Math.round(eased * target);
        el.textContent = (hasPlus ? '+' : '') + current;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = (hasPlus ? '+' : '') + target; // ensure exact final value
    }
    requestAnimationFrame(step);
}

// Store targets, show 0 initially
const statNumbers = document.querySelectorAll('.stat-number');
statNumbers.forEach(el => {
    const raw = el.textContent.trim();
    if (raw === '∞' || el.querySelector('svg')) return; // skip infinity
    el.dataset.target  = parseFloat(raw.replace('+', ''));
    el.dataset.hasPlus = raw.includes('+');
    el.textContent     = (raw.includes('+') ? '+' : '') + '0';
});

const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const inkLine = entry.target.querySelector('.ink-line');
        if (entry.isIntersecting) {
            if (inkLine) {
                inkLine.classList.add('animate');
            } else if (entry.target.dataset.target) {
                animateCounter(entry.target);
            }
        } else {
            if (inkLine) {
                inkLine.classList.remove('animate');
            } else if (entry.target.dataset.target) {
                // Reset to 0 so it re-animates next time
                const hasPlus = entry.target.dataset.hasPlus === 'true';
                entry.target.textContent = (hasPlus ? '+' : '') + '0';
            }
        }
    });
}, { threshold: 0.6 });

statNumbers.forEach(el => counterObs.observe(el));


/* =============================================
   Typewriter Effect on Hero Title
   ============================================= */
const titleEl   = document.querySelector('.title');
const titleText = 'Software Engineer';

if (titleEl) {
    titleEl.textContent = '';
    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    cursor.setAttribute('aria-hidden', 'true');
    titleEl.appendChild(cursor);

    let i = 0;
    function typeWriter() {
        if (i < titleText.length) {
            cursor.insertAdjacentText('beforebegin', titleText[i]);
            i++;
            setTimeout(typeWriter, 60);
        }
    }
    setTimeout(typeWriter, 700);
}


/* =============================================
   Code Block Line Fade-in Animation
   ============================================= */
const codeElement = document.querySelector('.code-block code');
if (codeElement) {
    const lines = codeElement.innerHTML.split('\n');
    codeElement.innerHTML = lines
        .map((line, index) =>
            `<span class="code-line" style="animation-delay: ${index * 0.1}s">${line}</span>`
        )
        .join('\n');
}


/* =============================================
   Console Easter Egg
   ============================================= */
console.log('%c Hello, Developer! 👋', 'font-size: 20px; font-weight: bold; color: #7c3aed;');
console.log('%c Interested in how this was built? Check out the source code!', 'font-size: 12px; color: #a1a1aa;');
