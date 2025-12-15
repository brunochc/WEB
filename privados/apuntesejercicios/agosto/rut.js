import { validateRUT, getCheckDigit, generateRandomRUT, clearRUT } from 'validar-rut';

const validar = validateRUT('12345678', 'K'); // true

console.log(validar);

const clear = clearRUT("18597565-7"); // '4545462156454'
console.log(clear);

const randomRut = generateRandomRUT(); // e.g., { number: '12345678', checkDigit: '5' }
console.log(randomRut);