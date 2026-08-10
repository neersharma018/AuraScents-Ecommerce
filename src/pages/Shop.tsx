import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Heart, Plus, Loader2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { supabase } from '../lib/supabaseClient';

const Shop: React.FC = () => {
  const navigate = useNavigate();
  const { cart, addToCart, toggleWishlist, isInWishlist } = useShop();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    };
    fetchAllProducts();
  }, []);

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  return (
    <>
      <Helmet>
        <title>Shop | AuraScents</title>
        <meta name="description" content="Discover our entire collection of artisanal fragrances, meticulously blended for the modern connoisseur." />
      </Helmet>
      
      <main className="pt-32 pb-24 min-h-screen bg-[var(--bg-ivory)]">
        <div className="container mx-auto px-6 lg:px-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 max-w-2xl mx-auto"
          >
            <div className="eyebrow mb-6">Our Collection</div>
            <h1 className="serif text-5xl md:text-6xl mb-6 text-[var(--text-main)]">
              All <span className="text-[var(--gold)] italic">Fragrances</span>
            </h1>
            <p className="text-gray-500">
              Explore our complete range of signature scents, from warm ambers to fresh florals. Every bottle is a masterpiece.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-[var(--gold)] w-8 h-8" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center text-gray-500 py-12">No products found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {products.map((p, i) => (
                <motion.article 
                  key={p.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: (i % 4) * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="product-card group cursor-pointer"
                  onClick={() => navigate(`/product/${p.key}`)}
                >
                  <div className="relative overflow-hidden mb-6 rounded-2xl bg-white group-hover:shadow-2xl transition-all duration-500" style={{ height: '360px' }}>
                    
                    {/* Actions overlay */}
                    <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                      <button 
                        onClick={(e) => handleAction(e, () => toggleWishlist(p))}
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
                    <div className="h-full w-full flex items-center justify-center p-8 bg-gradient-to-t from-[rgba(201,162,39,0.02)] to-transparent relative">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/5 transition-opacity duration-500 z-10 pointer-events-none"></div>
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="w-full h-full object-contain filter drop-shadow-xl transition-transform duration-700 ease-out group-hover:scale-105" 
                      />
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
        </div>
      </main>
    </>
  );
};

export default Shop;
