const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links a'); 
const cards = document.querySelectorAll(".service-card");

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
      backgroundColor: "#131313",
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
gsap.to(".hero h2", {
  opacity: 1,
  y: 0,
  duration: 1.2,
  ease: "back.out",
  scrollTrigger: {
    trigger: ".hero h2",
    start: "top 80%", // cuando la parte superior del h2 llega al 80% de la pantalla
    toggleActions: "play none none none" // se anima una sola vez
  }
});


cards.forEach((card, index) => {

  // Animación de la tarjeta con ScrollTrigger
  const isEven = index % 2 === 1;
  gsap.fromTo(card,
    {
      x: isEven ? "120%" : "-120%",
      opacity: 0
    },
    {
      x: "0%",
      opacity: 1,
      duration: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: card,
        start: "top 95%",
        end: "top 40%",
        scrub: 0.5,
        // markers: true // Descomentar para ver los marcadores del ScrollTrigger
      }
    }
  );

  // Timeline para el texto dentro de la tarjeta
  const titulo = card.querySelector('h3');
  const parrafo = card.querySelector('p');
  const textoTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
      toggleActions: "play reverse play reverse" 
    }
  });

  textoTimeline.from(titulo, {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "power2.out"
  }, "+=0.3"); // Empieza 0.2 segundos después de que el timeline inicie

  
  textoTimeline.from(parrafo, {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: "power2.out"
  }, "<0.1"); // Empieza 0.1 segundos ANTES de que termine la animación anterior

});