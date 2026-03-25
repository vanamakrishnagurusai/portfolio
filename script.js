document.addEventListener('DOMContentLoaded', () => {
    
    // --- Hamburger Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScrollTop = scrollTop;
    });


    // --- Intersection Observers for Scroll Animations ---
    const fadeElements = document.querySelectorAll('.fade-in-up, .reveal');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(
        entries,
        appearOnScroll
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                if (entry.target.classList.contains('fade-in-up')) {
                    entry.target.classList.add('appear');
                }
                if (entry.target.classList.contains('reveal')) {
                    entry.target.classList.add('active');
                }
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // --- Dynamic Mouse Blob Effect (Optional visual enhancement) ---
    // Moving the blob subtly towards mouse movement
    const blob = document.querySelector('.blob-bg');
    if (blob) {
        document.body.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            blob.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    // --- Scroll Tracking for Navbar ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    const trackingOptions = {
        threshold: 0.3
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let currentId = entry.target.getAttribute('id');
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + currentId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, trackingOptions);

    sections.forEach(sec => {
        sectionObserver.observe(sec);
    });

    // --- EmailJS Contact Form ---
    // IMPORTANT: Replace these with your actual EmailJS credentials
    // 1. Go to https://www.emailjs.com/ and create a free account
    // 2. Add an Email Service (Gmail, Outlook, etc.) and copy the Service ID
    // 3. Create an Email Template and copy the Template ID
    //    - Use {{from_name}}, {{from_email}}, {{message}} as template variables
    // 4. Go to Account > General and copy your Public Key
    const EMAILJS_PUBLIC_KEY = 'eXWRGT2evQdadQpLl';
    const EMAILJS_SERVICE_ID = 'service_6aqbkxs';
    const EMAILJS_TEMPLATE_ID = 'template_vjbr4xp';

    emailjs.init(EMAILJS_PUBLIC_KEY);

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            const templateParams = {
                from_name: document.getElementById('user-name').value,
                from_email: document.getElementById('user-email').value,
                message: document.getElementById('user-message').value,
            };

            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                .then(function() {
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
                    btn.style.background = 'linear-gradient(135deg, #00f5a0, #00d9f5)';
                    contactForm.reset();
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 3000);
                }, function(error) {
                    btn.innerHTML = '<i class="fa-solid fa-xmark"></i> Failed to Send';
                    btn.style.background = 'linear-gradient(135deg, #ff416c, #ff4b2b)';
                    console.error('EmailJS Error:', error);
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 3000);
                });
        });
    }
});
