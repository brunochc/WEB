🚀 Guía Completa: API con MongoDB + HTTPie
📋 Estructura del Proyecto
text

tu-proyecto/
├── src/
│   ├── app/
│   │   └── app.js          # Config Express + Middlewares
│   ├── config/
│   │   └── database.js     # Conexión MongoDB
│   ├── models/
│   │   └── User.js         # Modelo Usuario
│   ├── controllers/
│   │   └── controllers.js  # Lógica de negocio
│   └── routes/
│       └── routes.js       # Rutas API
├── index.js               # Punto de entrada
└── package.json

🔧 Comandos de Instalación
Dependencias
bash

# Instalar dependencias
npm install express mongoose morgan

# Instalar HTTPie (Ubuntu/Debian)
sudo apt install httpie jq

# Instalar nodemon para desarrollo (opcional)
npm install -D nodemon

Verificar Servicios
bash

# Verificar MongoDB
sudo systemctl status mongod
sudo systemctl start mongod    # Si no está corriendo

# Verificar en MongoDB Compass
# Conectar a: mongodb://localhost:27017

🎯 Comandos HTTPie para la API
1. Health Check
bash

http GET http://localhost:3000/checkhealth

2. Gestión de Usuarios
Crear Usuario
bash

http POST http://localhost:3000/user \
    name="Nombre Usuario" \
    email="usuario@email.com" \
    password="123456" \
    age:=25

Listar Todos los Usuarios
bash

http GET http://localhost:3000/user

# Con formato bonito
http GET http://localhost:3000/user | jq '.'

Obtener Usuario por ID
bash

# Reemplazar con ID real de MongoDB
http GET http://localhost:3000/user/68e52762c1c198c96febf13e

Actualizar Usuario
bash

http PUT http://localhost:3000/user/68e52762c1c198c96febf13e \
    name="Nuevo Nombre" \
    email="nuevo@email.com" \
    age:=30

Eliminar Usuario
bash

http DELETE http://localhost:3000/user/68e52762c1c198c96febf13e

3. Autenticación
bash

http POST http://localhost:3000/login \
    email="usuario@email.com" \
    password="123456"

🔍 Comandos de Monitoreo y Debug
Ver Logs de la Aplicación
bash

# Iniciar servidor en desarrollo
npm run dev

# Ver logs en tiempo real
tail -f logs.txt  # Si guardas logs en archivo

Consultar MongoDB desde Terminal
bash

# Conectar a MongoDB shell
mongosh miapp

# Consultas útiles:
show collections
db.users.find().pretty()
db.users.countDocuments()
db.users.findOne({email: "usuario@email.com"})
exit

Ver Estado de Servicios
bash

# MongoDB status
sudo systemctl status mongod

# Puertos en uso
sudo netstat -tulpn | grep :3000
sudo netstat -tulpn | grep :27017

📊 Script de Pruebas Automatizado
test_api.sh
bash

#!/bin/bash
API_BASE="http://localhost:3000"

echo "=== Testing MongoDB API ==="

# Health Check
echo -e "\n1. ✅ Health Check:"
http GET $API_BASE/checkhealth

# Crear usuario
echo -e "\n2. 📝 Creating User:"
CREATE_RESPONSE=$(http POST $API_BASE/user \
    name="Test User" \
    email="test@mongodb.com" \
    password="123456" \
    age:=30)
echo "$CREATE_RESPONSE"

# Extraer ID automáticamente
USER_ID=$(echo "$CREATE_RESPONSE" | jq -r '.data.id')
echo "🆔 User ID: $USER_ID"

# Listar usuarios
echo -e "\n3. 📋 Listing Users:"
http GET $API_BASE/user

# Obtener usuario específico
echo -e "\n4. 🔍 Getting User by ID:"
http GET $API_BASE/user/$USER_ID

# Actualizar usuario
echo -e "\n5. ✏️ Updating User:"
http PUT $API_BASE/user/$USER_ID \
    name="Updated Name" \
    age:=31

# Login
echo -e "\n6. 🔐 Testing Login:"
http POST $API_BASE/login \
    email="test@mongodb.com" \
    password="123456"

echo -e "\n=== ✅ Test Complete ==="

Ejecutar:
bash

chmod +x test_api.sh
./test_api.sh

🛠️ Comandos de Desarrollo Rápido
Aliases Útiles (.bashrc o .zshrc)
bash

# API Aliases
alias api-start='npm start'
alias api-dev='npm run dev' 
alias api-health='http GET http://localhost:3000/checkhealth'
alias api-users='http GET http://localhost:3000/user | jq'
alias api-mongo='mongosh miapp'

# Debug Aliases
alias api-logs='tail -f application.log'
alias mongo-status='sudo systemctl status mongod'

Comandos con Verbose para Debug
bash

# Ver toda la comunicación HTTP
http --verbose POST http://localhost:3000/user \
    name="Debug User" \
    email="debug@test.com" \
    password="123456"

# Solo headers de respuesta
http --headers GET http://localhost:3000/user

# Seguir redirects
http --follow GET http://localhost:3000/some-endpoint

🗂️ Gestión de Base de Datos
Backup Básico
bash

# Exportar datos
mongodump --db miapp --out ./backup/$(date +%Y%m%d)

# Importar datos
mongorestore --db miapp ./backup/20251007/miapp/

Limpiar Base de Datos
bash

# Desde mongo shell
mongosh miapp
db.users.deleteMany({})
db.dropDatabase()
exit

🔄 Flujo de Trabajo Típico
1. Iniciar Servicios
bash

# Terminal 1 - MongoDB
sudo systemctl start mongod

# Terminal 2 - API
npm run dev

2. Probar Endpoints
bash

# Terminal 3 - Pruebas
./test_api.sh

# O pruebas manuales
http GET http://localhost:3000/user

3. Verificar Datos
bash

# En MongoDB Compass o terminal
mongosh miapp
db.users.find().pretty()

🚨 Solución de Problemas Comunes
Error de Conexión MongoDB
bash

# Verificar servicio
sudo systemctl status mongod

# Reiniciar si es necesario
sudo systemctl restart mongod

# Ver logs
sudo journalctl -u mongod -f

Error de Puerto en Uso
bash

# Liberar puerto 3000
sudo kill -9 $(sudo lsof -t -i:3000)

# O usar otro puerto
PORT=3001 npm start