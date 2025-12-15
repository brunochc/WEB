import { motion } from 'motion/react';
import { Wrench, Settings, Zap, Shield, Cog, Paintbrush } from 'lucide-react';

export function Services() {
  const services = [
    {
      icon: Wrench,
      title: 'Reparación General',
      description: 'Diagnóstico y reparación completa de todo tipo de motocicletas',
      features: ['Motor', 'Transmisión', 'Frenos', 'Suspensión'],
      price: 'Desde $50',
      color: 'from-primary to-orange-600'
    },
    {
      icon: Settings,
      title: 'Mantenimiento',
      description: 'Servicios preventivos para mantener tu moto en óptimas condiciones',
      features: ['Cambio de aceite', 'Filtros', 'Cadena', 'Neumáticos'],
      price: 'Desde $30',
      color: 'from-accent to-purple-600'
    },
    {
      icon: Zap,
      title: 'Sistema Eléctrico',
      description: 'Reparación y mantenimiento del sistema eléctrico completo',
      features: ['Batería', 'Alternador', 'Luces', 'Cableado'],
      price: 'Desde $40',
      color: 'from-blue-500 to-primary'
    },
    {
      icon: Shield,
      title: 'Revisión Técnica',
      description: 'Inspección completa para certificaciones y seguridad',
      features: ['Documentación', 'Emisiones', 'Seguridad', 'Certificados'],
      price: 'Desde $25',
      color: 'from-green-500 to-accent'
    },
    {
      icon: Cog,
      title: 'Modificaciones',
      description: 'Personalización y mejoras de rendimiento',
      features: ['Escape', 'Filtro aire', 'Chip tuning', 'Accesorios'],
      price: 'Consultar',
      color: 'from-red-500 to-primary'
    },
    {
      icon: Paintbrush,
      title: 'Personalización',
      description: 'Pintura, gráficos y modificaciones estéticas',
      features: ['Pintura', 'Vinilos', 'Chrome', 'LED'],
      price: 'Consultar',
      color: 'from-purple-500 to-accent'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestros <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Servicios</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ofrecemos una gama completa de servicios especializados para mantener tu motocicleta en perfectas condiciones
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Background Gradient Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Icon */}
              <motion.div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${service.color} mb-4`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <service.icon className="h-6 w-6 text-white" />
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 mb-4">{service.description}</p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-primary rounded-full" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">{service.price}</span>
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Solicitar
                </motion.button>
              </div>

              {/* Hover Effect Lines */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gray-400 mb-6">¿No encuentras el servicio que necesitas?</p>
          <motion.a
            href="#contact"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-accent px-8 py-4 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Consultanos tu caso específico</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}