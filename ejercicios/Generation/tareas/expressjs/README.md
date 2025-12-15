# expressjs
Introduccion a ExpressJS

# 1. Inicializar proyecto (si no lo has hecho)
npm init -y
npm install express

# 2. Crear estructura de directorios
mkdir controllers
touch index.js
touch controllers/itemsController.js

# 3. Agregar el código a los archivos
# (Copia el código de arriba en cada archivo)

# 4. Ejecutar la aplicación
npm start

# 5. Probar los endpoints en otra terminal
curl http://localhost:3000/
curl http://localhost:3000/items
curl http://localhost:3000/items/1
curl -X POST http://localhost:3000/items -H "Content-Type: application/json" -d '{"name": "Mi item"}'
