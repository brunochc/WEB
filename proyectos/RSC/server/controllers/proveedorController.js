const Proveedor = require('../models/proveedor');
const Usuario = require('../models/User');
const Servicio = require('../models/servicio');
const { subirImagen, eliminarImagen, subirMultiplesImagenes, eliminarMultiplesImagenes } = require('../config/cloudinary');
const { eliminarArchivo, eliminarArchivos } = require('../middleware/upload');

/**
 * Crear perfil de proveedor
 */
exports.crearPerfilProveedor = async (req, res) => {
    try {
        // Requiere aprobación previa del administrador
        const estadoSolicitud = req.user?.solicitudProveedor?.estado;
        if (!(req.user.rol === 'administrador' || req.user.rol === 'proveedor' || estadoSolicitud === 'aprobado')) {
            return res.status(403).json({
                success: false,
                message: 'Se requiere aprobación de administrador para crear el perfil de proveedor'
            });
        }

        // Verificar si ya existe un perfil de proveedor
        const proveedorExistente = await Proveedor.findOne({ usuario_id: req.user.id });
        if (proveedorExistente) {
            return res.status(400).json({
                success: false,
                message: 'Ya tienes un perfil de proveedor'
            });
        }

        const {
            nombre_comercial,
            biografia,
            especialidades,
            experiencia_años,
            contacto,
            ubicacion
        } = req.body;

        // Procesar foto de perfil
        let foto_perfil = null;
        if (req.files && req.files.foto_perfil && req.files.foto_perfil[0]) {
            try {
                const resultado = await subirImagen(req.files.foto_perfil[0].path, 'proveedores/perfiles');
                foto_perfil = {
                    url: resultado.url,
                    public_id: resultado.public_id
                };
                eliminarArchivo(req.files.foto_perfil[0].path);
            } catch (error) {
                eliminarArchivo(req.files.foto_perfil[0].path);
                throw error;
            }
        }

        // Procesar fotos de galería
        let fotos_galeria = [];
        if (req.files && req.files.fotos_galeria) {
            try {
                const resultados = await subirMultiplesImagenes(req.files.fotos_galeria, 'proveedores/galerias');
                fotos_galeria = resultados.map((resultado, index) => ({
                    url: resultado.url,
                    public_id: resultado.public_id,
                    descripcion: req.body[`galeria_descripcion_${index}`] || ''
                }));
                req.files.fotos_galeria.forEach(file => eliminarArchivo(file.path));
            } catch (error) {
                req.files.fotos_galeria.forEach(file => eliminarArchivo(file.path));
                throw error;
            }
        }

        // Crear perfil de proveedor
        const proveedor = new Proveedor({
            usuario_id: req.user.id,
            nombre_comercial,
            biografia,
            foto_perfil,
            fotos_galeria,
            especialidades: especialidades ? JSON.parse(especialidades) : [],
            experiencia_años,
            contacto: contacto ? JSON.parse(contacto) : {},
            ubicacion: ubicacion ? JSON.parse(ubicacion) : {}
        });

        await proveedor.save();

        // Asegurar rol de proveedor solo si corresponde
        if (req.user.rol !== 'proveedor') {
            await Usuario.findByIdAndUpdate(req.user.id, { rol: 'proveedor' });
        }

        res.status(201).json({
            success: true,
            message: 'Perfil de proveedor creado exitosamente',
            data: proveedor
        });
    } catch (error) {
        console.error('Error al crear perfil de proveedor:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear el perfil de proveedor',
            error: error.message
        });
    }
};

/**
 * Obtener todos los proveedores con filtros
 */
exports.obtenerProveedores = async (req, res) => {
    try {
        const {
            ciudad,
            region,
            especialidad,
            busqueda,
            verificado,
            ordenar_por,
            pagina = 1,
            limite = 12
        } = req.query;

        // Construir filtros
        const filtros = { activo: true };

        if (ciudad) filtros['ubicacion.ciudad'] = new RegExp(ciudad, 'i');
        if (region) filtros['ubicacion.region'] = new RegExp(region, 'i');
        if (especialidad) filtros.especialidades = new RegExp(especialidad, 'i');
        if (verificado !== undefined) filtros.verificado = verificado === 'true';

        if (busqueda) {
            filtros.$text = { $search: busqueda };
        }

        // Configurar ordenamiento
        let ordenamiento = { createdAt: -1 };
        if (ordenar_por === 'valoracion') ordenamiento = { 'estadisticas.promedio_valoracion': -1 };
        if (ordenar_por === 'experiencia') ordenamiento = { experiencia_años: -1 };
        if (ordenar_por === 'populares') ordenamiento = { 'estadisticas.total_vistas': -1 };

        // Paginación
        const skip = (Number(pagina) - 1) * Number(limite);

        // Ejecutar consulta
        const proveedores = await Proveedor.find(filtros)
            .populate('usuario_id', 'nombre email')
            .sort(ordenamiento)
            .skip(skip)
            .limit(Number(limite));

        const total = await Proveedor.countDocuments(filtros);

        res.json({
            success: true,
            data: proveedores,
            paginacion: {
                total,
                pagina: Number(pagina),
                limite: Number(limite),
                total_paginas: Math.ceil(total / Number(limite))
            }
        });
    } catch (error) {
        console.error('Error al obtener proveedores:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los proveedores',
            error: error.message
        });
    }
};

/**
 * Obtener un proveedor por ID
 */
exports.obtenerProveedorPorId = async (req, res) => {
    try {
        const proveedor = await Proveedor.findById(req.params.id)
            .populate('usuario_id', 'nombre email fecha_registro')
            .populate('servicios_ofrecidos');

        if (!proveedor) {
            return res.status(404).json({
                success: false,
                message: 'Proveedor no encontrado'
            });
        }

        res.json({
            success: true,
            data: proveedor
        });
    } catch (error) {
        console.error('Error al obtener proveedor:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener el proveedor',
            error: error.message
        });
    }
};

/**
 * Obtener perfil del proveedor autenticado
 */
exports.obtenerMiPerfil = async (req, res) => {
    try {
        const proveedor = await Proveedor.findOne({ usuario_id: req.user.id })
            .populate('usuario_id', 'nombre email fecha_registro')
            .populate('servicios_ofrecidos');

        if (!proveedor) {
            return res.status(404).json({
                success: false,
                message: 'No tienes un perfil de proveedor'
            });
        }

        res.json({
            success: true,
            data: proveedor
        });
    } catch (error) {
        console.error('Error al obtener mi perfil:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener el perfil',
            error: error.message
        });
    }
};

/**
 * Actualizar perfil de proveedor
 */
exports.actualizarPerfil = async (req, res) => {
    try {
        // Requiere aprobación previa del administrador
        const estadoSolicitud = req.user?.solicitudProveedor?.estado;
        if (!(req.user.rol === 'administrador' || req.user.rol === 'proveedor' || estadoSolicitud === 'aprobado')) {
            return res.status(403).json({
                success: false,
                message: 'Se requiere aprobación de administrador para actualizar el perfil de proveedor'
            });
        }

        const proveedor = await Proveedor.findOne({ usuario_id: req.user.id });

        if (!proveedor) {
            return res.status(404).json({
                success: false,
                message: 'No tienes un perfil de proveedor'
            });
        }

        // Actualizar campos básicos
        const camposActualizables = [
            'nombre_comercial',
            'biografia',
            'especialidades',
            'experiencia_años',
            'contacto',
            'ubicacion',
            'certificaciones'
        ];

        camposActualizables.forEach(campo => {
            if (req.body[campo] !== undefined) {
                if (['especialidades', 'contacto', 'ubicacion', 'certificaciones'].includes(campo)) {
                    proveedor[campo] = JSON.parse(req.body[campo]);
                } else {
                    proveedor[campo] = req.body[campo];
                }
            }
        });

        // Actualizar foto de perfil si se proporciona
        if (req.files && req.files.foto_perfil && req.files.foto_perfil[0]) {
            try {
                // Eliminar foto anterior si existe
                if (proveedor.foto_perfil && proveedor.foto_perfil.public_id) {
                    await eliminarImagen(proveedor.foto_perfil.public_id);
                }

                const resultado = await subirImagen(req.files.foto_perfil[0].path, 'proveedores/perfiles');
                proveedor.foto_perfil = {
                    url: resultado.url,
                    public_id: resultado.public_id
                };
                eliminarArchivo(req.files.foto_perfil[0].path);
            } catch (error) {
                eliminarArchivo(req.files.foto_perfil[0].path);
                throw error;
            }
        }

        // Agregar nuevas fotos a la galería
        if (req.files && req.files.fotos_galeria) {
            try {
                const resultados = await subirMultiplesImagenes(req.files.fotos_galeria, 'proveedores/galerias');
                const nuevasFotos = resultados.map((resultado, index) => ({
                    url: resultado.url,
                    public_id: resultado.public_id,
                    descripcion: req.body[`galeria_descripcion_${index}`] || ''
                }));
                proveedor.fotos_galeria = [...proveedor.fotos_galeria, ...nuevasFotos];
                req.files.fotos_galeria.forEach(file => eliminarArchivo(file.path));
            } catch (error) {
                req.files.fotos_galeria.forEach(file => eliminarArchivo(file.path));
                throw error;
            }
        }

        await proveedor.save();

        res.json({
            success: true,
            message: 'Perfil actualizado exitosamente',
            data: proveedor
        });
    } catch (error) {
        console.error('Error al actualizar perfil:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el perfil',
            error: error.message
        });
    }
};

/**
 * Eliminar foto de la galería
 */
exports.eliminarFotoGaleria = async (req, res) => {
    try {
        const { fotoId } = req.params;
        const proveedor = await Proveedor.findOne({ usuario_id: req.user.id });

        if (!proveedor) {
            return res.status(404).json({
                success: false,
                message: 'No tienes un perfil de proveedor'
            });
        }

        // Buscar la foto
        const foto = proveedor.fotos_galeria.id(fotoId);
        if (!foto) {
            return res.status(404).json({
                success: false,
                message: 'Foto no encontrada'
            });
        }

        // Eliminar de Cloudinary
        await eliminarImagen(foto.public_id);

        // Eliminar del array
        proveedor.fotos_galeria.pull(fotoId);
        await proveedor.save();

        res.json({
            success: true,
            message: 'Foto eliminada exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar foto:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la foto',
            error: error.message
        });
    }
};

/**
 * Actualizar estadísticas del proveedor
 */
exports.actualizarEstadisticas = async (req, res) => {
    try {
        const proveedor = await Proveedor.findOne({ usuario_id: req.user.id });

        if (!proveedor) {
            return res.status(404).json({
                success: false,
                message: 'No tienes un perfil de proveedor'
            });
        }

        await proveedor.actualizarEstadisticas();
        await proveedor.save();

        res.json({
            success: true,
            message: 'Estadísticas actualizadas',
            data: proveedor.estadisticas
        });
    } catch (error) {
        console.error('Error al actualizar estadísticas:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar las estadísticas',
            error: error.message
        });
    }
};

/**
 * Obtener servicios de un proveedor
 */
exports.obtenerServiciosProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedor.findById(req.params.id);

        if (!proveedor) {
            return res.status(404).json({
                success: false,
                message: 'Proveedor no encontrado'
            });
        }

        const servicios = await Servicio.find({ 
            proveedor_id: proveedor.usuario_id,
            activo: true 
        }).sort({ createdAt: -1 });

        res.json({
            success: true,
            data: servicios
        });
    } catch (error) {
        console.error('Error al obtener servicios del proveedor:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los servicios',
            error: error.message
        });
    }
};
