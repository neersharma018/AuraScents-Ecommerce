import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Testimonials: React.FC = () => {
  const testimonials = [
    { text: 'AuraScents became my signature fragrance. The longevity is remarkable — I catch whispers of it on my scarf hours after application.', author: 'Isabelle Laurent', title: 'Fashion Editor, Paris', image: '/assets/testimonial_1.jpg' },
    { text: 'Beautiful packaging and amazing longevity. The Velvet Amber is unlike anything I have experienced — warm, intimate, and utterly addictive.', author: 'Marcus Chen', title: 'Collector, New York', image: 'https://ui-avatars.com/api/?name=Marcus+Chen&background=C9A227&color=fff&size=200&font-size=0.33' },
    { text: 'The most luxurious perfume I have ever owned. Royal Oud commands attention without ever raising its voice. Pure sophistication.', author: 'Sophia Kovac', title: 'Art Director, Milan', image: 'https://ui-avatars.com/api/?name=Sophia+Kovac&background=C9A227&color=fff&size=200&font-size=0.33' }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-32 relative bg-[var(--bg-ivory)] overflow-hidden">
      <div className="absolute inset-0 bg-white/40"></div>
      
      {/* Background blur decorative circles */}
      <div className="absolute -left-32 top-1/2 w-96 h-96 bg-[var(--gold)]/5 rounded-full blur-3xl"></div>
      <div className="absolute -right-32 bottom-0 w-96 h-96 bg-[var(--gold)]/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="eyebrow justify-center mb-6">Words From Our Patrons</div>
          <h2 className="section-title serif text-[var(--text-main)]">Voices of <span className="text-gold-italic">Distinction</span></h2>
        </motion.div>
        
        <div className="max-w-4xl mx-auto relative min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={current}
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div className="glass-card rounded-[2rem] p-10 md:p-16 text-center shadow-[0_20px_60px_rgba(0,0,0,0.03)] bg-white/60">
                <div className="flex justify-center gap-1 mb-6 text-[var(--gold)] text-sm">
                  ★★★★★
                </div>
                <p className="serif text-2xl md:text-4xl mb-10 text-[var(--text-main)] italic leading-relaxed">
                  "{testimonials[current].text}"
                </p>
                
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-white shadow-md">
                    <img src={testimonials[current].image} alt={testimonials[current].author} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-sm tracking-widest uppercase font-medium text-[var(--text-main)]">{testimonials[current].author}</div>
                  <div className="text-xs mt-1 text-[var(--text-muted)]">{testimonials[current].title}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="flex justify-center gap-4 mt-20 relative z-20">
          {testimonials.map((_, i) => (
            <button 
              key={i}
              className={`h-[2px] transition-all duration-500 ${i === current ? 'w-12 bg-[var(--gold)]' : 'w-6 bg-[var(--border-dark)]'}`} 
              aria-label={`Testimonial ${i + 1}`} 
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
