import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Properties from '@/pages/Properties';
import PropertyDetail from '@/pages/PropertyDetail';
import Contact from '@/pages/Contact';
import Dashboard from '@/pages/Dashboard';
import AddProperty from '@/pages/AddProperty';
import EditProperty from '@/pages/EditProperty';
import Profile from '@/pages/Profile';
import AuthProvider from '@/contexts/AuthContext'; // Importación corregida
import ProtectedRoute from '@/components/ProtectedRoute';
import Footer from '@/components/Footer'; // Importar el componente Footer
import Brokers from '@/pages/Brokers'; // Importar la nueva página de Brokers

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Added flex flex-col to ensure content pushes footer down */}
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
          <Navbar />
          {/* This div ensures content takes up available space, pushing footer down */}
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* MODIFICADO: Ruta para Properties ahora usa un parámetro opcional operationType */}
              {/* Esto maneja /propiedades, /propiedades/venta, y /propiedades/arriendo */}
              <Route path="/propiedades/:operationType?" element={<Properties />} />

              <Route path="/propiedad/:id" element={<PropertyDetail />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/corredores" element={<Brokers />} /> {/* NUEVA RUTA PARA CORREDORES */}

              {/* Rutas protegidas que requieren autenticación */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/dashboard/publicar-propiedad" element={<ProtectedRoute><AddProperty /></ProtectedRoute>} />
              <Route path="/dashboard/editar-propiedad/:id" element={<ProtectedRoute><EditProperty /></ProtectedRoute>} />
              <Route path="/dashboard/perfil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Routes>
          </div>
          <Footer /> {/* Renderizar el Footer aquí */}
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;