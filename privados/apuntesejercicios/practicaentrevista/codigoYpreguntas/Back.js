/*⚙️ Backend con Express
18. Ruta GET /saludo
 Crea un servidor con Express que responda en la ruta /saludo con el texto "Hola mundo".
19. Ruta GET /producto con JSON
 Crea una ruta GET /producto que devuelva este JSON:
{
  "id": 1,
  "nombre": "Teclado",
  "precio": 12000
}
20. Servidor en puerto 3000
 Crea un archivo server.js que levante un servidor en el puerto 3000. La raíz / debe responder con "Servidor funcionando".
21. Ruta con parámetro dinámico
 Crea una ruta /usuario/:nombre que responda con "Hola, [nombre]" según el valor recibido en la URL.
22. Ruta POST que recibe JSON
Crea una ruta POST /comentario que reciba { nombre, mensaje } y devuelva: "Comentario recibido de [nombre]: [mensaje]". Usa express.json().
23. Ruta con fecha actual
 Crea una ruta /fecha que devuelva un objeto con la fecha actual:
{ "fecha": "2025-06-05T12:34:00Z" }
24. Ruta con lista de productos
 Ruta GET /productos que devuelva:
[
  { "id": 1, "nombre": "Teclado" },
  { "id": 2, "nombre": "Mouse" },
  { "id": 3, "nombre": "Pantalla" }
]

25. Ruta con query param
 Crea una ruta /buscar que reciba un ?nombre= en la URL y devuelva:
{ "resultado": "Buscando a [nombre]" }

26. Ruta con código de error personalizado
 Crea una ruta /no-autorizado que devuelva código 403 y el texto: "Acceso denegado".

🛠️ Herramientas / Git / GitHub
27. Crear repo y primer commit
 En una carpeta nueva, inicializa Git. Crea un archivo README.md, haz un commit inicial y explica los comandos usados.
28. Crear y trabajar con ramas
 Crea una rama dev, cambia a ella, agrega un archivo nota.txt con el texto "Hola desde dev" y haz commit.
Preguntas teóricas
🧠 Lógica de programación / Fundamentos de JavaScript
¿Qué es JavaScript?


30. Verificador de edad
Crea una función llamada verificarEdad que reciba un número como parámetro (edad).
La función debe retornar un mensaje según estas condiciones:
Si la edad es menor a 0, retornar: "Edad no válida".


Si la edad es menor de 18, retornar: "Eres menor de edad".


Si la edad está entre 18 y 65 (inclusive), retornar: "Eres adulto".


Si la edad es mayor a 65, retornar: "Eres adulto mayor".






31. Mayor que Diez
Escribe una función llamada mayorQueDiez que tome un array de números como parámetro y devuelva un nuevo array que contenga solo los números mayores a 10. Prueba la función con el array [3, 12, 8, 21, 7, 15] y muestra el resultado en la consola.




*/