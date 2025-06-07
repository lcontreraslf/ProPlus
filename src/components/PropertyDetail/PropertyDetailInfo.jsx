import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Square, Car, Shield } from 'lucide-react';

const PropertyDetailInfo = ({ property }) => {
  const formatPrice = (price, operation) => {
    if (operation === 'venta') {
      return `${(price / 1000000).toFixed(0)} millones`;
    } else {
      return `${price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}/mes`;
    }
  };

  const detailItems = [
    ...(property.bedrooms > 0 ? [{ icon: Bed, value: property.bedrooms, label: 'Dormitorios' }] : []),
    { icon: Bath, value: property.bathrooms, label: 'Baños' },
    { icon: Square, value: property.area, label: 'm²' },
    ...(property.parking > 0 ? [{ icon: Car, value: property.parking, label: 'Estac.' }] : []),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {property.title}
        </h1>
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-5 h-5 mr-2 text-blue-500" />
          <span className="text-lg">{property.address}</span>
        </div>
        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          {formatPrice(property.price, property.operation)}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
        {detailItems.map((item, index) => (
          <div key={index} className="text-center p-4 bg-gradient-to-br from-slate-50 to-sky-50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <item.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{item.value}</div>
            <div className="text-sm text-gray-600">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Descripción</h2>
        <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
          {property.description}
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Características</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {property.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 bg-sky-50 rounded-lg border border-sky-200">
              <Shield className="w-5 h-5 text-sky-600 flex-shrink-0" />
              <span className="text-gray-700 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyDetailInfo;