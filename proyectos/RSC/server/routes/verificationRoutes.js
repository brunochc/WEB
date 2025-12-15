const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const emailService = require('../services/emailService');

// POST /api/verification/verify-email - Verificar email y completar perfil
router.post('/verify-email', async (req, res) => {
    try {
        const { email, codigo, password, telefono } = req.body;

        if (!email || !codigo) {
            return res.status(400).json({ message: 'Email y código son requeridos' });
        }

        // Buscar usuario con código válido
        const user = await User.findOne({ 
            email: email.toLowerCase(),
            codigoVerificacion: codigo,
            fechaExpiracionCodigo: { $gt: new Date() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Código inválido o expirado' });
        }

        // Validar contraseña si se proporciona
        if (password) {
            if (password.length < 6) {
                return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
            }
            const salt = await bcrypt.genSalt(10);
            user.contraseña_hash = await bcrypt.hash(password, salt);
        }

        // Actualizar datos del usuario
        user.emailVerificado = true;
        user.estado = password ? 'activo' : 'incompleto';
        user.codigoVerificacion = null;
        user.fechaExpiracionCodigo = null;
        
        if (telefono) {
            user.telefono = telefono;
        }

        await user.save();

        // Enviar email de bienvenida
        try {
            await emailService.enviarBienvenida(user);
        } catch (emailError) {
            console.error('Error enviando email de bienvenida:', emailError);
        }

        // Generar token JWT si tiene contraseña
        let token = null;
        if (password) {
            token = jwt.sign(
                { 
                    id: user._id,
                    email: user.email,
                    rol: user.rol
                },
                process.env.JWT_SECRET || 'tu_secreto_temporal',
                { expiresIn: '24h' }
            );
        }

        res.json({
            message: password ? 'Email verificado y perfil completado exitosamente' : 'Email verificado exitosamente',
            user: {
                id: user._id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
                estado: user.estado,
                emailVerificado: user.emailVerificado
            },
            token,
            requiereContraseña: !password
        });
    } catch (error) {
        console.error('Error en verificación de email:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});

// POST /api/verification/resend-verification - Reenviar código de verificación
router.post('/resend-verification', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email es requerido' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (user.emailVerificado) {
            return res.status(400).json({ message: 'El email ya está verificado' });
        }

        // Generar nuevo código
        const codigo = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        user.codigoVerificacion = codigo;
        user.fechaExpiracionCodigo = new Date(Date.now() + 24 * 60 * 60 * 1000);
        
        await user.save();

        // Reenviar email
        try {
            await emailService.enviarVerificacionEmail(user, codigo);
        } catch (emailError) {
            console.error('Error reenviando email:', emailError);
            return res.status(500).json({ message: 'Error enviando email de verificación' });
        }

        res.json({ message: 'Código de verificación reenviado exitosamente' });
    } catch (error) {
        console.error('Error reenviando verificación:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});

// POST /api/verification/complete-profile - Completar perfil (contraseña)
router.post('/complete-profile', async (req, res) => {
    try {
        const { email, password, telefono } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son requeridos' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (!user.emailVerificado) {
            return res.status(400).json({ message: 'Por favor verifica tu email primero' });
        }

        if (user.contraseña_hash) {
            return res.status(400).json({ message: 'El perfil ya está completo' });
        }

        // Hash de contraseña
        const salt = await bcrypt.genSalt(10);
        user.contraseña_hash = await bcrypt.hash(password, salt);
        user.estado = 'activo';
        
        if (telefono) {
            user.telefono = telefono;
        }

        await user.save();

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

        res.json({
            message: 'Perfil completado exitosamente',
            user: {
                id: user._id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
                estado: user.estado,
                emailVerificado: user.emailVerificado
            },
            token
        });
    } catch (error) {
        console.error('Error completando perfil:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});

module.exports = router;
