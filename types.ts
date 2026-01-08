
export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  neighborhood: string;
  imageUrl: string;
  featured?: boolean;
  status: 'Active' | 'Pending' | 'Sold';
  description: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  rating: number;
  location: string;
}

export interface Neighborhood {
  id: string;
  name: string;
  description: string;
  averagePrice: string;
  vibe: string;
  imageUrl: string;
}
