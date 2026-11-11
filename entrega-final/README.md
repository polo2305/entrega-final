# entrega-final

# GameStore - Simulador E-Commerce Interactivo

Proyecto final desarrollado en JavaScript Vanilla integrando manipulación dinámica del DOM, peticiones asíncronas, almacenamiento persistente en el navegador y consumo de librerías externas.

##  Funcionalidades

- **Catálogo dinámico:** Carga de productos desde un archivo `.json` simulando una API REST mediante `fetch` con `async/await`.
- **Filtro y búsqueda:** Búsqueda en tiempo real por texto y filtrado por categoría utilizando Funciones de Orden Superior (`filter`).
- **Carrito de compra interactivo:** Agregar, sumar, restar, eliminar productos y vaciar el carrito.
- **Cálculo de totales:** Cálculo automático de unidades y montos acumulados mediante la función de orden superior `reduce`.
- **Persistencia de datos:** Los datos del carrito se guardan y mantienen en `localStorage`.
- **Interfaz y Notificaciones:** Feedback visual mediante librerías de JS externas (**SweetAlert2** y **Toastify JS**).

## Tecnologías empleadas

- HTML5
- CSS3 & Bootstrap 5
- JavaScript ES6+
- SweetAlert2 & Toastify JS

## Instrucciones para ejecutar

1. Clonar el repositorio.
2. Abrir `index.html` en tu navegador o mediante la extensión **Live Server** de VS Code.