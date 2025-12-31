// ================= FULL SCRIPT.JS =================
document.addEventListener('DOMContentLoaded', () => {

    // ================= PAGE LOADER =================
    const pageLoader = document.getElementById('pageLoader');
    const loaderProgress = document.getElementById('loaderProgress');

    if (pageLoader && loaderProgress) {
        // Add loading class to body to prevent scrolling
        document.body.classList.add('loading');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 3) + 1; // smooth random increment
            if (progress > 100) progress = 100;
            loaderProgress.style.width = progress + '%';
            
            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    pageLoader.classList.add('loaded');
                    document.body.classList.remove('loading');
                }, 500);
            }
        }, 20);
    }

    // ================= HERO TYPING ANIMATION =================
    const typewriterText = document.getElementById('typewriterText');
    const typewriterCursor = document.getElementById('typewriterCursor');
    
    if (typewriterText && typewriterCursor) {
        const heroTexts = [
            "Building Excellence in South Sudan",
            "Premium Residential and Commercial Projects",
            "Your Vision, Our Expertise",
            "Transforming Spaces, Building Communities"
        ];
        
        let txtIndex = 0;
        let charIndex = 0;
        let deleting = false;
        let typingSpeed = 100;
        let pauseTime = 1500;
        let isAnimating = true;

        function typeWriter() {
            if (!isAnimating) return;
            
            const currentText = heroTexts[txtIndex];
            
            if (!deleting) {
                typewriterText.textContent = currentText.slice(0, charIndex + 1);
                charIndex++;
                
                if (charIndex === currentText.length) {
                    deleting = true;
                    setTimeout(typeWriter, pauseTime);
                    return;
                }
            } else {
                typewriterText.textContent = currentText.slice(0, charIndex - 1);
                charIndex--;
                
                if (charIndex === 0) {
                    deleting = false;
                    txtIndex = (txtIndex + 1) % heroTexts.length;
                }
            }
            
            // Make cursor blink when typing
            typewriterCursor.style.animation = 'none';
            setTimeout(() => {
                typewriterCursor.style.animation = 'blink 0.7s infinite';
            }, 10);
            
            setTimeout(typeWriter, deleting ? typingSpeed / 2 : typingSpeed);
        }
        
        // Start typing animation
        typeWriter();
        
        // Pause animation when user is not viewing the hero section
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    isAnimating = true;
                    typeWriter();
                } else {
                    isAnimating = false;
                }
            });
        }, { threshold: 0.5 });
        
        if (typewriterText.parentElement) {
            observer.observe(typewriterText.parentElement);
        }
    }

    // ================= HEADER SCROLL EFFECT =================
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ================= FADE-IN EFFECTS ON SCROLL =================
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // ================= BACK TO TOP BUTTON =================
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ================= MOBILE MENU & DROPDOWN =================
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const mobileOverlay = document.getElementById('mobileOverlay');

    if (mobileBtn && mainNav && mobileOverlay) {
        // Toggle mobile menu
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            mainNav.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close mobile menu when clicking overlay
        mobileOverlay.addEventListener('click', () => {
            mobileBtn.classList.remove('active');
            mainNav.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            // Also close any open dropdowns
            document.querySelectorAll('.has-dropdown.open').forEach(dropdown => {
                dropdown.classList.remove('open');
            });
        });

        // Handle dropdown menus in mobile
        const dropdownParents = document.querySelectorAll('.has-dropdown > a');
        dropdownParents.forEach(parent => {
            parent.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const parentLi = parent.parentElement;
                    parentLi.classList.toggle('open');
                }
            });
        });

        // Close menu when clicking a link (for single page navigation)
        const navLinks = document.querySelectorAll('#mainNav a:not(.has-dropdown > a)');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    mobileBtn.classList.remove('active');
                    mainNav.classList.remove('active');
                    mobileOverlay.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
        });
    }

    // ================= SERVICES ACCORDION =================
    const serviceHeaders = document.querySelectorAll('.service-header');
    serviceHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const serviceItem = header.parentElement;
            serviceItem.classList.toggle('active');
            
            // Close other open service items (optional - for accordion behavior)
            document.querySelectorAll('.service-item.active').forEach(item => {
                if (item !== serviceItem) {
                    item.classList.remove('active');
                }
            });
        });
    });

    // ================= PROJECTS HOVER EFFECT =================
    const projectCards = document.querySelectorAll('.project-card, .project-preview-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '1';
        });
    });

    // ================= FORM VALIDATION =================
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const inputs = contactForm.querySelectorAll('.form-control[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#dc3545';
                } else {
                    input.style.borderColor = '#ddd';
                }
            });
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = 'Message Sent!';
                    submitBtn.style.background = '#28a745';
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        contactForm.reset();
                    }, 2000);
                }, 1500);
            }
        });
    }

    // ================= STATS COUNTER ANIMATION =================
    const statNumbers = document.querySelectorAll('.stat-number, .about-stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.textContent.replace(/[^0-9]/g, ''));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    statNumber.textContent = Math.floor(current) + (statNumber.textContent.includes('+') ? '+' : '');
                }, 16);
                
                statsObserver.unobserve(statNumber);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // ================= IMAGE LAZY LOADING =================
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // ================= RESIZE HANDLER =================
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Close mobile menu if window is resized to desktop
            if (window.innerWidth > 768 && mainNav && mobileOverlay) {
                mobileBtn.classList.remove('active');
                mainNav.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
                
                // Reset dropdowns on desktop
                document.querySelectorAll('.has-dropdown.open').forEach(dropdown => {
                    dropdown.classList.remove('open');
                });
            }
        }, 250);
    });

    // ================= SMOOTH SCROLL FOR ANCHOR LINKS =================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                // Calculate header height for offset
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ================= INITIALIZE ANIMATIONS =================
    // Trigger initial check for scroll-based elements
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);

    console.log('All scripts loaded successfully!');
});
