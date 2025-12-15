const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida']
  },
  category: {
    type: String,
    required: true,
    enum: ['plomería', 'electricidad', 'carpintería', 'limpieza', 'jardinería', 'tecnología', 'educación', 'otros']
  },
  price: {
    type: Number,
    required: true
  },
  priceType: {
    type: String,
    enum: ['por_hora', 'fijo', 'a_convenir'],
    default: 'por_hora'
  },
  images: [String],
  location: {
    city: String,
    state: String,
    country: String
  },
  availability: {
    type: String,
    enum: ['disponible', 'ocupado', 'pausado'],
    default: 'disponible'
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewsCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Service', serviceSchema);
