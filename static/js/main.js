/**
 * NetConnect Solutions - Main JavaScript File
 * Updated with flash message handling
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('NetConnect Solutions website loaded successfully');
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation classes on scroll
    function checkScroll() {
        const elements = document.querySelectorAll('.service-card, .contact-info, .value-icon, .service-area-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Update copyright year automatically
    const copyrightElement = document.querySelector('#currentYear');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.textContent = currentYear;
    }
    
    // Navbar scroll effect - Updated for white navbar
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        // Add/remove shadow on scroll
        if (scrollTop > 10) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Handle active nav links
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active', 'text-white', 'bg-primary');
            link.classList.add('text-dark');
            
            const linkPath = link.getAttribute('href');
            if (currentPath === linkPath || 
                (currentPath === '/' && linkPath === '/') ||
                (currentPath.includes(linkPath) && linkPath !== '/')) {
                link.classList.add('active', 'text-white',);
                link.classList.remove('text-dark');
            }
        });
    }
    
    setActiveNavLink();
    
    // Handle flash messages from Flask
    function showFlashMessages() {
        const flashContainer = document.createElement('div');
        flashContainer.className = 'flash-messages';
        document.body.appendChild(flashContainer);
        
        // Check if there are flash messages in the template
        const flashMessages = document.querySelectorAll('.alert-flash');
        flashMessages.forEach(message => {
            flashContainer.appendChild(message);
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                message.style.opacity = '0';
                message.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    message.remove();
                }, 300);
            }, 5000);
        });
    }
    
    showFlashMessages();
    
    // Add hover effects to all cards
    const cards = document.querySelectorAll('.card, .service-card, .contact-info');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
});

