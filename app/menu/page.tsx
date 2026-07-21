import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getProducts, getCategories } from '@/lib/db';
import { MenuContent } from '@/components/menu-content';

export const metadata = {
  title: 'Menu | Superchefs Limited',
  description: 'Browse our full menu of fresh Nigerian meals, pastries, breads and more.',
};

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const params = await searchParams;
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <>
      <Header />
      <MenuContent
        products={products}
        categories={categories}
        selectedCategory={params.category}
        searchParams={params}
      />
      <Footer />
    </>
  );
}
