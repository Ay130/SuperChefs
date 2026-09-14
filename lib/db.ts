import fs from 'fs';
import path from 'path';
import {
  Category,
  Product,
  Offer,
  HomepageContent,
  ContactInquiry,
  SiteSettings,
  Supplier,
  PurchaseOrder,
  InventoryItem,
} from './types';

const DATA_FILE = path.join(process.cwd(), 'lib', 'data.json');

const EMPTY_HOMEPAGE_CONTENT: HomepageContent = {
  heroTitle: '',
  heroSubtitle: '',
  trustMessage: '',
  featuredProductIds: [],
  testimonials: [],
  benefitCards: [],
};

interface DataStore {
  categories: Category[];
  products: Product[];
  homepageContent: HomepageContent;
  offers: Offer[];
  inquiries: ContactInquiry[];
  siteSettings: SiteSettings;
  suppliers: Supplier[];
  purchaseOrders: PurchaseOrder[];
  inventory: InventoryItem[];
  employees: Record<string, unknown>[];
  payslips: Record<string, unknown>[];
}

export async function readData(): Promise<DataStore> {
  try {
    const rawData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')) as Partial<DataStore> & {
      testimonials?: HomepageContent['testimonials'];
      benefitCards?: HomepageContent['benefitCards'];
    };

    return {
      categories: rawData.categories ?? [],
      products: rawData.products ?? [],
      homepageContent: {
        ...EMPTY_HOMEPAGE_CONTENT,
        ...(rawData.homepageContent ?? {}),
        testimonials: rawData.homepageContent?.testimonials ?? rawData.testimonials ?? [],
        benefitCards: rawData.homepageContent?.benefitCards ?? rawData.benefitCards ?? [],
      },
      offers: rawData.offers ?? [],
      inquiries: rawData.inquiries ?? [],
      siteSettings: rawData.siteSettings ?? {
        businessName: '',
        slogan: '',
        phone: '',
        whatsapp: '',
        email: '',
        address: '',
        openingHours: '',
        socialLinks: {},
      },
      suppliers: rawData.suppliers ?? [],
      purchaseOrders: rawData.purchaseOrders ?? [],
      inventory: rawData.inventory ?? [],
      employees: rawData.employees ?? [],
      payslips: rawData.payslips ?? [],
    };
  } catch (error) {
    console.error('Error reading data file:', error);
    throw new Error('Failed to read data');
  }
}

let writeQueue = Promise.resolve();

export async function writeData(data: DataStore): Promise<void> {
  const nextWrite = writeQueue.then(() => {
    const temporaryFile = `${DATA_FILE}.tmp`;
    fs.writeFileSync(temporaryFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(temporaryFile, DATA_FILE);
  });
  writeQueue = nextWrite.catch(() => undefined);
  try {
    await nextWrite;
  } catch (error) {
    console.error('Error writing data file:', error);
    throw new Error('Failed to write data');
  }
}

// Procurement and inventory
export async function getSuppliers(): Promise<Supplier[]> {
  const data = await readData();
  return data.suppliers.filter((supplier) => supplier.active);
}

export async function createSupplier(input: Omit<Supplier, 'id'>): Promise<Supplier> {
  const data = await readData();
  const supplier = { ...input, id: `supplier-${Date.now()}` };
  data.suppliers.push(supplier);
  await writeData(data);
  return supplier;
}

export async function getInventory(): Promise<InventoryItem[]> {
  const data = await readData();
  return data.inventory;
}

export async function getPurchaseOrders(): Promise<PurchaseOrder[]> {
  const data = await readData();
  return data.purchaseOrders.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createPurchaseOrder(input: Omit<PurchaseOrder, 'id' | 'createdAt'>): Promise<PurchaseOrder> {
  const data = await readData();
  const order = { ...input, id: `po-${Date.now()}`, createdAt: new Date().toISOString() };
  data.purchaseOrders.push(order);
  await writeData(data);
  return order;
}

export async function receivePurchaseOrder(id: string, quantities: Record<string, number>): Promise<PurchaseOrder> {
  const data = await readData();
  const order = data.purchaseOrders.find((item) => item.id === id);
  if (!order) throw new Error('Purchase order not found');
  for (const item of order.items) {
    const received = Math.max(0, Math.min(item.quantity - item.receivedQuantity, quantities[item.productId] ?? 0));
    item.receivedQuantity += received;
    const inventory = data.inventory.find((stock) => stock.productId === item.productId);
    if (inventory) {
      inventory.stockQuantity += received;
      inventory.updatedAt = new Date().toISOString();
    } else {
      data.inventory.push({ productId: item.productId, sku: item.productId, costPrice: item.unitCost, stockQuantity: received, reorderLevel: 0, reorderQuantity: 0, unit: 'unit', updatedAt: new Date().toISOString() });
    }
  }
  const receivedCount = order.items.reduce((sum, item) => sum + item.receivedQuantity, 0);
  const totalCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
  order.status = receivedCount >= totalCount ? 'received' : 'partially_received';
  order.receivedAt = new Date().toISOString();
  await writeData(data);
  return order;
}

// Categories
export async function getCategories(): Promise<Category[]> {
  const data = await readData();
  return data.categories.sort((a, b) => a.order - b.order);
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
  const data = await readData();
  return data.categories.find((c) => c.id === id);
}

export async function createCategory(category: Omit<Category, 'id'>): Promise<Category> {
  const data = await readData();
  const id = `cat-${Date.now()}`;
  const newCategory = { ...category, id };
  data.categories.push(newCategory);
  await writeData(data);
  return newCategory;
}

export async function updateCategory(id: string, updates: Partial<Category>): Promise<Category> {
  const data = await readData();
  const index = data.categories.findIndex((c) => c.id === id);
  if (index === -1) throw new Error('Category not found');
  data.categories[index] = { ...data.categories[index], ...updates };
  await writeData(data);
  return data.categories[index];
}

export async function deleteCategory(id: string): Promise<void> {
  const data = await readData();
  data.categories = data.categories.filter((c) => c.id !== id);
  data.products = data.products.filter((p) => p.categoryId !== id);
  await writeData(data);
}

// Products
export async function getProducts(): Promise<Product[]> {
  const data = await readData();
  return data.products;
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const data = await readData();
  return data.products.filter((p) => p.categoryId === categoryId);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const data = await readData();
  return data.products.find((p) => p.id === id);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const data = await readData();
  return data.products.filter((p) => p.featured && p.available);
}

export async function createProduct(product: Omit<Product, 'id'>): Promise<Product> {
  const data = await readData();
  const id = `prod-${Date.now()}`;
  const newProduct = { ...product, id };
  data.products.push(newProduct);
  await writeData(data);
  return newProduct;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
  const data = await readData();
  const index = data.products.findIndex((p) => p.id === id);
  if (index === -1) throw new Error('Product not found');
  data.products[index] = { ...data.products[index], ...updates };
  await writeData(data);
  return data.products[index];
}

export async function deleteProduct(id: string): Promise<void> {
  const data = await readData();
  data.products = data.products.filter((p) => p.id !== id);
  await writeData(data);
}

// Homepage Content
export async function getHomepageContent(): Promise<HomepageContent> {
  const data = await readData();
  return data.homepageContent;
}

export async function updateHomepageContent(updates: Partial<HomepageContent>): Promise<HomepageContent> {
  const data = await readData();
  data.homepageContent = { ...data.homepageContent, ...updates };
  await writeData(data);
  return data.homepageContent;
}

// Offers
export async function getOffers(): Promise<Offer[]> {
  const data = await readData();
  return data.offers.filter((o) => o.active).sort((a, b) => a.order - b.order);
}

export async function getAllOffers(): Promise<Offer[]> {
  const data = await readData();
  return data.offers.sort((a, b) => a.order - b.order);
}

export async function createOffer(offer: Omit<Offer, 'id'>): Promise<Offer> {
  const data = await readData();
  const id = `offer-${Date.now()}`;
  const newOffer = { ...offer, id };
  data.offers.push(newOffer);
  await writeData(data);
  return newOffer;
}

export async function updateOffer(id: string, updates: Partial<Offer>): Promise<Offer> {
  const data = await readData();
  const index = data.offers.findIndex((o) => o.id === id);
  if (index === -1) throw new Error('Offer not found');
  data.offers[index] = { ...data.offers[index], ...updates };
  await writeData(data);
  return data.offers[index];
}

export async function deleteOffer(id: string): Promise<void> {
  const data = await readData();
  data.offers = data.offers.filter((o) => o.id !== id);
  await writeData(data);
}

// Inquiries
export async function getInquiries(): Promise<ContactInquiry[]> {
  const data = await readData();
  return data.inquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function createInquiry(inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'responded'>): Promise<ContactInquiry> {
  const data = await readData();
  const id = `inq-${Date.now()}`;
  const newInquiry: ContactInquiry = {
    ...inquiry,
    id,
    createdAt: new Date().toISOString(),
    responded: false,
  };
  data.inquiries.push(newInquiry);
  await writeData(data);
  return newInquiry;
}

export async function markInquiryAsResponded(id: string): Promise<ContactInquiry> {
  const data = await readData();
  const index = data.inquiries.findIndex((i) => i.id === id);
  if (index === -1) throw new Error('Inquiry not found');
  data.inquiries[index].responded = true;
  await writeData(data);
  return data.inquiries[index];
}

// Site Settings
export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await readData();
  return data.siteSettings;
}

export async function updateSiteSettings(updates: Partial<SiteSettings>): Promise<SiteSettings> {
  const data = await readData();
  data.siteSettings = { ...data.siteSettings, ...updates };
  await writeData(data);
  return data.siteSettings;
}
