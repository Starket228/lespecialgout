
import { useState } from 'react';
import { ChevronLeft, Bell, Moon, Sun, Globe, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '../components/ui/use-toast';

export default function Settings() {
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'fr',
    privacy: {
      shareData: false,
      locationTracking: true
    },
    security: {
      twoFactor: false,
      passwordShown: false,
      password: '••••••••'
    }
  });

  const handleToggle = (setting: string) => {
    setSettings(prev => {
      if (setting === 'notifications') {
        return { ...prev, notifications: !prev.notifications };
      } else if (setting === 'darkMode') {
        return { ...prev, darkMode: !prev.darkMode };
      } else if (setting === 'shareData') {
        return { ...prev, privacy: { ...prev.privacy, shareData: !prev.privacy.shareData } };
      } else if (setting === 'locationTracking') {
        return { ...prev, privacy: { ...prev.privacy, locationTracking: !prev.privacy.locationTracking } };
      } else if (setting === 'twoFactor') {
        return { ...prev, security: { ...prev.security, twoFactor: !prev.security.twoFactor } };
      } else if (setting === 'passwordShown') {
        return { ...prev, security: { ...prev.security, passwordShown: !prev.security.passwordShown } };
      }
      return prev;
    });
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings(prev => ({ ...prev, language: e.target.value }));
  };

  const handleSavePassword = () => {
    toast({
      title: "Mot de passe mis à jour",
      description: "Votre mot de passe a été changé avec succès",
    });
  };

  return (
    <div className="pb-24 p-4">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-primary mb-6"
      >
        <ChevronLeft size={20} className="mr-1" />
        Retour
      </button>

      <h1 className="text-2xl font-bold mb-6 text-gray-800">Paramètres</h1>

      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold">Paramètres généraux</h2>
          </div>
          
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Bell className="text-gray-500 mr-3" size={20} />
                <div>
                  <h3 className="font-medium">Notifications</h3>
                  <p className="text-sm text-gray-500">Recevoir des notifications des promotions et commandes</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.notifications} 
                  onChange={() => handleToggle('notifications')} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {settings.darkMode ? (
                  <Moon className="text-gray-500 mr-3" size={20} />
                ) : (
                  <Sun className="text-gray-500 mr-3" size={20} />
                )}
                <div>
                  <h3 className="font-medium">Mode sombre</h3>
                  <p className="text-sm text-gray-500">Activer le thème sombre</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.darkMode} 
                  onChange={() => handleToggle('darkMode')} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Globe className="text-gray-500 mr-3" size={20} />
                <div>
                  <h3 className="font-medium">Langue</h3>
                  <p className="text-sm text-gray-500">Choisir la langue de l'application</p>
                </div>
              </div>
              <select 
                value={settings.language} 
                onChange={handleLanguageChange}
                className="px-3 py-2 bg-gray-100 rounded-md text-sm"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Privacy Settings */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold">Confidentialité</h2>
          </div>
          
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Partage des données</h3>
                <p className="text-sm text-gray-500">Autoriser le partage des données pour améliorer l'expérience</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.privacy.shareData} 
                  onChange={() => handleToggle('shareData')} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Suivi de localisation</h3>
                <p className="text-sm text-gray-500">Autoriser l'accès à votre position pour les livraisons</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.privacy.locationTracking} 
                  onChange={() => handleToggle('locationTracking')} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
        
        {/* Security Settings */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold">Sécurité</h2>
          </div>
          
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Lock className="text-gray-500 mr-3" size={20} />
                <div>
                  <h3 className="font-medium">Authentification à deux facteurs</h3>
                  <p className="text-sm text-gray-500">Renforcer la sécurité de votre compte</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.security.twoFactor} 
                  onChange={() => handleToggle('twoFactor')} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Changer le mot de passe</h3>
              <div className="relative mb-3">
                <input 
                  type={settings.security.passwordShown ? "text" : "password"}
                  value={settings.security.password}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary pr-10"
                />
                <button 
                  type="button"
                  onClick={() => handleToggle('passwordShown')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                >
                  {settings.security.passwordShown ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              <button
                onClick={handleSavePassword}
                className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
