
import { useState } from 'react';
import { Heart, ShoppingCart, Plus, Minus } from 'lucide-react';
import { FoodItem as FoodItemType } from '../data/food-data';
import { toast } from '../components/ui/use-toast';
import { cn } from '../lib/utils';

interface FoodItemProps {
  item: FoodItemType;
  isFavorite: boolean;
  onToggleFavorite: (item: FoodItemType) => void;
  onAddToCart: (item: FoodItemType, quantity: number) => void;
}

export default function FoodItem({
  item,
  isFavorite,
  onToggleFavorite,
  onAddToCart
}: FoodItemProps) {
  const [quantity, setQuantity] = useState(0);
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);

  const handleLike = () => {
    setIsLikeAnimating(true);
    onToggleFavorite(item);
    setTimeout(() => setIsLikeAnimating(false), 500);
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onAddToCart(item, newQuantity);
    toast({
      title: "Ajouté au panier",
      description: `${item.name} (${newQuantity}) a été ajouté au panier`,
      duration: 3000,
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onAddToCart(item, newQuantity);
      if (newQuantity === 0) {
        toast({
          title: "Retiré du panier",
          description: `${item.name} a été retiré du panier`,
          duration: 3000,
        });
      } else {
        toast({
          title: "Quantité réduite",
          description: `${item.name} (${newQuantity}) dans le panier`,
          duration: 3000,
        });
      }
    }
  };

  return (
    <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group h-full flex flex-col">
      <div className="relative h-48 overflow-hidden sm:h-56">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <button 
        onClick={handleLike}
        className={cn(
          "absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md transition-all duration-300",
          isLikeAnimating ? 'animate-like' : '',
          isFavorite ? 'bg-red-50' : 'bg-white/80'
        )}
      >
        <Heart 
          size={18} 
          className={cn(
            "transition-colors",
            isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
          )} 
        />
      </button>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-800 text-base sm:text-lg truncate">{item.name}</h3>
        <p className="text-xs sm:text-sm text-gray-500 h-8 sm:h-10 line-clamp-2 mt-1">{item.description}</p>
        
        <div className="flex justify-between items-center mt-auto pt-3">
          <span className="font-bold text-primary text-sm sm:text-base">{item.price}</span>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <button 
              onClick={decreaseQuantity}
              className="h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-primary hover:text-white transition-colors"
            >
              <Minus size={14} className="sm:size-16" />
            </button>
            
            <span className="w-5 sm:w-6 text-center font-medium">{quantity}</span>
            
            <button 
              onClick={increaseQuantity}
              className="h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              <Plus size={14} className="sm:size-16" />
            </button>
          </div>
        </div>
        
        <button
          onClick={increaseQuantity}
          className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-100 hover:bg-primary hover:text-white transition-colors text-xs sm:text-sm font-medium"
        >
          <ShoppingCart size={14} className="sm:size-16" />
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
