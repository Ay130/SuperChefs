'use client';

import { useMemo } from 'react';
import { Product, Category } from '@/lib/types';
import { ProductCard } from './product-card';

interface MenuContentProps {
  products: Product[];
  categories: Category[];
  selectedCategory?: string;
  searchParams: { category?: string; search?: string };
}

export function MenuContent({
  products,
  categories,
  selectedCategory,
  searchParams,
}: MenuContentProps) {
  const searchTerm = searchParams.search?.toLowerCase() || '';

  const filteredProducts = useMemo(() => {
    let items = products;

    if (selectedCategory) {
      items = items.filter((p) => p.categoryId === selectedCategory);
    }

    if (searchTerm) {
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm)
      );
    }

    return items;
  }, [products, selectedCategory, searchTerm]);

  return (
    <main className="bg-background">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-primary/20 to-accent/20 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Our Menu
          </h1>
          <p className="text-foreground">
            Discover our range of fresh meals, pastries, and baked goods
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border-2 border-primary p-6 sticky top-24">
              <h2 className="font-bold text-foreground mb-4">Categories</h2>
              <div className="space-y-2">
                <a
                  href="/menu"
                  className={`block px-3 py-2 rounded-lg transition ${
                    !selectedCategory
                      ? 'bg-primary text-white'
                      : 'text-foreground hover:bg-primary/10'
                  }`}
                >
                  All Items
                </a>
                {categories.map((category) => (
                  <a
                    key={category.id}
                    href={`/menu?category=${category.id}`}
                    className={`block px-3 py-2 rounded-lg transition ${
                      selectedCategory === category.id
                        ? 'bg-primary text-white'
                        : 'text-foreground hover:bg-primary/10'
                    }`}
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-card rounded-lg border-2 border-primary p-12 text-center">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No items found
                </h3>
                <p className="text-foreground">
                  Try adjusting your filters or search term
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
