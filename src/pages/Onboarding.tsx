
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../lib/hooks/useLocalStorage';
import { ArrowRight, CheckCircle2, ShoppingBasket, MapPin, UtensilsCrossed } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [, setIsFirstVisit] = useLocalStorage('firstVisit', true);
  
  const steps = [
    {
      title: "Bienvenue sur Le Spécial Goût",
      description: "Découvrez les saveurs authentiques de la cuisine africaine et internationale, livrées directement chez vous.",
      icon: <UtensilsCrossed size={48} className="text-primary" />,
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
    },
    {
      title: "Des plats variés et délicieux",
      description: "Un large choix de plats traditionnels et modernes, préparés avec des ingrédients frais et de qualité.",
      icon: <ShoppingBasket size={48} className="text-primary" />,
      image: "https://images.unsplash.com/photo-1547573854-74d2a71d0826?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
    },
    {
      title: "Livraison rapide et pratique",
      description: "Commandez en quelques clics et recevez votre repas rapidement, où que vous soyez dans la ville.",
      icon: <MapPin size={48} className="text-primary" />,
      image: "https://images.unsplash.com/photo-1593280405106-e438ebe54647?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
    }
  ];
  
  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Mark as not first visit and navigate to home
      setIsFirstVisit(false);
      navigate('/');
    }
  };
  
  const skipOnboarding = () => {
    setIsFirstVisit(false);
    navigate('/');
  };
  
  const currentSlide = steps[currentStep];
  
  return (
    <div className="fixed inset-0 bg-white">
      <div className="h-full flex flex-col">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={skipOnboarding}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Passer
          </button>
        </div>
        
        <div className="h-1/2 relative overflow-hidden">
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 flex items-center justify-center">
            {currentSlide.icon}
          </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-between px-6 py-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {currentSlide.title}
            </h1>
            <p className="text-gray-600">
              {currentSlide.description}
            </p>
          </div>
          
          <div className="mt-8">
            <div className="flex justify-center space-x-2 mb-8">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentStep 
                      ? "w-8 bg-primary" 
                      : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={goToNextStep}
              className="w-full bg-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-primary/20"
            >
              <span>{currentStep === steps.length - 1 ? "Commencer" : "Suivant"}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
