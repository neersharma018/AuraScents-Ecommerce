import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';

const Hero: React.FC = () => {
  const [heroData, setHeroData] = useState({
    title: 'Crafted To Become Your <br /> <span class="text-gold-italic">Signature</span>',
    subtitle: 'Discover handcrafted fragrances designed to leave an unforgettable impression. Every bottle is blended with rare ingredients and timeless craftsmanship.',
    button_text: 'Explore Collection',
    button_link: '/collections',
    background_image: '/assets/hero_bottle.jpg'
  });

  useEffect(() => {
    const fetchHero = async () => {
      const { data } = await supabase.from('home_section').select('*').eq('section_key', 'hero').single();
      if (data) {
        setHeroData({
          title: data.title,
          subtitle: data.subtitle,
          button_text: data.button_text,
          button_link: data.button_link === '#collections' ? '/collections' : data.button_link,
          background_image: data.background_image
        });
      }
    };
    fetchHero();
  }, []);

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center bg-[var(--bg-ivory)]" id="home">
      <div className="absolute inset-0 smoke-overlay"></div>
      
      {/* Decorative Brand Text */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:block z-10" 
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        <div className="text-[9px] tracking-[0.4em] uppercase text-[var(--gold)]">
          Maison de Parfum · Paris
        </div>
      </motion.div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[80vh]">
          
          {/* Text Content */}
          <div className="lg:col-span-6 z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="eyebrow mb-8"
            >
              Maison de Parfum
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="serif text-5xl md:text-7xl lg:text-[6rem] mb-8 text-[var(--text-main)]" 
              style={{ lineHeight: 0.95 }}
              dangerouslySetInnerHTML={{ __html: heroData.title }}
            />
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base md:text-lg max-w-md mb-10 text-[var(--text-muted)]"
            >
              {heroData.subtitle}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-5"
            >
              <button className="btn-gold" onClick={() => {
                if (heroData.button_link.startsWith('#')) {
                  document.getElementById(heroData.button_link.substring(1))?.scrollIntoView({behavior:'smooth'})
                } else {
                  window.location.href = heroData.button_link;
                }
              }}>
                {heroData.button_text}
              </button>
              <button className="btn-outline" onClick={() => document.getElementById('story')?.scrollIntoView({behavior:'smooth'})}>
                Discover Story
              </button>
            </motion.div>
          </div>
          
          {/* Hero Bottle Imagery */}
          <div className="lg:col-span-6 relative flex justify-center items-center mt-12 lg:mt-0 h-[600px]">
            {/* Ambient Background Glow */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute w-[500px] h-[500px] rounded-full" 
              style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.15) 0%, transparent 60%)' }}
            />
            
            {/* Cinematic Floating Particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-[var(--gold-light)] blur-[1px]"
                animate={{
                  y: [Math.random() * -100, Math.random() * -300],
                  x: Math.random() * 200 - 100,
                  opacity: [0, 0.6, 0]
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 2
                }}
                style={{ top: '80%', left: '50%' }}
              />
            ))}

            {/* Floating Image */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
              className="relative z-10 floating"
            >
              <div className="relative overflow-hidden rounded-[2rem] shadow-2xl bg-white" style={{ width: '400px', height: '540px' }}>
                <img src={heroData.background_image} alt="AuraScents Signature Perfume" className="w-full h-full object-cover" />
                
                {/* Inner glass reflection border */}
                <div className="absolute inset-0 border border-white/40 rounded-[2rem] pointer-events-none shadow-[inset_0_0_40px_rgba(255,255,255,0.2)]"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
