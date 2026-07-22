'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, ArrowLeft, LogOut, CheckCircle, AlertCircle, Clock, Inbox } from 'lucide-react';

interface MaterialRequest {
  id: number;
  requestId: string;
  status: string;
  totalItems: number;
  requiredDate: string;
  createdAt: string;
}

export default function BranchManagerPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [requests, setRequests] = useState<MaterialRequest[]>([]);
  const [stats, setStats] = useState({
    draft: 0,
    approved: 0,
    pending: 0,
    completed: 0,
  });

  useEffect(() => {
    const role = localStorage.getItem('procurement_role');
    if (role !== 'branch-manager') {
      router.push('/procurement');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch('/api/procurement/requests');
        const data = await response.json();
        setRequests(data);

        const statusCounts = data.reduce((acc: any, req: MaterialRequest) => {
          const status = req.status.toLowerCase();
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});

        setStats({
          draft: statusCounts['draft'] || 0,
          approved: statusCounts['approved'] || 0,
          pending: statusCounts['pending'] || 0,
          completed: statusCounts['completed'] || 0,
        });
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
      <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <Link
          href="/procurement"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <h1 className="text-xl font-bold text-foreground">Branch Manager - My Requests</h1>

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
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Draft Requests</p>
                <p className="text-3xl font-bold text-foreground">{stats.draft}</p>
              </div>
              <Clock className="w-10 h-10 text-yellow-500" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Approved</p>
                <p className="text-3xl font-bold text-foreground">{stats.approved}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending</p>
                <p className="text-3xl font-bold text-foreground">{stats.pending}</p>
              </div>
              <Inbox className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Completed</p>
                <p className="text-3xl font-bold text-foreground">{stats.completed}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Create Request Button */}
        <div className="mb-6">
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition font-medium">
            <Plus className="w-4 h-4" />
            Create New Request
          </button>
        </div>

        {/* Requests Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">My Requests</h2>
          </div>
          {requests.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              No material requests yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                      Request ID
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                      Required Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr
                      key={request.id}
                      className="border-b border-border hover:bg-muted/50 transition"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        {request.requestId}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {request.totalItems} items
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            request.status
                          )}`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {request.requiredDate
                          ? new Date(request.requiredDate).toLocaleDateString()
                          : '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
