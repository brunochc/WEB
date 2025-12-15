const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        maxlength: [100, 'El nombre no puede exceder los 100 caracteres']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingrese un email válido']
    },
    contraseña_hash: {
        type: String,
        // No requerido inicialmente - se asignará después de verificación
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    rol: {
        type: String,
        required: true,
        enum: ['administrador', 'proveedor', 'cliente'],
        default: 'cliente'
    },
    estado: {
        type: String,
        enum: ['pendiente_verificacion', 'activo', 'incompleto', 'inactivo'],
        default: 'pendiente_verificacion'
    },
    emailVerificado: {
        type: Boolean,
        default: false
    },
    codigoVerificacion: {
        type: String,
        select: false
    },
    fechaExpiracionCodigo: Date,
    telefono: {
        type: String,
        trim: true
    },
    fecha_registro: {
        type: Date,
        default: Date.now
    },
    activo: {
        type: Boolean,
        default: true
    },
    solicitudProveedor: {
        tipo: {
            type: String,
            enum: ['servicio_tecnico', 'consultoria', 'creativo', null],
            default: null
        },
        estado: {
            type: String,
            enum: ['pendiente', 'en_revision', 'aprobado', 'rechazado', null],
            default: null
        },
        fechaSolicitud: Date,
        documentos: [{
            tipo: String,
            url: String,
            nombre: String
        }],
        reunionProgramada: Date,
        notasAdmin: String
    }
}, {
    timestamps: true,
    collection: 'Usuarios'
});

// Índices
usuarioSchema.index({ email: 1 });
usuarioSchema.index({ rol: 1 });
usuarioSchema.index({ activo: 1 });
usuarioSchema.index({ estado: 1 });
usuarioSchema.index({ emailVerificado: 1 });

module.exports = mongoose.model('Usuario', usuarioSchema);