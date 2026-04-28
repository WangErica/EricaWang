// ═══════════════════════════════════════════════════════════
// ERICA WANG PORTFOLIO - MAIN JAVASCRIPT
// ═══════════════════════════════════════════════════════════

// ── VANTA.JS INITIALIZATION ──
VANTA.NET({
  el: "#vanta-bg",
  THREE: THREE,
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200,
  minWidth: 200,
  scale: 1.0,
  color: 0x7ab898,
  backgroundColor: 0x0e0f0e,
  maxDistance: 22.0,
  spacing: 18.0,
  showDots: false,
  points: 9
});

// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

// Smooth cursor ring follow
(function animRing() {
  rx += (mx - rx) * 0.35;
  ry += (my - ry) * 0.35;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
})();

// Cursor hover effects
document.querySelectorAll('a, .work-item, .also-pill').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('big');
    ring.classList.add('big');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('big');
    ring.classList.remove('big');
  });
});

// ── NAVIGATION SCROLL EFFECT ──
const vantaBg = document.getElementById('vanta-bg');
const navEl = document.getElementById('nav');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Scrolled state for background
  navEl.classList.toggle('scrolled', scrollY > 40);

  // Hide nav when scrolling down past hero, show when scrolling up
  if (scrollY > lastScrollY && scrollY > 80) {
    navEl.classList.add('hidden');
  } else {
    navEl.classList.remove('hidden');
  }
  lastScrollY = scrollY;

  // Fade Vanta out as you scroll past the hero
  const fadeStart = window.innerHeight * 0.4;
  const fadeEnd = window.innerHeight * 0.85;

  if (scrollY <= fadeStart) {
    vantaBg.style.opacity = 1;
  } else if (scrollY >= fadeEnd) {
    vantaBg.style.opacity = 0;
  } else {
    vantaBg.style.opacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
  }
});

// ── WORK ITEM HOVER PREVIEW ──
const previewVideo = document.getElementById('preview-video');
const previewImage = document.getElementById('preview-image');
const previewInner = document.getElementById('previewInner');
const previewLabel = document.getElementById('previewLabel');

document.querySelectorAll('.work-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    const type = item.dataset.type;
    const src = item.dataset.src;
    const title = item.querySelector('.work-title').textContent;
    
    previewLabel.textContent = title;
    previewInner.classList.add('active');

    if (type === 'video') {
      previewImage.classList.remove('show', 'visible');
      previewVideo.src = src;
      previewVideo.classList.add('show');
      previewVideo.play().catch(() => {});
      setTimeout(() => previewVideo.classList.add('visible'), 20);
    } else {
      previewVideo.classList.remove('show', 'visible');
      previewVideo.pause();
      previewVideo.src = '';
      previewImage.src = src;
      previewImage.classList.add('show');
      setTimeout(() => previewImage.classList.add('visible'), 20);
    }
  });

  item.addEventListener('mouseleave', () => { 
    previewInner.classList.remove('active');
    previewVideo.classList.remove('show', 'visible');
    previewImage.classList.remove('show', 'visible');
    previewVideo.pause();
    previewVideo.src = '';
    previewImage.src = '';
  });

  // Click to navigate
  item.addEventListener('click', () => {
    const link = item.dataset.link;
    if (link) {
      window.location.href = link;
    }
  });
});

// ── SCROLL REVEAL ANIMATION ──
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ── SMOOTH SCROLL FOR ANCHOR LINKS ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ── LOG INITIALIZATION ──
console.log('✨ Erica Wang Portfolio - Initialized');
console.log('🎨 Design + Code by Erica Wang');
