
import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PropertyCard from './components/PropertyCard';
import PropertyModal from './components/PropertyModal';
import MarketAssistant from './components/MarketAssistant';
import ContactForm from './components/ContactForm';
import { MOCK_PROPERTIES, AGENT_INFO, NEIGHBORHOODS } from './constants';
import { Sparkles, MoveRight, ChevronLeft, ChevronRight, Phone, MessageCircle, Instagram, Linkedin, Home, ArrowUpRight, Mail, MapPin, Navigation } from 'lucide-react';
import { Property } from './types';

const App: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollNeighborhoods = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -500 : 500;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100; // Account for sticky header
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

  const cleanPhone = AGENT_INFO.phone.replace(/\D/g, '');
  const encodedAddress = encodeURIComponent(AGENT_INFO.office);

  return (
    <div className="min-h-screen font-body selection:bg-gold selection:text-noir relative overflow-x-hidden bg-ivory">
      <Header />
      
      <main className="relative">
        <Hero />

        {/* Live Market Ticker */}
        <div className="bg-noir py-5 border-y border-white/5 overflow-hidden whitespace-nowrap z-20 relative shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <div className="inline-block animate-marquee">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-gold mx-12 md:mx-20 font-black inline-flex items-center">
                <Sparkles size={12} className="mr-4 text-white/40" />
                Featured: {MOCK_PROPERTIES[0].title} — <span className="text-white ml-2">${MOCK_PROPERTIES[0].price.toLocaleString()}</span> — Exclusive Opportunity
              </span>
            ))}
          </div>
        </div>

        {/* Brand Philosophy Section */}
        <section id="philosophy" className="py-24 md:py-40 bg-ivory scroll-mt-24 relative z-10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              <div className="lg:col-span-5 space-y-8 md:space-y-10">
                 <div className="w-16 md:w-24 h-[3px] bg-gold"></div>
                 <h2 className="text-[11px] md:text-[12px] uppercase tracking-[0.5em] md:tracking-[0.6em] text-noir/40 font-black">Our Philosophy</h2>
                 <p className="text-xl md:text-3xl font-serif leading-relaxed text-noir">
                   In the world of ultra-luxury, real estate is not merely a transaction. <br className="hidden md:block" />
                   <span className="text-gold italic font-bold">It is the curation of a legacy.</span>
                 </p>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                 <p className="text-3xl sm:text-5xl md:text-6xl font-serif text-noir leading-snug tracking-tighter">
                   Becky Maldeney specializes in the acquisition of properties that define the Auburn landscape.
                 </p>
                 <div className="mt-10 md:mt-16 flex flex-wrap gap-10 md:gap-20">
                   <div className="group cursor-default">
                     <p className="text-4xl md:text-7xl font-serif text-gold group-hover:scale-105 transition-transform origin-left font-bold">15+</p>
                     <p className="text-[10px] md:text-[11px] uppercase tracking-widest mt-2 md:mt-4 text-noir/40 font-black">Years of Heritage</p>
                   </div>
                   <div className="group cursor-default">
                     <p className="text-4xl md:text-7xl font-serif text-gold group-hover:scale-105 transition-transform origin-left font-bold">$120M+</p>
                     <p className="text-[10px] md:text-[11px] uppercase tracking-widest mt-2 md:mt-4 text-noir/40 font-black">Private Volume</p>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Immersive Listings Grid */}
        <section id="listings" className="py-24 md:py-40 border-t border-noir/5 bg-white overflow-visible scroll-mt-24 relative z-10">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-28 space-y-8 md:space-y-0">
               <div className="space-y-4 md:space-y-6">
                  <h3 className="text-4xl md:text-8xl font-serif tracking-tighter font-black">The Portfolio.</h3>
                  <p className="text-noir/50 font-medium text-lg md:text-2xl italic font-serif">A curated collection of DeKalb County's premier addresses.</p>
               </div>
               <div className="flex items-center space-x-6">
                  <span className="hidden sm:inline text-[11px] uppercase tracking-widest text-noir/40 font-black">Private Access</span>
                  <div className="hidden sm:block w-16 h-[1.5px] bg-noir/10"></div>
                  <button 
                    onClick={() => scrollToSection('listings')}
                    className="bg-noir text-white px-8 md:px-14 py-4 md:py-6 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-widest hover:bg-gold hover:text-noir transition-all duration-500 shadow-2xl"
                  >
                    Browse All
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
              {MOCK_PROPERTIES.map(prop => (
                <div key={prop.id} className="h-full">
                   <PropertyCard 
                    property={prop} 
                    onOpen={(p) => setSelectedProperty(p)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Neighborhood Showcase */}
        <section id="neighborhoods" className="py-24 md:py-40 bg-noir text-white overflow-hidden scroll-mt-24 relative z-10">
          <div className="container mx-auto px-6">
             <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-28">
                <div className="max-w-3xl space-y-6 md:space-y-10">
                    <h3 className="text-5xl sm:text-8xl md:text-[10vw] font-serif leading-[1.1] md:leading-[1.0] tracking-tighter text-white font-black">Auburn <br className="hidden md:block" /><span className="text-gold italic gold-shimmer">Districts.</span></h3>
                    <p className="text-white/40 text-lg md:text-2xl font-medium max-w-2xl leading-relaxed italic font-serif">
                      Discover the enclaves that offer not just residency, but a distinguished lifestyle.
                    </p>
                </div>
                <div className="flex space-x-4 md:space-x-6 mt-10 md:mt-0">
                   <button 
                    onClick={() => scrollNeighborhoods('left')}
                    className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-noir transition-all hover:scale-110 active:scale-95"
                    aria-label="Scroll left"
                   >
                      <ChevronLeft size={20} className="md:w-6 md:h-6" />
                   </button>
                   <button 
                    onClick={() => scrollNeighborhoods('right')}
                    className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-noir transition-all hover:scale-110 active:scale-95"
                    aria-label="Scroll right"
                   >
                      <ChevronRight size={20} className="md:w-6 md:h-6" />
                   </button>
                </div>
             </div>

             <div 
              ref={scrollContainerRef}
              className="flex flex-nowrap overflow-x-auto space-x-6 md:space-x-12 pb-12 snap-x hide-scrollbar scroll-smooth"
             >
                {NEIGHBORHOODS.map(nb => (
                  <div key={nb.id} className="min-w-[280px] sm:min-w-[480px] md:min-w-[700px] snap-center group cursor-pointer">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] md:rounded-[4rem] mb-6 md:mb-10 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6)]">
                       <img 
                        src={nb.imageUrl} 
                        className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" 
                        alt={nb.name} 
                        loading="lazy"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                       <div className="absolute bottom-6 left-6 md:bottom-16 md:left-16">
                          <p className="text-gold font-black text-[9px] md:text-[12px] uppercase tracking-[0.4em] md:tracking-[0.6em] mb-2 md:mb-4">{nb.averagePrice}</p>
                          <h4 className="text-3xl md:text-6xl font-serif font-black">{nb.name}</h4>
                       </div>
                    </div>
                    <div className="px-2 md:px-8 space-y-4 md:space-y-6">
                       <p className="text-white/40 text-lg md:text-2xl font-medium leading-relaxed line-clamp-2 italic font-serif">{nb.description}</p>
                       <button className="flex items-center space-x-3 text-gold font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all -translate-y-4 group-hover:translate-y-0">
                          <span>Explore District Profile</span>
                          <MoveRight size={16} />
                       </button>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* About Becky Section */}
        <section id="about" className="py-24 md:py-48 bg-white relative overflow-hidden scroll-mt-24 z-10">
           <div className="container mx-auto px-6">
              <div className="relative flex flex-col lg:block">
                 <div className="lg:w-3/4 ml-auto order-1">
                    <img 
                      src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=90&w=2400" 
                      className="w-full h-[350px] md:h-[800px] object-cover rounded-[2rem] md:rounded-[5rem] shadow-3xl" 
                      alt="Becky Maldeney Real Estate Specialist" 
                      loading="lazy"
                    />
                 </div>
                 <div className="lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-0 lg:w-1/2 bg-white p-8 md:p-20 lg:p-28 rounded-[2rem] md:rounded-[5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] space-y-8 md:space-y-16 border border-noir/5 mt-[-60px] lg:mt-0 relative z-10 order-2">
                    <div className="space-y-4 md:space-y-8">
                       <div className="flex items-center space-x-4 md:space-x-6">
                          <div className="w-12 md:w-16 h-[2px] bg-gold"></div>
                          <span className="text-[10px] md:text-[13px] uppercase tracking-[0.4em] md:tracking-[0.6em] font-black text-noir/30">Executive Broker</span>
                       </div>
                       <h3 className="text-4xl md:text-8xl font-serif text-noir leading-[0.9] md:leading-[0.85] tracking-tighter font-black">Becky <br /><span className="italic text-gold gold-shimmer">Maldeney.</span></h3>
                    </div>
                    
                    <p className="text-noir/60 text-lg md:text-3xl font-medium leading-relaxed italic border-l-4 border-gold/30 pl-6 md:pl-10 font-serif">
                      "Real estate is about more than finding a house; it's about securing a piece of Auburn's heritage for the next generation."
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 pt-4">
                       <button 
                        onClick={() => scrollToSection('contact')}
                        className="bg-noir text-white px-10 py-5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-gold hover:text-noir transition-all duration-500 shadow-2xl active:scale-95"
                       >
                          Schedule Consultation
                       </button>
                       <div className="flex items-center space-x-6">
                          <a href="#" className="w-12 h-12 rounded-full border border-noir/5 flex items-center justify-center cursor-pointer hover:border-gold hover:text-gold transition-all duration-500 group">
                             <Instagram size={20} className="text-noir/30 group-hover:text-gold" />
                          </a>
                          <a href="#" className="w-12 h-12 rounded-full border border-noir/5 flex items-center justify-center cursor-pointer hover:border-gold hover:text-gold transition-all duration-500 group">
                             <Linkedin size={20} className="text-noir/30 group-hover:text-gold" />
                          </a>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Interactive Map Section */}
        <section id="location" className="relative h-[600px] w-full bg-noir overflow-hidden z-10 border-y border-white/5">
           {/* Custom Styled Map Embed */}
           <iframe 
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.API_KEY}&q=${encodedAddress}&maptype=satellite&zoom=16`}
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(1) contrast(1.2) invert(0.9) brightness(0.8)' }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
           ></iframe>
           
           {/* Overlay Info Card */}
           <div className="absolute inset-0 bg-gradient-to-r from-noir/60 via-transparent to-transparent pointer-events-none"></div>
           <div className="container mx-auto px-6 h-full flex items-center relative z-10">
              <div className="max-w-md bg-noir/80 backdrop-blur-xl p-10 md:p-14 rounded-[2rem] border border-white/10 shadow-3xl pointer-events-auto animate-reveal">
                 <div className="space-y-8">
                    <div className="space-y-4">
                       <p className="text-gold text-[10px] uppercase tracking-[0.4em] font-black">Strategic Hub</p>
                       <h3 className="text-4xl font-serif text-white tracking-tighter">Visit the <br />Executive Office.</h3>
                       <p className="text-white/50 text-sm leading-relaxed font-medium">Located in the heart of Auburn, our office serves as the central command for DeKalb County's most exclusive transactions.</p>
                    </div>
                    
                    <div className="space-y-6 pt-4">
                       <div className="flex items-start space-x-4">
                          <MapPin className="text-gold mt-1" size={20} />
                          <div>
                             <p className="text-white font-serif text-lg leading-tight">{AGENT_INFO.office}</p>
                             <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1">Auburn, IN 46706</p>
                          </div>
                       </div>
                    </div>

                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center space-x-4 bg-gold text-noir px-8 py-5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-all w-full shadow-2xl"
                    >
                       <Navigation size={16} className="group-hover:rotate-45 transition-transform" />
                       <span>Get Private Directions</span>
                    </a>
                 </div>
              </div>
           </div>
        </section>

        {/* Contact Hub & Form Section */}
        <section id="contact" className="py-24 md:py-56 bg-noir text-white scroll-mt-24 z-10 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

           <div className="container mx-auto px-6 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                 <div className="lg:col-span-5 space-y-16">
                    <div className="space-y-8">
                       <div className="w-20 h-[2px] bg-gold"></div>
                       <h2 className="text-6xl md:text-[7vw] font-serif leading-[0.9] tracking-tighter font-black">Let's Define <br /><span className="text-gold italic gold-shimmer">Your Future.</span></h2>
                       <p className="text-white/40 text-xl md:text-2xl font-medium leading-relaxed italic font-serif">
                         Whether acquiring a legacy estate or listing a premier residence, your journey deserves a bespoke strategy.
                       </p>
                    </div>

                    <div className="space-y-10">
                       <div className="flex items-start space-x-8 group">
                          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gold transition-all duration-500 group-hover:scale-110">
                             <Phone className="text-gold group-hover:text-noir transition-colors" size={24} />
                          </div>
                          <div className="space-y-2">
                             <p className="text-[10px] uppercase tracking-[0.4em] font-black text-gold">Direct Private Line</p>
                             <a href={`tel:${AGENT_INFO.phone}`} className="text-2xl md:text-3xl font-serif hover:text-gold transition-colors">{AGENT_INFO.phone}</a>
                          </div>
                       </div>

                       <div className="flex items-start space-x-8 group">
                          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gold transition-all duration-500 group-hover:scale-110">
                             <Mail className="text-gold group-hover:text-noir transition-colors" size={24} />
                          </div>
                          <div className="space-y-2">
                             <p className="text-[10px] uppercase tracking-[0.4em] font-black text-gold">Digital Briefing</p>
                             <a href={`mailto:${AGENT_INFO.email}`} className="text-2xl md:text-3xl font-serif hover:text-gold transition-colors break-all">{AGENT_INFO.email}</a>
                          </div>
                       </div>

                       <div className="flex items-start space-x-8 group cursor-pointer" onClick={() => scrollToSection('location')}>
                          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gold transition-all duration-500 group-hover:scale-110">
                             <MapPin className="text-gold group-hover:text-noir transition-colors" size={24} />
                          </div>
                          <div className="space-y-2">
                             <p className="text-[10px] uppercase tracking-[0.4em] font-black text-gold">Executive Office</p>
                             <p className="text-2xl md:text-3xl font-serif">{AGENT_INFO.office}</p>
                          </div>
                       </div>
                    </div>

                    <div className="pt-10 flex space-x-6">
                       <a href="#" className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-all">
                          <Instagram size={24} />
                       </a>
                       <a href="#" className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-all">
                          <Linkedin size={24} />
                       </a>
                    </div>
                 </div>

                 <div className="lg:col-span-7">
                    <ContactForm />
                 </div>
              </div>
           </div>
        </section>
      </main>

      <footer className="py-16 md:py-32 bg-noir border-t border-white/5 relative z-10">
         <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-12 md:space-y-0">
               <div className="flex flex-col items-start space-y-6">
                  <div className="flex flex-col">
                    <span className="text-2xl md:text-4xl font-serif italic text-white tracking-widest uppercase font-bold">Indiana Real Estate</span>
                    <span className="text-gold text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] uppercase font-black mt-2">Elite Regional Services</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] text-white/40 tracking-[0.2em]">{AGENT_INFO.office}</p>
                    <p className="text-[11px] text-white/40 tracking-[0.2em]">{AGENT_INFO.phone} • {AGENT_INFO.email}</p>
                  </div>
               </div>
               
               <div className="flex flex-wrap justify-start md:justify-end gap-8 md:gap-20">
                  <div className="flex flex-col space-y-4">
                    <p className="text-gold text-[9px] uppercase tracking-[0.4em] font-black">Quick Links</p>
                    <button onClick={() => scrollToSection('listings')} className="text-[11px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors text-left">Portfolio</button>
                    <button onClick={() => scrollToSection('neighborhoods')} className="text-[11px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors text-left">Districts</button>
                    <button onClick={() => scrollToSection('about')} className="text-[11px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors text-left">Becky</button>
                    <button onClick={() => scrollToSection('location')} className="text-[11px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors text-left">Location</button>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <p className="text-gold text-[9px] uppercase tracking-[0.4em] font-black">Legal</p>
                    <a href="#" className="text-[11px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="text-[11px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors">Terms</a>
                    <a href="#" className="text-[11px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors">Compliance</a>
                  </div>
               </div>
            </div>
            
            <div className="mt-16 md:mt-28 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 text-center md:text-left">
               <div className="space-y-3">
                 <p className="text-[9px] uppercase tracking-[0.4em] text-white/20">© {new Date().getFullYear()} Becky Maldeney • Indiana Real Estate Inc. • All Rights Reserved</p>
                 <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-white/10">
                    <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] flex items-center"><Home size={10} className="mr-2"/> Equal Housing Opportunity</span>
                    <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em]">REALTOR®</span>
                    <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em]">IRMLS Participant</span>
                 </div>
               </div>
               <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse"></div>
                  <span className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-black">Licensed & Insured in Indiana</span>
               </div>
            </div>
         </div>
      </footer>

      {/* Conversion Hub - Persistent Floating Actions */}
      <div className="fixed inset-0 pointer-events-none z-[150]">
        <MarketAssistant />
        
        <div className="absolute bottom-6 right-6 flex flex-col space-y-4 items-end pointer-events-auto">
          {/* WhatsApp / SMS Direct */}
          <a 
            href={`https://wa.me/${cleanPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:scale-110 transition-all active:scale-95 group border-2 border-white/20"
            aria-label="Secure Consultation Chat"
          >
            <MessageCircle size={24} className="md:w-[30px] md:h-[30px] fill-white" />
          </a>
          
          {/* Direct Private Line */}
          <a 
            href={`tel:${AGENT_INFO.phone}`}
            className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-noir text-gold shadow-xl border-2 border-gold/40 flex items-center justify-center hover:scale-110 transition-all active:scale-95 group"
            aria-label="Direct Private Line"
          >
            <Phone size={22} className="md:w-7 md:h-7 fill-gold" />
          </a>
        </div>
      </div>

      {/* Modal Engine */}
      {selectedProperty && (
        <PropertyModal 
          property={selectedProperty} 
          onClose={() => setSelectedProperty(null)} 
        />
      )}
    </div>
  );
};

export default App;
