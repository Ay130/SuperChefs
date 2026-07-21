

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getAllOffers } from '@/lib/db';
import { MessageSquare } from 'lucide-react';

export const metadata = {
  title: 'Offers & Specials | Superchefs Limited',
  description: 'Check out our latest offers, promotions and special deals.',
};

const WHATSAPP = '+234 (0) 701 234 5678';

export default async function OffersPage() {
  const offers = await getAllOffers();

  const whatsappLink = `https://wa.me/${WHATSAPP.replace(/\D/g, '')}?text=Hello%20Superchefs,%20I%20would%20like%20to%20order`;

  return (
    <>
      <Header />
      <main className="bg-background">
        {/* Hero */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Offers & Specials
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Amazing deals on your favorite meals and pastries
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          {offers.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="rounded-lg overflow-hidden border border-border hover:shadow-lg transition bg-white"
                >
                  {/* Image Placeholder */}
                  <div className="bg-gradient-to-br from-primary/20 to-accent/20 h-48 flex items-center justify-center">
                    <div className="text-6xl">🎉</div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-foreground mb-2">{offer.title}</h2>
                    <p className="text-muted-foreground mb-6">{offer.description}</p>

                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition"
                    >
                      {offer.cta}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📢</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">No Active Offers</h2>
              <p className="text-muted-foreground mb-8">
                Check back soon for amazing deals!
              </p>
              <a
                href="/menu"
                className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition"
              >
                Browse Menu
              </a>
            </div>
          )}

          {/* Info Section */}
          <section className="mt-16 bg-secondary rounded-lg p-12 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Subscribe for Updates
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Don&apos;t miss out on our latest offers and promotions. Contact us on WhatsApp to get notified about new deals.
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition"
            >
              <MessageSquare className="w-4 h-4" />
              Message Us
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
