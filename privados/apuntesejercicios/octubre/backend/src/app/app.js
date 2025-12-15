/**
 * Archivo: src/app/app.js
 * Rol: Configura y exporta la instancia principal de Express.
 * Origen/Importaciones:
 *   - `express` (framework)
 *   - `morgan` (middleware de logging)
 *   - `../routes/routes` (router de la API)
 * Función:
 *   - Registrar middlewares globales (morgan, express.json, personalizados).
 *   - Montar el router principal en '/'.
 * Exporta:
 *   - `app` para que `index.js` inicie el servidor.
 */
const express = require('express')
const app = express()

//app(expres), 
const router = require('../routes/routes')
//npm i morgan --> para ver las peticiones
const morgan = require('morgan')
//Middleware --> en el medio de la peticion
//middleware --> propios ()
//middleware --> de express(express.json())
//middleware --> de terceros(morgan)
//middleware --> personalizados()

//express.json() --> para parsear el body de la peticion

/**
 * Middleware de logging HTTP.
 * @see https://www.npmjs.com/package/morgan
 */
app.use(morgan('dev'))

/**
 * Middleware de parseo JSON para el cuerpo de las requests.
 * Convierte `req.body` en objeto cuando el Content-Type es `application/json`.
 */
app.use(express.json())

/**
 * Middleware personalizado de ejemplo.
 * Registra una traza y continúa con la cadena de middlewares.
 */
app.use((req,res, next)=>{
    console.log("ingresando al middleware personalizado")
    next()
})

/**
 * Monta el router principal en la ruta raíz.
 * Todas las rutas definidas en `src/routes/routes.js` cuelgan de '/'.
 */
app.use('/', router)





/**
 * Manejo específico de errores de JSON malformado.
 * Si el body no es un JSON válido, responde con 400 y un mensaje claro.
 */
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON', error: err.message })
  }
  next(err)
})

/**
 * Exporta la instancia de Express para ser utilizada por `index.js`.
 */
module.exports = app
