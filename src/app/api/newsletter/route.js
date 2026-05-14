import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Newsletter from '@/lib/models/Newsletter';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    await connectDB();

    const existing = await Newsletter.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return NextResponse.json({ message: 'Already subscribed' }, { status: 200 });
    }

    await Newsletter.create({ email: email.toLowerCase().trim() });
    return NextResponse.json({ message: 'Subscribed successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
