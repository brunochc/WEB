# 📦 Guía de Instalación - Plataforma de Servicios

## 🎯 Requisitos Previos

- **Node.js** 18+ ([Descargar](https://nodejs.org/))
- **MongoDB** (local o Atlas) ([Crear cuenta en Atlas](https://www.mongodb.com/cloud/atlas))
- **Cuenta Cloudinary** ([Registrarse gratis](https://cloudinary.com/users/register/free))
- **Git** ([Descargar](https://git-scm.com/))

---

## 🚀 Instalación Paso a Paso

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/RealScortChile.git
cd RealScortChile
```

### 2️⃣ Configurar Backend

```bash
cd server
npm install
```

### 3️⃣ Configurar Variables de Entorno

Crea un archivo `.env` en la carpeta `server/`:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:

```env
# Puerto del servidor
PORT=5000

# Entorno
NODE_ENV=development

# MongoDB - Obtén tu URI de MongoDB Atlas
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/realscort

# JWT - Genera una clave secreta segura
JWT_SECRET=tu_clave_secreta_muy_larga_y_segura_123456

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Cloudinary - Obtén estas credenciales de tu dashboard
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=tu_api_secret_aqui
```

### 4️⃣ Configurar MongoDB Atlas

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea una cuenta gratuita
3. Crea un nuevo cluster (Free Tier)
4. En "Database Access", crea un usuario con contraseña
5. En "Network Access", agrega tu IP (o 0.0.0.0/0 para desarrollo)
6. Haz clic en "Connect" → "Connect your application"
7. Copia la URI y pégala en `MONGO_URI` (reemplaza `<password>` con tu contraseña)

### 5️⃣ Configurar Cloudinary

1. Ve a [Cloudinary](https://cloudinary.com/)
2. Crea una cuenta gratuita
3. En el Dashboard, encontrarás:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
4. Copia estos valores a tu archivo `.env`

### 6️⃣ Iniciar el Servidor

```bash
npm run dev
```

Deberías ver:

```
=== Variables de Entorno Cargadas ===
PORT: 5000
NODE_ENV: development
MONGO_URI: ✅ Cargada
JWT_SECRET: ✅ Cargada
=====================================

🔌 Conectado a MongoDB: realscort

Servidor corriendo en development
Puerto: 5000
URL: http://localhost:5000
```

### 7️⃣ Verificar Instalación

Abre tu navegador o Postman y visita:

```
http://localhost:5000/api/test
```

Deberías ver:

```json
{
  "status": "success",
  "message": "API funcionando correctamente",
  "database": {
    "state": "Conectado",
    "name": "realscort",
    "host": "cluster.mongodb.net",
    "port": 27017
  }
}
```

---

## 🧪 Probar la API

### Crear un Usuario

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "contraseña": "password123",
  "rut": "12345678-9",
  "rol": "cliente"
}
```

### Iniciar Sesión

```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "contraseña": "password123"
}
```

Respuesta:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": "...",
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "rol": "cliente"
  }
}
```

### Crear Perfil de Proveedor

Usa el token obtenido en el login:

```bash
POST http://localhost:5000/api/proveedores/perfil
Authorization: Bearer <tu_token_aqui>
Content-Type: multipart/form-data

nombre_comercial: "Spa Relax"
biografia: "Especialistas en masajes terapéuticos"
especialidades: ["masajes", "terapias"]
experiencia_años: 5
contacto: {"telefono": "+56912345678"}
foto_perfil: [archivo.jpg]
```

### Crear un Servicio

```bash
POST http://localhost:5000/api/servicios
Authorization: Bearer <tu_token_aqui>
Content-Type: multipart/form-data

titulo: "Masaje Relajante"
descripcion: "Masaje terapéutico de 60 minutos"
categoria: "masajes"
precio: 25000
moneda: "CLP"
duracion_estimada: 60
imagenes: [foto1.jpg, foto2.jpg]
```

---

## 🐛 Solución de Problemas

### Error: "MONGO_URI no está definida"

**Solución:** Verifica que el archivo `.env` existe en `server/` y contiene `MONGO_URI`.

### Error: "MongoServerError: bad auth"

**Solución:** 
- Verifica que el usuario y contraseña en `MONGO_URI` sean correctos
- Asegúrate de escapar caracteres especiales en la contraseña

### Error: "Puerto 5000 en uso"

**Solución:** 
- El servidor intentará usar el puerto 5001, 5002, etc. automáticamente
- O cambia `PORT` en `.env`

### Error al subir imágenes

**Solución:**
- Verifica que las credenciales de Cloudinary sean correctas
- Asegúrate de que el archivo sea menor a 5MB
- Verifica que el formato sea JPEG, JPG, PNG, GIF o WEBP

### Error: "Cannot find module 'cloudinary'"

**Solución:**
```bash
cd server
npm install cloudinary
```

---

## 📱 Configurar Frontend (Opcional)

Si tienes un frontend React:

```bash
cd ../client
npm install
```

Crea `.env` en `client/`:

```env
VITE_API_URL=http://localhost:5000/api
```

Inicia el frontend:

```bash
npm run dev
```

---

## 🔧 Scripts Útiles

```bash
# Desarrollo con auto-reload
npm run dev

# Producción
npm start

# Instalar dependencias
npm install

# Limpiar node_modules
rm -rf node_modules && npm install
```

---

## 📊 Estructura de Carpetas

```
RealScortChile/
├── server/
│   ├── config/          # Configuraciones (DB, Cloudinary, JWT)
│   ├── controllers/     # Lógica de negocio
│   ├── middleware/      # Auth, upload, validación
│   ├── models/          # Modelos de MongoDB
│   ├── routes/          # Rutas de la API
│   ├── uploads/         # Archivos temporales
│   ├── .env            # Variables de entorno (NO subir a Git)
│   ├── .env.example    # Plantilla de variables
│   ├── package.json    # Dependencias
│   └── server.js       # Punto de entrada
├── client/             # Frontend (React)
├── README_SERVICIOS.md # Documentación de servicios
└── INSTALACION.md      # Esta guía
```

---

## ✅ Checklist de Instalación

- [ ] Node.js 18+ instalado
- [ ] MongoDB Atlas configurado
- [ ] Cloudinary configurado
- [ ] Repositorio clonado
- [ ] Dependencias instaladas (`npm install`)
- [ ] Archivo `.env` creado y configurado
- [ ] Servidor iniciado sin errores
- [ ] Endpoint `/api/test` responde correctamente
- [ ] Usuario de prueba creado
- [ ] Perfil de proveedor creado
- [ ] Servicio de prueba creado con imágenes

---

## 🎓 Próximos Pasos

1. **Explora la API:** Lee `README_SERVICIOS.md` para ver todos los endpoints
2. **Prueba con Postman:** Importa la colección de endpoints
3. **Desarrolla el Frontend:** Conecta tu aplicación React/Vue/Angular
4. **Personaliza:** Adapta los modelos y controladores a tus necesidades

---

## 📚 Recursos Adicionales

- [Documentación de MongoDB](https://docs.mongodb.com/)
- [Documentación de Cloudinary](https://cloudinary.com/documentation)
- [Documentación de Express](https://expressjs.com/)
- [Documentación de Mongoose](https://mongoosejs.com/)
- [Documentación de JWT](https://jwt.io/)

---

## 💡 Consejos

1. **Seguridad:** Nunca subas el archivo `.env` a Git
2. **Cloudinary:** El plan gratuito incluye 25 GB de almacenamiento
3. **MongoDB:** El plan gratuito incluye 512 MB de almacenamiento
4. **Desarrollo:** Usa Postman o Thunder Client para probar la API
5. **Producción:** Configura variables de entorno en tu servicio de hosting

---

¿Necesitas ayuda? Abre un issue en GitHub o contacta al equipo de desarrollo.
