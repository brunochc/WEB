const express = require('express');
const mongoose = require('mongoose');
const petRoutes = require('./routes/petRoutes');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Conectar a MongoDB (opciones deprecated removidas en Driver v4)
mongoose.connect('mongodb://127.0.0.1:27017/mascotasdb')
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: '🐾 ¡Bienvenido a la API de Mascotas Virtuales!',
    endpoints: {
      getAllPets: 'GET /pets',
      getPetById: 'GET /pets/:id',
      createPet: 'POST /pets',
      updatePet: 'PUT /pets/:id',
      deletePet: 'DELETE /pets/:id'
    }
  });
});

// Rutas de mascotas
app.use('/pets', petRoutes);

// ✅ CORRECCIÓN: Manejar rutas no encontradas (sin comodín o con patrón correcto)
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
