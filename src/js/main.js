// Header scroll effect - transforms to white on scroll
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    header.classList.add("header-sticky");
  } else {
    header.classList.remove("header-sticky");
  }
});

// Mobile menu - wrapped in DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileBackdrop = document.getElementById("mobile-backdrop");
  const mobileCloseBtn = document.querySelector('.mobile-close-btn');
  const menuIcon = document.querySelector('.menu-icon');
  const menuClose = document.querySelector('.menu-close');

  if (mobileMenuBtn && mobileMenu) {
    function openMobileMenu() {
      mobileMenu.classList.remove('-translate-x-full');
      mobileMenu.classList.add('translate-x-0');
      if (mobileBackdrop) mobileBackdrop.classList.remove('hidden');
      if (menuIcon) menuIcon.classList.add('hidden');
      if (menuClose) menuClose.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
      mobileMenu.classList.add('-translate-x-full');
      mobileMenu.classList.remove('translate-x-0');
      if (mobileBackdrop) mobileBackdrop.classList.add('hidden');
      if (menuIcon) menuIcon.classList.remove('hidden');
      if (menuClose) menuClose.classList.add('hidden');
      document.body.style.overflow = '';
    }

    mobileMenuBtn.addEventListener("click", openMobileMenu);
    if (mobileCloseBtn) mobileCloseBtn.addEventListener("click", closeMobileMenu);
    if (mobileBackdrop) mobileBackdrop.addEventListener("click", closeMobileMenu);

    // Mobile Accordion functionality
    document.querySelectorAll('.mobile-accordion-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const accordion = this.parentElement;
        const content = accordion.querySelector('.accordion-content');
        const arrow = this.querySelector('.accordion-arrow');
        
        if (content) {
          content.classList.toggle('hidden');
          // Handle max-height animation
          if (content.classList.contains('hidden')) {
            content.style.maxHeight = '0';
          } else {
            content.style.maxHeight = '500px';
          }
        }
        if (arrow) arrow.classList.toggle('rotate-180');
        
        // Close others when one opens
        document.querySelectorAll('.mobile-accordion-btn').forEach(otherBtn => {
          if (otherBtn !== this) {
            const otherContent = otherBtn.parentElement.querySelector('.accordion-content');
            const otherArrow = otherBtn.querySelector('.accordion-arrow');
            if (otherContent) {
              otherContent.classList.add('hidden');
              otherContent.style.maxHeight = '0';
            }
            if (otherArrow) otherArrow.classList.remove('rotate-180');
          }
        });
      });
    });

    // Close mobile menu when clicking any link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Mobile Sub-Accordion functionality
    document.querySelectorAll('.mobile-sub-accordion-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const subAccordion = this.parentElement;
        const subContent = subAccordion.querySelector('.sub-accordion-content');
        const subArrow = this.querySelector('.sub-arrow');
        
        if (subContent) subContent.classList.toggle('hidden');
        if (subArrow) subArrow.classList.toggle('rotate-180');
      });
    });
  }
});

// Premium Hero Swiper Slider
document.addEventListener('DOMContentLoaded', function() {
  const heroSwiper = new Swiper('.hero-swiper', {
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    loop: true,
    navigation: {
      nextEl: '.nav-next',
      prevEl: '.nav-prev',
    },
  });

  // Update dot indicators on slide change
  const dots = document.querySelectorAll('.dot');
  
  function updateDots() {
    const currentIndex = heroSwiper.realIndex;
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Add click handlers for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      heroSwiper.slideToLoop(index);
    });
  });

  heroSwiper.on('slideChange', updateDots);
  setTimeout(updateDots, 500);

  // Destinations Swiper - Clean Standard with 3D Hover
  const destSwiper = new Swiper('.destination-swiper', {
    slidesPerView: 3,
    spaceBetween: 24,
    speed: 800,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    loop: true,
    centeredSlides: true,
    navigation: {
      nextEl: '.destination-nav-next',
      prevEl: '.destination-nav-prev',
    },
    pagination: {
      el: '.destination-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
});

// Counter Animation on Scroll
document.addEventListener('DOMContentLoaded', function() {
  const counters = document.querySelectorAll('.counter');
  
  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easeOut * target);
      
      element.textContent = currentValue;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };
    
    requestAnimationFrame(updateCounter);
  };
  
  // Intersection Observer to trigger animation when visible
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        if (!counter.classList.contains('animated')) {
          counter.classList.add('animated');
          animateCounter(counter);
        }
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
});

// Gallery Image Change Function
const aboutImages = [
  'https://www.muchbetteradventures.com/magazine/content/images/2018/05/08140741/download-3.jpeg',
  'https://images.squarespace-cdn.com/content/v1/5536fe98e4b01e6f1f249651/1583174876927-VLOWZZZ9HPFSSEF26GAM/Prayer+flags+in+Nepal',
  'https://res.klook.com/image/upload/w_750,h_469,c_fill,q_85/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/l16twmrbj2gxnqkbyck1.jpg',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900'
];
let currentAboutIndex = 0;
let aboutSlideshowInterval = null;

function updateAboutThumbnails(index) {
  const thumbs = document.querySelectorAll('.about-thumb');
  thumbs.forEach((thumb, i) => {
    if (i === index) {
      thumb.classList.remove('ring-transparent', 'hover:ring-copper');
      thumb.classList.add('ring-copper');
    } else {
      thumb.classList.remove('ring-copper');
      thumb.classList.add('ring-transparent', 'hover:ring-copper');
    }
  });
}

function changeAboutImage(index) {
  const mainImage = document.getElementById('about-main-image');
  if (!mainImage || index < 0 || index >= aboutImages.length) return;
  
  currentAboutIndex = index;
  
  mainImage.style.opacity = '0.5';
  mainImage.style.transform = 'scale(0.95)';
  
  setTimeout(() => {
    mainImage.src = aboutImages[index];
    mainImage.style.opacity = '1';
    mainImage.style.transform = 'scale(1)';
  }, 200);
  
  updateAboutThumbnails(index);
}

function startAboutSlideshow() {
  if (aboutSlideshowInterval) clearInterval(aboutSlideshowInterval);
  aboutSlideshowInterval = setInterval(() => {
    currentAboutIndex = (currentAboutIndex + 1) % aboutImages.length;
    changeAboutImage(currentAboutIndex);
  }, 5000);
}

function initAboutGallery() {
  if (!document.getElementById('about-main-image')) return;
  
  changeAboutImage(0);
  startAboutSlideshow();
}

document.addEventListener('DOMContentLoaded', initAboutGallery);

// Package Cards Scroll Animation
document.addEventListener('DOMContentLoaded', function() {
  const packageCards = document.querySelectorAll('.package-card');
  
  const packageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  packageCards.forEach(card => {
    packageObserver.observe(card);
  });
});

// Premium 3D Destinations Swiper
document.addEventListener('DOMContentLoaded', function() {
  const premiumSwiper = new Swiper('.destination-3d-swiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    initialSlide: 1,
    loop: true,
    loopedSlides: 3,
    speed: 800,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    coverflowEffect: {
      rotate: 8,
      stretch: 30,
      depth: 150,
      modifier: 1.5,
      slideShadows: false,
    },
    navigation: {
      nextEl: '.destination-3d-nav-next',
      prevEl: '.destination-3d-nav-prev',
    },
    pagination: {
      el: '.destination-3d-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 16,
        initialSlide: 0,
        coverflowEffect: {
          rotate: 5,
          stretch: 15,
          depth: 60,
          modifier: 1.1,
        },
      },
      640: {
        slidesPerView: 1.5,
        spaceBetween: 20,
        coverflowEffect: {
          rotate: 6,
          stretch: 20,
          depth: 80,
          modifier: 1.2,
        },
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 24,
        coverflowEffect: {
          rotate: 8,
          stretch: 30,
          depth: 150,
          modifier: 1.5,
        },
      },
    },
  });
});

// Bhutan Packages Swiper
document.addEventListener('DOMContentLoaded', function() {
  const bhutanContainer = document.querySelector('.bhutan-packages-swiper');
  
  if (bhutanContainer) {
    const bhutanSwiper = new Swiper('.bhutan-packages-swiper', {
      slidesPerView: 3,
      spaceBetween: 24,
      speed: 800,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.bhutan-swiper-next',
        prevEl: '.bhutan-swiper-prev',
      },
      pagination: {
        el: '.bhutan-packages-pagination',
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 16,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      },
    });
    console.log('Bhutan Swiper initialized:', bhutanSwiper);
  } else {
    console.log('Bhutan elements not found. Container:', bhutanContainer, 'Pagination:', bhutanPagin);
  }
});

// FAQ Accordion - CSS Grid Smooth Animation
document.querySelectorAll('.faq-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const answer = this.nextElementSibling;
    const isOpen = answer.classList.contains('open');

    // Close all others first
    document.querySelectorAll('.faq-btn').forEach(otherBtn => {
      if (otherBtn !== this) {
        otherBtn.classList.remove('active');
        otherBtn.nextElementSibling.classList.remove('open');
      }
    });

    // Toggle current
    this.classList.toggle('active');
    answer.classList.toggle('open');
  });
});

// Testimonials Swiper
document.addEventListener('DOMContentLoaded', function() {
  const testimonialSwiper = new Swiper('.testimonials-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    speed: 800,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.testimonial-next',
      prevEl: '.testimonial-prev',
    },
    pagination: {
      el: '.bhutan-swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 32,
      },
    },
  });
});

