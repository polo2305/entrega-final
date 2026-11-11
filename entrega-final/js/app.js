let productosBase = [];
let carrito = JSON.parse(localStorage.getItem("carrito_gamestore")) || [];

const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("contenedor-carrito");
const spinnerCarga = document.getElementById("loading-spinner");
const badgeContador = document.getElementById("badge-contador");
const precioTotalElemento = document.getElementById("precio-total");
const inputBusqueda = document.getElementById("input-busqueda");
const selectCategoria = document.getElementById("select-categoria");
const btnVaciar = document.getElementById("btn-vaciar-carrito");
const btnConfirmar = document.getElementById("btn-confirmar-compra");

async function obtenerProductos() {
  try {
    const respuesta = await fetch("./assets/data/productos.json");
    if (!respuesta.ok) throw new Error("No se pudo cargar el archivo de productos.");
    
    productosBase = await respuesta.json();
    actualizarVistaProductos();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error de carga",
      text: "Ocurrió un inconveniente al cargar el catálogo de productos.",
      confirmButtonColor: "#ffc107"
    });
  } finally {
    spinnerCarga.style.display = "none";
  }
}

function actualizarVistaProductos() {
  const terminoBusqueda = inputBusqueda.value.toLowerCase().trim();
  const categoriaSeleccionada = selectCategoria.value;

  const productosFiltrados = productosBase.filter((producto) => {
    const coincideNombre = producto.nombre.toLowerCase().includes(terminoBusqueda);
    const coincideCategoria = categoriaSeleccionada === "todos" || producto.categoria === categoriaSeleccionada;
    return coincideNombre && coincideCategoria;
  });

  renderizarProductos(productosFiltrados, contenedorProductos, agregarAlCarrito);
}

function agregarAlCarrito(idProducto) {
  // HOF find() para obtener producto o item existente
  const productoEncontrado = productosBase.find((p) => p.id === idProducto);
  const itemEnCarrito = carrito.find((item) => item.id === idProducto);

  if (itemEnCarrito) {
    itemEnCarrito.cantidad++;
  } else {
    carrito.push({ ...productoEncontrado, cantidad: 1 });
  }

  guardarYActualizarCarrito();
  mostrarNotificacion(`¡${productoEncontrado.nombre} agregado al carrito!`);
}

function modificarCantidad(idProducto, cambio) {
  const itemEnCarrito = carrito.find((item) => item.id === idProducto);
  if (!itemEnCarrito) return;

  itemEnCarrito.cantidad += cambio;

  // Si la cantidad llega a 0 se descarta del carrito
  if (itemEnCarrito.cantidad <= 0) {
    eliminarDelCarrito(idProducto);
    return;
  }

  guardarYActualizarCarrito();
}

function eliminarDelCarrito(idProducto) {
  // HOF filter() para remover un elemento por id
  carrito = carrito.filter((item) => item.id !== idProducto);
  guardarYActualizarCarrito();
  mostrarNotificacion("Producto eliminado del carrito.");
}

function vaciarCarrito() {
  if (carrito.length === 0) return;

  Swal.fire({
    title: "¿Vaciar el carrito?",
    text: "Esta acción eliminará todos los elementos seleccionados.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc3545",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Sí, vaciar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      carrito = [];
      guardarYActualizarCarrito();
      Swal.fire("¡Carrito Vacío!", "Se han eliminado los productos.", "success");
    }
  });
}

function finalizarCompra() {
  if (carrito.length === 0) {
    Swal.fire({
      icon: "info",
      title: "Carrito vacío",
      text: "Agrega productos antes de finalizar la compra.",
      confirmButtonColor: "#ffc107"
    });
    return;
  }

  const totalPagado = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);

  Swal.fire({
    title: "¡Gracias por tu compra!",
    html: `<p>Tu pedido fue procesado exitosamente.</p><strong>Total pagado: $${totalPagado.toLocaleString("es-AR")}</strong>`,
    icon: "success",
    confirmButtonColor: "#ffc107"
  }).then(() => {
    carrito = [];
    guardarYActualizarCarrito();
  });
}

function guardarYActualizarCarrito() {
  localStorage.setItem("carrito_gamestore", JSON.stringify(carrito));
  
  const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  badgeContador.textContent = totalUnidades;

  const totalDinero = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  precioTotalElemento.textContent = `$${totalDinero.toLocaleString("es-AR")}`;

  renderizarCarrito(carrito, contenedorCarrito, modificarCantidad, eliminarDelCarrito);
}

function inicializarEventos() {
  inputBusqueda.addEventListener("input", actualizarVistaProductos);
  selectCategoria.addEventListener("change", actualizarVistaProductos);
  btnVaciar.addEventListener("click", vaciarCarrito);
  btnConfirmar.addEventListener("click", finalizarCompra);
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarEventos();
  guardarYActualizarCarrito();
  obtenerProductos();
});