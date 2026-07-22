'use client';

import { Download, Eye } from 'lucide-react';
import { useState } from 'react';

export default function MyRequestsPage() {
  const [filter, setFilter] = useState('All');

  const requests = [
    { id: 'REQ-2026-001', date: '2026-07-22', items: 5, amount: '₦450,000', status: 'Draft', progress: 0 },
    { id: 'REQ-2026-002', date: '2026-07-21', items: 8, amount: '₦320,000', status: 'Pending Approval', progress: 33 },
    { id: 'REQ-2026-003', date: '2026-07-20', items: 3, amount: '₦680,000', status: 'Approved', progress: 66 },
    { id: 'REQ-2026-004', date: '2026-07-19', items: 12, amount: '₦240,000', status: 'Completed', progress: 100 },
    { id: 'REQ-2026-005', date: '2026-07-18', items: 7, amount: '₦155,000', status: 'Draft', progress: 0 },
    { id: 'REQ-2026-006', date: '2026-07-17', items: 4, amount: '₦890,000', status: 'Pending Approval', progress: 33 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      case 'Pending Approval':
        return 'bg-yellow-100 text-yellow-800';
      case 'Approved':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 0) return 'bg-gray-300';
    if (progress <= 33) return 'bg-yellow-500';
    if (progress <= 66) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const filteredRequests =
    filter === 'All'
      ? requests
      : requests.filter((r) => r.status === filter);

  return (
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Requests</h1>
        <p className="text-muted-foreground">View and manage your procurement requests</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {['All', 'Draft', 'Pending Approval', 'Approved', 'Completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Requests Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                  Request ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr key={req.id} className="border-b border-border hover:bg-muted/50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{req.id}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{req.date}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{req.items} items</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{req.amount}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getProgressColor(req.progress)} transition-all`}
                          style={{ width: `${req.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-10">{req.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-700 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-700 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
