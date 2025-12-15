const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema({
    proveedor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El ID del proveedor es obligatorio']
    },
    titulo: {
        type: String,
        required: [true, 'El título del servicio es obligatorio'],
        trim: true,
        maxlength: [100, 'El título no puede exceder los 100 caracteres']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        trim: true,
        maxlength: [2000, 'La descripción no puede exceder los 2000 caracteres']
    },
    categoria: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        enum: ['belleza', 'masajes', 'fitness', 'terapias', 'entretenimiento', 'otros'],
        default: 'otros'
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    moneda: {
        type: String,
        default: 'CLP',
        enum: ['CLP', 'USD', 'EUR']
    },
    fotos: [{
        url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            trim: true,
            maxlength: [200, 'La descripción de la foto no puede exceder los 200 caracteres']
        }
    }],
    ubicacion: {
        ciudad: {
            type: String,
            trim: true
        },
        region: {
            type: String,
            trim: true
        },
        direccion: {
            type: String,
            trim: true
        },
        coordenadas: {
            lat: Number,
            lng: Number
        }
    },
    disponibilidad: {
        dias: [{
            type: String,
            enum: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']
        }],
        horario_inicio: {
            type: String,
            trim: true
        },
        horario_fin: {
            type: String,
            trim: true
        }
    },
    duracion_estimada: {
        type: Number, // en minutos
        min: [0, 'La duración no puede ser negativa']
    },
    activo: {
        type: Boolean,
        default: true
    },
    verificado: {
        type: Boolean,
        default: false
    },
    valoraciones: [{
        usuario_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario'
        },
        puntuacion: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        comentario: {
            type: String,
            trim: true,
            maxlength: [500, 'El comentario no puede exceder los 500 caracteres']
        },
        fecha: {
            type: Date,
            default: Date.now
        }
    }],
    promedio_valoracion: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    total_valoraciones: {
        type: Number,
        default: 0,
        min: 0
    },
    vistas: {
        type: Number,
        default: 0,
        min: 0
    },
    contactos: {
        type: Number,
        default: 0,
        min: 0
    }
}, {
    timestamps: true,
    collection: 'Servicios'
});

// Índices para búsquedas eficientes
servicioSchema.index({ proveedor_id: 1 });
servicioSchema.index({ categoria: 1 });
servicioSchema.index({ activo: 1 });
servicioSchema.index({ verificado: 1 });
servicioSchema.index({ promedio_valoracion: -1 });
servicioSchema.index({ createdAt: -1 });
servicioSchema.index({ 'ubicacion.ciudad': 1 });
servicioSchema.index({ 'ubicacion.region': 1 });
servicioSchema.index({ precio: 1 });

// Índice de texto para búsqueda por título y descripción
servicioSchema.index({ titulo: 'text', descripcion: 'text' });

// Método para calcular el promedio de valoraciones
servicioSchema.methods.calcularPromedioValoracion = function() {
    if (this.valoraciones.length === 0) {
        this.promedio_valoracion = 0;
        this.total_valoraciones = 0;
        return;
    }
    
    const suma = this.valoraciones.reduce((acc, val) => acc + val.puntuacion, 0);
    this.promedio_valoracion = suma / this.valoraciones.length;
    this.total_valoraciones = this.valoraciones.length;
};

// Middleware para actualizar el promedio antes de guardar
servicioSchema.pre('save', function(next) {
    if (this.isModified('valoraciones')) {
        this.calcularPromedioValoracion();
    }
    next();
});

module.exports = mongoose.model('Servicio', servicioSchema);
