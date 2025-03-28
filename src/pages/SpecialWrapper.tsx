
import { useLocalStorage } from '../lib/hooks/useLocalStorage';
import { FoodItem } from '../data/food-data';
import { toast } from '../components/ui/use-toast';
import Special from './Special';

export default function SpecialWrapper() {
  // Store favorites in localStorage
  const [favorites, setFavorites] = useLocalStorage<FoodItem[]>('favorites', []);
  
  // Toggle favorite status
  const handleToggleFavorite = (item: FoodItem) => {
    const isFavorite = favorites.some(fav => fav.id === item.id);
    
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== item.id));
      toast({
        title: "Retiré des favoris",
        description: `${item.name} a été retiré de vos favoris`,
      });
    } else {
      setFavorites([...favorites, item]);
      toast({
        title: "Ajouté aux favoris",
        description: `${item.name} a été ajouté à vos favoris`,
      });
    }
  };

  // Add item to cart or update quantity
  const handleAddToCart = (item: FoodItem, quantity: number) => {
    // Pour simplifier, nous n'implementons pas réellement l'ajout au panier dans cette route
    toast({
      title: "Article ajouté",
      description: `${quantity}x ${item.name} ajouté au panier`,
    });
  };

  return (
    <Special 
      favorites={favorites} 
      onToggleFavorite={handleToggleFavorite} 
      onAddToCart={handleAddToCart} 
    />
  );
}
