'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, LogOut, CheckCircle, AlertCircle, Clock, Inbox } from 'lucide-react';

export default function BranchManagerPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem('procurement_role');
    if (role !== 'branch-manager') {
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

        <h1 className="text-xl font-bold text-foreground">Branch Manager - Procurement</h1>

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
        <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-200 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Welcome, Branch Manager</h2>
          <p className="text-muted-foreground">
            Review and approve procurement requests for your branch
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending Requests</p>
                <p className="text-3xl font-bold text-foreground">12</p>
              </div>
              <Inbox className="w-10 h-10 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Approved This Month</p>
                <p className="text-3xl font-bold text-foreground">28</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">In Progress</p>
                <p className="text-3xl font-bold text-foreground">5</p>
              </div>
              <Clock className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Issues</p>
                <p className="text-3xl font-bold text-foreground">2</p>
              </div>
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-border rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
            <h3 className="text-lg font-bold text-foreground mb-2">Review Requests</h3>
            <p className="text-muted-foreground mb-4">
              View pending procurement requests and approve or reject them
            </p>
            <button className="text-primary font-semibold text-sm hover:gap-2 transition flex items-center gap-1">
              Open Requests <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>

          <div className="bg-white border border-border rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
            <h3 className="text-lg font-bold text-foreground mb-2">Inventory Status</h3>
            <p className="text-muted-foreground mb-4">
              Monitor current inventory levels and stock status
            </p>
            <button className="text-primary font-semibold text-sm hover:gap-2 transition flex items-center gap-1">
              View Inventory <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>

          <div className="bg-white border border-border rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
            <h3 className="text-lg font-bold text-foreground mb-2">Order History</h3>
            <p className="text-muted-foreground mb-4">
              Check past orders and delivery status
            </p>
            <button className="text-primary font-semibold text-sm hover:gap-2 transition flex items-center gap-1">
              View History <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>

          <div className="bg-white border border-border rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
            <h3 className="text-lg font-bold text-foreground mb-2">Reports</h3>
            <p className="text-muted-foreground mb-4">
              Generate procurement reports and analytics
            </p>
            <button className="text-primary font-semibold text-sm hover:gap-2 transition flex items-center gap-1">
              View Reports <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
