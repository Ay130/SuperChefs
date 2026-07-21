

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AccordionItem } from '@/components/accordion';

export const metadata = {
  title: 'FAQ | Superchefs Limited',
  description: 'Find answers to frequently asked questions about Superchefs orders and services.',
};

const FAQS = [
  {
    q: 'How do I place an order?',
    a: 'You can place an order by visiting our website, browsing the menu, and using the WhatsApp order button or calling us directly. We accept orders via WhatsApp, phone calls, and in-person visits at our branches.',
  },
  {
    q: 'Do you accept WhatsApp orders?',
    a: 'Yes! WhatsApp is our preferred ordering method. Click the WhatsApp button on any product page or send us a message directly. Our team will respond promptly with availability and delivery options.',
  },
  {
    q: 'What are your delivery times?',
    a: 'We operate from 7:00 AM to 10:00 PM daily. Most orders are prepared within 30-45 minutes. For large bulk orders, please call ahead to confirm availability and timing.',
  },
  {
    q: 'Do you offer bulk or catering orders?',
    a: 'Absolutely! We handle bulk orders for events, offices, and gatherings. Please contact us at least 24 hours in advance to discuss your requirements and get a quote.',
  },
  {
    q: 'Are all items available every day?',
    a: 'Most of our menu items are available daily. However, some specialty items may have limited availability. We recommend checking with us before placing large orders of specific items.',
  },
  {
    q: 'Do you make pastries fresh daily?',
    a: 'Yes! All our pastries, bread, and baked goods are freshly made daily. We believe in quality over quantity, which is why we prepare items fresh to order.',
  },
  {
    q: 'Can I customize my order?',
    a: 'Of course! We love customizations. You can request modifications to any dish. Just let us know your preferences when placing your order.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We primarily accept cash payments. For WhatsApp orders, payment is made upon delivery or collection. Contact us for other payment arrangement options.',
  },
  {
    q: 'Do you have any food allergies information?',
    a: 'Please inform us about any allergies when placing your order. We take allergies seriously and will do our best to accommodate your dietary requirements.',
  },
  {
    q: 'How can I provide feedback or make a complaint?',
    a: 'We value your feedback! Please contact us via WhatsApp, phone, or email. We&apos;re committed to resolving any issues and improving your experience.',
  },
];

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        {/* Hero */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Find answers to common questions about our products and services
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 bg-secondary rounded-lg p-12 text-center border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-4">Can&apos;t find your answer?</h3>
            <p className="text-muted-foreground mb-6">
              Get in touch with our team for more assistance
            </p>
            <a
              href="/contact"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
