
import { Home, ShoppingBag, Heart, ShoppingCart } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function NavBar({ activeTab, onTabChange }: NavBarProps) {
  const navItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'courses', label: 'Courses', icon: ShoppingBag },
    { id: 'special', label: 'Spécial', icon: () => (
      <div className="h-5 w-5 flex items-center justify-center">
        <img 
          src="https://i.postimg.cc/tJb5ySf3/drapeau-togo.jpg" 
          alt="Drapeau Togo" 
          className="w-full h-full object-cover rounded"
        />
      </div>
    )},
    { id: 'favorites', label: 'Favoris', icon: Heart },
    { id: 'cart', label: 'Panier', icon: ShoppingCart }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_15px_rgba(0,0,0,0.1)] px-2 py-3 flex justify-around z-40 backdrop-blur-md bg-white/90">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeTab === item.id;
        
        return (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-center w-1/5 py-1 relative transition-colors duration-300",
              isActive ? 'text-primary' : 'text-gray-500'
            )}
            onClick={() => onTabChange(item.id)}
          >
            <div className={cn(
              "mb-1 transition-all duration-300 relative",
              isActive ? "scale-110" : "scale-100"
            )}>
              <IconComponent size={20} />
              {isActive && (
                <span className="absolute inset-0 bg-primary/10 rounded-full -m-1.5 animate-pulse" />
              )}
            </div>
            <span className="text-xs font-medium">{item.label}</span>
            {isActive && (
              <span className="absolute -top-1 left-1/2 transform -translate-x-1/2 h-1 w-10 bg-primary rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}
