'use client';

import { TrendingUp, AlertCircle, CheckCircle, Clock, DollarSign } from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    {
      icon: FileText,
      label: 'Total Requests',
      value: '156',
      trend: '+12%',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: CheckCircle,
      label: 'Approved',
      value: '89',
      trend: '+8%',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Clock,
      label: 'Pending',
      value: '42',
      trend: '-2%',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: DollarSign,
      label: 'Total Spent (Month)',
      value: '₦2.4M',
      trend: '+23%',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  const recentRequests = [
    {
      id: 'REQ-001',
      supplier: 'Flour Mills Nigeria',
      amount: '₦450,000',
      status: 'Approved',
      date: '2026-07-22',
    },
    {
      id: 'REQ-002',
      supplier: 'Golden Seafoods Ltd',
      amount: '₦320,000',
      status: 'Pending',
      date: '2026-07-21',
    },
    {
      id: 'REQ-003',
      supplier: 'Sunshine Oils',
      amount: '₦680,000',
      status: 'Completed',
      date: '2026-07-20',
    },
    {
      id: 'REQ-004',
      supplier: 'Heritage Foods',
      amount: '₦240,000',
      status: 'Draft',
      date: '2026-07-19',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Procurement overview and key metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-lg p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.trend}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Requests */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="border-b border-border p-6">
          <h2 className="text-lg font-semibold text-foreground">Recent Requests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                  Request ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((req) => (
                <tr key={req.id} className="border-b border-border hover:bg-muted/50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{req.id}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{req.supplier}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{req.amount}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{req.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

// Import icon (forward declaration since we use it in the component)
import { FileText } from 'lucide-react';
