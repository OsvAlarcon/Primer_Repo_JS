function suma(valor1, valor2) {
  const resultado = valor1 + valor2;
  return resultado;
}

function restar(valor1, valor2) {
  const resultado = valor1 - valor2;
  return resultado;
}

function multiplicar(valor1, valor2) {
  const resultado = valor1 * valor2;
  return resultado;
}

function dividir(valor1, valor2) {
  const resultado = valor1 / valor2;
  return resultado;
}

// Paso 1: Que nos pida por prompt los dos valores que queremos calcular
// Paso 2 : Elegir por prompt la operacion a realizar ( sumar , restar , multiplicar , dividir)

function calculadora() {
  const valor1 = prompt("Ingrese el primer valor:");
  const valor2 = prompt("Ingrese el segundo valor:");
  const operacion = prompt("¿Que operacion queres hacer? (+ - * / )");

  let resultado;

  switch (operacion) {
    case "+":
      resultado = valor1 + valor2;
      alert("El resultado de la operacion es " + suma);
      break;
    case "-":
      alert("El resultado de la operacion es" + restar(valor1, valor2));
      break;

    default:
      alert("La operacion ingresada es invalida");
  }
}
