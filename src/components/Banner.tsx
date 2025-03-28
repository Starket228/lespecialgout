
import { useEffect, useState } from 'react';
import { bannerImages } from '../data/food-data';

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

  return (
    <div className="relative h-40 md:h-60 overflow-hidden rounded-2xl mx-3 my-3 shadow-md">
      {bannerImages.map((image, index) => (
        <div
          key={index}
          className={`banner-slide ${index === activeSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
    </div>
  );
}
