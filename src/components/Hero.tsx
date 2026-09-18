import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [heroData, setHeroData] = useState({
    background_image: '/assets/hero_bottle.jpg'
  });

  useEffect(() => {
    const fetchHero = async () => {
      const { data } = await supabase.from('home_section').select('*').eq('section_key', 'hero').single();
      if (data && data.background_image) {
        setHeroData({
          background_image: data.background_image
        });
      }
    };
    fetchHero();
  }, []);

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex flex-col justify-center" id="home">
      {/* Composited Background & Bottle */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh]">
          {/* Base Background (Empty Room) */}
          <img 
            src="/assets/hero-bg-empty.jpg" 
            className="absolute inset-0 w-full h-full object-cover" 
            alt="Cinematic Background" 
          />
          
          {/* Floating Perfume Bottle Synced to Background */}
          <motion.img 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
            src="/assets/hero-bottle.png" 
            alt="Velvet Oud Perfume" 
            className="absolute drop-shadow-2xl"
            style={{
              width: '21%',      /* Scaled to match the mockup */
              top: '23%',        /* Positioned vertically on the rock */
              left: '54.5%',     /* Positioned horizontally on the rock */
            }}
          />
        </div>
      </div>
      
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex-grow flex flex-col justify-center">
        
        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row justify-between items-center w-full mt-20">
          
          {/* Left Text Content */}
          <div className="w-full lg:w-1/2 text-[var(--bg-ivory)]">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[11px] tracking-[0.3em] uppercase text-white/70 mb-8"
            >
              EAU DE PARFUM
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="serif text-5xl md:text-7xl lg:text-[5.5rem] mb-6 text-white leading-[1.1]" 
            >
              More Than <br/>
              Just a <span className="italic font-light">Scent.</span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-sm tracking-[0.2em] uppercase text-white/80 mb-10"
            >
              IT'S AN EXPERIENCE.
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base text-white/70 font-light max-w-md leading-relaxed mb-12"
            >
              At AuraScents, we craft more than perfumes.<br/>
              We create emotions, memories and a signature<br/>
              that stays with you — long after the moment fades.
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <button 
                onClick={() => document.getElementById('fragrances')?.scrollIntoView({behavior:'smooth'})}
                className="group flex items-center gap-4 text-xs tracking-[0.2em] uppercase text-white hover:text-[var(--gold)] transition-colors pb-2 border-b border-white/30 hover:border-[var(--gold)]"
              >
                DISCOVER THE SCENT
                <ArrowRight size={16} className="transform group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </motion.div>
          </div>
          
          {/* Right Stepper */}
          <div className="hidden lg:flex flex-col gap-12 mt-20 lg:mt-0 text-[var(--bg-ivory)]">
            {[
              { num: '01', title: 'Top Notes', val: 'Bergamot' },
              { num: '02', title: 'Heart Notes', val: 'Jasmine' },
              { num: '03', title: 'Base Notes', val: 'Sandalwood' }
            ].map((step, idx, arr) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 + (idx * 0.2) }}
                className="relative flex items-center gap-6"
              >
                <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-xs font-light">
                  {step.num}
                </div>
                
                {/* Vertical connecting line */}
                {idx !== arr.length - 1 && (
                  <div className="absolute left-5 top-10 w-px h-12 bg-white/20"></div>
                )}
                
                <div>
                  <div className="text-[10px] text-white/50 tracking-[0.1em] mb-1">{step.title}</div>
                  <div className="serif text-lg tracking-wide text-white/90">{step.val}</div>
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
      
      {/* Bottom Notes Row */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="container mx-auto px-6 lg:px-12 relative z-10 pb-8 mt-auto"
      >
        <div className="flex flex-wrap items-center gap-x-12 gap-y-6 text-[var(--bg-ivory)]">
          {[
            { label: 'TOP NOTES', val: 'BERGAMOT / CITRUS' },
            { label: 'HEART NOTES', val: 'JASMINE / LAVENDER' },
            { label: 'BASE NOTES', val: 'SANDALWOOD / AMBER' }
          ].map((note, idx, arr) => (
            <React.Fragment key={note.label}>
              <div>
                <div className="text-[9px] tracking-[0.2em] text-white/60 mb-2">{note.label}</div>
                <div className="text-[10px] tracking-[0.15em] text-white font-light">{note.val}</div>
              </div>
              {idx !== arr.length - 1 && (
                <div className="hidden md:block w-px h-10 bg-white/20"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
      
    </section>
  );
};

export default Hero;
