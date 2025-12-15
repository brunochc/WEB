const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const User = require('../models/User');
const Proveedor = require('../models/proveedor');
const emailService = require('../services/emailService');

// Listar solicitudes de proveedor
router.get('/solicitudes', auth, roleCheck(['administrador']), async (req, res) => {
  try {
    const { estado } = req.query;
    const match = {};
    if (estado) {
      match['solicitudProveedor.estado'] = estado;
    } else {
      match['solicitudProveedor.estado'] = { $ne: null };
    }

    const solicitudes = await User.find(match)
      .select('nombre email rol solicitudProveedor activo')
      .sort({ 'solicitudProveedor.fechaSolicitud': -1 });

    return res.json({ data: solicitudes });
  } catch (err) {
    console.error('Error listando solicitudes:', err);
    return res.status(500).json({ message: 'Error en el servidor', error: err.message });
  }
});

// Aprobar solicitud de proveedor
router.patch('/solicitudes/:userId/aprobar', auth, roleCheck(['administrador']), async (req, res) => {
  try {
    const { userId } = req.params;
    const { notasAdmin } = req.body || {};

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    user.solicitudProveedor = user.solicitudProveedor || {};
    user.solicitudProveedor.estado = 'aprobado';
    if (notasAdmin) user.solicitudProveedor.notasAdmin = notasAdmin;
    // Opción A: asignar rol proveedor al aprobar
    user.rol = 'proveedor';

    await user.save();

    // Notificar al usuario que complete su perfil
    try { await emailService.enviarAprobacionProveedor(user); } catch (_) {}

    return res.json({ message: 'Solicitud aprobada', solicitud: user.solicitudProveedor });
  } catch (err) {
    console.error('Error aprobando solicitud:', err);
    return res.status(500).json({ message: 'Error en el servidor', error: err.message });
  }
});

// Rechazar solicitud de proveedor
router.patch('/solicitudes/:userId/rechazar', auth, roleCheck(['administrador']), async (req, res) => {
  try {
    const { userId } = req.params;
    const { notasAdmin } = req.body || {};

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    user.solicitudProveedor = user.solicitudProveedor || {};
    user.solicitudProveedor.estado = 'rechazado';
    if (notasAdmin) user.solicitudProveedor.notasAdmin = notasAdmin;

    await user.save();

    return res.json({ message: 'Solicitud rechazada', solicitud: user.solicitudProveedor });
  } catch (err) {
    console.error('Error rechazando solicitud:', err);
    return res.status(500).json({ message: 'Error en el servidor', error: err.message });
  }
});

// Verificar proveedor (bandera en el perfil de proveedor)
router.patch('/verificar/:proveedorId', auth, roleCheck(['administrador']), async (req, res) => {
  try {
    const { proveedorId } = req.params;
    const { verificado } = req.body || {};

    const proveedor = await Proveedor.findByIdAndUpdate(
      proveedorId,
      { verificado: Boolean(verificado) },
      { new: true }
    );

    if (!proveedor) return res.status(404).json({ message: 'Proveedor no encontrado' });

    return res.json({ message: 'Proveedor actualizado', data: proveedor });
  } catch (err) {
    console.error('Error verificando proveedor:', err);
    return res.status(500).json({ message: 'Error en el servidor', error: err.message });
  }
});

module.exports = router;
