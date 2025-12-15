const proveedorApproval = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    // Permitir si ya es rol proveedor o admin
    if (req.user.rol === 'proveedor' || req.user.rol === 'administrador') {
      return next();
    }

    const estadoSolicitud = req.user?.solicitudProveedor?.estado;
    if (estadoSolicitud !== 'aprobado') {
      return res.status(403).json({
        message: 'Se requiere aprobación de administrador para operar como proveedor'
      });
    }

    return next();
  } catch (err) {
    return res.status(500).json({ message: 'Error en validación de aprobación', error: err.message });
  }
};

module.exports = proveedorApproval;
