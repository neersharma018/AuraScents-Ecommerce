import React from 'react';
import { motion } from 'framer-motion';

const Ingredients: React.FC = () => {
  const ingredients = [
    { name: 'Oud', desc: 'Rare agarwood resin', image: '/assets/ingredient_oud.jpg' },
    { name: 'Amber', desc: 'Warm fossilized resin', image: '/assets/ingredient_amber.jpg' },
    { name: 'Rose', desc: 'Damask rose petals', image: '/assets/ingredient_rose.jpg' },
    { name: 'Jasmine', desc: 'Night-blooming sambac', image: '/assets/ingredient_jasmine.jpg' },
    { name: 'Vanilla', desc: 'Madagascan bourbon', image: '/assets/ingredient_vanilla.jpg' },
    { name: 'Sandalwood', desc: 'Rich mysore wood', image: '/assets/ingredient_sandalwood.jpg' },
  ];

  return (
    <section className="py-32 relative bg-white" id="ingredients">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="eyebrow justify-center mb-6">Sourced Globally</div>
          <h2 className="section-title serif text-[var(--text-main)]">
            Rare & <span className="text-gold-italic">Precious</span>
          </h2>
          <p className="max-w-xl mx-auto mt-6 text-sm text-[var(--text-muted)]">
            We source the world's finest raw materials, ensuring unparalleled richness and depth in every drop of AuraScents.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {ingredients.map((ing, i) => (
            <motion.div 
              key={ing.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[3/4] mb-4">
                <img 
                  src={ing.image} 
                  alt={ing.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="serif text-white text-xl md:text-2xl mb-1">{ing.name}</h3>
                  <p className="text-[10px] text-white/80 tracking-widest uppercase">{ing.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ingredients;
