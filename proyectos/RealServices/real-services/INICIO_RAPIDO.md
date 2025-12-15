# 🚀 Guía de Inicio Rápido - Real Services

## ✅ Estado de la Instalación

- ✅ Estructura del proyecto creada
- ✅ Dependencias del servidor instaladas (400 paquetes)
- ✅ Dependencias del cliente instaladas (87 paquetes)
- ✅ Archivo `.env` configurado

## 📍 Ubicación Actual

Estás en: `/home/neo/RealServices/real-services`

## 🔧 Configuración Necesaria

### 1. Configurar MongoDB

Edita el archivo `.env` en el servidor:

```bash
nano server/.env
```

Actualiza la línea de MongoDB según tu configuración:

```env
# Opción 1: MongoDB local
MONGODB_URI=mongodb://localhost:27017/real-services

# Opción 2: MongoDB Atlas (cloud)
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/real-services
```

También actualiza el `JWT_SECRET` con una clave segura:

```env
JWT_SECRET=tu_clave_super_secreta_aqui_cambiar_esto
```

## 🚀 Iniciar el Proyecto

### Terminal 1 - Backend (Puerto 5000)

```bash
cd server
npm run dev
```

### Terminal 2 - Frontend (Puerto 3000)

```bash
cd client
npm run dev
```

## 📱 Acceder a la Aplicación

Una vez iniciados ambos servidores:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Test**: http://localhost:5000/api

## 🗄️ Instalar MongoDB (si no lo tienes)

### Opción 1: MongoDB Local

```bash
# Instalar MongoDB
sudo apt install mongodb

# Iniciar el servicio
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Verificar que está corriendo
sudo systemctl status mongodb
```

### Opción 2: MongoDB con Docker

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Opción 3: MongoDB Atlas (Cloud - Gratis)

1. Visita: https://www.mongodb.com/cloud/atlas
2. Crea una cuenta gratuita
3. Crea un cluster
4. Obtén tu connection string
5. Úsalo en el archivo `.env`

## 📚 Estructura del Proyecto

```
real-services/
├── server/              # Backend (Node.js + Express)
│   ├── src/
│   │   ├── models/      # Modelos: User, Service, Booking
│   │   ├── controllers/ # Lógica de negocio
│   │   ├── routes/      # Rutas de la API
│   │   └── middleware/  # Autenticación JWT
│   └── .env            # Variables de entorno
│
└── client/              # Frontend (React + Vite)
    ├── src/
    │   ├── pages/       # Páginas principales
    │   ├── components/  # Componentes React
    │   └── context/     # Estado global (Auth)
    └── vite.config.js
```

## 🔑 Funcionalidades Principales

### Roles de Usuario

1. **Cliente**: Busca y contrata servicios
2. **Proveedor**: Ofrece servicios profesionales

### Endpoints de la API

#### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión

#### Servicios
- `GET /api/services` - Listar todos los servicios
- `POST /api/services` - Crear servicio (solo proveedores)
- `GET /api/services/:id` - Ver detalle de servicio

#### Reservas
- `POST /api/bookings` - Crear reserva
- `GET /api/bookings/my-bookings` - Mis reservas

## 🧪 Probar la API

### Registrar un usuario proveedor:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "123456",
    "role": "provider"
  }'
```

### Iniciar sesión:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "123456"
  }'
```

## 🛠️ Comandos Útiles

```bash
# Ver logs del servidor
cd server && npm run dev

# Ejecutar tests (cuando los agregues)
cd server && npm test

# Build del cliente para producción
cd client && npm run build

# Preview del build
cd client && npm run preview
```

## 📝 Próximos Pasos

1. ✅ Instalar MongoDB
2. ✅ Configurar `.env`
3. ✅ Iniciar servidor backend
4. ✅ Iniciar servidor frontend
5. 🔄 Registrar usuarios de prueba
6. 🔄 Crear servicios
7. 🔄 Probar el flujo completo

## 🐛 Solución de Problemas

### Error: "Cannot connect to MongoDB"
- Verifica que MongoDB esté corriendo: `sudo systemctl status mongodb`
- Revisa la URI en el archivo `.env`

### Error: "Port already in use"
- Cambia el puerto en `server/.env` (PORT=5000)
- O en `client/vite.config.js` (port: 3000)

### Error: "Module not found"
- Reinstala dependencias: `npm install`

## 📞 Categorías de Servicios Disponibles

- Plomería
- Electricidad
- Carpintería
- Limpieza
- Jardinería
- Tecnología
- Educación
- Otros

¡Listo para comenzar! 🎉
