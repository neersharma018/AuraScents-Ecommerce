import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const collections = [
  {
    id: 'oud-woods',
    name: 'Oud & Woods',
    description: 'Deep. Rich. Timeless.',
    perfumes: [
      { key: 'velvet-oud', name: 'Velvet Oud', notes: 'WOODY • OUD • SPICY', price: 450, image: '/assets/perfumes/velvet-oud.jpg' },
      { key: 'noir-amber', name: 'Noir Amber', notes: 'AMBER • SPICY • WARM', price: 380, image: '/assets/perfumes/noir-amber.jpg' },
      { key: 'santal-elan', name: 'Santal Élan', notes: 'WOODY • CREAMY • SOFT', price: 420, image: '/assets/perfumes/santal-elan.jpg' },
      { key: 'forest-whisper', name: 'Forest Whisper', notes: 'GREEN • WOODY • EARTHY', price: 370, image: '/assets/perfumes/forest-whisper.jpg' },
      { key: 'blaze', name: 'Blaze', notes: 'SPICY • WOODY • BOLD', price: 440, image: '/assets/perfumes/blaze.jpg' },
      { key: 'amber-solace', name: 'Amber Solace', notes: 'AMBER • VANILLA • WARM', price: 410, image: '/assets/perfumes/amber-solace.jpg' },
    ]
  },
  {
    id: 'floral-elan',
    name: 'Floral Élan',
    description: 'Soft. Elegant. Enchanting.',
    perfumes: [
      { key: 'rose-nocturne', name: 'Rose Nocturne', notes: 'FLORAL • POWDERY • ELEGANT', price: 390, image: '/assets/perfumes/rose-nocturne.jpg' },
      { key: 'midnight-bloom', name: 'Midnight Bloom', notes: 'FLORAL • MUSKY • SENSUAL', price: 460, image: '/assets/perfumes/midnight-bloom.jpg' },
      { key: 'golden-haze', name: 'Golden Haze', notes: 'FLORAL • AMBER • RICH', price: 430, image: '/assets/perfumes/golden-haze-fix.jpg' },
    ]
  },
  {
    id: 'fresh-citrus',
    name: 'Fresh & Citrus',
    description: 'Clean. Uplifting. Energizing.',
    perfumes: [
      { key: 'azure-mist', name: 'Azure Mist', notes: 'AQUATIC • FRESH • CLEAN', price: 350, image: '/assets/perfumes/azure-mist.jpg' },
      { key: 'citrus-veil', name: 'Citrus Veil', notes: 'CITRUS • FRESH • ENERGIZING', price: 320, image: '/assets/perfumes/citrus-veil.jpg' },
      { key: 'moonlit-sage', name: 'Moonlit Sage', notes: 'HERBAL • AROMATIC • CALM', price: 340, image: '/assets/perfumes/moonlit-sage-fix.jpg' },
    ]
  }
];

const CollectionCarousel = ({ collection }: { collection: typeof collections[0] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative mb-24 last:mb-0">
      <div className="flex flex-col items-center mb-10">
        <h3 className="serif text-5xl text-[var(--text-main)] mb-3">{collection.name}</h3>
        <p className="text-sm tracking-widest uppercase text-gray-500">{collection.description}</p>
      </div>
      
      <div className="relative group">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white hover:text-[var(--gold)]"
        >
          <ChevronLeft size={24} strokeWidth={1} />
        </button>
        
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-8 px-6 lg:px-12 py-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {collection.perfumes.map((p) => (
            <motion.div 
              key={p.key}
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/product/${p.key}`)}
              className="snap-center flex-none w-[280px] md:w-[320px] cursor-pointer"
            >
              <div className="bg-white rounded-xl overflow-hidden h-[400px] relative mb-6 shadow-md hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 z-10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105" 
                />
              </div>
              <div className="text-center px-4">
                <h4 className="serif text-2xl text-[var(--text-main)] transition-colors hover:text-[var(--gold)]">{p.name}</h4>
                <p className="text-[10px] tracking-widest uppercase text-[var(--text-muted)] mt-2">{p.notes}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white hover:text-[var(--gold)]"
        >
          <ChevronRight size={24} strokeWidth={1} />
        </button>
      </div>
    </div>
  );
};

const Collections: React.FC = () => {
  return (
    <section className="py-20 relative bg-[var(--bg-ivory)]" id="collections">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 px-6"
        >
          <div className="eyebrow justify-center mb-4 text-gray-500">The Collections</div>
          <h2 className="section-title serif text-[var(--text-main)]">
            A Wardrobe of <span className="text-gold-italic">Memory.</span>
          </h2>
          <div className="w-px h-16 bg-[var(--gold)] mx-auto mt-6"></div>
        </motion.div>
        
        <div className="w-full">
          {collections.map((collection) => (
            <CollectionCarousel key={collection.id} collection={collection} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
