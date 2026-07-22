// Mock data for MVP
const mockMaterials = [
  { id: 1, name: 'Flour (50kg)', category: 'Grains', unit: 'Bag', minimumStock: 5, reorderPoint: 10, unitPrice: 12000, currentStock: 8 },
  { id: 2, name: 'Salt (25kg)', category: 'Seasonings', unit: 'Bag', minimumStock: 3, reorderPoint: 5, unitPrice: 4500, currentStock: 6 },
  { id: 3, name: 'Sugar (25kg)', category: 'Sweeteners', unit: 'Bag', minimumStock: 5, reorderPoint: 8, unitPrice: 18000, currentStock: 4 },
  { id: 4, name: 'Cooking Oil (20L)', category: 'Oils', unit: 'Litre', minimumStock: 20, reorderPoint: 40, unitPrice: 800, currentStock: 35 },
  { id: 5, name: 'Butter (10kg)', category: 'Dairy', unit: 'Kg', minimumStock: 2, reorderPoint: 5, unitPrice: 5000, currentStock: 3 },
  { id: 6, name: 'Tomato Paste (25kg)', category: 'Condiments', unit: 'Bucket', minimumStock: 4, reorderPoint: 8, unitPrice: 22000, currentStock: 5 },
  { id: 7, name: 'Ginger Powder (5kg)', category: 'Seasonings', unit: 'Kg', minimumStock: 2, reorderPoint: 4, unitPrice: 8000, currentStock: 2 },
  { id: 8, name: 'Garlic (5kg)', category: 'Seasonings', unit: 'Kg', minimumStock: 1, reorderPoint: 3, unitPrice: 6000, currentStock: 1 },
]

export async function GET() {
  return Response.json(mockMaterials)
}

export async function POST(request: Request) {
  const body = await request.json()
  const newMaterial = {
    id: mockMaterials.length + 1,
    ...body,
    currentStock: 0
  }
  mockMaterials.push(newMaterial)
  return Response.json(newMaterial, { status: 201 })
}

export async function PUT(request: Request) {
  const data = await request.json()
  const idx = mockMaterials.findIndex(m => m.id === data.id)
  if (idx !== -1) {
    mockMaterials[idx] = { ...mockMaterials[idx], ...data }
    return Response.json(mockMaterials[idx])
  }
  return Response.json({ error: 'Not found' }, { status: 404 })
}
