// Custom Cursor
const cursor = document.createElement('div');
const cursorFollower = document.createElement('div');
cursor.classList.add('cursor');
cursorFollower.classList.add('cursor-follower');
document.body.appendChild(cursor);
document.body.appendChild(cursorFollower);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX - 4 + 'px';
  cursor.style.top = e.clientY - 4 + 'px';
  
  setTimeout(() => {
    cursorFollower.style.left = e.clientX - 15 + 'px';
    cursorFollower.style.top = e.clientY - 15 + 'px';
  }, 80);
});

// Hover effect on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .service-card, .tech-item');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorFollower.style.width = '50px';
    cursorFollower.style.height = '50px';
    cursorFollower.style.borderColor = '#ff6b35';
  });
  el.addEventListener('mouseleave', () => {
    cursorFollower.style.width = '30px';
    cursorFollower.style.height = '30px';
    cursorFollower.style.borderColor = '#00d4ff';
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Parallax effect on hero
  const hero = document.querySelector('.hero');
  if (hero && window.scrollY < 600) {
    hero.style.transform = `translateY(${window.scrollY * 0.3}px)`;
  }
});

// Scroll animations using Intersection Observer
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

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s ease';
  observer.observe(card);
});

// Observe tech items
document.querySelectorAll('.tech-item').forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'scale(0.8)';
  item.style.transition = 'all 0.5s ease';
  observer.observe(item);
});

// Counter animation for stats
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 30);
}

// Initialize counters when stats come into view
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numberElement = entry.target.querySelector('.stat-number');
      if (numberElement && !numberElement.dataset.animated) {
        const target = parseInt(numberElement.textContent);
        numberElement.dataset.animated = 'true';
        animateCounter(numberElement, target);
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(stat => {
  statObserver.observe(stat);
});

// Testimonial slider
function initTestimonialSlider() {
  const testimonials = document.querySelectorAll('#testimonialSlider .testimonial');
  const navContainer = document.getElementById('testimonialNav');
  
  if (testimonials.length && navContainer) {
    navContainer.innerHTML = '';
    
    testimonials.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('nav-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => showTestimonial(i));
      navContainer.appendChild(dot);
    });
    
    let currentIdx = 0;
    let autoSlideInterval;
    
    function showTestimonial(index) {
      testimonials.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.nav-dot').forEach(d => d.classList.remove('active'));
      testimonials[index].classList.add('active');
      document.querySelectorAll('.nav-dot')[index]?.classList.add('active');
      currentIdx = index;
      
      // Reset auto-slide timer
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }
    
    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        currentIdx = (currentIdx + 1) % testimonials.length;
        showTestimonial(currentIdx);
      }, 5000);
    }
    
    startAutoSlide();
  }
}

// Mobile menu toggle
function toggleMenu() {
  const menu = document.getElementById('nav-menu');
  if (menu) {
    menu.classList.toggle('show');
  }
}
window.toggleMenu = toggleMenu;

// Set active nav link
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav ul li a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else if (currentPage === 'index.html' && href === 'index.html') {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Contact form handler
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Simulate sending (replace with actual API call)
      setTimeout(() => {
        alert('✨ Thank you for your message! Our team will respond within 24 hours.');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1000);
    });
    
    // Add floating label effect
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement.classList.remove('focused');
        }
      });
    });
  }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '') {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Glow effect on cards
document.querySelectorAll('.service-card, .tech-item').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  setActiveNavLink();
  initTestimonialSlider();
  initContactForm();
  
  // Add loading animation to body
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});