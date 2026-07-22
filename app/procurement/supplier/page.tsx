'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, LogOut, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface PurchaseOrder {
  id: number;
  poNumber: string;
  status: string;
  totalAmount: string;
  createdDate: string;
  deliveryDate: string;
  notes?: string;
}

export default function SupplierPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [stats, setStats] = useState({
    pending: 0,
    confirmed: 0,
    delivered: 0,
    rejected: 0,
  });

  useEffect(() => {
    const role = localStorage.getItem('procurement_role');
    if (role !== 'supplier') {
      router.push('/procurement');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch('/api/procurement/purchase-orders');
        const data = await response.json();
        setPurchaseOrders(data);

        const statusCounts = data.reduce((acc: any, po: PurchaseOrder) => {
          const status = po.status.toLowerCase();
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});

        setStats({
          pending: statusCounts['draft'] || statusCounts['pending'] || 0,
          confirmed: statusCounts['approved'] || 0,
          delivered: statusCounts['completed'] || 0,
          rejected: statusCounts['rejected'] || 0,
        });
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleStatusUpdate = async (poId: number, newStatus: string) => {
    try {
      const response = await fetch('/api/procurement/purchase-orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: poId, status: newStatus }),
      });

      if (response.ok) {
        setPurchaseOrders(
          purchaseOrders.map((po) =>
            po.id === poId ? { ...po, status: newStatus } : po
          )
        );
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'draft':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'draft':
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
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
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-sm text-muted-foreground mb-2">Pending Orders</div>
            <div className="text-3xl font-bold text-foreground">{stats.pending}</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-sm text-muted-foreground mb-2">Confirmed</div>
            <div className="text-3xl font-bold text-green-600">{stats.confirmed}</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-sm text-muted-foreground mb-2">Delivered</div>
            <div className="text-3xl font-bold text-blue-600">{stats.delivered}</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-sm text-muted-foreground mb-2">Rejected</div>
            <div className="text-3xl font-bold text-red-600">{stats.rejected}</div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Orders Assigned to You</h2>
          </div>
          {purchaseOrders.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              No orders assigned yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                      PO Number
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                      Total Amount
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                      Delivery Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrders.map((po) => (
                    <tr
                      key={po.id}
                      className="border-b border-border hover:bg-muted/50 transition"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        {po.poNumber}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        ₦{parseFloat(po.totalAmount).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            po.status
                          )}`}
                        >
                          {getStatusIcon(po.status)}
                          {po.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {po.deliveryDate
                          ? new Date(po.deliveryDate).toLocaleDateString()
                          : '-'}
                      </td>
                      <td className="px-6 py-4 text-sm flex gap-2">
                        {po.status.toLowerCase() === 'draft' ||
                        po.status.toLowerCase() === 'pending' ? (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(po.id, 'Approved')}
                              className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(po.id, 'Rejected')}
                              className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition"
                            >
                              Reject
                            </button>
                          </>
                        ) : po.status.toLowerCase() === 'approved' ? (
                          <button
                            onClick={() => handleStatusUpdate(po.id, 'Completed')}
                            className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition"
                          >
                            Mark Delivered
                          </button>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            {po.status}
                          </span>
                        )}
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
