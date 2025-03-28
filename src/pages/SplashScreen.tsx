
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../lib/hooks/useLocalStorage';

export default function SplashScreen() {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useLocalStorage('firstVisit', true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      
      // If first visit, go to onboarding, otherwise go to home
      if (isFirstVisit) {
        navigate('/onboarding');
      } else {
        navigate('/');
      }
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [navigate, isFirstVisit]);
  
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="flex flex-col items-center justify-center">
        <div className="w-32 h-32 mb-6 relative animate-pulse">
          <img 
            src="https://i.postimg.cc/QM2JsQdJ/file-1.jpg" 
            alt="Le Spécial Goût Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        
        <h1 className="text-xl font-bold text-primary animate-fade-in">
          Le Spécial Goût
        </h1>
        
        <div className="mt-8 flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-primary animate-bounce"></div>
          <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
