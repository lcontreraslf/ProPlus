import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit3, Upload, Trash2, AlertCircle, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { AuthContext } from '@/contexts/AuthContext';

const EditProperty = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const { user } = useContext(AuthContext);

  const [propertyData, setPropertyData] = useState(null);
  const [currentFeature, setCurrentFeature] = useState('');
  const [imageFiles, setImageFiles] = useState([]); // For new uploads
  const [existingImageUrls, setExistingImageUrls] = useState([]); // For existing images

  useEffect(() => {
    const allProperties = JSON.parse(localStorage.getItem('properties') || '[]');
    const propertyToEdit = allProperties.find(p => p.id === parseInt(id));

    if (propertyToEdit) {
      if (user && propertyToEdit.userId !== user.id) {
        toast({
          title: "Acceso Denegado",
          description: "No tienes permiso para editar esta propiedad.",
          variant: "destructive",
        });
        navigate('/dashboard');
        return;
      }
      setPropertyData(propertyToEdit);
      setExistingImageUrls(propertyToEdit.images || []);
    } else {
      toast({
        title: "Propiedad no encontrada",
        description: "La propiedad que intentas editar no existe.",
        variant: "destructive",
      });
      navigate('/dashboard');
    }
  }, [id, navigate, toast, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({ ...propertyData, [name]: value });
  };

  const handleFeatureAdd = () => {
    if (currentFeature.trim() !== '') {
      setPropertyData({
        ...propertyData,
        features: [...(propertyData.features || []), currentFeature.trim()],
      });
      setCurrentFeature('');
    }
  };

  const handleFeatureRemove = (index) => {
    setPropertyData({
      ...propertyData,
      features: propertyData.features.filter((_, i) => i !== index),
    });
  };
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImageFiles = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    // Allow up to 5 images in total (existing + new)
    const totalAllowed = 5;
    const currentTotalImages = existingImageUrls.length + imageFiles.length;
    const canAdd = totalAllowed - currentTotalImages;

    if (newImageFiles.length > canAdd) {
        toast({
            title: "Límite de imágenes alcanzado",
            description: `Solo puedes agregar ${canAdd} imágenes más. (Máximo 5 en total)`,
            variant: "destructive",
        });
    }
    setImageFiles(prev => [...prev, ...newImageFiles.slice(0, canAdd)]);
  };

  const handleNewImageRemove = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleExistingImageRemove = (index) => {
    setExistingImageUrls(prev => prev.filter((_, i) => i !== index));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Error de autenticación",
        description: "Debes iniciar sesión para editar una propiedad.",
        variant: "destructive",
      });
      return;
    }

    if (existingImageUrls.length + imageFiles.length === 0) {
      toast({
        title: "Imágenes requeridas",
        description: "Por favor, mantén o sube al menos una imagen de la propiedad.",
        variant: "destructive",
      });
      return;
    }

    // Simulate image upload for new files
    const newUploadedImageUrls = imageFiles.map(imgFile => imgFile.preview); 

    const updatedProperty = {
      ...propertyData,
      images: [...existingImageUrls, ...newUploadedImageUrls], // Combine existing and new
      updatedAt: new Date().toISOString(),
    };

    const existingProperties = JSON.parse(localStorage.getItem('properties') || '[]');
    const updatedProperties = existingProperties.map(p => (p.id === parseInt(id) ? updatedProperty : p));
    localStorage.setItem('properties', JSON.stringify(updatedProperties));

    toast({
      title: "¡Propiedad Actualizada!",
      description: `${propertyData.title} ha sido actualizada exitosamente.`,
      action: <CheckCircle className="text-green-500" />,
    });
    navigate('/dashboard');
  };
  
  const propertyTypes = [
    { value: 'casa', label: 'Casa' },
    { value: 'departamento', label: 'Departamento' },
    { value: 'local', label: 'Local Comercial' },
    { value: 'oficina', label: 'Oficina' },
    { value: 'terreno', label: 'Terreno' }
  ];

  const operations = [
    { value: 'venta', label: 'Venta' },
    { value: 'arriendo', label: 'Arriendo' }
  ];

  if (!propertyData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-sky-100">
        <p className="text-xl text-gray-700">Cargando datos de la propiedad...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-slate-100 to-sky-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto p-6 md:p-8 bg-white rounded-xl shadow-2xl"
      >
        <div className="flex items-center mb-8">
          <Edit3 className="w-10 h-10 text-blue-600 mr-3" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Editar Propiedad</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
           {/* Basic Info */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title" className="text-lg font-medium text-gray-700">Título de la Propiedad</Label>
              <Input id="title" name="title" value={propertyData.title} onChange={handleChange} placeholder="Ej: Hermoso Departamento con Vista al Mar" required className="mt-2 p-3 text-base"/>
            </div>
            <div>
              <Label htmlFor="price" className="text-lg font-medium text-gray-700">Precio (CLP)</Label>
              <Input id="price" name="price" type="number" value={propertyData.price} onChange={handleChange} placeholder="Ej: 150000000" required className="mt-2 p-3 text-base"/>
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-lg font-medium text-gray-700">Descripción Detallada</Label>
            <Textarea id="description" name="description" value={propertyData.description} onChange={handleChange} placeholder="Describe tu propiedad en detalle..." required rows={5} className="mt-2 p-3 text-base"/>
          </div>

          {/* Type and Operation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="operation" className="text-lg font-medium text-gray-700">Operación</Label>
              <select id="operation" name="operation" value={propertyData.operation} onChange={handleChange} className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-base">
                {operations.map(op => <option key={op.value} value={op.value}>{op.label}</option>)}
              </select>
            </div>
            <div>
              <Label htmlFor="type" className="text-lg font-medium text-gray-700">Tipo de Propiedad</Label>
              <select id="type" name="type" value={propertyData.type} onChange={handleChange} className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-base">
                {propertyTypes.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}
              </select>
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="location" className="text-lg font-medium text-gray-700">Comuna/Sector</Label>
              <Input id="location" name="location" value={propertyData.location} onChange={handleChange} placeholder="Ej: Providencia, Santiago" required className="mt-2 p-3 text-base"/>
            </div>
            <div>
              <Label htmlFor="address" className="text-lg font-medium text-gray-700">Dirección Exacta</Label>
              <Input id="address" name="address" value={propertyData.address} onChange={handleChange} placeholder="Ej: Av. Siempre Viva 123" required className="mt-2 p-3 text-base"/>
            </div>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="bedrooms" className="text-lg font-medium text-gray-700">Dormitorios</Label>
              <Input id="bedrooms" name="bedrooms" type="number" value={propertyData.bedrooms} onChange={handleChange} placeholder="Ej: 3" className="mt-2 p-3 text-base"/>
            </div>
            <div>
              <Label htmlFor="bathrooms" className="text-lg font-medium text-gray-700">Baños</Label>
              <Input id="bathrooms" name="bathrooms" type="number" value={propertyData.bathrooms} onChange={handleChange} placeholder="Ej: 2" className="mt-2 p-3 text-base"/>
            </div>
            <div>
              <Label htmlFor="area" className="text-lg font-medium text-gray-700">Superficie (m²)</Label>
              <Input id="area" name="area" type="number" value={propertyData.area} onChange={handleChange} placeholder="Ej: 120" className="mt-2 p-3 text-base"/>
            </div>
          </div>
          
          {/* Features */}
          <div>
            <Label className="text-lg font-medium text-gray-700">Características Adicionales</Label>
            <div className="flex items-center mt-2">
              <Input value={currentFeature} onChange={(e) => setCurrentFeature(e.target.value)} placeholder="Ej: Piscina, Quincho, Bodega" className="mr-2 p-3 text-base"/>
              <Button type="button" onClick={handleFeatureAdd} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 text-base">Agregar</Button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(propertyData.features || []).map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-sm"
                >
                  {feature}
                  <button type="button" onClick={() => handleFeatureRemove(index)} className="ml-2 text-red-500 hover:text-red-700">
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <Label htmlFor="images" className="text-lg font-medium text-gray-700">Imágenes de la Propiedad (Máx. 5 en total)</Label>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
              {existingImageUrls.map((url, index) => (
                <motion.div
                  key={`existing-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative group"
                >
                  <img  
                    src={url} 
                    alt={`Imagen existente ${index + 1}`} 
                    className="w-full h-32 object-cover rounded-lg shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleExistingImageRemove(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
              {imageFiles.map((imgFile, index) => (
                <motion.div
                  key={`new-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative group"
                >
                  <img  
                    src={imgFile.preview} 
                    alt={`Preview nueva ${index + 1}`} 
                    className="w-full h-32 object-cover rounded-lg shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleNewImageRemove(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
            </div>
            {(existingImageUrls.length + imageFiles.length) < 5 && (
              <div className="mt-2 p-6 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-500 transition">
                <Input id="images" type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                <Upload className="mx-auto w-12 h-12 text-gray-400 mb-2" />
                <p className="text-gray-600">Añadir más imágenes o <span className="text-blue-500 font-semibold">haz clic para seleccionar</span>.</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF hasta 10MB</p>
              </div>
            )}
          </div>


          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={() => navigate('/dashboard')} className="mr-4 px-8 py-3 text-base">
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
              <Edit3 className="w-5 h-5 mr-2" />
              Actualizar Propiedad
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditProperty;