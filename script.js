/* ===================================================
   NAVBAR – Scroll shrink + Active link highlight
=================================================== */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Shrink navbar on scroll
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link based on scroll position
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
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

/* ===================================================
   MOBILE MENU TOGGLE
=================================================== */
const menuIcon = document.getElementById('menu-icon');
const navLinksContainer = document.getElementById('nav-links');

menuIcon.addEventListener('click', () => {
  navLinksContainer.classList.toggle('open');
  menuIcon.classList.toggle('bx-x');
  menuIcon.classList.toggle('bx-menu');
});

// Close menu when a link is clicked
navLinksContainer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinksContainer.classList.remove('open');
    menuIcon.classList.remove('bx-x');
    menuIcon.classList.add('bx-menu');
  });
});

/* ===================================================
   SCROLL REVEAL ANIMATION
=================================================== */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

/* ===================================================
   SKILL BARS – Animate on scroll
=================================================== */
const skillsSection = document.querySelector('.skills-animation');

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bars = entry.target.querySelectorAll('.progress-bar');
      bars.forEach(bar => {
        const value = bar.getAttribute('aria-valuenow');
        bar.style.width = value + '%';
      });
      skillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

/* ===================================================
   TYPING ANIMATION
=================================================== */
const typingEl = document.querySelector('.typing-text');
const roles = [
  'Associate Application Developer',
  'ServiceNow Developer',
  'AI & ML Enthusiast',
  'Cloud Solutions Builder',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function type() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typingEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 40;
  } else {
    typingEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 80;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    typingSpeed = 1500; // Pause before deleting
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 400;
  }

  setTimeout(type, typingSpeed);
}

if (typingEl) {
  setTimeout(type, 800);
}

/* ===================================================
   CONTACT FORM – Basic feedback
=================================================== */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('.submit-btn span');
    const originalText = btn.textContent;

    btn.textContent = 'Sending...';
    contactForm.querySelector('.submit-btn').disabled = true;

    // Simulate send (replace with real backend/EmailJS)
    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      contactForm.reset();

      setTimeout(() => {
        btn.textContent = originalText;
        contactForm.querySelector('.submit-btn').disabled = false;
      }, 3000);
    }, 1500);
  });
}