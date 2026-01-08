
import React from 'react';
import { ArrowUpRight, Bed, Bath, Maximize, Search } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onOpen: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onOpen }) => {
  return (
    <div 
      className="group relative bg-white flex flex-col h-full border border-gray-100 hover:border-gold/50 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] hover:-translate-y-3 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] rounded-3xl overflow-hidden cursor-pointer"
      onClick={() => onOpen(property)}
    >
      {/* Status Badge */}
      <div className="absolute top-6 left-6 z-20">
        <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-noir text-[9px] font-bold uppercase tracking-[0.2em] rounded-full border border-noir/5">
          {property.status}
        </span>
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img 
          src={property.imageUrl} 
          alt={property.title} 
          className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        {/* Quick View Button - Appears on Hover */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
           <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white border border-white/20">
              <Search size={16} />
           </div>
        </div>

        {/* Hover Info Overlay - Slides up */}
        <div className="absolute bottom-0 left-0 w-full p-8 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-75">
           <div className="flex justify-between items-end text-white">
              <div className="space-y-2">
                 <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Featured Listing</p>
                 <h4 className="text-2xl font-serif italic leading-tight">{property.title}</h4>
              </div>
              <div className="bg-gold p-4 rounded-2xl text-noir transform group-hover:rotate-12 transition-transform duration-500 shadow-xl">
                 <ArrowUpRight size={24} />
              </div>
           </div>
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-8 flex-1 flex flex-col justify-between bg-white group-hover:bg-ivory/50 transition-colors duration-700">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-noir/30">{property.neighborhood}</p>
            <span className="text-xl font-medium text-gold font-serif">${property.price.toLocaleString()}</span>
          </div>
          <h3 className="text-3xl font-serif text-noir leading-[1.1] tracking-tighter group-hover:text-gold transition-colors duration-500">{property.title}</h3>
        </div>

        {/* Stats Grid */}
        <div className="flex items-center justify-between pt-8 border-t border-gray-100 mt-8">
          <div className="flex space-x-6">
            <div className="flex items-center space-x-2 text-noir/40 group-hover:text-noir/80 transition-colors">
              <Bed size={14} className="text-gold" />
              <span className="text-[11px] font-bold uppercase tracking-widest">{property.beds}</span>
            </div>
            <div className="flex items-center space-x-2 text-noir/40 group-hover:text-noir/80 transition-colors">
              <Bath size={14} className="text-gold" />
              <span className="text-[11px] font-bold uppercase tracking-widest">{property.baths}</span>
            </div>
            <div className="flex items-center space-x-2 text-noir/40 group-hover:text-noir/80 transition-colors">
              <Maximize size={14} className="text-gold" />
              <span className="text-[11px] font-bold uppercase tracking-widest">{property.sqft.toLocaleString()}</span>
            </div>
          </div>
          <div className="text-[9px] uppercase tracking-widest font-bold text-gold opacity-0 group-hover:opacity-100 transition-opacity">
            Quick View
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
