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

export type Supplier = {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  leadTimeDays: number;
  active: boolean;
};

export type PurchaseOrderItem = {
  productId: string;
  quantity: number;
  unitCost: number;
  receivedQuantity: number;
};

export type PurchaseOrder = {
  id: string;
  supplierId: string;
  status: 'draft' | 'ordered' | 'partially_received' | 'received' | 'cancelled';
  items: PurchaseOrderItem[];
  notes: string;
  createdAt: string;
  orderedAt?: string;
  receivedAt?: string;
};

export type InventoryItem = {
  productId: string;
  sku: string;
  supplierId?: string;
  costPrice: number;
  stockQuantity: number;
  reorderLevel: number;
  reorderQuantity: number;
  unit: string;
  updatedAt: string;
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
