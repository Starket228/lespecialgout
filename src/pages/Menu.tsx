
import { useState } from 'react';
import { togoleseSpecialties } from '../data/food-data';
import { FoodItem } from '../data/food-data';
import FoodItemCard from '../components/FoodItem';  // Renamed component import
import { ArrowLeft } from 'lucide-react';

interface MenuItemProps {
  category: string;
  icon: string;
  text: string;
  image: string;
  onClick: () => void;
}

function MenuItem({ category, icon, text, image, onClick }: MenuItemProps) {
  return (
    <div
      className="w-[calc(50%-1rem)] h-44 m-2 rounded-2xl overflow-hidden relative shadow-md cursor-pointer transition-transform duration-300 hover:-translate-y-1"
      style={{ backgroundImage: `url(${image})` }}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl">
        {icon}
      </div>
      <div className="absolute bottom-4 left-0 right-0 text-white font-semibold text-center px-2">
        {text}
      </div>
    </div>
  );
}

interface MenuProps {
  favorites: FoodItem[];
  onToggleFavorite: (item: FoodItem) => void;
  onAddToCart: (item: FoodItem, quantity: number) => void;
}

export default function Menu({
  favorites,
  onToggleFavorite,
  onAddToCart
}: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const categories = [
    {
      id: 'togolese',
      icon: '🇹🇬',
      text: 'Spécialités togolaises',
      image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26'
    },
    {
      id: 'european',
      icon: '🇪🇺',
      text: 'Spécialités européennes',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0'
    },
    {
      id: 'fastfood',
      icon: '🍔',
      text: 'Fast food',
      image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330'
    },
    {
      id: 'drinks',
      icon: '🥤',
      text: 'Boissons',
      image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423'
    },
    {
      id: 'groceries',
      icon: '🛒',
      text: 'Courses',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e'
    },
    {
      id: 'recipes',
      icon: '📖',
      text: 'Recettes',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72'
    }
  ];

  const regions = [
    { id: 'all', name: 'Toutes les régions' },
    { id: 'Maritime', name: 'Maritime' },
    { id: 'Plateaux', name: 'Plateaux' },
    { id: 'Centrale', name: 'Centrale' },
    { id: 'Kara', name: 'Kara' },
    { id: 'Savanes', name: 'Savanes' }
  ];

  const filteredItems = selectedCategory === 'togolese'
    ? togoleseSpecialties.filter(item => 
        selectedRegion === 'all' || 
        item.region === selectedRegion
      )
    : [];

  return (
    <div className="pb-24">
      {!selectedCategory ? (
        // Main menu grid
        <div className="p-3">
          <h2 className="text-lg font-semibold mb-4 text-primary">
            Catégories
          </h2>
          
          <div className="flex flex-wrap">
            {categories.map(category => (
              <MenuItem
                key={category.id}
                category={category.id}
                icon={category.icon}
                text={category.text}
                image={category.image}
                onClick={() => setSelectedCategory(category.id)}
              />
            ))}
          </div>
        </div>
      ) : (
        // Category detail view
        <div className="p-3">
          <button
            className="flex items-center text-primary mb-4"
            onClick={() => setSelectedCategory(null)}
          >
            <ArrowLeft size={18} className="mr-1" />
            Retour au menu
          </button>
          
          <h2 className="text-xl font-semibold mb-4">
            {categories.find(c => c.id === selectedCategory)?.text}
          </h2>
          
          {selectedCategory === 'togolese' && (
            <div className="mb-6">
              <h3 className="text-center text-lg font-medium mb-3 text-gray-700">
                Choisissez une région du Togo
              </h3>
              
              <div className="flex flex-wrap justify-center gap-2">
                {regions.map(region => (
                  <button
                    key={region.id}
                    className={`py-2 px-4 rounded-full text-sm transition-colors ${
                      selectedRegion === region.id
                        ? 'bg-primary text-white'
                        : 'border-2 border-primary text-primary bg-white'
                    }`}
                    onClick={() => setSelectedRegion(region.id)}
                  >
                    {region.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {selectedCategory === 'togolese' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredItems.map(item => (
                <FoodItemCard
                  key={item.id}
                  item={item}
                  isFavorite={favorites.some(fav => fav.id === item.id)}
                  onToggleFavorite={onToggleFavorite}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-10 mt-4">
              <h3 className="text-xl font-semibold mb-2 text-center">
                Contenu à venir
              </h3>
              <p className="text-gray-500 text-center">
                Cette section est en cours de développement et sera bientôt disponible.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
