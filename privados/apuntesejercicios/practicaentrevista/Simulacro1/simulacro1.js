/*Entrevistador 1
FASE 1

Pregunta: ¿Cuál es la diferencia entre Git y Github?¿Cómo clonas un repositorio?
Respuesta: Git es un sistema de control de versiones local, GitHub es una plataforma para alojar repositorios Git en la nube. Se clona con git clone <url-repositorio>

Pregunta: ¿Qué son los métodos de un array?¿Conoces algún método?
Respuesta: Son funciones integradas para manipular arrays. Ejemplos: push(), pop(), map(), filter(), forEach()

Pregunta: ¿Qué es JavaScript?
Respuesta: Lenguaje de programación interpretado para desarrollo web, permite crear contenido interactivo en páginas web.

Pregunta: ¿Qué es un objeto en JavaScript y cómo se crea uno?
Respuesta: Estructura de datos que almacena pares clave-valor. Se crea con const obj = {} o const obj = new Object()

Pregunta: ¿Cómo seleccionar un elemento del DOM en JavaScript?
Respuesta: Con document.getElementById(), document.querySelector(), document.getElementsByClassName() */

//comando ejecutar: node simulacro1.js

const frutas = ["manzana", "banana", "naranja", "pera", "sandía"];

while (frutas.length > 0) {
    frutas.pop();
    console.log(frutas);
}

/*FASE 1

Pregunta: ¿Qué es o cuál es la diferencia entre null y undefined en JavaScript?
Respuesta: null es un valor asignado intencionalmente que representa "vacío", undefined significa que una variable fue declarada pero no tiene valor asignado.

Pregunta: ¿Cómo se accede a los elementos de un array?
Respuesta: Mediante índice numérico: array[0] para el primer elemento.

Pregunta: ¿Cómo accedes a una propiedad de un objeto en JavaScript?
Respuesta: Con notación de punto objeto.propiedad o corchetes objeto['propiedad']

Pregunta: ¿Qué es HTML y CSS?
Respuesta: HTML define la estructura de una página web, CSS controla el estilo y presentación.

Pregunta: ¿Qué es el DOM en JavaScript?
Respuesta: Document Object Model - representación en árbol de la estructura HTML que permite manipular contenido y estilo mediante JavaScript.*/

//comando ejecutar: node simulacro1.js


const compras = [];
const productos = ["leche", "pan", "huevos", "arroz", "azúcar"];

for (let i = 0; i < 5; i++) {
    compras.push(productos[i]);
    console.log(compras);
}