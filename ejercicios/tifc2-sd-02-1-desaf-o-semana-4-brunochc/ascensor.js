// Simulación del ascensor del piso 1 al 20

for (let piso = 1; piso <= 20; piso++) {
    if (piso === 13) {
        console.log('¡Piso de mala suerte! Saltando...');
        continue;
    }
    console.log(`Subiendo al piso ${piso}`);
    if (piso % 4 === 0) {
        console.log(`🛠 Revisión rutinaria en el piso ${piso}`);
    }
    if (piso % 10 === 7) {
        console.log(`🎉 Sorpresa en el piso ${piso}`);
    }
}
