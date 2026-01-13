
import React, { useEffect, useCallback, memo } from 'react';
import { X, Bed, Bath, Maximize, MapPin, Check, Phone, Mail, Calendar } from 'lucide-react';
import { Property } from '../types';
import { AGENT_INFO, UI_CONFIG } from '../constants';

interface PropertyModalProps {
  property: Property;
  onClose: () => void;
}

const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose }) => {
  useEffect(() => {
    document.body.classList.add('body-lock');
    return () => {
      document.body.classList.remove('body-lock');
    };
  }, []);

  const handleShowingRequest = useCallback(() => {
    onClose();
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementRect - bodyRect - UI_CONFIG.SCROLL_OFFSET;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, UI_CONFIG.AUTOFILL_DELAY);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-8 lg:p-16 animate-reveal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="absolute inset-0 bg-noir/95 backdrop-blur-3xl transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative bg-ivory w-full max-w-7xl h-full md:h-[95vh] lg:h-[90vh] md:rounded-[4rem] overflow-hidden flex flex-col md:flex-row shadow-3xl border border-white/10">
        
        {/* Mobile Header */}
        <div className="md:hidden absolute top-0 left-0 w-full z-[210] flex justify-end p-5 pointer-events-none">
           <button 
            onClick={onClose} 
            className="pointer-events-auto bg-noir/60 backdrop-blur-xl text-white p-3 rounded-full border border-white/20 shadow-2xl active:scale-90 transition-transform"
            aria-label="Close details"
           >
             <X size={20} />
           </button>
        </div>

        {/* Imagery Pipeline */}
        <div className="w-full md:w-[50%] lg:w-[55%] h-[280px] xs:h-[350px] md:h-full relative overflow-hidden bg-noir flex-shrink-0">
           <img 
            src={property.imageUrl} 
            alt={`Exterior view of ${property.title}`} 
            className="w-full h-full object-cover opacity-90"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/20 to-transparent" />
           <div className="absolute bottom-6 left-6 right-6 md:bottom-20 md:left-20">
              <h2 id="modal-title" className="text-3xl xs:text-4xl md:text-7xl lg:text-8xl font-serif italic text-white leading-[1.1] md:leading-tight luxury-text-shadow font-bold">{property.title}</h2>
              <p className="flex items-center text-[9px] md:text-xs text-white/90 uppercase tracking-[0.3em] md:tracking-[0.4em] font-black mt-3 md:mt-6 luxury-text-shadow">
                 <MapPin size={12} className="mr-2 md:mr-3 text-gold" />
                 {property.address}
              </p>
           </div>
        </div>

        {/* Intelligence Layer */}
        <div className="flex-1 p-6 md:p-16 lg:p-24 overflow-y-auto bg-ivory hide-scrollbar space-y-10 md:space-y-16 pb-32 md:pb-24">
           <div className="flex justify-between items-start">
              <div className="space-y-2 md:space-y-4">
                 <p className="text-[9px] md:text-[12px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-noir/30 font-black">Asset Valuation</p>
                 <p className="text-3xl md:text-5xl lg:text-7xl font-serif text-gold font-bold tracking-tighter">${property.price.toLocaleString()}</p>
                 <p className="text-[10px] md:text-sm text-noir/40 font-bold uppercase tracking-[0.3em] md:tracking-[0.4em]">{property.neighborhood}</p>
              </div>
              <button onClick={onClose} className="hidden md:flex bg-noir/5 p-5 rounded-full hover:bg-noir hover:text-white transition-all active:scale-95">
                <X size={32} />
              </button>
           </div>

           {/* Core Metrics */}
           <div className="grid grid-cols-3 gap-2 md:gap-8 py-6 md:py-12 border-y border-noir/5">
              {[
                { icon: Bed, val: property.beds, label: 'Suites' },
                { icon: Bath, val: property.baths, label: 'Baths' },
                { icon: Maximize, val: property.sqft.toLocaleString(), label: 'Sq Ft' }
              ].map((stat, i) => (
                <div key={i} className="text-center space-y-1 md:space-y-3">
                   <stat.icon size={16} className="mx-auto text-gold mb-1 md:mb-2 opacity-60" />
                   <p className="text-lg md:text-3xl font-serif font-bold tracking-tighter">{stat.val}</p>
                   <p className="text-[7px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-noir/30 font-black">{stat.label}</p>
                </div>
              ))}
           </div>

           {/* Description & Features */}
           <div className="space-y-8 md:space-y-12">
              <div className="space-y-4 md:space-y-6">
                 <h3 className="text-[9px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.5em] font-black text-noir/30">Narrative</h3>
                 <p className="text-noir/80 text-base md:text-2xl font-serif italic leading-relaxed">"{property.description}"</p>
              </div>

              <div className="space-y-4 md:space-y-8">
                 <h3 className="text-[9px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.5em] font-black text-noir/30">Specifications</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
                    {property.features.map((f, i) => (
                       <div key={i} className="flex items-center space-x-2 md:space-x-3 text-noir/60 font-medium">
                          <Check size={12} className="text-gold flex-shrink-0" />
                          <span className="text-[13px] md:text-[15px] tracking-tight">{f}</span>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Actions */}
           <div className="fixed md:static bottom-0 left-0 w-full md:w-auto bg-ivory/95 backdrop-blur-xl md:bg-transparent p-4 md:p-0 border-t border-noir/5 md:border-none space-y-3 md:space-y-6 pb-[max(1rem,env(safe-area-inset-bottom))] md:pb-0">
              <button 
                onClick={handleShowingRequest}
                className="w-full bg-noir text-white py-4 md:py-8 rounded-sm font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[12px] hover:bg-gold hover:text-noir transition-all shadow-xl group relative overflow-hidden active:scale-[0.98]"
              >
                 <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                 <span className="relative z-10 flex items-center justify-center gap-2 md:gap-4">
                   <Calendar size={16} /> Request Private Brief
                 </span>
              </button>
              
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                 <a href={`tel:${AGENT_INFO.phone}`} className="flex items-center justify-center space-x-2 border border-noir/10 py-3 md:py-6 text-[8px] md:text-[10px] font-black uppercase tracking-widest hover:border-gold hover:text-gold transition-all">
                    <Phone size={12} /> <span>Voice</span>
                 </a>
                 <a href={`mailto:${AGENT_INFO.email}`} className="flex items-center justify-center space-x-2 border border-noir/10 py-3 md:py-6 text-[8px] md:text-[10px] font-black uppercase tracking-widest hover:border-gold hover:text-gold transition-all">
                    <Mail size={12} /> <span>Email</span>
                 </a>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PropertyModal);
