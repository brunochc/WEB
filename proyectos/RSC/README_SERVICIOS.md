# 🌟 Plataforma de Servicios - RealScort Chile

## 📝 Descripción

Plataforma web moderna para conectar **proveedores de servicios** con **clientes**. Los proveedores pueden crear perfiles profesionales, publicar servicios con fotos y descripciones detalladas, mientras que los clientes pueden buscar, valorar y contactar servicios.

---

## 🎯 Características Principales

### 👨‍💼 Para Proveedores
- ✅ Crear perfil profesional con foto y biografía
- ✅ Subir múltiples fotos a galería personal
- ✅ Publicar servicios con fotos y descripciones
- ✅ Gestionar precios y disponibilidad
- ✅ Ver estadísticas (vistas, contactos, valoraciones)
- ✅ Agregar certificaciones y experiencia

### 👥 Para Clientes
- ✅ Buscar servicios por categoría, ubicación y precio
- ✅ Ver perfiles de proveedores
- ✅ Valorar servicios (1-5 estrellas)
- ✅ Dejar comentarios y reseñas
- ✅ Contactar proveedores

### 🔐 Sistema de Autenticación
- JWT con roles: **cliente**, **proveedor**, **administrador**
- Protección de rutas según permisos
- Verificación de proveedores

---

## 🗃️ Nuevos Modelos de Datos

### Servicio
```javascript
{
  proveedor_id: ObjectId,
  titulo: String,
  descripcion: String,
  categoria: ['belleza', 'masajes', 'fitness', 'terapias', 'entretenimiento', 'otros'],
  precio: Number,
  moneda: String,
  fotos: [{
    url: String,
    public_id: String,
    descripcion: String
  }],
  ubicacion: {
    ciudad: String,
    region: String,
    direccion: String,
    coordenadas: { lat, lng }
  },
  disponibilidad: {
    dias: [String],
    horario_inicio: String,
    horario_fin: String
  },
  valoraciones: [{
    usuario_id: ObjectId,
    puntuacion: Number,
    comentario: String,
    fecha: Date
  }],
  promedio_valoracion: Number,
  vistas: Number,
  contactos: Number
}
```

### Proveedor
```javascript
{
  usuario_id: ObjectId,
  nombre_comercial: String,
  biografia: String,
  foto_perfil: { url, public_id },
  fotos_galeria: [{ url, public_id, descripcion }],
  especialidades: [String],
  experiencia_años: Number,
  certificaciones: [{
    nombre: String,
    institucion: String,
    año: Number
  }],
  contacto: {
    telefono: String,
    whatsapp: String,
    email_contacto: String,
    redes_sociales: { instagram, facebook, twitter, tiktok }
  },
  estadisticas: {
    total_servicios: Number,
    promedio_valoracion: Number,
    total_vistas: Number,
    total_contactos: Number
  },
  verificado: Boolean
}
```

---

## 🔌 API Endpoints

### Servicios

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/servicios` | Listar servicios con filtros | ❌ |
| GET | `/api/servicios/:id` | Obtener servicio por ID | ❌ |
| POST | `/api/servicios` | Crear nuevo servicio | ✅ |
| PUT | `/api/servicios/:id` | Actualizar servicio | ✅ |
| DELETE | `/api/servicios/:id` | Eliminar servicio | ✅ |
| GET | `/api/servicios/mis-servicios/lista` | Mis servicios | ✅ |
| POST | `/api/servicios/:id/valoraciones` | Agregar valoración | ✅ |
| POST | `/api/servicios/:id/contacto` | Registrar contacto | ✅ |
| DELETE | `/api/servicios/:id/fotos/:fotoId` | Eliminar foto | ✅ |

### Proveedores

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/proveedores` | Listar proveedores | ❌ |
| GET | `/api/proveedores/:id` | Obtener proveedor por ID | ❌ |
| GET | `/api/proveedores/:id/servicios` | Servicios del proveedor | ❌ |
| POST | `/api/proveedores/perfil` | Crear perfil de proveedor | ✅ |
| GET | `/api/proveedores/mi-perfil/datos` | Mi perfil | ✅ |
| PUT | `/api/proveedores/perfil` | Actualizar perfil | ✅ |
| DELETE | `/api/proveedores/galeria/:fotoId` | Eliminar foto galería | ✅ |
| POST | `/api/proveedores/estadisticas/actualizar` | Actualizar estadísticas | ✅ |

---

## 📸 Subida de Imágenes

### Configuración Cloudinary

El sistema utiliza **Cloudinary** para almacenar imágenes. Configura las siguientes variables en `.env`:

```env
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

### Límites de Archivos
- **Tamaño máximo por imagen:** 5MB
- **Formatos permitidos:** JPEG, JPG, PNG, GIF, WEBP
- **Máximo de imágenes por servicio:** 10
- **Máximo de imágenes en galería:** 10

### Transformaciones Automáticas
- Redimensionamiento: máximo 1200x1200px
- Calidad: auto (optimización automática)
- Formato: auto (conversión al mejor formato)

---

## 🔍 Búsqueda y Filtros

### Filtros Disponibles para Servicios
```javascript
GET /api/servicios?categoria=belleza&ciudad=Santiago&precio_min=10000&precio_max=50000&ordenar_por=valoracion
```

**Parámetros:**
- `categoria`: belleza, masajes, fitness, terapias, entretenimiento, otros
- `ciudad`: nombre de la ciudad
- `region`: nombre de la región
- `precio_min`: precio mínimo
- `precio_max`: precio máximo
- `busqueda`: búsqueda de texto en título y descripción
- `ordenar_por`: precio_asc, precio_desc, valoracion, populares
- `pagina`: número de página (default: 1)
- `limite`: resultados por página (default: 12)

### Filtros para Proveedores
```javascript
GET /api/proveedores?ciudad=Santiago&especialidad=masajes&verificado=true&ordenar_por=valoracion
```

---

## 📦 Instalación y Configuración

### 1. Instalar Dependencias

```bash
cd server
npm install
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la carpeta `server/`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/nombre_bd
JWT_SECRET=tu_clave_secreta_jwt
FRONTEND_URL=http://localhost:5173

# Cloudinary
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

### 3. Crear Cuenta en Cloudinary

1. Regístrate en [Cloudinary](https://cloudinary.com/)
2. Obtén tus credenciales del Dashboard
3. Agrégalas al archivo `.env`

### 4. Ejecutar el Servidor

```bash
npm run dev
```

---

## 🧪 Ejemplos de Uso

### Crear un Servicio

```bash
POST /api/servicios
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "titulo": "Masaje Relajante",
  "descripcion": "Masaje terapéutico de 60 minutos...",
  "categoria": "masajes",
  "precio": 25000,
  "moneda": "CLP",
  "ubicacion": "{\"ciudad\":\"Santiago\",\"region\":\"Metropolitana\"}",
  "duracion_estimada": 60,
  "imagenes": [archivo1.jpg, archivo2.jpg]
}
```

### Buscar Servicios

```bash
GET /api/servicios?categoria=masajes&ciudad=Santiago&ordenar_por=valoracion
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "titulo": "Masaje Relajante",
      "descripcion": "...",
      "precio": 25000,
      "fotos": [
        {
          "url": "https://res.cloudinary.com/...",
          "descripcion": "..."
        }
      ],
      "promedio_valoracion": 4.8,
      "total_valoraciones": 15
    }
  ],
  "paginacion": {
    "total": 45,
    "pagina": 1,
    "limite": 12,
    "total_paginas": 4
  }
}
```

### Crear Perfil de Proveedor

```bash
POST /api/proveedores/perfil
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "nombre_comercial": "Spa Relax",
  "biografia": "Especialistas en masajes terapéuticos...",
  "especialidades": "[\"masajes\",\"terapias\"]",
  "experiencia_años": 5,
  "contacto": "{\"telefono\":\"+56912345678\",\"whatsapp\":\"+56912345678\"}",
  "foto_perfil": archivo.jpg,
  "fotos_galeria": [foto1.jpg, foto2.jpg]
}
```

### Agregar Valoración

```bash
POST /api/servicios/:id/valoraciones
Authorization: Bearer <token>
Content-Type: application/json

{
  "puntuacion": 5,
  "comentario": "Excelente servicio, muy profesional"
}
```

---

## 🔒 Seguridad

- ✅ Autenticación JWT
- ✅ Validación de tipos de archivo
- ✅ Límites de tamaño de archivo
- ✅ Sanitización de datos
- ✅ Control de acceso por roles
- ✅ Protección contra CORS
- ✅ Validación de permisos en cada operación

---

## 📊 Índices de Base de Datos

Para optimizar el rendimiento, se crean los siguientes índices:

```javascript
// Servicios
db.Servicios.createIndex({ proveedor_id: 1 });
db.Servicios.createIndex({ categoria: 1 });
db.Servicios.createIndex({ promedio_valoracion: -1 });
db.Servicios.createIndex({ 'ubicacion.ciudad': 1 });
db.Servicios.createIndex({ titulo: 'text', descripcion: 'text' });

// Proveedores
db.Proveedores.createIndex({ usuario_id: 1 });
db.Proveedores.createIndex({ 'estadisticas.promedio_valoracion': -1 });
db.Proveedores.createIndex({ 'ubicacion.ciudad': 1 });
db.Proveedores.createIndex({ nombre_comercial: 'text', biografia: 'text' });
```

---

## 🚀 Próximas Funcionalidades

- [ ] Sistema de mensajería entre clientes y proveedores
- [ ] Reservas y agendamiento online
- [ ] Pagos integrados
- [ ] Notificaciones push
- [ ] Sistema de favoritos
- [ ] Compartir en redes sociales
- [ ] Reportes y estadísticas avanzadas
- [ ] Verificación de identidad con documentos
- [ ] Sistema de promociones y descuentos

---

## 📝 Notas Importantes

1. **Cloudinary es obligatorio** para la funcionalidad de subida de imágenes
2. Los archivos se suben temporalmente al servidor y luego a Cloudinary
3. Las imágenes temporales se eliminan automáticamente después de la subida
4. Los proveedores deben crear su perfil antes de publicar servicios
5. Solo los clientes pueden valorar servicios (no los propios proveedores)
6. Las estadísticas se actualizan automáticamente

---

## 🤝 Contribución

Para contribuir al proyecto:

1. Fork del repositorio
2. Crear rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'feat: agregar nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

---

## 📜 Licencia

MIT License - ver archivo `LICENSE` para más detalles.

---

## 📧 Contacto

Para soporte o consultas:
- Email: soporte@realscort.cl
- Issues: [GitHub Issues](https://github.com/tu-repo/issues)
