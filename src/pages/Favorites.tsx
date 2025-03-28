
import { useState } from 'react';
import { FoodItem } from '../data/food-data';
import FoodItemCard from '../components/FoodItem';  // Renamed component import
import { X } from 'lucide-react';

interface FavoritesProps {
  favorites: FoodItem[];
  onToggleFavorite: (item: FoodItem) => void;
  onAddToCart: (item: FoodItem, quantity: number) => void;
}

export default function Favorites({
  favorites,
  onToggleFavorite,
  onAddToCart
}: FavoritesProps) {
  return (
    <div className="pb-24">
      <h2 className="text-lg font-semibold ml-4 mt-4 text-primary">
        Vos Favoris
      </h2>
      
      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 xs:gap-3 sm:gap-4 md:gap-5 p-3 mx-auto w-full max-w-7xl">
          {favorites.map(item => (
            <FoodItemCard
              key={item.id}
              item={item}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center p-5">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
            <X size={40} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Aucun favori</h3>
          <p className="text-gray-500">
            Vous n'avez pas encore ajouté de plats à vos favoris. Explorez nos menus et ajoutez des plats à vos favoris.
          </p>
        </div>
      )}
    </div>
  );
}
