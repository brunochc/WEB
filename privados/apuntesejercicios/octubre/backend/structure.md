# Manejo y registro de usuarios
=============================

## CRUD de usuarios
----------------

Entidades:
    - usuarios
    - roles
    - permisos

###ubicaciones
    app - express()
    models - datos de la entidad
    controllers - funciones controladoras
    routes - rutas de la api
    services - servicios de la api
    database - conexion a la base de datos
    


> Nota: La documentación de uso (cómo ejecutar, endpoints y ejemplos) se movió a `README.md`.

## Diseño / Arquitectura
------------------------
- `app` — instancia de `express()` y registro de middlewares.
- `routes` — capa de ruteo HTTP y validaciones superficiales.
- `controllers` — orquestación de casos de uso; invocan servicios/repositorios.
- `services` — lógica de negocio reutilizable.
- `models` — estructuras/DTOs y validación de datos (opcional).
- `database` — conexión y acceso a datos (repositorios/DAOs).

### Flujo de petición
1. Cliente realiza request HTTP.
2. `app` aplica middlewares globales (logging, parseo JSON, auth si aplica).
3. `routes` dirige la request al controlador correspondiente.
4. `controllers` validan/request y delegan en `services`.
5. `services` interactúan con `database` y devuelven resultados.
6. `controllers` formatean la respuesta HTTP.

### Extensiones futuras
- Middleware de manejo de errores centralizado (`app.use((err, req, res, next) => ...)`).
- Validación de esquemas (por ejemplo, `zod`/`joi`) en la capa de rutas.
- Autenticación y autorización (JWT, roles/permisos). 

