// Clase "molde" para los productos de nuestra aplicación
class Producto {
  constructor(id, nombre, precio, categoria, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.imagen = imagen;
  }
}

// Simulacion de la base de datos del e-commerce, acá van a estar todos las marcas disponibles
class BaseDeDatos {
  constructor() {
    // Array para el catálogo
    this.productos = [];
    //Carga de las motos
    this.agregarRegistro(1, "Honda", 9000, "Motos", "honda.jpg");
    this.agregarRegistro(2, "Yamaha", 8000, "Motos", "yamaha.jpg");
    this.agregarRegistro(3, "Bajaj", 4000, "Motos", "bajaj.jpg");
    this.agregarRegistro(4, "Zanella", 2000, "Motos", "zanella.jpg");
    this.agregarRegistro(5, "Benelli", 5000, "Motos", "benelli.jpg");
  }

  // Aca pongo el método que crea el objeto producto y lo almacena en el catálogo
  agregarRegistro(id, nombre, precio, categoria, imagen) {
    const producto = new Producto(id, nombre, precio, categoria, imagen);
    this.productos.push(producto);
  }

  // Devolucion de todo el catálogo de motos
  traerRegistros() {
    return this.productos;
  }

  // Devolucion un producto según el ID
  registroPorId(id) {
    return this.productos.find((producto) => producto.id === id);
  }

  // El array con todas las coincidencias que encuentre segun la marca con la palabra que se indique segun el parámetro
  registrosPorNombre(palabra) {
    return this.productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(palabra.toLowerCase())
    );
  }
}

// Clase carrito  -->para manipular los productos de nuestro carrito<--
class Carrito {
  constructor() {
    // Storage
    const carritoStorage = JSON.parse(localStorage.getItem("carrito"));

    // Array donde van a estar almacenados todos los modelos del carrito
    this.carrito = carritoStorage || [];
    this.total = 0;
    this.cantidadProductos = 0;
    this.listar();
  }

  // -->Como  saber si el producto ya se encuentra en el carrito<---
  estaEnCarrito({ id }) {
    return this.carrito.find((producto) => producto.id === id);
  }

  // Sumar el producto (motos) al carrito
  agregar(producto) {
    const productoEnCarrito = this.estaEnCarrito(producto);

    // Si no se encuentra en el carrito, aca se activa el push y se lo agrego.
    // la propiedad ---> "cantidad"
    if (!productoEnCarrito) {
      this.carrito.push({ ...producto, cantidad: 1 });
    } else {
      // De lo contrario, si ya está en el carrito, le sumo en 1 la cantidad
      productoEnCarrito.cantidad++;
    }
    // Actualizacion en la parte del storage
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
    // Mostrar los productos en el HTML
    this.listar();
  }

  // Sacar del carrito
  quitar(id) {
    // --->método splice requiere el índice<---
    const indice = this.carrito.findIndex((producto) => producto.id === id);
    // Si la cantidad es mayor a 1, le resto la cantidad en 1
    if (this.carrito[indice].cantidad > 1) {
      this.carrito[indice].cantidad--;
    } else {
      // Si no se da esta situacion, se borra del carrito el producto a sacar.
      this.carrito.splice(indice, 1);
    }
    // Actualizacion el storage
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
    // Muestro los productos en el HTML
    this.listar();
  }

  // Renderizacion de todos los productos en el HTML
  listar() {
    this.total = 0;
    this.cantidadProductos = 0;
    divCarrito.innerHTML = "";
    // Verificacion de todos los productos (motos)que están disponibles y los aclaro en el HTML
    for (const producto of this.carrito) {
      divCarrito.innerHTML += `
          <div class="productoCarrito">
            <h2>${producto.nombre}</h2>
            <p>$${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <a href="#" class="btnQuitar" data-id="${producto.id}">Quitar del carrito</a>
          </div>
        `;
      // Actualizacion total
      this.total += producto.precio * producto.cantidad;
      this.cantidadProductos += producto.cantidad;
    }
    // Como no se cuantos productos tengo en el carrito, tengo que asignarle los eventos de forma dinámica a cada uno
    // Realizo la lista de todos los botones con .querySelectorAll
    const botonesQuitar = document.querySelectorAll(".btnQuitar");
    // Recorro cada uno y les asigno un evento
    for (const boton of botonesQuitar) {
      boton.addEventListener("click", (event) => {
        event.preventDefault();
        //  Id Obtenido
        const idProducto = Number(boton.dataset.id);
        // Llamo al método quitar pasándole el ID del producto
        this.quitar(idProducto);
      });
    }
    // Actualizacion de los contadores del HTML
    spanCantidadProductos.innerText = this.cantidadProductos;
    spanTotalCarrito.innerText = this.total;
  }
}

// ---> base de datos<--
const bd = new BaseDeDatos();

// Elementos
const spanCantidadProductos = document.querySelector("#cantidadProductos");
const spanTotalCarrito = document.querySelector("#totalCarrito");
const divProductos = document.querySelector("#productos");
const divCarrito = document.querySelector("#carrito");
const inputBuscar = document.querySelector("#inputBuscar");
const botonCarrito = document.querySelector("section h1");

//  -->clase Carrito<--
const carrito = new Carrito();

// El catálogo de la base de datos apenas carga la página se muestra de esta manera-->
cargarProductos(bd.traerRegistros());

// Función para mostrar para renderizar productos del buscador
function cargarProductos(productos) {
  // Reset del div
  divProductos.innerHTML = "";
  // Recorrida por cada uno de los productos y se muestra en el HTML
  for (const producto of productos) {
    divProductos.innerHTML += `
        <div class="producto">
          <h2>${producto.nombre}</h2>
          <p class="precio">$${producto.precio}</p>
          <div class="imagen">
            <img src="img/${producto.imagen}" />
          </div>
          <a href="#" class="btnAgregar" data-id="${producto.id}">Agregar al carrito</a>
        </div>
      `;
  }

  // Lista con todos los botones que haya en disponible en el catálogo
  const botonesAgregar = document.querySelectorAll(".btnAgregar");

  // Recorrer de  botón por botón cada producto que hay en el  catálogo y lo suma
  // el evento click a cada uno
  for (const boton of botonesAgregar) {
    boton.addEventListener("click", (event) => {
      // Evitar el comportamiento default de HTML
      event.preventDefault();
      // Aca se guarda el dataset ID que está en el HTML del botón --->Agregar al carrito<--
      const idProducto = Number(boton.dataset.id);
      // Acá se usa el método de la base de datos para ubicar el producto según el ID
      const producto = bd.registroPorId(idProducto);
      // Llamar al método agregar del carrito
      carrito.agregar(producto);
    });
  }
}

// Buscador disponible
inputBuscar.addEventListener("input", (event) => {
  event.preventDefault();
  const palabra = inputBuscar.value;
  const productos = bd.registrosPorNombre(palabra);
  cargarProductos(productos);
});

// Ocultar/mostrar el carrito
botonCarrito.addEventListener("click", (event) => {
  document.querySelector("section").classList.toggle("ocultar");
});
