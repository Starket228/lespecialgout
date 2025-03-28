
import { X } from 'lucide-react';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const menuItems = [
    'Mon Profil',
    'Mes Commandes',
    'Adresses de Livraison',
    'Moyens de Paiement',
    'Aide et Support',
    'Paramètres',
    'Déconnexion'
  ];

  return (
    <div 
      className={`fixed top-0 left-0 h-full w-[300px] bg-white shadow-lg z-[1001] transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-4 h-full flex flex-col">
        <div className="flex justify-end">
          <X 
            size={24} 
            className="text-primary cursor-pointer" 
            onClick={onClose} 
          />
        </div>
        
        <div className="mt-10 flex-1">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="py-4 px-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
