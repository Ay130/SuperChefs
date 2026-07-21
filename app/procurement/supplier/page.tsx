'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, LogOut, CheckCircle, Clock, Package, TrendingUp } from 'lucide-react';

export default function SupplierPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem('procurement_role');
    if (role !== 'supplier') {
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

        <h1 className="text-xl font-bold text-foreground">Supplier Portal</h1>

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
        <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-200 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Welcome, Supplier</h2>
          <p className="text-muted-foreground">
            View and fulfill procurement orders from Superchefs
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending Orders</p>
                <p className="text-3xl font-bold text-foreground">8</p>
              </div>
              <Clock className="w-10 h-10 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Completed This Month</p>
                <p className="text-3xl font-bold text-foreground">34</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">In Transit</p>
                <p className="text-3xl font-bold text-foreground">5</p>
              </div>
              <Package className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Value (Month)</p>
                <p className="text-3xl font-bold text-foreground">₦2.4M</p>
              </div>
              <TrendingUp className="w-10 h-10 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-border rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
            <h3 className="text-lg font-bold text-foreground mb-2">View Orders</h3>
            <p className="text-muted-foreground mb-4">
              See all pending and active procurement orders
            </p>
            <button className="text-primary font-semibold text-sm hover:gap-2 transition flex items-center gap-1">
              Open Orders <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>

          <div className="bg-white border border-border rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
            <h3 className="text-lg font-bold text-foreground mb-2">Update Delivery Status</h3>
            <p className="text-muted-foreground mb-4">
              Mark orders as shipped or delivered
            </p>
            <button className="text-primary font-semibold text-sm hover:gap-2 transition flex items-center gap-1">
              Update Status <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>

          <div className="bg-white border border-border rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
            <h3 className="text-lg font-bold text-foreground mb-2">Order History</h3>
            <p className="text-muted-foreground mb-4">
              View completed orders and delivery records
            </p>
            <button className="text-primary font-semibold text-sm hover:gap-2 transition flex items-center gap-1">
              View History <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>

          <div className="bg-white border border-border rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
            <h3 className="text-lg font-bold text-foreground mb-2">Contact Support</h3>
            <p className="text-muted-foreground mb-4">
              Reach out for order issues or inquiries
            </p>
            <button className="text-primary font-semibold text-sm hover:gap-2 transition flex items-center gap-1">
              Get Support <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </div>

        {/* Quick Info */}
        <div className="bg-white border border-border rounded-xl p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">How to Fulfill Orders</h3>
          <ol className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="font-bold text-primary">1.</span>
              <span>Check pending orders in your dashboard</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">2.</span>
              <span>Confirm availability of requested items</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">3.</span>
              <span>Update status to "In Transit" once shipped</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">4.</span>
              <span>Mark as delivered when items arrive</span>
            </li>
          </ol>
        </div>
      </div>
    </main>
  );
}
