import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';


const featuredPerfumes = [
  {
    id: 'velvet-oud',
    name: 'VELVET OUD',
    subtitle: 'AN EMPIRE OF SCENT',
    image: '/assets/perfumes/transparent/velvet-oud.png',
    category: 'OUD & SPICE',
    price: '₹1500',
    particleType: 'gold-dust'
  },
  {
    id: 'midnight-bloom',
    name: 'MIDNIGHT BLOOM',
    subtitle: 'ELEGANCE IN BLOOM',
    image: '/assets/perfumes/transparent/midnight-bloom.png',
    category: 'FLORAL & POWDERY',
    price: '₹1200',
    particleType: 'petals'
  },
  {
    id: 'santal-elan',
    name: 'SANTAL ÉLAN',
    subtitle: 'THE MODERN CLASSIC',
    image: '/assets/perfumes/transparent/santal-elan.png',
    category: 'SMOKE & VETIVER',
    price: '₹1400',
    particleType: 'smoke'
  }
];

const cinematicEase = [0.25, 1, 0.5, 1] as const;

// Thematic Particle System
const Particles: React.FC<{ type: string }> = ({ type }) => {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return null;

  const count = type === 'petals' ? 12 : type === 'smoke' ? 6 : 20;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20 mix-blend-screen">
      {Array.from({ length: count }).map((_, i) => {
        const randomX = Math.random() * 100;
        const randomDelay = Math.random() * 5;
        const randomDuration = 10 + Math.random() * 15;
        
        if (type === 'smoke') {
          return (
            <motion.div
              key={`smoke-${i}`}
              initial={{ opacity: 0, y: '100%', scale: 1 }}
              animate={{ 
                opacity: [0, 0.4, 0], 
                y: '-20%', 
                x: `${randomX + (Math.random() * 20 - 10)}%`,
                scale: [1, 2, 3] 
              }}
              transition={{
                duration: randomDuration,
                repeat: Infinity,
                delay: randomDelay,
                ease: 'linear'
              }}
              className="absolute bottom-0 w-32 h-32 bg-white rounded-full blur-[40px] opacity-10"
              style={{ left: `${randomX}%` }}
            />
          );
        }
        
        if (type === 'petals') {
          return (
            <motion.div
              key={`petal-${i}`}
              initial={{ opacity: 0, y: '-20%', x: `${randomX}%`, rotate: 0 }}
              animate={{ 
                opacity: [0, 0.8, 0], 
                y: '120%', 
                x: `${randomX + (Math.random() * 40 - 20)}%`,
                rotate: 360 
              }}
              transition={{
                duration: randomDuration * 0.7,
                repeat: Infinity,
                delay: randomDelay,
                ease: 'linear'
              }}
              className="absolute top-0 w-6 h-6 rounded-full bg-pink-300/30 blur-[2px]"
              style={{ 
                left: `${randomX}%`,
                borderRadius: '50% 0 50% 50%'
              }}
            />
          );
        }

        // Gold dust
        return (
          <motion.div
            key={`gold-${i}`}
            initial={{ opacity: 0, y: '100%' }}
            animate={{ 
              opacity: [0, 0.8, 0], 
              y: '0%' 
            }}
            transition={{
              duration: randomDuration * 0.5,
              repeat: Infinity,
              delay: randomDelay,
              ease: 'linear'
            }}
            className="absolute bottom-0 w-1 h-1 rounded-full bg-[var(--gold)] blur-[1px]"
            style={{ left: `${randomX}%` }}
          />
        );
      })}
    </div>
  );
};

const Collections: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);


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
      y: '15%',
      scale: 1,
      opacity: 1,
      zIndex: 30,
      filter: 'brightness(1.15) contrast(1.05) drop-shadow(0 -15px 35px rgba(255,255,255,0.2))',
      transition: { duration: 0.9, ease: cinematicEase }
    },
    left: {
      left: '20%',
      x: '-50%',
      y: '25%',
      scale: 0.8,
      opacity: 0.5,
      zIndex: 10,
      filter: 'brightness(0.4) contrast(0.9)',
      transition: { duration: 0.9, ease: cinematicEase }
    },
    right: {
      left: '80%',
      x: '-50%',
      y: '25%',
      scale: 0.8,
      opacity: 0.5,
      zIndex: 10,
      filter: 'brightness(0.4) contrast(0.9)',
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
      className="relative w-full h-[100dvh] flex flex-col overflow-hidden bg-[#110a08]"
      aria-label="Featured Collections Slider"
    >
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/assets/categories background.jpeg')` }}
        ></div>
        {/* Text readability gradients removed as per user request to keep original image */}
      </div>

      {/* PARTICLES */}
      <Particles type={activePerfume.particleType} />

      {/* TOP SECTION: 3D Stage (Takes up most of the screen, ensures no overlap with bottom text) */}
      <div className="relative flex-1 z-10 w-full max-w-[1800px] mx-auto pointer-events-none mt-20">
        
        {/* Collections Heading removed */}

        {/* Bottles Layer */}
        <div className="absolute inset-0 flex items-end pb-[10vh] justify-center">
          {featuredPerfumes.map((perfume, index) => {
            const position = getPosition(index);
            const isCenter = position === 'center';
            
            return (
              <motion.div
                key={perfume.id}
                initial={false}
                animate={position}
                variants={bottleVariants as any}
                className={`absolute h-[45vh] md:h-[55vh] flex flex-col justify-end items-center origin-bottom ${!isCenter ? 'cursor-pointer pointer-events-auto' : 'pointer-events-none'}`}
                onClick={() => {
                  if (position === 'left') handlePrev();
                  if (position === 'right') handleNext();
                }}
                role={!isCenter ? "button" : undefined}
                aria-label={!isCenter ? `View ${perfume.name}` : undefined}
                tabIndex={!isCenter ? 0 : -1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (position === 'left') handlePrev();
                    if (position === 'right') handleNext();
                  }
                }}
              >
                {/* Bottle Image */}
                <img 
                  src={perfume.image} 
                  alt={perfume.name} 
                  className="h-full w-auto object-contain relative z-10"
                />
                
                {/* Contact Shadow on Pedestal */}
                <div className="absolute bottom-0 w-[60%] h-[20px] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.9)_0%,transparent_70%)] blur-[4px] -z-10 translate-y-1/2"></div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM SECTION: Typography & Controls (Structurally separated to prevent overlap) */}
      <div className="relative z-30 w-full bg-transparent pb-8 pt-4 md:pb-12 px-6 md:px-12 max-w-[1800px] mx-auto min-h-[25vh] flex flex-col justify-end">
        <AnimatePresence mode="wait">
          <motion.div 
            key={`overlay-${activePerfume.id}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={textOverlayVariants}
            className="flex flex-col md:flex-row md:items-end justify-between w-full gap-8"
          >
            {/* Left: Product Info & Actions removed */}
            <div className="flex flex-col items-start max-w-2xl">
              {/* Product Info & Actions removed */}
            </div>

            {/* Right: Navigation Controls */}
            <div className="flex flex-col items-start md:items-end gap-4 mt-8 md:mt-0">
              {/* Slide Counter removed */}
              
              {/* Prev/Next Buttons */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrev} 
                  className="w-12 h-12 flex items-center justify-center border border-white/20 rounded-full text-white/70 hover:bg-white hover:text-black transition-all group focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                  aria-label="Previous scent"
                >
                  <span className="text-xl group-hover:-translate-x-1 transition-transform">&larr;</span>
                </button>
                <button 
                  onClick={handleNext} 
                  className="w-12 h-12 flex items-center justify-center border border-white/20 rounded-full text-white/70 hover:bg-white hover:text-black transition-all group focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                  aria-label="Next scent"
                >
                  <span className="text-xl group-hover:translate-x-1 transition-transform">&rarr;</span>
                </button>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Collections;
