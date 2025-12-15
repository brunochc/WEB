const express = require('express');
const router = express.Router();
const servicioController = require('../controllers/servicioController');
const protect = require('../middleware/auth');
const { uploadMultiple, handleMulterError } = require('../middleware/upload');

// Debug completo
console.log('=== DEBUG SERVICIO ROUTES ===');
console.log('servicioController:', typeof servicioController);
console.log('crearServicio:', typeof servicioController.crearServicio);
console.log('protect:', typeof protect);
console.log('uploadMultiple:', typeof uploadMultiple);
console.log('handleMulterError:', typeof handleMulterError);

// Verificar cada método individualmente
const methods = [
    'obtenerServicios',
    'obtenerServicioPorId', 
    'crearServicio',
    'obtenerMisServicios',
    'actualizarServicio',
    'eliminarServicio',
    'eliminarFotoServicio',
    'agregarValoracion',
    'registrarContacto'
];

methods.forEach(method => {
    console.log(`${method}:`, typeof servicioController[method]);
});

console.log('=== INICIANDO RUTAS ===');

// Rutas públicas
console.log('1. Configurando GET /');
router.get('/', servicioController.obtenerServicios);
console.log('2. Configurando GET /:id');
router.get('/:id', servicioController.obtenerServicioPorId);

// Rutas protegidas
console.log('3. Configurando POST / - ESTA ES LA LÍNEA 16');
router.post(
    '/',
    protect,
    uploadMultiple,
    handleMulterError,
    servicioController.crearServicio
);
console.log('4. POST / configurado');

console.log('5. Configurando GET /mis-servicios/lista');
router.get(
    '/mis-servicios/lista',
    protect,
    servicioController.obtenerMisServicios
);

console.log('6. Configurando PUT /:id');
router.put(
    '/:id',
    protect,
    uploadMultiple,
    handleMulterError,
    servicioController.actualizarServicio
);

console.log('7. Configurando DELETE /:id');
router.delete(
    '/:id',
    protect,
    servicioController.eliminarServicio
);

console.log('8. Configurando DELETE /:id/fotos/:fotoId');
router.delete(
    '/:id/fotos/:fotoId',
    protect,
    servicioController.eliminarFotoServicio
);

console.log('9. Configurando POST /:id/valoraciones');
router.post(
    '/:id/valoraciones',
    protect,
    servicioController.agregarValoracion
);

console.log('10. Configurando POST /:id/contacto');
router.post(
    '/:id/contacto',
    protect,
    servicioController.registrarContacto
);

console.log('=== TODAS LAS RUTAS CONFIGURADAS ===');
module.exports = router;