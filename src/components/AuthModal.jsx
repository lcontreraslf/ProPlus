import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const AuthModal = ({ isOpen, setIsOpen, onLoginSuccess }) => { // onLoginSuccess will handle redirection
  const [isLoginView, setIsLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { login, register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let formErrors = {};
    if (!formData.email) formErrors.email = "El correo es requerido.";
    if (!formData.password) formErrors.password = "La contraseña es requerida.";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      await login(formData.email, "password"); // Simulate success with any email and "password"

      toast({ title: "Inicio de sesión exitoso", description: "¡Bienvenido de nuevo!" });
      setFormData({ email: '', password: '', name: '', phone: '', confirmPassword: ''});

      // MODIFICADO: Llama a onLoginSuccess y luego cierra el modal
      if (onLoginSuccess) {
        onLoginSuccess(); // <-- Ahora esta función se encarga de la redirección
      }
      setIsOpen(false); // <-- Cierra el modal SIEMPRE después del login exitoso

    } catch (error) {
      toast({ variant: "destructive", title: "Error de inicio de sesión", description: "Correo o contraseña incorrectos (prueba 'password')." });
      setErrors({ general: "Correo o contraseña incorrectos (prueba 'password')." });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    let formErrors = {};
    if (!formData.name) formErrors.name = "El nombre es requerido.";
    if (!formData.email) formErrors.email = "El correo es requerido.";
    else if (!validateEmail(formData.email)) formErrors.email = "Formato de correo inválido.";
    if (!formData.password) formErrors.password = "La contraseña es requerida.";
    else if (!validatePassword(formData.password)) formErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    if (formData.password !== formData.confirmPassword) formErrors.confirmPassword = "Las contraseñas no coinciden.";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      await register(formData.name, formData.email, formData.phone, formData.password);
      toast({ title: "Registro exitoso", description: "¡Bienvenido! Ya puedes iniciar sesión." });
      setIsLoginView(true);
      setFormData({ email: '', password: '', name: '', phone: '', confirmPassword: ''});
    } catch (error) {
      toast({ variant: "destructive", title: "Error de registro", description: error.message });
      setErrors({ general: error.message });
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setErrors({});
    setFormData({ email: '', password: '', name: '', phone: '', confirmPassword: ''});
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gradient">
                  {isLoginView ? 'Iniciar Sesión' : 'Crear Cuenta'}
                </h2>
                <p className="text-gray-600 mt-2">
                  {isLoginView ? 'Bienvenido de nuevo a PropiedadesPlus' : 'Únete a nuestra comunidad'}
                </p>
              </div>

              {errors.general && <p className="text-red-500 text-sm text-center mb-4">{errors.general}</p>}

              <form onSubmit={isLoginView ? handleLogin : handleRegister} className="space-y-6">
                {!isLoginView && (
                  <div className="space-y-2">
                    <Label htmlFor="name-modal" className="flex items-center text-gray-700">
                      <User size={16} className="mr-2" /> Nombre Completo
                    </Label>
                    <Input id="name-modal" name="name" type="text" placeholder="Ej: Juan Pérez" value={formData.name} onChange={handleChange} className={errors.name ? 'border-red-500' : ''} />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email-modal" className="flex items-center text-gray-700">
                    <Mail size={16} className="mr-2" /> Correo Electrónico
                  </Label>
                  <Input id="email-modal" name="email" type="email" placeholder="tu@email.com" value={formData.email} onChange={handleChange} className={errors.email ? 'border-red-500' : ''} />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                </div>

                {!isLoginView && (
                  <div className="space-y-2">
                    <Label htmlFor="phone-modal" className="flex items-center text-gray-700">
                      <Phone size={16} className="mr-2" /> Teléfono (Opcional)
                    </Label>
                    <Input id="phone-modal" name="phone" type="tel" placeholder="+56 9 1234 5678" value={formData.phone} onChange={handleChange} />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password-modal" className="flex items-center text-gray-700">
                    <Lock size={16} className="mr-2" /> Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      id="password-modal"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className={errors.password ? 'border-red-500' : ''}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                </div>

                {!isLoginView && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword-modal" className="flex items-center text-gray-700">
                      <Lock size={16} className="mr-2" /> Confirmar Contraseña
                    </Label>
                    <Input
                      id="confirmPassword-modal"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={errors.confirmPassword ? 'border-red-500' : ''}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
                  </div>
                )}

                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl">
                  {isLoginView ? 'Iniciar Sesión' : 'Crear Cuenta'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button onClick={toggleView} className="text-blue-600 hover:text-blue-800 transition-colors font-medium">
                  {isLoginView ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;