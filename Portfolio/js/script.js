// ==============================================================
// 1. TYPING ANIMATION
// ==============================================================
document.addEventListener("DOMContentLoaded", () => {
  const roles = [
    "Frontend Developer",
    "Full Stack Developer",
    "Web Designer",
    "UI/UX Enthusiast",
    "Mern Stack Developer",
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedElement = document.getElementById("typedText");
  let typingSpeed = 100;

  function typeEffect() {
    if (!typedElement) return;
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      typedElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100 + Math.random() * 60;

      if (charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000;
      }
    } else {
      typedElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50 + Math.random() * 40;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
      }
    }
    setTimeout(typeEffect, typingSpeed);
  }

  if (typedElement) typeEffect();
});

// ==============================================================
// 2. PARTICLE SYSTEM (Hero Canvas)
// ==============================================================
function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width, height;
  let particles = [];
  const particleCount = 90;

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.speedY = (Math.random() - 0.5) * 0.6;
      this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(167, 139, 250, ${this.opacity})`;
      ctx.fill();
    }
  }

  function initParticleArray() {
    particles = [];
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
          const opacity = 1 - distance / 150;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124, 58, 237, ${opacity * 0.2})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    drawLines();
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", () => {
    resize();
    initParticleArray();
  });

  resize();
  initParticleArray();
  animate();
}

document.addEventListener("DOMContentLoaded", initParticles);

// ==============================================================
// 3. SCROLL REVEAL ANIMATION
// ==============================================================
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(
    ".flashcard-3d, .about-card, .edu-item, .contact-item, .stat-item, .project-card, .cert-card, .achieve-card",
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  );

  revealElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
    observer.observe(el);
  });

  // Stats counting
  const statNumbers = document.querySelectorAll(".stat-number");
  let counted = false;

  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          statNumbers.forEach((stat) => {
            const target = parseInt(stat.getAttribute("data-target"));
            animateNumber(stat, target);
          });
        }
      });
    },
    { threshold: 0.5 },
  );

  if (statNumbers.length > 0) {
    statObserver.observe(
      statNumbers[0].closest(".about-stats") || document.body,
    );
  }
});

// ==============================================================
// 4. NUMBER COUNTING
// ==============================================================
function animateNumber(element, target) {
  let current = 0;
  const increment = Math.ceil(target / 60);
  const duration = 1800;
  const stepTime = duration / 60;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = current + (target === 100 ? "%" : "");
  }, stepTime);
}

// ==============================================================
// 5. SMOOTH SCROLL FOR ANCHOR LINKS
// ==============================================================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});

// ==============================================================
// 6. SCROLL INDICATOR CLICK
// ==============================================================
document.addEventListener("DOMContentLoaded", () => {
  const scrollIndicator = document.getElementById("scrollIndicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) aboutSection.scrollIntoView({ behavior: "smooth" });
    });
  }
});

// ==============================================================
// 7. 3D MOUSE TILT (Skills flashcards only)
// ==============================================================
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".flashcard-3d[data-tilt]");

  cards.forEach((card) => {
    const tiltWrapper = card.querySelector(".flashcard-tilt");
    if (!tiltWrapper) return;

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      tiltWrapper.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      tiltWrapper.style.transition =
        "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)";
      tiltWrapper.style.transform = "rotateY(0deg) rotateX(0deg)";
      setTimeout(() => {
        tiltWrapper.style.transition = "transform 0.1s ease-out";
      }, 400);
    });
  });
});

// ==============================================================
// 8. PROJECT DATA
// ==============================================================
const projectData = [
  {
    id: 0,
    title: "AI Personal Knowledge Management (Second Brain)",
    tag: "⭐ Featured",
    theme: "ai",
    description:
      'An AI-powered "Second Brain" system that helps users store, organize, and retrieve knowledge intelligently using local LLMs (Ollama). Users can upload documents (PDFs, TXT files) and ask questions to get AI-generated answers based on their personal data. This project simulates a private, offline AI assistant that keeps your data secure and accessible.',
    features: [
      "Secure user authentication using JWT tokens",
      "File upload and storage using Multer middleware",
      "Real-time AI chat interface powered by Ollama",
      "Smart search and knowledge retrieval system",
      "Fully responsive React frontend with Axios",
    ],
    techStack: [
      "React",
      "Node.js",
      "Express",
      "Ollama",
      "Multer",
      "MongoDB",
      "Axios",
      "CSS3",
    ],
    images: [
      "assets/images/projects/secondbrain-1.png",
      "assets/images/projects/secondbrain-2.png",
      "assets/images/projects/secondbrain-3.png",
    ],
  },
  {
    id: 1,
    title: "AI Virtual Mock Interview",
    tag: "⭐ Featured",
    theme: "ai",
    description:
      "An interactive web platform that simulates real-world job interviews. The AI generates customized questions based on the selected job role and provides instant, intelligent feedback on the user's answers. It helps candidates practice and improve their interview skills in a low-pressure environment.",
    features: [
      "Role-based question generation (Frontend, Backend, Data Science)",
      "Speech-to-text input option for realistic practice",
      "AI-powered scoring and feedback system",
      "Progress tracking and session history",
    ],
    techStack: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "PHP",
      "Python (Flask)",
      "XAMPP",
      "MySQL",
    ],
    images: [
      "assets/images/projects/interview-1.png",
      "assets/images/projects/interview-2.png",
      "assets/images/projects/interview-3.png",
    ],
  },
  {
    id: 2,
    title: "Anomaly Detection in 6G Wireless Networks",
    tag: "Research",
    theme: "6g",
    description:
      "A research-oriented project focused on detecting unusual traffic patterns and anomalies in next-generation 6G wireless networks. Using machine learning algorithms, this system analyzes network data to identify potential security threats and performance irregularities in real-time.",
    features: [
      "Real-time data visualization dashboards with Chart.js",
      "Machine learning model training using Scikit-learn",
      "Anomaly alert system with email notifications",
      "Data preprocessing and feature extraction pipeline",
    ],
    techStack: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Python (Pandas, Scikit-learn)",
      "MongoDB",
      "Chart.js",
    ],
    images: [
      "assets/images/projects/6g-1.jpg",
      "assets/images/projects/6g-2.jpg",
      "assets/images/projects/6g-3.jpg",
    ],
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    tag: "Web App",
    theme: "ecommerce",
    description:
      "A fully functional online shopping website that allows users to browse products, add them to a shopping cart, and complete a simulated checkout process. This project demonstrates core e-commerce functionality with a clean and intuitive user interface.",
    features: [
      "Product catalog with category filtering",
      "Add to cart / Remove from cart functionality",
      "Dynamic cart summary with real-time total calculation",
      "Checkout simulation with order summary",
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "XAMPP", "MySQL"],
    images: [
      "assets/images/projects/ecommerce-1.jpg",
      "assets/images/projects/ecommerce-2.jpg",
      "assets/images/projects/ecommerce-3.jpg",
    ],
  },
  {
    id: 4,
    title: "Alumni Management System",
    tag: "Desktop App",
    theme: "alumni",
    description:
      "A Java-based desktop application designed to help educational institutions manage alumni records, organize events, and maintain effective communication with former students. It provides an intuitive interface for CRUD operations and event tracking.",
    features: [
      "Complete CRUD operations (Add, Edit, Delete Alumni)",
      "Event scheduling and management system",
      "Advanced search and filter functionality",
      "User-friendly Swing interface with modern design",
    ],
    techStack: ["Java (Core)", "Java Swing", "MySQL", "JDBC"],
    images: [
      "assets/images/projects/alumni-1.png",
      "assets/images/projects/alumni-2.png",
      "assets/images/projects/alumni-3.png",
    ],
  },
];

// ==============================================================
// ICON MAPPING
// ==============================================================
const projectIcons = {
  ai: { icon: "fas fa-brain", className: "icon-ai" },
  ecommerce: { icon: "fas fa-shopping-cart", className: "icon-ecommerce" },
  alumni: { icon: "fas fa-users", className: "icon-alumni" },
  "6g": { icon: "fas fa-wifi", className: "icon-6g" },
};

// ==============================================================
// GLOBAL STATE
// ==============================================================
let currentImageIndex = 0;
let currentProjectImages = [];
let currentProjectIndex = 0;

// ==============================================================
// 9. MODAL DOM ELEMENTS
// ==============================================================
const modal = document.getElementById("projectModal");
const modalContent = document.getElementById("modalContent");
const closeBtn = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalTag = document.getElementById("modalTag");
const modalDescription = document.getElementById("modalDescription");
const modalFeatures = document.getElementById("modalFeatures");
const modalTech = document.getElementById("modalTech");
const modalImagesContainer = document.getElementById("modalImagesContainer");
const carouselPrev = document.getElementById("carouselPrev");
const carouselNext = document.getElementById("carouselNext");
const carouselDots = document.getElementById("carouselDots");

// ==============================================================
// 10. SPARKLE GENERATOR — Neon Glitter Modal
// ==============================================================
function generateSparkles(theme) {
  const container = document.getElementById("sparkleContainer");
  if (!container) return;
  container.innerHTML = "";

  const sparkleColors = {
    ai: ["sparkle-pink", "sparkle-purple", "sparkle-pink", "sparkle-purple"],
    ecommerce: ["sparkle-gold", "sparkle-gold", "sparkle-gold", "sparkle-gold"],
    alumni: ["sparkle-blue", "sparkle-cyan", "sparkle-blue", "sparkle-cyan"],
    "6g": ["sparkle-cyan", "sparkle-blue", "sparkle-cyan", "sparkle-blue"],
  };

  const colors = sparkleColors[theme] || sparkleColors["ai"];

  // Small sparkles (30)
  for (let i = 0; i < 30; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = `sparkle ${colors[i % colors.length]}`;
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    const size = 2 + Math.random() * 4;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.animationDelay = `${Math.random() * 6}s`;
    sparkle.style.animationDuration = `${5 + Math.random() * 4}s`;
    container.appendChild(sparkle);
  }

  // Bigger star sparkles (8)
  for (let i = 0; i < 8; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = `sparkle ${colors[i % colors.length]}`;
    sparkle.style.left = `${10 + Math.random() * 80}%`;
    sparkle.style.top = `${10 + Math.random() * 80}%`;
    sparkle.style.width = `${6 + Math.random() * 4}px`;
    sparkle.style.height = `${6 + Math.random() * 4}px`;
    sparkle.style.animationDelay = `${Math.random() * 7}s`;
    sparkle.style.animationDuration = `${7 + Math.random() * 3}s`;
    sparkle.style.opacity = "0.5";
    container.appendChild(sparkle);
  }

  // Glitter streaks
  for (let i = 0; i < 3; i++) {
    const streak = document.createElement("div");
    streak.className = "glitter-streak";
    streak.style.top = `${Math.random() * 60}%`;
    streak.style.left = `${Math.random() * 40}%`;
    streak.style.animationDelay = `${i * 2.5}s`;
    container.appendChild(streak);
  }
}

// ==============================================================
// 11. OPEN MODAL
// ==============================================================
function openProjectModal(index) {
  const project = projectData[index];
  if (!project || !modal) {
    console.error(
      "openProjectModal: project not found or modal missing",
      index,
    );
    return;
  }

  currentProjectIndex = index;
  modalContent.scrollTop = 0;
  currentImageIndex = 0;
  currentProjectImages = project.images || [];

  generateSparkles(project.theme || "ai");

  // Icon
  const iconContainer = document.getElementById("modalProjectIcon");
  if (iconContainer) {
    const iconData = projectIcons[project.theme] || projectIcons["ai"];
    iconContainer.className = `modal-project-icon ${iconData.className}`;
    iconContainer.innerHTML = `<i class="${iconData.icon}"></i>`;
  }

  // Text
  if (modalTitle) modalTitle.textContent = project.title;
  if (modalTag) modalTag.textContent = project.tag;
  if (modalDescription) modalDescription.textContent = project.description;

  // Features
  if (modalFeatures) {
    modalFeatures.innerHTML = "";
    project.features.forEach((feature) => {
      const li = document.createElement("li");
      li.textContent = feature;
      modalFeatures.appendChild(li);
    });
  }

  // Tech stack
  if (modalTech) {
    modalTech.innerHTML = "";
    project.techStack.forEach((tech) => {
      const badge = document.createElement("span");
      badge.className = "tech-badge";
      badge.textContent = tech;
      modalTech.appendChild(badge);
    });
  }

  // Carousel
  setupCarousel(project.images, project);

  // Show modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// ==============================================================
// 12. SETUP CAROUSEL — With Click-to-Enlarge
// ==============================================================
function setupCarousel(images, project) {
  if (!modalImagesContainer || !carouselDots) return;

  modalImagesContainer.innerHTML = "";
  carouselDots.innerHTML = "";

  const safeProject = project ||
    projectData[currentProjectIndex] || { title: "Project", theme: "ai" };
  const projectTitle = (safeProject.title || "Project").split("(")[0].trim();

  const iconMap = {
    ai: "fa-brain",
    ecommerce: "fa-shopping-cart",
    alumni: "fa-users",
    "6g": "fa-wifi",
  };
  const themeIcon = iconMap[safeProject.theme] || "fa-image";

  // Build captions for lightbox
  const lightboxTitles = (images || []).map(
    (_, i) => `${projectTitle} — Image ${i + 1}`,
  );

  if (images && images.length > 0) {
    images.forEach((imgSrc, i) => {
      const wrap = document.createElement("div");
      wrap.style.cssText = "position:absolute;inset:0;";

      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = `${projectTitle} — image ${i + 1}`;
      img.className = i === 0 ? "active" : "";
      img.dataset.lightboxIndex = i;
      img.style.cursor = "zoom-in";
      img.title = "Click to enlarge";

      // ✅ CLICK TO OPEN LIGHTBOX
      img.addEventListener("click", (e) => {
        e.stopPropagation();
        openLightbox(images, lightboxTitles, i);
      });

      img.onerror = function () {
        this.remove();
        if (wrap.querySelector(".image-placeholder-card")) return;
        const ph = document.createElement("div");
        ph.className = "image-placeholder-card";
        ph.innerHTML = `
                    <div class="image-placeholder-icon">
                        <i class="fas ${themeIcon}"></i>
                    </div>
                    <div class="image-placeholder-title">${projectTitle}</div>
                    <div class="image-placeholder-sub">
                        <span class="ph-label">Preview</span>
                        <span class="ph-sep">•</span>
                        <span class="ph-count">${i + 1} / ${images.length}</span>
                    </div>
                `;
        wrap.appendChild(ph);
      };

      wrap.appendChild(img);
      modalImagesContainer.appendChild(wrap);
    });

    images.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = `carousel-dot ${i === 0 ? "active" : ""}`;
      dot.setAttribute("aria-label", `Go to image ${i + 1}`);
      dot.addEventListener("click", () => goToImage(i));
      carouselDots.appendChild(dot);
    });

    if (carouselPrev)
      carouselPrev.style.display = images.length > 1 ? "flex" : "none";
    if (carouselNext)
      carouselNext.style.display = images.length > 1 ? "flex" : "none";
    carouselDots.style.display = images.length > 1 ? "flex" : "none";

    currentImageIndex = 0;
  } else {
    // No images configured — show beautiful placeholder
    const ph = document.createElement("div");
    ph.className = "image-placeholder-card";
    ph.innerHTML = `
            <div class="image-placeholder-icon">
                <i class="fas ${themeIcon}"></i>
            </div>
            <div class="image-placeholder-title">${projectTitle}</div>
            <div class="image-placeholder-sub">
                <span class="ph-label">Gallery</span>
                <span class="ph-sep">•</span>
                <span class="ph-count">Coming Soon</span>
            </div>
        `;
    modalImagesContainer.appendChild(ph);
    if (carouselPrev) carouselPrev.style.display = "none";
    if (carouselNext) carouselNext.style.display = "none";
    carouselDots.style.display = "none";
  }
}

// ==============================================================
// 13. CAROUSEL NAVIGATION
// ==============================================================
function goToImage(index) {
  if (!modalImagesContainer || !carouselDots) return;

  const wrappers = modalImagesContainer.children;
  const dots = carouselDots.querySelectorAll(".carousel-dot");
  if (wrappers.length === 0) return;

  Array.from(wrappers).forEach((w) => {
    const img = w.querySelector("img");
    if (img) img.classList.remove("active");
  });
  dots.forEach((dot) => dot.classList.remove("active"));

  const currentWrap = wrappers[index];
  if (currentWrap) {
    const img = currentWrap.querySelector("img");
    if (img) img.classList.add("active");
  }
  if (dots[index]) dots[index].classList.add("active");

  currentImageIndex = index;
}

function nextImage() {
  const count = modalImagesContainer.children.length;
  if (count === 0) return;
  goToImage((currentImageIndex + 1) % count);
}

function prevImage() {
  const count = modalImagesContainer.children.length;
  if (count === 0) return;
  goToImage((currentImageIndex - 1 + count) % count);
}

// Wire carousel buttons
if (carouselNext) carouselNext.addEventListener("click", nextImage);
if (carouselPrev) carouselPrev.addEventListener("click", prevImage);

// Keyboard nav for carousel (only when modal is open and lightbox is closed)
document.addEventListener("keydown", (e) => {
  if (!modal || !modal.classList.contains("active")) return;
  if (document.body.classList.contains("lightbox-open")) return;
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
  if (e.key === "Escape") closeModal();
});

// ==============================================================
// 13.b IMAGE LIGHTBOX — Click-to-Enlarge Viewer
// ==============================================================
const lightbox = document.getElementById("imageLightbox");
const lightboxBackdrop = document.getElementById("lightboxBackdrop");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxCounter = document.getElementById("lightboxCounter");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let lightboxImages = [];
let lightboxTitles = [];
let lightboxIndex = 0;

function openLightbox(images, titles, startIndex) {
  if (!lightbox || !images || images.length === 0) return;

  lightboxImages = images;
  lightboxTitles = titles || [];
  lightboxIndex = startIndex || 0;

  renderLightboxImage();
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");

  // Toggle single-image mode (hides nav arrows + counter)
  if (images.length <= 1) {
    lightbox.classList.add("single-image");
  } else {
    lightbox.classList.remove("single-image");
  }
}

function renderLightboxImage() {
  if (!lightboxImage || lightboxImages.length === 0) return;

  lightboxImage.style.opacity = "0";
  setTimeout(() => {
    lightboxImage.src = lightboxImages[lightboxIndex];
    lightboxImage.alt = lightboxTitles[lightboxIndex] || "Project image";

    if (lightboxCaption) {
      lightboxCaption.textContent = lightboxTitles[lightboxIndex] || "";
      lightboxCaption.style.display = lightboxTitles[lightboxIndex]
        ? "inline-block"
        : "none";
    }

    if (lightboxCounter) {
      lightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
    }

    lightboxImage.style.opacity = "1";
  }, 150);
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
  // Reset src after transition to avoid flash
  setTimeout(() => {
    if (lightboxImage) lightboxImage.src = "";
  }, 350);
}

function lightboxNextImage() {
  if (lightboxImages.length <= 1) return;
  lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
  renderLightboxImage();
}

function lightboxPrevImage() {
  if (lightboxImages.length <= 1) return;
  lightboxIndex =
    (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  renderLightboxImage();
}

// Wire lightbox buttons
if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightbox);
if (lightboxNext) lightboxNext.addEventListener("click", lightboxNextImage);
if (lightboxPrev) lightboxPrev.addEventListener("click", lightboxPrevImage);
if (lightboxImage) lightboxImage.addEventListener("click", closeLightbox);

// Keyboard nav for lightbox
document.addEventListener("keydown", (e) => {
  if (!lightbox || !lightbox.classList.contains("active")) return;
  if (e.key === "Escape") {
    e.stopPropagation();
    closeLightbox();
  }
  if (e.key === "ArrowRight") lightboxNextImage();
  if (e.key === "ArrowLeft") lightboxPrevImage();
});

// Swipe support (mobile)
let lightboxTouchStartX = 0;
if (lightbox) {
  lightbox.addEventListener(
    "touchstart",
    (e) => {
      lightboxTouchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );

  lightbox.addEventListener(
    "touchend",
    (e) => {
      const diff = e.changedTouches[0].screenX - lightboxTouchStartX;
      if (Math.abs(diff) > 60) {
        if (diff < 0) lightboxNextImage();
        else lightboxPrevImage();
      }
    },
    { passive: true },
  );
}

// ==============================================================
// 14. CLOSE MODAL
// ==============================================================
function closeModal() {
  if (!modal) return;

  // Also close lightbox if open
  if (lightbox && lightbox.classList.contains("active")) {
    closeLightbox();
  }

  modal.classList.remove("active");
  document.body.style.overflow = "auto";
  const container = document.getElementById("sparkleContainer");
  if (container) container.innerHTML = "";
}

if (closeBtn) closeBtn.addEventListener("click", closeModal);
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

// ==============================================================
// 15. VIEW DETAILS BUTTON HANDLER
// ==============================================================
document.addEventListener("DOMContentLoaded", () => {
  const viewButtons = document.querySelectorAll(".view-details-btn");

  viewButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const card =
        button.closest(".project-card") || button.closest(".flashcard-3d");
      if (!card) {
        console.error(
          "Could not find project card wrapper for button:",
          button,
        );
        return;
      }

      const index = parseInt(card.getAttribute("data-index"), 10);
      if (!isNaN(index)) {
        openProjectModal(index);
      } else {
        console.error("Missing or invalid data-index on card:", card);
      }
    });
  });

  // Click anywhere on project card opens the modal too
  const cards = document.querySelectorAll(".project-card");
  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".view-details-btn")) return;
      const index = parseInt(card.getAttribute("data-index"), 10);
      if (!isNaN(index)) openProjectModal(index);
    });
  });
});

// ==============================================================
// 16. ENHANCEMENTS
// ==============================================================
(function () {
  "use strict";

  const isTouch = !window.matchMedia("(hover: hover) and (pointer: fine)")
    .matches;
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* PRELOADER */
  function initPreloader() {
    const preloader = document.createElement("div");
    preloader.id = "preloader";
    preloader.innerHTML = `
            <div class="loader-logo">Monika K</div>
            <div class="loader-bar"></div>
            <div class="loader-text">Loading Portfolio</div>
        `;
    document.body.insertBefore(preloader, document.body.firstChild);

    const hide = () => {
      preloader.classList.add("hidden");
      setTimeout(() => preloader.remove(), 900);
    };
    window.addEventListener("load", () => setTimeout(hide, 800));
    setTimeout(hide, 4000);
  }

  /* SCROLL PROGRESS */
  function initScrollProgress() {
    const bar = document.createElement("div");
    bar.id = "scrollProgress";
    document.body.appendChild(bar);

    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      bar.style.width = `${Math.min(scrolled * 100, 100)}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* CUSTOM CURSOR */
  function initCursor() {
    if (isTouch || prefersReduced) return;

    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    document.body.append(dot, ring);

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    document.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
    });

    function animateRing() {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverTargets =
      "a, button, .flashcard-3d, .about-card, .contact-item, .btn, .section-dot, .project-card, .cert-card, .achieve-card";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverTargets)) {
        dot.classList.add("hovering");
        ring.classList.add("hovering");
      }
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverTargets)) {
        dot.classList.remove("hovering");
        ring.classList.remove("hovering");
      }
    });
  }

  /* AURORA */
  function initAurora() {
    if (prefersReduced) return;
    const aurora = document.createElement("div");
    aurora.id = "auroraBg";
    aurora.innerHTML = `
            <div class="aurora-blob aurora-1"></div>
            <div class="aurora-blob aurora-2"></div>
            <div class="aurora-blob aurora-3"></div>
            <div class="aurora-blob aurora-4"></div>
        `;
    document.body.insertBefore(aurora, document.body.firstChild);
  }

  /* NOISE */
  function initNoise() {
    const noise = document.createElement("div");
    noise.id = "noiseOverlay";
    document.body.appendChild(noise);
  }

  /* BACK TO TOP */
  function initBackToTop() {
    const btn = document.createElement("button");
    btn.id = "backToTop";
    btn.setAttribute("aria-label", "Back to top");
    btn.innerHTML = `
            <svg viewBox="0 0 52 52">
                <circle cx="26" cy="26" r="24" stroke-dasharray="150.8" stroke-dashoffset="150.8"></circle>
            </svg>
            <i class="fas fa-arrow-up"></i>
        `;
    document.body.appendChild(btn);

    const circle = btn.querySelector("circle");
    const total = 150.8;

    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      circle.style.strokeDashoffset = total - scrolled * total;
      if (h.scrollTop > 400) btn.classList.add("visible");
      else btn.classList.remove("visible");
    };
    window.addEventListener("scroll", update, { passive: true });

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    update();
  }

  /* SECTION NAV DOTS */
  function initSectionDots() {
    const sections = [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "skills", label: "Skills" },
      { id: "projects", label: "Projects" },
      { id: "certifications", label: "Certifications" },
      { id: "achievements", label: "Achievements" },
      { id: "education", label: "Education" },
      { id: "contact", label: "Contact" },
    ];

    const available = sections.filter((s) => document.getElementById(s.id));
    if (available.length < 2) return;

    const nav = document.createElement("div");
    nav.id = "sectionDots";
    nav.innerHTML = available
      .map(
        (s) =>
          `<button class="section-dot" data-target="#${s.id}" data-label="${s.label}" aria-label="Go to ${s.label}"></button>`,
      )
      .join("");
    document.body.appendChild(nav);

    const dots = nav.querySelectorAll(".section-dot");

    dots.forEach((d) => {
      d.addEventListener("click", () => {
        const t = document.querySelector(d.dataset.target);
        if (t) t.scrollIntoView({ behavior: "smooth" });
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dots.forEach((d) => d.classList.remove("active"));
            const active = nav.querySelector(
              `[data-target="#${entry.target.id}"]`,
            );
            if (active) active.classList.add("active");
          }
        });
      },
      { threshold: 0.4 },
    );

    available.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY < 200) nav.classList.remove("visible");
        else nav.classList.add("visible");
      },
      { passive: true },
    );
  }

  /* TECH MARQUEE */
  function initTechMarquee() {
    const aboutSection = document.getElementById("about");
    if (!aboutSection) return;

    const techs = [
      { icon: "fab fa-html5", name: "HTML5", color: "orange" },
      { icon: "fab fa-css3-alt", name: "CSS3", color: "blue" },
      { icon: "fab fa-js", name: "JavaScript", color: "gold" },
      { icon: "fab fa-react", name: "React", color: "cyan" },
      { icon: "fab fa-node-js", name: "Node.js", color: "green" },
      { icon: "fas fa-database", name: "MongoDB", color: "green" },
      { icon: "fas fa-server", name: "Express", color: "purple" },
      { icon: "fab fa-python", name: "Python", color: "blue" },
      { icon: "fab fa-php", name: "PHP", color: "purple" },
      { icon: "fas fa-fire", name: "Firebase", color: "orange" },
      { icon: "fab fa-java", name: "Java", color: "red" },
      { icon: "fab fa-figma", name: "Figma", color: "pink" },
      { icon: "fab fa-git-alt", name: "Git", color: "orange" },
      { icon: "fas fa-leaf", name: "Tailwind", color: "cyan" },
    ];

    const itemsHTML = techs
      .map(
        (t) =>
          `<div class="marquee-item" data-color="${t.color}">
                <i class="${t.icon}"></i><span>${t.name}</span>
            </div>`,
      )
      .join("");

    const marquee = document.createElement("div");
    marquee.className = "tech-marquee";
    marquee.innerHTML = `
            <div class="marquee-track">
                ${itemsHTML}
                ${itemsHTML}
            </div>
        `;
    aboutSection.insertAdjacentElement("afterend", marquee);
  }

  /* MAGNETIC BUTTONS */
  function initMagnetic() {
    if (isTouch || prefersReduced) return;
    const buttons = document.querySelectorAll(".btn, .btn-small");

    buttons.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  /* RIPPLE */
  function initRipple() {
    const targets = ".btn, .btn-small, .contact-item, .section-dot";
    document.addEventListener("click", (e) => {
      const el = e.target.closest(targets);
      if (!el) return;

      el.classList.add("ripple-host");
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";

      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  }

  /* TEXT REVEAL */
  function initTextReveal() {
    if (prefersReduced) return;

    const titles = document.querySelectorAll(".section-title");
    titles.forEach((title) => {
      const walk = (node) => {
        if (node.nodeType === 3) {
          const words = node.textContent.trim().split(/\s+/);
          if (!words[0]) return null;
          const frag = document.createDocumentFragment();
          words.forEach((w, i) => {
            const wrap = document.createElement("span");
            wrap.className = "reveal-word";
            const inner = document.createElement("span");
            inner.textContent = w;
            inner.style.transitionDelay = `${i * 0.06}s`;
            wrap.appendChild(inner);
            frag.appendChild(wrap);
            if (i < words.length - 1)
              frag.appendChild(document.createTextNode(" "));
          });
          return frag;
        } else if (node.nodeType === 1) {
          const clone = node.cloneNode(false);
          Array.from(node.childNodes).forEach((child) => {
            const res = walk(child);
            if (res) clone.appendChild(res);
          });
          return clone;
        }
        return null;
      };

      const newContent = document.createDocumentFragment();
      Array.from(title.childNodes).forEach((child) => {
        const res = walk(child);
        if (res) newContent.appendChild(res);
      });
      title.innerHTML = "";
      title.appendChild(newContent);

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("reveal-active");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 },
      );
      obs.observe(title);
    });
  }

  /* MOUSE TRAIL */
  function initMouseTrail() {
    if (isTouch || prefersReduced) return;

    const colors = ["#a78bfa", "#ec4899", "#f59e0b", "#06b6d4", "#10b981"];
    let lastTime = 0;
    let colorIndex = 0;

    document.addEventListener("mousemove", (e) => {
      const now = Date.now();
      if (now - lastTime < 60) return;
      lastTime = now;

      const p = document.createElement("div");
      p.className = "trail-particle";
      const color = colors[colorIndex % colors.length];
      colorIndex++;
      p.style.left = e.clientX + "px";
      p.style.top = e.clientY + "px";
      p.style.background = `radial-gradient(circle, ${color}, transparent 70%)`;
      p.style.boxShadow = `0 0 8px ${color}`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1000);
    });
  }

  /* CARD SPOTLIGHT */
  function initSpotlight() {
    if (isTouch) return;
    const cards = document.querySelectorAll(
      ".about-card, .edu-item, .contact-item, .flashcard-3d, .project-card, .cert-card, .achieve-card",
    );

    cards.forEach((card) => {
      card.classList.add("spotlight-card");
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - rect.left + "px");
        card.style.setProperty("--my", e.clientY - rect.top + "px");
      });
    });
  }

  /* WAVE DIVIDERS */
  function initWaveDividers() {
    const sections = [
      "about",
      "skills",
      "projects",
      "certifications",
      "achievements",
      "education",
      "contact",
    ];
    sections.forEach((id, idx) => {
      const section = document.getElementById(id);
      if (!section) return;

      const colors = [
        ["#0b0b1a", "#0f0f24"],
        ["#0f0f24", "#0b0b1a"],
        ["#0b0b1a", "#0f0f24"],
        ["#0f0f24", "#0b0b1a"],
        ["#0b0b1a", "#0f0f24"],
        ["#0f0f24", "#0b0b1a"],
        ["#0b0b1a", "#070712"],
      ];
      const [from, to] = colors[idx % colors.length];

      const wave = document.createElement("div");
      wave.className = "wave-divider";
      wave.style.background = `linear-gradient(180deg, ${from}, ${to})`;
      wave.innerHTML = `
                <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
                    <path fill="${to}" fill-opacity="1"
                        d="M0,40 C240,90 480,0 720,40 C960,80 1200,10 1440,50 L1440,90 L0,90 Z">
                    </path>
                </svg>
            `;
      section.appendChild(wave);
    });
  }

  /* CONFETTI */
  function initConfetti() {
    const canvas = document.createElement("canvas");
    canvas.id = "confettiCanvas";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    let pieces = [];
    let animId = null;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function burst() {
      const colors = [
        "#7c3aed",
        "#ec4899",
        "#f59e0b",
        "#06b6d4",
        "#10b981",
        "#fbbf24",
      ];
      pieces = [];
      for (let i = 0; i < 120; i++) {
        pieces.push({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          vx: (Math.random() - 0.5) * 16,
          vy: (Math.random() - 0.5) * 16 - 4,
          size: 5 + Math.random() * 8,
          color: colors[Math.floor(Math.random() * colors.length)],
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
          life: 1,
        });
      }
      if (!animId) animate();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35;
        p.vx *= 0.99;
        p.rot += p.vr;
        p.life -= 0.008;
      });
      pieces = pieces.filter((p) => p.life > 0 && p.y < canvas.height + 50);

      pieces.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
        ctx.restore();
      });

      if (pieces.length > 0) {
        animId = requestAnimationFrame(animate);
      } else {
        animId = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    document.addEventListener("click", (e) => {
      const el = e.target.closest("a, button");
      if (!el) return;
      const txt = (el.textContent || "").toLowerCase();
      if (txt.includes("resume") || txt.includes("download")) {
        burst();
      }
    });
  }

  /* HERO PARALLAX */
  function initHeroParallax() {
    if (isTouch || prefersReduced) return;
    const heroLeft = document.getElementById("heroLeft");
    const heroRight = document.getElementById("heroRight");
    const blobs = document.querySelectorAll(".hero .blob");
    if (!heroLeft || !heroRight) return;

    let targetX = 0,
      targetY = 0;
    let currentX = 0,
      currentY = 0;

    document.addEventListener("mousemove", (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animate() {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      heroLeft.style.transform = `translate3d(${currentX * -12}px, ${currentY * -12}px, 0)`;
      heroRight.style.transform = `translate3d(${currentX * 20}px, ${currentY * 20}px, 0)`;

      blobs.forEach((b, i) => {
        const depth = (i + 1) * 8;
        b.style.transform = `translate3d(${currentX * depth}px, ${currentY * depth}px, 0)`;
      });

      requestAnimationFrame(animate);
    }
    animate();
  }

  /* HERO SCROLL FADE */
  function initHeroFade() {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const content = hero.querySelector(".hero-container");
    const scroll_ind = hero.querySelector(".scroll-indicator");

    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY;
        const max = window.innerHeight;
        const progress = Math.min(y / max, 1);

        if (content) {
          content.style.opacity = String(1 - progress * 0.9);
          content.style.transform = `translateY(${progress * -40}px)`;
        }
        if (scroll_ind) {
          scroll_ind.style.opacity = String(1 - progress * 2);
        }
      },
      { passive: true },
    );
  }

  /* BOOT */
  document.addEventListener("DOMContentLoaded", () => {
    initPreloader();
    initAurora();
    initNoise();
    initScrollProgress();
    initCursor();
    initBackToTop();
    initSectionDots();
    initTechMarquee();
    initWaveDividers();
    initTextReveal();
    initMagnetic();
    initRipple();
    initMouseTrail();
    initSpotlight();
    initConfetti();
    initHeroParallax();
    initHeroFade();

    console.log(
      "%c✨ Enhancements loaded",
      "color:#a78bfa;font-size:14px;font-weight:bold",
    );
  });
})();

// ==============================================================
// 17. CERTIFICATIONS — Click-to-Enlarge Images
// ==============================================================
document.addEventListener("DOMContentLoaded", () => {
  const certImages = document.querySelectorAll(".cert-image");

  certImages.forEach((container) => {
    container.addEventListener("click", () => {
      if (typeof openLightbox !== "function") return;

      // Gather only the images that loaded successfully
      const validImages = [];
      const validTitles = [];

      document.querySelectorAll(".cert-plaque").forEach((plaque) => {
        const img = plaque.querySelector(".cert-image img");
        const title = plaque.querySelector(".cert-info h4");
        const subtitle = plaque.querySelector(".cert-info p");

        if (img && img.style.display !== "none" && img.naturalWidth > 0) {
          validImages.push(img.src);
          const caption = title
            ? `${title.textContent.trim()}${subtitle ? " — " + subtitle.textContent.trim() : ""}`
            : "";
          validTitles.push(caption);
        }
      });

      if (validImages.length === 0) return;

      const clickedImg = container.querySelector("img");
      const idx = validImages.indexOf(clickedImg?.src);

      openLightbox(validImages, validTitles, idx >= 0 ? idx : 0);
    });
  });
});


// ==============================================================
// 18. CONTACT — Say Hello Studio
// ==============================================================
document.addEventListener('DOMContentLoaded', () => {

    const chips = document.querySelectorAll('.chip');
    const form = document.getElementById('contactForm');
    const subjectInput = document.getElementById('cf-subject');
    const messageInput = document.getElementById('cf-message');
    const nameInput = document.getElementById('cf-name');
    const moodEl = document.getElementById('formMood');
    const counterEl = document.getElementById('formCounter');
    const submitBtn = document.getElementById('formSubmit');
    const successBox = document.getElementById('formSuccess');
    const successReset = document.getElementById('formSuccessReset');
    const successTitle = document.getElementById('formSuccessTitle');

    /* ---------- 1. Quick reply chips ---------- */
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            if (subjectInput) {
                subjectInput.value = chip.dataset.subject || '';
                subjectInput.focus();
            }
        });
    });

    /* ---------- 2. Live character counter ---------- */
    if (messageInput && counterEl) {
        const updateCounter = () => {
            const len = messageInput.value.length;
            const max = 500;
            counterEl.textContent = `${len} / ${max}`;
            counterEl.classList.remove('warn', 'alert');
            if (len > max * 0.9) counterEl.classList.add('alert');
            else if (len > max * 0.75) counterEl.classList.add('warn');
        };
        messageInput.addEventListener('input', updateCounter);
        updateCounter();
    }

    /* ---------- 3. Live mood detector ---------- */
    if (messageInput && moodEl) {
        const moodWords = {
            excited: ['wow', 'amazing', 'awesome', 'cool', 'love', 'exciting', '!!', 'yay', '🎉', '🚀'],
            formal: ['regards', 'sincerely', 'kindly', 'respectfully', 'thank you for', 'dear'],
            friendly: ['hi', 'hey', 'hello', 'thanks', 'cheers', '😊', '🙂', '👋']
        };

        const detectMood = (text) => {
            const lower = text.toLowerCase();
            if (text.length < 3) return { emoji: '✍️', label: 'Start typing…' };

            for (const [mood, words] of Object.entries(moodWords)) {
                if (words.some(w => lower.includes(w))) {
                    const map = {
                        excited:  { emoji: '🚀', label: 'Excited' },
                        formal:   { emoji: '🤝', label: 'Formal' },
                        friendly: { emoji: '😊', label: 'Friendly' }
                    };
                    return map[mood];
                }
            }
            if (text.length > 100) return { emoji: '📝', label: 'Detailed' };
            return { emoji: '💭', label: 'Neutral' };
        };

        messageInput.addEventListener('input', () => {
            const mood = detectMood(messageInput.value);
            moodEl.textContent = `${mood.emoji} ${mood.label}`;
        });
    }

    /* ---------- 4. Form submission with success animation ---------- */
    if (form && submitBtn) {
        form.addEventListener('submit', (e) => {
            const name = nameInput?.value.trim() || '';
            const email = document.getElementById('cf-email')?.value.trim() || '';
            const subject = subjectInput?.value.trim() || '';
            const message = messageInput?.value.trim() || '';

            if (!name || !email || !subject || !message) {
                e.preventDefault();
                // Basic highlight of the missing field
                [nameInput, document.getElementById('cf-email'), subjectInput, messageInput].forEach(field => {
                    if (field && !field.value.trim()) {
                        field.style.borderColor = 'rgba(239, 68, 68, 0.6)';
                        field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.12)';
                        setTimeout(() => {
                            field.style.borderColor = '';
                            field.style.boxShadow = '';
                        }, 1800);
                    }
                });
                return;
            }

            // Let the browser submit normally to FormSubmit.co
            // But show a loading state + success overlay
            submitBtn.classList.add('loading');

            // Note: Because FormSubmit redirects, we optimistically show success.
            // If you want to stay on the same page, add this hidden input in the HTML:
            // <input type="hidden" name="_next" value="YOUR_SITE_URL#contact" />
            setTimeout(() => {
                if (successBox) {
                    successBox.classList.add('active');
                    successBox.setAttribute('aria-hidden', 'false');
                    if (successTitle) {
                        successTitle.textContent = `Message sent, ${name.split(' ')[0]}!`;
                    }
                }
                submitBtn.classList.remove('loading');
            }, 900);
        });
    }

    /* ---------- 5. Success reset ---------- */
    if (successReset && successBox && form) {
        successReset.addEventListener('click', () => {
            successBox.classList.remove('active');
            successBox.setAttribute('aria-hidden', 'true');
            form.reset();
            if (counterEl) counterEl.textContent = '0 / 500';
            if (moodEl) moodEl.textContent = '✍️ Start typing…';
            chips.forEach(c => c.classList.remove('active'));
        });
    }

    /* ---------- 6. Optional: confetti on success ---------- */
    document.addEventListener('click', (e) => {
        if (e.target.closest('#formSubmit')) {
            // Trigger small confetti burst if the global confetti system exists
            // It's already wired elsewhere in your portfolio — no action needed here.
        }
    });
});


// ==============================================================
// FINAL LOGS
// ==============================================================
console.log("✅ Portfolio script loaded successfully!");
console.log("📁 Projects:", projectData.map((p) => p.title).join(" | "));
console.log("🎨 All enhancements active");
