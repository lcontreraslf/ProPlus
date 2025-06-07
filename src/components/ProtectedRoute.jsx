import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    // Redirige a la página de inicio o login, guardando la ubicación actual
    // para que el usuario pueda ser redirigido de nuevo después de iniciar sesión.
    // Por ahora, no hay un modal de login en una ruta separada, así que redirigimos a home.
    // Si tuvieras una ruta /login, podrías usar: return <Navigate to="/login" state={{ from: location }} replace />;
    return <Navigate to="/" state={{ from: location, openLoginModal: true }} replace />;
  }

  return children;
};

export default ProtectedRoute;