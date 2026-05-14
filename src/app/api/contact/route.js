import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Contact from '@/lib/models/Contact';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
    }

    const contact = await Contact.create({
      name: body.name.trim(),
      email: body.email.toLowerCase().trim(),
      phone: body.phone || '',
      subject: body.subject.trim(),
      message: body.message.trim(),
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const messages = await Contact.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
