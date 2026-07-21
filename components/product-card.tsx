'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { Phone, MessageSquare, Star } from 'lucide-react';

const PHONE = '+234 (0) 701 234 5678';
const WHATSAPP = '+234 (0) 701 234 5678';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className={`group cursor-pointer rounded-lg overflow-hidden border-2 border-primary hover:shadow-lg transition-all ${compact ? 'bg-secondary' : 'bg-card'}`}>
        {/* Image */}
        <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 h-40 overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-xs text-foreground font-semibold">{product.name}</p>
              </div>
            </div>
          )}

          {/* Badges */}
          {product.tags.length > 0 && (
            <div className="absolute top-2 left-2 right-2 flex flex-wrap gap-1">
              {product.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-2 py-1 bg-accent text-white text-xs rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`p-4 ${compact ? 'bg-secondary' : 'bg-card'}`}>
          <h3 className="font-bold text-foreground group-hover:text-primary transition line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-foreground line-clamp-2 mt-1">
            {product.description}
          </p>

          <div className="flex items-center justify-between mt-3">
            <span className="text-lg font-bold text-primary">₦{product.price.toLocaleString()}</span>
            {!compact && product.available && (
              <span className="text-xs bg-primary text-white px-2 py-1 rounded-full font-medium">
                Available
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ProductCardLarge({ product }: { product: Product }) {
  return (
    <div className="bg-card rounded-lg overflow-hidden border-2 border-primary hover:shadow-lg transition-all">
      {/* Image */}
      <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 h-56 overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform"
            sizes="(max-width: 768px) 100vw, 500px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-foreground font-semibold">{product.name}</p>
            </div>
          </div>
        )}

        {/* Badges */}
        {product.tags.length > 0 && (
          <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 bg-accent text-white text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">{product.name}</h2>
        <p className="text-foreground mb-4">{product.description}</p>

        <div className="flex items-center gap-2 mb-6">
          <span className="text-3xl font-bold text-primary">₦{product.price.toLocaleString()}</span>
          {product.available && (
            <span className="text-sm bg-primary text-white px-3 py-1 rounded-full font-medium">
              In Stock
            </span>
          )}
        </div>

        {product.longDescription && (
          <p className="text-sm text-foreground mb-6">{product.longDescription}</p>
        )}

        <div className="flex gap-3">
          <a
            href={`tel:${PHONE}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition font-medium"
          >
            <Phone className="w-4 h-4" />
            Call
          </a>
          <a
            href={`https://wa.me/${WHATSAPP.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-white rounded-lg hover:opacity-90 transition font-medium"
          >
            <MessageSquare className="w-4 h-4" />
            Chat
          </a>
        </div>
      </div>
    </div>
  );
}
