require("../ascensor"); // Ejecuta el archivo directamente

describe("Ascensor Misterioso - Validaciones de salida por consola", () => {
  let logs = [];

  beforeAll(() => {
    // Espiar console.log antes de los tests
    logs = [];
    jest.spyOn(console, "log").mockImplementation((msg) => logs.push(msg));
    jest.resetModules(); // Limpiar caché del módulo
    require("../ascensor"); // Volver a ejecutar el programa con espía activo
  });

  afterAll(() => {
    // Restaurar console.log original
    console.log.mockRestore();
  });

  test("Debe incluir 'Subiendo al piso 1'", () => {
    expect(logs).toContain("Subiendo al piso 1");
  });

  test("Debe mostrar mensaje especial para el piso 13", () => {
    expect(logs).toContain("¡Piso de mala suerte! Saltando...");
    expect(logs).not.toContain("Subiendo al piso 13");
  });

  test("Debe mostrar revisión rutinaria en múltiplos de 4 (piso 8)", () => {
    expect(logs).toContain("🛠 Revisión rutinaria en el piso 8");
  });

  test("Debe mostrar sorpresa en pisos que terminan en 7 (piso 17)", () => {
    expect(logs).toContain("🎉 Sorpresa en el piso 17");
  });

  test("Debe mostrar mensaje compuesto en pisos con revisión y sorpresa (si existiera)", () => {
    // Piso 17 solo tiene sorpresa, no revisión
    expect(logs).not.toContain("🛠 Revisión rutinaria en el piso 17");
  });

  test("Debe tener exactamente 19 subidas (sin contar piso 13)", () => {
    const subidas = logs.filter(linea => linea.startsWith("Subiendo al piso"));
    expect(subidas.length).toBe(19);
  });
});
