import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { cartCount } = useShop();
  const { user, role, signOut } = useAuth();
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (href.startsWith('/#')) {
      const targetId = href.substring(1);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.querySelector(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.querySelector(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
      window.scrollTo(0, 0);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/#fragrances' },
    { name: 'Collections', href: '/collections' },
    { name: 'About', href: '/about' },
  ];

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--gold)] origin-left z-[101]" 
        style={{ scaleX }}
      />
      
      <nav className={`navbar ${scrolled ? 'scrolled bg-[var(--bg-ivory)] shadow-sm' : 'bg-transparent'} py-4 md:py-6 transition-all duration-500`} id="navbar">
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* Left: Nav Links */}
          <div className="flex-1 flex justify-start items-center">
            <button className={`icon-btn lg:hidden mr-4 text-white/70 border-white/30 hover:text-white hover:border-white`} onClick={() => setMobileMenuOpen(true)}>
              <Menu size={18} />
            </button>
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-[9px] uppercase tracking-[0.25em] transition-colors text-white/70 hover:text-white`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          
          {/* Center: Logo */}
          <div className="flex-1 flex justify-center">
            <Link to="/" className="flex items-center">
              <span className={`serif text-3xl tracking-widest font-light transition-colors text-white`}>
                Aura<span className="text-[var(--gold)] italic">Scents</span>
              </span>
            </Link>
          </div>
          
          {/* Right: Actions */}
          <div className="flex-1 flex justify-end items-center gap-6">
            <button className={`hidden md:block text-[9px] uppercase tracking-[0.25em] transition-colors text-white/70 hover:text-white`} aria-label="Search">
              SEARCH
            </button>
            
            {user ? (
              <div className="hidden md:flex items-center gap-6">
                {role === 'admin' && (
                  <Link to="/admin" className="text-[9px] uppercase tracking-widest text-[var(--gold)] font-medium hover:underline">
                    Admin
                  </Link>
                )}
                <span className={`text-[9px] uppercase tracking-[0.25em] transition-colors truncate max-w-[100px] text-white/70`}>
                  {user.email?.split('@')[0]}
                </span>
                <button className={`text-[9px] uppercase tracking-[0.25em] transition-colors text-white/70 hover:text-white`} onClick={() => signOut()}>
                  LOGOUT
                </button>
              </div>
            ) : (
              <button className={`hidden md:block text-[9px] uppercase tracking-[0.25em] transition-colors text-white/70 hover:text-white`} onClick={() => setAuthModalOpen(true)}>
                ACCOUNT
              </button>
            )}
            
            <Link to="/cart" className={`text-[9px] uppercase tracking-[0.25em] transition-colors text-white/70 hover:text-white`}>
              CART ({cartCount})
            </Link>
          </div>
          
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[200] bg-[var(--bg-ivory)] transition-transform duration-500 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button className="absolute top-8 right-8 icon-btn" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
          <X size={20} />
        </button>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <div className="eyebrow mb-4">Menu</div>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="serif text-4xl text-[var(--text-main)] hover:text-[var(--gold)] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
      
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;
