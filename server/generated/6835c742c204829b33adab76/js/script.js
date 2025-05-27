
// Enhanced NGO Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all features
  initSmoothScrolling();
  initMobileMenu();
  initScrollAnimations();
  initScrollProgress();
  initHeaderScroll();
  initContactForm();
  initParallaxEffects();

  // Smooth scrolling for navigation links
  function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu.classList.contains('active')) {
              navMenu.classList.remove('active');
            }
          }
        }
      });
    });
  }

  // Enhanced mobile menu toggle
  function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
      mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        this.classList.toggle('active');
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
          navMenu.classList.remove('active');
          mobileMenuBtn.classList.remove('active');
        }
      });
    }
  }

  // Enhanced scroll animations with Intersection Observer
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Add animation classes and observe elements
    const animatedElements = document.querySelectorAll('.team-member, .project-card, .about-text, .contact-info');
    animatedElements.forEach((el, index) => {
      // Add staggered delay
      el.style.transitionDelay = `${index * 0.1}s`;
      
      // Add appropriate animation class
      if (el.classList.contains('about-text')) {
        el.classList.add('slide-in-left');
      } else if (el.classList.contains('contact-info')) {
        el.classList.add('slide-in-right');
      } else {
        el.classList.add('fade-in');
      }
      
      observer.observe(el);
    });
  }

  // Scroll progress bar
  function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    });
  }

  // Header scroll effect
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset;
      
      if (scrollTop > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScrollTop = scrollTop;
    });
  }

  // Enhanced contact form handling
  function initContactForm() {
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
          // Show success message
          const successMessage = document.createElement('div');
          successMessage.className = 'success-message';
          successMessage.innerHTML = `
            <div style="background: rgba(34, 197, 94, 0.1); color: #16a34a; padding: 1rem; border-radius: 8px; margin-top: 1rem; text-align: center;">
              <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
              Thank you for your message! We'll get back to you soon.
            </div>
          `;
          
          this.appendChild(successMessage);
          this.reset();
          
          // Reset button
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          
          // Remove success message after 5 seconds
          setTimeout(() => {
            successMessage.remove();
          }, 5000);
        }, 2000);
      });
      
      // Real-time form validation
      const inputs = contactForm.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.addEventListener('blur', function() {
          validateField(this);
        });
        
        input.addEventListener('input', function() {
          if (this.classList.contains('error')) {
            validateField(this);
          }
        });
      });
    }
  }

  // Field validation helper
  function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Remove existing error styling
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
    
    // Validate based on field type
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      showFieldError(field, 'This field is required');
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
      isValid = false;
      showFieldError(field, 'Please enter a valid email address');
    }
    
    return isValid;
  }

  // Show field error
  function showFieldError(field, message) {
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.5rem;';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
  }

  // Email validation helper
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Parallax effects for hero section
  function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    if (hero) {
      window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
      });
    }
  }

  // Add loading animation to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      if (this.getAttribute('href') && this.getAttribute('href').startsWith('http')) {
        // External link - add loading effect
        const originalText = this.textContent;
        this.innerHTML = '<span class="loading"></span> Loading...';
        
        setTimeout(() => {
          this.textContent = originalText;
        }, 1000);
      }
    });
  });

  // Lazy loading for images
  const images = document.querySelectorAll('img');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        img.onload = () => {
          img.style.opacity = '1';
        };
        
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => {
    imageObserver.observe(img);
  });

  // Add CSS for error states
  const style = document.createElement('style');
  style.textContent = `
    .form-group input.error,
    .form-group textarea.error {
      border-color: #ef4444 !important;
      background-color: rgba(239, 68, 68, 0.05) !important;
    }
    
    .mobile-menu-btn.active {
      transform: rotate(90deg);
    }
  `;
  document.head.appendChild(style);
});
