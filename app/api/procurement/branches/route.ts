import { db } from '@/lib/db'
import { branches } from '@/lib/db/procurement'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const allBranches = await db.select().from(branches)
    return NextResponse.json(allBranches)
  } catch (error) {
    console.error('Error fetching branches:', error)
    return NextResponse.json(
      { error: 'Failed to fetch branches' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, location, managerName, phone, email } = body

    const result = await db
      .insert(branches)
      .values({
        name,
        location,
        managerName,
        phone,
        email,
      })
      .returning()

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('Error creating branch:', error)
    return NextResponse.json(
      { error: 'Failed to create branch' },
      { status: 500 }
    )
  }
}
