import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Collections: React.FC = () => {
  const navigate = useNavigate();

  const collections = [
    { key: 'royalOud', name: 'Royal Oud', desc: 'Luxury woody fragrance', notes: 'Oud · Sandalwood · Cedar', price: '$420', image: '/assets/royal_oud.jpg' },
    { key: 'velvetAmber', name: 'Velvet Amber', desc: 'Warm amber fragrance', notes: 'Amber · Vanilla · Tonka', price: '$380', image: '/assets/velvet_amber.jpg' },
    { key: 'midnightNoir', name: 'Midnight Noir', desc: 'Intense masculine fragrance', notes: 'Leather · Tobacco · Smoke', price: '$450', image: '/assets/midnight_noir.jpg' },
    { key: 'whiteBloom', name: 'White Bloom', desc: 'Fresh floral fragrance', notes: 'Jasmine · Rose · Peony', price: '$340', image: '/assets/white_bloom.jpg' }
  ];

  return (
    <section className="py-32 relative bg-[var(--bg-ivory)]" id="collections">
      <div className="container mx-auto px-6 lg:px-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="eyebrow justify-center mb-6">Curated Selections</div>
          <h2 className="section-title serif text-[var(--text-main)]">
            Crafted for <span className="text-gold-italic">Every Mood</span>
          </h2>
          <div className="w-px h-16 bg-[var(--gold)] mx-auto mt-10"></div>
          <p className="max-w-xl mx-auto mt-10 text-[var(--text-muted)] text-sm tracking-wide">
            Four signature collections, each composed by master perfumers to evoke a distinct emotion and presence.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((c, i) => (
            <motion.article 
              key={c.key} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer block"
              onClick={() => navigate(`/product/${c.key}`)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[rgba(201,162,39,0.15)]">
                
                <div className="absolute top-6 left-6 z-10">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] font-medium bg-white/80 backdrop-blur-md px-3 py-1 rounded-full">
                    No. 0{i + 1}
                  </div>
                </div>

                <div className="relative h-[380px] w-full overflow-hidden p-6 flex items-center justify-center bg-gradient-to-b from-[#F9F9F9] to-white">
                  <motion.img 
                    src={c.image} 
                    alt={c.name} 
                    className="w-full h-full object-contain filter drop-shadow-xl transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>
                
                <div className="p-8 border-t border-[var(--border-dark)] bg-white relative">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(201, 162, 39, 0.05) 0%, transparent 100%)' }}></div>
                  <h3 className="serif text-3xl mb-2 text-center text-[var(--text-main)] relative z-10">{c.name}</h3>
                  <p className="text-xs text-center mb-4 text-[var(--text-muted)] relative z-10">{c.desc}</p>
                  <div className="text-[9px] tracking-[0.2em] uppercase text-center mb-6 text-[var(--text-muted)] opacity-70 relative z-10">{c.notes}</div>
                  
                  <div className="flex items-center justify-between pt-5 border-t border-[var(--border-gold)] relative z-10">
                    <span className="serif text-xl text-[var(--text-main)]">{c.price}</span>
                    <button className="text-[10px] tracking-[0.2em] uppercase flex items-center gap-2 text-[var(--gold)] hover:text-[var(--matte-black)] transition-colors">
                      Discover <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
