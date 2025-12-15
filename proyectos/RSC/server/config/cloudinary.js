const cloudinary = require('cloudinary').v2;

// Configurar Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Sube una imagen a Cloudinary
 * @param {string} filePath - Ruta del archivo a subir
 * @param {string} folder - Carpeta en Cloudinary donde se guardará
 * @returns {Promise<Object>} - Objeto con url y public_id
 */
const subirImagen = async (filePath, folder = 'servicios') => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folder,
            resource_type: 'auto',
            transformation: [
                { width: 1200, height: 1200, crop: 'limit' },
                { quality: 'auto:good' },
                { fetch_format: 'auto' }
            ]
        });

        return {
            url: result.secure_url,
            public_id: result.public_id
        };
    } catch (error) {
        console.error('Error al subir imagen a Cloudinary:', error);
        throw new Error('Error al subir la imagen');
    }
};

/**
 * Elimina una imagen de Cloudinary
 * @param {string} publicId - Public ID de la imagen en Cloudinary
 * @returns {Promise<Object>} - Resultado de la eliminación
 */
const eliminarImagen = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error('Error al eliminar imagen de Cloudinary:', error);
        throw new Error('Error al eliminar la imagen');
    }
};

/**
 * Sube múltiples imágenes a Cloudinary
 * @param {Array} files - Array de archivos a subir
 * @param {string} folder - Carpeta en Cloudinary donde se guardarán
 * @returns {Promise<Array>} - Array de objetos con url y public_id
 */
const subirMultiplesImagenes = async (files, folder = 'servicios') => {
    try {
        const uploadPromises = files.map(file => subirImagen(file.path, folder));
        const results = await Promise.all(uploadPromises);
        return results;
    } catch (error) {
        console.error('Error al subir múltiples imágenes:', error);
        throw new Error('Error al subir las imágenes');
    }
};

/**
 * Elimina múltiples imágenes de Cloudinary
 * @param {Array} publicIds - Array de public IDs a eliminar
 * @returns {Promise<Array>} - Array de resultados
 */
const eliminarMultiplesImagenes = async (publicIds) => {
    try {
        const deletePromises = publicIds.map(publicId => eliminarImagen(publicId));
        const results = await Promise.all(deletePromises);
        return results;
    } catch (error) {
        console.error('Error al eliminar múltiples imágenes:', error);
        throw new Error('Error al eliminar las imágenes');
    }
};

module.exports = {
    cloudinary,
    subirImagen,
    eliminarImagen,
    subirMultiplesImagenes,
    eliminarMultiplesImagenes
};


