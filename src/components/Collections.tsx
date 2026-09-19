import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
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
      scale: 1.15,
      opacity: 1,
      zIndex: 30,
      transition: { duration: 0.9, ease: cinematicEase }
    },
    left: {
      x: '-70%',
      scale: 0.6,
      opacity: 0.25,
      zIndex: 10,
      transition: { duration: 0.9, ease: cinematicEase }
    },
    right: {
      x: '70%',
      scale: 0.6,
      opacity: 0.25,
      zIndex: 10,
      transition: { duration: 0.9, ease: cinematicEase }
    },
    hidden: {
      x: 0,
      scale: 0.4,
      opacity: 0,
      zIndex: 0,
      transition: { duration: 0.9, ease: cinematicEase }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: cinematicEase, delay: 0.2 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.5, ease: cinematicEase } }
  };

  return (
    <section className="relative min-h-screen bg-[#050505] overflow-hidden flex flex-col justify-center items-center py-16" id="featured">
      
      {/* Cinematic Spotlight Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_60%)] blur-3xl"></div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-0 pointer-events-none"></div>

      {/* Main Container */}
      <div className="w-full max-w-[1600px] mx-auto relative z-10 flex flex-col items-center">
        
        {/* Navigation Buttons */}
        <button 
          onClick={handlePrev}
          className="absolute left-2 md:left-12 top-[45%] -translate-y-1/2 z-50 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-gray-500 hover:text-white transition-colors duration-500 group"
          aria-label="Previous"
        >
          <ChevronLeft size={36} strokeWidth={1} className="transform group-hover:-translate-x-2 transition-transform duration-500" />
        </button>

        <button 
          onClick={handleNext}
          className="absolute right-2 md:right-12 top-[45%] -translate-y-1/2 z-50 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-gray-500 hover:text-white transition-colors duration-500 group"
          aria-label="Next"
        >
          <ChevronRight size={36} strokeWidth={1} className="transform group-hover:translate-x-2 transition-transform duration-500" />
        </button>

        {/* 3D Coverflow Carousel */}
        <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center">
          {featuredPerfumes.map((perfume, index) => {
            const position = getPosition(index);
            
            return (
              <motion.div
                key={perfume.id}
                initial={false}
                animate={position}
                variants={bottleVariants}
                className="absolute w-[280px] md:w-[400px] cursor-pointer flex justify-center items-center"
                onClick={() => {
                  if (position === 'left') handlePrev();
                  if (position === 'right') handleNext();
                  if (position === 'center') navigate(`/product/${perfume.id}`);
                }}
              >
                <div className="relative w-full flex items-center justify-center transform transition-transform duration-1000 hover:scale-[1.03]">
                  <img 
                    src={perfume.image} 
                    alt={perfume.name} 
                    className="w-full h-auto max-h-[55vh] md:max-h-[65vh] object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.4)]"
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
        <div className="h-[20vh] w-full flex flex-col items-center justify-start mt-2 md:mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePerfume.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={textVariants}
              className="text-center flex flex-col items-center w-full"
            >
              <h3 className="serif text-5xl md:text-7xl text-[#F5F5F5] mb-4 tracking-wider font-light leading-none">
                {activePerfume.name}
              </h3>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-6 md:w-10 bg-white/20"></div>
                <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#A3A3A3] font-light">
                  {activePerfume.notes}
                </p>
                <div className="h-[1px] w-6 md:w-10 bg-white/20"></div>
              </div>

              <button 
                onClick={() => navigate(`/product/${activePerfume.id}`)}
                className="group flex items-center gap-4 text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#E5E5E5] hover:text-[var(--gold)] transition-colors pb-3 border-b border-[#E5E5E5]/30 hover:border-[var(--gold)]"
              >
                DISCOVER THE SCENT
                <ArrowRight size={14} className="transform group-hover:translate-x-3 transition-transform duration-500 font-light" strokeWidth={1.5} />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Collections;
