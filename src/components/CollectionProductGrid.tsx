import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Plus, ChevronDown } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const allProducts = [
  { key: 'velvet-oud', name: 'Velvet Oud', notes: 'WOODY • OUD • SPICY', category: 'Oud & Spice', price: 1500, image: '/assets/perfumes/velvet-oud.jpg' },
  { key: 'noir-amber', name: 'Noir Amber', notes: 'AMBER • SPICY • WARM', category: 'Warm & Spicy', price: 1380, image: '/assets/perfumes/noir-amber.jpg' },
  { key: 'santal-elan', name: 'Santal Élan', notes: 'WOODY • CREAMY • SOFT', category: 'Smoke & Vetiver', price: 1420, image: '/assets/perfumes/santal-elan.jpg' },
  { key: 'azure-mist', name: 'Azure Mist', notes: 'AQUATIC • FRESH • CLEAN', category: 'Fresh & Aquatic', price: 1350, image: '/assets/perfumes/azure-mist.jpg' },
  { key: 'citrus-veil', name: 'Citrus Veil', notes: 'CITRUS • FRESH • ENERGIZING', category: 'Fresh & Aquatic', price: 1320, image: '/assets/perfumes/citrus-veil.jpg' },
  { key: 'rose-nocturne', name: 'Rose Nocturne', notes: 'FLORAL • POWDERY • ELEGANT', category: 'Floral & Powdery', price: 1390, image: '/assets/perfumes/rose-nocturne.jpg' },
  { key: 'amber-solace', name: 'Amber Solace', notes: 'AMBER • VANILLA • WARM', category: 'Warm & Spicy', price: 1410, image: '/assets/perfumes/amber-solace.jpg' },
  { key: 'forest-whisper', name: 'Forest Whisper', notes: 'GREEN • WOODY • EARTHY', category: 'Woods & Earth', price: 1370, image: '/assets/perfumes/forest-whisper.jpg' },
  { key: 'midnight-bloom', name: 'Midnight Bloom', notes: 'FLORAL • MUSKY • SENSUAL', category: 'Floral & Powdery', price: 1460, image: '/assets/perfumes/midnight-bloom.jpg' },
  { key: 'blaze', name: 'Blaze', notes: 'SPICY • WOODY • BOLD', category: 'Warm & Spicy', price: 1440, image: '/assets/perfumes/blaze.jpg' },
  { key: 'moonlit-sage', name: 'Moonlit Sage', notes: 'HERBAL • AROMATIC • CALM', category: 'Fresh & Aquatic', price: 1340, image: '/assets/perfumes/moonlit-sage-fix.jpg' },
  { key: 'golden-haze', name: 'Golden Haze', notes: 'FLORAL • AMBER • RICH', category: 'Floral & Powdery', price: 1430, image: '/assets/perfumes/golden-haze-fix.jpg' },
];

const categories = ['All', 'Floral & Powdery', 'Smoke & Vetiver', 'Warm & Spicy', 'Oud & Spice', 'Fresh & Aquatic', 'Woods & Earth'];
const sortOptions = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Name: A to Z'];

const CollectionProductGrid: React.FC = () => {
  const navigate = useNavigate();
  const { cart, addToCart, toggleWishlist, isInWishlist } = useShop();
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Recommended');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...allProducts];
    
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    
    switch (sortBy) {
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Name: A to Z':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    
    return result;
  }, [activeCategory, sortBy]);

  return (
    <section id="collection-grid" className="py-24 relative bg-[var(--bg-ivory)] border-t border-[var(--border-dark)]">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="serif text-4xl md:text-5xl text-[var(--text-main)] mb-4">
              The <span className="text-[var(--gold)] italic">Collection</span>
            </h2>
            <p className="text-[var(--text-muted)] font-light leading-relaxed">
              Explore our masterfully blended fragrances. Each scent is a narrative, crafted with the finest ingredients to evoke emotion and memory.
            </p>
          </div>
          
          <div className="flex items-center gap-6 w-full md:w-auto overflow-x-auto pb-4 md:pb-0 scroll-hide">
            {/* Sort Dropdown */}
            <div className="relative shrink-0">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[var(--text-main)] border border-[var(--border-dark)] px-6 py-3 hover:border-[var(--gold)] transition-colors rounded-sm"
              >
                Sort: {sortBy} <ChevronDown size={14} className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isSortOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-white shadow-xl border border-[var(--border-dark)] z-50 rounded-sm overflow-hidden"
                  >
                    {sortOptions.map(option => (
                      <button
                        key={option}
                        onClick={() => { setSortBy(option); setIsSortOpen(false); }}
                        className={`w-full text-left px-6 py-3 text-[10px] uppercase tracking-widest hover:bg-[var(--bg-ivory)] transition-colors ${sortBy === option ? 'text-[var(--gold)] bg-[var(--bg-ivory)]' : 'text-[var(--text-main)]'}`}
                      >
                        {option}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-16 border-b border-[var(--border-dark)] pb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] uppercase tracking-[0.2em] px-5 py-2 rounded-full transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-[var(--matte-black)] text-white' 
                  : 'border border-[var(--border-dark)] text-[var(--text-muted)] hover:border-[var(--gold)] hover:text-[var(--gold)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          <AnimatePresence>
            {filteredAndSortedProducts.map((p) => (
              <motion.article 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={p.key}
                className="group cursor-pointer flex flex-col"
                onClick={() => navigate(`/product/${p.key}`)}
              >
                <div className="relative overflow-hidden mb-6 rounded-2xl bg-[var(--bg-ivory)] group-hover:shadow-2xl transition-all duration-500 h-[380px]">
                  {/* Actions overlay */}
                  <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <button 
                      onClick={(e) => handleAction(e, () => toggleWishlist(p as any))}
                      className={`w-10 h-10 rounded-full bg-[var(--bg-ivory)] flex items-center justify-center shadow-lg transition-colors ${isInWishlist(p.key) ? 'text-red-500' : 'text-[var(--matte-black)] hover:bg-[var(--gold)] hover:text-white'}`} 
                      aria-label="Add to wishlist"
                    >
                      <Heart size={16} fill={isInWishlist(p.key) ? "currentColor" : "none"} />
                    </button>
                    <button 
                      onClick={(e) => handleAction(e, () => navigate(`/product/${p.key}`))}
                      className="w-10 h-10 rounded-full bg-[var(--bg-ivory)] text-[var(--matte-black)] flex items-center justify-center shadow-lg hover:bg-[var(--gold)] hover:text-white transition-colors" 
                      aria-label="Quick view"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  {/* Image wrapper */}
                  <div className="h-full w-full flex items-center justify-center bg-gradient-to-t from-[rgba(201,162,39,0.05)] to-transparent relative">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/5 transition-opacity duration-500 z-10 pointer-events-none"></div>
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-full h-full object-cover filter drop-shadow-2xl transition-transform duration-700 ease-out group-hover:scale-105" 
                    />
                  </div>
                </div>
                
                <div className="px-2 flex-1 flex flex-col">
                  <h3 className="serif text-2xl mb-1 text-[var(--text-main)] group-hover:text-[var(--gold)] transition-colors">{p.name}</h3>
                  <p className="text-[10px] tracking-[0.2em] text-[var(--text-muted)] mb-4">{p.category}</p>
                  
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-[var(--border-dark)]">
                    <span className="serif text-xl text-[var(--text-main)] font-light">₹{p.price}</span>
                    <button 
                      disabled={cart.some(item => item.key === p.key)}
                      onClick={(e) => handleAction(e, () => addToCart(p as any))}
                      className={`text-[10px] uppercase tracking-widest font-medium px-4 py-2 rounded-sm transition-all duration-300 shadow-sm ${
                        cart.some(item => item.key === p.key) 
                          ? 'bg-green-700 text-white cursor-default opacity-90' 
                          : 'bg-[var(--gold)] text-white hover:brightness-110 hover:shadow-md'
                      }`}
                    >
                      {cart.some(item => item.key === p.key) ? 'Added ✓' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredAndSortedProducts.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-[var(--text-muted)] italic serif text-xl">No fragrances found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CollectionProductGrid;
