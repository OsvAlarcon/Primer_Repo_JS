/**
 * objetivos del proyecto
 * Estructura HTML
 * Funciones
 * Objetos
 * Arrays
 * Algún metodo superior
 */

// Clase Molde para los Items del juego
class Item {
  constructor(nombre, precio, imagen) {
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
  }
}
const pocion = new Item("Pocion Multijugos", 80, "pocion.png");
const varita = new Item("Varita", 180, "varita.png");
const encantamientos = new Item("Encantamientos", 90, "encantamientos.png");

//
const inventario = [];

//
let pound = 500;
const elPound = document.querySelector("#pound span ");
elPound.innerText = pound;
const elInventario = document.getElementById("inventario");

//
function comprar(item) {
  if (pound - item.precio >= 0) {
    inventario.push(item);
    pound = pound - item.precio;
    console.log("Inventario:", inventario);
    console.log("Pound:", pound);
    actualizarHTML();
  } else {
    alert(
      `Insuficientes Pounds mágicos para seguir comprando ${item.nombre}. `
    );
  }
}
function vender(nombreDelItem) {
  const itemEncontrado = inventario.find(
    (item) => item.nombre == nombreDelItem
  );
  if (itemEncontrado) {
    pound += itemEncontrado.precio;
    inventario.splice(inventario.indexOf(itemEncontrado), 1);

    actualizarHTML();
  }
}

function actualizarHTML() {
  elPound.innerText = pound;
  elInventario.innerHTML = "";
  for (const item of inventario) {
    const indice = inventario.indexOf(item);
    const li = `<li onclick="vender('${item.nombre}')">
    <img src="" alt="${item.imagen}" /></li>`;
    elInventario.innerHTML += li;
  }
}
