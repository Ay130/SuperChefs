'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';

const PHONE = '+234 (0) 701 234 5678';
const WHATSAPP = '+234 (0) 701 234 5678';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-primary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/superchefs-logo.png"
              alt="Superchefs"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
            <span className="font-bold text-foreground text-lg hidden sm:inline">Superchefs</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/menu" className="text-foreground hover:text-primary transition">
              Menu
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition">
              Contact
            </Link>
            <Link href="/offers" className="text-foreground hover:text-primary transition">
              Offers
            </Link>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${PHONE}`}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-foreground font-semibold rounded-lg hover:bg-primary/90 transition"
            >
              <Phone className="w-4 h-4" />
              Call
            </a>
            <a
              href={`https://wa.me/${WHATSAPP.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-accent text-white font-semibold rounded-lg hover:opacity-90 transition"
            >
              <MessageSquare className="w-4 h-4" />
              Chat
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 border-t border-border pt-4 space-y-3">
            <Link
              href="/menu"
              className="block py-2 text-foreground hover:text-primary transition"
              onClick={() => setIsOpen(false)}
            >
              Menu
            </Link>
            <Link
              href="/about"
              className="block py-2 text-foreground hover:text-primary transition"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-foreground hover:text-primary transition"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/offers"
              className="block py-2 text-foreground hover:text-primary transition"
              onClick={() => setIsOpen(false)}
            >
              Offers
            </Link>
            <div className="flex gap-3 pt-3">
              <a
                href={`tel:${PHONE}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-foreground font-semibold rounded-lg transition"
              >
                <Phone className="w-4 h-4" />
                Call
              </a>
              <a
                href={`https://wa.me/${WHATSAPP.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-accent text-white font-semibold rounded-lg transition"
              >
                <MessageSquare className="w-4 h-4" />
                Chat
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
