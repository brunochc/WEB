const mongoose = require('mongoose');

/**
 * Conexión a MongoDB Local (sin opciones deprecadas)
 */
const connectDB = async () => {
  try {
    // Conexión a MongoDB local
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/miapp');

    console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
    console.log(`📊 Base de datos: ${conn.connection.name}`);
    
    return conn;
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;