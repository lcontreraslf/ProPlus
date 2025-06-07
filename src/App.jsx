import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Properties from '@/pages/Properties';
import PropertyDetail from '@/pages/PropertyDetail';
import PropertyDetailGallery from '@/components/PropertyDetail/PropertyDetailGallery';
import PropertyDetailInfo from '@/components/PropertyDetail/PropertyDetailInfo';
import PropertyDetailAgentCard from '@/components/PropertyDetail/PropertyDetailAgentCard';
import PropertyDetailMap from '@/components/PropertyDetail/PropertyDetailMap';
import PropertyDetailSummary from '@/components/PropertyDetail/PropertyDetailSummary';
import Contact from '@/pages/Contact';
import Dashboard from '@/pages/Dashboard';
import AddProperty from '@/pages/AddProperty';
import EditProperty from '@/pages/EditProperty';
import Profile from '@/pages/Profile';
import AuthProvider from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/propiedades" element={<Properties />} />
            <Route path="/propiedades/venta" element={<Properties operationType="venta" />} />
            <Route path="/propiedades/arriendo" element={<Properties operationType="arriendo" />} />
            <Route path="/propiedad/:id" element={<PropertyDetail />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/publicar-propiedad" element={<ProtectedRoute><AddProperty /></ProtectedRoute>} />
            <Route path="/dashboard/editar-propiedad/:id" element={<ProtectedRoute><EditProperty /></ProtectedRoute>} />
            <Route path="/dashboard/perfil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;