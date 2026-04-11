/**
 * Main JavaScript for Huzefa's Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Loader ---
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('fade-out');
    }, 800); // Small delay to show off the loader
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- 2. Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.add('scrolled'); // Force solid if desired, but let's toggle
            if (window.scrollY === 0) {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // --- 3. Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // --- 4. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('active');
            // observer.unobserve(entry.target); // Optional: stop observing once revealed
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- 5. Skill Modals Data ---
    const skillsData = {
        'editing': {
            icon: 'fa-wand-magic-sparkles',
            title: 'Editing',
            desc: 'General precision editing, enhancing colors, cleaning up rough edges, and ensuring every design is visually perfect before delivery.'
        },
        'graphic-design': {
            icon: 'fa-pen-nib',
            title: 'Graphic Design',
            desc: 'Creating visual concepts from scratch to communicate ideas that inspire, inform, and captivate consumers. Including layout, typography, and color theory.'
        },
        'banner-design': {
            icon: 'fa-image',
            title: 'Banner Design',
            desc: 'Custom, high-resolution banners perfect for Twitch, YouTube headers, websites, and digital ad campaigns designed for high click-through rates.'
        },
        'logo-design': {
            icon: 'fa-shapes',
            title: 'Logo Design',
            desc: 'Crafting unique, memorable, and highly scalable logos. Whether minimal or complex, I ensure your brand identity stands out.'
        },
        'photo-editing': {
            icon: 'fa-camera-retro',
            title: 'Photo Editing',
            desc: 'Advanced retouching, background removal, color grading, and composition to make standard photography look like a masterpiece.'
        },
        'poster-design': {
            icon: 'fa-file-image',
            title: 'Poster Design',
            desc: 'Eye-catching promotional posters for events, movies, and advertising that perfectly balances typography and imagery.'
        },
        'flyer-design': {
            icon: 'fa-note-sticky',
            title: 'Flyer Design',
            desc: 'Engaging, clean, and modern flyers designed to highlight key information while remaining visually striking for digital or print distribution.'
        },
        'video-editing': {
            icon: 'fa-film',
            title: 'Video Editing',
            desc: 'Basic to intermediate video editing including seamless cuts, motion graphics, text overlays, and sound syncing for YouTube, TikTok, or Reels.'
        },
        'web-dev': {
            icon: 'fa-code',
            title: 'Website Development',
            desc: 'Building responsive, modern, and high-performance websites. From personal portfolios to business landing pages, I ensure a premium look and seamless user experience on all devices.'
        }
    };

    // --- 6. Skill Modal Logic ---
    const skillCards = document.querySelectorAll('.skill-card');
    const modalOverlay = document.getElementById('skillModal');
    const modalClose = document.querySelector('.modal-close');
    
    // Modal Content Elements
    const modalIcon = document.querySelector('.modal-icon');
    const modalTitle = document.querySelector('.modal-title');
    const modalDesc = document.querySelector('.modal-desc');

    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            const skillKey = card.getAttribute('data-skill');
            const data = skillsData[skillKey];
            
            if(data) {
                // Remove existing FontAwesome classes
                modalIcon.className = 'modal-icon fa-solid ' + data.icon;
                modalTitle.textContent = data.title;
                modalDesc.textContent = data.desc;
                
                modalOverlay.classList.add('active');
            }
        });
    });

    modalClose.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
        if(e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            modalOverlay.classList.remove('active');
        }
    });

    // --- 7. Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinksList = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });



    // --- 9. FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Check if it's already active
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current if it wasn't already active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // --- 10. Interactive UI Sounds (Web Audio API) ---
    // Note: AudioContext is only allowed to start after a user gesture (like a click)
    let audioCtx = null;

    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    function playSound(type) {
        if (!audioCtx) return;

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        if (type === 'hover') {
            // Soft high-pitched tech tick
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime);
            gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.05);
        } else if (type === 'click') {
            // Extremely subtle, professional soft tap
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.04);
            gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.04);
        }
    }

    // Initialize audio solely on the first click anywhere
    document.body.addEventListener('click', () => {
        initAudio();
    }, { once: true });

    // Attach sounds to iteractive elements
    const soundElements = document.querySelectorAll('a, button, .skill-card, .service-card, .portfolio-card, .portfolio-img, .faq-item');
    
    soundElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            playSound('hover');
        });
        
        el.addEventListener('click', () => {
            initAudio(); // Guarantee context is active before clicking
            playSound('click');
        });
    });

    // --- 11. Lightbox Gallery ---
    const lightboxOverlay = document.getElementById('imageLightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const portfolioImages = document.querySelectorAll('.portfolio-img');

    if(lightboxOverlay && lightboxImg) {
        portfolioImages.forEach(img => {
            img.addEventListener('click', () => {
                const src = img.getAttribute('src');
                if(src) {
                    lightboxImg.setAttribute('src', src);
                    lightboxOverlay.classList.add('active');
                    // Audio clicks are handled by the soundElements logic above
                }
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightboxOverlay.classList.remove('active');
        });

        lightboxOverlay.addEventListener('click', (e) => {
            if(e.target === lightboxOverlay) {
                lightboxOverlay.classList.remove('active');
            }
        });

        document.addEventListener('keydown', (e) => {
            if(e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
                lightboxOverlay.classList.remove('active');
            }
        });
    }

    // --- 12. AJAX Form Submission (Prevent 404) ---
    const reviewForm = document.getElementById('review-form');
    const contactForm = document.getElementById('portfolio-form');
    const successModal = document.getElementById('formSuccessModal');
    const successClose = document.querySelector('.btn-success-close');

    function handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';

        // Submit to StaticForms via AJAX
        fetch(form.action, {
            method: "POST",
            body: formData,
            headers: { 
                "Accept": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                // If status is not 200, it's a server error
                throw new Error("Server Error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.success) {
                successModal.classList.add('active');
                form.reset();
            } else {
                // Show the specific error message if it exists, otherwise a generic one
                const errorMsg = data.message || data.error || "Unknown Error";
                alert("Oops! " + errorMsg + "\n\nTip: Make sure you replaced YOUR_STATICFORMS_KEY with your actual key in the HTML file.");
            }
        })
        .catch((error) => {
            console.error("Form submission error:", error);
            alert("Connection Error. Please ensure you have pushed your new HTML code with your Access Key to GitHub.");
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        });
    }

    if (reviewForm) reviewForm.addEventListener('submit', handleFormSubmit);
    if (contactForm) contactForm.addEventListener('submit', handleFormSubmit);

    if (successClose) {
        successClose.addEventListener('click', () => {
            successModal.classList.remove('active');
        });
    }
    
    // Close success modal on overlay click
    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }

});
