import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Review from '@/lib/models/Review';
import Product from '@/lib/models/MenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('product');

    await connectDB();

    const query = productId ? { product: productId } : {};
    const reviews = await Review.find(query)
      .populate('user', 'name')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { product: productId, rating, title, comment } = await request.json();

    if (!productId || !rating) {
      return NextResponse.json({ error: 'Product ID and rating required' }, { status: 400 });
    }

    const existing = await Review.findOne({ user: session.user.id, product: productId });
    if (existing) {
      return NextResponse.json({ error: 'Already reviewed this product' }, { status: 400 });
    }

    const review = await Review.create({
      user: session.user.id,
      product: productId,
      rating,
      title: title || '',
      comment: comment || '',
    });

    const allReviews = await Review.find({ product: productId });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await Product.findByIdAndUpdate(productId, {
      rating: Math.round(avgRating * 10) / 10,
      numReviews: allReviews.length,
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
