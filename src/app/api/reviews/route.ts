import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        product: true,
        service: true,
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, comment, rating, productId, serviceId } = body;

    if (!name || !comment || !rating) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!productId && !serviceId) {
      return NextResponse.json({ error: 'Either productId or serviceId is required' }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        name,
        comment,
        rating,
        productId: productId || null,
        serviceId: serviceId || null,
      },
      include: {
        product: true,
        service: true,
      }
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
} 