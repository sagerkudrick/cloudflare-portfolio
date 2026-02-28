// ─── Nav: highlight active section on scroll ───
const nav = document.getElementById('sitenav');
const navLinks = document.querySelectorAll('.sitenav-link');
const sections = document.querySelectorAll('section[id]');

function updateNav() {
    let current = '';
    sections.forEach(section => {
        if (section.getBoundingClientRect().top <= 80) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ─── Smooth scrolling for all anchor links ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = nav.classList.contains('visible') ? 60 : 0;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ─── Scroll-triggered animations ───
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

document.querySelectorAll('.project-card, .experience-card, .publication-card').forEach(card => {
    observer.observe(card);
});

// ─── Image lazy loading ───
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                imageObserver.unobserve(img);
            }
        }
    });
});

document.querySelectorAll('.project-image img').forEach(img => {
    if (img.dataset.src) {
        imageObserver.observe(img);
    }
});

// ─── Click-to-swap for side-by-side images ───
document.querySelectorAll('.project-images.side-by-side').forEach(container => {
    container.querySelectorAll('.project-image').forEach(image => {
        image.addEventListener('click', (e) => {
            e.stopPropagation();
            container.classList.toggle('swapped');
        });
    });
});
