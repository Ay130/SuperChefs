# Superchefs Limited - Tastefully Freshh

A production-quality bakery and food business website for Superchefs Limited, a Nigerian-based food brand. Built with Next.js 16, Tailwind CSS, and shadcn/ui.

## Features

### Public Website
- **Homepage** - Hero section, featured products, categories, testimonials, and promotional banners
- **Menu Page** - Browse all products with category filtering
- **Product Details** - Individual product pages with full descriptions and WhatsApp ordering
- **About Page** - Brand story and company values
- **Contact Page** - Contact information, branch locations, and contact form
- **Offers Page** - View active promotions and special deals
- **FAQ Page** - Frequently asked questions with accordion interface

### Admin Dashboard
- **Product Management** - Add, edit, and delete menu items with pricing and categories
- **Category Management** - Organize products by category
- **Homepage Editor** - Manage homepage content, featured products, and testimonials
- **Offers Management** - Create and manage promotional offers
- **Inquiry Management** - View and respond to customer contact form submissions
- **Site Settings** - Configure business information, contact details, and social links
- **Dashboard Overview** - Quick statistics on products, categories, offers, and inquiries

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: lucide-react
- **Data Storage**: JSON file (easily upgradeable to Neon + Drizzle)
- **Authentication**: Simple password-based admin access

## Brand Colors

- **Primary**: Green (#22C55E) - Freshness, trust, primary CTAs
- **Secondary**: Pink (#EC4899) - Accents, highlights, promo elements
- **Neutrals**: Cream/off-white backgrounds with charcoal text

## Admin Access

**Login Page**: `/admin/login`
**Password**: `superchefs2024` (demo password - change in production)

### Admin Dashboard Features:
- **Dashboard**: Overview statistics
- **Products**: Full CRUD operations for menu items
- **Categories**: Manage product categories
- **Homepage**: Edit hero content, featured products, testimonials
- **Offers**: Create and manage promotional offers
- **Inquiries**: View and manage customer messages
- **Settings**: Configure business details and contact information

## Menu Items (Seed Data)

The application comes with 27 seed menu items across 6 categories:

- **Rice & Meals**: Jollof Rice, Fried Rice, Super Rice, Special Rice, etc.
- **Swallow**: Amala, Semo, Pounded Yam, Eba
- **Proteins**: Gizzard, Beef, Turkey, Peppered Chicken, Kote
- **Soups**: Egusi Soup, Okro, Edikaikong
- **Bread**: Family Loaf, Sardine Bread, Tea Cake Bread
- **Pastries**: Meat Pie, Chicken Pie, Sausage Rolls, Doughnut, Scotch Egg

All prices are in Nigerian Naira (₦).

## Order Flow

**No Online Checkout** - The website focuses on WhatsApp and phone ordering:
- Click "Order on WhatsApp" to send a pre-filled WhatsApp message
- Call directly using the prominent call buttons throughout the site
- Fill contact form for inquiries
- Visit physical locations for in-person orders

## Project Structure

```
/vercel/share/v0-project
├── app/
│   ├── layout.tsx                 # Root layout with theming
│   ├── page.tsx                  # Homepage
│   ├── menu/                     # Menu page
│   ├── product/[id]/             # Product detail pages
│   ├── about/                    # About page
│   ├── contact/                  # Contact page
│   ├── offers/                   # Offers page
│   ├── faq/                      # FAQ page
│   ├── admin/                    # Admin dashboard
│   └── api/                      # API routes
├── components/
│   ├── header.tsx               # Navigation header
│   ├── footer.tsx               # Footer
│   ├── homepage.tsx             # Homepage component
│   ├── product-card.tsx         # Product display component
│   ├── contact-form.tsx         # Contact form
│   ├── accordion.tsx            # FAQ accordion
│   └── admin/                   # Admin components
├── lib/
│   ├── types.ts                # TypeScript types
│   ├── db.ts                   # Database utility functions
│   └── data.json               # JSON data store
├── app/globals.css             # Global styles with design tokens
└── public/                     # Static assets
```

## Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit `http://localhost:3000` to see the homepage.
Admin dashboard available at `http://localhost:3000/admin/login`

### Build for Production

```bash
pnpm build
pnpm start
```

## API Routes

- `GET /api/products` - Get all products
- `GET /api/products/[id]` - Get product details
- `POST /api/products` - Create product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

- `GET /api/categories` - Get all categories
- `GET /api/categories/[id]` - Get category details
- `POST /api/categories` - Create category
- `PUT /api/categories/[id]` - Update category
- `DELETE /api/categories/[id]` - Delete category

- `GET /api/homepage` - Get homepage content
- `PUT /api/homepage` - Update homepage content

- `GET /api/offers` - Get active offers
- `GET /api/offers?all=true` - Get all offers
- `POST /api/offers` - Create offer
- `PUT /api/offers/[id]` - Update offer
- `DELETE /api/offers/[id]` - Delete offer

- `GET /api/inquiries` - Get all inquiries
- `POST /api/inquiries` - Create inquiry
- `PUT /api/inquiries/[id]` - Mark inquiry as responded

- `GET /api/settings` - Get site settings
- `PUT /api/settings` - Update site settings

## Customization

### Changing Admin Password
Update the password in `/app/admin/login/page.tsx`:
```typescript
const ADMIN_PASSWORD = 'your-new-password';
```

### Updating Contact Information
Edit the contact info constants in:
- `/components/header.tsx`
- `/components/footer.tsx`
- `/app/contact/page.tsx`

### Theming
Modify color tokens in `/app/globals.css`:
```css
--primary: #22C55E;      /* Main brand color */
--accent: #EC4899;       /* Accent color */
--background: #FAFAF8;   /* Page background */
--foreground: #1A1A18;   /* Text color */
```

## Future Enhancements

The architecture is designed to scale:

1. **Database Migration**: Replace JSON with Neon + Drizzle ORM
   - No API changes needed - just update `lib/db.ts`
   - Add Drizzle schema files
   - Set up database migrations

2. **Authentication**: Implement proper admin authentication
   - Add Auth.js or Better Auth
   - Replace localStorage token system
   - Add role-based access control

3. **Payment Processing**: Add Stripe/Paystack integration
   - Enable online checkout
   - Handle order fulfillment
   - Add payment tracking

4. **Image Management**: Integrate with Vercel Blob or similar
   - Upload product images
   - Store and serve from CDN
   - Add image optimization

5. **Email Integration**: Add transactional emails
   - Send order confirmations
   - Notify on inquiries
   - Marketing newsletters

## Performance

- **Optimized Images**: Using Next.js Image component for automatic optimization
- **Caching**: Server-side caching ready with Next.js App Router
- **Mobile-First**: Responsive design that performs great on all devices
- **Fast Builds**: Turbopack for rapid development and production builds

## Deployment

### Deploy to Vercel

```bash
# Push to GitHub, then connect to Vercel
# Or use Vercel CLI:
pnpm install -g vercel
vercel
```

The site is ready for production deployment on Vercel with no additional configuration needed.

## Contact

**Superchefs Limited**
- Phone: +234 (0) 701 234 5678
- Email: hello@superchefs.ng
- Address: 123 Food Street, Lekki, Lagos, Nigeria
- Slogan: Tastefully Freshh

## License

This project is proprietary to Superchefs Limited.
