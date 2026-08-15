// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinksEl.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinksEl.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Scroll-spy: highlight active nav link =====
const sections = document.querySelectorAll('main .section');
const navLinkEls = document.querySelectorAll('.nav-link');

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkEls.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
);

sections.forEach((section) => spyObserver.observe(section));

// ===== Reveal sections on scroll =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

sections.forEach((section) => revealObserver.observe(section));

// ===== Hero typing effect =====
const typedEl = document.getElementById('typedName');
const fullText = typedEl ? typedEl.textContent : '';
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (typedEl && !prefersReducedMotion) {
  typedEl.textContent = '';
  let i = 0;
  const typeSpeed = 55;

  function typeNext() {
    if (i <= fullText.length) {
      typedEl.textContent = fullText.slice(0, i);
      i++;
      setTimeout(typeNext, typeSpeed);
    }
  }

  // slight delay so it feels intentional on page load
  setTimeout(typeNext, 300);
}
