'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from './product-card';
import { Product, Category } from '@/lib/types';
import { MessageSquare, Phone, Star, Zap } from 'lucide-react';

const PHONE = '+234 (0) 701 234 5678';
const WHATSAPP = '+234 (0) 701 234 5678';

interface HomepageProps {
  featuredProducts: Product[];
  categories: Category[];
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
}

export function Homepage({
  featuredProducts,
  categories,
  testimonials,
  benefitCards,
}: HomepageProps) {
  return (
    <main className="bg-background">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <Image
          src="/bakery-bg.png"
          alt="Fresh bakery background"
          fill
          className="absolute inset-0 object-cover brightness-75"
          priority
        />
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-balance leading-tight">
                Tastefully Fresh
              </h1>
              <p className="text-xl text-white mb-2 font-semibold">
                Freshly made meals, pastries and bread
              </p>
              <p className="text-lg text-white/90 mb-8">
                Nigerian favourites served daily. Great for everyday meals, snacks and quick orders.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/menu"
                  className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition text-center"
                >
                  View Menu
                </Link>
                <a
                  href={`tel:${PHONE}`}
                  className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition text-center flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-8 bg-accent text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold mb-2">FRESH DAILY</p>
          <h2 className="text-2xl md:text-3xl font-bold">
            Get Fresh Meals Daily - Find Our Locations
          </h2>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Shop by Category
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/menu?category=${category.id}`}
                className="group p-4 rounded-lg border-2 border-primary hover:shadow-md transition bg-card text-center hover:bg-primary/10"
              >
                <h3 className="font-semibold text-foreground group-hover:text-primary transition text-sm">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Customer Favorites
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/menu"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Why Choose Superchefs
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {benefitCards.map((benefit) => (
              <div
                key={benefit.id}
                className="p-6 rounded-lg border-2 border-primary hover:shadow-lg transition bg-card"
              >
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            What Our Customers Say
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="p-6 rounded-lg bg-card border-2 border-primary hover:shadow-lg transition"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">"{testimonial.content}"</p>
                <p className="font-semibold text-foreground">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for something Tastefully Fresh?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Call us, chat with us, or visit one of our locations to get your favorite meals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${PHONE}`}
              className="px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call Us
            </a>
            <a
              href={`https://wa.me/${WHATSAPP.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Chat
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
