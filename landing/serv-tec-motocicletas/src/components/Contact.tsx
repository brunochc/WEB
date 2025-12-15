import { motion } from 'motion/react';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { toast } from "sonner";

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Mensaje enviado correctamente! Te contactaremos pronto.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Ubicación',
      content: 'Playa Ancha, Región de Valparaíso, Chile',
      color: 'from-primary to-orange-600'
    },
    {
      icon: Phone,
      title: 'Teléfono',
      content: '+56 9 6313 0164',
      color: 'from-accent to-purple-600'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@motoservice.cl',
      color: 'from-blue-500 to-primary'
    },
    {
      icon: Clock,
      title: 'Horarios',
      content: 'Lun-Vie: 8:00-18:00\nSáb: 9:00-14:00',
      color: 'from-green-500 to-accent'
    }
  ];

  const services = [
    'Reparación General',
    'Mantenimiento',
    'Sistema Eléctrico',
    'Revisión Técnica',
    'Modificaciones',
    'Personalización',
    'Otro'
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Contacto</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            ¿Necesitas ayuda con tu motocicleta? Contáctanos y te ayudaremos con lo que necesites
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Información de Contacto</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${info.color} mb-4`}>
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-white font-bold mb-2">{info.title}</h4>
                    <p className="text-gray-400 whitespace-pre-line">{info.content}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <motion.div
              className="bg-gradient-to-r from-red-900/50 to-primary/50 border border-red-500/50 rounded-xl p-6"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="text-white font-bold mb-2 flex items-center space-x-2">
                <Phone className="h-5 w-5 text-red-400" />
                <span>Servicio de Emergencia 24h</span>
              </h4>
              <p className="text-gray-300 mb-2">Para emergencias en ruta:</p>
              <p className="text-xl font-bold text-red-400">+56 9 4843 8050</p>
            </motion.div>

            {/* Map */}
            <motion.div
              className="rounded-xl h-64 overflow-hidden border border-gray-700"
              whileHover={{ scale: 1.02 }}
            >
              <iframe
                title="Ubicación - Playa Ancha, Valparaíso"
                src="https://www.google.com/maps?q=Playa%20Ancha%2C%20Valpara%C3%ADso&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
                allowFullScreen
              />
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Solicitar Servicio</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Nombre</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Teléfono</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="+56 9 1234 5678"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Servicio</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="">Selecciona un servicio</option>
                      {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Mensaje</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="Describe el problema o servicio que necesitas..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-accent text-white font-bold py-4 px-6 rounded-lg hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Enviar Mensaje</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}