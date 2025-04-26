/* ==================== VARIABLES GLOBALES ==================== */
// Elementos del DOM
const cateList = document.querySelector('.cate-list'); // Contenedor del carrusel
const dots = document.querySelectorAll('.cate-pagination .dot'); // Puntos de navegación
const slides = cateList.querySelectorAll('.cate-item'); // Slides individuales
let currentIndex = 0; // Índice del slide actual
let autoplayInterval; // Referencia al intervalo de autoplay

/* ==================== FUNCIONES PRINCIPALES ==================== */

/**
 * Navega a un slide específico
 * @param {number} index - Índice del slide al que navegar
 * @description Desplaza el carrusel al slide seleccionado y actualiza la navegación
 */
function goToSlide(index) {
  const slide = slides[index];
  if (slide) {
    // Desplazamiento suave al slide
    cateList.scrollTo({
      left: slide.offsetLeft,
      behavior: 'smooth'
    });

    // Actualizar indicadores visuales
    dots.forEach(dot => dot.classList.remove('active-car'));
    dots[index].classList.add('active-car');
    currentIndex = index;
  }
}

/**
 * Inicia el autoplay del carrusel
 * @description Cambia automáticamente de slide cada 10 segundos
 */
function startAutoplay() {
  autoplayInterval = setInterval(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex);
  }, 10000); // 10 segundos
}

/**
 * Detiene el autoplay del carrusel
 * @description Limpia el intervalo de autoplay
 */
function stopAutoplay() {
  clearInterval(autoplayInterval);
}

/* ==================== EVENT LISTENERS ==================== */

// Navegación por puntos
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    stopAutoplay(); // Pausar autoplay al interacción manual
    const index = parseInt(dot.dataset.index);
    goToSlide(index);
    startAutoplay(); // Reanudar autoplay después de navegar
  });
});

// Detección de scroll manual
cateList.addEventListener('scroll', () => {
  const scrollX = cateList.scrollLeft;
  let closestIndex = 0;
  let closestDistance = Math.abs(scrollX - slides[0].offsetLeft);

  // Encontrar el slide más cercano al scroll actual
  slides.forEach((slide, i) => {
    const distance = Math.abs(scrollX - slide.offsetLeft);
    if (distance < closestDistance) {
      closestIndex = i;
      closestDistance = distance;
    }
  });

  // Actualizar UI si cambió el slide
  if (closestIndex !== currentIndex) {
    dots.forEach(dot => dot.classList.remove('active-car'));
    dots[closestIndex]?.classList.add('active-car');
    currentIndex = closestIndex;
  }
});

/* ==================== INICIALIZACIÓN ==================== */

// Configuración inicial al cargar la página
window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    // Forzar scroll al primer slide
    cateList.scrollTo({
      left: slides[0].offsetLeft,
      behavior: 'auto'
    });
    
    // Marcar primer punto como activo
    dots[0].classList.add('active-car');
    currentIndex = 0;
    
    // Iniciar autoplay
    startAutoplay();
  });

  // Debug: mostrar posiciones de los slides (opcional)
  slides.forEach((slide, i) => {
    console.log(`Slide ${i} offsetLeft:`, slide.offsetLeft);
  });
});