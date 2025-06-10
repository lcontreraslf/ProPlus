import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useSearchParams, useLocation as useRouterLocation } from 'react-router-dom';
import { Filter, Grid, List, SortAsc, MapPin, Bed, Bath, Square, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SearchFilters from '@/components/SearchFilters';

const Properties = () => {
  const { operationType } = useParams();

  const [searchParams] = useSearchParams();
  const routerLocation = useRouterLocation();

  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  // Mock properties data - MODIFIED TO SHOW 8 PROPERTIES BY REPEATING THE EXISTING ONES
  const baseProperties = [
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
      description: 'Hermoso departamento con vista panorámica y acabados de lujo',
      imageUrl: {
        small: '/images/propiedad-1-m.jpg', // mobile image
        medium: '/images/propiedad-1-i.jpg', // intermediate image
        large: '/images/propiedad-1-d.jpg', // desktop image
      }
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
      description: 'Amplia casa con jardín y piscina, ideal para familias',
      imageUrl: {
        small: '/images/propiedad-2-m.jpg',
        medium: '/images/propiedad-2-i.jpg',
        large: '/images/propiedad-2-d.jpg',
      }
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
      description: 'Loft de diseño único con techos altos y mucha luz natural',
      imageUrl: {
        small: '/images/propiedad-3-m.jpg',
        medium: '/images/propiedad-3-i.jpg',
        large: '/images/propiedad-3-d.jpg',
      }
    },
  ];

  // Repeat the base properties to create 8 entries
  const allProperties = [
    ...baseProperties,
    ...baseProperties.map(prop => ({ ...prop, id: `${prop.id}_dup1`, title: `${prop.title} (Rep. 1)` })),
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
      description: 'Penthouse exclusivo con terraza privada y vista a la cordillera',
      imageUrl: {
        small: '/images/propiedad-1-m.jpg',
        medium: '/images/propiedad-1-i.jpg',
        large: '/images/propiedad-1-d.jpg',
      }
    },
    {
      id: 5,
      title: 'Oficina Premium en Santiago Centro',
      price: 3500000,
      operation: 'arriendo',
      location: 'Santiago Centro',
      bedrooms: 0,
      bathrooms: 2,
      area: 95,
      type: 'oficina',
      description: 'Oficina moderna en edificio corporativo con todas las comodidades',
      imageUrl: {
        small: '/images/propiedad-2-m.jpg',
        medium: '/images/propiedad-2-i.jpg',
        large: '/images/propiedad-2-d.jpg',
      }
    },
  ];

  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    let currentOperationForDisplayAndFiltering = operationType || 'todas';

    let filtered = allProperties;

    if (currentOperationForDisplayAndFiltering && currentOperationForDisplayAndFiltering !== 'todas') {
      filtered = filtered.filter(p => p.operation === currentOperationForDisplayAndFiltering);
    }

    const type = searchParams.get('type');
    const locationParam = searchParams.get('location');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const bedrooms = searchParams.get('bedrooms');
    const bathrooms = searchParams.get('bathrooms');

    if (type) {
      filtered = filtered.filter(p => p.type === type);
    }
    if (locationParam) {
      filtered = filtered.filter(p => p.location.toLowerCase().includes(locationParam.toLowerCase().replace('-', ' ')));
    }
    if (minPrice) {
      filtered = filtered.filter(p => p.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(p => p.price <= parseInt(maxPrice));
    }
    if (bedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= parseInt(bedrooms));
    }
    if (bathrooms) {
      filtered = filtered.filter(p => p.bathrooms >= parseInt(bathrooms));
    }

    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'area') {
      filtered.sort((a, b) => b.area - a.area);
    } else {
      filtered.sort((a, b) => b.id - a.id);
    }

    setFilteredProperties(filtered);
  }, [searchParams, sortBy, operationType, routerLocation.pathname]);

  const formatPrice = (price, operation) => {
    if (operation === 'venta') {
      return `${(price / 1000000).toFixed(0)}M`;
    } else {
      return `${price.toLocaleString()}/mes`;
    }
  };

  const PropertyCard = ({ property, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`property-card bg-white rounded-2xl shadow-lg overflow-hidden group ${
        viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
      }`}
    >
      <div className={`relative overflow-hidden ${
        viewMode === 'list' ? 'w-full sm:w-80 h-48 sm:h-auto' : 'h-64'
      }`}>
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          alt={`${property.title} - Propiedad en ${property.location}`}
          src={property.imageUrl.medium}
          srcSet={`${property.imageUrl.small} 400w,
                   ${property.imageUrl.medium} 800w,
                   ${property.imageUrl.large} 1600w`}
          sizes="(max-width: 640px) 400px,
                 (max-width: 1024px) 800px,
                 1200px"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
            property.operation === 'venta' ? 'bg-green-500' : 'bg-blue-500'
          }`}>
            {property.operation === 'venta' ? 'En Venta' : 'En Arriendo'}
          </span>
        </div>

        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button variant="ghost" size="icon" className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
            <Heart className="w-4 h-4 text-gray-700 hover:text-red-500" />
          </Button>
        </div>

        <div className="absolute bottom-4 left-4">
          <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(property.price, property.operation)}
            </span>
          </div>
        </div>
      </div>

      <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
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

        <Link to={`/propiedad/${property.id}`}>
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 rounded-lg font-medium transition-all duration-200">
            <Eye className="w-4 h-4 mr-2" /> Ver Detalles
          </Button>
        </Link>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {operationType ? `Propiedades en ${operationType.charAt(0).toUpperCase() + operationType.slice(1)}` : 'Todas las Propiedades'}
          </h1>
          <p className="text-xl text-gray-600">
            {filteredProperties.length > 0 ? (
              operationType ? (
                `Encontramos ${filteredProperties.length} propiedades en ${operationType === 'venta' ? 'venta' : 'arriendo'}.`
              ) : (
                `Encontramos ${filteredProperties.length} propiedades que coinciden con tu búsqueda.`
              )
            ) : (
              operationType ? (
                `No encontramos propiedades en ${operationType === 'venta' ? 'venta' : 'arriendo'} que coincidan con tu búsqueda.`
              ) : (
                'Explora nuestro catálogo de propiedades.'
              )
            )}
          </p>
        </motion.div>

        {/* Search Filters Section - adapted to be toggleable */}
        <div className="mb-8">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full md:w-auto flex items-center justify-center space-x-2 text-lg py-3 px-6 mb-4"
            >
              <Filter className="w-5 h-5" />
              <span>{showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros Avanzados'}</span>
            </Button>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                // MODIFIED: Increased padding-top for better visual separation
                className="overflow-hidden pt-8 px-6 pb-6 bg-white rounded-xl shadow-lg" // Added pt-8, px-6, pb-6 and bg-white/shadow for visual container
              >
                <SearchFilters />
              </motion.div>
            )}
        </div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 p-4 bg-white rounded-xl shadow-md"
        >
          <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-700">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="newest">Más Recientes</option>
              <option value="price-low">Precio: Menor a Mayor</option>
              <option value="price-high">Precio: Mayor a Menor</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-700">Vista:</span>
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="transition-all"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="transition-all"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        <div className={`${
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'
            : 'space-y-6'
        }`}>
          {filteredProperties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No encontramos propiedades
            </h3>
            <p className="text-gray-600 mb-6">
              Intenta ajustar tus filtros de búsqueda o revisa todas las propiedades.
            </p>
            <Link to="/propiedades">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Eye className="w-4 h-4 mr-2" /> Ver Todas las Propiedades
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Properties;