'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';

export default function NewRequestPage() {
  const [formData, setFormData] = useState({
    description: '',
    quantity: '',
    estimatedBudget: '',
    requiredDate: '',
    priority: 'Medium',
  });

  const [items, setItems] = useState<any[]>([]);

  const handleAddItem = () => {
    if (formData.description && formData.quantity) {
      setItems([
        ...items,
        {
          id: Date.now(),
          ...formData,
        },
      ]);
      setFormData({
        description: '',
        quantity: '',
        estimatedBudget: '',
        requiredDate: '',
        priority: 'Medium',
      });
    }
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Request submitted! (Mock submission)');
    setItems([]);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">New Procurement Request</h1>
        <p className="text-muted-foreground">Create a new procurement request for materials or services</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Material/Service Description
                </label>
                <input
                  type="text"
                  placeholder="e.g., Wheat flour, 50kg bags"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 100"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Estimated Budget (₦)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 50000"
                    value={formData.estimatedBudget}
                    onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Required Date
                  </label>
                  <input
                    type="date"
                    value={formData.requiredDate}
                    onChange={(e) => setFormData({ ...formData, requiredDate: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddItem}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Item to Request
              </button>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div>
          <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
            <h3 className="font-semibold text-foreground mb-4">Request Summary</h3>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-1">Items in Request</p>
              <p className="text-2xl font-bold text-foreground">{items.length}</p>
            </div>
            <div className="mb-6 pb-6 border-b border-border">
              <p className="text-sm text-muted-foreground mb-1">Total Estimated Budget</p>
              <p className="text-2xl font-bold text-foreground">
                ₦{items.reduce((sum, item) => sum + (parseInt(item.estimatedBudget) || 0), 0).toLocaleString()}
              </p>
            </div>
            <button
              onClick={handleSubmit}
              disabled={items.length === 0}
              className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors font-medium mb-2"
            >
              Submit Request
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 border border-border text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              Save as Draft
            </button>
          </div>
        </div>
      </div>

      {/* Items List */}
      {items.length > 0 && (
        <div className="mt-8 bg-card border border-border rounded-lg overflow-hidden">
          <div className="border-b border-border p-6">
            <h2 className="text-lg font-semibold text-foreground">Added Items</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                    Required Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-border hover:bg-muted/50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{item.description}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{item.quantity}</td>
                    <td className="px-6 py-4 text-sm text-foreground">₦{parseInt(item.estimatedBudget).toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{item.requiredDate}</td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}
