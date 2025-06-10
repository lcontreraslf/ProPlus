import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Building, Star } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Asumiendo que usarás un botón de contacto

const BrokerCard = ({ broker, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        {/* Foto del Corredor - Usa una imagen de placeholder por ahora */}
        {/* Idealmente, aquí iría la foto real del corredor */}
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          alt={`Foto de ${broker.name}`}
          src={broker.imageUrl || `https://ui-avatars.com/api/?name=${broker.name.replace(/\s/g, '+')}&background=random&color=fff&size=500`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg">
            <span className="text-xl font-bold text-gray-900">
              {broker.name}
            </span>
          </div>
        </div>
        {broker.rating && (
            <div className="absolute top-4 right-4 bg-yellow-400/90 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                <Star size={14} className="mr-1 fill-current text-yellow-800" /> {broker.rating.toFixed(1)}
            </div>
        )}
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-bold text-gray-900 line-clamp-1">
          {broker.agency ? `${broker.agency}` : 'Corredor Independiente'}
        </h3>
        <p className="text-gray-600 text-sm flex items-center">
          <MapPin size={16} className="mr-2 text-blue-500" /> {broker.location || 'Santiago'}
        </p>
        <p className="text-gray-600 text-sm line-clamp-3">
          {broker.bio || 'Corredor de propiedades experimentado, comprometido con la excelencia y la satisfacción del cliente.'}
        </p>

        <div className="pt-4 border-t border-gray-200 space-y-3">
          <a href={`tel:${broker.phone}`} className="flex items-center text-green-600 hover:text-green-700 transition-colors">
            <Phone size={16} className="mr-2" /> {broker.phone}
          </a>
          <a href={`mailto:${broker.email}`} className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
            <Mail size={16} className="mr-2" /> {broker.email}
          </a>
        </div>

        {/* Opcional: Botón para ver más detalles o contactar */}
        {/* <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 rounded-lg font-medium transition-all duration-200">
          Contactar Corredor
        </Button> */}
      </div>
    </motion.div>
  );
};

export default BrokerCard;