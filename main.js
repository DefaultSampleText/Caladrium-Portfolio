const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const yearElement = document.querySelector("#year");
const parallaxLayers = document.querySelectorAll(".parallax-layer[data-speed]");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.addEventListener("click", (event) => {
    const clickedLink = event.target.closest("a");

    if (!clickedLink) return;

    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
}

function updateParallaxLayers() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) return;

  const scrollPosition = window.scrollY;

  parallaxLayers.forEach((layer) => {
    const speed = Number(layer.dataset.speed) || 0;
    const movement = scrollPosition * speed;

    layer.style.transform = `translateY(${movement}px)`;
  });
}

if (parallaxLayers.length > 0) {
  updateParallaxLayers();
  window.addEventListener("scroll", updateParallaxLayers, { passive: true });
}