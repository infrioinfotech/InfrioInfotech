import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 {isScrolled ? 'bg-brand-white/95 backdrop-blur-md py-4 shadow-premium' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-black text-brand-black">Infrio <span className="text-brand-red">Infotech</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-bold transition-colors hover:text-brand-red {location.pathname === link.path ? 'text-brand-red' : 'text-brand-black'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/order" className="btn-primary py-2 px-6 text-sm">
              Get Started
            </Link>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-black hover:text-brand-red transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-white border-t border-gray-100 shadow-premium">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-4 text-base font-bold rounded-md {location.pathname === link.path ? 'text-brand-red bg-brand-offwhite' : 'text-brand-black hover:bg-brand-offwhite'}`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 px-3">
              <Link to="/order" onClick={() => setIsOpen(false)} className="btn-primary w-full block text-center">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
