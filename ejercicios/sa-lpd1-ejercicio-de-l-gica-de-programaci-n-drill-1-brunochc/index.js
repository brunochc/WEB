


/* Drill de Programación 1. Utiliza este proyecto para desarrollar tu actividad.
Modifica este archivo a tu conveniencia para lograr la solución.
*/

// Ejecuta npm install para instalar los paquetes del proyecto
// Ejecuta node index.js para probar tu aplicación

const prompt = require('prompt-sync')();
//
// get input from the user.
//

function compararNumeros() {
    const num1 = parseFloat(prompt('Ingrese el primer número: '));
    const num2 = parseFloat(prompt('Ingrese el segundo número: '));
    const num3 = parseFloat(prompt('Ingrese el tercer número: '));
    
    //validar que los inputs sean números
    if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
        console.log('Por favor, ingrese solo números válidos.');
        return;
    }

    //verificar si todos los numeros son iguales
    if (num1 === num2 && num2 === num3) {
        console.log('Los tres números son iguales.', num1, num2, num3);
        return;
    }

    //crear un array con los numeros
    const numeros = [num1,num2,num3];

    //ordenar el array de mayor a menor
    const mayorAMenor = [...numeros].sort((a,b) => b - a);
    //ordenar el array de menor a mayor
    const menorAMayor = [...numeros].sort((a,b) => a - b);

    //identificar mayor, centro y menor
    const mayor = mayorAMenor[0];
    const menor = menorAMayor[0];

    //encontrar el numero del medio

    let centro;
    if (num1 !== mayor && num1 !== menor) {
        centro = num1;
    } else if (num2 !== mayor && num2 !== menor) {
        centro = num2;
    } else {
        centro = num3;
    }

    
    console.log('\n=== resultados ===');
    console.log('ordenados de mayor a menor', mayorAMenor.join(', '));
    console.log('ordenados de menor a mayor', menorAMayor.join(', '));
    console.log('El número mayor es:', mayor);
    console.log('El número del medio es:', centro);
    console.log('El número menor es:', menor);




}
compararNumeros();
