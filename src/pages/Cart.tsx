
import { useState } from 'react';
import { CartItem } from '../lib/types';
import { Trash2, MapPin, User, Phone } from 'lucide-react';
import { toast } from "../components/ui/use-toast";

interface CartProps {
  cartItems: CartItem[];
  onRemoveFromCart: (itemId: string) => void;
  onUpdateQuantity: (item: CartItem, newQuantity: number) => void;
}

export default function Cart({
  cartItems,
  onRemoveFromCart,
  onUpdateQuantity
}: CartProps) {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    name: '',
    phone: ''
  });

  const totalAmount = cartItems.reduce((total, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ''));
    return total + (price * item.quantity);
  }, 0);

  const handleRemoveItem = (itemId: string) => {
    onRemoveFromCart(itemId);
  };

  const handleQuantityChange = (item: CartItem, change: number) => {
    const newQuantity = Math.max(0, item.quantity + change);
    if (newQuantity === 0) {
      onRemoveFromCart(item.id);
    } else {
      onUpdateQuantity(item, newQuantity);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            location: `${latitude}, ${longitude}`
          }));
          toast({
            title: "Position obtenue",
            description: "Votre position a été récupérée avec succès",
          });
        },
        () => {
          toast({
            title: "Erreur",
            description: "Impossible d'obtenir votre position",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Non supporté",
        description: "La géolocalisation n'est pas supportée par votre navigateur",
        variant: "destructive",
      });
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare the WhatsApp message with order details
    let message = `*NOUVELLE COMMANDE*\n\n`;
    message += `*Client:* ${formData.name}\n`;
    message += `*Téléphone:* ${formData.phone}\n`;
    message += `*Localisation:* ${formData.location}\n\n`;
    message += `*Détails de la commande:*\n`;
    
    cartItems.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (${item.price})\n`;
    });
    
    message += `\n*Total:* ${totalAmount} FCFA`;
    
    // Encode the message for the URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL with the phone number and message
    const whatsappUrl = `https://wa.me/22879776522?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Show success toast
    toast({
      title: "Commande effectuée !",
      description: "Votre commande a été envoyée via WhatsApp",
    });
    
    // Reset form and hide checkout form
    setShowCheckoutForm(false);
    setFormData({ location: '', name: '', phone: '' });
  };

  return (
    <div className="pb-24">
      <h2 className="text-lg font-semibold ml-4 mt-4 text-primary">
        Votre Panier
      </h2>
      
      <div className="p-3">
        {cartItems.length > 0 ? (
          <>
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-lg shadow-sm p-4 flex items-center"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded-md mr-4" 
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{item.price}</p>
                    
                    <div className="flex items-center">
                      <button 
                        onClick={() => handleQuantityChange(item, -1)}
                        className="h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white"
                      >
                        -
                      </button>
                      
                      <span className="mx-3 font-medium">{item.quantity}</span>
                      
                      <button 
                        onClick={() => handleQuantityChange(item, 1)}
                        className="h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white"
                      >
                        +
                      </button>
                      
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-auto text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex justify-between items-center font-semibold text-lg">
                <span>Total</span>
                <span>{totalAmount} FCFA</span>
              </div>
            </div>
            
            <button
              onClick={() => setShowCheckoutForm(true)}
              className="w-full bg-primary text-white py-3 rounded-lg font-medium"
            >
              Passer la commande
            </button>
            
            {showCheckoutForm && (
              <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-lg font-semibold mb-4 text-primary">Finaliser la commande</h3>
                
                <form onSubmit={handleSubmitOrder}>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-medium">
                      Géolocalisation
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleFormChange}
                        required
                        className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Coordonnées ou adresse"
                      />
                      <button
                        type="button"
                        onClick={handleGetLocation}
                        className="bg-secondary text-white px-3 py-2 rounded-r-md"
                      >
                        <MapPin size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-medium">
                      Nom du récepteur
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        <User size={16} />
                      </span>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                        className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-medium">
                      Numéro du récepteur
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        <Phone size={16} />
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        required
                        className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Votre numéro de téléphone"
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 rounded-lg font-medium"
                  >
                    Valider la commande
                  </button>
                </form>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center p-5">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <ShoppingCart size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Panier vide</h3>
            <p className="text-gray-500">
              Votre panier est actuellement vide. Parcourez nos menus et ajoutez des plats pour commencer.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

import { ShoppingCart } from 'lucide-react';
