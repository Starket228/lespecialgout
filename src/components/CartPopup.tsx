
import { CartItem } from '../lib/types';
import { ShoppingBag } from 'lucide-react';

interface CartPopupProps {
  items: CartItem[];
  isVisible: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartPopup({
  items,
  isVisible,
  onClose,
  onCheckout
}: CartPopupProps) {
  if (!isVisible) return null;

  // Calculate total
  const total = items.reduce((acc, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ''));
    return acc + (price * item.quantity);
  }, 0);

  return (
    <div className="fixed bottom-20 right-4 z-50 bg-white rounded-lg shadow-lg p-4 w-[90%] max-w-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-primary flex items-center">
          <ShoppingBag size={18} className="mr-2" />
          Résumé du panier
        </h3>
        <button 
          onClick={onClose}
          className="text-gray-500"
        >
          ×
        </button>
      </div>
      
      <div className="max-h-48 overflow-y-auto mb-3">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm">{item.name} ×{item.quantity}</span>
              <span className="text-sm font-medium">
                {parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity} FCFA
              </span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-3">Votre panier est vide</p>
        )}
      </div>
      
      <div className="font-bold text-right mb-3">
        Total: {total} FCFA
      </div>
      
      <button
        onClick={onCheckout}
        className="w-full bg-primary text-white py-2 rounded-md font-medium"
        disabled={items.length === 0}
      >
        Passer la commande
      </button>
    </div>
  );
}
