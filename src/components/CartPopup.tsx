
import { CartItem } from '../lib/types';
import { ShoppingBag, X, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

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
    <div className={cn(
      "fixed bottom-20 right-4 z-50 bg-white rounded-lg shadow-xl p-4 w-[90%] max-w-sm transition-all duration-300 transform",
      isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
    )}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <ShoppingBag size={18} className="mr-2 text-primary" />
          Résumé du panier
        </h3>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          <X size={16} />
        </button>
      </div>
      
      <div className="max-h-48 overflow-y-auto mb-4 pr-1">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="flex justify-between py-2 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
                <span className="text-xs text-white bg-primary rounded-full h-5 w-5 flex items-center justify-center ml-2">
                  {item.quantity}
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-800">
                {parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity} FCFA
              </span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-3">Votre panier est vide</p>
        )}
      </div>
      
      <div className="flex justify-between items-center mb-4 py-2 border-t border-dashed border-gray-200 pt-3">
        <span className="text-gray-700">Total:</span>
        <span className="font-bold text-primary text-lg">{total} FCFA</span>
      </div>
      
      <button
        onClick={onCheckout}
        className="w-full bg-primary text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors transform hover:scale-[1.02] active:scale-[0.98]"
        disabled={items.length === 0}
      >
        Passer la commande
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
