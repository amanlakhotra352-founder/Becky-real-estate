
import React, { useEffect, useState, memo } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { HERO_IMAGES, UI_CONFIG } from '../constants';

interface HeroProps {
  onSearch: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
      });
    };

    const slideTimer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % HERO_IMAGES.length);
    }, UI_CONFIG.SLIDESHOW_INTERVAL);

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(slideTimer);
    };
  }, []);

  return (
    <section className="relative h-[90vh] md:h-screen min-h-[600px] w-full flex items-center overflow-hidden bg-noir">
      {/* Background Pipeline */}
      <div className="absolute inset-0 z-0">
        {HERO_IMAGES.map((img, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={img} 
              alt={`Luxury Portfolio ${index + 1}`} 
              className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-out ${
                index === currentIndex ? 'scale-110' : 'scale-105'
              }`}
              style={{
                transform: `translateY(calc(var(--scroll-y, 0) * 0.08px)) ${index === currentIndex ? 'scale(1.1)' : 'scale(1.05)'}`,
                willChange: 'transform, opacity'
              }}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
        
        {/* Editorial Lighting Masks - Heavier on mobile for text protection */}
        <div className="absolute inset-0 bg-gradient-to-r from-noir/80 via-noir/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 h-full flex flex-col justify-end pb-40 md:pb-48">
        <div className="max-w-3xl animate-reveal">
          <div className="space-y-5 md:space-y-8">
            <div className="flex items-center space-x-4 md:space-x-6">
               <div className="w-8 md:w-12 h-px bg-gold/50"></div>
               <p className="text-white/80 text-[9px] md:text-[11px] uppercase tracking-[0.6em] font-black luxury-text-shadow">
                 Indiana Real Estate Inc.
               </p>
            </div>
            
            <h1 className="text-white text-4xl sm:text-7xl md:text-8xl font-serif italic tracking-tighter leading-[1.1] md:leading-none font-bold luxury-text-shadow">
              Define Your <br className="hidden xs:block" />
              <span className="text-gold gold-shimmer not-italic font-black">Legacy.</span>
            </h1>
            
            <p className="text-white/70 font-serif italic text-base md:text-2xl max-w-sm md:max-w-md leading-relaxed luxury-text-shadow">
              Bespoke representation for Auburn’s most significant architectural achievements.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Pipeline - Optimized for mobile touch & layout */}
      <div className="absolute bottom-0 left-0 w-full z-20 px-4 md:px-12 pb-6 md:pb-12">
        <div className="container mx-auto max-w-5xl">
           <div className="bg-noir/60 backdrop-blur-3xl p-1.5 shadow-3xl flex flex-col md:flex-row items-stretch md:items-center rounded-sm border border-white/10">
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-0">
                 <FilterDropdown label="District" value="Bridgewater" />
                 <FilterDropdown label="Assets" value="Golf Villas" />
                 <FilterDropdown label="Specs" value="4+ Suites" />
                 <FilterDropdown label="Value" value="$1.2M+" />
              </div>
              <button 
                onClick={onSearch}
                className="bg-white text-noir px-8 md:px-12 py-4 md:py-5 text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] hover:bg-gold transition-all mt-1.5 md:mt-0 flex items-center justify-center space-x-3 group rounded-sm active:scale-[0.98]"
              >
                 <Search size={14} className="group-hover:scale-110 transition-transform" />
                 <span>Explore</span>
              </button>
           </div>
        </div>
      </div>
    </section>
  );
};

const FilterDropdown = memo(({ label, value }: { label: string, value: string }) => (
  <div className="relative group px-4 md:px-6 py-3.5 md:py-4 border-r border-white/5 last:border-none cursor-pointer hover:bg-white/5 active:bg-white/10 transition-colors">
    <p className="text-[6px] md:text-[7px] uppercase tracking-[0.4em] text-white/30 font-black mb-1">{label}</p>
    <div className="flex items-center justify-between">
      <span className="text-[9px] md:text-[10px] font-bold text-white uppercase tracking-widest truncate">{value}</span>
      <ChevronDown size={10} className="text-gold opacity-50 group-hover:opacity-100 transition-opacity ml-1.5" />
    </div>
  </div>
));

export default memo(Hero);
