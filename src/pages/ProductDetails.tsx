import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useShop } from '../context/ShopContext';
import { Heart, ArrowLeft, Plus, Minus } from 'lucide-react';

const productsData = {
  'royalOud': { key: 'royalOud', name: 'Royal Oud', notes: 'Oud · Sandalwood · Cedar', rating: 5.0, reviews: 187, price: 450, image: '/assets/royal_oud.jpg', desc: 'A majestic blend of the rarest agarwood sourced from deep forests, intertwined with warm sandalwood and cedar. A fragrance that commands attention without raising its voice. Long-lasting, potent, and utterly sophisticated.', longevity: '24+ Hours', sillage: 'Heavy', topNotes: 'Bergamot, Pink Pepper', heartNotes: 'Cedar, Angelica', baseNotes: 'Oud, Sandalwood, Musk' },
  'velvetAmber': { key: 'velvetAmber', name: 'Velvet Amber', notes: 'Amber · Vanilla · Tonka Bean', rating: 4.8, reviews: 312, price: 380, image: '/assets/velvet_amber.jpg', desc: 'An intimate, warm embrace. Fossilized amber melts into Madagascan vanilla and toasted tonka bean, creating an addictive, sensual aura that lingers elegantly on the skin.', longevity: '18+ Hours', sillage: 'Moderate', topNotes: 'Cardamom, Mandarin', heartNotes: 'Amber, Jasmine', baseNotes: 'Vanilla, Tonka Bean, Patchouli' },
  'midnightNoir': { key: 'midnightNoir', name: 'Midnight Noir', notes: 'Leather · Tobacco · Smoke', rating: 4.9, reviews: 248, price: 420, image: '/assets/midnight_noir.jpg', desc: 'Dark, mysterious, and intensely masculine. Rich Russian leather combined with sweet pipe tobacco and a whisper of smoke. The perfect companion for late nights and secrets.', longevity: '20+ Hours', sillage: 'Heavy', topNotes: 'Black Pepper, Saffron', heartNotes: 'Tobacco Leaf, Incense', baseNotes: 'Leather, Birch, Vetiver' },
  'whiteBloom': { key: 'whiteBloom', name: 'White Bloom', notes: 'Jasmine · Tuberose · Musk', rating: 4.8, reviews: 178, price: 360, image: '/assets/white_bloom.jpg', desc: 'A brilliant explosion of white flowers. Night-blooming jasmine and creamy tuberose rest on a clean, crystalline musk base. Fresh, radiant, and purely elegant.', longevity: '14+ Hours', sillage: 'Moderate', topNotes: 'Orange Blossom, Pear', heartNotes: 'Jasmine Sambac, Tuberose', baseNotes: 'White Musk, Cedarwood' },
  'oceanMist': { key: 'oceanMist', name: 'Ocean Mist', notes: 'Sea Salt · Bergamot · Driftwood', rating: 4.7, reviews: 156, price: 340, image: '/assets/ocean_mist.jpg', desc: 'The bracing freshness of a coastal morning. Sea salt spray mingles with sparkling bergamot and sun-bleached driftwood for an invigorating, clean finish.', longevity: '12+ Hours', sillage: 'Moderate', topNotes: 'Sea Salt, Bergamot, Lemon', heartNotes: 'Seaweed, Sage', baseNotes: 'Driftwood, Ambergris' },
  'goldenBloom': { key: 'goldenBloom', name: 'Signature Gold', notes: 'Saffron · Rose · Patchouli', rating: 4.9, reviews: 203, price: 395, image: '/assets/hero_bottle.jpg', desc: 'Our signature masterpiece. The world\'s most expensive saffron meets velvety Damask rose and rich patchouli in a bottle of pure liquid gold.', longevity: '24+ Hours', sillage: 'Heavy', topNotes: 'Saffron, Blackcurrant', heartNotes: 'Damask Rose, Iris', baseNotes: 'Patchouli, Vanilla, Amber' },
};

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [quantity, setQuantity] = React.useState(1);
  
  const product = id && productsData[id as keyof typeof productsData] ? productsData[id as keyof typeof productsData] : null;

  if (!product) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center bg-[var(--bg-ivory)]">
        <div className="text-center">
          <h2 className="serif text-4xl mb-4 text-[var(--text-main)]">Fragrance Not Found</h2>
          <Link to="/" className="text-sm uppercase tracking-widest border-b border-black pb-1 hover:text-[var(--gold)] transition-colors">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.name} | AuraScents</title>
        <meta name="description" content={product.desc} />
      </Helmet>
      
      <section className="pt-32 pb-24 bg-[var(--bg-ivory)] min-h-screen">
        <div className="container mx-auto px-6 lg:px-12">
          
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors">
              <ArrowLeft size={16} /> Back to Collection
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Image Gallery */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="sticky top-32 bg-white rounded-3xl p-12 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(201,162,39,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-auto object-contain max-h-[600px] drop-shadow-2xl transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-8 right-8 w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-lg transition-colors z-10 ${isInWishlist(product.key) ? 'text-red-500' : 'text-[var(--matte-black)] hover:bg-[var(--gold)] hover:text-white'}`}
                >
                  <Heart size={20} fill={isInWishlist(product.key) ? "currentColor" : "none"} />
                </button>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="py-10"
            >
              <div className="flex items-center gap-2 text-[var(--gold)] text-sm mb-4">
                ★★★★★ <span className="text-[var(--text-muted)] text-xs tracking-widest ml-2">({product.reviews} REVIEWS)</span>
              </div>
              <h1 className="serif text-5xl md:text-6xl text-[var(--text-main)] mb-2">{product.name}</h1>
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--gold)] mb-8">Extrait de Parfum · 100ML</p>
              
              <div className="serif text-3xl text-[var(--text-main)] mb-8">${product.price}</div>
              
              <p className="text-[var(--text-muted)] leading-relaxed mb-10 max-w-lg">
                {product.desc}
              </p>

              {/* Add to Cart Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 py-8 border-y border-[var(--border-dark)]">
                <div className="flex items-center border border-[var(--matte-black)] rounded-full px-4 h-14 w-full sm:w-auto">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:text-[var(--gold)] transition-colors"><Minus size={16} /></button>
                  <span className="w-12 text-center text-sm">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:text-[var(--gold)] transition-colors"><Plus size={16} /></button>
                </div>
                <button 
                  onClick={() => addToCart(product, quantity)}
                  className="w-full h-14 bg-[var(--matte-black)] text-white uppercase tracking-widest text-sm rounded-full hover:bg-[var(--gold)] transition-colors"
                >
                  Add to Cart
                </button>
              </div>

              {/* Fragrance Details */}
              <div className="space-y-8">
                <div>
                  <h3 className="eyebrow mb-4">Olfactory Notes</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-[var(--text-muted)] uppercase tracking-widest text-xs">Top</span>
                      <span className="text-[var(--text-main)]">{product.topNotes}</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-[var(--text-muted)] uppercase tracking-widest text-xs">Heart</span>
                      <span className="text-[var(--text-main)]">{product.heartNotes}</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-[var(--text-muted)] uppercase tracking-widest text-xs">Base</span>
                      <span className="text-[var(--text-main)]">{product.baseNotes}</span>
                    </li>
                  </ul>
                </div>
                
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="eyebrow mb-2">Longevity</h3>
                    <p className="text-[var(--text-main)]">{product.longevity}</p>
                  </div>
                  <div>
                    <h3 className="eyebrow mb-2">Sillage</h3>
                    <p className="text-[var(--text-main)]">{product.sillage}</p>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
