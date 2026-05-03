export interface Property {
  id: string;
  title: string;
  type: 'House' | 'Flat' | 'Plot' | 'Commercial' | 'Room';
  purpose: 'Sale' | 'Rent';
  price: number;
  priceLabel?: string;
  price_label?: string;
  city: string;
  area: string;
  address: string;
  bedrooms: number;
  beds?: number;
  bathrooms: number;
  baths?: number;
  areaSize?: number;
  area_size?: number;
  areaUnit?: string;
  area_unit?: string;
  description: string;
  features: string[];
  images: string[];
  property_images?: string[];
  agentId?: string;
  agent_id?: string;
  isVerified?: boolean;
  is_verified?: boolean;
  isFeatured?: boolean;
  is_featured?: boolean;
  postedDate?: string;
  posted_date?: string;
  views: number;
  view_count?: number;
  coordinates?: { lat: number; lng: number };
}

export interface Agent {
  id: string;
  name: string;
  agency: string;
  agency_name?: string;
  city: string;
  phone: string;
  whatsapp?: string;
  email: string;
  photo: string;
  photo_url?: string;
  languages: string[];
  totalListings?: number;
  total_listings?: number;
  rating: number;
  reviewCount?: number;
  review_count?: number;
  experience: string;
  years_experience?: number;
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
  priceMin?: number;
  price_min?: number;
  priceMax?: number;
  price_max?: number;
  priceLabel?: string;
  price_label?: string;
  status: 'Under Construction' | 'Ready' | 'Pre-Launch';
  completionDate?: string;
  completion_date?: string;
  description: string;
  amenities: string[];
  units: { type: string; size: string; price: string }[];
  coverImage?: string;
  cover_image?: string;
  images: string[];
  isTrending?: boolean;
  is_trending?: boolean;
  coordinates?: { lat: number; lng: number };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorPhoto?: string;
  author_photo?: string;
  publishDate?: string;
  publish_date?: string;
  readTime?: string;
  read_time?: string;
  coverImage?: string;
  cover_image?: string;
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
