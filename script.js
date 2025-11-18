// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Cursor effects
const interactiveElements = document.querySelectorAll('a, button, .work-item, .cta-button, .nav-link');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.background = 'transparent';
        cursor.style.border = '2px solid var(--accent)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.width = '8px';
        cursor.style.height = '8px';
        cursor.style.background = 'var(--accent)';
        cursor.style.border = 'none';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.backdropFilter = 'blur(30px)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.8)';
        header.style.backdropFilter = 'blur(20px)';
    }
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');

            // Animate counters when about section is in view
            if (entry.target.classList.contains('about-content')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.work-item, .about-content, .about-image, .contact-form');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Update copyright year
    const yearElement = document.querySelector('.footer-left p');
    if (yearElement) {
        yearElement.textContent = `© ${new Date().getFullYear()} LEONID ORLOV. ALL RIGHTS RESERVED.`;
    }

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simple validation
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const message = this.querySelector('#message').value;

            if (!name || !email || !message) {
                showNotification('Пожалуйста, заполните все поля', 'error');
                return;
            }

            if (!email.includes('@')) {
                showNotification('Пожалуйста, введите корректный email', 'error');
                return;
            }

            // Simulate form submission
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.querySelector('span').textContent;

            submitButton.querySelector('span').textContent = 'Отправляется...';
            submitButton.disabled = true;

            setTimeout(() => {
                showNotification('Сообщение отправлено! Спасибо за ваше обращение.', 'success');
                this.reset();
                submitButton.querySelector('span').textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Add animation class when elements come into view
    const animatedElements = document.querySelectorAll('.work-item, .about-content, .about-image');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: var(--shadow-soft);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Parallax effect for hero image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-img');
    if (heroImage) {
        const rate = scrolled * 0.3;
        heroImage.style.transform = `scale(1.05) translateY(${rate}px)`;
    }
});

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(notificationStyles);