
import React, { useState, useRef, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PropertyCard from './components/PropertyCard';
import PropertyModal from './components/PropertyModal';
import MarketAssistant from './components/MarketAssistant';
import ContactForm from './components/ContactForm';
import { MOCK_PROPERTIES, AGENT_INFO, NEIGHBORHOODS, UI_CONFIG } from './constants';
import { ChevronLeft, ChevronRight, Phone, Mail, Home } from 'lucide-react';
import { Property } from './types';

const App: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Monitor Scroll Progress for UI enrichment
  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / maxHeight) * 100);
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  const scrollNeighborhoods = useCallback((direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    const offset = direction === 'left' ? -scrollAmount : scrollAmount;
    container.scrollBy({ left: offset, behavior: 'smooth' });
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const offsetPosition = elementRect - bodyRect - UI_CONFIG.SCROLL_OFFSET;

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }, []);

  const handleOpenProperty = useCallback((p: Property) => {
    setSelectedProperty(p);
  }, []);

  const handleCloseProperty = useCallback(() => {
    setSelectedProperty(null);
  }, []);

  return (
    <div className="min-h-screen bg-ivory font-body selection:bg-gold selection:text-noir overflow-x-hidden">
      {/* Scroll Progress Bar - Elite UI Detail */}
      <div className="fixed top-0 left-0 h-[2px] bg-gold z-[1000] transition-all duration-150" style={{ width: `${scrollProgress}%` }} />

      <Header onNavigate={scrollToSection} />
      
      <main className="relative">
        <Hero onSearch={() => scrollToSection('listings')} />

        {/* Philosophy Section */}
        <section 
          id="philosophy" 
          role="region" 
          aria-labelledby="philosophy-title"
          className="relative z-10 border-b border-noir/5 bg-white py-24 md:py-48"
        >
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-6xl space-y-12 text-center md:space-y-20">
               <div className="flex flex-col items-center space-y-8">
                  <div className="h-20 w-[1px] bg-gold/40"></div>
                  <h2 id="philosophy-title" className="font-black text-[12px] uppercase tracking-[0.7em] text-noir/40 md:text-[14px]">The Philosophy</h2>
               </div>
               <p className="font-serif text-4xl leading-[0.95] tracking-tighter text-noir text-balance sm:text-6xl md:text-8xl lg:text-9xl">
                 Representation for <br className="hidden lg:block" /> Significant <span className="italic font-bold text-gold">Architectural Legacy</span>.
               </p>
               <div className="mx-auto max-w-3xl space-y-8">
                 <p className="font-serif text-xl italic leading-[1.4] text-noir/80 text-balance md:text-3xl lg:text-4xl">
                   Becky Maldeney facilitates the acquisition of DeKalb County's most exclusive estates with surgical precision.
                 </p>
                 <div className="mx-auto h-px w-24 bg-gold"></div>
               </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section 
          id="listings" 
          role="region" 
          aria-labelledby="listings-title"
          className="relative z-10 scroll-mt-24 bg-ivory py-24 md:py-48"
        >
          <div className="container mx-auto px-6">
            <div className="mb-24 flex flex-col items-start justify-between space-y-8 md:mb-32 md:flex-row md:items-end md:space-y-0">
               <div className="space-y-6">
                  <h3 id="listings-title" className="font-serif text-6xl font-bold leading-[0.85] tracking-tighter text-noir md:text-8xl lg:text-[10rem]">The <br className="hidden md:block" /><span className="italic text-gold">Collection.</span></h3>
                  <p className="font-black text-[12px] uppercase tracking-[0.6em] text-noir/40 md:text-[14px]">Curated Private Inventory</p>
               </div>
               <div className="md:mb-6">
                  <p className="hidden font-serif text-xl italic leading-snug text-noir/60 text-balance md:block md:text-2xl lg:max-w-xs lg:text-right">
                    Bespoke estates, golf course villas, and legacy properties in Auburn.
                  </p>
               </div>
            </div>

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              {MOCK_PROPERTIES.map(prop => (
                <PropertyCard 
                  key={prop.id}
                  property={prop} 
                  onOpen={handleOpenProperty}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Districts Section */}
        <section 
          id="neighborhoods" 
          role="region" 
          aria-labelledby="districts-title"
          className="relative z-10 scroll-mt-24 bg-noir py-24 text-white shadow-2xl md:py-48"
        >
          <div className="container mx-auto px-6">
             <div className="mb-24 flex flex-col items-start justify-between md:mb-32 md:flex-row md:items-end">
                <div className="space-y-8">
                    <h3 id="districts-title" className="mb-4 font-serif text-6xl font-bold leading-[0.8] tracking-tighter md:text-9xl lg:text-[12rem]">The <br className="hidden md:block" /><span className="gold-shimmer italic text-gold">Districts.</span></h3>
                    <p className="font-black text-[12px] uppercase tracking-[0.7em] text-white/40 md:text-[14px]">Strategic Neighborhood Profiles</p>
                </div>
                <div className="mt-12 flex space-x-6 md:mt-0">
                   <button onClick={() => scrollNeighborhoods('left')} className="group flex h-16 w-16 items-center justify-center rounded-full border border-white/10 transition-all hover:bg-gold hover:text-noir md:h-24 md:w-24" aria-label="Scroll districts left"><ChevronLeft size={32} className="transition-transform group-hover:-translate-x-1" /></button>
                   <button onClick={() => scrollNeighborhoods('right')} className="group flex h-16 w-16 items-center justify-center rounded-full border border-white/10 transition-all hover:bg-gold hover:text-noir md:h-24 md:w-24" aria-label="Scroll districts right"><ChevronRight size={32} className="transition-transform group-hover:translate-x-1" /></button>
                </div>
             </div>

             <div ref={scrollContainerRef} className="hide-scrollbar flex flex-nowrap space-x-12 overflow-x-auto pb-16 snap-x scroll-smooth md:space-x-20">
                {NEIGHBORHOODS.map(nb => (
                  <div key={nb.id} className="min-w-[320px] snap-center group cursor-pointer sm:min-w-[500px] md:min-w-[800px]">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-white/10 transition-all duration-700 group-hover:border-gold/30">
                       <img 
                        src={nb.imageUrl} 
                        className="h-full w-full object-cover opacity-50 grayscale transition-all duration-[2000ms] group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 md:opacity-30" 
                        alt={nb.name}
                        loading="lazy"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/10 to-transparent"></div>
                       <div className="absolute bottom-12 left-12 space-y-4 md:bottom-16 md:left-16">
                          <p className="font-black text-[12px] uppercase tracking-[0.5em] text-gold md:text-[14px]">{nb.averagePrice}</p>
                          <h4 className="font-serif text-4xl font-bold leading-none tracking-tighter md:text-7xl">{nb.name}</h4>
                          <p className="font-serif text-lg italic text-white/60 opacity-0 transition-opacity delay-200 duration-700 group-hover:opacity-100 md:text-2xl">{nb.vibe}</p>
                       </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* Contact Section */}
        <section 
          id="contact" 
          role="region" 
          aria-labelledby="contact-title"
          className="relative z-10 bg-white py-24 md:py-48"
        >
           <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 items-start gap-24 md:gap-40 lg:grid-cols-2">
                 <div className="sticky top-40 space-y-16 md:space-y-24">
                    <div className="space-y-8 md:space-y-12">
                       <h2 id="contact-title" className="font-serif text-6xl font-bold leading-[0.85] tracking-tighter text-noir md:text-8xl lg:text-9xl">Private <br className="hidden md:block" /><span className="gold-shimmer italic text-gold">Consultation.</span></h2>
                       <div className="max-w-lg space-y-6">
                          <p className="font-serif text-xl italic leading-relaxed text-noir/70 text-balance md:text-3xl">
                            Exclusivity is our standard. Our team facilitates high-value acquisitions with absolute discretion.
                          </p>
                          <div className="h-[1px] w-20 bg-gold"></div>
                       </div>
                    </div>
                    <div className="space-y-10 md:space-y-14">
                       <div className="group flex cursor-pointer items-center space-x-8">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-noir text-white shadow-xl transition-all group-hover:bg-gold group-hover:text-noir md:h-20 md:w-20"><Phone size={24}/></div>
                          <div className="flex flex-col">
                            <span className="font-black text-[10px] uppercase tracking-[0.4em] text-noir/30">Direct Line</span>
                            <a href={`tel:${AGENT_INFO.phone}`} className="text-2xl font-bold uppercase tracking-widest text-noir transition-colors hover:text-gold md:text-4xl">{AGENT_INFO.phone}</a>
                          </div>
                       </div>
                       <div className="group flex cursor-pointer items-center space-x-8">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-noir text-white shadow-xl transition-all group-hover:bg-gold group-hover:text-noir md:h-20 md:w-20"><Mail size={24}/></div>
                          <div className="flex flex-col">
                             <span className="font-black text-[10px] uppercase tracking-[0.4em] text-noir/30">Secure Email</span>
                             <a href={`mailto:${AGENT_INFO.email}`} className="text-2xl font-bold leading-none tracking-tight text-noir transition-colors hover:text-gold text-balance md:text-3xl">{AGENT_INFO.email}</a>
                          </div>
                       </div>
                    </div>
                 </div>
                 <ContactForm />
              </div>
           </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/5 bg-noir py-24 md:py-40 text-white">
         <div className="container mx-auto px-6">
            <div className="flex flex-col items-start justify-between space-y-20 lg:flex-row lg:space-y-0">
               <div className="space-y-12">
                  <div className="font-serif text-5xl font-black tracking-tighter md:text-6xl">BM<span className="text-gold">.</span></div>
                  <div className="space-y-4">
                    <p className="font-sans font-bold text-[12px] uppercase leading-relaxed tracking-[0.5em] text-white/60 md:text-[14px]">
                      {AGENT_INFO.business}
                    </p>
                    <p className="font-sans font-medium text-[11px] uppercase tracking-[0.4em] text-white/30">
                      {AGENT_INFO.office}
                    </p>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-24 md:gap-40">
                  <div className="space-y-10 md:space-y-12">
                    <p className="font-black text-[12px] uppercase tracking-[0.6em] text-gold md:text-[14px]">Access</p>
                    <nav className="flex flex-col space-y-6">
                      <button onClick={() => scrollToSection('listings')} className="font-black text-[11px] uppercase tracking-[0.4em] text-white/40 transition-all hover:text-white text-left">The Portfolio</button>
                      <button onClick={() => scrollToSection('neighborhoods')} className="font-black text-[11px] uppercase tracking-[0.4em] text-white/40 transition-all hover:text-white text-left">Districts</button>
                      <button onClick={() => scrollToSection('contact')} className="font-black text-[11px] uppercase tracking-[0.4em] text-white/40 transition-all hover:text-white text-left">Consultation</button>
                    </nav>
                  </div>
                  <div className="space-y-10 md:space-y-12">
                    <p className="font-black text-[12px] uppercase tracking-[0.6em] text-gold md:text-[14px]">Profiles</p>
                    <nav className="flex flex-col space-y-6">
                      <a href="#" className="font-black text-[11px] uppercase tracking-[0.4em] text-white/40 transition-all hover:text-white">Instagram</a>
                      <a href="#" className="font-black text-[11px] uppercase tracking-[0.4em] text-white/40 transition-all hover:text-white">LinkedIn</a>
                    </nav>
                  </div>
               </div>
            </div>
            <div className="mt-32 flex flex-col items-center justify-between space-y-8 border-t border-white/5 pt-16 font-black text-[11px] uppercase tracking-[0.4em] text-white/20 md:flex-row md:space-y-0">
               <p>© {new Date().getFullYear()} Becky Maldeney • Indiana Real Estate Inc.</p>
               <div className="flex items-center space-x-12">
                  <span className="flex items-center"><Home size={14} className="mr-4 text-gold/40"/> Equal Housing Opportunity</span>
                  <span className="rounded-sm border border-gold/20 px-4 py-1.5 text-gold/60">REALTOR®</span>
               </div>
            </div>
         </div>
      </footer>

      <MarketAssistant />

      {selectedProperty && (
        <PropertyModal 
          property={selectedProperty} 
          onClose={handleCloseProperty} 
        />
      )}
    </div>
  );
};

export default App;
