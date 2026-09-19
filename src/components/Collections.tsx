import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const featuredPerfumes = [
  {
    id: 'velvet-oud',
    name: 'Velvet Oud',
    notes: 'WOODY • OUD • SPICY',
    image: '/assets/perfumes/transparent/velvet-oud.png'
  },
  {
    id: 'azure-mist',
    name: 'Azure Mist',
    notes: 'FRESH • AQUATIC • CLEAN',
    image: '/assets/perfumes/transparent/azure-mist.png'
  },
  {
    id: 'golden-haze',
    name: 'Golden Haze',
    notes: 'WARM • RADIANT • GOLDEN',
    image: '/assets/perfumes/transparent/golden-haze-fix.png'
  },
  {
    id: 'rose-nocturne',
    name: 'Rose Nocturne',
    notes: 'FLORAL • POWDERY • ELEGANT',
    image: '/assets/perfumes/transparent/rose-nocturne.png'
  },
  {
    id: 'moonlit-sage',
    name: 'Moonlit Sage',
    notes: 'AROMATIC • HERBAL • CALM',
    image: '/assets/perfumes/transparent/moonlit-sage-fix.png'
  }
];

// Ultra-smooth cinematic easing
const cinematicEase = [0.16, 1, 0.3, 1] as const;

const Collections: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % featuredPerfumes.length);
  }, [isAnimating, featuredPerfumes.length]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + featuredPerfumes.length) % featuredPerfumes.length);
  }, [isAnimating, featuredPerfumes.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const activePerfume = featuredPerfumes[activeIndex];

  const getPosition = (index: number) => {
    if (index === activeIndex) return 'center';
    if (index === (activeIndex - 1 + featuredPerfumes.length) % featuredPerfumes.length) return 'left';
    if (index === (activeIndex + 1) % featuredPerfumes.length) return 'right';
    return 'hidden';
  };

  const bottleVariants = {
    center: {
      x: 0,
      scale: 1.1,
      opacity: 1,
      zIndex: 30,
      transition: { duration: 0.8, ease: cinematicEase }
    },
    left: {
      x: '-55%',
      scale: 0.7,
      opacity: 0.5,
      zIndex: 10,
      transition: { duration: 0.8, ease: cinematicEase }
    },
    right: {
      x: '55%',
      scale: 0.7,
      opacity: 0.5,
      zIndex: 10,
      transition: { duration: 0.8, ease: cinematicEase }
    },
    hidden: {
      x: 0,
      scale: 0.5,
      opacity: 0,
      zIndex: 0,
      transition: { duration: 0.8, ease: cinematicEase }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: cinematicEase, delay: 0.1 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.4, ease: cinematicEase } }
  };

  return (
    <section className="relative min-h-[90vh] bg-[#FDFBF7] overflow-hidden flex flex-col justify-center items-center py-24" id="featured">
      
      {/* Background cinematic elements */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.015] pointer-events-none z-0">
        <div className="w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] rounded-full border-[0.5px] border-black animate-[spin_80s_linear_infinite] border-dashed"></div>
        <div className="absolute w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full border-[0.5px] border-black animate-[spin_60s_linear_infinite_reverse]"></div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[1400px] mx-auto relative z-10 flex flex-col items-center">
        
        {/* Navigation Buttons */}
        <button 
          onClick={handlePrev}
          className="absolute left-4 md:left-12 top-[45%] -translate-y-1/2 z-50 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-gray-400 hover:text-[var(--gold)] transition-colors duration-500 group"
          aria-label="Previous"
        >
          <ChevronLeft size={32} strokeWidth={1} className="transform group-hover:-translate-x-1 transition-transform duration-300" />
        </button>

        <button 
          onClick={handleNext}
          className="absolute right-4 md:right-12 top-[45%] -translate-y-1/2 z-50 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-gray-400 hover:text-[var(--gold)] transition-colors duration-500 group"
          aria-label="Next"
        >
          <ChevronRight size={32} strokeWidth={1} className="transform group-hover:translate-x-1 transition-transform duration-300" />
        </button>

        {/* 3D Coverflow Carousel */}
        <div className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center">
          {featuredPerfumes.map((perfume, index) => {
            const position = getPosition(index);
            
            return (
              <motion.div
                key={perfume.id}
                initial={false}
                animate={position}
                variants={bottleVariants}
                className="absolute w-[260px] md:w-[340px] cursor-pointer"
                onClick={() => {
                  if (position === 'left') handlePrev();
                  if (position === 'right') handleNext();
                  if (position === 'center') navigate(`/product/${perfume.id}`);
                }}
              >
                <div className="relative w-full h-full flex items-center justify-center transform transition-transform duration-700 hover:scale-[1.02]">
                  <img 
                    src={perfume.image} 
                    alt={perfume.name} 
                    className="w-full h-auto max-h-[50vh] md:max-h-[60vh] object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.12)]"
                    style={{
                      WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                      maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `/assets/perfumes/${perfume.id}.jpg`;
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Product Details (Animated crossfade) */}
        <div className="h-[20vh] w-full mt-8 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePerfume.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={textVariants}
              className="text-center flex flex-col items-center w-full"
            >
              <h3 className="serif text-4xl md:text-5xl text-[var(--text-main)] mb-4 tracking-wide font-light">
                {activePerfume.name}
              </h3>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-8 md:w-12 bg-gray-300"></div>
                <p className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-gray-500 font-medium">
                  {activePerfume.notes}
                </p>
                <div className="h-[1px] w-8 md:w-12 bg-gray-300"></div>
              </div>

              <button 
                onClick={() => navigate(`/product/${activePerfume.id}`)}
                className="group relative px-10 py-4 text-[10px] md:text-[11px] uppercase tracking-[0.3em] bg-transparent border border-gray-300 text-gray-800 hover:border-black transition-colors duration-500 overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                  Discover {activePerfume.name.split(' ')[0]}
                </span>
                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Collections;
