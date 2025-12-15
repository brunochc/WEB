const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');
const  protect  = require('../middleware/auth');
const proveedorApproval = require('../middleware/proveedorApproval');
const User = require('../models/User');
const emailService = require('../services/emailService');
const { uploadFields, handleMulterError } = require('../middleware/upload');

// Rutas públicas
router.get('/', proveedorController.obtenerProveedores);
router.get('/:id', proveedorController.obtenerProveedorPorId);
router.get('/:id/servicios', proveedorController.obtenerServiciosProveedor);

// Rutas protegidas
router.post(
    '/perfil',
    protect,
    proveedorApproval,
    uploadFields,
    handleMulterError,
    proveedorController.crearPerfilProveedor
);

router.get(
    '/mi-perfil/datos',
    protect,
    proveedorApproval,
    proveedorController.obtenerMiPerfil
);

router.put(
    '/perfil',
    protect,
    proveedorApproval,
    uploadFields,
    handleMulterError,
    proveedorController.actualizarPerfil
);

router.delete(
    '/galeria/:fotoId',
    protect,
    proveedorApproval,
    proveedorController.eliminarFotoGaleria
);

router.post(
    '/estadisticas/actualizar',
    protect,
    proveedorApproval,
    proveedorController.actualizarEstadisticas
);

// Solicitud para convertirse en proveedor (usuario)
router.post('/solicitudes', protect, async (req, res) => {
    try {
        const { tipo, documentos, notas } = req.body;

        // Debe tener email verificado y estar activo
        if (!req.user.emailVerificado || req.user.estado !== 'activo') {
            return res.status(400).json({ message: 'Debes verificar tu email y completar tu perfil antes de solicitar ser proveedor' });
        }

        // No permitir duplicadas activas
        const estadoActual = req.user?.solicitudProveedor?.estado || null;
        if (['pendiente', 'en_revision', 'aprobado'].includes(estadoActual)) {
            return res.status(400).json({ message: 'Ya tienes una solicitud en proceso o aprobada' });
        }

        const update = {
            solicitudProveedor: {
                tipo: tipo || null,
                estado: 'pendiente',
                fechaSolicitud: new Date(),
                documentos: Array.isArray(documentos) ? documentos : [],
                notasAdmin: notas || undefined
            }
        };

        const usuarioActualizado = await User.findByIdAndUpdate(req.user._id, update, { new: true });

        // Notificar a admin
        try { await emailService.enviarNotificacionAdmin(usuarioActualizado); } catch (_) {}

        return res.status(201).json({ message: 'Solicitud enviada', solicitud: usuarioActualizado.solicitudProveedor });
    } catch (err) {
        console.error('Error creando solicitud de proveedor:', err);
        return res.status(500).json({ message: 'Error en el servidor', error: err.message });
    }
});

// Consultar estado de mi solicitud
router.get('/solicitudes/mi-estado', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('solicitudProveedor rol');
        const habilitadoParaPerfil = user.rol === 'proveedor' || user?.solicitudProveedor?.estado === 'aprobado';
        return res.json({ solicitud: user.solicitudProveedor || null, habilitadoParaPerfil });
    } catch (err) {
        console.error('Error obteniendo estado de solicitud:', err);
        return res.status(500).json({ message: 'Error en el servidor', error: err.message });
    }
});

module.exports = router;
