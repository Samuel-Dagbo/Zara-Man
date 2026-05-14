import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'month';
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');

    let dateFilter = {};
    const now = new Date();
    if (dateFrom && dateTo) {
      dateFilter = { $gte: new Date(dateFrom), $lte: new Date(dateTo + 'T23:59:59.999Z') };
    } else {
      switch (period) {
        case 'today':
          dateFilter.$gte = new Date(now.setHours(0,0,0,0));
          dateFilter.$lte = new Date();
          break;
        case 'week':
          dateFilter.$gte = new Date(now.setDate(now.getDate() - 7));
          break;
        case 'month':
          dateFilter.$gte = new Date(now.setMonth(now.getMonth() - 1));
          break;
        case 'year':
          dateFilter.$gte = new Date(now.setFullYear(now.getFullYear() - 1));
          break;
      }
    }

    const matchStage = dateFilter.$gte || dateFilter.$lte
      ? { createdAt: dateFilter }
      : {};

    const [revenue, topProducts, categorySales, paymentMethodStats, ordersByDay] = await Promise.all([
      Order.aggregate([
        { $match: { ...matchStage, paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' }, count: { $sum: 1 } } },
      ]),
      Order.aggregate([
        { $match: { ...matchStage, paymentStatus: 'paid' } },
        { $unwind: '$items' },
        { $group: { _id: '$items.name', total: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }, quantity: { $sum: '$items.quantity' } } },
        { $sort: { total: -1 } },
        { $limit: 10 },
      ]),
      Order.aggregate([
        { $match: { ...matchStage, paymentStatus: 'paid' } },
        { $unwind: '$items' },
        { $group: { _id: '$items.name', total: { $sum: { $multiply: ['$items.price', '$items.quantity'] } } } },
        { $group: { _id: null, items: { $push: { name: '$_id', total: '$total' } } } },
      ]),
      Order.aggregate([
        { $match: { ...matchStage, paymentStatus: 'paid' } },
        { $group: { _id: '$paymentMethod', total: { $sum: '$totalAmount' }, count: { $sum: 1 } } },
      ]),
      Order.aggregate([
        { $match: { ...matchStage, paymentStatus: 'paid' } },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, total: { $sum: '$totalAmount' }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
        { $limit: 90 },
      ]),
    ]);

    const allOrders = await Order.countDocuments(matchStage);
    const pendingOrders = await Order.countDocuments({ ...matchStage, status: { $ne: 'delivered' } });

    return NextResponse.json({
      revenue: revenue[0]?.total || 0,
      orderCount: revenue[0]?.count || 0,
      totalOrders: allOrders,
      pendingOrders,
      topProducts: topProducts || [],
      categorySales: categorySales[0]?.items || [],
      paymentMethods: paymentMethodStats || [],
      dailyRevenue: ordersByDay || [],
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
