import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Contact from '@/lib/models/Contact';

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const contact = await Contact.create(body);
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const messages = await Contact.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
