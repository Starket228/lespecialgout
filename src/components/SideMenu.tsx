
import { X, User, ShoppingBag, HelpCircle, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const menuItems = [
    { 
      icon: User, 
      label: 'Mon Profil', 
      description: 'Gérer vos informations personnelles',
      path: '/profile'
    },
    { 
      icon: ShoppingBag, 
      label: 'Mes Commandes', 
      description: 'Suivre et consulter vos commandes',
      path: '/orders'
    },
    { 
      icon: HelpCircle, 
      label: 'Aide et Support', 
      description: 'Besoin d\'aide? Contactez-nous',
      path: '/support'
    },
    { 
      icon: LogOut, 
      label: 'Déconnexion', 
      description: 'Se déconnecter de votre compte',
      path: '/logout'
    }
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
            <Link to="/" className="text-xl font-bold text-primary flex items-center">
              <span className="mr-2">🍽️</span>
              Le Spécial Goût
            </Link>
            <button
              className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-gray-100 transition-colors"
              onClick={onClose}
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          
          <div className="mt-5 flex-1 overflow-y-auto">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  to={item.path}
                  className="flex flex-col py-4 px-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg mb-1"
                  onClick={onClose}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <span className="text-gray-800 font-medium">{item.label}</span>
                      <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          
          <div className="mt-auto pb-5">
            <div className="bg-primary/10 rounded-lg p-4">
              <h3 className="font-medium text-primary mb-2">Commande rapide</h3>
              <p className="text-sm text-gray-600 mb-3">Commandez vos plats préférés en quelques clics</p>
              <Link 
                to="/cart" 
                onClick={onClose}
                className="block w-full py-2 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-colors text-center"
              >
                Commander maintenant
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
