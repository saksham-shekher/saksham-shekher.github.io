// ---- Theme persistence ----
const body = document.body;
const toggleBtn = document.getElementById('theme-toggle');
const toggleIcon = toggleBtn.querySelector('i');

// initialize theme from localStorage
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') {
  body.classList.add('light-mode');
  toggleIcon.className = 'fas fa-moon';
} else {
  toggleIcon.className = 'fas fa-sun';
}

// toggle handler
toggleBtn.addEventListener('click', () => {
  const isLight = body.classList.toggle('light-mode');
  localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
  toggleIcon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
});

// ---- Typed.js intro ----
document.addEventListener('DOMContentLoaded', () => {
  if (window.Typed) {
    new Typed('#typed-text', {
      strings: ['Web Developer', 'Python Programmer', 'Cloud Explorer', 'Open-Source Contributor'],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1400,
      startDelay: 300,
      loop: true
    });
  }

  // ---- ScrollReveal for cards ----
  if (window.ScrollReveal) {
    ScrollReveal().reveal('.card, .project-card', {
      distance: '24px',
      duration: 700,
      easing: 'cubic-bezier(.2,.8,.2,1)',
      origin: 'bottom',
      interval: 80,
      reset: false
    });
  }

  // ---- Back to top button ----
  const topBtn = document.getElementById('top-btn');
  window.addEventListener('scroll', () => {
    topBtn.classList.toggle('show', window.scrollY > 320);
    topBtn.style.display = window.scrollY > 320 ? 'flex' : 'none';
  });
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ---- Formspree form handling (tiny UX) ----
  const form = document.getElementById('contact-form');
  const note = document.querySelector('.form-note');
  form.addEventListener('submit', (e) => {
    // Let Formspree handle the submission — but provide UX feedback:
    note.textContent = 'Sending…';
    // After submit, Formspree will redirect or show result. Use the fetch approach to give inline feedback:
    e.preventDefault();
    const data = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        note.textContent = 'Thanks! Message sent.';
        form.reset();
      } else {
        response.json().then(data => {
          note.textContent = data.error || 'Oops — there was a problem. Try again later.';
        }).catch(() => {
          note.textContent = 'Oops — there was a problem. Try again later.';
        });
      }
    }).catch(() => {
      note.textContent = 'Network error. Please try again.';
    });
  });
});
