
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ChevronLeft, Phone, Mail } from 'lucide-react';
import { AGENT_INFO } from '../constants';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Portfolio', id: 'listings' },
    { name: 'Districts', id: 'neighborhoods' },
    { name: 'Becky', id: 'about' },
    { name: 'Location', id: 'location' },
    { name: 'Contact', id: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    // CRITICAL: Ensure menu closes first to remove the overlay
    setIsMenuOpen(false);
    
    // Slight delay to allow the state change to propagate and re-enable pointer events
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const offset = 100; // Generous offset for fixed header
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[100] p-4 md:p-6 pointer-events-none">
        <header className={`mx-auto max-w-6xl w-full transition-all duration-700 pointer-events-auto rounded-[1.5rem] md:rounded-[2.5rem] border px-4 py-2 flex items-center justify-between ${
          isScrolled 
          ? 'bg-noir/90 backdrop-blur-xl border-white/10 shadow-2xl py-3 mt-1' 
          : 'bg-noir/20 backdrop-blur-md border-white/10 mt-2 md:mt-4'
        }`}>
          {/* Brand / Logo */}
          <button 
            onClick={() => {
              setIsMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className="flex items-center space-x-2 md:space-x-4 px-1 md:px-2 group text-left pointer-events-auto"
          >
            <div className={`w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${isScrolled ? 'bg-gold' : 'bg-white'}`}>
              <span className="text-noir font-black text-xs md:text-sm tracking-tighter">BM</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] md:text-sm font-bold tracking-[0.25em] transition-colors luxury-text-shadow text-white">
                BECKY MALDENEY
              </span>
              <span className={`text-[7px] md:text-[9px] uppercase tracking-[0.4em] font-medium transition-colors ${isScrolled ? 'text-white/50' : 'text-white/70'}`}>
                Elite Properties
              </span>
            </div>
          </button>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => scrollToSection(link.id)}
                className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                  isScrolled ? 'text-white/80 hover:bg-white/10 hover:text-gold' : 'text-white hover:bg-white/10 hover:text-gold'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
             <button 
              onClick={() => scrollToSection('contact')}
              className="hidden sm:flex items-center space-x-3 bg-gold text-noir px-6 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_30px_rgba(197,160,89,0.3)]"
            >
              <span>Consult Now</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
            <button 
              onClick={() => setIsMenuOpen(true)}
              className={`p-3 md:p-4 rounded-full lg:hidden flex items-center justify-center transition-all ${isScrolled ? 'bg-white/10 text-white' : 'bg-white/20 text-white shadow-xl'}`}
              aria-label="Open Navigation Menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-noir text-white transition-all duration-500 transform ${
          isMenuOpen ? 'translate-x-0 opacity-100 z-[200]' : 'translate-x-full opacity-0 z-[-1] pointer-events-none'
        }`}
      >
        <div className="absolute top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center">
           <button 
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center space-x-3 text-white/40 hover:text-gold transition-all"
           >
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Return</span>
           </button>
           
           <button 
            onClick={() => setIsMenuOpen(false)}
            className="w-14 h-14 rounded-full bg-gold text-noir flex items-center justify-center border border-gold/20 shadow-2xl"
            aria-label="Close Menu"
          >
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col h-full justify-center items-center space-y-12 p-10">
          <nav className="flex flex-col items-center space-y-8">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => scrollToSection(link.id)}
                className="text-5xl sm:text-7xl font-serif hover:text-gold transition-all tracking-tighter text-center"
              >
                {link.name}
              </button>
            ))}
          </nav>
          
          <div className="pt-12 w-full max-w-sm text-center border-t border-white/5 space-y-8">
            <div className="space-y-4">
              <p className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold">Private Concierge Line</p>
              <div className="flex flex-col items-center space-y-3">
                <a href={`tel:${AGENT_INFO.phone}`} className="flex items-center space-x-2 text-2xl font-serif hover:text-gold transition-colors">
                  <Phone size={18} className="text-gold" />
                  <span>{AGENT_INFO.phone}</span>
                </a>
                <a href={`mailto:${AGENT_INFO.email}`} className="flex items-center space-x-2 text-white/40 text-xs tracking-widest hover:text-gold transition-colors">
                  <Mail size={14} className="text-gold" />
                  <span>{AGENT_INFO.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
