const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
    maxlength: [50, 'El nombre no puede exceder 50 caracteres']
  },
  species: {
    type: String,
    required: [true, 'La especie es obligatoria'],
    trim: true,
    enum: {
      values: ['Perro', 'Gato', 'Conejo', 'Pájaro', 'Hamster', 'Tortuga', 'Pez', 'Dragón', 'Unicornio'],
      message: 'Especie no válida'
    }
  },
  mood: {
    type: String,
    required: [true, 'El estado de ánimo es obligatorio'],
    trim: true,
    enum: {
      values: ['Feliz', 'Triste', 'Enojado', 'Cansado', 'Emocionado', 'Relajado', 'Hambriento', 'Juguetón'],
      message: 'Estado de ánimo no válido'
    },
    default: 'Feliz'
  },
  age: {
    type: Number,
    required: [true, 'La edad es obligatoria'],
    min: [0, 'La edad no puede ser negativa'],
    max: [100, 'La edad no puede ser mayor a 100']
  }
}, {
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});

// Método para mostrar información de la mascota
petSchema.methods.getInfo = function() {
  return `${this.name} es un ${this.species} de ${this.age} años que se siente ${this.mood}`;
};

module.exports = mongoose.model('Pet', petSchema);
