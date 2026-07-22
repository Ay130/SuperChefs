import { db } from '@/lib/db'
import {
  purchaseOrders,
  purchaseOrderItems,
  approvals,
} from '@/lib/db/procurement'
import { eq, desc } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const supplierId = searchParams.get('supplierId')

    let query = db.select().from(purchaseOrders)

    if (status) {
      query = db
        .select()
        .from(purchaseOrders)
        .where(eq(purchaseOrders.status, status))
    }

    if (supplierId) {
      query = db
        .select()
        .from(purchaseOrders)
        .where(eq(purchaseOrders.supplierId, parseInt(supplierId)))
    }

    const pos = await query.orderBy(desc(purchaseOrders.createdAt))
    return NextResponse.json(pos)
  } catch (error) {
    console.error('Error fetching purchase orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch purchase orders' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      poNumber,
      supplierId,
      deliveryBranchId,
      deliveryDate,
      createdBy,
      items,
      notes,
    } = body

    // Calculate total amount
    const totalAmount = items.reduce(
      (sum: number, item: any) =>
        sum + parseFloat(item.quantity) * parseFloat(item.unitPrice),
      0
    )

    // Create purchase order
    const [po] = await db
      .insert(purchaseOrders)
      .values({
        poNumber,
        supplierId,
        deliveryBranchId,
        deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
        createdBy,
        status: 'Draft',
        totalAmount: totalAmount.toString(),
        notes,
      })
      .returning()

    // Create PO items
    if (items && items.length > 0) {
      await db.insert(purchaseOrderItems).values(
        items.map((item: any) => ({
          poId: po.id,
          materialId: item.materialId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice:
            parseFloat(item.quantity) * parseFloat(item.unitPrice),
        }))
      )
    }

    // Create approval record
    await db.insert(approvals).values({
      poId: po.id,
      status: 'Pending',
    })

    return NextResponse.json(po, { status: 201 })
  } catch (error) {
    console.error('Error creating purchase order:', error)
    return NextResponse.json(
      { error: 'Failed to create purchase order' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, status } = body

    const result = await db
      .update(purchaseOrders)
      .set({ status, updatedAt: new Date() })
      .where(eq(purchaseOrders.id, id))
      .returning()

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error updating purchase order:', error)
    return NextResponse.json(
      { error: 'Failed to update purchase order' },
      { status: 500 }
    )
  }
}
