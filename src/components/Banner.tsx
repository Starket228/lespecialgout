
import { useEffect, useState } from 'react';
import { bannerImages } from '../data/food-data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Banner() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => 
        current === bannerImages.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToPrevSlide = () => {
    setActiveSlide(current => 
      current === 0 ? bannerImages.length - 1 : current - 1
    );
  };

  const goToNextSlide = () => {
    setActiveSlide(current => 
      current === bannerImages.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div className="relative h-48 md:h-64 overflow-hidden rounded-2xl mx-3 my-4 shadow-lg">
      {bannerImages.map((image, index) => (
        <div
          key={index}
          className={`banner-slide ${index === activeSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
        </div>
      ))}
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-${index === activeSlide ? '6' : '2'} rounded-full transition-all duration-300 ${
              index === activeSlide ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
      
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-sm text-white hover:bg-white/50 transition-colors"
        onClick={goToPrevSlide}
      >
        <ChevronLeft size={20} />
      </button>
      
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-sm text-white hover:bg-white/50 transition-colors"
        onClick={goToNextSlide}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
