// Obtiene referencias a los elementos del DOM
const magicNav = document.getElementById("magic-nav");  // Barra de navegación mágica (flotante)
const footer = document.getElementById("footer");       // Pie de página

// Verifica que ambos elementos existan antes de configurar el observador
if (footer && magicNav) {
    /**
     * Crea un IntersectionObserver para detectar cuando el footer entra/sale del viewport
     * @param {IntersectionObserverEntry[]} entries - Lista de entradas observadas
     */
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // Cuando el footer es visible (intersecta con el viewport)
            if (entry.isIntersecting) {
                magicNav.style.display = "none";  // Oculta la barra de navegación
            } else {
                magicNav.style.display = "flex";  // Muestra la barra de navegación
            }
        });
    }, {
        root: null,       // Observa respecto al viewport del navegador
        threshold: 0.1    // Dispara el callback cuando el 10% del elemento es visible
    });

    // Comienza a observar el elemento footer
    observer.observe(footer);
}