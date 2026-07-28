import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--matte-black)] text-white pt-24 pb-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <span className="serif text-4xl mb-6 inline-block tracking-wider">Aura<span className="text-[var(--gold)] italic">Scents</span></span>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed mb-8">
              Maison de Parfum. Crafted in Grasse, France. Discover the art of timeless fragrance designed to become your signature.
            </p>
          </div>
          
          <div>
            <h4 className="eyebrow text-white mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><a href="#collections" className="text-sm text-gray-400 hover:text-[var(--gold)] transition-colors">Collections</a></li>
              <li><a href="#bestsellers" className="text-sm text-gray-400 hover:text-[var(--gold)] transition-colors">Best Sellers</a></li>
              <li><a href="#ingredients" className="text-sm text-gray-400 hover:text-[var(--gold)] transition-colors">Ingredients</a></li>
              <li><a href="#about" className="text-sm text-gray-400 hover:text-[var(--gold)] transition-colors">Our Story</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="eyebrow text-white mb-6">Assistance</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-gray-400 hover:text-[var(--gold)] transition-colors">Client Services</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-[var(--gold)] transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-[var(--gold)] transition-colors">Track Order</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-[var(--gold)] transition-colors">Boutiques</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} AuraScents Maison de Parfum. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-[var(--gold)] transition-colors"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-gray-500 hover:text-[var(--gold)] transition-colors"><i className="fab fa-pinterest"></i></a>
            <a href="#" className="text-gray-500 hover:text-[var(--gold)] transition-colors"><i className="fab fa-facebook-f"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
