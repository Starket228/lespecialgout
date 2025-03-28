
import { X, User, ShoppingBag, MapPin, CreditCard, HelpCircle, Settings, LogOut } from 'lucide-react';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const menuItems = [
    { icon: User, label: 'Mon Profil' },
    { icon: ShoppingBag, label: 'Mes Commandes' },
    { icon: MapPin, label: 'Adresses de Livraison' },
    { icon: CreditCard, label: 'Moyens de Paiement' },
    { icon: HelpCircle, label: 'Aide et Support' },
    { icon: Settings, label: 'Paramètres' },
    { icon: LogOut, label: 'Déconnexion' }
  ];

  return (
    <>
      <div 
        className={`fixed top-0 left-0 h-full w-full bg-black/50 backdrop-blur-sm z-[1000] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      <div 
        className={`fixed top-0 left-0 h-full w-[300px] bg-white shadow-lg z-[1001] transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <a href="#" className="text-xl font-bold text-primary flex items-center">
              <span className="mr-2">🍽️</span>
              Le Spécial Goût
            </a>
            <button
              className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-gray-100 transition-colors"
              onClick={onClose}
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          
          <div className="mt-5 flex-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 py-4 px-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <Icon size={20} className="text-gray-500" />
                  <span className="text-gray-700">{item.label}</span>
                </div>
              );
            })}
          </div>
          
          <div className="mt-auto pb-5">
            <div className="bg-primary/10 rounded-lg p-4">
              <h3 className="font-medium text-primary mb-2">Commande rapide</h3>
              <p className="text-sm text-gray-600 mb-3">Commandez vos plats préférés en quelques clics</p>
              <button className="w-full py-2 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-colors">
                Commander maintenant
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
