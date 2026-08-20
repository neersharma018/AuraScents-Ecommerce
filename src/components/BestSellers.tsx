import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Plus, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { supabase } from '../lib/supabaseClient';

const BestSellers: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { cart, addToCart, toggleWishlist, isInWishlist } = useShop();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchFeatured = async () => {
      const { data } = await supabase.from('products').select('*').eq('is_featured', true);
      if (data) {
        const uniqueProducts = Array.from(new Map(data.map(p => [p.id, p])).values()).slice(0, 4);
        setProducts(uniqueProducts);
      }
      setLoading(false);
    };
    fetchFeatured();
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
    }
  };

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  return (
    <section className="py-32 relative bg-white" id="bestsellers">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <div className="eyebrow mb-6">Most Coveted</div>
            <h2 className="section-title serif text-[var(--text-main)]">Best <span className="text-gold-italic">Sellers</span></h2>
          </div>
          <div className="flex gap-3 mt-6 md:mt-0">
            <button className="icon-btn hover:bg-[var(--gold)] hover:text-white" onClick={() => handleScroll('left')} aria-label="Previous">
              <ChevronLeft size={16} />
            </button>
            <button className="icon-btn hover:bg-[var(--gold)] hover:text-white" onClick={() => handleScroll('right')} aria-label="Next">
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-[var(--gold)] w-8 h-8" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center text-gray-500 py-12">No featured products at the moment.</div>
          ) : (
            <div 
              ref={scrollRef}
              className="flex gap-8 overflow-x-auto pb-12 scroll-hide snap-x snap-mandatory" 
              style={{ scrollBehavior: 'smooth' }}
            >
              {products.map((p, i) => (
              <motion.article 
                key={p.key} 
                whileHover={{ y: -5 }}
                className="product-card snap-start flex-shrink-0 w-[300px] md:w-[350px] group cursor-pointer block"
                onClick={() => navigate(`/product/${p.key}`)}
              >
                <div className="relative overflow-hidden mb-6 rounded-2xl bg-[var(--bg-ivory)] group-hover:shadow-2xl transition-all duration-500" style={{ height: '400px' }}>
                  
                  {/* Actions overlay */}
                  <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <button 
                      onClick={(e) => handleAction(e, () => toggleWishlist(p))}
                      className={`w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg transition-colors ${isInWishlist(p.key) ? 'text-red-500' : 'text-[var(--matte-black)] hover:bg-[var(--gold)] hover:text-white'}`} 
                      aria-label="Add to wishlist"
                    >
                      <Heart size={16} fill={isInWishlist(p.key) ? "currentColor" : "none"} />
                    </button>
                    <button 
                      onClick={(e) => handleAction(e, () => navigate(`/product/${p.key}`))}
                      className="w-10 h-10 rounded-full bg-white text-[var(--matte-black)] flex items-center justify-center shadow-lg hover:bg-[var(--gold)] hover:text-white transition-colors" 
                      aria-label="Quick view"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <div className="absolute top-6 left-6 z-10 text-[10px] tracking-[0.2em] uppercase text-[var(--gold)] bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                    No. 0{i + 1}
                  </div>
                  
                  {/* Image wrapper */}
                  <div className="h-full w-full flex items-center justify-center p-8 bg-gradient-to-t from-[rgba(201,162,39,0.05)] to-transparent relative">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/5 transition-opacity duration-500 z-10 pointer-events-none"></div>
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-700 ease-out group-hover:scale-105" 
                    />
                  </div>
                </div>
                
                <div className="px-2">
                  <div className="flex items-center gap-1 mb-3 text-[var(--gold)] text-xs">
                    ★★★★★
                  </div>
                  <h3 className="serif text-3xl mb-1 text-[var(--text-main)] group-hover:text-[var(--gold)] transition-colors">{p.name}</h3>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)] mb-4">AuraScents</div>
                  <p className="text-xs mb-5 text-[var(--text-muted)] opacity-80">{p.notes}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--border-dark)]">
                    <span className="serif text-2xl text-[var(--text-main)]">${p.price}</span>
                    <button 
                      disabled={cart.some(item => item.key === p.key)}
                      onClick={(e) => handleAction(e, () => addToCart(p))}
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
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default BestSellers;
