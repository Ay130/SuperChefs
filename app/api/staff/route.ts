import { NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/db';

export async function GET() {
  const data = await readData();
  return NextResponse.json({ employees: data.employees, payslips: data.payslips });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await readData();
    const id = `${body.type === 'payslip' ? 'payslip' : 'employee'}-${Date.now()}`;
    const record = { ...body.record, id, createdAt: new Date().toISOString() };
    if (body.type === 'payslip') data.payslips.push(record);
    else data.employees.push(record);
    await writeData(data);
    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to save staff record' }, { status: 500 });
  }
}
