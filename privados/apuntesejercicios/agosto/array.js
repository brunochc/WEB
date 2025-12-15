//  array ejemplo javascript

const prompt = require('prompt-sync')();

let frutas = ["manzana", "pera", "platano", "uva"];

// Imprimir el array
console.log(frutas);

// .push() agrega un elemento al final del array
frutas.push("naranja");
console.log(frutas);

// .pop() elimina el último elemento del array
frutas.pop();
console.log(frutas);

// .shift() elimina el primer elemento del array
frutas.shift();
console.log(frutas);

// .unshift() agrega un elemento al inicio del array
frutas.unshift("kiwi");
console.log(frutas);

// .indexOf() busca un elemento y devuelve su índice
const indice = frutas.indexOf("platano");
if (indice !== -1) {
    console.log(`El índice de "platano" es: ${indice}`);
} else {
    console.log("El elemento no se encuentra en el array.");
}
// .includes() verifica si un elemento está en el array
if (frutas.includes("pera")) {
    console.log("El array contiene 'pera'.");
} else {
    console.log("El array no contiene 'pera'.");
}
// .map() crea un nuevo array con los resultados de aplicar una función a cada elemento
const frutasMayusculas = frutas.map(fruta => fruta.toUpperCase());
console.log(frutasMayusculas);

// .filter() crea un nuevo array con los elementos que cumplen una condición
const frutasConA = frutas.filter(fruta => fruta.includes("a"));
console.log(frutasConA);

// .forEach() ejecuta una función para cada elemento del array
frutas.forEach(fruta => console.log(`Fruta: ${fruta}`));

// .join() une los elementos del array en una cadena de texto
const frutasCadena = frutas.join(", ");
console.log(`Frutas: ${frutasCadena}`);
// .slice() devuelve una copia de una parte del array   
const frutasCortadas = frutas.slice(1, 3);      

// .length devuelve la cantidad de elementos en el array
console.log(`El array tiene ${frutas.length} elementos.`);


let numeros = [1, 2, 3, 4, 5];
let cuadrados = [];

for (let i = onabort; i < numeros.length; i++) {
    cuadrados.push(numeros[i] ** 2);
}

console.log(`Los cuadrados de los números son: ${cuadrados}`);

// Ejemplo de uso de un array en un algoritmo de notas














