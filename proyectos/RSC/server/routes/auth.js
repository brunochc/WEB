const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const emailService = require('../services/emailService');
const Proveedor = require('../models/proveedor');

// GET /api/auth/me - retorna el usuario autenticado
router.get('/me', async (req, res) => {
    try {
        const auth = req.headers.authorization || '';
        const parts = auth.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({ message: 'No autenticado' });
        }
        const token = parts[1];
        let payload;
        try {
            payload = jwt.verify(token, process.env.JWT_SECRET || 'tu_secreto_temporal');
        } catch (e) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        const user = await User.findById(payload.id).select('nombre email rol estado emailVerificado');
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        // Flags de perfil de proveedor
        const proveedorPerfil = await Proveedor.findOne({ usuario_id: user._id }).select('_id');
        const tienePerfilProveedor = Boolean(proveedorPerfil);
        const requiereCompletarPerfilProveedor = user.rol === 'proveedor' && !tienePerfilProveedor;

        return res.json({
            user: {
                id: user._id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
                estado: user.estado,
                emailVerificado: user.emailVerificado,
                tienePerfilProveedor,
                requiereCompletarPerfilProveedor
            }
        });
    } catch (error) {
        console.error('Error en /auth/me:', error);
        return res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});

// POST /api/auth/register - Registro simplificado (solo nombre y email)
router.post('/register', async (req, res) => {
    try {
        const { nombre, email } = req.body;

        // Validaciones básicas
        if (!nombre || !email) {
            return res.status(400).json({ message: 'Nombre y email son requeridos' });
        }

        // Verificar si el email ya existe
        const existsEmail = await User.findOne({ email: email.toLowerCase().trim() });
        if (existsEmail) {
            return res.status(409).json({ message: 'El email ya está registrado' });
        }

        // Crear usuario sin contraseña inicialmente
        const user = await User.create({
            nombre: nombre.trim(),
            email: email.toLowerCase().trim(),
            estado: 'pendiente_verificacion',
            emailVerificado: false
            // No se asigna contraseña_hash inicialmente
        });

        // Generar código de verificación
        const codigo = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        user.codigoVerificacion = codigo;
        user.fechaExpiracionCodigo = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas
        
        await user.save();

        // Enviar email de verificación
        try {
            await emailService.enviarVerificacionEmail(user, codigo);
        } catch (emailError) {
            console.error('Error enviando email de verificación:', emailError);
            // No fallar el registro si el email falla
        }

        return res.status(201).json({
            message: 'Registro exitoso. Por favor verifica tu email para activar tu cuenta.',
            user: {
                id: user._id,
                nombre: user.nombre,
                email: user.email,
                estado: user.estado
            }
        });
    } catch (error) {
        console.error('Error en registro:', error);
        return res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar campos requeridos
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email y contraseña son requeridos'
            });
        }

        // Buscar usuario por email
        const user = await User.findOne({ email: email.toLowerCase() });
        
        if (!user) {
            return res.status(401).json({
                message: 'Credenciales inválidas'
            });
        }

        // Verificar si el email está verificado
        if (!user.emailVerificado) {
            return res.status(401).json({
                message: 'Por favor verifica tu email antes de iniciar sesión'
            });
        }

        // Verificar si tiene contraseña asignada
        if (!user.contraseña_hash) {
            return res.status(401).json({
                message: 'Por favor completa tu perfil estableciendo una contraseña'
            });
        }

        // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(password, user.contraseña_hash);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Credenciales inválidas'
            });
        }

        // Verificar si la cuenta está activa
        if (!user.activo) {
            return res.status(401).json({
                message: 'Cuenta desactivada'
            });
        }

        // Generar token JWT
        const token = jwt.sign(
            { 
                id: user._id,
                email: user.email,
                rol: user.rol
            },
            process.env.JWT_SECRET || 'tu_secreto_temporal',
            { expiresIn: '24h' }
        );

        // Flags de perfil de proveedor
        const proveedorPerfil = await Proveedor.findOne({ usuario_id: user._id }).select('_id');
        const tienePerfilProveedor = Boolean(proveedorPerfil);
        const requiereCompletarPerfilProveedor = user.rol === 'proveedor' && !tienePerfilProveedor;

        // Enviar respuesta
        res.json({
            token,
            user: {
                id: user._id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
                estado: user.estado,
                emailVerificado: user.emailVerificado,
                tienePerfilProveedor,
                requiereCompletarPerfilProveedor
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            message: 'Error en el servidor',
            error: error.message
        });
    }
});

module.exports = router;
