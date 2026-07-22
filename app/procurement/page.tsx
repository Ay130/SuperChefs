'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Users, Store, TrendingUp, ArrowRight, LogIn } from 'lucide-react';

export default function ProcurementPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const roles = [
    {
      id: 'branch-manager',
      name: 'Branch Manager',
      description: 'Manage branch inventory and approve procurement requests',
      icon: Store,
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'procurement-admin',
      name: 'Procurement Admin',
      description: 'Create and manage procurement orders for all materials',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'supplier',
      name: 'Supplier',
      description: 'View and fulfill procurement orders',
      icon: Users,
      color: 'from-green-500 to-green-600',
    },
  ];

  const handleContinue = async () => {
    if (!selectedRole) return;

    setLoading(true);
    try {
      // Store the selected role in localStorage
      localStorage.setItem('procurement_role', selectedRole);
      
      // Navigate to the main dashboard
      router.push(`/procurement/dashboard`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Procurement Management
          </h1>
          <p className="text-lg text-muted-foreground">
            Select your role to access the procurement system
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;

            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`group relative p-8 rounded-2xl transition-all duration-300 ${
                  isSelected
                    ? 'ring-2 ring-primary shadow-xl'
                    : 'bg-white border border-border shadow-md hover:shadow-lg'
                }`}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                />

                {/* Content */}
                <div className="relative">
                  <div
                    className={`w-14 h-14 rounded-lg bg-gradient-to-br ${role.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-foreground text-left mb-2">
                    {role.name}
                  </h3>

                  <p className="text-sm text-muted-foreground text-left">
                    {role.description}
                  </p>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <span className="text-xs font-semibold text-primary">
                        ✓ SELECTED
                      </span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleContinue}
            disabled={!selectedRole || loading}
            className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            {loading ? 'Loading...' : 'Continue'}
          </button>

          <Link
            href="/admin/login"
            className="px-8 py-3 bg-secondary text-foreground rounded-lg font-semibold hover:bg-secondary/80 transition flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            Back to Admin Login
          </Link>
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-xl border border-border p-6 md:p-8">
          <h2 className="text-lg font-bold text-foreground mb-4">What is Procurement?</h2>
          <p className="text-muted-foreground mb-4">
            The procurement system helps manage weekly and monthly material orders for all branches.
            Track inventory, create purchase orders, and manage supplier relationships all in one place.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Track raw materials, supplies, and kitchen equipment</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Create and approve purchase orders</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Monitor inventory levels and usage</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Manage supplier deliveries and reconciliation</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
