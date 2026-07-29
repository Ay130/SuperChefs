

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ContactForm } from '@/components/contact-form';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | Superchefs Limited',
  description: 'Get in touch with Superchefs Limited. Find our contact info, locations, and business hours.',
};

const CONTACT_INFO = {
  phone: '+234 (0) 701 234 5678',
  email: 'hello@superchefs.ng',
  address: '123 Food Street, Lekki, Lagos, Nigeria',
  hours: '7:00 AM - 10:00 PM Daily',
};

const BRANCHES = [
  {
    name: 'Lekki Branch',
    address: '123 Food Street, Lekki, Lagos',
    phone: '+234 (0) 701 234 5678',
    hours: '7:00 AM - 10:00 PM',
  },
  {
    name: 'Victoria Island Branch',
    address: '456 Marina Road, Victoria Island, Lagos',
    phone: '+234 (0) 701 234 5679',
    hours: '7:00 AM - 10:00 PM',
  },
  {
    name: 'Ikoyi Branch',
    address: '789 Banana Island Road, Ikoyi, Lagos',
    phone: '+234 (0) 701 234 5680',
    hours: '8:00 AM - 11:00 PM',
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        {/* Hero */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Have questions? We&apos;d love to hear from you
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <a
                      href={`tel:${CONTACT_INFO.phone}`}
                      className="text-muted-foreground hover:text-primary transition"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-muted-foreground hover:text-primary transition"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Address</h3>
                    <p className="text-muted-foreground">{CONTACT_INFO.address}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Hours</h3>
                    <p className="text-muted-foreground">{CONTACT_INFO.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Send us a Message</h2>
              <ContactForm />
            </div>
          </div>

          {/* Branches */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">Our Branches</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {BRANCHES.map((branch, i) => (
                <div key={i} className="p-6 bg-white border border-border rounded-lg">
                  <h3 className="text-lg font-bold text-foreground mb-3">{branch.name}</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex gap-2">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">{branch.address}</p>
                    </div>
                    <div className="flex gap-2">
                      <Phone className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <a
                        href={`tel:${branch.phone}`}
                        className="text-muted-foreground hover:text-primary transition"
                      >
                        {branch.phone}
                      </a>
                    </div>
                    <div className="flex gap-2">
                      <Clock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">{branch.hours}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Map Placeholder */}
          <div className="bg-secondary rounded-lg p-12 text-center border border-border">
            <div className="text-6xl mb-4">📍</div>
            <h3 className="text-xl font-bold text-foreground mb-2">Visit Us Today</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Come experience Tastefully Fresh meals at any of our convenient locations across Lagos
            </p>
            <a
              href="/menu"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition"
            >
              Start Your Order
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
