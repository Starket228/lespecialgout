
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
      
      <h2 className="text-lg font-semibold ml-4 mt-4 text-primary">
        Nos Menus
      </h2>
      
      <CategoryList 
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
      
      <div className="grid grid-cols-2 gap-4 px-3 mt-4">
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
