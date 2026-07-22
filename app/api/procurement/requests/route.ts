// Mock data for MVP - will be replaced with real database queries
const mockRequests = [
  {
    id: 1,
    requestId: 'REQ-001',
    status: 'Draft',
    totalItems: 5,
    requiredDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    requestId: 'REQ-002',
    status: 'Approved',
    totalItems: 8,
    requiredDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    requestId: 'REQ-003',
    status: 'Pending',
    totalItems: 3,
    requiredDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    requestId: 'REQ-004',
    status: 'Completed',
    totalItems: 12,
    requiredDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export async function GET() {
  try {
    return Response.json(mockRequests)
  } catch (error) {
    console.error('Error fetching requests:', error)
    return Response.json({ error: 'Failed to fetch requests' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const newRequest = {
      id: mockRequests.length + 1,
      requestId: `REQ-${String(mockRequests.length + 1).padStart(3, '0')}`,
      status: 'Draft',
      totalItems: 0,
      requiredDate: data.requiredDate,
      createdAt: new Date().toISOString(),
    }

    mockRequests.push(newRequest)
    return Response.json(newRequest)
  } catch (error) {
    console.error('Error creating request:', error)
    return Response.json({ error: 'Failed to create request' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const idx = mockRequests.findIndex(r => r.id === data.id)
    if (idx !== -1) {
      mockRequests[idx].status = data.status
      return Response.json(mockRequests[idx])
    }
    return Response.json({ error: 'Not found' }, { status: 404 })
  } catch (error) {
    console.error('Error updating request:', error)
    return Response.json({ error: 'Failed to update request' }, { status: 500 })
  }
}
