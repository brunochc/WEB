const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Crear directorio de uploads si no existe
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Generar nombre único para el archivo
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        cb(null, name + '-' + uniqueSuffix + ext);
    }
});

// Filtro para validar tipos de archivo
const fileFilter = (req, file, cb) => {
    // Tipos de archivo permitidos
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, gif, webp)'));
    }
};

// Configuración de multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB máximo por archivo
    },
    fileFilter: fileFilter
});

// Middleware para subir una sola imagen
const uploadSingle = upload.single('imagen');

// Middleware para subir múltiples imágenes (máximo 10)
const uploadMultiple = upload.array('imagenes', 10);

// Middleware para subir campos mixtos
const uploadFields = upload.fields([
    { name: 'foto_perfil', maxCount: 1 },
    { name: 'fotos_galeria', maxCount: 10 },
    { name: 'fotos_servicio', maxCount: 10 }
]);

// Función para eliminar archivo del sistema
const eliminarArchivo = (filePath) => {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};

// Función para eliminar múltiples archivos
const eliminarArchivos = (filePaths) => {
    filePaths.forEach(filePath => {
        eliminarArchivo(filePath);
    });
};

// Middleware de manejo de errores para multer
const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'El archivo es demasiado grande. Tamaño máximo: 5MB'
            });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
                success: false,
                message: 'Demasiados archivos. Máximo permitido: 10'
            });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                success: false,
                message: 'Campo de archivo inesperado'
            });
        }
    }
    
    if (err) {
        return res.status(400).json({
            success: false,
            message: err.message || 'Error al subir el archivo'
        });
    }
    
    next();
};

module.exports = {
    uploadSingle,
    uploadMultiple,
    uploadFields,
    eliminarArchivo,
    eliminarArchivos,
    handleMulterError
};
