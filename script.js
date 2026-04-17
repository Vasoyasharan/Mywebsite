/* ============================================================
   script.js — Cybersecurity Portfolio
============================================================ */

'use strict';

/* ── GSAP Plugin Registration ── */
gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   1. LOADER
============================================================ */
window.addEventListener('load', () => {
  const fill = document.getElementById('loader-fill');
  const loader = document.getElementById('loader');
  if (!fill || !loader) return;

  fill.style.width = '100%';
  setTimeout(() => {
    loader.classList.add('hidden');
    initAnimations();
  }, 2200);
});

/* ============================================================
   2. CUSTOM CURSOR
============================================================ */
const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX; my = e.clientY;
  cursorDot.style.left = mx + 'px';
  cursorDot.style.top  = my + 'px';
});

// Lazy ring follow
(function animCursor() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a, button, .btn, .proj-card, .tl-card, .c-method, .tool-tag').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorRing.style.width  = '56px';
    cursorRing.style.height = '56px';
    cursorRing.style.opacity = '0.3';
    cursorRing.style.borderColor = 'var(--accent2)';
  });
  el.addEventListener('mouseleave', () => {
    cursorRing.style.width  = '36px';
    cursorRing.style.height = '36px';
    cursorRing.style.opacity = '0.6';
    cursorRing.style.borderColor = 'var(--accent)';
  });
});

/* ============================================================
   3. NAVBAR
============================================================ */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveLink();
});

hamburger && hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    document.querySelectorAll('.hamburger span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;
  sections.forEach(sec => {
    const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
    if (!link) return;
    if (sec.offsetTop <= scrollPos && sec.offsetTop + sec.offsetHeight > scrollPos) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

/* ============================================================
   4. THEME TOGGLE
============================================================ */
const themeBtn  = document.getElementById('theme-btn');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

let isDark = true;
themeBtn && themeBtn.addEventListener('click', () => {
  isDark = !isDark;
  html.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
});

/* ============================================================
   5. MATRIX RAIN
============================================================ */
function initMatrixRain() {
  const canvas = document.getElementById('matrix-rain');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEF';
  const fontSize = 13;
  let cols = Math.floor(canvas.width / fontSize);
  let drops = Array(cols).fill(0).map(() => Math.random() * -100);

  setInterval(() => {
    cols = Math.floor(canvas.width / fontSize);
    if (drops.length < cols) drops.push(...Array(cols - drops.length).fill(0).map(() => Math.random() * -100));
    ctx.fillStyle = 'rgba(8,12,20,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + 'px JetBrains Mono';
    for (let i = 0; i < cols; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const alpha = Math.random();
      ctx.fillStyle = alpha > 0.85 ? '#fff' : (alpha > 0.5 ? '#00ff88' : '#006633');
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }, 40);
}

/* ============================================================
   6. THREE.JS — CYBER ORB
============================================================ */
function initCyberOrb() {
  const canvas = document.getElementById('cyber-orb');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
  camera.position.z = 5.5;

  function resize() {
    const w = canvas.parentElement.clientWidth;
    const h = canvas.parentElement.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  /* --- Lights --- */
  scene.add(new THREE.AmbientLight(0x111122, 2));
  const pLight1 = new THREE.PointLight(0x00ff88, 8, 20);
  pLight1.position.set(4, 4, 4);
  scene.add(pLight1);
  const pLight2 = new THREE.PointLight(0x00b4d8, 6, 20);
  pLight2.position.set(-4, -4, 4);
  scene.add(pLight2);
  const pLight3 = new THREE.PointLight(0x7c3aed, 4, 15);
  pLight3.position.set(0, 5, -3);
  scene.add(pLight3);

  /* --- Main Group --- */
  const group = new THREE.Group();
  scene.add(group);

  /* Core crystal (icosahedron) */
  const coreGeo = new THREE.IcosahedronGeometry(1.5, 2);
  const coreMat = new THREE.MeshPhongMaterial({
    color: 0x00ff88, emissive: 0x003311, shininess: 200,
    transparent: true, opacity: 0.12, side: THREE.DoubleSide
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  group.add(coreMesh);

  /* Wireframe shell */
  const wireGeo = new THREE.IcosahedronGeometry(1.52, 2);
  const wireMat = new THREE.MeshBasicMaterial({ color: 0x00ff88, wireframe: true, transparent: true, opacity: 0.55 });
  const wireMesh = new THREE.Mesh(wireGeo, wireMat);
  group.add(wireMesh);

  /* Outer shell (octahedron) */
  const outerGeo = new THREE.OctahedronGeometry(2.0, 2);
  const outerMat = new THREE.MeshBasicMaterial({ color: 0x00b4d8, wireframe: true, transparent: true, opacity: 0.2 });
  const outerMesh = new THREE.Mesh(outerGeo, outerMat);
  group.add(outerMesh);

  /* Torus ring 1 */
  const ring1 = new THREE.Mesh(
    new THREE.TorusGeometry(2.4, 0.025, 16, 120),
    new THREE.MeshBasicMaterial({ color: 0x00ff88, transparent: true, opacity: 0.7 })
  );
  ring1.rotation.x = Math.PI / 2;
  group.add(ring1);

  /* Torus ring 2 */
  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(2.7, 0.018, 16, 120),
    new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.5 })
  );
  ring2.rotation.x = Math.PI / 3.5;
  ring2.rotation.y = Math.PI / 4;
  group.add(ring2);

  /* Torus ring 3 */
  const ring3 = new THREE.Mesh(
    new THREE.TorusGeometry(3.0, 0.014, 16, 120),
    new THREE.MeshBasicMaterial({ color: 0x00b4d8, transparent: true, opacity: 0.35 })
  );
  ring3.rotation.x = -Math.PI / 5;
  ring3.rotation.z = Math.PI / 6;
  group.add(ring3);

  /* Orbiting node spheres on ring 1 */
  const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00ff88 });
  const nodeGeo = new THREE.SphereGeometry(0.06, 8, 8);
  const nodeCount = 12;
  const nodeAngles = [];
  for (let i = 0; i < nodeCount; i++) {
    const node = new THREE.Mesh(nodeGeo, nodeMat);
    nodeAngles.push((i / nodeCount) * Math.PI * 2);
    ring1.add(node);
  }

  /* Particle cloud */
  const pCount = 350;
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    const r     = 2.2 + Math.random() * 2.2;
    pPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pPos[i * 3 + 2] = r * Math.cos(phi);
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({ size: 0.045, color: 0x00ff88, transparent: true, opacity: 0.85 });
  const particles = new THREE.Points(pGeo, pMat);
  group.add(particles);

  /* Connection lines between close particles */
  const linePositions = [];
  for (let i = 0; i < pCount; i++) {
    for (let j = i + 1; j < pCount; j++) {
      const dx = pPos[i*3] - pPos[j*3];
      const dy = pPos[i*3+1] - pPos[j*3+1];
      const dz = pPos[i*3+2] - pPos[j*3+2];
      if (Math.sqrt(dx*dx + dy*dy + dz*dz) < 0.7) {
        linePositions.push(pPos[i*3],pPos[i*3+1],pPos[i*3+2],pPos[j*3],pPos[j*3+1],pPos[j*3+2]);
      }
    }
  }
  const lGeo = new THREE.BufferGeometry();
  lGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
  const lMat = new THREE.LineBasicMaterial({ color: 0x00b4d8, transparent: true, opacity: 0.15 });
  const lines = new THREE.LineSegments(lGeo, lMat);
  group.add(lines);

  /* --- Mouse / Touch Drag Rotation --- */
  let isDragging = false;
  let prevMouse = { x: 0, y: 0 };
  let velX = 0, velY = 0;
  let rotX = 0, rotY = 0;

  canvas.addEventListener('mousedown', e => { isDragging = true; prevMouse = { x: e.clientX, y: e.clientY }; });
  window.addEventListener('mouseup',   ()  => { isDragging = false; });
  window.addEventListener('mousemove', e   => {
    if (!isDragging) return;
    velY = (e.clientX - prevMouse.x) * 0.006;
    velX = (e.clientY - prevMouse.y) * 0.006;
    rotY += velY; rotX += velX;
    prevMouse = { x: e.clientX, y: e.clientY };
  });

  // Touch
  canvas.addEventListener('touchstart', e => { isDragging = true; prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY }; });
  canvas.addEventListener('touchend',   ()  => { isDragging = false; });
  canvas.addEventListener('touchmove',  e   => {
    if (!isDragging) return;
    velY = (e.touches[0].clientX - prevMouse.x) * 0.006;
    velX = (e.touches[0].clientY - prevMouse.y) * 0.006;
    rotY += velY; rotX += velX;
    prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  });

  /* --- Animation Loop --- */
  let t = 0;
  (function animate() {
    requestAnimationFrame(animate);
    t += 0.008;

    if (!isDragging) {
      velX *= 0.92; velY *= 0.92;
      rotY += 0.003; // slow auto-rotate
    }
    rotX += velX; rotY += velY;

    group.rotation.x += (rotX - group.rotation.x) * 0.1;
    group.rotation.y += (rotY - group.rotation.y) * 0.1;

    /* Independent ring rotations */
    ring1.rotation.y = t * 0.6;
    ring2.rotation.z = t * 0.4;
    ring3.rotation.x = t * 0.3;

    /* Orbiting nodes on ring 1 */
    ring1.children.forEach((node, i) => {
      const a = nodeAngles[i] + t * 0.8;
      node.position.x = Math.cos(a) * 2.4;
      node.position.z = Math.sin(a) * 2.4;
    });

    /* Pulsing core */
    const s = 1 + Math.sin(t * 2.5) * 0.04;
    coreMesh.scale.setScalar(s);
    wireMesh.scale.setScalar(s);

    /* Animate lights */
    pLight1.position.x = Math.cos(t * 0.7) * 5;
    pLight1.position.y = Math.sin(t * 0.5) * 5;
    pLight2.position.x = Math.cos(t * 0.7 + Math.PI) * 5;
    pLight2.position.y = Math.sin(t * 0.5 + Math.PI) * 5;

    /* Particle slow spin */
    particles.rotation.y = t * 0.05;

    renderer.render(scene, camera);
  })();
}

/* ============================================================
   7. TYPING ANIMATION
============================================================ */
function initTyping() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const roles = [
    'Security Expert',
    'Red Teamer',
    'Ethical Hacker',
    'Web Developer',
    'System Administrator',
    'CTF Enthusiast'
  ];
  let ri = 0, ci = 0, deleting = false;
  function type() {
    const word = roles[ri];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(type, deleting ? 50 : 90);
  }
  type();
}

/* ============================================================
   8. GSAP SCROLL ANIMATIONS
============================================================ */
function initAnimations() {
  initMatrixRain();
  initCyberOrb();
  initTyping();
  initReveal();
  initSkillBars();
  initStatsCounter();
  initProjectTilt();
  initSmoothScroll();
  initCertRings();

  /* Hero entry animations */
  const tl = gsap.timeline({ delay: 0.3 });
  tl.from('.hero-badge',   { opacity:0, y:30, duration:0.7, ease:'power3.out' })
    .from('.hero-tag',     { opacity:0, y:20, duration:0.6, ease:'power3.out' }, '-=0.4')
    .from('.hero-name',    { opacity:0, y:50, duration:0.8, ease:'power3.out', skewX:2 }, '-=0.3')
    .from('.hero-role',    { opacity:0, y:20, duration:0.6, ease:'power3.out' }, '-=0.2')
    .from('.hero-desc',    { opacity:0, y:20, duration:0.6, ease:'power3.out' }, '-=0.3')
    .from('.hero-btns',    { opacity:0, y:20, duration:0.6, ease:'power3.out' }, '-=0.3')
    .from('.hero-stats',   { opacity:0, y:20, duration:0.6, ease:'power3.out' }, '-=0.3')
    .from('.orb-wrap',     { opacity:0, scale:0.7, duration:1.2, ease:'elastic.out(1, 0.6)' }, 0.4)
    .from('.scroll-cue',   { opacity:0, y:10, duration:0.8, ease:'power2.out' }, '-=0.2');
}

/* ── Scroll Reveal (IntersectionObserver) ── */
function initReveal() {
  const items = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseFloat(e.target.dataset.delay || 0);
        setTimeout(() => e.target.classList.add('visible'), delay * 1000);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => obs.observe(el));
}

/* ── Skill Bars ── */
function initSkillBars() {
  const fills = document.querySelectorAll('.sb-fill');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.w + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach(f => obs.observe(f));
}

/* ── Stats Counter ── */
function initStatsCounter() {
  const stats = document.querySelectorAll('.stat-n');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = parseInt(e.target.dataset.target);
        let count = 0;
        const step = Math.max(1, Math.floor(target / 60));
        const interval = setInterval(() => {
          count = Math.min(count + step, target);
          e.target.textContent = count;
          if (count >= target) clearInterval(interval);
        }, 25);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  stats.forEach(s => obs.observe(s));
}

/* ── Project Card Tilt ── */
function initProjectTilt() {
  document.querySelectorAll('.proj-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const x  = ((e.clientX - r.left) / r.width  - 0.5) * 16;
      const y  = ((e.clientY - r.top)  / r.height - 0.5) * -16;
      card.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ── Smooth Scroll for anchor links ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ── Cert Progress Rings ── */
function initCertRings() {
  const circumference = 264; // 2 * π * 42
  const fills = document.querySelectorAll('.ring-fill');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const pct = parseFloat(el.dataset.pct || 0);
        const offset = circumference - (pct / 100) * circumference;
        el.style.strokeDashoffset = offset;
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  fills.forEach(f => obs.observe(f));

  // Animate number inside ring
  const nums = document.querySelectorAll('.ring-pct');
  const nObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.dataset.target || 0);
        let count = 0;
        const step = Math.max(1, Math.floor(target / 40));
        const interval = setInterval(() => {
          count = Math.min(count + step, target);
          el.textContent = count;
          if (count >= target) clearInterval(interval);
        }, 30);
        nObs.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  nums.forEach(n => nObs.observe(n));
}

/* ── Contact Form (Formspree AJAX) ── */
const form = document.getElementById('contact-form');
form && form.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const orig = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> TRANSMITTING...';
  btn.disabled = true;

  try {
    const data = new FormData(form);
    const resp = await fetch('https://formspree.io/f/mbjnwvwr', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });
    if (resp.ok) {
      btn.innerHTML = '<i class="fas fa-check"></i> MESSAGE SENT!';
      btn.style.background = 'linear-gradient(135deg,#059669,#0284c7)';
      form.reset();
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = '';
        btn.disabled = false;
      }, 3500);
    } else {
      throw new Error('Send failed');
    }
  } catch {
    btn.innerHTML = '<i class="fas fa-times"></i> ERROR — TRY AGAIN';
    btn.style.background = 'linear-gradient(135deg,#ef4444,#b91c1c)';
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }
});

/* ── Glitch data-text sync (for dynamically themed elements) ── */
document.querySelectorAll('.glitch-wrap').forEach(el => {
  if (!el.dataset.text) el.dataset.text = el.textContent;
});
