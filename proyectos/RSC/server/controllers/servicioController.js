const Servicio = require('../models/servicio');
const Proveedor = require('../models/proveedor');
const { subirImagen, eliminarImagen, subirMultiplesImagenes, eliminarMultiplesImagenes } = require('../config/cloudinary');
const { eliminarArchivo, eliminarArchivos } = require('../middleware/upload');
const fs = require('fs');

/**
 * Crear un nuevo servicio
 */
exports.crearServicio = async (req, res) => {
    try {
        const {
            titulo,
            descripcion,
            categoria,
            precio,
            moneda,
            ubicacion,
            disponibilidad,
            duracion_estimada
        } = req.body;

        // Verificar que el usuario sea un proveedor
        const proveedor = await Proveedor.findOne({ usuario_id: req.user.id });
        if (!proveedor) {
            return res.status(403).json({
                success: false,
                message: 'Debes ser un proveedor para crear servicios'
            });
        }

        // Procesar imágenes si existen
        let fotos = [];
        if (req.files && req.files.length > 0) {
            try {
                const resultados = await subirMultiplesImagenes(req.files, 'servicios');
                fotos = resultados.map((resultado, index) => ({
                    url: resultado.url,
                    public_id: resultado.public_id,
                    descripcion: req.body[`foto_descripcion_${index}`] || ''
                }));

                // Eliminar archivos temporales
                req.files.forEach(file => eliminarArchivo(file.path));
            } catch (error) {
                // Eliminar archivos temporales en caso de error
                req.files.forEach(file => eliminarArchivo(file.path));
                throw error;
            }
        }

        // Crear el servicio
        const servicio = new Servicio({
            proveedor_id: req.user.id,
            titulo,
            descripcion,
            categoria,
            precio,
            moneda: moneda || 'CLP',
            fotos,
            ubicacion: ubicacion ? JSON.parse(ubicacion) : undefined,
            disponibilidad: disponibilidad ? JSON.parse(disponibilidad) : undefined,
            duracion_estimada
        });

        await servicio.save();

        // Actualizar el proveedor
        proveedor.servicios_ofrecidos.push(servicio._id);
        await proveedor.actualizarEstadisticas();
        await proveedor.save();

        res.status(201).json({
            success: true,
            message: 'Servicio creado exitosamente',
            data: servicio
        });
    } catch (error) {
        console.error('Error al crear servicio:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear el servicio',
            error: error.message
        });
    }
};

/**
 * Obtener todos los servicios con filtros
 */
exports.obtenerServicios = async (req, res) => {
    try {
        const {
            categoria,
            ciudad,
            region,
            precio_min,
            precio_max,
            busqueda,
            ordenar_por,
            pagina = 1,
            limite = 12
        } = req.query;

        // Construir filtros
        const filtros = { activo: true };

        if (categoria) filtros.categoria = categoria;
        if (ciudad) filtros['ubicacion.ciudad'] = new RegExp(ciudad, 'i');
        if (region) filtros['ubicacion.region'] = new RegExp(region, 'i');
        
        if (precio_min || precio_max) {
            filtros.precio = {};
            if (precio_min) filtros.precio.$gte = Number(precio_min);
            if (precio_max) filtros.precio.$lte = Number(precio_max);
        }

        if (busqueda) {
            filtros.$text = { $search: busqueda };
        }

        // Configurar ordenamiento
        let ordenamiento = { createdAt: -1 };
        if (ordenar_por === 'precio_asc') ordenamiento = { precio: 1 };
        if (ordenar_por === 'precio_desc') ordenamiento = { precio: -1 };
        if (ordenar_por === 'valoracion') ordenamiento = { promedio_valoracion: -1 };
        if (ordenar_por === 'populares') ordenamiento = { vistas: -1 };

        // Paginación
        const skip = (Number(pagina) - 1) * Number(limite);

        // Ejecutar consulta
        const servicios = await Servicio.find(filtros)
            .populate('proveedor_id', 'nombre email')
            .sort(ordenamiento)
            .skip(skip)
            .limit(Number(limite));

        const total = await Servicio.countDocuments(filtros);

        res.json({
            success: true,
            data: servicios,
            paginacion: {
                total,
                pagina: Number(pagina),
                limite: Number(limite),
                total_paginas: Math.ceil(total / Number(limite))
            }
        });
    } catch (error) {
        console.error('Error al obtener servicios:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los servicios',
            error: error.message
        });
    }
};

/**
 * Obtener un servicio por ID
 */
exports.obtenerServicioPorId = async (req, res) => {
    try {
        const servicio = await Servicio.findById(req.params.id)
            .populate('proveedor_id', 'nombre email')
            .populate({
                path: 'valoraciones.usuario_id',
                select: 'nombre'
            });

        if (!servicio) {
            return res.status(404).json({
                success: false,
                message: 'Servicio no encontrado'
            });
        }

        // Incrementar contador de vistas
        servicio.vistas += 1;
        await servicio.save();

        res.json({
            success: true,
            data: servicio
        });
    } catch (error) {
        console.error('Error al obtener servicio:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener el servicio',
            error: error.message
        });
    }
};

/**
 * Actualizar un servicio
 */
exports.actualizarServicio = async (req, res) => {
    try {
        const servicio = await Servicio.findById(req.params.id);

        if (!servicio) {
            return res.status(404).json({
                success: false,
                message: 'Servicio no encontrado'
            });
        }

        // Verificar que el usuario sea el propietario del servicio
        if (servicio.proveedor_id.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para actualizar este servicio'
            });
        }

        // Actualizar campos
        const camposActualizables = [
            'titulo',
            'descripcion',
            'categoria',
            'precio',
            'moneda',
            'ubicacion',
            'disponibilidad',
            'duracion_estimada',
            'activo'
        ];

        camposActualizables.forEach(campo => {
            if (req.body[campo] !== undefined) {
                if (campo === 'ubicacion' || campo === 'disponibilidad') {
                    servicio[campo] = JSON.parse(req.body[campo]);
                } else {
                    servicio[campo] = req.body[campo];
                }
            }
        });

        // Procesar nuevas imágenes si existen
        if (req.files && req.files.length > 0) {
            try {
                const resultados = await subirMultiplesImagenes(req.files, 'servicios');
                const nuevasFotos = resultados.map((resultado, index) => ({
                    url: resultado.url,
                    public_id: resultado.public_id,
                    descripcion: req.body[`foto_descripcion_${index}`] || ''
                }));

                servicio.fotos = [...servicio.fotos, ...nuevasFotos];

                // Eliminar archivos temporales
                req.files.forEach(file => eliminarArchivo(file.path));
            } catch (error) {
                req.files.forEach(file => eliminarArchivo(file.path));
                throw error;
            }
        }

        await servicio.save();

        res.json({
            success: true,
            message: 'Servicio actualizado exitosamente',
            data: servicio
        });
    } catch (error) {
        console.error('Error al actualizar servicio:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el servicio',
            error: error.message
        });
    }
};

/**
 * Eliminar una foto del servicio
 */
exports.eliminarFotoServicio = async (req, res) => {
    try {
        const { id, fotoId } = req.params;
        const servicio = await Servicio.findById(id);

        if (!servicio) {
            return res.status(404).json({
                success: false,
                message: 'Servicio no encontrado'
            });
        }

        // Verificar permisos - CORREGIDO: req.usuario._id → req.user.id
        if (servicio.proveedor_id.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para eliminar fotos de este servicio'
            });
        }

        // Buscar la foto
        const foto = servicio.fotos.id(fotoId);
        if (!foto) {
            return res.status(404).json({
                success: false,
                message: 'Foto no encontrada'
            });
        }

        // Eliminar de Cloudinary
        await eliminarImagen(foto.public_id);

        // Eliminar del array
        servicio.fotos.pull(fotoId);
        await servicio.save();

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
 * Eliminar un servicio
 */
exports.eliminarServicio = async (req, res) => {
    try {
        const servicio = await Servicio.findById(req.params.id);

        if (!servicio) {
            return res.status(404).json({
                success: false,
                message: 'Servicio no encontrado'
            });
        }

        // Verificar permisos - CORREGIDO: req.usuario → req.user
        if (servicio.proveedor_id.toString() !== req.user.id.toString() && req.user.rol !== 'administrador') {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para eliminar este servicio'
            });
        }

        // Eliminar todas las fotos de Cloudinary
        if (servicio.fotos.length > 0) {
            const publicIds = servicio.fotos.map(foto => foto.public_id);
            await eliminarMultiplesImagenes(publicIds);
        }

        // Eliminar el servicio
        await Servicio.findByIdAndDelete(req.params.id);

        // Actualizar el proveedor
        const proveedor = await Proveedor.findOne({ usuario_id: servicio.proveedor_id });
        if (proveedor) {
            proveedor.servicios_ofrecidos.pull(servicio._id);
            await proveedor.actualizarEstadisticas();
            await proveedor.save();
        }

        res.json({
            success: true,
            message: 'Servicio eliminado exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar servicio:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el servicio',
            error: error.message
        });
    }
};

/**
 * Agregar valoración a un servicio
 */
exports.agregarValoracion = async (req, res) => {
    try {
        const { puntuacion, comentario } = req.body;
        const servicio = await Servicio.findById(req.params.id);

        if (!servicio) {
            return res.status(404).json({
                success: false,
                message: 'Servicio no encontrado'
            });
        }

        // Verificar que el usuario no sea el propietario - CORREGIDO: req.usuario._id → req.user.id
        if (servicio.proveedor_id.toString() === req.user.id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'No puedes valorar tu propio servicio'
            });
        }

        // Verificar si el usuario ya valoró este servicio - CORREGIDO: req.usuario._id → req.user.id
        const valoracionExistente = servicio.valoraciones.find(
            v => v.usuario_id.toString() === req.user.id.toString()
        );

        if (valoracionExistente) {
            return res.status(400).json({
                success: false,
                message: 'Ya has valorado este servicio'
            });
        }

        // Agregar valoración - CORREGIDO: req.usuario._id → req.user.id
        servicio.valoraciones.push({
            usuario_id: req.user.id,
            puntuacion,
            comentario
        });

        await servicio.save();

        // Actualizar estadísticas del proveedor
        const proveedor = await Proveedor.findOne({ usuario_id: servicio.proveedor_id });
        if (proveedor) {
            await proveedor.actualizarEstadisticas();
            await proveedor.save();
        }

        res.json({
            success: true,
            message: 'Valoración agregada exitosamente',
            data: servicio
        });
    } catch (error) {
        console.error('Error al agregar valoración:', error);
        res.status(500).json({
            success: false,
            message: 'Error al agregar la valoración',
            error: error.message
        });
    }
};

/**
 * Registrar contacto (cuando alguien contacta al proveedor)
 */
exports.registrarContacto = async (req, res) => {
    try {
        const servicio = await Servicio.findById(req.params.id);

        if (!servicio) {
            return res.status(404).json({
                success: false,
                message: 'Servicio no encontrado'
            });
        }

        // Incrementar contador de contactos
        servicio.contactos += 1;
        await servicio.save();

        // Actualizar estadísticas del proveedor
        const proveedor = await Proveedor.findOne({ usuario_id: servicio.proveedor_id });
        if (proveedor) {
            await proveedor.actualizarEstadisticas();
            await proveedor.save();
        }

        res.json({
            success: true,
            message: 'Contacto registrado'
        });
    } catch (error) {
        console.error('Error al registrar contacto:', error);
        res.status(500).json({
            success: false,
            message: 'Error al registrar el contacto',
            error: error.message
        });
    }
};

/**
 * Obtener servicios del proveedor autenticado
 */
exports.obtenerMisServicios = async (req, res) => {
    try {
        const servicios = await Servicio.find({ proveedor_id: req.user.id })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: servicios
        });
    } catch (error) {
        console.error('Error al obtener mis servicios:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los servicios',
            error: error.message
        });
    }
};