import { db } from '@/lib/db'
import {
  materialRequests,
  materialRequestItems,
} from '@/lib/db/procurement'
import { eq, desc } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const branchId = searchParams.get('branchId')

    let query = db.select().from(materialRequests)

    if (status) {
      query = db
        .select()
        .from(materialRequests)
        .where(eq(materialRequests.status, status))
    }

    if (branchId) {
      query = db
        .select()
        .from(materialRequests)
        .where(eq(materialRequests.branchId, parseInt(branchId)))
    }

    const requests = await query.orderBy(desc(materialRequests.createdAt))
    return NextResponse.json(requests)
  } catch (error) {
    console.error('Error fetching requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch requests' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      requestId,
      branchId,
      requestedBy,
      requiredDate,
      notes,
      items,
    } = body

    // Create material request
    const [request] = await db
      .insert(materialRequests)
      .values({
        requestId,
        branchId,
        requestedBy,
        requiredDate: requiredDate ? new Date(requiredDate) : null,
        notes,
        status: 'Draft',
        totalItems: items?.length || 0,
      })
      .returning()

    // Create request items
    if (items && items.length > 0) {
      await db.insert(materialRequestItems).values(
        items.map((item: any) => ({
          requestId: request.id,
          materialId: item.materialId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice:
            parseFloat(item.quantity) * parseFloat(item.unitPrice),
        }))
      )
    }

    return NextResponse.json(request, { status: 201 })
  } catch (error) {
    console.error('Error creating request:', error)
    return NextResponse.json(
      { error: 'Failed to create request' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, status } = body

    const result = await db
      .update(materialRequests)
      .set({ status, updatedAt: new Date() })
      .where(eq(materialRequests.id, id))
      .returning()

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error updating request:', error)
    return NextResponse.json(
      { error: 'Failed to update request' },
      { status: 500 }
    )
  }
}
