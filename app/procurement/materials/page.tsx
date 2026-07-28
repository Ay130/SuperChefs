'use client';

import { useState } from 'react';
import { AlertTriangle, Plus, X } from 'lucide-react';
import { Modal } from '@/components/procurement/modals';

export default function MaterialsPage() {
  const [materials, setMaterials] = useState([
    { id: 1, name: 'Wheat Flour', unit: 'kg', stock: 2500, minStock: 500, maxStock: 5000, status: 'Normal', supplier: 'Flour Mills Nigeria' },
    { id: 2, name: 'Palm Oil', unit: 'liters', stock: 320, minStock: 200, maxStock: 1000, status: 'Low', supplier: 'Sunshine Oils' },
    { id: 3, name: 'Salt', unit: 'kg', stock: 150, minStock: 100, maxStock: 500, status: 'Critical', supplier: 'Heritage Foods' },
    { id: 4, name: 'Sugar', unit: 'kg', stock: 1800, minStock: 500, maxStock: 3000, status: 'Normal', supplier: 'Flour Mills Nigeria' },
    { id: 5, name: 'Eggs', unit: 'crates', stock: 45, minStock: 20, maxStock: 100, status: 'Normal', supplier: 'Golden Seafoods' },
    { id: 6, name: 'Butter', unit: 'kg', stock: 80, minStock: 50, maxStock: 300, status: 'Low', supplier: 'Premium Supplies' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    unit: '',
    stock: '',
    minStock: '',
    maxStock: '',
    supplier: '',
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal':
        return 'bg-green-100 text-green-800';
      case 'Low':
        return 'bg-yellow-100 text-yellow-800';
      case 'Critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const determineStatus = (current: number, min: number, max: number) => {
    if (current <= min) return 'Critical';
    if (current <= (min + max) / 2) return 'Low';
    return 'Normal';
  };

  const handleAddMaterial = () => {
    if (formData.name && formData.unit && formData.stock && formData.supplier) {
      const newMaterial = {
        id: materials.length + 1,
        ...formData,
        stock: parseInt(formData.stock),
        minStock: parseInt(formData.minStock) || 100,
        maxStock: parseInt(formData.maxStock) || 1000,
        status: determineStatus(parseInt(formData.stock), parseInt(formData.minStock) || 100, parseInt(formData.maxStock) || 1000),
      };
      setMaterials([...materials, newMaterial]);
      setFormData({ name: '', unit: '', stock: '', minStock: '', maxStock: '', supplier: '' });
      setIsModalOpen(false);
    }
  };

  return (
    <main className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Materials</h1>
          <p className="text-muted-foreground">Track inventory and material stock levels</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Material
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Material"
        onSave={handleAddMaterial}
        saveLabel="Add Material"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Material Name</label>
            <input
              type="text"
              placeholder="e.g., Rice"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Unit</label>
            <input
              type="text"
              placeholder="e.g., kg"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Current Stock</label>
            <input
              type="number"
              placeholder="0"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Min Stock</label>
              <input
                type="number"
                placeholder="100"
                value={formData.minStock}
                onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Max Stock</label>
              <input
                type="number"
                placeholder="1000"
                value={formData.maxStock}
                onChange={(e) => setFormData({ ...formData, maxStock: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Supplier</label>
            <input
              type="text"
              placeholder="e.g., Flour Mills Nigeria"
              value={formData.supplier}
              onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </Modal>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Material Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Unit</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Current Stock</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Min/Max</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Supplier</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material) => (
                <tr key={material.id} className="border-b border-border hover:bg-muted/50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{material.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{material.unit}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{material.stock.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {material.minStock}/{material.maxStock}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(material.status)}`}>
                        {material.status}
                      </span>
                      {(material.status === 'Low' || material.status === 'Critical') && (
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{material.supplier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
