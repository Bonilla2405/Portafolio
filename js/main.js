/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('active');
  });
});

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNavLink();
});

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function updateActiveNavLink() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Pequeño delay escalonado para elementos hermanos
      const siblings = [...entry.target.parentElement.children].filter(el =>
        el.classList.contains('reveal') ||
        el.classList.contains('reveal-left') ||
        el.classList.contains('reveal-right')
      );
      const index = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ===== ANIMATE LANGUAGE BARS ===== */
const barFills = document.querySelectorAll('.bar-fill');
const targetWidths = [];

// Guardar anchos objetivo y resetear a 0
barFills.forEach(fill => {
  targetWidths.push(fill.style.width);
  fill.style.width = '0';
});

const barsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      barFills.forEach((fill, i) => {
        setTimeout(() => {
          fill.style.width = targetWidths[i];
        }, i * 150);
      });
      barsObserver.disconnect();
    }
  });
}, { threshold: 0.4 });

const barsSection = document.querySelector('.languages-bars');
if (barsSection) barsObserver.observe(barsSection);

/* ===== SKILL CARDS STAGGER ===== */
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => card.classList.add('reveal'));
const skillObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    skillCards.forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), i * 80);
    });
    skillObserver.disconnect();
  }
}, { threshold: 0.1 });
const skillsGrid = document.querySelector('.skills-grid');
if (skillsGrid) { skillsGrid.classList.remove('reveal'); skillObserver.observe(skillsGrid); }

/* ===== PROJECT CARDS STAGGER ===== */
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => card.classList.add('reveal'));
const projectObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    projectCards.forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), i * 120);
    });
    projectObserver.disconnect();
  }
}, { threshold: 0.05 });
const projectsGrid = document.querySelector('.projects-grid');
if (projectsGrid) { projectsGrid.classList.remove('reveal'); projectObserver.observe(projectsGrid); }

/* ===== SMOOTH SCROLL OFFSET para navbar fijo ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
