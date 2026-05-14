import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import Product from '@/lib/models/MenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();

    const { items, shippingAddress, paymentMethod, notes } = body;

    if (!items || !items.length || !shippingAddress) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item._id);
      if (!product) {
        return NextResponse.json({ error: `Product ${item.name} not found` }, { status: 400 });
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
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod: paymentMethod || 'paypal',
      paymentStatus: 'pending',
      status: 'pending',
      notes: notes || '',
    });

    for (const item of items) {
      await Product.findByIdAndUpdate(item._id, {
        $inc: { quantity: -item.quantity },
      });
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
