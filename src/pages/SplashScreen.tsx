
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SplashScreen() {
  const navigate = useNavigate();
  const [animationClass, setAnimationClass] = useState('opacity-0');

  useEffect(() => {
    // Fade in animation
    setTimeout(() => {
      setAnimationClass('opacity-100 scale-100');
    }, 100);

    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      setAnimationClass('opacity-0 scale-110');
      setTimeout(() => navigate('/home'), 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className={`flex flex-col items-center transition-all duration-700 transform ${animationClass}`}>
        <div className="w-32 h-32 mb-8 relative">
          <img 
            src="https://i.postimg.cc/QM2JsQdJ/file-1.jpg"
            alt="Logo" 
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
          <div className="absolute inset-0 border-4 border-primary rounded-full animate-pulse"></div>
        </div>
        
        <h1 className="text-3xl font-bold text-primary mb-3 flex items-center">
          <span className="mr-2">🍽️</span>
          Le Spécial Goût
        </h1>
        
        <p className="text-gray-600 text-sm">Découvrez les saveurs authentiques</p>
      </div>
    </div>
  );
}
