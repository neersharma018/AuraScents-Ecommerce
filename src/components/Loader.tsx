import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="loader" id="loader">
      <div className="text-center">
        <div className="serif text-5xl text-gold-gradient" style={{ fontWeight: 300, letterSpacing: '0.05em' }}>AuraScents</div>
        <div className="loader-line mx-auto"></div>
        <div className="text-xs tracking-[0.4em] uppercase mt-4" style={{ color: 'var(--ivory-dim)' }}>Maison de Parfum</div>
      </div>
    </div>
  );
};

export default Loader;
