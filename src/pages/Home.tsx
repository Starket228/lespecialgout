
import { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import CategoryList from '../components/CategoryList';
import FoodItem from '../components/FoodItem';
import { foodItems, categories } from '../data/food-data';
import { FoodItem as FoodItemType } from '../data/food-data';

interface HomeProps {
  favorites: FoodItemType[];
  onToggleFavorite: (item: FoodItemType) => void;
  onAddToCart: (item: FoodItemType, quantity: number) => void;
}

export default function Home({ favorites, onToggleFavorite, onAddToCart }: HomeProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [filteredItems, setFilteredItems] = useState<FoodItemType[]>([]);

  // Update filtered items when category changes
  useEffect(() => {
    setFilteredItems(
      foodItems.filter(item => item.category === activeCategory)
    );
  }, [activeCategory]);

  return (
    <div className="pb-24">
      <Banner />
      
      <div className="px-4 mt-6 mb-2">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <span className="w-1.5 h-5 bg-primary rounded-full inline-block mr-2"></span>
          Nos Menus
        </h2>
        <p className="text-sm text-gray-500 mt-1">Découvrez notre sélection de plats délicieux</p>
      </div>
      
      <CategoryList 
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
      
      <div className="grid grid-cols-2 gap-3 xs:gap-3 sm:gap-4 md:gap-5 px-3 mt-6 mx-auto w-full max-w-7xl">
        {filteredItems.map(item => (
          <FoodItem
            key={item.id}
            item={item}
            isFavorite={favorites.some(fav => fav.id === item.id)}
            onToggleFavorite={onToggleFavorite}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}
