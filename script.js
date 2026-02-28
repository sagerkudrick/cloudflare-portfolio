// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll-triggered animations
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

document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Image lazy loading observer
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

// Click-to-swap functionality for side-by-side images
document.querySelectorAll('.project-images.side-by-side').forEach(container => {
    const images = container.querySelectorAll('.project-image');
    
    images.forEach(image => {
        image.addEventListener('click', (e) => {
            e.stopPropagation();
            container.classList.toggle('swapped');
        });
    });
});
