import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Si usas el componente Button para enlaces

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Columna 1: Logo y Descripción Corta */}
        <div className="col-span-1 space-y-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">PropiedadesPlus</span>
          </Link>
          <p className="text-gray-300 text-sm">
            Encuentra tu hogar ideal o la inversión perfecta con PropiedadesPlus. Tu aliado confiable en el mercado inmobiliario.
          </p>
          <div className="flex space-x-3">
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><Facebook size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>

        {/* Columna 2: Enlaces Rápidos */}
        <div className="col-span-1 space-y-4">
          <h3 className="text-lg font-semibold text-white mb-2">Enlaces Rápidos</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm">Inicio</Link></li>
            <li><Link to="/propiedades/venta" className="text-gray-300 hover:text-white transition-colors text-sm">Propiedades en Venta</Link></li>
            <li><Link to="/propiedades/arriendo" className="text-gray-300 hover:text-white transition-colors text-sm">Propiedades en Arriendo</Link></li>
            <li><Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors text-sm">Dashboard</Link></li>
          </ul>
        </div>

        {/* Columna 3: Información de Contacto (Movida desde Navbar) */}
        <div className="col-span-1 space-y-4">
          <h3 className="text-lg font-semibold text-white mb-2">Contacto</h3>
          <div className="flex items-center space-x-3">
            <Phone size={18} className="text-blue-400" />
            <span className="text-gray-300 text-sm">+56 2 2345 6789</span>
          </div>
          <div className="flex items-center space-x-3">
            <Mail size={18} className="text-blue-400" />
            <span className="text-gray-300 text-sm">info@propiedadesplus.cl</span>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin size={18} className="text-blue-400 mt-0.5" />
            <span className="text-gray-300 text-sm">Av. Providencia 1234, Piso 10, Providencia, Santiago</span>
          </div>
          {/* Enlace al formulario de contacto completo */}
          <Link to="/contacto">
            <Button variant="outline" className="mt-4 border-blue-400 text-blue-400 hover:bg-blue-900 hover:text-white">
              Formulario de Contacto
            </Button>
          </Link>
        </div>

        {/* Columna 4: Mapa o Enlaces Útiles (Opcional, Puedes Personalizar) */}
        <div className="col-span-1 space-y-4">
          <h3 className="text-lg font-semibold text-white mb-2">Más Información</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Aviso Legal</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Política de Privacidad</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Términos y Condiciones</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} PropiedadesPlus. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;