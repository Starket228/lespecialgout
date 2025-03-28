
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { FoodItem as FoodItemType } from '../data/food-data';
import { toast } from '../components/ui/use-toast';

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
    <div className="bg-white rounded-2xl overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1">
      <div className="h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
        <p className="text-sm text-gray-500 h-10 overflow-hidden">{item.description}</p>
        
        <div className="flex justify-between items-center mt-2">
          <span className="font-semibold text-primary">{item.price}</span>
          <button 
            onClick={handleLike}
            className={`focus:outline-none ${isLikeAnimating ? 'animate-like' : ''}`}
          >
            <Heart 
              size={22} 
              className={`transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
            />
          </button>
        </div>
        
        <div className="flex items-center mt-3">
          <button 
            onClick={decreaseQuantity}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-primary text-white font-bold text-lg"
          >
            -
          </button>
          
          <span className="mx-3 font-medium">{quantity}</span>
          
          <button 
            onClick={increaseQuantity}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-primary text-white font-bold text-lg"
          >
            +
          </button>
          
          <span className="ml-2 text-xs text-primary">
            Ajouter au panier
          </span>
        </div>
      </div>
    </div>
  );
}
