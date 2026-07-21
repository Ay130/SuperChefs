'use client';

import { Plus } from 'lucide-react';

export function OffersSection() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Manage Offers</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
          <Plus className="w-4 h-4" />
          Add Offer
        </button>
      </div>

      <div className="bg-white rounded-lg border border-border p-8 text-center">
        <p className="text-muted-foreground">Offers management interface coming soon</p>
      </div>
    </div>
  );
}
