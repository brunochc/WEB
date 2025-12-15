//Cálculo del promedio y evaluación
//Escribe un programa que permita al usuario ingresar números (notas) hasta que escriba la palabra "fin". El programa debe calcular el promedio de las notas ingresadas. Usa un bucle while para obtener las notas y una condicional para determinar si el promedio indica que el usuario aprobó o reprobó.
//
//Condiciones:
//Si el promedio es mayor o igual a 4.0, el usuario aprueba.
//Si es menor a 4.0, el usuario reprueba.
//Ejemplo:
//
//Entrada: 5, 3, 4, fin
//
//Salida:
//El promedio es: 4.0
//¡Aprobaste!
//
//Entrada: 2, 3, fin
//
//Salida:
//El promedio es: 2.5
//Reprobaste.
//

/*// Pseudocódigo para el cálculo del promedio de notas
Algoritmo CalculoPromedioNotas
    // Inicializar variables

    sumaNotas = 0
    contadorNotas = 0
    entradaUsuario = ""
    
    // Solicitar notas hasta que se ingrese "fin"
    Mientras verdadero Hacer
        entradaUsuario = prompt("Ingresa una nota o escribe 'fin' para terminar:")
        
        Si entradaUsuario == "fin" Entonces
            Romper // Salir del bucle
        Fin Si
        
        // Convertir entrada a número y validar
        nota = convertirANumero(entradaUsuario)
        Si nota no es un número válido Entonces
            Mostrar "Por favor ingresa un número válido o 'fin'"
            Continuar // Volver al inicio del bucle
        Fin Si
        
        // Acumular nota y aumentar contador
        sumaNotas = sumaNotas + nota
        contadorNotas = contadorNotas + 1
    Fin Mientras
    
    // Calcular promedio si se ingresaron notas
    Si contadorNotas > 0 Entonces
        promedio = sumaNotas / contadorNotas
        
        // Mostrar resultado
        Mostrar "El promedio es: " + promedio
        
        // Evaluar aprobación
        Si promedio >= 4.0 Entonces
            Mostrar "¡Aprobaste!"
        Sino
            Mostrar "Reprobaste."
        Fin Si
    Sino
        Mostrar "No se ingresaron notas."
    Fin Si
Fin Algoritmo

*/
// Importar prompt-sync
const prompt = require('prompt-sync')();

// Inicializar variables
let sumaNotas = 0;
let contadorNotas = 0;

// Bucle para ingresar notas
while (true) {
    const entradaUsuario = prompt("Ingresa una nota o escribe 'fin' para terminar: ");
    
    if (entradaUsuario.toLowerCase() === 'fin') {
        break;
    }
    
    // Convertir entrada a número y validar
    const nota = parseFloat(entradaUsuario);
    if (isNaN(nota)) {
        console.log("Por favor ingresa un número válido o 'fin'"); // Cambiado alert por console.log
        continue;
    }
    
    // Acumular nota y aumentar contador
    sumaNotas += nota;
    contadorNotas++;
}

// Calcular promedio si se ingresaron notas
if (contadorNotas > 0) {
    const promedio = sumaNotas / contadorNotas;
    
    // Mostrar resultado
    console.log(`El promedio es: ${promedio.toFixed(1)}`);
    
    // Evaluar aprobación
    if (promedio >= 4.0) {
        console.log("¡Aprobaste!");
    } else {
        console.log("Reprobaste.");
    }
} else {
    console.log("No se ingresaron notas.");
}


//Array

// aqui tienes un ejemplo de cómo crear un array en JavaScript
let frutas = ["manzana", "pera", "platano", "uva"];

const numeros = [1,2,3,4,5]
console.log(numeros)

numeros = []