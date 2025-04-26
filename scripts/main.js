// ==================== CARGA DEL HEADER ====================
// Carga e integra el componente header.html y configura sus interacciones
fetch("components/header.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("header").innerHTML = html;

    // Elementos del menú móvil
    const nav = document.querySelector("#nav");
    const o_menu = document.querySelector("#o-menu");
    const c_menu = document.querySelector("#c-menu");
    const magicNav = document.querySelector("#magic-nav");

    // Evento para abrir el menú móvil
    o_menu.addEventListener("click", () => {
      document.documentElement.style.overflow = 'hidden';
      nav.classList.add("visible");
      if (magicNav) magicNav.classList.add("hidden"); // Oculta magic nav al abrir menú
    });
    
    // Evento para cerrar el menú móvil
    c_menu.addEventListener("click", () => {
      document.documentElement.style.overflow = '';
      nav.classList.remove("visible");
      if (magicNav) magicNav.classList.remove("hidden"); // Muestra magic nav al cerrar
    });
  });

// ==================== CARGA DE CATEGORÍAS ====================
// Carga e integra el componente categories.html y su script asociado
fetch("components/categories.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("categorias").innerHTML = html;

    // Carga dinámica del script del carrusel de categorías
    const script = document.createElement("script");
    script.src = "scripts/categories-carrusel.js";
    document.body.appendChild(script);
  });

// ==================== CARGA DE DESTACADOS ====================
// Carga e integra el componente destacados.html y su script de API
fetch("components/destacados.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("destacados").innerHTML = html;

    // Carga dinámica del script que maneja los productos destacados
    const script = document.createElement("script");
    script.src = "scripts/api.js";
    document.body.appendChild(script);
  });

// ==================== CARGA DEL FOOTER ====================
// Carga e integra el componente footer.html
fetch("components/footer.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("footer").innerHTML = html;
  });

// ==================== CARGA DEL MAGIC NAV ====================
// Carga e integra el componente magic_nav.html y su funcionalidad
fetch("components/magic_nav.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("magic-nav").innerHTML = html;

    // Carga dinámica del script que maneja la navegación mágica
    const script = document.createElement("script");
    script.src = "scripts/magic-function.js";
    document.body.appendChild(script);
  });