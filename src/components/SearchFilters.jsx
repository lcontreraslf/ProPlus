
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Home, DollarSign, Bed, Bath, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const SearchFilters = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    type: '',
    operation: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: ''
  });

  const propertyTypes = [
    { value: 'casa', label: 'Casa' },
    { value: 'departamento', label: 'Departamento' },
    { value: 'local', label: 'Local Comercial' },
    { value: 'oficina', label: 'Oficina' },
    { value: 'terreno', label: 'Terreno' }
  ];

  const operations = [
    { value: 'venta', label: 'Venta' },
    { value: 'arriendo', label: 'Arriendo' }
  ];

  const locations = [
    { value: 'santiago-centro', label: 'Santiago Centro' },
    { value: 'providencia', label: 'Providencia' },
    { value: 'las-condes', label: 'Las Condes' },
    { value: 'vitacura', label: 'Vitacura' },
    { value: 'nunoa', label: 'Ñuñoa' },
    { value: 'san-miguel', label: 'San Miguel' }
  ];

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) searchParams.set(key, value);
    });
    navigate(`/propiedades?${searchParams.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-2xl p-8 -mt-16 relative z-10 mx-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Tipo de Propiedad */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Home className="w-4 h-4 mr-2 text-blue-600" />
            Tipo de Propiedad
          </label>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Seleccionar tipo</option>
            {propertyTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Operación */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <DollarSign className="w-4 h-4 mr-2 text-green-600" />
            Operación
          </label>
          <select
            value={filters.operation}
            onChange={(e) => setFilters({ ...filters, operation: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Venta o Arriendo</option>
            {operations.map((op) => (
              <option key={op.value} value={op.value}>
                {op.label}
              </option>
            ))}
          </select>
        </div>

        {/* Ubicación */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <MapPin className="w-4 h-4 mr-2 text-red-600" />
            Ubicación
          </label>
          <select
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Todas las ubicaciones</option>
            {locations.map((location) => (
              <option key={location.value} value={location.value}>
                {location.label}
              </option>
            ))}
          </select>
        </div>

        {/* Precio */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <DollarSign className="w-4 h-4 mr-2 text-green-600" />
            Rango de Precio
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Mín"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <input
              type="number"
              placeholder="Máx"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Dormitorios */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Bed className="w-4 h-4 mr-2 text-purple-600" />
            Dormitorios
          </label>
          <select
            value={filters.bedrooms}
            onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Cualquier cantidad</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>

        {/* Baños */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Bath className="w-4 h-4 mr-2 text-blue-600" />
            Baños
          </label>
          <select
            value={filters.bathrooms}
            onChange={(e) => setFilters({ ...filters, bathrooms: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Cualquier cantidad</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
          </select>
        </div>

        {/* Botón de Búsqueda */}
        <div className="flex items-end">
          <Button
            onClick={handleSearch}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Search className="w-5 h-5 mr-2" />
            Buscar Propiedades
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          variant="outline"
          className="text-blue-600 border-blue-600 hover:bg-blue-50"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filtros Avanzados
        </Button>
      </div>
    </motion.div>
  );
};

export default SearchFilters;
