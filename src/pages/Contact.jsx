
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Mensaje enviado",
      description: "Nos pondremos en contacto contigo pronto.",
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Teléfono',
      details: ['+56 2 2345 6789', '+56 9 8765 4321'],
      color: 'text-green-600'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@propiedadesplus.cl', 'ventas@propiedadesplus.cl'],
      color: 'text-blue-600'
    },
    {
      icon: MapPin,
      title: 'Oficina Principal',
      details: ['Av. Providencia 1234, Piso 10', 'Providencia, Santiago'],
      color: 'text-red-600'
    },
    {
      icon: Clock,
      title: 'Horarios de Atención',
      details: ['Lunes a Viernes: 9:00 - 18:00', 'Sábados: 10:00 - 14:00'],
      color: 'text-purple-600'
    }
  ];

  const team = [
    {
      name: 'María González',
      role: 'Directora de Ventas',
      phone: '+56 9 1234 5678',
      email: 'maria.gonzalez@propiedadesplus.cl',
      specialty: 'Propiedades de lujo'
    },
    {
      name: 'Carlos Rodríguez',
      role: 'Especialista en Arriendos',
      phone: '+56 9 2345 6789',
      email: 'carlos.rodriguez@propiedadesplus.cl',
      specialty: 'Departamentos y casas'
    },
    {
      name: 'Ana Silva',
      role: 'Asesora Comercial',
      phone: '+56 9 3456 7890',
      email: 'ana.silva@propiedadesplus.cl',
      specialty: 'Propiedades comerciales'
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contáctanos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estamos aquí para ayudarte a encontrar tu propiedad ideal. Nuestro equipo de expertos está listo para asesorarte en cada paso del proceso.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Envíanos un mensaje
              </h2>
              <p className="text-gray-600">
                Completa el formulario y nos pondremos en contacto contigo lo antes posible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="+56 9 1234 5678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Asunto *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="compra">Compra de propiedad</option>
                    <option value="venta">Venta de propiedad</option>
                    <option value="arriendo">Arriendo de propiedad</option>
                    <option value="tasacion">Tasación</option>
                    <option value="inversion">Asesoría de inversión</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Cuéntanos más detalles sobre lo que necesitas..."
                ></textarea>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Send className="w-5 h-5 mr-2" />
                Enviar Mensaje
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-6">Información de Contacto</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="p-3 bg-white/20 rounded-lg">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-white/90">{detail}</p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Team Members */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Nuestro Equipo
              </h2>
              <div className="space-y-6">
                {team.map((member, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img  
                      className="w-16 h-16 rounded-full object-cover"
                      alt={`Foto de ${member.name}`}
                     src="https://images.unsplash.com/photo-1575383596664-30f4489f9786" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-blue-600 text-sm font-medium">{member.role}</p>
                      <p className="text-gray-600 text-sm mb-2">{member.specialty}</p>
                      <div className="flex flex-col space-y-1 text-sm">
                        <a 
                          href={`tel:${member.phone}`}
                          className="text-green-600 hover:text-green-700 flex items-center"
                        >
                          <Phone className="w-3 h-3 mr-1" />
                          {member.phone}
                        </a>
                        <a 
                          href={`mailto:${member.email}`}
                          className="text-blue-600 hover:text-blue-700 flex items-center"
                        >
                          <Mail className="w-3 h-3 mr-1" />
                          {member.email}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contacto Rápido
              </h2>
              <div className="space-y-4">
                <Button
                  onClick={() => window.open('tel:+56223456789')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Llamar Ahora
                </Button>
                <Button
                  onClick={() => window.open('https://wa.me/56987654321')}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </Button>
                <Button
                  onClick={() => window.open('mailto:info@propiedadesplus.cl')}
                  variant="outline"
                  className="w-full py-3 rounded-lg font-medium"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Enviar Email
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Nuestra Ubicación
          </h2>
          <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg font-medium">Mapa interactivo</p>
              <p>Av. Providencia 1234, Piso 10</p>
              <p>Providencia, Santiago</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
