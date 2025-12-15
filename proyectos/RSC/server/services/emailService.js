const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    async enviarVerificacionEmail(usuario, codigo) {
        const verificationLink = `${process.env.FRONTEND_URL}/verificar-email?codigo=${codigo}&email=${usuario.email}`;
        
        const mailOptions = {
            from: process.env.EMAIL_FROM || 'noreply@servicios.com',
            to: usuario.email,
            subject: 'Verifica tu email - Plataforma de Servicios',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">¡Bienvenido ${usuario.nombre}!</h2>
                    <p>Gracias por registrarte en nuestra plataforma. Para activar tu cuenta, por favor verifica tu email haciendo clic en el siguiente enlace:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${verificationLink}" 
                           style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                            Verificar Email
                        </a>
                    </div>
                    <p>Este enlace expirará en 24 horas.</p>
                    <p>Si no solicitaste este registro, puedes ignorar este mensaje.</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="color: #666; font-size: 12px;">
                        Plataforma de Servicios - Conectando proveedores con clientes
                    </p>
                </div>
            `
        };

        await this.transporter.sendMail(mailOptions);
    }

    async enviarNotificacionAdmin(nuevoProveedor) {
        const adminEmail = process.env.ADMIN_EMAIL;
        if (!adminEmail) {
            console.log('ADMIN_EMAIL no configurado - omitiendo notificación');
            return;
        }

        const mailOptions = {
            from: process.env.EMAIL_FROM || 'noreply@servicios.com',
            to: adminEmail,
            subject: '📋 Nueva Solicitud de Proveedor',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Nueva Solicitud de Proveedor</h2>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
                        <p><strong>Usuario:</strong> ${nuevoProveedor.nombre}</p>
                        <p><strong>Email:</strong> ${nuevoProveedor.email}</p>
                        <p><strong>Tipo de Servicio:</strong> ${nuevoProveedor.solicitudProveedor?.tipo || 'No especificado'}</p>
                        <p><strong>Fecha de Solicitud:</strong> ${new Date(nuevoProveedor.solicitudProveedor?.fechaSolicitud).toLocaleDateString()}</p>
                    </div>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="${process.env.ADMIN_URL || process.env.FRONTEND_URL}/admin/solicitudes" 
                           style="background: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                            Revisar Solicitud
                        </a>
                    </div>
                </div>
            `
        };

        await this.transporter.sendMail(mailOptions);
    }

    async enviarBienvenida(usuario) {
        const mailOptions = {
            from: process.env.EMAIL_FROM || 'noreply@servicios.com',
            to: usuario.email,
            subject: '¡Bienvenido a nuestra plataforma!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">¡Cuenta verificada exitosamente!</h2>
                    <p>Hola <strong>${usuario.nombre}</strong>,</p>
                    <p>Tu cuenta ha sido verificada correctamente. Ahora puedes:</p>
                    <ul>
                        <li>👀 Explorar servicios de proveedores</li>
                        <li>📞 Contactar proveedores de tu interés</li>
                        <li>💼 Solicitar convertirte en proveedor</li>
                    </ul>
                    <div style="text-align: center; margin: 25px 0;">
                        <a href="${process.env.FRONTEND_URL}" 
                           style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                            Comenzar a Explorar
                        </a>
                    </div>
                </div>
            `
        };

        await this.transporter.sendMail(mailOptions);
    }

    async enviarAprobacionProveedor(usuario) {
        const enlacePerfil = `${process.env.FRONTEND_URL}/proveedor/crear-perfil`;
        const mailOptions = {
            from: process.env.EMAIL_FROM || 'noreply@servicios.com',
            to: usuario.email,
            subject: 'Solicitud aprobada: completa tu perfil de proveedor',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">¡Tu solicitud fue aprobada!</h2>
                    <p>Hola <strong>${usuario.nombre}</strong>,</p>
                    <p>Tu solicitud para convertirte en proveedor ha sido <strong>aprobada</strong>. Para comenzar a ofrecer servicios, por favor completa tu perfil de proveedor.</p>
                    <div style="text-align: center; margin: 25px 0;">
                        <a href="${enlacePerfil}" 
                           style="background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                            Completar Perfil de Proveedor
                        </a>
                    </div>
                    <p style="color: #666;">Si ya completaste tu perfil, puedes ignorar este mensaje.</p>
                </div>
            `
        };

        await this.transporter.sendMail(mailOptions);
    }
}

module.exports = new EmailService();