import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Plus } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const hardcodedProducts = [
  { key: 'velvet-oud', name: 'Velvet Oud', notes: 'WOODY • OUD • SPICY', price: 450, image: '/assets/perfumes/velvet-oud.jpg' },
  { key: 'noir-amber', name: 'Noir Amber', notes: 'AMBER • SPICY • WARM', price: 380, image: '/assets/perfumes/noir-amber.jpg' },
  { key: 'santal-elan', name: 'Santal Élan', notes: 'WOODY • CREAMY • SOFT', price: 420, image: '/assets/perfumes/santal-elan.jpg' },
  { key: 'azure-mist', name: 'Azure Mist', notes: 'AQUATIC • FRESH • CLEAN', price: 350, image: '/assets/perfumes/azure-mist.jpg' },
  { key: 'citrus-veil', name: 'Citrus Veil', notes: 'CITRUS • FRESH • ENERGIZING', price: 320, image: '/assets/perfumes/citrus-veil.jpg' },
  { key: 'rose-nocturne', name: 'Rose Nocturne', notes: 'FLORAL • POWDERY • ELEGANT', price: 390, image: '/assets/perfumes/rose-nocturne.jpg' },
  { key: 'amber-solace', name: 'Amber Solace', notes: 'AMBER • VANILLA • WARM', price: 410, image: '/assets/perfumes/amber-solace.jpg' },
  { key: 'forest-whisper', name: 'Forest Whisper', notes: 'GREEN • WOODY • EARTHY', price: 370, image: '/assets/perfumes/forest-whisper.jpg' },
  { key: 'midnight-bloom', name: 'Midnight Bloom', notes: 'FLORAL • MUSKY • SENSUAL', price: 460, image: '/assets/perfumes/midnight-bloom.jpg' },
  { key: 'blaze', name: 'Blaze', notes: 'SPICY • WOODY • BOLD', price: 440, image: '/assets/perfumes/blaze.jpg' },
  { key: 'moonlit-sage', name: 'Moonlit Sage', notes: 'HERBAL • AROMATIC • CALM', price: 340, image: '/assets/perfumes/moonlit-sage.jpg' },
  { key: 'golden-haze', name: 'Golden Haze', notes: 'FLORAL • AMBER • RICH', price: 430, image: '/assets/perfumes/golden-haze.jpg' },
  { key: 'crimson-touch', name: 'Crimson Touch', notes: 'FRUITY • FLORAL • SENSUAL', price: 360, image: '/assets/perfumes/crimson-touch.jpg' },
];

const ShopSection: React.FC = () => {
  const navigate = useNavigate();
  const { cart, addToCart, toggleWishlist, isInWishlist } = useShop();

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  return (
    <section id="fragrances" className="pt-0 pb-20 relative bg-[var(--bg-ivory)]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {hardcodedProducts.map((p, i) => (
            <motion.article 
              key={p.key}
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: (i % 4) * 0.1 }}
              whileHover={{ y: -5 }}
              className="product-card group cursor-pointer"
              onClick={() => navigate(`/product/${p.key}`)}
            >
              <div className="relative overflow-hidden mb-6 rounded-2xl bg-black group-hover:shadow-2xl transition-all duration-500" style={{ height: '360px' }}>
                
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
                <div className="h-full w-full relative">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                  />
                  {/* Subtle vignette for the cinematic images */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                </div>
              </div>
              
              <div className="px-2">
                <div className="flex items-center gap-1 mb-3 text-[var(--gold)] text-xs">
                  ★★★★★
                </div>
                <h3 className="serif text-2xl mb-1 text-[var(--text-main)] group-hover:text-[var(--gold)] transition-colors">{p.name}</h3>
                <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)] mb-3">AuraScents</div>
                <p className="text-xs mb-4 text-[var(--text-muted)] opacity-80">{p.notes}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-[var(--border-dark)]">
                  <span className="serif text-xl text-[var(--text-main)]">${p.price}</span>
                  <button 
                    disabled={cart.some(item => item.key === p.key)}
                    onClick={(e) => handleAction(e, () => addToCart(p as any))}
                    className={`text-[10px] uppercase tracking-widest font-medium border-b pb-1 transition-colors ${
                      cart.some(item => item.key === p.key) 
                        ? 'text-[var(--gold)] border-[var(--gold)] cursor-default' 
                        : 'border-[var(--matte-black)] hover:text-[var(--gold)] hover:border-[var(--gold)]'
                    }`}
                  >
                    {cart.some(item => item.key === p.key) ? 'Added ✓' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopSection;

