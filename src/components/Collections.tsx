import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const featuredPerfumes = [
  {
    id: 'velvet-oud',
    name: 'VELVET OUD',
    subtitle: 'AN EMPIRE OF SCENT',
    topNotes: 'Bergamot, Sicilian Lemon',
    heartNotes: 'Jasmine, Bulgarian Rose, Lavender',
    baseNotes: 'Oud Wood, Sandalwood, Amber',
    image: '/assets/perfumes/transparent/velvet-oud.png',
    category: 'OUD & SPICE',
    price: '₹1500'
  },
  {
    id: 'rose-nocturne',
    name: 'ROSE NOCTURNE',
    subtitle: 'ELEGANCE IN BLOOM',
    topNotes: 'Pink Pepper, Bergamot',
    heartNotes: 'Turkish Rose, Violet',
    baseNotes: 'Vanilla, White Musk',
    image: '/assets/perfumes/transparent/rose-nocturne.png',
    category: 'FLORAL & POWDERY',
    price: '₹1200'
  },
  {
    id: 'santal-elan',
    name: 'SANTAL ÉLAN',
    subtitle: 'THE MODERN CLASSIC',
    topNotes: 'Cardamom, Iris',
    heartNotes: 'Sandalwood, Violet',
    baseNotes: 'Leather, Amber',
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
      scale: 1,
      opacity: 1,
      zIndex: 30,
      filter: 'brightness(1) drop-shadow(0 20px 30px rgba(0,0,0,0.8))',
      transition: { duration: 0.9, ease: cinematicEase }
    },
    left: {
      left: '15%',
      x: '-50%',
      scale: 0.7,
      opacity: 0.6,
      zIndex: 10,
      filter: 'brightness(0.5) drop-shadow(0 10px 15px rgba(0,0,0,0.5))',
      transition: { duration: 0.9, ease: cinematicEase }
    },
    right: {
      left: '85%',
      x: '-50%',
      scale: 0.7,
      opacity: 0.6,
      zIndex: 10,
      filter: 'brightness(0.5) drop-shadow(0 10px 15px rgba(0,0,0,0.5))',
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
      {/* SINGLE UNIFIED CINEMATIC BACKGROUND */}
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2a1a11] via-[#110a08] to-black"></div>
      
      {/* Studio Lighting Highlights */}
      {/* Top Left warm light */}
      <div className="absolute top-0 left-0 w-[60vw] h-[60vh] bg-[radial-gradient(ellipse_at_top_left,rgba(180,120,80,0.15),transparent_70%)] pointer-events-none mix-blend-screen"></div>
      {/* Center spotlight behind bottle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(212,198,179,0.08)_0%,transparent_60%)] pointer-events-none blur-3xl mix-blend-screen"></div>
      {/* Dark vignette at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-[40vh] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none"></div>

      {/* Main Content Area */}
      <div className="w-full h-full relative z-10 max-w-[1800px] mx-auto">
        
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
                className="absolute h-[65vh] md:h-[75vh] cursor-pointer flex justify-center items-center"
                onClick={() => {
                  if (position === 'left') handlePrev();
                  if (position === 'right') handleNext();
                }}
              >
                <img 
                  src={perfume.image} 
                  alt={perfume.name} 
                  className="h-full w-auto object-contain"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
                  }}
                />
                
                {/* Static Text for Side Bottles */}
                {position !== 'center' && (
                  <div className="absolute -bottom-16 inset-x-0 flex flex-col items-center justify-end text-center opacity-80 pointer-events-none">
                    <h3 className="serif text-xl md:text-2xl tracking-widest text-[#f5f0eb] uppercase whitespace-nowrap">{perfume.name}</h3>
                    <p className="text-[8px] md:text-[9px] tracking-[0.3em] uppercase text-[#a89582] mt-2 whitespace-nowrap">{perfume.category}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CENTER OVERLAY: Glassmorphism Info Panel */}
        <AnimatePresence>
          <motion.div 
            key={`overlay-${activePerfume.id}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={textOverlayVariants}
            className="absolute inset-0 pointer-events-none"
          >
            {/* TOP RIGHT PANEL */}
            <div className="absolute top-[20%] right-[8%] md:right-[12%] flex flex-col items-end pointer-events-auto">
              <div className="text-right mb-6 drop-shadow-2xl">
                <h2 className="serif text-4xl md:text-6xl tracking-widest text-[#f5f0eb] uppercase">{activePerfume.name}</h2>
                <h3 className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#a89582] mt-2">{activePerfume.subtitle}</h3>
              </div>

              <div className="w-[300px] md:w-[360px] rounded-2xl border border-white/10 bg-[#2a1a11]/30 backdrop-blur-md p-6 shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col gap-6">
                {/* Top Notes */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs font-mono text-white/60">01</div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#a89582] mb-1">Top Notes</p>
                    <p className="text-[#f5f0eb] text-sm font-light leading-relaxed">{activePerfume.topNotes}</p>
                  </div>
                </div>
                {/* Heart Notes */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs font-mono text-white/60">02</div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#a89582] mb-1">Heart Notes</p>
                    <p className="text-[#f5f0eb] text-sm font-light leading-relaxed">{activePerfume.heartNotes}</p>
                  </div>
                </div>
                {/* Base Notes */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs font-mono text-white/60">03</div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#a89582] mb-1">Base Notes</p>
                    <p className="text-[#f5f0eb] text-sm font-light leading-relaxed">{activePerfume.baseNotes}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM LEFT: Product Action */}
            <div className="absolute bottom-[10%] left-[8%] md:left-[10%] flex flex-col items-start pointer-events-auto">
              <div className="flex items-end gap-6 mb-2">
                <h1 className="serif text-4xl md:text-5xl tracking-widest text-[#f5f0eb] uppercase drop-shadow-xl">{activePerfume.name}</h1>
                <button className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[#d4c6b3] hover:text-white border-b border-[#d4c6b3]/50 hover:border-white pb-1 transition-all mb-2 drop-shadow-md">
                  ADD TO CART
                </button>
              </div>
              <p className="text-xs md:text-sm tracking-[0.2em] text-white/70 font-light mb-8 drop-shadow-md">
                EAU DE PARFUM | 100ml | {activePerfume.price}
              </p>
              <button 
                onClick={() => navigate(`/product/${activePerfume.id}`)}
                className="px-8 py-3 rounded border border-white/30 text-[10px] md:text-xs tracking-[0.25em] uppercase text-white hover:bg-white hover:text-black transition-colors duration-500 backdrop-blur-sm shadow-xl"
              >
                EXPLORE COLLECTION
              </button>
            </div>

            {/* BOTTOM RIGHT: Navigation Controls */}
            <div className="absolute bottom-[10%] right-[8%] md:right-[12%] flex items-center gap-6 pointer-events-auto">
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
