/*Preguntas de código
🧠 Lógica de Programación / Arrays / Funciones
1. Eliminar elementos desde el final
 Declara un arreglo llamado frutas con los siguientes elementos: "manzana", "banana", "naranja", "pera", "sandía". Usa un bucle while para eliminar todos los elementos del arreglo uno por uno desde el final, mostrando el arreglo después de cada eliminación.*/

let frutas = ["manzana","banana", "pera","sandia","naranja"]
    while (frutas.length > 0) {
        frutas.pop()
        console.log(frutas)
    }

/*2. Agregar productos a un carrito
 Declara un arreglo vacío llamado compras y un arreglo productos con al menos 5 productos. Usa un bucle for para agregar los productos al arreglo compras uno por uno. Muestra el arreglo después de cada inserción.*/

let compras = []
let productos = ["leche","harina","queso","carne","cerveza"]

for (let i = 0; i < productos.length; i++) {
    compras.push(productos[i])
    console.log(compras)
}


/*3. Contar vocales en una cadena
 Escribe una función que cuente cuántas vocales (a, e, i, o, u) hay en una cadena de texto dada como parámetro.*/

 let vocales = "aeiou"
 let texto = "hola mundo"
 let contador = 0

 for (let i = 0; i < texto.length; i++) {
    if (vocales.includes(texto[i])) {
        contador++
    }
 }
 console.log(contador)
/*4. Duplicar números con map()
 Crea un arreglo de números. Usa el método .map() para crear un nuevo arreglo donde cada número sea el doble del original. Muestra ambos arreglos en la consola.*/

let numeros = [1,2,3,4,5]
let dobles = numeros.map(num => num * 2)
console.log(numeros)
console.log(dobles)

/*5. Obtener el sucesor de cada número
 Dado un arreglo números, usa .map() para crear un nuevo arreglo donde cada número sea su sucesor (n+1).*/

let numeros2 = [1,2,3,4,5]
let sucesores = numeros2.map(num => num + 1)
console.log(numeros2)
console.log(sucesores)

/*6. Calcular el factorial de un número
 Escribe una función que reciba un número como parámetro y calcule su factorial (el producto de todos los enteros desde 1 hasta ese número).*/

function factorial(num){
    let resultado = 1
    for (let i = 1; i <= num; i++) {
        resultado *= i
    }
    return resultado
}
const prompt = require('prompt-sync')({sigint:true});
let numero = prompt("Ingrese un numero")
console.log(factorial(numero))


// 1*2*3*4*5 = 


