import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles, Droplets, Globe, Award } from 'lucide-react';

const About: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const scale = useTransform(scrollYProgress, [0.1, 0.5], [0.95, 1]);

  const storyMilestones = [
    {
      year: '1848',
      title: 'THE GRASSE LEGACY',
      tagline: 'Sourced from the Fragrance Capital of the World',
      desc: 'Our story begins in the sun-drenched hills of Grasse, France. For generations, master perfumers crafted bespoke scents using traditional copper stills and hand-picked Damask roses.',
      image: '/assets/about_atelier.jpg',
      badge: 'Grasse Atelier'
    },
    {
      year: '1920',
      title: 'THE ART OF ALCHEMY',
      tagline: 'Raw Botanical Craftsmanship',
      desc: 'Rare agarwood resins, night-blooming sambac jasmine, and fossilized amber are slowly macerated in dark glass demijohns for up to six months to reach maximum olfactory depth.',
      image: '/assets/ingredient_oud.jpg',
      badge: 'Demijohn Maceration'
    },
    {
      year: '2026',
      title: 'MAISON AURASCENTS',
      tagline: 'Modern High Luxury Reimagined',
      desc: 'Today, AuraScents fuses time-honored French perfumery with modern minimalist aesthetic. Every flacon is an architectural masterpiece housing liquid gold.',
      image: '/assets/le_labo_hero.jpg',
      badge: 'Maison Standard'
    }
  ];

  return (
    <section className="py-32 relative bg-[var(--bg-ivory)] overflow-hidden" id="about" ref={containerRef}>
      
      {/* Background Decorative Ambiance */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[var(--gold)]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[var(--gold)]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* 1. SECTION HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="eyebrow justify-center mb-4">HERITAGE & ALCHEMY</div>
          <h2 className="section-title serif text-4xl sm:text-5xl lg:text-6xl text-[var(--text-main)] mb-6">
            The Art of <span className="text-gold-italic">French Perfumery</span>
          </h2>
          <p className="text-base md:text-lg text-[var(--text-muted)] font-light leading-relaxed">
            At AuraScents, we believe a fragrance is more than a scent — it is an invisible signature that lingers long after you leave the room.
          </p>
        </motion.div>

        {/* 2. MAIN VISUAL GRID STORYTELLING (DUAL SCROLL IMAGES) */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-32">
          
          {/* Left Large Interactive Image Frame (7 cols) */}
          <motion.div 
            style={{ scale }}
            className="lg:col-span-7 relative h-[500px] sm:h-[650px] rounded-3xl overflow-hidden shadow-2xl group border border-white/40"
          >
            <motion.div style={{ y: parallaxY1 }} className="absolute inset-0 w-full h-[125%] -top-[12%]">
              <img 
                src="/assets/about_atelier.jpg" 
                alt="AuraScents Master Perfumer Atelier" 
                className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.05] transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </motion.div>
            
            {/* Floating Glass Box Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute bottom-8 left-8 right-8 md:right-auto md:max-w-sm bg-white/75 backdrop-blur-md p-6 rounded-2xl border border-white shadow-xl text-[var(--matte-black)]"
            >
              <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[var(--gold)] font-bold mb-1">
                <Sparkles size={12} /> LES ATELIERS DE GRASSE
              </div>
              <h3 className="serif text-2xl text-[var(--text-main)] mb-1">Hand-Blended Essence</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Formulated in limited small batches by master noses in Grasse, France.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Text & Sub-image Showcase (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 text-[var(--text-muted)] text-base leading-relaxed"
            >
              <span className="eyebrow block">OUR PHILOSOPHY</span>
              <h3 className="serif text-3xl sm:text-4xl text-[var(--text-main)] leading-snug">
                Where Botanical Rarity Meets <span className="text-gold-italic">Modern Art</span>
              </h3>
              <p>
                Every drop of AuraScents perfume is crafted using imported cold-pressed essential oils, rare flower extracts, and aged woods sourced sustainably across four continents.
              </p>
            </motion.div>

            {/* Small Floating Parallax Secondary Image */}
            <motion.div 
              style={{ y: parallaxY2 }}
              className="relative h-64 rounded-2xl overflow-hidden shadow-xl border border-white/50 group"
            >
              <img 
                src="/assets/ingredient_rose.jpg" 
                alt="Damask Rose Extract" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white text-xs font-mono tracking-widest uppercase flex items-center gap-2">
                <Droplets size={14} className="text-[var(--gold)]" /> 100% Pure Botanical Oils
              </div>
            </motion.div>

            {/* CTA to Dedicated About Page */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-4"
            >
              <button 
                onClick={() => {
                  navigate('/about');
                  window.scrollTo(0, 0);
                }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--matte-black)] text-white uppercase tracking-[0.25em] text-xs rounded-full hover:bg-[var(--gold)] transition-all duration-300 shadow-md group"
              >
                EXPLORE FULL STORY <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

        </div>

        {/* 3. EDITORIAL CHAPTER SCROLL TIMELINE */}
        <div className="mb-32">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="eyebrow justify-center mb-2">CHRONICLES OF LUXURY</span>
            <h3 className="serif text-3xl md:text-4xl text-[var(--text-main)]">The Story in 3 Chapters</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {storyMilestones.map((item, index) => (
              <motion.div 
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col justify-between"
              >
                <div>
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <span className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-widest text-[var(--matte-black)] font-bold">
                      {item.badge}
                    </span>
                    <span className="absolute bottom-4 right-4 serif text-4xl text-[var(--gold)] font-light">
                      {item.year}
                    </span>
                  </div>

                  <div className="p-8">
                    <h4 className="serif text-xl text-[var(--text-main)] mb-2 font-medium">{item.title}</h4>
                    <p className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-semibold mb-4">{item.tagline}</p>
                    <p className="text-sm text-[var(--text-muted)] font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="px-8 pb-8">
                  <div className="h-[1px] w-full bg-gray-100 mb-4"></div>
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">CHAPTER 0{index + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4. BRAND STATISTICAL HIGHLIGHTS BAR */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl p-10 md:p-12 border border-black/5 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { label: 'French Origin', value: 'Grasse', icon: <Globe className="w-5 h-5 mx-auto text-[var(--gold)] mb-2" /> },
            { label: 'Master Patrons', value: '100K+', icon: <Award className="w-5 h-5 mx-auto text-[var(--gold)] mb-2" /> },
            { label: 'Global Boutiques', value: '40+', icon: <Compass className="w-5 h-5 mx-auto text-[var(--gold)] mb-2" /> },
            { label: 'Olfactory Excellence', value: '98%', icon: <Sparkles className="w-5 h-5 mx-auto text-[var(--gold)] mb-2" /> }
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              {stat.icon}
              <div className="serif text-3xl md:text-5xl text-[var(--text-main)] mb-1 font-light">{stat.value}</div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)] font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default About;
