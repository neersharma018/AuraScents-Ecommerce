import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const featuredPerfumes = [
  {
    id: 'citrus-veil',
    name: 'CITRUS BLOSSOM',
    topNotes: 'Sicilian Lemon, Sweet Orange',
    heartNotes: 'Neroli, White Jasmine',
    baseNotes: 'Cedarwood, White Musk',
    image: '/assets/perfumes/citrus-veil.jpg'
  },
  {
    id: 'velvet-oud',
    name: 'VELVET OUD',
    topNotes: 'Bergamot, Sicilian Lemon',
    heartNotes: 'Jasmine, Bulgarian Rose, Lavender',
    baseNotes: 'Oud Wood, Sandalwood, Amber',
    image: '/assets/perfumes/velvet-oud.jpg'
  },
  {
    id: 'santal-elan',
    name: 'SANDALWOOD OUD',
    topNotes: 'Spicy Cardamom, Black Pepper',
    heartNotes: 'Sandalwood, Iris, Violet',
    baseNotes: 'Leather, Amber, Vetiver',
    image: '/assets/perfumes/santal-elan.jpg'
  }
];

const cinematicEase = [0.16, 1, 0.3, 1] as const;

const Collections: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1); // Start with center item active (Velvet Oud)
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
      const timer = setTimeout(() => setIsAnimating(false), 700);
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

  const carouselVariants = {
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
      zIndex: 30,
      filter: 'brightness(1)',
      transition: { duration: 0.7, ease: cinematicEase }
    },
    left: {
      x: '-105%',
      scale: 0.85,
      opacity: 0.6,
      zIndex: 10,
      filter: 'brightness(0.5)',
      transition: { duration: 0.7, ease: cinematicEase }
    },
    right: {
      x: '105%',
      scale: 0.85,
      opacity: 0.6,
      zIndex: 10,
      filter: 'brightness(0.5)',
      transition: { duration: 0.7, ease: cinematicEase }
    },
    hidden: {
      x: 0,
      scale: 0.8,
      opacity: 0,
      zIndex: 0,
      transition: { duration: 0.7, ease: cinematicEase }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: cinematicEase, delay: 0.2 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: cinematicEase } }
  };

  return (
    <section className="relative min-h-screen bg-[#140f0c] text-white overflow-hidden flex flex-col justify-between py-12 font-sans" id="collections">
      
      {/* Background ambient light */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(40,25,15,0.4)_0%,rgba(20,15,12,1)_80%)] pointer-events-none z-0"></div>

      <div className="w-full max-w-[1800px] mx-auto relative z-10 flex flex-col h-full px-4 md:px-12">
        
        {/* TOP: Image Carousel */}
        <div className="relative w-full h-[55vh] md:h-[65vh] flex items-center justify-center mt-8">
          
          <button 
            onClick={handlePrev}
            className="absolute left-0 z-50 p-4 text-[#a89582] hover:text-white transition-colors duration-300"
            aria-label="Previous"
          >
            <ChevronLeft size={40} strokeWidth={1} />
          </button>

          <button 
            onClick={handleNext}
            className="absolute right-0 z-50 p-4 text-[#a89582] hover:text-white transition-colors duration-300"
            aria-label="Next"
          >
            <ChevronRight size={40} strokeWidth={1} />
          </button>

          <div className="relative w-full max-w-[1200px] h-full flex items-center justify-center">
            {featuredPerfumes.map((perfume, index) => {
              const position = getPosition(index);
              const isCenter = position === 'center';
              
              return (
                <motion.div
                  key={perfume.id}
                  initial={false}
                  animate={position}
                  variants={carouselVariants}
                  className={`absolute h-[85%] md:h-[95%] cursor-pointer drop-shadow-2xl ${isCenter ? 'w-[40%] md:w-[35%]' : 'w-[30%] md:w-[25%]'}`}
                  onClick={() => {
                    if (position === 'left') handlePrev();
                    if (position === 'right') handleNext();
                    if (position === 'center') navigate(`/product/${perfume.id}`);
                  }}
                >
                  <div className="w-full h-full overflow-hidden border border-white/10">
                    <img 
                      src={perfume.image} 
                      alt={perfume.name} 
                      className="w-full h-full object-cover"
                    />
                    {/* Shadow overlay for non-active items */}
                    {!isCenter && <div className="absolute inset-0 bg-black/40 transition-opacity duration-700"></div>}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM: Info Section */}
        <div className="w-full mt-12 mb-4 border-t border-white/10 pt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePerfume.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={textVariants}
              className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-8 lg:gap-12"
            >
              
              {/* Column 1: Title */}
              <div className="flex-1 flex flex-col justify-center text-center lg:text-left pr-0 lg:pr-8">
                <h4 className="serif text-[#d4c6b3] text-2xl md:text-3xl mb-2 font-light tracking-wide">
                  The Experience Continues
                </h4>
                <h2 className="serif text-5xl md:text-6xl text-[#f5f0eb] tracking-wider font-normal uppercase">
                  {activePerfume.name}
                </h2>
              </div>

              {/* Vertical Divider */}
              <div className="hidden lg:block w-[1px] bg-white/10 self-stretch my-2"></div>

              {/* Column 2: Notes */}
              <div className="flex-1 flex flex-col justify-center gap-5 pl-0 lg:pl-8 pr-0 lg:pr-8">
                {/* Top Notes */}
                <div className="flex items-start gap-4 group">
                  <div className="mt-1 w-7 h-7 rounded-full border border-[#8a7a66] text-[#8a7a66] flex items-center justify-center text-xs font-mono group-hover:border-[#d4c6b3] group-hover:text-[#d4c6b3] transition-colors">
                    01
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a7a66] mb-1 font-semibold group-hover:text-[#a89582] transition-colors">Top Notes</p>
                    <p className="text-[#f5f0eb] text-sm md:text-base font-light tracking-wide">{activePerfume.topNotes}</p>
                  </div>
                </div>
                
                {/* Heart Notes */}
                <div className="flex items-start gap-4 group">
                  <div className="mt-1 w-7 h-7 rounded-full border border-[#8a7a66] text-[#8a7a66] flex items-center justify-center text-xs font-mono group-hover:border-[#d4c6b3] group-hover:text-[#d4c6b3] transition-colors">
                    02
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a7a66] mb-1 font-semibold group-hover:text-[#a89582] transition-colors">Heart Notes</p>
                    <p className="text-[#f5f0eb] text-sm md:text-base font-light tracking-wide">{activePerfume.heartNotes}</p>
                  </div>
                </div>

                {/* Base Notes */}
                <div className="flex items-start gap-4 group">
                  <div className="mt-1 w-7 h-7 rounded-full border border-[#8a7a66] text-[#8a7a66] flex items-center justify-center text-xs font-mono group-hover:border-[#d4c6b3] group-hover:text-[#d4c6b3] transition-colors">
                    03
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a7a66] mb-1 font-semibold group-hover:text-[#a89582] transition-colors">Base Notes</p>
                    <p className="text-[#f5f0eb] text-sm md:text-base font-light tracking-wide">{activePerfume.baseNotes}</p>
                  </div>
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="hidden lg:block w-[1px] bg-white/10 self-stretch my-2"></div>

              {/* Column 3: Purchase Action */}
              <div className="flex-1 flex flex-col justify-center items-center lg:items-end text-center lg:text-right pl-0 lg:pl-8">
                <h4 className="serif text-[#f5f0eb] text-2xl md:text-3xl mb-6 font-normal tracking-wide">
                  More Than Just a Scent.
                </h4>
                
                <button 
                  onClick={() => navigate(`/product/${activePerfume.id}`)}
                  className="relative group overflow-hidden w-full max-w-[320px] rounded flex items-center bg-gradient-to-r from-[#2c221a] to-[#45372b] border border-[#6b5847] hover:border-[#a89582] transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
                >
                  {/* Subtle noise/texture overlay */}
                  <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] pointer-events-none"></div>
                  
                  {/* Rose icon container */}
                  <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center border-r border-[#6b5847] bg-[#1a140f]/50">
                    {/* CSS Rose / Abstract floral icon */}
                    <div className="w-8 h-8 rounded-full border-2 border-[#a89582] flex items-center justify-center overflow-hidden">
                      <div className="w-5 h-5 rounded-full border border-[#d4c6b3] border-t-transparent animate-[spin_4s_linear_infinite]"></div>
                    </div>
                  </div>

                  {/* Button Text */}
                  <div className="flex-1 flex items-center justify-between px-6 py-4">
                    <span className="text-xs md:text-sm font-semibold tracking-[0.2em] text-[#e8dccb] uppercase group-hover:text-white transition-colors">
                      Purchase {activePerfume.name.split(' ')[0]}
                    </span>
                    <Sparkles size={16} className="text-[#a89582] group-hover:text-white transition-colors" />
                  </div>
                  
                  {/* Shine effect */}
                  <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[30deg] group-hover:left-[200%] transition-all duration-1000 ease-out"></div>
                </button>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Collections;
