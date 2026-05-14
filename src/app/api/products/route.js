import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/lib/models/MenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const sort = searchParams.get('sort') || 'newest';
    const page = parseInt(searchParams.get('page')) || 1;
    const limitParam = searchParams.get('limit');
    const search = searchParams.get('search') || '';
    const getAll = searchParams.get('all') === 'true';

    let query = {};
    if (category && category !== 'all') query.category = category;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    let sortOption = {};
    switch (sort) {
      case 'price-low': sortOption = { price: 1 }; break;
      case 'price-high': sortOption = { price: -1 }; break;
      case 'rating': sortOption = { rating: -1 }; break;
      default: sortOption = { createdAt: -1 };
    }

    if (getAll) {
      const products = await Product.find(query).sort(sortOption).lean();
      return NextResponse.json({ products, pagination: { total: products.length } });
    }

    const limit = limitParam ? parseInt(limitParam) : 12;
    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      Product.find(query).sort(sortOption).skip(skip).limit(limit).lean(),
      Product.countDocuments(query),
    ]);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const product = await Product.create(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
