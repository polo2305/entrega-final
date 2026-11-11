function renderizarProductos(productos, contenedor, callbackAgregar) {
  contenedor.innerHTML = "";
  
  if (productos.length === 0) {
    contenedor.innerHTML = `<div class="col-12 text-center py-5"><p class="fs-4 text-muted">No se encontraron productos.</p></div>`;
    return;
  }

  productos.forEach((producto) => {
    const { id, nombre, precio, imagen, categoria } = producto;

    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-4";
    col.innerHTML = `
      <div class="card bg-secondary text-light h-100 border-0 shadow-sm">
        <img src="${imagen}" class="card-img-top" alt="${nombre}">
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <span class="badge bg-warning text-dark mb-2 text-uppercase">${categoria}</span>
            <h5 class="card-title fw-bold">${nombre}</h5>
            <p class="card-text fs-4 fw-bold text-warning">$${precio.toLocaleString("es-AR")}</p>
          </div>
          <button class="btn btn-outline-warning w-100 fw-bold btn-agregar" data-id="${id}">
             Agregar al Carrito
          </button>
        </div>
      </div>
    `;

    const btnAgregar = col.querySelector(".btn-agregar");
    btnAgregar.addEventListener("click", () => callbackAgregar(id));

    contenedor.appendChild(col);
  });
}

function renderizarCarrito(carrito, contenedor, callbackModificar, callbackEliminar) {
  contenedor.innerHTML = "";

  // Operador Ternario para plantilla de carrito vacío
  if (carrito.length === 0) {
    contenedor.innerHTML = `<p class="text-center text-muted my-5">El carrito está vacío.</p>`;
    return;
  }

  carrito.forEach((item) => {
    const { id, nombre, precio, cantidad, imagen } = item;
    const subtotal = precio * cantidad;

    const div = document.createElement("div");
    div.className = "card bg-dark text-light mb-3 p-2 border-0 shadow-sm";
    div.innerHTML = `
      <div class="d-flex align-items-center gap-3">
        <img src="${imagen}" alt="${nombre}" class="item-carrito-img">
        <div class="flex-grow-1">
          <h6 class="mb-0 text-truncate" style="max-width: 150px;">${nombre}</h6>
          <small class="text-warning fw-bold">$${subtotal.toLocaleString("es-AR")}</small>
        </div>
        <div class="d-flex align-items-center gap-1">
          <button class="btn btn-sm btn-outline-secondary btn-restar">-</button>
          <span class="px-2 fw-bold">${cantidad}</span>
          <button class="btn btn-sm btn-outline-secondary btn-sumar">+</button>
        </div>
        <button class="btn btn-sm btn-outline-danger btn-eliminar">🗑️</button>
      </div>
    `;

    div.querySelector(".btn-restar").addEventListener("click", () => callbackModificar(id, -1));
    div.querySelector(".btn-sumar").addEventListener("click", () => callbackModificar(id, 1));
    div.querySelector(".btn-eliminar").addEventListener("click", () => callbackEliminar(id));

    contenedor.appendChild(div);
  });
}

function mostrarNotificacion(mensaje) {
  Toastify({
    text: mensaje,
    duration: 2500,
    gravity: "bottom",
    position: "right",
    style: {
      background: "#ffc107",
      color: "#000000",
      fontWeight: "bold",
      borderRadius: "8px"
    }
  }).showToast();
}