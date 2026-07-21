'use client';

import { useState, useEffect } from 'react';
import { ProductsSection } from './sections/products';
import { CategoriesSection } from './sections/categories';
import { HomepageSection } from './sections/homepage';
import { OffersSection } from './sections/offers';
import { InquiriesSection } from './sections/inquiries';
import { SettingsSection } from './sections/settings';
import { DashboardOverview } from './sections/overview';
import { PayslipsSection } from './sections/payslips';

interface AdminDashboardProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function AdminDashboard({ activeTab, setActiveTab }: AdminDashboardProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'products', label: 'Products' },
    { id: 'categories', label: 'Categories' },
    { id: 'homepage', label: 'Homepage' },
    { id: 'offers', label: 'Offers' },
    { id: 'inquiries', label: 'Inquiries' },
    { id: 'payslips', label: 'Payslips' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium transition border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {activeTab === 'dashboard' && <DashboardOverview />}
        {activeTab === 'products' && <ProductsSection />}
        {activeTab === 'categories' && <CategoriesSection />}
        {activeTab === 'homepage' && <HomepageSection />}
        {activeTab === 'offers' && <OffersSection />}
        {activeTab === 'inquiries' && <InquiriesSection />}
        {activeTab === 'payslips' && <PayslipsSection />}
        {activeTab === 'settings' && <SettingsSection />}
      </div>
    </div>
  );
}
