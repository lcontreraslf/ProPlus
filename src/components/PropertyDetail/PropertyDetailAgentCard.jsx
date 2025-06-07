import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/components/ui/use-toast';

const PropertyDetailAgentCard = ({ agent, propertyTitle }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Agent contact form submitted:', formData);
    toast({
      title: "Consulta Enviada",
      description: `Tu mensaje sobre "${propertyTitle}" ha sido enviado a ${agent.name}.`,
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white rounded-2xl shadow-xl p-6"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-4">Contactar Agente</h3>
      
      <div className="flex items-center space-x-4 mb-6">
        <Avatar className="w-16 h-16 border-2 border-blue-500">
          <AvatarImage src={agent.photo} alt={agent.name} />
          <AvatarFallback>{agent.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold text-lg text-gray-800">{agent.name}</div>
          <div className="text-sm text-gray-600">Agente Inmobiliario</div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <Button
          onClick={() => window.open(`tel:${agent.phone}`)}
          className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg"
        >
          <Phone className="w-5 h-5 mr-2" />
          Llamar Ahora
        </Button>
        
        <Button
          onClick={() => window.open(`mailto:${agent.email}?subject=Consulta sobre ${propertyTitle}`)}
          variant="outline"
          className="w-full py-3 rounded-lg font-medium border-blue-500 text-blue-600 hover:bg-blue-50"
        >
          <Mail className="w-5 h-5 mr-2" />
          Enviar Email
        </Button>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-3 text-center">O déjanos un mensaje</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Tu nombre" 
            required 
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          <Input 
            name="email" 
            type="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Tu email" 
            required 
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          <Input 
            name="phone" 
            type="tel" 
            value={formData.phone} 
            onChange={handleChange} 
            placeholder="Tu teléfono (opcional)" 
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          <Textarea 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            placeholder="Tu mensaje..." 
            rows="3" 
            required 
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
          />
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Enviar Consulta
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default PropertyDetailAgentCard;