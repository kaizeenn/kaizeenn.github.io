/* script.js — kaizeenn.github.io */

// ── Custom cursor ──────────────────────────────
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});
document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '32px';
    cursor.style.height = '32px';
    cursor.style.opacity = '.4';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '12px';
    cursor.style.height = '12px';
    cursor.style.opacity = '1';
  });
});

// ── Nav scroll effect ──────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Typing animation ───────────────────────────
const roles = [
  'Software Developer',
  'OSS Contributor',
  'Problem Solver',
  'TI Student',
  'Lifelong Learner',
];
let ri = 0, ci = 0, deleting = false;
const typingEl = document.getElementById('typing');

function type() {
  const word = roles[ri];
  if (!deleting) {
    typingEl.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typingEl.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, deleting ? 45 : 90);
}
type();

// ── Intersection Observer for animations ──────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in, .stagger').forEach(el => observer.observe(el));

// Apply fade-in to sections
document.querySelectorAll('.section').forEach(sec => {
  sec.querySelectorAll('.card, .blog-card, .skill-block').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
  sec.querySelectorAll('.about-text, .about-card, .section-title, .contact-desc').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});

// ── Smooth active nav link ─────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const secObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.style.color = 'var(--accent)';
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => secObserver.observe(s));
