import React from 'react';
import { motion } from 'framer-motion';

const InstagramGallery: React.FC = () => {
  const images = [
    '/assets/insta_1.jpg',
    '/assets/insta_2.jpg',
    '/assets/insta_3.jpg',
    '/assets/insta_4.jpg',
  ];

  return (
    <section className="py-24 bg-white border-t border-[var(--border-dark)]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="serif text-3xl md:text-4xl text-[var(--text-main)]">
              Join The <span className="text-gold-italic">Atelier</span>
            </h2>
          </motion.div>
          <motion.a 
            href="#"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-widest uppercase font-medium hover:text-[var(--gold)] transition-colors mt-4 md:mt-0"
          >
            @AuraScents
          </motion.a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((src, i) => (
            <motion.a 
              href="#"
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative group overflow-hidden bg-gray-100 aspect-square block"
            >
              <img 
                src={src} 
                alt="Instagram Feature" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <i className="fab fa-instagram text-white text-3xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"></i>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramGallery;
