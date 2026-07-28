import React from 'react';

const Story: React.FC = () => {
  return (
    <>
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 silk-bg-2"></div>
        <div className="spotlight" style={{ width: '800px', height: '800px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
          <div className="reveal">
            <div className="eyebrow justify-center mb-8" style={{ display: 'inline-flex' }}>Signature Collection</div>
            <h2 className="serif text-5xl md:text-7xl lg:text-8xl mb-10" style={{ lineHeight: 1, fontWeight: 300 }}>
              Luxury isn't worn.<br />
              <span className="text-gold-gradient" style={{ fontStyle: 'italic' }}>It's remembered.</span>
            </h2>
            <p className="max-w-xl mx-auto mb-12 text-sm" style={{ color: 'var(--ivory-soft)' }}>
              Discover the fragrances that have defined generations of connoisseurs — composed for those who understand that true luxury leaves a lasting trace.
            </p>
            <button className="btn-gold magnetic" onClick={() => document.getElementById('collections')?.scrollIntoView({behavior:'smooth'})}>
              Discover Signature Collection
              <i className="fas fa-arrow-right text-xs"></i>
            </button>
          </div>
        </div>
      </section>

      <section className="py-32 relative" id="story">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative reveal">
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop" alt="Master perfumer at work" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), transparent 50%, rgba(11, 11, 11, 0.4))' }}></div>
                <div className="absolute top-6 left-6 right-6 bottom-6 border pointer-events-none" style={{ borderColor: 'var(--border-gold)' }}></div>
              </div>
              <div className="absolute -bottom-6 -right-6 glass-card p-8 hidden md:block" style={{ maxWidth: '240px' }}>
                <div className="serif text-5xl text-gold-gradient mb-2" style={{ fontWeight: 300 }}>98</div>
                <div className="text-xs uppercase tracking-[0.25em]" style={{ color: 'var(--ivory-soft)' }}>Years of mastery</div>
                <div className="w-8 h-px mt-3" style={{ background: 'var(--gold)' }}></div>
              </div>
            </div>
            
            <div className="reveal">
              <div className="eyebrow mb-8">Our Heritage</div>
              <h2 className="section-title serif mb-8">
                Every Bottle Holds<br />
                <span className="text-gold-gradient" style={{ fontStyle: 'italic' }}>A Story</span>
              </h2>
              <p className="text-base mb-6" style={{ color: 'var(--ivory-soft)', lineHeight: 1.9 }}>
                AuraScents combines timeless craftsmanship with modern elegance to create fragrances that express personality, confidence, and sophistication. Each composition is a chapter — written in oils, woods, and resins.
              </p>
              <p className="text-base mb-10" style={{ color: 'var(--ivory-soft)', lineHeight: 1.9 }}>
                From our atelier in the south of France, our perfumers work alongside growers, distillers, and artisans to ensure every drop carries the soul of its origin.
              </p>
              <button className="btn-outline magnetic" onClick={() => (window as any).showToast?.('Our full story is being unveiled soon')}>
                Our Story
                <i className="fas fa-arrow-right text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Story;
