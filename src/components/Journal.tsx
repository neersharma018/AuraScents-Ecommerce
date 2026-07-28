import React from 'react';

const Journal: React.FC = () => {
  return (
    <section className="py-32 relative" id="journal">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 reveal">
          <div className="eyebrow justify-center mb-6" style={{ display: 'inline-flex' }}>Follow Our World</div>
          <h2 className="section-title serif">@aurascents <span className="text-gold-gradient" style={{ fontStyle: 'italic' }}>Official</span></h2>
          <p className="mt-6 text-sm" style={{ color: 'var(--ivory-soft)' }}>Step into the AuraScents lifestyle — a curated visual diary of fragrance, art, and elegance.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 reveal">
          {[
            'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=500&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=500&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=500&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1615397323118-2e8c2534ce65?q=80&w=500&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1595425970377-c9703bc48b2d?q=80&w=500&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=500&auto=format&fit=crop'
          ].map((src, i) => (
            <div key={i} className="insta-item">
              <img src={src} alt="Instagram post" loading="lazy" />
              <i className="fab fa-instagram insta-icon"></i>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="btn-outline magnetic" onClick={() => (window as any).showToast?.('Opening Instagram…')}>
            <i className="fab fa-instagram"></i>
            Follow on Instagram
          </button>
        </div>
      </div>
    </section>
  );
};

export default Journal;
