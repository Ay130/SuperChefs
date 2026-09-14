'use client';

import { FormEvent, useEffect, useState } from 'react';

type Supplier = { id: string; name: string; contactName: string; email: string; phone: string; leadTimeDays: number };
type Inventory = { productId: string; sku: string; stockQuantity: number; reorderLevel: number; reorderQuantity: number; unit: string };
type Product = { id: string; name: string };
type PurchaseOrder = { id: string; supplierId: string; status: string; items: { productId: string; quantity: number; receivedQuantity: number }[]; createdAt: string };

export function ProcurementSection() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [supplierName, setSupplierName] = useState('');
  const [orderSupplierId, setOrderSupplierId] = useState('');
  const [orderProductId, setOrderProductId] = useState('');
  const [orderQuantity, setOrderQuantity] = useState('1');
  const [orderUnitCost, setOrderUnitCost] = useState('0');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function load() {
    const response = await fetch('/api/procurement');
    if (!response.ok) throw new Error('Unable to load procurement data');
    const data = await response.json();
    const productResponse = await fetch('/api/products');
    const productData = await productResponse.json();
    setSuppliers(data.suppliers); setInventory(data.inventory); setOrders(data.purchaseOrders); setProducts(productData.products ?? productData);
  }
  useEffect(() => { load().catch((error) => setMessage(error.message)); }, []);

  async function addSupplier(event: FormEvent) {
    event.preventDefault(); setBusy(true); setMessage('');
    try {
      const response = await fetch('/api/procurement', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'supplier', name: supplierName }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setSupplierName(''); await load(); setMessage('Supplier saved.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to save supplier'); } finally { setBusy(false); }
  }

  async function addPurchaseOrder(event: FormEvent) {
    event.preventDefault(); setBusy(true); setMessage('');
    try {
      const response = await fetch('/api/procurement', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'purchase-order', supplierId: orderSupplierId, items: [{ productId: orderProductId, quantity: Number(orderQuantity), unitCost: Number(orderUnitCost), receivedQuantity: 0 }] }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error);
      setOrderProductId(''); setOrderQuantity('1'); setOrderUnitCost('0'); await load(); setMessage('Purchase order saved.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to save purchase order'); } finally { setBusy(false); }
  }

  async function receive(order: PurchaseOrder) {
    setBusy(true); setMessage('');
    try {
      const quantities = Object.fromEntries(order.items.map((item) => [item.productId, item.quantity - item.receivedQuantity]));
      const response = await fetch('/api/procurement', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'receive', id: order.id, quantities }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error);
      await load(); setMessage('Delivery received and stock updated.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to receive order'); } finally { setBusy(false); }
  }

  return <section className="space-y-6">
    <header><p className="text-sm uppercase tracking-widest text-primary">Operations</p><h1 className="text-3xl font-bold">Procurement & inventory</h1><p className="text-muted-foreground">Track suppliers, stock levels, purchase orders, and deliveries.</p></header>
    {message && <div role="status" className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm">{message}</div>}
    <div className="grid gap-4 md:grid-cols-3"><div className="rounded-xl border p-5"><p className="text-muted-foreground">Suppliers</p><p className="text-3xl font-bold">{suppliers.length}</p></div><div className="rounded-xl border p-5"><p className="text-muted-foreground">Tracked stock items</p><p className="text-3xl font-bold">{inventory.length}</p></div><div className="rounded-xl border p-5"><p className="text-muted-foreground">Open purchase orders</p><p className="text-3xl font-bold">{orders.filter((order) => !['received', 'cancelled'].includes(order.status)).length}</p></div></div>
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
      <form onSubmit={addSupplier} className="rounded-xl border p-5 space-y-4"><div><h2 className="font-semibold">Add supplier</h2><p className="text-sm text-muted-foreground">Create a supplier record before raising purchase orders.</p></div><input required value={supplierName} onChange={(event) => setSupplierName(event.target.value)} placeholder="Supplier name" className="w-full rounded-lg border bg-transparent px-3 py-2" /><button disabled={busy} className="rounded-lg bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50">{busy ? 'Saving…' : 'Save supplier'}</button></form>
      <div className="rounded-xl border p-5"><h2 className="font-semibold mb-4">Suppliers</h2>{suppliers.length === 0 ? <p className="text-sm text-muted-foreground">No suppliers yet.</p> : <div className="space-y-2">{suppliers.map((supplier) => <div key={supplier.id} className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2"><span>{supplier.name}</span><span className="text-xs text-muted-foreground">{supplier.leadTimeDays} day lead time</span></div>)}</div>}</div>
    </div>
    <form onSubmit={addPurchaseOrder} className="rounded-xl border p-5 space-y-4"><div><h2 className="font-semibold">Create purchase order</h2><p className="text-sm text-muted-foreground">Save an order before receiving its delivery.</p></div><div className="grid gap-3 md:grid-cols-4"><select required value={orderSupplierId} onChange={(event) => setOrderSupplierId(event.target.value)} className="rounded-lg border bg-transparent px-3 py-2"><option value="">Select supplier</option>{suppliers.map((supplier) => <option key={supplier.id} value={supplier.id}>{supplier.name}</option>)}</select><select required value={orderProductId} onChange={(event) => setOrderProductId(event.target.value)} className="rounded-lg border bg-transparent px-3 py-2"><option value="">Select product</option>{products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}</select><input required min="1" type="number" value={orderQuantity} onChange={(event) => setOrderQuantity(event.target.value)} placeholder="Quantity" className="rounded-lg border bg-transparent px-3 py-2" /><input required min="0" step="0.01" type="number" value={orderUnitCost} onChange={(event) => setOrderUnitCost(event.target.value)} placeholder="Unit cost" className="rounded-lg border bg-transparent px-3 py-2" /></div><button disabled={busy || suppliers.length === 0 || products.length === 0} className="rounded-lg bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50">{busy ? 'Saving…' : 'Save purchase order'}</button></form>
    <div className="rounded-xl border p-5"><h2 className="font-semibold mb-4">Purchase orders</h2>{orders.length === 0 ? <p className="text-sm text-muted-foreground">No purchase orders yet. Create them through the procurement API or the next order-builder step.</p> : <div className="space-y-2">{orders.map((order) => <div key={order.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-muted/40 px-3 py-3"><div><p className="font-medium">{order.id}</p><p className="text-xs text-muted-foreground">{order.status} · {order.items.length} line items</p></div>{order.status !== 'received' && order.status !== 'cancelled' && <button onClick={() => receive(order)} disabled={busy} className="rounded-lg border px-3 py-2 text-sm disabled:opacity-50">Receive delivery</button>}</div>)}</div>}</div>
    <div className="rounded-xl border p-5"><h2 className="font-semibold mb-4">Inventory</h2>{inventory.length === 0 ? <p className="text-sm text-muted-foreground">No inventory has been received yet.</p> : <div className="grid gap-3 md:grid-cols-2">{inventory.map((item) => <div key={item.productId} className="rounded-lg bg-muted/40 px-3 py-3"><div className="flex justify-between"><span>{item.sku}</span><span className={item.stockQuantity <= item.reorderLevel ? 'text-red-500' : 'text-green-600'}>{item.stockQuantity} {item.unit}</span></div><p className="text-xs text-muted-foreground">Reorder level: {item.reorderLevel}</p></div>)}</div>}</div>
  </section>;
}
