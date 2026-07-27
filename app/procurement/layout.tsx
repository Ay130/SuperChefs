'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Plus,
  FileText,
  CheckCircle,
  Clock,
  Package,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/procurement/dashboard' },
  { icon: Plus, label: 'New Request', href: '/procurement/new-request' },
  { icon: FileText, label: 'My Requests', href: '/procurement/my-requests' },
  { icon: Clock, label: 'For Approval', href: '/procurement/for-approval' },
  { icon: CheckCircle, label: 'Approved', href: '/procurement/approved' },
  { icon: Package, label: 'Completed', href: '/procurement/completed' },
  { icon: Users, label: 'Suppliers', href: '/procurement/suppliers' },
  { icon: Package, label: 'Materials', href: '/procurement/materials' },
  { icon: BarChart3, label: 'Reports', href: '/procurement/reports' },
  { icon: Settings, label: 'Settings', href: '/procurement/settings' },
];

export default function ProcurementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-40 h-screen w-72 bg-slate-900 text-white transition-all duration-300 lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-700 px-6">
          <div className="flex items-center gap-2 font-bold text-lg">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">S</div>
            <span>Superchefs</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  active
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <Link
            href="/procurement/settings"
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-sm"
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            <span>Settings</span>
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-sm">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-foreground hover:text-muted-foreground"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">Welcome back!</div>
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              AD
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
