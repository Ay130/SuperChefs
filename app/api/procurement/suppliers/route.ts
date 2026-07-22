import { db } from '@/lib/db'
import { suppliers } from '@/lib/db/procurement'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const allSuppliers = await db.select().from(suppliers)
    return NextResponse.json(allSuppliers)
  } catch (error) {
    console.error('Error fetching suppliers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch suppliers' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, contactPerson, phone, email, address } = body

    const result = await db
      .insert(suppliers)
      .values({
        name,
        contactPerson,
        phone,
        email,
        address,
      })
      .returning()

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('Error creating supplier:', error)
    return NextResponse.json(
      { error: 'Failed to create supplier' },
      { status: 500 }
    )
  }
}
