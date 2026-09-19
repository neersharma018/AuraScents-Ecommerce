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
      { key: 'velvet-oud', name: 'Velvet Oud', image: '/assets/perfumes/velvet-oud.jpg' },
      { key: 'rose-nocturne', name: 'Rose Nocturne', image: '/assets/perfumes/rose-nocturne.jpg' },
      { key: 'santal-elan', name: 'Santal Élan', image: '/assets/perfumes/santal-elan.jpg' },
      { key: 'golden-haze', name: 'Golden Haze', image: '/assets/perfumes/golden-haze-fix.jpg' },
    ]
  },
  {
    id: 2,
    name: 'After Dark',
    theme: 'Deep, mysterious, sensual evening fragrances.',
    perfumes: [
      { key: 'noir-amber', name: 'Noir Amber', image: '/assets/perfumes/noir-amber.jpg' },
      { key: 'blaze', name: 'Blaze', image: '/assets/perfumes/blaze.jpg' },
      { key: 'midnight-bloom', name: 'Midnight Bloom', image: '/assets/perfumes/midnight-bloom.jpg' },
      { key: 'amber-solace', name: 'Amber Solace', image: '/assets/perfumes/amber-solace.jpg' },
    ]
  },
  {
    id: 3,
    name: 'Fresh Chapter',
    theme: 'Fresh, clean, energetic daytime fragrances.',
    perfumes: [
      { key: 'azure-mist', name: 'Azure Mist', image: '/assets/perfumes/azure-mist.jpg' },
      { key: 'citrus-veil', name: 'Citrus Veil', image: '/assets/perfumes/citrus-veil.jpg' },
      { key: 'moonlit-sage', name: 'Moonlit Sage', image: '/assets/perfumes/moonlit-sage-fix.jpg' },
      { key: 'forest-whisper', name: 'Forest Whisper', image: '/assets/perfumes/forest-whisper.jpg' },
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
      delayChildren: 0.2
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
    scale: 0.95,
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 1.0, ease: easeOutQuart }
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -80 : 80,
    scale: 0.95,
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
    transition: { duration: 0.8, ease: easeOutQuart, delay: 0.3 }
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Unlock animation after 1000ms
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const activeCollection = collectionsData[activeIndex];

  // Specific layout positioning for 4 bottles to look artistic and editorial
  const getBottleStyle = (index: number) => {
    // These base positions are relative to a relative container (max-w-4xl)
    const styles = [
      { left: '10%', top: '15%', zIndex: 10, scale: 0.85 },
      { left: '30%', top: '0%', zIndex: 30, scale: 1.1 },
      { left: '50%', top: '10%', zIndex: 20, scale: 0.95 },
      { left: '70%', top: '25%', zIndex: 5, scale: 0.75 },
    ];
    return styles[index];
  };

  return (
    <section className="relative min-h-screen bg-[#FDFBF7] overflow-hidden flex flex-col py-16" id="collections">
      
      {/* Top Header */}
      <div className="container mx-auto px-6 text-center z-20 mt-10">
        <h2 className="text-[10px] tracking-[0.4em] uppercase text-gray-400 mb-6">
          The AuraScents Collections
        </h2>
        <div className="w-px h-10 bg-gray-300 mx-auto"></div>
      </div>

      {/* Main Showcase Area */}
      <div className="flex-1 flex flex-col justify-center relative w-full max-w-[1400px] mx-auto px-4 md:px-12">
        
        {/* Navigation Controls - Hidden on very small screens, shown on md+ */}
        <button 
          onClick={handlePrev}
          className="absolute left-2 md:left-12 top-[40%] md:top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-14 md:h-14 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[var(--gold)] hover:border-[var(--gold)] transition-all duration-300 bg-white/50 backdrop-blur-sm"
          aria-label="Previous Collection"
        >
          <ChevronLeft size={20} strokeWidth={1} />
        </button>

        <button 
          onClick={handleNext}
          className="absolute right-2 md:right-12 top-[40%] md:top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-14 md:h-14 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[var(--gold)] hover:border-[var(--gold)] transition-all duration-300 bg-white/50 backdrop-blur-sm"
          aria-label="Next Collection"
        >
          <ChevronRight size={20} strokeWidth={1} />
        </button>

        <div className="w-full h-full flex flex-col items-center justify-center relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeCollection.id}
              custom={direction}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center w-full h-full justify-center absolute inset-0"
            >
              {/* Artistic Bottle Arrangement */}
              <div className="relative w-[90%] md:w-full max-w-4xl h-[40vh] md:h-[50vh] mt-4 mb-8 md:mb-12">
                {activeCollection.perfumes.map((p, idx) => {
                  const style = getBottleStyle(idx);
                  return (
                    <motion.div
                      key={p.key}
                      custom={direction}
                      variants={bottleVariants}
                      className="absolute cursor-pointer transition-transform duration-500 hover:brightness-110"
                      style={{
                        left: style.left,
                        top: style.top,
                        zIndex: style.zIndex,
                        transform: `scale(${style.scale})`,
                        width: '25%', // responsive width based on container
                      }}
                      onClick={() => navigate(`/product/${p.key}`)}
                    >
                      {/* Using a wrapper for scale-hover without interfering with framer-motion variants */}
                      <div className="w-full h-full transform transition-transform duration-700 hover:scale-105">
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="w-full h-auto object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.12)]"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Collection Info */}
              <motion.div 
                custom={direction}
                variants={textVariants}
                className="text-center flex flex-col items-center px-4"
              >
                <div className="flex items-center gap-4 text-[10px] md:text-xs tracking-[0.3em] text-gray-400 mb-6 font-light">
                  <span>{String(activeIndex + 1).padStart(2, '0')}</span>
                  <span className="w-6 md:w-8 h-[1px] bg-gray-300"></span>
                  <span>{String(collectionsData.length).padStart(2, '0')}</span>
                </div>
                
                <h3 className="serif text-3xl md:text-5xl text-[var(--text-main)] mb-3 tracking-wide">
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
