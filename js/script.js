/* ==============================================
   TUX STUDIO - MAIN JAVASCRIPT
   Premium Digital Agency Website
   Author: TUX Studio
   Version: 1.0.0
   ============================================== */

// ==================== DOM READY ====================
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ==================== LOADING SCREEN ====================
    initLoadingScreen();

    // ==================== DARK MODE ====================
    initDarkMode();

    // ==================== NAVBAR ====================
    initNavbar();

    // ==================== MOBILE MENU ====================
    initMobileMenu();

    // ==================== SMOOTH SCROLL ====================
    initSmoothScroll();

    // ==================== SCROLL REVEAL ====================
    initScrollReveal();

    // ==================== BACK TO TOP ====================
    initBackToTop();

    // ==================== HERO PARTICLES ====================
    initHeroParticles();

    // ==================== COUNTER ANIMATION ====================
    initCounterAnimation();

    // ==================== FAQ ACCORDION ====================
    initFaqAccordion();

    // ==================== PORTFOLIO FILTER ====================
    initPortfolioFilter();

    // ==================== REVIEWS SLIDER ====================
    initReviewsSlider();

    // ==================== CONTACT FORM ====================
    initContactForm();

    // ==================== CURRENT YEAR ====================
    updateCurrentYear();
});

// ==================== LOADING SCREEN ====================
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingBarFill = document.getElementById('loadingBarFill');
    const loadingStatus = document.getElementById('loadingStatus');

    if (!loadingScreen) return;

    // محاكاة تحميل تدريجي
    let progress = 0;
    const interval = setInterval(function() {
        progress += Math.random() * 30 + 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            if (loadingBarFill) loadingBarFill.style.width = '100%';
            if (loadingStatus) loadingStatus.textContent = 'جاهز!';

            // إخفاء شاشة التحميل
            setTimeout(function() {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 400);
        } else {
            if (loadingBarFill) loadingBarFill.style.width = progress + '%';
        }
    }, 200);

    // منع التمرير أثناء التحميل
    document.body.style.overflow = 'hidden';

    // إخفاء فوري إذا تم تحميل الصفحة سريعاً
    window.addEventListener('load', function() {
        clearInterval(interval);
        if (loadingBarFill) loadingBarFill.style.width = '100%';
        if (loadingStatus) loadingStatus.textContent = 'جاهز!';
        setTimeout(function() {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    });
}

// ==================== DARK MODE ====================
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');

    if (!darkModeToggle || !darkModeIcon) return;

    // التحقق من التفضيل المحفوظ
    const savedTheme = localStorage.getItem('tux-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
    }

    darkModeToggle.addEventListener('click', function() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('tux-theme', 'light');
            darkModeIcon.classList.remove('fa-sun');
            darkModeIcon.classList.add('fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('tux-theme', 'dark');
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
        }
    });
}

// ==================== NAVBAR ====================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    // تأثير التمرير على Navbar
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // إضافة/إزالة class scrolled
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // تحديث الرابط النشط عند التمرير
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

// تحديث الرابط النشط في Navbar
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    const scrollPos = window.pageYOffset + 150;

    sections.forEach(function(section) {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(function(link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!mobileToggle || !mobileMenu) return;

    // فتح/إغلاق القائمة
    mobileToggle.addEventListener('click', function() {
        mobileToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // إغلاق القائمة عند النقر على رابط
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // إغلاق القائمة عند النقر على الخلفية
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu || e.target === mobileMenu.querySelector('::before')) {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80; // حساب ارتفاع Navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== SCROLL REVEAL ====================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');

    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    });

    revealElements.forEach(function(element) {
        revealObserver.observe(element);
    });
}

// ==================== BACK TO TOP ====================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== HERO PARTICLES ====================
function initHeroParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // حجم عشوائي
        const size = Math.random() * 6 + 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // موقع عشوائي
        particle.style.left = Math.random() * 100 + '%';

        // مدة حركة عشوائية
        const duration = Math.random() * 15 + 10;
        particle.style.animationDuration = duration + 's';

        // تأخير عشوائي
        const delay = Math.random() * 10;
        particle.style.animationDelay = delay + 's';

        // شفافية عشوائية
        particle.style.opacity = Math.random() * 0.15 + 0.05;

        container.appendChild(particle);
    }
}

// ==================== COUNTER ANIMATION ====================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // مدة العد بالمللي ثانية
                const increment = target / (duration / 16); // 60fps

                let current = 0;
                const updateCounter = function() {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(function(counter) {
        counterObserver.observe(counter);
    });
}

// ==================== FAQ ACCORDION ====================
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            // إغلاق جميع الأسئلة الأخرى ( accordion mode )
            faqItems.forEach(function(otherItem) {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // تبديل حالة السؤال الحالي
            item.classList.toggle('active', !isActive);
        });
    });
}

// ==================== PORTFOLIO FILTER ====================
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (!filterBtns.length || !portfolioItems.length) return;

    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // تحديث الزر النشط
            filterBtns.forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            portfolioItems.forEach(function(item) {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    // تأثير fade in
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(function() {
                        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ==================== REVIEWS SLIDER ====================
function initReviewsSlider() {
    const slider = document.getElementById('reviewsSlider');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    const dots = document.querySelectorAll('.slider-dot');

    if (!slider) return;

    const slides = slider.querySelectorAll('.review-card');
    if (!slides.length) return;

    let currentSlide = 0;
    let autoSlideInterval;

    // دالة الانتقال لشريحة محددة
    function goToSlide(index) {
        // التأكد من الحدود
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        // إزالة active من الشريحة الحالية
        slides[currentSlide].classList.remove('active');

        // إضافة active للشريحة الجديدة
        slides[index].classList.add('active');

        // تحديث النقاط
        if (dots.length) {
            dots.forEach(function(dot, i) {
                dot.classList.toggle('active', i === index);
            });
        }

        currentSlide = index;
    }

    // التالي
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // السابق
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // أحداث الأزرار
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            resetAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            resetAutoSlide();
        });
    }

    // أحداث النقاط
    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            goToSlide(index);
            resetAutoSlide();
        });
    });

    // التبديل التلقائي
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // كل 5 ثواني
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // بدء التبديل التلقائي
    if (slides.length > 1) {
        startAutoSlide();
    }

    // إيقاف التبديل التلقائي عند تمرير الماوس
    slider.addEventListener('mouseenter', function() {
        clearInterval(autoSlideInterval);
    });

    slider.addEventListener('mouseleave', function() {
        if (slides.length > 1) {
            startAutoSlide();
        }
    });

    // دعم السحب باللمس (Touch Swipe)
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) { // حد أدنى للسحب
            if (diff > 0) {
                nextSlide(); // سحب لليسار -> التالي
            } else {
                prevSlide(); // سحب لليمين -> السابق
            }
            resetAutoSlide();
        }
    }
}

// ==================== CONTACT FORM ====================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // جمع بيانات النموذج
        const formData = new FormData(form);
        const data = {};
        formData.forEach(function(value, key) {
            data[key] = value;
        });

        // التحقق من البيانات المطلوبة
        if (!data.name || !data.phone || !data.message) {
            showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }

        // هنا يمكنك إرسال البيانات للخادم
        // مثال: fetch('/api/contact', { method: 'POST', body: formData })

        // عرض رسالة نجاح
        showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');

        // إعادة تعيين النموذج
        form.reset();

        // فتح واتساب كبديل (اختياري)
        // const whatsappMessage = `مرحباً، اسمي: ${data.name}\nرقمي: ${data.phone}\nالخدمة: ${data.service || 'غير محدد'}\nالرسالة: ${data.message}`;
        // window.open(`https://wa.me/966501234567?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    });
}

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type) {
    // إزالة أي إشعار سابق
    const existingNotification = document.querySelector('.tux-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = 'tux-notification tux-notification--' + type;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    // إضافة أنماط CSS للإشعار
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 1.5rem;
        left: 1.5rem;
        max-width: 400px;
        margin: 0 auto;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 600;
        font-size: 0.875rem;
        z-index: 9999;
        transform: translateY(-20px);
        opacity: 0;
        transition: all 0.3s ease;
        direction: rtl;
    `;

    document.body.appendChild(notification);

    // ظهور الإشعار
    requestAnimationFrame(function() {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    });

    // إخفاء الإشعار بعد 4 ثواني
    setTimeout(function() {
        notification.style.transform = 'translateY(-20px)';
        notification.style.opacity = '0';
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 4000);
}

// ==================== CURRENT YEAR ====================
function updateCurrentYear() {
    const yearElements = document.querySelectorAll('#currentYear');
    const currentYear = new Date().getFullYear();

    yearElements.forEach(function(el) {
        el.textContent = currentYear;
    });
}

// ==================== PARALLAX EFFECT ====================
// تأثير بسيط للبارالاكس على صور Hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');

    parallaxElements.forEach(function(el) {
        const speed = el.getAttribute('data-speed') || 0.5;
        el.style.transform = 'translateY(' + (scrolled * speed) + 'px)';
    });
});

// ==================== KEYBOARD NAVIGATION ====================
// دعم مفاتيح الأسهم لسلايدر المراجعات
document.addEventListener('keydown', function(e) {
    const slider = document.getElementById('reviewsSlider');
    if (!slider || !slider.closest('.reviews-slider-section')) return;

    if (e.key === 'ArrowLeft') {
        const nextBtn = document.getElementById('sliderNext');
        if (nextBtn) nextBtn.click();
    } else if (e.key === 'ArrowRight') {
        const prevBtn = document.getElementById('sliderPrev');
        if (prevBtn) prevBtn.click();
    }
});

// ==================== PERFORMANCE: Lazy Loading Images ====================
// دعم تحميل الصور المتأخر للمتصفحات التي لا تدعم native lazy loading
if ('loading' in HTMLImageElement.prototype) {
    // المتصفح يدعم lazy loading
} else {
    // تنفيذ lazy loading يدوي
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if (lazyImages.length && 'IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src') || img.src;
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
}

// ==================== CONSOLE BRANDING ====================
console.log(
    '%c TUX Studio %c https://tuxstudio.com ',
    'background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; font-size: 20px; font-weight: bold; padding: 8px 16px; border-radius: 8px;',
    'background: #f1f5f9; color: #475569; font-size: 14px; padding: 8px 16px; border-radius: 8px; margin-left: 8px;'
);
console.log('%cحلول رقمية متكاملة - شريكك الموثوق في التحول الرقمي', 'color: #6366f1; font-size: 14px; font-weight: 600;');
