# ✅ Checklist de Configuración - Plataforma de Servicios

## 📋 Pre-requisitos

- [ ] Node.js 18+ instalado
- [ ] Git instalado
- [ ] Editor de código (VS Code recomendado)
- [ ] Cliente REST (Postman, Thunder Client, o cURL)

---

## 🔧 Configuración Inicial

### 1. Clonar y Preparar Proyecto

- [ ] Repositorio clonado
- [ ] Navegado a la carpeta del proyecto
- [ ] Carpeta `server/` localizada

### 2. Instalar Dependencias

```bash
cd server
npm install
```

- [ ] Comando ejecutado sin errores
- [ ] `node_modules/` creado
- [ ] Todas las dependencias instaladas

**Verificar que se instalaron:**
- [ ] express
- [ ] mongoose
- [ ] cloudinary ⭐ NUEVO
- [ ] multer
- [ ] jsonwebtoken
- [ ] bcryptjs
- [ ] cors
- [ ] dotenv

---

## 🗄️ Configurar MongoDB Atlas

### Crear Cuenta y Cluster

- [ ] Cuenta creada en [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- [ ] Cluster gratuito creado (M0 Sandbox)
- [ ] Nombre del cluster anotado

### Configurar Acceso

- [ ] Usuario de base de datos creado
  - Usuario: `__________`
  - Contraseña: `__________` (guárdala bien)
- [ ] IP permitida agregada (0.0.0.0/0 para desarrollo)
- [ ] URI de conexión obtenida

**Formato de URI:**
```
mongodb+srv://usuario:password@cluster.mongodb.net/nombre_bd
```

- [ ] URI copiada y guardada

---

## 📸 Configurar Cloudinary

### Crear Cuenta

- [ ] Cuenta creada en [cloudinary.com](https://cloudinary.com/)
- [ ] Plan gratuito activado (25 GB)
- [ ] Dashboard accesible

### Obtener Credenciales

Desde el Dashboard de Cloudinary, copia:

- [ ] **Cloud Name:** `__________`
- [ ] **API Key:** `__________`
- [ ] **API Secret:** `__________`

---

## ⚙️ Configurar Variables de Entorno

### Crear Archivo .env

```bash
cd server
cp .env.example .env
```

- [ ] Archivo `.env` creado en `server/`
- [ ] Archivo abierto en editor

### Completar Variables

Edita el archivo `.env` con tus datos:

```env
# Puerto del servidor
PORT=5000

# Entorno
NODE_ENV=development

# MongoDB - Pega tu URI aquí
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/realscort

# JWT - Genera una clave secreta larga
JWT_SECRET=clave_super_secreta_muy_larga_123456789

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Cloudinary - Pega tus credenciales aquí
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=tu_api_secret_aqui
```

**Verificar:**
- [ ] `MONGO_URI` completado con tu URI de MongoDB
- [ ] `JWT_SECRET` completado (mínimo 32 caracteres)
- [ ] `CLOUDINARY_CLOUD_NAME` completado
- [ ] `CLOUDINARY_API_KEY` completado
- [ ] `CLOUDINARY_API_SECRET` completado
- [ ] Archivo guardado

---

## 🚀 Iniciar Servidor

### Primera Ejecución

```bash
npm run dev
```

**Verificar en la consola:**

- [ ] ✅ "Variables de Entorno Cargadas"
- [ ] ✅ "MONGO_URI: ✅ Cargada"
- [ ] ✅ "JWT_SECRET: ✅ Cargada"
- [ ] ✅ "🔌 Conectado a MongoDB"
- [ ] ✅ "Servidor corriendo en development"
- [ ] ✅ "Puerto: 5000"

**Si hay errores:**
- [ ] Revisar que `.env` existe
- [ ] Verificar que las variables están completas
- [ ] Verificar conexión a internet
- [ ] Verificar que MongoDB Atlas está activo

---

## 🧪 Probar la API

### Test Básico

Abre tu navegador o Postman:

```
http://localhost:5000/api/test
```

**Respuesta esperada:**
```json
{
  "status": "success",
  "message": "API funcionando correctamente",
  "database": {
    "state": "Conectado",
    "name": "realscort"
  }
}
```

- [ ] Endpoint responde correctamente
- [ ] Estado de base de datos: "Conectado"

---

## 👤 Crear Usuario de Prueba

### Registrar Usuario

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "nombre": "Test User",
  "email": "test@example.com",
  "contraseña": "password123",
  "rut": "12345678-9",
  "rol": "cliente"
}
```

**Verificar:**
- [ ] Respuesta exitosa (status 201)
- [ ] Token JWT recibido
- [ ] Usuario creado

**Guardar el token:**
```
Token: _______________________________________________
```

### Iniciar Sesión

```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "contraseña": "password123"
}
```

- [ ] Login exitoso
- [ ] Token recibido

---

## 👨‍💼 Crear Perfil de Proveedor

### Crear Perfil

```bash
POST http://localhost:5000/api/proveedores/perfil
Authorization: Bearer <tu_token>
Content-Type: multipart/form-data

nombre_comercial: "Mi Negocio Test"
biografia: "Descripción de prueba"
especialidades: ["masajes", "terapias"]
experiencia_años: 5
contacto: {"telefono": "+56912345678"}
```

**Verificar:**
- [ ] Perfil creado exitosamente
- [ ] Rol cambiado a "proveedor"
- [ ] Datos guardados correctamente

---

## 🛍️ Crear Servicio de Prueba

### Preparar Imagen de Prueba

- [ ] Imagen de prueba preparada (JPEG/PNG, < 5MB)
- [ ] Ruta de la imagen anotada

### Crear Servicio

```bash
POST http://localhost:5000/api/servicios
Authorization: Bearer <tu_token>
Content-Type: multipart/form-data

titulo: "Servicio de Prueba"
descripcion: "Descripción del servicio de prueba"
categoria: "masajes"
precio: 25000
moneda: "CLP"
duracion_estimada: 60
imagenes: [tu_imagen.jpg]
```

**Verificar:**
- [ ] Servicio creado exitosamente
- [ ] Imagen subida a Cloudinary
- [ ] URL de imagen recibida
- [ ] Servicio visible en la base de datos

---

## 🔍 Probar Búsquedas

### Listar Servicios

```bash
GET http://localhost:5000/api/servicios
```

- [ ] Lista de servicios recibida
- [ ] Tu servicio de prueba aparece

### Buscar con Filtros

```bash
GET http://localhost:5000/api/servicios?categoria=masajes&ordenar_por=valoracion
```

- [ ] Filtros funcionan correctamente
- [ ] Resultados filtrados correctamente

---

## ⭐ Probar Valoraciones

### Crear Segundo Usuario (Cliente)

- [ ] Segundo usuario creado
- [ ] Token del segundo usuario guardado

### Agregar Valoración

```bash
POST http://localhost:5000/api/servicios/<id_servicio>/valoraciones
Authorization: Bearer <token_segundo_usuario>
Content-Type: application/json

{
  "puntuacion": 5,
  "comentario": "Excelente servicio de prueba"
}
```

**Verificar:**
- [ ] Valoración agregada
- [ ] Promedio calculado
- [ ] Comentario guardado

---

## 📊 Verificar Estadísticas

### Ver Perfil de Proveedor

```bash
GET http://localhost:5000/api/proveedores/mi-perfil/datos
Authorization: Bearer <token_proveedor>
```

**Verificar estadísticas:**
- [ ] `total_servicios`: 1
- [ ] `servicios_activos`: 1
- [ ] `total_valoraciones`: 1
- [ ] `promedio_valoracion`: 5

---

## 🎨 Probar Subida de Múltiples Imágenes

### Crear Servicio con Varias Fotos

```bash
POST http://localhost:5000/api/servicios
Authorization: Bearer <token>
Content-Type: multipart/form-data

titulo: "Servicio con Galería"
descripcion: "Servicio con múltiples fotos"
categoria: "belleza"
precio: 30000
imagenes: [foto1.jpg, foto2.jpg, foto3.jpg]
```

**Verificar:**
- [ ] Todas las imágenes subidas
- [ ] URLs de Cloudinary recibidas
- [ ] Servicio con múltiples fotos creado

---

## 🗑️ Probar Eliminación

### Eliminar Foto de Servicio

```bash
DELETE http://localhost:5000/api/servicios/<id_servicio>/fotos/<id_foto>
Authorization: Bearer <token>
```

- [ ] Foto eliminada del servicio
- [ ] Foto eliminada de Cloudinary

### Eliminar Servicio

```bash
DELETE http://localhost:5000/api/servicios/<id_servicio>
Authorization: Bearer <token>
```

- [ ] Servicio eliminado
- [ ] Todas las fotos eliminadas de Cloudinary
- [ ] Estadísticas actualizadas

---

## 📱 Verificación Final

### Backend

- [ ] Servidor inicia sin errores
- [ ] Conexión a MongoDB exitosa
- [ ] Cloudinary configurado correctamente
- [ ] Todas las rutas funcionan
- [ ] Autenticación funciona
- [ ] Subida de imágenes funciona
- [ ] Valoraciones funcionan
- [ ] Búsquedas y filtros funcionan

### Base de Datos

- [ ] Colección `Usuarios` creada
- [ ] Colección `Proveedores` creada
- [ ] Colección `Servicios` creada
- [ ] Índices creados automáticamente
- [ ] Datos de prueba guardados

### Cloudinary

- [ ] Imágenes subidas correctamente
- [ ] Carpetas organizadas (servicios/, proveedores/)
- [ ] Transformaciones aplicadas
- [ ] Eliminación funciona

---

## 📚 Documentación Revisada

- [ ] `README_SERVICIOS.md` leído
- [ ] `INSTALACION.md` revisado
- [ ] `API_EXAMPLES.md` consultado
- [ ] `QUICK_START.md` seguido
- [ ] `CAMBIOS_REALIZADOS.md` entendido

---

## 🎯 Próximos Pasos

### Desarrollo

- [ ] Leer documentación completa
- [ ] Explorar todos los endpoints
- [ ] Probar casos de uso reales
- [ ] Desarrollar frontend
- [ ] Personalizar según necesidades

### Producción

- [ ] Configurar variables de entorno de producción
- [ ] Elegir servicio de hosting (Render, Railway, etc.)
- [ ] Configurar dominio
- [ ] Configurar SSL/HTTPS
- [ ] Hacer backup de base de datos

---

## ✅ Checklist Completo

**Total de tareas:** ~100+

**Completadas:** _____ / 100+

**Estado:** 
- [ ] 🔴 No iniciado
- [ ] 🟡 En progreso
- [ ] 🟢 Completado y funcionando

---

## 🆘 Solución de Problemas

Si algo no funciona, revisa:

1. [ ] Archivo `.env` existe y está completo
2. [ ] Variables de entorno son correctas
3. [ ] MongoDB Atlas está activo
4. [ ] Cloudinary está configurado
5. [ ] Puerto 5000 está disponible
6. [ ] Node.js versión 18+
7. [ ] Dependencias instaladas correctamente

**Comandos útiles:**
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Ver logs detallados
npm run dev

# Verificar versión de Node
node --version

# Verificar variables de entorno
cat .env
```

---

## 📧 Soporte

¿Necesitas ayuda?

- 📖 Revisa `INSTALACION.md`
- 🔌 Consulta `API_EXAMPLES.md`
- 💬 Abre un issue en GitHub
- 📧 Contacta al equipo

---

**¡Felicidades! Si completaste todos los pasos, tu plataforma está lista para usar** 🎉
