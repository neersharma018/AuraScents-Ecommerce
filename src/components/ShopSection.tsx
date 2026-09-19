import React from 'react';
import { motion } from 'framer-motion';

const ShopSection: React.FC = () => {
  return (
    <section id="fragrances" className="w-full bg-[#0A0A0A]">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        <img 
          src="/assets/shop-grid.jpg" 
          alt="AuraScents 13 Signature Perfumes Collection" 
          className="w-full h-auto object-cover block"
        />
      </motion.div>
    </section>
  );
};

export default ShopSection;

