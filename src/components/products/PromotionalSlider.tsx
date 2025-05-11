import React, { useState, useEffect } from 'react';

/**
 * Interface for promotional slider slide data
 */
interface Slide {
  /** Unique identifier for the slide */
  id: string;
  /** Title text displayed on the slide */
  title: string;
  /** Description text displayed on the slide */
  description: string;
  /** Background color CSS class for the slide */
  bgColor: string;
}

/**
 * Component for displaying a promotional slider with auto-rotating slides
 * 
 * @returns The rendered promotional slider component
 */
export const PromotionalSlider: React.FC = () => {
  // Mock promotional slides
  const slides: Slide[] = [
    {
      id: '1',
      title: 'Welcome to SynMax Intelligence Marketplace',
      description: 'Your source for maritime industry data and analytics',
      bgColor: 'bg-primary-600',
    },
    {
      id: '2',
      title: 'Area Monitoring Service',
      description: 'Monitor specific maritime areas of interest',
      bgColor: 'bg-primary-600',
    },
    {
      id: '3',
      title: 'Maritime Investigations',
      description: 'Detailed analysis of maritime incidents',
      bgColor: 'bg-primary-600',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  /**
   * Navigate to a specific slide by index
   *
   * @param index - The index of the slide to display
   */
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative overflow-hidden rounded-lg h-64 mb-8">
      {/* Slides */}
      <div
        className="h-full transition-transform duration-500 ease-out flex"
        style={{
          transform: `translateX(-${(currentSlide * 100) / slides.length}%)`,
          width: `${slides.length * 100}%`,
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`w-full h-full flex items-center justify-center ${slide.bgColor} text-white p-8`}
            style={{ width: `${100 / slides.length}%` }}
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
              <p className="text-xl">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index
                ? 'bg-white'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Previous/Next buttons */}
      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 rounded-full p-2 text-white transition-colors"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 rounded-full p-2 text-white transition-colors"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};
