# Backend API

Documentación de uso de la API y pasos para ejecutar el servidor.

## Dependencias
- express: framework HTTP
- morgan: logging de peticiones HTTP
- nodemon: recarga automática en desarrollo

## Cómo ejecutar
1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Ejecutar en desarrollo:
   ```bash
   npm run dev
   ```
3. Probar health-check:
   ```bash
   curl -i http://localhost:3000/checkhealth
   ```

## Flujo de archivos
- `index.js`: punto de entrada. Importa `src/app/app.js` y hace `app.listen(3000)`.
- `src/app/app.js`: crea `express()`, registra middlewares (`morgan`, `express.json`, personalizado) y monta `router` en `'/'`.
- `src/routes/routes.js`: define endpoints HTTP y usa controladores.
- `src/controllers/controllers.js`: implementa funciones manejadoras (stubs actuales).

## Endpoints de la API

### Health
- GET `/checkhealth`
  - Respuesta: `200 OK` con cuerpo `ok`.
  - Ejemplo:
    ```bash
    curl -i http://localhost:3000/checkhealth
    ```

### Autenticación
- POST `/login`
  - Body JSON:
    ```json
    { "email": "user@example.com", "password": "secret" }
    ```
  - Respuesta: `200 OK` (stub) `{ token, user }`.
  - Ejemplo:
    ```bash
    curl -i -X POST http://localhost:3000/login \
      -H 'Content-Type: application/json' \
      -d '{"email":"user@example.com","password":"secret"}'
    ```

### Usuarios (CRUD)
- POST `/user` — Crear usuario
  - Body JSON:
    ```json
    { "name": "Juan", "email": "juan@example.com", "password": "secreto" }
    ```
  - Respuesta: `201 Created` (stub).
  - Ejemplo:
    ```bash
    curl -i -X POST http://localhost:3000/user \
      -H 'Content-Type: application/json' \
      -d '{"name":"Juan","email":"juan@example.com","password":"secreto"}'
    ```

- GET `/user` — Listar usuarios
  - Respuesta: `200 OK` (stub).
  - Ejemplo:
    ```bash
    curl -i http://localhost:3000/user
    ```

- GET `/user/:id` — Obtener usuario por ID
  - Path param: `id`.
  - Ejemplo:
    ```bash
    curl -i http://localhost:3000/user/123
    ```

- PUT `/user/:id` — Actualizar usuario por ID
  - Body JSON (parcial):
    ```json
    { "name": "Juan Actualizado" }
    ```
  - Ejemplo:
    ```bash
    curl -i -X PUT http://localhost:3000/user/123 \
      -H 'Content-Type: application/json' \
      -d '{"name":"Juan Actualizado"}'
    ```

- DELETE `/user/:id` — Eliminar usuario por ID
  - Respuesta: `204 No Content` (stub).
  - Ejemplo:
    ```bash
    curl -i -X DELETE http://localhost:3000/user/123
    ```

## Notas de implementación
- Los controladores actuales son stubs; integra base de datos/servicios en `src/controllers/controllers.js`.
- Maneja errores con `next(err)` y middlewares de error si agregas validación/autenticación reales.
