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
              width: '32%',
              top: '25%',
              left: '54%',
            }}
          />
        </div>
      </div>
      
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex-grow flex flex-col justify-center">
        
        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row justify-between items-center w-full mt-10 lg:-mt-20">
          
          {/* Left Text Content */}
          <div className="w-full lg:w-[45%] text-[var(--bg-ivory)] lg:ml-[12%]">
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
          

          
        </div>
      </div>
      
      
    </section>
  );
};

export default Hero;
