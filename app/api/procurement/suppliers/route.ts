// Mock data for MVP
const mockSuppliers = [
  { id: 1, name: 'Flour Mills Nigeria', contactPerson: 'Adebayo Okafor', phone: '+234 701 111 2222', email: 'sales@flourmills.com', address: 'Ilupeju, Lagos', status: 'Active' },
  { id: 2, name: 'Golden Seafoods Ltd', contactPerson: 'Mrs. Amara Okeke', phone: '+234 702 333 4444', email: 'orders@goldenseafood.com', address: 'Victoria Island, Lagos', status: 'Active' },
  { id: 3, name: 'Sunshine Oils Supplies', contactPerson: 'Kunle Adeyemi', phone: '+234 703 555 6666', email: 'supplies@sunshineoils.com', address: 'Apapa, Lagos', status: 'Active' },
  { id: 4, name: 'Heritage Foods Nigeria', contactPerson: 'Chioma Eze', phone: '+234 704 777 8888', email: 'contact@heritagefoods.com', address: 'Ikeja, Lagos', status: 'Active' },
  { id: 5, name: 'Premium Spices Ltd', contactPerson: 'Ibrahim Hassan', phone: '+234 705 999 0000', email: 'sales@premiumspices.com', address: 'Kano', status: 'Active' },
]

export async function GET() {
  return Response.json(mockSuppliers)
}

export async function POST(request: Request) {
  const body = await request.json()
  const newSupplier = {
    id: mockSuppliers.length + 1,
    ...body,
    status: 'Active'
  }
  mockSuppliers.push(newSupplier)
  return Response.json(newSupplier, { status: 201 })
}
