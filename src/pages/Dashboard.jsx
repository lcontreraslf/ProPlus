import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusCircle, Edit3, Trash2, Eye, BarChart, User, LogOut, Home, MapPin, DollarSign, Building, ListFilter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Mock de datos de propiedades del usuario. Reemplazar con API real.
const initialUserProperties = [
  { id: 'prop1', title: 'Luminoso Departamento en Las Condes', status: 'publicada', price: 220000000, type: 'departamento', location: 'Las Condes', imageUrl: { small: '/images/propiedad-1-m.jpg', medium: '/images/propiedad-1-i.jpg', large: '/images/propiedad-1-d.jpg' }, operation: 'venta' },
  { id: 'prop2', title: 'Casa con Jardín en Ñuñoa', status: 'en revisión', price: 1800000, type: 'casa', location: 'Ñuñoa', imageUrl: { small: '/images/propiedad-2-m.jpg', medium: '/images/propiedad-2-i.jpg', large: '/images/propiedad-2-d.jpg' }, operation: 'arriendo' },
  { id: 'prop3', title: 'Oficina Moderna en Providencia', status: 'vendida', price: 95000000, type: 'oficina', location: 'Providencia', imageUrl: { small: '/images/propiedad-3-m.jpg', medium: '/images/propiedad-3-i.jpg', large: '/images/propiedad-3-d.jpg' }, operation: 'venta' },
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState('todas');

  useEffect(() => {
    const storedProperties = localStorage.getItem(`user_properties_${user?.id}`);
    if (storedProperties) {
      setProperties(JSON.parse(storedProperties));
    } else {
      setProperties(initialUserProperties);
      if(user?.id) localStorage.setItem(`user_properties_${user?.id}`, JSON.stringify(initialUserProperties));
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteProperty = (propertyId) => {
    const updatedProperties = properties.filter(p => p.id !== propertyId);
    setProperties(updatedProperties);
    if(user?.id) localStorage.setItem(`user_properties_${user?.id}`, JSON.stringify(updatedProperties));
    toast({ title: "Propiedad eliminada", description: "La propiedad ha sido eliminada exitosamente." });
  };

  const filteredProperties = properties.filter(property => {
    if (filter === 'todas') return true;
    return property.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'publicada': return 'bg-green-100 text-green-700';
      case 'en revisión': return 'bg-yellow-100 text-yellow-700';
      case 'vendida': return 'bg-blue-100 text-blue-700';
      case 'arrendada': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatPrice = (price, operation) => {
    if (operation === 'venta') {
      return `$${(price / 1000000).toFixed(0)}M`;
    } else {
      return `$${price.toLocaleString()}/mes`;
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-20">
        <p className="text-2xl font-semibold mb-4">Debes iniciar sesión para ver el dashboard.</p>
        <Link to="/">
          <Button>Volver al Inicio</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-slate-100 to-sky-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard de {user.name}</h1>
          <p className="text-xl text-gray-600 mt-2">Gestiona tus propiedades y tu perfil.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* MODIFIED: Changed gradient to be more noticeable (from-gray-100 to-gray-200) */}
            <motion.div
              initial={{ opacity:0, x: -20 }}
              animate={{ opacity:1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-xl shadow-lg mb-6" // Degradado de grises
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Navegación</h2>
              <nav className="space-y-2">
                <Link to="/dashboard/publicar-propiedad">
                  <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    <PlusCircle className="mr-3 h-5 w-5" /> Publicar Nueva Propiedad
                  </Button>
                </Link>
                <Link to="/dashboard/perfil">
                  <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    <User className="mr-3 h-5 w-5" /> Mi Perfil
                  </Button>
                </Link>
                <Button variant="ghost" onClick={handleLogout} className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700">
                  <LogOut className="mr-3 h-5 w-5" /> Cerrar Sesión
                </Button>
              </nav>
            </motion.div>

            {/* MODIFIED: Changed gradient to be more noticeable */}
            <motion.div
              initial={{ opacity:0, x: -20 }}
              animate={{ opacity:1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-xl shadow-lg" // Degradado de grises
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <ListFilter className="mr-2 h-5 w-5 text-blue-600" /> Filtros
              </h2>
              <div className="space-y-2">
                {['todas', 'publicada', 'en revisión', 'vendida', 'arrendada'].map((statusFilter) => (
                  <Button
                    key={statusFilter}
                    variant={filter === statusFilter ? 'default' : 'outline'}
                    onClick={() => setFilter(statusFilter)}
                    className={`w-full justify-start capitalize ${filter === statusFilter ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
                  >
                    {statusFilter.replace('-', ' ')}
                  </Button>
                ))}
              </div>
            </motion.div>
          </aside>

          {/* Main Content (Contenedor de Mis Propiedades) */}
          {/* MODIFIED: Added gradient background to the main section container */}
          <main className="lg:col-span-3">
            <motion.section
              initial={{ opacity:0, y: 20 }}
              animate={{ opacity:1, y: 0 }}
              transition={{ delay: 0.3 }}
              // Aplicamos un degradado para que se diferencie del fondo y de las tarjetas internas (que son bg-white)
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg" // Degradado sutil azulado
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Mis Propiedades ({filteredProperties.length})</h2>
                <Link to="/dashboard/publicar-propiedad">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:shadow-lg">
                    <PlusCircle className="mr-2 h-5 w-5" /> Publicar Nueva
                  </Button>
                </Link>
              </div>

              {filteredProperties.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                  <Home className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No tienes propiedades {filter !== 'todas' ? `con estado "${filter}"` : 'publicadas aún'}.</h3>
                  <p className="text-gray-500 mb-6">¡Empieza publicando tu primera propiedad!</p>
                  <Link to="/dashboard/publicar-propiedad">
                    <Button size="lg" className="bg-gradient-to-r from-green-500 to-teal-500 text-white">Publicar Ahora</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredProperties.map((prop, index) => (
                    <motion.div
                      key={prop.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3 h-48 md:h-auto rounded-lg overflow-hidden">
                          <img
                            className="w-full h-full object-cover"
                            alt={prop.title}
                            src={prop.imageUrl.medium}
                            srcSet={`${prop.imageUrl.small} 400w,
                                     ${prop.imageUrl.medium} 800w,
                                     ${prop.imageUrl.large} 1600w`}
                            sizes="(max-width: 768px) 100vw,
                                   (max-width: 1024px) 33vw,
                                   250px"
                          />
                        </div>
                        <div className="md:w-2/3">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-gray-800">{prop.title}</h3>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(prop.status)}`}>
                              {prop.status.replace('-', ' ')}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1 mb-4">
                            <p className="flex items-center"><MapPin size={14} className="mr-2 text-blue-500" /> {prop.location}</p>
                            <p className="flex items-center"><Building size={14} className="mr-2 text-purple-500" /> Tipo: <span className="font-medium capitalize ml-1">{prop.type}</span></p>
                            <p className="flex items-center"><DollarSign size={14} className="mr-2 text-green-500" /> Precio: <span className="font-medium ml-1">{formatPrice(prop.price, prop.operation)}</span></p>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            <Link to={`/propiedad/${prop.id}`}>
                              <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                                <Eye className="mr-2 h-4 w-4" /> Ver
                              </Button>
                            </Link>
                            <Link to={`/dashboard/editar-propiedad/${prop.id}`}>
                              <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                                <Edit3 className="mr-2 h-4 w-4" /> Editar
                              </Button>
                            </Link>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                                  <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>¿Estás seguro de eliminar esta propiedad?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción no se puede deshacer. La propiedad "{prop.title}" será eliminada permanentemente.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteProperty(prop.id)} className="bg-red-600 hover:bg-red-700">
                                    Sí, eliminar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.section>
          </main>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;