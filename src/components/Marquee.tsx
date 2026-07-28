import React from 'react';

const Marquee: React.FC = () => {
  return (
    <div className="marquee">
      <div className="marquee-content">
        <span className="marquee-item">Handcrafted in Grasse</span>
        <span className="marquee-item">Rare Ingredients</span>
        <span className="marquee-item">Maison de Parfum</span>
        <span className="marquee-item">Est. 1928</span>
        <span className="marquee-item">Artisan Perfumery</span>
        <span className="marquee-item">Handcrafted in Grasse</span>
        <span className="marquee-item">Rare Ingredients</span>
        <span className="marquee-item">Maison de Parfum</span>
        <span className="marquee-item">Est. 1928</span>
        <span className="marquee-item">Artisan Perfumery</span>
      </div>
    </div>
  );
};

export default Marquee;
