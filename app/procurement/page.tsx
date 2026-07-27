'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Users, Store, TrendingUp, ArrowRight, LogIn, ChevronDown } from 'lucide-react';

export default function ProcurementPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showBranchSelect, setShowBranchSelect] = useState(false);

  const branches = ['Ikeja', 'Mowe', 'Awoyaya', 'Lekki', 'Chevron', 'Ikate', 'Ikota', 'Palmgroove'];

  const roles = [
    {
      id: 'branch-manager',
      name: 'Branch Manager',
      description: 'Manage your branch inventory and procurement requests',
      icon: Store,
      color: 'from-blue-500 to-blue-600',
      requiresBranch: true,
    },
    {
      id: 'data-team',
      name: 'Data Team',
      description: 'Create, edit, and manage all procurement data and materials',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      requiresBranch: false,
    },
    {
      id: 'procurement',
      name: 'Procurement',
      description: 'View and make procurement orders for all materials',
      icon: Users,
      color: 'from-green-500 to-green-600',
      requiresBranch: false,
    },
  ];

  const handleContinue = async () => {
    const role = roles.find(r => r.id === selectedRole);
    if (!selectedRole || (role?.requiresBranch && !selectedBranch)) return;

    setLoading(true);
    try {
      // Store auth info in localStorage
      localStorage.setItem('procurement_role', selectedRole);
      localStorage.setItem('authenticated', 'true');
      if (selectedBranch) {
        localStorage.setItem('branch_name', selectedBranch);
      }
      
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
              <div key={role.id}>
                <button
                  onClick={() => {
                    setSelectedRole(role.id);
                    if (role.requiresBranch) {
                      setShowBranchSelect(true);
                    } else {
                      setShowBranchSelect(false);
                      setSelectedBranch(null);
                    }
                  }}
                  className={`group relative p-8 rounded-2xl transition-all duration-300 w-full ${
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

                {/* Branch Selection for Branch Manager */}
                {isSelected && role.requiresBranch && (
                  <div className="mt-4 bg-white border border-border rounded-lg p-4 shadow-md">
                    <label className="text-sm font-semibold text-foreground mb-3 block">Select Your Branch:</label>
                    <div className="relative">
                      <button
                        onClick={() => setShowBranchSelect(!showBranchSelect)}
                        className="w-full px-4 py-2 border border-border rounded-lg text-left text-foreground font-medium flex items-center justify-between hover:bg-muted transition"
                      >
                        {selectedBranch || 'Choose a branch...'}
                        <ChevronDown className={`w-4 h-4 transition-transform ${showBranchSelect ? 'rotate-180' : ''}`} />
                      </button>
                      {showBranchSelect && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-lg z-10">
                          {branches.map((branch) => (
                            <button
                              key={branch}
                              onClick={() => {
                                setSelectedBranch(branch);
                                setShowBranchSelect(false);
                              }}
                              className="w-full px-4 py-3 text-left text-foreground hover:bg-primary hover:text-white transition border-b border-border last:border-b-0 first:rounded-t-lg last:rounded-b-lg"
                            >
                              {branch}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleContinue}
            disabled={!selectedRole || (selectedRole === 'branch-manager' && !selectedBranch) || loading}
            className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            {loading ? 'Loading...' : 'Continue to Dashboard'}
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
