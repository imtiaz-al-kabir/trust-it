

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  handleDarkMode();
  handleMobileMenu();
  handleStickyNavbar();
  handleScrollReveal();
  handleContactForm();
}

/**
 * THEME MANAGEMENT */
function handleDarkMode() {
  const html = document.documentElement;
  const toggles = document.querySelectorAll('#dark-mode-toggle, #dark-mode-toggle-mobile');
  
  // update icons based on current theme
  const updateIcons = (isDark) => {
    document.querySelectorAll('.sun-icon, #sun-icon').forEach(el => 
      isDark ? el.classList.remove('hidden') : el.classList.add('hidden'));
    document.querySelectorAll('.moon-icon, #moon-icon').forEach(el => 
      isDark ? el.classList.add('hidden') : el.classList.remove('hidden'));
  };

  // Initial Theme Setup
  const isDarkSaved = localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  if (isDarkSaved) {
    html.classList.add('dark');
    updateIcons(true);
  }

  // Toggle Listener
  toggles.forEach(btn => btn.addEventListener('click', () => {
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateIcons(isDark);
  }));
}

/**
 *NAVIGATION & MOBILE MENU
 */
function handleMobileMenu() {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  const toggleMenu = () => mobileMenu.classList.toggle('hidden');
  const closeMenu = () => mobileMenu.classList.add('hidden');

  menuBtn?.addEventListener('click', toggleMenu);
  
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

function handleStickyNavbar() {
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    const isScrolled = window.scrollY > 50;
    navbar.classList.toggle('glass', isScrolled);
    navbar.classList.toggle('shadow-md', isScrolled);
    navbar.classList.toggle('py-1', isScrolled); // Tighter padding on scroll
    navbar.classList.toggle('py-2', !isScrolled);
  });
}

/**
 * SCROLL ANIMATIONS
 */
function handleScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  const checkReveal = () => {
    const triggerBottom = window.innerHeight * 0.9;
    reveals.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) el.classList.add('active');
    });
  };

  window.addEventListener('scroll', checkReveal);
  checkReveal(); 
}

/**
 * FORM LOGIC & VALIDATION
 */
function handleContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const validators = {
    name: (val) => val.trim().length > 0,
    email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    message: (val) => val.trim().length >= 5
  };

  const validateField = (id) => {
    const input = document.getElementById(id);
    const error = document.getElementById(`${id}-error`);
    const isValid = validators[id](input.value);
    
    error?.classList.toggle('hidden', isValid);
    input.classList.toggle('border-red-500', !isValid);
    return isValid;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const isNameValid = validateField('name');
    const isEmailValid = validateField('email');
    const isMsgValid = validateField('message');

    if (isNameValid && isEmailValid && isMsgValid) {
      await simulateSubmission(form);
    }
  });

  // Real-time validation feedback
  ['name', 'email', 'message'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => validateField(id));
  });
}

async function simulateSubmission(form) {
  const btn = form.querySelector('button[type="submit"]');
  const successMsg = document.getElementById('form-success');
  const originalText = btn.innerText;

  btn.disabled = true;
  btn.innerText = 'Processing...';

  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 1500));

  form.reset();
  btn.innerText = originalText;
  btn.disabled = false;
  
  successMsg?.classList.remove('hidden');
  setTimeout(() => successMsg?.classList.add('hidden'), 5000);
}
