/* ===== MOBILE DETECTION AND WARNING ===== */
(function() {
  function detectMobileDevice() {
    // Check for touch capability and small screen width
    const isTouchDevice = () => {
      return (('ontouchstart' in window) ||
              (navigator.maxTouchPoints > 0) ||
              (navigator.msMaxTouchPoints > 0));
    };

    // Check viewport width
    const isSmallViewport = () => {
      return window.innerWidth < 1024 || window.innerHeight < 600;
    };

    // User agent detection
    const isUserAgentMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    // If it's a touch device with small viewport, show warning
    if (isTouchDevice() && isSmallViewport()) {
      return true;
    }

    // If user agent indicates mobile (but allow tablets with large width)
    if (isUserAgentMobile() && window.innerWidth < 1024) {
      return true;
    }

    return false;
  }

  // Check on load
  function checkAndShowMobileWarning() {
    if (detectMobileDevice()) {
      const mobileWarning = document.getElementById('mobile-warning');
      if (mobileWarning) {
        mobileWarning.classList.remove('hidden');
        mobileWarning.classList.add('show');
        
        // Disable main content
        const mainContent = document.querySelector('.content-layer');
        if (mainContent) {
          mainContent.style.display = 'none';
        }

        // Add specific styling to body
        document.body.style.overflow = 'hidden';
      }
    }
  }

  // Check on load and resize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndShowMobileWarning);
  } else {
    checkAndShowMobileWarning();
  }

  // Also check on window resize
  window.addEventListener('resize', () => {
    // Add small delay to avoid excessive checking
    clearTimeout(window.mobileCheckTimeout);
    window.mobileCheckTimeout = setTimeout(checkAndShowMobileWarning, 250);
  });
})();

/* ===== Particle.js Configuration ===== */
particlesJS("particles-js", {
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 1000
      }
    },
    color: {
      value: ["#00ffff", "#0077ff", "#33ccff"]
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000"
      }
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: true,
        speed: 0.5,
        opacity_min: 0.2,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.2,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 130,
      color: "#00ffff",
      opacity: 0.25,
      width: 1
    },
    move: {
      enable: true,
      speed: 1.2,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      attract: {
        enable: false
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 0.6
        }
      },
      push: {
        particles_nb: 3
      }
    }
  },
  retina_detect: true
});


// Typing animation
const typingText = document.getElementById("typing-text");
const texts = [
  "Red Team Operator",
  "Offensive Security Enthusiast",
  "Ethical Hacker",
  "Cybersecurity Professional",
  "Penetration Tester",
  "CTF Player & Learner",
  "Creative Security Researcher",
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentText = texts[textIndex];

  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentText.length) {
    setTimeout(() => (isDeleting = true), 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
  }

  setTimeout(typeWriter, isDeleting ? 50 : 100);
}

// Rotating Cyber Quotes/Fun Facts
const cyberQuotes = [
  '"The quieter you become, the more you are able to hear." – Kali Linux',
  "Did you know? The first computer virus was created in 1971 and called the Creeper.",
  '"Amateurs hack systems, professionals hack people." – Bruce Schneier',
  'Fun fact: The word "hacker" originally meant someone who makes furniture with an axe.',
  '"Security is not a product, but a process." – Bruce Schneier',
  "Did you know? The world’s first website is still online: info.cern.ch",
  '"There is no patch for human stupidity." – Kevin Mitnick',
  'Fun fact: The @ symbol in emails is called an "arroba" in Spanish and Portuguese.',
  'Did you know? The term "bug" in computing came from a real moth found in a computer in 1947.',
  '"To confound the enemy, you must first understand them." – Sun Tzu (applied to cyber)',
  "Fun fact: The strongest passwords are long, random, and unique for every site.",
  "Did you know? The first spam email was sent in 1978 to 393 people.",
  '"The best way to predict the future is to invent it." – Alan Kay',
  "Fun fact: Social engineering is one of the most common ways hackers gain access.",
  "Did you know? The world’s largest DDoS attack exceeded 2.5 Tbps in 2021.",
  '"Hacking is not about breaking and entering. It’s about curiosity, exploration, and learning."',
  'Fun fact: The word "phishing" comes from "fishing" for information with fake bait.',
];

// ===== ROTATING CYBER QUOTES/FUN FACTS WITH SMOOTH FADE ANIMATIONS =====
let currentQuoteIndex = 0;
const quoteTextElement = document.getElementById("cyber-quote-text");

// Add creative animation styles if not already present
if (!document.querySelector('style[data-quote-animation]')) {
  const quoteStyle = document.createElement('style');
  quoteStyle.setAttribute('data-quote-animation', 'true');
  quoteStyle.textContent = `
    /* Glitch Effect */
    @keyframes quoteGlitchIn {
      0% {
        opacity: 0;
        transform: translate(-20px, 0) skewX(-5deg);
        text-shadow: -2px 0 #00ffff, 2px 0 #ff00ff;
      }
      50% {
        text-shadow: -2px 0 #00ffff, 2px 0 #ff00ff;
      }
      100% {
        opacity: 1;
        transform: translate(0, 0) skewX(0);
        text-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
      }
    }
    
    /* Slide in from left with blur */
    @keyframes quoteSlideBlurIn {
      0% {
        opacity: 0;
        transform: translateX(-60px);
        filter: blur(10px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
        filter: blur(0);
      }
    }
    
    /* Bounce in with rotation */
    @keyframes quoteBounceIn {
      0% {
        opacity: 0;
        transform: scale(0.3) rotate(-45deg);
      }
      50% {
        opacity: 1;
        transform: scale(1.1) rotate(10deg);
      }
      100% {
        opacity: 1;
        transform: scale(1) rotate(0deg);
      }
    }
    
    /* Flip in with glow */
    @keyframes quoteFlipIn {
      0% {
        opacity: 0;
        transform: perspective(600px) rotateY(-90deg) scaleX(0);
      }
      100% {
        opacity: 1;
        transform: perspective(600px) rotateY(0deg) scaleX(1);
        filter: drop-shadow(0 0 20px rgba(6, 182, 212, 0.6));
      }
    }
    
    /* Typewriter slide in */
    @keyframes quoteTypeSlideIn {
      0% {
        opacity: 0;
        transform: translateX(-100px) scaleX(0.8);
        letter-spacing: -2px;
      }
      60% {
        opacity: 1;
        transform: translateX(10px) scaleX(1.02);
      }
      100% {
        opacity: 1;
        transform: translateX(0) scaleX(1);
        letter-spacing: 0.5px;
      }
    }
    
    /* Pop in with scale pulse */
    @keyframes quotePopIn {
      0% {
        opacity: 0;
        transform: scale(0.5);
        filter: brightness(0.5);
      }
      70% {
        opacity: 1;
        transform: scale(1.15);
      }
      100% {
        opacity: 1;
        transform: scale(1);
        filter: brightness(1);
      }
    }
    
    /* Glitch out effect */
    @keyframes quoteGlitchOut {
      0% {
        opacity: 1;
        transform: translate(0, 0);
        text-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
      }
      50% {
        text-shadow: -3px 0 #00ffff, 3px 0 #ff00ff;
      }
      100% {
        opacity: 0;
        transform: translate(20px, -10px) skewX(10deg);
        text-shadow: -2px 0 #00ffff, 2px 0 #ff00ff;
      }
    }
    
    /* Blur and scale out */
    @keyframes quoteBlurScaleOut {
      0% {
        opacity: 1;
        transform: scale(1);
        filter: blur(0);
      }
      100% {
        opacity: 0;
        transform: scale(0.8);
        filter: blur(10px);
      }
    }
    
    /* Bounce out with rotation */
    @keyframes quoteBounceOut {
      0% {
        opacity: 1;
        transform: scale(1) rotate(0deg);
      }
      50% {
        opacity: 1;
        transform: scale(1.1) rotate(-10deg);
      }
      100% {
        opacity: 0;
        transform: scale(0.3) rotate(45deg);
      }
    }
    
    /* Flip out with glow fade */
    @keyframes quoteFlipOut {
      0% {
        opacity: 1;
        transform: perspective(600px) rotateY(0deg);
        filter: drop-shadow(0 0 20px rgba(6, 182, 212, 0.6));
      }
      100% {
        opacity: 0;
        transform: perspective(600px) rotateY(90deg) scaleX(0);
        filter: drop-shadow(0 0 5px rgba(6, 182, 212, 0));
      }
    }
    
    #cyber-quote-text {
      display: inline-block;
      will-change: transform, opacity, filter;
    }
  `;
  document.head.appendChild(quoteStyle);
}

// Animation pairs for variety
const animationPairs = [
  { in: 'quoteGlitchIn', out: 'quoteGlitchOut', duration: 0.6 },
  { in: 'quoteSlideBlurIn', out: 'quoteBlurScaleOut', duration: 0.7 },
  { in: 'quoteBounceIn', out: 'quoteBounceOut', duration: 0.6 },
  { in: 'quoteFlipIn', out: 'quoteFlipOut', duration: 0.7 },
  { in: 'quoteTypeSlideIn', out: 'quoteBlurScaleOut', duration: 0.6 },
  { in: 'quotePopIn', out: 'quoteBounceOut', duration: 0.6 },
];

let currentAnimationIndex = 0;

function displayQuote() {
  const quote = cyberQuotes[currentQuoteIndex];
  const animationPair = animationPairs[currentAnimationIndex % animationPairs.length];
  const duration = animationPair.duration;
  
  // Apply fade-out animation
  quoteTextElement.style.animation = `${animationPair.out} ${duration}s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`;
  
  // Update quote and apply fade-in animation after fade-out completes
  setTimeout(() => {
    quoteTextElement.textContent = quote;
    quoteTextElement.style.animation = `${animationPair.in} ${duration}s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`;
    
    // Move to next quote and animation pair
    currentQuoteIndex = (currentQuoteIndex + 1) % cyberQuotes.length;
    currentAnimationIndex = (currentAnimationIndex + 1) % animationPairs.length;
    
    // Schedule next quote display: display time (2.5s) + animation out time
    setTimeout(displayQuote, 2500 + (duration * 1000));
  }, duration * 1000);
}

// Start quote rotation immediately
displayQuote();

// ===== ENHANCED SOCIAL LINKS WITH INTERACTIVE TOOLTIPS =====
const socialLinks = document.querySelectorAll('.hero-social-link');

socialLinks.forEach((link, index) => {
  // Create and add tooltip element
  const tooltip = document.createElement('div');
  tooltip.className = 'social-tooltip';
  tooltip.textContent = link.dataset.tooltip || link.title;
  tooltip.style.cssText = `
    position: absolute;
    bottom: 110%;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    background: linear-gradient(135deg, #06b6d4, #0891b2);
    color: white;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    z-index: 1000;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 0 20px rgba(6, 182, 212, 0.4);
    letter-spacing: 0.5px;
  `;
  
  // Add arrow to tooltip
  const arrow = document.createElement('div');
  arrow.style.cssText = `
    position: absolute;
    width: 8px;
    height: 8px;
    background: linear-gradient(135deg, #06b6d4, #0891b2);
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    z-index: -1;
  `;
  
  link.style.position = 'relative';
  tooltip.appendChild(arrow);
  link.appendChild(tooltip);
  
  // Add hover effects
  link.addEventListener('mouseenter', () => {
    tooltip.style.opacity = '1';
    tooltip.style.transform = 'translateX(-50%) translateY(0)';
  });
  
  link.addEventListener('mouseleave', () => {
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'translateX(-50%) translateY(10px)';
  });
  
  // Add stagger animation on page load
  link.style.animation = `socialLinkPopIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s backwards`;
});

// Add keyframe animation for social links
if (!document.querySelector('style[data-social-animation]')) {
  const socialStyle = document.createElement('style');
  socialStyle.setAttribute('data-social-animation', 'true');
  socialStyle.textContent = `
    @keyframes socialLinkPopIn {
      from {
        opacity: 0;
        transform: scale(0.3) translateY(20px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }
    
    .social-links-container {
      perspective: 1000px;
    }
  `;
  document.head.appendChild(socialStyle);
}

// Mobile menu toggle with animation
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenuBtn.classList.toggle("active");
  mobileMenu.classList.toggle("hidden");
  
  if (!mobileMenu.classList.contains("hidden")) {
    mobileMenu.classList.add("active");
    mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
  } else {
    mobileMenu.classList.remove("active");
    mobileMenu.style.maxHeight = "0";
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('active');
    mobileMenu.style.maxHeight = '0';
  });
});

// ===== ADVANCED FEATURES =====

// 1. Advanced Scroll Progress Bar with Smooth Animation
let lastScrollTop = 0;
const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = window.scrollY;
  const progress = (scrolled / windowHeight) * 100;
  
  if (progressBar) {
    progressBar.style.width = progress + "%";
    
    // Add subtle glow pulse based on scroll speed
    const scrollSpeed = Math.abs(window.scrollY - lastScrollTop);
    if (scrollSpeed > 5) {
      progressBar.style.filter = `blur(0.5px) brightness(${1 + scrollSpeed * 0.01})`;
    } else {
      progressBar.style.filter = "blur(0.5px) brightness(1)";
    }
    
    lastScrollTop = window.scrollY;
  }
});

// 2. Advanced Parallax Effect on Hero Section
let parallaxX = 0, parallaxY = 0;
const parallaxHero = document.getElementById("parallax-hero");

window.addEventListener("mousemove", (e) => {
  if (!parallaxHero) return;
  
  // Smooth interpolation
  const targetX = (e.clientX / window.innerWidth - 0.5) * 30;
  const targetY = (e.clientY / window.innerHeight - 0.5) * 30;
  
  parallaxX += (targetX - parallaxX) * 0.1;
  parallaxY += (targetY - parallaxY) * 0.1;
  
  parallaxHero.style.transform = `perspective(1000px) rotateY(${parallaxX * 0.5}deg) rotateX(${-parallaxY * 0.5}deg) translateZ(0)`;
});

// Reset parallax on mouse leave
document.addEventListener("mouseleave", () => {
  if (parallaxHero) {
    parallaxHero.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)";
  }
});

// 3. Advanced Button Ripple Effect with Multiple Ripples
document.querySelectorAll("a, button").forEach((element) => {
  element.addEventListener("click", function (e) {
    // Create primary ripple
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();GitHub
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.position = "absolute";
    ripple.style.width = size + "px";
    ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(6,182,212,0.4) 100%)";
    ripple.style.pointerEvents = "none";
    ripple.style.animation = "ripple-animation 0.6s ease-out";
    
    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// 4. Advanced Timeline Items Animation on Scroll
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.transition = "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateX(0) rotateY(0deg)";
      
      // Animate timeline dot
      const dot = entry.target.querySelector(".timeline-dot");
      if (dot) {
        dot.style.animation = "dot-pulse-in 0.6s ease-out";
      }
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".timeline-item").forEach((item, index) => {
  item.style.opacity = "0";
  item.style.transition = "none";
  
  if (item.classList.contains("lg:justify-end")) {
    item.style.transform = "translateX(50px) rotateY(-5deg)";
  } else {
    item.style.transform = "translateX(-50px) rotateY(5deg)";
  }
  
  observer.observe(item);
});

// Add dot pulse animation
const style = document.createElement('style');
style.textContent = `
  @keyframes dot-pulse-in {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1.4);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

// Contact form submission
(function () {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const form = this;
    const formData = new FormData(this);

    fetch(this.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          showPopup(false);
          form.reset();
        } else {
          showPopup(true);
        }
      })
      .catch(() => {
        showPopup(true);
      });
  });
})();

function showPopup(isError = false) {
  // play sound if available
  // try to play sound (silently ignore failures)
  try { playCyberSound(); } catch (_) {}

  const popup = document.getElementById("cyber-popup");
  if (!popup) return;

  const popupContent = popup.querySelector(".relative");
  const popupTitle = document.getElementById("popup-title");
  const popupMessage = document.getElementById("popup-message");
  const icon = popup.querySelector(".fas");

  // Safely update popup contents only if elements exist
  if (isError) {
    if (popupTitle) popupTitle.textContent = "> ERROR_DETECTED";
    if (popupMessage) popupMessage.textContent = "> MESSAGE_STATUS: FAILED";
    if (popupTitle && popupTitle.classList) popupTitle.classList.add("text-red-400");
    if (popupContent && popupContent.classList) popupContent.classList.add("border-red-500/30");
    if (icon && icon.classList) {
      icon.classList.remove("fa-terminal");
      icon.classList.add("fa-exclamation-triangle");
    }
  } else {
    if (popupTitle) popupTitle.textContent = "> TRANSMISSION_RECEIVED";
    if (popupMessage) popupMessage.textContent = "> MESSAGE_STATUS: DELIVERED";
    if (popupTitle && popupTitle.classList) popupTitle.classList.remove("text-red-400");
    if (popupContent && popupContent.classList) popupContent.classList.remove("border-red-500/30");
    if (icon && icon.classList) {
      icon.classList.remove("fa-exclamation-triangle");
      icon.classList.add("fa-terminal");
    }
  }

  // Show popup container
  popup.classList.remove("hidden");
  popup.style.display = "flex";

  // Trigger reflow to apply CSS transitions
  void popup.offsetHeight;

  // Add animation to content if available
  if (popupContent && popupContent.style) {
    popupContent.style.animation = "none";
    setTimeout(() => {
      popupContent.style.animation = "popupIn 0.3s ease-out forwards";
    }, 10);
  }

  setTimeout(closePopup, 4000);
}

function closePopup() {
  const popup = document.getElementById("cyber-popup");
  if (!popup) return;
  const popupContent = popup.querySelector(".relative");

  if (popupContent && popupContent.style) {
    popupContent.style.animation = "popupOut 0.3s ease-in forwards";
  }

  setTimeout(() => {
    if (popup) {
      popup.classList.add("hidden");
      popup.style.display = "none";
    }
    if (popupContent && popupContent.style) popupContent.style.animation = "none";
  }, 300);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      // Close mobile menu if open
      mobileMenu.classList.add("hidden");
    }
  });
});

// Initialize typing animation
typeWriter();

//  Cursor animation JS
(function () {
  // Config
  const TRAIL_COUNT = 3; // number of trail dots
  const LERP = 0.27; // smoothing (0.01 - 0.4) - increased by 50% for faster movement
  const COLOR_HOVER_SELECTOR = "a, button, .btn, input, textarea, .interactive"; // elements that trigger hover state

  // Elements
  const cursorWrap = document.getElementById("custom-cursor");
  if (!cursorWrap) return;

  const core = cursorWrap.querySelector(".cursor-core");
  const trailDots = Array.from(cursorWrap.querySelectorAll(".trail-dot"));
  const ripple = cursorWrap.querySelector(".cursor-click-ripple");

  // State
  let mouseX = window.innerWidth / 2,
    mouseY = window.innerHeight / 2;
  let posX = mouseX,
    posY = mouseY;
  let trail = trailDots.map(() => ({ x: mouseX, y: mouseY, alpha: 0 }));

  // Touch check - do not initialize on touch devices
  const supportsTouch =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  if (supportsTouch) {
    cursorWrap.style.display = "none";
    return;
  }

  // Mouse move -> update target
  window.addEventListener(
    "mousemove",
    (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    },
    { passive: true }
  );

  // Hide on leaving window
  window.addEventListener("mouseout", (e) => {
    if (!e.relatedTarget || e.relatedTarget.nodeName === "HTML") {
      core.style.opacity = "0";
      trailDots.forEach((d) => (d.style.opacity = "0"));
    }
  });
  window.addEventListener("mouseover", () => {
    core.style.opacity = "1";
  });

  // Click ripple
  window.addEventListener("mousedown", (e) => {
    playClickRipple(e.clientX, e.clientY);
    // small squash effect
    core.style.transform = "translate(-50%, -50%) scale(0.85)";
    setTimeout(() => {
      core.style.transform = "translate(-50%, -50%) scale(1)";
    }, 120);
  });

  // Hover state detection (delegated): add/remove 'hovered' class
  function updateHoverState() {
    const el = document.elementFromPoint(mouseX, mouseY);
    if (el && el.matches && el.matches(COLOR_HOVER_SELECTOR)) {
      core.classList.add("hovered");
    } else {
      core.classList.remove("hovered");
    }
  }

  // Click ripple function
  function playClickRipple(x, y) {
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.style.opacity = "1";
    ripple.style.transform = "translate(-50%, -50%) scale(0.6)";
    ripple.style.transition =
      "transform 420ms cubic-bezier(.16,.84,.44,1), opacity 420ms linear";
    // force reflow then expand
    void ripple.offsetWidth;
    ripple.style.transform = "translate(-50%, -50%) scale(3)";
    ripple.style.opacity = "0";
    setTimeout(() => {
      ripple.style.transition = "";
      ripple.style.transform = "translate(-50%, -50%) scale(1)";
      ripple.style.opacity = "0";
    }, 450);
  }

  // Main loop: lerp position and update elements
  function rafLoop() {
    posX += (mouseX - posX) * LERP;
    posY += (mouseY - posY) * LERP;

    // Move core
    core.style.left = posX + "px";
    core.style.top = posY + "px";

    // Update trail positions (simple follower chain)
    for (let i = 0; i < trail.length; i++) {
      // lerp each trail toward previous target (or mouse)
      const targetX = i === 0 ? mouseX : trail[i - 1].x;
      const targetY = i === 0 ? mouseY : trail[i - 1].y;
      trail[i].x += (targetX - trail[i].x) * (LERP * (0.8 + i * 0.2));
      trail[i].y += (targetY - trail[i].y) * (LERP * (0.8 + i * 0.2));
      trail[i].alpha = Math.max(0.12, 1 - i * 0.28);

      // Apply to DOM
      const dot = trailDots[i];
      dot.style.left = trail[i].x + "px";
      dot.style.top = trail[i].y + "px";
      dot.style.opacity = String(trail[i].alpha);
      dot.style.transform =
        "translate(-50%,-50%) scale(" + (1 - i * 0.18) + ")";
    }

    updateHoverState();
    requestAnimationFrame(rafLoop);
  }

  // Initialize trail starting positions
  for (let i = 0; i < trail.length; i++) {
    trail[i].x = mouseX;
    trail[i].y = mouseY;
    trail[i].alpha = 0;
  }

  requestAnimationFrame(rafLoop);

  // Optional: keyboard toggle (press 'c' to toggle cursor)
  window.addEventListener("keydown", (e) => {
    if (e.key === "c" || e.key === "C") {
      const hidden = cursorWrap.style.display === "none";
      cursorWrap.style.display = hidden ? "" : "none";
      if (hidden) document.body.style.cursor = "none";
      else document.body.style.cursor = "auto";
    }
  });
})();

// pop-up animation js

function playCyberSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();

  // Oscillators (layered cyber vibe)
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const osc3 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc1.type = "square";
  osc2.type = "sawtooth";
  osc3.type = "sine";

  const now = ctx.currentTime;
  const duration = 1.4; // longer duration for lingering feel

  // Rising cyber sweep
  osc1.frequency.setValueAtTime(200, now);
  osc1.frequency.exponentialRampToValueAtTime(1100, now + 1.0);
  osc2.frequency.setValueAtTime(300, now);
  osc2.frequency.exponentialRampToValueAtTime(1500, now + 1.0);
  osc3.frequency.setValueAtTime(400, now);
  osc3.frequency.exponentialRampToValueAtTime(1800, now + 1.0);

  // Volume curve
  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  // Connect to output
  osc1.connect(gain);
  osc2.connect(gain);
  osc3.connect(gain);
  gain.connect(ctx.destination);

  // Start and stop
  osc1.start();
  osc2.start();
  osc3.start();
  osc1.stop(now + duration);
  osc2.stop(now + duration);
  osc3.stop(now + duration);

  // Small echo blip
  setTimeout(() => {
    const echo = ctx.createOscillator();
    const echoGain = ctx.createGain();
    echo.type = "triangle";
    echo.frequency.setValueAtTime(880, ctx.currentTime);
    echoGain.gain.setValueAtTime(0.1, ctx.currentTime);
    echoGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    echo.connect(echoGain);
    echoGain.connect(ctx.destination);
    echo.start();
    echo.stop(ctx.currentTime + 0.6);
  }, 700);
}

// Project Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.project-filter-btn');
  const projectItems = document.querySelectorAll('.project-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filterValue = this.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter projects
      projectItems.forEach(item => {
        const tags = item.getAttribute('data-tags').split(',');
        
        if (filterValue === 'all' || tags.includes(filterValue)) {
          item.style.display = 'flex';
          item.style.animation = 'fadeInScale 0.5s ease-out forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});

// Animate on Scroll (AOS) - Fade in elements as they come into view
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with data-aos attribute
  document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
  });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// Section Transition Animations
function initSectionAnimations() {
  const sections = document.querySelectorAll('section');
  
  const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  sections.forEach(section => {
    section.style.opacity = '0.95';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(section);
  });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', function() {
  initScrollAnimations();
  initSectionAnimations();
  initHackerDashboard();
  initThreatIntel();
});

// ===== RESUME DOWNLOAD FUNCTIONALITY =====
function downloadResume() {
  // Direct link to your PDF resume
  const link = document.createElement('a');
  link.href = 'Sharan_Vasoya_Resume.pdf';
  link.download = 'Sharan_Vasoya_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Show success popup
  showPopup(false);
}

// ===== HACKER DASHBOARD FUNCTIONALITY =====
function initHackerDashboard() {
  const hackerCommands = [
    '$ nmap -sV -A target_host',
    '$ enum4linux -a domain.local',
    '$ sqlmap -u "http://target" --dbs',
    '$ responder -I eth0 -v',
    '$ msfconsole -x "use exploit/windows/smb/psexec"',
    '$ hashcat -m 1000 hashes.txt wordlist.txt',
    '$ ffuf -u http://target/FUZZ -w wordlist.txt',
    '$ zeek -r capture.pcap',
    '$ hydra -l admin -P passwords.txt ssh://target',
    '$ mimikatz.exe "lsadump::dcsync /domain:company.com"'
  ];

  let commandIndex = 0;
  const terminalOutput = document.getElementById('terminal-output');

  function addCommand() {
    if (commandIndex < hackerCommands.length) {
      const cmd = hackerCommands[commandIndex];
      const line = document.createElement('div');
      line.className = 'typing-effect text-cyan-400';
      line.textContent = '$ ' + cmd.substring(2);
      terminalOutput.appendChild(line);
      
      // Add output lines
      const outputs = [
        document.createElement('div'),
        document.createElement('div')
      ];
      
      outputs[0].className = 'text-green-400 text-xs';
      outputs[0].textContent = '[*] Scanning targets...';
      outputs[1].className = 'text-green-400 text-xs';
      outputs[1].textContent = '[+] Data received successfully';
      
      terminalOutput.appendChild(outputs[0]);
      terminalOutput.appendChild(outputs[1]);
      
      // Auto scroll
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
      commandIndex++;
      
      setTimeout(addCommand, 1500);
    } else {
      commandIndex = 0;
      setTimeout(addCommand, 3000);
    }
  }

  // Start the animation
  setTimeout(addCommand, 500);

  // Animate stat counters
  animateCounter('machines-count', 45);
  animateCounter('exploits-count', 60);
  animateCounter('days-count', 500);
  animateCounter('tools-count', 15);
}

function animateCounter(elementId, targetValue) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const text = element.textContent;
  const hasPlus = text.includes('+');
  
  let currentValue = 0;
  const increment = Math.ceil(targetValue / 50);
  
  const counter = setInterval(() => {
    currentValue += increment;
    if (currentValue >= targetValue) {
      currentValue = targetValue;
      clearInterval(counter);
    }
    element.textContent = currentValue + (hasPlus ? '+' : '');
  }, 30);
}

// ===== THREAT INTELLIGENCE FUNCTIONALITY =====
function initThreatIntel() {
  refreshThreatIntel();
  // Refresh every 5 minutes
  setInterval(refreshThreatIntel, 300000);
}

function refreshThreatIntel() {
  const threatFeed = document.getElementById('threat-feed');
  if (!threatFeed) return;
  
  // Rotate through different visual states for live feeling
  const feedItems = threatFeed.querySelectorAll('.threat-item');
  feedItems.forEach(item => {
    item.style.opacity = '0.8';
    setTimeout(() => {
      item.style.opacity = '1';
    }, 100);
  });
}

// Threat Intelligence Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.threat-filter-btn');
  const threatItems = document.querySelectorAll('.threat-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filterValue = this.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter threats
      threatItems.forEach((item, index) => {
        const severity = item.getAttribute('data-severity');
        
        if (filterValue === 'all' || severity === filterValue) {
          item.style.display = 'flex';
          item.style.animation = `slideInUp 0.5s ease-out forwards`;
          item.style.animationDelay = `${index * 0.1}s`;
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  
  // Initial refresh
  refreshThreatIntel();
  // Refresh every 5 minutes
  setInterval(refreshThreatIntel, 300000);
});

// ===== ENHANCED CONTACT FORM FUNCTIONALITY =====
(function() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  // Form inputs
  const inputs = contactForm.querySelectorAll('input, textarea');
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const statusMessage = document.getElementById('statusMessage');
  const successMessage = document.getElementById('successMessage');

  // Enhanced form submission with better UI feedback
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Add loading state to button
    if (submitBtn) {
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
    }

    const formData = new FormData(this);

    fetch(this.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        // Success feedback
        if (successMessage) {
          successMessage.style.display = 'block';
          successMessage.classList.add('animate-fade-in');
          successMessage.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
        }

        // Reset form
        contactForm.reset();
        
        // Reset input states
        inputs.forEach(input => {
          input.value = '';
        });

        // Clear any error states
        inputs.forEach(input => {
          input.classList.remove('border-red-500', 'focus:border-red-500');
        });

        // Show popup
        showPopup(false);

        // Hide success message after 5 seconds
        setTimeout(() => {
          if (successMessage) {
            successMessage.classList.remove('animate-fade-in');
            successMessage.classList.add('animate-fade-out');
            setTimeout(() => {
              successMessage.style.display = 'none';
              successMessage.classList.remove('animate-fade-out');
            }, 300);
          }
        }, 5000);
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(error => {
      // Error feedback
      if (statusMessage) {
        statusMessage.style.display = 'block';
        statusMessage.classList.add('animate-fade-in');
        statusMessage.textContent = '✗ Error sending message. Please try again or contact directly.';
        statusMessage.style.borderColor = '#ef4444';
        statusMessage.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        statusMessage.style.color = '#f87171';
      }

      showPopup(true);

      // Auto-hide error message
      setTimeout(() => {
        if (statusMessage) {
          statusMessage.classList.remove('animate-fade-in');
          statusMessage.classList.add('animate-fade-out');
          setTimeout(() => {
            statusMessage.style.display = 'none';
          }, 300);
        }
      }, 5000);
    })
    .finally(() => {
      // Remove loading state
      if (submitBtn) {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }
    });
  });

  // Input validation and styling
  inputs.forEach(input => {
    // Focus and blur events for floating labels (already handled by CSS)
    input.addEventListener('focus', () => {
      input.parentElement.closest('.contact-field')?.classList.add('focused');
    });

    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.closest('.contact-field')?.classList.remove('focused');
      }
    });

    // Real-time validation for email
    if (input.type === 'email') {
      input.addEventListener('input', () => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
        
        if (input.value && !isValid) {
          input.style.borderColor = 'rgba(239, 68, 68, 0.6)';
          input.style.boxShadow = '0 0 15px rgba(239, 68, 68, 0.2)';
        } else {
          input.style.borderColor = '';
          input.style.boxShadow = '';
        }
      });
    }

    // Character counter for message field
    if (input.type === 'textarea' || input.tagName === 'TEXTAREA') {
      input.addEventListener('input', () => {
        const charCount = input.value.length;
        // Optional: You can add a character counter overlay here
      });
    }
  });

  // Add smooth focus animation to form fields
  const contactFields = document.querySelectorAll('.contact-field');
  contactFields.forEach(field => {
    const input = field.querySelector('input, textarea');
    
    if (input) {
      input.addEventListener('input', () => {
        // Auto-expand textarea
        if (input.tagName === 'TEXTAREA') {
          input.style.height = 'auto';
          input.style.height = input.scrollHeight + 'px';
        }
      });
    }
  });
})();

/* ===== HIGH IMPACT ENHANCEMENTS ===== */

/* ===== 1. SCROLL PROGRESS BAR ===== */
(function() {
  const progressBar = document.getElementById('scroll-progress-bar');
  
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      progressBar.style.width = scrollPercent + '%';
    });
  }
})();

/* ===== 2. SCROLL TO TOP BUTTON ===== */
(function() {
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  
  if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
      } else {
        scrollToTopBtn.classList.remove('show');
      }
    });
    
    // Smooth scroll to top
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
})();

/* ===== 3. SECTION ENTRANCE ANIMATIONS WITH INTERSECTION OBSERVER ===== */
(function() {
  // Configuration for Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  // Create observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animation class when in view
        entry.target.classList.add('in-view');
        
        // Optional: Stop observing after animation is triggered
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Observe content blocks
  const contentBlocks = document.querySelectorAll('.content-block');
  contentBlocks.forEach(block => {
    observer.observe(block);
  });
  
  // Observe animate-on-scroll elements
  const animateOnScroll = document.querySelectorAll('.animate-on-scroll');
  animateOnScroll.forEach(element => {
    observer.observe(element);
  });
  
  // Observe cards and other elements
  const cards = document.querySelectorAll('.card-elevated, .skill-card, .project-card, .certificate-card');
  cards.forEach(card => {
    observer.observe(card);
  });
})();

/* ===== 4. STAGGERED ANIMATIONS FOR LISTS ===== */
(function() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const listItems = entry.target.querySelectorAll('li, .list-item');
        listItems.forEach((item, index) => {
          item.style.opacity = '0';
          item.style.transform = 'translateX(-20px)';
          item.style.animationDelay = `${index * 0.1}s`;
          item.classList.add('animate-on-scroll');
          
          // Trigger animation
          setTimeout(() => {
            item.style.animation = 'contentSlideIn 0.8s ease-out forwards';
          }, 50);
        });
      }
    });
  }, observerOptions);
  
  // Observe lists
  const lists = document.querySelectorAll('ul, ol, .list-container');
  lists.forEach(list => {
    observer.observe(list);
  });
})();

/* ===== 5. ENHANCED BUTTON RIPPLE EFFECT ===== */
(function() {
  const buttons = document.querySelectorAll('button, .btn, a.btn-like');
  
  buttons.forEach(button => {
    if (!button.classList.contains('btn-ripple')) {
      button.classList.add('btn-ripple');
    }
    
    button.addEventListener('mousedown', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.position = 'absolute';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.background = 'rgba(255, 255, 255, 0.5)';
      ripple.style.borderRadius = '50%';
      ripple.style.pointerEvents = 'none';
      ripple.style.animation = 'ripple 0.6s ease-out';
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
})();

/* ===== 6. SMOOTH PAGE LOAD ANIMATION ===== */
(function() {
  // Ensure page loads with fade-in
  document.body.style.opacity = '1';
  
  // Add staggered animations to hero content
  const heroContent = document.querySelectorAll('.hero-content > *');
  heroContent.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.animation = `contentSlideIn 0.8s ease-out forwards`;
    element.style.animationDelay = `${index * 0.15}s`;
  });
})();

/* ===== 7. AMBIENT BACKGROUND ANIMATIONS ===== */
(function() {
  // Add floating particles to sections if not already present
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    // Check if section already has floating particles
    if (!section.querySelector('.floating-particle')) {
      const particlesContainer = document.createElement('div');
      particlesContainer.className = 'absolute inset-0 pointer-events-none';
      
      // Add 3 floating particles per section
      for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particlesContainer.appendChild(particle);
      }
      
      section.style.position = 'relative';
      section.insertBefore(particlesContainer, section.firstChild);
    }
  });
})();

/* ===== 8. INTERSECTION OBSERVER FOR ENHANCED CTA ===== */
(function() {
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);
  
  // Observe call-to-action elements
  const ctaElements = document.querySelectorAll('.cta-btn, .certificate-btn, .project-card-btn');
  ctaElements.forEach(element => {
    observer.observe(element);
  });
})();

console.log('High Impact Enhancements loaded successfully!');


