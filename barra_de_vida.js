// Simulador de barras de vida de los personajes de Harry Potter

//Variables generales
const nombre = "Harry Potter";
let vida = 5;
const vidaMaxima = 100;

// Se sumará la vida segun el parámetro cantidad (Siempre y cuando la suma sea menor que la vida máxima)
function sumarVida(cantidad) {
  if (vida < vidaMaxima) {
    vida = vida + cantidad;
  }
  console.log(nombre + ":" + barra());
}

// Se restará la cantidad de vida (Siempre y cuando la vida sea mayor a cero 0)
// La vida nunca tiene que ser menor a 0

function restarVida(cantidad) {
  if (vida > 0) {
    vida = vida - cantidad;
  }
  // Piso de Vida GAME OVER

  if (vida < 0) {
    vida = 0;
  }
  console.log(nombre + ":" + barra());
}

// Se generará una barra de vida, segun la cantidad total que tenga.
// | será la vida
// - será el daño recibido
/*
Harry Potter ||||| ---> 50%
             |||||||||| 100%
             || -----> 20 % 
  */

function barra() {
  let barra = "";
  for (let i = 0; i < vida; i++) {
    barra = barra + "|";
  }

  // Se generarán las barritas horizontales (-) segun la cantidad de daño que tenga el personaje

  let danio = vidaMaxima - vida;
  for (let i = 0; i < danio; i++) {
    barra = barra + "-";
  }
  return barra;
}
