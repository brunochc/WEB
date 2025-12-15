// permite guardar clave valor
// diferencia entre objetos y arrays
// un array es una lista ordenada de elementos, mientras que un objeto es una colección de propiedades con clave y valor

// Ejemplo de uso de un array en JavaScript
/*console.log(frutas);

// .indexOf() busca un elemento y devuelve su índice
const indice = frutas.indexOf("platano");
if (indice !== -1) {
    console.log(`El índice de "platano" es: ${indice}`);
} else {
    console.log("El elemento no se encuentra en el array.");
}
*/
//llaves y corchetes

let persona = {
nombre: "Juan",
edad: 30,
ocupacion: "Ingeniero"

}
console.log(persona.nombre); // Acceso a la propiedad 'nombre'

//modificar o agrregar un atributo del objeto
persona.edad = 31; // Modificar la edad
persona.pais = "España"; // Agregar una nueva propiedad

console.log(persona);

//agregar un nuevo atributo al objeto
persona.telefono = "123-456-7890"; // Agregar un nuevo atributo

// Eliminar un atributo del objeto
delete persona.ocupacion; // Eliminar la propiedad 'ocupacion'

console.log(persona);
 
//recorrer un objeto con for



// console.log(Object.keys(persona)); // Muestra las claves del objeto nombre, edad, pais, telefono
// console.log(Object.values(persona)); // Muestra los valores del objeto juan, 31, España, 123-456-7890
// console.log(Object.entries(persona)); // Muestra las entradas (clave-valor) del objeto nombre-juan, edad-31, pais-España, telefono-123-456-789

// objetos anidados

let usuario = {
    nombre: "Ana",
    edad: 25,
    direccion: {
        calle: "Calle Falsa",
        numero: 123,
        ciudad: "Ciudad Ejemplo"
    },
    hobbies: ["leer", "viajar", "cocinar"]
};

console.log(usuario.direccion.ciudad); // Acceso a una propiedad anidada
console.log(usuario.hobbies[1]); // Acceso a un elemento del array dentro del objeto

