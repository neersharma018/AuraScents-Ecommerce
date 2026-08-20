import React from 'react';
import { useToast } from '../context/ToastContext';

const Contact: React.FC = () => {
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector('input');
    showToast('Welcome to the Aura Circle', 'success');
    if (input) input.value = '';
  };

  return (
    <section className="py-24 relative" id="contact">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto reveal">
          <div className="glass-card p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 silk-bg opacity-30"></div>
            <div className="spotlight" style={{ width: '600px', height: '400px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', opacity: 0.4 }}></div>
            
            <div className="relative z-10">
              <div className="eyebrow justify-center mb-6" style={{ display: 'inline-flex' }}>Exclusive Circle</div>
              <h2 className="serif text-4xl md:text-6xl mb-6" style={{ fontWeight: 300 }}>
                Join the <span className="text-gold-gradient" style={{ fontStyle: 'italic' }}>Aura Circle</span>
              </h2>
              <p className="max-w-xl mx-auto mb-10 text-sm" style={{ color: 'var(--ivory-soft)' }}>
                Receive exclusive launches, luxury offers, and fragrance guides composed by our master perfumers — delivered with the discretion our patrons deserve.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto" onSubmit={handleSubscribe}>
                <input type="email" placeholder="Your email address" className="input-luxury flex-1" required />
                <button type="submit" className="btn-gold magnetic whitespace-nowrap">
                  Subscribe
                  <i className="fas fa-arrow-right text-xs"></i>
                </button>
              </form>
              
              <p className="text-[10px] tracking-[0.25em] uppercase mt-6" style={{ color: 'var(--ivory-dim)' }}>No spam. Only elegance. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
