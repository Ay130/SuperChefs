

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Homepage } from '@/components/homepage';
import { getHomepageContent, getCategories, getFeaturedProducts } from '@/lib/db';

export default async function Home() {
  const homepageContent = await getHomepageContent();
  const categories = await getCategories();
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <Header />
      <Homepage
        featuredProducts={featuredProducts}
        categories={categories}
        testimonials={homepageContent.testimonials}
        benefitCards={homepageContent.benefitCards}
      />
      <Footer />
    </>
  );
}
