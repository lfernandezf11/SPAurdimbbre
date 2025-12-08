const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links a'); // All para iterar todos los valores de nav-links.

// Cuando se pulsa el toggle, se añade o elimina la clase .active, lo que hace que los nav-links se muestren (display:flex, menú abierto)
// o no (display:none, menú cerrado).
toggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Detecta cuándo se pulsa un enlace dentro de nav-links y elimina la clase .active, lo que hace que el toggle se cierre.
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
  });

  // Efecto de dragging magnético
  link.addEventListener("mousemove", e => {
    const rect = link.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    gsap.to(link, {
      x: relX * 0.2,
      y: relY * 0.2,
      duration: 0.3,
      ease: "power3.out"
    });
  });

  // entrada hover
  link.addEventListener("mouseenter", () => {
    gsap.to(link, {
      backgroundColor: "#580101",
      color: "rgb(245, 245, 245)",
      duration: 0.4,
      ease: "power2.out"
    });
  });

  // salida hover
  link.addEventListener("mouseleave", () => {
    gsap.to(link, {
      x: 0,
      y: 0,
      backgroundColor: "transparent",
      color: "#131313",
      duration: 0.4,
      ease: "power3.out"
    });
  });
});



// Detecta el tamaño del ancho de pantalla, de modo que si se cruza el ancho máximo de móviles (480px), el toggle se cierra (pierde la clase .active)
window.addEventListener('resize', () => {
  if (window.innerWidth >= 480) {
    nav.classList.remove('active');
  }
});

/* ANIMACIONES GSAP ------------------------------------------------------------------------ */
gsap.registerPlugin(ScrollTrigger);
/* Texto del Hero, aparece de abajo arriba */
document.addEventListener("DOMContentLoaded", () => {
  gsap.to(".hero h2", {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "back.out",
    scrollTrigger: {
      trigger: ".hero h2",
      start: "top 80%",// cuando la parte superior del h2 llega al 80% de la pantalla
      toggleActions: "play none none none" // se anima una sola vez
    }
  });
});