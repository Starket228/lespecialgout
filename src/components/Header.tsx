
import { useState } from 'react';
import { Menu, Bell, X } from 'lucide-react';
import SideMenu from './SideMenu';
import NotificationModal from './NotificationModal';

interface HeaderProps {
  showBanner: boolean;
}

export default function Header({ showBanner }: HeaderProps) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  return (
    <>
      <header className="bg-white sticky top-0 z-50 px-5 py-4 flex justify-between items-center shadow-sm backdrop-blur-md bg-white/90">
        <div 
          className="flex items-center justify-center text-primary cursor-pointer h-9 w-9 rounded-full hover:bg-primary/10 transition-colors"
          onClick={() => setIsSideMenuOpen(true)}
        >
          <Menu size={24} />
        </div>
        
        <a href="#" className="text-xl font-bold text-primary flex items-center">
          <span className="mr-2">🍽️</span>
          Le Spécial Goût
        </a>
        
        <div 
          className="relative flex items-center justify-center h-9 w-9 rounded-full hover:bg-primary/10 transition-colors"
          onClick={() => setIsNotificationModalOpen(true)}
        >
          <Bell size={24} className="text-primary cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            1
          </span>
        </div>
      </header>

      <SideMenu 
        isOpen={isSideMenuOpen} 
        onClose={() => setIsSideMenuOpen(false)} 
      />
      
      <NotificationModal 
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
      />
    </>
  );
}
