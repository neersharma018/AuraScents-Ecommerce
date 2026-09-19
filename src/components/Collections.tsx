import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const allPerfumes = [
  { collection: 'Oud & Woods', key: 'velvet-oud', name: 'Velvet Oud', notes: 'WOODY • OUD • SPICY', price: 450, image: '/assets/perfumes/velvet-oud.jpg' },
  { collection: 'Oud & Woods', key: 'noir-amber', name: 'Noir Amber', notes: 'AMBER • SPICY • WARM', price: 380, image: '/assets/perfumes/noir-amber.jpg' },
  { collection: 'Oud & Woods', key: 'santal-elan', name: 'Santal Élan', notes: 'WOODY • CREAMY • SOFT', price: 420, image: '/assets/perfumes/santal-elan.jpg' },
  { collection: 'Oud & Woods', key: 'forest-whisper', name: 'Forest Whisper', notes: 'GREEN • WOODY • EARTHY', price: 370, image: '/assets/perfumes/forest-whisper.jpg' },
  { collection: 'Oud & Woods', key: 'blaze', name: 'Blaze', notes: 'SPICY • WOODY • BOLD', price: 440, image: '/assets/perfumes/blaze.jpg' },
  { collection: 'Oud & Woods', key: 'amber-solace', name: 'Amber Solace', notes: 'AMBER • VANILLA • WARM', price: 410, image: '/assets/perfumes/amber-solace.jpg' },
  { collection: 'Floral Élan', key: 'rose-nocturne', name: 'Rose Nocturne', notes: 'FLORAL • POWDERY • ELEGANT', price: 390, image: '/assets/perfumes/rose-nocturne.jpg' },
  { collection: 'Floral Élan', key: 'midnight-bloom', name: 'Midnight Bloom', notes: 'FLORAL • MUSKY • SENSUAL', price: 460, image: '/assets/perfumes/midnight-bloom.jpg' },
  { collection: 'Floral Élan', key: 'golden-haze', name: 'Golden Haze', notes: 'FLORAL • AMBER • RICH', price: 430, image: '/assets/perfumes/golden-haze-fix.jpg' },
  { collection: 'Fresh & Citrus', key: 'azure-mist', name: 'Azure Mist', notes: 'AQUATIC • FRESH • CLEAN', price: 350, image: '/assets/perfumes/azure-mist.jpg' },
  { collection: 'Fresh & Citrus', key: 'citrus-veil', name: 'Citrus Veil', notes: 'CITRUS • FRESH • ENERGIZING', price: 320, image: '/assets/perfumes/citrus-veil.jpg' },
  { collection: 'Fresh & Citrus', key: 'moonlit-sage', name: 'Moonlit Sage', notes: 'HERBAL • AROMATIC • CALM', price: 340, image: '/assets/perfumes/moonlit-sage-fix.jpg' },
];

const Collections: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % allPerfumes.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + allPerfumes.length) % allPerfumes.length);
  };

  const activeItem = allPerfumes[activeIndex];

  // Helper to determine styles based on distance from active
  const getVariants = (index: number) => {
    let diff = index - activeIndex;
    
    // Handle wrap-around for smooth infinite effect visually (optional, but let's just do clamp for now)
    if (diff < -2) diff = -3;
    if (diff > 2) diff = 3;

    let x = diff * 280;
    let scale = 1;
    let zIndex = 20;
    let opacity = 1;

    if (diff !== 0) {
      scale = 0.65;
      zIndex = 10 - Math.abs(diff);
      opacity = Math.abs(diff) > 1 ? 0 : 0.4;
      // Adjust spacing for side items so they tuck behind the center item nicely
      x = diff > 0 ? 250 + (diff - 1) * 150 : -250 + (diff + 1) * 150;
    }

    return {
      x,
      scale,
      zIndex,
      opacity,
    };
  };

  return (
    <section className="py-24 relative bg-[var(--bg-ivory)] overflow-hidden" id="collections">
      
      {/* Background subtle mandala or gradient (Simulating the Aevolk aesthetic) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full border border-black/20 animate-[spin_60s_linear_infinite] border-dashed"></div>
        <div className="absolute w-[600px] h-[600px] rounded-full border border-black/20 animate-[spin_40s_linear_infinite_reverse]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Main Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-4">The AuraScents Collection</div>
          <h2 className="serif text-5xl md:text-7xl text-[var(--text-main)] font-light tracking-tight">
            A wardrobe of <span className="italic">memory.</span>
          </h2>
        </motion.div>

        {/* Carousel Area */}
        <div className="relative h-[500px] md:h-[600px] flex items-center justify-center w-full max-w-6xl mx-auto mt-10">
          
          {/* Navigation Arrows */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 md:left-10 z-30 w-14 h-14 bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex items-center justify-center text-gray-500 hover:text-[var(--gold)] hover:scale-110 transition-all duration-300"
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>

          <button 
            onClick={handleNext}
            className="absolute right-0 md:right-10 z-30 w-14 h-14 bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex items-center justify-center text-gray-500 hover:text-[var(--gold)] hover:scale-110 transition-all duration-300"
          >
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>

          {/* Perfume Bottles */}
          <div className="relative w-full h-full flex items-center justify-center perspective-1000">
            {allPerfumes.map((p, index) => {
              const { x, scale, zIndex, opacity } = getVariants(index);
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={p.key}
                  animate={{ x, scale, opacity }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="absolute cursor-pointer"
                  style={{ zIndex }}
                  onClick={() => {
                    if (isActive) navigate(`/product/${p.key}`);
                    else setActiveIndex(index);
                  }}
                >
                  <div className="w-[200px] md:w-[280px] h-[300px] md:h-[420px] relative">
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className={`w-full h-full object-contain filter drop-shadow-2xl transition-all duration-500 ${isActive ? 'scale-110' : 'grayscale-[30%]'}`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Text Area */}
        <div className="text-center mt-8 h-32 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="text-[10px] tracking-[0.4em] text-[#999] mb-4">
                {String(activeIndex + 1).padStart(2, '0')} / {String(allPerfumes.length).padStart(2, '0')}
              </div>
              <h3 className="text-2xl md:text-3xl tracking-widest uppercase font-light text-[var(--text-main)] mb-3">
                {activeItem.collection}
              </h3>
              <p className="text-sm tracking-widest text-[#666] uppercase">
                {activeItem.name} <span className="mx-2">•</span> ${activeItem.price}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Collections;
