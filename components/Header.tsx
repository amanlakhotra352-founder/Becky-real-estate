
import React, { useState, useEffect, memo } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { AGENT_INFO, NAV_LINKS, UI_CONFIG } from '../constants';

interface HeaderProps {
  onNavigate: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > UI_CONFIG.SCROLL_THRESHOLD);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('body-lock');
    } else {
      document.body.classList.remove('body-lock');
    }
  }, [isMenuOpen]);

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header 
        role="banner"
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md border-noir/5 py-3 shadow-sm' 
            : 'bg-transparent border-white/10 py-5 md:py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Brand Identity */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-3 group outline-none"
            aria-label="Indiana Real Estate Home"
          >
            <div className={`font-serif text-xl md:text-3xl font-black tracking-tighter transition-colors ${isScrolled ? 'text-noir' : 'text-white'}`}>
              BM<span className="text-gold">.</span>
            </div>
            <div className="hidden xs:flex flex-col border-l border-current pl-3">
               <span className={`text-[10px] font-bold tracking-[0.3em] uppercase transition-colors ${isScrolled ? 'text-noir' : 'text-white'}`}>BECKY MALDENEY</span>
               <span className="text-[7px] font-medium tracking-[0.4em] text-gold uppercase">Elite Representation</span>
            </div>
          </button>

          {/* Desktop Navigation Registry */}
          <nav role="navigation" className="hidden lg:flex items-center space-x-8 xl:space-x-12">
            {NAV_LINKS.map((link) => (
              <button 
                key={link.id} 
                onClick={() => handleNavClick(link.id)}
                className={`text-[11px] font-bold uppercase tracking-[0.25em] transition-all hover:text-gold py-2 leading-relaxed whitespace-nowrap ${
                  isScrolled ? 'text-noir/60' : 'text-white/80'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Global Controls */}
          <div className="flex items-center space-x-4 md:space-x-8">
            <button 
              onClick={() => onNavigate('contact')}
              className={`hidden sm:flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-sm transition-all shadow-sm active:scale-95 ${
                isScrolled 
                  ? 'bg-noir text-white hover:bg-gold hover:text-noir' 
                  : 'bg-white text-noir hover:bg-gold'
              }`}
            >
              <span>Secure Entry</span>
            </button>

            <button 
              onClick={() => setIsMenuOpen(true)}
              className={`transition-colors p-2 hover:text-gold active:scale-90 ${isScrolled ? 'text-noir' : 'text-white'}`}
              aria-label="Open Navigation Menu"
              aria-expanded={isMenuOpen}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Persistent Full-Screen Navigation Overlay */}
      <div 
        aria-hidden={!isMenuOpen}
        className={`fixed inset-0 w-screen h-screen bg-[#0F0F0F] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] transform z-[9999] ${
          isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        {/* Overlay Header */}
        <div className="w-full px-6 py-8 md:px-12 flex justify-between items-center">
           <div className="font-serif text-3xl font-black text-white">BM<span className="text-gold">.</span></div>
           <button 
            onClick={() => setIsMenuOpen(false)} 
            className="text-white p-3 hover:rotate-90 transition-transform active:scale-75 outline-none"
            aria-label="Close Navigation Menu"
           >
            <X size={32} />
           </button>
        </div>
        
        {/* Navigation Content - Increased leading to prevent clipping of large serifs */}
        <div className="flex flex-col items-center justify-center h-[calc(100vh-140px)] space-y-4 md:space-y-6 px-6 overflow-y-auto overflow-x-hidden">
          <nav className="flex flex-col items-center">
            {NAV_LINKS.map((link, index) => (
              <div 
                key={link.id} 
                className={`transition-all duration-700 delay-[${index * 100}ms] transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              >
                <button 
                  onClick={() => handleNavClick(link.id)}
                  className="relative text-5xl xs:text-6xl md:text-8xl font-serif text-white hover:text-gold transition-all tracking-tighter group flex flex-col items-center leading-[1.4] py-3 md:py-4 outline-none whitespace-nowrap"
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gold transition-all duration-500 group-hover:w-full"></span>
                  </span>
                </button>
              </div>
            ))}
          </nav>
          
          <div className={`w-full max-w-sm pt-8 md:pt-12 mt-4 md:mt-8 border-t border-white/5 space-y-6 md:space-y-8 pb-12 transition-all duration-1000 delay-500 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
             <a href={`tel:${AGENT_INFO.phone}`} className="flex items-center justify-center space-x-4 text-gold text-[11px] font-black uppercase tracking-[0.4em] group active:scale-95 transition-transform">
               <Phone size={18} className="group-hover:rotate-12 transition-transform" />
               <span>Concierge Hotline</span>
             </a>
             <button 
              onClick={() => handleNavClick('contact')}
              className="w-full bg-gold text-noir py-5 md:py-7 text-[10px] md:text-[11px] font-black uppercase tracking-[0.6em] rounded-sm hover:bg-white transition-all shadow-2xl active:scale-[0.98]"
             >
               Request Private Brief
             </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Header);
