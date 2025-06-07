
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeaturedProperties = () => {
  const properties = [
    {
      id: 1,
      title: 'Departamento Moderno en Providencia',
      price: 180000000,
      operation: 'venta',
      location: 'Providencia, Santiago',
      bedrooms: 2,
      bathrooms: 2,
      area: 85,
      type: 'departamento',
      featured: true,
      description: 'Hermoso departamento con vista panorámica y acabados de lujo'
    },
    {
      id: 2,
      title: 'Casa Familiar en Las Condes',
      price: 2500000,
      operation: 'arriendo',
      location: 'Las Condes, Santiago',
      bedrooms: 4,
      bathrooms: 3,
      area: 180,
      type: 'casa',
      featured: true,
      description: 'Amplia casa con jardín y piscina, ideal para familias'
    },
    {
      id: 3,
      title: 'Loft Industrial en Ñuñoa',
      price: 120000000,
      operation: 'venta',
      location: 'Ñuñoa, Santiago',
      bedrooms: 1,
      bathrooms: 1,
      area: 65,
      type: 'departamento',
      featured: true,
      description: 'Loft de diseño único con techos altos y mucha luz natural'
    },
    {
      id: 4,
      title: 'Penthouse de Lujo en Vitacura',
      price: 450000000,
      operation: 'venta',
      location: 'Vitacura, Santiago',
      bedrooms: 3,
      bathrooms: 3,
      area: 220,
      type: 'departamento',
      featured: true,
      description: 'Penthouse exclusivo con terraza privada y vista a la cordillera'
    },
    {
      id: 5,
      title: 'Casa Tradicional en San Miguel',
      price: 1200000,
      operation: 'arriendo',
      location: 'San Miguel, Santiago',
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      type: 'casa',
      featured: true,
      description: 'Casa acogedora en barrio tranquilo con patio y parrilla'
    },
    {
      id: 6,
      title: 'Oficina Premium en Santiago Centro',
      price: 3500000,
      operation: 'arriendo',
      location: 'Santiago Centro',
      bedrooms: 0,
      bathrooms: 2,
      area: 95,
      type: 'oficina',
      featured: true,
      description: 'Oficina moderna en edificio corporativo con todas las comodidades'
    }
  ];

  const formatPrice = (price, operation) => {
    if (operation === 'venta') {
      return `$${(price / 1000000).toFixed(0)}M`;
    } else {
      return `$${price.toLocaleString()}/mes`;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property, index) => (
        <motion.div
          key={property.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="property-card bg-white rounded-2xl shadow-lg overflow-hidden group"
        >
          {/* Image Container */}
          <div className="relative h-64 overflow-hidden">
            <img  
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              alt={`${property.title} - Propiedad en ${property.location}`}
             src="https://images.unsplash.com/photo-1663816627277-c3c22d5847a2" />
            
            <div className="absolute inset-0 image-overlay"></div>
            
            {/* Property Type Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                property.operation === 'venta' ? 'bg-green-500' : 'bg-blue-500'
              }`}>
                {property.operation === 'venta' ? 'En Venta' : 'En Arriendo'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                <Heart className="w-4 h-4 text-gray-700 hover:text-red-500" />
              </button>
              <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                <Eye className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            {/* Price */}
            <div className="absolute bottom-4 left-4">
              <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="text-2xl font-bold text-gray-900">
                  {formatPrice(property.price, property.operation)}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-3">
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                {property.title}
              </h3>
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{property.location}</span>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {property.description}
            </p>

            {/* Property Details */}
            <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
              {property.bedrooms > 0 && (
                <div className="flex items-center">
                  <Bed className="w-4 h-4 mr-1" />
                  <span>{property.bedrooms}</span>
                </div>
              )}
              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                <span>{property.bathrooms}</span>
              </div>
              <div className="flex items-center">
                <Square className="w-4 h-4 mr-1" />
                <span>{property.area}m²</span>
              </div>
            </div>

            {/* CTA Button */}
            <Link to={`/propiedad/${property.id}`}>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 rounded-lg font-medium transition-all duration-200">
                Ver Detalles
              </Button>
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FeaturedProperties;
