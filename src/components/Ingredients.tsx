import React from 'react';
import { motion } from 'framer-motion';

const Ingredients: React.FC = () => {
  return (
    <section className="py-24 bg-[#111111] text-[#f5f0eb] relative overflow-hidden" id="ingredients">
      
      {/* Soft Ambient Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,39,0.06),transparent_50%)] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="eyebrow justify-center mb-4">OLFACTORY ARCHITECTURE</div>
          <h2 className="section-title serif text-white">
            The Anatomy of <span className="text-gold-italic">Scent</span>
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-sm text-[var(--text-muted)] font-light leading-relaxed">
            Crafted with rare raw botanicals and essential oils to create a layered, evolving fragrance profile.
          </p>
        </motion.div>

        {/* Hero Banner: Perfume & Botanical Art */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative w-full h-[450px] md:h-[600px] overflow-hidden rounded-2xl shadow-2xl mb-8 bg-[#181818] group"
        >
          <img 
            src="/assets/le_labo_hero.jpg" 
            alt="AuraScents Midnight Bloom Olfactory Art" 
            className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.05] transition-transform duration-1000 group-hover:scale-105"
          />
          
          {/* Subtle Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          {/* Minimal Glass Badge Overlay */}
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-left text-white bg-black/50 backdrop-blur-md px-8 py-5 rounded-xl border border-white/10 shadow-2xl">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] font-bold block mb-1">
              AURASCENTS MAISON
            </span>
            <h3 className="serif text-3xl md:text-5xl font-normal tracking-wide text-white">
              MIDNIGHT BLOOM
            </h3>
            <p className="text-[11px] tracking-[0.2em] text-white/70 font-mono mt-2">
              EAU DE PARFUM — 50ml e 1.7 FL.OZ.
            </p>
          </div>
        </motion.div>

        {/* Middle Banner: Botanical Laydown */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="w-full h-[200px] md:h-[280px] overflow-hidden rounded-2xl bg-[#161616] shadow-xl mb-16 relative border border-white/5"
        >
          <img 
            src="/assets/notes_flatlay.jpg" 
            alt="Raw Fragrance Ingredients" 
            className="w-full h-full object-cover object-center opacity-90 contrast-[1.02]"
          />
        </motion.div>

        {/* Bottom Section: 3-Column Olfactory Pyramids in Pure English */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {/* Top Notes */}
          <div className="bg-[#181818] p-8 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-[var(--gold)]/30 transition-colors duration-500">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 bg-[var(--gold)] rounded-full"></span>
                <h4 className="text-xs tracking-[0.25em] uppercase font-bold text-white">
                  TOP NOTES
                </h4>
              </div>
              <div className="h-[1px] w-full bg-white/10 mb-6"></div>
              <ul className="space-y-3 text-sm text-gray-300 font-light tracking-wide">
                <li className="flex items-center gap-2">
                  <span className="text-xs text-[var(--gold)]">•</span> Wild Juniper
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-xs text-[var(--gold)]">•</span> Crushed Juniper Berries
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-xs text-[var(--gold)]">•</span> Calabrian Bergamot
                </li>
              </ul>
            </div>
            <span className="text-[10px] tracking-widest text-[var(--text-muted)] uppercase mt-8 block">INITIAL IMPRESSION</span>
          </div>

          {/* Heart Notes */}
          <div className="bg-[#181818] p-8 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-[var(--gold)]/30 transition-colors duration-500">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 bg-[var(--gold)] rounded-full"></span>
                <h4 className="text-xs tracking-[0.25em] uppercase font-bold text-white">
                  HEART NOTES
                </h4>
              </div>
              <div className="h-[1px] w-full bg-white/10 mb-6"></div>
              <ul className="space-y-3 text-sm text-gray-300 font-light tracking-wide">
                <li className="flex items-center gap-2">
                  <span className="text-xs text-[var(--gold)]">•</span> Lush Fig Leaf
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-xs text-[var(--gold)]">•</span> Fresh Green Botanical Accord
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-xs text-[var(--gold)]">•</span> Night-Blooming Neroli
                </li>
              </ul>
            </div>
            <span className="text-[10px] tracking-widest text-[var(--text-muted)] uppercase mt-8 block">THE HEART & SOUL</span>
          </div>

          {/* Base Notes */}
          <div className="bg-[#181818] p-8 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-[var(--gold)]/30 transition-colors duration-500">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 bg-[var(--gold)] rounded-full"></span>
                <h4 className="text-xs tracking-[0.25em] uppercase font-bold text-white">
                  BASE NOTES
                </h4>
              </div>
              <div className="h-[1px] w-full bg-white/10 mb-6"></div>
              <ul className="space-y-3 text-sm text-gray-300 font-light tracking-wide">
                <li className="flex items-center gap-2">
                  <span className="text-xs text-[var(--gold)]">•</span> Indonesian Patchouli
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-xs text-[var(--gold)]">•</span> Smoky Haitian Vetiver
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-xs text-[var(--gold)]">•</span> Warm Ambroxan
                </li>
              </ul>
            </div>
            <span className="text-[10px] tracking-widest text-[var(--text-muted)] uppercase mt-8 block">LONG-LASTING TRAIL</span>
          </div>
        </motion.div>

        {/* Footer Tagline */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-[11px] text-[var(--text-muted)] tracking-widest font-mono uppercase">
          <span>EAU DE PARFUM / NATURAL SPRAY</span>
          <span className="mt-2 md:mt-0 text-[var(--gold)]">COMPOUNDED IN OUR LAB — 50ML e 1.7 FL.OZ.</span>
        </div>

      </div>
    </section>
  );
};

export default Ingredients;
