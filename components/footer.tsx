import Link from 'next/link';
import { Phone, Mail, MapPin, Heart, Share2, MessageCircle } from 'lucide-react';

const CONTACT_INFO = {
  phone: '+234 (0) 701 234 5678',
  email: 'hello@superchefs.ng',
  address: '123 Food Street, Lekki, Lagos, Nigeria',
  hours: '7:00 AM - 10:00 PM Daily',
};

export function Footer() {
  return (
    <footer className="bg-primary text-foreground">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-foreground text-primary flex items-center justify-center font-bold text-xs">
                SC
              </div>
              <span className="font-bold text-lg text-foreground">Superchefs</span>
            </div>
            <p className="text-sm text-foreground/90">Tastefully Freshh</p>
            <p className="text-xs text-foreground/80 mt-2">
              Freshly made meals, pastries and bread. Nigerian favourites served daily.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm text-foreground">
              <li>
                <Link href="/menu" className="hover:opacity-70 transition">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:opacity-70 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:opacity-70 transition">
                  Offers
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:opacity-70 transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Contact Us</h3>
            <ul className="space-y-3 text-sm text-foreground">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href={`tel:${CONTACT_INFO.phone}`} className="hover:opacity-70 transition">
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:opacity-70 transition">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{CONTACT_INFO.address}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Hours</h3>
            <p className="text-sm mb-4 text-foreground">{CONTACT_INFO.hours}</p>
            <h4 className="font-semibold text-sm mb-3 text-foreground">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/superchefs"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-foreground/20 rounded-full hover:bg-foreground/40 transition"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/superchefs"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-foreground/20 rounded-full hover:bg-foreground/40 transition"
              >
                <Heart className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/superchefs"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-foreground/20 rounded-full hover:bg-foreground/40 transition"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-center md:text-left text-sm text-foreground/80">
              &copy; {new Date().getFullYear()} Superchefs Limited. All rights reserved.
            </p>
            <Link href="/admin/login" className="text-sm text-foreground/60 hover:text-foreground transition mt-4 md:mt-0">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
