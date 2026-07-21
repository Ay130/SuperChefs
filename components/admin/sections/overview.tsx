'use client';

import { useEffect, useState } from 'react';
import { Product, Category, Offer } from '@/lib/types';
import { Package, Tag, Megaphone, MessageSquare } from 'lucide-react';

export function DashboardOverview() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOffers: 0,
    totalInquiries: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [products, categories, offers, inquiries] = await Promise.all([
          fetch('/api/products').then((r) => r.json()),
          fetch('/api/categories').then((r) => r.json()),
          fetch('/api/offers?all=true').then((r) => r.json()),
          fetch('/api/inquiries').then((r) => r.json()),
        ]);

        setStats({
          totalProducts: products?.length || 0,
          totalCategories: categories?.length || 0,
          totalOffers: offers?.length || 0,
          totalInquiries: inquiries?.length || 0,
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    };

    loadStats();
  }, []);

  const cards = [
    { label: 'Total Products', value: stats.totalProducts, icon: Package, color: 'bg-blue-50 text-blue-600' },
    { label: 'Categories', value: stats.totalCategories, icon: Tag, color: 'bg-green-50 text-green-600' },
    { label: 'Active Offers', value: stats.totalOffers, icon: Megaphone, color: 'bg-purple-50 text-purple-600' },
    { label: 'New Inquiries', value: stats.totalInquiries, icon: MessageSquare, color: 'bg-orange-50 text-orange-600' },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div key={i} className="bg-white rounded-lg border border-border p-6">
            <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center mb-4`}>
              <Icon className="w-6 h-6" />
            </div>
            <p className="text-muted-foreground text-sm font-medium mb-1">{card.label}</p>
            <p className="text-3xl font-bold text-foreground">{card.value}</p>
          </div>
        );
      })}
    </div>
  );
}
