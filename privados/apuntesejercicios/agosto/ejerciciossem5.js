let colores = ["rojo", "Azul", "verde"];
    colores.forEach(color => console.log(color));
        
let numeros = [1, 2, 3 , 4 ];
let multiplicacion = numeros.map(num => num * 3);
console.log(multiplicacion)

let numeros2 =[5, 12, 8, 130, 44];
let mayorque10 = numeros2.filter(num => num > 10);
console.log(mayorque10)

let nombres = ["ana", "pedro", "Juan"]
let nombremayor = nombres.find(nombre => nombre.length > 4);
console.log(nombremayor)

let numeros3 = [2, 3, 4 ];
let verificar = numeros3.includes(3);
console.log(verificar); 

let animales = ["perro", "gato"];
animales.push("conejo")
console.log(animales)

animales.pop();
console.log(animales);

//Tienes ["perro", "gato", "conejo"]. Elimina el primer elemento.
let animales2 = ["perro", "gato", "conejo"]; 
animales2.shift();
console.log(animales2);

//Tienes ["perro", "gato"]. Agrega "loro" al inicio.

let animales3 =["perro", "gato"];
animales3.unshift("loro");
console.log(animales3);

//Tienes ["a", "b", "c", "d"]. Encuentra la posición de "c".
let letras = ["a", "b","c", "d" ]
let posicion = letras.indexOf("c");
console.log(posicion);

let persona = {
    nombre: "juan perez",
    edad: 26,
    ciudad: "santiago"
}
