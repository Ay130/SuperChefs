'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Plus } from 'lucide-react';
import { Modal } from '@/components/procurement/modals';

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'Flour Mills Nigeria', contact: 'Adebayo Okafor', phone: '+234 701 111 2222', email: 'sales@flourmills.com', location: 'Ilupeju, Lagos', orders: 24 },
    { id: 2, name: 'Golden Seafoods Ltd', contact: 'Mrs. Amara Okeke', phone: '+234 702 333 4444', email: 'orders@goldenseafood.com', location: 'Victoria Island, Lagos', orders: 18 },
    { id: 3, name: 'Sunshine Oils Supplies', contact: 'Kunle Adeyemi', phone: '+234 703 555 6666', email: 'supplies@sunshineoils.com', location: 'Apapa, Lagos', orders: 15 },
    { id: 4, name: 'Heritage Foods Nigeria', contact: 'Chioma Eze', phone: '+234 704 777 8888', email: 'contact@heritagefoods.com', location: 'Ikeja, Lagos', orders: 12 },
    { id: 5, name: 'Premium Spices Ltd', contact: 'Ibrahim Hassan', phone: '+234 705 999 0000', email: 'sales@premiumspices.com', location: 'Kano', orders: 8 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    phone: '',
    email: '',
    location: '',
  });

  const handleAddSupplier = () => {
    if (formData.name && formData.contact && formData.phone && formData.email && formData.location) {
      const newSupplier = {
        id: suppliers.length + 1,
        ...formData,
        orders: 0,
      };
      setSuppliers([...suppliers, newSupplier]);
      setFormData({ name: '', contact: '', phone: '', email: '', location: '' });
      setIsModalOpen(false);
    }
  };

  return (
    <main className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Suppliers</h1>
          <p className="text-muted-foreground">Manage your supplier contacts and information</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Supplier
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Supplier"
        onSave={handleAddSupplier}
        saveLabel="Add Supplier"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Supplier Name</label>
            <input
              type="text"
              placeholder="e.g., Flour Mills Nigeria"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Contact Person</label>
            <input
              type="text"
              placeholder="e.g., Adebayo Okafor"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
            <input
              type="text"
              placeholder="+234 701 111 2222"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              type="email"
              placeholder="sales@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Location</label>
            <input
              type="text"
              placeholder="e.g., Ilupeju, Lagos"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <div key={supplier.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-foreground mb-2">{supplier.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{supplier.contact}</p>
            
            <div className="space-y-3 mb-4 pb-4 border-b border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                {supplier.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                {supplier.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {supplier.location}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Orders</p>
                <p className="text-xl font-bold text-foreground">{supplier.orders}</p>
              </div>
              <button className="px-4 py-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg transition-colors font-medium text-sm">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
