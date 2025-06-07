import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PropertyDetailGallery from '@/components/PropertyDetail/PropertyDetailGallery';
import PropertyDetailInfo from '@/components/PropertyDetail/PropertyDetailInfo';
import PropertyDetailAgentCard from '@/components/PropertyDetail/PropertyDetailAgentCard';
import PropertyDetailMap from '@/components/PropertyDetail/PropertyDetailMap';
import PropertyDetailSummary from '@/components/PropertyDetail/PropertyDetailSummary';
import { toast } from '@/components/ui/use-toast'; // Ensure toast is imported

const PropertyDetail = () => {
  const { id } = useParams();

  // Mock property data - UPDATED FOR LOCAL IMAGES
  // This should be fetched based on `id`
  const property = {
    id: parseInt(id),
    title: 'Departamento Moderno en Providencia',
    price: 180000000,
    operation: 'venta',
    location: 'Providencia, Santiago',
    address: 'Av. Providencia 1234, Providencia',
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    type: 'departamento',
    yearBuilt: 2020,
    parking: 1,
    description: 'Hermoso departamento ubicado en el corazón de Providencia, con acabados de primera calidad y una vista panorámica espectacular de la ciudad. Este moderno hogar cuenta con amplios espacios, cocina equipada, y acceso a todas las comodidades urbanas.',
    features: [
      'Vista panorámica', 'Cocina equipada', 'Calefacción central', 'Aire acondicionado',
      'Balcón', 'Bodega', 'Conserje 24/7', 'Gimnasio', 'Piscina', 'Quincho'
    ],
    agent: {
      name: 'María González',
      phone: '+56 9 1234 5678',
      email: 'maria.gonzalez@propiedadesplus.cl',
      // UPDATED: Use local image for agent photo
      photo: '/images/agente-maria.jpg' // Asegúrate de tener una imagen llamada agente-maria.jpg en public/images/
    },
    // UPDATED: Use local image paths for gallery
    images: [
      '/images/propiedad-1-d.jpg', // Usamos la versión 'd' (desktop) para las imágenes de galería en detalle
      '/images/propiedad-1-i.jpg', // Puedes añadir más imágenes para la galería si tienes
      '/images/propiedad-1-m.jpg',
      '/images/propiedad-2-d.jpg',
      '/images/propiedad-3-d.jpg',
      // Si tienes imágenes específicas para la galería de una propiedad, úsalas aquí.
      // Por ejemplo: '/images/propiedad-1-galeria-1.jpg', '/images/propiedad-1-galeria-2.jpg'
    ]
  };
  // This mock data needs to be replaced with a fetch call in a real application
  // useEffect(() => {
  //   fetchPropertyDetails(id).then(data => setProperty(data));
  // }, [id]);
  // if (!property) return <div>Cargando...</div>;


  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Link to="/propiedades">
            <Button variant="outline" className="flex items-center space-x-2 hover:bg-blue-50 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Propiedades</span>
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* PropertyDetailGallery will now receive local image paths */}
            <PropertyDetailGallery images={property.images} title={property.title} operation={property.operation} />
            <PropertyDetailInfo property={property} />
            <PropertyDetailMap address={property.address} />
          </div>

          <div className="space-y-6 lg:sticky lg:top-24 self-start">
            {/* PropertyDetailAgentCard will now receive local agent photo path */}
            <PropertyDetailAgentCard agent={property.agent} propertyTitle={property.title} />
            <PropertyDetailSummary property={property} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;