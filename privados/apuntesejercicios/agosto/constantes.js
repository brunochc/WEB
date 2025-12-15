const listaNnombres = ['Ana', 'Luis', 'Carlos', 'María', 'Marta'];

function sumar() {
    return 2 + 2;
}

console.log(listaNnombres);
console.log(sumar()); // This will output 4

// ES Module export (correct for your current setup)
export { listaNnombres, sumar };