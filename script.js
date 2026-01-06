document.addEventListener("DOMContentLoaded", () => {
  // === LOGIKA NAVBAR MOBILE ===
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  const toggleMenu = () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("active");

    if (mobileMenu.classList.contains("active")) {
      menuIcon.style.transform = "rotate(90deg)";
    } else {
      menuIcon.style.transform = "rotate(0deg)";
    }
  };

  if (menuBtn) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("active");
      menuIcon.style.transform = "rotate(0deg)";
    });
  });

  document.addEventListener("click", (e) => {
    if (
      mobileMenu &&
      !mobileMenu.contains(e.target) &&
      menuBtn &&
      !menuBtn.contains(e.target)
    ) {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("active");
      menuIcon.style.transform = "rotate(0deg)";
    }
  });

  // === LOGIKA TYPEWRITER (TEKS BERGANTI) ===
  const textElement = document.getElementById("typing-text");
  const words = ["Software Dev", "Network Tech", "IT Student", "Web Dev"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 150;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      textElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      textElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 150;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  if (textElement) {
    type();
  }

  // === LOGIKA MODAL CV ===
  const cvModal = document.getElementById("cv-modal");
  const modalContent = document.getElementById("modal-content");
  const closeCv = document.getElementById("close-cv");
  const modalOverlay = document.getElementById("modal-overlay");

  // DISESUAIKAN: Hanya ambil link .pdf yang TIDAK memiliki atribut 'download'
  // Ini agar tombol download offline tetap berfungsi sebagaimana mestinya.
  const cvButtons = document.querySelectorAll(
    'a[href$=".pdf"]:not([download])'
  );

  const openModal = (e) => {
    e.preventDefault();
    if (!cvModal) return;

    cvModal.classList.remove("hidden");
    cvModal.classList.add("flex");

    setTimeout(() => {
      modalContent.classList.remove("scale-95", "opacity-0");
      modalContent.classList.add("scale-100", "opacity-100");
    }, 10);

    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (!cvModal) return;

    modalContent.classList.remove("scale-100", "opacity-100");
    modalContent.classList.add("scale-95", "opacity-0");

    setTimeout(() => {
      cvModal.classList.add("hidden");
      cvModal.classList.remove("flex");
      document.body.style.overflow = "auto";
    }, 300);
  };

  cvButtons.forEach((btn) => btn.addEventListener("click", openModal));

  if (closeCv) closeCv.addEventListener("click", closeModal);
  if (modalOverlay) modalOverlay.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      cvModal &&
      !cvModal.classList.contains("hidden")
    ) {
      closeModal();
    }
  });

  // === LOGIKA METEOR CURSOR TRAIL ===
  const createMeteorTrail = () => {
    const container = document.createElement("div");
    container.id = "meteor-container";
    document.body.appendChild(container);

    const dots = [];
    const dotCount = 12;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    for (let i = 0; i < dotCount; i++) {
      const dotEl = document.createElement("div");
      dotEl.className = "meteor-dot";
      dotEl.style.position = "fixed";
      dotEl.style.top = "0";
      dotEl.style.left = "0";
      dotEl.style.borderRadius = "50%";
      dotEl.style.pointerEvents = "none";
      dotEl.style.zIndex = "9999";
      dotEl.style.mixBlendMode = "screen";
      dotEl.style.background =
        "radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(34, 211, 238, 0) 70%)";
      dotEl.style.willChange = "transform";
      container.appendChild(dotEl);

      dots.push({
        el: dotEl,
        x: mouseX,
        y: mouseY,
        size: 35 * Math.pow(0.85, i),
        lerp: 0.25 * Math.pow(0.8, i),
      });
    }

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      dots.forEach((dot, index) => {
        dot.x += (mouseX - dot.x) * dot.lerp;
        dot.y += (mouseY - dot.y) * dot.lerp;
        dot.el.style.width = `${dot.size}px`;
        dot.el.style.height = `${dot.size}px`;
        dot.el.style.opacity = 1 - index / dotCount;
        dot.el.style.transform = `translate(${dot.x}px, ${dot.y}px) translate(-50%, -50%)`;
      });
      requestAnimationFrame(animate);
    }
    animate();
  };

  createMeteorTrail();
});
