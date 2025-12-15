# ⚡ Inicio Rápido - Plataforma de Servicios

## 🚀 Configuración en 5 Minutos

### 1. Instalar Dependencias

```bash
cd server
npm install
```

Esto instalará todas las dependencias necesarias, incluyendo:
- ✅ Express (servidor web)
- ✅ MongoDB/Mongoose (base de datos)
- ✅ Cloudinary (almacenamiento de imágenes)
- ✅ Multer (subida de archivos)
- ✅ JWT (autenticación)
- ✅ Bcrypt (encriptación de contraseñas)

### 2. Configurar Variables de Entorno

Crea el archivo `.env` en la carpeta `server/`:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/realscort
JWT_SECRET=clave_secreta_muy_larga_123456
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

### 3. Iniciar el Servidor

```bash
npm run dev
```

¡Listo! El servidor estará corriendo en `http://localhost:5000`

---

## 🧪 Probar la API

### Verificar que funciona:

```bash
curl http://localhost:5000/api/test
```

### Crear un usuario:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test User",
    "email": "test@example.com",
    "contraseña": "password123",
    "rut": "12345678-9",
    "rol": "cliente"
  }'
```

---

## 📚 Documentación Completa

- **`README_SERVICIOS.md`** - Documentación completa de la plataforma
- **`INSTALACION.md`** - Guía detallada de instalación
- **`API_EXAMPLES.md`** - Ejemplos de uso de todos los endpoints

---

## 🔑 Credenciales Necesarias

### MongoDB Atlas (Gratis)
1. Crea cuenta en [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster gratuito
3. Obtén tu URI de conexión

### Cloudinary (Gratis)
1. Crea cuenta en [cloudinary.com](https://cloudinary.com/)
2. Obtén tus credenciales del Dashboard
3. Plan gratuito: 25 GB de almacenamiento

---

## 📦 Nuevos Archivos Creados

### Modelos
- ✅ `server/models/servicio.js` - Modelo de servicios
- ✅ `server/models/proveedor.js` - Modelo de proveedores

### Controladores
- ✅ `server/controllers/servicioController.js` - Lógica de servicios
- ✅ `server/controllers/proveedorController.js` - Lógica de proveedores

### Rutas
- ✅ `server/routes/servicioRoutes.js` - Endpoints de servicios
- ✅ `server/routes/proveedorRoutes.js` - Endpoints de proveedores

### Configuración
- ✅ `server/config/cloudinary.js` - Configuración de Cloudinary
- ✅ `server/middleware/upload.js` - Middleware de subida de archivos
- ✅ `server/.env.example` - Plantilla de variables de entorno

### Documentación
- ✅ `README_SERVICIOS.md` - Documentación completa
- ✅ `INSTALACION.md` - Guía de instalación
- ✅ `API_EXAMPLES.md` - Ejemplos de API
- ✅ `QUICK_START.md` - Este archivo

---

## 🎯 Funcionalidades Implementadas

### ✅ Gestión de Proveedores
- Crear perfil de proveedor con foto y biografía
- Subir múltiples fotos a galería
- Gestionar información de contacto y ubicación
- Agregar certificaciones y experiencia
- Ver estadísticas (servicios, valoraciones, vistas)

### ✅ Gestión de Servicios
- Crear servicios con múltiples fotos
- Editar y eliminar servicios
- Gestionar precios y disponibilidad
- Sistema de categorías
- Ubicación y duración estimada

### ✅ Sistema de Valoraciones
- Clientes pueden valorar servicios (1-5 estrellas)
- Dejar comentarios y reseñas
- Cálculo automático de promedio
- Restricción: un usuario = una valoración por servicio

### ✅ Búsqueda y Filtros
- Buscar por categoría, ciudad, región
- Filtrar por rango de precio
- Búsqueda de texto en título y descripción
- Ordenar por: valoración, precio, popularidad
- Paginación de resultados

### ✅ Subida de Imágenes
- Integración con Cloudinary
- Optimización automática de imágenes
- Límite de 5MB por imagen
- Formatos: JPEG, JPG, PNG, GIF, WEBP
- Eliminación automática de archivos temporales

### ✅ Autenticación y Seguridad
- JWT con roles: cliente, proveedor, administrador
- Protección de rutas
- Validación de permisos
- Encriptación de contraseñas

---

## 📊 Endpoints Principales

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión

### Proveedores
- `GET /api/proveedores` - Listar proveedores
- `POST /api/proveedores/perfil` - Crear perfil
- `GET /api/proveedores/mi-perfil/datos` - Mi perfil
- `PUT /api/proveedores/perfil` - Actualizar perfil

### Servicios
- `GET /api/servicios` - Listar servicios
- `POST /api/servicios` - Crear servicio
- `GET /api/servicios/:id` - Ver servicio
- `PUT /api/servicios/:id` - Actualizar servicio
- `DELETE /api/servicios/:id` - Eliminar servicio
- `POST /api/servicios/:id/valoraciones` - Valorar servicio

---

## 🔧 Comandos Útiles

```bash
# Instalar dependencias
npm install

# Desarrollo (auto-reload)
npm run dev

# Producción
npm start

# Ver logs del servidor
npm run dev | grep "Servidor corriendo"
```

---

## 🐛 Solución Rápida de Problemas

### Error: "Cannot find module 'cloudinary'"
```bash
npm install cloudinary
```

### Error: "MONGO_URI no está definida"
- Verifica que `.env` existe en `server/`
- Verifica que contiene `MONGO_URI=...`

### Puerto 5000 en uso
- El servidor usará automáticamente 5001, 5002, etc.
- O cambia `PORT` en `.env`

### Error al subir imágenes
- Verifica credenciales de Cloudinary en `.env`
- Verifica que el archivo sea menor a 5MB
- Verifica el formato (JPEG, PNG, GIF, WEBP)

---

## 📱 Próximos Pasos

1. ✅ **Backend funcionando** - Ya está listo
2. 🔄 **Desarrollar Frontend** - Conecta tu app React/Vue
3. 🎨 **Personalizar** - Adapta a tus necesidades
4. 🚀 **Desplegar** - Sube a producción (Render, Railway, etc.)

---

## 💡 Consejos

- 🔒 **Nunca subas `.env` a Git** - Contiene información sensible
- 📸 **Cloudinary gratis** - 25 GB de almacenamiento
- 💾 **MongoDB gratis** - 512 MB de almacenamiento
- 🧪 **Usa Postman** - Para probar la API fácilmente
- 📚 **Lee la documentación** - `README_SERVICIOS.md` tiene todo

---

## 🆘 ¿Necesitas Ayuda?

- 📖 Lee `INSTALACION.md` para guía detallada
- 🔌 Revisa `API_EXAMPLES.md` para ejemplos
- 💬 Abre un issue en GitHub
- 📧 Contacta al equipo de desarrollo

---

¡Feliz desarrollo! 🎉
