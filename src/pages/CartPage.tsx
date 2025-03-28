
import { useState, useEffect } from 'react';
import { useLocalStorage } from '../lib/hooks/useLocalStorage';
import { CartItem } from '../lib/types';
import Cart from './Cart';
import { toast } from '../components/ui/use-toast';

export default function CartPage() {
  // Store cart items in localStorage
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cartItems', []);

  // Remove item from cart
  const handleRemoveFromCart = (itemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
    toast({
      title: "Retiré du panier",
      description: "L'article a été retiré de votre panier",
    });
  };

  // Update quantity in cart
  const handleUpdateQuantity = (item: CartItem, newQuantity: number) => {
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      const updatedCartItems = [...cartItems];
      
      if (newQuantity === 0) {
        // Remove if quantity is 0
        updatedCartItems.splice(existingItemIndex, 1);
        setCartItems(updatedCartItems);
        toast({
          title: "Retiré du panier",
          description: "L'article a été retiré de votre panier",
        });
      } else {
        // Update quantity
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          quantity: newQuantity
        };
        setCartItems(updatedCartItems);
        toast({
          title: "Quantité mise à jour",
          description: "La quantité a été mise à jour dans votre panier",
        });
      }
    }
  };

  return (
    <Cart 
      cartItems={cartItems}
      onRemoveFromCart={handleRemoveFromCart}
      onUpdateQuantity={handleUpdateQuantity}
    />
  );
}
