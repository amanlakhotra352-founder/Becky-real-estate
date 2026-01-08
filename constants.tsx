
import { Property, Testimonial, Neighborhood } from './types';

export const AGENT_INFO = {
  name: "Becky Maldeney",
  title: "Participant / Broker",
  business: "Indiana Real Estate Inc.",
  phone: "+1 260-570-5894",
  email: "beckymaldeney@gmail.com",
  office: "4801 County Road 39, Auburn, IN 46706, USA",
  specialties: ["Luxury Homes", "New Construction", "Golf Course Communities", "Estates & Land"],
};

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
    imageUrl: "https://picsum.photos/seed/p1/1200/800",
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
    imageUrl: "https://picsum.photos/seed/p2/1200/800",
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
    imageUrl: "https://picsum.photos/seed/p3/1200/800",
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
    imageUrl: "https://picsum.photos/seed/p4/1200/800",
    status: 'Pending',
    description: "High-design meets family comfort in this stunning contemporary home situated in Auburn's most sought-after new development.",
    features: ["Floor-to-Ceiling Windows", "Designer Fixtures", "Outdoor Kitchen", "Basement Bar"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "The Harrison Family",
    quote: "Becky's knowledge of the Auburn market is unmatched. She found us our dream home at Bridgewater before it even hit the MLS.",
    rating: 5,
    location: "Bridgewater"
  },
  {
    id: "2",
    name: "David & Sarah Miller",
    quote: "Professionalism, integrity, and a deep care for her clients. Becky guided us through a complex estate sale with grace and expertise.",
    rating: 5,
    location: "Auburn"
  }
];

export const NEIGHBORHOODS: Neighborhood[] = [
  {
    id: "nb1",
    name: "Bridgewater Golf Community",
    description: "Auburn's premier luxury destination featuring championship golf, social club, and elite villas.",
    averagePrice: "$600k - $1.5M",
    vibe: "Active Luxury",
    imageUrl: "https://picsum.photos/seed/n1/600/400"
  },
  {
    id: "nb2",
    name: "Watson Estates",
    description: "Modern architectural builds on spacious DeKalb County lots with a focus on family and community.",
    averagePrice: "$500k - $900k",
    vibe: "Contemporary Suburban",
    imageUrl: "https://picsum.photos/seed/n2/600/400"
  }
];
