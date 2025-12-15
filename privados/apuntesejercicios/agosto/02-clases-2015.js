/*
que es una clase    
    Una clase en JavaScript es una plantilla para crear objetos. Introducidas en ECMAScript 2015 (ES6), las clases proporcionan una sintaxis más clara y sencilla para crear objetos y manejar la herencia en comparación con las funciones constructoras tradicionales. Una clase puede contener un constructor, métodos y propiedades.

    podemos invocar una clase con la palabra reservada "new"

    herencia basda en clases
    las instasncias de una clase pueden heredar propiedades y métodos de otra clase mediante la palabra reservada "extends"

*/

// Vehiculo

class Vehicle {
   //se definen las propiedades del objeto
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.running = false;
        this._velocity = 0;
    }

    start() {
        this.running = true;
        return `${this.brand} ${this.model} is starting.`;
    }

    stop() {
        this.running = false;
        return `${this.brand} ${this.model} is stopping.`;
    }

    info() {
        return `Brand: ${this.brand}, Model: ${this.model}, Year: ${this.year}, Running: ${this.running}`;
    }
    get velocity() {
        return this._velocity;
    }

    // setter para modificar la velocidad  
    set velocity(newVelocity) {
        if (newVelocity >= 0) {
            this._velocity = newVelocity;
        } else {
            console.log("Velocity cannot be negative.");
        }
    }
    acelerar (){
    this.velocity += 10;
    return `Velocity: ${this.velocity} km/h`;
}
    

} // <-- este cierre faltaba
//instanciar 
const kia = new Vehicle("Kia", "Sorento", 2020);

const toyota = new Vehicle("Toyota", "4runner", 2018);

console.log(kia.year);
console.log(toyota);

kia.velocity = 100;
console.log(kia.velocity); // 100

