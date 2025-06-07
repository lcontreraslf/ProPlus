import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const PropertyDetailMap = ({ address }) => {
  // In a real app, you'd integrate OpenStreetMap or another map provider here.
  // This is a placeholder.
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Ubicación en el Mapa</h2>
      <div className="h-80 bg-gradient-to-br from-slate-100 to-sky-100 rounded-lg flex items-center justify-center relative overflow-hidden">
        {/* Placeholder for map */}
        <div className="text-center text-gray-600 z-10 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-md">
          <MapPin className="w-12 h-12 mx-auto mb-2 text-blue-600" />
          <p className="font-semibold">Visualización de Mapa</p>
          <p className="text-sm">{address}</p>
          <p className="text-xs mt-2 text-gray-500">(Integración de OpenStreetMap pendiente)</p>
        </div>
        {/* Decorative map-like pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#a0aec0" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyDetailMap;