const Pet = require('../models/Pet');

// Obtener todas las mascotas
const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: pets.length,
      data: pets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener las mascotas: ' + error.message
    });
  }
};

// Obtener una mascota por ID
const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    
    if (!pet) {
      return res.status(404).json({
        success: false,
        error: 'Mascota no encontrada'
      });
    }
    
    res.json({
      success: true,
      data: pet,
      info: pet.getInfo()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener la mascota: ' + error.message
    });
  }
};

// Crear una nueva mascota
const createPet = async (req, res) => {
  try {
    const { name, species, mood, age } = req.body;
    
    // Validar campos requeridos
    if (!name || !species || !age) {
      return res.status(400).json({
        success: false,
        error: 'Nombre, especie y edad son campos obligatorios'
      });
    }
    
    const newPet = new Pet({
      name,
      species,
      mood: mood || 'Feliz',
      age: parseInt(age)
    });
    
    const savedPet = await newPet.save();
    
    res.status(201).json({
      success: true,
      message: 'Mascota creada exitosamente',
      data: savedPet,
      info: savedPet.getInfo()
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Error al crear la mascota: ' + error.message
    });
  }
};

// Actualizar una mascota existente
const updatePet = async (req, res) => {
  try {
    const { name, species, mood, age } = req.body;
    
    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.id,
      { 
        ...(name && { name }),
        ...(species && { species }),
        ...(mood && { mood }),
        ...(age && { age: parseInt(age) })
      },
      { 
        new: true, // Devuelve el documento actualizado
        runValidators: true 
      }
    );
    
    if (!updatedPet) {
      return res.status(404).json({
        success: false,
        error: 'Mascota no encontrada'
      });
    }
    
    res.json({
      success: true,
      message: 'Mascota actualizada exitosamente',
      data: updatedPet,
      info: updatedPet.getInfo()
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Error al actualizar la mascota: ' + error.message
    });
  }
};

// Eliminar una mascota
const deletePet = async (req, res) => {
  try {
    const deletedPet = await Pet.findByIdAndDelete(req.params.id);
    
    if (!deletedPet) {
      return res.status(404).json({
        success: false,
        error: 'Mascota no encontrada'
      });
    }
    
    res.json({
      success: true,
      message: 'Mascota eliminada exitosamente',
      data: deletedPet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al eliminar la mascota: ' + error.message
    });
  }
};

module.exports = {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet
};
