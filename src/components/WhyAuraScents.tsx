import React from 'react';
import { motion } from 'framer-motion';
import { Droplet, Leaf, Globe, Package, Heart, Sparkles } from 'lucide-react';

const WhyAuraScents: React.FC = () => {
  const features = [
    { icon: <Sparkles size={24} strokeWidth={1.5} />, title: 'Handcrafted', desc: 'Meticulously blended by master perfumers in France.' },
    { icon: <Droplet size={24} strokeWidth={1.5} />, title: 'Natural Oils', desc: 'Highest concentration of pure, ethically sourced oils.' },
    { icon: <Heart size={24} strokeWidth={1.5} />, title: 'Cruelty Free', desc: 'Never tested on animals. 100% vegan formulations.' },
    { icon: <Leaf size={24} strokeWidth={1.5} />, title: 'Long Lasting', desc: 'Extrait de Parfum concentration for 24+ hour longevity.' },
    { icon: <Package size={24} strokeWidth={1.5} />, title: 'Premium Packaging', desc: 'Sustainable luxury glass and recycled packaging.' },
    { icon: <Globe size={24} strokeWidth={1.5} />, title: 'Worldwide Shipping', desc: 'Complimentary expedited shipping on all global orders.' }
  ];

  return (
    <section className="py-24 bg-[var(--bg-soft-beige)]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="eyebrow justify-center mb-4"
          >
            The Difference
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="serif text-3xl md:text-4xl text-[var(--text-main)]"
          >
            Why <span className="text-[var(--gold)] italic">AuraScents</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {features.map((feature, i) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-6 group"
            >
              <div className="w-14 h-14 rounded-full border border-[var(--border-gold)] flex items-center justify-center text-[var(--gold)] flex-shrink-0 group-hover:bg-[var(--gold)] group-hover:text-white transition-colors duration-500">
                {feature.icon}
              </div>
              <div>
                <h3 className="serif text-xl mb-2 text-[var(--text-main)]">{feature.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAuraScents;
