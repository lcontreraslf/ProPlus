import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const PropertyDetailGallery = ({ images, title, operation }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  // const [showImageModal, setShowImageModal] = useState(false); // Modal logic can be added later

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Eliminado de favoritos" : "Agregado a favoritos",
      description: `La propiedad "${title}" ha sido ${isFavorite ? 'eliminada de' : 'agregada a'} tus favoritos.`,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Echa un vistazo a esta propiedad: ${title}`,
        url: window.location.href,
      })
      .then(() => toast({ title: "Propiedad compartida" }))
      .catch((error) => toast({ title: "Error al compartir", description: error.message, variant: "destructive" }));
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => toast({ title: "Enlace copiado", description: "El enlace de la propiedad ha sido copiado al portapapeles." }))
        .catch(() => toast({ title: "Error al copiar enlace", variant: "destructive" }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <div className="relative h-96 md:h-[500px]">
        {/* MODIFIED: Use local image path for the main gallery image */}
        <img
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
          alt={`${title} - Imagen ${currentImageIndex + 1}`}
          src={images[currentImageIndex]} // Directly use the local image path
        />

        <Button
          onClick={prevImage}
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-md"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </Button>
        <Button
          onClick={nextImage}
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-md"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </Button>

        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {images.length}
        </div>

        <div className="absolute top-4 right-4 flex space-x-2">
          <Button
            onClick={handleFavorite}
            variant="outline"
            size="icon"
            className={`p-2 rounded-full transition-colors shadow-md ${
              isFavorite ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            size="icon"
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-md"
          >
            <Share2 className="w-5 h-5 text-gray-700" />
          </Button>
          {/* <Button
            onClick={() => setShowImageModal(true)}  // Implement modal later
            variant="outline"
            size="icon"
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-md"
          >
            <Maximize2 className="w-5 h-5 text-gray-700" />
          </Button> */}
        </div>

        <div className="absolute top-4 left-4">
          <span className={`px-4 py-2 rounded-full text-sm font-semibold text-white shadow-md ${
            operation === 'venta' ? 'bg-gradient-to-r from-green-500 to-teal-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'
          }`}>
            {operation === 'venta' ? 'En Venta' : 'En Arriendo'}
          </span>
        </div>
      </div>

      <div className="flex space-x-2 p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {images.map((imagePath, index) => ( // Renamed 'image' to 'imagePath' for clarity
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ease-in-out hover:opacity-100
              ${index === currentImageIndex ? 'border-blue-600 scale-105 shadow-md' : 'border-transparent opacity-70'
            }`}
          >
            {/* MODIFIED: Use local image path for thumbnails */}
            <img
              className="w-full h-full object-cover"
              alt={`Thumbnail ${index + 1}`}
              src={imagePath} // Directly use the local image path
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default PropertyDetailGallery;