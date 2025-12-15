const express = require('express');
const router = express.Router();
const {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet
} = require('../controllers/petController');

// GET /pets - Obtener todas las mascotas
router.get('/', getAllPets);

// GET /pets/:id - Obtener una mascota por ID
router.get('/:id', getPetById);

// POST /pets - Crear una nueva mascota
router.post('/', createPet);

// PUT /pets/:id - Actualizar una mascota existente
router.put('/:id', updatePet);

// DELETE /pets/:id - Eliminar una mascota
router.delete('/:id', deletePet);

module.exports = router;
