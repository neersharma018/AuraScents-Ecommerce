import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FeaturedBottle: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section className="relative min-h-[120vh] bg-[var(--matte-black)] overflow-hidden flex items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--charcoal)_0%,_var(--matte-black)_100%)]"></div>
      
      {/* Smoke Overlay */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('/assets/dark_smoke.jpg')", backgroundSize: 'cover', mixBlendMode: 'screen' }}></div>

      {/* Gold Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[var(--gold)] rounded-full blur-[1px]"
          animate={{
            y: [0, -500],
            x: Math.random() * 200 - 100,
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: Math.random() * 8 + 4,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10 text-center">
        
        {/* Giant Bottle */}
        <motion.div 
          style={{ y: yPos }}
          className="relative mx-auto"
        >
          <motion.div
            animate={{ rotateY: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="w-[300px] h-[500px] md:w-[500px] md:h-[700px] mx-auto perspective-1000"
          >
            {/* We simulate 3D rotation by slow rotating a flat high-res cinematic image */}
            <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
               <img 
                 src="/assets/featured_bottle.jpg" 
                 alt="AuraScents Featured Edition" 
                 className="w-full h-full object-cover rounded-3xl shadow-[0_0_80px_rgba(201,162,39,0.15)]"
               />
               <div className="absolute inset-0 border border-[var(--gold)]/20 rounded-3xl pointer-events-none"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Text Overlay */}
        <motion.div 
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="absolute bottom-1/4 left-0 right-0 pointer-events-none"
        >
          <div className="eyebrow text-[var(--gold)] mb-4 justify-center">The Masterpiece</div>
          <h2 className="serif text-5xl md:text-8xl text-white drop-shadow-2xl">
            L'Édition <span className="text-[var(--gold)] italic">Limitée</span>
          </h2>
        </motion.div>

      </div>
    </section>
  );
};

export default FeaturedBottle;
