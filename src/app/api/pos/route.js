import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import Product from '@/lib/models/MenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { items, customerName, paymentMethod, paymentStatus, notes } = await request.json();

    if (!items || !items.length) {
      return NextResponse.json({ error: 'Items are required' }, { status: 400 });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item._id);
      if (!product) {
        return NextResponse.json({ error: `Product not found: ${item.name}` }, { status: 400 });
      }
      if (!product.inStock || product.quantity < item.quantity) {
        return NextResponse.json({ error: `${product.name} is out of stock` }, { status: 400 });
      }
      totalAmount += product.price * item.quantity;
      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        size: item.size || '',
        color: item.color || '',
        image: item.image || product.images?.[0] || '',
      });
    }

    const order = await Order.create({
      user: session.user.id,
      type: 'pos',
      customerName: customerName || 'Walk-in Customer',
      items: orderItems,
      totalAmount,
      status: 'delivered',
      paymentMethod: paymentMethod || 'cash',
      paymentStatus: paymentStatus || 'paid',
      notes: notes || '',
      shippingAddress: { fullName: customerName || 'Walk-in Customer' },
    });

    for (const item of items) {
      await Product.findByIdAndUpdate(item._id, { $inc: { quantity: -item.quantity } });
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const paymentMethod = searchParams.get('paymentMethod');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const search = searchParams.get('search') || '';

    let query = { type: 'pos' };
    if (paymentMethod) query.paymentMethod = paymentMethod;
    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
      if (dateTo) query.createdAt.$lte = new Date(dateTo + 'T23:59:59.999Z');
    }
    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: 'i' } },
        { 'items.name': { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;
    const [orders, total] = await Promise.all([
      Order.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Order.countDocuments(query),
    ]);

    return NextResponse.json({
      orders,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
