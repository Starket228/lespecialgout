
import { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { togoleseSpecialties } from '../data/food-data';
import { FoodItem } from '../data/food-data';
import FoodItemCard from '../components/FoodItemCard';

interface RegionCardProps {
  name: string;
  description: string;
  onClick: () => void;
}

function RegionCard({ name, description, onClick }: RegionCardProps) {
  return (
    <div 
      className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition-transform duration-300 hover:-translate-y-1 h-56"
      onClick={onClick}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-500 to-green-700 opacity-90" />
      <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" />
      
      <div className="absolute top-0 right-0 p-2">
        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full overflow-hidden">
          <img 
            src="https://i.postimg.cc/tJb5ySf3/drapeau-togo.jpg" 
            alt="Drapeau Togo" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full p-4 text-white">
        <h3 className="text-xl font-bold mb-2">Région {name}</h3>
        <p className="text-sm mb-4">{description}</p>
        <button className="flex items-center justify-between w-full px-4 py-2 bg-white text-green-700 rounded-full font-medium text-sm">
          Découvrir les plats
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

interface SpecialProps {
  favorites: FoodItem[];
  onToggleFavorite: (item: FoodItem) => void;
  onAddToCart: (item: FoodItem, quantity: number) => void;
}

export default function Special({
  favorites,
  onToggleFavorite,
  onAddToCart
}: SpecialProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  
  // Données des régions togolaises
  const regions = [
    {
      id: 'Maritime',
      name: 'Maritime',
      description: 'Découvrez les délices côtiers et les saveurs de la mer',
    },
    {
      id: 'Plateaux',
      name: 'des Plateaux',
      description: 'Savourez les spécialités des montagnes et des vallées',
    },
    {
      id: 'Centrale',
      name: 'Centrale',
      description: 'Goûtez aux plats authentiques du cœur du pays',
    },
    {
      id: 'Kara',
      name: 'de la Kara',
      description: 'Explorez les saveurs du nord et ses traditions culinaires',
    },
    {
      id: 'Savanes',
      name: 'des Savanes',
      description: "Dégustez les recettes ancestrales de l'extrême nord",
    }
  ];

  // Filtrer les plats par région
  const filteredItems = selectedRegion
    ? togoleseSpecialties.filter(item => item.region === selectedRegion)
    : [];

  return (
    <div className="pb-24">
      {!selectedRegion ? (
        // Vue principale des régions
        <div className="p-3">
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-2xl font-bold text-center text-gray-800 flex items-center">
              <span className="mr-2 w-6 h-6 inline-block">
                <img 
                  src="https://i.postimg.cc/tJb5ySf3/drapeau-togo.jpg" 
                  alt="Drapeau Togo" 
                  className="w-full h-full object-cover rounded"
                />
              </span>
              Spécialités togolaises
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {regions.map(region => (
              <RegionCard
                key={region.id}
                name={region.name}
                description={region.description}
                onClick={() => setSelectedRegion(region.id)}
              />
            ))}
          </div>
        </div>
      ) : (
        // Vue détaillée d'une région
        <div className="p-3">
          <button
            className="flex items-center text-primary mb-4"
            onClick={() => setSelectedRegion(null)}
          >
            <ArrowLeft size={18} className="mr-1" />
            Retour aux régions
          </button>
          
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="mr-2 w-6 h-6 inline-block">
              <img 
                src="https://i.postimg.cc/tJb5ySf3/drapeau-togo.jpg" 
                alt="Drapeau Togo" 
                className="w-full h-full object-cover rounded"
              />
            </span>
            Région {regions.find(r => r.id === selectedRegion)?.name}
          </h2>
          
          {filteredItems.length > 0 ? (
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
                Aucun plat disponible
              </h3>
              <p className="text-gray-500 text-center">
                Les plats de cette région seront bientôt disponibles.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
