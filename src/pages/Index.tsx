
import { useState, useEffect } from 'react';
import { useLocalStorage } from '../lib/hooks/useLocalStorage';
import { CartItem } from '../lib/types';
import { FoodItem } from '../data/food-data';
import { toast } from '../components/ui/use-toast';

// Components
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Home from './Home';
import Favorites from './Favorites';
import Courses from './Courses';
import Special from './Special';
import Cart from './Cart';
import CartPopup from '../components/CartPopup';

export default function Index() {
  // Store active tab
  const [activeTab, setActiveTab] = useState('home');
  
  // Store favorites and cart items in localStorage
  const [favorites, setFavorites] = useLocalStorage<FoodItem[]>('favorites', []);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cartItems', []);
  
  // Cart popup state
  const [isCartPopupVisible, setIsCartPopupVisible] = useState(false);
  
  // Show cart popup when adding new item
  const [lastAddedToCart, setLastAddedToCart] = useState<CartItem | null>(null);

  // Show cart popup when adding to cart
  useEffect(() => {
    if (lastAddedToCart) {
      setIsCartPopupVisible(true);
      
      // Auto-hide popup after 5 seconds
      const timer = setTimeout(() => {
        setIsCartPopupVisible(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [lastAddedToCart]);

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
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      const updatedCartItems = [...cartItems];
      
      if (quantity === 0) {
        // Remove if quantity is 0
        updatedCartItems.splice(existingItemIndex, 1);
        setCartItems(updatedCartItems);
      } else {
        // Update quantity
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          quantity
        };
        setCartItems(updatedCartItems);
        setLastAddedToCart(updatedCartItems[existingItemIndex]);
      }
    } else if (quantity > 0) {
      // Add new item if it doesn't exist and quantity > 0
      const newItem = { ...item, quantity };
      setCartItems([...cartItems, newItem]);
      setLastAddedToCart(newItem);
    }
  };

  // Remove item from cart
  const handleRemoveFromCart = (itemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  // Update quantity in cart
  const handleUpdateQuantity = (item: CartItem, newQuantity: number) => {
    handleAddToCart(item, newQuantity);
  };

  // Go to checkout
  const handleCheckout = () => {
    setActiveTab('cart');
    setIsCartPopupVisible(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header showBanner={activeTab === 'home'} />
      
      {/* Main content */}
      <main className="container mx-auto w-full max-w-7xl px-2 sm:px-4">
        {activeTab === 'home' && (
          <Home 
            favorites={favorites} 
            onToggleFavorite={handleToggleFavorite} 
            onAddToCart={handleAddToCart} 
          />
        )}
        
        {activeTab === 'favorites' && (
          <Favorites 
            favorites={favorites} 
            onToggleFavorite={handleToggleFavorite} 
            onAddToCart={handleAddToCart} 
          />
        )}
        
        {activeTab === 'courses' && (
          <Courses 
            favorites={favorites} 
            onToggleFavorite={handleToggleFavorite} 
            onAddToCart={handleAddToCart} 
          />
        )}
        
        {activeTab === 'special' && (
          <Special 
            favorites={favorites} 
            onToggleFavorite={handleToggleFavorite} 
            onAddToCart={handleAddToCart} 
          />
        )}
        
        {activeTab === 'cart' && (
          <Cart 
            cartItems={cartItems}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        )}
      </main>
      
      {/* Navigation */}
      <NavBar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      
      {/* Cart popup */}
      <CartPopup 
        items={cartItems}
        isVisible={isCartPopupVisible && cartItems.length > 0}
        onClose={() => setIsCartPopupVisible(false)}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
