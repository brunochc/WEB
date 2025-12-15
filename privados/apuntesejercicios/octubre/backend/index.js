/**
 * Archivo: index.js
 * Rol: Punto de entrada del servidor.
 */
const app = require('./src/app/app')
const connectDB = require('./src/config/database')
const port = 3000

/**npm run
 * Función principal para iniciar el servidor
 */
const startServer = async () => {
  try {
    // Conectar a MongoDB primero
    await connectDB();
    
    // Iniciar servidor después de conectar a la BD
    app.listen(port, () => {
      console.log(`🚀 Servidor Express escuchando en puerto ${port}`)
      console.log(`📊 MongoDB conectado: mongodb://127.0.0.1:27017/miapp`)
      console.log(`📍 Health check: http://localhost:${port}/checkhealth`)
    })
  } catch (error) {
    console.error('❌ No se pudo iniciar el servidor:', error)
    process.exit(1)
  }
}

// Iniciar aplicación
startServer();