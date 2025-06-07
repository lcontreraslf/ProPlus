
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, TrendingUp, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-bg hero-pattern"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Tu hogar ideal
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                te espera
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Descubre miles de propiedades en venta y arriendo. Desde departamentos modernos hasta casas familiares, encuentra el lugar perfecto para ti.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/propiedades">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 pulse-glow">
                  <Search className="w-5 h-5 mr-2" />
                  Explorar Propiedades
                </Button>
              </Link>
              
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm">
                Ver Video Tour
              </Button>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full floating-animation"
            style={{ animationDelay: '0s' }}
          />
          <motion.div
            className="absolute top-40 right-20 w-16 h-16 bg-yellow-400/20 rounded-full floating-animation"
            style={{ animationDelay: '2s' }}
          />
          <motion.div
            className="absolute bottom-40 left-20 w-12 h-12 bg-orange-500/20 rounded-full floating-animation"
            style={{ animationDelay: '4s' }}
          />
        </div>

        {/* Hero Images */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Search Section */}
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              ¿Listo para encontrar tu nuevo hogar?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Únete a miles de personas que ya encontraron su propiedad ideal con nosotros
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/propiedades">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-xl">
                  Comenzar Búsqueda
                </Button>
              </Link>
              <Link to="/contacto">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl">
                  Hablar con un Experto
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
