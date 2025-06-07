import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Edit3, Save, Mail, Phone, Lock, Shield, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { AuthContext } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom'; // Import Link

const Profile = () => {
  const { user, updateUser, logout } = useContext(AuthContext);
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    // profilePicture: '', // URL or path to image
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        // profilePicture: user.profilePicture || '',
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSave = () => {
    // Basic validation
    if (!profileData.name || !profileData.email) {
      toast({
        title: "Error",
        description: "Nombre y email son requeridos.",
        variant: "destructive",
      });
      return;
    }
    // In a real app, this would call an API to update user data
    updateUser({ ...user, ...profileData });
    setIsEditing(false);
    toast({
      title: "Perfil Actualizado",
      description: "Tu información ha sido guardada.",
    });
  };

  const handlePasswordUpdate = () => {
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast({
        title: "Error de Contraseña",
        description: "Las nuevas contraseñas no coinciden.",
        variant: "destructive",
      });
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Error de Contraseña",
        description: "La nueva contraseña debe tener al menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }
    // In a real app, this would call an API to update password
    // For localStorage simulation, this is more complex and often skipped
    // or handled by simply updating the user object if passwords were stored (not recommended for localStorage)
    console.log("Simulando cambio de contraseña:", passwordData);
    setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    toast({
      title: "Contraseña Actualizada",
      description: "Tu contraseña ha sido cambiada exitosamente (simulado).",
    });
  };
  
  // const handleProfilePictureChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setProfileData({ ...profileData, profilePicture: reader.result });
  //       // In a real app, upload to server and save URL
  //       updateUser({ ...user, profilePicture: reader.result }); 
  //       toast({ title: "Foto de perfil actualizada." });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };


  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-sky-100 p-4 text-center">
        <User className="w-16 h-16 text-blue-500 mb-4" />
        <h1 className="text-2xl font-semibold text-gray-700 mb-2">No has iniciado sesión</h1>
        <p className="text-gray-600 mb-6">Por favor, inicia sesión para ver tu perfil.</p>
        <Link to="/">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            Ir a la página de inicio
          </Button>
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
        className="max-w-3xl mx-auto"
      >
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="relative mb-4 sm:mb-0 sm:mr-6">
              <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-blue-500 shadow-lg">
                <AvatarImage src={user.profilePicture || `https://avatar.vercel.sh/${user.email}.png`} alt={user.name} />
                <AvatarFallback className="text-4xl bg-gray-200 text-gray-700">
                  {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {/* <label htmlFor="profilePictureInput" className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors shadow-md">
                <Camera className="w-4 h-4" />
                <input id="profilePictureInput" type="file" accept="image/*" className="hidden" onChange={handleProfilePictureChange} />
              </label> */}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{profileData.name || 'Usuario'}</h1>
              <p className="text-lg text-gray-600">{profileData.email}</p>
              <p className="text-md text-blue-600 font-medium">{profileData.phone || 'Teléfono no especificado'}</p>
            </div>
            <div className="sm:ml-auto mt-4 sm:mt-0">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} className="bg-blue-500 hover:bg-blue-600 text-white">
                  <Edit3 className="w-4 h-4 mr-2" /> Editar Perfil
                </Button>
              ) : (
                <Button onClick={handleProfileSave} className="bg-green-500 hover:bg-green-600 text-white">
                  <Save className="w-4 h-4 mr-2" /> Guardar Cambios
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Profile Information Form */}
        {isEditing && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl shadow-2xl p-8 mb-8 overflow-hidden"
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
              <User className="w-6 h-6 mr-2 text-blue-500" />
              Editar Información Personal
            </h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-lg font-medium text-gray-700">Nombre Completo</Label>
                <Input id="name" name="name" value={profileData.name} onChange={handleProfileChange} className="mt-2 p-3 text-base" />
              </div>
              <div>
                <Label htmlFor="email" className="text-lg font-medium text-gray-700">Correo Electrónico</Label>
                <Input id="email" name="email" type="email" value={profileData.email} onChange={handleProfileChange} className="mt-2 p-3 text-base" />
              </div>
              <div>
                <Label htmlFor="phone" className="text-lg font-medium text-gray-700">Teléfono</Label>
                <Input id="phone" name="phone" type="tel" value={profileData.phone} onChange={handleProfileChange} className="mt-2 p-3 text-base" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Change Password Section */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
            <Lock className="w-6 h-6 mr-2 text-red-500" />
            Cambiar Contraseña
          </h2>
          <div className="space-y-6">
            <div>
              <Label htmlFor="currentPassword" className="text-lg font-medium text-gray-700">Contraseña Actual</Label>
              <Input id="currentPassword" name="currentPassword" type="password" value={passwordData.currentPassword} onChange={handlePasswordChange} className="mt-2 p-3 text-base" />
            </div>
            <div>
              <Label htmlFor="newPassword" className="text-lg font-medium text-gray-700">Nueva Contraseña</Label>
              <Input id="newPassword" name="newPassword" type="password" value={passwordData.newPassword} onChange={handlePasswordChange} className="mt-2 p-3 text-base" />
            </div>
            <div>
              <Label htmlFor="confirmNewPassword" className="text-lg font-medium text-gray-700">Confirmar Nueva Contraseña</Label>
              <Input id="confirmNewPassword" name="confirmNewPassword" type="password" value={passwordData.confirmNewPassword} onChange={handlePasswordChange} className="mt-2 p-3 text-base" />
            </div>
            <div className="flex justify-end">
              <Button onClick={handlePasswordUpdate} className="bg-red-500 hover:bg-red-600 text-white">
                <Shield className="w-4 h-4 mr-2" /> Actualizar Contraseña
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
            <Button variant="outline" onClick={logout} className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700 px-6 py-3 text-base">
                Cerrar Sesión
            </Button>
        </div>

      </motion.div>
    </div>
  );
};

export default Profile;