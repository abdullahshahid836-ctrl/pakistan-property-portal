export interface Property {
  id: string;
  title: string;
  type: 'House' | 'Flat' | 'Plot' | 'Commercial' | 'Room';
  purpose: 'Sale' | 'Rent';
  price: number;
  priceLabel: string;
  city: string;
  area: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  areaSize: number;
  areaUnit: string;
  description: string;
  features: string[];
  images: string[];
  agentId: string;
  isVerified: boolean;
  isFeatured: boolean;
  postedDate: string;
  views: number;
  coordinates: { lat: number; lng: number };
}

export interface Agent {
  id: string;
  name: string;
  agency: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
  photo: string;
  languages: string[];
  totalListings: number;
  rating: number;
  reviewCount: number;
  experience: string;
  bio: string;
  specializations: string[];
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  developer: string;
  city: string;
  location: string;
  priceMin: number;
  priceMax: number;
  priceLabel: string;
  status: 'Under Construction' | 'Ready' | 'Pre-Launch';
  completionDate: string;
  description: string;
  amenities: string[];
  units: { type: string; size: string; price: string }[];
  coverImage: string;
  images: string[];
  isTrending: boolean;
  coordinates: { lat: number; lng: number };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorPhoto: string;
  publishDate: string;
  readTime: string;
  coverImage: string;
  tags: string[];
}

export interface ForumTopic {
  id: string;
  title: string;
  author: string;
  replies: number;
  views: number;
  lastActivity: string;
  isHot: boolean;
}

export interface ForumCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  topicCount: number;
  newTopics: number;
  topics: ForumTopic[];
}
