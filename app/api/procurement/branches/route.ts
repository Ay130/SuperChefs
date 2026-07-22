// Mock data for MVP
const mockBranches = [
  { id: 1, name: 'Lagos Branch', location: 'Lagos', managerName: 'Ade Williams', phone: '+234 701 234 5678', email: 'ade@superchefs.com' },
  { id: 2, name: 'Abuja Branch', location: 'Abuja', managerName: 'Tunde Ahmed', phone: '+234 702 345 6789', email: 'tunde@superchefs.com' },
  { id: 3, name: 'Port Harcourt', location: 'Port Harcourt', managerName: 'Chioma Obi', phone: '+234 703 456 7890', email: 'chioma@superchefs.com' },
]

export async function GET() {
  return Response.json(mockBranches)
}

export async function POST(request: Request) {
  const body = await request.json()
  const newBranch = {
    id: mockBranches.length + 1,
    ...body
  }
  mockBranches.push(newBranch)
  return Response.json(newBranch, { status: 201 })
}
