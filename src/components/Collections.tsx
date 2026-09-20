import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const featuredPerfumes = [
  {
    id: 'velvet-oud',
    name: 'VELVET OUD',
    subtitle: 'AN EMPIRE OF SCENT',
    image: '/assets/perfumes/transparent/velvet-oud.png',
    category: 'OUD & SPICE',
    price: '₹1500'
  },
  {
    id: 'rose-nocturne',
    name: 'ROSE NOCTURNE',
    subtitle: 'ELEGANCE IN BLOOM',
    image: '/assets/perfumes/transparent/ai_purple.png', // Using AI purple to avoid the cut in the original png
    category: 'FLORAL & POWDERY',
    price: '₹1200'
  },
  {
    id: 'santal-elan',
    name: 'SANTAL ÉLAN',
    subtitle: 'THE MODERN CLASSIC',
    image: '/assets/perfumes/transparent/santal-elan.png',
    category: 'SMOKE & VETIVER',
    price: '₹1400'
  }
];

const cinematicEase = [0.25, 1, 0.5, 1] as const;

const Collections: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % featuredPerfumes.length);
  }, [isAnimating]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + featuredPerfumes.length) % featuredPerfumes.length);
  }, [isAnimating]);

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
      const timer = setTimeout(() => setIsAnimating(false), 900);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const getPosition = (index: number) => {
    if (index === activeIndex) return 'center';
    if (index === (activeIndex - 1 + featuredPerfumes.length) % featuredPerfumes.length) return 'left';
    if (index === (activeIndex + 1) % featuredPerfumes.length) return 'right';
    return 'hidden';
  };

  const bottleVariants = {
    center: {
      left: '50%',
      x: '-50%',
      y: '-40%',
      scale: 1,
      opacity: 1,
      zIndex: 30,
      filter: 'brightness(1) drop-shadow(0 40px 50px rgba(0,0,0,0.9))',
      transition: { duration: 0.9, ease: cinematicEase }
    },
    left: {
      left: '20%',
      x: '-50%',
      y: '-20%',
      scale: 0.65,
      opacity: 0.85,
      zIndex: 10,
      filter: 'brightness(0.7) drop-shadow(0 20px 30px rgba(0,0,0,0.7))',
      transition: { duration: 0.9, ease: cinematicEase }
    },
    right: {
      left: '80%',
      x: '-50%',
      y: '-20%',
      scale: 0.65,
      opacity: 0.85,
      zIndex: 10,
      filter: 'brightness(0.7) drop-shadow(0 20px 30px rgba(0,0,0,0.7))',
      transition: { duration: 0.9, ease: cinematicEase }
    }
  };

  const textOverlayVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: cinematicEase, delay: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: cinematicEase } }
  };

  const activePerfume = featuredPerfumes[activeIndex];

  return (
    <section 
      id="collections" 
      className="relative w-full h-screen overflow-hidden bg-[#110a08]"
    >
      {/* FULL-SCREEN GENERATED BACKGROUND */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/assets/pedestals_bg.jpg')` }}
      ></div>
      
      {/* Dark vignette to ensure text remains readable */}
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.9)] pointer-events-none"></div>
      <div className="absolute bottom-0 inset-x-0 h-[50vh] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none"></div>

      {/* Main Content Area */}
      <div className="w-full h-full relative z-10 max-w-[1800px] mx-auto">
        
        {/* Collections Heading */}
        <div className="absolute top-12 left-12 z-40 pointer-events-none">
          <h2 className="text-[10px] tracking-[0.4em] uppercase text-[#d4c6b3]/70 font-light">COLLECTIONS</h2>
        </div>

        {/* Bottles Layer */}
        <div className="absolute inset-0 flex items-center justify-center">
          {featuredPerfumes.map((perfume, index) => {
            const position = getPosition(index);
            
            return (
              <motion.div
                key={perfume.id}
                initial={false}
                animate={position}
                variants={bottleVariants as any}
                className="absolute top-[60%] h-[55vh] md:h-[65vh] cursor-pointer flex justify-center items-center origin-bottom"
                onClick={() => {
                  if (position === 'left') handlePrev();
                  if (position === 'right') handleNext();
                }}
              >
                <img 
                  src={perfume.image} 
                  alt={perfume.name} 
                  className="h-full w-auto object-contain"
                />
              </motion.div>
            );
          })}
        </div>

        {/* CENTER OVERLAY: Minimal Text Panel */}
        <AnimatePresence>
          <motion.div 
            key={`overlay-${activePerfume.id}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={textOverlayVariants}
            className="absolute inset-0 pointer-events-none"
          >
            {/* BOTTOM LEFT: Product Action */}
            <div className="absolute bottom-[8%] left-[8%] md:left-[10%] flex flex-col items-start pointer-events-auto">
              <div className="flex items-center gap-8 mb-2">
                <h1 className="serif text-4xl md:text-6xl tracking-widest text-[#f5f0eb] uppercase drop-shadow-2xl">{activePerfume.name}</h1>
                <button className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[#d4c6b3] hover:text-[#f5f0eb] border border-[#a89582] hover:border-[#f5f0eb] px-6 py-2 rounded-sm transition-all shadow-lg bg-black/20 backdrop-blur-sm">
                  ADD TO CART
                </button>
              </div>
              <p className="text-xs md:text-sm tracking-[0.3em] text-[#a89582] font-light mb-8 drop-shadow-md uppercase">
                {activePerfume.category} | 100ML | {activePerfume.price}
              </p>
              <button 
                onClick={() => navigate(`/product/${activePerfume.id}`)}
                className="px-8 py-3 rounded border border-white/20 text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#f5f0eb] hover:bg-[#f5f0eb] hover:text-black transition-colors duration-500 backdrop-blur-sm shadow-xl"
              >
                EXPLORE COLLECTION
              </button>
            </div>

            {/* BOTTOM RIGHT: Navigation Controls */}
            <div className="absolute bottom-[8%] right-[8%] md:right-[12%] flex items-center gap-6 pointer-events-auto">
              <button 
                onClick={handlePrev} 
                className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-[#a89582] hover:text-white transition-colors flex items-center gap-2 drop-shadow-md"
              >
                <span className="text-lg mb-1">&larr;</span> PREVIOUS SCENT
              </button>
              <span className="w-[1px] h-4 bg-white/20"></span>
              <button 
                onClick={handleNext} 
                className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-[#a89582] hover:text-white transition-colors flex items-center gap-2 drop-shadow-md"
              >
                NEXT SCENT <span className="text-lg mb-1">&rarr;</span>
              </button>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Collections;
