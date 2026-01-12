
import React, { memo } from 'react';
import { ArrowUpRight, Bed, Bath, Maximize, Search } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onOpen: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onOpen }) => {
  return (
    <div 
      className="group relative bg-white flex flex-col h-full border border-noir/5 hover:border-gold/40 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-sm overflow-hidden cursor-pointer shadow-sm hover:shadow-3xl"
      onClick={() => onOpen(property)}
    >
      {/* Status Badge */}
      <div className="absolute top-6 left-6 z-20">
        <span className="px-4 py-1.5 bg-noir/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm">
          {property.status}
        </span>
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-noir/5">
        <img 
          src={property.imageUrl} 
          alt={property.title} 
          className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-noir/95 via-noir/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
           <div className="bg-white/20 backdrop-blur-2xl p-3 rounded-full text-white border border-white/30 shadow-2xl">
              <Search size={16} />
           </div>
        </div>

        {/* Hover Text Content */}
        <div className="absolute bottom-0 left-0 w-full p-8 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
           <div className="flex justify-between items-end text-white">
              <div className="space-y-2">
                 <p className="text-[10px] uppercase tracking-[0.4em] text-gold font-black">Architecture</p>
                 <h4 className="text-3xl font-serif italic font-bold tracking-tight">{property.title}</h4>
              </div>
              <div className="bg-gold p-4 rounded-full text-noir shadow-2xl transform hover:rotate-12 transition-transform">
                 <ArrowUpRight size={22} />
              </div>
           </div>
        </div>
      </div>
      
      {/* Static Info Area */}
      <div className="p-8 md:p-10 flex-1 flex flex-col justify-between transition-colors duration-500">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-[11px] uppercase tracking-[0.5em] font-black text-noir/30 group-hover:text-gold/60 transition-colors">{property.neighborhood}</p>
            <span className="text-xl font-bold text-gold font-serif">${property.price.toLocaleString()}</span>
          </div>
          <h3 className="text-3xl font-serif text-noir leading-tight tracking-tighter group-hover:text-gold transition-colors duration-500">{property.title}</h3>
        </div>

        {/* Stats Grid - Typographically Optimized */}
        <div className="flex items-center justify-between pt-8 border-t border-noir/5 mt-8">
          <div className="flex space-x-8">
            <div className="flex items-center space-x-3 text-noir/60">
              <Bed size={16} className="text-gold/60" />
              <span className="text-[12px] font-black uppercase tracking-[0.2em]">{property.beds}</span>
            </div>
            <div className="flex items-center space-x-3 text-noir/60">
              <Bath size={16} className="text-gold/60" />
              <span className="text-[12px] font-black uppercase tracking-[0.2em]">{property.baths}</span>
            </div>
            <div className="flex items-center space-x-3 text-noir/60">
              <Maximize size={16} className="text-gold/60" />
              <span className="text-[12px] font-black uppercase tracking-[0.2em]">{property.sqft.toLocaleString()}</span>
            </div>
          </div>
          <div className="text-[10px] uppercase tracking-[0.4em] font-black text-noir/20 group-hover:text-gold transition-all">
            Examine
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PropertyCard);
