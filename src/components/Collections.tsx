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

// Ultra-smooth cinematic easing
const cinematicEase = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      duration: 0.8
    }
  }
};

const bottleVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 100 : -100,
    filter: 'blur(8px)',
  }),
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: cinematicEase }
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -100 : 100,
    filter: 'blur(8px)',
    transition: { duration: 0.8, ease: cinematicEase }
  })
};

const textVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 30 : -30,
    filter: 'blur(10px)',
  }),
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: cinematicEase, delay: 0.2 }
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -30 : 30,
    filter: 'blur(10px)',
    transition: { duration: 0.6, ease: cinematicEase }
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
      const timer = setTimeout(() => setIsAnimating(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const activeCollection = collectionsData[activeIndex];

  return (
    <section className="relative min-h-[100vh] bg-[#FDFBF7] overflow-hidden flex flex-col pt-16 pb-12" id="collections">
      
      {/* Cinematic Vignette & Mandala Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.03)_100%)] pointer-events-none z-0"></div>
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none z-0">
        <div className="w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] rounded-full border-[0.5px] border-black animate-[spin_80s_linear_infinite] border-dashed"></div>
        <div className="absolute w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full border-[0.5px] border-black animate-[spin_60s_linear_infinite_reverse]"></div>
      </div>

      {/* Top Header */}
      <div className="container mx-auto px-6 text-center z-20 mb-8 mt-6">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: cinematicEase }}
          className="text-[10px] tracking-[0.5em] uppercase text-gray-400/80 mb-6 font-medium"
        >
          The AuraScents Collections
        </motion.h2>
        <motion.div 
          initial={{ height: 0 }}
          whileInView={{ height: '2rem' }}
          transition={{ duration: 1, delay: 0.3, ease: cinematicEase }}
          className="w-px bg-gray-300 mx-auto"
        ></motion.div>
      </div>

      {/* Main Showcase Area */}
      <div className="flex-1 flex flex-col justify-center items-center relative w-full max-w-[1600px] mx-auto px-4 md:px-12 z-10">
        
        {/* Navigation Controls */}
        <button 
          onClick={handlePrev}
          className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-16 md:h-16 rounded-full border border-gray-200/60 flex items-center justify-center text-gray-400 hover:text-[var(--gold)] hover:border-[var(--gold)] transition-all duration-500 bg-white/30 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] group"
          aria-label="Previous Collection"
        >
          <ChevronLeft size={24} strokeWidth={1} className="transform group-hover:-translate-x-1 transition-transform duration-300" />
        </button>

        <button 
          onClick={handleNext}
          className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-16 md:h-16 rounded-full border border-gray-200/60 flex items-center justify-center text-gray-400 hover:text-[var(--gold)] hover:border-[var(--gold)] transition-all duration-500 bg-white/30 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] group"
          aria-label="Next Collection"
        >
          <ChevronRight size={24} strokeWidth={1} className="transform group-hover:translate-x-1 transition-transform duration-300" />
        </button>

        {/* Carousel Container */}
        <div className="w-full h-full flex flex-col items-center justify-center relative mt-4">
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
              
              {/* Row of Bottles (Clean Horizontal Line) */}
              <div className="flex flex-row flex-nowrap justify-center items-end gap-4 md:gap-12 w-full max-w-6xl h-[45vh] md:h-[55vh] mb-12 px-8">
                {activeCollection.perfumes.map((p, idx) => {
                  const isCenter = idx === 1 || idx === 2;
                  return (
                    <motion.div
                      key={p.key}
                      custom={direction}
                      variants={bottleVariants}
                      className={`relative cursor-pointer transition-all duration-700 ease-out hover:brightness-110 w-1/4 ${isCenter ? 'scale-110 z-20' : 'scale-[0.85] z-10 opacity-80 hover:opacity-100 hover:scale-95'}`}
                      onClick={() => navigate(`/product/${p.key}`)}
                    >
                      <div className="w-full h-full transform transition-transform duration-1000 ease-out hover:scale-[1.03] hover:-translate-y-6">
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="w-full h-auto max-h-[100%] object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
                          style={{
                            WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                            maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
                          }}
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
                <div className="flex items-center gap-6 text-[10px] md:text-[11px] tracking-[0.4em] text-gray-400 mb-6 font-medium">
                  <span className="text-gray-900">{String(activeIndex + 1).padStart(2, '0')}</span>
                  <span className="w-8 md:w-12 h-[1px] bg-gray-300"></span>
                  <span>{String(collectionsData.length).padStart(2, '0')}</span>
                </div>
                
                <h3 className="serif text-5xl md:text-7xl text-[var(--text-main)] mb-5 tracking-wide leading-tight">
                  {activeCollection.name}
                </h3>
                
                <p className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-gray-500 mb-10 max-w-[300px] md:max-w-lg mx-auto leading-loose">
                  {activeCollection.theme}
                </p>

                <button className="group relative text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-gray-600 hover:text-[var(--gold)] transition-colors duration-500 py-2">
                  <span className="relative z-10">Explore Collection</span>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-300 group-hover:bg-[var(--gold)] transition-colors duration-500"></span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--gold)] group-hover:w-full transition-all duration-700 ease-out"></span>
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
