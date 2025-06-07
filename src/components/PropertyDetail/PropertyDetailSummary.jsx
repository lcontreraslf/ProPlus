import React from 'react';
import { motion } from 'framer-motion';
import { Building, CalendarDays, ParkingCircle, Thermometer } from 'lucide-react'; // Using CalendarDays for yearBuilt

const PropertyDetailSummary = ({ property }) => {
  const summaryItems = [
    { label: 'Tipo', value: property.type, icon: Building },
    { label: 'Año Const.', value: property.yearBuilt, icon: CalendarDays },
    ...(property.parking > 0 ? [{ label: 'Estacionamientos', value: property.parking, icon: ParkingCircle }] : []),
    // Add more relevant summary items if available, e.g., heating
    // { label: 'Calefacción', value: 'Central', icon: Thermometer },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white rounded-2xl shadow-xl p-6"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-4">Resumen de la Propiedad</h3>
      <div className="space-y-3">
        {summaryItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center text-sm p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center text-gray-600">
              <item.icon className="w-5 h-5 mr-2 text-blue-500" />
              <span>{item.label}:</span>
            </div>
            <span className="font-semibold text-gray-800 capitalize">{item.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default PropertyDetailSummary;