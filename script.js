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

// Back to top button
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.remove("opacity-0", "invisible");
  } else {
    backToTopBtn.classList.add("opacity-0", "invisible");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Contact form handling
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form data
    var formData = new FormData(this);

    // Send form data to Formspree
    fetch(this.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        showPopup(); // cyber popup
        document.getElementById("contact-form").reset();
      })

      .catch((error) => {
        console.error("Error:", error);
        // Show error message using SweetAlert2
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Please try again later.",
        });
      });
  });

function showPopup(isError = false) {
  playCyberSound();
  const popup = document.getElementById("cyber-popup");
  const popupContent = popup.querySelector(".relative");
  const popupTitle = document.getElementById("popup-title");
  const popupMessage = document.getElementById("popup-message");
  const icon = popup.querySelector(".fas");

  if (isError) {
    popupTitle.textContent = "> ERROR_DETECTED";
    popupMessage.textContent = "> MESSAGE_STATUS: FAILED";
    popupTitle.classList.add("text-red-400");
    popupContent.classList.add("border-red-500/30");
    icon.classList.remove("fa-terminal");
    icon.classList.add("fa-exclamation-triangle");
  } else {
    popupTitle.textContent = "> TRANSMISSION_RECEIVED";
    popupMessage.textContent = "> MESSAGE_STATUS: DELIVERED";
    popupTitle.classList.remove("text-red-400");
    popupContent.classList.remove("border-red-500/30");
    icon.classList.remove("fa-exclamation-triangle");
    icon.classList.add("fa-terminal");
  }

  popup.classList.remove("hidden");
  setTimeout(() => {
    popupContent.classList.remove("scale-95", "opacity-0");
    popupContent.classList.add("scale-100", "opacity-100");
  }, 10);

  setTimeout(closePopup, 4000);
}

function closePopup() {
  const popup = document.getElementById("cyber-popup");
  const popupContent = popup.querySelector(".relative");

  popupContent.classList.remove("scale-100", "opacity-100");
  popupContent.classList.add("scale-95", "opacity-0");

  setTimeout(() => {
    popup.classList.add("hidden");
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
