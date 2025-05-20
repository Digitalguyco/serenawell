'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    image: '/images/slide1.png',
    title: 'Premium Health Supplements',
    description: 'Enhance your wellbeing with our natural ingredients'
  },
  {
    id: 2,
    image: '/images/slide2.png',
    title: 'Quality Ingredients',
    description: 'Sourced from nature, crafted with care'
  },
  {
    id: 3,
    image: '/images/slide3.png',
    title: 'Sustainable Products',
    description: 'Good for you, good for the planet'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance the slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <div className="relative h-[700px] md:h-[800px] overflow-hidden bg-herbal-cream">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="absolute inset-0 bg-black/30 z-10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full relative">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </div>
            <div className="absolute  inset-0 flex flex-col items-center justify-center z-20 text-white text-center p-4">
              <div className="flex flex-col items-center justify-center  rounded-md p-4">
                <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
              <p className="font-body text-xl md:text-2xl mb-8 max-w-2xl">{slide.description}</p>
              <button className="font-body bg-royal-leaf-green hover:bg-fresh-sage text-white font-bold py-3 px-6 rounded-md transition-colors">
                Explore Now
              </button>
              </div>
              
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-20">
        <div className="flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-sunbeam-yellow' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero; 