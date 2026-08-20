import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { Loader2 } from 'lucide-react';

const Collections: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      // Fetch categories
      const { data: catData } = await supabase.from('categories').select('*');
      
      if (catData) {
        // For each category, fetch some products to show as a preview
        const categoriesWithProducts = await Promise.all(
          catData.map(async (cat) => {
            const { data: prodData } = await supabase
              .from('products')
              .select('*')
              .eq('category_id', cat.id)
              .limit(3);
              
            const uniqueProducts = Array.from(
              new Map((prodData || []).map((p: any) => [p.id, p])).values()
            );
            
            return {
              ...cat,
              products: uniqueProducts
            };
          })
        );
        
        setCategories(categoriesWithProducts);
      }
      setLoading(false);
    };
    
    fetchCollections();
  }, []);

  return (
    <>
      <Helmet>
        <title>Collections | AuraScents</title>
      </Helmet>
      
      <main className="pt-32 pb-24 min-h-screen bg-[var(--bg-ivory)]">
        <div className="container mx-auto px-6 lg:px-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 max-w-2xl mx-auto"
          >
            <div className="eyebrow mb-6">Curated For You</div>
            <h1 className="serif text-5xl md:text-6xl mb-6 text-[var(--text-main)]">
              Our <span className="text-[var(--gold)] italic">Collections</span>
            </h1>
            <p className="text-gray-500">
              Discover our masterfully blended collections, each telling a unique olfactory story.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-[var(--gold)] w-8 h-8" />
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center text-gray-500 py-12">No collections found.</div>
          ) : (
            <div className="flex flex-col gap-24">
              {categories.map((category) => (
                <div key={category.id} className="relative">
                  <div className="flex justify-between items-end mb-8 border-b border-[var(--border-dark)] pb-4">
                    <div>
                      <h2 className="serif text-4xl text-[var(--text-main)] mb-2">{category.name}</h2>
                      <p className="text-sm text-gray-500">{category.description || 'Explore the collection'}</p>
                    </div>
                    <Link to={`/collections/${category.slug}`} className="text-[10px] uppercase tracking-widest font-bold text-[var(--gold)] hover:text-[var(--text-main)] transition-colors whitespace-nowrap">
                      View All
                    </Link>
                  </div>
                  
                  {category.products && category.products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {category.products.map((p: any, i: number) => (
                        <motion.article 
                          key={p.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          onClick={() => navigate(`/product/${p.key}`)}
                          className="group cursor-pointer flex flex-col"
                        >
                          <div className="bg-white rounded-xl overflow-hidden p-8 flex items-center justify-center h-80 mb-6 group-hover:shadow-xl transition-shadow duration-300">
                            <img src={p.image} alt={p.name} className="h-full w-full object-contain filter drop-shadow-lg group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="text-center">
                            <h3 className="serif text-2xl text-[var(--text-main)] group-hover:text-[var(--gold)] transition-colors">{p.name}</h3>
                            <p className="text-xs mt-2 text-gray-500">{p.notes}</p>
                          </div>
                        </motion.article>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-400 italic py-8">Products coming soon to this collection.</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Collections;
