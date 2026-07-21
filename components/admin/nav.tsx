'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Package, Tag, Home, Megaphone, MessageSquare, FileText, Settings, ChevronDown } from 'lucide-react';

interface AdminNavProps {
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function AdminNav({ onLogout, activeTab, setActiveTab }: AdminNavProps) {

  const sections = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: Tag },
    { id: 'homepage', label: 'Homepage', icon: Home },
    { id: 'offers', label: 'Offers', icon: Megaphone },
    { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
    { id: 'payslips', label: 'Payslips', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            S
          </div>
          <div>
            <h2 className="font-bold text-foreground">Superchefs</h2>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                activeTab === section.id
                  ? 'bg-primary text-white'
                  : 'text-foreground hover:bg-secondary'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{section.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={onLogout}
          className="w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition font-medium text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
