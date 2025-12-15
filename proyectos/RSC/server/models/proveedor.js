const mongoose = require('mongoose');

const proveedorSchema = new mongoose.Schema({
    usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El ID de usuario es obligatorio'],
        unique: true
    },
    nombre_comercial: {
        type: String,
        trim: true,
        maxlength: [100, 'El nombre comercial no puede exceder los 100 caracteres']
    },
    biografia: {
        type: String,
        trim: true,
        maxlength: [1000, 'La biografía no puede exceder los 1000 caracteres']
    },
    foto_perfil: {
        url: {
            type: String
        },
        public_id: {
            type: String
        }
    },
    fotos_galeria: [{
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
    especialidades: [{
        type: String,
        trim: true
    }],
    experiencia_años: {
        type: Number,
        min: [0, 'Los años de experiencia no pueden ser negativos'],
        max: [60, 'Los años de experiencia no pueden exceder 60']
    },
    certificaciones: [{
        nombre: {
            type: String,
            trim: true
        },
        institucion: {
            type: String,
            trim: true
        },
        año: {
            type: Number
        },
        documento_url: {
            type: String
        }
    }],
    contacto: {
        telefono: {
            type: String,
            trim: true
        },
        whatsapp: {
            type: String,
            trim: true
        },
        email_contacto: {
            type: String,
            trim: true,
            lowercase: true
        },
        sitio_web: {
            type: String,
            trim: true
        },
        redes_sociales: {
            instagram: String,
            facebook: String,
            twitter: String,
            tiktok: String
        }
    },
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
    servicios_ofrecidos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Servicio'
    }],
    verificado: {
        type: Boolean,
        default: false
    },
    verificacion: {
        documento_identidad: {
            verificado: {
                type: Boolean,
                default: false
            },
            fecha_verificacion: Date
        },
        email: {
            verificado: {
                type: Boolean,
                default: false
            },
            fecha_verificacion: Date
        },
        telefono: {
            verificado: {
                type: Boolean,
                default: false
            },
            fecha_verificacion: Date
        }
    },
    estadisticas: {
        total_servicios: {
            type: Number,
            default: 0
        },
        servicios_activos: {
            type: Number,
            default: 0
        },
        total_valoraciones: {
            type: Number,
            default: 0
        },
        promedio_valoracion: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        total_vistas: {
            type: Number,
            default: 0
        },
        total_contactos: {
            type: Number,
            default: 0
        }
    },
    activo: {
        type: Boolean,
        default: true
    },
    destacado: {
        type: Boolean,
        default: false
    },
    fecha_ultimo_servicio: {
        type: Date
    }
}, {
    timestamps: true,
    collection: 'Proveedores'
});

// Índices para búsquedas eficientes
proveedorSchema.index({ usuario_id: 1 });
proveedorSchema.index({ activo: 1 });
proveedorSchema.index({ verificado: 1 });
proveedorSchema.index({ destacado: 1 });
proveedorSchema.index({ 'estadisticas.promedio_valoracion': -1 });
proveedorSchema.index({ 'ubicacion.ciudad': 1 });
proveedorSchema.index({ 'ubicacion.region': 1 });
proveedorSchema.index({ especialidades: 1 });

// Índice de texto para búsqueda
proveedorSchema.index({ nombre_comercial: 'text', biografia: 'text', especialidades: 'text' });

// Método para actualizar estadísticas
proveedorSchema.methods.actualizarEstadisticas = async function() {
    const Servicio = mongoose.model('Servicio');
    
    // Contar servicios
    const servicios = await Servicio.find({ proveedor_id: this.usuario_id });
    this.estadisticas.total_servicios = servicios.length;
    this.estadisticas.servicios_activos = servicios.filter(s => s.activo).length;
    
    // Calcular promedio de valoraciones
    let totalValoraciones = 0;
    let sumaValoraciones = 0;
    let totalVistas = 0;
    let totalContactos = 0;
    
    servicios.forEach(servicio => {
        totalValoraciones += servicio.total_valoraciones;
        sumaValoraciones += servicio.promedio_valoracion * servicio.total_valoraciones;
        totalVistas += servicio.vistas;
        totalContactos += servicio.contactos;
    });
    
    this.estadisticas.total_valoraciones = totalValoraciones;
    this.estadisticas.promedio_valoracion = totalValoraciones > 0 ? sumaValoraciones / totalValoraciones : 0;
    this.estadisticas.total_vistas = totalVistas;
    this.estadisticas.total_contactos = totalContactos;
    
    // Actualizar fecha del último servicio
    if (servicios.length > 0) {
        const serviciosOrdenados = servicios.sort((a, b) => b.createdAt - a.createdAt);
        this.fecha_ultimo_servicio = serviciosOrdenados[0].createdAt;
    }
};

module.exports = mongoose.model('Proveedor', proveedorSchema);
