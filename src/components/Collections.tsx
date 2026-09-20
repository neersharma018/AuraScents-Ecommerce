import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const collectionsData = [
  {
    id: 'signature-edit',
    name: 'The Signature Edit',
    perfumes: [
      {
        id: 'velvet-oud',
        name: 'VELVET OUD',
        subtitle: 'AN EMPIRE OF SCENT',
        topNotes: 'Bergamot, Sicilian Lemon',
        heartNotes: 'Jasmine, Bulgarian Rose, Lavender',
        baseNotes: 'Oud Wood, Sandalwood, Amber',
        image: '/assets/perfumes/velvet-oud.jpg',
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
        image: '/assets/perfumes/rose-nocturne.jpg',
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
        image: '/assets/perfumes/santal-elan.jpg',
        category: 'SMOKE & VETIVER',
        price: '₹1400'
      }
    ]
  },
  {
    id: 'after-dark',
    name: 'After Dark',
    perfumes: [
      {
        id: 'noir-amber',
        name: 'NOIR AMBER',
        subtitle: 'SHADOW & LIGHT',
        topNotes: 'Black Pepper, Saffron',
        heartNotes: 'Amber, Leather',
        baseNotes: 'Vetiver, Patchouli',
        image: '/assets/perfumes/noir-amber.jpg',
        category: 'DARK & MOODY',
        price: '₹1600'
      },
      {
        id: 'blaze',
        name: 'BLAZE',
        subtitle: 'THE INNER FIRE',
        topNotes: 'Cinnamon, Nutmeg',
        heartNotes: 'Incense, Tobacco',
        baseNotes: 'Vanilla, Tonka Bean',
        image: '/assets/perfumes/blaze.jpg',
        category: 'WARM SPICE',
        price: '₹1350'
      },
      {
        id: 'midnight-bloom',
        name: 'MIDNIGHT BLOOM',
        subtitle: 'NIGHT TERRORS',
        topNotes: 'Plum, Cherry',
        heartNotes: 'Night-blooming Jasmine',
        baseNotes: 'Dark Musk, Woods',
        image: '/assets/perfumes/midnight-bloom.jpg',
        category: 'FRUITY FLORAL',
        price: '₹1450'
      }
    ]
  },
  {
    id: 'fresh-chapter',
    name: 'Fresh Chapter',
    perfumes: [
      {
        id: 'azure-mist',
        name: 'AZURE MIST',
        subtitle: 'OCEAN BREEZE',
        topNotes: 'Sea Salt, Grapefruit',
        heartNotes: 'Sage, Seaweed',
        baseNotes: 'Ambrette, White Wood',
        image: '/assets/perfumes/azure-mist.jpg',
        category: 'MARINE & FRESH',
        price: '₹1100'
      },
      {
        id: 'citrus-veil',
        name: 'CITRUS VEIL',
        subtitle: 'MORNING SUN',
        topNotes: 'Mandarin, Lemon',
        heartNotes: 'Orange Blossom, Neroli',
        baseNotes: 'Cedar, White Musk',
        image: '/assets/perfumes/citrus-veil.jpg',
        category: 'CITRUS',
        price: '₹1250'
      },
      {
        id: 'moonlit-sage',
        name: 'MOONLIT SAGE',
        subtitle: 'FOREST WHISPERS',
        topNotes: 'Clary Sage, Mint',
        heartNotes: 'Lavender, Rosemary',
        baseNotes: 'Oakmoss, Patchouli',
        image: '/assets/perfumes/moonlit-sage.jpg',
        category: 'AROMATIC HERBAL',
        price: '₹1300'
      }
    ]
  }
];

const cinematicEase = [0.25, 1, 0.5, 1] as const;

const CollectionCarousel: React.FC<{ collection: typeof collectionsData[0] }> = ({ collection }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % collection.perfumes.length);
  }, [isAnimating, collection.perfumes.length]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + collection.perfumes.length) % collection.perfumes.length);
  }, [isAnimating, collection.perfumes.length]);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 900);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const getPosition = (index: number) => {
    if (index === activeIndex) return 'center';
    if (index === (activeIndex - 1 + collection.perfumes.length) % collection.perfumes.length) return 'left';
    if (index === (activeIndex + 1) % collection.perfumes.length) return 'right';
    return 'hidden';
  };

  const slideVariants = {
    center: {
      left: '20%',
      width: '60%',
      zIndex: 30,
      filter: 'brightness(1)',
      transition: { duration: 0.9, ease: cinematicEase }
    },
    left: {
      left: '0%',
      width: '20%',
      zIndex: 10,
      filter: 'brightness(0.35)',
      transition: { duration: 0.9, ease: cinematicEase }
    },
    right: {
      left: '80%',
      width: '20%',
      zIndex: 10,
      filter: 'brightness(0.35)',
      transition: { duration: 0.9, ease: cinematicEase }
    }
  };

  const textOverlayVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: cinematicEase, delay: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: cinematicEase } }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0a0a] border-b border-white/10">
      
      {/* Collection Title Overlay (Top Left) */}
      <div className="absolute top-12 left-12 z-40 pointer-events-none">
        <h2 className="text-[10px] tracking-[0.4em] uppercase text-white/50">{collection.name}</h2>
      </div>

      {collection.perfumes.map((perfume, index) => {
        const position = getPosition(index);
        const isCenter = position === 'center';
        
        return (
          <motion.div
            key={perfume.id}
            initial={false}
            animate={position}
            variants={slideVariants as any}
            className="absolute top-0 h-full border-r border-white/10 cursor-pointer overflow-hidden bg-black"
            onClick={() => {
              if (position === 'left') handlePrev();
              if (position === 'right') handleNext();
            }}
          >
            <div className="relative w-full h-full">
              <img 
                src={perfume.image} 
                alt={perfume.name} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Vignette shadow to blend edges and make text pop */}
              <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] pointer-events-none"></div>
              {/* Extra gradient at bottom for text readability */}
              <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
              
              {/* CENTER SLIDE CONTENT (Animated) */}
              <AnimatePresence>
                {isCenter && (
                  <motion.div 
                    key={`overlay-${perfume.id}`}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={textOverlayVariants}
                    className="absolute inset-0 pointer-events-none"
                  >
                    
                    {/* TOP RIGHT: Glassmorphism Info Panel */}
                    <div className="absolute top-[20%] right-[8%] md:right-[12%] flex flex-col items-end pointer-events-auto">
                      <div className="text-right mb-6">
                        <h2 className="serif text-4xl md:text-6xl tracking-widest text-[#f5f0eb] uppercase">{perfume.name}</h2>
                        <h3 className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#a89582] mt-2">{perfume.subtitle}</h3>
                      </div>

                      <div className="w-[300px] md:w-[360px] rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md p-6 shadow-2xl flex flex-col gap-6">
                        {/* Top Notes */}
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 mt-1 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-xs font-mono text-white/70">01</div>
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.15em] text-[#a89582] mb-1">Top Notes</p>
                            <p className="text-[#f5f0eb] text-sm font-light leading-relaxed">{perfume.topNotes}</p>
                          </div>
                        </div>
                        {/* Heart Notes */}
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 mt-1 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-xs font-mono text-white/70">02</div>
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.15em] text-[#a89582] mb-1">Heart Notes</p>
                            <p className="text-[#f5f0eb] text-sm font-light leading-relaxed">{perfume.heartNotes}</p>
                          </div>
                        </div>
                        {/* Base Notes */}
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 mt-1 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-xs font-mono text-white/70">03</div>
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.15em] text-[#a89582] mb-1">Base Notes</p>
                            <p className="text-[#f5f0eb] text-sm font-light leading-relaxed">{perfume.baseNotes}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* BOTTOM LEFT: Product Action */}
                    <div className="absolute bottom-[10%] left-[8%] md:left-[10%] flex flex-col items-start pointer-events-auto">
                      <div className="flex items-end gap-6 mb-2">
                        <h1 className="serif text-4xl md:text-5xl tracking-widest text-[#f5f0eb] uppercase">{perfume.name}</h1>
                        <button className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[#d4c6b3] hover:text-white border-b border-[#d4c6b3]/50 hover:border-white pb-1 transition-all mb-2">
                          ADD TO CART
                        </button>
                      </div>
                      <p className="text-xs md:text-sm tracking-[0.2em] text-white/70 font-light mb-8">
                        EAU DE PARFUM | 100ml | {perfume.price}
                      </p>
                      <button 
                        onClick={() => navigate(`/product/${perfume.id}`)}
                        className="px-8 py-3 rounded border border-white/40 text-[10px] md:text-xs tracking-[0.25em] uppercase text-white hover:bg-white hover:text-black transition-colors duration-500"
                      >
                        EXPLORE COLLECTION
                      </button>
                    </div>

                    {/* BOTTOM RIGHT: Navigation Controls */}
                    <div className="absolute bottom-[10%] right-[8%] md:right-[12%] flex items-center gap-6 pointer-events-auto">
                      <button 
                        onClick={handlePrev} 
                        className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-[#a89582] hover:text-white transition-colors flex items-center gap-2"
                      >
                        <span className="text-lg mb-1">&larr;</span> PREVIOUS SCENT
                      </button>
                      <span className="w-[1px] h-4 bg-white/20"></span>
                      <button 
                        onClick={handleNext} 
                        className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-[#a89582] hover:text-white transition-colors flex items-center gap-2"
                      >
                        NEXT SCENT <span className="text-lg mb-1">&rarr;</span>
                      </button>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

              {/* SIDE SLIDES CONTENT (Static) */}
              {!isCenter && (
                <div className="absolute bottom-[10%] inset-x-0 flex flex-col items-center justify-end text-center opacity-70 pointer-events-none">
                  <h3 className="serif text-2xl md:text-3xl tracking-widest text-[#f5f0eb] uppercase drop-shadow-md">{perfume.name}</h3>
                  <p className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-[#a89582] mt-2 drop-shadow-md">{perfume.category}</p>
                </div>
              )}

            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const Collections: React.FC = () => {
  return (
    <section id="collections" className="w-full bg-[#050505]">
      {collectionsData.map((collection) => (
        <CollectionCarousel key={collection.id} collection={collection} />
      ))}
    </section>
  );
};

export default Collections;
