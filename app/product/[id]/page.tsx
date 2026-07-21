

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getProductById, getProducts, getCategoryById } from '@/lib/db';
import { ProductCard, ProductCardLarge } from '@/components/product-card';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} | Superchefs Limited`,
    description: product.description,
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const category = await getCategoryById(product.categoryId);
  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <Header />
      <main className="bg-background min-h-screen">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-foreground">
            <a href="/" className="hover:text-primary transition">
              Home
            </a>
            <span>/</span>
            <a href="/menu" className="hover:text-primary transition">
              Menu
            </a>
            <span>/</span>
            {category && (
              <>
                <a href={`/menu?category=${category.id}`} className="hover:text-primary transition">
                  {category.name}
                </a>
                <span>/</span>
              </>
            )}
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-1">
              <ProductCardLarge product={product} />
            </div>

            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg border-2 border-primary p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      {product.name}
                    </h1>
                    {category && (
                      <p className="text-foreground">{category.name}</p>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-4xl font-bold text-primary">
                      ₦{product.price.toLocaleString()}
                    </span>
                    {product.available && (
                      <span className="px-3 py-1 bg-primary text-white rounded-full text-sm font-medium">
                        In Stock
                      </span>
                    )}
                  </div>

                  {product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-accent text-white text-xs rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t-2 border-b-2 border-primary py-6 mb-8">
                  <h3 className="font-semibold text-foreground mb-3">About this item</h3>
                  <p className="text-foreground mb-3">{product.description}</p>
                  {product.longDescription && (
                    <p className="text-foreground">{product.longDescription}</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <a
                    href="tel:+234 (0) 701 234 5678"
                    className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition text-center flex items-center justify-center gap-2"
                  >
                    <span>Call</span>
                  </a>
                  <a
                    href="https://wa.me/+234701234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:opacity-90 transition text-center flex items-center justify-center gap-2"
                  >
                    <span>Chat</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-8">Similar Items</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
