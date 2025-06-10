import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// Se mantiene Contact si se usa en el Footer o en la página de Contacto, pero se elimina de navItems
import { Building, Home, Users, Search, Phone, Menu, X, User, LogIn, LogOut, PlusCircle, LayoutDashboard, Contact as ContactIcon } from 'lucide-react'; // Importar Users para el icono de corredores
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // MODIFICADO: Rutas ahora usan parámetros de ruta y se eliminó "Contacto"
  const navItems = [
    { path: '/propiedades/venta', label: 'Propiedades en Venta', icon: Building },
    { path: '/propiedades/arriendo', label: 'Propiedades en Arriendo', icon: Building },
    { path: '/corredores', label: 'Corredores', icon: Users }, // NUEVO: Enlace a Corredores
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // FUNCIÓN PARA REDIRECCIONAR AL DASHBOARD DESPUÉS DE INICIAR SESIÓN
  const handleLoginSuccess = () => {
    setIsAuthModalOpen(false); // Cierra el modal
    navigate('/dashboard'); // Redirige al dashboard
  };

  const getUserInitials = (name) => {
    if (!name) return "U";
    const nameParts = name.split(" ");
    if (nameParts.length > 1) {
      return nameParts[0][0] + nameParts[1][0];
    }
    return nameParts[0][0];
  };


  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"
              >
                <Home className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-xl font-bold text-gradient">PropiedadesPlus</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="relative group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </motion.div>
                    {isActive && (
                      <motion.div
                        layoutId="activeTabDesktop"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Auth/User Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                       <Avatar className="h-10 w-10">
                         <AvatarImage src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.name || user.email}&background=random`} alt={user.name || user.email} />
                         <AvatarFallback>{getUserInitials(user.name || user.email)}</AvatarFallback>
                       </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name || 'Usuario'}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard/perfil" className="flex items-center cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Mi Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="flex items-center cursor-pointer text-red-600 hover:!text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 text-sm"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Iniciar Sesión
                </Button>
              )}
              <Link to={user ? "/dashboard/publicar-propiedad" : "#"} onClick={user ? () => {} : () => setIsAuthModalOpen(true)}>
                <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-5 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 text-sm">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Publicar Propiedad
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 py-4"
            >
              <div className="flex flex-col space-y-1 px-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
                <div className="pt-2 mt-2 border-t border-gray-200 space-y-2">
                  {user ? (
                    <>
                      <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full justify-start bg-transparent text-gray-700 hover:bg-blue-50 hover:text-blue-600 py-3 font-medium">
                          <LayoutDashboard className="w-5 h-5 mr-3" />
                          Dashboard
                        </Button>
                      </Link>
                      <Link to="/dashboard/perfil" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full justify-start bg-transparent text-gray-700 hover:bg-blue-50 hover:text-blue-600 py-3 font-medium">
                          <User className="w-5 h-5 mr-3" />
                          Mi Perfil
                        </Button>
                      </Link>
                      <Link to="/dashboard/publicar-propiedad" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full justify-start bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 py-3 font-medium">
                           <PlusCircle className="w-5 h-5 mr-3" />
                           Publicar Propiedad
                         </Button>
                       </Link>
                      <Button
                        onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                        variant="ghost"
                        className="w-full justify-start text-red-600 hover:bg-red-50 hover:!text-red-700 py-3 font-medium"
                      >
                        <LogOut className="w-5 h-5 mr-3" />
                        Cerrar Sesión
                      </Button>
                    </>
                  ) : (
                    <>
                    <Link to="#" onClick={() => { setIsMobileMenuOpen(false); setIsAuthModalOpen(true); }}>
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 font-medium"
                      >
                        <LogIn className="w-5 h-5 mr-2" />
                        Iniciar Sesión
                      </Button>
                    </Link>
                    <Link to="#" onClick={() => { setIsMobileMenuOpen(false); setIsAuthModalOpen(true); }}>
                        <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 py-3 font-medium">
                           <PlusCircle className="w-5 h-5 mr-3" />
                           Publicar Propiedad
                         </Button>
                       </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>
      <AuthModal isOpen={isAuthModalOpen} setIsOpen={setIsAuthModalOpen} onLoginSuccess={handleLoginSuccess} />
    </>
  );
};

export default Navbar;