import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const collectionsData = [
  {
    id: 1,
    name: 'The Signature Edit',
    theme: 'Elegant, timeless, sophisticated fragrances.',
    perfumes: [
      { key: 'velvet-oud', name: 'Velvet Oud', image: '/assets/perfumes/transparent/velvet-oud.png' },
      { key: 'rose-nocturne', name: 'Rose Nocturne', image: '/assets/perfumes/transparent/rose-nocturne.png' },
      { key: 'santal-elan', name: 'Santal Élan', image: '/assets/perfumes/transparent/santal-elan.png' },
      { key: 'golden-haze', name: 'Golden Haze', image: '/assets/perfumes/transparent/golden-haze-fix.png' },
    ]
  },
  {
    id: 2,
    name: 'After Dark',
    theme: 'Deep, mysterious, sensual evening fragrances.',
    perfumes: [
      { key: 'noir-amber', name: 'Noir Amber', image: '/assets/perfumes/transparent/noir-amber.png' },
      { key: 'blaze', name: 'Blaze', image: '/assets/perfumes/transparent/blaze.png' },
      { key: 'midnight-bloom', name: 'Midnight Bloom', image: '/assets/perfumes/transparent/midnight-bloom.png' },
      { key: 'amber-solace', name: 'Amber Solace', image: '/assets/perfumes/transparent/amber-solace.png' },
    ]
  },
  {
    id: 3,
    name: 'Fresh Chapter',
    theme: 'Fresh, clean, energetic daytime fragrances.',
    perfumes: [
      { key: 'azure-mist', name: 'Azure Mist', image: '/assets/perfumes/transparent/azure-mist.png' },
      { key: 'citrus-veil', name: 'Citrus Veil', image: '/assets/perfumes/transparent/citrus-veil.png' },
      { key: 'moonlit-sage', name: 'Moonlit Sage', image: '/assets/perfumes/transparent/moonlit-sage-fix.png' },
      { key: 'forest-whisper', name: 'Forest Whisper', image: '/assets/perfumes/transparent/forest-whisper.png' },
    ]
  }
];

// Custom easing for luxury feel
const easeOutQuart = [0.25, 1, 0.5, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const bottleVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 80 : -80,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.0, ease: easeOutQuart }
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -80 : 80,
    transition: { duration: 0.6, ease: easeOutQuart }
  })
};

const textVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 15 : -15
  }),
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutQuart, delay: 0.2 }
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -15 : 15,
    transition: { duration: 0.4, ease: easeOutQuart }
  })
};

const Collections: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % collectionsData.length);
  }, [isAnimating]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + collectionsData.length) % collectionsData.length);
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
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const activeCollection = collectionsData[activeIndex];

  return (
    <section className="relative min-h-[100vh] bg-[#FDFBF7] overflow-hidden flex flex-col pt-16 pb-12" id="collections">
      
      {/* Background subtle mandala */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full border border-black animate-[spin_60s_linear_infinite] border-dashed"></div>
        <div className="absolute w-[600px] h-[600px] rounded-full border border-black animate-[spin_40s_linear_infinite_reverse]"></div>
      </div>

      {/* Top Header */}
      <div className="container mx-auto px-6 text-center z-20 mb-8">
        <h2 className="text-[10px] tracking-[0.4em] uppercase text-gray-400 mb-6">
          The AuraScents Collections
        </h2>
        <div className="w-px h-8 bg-gray-300 mx-auto"></div>
      </div>

      {/* Main Showcase Area */}
      <div className="flex-1 flex flex-col justify-center items-center relative w-full max-w-[1400px] mx-auto px-4 md:px-12">
        
        {/* Navigation Controls */}
        <button 
          onClick={handlePrev}
          className="absolute left-2 md:left-12 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-14 md:h-14 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[var(--gold)] hover:border-[var(--gold)] transition-all duration-300 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
          aria-label="Previous Collection"
        >
          <ChevronLeft size={20} strokeWidth={1} />
        </button>

        <button 
          onClick={handleNext}
          className="absolute right-2 md:right-12 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-14 md:h-14 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[var(--gold)] hover:border-[var(--gold)] transition-all duration-300 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
          aria-label="Next Collection"
        >
          <ChevronRight size={20} strokeWidth={1} />
        </button>

        {/* Carousel Container */}
        <div className="w-full h-full flex flex-col items-center justify-center relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeCollection.id}
              custom={direction}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center justify-center w-full"
            >
              
              {/* Row of Bottles (NOT Absolute/Overlapping) */}
              <div className="flex flex-row flex-nowrap justify-center items-end gap-2 md:gap-8 w-full max-w-5xl h-[40vh] md:h-[50vh] mb-8 px-8">
                {activeCollection.perfumes.map((p, idx) => {
                  // Make center bottles slightly larger to create a natural curve
                  const isCenter = idx === 1 || idx === 2;
                  return (
                    <motion.div
                      key={p.key}
                      custom={direction}
                      variants={bottleVariants}
                      className={`relative cursor-pointer transition-transform duration-500 hover:brightness-110 w-1/4 ${isCenter ? 'scale-110 z-20' : 'scale-90 z-10 opacity-90'}`}
                      onClick={() => navigate(`/product/${p.key}`)}
                    >
                      <div className="w-full h-full transform transition-transform duration-700 hover:scale-105 hover:-translate-y-4">
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="w-full h-auto max-h-[100%] object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.15)]"
                          onError={(e) => {
                            // Fallback if the transparent image is missing or broken
                            (e.target as HTMLImageElement).src = `/assets/perfumes/${p.key}.jpg`;
                          }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Collection Info (Bottom) */}
              <motion.div 
                custom={direction}
                variants={textVariants}
                className="text-center flex flex-col items-center"
              >
                <div className="flex items-center gap-4 text-[10px] md:text-xs tracking-[0.3em] text-gray-400 mb-4 font-light">
                  <span>{String(activeIndex + 1).padStart(2, '0')}</span>
                  <span className="w-6 md:w-8 h-[1px] bg-gray-300"></span>
                  <span>{String(collectionsData.length).padStart(2, '0')}</span>
                </div>
                
                <h3 className="serif text-4xl md:text-6xl text-[var(--text-main)] mb-3 tracking-wide">
                  {activeCollection.name}
                </h3>
                
                <p className="text-[10px] md:text-xs tracking-widest uppercase text-gray-500 mb-8 max-w-[280px] md:max-w-md mx-auto leading-relaxed">
                  {activeCollection.theme}
                </p>

                <button className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase border-b border-gray-300 pb-1 text-gray-600 hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors duration-300">
                  Explore Collection
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Collections;
