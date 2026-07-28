import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section className="py-32 relative bg-[var(--bg-ivory)] overflow-hidden" id="about" ref={containerRef}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Parallax Image Side */}
          <div className="relative h-[600px] lg:h-[800px] w-full rounded-2xl overflow-hidden shadow-2xl">
            <motion.div style={{ y }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
              <img 
                src="/assets/about_atelier.jpg" 
                alt="AuraScents Atelier" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </motion.div>
            
            {/* Floating Glass Box */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute bottom-8 left-8 right-8 md:right-auto md:w-80 glass-card p-8 rounded-xl bg-white/70 backdrop-blur-xl border border-white"
            >
              <div className="eyebrow mb-2">Heritage</div>
              <div className="serif text-2xl text-[var(--text-main)] mb-1">Maison de Parfum</div>
              <div className="text-xs text-[var(--text-muted)] tracking-widest uppercase">Est. 2026</div>
            </motion.div>
          </div>

          {/* Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="eyebrow mb-6">Our Heritage</div>
              <h2 className="section-title serif text-[var(--text-main)] mb-8">
                The Art of <br />
                <span className="text-gold-italic">French Perfumery</span>
              </h2>
              
              <div className="space-y-6 text-[var(--text-muted)] text-base md:text-lg leading-relaxed max-w-lg mb-12">
                <p>
                  At AuraScents, we believe that a fragrance is more than a scent—it is an invisible signature that lingers long after you leave the room. 
                </p>
                <p>
                  Crafted by master perfumers in Grasse, France, each bottle is a testament to timeless elegance, utilizing only the finest natural ingredients meticulously sourced from around the globe.
                </p>
              </div>
            </motion.div>

            {/* Premium Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-[var(--border-dark)]">
              {[
                { label: 'Since', value: '2026' },
                { label: 'Customers', value: '100K+' },
                { label: 'Countries', value: '40+' },
                { label: 'Satisfaction', value: '98%' }
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="serif text-3xl md:text-4xl text-[var(--gold)] mb-2">{stat.value}</div>
                  <div className="text-[9px] tracking-widest uppercase text-[var(--text-muted)]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-12"
            >
              <button className="text-sm tracking-widest uppercase border-b border-[var(--matte-black)] pb-1 hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors">
                Read Our Full Story
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
