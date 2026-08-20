import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Heart, Plus, Loader2, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useShop } from '../context/ShopContext';

const CollectionDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { cart, addToCart, toggleWishlist, isInWishlist } = useShop();
  
  const [collection, setCollection] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollectionData = async () => {
      setLoading(true);
      
      // 1. Fetch category details
      const { data: categoryData, error: catError } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .single();
        
      if (catError || !categoryData) {
        navigate('/collections'); // Redirect if not found
        return;
      }
      
      setCollection(categoryData);

      // 2. Fetch products for this category
      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .eq('category_id', categoryData.id);
        
      // Deduplicate products based on ID (to fulfill uniqueness requirement)
      if (productsData) {
        const uniqueProducts = Array.from(new Map(productsData.map(p => [p.id, p])).values());
        setProducts(uniqueProducts);
      }
      
      setLoading(false);
    };

    if (slug) {
      fetchCollectionData();
    }
  }, [slug, navigate]);

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  // Determine styling based on collection slug for a premium feel
  const isPrivateBlend = slug === 'private-blend';
  const heroBg = isPrivateBlend ? 'bg-[var(--matte-black)] text-white' : 'bg-white text-[var(--text-main)]';
  const accentColor = isPrivateBlend ? 'text-[var(--gold)]' : 'text-[var(--gold)]';

  if (loading) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-[var(--bg-ivory)] flex justify-center items-center">
        <Loader2 className="animate-spin text-[var(--gold)] w-8 h-8" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{collection?.name || 'Collection'} | AuraScents</title>
        <meta name="description" content={`Explore the ${collection?.name} by AuraScents.`} />
      </Helmet>
      
      <main className="pt-24 min-h-screen bg-[var(--bg-ivory)]">
        {/* Collection Hero */}
        <section className={`py-20 px-6 lg:px-12 ${heroBg} transition-colors duration-500`}>
          <div className="container mx-auto max-w-4xl text-center">
            <button 
              onClick={() => navigate('/collections')}
              className={`flex items-center gap-2 mx-auto mb-8 text-sm uppercase tracking-widest hover:${accentColor} transition-colors opacity-70`}
            >
              <ArrowLeft size={16} /> Back to Collections
            </button>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="eyebrow mb-4 opacity-80">Curated Selection</div>
              <h1 className="serif text-5xl md:text-7xl mb-6">{collection?.name}</h1>
              <p className={`text-lg md:text-xl opacity-70 max-w-2xl mx-auto ${isPrivateBlend ? 'text-gray-300' : 'text-gray-600'}`}>
                {collection?.description || (isPrivateBlend 
                  ? 'Rare compositions crafted for those who prefer to leave an impression.' 
                  : 'Our timeless flagship fragrances, masterfully blended for the modern aesthete.')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-24 px-6 lg:px-12">
          <div className="container mx-auto">
            {products.length === 0 ? (
              <div className="text-center py-20 max-w-md mx-auto">
                <h3 className="serif text-3xl mb-4 text-[var(--text-main)]">Collection Empty</h3>
                <p className="text-gray-500 mb-8">New compositions are being prepared for this collection.</p>
                <button 
                  onClick={() => navigate('/shop')}
                  className="btn-gold"
                >
                  Explore All Perfumes
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                {products.map((p, i) => (
                  <motion.article 
                    key={p.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
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
                      <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)] mb-3">
                        {isPrivateBlend ? 'Private Blend' : 'Signature Collection'}
                      </div>
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
        </section>
      </main>
    </>
  );
};

export default CollectionDetails;
