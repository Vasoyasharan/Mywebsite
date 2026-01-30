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
let quoteIndex = 0;
function showNextQuote() {
  const quoteText = document.getElementById("cyber-quote-text");
  quoteText.textContent = cyberQuotes[quoteIndex];
  quoteIndex = (quoteIndex + 1) % cyberQuotes.length;
}
showNextQuote();
setInterval(showNextQuote, 6000);

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
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
  const LERP = 0.18; // smoothing (0.01 - 0.4)
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
  
  // Sample threat data - in production, this would fetch from real APIs
  const threats = [
    {
      icon: 'fa-virus',
      title: 'Critical: CVE-2024-12345',
      description: 'Remote Code Execution in popular framework discovered. CVSS: 9.8',
      severity: 'Critical',
      time: '2 hours ago',
      color: 'red'
    },
    {
      icon: 'fa-bug',
      title: 'High: Authentication Bypass',
      description: 'Zero-day vulnerability found in authentication module. Immediate patch required.',
      severity: 'High',
      time: '4 hours ago',
      color: 'orange'
    },
    {
      icon: 'fa-shield-alt',
      title: 'Medium: SQL Injection Vulnerability',
      description: 'Database layer vulnerable to SQL injection in user input fields.',
      severity: 'Medium',
      time: '6 hours ago',
      color: 'yellow'
    },
    {
      icon: 'fa-exclamation-circle',
      title: 'Critical: Data Breach Alert',
      description: '50,000 records exposed on exposed S3 bucket. Immediate action required.',
      severity: 'Critical',
      time: '8 hours ago',
      color: 'red'
    },
    {
      icon: 'fa-key',
      title: 'High: Leaked API Keys',
      description: 'AWS access keys discovered in public GitHub repository.',
      severity: 'High',
      time: '10 hours ago',
      color: 'orange'
    }
  ];

  const severityColors = {
    'Critical': 'red-500',
    'High': 'orange-500',
    'Medium': 'yellow-500'
  };

  threatFeed.innerHTML = threats.map((threat, index) => `
    <div class="threat-item flex gap-4 p-4 bg-black/30 rounded border border-${threat.color}-500/20 hover:border-${threat.color}-500/50 transition" style="border-color: rgba(${threat.color === 'red' ? '239, 68, 68' : threat.color === 'orange' ? '249, 115, 22' : '234, 179, 8'}, 0.2);">
      <div class="flex-shrink-0">
        <i class="fas ${threat.icon} text-${severityColors[threat.severity]} text-xl mt-1" style="color: ${threat.color === 'red' ? '#ef4444' : threat.color === 'orange' ? '#f97316' : '#eab308'};"></i>
      </div>
      <div class="flex-grow">
        <div class="flex items-center gap-2">
          <h4 class="font-semibold" style="color: ${threat.color === 'red' ? '#f87171' : threat.color === 'orange' ? '#fb923c' : '#facc15'}">${threat.title}</h4>
          <span class="text-xs px-2 py-1 rounded" style="background-color: ${threat.color === 'red' ? 'rgba(239, 68, 68, 0.2)' : threat.color === 'orange' ? 'rgba(249, 115, 22, 0.2)' : 'rgba(234, 179, 8, 0.2)'}; color: ${threat.color === 'red' ? '#f87171' : threat.color === 'orange' ? '#fb923c' : '#facc15'};">${threat.severity}</span>
        </div>
        <p class="text-gray-400 text-sm mt-1">${threat.description}</p>
        <p class="text-gray-500 text-xs mt-2">${threat.time}</p>
      </div>
    </div>
  `).join('');
}


