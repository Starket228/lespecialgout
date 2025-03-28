
import { useState } from 'react';
import { Menu, Sun, Moon } from 'lucide-react';
import SideMenu from './SideMenu';
import { useTheme } from '../contexts/ThemeContext';
import { Switch } from './ui/switch';

interface HeaderProps {
  showBanner: boolean;
}

export default function Header({ showBanner }: HeaderProps) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      <header className="bg-background sticky top-0 z-50 px-5 py-4 flex justify-between items-center shadow-sm backdrop-blur-md bg-background/90 transition-colors duration-300">
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
        
        <div className="relative flex items-center justify-center h-9 w-9 rounded-full hover:bg-primary/10 transition-colors">
          <div className="flex items-center justify-center" onClick={toggleTheme}>
            {isDark ? (
              <Moon size={20} className="text-primary cursor-pointer" />
            ) : (
              <Sun size={20} className="text-primary cursor-pointer" />
            )}
          </div>
        </div>
      </header>

      <SideMenu 
        isOpen={isSideMenuOpen} 
        onClose={() => setIsSideMenuOpen(false)} 
      />
    </>
  );
}
