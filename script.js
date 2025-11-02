// Theme toggle persistence
const body = document.body;
const toggleBtn = document.getElementById('theme-toggle');
const icon = toggleBtn.querySelector('i');

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') {
  body.classList.add('light-mode');
  icon.className = 'fas fa-moon';
}
toggleBtn.addEventListener('click', () => {
  const isLight = body.classList.toggle('light-mode');
  localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
  icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
});

// Typed.js intro
document.addEventListener('DOMContentLoaded', () => {
  if (window.Typed) {
    new Typed('#typed-text', {
      strings: ['Web Developer', 'Python Programmer', 'Cloud Explorer', 'Open-Source Contributor'],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1400,
      loop: true
    });
  }

  // Scroll reveal
  if (window.ScrollReveal) {
    ScrollReveal().reveal('.card, .project-card', {
      distance: '24px',
      duration: 700,
      easing: 'cubic-bezier(.2,.8,.2,1)',
      origin: 'bottom',
      interval: 80,
    });
  }

  // Back-to-top button
  const topBtn = document.getElementById('top-btn');
  window.addEventListener('scroll', () => {
    topBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
  });
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Formspree feedback
  const form = document.getElementById('contact-form');
  const note = document.querySelector('.form-note');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    note.textContent = 'Sending...';
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    })
      .then((res) => {
        if (res.ok) {
          note.textContent = 'Message sent successfully!';
          form.reset();
        } else {
          note.textContent = 'Error sending message.';
        }
      })
      .catch(() => (note.textContent = 'Network error. Try again.'));
  });
});
