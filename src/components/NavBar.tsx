
import { Home, ShoppingBag, Menu as MenuIcon, Heart, ShoppingCart } from 'lucide-react';

interface NavBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function NavBar({ activeTab, onTabChange }: NavBarProps) {
  const navItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'courses', label: 'Courses', icon: ShoppingBag },
    { id: 'menu', label: 'Menu', icon: MenuIcon },
    { id: 'favorites', label: 'Favoris', icon: Heart },
    { id: 'cart', label: 'Panier', icon: ShoppingCart }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] px-2 py-2 flex justify-around z-40">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        
        return (
          <button
            key={item.id}
            className={`flex flex-col items-center w-1/5 py-1 ${
              activeTab === item.id 
                ? 'text-primary font-medium' 
                : 'text-gray-500'
            }`}
            onClick={() => onTabChange(item.id)}
          >
            <IconComponent size={20} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
