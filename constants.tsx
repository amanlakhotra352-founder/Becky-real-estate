
import { Property, Testimonial, Neighborhood } from './types';

export const UI_CONFIG = {
  SLIDESHOW_INTERVAL: 5000,
  SCROLL_THRESHOLD: 50,
  SCROLL_OFFSET: 100,
  AUTOFILL_DELAY: 300,
};

export const AGENT_INFO = {
  name: "Becky Maldeney",
  title: "Participant / Broker",
  business: "Indiana Real Estate Inc.",
  phone: "+1 260-570-5894",
  email: "beckymaldeney@gmail.com",
  office: "4801 County Road 39, Auburn, IN 46706, USA",
  specialties: ["Luxury Homes", "New Construction", "Golf Course Communities", "Estates & Land"],
};

export const NAV_LINKS = [
  { name: 'Portfolio', id: 'listings' },
  { name: 'Districts', id: 'neighborhoods' },
  { name: 'Philosophy', id: 'philosophy' },
  { name: 'Contact', id: 'contact' },
];

export const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=90&w=2000",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=90&w=2000",
  "https://images.unsplash.com/photo-1600607687940-4e7a5235d481?auto=format&fit=crop&q=90&w=2000",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=90&w=2000"
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "1",
    title: "Championship Estates Villa",
    address: "1250 Fairway View Dr, Auburn, IN",
    price: 945000,
    beds: 4,
    baths: 4.5,
    sqft: 4850,
    neighborhood: "Bridgewater Golf Community",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    featured: true,
    status: 'Active',
    description: "Experience the pinnacle of golf course living in this custom-built masterpiece. Featuring panoramic views of the 18th hole, a professional-grade kitchen, and a master suite with private terrace.",
    features: ["Golf Course View", "Chef's Kitchen", "Wine Cellar", "Smart Home Technology"]
  },
  {
    id: "2",
    title: "The Heritage Manor",
    address: "420 Historic Dr, Auburn, IN",
    price: 1250000,
    beds: 5,
    baths: 6,
    sqft: 6200,
    neighborhood: "Rotondo Estates",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
    featured: true,
    status: 'Active',
    description: "A sprawling country estate that combines historic architectural inspiration with ultra-modern amenities. Set on 12 pristine acres with private pond.",
    features: ["12 Acres", "Private Pond", "Guest House", "Home Theater"]
  },
  {
    id: "3",
    title: "Modern Craftsman Retreat",
    address: "88 Watson Way, Auburn, IN",
    price: 785000,
    beds: 4,
    baths: 3.5,
    sqft: 3900,
    neighborhood: "Watson Estates",
    imageUrl: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=800",
    status: 'Active',
    description: "Immaculate new construction featuring white oak floors, cathedral ceilings, and a seamless indoor-outdoor living flow.",
    features: ["New Construction", "Open Floor Plan", "Heated Floors", "Three-Car Garage"]
  },
  {
    id: "4",
    title: "Greyson Heights Modern",
    address: "512 Skyview Lane, Auburn, IN",
    price: 890000,
    beds: 4,
    baths: 4,
    sqft: 4200,
    neighborhood: "Greyson Heights",
    imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=800",
    status: 'Pending',
    description: "High-design meets family comfort in this stunning contemporary home situated in Auburn's most sought-after new development.",
    features: ["Floor-to-Ceiling Windows", "Designer Fixtures", "Outdoor Kitchen", "Basement Bar"]
  }
];

export const NEIGHBORHOODS: Neighborhood[] = [
  {
    id: "nb1",
    name: "Bridgewater Golf Community",
    description: "Auburn's premier luxury destination featuring championship golf, social club, and elite villas.",
    averagePrice: "$600k - $1.5M",
    vibe: "Active Luxury",
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "nb2",
    name: "Watson Estates",
    description: "Modern architectural builds on spacious DeKalb County lots with a focus on family and community.",
    averagePrice: "$500k - $900k",
    vibe: "Contemporary Suburban",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"
  }
];
