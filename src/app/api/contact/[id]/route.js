import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Contact from '@/lib/models/Contact';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const allowed = {};
    if (typeof body.read === 'boolean') allowed.read = body.read;
    const message = await Contact.findByIdAndUpdate(params.id, allowed, { new: true });
    if (!message) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
