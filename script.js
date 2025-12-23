/* =========================
   GLOBAL UTILITIES
========================= */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

/* =========================
   TYPEWRITER EFFECT
========================= */
function initTypewriter() {
    const el = $('#typewriter');
    if (!el) return;

    const messages = [
        "Engineering Excellence in South Sudan",
        "Reliable Construction Support and Supplies",
        "Your Trusted Partner for Projects in Juba"
    ];

    let msgIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
        const text = messages[msgIndex];

        if (!deleting) {
            el.textContent = text.slice(0, charIndex++);
            if (charIndex > text.length) {
                deleting = true;
                setTimeout(type, 1500);
                return;
            }
        } else {
            el.textContent = text.slice(0, charIndex--);
            if (charIndex < 0) {
                deleting = false;
                msgIndex = (msgIndex + 1) % messages.length;
            }
        }

        setTimeout(type, deleting ? 50 : 100);
    }

    type();
}

/* =========================
   MOBILE MENU (FIXED)
========================= */
function initMobileMenu() {
    const btn = $('.mobile-menu-btn');
    const menu = $('nav ul');

    if (!btn || !menu) return;

    const openMenu = () => {
        menu.classList.add('active');
        btn.innerHTML = '<i class="fas fa-times"></i>';
        document.body.classList.add('menu-open');
    };

    const closeMenu = () => {
        menu.classList.remove('active');
        btn.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.classList.remove('menu-open');
    };

    btn.addEventListener('click', e => {
        e.stopPropagation();
        menu.classList.contains('active') ? closeMenu() : openMenu();
    });

    // Close on link click
    $$('nav a').forEach(link =>
        link.addEventListener('click', closeMenu)
    );

    // Close on outside click
    document.addEventListener('click', e => {
        if (!menu.contains(e.target) && !btn.contains(e.target)) {
            closeMenu();
        }
    });
}

/* =========================
   SCROLL TO TOP + REVEAL
========================= */
function initScrollTop() {
    const btn = $('.scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('active', window.scrollY > 300);

        $$('.reveal').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 120) {
                el.classList.add('active');
            }
        });
    });

    btn.addEventListener('click', () =>
        window.scrollTo({ top: 0, behavior: 'smooth' })
    );
}

/* =========================
   CONTACT FORM
========================= */
function initContactForm() {
    const form = $('#contactForm');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();

        const fields = ['name', 'phone', 'email', 'message'];
        const values = fields.map(id => $(`#${id}`).value.trim());

        if (values.some(v => !v)) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }

        showNotification(
            `Thank you ${values[0]}! We will contact you shortly.`,
            'success'
        );
        form.reset();
    });
}

/* =========================
   NOTIFICATIONS
========================= */
function showNotification(msg, type = 'success') {
    $('.notification')?.remove();

    const note = document.createElement('div');
    note.className = `notification ${type}`;
    note.innerHTML = `
        <span>${msg}</span>
        <button>&times;</button>
    `;

    document.body.appendChild(note);

    setTimeout(() => note.classList.add('show'), 10);

    const remove = () => {
        note.classList.remove('show');
        setTimeout(() => note.remove(), 300);
    };

    note.querySelector('button').addEventListener('click', remove);
    setTimeout(remove, 5000);
}

/* =========================
   FAQ ACCORDION (FIXED)
========================= */
function initFAQ() {
    const items = $$('.faq-item');
    if (!items.length) return;

    items.forEach(item => {
        const q = $('.faq-question', item);
        const a = $('.faq-answer', item);
        const toggle = $('.faq-toggle', item);

        a.style.maxHeight = null;

        q.addEventListener('click', () => {
            items.forEach(other => {
                if (other !== item) {
                    $('.faq-answer', other).style.maxHeight = null;
                    $('.faq-toggle', other).textContent = '+';
                }
            });

            if (a.style.maxHeight) {
                a.style.maxHeight = null;
                toggle.textContent = '+';
            } else {
                a.style.maxHeight = a.scrollHeight + 'px';
                toggle.textContent = '−';
            }
        });
    });
}

/* =========================
   PROJECT FILTERING
========================= */
function initProjectFilter() {
    const buttons = $$('.filter-btn');
    const cards = $$('.project-card');
    if (!buttons.length) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            cards.forEach(card => {
                const match =
                    filter === 'all' ||
                    card.dataset.category?.includes(filter);

                card.style.display = match ? 'block' : 'none';
            });
        });
    });
}

/* =========================
   INITIALIZE EVERYTHING
========================= */
document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    initMobileMenu();
    initScrollTop();
    initContactForm();
    initFAQ();
    initProjectFilter();

    // Footer year
    const year = $('#currentYear');
    if (year) year.textContent = new Date().getFullYear();

    // Active nav link
    const page = location.pathname.split('/').pop() || 'index.html';
    $$('nav a').forEach(link => {
        if (link.getAttribute('href') === page) {
            link.classList.add('active');
        }
    });

    window.dispatchEvent(new Event('scroll'));
});
