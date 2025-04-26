/* ==================== VARIABLES ==================== */
// Obtiene todos los elementos del menú mágico
const mlist = document.querySelectorAll('.magic-item');

/* ==================== FUNCIÓN PRINCIPAL ==================== */
/**
 * Maneja la activación de los items del menú
 * @function activeLink
 * @description Remueve la clase 'active-s' de todos los items y la agrega al item clickeado
 */
function activeLink() {
    // Remueve la clase activa de todos los items
    mlist.forEach((item) => item.classList.remove('active-s'));
    
    // Agrega la clase activa al item clickeado (this)
    this.classList.add('active-s');
}

/* ==================== EVENT LISTENERS ==================== */
// Agrega el event listener a cada item del menú
mlist.forEach((item) => {
    item.addEventListener('click', activeLink);
});