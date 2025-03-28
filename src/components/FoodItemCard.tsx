
import { useState } from 'react';
import { Heart, ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { FoodItem as FoodItemType } from '../data/food-data';
import { toast } from '../components/ui/use-toast';
import { cn } from '../lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

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
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking the like button
    setIsLikeAnimating(true);
    onToggleFavorite(item);
    setTimeout(() => setIsLikeAnimating(false), 500);
  };

  const increaseQuantity = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking this button
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onAddToCart(item, newQuantity);
    toast({
      title: "Ajouté au panier",
      description: `${item.name} (${newQuantity}) a été ajouté au panier`,
      duration: 3000,
    });
  };

  const decreaseQuantity = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking this button
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
    <>
      <div 
        className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group h-full flex flex-col cursor-pointer"
        onClick={() => setDetailsOpen(true)}
      >
        <div className="relative h-36 sm:h-48 overflow-hidden">
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
        
        <div className="p-4 flex flex-col flex-grow bg-white rounded-b-2xl">
          <h3 className="font-semibold text-gray-800 text-base sm:text-lg truncate group-hover:text-primary transition-colors">{item.name}</h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 mb-3 line-clamp-2">{item.description}</p>
          
          <div className="mt-auto space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-primary text-base sm:text-lg">{item.price}</span>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={decreaseQuantity}
                  className="h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-primary hover:text-white transition-colors"
                >
                  <Minus size={16} />
                </button>
                
                <span className="w-5 sm:w-6 text-center font-medium text-sm sm:text-base">{quantity}</span>
                
                <button 
                  onClick={increaseQuantity}
                  className="h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            <button
              onClick={increaseQuantity}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-100 hover:bg-primary hover:text-white transition-colors text-sm font-medium"
            >
              <ShoppingCart size={16} />
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{item.name}</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Détails du produit
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-2">
            <div className="relative h-60 w-full rounded-lg overflow-hidden mb-4">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-gray-500">Description</h4>
                <p className="text-sm mt-1">{item.description}</p>
              </div>
              
              {item.ingredients && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">Ingrédients</h4>
                  <p className="text-sm mt-1">{item.ingredients}</p>
                </div>
              )}
              
              {item.calories && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">Calories</h4>
                  <p className="text-sm mt-1">{item.calories} kcal</p>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className="font-bold text-primary text-xl">{item.price}</span>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={decreaseQuantity}
                    className="h-9 w-9 rounded-full"
                  >
                    <Minus size={16} />
                  </Button>
                  
                  <span className="w-6 text-center font-medium">{quantity}</span>
                  
                  <Button 
                    size="icon" 
                    onClick={increaseQuantity}
                    className="h-9 w-9 rounded-full"
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
              
              <Button 
                className="w-full mt-4"
                onClick={(e) => {
                  e.stopPropagation();
                  increaseQuantity(e);
                  setDetailsOpen(false);
                }}
              >
                <ShoppingCart className="mr-2" size={16} />
                Ajouter au panier
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
