import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Newsletter: React.FC = () => {
  return (
    <section className="py-32 relative bg-[var(--bg-ivory)] border-t border-[var(--border-dark)]">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="eyebrow justify-center mb-6">Maison de Parfum</div>
          <h2 className="serif text-4xl md:text-5xl text-[var(--text-main)] mb-6">
            The Art of Scent <span className="text-[var(--gold)] italic">Delivered.</span>
          </h2>
          <p className="text-sm text-[var(--text-muted)] mb-12">
            Join the inner circle to receive exclusive early access to new collections, private events, and the secrets of French perfumery.
          </p>
          
          <form className="relative max-w-md mx-auto flex items-center group" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full bg-transparent border-b border-[var(--matte-black)] py-4 pl-4 pr-12 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors placeholder:text-gray-400"
              required
            />
            <button 
              type="submit" 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-[var(--matte-black)] hover:text-[var(--gold)] transition-colors"
              aria-label="Subscribe"
            >
              <ArrowRight size={20} strokeWidth={1.5} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
