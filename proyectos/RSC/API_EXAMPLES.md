# 🔌 Ejemplos de API - Plataforma de Servicios

## 📋 Tabla de Contenidos

1. [Autenticación](#autenticación)
2. [Proveedores](#proveedores)
3. [Servicios](#servicios)
4. [Valoraciones](#valoraciones)
5. [Búsquedas y Filtros](#búsquedas-y-filtros)

---

## 🔐 Autenticación

### Registrar Usuario

```http
POST /api/auth/register
Content-Type: application/json

{
  "nombre": "María González",
  "email": "maria@example.com",
  "contraseña": "password123",
  "rut": "12345678-9",
  "rol": "cliente"
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "nombre": "María González",
    "email": "maria@example.com",
    "rol": "cliente"
  }
}
```

### Iniciar Sesión

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "maria@example.com",
  "contraseña": "password123"
}
```

**Respuesta:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "nombre": "María González",
    "email": "maria@example.com",
    "rol": "cliente"
  }
}
```

---

## 👨‍💼 Proveedores

### Crear Perfil de Proveedor

```http
POST /api/proveedores/perfil
Authorization: Bearer <token>
Content-Type: multipart/form-data

nombre_comercial: "Spa Wellness"
biografia: "Especialistas en masajes terapéuticos y tratamientos de relajación con más de 10 años de experiencia"
especialidades: ["masajes", "terapias", "spa"]
experiencia_años: 10
contacto: {
  "telefono": "+56912345678",
  "whatsapp": "+56912345678",
  "email_contacto": "contacto@spawellness.cl",
  "redes_sociales": {
    "instagram": "@spawellness",
    "facebook": "spawellness"
  }
}
ubicacion: {
  "ciudad": "Santiago",
  "region": "Metropolitana",
  "direccion": "Av. Providencia 1234"
}
foto_perfil: [archivo.jpg]
fotos_galeria: [foto1.jpg, foto2.jpg, foto3.jpg]
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Perfil de proveedor creado exitosamente",
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j2",
    "usuario_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "nombre_comercial": "Spa Wellness",
    "biografia": "Especialistas en masajes...",
    "foto_perfil": {
      "url": "https://res.cloudinary.com/...",
      "public_id": "proveedores/perfiles/..."
    },
    "fotos_galeria": [
      {
        "url": "https://res.cloudinary.com/...",
        "public_id": "proveedores/galerias/...",
        "_id": "..."
      }
    ],
    "verificado": false,
    "estadisticas": {
      "total_servicios": 0,
      "promedio_valoracion": 0
    }
  }
}
```

### Obtener Mi Perfil

```http
GET /api/proveedores/mi-perfil/datos
Authorization: Bearer <token>
```

### Listar Todos los Proveedores

```http
GET /api/proveedores?ciudad=Santiago&ordenar_por=valoracion&pagina=1&limite=12
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "nombre_comercial": "Spa Wellness",
      "biografia": "...",
      "foto_perfil": {
        "url": "https://res.cloudinary.com/..."
      },
      "estadisticas": {
        "total_servicios": 5,
        "promedio_valoracion": 4.8,
        "total_valoraciones": 23
      },
      "ubicacion": {
        "ciudad": "Santiago",
        "region": "Metropolitana"
      }
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

### Obtener Proveedor por ID

```http
GET /api/proveedores/65f1a2b3c4d5e6f7g8h9i0j2
```

### Actualizar Perfil

```http
PUT /api/proveedores/perfil
Authorization: Bearer <token>
Content-Type: multipart/form-data

biografia: "Nueva biografía actualizada"
experiencia_años: 12
fotos_galeria: [nuevafoto.jpg]
```

### Eliminar Foto de Galería

```http
DELETE /api/proveedores/galeria/65f1a2b3c4d5e6f7g8h9i0j3
Authorization: Bearer <token>
```

---

## 🛍️ Servicios

### Crear Servicio

```http
POST /api/servicios
Authorization: Bearer <token>
Content-Type: multipart/form-data

titulo: "Masaje Relajante 60 minutos"
descripcion: "Masaje terapéutico de cuerpo completo que combina técnicas de relajación profunda. Ideal para aliviar el estrés y tensiones musculares."
categoria: "masajes"
precio: 35000
moneda: "CLP"
duracion_estimada: 60
ubicacion: {
  "ciudad": "Santiago",
  "region": "Metropolitana",
  "direccion": "Av. Providencia 1234"
}
disponibilidad: {
  "dias": ["lunes", "martes", "miercoles", "jueves", "viernes"],
  "horario_inicio": "09:00",
  "horario_fin": "20:00"
}
imagenes: [foto1.jpg, foto2.jpg, foto3.jpg]
foto_descripcion_0: "Sala de masajes"
foto_descripcion_1: "Ambiente relajante"
foto_descripcion_2: "Productos utilizados"
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Servicio creado exitosamente",
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j4",
    "proveedor_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "titulo": "Masaje Relajante 60 minutos",
    "descripcion": "Masaje terapéutico...",
    "categoria": "masajes",
    "precio": 35000,
    "moneda": "CLP",
    "fotos": [
      {
        "url": "https://res.cloudinary.com/...",
        "public_id": "servicios/...",
        "descripcion": "Sala de masajes",
        "_id": "..."
      }
    ],
    "promedio_valoracion": 0,
    "total_valoraciones": 0,
    "vistas": 0,
    "contactos": 0,
    "activo": true,
    "verificado": false,
    "createdAt": "2024-10-16T23:00:00.000Z"
  }
}
```

### Listar Servicios con Filtros

```http
GET /api/servicios?categoria=masajes&ciudad=Santiago&precio_min=20000&precio_max=50000&ordenar_por=valoracion&pagina=1&limite=12
```

**Parámetros disponibles:**
- `categoria`: belleza, masajes, fitness, terapias, entretenimiento, otros
- `ciudad`: nombre de la ciudad
- `region`: nombre de la región
- `precio_min`: precio mínimo
- `precio_max`: precio máximo
- `busqueda`: texto libre (busca en título y descripción)
- `ordenar_por`: precio_asc, precio_desc, valoracion, populares
- `pagina`: número de página
- `limite`: resultados por página

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "titulo": "Masaje Relajante 60 minutos",
      "descripcion": "...",
      "categoria": "masajes",
      "precio": 35000,
      "fotos": [
        {
          "url": "https://res.cloudinary.com/...",
          "descripcion": "Sala de masajes"
        }
      ],
      "proveedor_id": {
        "nombre": "María González",
        "email": "maria@example.com"
      },
      "promedio_valoracion": 4.8,
      "total_valoraciones": 15,
      "vistas": 234,
      "ubicacion": {
        "ciudad": "Santiago",
        "region": "Metropolitana"
      }
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

### Obtener Servicio por ID

```http
GET /api/servicios/65f1a2b3c4d5e6f7g8h9i0j4
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j4",
    "titulo": "Masaje Relajante 60 minutos",
    "descripcion": "Masaje terapéutico...",
    "categoria": "masajes",
    "precio": 35000,
    "fotos": [...],
    "proveedor_id": {
      "nombre": "María González",
      "email": "maria@example.com"
    },
    "valoraciones": [
      {
        "_id": "...",
        "usuario_id": {
          "nombre": "Juan Pérez"
        },
        "puntuacion": 5,
        "comentario": "Excelente servicio",
        "fecha": "2024-10-15T10:00:00.000Z"
      }
    ],
    "promedio_valoracion": 4.8,
    "total_valoraciones": 15,
    "vistas": 235,
    "contactos": 12
  }
}
```

### Obtener Mis Servicios

```http
GET /api/servicios/mis-servicios/lista
Authorization: Bearer <token>
```

### Actualizar Servicio

```http
PUT /api/servicios/65f1a2b3c4d5e6f7g8h9i0j4
Authorization: Bearer <token>
Content-Type: multipart/form-data

titulo: "Masaje Relajante Premium 90 minutos"
precio: 45000
duracion_estimada: 90
imagenes: [nuevafoto.jpg]
```

### Eliminar Servicio

```http
DELETE /api/servicios/65f1a2b3c4d5e6f7g8h9i0j4
Authorization: Bearer <token>
```

### Eliminar Foto de Servicio

```http
DELETE /api/servicios/65f1a2b3c4d5e6f7g8h9i0j4/fotos/65f1a2b3c4d5e6f7g8h9i0j5
Authorization: Bearer <token>
```

---

## ⭐ Valoraciones

### Agregar Valoración a Servicio

```http
POST /api/servicios/65f1a2b3c4d5e6f7g8h9i0j4/valoraciones
Authorization: Bearer <token>
Content-Type: application/json

{
  "puntuacion": 5,
  "comentario": "Excelente servicio, muy profesional y el ambiente es muy relajante. Totalmente recomendado."
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Valoración agregada exitosamente",
  "data": {
    "_id": "...",
    "titulo": "Masaje Relajante 60 minutos",
    "valoraciones": [
      {
        "_id": "...",
        "usuario_id": "...",
        "puntuacion": 5,
        "comentario": "Excelente servicio...",
        "fecha": "2024-10-16T23:00:00.000Z"
      }
    ],
    "promedio_valoracion": 4.9,
    "total_valoraciones": 16
  }
}
```

**Restricciones:**
- Solo clientes pueden valorar (no el propio proveedor)
- Un usuario solo puede valorar un servicio una vez
- Puntuación: 1-5 estrellas

### Registrar Contacto

```http
POST /api/servicios/65f1a2b3c4d5e6f7g8h9i0j4/contacto
Authorization: Bearer <token>
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Contacto registrado"
}
```

---

## 🔍 Búsquedas y Filtros

### Buscar Servicios por Texto

```http
GET /api/servicios?busqueda=masaje+relajante
```

### Buscar por Categoría y Ciudad

```http
GET /api/servicios?categoria=masajes&ciudad=Santiago
```

### Buscar por Rango de Precio

```http
GET /api/servicios?precio_min=20000&precio_max=40000
```

### Ordenar por Valoración

```http
GET /api/servicios?ordenar_por=valoracion
```

### Ordenar por Popularidad (vistas)

```http
GET /api/servicios?ordenar_por=populares
```

### Ordenar por Precio

```http
GET /api/servicios?ordenar_por=precio_asc
GET /api/servicios?ordenar_por=precio_desc
```

### Búsqueda Compleja

```http
GET /api/servicios?categoria=masajes&ciudad=Santiago&precio_min=25000&precio_max=50000&ordenar_por=valoracion&pagina=1&limite=20
```

### Buscar Proveedores Verificados

```http
GET /api/proveedores?verificado=true&ciudad=Santiago
```

### Buscar Proveedores por Especialidad

```http
GET /api/proveedores?especialidad=masajes&ordenar_por=valoracion
```

---

## 📊 Estadísticas

### Actualizar Estadísticas de Proveedor

```http
POST /api/proveedores/estadisticas/actualizar
Authorization: Bearer <token>
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Estadísticas actualizadas",
  "data": {
    "total_servicios": 5,
    "servicios_activos": 4,
    "total_valoraciones": 23,
    "promedio_valoracion": 4.8,
    "total_vistas": 1234,
    "total_contactos": 89
  }
}
```

### Obtener Servicios de un Proveedor

```http
GET /api/proveedores/65f1a2b3c4d5e6f7g8h9i0j2/servicios
```

---

## 🔑 Notas Importantes

### Headers Requeridos

Para rutas protegidas, siempre incluye:
```
Authorization: Bearer <tu_token_jwt>
```

### Content-Type

- **JSON:** `Content-Type: application/json`
- **Form Data (con archivos):** `Content-Type: multipart/form-data`

### Códigos de Estado HTTP

- `200` - OK
- `201` - Creado
- `400` - Bad Request (datos inválidos)
- `401` - No autorizado (sin token o token inválido)
- `403` - Prohibido (sin permisos)
- `404` - No encontrado
- `500` - Error del servidor

### Límites

- **Tamaño de imagen:** 5MB máximo
- **Número de imágenes por servicio:** 10 máximo
- **Número de imágenes en galería:** 10 máximo
- **Formatos permitidos:** JPEG, JPG, PNG, GIF, WEBP

---

## 🧪 Testing con cURL

### Registrar Usuario
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Test User","email":"test@example.com","contraseña":"password123","rut":"12345678-9","rol":"cliente"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","contraseña":"password123"}'
```

### Listar Servicios
```bash
curl -X GET "http://localhost:5000/api/servicios?categoria=masajes&ciudad=Santiago"
```

### Crear Servicio con Imagen
```bash
curl -X POST http://localhost:5000/api/servicios \
  -H "Authorization: Bearer <token>" \
  -F "titulo=Masaje Relajante" \
  -F "descripcion=Masaje terapéutico" \
  -F "categoria=masajes" \
  -F "precio=35000" \
  -F "imagenes=@/ruta/a/imagen.jpg"
```

---

¿Necesitas más ejemplos? Consulta la documentación completa en `README_SERVICIOS.md`
