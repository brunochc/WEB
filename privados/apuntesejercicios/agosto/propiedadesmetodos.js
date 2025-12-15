//objeto literal

const studenta = {
name: "alberto",
age: 23,
active: true,
greeting: function() {
    return `Hello, ${this.name}`;
}
}
console.log(studenta.greeting()); // Hello, alberto
console.log(studenta.age); // 23
console.log(studenta["active"]); // true
console.log(studenta); // {name: 'alberto', age: 23, active: true, greeting: ƒ}

/*
Objetos incorporados
    Los objetos incorporados en JavaScript son objetos que ya están definidos en el lenguaje y proporcionan funcionalidades útiles. Algunos ejemplos comunes incluyen:
    - Math: Proporciona propiedades y métodos para realizar operaciones matemáticas.
    - Date: Permite trabajar con fechas y horas.
    - String: Proporciona métodos para manipular cadenas de texto.
    - Array: Proporciona métodos para manipular arreglos.
    - JSON: Permite trabajar con datos en formato JSON (JavaScript Object Notation).        
    - RegExp: Permite trabajar con expresiones regulares para buscar y manipular texto.
    - Error: Proporciona una forma de manejar errores en el código.
    - Function: Permite crear y manipular funciones en JavaScript.
    - Object: Proporciona métodos para trabajar con objetos en JavaScript.
    - Promise: Permite manejar operaciones asincrónicas de manera más sencilla.
    Estos objetos incorporados son fundamentales para el desarrollo en JavaScript y facilitan muchas tareas comunes en la programación.             
    - Console: Proporciona métodos para mostrar mensajes en la consola del navegador o del entorno de ejecución. 

*/ 

Math.PI // 3.141592653589793
Math.sqrt(16) // 4
Math.random() // número aleatorio entre 0 y 1
Math.max(10, 5, 8) // 10
Math.min(10, 5, 8) // 5 
Math.trunc(4.7) // 4

console.log(Math.PI);   // 3.141592653589793
console.log(Math.sqrt(16)); // 4
console.log(Math.random()); // número aleatorio entre 0 y 1
console.log(Math.max(10, 5, 8)); // 10
console.log(Math.min(10, 5, 8)); // 5
console.log(Math.trunc(4.7)); // 4

/* Metodos heredados
    Los métodos heredados en JavaScript son aquellos que se heredan de los prototipos de los objetos. En JavaScript, todos los objetos tienen un prototipo del cual pueden heredar propiedades y métodos. Algunos ejemplos comunes de métodos heredados incluyen:
    - toString(): Convierte un objeto en una cadena de texto.
    - valueOf(): Devuelve el valor primitivo de un objeto.
    - hasOwnProperty(): Verifica si un objeto tiene una propiedad específica como propia (no heredada).
    - isPrototypeOf(): Verifica si un objeto es el prototipo de otro objeto.
    - propertyIsEnumerable(): Verifica si una propiedad es enumerable.
    Estos métodos son útiles para manipular y trabajar con objetos en JavaScript, ya que permiten realizar operaciones comunes sin necesidad de definirlos explícitamente en cada objeto.
*/

/* 
THIS
    En JavaScript, "this" es una palabra clave que hace referencia al contexto en el que se está ejecutando una función. El valor de "this" puede variar dependiendo de cómo se invoque la función. Aquí hay algunos ejemplos comunes de cómo se comporta "this":

    1. En el contexto global (fuera de cualquier función), "this" hace referencia al objeto global (window en navegadores, global en Node.js).
    
    2. Dentro de una función normal, "this" hace referencia al objeto desde el cual se llamó la función. Si la función se llama sin un objeto específico, "this" será el objeto global.
    
    3. En un método de un objeto, "this" hace referencia al objeto propietario del método.
    
    4. En funciones flecha (arrow functions), "this" no tiene su propio contexto y hereda el valor de "this" del entorno en el que fue creada.
    
    5. Al usar "call", "apply" o "bind", puedes establecer explícitamente el valor de "this" para una función.

    Ejemplos:

    // Contexto global
    console.log(this); // En un navegador, esto mostrará el objeto window

    // Función normal
    function showThis() {
        console.log(this);
    }
    showThis(); // En un navegador, esto mostrará el objeto window

    // Método de un objeto
    const obj = {
        name: 'Objeto',
        showThis: function() {
            console.log(this.name);
        }
    };
    obj.showThis(); // Muestra 'Objeto'

    // Función flecha
    const arrowFunc = () => {
        console.log(this);
    };
    arrowFunc(); // Hereda 'this' del contexto donde fue creada

    // Usando call para establecer 'this'
    function greet() {
        console.log(`Hello, ${this.name}`);
    }
    const person = { name: 'Alice' };
    greet.call(person); // Muestra 'Hello, Alice'

*/ 

let contact = {
    name: "John",
    rut: "12345678-9",
    greet: function() {
        return `Hello, ${this.name}`;
    }
};

/* contexto
*/

/*
Funcion constructora
    Una función constructora en JavaScript es una función especial que se utiliza para crear objetos. Cuando se llama a una función constructora con la palabra clave "new", se crea un nuevo objeto y se asigna a "this" dentro de la función. La función constructora puede definir propiedades y métodos para el objeto que se está creando.
*/



// funcion constructora --> construye objetos
function Student(name, rut, age) {
    this.name = name;
    this.rut = rut;
    this.age = age;
    this.active = true;
    this.greet = function() {
        return `Hello, ${this.name}`;
    }
}

const student = new Student("Bruno", "98765432-1", 25);
console.log(student.name); // Bruno
console.log(student.rut); // 98765432-1
console.log(student.age); // 25
console.log(student.active); // true
console.log(student.greet()); // Hello, Bruno   

const student1 = new Student("Ana", "12345678-9", 22);
console.log(student1.name); // Ana
console.log(student1.rut); // 12345678-9
console.log(student1.age); // 22
console.log(student1.active); // true
console.log(student1.greet()); // Hello, Ana