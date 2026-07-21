export type Category = {
  id: string;
  name: string;
  description: string;
  image?: string;
  order: number;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  description: string;
  longDescription?: string;
  image?: string;
  tags: string[];
  featured: boolean;
  available: boolean;
};

export type Offer = {
  id: string;
  title: string;
  description: string;
  image?: string;
  cta: string;
  active: boolean;
  order: number;
};

export type HomepageContent = {
  heroTitle: string;
  heroSubtitle: string;
  trustMessage: string;
  featuredProductIds: string[];
  testimonials: Array<{
    id: string;
    author: string;
    content: string;
    rating: number;
  }>;
  benefitCards: Array<{
    id: string;
    title: string;
    description: string;
  }>;
};

export type ContactInquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  responded: boolean;
};

export type SiteSettings = {
  businessName: string;
  slogan: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  openingHours: string;
  logo?: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
};
