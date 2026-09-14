'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Product } from '@/lib/types';
import { Trash2, Edit2, Plus, Loader, X } from 'lucide-react';

const blankProduct: Omit<Product, 'id'> = { name: '', price: 0, categoryId: '', description: '', tags: [], featured: false, available: true };

export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Omit<Product, 'id'>>(blankProduct);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadProducts = async () => {
    const res = await fetch('/api/products', { cache: 'no-store' });
    if (!res.ok) throw new Error('Could not load products');
    setProducts(await res.json());
  };
  useEffect(() => { loadProducts().catch((e) => setError(e.message)).finally(() => setLoading(false)); }, []);

  const save = async (event: FormEvent) => {
    event.preventDefault(); setSaving(true); setError('');
    try {
      const res = await fetch(editingId ? `/api/products/${editingId}` : '/api/products', { method: editingId ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, price: Number(form.price), tags: form.tags }) });
      if (!res.ok) throw new Error((await res.json()).error || 'Could not save product');
      await loadProducts(); setOpen(false); setEditingId(null); setForm(blankProduct);
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not save product'); } finally { setSaving(false); }
  };
  const remove = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (!res.ok) { setError('Could not delete product'); return; }
    setProducts((items) => items.filter((item) => item.id !== id));
  };
  const edit = (product: Product) => { const { id, ...rest } = product; setEditingId(id); setForm(rest); setOpen(true); };

  if (loading) return <div className="flex justify-center p-12"><Loader className="w-6 h-6 animate-spin text-primary" /></div>;
  return <div>
    <div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-bold text-foreground">Manage Products</h2><button onClick={() => { setEditingId(null); setForm(blankProduct); setOpen(true); }} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg"><Plus className="w-4 h-4" />Add Product</button></div>
    {error && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}
    <div className="bg-white rounded-lg border border-border overflow-hidden"><table className="w-full"><thead className="bg-secondary"><tr>{['Name','Price','Category','Status','Actions'].map((h) => <th key={h} className="px-6 py-3 text-left text-sm font-semibold">{h}</th>)}</tr></thead><tbody>{products.map((product) => <tr key={product.id} className="border-b border-border"><td className="px-6 py-4 font-medium">{product.name}</td><td className="px-6 py-4">₦{product.price.toLocaleString()}</td><td className="px-6 py-4">{product.categoryId}</td><td className="px-6 py-4">{product.available ? 'Available' : 'Out of Stock'}</td><td className="px-6 py-4 text-right"><button aria-label={`Edit ${product.name}`} onClick={() => edit(product)} className="p-2"><Edit2 className="w-4 h-4 text-primary" /></button><button aria-label={`Delete ${product.name}`} onClick={() => remove(product.id)} className="p-2"><Trash2 className="w-4 h-4 text-red-600" /></button></td></tr>)}</tbody></table></div>
    {open && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"><form onSubmit={save} className="w-full max-w-lg space-y-4 rounded-xl bg-white p-6"><div className="flex justify-between"><h3 className="text-xl font-bold">{editingId ? 'Edit Product' : 'Add Product'}</h3><button type="button" aria-label="Close" onClick={() => setOpen(false)}><X /></button></div>{[['name','Name','text'],['price','Price','number'],['categoryId','Category ID','text'],['description','Description','text']].map(([key,label,type]) => <label key={key} className="block text-sm font-medium">{label}<input required={key !== 'description'} type={type} value={String(form[key as keyof typeof form] ?? '')} onChange={(e) => setForm({ ...form, [key]: key === 'price' ? Number(e.target.value) : e.target.value })} className="mt-1 w-full rounded-lg border p-2" /></label>)}<label className="flex gap-2"><input type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} /> Available</label><button disabled={saving} className="w-full rounded-lg bg-primary p-2 text-white disabled:opacity-50">{saving ? 'Saving…' : 'Save Product'}</button></form></div>}
  </div>;
}
