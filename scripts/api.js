/* ==================== FUNCIÓN PRINCIPAL ==================== */
/**
 * Función asíncrona para cargar y mostrar productos desde la API
 * @async
 * @function cargarProductos
 * @description Obtiene productos de la API, los filtra y renderiza en la página
 */
async function cargarProductos() {
    try {
        // ============ PETICIÓN A LA API ============
        /* Realiza la solicitud fetch a la API y convierte la respuesta a JSON */
        const response = await fetch('http://markeafoods.com/api/get-kalan-products');
        const result = await response.json();

        // ============ CONFIGURACIÓN INICIAL ============
        /* Obtiene el contenedor donde se mostrarán los productos */
        const productosContainer = document.getElementById('productos');
        
        /* Almacena todos los productos en memoria para futuros filtrados */
        const productos = result.data;

        // ============ FUNCIÓN DE RENDERIZADO ============
        /**
         * Filtra y muestra los productos en el contenedor
         * @function renderizarProductos
         * @param {string} filtro - Tipo de filtro a aplicar ("Lo más vendido", "Lo nuevo", "Ofertas")
         * @description Filtra los productos según el criterio seleccionado y los muestra en el DOM
         */
        function renderizarProductos(filtro = "Lo más vendido") {
            // Limpia el contenedor antes de agregar nuevos productos
            productosContainer.innerHTML = "";

            // Filtra los productos según la selección
            let productosFiltrados = productos;

            if (filtro === "Lo más vendido") {
                productosFiltrados = productos.filter(producto => producto.tags.includes("Best Seller"));
            } else if (filtro === "Lo nuevo") {
                productosFiltrados = productos.filter(producto => producto.tags.includes("New in"));
            } else if (filtro === "Ofertas") {
                productosFiltrados = productos.filter(producto => producto.tags.includes("Offers"));
            }

            // Crea y agrega cada producto al contenedor
            productosFiltrados.forEach(producto => {
                const productoElement = document.createElement('div');
                productoElement.classList.add('producto-item');

                // Plantilla HTML para cada producto
                productoElement.innerHTML = `
                    <img src="${producto.image}" alt="${producto.name}" />
                    <p class="p-name">${producto.name}</p>
                    <div>
                        <p class="p-price">$${(Math.round(producto.price * 19.5)).toFixed(2)}</p> <!-- Convertido a pesos mexicanos -->
                        <p class="p-grams">${producto.grams}g</p>
                    </div>
                    <button class="add-btn">Add to cart</button>
                `;

                productosContainer.appendChild(productoElement);
            });
        }

        // ============ INICIALIZACIÓN ============
        /* Muestra los productos más vendidos por defecto al cargar la página */
        renderizarProductos();

        // ============ MANEJO DE FILTROS ============
        /* Configura los event listeners para los botones de filtrado */
        const botones = document.querySelectorAll('.colec-btn button');
        botones.forEach(boton => {
            boton.addEventListener('click', () => {
                // Remueve la clase 'selected-op' de todos los botones
                botones.forEach(b => b.classList.remove('selected-op'));
                
                // Agrega la clase 'selected-op' al botón clickeado
                boton.classList.add('selected-op');
                
                // Vuelve a renderizar los productos con el nuevo filtro
                renderizarProductos(boton.textContent);
            });
        });

    } catch (error) {
        // ============ MANEJO DE ERRORES ============
        console.error('Error al cargar productos:', error);
    }
}

// ==================== EJECUCIÓN INICIAL ====================
/* Llama a la función principal para cargar los productos cuando el script se ejecuta */
cargarProductos();