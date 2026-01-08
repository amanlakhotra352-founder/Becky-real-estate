
import React from 'react';
import { Instagram, ArrowUpRight, MapPin } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative h-screen min-h-[750px] w-full flex items-center justify-center overflow-hidden bg-noir">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=90&w=2400" 
          alt="Luxury Auburn Estate" 
          className="w-full h-full object-cover opacity-60 scale-105 animate-[pulse_30s_ease-in-out_infinite]"
          loading="eager"
        />
        {/* Multilayered Gradient for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/30 to-noir/70"></div>
        <div className="absolute inset-0 bg-noir/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-24 md:pt-32 pb-20">
        <div className="flex flex-col items-center space-y-12 md:space-y-20">
          {/* Top Label */}
          <div className="flex flex-col items-center space-y-6">
             <div className="flex items-center space-x-3 text-gold animate-float">
                <MapPin size={20} className="fill-gold/20" />
                <span className="text-[12px] md:text-[14px] uppercase tracking-[0.5em] md:tracking-[0.7em] font-black luxury-text-shadow">Auburn • Indiana</span>
             </div>
             <div className="w-[1.5px] h-12 md:h-24 bg-gradient-to-b from-gold to-transparent"></div>
          </div>
          
          {/* Headline - Responsive & High Visibility */}
          <div className="max-w-6xl mx-auto">
            <h1 className="text-[10vw] sm:text-7xl md:text-[7.5vw] font-serif text-white leading-[1.1] md:leading-[1.0] tracking-tighter luxury-text-shadow">
              <span className="inline-block animate-reveal font-black">Curating Your</span>
              <span className="block md:inline-block md:ml-8 animate-reveal delay-150 text-gold italic font-black gold-shimmer">Legacy Home</span>
              <div className="block mt-6 md:mt-10">
                <span className="block animate-reveal delay-300 text-[3.5vw] sm:text-xl md:text-[2.2vw] font-sans font-black tracking-[0.4em] md:tracking-[0.6em] text-white uppercase leading-normal luxury-text-shadow">
                  AUBURN'S PREMIER COLLECTION
                </span>
              </div>
            </h1>
          </div>
          
          {/* Subtext and Action Hub */}
          <div className="flex flex-col items-center justify-center gap-12 md:gap-16">
            <p className="text-white/90 font-medium max-w-2xl text-center leading-relaxed text-base md:text-2xl animate-reveal delay-500 luxury-text-shadow italic font-serif px-6">
              Exclusive representation for DeKalb County's most significant architectural achievements and private estates.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10 md:gap-14 animate-reveal delay-700 w-full">
              <button 
                onClick={() => scrollToSection('contact')} 
                className="group relative flex items-center justify-center space-x-4 md:space-x-6 bg-gold text-noir px-10 md:px-16 py-5 md:py-7 rounded-full font-black text-[11px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-white hover:scale-105 transition-all duration-500 shadow-[0_25px_60px_rgba(197,160,89,0.5)] animate-pulse-glow"
              >
                <span>Book Private Tour</span>
                <div className="bg-noir text-white p-2.5 rounded-full group-hover:rotate-45 transition-transform duration-500">
                  <ArrowUpRight size={18} />
                </div>
              </button>
              
              <button 
                onClick={() => scrollToSection('listings')}
                className="text-white hover:text-gold text-[12px] md:text-sm uppercase tracking-[0.4em] md:tracking-[0.6em] font-black transition-all border-b-2 md:border-b-[3px] border-white/30 hover:border-gold pb-2 md:pb-3 luxury-text-shadow"
              >
                Browse Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Side Elements - Hidden on mobile */}
      <div className="absolute bottom-20 left-12 hidden xl:flex flex-col space-y-12 text-white items-center z-20">
        <a href="#" className="hover:text-gold transition-all hover:-translate-y-2"><Instagram size={24} /></a>
        <div className="w-[1.5px] h-20 bg-gradient-to-t from-white/40 to-transparent"></div>
        <p className="vertical-text text-[10px] uppercase tracking-[0.6em] font-black opacity-60 luxury-text-shadow [writing-mode:vertical-lr] rotate-180">Becky Maldeney</p>
      </div>

      {/* Discover Progress Bar */}
      <div className="absolute bottom-20 right-12 hidden md:flex flex-col items-end text-white z-20">
        <span className="text-[11px] font-sans tracking-[0.5em] mb-4 font-black uppercase opacity-90 luxury-text-shadow">Explore</span>
        <div className="w-32 h-[4px] bg-white/10 relative overflow-hidden rounded-full border border-white/5">
          <div className="absolute left-0 top-0 h-full w-full bg-gold -translate-x-full animate-[reveal_4s_infinite] ease-in-out"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
