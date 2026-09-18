import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex flex-col justify-center" id="home">
      {/* Composited Background & Bottle */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh]">
          {/* Base Background (Empty Room) */}
          <motion.img 
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src="/assets/hero-bg-empty.jpg" 
            className="absolute inset-0 w-full h-full object-cover" 
            alt="Cinematic Background" 
          />
          
          {/* Floating Perfume Bottle Synced to Background */}
          <motion.img 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
            src="/assets/hero-bottle.png" 
            alt="Velvet Oud Perfume" 
            className="absolute drop-shadow-[0_30px_40px_rgba(0,0,0,0.8)]"
            style={{
              width: '24%',
              top: '40%',
              left: '54.5%',
            }}
          />
        </div>
      </div>
      
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex-grow flex flex-col justify-center">
        
        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row justify-between items-center w-full mt-20">
          
          {/* Left Text Content */}
          <div className="w-full lg:w-[45%] text-[var(--bg-ivory)]">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[10px] tracking-[0.4em] uppercase text-[#D4D4D4] mb-6 font-medium"
            >
              EAU DE PARFUM
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="serif text-6xl md:text-[5rem] lg:text-[6.5rem] mb-5 text-[#F5F5F5] leading-[1.05]" 
            >
              More Than <br/>
              Just a <span className="italic font-light tracking-tight">Scent.</span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-[11px] tracking-[0.35em] uppercase text-[#D4D4D4] mb-8 font-light"
            >
              IT'S AN EXPERIENCE.
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-[13px] text-[#A3A3A3] font-light max-w-sm leading-[1.8] mb-12"
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
                className="group flex items-center gap-5 text-[10px] tracking-[0.3em] uppercase text-[#E5E5E5] hover:text-[var(--gold)] transition-colors pb-3 border-b border-[#E5E5E5]/30 hover:border-[var(--gold)]"
              >
                DISCOVER THE SCENT
                <ArrowRight size={14} className="transform group-hover:translate-x-3 transition-transform duration-300 font-light" strokeWidth={1.5} />
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
                <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-light">
                  {step.num}
                </div>
                
                {/* Vertical connecting line */}
                {idx !== arr.length - 1 && (
                  <div className="absolute left-[17.5px] top-9 w-[1px] h-12 bg-white/10"></div>
                )}
                
                <div>
                  <div className="text-[9px] text-[#A3A3A3] tracking-[0.15em] mb-1">{step.title}</div>
                  <div className="serif text-[15px] tracking-wide text-[#E5E5E5]">{step.val}</div>
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
                <div className="text-[8px] tracking-[0.25em] text-[#A3A3A3] mb-2">{note.label}</div>
                <div className="text-[9px] tracking-[0.2em] text-[#E5E5E5] font-light">{note.val}</div>
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
