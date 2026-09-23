import React from 'react';
import { motion } from 'framer-motion';

const WhyAuraScents: React.FC = () => {
  const features = [
    { title: 'CRUELTY FREE', desc: 'Kindness in every bottle — our commitment to cruelty-free products.' },
    { title: 'FRAGRANCE FORWARD', desc: 'Luxurious, imported perfume oils in every single product.' },
    { title: 'AFFORDABLE LUXURY', desc: 'Premium quality and elegance at a reasonable price.' },
    { title: 'GENDER NEUTRAL', desc: 'Bath, body and personal care made for everyone.' }
  ];

  return (
    <section className="py-24 bg-gradient-to-r from-[#111111] via-[#1a1a1a] to-[#222222] text-[#f5f0eb] relative overflow-hidden" id="why-aurascents">
      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
        
        {/* Left Side - Big Heading */}
        <div className="w-full lg:w-[30%] flex flex-col items-start">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.15em] leading-tight mb-4"
          >
            WHY <br />
            AURASCENTS?
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[2px] w-32 bg-[var(--gold)] origin-left"
          ></motion.div>
        </div>

        {/* Middle - Grid of Features */}
        <div className="w-full lg:w-[40%]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            {features.map((feature, i) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col items-start"
              >
                <div className="flex items-center gap-3 mb-2">
                  {/* Small gold square bullet */}
                  <span className="w-2 h-2 bg-[#b59a56] flex-shrink-0"></span>
                  <h3 className="text-sm md:text-base font-semibold tracking-wider text-[#e6e1da] uppercase">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-[#a39c94] leading-relaxed pl-5 font-light">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side - Perfume Bottle Image */}
        <div className="w-full lg:w-[30%] flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <img 
              src="/assets/hero-bottle.png" 
              alt="AuraScents White Oud" 
              className="w-[200px] md:w-[280px] lg:w-[320px] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]" 
            />
            {/* Reflection Effect */}
            <div className="absolute -bottom-8 left-0 right-0 h-16 bg-gradient-to-t from-transparent to-[#111111]/80 backdrop-blur-sm pointer-events-none"></div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
};

export default WhyAuraScents;
