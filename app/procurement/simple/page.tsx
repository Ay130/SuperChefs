'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Plus, Filter } from 'lucide-react';

const mockBranches = [
  { id: 1, name: 'Lagos Branch', location: 'Lagos' },
  { id: 2, name: 'Abuja Branch', location: 'Abuja' },
  { id: 3, name: 'Port Harcourt', location: 'Port Harcourt' },
];

const mockRequests = [
  { id: 1, requestId: 'REQ-001', branch: 'Lagos Branch', status: 'Draft', items: 5, date: '2026-07-29' },
  { id: 2, requestId: 'REQ-002', branch: 'Abuja Branch', status: 'Approved', items: 8, date: '2026-07-27' },
  { id: 3, requestId: 'REQ-003', branch: 'Lagos Branch', status: 'Pending', items: 3, date: '2026-07-25' },
  { id: 4, requestId: 'REQ-004', branch: 'Port Harcourt', status: 'Completed', items: 12, date: '2026-07-12' },
];

const mockPurchaseOrders = [
  { id: 1, poNumber: 'PO-001', status: 'Draft', amount: '450,000', date: '2026-07-19' },
  { id: 2, poNumber: 'PO-002', status: 'Approved', amount: '680,000', date: '2026-07-15' },
  { id: 3, poNumber: 'PO-003', status: 'Completed', amount: '320,000', date: '2026-07-08' },
  { id: 4, poNumber: 'PO-004', status: 'Pending', amount: '525,000', date: '2026-07-20' },
];

const mockMaterials = [
  { id: 1, name: 'Flour (50kg)', stock: 8, min: 5, reorder: 10 },
  { id: 2, name: 'Salt (25kg)', stock: 6, min: 3, reorder: 5 },
  { id: 3, name: 'Sugar (25kg)', stock: 4, min: 5, reorder: 8 },
  { id: 4, name: 'Cooking Oil (20L)', stock: 35, min: 20, reorder: 40 },
];

export default function ProcurementSimple() {
  const [tab, setTab] = useState('requests');

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/procurement" className="p-2 hover:bg-gray-100 rounded">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Procurement Dashboard</h1>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-8 border-t border-gray-200 pt-4">
            {['requests', 'purchase-orders', 'materials', 'branches'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-2 font-medium transition-colors ${
                  tab === t
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {t === 'requests' && 'Material Requests'}
                {t === 'purchase-orders' && 'Purchase Orders'}
                {t === 'materials' && 'Materials'}
                {t === 'branches' && 'Branches'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Material Requests */}
        {tab === 'requests' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Material Requests</h2>
              <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
                <Plus className="w-4 h-4" />
                New Request
              </button>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Request ID</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Branch</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Items</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-sm font-medium">{req.requestId}</td>
                      <td className="px-6 py-3 text-sm">{req.branch}</td>
                      <td className="px-6 py-3 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm">{req.items} items</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{req.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Purchase Orders */}
        {tab === 'purchase-orders' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Purchase Orders</h2>
              <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
                <Plus className="w-4 h-4" />
                New Order
              </button>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">PO Number</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockPurchaseOrders.map((po) => (
                    <tr key={po.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-sm font-medium">{po.poNumber}</td>
                      <td className="px-6 py-3 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(po.status)}`}>
                          {po.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm">₦{po.amount}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{po.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Materials */}
        {tab === 'materials' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Materials Inventory</h2>
              <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
                <Plus className="w-4 h-4" />
                Add Material
              </button>
            </div>
            <div className="grid gap-4">
              {mockMaterials.map((mat) => (
                <div key={mat.id} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold">{mat.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      mat.stock < mat.min ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {mat.stock < mat.min ? 'LOW STOCK' : 'OK'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Current Stock</p>
                      <p className="font-semibold text-lg">{mat.stock} units</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Minimum</p>
                      <p className="font-semibold">{mat.min} units</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Reorder Point</p>
                      <p className="font-semibold">{mat.reorder} units</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Branches */}
        {tab === 'branches' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Branches</h2>
              <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
                <Plus className="w-4 h-4" />
                Add Branch
              </button>
            </div>
            <div className="grid gap-4">
              {mockBranches.map((branch) => (
                <div key={branch.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">{branch.name}</h3>
                  <p className="text-gray-600">{branch.location}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
