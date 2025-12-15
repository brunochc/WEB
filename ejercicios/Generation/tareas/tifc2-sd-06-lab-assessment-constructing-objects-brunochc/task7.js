// Type your code below this line!

const prompt = require("prompt-sync")();

function Car(make, model, year, color, doors, mileage, engineType) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.color = color;
    this.doors = doors;
    this.mileage = mileage;
    this.engineType = engineType;
}

const make = prompt("Marca: ");
const model = prompt("Modelo: ");
const year = prompt("Año: ");
const color = prompt("Color: ");
const doors = prompt("Número de puertas: ");
const mileage = prompt("Kilometraje: ");
const engineType = prompt("Tipo de motor (combustion/electric): ");

const myCar = new Car(make, model, year, color, doors, mileage, engineType);
console.log(myCar);

// Type your code above this line!

