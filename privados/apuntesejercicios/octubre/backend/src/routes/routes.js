/**
 * Archivo: src/routes/routes.js
 * Rol: Define las rutas HTTP de la API utilizando un Router de Express.
 * Origen/Importaciones:
 *   - `express` para crear `Router()`
 *   - `../controllers/controllers` para los manejadores de cada endpoint
 * Exporta:
 *   - `router` montado en `app` desde `src/app/app.js`.
 */
const router = require('express').Router()
const {
    registerNewUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getUserById,
    loginUser,
} = require('../controllers/controllers')

/**
 * GET /checkhealth
 * Health check simple del servicio.
 * Responde 200 con texto 'ok'.
 */
router.get('/checkhealth', (req, res) => {
    res.send('ok')
})

/**
 * POST /login
 * Autenticación de usuario.
 * Body esperado: { email, password }
 * Respuesta: token / info de usuario (placeholder en stub).
 */
router.post('/login', loginUser)

// User routes - API REST estándar
/**
 * POST /user
 * Crea un usuario nuevo.
 * Body: JSON con datos del usuario.
 */
router.post('/user', registerNewUser)

/**
 * GET /user
 * Lista todos los usuarios.
 */
router.get('/user', getAllUsers)

/**
 * GET /user/:id
 * Obtiene un usuario por su ID.
 * Params: id (string|number)
 */
router.get('/user/:id', getUserById)

/**
 * PUT /user/:id
 * Actualiza un usuario por su ID.
 * Params: id
 * Body: JSON con campos a actualizar.
 */
router.put('/user/:id', updateUser)

/**
 * DELETE /user/:id
 * Elimina un usuario por su ID.
 * Params: id
 */
router.delete('/user/:id', deleteUser)

module.exports = router