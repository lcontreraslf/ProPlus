import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('propiedadesplus_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulación de login
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // En una app real, verificarías credenciales contra un backend
        // Aquí, asumimos que cualquier correo es válido si la contraseña es "password"
        if (password === "password") { 
          const mockUser = { 
            id: '1', 
            email: email, 
            name: email.split('@')[0], // Nombre simulado
            phone: '123456789', // Teléfono simulado
            avatarUrl: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`
          };
          localStorage.setItem('propiedadesplus_user', JSON.stringify(mockUser));
          setUser(mockUser);
          resolve(mockUser);
        } else {
          reject(new Error("Correo o contraseña incorrectos."));
        }
      }, 1000);
    });
  };

  const register = async (name, email, phone, password) => {
    // Simulación de registro
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // En una app real, guardarías el usuario en la base de datos
        // Aquí, solo simulamos el éxito
        // Validar si el usuario ya existe (simulado)
        const existingUsers = JSON.parse(localStorage.getItem('propiedadesplus_all_users') || '[]');
        if (existingUsers.find(u => u.email === email)) {
          reject(new Error("Este correo electrónico ya está registrado."));
          return;
        }
        
        const newUser = { id: Date.now().toString(), name, email, phone, avatarUrl: `https://ui-avatars.com/api/?name=${name}&background=random` };
        existingUsers.push(newUser);
        localStorage.setItem('propiedadesplus_all_users', JSON.stringify(existingUsers));
        
        resolve(newUser); // No logueamos automáticamente, el usuario debe iniciar sesión.
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('propiedadesplus_user');
    setUser(null);
    toast({ title: "Cierre de sesión exitoso" });
  };

  const updateUserProfile = async (updatedData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user) {
          const updatedUser = { ...user, ...updatedData };
          localStorage.setItem('propiedadesplus_user', JSON.stringify(updatedUser));
          setUser(updatedUser);
          resolve(updatedUser);
        } else {
          reject(new Error("No hay usuario logueado."));
        }
      }, 500);
    });
  };


  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;