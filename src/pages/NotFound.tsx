import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | AuraScents</title>
      </Helmet>
      
      <div className="min-h-screen bg-[var(--bg-ivory)] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--gold)] opacity-5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center z-10"
        >
          <div className="serif text-[150px] md:text-[200px] leading-none text-transparent bg-clip-text bg-gradient-to-b from-[var(--gold)] to-transparent opacity-20 select-none">
            404
          </div>
          <h1 className="serif text-4xl md:text-5xl text-[var(--text-main)] mb-6 -mt-10 relative">
            <span className="text-gold-italic">Page</span> Not Found
          </h1>
          <p className="text-[var(--text-muted)] mb-10 max-w-md mx-auto">
            The fragrance you are looking for has evaporated into thin air, or the page no longer exists.
          </p>
          <Link 
            to="/" 
            className="inline-flex h-14 items-center justify-center px-10 bg-[var(--matte-black)] text-white uppercase tracking-widest text-xs font-medium rounded-full hover:bg-[var(--gold)] transition-colors"
          >
            Return to Atelier
          </Link>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;
