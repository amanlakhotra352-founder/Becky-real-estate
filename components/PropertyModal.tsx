
import React, { useEffect } from 'react';
import { X, Bed, Bath, Maximize, MapPin, Check, Phone, Mail, Calendar } from 'lucide-react';
import { Property } from '../types';
import { AGENT_INFO } from '../constants';

interface PropertyModalProps {
  property: Property;
  onClose: () => void;
}

const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleRequestShowing = () => {
    onClose();
    // Allow modal close animation before scrolling
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = contactSection.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-12 animate-reveal">
      <div 
        className="absolute inset-0 bg-noir/98 backdrop-blur-2xl"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white w-full max-w-7xl h-full md:h-[95vh] lg:h-[90vh] md:rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-3xl border border-noir/5">
        {/* Mobile Header / Close */}
        <div className="absolute top-0 left-0 w-full z-[120] md:hidden flex justify-between items-center p-6 bg-gradient-to-b from-noir/80 to-transparent pointer-events-none">
           <button 
            onClick={onClose}
            className="pointer-events-auto bg-noir/50 backdrop-blur-xl text-white p-3.5 rounded-full border border-white/20 shadow-xl"
            aria-label="Close details"
           >
            <X size={22} />
           </button>
           <span className="pointer-events-auto bg-gold px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
             {property.status}
           </span>
        </div>

        {/* Cinematic Imagery Section */}
        <div className="w-full md:w-[55%] lg:w-[60%] h-[400px] sm:h-[500px] md:h-full relative overflow-hidden bg-noir flex-shrink-0">
           <img 
            src={property.imageUrl} 
            alt={property.title} 
            className="w-full h-full object-cover opacity-90"
            loading="eager"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent"></div>
           
           <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12">
              <div className="max-w-xl space-y-4">
                 <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-white leading-tight luxury-text-shadow font-bold">{property.title}</h2>
                 <p className="flex items-center text-[11px] md:text-xs text-white uppercase tracking-[0.25em] font-black luxury-text-shadow">
                    <MapPin size={14} className="mr-3 text-gold flex-shrink-0" />
                    {property.address}
                 </p>
              </div>
           </div>
        </div>

        {/* Narrative & Details Section */}
        <div className="flex-1 p-8 md:p-14 lg:p-16 overflow-y-auto flex flex-col space-y-10 md:space-y-12 bg-white scroll-smooth hide-scrollbar">
           <div className="flex justify-between items-start">
              <div className="space-y-3">
                 <p className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] text-noir/30 font-black">{property.neighborhood}</p>
                 <p className="text-4xl md:text-5xl lg:text-6xl font-serif text-gold font-bold">${property.price.toLocaleString()}</p>
              </div>
              <button 
                onClick={onClose}
                className="hidden md:flex bg-noir/5 p-5 rounded-full hover:bg-noir hover:text-white transition-all shadow-sm"
                aria-label="Close modal"
              >
                <X size={28} />
              </button>
           </div>

           {/* Architectural Stats Grid */}
           <div className="grid grid-cols-3 gap-4 py-10 border-y border-noir/5">
              <div className="text-center space-y-2">
                 <Bed size={22} className="mx-auto text-gold mb-1" />
                 <p className="text-2xl lg:text-3xl font-serif font-bold">{property.beds}</p>
                 <p className="text-[9px] lg:text-[10px] uppercase tracking-widest text-noir/40 font-black">Bedrooms</p>
              </div>
              <div className="text-center space-y-2 border-x border-noir/5 px-4">
                 <Bath size={22} className="mx-auto text-gold mb-1" />
                 <p className="text-2xl lg:text-3xl font-serif font-bold">{property.baths}</p>
                 <p className="text-[9px] lg:text-[10px] uppercase tracking-widest text-noir/40 font-black">Bathrooms</p>
              </div>
              <div className="text-center space-y-2">
                 <Maximize size={22} className="mx-auto text-gold mb-1" />
                 <p className="text-2xl lg:text-3xl font-serif font-bold">{property.sqft.toLocaleString()}</p>
                 <p className="text-[9px] lg:text-[10px] uppercase tracking-widest text-noir/40 font-black">Living Area</p>
              </div>
           </div>

           {/* Narrative */}
           <div className="space-y-6">
              <h3 className="text-[11px] lg:text-[12px] uppercase tracking-[0.4em] font-black text-noir">Property Narrative</h3>
              <p className="text-noir/80 text-lg md:text-xl lg:text-2xl font-medium leading-relaxed font-serif italic border-l-4 border-gold/20 pl-8">
                "{property.description}"
              </p>
           </div>

           {/* Key Elements & Features */}
           <div className="space-y-6">
              <h3 className="text-[11px] lg:text-[12px] uppercase tracking-[0.4em] font-black text-noir">Distinguishing Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {property.features.map((f, i) => (
                    <div key={i} className="flex items-center space-x-4 text-[14px] md:text-base text-noir/70 font-medium">
                       <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                         <Check size={14} className="text-gold" />
                       </div>
                       <span className="truncate">{f}</span>
                    </div>
                 ))}
              </div>
           </div>

           {/* Conversion Hub */}
           <div className="pt-10 md:pt-14 pb-6 space-y-4 md:space-y-6 mt-auto">
              <button 
                onClick={handleRequestShowing}
                className="w-full bg-noir text-white py-6 md:py-8 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] md:text-xs hover:bg-gold hover:text-noir transition-all shadow-2xl flex items-center justify-center space-x-4 group animate-pulse-glow"
              >
                 <Calendar size={20} className="group-hover:scale-110 transition-transform" />
                 <span>Request Private Showing</span>
              </button>
              
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                 <a 
                  href={`tel:${AGENT_INFO.phone}`}
                  className="flex items-center justify-center space-x-3 border-2 border-noir/10 py-5 md:py-6 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-noir hover:bg-noir/5 transition-all"
                 >
                    <Phone size={16} />
                    <span>Secure Line</span>
                 </a>
                 <a 
                  href={`mailto:${AGENT_INFO.email}`}
                  className="flex items-center justify-center space-x-3 border-2 border-noir/10 py-5 md:py-6 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-noir hover:bg-noir/5 transition-all"
                 >
                    <Mail size={16} />
                    <span>Email Brief</span>
                 </a>
              </div>
           </div>
           
           <div className="pt-6 text-center">
              <p className="text-[9px] uppercase tracking-[0.4em] text-noir/20 font-black">Indiana Regional MLS • Property ID: #{property.id}AUB</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
