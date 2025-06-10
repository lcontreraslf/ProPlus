import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import BrokerCard from '@/components/BrokerCard'; // Importar el componente de la tarjeta

const Brokers = () => {
  // Mock de datos para los corredores de propiedades
  // En una aplicación real, esto vendría de una API
  const mockBrokers = [
    {
      id: 1,
      name: 'María González',
      agency: 'Inmobiliaria Plus',
      phone: '+56 9 1111 2222',
      email: 'maria.g@inmobiliariaplus.cl',
      location: 'Las Condes, Santiago',
      bio: 'Especialista en propiedades residenciales de lujo con más de 15 años de experiencia en el sector.',
      imageUrl: '/images/agente-maria.jpg', // Reutilizando la imagen del agente que ya tienes
      rating: 4.8
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      agency: 'Hogar Propio',
      phone: '+56 9 3333 4444',
      email: 'carlos.r@hogarpropio.cl',
      location: 'Ñuñoa, Santiago',
      bio: 'Experto en arriendos y primera vivienda. Ayudando a familias a encontrar su espacio ideal.',
      imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400&crop=face', // Placeholder si no tienes más fotos locales
      rating: 4.5
    },
    {
      id: 3,
      name: 'Ana Silva',
      agency: null, // Corredor independiente
      phone: '+56 9 5555 6666',
      email: 'ana.s@corredora.cl',
      location: 'Providencia, Santiago',
      bio: 'Asesora en propiedades comerciales y oficinas. Maximizando el retorno de su inversión.',
      imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=400&crop=face', // Placeholder
      rating: 4.9
    },
    {
      id: 4,
      name: 'Javier Pérez',
      agency: 'Tu Espacio Inmobiliario',
      phone: '+56 9 7777 8888',
      email: 'javier.p@tuespacio.cl',
      location: 'Vitacura, Santiago',
      bio: 'Amplia experiencia en tasaciones y gestión de compra-venta de inmuebles exclusivos.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-e695595c282f?auto=format&fit=crop&q=80&w=400&h=400&crop=face', // Placeholder
      rating: 4.7
    },
    {
      id: 5,
      name: 'Sofía Herrera',
      agency: 'Futuro Hogar',
      phone: '+56 9 9999 0000',
      email: 'sofia.h@futurohogar.cl',
      location: 'La Reina, Santiago',
      bio: 'Comprometida con brindar la mejor asesoría para la primera vivienda y clientes jóvenes.',
      imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400&crop=face', // Placeholder
      rating: 4.6
    }
  ];

  const [brokers, setBrokers] = useState([]);

  useEffect(() => {
    // En una app real, aquí harías una llamada a la API:
    // fetchBrokers().then(data => setBrokers(data));
    setBrokers(mockBrokers);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Nuestros Corredores de Propiedades
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conoce a nuestros expertos, listos para ayudarte a encontrar tu propiedad ideal o a vender la tuya.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {brokers.map((broker, index) => (
            <BrokerCard key={broker.id} broker={broker} index={index} />
          ))}
        </div>

        {brokers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">👷‍♀️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No hay corredores disponibles en este momento.
            </h3>
            <p className="text-gray-600">
              Estamos trabajando para incorporar a más profesionales.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Brokers;