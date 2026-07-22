'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, LogOut, Plus, FileText, BarChart3, Trash2, Edit2 } from 'lucide-react';

interface Material {
  id: number;
  name: string;
  category: string;
  unit: string;
  minimumStock: string;
  reorderPoint: string;
  unitPrice: string;
  currentStock: string;
}

interface PurchaseOrder {
  id: number;
  poNumber: string;
  status: string;
  totalAmount: string;
  createdDate: string;
  deliveryDate: string;
}

export default function ProcurementAdminPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [activeTab, setActiveTab] = useState<'materials' | 'orders'>('materials');
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    unit: '',
    minimumStock: '',
    reorderPoint: '',
    unitPrice: '',
  });

  useEffect(() => {
    const role = localStorage.getItem('procurement_role');
    if (role !== 'procurement-admin') {
      router.push('/procurement');
      return;
    }

    const fetchData = async () => {
      try {
        const [materialsRes, ordersRes] = await Promise.all([
          fetch('/api/procurement/materials'),
          fetch('/api/procurement/purchase-orders'),
        ]);

        const materialsData = await materialsRes.json();
        const ordersData = await ordersRes.json();

        setMaterials(materialsData);
        setPurchaseOrders(ordersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleAddMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/procurement/materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newMaterial = await response.json();
        setMaterials([...materials, newMaterial]);
        setFormData({
          name: '',
          category: '',
          unit: '',
          minimumStock: '',
          reorderPoint: '',
          unitPrice: '',
        });
        setShowAddMaterial(false);
      }
    } catch (error) {
      console.error('Error adding material:', error);
    }
  };

  const handleDeleteMaterial = async (id: number) => {
    try {
      const response = await fetch(`/api/procurement/materials?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMaterials(materials.filter((m) => m.id !== id));
      }
    } catch (error) {
      console.error('Error deleting material:', error);
    }
  };

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

        <h1 className="text-xl font-bold text-foreground">Procurement Admin</h1>

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
        {/* Tabs */}
        <div className="flex gap-6 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('materials')}
            className={`pb-3 px-2 font-medium transition ${
              activeTab === 'materials'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground'
            }`}
          >
            Materials Master
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-2 font-medium transition ${
              activeTab === 'orders'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground'
            }`}
          >
            Purchase Orders
          </button>
        </div>

        {/* Materials Tab */}
        {activeTab === 'materials' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Materials Master List</h2>
              <button
                onClick={() => setShowAddMaterial(!showAddMaterial)}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Material
              </button>
            </div>

            {/* Add Material Form */}
            {showAddMaterial && (
              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Add New Material</h3>
                <form onSubmit={handleAddMaterial} className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Material Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="col-span-2 px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  />
                  <input
                    type="text"
                    placeholder="Unit (e.g., kg, pc)"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  />
                  <input
                    type="number"
                    placeholder="Minimum Stock"
                    value={formData.minimumStock}
                    onChange={(e) => setFormData({ ...formData, minimumStock: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  />
                  <input
                    type="number"
                    placeholder="Reorder Point"
                    value={formData.reorderPoint}
                    onChange={(e) => setFormData({ ...formData, reorderPoint: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  />
                  <input
                    type="number"
                    placeholder="Unit Price"
                    value={formData.unitPrice}
                    onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  />
                  <button
                    type="submit"
                    className="col-span-2 px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition font-medium"
                  >
                    Save Material
                  </button>
                </form>
              </div>
            )}

            {/* Materials Table */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              {materials.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  No materials yet. Add your first material above.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                          Unit
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                          Current Stock
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                          Unit Price
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {materials.map((material) => (
                        <tr
                          key={material.id}
                          className="border-b border-border hover:bg-muted/50 transition"
                        >
                          <td className="px-6 py-4 text-sm font-medium text-foreground">
                            {material.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {material.category}
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {material.unit}
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {material.currentStock}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-foreground">
                            ₦{parseFloat(material.unitPrice).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-sm flex gap-2">
                            <button className="text-blue-600 hover:text-blue-800 transition">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteMaterial(material.id)}
                              className="text-red-600 hover:text-red-800 transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Purchase Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Purchase Orders</h2>
              <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition font-medium">
                <Plus className="w-4 h-4" />
                Create PO
              </button>
            </div>

            {/* PO Table */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              {purchaseOrders.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  No purchase orders yet.
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
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                          Total Amount
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                          Created Date
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                          Delivery Date
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
                          <td className="px-6 py-4 text-sm">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                po.status
                              )}`}
                            >
                              {po.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-foreground">
                            ₦{parseFloat(po.totalAmount).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {new Date(po.createdDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {po.deliveryDate
                              ? new Date(po.deliveryDate).toLocaleDateString()
                              : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
