
import { useState } from 'react';
import { Menu, Bell } from 'lucide-react';
import SideMenu from './SideMenu';

interface HeaderProps {
  showBanner: boolean;
}

export default function Header({ showBanner }: HeaderProps) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white sticky top-0 z-50 px-4 py-3 flex justify-between items-center shadow-md">
        <div 
          className="cursor-pointer text-primary"
          onClick={() => setIsSideMenuOpen(true)}
        >
          <Menu size={24} />
        </div>
        
        <a href="#" className="text-xl font-semibold text-primary">
          Le Spécial Goût
        </a>
        
        <div className="relative">
          <Bell size={24} className="text-primary cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            1
          </span>
        </div>
      </header>

      <SideMenu 
        isOpen={isSideMenuOpen} 
        onClose={() => setIsSideMenuOpen(false)} 
      />
    </>
  );
}
