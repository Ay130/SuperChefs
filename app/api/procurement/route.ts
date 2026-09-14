import { NextResponse } from 'next/server';
import { createPurchaseOrder, createSupplier, getInventory, getPurchaseOrders, getSuppliers, receivePurchaseOrder } from '@/lib/db';

export async function GET() {
  const [suppliers, purchaseOrders, inventory] = await Promise.all([getSuppliers(), getPurchaseOrders(), getInventory()]);
  return NextResponse.json({ suppliers, purchaseOrders, inventory });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.type === 'supplier') {
      if (!body.name?.trim()) return NextResponse.json({ error: 'Supplier name is required' }, { status: 400 });
      return NextResponse.json(await createSupplier({ name: body.name.trim(), contactName: body.contactName ?? '', email: body.email ?? '', phone: body.phone ?? '', leadTimeDays: Number(body.leadTimeDays) || 0, active: true }), { status: 201 });
    }
    if (body.type === 'receive') {
      return NextResponse.json(await receivePurchaseOrder(body.id, body.quantities ?? {}));
    }
    const items = Array.isArray(body.items) ? body.items : [];
    if (!body.supplierId || items.length === 0) return NextResponse.json({ error: 'Supplier and at least one item are required' }, { status: 400 });
    return NextResponse.json(await createPurchaseOrder({ supplierId: body.supplierId, status: body.status ?? 'draft', items, notes: body.notes ?? '' }), { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to save procurement record' }, { status: 500 });
  }
}
