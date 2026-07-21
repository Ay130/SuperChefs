'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, LogOut, Plus, FileText, BarChart3, Users, Truck } from 'lucide-react';

export default function ProcurementAdminPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem('procurement_role');
    if (role !== 'procurement-admin') {
      router.push('/procurement');
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-primary animate-pulse" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="bg-white border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <Link
          href="/procurement"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <h1 className="text-xl font-bold text-foreground">Procurement Admin - Dashboard</h1>

        <button
          onClick={() => {
            localStorage.removeItem('procurement_role');
            router.push('/admin/login');
          }}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition text-sm"
        >
          <LogOut className="w-4 h-4" />
          Exit
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-200 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Welcome, Procurement Admin</h2>
          <p className="text-muted-foreground">
            Create and manage procurement orders for all branches
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create New Order
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Orders</p>
                <p className="text-3xl font-bold text-foreground">18</p>
              </div>
              <FileText className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Branches</p>
                <p className="text-3xl font-bold text-foreground">4</p>
              </div>
              <Users className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending Delivery</p>
                <p className="text-3xl font-bold text-foreground">7</p>
              </div>
              <Truck className="w-10 h-10 text-orange-500" />
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">This Month Orders</p>
                <p className="text-3xl font-bold text-foreground">42</p>
              </div>
              <BarChart3 className="w-10 h-10 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-border rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
            <h3 className="text-lg font-bold text-foreground mb-2">Create Purchase Order</h3>
            <p className="text-muted-foreground mb-4">
              Create new procurement orders for materials and supplies
            </p>
            <button className="text-primary font-semibold text-sm hover:gap-2 transition flex items-center gap-1">
              New Order <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>

          <div className="bg-white border border-border rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
            <h3 className="text-lg font-bold text-foreground mb-2">Manage Suppliers</h3>
            <p className="text-muted-foreground mb-4">
              Add and manage supplier contacts and pricing
            </p>
            <button className="text-primary font-semibold text-sm hover:gap-2 transition flex items-center gap-1">
              Manage Suppliers <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>

          <div className="bg-white border border-border rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
            <h3 className="text-lg font-bold text-foreground mb-2">Order Status</h3>
            <p className="text-muted-foreground mb-4">
              Track all orders and their delivery status
            </p>
            <button className="text-primary font-semibold text-sm hover:gap-2 transition flex items-center gap-1">
              View Orders <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>

          <div className="bg-white border border-border rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
            <h3 className="text-lg font-bold text-foreground mb-2">Analytics</h3>
            <p className="text-muted-foreground mb-4">
              View spending, trends, and procurement analytics
            </p>
            <button className="text-primary font-semibold text-sm hover:gap-2 transition flex items-center gap-1">
              View Analytics <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </div>

        {/* Material Categories */}
        <div className="bg-white border border-border rounded-xl p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Common Material Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Raw Materials', 'Supplies', 'Equipment', 'Packaging', 'Ingredients', 'Utilities', 'Cleaning', 'Other'].map((cat) => (
              <div key={cat} className="p-4 border border-border rounded-lg text-center cursor-pointer hover:bg-secondary transition">
                <p className="text-sm font-medium text-foreground">{cat}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
