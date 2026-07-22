// Mock data for MVP - will be replaced with real database queries
const mockPurchaseOrders = [
  {
    id: 1,
    poNumber: 'PO-001',
    status: 'Draft',
    totalAmount: '450000.00',
    createdDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    poNumber: 'PO-002',
    status: 'Approved',
    totalAmount: '680000.00',
    createdDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    poNumber: 'PO-003',
    status: 'Completed',
    totalAmount: '320000.00',
    createdDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    deliveryDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    poNumber: 'PO-004',
    status: 'Pending',
    totalAmount: '525000.00',
    createdDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export async function GET() {
  try {
    return Response.json(mockPurchaseOrders)
  } catch (error) {
    console.error('Error fetching purchase orders:', error)
    return Response.json({ error: 'Failed to fetch purchase orders' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const newPO = {
      id: mockPurchaseOrders.length + 1,
      poNumber: `PO-${String(mockPurchaseOrders.length + 1).padStart(3, '0')}`,
      status: 'Draft',
      totalAmount: data.totalAmount || '0',
      createdDate: new Date().toISOString(),
      deliveryDate: data.deliveryDate,
    }

    mockPurchaseOrders.push(newPO)
    return Response.json(newPO)
  } catch (error) {
    console.error('Error creating purchase order:', error)
    return Response.json({ error: 'Failed to create purchase order' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const idx = mockPurchaseOrders.findIndex(po => po.id === data.id)
    if (idx !== -1) {
      mockPurchaseOrders[idx].status = data.status
      return Response.json(mockPurchaseOrders[idx])
    }
    return Response.json({ error: 'Not found' }, { status: 404 })
  } catch (error) {
    console.error('Error updating purchase order:', error)
    return Response.json({ error: 'Failed to update purchase order' }, { status: 500 })
  }
}
