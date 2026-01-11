// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(255, 182, 193, 0.3)';
    } else {
        navbar.style.boxShadow = '0 2px 15px rgba(255, 182, 193, 0.2)';
    }
});

// Animate elements on scroll
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

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.cake-card, .step-card, .testimonial-card, .gallery-item, .contact-item, .feature-item'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Gallery item click handler (for future lightbox implementation)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        // Add lightbox functionality here if needed
        console.log('Gallery item clicked');
    });
});

// WhatsApp button click tracking (optional)
document.querySelectorAll('.btn-whatsapp, .floating-whatsapp').forEach(btn => {
    btn.addEventListener('click', () => {
        // Track WhatsApp clicks if analytics is needed
        console.log('WhatsApp button clicked');
    });
});

// Scroll-based gradient color shift (optimized with requestAnimationFrame)
let scrollTicking = false;
const body = document.body;
const cream = '255, 247, 242'; // #FFF7F2

function updateGradientOnScroll() {
    const scrolled = window.pageYOffset;
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const scrollPercent = Math.min(scrolled / maxScroll, 1);
    
    // Calculate color mix based on scroll position
    // More lavender at top (0), more peach as we scroll down (1)
    const lavenderWeight = 1 - scrollPercent * 0.25; // Starts at 1, goes to 0.75
    const peachWeight = 0.25 + scrollPercent * 0.35; // Starts at 0.25, goes to 0.6
    
    // Lavender: #C6B7E2 (198, 183, 226)
    // Peach: #FFB7A5 (255, 183, 165)
    const lavenderR = 198, lavenderG = 183, lavenderB = 226;
    const peachR = 255, peachG = 183, peachB = 165;
    
    // Create smooth color transition
    const currentLavenderR = Math.round(lavenderR * lavenderWeight + peachR * (1 - lavenderWeight));
    const currentLavenderG = Math.round(lavenderG * lavenderWeight + peachG * (1 - lavenderWeight));
    const currentLavenderB = Math.round(lavenderB * lavenderWeight + peachB * (1 - lavenderWeight));
    
    const currentPeachR = Math.round(peachR * peachWeight + lavenderR * (1 - peachWeight));
    const currentPeachG = Math.round(peachG * peachWeight + lavenderG * (1 - peachWeight));
    const currentPeachB = Math.round(peachB * peachWeight + lavenderB * (1 - peachWeight));
    
    // Apply with smooth transition
    body.style.background = `linear-gradient(135deg, 
        rgb(${currentLavenderR}, ${currentLavenderG}, ${currentLavenderB}) 0%, 
        rgb(${cream}) 50%, 
        rgb(${currentPeachR}, ${currentPeachG}, ${currentPeachB}) 100%)`;
    body.style.backgroundSize = '200% 200%';
    
    scrollTicking = false;
}

window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        window.requestAnimationFrame(updateGradientOnScroll);
        scrollTicking = true;
    }
}, { passive: true });

// Form validation for future contact form
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ff6b6b';
        } else {
            input.style.borderColor = '';
        }
    });
    
    return isValid;
}

// Add loading animation for images (when real images are added)
function loadImage(img) {
    return new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = img.dataset.src || img.src;
    });
}

// Initialize all images lazy loading
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(entry.target);
                imageObserver.unobserve(entry.target);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add hover effect to floating WhatsApp button
const floatingWhatsApp = document.querySelector('.floating-whatsapp');
if (floatingWhatsApp) {
    floatingWhatsApp.addEventListener('mouseenter', () => {
        floatingWhatsApp.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    floatingWhatsApp.addEventListener('mouseleave', () => {
        floatingWhatsApp.style.transform = 'scale(1) rotate(0deg)';
    });
}

// Console welcome message
console.log('%c🍰 Annapurna Bakery 🍰', 'font-size: 20px; color: #FFB6C1; font-weight: bold;');
console.log('%cBaked with Love, Served with Blessings', 'font-size: 14px; color: #E6E6FA;');
console.log('%cप्यार से बना, आशीर्वाद के साथ', 'font-size: 14px; color: #E6E6FA;');
