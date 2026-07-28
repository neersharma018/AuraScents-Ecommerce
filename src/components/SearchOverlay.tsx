import React from 'react';

const SearchOverlay: React.FC = () => {
  return (
    <div className="search-overlay" id="searchOverlay">
      <button className="absolute top-8 right-8 icon-btn" id="closeSearch" aria-label="Close search">
        <i className="fas fa-times"></i>
      </button>
      <div className="eyebrow mb-8">Search the Maison</div>
      <input type="text" placeholder="Search fragrances, notes…" id="searchInput" />
      <div className="mt-12 flex flex-wrap gap-3 justify-center">
        <span className="chip">Royal Oud</span>
        <span className="chip">Velvet Amber</span>
        <span className="chip">Woody</span>
        <span className="chip">Citrus</span>
      </div>
    </div>
  );
};

export default SearchOverlay;
