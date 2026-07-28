import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Search, Heart, User, ShoppingBag, Menu, X, LogOut } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { cartCount, wishlist } = useShop();
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
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Collections', href: '#collections' },
    { name: 'Best Sellers', href: '#bestsellers' },
    { name: 'Ingredients', href: '#ingredients' },
    { name: 'About', href: '#about' },
  ];

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--gold)] origin-left z-[101]" 
        style={{ scaleX }}
      />
      
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="icon-btn lg:hidden" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={18} />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <span className="serif text-2xl tracking-wider font-medium text-[var(--text-main)]">
                Aura<span className="text-[var(--gold)] italic">Scents</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center gap-9">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                className="nav-link"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <button className="icon-btn" aria-label="Search">
              <Search size={16} />
            </button>
            <Link to="/cart" className="icon-btn relative" aria-label="Wishlist">
              <Heart size={16} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--gold)] text-white text-[9px] rounded-full flex items-center justify-center">{wishlist.length}</span>
              )}
            </Link>
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                {role === 'admin' && (
                  <Link to="/admin" className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-bold hover:underline">
                    Admin Panel
                  </Link>
                )}
                <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] truncate max-w-[100px]">
                  {user.email?.split('@')[0]}
                </span>
                <button className="icon-btn" aria-label="Sign Out" onClick={() => signOut()}>
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button className="icon-btn hidden md:flex" aria-label="Account" onClick={() => setAuthModalOpen(true)}>
                <User size={16} />
              </button>
            )}
            <Link to="/cart" className="icon-btn relative" aria-label="Cart">
              <ShoppingBag size={16} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--gold)] text-white text-[9px] rounded-full flex items-center justify-center">{cartCount}</span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[200] bg-[var(--bg-ivory)] transition-transform duration-500 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button className="absolute top-8 right-8 icon-btn" onClick={() => setMobileMenuOpen(false)}>
          <X size={20} />
        </button>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <div className="eyebrow mb-4">Menu</div>
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="serif text-4xl text-[var(--text-main)] hover:text-[var(--gold)] transition-colors">Home</Link>
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
