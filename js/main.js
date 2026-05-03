
document.addEventListener('DOMContentLoaded', () => {
  
  // Dark Mode Toggle Logic
  
  const html = document.documentElement;
  const darkModeToggles = document.querySelectorAll('#dark-mode-toggle, #dark-mode-toggle-mobile');
  const sunIcons = document.querySelectorAll('.sun-icon, #sun-icon');
  const moonIcons = document.querySelectorAll('.moon-icon, #moon-icon');

  // Load theme from localStorage 
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    html.classList.add('dark');
    updateThemeIcons(true);
  }

  function updateThemeIcons(isDark) {
    sunIcons.forEach(icon => isDark ? icon.classList.remove('hidden') : icon.classList.add('hidden'));
    moonIcons.forEach(icon => isDark ? icon.classList.add('hidden') : icon.classList.remove('hidden'));
  }

  darkModeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const isDarkNow = html.classList.toggle('dark');
      localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');
      updateThemeIcons(isDarkNow);
    });
  });


  // MOBILE NAVIGATION 
  
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close menu 
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });


  // STICKY NAVBAR 
  
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('glass', 'shadow-md', 'py-2');
      navbar.classList.remove('py-4');
    } else {
      navbar.classList.remove('glass', 'shadow-md', 'py-2');
      navbar.classList.add('py-4');
    }
  });


  // SCROLL REVEAL ANIMATIONS.
  
  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    reveals.forEach(el => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const revealThreshold = 100; 
      
      if (elementTop < windowHeight - revealThreshold) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); 


  // CONTACT FORM VALIDATION 
  
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  
  // Validation Rules
  const fields = {
    name: {
      input: document.getElementById('name'),
      error: document.getElementById('name-error'),
      isValid: (val) => val.trim().length > 0
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('email-error'),
      isValid: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
    },
    message: {
      input: document.getElementById('message'),
      error: document.getElementById('message-error'),
      isValid: (val) => val.trim().length >= 5
    }
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let formValid = true;

      // Validate each field
      Object.keys(fields).forEach(key => {
        const field = fields[key];
        const value = field.input.value;
        
        if (!field.isValid(value)) {
          field.error.classList.remove('hidden');
          field.input.classList.add('border-red-500');
          formValid = false;
        } else {
          field.error.classList.add('hidden');
          field.input.classList.remove('border-red-500');
        }
      });

      // Handle successful validation
      if (formValid) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        
        // feedback for submission
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending Message...';

        //  network delay
        setTimeout(() => {
          contactForm.reset();
          submitBtn.innerText = originalBtnText;
          submitBtn.disabled = false;
          
          // Show success message
          formSuccess.classList.remove('hidden');
          setTimeout(() => formSuccess.classList.add('hidden'), 5000);
        }, 1500);
      }
    });

    // Remove error highlights as user types
    Object.keys(fields).forEach(key => {
      const field = fields[key];
      field.input.addEventListener('input', () => {
        if (field.isValid(field.input.value)) {
          field.error.classList.add('hidden');
          field.input.classList.remove('border-red-500');
        }
      });
    });
  }
});
