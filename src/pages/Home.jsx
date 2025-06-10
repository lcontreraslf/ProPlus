import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, TrendingUp, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Importar Input para el campo de texto
import { Label } from '@/components/ui/label'; // Importar Label si se usa en los filtros
import SearchFilters from '@/components/SearchFilters';
import FeaturedProperties from '@/components/FeaturedProperties';

const Home = () => {
  const stats = [
    { icon: TrendingUp, label: 'Propiedades Vendidas', value: '2,500+' },
    { icon: Users, label: 'Clientes Satisfechos', value: '5,000+' },
    { icon: MapPin, label: 'Ciudades', value: '15+' },
    { icon: Shield, label: 'Años de Experiencia', value: '10+' },
  ];

  const features = [
    {
      icon: Search,
      title: 'Búsqueda Inteligente',
      description: 'Encuentra tu propiedad ideal con nuestros filtros avanzados y recomendaciones personalizadas.'
    },
    {
      icon: MapPin,
      title: 'Ubicaciones Premium',
      description: 'Propiedades en las mejores zonas de la ciudad con acceso a servicios y transporte.'
    },
    {
      icon: Star,
      title: 'Calidad Garantizada',
      description: 'Todas nuestras propiedades pasan por un riguroso proceso de verificación y calidad.'
    }
  ];

  return (
    // MODIFICADO: Añadido pt-16 para que el contenido empiece debajo del Navbar fijo
    <div className="min-h-screen pt-16">
      {/* NUEVA SECCIÓN EN LA PARTE SUPERIOR: Buscador con Imagen Estática (Reemplaza la antigua Hero Section) */}
      <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
        {/* Imagen Estática de Fondo */}
        <img
          src="/images/home-hero-bg.jpg" // REEMPLAZA ESTA URL CON LA RUTA A TU IMAGEN ESTATICA LOCAL REAL (ej. public/images/home-hero-bg.jpg)
          alt="Imagen de fondo de buscador de propiedades"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div> {/* Overlay oscuro */}

        {/* Contenedor del Buscador */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 p-8 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl w-full max-w-4xl mx-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Encuentra tu propiedad ideal
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Dropdown "Comprar" */}
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="comprar">Comprar</option>
              <option value="arrendar">Arrendar</option>
            </select>

            {/* Dropdown "Departamento" */}
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="departamento">Departamento</option>
              <option value="casa">Casa</option>
              <option value="oficina">Oficina</option>
              <option value="local">Local Comercial</option>
            </select>

            {/* Campo de texto "Barrio, Comuna o ciudad" */}
            <Input
              type="text"
              placeholder="Barrio, Comuna o ciudad"
              className="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />

            {/* Botón "Buscar" */}
            <Button className="w-full bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white py-3 font-semibold rounded-lg shadow-md">
              <Search className="w-5 h-5 mr-2" /> Buscar
            </Button>
          </div>
          <div className="text-center">
            <Link to="#" className="text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium">
              Buscar propiedad por código
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Search Section (Esta sección ya existía, ahora debajo del nuevo buscador) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Encuentra tu propiedad perfecta
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Utiliza nuestros filtros avanzados para encontrar exactamente lo que buscas
            </p>
          </motion.div>

          <SearchFilters />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center text-white"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-white/80">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Propiedades Destacadas
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre las mejores oportunidades del mercado inmobiliario
            </p>
          </motion.div>

          <FeaturedProperties />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir PropiedadesPlus?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ofrecemos la mejor experiencia en búsqueda de propiedades
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-xl transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;